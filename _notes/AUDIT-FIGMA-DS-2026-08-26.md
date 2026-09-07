# Dò toàn bộ component trong file Figma `Test agent` — 26/08/2026

File: **Test agent** `XFfjTNMuPfaTeZvdbVIO2F`.
Thước đo: `STYLE-RULES.md` §1–§7 (Phần 8 **không lật** phần thẩm mỹ) + `FONT-LIBRE-INTER.md`
Phần 13.1 (bảng chuẩn `skin-li` hiện hành) + `NAMING-MAGENTO.md`.

> Bối cảnh mới: rule stack chỉ còn ràng bởi **Magento**, không còn ràng bởi Tailwind/shadcn.
> Vì vậy báo cáo tách rõ **lỗi luật thiết kế** (phải sửa) khỏi **dấu vết shadcn** (bàn cách xử).

---

## 0. Hiện trạng file

| | |
|---|---|
| Trang | 23 (Cover · Getting started · 3 Foundations · vách ngăn · 13 trang component · Icons · Product card · Header · Footer) |
| Component set | **14** · component rời **11** · tổng **170 variant** |
| Node text | 383 (Product card) + 296 (13 trang component) + 74 (foundations/doc) |
| Biến | Primitives 15 · Color 29 · Radius 2 · Spacing 11 |
| Text style | **7** |

**Ba trang KHÔNG còn component, chỉ còn khung `[doc]`:**

| Trang | Đang có | Ghi chú 20/08 nói đã dựng |
|---|---|---|
| Product card | *(chỉ section giỏ hàng dựng 26/08)* | Product card 3 variant + ví dụ PLP |
| Header | `[doc] Header` | Header Mobile + Header Desktop |
| Footer | `[doc] Footer` | Footer Mobile |

→ Khung `[doc]` mô tả rất chi tiết (số đo thật từ demo) nhưng **không có component tương ứng**.
Đây là khoảng trống lớn nhất của file: bộ đo-từ-demo đã mất, chỉ còn bộ nguyên thuỷ kiểu shadcn.

---

## 1. Cái đang RẤT CHUẨN — giữ nguyên

| Trục | Kết quả |
|---|---|
| §2.1 · §2.2 màu | **578 nền + 328 kẻ, bind biến 100%** — 0 hex chết trên toàn bộ 13 trang component |
| §3.3 đổ bóng | **0** |
| §3.2 bo góc | 0 ở mọi UI thật. Chỉ `Badge/Count` bo tròn — và nó **vuông thật** 16×16 nên hợp lệ |
| §3.1 viền | **1px đồng loạt** (158 chỗ) |
| §1.4 tracking | **0,5px 100%** |
| §1.3 cặp cỡ+dòng | **100%** — mọi node đều gắn text style, không có node lạc |

Hai thứ trông như lỗi nhưng **không phải**:

* `cornerRadius = 5` ở 14 chỗ — đó là **khung nét đứt của Figma component-set**, không phải thiết kế.
* Nét 1,5 / 1,2 / 1,3px ở 151 chỗ — đều là **nét VẼ bên trong icon** (`glyph`, `chevron`, `tick`),
  không phải viền UI. §3.1 quản viền, không quản nét vẽ.

---

## 2. LỖI PHẢI SỬA

### 2.1 🔴 NẶNG — 2 text style "nhãn" **mất chữ HOA**, phá §1.1 ở tầng gốc

`paragraph small/medium` (T3 14/20 Medium) và `paragraph mini/medium` (T6 12/16 Medium)
hiện có `textCase = ORIGINAL`, trong khi **mô tả của chính 2 style đó vẫn ghi "UPPERCASE"**.

§1.1 cấm đích danh trạng thái lai: **500 luôn phải đi cặp với CHỮ HOA.**

**Bán kính ảnh hưởng — 80 node đang là 500 + chữ thường:**

| Style | Tổng | Ở đâu |
|---|---|---|
| T3 14/20 Medium | 11 | Tabs 8 · giỏ hàng 2 · doc 1 |
| T6 12/16 Medium | 69 | **giỏ hàng 50** · Accordion 11 · nhãn lưới Button 6 · doc 2 |

