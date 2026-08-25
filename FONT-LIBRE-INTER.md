# Luật font — cặp **Libre Bodoni + Inter**

> Chốt 25/08/2026, sau khi **khách chọn cặp Inter + Libre Bodoni**. Văn bản quy phạm cho phần
> MẶT CHỮ; mọi luật khác vẫn do `STYLE-RULES.md` phân xử.
> `STYLE-RULES.md` §1.6 tự đặt điều kiện: *"nếu sau này chốt dùng thật một cặp thì phải sửa
> mục 1.6 trước, rồi mới đưa vào bộ da"* — file này là bước đó.
>
> **Phạm vi áp (25/08/2026):** `skin-mp` (Editorial) khai thẳng bằng CSS, **Maika**
> (`skin-mt skin-mk`) thừa hưởng trọn vẹn, và **`skin-li`** (`skin-mt skin-li`) là bộ da
> DUY NHẤT mà Libre Bodoni thật sự vẽ ra được — xem Phần 10, 11, 12 và 13.
> `skin-mt` vẫn Montserrat cho tới khi khách nói khác.
>
> **Bảng chuẩn của cặp font, sau khi chuẩn hoá, ở `Phần 13.1`** — một câu luật:
> *từ 18 trở lên là Libre Bodoni chữ thường · dưới 18 là Inter · lớp nổi luôn Inter.*
>
> *(File này đổi tên từ `FONT-MAIKA.md` ngày 25/08 — cặp font nay không còn là chuyện riêng
> của Maika nữa.)*

---

## Phần 0 — Số đo, không phải cảm nhận

Đo trên trình duyệt thật, chuẩn hoá 100px, đã ép tải đúng subset tiếng Việt trước khi đo:

| | Montserrat *(skin-mt)* | **Inter** *(thân bài Maika)* | **Libre Bodoni** *(trưng bày Maika)* |
|---|---|---|---|
| x-height | 53 | **55** *(thực đo 54,5)* | **45** |
| cap-height | 70 | 73 | **76** |
| dấu `ệ` | 73 | 76 | 73 |
| dấu `ằ` | 83 | **93 — cao nhất bảng** | 82 |
| dấu `ữ` | 73 | 75 | 69 |
| chân chữ (`p`) | 20 | 21 | **32** |
| rộng "Nhận thông báo khi có hàng" | 1438 | 1332 *(−7,4%)* | 1248 *(−13,2%)* |
| rộng "NHẬN THÔNG BÁO" 500 | 985 | 926 | 941 |
| nét mảnh nhất | — | — | **0,031 × cỡ chữ** |

**Tiếng Việt: cả hai font ĐẠT.** Tải CSS thật từ `fonts.googleapis.com` ngày 25/08 — Inter có
subset `vietnamese` (2 khối `unicode-range` chứa U+1EA0), Libre Bodoni có ở **cả 3 kiểu** đã
xin (400 · 500 · italic 400). Không rơi fallback cho dấu hai tầng.

> **Bẫy khi đo lại:** `document.fonts.load(spec)` không kèm chuỗi thì chỉ kéo subset latin —
> đo dấu tiếng Việt sẽ ra số của font dự phòng. Lần đo đầu đã sập đúng bẫy này: `ằ` ra **89
> giống hệt nhau** ở cả Inter lẫn Libre Bodoni. Phải `document.fonts.load(spec, 'ệằữ…')`.

---

## Phần 1 — F1: Libre Bodoni là mặt chữ TRƯNG BÀY, không phải mặt tiêu đề

Nét mảnh nhất của Libre Bodoni = **0,031 × cỡ chữ**. Quy ra pixel thật:

| Cỡ | Nét mảnh (CSS px) | Màn 1× | Màn 2× |
|---|---|---|---|
| 12 · 14 · 18 | **0,50** | ✗ mờ thành xám | 1,0 — vừa đủ |
| 24 | **0,75** | ✗ mờ thành xám | 1,5 |
| **32** | **1,00** | ✓ sống | 2,0 |
| 48 | **1,63** | ✓ sống | 3,3 |

Dưới 32px, nét mảnh của Didone rơi xuống dưới 1 pixel thiết bị trên màn thường và bị khử
răng cưa bôi thành xám nhoè. Mất nét mảnh là **mất chính thứ làm nên Didone** — tương phản
nét đậm/nét mảnh. Chữ không "xấu đi một chút", nó thôi không còn là Bodoni nữa.

> **F1 — Libre Bodoni chỉ dùng khi nét mảnh đạt ≥ 1 pixel THIẾT BỊ.**
> Quy ra sàn cỡ: **màn 1× → 32** · **màn ≥2× → 24**. Mọi bậc dưới sàn là Inter, kể cả
> `h1/h2/h3` — ranh giới là bậc cỡ, không phải thẻ.

*(Tinh chỉnh 25/08 khi áp cho skin-mp: bản đầu chốt sàn 32 tuyệt đối, nhưng điều kiện thật là
pixel THIẾT BỊ chứ không phải CSS px. Ở cỡ 24 nét mảnh = 0,74 CSS px — trên màn 2× thành
1,49 device px, thừa sống. Mà mọi điện thoại đều ≥2×. Thi hành bằng
`@media (min-resolution: 2dppx)`: cỡ 48 luôn Bodoni, cỡ 24 chỉ Bodoni khi màn đủ dày, màn 1×
rơi về Inter — mất chất Didone còn hơn vẽ ra chữ xám nhoè.)*

**Đây là sửa một lỗi đang có thật trong code.** Rule hiện tại giao `--font-head` cho
`h1, h2, h3, .text-[48px], .text-[32px], .text-[24px], .text-[18px]` — tức Libre Bodoni đang
chạy ở **cả bậc 18 và 24**, hai bậc mà nét mảnh chỉ còn 0,5–0,75px. Nó còn bắt theo **thẻ**
`h1/h2/h3`, mà thẻ không nói lên cỡ: một `h2` cỡ 24 vẫn ăn Bodoni. Selector mới phải bắt theo
**bậc trưng bày**, không theo thẻ.

**Đã kiểm chứng trên trang chạy** (bật Maika bằng `applySkin('maika')`, đo `getComputedStyle`):
`.text-[18px]` — **6 phần tử đang hiện**, trong đó có nhãn "Bộ lọc" — vẽ ra **18px bằng
`Libre Bodoni`**, tức đúng bậc mà nét mảnh chỉ còn 0,5 CSS px. Không phải suy từ selector.

---

## Phần 2 — F2: mở đúng 2 bậc trưng bày, T0 và T00

`STYLE-RULES` §1.2 đóng thang ở 24 vì mytheresa không có bậc cao hơn. Maika cần chỗ cho Libre
Bodoni sống, nên mở thêm 2 bậc — **không phải bịa bậc mới**: 32 và 48 vốn đã có sẵn trong
thang text style Figma của dự án.

Nhịp dòng suy trực tiếp từ số đo, không áng chừng. Điều kiện không chạm dòng:
`dòng ≥ dấu ằ + chân chữ` = `0,82 + 0,32` = **1,14 × cỡ** với Libre Bodoni.

| Bậc | Cỡ / dòng | Tỉ lệ | Mực thoáng còn lại | Vai |
|---|---|---|---|---|
| **T00** | **48 / 60** | 1,25 | 5,28px | hero chiến dịch |
| **T0** | **32 / 40** | 1,25 | 3,52px | tiêu đề mục lớn, tên bộ sưu tập |

`T0` **không phải bậc mới hoàn toàn**: đo trên trang cho thấy `skin-mp` (nền của Maika) đã vẽ
`.text-[32px]` ra đúng **32px / dòng 40px** rồi. Luật này chỉ đang ghi danh và đóng khung nó,
cộng thêm `T00` còn thiếu.

**Ở khổ mobile: hạ một bậc, nhưng KHÔNG bao giờ xuống dưới 32.** mytheresa hạ bậc trưng bày
đúng một nấc khi sang mobile (20/28/48 → 18/24/28, cùng đúng 17 phần tử). Maika theo *nguyên
tắc* đó nhưng không theo *con số*: `T00` 48 → **32** ở mobile, `T0` **giữ 32**. Tức mobile chỉ
còn một bậc trưng bày. Lý do ở Phần 9 — sàn 32 là hệ quả của mặt chữ, không phải của khổ màn.

> **48/56 là SAI** — chỉ còn **1,28px** thở, dấu `ằ` dòng dưới chạm chân chữ dòng trên.
> Chân chữ Libre Bodoni sâu 32/100 (Inter 21, Montserrat 20) nên bậc trưng bày phải nới hơn
> thói quen thường thấy của display type.

---

## Phần 3 — F3: KHÔNG dùng `font-size-adjust` trong Maika

Cặp `couture` hiện khai `adj: 0.53` — chuẩn hoá x-height về **Montserrat**. Bỏ.

Đo thực tế ở cỡ 24px (bề rộng chuỗi "Nhận thông báo"):

| | không adjust | `ex-height .53` | `ex-height .55` |
|---|---|---|---|
| Inter | 188,56 | **183,24 → co 2,8%** | ≈ không đổi (+0,8%) |
| Libre Bodoni | 178,13 | 208,53 *(+17,1%)* | 216,11 *(+21,3%)* |

Ba lý do bỏ hẳn:

1. **`adj .53` bóp nhỏ chính thân bài.** Neo về Montserrat làm Inter co 2,8% — chữ khai 12px
   vẽ ra ~11,7px, mà thang dự án cấm bậc 11 (§1.2). Neo vào Montserrat còn là neo vào một mặt
   chữ **không còn trong thương hiệu**.
2. **Bậc 32/48 đã chữa xong đúng cái bệnh** mà `font-size-adjust` sinh ra để chữa (nét mảnh
   quá nhỏ). Giữ tiếp là chữa hai lần một bệnh, và lần thứ hai gây tác dụng phụ.
3. **Nó phá tiền đề của luật.** §1.3 bắt cỡ và dòng luôn đi thành cặp KHAI RA.
   `font-size-adjust` làm cỡ *dùng thật* khác cỡ *khai*, nên mọi phép tính nhịp dòng ở Phần 2
   sai theo — ví dụ T0 32/40 với `adj .55` vẽ ra thân chữ của cỡ 38,8px, cần dòng 44 chứ
   không phải 40.

**Đã kiểm chứng trên trang chạy:** với Maika đang bật, `document.body` có
`font-size-adjust: 0.53` thật, và một đoạn thân bài khai **`font-size: 12px`** đo ra bề rộng
119,95px so với 123,34px lúc tắt adjust — **co 2,75%**, tức cỡ vẽ ra thật là **11,67px**.
Đúng bậc 11 mà §1.2 cấm. Cùng phép đo: `ex-height .55` cho 124,20px — lệch +0,7% so với
không adjust, tức trung tính với Inter.

> **F3 — Maika không khai `font-size-adjust` ở bất kỳ đâu. Cỡ khai ra là cỡ vẽ ra.**

---

## Phần 4 — F4: bảng vai đầy đủ của Maika

Toàn bộ luật gói trong một bảng. Libre Bodoni giữ đúng 2 bậc trên cùng; Inter giữ tất cả phần
còn lại.

| Mã | Vai | Cỡ / dòng | Mặt chữ | Đậm | Hoa | Tracking |
|---|---|---|---|---|---|---|
| `T00` | Trưng bày lớn — tiêu đề hero chiến dịch | 48 / 60 | **Libre Bodoni** | 400 | không | 0,5px |
| `T0` | Trưng bày — tiêu đề mục biên tập | 32 / 40 | **Libre Bodoni** | 400 | không | 0,5px |
| `T1` | Tiêu đề trang | 24 / 32 | Inter | 400 | không | 0,5px |
| `T2` | Tiêu đề mục · sheet · modal | 18 / 24 | Inter | 400 | không | 0,5px |
| `T3` | Nhãn cấp 1 | 14 / 20 | Inter | 500 | **có** | 0,5px |
| `T4` | Thân bài **một dòng** | 12 / 16 | Inter | 400 | không | 0,5px |
| `T5` | Thân bài **nhiều dòng** | 12 / 18 | Inter | 400 | không | 0,5px |
| `T6` | Nhãn cấp 2 | 12 / 16 | Inter | 500 | **có** | 0,5px |
| `T7` | Vi mô | 10 / 14 | Inter | tuỳ vai | tuỳ vai | 0,5px |

Luật cặp **500 ⇔ CHỮ HOA** của §1.1 giữ nguyên. Không có 300 · 600 · 700.

