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

### 11.6 Bản C — "magazine editorial" cho PDP#2 (HTML)

Lệnh user: *"ở pdp 2 hãy thử demo phương án kiểu magazine editorial cho cục gợi ý đó trên html luôn"*.
Làm thẳng trong `desktop.html`, gắn cho `kind === 'pdp2'` (PDP#1 vẫn bản A / `?look=b`; PDP#3–#6
vẫn dải 5 thẻ cũ).

Bố cục báo chí trên lưới 12 của khung 1392: **330 (3 cột) · 684 (6 cột) · 330 (3 cột)**, khe 24 —
cột giữa để `1fr` nên ở 1440 ra đúng 684, hẹp hơn thì co, 2 cột biên chở CHỮ nên giữ cứng.
Chất biên tập đến từ: **ảnh chủ đề cắt NGANG 3:2** (ảnh sản phẩm vốn dọc 3:4) · **chú thích ảnh có
kẻ mảnh phía trên** · **số 01 · 02 · 03** chạy suốt dải · **kẻ DỌC** ngăn cột danh sách · hàng danh
sách nằm ngang (ảnh 96×128 + chữ), ngăn nhau bằng kẻ mảnh. Không dùng chữ HOA / small-caps dù tạp
chí hay dùng — luật dự án cấm.

Không đi qua `productCard` (khuôn thẻ cố định: ảnh dọc + info dưới ảnh) nhưng **dùng lại đúng khuôn
giá/badge** của thẻ qua 2 helper `dkLookPrice` / `dkLookName`, và vẫn gắn `data-product` nên bấm là
sang đúng PDP (đo: bấm hàng 02 → sang `pdp3`). Dải "Sản phẩm tương tự" của PDP#2 nay cũng bật kẻ
ngăn để cùng nhịp. Đo: dải cao 570, nhịp 32 · 32 · 33 · 32 như PDP#1, không tràn ngang, console sạch.

**Điểm cắt ảnh phải chỉnh tay**: cắt 3:2 từ ảnh dọc mà để mặc định `50% 50%` là trúng ngang bụng.
Đặt `object-position: 50% 18%` — đúng mốc hero thương hiệu PLP đang dùng — thì lấy được nút vai +
thân trên, có khoảng thở.

> **Bẫy pipeline mới**: `extractor.js` chỉ đọc `object-fit`, **không đọc `object-position`**
> (`builder.js` luôn `scaleMode: FILL` canh giữa) — nên bản dựng Figma KHÔNG phản ánh điểm cắt.
> Kiểm điểm cắt phải làm ở trình duyệt. Lần này kiểm bằng cách vẽ lại vùng cắt vào `<canvas>` theo
> đúng công thức `cover` + `object-position`, POST base64 qua cầu nối rồi decode ra PNG để xem —
> cách này dùng được cho mọi lần cần "nhìn" trang khi pane không chụp được.

---

## 12. Đợt 5 (29/08) — dựng CÁC CASE CÒN LẠI của PLP

Lệnh user: *"tạo các case còn lại của PLP mà bạn đã tạo vào Figma luôn nhé."*

Đích: page **`screens`**, **section MỚI `PLP — trạng thái & biến thể`** đặt ngay DƯỚI section PLP
cũ (x 0 · y 5305 · 8080×18780, không chồng lấn 3 section sẵn có). Section 26/08 chỉ dựng **một**
trạng thái — PLP thương hiệu Versace lúc mở trang; đợt này dựng nốt **17 khung** còn lại.

### 12.1 Danh sách khung (mọi số là computed style đo trên trang chạy)

| Nhóm | Khung | Khổ | Node |
|---|---|---|---|
| **Màn mobile** | danh mục | 375×4674 | 390 |
| | làm đẹp (8 SP) | 375×3060 | 223 |
| | tìm kiếm ("túi" → 4 SP) | 375×2352 | 188 |
| | 0 kết quả | 375×1865 | 118 |
| | lưới 1 cột | 375×11933 | 395 |
| **Lớp nổi** | quick add · mặc định (Đặt trước) | 375×900 | 47 |
| | quick add · size tạm hết hàng | 375×900 | 43 |
| | quick add · size nhận thông báo | 375×900 | 43 |
| | quick add · bộ size riêng (S·M·L) | 375×900 | 35 |
| | sắp xếp · popover | 240×222 | 8 |
| **Màn desktop** | danh mục | 1440×3343 | 402 |
| | đang lọc | 1440×1891 | 245 |
| | 0 kết quả | 1440×1343 | 186 |
| | làm đẹp | 1440×2107 | 231 |
| | tìm kiếm | 1440×1549 | 212 |
| **Thẻ hover** | 6 size | 345×590 | 30 |
| | ít size (căn giữa) | 345×590 | 19 |

