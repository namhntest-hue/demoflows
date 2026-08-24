# Dò 2 bản theo STYLE-RULES + bộ shadcn — 24/08/2026

> Câu hỏi của user: *"scan 2 phiên bản mobile và desktop đã chuẩn theo rule typo và thư viện shadcn ui của chúng ta chưa"*.
> Trọng tài: `STYLE-RULES.md` (luật) + `shadcn-theme/SHADCN-NOTES.md` (hợp đồng bàn giao).
> Cách đo: bộ scan `getComputedStyle` chạy trên trang thật, **bộ da `skin-mt`**, đi qua
> **11 màn mobile** (375) và **10 màn desktop** (1440); chỉ tính phần tử ĐANG HIỆN, và với
> chữ thì chỉ tính phần tử có **text node trực tiếp**. Đã đóng băng `.rise/.reveal` trước khi
> đo (animation đang chạy trả số sai). Miễn trừ theo §5: `#settingsPanel` · `#settingsFab` ·
> `.cg-sw` · `.langopt` · `#topFab`; ô màu sản phẩm (`[data-swatches]`/`.cw`/`.fcolor`) tính là
> DATA, không tính là style.

---

> ## ⚑ TRẠNG THÁI: ĐÃ SỬA HẾT NGAY TRONG NGÀY
>
> Sau khi đọc bản dò này, user ra lệnh *"hãy sửa tất cả các điểm còn lệch vào luôn"* — đã thi
> hành trên **CẢ 2 FILE** và **đo lại bằng chính bộ scan này**:
>
> | Trục | Trước (mobile · desktop) | Sau |
> |---|---|---|
> | §1.3 cặp cỡ/dòng | 341 · 489 | **0 · 0** |
> | §1.2 cỡ ngoài thang | 30 · 67 | **0 · 0** |
> | §2.1 mực ngoài 3 bậc | 4 · 57 | **0 · 0** |
> | §3.1 sắc viền ngoài 3 tầng | 66 · 62 | **0 · 0** |
> | §3.2 bo góc ≠ 0 | 46 · 55 | **0 · 0** |
> | §3.3 đổ bóng | 1 · 1 | **0 · 0** |
> | §4.3-3 hex trong rule bộ da | 12 · 19 | **0 · 0** |
> | §4.3-4 hai bản khai giống hệt | 6 điểm lệch | **0** |
>
> Còn lại đúng 3 nhóm và **cả 3 đều hợp lệ**: `glass-95` (chữ ký bộ da) · gạch 2px của
> tab/nav đang chọn + vòng radio · chấm màu trạng thái đơn và chấm phân cách `#666`.
>
> 4 điểm mục E đã chốt theo khuyến nghị (chi tiết: `STYLE-RULES.md` **Phần 7**, có cả bảng
> remap cặp cỡ+dòng và 4 quyết định mới ghi danh). Phần dưới giữ nguyên làm **hồ sơ hiện
> trạng trước khi sửa** — đừng đọc nó như trạng thái hiện tại.

## 0. Kết luận ngắn