**Tracking: 0,5px cho MỌI vai, kể cả bậc trưng bày — 0 chỗ lệch §1.4.**
*(Sửa 25/08 sau khi đo mytheresa: bản nháp trước cho `T0`/`T00` về `0` và thêm một vai `T0h`
chữ hoa +2px. Cả hai đều bỏ — xem Phần 9, mytheresa giữ đúng 0,5px trên **100% phần tử ở cả
hai khổ**, kể cả mặt chữ trưng bày cỡ 48. Lập luận "serif tự có nhịp" của tôi là quy ước
sách vở, không phải số đo; luật §1.4 một-giá-trị thắng.)*

**Chữ hoa thuộc về Inter, KHÔNG thuộc Libre Bodoni.** Đo mytheresa: toàn bộ chữ hoa của họ
chạy trên mặt chữ THÂN BÀI (12/16.8 và 14/18.2), mặt chữ trưng bày **không có lấy một phần tử
viết hoa** — nó chỉ mang tiêu đề biên tập viết thường. Nên `T3`/`T6` (Inter, 500, hoa) lo hết
vai nhãn; bậc trưng bày không đẻ thêm vai hoa nào.

Thân bài Inter giữ 0,5px dù hẹp hơn Montserrat 7,4%: dòng ngắn lại ~7% — ít gãy dòng hơn,
đúng hướng, không cần bù.

---

## Phần 5 — F5: dấu tiếng Việt của Inter cao nhất bảng ⇒ 12/16 thành luật cứng

Dấu `ằ` của Inter cao **93/100**, hơn Montserrat (83) một bậc rõ. Mực thoáng còn lại giữa hai
dòng liền nhau (`dòng − dấu ằ − chân chữ`):

| | Montserrat 12/16 | **Inter 12/16** | **Inter 12/18** |
|---|---|---|---|
| Thoáng còn lại | 3,64px | **2,32px** | 4,32px |

12/16 với Inter **chưa chạm nhau**, nhưng chỉ còn 2,32px — mọi sai số nhỏ (font dự phòng chớp
lúc tải, zoom trình duyệt, dấu `ẳ`/`ẵ`) là dính.

> **F5 — Trong Maika, bậc 12/16 (`T4`/`T6`, tức `.t-ui`) CHỈ dùng cho chữ chắc chắn một dòng.**
> Chữ có thể xuống dòng phải dùng 12/18 (`T5`, tức `.t-copy`). Ở skin-mt đây là chuyện nhịp;
> với Inter nó thành chuyện **chạm dấu**.

Việc kèm theo khi bật Maika: rà mọi chỗ đang dùng 12/16 cho chữ nhiều dòng, chuyển sang 12/18.
Cách phân xử vẫn là câu hỏi cũ: *"chữ này có xuống dòng không?"*

---

## Phần 6 — F6: italic hiện đang là ĐỒ GIẢ

Thẻ `<link>` đang xin `Libre+Bodoni:wght@400;500` — **không có `ital`**. Đo: bề rộng chuỗi ở
`italic 400` và `400` **bằng nhau đúng 713px** ⇒ trình duyệt đang **nghiêng giả** (oblique
tổng hợp), tức kéo xiên chữ đứng.

Với Didone đây là lỗi thấy được bằng mắt: italic Bodoni thật là một thiết kế thư pháp riêng
(chữ `a` một tầng, chân chữ vuốt), không phải chữ đứng nghiêng đi.

> **F6 — Hoặc thêm `ital,wght@0,400;0,500;1,400` vào `<link>`, hoặc CẤM italic trong Maika.**
> **Khuyến nghị: thêm.** Đã verify 25/08 — bản `ital` của Libre Bodoni **có subset
> `vietnamese`**, không phải thêm request nào ngoài chính nó.

---

## Phần 7 — F7: chuỗi dự phòng *(còn mở)*

Chuỗi hiện tại `'Libre Bodoni', ui-serif, Georgia, serif`. Georgia là serif màn hình x-height
cao, tương phản thấp — gần như đối lập với Didone, nên lúc font chưa về (`display=swap`) tiêu
đề 48px nhảy rất lộ.

Hai hướng chưa chốt: đặt `size-adjust` trên `@font-face` dự phòng để bớt nhảy, hoặc dùng
`display=optional` cho riêng bậc trưng bày. Không chặn phần trên.

---

## Phần 8 — Việc phải sửa trong code *(CHƯA áp, chờ duyệt)*

| # | Việc | Chỗ | Loại |
|---|---|---|---|
| 1 | `.font-pair` bỏ `text-[18px]` · `text-[24px]` · `h1/h2/h3` khỏi selector, bắt theo bậc trưng bày 32/48 | khối "CẶP FONT THỬ", 2 file html | **sửa lỗi** |
| 2 | Cặp `couture`: bỏ `adj`; `headLs` `-0.2px` → **`0.5px`** (không phải `0` — sửa 25/08 theo Phần 9); giữ `headLh 1.25` | `FONT_PAIRS` | **sửa lỗi** |
| 3 | Mở 2 bậc `T0` 32/40 và `T00` 48/60 — **chỉ trong phạm vi Maika** | CSS bộ da | mở rộng |
| 4 | Thêm `ital` cho Libre Bodoni vào `<link>` (nếu duyệt F6) | 2 file html | mở rộng |
| 5 | Rà 12/16 dùng cho chữ nhiều dòng → 12/18 | toàn app, khi bật Maika | mở rộng |
| 5b | Rà khẩu phần F8: đếm phần tử dùng Libre Bodoni, kéo về ≤ 4% và chỉ ở tiêu đề chiến dịch/biên tập | toàn app, khi bật Maika | mở rộng |
| 5c | Bậc trưng bày ở mobile: `T00` 48 → 32, `T0` giữ 32 (mobile chỉ còn 1 bậc trưng bày) | CSS bộ da | mở rộng |
| 6 | §1.6 ghi rõ: miễn trừ 2 mặt chữ nay là **trạng thái thật của Maika**, không còn là công cụ thử | `STYLE-RULES.md` | tài liệu |

Mục 1 và 2 là **sửa lỗi đang chạy**: Bodoni đang được giao cho cỡ nó không sống được, và thân
bài đang bị bóp 2,8%. Mục 3–5 là mở rộng theo luật mới.

---

## Phần 9 — Đối chiếu mytheresa: họ cũng chạy 2 mặt chữ

Đo trực tiếp trên `mytheresa.com/int/en/women`, `getComputedStyle` mọi phần tử **đang hiện và
có chữ trực tiếp**, ở cả hai khổ (site chặn curl nên phải mở bằng trình duyệt thật).

| | Desktop 1280 | Mobile 375 |
|---|---|---|
| Phần tử có chữ | 446 | 492 |
| **Tổ hợp typo trên cả trang** | **10** | **10** |
| Mặt chữ thân bài | `AvenirNextLTPro-Medium` | như trên |
| Mặt chữ trưng bày | `OptimaLTPro-Roman` | như trên |
| Nhịp thân bài | 12 / 16,8 *(×325)* | 12 / 16,8 *(×366)* |
| Bậc của mặt trưng bày | **20 · 28 · 48** | **18 · 24 · 28** |
| Số phần tử dùng mặt trưng bày | **17 = 3,8%** | **17 = 3,5%** |
| Tracking | **0,5px — 100% phần tử** | **0,5px — 100% phần tử** |
| Độ đậm | **400 — 100% phần tử** | **400 — 100% phần tử** |

Mặt chữ trưng bày của họ xuất hiện đúng 3 chỗ, **y hệt nhau ở cả hai khổ**:
`bigbanner__copy__title` · `productcarousel__title` · `twotopics__item__copy__title` — toàn bộ
là tiêu đề chiến dịch/biên tập, viết thường, **không có phần tử nào viết hoa**.

### 9.1 Ba điều lấy về, đã sửa vào luật

1. **Tracking 0,5px cho cả mặt chữ trưng bày.** Bản nháp của tôi cho `T0`/`T00` về `0` theo quy
   ước "serif tự có nhịp". Mytheresa giữ 0,5px kể cả ở cỡ 48. Đã bỏ chỗ lệch — Phần 4 nay
   **0 chỗ lệch §1.4**.
2. **Chữ hoa chạy trên mặt THÂN BÀI, không trên mặt trưng bày.** Đã bỏ vai `T0h` tôi tự thêm.
   Vai nhãn do `T3`/`T6` (Inter 500 hoa) lo trọn.
3. **Hạ một bậc khi sang mobile** — lấy nguyên tắc, không lấy con số (xem 9.3).

### 9.2 F8 — khẩu phần mặt chữ trưng bày

> **F8 — Libre Bodoni là gia vị, không phải nguyên liệu.** Đích: **≤ 4% số phần tử có chữ**, và
> chỉ ở tiêu đề chiến dịch / biên tập. Không dùng cho tiêu đề UI, tên sản phẩm, tiêu đề mục
> thông thường — những chỗ đó là Inter.

Đây là luật dễ vi phạm nhất trong cả file, vì cám dỗ tự nhiên là "font đẹp thì dùng nhiều".
Mytheresa dùng nó đúng **17 lần trên một trang chủ**, không đổi giữa hai khổ.

### 9.3 Ba điều CỐ Ý không lấy

**a. Sàn cỡ 18–20 của họ.** Đo nét mảnh nhất của hai mặt chữ trưng bày:

| | tỉ lệ nét mảnh / cỡ | đạt 1 CSS px ở cỡ |
|---|---|---|
| `OptimaLTPro-Roman` *(mytheresa)* | **0,040** | **24** |
| `Libre Bodoni` *(Maika)* | **0,031** | **32** |

Nét mảnh Optima **dày hơn 29%** so với cỡ chữ. Optima là mặt chữ nhân văn tương phản thấp,
không có hairline thật; Libre Bodoni là Didone tương phản cao. Họ xuống được 18–20px vì mặt
chữ của họ cho phép. Bê con số 20 sang Maika là **copy kết quả mà bỏ nguyên nhân** — đúng thứ luật
"tham chiếu ≠ bê nguyên" của dự án cấm. Sàn 32 của F1 giữ nguyên.

**b. Một độ đậm duy nhất.** Họ chạy 400 trên 100% phần tử — độ "dày" đến từ việc nạp thẳng
file cut Medium rồi khai `weight: 400`, không phải từ đổi nấc. Dự án đã chốt hệ 400 + 500 ở
§1.1 (500 ⇔ chữ hoa), không lật vì một số đo.

**c. Nhịp thân bài 1,4.** Họ dùng đúng một giá trị 12/16,8 cho toàn bộ thân bài. Maika tách
`T4` 12/16 (1,33) và `T5` 12/18 (1,50) — 1,4 của họ nằm đúng giữa hai giá trị này. Lý do tách
là dấu `ằ` của Inter cao 93/100 (Phần 5), thứ mà nội dung tiếng Anh của họ không phải lo.

### 9.4 Mốc kỷ luật đáng nhắm

**10 tổ hợp typo trên cả trang, ở cả hai khổ.** `skin-mt` của dự án hiện có **23 ở mobile, 26 ở
desktop** (STYLE-RULES Phần 0). Bảng vai của Maika ở Phần 4 có **9 vai** — nếu thi hành đúng
thì Maika sẽ là bộ da đầu tiên của dự án đạt mốc này.

---

## Phần 10 — ĐÃ THI HÀNH cho `skin-mp` *(25/08/2026, chỉ `index.html`)*

Lệnh user: *"ở skin mp chúng ta sẽ dùng bộ font maika … và toàn bộ cách dùng font size của
mytheresa từ menu, đến filter, button"*. Khối `HỆ CHỮ MYTHERESA` trong `index.html`, đặt ngay
trước khối MAIKA. **Maika (`skin-mp skin-mk`) thừa hưởng toàn bộ**, đúng thiết kế của nó.

### 10.1 Bản đồ vai: mytheresa → skin-mp

