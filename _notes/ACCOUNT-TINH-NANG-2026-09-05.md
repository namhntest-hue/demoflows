# Trang tài khoản — hoàn thiện tính năng bên trong · 05/09/2026

Lệnh user: *"trong phần accountpage của tôi các tính năng bên trong chưa được hoàn thiện
hãy hoàn thiện đầy đủ các tính năng bên trong như đổi thông tin, đổi địa chỉ dựa trên
style mà chúng ta đã tạo nhé"*

Tiếp ngay sau đợt **dựng lại giao diện** ghi ở `ACCOUNT-REDESIGN-2026-09-05.md`. Đợt đó
sửa *hình*; đợt này sửa *việc*. Áp **cả 2 file** `index.html` + `desktop.html`.

---

## 1. Trước lượt này màn Tài khoản là màn CHỈ ĐỌC

Đo trên trang chạy: mọi nút "hành động" của 5 tab đều là `data-toast` — bấm xong hiện một
dòng chữ rồi thôi, không có gì đổi.

| Chỗ | Trước | Sau |
|---|---|---|
| Nút "Chỉnh sửa thông tin" | `data-toast="Chỉnh sửa thông tin"` | Mở form 5 ô, có kiểm dữ liệu, lưu thật |
| Đổi mật khẩu | **không tồn tại** | Form 3 ô + 4 luật kiểm |
| Nhận bản tin | **không tồn tại** | Ô tích, lật trạng thái tại chỗ |
| Nút "+ Thêm địa chỉ mới" | `data-toast="Thêm địa chỉ mới"` | Mở form 5 ô, thêm thật vào sổ |
| Sửa / Xoá / Đặt mặc định một địa chỉ | **không tồn tại** — mỗi địa chỉ chỉ là 2 dòng chữ | 3 nút mỗi hàng, có bước hỏi lại trước khi xoá |

Nặng nhất là dòng cuối: sổ địa chỉ `ADDRESSES` **dùng chung với bước giao hàng ở checkout**
(chốt từ lượt trước), nhưng khách không có cách nào sửa nó — địa chỉ sai thì phải bỏ sổ,
gõ tay lại từ đầu ở checkout, mỗi lần đặt hàng gõ lại một lần.

---

## 2. Đã làm gì

### 2.1 Tab Thông tin — 3 khối

```
Thông tin        (5 hàng nhãn–giá trị)     [Chỉnh sửa thông tin]
Bảo mật          Mật khẩu ••••••••         [Đổi mật khẩu]
Nhận tin         ☑ Nhận email về bộ sưu tập mới và ưu đãi dành riêng cho thành viên
```

3 khối ngăn nhau bằng **khoảng trắng 32**, không phải kẻ: trong màn này kẻ đang mang nghĩa
"ranh giới giữa hai HÀNG dữ liệu", dùng nó cho ranh giới giữa hai KHỐI là một vạch hai
nghĩa. Tiêu đề khối đi `.t-lead` — đúng bậc mà `accLoyalty()` / `accPoints()` đã dùng cho
tiêu đề khối con ("Đặc quyền hạng Vàng", "Lịch sử điểm"), **không đẻ bậc mới**.

**Form sửa thông tin** thay chỗ bảng, không mở lớp nổi: Họ và tên · Số điện thoại · Email ·
Giới tính (ô chọn) · Ngày sinh. Ô nhập mở ra **đã có sẵn giá trị đang dùng**, sửa 1 dòng
thì 4 dòng kia không phải gõ lại.

Luật kiểm (báo lỗi ngay dưới ô, dùng lại `setFieldErr` / `clearFieldErr` của checkout —
không đẻ kiểu báo lỗi thứ hai):

| Ô | Luật | Lời báo |
|---|---|---|
| Họ và tên | khác rỗng | Vui lòng nhập họ và tên |
| Số điện thoại | `^0\d{8,10}$` | Số điện thoại chưa đúng |
| Email | có `@` và có `.` | Email chưa đúng |
| Ngày sinh | đúng `dd/mm/yyyy` **và là ngày có thật và không ở tương lai** | Ngày sinh chưa đúng, nhập theo dd/mm/yyyy |

Ngày sinh phải so lại cả 3 số vì `new Date(y, m-1, d)` tự **tràn** — `31/02/1990` sẽ thành
`03/03/1990` chứ không báo lỗi. Đã kiểm: gõ 31/02/1990 là bị chặn.

**Đổi mật khẩu** — demo không có backend nên "mật khẩu hiện tại" chỉ cần khác rỗng; 3 luật
còn lại kiểm thật: tối thiểu 8 ký tự có cả chữ và số · 2 lần nhập khớp · **khác mật khẩu
hiện tại**. Luật cuối tách khỏi vòng kiểm chung, vì hai luật cùng gắn vào một ô thì luật
sau chạy `clearFieldErr` và xoá mất lời báo của luật trước.

