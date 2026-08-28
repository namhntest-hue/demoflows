# Trang PLP + PDP dựng vào Figma — 26/08/2026

> **CẬP NHẬT CÙNG NGÀY (đợt 2, buổi tối) — xem Phần 9:** 3 page `screen — *` đã GỘP về một page
> **`screens`**, và các khối lặp (header · footer · thẻ sản phẩm · khối cam kết) đã RÁP thành
> component instance. Phần 1–8 dưới đây giữ nguyên là hồ sơ đợt dựng buổi chiều.

Đích: file **Test agent** (`XFfjTNMuPfaTeZvdbVIO2F`), **2 page MỚI** chèn theo thứ tự phễu
mua hàng ngay trước `screen — cart`:

| Page | Section | Khối |
|---|---|---|
| **`screen — plp`** | `PLP — mobile 375 + desktop 1440` | `PLP / mobile 375` (375×4845) · `[doc] PLP · mobile 375` · `PLP / desktop 1440` (1440×3621) · `[doc] PLP · desktop 1440` |
| **`screen — pdp`** | `PDP — mobile 375 + desktop 1440` | `PDP / mobile 375` (375×3563) · `[doc] PDP · mobile 375` · `PDP / desktop 1440` (1440×4318) · `[doc] PDP · desktop 1440` |

