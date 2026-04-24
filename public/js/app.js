const TIERS = {1:100000, 2:180000, 3:240000, 5:219000, 10:350000, 15:500000, 20:650000};
const fmt = n => n.toLocaleString('vi-VN') + 'đ';

const qtyEl = document.getElementById('quantity');
const totalEl = document.getElementById('totalAmount');
function updateTotal(){
  const q = parseInt(qtyEl.value || '1');
  totalEl.textContent = fmt(TIERS[q] || (q * 100000));
}
qtyEl.addEventListener('change', updateTotal);
updateTotal();

let pollTimer = null;

document.getElementById('orderForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true; btn.textContent = 'Đang xử lý…';

  if (!document.getElementById('agreeExpiry').checked){
    alert('Vui lòng tick xác nhận đã đọc thông tin hạn sử dụng trước khi đặt hàng.');
    btn.disabled = false; btn.textContent = originalText;
    return;
  }
  const data = Object.fromEntries(new FormData(e.target).entries());
  try {
    const r = await fetch('/api/orders', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const j = await r.json();
    if (!j.success) { alert(j.message || 'Lỗi đặt hàng'); return; }
    showQR(j.data);
  } catch (err) {
    alert('Lỗi kết nối: ' + err.message);
  } finally {
    btn.disabled = false; btn.textContent = originalText;
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
        document.getElementById('statusOk').style.display = 'block';
        clearInterval(pollTimer);
      }
    } catch {}
  }, 10000);
}

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
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLightbox(); });

function copy(text){
  navigator.clipboard.writeText(text).then(() => {
    // nhẹ nhàng - không cần alert
  });
}