> **Mốc thời gian, ghi lại cho chính xác:** đầu phiên hôm nay (02:43) API còn trả `UPPER` cho
> cả 2 style; giữa phiên đổi thành `ORIGINAL`. Cùng khoảng đó, 3 khối trong frame giỏ hàng
> mobile cũng biến mất khỏi frame (đã dựng lại). Ảnh chụp khối tổng kết lúc trưa ra
> "ƯU ĐÃI & KHUYẾN MÃI"; chụp lại lúc 11:35 ra "Ưu đãi & khuyến mãi". Nghi có thao tác
> hoàn tác (Ctrl+Z) trong app — **chưa xác minh được**, chỉ ghi nhận hiện trạng.

**Sửa:** đặt lại `textCase = UPPER` cho **đúng 2 style** → 80 node tự đúng lại, không đụng node nào.

### 2.2 🔴 NẶNG — nhãn nút còn ở 12/16, luật đã lên 14/20 từ 25/08

Cả **96 variant** Button dùng `paragraph small/regular` = **12/16 · 400**.

`FONT-LIBRE-INTER.md` §13.13 (chốt user 25/08, cả 2 bản):
**nút hành động `.btn-p` + `.btn-o` = 14/20 · 400 · chữ thường**; chỉ **nút phụ `.btn-s`** ở 12/16.

Đo demo hôm nay xác nhận: nút "Đặt hàng" (mobile + desktop) = **14/20 · 400**.

**Sửa:** Size Large + Medium → 14/20 · 400; Size Small giữ 12/16.
Vướng: file **chưa có style 14/20 · 400 · thường** — xem 2.4.

### 2.3 🟠 VỪA — title lớp nổi dùng Libre Bodoni 18/24, luật là **Inter 16/24 · 500 · HOA**

13.1 nói thẳng: *"từ 18 trở lên là Libre Bodoni · dưới 18 là Inter · **lớp nổi luôn Inter**"*,
và title **mọi** lớp nổi = **16/24 · Inter · 500 · HOA**.

| Node | Đang là | Phải là |
|---|---|---|
| `Dialog / header / title` | 18/24 Libre Bodoni | 16/24 Inter 500 HOA |
| `Sheet / Side=Bottom / header` | 18/24 Libre Bodoni | 16/24 Inter 500 HOA |
| `Sheet / Side=Right / header` | 18/24 Libre Bodoni | 16/24 Inter 500 HOA |
| `Card / header / title` | 18/24 Libre Bodoni | **24/32** (13.3: mọi thứ từng ở 18 đã lên 24) |

Bậc **18/24 (`heading 2`) nay RỖNG** trong demo. Còn **12 node** bám vào nó: 4 là nội dung
component (bảng trên), 8 là chữ trang trí trong khung `example —` / `[doc]`.

### 2.4 🟠 VỪA — thiếu 2 text style, thừa 1

| | Cỡ / dòng | Vai | Hiện trạng |
|---|---|---|---|
| **Thiếu** | 16/24 · Inter · 500 · HOA | Title **mọi** lớp nổi — 12 sheet/modal/drawer + panel bộ lọc | chưa có |
| **Thiếu** | 14/20 · Inter · 400 · thường | Nút hành động + brand trên card/hàng giỏ | chưa có → 15 node đang set tay (8 mobile + 7 desktop ở giỏ hàng) |
| **Thừa** | 18/24 Libre Bodoni (`heading 2`) | — | bậc rỗng, giữ chỉ để 12 node không mất link |

### 2.5 🟠 VỪA — Accordion trigger sai cả hai đằng

| | Cỡ | Đậm | Hoa |
|---|---|---|---|
| Figma `Accordion item` | 12/16 | Medium | **thường** |
| Demo giỏ hàng (đo 26/08) | 12/16 | Medium | **HOA** (T6) |
| Ngoại lệ ghi danh 13.11 (accordion **PDP**) | **14/20** | Medium | thường |

→ Bản Figma không khớp cái nào. Sau khi sửa 2.1 thì nó tự về đúng vai T6 (12/16 Medium HOA).

### 2.6 🟡 NHẸ — biến `accent-0` chưa hoàn chỉnh

* Chưa có `codeSyntax.WEB`. Token trong demo tên là **`--unofficial-accent-0`**, không phải `--accent-0`.
* Mô tả chưa ghi đây là **ngoại lệ ghi danh §2.3** và **danh sách ĐÓNG ở 2 mục**
  (khối quà tặng + block tổng tiền, cả hai chỉ trong màn giỏ). Thiếu câu đó là mời người sau
  dùng `#f7f7f7` làm mặt thứ ba — đúng thứ §2.2 đã khai tử.

### 2.7 🟡 NHẸ — metadata biến còn trống