Nguồn đo: **`index.html` @375** và **`desktop.html` @1440**, bộ da vào-trang **`skin-mt skin-li`**,
màn `plp` (mặc định router) và `pdp` (sản phẩm #1 — Đầm lụa mini Broken Jewels, hàng **pre-order**).
Mọi con số là **computed style đo trên trang đang chạy**. Bố cục section + khuôn `[doc]` theo đúng
tiền lệ trang Cart (FIGMA-CART.md).

---

## 1. Pipeline lượt này (khác trang Cart)

- Dựng lại cầu nối cổng **9225** (bridge.py phiên cũ đã bị dọn; `.claude/launch.json` mục
  `figma-bridge` đã trỏ sang scratchpad phiên `5af4017c…`). Cầu nối phục vụ luôn `D:\doc` nên
  demo chạy thẳng trên 9225 — trang và endpoint `/save` cùng origin.
- **Extractor v3** (DOM→JSON, ~370–450 node/màn) xử đủ các bẫy cũ: freeze `.rise/.reveal` bằng
  `<style>` chèn trước khi đo · ép `scrollbar-width:none` (desktop mới đủ 1440) · tách dòng bằng
  `getClientRects()` cho thẻ trộn nội dung · mang vùng cắt tổ tiên (accordion đóng height 0 tự rụng)
  · bọc frame `clipsContent` cho `line-clamp`. Bẫy MỚI xử thêm:
  1. **Overlay đóng phải loại theo ID** — 16 sheet/drawer/FAB demo (`#filterSheet`, `#menuSheet`,
     `#settingsFab`, `#cookieBar`/`#cookieGate`…) vẫn có toạ độ thật (translate off-screen) và
     **thẻ cookie tự mở lại sau 700ms mỗi lần load** nên không thể "đóng rồi đo". Giữ lại duy nhất
     `#pdpStickyCta`.
  2. **Pseudo-element có sơn phải dựng**: kẻ hairline dưới band nav desktop (`#dkNavBand::after`)
     và **gạch active 2px** dưới nút ngành hàng "NAM" (`.dk-dept::after`, 2 nút kia opacity 0).
     Gạch hover của nav item opacity 0 lúc nghỉ — không dựng.
  3. `<img>` không có `src` → placeholder xám + cảnh báo (lượt đo cuối không còn cái nào).
- **Builder** trong plugin: dựng frame tuyệt đối → **thử auto-layout từng frame rồi TỰ KIỂM lệch**
  (drift > 1,6px hoặc sai khổ → revert về absolute). Bài học: phải `resize()` lại đúng khổ **sau khi**
  bật `layoutMode` rồi mới đo drift — không thì frame hug về size con và bị revert oan (103 → 18).
- **ĐÍNH CHÍNH ghi chú cũ**: plugin **fetch() ĐƯỢC localhost 9223–9232** (đúng như manifest);
  chỉ `figma.createImageAsync` là không chạy. Nhờ vậy JSON + **ảnh gốc** đi thẳng qua cầu nối —
  không phải nhúng base64 JPEG nén như trang Cart.

## 2. Kết quả bind (cả 4 khối)

| | PLP mobile | PLP desktop | PDP mobile | PDP desktop |
|---|---|---|---|---|
| Khung | 375×4845 | 1440×3621 | 375×3563 | 1440×4318 |
| Node | 395 | 436 | 279 | 450 |
| Mực chữ bind | **97/97** | **133/133** | **95/95** | **162/162** |
| Kẻ bind | **28/28** | **22/22** | **23/23** | **17/17** |
| Nền bind | 77 (14 ngoại lệ*) | 66 (14 ngoại lệ*) | 40 (3 ngoại lệ*) | 52 (10 ngoại lệ*) |
| Text style | **97/97** | **133/133** | 91/95 (4 accordion**) | 158/162 (4 accordion**) |
| Đệm/gap bind | 370 | 405 | 293 | 520 |
| Auto-layout | 97 (revert 18) | 98 (revert 29) | 70 (revert 12) | 113 (revert 13) |
| radius/full | 32 | 25 | 5 | 1 |
| Ảnh | 20 | +brand-hero (tái dùng hash) | 4 (tái dùng) | 10 (+p1-2/3/4) |

\* Ngoại lệ nền CÓ CHỦ ĐÍCH, không phải màu chết — xem mục 4.
\** Ngoại lệ chữ ghi danh 13.11 — xem mục 5.

## 3. Chữ — khớp thang 13.1, không lòi tổ hợp lạ

Tổ hợp đo được trên cả 4 màn (sau khi loại overlay đóng) đều nằm trong thang:

| Tổ hợp | Style gắn | Ghi chú |
|---|---|---|
| 24/32 · Libre Bodoni | `t-title` | chỉ có ở PDP (brand + tiêu đề dải gợi ý); **PLP không có bậc Bodoni** — tiêu đề trang là wordmark ảnh `brand-logo.png`, đúng demo |
| 12/18 · Inter 400 | `t-copy` | đông nhất mọi màn |
| 12/16 · Inter 400 | `t-ui` | |
| 14/20 · Inter 400 | `t-body` | nút hành động + brand trên thẻ |
| 12/16 · Inter 500 · HOA | `t-label` | HOA **gõ tay vào node** theo chốt 26/08; gồm cả 3 nút ngành hàng + 8 mục nav desktop |
| 10/14 · Inter 400 | `t-micro` | |
| **14/20 · Inter 500 · thường** | **KHÔNG GẮN** | 4 node nhãn accordion PDP mỗi bản — ngoại lệ 13.11, xem mục 5 |

Giá gốc gạch ngang: gắn style xong set lại `textDecoration = STRIKETHROUGH` (style không mang gạch).

## 4. Màu — ngoại lệ có chủ đích (không quy về token)

1. **Chip giảm giá nền `#fef2f2`** (6+6+3+10 fill) — ngoại lệ ghi danh RIÊNG skin-li
   (STYLE-RULES §2.2, khối skin-li mục 9). Bộ biến **chưa có nấc này** → để raw. Nếu muốn bind
   100% như Cart thì phải thêm biến (đề xuất `Primitives/red/50` #fef2f2 + `Color/destructive-soft`
   alias) — **chờ chốt tên**, chưa tự tạo.
2. **Chấm màu sắc trên thẻ PLP** (7 fill/bản: #a5d48c · #b9dfc6 · #f5d6e0 · #c9a94b · #8a7040 ·
   #a06a3f) — màu NỘI DUNG sản phẩm, cùng loại wordmark/icon cờ Anh bên Cart.
3. **`#f1f1f1`** (1 fill/bản PLP) — nền CDN nướng sẵn quanh ảnh hero thương hiệu (đáp án câu #02
   brief), giữ đúng màu ảnh.
4. Chấm ngăn cách `#666666` ở PLP mobile đã bind `muted-foreground` (vá tay sau lượt dựng).

## 5. Lệch có ghi danh & lỗi demo phát hiện thêm

| # | Chỗ | Demo | Bản Figma | Việc cho demo |
|---|---|---|---|---|
| 1 | Nút cuối lưới PLP, `index.html` | **"Show more"** — tiếng Anh giữa bản tiếng Việt (desktop cùng chỗ là "Xem thêm") | dựng **"Xem thêm"** theo ý đồ | sửa chuỗi/i18n `#showMore` trong `index.html` |
| 2 | Dòng bản quyền, `desktop.html` (cả PLP + PDP) | **HOA TOÀN BỘ** trong DOM (lỗi đã ghi từ FIGMA-CART 10.5, chưa sửa) | dựng theo luật: "© Copyright 2026 DAFC — Công Ty Cổ Phần Thời trang & Mỹ phẩm Duy Anh" | sửa chuỗi trong `desktop.html` |
| 3 | Nhãn 4 accordion PDP (cả 2 bản) | 14/20 · 500 · chữ thường — ngoại lệ ghi danh 13.11 | **set tay, chưa gắn style** (8 node tổng). `t-label-1` là Medium **HOA gõ tay**; mô tả style bảo vai này "dùng t-body" nhưng `t-body` là **Regular** — mâu thuẫn cần chốt | chốt: thêm style riêng (vd `t-body-strong`) hay sửa mô tả `t-label-1` |

## 6. Trạng thái dựng

- PLP: mọi lớp nổi (panel bộ lọc, sắp xếp, menu…) **ĐÓNG — không dựng**; đủ 16 thẻ + badge
  Pre-order / New Season / La Vacanza; desktop có progress "16 trong 152 sản phẩm".
- PDP mobile: gallery dựng **slide 1/5** (slide sau nằm ngoài khung cuộn, cắt bằng `clipsContent`);
  size **IT 39 đang chọn**, IT 43/IT 44 hết hàng (mực nhạt + gạch); 4 accordion ĐÓNG;
  **sticky CTA "Đặt trước"** ở vị trí nghỉ đáy trang, nền gradient trắng 0→95→100
  (GRADIENT_LINEAR, mất blur của `backdrop-filter` — chấp nhận như Cart).
- PDP desktop: gallery **lưới 2 cột 5 ảnh** (2×2 + 1 lớn), **không sticky CTA đáy** (CTA nằm trong
  cột mua hàng bên phải); 3 dải gợi ý (mua kèm · đã xem gần đây · tương tự) mỗi dải 5 thẻ.

## 7. Đệm ngoài thang Spacing (để chốt cùng đợt với Cart)

- Nấc THẬT ngoài thang: **2** (khe vi mô giá↔chip, ~60 chỗ cả 4 màn) · **6** (~23) ·
  **14** (8 chỗ, gap icon↔chữ khối cam kết — trùng nấc chờ chốt bên Cart).
- Nấc "đệm cộng kẻ": 0,8 · 8,8 · 10,8 · 32,8 — là padding CSS **cộng border 0,8** vì stroke
  Figma không đẩy nội dung như border CSS. Không phải nấc thiết kế mới, không cần biến.

## 8. Việc còn mở

1. **Chốt cách gắn style cho 14/20 · Medium · chữ thường** (8 node accordion PDP) — mục 5.3.
2. **Chốt biến cho `#fef2f2`** (chip -%) nếu muốn 100% như Cart — mục 4.1.
3. Nấc spacing **2 · 6 · 14** ngoài thang (chung số phận với 2 · 6 · 10 · 14 · 36 · 80 bên Cart).
4. Sửa 2 lỗi demo: `Show more` (index.html) + bản quyền HOA (desktop.html).
5. ~~**Chưa ráp component**~~ — **ĐÃ LÀM ở đợt 2 cùng ngày**, xem Phần 9.
6. Ảnh nạp **nguyên gốc** từ `assets/` (không còn phải thay như ghi chú Cart) — nhưng Cart vẫn đang
   dùng JPEG nén nhúng; muốn đồng bộ thì thay fill ảnh Cart bằng hash ảnh gốc đã có sẵn trong file.

---

## 9. Đợt 2 (26/08 tối) — gộp page + ráp component

Lệnh user: *"các trang screen hãy gộp vô chung 1 page nhé, những thứ lặp đi lặp lại hãy dùng
component"*.

### 9.1 Gộp page

3 page `screen — plp` / `screen — pdp` / `screen — cart` gộp về **MỘT page `screens`** (đặt đúng
vị trí cũ trong danh sách page). 3 section giữ nguyên id, xếp ngang theo phễu:
**PLP @x0 → PDP @x3220 → Cart @x6440**, khe 200. Ba page cũ đã xoá.

### 9.2 Nguyên tắc ráp

**Dùng lại component sẵn có trong DS, không đẻ nguồn chân lý thứ hai.** Mỗi swap đều
đối chiếu khổ + toạ độ dòng giá với bản raw đo được (lệch >1,5–2,5px thì giữ raw và ghi sổ).
Kết quả: **73 instance**, cả 4 khung màn giữ đúng từng px (4845 · 3621 · 3563 · 4318; Cart
3333 · 2521).

| Khối lặp | Component | Số instance |
|---|---|---|
| Header mobile/desktop | `page-header-mobile` · `page-header-desktop` | 7 (3 màn × 2 khổ, tính cả bản desktop Cart nhân đôi) |
| Footer mobile/desktop | `page-footer-mobile` · `page-footer-desktop` | 7 — PLP/PDP **ẩn layer newsletter + divider** → tự ra đúng 847,4 / 414; Cart đủ newsletter 1032,4 / 599 |
| Thẻ sản phẩm | `product-item-info` (mobile) · `product-item-info-desktop` | **53** — PLP lưới 16+16 (size=grid), PDP dải gợi ý 6+15 (size=rail), override ảnh/brand/tên/giá/chip/badge/chấm màu theo từng thẻ |
| Khối cam kết dịch vụ | `service-promises-mobile` · `-desktop` — **component MỚI**, page mới `service-promises` (dựng từ khối đo của PDP) | 6 (PDP + Cart × 2 khổ) |

### 9.3 Component được sửa/nâng cấp trong lúc ráp (ghi cả vào [doc] từng page)

1. **`product-item-info` + `-desktop`**: thêm trục variant **`size=grid|rail`** (Figma không cho
   resize con của instance nên khổ rail phải là variant riêng: mobile 170×334,7 · desktop
   272×470,7). Chip **-%** từ text trần 10/14 thành **pill nền `#fef2f2` chữ 12/16 t-ui
   destructive** (đúng ngoại lệ §2.2 skin-li) — thẻ grid cao thêm 2px thành **374,1 / 590 = khớp
   số đo demo**. Thêm `badge-stack` (New Season · La Vacanza) ẩn mặc định + `badge-label` ẩn cho
   desktop + swatch lên 3 slot (2 ẩn). Photo/details co giãn ngang.
2. **`page-footer-mobile/desktop` — 2 LỖI NGỦ**: tiêu đề newsletter bản mobile bị **cắt chuỗi còn
   29 ký tự** nên kẹt 1 dòng (nay đủ chuỗi, t-title 24/32 xuống 2 dòng — component 1000,4 → 1032,4
   khớp Cart); **fill ảnh logo DAFC bị tắt visible** ở cả 2 bản (nay bật).
3. **`page-header-desktop`**: bổ sung kẻ hairline border-subtle dưới band chính + **gạch active
   2px primary** dưới nút ngành hàng đang mở (`active-underline`, demo mở NAM) — 2 chi tiết đo
   được từ pseudo-element mà component thiếu.

### 9.4 Giữ raw có chủ đích (ghi ở [doc] từng màn)

- **Hàng giỏ + nhóm quà của Cart**: `cart-row`/`cart-gift` có sẵn trong DS nhưng khổ component là
  **ruột 327** (hàng đo 375 gồm đệm + kẻ), bản desktop cần cột nội dung co giãn 761, và hàng giỏ
  mang lệch-có-chủ-đích "giá 1 dòng" — ráp cần đối chiếu riêng, **để đợt sau**.
- Promo strip mobile (32px), breadcrumb, khối thương hiệu PLP, thanh bộ lọc, gallery + khối mua
  hàng PDP, accordion, khung dải gợi ý — chưa có component tương ứng.

### 9.5 Sự cố đã xử trong đợt

- Lượt swap đầu có nhánh lỗi **không gỡ instance đã chèn** → 14 instance mồ côi nằm cạnh bản raw;
  đã dọn bằng khử trùng lặp theo hash ảnh, lưới về đúng 16 thẻ, khung không đổi px nào.
- 6 thẻ cuối lưới PLP mobile là bản **compact 352,1** (thẻ gợi ý x-sell, không swatch) — instance
  resize thấp hơn master 22px, khớp đo.
- Node con dạng FILL trong auto-layout **tự co còn 1px khi chèn sibling** → phép đối chiếu phải
  chốt số đo raw TRƯỚC khi chèn instance (bug "dw1391").

---

## 10. Đợt 3 (28/08) — kéo bản PDP#1 desktop MỚI vào Figma

Lệnh user: *"kéo bản pdp 1 bạn vừa tạo vào figma giúp tôi, lưu ý hãy sử dụng component sát nhất có thể"*
(kèm link node `72-4482` = chính section `PDP — mobile 375 + desktop 1440`).

**Không ghi đè bản 26/08.** Frame mới `PDP / desktop 1440 · 28-08` đặt cạnh phải trong cùng section
(`@3020,80`), kèm `[doc] PDP · desktop 1440 · 28-08` (`@3020,3638`). Section tự nới 3020 → **4540**.
Giữ bản cũ để đối chiếu — user muốn dọn thì xoá 1 frame.

### 10.1 Vì sao khung thấp hơn bản cũ

**1440×3478** (bản 26/08: 4318). Ba việc của 27–28/08 rút chiều cao: bỏ dải *Đã xem gần đây* ·
*Gợi ý mua kèm* đổi từ dải 5 thẻ sang khuôn **chữ-một-bên + 4 ảnh** · nhịp dọc quanh 2 kẻ ngăn về
đều **32** (trước 32 · 24 · 64 · 24 · 32).

### 10.2 Pipeline — tái dùng nguyên bộ của 26/08, không dựng lại

`bridge.py` @9225 (phục vụ luôn `D:\doc` nên trang và `/save` cùng origin) → `extractor.js` chạy
trong trang (`__figxRun('pdpd2808')`) → `builder.js` nạp vào plugin bằng **`new Function(src)`**
(fetch từ `/js/…`, không phải dán 14,5 KB vào tool call) → `__figxBuild(...)`.

| | Số |
|---|---|
| Node trích / dựng | 335 / 353 |
| Mực chữ bind | **132/132** · kẻ **19/19** · nền 41 (6 ngoại lệ `#fef2f2`) |
| Text style gắn | **127/132** |
| Đệm bind | 391 |
| Auto-layout | 87 (revert 13) |
| Ảnh | 10 (0 lỗi) · dùng lại hash |
| Thời gian dựng | 3,2 s |

**2 node chữ không gắn style** (cả hai có lý do): 4 nhãn accordion 14/20 Medium — ngoại lệ 13.11 như
2 bản trước; **1 tiêu đề 40/50 Libre Bodoni** — cỡ NGOÀI thang dự án (12/14/16/18/24/32/48) và ngoài
thang trưng bày F2 (24/32 · T0 32/40 · T00 48/60), user chốt 28/08, đã ghi danh ngoại lệ trong code.

### 10.3 Ráp component — 11 instance

| Khối | Component | Khớp |
|---|---|---|
| Header | `page-header-desktop` | 161 = 161 · **0px** |
| Chân trang | `page-footer-desktop` (ẩn `newsletter` + `divider`) | 414 = 414 · **0px** |
| Cam kết dịch vụ | `service-promises-desktop` | 1392×156 · **0px** |
| 4 thẻ *Sản phẩm tương tự* | `product-item-info-desktop` **size=rail** | 272×470,7 · **0px** |
| 4 thẻ *Gợi ý mua kèm* | **size=look — VARIANT MỚI** 265,5×462 | xem 10.4 |

### 10.4 Variant mới `size=look` — vì sao phải thêm

Thẻ của dải mới rộng **265,5** (lưới 4 cột trong 1086, khe 8) và cao **462** (ảnh 354 + info 108).
Instance của `size=rail` resize được BỀ NGANG (photo FILL + ảnh STRETCH) nhưng **không hạ được chiều
cao ảnh** 363 → 354: `photo.resize()` và `img.resize()` đều **thất bại im lặng** trên con của
instance — đúng bẫy đã ghi 26/08. Nên thêm variant, y như lý do đã thêm `size=rail`; trục `size` nay
là **grid | rail | look**. Thêm variant là phép CỘNG, 53 instance cũ không đổi gì.

**2 thẻ không giảm giá tự nhiên cao 460, không phải 462** — hàng giá chỉ 18 (không có chip -%) thay
vì 20. Demo ra 462 vì **CSS grid kéo giãn** thẻ theo hàng, không phải vì thẻ cao 462. Hàng vẫn 462
nên khung không đổi px nào. Dòng giá gạch của 2 thẻ đó **giữ chỗ** bằng nbsp + `opacity 0` — đúng
cách demo dùng `class="… invisible"` với `&nbsp;`.

### 10.5 Giữ raw có chủ đích — 1 thẻ

Thẻ **pre-order (Đầm lụa)**: từ 28/08 badge *"Đặt trước"* nằm **INLINE trước tên**, còn component
vẫn để `badge-label` **đè ảnh** (khuôn trước 28/08). Ráp vào là nói sai thiết kế hiện tại, nên giữ
raw. Muốn ráp thì phải thêm slot `badge-inline` vào `name-block` của `product-item-info-desktop` —
**chờ chốt**, vì việc đó bọc lại node `product-item-name` và đụng 53 instance sẵn có.

Chưa có component (giữ raw như 2 đợt trước): breadcrumb · gallery lưới · cột mua hàng · accordion ·
khối chữ của dải gợi ý.

### 10.6 Sự cố đã xử trong đợt

**Footer nhảy lên đỉnh frame.** `div[scroller]` là khung **tuyệt đối** (`layoutMode: NONE`) nên thứ
tự trong `children` KHÔNG quyết định vị trí — instance footer giữ `y:0` từ lúc tạo tạm trên page.
Hàm swap dùng cho header/cam kết có nhánh `else { inst.x = rx; inst.y = ry }`, nhưng nhánh riêng của
footer thì thiếu. Đã đặt lại `y = 3064`. **Bài học: swap trong khung tuyệt đối phải chép x/y, đừng
tin thứ tự children.**

### 10.7 Đối chiếu Figma ↔ trang chạy

| | Trang chạy @1440 | Figma |
|---|---|---|
| Khung | 1440×3478 | 1440×3478 |
| Cột nội dung | 569 | 569 |
| Gallery / ô ảnh | 823 / 409,5×505,6 | 823 / 410×506 |
| Cột chữ dải gợi ý | 282 | 283 |
| Tiêu đề dải | 40/50 · Bodoni · 2 dòng · căn giữa | y hệt |
| Lưới 4 ảnh | 1086 · 4 thẻ | 1086 · 4 thẻ |

Kẻ hairline dựng ra **0,8px** ở dải trên và 1px ở dải dưới — artifact sẵn có của extractor (bản
26/08 cũng ghi "đệm cộng kẻ 0,8"), lệch 0,2px, không sửa.

---

## 11. Đợt 4 (28/08 tối) — Figma → code, và phương án B

Lệnh user: *"hãy adapt thiết kế figma này vào layout 1, tôi có thay đổi bổ sung cho cục gợi ý mua
kèm; ngoài ra tạo thêm 1 phiên bản như hình đính kèm nhưng align bottom và cho text vào vị trí
trống ở trên khi align top"* (kèm ảnh tham chiếu: 3 thẻ cao lệch nhau, canh TRÊN).

Lần này chiều đi **NGƯỢC**: user sửa thẳng trên Figma (`Frame 3` = `108:3746` trong frame
`PDP / desktop 1440 · 28-08`), mình đọc số đo từ Figma rồi port về `desktop.html`.

### 11.1 User đã đổi gì trong Figma (đo từ node)

| | Bản mình dựng | Bản user sửa |
|---|---|---|
| Số thẻ | 4 × 265,5 | **3 × 329,8** |
| Khe thẻ | 8 | **24** |
| Nền dải | không | **băng xám `#f2f2f2`**, cao **352**, đệm 32 dọc / 24 ngang |
| Canh thẻ | đỉnh | **đáy băng**, ảnh **trồi lên 227,7** khỏi mép băng |
| Cột chữ | 282 · căn giữa | **282,6 · căn TRÁI**, đệm trên 16 |
| Kẻ mảnh | mép trên dải | giữ, nay là mép trên băng |

Khối bọc `Frame 3` cao 625, nội dung **canh đáy**, nên phía trên băng có **273** khoảng trắng để
ảnh trồi vào (đỉnh ảnh cách đỉnh khối 45,3).

### 11.2 Port về code — bản A

Khai bằng class ngữ nghĩa (`.dk-look-band` · `.dk-look-aside` · `.dk-look-grid`), đặt TRƯỚC các
`@media` như luật cascade đã ghi ở đợt trước. Điểm cốt lõi: **lưới đặt TUYỆT ĐỐI** (`bottom:32`,
`left: calc(24px + var(--look-aside) + 24px)`) thay vì nằm trong dòng chảy — nhờ vậy ảnh cao bao
nhiêu cũng không đẩy băng cao thêm, tự trồi lên phần trống, đúng cách Figma dựng (`grid y = −227,7`,
băng vẫn 352). `--look-aside` là biến nên dải hẹp chỉ phải đổi một số.

Đo lại trên trang chạy @1425 (thanh cuộn ăn 15): băng 352 · nền `rgb(242,242,242)` · đệm 32/24 ·
cách khối trên 273 · ảnh trồi 221 · 3 thẻ 324,7 khe 24 · tiêu đề căn trái 2 dòng. **Ở đúng 1440
(ẩn thanh cuộn) ra chính xác số Figma**: lưới 1037,4 · thẻ 329,8 · trồi 227,7.
Nhịp dưới không đổi: đáy băng → kẻ dải sau **32**, kẻ → nội dung **33**, đáy dải sau → cam kết **32**.

### 11.3 Bản B — "so le", theo ảnh tham chiếu

Ảnh user gửi xếp thẻ **canh TRÊN**, cao lệch nhau. Lệnh là lật lại: **canh ĐÁY** (mép trên răng
cưa) và **đặt tiêu đề vào chỗ trống phía trên**. Nên bản B **không có cột chữ riêng**: tiêu đề nằm
trong **cột 1 của lưới**, ngay trên thẻ thấp nhất.

Cao lệch làm bằng **tỉ lệ ô ảnh** theo cột — `1/1` → `4/5` → `189/252` (mặc định), thấp dần từ
trái sang phải; `!important` vì `productCard` in `aspect-ratio` bằng style inline. Đo: 3 cột canh
đáy, thẻ cao **549 · 662 · 697**, mép trên lệch **148 · 35 · 0**, tiêu đề ở đỉnh cột 1.

**Chọn bản bằng tham số URL**: mặc định `A`, xem bản so le bằng `?look=b`
(`http://localhost:8123/desktop.html?look=b`). Để ở tham số chứ không phải bộ da vì đây là 2
**phương án bố cục** đang so, không phải style thử — link khách nhận vẫn sạch.

### 11.4 Dựng bản B vào Figma

Frame `PDP / desktop 1440 · 28-08 · look B` (`108:4344`) @4540,80 — **1440×3687**, 339 node, ảnh
dùng lại hash (0 ảnh nạp mới). Ráp 7 instance: header · cam kết · footer (cả 3 khớp 0px) + 4 thẻ
dải "Sản phẩm tương tự" (`size=rail`), giữ raw thẻ pre-order như bản A.

**3 thẻ so le GIỮ RAW có chủ đích**: tỉ lệ ảnh 1/1 và 4/5 không có trong component, mà con của
instance thì không resize được (bẫy đã ghi). Chưa thêm variant vì **B mới là phương án đề xuất,
chưa chốt** — chốt rồi mới thêm variant, tránh phình DS cho một bản có thể không dùng.

> Frame `PDP / desktop 1440 · 28-08` (107:2725) **giữ nguyên bản user sửa** — không dựng đè, vì đó
> chính là bản thiết kế gốc của lượt này. Code bản A nay khớp frame đó.

### 11.5 Sự cố đã xử

**Bộ dò lưới bắt nhầm `#pdpGallery`.** Lượt ráp đầu của frame B dò "frame có ≥3 con chứa ảnh" →
trúng luôn gallery PDP, thay mất 1 ô ảnh bằng thẻ sản phẩm. Đã **xoá frame và dựng lại từ JSON**
(2 s) rồi ráp lại với bộ dò đi từ TIÊU ĐỀ (`text "Sản phẩm tương tự"` → khối cha → lưới 5 con).
Bài học: dò node theo **mốc ngữ nghĩa**, đừng dò theo hình dạng cấu trúc.