Kết quả bind: **gắn text style 100%** ở cả 17 khung (939 mực chữ, chỉ còn 5 node không style —
nằm trong layer `newsletter` ĐANG ẨN của `page-footer-mobile`, việc của DS không phải của đợt này),
**0 chuỗi chữ raw · 0 icon rỗng · 0 ảnh mất fill · 0 ảnh nạp lỗi**.

### 12.2 Ba quyết định về phạm vi

1. **Popover Sắp xếp chỉ dựng MỘT khung.** Đo cả 2 khổ đều ra đúng 240×222, 5 hàng 44, cùng bộ số —
   dựng 2 lần là nhân bản. Trạng thái hover của hàng là `:hover` nên không dựng được.
2. **0 kết quả dùng CẶP lọc "Trắng + Đang giảm giá", không dùng facet đơn.** Cơ chế `.f-gone` ẩn
   thuộc-tính-0-kết-quả khiến **không facet đơn nào chạm được màn rỗng**: tick "Kem" ra 0 sản phẩm
   nhưng chính nó bị ẩn khỏi panel. Cặp trên thì mỗi vế đều có hàng, ghép mới rỗng — đúng đường
   người thật đi tới.
3. **Quick add tách 4 khung.** Phần làm 28/08 nằm ở chỗ CTA đổi theo size (Đặt trước → Tạm hết hàng
   → Nhận thông báo, kèm ẩn dòng ngày giao) và ở bộ size đúng của từng SP — gộp một khung thì
   không thấy được.

### 12.3 Ráp component

**20 instance**, đo trước-thay-sau, lệch chiều cao khung **0px** ở cả 10 màn:
`page-header-mobile` 375×48 · `page-footer-mobile` 375×847,4 · `page-header-desktop` 1440×161 ·
`page-footer-desktop` 1440×414 (ẩn layer `divider` trong `inner`; master để 447 vì còn newsletter).

**Sửa component trong lúc ráp:** `page-header-mobile` và `page-header-desktop` có **fill ảnh logo
DAFC bị tắt visible** — đúng loại lỗi ngủ đã vá cho 2 bản footer hôm 26/08 nhưng **bỏ sót header**,
nên mọi instance header đều mất wordmark. Đã bật ở master → 7 instance của đợt 26/08 cũng được trả
lại logo.

**Thẻ sản phẩm GIỮ RAW — chờ duyệt, không phải quên.** Thẻ PLP hiện tại mang badge "Đặt trước"
đứng TRƯỚC TÊN (chốt 27/08) mà `product-item-info` chưa có slot badge inline; thêm slot là đụng 53
instance đang sống. Việc này vốn đã nằm trong danh sách chờ gật từ đợt 3.

### 12.4 BA lỗ pipeline vá trong đợt (ảnh hưởng mọi lượt dựng sau)

| # | Lỗi | Hậu quả thấy được | Vá |
|---|---|---|---|
| 1 | `colRaw()` chỉ bắt `rgba()`, mà **mọi mặt `color-mix` của dự án compute ra `color(srgb r g b / a)`** | `.filterbar` · `.glass-95` · `.glass-80` · `.pc-quick` **rơi sạch nền**; rõ nhất ở tấm hover — chip size nằm trần trên ảnh | extractor đọc cả 2 dạng |
| 2 | **173/208 icon** mang `fill="var(--general-primary)"`; `createNodeFromSvg` không hiểu `var()` | path mất fill → **icon ra khung rỗng** | extractor tra thẳng custom property trên chính phần tử rồi thay bằng hex |
| 3 | builder gỡ `width/height` bằng `replace` trên **CẢ chuỗi** SVG | `<rect width= height=>` bên trong cũng bị gỡ → icon vẽ bằng rect (nút đổi mật độ lưới, cờ Anh) ra rỗng | chỉ gỡ trên thẻ `<svg>` mở đầu |

Lỗi 1 và 2 **có sẵn từ đợt 26/08** — 4 khung PLP/PDP dựng hôm đó cũng dính, nhưng phần lớn icon ở
đó nay nằm trong instance header/footer (component dựng bằng đường khác nên không dính); chỉ còn
**1 icon rỗng** sót trong khung `PLP / mobile 375` cũ. Không dựng lại 4 khung đó vì sẽ mất 73
instance đã ráp — sửa tại chỗ khi có dịp.

