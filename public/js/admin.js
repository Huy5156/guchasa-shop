const fmt = n => (n||0).toLocaleString('vi-VN') + 'đ';
const STATUS_VI = {
  pending:'Chờ thanh toán', paid:'Đã thanh toán', confirmed:'Đã xác nhận',
  shipping:'Đang giao', delivered:'Đã giao', cancelled:'Đã huỷ'
};

// ─── Auth ────────────────────────────────────────────────────────────────────
async function checkAuth(){
  const r = await fetch('/api/admin/check');
  const j = await r.json();
  if (j.isAdmin) showDashboard();
}
checkAuth();

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const pwd = e.target.password.value;
  const r = await fetch('/api/admin/login', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({password: pwd})
  });
  const j = await r.json();
  if (j.success) showDashboard();
  else document.getElementById('loginErr').textContent = j.message || 'Sai mật khẩu';
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await fetch('/api/admin/logout', {method:'POST'});
  location.reload();
});

function showDashboard(){
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  loadStats(); loadOrders();
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
document.querySelectorAll('.admin-top nav a[data-tab]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.admin-top nav a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById('tab-' + a.dataset.tab).style.display = 'block';
    if (a.dataset.tab === 'stats') drawChart();
  });
});

// ─── Stats ───────────────────────────────────────────────────────────────────
let statsCache = null;
async function loadStats(){
  const r = await fetch('/api/admin/stats');
  const j = await r.json();
  if (!j.success) return;
  statsCache = j.data;
  const cards = [
    {lbl:'Tổng đơn', val: statsCache.totalOrders, cls:''},
    {lbl:'Đơn hôm nay', val: statsCache.todayOrders, cls:'blue'},
    {lbl:'Doanh thu', val: fmt(statsCache.totalRevenue), cls:''},
    {lbl:'DT hôm nay', val: fmt(statsCache.todayRevenue), cls:'blue'},
    {lbl:'Chờ TT', val: statsCache.pending, cls:'orange'},
    {lbl:'Đã TT', val: statsCache.paid, cls:''},
    {lbl:'Đang giao', val: statsCache.shipping, cls:'blue'},
    {lbl:'Đã huỷ', val: statsCache.cancelled, cls:'red'}
  ];
  const html = cards.map(c => `<div class="stat-card ${c.cls}"><div class="lbl">${c.lbl}</div><div class="val">${c.val}</div></div>`).join('');
  document.getElementById('statRow').innerHTML = html;
  document.getElementById('statRow2').innerHTML = html;
}

function drawChart(){
  if (!statsCache) return;
  const c = document.getElementById('revChart');
  const ctx = c.getContext('2d');
  const W = c.width = c.offsetWidth, H = c.height;
  ctx.clearRect(0,0,W,H);
  const data = statsCache.revenueByDay;
  const max = Math.max(1, ...data.map(d => d.revenue));
  const bw = W / data.length;
  data.forEach((d,i) => {
    const h = (d.revenue / max) * (H - 30);
    ctx.fillStyle = '#2f7a3a';
    ctx.fillRect(i*bw + 4, H - h - 20, bw - 8, h);
    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.d.slice(5), i*bw + bw/2, H - 4);
  });
}

// ─── Orders ──────────────────────────────────────────────────────────────────
let currentPage = 1;

document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 1; loadOrders(); });
document.getElementById('searchBox').addEventListener('input', debounce(() => { currentPage = 1; loadOrders(); }, 300));
document.getElementById('refreshBtn').addEventListener('click', () => { loadStats(); loadOrders(); });
document.getElementById('exportBtn').addEventListener('click', e => {
  const status = document.getElementById('filterStatus').value;
  e.currentTarget.href = '/api/admin/export' + (status !== 'all' ? '?status=' + status : '');
});

