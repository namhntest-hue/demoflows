# Demo — E-commerce Flow (Mobile) · DAFC / Versace · HTML + Tailwind

Demo mobile e-commerce flow cho **DAFC** (nhà phân phối đa thương hiệu luxury tại Việt Nam), dựng bằng HTML + Tailwind CSS thuần, không dùng framework. Nội dung sản phẩm là dữ liệu thật scrape từ `shop.dafc.com.vn/brands/versace.html` (10 sản phẩm Versace). Giá giảm/badge -% là dữ liệu tự tạo để demo.

## Chạy

Mở `index.html` bằng trình duyệt là xong — không cần build, không cần internet (Tailwind đã biên dịch sẵn vào `tailwind.css`).

> Nếu mở bằng `file://` mà ảnh không hiện, chạy server tĩnh:
> ```bash
> python3 -m http.server 8000    # rồi mở http://localhost:8000
> ```

## Cấu trúc

```
demo-flow/
├── index.html          — toàn bộ app (router, state, tất cả screens)
├── in.css              — input Tailwind (3 directive @tailwind)
├── tailwind.css         — CSS đã compile (build ra từ in.css, PHẢI commit)
├── tokens.css            — biến CSS design token (build ra từ tokens07.json, PHẢI commit)
├── tokens07.json         — export gốc từ Figma variables (nguồn sự thật)
├── gen_tokens.py          — script sinh tokens.css từ tokens07.json
├── tailwind.config.js     — cấu hình Tailwind, map class → CSS variable
├── assets/                — ảnh sản phẩm/logo/swatch (đường dẫn dùng qua biến A = 'assets/' trong index.html)
├── .gitignore
└── README.md
```

## Flow màn hình

`PLP → PDP (6 biến thể: pdp, pdp2..pdp6) → Cart → Login (5 view: login/register/otp/setpass/forgot) → Account (6 tab) → Order detail → Checkout → Done`

- Router SPA thủ công trong `index.html`: `FLOW`, `RENDER`, `go(name)`, `history`.
- 6 biến thể PDP, mỗi bản gắn 1 sản phẩm khác nhau (SP#1–SP#6), khác nhau về layout size (chip vs dropdown), vị trí Payment Offer, hiệu ứng gallery/lightbox, font (Inter cho pdp6)...
- i18n VI/EN thật: từ điển 2 chiều + regex cho chuỗi có số, áp dụng qua `applyLang()`, gọi lại mỗi khi render màn mới.
- Settings FAB (góc phải dưới): đổi ngôn ngữ + đổi font (Montserrat/Inter/Plus Jakarta Sans).

## Mobile web thật

Không có khung điện thoại, không giới hạn chiều cao — trang cuộn bằng **body**.

- `<meta viewport ... viewport-fit=cover>` + `env(safe-area-inset-bottom)` cho máy có tai thỏ / thanh gesture
- Header `sticky top-0`, thanh Bộ lọc `sticky top-[48px]`
- Sticky CTA dùng `position: fixed` theo viewport
- Đã kiểm tra không tràn ngang ở 360 / 375 / 393 / 412 px

## Design system (tokens07.json)

Toàn bộ màu / spacing / bo góc lấy trực tiếp từ `tokens07.json` (export gốc từ Figma variables) — không hardcode hex.

`tokens.css` được sinh tự động từ JSON (đừng sửa tay):

```bash
python3 gen_tokens.py     # tokens07.json -> tokens.css
```

Xuất ra 426 biến CSS (raw colors + semantic tokens + spacing + radii). Mode **D** = mặc định · mode **GM** = thêm class `.theme-gm` vào `<html>`.

`gen_tokens.py` dùng bảng ID→tên tường minh (31 entry đã verify với Figma API) thay vì đoán theo thứ tự, và fail-fast nếu gặp alias lạ chưa map — cần bổ sung bảng `ID2NAME` nếu Figma thêm theme token mới.

Rebuild CSS sau khi sửa class trong `index.html`:
```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i in.css -o tailwind.css --minify
```
> Pin bản `3.4.17` (bản đã dùng để build) — Tailwind v4 đổi CLI/config, chạy bản mới nhất sẽ lỗi.

## Vấn đề tồn đọng / cần quyết định tiếp

- **Ảnh sản phẩm thật từ CDN DAFC** (`cdn.dafc.com.vn`) bị chặn mạng trong môi trường build gốc — đang dùng ảnh placeholder.
- **`--unofficial-accent`**: mode D = cam `#ff6600`, mode GM = đen `#0a0a0a` — chưa dùng ở đâu, chưa quyết định giữ/đổi.
- **Luồng hết hàng 2 tầng** (size tạm hết / nhận thông báo khi có hàng) chỉ áp dụng cho PDP dùng size dạng chip (pdp, pdp4) — PDP dùng dropdown (pdp2/pdp3/pdp5/pdp6) chưa hỗ trợ vì `<option disabled>` chặn tương tác.
- **PDP v1 (pdp) — layout Pre-order**: ngày giao hàng "15/08/2026" đang hardcode; "Chỉ còn 01 sản phẩm" vẫn hiện dù đã là pre-order (có thể mâu thuẫn logic).
- **Account**: 9 màn theo Figma gốc (Info/Info-Error/Address/Address-Empty/Orders/Orders-Empty/Loyalty/Points/Points-Empty) đã gộp thành 1 trang 6-tab — chưa có trạng thái Empty/Error riêng.

## Nguồn thiết kế

Figma file "Test MCP - nam v2", fileKey `sOCu52RuG8ktjHYt4UiME5`, đọc qua figma-console MCP.