| Vai | mytheresa *(đo 375)* | skin-mp | Ghi chú |
|---|---|---|---|
| Ngựa thồ — nhà mốt, tên SP, giá, nội dung | 12 / 16,8 | **12 / 18** | gom 11·13·14·15·16 về 12 |
| Chữ một dòng trong linh kiện | 12 / 16,8 | **12 / 16** | `leading-4/6` |
| **Trigger bộ lọc** | 12 / 16,8 · w400 · thường | **12 / 16 · w400 · thường** | khai tường minh |
| **Nút hành động** (`.btn-p` · `.btn-o`) | 14 / 18,2 | **14 / 20** | |
| **Nút nhỏ** (`.btn-s`) | 12 / 16,8 | **12 / 16** | |
| **Nav ngành hàng** (`.ms-tab`) | 14 / 18,2 · HOA | **14 / 20 · HOA · 500** | 500 theo §1.1, họ w400 |
| Tiêu đề mục · sheet · modal | 18 / 23,4 *(mặt trưng bày)* | **18 / 24 · Inter** | F1 cấm Bodoni ở 18 |
| **Tiêu đề trang** | 24 / 28,8 *(mặt trưng bày)* | **24 / 32 · Libre Bodoni** | khớp cỡ họ; Bodoni gác theo mật độ màn |
| Vi mô | — | 10 / 14 | |

Đảo phân bố cho giống họ: markup vốn dùng 14px **233 lần** so với 12px **155 lần** — ngược
hẳn với mytheresa (~90% ở 12). Gom 11/13/14/15/16 về 12 là đòn bẩy đảo lại.

Vai "tiêu đề trang" của mình (9 chỗ, chủ yếu màn auth) **chính là** chỗ mytheresa đặt mặt
trưng bày, và nay **giữ đúng cỡ 24 của họ** (lệnh user 25/08). Bản trước từng nâng lên 32 để
lách sàn F1; nay không cần nữa vì F1 đã tách sàn theo mật độ màn — xem Phần 1.

### 10.2 Đo sau khi sửa

| | Trước | Sau |
|---|---|---|
| Tổ hợp typo (màn PLP) | 23 | **9** |
| Mặt chữ thân bài | Montserrat | **Inter** (452 phần tử) |
| Cỡ ngoài thang (11·13·15·16) | có | **0** |
| Độ đậm cấm (300 · 600 · 700) | 29 chỗ | **0** |
| Tracking khác 0,5px | 1,8 · 0,3 · 0,25px | **0** |
| Bậc trưng bày | không có | `Đăng nhập` **24/32 Libre Bodoni**, rộng 343px, không tràn |
| Cặp cỡ–dòng sai (§1.3) | — | **0** (quét 2 màn) |

Mốc so sánh: mytheresa **10** tổ hợp, `skin-mt` **17**. Console sạch.

### 10.3 F9 — ĐỘ ĐẬM: đo trước khi hạ nấc *(25/08, user đề xuất dùng 300 "để giảm nặng nề")*

Đo bề dày nét ở **cỡ 12px**, đơn vị CSS px:

| Mặt chữ | Nét đứng (`l`) | Nét **dấu** (`à`) |
|---|---|---|
| Inter **300** | 0,80 | **0,50** |
| Inter **400** | 1,10 | 0,60 |
| Inter **500** | 1,40 | 0,90 |
| **Avenir Next Medium** *(thân bài THẬT của mytheresa)* | **1,20** | — |

**Giả định "font mình nặng hơn nên hạ nấc" không đúng: Inter 400 đã MẢNH HƠN mặt chữ của
mytheresa 8%** (1,10 vs 1,20). Trang họ nhẹ không nhờ nét mảnh mà nhờ **chạy đúng một nấc** —
không có tương phản độ đậm nào để mắt phải xử lý.

Nguồn "nặng nề" thật của skin-mp là **123 phần tử đang `500`** (nét 1,40 = **nặng hơn
mytheresa 17%**), không phải nấc 400.

**Hai ràng buộc cứng khi tính dùng 300:**

1. **Libre Bodoni KHÔNG CÓ nấc 300.** Google Fonts chỉ cấp 400–700 (`wght@300` trả HTTP 400,
   verify 25/08). Nên 300 là chuyện của riêng Inter — tiêu đề trang (Bodoni 24) không hạ được.
2. **Ở cỡ 12, nét dấu của Inter 300 chỉ 0,50 CSS px** — trên màn 1× là nửa pixel thiết bị, khử
   răng cưa bôi thành xám. Đây đúng kiểu hỏng của nét mảnh Bodoni ở F1, nhưng **đắt hơn nhiều**:
   nét mảnh serif mất thì mất phong cách, còn dấu tiếng Việt mất thì mất **nghĩa** —
   à/á/ả/ã/ạ chỉ khác nhau ở cái dấu đó.

#### Bề dày nét không phải thứ mắt đọc — MẬT ĐỘ MỰC mới là

Đo lại bằng thước đúng hơn: **% diện tích phủ mực** của một dòng chữ Việt ở cỡ 12, tracking
0,5px, cùng chuỗi:

| | Mật độ mực | So với mytheresa | Nét dấu |
|---|---|---|---|
| Avenir Medium · `#000` *(mytheresa)* | 3,74 | mốc | — |
| Inter **400** · `#0a0a0a` *(skin-mp hiện tại)* | 3,66 | **−2% — ngang bằng** | 0,60px |
| Inter **300** · `#0a0a0a` | 2,81 | −25% | **0,50px** ⚠ |
| Inter **400** · `#333333` | 3,04 | **−19%** | 0,60px ✓ |
| Inter **400** · `#444444` | 2,80 | −25% | 0,60px ✓ |
| Inter **300** · `#333333` | 2,33 | −38% | **0,50px** ⚠ |

**Nét mảnh hơn 8% nhưng mật độ mực NGANG BẰNG** — vì x-height Inter là **55** còn Avenir chỉ
**47** (hơn 17%). Chữ Inter to hơn ở cùng cỡ khai, nên lượng mực bù lại đúng phần nét mỏng đi.
Đây là lời giải cho cảm giác "Inter nặng": **không phải độ đậm, là x-height.**

Hệ quả cho hướng xử lý: **đổi MÀU MỰC rẻ hơn hạ ĐỘ ĐẬM.** `400 · #444` cho đúng mức nhẹ của
`300 · đen` (−25%) mà **giữ nguyên nét dấu 0,60px** — thay vì bóp còn 0,50px. Muốn nhẹ mà
không đánh đổi dấu tiếng Việt thì đi đường màu.

> **F9 — Nấc 300 chỉ được dùng từ bậc 24 trở lên, và chỉ trên Inter.**
> Ở 24px, nét dấu của Inter 300 lên 1,00 CSS px — qua ngưỡng. Ở 12px thì cấm.
> Áp dụng F9 buộc phải sửa §1.1 (đang cấm hẳn 300) — xem 10.5.

### 10.4 ĐÃ XỬ — độ đậm và mực, **áp CẢ 2 BẢN 25/08/2026**

Lệnh user: *"giờ áp thử vào skin mp cả 2 phiên bản tôi xem"*. Hai thay đổi:

**(a) 120 phần tử `500` chữ thường → `400`.** Nguồn duy nhất là utility `font-medium`. Blanket
kéo `.font-light/normal/medium/semibold/bold` + `b/strong` về 400; các vai chữ HOA khai lại
500 để không rơi vào nửa cặp còn lại — §1.1 cấm cả "500 chữ thường" lẫn "hoa mà 400".

**(b) Mực thân bài `#2b2b2b` → `#333333`.** *(Đính chính bảng ở 10.3: thân bài skin-mp chưa
bao giờ ở `#0a0a0a` — mực chủ đạo là `#2b2b2b`, 251 phần tử; `#0a0a0a` chỉ 123 chỗ là tiêu đề
và nhãn.)* Mật độ mực thật của trang:

| | Mật độ | So với mytheresa |
|---|---|---|
| Trước (pha 27% `w500`, mực `#2b2b2b`) | 3,31 | −11% |
| Sau (a) — toàn `w400` | 3,16 | −16% |
| Sau (a)+(b) — thêm mực `#333333` | 3,04 | **−19%** |

`#333333` đã có sẵn trong thang mực của skin-mp (`--unofficial-foreground-alt-2`), tương phản
trên trắng **12,6:1** — trên xa ngưỡng WCAG AAA (7:1). Nét dấu giữ nguyên **0,60px**: đi đường
màu thì không phải bóp nét, khác hẳn hạ nấc xuống 300 (0,50px).

### 10.4b Hai chỗ vá thêm ở `desktop.html`

Cả hai **có sẵn từ trước**, không do đợt này, nhưng chúng phá đúng cặp 500⇔HOA mà bản mobile
đã vá — để nguyên là 2 bản lệch nhau:

- **Nav `.dk-dept`/`.dk-nav-link`: hoa mà `400` → `500`.** Một rule cũ ép nav về 400 (bỏ phân
  biệt state bằng độ đậm), rồi khối menu 24/08 thêm chữ hoa — hai quyết định riêng lẻ cộng lại
  thành nửa cặp. State vẫn đọc được bằng mực + gạch 2px.
- **Nhãn nhóm mega `.dk-mega-grid > div > p`: `600` → `500`.** §1.1 cấm hẳn 600; nhãn này vốn
  đã chữ hoa nên 500 là đúng nửa còn lại. mytheresa cũng không có nấc nào trên 500.

### 10.4c Đo sau khi áp — cả 2 bản

| | `index.html` (375) | `desktop.html` (1440) |
|---|---|---|
| Tổ hợp typo (2 màn) | **6** | **9** |
| `500` chữ thường | **0** | **0** |
| Chữ hoa mà `400` | **0** | **0** |
| Tracking khác 0,5px | **0** | **0** |
| Weight ngoài 400/500 | **0** | **0** |
| Mực thân bài | `#333333` (253) | `#333333` (364) |
| Tiêu đề trang | **24/32 Libre Bodoni** *(dpr 2)* | 24/32 **Inter** *(dpr 1)* |

Console sạch ở cả hai. Mốc so sánh: mytheresa 10 tổ hợp, `skin-mt` 17.

**Lưu ý về dòng cuối bảng:** desktop đo ở `dpr 1` nên chốt gác F1 cho Bodoni rơi về Inter —
đúng thiết kế, không phải lỗi. Muốn desktop CÓ Bodoni ở tiêu đề thì phải nâng bậc đó lên 32
(ở cỡ 32 nét mảnh đạt 1,0 CSS px, sống được cả ở 1×). Đây là **việc còn mở**, chờ user xem.

### 10.5 Sửa `STYLE-RULES` §1.1 nếu duyệt F9

§1.1 đang ghi *"Cấm hẳn 300 · 600 · 700"*. Dùng 300 ở bậc ≥24 là **ngoại lệ ghi danh thứ ba**
của luật đó, phải viết vào §1.1 trước khi áp code — cùng cách 2 ngoại lệ trước đã làm.
600 và 700 vẫn cấm tuyệt đối.

### 10.6 `desktop.html` CHƯA áp

Theo quy ước "chỉ sửa mobile trừ khi user nói rõ". Khối này port sang desktop là **copy
thẳng** — cùng tên class, cùng selector; chỉ cần đổi bậc trưng bày nếu muốn theo desktop
mytheresa (họ dùng 20 · 28 · 48 thay vì 18 · 24 · 28).

---

## Phần 11 — ÁP VÀO BỘ DA MAIKA *(25/08/2026, cả 2 bản)*

Lệnh user: *"đổi tên file md đó thành font Libre+inter, rồi áp font đó vào skin maika"*.

### 11.1 Maika đang chạy cơ chế CŨ, đè lên bản đúng

Maika là `skin-mp skin-mk`, nên về lý nó **thừa hưởng sẵn** hệ chữ đã áp cho `skin-mp` ở Phần
10. Nhưng đo thực tế thì không: ô thứ 6 trong bảng `SKINS` của Maika ghim cặp `'couture'`, và
`applySkin` gọi `applyFontPair('couture')` **ở dòng cuối cùng** — tức là nó chạy SAU mọi thứ
và ghi đè bằng đường inline.

Hai hậu quả đo được trên trang:

| | Trước khi sửa | Sau khi sửa |
|---|---|---|
| `font-size-adjust` trên `body` | **`0.53`** — F3 cấm, bóp thân bài 2,75% | **`none`** |
| Libre Bodoni ở bậc dưới sàn F1 | **6 phần tử ở 18/22,5** + 1 ở 24/30 | **0** |
| Class trên `<html>` | `… font-override font-pair` | `skin-mp skin-mk` |

Bậc 18/22,5 đến từ class `.font-pair`, vốn giao `--font-head` cho cả `text-[18px]`,
`text-[24px]` và **thẻ** `h1/h2/h3` — đúng 2 lỗi đã ghi ở Phần 8 mục 1–2.

### 11.2 Cách sửa: gỡ ghim cặp, để CSS lo

