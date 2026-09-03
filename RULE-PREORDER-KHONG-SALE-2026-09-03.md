# Luật: hàng ĐẶT TRƯỚC không bán giảm giá — 03/09/2026

> Lệnh user: *"note rule là sản phẩm đặt trước sẽ không có sale, hãy điều chỉnh lại các demo cho
> phù hợp"*

Áp **CẢ 5 FILE**: `index.html` · `desktop.html` · `desktop-neutral` · `-editorial` · `-atelier`.

---

## 1 · Chỗ vi phạm: đúng MỘT sản phẩm

Quét cả 5 file: chỉ **SP#1 — "Đầm lụa mini Broken Jewels"** mang cả `preorder` lẫn `off`. Nó là
sản phẩm chủ lực của demo (PDP#1 · dòng đầu giỏ hàng · tấm "Đã thêm vào giỏ hàng" · mọi ảnh minh
hoạ badge Đặt trước), và trước đợt này bày **badge "Đặt trước" cạnh tên + chip −20% + giá gốc gạch
ngang** cùng lúc.

Toàn bộ data khác không có ca nào trùng: mỗi file chỉ có **1 dòng** mang `preorder`.

## 2 · Sửa data — GIỮ giá 72.557.000 ₫, bỏ cờ sale

| | Trước | Sau |
|---|---|---|
| `PRODUCTS[0]` | `price:'72.557.000 ₫', off:'-20%', was:'90.696.000 ₫'` | `price:'72.557.000 ₫'` (bỏ 2 khoá, đúng nếp các dòng không giảm giá) |
| `CART_BASE[0]` | `off:'-20%', was:'90.696.000 ₫', now:'72.557.000 ₫'` | `off:'', was:'', now:'72.557.000 ₫'` (đúng nếp dòng túi Lou) |

**Vì sao giữ 72.557.000 mà không nâng về 90.696.000** (giá gốc): con số 72.557.000 đang được
**cân theo mốc quà tặng** của demo — comment tại chỗ ghi rõ *"gồm đầm pre-order 72.557.000 ₫ từ
14/08/2026 để demo được cả 2 chiều: mốc 1…"*. Nâng giá thêm 18.139.000 ₫ là đẩy tổng giỏ vượt mốc,
làm rơi đúng cái demo quà tặng đã tinh chỉnh. Bỏ cờ sale mà giữ giá thì **mọi tổng tiền · mốc quà ·
điểm thưởng · số ở màn thanh toán đứng nguyên**, và về nghĩa cũng đúng: sản phẩm chỉ còn MỘT giá,
không ai còn thấy "giá gốc" để thắc mắc.

## 3 · Chốt an toàn ở NGUỒN, không chặn ở từng chỗ render

Thêm ngay sau khi `CART` được dựng:

```js
[PRODUCTS, CART_BASE, CART].forEach(arr => arr.forEach(x => {
  if (x.preorder) { x.off = ''; x.was = ''; }
}));
```

Hai mảng này được đọc ở **6 nơi có bày giá** — thẻ PLP · PDP · hàng giỏ · tóm tắt checkout · chi
tiết đơn · tấm "Đã thêm vào giỏ hàng". Chặn ở từng chỗ là 6 lần có thể quên; dọn ở nguồn thì sau
này thêm data mới mà lỡ gán cả `preorder` lẫn `off` vẫn **không** bày ra chip −% / giá gạch cạnh
badge "Đặt trước".

## 4 · Kiểm

Phép kiểm: với **mọi khối đang hiện có badge "Đặt trước"**, quét trong CHÍNH khối đó xem có phần tử
`-N%` hoặc phần tử gạch ngang **có chữ** không.

| File | Màn kiểm | Vi phạm |
|---|---|---|
| `index.html` | PLP · PDP SP#1 · giỏ hàng · checkout · chi tiết đơn · tấm thêm giỏ | **0** |
| `desktop.html` | PLP · PDP · giỏ hàng · checkout · **mini cart** | **0** |
| 3 fork | data + hàng giỏ | **0** |

`node --check` **10/10** khối script OK · console **sạch** cả 5 file.

**Một bẫy khi kiểm, ghi lại:** thẻ sản phẩm luôn render sẵn một `<p class="… line-through">` **rỗng**
cho dòng giá gốc (để mọi thẻ cao bằng nhau — Figma cũng vậy: `kind=default` và `kind=sale` đều
366,1). Phép kiểm chỉ tìm "phần tử có `line-through`" sẽ báo vi phạm giả ở MỌI thẻ. Phải thêm điều
kiện **có chữ**.

## 5 · Còn lệch: Figma

Component `product-item-info` variant **`kind=pre-order`** trong Figma vẫn có `old-price`
*"90.696.000 ₫"* trong `price-box` — tức bản thiết kế nay bày pre-order + sale cùng lúc, chọi luật
mới. Chưa sửa vì lệnh nói *"các demo"* (5 file HTML). Sửa thì chỉ là ẩn `old-price` + chip trong 2
variant pre-order (grid + rail) — nói một tiếng là làm.
