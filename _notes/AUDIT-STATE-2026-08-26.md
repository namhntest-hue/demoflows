# Dò TRẠNG THÁI (state) — bộ component Figma vs demo đang chạy · 26/08/2026

Câu hỏi: *"dựa vào các trang mà chúng ta tham khảo thì bộ component hiện tại có đang thiếu
state hay gì không"*.

Cách làm: đối chiếu **3 nguồn** —
(1) state đang có trong file Figma `Test agent` (sau đợt thi hành phương án B);
(2) state **thực sự chạy** trong `index.html` + `desktop.html` (đếm selector `:hover` `:focus`
`:active` `[disabled]` `aria-*`, đọc CSS);
(3) luật `STYLE-RULES.md` + chuẩn hành vi **WAI-ARIA APG** (thước đo a11y đã chốt ở
`NAMING-MAGENTO.md` Phần 5).

Số đếm thô trong demo:

| | index.html | desktop.html |
|---|---|---|
| `:hover` | 2 | **26** |
| `:focus-visible` | 3 | 4 |
| `:active` | 9 | 8 |
| `[disabled]` / `aria-disabled` | 34 | 38 |
| `aria-expanded` | 2 | 7 |
| `aria-selected` | 0 | 2 |
| `aria-invalid` | 4 | 4 |
| shimmer / skeleton | 16 | 26 |
| empty / rỗng | 28 | 27 |
| hết hàng / out-of-stock | **53** | **74** |

Ba con số cuối là chỗ đau: demo có **loading**, **empty** và **hết hàng** dùng rất nhiều,
bộ component Figma **không có cái nào**.

---

## 1. State THIẾU trên component đã có

| Component | Figma đang có | Thiếu | Bằng chứng trong demo |
|---|---|---|---|
| `action` | default · `_hover` · `_focus` · `_disabled` + `loading` | **`_active` (đang nhấn)** | `.press:active { opacity: .9 }` — class `.press` gắn khắp nơi ở CẢ 2 bản, kể cả hàng danh sách |
| `dafc-select-trigger` | default · `_open` · `_focus` · `_invalid` · `_disabled` | **`_hover`** | cùng họ `.btn-o press`, mà `.btn-o:hover` có thật ở desktop |
| `dafc-select-item` | default · `_hover` · `_selected` · `_disabled` | **`_focus`** (điều hướng bàn phím trong listbox) | `role="option"` + `aria-selected`, APG bắt buộc có focus riêng |
| `dafc-qty` | *(không có state nào)* | **`_disabled` cho nút giảm khi SL = 1** | ⚠ **DEMO CŨNG CHƯA CÓ** — không tìm thấy chỗ khoá nút |
| `dafc-cart-row` | 3 `kind`, không state | **`_removed`** (đã xoá, chờ hoàn tác) | `CART.map(... c.removed ? '' : row(...))` — cờ có sẵn trong dữ liệu |
| `product-item-info` | 3 `kind`, không state | **`_hover`** — xem mục 2 | `.group:hover` |
| `message` | 4 `kind` | **state hiện / ẩn** | `#toast.show { animation: toastIn }` |
| `control` (input) | default · `_focus` · `_invalid` · `_invalid _focus` · `_disabled` | **`_hover`** · **trạng thái ĐÃ ĐIỀN vs rỗng** | ⚠ demo **cũng không có** `:hover` cho input — chỉ `focus:border-primary`. Cần chốt: thêm ở cả hai, hay bỏ hẳn |

---

## 2. `product-item-info` — thiếu HẲN bản desktop, không chỉ thiếu state

Trên khổ desktop thẻ sản phẩm **đổi cơ chế**, không phải phóng to:

* `.quick-add` bị `display: none !important` — **nút tròn biến mất**;
* thay bằng **`.pc-sizes`** — dải chọn size **hiện khi rê chuột**:
  * `grid` 4 cột, khe 4, dán đáy thẻ, đệm 12;
  * nền `color-mix(in srgb, background 75%, transparent)` + `backdrop-filter: blur(7.5px)`;
  * biến thể **`.is-few`** (dưới 4 size): bỏ lưới 4 cột, một hàng ô `minmax(96px, auto)`, canh giữa;
  * hiện khi `.group:hover` **hoặc** `.pc-sizes:focus-within` (đúng a11y);
  * ô size **KHÔNG viền**, hover lấy đúng `ghost-hover` của cụm Nam/Nữ/Làm đẹp trên header;