Gỡ ô thứ 6 khỏi entry Maika trong `SKINS` (cả 2 bản). `applySkin` vốn đã luôn
`removeProperty('--font-app')` + gỡ class `font-pair` ở khối reset; không có ghim cặp thì nó
dừng đúng ở đó, và Maika rơi về **CSS của `skin-mp`** — tức bản đúng.

Không sửa gì trong `FONT_PAIRS` hay selector `.font-pair`: nút chọn cặp trong popover Cài đặt
là **công cụ dev**, `STYLE-RULES` §5 miễn trừ. *(Điều này thay thế Phần 8 mục 1–2: sau khi gỡ
ghim, hai lỗi đó không còn ảnh hưởng bộ da thật, chỉ còn trong công cụ thử.)*

### 11.3 Đo sau khi áp

| | `index.html` (375, dpr 2) | `desktop.html` (1440, dpr 1) |
|---|---|---|
| `font-size-adjust` | `none` | `none` |
| Tổ hợp typo | **5** | **8** |
| `500` chữ thường · hoa mà `400` · tracking · weight | **0 · 0 · 0 · 0** | **0 · 0 · 0 · 0** |
| Libre Bodoni dưới sàn | **0** | **0** |
| Tiêu đề trang | **24/32 Libre Bodoni** | 24/32 Inter *(dpr 1, chốt gác F1)* |

Console sạch cả hai. Maika khác `skin-mp` đúng **một chỗ**: nhãn menu ở `12/16 · 500 · HOA`
thay vì `14/20` — chính là phần diff mà `skin-mk` sinh ra (menu theo `skin-mt`, thân trang
theo `skin-mp`), không phải lệch.

---

## Phần 12 — ĐÃ THI HÀNH cho bộ da `skin-li` "Libre + Inter" *(25/08/2026, cả 2 bản)*

> **⚠ PHẦN NÀY LÀ BẢN GHI LỊCH SỬ — số đã bị Phần 13 thay.** Cùng ngày, sau lượt chuẩn hoá:
> brand PDP `18/24` → **`24/32`**, bậc trưng bày `32/40`+`48/60` → **đóng**, và bậc 18 nay
> không còn phần tử nào. Bảng chuẩn hiện hành ở **13.1**; đọc phần này để hiểu ĐƯỜNG ĐI của
> các con số, không phải để tra trạng thái.

Lệnh user: *"tạo clone 1 skin-mt ra đặt tên là skin-Libre inter. dùng toàn bộ lại của skin-mt
nhưng áp dụng quy cách font size của bộ font libre inter với các heading như brand ở pdp,…"*

**Cách dựng:** ô class `SKINS` là **`skin-mt skin-li`** — dùng lại nguyên giao diện `skin-mt`,
lớp phủ `skin-li` chỉ khai hệ chữ. Đây là bộ da ĐẦU TIÊN mà Libre Bodoni thật sự vẽ ra được.

| Việc | Trước (`skin-mt`) | Sau (`skin-li`) | Luật |
|---|---|---|---|
| Mặt chữ thân bài | Montserrat | **Inter** | F4 |
| Bậc trưng bày | không có (thang đóng ở 24) | **T0 32/40** · **T00 48/60**, Libre Bodoni vô điều kiện | F2 · F1 |
| Bậc 22/24 | Montserrat 24/32 | Libre Bodoni **chỉ khi màn ≥2dppx** | F1 |
| **Brand ở PDP** | T3 14/20 · 400 · thường | **T2 18/24 · Libre Bodoni · 400 · thường · ls 0,5px** | F4 · ⚠ lệch F1 |
| Brand ở listing | 14/20 | **không đổi** (đúng chốt rollback 24/08) | — |
| Chữ hoa trên Libre Bodoni | — | **cấm** — `text-transform: none` khai kèm ngay chỗ giao `--font-head` | F4 |
| **Title dialog** (11 sheet/modal + panel bộ lọc) | 18/24 · 400 · thường **và** 14/20 · 500 · HOA (bộ lọc) | **16/24 · Inter · 500 · HOA** cho cả hai | ⚠ 16 lệch §1.2 |
| `font-size-adjust` | — | **none** (không đi qua `applyFontPair`) | F3 |

**Cỡ brand PDP: 18/24 — user chốt, và đây là chỗ CỐ Ý LỆCH F1.** Bản đầu tôi đặt T0 32/40 (bậc
thấp nhất mà nét mảnh đạt 1 pixel thiết bị trên mọi màn); user bác: *"tên brand trong pdp chỉ
khoảng font 18 đến 20 thôi. đừng set 32 quá to"*.
Trong khoảng 18–20 chỉ **18** nằm trong thang chữ của dự án (§1.2 và F4 chỉ có 10·12·14·18·24),
nên lấy 18. Nhịp 24 là T2 sẵn có, và cũng thoả điều kiện không chạm dòng của Bodoni
(1,14 × 18 = 20,5 ≤ 24).
Đánh đổi phải ghi rõ: ở cỡ 18 nét mảnh = **0,56 CSS px** → màn 1× chỉ 0,56 device px (F1 gọi là
bôi thành xám), màn ≥2× được 1,12 (đủ sống). Vẫn để Bodoni **không gác `@media`** vì cỡ do user
chốt và người phán cuối là mắt user — gác lại thì màn 1× rơi về Inter, không còn gì để đánh giá.
Hai đường lùi, mỗi đường 1 dòng: (a) bọc `font-family` vào `@media (min-resolution: 2dppx)` —
sạch F1 nhưng màn 1× mất Bodoni; (b) nâng cỡ về 24/32 — sạch F1 mọi màn nhưng to hơn khoảng
user cho.

**Hai hook cho 2 khổ** (markup khác thẻ): `.pc-brand.h-7` = brand PDP mobile + sheet quick-add ·
`h1.pc-brand` = brand PDP desktop. Card listing là `p.pc-brand` không có `.h-7` nên không trúng.
KHÔNG khai `height: auto` (bản 32/40 phải khai vì chữ trào khỏi hộp `.h-7` 28px) — 18/24 nằm gọn
trong 28px nên giữ nguyên hộp = giữ nguyên nhịp dọc của skin-mt.

**Đo sau khi áp** (`getComputedStyle`, 21 thuộc tính, từng phần tử, so với `skin-mt`):

| | phần tử | lệch typography | phần còn lại |
|---|---|---|---|
| `index.html` — pdp · account · cart | 3.392 / 3.023 / 3.412 | **1** (brand PDP) | chỉ `font-family` + reflow |
| `desktop.html` @1440 — PDP | 3.732 | **2** (brand PDP + tiêu đề newsletter `text-[32px]`) | chỉ `font-family` + reflow |

*(Đo lại sau khi hạ brand về 18/24: mobile brand `18px/24px · 400 · chữ thường · Libre Bodoni`,
hộp `.h-7` vẫn 28px; desktop `h1.pc-brand` cùng số. Brand ở card listing giữ 14/20 Inter, tên sản
phẩm giữ 12/18 Inter — phân cấp 18 vs 12 vẫn đọc ra một bậc rõ.)*

**Hai chốt bổ sung cùng ngày, sau khi user xem bản đầu:**

1. *"ở skin-li các font Libre sẽ không ghi uppercase nữa"* — khai `text-transform: none` **đi
   kèm mặt chữ**, tức buộc vào đúng 2 rule giao `--font-head`, không viết thành rule rời. Nhờ vậy
   luật đọc thành "Libre ở đâu, chữ thường ở đó" và phần tử nào sau này rơi vào bậc trưng bày
   cũng tự đúng. Đo trước khi khoá: **0 phần tử Bodoni đang hoa** — đây là chốt phòng về sau, và
   nó khớp F4 sẵn có (chữ hoa thuộc mặt thân bài T3/T6, mặt trưng bày của mytheresa không có lấy
   một phần tử viết hoa).

2. *"title Dialog sẽ đồng bộ lại dùng inter font cỡ 16 uppercase nhé"* — trước đó tiêu đề lớp nổi
   nói **hai giọng**: 11 sheet/modal dùng chung khuôn header ra `18/24 · 400 · chữ thường`, còn
   panel bộ lọc bị skin-mt kéo riêng về `14/20 · 500 · HOA`. Nay cả hai về `16/24 · Inter · 500 ·
   HOA`.
   `500` là bắt buộc theo §1.1 (`500` ⇔ chữ hoa là cặp không tách rời), không phải thêm cho đẹp.
   `font-family: var(--font-app)` khai tường minh để title dialog không bị Bodoni kéo đi nếu về
   sau bậc trưng bày nới xuống.
   **Cỡ 16 lệch §1.2** — thang đã bỏ hẳn bậc 16; đây là ngoại lệ user chốt đích danh, khoá vào
   đúng vai title dialog. Nhịp `24` mượn hộp dòng của T2 nên **chiều cao header sheet không đổi**
   (đo: mobile 52px, desktop 49px, y như skin-mt); với Inter, 16 cần dòng ≥ 18,24 nên 24 thoáng dư.
   Hai hook: tổ hợp `p.flex-1.min-w-0.text-[18px]` (khuôn header dùng chung — phải để `p` vì cùng
   tổ hợp còn một `h1` là tiêu đề TRANG ở màn search/PLP, không được trúng) và
   `#filterSheet div:has(> #filterClose) > p`.
   **Chưa trúng, có chủ ý:** sheet thông báo hàng về (`.ns-panel`) và thẻ Cookie (`.cg-panel`) dựng
   tiêu đề bằng markup khác — panel Cookie thậm chí không có `<p>` tiêu đề, chỉ `aria-label`.

**Khẩu phần F8:** Bodoni vẽ ra **1 phần tử ở mobile (0,2%)** · **2 ở desktop (0,3%)** — dư sức
dưới trần 4%. Còn chỗ để đưa thêm tiêu đề biên tập vào bậc trưng bày nếu muốn.

**CÒN MỞ — F5 chưa rà.** Đo được **15 phần tử** đang ở 12/16 mà chữ THẬT SỰ xuống dòng (đã trừ
padding/border): 4 dòng khối cam kết PDP · 2 dòng pháp lý ở footer · 2 đoạn + 3 mục danh sách
trong panel Cookie · 1 dòng ở sheet thông báo. F5 buộc chúng về 12/18. Chưa sửa vì 15 phần tử
này nằm ở 4 container khác nhau, không có một hook chung — phải khai 4 rule nhắm đúng container,
và đây là thay đổi nhịp dòng nên chờ duyệt. *(Con số này giống nhau ở `skin-mt`; chỉ với Inter
nó mới thành chuyện chạm dấu.)*

---

## Phần 13 — CHUẨN HOÁ BỘ TYPO `skin-li` *(25/08/2026, **CẢ 2 BẢN**)*

Lệnh user: *"chuẩn chỉnh hóa bộ typo của font mix Libre và inter lại. Tiêu chí ở trang PDP
không cần tên brand quá to, đề xuất heading là khoảng font size 18~20 thôi. còn các title
dialog thì sẽ dùng font Inter khoảng fontsize 16~18"*.

**Hai con số user cho thì demo ĐÃ đúng từ lượt trước** — brand PDP 18, title dialog 16. Việc
thật của lượt này là chuẩn hoá **hệ thống quanh 2 con số đó**: đo lại 17 màn bằng
`getComputedStyle` + `Range.getClientRects()` (bỏ popover Cài đặt vì §5 miễn trừ, bỏ phần tử
`sr-only`) và tìm ra **6 chỗ bộ typo tự nói ngược chính nó**.

Rồi sau khi xem bản 18, user chốt thêm 4 việc: **nâng bậc trưng bày lên 24** · **chuẩn hoá
tiêu đề trang trong phạm vi skin-li** · **sửa DATA cho 3 tiêu đề trang tĩnh** · **port cả 2
bản**. Phần này ghi trạng thái CUỐI.

### 13.1 Bảng chuẩn — 3 tầng, 9 vai, **một câu luật**

> **Từ 18 trở lên là Libre Bodoni chữ thường · dưới 18 là Inter · lớp nổi luôn Inter.**
> *(bộ da này không còn phần tử nào ở 18 — mọi thứ từng ở 18 đã lên 24, xem 13.3)*