| Thiếu | Số lượng |
|---|---|
| `codeSyntax.WEB` | 15 biến Primitives + `radius/full` + `accent-0` |
| `description` | 8 biến Color (`card`, `card-foreground`, `popover-foreground`, `primary-foreground`, `muted`, `accent-foreground`, `warning`, `info`) + **toàn bộ 11 biến Spacing** |

---

## 3. "Không còn ràng buộc shadcn/Tailwind" — cái gì đổi, cái gì KHÔNG

### 3.1 ❌ KHÔNG đổi tên biến màu

`home.html` — **file khuôn mẫu của stack mới** (§8.1) — đang gọi thẳng bộ tên đó:

| Token | Lượt dùng trong `home.html` |
|---|---|
| `--border-subtle` | 36 |
| `--background` | 28 |
| `--secondary` | 22 |
| `--foreground` | 18 |
| `--border` | 14 |
| `--primary` · `--primary-foreground` · `--destructive` | 10 mỗi cái |
| `--border-strong` · `--input` · `--surface-sticky` · `--primary-hover` · `--ring` … | 1–9 |

§8.3 cũng chốt `theme.css` giữ nguyên *"như một bảng biến CSS thuần"*.
**Đổi tên biến trong Figma = gãy parity với chính file khuôn mẫu.** Không làm.

### 3.2 ⚠ Nhưng có một lỗ thật: `home.html` chạy **2 bộ từ vựng mực song song**

| §2.1 | Tên bộ 1 (có trong Figma) | Tên bộ 2 (KHÔNG có trong Figma) | Lượt dùng |
|---|---|---|---|
| Mực chính `#0a0a0a` | `--foreground` (18) | `--ink` (13) | cả hai |
| Mực nội dung `#333` | `--secondary-foreground` (1) | `--ink-body` (12) | cả hai |
| Mực phụ `#666` | `--muted-foreground` (1) | `--ink-mute` (17) | cả hai |

Cùng 3 bậc mực, hai tên. **Cần chốt một bộ** rồi mới nói file Figma là bảng token đủ.

Ngoài ra các token **không có mặt trong Figma variables**:
`--gut` (16) · `--gut-m` (5) · `--rail` (5) · `--sec` / `--sec-sm` / `--sec-lg` (6) — lưới & nhịp dọc;
`--dur` (32) · `--ease` (51) — chuyển động. Đây là quyết định thiết kế thật, đang chỉ sống trong CSS.

### 3.3 ✅ NÊN đổi: tên **text style**

Đây mới là chỗ mang dấu vết shadcn, và code đã đi trước một bước —
`NAMING-MAGENTO.md` Phần 3 đã chốt bộ tên theo **VAI** và **đã áp vào `home.html` + `theme.css`**:

| Text style Figma hiện tại | Ra | Tên theo VAI đã chốt cho code |
|---|---|---|
| `heading 1` | 24/32 | `.t-title` |
| `heading 2` *(rỗng)* | 18/24 | `.t-section` |
| *(thiếu)* | 16/24 · 500 · HOA | — **chưa có tên**, cần đặt |
| *(thiếu)* | 14/20 · 400 | `.t-body` |
| `paragraph small/medium` | 14/20 · 500 · HOA | `.t-label-1` |
| `paragraph small/regular` | 12/16 | `.t-ui` |
| `paragraph mini/medium` | 12/16 · 500 · HOA | `.t-label` |
| `paragraph/regular` | 12/18 | `.t-copy` |
| `paragraph micro/regular` | 10/14 | `.t-micro` |

> ⚠ Hai bảng luật đang **lệch nhau**, phải phân xử trước khi đổi tên:
> `NAMING` Phần 3 vẫn có `.t-section` **18/24** và **không có** bậc 16/24; còn
> `FONT-LIBRE-INTER` 13.1 (mới hơn) nói 18 **đã rỗng** và thêm **16/24 title lớp nổi**.

### 3.4 ⚠ NÊN xem lại: kho component