Ô mật khẩu dùng lại `eyeBtn()` + `wirePasswordToggles()` sẵn có, không dựng nút con mắt mới.

### 2.2 Tab Địa chỉ — CRUD đủ 4 việc

Mỗi hàng địa chỉ nay có hàng nút **Sửa · Đặt mặc định · Xoá** (địa chỉ đang mặc định thì
không hiện "Đặt mặc định" — bấm cũng không để làm gì). Kiểu nút: chữ gạch chân mực phụ,
hover lên mực chính — đúng khuôn nút "Chi tiết" của tab Đơn hàng, là **kiểu nút phụ duy
nhất màn này có**.

**Xoá hỏi lại NGAY TRONG HÀNG**, không mở hộp thoại:

```
Nguyễn Văn A · 0909 123 456
45 Lê Lợi, Phường Bến Thành, TP. Hồ Chí Minh
Xoá địa chỉ này?   Xoá   Giữ lại
```

Lý do: xoá một địa chỉ trong sổ không đáng để chặn cả màn hình, và app **chưa có khuôn hộp
thoại xác nhận nào** — đẻ ra ở đây là đẻ một kiểu UI mới cho đúng một việc.

Form thêm/sửa: Họ và tên · Số điện thoại · Tỉnh / thành phố (ô chọn) · Phường / xã (ô chọn)
· Số nhà, tên đường · ô tích "Đặt làm địa chỉ mặc định". Thứ tự ô **sao y bước giao hàng ở
checkout** để hai màn cùng một trình tự khai địa chỉ.

Bốn ràng buộc dữ liệu, đều đã kiểm trên trang chạy:

1. **Đổi tỉnh là xoá phường đang chọn** — giữ lại sẽ ra một địa chỉ không tồn tại (ràng buộc
   sao y `wireAddressPickers()` của checkout).
2. **Xoá địa chỉ mặc định thì địa chỉ khác lên thay** — sổ không còn cờ mặc định nào là
   checkout mở ra không chọn sẵn gì.
3. **Địa chỉ đầu tiên của sổ tự là mặc định** — form lúc đó hiện dòng chữ "Đây là địa chỉ
   mặc định của sổ." thay cho ô tích (ô tích bấm không ăn đọc thành lỗi giao diện).
4. **`ckAddr` được kéo về trong tầm sau khi xoá** — biến này trỏ theo *vị trí* trong mảng,
   không kéo về là bước giao hàng của checkout đọc phải `undefined`.

Địa chỉ đang mặc định **không cho bỏ cờ ngay tại form của chính nó**: muốn đổi thì đặt mặc
định cho địa chỉ khác, hành động đó tự gỡ cờ bên này.

### 2.3 Sổ địa chỉ đổi mô hình dữ liệu

```js
// TRƯỚC
{ name, phone, line: '123 Đồng Khởi, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh', def }
// SAU
{ name, phone, street: '123 Đồng Khởi', ward: 'Phường Sài Gòn', province: 'TP. Hồ Chí Minh', def }
const addrLine = a => [a.street, a.ward, a.province].filter(Boolean).join(', ');
```

**Bắt buộc phải tách**, không phải cho đẹp: form sửa phải trả từng phần về đúng ô của nó, mà
2 ô địa giới lấy dữ liệu từ `VN_LOCATIONS` — bản đồ **2 cấp (tỉnh → phường)** đang chạy ở
checkout. Giữ chuỗi cũ "P. Bến Nghé, Quận 1" thì mỗi lần khách bấm Sửa rồi Lưu là **mất một
thành phần địa chỉ** — sửa xong địa chỉ ngắn đi.

Kéo theo: 2 địa chỉ mẫu viết lại theo mô hình 2 cấp (Bến Nghé/Quận 1 → Phường Sài Gòn), và
4 chỗ đang đọc `a.line` chuyển sang `addrLine(a)` — sổ chọn ở checkout, tóm tắt bước giao
hàng, và địa chỉ của đơn vừa đặt. Đã kiểm cả 3 chỗ + đặt thử một đơn ở cả 2 khổ.

### 2.4 Một nguồn cho hồ sơ khách

`PROFILE` thay 2 bản chữ in cứng. Trước lượt này cụm tóm tắt đầu màn và băng Thành viên nói
"UserOne · 0909 *** 123", còn bảng thông tin nói "Nguyễn Văn A" — tức **có sửa được thì màn
hình vẫn nói tên cũ**. Nay lưu thông tin xong là avatar (chữ cái), tên, số che ở cụm tóm tắt
và băng Thành viên đổi theo ngay.