* ảnh phóng `scale(1.03)` / `scale(1.04)` khi hover thẻ.

⚠ **Xung đột luật cần chốt:** `.pc-sizes` là **mặt kính thứ HAI** (75%) bên cạnh `.glass-95`
(95%) của navbar. §2.2 nói mặt thanh dính *"không phải mặt thứ ba cho nội dung — không thêm
độ mờ thứ hai"*. Hoặc hợp lệ hoá thành ngoại lệ ghi danh, hoặc kéo `.pc-sizes` về đúng
`--surface-sticky`.

---

## 3. Thiếu HẲN component (không phải thiếu state)

| Vai | Demo | Figma | Ghi chú |
|---|---|---|---|
| **Ô size / chip** `.chip` — **4 trạng thái**: `default` · `on` (đang chọn, viền primary) · `off` + `data-oos="oos"` (Tạm hết hàng — gạch ngang, KHÔNG hạ mực dưới `#666`, chốt E-3) · `off` + `data-oos="notify"` (Nhận thông báo khi có hàng) | ✅ 53–74 lượt | ❌ | Đây là linh kiện dùng nhiều thứ nhì sau nút. Magento: `swatch-option` |
| **Empty state** — 3 loại: giỏ trống (icon + tiêu đề + phụ đề + CTA "Tiếp tục mua sắm") · tìm kiếm rỗng · không có kết quả | ✅ | ❌ | `cartEmptyHTML()`; màn search-empty còn ghi rõ node Figma gốc `2918:45172` |
| **Skeleton / shimmer** — lazy ảnh + "Show more" | ✅ `.shimmer::after` gradient chạy 1,4s | ❌ | |
| **field-error** — dòng báo lỗi dưới input | ✅ `aria-invalid` + `aria-describedby` + chèn thẻ `<p>` | ❌ *(chỉ có viền `_invalid`)* | Magento: `field-error` / `mage-error` |
| **Thông báo còn ít hàng** — "Chỉ còn 01 sản phẩm" | ✅ `SIZE_LOW_STOCK` | ❌ | |

---

## 4. Chỗ Figma và demo ĐANG NÓI KHÁC NHAU

### 4.1 `dafc-switch` — lệch cả 3 mặt

| | Demo (`.cg-sw`, 6–7 lượt) | Figma `dafc-switch` |
|---|---|---|
| Khổ | **40 × 24** | 36 × 20 |
| Bo góc | **999px (viên thuốc)** | **0 (vuông)** |
| Bóng ở núm | **`0 1px 3px rgba(0,0,0,.25)`** | không |
| Disabled | `opacity: .4` | `opacity: .5` |

Ai đúng? **Figma đúng luật** — §3.2 bo 0 trừ hình tròn thật (40×24 không tròn), §3.3 cấm bóng.
**Demo đang vi phạm cả hai.** Phải chốt: sửa demo về vuông-không-bóng, hay ghi danh ngoại lệ.

### 4.2 Disabled — hai nấc mờ

Luật chung của demo là `button[disabled], [aria-disabled="true"] { opacity: .5 }` — khớp Figma
(39 node ở 0.50). Riêng `.cg-sw[aria-disabled="true"]` để **`.4`**. Một chỗ lệch, nên gom về `.5`.

### 4.3 Bóng còn sót trong demo — §3.3

Bảng audit 24/08 ghi §3.3 đã về **0 · 0**, nhưng đo lại 26/08 vẫn còn **4 chỗ**:

| Chỗ | index | desktop |
|---|---|---|
| `#settingsFab` | `0 2px 12px rgba(0,0,0,.10)` | ✅ |
| `#topFab` (về đầu trang) | `0 2px 12px` | `0 2px 12px` + **hover `0 4px 18px`** |
| `.cg-sw i` (núm switch) | `0 1px 3px rgba(0,0,0,.25)` | ✅ |

`#settingsFab` là công cụ demo (§5 — ngoài bộ da) nên có thể miễn. `#topFab` và núm switch
là **UI thật**, không miễn được.

---

## 5. Đề xuất — 3 nhóm, làm theo thứ tự

**Nhóm 1 — rẻ, làm ngay (chỉ thêm state vào set đã có):**
`action` thêm `_active` · `dafc-select-trigger` thêm `_hover` · `dafc-select-item` thêm `_focus` ·
`message` thêm state hiện/ẩn · `dafc-cart-row` thêm `_removed`.