**Còn lại một lỗ ĐÃ BIẾT, CHƯA VÁ:** extractor không đọc `object-position`, builder luôn `FILL`
canh giữa — ảnh hero thương hiệu (`object-position: 50% 18%`) ở 2 khung *0 kết quả* và *lưới 1 cột*
bị cắt giữa thay vì cắt theo mốc 18%.

### 12.5 Một lỗi DEMO tìm ra nhờ đợt dựng

Xem **PLP-RASOAT-2026-08-28.md mục 9** — ảnh thẻ sản phẩm biến mất sau khi áp bộ lọc (`img.lazy`
không được gắn `.loaded`). Đã vá cả 5 file; 3 khung Figma dính lỗi này (`đang lọc` · `làm đẹp` ·
`tìm kiếm` bản desktop) đã trích và dựng lại sau khi vá.

### 12.6 Bổ sung cùng ngày — auto layout + nút dùng component

Lệnh user: *"thêm auto layout vào các frame bạn tạo và các nút nên được dùng component."*

**Auto layout.** Trước đó chỉ các khối con có auto layout (builder tự thử rồi tự kiểm lệch); **trục
xương sống `frame → #viewport → div[scroller]` vẫn là chồng toạ độ tuyệt đối**. Vướng: khe giữa các
khối **không đều** — màn danh mục mobile là `8·16·8·0·0·24·24·16` — nên không dùng được một
`itemSpacing`. Cách làm: khe đầu/cuối đẩy vào **padding** của cột, khe giữa chèn **khung rỗng đặt
tên `space/8` · `space/16` · `space/24`** (khoá sẵn, không fill). Trục phụ canh **CENTER** — nhờ vậy
khối thụt lề 16 (h1 rộng 343) và nút Xem thêm canh giữa tự vào đúng chỗ, không cần padding riêng
cho từng con.

Quét sâu thêm 862 khung còn `NONE` (bỏ qua con nằm trong instance): thuật toán tách **con nằm trong
dòng chảy** khỏi **con đè** (giao > 50% diện tích của chính nó → `layoutPositioning: ABSOLUTE`, ví
dụ nút quick-add tròn nằm trên ảnh thẻ), chọn trục theo dải x/y rời nhau, canh trục phụ thử
MIN/CENTER/MAX rồi lấy cái khớp, và **lệch > 0,5px là trả lại nguyên trạng**.

| Kết quả quét | Số |
|---|---|
| Bật được auto layout | **534** |
| Trả lại vì lệch | 27 |
| Bỏ qua — con tràn khỏi cha (khối bị cắt, đúng là phải tuyệt đối) | 191 |
| Bỏ qua — rỗng · không có trục · trục phụ lẫn lộn | 82 · 6 · 22 |

Tổng cuối: **1065/1393 khung có auto layout (76%)**, 130 spacer, **17 khung giữ nguyên từng px**.

3 khuôn đặc biệt làm riêng: **quick add** dựng theo đúng nghĩa bottom-sheet (cột canh `MAX`, lớp phủ
là con tuyệt đối nằm sau, tấm trắng là con duy nhất trong dòng chảy) · **thẻ hover** cột 2 khối ·
**popover Sắp xếp** phải **dựng lại 4 hàng dưới** — extractor bóc mất khung của chúng (hàng không
nền, không icon nên frame một-con bị gộp), trong Figma chỉ còn 1 hàng thật + 4 chữ rời. Nay đủ 5
hàng `sort-opt` 238×44 cùng khuôn.

**Nút dùng component — thay 8, giữ raw phần còn lại vì LỆCH THANG DS.**

Đã thay: `#qaAdd` ×4 → `action variant=primary size=large` (nhãn qua property) · nút *Xem thêm* bản
desktop ×4 (121×48) → `action variant=outline size=large`, **có đè màu viền về `#dfdfdf`**.

| Nút giữ raw | Số | Đo được | Bậc DS gần nhất | Lệch |
|---|---|---|---|---|
| `btn-o` Bộ lọc · Bộ lọc (2) · Xóa tất cả bộ lọc | 12 | h36, nhãn **14/20** | small h36+12/16 · medium h40+14/20 | cao theo *small* mà chữ theo *medium* |
| *Xem thêm* bản mobile | 4 | 127×**44**, nhãn 12 | — | h44 **không có trong thang** (36/40/48) |
| `#sortBtn` | 10 | 102×36 ghost, nhãn 12 | ghost/small khớp cao + chữ | chevron nằm **đuôi**, component chỉ có `lead-icon` |
| `gridbtn` · `#qaClose` | 10 · 4 | 36×36 · 32×32 | `size=icon` 40×40 | lệch 4px · 8px |
| chip bộ lọc đang áp `af-chip` | 4 | h32 nền `#f2f2f2` | — | **chưa có component chip** |
| quick-add tròn trên thẻ | 44 | 36 tròn | thuộc `product-item-info` | theo đợt ráp thẻ |