| Đang có | Demo / Magento thật | Nhận định |
|---|---|---|
| **Button 6 variant** (Primary · Secondary · Outline · Ghost · Link · Destructive) | demo có **3**: `.btn-p` 42 lượt · `.btn-o` 32 · `.btn-s` 10. Magento chỉ `action primary` / `action secondary` | **Ghost · Link · Destructive = 48/96 variant không có chỗ dùng** |
| **Separator 6 variant** | demo **0 thẻ `<hr>`** — kẻ là `h-px bg-border` / border | vai của một token viền, không cần component |
| **Card** (anatomy shadcn) | không có block Magento tương ứng | thẻ thật cần là `product-item-info` |
| **Switch 8 variant** | `role="switch"` xuất hiện **1 lần** | giữ, nhưng đúng 1 chỗ dùng |
| **Toast 4 kind** | Magento có `messages` · `message success/error/warning/notice` | đổi tên theo Magento khi bàn giao |
| **Tab item / Tabs list** | `role="tab"` 1 lần | ít dùng |
| Input · Label · Checkbox · Radio · Select · Dialog · Sheet · Badge | có chỗ dùng thật | giữ |

**Thiếu hẳn** — demo cần, file không có:
thẻ sản phẩm (`product-item-info` · `product-item-photo` · `product-item-name`) ·
hàng giỏ · nhóm quà tặng · bộ tăng-giảm số lượng ·
`price-box` + `old-price` + `special-price` · header 3 tầng · footer ·
`breadcrumbs` · `toolbar` PLP · `filter-options` (Amasty) · `swatch-option` · `minicart`.

---

## 4. Hai phương án

### Phương án A — sửa đúng chỗ đau *(khuyến nghị)*

| # | Việc | Ảnh hưởng |
|---|---|---|
| 1 | `textCase = UPPER` cho 2 style nhãn | **80 node** tự đúng lại |
| 2 | Thêm 2 style: 16/24 · 500 · HOA và 14/20 · 400 | mở khoá việc 3 + 4 |
| 3 | Button label → 14/20 (Large + Medium), giữ 12/16 cho Small | 72 variant |
| 4 | Title Dialog/Sheet → style 16/24 mới; Card title 18 → 24 | 4 node |
| 5 | Đổi tên 7 style sang bộ VAI *(sau khi phân xử 3.3)* | 0 pixel |
| 6 | Gắn `codeSyntax` + `description` còn thiếu; ghi rõ `accent-0` là ngoại lệ đóng | metadata |

Không đụng bố cục, không đụng tên biến màu. Ước lượng: **một phiên**.

### Phương án B — nắn lại kho theo Magento *(A + tiếp)*

| # | Việc |
|---|---|
| 7 | Gỡ hoặc đóng băng Ghost · Link · Destructive · Separator · Card generic |
| 8 | Đổi tên component set theo block Magento (`action` · `field`/`control`/`label` · `modal-popup`/`modal-slide` · `messages` · `swatch-option`…), variant theo Q3 (biến thể = class thứ hai) và Q4 (`_active`/`_open`) |
| 9 | Dựng lại 4 component đã mất (Product card · Header ×2 · Footer) + bổ sung nhóm thương mại |

Nhiều phiên, và **nên chốt bảng tên trước** — giống đợt 114 tên đang treo ở `NAMING-MAGENTO.md`
Phần 7. Chạy đổi tên khi bảng chưa duyệt là lặp lại đúng lỗi cũ.

---

## 5. Chốt lại một câu

**Tầng "vẽ" của file sạch** — màu bind 100%, 0 bóng, bo 0, viền 1px, tracking đồng nhất.
**Tầng "chữ" đang lệch luật ở 3 chỗ** (mất chữ hoa · nhãn nút còn 12/16 · title lớp nổi sai
mặt chữ), và **tầng "kho" vẫn là kho shadcn** chứ chưa phải kho Magento —
48/96 variant Button không có chỗ dùng, còn 12 component thương mại thật thì chưa có.

---

# ĐÃ THI HÀNH — PHƯƠNG ÁN B (26/08/2026)

> Lệnh user: *"uppercase style nên cho nhập thủ công bằng capslock cho dễ kiểm soát cái nào cần
> uppercase, tiến hành B luôn"*.

## B0 · Tầng chữ

**Chữ hoa đổi cách thi hành.** Text style **KHÔNG bật `textCase`** nữa; vai nào cần HOA thì
**gõ thẳng chữ hoa vào node**. Đã ghi câu này vào mô tả của cả 3 style nhãn, kèm lưu ý:
*bên CODE vẫn thi hành bằng `text-transform: uppercase`, nguồn chữ giữ viết hoa chữ đầu.*

* **67 node** đã gõ HOA thủ công (60 lượt đầu + 7 caption khung ví dụ).
* **6 nhãn lưới** trong khung doc Button đổi sang `t-ui` — chúng là chú thích tài liệu, không
  phải nhãn giao diện, nên không cần HOA và cũng hết vi phạm §1.1.

