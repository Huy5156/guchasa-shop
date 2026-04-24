# 🌿 GưChaSa Shop - Hướng dẫn chạy

## 1. Cài đặt lần đầu

Yêu cầu: **Node.js 18+** ([tải tại đây](https://nodejs.org))

Chỉ cần double-click **`start.bat`** — lần đầu sẽ tự `npm install` dependencies.

Hoặc thủ công:
```bash
npm install
npm start
```

## 2. Truy cập

| URL | Chức năng |
|---|---|
| http://localhost:8080 | Landing page bán hàng |
| http://localhost:8080/admin.html | Trang quản trị |

**Mật khẩu admin mặc định:** `admin123` → đổi ngay ở tab **Cài đặt** sau khi đăng nhập lần đầu.

## 3. Cấu hình thanh toán

Đã cấu hình sẵn trong `server.js`:

- **Ngân hàng:** MB Bank (BIN `970422`)
- **Số tài khoản:** `36911021102`
- **Chủ tài khoản:** NGUYEN VAN HUY

Khi khách đặt hàng, hệ thống tự sinh mã đơn dạng `GCSYYYYMMDDxxxx` và tạo QR VietQR động qua `img.vietqr.io` — QR có sẵn số tiền + nội dung chuyển khoản (chính là mã đơn), khách quét app ngân hàng là thanh toán ngay.

Muốn đổi tài khoản/chủ tài khoản → sửa biến `BANK = {…}` ở đầu `server.js`.

## 4. Luồng xử lý đơn

1. Khách điền form → hệ thống lưu đơn trạng thái `pending` và hiện QR.
2. Khách quét QR, chuyển khoản qua app MB/các ngân hàng.
3. **Bạn kiểm tra app MB** — khi thấy tiền về có nội dung là mã đơn (`GCS…`):
   - Vào **Admin → Đơn hàng** → tìm mã đơn → đổi trạng thái sang **"Đã thanh toán"**
   - Hoặc click vào mã đơn → bấm nút **"✅ Xác nhận đã nhận tiền"**.
4. Landing page của khách **tự động** hiện "Đã nhận thanh toán" (polling 10s/lần).
5. Tiếp tục chuyển trạng thái: `Đã xác nhận` → `Đang giao` → `Đã giao`.

> Phiên bản này dùng **xác nhận thủ công** (an toàn, không cần tích hợp API ngân hàng).
> Nếu sau này muốn tự động khớp (auto-reconcile) theo SMS/webhook ngân hàng → có thể mở rộng thêm, nói mình biết.

## 5. Giá bán

- **1 combo = 5 chai 500ml = 219.000đ** — miễn phí ship toàn quốc.
- Giá gốc niêm yết: 250.000đ/chai (tức 1.250.000đ/5 chai) — tiết kiệm ~82%.
- Muốn đổi giá → sửa `PRODUCT.combo_price` trong `server.js` và mảng `<option>` trong `public/index.html`.

## 6. Thông điệp "xả hàng cận date"

Đã viết sẵn trong landing page (tinh tế, không gây mất tin tưởng):
- Gọi là **"Flash sale tri ân"** / **"lô hàng tri ân từ nhà máy"**
- Ghi rõ hạn dùng **"còn hơn 2 tháng"** + kèm lý giải *"1 chai dùng 1,5-2 tháng, mua về dùng là vừa hết"* → khách yên tâm.
- Nhấn mạnh **chất lượng không đổi** + **số lượng có hạn** để thúc đẩy ra quyết định.

## 7. Ảnh sản phẩm

Copy 2 ảnh sản phẩm (chai + hộp) vào thư mục `public/images/` và đặt tên:
- `product-1.jpg` — ảnh chai chính (hiện ở hero)

Hoặc đổi đường dẫn trong `public/index.html` tại thẻ `<img src="/images/product-1.jpg">`.

## 8. Dữ liệu đơn hàng

Lưu ở file `data.json` (cùng cấp với `server.js`). Nên **backup định kỳ**.

Xuất CSV toàn bộ đơn: vào Admin → nút **"⬇ Xuất CSV"**.

## 9. Deploy lên internet (tuỳ chọn)

Có thể deploy miễn phí lên:
- **Railway** / **Render** / **Fly.io** — chỉ cần push code, set biến môi trường `ADMIN_PASSWORD` để đổi pass, xong.
- Cần tên miền riêng thì trỏ về Railway — mình có thể hướng dẫn sau.

## 10. Biến môi trường (tuỳ chọn)

| Biến | Ý nghĩa |
|---|---|
| `PORT` | Cổng chạy (mặc định 8080) |
| `ADMIN_PASSWORD` | Mật khẩu admin (ưu tiên hơn file data.json) |
| `SESSION_SECRET` | Chuỗi bí mật session |
| `DATA_FILE` | Đường dẫn file DB (mặc định `./data.json`) |

---

Có gì vướng cứ báo mình nhé!
