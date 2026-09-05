# Figma — gom nội dung lặp của các màn "nhiều case" thành component (05/09/2026)

> Lệnh user: *"các trang có nhiều case như pdp, plp các nội dung bên trong thường lặp đi lặp lại từ 1
> bản thiết kế gốc, giờ bạn hãy tạo component cho các case — ví dụ pdp/khối chọn là có thể tạo thành 1
> component và nhiều biến thể, để sau này có update thì cũng update nhanh hơn thay vì chỉnh từng chi
> tiết từng frame."*
>
> File `Test agent` · `XFfjTNMuPfaTeZvdbVIO2F`. Page `components` (nơi ở của component) và `screens`
> (nơi các màn dùng chúng).

---

## 1. Kết quả

**6 bộ component mới · 26 biến thể · 34 instance · 27 khung thôi vẽ tay.**

| Bộ | Trục biến thể | Số biến thể | Khổ | Instance |
|---|---|---|---|---|
| **`product-options`** *(khối chọn)* | `platform` × `state` | **10** | mobile 375 · desktop 545 | 12 |
| **`product-cta`** *(cụm mua)* | `platform` × `state` | **6** | mobile 375×106 · desktop 545×122 | 12 |
| **`quick-add`** | `case` | **4** | 375 × 605/579/579/535 | 4 |
| **`product-card-hover`** | `sizes` | **2** | 345×590 · 345×588 | 2 |
| **`size-guide`** | `platform` | **2** | 375×812 · 880×792 | 2 |
| **`product-alert`** *(nhận thông báo khi có hàng)* | `platform` | **2** | 375×406 · 490×354 | 2 |

Mỗi bộ nằm trong một section riêng trên page `components` (trang này nay **29 section**, file có **42
component set**). Cả 6 bộ đều đã có **mô tả** — mở panel bên phải là đọc được ngay dùng vào việc gì.

## 2. Điều đáng nói: `nút mua` chỉ có **3** thiết kế, không phải 5

Trong section trạng thái có **5 khung** `PDP / nút mua · mobile · …`. Đo nội dung thật thì:

| Khung | Nhãn nút | `state` của `action` |
|---|---|---|
| mặc định | Đặt trước | default |
| đã chọn size | Đặt trước | default |
| size sắp hết | Đặt trước | default |
| size hết hàng (khoá) | Tạm hết hàng | `_disabled` |
| nhận thông báo | Nhận thông báo khi có hàng | default |

**Ba khung đầu giống hệt nhau từng thuộc tính.** Nên `product-cta` dựng **3 trạng thái**, và 3 khung
đó cùng trỏ về một biến thể `state=default`. Đây chính là cái user muốn gỡ: 5 chỗ vẽ tay cho 3 thiết
kế. Giữ 5 khung tài liệu là đúng — chúng ghi *hợp đồng* "size nào thì CTA nào" — nhưng nay 5 khung
chỉ còn 3 nguồn sự thật.

Cùng lý do, `quick-add` dùng **một trục `case`** thay vì lưới `state × sizes`: trong 4 case thì 2 là
**dữ liệu** (bộ size S·M·L) chứ không phải trạng thái, dựng thành lưới sẽ đẻ ra ô trống vô nghĩa.

## 3. Đã chứng minh component thật sự lan xuống instance

Không chỉ đo kích thước — chạy hẳn một lượt sửa thật rồi hoàn tác:

1. Đổi chữ `Kích thước` → `CHỌN CỠ (thử)` trong biến thể `product-options / platform=mobile, state=default`.
2. Đọc lại: **cả 2 instance đổi theo** — khung tài liệu `PDP / khối chọn · mobile · chưa chọn size`
   VÀ khối nằm sâu trong màn `PDP / mobile · SP1 đặt trước`.
3. Trả chữ về `Kích thước` → cả 2 về nguyên trạng.

Đó là toàn bộ giá trị của lượt này: **sửa 1 chỗ, 34 chỗ đổi theo.**

## 4. Cách dựng (để lần sau làm lại nhanh)

- **Nguồn là chính khung đang có**, không vẽ mới: `clone()` khung trạng thái →
  `createComponentFromNode()` → `combineAsVariants()`. Nhờ vậy component **giống hệt** cái đang được
  duyệt, không sinh sai khác.
- Với khung mà component chỉ là MỘT PHẦN (khối chọn desktop nằm trong cột info 569; quick add / lớp
  nổi nằm trong khung có lớp phủ) thì **chỉ bóc đúng phần đó**, lớp phủ và cột bao vẫn là bối cảnh
  trang.
- **`combineAsVariants` KHÔNG tự xếp biến thể** — phải xếp lưới bằng tay sau khi gộp (đã ghi trong
  [[dafc-figma-filter-components]], gặp lại lần này).
- Thay khung → instance: giữ nguyên `layoutAlign` / `layoutSizingHorizontal` / `layoutSizingVertical`
  của node cũ rồi mới `remove()`. Đo trước–sau: **0px lệch trên cả 27 khung.**

## 5. Ba bẫy dính trong lượt này