| Tầng | Vai | Cỡ / dòng | Mặt chữ | Đậm | Hoa |
|---|---|---|---|---|---|
| **Trưng bày** | Tiêu đề TRANG + tiêu đề MỤC + brand PDP — **một bậc duy nhất** | **24 / 32** | **Libre Bodoni** *(mọi màn, không gác — 13.8)* | 400 | không |
| **Nhãn** | Title **mọi lớp nổi** — 12 sheet/modal/drawer + panel bộ lọc | **16 / 24** | Inter | **500** | **có** |
| **Nhãn** | Nhãn cấp 1 — nav ngành hàng | 14 / 20 | Inter | **500** | **có** |
| **Nhãn** | Nhãn cấp 2 — nhãn nhóm menu/footer/accordion | 12 / 16 | Inter | **500** | **có** |
| Thân bài | Brand ở card / hàng giỏ *(chốt rollback 24/08)* | 14 / 20 | Inter | 400 | không |
| Thân bài | Chữ **có thể xuống dòng** — mọi đoạn văn, ghi chú, mô tả | **12 / 18** | Inter | 400 | không |
| Thân bài | Chữ **chắc chắn một dòng** — hàng danh sách, giá, nhãn form | 12 / 16 | Inter | 400 | không |
| Thân bài | Vi mô — badge, nhãn thẻ thanh toán | 10 / 14 | Inter | tuỳ | tuỳ |
| *(ngoại lệ ghi danh)* | Cây danh mục panel bộ lọc `#filterSheet` | 12/18 · 12/16 | Inter | **500 chữ thường** | không |

Thang chữ thật của `skin-li`: **10 · 12 · 14 · 16 (chỉ title lớp nổi) · 24**.
Tracking **0,5px** mọi vai — đo lại: **0 phần tử lệch** trên 17 màn, cả 2 bản.

### 13.2 Sáu chỗ đã sửa

| # | Chỗ tự nói ngược | Trước | Sau |
|---|---|---|---|
| 1 | **Mặt chữ trưng bày bị chi cho một CON SỐ** — số điểm thưởng là phần tử duy nhất dùng `.text-[32px]` ở mobile, và là chữ TO NHẤT toàn app, to hơn mọi tiêu đề thật | `Libre Bodoni 32/40` | **`Inter 24/32`** — đóng hẳn 32/40 và 48/60 |
| 2 | **Bậc 18/24 nói HAI giọng** — brand PDP là Bodoni, còn `Gợi ý mua kèm` · `Sản phẩm tương tự` · `Giỏ hàng` · `Thanh toán` · newsletter là Inter. Cùng cỡ · dòng · 400 · chữ thường · tracking, khác đúng MẶT CHỮ | 1 Bodoni + 5 Inter ở 18 | **cả nhóm lên 24/32 Bodoni**, bậc 18 rỗng |
| 3 | **Libre Bodoni đang viết HOA** ở 3 trang tĩnh — `text-transform` không gỡ được chữ hoa viết cứng trong DATA | `Bodoni 24/32 TOÀN HOA` | **sửa DATA** → `Chính sách bảo mật` |
| 4 | **F5 chưa rà** — 12 tổ hợp phần tử ở 12/16 mà chữ THẬT SỰ xuống dòng, mực thoáng chỉ 2,32px | tối đa 15 phần tử/màn | **12/18 — 0 phần tử còn lại** trên 17 màn, cả 2 bản |
| 5 | **Title lớp nổi lọt 1 chỗ** — sheet "Nhận thông báo khi có hàng" dựng tiêu đề bằng markup riêng | `12/16 · 400 · chữ thường` | **`16/24 · 500 · HOA`** — 12/12 title cùng một số |
| 6 | Rule `.text-[48px]` chết từ lúc viết (0 phần tử ở cả 2 file) | — | gỡ; mở lại 2 dòng khi có tiêu đề biên tập thật |

### 13.3 Vì sao 24 mà không phải 18 — và đính chính một chỗ tôi nói sai

Bản đầu của lượt này đặt bậc trưng bày ở **18** (đúng khoảng user cho). User chốt lại
**"nâng bậc lên 24 cho sạch"**, và **hệ quả đã đọc trước khi chốt: tiêu đề mục = tiêu đề
trang, bộ da này chỉ còn MỘT bậc trưng bày.**

| Cỡ | Nét mảnh (CSS px) | dpr 1 | **dpr 1,25** *(desktop thật của user)* | dpr 2 |
|---|---|---|---|---|
| 18 | 0,56 | 0,56 ✗ | 0,70 ✗ | 1,12 ✓ |
| **24** | **0,74** | 0,74 ✗ | **0,93 ✗ — thiếu 7%** | 1,49 ✓ |
| 32 | 0,99 | 0,99 ≈ | 1,24 ✓ | 1,98 ✓ |

> **ĐÍNH CHÍNH:** trong bảng chọn tôi ghi "nâng lên 24 thì Bodoni sống trên mọi màn" —
> **SAI**. F1 (bản tinh chỉnh 25/08) chốt sàn theo pixel THIẾT BỊ: `1× → 32 · ≥2× → 24`. Nên
> đúng luật thì bậc 24 phải gác `@media (min-resolution: 2dppx)`; chỉ 32 mới sạch ở dpr 1.

**Bản đầu gác thật, và user đã chốt BỎ GÁC — phương án C, xem 13.8.** Nhờ bỏ gác mà cặp cỡ và
mặt chữ nay khai chung một rule: lý do phải tách 2 rule (cỡ ngoài `@media`, mặt chữ trong —
để màn 1× và 2× không ra hai BỐ CỤC khác nhau) hết hiệu lực. `text-transform: none` cũng ra
khỏi `@media`, nên nay chạy ở mọi màn chứ không chỉ ≥2dppx.

### 13.4 Hook bám VAI, không bám class — 2 chỗ buộc phải thế

1. **`:is(h1, h2, p)`** thay vì blanket `.text-[18px]`. Đo 17 màn: 2 phần tử 18px **không
   phải tiêu đề** và phải giữ Inter — chữ cái avatar (`span.w-12.h-12…`, một KÝ TỰ trong vòng
   tròn) và 6 ô OTP (`input.otp-cell`, 52×52). Cả hai đều không phải `h1/h2/p`.
2. **Gộp `.text-[18px]` với `.text-[32px]` trong CÙNG hook.** Cùng class `.text-[32px]`
   nhưng 2 file dùng cho 2 VAI ngược nhau: `index.html` là `span` (số điểm thưởng → phải
   Inter), `desktop.html` là `p` (tiêu đề newsletter → phải Bodoni). Bám class thì không có
   cách nào khai giống hệt 2 file; bám vai thì MỘT rule đúng cả hai.

Title lớp nổi cũng khai `.text-[18px]` trong markup nhưng không trúng bậc trưng bày: rule
title là (0,5,2) so với (0,3,2), và nó khai `font-size`/`font-family` tường minh — đã đo lại,
không dựa vào thứ tự khai. Panel bộ lọc cũng vậy ((0,4,2)).

### 13.5 Ranh giới "tiêu đề trang" — chỗ CỐ Ý không kéo vào

Chốt *"chuẩn hoá tiêu đề trang trong skin-li thôi"* thi hành theo ranh giới này:

* **VÀO** — tiêu đề nằm trong **thân trang**: `Giỏ hàng` (`h2.text-[18px]`), `Thanh toán`
  (`p.ck-h1`), tiêu đề PLP/search (`h1.flex-1.min-w-0.text-[18px]`, `m.title` hiện rỗng nên
  chưa thấy), cộng 3 tiêu đề vốn đã 24/32 (`Đăng nhập` · `Đặt hàng thành công` · 3 trang tĩnh).
* **KHÔNG VÀO** — nhãn ở **thanh app bar** của màn Tài khoản và Chi tiết đơn hàng
  (`p.flex-1.text-center.text-[16px]` trong hộp `h-12` 48px, có nút back hai bên). Đó là
  **linh kiện header**, không phải tiêu đề trang; kéo lên 24 là phá geometry thanh 48px mà
  skin-mt đang giữ. Hai màn đó vì vậy **không có Bodoni** — chỗ lệch còn lại của chốt này,
  ghi rõ để khỏi tưởng là sót.

### 13.6 Sửa DATA cho 3 tiêu đề trang tĩnh — và một chỗ dọn kèm

`text-transform: none` không gỡ được chữ hoa viết cứng, nên đã sửa thẳng DATA (chốt user):

* `POLICY_DATA[*].title`: `'CHÍNH SÁCH BẢO MẬT'` → `'Chính sách bảo mật'` (và 2 trang kia).
* **Dọn kèm, buộc phải làm:** `POLICY_TABS` đang ghi `'Điều khoản Dịch vụ'` / `'Chính sách
  Đổi trả'` (hoa giữa câu). Nếu chỉ sửa title thì **cùng một tên xuất hiện 2 kiểu hoa trên
  cùng một màn** (tab strip vs tiêu đề). Nay cả hai về một chuỗi — cũng đúng luật toàn dự án
  *"không dùng UPPERCASE, chỉ viết hoa chữ đầu"*. Kèm `LABELS` của `desktop.html` (đang lệch
  `index.html` ở đúng 2 khoá này).
* **Bảng i18n gọn từ 5 khoá xuống 1** (`'Điều khoản dịch vụ':'Terms of service'`) —
  `'Chính sách bảo mật'` và `'Chính sách đổi trả'` đã có khoá sẵn ở phần footer/accordion nên
  tái dùng. Kèm `'Privacy Policy'` → `'Privacy policy'` cho đúng luật hoa chữ đầu.
* Khối vá CSS `lowercase` + `::first-letter` của bản trước đã **GỠ HẲN**.

Đây là DATA dùng chung, nên **4 bộ da kia cũng đổi theo** — đúng ý chốt, và là sửa lỗi luật
chứ không phải thay đổi thiết kế.

### 13.7 Đo sau khi áp

| | `index.html` @375 · **dpr 2** | `desktop.html` @1440 · **dpr 1,25** |
|---|---|---|
| Tổ hợp typo mỗi màn | **6 – 10** | **8 – 9** |
| Phần tử **Libre Bodoni** ở PDP | **4** *(0,9% — trần F8 là 4%)* | **5** *(0,9%)* |
| Cỡ Bodoni đang dùng | **24** *(hết)* | **24** *(hết)* |
| 12/16 mà chữ xuống dòng | **0** *(trước 15)* | **0** *(trước 15)* |
| Title lớp nổi cùng một số | **12/12** | **12/12** |
| `500` chữ thường ngoài bộ lọc · hoa mà `400` · tracking lệch · cỡ ngoài thang | **0 · 0 · 0 · 0** | **0 · 0 · 0 · 0** |
| Phần tử tràn hộp (`scrollHeight > clientHeight`) | **0** | **0** |
| Chiều cao header sheet | 52px *(không đổi)* | 49px *(không đổi)* |
| Hộp brand PDP | 28 → **32px** *(`height: auto`, không kẹp chữ)* | không có hộp cố định |
| Cao trang PDP | 3.692 → 3.756px *(+1,7%)* | 4.435 → 4.463px *(+0,6%)* |
| Console | sạch | sạch |

**Khối CSS của `skin-li` nay GIỐNG HỆT từng byte ở 2 file** (202 dòng, đã diff). Bốn bộ da kia
không đổi một pixel: đo lại trên desktop — `default` 27 tổ hợp · `skin-mt` 10 · `skin-mp` 8 ·
Maika 11, cả bốn vẫn còn 3–4 phần tử 12/16 xuống dòng và 0 phần tử Bodoni. Mọi rule bám 2
class `html.skin-mt.skin-li` nên không rò được.

### 13.8 Gác F1 trên desktop — **ĐÃ CHỐT PHƯƠNG ÁN C: bỏ gác** *(25/08)*

**Vấn đề.** Bản đầu gác `@media (min-resolution: 2dppx)` theo đúng F1. Đo được: `desktop.html`
ở dpr 1–1,25 có **0 phần tử Libre Bodoni trên cả 12 màn** — bộ da tên "Libre + Inter" mà nửa
cặp không xuất hiện, trong khi popover (13.10) thì đang tích đúng cặp đó. Không đánh giá được
cặp font ở khổ desktop thì bộ da mất lý do tồn tại.

**Ba đường đã cân:**