**Nhóm 2 — linh kiện thiếu, ưu tiên theo mức dùng:**
1. `swatch-option` (ô size/chip) **4 state** — dùng nhiều nhất trong nhóm còn thiếu;
2. `product-item-info` biến thể **desktop + `_hover`** kèm `pc-sizes` (và `.is-few`);
3. **empty state** ×3;
4. `field-error`;
5. `skeleton`.

**Nhóm 3 — cần anh/chị chốt trước khi tôi đụng vào:**
1. **Switch**: demo tròn-có-bóng vs Figma vuông-không-bóng — sửa demo hay ghi danh ngoại lệ?
2. **`.pc-sizes` mặt kính 75%** — hợp lệ hoá thành ngoại lệ, hay kéo về `--surface-sticky`?
3. **`#topFab` + núm switch còn bóng** — gỡ bóng ở demo?
4. **Input `_hover`** — thêm ở cả demo lẫn Figma, hay bỏ hẳn (giữ chỉ focus)?
5. **`dafc-qty` khoá nút giảm khi SL = 1** — thêm vào demo trước rồi mới dựng state?

---

# ĐÃ THI HÀNH — 26/08/2026 (lệnh user: *"tiến hành"*)

Làm **nhóm 1 + nhóm 2**. Nhóm 3 vẫn để anh/chị chốt — nhưng chỗ nào buộc phải vẽ ra thì tôi
dựng theo ĐÚNG SỐ ĐO hiện tại và ghi câu chờ-chốt vào mô tả component.

## Nhóm 1 — thêm state vào set đã có

| Component | Việc | Kết quả |
|---|---|---|
| `action` | thêm `state=_active` | 48 → **60 variant**; `_active` = mờ 90% đúng `.press:active { opacity:.9 }` |
| `dafc-select-trigger` | thêm `state=_hover` | 5 → **6**; nền `secondary` |
| `dafc-select-item` | thêm `state=_focus` | 4 → **5**; nền `accent` + `focus-ring` — phân biệt được với `_hover` (chỉ có nền) |
| `dafc-qty` | COMPONENT → **COMPONENT_SET** | `state=default` · `state=_disabled` (nút giảm mờ 50%) |
| `message` | ghi **spec chuyển động** vào mô tả | `toastIn .3s cubic-bezier(.22,1,.36,1)` khi thêm `.show` |

**`dafc-cart-row` `_removed` — ĐÃ BỎ khỏi kế hoạch.** Đọc lại code: `CART.map(c => c.removed ? '' : row(c,i))`
— hàng bị xoá **biến mất hẳn**, không có hình thái riêng. Đề xuất ban đầu của tôi sai; không dựng.

**`message` không dựng variant "ẩn".** Một variant `opacity: 0` không đọc được trên canvas —
spec chuyển động trong mô tả là đủ cho dev.

## Nhóm 2 — dựng linh kiện còn thiếu

### `swatch-option` — trang mới `swatch-option · ô size`

62,2 × 36 · đệm ngang 4 · bo 0 · chữ **t-copy 12/18**. Lưới 5 cột khe 8.

