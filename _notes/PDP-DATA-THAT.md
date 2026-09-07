# PDP — data thật của 3 cục mô tả / bảo quản / chính sách (26/08/2026)

Kéo từ `shop.dafc.com.vn`, đúng 6 trang sản phẩm đang dùng trong demo. Mục đích: có
**độ dài thật** để quyết mỗi ô nên để nở tự nhiên hay phải cho cuộn trong ô.

Đã làm ở **CẢ 2 BẢN**: `index.html` (mobile) và `desktop.html`.

---

## 1. Trang thật có gì

PDP thật của DAFC có **đúng 3 tab**, không phải 4:

| # | Nhãn trên trang thật | Bên trong |
|---|---|---|
| 1 | Mô tả | 1 đoạn mô tả → các dòng `Nhãn: giá trị` (thương hiệu, mã SP kèm ID, chất liệu, kích thước, xuất xứ, sản xuất tại) → danh sách gạch đầu dòng đặc điểm |
| 2 | Hướng dẫn bảo quản | (tuỳ nhóm hàng) 1–2 câu dẫn → các bullet |
| 3 | Chính sách đổi hàng | 1 câu dẫn → nhóm "Sản phẩm không áp dụng" 4 bullet → nhóm "Thời gian đổi hàng" 2 bullet |

Không có tab "Về thương hiệu". Đã kiểm cả trang brand `shop.dafc.com.vn/versace`:
**không có đoạn giới thiệu thương hiệu nào** để kéo về.

Ba điều đáng chú ý về nội dung:

- **Panel đổi hàng giống hệt nhau trên cả 6 trang** — một khối dùng chung, không phải
  text riêng theo sản phẩm. Trong code đã tách thành hằng `RETURN_POLICY`.
- **Panel bảo quản đi theo NHÓM HÀNG, không theo sản phẩm**: quần áo 1 bộ (5 bullet),
  phụ kiện 1 bộ (4 bullet), túi da 1 bộ (6 bullet), giày 1 bộ dùng chung cho cả 3 đôi
  (4 bullet → hằng `CARE_SHOES`). Nghĩa là bản thật chỉ có **4 độ dài** cần thiết kế cho
  ô này, không phải mỗi SKU một kiểu.
- **Panel mô tả dài ngắn theo sản phẩm** (đoạn mô tả 1–5 dòng + 5–7 dòng meta + 2–4 bullet).

## 2. Số đo — chiều cao thật khi mở ô

Đo trên demo đang chạy, bản mobile, bộ da vào-trang `skin-mt skin-li` (thân accordion
12/18, nhãn 14/20). Số là chiều cao **phần thân** ô, chưa tính hàng nhãn 56px.

**Khổ 375 × 812**

| Màn | Sản phẩm | Mô tả | Bảo quản | Đổi trả | Thương hiệu |
|---|---|---:|---:|---:|---:|
| `pdp` | Đầm lụa | 290 | 300 | 290 | 70 |
| `pdp2` | Khăn lụa | 294 | **144** | 290 | 70 |
| `pdp3` | Túi da Emblème | 350 | **450** | 290 | 70 |
| `pdp4` | Giày cao gót | **368** | 172 | 290 | 70 |
| `pdp5` | Giày loafer | 332 | 172 | 290 | 70 |
| `pdp6` | Giày sneaker | 344 | 172 | 290 | 70 |

**Khổ 360 × 640** (điện thoại nhỏ — trường hợp xấu nhất)

| Màn | Mô tả | Bảo quản | Đổi trả |
|---|---:|---:|---:|
| `pdp` | 290 | 318 | 290 |
| `pdp3` | 350 | **468** | 290 |
| `pdp4` | 386 | 208 | 290 |

**Khổ desktop 1440 × 900** — cột thông tin rộng 427px nên ít ngắt dòng hơn, mọi ô thấp
hơn mobile:

| Màn | Sản phẩm | Mô tả | Bảo quản | Đổi trả | Thương hiệu |
|---|---|---:|---:|---:|---:|
| `pdp` | Đầm lụa | 290 | 264 | 272 | 52 |
| `pdp2` | Khăn lụa | 294 | **144** | 272 | 52 |
| `pdp3` | Túi da Emblème | 332 | **378** | 272 | 52 |
| `pdp4` | Giày cao gót | **350** | 172 | 272 | 52 |
| `pdp5` | Giày loafer | 314 | 172 | 272 | 52 |
| `pdp6` | Giày sneaker | 326 | 172 | 272 | 52 |

Bật tiếng Anh: chiều cao **không đổi** ở cả 2 khổ (mobile 350/450/290/70 · desktop
332/378/272/52 ở `pdp3`) — bản dịch dài hơn về ký tự nhưng ngắt dòng ra đúng bằng số
dòng tiếng Việt.

