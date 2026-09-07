# Trang chủ — áp feedback khách · 06/09/2026

Nguồn: slide **"DAFC ONLINE – FASHION MEN/WOMEN"** khách gửi, tham chiếu Bergdorf Goodman ·
Net-a-Porter · MR PORTER. Đã áp vào **cả 2 file** (`desktop.html` + `index.html`).

Bốn chỗ user chốt trước khi làm: USP **đưa lại, đổi thành hàng icon gọn** · "bỏ sub" ở thẻ SP
**chỉ trang chủ** · Occasions + Landing pages **dựng bằng tư liệu thật đang có** · promo banner
**dời `kv-sale` lên trên cùng**.

---

## 1. Đối chiếu từng gạch của khách

| # | Khách yêu cầu | Đã làm |
|---|---|---|
| 1 | **Promo banner on-off** — highlight sale giai đoạn EOSS / Private sale | `HM_PROMO` = một **công tắc**. Đặt `null` là cả khối biến mất, không để lại khoảng trống. Ảnh `kv-sale.jpg` ở tỉ lệ 8/3 — **0 pixel bị cắt** |
| 2 | **Slider KV**: 1 ecom camp + brand days #2 #3 #4 | Hero **2 → 4 slide**, mỗi slide có cột `role` đọc ra vai. 3 brand day dùng KV **thật** của MCM · Stefano Ricci · Christian Louboutin |
| 3 | **Fix product card** — chỉ headline, bỏ sub, "giống net-a-porter cho clean" | `productCard` nhận option `noName`. Thẻ trang chủ nay chỉ còn **tên hãng + giá**. PLP và 6 PDP **không đụng** (phạm vi user chốt) |
| 4 | **Shop by category** | "Mua theo danh mục" — đã có từ 04/09 |
| 5 | **Brands of the moment**: 1 spotlight + 1 block dưới là product của bộ đó | Dựng lại thành **"Thương hiệu nổi bật"**: ảnh biên tập 3/4 + wordmark + headline + *Mua ngay*, ngay dưới là **3 SP của chính bộ đó** |
| 6 | **Occasions** — "What to wear for" | **"Mặc gì cho dịp"** — dải 4 ô ảnh người mẫu + nhãn dịp |
| 7 | **USP** | **Trở lại** ở dạng hàng icon gọn (icon trên, một dòng nhãn, canh giữa) |
| 8 | **Landing pages hili** — TOP STORIES | **"Câu chuyện tại DAFC"** — 3 thẻ ảnh 3/2 + nhãn nhóm + tiêu đề |
| 9 | Sign up | "Đăng ký nhận tin" — đã có |

**Q&A không có trong feedback** → việc gỡ nó sáng nay đi đúng hướng khách, giữ nguyên trạng.

Thứ tự khối trên trang đi **đúng thứ tự đọc của slide**: promo banner · hero · product cards ·
shop by category · brands of the moment · brand list · sale · occasions · USP · stories · sign up.

---

## 2. Bốn chỗ tôi phải quyết bằng số đo, không bằng cảm giác

### 2.1 Hero 4 slide — kho không có 4 tấm ngang

Ô desktop 2:1. Phần trăm giữ được của từng tấm:

| slide | vai | tệp | tỉ lệ nguồn | giữ được |
|---|---|---|---|---|
| 1 | Ecom camp | `kv-women-6` | 1,83 | **92%** chiều cao |
| 2 | Brand day — MCM | `kv-women-5` | 1,78 | **89%** chiều cao |
| 3 | Brand day — Stefano Ricci | `kv-men-9` | 3,00 | **66,7% bề ngang** |
| 4 | Brand day — Christian Louboutin | `kv-men-7` | 1,00 | **50% chiều cao** |

Hai slide sau cắt nặng vì kho **không có KV ngang** cho 2 hãng đó. Ghi ra để xin ảnh đúng khổ,
không im lặng. `kv-men-9` (1440×480) vốn là **header banner của Ricci** nên vai nó đúng, chỉ là
ô 2:1 hẹp hơn nguồn.

### 2.2 Hero mobile: ô 4/3 → **1/1**

Đây là quyết định về **nguồn**, không phải thẩm mỹ. 4 slide cần 4 tấm, mà kho chỉ có 2 tấm
~1,11 còn lại là 1,00 hoặc 0,80:

