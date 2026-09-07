# Figma — dựng các trang còn thiếu (06/09/2026)

> Lệnh user: *"kéo các trang bị thiếu vào figma đi, nhớ dùng component và autolayout cho chúng"*,
> kèm link file `Test agent` (node đang chọn lúc gửi là khung drawer menu, không phải đích đặt).

Phạm vi hiểu theo đúng chữ "kéo vào": **mọi màn CÓ trong code demo mà Figma chưa có khung nào**.
Những trang thiếu ở cả code lẫn Figma (404, 503, thanh toán thất bại, PLP khuyến mãi, danh bạ A-Z,
9 trang chính sách còn lại…) không kéo được vì chưa tồn tại để bóc; danh sách đó nằm ở
`SITEMAP-KIEMTRA-2026-09-05.md`.

Kết quả: **53 khung mới** trên page `screens` (28 mobile 375 + 25 desktop 1440), gom vào **4 section
mới** cộng 2 khung thêm vào section `Cart` có sẵn, kèm 4 khung `[doc]`.

## 1. Đã dựng

| Section | Khung | Nội dung |
|---|---:|---|
| `Trang chủ — mobile 375 + desktop 1440` | 2 | trang chủ 2 khổ (4668 và 5221) |
| `Thanh toán & hoàn tất — mobile 375 + desktop 1440` | 10 | 4 bước thanh toán × 2 khổ + đặt hàng thành công × 2 khổ |
| `Tài khoản & xác thực — mobile 375 + desktop 1440` | 24 | 5 tab tài khoản × 2 + chi tiết đơn × 2 + 6 view xác thực × 2 |
| `Chính sách & hệ thống — mobile 375 + desktop 1440` | 15 | 3 trang chính sách × 2 + cookie (2 mobile, 2 desktop) + lớp nổi (3 mobile, 2 desktop) |
| `Cart` (có sẵn) | 2 | giỏ rỗng 2 khổ |

Thanh toán tách 4 khung mỗi khổ vì nó là **một trang gồm 3 mục đóng mở** (`ckStep`): bước 1 có bản
khách vãng lai và bản đã đăng nhập, rồi bước 2 vận chuyển, bước 3 thanh toán.

Xác thực tách 6 khung mỗi khổ theo `authView`: đăng nhập · đăng ký · nhập OTP · hoàn tất đăng ký ·
quên mật khẩu · đặt mật khẩu mới.

Lớp nổi bóc riêng theo đúng khuôn lớp nổi có sẵn trong file (375×812 và 1440×900): đổi quà tặng,
chọn mã ưu đãi, chọn tỉnh thành (chỉ mobile, desktop dùng dropdown trong form), cookie 2 view.

## 2. Component và auto layout

**Auto layout 97,3%** — 2.157 trên 2.216 khung có con. Phần còn lại là 59 khung, chủ yếu `box` (12),
`icon` (9), `ck-sec` (8). Không tính 383 khung rỗng (spacer, ô OTP, nút radio) và 116 hộp `clamp`
vốn phải tuyệt đối theo ghi chú trong `autoAL2.js`.

**74 instance** trong 53 khung mới, sau khi đã sửa component ở mục 5:

| Component | Số instance |
|---|---:|
| `page-header-desktop` | 17 |
| `page-footer-desktop` | 18 |
| `page-header-mobile` | 9 |
| `page-footer-mobile` | 5 |
| `product-item-info` (mobile) | 9 |
| `product-item-info-desktop` | 16 |

Còn giữ raw có chủ đích: cam kết dịch vụ desktop (component 1392×156 với demo 1392×152) và header
của màn đặt hàng thành công bản desktop (chỉ cao 64, không có thanh khuyến mãi, không khớp component
nào).

## 3. Ba bẫy gặp trong đợt này

1. **Cổng 9227 có hai tiến trình cùng nghe.** Cầu nối của phiên trước vẫn sống và Windows cho phép
   hai socket bind cùng cổng, nên request đi vào cầu nối cũ và file JSON rơi vào thư mục của phiên
   đó. Triệu chứng đánh lừa: `POST /save` trả `{"ok":true}` mà thư mục đích không có file nào.
   Đã chuyển sang **cổng 9231** (plugin chỉ fetch được 9223–9232).
2. **Ráp thẻ sản phẩm làm mất cả dải thẻ.** Lượt thử ráp 5 thẻ trong khung đặt hàng thành công bản
   desktop báo `node does not exist` và xoá sạch 5 thẻ raw. Đã dựng lại khung từ bản bóc và bỏ hướng
   ráp thẻ cho tới khi sửa component.
3. **`figma_capture_screenshot` timeout 30s** với mọi khung thử, kể cả khung ít ảnh. Dùng
   `figma_take_screenshot` (đường REST) thì chụp được bình thường.

## 4. Còn thiếu sau đợt này

