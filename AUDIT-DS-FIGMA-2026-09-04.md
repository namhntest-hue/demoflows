# Audit design system — file Figma "Test agent" · 04/09/2026

Chạy đủ 2 lớp: engine chấm điểm (`figma_audit_design_system_report`) + quét thủ công qua
plugin bridge trên toàn bộ 29 page. File `XFfjTNMuPfaTeZvdbVIO2F`.

> **Kết luận một dòng:** điểm máy 75/100 nhưng **sai lệch cả hai chiều** — nó phạt oan
> mấy chỗ dự án đang làm đúng, và bỏ sót 2 lỗi thật đáng sửa nhất.

---

## 0. Điểm máy (tham khảo)

**75/100 — needs-work**

| Trục | Điểm | Trọng số |
|---|---:|---:|
| Naming & Semantics | 79 | 0.20 |
| Token Architecture | 81 | 0.20 |
| Component Metadata | 62 | 0.20 |
| Accessibility | 70 | 0.15 |
| Consistency | 84 | 0.15 |
| Coverage | 79 | 0.10 |

---

## 1. Quy mô thật

```
107 component tổng
 ├─ 37  icon
 ├─ 18  shadcn đóng băng  (16 Button/Destructive/* + Separator + Card)
 └─ 52  ← HỆ ĐANG CHẠY THẬT
```

Mọi tỉ lệ audit đưa ra đều tính trên 107 → méo. Tính lại trên 52 mới đúng.

---

## 2. Lỗi THẬT — theo thứ tự nặng

### 2.1 · 30 khung không có nền, đang ăn nền xám #444444 của section — ĐÃ SỬA

Lint báo "40 lỗi tương phản critical: chữ #0A0A0A trên nền #444444". Truy ngược chuỗi cha:

```
TEXT "Màu sắc"                       fill #0A0A0A
 └ FRAME box                          fill none
   └ FRAME box                        fill none
     └ FRAME "PDP / khối chọn · mobile · chưa chọn size"   fill none   ← THIẾU NỀN
       └ SECTION "PDP — trạng thái & biến thể"             fill #444444
```

Không phải lỗi WCAG của sản phẩm — là **khung Figma quên đặt nền**, nên nền xám đậm của
section xuyên qua. Khách mở file sẽ thấy chữ đen trên xám.

| Section | khung | KHÔNG nền |
|---|---:|---:|
| PDP — trạng thái & biến thể | 33 | **19** |
| Menu — mega desktop + drawer mobile | 12 | **5** |
| PLP — trạng thái & biến thể | 25 | **4** |
| Thêm vào giỏ — trạng thái thành công | 6 | **2** |
| PLP / PDP / Cart *(3 section dựng đợt đầu)* | 16 | 0 ✓ |
| | | **tổng 30** |

Quy luật rõ: 3 section dựng đợt đầu đều có nền. **30 khung thiếu nền đều là khung
trạng thái/mảnh dựng 03–04/09** — dựng bằng script, khung mảnh cắt ra không kế thừa nền.

### 2.2 · Fill `#000000` thay vì `#0A0A0A` — ĐÃ SỬA · số liệu đã đính chính, xem Phần 7