| Trục luật | Mobile | Desktop |
|---|---|---|
| §1.1 hai họ chữ — weight chỉ 400/500 | ✅ **0 vi phạm** | ✅ **0 vi phạm** |
| §1.1 cặp 500 ⇄ CHỮ HOA không tách rời | ✅ **0** (không có 500-chữ-thường, không có hoa-mà-400) | ✅ **0** |
| §1.4 tracking = 0.5px | ✅ **0 giá trị rò** | ✅ **0 giá trị rò** |
| §1.5 chữ hoa — danh sách đóng | ✅ đúng 4 vai đang hiện | ✅ đúng 4 vai đang hiện |
| §1.2 thang 5 cỡ (10·12·14·18·24) | ⚠️ **1 cỡ lạ** (9px, 30 chỗ) | ❌ **3 cỡ lạ** (9px · 11px · 16px, 67 chỗ) |
| §1.3 cặp cỡ/dòng | ❌ **341 chỗ** lệch cặp | ❌ **489 chỗ** lệch cặp |
| §2.1 mực — 3 bậc | ⚠️ 4 chỗ `#a3a3a3` | ❌ **56 chỗ `#999999`** + 1 `#8a6100` |
| §2.2 mặt — 2 mặt + ngoại lệ ghi danh | ⚠️ 19 chỗ `#fef2f2` | ⚠️ 21 chỗ `#fef2f2` + 1 `#fffbeb` |
| §3.1 viền 3 tầng | ❌ `#cfcfcf` 40 · `#333` 16 · `#f2f2f2` 4 | ❌ `#cfcfcf` 44 · `#333` 16 |
| §3.2 bo góc 0 | ❌ `3px` 30 · pill-không-tròn 16 | ❌ `3px` 54 · pill 1 |
| §3.3 không đổ bóng | ⚠️ **1 chỗ** (`#topFab`) | ⚠️ **1 chỗ** (`#topFab`) |
| §4.3-3 không rải hex trong rule bộ da | ⚠️ **12 hex** | ⚠️ **19 hex** |
| §4.3-4 "giống hệt ở cả 2 file" | ❌ còn **6 điểm lệch** giữa 2 bản | — |

**Đọc kết luận này thế nào:** phần *hệ thống* của bộ da đã đứng vững — độ đậm, cặp 500+hoa,
tracking, danh sách chữ hoa, đổ bóng: **sạch tuyệt đối ở CẢ 2 BẢN**. Phần còn lệch gần như
toàn bộ là **1 nguyên nhân gốc duy nhất** (§4.2 remap theo cặp mới chỉ áp trong màn giỏ) cộng
với **nhóm việc đã chốt 20/08 mà code chưa thi hành ngoài màn giỏ**. Không có vi phạm nào phát
sinh từ đợt sửa hôm nay ngoài **1 điểm nhỏ** (mục B-7).

---

## A. Đã sạch — đừng dò lại

1. **Độ đậm**: mọi chữ đang vẽ chỉ có `400` hoặc `500`. Markup còn 52 (mobile) / 62 (desktop)
   chỗ `font-semibold|bold|light` nhưng blanket `.font-*` của bộ da vô hiệu hoá hết — đúng
   cách preset shadcn sẽ làm khi port (`semibold/bold/light` không sinh class).
2. **Cặp 500 ⇄ hoa**: không còn chỗ nào 500-chữ-thường (ngoài ngoại lệ ghi danh `#filterSheet
   .facc`), cũng không có chỗ nào hoa-mà-400. Đây là luật hay vỡ nhất khi thêm nhãn mới, và nó
   đang đứng.
3. **Tracking**: rule chặn rò §4.1 (`[class*="tracking-"] { 0.5px }`) đang phủ toàn bộ — 18
   (mobile) / 9 (desktop) utility `tracking-[…]` trong markup **không** rò ra được số đo nào.
4. **Đổ bóng**: 0 công thức bóng còn sống trên **mọi khối nội dung và mọi lớp nổi** ở cả 2 bản —
   chốt 17/08 (hướng cettire) đã vào hết. Còn **đúng 1 chỗ** ngoài luật: `#topFab`, xem B-8.
5. **Chữ hoa**: mobile 5 nhóm (footer 2 · `.search-tab` · 5 nhãn màn giỏ), desktop 5 nhóm
   (`.dk-nav-link` · `.dk-dept` · footer · `.search-tab` · 4 nhãn màn giỏ) — **tất cả nằm trong
   danh sách đóng §1.5**. `.pc-brand` đã thôi hoa ở cả 2 bản (đúng chốt 24/08).
6. **Màn giỏ** — màn duy nhất đã thi hành trọn §1.2/§1.3: 2 title mới đo đúng `12/16 · 500 ·
   HOA` = **đúng class `.label` (T6)** của bộ bàn giao, ô chọn mã cao đúng 40 = **đúng khuôn
   `Input` §5**, dải nhấn `#f2f2f2` = ngoại lệ ghi danh §2.3.

