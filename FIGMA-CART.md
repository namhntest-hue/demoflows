# Trang giỏ hàng dựng vào Figma — 26/08/2026

Đích: file **Test agent** (`XFfjTNMuPfaTeZvdbVIO2F`) → trang **Product card** (`35:592`)
→ section **`Cart · Giỏ hàng — mobile 375 + desktop 1440`**, gồm 4 khối:

| Khối | Khổ |
|---|---|
| `Cart / mobile 375 — Giỏ hàng (5 SP)` | 375 × 3333 |
| `[doc] Cart · mobile 375` | 880 |
| `Cart / desktop 1440 — Giỏ hàng (5 SP)` | 1440 × 2521 |
| `[doc] Cart · desktop 1440` | 880 |

Nguồn đo: **`index.html` @375** và **`desktop.html` @1440**, bộ da vào-trang **`skin-mt skin-li`**,
giỏ 5 SP + 2 nhóm quà tặng. Mọi con số dưới đây là **computed style đo trên trang đang chạy**,
không phải đọc từ class.

**Phần 1–9 = bản mobile. Bản desktop ở Phần 10.**

---

## 1. Khung trang (mobile 375)

| | |
|---|---|
| Khổ frame | **375 × 3333** (đúng chiều cao nội dung `.w-full` = 3332,6) |
| Số khối | 10 khối xếp theo toạ độ đo thật + 1 sticky CTA đè đáy |
| Khoảng hở giữa các khối | chỉ 2 chỗ, đều là margin: **12** trước khối khuyến mãi, **16** trước chân trang |

| # | Khối | y | cao |
|---|---|---|---|
| 1 | header · navbar (glass-95) | 0 | 48 |
| 2 | tiêu đề trang | 48 | 56 |
| 3 | hàng · chọn tất cả | 104 | 34,8 |
| 4 | danh sách SP (5 hàng + 1 nhóm quà) | 138,8 | 1018,2 |
| 5 | quà tặng theo đơn | 1157 | 193,8 |
| 6 | chương trình khuyến mãi | 1362,8 | 166,6 |
| 7 | tổng kết đơn | 1529,4 | 254 |
| 8 | CTA + phiếu mua hàng | 1783,4 | 132 |
| 9 | cam kết dịch vụ | 1915,4 | 368 |
| 10 | footer · dùng chung | 2299,4 | 1033,2 |
| — | sticky CTA (đè lên đáy) | 3245 | 88 |

> **Bẫy đã vá khi đo:** các khối `.rise` / `.reveal` mang `translateY(10px)` / `translateY(14px)`
> khi chưa chạy hiệu ứng vào-màn. Đo lúc chưa "reveal" sẽ ra sai toạ độ **và** làm 2 khối chồng nhau
> 10px. Bảng trên là toạ độ **đã trừ transform**.

---

## 2. Màu — cả trang chỉ 6 mặt nền, 3 kẻ, 5 mực

| Vai | Hex | Biến | Dùng ở |
|---|---|---|---|
| nền trang / thẻ | `#ffffff` | `background` | thân trang, ảnh quà, ô input, chip thanh toán |
| nền nhấn | `#0a0a0a` | `primary` | nút Đặt hàng/Đăng ký, checkbox bật, badge Quà tặng, chấm đếm giỏ |
| nền khối xám | `#f2f2f2` | `secondary` | ô ảnh SP, khối tổng kết, chân trang |
| **nền khối nhấn nhẹ** | `#f7f7f7` | **`accent-0` (MỚI)** | 2 nhóm quà tặng |
| kẻ 1px dạng nền | `#dfdfdf` | `border` | 2 đường kẻ ngang trong chân trang |
| nền thanh dính | `#ffffff` 95% | `surface-sticky` | header |
| kẻ thường | `#dfdfdf` | `border` | ô chọn mã, input, chip, accordion chân trang |
| kẻ đậm | `#0a0a0a` | `border-strong` | viền checkbox |
| kẻ mảnh | `#ececec` | `border-subtle` | vách hàng SP, hộp khuyến mãi, vách dưới hàng chọn tất cả |
| mực chính | `#0a0a0a` | `foreground` | |
| mực phụ | `#333333` | `secondary-foreground` | tên SP, mô tả cam kết, số lượng |
| mực nhạt | `#666666` | `muted-foreground` | biến thể, giá gốc gạch, chân trang |
| mực trên nền đen | `#ffffff` | `primary-foreground` | |
| mực cảnh báo | `#d62845` | `destructive` | giá giảm + chip `-20%` |