- Chữ avatar = chữ đầu của **tên** (từ cuối): tiếng Việt gọi nhau bằng tên → "Nguyễn Văn A" ra **A**.
- Số che tính từ số thật (`0909 123 456` → `0909 *** 456`), không in cứng nữa. Ba số cuối
  đổi từ `123` sang `456` chính vì trước đây chuỗi đó là chữ chết, không khớp số trong bảng.
- `PROFILE.user` giữ riêng **tên đăng nhập** "UserOne" — nó là thứ khác với họ tên và vẫn
  được luồng đăng nhập / checkout dùng.

---

## 3. Cách nối vào code sẵn có

**Không có CSS mới. Không có class utility mới.** Mọi class dùng trong lượt này đã kiểm là
có mặt trong `tailwind.css` đã build (đã có sẵn bẫy `mt-6` và `max-w-[440px]` **không tồn
tại** trong bản build — đã tránh).

| Việc | Dùng lại cái gì |
|---|---|
| Ô nhập, nhãn, khe 8, cao 40, viền 1px, r2 | số đo của component `field()` ở checkout |
| Ô chọn | markup của `pickField()`, đổi đúng 1 hook `data-pick` → `data-apick` |
| Danh sách chọn | `__openPicker` (mobile: bottom sheet) / `__openPickDD` (desktop: dropdown neo vào ô) |
| Ô tích | `.chk` của giỏ/checkout |
| Báo lỗi | `setFieldErr` / `clearFieldErr` |
| Nút con mắt | `eyeBtn()` + `wirePasswordToggles()` |
| Nút | `.btn-p` / `.btn-o` cao 48, `.press` |

**Phải đổi `data-pick` → `data-apick`**: `wireAddressPickers()` bắt mọi `[data-pick]` rồi
switch theo khoá city/home/province/ward và **mặc định coi phần còn lại là ô phường của
checkout** — để nguyên tên là ô Giới tính xổ ra danh sách phường.

### Một handler uỷ quyền, gắn một lần

`wire()` được gọi lại trên **nguyên `root`** mỗi lần đổi tab, nên gắn listener thẳng vào nút
là cứ mỗi lượt lại chồng thêm một cái (bấm một cái chạy hai lần — lỗi này đã có sẵn ở hàng
tab từ trước). Lượt này không đi vào vết đó: **một** listener uỷ quyền trên `#accBody`, khoá
bằng cờ `dataset.accWired`. `#accBody` chỉ bị thay `innerHTML` nên nó sống suốt màn; đổi màn
thì nó bị xoá, cờ mất theo, không phải dọn tay.

Đã kiểm: đổi tab 3 vòng rồi bấm "Đặt mặc định" → `toast` chạy **đúng 1 lần**.

Rời tab cũng **bỏ form đang mở** (`accResetForms()`): quay lại mà thấy form dở dang nhưng
chữ đã mất — vì `innerHTML` bị thay — còn tệ hơn là thấy lại bảng thông tin.

---

## 4. Sửa kèm 3 chỗ chữ nghĩa (nhỏ, nhưng có lý do kỹ thuật)

1. **Nhãn 2 ô địa giới ở checkout**: `'Tỉnh , thành phố'` → `'Tỉnh / thành phố'`, `'Phường
   xã'` → `'Phường / xã'`. Bắt buộc: trang Tài khoản dùng lại đúng 2 ô này, mà 2 khoá I18N
   cùng ra một chuỗi EN thì `I18N_REV` (đảo map) **chỉ giữ được một** — lượt dịch ngược
   EN→VI sẽ ghi đè nhãn của màn kia. Chính placeholder của 2 ô đó vốn đã viết dạng gạch
   chéo ("Chọn tỉnh / thành phố"), nên nhãn mới là cái khớp lại, không phải cái lệch ra.
2. **`'(Mặc định)'` trước giờ không có khoá I18N** → bản EN vẫn ra tiếng Việt ở CẢ sổ địa
   chỉ lẫn checkout. Thêm 1 khoá vá được cả hai.
3. **Nhãn ô số nhà ở form địa chỉ dùng `'Số nhà, tên đường'`, không dùng `'Địa chỉ'`**: chuỗi
   'Địa chỉ' đã là khoá của TÊN TAB (`'Địa chỉ' → 'Addresses'`), bản EN sẽ gọi ô số nhà là
   "Addresses". *(Ô cùng loại ở checkout vẫn đang mắc đúng lỗi này — xem mục 6.)*

I18N thêm **35 cặp**, soát tự động: **0 khoá VI trùng mới**, **0 giá trị EN trùng mới**
(so với 58 khoá trùng và 51 giá trị trùng vốn đã có từ trước).

---