| | Cách | Được | Mất |
|---|---|---|---|
| A | giữ gác 2dppx | sạch F1 tuyệt đối | desktop 0 Bodoni |
| B | desktop dùng **32/40** | sạch F1 mọi màn; đúng nguyên tắc F2 *"desktop giữ bậc cao, mobile hạ một bậc"* (mytheresa 20/28/48 → 18/24/28) | user đã bác cỡ 32; và 2 file khai KHÁC nhau → mất bất biến "giống hệt từng byte" |
| **C** ✅ | **bỏ gác, giữ cỡ 24 mọi màn** | Bodoni hiện ở cả 2 khổ, cỡ vẫn 24 như đã chốt, 2 file vẫn giống hệt | **lệch F1** — ghi danh ở dưới |

**Lệch F1 bao nhiêu, nói thẳng bằng số.** Nét mảnh Libre Bodoni = `0,031 × cỡ`:

| dpr | nét mảnh (device px) | so với sàn F1 (1,0) |
|---|---|---|
| 1,00 | **0,74** | thiếu 26% |
| 1,25 *(desktop thật của user, Windows scale 125%)* | **0,93** | thiếu 7% |
| 2,00 *(mọi điện thoại)* | 1,49 | đạt |

`0,93` **khác hẳn** mức mà F1 nhắm tới khi nói "bôi thành xám": mức đó là **0,56** (cỡ 18 ở
dpr 1), hụt gần nửa pixel. Ở 0,93 nét mảnh gần như đủ một pixel thiết bị — mất độ tương phản
chứ không mất nét. Ở dpr 1 tròn (0,74) thì rõ hơn; đó là **rủi ro đã biết và ghi danh**, không
phải sót.

**Đường lùi 1 dòng:** bọc lại rule `font-family` của mục 2 vào `@media (min-resolution: 2dppx)`
là về phương án A.

**Đo sau khi bỏ gác — `desktop.html` @1440, dpr 1** *(trường hợp XẤU NHẤT: 0,74 device px)*:

| Màn | Phần tử Bodoni | Khẩu phần F8 *(trần 4%)* |
|---|---|---|
| PDP | **5** — brand `Versace` · `Gợi ý mua kèm` · `Đã xem gần đây` · `Sản phẩm tương tự` · newsletter | 0,9% |
| Giỏ hàng | 4 — `Giỏ hàng (5)` · `Tóm tắt đơn hàng` · newsletter | 0,8% |
| Đặt hàng thành công | 3 | 0,7% |
| Thanh toán · Đăng nhập · Trang tĩnh · Tài khoản | 2 mỗi màn | 0,5% |

Tất cả đều `24/32 · 400 · chữ thường`. Mỗi màn 8–9 tổ hợp typo · **0 vi phạm** ở cả 4 mục ·
**0** phần tử 12/16 xuống dòng · **0** phần tử tràn hộp · console sạch.

**`index.html` không đổi một pixel** — ở dpr 2 gác vốn đã đi qua, nên bỏ gác là no-op: PDP vẫn
4 phần tử Bodoni ở 24/32, 0 vi phạm, 0 wrap. **4 bộ da kia cũng không đổi:** 0 Bodoni, và vẫn
còn nguyên 11–17 phần tử 12/16 xuống dòng (chỉ `skin-li` được rà).

Khối CSS `skin-li` vẫn **giống hệt từng byte ở 2 file** (226 dòng, đã diff lại sau khi bỏ gác).

### 13.9 CÒN MỞ

1. **Bậc tiêu đề TRANG của `skin-mt` có 4 giá trị cho cùng một vai** — `24/32` · `18/24` ·
   `12/18` · và PLP/search để `h1` RỖNG. Lượt này đã kéo phần trong thân trang về 24/32
   **trong phạm vi `skin-li`** (13.5), nhưng gốc vẫn lệch: 2 màn (Tài khoản · Chi tiết đơn
   hàng) chỉ có tiêu đề ở app bar nên không có tiêu đề trang nào để nâng. Sửa cho đều là đổi
   thang chữ `skin-mt` → ảnh hưởng cả 5 bộ da + `home.html`, nên là **việc riêng**.
2. **F6 — italic vẫn là đồ giả.** `<link>` xin `Libre+Bodoni:wght@400;500`, không có `ital`.
   Lượt này không đụng vì bộ da chưa dùng italic ở đâu; F6 vẫn khuyến nghị **thêm
   `ital,wght@0,400;0,500;1,400`** (bản `ital` đã verify có subset `vietnamese`).
3. **Bậc hero 48/60 để trống có chủ ý.** Mở lại 2 dòng khi có tiêu đề biên tập / chiến dịch
   thật — số đo đã tính sẵn ở F2 (48/56 là SAI, chỉ còn 1,28px thở).

### 13.10 Popover Cài đặt: `skin-li` tích CẶP font, không tích phông đơn *(chốt user 25/08)*

Lệnh user: *"skin-li mặc định sẽ chọn bộ font Libre và inter nhé"*.

**Chỗ sai trước đó:** ô thứ 5 của hàng `SKINS` ghi `'inter'`, nên mở popover ra là thấy tích ở
phông **ĐƠN "Inter"** — nói sai về bộ da: nó chạy một CẶP (Libre Bodoni trưng bày + Inter thân
bài), không phải Inter thuần. Nay ô 5 để rỗng và tích chuyển sang hàng cặp.

**Thi hành bằng Ô THỨ 7 — ô MỚI, "chỉ TÍCH, không áp".**

> ⚠ **KHÔNG dùng ô thứ 6** (cặp font *mặc định*, tức gọi `applyFontPair`). Ô đó **đã bị gỡ khỏi
> Maika sáng cùng ngày** đúng vì nó phá bản đúng:
> * `applyFontPair` đặt inline `--pair-adj 0.53` → `font-size-adjust`, **F3 cấm hẳn**: bóp Inter
>   2,75% nên chữ khai 12px vẽ ra ~11,67px, đúng bậc 11 mà §1.2 cấm;
> * và thêm class `.font-pair`, giao `--font-head` theo **THẺ** `h1/h2/h3` cùng cả bậc 18/24 —
>   dưới sàn F1 (lần trước đo được 6 phần tử Bodoni ở 18/22,5).
>
> Ghim ô 6 ở đây là **undo cả lượt chuẩn hoá**. Ô 7 vì vậy KHÔNG chạm `<html>`: chỉ đặt
> `currentPair` và dời dấu tích. Mặt chữ vẫn do 2 token CSS của bộ da cấp (mục 1 khối `skin-li`).

Cặp được tích là `couture` — đúng cặp, và **không phải đổi tên gì**: popover render
`headName`/`bodyName` chứ không render nhãn, nên hàng đó vốn đã đọc ra
**"Libre Bodoni / + Inter · didone Vogue-esque"**. Số `tune` sai của cặp này
(`adj 0.53` · `headLs -0.2px`, xem Phần 8 mục 2) **không chạy** vì không gọi `applyFontPair`.

Khối `if (s[6])` phải đứng **SAU** `if (s[5]) applyFontPair(s[5])`, cùng lý do ô 5/6 đã ghi:
`applyFontPair` ghi đè `currentFont` và dấu tích mà khối reset vừa đặt.

**Đo sau khi áp — cả 2 bản:**

| | kết quả |
|---|---|
| Tích phông đơn khi bật `skin-li` | **0** *(trước: "Inter")* |
| Tích cặp | **`couture`** — hàng hiện chữ "Libre Bodoni + Inter · didone Vogue-esque" |
| `--font-app` · `--font-head` · `--pair-adj` inline | **không có cái nào** |
| class `.font-pair` trên `<html>` | **không** |
| `font-size-adjust` trên `body` | **`none`** *(F3 đạt)* |
| Brand PDP · thân bài (mobile, dpr 2) | **24/32 Libre Bodoni** · 12/18 Inter |
| 4 bộ da kia | vẫn tích phông đơn `montserrat`, 0 cặp — **không đổi** |
| Rời `skin-li` rồi quay lại · bấm tay cặp khác rồi đổi da lại | dấu tích và `font-size-adjust` **về đúng trạng thái sạch** cả 2 lượt |
| Console | sạch |

**Mâu thuẫn "tích một cặp mà nửa cặp không hiện" — ĐÃ HẾT.** Ngay sau lượt này, trên desktop
popover hứa "Libre Bodoni + Inter" nhưng gác F1 chặn nên brand PDP vẽ ra `Inter 24/32`. Chốt
phương án **C** ở 13.8 (bỏ gác) đã xử: desktop nay có 2–5 phần tử Bodoni mỗi màn, dấu tích và
thứ vẽ ra khớp nhau ở cả 2 khổ.

### 13.11 Cụm accordion PDP: một cỡ 14, không chữ hoa *(chốt user 25/08)*

Lệnh user: *"Trong pdp ở skin-li, các accordions sẽ không uppercase toàn bộ, chỉ tăng font lên
14, tăng nhẹ font weight là được"*.

Đây là quyết định mà khối `skin-li` trước đây **cố ý không lấy** của Maika — ghi thẳng ở đầu
khối: *"Maika còn một quyết định riêng mà bộ da này KHÔNG lấy: cụm accordion PDP một cỡ 14 chữ
thường"*. Nay lấy, và lấy **đúng bằng số của Maika** để 2 bộ da không đẻ ra bậc thứ ba.

| | nhãn (`.acc-trigger > span:first-child`) | nội dung (`.acc-inner`) |
|---|---|---|
| `skin-mt` *(không đổi)* | 12/16 · 500 · **HOA** — riêng pdp3 14/20 · 500 · HOA | 12/16 · 400 · thường |
| **`skin-li` sau lượt này** | **14/20 · 500 · chữ thường** | **14/20 · 400 · chữ thường** |
| Maika *(để so)* | 14/20 · 500 · chữ thường | 14/20 · 400 · chữ thường |

*"Tăng nhẹ font weight"* chỉ có một nghĩa: **500**. §1.1 cấm hẳn 300 · 600 · 700 nên không có
nấc nào khác để nhích.

**`500` + chữ thường là NGOẠI LỆ, không phải sơ suất.** §1.1 khai `500` và `chữ hoa` là cặp
không tách rời. Tiền lệ đã ghi danh: Maika mang đúng cặp này ở chính cụm này, và trong CHÍNH bộ
da gốc thì trigger accordion ở **footer** (12/16 · 500) và ở **giỏ hàng** (14/20 · 500) vốn đã
là 500 từ trước — cụm PDP mới là chỗ lệch, không phải chỗ này.

**Lệnh này gom 3 mức về 1.** Đo trước khi sửa (`skin-li`): nhãn `12/16 · 500 · HOA` ở 5 bản và
`14/20 · 500 · HOA` ở riêng pdp3; nội dung `12/18` (mục 5 vừa kéo lên) trừ bảng thông số của
pdp2 còn `12/16`.

**Hai chỗ phải xử kèm, không thì rule mới không tới đích:**

1. **Gỡ thân accordion PDP khỏi danh sách F5** (13.2 mục 4 / mục 5 trong code). Hook cũ
   `[data-pdp-acc] .acc-inner :is(p, div).text-[12px]` là **(0,5,2)**, rule mới là **(0,4,2)** —
   để lại thì hook cũ THẮNG và riêng thân accordion tuột về 12/18 trong khi nhãn đã 14/20.
   Gỡ được vì 14/20 tự đạt F5: điều kiện không chạm dòng của Inter là `1,14 × cỡ` = 15,96 ≤ 20.
   Danh sách F5 nay còn **6 hook**. Accordion **CHECKOUT** (`#shipOpts`/`#ckSections`) **GIỮ**
   trong danh sách — nó không nằm trong `[data-pdp-acc]` nên rule mới không với tới, và nó vẫn
   ở cỡ 12.
2. **Khai cả nhánh `[data-screen="pdp3"]`.** Rule pdp3 của `skin-mt` là (0,4,2) — đúng bằng
   nhánh chung — và khai SAU trong file nên cùng specificity thì nó thắng. Với cỡ/dòng thì vô
   hại (cùng 14/20), nhưng để vậy là để rule của bộ da khác quyết số của bộ da mình. Thêm nhánh
   cho lên (0,5,2). Maika làm y vậy.

**Bảng thông số lên 14 luôn.** Mục 5 trước đây cố ý chừa `span` để không đổi nhịp bảng; nay cả
cụm cùng một cỡ nên không còn lý do chừa — `:is(div, p, span)` phủ cả 3 (2 file dựng ruột
accordion khác nhau: mobile để chữ thẳng trong `div`, desktop bọc thêm `<p>` và hàng thông số
`<span>`).

**Đo sau khi áp — cả 2 bản, cả 6 bản PDP:**