**5 việc chờ chốt sinh ra từ bảng này** (không tự quyết vì đều là "một trong hai bên phải đổi"):
màu viền nút outline (`border` #dfdfdf của demo vs `border-strong` #0a0a0a của DS) · bậc h36 +
nhãn 14/20 (thêm biến thể vào DS, hay hạ nhãn về 12/16?) · nút *Xem thêm* mobile h44 · slot icon
đuôi cho `action` · component chip cho bộ lọc đang áp.

### 12.7 Ráp thêm component + buộc token spacing

Lệnh user: *"tái sử dụng bộ component mà bạn đã tạo vào các frame mà bạn kéo chứ, sử dụng tokens
spacing các thứ vào luôn."*

**Tổng cuối: 62 instance gốc / 135 kể cả lồng, thuộc 6 component.**

| Component | Instance | Ghi chú |
|---|---|---|
| `page-header-mobile` · `-desktop` | 5 + 5 | đợt trước |
| `page-footer-mobile` · `-desktop` | 5 + 5 | đợt trước |
| **`filter-bar`** platform=mobile/desktop | **5 + 5** | MỚI |
| `action` primary/large · outline/large | 4 + 4 | đợt trước |
| **`service-promises-mobile`** | **3** | MỚI — khối cam kết, khớp 375×368 từng px |
| **`filter-size-chip`** default/_selected/_oos/_selected-oos | **13 + 2 + 4 + 2** | MỚI |

**3 lỗi component phát hiện và sửa khi ráp** (đều ở `filter-bar`, component dựng 27/08 mà
**chưa từng có instance nào** nên sửa master là an toàn):

1. **Cao 53/69 thay vì 52/68** — `counterAxisSizingMode` để AUTO nên chiều cao hug thành
   `đệm 8 + nội dung 36 + đệm 8 + kẻ 1`. Demo vẽ kẻ NẰM TRONG hộp 52. Đổi về FIXED là khớp.
2. **Nền trắng đục thay vì trắng 95%** — di chứng của chính lỗi `color(srgb …)` vá hôm nay: lúc
   dựng 27/08 extractor đọc không ra nền glass nên component nhận trắng đặc.
3. **Icon đổi mật độ lưới vẽ sai** — component có *"3 gạch ngang (danh sách)" + "lưới 4 ô"*, demo là
   *"lưới 4 ô" + "3 cột dọc"*. Thay bằng đúng vector đo từ demo, đặt lại tên `icon/view-grid-4` ·
   `icon/view-cols-3`.

**2 biến thể MỚI thêm vào `filter-size-chip`** — chip quick add đo 61,8×36 trùng khít chip bộ lọc
62,2×36 (cùng viền, cùng nhãn 12/18) nhưng component thiếu trạng thái: `state=_oos` (gạch ngang,
mực `#666666`) và `state=_selected-oos` (viền đen + gạch ngang — size hết hàng ĐANG chọn, đúng cảnh
của 2 khung *tạm hết hàng* và *nhận thông báo*). Thêm biến thể là phép cộng, 5 instance cũ không đổi.

**Token spacing: 3.779/4.715 ô đệm-và-khe đã buộc biến (80%).** 936 ô còn lại **ngoài thang**: đông
nhất là `2` (330 ô — khe vi mô giá ↔ chip) và `1` (299), rồi cụm **đệm cộng kẻ** `9 · 0,5 · 6,5`
sinh ra vì stroke của Figma không đẩy nội dung như `border` của CSS (đã ghi từ đợt 26/08). Chiều cao
spacer cũng buộc biến ở 40/100 khung — số còn lại là khe ngoài thang.

**Việc chờ chốt sinh thêm:** `filter-size-chip` mang tiền tố `filter-` nhưng nay phục vụ cả chọn
size sản phẩm — đổi tên thành `size-chip` dùng chung hay tách hai component? (theo NAMING-MAGENTO.md).
Và dải chip bộ lọc **đang áp** (`af-chip` h32 nền `#f2f2f2`) vẫn chưa có component tương ứng.