**Kết quả bind:** 181 nền + 28 kẻ — **bind 100%, không còn màu chết**.
Ngoài ra 9 fill ảnh và 1 gradient (nền mờ của sticky CTA, `white/0 → white/95 → white`).

### 2 biến mới đã tạo
- `Primitives / gray/50` = `#f7f7f7`
- `Color / accent-0` → alias `gray/50`

Lý do: demo dùng `bg-accent-0` cho nhóm quà tặng nhưng bộ biến chưa có nấc này
(`accent` đang là `#f2f2f2`, đậm hơn 1 nấc).

---

## 3. Kẻ, bo góc, bóng

- **Mọi đường kẻ dày 0,8px** (hairline của skin-mt) — không phải 1px.
- **Bo góc 0 ở mọi thành phần.** Ngoại lệ duy nhất: chấm đếm giỏ trên icon túi (`radius/full`).
  Các class `rounded-md` / `rounded-xs` / `rounded-[3px]` trong markup đều bị skin-mt vuông hoá.
- **Không có bóng đổ ở bất kỳ đâu** (đúng hướng phẳng đã chốt).

---

## 4. Chữ — 6 tổ hợp, 5 khớp style, **1 còn thiếu**

| Tổ hợp đo được | Text style | Số node | Vai |
|---|---|---|---|
| 24/32 · 400 · Libre Bodoni | `heading 1` | 3 | tiêu đề trang, tiêu đề newsletter |
| 12/18 · 400 · Inter | `paragraph/regular` | 67 | thân bài nhiều dòng |
| 12/16 · 400 · Inter | `paragraph small/regular` | 32 | hàng danh sách, biến thể, giá gốc |
| 12/16 · 500 · Inter · HOA | `paragraph mini/medium` | 10 | nhãn Ưu đãi, Tổng cộng, nhãn chân trang |
| 10/14 · 400 · Inter | `paragraph micro/regular` | 9 | chấm giỏ, badge Quà tặng, chip VISA… |
| **14/20 · 400 · Inter · thường** | **CHƯA CÓ** | **8** | thương hiệu trên hàng SP (5), nhãn nút Đặt hàng (2) / Đăng ký (1) |

**Việc chờ chốt:** bậc 14/20 · Regular · chữ thường đang set tay trên 8 node.
Đây đúng là vai đã ghi danh trong `FONT-LIBRE-INTER.md` §13.13 (nút hành động 14/20·400·thường),
nhưng file Figma chưa có style tương ứng. Cần chốt **tên style** rồi gắn — đề xuất
`paragraph large/regular`, nhưng tên này lệch khỏi cách đặt hiện hành
(`paragraph small/medium` đang là 14/20 Medium HOA) nên xin ý kiến trước khi tạo.

---

## 5. Đệm & khoảng cách

**199 giá trị đã bind** vào thang `Spacing` (0·4·8·12·16·20·24·32·40·48·64).

**25 giá trị nằm ngoài thang, chưa có biến** — gom về 5 mức:

| Giá trị | Số lần | Chỗ dùng |
|---|---|---|
| 2 | 11 | gap giá ↔ số lượng, đệm dọc badge Quà tặng |
| 6 | 7 | gap dòng khối cam kết, gap chip thanh toán |
| 10 | 2 | đệm ngang chip TIKINOW |
| 14 | 4 | gap icon ↔ chữ khối cam kết |
| 36 | 1 | đệm phải ô "Chọn mã ưu đãi" (chừa chỗ mũi tên) |

Hoặc bổ sung 5 nấc này vào thang Spacing, hoặc nắn demo về thang sẵn có — cần chốt.

---

## 6. Lệch có ghi danh so với demo

