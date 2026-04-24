// ── Countdown ────────────────────────────────────────────────────────────────
(function(){
  // Đặt thời gian kết thúc = hôm nay 23:59:59
  const end = new Date();
  end.setHours(23, 59, 59, 0);

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const diff = end - Date.now();
    if (diff <= 0) {
      // Reset lại ngày mai
      end.setDate(end.getDate() + 1);
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cdH').textContent = pad(h);
    document.getElementById('cdM').textContent = pad(m);
    document.getElementById('cdS').textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

// ── Stock bar ────────────────────────────────────────────────────────────────
(function(){
  const stock = 47; // còn lại
  const total = 200;
  const pct = ((total - stock) / total * 100).toFixed(0);

  // Animate sau 600ms
  setTimeout(() => {
    const fill = document.getElementById('stockFill');
    if (fill) fill.style.width = pct + '%';
  }, 600);

  // Giảm dần nhẹ (giả lập)
  let cur = stock;
  setInterval(() => {
    if (cur > 5 && Math.random() < 0.15) {
      cur--;
      const el = document.getElementById('stockNum');
      const el2 = document.getElementById('stickyStock');
      if (el) el.textContent = cur;
      if (el2) el2.textContent = cur;
      const newPct = ((total - cur) / total * 100).toFixed(0);
      const fill = document.getElementById('stockFill');
      if (fill) fill.style.width = newPct + '%';
    }
  }, 25000); // mỗi ~25s giảm 1 cái (random)
})();

// ── Live viewer count ────────────────────────────────────────────────────────
(function(){
  let count = 18 + Math.floor(Math.random() * 12); // 18-30
  function update(){
    const delta = Math.random() < 0.5 ? 1 : -1;
    count = Math.max(10, Math.min(60, count + delta));
    const el = document.getElementById('liveCount');
    if (el) el.textContent = count;
  }
  setInterval(update, 7000);
})();

// ── Toast social proof ───────────────────────────────────────────────────────
(function(){
  const names = ['Nguyễn Thị H.','Trần Văn M.','Lê Thị L.','Phạm Thị T.','Hoàng Văn A.',
                 'Vũ Thị N.','Đặng Văn K.','Bùi Thị P.','Đỗ Văn S.','Ngô Thị B.',
                 'Lý Văn C.','Trương Thị D.','Đinh Văn E.','Mai Thị F.','Cao Văn G.'];
  const cities = ['Hà Nội','TP.HCM','Đà Nẵng','Hải Phòng','Cần Thơ','Huế','Nha Trang',
                  'Bình Dương','Đồng Nai','Vũng Tàu','Quảng Ninh','Nghệ An','Thanh Hoá'];
  const combos = ['1 chai','2 chai','5 chai','5 chai','10 chai','3 chai','5 chai'];

  const toast = document.getElementById('toast');

  function showToast(){
    const name = names[Math.floor(Math.random()*names.length)];
    const city = cities[Math.floor(Math.random()*cities.length)];
    const combo = combos[Math.floor(Math.random()*combos.length)];
    toast.innerHTML = `<div class="toast-avatar">🛒</div><div><b>${name}</b> (${city})<br/>vừa đặt <b>${combo}</b> GưChaSa</div>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // Lần đầu sau 5s, sau đó random 12-30s
  setTimeout(() => {
    showToast();
    setInterval(showToast, 15000 + Math.random() * 15000);
  }, 5000);
})();

// ── Scroll fade-in (Intersection Observer) ───────────────────────────────────
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
})();

// ── Count-up animation ───────────────────────────────────────────────────────
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      let cur = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString('vi-VN');
        if (cur >= target) clearInterval(timer);
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-up').forEach(el => obs.observe(el));
})();

// ── Sticky CTA (hiện khi scroll qua hero) ────────────────────────────────────
(function(){
  const cta = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  if (!cta || !hero) return;
  const obs = new IntersectionObserver(([e]) => {
    cta.classList.toggle('visible', !e.isIntersecting);
  }, { threshold: 0.2 });
  obs.observe(hero);
})();