| tệp | ô 4/3 | **ô 1/1** |
|---|---|---|
| `kv-men-1` | 83% cao | **90% cao** |
| `kv-men-4` | 75% cao | **100% — native** |
| `kv-men-7` | 75% cao | **100% — native** |
| `kv-men-5` | 60% ngang | **80% ngang** |

Ô vuông tốt hơn ở **cả bốn** tấm, và 2 tấm ra khổ native.

**Lệch có ghi danh:** cả 3 hãng có KV chiến dịch trong kho (MCM · Stefano Ricci · Christian
Louboutin) đều thuộc phía hàng **nam**, nên 4 slide mobile hiện đều là ảnh nam. Muốn brand day
cân hai phía thì phải xin thêm KV — **không vá được bằng code**.

### 2.3 Spotlight — một lỗi tôi tự gây và đã sửa trong cùng lượt

Bản dựng đầu đặt ảnh `brand-hero.png` (look **nam**) cạnh headline gọi tên hoạ tiết **Broken
Jewels** (đầm **nữ**), và 3 thẻ dưới cũng là hàng nữ — **một khối nói ba giọng**. Đo trên trang
mới thấy.

Sửa: ảnh spotlight **lấy từ data**, là ảnh người mẫu của SP **đầu tiên** trong danh sách, và 3
thẻ dưới là 3 SP **tiếp theo**. Nhờ vậy ảnh không lặp ở hàng thẻ và cả khối nói cùng một chuyện.
Hệ quả: `brand-hero.png` trở lại trạng thái **chưa dùng** như trước 06/09.

**Vì sao spotlight là Versace:** nó là hãng **duy nhất** trong kho có đủ 3 thứ cùng lúc —
wordmark, ảnh người mẫu, và sản phẩm thật (19 SP). Ba hãng có KV đẹp hơn đều **không có SP**
trong catalog nên nút *Mua ngay* sẽ dẫn vào trang rỗng — đó là sai **dữ liệu**, không phải sai đẹp.

### 2.4 USP — "điều chỉnh icon cho phù hợp hơn"

Khối mới `hmUsp()` **khác hẳn** `camKetSection()` (vẫn phục vụ 6 màn PDP + màn Hoàn tất, không
đụng một ký tự): ở đó là icon-bên-trái + tiêu đề + **một đoạn mô tả**; ở đây **icon trên, một
dòng nhãn, canh giữa**, cao khoảng 1/3.

* **Copy không bịa:** 4 nhãn là bản rút gọn của chính 4 mô tả trong `CAM_KET` (khách đã duyệt).
* **Icon:** giữ `medal` · `exchange` · `truck`; **đổi `wallet` → `card`** cho nhãn trả góp — nhãn
  ở đây hẹp lại thành "Trả góp 0% lãi suất" nên hình chiếc thẻ đọc ra đúng hơn cái ví.
* Khổ máy xếp **2 cột**: 4 mục một hàng thì nhãn dài nhất ("Đổi trả miễn phí 7 ngày") còn ~78px
  và vỡ 3 dòng.

---

## 3. Hai chỗ nội dung phải xin khách — đã dựng khung, chưa có chữ thật

### 3.1 Nhãn dịp của khối Occasions **là thứ tôi đặt**

Catalog **không có** trường `occasion`. Bốn nhãn (*Tiệc tối · Công sở · Dạo phố · Phụ kiện tinh
tế*) suy từ chính món trong ảnh — đây là **taxonomy cần khách chốt**. Khi có trường thật thì
thay bằng lọc thật, hiện mỗi ô dẫn ra một danh mục.

### 3.2 Ba tiêu đề của khối Câu chuyện **không bịa, nhưng cũng không phải bài viết**

Kho không có ảnh/bài biên tập. Ba tiêu đề vì vậy nói **đúng thứ tấm ảnh đang chụp**, và cái thứ
nhất lấy **nguyên văn** một dòng trong `PROMO_MESSAGES` của chính demo:

| ảnh | nhãn nhóm | tiêu đề |
|---|---|---|
| `kv-men-9` | Thương hiệu | Stefano Ricci đã có mặt tại DAFC Online |
| `kv-women-6` | Bộ sưu tập | Bộ sưu tập AW26 |
| `kv-women-5` | Thương hiệu | Bộ sưu tập denim MCM |

