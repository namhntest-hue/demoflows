# PLP — một lượt hiển thị 24 sản phẩm (04/09/2026)

> Lệnh user: *"ở PLP sẽ set cho 1 lượt hiển thị sẽ là 24 sản phẩm nhé"*
> Áp **CẢ 5 FILE** (`index.html` · `desktop.html` · 3 bản fork skin).

---

## 1. Trước lượt này PLP **không có phân trang**

Đây là điều phải nói trước, vì nó quyết định khối lượng việc: yêu cầu không phải
"đổi số 4 thành 24", mà là **dựng phân trang thật** ở chỗ trước giờ chỉ có một cử
chỉ trang trí.

| | Trước 04/09 | Sau |
|---|---|---|
| Lượt đầu | **cả danh sách** (40 thẻ ở PLP thời trang) | **24 thẻ** |
| Bấm "Xem thêm" | nối **4 thẻ TRÙNG** lấy từ ĐẦU danh sách (`sortedProducts().slice(0, 4)`) | nối **24 thẻ TIẾP THEO**, không trùng |
| Nút khi hết hàng | **không bao giờ hết** — bấm mãi vẫn nối thêm thẻ trùng | **tự ẩn** |
| Số ô xám lúc tải | cứng **4** | **đúng số thẻ sắp nối** (lượt cuối thường < 24) |
| Mẫu số thanh tiến độ | `PLP_TOTAL = 152` (catalog **giả lập**) | **số sản phẩm thật** của danh sách |

Nói cách khác: thẻ trùng lặp trên lưới đã hết hẳn — đo lại mọi kịch bản đều
`số thẻ === số thẻ duy nhất`.

## 2. Cách thi hành

**Một hằng, một chỗ cắt, một hàm đồng bộ nút** — khai cạnh `plpGridInner`, giống
nhau ở cả 5 file:

```js
const PLP_PER_PAGE = 24;

function plpGridInner(list, card) {
  if (!list.length && plpFilters.length) return plpFilterEmptyHTML();
  return list.slice(0, PLP_PER_PAGE).map(({ p, i }) => card(p, i)).join('');
}
function plpShownCount(root) { … đếm [data-product] trong #plpGrid … }
function syncShowMore(root)  { … ẩn nút khi plpShownCount >= sortedProducts().length … }
```

Ba quyết định kỹ thuật đáng ghi lại:

1. **Cắt trong `plpGridInner`, không rải `slice` ở từng đường.** Mọi đường vẽ lại
   lưới đều đi qua hàm này — template màn, `renderPlpGrid` khi áp/xoá bộ lọc, đổi
   sắp xếp. Nút "Xem thêm" thì `insertAdjacentHTML` **trực tiếp** vào lưới nên
   không chạm hàm, vì vậy lượt đã nối không bị lượt render sau xoá mất.
2. **Mốc "đang hiện tới đâu" đọc từ SỐ THẺ TRONG LƯỚI, không từ biến đếm riêng.**
   Biến đếm thì phải reset ở từng đường vẽ lại (lọc · sắp xếp · đổi PLP · đổi mật
   độ cột) — thiếu một chỗ là hoặc nút chết, hoặc lượt sau nối trùng thẻ. Đếm
   `[data-product]` thì mốc luôn đúng vì nó *là* trạng thái thật của lưới. Khối
   "không khớp bộ lọc" không mang `[data-product]` nên tự đếm ra 0.
3. **`syncShowMore` gộp luôn việc ẩn-khi-lọc-sạch.** Trường hợp 0 kết quả tự vào
   nhánh ẩn (`0 >= 0`), nên 3 dòng `toggle('hidden', !list.length)` rải ở
   `wire()` / `renderPlpGrid` / template đã gom về một hàm.

**Mobile còn một chỗ phải vá kèm**: handler cũ lấy lưới bằng
`sm.closest('[data-scroller]').querySelector('.grid')` — `.grid` **đầu tiên** trong
màn. Hồi chưa phân trang thì trúng hay trượt cũng chỉ là nối 4 thẻ trang trí; nay
mốc lượt kế tiếp đọc từ `#plpGrid`, nối sai chỗ là mốc đứng yên và **bấm mãi không
tiến**. Đã đổi sang `root.querySelector('#plpGrid') || …` cho khớp bản desktop.

## 3. `PLP_TOTAL = 152` nghỉ hưu — đây là chỗ tôi tự quyết

Con số 152 là **catalog giả lập**, dựng hồi PLP chưa phân trang để minh hoạ
"Xem thêm còn nhiều hàng". Giữ nó cạnh phân trang thật là hai thứ chọi nhau ngay
trên một màn:

> *"Bạn đã xem **40** trong **152** sản phẩm"* — trong khi cái nút vừa **tự ẩn**
> vì đã vẽ hết hàng.

Nên mẫu số nay là **số sản phẩm thật** của danh sách đang xem. Chỗ sửa nếu đảo
chốt: **1 dòng** trong `plpProgressTotal` (3 bản desktop) — `desktop-editorial.html`
không có hàm này, tính thẳng ở **2 chỗ** (`dkProductGrid` + `updatePlpProgress`).

**Muốn lấy lại cảm giác catalog lớn thì THÊM SẢN PHẨM vào `PRODUCTS`, đừng nâng
mẫu số** — nâng mẫu số là quay về đúng chỗ mâu thuẫn vừa gỡ.

## 4. Hệ quả: nút "Xem thêm" biến khỏi phần lớn các màn

