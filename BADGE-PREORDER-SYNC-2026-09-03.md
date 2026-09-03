# Badge "Đặt trước" — đồng bộ về ĐỨNG TRƯỚC TÊN cho mọi thẻ, 03/09/2026

> Lệnh user: *"đồng bộ cách đặt badge đặt trước trước tên sản phẩm cho toàn bộ các thẻ trong trang nhé"*
>
> Áp **CẢ 5 FILE**: `index.html` · `desktop.html` · `desktop-neutral` · `-editorial` · `-atelier`.
> `home.html` không có thẻ sản phẩm mang `preorder` nên không đụng.

---

## 1 · Vì sao còn lệch

Chốt 27/08/2026 đưa badge từ **nhãn đè ảnh** xuống **đứng trước TÊN, cùng hàng với tên**, nhưng
lượt đó **chỉ sửa `productCard()`** (thẻ PLP + các dải gợi ý) và khối brand/tên của PDP. Bốn loại
thẻ khác vẫn giữ khuôn cũ của **14/08**, hoặc chưa từng có badge:

| Loại thẻ | Trạng thái trước 03/09 |
|---|---|
| Hàng giỏ (`item-cart`) | badge **ĐÈ góc trên-trái ảnh** |
| Hàng tóm tắt đơn ở checkout | badge **ĐÈ góc trên-trái ảnh** |
| Hàng chi tiết đơn (màn `order`) | **không có badge**, chỉ 1 dòng chữ mở đầu bằng *"Pre-order ·"* |
| Hàng mini cart desktop (`cc-row`) | **không có badge**, chỉ dòng ngày |
| Tấm "Đã thêm vào giỏ hàng" (`#ccName`) | **không có badge**, dòng mở đầu bằng *"Pre-order ·"* |

Kết quả: cùng một sản phẩm, đi qua 5 màn thì badge nằm ở 3 chỗ khác nhau — hoặc mất hẳn.

---

## 2 · Khuôn chuẩn (đúng khuôn thẻ PLP chốt 27/08)

```html
<div class="flex items-center gap-1.5 min-w-0">          <!-- items-start nếu tên xuống 2 dòng -->
  ${x.preorder ? `<span class="[mặt badge] px-1 text-[12px] font-medium leading-4 shrink-0">Đặt trước</span>` : ''}
  <p class="w-full min-w-0 … truncate">${x.name}</p>
</div>
```

- **`shrink-0` cho badge, `w-full min-w-0` + `truncate` cho tên** — badge không bao giờ bị bóp,
  tên co lại. Đây là đánh đổi user đã chọn 27/08 (*"badge nằm chung 1 hàng với tên chứ"*).
- Tên xuống **2 dòng** (`line-clamp-2`, ở tóm tắt đơn và chi tiết đơn) thì canh **`items-start`**
  để badge nằm ngang dòng ĐẦU, không bị đẩy xuống giữa.