| | kết quả |
|---|---|
| Nhãn · nội dung | **14/20 · 500 · thường** · **14/20 · 400 · thường** — giống Maika từng con số |
| Số tổ hợp typo ở PDP | 9 → **10** *(thêm đúng 1: `Inter 14/20 500 thường` của nhãn)* |
| Vi phạm ngoài 2 ngoại lệ ghi danh | **0** ở cả 4 mục |
| 12/16 mà chữ xuống dòng | **0** *(F5 vẫn đạt)* |
| `.acc-inner` bị kẹp chữ khi mở hết | **0** — cơ chế mở là `grid-template-rows: 0fr → 1fr`, cao theo nội dung nên không có `max-height` để tràn. Hộp cao thêm: 64 → **76px** (thân 3 dòng), bảng thông số pdp2 192 → **224px** |
| `skin-mt` · accordion FOOTER · ghi chú accordion CHECKOUT | **không đổi** *(12/16·500·HOA · 12/16·500·HOA · 12/18)* |
| Console | sạch |

**HỆ QUẢ phải nói rõ:** sau lượt này **6 bản PDP của `skin-li` không còn khác nhau ở cụm
accordion** — kể cả pdp3 (vốn là bản duy nhất ở cỡ 14) và pdp2 (bảng thông số). Lệnh là "toàn
bộ" nên tôi làm toàn bộ; muốn giữ pdp3 khác để còn so thì nói.

### 13.12 `skin-li` lên làm BỘ DA VÀO-TRANG *(chốt user 25/08)*

Lệnh user: *"từ giờ mặc định vào sẽ là chọn skin-li nhé"*. Trước đó là `skin-mt` trơn (chốt
19/08). Vì `skin-li` = `skin-mt` + lớp phủ hệ chữ, đây là **thêm một class**, không phải đổi
bộ da nền.

**Đổi mặc định = sửa 4 chỗ, ở cả 2 file** — trước đây chỉ 2, vì bộ da mới dùng một CẶP font:

| # | Chỗ | Từ | Thành |
|---|---|---|---|
| 1 | class thẻ `<html>` | `skin-mt` | **`skin-mt skin-li`** |
| 2 | `let currentSkin` | `'mytheresa'` | **`'libre-inter'`** |
| 3 | `let currentFont` | `'montserrat'` | **`''`** — skin-li không tích phông ĐƠN nào |
| 4 | `let currentPair` | `''` | **`'couture'`** — tích CẶP qua ô thứ 7 |

Kèm một sửa nhỏ ở markup popover: dấu tích cặp font trước đây khai cứng `opacity-0` nên chỉ
hiện sau khi user tự đổi bộ da một lượt; nay render từ `currentPair` (`${id === currentPair ?
'' : 'opacity-0'}`) để đúng ngay từ lần vẽ đầu.

**Vẫn KHÔNG gọi `applySkin()` lúc boot** — giữ đúng lý lẽ của chốt 19/08: gọi bằng JS thì trang
vẽ một nhịp bằng bảng màu gốc rồi mới nhảy sang bộ da, nhìn ra nháy. Ba biến 2·3·4 chỉ lo DẤU
TÍCH; mặt chữ đến từ 2 token CSS của bộ da, **không** đi qua `applyFontPair` (F3 cấm
`font-size-adjust`).

**Đo lúc VÀO TRANG, không gọi một hàm JS nào — cả 2 bản:**

| | kết quả |
|---|---|
| class `<html>` | `skin-mt skin-li` |
| Tích Bộ da · phông đơn · cặp font | `libre-inter` · **rỗng** · `couture` |
| Biến inline `--font-app`/`--font-head`/`--pair-adj` | không có cái nào |
| class `.font-pair` / `.font-override` | không |
| `font-size-adjust` trên `body` | `none` *(F3 đạt)* |
| Mặt chữ thân bài | Inter |
| Brand PDP | **24/32 · 400 · thường · Libre Bodoni** *(cả desktop dpr 1 — nhờ phương án C ở 13.8)* |
| Nhãn accordion PDP | 14/20 · 500 · thường · Inter |
| Title lớp nổi · quick add | 16/24 · 500 · HOA · Inter · nút tròn `9999px` |
| Đổi sang `skin-mt` / `default` rồi quay lại | dấu tích và class về đúng trạng thái mỗi lượt |
| Console | sạch |

**⚠ HỆ QUẢ QUAN TRỌNG NHẤT: `skin-li` thôi là "bộ da thử".** Từ nay mọi thứ trong nó là thứ
khách mở ra thấy ngay — **kể cả 3 chỗ lệch luật đã ghi danh**:

1. **Bậc trưng bày 24 không gác `@media`** → lệch F1 (0,74 device px ở dpr 1 · 0,93 ở dpr 1,25).
   Xem 13.8. Đây là chỗ đáng cân lại nhất, vì nay nó là mặt tiền chứ không còn là bản thử.
2. **`500` chữ thường** ở cây bộ lọc và ở cụm accordion PDP → 2 ngoại lệ của §1.1.
3. **Cỡ 16 của title lớp nổi** → ngoài thang §1.2 (thang đã bỏ hẳn bậc 16).

Luật §4.5 của `STYLE-RULES.md` đã cập nhật theo: bộ da còn lại để thử nghiệm là `skin-mp`
(Editorial) và Maika. `skin-mt` thì **chặt hơn trước** — `skin-li` là lớp phủ trên chính nó nên
sửa `skin-mt` là sửa luôn mặt tiền.

---

## Phần 14 — Cặp thử **Fraunces + Inter** *(25/08/2026, cả 2 bản)*

Lệnh user: *"trong bộ font dùng thử, hãy thử thêm font mix giữa inter và Fraunces"*. Thêm vào
`FONT_PAIRS` — tức **công cụ dev** trong popover Cài đặt (§5 miễn trừ), không phải bộ da.
Vai: **Fraunces = mặt trưng bày · Inter = thân bài**, cùng khuôn 3 cặp còn lại.

### 14.1 Số đo Fraunces — đo mới, không lấy lại từ ghi chú cũ

Chuẩn hoá 100px, đã nạp kèm chuỗi tiếng Việt (`document.fonts.load(spec, 'ệằữẳẵ…')` — thiếu
chuỗi thì chỉ kéo subset latin và ra số của font dự phòng, đúng cái bẫy Phần 0 đã ghi):

| | **Fraunces** | Inter | Libre Bodoni | Montserrat |
|---|---|---|---|---|
| x-height | **47** | 55 | 45 | 53 |
| cap-height | 70 | 73 | 76 | 70 |
| dấu `ằ` | 82 | **93** | 82 | 83 |
| dấu `ệ` | 69 | 76 | 73 | 73 |
| chân chữ `p` | **24** | 21 | 32 | 20 |
| **dòng tối thiểu** (`ằ + chân p`) | **1,06** | 1,14 | 1,14 | 1,03 |
| rộng "Nhận thông báo khi có hàng" | 1309 | 1332 | 1248 | 1438 |

Bốn cột khớp đúng bảng Phần 0 ở 3 font đã đo trước → phép đo tin được.
**Tiếng Việt ĐẠT:** `document.fonts.check('100px "Fraunces"', 'ệằữ')` = `true`. Cả 2 family
**vốn đã nằm trong thẻ `<link>`** nên **không thêm request nào**.

**Fraunces là mặt trưng bày THOÁNG NHẤT trong 3 mặt đã đo** — dòng tối thiểu chỉ 1,06 (Bodoni
1,14) vì chân chữ chỉ sâu 24/100 so với 32 của Bodoni. Đổi lại x-height 47 thấp hơn Inter 55
**15%** — khoảng cách 2 tầng LỚN NHẤT trong 3 cặp Fraunces (Montserrat 53 → 11% · Manrope 54 →
13%), nên đây là cặp tương phản mạnh nhất.

### 14.2 `tune`: một chỗ CỐ Ý khác 3 hàng cũ

| | hàng mới | 3 hàng cũ | vì sao |
|---|---|---|---|
| `adj` | **0,55** | 0,53 | `--pair-adj` đi vào `font-size-adjust: ex-height`, tức nó neo x-height của **THÂN BÀI**. Cặp này thân bài là Inter (xH 55) nên phải neo 0,55 |
| `headLs` | **0,5px** | `'0'` | §1.4 một-giá-trị + F4 (sửa 25/08 sau khi đo mytheresa: 0,5px trên 100% phần tử, kể cả mặt trưng bày cỡ 48) |
| `headLh` | 1,32 | 1,32 | GIỮ nguyên có chủ ý — 1,32 dư sức so với sàn 1,06, và giữ nguyên thì biến duy nhất thay đổi giữa 3 hàng Fraunces là MẶT CHỮ THÂN BÀI, đúng thứ cần so |

**`adj` đã đo để chắc, không suy:** chuỗi thân bài 12px Inter, `letter-spacing: 0.5px`

| | không adjust | `ex-height 0.53` | `ex-height 0.55` |
|---|---|---|---|
| bề rộng | 172,83 | 168,17 | 174,03 |
| lệch | — | **−2,70%** | **+0,69%** |
| cỡ vẽ ra thật | 12,00px | **11,68px** | **12,08px** |

`0.53` bóp Inter về **11,68px** — đúng bậc 11 mà §1.2 cấm, và khớp con số 2,75% / 11,67px mà F3
đã ghi. `0.55` lệch 0,69%, coi như trung tính. *(Cặp `couture` cũng thân bài Inter và cũng đang
để 0.53 — đó là **Phần 8 mục 2**, "sửa lỗi, CHƯA áp". Hàng mới làm đúng ngay; đo được `couture`
vẫn ra `adj 0.53` khi bật.)*

### 14.3 Đo sau khi thêm — cả 2 bản

| | kết quả |
|---|---|
| Hàng trong popover | **`Fraunces` / `+ Inter · serif mới, nền Inter`** — đặt cạnh 2 hàng Fraunces kia để so được ngay |
| Biến inline khi bật | `--font-head` Fraunces · `--font-app` Inter · `--pair-adj 0.55` · `--pair-head-ls 0.5px` · `--pair-head-lh 1.32` |
| `font-size-adjust` trên `body` | `0.55` |
| Brand PDP · tiêu đề mục | **24/32 · Fraunces** *(mobile và desktop)* |
| Thân bài · nhãn accordion | 12/18 · Inter · 14/20 · 500 · thường · Inter |
| Phần tử ăn Fraunces ở PDP | **4** — đúng 4 phần tử của bậc trưng bày *(3 span "Fraunces" còn lại là nhãn xem trước trong chính popover)* |
| Chọn lại bộ da = reset | `adj` về `none`, brand về Libre Bodoni, dấu tích về `couture`, `.font-pair` gỡ — sạch cả 2 lượt thử |
| Console | sạch |

### 14.4 Hai chỗ méo của CƠ CHẾ cặp font — không phải của cặp này

Popover cặp font là công cụ dev có từ trước và nó **đè lên** bộ da bằng inline + class
`.font-pair`. Khi bật thử trên `skin-li` (nay là bộ da vào-trang) có 2 chỗ lệch khỏi hệ thống đã
dựng — biết để khỏi đọc nhầm là lỗi của Fraunces:

1. **`.font-pair` giao `--font-head` theo THẺ** (`h1, h2, h3`) và cho cả `.text-[18px]` →
   **chữ cái avatar và 6 ô OTP ăn Fraunces**, đúng 2 phần tử mà `skin-li` cố ý chừa
   (13.4). Đo được: avatar = `18px Fraunces`.
   *May là với cặp này nó vô hại về chất lượng nét:* F1 chỉ nói về Didone (hairline 0,031 ×
   cỡ). Fraunces là serif mềm, không có nét mảnh thật, nên ở 18px nó không bị bôi xám như
   Libre Bodoni.
2. **`.font-pair` trả mọi nhãn về chữ thường** (khối *"THỬ CẶP FONT = TẮT NHÃN HOA"*, chốt
   24/08) → title lớp nổi và nhãn cấp 2 mất chữ hoa trong lúc thử.

Cả hai là hành vi CÓ TỪ TRƯỚC của công cụ, không sửa trong lượt này. Muốn thử cặp này "sạch"
theo đúng hệ thống thì phải làm như `skin-li`: khai 2 token CSS trong một bộ da, không đi qua
`applyFontPair` — nói thì làm.

---

## Phần 15 — Cặp thử **Cormorant Garamond + Inter** *(25/08/2026, cả 2 bản)*