## 5. Đã kiểm những gì

Chạy trên `http://localhost:8134`, cả 2 khổ, **0 lỗi console**.

- 5 tab vẽ đúng; đổi tab qua lại không chồng handler.
- Form thông tin: 4 ô sai cùng lúc → 4 lời báo đúng ô, con trỏ nhảy tới ô sai đầu tiên.
  Lưu hợp lệ → bảng + cụm tóm tắt + băng Thành viên đổi theo.
- Ô chọn Giới tính: mobile mở bottom sheet, desktop xổ dropdown neo vào ô, cả hai tick sẵn
  giá trị đang chọn.
- Mật khẩu: 3 ca sai (yếu · lệch · trùng mật khẩu cũ) đều bị chặn đúng lời báo; ca hợp lệ
  đóng form + toast.
- Địa chỉ: sửa · thêm · đặt mặc định · xoá · **xoá hết → trạng thái rỗng** · thêm lại địa chỉ
  đầu tiên (tự thành mặc định).
- Đổi tỉnh → phường bị xoá, danh sách phường đổi theo tỉnh mới; lưu khi chưa chọn phường bị
  chặn.
- Checkout đọc sổ đã sửa: đúng ở sổ chọn, ở tóm tắt bước giao hàng, và ở địa chỉ của đơn vừa
  đặt (đặt thử đơn ở cả 2 khổ).
- Bản EN: toàn màn dịch đủ, kể cả "(Default)", "House number, street", "For example: 123 Dong Khoi".

**Một lỗi tự gây, đã sửa trong lượt:** phép cắt đoạn ở `desktop.html` lỡ nuốt luôn
`STATUS_DOT` / `statusTag` (bản desktop khai 2 hằng đó **nằm giữa** `accInfo` và khối dữ liệu
đơn hàng, bản mobile thì khai sau — hai file xếp khác nhau). Màn Chi tiết đơn ném
`ReferenceError`. Đã trả lại nguyên văn và soát lại: so bảng khai báo cấp cao nhất của cả 2
file với bản trước khi sửa → **0 thứ bị mất**, 19 thứ mới, giống hệt nhau ở 2 file.

Kèm một chỗ suýt hỏng khác: script sửa file đã lỡ đổi **toàn bộ xuống dòng CRLF → LF** (mọi
dòng của cả 2 file thành "đã sửa"). Đã trả về CRLF, giữ nguyên cả 7 chỗ xuống dòng trần nằm
trong khối `dkCrumbs` của `desktop.html`. Diff thật: **+486 / −36** dòng (index) và
**+489 / −39** (desktop).

---

## 6. Còn mở — cần bạn quyết

1. **3 bản thử skin (`desktop-neutral` · `desktop-editorial` · `desktop-atelier`) chưa port.**
   Đúng theo nếp đang chạy (3 fork đóng băng từ 21/08, đợt dựng lại giao diện 05/09 cũng chỉ
   chạm 2 file), nhưng nay khoảng cách dài thêm: 3 bản đó vẫn còn `a.line` và vẫn còn nút
   toast. Muốn port thì nói, mỗi file khoảng 490 dòng.
2. **Bản EN gọi giới tính là "Men / Women".** Hai chuỗi 'Nam' / 'Nữ' đã là khoá của **ngành
   hàng**; thêm bản dịch giới tính là đổi luôn nhãn ngành hàng trên toàn app. Muốn đúng thì
   phải đổi *giá trị* giới tính trong dữ liệu (ví dụ "Nam giới" / "Nữ giới") — chạm chữ hiển
   thị nên chờ bạn gật.
3. **Ô số nhà ở checkout vẫn mang nhãn 'Địa chỉ'** → bản EN đọc là "Addresses" (lỗi có sẵn,
   không phải lượt này gây ra). Vá 1 dòng, nhưng chạm màn đã chốt với khách nên để đây.
4. **Nút còn là toast ở màn Chi tiết đơn**: Theo dõi đơn hàng · Huỷ đơn hàng · Mua lại · Xuất
   hoá đơn. Huỷ đơn thì làm thật được ngay (đổi trạng thái trong `ORDERS`); "Mua lại" thì
   **kẹt**: `index.html` chưa có `addToCart()`, chỉ `desktop.html` có — làm bây giờ là 2 bản
   lệch nhau. Đề nghị làm cùng lúc với việc trả `addToCart` cho bản mobile.
5. **Dữ liệu chỉ sống trong RAM.** Tải lại trang là về mẫu gốc. Đúng tinh thần demo (giỏ hàng,
   đơn hàng, bộ lọc đều vậy) — nếu muốn giữ qua lượt tải thì đó là một quyết định riêng cho
   cả app, không nên chỉ một màn có.