| State | Viền | Mực | Khác |
|---|---|---|---|
| `default` | 0,8 `border` | `foreground` | |
| `_selected` | 0,8 **`border-strong`** | `foreground` | nhấn bằng KẺ, không bằng nền — đúng đòn bẩy 2 §2.3 |
| `_disabled` | 0,8 `border` | `muted-foreground` | **gạch ngang** (§2.1 chốt E-3: hết hàng không hạ mực dưới #666) |

⚠ **Chỉ 3 hình cho 4 hành vi:** `data-oos="oos"` (Tạm hết hàng) và `data-oos="notify"`
(Nhận thông báo khi có hàng) **trông giống hệt nhau** — khác ở hành vi khi bấm. Không dựng variant thứ 4.

### `product-item-info-desktop` — 345 × 588, `state=default | _hover`

Ảnh 345×460 (giữ tỉ lệ 4:3 như bản mobile 185×246), info 128.
`.quick-add` **bị gỡ** (desktop `display:none`). `_hover` có **`.pc-sizes`** 345×100 dán đáy ảnh:
lưới 4 cột 77,25 khe 4 đệm 12, ô size 77,25×36 **không viền** chữ t-ui, nền `background` 75% +
`backdrop-filter: blur(7.5px)`.
Hàng ô màu desktop khe 8 / cao 22 (mobile 12 / 20).

### `dafc-empty` — 375 × 268

Xếp dọc canh giữa, khe 12, đệm 64/32: icon túi 20 → tiêu đề t-copy → phụ đề t-copy muted →
nút primary cao 40 đệm ngang 24 chữ t-body, cách trên 8.

⚠ **Chỉ dựng được 1 trong 3 màn rỗng.** Hai màn còn lại chưa đo được: (1) PLP "Không tìm thấy
kết quả phù hợp" cần từ khoá không khớp mới hiện; (2) `#searchEmpty` — đo ra thì **không phải
màn rỗng** mà là panel gợi ý (tìm gần đây + xu hướng), có thể không cần component rỗng cho nó.

### `field-error` — trang `control · label`

Đệm trên 4 · chữ **t-copy 12/18 destructive** · rộng bằng ô nhập.
Dùng CẶP với `control state=_invalid`.

> **Đính chính báo cáo dò ở trên:** lúc đầu tôi đo ra "viền ô nhập KHÔNG đổi sang đỏ".
> Sai — node cũ bị kẹt do màn `checkout` re-render giữa chừng. Đo lại trên phần tử mới:
> `.fld-err` cho `rgb(214,40,69)` = `#d62845`. **Viền đỏ CÓ chạy**, khớp `control state=_invalid`
> của Figma. Không có lệch nào ở đây.

### `dafc-skeleton` — 100 × 133

Nền `secondary` + dải sáng `rgba(255,255,255,.45)` giữa hai đầu trong suốt.
Demo: `animation: shimmer 1.4s infinite`, xong thì `.loaded` tắt dải và hiện ảnh bằng `opacity .5s`.
Figma không chạy animation nên đây là ảnh tĩnh khoảnh khắc dải ở giữa.

## Đo lại sau khi làm

| Trục | Kết quả |
|---|---|
| 500 + chữ thường | **0** |
| Text node không gắn style | **0** |
| Node bám bậc 18 rỗng | **0** |
| Đổ bóng | **0** *(blur nền của `.pc-sizes` không tính — là backdrop-filter, không phải drop shadow)* |
| Bo góc sai | **0** |
| Bind màu | **1.921** (1.489 nền + 432 kẻ) |
| Tổng node · text node | 2.831 · 843 |

Còn 21 fill + 13 kẻ chưa bind — vẫn đúng 3 nhóm cố ý: ô màu sản phẩm `#a5d48c`, icon cờ Anh,
màu khung SECTION của Figma.

## Hai việc phát sinh ngoài kế hoạch

1. **Hai trang bị rụng tiền tố `dafc`**: `dafc-switch` → `switch`, và
   `dafc-cart · linh kiện giỏ` → `-cart · linh kiện giỏ` (còn dấu `-` thừa ở đầu — gần như chắc
   là lỗi thao tác chứ không phải cố ý). **Đã đặt lại đúng tên.** Nếu anh/chị cố tình bỏ tiền tố
   thì nói, tôi đổi lại.
2. `figma_take_screenshot` có lúc trả bản REST **lag** — ảnh chụp ra trạng thái cũ. Xác minh
   bằng cách truy vấn thẳng node qua `figma_execute`.

## Nhóm 3 — vẫn chờ anh/chị chốt

1. **Switch**: demo `.cg-sw` 40×24 **tròn 999 + bóng ở núm** vs Figma 36×20 **vuông không bóng**.
   Figma đúng luật (§3.2 · §3.3), demo đang vi phạm. Sửa demo hay ghi danh ngoại lệ?
2. **`.pc-sizes` mặt kính 75%** — mặt mờ THỨ HAI cạnh `.glass-95`. §2.2 nói không thêm độ mờ
   thứ hai. Hợp lệ hoá hay kéo về `--surface-sticky`? *(Figma đã dựng theo số đo hiện tại.)*
3. **Bóng còn sót trong demo**: `#topFab` (cả 2 bản, hover còn đậm hơn) và núm `.cg-sw i`. Gỡ?
4. **Input `_hover`** — hiện cả demo lẫn Figma đều KHÔNG có. Thêm hay bỏ hẳn?
5. **`dafc-qty` khoá nút giảm khi SL = 1** — Figma đã có state, **demo chưa thi hành**.
6. **`.pc-sizes.is-few`** (dưới 4 size) — chưa dựng thành variant riêng.

---

# BỔ SUNG — hoàn tất `action` với ghost + link (26/08/2026)

> Lệnh user: *"hoàn tất component action với các button style ghost và link luôn nhé"*.

## Đính chính: đóng băng Ghost/Link là SAI

Đợt phương án B tôi xếp Ghost · Link · Destructive vào hàng tồn với lý do *"demo chỉ có 3 kiểu
nút"*. Đúng với **Destructive**, **sai với Ghost và Link** — hai kiểu này có chỗ dùng thật,
chỉ **mang tên khác** nên grep `.btn-*` không ra:

| Kiểu | Class trong demo | Chỗ dùng |
|---|---|---|
| ghost | `.ghost-hover` | nút tìm / tài khoản / giỏ 44×44 trên header desktop · 3 nút ngành hàng · nút +/− số lượng |
| link | nút chữ gạch chân | "Đổi quà" · "Xem tất cả 3 chương trình" · "Đăng nhập" · toàn bộ link chân trang |

## Số đo thật (đo 26/08, không bê lại bản shadcn 20/08)

**Ghost** — nền `transparent`, **không viền**, bo 0, mực foreground.
Hover: token `--unofficial-ghost-hover: rgba(0,0,0,.05)`; phủ trên nền trắng ra **đúng `#f2f2f2`
= `accent`** → dùng lại biến sẵn có, **không đẻ biến mới**.

**Link** — nền `transparent`, không viền, **không đệm**, **gạch chân từ trạng thái NGHỈ**
(offset 2px, dày 1px). Mực `foreground` cho link chính, `secondary-foreground` cho link phụ
("Đổi quà").

⚠ **Link CHƯA CÓ hover trong demo.** Đo 26/08: không rule nào đổi hình khi rê chuột lên link —
chỉ có `:active` (mờ 90%) và `:focus-visible` (ring). Variant `link/_hover` hạ mực xuống
`secondary-foreground` là **ĐỀ XUẤT**, theo đúng đòn bẩy "đổi mực" mà `.ghost-hover:hover` và
`.btn-gm:hover` đang dùng. **Chờ chốt rồi mới đưa vào code.**

## Đã làm

* Dựng ghost + link **từ variant `outline` hiện tại** (không phục hồi bản đóng băng) → thừa
  hưởng ngay typo đúng (t-body 14/20 cho large/medium, t-ui 12/16 cho small), trạng thái
  `_active`, và tên theo quy chuẩn Magento.
* `action`: **60 → 100 variant** = 5 kiểu × 4 khổ × 5 trạng thái.
  `variant = primary | secondary | outline | ghost | link`.
* **Xếp lại lưới spec-kit**: 5 nhóm × 5 trạng thái = 25 cột (pitch 150) × 4 khổ (pitch 80),
  set 3798 × 368. Dựng lại toàn bộ khung chú thích (5 khung nét đứt + 5 nhãn nhóm +
  25 nhãn trạng thái + 4 nhãn khổ) cho khớp lưới mới.
* **Gỡ 32 bản Ghost/Link đóng băng** — bản dựng lại mới đúng hơn, giữ hai bản song song là mời
  người sau dùng nhầm. Trang đóng băng nay chỉ còn **`action — variant Destructive` (16)** +
  Separator + Card, và ghi chú đã sửa lại cho đúng.
* Viết lại mô tả set `action` và bổ sung ghi chú vào `[doc] Button`.

## Đo lại

| Trục | Kết quả |
|---|---|
| `action` | **100 variant**, 5 kiểu |
| 500 + chữ thường | **0** |
| Text node không gắn style | **0** |
| Đổ bóng · bo góc sai · bậc 18 rỗng | **0 · 0 · 0** |
| Bind màu | **2.037** (1.563 nền + 474 kẻ) |

Còn 21 fill + 13 kẻ chưa bind — vẫn đúng 3 nhóm cố ý (ô màu sản phẩm · icon cờ Anh ·
khung SECTION của Figma). 5 khung nét đứt mới dựng đã bind vào `border`.

## Còn treo (thêm 1 mục)

7. **`action` variant `link` — trạng thái `_hover`**: demo chưa có, Figma đang để mực
   `secondary-foreground` như đề xuất. Chốt rồi mới đồng bộ sang code.