Lệnh user: *"thêm lựa chọn font mix Cormorant Garamond và inter vào luôn nhé"*. Vào `FONT_PAIRS`
— công cụ dev trong popover (§5 miễn trừ). Vai: Cormorant = trưng bày · Inter = thân bài.

### 15.1 Verify tiếng Việt TRƯỚC khi thêm — bắt buộc, vì đây là family MỚI

Cormorant Garamond **không có** trong thẻ `<link>` (đã gỡ 24/08 cùng cặp Cormorant + Be Vietnam
Pro). Thêm family mới thì luật dự án bắt tải CSS thật:

`fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500` → **HTTP 200**, **10 khối
`@font-face`** (5 subset × 2 nấc), subset khai gồm `cyrillic-ext · cyrillic · vietnamese ·
latin-ext · latin` — **có `vietnamese`**, `unicode-range` chứa **`U+1EA0`**. ĐẠT.
Đây là request font **thứ 6**, khác 2 lượt trước (Fraunces và Inter vốn đã có sẵn).

### 15.2 ⚠ Đây là mặt chữ TỪNG BỊ LOẠI VÌ SỐ ĐO

Ghi chú đầu bảng `FONT_PAIRS` vẫn còn nguyên câu: *"Đã loại vì số đo: Cormorant Garamond +
Montserrat (xH 39 vs 53, lệch quá xa → tiêu đề trông NHỎ hơn thân bài dù cỡ lớn hơn)"*.

Đo lại 25/08, x-height chuẩn hoá 100px — **con số cũ đúng**:

| | Cormorant | Fraunces | Libre Bodoni | Inter *(thân bài)* |
|---|---|---|---|---|
| x-height | **39** | 47 | 45 | 55 |
| so với thân bài Inter | **−29%** | −15% | −18% | — |
| cap-height | **63** | 70 | 76 | 73 |
| dấu thường cao nhất | `ệ` **73** | `ằ` 82 | `ắ` 83 | `ằ` 93 |
| chân chữ sâu nhất | 28 | 24 | 32 | 21 |
| rộng chuỗi VN | **1104** | 1309 | 1248 | 1332 |

**Cặp tương phản 2 tầng MẠNH NHẤT trong 5 cặp**, và hẹp nhất (1104 vs 1332 của Inter = −17%).
Nhưng **bản 24/08 khác bản này ở một chỗ quyết định**: lúc đó cặp Cormorant chạy `adj 0.53` (neo
về Montserrat) nên thân bài Inter còn bị bóp thêm 2,75%. Bản này `adj 0.55` neo đúng Inter, và
chính `font-size-adjust` là thứ chữa cái bệnh *"tiêu đề trông nhỏ hơn thân bài"* — nó phóng
Cormorant lên cho bằng cảm giác cỡ.

### 15.3 `headLh: 1.52` — chỗ DUY NHẤT phải tính theo cỡ DÙNG THẬT

`font-size-adjust: ex-height 0.55` bắt trình duyệt scale sao cho `x-height / cỡ = 0,55`.
Cormorant tự nhiên chỉ **0,39** → **phóng 1,41×**: chữ khai 24px vẽ ra bằng em ~**31,7px**
(đo trên trang). Dấu và chân chữ to lên theo, nên nhịp dòng phải tính trên cỡ đã phóng:

```
dấu ệ 0,73 + chân chữ 0,28 = 1,01 × cỡ   (mặt chữ trần)
× hệ số phóng 1,41                        = 1,424 × cỡ KHAI   ← sàn thật
chọn 1,52                                 → thở ~6,5%
```

Biên 6,5% lấy đúng theo hàng `fraunces-inter` (sàn 1,24 → chọn 1,32). **Bản nháp đầu tôi đặt
1,30 — kẹp dấu, đã đo ra và sửa.**

**Hai phát hiện kèm theo, đáng giữ:**

1. **Công thức của F2 (`dấu ằ + chân chữ`) không đúng cho mọi mặt chữ.** Cormorant có
   `ệ` (73) **cao hơn** `ằ` (68) — ngược cả 3 font kia. Lấy `ằ` cho riêng font này là ra số
   thiếu. Phải quét cả bộ dấu rồi lấy MAX.
   *(Nếu tính cả chữ HOA có dấu chồng — `Ẳ` cao 88 ở Cormorant, 111 ở Bodoni/Inter — thì mọi
   `headLh` trong bảng đều thiếu. Dự án cố ý tính theo chữ thường vì luật là "chỉ viết hoa chữ
   đầu", nên chữ hoa mang dấu chồng gần như không xuất hiện ở tiêu đề.)*
2. **Cặp `couture` đang kẹp dấu.** Libre Bodoni với `adj 0.53` phóng 1,222× → sàn
   `1,15 × 1,222 = 1,406`, mà hàng đó để `headLh: 1.25`. Chưa sửa: thuộc mục 2 Phần 8
   ("sửa lỗi, CHƯA áp") và là công cụ dev.

### 15.4 Đo sau khi thêm

| | kết quả |
|---|---|
| Hàng trong popover | **"Cormorant Garamond / + Inter · garamond cổ điển, nền Inter"** — 5 cặp, xếp cạnh 3 hàng serif kia |
| Biến inline khi bật | `--font-head` Cormorant · `--pair-adj 0.55` · `--pair-head-ls 0.5px` · `--pair-head-lh 1.52` |
| Thân bài | 12/18 · Inter · **vượt hộp 0px** |
| Menu header desktop khi bật cặp | **HOA 12/16 · 500** *(bản vá lượt trước vẫn giữ)* |
| Chọn lại bộ da = reset | `adj` về `none`, mặt chữ về của bộ da — sạch |
| Console | sạch cả 2 bản |

### 15.5 ⚠ CHỖ PHẢI BIẾT: trên `skin-li`, `headLh` của cặp KHÔNG có hiệu lực

`--pair-head-lh` được khai qua `html.font-pair [data-screen] :is(h1, h2, h3, .text-[…])` =
**(0,2,2)**. Trên `skin-li`, bậc trưng bày bị ghim bởi rule của chính bộ da — `:is(h1,h2,p):is(…)`
(0,3,2) và brand `.pc-brand.h-7` (0,4,1) — nên **line-height đứng nguyên 32px**, `1.52` bị bỏ qua.

Đo trên PDP, hộp tiêu đề 32px, phần ink vượt ra:

| bộ da | line-height thật | `cormorant-inter` | `fraunces-inter` | `couture` |
|---|---|---|---|---|
| **`skin-li`** *(bộ da vào-trang)* | ghim **24/32** | **vượt 5px** ⚠ | vượt 1px | vượt 1px |
| `default` | 18 × 1.52 = 27,36 | vượt 1px | 0 | 0 |
| `skin-mt` | 14 × 1.52 = 21,28 | **0** | 0 | 0 |
| `skin-mp` | 18 × 1.52 = 27,36 | vượt 1px | 0 | 0 |

Tức cơ chế cặp font **chạy đúng ở 3 bộ da**, chỉ `skin-li` chặn vì thang chữ của nó được ghim có
chủ ý (13.3). Không có tổ tiên nào `overflow: hidden` nên chữ **không bị cắt**, chỉ tràn ra chèn
vào dòng dưới. Hai đường xử, đều 1 dòng, **chưa làm — chờ chốt**:

* **A.** để nguyên — coi đây là giới hạn đã biết của công cụ thử (cùng họ với 2 chỗ méo ở 14.4);
* **B.** nâng specificity của rule `--pair-head-lh` cho nó thắng bộ da. Đổi hành vi cho **cả 5
  cặp** trên mọi bộ da, nên không tự ý làm.

---

## Phần 16 — Đồng bộ bộ text style trong Figma sang Inter *(25/08/2026)*

Lệnh user: *"trước đó tôi có kêu bạn tạo bộ typo theo montserrat, giờ đã đổi sang font Inter body
và đang chờ chốt font heading. hãy vào link figma mà bạn tạo sửa lại typo nhé"* —
file **Test agent** `XFfjTNMuPfaTeZvdbVIO2F`, 23 trang.

### 16.1 Đo trước khi sửa

| | |
|---|---|
| Text style | **7** (T1 · T2 · T3 · T4 · T5 · T6 · T7), **tất cả Montserrat** |
| Text node | **358 — 100% Montserrat** |
| Node CÓ gắn style | 296, phủ đủ 7 style *(small/regular 159 · micro 40 · paragraph 35 · mini/medium 23 · heading 1 17 · heading 2 13 · small/medium 9)* |
| Node **KHÔNG** gắn style | **62** — đổi style không cứu được, phải sửa riêng. Toàn bộ nằm ở trang tài liệu: Cover 1 · Getting started 2 · Color 39 · Typography 7 · Spacing & Radius 13 |
| Nấc đang dùng ở 62 node đó | chỉ `Regular` + `Medium` |

**Cái bẫy tránh được:** tên nấc của 2 họ font KHÔNG trùng — Montserrat có `SemiBold`/`ExtraBold`
(liền), Inter có `Semi Bold`/`Extra Bold` (có dấu cách). Đổi họ font theo kiểu giữ nguyên tên nấc
sẽ **ném lỗi** ở mọi node SemiBold. Đã đếm trước: 62 node chỉ dùng Regular/Medium nên không vướng;
nếu sau này có node SemiBold thì phải map tên tay.

### 16.2 Đã làm

* **7 text style → Inter**, giữ nguyên cỡ / dòng / tracking / chữ hoa. Không đổi tên style nên
  **không phải re-link node nào** (khác lượt 20/08 phải re-link 8.593 node vì đổi cấu trúc tên).
* **62 node lẻ → Inter**, giữ nguyên nấc. 0 node bị bỏ qua.
* **Viết lại description của cả 7 style**: ghi rõ thân bài = Inter (chốt 25/08), 2 style heading
  là **mặt chữ CHỜ CHỐT** kèm 3 ứng viên, và 2 ngoại lệ mới của demo (accordion PDP `Medium` chữ
  thường; bậc 18 nay rỗng).
* **Thêm khung `[doc] Mặt chữ — trạng thái`** vào trang *Foundations · Typography* (720×260, dưới
  khung specimen sẵn có) — để người nhận file thấy trạng thái mà không phải bấm vào từng style.

**Đo lại sau khi sửa:** **358/358 node là Inter**, 0 Montserrat còn sót, 0 node tên/chữ trên canvas
còn chữ "Montserrat", 7/7 style ra đúng `Inter Regular|Medium · cỡ/dòng cũ · ls 0.5px · case cũ`.
Chụp lại trang Typography và Product card: dấu tiếng Việt (`ộ ắ ố ã ữ`) vẽ đủ, không rơi fallback.
5 node báo `textTruncation: ENDING` là thuộc tính **tác giả đặt** cho tên sản phẩm trên card —
không phải hệ quả của lượt này, và Inter hẹp hơn Montserrat 7,4% nên chỗ cắt còn lùi ra sau.

### 16.3 Heading để Inter là bản TẠM — vì sao không để nguyên Montserrat

Chờ chốt thì đứng yên là hợp lý, nhưng Montserrat **không còn trong thương hiệu**, nên để 2 style
heading trên Montserrat là file bàn giao mang một font đã bỏ. Để Inter thì file nhất quán, và nó
cũng đúng hành vi thật của demo: F1 quy định *"mọi bậc dưới sàn là Inter"*, tức khi mặt chữ trưng
bày không đạt điều kiện thì heading rơi về chính thân bài.
Chốt xong chỉ phải đổi **2 style**, **30 node** tự cập nhật.

### 16.4 CÒN LỆCH giữa Figma và demo — chờ chốt trước khi dựng lại

1. **Bậc trưng bày**: demo nay chỉ còn MỘT cấp `24/32` (13.1), nên `heading 2` 18/24 thành **bậc
   rỗng**. Giữ style lại để 13 node đang dùng không mất liên kết.
2. **Title sheet/modal** `16/24 · Medium · HOA` — **chưa có style** trong file (16 là cỡ ngoài
   thang §1.2, ngoại lệ user chốt cho vai này).
3. **Nhãn accordion PDP** `14/20 · Medium · chữ THƯỜNG` — phá cặp `medium ⇔ HOA` mà cả 7
   description đang giả định. Ngoại lệ ghi danh, chưa có style riêng.
4. *(ngoài typo, phát hiện khi chụp kiểm)* Product card trong Figma vẫn dựng theo **bản vuông**:
   ô màu và nút quick-add đều vuông, trong khi demo đã đảo **cả hai về tròn** ngày 25/08.
