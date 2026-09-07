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
- ~~**Component `product-item-info` trong Figma** vẫn vẽ badge đè ảnh~~ → **đã xử ngay cùng ngày,
  xem mục 6.**

---

## 6 · Đưa vào file Figma (cùng ngày, lệnh thứ hai)

> Lệnh user: *"adapt badge đặt trước vào file figma luôn nhé"*

### 6.1 Sửa ở COMPONENT, không sửa từng khung

Quét cả file: **129 node chữ** "Đặt trước"/"Pre-order". Gốc của khuôn cũ nằm ở **3 component**,
nên sửa master là mọi instance theo — không phải đi từng khung:

| Component | Trước | Sau |
|---|---|---|
| `product-item-info` (6 variant) | `kind=pre-order` có `badge-label` **đè ảnh** (nội dung lại là *"New Collection"*) | badge **`badge-inline` cạnh tên**; nhãn đè ảnh **ẩn** lại (giữ node làm slot nhãn chiến dịch) |
| `product-item-info-desktop` (4 variant) | **không có** slot badge cạnh tên | thêm `badge-inline` (ẩn mặc định — component không có trục `kind`) |
| `cart-row` (3 variant) | `kind=pre-order` có `badge · Pre-order` **đè ảnh** | badge cạnh tên; nhãn đè ảnh ẩn |

