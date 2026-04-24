const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 8080;

// ─── Cấu hình sản phẩm / thanh toán ──────────────────────────────────────────
const PRODUCT = {
  name: 'Sữa tắm thảo dược GưChaSa 500ml',
  original_unit: 250000,
  // Bậc giá: mua càng nhiều càng rẻ. qty → total price (đ)
  tiers: [
    { qty: 1,  price: 100000 },
    { qty: 2,  price: 180000 },
    { qty: 3,  price: 240000 },
    { qty: 5,  price: 219000 },   // deal hot
    { qty: 10, price: 350000 },
    { qty: 15, price: 500000 },
    { qty: 20, price: 650000 }
  ]
};

function priceFor(qty){
  const t = PRODUCT.tiers.find(x => x.qty === qty);
  if (t) return t.price;
  // fallback: chọn mốc gần nhất nhỏ hơn + giá đơn vị trung bình tại mốc đó
  const sorted = [...PRODUCT.tiers].sort((a,b) => a.qty - b.qty);
  let base = sorted[0];
  for (const x of sorted) if (x.qty <= qty) base = x;
  const unit = base.price / base.qty;
  return Math.round(unit * qty);
}

const BANK = {
  bin: '970422',              // MB Bank
  account_number: '36911021102',
  account_name: 'NGUYEN VAN HUY',
  bank_name: 'MB Bank - Ngân hàng Quân đội'
};

function buildQRUrl(amount, addInfo) {
  const base = `https://img.vietqr.io/image/${BANK.bin}-${BANK.account_number}-compact2.png`;
  const params = new URLSearchParams({
    amount: String(amount),
    addInfo: addInfo,
    accountName: BANK.account_name
  });
  return `${base}?${params.toString()}`;
}

const DB_FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');
const DB_DIR = path.dirname(DB_FILE);
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return readDB().settings.admin_password || 'admin123';
}

// ─── File-based Database ──────────────────────────────────────────────────────
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const init = { orders: [], settings: { admin_password: 'admin123' }, next_id: 1 };
    fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
    return init;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    const init = { orders: [], settings: { admin_password: 'admin123' }, next_id: 1 };
    fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
    return init;
  }
}
function writeDB(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }
readDB();

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'guchasa-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Helpers ─────────────────────────────────────────────────────────────────
function genOrderCode() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const r = String(Math.floor(Math.random() * 9000) + 1000);
  return `GCS${d}${r}`;
}
function calcTotal(qty) {
  return priceFor(Math.max(1, qty));
}
function nowStr() { return new Date().toISOString(); }
function dateOf(s) { return s.slice(0, 10); }
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
}

// ─── Public API ──────────────────────────────────────────────────────────────
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    data: {
      product: PRODUCT,
      bank: { ...BANK }
    }
  });
});

app.post('/api/orders', (req, res) => {
  try {
    const { full_name, phone, email, address, province, quantity, note } = req.body;
    if (!full_name?.trim() || !phone?.trim() || !address?.trim() || !province?.trim()) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }
    if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(phone.trim().replace(/\s/g, ''))) {
      return res.status(400).json({ success: false, message: 'Số điện thoại không hợp lệ (VD: 0901234567)' });
    }

    const qty = Math.max(1, Math.min(50, parseInt(quantity) || 1));
    const total = calcTotal(qty);
    const orderCode = genOrderCode();
    const now = nowStr();

    const db = readDB();
    const order = {
      id: db.next_id++,
      order_code: orderCode,
      full_name: full_name.trim(),
      phone: phone.trim().replace(/\s/g, ''),
      email: email?.trim() || '',
      address: address.trim(),
      province: province.trim(),
      quantity: qty,
      note: note?.trim() || '',
      total_amount: total,
      status: 'pending',
      created_at: now,
      updated_at: now
    };
    db.orders.push(order);
    writeDB(db);

    const qrUrl = buildQRUrl(total, orderCode);

    res.json({
      success: true,
      message: 'Đặt hàng thành công!',
      data: {
        order_code: orderCode,
        total_amount: total,
        quantity: qty,
        qr_url: qrUrl,
        bank: BANK,
        transfer_content: orderCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi hệ thống, vui lòng thử lại' });
  }
});

app.get('/api/orders/:code/status', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.order_code === req.params.code);
  if (!order) return res.json({ success: false, paid: false });
  res.json({ success: true, paid: order.status === 'paid' || order.status === 'confirmed' || order.status === 'shipping' || order.status === 'delivered', status: order.status });
});

app.get('/api/orders/:code', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.order_code === req.params.code);
  if (!order) return res.json({ success: false });
  res.json({ success: true, data: {
    order_code: order.order_code,
    full_name: order.full_name,
    phone: order.phone,
    address: order.address,
    province: order.province,
    quantity: order.quantity,
    total_amount: order.total_amount,
    status: order.status,
    qr_url: buildQRUrl(order.total_amount, order.order_code),
    bank: BANK,
    created_at: order.created_at
  }});
});

app.put('/api/orders/:code/update', (req, res) => {
  const { phone, address } = req.body;
  if (!phone?.trim() || !address?.trim()) return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
  const db = readDB();
  const order = db.orders.find(o => o.order_code === req.params.code);
  if (!order) return res.json({ success: false, message: 'Không tìm thấy đơn' });
  if (order.status !== 'pending') return res.json({ success: false, message: 'Đơn đã xác nhận, không thể chỉnh sửa' });
  order.phone = phone.trim().replace(/\s/g, '');
  order.address = address.trim();
  order.updated_at = nowStr();
  writeDB(db);
  res.json({ success: true });
});