- **Mặt badge theo từng bộ da**, không in cứng một màu: `index`/`desktop` = `.badge-inline`
  (token `--general-border` #dfdfdf) · `neutral`/`editorial` = `.tag-note` · `atelier` =
  `bg-secondary`. Đúng đúng mặt mà `productCard()` của chính file đó đang dùng.

---

## 3 · Hai mươi chỗ đã sửa

### 3.1 Dời badge: từ đè ảnh → trước tên (**10 chỗ**)

| Chỗ | File |
|---|---|
| Hàng giỏ `item-cart` | cả 5 |
| Hàng tóm tắt đơn ở checkout | cả 5 |

Gỡ luôn `<span class="absolute top-0 left-0 …">` khỏi ô ảnh. Ô ảnh **giữ class `relative`** —
nó còn là mốc cho lớp phủ khác (nhãn quà tặng vẫn đè ảnh, đó là badge KHÁC, không thuộc đợt này).

### 3.2 Thêm badge (**10 chỗ**)

| Chỗ | File | Ghi chú |
|---|---|---|
| Hàng chi tiết đơn (`order`) | cả 5 | badge + dòng ngày viết lại |
| Hàng mini cart `cc-row` | `desktop.html` | tấm này trước đó là **chỗ duy nhất** không nhận ra hàng đặt trước ngay ở dòng tên |
| Tấm "Đã thêm vào giỏ hàng" `#ccBadge` | `index` + 3 fork | badge là phần tử **TĨNH** trong markup, `openCC` chỉ bật/tắt bằng class `hidden` — không dựng lại chuỗi HTML nên không phải lo escape |

Tổng cộng mỗi file: `index` 6 chỗ · `desktop` 7 · mỗi fork 6.

### 3.3 Dọn kèm: bỏ tiền tố "Pre-order ·" (**5 chỗ**)

Dòng ngày ở chi tiết đơn và ở tấm xác nhận thêm giỏ mở đầu bằng **"Pre-order ·"** — vừa **lặp
lại** đúng thứ badge vừa nói, vừa là **chữ Anh trong câu Việt** (nhãn tiếng Việt đã chốt 27/08 là
*"Đặt trước"*). Nay:

```
Pre-order · Nhận hàng dự kiến 30/09/2026   →   Nhận hàng dự kiến 30/09/2026
```

Ngày tách `<span class="font-medium">` như hàng giỏ. **Lợi kèm về i18n**: dòng nay đi bằng khoá
tự vựng sẵn có `'Nhận hàng dự kiến' → 'Estimated arrival'`, không cần luật regex riêng cho
chuỗi có ngày. Hai luật regex cũ của chuỗi *"Pre-order · …"* **giữ nguyên** trong
`I18N_RE`/`I18N_REV` (rẻ, và còn dùng nếu bật lại) — đúng nếp đã ghi ở dòng đếm giỏ bỏ 19/08.

Đây chính là **lệch #2** đã ghi trong `PLP-FIGMA-SYNC-2026-09-03.md` mục 7.5 — nay xử luôn.

---

## 4 · Kiểm sau khi sửa

Đo trên trang chạy, bộ da vào-trang `skin-mt skin-li`:

| Kiểm | Kết quả |
|---|---|
| Badge còn đè ảnh | **0** ở cả 5 file (grep + đo DOM) |
| Badge và tên **cùng một dòng** | ✔ hàng giỏ · tóm tắt checkout · chi tiết đơn · mini cart · tấm xác nhận |
| Mặt + cỡ badge khớp thẻ PLP | 12/16 · 400 · nền `#dfdfdf` (`index`), theo token của từng fork |
| Bật/tắt đúng theo data | thêm SP#1 (pre-order) → badge hiện; thêm SP#2 → **badge ẩn** |
| Dòng ngày | *"Nhận hàng dự kiến 30/09/2026"*, ngày in đậm, **0** node còn chữ "Pre-order" |
| EN mode | badge → **"Pre-order"**, dòng ngày → **"Estimated arrival 30/09/2026"** (cart + checkout) |
| Console | **sạch** ở cả 5 file |

3 bản fork skin: mở được, hàng giỏ dựng đúng, badge trước tên, console sạch — kiểm từng bản.

---

## 5 · Còn lại — không thuộc đợt này

- **Nhãn quà tặng** (`Quà tặng`) vẫn đè ảnh ở hàng giỏ. Đó là badge khác, nói chuyện khác; lệnh
  chỉ nói về badge đặt trước. Muốn đồng bộ cả nhãn này thì là một quyết định riêng.
- **Nhãn chiến dịch** (`New Season` · `La Vacanza`) vẫn đè ảnh trên thẻ PLP — đúng chủ ý chốt
  27/08: *"nhãn chiến dịch thuộc về ẢNH, còn Đặt trước nói TÌNH TRẠNG BÁN của SKU nên chỗ của
  nó là cạnh tên"*.
- **Component `product-item-info` trong Figma** vẫn ở bản 26/08: variant `kind=pre-order` còn
  vẽ badge **đè ảnh**. Sau đợt này thì Figma là bên lệch, không phải code — cần cập nhật
  component (ghi ở `PLP-FIGMA-SYNC-2026-09-03.md` mục 4).
