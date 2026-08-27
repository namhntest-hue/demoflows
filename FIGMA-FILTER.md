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