Chuẩn dự án là `#0A0A0A` (đã chốt, xem [dafc-size-guide-nut] 6/6 nút ra #0a0a0a). Đang lệch:

| Cụm | Số variant | Ghi chú |
|---|---:|---|
| `action` variant=link → `label` | 12 | large/medium/small × default/_focus/_disabled/_active — riêng **_hover thì đúng** |
| `collapsible` → `trigger` | 19 | cả 2 bậc size |
| `badge` kind=count → `text` | 1 | |
| page `icons` | ~137 | icon master |

Chi tiết `action`: đúng 4 trạng thái sai, 1 trạng thái (_hover) đúng → lỗi sót lúc dựng, không phải chủ ý.

### 2.3 · 21/52 component thiếu mô tả — ĐÃ SỬA

Audit nói "37% có mô tả". Sai — đó là tính cả icon và shadcn. **Thật: 31/52 = 60%.**
Và 21 cái thiếu không rải đều, gom đúng vào các đợt dựng nhanh:

| Cụm | Thiếu | Dựng ngày |
|---|---:|---|
| `filter` (filter-toggle · check-row · tree-row · section-header · group-header · size-chip · color-swatch · unit-tab · cat-chip · price-range · panel-header · panel-footer · bar · panel-mobile · panel-desktop) | **15/15** | 27/08 |
| `menu` (menu-row · mega-teaser · mega-link) | **3/3** | 04/09 hôm nay |
| `service-promises` (mobile + desktop) | **2/2** | — |
| `breadcrumbs` | 1 | 03/09 |

Ngược lại, phần có mô tả thì rất dày — không phải làm qua loa:
`action` 1.573 ký tự · `product-item-info-desktop` 1.270 · `product-item-info` 1.005 · `swatch-option` 901.

### 2.4 · Text không gắn text style

| Page | không style / tổng text |
|---|---|
| `filter` | **31 / 95** (33%) |
| `collapsible` | 8 / 32 |
| `menu` | 3 / 6 |
| `badge` · `page-footer` | 1 mỗi page |
| 16 page còn lại | **0** ✓ |

### 2.5 · Fill không gắn biến

| Page | không biến / solid fill |
|---|---|
| `icons` | 155 / 167 (93%) |
| `filter` | **97 / 289** (34%) |
| `product-item` | 47 / 219 |
| `collapsible` | 38 / 72 (53%) |
| `service-promises` | 18 / 34 (53%) |
| `page-header` | 14 / 43 |
| `menu` | 6 / 10 |
| `action` | 2 / 321 ✓ |

> **`filter` là mắt xích yếu nhất của cả hệ** — ăn hạng nhất ở cả 3 mục 2.3 / 2.4 / 2.5.
> Dựng 27/08 trong một đợt lớn rồi chưa dọn lại lần nào.

### 2.6 · ~~Thiếu semantic `error`/`danger`~~ — BÁO ĐỘNG GIẢ, xem Phần 7
Có `warning` · `success` · `info`, **không có error** — trong khi `field-error` đang tồn tại và
chip `-%` nền `#FEF2F2` (ngoại lệ §2.2 skin-li) đang là màu rời không token.

### 2.7 · Thiếu component `input` và `alert/toast` — code thì CÓ
ô tìm thương hiệu (PLP 27/08) · form checkout · ô đăng ký newsletter (footer) · toast đổi sort (PLP).

### 2.8 · Collection variable chỉ 1 mode
Pipeline token dự án có **2 mode D/GM** (`tokens07.json` → `gen_tokens.py`). Figma mất một nửa.
*(Không liên quan dark mode — gợi ý light/dark của audit là gợi ý chung, demo không cần.)*

### 2.9 · 3 page component bị lạc khỏi khối Components
Thứ tự page hiện tại:
```
─── Components ───  action … page-footer
─── Frozen (shadcn) ───
screens
menu · page-header · service-promises   ← 3 page component THẬT nằm dưới divider Frozen
```
Thêm: `breadcrumbs` sống lẻ ngay trên page `screens`, và 1 khung rời ngoài mọi section.

### 2.10 · 4 nút header chưa thành component
`btn/menu` · `btn/search` · `btn/account` · `btn/cart` — đặt tên kiểu component nhưng là frame thô
trong `page-header-mobile`.

---

## 3. Audit trừ điểm nhưng dự án ĐANG ĐÚNG — không sửa

| Audit nói | Thực tế |
|---|---|
| "Chỉ 18/107 dùng PascalCase, nên chuẩn hoá PascalCase" | **Ngược luật.** NAMING-MAGENTO chốt kebab-case phẳng vì site chạy Magento. 18 cái PascalCase là shadcn — và **đã được cách ly sẵn ở page `─── Frozen (shadcn) ───`**. Không có việc phải làm. |
| "Category organization 50%, nên thêm tiền tố Forms/Input" | Trái luật kebab-case **phẳng**. Icon đã có namespace `icon/tr\|ts/…` đúng chỗ cần. |
| "Token tier depth 2 tầng, nên 3+" | 2 tầng (primitive → semantic) đủ với quy mô này. Thêm tầng chỉ để lấy điểm = nợ. |
| "Thiếu token STRING / BOOLEAN" | Chính công cụ ghi *"never filler"*. Dự án không có feature flag / token nội dung. |
| "71 standalone, variant structure 34%" | Bị 37 icon làm loãng. Trong 52 component thật có **33 variant set** — tỉ lệ thật tốt. |
| "40 lỗi tương phản critical" | False positive — nguyên nhân thật là mục 2.1. |

---

## 4. Đề xuất thứ tự làm

| # | Việc | Khối lượng | Máy làm được? |
|---|---|---|---|
| 1 | Đặt nền cho 30 khung (mục 2.1) | 30 node | ✅ tự động |
| 2 | Đổi 32 fill `#000000` → `#0A0A0A` ở `action`/`collapsible`/`badge` (mục 2.2) | 32 node | ✅ tự động |
| 3 | Viết mô tả 21 component (mục 2.3) | 21 component | ✅ máy sinh, người duyệt |
| 4 | Gắn text style 44 node (mục 2.4) | 44 node | ⚠ cần chọn style đúng vai |
| 5 | Thêm semantic `error` + bind `#FEF2F2` (mục 2.6) | vài token | ✅ tự động |
| 6 | Dời 3 page + `breadcrumbs` vào khối Components (mục 2.9) | 4 thao tác | ✅ tự động |
| 7 | Gắn biến cho fill `filter` + `collapsible` (mục 2.5) | ~135 node | ⚠ cần đối chiếu token |
| 8 | Thêm mode GM cho collection (mục 2.8) | — | ⚠ cần bảng giá trị GM |
| 9 | Dựng `input` + `alert/toast` (mục 2.7) | 2 component | ❌ thiết kế thật |
| 10 | Component hoá 4 nút header (mục 2.10) | 4 node | ⚠ quyết định cấu trúc |

Việc 1–3 gỡ được phần lớn điểm trừ và đều là lỗi rõ ràng, không cần quyết định thiết kế.

## 5. Không còn gì phải chốt từ báo cáo bản trước
Mục D1 (18 component shadcn PascalCase) — **đã xong sẵn**, page `─── Frozen (shadcn) ───` tồn tại rồi.

---

## 6 · ĐÃ THI CÔNG — 04/09/2026

Ba việc đầu bảng đề xuất đã chạy xong. Nguyên tắc xuyên suốt: **sửa bằng BIND BIẾN, không ghi hex** —
để `code → figma` và `figma → code` đều đi qua một tầng token chung.

### 6.1 Việc 1 — 30 khung thiếu nền
Bind fill vào biến **`background`** (`VariableID:29:16` → `white` #FFFFFF), đúng biến mà 3 section
dựng đợt đầu đã dùng. Không ghi hex trắng.

`PDP — trạng thái & biến thể` 19 · `Menu` 5 · `PLP — trạng thái & biến thể` 4 · `Thêm vào giỏ` 2.

### 6.2 Việc 2 — fill đen off-token
Bind vào biến **`foreground`** (`VariableID:29:17` → `gray/900` #0A0A0A):

| Chỗ | Số fill | Ghi chú |
|---|---:|---|
| **24 icon master** (page `icons`) | **69** | trước đó hex cứng, KHÔNG bind |
| vector rời `page-header` | 4 | 4 nút `btn/*` — chính chỗ lint báo detached |
| vector rời `service-promises` | 10 | |
| vector rời `product-item` | 1 | |
| `action` nhãn `variant=link` | 12 | đã bind sẵn, chỉ đổi biến — xem đính chính 7.2 |
| | **96** | |

**Sửa icon master là mấu chốt.** 19 vector đen của `collapsible` nằm trong *instance*
`icon/tr/plus` · `icon/tr/minus` — sửa tại chỗ chỉ đẻ override đè master. Sửa gốc thì 19 instance
tự ăn theo (đã kiểm: `collapsible` nay còn 0 fill đen). Cách này khớp code: icon trong demo dùng
`currentColor`, thừa kế màu chữ.

Còn lại **3 fill đen raw — CỐ Ý GIỮ**: đều là layer chữ ghi chú `[doc]` trên page `product-item`,
`page-footer`, `page-header`. Là chú thích, không phải thiết kế.

### 6.3 Việc 3 — 21 mô tả component
Viết theo đúng khuôn nhà đang dùng (dòng nhận diện → ánh xạ sang class/số đo demo → ⚠ việc còn nợ),
lấy spec từ `FIGMA-FILTER.md` §2–§5 và `MENU-FIGMA-2026-09-04.md` §2 chứ không chế số.

15 `filter` · 3 `menu` · 2 `service-promises` · 1 `breadcrumbs`.

Mô tả **mang theo cả nợ kỹ thuật** để đợt sau không phải dò lại — ví dụ:
- `filter-price-range` → chép nguyên cách sửa 1 dòng `min-w-0` cho lỗi tràn ngang của demo
- `filter-section-header` → cảnh báo bậc `size=sm` đã ngừng dùng từ chiều 27/08
- `filter-cat-chip` · `filter-bar` → 2 chỗ code còn nợ Figma (chip 36→34, gridbtn 36→40)
- `filter-tree-row` → 1 hex cứng `#d9d9d9` demo chưa sửa
- `breadcrumbs` → master còn chữ mẫu tiếng Anh + đang nằm lẻ ngoài khối Components

### 6.4 Kết quả đo lại

| | Trước | Sau |
|---|---:|---:|
| **Component thật có mô tả** | 31/52 (60%) | **52/52 (100%)** |
| **Khung thiếu nền** | 30 | **0** |
| **Fill đen raw (không bind)** | 84 | **3** *(chú thích, cố ý)* |
| Điểm máy | 75/100 | 76/100 |

Điểm máy chỉ nhích 1 vì phần trừ còn lại **toàn là mấy mục Phần 3** — đòi PascalCase, đòi tiền tố
`Forms/`, tính icon là "standalone sai", đòi token STRING/BOOLEAN, đòi dark mode. Chất lượng thật
đi xa hơn số đó nhiều.

---

## 7 · Đính chính báo cáo bản sáng

### 7.1 `#000000` — số 169 là SỐ MA
Paint đã bind biến **vẫn giữ nguyên màu literal cũ** trong object; Figma chỉ resolve biến lúc
render. Nên quét `fill.color === #000000` bắt nhầm cả những node ĐANG hiển thị đúng.

Số thật: **84 fill hex cứng** (69 icon master + 15 vector rời), không phải 169.

**Bài học cho mọi lượt audit sau: luôn đọc `fill.boundVariables.color` TRƯỚC khi tin `fill.color`.**

### 7.2 12 nhãn `action variant=link` không hỏng như đã báo
Chúng đã bind biến sẵn (page `action` có 321 fill, chỉ 2 cái không bind) và đang render đúng
#0A0A0A — `#000000` chỉ là literal cũ. Đã đổi sang bind `foreground` cho đúng vai ngữ nghĩa của
màu chữ; **không đổi gì về mặt nhìn**.

### 7.3 `destructive` CÓ tồn tại — audit báo động giả
Audit nói *"missing error, danger"*. Thực tế có đủ `destructive` (→ `red/600` #D62845) và
`destructive-foreground` (→ `white`). Audit chỉ dò đúng chữ `error`/`danger`, không biết hệ này
dùng từ vựng shadcn.

Phần còn đúng của mục 2.6: **`#FEF2F2`** (nền chip `-%` skin-li) vẫn **chưa có token** — cần một
nấc nền đỏ nhạt, tương tự vai `accent-0` bên xám.

### 7.4 `badge` kind=count không hỏng
Tưởng chữ đen trên nền đỏ. Thực tế chữ bind `primary-foreground` → `white`; #000000 lại là literal cũ.
Không đụng vào.

---

## 8 · Gom toàn bộ component về MỘT page — 04/09/2026

Lệnh user: *"gôm tất cả component vô chung 1 page cho dễ kiểm soát"*.

**Cách làm: một page `components`, chia 23 SECTION theo họ** — về một chỗ nhưng không mất cách nhóm
vốn có. Section giữ đúng tên page cũ, nội dung giữ nguyên vị trí tương đối (dời cả cụm theo một
delta chung, đệm 120 quanh, khe 400 giữa các section).

| | Trước | Sau |
|---|---:|---:|
| Số page | 29 | **7** |
| Page chứa component | 22 (+1 lẻ trên `screens`) | **1** |

Thứ tự page nay: `Cover` · `Getting started` · 3 × `Foundations` · **`components`** · `screens`.

Thứ tự section trong page — linh kiện trước, khối ghép sau:
`action` · `control · label` · `field.choice` · `badge` · `tab` · `collapsible` · `select` ·
`switch` · `messages` · `modal-popup` · `modal-slide` · `states` · `swatch-option` ·
`product-item` · `filter` · `cart` · `page-header` · `breadcrumbs` · `menu` · `page-footer` ·
`service-promises` · `icons` · `Frozen (shadcn) — tư liệu, không dùng`.

Xử lý kèm:
- `breadcrumbs` kéo từ page `screens` về đúng khối (mục 2.9 đã đóng).
- Khối shadcn đóng băng vẫn tách bạch — nay là SECTION cuối cùng, đổi tên cho rõ vai (bỏ tiền tố
  `───` vốn là quy ước tên PAGE, hết nghĩa khi thành section).
- 23 page rỗng sau khi chuyển đã xoá, kể cả 2 page vách ngăn `─── … ───`.

### Kiểm chứng

| Phép kiểm | Kết quả |
|---|---|
| Tổng component | **107 → 107** (không đổi) |
| Component còn nằm ngoài page `components` | **0** |
| Instance toàn file | **1.642**, hỏng liên kết **0** |
| Section chồng lấn nhau | **0** |
| Node con tràn ra ngoài section | **0** |

### Một tác dụng phụ đã phát hiện và sửa

`figma.createSection()` cho nền mặc định **#444444 xám đậm** — đúng màu đang gây lỗi ở mục 2.1.
Component master phần lớn trong suốt nên khi vào section liền chìm nghỉm; trước đó chúng nằm trên
nền canvas sáng của page nên vẫn đọc được.

Đã đổi nền cả 23 section sang **`gray/50` #F7F7F7 (bind biến, không ghi hex)**. Chụp lại section
`states` xác nhận component đọc rõ.

> Ghi cho đợt sau: **section mới tạo bằng API luôn ra nền #444444** — đặt nền ngay sau khi tạo.

---

## 9 · Component còn thiếu + đề xuất chuẩn hoá biến thể — 04/09/2026

### 9.0 Audit báo thiếu 2, thực ra chỉ thiếu 1

| Audit nói | Thực tế |
|---|---|
| thiếu `input` | **Không thiếu** — là **`control`** (5 variant). Audit dò đúng chữ `input`, không biết dự án đổi tên theo NAMING-MAGENTO. |
| thiếu `alert/toast` | **Alert không thiếu** — là **`message`** (4 kind). **Chỉ `toast` thiếu thật.** |

**Đã dựng 2 component (107 → 109):**

- **`toast`** — đặt trong section `messages`. Số đo lấy từ demo chạy thật (`skin-mt skin-li`, khổ 375,
  đo 04/09): đệm 10/16 · khe 8 · dấu tích 14 · chữ `t-copy` 12/18 · 400 · ls 0,5 ·
  mực `primary-foreground` · nền `primary` @95% · bo 9999 · blur 8. Thuộc tính `label` (TEXT) +
  `showIcon` (BOOLEAN). Ra **154×38** (demo 147,6×36,5 — lệch 1,5 do trình duyệt làm tròn line box;
  dựng theo ĐỆM chứ không ghim chiều cao, đúng luật §8.2 FIGMA-FILTER).
- **`icon/tr/check`** 16×16 — bộ 37 icon **không có dấu tích nào**, toast trong demo đang dùng svg
  inline. Cùng loại việc với `icon/filter` dựng 27/08.

**2 chỗ toast lệch luật — CHƯA CHỐT:**
1. Demo có `shadow-lg` (2 lớp bóng). Luật lớp nổi của dự án: viền 1px, **KHÔNG bóng**. Component
   dựng **không bóng** theo luật → nếu muốn giữ bóng phải ghi ngoại lệ, còn không thì gỡ ở code.
2. Bo tròn hết là **ngoại lệ thứ 3** của §3.2 STYLE-RULES (đang có 2: ô màu + `.quick-add`) — cần ghi danh.

---

### 9.1 ⚠ NẶNG NHẤT — `_active` đang mang HAI nghĩa trái nhau — ĐÃ SỬA

| Component | `_active` nghĩa là |
|---|---|
| `action` | đang **NHẤN** (pressed, mờ 90%) |
| `tab-item` · `filter-unit-tab` · `filter-cat-chip` | đang **CHỌN** (current) |

Cùng một token, hai nghĩa. Ai đọc DS cũng vấp.

- **Phương án A (khuyến nghị)** — giữ `_active` = đang nhấn ở `action` (bộ state của nó là
  `default|_hover|_focus|_disabled|_active`, ánh xạ 1-1 với pseudo-class CSS, phá là mất mạch), đổi
  3 chỗ kia sang **`_selected`**. Một thay đổi gỡ luôn cả mục 9.2.
- Phương án B — đổi `action` sang `_pressed`. Chỉ sửa 1 component nhưng lệch tên CSS.

### 9.2 · Bốn từ vựng cho cùng một khái niệm "đang chọn" — ĐÃ SỬA

| Component | trục | giá trị |
|---|---|---|
| `choice-checkbox` | `checked` | `_checked` ✓ |
| `choice-radio` | **`selected`** | **`_checked`** ← trục và giá trị đá nhau |
| `filter-check-row` | `state` | `_checked` |
| `swatch-option` · `filter-size-chip` · `filter-color-swatch` · `select-item` | `state` | `_selected` |
| `tab-item` · `filter-unit-tab` · `filter-cat-chip` | `state` | `_active` |

**Đề xuất quy tắc, còn đúng 2 từ:**
- Form control thật (tick, radio) → trục `checked`, giá trị `_checked`. → sửa `choice-radio` (trục `selected` → `checked`).
- Mọi lựa chọn UI khác (chip · swatch · tab · item danh sách) → `state=_selected`. → sửa 3 chỗ `_active`.

### 9.3 · `control` — trục chưa đủ so với thực tế code — ĐÃ SỬA · xem §13.1

Hiện: `state=default|_focus|_invalid|_invalid _focus|_disabled`, ghim 320×40, chữ 12/16.
Đo demo 04/09 thì có **3 bậc cao** và **3 loại**:

| Bậc | Chỗ dùng | Đệm | Chữ |
|---:|---|---|---|
| **36** | ô tìm thương hiệu · 2 ô khoảng giá (trong `#filterSheet`) | 0/8 | 12/18 · **500** *(ngoại lệ đã ghi danh §13.1)* |
| **40** | đăng nhập · checkout · mã ưu đãi | 8 *(p-2)* **hoặc** 0/8 *(px-2)* ⚠ | 12/16 **và** 12/18 ⚠ |
| **44** | đăng ký nhận tin ở footer — **đúng 1 chỗ** | 0/12 | 12/18 |

**3 lỗi trong chính demo, lộ ra khi đo:**
- Cùng bậc 40 mà hai kiểu đệm khác nhau → chữ không nằm cùng đường.
- Cùng cỡ 12 mà hai line-height (16 và 18) → phạm luật cốt lõi *"đổi font-size mới đổi line-height"*.
- Bậc 44 nuôi cho đúng một chỗ.

**Đề xuất:** `size=36|40` × `kind=text|search|password` × `state=default|_focus|_filled|_invalid|_disabled`
= **30 variant**, bỏ bậc 44 (kéo ô đăng ký nhận tin về 40).
Phương án 2 giữ cả 3 bậc = 45 variant — không khuyến nghị, nuôi một bậc chết.

### 9.4 · `control` — giá trị `_invalid _focus` sai khuôn — ĐÃ SỬA · chẩn đoán ban đầu SAI, xem §10.2

Hai trạng thái **gộp thành một giá trị**; cả file không chỗ nào làm vậy. Đã có tiền lệ tách đúng ở
`collapsible` (2 trục). Đề xuất tách: `state=default|_focus|_disabled` × `invalid` (BOOLEAN).

Kèm một lỗi trong chính component: variant `state=default` đệm **12/8/12/8** còn 4 variant kia
**0/8/0/8**.

### 9.5 · ~~`message` — 4 kind giống hệt nhau~~ — CHẨN ĐOÁN SAI, KHÔNG LÀM · xem §11.1

`kind=default|success|warning|destructive` nhưng cả 4 cùng viền `#DFDFDF`, cùng mực
`#0A0A0A`/`#666666`, và **không cái nào có icon**. Trục `kind` hiện chỉ là cái tên.

**Đề xuất:** mỗi kind một icon dẫn + mực icon theo token tương ứng (`success` · `warning` ·
`destructive`), giữ nền/viền trung tính cho đúng hướng phẳng. Cần thêm `icon/tr/alert` và
`icon/tr/info` (đã có `icon/tr/check` từ hôm nay).

### 9.6 · Thiếu trạng thái tương tác ở 12 component bấm được — ĐÃ SỬA 11/12 · xem §11

Không có `_hover` lẫn `_focus` dù đều bấm được:
`filter-check-row` · `filter-tree-row` · `filter-size-chip` · `filter-color-swatch` ·
`filter-unit-tab` · `filter-cat-chip` · `filter-toggle` · `filter-group-header` ·
`filter-section-header` · `quantity-stepper` · `swatch-option` *(có `_selected`/`_disabled`, thiếu
2 cái này)* · `menu-row` *(không có trục state nào)*.

`_focus` là vấn đề a11y thật — không vẽ thì dev không biết vòng focus trông ra sao. Khuôn đã có sẵn
ở `action`: vòng ring đen 1px cách 3px, không bóng.

**Đề xuất:** thêm tối thiểu `_focus` cho cả 12; thêm `_hover` cho nhóm dùng trên desktop.

### 9.7 · `product-item-info` lệch với bản desktop — ĐÃ SỬA (thu hẹp có lý do) · xem §13.2

| | trục |
|---|---|
| `product-item-info` | `kind=default\|sale\|pre-order` × `size=grid\|rail` — **không state** |
| `product-item-info-desktop` | `state=default\|_hover` × `size=grid\|rail\|look` — **không kind** |

Hai component cùng vai mà trục lệch hẳn nhau: bản mobile không mang được trạng thái, bản desktop
không mang được `sale`/`pre-order`. Đề xuất cho cả hai đủ `kind` × `size` × `state`.

### 9.8 · `collapsible` đặt tên trục khác cả nhà — ĐÃ SỬA

Dùng `interaction=default|_hover|_focus|_disabled` trong khi 20 component khác dùng `state`.
Nhưng **cách tách của nó lại đúng** và nên nhân rộng (xem 9.4) — chỉ sai cái tên.

**Đề xuất:** `interaction` → `state`, và `state` hiện tại → `open`. Ra
`open=default|_open` × `state=default|_hover|_focus|_disabled`.

---

### Tóm tắt việc đề xuất

| # | Việc | Động chạm | Máy làm được? |
|---|---|---|---|
| 9.1+9.2 | Thống nhất từ vựng chọn: `_active`→`_selected` (3), trục `selected`→`checked` (1) | 4 component | ✅ đổi tên variant |
| 9.4 | Tách `_invalid _focus` + vá đệm lệch của `control` | 1 component | ✅ |
| 9.3 | Thêm trục `size` + `kind` cho `control` → 30 variant | 1 component | ⚠ dựng thật |
| 9.5 | Cho 4 kind của `message` khác nhau thật + 2 icon mới | 1 component + 2 icon | ⚠ dựng thật |
| 9.6 | Thêm `_focus` cho 12 component | 12 component | ⚠ dựng thật |
| 9.8 | Đổi tên 2 trục của `collapsible` | 1 component | ✅ |
| 9.7 | Cân lại trục của cặp `product-item-info` | 2 component | ⚠ dựng thật, ảnh hưởng 53 instance |

Nhóm ✅ (9.1 · 9.2 · 9.4 · 9.8) chỉ là đổi tên/vá số, làm được ngay và không đụng hình.
Nhóm ⚠ cần chốt trước vì đẻ thêm variant và chạm instance đang dùng.

---

## 10 · Đã chạy 4 mục 9.1 · 9.2 · 9.4 · 9.8 — 04/09/2026

### 10.1 Thống nhất từ vựng "đang chọn" (9.1 + 9.2)

| Component | Trước | Sau |
|---|---|---|
| `tab-item` | `state=_active` | `state=_selected` |
| `filter-unit-tab` | `state=_active` | `state=_selected` |
| `filter-cat-chip` | `state=_active` | `state=_selected` |
| `choice-radio` | trục **`selected`** = `_checked` | trục **`checked`** = `_checked` |

**Quy tắc chốt, còn đúng 2 từ:**
- Form control thật (tick · radio) → trục `checked`, giá trị `_checked`.
- Mọi lựa chọn UI khác (chip · swatch · tab · item danh sách) → `state=_selected`.

Kiểm lại toàn file: `_active` **nay chỉ còn ở `action`** (20 variant, đều mang nghĩa *đang nhấn*,
khớp `:active` của CSS). Va chạm nghĩa đã hết.

### 10.2 `control` — chẩn đoán ban đầu SAI, nhưng lại tìm ra 2 lỗi nặng hơn

**Đính chính §9.4.** Tôi viết *"hai trạng thái gộp thành một giá trị; cả file không chỗ nào làm vậy"*
và đề xuất tách thành trục boolean. **Sai** — file đã có sẵn tiền lệ giá trị ghép:
`_selected-oos` (`swatch-option`, `filter-size-chip`) và `_has-reset` (`filter-panel-footer`).

Lỗi thật chỉ là **dấu cách**. Nên sửa đúng một chỗ: `_invalid _focus` → **`_invalid-focus`**.
Cách tách boolean mà tôi đề xuất lẽ ra còn **đẻ thêm variant thứ 6** (`_disabled` + invalid) — trái
đúng điều tôi hứa là "không đẻ variant".

**Đổi lại, lượt sửa đệm làm lộ 2 lệch ẩn giữa 5 variant — cái thứ 2 nhìn thấy được:**

1. **Đệm** — `default` là `12/8/12/8`, 4 variant kia `0/8/0/8`. Nay cả 5 dùng `12/8/12/8` và chiều
   cao do ĐỆM quyết (hug) chứ không ghim cứng, đúng luật §8.2: `12 + 16 + 12 = 40`.
2. **Viền** — `default` vẽ `strokeAlign=OUTSIDE` còn 4 variant kia `INSIDE`. Nghĩa là **hộp ở trạng
   thái mặc định to hơn 2px so với 4 trạng thái còn lại** — lệch thấy được, không phải chuyện tên gọi.
   Nay cả 5 về `INSIDE`, khớp mô hình `border-box` của CSS (viền nằm TRONG 40).

Đường đi để tìm ra: đổi sang hug thì 4 variant nhảy lên **42** trong khi `default` giữ **40** — chính
2px đó tố cáo `strokeAlign` lệch. Nếu cứ để chiều cao cứng thì lỗi này nằm im mãi.

### 10.3 `collapsible` — đổi tên 2 trục (9.8)

| Trước | Sau |
|---|---|
| `state=default\|_open` | **`open`**`=default\|_open` |
| `interaction=default\|_hover\|_focus\|_disabled` | **`state`**`=default\|_hover\|_focus\|_disabled` |

Làm 2 lượt để tránh trùng tên trục giữa chừng. Trước đó đây là component **duy nhất** gọi trục tương
tác là `interaction` trong khi 20 component khác gọi `state`. Cách TÁCH của nó thì đúng và nên nhân
rộng: một trục cho trạng thái ngữ nghĩa, một trục cho tương tác.

### 10.4 Kiểm chứng

| Phép kiểm | Kết quả |
|---|---|
| `_active` còn sót ngoài `action` | **0** |
| 5 variant của `control` | **320×40 cả 5**, đệm `12/8/12/8`, `strokeAlign=INSIDE`, hug height |
| Trục sau khi đổi | `collapsible: open × state × size` · `choice-radio: checked × state` ✓ |
| Instance toàn file | **1.643**, hỏng liên kết **0** |

Mô tả của cả 6 component đã cập nhật, ghi rõ đổi cái gì và **vì sao** để đợt sau không sửa ngược.

### 10.5 Bốn mục còn lại vẫn chờ chốt

`9.3` (thêm trục `size`+`kind` cho `control` → 30 variant) · `9.5` (4 kind của `message` giống hệt
nhau, cần icon riêng + 2 icon mới) · `9.6` (thêm `_focus` cho 12 component bấm được) ·
`9.7` (cân lại trục cặp `product-item-info`, chạm 53 instance).

---

## 11 · Mục 9.6 đã chạy · mục 9.5 DỪNG — 04/09/2026

### 11.1 ⛔ 9.5 chẩn đoán SAI — không làm, và không nên làm

Tôi báo *"`message` 4 kind giống hệt nhau, không cái nào có icon"*. **Sai.** Lượt quét đó tìm node
tên khớp `/icon/` nên bỏ sót một `ELLIPSE` tên **`dot`**. Đo lại:

| kind | chấm | bind biến |
|---|---|---|
| `default` | `#0A0A0A` | `foreground` |
| `success` | `#1A7A5C` | `success` |
| `warning` | `#D97706` | `warning` |
| `destructive` | `#D62845` | `destructive` |

Bốn kind **khác nhau thật**, và mỗi cái bind đúng token semantic của nó. Thứ tôi tưởng thiếu thì đã
có, chỉ là ở dạng chấm 6px chứ không phải icon.

Quan trọng hơn: **"chấm + chữ" là khuôn user đã chốt 20/08** (AUDIT-SKIN-MT mục B7 — *trạng thái đơn
= chấm+chữ*). Thay bằng icon là đảo ngược một quyết định đã có, nên **không làm**.

Chỗ duy nhất còn cải thiện được: cả 4 variant dùng chung một câu mẫu *"Đã thêm vào giỏ hàng"*, nên
nhìn lướt tưởng giống nhau. Đổi câu mẫu theo từng kind là đủ — việc nhỏ, không đụng cấu trúc.

### 11.2 9.6 — thêm `_focus` cho 11 component (không phải 12)

Khuôn dùng lại nguyên xi của `action` / `control` / `tab-item`: lớp `focus-ring` nét **1px bind biến
`ring`**, `strokeAlign=INSIDE`, bo 0, đặt tại −3,−3 và to hơn khung 6px — vòng mảnh **cách 3px**,
không bóng.

| Component | Trước | Sau | Ghi chú |
|---|---:|---:|---|
| `filter-check-row` | 2v | **3v** | |
| `filter-tree-row` | 6v | **9v** | `_focus` cho cả 3 cấp |
| `filter-size-chip` | 4v | **5v** | |
| `filter-color-swatch` | 2v | **3v** | |
| `filter-unit-tab` | 2v | **3v** | |
| `filter-cat-chip` | 2v | **3v** | |
| `swatch-option` | 4v | **5v** | |
| `quantity-stepper` | 2v | **3v** | |
| `filter-section-header` | 4v | **8v** | trục `state`→`open`, `state` nhường cho tương tác |
| `filter-group-header` | 2v | **4v** | như trên |
| `menu-row` | 2v | **4v** | trước đó KHÔNG có trục trạng thái nào |
| | | **+18 variant** | |

Hai component cuối trong nhóm B đi theo đúng khuôn `collapsible` vừa chuẩn hoá ở §10.3: một trục cho
trạng thái ngữ nghĩa (`open`), một trục cho tương tác (`state`).

**`filter-toggle` CỐ Ý không thêm** — nó là phần trang trí bên trong hàng, không nhận bàn phím.
Nút thật trong demo là cả hàng trigger `.facc`; vòng focus thuộc về `filter-section-header` ·
`filter-group-header` · `filter-tree-row`, cả ba đã có. Lý do này đã ghi vào mô tả component.

### 11.3 ⚠ Lệch vừa lộ ra: vòng focus của Figma KHÁC hẳn CSS demo — MÀU đã chốt, xem §12

Đo trên trang chạy (`skin-mt skin-li`):

| | Figma | Demo |
|---|---|---|
| Hình | vòng mảnh **1px**, **cách 3px** | dải **đặc 3px**, **sát mép** |
| Màu | `ring` → **#0A0A0A** | `--btn-focus-ring` → **#666666** |
| Cách vẽ | nét (stroke) | `box-shadow: 0 0 0 3px` |

Demo còn có tới **3 kiểu focus khác nhau**:
`.press:focus-visible` → dải 3px `#666666` · `.btn-o:focus-visible` → chỉ đậm viền sẵn có ·
`.btn-d:focus-visible` → dải 3px `#f8a9af`.

Việc Figma dùng NÉT thay cho bóng là **cố ý** — luật lớp nổi cấm bóng, và mô tả `action` đã ghi rõ
*"vòng ring đen 1px cách 3px, KHÔNG bóng"*. Nhưng **độ dày, khoảng cách và MÀU thì chưa ai chốt**,
và giờ nó đã nhân ra 14 component.

**Cần chốt:** giữ khuôn Figma (thì code sửa 3 chỗ CSS), hay kéo Figma về sát demo (đổi 14 component)?
Khuyến nghị giữ khuôn Figma về HÌNH (nét, không bóng — đúng luật) nhưng **đổi màu `ring` từ #0A0A0A
sang #666666** cho khớp token demo: một thay đổi biến, 14 component tự ăn theo.

### 11.4 Kiểm chứng

| Phép kiểm | Kết quả |
|---|---|
| 11 component có `_focus` | ✅ 18 variant mới |
| Vòng focus sai khuôn (geo · bind · nét · align) | **0** |
| Instance toàn file | **1.663**, hỏng liên kết **0** |
| Node tràn ra ngoài section | **0** |

### 11.5 Còn lại

`9.3` (thêm trục `size`+`kind` cho `control` → 30 variant) · `9.7` (cân lại trục cặp
`product-item-info`, chạm 53 instance) · và quyết định màu vòng focus ở §11.3.

---

## 12 · Đổi màu vòng focus — 04/09/2026

User chốt phương án khuyến nghị ở §11.3: **giữ hình vẽ bằng nét, kéo MÀU về khớp demo.**

**Cách làm — trỏ lại alias, không ghi hex thẳng:**

```
ring  →  gray/900  #0A0A0A      (trước)
ring  →  gray/500  #666666      (sau)
```

Giữ nguyên kiến trúc token 2 tầng (semantic → primitive). `gray/500` đã có sẵn trong bảng
Primitives và đúng bằng `--btn-focus-ring` / `--focus-ring` mà demo đang dùng ở `skin-mt skin-li`.

**Blast radius: 60 paint** — 59 nét `focus-ring` trong page `components` + 1 ô màu tài liệu trên
`Foundations · Color`. Tất cả tự đổi theo biến, không phải sửa tay chỗ nào.

**Đồng bộ luôn màu literal của 60 paint đó.** Paint đã bind biến vẫn giữ màu literal cũ trong object
(BẪY §7.1) — nếu để nguyên thì mọi lượt quét sau vẫn đọc ra `#0A0A0A` và báo sai. Nay literal cũng
là `#666666`.

**Mô tả 12 component đã cập nhật** — trong đó `action` sửa cụm *"vòng ring **đen** 1px cách 3px"*
(viết từ hồi ring còn là #0A0A0A) thành *"vòng ring 1px cách 3px, mực `ring` #666666"*.

### Kiểm chứng

| | |
|---|---|
| `ring` trỏ tới | `gray/500` = **#666666** |
| Paint đồng bộ literal | **60** |
| Mẫu đo lại (`action` · `filter-cat-chip` · `menu-row`) | literal `#666666`, bind `ring` ✓ |

### Còn lệch — nhưng là CỐ Ý

Hình vẽ vẫn khác demo: Figma **nét 1px cách 3px**, demo **dải đặc 3px sát mép** (`box-shadow`).
Dùng nét thay bóng là chủ ý vì luật lớp nổi cấm bóng. Độ dày và khoảng cách vẫn chưa ai chốt —
để ngỏ, đã ghi vào mô tả cả 14 component.

### 12.1 Hai chỗ lộ ra khi rà lại 55 vòng focus

**a · `collapsible` — tôi mở nhầm, đã hoàn tác.**
Bộ kiểm báo 4 vòng focus của `collapsible` đặt `@0,2` thay vì `−3,−3` nên tôi sửa theo khuôn chung.
**Sai.** Vòng đó **cố ý** chỉ ôm hàng **trigger** (cao 40 ở bậc `sm`, 52 ở bậc `md`), không ôm cả
component — vì phần nhận bàn phím là trigger, không phải cả panel. Ở variant `_open` mà ôm cả thân
thì vòng sẽ trùm luôn phần nội dung đang mở.

Đã trả về đúng số cũ (`@0,2` · 320×40 / 320×52) và **ghi cảnh báo vào mô tả component** để đợt sau
không ai "sửa giúp" lần nữa.

**b · Vòng focus LỖI vẫn chưa chốt màu.**
`control::_invalid-focus` dùng vòng đỏ `destructive` **#D62845**; demo dùng `--focus-ring-error` =
**#f8a9af** (`.btn-d:focus-visible`). Đúng cùng loại lệch với vòng focus thường — vòng thường đã kéo
về `#666666` ở §12, **vòng lỗi thì chưa**. Đã ghi vào mô tả `control`.

### 12.2 Trạng thái file sau tất cả

| | |
|---|---|
| Page | **7** (`components` gom hết component) |
| Component | **109** |
| Vòng focus trong file | **55** |
| Component thiếu mô tả | **16** — đều là shadcn đóng băng, đúng như thiết kế |
| Instance | **1.663**, hỏng liên kết **0** |

---

## 13 · Chạy nốt 9.3 và 9.7 — 04/09/2026

### 13.1 `control` — 5 → 30 variant

`state`(5) × `size=40|36` × `kind=text|search|password`.

**Bậc cao — chiều cao do ĐỆM quyết, không ghim cứng** (luật §8.2):

| Bậc | Đệm | Chữ | Ra | Dùng ở |
|---:|---|---|---:|---|
| **40** | 12/8 | `t-ui` 12/16 | 12+16+12 | đăng nhập · checkout · mã ưu đãi |
| **36** | 9/8 | `t-copy` 12/18 | 9+18+9 | ô tìm thương hiệu · 2 ô khoảng giá · ô form bậc `h-9` |

Đệm 9 là kết quả quy đổi `h-9` của demo: `(36 − 18) / 2`. Demo ghim chiều cao rồi canh giữa, Figma
đổi sang đệm.

**Loại (kind):**
- `text` — chỉ ô chữ.
- `search` — thêm instance `icon/search` 16 dẫn đầu, khe 8.
- `password` — đệm phải 36 chừa chỗ nút hiện/ẩn; instance **`icon/tr/eye` 16** (dựng mới hôm nay,
  bộ icon chưa có) đặt tuyệt đối cách mép phải 8, canh giữa dọc. Khớp `pr-9` + nút 32×32
  `data-pass-toggle` của demo.

Vòng `focus-ring` của 2 state focus đã resize theo từng bậc cao.

**Bậc 44 KHÔNG dựng** — demo có một ô 44 (đăng ký nhận tin ở footer) nhưng chỉ đúng 1 chỗ; đề xuất
kéo về 40 thay vì nuôi một bậc chết. **Chờ chốt.**

### 13.2 `product-item-info-desktop` — 4 → 12 variant, và một VI PHẠM LUẬT lộ ra

**Phát hiện khi soi:** 4 variant desktop sẵn có **đang hiện giá SALE** (special-price đỏ + chip -% +
giá gạch) mà không hề có trục `kind`. Nghĩa là **thẻ desktop cho hàng không sale không biểu diễn
được** — trong khi bản mobile đã đủ 3 kind từ lâu. Nay 4 variant cũ được đặt đúng tên `kind=sale`,
thêm `kind=default` và `kind=pre-order` → 12 variant.

Node **giữ nguyên tên qua mọi kind** (để override của instance không mất), chỉ đổi hiển thị:

| kind | `discount-chip` · `old-price` | `special-price` | `badge-label` |
|---|---|---|---|
| `sale` | hiện | mực `destructive` | hiện |
| `default` | ẩn | mực `foreground` | hiện |
| `pre-order` | ẩn | mực `foreground` | ẩn |

**⚠ VI PHẠM LUẬT ĐÃ SỬA — bản MOBILE.** Luật user chốt 03/09: **đặt trước KHÔNG có sale**. Nhưng cả
2 variant `kind=pre-order` của `product-item-info` (grid + rail) vẫn hiện `discount-chip` -% và
`old-price` gạch ngang, **y hệt `kind=sale`**. Đợt adapt 03/09 chỉ đụng phần badge, không đụng giá.
Nay đã ẩn cả hai và trả `special-price` về mực `foreground` — giữ nguyên con số giá, đúng tinh thần
*"bỏ off/was mà GIỮ giá"*.

Đây là thay đổi có ảnh hưởng hình ở variant đang dùng — nếu bạn muốn giữ nguyên thì nói, hoàn tác dễ.

**KHÔNG thêm trục `state` cho bản mobile — thu hẹp có chủ ý.** Đề xuất §9.7 định cho cả hai đủ
`kind × size × state`. Rà lại thì mobile không cần: không có hover trên cảm ứng, còn vòng focus thuộc
về **cả THẺ** (thẻ là một link), không thuộc khối thông tin bên trong — cùng lý lẽ đã dùng cho
`filter-toggle` ở §11.2. Desktop giữ `state=_hover` vì hover ở đó là thật.

### 13.3 Kiểm chứng

| | |
|---|---|
| Component | **110** (thêm `icon/tr/eye`) |
| `control` | **30 variant**, 0 lỗi kích thước · icon · vòng focus |
| `product-item-info-desktop` | **12 variant** |
| Instance toàn file | **1.737**, hỏng liên kết **0** |
| Node tràn ra ngoài section | **0** |

### 13.4 Toàn bộ §9 đã đóng

| Mục | Kết quả |
|---|---|
| 9.1 · 9.2 | ✅ thống nhất từ vựng chọn |
| 9.3 | ✅ 30 variant |
| 9.4 | ✅ + tìm ra lỗi `strokeAlign` |
| 9.5 | ⛔ **không làm** — chẩn đoán sai, khuôn "chấm + chữ" đã chốt 20/08 |
| 9.6 | ✅ 11 component, +18 variant |
| 9.7 | ✅ 12 variant + sửa vi phạm luật pre-order |
| 9.8 | ✅ đổi tên 2 trục |

**Còn chờ chốt:** bậc 44 của `control` · màu vòng focus **lỗi** (#D62845 hay #f8a9af) · hình vòng
focus (nét 1px cách 3px vs dải đặc 3px của demo) · `#FEF2F2` chưa có token · mode GM cho collection.

---

## 14 · Sổ lệch Figma ↔ code sau toàn bộ đợt 04/09

### 14.1 GIẢM lệch — Figma đuổi kịp code

| Thay đổi | Trước | Sau |
|---|---|---|
| 96 fill `#000000` → biến `foreground` | Figma đen đặc, code `#0a0a0a` | khớp |
| `ring` → `#666666` | Figma `#0A0A0A`, code `--btn-focus-ring: #666666` | khớp |
| `control` `strokeAlign` OUTSIDE→INSIDE | Figma lệch mô hình hộp | khớp `border-box` |
| pre-order bỏ chip -% + giá gạch | code bỏ từ 03/09, Figma còn sót | khớp |
| desktop thêm `kind=default`/`pre-order` | code có hàng không-sale, Figma không vẽ được | khớp |
| **`control kind=search` về khuôn gạch chân** | Figma dựng hộp + icon (SAI) | khớp rule skin |

### 14.2 Không chạm code

Gom page · 23 section · 21 mô tả · toàn bộ đổi tên trục và variant. Tên variant Figma không xuất
hiện ở đâu trong code → **0 lệch**.

### 14.3 Còn lệch

| Chỗ | Figma | Code | Loại |
|---|---|---|---|
| `toast` bóng | không bóng | `shadow-lg` | **cố ý** — luật lớp nổi cấm bóng |
| Vòng focus HÌNH | nét 1px cách 3px | dải đặc 3px sát mép | **cố ý** — cùng lý do |
| Vòng focus LỖI | `#D62845` | `#f8a9af` | chưa chốt |
| `control` bậc 36 | đệm 9/8 | `h-9` ghim cứng, đệm dọc 0 | cùng ra 36, khác mô hình |
| `control` bậc 44 | không dựng | có 1 ô (đăng ký nhận tin) | chờ chốt |
| `toast` cao | 38 | 36,5 | làm tròn line box |
| `icon/tr/check` · `icon/tr/eye` | component | svg inline | Figma đi trước |

Demo có **4** kiểu focus, không phải 3: `.press` · `.btn-o` · `.btn-d` · `.sort-opt`.

### 14.4 Đã sửa `control kind=search` — 10 variant

Dựng lần đầu tôi làm thành **hộp có viền + icon kính lúp dẫn đầu**. Sai. Đo lại thấy một rule cố ý
của skin:

```css
html.skin-mt .search-field, html.skin-mt #fBrandSearch {
  background: transparent; border-radius: 0;
  border-top: 0; border-right: 0; border-left: 0;
  border-bottom: 1px solid var(--general-primary);
  padding-left: 0; padding-right: 0;
}
```

Đo thật trên `#fBrandSearch`: **343×36 · viền đáy 1px `#0A0A0A` · nền trong suốt · đệm 0 · bo 0**.

Đã dựng lại cả 10 variant (5 state × 2 size): bỏ icon dẫn đầu · nền trong suốt · đệm trái/phải 0 ·
`strokeTopWeight/Right/Left = 0`, `strokeBottomWeight = 1` · mực viền bind `primary`. Hai state lỗi
giữ viền đáy đỏ `destructive`. Lý do và cảnh báo *"đừng khôi phục về kiểu hộp"* đã ghi vào mô tả
`control`.

### 14.5 Tài liệu đã đồng bộ

**`FIGMA-FILTER.md` — sửa** (spec đang dùng):
- Bảng 13 component cập nhật đủ biến thể mới, thêm cột số variant
- 4 chỗ gọi *"page `filter`"* → **section `filter`** trên page `components`
- Bổ sung khuôn vòng focus, lý do `filter-toggle` không có `_focus`, và spec `kind=search`

**`AUDIT-FIGMA-DS-2026-08-26.md` · `AUDIT-STATE-2026-08-26.md` — GIỮ NGUYÊN.** Hai file này là
báo cáo đề ngày 26/08, tức ghi chép lịch sử; sửa đi là làm sai lịch sử — cùng nguyên tắc dự án đã
áp cho comment ghi số đo site tham chiếu.

**`NAMING-MAGENTO.md` · `STYLE-RULES.md` — không cần sửa.** Chúng dùng `_active` làm ví dụ cho quy
tắc tiền tố `_`, mà `_active` vẫn còn (ở `action`, nghĩa *đang nhấn*).

---

## 15 · Rà bộ text style — 04/09/2026

Đối chiếu 9 text style trong Figma với bảng chuẩn **FONT-LIBRE-INTER.md §13.1** (3 tầng · 9 vai ·
1 ngoại lệ ghi danh), có đo lại trên demo đang chạy (`skin-mt skin-li`).

### 15.1 Phần ĐÚNG

| Phép kiểm | Kết quả |
|---|---|
| Phủ vai | **9 style ↔ 9 vai**, không thiếu vai nào *(`t-body` cố ý gánh 2 vai 14/20·400: brand ở card + nút hành động)* |
| Tracking 0,5px | **9/9 style** — khớp luật *"0,5px mọi vai"* |
| Mặt chữ | 24 = Libre Bodoni · mọi bậc dưới = Inter — đúng luật *"từ 18 trở lên Bodoni, dưới 18 Inter"* |
| Mô tả style | **9/9 có** |
| Độ phủ | **6.375 / 6.689 node = 95,3%** |
| Cỡ tự chế 11·13·15·22 | **0** — thang sạch |

### 15.2 Năm chỗ hở

**1 · `t-section` 18/24 là style CHẾT — 0 node dùng.**
Mô tả của chính nó ghi *"⚠ NGƯNG DÙNG"*, bảng chuẩn ghi *"bộ da này không còn phần tử nào ở 18"*, và
thang thật của skin-li là `10 · 12 · 14 · 16 · 24` — không có 18. Giữ lại thì ai mở panel style cũng
có thể lỡ dùng. → **Xoá**, hoặc chuyển sang một page lưu trữ.

**2 · Ba style 500 KHÔNG khoá chữ hoa — 34 node đang dùng sai.**
Bảng chuẩn: cả 3 vai 500 đều **Hoa = CÓ**. Đo demo xác nhận: `12px/16px · w500 · uppercase · ls 0,5`.
Nhưng `t-overlay-title` · `t-label-1` · `t-label` đều để `textCase = ORIGINAL` — không có gì chặn.

`t-label`: **596 hoa / 34 thường**. Trong 34:
- **4 hợp lệ** — "Từ" · "Đến" ở khối Khoảng giá (ngoại lệ đã ghi danh)
- **6 SAI THẬT** — nhãn accordion: `collapsible` ("Chi tiết mua hàng", "Gioa hàng & đổi trả") và 4
  nhãn PDP ("Mô tả sản phẩm", "Bảo quản sản phẩm", "Chính sách đổi trả", "Về thương hiệu Versace").
  Demo hiện chữ HOA, Figma đang chữ thường.
- **~24 là nhãn CHÚ THÍCH** trong các section trạng thái ("Sản phẩm", "Bộ size", "Mobile", "Desktop"…)
  — dùng style sản phẩm cho việc tài liệu.

`t-label-1`: **23 hoa / 12 thường** — phần lớn cũng là nhãn chú thích.
`t-overlay-title`: **15 hoa / 0 thường** ✓ sạch.

→ Đề xuất: đặt `textCase = UPPER` cho 3 style (khoá luật ngay trong style thay vì trông vào việc gõ
tay), và tách một style riêng cho nhãn chú thích tài liệu.

**3 · Thiếu style cho 2 vai ĐÃ GHI DANH.**
Bảng chuẩn có dòng ngoại lệ: `12/18` và `12/16` · Inter · **500 chữ thường** (cây danh mục
`#filterSheet`). Không style nào phủ. Đây chính là lý do **39 node** trong section `filter` + **8**
trong `collapsible` không gắn style. FIGMA-FILTER.md §2 treo việc này từ **27/08** với ghi chú
*"set tay + chờ chốt tên"* — vẫn chưa chốt.

**4 · `t-label-1` sai khuôn đặt tên.**
8 style kia đặt theo VAI (`t-title` · `t-copy` · `t-ui` · `t-body` · `t-micro` · `t-overlay-title` ·
`t-label`). Riêng cái này dùng hậu tố số thứ tự — không nói lên vai, lại làm `t-label` trông như cấp
thấp hơn. Trái NAMING-MAGENTO (thang chữ đặt tên theo vai).
→ Đề xuất `t-label-nav` (vai thật: nav ngành hàng + tiêu đề panel), hoặc đổi cặp thành
`t-label-lg` / `t-label`.

**5 · Bậc 40/50 chưa vào bảng — 8 node không style.**
Tiêu đề dải *"Gợi ý mua kèm"* ở PDP desktop là **40/50**, có ghi chú hẳn trong code
(`desktop.html:737` — *"Tiêu đề dải Gợi ý mua kèm (PDP#1): 40/50"*, adapt từ Figma node `108:3746`
hôm 28/08). Nhưng §13.1 khai thang skin-li là `10 · 12 · 14 · 16 · 24` — **không có 40**.
→ Hoặc ghi 40/50 vào bảng thành bậc trưng bày thứ 2 (tạo `t-display`), hoặc kéo tiêu đề về 24 cho
đúng luật *"một bậc trưng bày duy nhất"* (13.8).

### 15.3 314 node chưa gắn style — chia 2 nguyên nhân

| Nơi | Số | Nguyên nhân |
|---|---:|---|
| `PDP — trạng thái` 121 · `Menu` 67 · `PLP — trạng thái` 30 · `PDP` 24 · `screens` 8 · `Thêm vào giỏ` 5 · `PLP` 6 · `Cart` 1 | **262** | **Lỗ hổng pipeline** — bộ chuyển DOM→Figma không gắn text style khi dựng |
| `filter` 39 · `collapsible` 8 · `menu` 3 · `badge` 1 · `page-footer` 1 | **52** | Thuộc 2 vai ngoại lệ **chưa có style** (mục 3) |

Nghĩa là bộ style không phải thủ phạm chính: sửa mục 3 gỡ được 52 node, còn 262 node là việc của
bộ chuyển.

### 15.4 Lỗi lặt vặt tìm thấy khi rà

- **Typo trong component `collapsible`**: "**Gioa** hàng & đổi trả" → "Giao hàng & đổi trả"
- **2 node cỡ chữ trộn lẫn** (mixed font size) — đều ở tiêu đề "Gợi ý / Mua kèm"

---

## 16 · Đề xuất bộ text style đầy đủ — 04/09/2026

Đánh giá theo tiêu chuẩn **một bộ text style của design system** (không phải theo demo). Phạm vi
code: chỉ `skin-li` + cặp Libre Bodoni / Inter.

### 16.1 Chẩn: bộ hiện tại CHƯA đủ — thiếu 3 loại vai

| Loại vai | Hiện có | Bằng chứng |
|---|---|---|
| **Trang trí chữ** (gạch chân · gạch ngang) | **KHÔNG có style nào** — `textDecoration` của cả 9 style đều `NONE` | **371 node** đang override tay: 236 gạch ngang · 132 gạch chân · 3 trộn |
| **Chữ hoa** | **KHÔNG khoá** — `textCase` của cả 9 đều `ORIGINAL` | 34 node dùng style 500 với chữ thường |
| **Vai 500 chữ thường** (ngoại lệ §13.1) | Không có | 52 node không style |

Ngược lại, phần **rất tốt**: **0 node ghi đè cỡ / dòng / đậm** của style — thang chữ được tôn trọng
tuyệt đối. Và tracking 0,5px đủ 9/9.

**Chi tiết 371 node trang trí tay:**

| Trang trí | Đang mượn style | Số | Vai thật |
|---|---|---:|---|
| Gạch ngang | `t-ui` (12/16) | **209** | giá gốc |
| Gạch ngang | `t-copy` (12/18) | 27 | giá gốc — **lệch bậc** |
| Gạch chân | `t-copy` (12/18) | **90** | link |
| Gạch chân | `t-ui` (12/16) | 40 | link — **lệch bậc** |
| Gạch chân | không style | 2 | |

→ Hai vai (giá gốc · link) đang mỗi vai nằm ở **hai bậc chữ khác nhau**. Đó là bất nhất cần dọn,
không phải lý do để đẻ 4 style.

### 16.2 Bộ đề xuất — 15 style, 6 nhóm

Đặt tên **phẳng kebab, tiền tố nhóm** — giữ 1:1 với tên class CSS (đúng NAMING-MAGENTO), mà tiền tố
vẫn tự gom nhóm khi Figma xếp theo abc.

| Tên mới | Cỡ / dòng | Mặt | Đậm | Hoa | Trang trí | Từ đâu |
|---|---|---|---|---|---|---|
| `t-display-hero` | **40 / 50** | Libre Bodoni | 400 | không | – | **MỚI** — 8 node |
| `t-display-title` | 24 / 32 | Libre Bodoni | 400 | không | – | ← `t-title` |
| `t-label-overlay` | 16 / 24 | Inter | 500 | **KHOÁ HOA** | – | ← `t-overlay-title` |
| `t-label-nav` | 14 / 20 | Inter | 500 | **KHOÁ HOA** | – | ← `t-label-1` |
| `t-label-group` | 12 / 16 | Inter | 500 | **KHOÁ HOA** | – | ← `t-label` |
| `t-body-lead` | 14 / 20 | Inter | 400 | không | – | ← `t-body` |
| `t-body-multiline` | 12 / 18 | Inter | 400 | không | – | ← `t-copy` |
| `t-body-single` | 12 / 16 | Inter | 400 | không | – | ← `t-ui` |
| `t-body-micro` | 10 / 14 | Inter | 400 | không | – | ← `t-micro` |
| `t-filter-tree` | 12 / 18 | Inter | **500** | không | – | **MỚI** — ngoại lệ §13.1 |
| `t-filter-label` | 12 / 16 | Inter | **500** | không | – | **MỚI** — ngoại lệ §13.1 |
| `t-link` | 12 / 18 | Inter | 400 | không | **gạch chân** | **MỚI** — 90 node |
| `t-price-strike` | 12 / 16 | Inter | 400 | không | **gạch ngang** | **MỚI** — 209 node |
| `t-doc-label` | 12 / 16 | Inter | 500 | không | – | **MỚI** — nhãn chú thích trong file |
| `t-doc-note` | 12 / 18 | Inter | 400 | không | – | **MỚI** — ghi chú trong file |

Tracking **0,5px** cho cả 15 — giữ nguyên luật.

**Xoá `t-section` (18/24)** — 0 node dùng, mô tả tự ghi *"NGƯNG DÙNG"*, thang skin-li không có 18.

**Vì sao có nhóm `t-doc-*`:** hiện ~36 nhãn chú thích trong file (tên cụm ở các section trạng thái:
"Sản phẩm", "Bộ size", "Mobile", "Desktop"…) đang mượn `t-label` — style SẢN PHẨM. Tách ra thì khoá
được chữ hoa cho `t-label-group` mà không phá phần tài liệu, và người đọc phân biệt được ngay đâu là
UI đâu là chú thích.

**Vì sao chỉ 1 style cho mỗi vai trang trí:** `t-link` lấy bậc 12/18 (90 node, đa số) và
`t-price-strike` lấy 12/16 (209 node, đa số). 67 node còn lại đang ở bậc kia là **bất nhất cần dọn**
— kéo về bậc chuẩn, không đẻ thêm style.

### 16.3 Việc migrate

| Bước | Số node | Máy làm được? |
|---|---:|---|
| Đổi tên 8 style *(đổi tên KHÔNG làm mất liên kết)* | 6.375 giữ nguyên | ✅ |
| Xoá `t-section` | 0 | ✅ |
| Tạo 7 style mới | – | ✅ |
| Gắn `t-price-strike` · `t-link` cho node đang override tay | **299** | ✅ khớp theo cỡ + trang trí |
| Gắn `t-filter-*` cho 52 node ngoại lệ | 52 | ✅ |
| Gắn `t-display-hero` cho tiêu đề "Gợi ý mua kèm" | 8 | ✅ |
| Chuyển ~36 nhãn chú thích sang `t-doc-*` | 36 | ✅ |
| Khoá `textCase=UPPER` cho 3 style label | – | ✅ |
| Sửa 6 nhãn accordion về chữ HOA | 6 | ✅ |
| **Tự gắn style cho 262 node của pipeline** | 262 | ✅ khớp cỡ/dòng/đậm — an toàn vì **0 node ghi đè thang** |
| Dọn 67 node trang trí lệch bậc | 67 | ⚠ cần chốt bậc đúng |

Sau migrate: độ phủ style **95,3% → ~100%**, và 371 override tay về **0**.

### 16.4 Hai chỗ cần chốt trước khi gen

1. **`t-display-hero` 40/50** — §13.8 chốt *"một bậc trưng bày duy nhất 24/32, KHÔNG gác"* (phương án
   C). Bậc 40/50 hiện là **lệch có ghi danh**. Tạo style cho nó = chính thức hoá bậc thứ 2; không tạo
   = phải kéo tiêu đề "Gợi ý mua kèm" về 24/32. **Khuyến nghị tạo** — DS nên kiểm soát mọi thứ nó vẽ
   ra, còn hơn để 8 node trôi nổi không style.
2. **Tên nhóm** — phẳng `t-nhóm-vai` (khuyến nghị, 1:1 với class CSS) hay dùng `/` để Figma xếp thành
   thư mục (`Body/lead`). Đổi qua lại về sau không mất liên kết nên không phải quyết định một chiều.

---

## 17 · Đã gen bộ text style — 04/09/2026

Đề xuất §16 là **15 style**. Khi migrate thì đo ra thêm **3 vai thật** nữa → chốt **18 style**.

### 17.1 Bộ hoàn chỉnh — 18 style

| Tên | Cỡ/dòng | Mặt | Case | Trang trí | Node |
|---|---|---|---|---|---:|
| `t-display-hero` | 40/50 | Bodoni Regular | | | 8 |
| `t-display-title` | 24/32 | Bodoni Regular | | | 175 |
| `t-label-overlay` | 16/24 | Inter Medium | **UPPER** | | 18 |
| `t-label-nav` | 14/20 | Inter Medium | **UPPER** | | 31 |
| `t-label-group` | 12/16 | Inter Medium | **UPPER** | | 612 |
| `t-body-lead` | 14/20 | Inter Regular | | | 555 |
| `t-body-multiline` | 12/18 | Inter Regular | | | 2.461 |
| `t-body-single` | 12/16 | Inter Regular | | | 1.778 |
| `t-body-micro` | 10/14 | Inter Regular | | | 469 |
| `t-accordion-label` | 14/20 | Inter **Medium** | thường | | **58** |
| `t-filter-tree` | 12/18 | Inter **Medium** | thường | | 40 |
| `t-filter-label` | 12/16 | Inter **Medium** | thường | | 11 |
| `t-link` | 12/18 | Inter Regular | | **gạch chân** | 91 |
| `t-link-compact` | 12/16 | Inter Regular | | **gạch chân** | **40** |
| `t-price-strike` | 12/16 | Inter Regular | | **gạch ngang** | 218 |
| `t-size-oos` | 12/18 | Inter Regular | | **gạch ngang** | **18** |
| `t-doc-label` | 12/16 | Inter Medium | thường | | 78 |
| `t-doc-note` | 12/18 | Inter Regular | | | 21 |

Tracking **0,5px** cả 18. **`t-section` 18/24 đã xoá** (0 node dùng).

### 17.2 Ba vai phát hiện thêm khi migrate

**`t-accordion-label` 14/20 · 500 · chữ thường — 58 node.**
Đo demo (`skin-mt skin-li`, desktop, PDP mở): `[data-pdp-acc] .acc-trigger > span` ra
**`14px/20px · w500 · text-transform: none`**. Đây là **vai ngoại lệ thứ 3** mà FIGMA-FILTER.md §2
đã nhắc từ 27/08 (*"cùng loại việc với 14/20 · 500 của accordion PDP"*) nhưng chưa ai tạo style.

⚠ **Hai loại accordion khác nhau, đã đo cả hai:** accordion **chân trang / giỏ hàng** là
`12/16 · 500 · CHỮ HOA` (`t-label-group`); accordion **PDP** là `14/20 · 500 · chữ thường`
(`t-accordion-label`).

**`t-size-oos` 12/18 · gạch ngang — 18 node.** Nhãn size hết hàng ("XXL", "IT 43"). Ban đầu tôi gộp
nhầm với giá gốc; nhưng đây là **vai khác**: nhãn size theo số đo chip size (12/18 · 400), còn giá gốc
là 12/16. 9 node giá bị gán nhầm đã tách lại sang `t-price-strike`.

**`t-link-compact` 12/16 · gạch chân — 40 node.** Link một dòng ("Đổi quà" ở giỏ). Đúng cách bảng
chuẩn §13.1 phân đôi hai bậc 12: 12/18 cho chữ **có thể xuống dòng**, 12/16 cho chữ **chắc chắn một dòng**.

### 17.3 Ba thứ style giờ tự ép, không còn trông vào gõ tay

| | Trước | Sau |
|---|---|---|
| Chữ hoa | 0 style khoá · **100 node lọt lưới chữ thường** | 3 style khoá `textCase=UPPER` |
| Gạch chân / gạch ngang | 0 style mang · **371 node override tay** | 4 style mang sẵn · **0 override** |
| Vai 500 chữ thường | không có style · 52+58 node trôi nổi | 3 style riêng (`t-accordion-label` · `t-filter-tree` · `t-filter-label`) |

### 17.4 Kết quả migrate

| | Trước | Sau |
|---|---:|---:|
| Số style | 9 *(1 chết)* | **18** *(0 chết)* |
| Node có style | 6.375 | **6.682** |
| Độ phủ | 95,3% | **99,9%** |
| Node override thuộc tính style | 371 | **0** |
| Style không ai dùng | 1 | **0** |

Kèm: sửa typo **"Gioa hàng & đổi trả" → "Giao hàng & đổi trả"**, và 2 nhãn ví dụ trong khung minh hoạ
`collapsible` đổi sang chữ hoa cho khớp cả demo lẫn component (16/16 variant của nó vốn đã đúng
chữ hoa và đúng bậc: `size=sm` 12/16 · `size=md` 14/20).

### 17.5 Bảy node còn lại — đều là ca lẻ, cần bạn quyết

| Node | Vấn đề | Gợi ý |
|---|---|---|
| 3 × "[PRE-ORDER] Giày sandal…" | line-height **trộn** trong một node | tách tiền tố `[PRE-ORDER]` thành node riêng |
| 2 × "Gợi ý / Mua kèm" | cỡ chữ **trộn** trong một node | tách 2 dòng thành 2 node → gán `t-display-hero` |
| 1 × "Không có sản phẩm nào…" | **16/24 Regular** — không vai nào có | hạ về `t-body-lead` 14/20 hoặc `t-body-multiline` 12/18 |
| 1 × "Xóa tất cả bộ lọc" | **14/20 gạch chân** — link ở bậc nút | tạo `t-link-action` 14/20, hoặc hạ về `t-link` |

---

## 18 · Gộp lại theo lệnh user — 9 style · 04/09/2026

Lệnh: *"upper case cho nhập tay là được, không cần tạo text style cho nhiều đâu — cùng font size
font weight là được"*. Áp nguyên tắc **một style cho mỗi cặp (cỡ, đậm)**; chữ hoa và gạch chân /
gạch ngang để NODE tự mang.

### 18.1 Bộ cuối — 9 style, đối xứng label ↔ body

| | **Inter 500 — `label`** | **Inter 400 — `body`** |
|---|---|---|
| 16/24 | `t-label-overlay` · 18 | — |
| 14/20 | `t-label-lead` · 89 | `t-body-lead` · 555 |
| 12/18 | `t-label-multiline` · 39 | `t-body-multiline` · 2.592 |
| 12/16 | `t-label-single` · 701 | `t-body-single` · 2.036 |
| 10/14 | — | `t-body-micro` · 469 |

Cộng `t-display-title` **24/32 · Libre Bodoni 400** · 185 node.
Tracking **0,5px** cả 9. Quy tắc tên: **`label` = Medium 500 · `body` = Regular 400**, hậu tố nói vai
theo bậc dòng.

### 18.2 Ba style đổi tên, chín style xoá

| Xoá | Gộp vào |
|---|---|
| `t-accordion-label` 14/20 · 500 · thường | `t-label-lead` *(hoa/thường do node)* |
| `t-filter-label` · `t-doc-label` 12/16 · 500 | `t-label-single` |
| `t-link` 12/18 · gạch chân · `t-size-oos` 12/18 · gạch ngang · `t-doc-note` | `t-body-multiline` *(trang trí do node)* |
| `t-link-compact` 12/16 · gạch chân · `t-price-strike` 12/16 · gạch ngang | `t-body-single` |
| `t-display-hero` 40/50 | `t-display-title` — **xem 18.3** |
| `t-section` 18/24 | — *(đã xoá ở §17, 0 node dùng)* |

Đổi tên cho đối xứng: `t-label-nav` → **`t-label-lead`** · `t-filter-tree` → **`t-label-multiline`** ·
`t-label-group` → **`t-label-single`**. Ba style label đã **mở khoá `textCase` về ORIGINAL** — bắt
buộc, vì các node 500-chữ-thường vừa gộp vào đang bị ép hoa sai.

### 18.3 "Gợi ý mua kèm": không cần tách — 40/50 vốn KHÔNG tồn tại

User bảo tách node ra rồi gắn style. Đo lại demo trước khi tách thì ra kết quả khác hẳn:

> `skin-mt skin-li`, desktop, PDP mở → phần tử "Gợi ý mua kèm" render **`24px/32px · w400 · Libre Bodoni`**.

Nghĩa là **bậc 40/50 không tồn tại trong bộ da này**. Ghi chú *"Tiêu đề dải Gợi ý mua kèm (PDP#1):
40/50"* ở `desktop.html:737` là số **trước khi skin-li chuẩn hoá**. Và 2 node "trộn cỡ" hoá ra là
`Gợi ý` 32/50 + `Mua kèm` 48/50 — cũng đều là số cũ.

→ Đã đưa **cả 10 node** (8 cái 40/50 + 2 cái 32+48) về `t-display-title` 24/32. **Không phải tách
node**, và `t-display-hero` vừa tạo ở §17 đã xoá.

Kết quả phụ: điều này **xác nhận luật §13.8** — bộ da đúng là chỉ có MỘT bậc trưng bày.

### 18.4 Một sự cố và cách vá

Lượt gộp đầu **timeout ở giây thứ 30 khi đang chạy dở**: nó đã gán style xong (thao tác này xoá
trang trí của node) nhưng **chưa kịp trả lại gạch chân cho 52 node**.

Cách vá: gom tập chuỗi ký tự của các node CÒN gạch chân, rồi trả gạch chân cho node cùng chuỗi.
Bốn chuỗi đều là nhãn link không nhập nhằng — *"Chính sách đổi trả"* · *"Chính sách bảo mật"* ·
*"Điều khoản và điều kiện"* · *"Xem thêm"*. Khôi phục **55 node**; tổng gạch chân 12/18 nay là **94**
so với **91** ban đầu — dư 3, đều rơi đúng 4 chuỗi trên nên coi như đủ.

*Bài học: `setTextStyleIdAsync` GHI ĐÈ `textDecoration` của node. Muốn giữ thì phải đọc trước, gán
lại sau — và đừng chạy vòng lặp hàng trăm node trong một lệnh 30 giây.*

### 18.5 Kết quả

| | §17 (18 style) | §18 (9 style) |
|---|---:|---:|
| Số style | 18 | **9** |
| Style chết | 0 | **0** |
| Node có style | 6.682 | **6.688** |
| Độ phủ | 99,9% | **99,98%** |
| Node ghi đè cỡ/dòng | 0 | **0** |

Trang trí nay nằm ở node: gạch ngang **236** (218 giá gốc + 18 size hết hàng) · gạch chân **134**
(94 + 40).

### 18.6 Đã đóng nốt — độ phủ 100%

**Node 16/24 kéo về 12/18** (`t-body-multiline`) theo lệnh user. Kéo thì lộ ra **2 node cùng câu chữ
đó đang ở 12/16** — cùng một thông điệp "Không có sản phẩm nào khớp bộ lọc" mà nằm hai bậc. Component
`empty-state` của chính dự án dùng 12/18, và câu này có thể xuống dòng ở khổ 375 nên 12/18 mới đúng
vai *("chữ có thể xuống dòng")*. Đã kéo cả 3 về một bậc.

**Một sự cố nữa và cách vá.** Điều kiện bỏ qua trong lệnh gán (`typeof textStyleId === 'string'`)
KHÔNG loại được node có style **TRỘN** — `figma.mixed` là một `symbol`, truthy nhưng không phải
string. Hậu quả: lệnh cán luôn 3 node `"[PRE-ORDER] Giày sandal…"`, làm phẳng cấu trúc 2-style của
chúng. Đã hoàn tác bằng `setRangeTextStyleIdAsync(0, 11, t-label-single)` — cả 3 về đúng
`["[PRE-ORDER]"] 12/16 Medium` + `[" Giày sandal…"] 12/18 Regular`.

*Bài học: muốn bỏ qua node style trộn thì phải kiểm `typeof sid !== 'string'`, đừng chỉ kiểm truthy.*

### 18.7 Trạng thái cuối

| | |
|---|---:|
| Text style | **9**, 0 style chết |
| Text node | **6.706** |
| Có style | 6.703 một style + 3 **trộn có chủ đích** *(`[PRE-ORDER]` = nhãn 12/16 + tên 12/18)* |
| Chưa có style | **0** |
| **Độ phủ** | **100,00%** |
| Node ghi đè cỡ/dòng của style | **0** |

| Style | Cỡ/dòng | Mặt | Node |
|---|---|---|---:|
| `t-display-title` | 24/32 | Libre Bodoni 400 | 185 |
| `t-label-overlay` | 16/24 | Inter 500 | 18 |
| `t-label-lead` | 14/20 | Inter 500 | 89 |
| `t-body-lead` | 14/20 | Inter 400 | 556 |
| `t-label-multiline` | 12/18 | Inter 500 | 39 |
| `t-body-multiline` | 12/18 | Inter 400 | 2.610 |
| `t-label-single` | 12/16 | Inter 500 | 701 |
| `t-body-single` | 12/16 | Inter 400 | 2.036 |
| `t-body-micro` | 10/14 | Inter 400 | 469 |

### 18.8 Việc parity còn lại (không thuộc bộ style)

**3 node `"[PRE-ORDER] Giày sandal…"`** giữ khuôn cũ: code đã **bỏ tiền tố "Pre-order ·" từ 03/09**,
thay bằng badge đứng trước tên. Đây là việc đồng bộ demo, không phải việc của text style.