**Bộ text style: 7 → 9, đổi hết sang tên VAI.**

| Cũ | Mới | Ra | Vai |
|---|---|---|---|
| heading 1 | `t-title` | 24/32 Libre Bodoni | tiêu đề trang · mục · brand PDP |
| heading 2 | `t-section` | 18/24 | ⚠ NGƯNG DÙNG — bậc rỗng, 0 node còn bám |
| *(mới)* | `t-overlay-title` | 16/24 · Medium · HOA | title MỌI lớp nổi |
| paragraph small/medium | `t-label-1` | 14/20 · Medium · HOA | nhãn cấp 1 |
| *(mới)* | `t-body` | 14/20 · Regular | nút hành động + brand thẻ/hàng giỏ |
| paragraph mini/medium | `t-label` | 12/16 · Medium · HOA | nhãn cấp 2 |
| paragraph small/regular | `t-ui` | 12/16 | chữ 1 dòng trong linh kiện |
| paragraph/regular | `t-copy` | 12/18 | đoạn nhiều dòng |
| paragraph micro/regular | `t-micro` | 10/14 | vi mô |

* **72 variant Button** đổi nhãn: Large + Medium → `t-body` 14/20 (đúng §13.13), Small → `t-ui` 12/16.
* **3 title lớp nổi** (modal-popup + modal-slide ×2) → `t-overlay-title`, gõ HOA.
* **Card title** 18 → 24 trước khi Card bị đóng băng.
* **27 node** đang set font tay ở 14/20 (nhãn nút trong 2 màn giỏ + brand thẻ SP) → gắn `t-body`.

## B7 · Đóng băng phần shadcn thừa

Trang mới **`─── Đóng băng (shadcn) ───`** — **không xoá, kéo ngược về là dùng lại**:

| Đóng băng | Số lượng | Lý do |
|---|---|---|
| Button — variant Ghost · Link · Destructive | 48/96 | demo chỉ có 3 kiểu nút; Magento chỉ `action primary` / `action secondary` |
| Separator (cả set) | 6 variant | demo 0 thẻ `<hr>` — vai của một token viền |
| Card (anatomy shadcn) | 1 | không có block Magento tương ứng |

Ba instance dùng nhóm này trong khung ví dụ đã xử trước: Destructive Medium → Secondary Medium ·
Ghost Icon → Secondary Icon · Link Medium → gỡ bỏ (caption sửa theo).
Hai trang `Separator` và `Card` nay rỗng → gộp `[doc]` sang trang đóng băng rồi xoá trang.

## B8 · Đổi tên theo block Magento

**17 component set / component + 12 trang + 116 variant.**

| Trang mới | Component | Nguồn tên |
|---|---|---|
| `action · nút` | `action` (48v) | Magento core `.action.primary/.secondary` |
| `control · label — trường nhập` | `control` · `label` | `fieldset > field > control` |
| `field.choice — chọn` | `choice-checkbox` · `choice-radio` | `.field.choice` |
| `collapsible · accordion` | `collapsible` | widget `mage/collapsible` |
| `modal-popup · hộp thoại` | `modal-popup` · `modals-overlay` | `Magento_Ui/js/modal` |
| `modal-slide · sheet` | `modal-slide` | `Magento_Ui/js/modal` |
| `messages · thông báo` | `message` (4v) | `messages > message success/error` |
| `product-item · thẻ sản phẩm` | `product-item-info` (3v) | Magento core |
| `dafc-cart · linh kiện giỏ` | `dafc-cart-row` · `dafc-cart-gift` · `dafc-qty` · `price-box` | `price-box` là core |
| `Header` | `page-header-mobile` · `page-header-desktop` | `.page-header` |
| `Footer` | `page-footer-mobile` · `page-footer-desktop` | `.page-footer` |
| `dafc-badge` · `dafc-tab` · `dafc-select` · `dafc-switch` | `dafc-*` | không có block Magento → quy tắc Q5 |

**Variant theo Q3 + Q4:** giá trị viết thường, **trạng thái mang tiền tố `_`**.
Ví dụ `action`: `variant=primary|secondary|outline` · `size=large|medium|small|icon` ·
`state=default|_hover|_focus|_disabled`. `collapsible`: `state=default|_open`.
`control`: `state=default|_focus|_invalid|_invalid _focus|_disabled` (hai class, đúng Q3).

## B9 · Dựng lại linh kiện đã mất + nhóm thương mại