---

## B. Còn lệch — theo thứ tự ảnh hưởng

### B-1. §1.3 cặp cỡ/dòng: **1 nguyên nhân gốc, 771 chỗ** — KHỐI LỚN NHẤT

| Cặp đang vẽ | Mobile | Desktop | Phải là | Vì sao lệch |
|---|---|---|---|---|
| `12/20` | **295** | **430** | 12/16 hoặc 12/18 | `.leading-5` (20) gặp cỡ đã remap về 12 → tỉ lệ 1.67 |
| `12/24` · `14/24` | 23 | 34 | 12/16 · (bỏ 14 nội dung) | `.leading-6` (24) gặp cỡ remap |
| `18/28` · `18/27` · `18/25` | 10 | — | 18/24 (T2) | `leading-[28px]`, `leading-7`, `.ck-h1` |
| `24/33` · `24/40` | 1 | 8 | 24/32 (T1) | `text-[22px]`/`text-[32px]` + `leading-10` |
| `18/32` | — | 5 | 18/24 | desktop remap `24 → 18` nhưng giữ `leading-8` |
| `10/12` · `10/15` | 11 | 12 | 10/14 (T7) | `.badge-label`, pill TIKINOW |
| `12/19.5` | 1 | — | 12/18 | `leading-relaxed` |

**Cách sửa đúng luật là §4.2**: remap theo **cặp** `.text-[Npx].leading-N`, không remap cỡ đơn
lẻ. Màn giỏ đã làm và ra 0 lệch — nhân rộng khối đó ra toàn app là dứt gần hết 771 chỗ này.
*(Trạng thái: việc 1+3 Phần 6 đã CHỐT 20/08, code chỉ mới áp trong `[data-screen="cart"]`.)*

### B-2. §1.2 cỡ ngoài thang

| Cỡ | Mobile | Desktop | Ở đâu | Ghi chú |
|---|---|---|---|---|
| **9px** | 30 | 53 | badge số giỏ + nhãn `VISA`/`MASTER` | AUDIT **B3/B4 — user đã cho KỆ** (chờ thay bằng icon thương hiệu) |
| **11px** | 0 | **8** | dòng "Đã thông báo Bộ Công Thương" ở footer | mobile remap `11 → 12`, **desktop không** → lệch 2 bản |
| **16px** | 0 | **6** | `text-[18px] leading-7` ("Gợi ý mua kèm", "Đã xem gần đây") | §1.2 **bỏ hẳn cỡ 16**; desktop remap `18 → 16` tự sinh ra nó |

### B-3. §3.1 sắc viền — 3 tầng, đang có 5

* **`#cfcfcf` — 40 (mobile) / 44 (desktop)**: `.chk` ô tick + `.radio` vòng chọn (`border-border-3`).
  Luật nói gộp vào **V2 `#dfdfdf`**. Đây là tầng viền dùng NHIỀU NHẤT mà không có trong luật nào.
* **`#333` — 16 ở cả 2 bản**: `.opt.on` (thẻ đang chọn ở giỏ + checkout). Luật: → V2, hoặc nếu
  coi là *dấu đang chọn* thì phải là **V1 `#0a0a0a`**. Cần chốt 1 trong 2 (mục D-2).
* **`#f2f2f2` — 4 (mobile)**: `.ck-notice`, `.ck-sec` ở checkout → V3 `#ececec`.
* `transparent` (6/2 chỗ) là chỗ chừa sẵn cho gạch 2px của tab đang chọn — **không phải vi phạm**.

### B-4. §3.2 bo góc

* **`rounded-[3px]` — 30 (mobile) / 54 (desktop)**: nhãn `VISA`/`MASTER`/`TIKINOW` → **B4, đang kệ**.
* **pill không phải hình tròn — 16 (mobile)**: thanh pagination PDP `24×4`, `16×4`.
* **desktop còn 1 pill `9999px`**: badge **"Đang giao"** ở màn đơn hàng — xem B-6.