function debounce(fn, ms){ let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

async function loadOrders(){
  const status = document.getElementById('filterStatus').value;
  const search = document.getElementById('searchBox').value;
  const qs = new URLSearchParams({status, search, page: currentPage, limit: 25});
  const r = await fetch('/api/admin/orders?' + qs);
  const j = await r.json();
  if (!j.success) return;
  const tbody = document.querySelector('#ordersTable tbody');
  tbody.innerHTML = '';
  document.getElementById('emptyState').style.display = j.data.length ? 'none' : 'block';

  j.data.forEach(o => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a href="#" onclick="showDetail(${o.id});return false"><b>${o.order_code}</b></a></td>
      <td>${escapeHtml(o.full_name)}</td>
      <td>${o.phone}</td>
      <td style="max-width:220px">${escapeHtml(o.address)}, ${escapeHtml(o.province)}</td>
      <td><b>${o.quantity}</b> chai</td>
      <td><b>${fmt(o.total_amount)}</b></td>
      <td><small>${new Date(o.created_at).toLocaleString('vi-VN')}</small></td>
      <td><span class="pill p-${o.status}">${STATUS_VI[o.status]}</span></td>
      <td>
        <select class="status-sel" data-id="${o.id}">
          ${Object.keys(STATUS_VI).map(k => `<option value="${k}" ${k===o.status?'selected':''}>${STATUS_VI[k]}</option>`).join('')}
        </select>
      </td>`;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.status-sel').forEach(sel => {
    sel.addEventListener('change', async () => {
      const id = sel.dataset.id;
      await fetch('/api/admin/orders/' + id, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({status: sel.value})
      });
      loadStats(); loadOrders();
    });
  });

  renderPager(j.pagination);
}

function renderPager(p){
  const el = document.getElementById('pager');
  if (p.totalPages <= 1) { el.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= p.totalPages; i++)
    html += `<button class="${i===p.page?'active':''}" onclick="goPage(${i})">${i}</button>`;
  el.innerHTML = html;
}
function goPage(n){ currentPage = n; loadOrders(); }

async function showDetail(id){
  const r = await fetch('/api/admin/orders?page=1&limit=500');
  const j = await r.json();
  const o = j.data.find(x => x.id === id);
  if (!o) return;
  const paid = o.status !== 'pending' && o.status !== 'cancelled';
  document.getElementById('detailBody').innerHTML = `
    <h2>Đơn ${o.order_code} <span class="pill p-${o.status}">${STATUS_VI[o.status]}</span></h2>
    <div class="detail-grid">
      <label>Khách hàng</label><div><b>${escapeHtml(o.full_name)}</b></div>
      <label>SĐT</label><div>${o.phone}</div>
      <label>Email</label><div>${o.email || '—'}</div>
      <label>Địa chỉ</label><div>${escapeHtml(o.address)}, ${escapeHtml(o.province)}</div>
      <label>Số lượng</label><div>${o.quantity} chai 500ml</div>
      <label>Tổng tiền</label><div><b style="color:#d0342c;font-size:1.2rem">${fmt(o.total_amount)}</b></div>
      <label>Ghi chú</label><div>${escapeHtml(o.note||'—')}</div>
      <label>Đặt lúc</label><div>${new Date(o.created_at).toLocaleString('vi-VN')}</div>
      ${o.paid_at ? `<label>Đã TT lúc</label><div>${new Date(o.paid_at).toLocaleString('vi-VN')}</div>` : ''}
    </div>
    ${!paid && o.status === 'pending' ? `<button class="btn btn-primary" onclick="markPaid(${o.id})">✅ Xác nhận đã nhận tiền</button>` : ''}
  `;
  document.getElementById('detailModal').classList.add('show');
}
function closeDetail(){ document.getElementById('detailModal').classList.remove('show'); }

async function markPaid(id){
  await fetch('/api/admin/orders/' + id, {
    method:'PUT', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({status:'paid'})
  });
  closeDetail(); loadStats(); loadOrders();
}

function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ─── Settings ────────────────────────────────────────────────────────────────
document.getElementById('pwdForm').addEventListener('submit', async e => {
  e.preventDefault();
  const pwd = e.target.newPassword.value;
  const r = await fetch('/api/admin/password', {
    method:'PUT', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({newPassword: pwd})
  });
  const j = await r.json();
  const msg = document.getElementById('pwdMsg');
  msg.textContent = j.message || (j.success ? 'Đã cập nhật' : 'Lỗi');
  msg.className = 'msg ' + (j.success ? 'ok' : 'err');
  if (j.success) e.target.reset();
});

// Auto-refresh orders every 30s while on orders tab
setInterval(() => {
  if (document.getElementById('tab-orders').style.display !== 'none' && document.getElementById('dashboard').style.display !== 'none')
    loadOrders();
}, 30000);
