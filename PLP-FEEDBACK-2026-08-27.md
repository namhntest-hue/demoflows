# PLP — 3 việc khách chốt 27/08/2026

> Lệnh user (kèm ảnh chụp PLP desktop):
> 1. *Badge Preorder sẽ nằm trước tên sản phẩm (như hình đính kèm)*
> 2. *Thêm ô tìm kiếm tên Thương hiệu vào khi bấm filter thương hiệu*
> 3. *quick add to cart sẽ không có title ở phiên bản desktop*

Phạm vi từng việc **khác nhau** — ghi rõ để không ai đồng bộ nhầm:

| Việc | index.html | desktop.html | 3 bản thử skin | Vì sao |
|---|---|---|---|---|
| 1 Badge trước tên | ✔ (cùng hàng) | ✔ (cùng hàng) | ✖ | 3 fork không có rule `.badge-label`, thả badge vào là badge không nền |
| 2 Ô tìm thương hiệu | ✔ | ✔ | ✔ | chỉ dùng utility sẵn có, không thêm CSS |
| 3 Quick-add bỏ title | — | ✔ | — | lệnh nói rõ "phiên bản desktop"; `.pc-quick-act` vốn **chỉ có** ở desktop.html |

---

## 1. Badge "Đặt trước" ra trước tên sản phẩm

**Trước:** `Pre-order` là nhãn **đè lên ảnh**, nằm chung chồng với `New Season` ·
`La Vacanza` ở góc trên trái.
**Sau:** tách làm hai — nhãn **chiến dịch** ở lại trên ảnh, còn `Pre-order` xuống
đứng **trước tên sản phẩm**. Lý do tách: hai thứ nói hai chuyện. Nhãn chiến dịch
thuộc về **ẢNH** (bộ sưu tập nào), còn Pre-order nói **TÌNH TRẠNG BÁN** của chính
SKU — cùng họ thông tin với tên và giá, nên chỗ của nó là ở khối chữ.

**Đổi nền, bắt buộc:** bản đè ảnh dùng `.badge-label` = **nền trắng** (đọc được
vì ảnh phía sau là mặt xám). Đặt xuống thẻ nền trắng thì badge trắng **vô hình**.
Nên thêm `.badge-inline` = **mặt xám `#f2f2f2`** — mặt thứ 2 có sẵn của §2.2,
không mở mặt mới. Chữ giữ nguyên `12/16 · #0a0a0a`; nhãn là **"Đặt trước"** và
**không** còn `data-i18n-skip` — xem mục ngay dưới.

**Sửa MỘT chỗ, không sửa 6 nơi gọi:** chặn ngay đầu `productCard()` bằng
`if (badge === 'Pre-order') badge = '';` — mọi nơi gọi vẫn truyền
`badge: p.preorder ? 'Pre-order' : ''` như cũ.

### Nhãn tiếng Việt là **"Đặt trước"** (chỉnh lần 2)