**Giá 2 dòng ở 3 hàng có chip giảm giá.** Trong demo, ô giá chỉ rộng 84px
(125 − 4 gap − 37 chip) còn chuỗi `72.557.000 ₫` cần nhỉnh hơn 84px một chút,
nên ký tự **₫ rớt xuống dòng 2** → khối giá cao 56 thay vì 38.

Đo được ở 3 hàng: `72.557.000 ₫` · `35.248.000 ₫` · `17.575.000 ₫` (đều có `-20%` / `-30%` / `-15%`).
Hai hàng không có chip giảm thì giá vẫn 1 dòng bình thường.

**Bản Figma dựng ĐÚNG Ý ĐỒ (giá 1 dòng)**, nên ở 3 hàng đó khối giá + số lượng
nằm thấp hơn demo **18px** (do `justify-between` đẩy xuống đáy). Chiều cao hàng
vẫn giữ nguyên 166 / 170 đúng như đo.

→ **Việc cho demo:** nới ô giá hoặc cho `white-space: nowrap` để ₫ không rớt dòng.

---

## 7. Trạng thái dựng

- Accordion **"Bạn có phiếu mua hàng?"** và **3 accordion chân trang**: để **ĐÓNG**.
- Hộp **chương trình khuyến mãi**: trạng thái **thu gọn** (peek cao 73, cắt tràn) —
  đúng như demo lúc mới mở trang, dưới là nút "Xem tất cả 3 chương trình".
- Sticky CTA dựng ở đáy trang (vị trí nghỉ của thanh `fixed`).

---

## 8. Ảnh

7 ảnh sản phẩm + logo nhúng dạng JPEG nén (160×213 cho SP, 186×39 cho logo) để file tự chứa.
Tên layer giữ nguyên tên file gốc (`img/p1-0.jpg`, `img/logo.png · 93×20 (contain)`…)
→ thay bằng ảnh gốc trong `assets/` khi ráp thật.

> Ghi chú kỹ thuật: plugin Figma **không fetch được mạng** (kể cả `localhost`),
> nên ảnh phải nhúng qua `figma.base64Decode`. Chuỗi base64 dài dễ sai ở đoạn ký tự lặp —
> cách chạy được là sinh chuỗi dưới dạng biểu thức JS có `'A'.repeat(n)` rồi kiểm tra
> lại `b64len` sau mỗi lần nạp.

---

## 10. Bản desktop 1440

> Đo `desktop.html` @1440. **Phải ép ẩn thanh cuộn** (`scrollbar-width:none`) trước khi đo,
> nếu không `#viewport` chỉ còn 1425.

### 10.1 Khung

Khung **1440 × 2521**, 4 khối:

| # | Khối | y | cao |
|---|---|---|---|
| 1 | header · 3 tầng | 0 | 160,8 |
| 2 | nội dung chính | 160,8 | 1588,4 |
| 3 | cam kết dịch vụ (lưới 4 cột) | 1749,2 | 156 |
| 4 | footer · dùng chung | 1921,2 | 599 |

**Header 3 tầng:** promo strip 32 (nền `primary` ĐEN, chữ trắng 12/18 canh giữa) →
hàng chính 64 (`surface-sticky`; trái 3 nút ngành hàng h36 px16 T6 — "Nam" đang mở dùng mực
`foreground`, 2 nút kia `muted-foreground`; logo 93×20 ở giữa; phải: nút tìm 44 · nút ngôn ngữ
h36 px12 khe 8 (cờ 20×14 + "ENG") · nút tài khoản 44 · nút giỏ 44 + chấm đếm 15) →
hàng nav 64,8 (kẻ dưới 0,8 `border-subtle`, 8 mục h36 px16 T6, mục "Khuyến mãi" mực
`destructive`, 7 mục còn lại `secondary-foreground`).