Số ký tự nguồn, để đối chiếu về sau nếu khách đổi copy:

| SP | Mô tả | Bảo quản | Đổi hàng |
|---|---:|---:|---:|
| 1 Đầm lụa | 344 | 559 | 403 |
| 2 Khăn lụa | 378 | 243 | 403 |
| 3 Túi da | 494 | **1.014** | 403 |
| 4 Cao gót | 590 | 372 | 403 |
| 5 Loafer | 437 | 372 | 403 |
| 6 Sneaker | 538 | 372 | 403 |

## 3. Trả lời câu "nên cho scroll hay sao"

### 3.1 Mobile — **KHÔNG cho cuộn trong ô. Để ô nở tự nhiên.**

Ba căn cứ:

1. **Ô dài nhất vẫn nằm trong một màn.** Vùng nhìn thấy sau khi trừ navbar sticky 48px
   và thanh CTA đáy 84px: `812 − 132 = 680px` ở khổ 375, `640 − 132 = 508px` ở khổ 360.
   Ô dài nhất là bảo quản của túi da: **450px** (khổ 375) / **468px** (khổ 360). Vẫn thấp
   hơn vùng nhìn — người xem mở ra là đọc được trọn ô, không cần cuộn lần hai.
2. **Accordion đang là loại mở-một-ô.** Đã kiểm bằng cách bấm 2 nhãn liên tiếp: ô trước
   tự đóng. Nên không có tình huống 4 ô mở cùng lúc dồn thành 1.388px.
3. **Cuộn-trong-cuộn là cái bẫy trên mobile.** Ô cuộn nằm giữa trang cuộn thì ngón tay
   vuốt lên rất dễ ăn vào ô thay vì trang (hoặc ngược lại), và mép cắt của ô trông như
   nội dung bị lỗi chứ không như "còn nữa". Chỉ đáng đánh đổi khi ô vượt hẳn một màn —
   chưa phải trường hợp này.

Chỉ có **một chỗ** hơi lệch nhịp: ở khổ 360, ô 468px + hàng nhãn 56px = 524px > 508px,
nên khi ô mở hết thì **hàng nhãn bị đẩy khỏi tầm nhìn**. Đây là hành vi bình thường của
accordion, nhưng nếu muốn nhãn luôn còn thấy thì có 2 cách:

- **(A) Cuộn tới nhãn khi mở** — bấm mở thì `scrollIntoView` hàng nhãn đó lên sát dưới
  navbar. 1 dòng JS, giữ nguyên thiết kế, giải quyết đúng cái nó gây ra. *Nếu chọn xử lý
  chỗ này thì tôi khuyên cách A.*
- **(B) Kẹp chiều cao + "Xem thêm"** — giới hạn ô ở ~320px, phần dư ẩn sau nút "Xem
  thêm" (không phải cuộn). Đọc được ngay 3–4 bullet đầu, ai cần thì bung. Đổi lại là
  thêm một trạng thái nữa cho component, và phải thiết kế cả mask mép dưới.

Cách còn lại — **cho cuộn trong ô** — tôi không khuyên, vì cả 24 ô đo được đều thấp hơn
vùng nhìn nên nó chỉ thêm rắc rối mà không giải quyết vấn đề nào đang có thật.

Ngưỡng để đổi ý: nếu sau này khách đưa copy bảo quản dài hơn **~640 ký tự** cho một nhóm
hàng (mốc hiện tại của túi da là 1.014 ký tự → 450px), lúc đó mới cân lại phương án B.

### 3.2 Desktop — cũng KHÔNG cuộn trong ô, nhưng nút thắt nằm ở CỘT STICKY

Ở khổ 1440 bản thân các ô còn thấp hơn mobile (dài nhất 378px), nên chuyện cuộn-trong-ô
càng không cần. Nhưng đo xong lộ ra một chỗ khác đáng biết — **cột thông tin bên phải là
`.dk-sticky-info`, ghim ở `top: 152px`**, và nó không đủ chỗ:

| Trạng thái cột phải (`pdp3`, khổ 1440 × 900) | Chiều cao |
|---|---:|
| Chỗ khả dụng khi cột đang ghim (`900 − 152`) | **748** |
| Cột khi đóng hết 4 ô | 762 |
| Cột khi mở ô Mô tả | 1.094 |
| Cột khi mở ô Bảo quản (dài nhất) | **1.140** |
| Cột khi mở ô Đổi trả | 1.034 |

Nghĩa là **ngay cả khi đóng hết, cột đã cao hơn chỗ nó có 14px**; mở ô dài nhất thì thừa
392px. Phần thừa **không mất** — cha của cột cao 1.731px nên sau ~591px cuộn là cột nhả
ghim và trôi lên, đuôi hiện ra. Nhưng cảm giác là: cuộn một đoạn thấy trang **không nhích**
(cột đang ghim, phần dưới bị cắt), rồi đột ngột cả cột trượt lên.

