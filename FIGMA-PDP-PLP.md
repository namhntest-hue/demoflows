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