**Nội dung chính:** đệm 24/24/**80**, hai cột khe 40.

| Cột | Rộng | Nội dung |
|---|---|---|
| trái | 925 | tiêu đề 64 → chọn tất cả 34,8 → danh sách 1013,2 → quà theo đơn 193,8 → khuyến mãi 166,6 (margin-top 12) |
| phải | 427 | card "Tóm tắt đơn hàng" 397,6 — **dính khi cuộn** |

**Card tóm tắt** (viền 0,8 `border`, nền `card`): tiêu đề 64 (24/32 Libre Bodoni) → thân
đệm 0/16/16/16 khe 16: chọn mã ưu đãi (nhãn T6 + ô 393,4×40, đệm 0/36/0/12) · dòng tiền 120
(Tạm tính h28 py6 · Tổng cộng h56 · điểm thưởng h36) · nút Đặt hàng 393,4×48 · accordion
phiếu mua hàng h36.

### 10.2 Sáu điểm KHÁC bản mobile (không phải phóng to)

1. **Không có thanh CTA dính đáy** — nút Đặt hàng nằm trong card bên phải.
2. **Header 3 tầng** thay cho một thanh 48.
3. **Khối cam kết** đổi từ 4 hàng dọc sang **lưới 4 cột 324, khe 32**, đệm dọc 48.
4. **Chân trang trải 5 cột** (thương hiệu 342 + 4 cột 238,5 khe 24) thay cho 3 accordion đóng.
5. **Newsletter canh giữa**, ô nhập 390 + nút 90, cao **40** (mobile 36).
6. **Khối pháp lý** 2 dòng canh giữa thay khối trái 3 dòng.

### 10.3 Hàng sản phẩm — cùng markup, khác chiều cao

Markup y hệt mobile (đệm 16 · khe 8 · ô chọn 16 · ảnh 100×133) nhưng cột nội dung rộng
**761** thay vì 211.

→ Giá **không rớt dòng**, nên hàng cao **165** (hàng đầu) / **165,8** (có kẻ trên 0,8)
thay vì 170/166. Chiều cao lúc này do **ảnh 133 + đệm 32** quyết định, không phải nội dung.
Nhóm quà tặng vẫn đúng **185** ở cả hai bản.

### 10.4 Bind

| | |
|---|---|
| Nền + kẻ | **206 + 27** |
| Đệm / gap | **209** giá trị |
| Text style | 129/136 node |
| Ảnh | 9 fill (dùng lại đúng hash ảnh của bản mobile) |

**Ngoại lệ có chủ đích:** icon **cờ Anh** trên nút đổi ngôn ngữ giữ nguyên màu gốc
(`#012169` · `#ffffff` · `#c8102e`) — cùng loại với wordmark DAFC, không quy về biến.

**Đệm ngoài thang:** 2 (khe giá↔số lượng; đệm dọc link chân trang `py-0.5`, 19 chỗ) ·
6 · 10 · 36 · **80** (đệm dưới khối nội dung chính — **nấc 80 chỉ có ở desktop**).

### 10.5 Lệch có ghi danh (desktop)

Dòng bản quyền trong `desktop.html` viết **HOA TOÀN BỘ**
("© COPYRIGHT 2026 DAFC — CÔNG TY CỔ PHẦN…") — là chữ hoa **thật trong DOM**, không phải
`text-transform`. Bản Figma dựng theo **luật dự án** (chỉ hoa chữ đầu).
→ Việc cho demo: sửa lại chuỗi trong `desktop.html`.

---

## 11. Việc còn mở

1. **Chốt tên text style cho bậc 14/20 · Regular · thường** — 8 node ở mobile, 7 node ở desktop.
2. **Chốt các nấc spacing ngoài thang**: 2 · 6 · 10 · 14 · 36 (cả 2 bản) + **80** (chỉ desktop).
   Thêm biến hay nắn demo về thang sẵn có.
3. **Sửa lỗi ₫ rớt dòng** ở 3 hàng có chip giảm giá trong `index.html` (xem Phần 6).
   Desktop không dính lỗi này.
4. **Sửa dòng bản quyền viết hoa toàn bộ** trong `desktop.html` (xem 10.5).
5. Cập nhật khối `[doc] Header` (dựng 20/08) — promo strip nay là **nền đen chữ trắng**,
   không phải "nền xám" như ghi chú cũ.
6. Trang đang nằm trong page tên **"Product card"** (page trống lúc nhận việc).
   Nếu muốn, tách sang page riêng tên "Cart".