app.post('/api/orders/:code/cancel', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.order_code === req.params.code);
  if (!order) return res.json({ success: false, message: 'Không tìm thấy đơn' });
  if (order.status !== 'pending') return res.json({ success: false, message: 'Không thể hủy đơn này' });
  order.status = 'cancelled';
  order.updated_at = nowStr();
  writeDB(db);
  res.json({ success: true });
});

// ─── Admin Auth ──────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === getAdminPassword()) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Sai mật khẩu' });
  }
});
app.post('/api/admin/logout', (req, res) => { req.session.destroy(); res.json({ success: true }); });
app.get('/api/admin/check', (req, res) => res.json({ isAdmin: !!req.session.isAdmin }));

// ─── Admin Stats ─────────────────────────────────────────────────────────────
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const db = readDB();
  const orders = db.orders;
  const today = dateOf(nowStr());
  const active = orders.filter(o => o.status !== 'cancelled');
  const todayOrders = orders.filter(o => dateOf(o.created_at) === today);
  const revenueByDay = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const dayOrders = active.filter(o => dateOf(o.created_at) === ds);
    revenueByDay.push({ d: ds, orders: dayOrders.length, revenue: dayOrders.reduce((s, o) => s + o.total_amount, 0) });
  }
  res.json({
    success: true,
    data: {
      totalOrders:  orders.length,
      todayOrders:  todayOrders.length,
      totalRevenue: active.reduce((s, o) => s + o.total_amount, 0),
      todayRevenue: todayOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total_amount, 0),
      pending:    orders.filter(o => o.status === 'pending').length,
      paid:       orders.filter(o => o.status === 'paid').length,
      confirmed:  orders.filter(o => o.status === 'confirmed').length,
      shipping:   orders.filter(o => o.status === 'shipping').length,
      delivered:  orders.filter(o => o.status === 'delivered').length,
      cancelled:  orders.filter(o => o.status === 'cancelled').length,
      revenueByDay
    }
  });
});

// ─── Admin Orders ────────────────────────────────────────────────────────────
app.get('/api/admin/orders', requireAdmin, (req, res) => {
  const { status, search, page = 1, limit = 25 } = req.query;
  const db = readDB();
  let list = [...db.orders].reverse();
  if (status && status !== 'all') list = list.filter(o => o.status === status);
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(o =>
      o.full_name.toLowerCase().includes(s) ||
      o.phone.includes(s) ||
      o.order_code.toLowerCase().includes(s)
    );
  }
  const total = list.length;
  const pg = parseInt(page), lm = parseInt(limit);
  const data = list.slice((pg - 1) * lm, pg * lm);
  res.json({ success: true, data, pagination: { total, page: pg, limit: lm, totalPages: Math.ceil(total / lm) } });
});

app.put('/api/admin/orders/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const valid = ['pending', 'paid', 'confirmed', 'shipping', 'delivered', 'cancelled'];
  if (!valid.includes(status)) return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' });
  const db = readDB();
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn' });
  order.status = status;
  if (status === 'paid' && !order.paid_at) order.paid_at = nowStr();
  order.updated_at = nowStr();
  writeDB(db);
  res.json({ success: true });
});

app.put('/api/admin/password', requireAdmin, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) return res.status(400).json({ success: false, message: 'Mật khẩu tối thiểu 6 ký tự' });
  if (process.env.ADMIN_PASSWORD) return res.status(400).json({ success: false, message: 'Mật khẩu được quản lý qua biến môi trường ADMIN_PASSWORD' });
  const db = readDB();
  db.settings.admin_password = newPassword;
  writeDB(db);
  res.json({ success: true, message: 'Đã đổi mật khẩu' });
});

app.get('/api/admin/export', requireAdmin, (req, res) => {
  const { status, from, to } = req.query;
  const db = readDB();
  let list = [...db.orders].reverse();
  if (status && status !== 'all') list = list.filter(o => o.status === status);
  if (from) list = list.filter(o => dateOf(o.created_at) >= from);
  if (to)   list = list.filter(o => dateOf(o.created_at) <= to);
  const STATUS_VI = { pending: 'Chờ thanh toán', paid: 'Đã thanh toán', confirmed: 'Đã xác nhận', shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã huỷ' };
  const headers = ['Mã đơn', 'Họ tên', 'SĐT', 'Email', 'Địa chỉ', 'Tỉnh/TP', 'Số chai', 'Tổng tiền', 'Trạng thái', 'Ghi chú', 'Ngày đặt'];
  const csv = [headers, ...list.map(o => [
    o.order_code, o.full_name, o.phone, o.email, o.address, o.province,
    o.quantity, o.total_amount, STATUS_VI[o.status] || o.status, o.note,
    new Date(o.created_at).toLocaleString('vi-VN')
  ])].map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="guchasa-${new Date().toISOString().slice(0,10)}.csv"`);
  res.send('﻿' + csv);
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const db = readDB();
  console.log('\n🌿 GưChaSa Shop đang chạy tại: http://localhost:' + PORT);
  console.log('📊 Admin dashboard:           http://localhost:' + PORT + '/admin.html');
  console.log(`📦 DB: ${DB_FILE}`);
  console.log(`📋 Đơn hàng hiện có: ${db.orders.length}\n`);
});