Catalog demo nhỏ hơn nhiều so với 152, nên 24/lượt làm nút hết việc ở khá nhiều
màn. Đây là **kết quả thật của con số 24**, không phải lỗi — nhưng cần biết trước
khi trình khách.

### `index.html` + `desktop.html` (catalog 48 = 40 thời trang + 8 làm đẹp)

| Màn | Lượt 1 | Bấm 1 lần | Nút |
|---|---|---|---|
| PLP danh mục (hàng thời trang) — 40 SP | 24 | +16 → 40 | **hiện**, rồi ẩn |
| Tìm kiếm rỗng = cả catalog — 48 SP | 24 | +24 → 48 | **hiện**, rồi ẩn |
| PLP ngành Làm đẹp — 8 SP | 8 | — | ẩn ngay |
| Trang thương hiệu Versace — 19 SP | 19 | — | ẩn ngay |
| D&G 14 · Zimmermann 12 · Montblanc 2 · Moschino 1 | tất cả | — | ẩn ngay |
| Đang áp bộ lọc (ví dụ Versace → 16 KQ) | 16 | — | ẩn ngay |

### 3 bản fork skin (catalog **24** = 16 thời trang + 8 làm đẹp)

Đóng băng từ 21/08 nên chưa có data D&G + Zimmermann của 02/09. Với 24/lượt thì
**mọi màn PLP của 3 bản này vào một lượt là hết**, nút không bao giờ hiện.

| Bản | Thời trang | Làm đẹp | Cả catalog |
|---|---|---|---|
| `desktop-neutral` | 16 | 8 | 24 |
| `desktop-editorial` | 16 | 8 | 24 |
| `desktop-atelier` | 16 | 8 | 24 |

**Nếu muốn nút "Xem thêm" còn xuất hiện để trình khách**, hai đường — cả hai đều
cần user chốt:
- **(a) Thêm sản phẩm vào `PRODUCTS`** cho đủ vượt 24/lượt. Đúng hướng, nhưng là
  việc data (ảnh + tên + giá + màu cho từng SP mới).
- **(b) Hạ `PLP_PER_PAGE`** xuống dưới cỡ danh sách nhỏ nhất. Trái lệnh 24 nên tôi
  không tự làm; ghi ra để đủ phương án.

## 5. Đã đo

Chạy trên `http.server 8125`, đo bằng DOM thật (không phải đọc code).

**`desktop.html`** — 3 kịch bản, mỗi kịch bản đo lượt 1 và sau khi bấm:

| Màn | Lượt 1 | Sau khi bấm |
|---|---|---|
| Danh mục thời trang (40) | 24 thẻ · "24 trong 40" · bar **60%** · nút hiện | 40 thẻ · "40 trong 40" · bar **100%** · nút **ẩn** |
| Tìm kiếm rỗng (48) | 24 thẻ · "24 trong 48" · bar **50%** · nút hiện | 48 thẻ · "48 trong 48" · bar **100%** · nút **ẩn** |
| Thương hiệu Versace (19) | 19 thẻ · "19 trong 19" · bar 100% · nút **ẩn** | — |

**Vòng trạng thái** (cùng một màn, làm liên tiếp):

| Bước | Thẻ | Duy nhất | Chữ tiến độ | Nút |
|---|---|---|---|---|
| Vào PLP | 24 | 24 | 24 trong 40 | hiện |
| Bấm Xem thêm | 40 | **40** | 40 trong 40 | ẩn |
| Đổi sắp xếp (`price-asc`) | **24** | 24 | 24 trong 40 | **hiện lại** |
| Bấm Xem thêm | 40 | 40 | 40 trong 40 | ẩn |
| Áp bộ lọc Versace | 16 | 16 | 16 trong 16 | ẩn |
| Xoá bộ lọc | 24 | 24 | 24 trong 40 | hiện |

**`index.html`** (mobile, không có thanh tiến độ — chỉ có "N sản phẩm" ở heading):
24 → bấm → 40 (0 trùng), nút ẩn; lọc Versace 16 nút ẩn; xoá lọc về 24 nút hiện;
tìm kiếm rỗng 24 → 48. Heading vẫn in **tổng khớp** ("40 sản phẩm") chứ không phải
số đang hiện — đúng vai của nó.

**Số ô xám lượt cuối**: bắt giữa lúc tải, đếm được **16** ô ứng với 16 thẻ sắp nối
(trước là cứng 4). Đổ cứng 24 ô rồi chỉ trả 16 thẻ là lưới tụt một nhịp trước mắt
người xem.

**3 fork**: `PLP_PER_PAGE = 24` có mặt, danh sách 16/24 nên vào một lượt là hết,
nút ẩn — đúng như bảng ở §4.

**Đổi mật độ 3/4 cột** (desktop) và **1/2 cột** (mobile) chỉ toggle class trên
`#plpGrid`, KHÔNG vẽ lại lưới → số thẻ đang hiện giữ nguyên, mốc vẫn đúng. Không
phải sửa gì.

`node --check` 2 khối script × 5 file: **sạch**. Console 2 bản: **sạch**. Không
tràn ngang.

## 6. Còn mở

1. **Catalog 3 fork chỉ 24 SP** → nút "Xem thêm" không bao giờ hiện ở đó (§4).
2. **Mẫu số 152 đã bỏ** — nếu khách muốn con số lớn trở lại thì thêm data, không
   nâng mẫu số (§3).
3. Số 24 hiện khai **riêng từng file** (`PLP_PER_PAGE` × 5). Không gom được vì 5
   file là 5 bản HTML độc lập — đổi số thì sửa 5 chỗ; grep `PLP_PER_PAGE` ra đủ 5.