Cần nói rõ: **đây là chỗ chật có từ trước, không phải do data thật gây ra** — cột đã 762 >
748 khi mọi ô còn đóng. Data dài chỉ làm nó lộ ra rõ. Trên màn 1080p (vùng nhìn ~950px)
thì trạng thái đóng vừa khít; trên laptop 1440 × 900 thật (vùng nhìn ~780px sau khi trừ
thanh trình duyệt) thì cắt ngay cả khi đóng.

Ba cách, nếu bạn muốn xử:

- **(A) Để nguyên.** Đuôi vẫn đọc được sau khi cột nhả ghim. Không sửa gì.
- **(B) Bỏ ghim khi cột cao hơn vùng nhìn** — cột cuộn tự nhiên cùng trang. Sạch nhất, không
  sinh thêm mặt cuộn nào, và đúng bản chất vấn đề (cột quá cao để mà ghim). *Tôi khuyên
  cách này.*
- **(C) Cho CỘT cuộn** (`max-height: calc(100vh - 152px); overflow-y: auto`) — kiểu nhiều
  site cao cấp đang làm. Cuộn nằm ở cột chứ không ở từng ô, và trên desktop thì cuộn lồng
  bằng chuột lành hơn nhiều so với ngón tay trên mobile. Đổi lại: phải thiết kế thanh cuộn
  trong cột, và cột sẽ có mép cắt riêng.

Vẫn **không** khuyến nghị cho cuộn trong từng ô ở bất kỳ khổ nào: cả 48 ô đo được (24 mobile
+ 24 desktop) đều thấp hơn vùng nhìn.

## 4. Đã thay gì trong code

### 4.1 `index.html` (mobile)

- `PRODUCT_INFO` — 6 entry, mỗi entry thêm `meta` (dòng nhãn:giá trị), `careLead` (câu
  dẫn), và `care` đổi từ **một câu rút gọn** thành **mảng bullet nguyên văn**. `features`
  của SP#4 trước để mảng rỗng, nay có đủ 4 dòng thật.
- 2 hằng mới: `CARE_SHOES` (bộ bullet giày dùng chung 3 đôi) và `RETURN_POLICY` (khối
  đổi hàng dùng chung 6 màn).
- Hàm mới `pdpTabs(i)` dựng nội dung cho **cả 6 màn**. Trước đó 6 màn tự khai mảng `tabs`
  riêng nên nội dung lệch nhau: 2 câu chính sách khác chữ giữa `pdp` và `pdp2`, và bảng
  thông số chỉ `pdp2` render còn 5 màn kia bỏ (chỗ hở đã ghi trong README). Nay hết lệch.
- `.acc-bullet` — 1 rule CSS cho thụt treo. Không dùng `pl-3 -indent-3` vì `tailwind.css`
  build sẵn có `.pl-3` nhưng chỉ có `.-indent-4`.
- Dấu `·` của bullet nằm trong `<span>` riêng, để text node của câu còn khớp key I18N.
- Bullet dựng bằng `p` chứ không `ul/li`: các bộ da bắt thân accordion bằng
  `[data-pdp-acc] .acc-inner :is(div, p, span)`, thêm `li` là ra ngoài vùng phủ.
- `pdp5` / `pdp6`: thẻ bọc thân ô đổi `<p>` → `<div>`. Bắt buộc, vì thân ô nay là nhiều
  đoạn — `<p>` lồng `<p>` sẽ tự đóng thẻ cha và mất luôn padding `pb-4 px-2`.
- I18N: thêm ~45 key EN cho bullet đặc điểm + bảo quản + nhãn meta; gỡ 6 key của các câu
  `care` rút gọn không còn được render. Panel **đổi hàng cố ý để nguyên tiếng Việt** —
  cùng lý do đã áp cho 3 trang chính sách: văn bản pháp lý chờ bản EN chính thức của DAFC.

Đã kiểm sau sửa: 0 lỗi console · 6/6 màn render đủ 3 panel · thụt treo đúng 12/−12px ·
0 phần tử tràn ngang · padding thân ô `pdp5`/`pdp6` còn nguyên 8/8/16 · bật EN ra tiếng
Anh đủ phần product copy.

### 4.2 `desktop.html`

Cùng bộ data và cùng cách dựng, nhưng desktop **vốn đã gọn hơn**: chỉ có MỘT renderer
`dkScreenPDP` và đã có sẵn hàm `pdpTabs(idx, opts)`, nên không phải gộp 6 chỗ như mobile.

