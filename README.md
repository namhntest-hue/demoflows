# Demo — E-commerce Flow (Mobile) · HTML + Tailwind

Bản HTML/CSS/Tailwind của flow mua hàng mobile, dựng lại từ `e-commerceflowdesign.zip` (Figma Make).

## Chạy

Mở `index.html` bằng trình duyệt là xong — **không cần build, không cần internet** (Tailwind đã biên dịch sẵn vào `tailwind.css`).

> Nếu mở bằng `file://` mà ảnh không hiện, chạy server tĩnh:
> ```bash
> python3 -m http.server 8000    # rồi mở http://localhost:8000
> ```

## Cấu trúc

```
mugi-flow/
├── index.html      ← toàn bộ 8 màn + JS router + hiệu ứng
├── tailwind.css    ← Tailwind đã compile (21KB, không cần CDN)
├── assets/         ← 21 ảnh thật lấy từ file gốc
└── README.md
```

## Flow (6 màn)

`Danh sách → Sản phẩm → Giỏ hàng → Đăng nhập → Thanh toán → Hoàn tất`

Checkout là **1 trang duy nhất** với 3 section tự đóng/mở (Thông tin giao hàng → Vận chuyển → Thanh toán), không chuyển trang.

Điều hướng hoàn toàn bằng nút trong trang: bấm sản phẩm → PDP · Thêm vào giỏ → Giỏ hàng · Đặt hàng → Đăng nhập · logo → về Danh sách.

## Mobile web thật

Không có khung điện thoại, không giới hạn chiều cao — trang cuộn bằng **body** nên trên điện thoại thanh địa chỉ trình duyệt tự thu/hiện đúng như website thường.

- `<meta viewport ... viewport-fit=cover>` + `env(safe-area-inset-bottom)` cho máy có tai thỏ / thanh gesture
- Header `sticky top-0`, thanh Bộ lọc `sticky top-[48px]` (bám thật, không phải overlay giả)
- Sticky CTA dùng `position: fixed` theo viewport
- Đã kiểm tra **không tràn ngang** ở 360 / 375 / 393 / 412 px

## Header (component Nav 2147:1655)

| Trang | Header |
|---|---|
| Danh sách · Sản phẩm · Giỏ hàng | `[burger][search]` · logo giữa (93×20) · `[user][bag]` |
| Thanh toán | chỉ logo, canh trái |

Thanh khuyến mãi chạy chữ nằm **trên** header.

## Design system (tokens07.json)

Toàn bộ màu / spacing / bo góc **lấy trực tiếp từ `tokens07.json`** — không hardcode hex, không tự chế giá trị.

`tokens.css` được **sinh tự động** từ JSON (đừng sửa tay):

```bash
python3 gen_tokens.py     # tokens07.json -> tokens.css
```

Nó xuất ra:
- **243 raw colors** → `--color-neutral-950`, `--color-red-600`, …
- **139 semantic tokens** → `--general-primary`, `--general-border`, `--general-destructive`, …
- **36 spacing** (`--spacing-4: 16px`) + **8 border radii** (`--radius-2: 2px`)
- Mode **D** = mặc định · mode **GM** = thêm class `.theme-gm` vào `<html>` để đổi theme

Tailwind map thẳng vào các biến đó (`tailwind.config.js`), nên trong HTML chỉ dùng **tên semantic**:

| Dùng trong code | Token | Giá trị (mode D) |
|---|---|---|
| `bg-primary` / `text-foreground` | `general/primary`, `general/foreground` | `#0a0a0a` |
| `text-primary-foreground` | `general/primary foreground` | `#fafafa` |
| `text-secondary-foreground` | `general/secondary foreground` | `#262626` |
| `text-foreground-alt` | `unofficial/foreground alt` | `#404040` |
| `text-mid-alt` | `unofficial/mid alt` | `#525252` |
| `text-muted-foreground` | `general/muted foreground` | `#737373` |
| `border-border` / `bg-secondary` | `general/border`, `general/secondary` | `#e5e5e5` / `#f5f5f5` |
| `bg-accent-0` | `unofficial/accent 0` | `#fafafa` |
| `text-destructive` / `bg-destructive-subtle` | `general/destructive`, `unofficial/destructive subtle` | `#d62845` / `#fef2f2` |
| `text-warning` | `general/warning` | `#d97706` |
| `text-success` | `general/success` | `#1a7a5c` |

Còn dùng được (chưa cần tới trong flow này): `info`, `card`, `popover`, `sidebar/*`, `focus/ring`, `chart/*`, `accent` (cam brand `#ff6600`), các bậc `border-0…5`, `accent-2/3`, trạng thái `*-hover` / `*-active`.

Rebuild CSS sau khi sửa class:
```bash
npx tailwindcss -c tailwind.config.js -i in.css -o tailwind.css --minify
```

## Tính năng thử được

- **Voucher**: nhập `JUNE500` / `JUNE900` / `JUNE2000` → tổng tiền tự tính lại
- **Show more** ở PLP → skeleton rồi load thêm sản phẩm
- **Xóa/đổi số lượng** trong giỏ → xóa hết sẽ ra empty state
- Chọn size (52–55 disabled), chọn màu → gallery tự trượt theo

## ⚠️ Về ảnh

File zip gốc có **9 ảnh bị hỏng encoding** khi export (mọi byte non-ASCII bị thay bằng ký tự thay thế UTF-8 → không khôi phục được):
`brand-hero`, `cert`, `payment-methods`, `shipping`, `social-1/2/3`, `pdp-sw1`, và `p8` (Áo thun Versace).

Xử lý:
- **Icon social / payment / shipping / bảo chứng** → thay bằng **inline SVG + badge chữ** (nét gọn, không cần file ảnh).
- **p8** → tạm dùng lại ảnh `p2.png`.

20 ảnh còn lại là **ảnh thật từ file gốc**, dùng nguyên. Nếu bạn export lại zip từ Figma Make (chọn download dạng binary/ZIP thay vì copy text), gửi mình để mình gắn lại đúng 9 ảnh này.

## Build lại CSS (nếu bạn sửa class trong `index.html`)

```bash
npm i -D tailwindcss@3.4.17
npx tailwindcss -i in.css -o tailwind.css --minify
```
với `tailwind.config.js` trỏ `content: ['index.html']` và extend token màu ở bảng trên.