| Component | Khổ | Nguồn số đo |
|---|---|---|
| `page-header-mobile` | 375 × 48 | tách từ màn Cart mobile (đo 26/08) |
| `page-header-desktop` | 1440 × 160,8 | tách từ màn Cart desktop |
| `page-footer-mobile` | 375 × 1032,4 | tách từ màn Cart mobile |
| `page-footer-desktop` | 1440 × 599 | tách từ màn Cart desktop |
| `dafc-cart-row` | 375, 3 biến thể `kind=default/discount/pre-order` | tách từ danh sách SP |
| `dafc-cart-gift` | 375 × 185 | — |
| `dafc-qty` | 84 × 24 | — |
| `price-box` | 125 × 38 | — |
| `product-item-info` | **185 × 372,1**, 3 biến thể | **đo mới trên PLP 26/08** |

**Số đo mới của thẻ sản phẩm** (khác bản 20/08 đã mất): lưới PLP 2 cột 184,5 · khe dọc 24 ·
khe ngang 2. Chiều cao thẻ **không đổi giữa 3 biến thể** — `price-box` chốt cứng 42 kể cả khi
không có giá gạch, để hàng thẻ luôn thẳng. Quick-add 36 và ô màu 18 đều **BO TRÒN**
(ngoại lệ §3.2 user đảo 25/08). Brand = `t-body` 14/20, đúng 13.1.

## B-thêm · Dọn tầng tài liệu

Trang `Cover` / `Getting started` / 3 trang `Foundations` dựng 20/08 còn chữ raw và còn ghi
*"Tailwind + shadcn/ui"* — nay đã: viết lại Cover thành **DAFC · Design system**, viết lại phần
"Bắt đầu ở đây" theo stack hiện hành (§8), gắn text style cho **60 node**, bind màu **11 fill**,
và đưa **7 caption** khỏi bậc 18 rỗng.

**Metadata biến:** `accent-0` gắn `codeSyntax = var(--unofficial-accent-0)` (tên token thật trong
`tokens.css`) + mô tả ghi rõ đây là ngoại lệ §2.3 và **danh sách ngoại lệ ĐÓNG ở 2 mục**.
Điền mô tả cho 8 biến Color + 11 biến Spacing. Primitives và `radius/full` **cố ý không có**
`codeSyntax` — đã ghi lý do vào mô tả.

## Đo lại sau khi thi hành

| Trục | Trước | Sau |
|---|---|---|
| §1.1 · 500 + chữ thường | **80 node** | **0** |
| Text node không gắn style | 63 | **0** |
| Bậc 18/24 rỗng còn node bám | 12 | **0** |
| §3.3 đổ bóng | 0 | **0** |
| §3.2 bo góc sai | 0 | **0** |
| Bind màu | 906 | **1.826** (1.418 nền + 408 kẻ) |
| Biến thiếu mô tả | 19 | **0** |
| Variant Button không có chỗ dùng | 48/96 | **0** *(đã đóng băng)* |
| Component thương mại | 0 | **13** |

Còn **19 fill + 13 kẻ chưa bind** — tất cả là **cố ý**: ô màu sản phẩm `#a5d48c`, icon cờ Anh
(`#012169` · `#ffffff` · `#c8102e`), và màu khung SECTION của Figma.

## Còn treo sau đợt này

1. **Tên `t-overlay-title`** là tôi đặt — `NAMING-MAGENTO.md` Phần 3 chưa có vai 16/24.
   Cần chốt tên chính thức rồi đồng bộ sang code.
2. **`NAMING` Phần 3 vs `FONT-LIBRE-INTER` 13.1 vẫn lệch:** Phần 3 còn `.t-section` 18/24 và
   thiếu 16/24. Nên cập nhật `NAMING-MAGENTO.md` cho khớp bảng 9 style vừa chốt.
3. **Hai bộ từ vựng mực trong `home.html`** (`--foreground`/… và `--ink`/…) — chưa chốt một bộ.
4. **Token lưới/nhịp/chuyển động** (`--gut` · `--rail` · `--sec*` · `--dur` · `--ease`) chưa có
   trong Figma variables.
5. **Hai màn Cart chưa instance** các linh kiện `dafc-cart-*` — vẫn là bản dựng phẳng.
6. Còn thiếu: `breadcrumbs` · `toolbar` PLP · `filter-options` (Amasty) · `minicart` ·
   `swatch-attribute` đầy đủ.
