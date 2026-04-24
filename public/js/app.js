const TIERS = {1:100000, 2:180000, 3:240000, 5:219000, 10:350000, 15:500000, 20:650000};
const fmt = n => n.toLocaleString('vi-VN') + 'đ';

// ── Dropdown địa chỉ ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const selP = document.getElementById('selProvince');
  const selD = document.getElementById('selDistrict');
  const selW = document.getElementById('selWard');
  if (!selP || !window.VN_ADDRESS) return;

  Object.keys(VN_ADDRESS).sort().forEach(p => {
    selP.appendChild(new Option(p, p));
  });

  selP.addEventListener('change', () => {
    selD.innerHTML = '<option value="">-- Chọn quận/huyện --</option>';
    selW.innerHTML = '<option value="">-- Chọn phường/xã --</option>';
    selD.disabled = !selP.value;
    selW.disabled = true;
    if (!selP.value) return;
    const districts = VN_ADDRESS[selP.value] || {};
    Object.keys(districts).sort().forEach(d => selD.appendChild(new Option(d, d)));
  });

  selD.addEventListener('change', () => {
    selW.innerHTML = '<option value="">-- Chọn phường/xã --</option>';
    selW.disabled = !selD.value;
    if (!selD.value) return;
    const wards = (VN_ADDRESS[selP.value] || {})[selD.value] || [];
    wards.sort().forEach(w => selW.appendChild(new Option(w, w)));
  });
});

// ── Tổng tiền ────────────────────────────────────────────────────────────────
const qtyEl = document.getElementById('quantity');
const totalEl = document.getElementById('totalAmount');
function updateTotal(){
  const q = parseInt(qtyEl.value || '1');
  totalEl.textContent = fmt(TIERS[q] || (q * 100000));
}
qtyEl.addEventListener('change', updateTotal);
updateTotal();

// ── Form đặt hàng ────────────────────────────────────────────────────────────
let pollTimer = null;

document.getElementById('orderForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const originalText = btn.innerHTML;
  btn.disabled = true; btn.innerHTML = '<span class="spinner" style="border-color:#fff;border-top-color:transparent;display:inline-block;width:16px;height:16px;border-width:2px"></span> Đang xử lý…';

  if (!document.getElementById('agreeExpiry').checked){
    alert('Vui lòng tick xác nhận đã đọc thông tin hạn sử dụng trước khi đặt hàng.');
    btn.disabled = false; btn.innerHTML = originalText; return;
  }

  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());

  // Ghép địa chỉ đầy đủ
  const ward = data.ward || '', district = data.district || '', province = data.province || '';
  data.full_address = [data.address, ward, district, province].filter(Boolean).join(', ');

  try {
    const r = await fetch('/api/orders', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const j = await r.json();
    if (!j.success) { alert(j.message || 'Lỗi đặt hàng'); return; }
    // Lưu đơn vào localStorage để tra cứu sau
    const orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    orders.unshift({ code: j.data.order_code, phone: data.phone, name: data.full_name, total: j.data.total_amount, qty: j.data.quantity, date: new Date().toLocaleDateString('vi-VN') });
    localStorage.setItem('my_orders', JSON.stringify(orders.slice(0, 20)));
    showQR(j.data);
  } catch (err) {
    alert('Lỗi kết nối: ' + err.message);
  } finally {
    btn.disabled = false; btn.innerHTML = originalText;
  }
});

function showQR(d){
  document.getElementById('qrImg').src = d.qr_url;
  document.getElementById('qrAmt').textContent = fmt(d.total_amount);
  document.getElementById('qrDesc').textContent = d.transfer_content;
  document.getElementById('orderCode').textContent = d.order_code;
  document.getElementById('statusWait').style.display = 'flex';
  document.getElementById('statusOk').style.display = 'none';
  document.getElementById('qrModal').classList.add('show');
  document.body.style.overflow = 'hidden';
  startPolling(d.order_code);
}

function closeQR(){
  document.getElementById('qrModal').classList.remove('show');
  document.body.style.overflow = '';
  if (pollTimer) clearInterval(pollTimer);
}