**(a) `layoutPositioning = 'ABSOLUTE'` KHÔNG tự truyền sang node thay thế.**
4 khung lớp nổi có tấm modal đặt tuyệt đối trong khung auto layout. Hàm thay của tôi chỉ set x/y khi
cha **không** auto layout, nên 3 tấm rơi về `0,0`: bảng kích thước desktop lẽ ra `280,54`, nhận thông
báo desktop `475,273`, nhận thông báo mobile `0,406`. **Phát hiện bằng cách đo lề 4 phía**, không phải
bằng chiều cao khung — chiều cao vẫn đúng y nguyên nên mọi phép kiểm cũ đều "xanh".
Số đúng lấy từ CODE chứ không đoán: `desktop.html:971` — `.dk-modal { left:50%; top:50%; transform:
translate(-50%,-50%) }` → **canh giữa cả 2 trục**; `index.html:13144` — `.ns-panel { absolute
inset-x-0 bottom-0 }` → **dính đáy**.

**(b) Hoàn tác auto layout phải hoàn tác CẢ toạ độ con.**
Thử bật auto layout cho 2 khung còn tuyệt đối trong `product-alert`; lệch 321px / 436px nên trả lại.
`layoutMode = 'NONE'` **không** đưa con về chỗ cũ. Đã kiểm lại bằng cách đo lại đệm/khe và so với số
đo ghi TRƯỚC khi thử: `0/20/8/16` với khe 20 (mobile) và 91 (desktop) — **trùng khít**, tức lượt thử
không xê dịch gì. (Bẫy này đã có trong [[dafc-figma-pdp-states]], lần này dính lại đúng chỗ đó.)

**(c) `figma_capture_screenshot` chết hẳn cả phiên** — timeout 30s ngay cả với node 375×106 toàn
chữ. Nên **mọi kiểm chứng ở đây là số, không phải ảnh**: kích thước, lề 4 phía, đếm instance, đếm
liên kết hỏng, tỉ lệ auto layout, và phép thử lan truyền ở mục 3.

## 6. Đo

| Hạng mục | Kết quả |
|---|---|
| Lệch kích thước sau khi thay 27 khung | **0px** (từng khung một) |
| Liên kết component hỏng | **0** / 645 instance trên page `screens` |
| Auto layout trong 6 bộ mới | 100% ở 5 bộ (82/82 · 12/12 · 73/73 · 31/31 · 251/251) |
| | `product-alert` **17/19 = 89%** — 2 khung còn tuyệt đối là hàng tiêu đề có chữ **tràn khỏi hộp** (302 trong hộp 301; 2 dòng cao 65 trong hộp 64), đúng nhóm ngoại lệ đã ghi danh |
| Mô tả component | **6/6** |
| Section chồng lấn trên page `components` | **0** |
| Rác còn sót (node lạ trong section mới) | **0** |

## 7. Còn 10 khung PDP chưa dùng được component — và lý do

Trong section `PDP — trạng thái & biến thể` có 12 khung **màn đầy đủ** (6 SP × 2 khổ). Chỉ **2** khung
ráp được ngay:

| Màn | Khối chọn | Số ô size | Ráp được? |
|---|---|---|---|
| mobile · SP1 | 375×204 | 6 | ✅ **đã thay** — khớp `state=default` từng ô chip |
| desktop · SP1 | 545×204 | 6 | ✅ **đã thay** |
| mobile · SP2 | 375×160 | 3 | ❌ số ô size khác |
| mobile · SP3 | 375×160 | 1 (Onesize) | ❌ |
| mobile · SP4 | 375×204 | 9 | ❌ cao bằng nhau nhưng 9 ô |
| mobile · SP5 | 375×214 | 9 | ❌ |
| mobile · SP6 | *không có ô màu* | 9 | ❌ thiếu hẳn một hàng |
| **desktop · SP2…SP6** | **427 rộng** | 1/3/9 | ❌ **cột info còn ở bản 451 cũ** |

Hai nguyên nhân, và chúng khác nhau:

1. **Số ô size (1 · 3 · 6 · 9)** — biến thể theo *dữ liệu sản phẩm*. Muốn phủ thì thêm trục `sizes`
   cho `product-options`. Tôi **không tự thêm** vì trục thứ ba × 2 khổ × 5 trạng thái = 40 ô, mà chỉ
   ~16 ô có thiết kế thật; phần còn lại sẽ là ô rỗng trong bảng chọn.
2. **Desktop SP2–SP6 rộng 427** = cột info **451** của bản cũ. Đây chính là việc còn treo từ 04/09:
   *"33 khung PDP trong Figma vẫn dựng theo cột 451"* trong khi code đã sang **569** cho cả 6 PDP.
   Dựng lại 5 khung này theo 569 thì chúng **tự khớp** `platform=desktop` (545) luôn.

**Đề nghị làm gói**: gật một tiếng là tôi (a) dựng lại 5 khung desktop SP2–SP6 theo cột 569, rồi
(b) thêm trục `sizes` cho `product-options` — xong thì **cả 12 khung màn đầy đủ dùng chung một
component**, thay vì 2 như hiện nay.

## 8. Khối lặp nhiều nhất vẫn chưa gom: `product-item-info`

Quét vân tay toàn bộ 4 section case (662 vân tay khác nhau) thì thẻ sản phẩm là khối lặp nhiều nhất —
**135+ bản vẽ tay** ở 6 kích thước khác nhau (345×590 · 345×568 · 345×566 · 330×548 · 330×546 ·
170×335). File **đã có** component `product-item`, nhưng nó còn ở bản 26/08 và lệch 8–120px, sửa nó
thì **162 instance đang có sẽ xê dịch**. Đó là quyết định đang chờ user từ đợt trước, tôi không tự
đảo — ghi lại đây để không quên rằng đây mới là khối lặp lớn nhất còn lại.