Cách dựng: chèn khung **`name-row`** (HORIZONTAL · khe **6** · canh CENTER) vào trong `name-block`
/ `name-head`, bọc chính node tên lại, badge đứng trước. Badge = frame `badge-inline` hug, đệm
ngang **4**, nền **`Color/border`** (#dfdfdf — bind biến), chữ **12/16 `t-ui`** mực
`Color/foreground`. Đúng bộ số đo được trên trang chạy (65,1×16).

**Thêm `name-row` vào CẢ MỌI variant** (badge ẩn ở `default`/`sale`/`discount`) để cấu trúc các
variant khớp nhau — đổi variant trên instance thì override chữ mới chuyển được.

### 6.2 Bẫy đã vá: bọc tên làm tên xuống 2 dòng

Đặt `layoutSizingHorizontal = 'FILL'` cho node tên thì Figma **tự đổi `textAutoResize` sang
HEIGHT** → tên hết chỗ, xuống 2 dòng, thẻ cao thêm 18px (366,1 → 384,1). `maxLines = 1` và
`textTruncation = 'ENDING'` **không** kéo lại chiều cao. Vá: `textAutoResize = 'TRUNCATE'` +
`layoutSizingVertical = 'FIXED'` + `resize(w, 18)` — đúng nếp `truncate` của CSS.

### 6.3 Bảy chỗ RAW phải sửa tay (không phải instance)

| Chỗ | Xử |
|---|---|
| `Cart / mobile 375` · `Cart / desktop 1440` ×2 — hàng giỏ raw | ẩn badge đè ảnh + chèn `name-row` |
| `PLP / desktop 1440` · `PLP / desktop · danh mục` · `· đang lọc` — 3 node `badge-label` **rời** nằm trực tiếp trong `#plpGrid` (workaround cũ) | **bật slot `badge-inline`** của đúng thẻ rồi **gỡ node rời** |
| `PDP / desktop 1440` — badge đè ảnh gallery | ẩn + chèn `name-row` cạnh tên |
| `PDP / mobile 375` — badge "Pre-order" trong chồng 3 badge đè ảnh | ẩn (2 badge chiến dịch còn lại **giữ nguyên**) + chèn `name-row` |
| `Thêm vào giỏ / mobile · hàng đặt trước` — "Đặt trước" là **chữ trần** trong một `clamp` (không có mặt #dfdfdf) | thay bằng `badge-inline` thật |
| `Thêm vào giỏ / desktop · mini cart nhiều món` · `· màn PDP + mini cart` — hàng mini cart chưa có badge | chèn `name-row` vào hàng pre-order |
| `badge / example — Badge` — mẫu tài liệu dán badge "Pre-order" lên thumb sản phẩm | đổi nhãn mẫu sang **"New Season"**: badge đè ảnh nay chỉ dành cho nhãn chiến dịch |

### 6.4 Kiểm

| Kiểm | Kết quả |
|---|---|
| Badge pre-order còn **đè ảnh** ở bất kỳ đâu trong file | **0** |
| Badge **cạnh tên** | **26** node |
| Nút CTA nhãn "Đặt trước" (đúng, là nút) | 7 |
| **Override chữ của instance** (tên/brand từng thẻ) | **162/162 còn nguyên** |
| **Chiều cao** component + khung | **lệch 0px** — mọi variant và mọi khung giữ đúng số cũ |

Ảnh kiểm: `product-item-info kind=pre-order` và `cart-row kind=pre-order` render đúng như trang
chạy — ảnh sạch, `[Đặt trước] tên…` cắt bằng ellipsis.

### 6.5 Một lỗi CÓ SẴN thấy ra khi chụp kiểm — chưa sửa

Trong `cart-row kind=pre-order`, dòng *"Nhận hàng dự kiến 30/09/2026"* **vẽ tràn 2 dòng đè lên
dòng giá**: node chữ là `163×16` với `textAutoResize: NONE`, mà chuỗi cần ~175px. Nguyên nhân gốc
là **component rộng 327 (ruột) trong khi hàng thật rộng 375** — đúng cái lệch đã ghi danh từ
26/08 và cũng là lý do các hàng giỏ trong khung màn vẫn để RAW (nên **không màn nào** bày lỗi này,
chỉ trang component). Không tự sửa vì mỗi đường đều là một quyết định thiết kế:
**(a)** nới component ra 375 cho khớp hàng thật (đúng gốc, nhưng đụng khổ component), hoặc
**(b)** cho `eta-wrap` hug để chữ xuống dòng tử tế (component cao 170 → 186, nhưng bày 2 dòng
trong khi trang chạy chỉ có 1). Component đang có **0 instance** nên đổi cách nào cũng an toàn.

---

## 7 · Hai việc chốt thêm cuối 03/09

> Lệnh user: *"ở sản phẩm giảm giá, ẩn luôn cái giá gạch. vào trong pdp cả 2 phiên bản thì
> size guide không có mũi tên và sẽ cho underline nút sizeguide"*

### 7.1 Tấm "Đã thêm vào giỏ hàng": bỏ giá gốc gạch ngang

Trả lời cho câu hỏi mở ở `PLP-FIGMA-SYNC-2026-09-03.md` mục 9.3 — **`#ccWas` bỏ hẳn**. Gỡ cả
phần tử trong markup và 3 dòng JS đọc `d.was` trong `openCC`. Nơi gọi vẫn truyền `was` như cũ
(thuộc tính dư, vô hại) nên **không phải sửa 3 chỗ gọi**.

Tấm nay chỉ còn `72.557.000 ₫  -20%` canh phải đáy — khớp khung Figma. **Áp 4 file**:
`index.html` + 3 fork (bản desktop dùng mini cart, không có tấm này).

**Phạm vi có chủ đích**: giá gạch ở **thẻ sản phẩm · hàng giỏ · tóm tắt đơn · chi tiết đơn**
GIỮ NGUYÊN — lệnh chỉ nói về tấm này. Còn dòng *"Nhận hàng dự kiến …"* thì user **không** yêu
cầu bỏ nên vẫn giữ.

### 7.2 Nút "Bảng kích thước" ở PDP: bỏ mũi tên, thêm underline

| | Trước | Sau |
|---|---|---|
| **desktop.html** (PDP + quick add) | `Bảng kích thước →` · **không** underline | `Bảng kích thước` · **underline** |
| **3 fork** (PDP) | `Bảng kích thước →` · không underline | `Bảng kích thước` · **underline** |
| **index.html** (6 màn PDP) | không có mũi tên; **4/6** có underline, 2 không | **6/6** underline |

Bản mobile vốn không có mũi tên nên chỉ thêm underline. Hai comment còn nhắc nhãn cũ
*"Bảng kích thước →"* đã sửa lại; **2 khoá i18n** của chuỗi có mũi tên giữ nguyên trong
`I18N_RE`/`I18N_REV` (rẻ, đúng nếp dự án).

**Dọn kèm — 6 nút mobile vốn KHÔNG giống nhau**: 4 nút dùng hex in cứng `text-[#171717]`
(≠ token `text-foreground` #0a0a0a) và 1 nút còn đeo `tracking-[0.004em]`. Đo trên trang chạy:
2 màn ra mực `rgb(10,10,10)`, 4 màn ra `rgb(23,23,23)` — **cùng một nút mà 2 màu khác nhau giữa
các màn PDP**. Nay cả 6 dùng đúng một chuỗi class; đo lại: **6/6 ra `#0a0a0a` · ls 0,5px ·
12/16 · underline**.

### 7.3 Bẫy đã dính và vá trong đợt này

Tôi gõ **dấu backtick** vào comment HTML mới thêm (`` `was` ``) — khối đó nằm trong template
literal của `insertAdjacentHTML`, nên một dấu backtick **cắt đôi chuỗi và giết cả script**
(`goPdp is not defined`). Đây đúng cái bẫy đã ghi danh trong dự án. Vá: bỏ backtick, rồi
`node --check` **cả 5 file** (mỗi file 2 khối `<script>`) → **10/10 OK**.

Kèm 2 bài học đo: (a) `read_console_messages` **giữ lại lỗi của lượt tải trước** — phải mở TAB
MỚI mới biết trang đã sạch; (b) tab không ép khổ mobile thì `window.RESP` **tự chuyển
index.html → desktop.html**, đo trên đó là đo sai file (chính vì vậy lượt đo màu đầu ra 6/6
`#0a0a0a` — đó là desktop, không phải mobile).

### 7.4 Kiểm

| Kiểm | Kết quả |
|---|---|
| `#ccWas` trong tấm | **không còn** ở cả 4 file · 0 phần tử gạch ngang đang hiện |
| Cụm giá trong tấm | `ccPrice` + `ccOff`, cách đáy **0px**, cách mép phải **0px** |
| Size guide — mobile 6 màn | `Bảng kích thước` · underline · `#0a0a0a` · không mũi tên |
| Size guide — desktop + 3 fork | `Bảng kích thước` · underline · không mũi tên |
| `node --check` | 10/10 khối script OK |
| Console | sạch cả 5 file (kiểm trên tab mới) |