function startPolling(code){
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    try {
      const r = await fetch('/api/orders/' + code + '/status');
      const j = await r.json();
      if (j.paid) {
        document.getElementById('statusWait').style.display = 'none';
        const okEl = document.getElementById('statusOk');
        okEl.innerHTML = '✅ <b>Đã nhận thanh toán thành công!</b> Đơn hàng đang được đóng gói và giao đến bạn trong 2-5 ngày. Cảm ơn bạn đã tin tưởng GưChaSa! 🌿';
        okEl.style.display = 'block';
        clearInterval(pollTimer);
      }
    } catch {}
  }, 10000);
}

// ── Tra cứu đơn hàng ─────────────────────────────────────────────────────────
async function doTrack(){
  const val = document.getElementById('trackInput').value.trim();
  const resultEl = document.getElementById('trackResult');
  if (!val) { resultEl.innerHTML = '<p style="color:#d0342c">Vui lòng nhập mã đơn hoặc SĐT.</p>'; return; }
  resultEl.innerHTML = '<p>Đang tra cứu…</p>';

  // Thử mã đơn
  if (val.toUpperCase().startsWith('GCS')) {
    const r = await fetch('/api/orders/' + val.toUpperCase());
    const j = await r.json();
    if (j.success) { resultEl.innerHTML = renderOrder(j.data); return; }
  }

  // Thử từ localStorage theo SĐT
  const orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
  const found = orders.filter(o => o.phone === val || o.code.toUpperCase() === val.toUpperCase());
  if (found.length) {
    resultEl.innerHTML = found.map(o => `
      <div class="track-card">
        <div><b>Mã đơn:</b> ${o.code}</div>
        <div><b>Họ tên:</b> ${o.name}</div>
        <div><b>Số lượng:</b> ${o.qty} chai</div>
        <div><b>Tổng tiền:</b> ${fmt(o.total)}</div>
        <div><b>Ngày đặt:</b> ${o.date}</div>
        <button class="btn btn-ghost btn-sm" onclick="checkStatus('${o.code}',this)" style="margin-top:8px">Kiểm tra trạng thái</button>
        <div class="track-status"></div>
      </div>`).join('');
    return;
  }
  resultEl.innerHTML = '<p style="color:#d0342c">Không tìm thấy đơn hàng. Hãy nhập chính xác mã đơn (GCSxxxxxxxx) hoặc SĐT đã đặt.</p>';
}

async function checkStatus(code, btn){
  const r = await fetch('/api/orders/' + code + '/status');
  const j = await r.json();
  const STATUS = {pending:'⏳ Chờ thanh toán', paid:'✅ Đã thanh toán', confirmed:'📋 Đã xác nhận', shipping:'🚚 Đang giao hàng', delivered:'🎉 Đã giao thành công', cancelled:'❌ Đã huỷ'};
  btn.nextElementSibling.innerHTML = `<b>Trạng thái: ${STATUS[j.status] || j.status}</b>`;
}

function renderOrder(o){
  const STATUS = {pending:'⏳ Chờ thanh toán', paid:'✅ Đã thanh toán', confirmed:'📋 Đã xác nhận', shipping:'🚚 Đang giao hàng', delivered:'🎉 Đã giao thành công', cancelled:'❌ Đã huỷ'};
  return `<div class="track-card">
    <div><b>Mã đơn:</b> ${o.order_code}</div>
    <div><b>Họ tên:</b> ${o.full_name}</div>
    <div><b>SĐT:</b> ${o.phone}</div>
    <div><b>Địa chỉ:</b> ${o.address}, ${o.province}</div>
    <div><b>Số lượng:</b> ${o.quantity} chai</div>
    <div><b>Tổng tiền:</b> ${fmt(o.total_amount)}</div>
    <div><b>Ngày đặt:</b> ${new Date(o.created_at).toLocaleString('vi-VN')}</div>
    <div style="margin-top:10px;font-size:1.1rem"><b>Trạng thái: ${STATUS[o.status] || o.status}</b></div>
  </div>`;
}

// ── Ảnh ──────────────────────────────────────────────────────────────────────
function switchImg(thumb, src){
  document.querySelectorAll('.g-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  const main = document.getElementById('galleryMain');
  main.style.opacity = '0';
  setTimeout(() => { main.src = src; main.style.opacity = '1'; }, 180);
  document.querySelector('.gallery-main').onclick = () => openZoom(src);
}

function openZoom(src){
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('show');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape'){ closeLightbox(); closeQR(); } });

function copy(text){
  navigator.clipboard.writeText(text).catch(()=>{});
}