- `PRODUCT_INFO` + `CARE_SHOES` + `RETURN_POLICY`: port y nguyên từ mobile.
- `pdpTabs` đổi thành bản dựng HTML 3 panel. **2 tuỳ chọn cũ biến mất**: `specs` (chỉ
  `pdp2` dựng bảng thông số — nay các dòng đó nằm trong panel Mô tả của cả 6 bản) và
  `returnTab` (`pdp2` từng có câu chính sách khác 5 bản kia — trang thật dùng chung một
  khối). `PDP_RETURN_TAB` / `PDP_BRAND_TAB` theo đó không còn cần.
- Markup accordion: bỏ nhánh `sp` (bảng specs), và thẻ bọc thân ô đổi `<p>` → `<div>` —
  cùng lý do như `pdp5`/`pdp6` ở mobile.
- `.acc-bullet`: thêm rule y hệt mobile.
- I18N: chèn cùng khối ~45 key EN, gỡ cùng 6 key `care` rút gọn. Đặt trước `I18N_REV`
  (nó dựng bằng cách đảo `I18N`).
- **Vá kèm 1 chỗ**: nhánh `.sheet-trigger` của PDP4 gọi `__openInfoSheet(t[0], t[1])` —
  2 tham số nên `openS` dùng `textContent`, mà thân tab nay là HTML thì sheet sẽ in ra
  nguyên thẻ. Đã thêm `true`. Nhánh này **hiện không có markup nào kích hoạt** (PDP4 đã
  đổi từ bottom sheet sang accordion tại chỗ) — vá cho đúng, không phải vì đang lỗi.

Đã kiểm sau sửa: 0 lỗi console · 6/6 màn render đủ 3 panel · 0 chỗ in ra thẻ HTML thô ·
thụt treo đúng −12px · 0 phần tử tràn ngang · bật EN ra tiếng Anh đủ phần product copy.

> **Lưu ý khi tự đo lại**: các số chiều cao ở mục 2 là chiều cao **nội dung** của thân ô
> (`.acc-inner > *`), đo được kể cả khi ô đang đóng — đúng con số cần cho câu hỏi thiết kế.
> Đừng đo bằng `.acc-inner` vì nó `overflow: hidden` trong grid `0fr`, luôn ra 0. Và trong
> môi trường không hiển thị khung xem (headless), transition `grid-template-rows` bị đóng
> băng nên `.acc.open` vẫn cho `grid-template-rows: 0px` — không phải lỗi code. Muốn đo cột
> lúc mở thì đặt tạm `.acc-body { display: block }` bằng inline style.

## 5. Chờ chốt

1. **Nhãn tab.** Demo đang là "Mô tả sản phẩm" / "Bảo quản sản phẩm" / "Chính sách đổi
   trả". Trang thật: "Mô tả" / "Hướng dẫn bảo quản" / **"Chính sách đổi hàng"**. Cái thứ
   ba **lệch nghĩa chứ không chỉ lệch chữ** — nội dung bên trong nói về *đổi hàng*
   (14 ngày lỗi NSX / 7 ngày đổi nhu cầu), không nói gì về trả hàng hoàn tiền. Chưa đổi
   vì đổi nhãn là đổi key I18N. Đề nghị: đổi tab 3 thành "Chính sách đổi hàng", 2 tab đầu
   giữ chữ của demo cho đủ nghĩa.
2. **Tab 4 "Về thương hiệu Versace"** — không có trên trang thật và không có nguồn copy
   nào để kéo. Hoặc xin đoạn giới thiệu thật từ khách, hoặc bỏ tab. Câu đang hiện là text
   tự viết (70px).
3. **Cột sticky ở desktop** — chọn A / B / C ở mục 3.2. Chưa sửa vì đây là chỗ chật có
   từ trước, và sửa là chạm vào layout PDP desktop chứ không chỉ chạm cụm accordion.
4. **3 bản fork desktop** (`desktop-neutral` / `desktop-editorial` / `desktop-atelier`)
   vẫn đang dùng data rút gọn của lượt 05/08. Port sang thì lặp lại đúng 6 bước ở mục 4.2.

## 6. 2 chỗ cố ý không bê nguyên trang thật

- Dấu nháy cong `“Broken Jewels”` giữ ở dạng thẳng `"Broken Jewels"` — key I18N đang khoá
  theo dạng thẳng, đổi glyph là chết bản dịch.
- SP#2 (khăn lụa) trên trang thật có dòng `Khối lượng: TÂM (kg)` — lỗi nhập liệu của site
  (tên người rơi vào ô khối lượng). Không đưa vào demo.

Một chỗ nữa đáng biết: `Kích thước` dùng lại key I18N sẵn có của bộ lọc nên bật EN ra
`Size`, trong khi ở panel Mô tả nghĩa đúng là `Dimensions`. Giá trị đi kèm
(`L27 x H12 x W10 (cm)`) làm rõ nghĩa nên chưa tách key — tách thì phải đổi cả nhãn bộ lọc.