Khách cấp bài thật thì thay **cả 3** (ảnh + nhãn + tiêu đề + đích bấm).

---

## 4. Số đo sau khi áp — đo trên trang chạy

| | desktop 1440 | mobile 375 |
|---|---|---|
| Hero | 4 slide · 1 hàng | 4 slide · 1 hàng · ô 1/1 |
| Mặc gì cho dịp | 4 ô · **1 hàng** · ô 330 | 4 ô · **1 hàng** · ô 210 |
| USP | 4 mục · **1 hàng** | 4 mục · **2 cột** (có chủ ý) |
| Câu chuyện | 3 thẻ · **1 hàng** | 3 thẻ · **1 hàng** (dải trượt) |
| Cao cả trang | 4.785 → **6.831** | 3.868 → **5.472** |

Dải hẹp (đo ở **1000**): spotlight về **1 cột** và ô ảnh đổi 3/4 → 3/2 · hàng SP của spotlight
giữ **3 cột** · USP về **2 cột** · câu chuyện về **1 cột** · **không tràn ngang**.

**Điều hướng — 4 cửa mới đều thật:**
ô dịp → PLP "Quần áo" (24 SP) · thẻ câu chuyện → PLP "Phụ kiện" · ảnh spotlight → PLP thương
hiệu **Versace (19 SP — nhánh brand lọc thật)** · promo banner → PLP "Khuyến mãi".

**Công tắc promo:** đặt `HM_PROMO = null` rồi tải lại — banner biến mất, **0 lỗi**, không để lại
khoảng trống. Đã bật lại sau khi kiểm.

**i18n:** 15 cặp khoá mới mỗi file (+2 khoá bản mobile còn thiếu). Đo bản EN: 8 tiêu đề · 4 nhãn
dịp · 4 nhãn USP · 3 tiêu đề câu chuyện — **dịch đủ**, và đổi ngược về VI **không kẹt chuỗi nào**.

**Đã kiểm:** `node --check` cả 2 file OK · render đủ **18 screen** ở cả 2 file, 0 lỗi · **0 ảnh
vỡ** · 0 log lỗi console.

---

## 5. Cần bạn / khách chốt

1. **Trang dài trở lại.** Desktop 4.785 → 6.831 (+43%), mobile 3.868 → 5.472 (+41%) vì thêm 4
   khối khách yêu cầu. Sáng nay bạn vừa muốn trang ngắn hơn — hai hướng này ngược nhau. Nếu cần
   cắt, khối **bỏ được nguyên vẹn** mà không ai phụ thuộc: "Câu chuyện tại DAFC" (−≈460) và
   "Đang giảm giá" (−≈700).
2. **Xin 2 KV ngang cho brand day.** Slide 3 và 4 của hero desktop đang cắt 33% và 50%. Có 2 tấm
   tỉ lệ ≥1,8 là hết vấn đề, không phải sửa một dòng bố cục nào.
3. **Xin KV brand day phía hàng nữ.** Cả 3 hãng có KV trong kho đều thuộc phía nam nên hero
   mobile hiện 4/4 là ảnh nam.
4. **Taxonomy dịp** (mục 3.1) và **3 bài viết thật** (mục 3.2).
5. **"Bỏ sub" có mở rộng ra PLP không?** Lượt này đóng ở trang chủ theo bạn chốt. Nếu khách ý là
   toàn site thì phải nói lại: bỏ tên SP ở PLP là mất thông tin tra cứu chính của trang danh sách.
6. **Promo banner cần ảnh riêng?** Hiện dùng `kv-sale.jpg`. Khách nói banner này bật theo **giai
   đoạn** (EOSS / Private sale) nên mỗi đợt sẽ là một tấm khác — cần biết ai cấp và khổ chuẩn
   (hiện 1600×600 = 8/3).

---

## 6. Bẫy đã dính lại trong lượt này

Vẫn là **dấu backtick trong comment HTML** nằm trong template literal — cắt đôi chuỗi, `node
--check` gãy. Lần này dính ở 2 file. Script `strip_ticks.py` trong scratchpad quét và gỡ tự động;
từ nay chạy nó sau mỗi lượt chèn markup có comment.