Bản đầu tôi để nguyên chữ `Pre-order` + `data-i18n-skip`, theo ghi chú cũ trong code
(*"Pre-order là wordmark, phải skip kẻo lượt dịch ngược EN→VN biến nó thành Đặt
trước, trùng chuỗi với nút"*). User chốt lại: **tiếng Việt phải là "Đặt trước"** —
tức nó KHÔNG phải wordmark, mà là chuỗi dịch được. Ghi chú cũ vì thế hết hiệu lực:
chính "Đặt trước" mới là bản tiếng Việt đúng, còn "Pre-order" là bản EN của nó.

Sửa: bỏ `data-i18n-skip`, đổi chữ sang `Đặt trước`, đi bằng **khoá có sẵn**
`'Đặt trước' → 'Pre-order'` trong `I18N` (không thêm khoá mới). Đổi ở **cả 4 chỗ
badge** của mỗi file để 3 màn không nói 3 kiểu: thẻ PLP · ảnh PDP · 2 chỗ trong giỏ
hàng. Kiểm được: VI ra *"Đặt trước"* ở cả PLP · PDP · giỏ; chuyển EN ra
*"Pre-order"*; chuyển về VI ra lại *"Đặt trước"*.

### Cùng MỘT hàng với tên ở mọi khổ (chỉnh lần 2)

Bản đầu tôi cho khổ mobile **xếp dọc** vì đo được badge ăn mất chỗ của tên. User
chốt lại: *"badge nằm chung 1 hàng với tên chứ"* → trả về **cùng hàng ở mọi khổ**.

Đánh đổi đã báo và user vẫn chọn hàng ngang, ghi lại để sau này không ai "sửa
giúp": ở lưới 2 cột của `index.html`, thẻ rộng 185 — badge *"Đặt trước"* chiếm
**65**, tên còn **105** và **bị cắt bằng ellipsis**. Desktop thì dư chỗ: tên còn
**172**, **không cắt**.

**Nếu sau này muốn tên đủ chữ trên mobile** thì đòn bẩy đúng là cho tên **xuống 2
dòng** (`line-clamp-2` thay `truncate`) — badge vẫn ở cùng hàng với dòng đầu của
tên, đúng lệnh. KHÔNG phải hạ badge xuống dòng riêng (đã thử, đã bị bác).

---

## 2. Ô tìm kiếm thương hiệu trong bộ lọc

Danh sách **24 nhà mốt** và còn dài ra — cuộn tay tìm một cái tên là việc phải làm
mỗi lần mở mục. Thêm ô nhập ngay đầu mục *Thương hiệu*.

* **Lọc trên DOM** (ẩn/hiện hàng) chứ không dựng lại danh sách → **hàng đang tick
  giữ nguyên trạng thái**, không phải đồng bộ lại với `plpFilters`. Kiểm được:
  tick Versace → gõ "bur" → xoá ô → Versace **vẫn còn tick**.
* **So sánh sau khi bỏ dấu + thường hoá** (`NFD` + xoá dải `̀-ͯ`): gõ
  `MONT` ra Montblanc, `gabbana` ra Dolce&Gabbana (khớp giữa chuỗi, không chỉ đầu
  chuỗi).
* Không tìm thấy thì hiện dòng *"Không tìm thấy thương hiệu"*, xoá ô thì 24 hàng
  trở lại.
* Ô nhập dùng đúng khuôn ô nhập sẵn có của panel (h36 · viền 1px · `rounded-xs` ·
  `focus:border-primary`), không đẻ kiểu mới.
* **i18n**: thêm 2 khoá vào `I18N` — kiểm cả hai chiều, `placeholder` đổi thành
  *"Search brands"* và dòng rỗng thành *"No brands found"*; lọc **vẫn chạy đúng**
  khi đang ở EN (gõ "ver" ra 2 kết quả).

---

## 3. Quick-add bỏ title (desktop)

Đây là **đảo chốt 26/08** — hôm đó chính user yêu cầu *"ở bản desktop thêm title
trên quickadd này"*, nay bỏ. "Quick add" ở đây là **DẢI HOVER trên thẻ**
(`.pc-quick`), không phải dialog 2 cột.

**Gỡ:** dòng `.pc-quick-act` (*"Thêm vào giỏ hàng"* / *"Đặt trước"*) + rule CSS của
nó (không để mồ côi).
**GIỮ:** dòng ngày `.pc-quick-eta` (*"Nhận hàng dự kiến 30/09/2026"*) của hàng
pre-order — lệnh chỉ gọi tên **"title"**, mà ngày giao là **thông tin**, không phải
nhan đề. Đầu tấm nay chỉ dựng khi thật sự có ngày để nói: thẻ không pre-order
**không còn `.pc-quick-head`**, rê chuột vào là thấy thẳng lưới size.

> Nếu ý bạn là bỏ **cả** dòng ngày thì nói một tiếng — xoá thêm 3 dòng là xong.

---

## Đã kiểm chạy

**desktop 1440:** badge *"Đặt trước"* nền `rgb(242,242,242)` mực `rgb(10,10,10)`
12/16, **đứng trước tên, cùng hàng**, tên **không cắt** (còn 172) · ảnh **không
còn** lớp badge · hàng tên cao 18 (badge không làm phình hàng) · quick-add
**không có title**, còn dòng ngày, thẻ thường không có đầu tấm · badge ở **PDP** và
**giỏ hàng** cũng ra *"Đặt trước"*.
**mobile 375:** badge **cùng hàng** trước tên, tên bị cắt (còn 105 — đánh đổi đã
chốt) · EN ↔ VI đổi qua lại đúng · ô tìm thương hiệu cao 36 rộng 343, gõ "ferra"
ra Ferragamo · không tràn ngang.
**cả 5 file:** `node --check` khối script chính — sạch.

## Còn mở

1. **Nền badge.** Ảnh khách gửi trông như chip **TỐI** (nền sẫm, chữ sáng). Ở đây
   đang là **mặt xám `#f2f2f2`** — mặt thứ 2 hợp lệ của §2.2. Muốn đúng chip tối
   thì đó là **vai mặt tối thứ 4** ngoài 3 vai §2.2 đang cấp (nút · backdrop ·
   promo bar), phải **ghi danh ngoại lệ** trong `STYLE-RULES.md` như đã làm với
   chip `-%` của `skin-li`. Chờ bạn chốt.
2. **3 bản thử skin** chưa có badge trước tên (thiếu `.badge-label`/`.badge-inline`).
3. **Dòng ngày quick-add** — giữ hay bỏ (mục 3).