### B-5. §2.1 mực chữ / §2.2 mặt nền

* **`#999999` — 56 chỗ, RIÊNG DESKTOP**: `.pc-size.is-oos` (dãy size hết hàng trên card).
  Dưới sàn `#666` → không đọc được theo §2.1. Đây là **anh em của AUDIT B6** (`#a3a3a3`, 4 chỗ
  ở `.chip` PDP, có ở cả 2 bản).
* **`#fef2f2` — 19/21 chỗ**: nền hồng badge `-20%`. §2.2 nói **bỏ nền, giữ chữ đỏ**; việc 5 đã
  chốt 20/08 và **đã làm trong màn giỏ**, các màn khác chưa.
* **Chữ đỏ `#d62845` (47/60 chỗ)** là **hợp lệ** (giá giảm + badge + lỗi form) — không tính vi phạm.
* **`glass-95` (8/19 chỗ)** là **chữ ký bộ da** đã hợp lệ hoá §2.2 — không tính vi phạm.
* Confetti màn "Đặt hàng thành công" (4 sắc: `#d62845` `#8a6100` `#999` `#dfdfdf`) = **C3 đang
  chờ user chốt**, không tính.

### B-6. §4.3-4 "khai giống hệt ở cả 2 file" — còn 6 điểm lệch

| # | Điểm lệch | Mobile | Desktop |
|---|---|---|---|
| 1 | remap `text-[16px]` | → 12 | → **14** |
| 2 | remap `text-[18px]` | → 18 (đúng T2) | → **16** (cỡ bị luật bỏ) |
| 3 | remap `text-[24px]` | → 24 (T1) | → **18** |
| 4 | remap `text-[11px]` | → 12 | **không remap** (còn 11px) |
| 5 | **khuôn trạng thái đơn hàng** (AUDIT B2: chấm 6px + chữ 12/16) | ✅ đã áp | ❌ **chưa** — còn pill `#fffbeb` + chữ `#8a6100` + `rounded-full` |
| 6 | nhãn accordion "Bạn có phiếu mua hàng?" | ✅ hoa 500 (vai 5) | ❌ chưa hoa |

*(1–4 chính là bảng §0 của STYLE-RULES, vẫn còn nguyên. §1.2 đòi **2 bản giống hệt nhau**.)*

### B-7. PHÁT SINH TỪ ĐỢT HÔM NAY — 1 điểm, nhỏ

`span.pick-label` trong ô chọn mã đang vẽ **12/18** (tỉ lệ 1.50) trong khi nó là chữ **một dòng
có `truncate`** nằm trong ô cao cố định 40 → theo §1.3 phải là **12/16** (1.33), và theo bảng
bàn giao thì hàng của `Select` là `text-sm` = 12/16.

* Nguyên nhân: markup của `pickField` chỉ khai `text-[14px]`, **không khai `leading`** → rơi về
  `normal` ≈ 1.5. Tức đây là lỗi của **chính component `pickField`**, có từ trước ở checkout
  (ô chọn tỉnh/phường đo cũng 12/18) — hôm nay port sang giỏ thì nó theo sang.
* Sửa: khai cặp cho `.pick-label` (hoặc cho `pickField`) = `12/16`, **cả 2 bản** — 1 rule, sửa
  luôn cả ô chọn ở checkout. Không cần chạm markup.

### B-8. 2 nút nổi tròn — §3.2 + §3.3

Bộ scan ban đầu miễn trừ `#topFab` như công cụ dev, **sai**: §3.3 xếp nó vào **mặt tiền** và ghi
rõ là vi phạm còn lại duy nhất về bóng. Đo tay lại, **giống nhau ở cả 2 bản**:

| Phần tử | Số đo | Luật đòi |
|---|---|---|
| `#topFab` (về đầu trang) | `40×40` · `border-radius 9999px` · **`box-shadow 0 2px 12px rgba(0,0,0,.1)`** · viền V2 | §3.3: **vuông + bỏ bóng**, giữ viền V2 |
| `.quick-add` (mobile) | `36×36` · `9999px` · không bóng | §3.2 câu hỏi 4 — **chờ user chốt**; desktop đã `display:none` |