Không kéo được vì code chưa có, vẫn nằm nguyên trong danh sách của `SITEMAP-KIEMTRA-2026-09-05.md`:
trang 404 · 503 · thanh toán thất bại và huỷ ở cổng · trang trung gian sang cổng · luồng mua ngay ·
PLP khuyến mãi · danh bạ thương hiệu A-Z · 9 trang chính sách còn lại · giới thiệu · liên hệ ·
danh sách cửa hàng · landing quà tặng · tra cứu đơn khách vãng lai · wishlist.

Trong các trang vừa dựng cũng chưa có mọi trạng thái lỗi và đang xử lý (sai mật khẩu, OTP sai, đang
lưu, đặt hàng thất bại, danh sách đơn rỗng) vì bản demo hiện luôn chạy đường thành công.

## 5. Sửa component cho khớp demo (cùng ngày)

Đo lại thẻ và footer trên trang chạy rồi sửa thẳng vào hệ thống.

**`page-footer-desktop`: 447 → 414.** Khối `newsletter` vốn đã ẩn từ trước, nhưng đường kẻ `divider`
đi kèm vẫn hiện nên component thừa 33px. Ẩn đường kẻ và đổi tên hai lớp thành `_hidden` (giữ lại làm
tư liệu, không xoá). Nay bằng đúng 414 của demo, và 18 khung desktop đã ráp được footer.

**Thẻ sản phẩm: sửa nhịp dọc theo số đo demo.** Demo dựng khối thông tin như sau, giống nhau ở cả hai
khổ: đệm 8 trên dưới và 4 hai bên; cụm tên cao 48 (hãng 20, khe 2, dòng tên 18, đệm dưới 8); cụm giá
cao 42 khi không giảm giá và 44 khi có, luôn chừa sẵn dòng giá gạch 16; hàng ô màu 20 ở mobile và 22
ở desktop, chỉ có ở thẻ lưới.

Sáu điểm đã sửa trong cả hai bộ component:

1. Đệm dưới cụm tên 4 thành 8; đệm dưới cụm giá 4 thành 8; khe trong cụm giá 2 thành 0.
2. Thẻ dải bản mobile đang bị kéo đệm dưới 34, trả về 8.
3. Chip giảm giá thêm đệm dọc 2 để cao 20 đúng như demo.
4. Hai biến thể `kind=default` thiếu hẳn dòng giá gạch nên hụt 6px; chép dòng đó sang và để nội dung
   là một dấu cách, đúng cách demo chừa chỗ.
5. Mọi biến thể chuyển sang chiều cao ôm nội dung, thay vì cao cố định.
6. Bốn biến thể `kind=pre-order` bản desktop đang ẩn nhãn "Đặt trước"; bật lại theo luật nhãn luôn
   đứng trước tên. Giá gạch và chip vẫn tắt ở biến thể này, đúng luật đặt trước không có sale.

Kết quả đo lại, lệch tối đa 0,1px so với demo:

| Biến thể | Trước | Sau | Demo |
|---|---:|---:|---:|
| mobile lưới, thường và đặt trước | 366,1 | 372,1 | 372 |
| mobile lưới, giảm giá | 366,1 | 374,1 | 374 |
| mobile dải, thường và đặt trước | 352,7 và 326,7 | 332,7 | 332,7 |
| mobile dải, giảm giá | 326,7 | 334,7 | 334,7 |
| desktop lưới, thường và đặt trước | 590 | 588 | 588 |
| desktop dải, thường và đặt trước | 470,7 | 468,7 | 468,7 |

**Không đụng bề rộng.** Thẻ trong demo là ô lưới co giãn: cùng một thẻ đo 341,3 ở trang danh sách
1440, 345 ở dải trang chủ, 325 ở dải sản phẩm tương tự, 269 ở trang đặt hàng thành công. Đổi bề rộng
component sẽ kéo theo 162 instance trên các màn khách đã duyệt, nên giữ nguyên bề rộng mặc định và
co từng instance khi ráp. Ảnh tự co theo khi đổi bề rộng instance, nhưng **khoá tỉ lệ 3:4 cho khung
ảnh phải làm tay trong Figma** vì API của bản Figma này chưa có `targetAspectRatio`.

**Ráp thêm sau khi sửa:** 18 footer desktop và 24 thẻ sản phẩm (9 mobile, 15 desktop). Kiểm lại: 0
thẻ raw còn sót trong khung mới, chiều cao 53 khung không đổi, các màn khách đã duyệt không có chỗ
chồng lấn, thẻ đặt trước hiện đúng nhãn và không có giá gạch.

## 6. Việc chờ user chốt

1. Khoá tỉ lệ 3:4 cho khung ảnh của hai bộ thẻ trong Figma, để thẻ tự đúng ở mọi bề rộng.
2. Có chuẩn hoá bề rộng thẻ trong demo về một con số không, hay giữ lưới co giãn như hiện nay.
3. Có dựng tiếp các trạng thái lỗi và đang xử lý không, khi mà code chưa có; nếu có thì thiết kế
   trước rồi mới viết vào demo.
4. Cam kết dịch vụ desktop lệch 4px giữa component và demo: sửa bên nào.
