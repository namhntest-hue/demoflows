# Bộ component Bộ lọc dựng vào Figma — 27/08/2026

> **TRẠNG THÁI: XONG** — đã dựng đủ vào Figma (page `filter`), xem Phần 5.

Đích: file **Test agent** (`XFfjTNMuPfaTeZvdbVIO2F`) → **MỘT page mới `filter`** chứa toàn bộ
(theo lệnh user: *"các component mà tạo riêng tạo dựa trên các component cơ bản thì dồn vô chung 1
page"*). Nguồn đo: `index.html` @375 (mở `#filterSheet`) và `desktop.html` @1440 (drawer 420), bộ da
vào-trang `skin-mt skin-li`.

---

## 1. Cách đo

Panel bộ lọc là **lớp nổi đóng sẵn** nên không đo được như màn thường. Cách làm:

1. Mở panel bằng `openFilter()`, rồi **bung mọi cấp** (thêm class `open` cho `.facc` · `.fcat` · `.fsub`).
2. **Gỡ cắt**: `#filterSheet` về `position:static`, `.fs-panel` `height:auto`, `#filterBody`
   `overflow:visible`, `grid-template-rows:1fr` cho 3 loại body, `.acc-inner` `overflow:visible`.
3. Trích bằng extractor đã vá thêm 2 khả năng: **`rootSel`** (trích riêng một cây con) và
   **`include`** (bỏ ID khỏi danh sách loại trừ — 16 overlay vốn bị loại từ đợt PLP/PDP).

Kết quả: mobile **375,2 × 9.563,6** · desktop **420 × 9.542** — 1.878 node mỗi bản (bung hết cây
danh mục 6 nhóm × 3 cấp).

## 2. Spec đo được (skin-li)

> ⚠️ **Bảng dưới là số ĐO SÁNG 27/08, nay ĐÃ CŨ ở phần cây bộ lọc.** Chiều 27/08 user sửa
> spacing trong Figma và code đã đi theo — số hiện hành: **MỌI** hàng tiêu đề mục **64**
> (kể cả Màu sắc — bậc `size=sm` đã bỏ dùng),
> hàng cấp 1 **42**, hàng cấp 2/3 **34**, hàng chọn phẳng **34**, nhãn nhóm **42**.
> Xem **Phần 8**. Các số còn lại của bảng (chip · ô màu · tab đơn vị · khoảng giá · footer ·
> thanh lọc) vẫn đúng.

| Khối | Số đo |
|---|---|
| Panel | mobile 375,2 (bottom-sheet, có grabber 40×4) · desktop **420** (drawer phải, **viền 0,8 quanh** đúng khuôn lớp nổi) |
| Header | mobile 24 (grabber) + 64 · desktop 64,8 + kẻ dưới 0,8 · title **16/24 · 500 · HOA** (`t-overlay-title`) + icon đóng 16 |
| Mục lớn (`.facc`) | trigger **72** (riêng Màu sắc **56**), đệm 0/16, title **12/16 · 500 · HOA** (`t-label`), icon ± **14×14** phải; kẻ dưới **0,8** `border-subtle` giữa các mục |
| Hàng chọn phẳng | h**36**, gap 8, ô tick **16×16** viền 0,8, nhãn **12/18 · 500** `secondary-foreground` |
| Hàng cây danh mục | cấp 1 h**44** (đệm trên 8) + icon ±; cấp 2/3 h**36** với **cột rail 20px**, đường dọc 1px, nội dung thụt **24** rồi **48** |
| Chip size | **62,2 × 36** (lưới 5 cột, gap 8), viền 0,8, bo **0**, nhãn **12/18 · 400** |
| Ô màu | ô **79,8 × 64** (lưới 4 cột, gap 8): vòng **40** tròn viền 0,8 + ruột **32** tròn, nhãn **12/16 · 500** `muted-foreground` |
| Tab đơn vị giày | hàng 44 (đệm 8/12), gap **24**, chữ 12/18 · 500; đang chọn = mực `foreground` + **gạch chân 2px** |
| Khoảng giá | 2 ô nhập h36 + gạch nối 10×1; thanh trượt track **6** bo tròn, 2 núm **14×14** viền 1,6 |
| Footer | h**80,8**, đệm 16,8/16/16/16, gap 12, kẻ trên 0,8; **Áp dụng** h48 nền primary, nhãn **14/20 · 400** (`t-body`); **Đặt lại** ẩn cho tới khi đã áp bộ lọc |
| Thanh lọc (PLP) | mobile 375,2×**52**: nút *Bộ lọc* 101,9×36 + *Sắp xếp*; desktop 1440×**68**: nút *Bộ lọc* + dải 7 chip danh mục (12/18 · 400) + đổi kiểu xem 88,8 + *Sắp xếp* |

**Thang chữ**: cả panel chỉ 6 tổ hợp, khớp thang 13.1. Hai vai **chưa có text style**:
`12/18 · 500 · chữ thường` (nhãn hàng lọc, nhãn nhóm, tab đơn vị, giá trị ô nhập) và
`12/16 · 500 · chữ thường` (nhãn ô màu, nhãn Từ/Đến) — chính là **ngoại lệ đã ghi danh** ở
FONT-LIBRE-INTER §13.1 (*"Cây danh mục panel bộ lọc `#filterSheet` · 12/18 · 12/16 · Inter · 500
chữ thường"*), nhưng bộ style trong Figma chưa có 2 vai này → **set tay + chờ chốt tên**, cùng loại
việc với `14/20 · 500` của accordion PDP.

## 3. Bộ component thiết kế — 13 khối + 2 bản ráp, gom trong page `filter`

| # | Component | Biến thể |
|---|---|---|
| 1 | `filter-toggle` (± 14px) | `state=_closed|_open` |
| 2 | `filter-check-row` | `state=default|_checked` |
| 3 | `filter-tree-row` | `level=cat|sub-1|sub-2` × `state=default|_checked` (6) |
| 4 | `filter-section-header` | `size=lg|sm` × `state=_closed|_open` (4) |
| 5 | `filter-group-header` | `state=_closed|_open` |
| 6 | `filter-size-chip` | `state=default|_selected` |
| 7 | `filter-color-swatch` | `state=default|_selected` |
| 8 | `filter-unit-tab` | `state=default|_active` |
| 9 | `filter-cat-chip` | `state=default|_active` |
| 10 | `filter-price-range` | (đơn) |
| 11 | `filter-panel-header` | `platform=mobile|desktop` |
| 12 | `filter-panel-footer` | `state=default|_has-reset` |
| 13 | `filter-bar` | `platform=mobile|desktop` |
| A | `filter-panel-mobile` 375×812 · `filter-panel-desktop` 420×900 | bản ráp, dựng đúng trạng thái thật lúc mở (mọi mục ĐÓNG, nút Đặt lại ẩn) |
| B | `example — filter · các mục mở` | khung ví dụ: 4 mục mở, dùng instance của 8 khối trên |

**Ghép từ linh kiện, không đẻ bản sao:** `filter-toggle` là hạt nhân, dùng lại trong
`filter-tree-row` (cấp 1 + cấp 2), `filter-section-header`, `filter-group-header`;
`filter-panel-*` ráp từ `filter-panel-header` + `filter-section-header` + `filter-panel-footer`;
`filter-bar` desktop ráp từ `filter-cat-chip` ×7; icon đóng lấy instance `icon/close` của page `icons`.

**Tái dùng linh kiện DS thay vì vẽ lại** (dò lại lúc dựng, khớp thì dùng luôn):

| Chỗ | Dùng lại |
|---|---|
| Ô tick | instance **`choice-checkbox`** (`checked=default|_checked, state=default`) — đúng 16×16, **ghi đè nét 1 → 0,8** |
| Nút *Áp dụng* | instance **`action`** `variant=primary, size=large` (48) |
| Nút *Đặt lại* | instance **`action`** `variant=outline, size=large` |
| Nút *Bộ lọc* trên thanh lọc | instance **`action`** `variant=outline, size=small` (36) + `showIcon` |
| Icon đóng · mũi tên *Sắp xếp* | instance `icon/close` · `icon/chevron-down` (thu về 14) |

**Thêm mới vào page `icons`: `icon/filter` 16×16** — bộ icon chưa có, nút *Bộ lọc* cần.

## 4. LỖI DEMO PHÁT HIỆN KHI ĐO — khối Khoảng giá **tràn ngang**

Hai ô nhập là thẻ `<input>` nên có **bề rộng nội tại ~178px**, mà flex item mặc định
`min-width: auto` nên **không co được**. Hàng ô nhập vì thế rộng **390,8** trong khung nội dung
**343,2**:

| | Đo được |
|---|---|
| `index.html` @375 | `#filterBody` **scrollWidth 423 > clientWidth 375** → thân bộ lọc **cuộn ngang được**; ô *Đến* chạy tới x=407 (mép panel 375) → **bị cắt 32px**, núm phải + nhãn `50.000.000đ` của thanh giá cũng nằm ngoài |
| `desktop.html` @1440 | drawer 420 rộng hơn nên chỉ tràn **~4px** — gần như không thấy, nhưng cùng một gốc lỗi |

**Cách sửa** (1 dòng): thêm `min-w-0` cho 2 thẻ `<label class="flex-1 …">` bọc ô nhập trong
`filterBody()` — hoặc cho chính `<input>` thêm `w-full`. Bản Figma dựng **đúng ý đồ**: 2 ô chia đều
**154,6** + gạch nối 10, không tràn.

**3 hex cứng còn sót trong demo** (component Figma đã quy về token, ghi để đội code sửa lại):

| Chỗ | Demo | Token đúng |
|---|---|---|
| Đường rail cây danh mục | `bg-[#d9d9d9]` | `Color/border` (#dfdfdf) |
| Gạch nối 2 ô giá (chỉ **mobile**; desktop đã dùng token) | `bg-[#e0e0e0]` | `Color/border` |
| Mực giá trị trong ô nhập giá | `#000000` (input không khai màu) | `Color/foreground` (#0a0a0a) |

15 ô màu sản phẩm giữ hex thật (màu **nội dung**, như swatch trên thẻ sản phẩm).

## 5. Đã dựng — page `filter`

**17 khối trên page**: 13 component set/component + 2 bản ráp + 1 khung ví dụ + 1 khối `[doc]`.
Xếp 4 cột: linh kiện · bộ phận panel + thanh lọc · 2 bản ráp · ví dụ + tài liệu.

**Đo lại sau khi dựng — khớp demo từng px:**

| | Kết quả |
|---|---|
| Thân panel (mọi mục đóng) | **492,8** = 6 mục 72 + 1 mục 56 + 6 kẻ 0,8 — đúng bằng demo |
| Bản ráp | `filter-panel-mobile` **375,2×812** · `filter-panel-desktop` **420×900** |
| Thụt cây danh mục | ô tick ở **16 / 40 / 64** (rail 20 + khe 4 mỗi cấp) — đúng bản vẽ gốc |
| Nền · kẻ bind biến | **223 nền · 73 kẻ**, còn **5 fill raw = 5 ô màu sản phẩm** (cố ý) |
| Text style | 92 text · **53 gắn style**; 39 còn lại đúng 2 vai chưa có style (12/18·500 và 12/16·500 chữ thường) |
| Bóng đổ | **0** |

**3 bẫy đã dính và cách vá** (ghi lại cho đợt sau):

1. **`combineAsVariants` không tự xếp variant** — mọi variant nằm chồng ở 0,0 (set ra 14×14). Phải
   tự xếp lưới theo thuộc tính rồi resize set.
2. **Instance-swap nhận `id` chứ không nhận `key`** (truyền `key` báo *"Property value is
   incompatible"*), nhưng **set xong hình KHÔNG đổi** — phải gọi thẳng
   `lead.swapComponent(icon/filter)` trên instance con.
3. **Auto-layout ngang có `layoutWrap: WRAP` thì chiều cao là TRỤC PHỤ** — hug height phải đặt
   `counterAxisSizingMode = 'AUTO'`; đặt nhầm `primaryAxisSizingMode` làm lưới màu/chip cao 10px và
   **chữ đè lên nhau**. Kèm bẫy nhỏ: khung ví dụ có viền 0,8 mỗi bên nên nội dung chỉ 373,6 → lưới
   4 cột rớt còn 3; phải nới khung lên 376,8 để lòng đúng 375,2.

## 6. Hai chỗ DS lệch demo — đang GHI ĐÈ, chờ chốt

| # | Chỗ | DS đang có | Demo (skin-li) | Đã xử |
|---|---|---|---|---|
| 1 | `choice-checkbox` | nét **1px** | hairline **0,8** ở mọi ô tick | ghi đè 0,8 trên instance trong `filter-check-row` / `filter-tree-row`. **Chốt:** sửa hẳn component gốc hay giữ 2 nấc? |
| 2 | `action` `size=small` (36) | nhãn **12/16** | nút `.btn-o` cao 36 dùng **14/20** theo luật §13.13 (12/16 chỉ dành cho nút phụ `.btn-s`) | ghi đè `t-body` trên nhãn nút *Bộ lọc*. **Chốt:** tách `.btn-s` thành trục riêng của `action`, hay thêm biến thể nhãn? |

## 7. Việc còn mở

1. Chốt 2 vai chữ **12/18 · 500** và **12/16 · 500 chữ thường** (đặt tên rồi tạo style, gắn cho 39 node).
2. Chốt 2 điểm DS lệch ở Phần 6.
3. Sửa 4 chỗ trong demo: `min-w-0` cho khối Khoảng giá + 3 hex cứng (Phần 4).
4. **Chưa ráp instance vào màn PLP**: thanh lọc trên `PLP / mobile 375` và `PLP / desktop 1440`
   vẫn là raw từ đợt trước — nay đã có `filter-bar` để thay, để đợt ráp riêng cùng lượt với hàng giỏ.
5. Mục **Độ cao giày** (chỉ ngữ cảnh giày nữ) chưa nằm trong bản ráp sẵn — dùng lại `filter-check-row`.

---

## 8. Đồng bộ ngược Figma → code: spacing cây bộ lọc (27/08/2026, chiều)

Lệnh user: *"ở các spacing filter tôi vừa update lại, bạn hãy đối chiếu figma với thực tế và
điều chỉnh lại các spacing của cây filter"* — kèm link node `85-1913` (chính là **page `filter`**).

Đây là chiều **ngược** với Phần 1–5: trước là *đo code → dựng Figma*, nay là *đọc Figma → sửa code*.
Nguồn sự thật của lượt này là Figma.

### 8.1 Đối chiếu — 6 chỗ lệch, 3 chỗ khớp

| Khối | Figma (bạn vừa sửa) | Code trước | Code sau |
|---|---|---|---|
| `filter-section-header` **size=lg** | **56** = đệm dọc 20 + chữ 16 | **72** (chiều cao CỨNG) | **56** ✓ |
| `filter-section-header` **size=sm** (Màu sắc) | **48** = đệm dọc 16 + chữ 16 | **56** (cứng) | **48** ✓ |
| `filter-tree-row` **level=cat** | **42** = đệm 16/8 + chữ 18 | **44** (`h-11` + `pt-2`) | **42** ✓ |
| `filter-tree-row` **level=sub-1 · sub-2** | **34** = đệm 8/8 + chữ 18 | **36** (`h-9`) | **34** ✓ |
| `filter-check-row` (thương hiệu · ưu đãi · độ cao giày · khác) | **34**, đệm `8/16/8/0` | **36**, lề phải 16 CHỈ ở thương hiệu | **34** + lề phải 16 cho **cả 4** chỗ ✓ |
| `filter-group-header` (nhãn nhóm trong Kích thước) | **42**, đệm `16/16/8/16` | **44** (`h-11` + `pt-2`) | **42** ✓ |
| thụt cấp 2 / cấp 3 | **24 / 48** (rail 20 + gap 4) | 24 / 48 | **không đụng** ✓ |
| lưới màu · lưới chip · hàng tab đơn vị · khoảng giá | 8/16/16/16 · 8/16/8/16 · 8/16/12/16 gap 24 · 0/16/24/16 gap 24 | khớp hết | **không đụng** ✓ |
| khối chứa cây (`px-4 pb-4`) | 0/16/16/16 | khớp | **không đụng** ✓ |

### 8.2 Đổi cách dựng hàng: CHIỀU CAO CỨNG → ĐỆM

Figma nay dựng mọi hàng của cây theo **hug + padding** (42 = 16+18+8, 34 = 8+18+8, 56 = 20+16+20),
không còn hàng nào đặt chiều cao cố định. Code đi theo đúng vậy:

* `fSection(title, body, open, **h = 72**)` → `fSection(title, body, open, **pad = 20**)`, và
  `style="height:${h}px"` → `style="padding-top:${pad}px;padding-bottom:${pad}px"`.
* `.fcat > div`: `h-11 … pt-2` → `pt-4 pb-2`
* `fsubRow`: bỏ `h-9` ở hàng, chuyển `py-2` **lên chính nút** (đúng chỗ Figma đặt đệm —
  frame `row-check`), để cột `rail` vẫn kéo hết chiều cao hàng.
* hàng chọn phẳng: `h-9 … ` → `py-2 pr-4`
* nhãn nhóm size: `h-11 px-4 pt-2` → `px-4 pt-4 pb-2`

**Vì sao đáng đổi chứ không chỉ hạ số:** hàng theo đệm thì **tự bám thang chữ**. Đo được ngay:
`index.html` + `desktop.html` (vào trang là `skin-mt skin-li`, chữ 12/18) ra đúng **42 · 34 · 56**;
3 bản thử skin (`desktop-neutral` · `-editorial` · `-atelier` — **không** nạp `skin-li`, chữ còn
14/20) ra **44 · 36 · 64** với **cùng một bộ đệm**. Trước đây số cứng 72/44/36 áp chung cho mọi
bộ da nên bộ da nào chữ to hơn thì hàng chật, chữ nhỏ hơn thì hàng rỗng.

### 8.3 Một bẫy đã sập và đã vá

Lượt sửa đầu chỉ đổi **định nghĩa** `fSection` mà quên **nơi gọi**: 4 file desktop truyền chiều cao
**72 tường minh** cho 2 mục *Danh mục* và *Thương hiệu* (vì còn tham số thứ 5 `count`) —
`fSection('Danh mục', …, false, 72, 'cat')`. Đổi nghĩa tham số xong, 72 chảy thẳng vào
`padding-top/bottom` → hai hàng tiêu đề cao **160px**. Đã sửa cả 8 lời gọi về `20`.
*Bài học:* đổi Ý NGHĨA một tham số thì phải quét hết nơi gọi, không chỉ nơi khai — grep
`fSection(` chứ đừng grep `h = 72`.

### 8.4 Đã áp cho 5 file

| File | Số rule áp | Ghi chú |
|---|---|---|
| `index.html` · `desktop.html` | **8** | ra đúng số Figma (56 · 48 · 42 · 34) |
| `desktop-neutral` · `-editorial` · `-atelier` | **7** | thiếu rule nhãn-nhóm-size (3 bản này chưa có khối nhóm size — vẫn là mục còn nợ ở FILTER-FEEDBACK) |

Kiểm chạy sau khi sửa (mobile 375 + desktop 1440, đã bust cache): 7 hàng tiêu đề ra 56/48 ·
hàng cấp 1 = 42 đệm 16/0/8/0 · cấp 2 = 34 thụt 24 · cấp 3 = 34 thụt 48 · **đường rail liền mạch**
(khe giữa các đoạn = 0) · hàng phẳng 34 đệm 8/16/8/0 · nhãn nhóm 42 · panel desktop vẫn 420 ·
mở/đóng đủ 3 cấp bằng chuột thật (mục lớn 0→310 · danh mục 0→374 với 11 hàng con · cấp 3 0→170) ·
tick ô hoạt động · không tràn ngang.

### 8.6 Lượt chỉnh tiếp — tiêu đề mục lớn lên đệm 24 (lệnh user, ngay sau khi xem bản đã sửa)

*"Tiêu đề mục lớn: tăng padding 24"* — đệm dọc của `filter-section-header` **size=lg**
đi từ **20 → 24**, tức hàng tiêu đề **56 → 64** (24 + chữ 16 + 24).

| | Figma sáng nay | Sau lượt đồng bộ 8.1 | **Sau lệnh này** |
|---|---|---|---|
| Tiêu đề mục lớn | 56 (đệm 20) | 56 (đệm 20) | **64 (đệm 24)** |
| Tiêu đề Màu sắc (`size=sm`) | 48 (đệm 16) | 48 | **48 — không đụng** |
| Hàng cấp 1 · cấp 2/3 · hàng phẳng · nhãn nhóm | 42 · 34 · 34 · 42 | như vậy | **không đụng** |

Sửa đúng **một** chỗ ở mỗi file — mặc định `pad` của `fSection` — cộng 2 lời gọi tường minh
(*Danh mục* · *Thương hiệu*) ở 4 file desktop, tổng 13 chỗ trên 5 file. Đo lại: mobile 375 và
desktop 1440 đều ra **64 (đệm 24/24)** cho 6 mục lớn, **48** cho Màu sắc, các hàng trong cây
giữ nguyên 42/34/34, panel desktop vẫn 420, không tràn ngang.

**Figma nay ĐANG LỆCH code ở đúng chỗ này** (component còn đệm 20 → 56). Đẩy 24 vào 2 variant
`filter-section-header size=lg` là xong — chờ bạn gật.

### 8.7 Bỏ bậc `size=sm`: Màu sắc về chung một hàng tiêu đề với mọi mục

Lệnh user: *"danh mục Màu sắc đang để size sm, hãy cho đồng bộ với các danh mục khác ở filter"*.

`Màu sắc` là mục DUY NHẤT đi bậc nhỏ — di sản từ hồi hàng tiêu đề còn cao 72 và ô màu cần
kéo lên gần hơn. Nay mọi mục đều đệm 24 nên lý do đó hết. Cách sửa: **bỏ hẳn đối số thứ 4** ở
lời gọi (`fSection('Màu sắc', …, false, 16)` → `fSection('Màu sắc', …)`) chứ không đổi 16 thành
24 — để "Màu sắc giống mọi mục" là điều code NÓI RA, không phải hai con số tình cờ bằng nhau;
mai kia đổi mặc định thì nó tự đi theo.

Đo lại mobile 375 + desktop 1440: **cả 7 hàng tiêu đề đều 64 (đệm 24/24)** — trước đó là
6×64 + 1×48. Lưới ô màu giữ nguyên đệm `8/16/16/16`, các hàng trong cây giữ 42/34/34,
panel desktop 420, không tràn ngang.

**Hệ quả cho bộ component:** trục `size` của `filter-section-header` nay chỉ còn **một** giá trị
sống (`lg`) — `size=sm` thành variant chết. Gộp với việc đệm đã lên 24 (mục 8.6), việc cần làm
trong Figma là: đổi `size=lg` sang đệm 24 rồi **bỏ luôn trục `size`**, component còn mỗi trục
`state=_closed|_open`. Chờ bạn gật rồi tôi sửa.

### 8.8 Ô tìm thương hiệu (27/08, cùng đợt với 2 việc PLP khác)

Mục *Thương hiệu* nay có ô nhập lọc tại chỗ ở đầu danh sách — 24 nhà mốt, cuộn tay
tìm là việc lặp lại mỗi lần. Lọc **ẩn/hiện hàng trên DOM** nên hàng đang tick giữ
nguyên trạng thái; so sánh sau khi **bỏ dấu + thường hoá**. Đã áp **cả 5 file**,
kèm 2 khoá i18n. Chi tiết + 2 việc PLP còn lại (badge Pre-order trước tên, quick-add
bỏ title): **`PLP-FEEDBACK-2026-08-27.md`**.

### 8.5 Thấy được nhưng CHƯA sửa (ngoài phạm vi "cây filter")

1. **Hàng tiêu đề panel.** Figma `filter-panel-header` title-row nay **56** (đệm 16, chữ 24 +
   icon 16); code đang **64** vì nút đóng là `w-8 h-8` (32) kéo hàng cao lên. Lệch 8px.
2. **Nút ± quá nhỏ.** Code `w-4 h-4` = **16×16**, Figma còn nhỏ hơn (**14×14**) — cả hai dưới
   ngưỡng 24×24 của WCAG 2.5.8. Dự án đã có lối vá không xê dịch pixel nào
   (`::before { inset: -Npx }` như `.hp-tab` · `.hp-sw__b`); áp được ngay khi bạn muốn.
3. **Khe giữa các hàng chọn phẳng.** Code: *Thương hiệu* khe 0, còn *Ưu đãi · Độ cao giày ·
   Khác* khe 4 (`gap-1`). Figma không dựng danh sách check-row nên **không có số để đối chiếu** —
   giữ nguyên, chờ bạn chốt lấy 0 hay 4 cho cả bốn.