---

## C. Đối chiếu bộ `shadcn-theme/`

### C-1. Thang chữ đã khớp bảng vai chưa

| Class bàn giao | Ra | Vai | Demo đang có |
|---|---|---|---|
| `.label` | 12/16 · 500 · hoa | T6 nhãn cấp 2 | ✅ đúng: nhãn footer, 2 title cụm ưu đãi ở giỏ, "Tổng cộng" |
| `.label-1` | 14/20 · 500 · hoa | T3 nhãn cấp 1 | ✅ đúng: `.dk-dept`/`.dk-nav-link`/`.ms-tab`/`.search-tab` |
| `text-sm`/`text-xs` | 12/16 | T4 thân bài 1 dòng | ⚠️ phần lớn đang vẽ 12/**20** (B-1) |
| `text-base` | 12/18 | T5 nhiều dòng | ⚠️ như trên |
| `text-lg` | 18/24 | T2 | ⚠️ mobile 18/28 · desktop ra 16 |
| `text-xl`/`2xl` | 24/32 | T1 | ⚠️ mobile 24/33 · desktop 18/32 |
| `text-micro` | 10/14 | T7 (badge giỏ · VISA/TIKINOW) | ❌ đang 9/13.5 và 10/15 (B3/B4 kệ) |

→ **Kết luận:** 2 class nhãn (`.label`, `.label-1`) đã đúng 100%; phần thân bài lệch đúng bằng
khối B-1. Sửa B-1 là bộ demo khớp trọn bảng này.

### C-2. Khuôn component (SHADCN-NOTES §5)

| Component | Hợp đồng | Demo |
|---|---|---|
| Input | cao 40, viền V2 | ✅ `pickField`/`#pbh`/`#vcCode` đều `h-10` + `border` |
| Button CTA | cao 48, chữ **400** | ✅ `h-12`, `font-semibold` bị blanket kéo về 400 |
| Label form | không bao giờ hoa | ✅ |
| Card | viền + không bóng + vuông | ✅ (cột phải desktop, thẻ khuyến mãi) |
| Dialog/Sheet/Popover | viền 1px, không bóng | ✅ khuôn chung lớp nổi |
| Tabs | active = gạch 2px đen | ✅ `.search-tab` |
| Accordion | trigger = nhãn mở mục → `.label` | ⚠️ mobile ✅ · **desktop chưa hoa** (B-6.6) |
| Badge | `-20%` = chữ đỏ **không nền** | ❌ còn nền `#fef2f2` ngoài màn giỏ |
| Badge tròn | chỉ `rounded-full` cho chấm tròn thật | ❌ nhãn VISA `3px` (kệ) |
| Select/menu row | 12/16 | ⚠️ `.pick-label` 12/18 (B-7) |
| Separator | V2, danh sách dày dùng V3 | ⚠️ còn `#f2f2f2`/`#cfcfcf` |
| Checkbox/Radio | vuông, viền V2 | ⚠️ viền `#cfcfcf` (B-3) |

### C-3. Bộ grep review (SHADCN-NOTES §6) — chạy trên demo

| Grep | index.html | desktop.html | Ghi chú |
|---|---|---|---|
| `text-\[` | 573 | 482 | demo là spec, không phải source production — nhưng đây là khối lượng phải chuyển sang `text-sm/base/lg/…` khi port |
| `tracking-\[` | 18 | 9 | runtime đã bị chặn; port thì xoá hẳn |
| `shadow-\[` | **0** | **0** | ✅ |
| `rounded-\[` | 2 | 2 | 2 chỗ `[3px]` (VISA…) |
| `leading-\[` | 2 | 0 | |
| `font-(semibold\|bold\|light)` | 52 | 62 | runtime về 400; preset sẽ giết class |
| Cỡ bị luật bỏ trong markup | `9px`×2 · `11px`×15 · `13px`×51 · `15px`×3 · `22px`×1 · `32px`×1 | `9px`×3 · `11px`×10 · `13px`×36 · `15px`×1 · `32px`×2 | remap runtime bắt hết **trừ 9px (2 bản)** và **11px (desktop)** |
| **Hex trong rule STYLE của bộ da** (§4.3-3) | **12** | **19** | không tính khối định nghĩa token; tất cả đều đã có token sẵn — trừ `#999` (`.pc-size.is-oos`, desktop) chưa có token |

---

## D. Việc nên làm, theo thứ tự

1. **Nhân rộng khối remap-theo-cặp của màn giỏ ra toàn app** (§4.2). Một khối CSS, dứt ~771/1000
   điểm lệch của cả 2 bản. Đây là việc 1+3 đã chốt 20/08 — chỉ còn thi hành.
2. **Đồng bộ bảng remap 2 bản** (B-6.1→4): lấy mobile làm chuẩn vì nó đang khớp T1/T2; desktop
   bỏ hẳn `16` và `11`.
3. **Gộp `#cfcfcf` → V2** (84 chỗ cả 2 bản) và `#f2f2f2` viền → V3. Đổi ở token, không sửa từng chỗ.
4. **`.pick-label` khai cặp 12/16** (B-7) — 1 rule, sửa luôn ô chọn ở checkout, cả 2 bản.
5. **Port 2 việc mobile-only sang desktop**: khuôn trạng thái đơn hàng (B2) + nhãn accordion PBH.
6. **Bỏ nền `#fef2f2` badge `-%` ngoài màn giỏ** (việc 5 đã chốt) — 40 chỗ cả 2 bản.
7. **Thay `#999`/`#a3a3a3` bằng `#666`** cho size hết hàng (58 chỗ) — hoặc đổi cách thể hiện
   "hết hàng" sang gạch ngang/mờ nền thay vì hạ mực (xem D-3 bên dưới).
8. **`#topFab` vuông + bỏ bóng** (§3.3, 1 chỗ mỗi bản) — việc nhỏ nhất trong danh sách, và là
   vi phạm bóng duy nhất còn lại của mặt tiền.
9. **Dọn 31 hex trong rule bộ da** về token; thêm token cho sắc "hết hàng" nếu chọn giữ nó.

## E. 3 chỗ cần user chốt trước khi sửa

1. **`.opt.on` viền `#333`** (16 chỗ, cả 2 bản): nó là *dấu đang chọn* → V1 `#0a0a0a` 1px, hay
   là *kết cấu hộp* → V2 `#dfdfdf`? Khuyến nghị **V1**, vì đang là thẻ được chọn trong nhóm radio.
2. **Vòng `.radio` 2px**: §3.1 nói 2px chỉ cho dấu đang chọn. Vòng radio (cả lúc chưa chọn) đang
   2px. Khuyến nghị **giữ nguyên** và ghi vào §3.1 như ngoại lệ hình-tròn-thật, vì hạ về 1px thì
   vòng radio mảnh hơn ô tick vuông cạnh nó.
3. **"Hết hàng" trên card**: giữ chữ mờ (đang phạm §2.1) hay chuyển sang **gạch ngang chữ + mực
   `#666`**? Khuyến nghị gạch ngang — vẫn đọc được, và bộ da này vốn nhấn bằng đường/kẻ.
4. **`.quick-add` 36×36 tròn ở mobile** (§3.2 câu hỏi 4 vẫn treo): giữ, vuông hoá, hay ẩn như
   desktop? Khuyến nghị **vuông hoá** — giữ được chức năng thêm nhanh mà không còn là vật thể
   tròn duy nhất trên bộ da vuông.

---

*Bộ scan dùng cho báo cáo này có thể chạy lại: nó là 1 hàm `window.__AUDIT(tênMàn)` cài qua
console, đo theo đúng 12 luật ở bảng mục 0. Muốn dò lại sau khi sửa thì cài lại rồi chạy vòng
qua danh sách màn — chi phí 2 lệnh.*
