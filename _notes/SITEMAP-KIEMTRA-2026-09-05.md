# Kiểm tra sitemap: site thật, demo, Figma (05/09/2026)

Đối chiếu toàn bộ trang và trạng thái của shop.dafc.com.vn với hai bản demo (`index.html` mobile, `desktop.html` 1440) và tư liệu Figma (file Test agent). Ma trận gốc 50 hàng, 290 case; sau 3 lượt phản biện đã sửa 9 ô và bổ sung 8 trang thật chưa có hàng riêng. Bảng tổng quan cuối cùng 54 hàng, mục 2 có 359 dòng case (290 gốc + 69 dòng "Phản biện thêm").

Tóm tắt:

- Site thật có 43 trang hoặc khối kiểm được trực tiếp, 4 trang chỉ suy ra một phần (sau đăng nhập, sau đặt hàng), cộng 8 trang thật phản biện mới tìm ra (chi tiết cửa hàng, PDP phiếu quà, luồng Mua ngay, trang so sánh, tìm kiếm nâng cao, danh mục cấp 3-4 có banner, form tư vấn quà doanh nghiệp, in đơn hoặc hoá đơn). Tổng cộng 51 trang thật, chưa kể 7 trang chuẩn Magento không kiểm được (trung gian cổng, xác nhận newsletter, email giao dịch...).
- Demo đã có: mobile 31 trang đủ + 8 một phần; desktop 31 đủ + 8 một phần; Figma chỉ 15 trang đủ + 5 một phần, còn trắng ở 33 hàng của bảng tổng quan (30 hàng ma trận gốc + 3 hàng bổ sung; khách mới duyệt 4: PLP, Thương hiệu, Tìm kiếm, Bộ lọc).
- Thiếu hoàn toàn (✗ ở cả mobile, desktop, Figma): 13 hàng trong bảng tổng quan (thất bại thanh toán, trang trung gian cổng, Mua ngay, tra cứu đơn khách, wishlist, so sánh, tiện ích Magento, giới thiệu, liên hệ, site ngoài, 404, 503, email giao dịch); mục 3 liệt kê 19 hạng mục vì tách nhỏ hơn theo template.
- Case thiếu: 131 case của ma trận chưa có ở cả hai bản code, cộng khoảng 60 case phản biện đề xuất thêm (14 mức cao, chủ yếu độ dài dữ liệu, trạng thái đang xử lý, lỗi cục bộ, đơn hàng một phần).
- Kết luận một câu: luồng mua chính đã phủ tốt ở code, nhưng bàn giao còn hụt ở 3 chỗ lớn là Figma trắng 30 trang, các trang nội dung và lỗi hệ thống chưa có template, và các trạng thái lỗi hoặc đang xử lý gần như chưa được vẽ.

Ký hiệu: ✓ có, ✗ không, ◐ một phần hoặc chưa kiểm được, – không áp dụng.

## 1. Bảng tổng quan (theo luồng mua)

| Nhóm | Trang | URL site thật | Site thật | Mobile (index) | Desktop | Figma | Kết luận |
|---|---|---|---|---|---|---|---|
| Điều hướng | Header desktop + mega menu | `/` (`ul#mainMenu`) | ✓ | – (navBar 4 icon + drawer) | ✓ | ✓ page-header-desktop + 6 khung | Khuôn đủ; thiếu mega panel Khuyến mãi, icon tài khoản đã đăng nhập ở mobile; chốt wishlist |
| Điều hướng | Menu drawer mobile | `/` (<1200px, `.menu-mobile`) | ✓ suy từ markup | ✓ `#menuSheet` | – | ✓ 4 khung | Đủ 3 tầng; chốt lối "Tất cả ..." và dựng Figma đã đăng nhập + cấp 1 Nữ |
| Điều hướng | Băng khuyến mãi đầu trang | `/` (mst-banner) | ✓ 4 slide | ✓ 3 câu | ✓ 32px | ◐ chưa kiểm | Thiếu slide là link, trạng thái không chiến dịch, popup banner |
| Điều hướng | Footer | `/` (`footer.footer1`) | ✓ | ✓ accordion, không newsletter | ✓ newsletter đã bỏ 26/08 | ✓ page-footer 2 khổ | Chốt newsletter nằm đâu; nối 14 link còn toast; thống nhất icon social |
| Điều hướng | Lớp tìm kiếm + gợi ý | `/` (`#search_mini_form`) | ✓ | ✓ màn search | ✓ `#dkSearchLayer` | ✓ khách duyệt | Demo giàu hơn site; chốt gợi ý có ảnh + giá và tab ngành |
| Điều hướng | Đổi ngôn ngữ VI/EN | `/?___store=en` | ✓ | ✓ | ✓ chip cờ | ◐ | Cơ chế đủ; rà chuỗi chưa dịch, chờ bản EN của khách |
| Điều hướng | Cookie consent | `/` (CookieYes) | ✓ | ✓ `#cookieGate` 2 view | ✓ `#cookieBar` + `#cookiePrefs` | ✗ | Code đủ; Figma chưa có; chốt có nhớ lựa chọn không |
| Trang chủ | Trang cổng 3 ngành (`main.html`) | không có | ✗ | – file riêng | – file riêng | ✗ | Demo có, site không; luồng đang đứt |
| Trang chủ | Trang chủ | `/` | ✓ tối giản 2 tile | ✓ screen home 10 khối | ✓ | ✗ | Khác hẳn site; Figma chưa dựng; chốt theo ngành hay một trang |
| Danh sách | PLP danh mục (cấp 1 đến cấp 4, beauty) | `/women.html`, `/women/clothing.html`, `/women/footwear/high-heels.html` | ✓ | ✓ không lọc theo danh mục | ✓ | ✓ khách duyệt | Nợ `plpProducts` lọc theo danh mục, chip lọc mobile, thẻ hết hàng, banner danh mục cấp 3 |
| Danh sách | PLP Khuyến mãi | `/sales.html` | ✓ 1165 SP | ◐ về PLP chung | ◐ | ✗ | Chưa có PLP sale đúng nghĩa |
| Danh sách | Sản phẩm mới, bộ sưu tập, landing chiến dịch | `/mcm-autumn-winter-2026`, `/special-catalogue/...` | ✓ 3 kiểu landing; PLP sản phẩm mới ✗ | ◐ menu về PLP chung | ◐ mega panel | ◐ mega panel | Thiếu hẳn template landing; chốt "Sản phẩm mới" là gì |
| Danh sách | Trang thương hiệu | `/brands/versace.html` | ✓ Amasty | ✓ 3 hãng | ✓ | ✓ khách duyệt | Nợ trạng thái rỗng 22 hãng; chốt tách brand story |
| Danh sách | Danh bạ thương hiệu A-Z | `/brands/` (mồ côi), `/shop-by.html` | ✓ tĩnh EN | ◐ drawer 25 hãng | ◐ mega 3 cột | ◐ chỉ menu, không trang | Chốt có cần trang riêng không |
| Danh sách | Kết quả tìm kiếm | `/catalogsearch/result/?q=versace` | ✓ | ✓ | ✓ | ✓ 2 khổ | Thiếu cụm từ liên quan, sort riêng |
| Danh sách | Bộ lọc | `/women.html` (Amasty) | ✓ 6 facet + Dịp + Giới tính | ✓ sheet | ✓ drawer | ✓ khách duyệt | Demo vượt site; mở khoảng giá thật, thứ tự facet, facet Dịp |
| Danh sách | Quick add / quick view | panel size trong thẻ | ◐ chỉ size | ✓ sheet | ✓ dialog + dải hover | ✓ | Đủ; chốt câu 07 brief; không tự khôi phục dải hover |
| Danh sách | Quà tặng (landing, PDP phiếu quà, gói quà) | `/dafc-gifting`, PDP gift card | ✓ | ◐ ô danh mục | ◐ | ✗ | Thiếu hoàn toàn; PDP phiếu quà là template riêng |
| Sản phẩm | PDP | `/bow-pointed-toe-pumps-01k026-784999.html` | ✓ | ✓ 6 màn | ✓ 6 kind | ✓ 37 khung, chưa duyệt | Phủ tốt; chốt 2 CTA, stepper, SKU, chặn chưa chọn size |
| Sản phẩm | Luồng Mua ngay (bỏ qua giỏ) | PDP, CTA "Mua ngay" | ✓ | ✗ | ✗ | ✗ | Bổ sung từ phản biện; là luồng mua bắt buộc nếu giữ 2 CTA |
| Sản phẩm | Bảng kích thước | PDP (Bss_SizeChart) | ✓ ảnh theo hãng | ✓ `infoSheet` | ✓ | ✓ size-guide | Cần data bảng theo ngành; chốt ảnh hay HTML |
| Sản phẩm | Nhận thông báo khi có hàng | `/productalert/...` (302 login) | ✗ | ✓ `#notifySheet` | ✓ modal 490 | ✓ product-alert | Demo tự đề xuất; khách chốt |
| Sản phẩm | Đã thêm vào giỏ, mini cart | header minicart + popup | ✓ | ✓ sheet món vừa thêm | ✓ mini cart cả giỏ | ✓ 5 khung | Vá mobile ghi thật vào `CART`; chốt câu 06 |
| Giỏ & thanh toán | Giỏ hàng | `/checkout/cart/` | ✓ tick chọn món | ✓ | ✓ | ✓ 2 khổ, chưa duyệt | Nợ Figma giỏ rỗng, đặt trước, sheet quà; code nợ hết hàng, xác nhận xoá |
| Giỏ & thanh toán | Ưu đãi, mã giảm, điểm, phiếu | `/checkout/cart/` (3 form) | ✓ 3 ô | ✓ `#vcSheet` | ✓ drawer | ✗ | Demo mạnh hơn site; Figma chưa có |
| Giỏ & thanh toán | Thanh toán (checkout) | `/checkout/` | ✓ one-page 2 bước | ✓ 3 section | ✓ 2 cột | ✗ | Thiếu validate giao hàng, ghi chú, địa chỉ TT riêng; Figma chưa có |
| Giỏ & thanh toán | Trang trung gian sang cổng + trang trả về (Payoo, QR, trả góp) | không kiểm được | ◐ có chuỗi cảnh báo | ✗ | ✗ | ✗ | Bổ sung từ phản biện; bắt buộc khi có Payoo |
| Giỏ & thanh toán | Đặt hàng thành công | `/checkout/onepage/success/` | ✓ 302 khi không đơn | ✓ done | ✓ | ✗ | Thiếu Figma và nhánh khách tạo tài khoản |
| Giỏ & thanh toán | Thanh toán thất bại, huỷ ở cổng, hết phiên | `/checkout/onepage/failure/` | ◐ route đổ về giỏ rỗng | ✗ | ✗ | ✗ | Thiếu hoàn toàn; thực tế là 3 đích khác nhau |
| Tài khoản | Đăng nhập | `/customer/account/login/` | ✓ SĐT + mật khẩu | ✓ | ✓ | ✗ | Cần trạng thái lỗi ở code và Figma |
| Tài khoản | Đăng ký (OTP 3 bước) | `/mobileotp/account/sendphone/` | ✓ | ✓ | ✓ | ✗ | Luồng khớp; nợ mọi trạng thái lỗi |
| Tài khoản | Quên mật khẩu | `/customer/account/forgotpassword/` | ✓ qua email | ✓ qua SĐT + OTP | ✓ | ✗ | Chốt định danh email hay SĐT |
| Tài khoản | Đã đăng xuất | `/customer/account/logoutSuccess/` | ✓ đếm 5s | ✓ toast | ✓ toast | ✗ | Chốt trang riêng hay toast |
| Tài khoản | Tài khoản: tổng quan & thông tin | `/customer/account/` (+ edit, changepass, newsletter) | ✓ | ✓ 5 tab chạy thật | ✓ | ✗ | Thiếu guard đăng nhập, trạng thái rỗng/lỗi, Figma |
| Tài khoản | Sổ địa chỉ | `/customer/address/` | ✓ | ✓ CRUD | ✓ CRUD | ✗ | Chốt 2 hay 3 cấp địa giới |
| Tài khoản | Đơn hàng của tôi | `/sales/order/history/` | ✓ | ✓ 3 đơn | ✓ | ✗ | Thiếu rỗng, lọc, trạng thái tiêu cực |
| Tài khoản | Chi tiết đơn hàng (+ hoá đơn, vận đơn, in) | `/sales/order/view/` | ✓ | ✓ timeline | ✓ | ✗ | Đủ nhìn, chưa đủ hành vi; chốt phạm vi huỷ, đổi trả |
| Tài khoản | Tra cứu đơn khách vãng lai | `/sales/guest/form/` | ✓ dịch máy | ✗ | ✗ | ✗ | Thiếu hoàn toàn; chốt có giữ |
| Tài khoản | Wishlist | `/wishlist/` (302 login) | ✓ | ✗ cố ý | ✗ cố ý | ✗ | Cần khách xác nhận bỏ hẳn |
| Tài khoản | DAFC Rewards | `/customer-services` + 2 màn tài khoản | ✓ | ✓ 2 tab | ✓ | ✗ | Thiếu landing so sánh hạng |
| Tài khoản | So sánh sản phẩm | `/catalog/product_compare/index/` | ✓ đang mở, mồ côi | ✗ | ✗ | ✗ | Đề xuất ẩn |
| Tài khoản | Tiện ích Magento khác (review, newsletter, vault) | `/review/customer/`, `/newsletter/manage/`, `/vault/cards/` | ◐ review đã tắt | ✗ | ✗ | ✗ | Đề xuất ẩn; chỉ giữ newsletter |
| Nội dung | Giới thiệu | `/about-us/` | ✓ | ✗ toast | ✗ | ✗ | Thiếu hoàn toàn |
| Nội dung | Liên hệ | `/contact-us` | ✓ form Salesforce | ✗ | ✗ | ✗ | Thiếu hoàn toàn; lệch hotline giữa 3 trang |
| Nội dung | FAQ | `/faq` | ✓ 5 nhóm ~59 mục | ◐ 6 câu trang chủ | ◐ | ✗ | Cần trang riêng |
| Nội dung | Chính sách (12 trang) | `/delivery-policy`, `/privacy-policy`... | ✓ 12 | ◐ 3/12 | ◐ 3/12 | ✗ | Thiếu 9/12; một template đủ dùng |
| Nội dung | Danh sách + chi tiết cửa hàng | `/storelocator`, `/storelocator/index/view/id/N`, WP | ✓ 47 cửa hàng, mỗi cửa hàng 1 URL | ◐ chỉ trong pickup | ◐ | ✗ | Thiếu hoàn toàn; chốt dùng WP hay shop |
| Nội dung | Site ngoài (tuyển dụng, blog, Pre-loved, đặt lịch) | www.dafc.com.vn, preloved.dafc.com.vn | ✓ | ✗ | ✗ | ✗ | Ngoài phạm vi; chốt mở tab mới |
| Hệ thống | Trang 404 | `/nonexistent` | ✓ | ✗ | ✗ | ✗ | Thiếu hoàn toàn; bắt buộc |
| Hệ thống | Trang 503, bảo trì, mất mạng | login 503 ngẫu nhiên | ◐ Varnish thô | ✗ | ✗ | ✗ | Thiếu hoàn toàn |
| Hệ thống | Toast, thông báo hệ thống | toàn site | ✓ | ✓ 1 kiểu | ✓ 1 kiểu | ✓ | Code cần biến thể lỗi |
| Hệ thống | Đang tải, skeleton, lỗi ảnh | toàn site | ◐ | ◐ | ◐ | ◐ component | Chốt có cần trong spec |
| Hệ thống | Email giao dịch (8 mẫu) | ngoài web | ◐ suy ra | ✗ | ✗ | ✗ | Bổ sung từ phản biện; khách chốt phạm vi |
| Công cụ | Bảng cài đặt demo (`#settingsPanel`, `#topFab`) | không có | ✗ | ✓ | ✓ | – | Công cụ demo, không đếm vào bàn giao |

## 2. Chi tiết từng trang

### Header desktop + mega menu

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Nghỉ: thanh menu 1 dòng, mục đang xem sáng | ✓ | – | ✓ | ✓ | |
| Hover mở mega panel | ✓ 5 panel 2 đến 7 cột | – | ✓ hover-intent 120ms, 3 cột | ✓ 4 panel | Túi xách, Giày, Phụ kiện dùng chung khuôn Quần áo |
| Mega panel Khuyến mãi | ✓ | – | ✗ link phẳng | ✗ | Đã kiểm mã: `DK_NAV_CATS` có `sale:true` nhưng không nơi nào đọc |
| Header sticky, promo bar trôi | ✓ | ✓ | ✓ | – | |
| Icon tài khoản đổi theo đăng nhập | ✓ | ✗ luôn mở login | ✓ | ✗ | |
| Badge số trên giỏ | ✓ | ✓ số, nảy; 0 không ẩn | ✓ số, nảy; 0 không ẩn | ◐ chưa có chấm giỏ | Đã kiểm mã: badge mobile là con số (`span.cart-badge` 15px), không phải chấm; cả 2 file set `textContent = 0` sau đặt hàng, không ẩn |
| Icon wishlist trên header | ✓ về login | ✗ | ✗ cố ý | ✗ | |
| Nút Danh sách cửa hàng, Pre-loved rời site | ✓ | ✗ | ✗ | ✗ | Pre-loved trong demo là mục về PLP |
| Bản EN của thanh menu (chữ dài hơn) | ✓ | – | ◐ chưa kiểm tràn | ✗ | Phản biện thêm |
| Mega panel ít mục hoặc quá nhiều mục | ✓ | – | ✗ | ✗ | Phản biện thêm |

Thiếu: mega panel Khuyến mãi (desktop + Figma), icon tài khoản đã đăng nhập ở mobile, khung kiểm EN của thanh menu, mega panel ít hoặc nhiều mục, chấm giỏ trong component Figma.
Cần chốt: có wishlist hay không; Pre-loved mở tab mới hay ở lại shop.

### Menu drawer mobile

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Tầng 0 danh mục + mũi tên mục có con | ✓ | ✓ thêm tab 3 ngành | – | ✓ Nam + Làm đẹp | |
| Tầng 1/2 có nút quay lại mang tên cha | ✓ | ✓ | – | ✓ | Figma thiếu cấp 2 Sản phẩm mới, cấp 1 Nữ |
| Thương hiệu liệt kê phẳng 25 hãng | ✓ | ✓ | – | ✓ | |
| Chân drawer chưa đăng nhập + ngôn ngữ | ✓ | ✓ | – | ✓ | |
| Chân drawer đã đăng nhập | ◐ suy ra | ✓ hàng Tài khoản | – | ✗ | |
| Khối Follow us trong drawer | ✓ lệch icon với footer | ✗ | – | ✗ | |
| Lối "Tất cả <danh mục>" từ cấp 2 | ✓ | ✗ bỏ 19/08 | – | ✗ | Đã kiểm mã: `headRow(menuSub.all...)` đã comment |
| Drawer dài hơn màn: chân cuộn hay ghim | ✓ | ◐ chưa kiểm | – | ✗ | Phản biện thêm |
| Tên hãng hoặc danh mục 2 dòng trong hàng 44 | ✓ | ✗ | – | ✗ | Phản biện thêm |

Thiếu: Follow us, lối "Tất cả ...", Figma đã đăng nhập + cấp 1 Nữ + cấp 2 Sản phẩm mới, khung cuộn dài, hàng 2 dòng.
Cần chốt: giữ hay bỏ lối "Tất cả ..." (site có, demo bỏ).

### Băng khuyến mãi đầu trang (promo bar)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Nhiều slide tự chuyển, chữ nhấn đậm | ✓ | ✓ | ✓ | ◐ chưa kiểm | |
| Cả slide là link tới trang đích | ✓ redirect banner_id | ✗ chữ tĩnh | ✗ | – | Đã kiểm mã: `span`, không `<a>` |
| Không chiến dịch: băng biến mất, header nhích lên | ✓ `.no_header_banner` | ✗ | ✗ | ✗ | |
| Mobile chữ dài 2 dòng | ◐ | ◐ chưa kiểm tràn | – | ✗ | |
| Popup banner chiến dịch | ✓ placeholder | ✗ | ✗ | ✗ | |
| Chỉ 1 chiến dịch (không tự chuyển) | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: slide là link, trạng thái không chiến dịch, popup banner, 1 slide, kiểm tràn 2 dòng.
Cần chốt: có giữ popup banner chiến dịch không.

### Footer

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Newsletter trong footer (email + SĐT) | ✓ 2 ô | ✗ | ✗ thành section trang chủ | ✓ | |
| Newsletter lỗi, thành công, đã đăng ký | ◐ | ✗ chỉ toast | ✗ | ✗ | |
| Mobile cột link thu gọn accordion | ✓ | ✓ | – | ✗ | |
| 17 link footer điều hướng thật | ✓ | ◐ 3/17 | ◐ 3/17, 14 toast | – | `FOOTER_ROUTES` 3 key; bản EN còn "Careers" chưa đếm |
| Icon mạng xã hội có href | ✓ 2 bộ icon lệch | ✗ | ✗ `<a>` không href | – | |
| Logo cổng thanh toán, đối tác vận chuyển bằng ảnh | ✓ | ✗ nhãn chữ | ✗ nhãn chữ | ◐ chưa kiểm | Đã kiểm mã: mobile render 5 nhãn chữ VISA, MASTER, JCB, AMEX, MOMO + TIKINOW y hệt desktop |
| Nút Tùy chỉnh Cookies mở lại banner | ✓ | ✗ | ✗ | ✗ | |
| Footer khi có sticky CTA mobile | – | ◐ có xử lý code 31/08 | – | ✗ | Phản biện thêm; chưa thành case bàn giao |

Thiếu: newsletter + trạng thái, href social, logo ảnh, nút cookie, 14 link chính sách, khung footer + sticky CTA.
Cần chốt: newsletter nằm footer hay section riêng (đã đảo 26/08); bộ icon social dùng bộ nào.

### Lớp tìm kiếm + gợi ý (autocomplete)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Đóng (chỉ icon) rồi mở ô nhập, nút đóng | ✓ | ✓ | ✓ | ✓ | |
| Mở chưa gõ: lịch sử + từ khoá phổ biến + nổi bật | ✗ chỉ ô trống | ✓ | ✓ | ✓ | |
| Mở chưa gõ nhưng chưa có lịch sử | – | ✗ | ✗ | ✗ | Phản biện thêm, mức cao: bố cục lệch khi mất khối |
| Đang gõ: gợi ý SP có ảnh + giá + xem tất cả N | ✓ 5 SP | ◐ chữ, không ảnh | ◐ chữ | ✓ dạng chữ | |
| Đang gõ không có gợi ý | ✓ | ✓ | ✓ | ✓ mobile, ✗ desktop | |
| Đang tải gợi ý | ◐ | ✗ | ✗ | ✗ | |
| Gợi ý không tải được (lỗi mạng) | – | ✗ | ✗ | ✗ | Phản biện thêm |
| Khớp danh mục hoặc hãng nhưng không khớp SP | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Tab Nam, Nữ, Làm đẹp lọc gợi ý | ✗ | ◐ chỉ đổi style | ✗ tàn tích | ✓ | Đã kiểm mã: desktop vẫn đăng ký `screenSearch` trong `RENDER`, mở được qua hash, không có lối bấm; là ✗ chứ không phải n/a |
| Xoá từng mục, toàn bộ lịch sử | – | ◐ từng mục | ◐ từng mục | ✓ | Nút "Xóa" chỉ xoá ô nhập |
| Tìm kiếm nâng cao | ✓ 2 trang riêng, 8 trường, nhãn kỹ thuật lộ | ✗ | ✗ | ✗ | Tách hàng riêng theo phản biện; đề xuất ẩn |

Thiếu: gợi ý có ảnh + giá, đang tải, lỗi tải, không lịch sử, tab ngành làm thật hoặc gỡ, xoá toàn bộ lịch sử.
Cần chốt: gợi ý có ảnh + giá như site; tab ngành giữ hay bỏ; đề xuất khách ẩn tìm kiếm nâng cao.

### Đổi ngôn ngữ VI/EN

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Nút cờ + dropdown ngôn ngữ | ✓ | ✓ ENG, VIE | ✓ chip 1 nút | ◐ | |
| Đổi ngôn ngữ giữ nguyên trang | ✓ uenc | ✓ | ✓ | – | |
| Chuỗi chưa dịch lọt | ✗ As low as, Account... | ◐ nhãn set bằng JS | ◐ | – | |
| Nội dung CMS, chính sách có bản EN | ◐ | ✗ chờ bản EN | ✗ | – | |

Thiếu: bản EN cho body chính sách; rà chuỗi runtime.
Cần chốt: khách gửi bản EN chính thức; dải tablet 768-1199 theo khuôn nào (phản biện).

### Cookie consent

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Banner lần đầu: chấp nhận, từ chối, tuỳ chọn | ✓ | ✓ | ✓ | ✗ | Đã kiểm mã: id mobile là `#cookieGate` (`.cg-intro`, `.cg-prefs`), `#cookieBar` chỉ có ở desktop |
| Bảng tuỳ chỉnh theo nhóm | ✓ | ✓ | ✓ | ✗ | |
| Nhớ lựa chọn + nút mở lại | ✓ | ✗ cố ý | ✗ | ✗ | |
| Thanh cảnh báo cookie hoặc JS tắt | ✓ chưa dịch | ✗ | ✗ | ✗ | |
| Chồng lớp với sticky CTA, modal đăng nhập | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: toàn bộ Figma, nhớ lựa chọn, cảnh báo JS, khung chồng lớp.
Cần chốt: demo có cần nhớ lựa chọn không.

### Trang cổng 3 ngành (`main.html`)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Nghỉ, rê sáng 1 block, chạm theo cuộn | ✗ | ✓ | ✓ | ✗ | |
| Bố cục mobile 3 block dọc | – | ◐ chưa liệt kê riêng | – | ✗ | Phản biện thêm |
| Nối tới trang chủ thật | – | ✗ trỏ `home.html#nam` | ✗ | ✗ | Luồng đứt |
| Ảnh lỗi, đang tải | – | ✗ | ✗ | ✗ | |

Thiếu: đích nối sang screen home của 2 file chính, ảnh lỗi.
Cần chốt: giữ hay bỏ trang cổng.

### Trang chủ

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Mặc định chưa đăng nhập | ✓ | ✓ | ✓ | ✗ | |
| Hero slider thuần ảnh | ✗ 2 tile tĩnh | ✓ | ✓ | ✗ | |
| Hero 1 slide, dải ít hơn 1 lượt | – | ✗ | ✗ | ✗ | Phản biện thêm |
| Hàng mới về, Đang giảm giá (ẩn khi rỗng) | ✗ | ✓ | ✓ | ✗ | |
| Mua theo danh mục 6 ô | ✗ | ✓ | ✓ | ✗ | |
| Nhà mốt trong ngày + thẻ thương hiệu | ✗ | ✓ | ✓ | ✗ | |
| Thẻ thương hiệu không logo, ô danh mục thiếu ảnh KV | – | ✗ | ✗ | ✗ | Phản biện thêm, mức cao: KV nam 9, nữ 6, làm đẹp 0 |
| 4 cam kết link tới chính sách | ✓ | ✓ chưa link | ✓ chưa link | ✓ | |
| FAQ accordion | ✗ trang riêng | ✓ 6 câu | ✓ 2 cột | ✗ | |
| Đăng ký nhận tin có validate | ✓ | ✗ toast | ✗ toast | ✗ | |
| Trang chủ theo ngành Nam, Nữ, Làm đẹp | ✗ | ✗ chung 1 screen | ✗ | ✗ | |
| Đã đăng nhập (chào tên) | ◐ | ✗ | ✗ | ✗ | |
| Bản EN | ✓ | ✓ | ✓ | ✗ | |
| Skeleton | ✗ | ✗ | ✗ | ✗ | |

Thiếu: toàn bộ Figma, validate newsletter, đã đăng nhập, trạng thái ít dữ liệu, thẻ không logo.
Cần chốt: trang chủ riêng theo ngành hay một trang; 7 mục mở của HOMEPAGE-DAFC.

### PLP danh mục (cấp 1 đến cấp 4, beauty)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Mặc định có hàng | ✓ 4 cột, 2 cột | ✓ | ✓ | ✓ 2 khổ | |
| Sắp xếp | ✓ 4 lựa chọn | ✓ 5 | ✓ 5 popover | ✓ | |
| Phân trang | ✓ số trang 12/24 | ✓ Xem thêm 24 | ✓ Xem thêm + tiến độ | ✓ | |
| Đã xem hết (trang cuối) | ✓ | ✗ nút biến mất, không dòng kết | ✗ | ✗ | Phản biện thêm, mức cao |
| Đổi mật độ lưới | ✗ | ✓ 1/2 cột | ✓ 4/3 cột | ✓ | |
| Chip bộ lọc đang áp + số trên nút | ✓ | ✗ | ✓ `dkActiveFilters` | ◐ | |
| Chip lọc quá nhiều (8+) | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| 0 kết quả do lọc + xoá tất cả | ✓ lỗi facet biến mất | ✓ | ✓ | ✓ | |
| Danh mục rỗng tự nhiên | ✓ | ✗ | ✗ | ✗ | |
| Danh mục 1-3 SP (hàng lẻ) | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Lọc thật theo danh mục | ✓ | ✗ 3 trang cùng 40 SP | ✗ | – | `plpProducts` chỉ lọc search, brand, dept beauty |
| Danh mục cấp 3-4: banner 600x400 + breadcrumb 4 mốc | ✓ Giày cao gót | ✗ | ✗ | ✗ | Phản biện thêm; demo breadcrumb chỉ 2-3 mốc |
| PLP beauty (facet dung tích, 21 SP) | ✓ | ◐ dept beauty | ◐ | ✗ | Phản biện thêm |
| Danh mục Trang sức | ✓ `/women/jewelry.html` | ✗ | ✗ | ✗ | Phản biện thêm |
| Thẻ: nhãn New Season, La Vacanza | ✓ | ✓ thẻ thứ 4 | ✓ | ✓ | |
| Thẻ: sale -% + giá gạch | ✓ | ✓ | ✓ | ✓ | |
| Thẻ: đặt trước | ✗ | ✓ | ✓ | ✓ component bản 26/08 | 135+ thẻ raw |
| Thẻ: hết hàng toàn bộ | ✗ bị ẩn | ✗ | ✗ | ✗ | `OOS_MODE` chỉ size 43/44 |
| Thẻ: sắp hết, ảnh lỗi | ✗ | ✗ | ✗ | ✗ | Phản biện thêm |
| Thẻ: tên 2 dòng, giá 9-10 chữ số | ✓ | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |
| Thẻ: ảnh thứ 2 khi hover | ✓ | – | ✗ | ✗ | |
| Thẻ: chọn size trên thẻ | ✓ | ✓ nút + sheet | ✓ dải hover | ✓ | |
| Thẻ: swatch màu đổi ảnh | ✗ mỗi màu 1 SP | ✓ | ✓ | ✓ | |
| Thẻ: hơn 5 swatch, 0 swatch | – | ✗ | ✗ | ✗ | Phản biện thêm |
| Thẻ: wishlist | ✗ PLP | ✗ | ✗ | ✗ | |
| Skeleton khi lọc, sắp xếp, xem thêm | ✗ | ◐ chỉ Xem thêm | ✓ | ✗ | Chưa có skeleton lần tải đầu, lỗi tải |
| Breadcrumb | ✓ 2-4 mốc | ✓ | ✓ đoạn giữa không bấm | ◐ component EN | |
| Bản EN | ✓ | ✓ | ✓ | ✗ | |

Thiếu: lọc theo danh mục, chip lọc mobile, thẻ hết hàng, danh mục rỗng và ít SP, banner danh mục, breadcrumb 4 mốc, Trang sức, trạng thái trang cuối, độ dài dữ liệu, hover ảnh 2 desktop.
Cần chốt: phân trang số (site) hay Xem thêm (demo); Làm đẹp là ngành riêng (demo) hay dưới giới (site); có mục Trang sức không.

### PLP Khuyến mãi (sale)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Lưới toàn thẻ -% + giá gạch | ✓ | ✗ | ✗ | ✗ | |
| Vào từ menu với filter sẵn | ✓ | ✗ | ✗ | ✗ | |
| Special Offer: mã theo hãng, mua 2 giảm 15% | ✓ | ✗ | ✗ | ✗ | |
| Hết chương trình, danh mục rỗng | ✓ | ✗ | ✗ | ✗ | |

Thiếu: cả 4 case ở cả 3 cột.
Cần chốt: PLP sale lọc theo `off` + chip lọc sẵn; Figma dùng chung khuôn PLP.

### Sản phẩm mới, bộ sưu tập mới, landing chiến dịch

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| PLP "Sản phẩm mới" thật | ✗ `/new-arrivals.html` 404, Just In về trang chủ | ◐ menu về PLP chung | ◐ | ◐ mega panel | Đã kiểm site: site không có PLP sản phẩm mới |
| Landing CMS editorial | ✓ MCM, Stefano Ricci | ✗ | ✗ | ✗ | |
| Danh mục hero video + toggle Nữ/Nam | ✓ Maiolica | ✗ | ✗ | ✗ | |
| PLP Non-Sale nhãn kỹ thuật lộ | ✓ | ✗ | ✗ | ✗ | |
| Landing hết hạn: 404, trước-trong-sau | ✓ VIP Day 404 | ✗ | ✗ | ✗ | |
| Thẻ trong landing: 3 hành động, "Tạm hết hàng" | ✓ | ✗ | ✗ | ✗ | |

Thiếu: toàn bộ template landing (3 kiểu).
Cần chốt: "Sản phẩm mới" là PLP lọc theo ngày tạo hay landing CMS theo mùa.

### Trang thương hiệu

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Logo + mô tả thu gọn | ✓ | ✓ | ✓ | ✓ chỉ đóng | |
| Mô tả trạng thái mở (EN dài) | ✓ | ◐ | ◐ | ✗ | Phản biện thêm |
| Hãng không logo, không mô tả | ✓ DAFC | ✓ tên chữ | ✓ | ✗ | |
| Hero ảnh lớn | ✗ | ✓ | ✓ | ✓ | |
| Dải danh mục con 150x150 | ✗ | ✓ | ✓ | ✓ | Chưa có bản 1-2 con và 8+ con |
| Hãng không có sản phẩm (22 hãng) | ◐ | ✗ lưới trống | ✗ | ✗ | |
| Lưới hỗn hợp sale + New Season | ✓ | ✓ | ✓ | ✗ | |
| Brand story CMS riêng song song | ✓ | ✗ | ✗ | ✗ | |
| 4 hãng còn lại trong Figma | – | – | – | ✗ chỉ Versace | |
| Lệch tên Thương hiệu, Gợi ý, Shop by | ✗ 3 tên 1 trang | – | – | – | Lỗi site |

Thiếu: trạng thái rỗng 22 hãng, brand story, mô tả mở, Figma 4 hãng.
Cần chốt: tách brand story khỏi PLP hãng như site.

### Danh bạ thương hiệu A-Z

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Chỉ mục chữ cái A-Z | ✓ tĩnh | ✗ | ✗ | ✗ | Cấp hàng Figma hạ về ◐ vì ✓ là menu, không phải trang |
| Lưới logo hãng | ✗ | ✗ | ✗ | ✗ | |

Thiếu: cả 2 case.
Cần chốt: cần trang danh bạ riêng không hay menu là đủ (brief nhắc A-Z có chỉ mục).

### Kết quả tìm kiếm

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Có kết quả | ✓ facet không Màu | ✓ | ✓ | ✓ | |
| 0 kết quả | ✓ | ✓ | ✓ | ✓ | |
| Gợi ý sửa chính tả khi 0 KQ | ✗ | ✗ | ✗ | ✗ | Phản biện thêm |
| Cụm từ liên quan kèm số | ✓ | ✗ | ✗ | ✗ | |
| Sort "Mức độ liên quan" riêng | ✓ | ◐ | ◐ | ✗ | Đã kiểm mã: có "Phù hợp nhất" mặc định (`plpSort = 'relevance'`) nhưng dùng chung mọi PLP |
| Từ khoá rỗng, quá ngắn | ✓ | ◐ chưa kiểm | ◐ | ✗ | |
| Tiêu đề từ khoá dài 2 dòng, số KQ lớn, rất ít KQ | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: cụm từ liên quan, gợi ý chính tả, độ dài dữ liệu.
Cần chốt: facet tìm kiếm có Màu hay không.

### Bộ lọc

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Danh mục cây 3 tầng theo giới | ✗ 7 mục phẳng | ✓ | ✓ | ✓ | |
| Thương hiệu + ô tìm | ✓, ô tìm ✗ | ✓ | ✓ | ✓ | Chưa có trạng thái ô tìm không khớp |
| Màu sắc dạng ô (15) | ✗ chữ | ✓ | ✓ | ✓ | |
| Size theo nhóm + tab đơn vị | ✗ 86 giá trị | ✓ | ✓ | ✓ | |
| Độ cao giày | ✗ | ✓ | ✓ | ✗ | |
| Khoảng giá lọc thật | ✗ | ✗ UI tĩnh | ✗ | ✓ UI | |
| Ưu đãi, Khác | ✗ | ✓ | ✓ | ◐ | |
| Dung tích (beauty) | ✓ | ✓ | ✓ | ◐ | |
| Facet Dịp (10 giá trị) và Giới tính | ✓ mọi PLP | ✗ | ✗ | ✗ | Phản biện thêm; attribute thật có dữ liệu |
| Đặt lại chỉ khi đã áp, Áp dụng kèm số | ✗ | ✓ | ✓ | ✓ | Chưa có trạng thái đang đếm, 0 KQ trong panel |
| Ẩn giá trị không còn SP | ◐ | ✓ | ✓ | ✗ | |
| Facet dài cần "Hiển thị thêm", facet ẩn theo ngữ cảnh | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Số đếm cạnh giá trị | ✗ | ✗ | ✗ | ✗ | |
| Thứ tự facet theo brief | ✗ | ✗ Màu trước Size | ✗ | ✗ | |

Thiếu: khoảng giá thật, số đếm, thứ tự facet, facet Dịp, ô tìm không khớp, facet dài.
Cần chốt: sheet Price 4 mức; giữ hay bỏ facet Dịp; thứ tự facet.

### Quick add / quick view

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Mặc định (gallery, màu, size, CTA) | ◐ chỉ size | ✓ | ✓ | ✓ | |
| Size hết hàng hiện mờ | ✓ | ✓ | ✓ | ✓ | |
| Bấm size hết, nhận thông báo | ✗ | ✓ | ✓ dải hover, ✗ dialog | ✓ | |
| Đặt trước (CTA đổi nhãn) | ✗ | ✓ | ✓ | ✓ | |
| Bắt chọn size trước khi thêm | – | ✗ chip đầu chọn sẵn | ✗ | – | |
| Kích hoạt trên mobile | ✓ nút | ✓ nút + | – | ✓ | |
| Onesize, không size (túi, beauty) | ✓ | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |
| Mọi size đều hết; 9 bậc size | ✗ | ✗ | ✗ | ✗ | Phản biện thêm |
| Đang thêm (loading), thêm thất bại | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: Onesize, mọi size hết, 9 bậc, loading, bắt chọn size.
Cần chốt: câu hỏi 07 brief; dải hover desktop đã đảo chốt 3 lần, không tự khôi phục.

### Quà tặng (landing DAFC Gifting, PDP phiếu quà, gói quà)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Landing quà 7 khối (phiếu 3/5/10 triệu, quà nam, nữ, doanh nghiệp, cá nhân hoá, gói quà, miễn phí giao) | ✓ | ✗ | ✗ | ✗ | |
| Form "Liên hệ tư vấn" 5 trường + màn cảm ơn | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| PDP phiếu quà (template riêng: giá "As low as", stepper, không tên người nhận, điều khoản dài) | ✓ còn ô Màu sắc vô nghĩa | ✗ | ✗ | ✗ | Phản biện: tách thành template riêng |
| Gói quà, thiệp khi thanh toán | ◐ | ✗ promo hứa, không control | ✗ | ✗ | |
| Kiểm số dư phiếu, áp phiếu còn dư | ✗ | ✗ | ✗ | ✗ | Phản biện thêm; chuẩn ngành |

Thiếu: toàn bộ.
Cần chốt: đưa phiếu quà và gói quà vào phạm vi không; phiếu dùng 1 lần hay nhiều lần.

### Trang chi tiết sản phẩm (PDP)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Nguyên giá | ✓ | ✓ | ✓ | ✓ | |
| Sale: giá gạch + chip -% | ✓ nhãn Anh lọt | ✓ | ✓ | ✓ | |
| Đặt trước | ✗ | ✓ | ✓ | ✓ | |
| Nhiều size, hệ size theo hãng | ✓ dropdown | ✓ chip | ✓ | ✓ 1/3/6/9 ô | product-options thiếu trục sizes |
| Size hết hàng hiện mờ | ✗ bị ẩn | ✓ | ✓ | ✓ | |
| Size hết có nhận thông báo | ✗ | ✓ | ✓ | ✓ | |
| Sắp hết "Chỉ còn 01" | ✗ | ✓ | ✓ | ✓ | |
| Hết hàng toàn bộ | ✗ chưa gặp | ✗ | ✗ | ✗ | |
| Onesize, không size | ✓ | ✓ | ✓ | ✓ SP3 | |
| Beauty: chọn dung tích, giá đổi theo | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Nhiều màu | ✓ không tên màu | ✓ + tên | ✓ | ✓ | |
| Không có ô màu | ✗ | ✗ khối rỗng | ✓ | ✓ SP6 | |
| Chưa chọn size bấm mua, lỗi | ✓ | ✗ | ✗ | ✗ | |
| Gallery zoom, lightbox | ✓ | ◐ chỉ PDP4 | ✓ | ✓ desktop | |
| Gallery 1 ảnh vs 8+ ảnh | ✓ | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |
| Tên 2-3 dòng + giá dài + chip cùng hàng | ✓ | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |
| Video, 360 | ✗ | ✗ | ✗ | ✗ | |
| Số lượng stepper | ✓ | ✗ | ✗ | ✗ | |
| 2 CTA (Mua ngay đứng trước Thêm giỏ) | ✓ | ✗ | ✗ | ✗ | Đích Mua ngay tách hàng riêng |
| Đang thêm vào giỏ (loading), đã có trong giỏ | – | ✗ | ✗ | ✗ | Phản biện thêm |
| SKU, thông số theo ngành | ✓ | ✗ SKU, ◐ specs | ✗ | ✗ | |
| Tab, accordion nội dung | ✓ 3 tab | ✓ 4 accordion | ✓ | ✓ | |
| Trả góp + khối khuyến mãi | ✗ | ✓ | ✓ | ✓ | |
| Rail gợi ý mua kèm, tương tự | ◐ 1/9 PDP | ✓ 2 dải | ✓ carousel | ◐ | Chưa có rail rỗng hoặc dưới 4 SP |
| Wishlist, chia sẻ, đánh giá | ◐ share có icon, review đã tắt | ✗ | ✗ | ✗ | Đã kiểm site: `/review/product/list/` 404, PDP không render khối đánh giá |
| Sticky CTA | ✗ | ✓ `#pdpStickyCta` | ✗ code chết | ◐ raw | |
| Badge New Season đè gallery | ✓ | ✓ | ✓ | ✓ | |
| Nhãn kho + cảnh báo không đổi trả | ◐ | ✗ | ✗ | ✗ | |
| Sản phẩm đã gỡ (404 sản phẩm) | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Bản EN | ✓ | ✓ | ✓ | ✗ | |

Thiếu: hết hàng toàn bộ, chặn chưa chọn size, stepper, 2 CTA, SKU, dung tích, độ dài dữ liệu, gallery 1 vs 8+, loading CTA, khối màu rỗng mobile.
Cần chốt: giữ 2 CTA và stepper không; SKU hiện hay ẩn; Figma ráp product-options cho 10/12 khung.

### Luồng Mua ngay (bổ sung)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Bấm Mua ngay: checkout chỉ chứa 1 món | ✓ | ✗ | ✗ | ✗ | Giỏ cũ giữ hay thay chưa rõ |
| Mua ngay khi chưa chọn size | ✓ required | ✗ | ✗ | ✗ | |
| Quay lại sau Mua ngay: món ở đâu | ◐ | ✗ | ✗ | ✗ | |

Thiếu: toàn bộ.
Cần chốt: giữ Mua ngay không (câu hỏi brief về 2 CTA).

### Bảng kích thước

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Bảng đúng loại SP đang xem | ✓ | ✗ chỉ Quần áo nam + Đồ lót | ✗ | ✗ | |
| Bảng HTML, đổi đơn vị | ✗ ảnh | ✓ HTML, ✗ đơn vị | ✓, ✗ | ✓, ✗ | |
| Bảng rộng cuộn ngang, cột đầu ghim; SP chưa có bảng | ✗ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: data bảng theo ngành, đổi đơn vị, bảng rộng, rỗng.
Cần chốt: ảnh tĩnh (site) hay bảng HTML (demo).

### Nhận thông báo khi có hàng

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Lỗi rỗng email, SĐT | – | ✓ | ✓ | ✗ | |
| Validate định dạng | – | ✗ | ✗ | ✗ | Đã kiểm mã: chỉ `if (!em && !ph)` |
| Thành công, CTA "Đã đăng ký" | – | ✓ | ✓ | ✗ | |
| Mail xác nhận | – | ✗ | ✗ | ✗ | |
| Đang gửi, lỗi mạng, email trùng | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: validate, mail, đang gửi, trùng; Figma trạng thái.
Cần chốt: khách có làm tính năng này không (Magento cần đăng nhập).

### Đã thêm vào giỏ, mini cart

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Xác nhận thêm thành công | ✓ | ✓ | ✓ | ✓ | |
| Mở khi rê icon giỏ, tự rút 5s | ✓ | – | ✓ `CC_MS = 5000` | ◐ | |
| Mini cart rỗng | ✓ | – | ✓ | ✗ | |
| Sửa số lượng, xoá trong mini cart | ✓ | ✗ | ✗ tấm đọc | ✗ | |
| Nút Thanh toán từ mini cart | ✓ | ✗ | ✗ chỉ "Đi đến giỏ hàng" | ✗ | |
| Thêm giỏ ghi thật vào giỏ | ✓ | ✗ chỉ tăng badge | ✓ | – | |
| Thêm giỏ lỗi | ✓ popup | ✗ | ✗ | ✗ | |
| Mini cart trượt từ phải (brief) | ✗ | ✗ | ✗ | ✗ | |
| Mini cart 8+ món cuộn, món vừa hết hàng | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: sửa và xoá trong mini cart, nút Thanh toán, lỗi, nhiều món, mobile ghi thật.
Cần chốt: câu hỏi 06 brief (mini cart thay màn giỏ đến đâu); dropdown hay trượt phải.

### Giỏ hàng

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Giỏ rỗng | ✓ | ✓ | ✓ | ✗ | |
| Dòng thường, sale, đặt trước | ✓, ✓, ✗ | ✓ | ✓ | ✓, ✓, ✗ | |
| Tick chọn món, chọn tất cả | ✓ | ✓ | ✓ | ✓ raw | |
| Tick 0 món (Thanh toán disabled), tick một phần | ✓ | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |
| Giỏ hỗn hợp đặt trước + sẵn hàng | – | ✗ | ✗ | ✗ | Phản biện thêm |
| Xoá món có xác nhận, hoàn tác | ✓ | ✗ | ✗ | ✗ | |
| Stepper số lượng | ✓ | ✓ | ✓ | ✓ | Chưa có trạng thái đang cập nhật |
| Món hết hàng, vượt kho, đổi giá | ✓ | ✗ | ✗ | ✗ | |
| Dòng quà tặng kèm | ✓ | ✓ | ✓ | ✓ | |
| Quà theo mốc đơn + đổi quà | ✗ | ✓ | ✓ | ✓ mốc, ✗ giftSheet | |
| Nhắc đăng nhập tích điểm | ✓ | ✓ | ✓ | ◐ | |
| Ước tính phí vận chuyển | ✓ | ✗ | ✗ | ✗ | |
| Gợi ý dưới giỏ | ✓ | ✗ | ✗ | ✗ | |
| Mobile thanh cố định đáy | ✓ | ✓ | – | ✓ | |
| Sửa biến thể, lưu mua sau | ✗ | ✗ | ✗ | ✗ | |
| Giỏ 10+ món, tên 2 dòng, giá dài | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: xác nhận xoá, hết hàng, phí ship, gợi ý, tick 0 và một phần, hỗn hợp, độ dài; Figma giỏ rỗng + đặt trước + sheet quà.
Cần chốt: câu hỏi 04/05 brief (giỏ và checkout 1 hay 2 màn).

### Ưu đãi, mã giảm, điểm thưởng, phiếu mua hàng

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Nhập mã: thành công, không hợp lệ, đã chọn | ✓ | ✓ | ✓ | ✗ | |
| Chọn mã theo nhóm, tối đa 1/nhóm | ✗ | ✓ | ✓ | ✗ | |
| Điểm thưởng, giảm thành viên | ✓ | ✓ radio | ✓ | ✗ | |
| Voucher tiền mặt nhiều mã | ✓ | ✓ | ✓ | ✗ | |
| Mã hết hạn, mã rớt | ◐ | ✗ hạn, ✓ rớt | ✗ hạn, ✓ rớt | ✗ | `exp` chỉ in "HSD", không chặn |
| Nhập mã tại checkout | ✓ | ✗ | ✗ | ✗ | |
| Chưa đăng nhập, danh sách mã rỗng, đang kiểm mã | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: mã hết hạn, mã tại checkout, chưa đăng nhập, rỗng; toàn bộ Figma.

### Thanh toán (checkout)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Khách vãng lai: email + địa chỉ | ✓ | ✓ | ✓ | ✗ | |
| Đã đăng nhập: sổ địa chỉ + thêm mới | ✓ | ✓ | ✓ | ✗ | Chưa có sổ rỗng, địa chỉ 3 dòng |
| Validate form giao hàng | ✓ | ✗ chỉ pickup | ✗ | ✗ | `placeOrder` không kiểm ô nào |
| Email đã có tài khoản, mời đăng nhập | ✓ | ✗ | ✗ | ✗ | |
| Địa chỉ 3 cấp tỉnh, quận, phường; tìm trong picker | ✓ 3 cấp | ◐ 2 cấp, có tìm | ◐ 2 cấp, có tìm | ✗ | Đã kiểm mã: `#pickSheet` có ô tìm `#pkSearch` lọc danh sách; ma trận gốc ghi "không tìm" là sai |
| Phương thức vận chuyển + ETA | ✓ | ✓ 2 radio, ✗ rỗng | ✓, ✗ | ✗ | |
| Nhận tại cửa hàng 3 chặng | ✗ | ✓ | ✓ | ✗ | Chưa có lỗi chưa chọn cửa hàng |
| Ghi chú đơn hàng | ✓ | ✗ | ✗ | ✗ | |
| Phương thức thanh toán | ✓ COD dưới 20tr, Payoo, trả góp | ✓ | ✓ | ✗ | |
| Không có phương thức thanh toán | ✓ | ✗ | ✗ | ✗ | |
| Địa chỉ thanh toán khác giao hàng | ✓ | ✗ | ✗ | ✗ | |
| Hoá đơn VAT cá nhân, công ty | ✓ | ✓ | ✓ | ✗ | |
| Điểm thưởng, mã giảm tại checkout | ✓ | ◐ chỉ hiện điểm | ◐ | ✗ | |
| Popup đăng nhập trong checkout | ✓ | ✓ | ✓ | ✗ | |
| Đang chuyển sang cổng | ✓ cảnh báo | ✗ | ✗ | ✗ | Tách hàng riêng "Trang trung gian" |
| Đang xử lý đặt hàng, đặt hàng thất bại server | – | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |
| Progress bar + sticky Đặt hàng mobile | ◐ | ✗ | – | ✗ | |
| Đặt cọc pre-order | ✗ | ✗ | ✗ | ✗ | |
| Tóm tắt 8+ món, đơn toàn đặt trước | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Section done/pending, sửa không đẩy lùi | – | ✓ | ✓ | ✗ | |

Thiếu: validate giao hàng, email tồn tại, ghi chú, địa chỉ thanh toán riêng, không có phương thức, mã tại checkout, đang xử lý, thất bại, sổ rỗng; toàn bộ Figma.
Cần chốt: câu hỏi 10 (cọc) và 04 (gộp giỏ-checkout); địa giới 2 hay 3 cấp.

### Trang trung gian sang cổng + trang trả về (bổ sung)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Màn chờ "Đang chuyển hướng, không tải lại" | ◐ có chuỗi | ✗ | ✗ | ✗ | |
| Màn QR + đếm ngược + "Tôi đã thanh toán" | ◐ chuẩn Payoo | ✗ | ✗ | ✗ | |
| Trang trả về đọc mã kết quả rồi rẽ | ◐ | ✗ | ✗ | ✗ | Không kiểm được vì cần đơn thật |

Thiếu: toàn bộ.

### Đặt hàng thành công

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Đã đăng nhập: mã đơn, tổng, ETA | ◐ | ✓ | ✓ | ✗ | |
| Khách vãng lai + khối tạo tài khoản | ✓ | ✗ | ✗ | ✗ | Tạo tài khoản sẽ rơi vào OTP (phản biện) |
| Theo phương thức: COD, đã trả, trả góp, pickup, pre-order | ◐ | ◐ ship, pickup, pre-order | ◐ | ✗ | |
| Quà kèm + điểm thưởng nhận | ✗ | ✓ | ✓ | ✗ | |
| Email xác nhận, tải hoá đơn | ◐ | ✗ | ✗ | ✗ | |

Thiếu: nhánh khách tạo tài khoản, email, hoá đơn; toàn bộ Figma.

### Thanh toán thất bại, huỷ ở cổng, hết phiên

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Cổng trả lỗi: về giỏ kèm message lỗi | ◐ | ✗ | ✗ | ✗ | Đã kiểm site: `/checkout/onepage/failure/` đổ về trang giỏ rỗng, không phải trang riêng |
| Khách huỷ tại cổng: đơn "Chờ thanh toán" + nút thanh toán lại | ◐ | ✗ | ✗ | ✗ | Phản biện: đích là Chi tiết đơn |
| Hết phiên, giỏ đổi giữa lúc thanh toán | ◐ | ✗ | ✗ | ✗ | Phản biện: hành động khác cổng lỗi |
| Đơn chờ thanh toán, hướng dẫn QR | – | ✗ | ✗ | ✗ | |

Thiếu: toàn bộ; là case bắt buộc khi có Payoo, QR.

### Đăng nhập

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Mặc định + mắt mật khẩu + ghi nhớ | ✓ | ✓, ✗ ghi nhớ | ✓, ✗ | ✗ | |
| Lỗi ô rỗng, sai định dạng SĐT | ✓ | ✗ login, ✓ register | ✗, ✓ | ✗ | |
| Sai mật khẩu, khoá, chưa xác thực | ✓ | ✗ luôn thành công | ✗ | ✗ | |
| Referer quay về trang gọi | ✓ | ✓ `loginFrom` | ✓ | ✗ | |
| Captcha sau nhiều lần sai | ✓ tắt | ✗ | ✗ | ✗ | |
| Popup đăng nhập nhanh | ✓ | ✓ `#loginPop` | ✓ | ✗ | |
| Social login | ✗ | ✗ | ✗ | ✗ | |
| Đang đăng nhập (loading), nút disabled, "Phiên hết hạn" | – | ✗ | ✗ | ✗ | Phản biện thêm |
| Trang đăng nhập trả 503 | ✗ lỗi thật | – | – | – | Lỗi site |

Thiếu: mọi trạng thái lỗi, ghi nhớ, loading; Figma chưa có khung nào.

### Đăng ký (OTP 3 bước)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Bước 1 SĐT + stepper + ghi chú loyalty | ✓ | ✓, ✗ ghi chú | ✓, ✗ | ✗ | |
| SĐT sai định dạng, đã tồn tại | ✓ | ✗ chỉ rỗng | ✗ | ✗ | |
| Bước 2 OTP 6 ô, gửi lại, đổi số | ✓ | ✓ | ✓ | ✗ | |
| OTP sai, hết hạn, hết lượt gửi lại | ◐ | ✗ | ✗ | ✗ | Đã kiểm mã: chỉ "Vui lòng nhập đủ 6 số" |
| Bước 3 thông tin + thước mật khẩu | ✓ | ✓ | ✓ | ✗ | |
| Validate khớp mật khẩu, bắt tick điều khoản | ✓ | ✗ | ✗ | ✗ | |
| Hoàn tất: dashboard + chào mừng | ◐ | ✗ | ✗ | ✗ | Phản biện thêm |
| Bỏ dở, mất phiên | ✓ | – | – | ✗ | |

Thiếu: mọi trạng thái lỗi, kết thúc luồng; Figma.

### Quên mật khẩu, đặt lại mật khẩu

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Bước 1 nhập định danh | ✓ email | ✓ SĐT | ✓ SĐT | ✗ | |
| Đã gửi link hoặc OTP | ◐ | ✓ | ✓ | ✗ | |
| Đặt mật khẩu mới + thước độ mạnh | ✓ | ✓ | ✓ | ✗ | |
| Kiểm khớp 2 ô, token hết hạn | ✓ | ✗ | ✗ | ✗ | |
| Trang xác nhận thành công riêng | ✓ | ✗ toast | ✗ toast | ✗ | |

Thiếu: khớp 2 ô, token hết hạn, trang xác nhận; Figma.
Cần chốt: định danh email (site) hay SĐT (demo).

### Đã đăng xuất

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Trang chuyển tiếp có đếm ngược | ✓ | ✗ toast + về PLP | ✗ | ✗ | |

Cần chốt: trang riêng hay toast là đủ.

### Tài khoản: tổng quan & thông tin

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Dashboard: avatar, tên, hạng, CSKH | ✓ | ✓, ✗ CSKH | ✓, ✗ | ✗ | 4 route Magento gộp 1 màn tab (phản biện) |
| Chưa có avatar, tên dài, đang lưu | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Sửa thông tin + validate | ✓ | ✓ | ✓ | ✗ | |
| SĐT, ngày sinh khoá | ✓ | ✗ | ✗ | ✗ | |
| Đổi mật khẩu (mới khác cũ) | ✓ | ✓ | ✓ | ✗ | |
| Nhận bản tin toggle | ✓ | ✓ | ✓ | ✗ | |
| Chặn vào khi chưa đăng nhập | ✓ | ✗ | ✗ | ✗ | `go()` không kiểm `ckAuth` |
| Đổi avatar, xoá tài khoản, thẻ đã lưu | ✓ | ✗ | ✗ | ✗ | Xoá tài khoản là chuẩn Nghị định 13 (phản biện) |

Thiếu: guard đăng nhập, khoá SĐT, avatar, xoá tài khoản, trạng thái rỗng và lỗi; toàn bộ Figma.

### Sổ địa chỉ

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Rỗng | ◐ | ✓ | ✓ | ✗ | |
| Danh sách + mặc định giao, thanh toán | ✓ 2 loại | ✓ 1 loại | ✓ 1 loại | ✗ | |
| Form 3 cấp | ✓ | ◐ 2 cấp | ◐ | ✗ | |
| Xoá có xác nhận | ✓ | ✓ inline | ✓ | ✗ | |
| Form validate lỗi; danh sách 5+ địa chỉ | ✓ | ✗ | ✗ | ✗ | Phản biện thêm, mức cao |

Thiếu: validate form, nhiều địa chỉ; Figma.
Cần chốt: 2 hay 3 cấp địa giới.

### Đơn hàng của tôi

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Chưa có đơn | ✓ | ✗ | ✗ | ✗ | |
| Danh sách + lọc | ✓ | ✗ lọc | ✗ lọc | ✗ | |
| Trạng thái đã huỷ, trả hàng, chờ thanh toán | ✓ | ✗ 3 tone | ✗ | ✗ | |
| Mua lại | ✗ 404 | ✗ toast | ✗ toast | ✗ | |
| Đơn nhiều món (+N), đơn đặt trước ETA, danh sách dài | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: rỗng, lọc, trạng thái tiêu cực, độ dài; Figma.

### Chi tiết đơn hàng (+ hoá đơn, vận đơn, in)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Stepper trạng thái | ✓ | ✓ | ✓ | ✗ | |
| Đơn huỷ, lỗi | ✓ | ✗ | ✗ | ✗ | |
| Dòng pre-order trong đơn | ✗ | ◐ chỉ khi tự đặt đơn có món đặt trước | ◐ | ✗ | Đã kiểm mã: 3 đơn seed trong `ORDERS` không có cờ `preorder`; template có nhánh `it.preorder` nhưng chỉ có dữ liệu sau `placeOrder` |
| Khối thanh toán theo phương thức + VAT | ✓ | ◐ không VAT | ◐ | ✗ | |
| Hành động thật: huỷ, theo dõi, mua lại, hoá đơn, đổi hàng | ◐ hotline | ✗ toast | ✗ toast | ✗ | Site không có RMA (`/rma` 404) |
| Thương hiệu đọc từ data | ✓ | ✗ in cứng Versace | ✗ | ✗ | |
| Tab hoá đơn, vận đơn, hoàn tiền + trang in | ✓ chuẩn Magento | ✗ | ✗ | ✗ | Phản biện thêm; 1 khuôn dùng cho 2 ngữ cảnh (tài khoản và guest) |
| Đơn nhận tại cửa hàng (timeline khác), giao một phần | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: đơn huỷ, hành động thật, tab hoá đơn và vận đơn, pickup, một phần; Figma.
Cần chốt: phạm vi hành động (huỷ khi Chờ xác nhận, đổi trả online).

### Tra cứu đơn khách vãng lai

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Form mã đơn + họ + email | ✓ dịch máy | ✗ | ✗ | ✗ | |
| Không tìm thấy, xem đơn khách | ◐ | ✗ | ✗ | ✗ | |

Thiếu: toàn bộ.
Cần chốt: giữ không (chuẩn Magento cho guest checkout).

### Wishlist

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Chưa đăng nhập, về login | ✓ | ✗ | ✗ | ✗ | |
| Rỗng, có SP, hết hàng, chia sẻ | ✓ | ✗ | ✗ | ✗ | |
| Nút tim trên thẻ, PDP, header | ✓ header, ✗ PLP và PDP | ✗ | ✗ | ✗ | |

Cần chốt: khách xác nhận bỏ hẳn.

### DAFC Rewards

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Landing bảng so sánh 4 hạng | ✓ Member, Gold, Platinum, Diamond | ✗ | ✗ | ✗ | Tiêu đề tiếng Anh lọt bản VI |
| Điều khoản 5 mục accordion trên landing | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |
| Thẻ hạng + tiến độ | ✓ | ✓ | ✓ | ✗ | Chưa có hạng cao nhất, sắp rớt hạng |
| Lịch sử điểm, hết hạn | ✓ | ✓, ✗ hết hạn | ✓, ✗ | ✗ | |
| Rỗng (chưa có điểm) | ◐ | ✗ | ✗ | ✗ | |
| CTA Đăng ký ngay | ✓ | – | – | ✗ | |

Thiếu: landing, rỗng, hết hạn, hạng cao nhất; Figma.

### So sánh sản phẩm (bổ sung) và tiện ích Magento khác

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| So sánh rỗng, bảng 2-4 SP | ✓ trang mở, không nút trên thẻ PLP/PDP | ✗ | ✗ | ✗ | Đã kiểm site: `/catalog/product_compare/index/` 200 |
| Đánh giá của tôi | ✗ đã tắt | ✗ | ✗ | ✗ | Đã kiểm site: review 404 |
| Quản lý newsletter trong tài khoản | ✓ | ✓ toggle | ✓ | ✗ | |
| Xác nhận, huỷ đăng ký newsletter từ email | ◐ chuẩn Magento | ✗ | ✗ | ✗ | Phản biện thêm |

Cần chốt: ẩn so sánh, review, downloadable, PayPal theo hướng luxury; chỉ giữ newsletter.

### Giới thiệu (Về DAFC)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Desktop, mobile, EN | ✓ landing kể chuyện | ✗ toast | ✗ | ✗ | |

Thiếu: 1 template landing không sidebar.

### Liên hệ

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Form + lỗi bắt buộc + cảm ơn | ✓ form, ◐ cảm ơn | ✗ | ✗ | ✗ | Captcha hạ về ◐ chưa kiểm (phản biện: không thấy captcha trong HTML, gửi qua JS Salesforce) |
| Dropdown Dịch vụ 12 mục | ✓ | ✗ | ✗ | ✗ | |
| `/contact/` placeholder theme | ✗ nên redirect | – | – | – | Lỗi site |

Thiếu: toàn bộ.
Cần chốt: hotline và giờ làm việc lệch giữa 3 trang.

### Câu hỏi thường gặp (FAQ)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Accordion nhóm mở, đóng | ✓ | ◐ | ◐ | ✗ | |
| Tìm trong FAQ | ✗ | ✗ | ✗ | ✗ | |
| Khối liên hệ cuối trang | ✓ | ✗ | ✗ | ✗ | |

Thiếu: trang FAQ riêng; "Xem tất cả" trang chủ đang toast.

### Chính sách (12 trang cùng template)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Sidebar 12 link + active | ✓ không active | ◐ 3 tab | ◐ 3 tab | ✗ | `POLICY_TABS` privacy, terms, returns |
| Mục lục, accordion theo Điều | ◐ 8/12 | ✓ | ✓ | ✗ | |
| Bảng rộng cuộn ngang | ✓ | ✗ | ✗ | ✗ | |
| Quy trình bước (đổi trả 5, khiếu nại 4, trả góp 4) | ✓ | ✗ | ✗ | ✗ | |
| Ngày hiệu lực | ✓ | ✓ | ✓ | ✗ | |
| Bản EN body | ✓ | ✗ | ✗ | ✗ | |
| Tên trang nhất quán | ✗ 4 trang lệch; `/cookie-privacy-policy` lệch tên hiển thị | – | – | – | Lỗi site |

Thiếu: 9/12 trang, bảng rộng, quy trình bước, EN; Figma cả 12.
Cần chốt: khách thống nhất tên trang.

### Danh sách + chi tiết cửa hàng

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Danh sách theo hãng, TTTM + lọc khu vực + bán kính | ✓ 2 chế độ tìm, 5 trang, giao diện EN | ✗ | ✗ | ✗ | |
| Bản đồ + info window | ✓ Magento, ✗ WP | ✗ | ✗ | ✗ | |
| Chi tiết 1 cửa hàng (tên, địa chỉ, SĐT, hãng bán) | ✓ 47 URL riêng | ✗ | ✗ | ✗ | Phản biện thêm; template riêng, nối tự nhiên với pickup checkout |
| Không tìm thấy; từ chối định vị; bản đồ lỗi | ◐ | ✗ | ✗ | ✗ | |

Thiếu: toàn bộ.
Cần chốt: dùng trang WP hay kéo store locator về shop.

### Site ngoài (tuyển dụng, blog, Pre-loved, đặt lịch hẹn)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Rời shop sang site khác cùng tab | ✓ | ✗ | ✗ | ✗ | |
| Pre-loved chỉ EN | ✗ | – | – | – | Lỗi site |
| Đặt lịch hẹn boutique | ◐ bản test | ✗ | ✗ | ✗ | |

Cần chốt: mở tab mới; bỏ mục Pre-loved khỏi PLP demo.

### Trang 404

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| 404 có brand VI, EN | ✓ | ✗ hash lạ về home | ✗ | ✗ | Đã kiểm mã: `RENDER` không có màn 404 |
| Nút về trang chủ, ô tìm, gợi ý | ✗ | ✗ | ✗ | ✗ | |
| 404 sản phẩm hoặc hãng đã gỡ (gợi ý tương tự) | ✓ | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: toàn bộ; chuẩn bắt buộc.

### Trang 503, bảo trì, mất mạng

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Thông điệp hệ thống bận + tải lại | ✗ Varnish thô | ✗ | ✗ | ✗ | |
| Mất mạng phía client (banner ngoại tuyến) | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: toàn bộ.

### Toast, thông báo hệ thống

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Trung tính, thành công | ✓ | ✓ | ✓ | ✓ | |
| Lỗi, cảnh báo | ✓ | ✗ | ✗ | ✓ messages | |
| Có hành động, xếp chồng | ✗ | ✗ | ✗ | ✗ | |
| Vị trí khi có sticky CTA; chữ 2 dòng EN | – | ✗ | ✗ | ✗ | Phản biện thêm |

Thiếu: biến thể lỗi ở code, có hành động, vị trí.

### Đang tải, skeleton, lỗi ảnh

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| Skeleton lưới, trang chủ, PDP | ✗ | ◐ | ◐ | ✗ khung | |
| Skeleton mini cart, giỏ, tài khoản; tải một phần | – | ✗ | ✗ | ✗ | Phản biện thêm |
| Ảnh lỗi fallback | ✗ | ✗ | ✗ | ✗ | |

Cần chốt: có cần trạng thái tải toàn trang trong spec không.

### Email giao dịch (bổ sung)

| Case | Site thật | Mobile | Desktop | Figma | Ghi chú |
|---|---|---|---|---|---|
| 8 mẫu: xác nhận đơn, thanh toán, giao vận, huỷ hoàn, OTP, đặt lại mật khẩu, chào mừng, có hàng lại | ◐ suy ra | ✗ | ✗ | ✗ | Chuẩn ngành; không kiểm được |

Cần chốt: email có nằm trong phạm vi bàn giao không.

### Bảng cài đặt demo (`#settingsPanel`, `#topFab`)

Công cụ của designer, không bàn giao, không đếm vào tổng trang. Chỉ ghi để biết `main.html` và `home.html` có công tắc dev.

## 3. Trang thiếu hoàn toàn

Không có ở mobile, desktop lẫn Figma. Sắp theo mức bắt buộc.

1. Trang 404 có brand. Site có; bắt buộc cho mọi shop, SEO và quảng cáo vẫn trỏ về sản phẩm đã gỡ.
2. Trang 503, bảo trì, mất mạng. Site đang lộ trang Varnish thô nên đáng thiết kế.
3. Thanh toán thất bại, huỷ ở cổng, đơn chờ thanh toán QR, hết phiên. Bắt buộc khi có Payoo, thực tế là 3 đích khác nhau.
4. Trang trung gian sang cổng + màn QR + trang trả về. Không kiểm được nhưng chắc chắn tồn tại khi chọn Payoo, trả góp.
5. Luồng Mua ngay bỏ qua giỏ. Site có CTA đứng trước Thêm vào giỏ; nếu khách giữ 2 CTA thì đây là luồng mua thứ hai.
6. Landing bộ sưu tập, chiến dịch CMS (MCM AW26, Stefano Ricci, D&G Maiolica video). 3 kiểu template; site không có PLP sản phẩm mới nên đây là cách duy nhất site giới thiệu hàng mới.
7. Quà tặng: landing DAFC Gifting 7 khối + form tư vấn doanh nghiệp, PDP phiếu quà (template riêng), gói quà hoặc thiệp.
8. Giới thiệu (about-us): landing không sidebar.
9. Liên hệ: form 6 trường + dropdown 12 dịch vụ + bản đồ + màn cảm ơn.
10. 9/12 trang chính sách: FAQ riêng, giao hàng, trả góp, thanh toán, bảo hành, khiếu nại, dữ liệu cá nhân, quyền và nghĩa vụ, bảo quản. Một template đủ dùng cho cả 12.
11. Danh sách cửa hàng + chi tiết từng cửa hàng (47 URL). Site có 2 trang song song dữ liệu khác nhau; nối với Nhận tại cửa hàng của checkout demo.
12. Landing DAFC Rewards: bảng so sánh 4 hạng + điều khoản 5 mục.
13. Tra cứu đơn khách vãng lai + bản guest của chi tiết đơn, hoá đơn, in đơn.
14. In đơn hàng, hoá đơn, vận đơn, hoàn tiền (chuẩn Magento, có VAT công ty thì cần).
15. Wishlist: trang + nút tim. Site bắt buộc đăng nhập; dự án cố ý bỏ, cần khách xác nhận.
16. PLP Khuyến mãi đúng nghĩa: lọc theo `off` + chip lọc sẵn theo giới, danh mục từ menu.
17. Xác nhận và huỷ đăng ký newsletter từ email; kiểm số dư phiếu quà. Chuẩn ngành, mức thấp.
18. So sánh sản phẩm, đánh giá của tôi, thẻ đã lưu, sản phẩm tải về, tìm kiếm nâng cao. Có thật trên site nhưng mồ côi hoặc đã tắt; đề xuất khách ẩn.
19. Figma: 30/50 hàng chưa có khung nào. Nặng nhất là trang chủ, thanh toán, hoàn tất đơn, chi tiết đơn, 6 view xác thực, 5 tab tài khoản, chính sách, cookie bar, giỏ rỗng, các sheet quà, voucher, `pickSheet`.

## 4. Demo có mà site thật không có

| Hạng mục | Đề nghị |
|---|---|
| Trang cổng 3 ngành `main.html` (site: trang chủ chỉ 2 tile Nữ, Nam) | Hỏi khách; nếu giữ phải đổi đích sang screen home của 2 file chính |
| Trang chủ 10 khối: hero slider, hàng mới về, danh mục, đang giảm giá, nhà mốt, thẻ thương hiệu, FAQ | Giữ (theo brief 6 khối), chờ khách chốt 7 mục mở |
| "Sản phẩm mới" trong mega panel và menu (site: `/new-arrivals.html` 404, Just In về trang chủ) | Hỏi khách: PLP theo ngày tạo hay landing theo mùa |
| Ngành Làm đẹp tách riêng + tab 3 ngành trong drawer (site: Làm đẹp nằm dưới giới) | Hỏi khách |
| Toàn luồng Đặt trước: badge, CTA, ngày giao, dòng trong giỏ, checkout, done, đơn (site không có pre-order, không cọc) | Giữ; đã là luật dự án |
| Nhận thông báo khi có hàng không cần đăng nhập + size chờ hàng | Hỏi khách (Magento cần đăng nhập) |
| Size hết hàng hiện mờ + "Chỉ còn 01" trên PDP (site ẩn size hết) | Giữ |
| Swatch màu trên thẻ đổi ảnh (site: mỗi màu 1 SP) | Hỏi khách; phụ thuộc cách nhập Magento |
| Đổi mật độ lưới 1/2 và 4/3 cột | Giữ |
| Xem thêm 24/lượt + tiến độ (site: phân trang số) | Hỏi khách |
| Trang thương hiệu có hero + dải danh mục con | Giữ (khách đã duyệt) |
| Nhận tại cửa hàng 3 chặng (site không có click & collect) | Hỏi khách |
| Quà theo mốc đơn + tiến độ + sheet đổi quà | Giữ |
| Sheet chọn ưu đãi theo nhóm, tối đa 1 mã/nhóm (site: 3 ô nhập tay) | Giữ |
| Lớp tìm kiếm: lịch sử, từ khoá phổ biến, nổi bật, tab ngành | Giữ lịch sử và phổ biến; tab ngành làm thật hoặc bỏ |
| Bộ lọc: cây 3 tầng, 15 ô màu, size nhóm, độ cao giày, khoảng giá, ô tìm hãng | Giữ (khách đã duyệt); thêm facet Dịp nếu khách giữ |
| Quick add dialog 2 cột + sheet có gallery (site: chỉ panel size) | Giữ |
| PDP: trả góp, khối khuyến mãi, accordion Về thương hiệu, tên màu, sticky CTA | Giữ |
| Quên mật khẩu bằng SĐT + OTP (site dùng email) | Hỏi khách |
| Ưu đãi thành viên dạng radio 4%, dùng điểm | Giữ |
| Toggle Giao hàng, Nhận tại cửa hàng; section checkout tự đóng mở | Giữ |
| Bảng cài đặt demo, công tắc dev | Bỏ khi bàn giao |

## 5. Phát hiện của 3 lượt phản biện

Gộp theo trang, lọc trùng. Mức: cao, vừa, thấp. Ô ma trận bị chứng minh sai đã sửa thẳng ở mục 1 và 2, đánh dấu "Đã kiểm mã" hoặc "Đã kiểm site".

Ô đã sửa (9):

1. Checkout, picker địa chỉ mobile: "không tìm" là sai, `#pickSheet` có ô tìm `#pkSearch`. Vừa.
2. Header, badge giỏ mobile: là con số không phải chấm; số 0 không ẩn ở cả 2 file. Thấp.
3. Chi tiết đơn, dòng pre-order: hạ về ◐ vì 3 đơn seed không có cờ `preorder`. Vừa.
4. Cookie mobile: id là `#cookieGate`, không phải `#cookieBar`. Thấp.
5. Footer, logo thanh toán mobile: đã kiểm, là nhãn chữ như desktop. Thấp.
6. Lớp tìm kiếm, tab ngành desktop: n/a đổi thành ✗ vì code còn sống, mở được qua hash. Thấp.
7. Danh bạ A-Z, cột Figma cấp hàng: ✓ hạ về ◐ vì cái có là menu, không phải trang. Thấp.
8. Thanh toán thất bại, site: route `/checkout/onepage/failure/` đổ về giỏ rỗng, không phải trang riêng. Cao.
9. Liên hệ, captcha: hạ về chưa kiểm; PDP đánh giá: "rỗng" đổi thành "đã tắt". Thấp.

Trang mới hoặc gộp thô (lượt 1):

- Cao: PLP danh mục gộp 4 tầng + beauty; cấp 3 có banner 600x400 và breadcrumb 4 mốc, demo không có; thiếu danh mục Trang sức.
- Cao: luồng Mua ngay chưa có hàng nào.
- Cao: trang trung gian sang cổng + màn QR + trang trả về chưa có hàng.
- Vừa: chi tiết cửa hàng là template riêng (47 URL); trang danh sách có 2 chế độ tìm chưa ghi.
- Vừa: PDP phiếu quà là template riêng; landing quà có form tư vấn doanh nghiệp.
- Vừa: chi tiết đơn gộp order, invoice, shipment, print; guest có bản tương ứng.
- Vừa: tài khoản gộp 4 route; thiếu xoá tài khoản (Nghị định 13).
- Vừa: huỷ đơn khi Chờ xác nhận và đổi trả tự phục vụ chưa có case; site không có RMA.
- Vừa: site không có PLP Sản phẩm mới (`/new-arrivals.html` 404).
- Vừa: facet Dịp và Giới tính có thật trên site, ma trận chưa nhắc.
- Vừa: 404 cần tách ngữ cảnh sản phẩm ngừng bán.
- Thấp: kiểm số dư phiếu quà; so sánh sản phẩm là trang mở nhưng mồ côi; tìm kiếm nâng cao là 2 trang riêng lộ nhãn kỹ thuật; newsletter confirm và unsubscribe; email chào mừng; bộ email giao dịch; Rewards có điều khoản 5 mục; footer EN có "Careers"; sitemap.xml và sitemap_vn/en.xml đều 404 (lỗi SEO cho khách dọn).

Case thiếu theo bộ trạng thái chuẩn (lượt 2, khoảng 60 case, đã ghi vào bảng từng trang với chú "Phản biện thêm"):

- Cao (14): tìm kiếm mở chưa có lịch sử; trang chủ thẻ không logo và ô thiếu ảnh KV; PLP tên 2 dòng và giá 9-10 chữ số; PLP trang cuối không dòng kết; quick add Onesize; PDP gallery 1 vs 8+ ảnh; PDP tên dài + giá dài + chip cùng hàng; giỏ tick 0 và tick một phần; checkout đang xử lý và thất bại server; sổ địa chỉ validate lỗi.
- Vừa: header EN dài, mega panel ít hoặc nhiều mục; drawer dài cuộn; footer với sticky CTA; gợi ý tìm kiếm lỗi tải, khớp danh mục không khớp SP; trang chủ hero 1 slide và dải ít; PLP 1-3 SP, chip lọc 8+, ảnh lỗi, sắp hết, xem thêm lỗi, swatch 5+; thương hiệu mô tả mở, dải con ngắn hoặc dài; tìm kiếm gợi ý chính tả, tiêu đề dài; bộ lọc ô tìm không khớp, facet dài, facet theo ngữ cảnh; quick add mọi size hết, 9 bậc; PDP dung tích beauty, CTA loading, sản phẩm đã gỡ; bảng size rộng và rỗng; mini cart 8+ món; giỏ hỗn hợp đặt trước, đang cập nhật, 10+ món; ưu đãi chưa đăng nhập, danh sách rỗng; checkout sổ địa chỉ rỗng, tóm tắt 8+ món, đơn toàn đặt trước; hết phiên tách khỏi cổng lỗi; đăng nhập loading và "Phiên hết hạn"; tài khoản không avatar, đang lưu; đơn hàng nhiều món, đặt trước; chi tiết đơn pickup; Rewards hạng cao nhất, sắp rớt hạng; 404 sản phẩm; mất mạng client; toast với sticky CTA; i18n EN chỉ có ở 3 hàng.
- Thấp: mega menu bằng bàn phím; menu-row 2 dòng; promo 1 slide; cookie chồng lớp; bộ lọc đang đếm; quick add loading; PDP rail rỗng; nhận thông báo đang gửi, trùng; ưu đãi đang kiểm mã; pickup chưa chọn cửa hàng; OTP hết lượt; giao một phần; store locator từ chối định vị; skeleton mini cart; tablet 768-1199 chưa có chủ; hover, focus, pressed giữ ở cấp component.

Ô đã kiểm và xác nhận đúng (lượt 3): khoảng 45 ô ở nhóm giỏ, thanh toán, tài khoản, điều hướng, sản phẩm, xác thực, hệ thống. Điểm đáng nhớ: thanh toán thất bại ✗ (chỉ có chuỗi trong comment); mobile thêm giỏ chỉ `cartQty++` không `CART.push`; `placeOrder` không validate ô nào ngoài pickup; login luôn thành công; OTP chỉ kiểm đủ 6 số; `go()` không kiểm `ckAuth`; sticky CTA desktop là code chết (JS tham chiếu, markup 0); `OOS_MODE` chỉ size 43/44; `FOOTER_ROUTES` 3 key; `POLICY_TABS` 3 trang; hash lạ về `home`, không có màn 404. Sort "Phù hợp nhất" có thật nhưng dùng chung mọi PLP (đã ghi ◐).

## 6. Việc cần user chốt

Chỉ quyết định thiết kế hoặc của khách, không phải việc kỹ thuật.

1. Phạm vi trang nội dung: về DAFC, liên hệ, FAQ, 12 chính sách, cửa hàng (WP hay shop), landing chiến dịch, quà tặng. Làm bao nhiêu trong đó.
2. Wishlist, so sánh, đánh giá: bỏ hẳn hay giữ. Site có wishlist bắt buộc đăng nhập; review đã tắt.
3. 10 câu hỏi BRIEF-GAP còn mở: tỉ lệ ảnh, CTA in hoa, giỏ và checkout 1 hay 2 màn (04), mini cart thay giỏ đến đâu (06), kích hoạt quick add mobile (07), attribute size Magento, highlight brand page, đặt cọc pre-order (10), 2 CTA Mua ngay + Thêm giỏ.
4. Định danh quên mật khẩu: email (site) hay SĐT + OTP (demo).
5. Phân trang số (site) hay Xem thêm (demo).
6. "Sản phẩm mới": PLP lọc theo ngày tạo hay landing CMS; mega panel Khuyến mãi + PLP sale lọc thật.
7. Cấu trúc ngành: Làm đẹp là ngành riêng (demo) hay nằm dưới giới (site); có mục Trang sức; trang cổng 3 ngành giữ hay bỏ; trang chủ riêng theo ngành hay một trang.
8. Facet: giữ hay bỏ Dịp và Giới tính; thứ tự facet; khoảng giá 4 mức theo sheet Price; facet tìm kiếm có Màu.
9. Địa giới 2 cấp (demo) hay 3 cấp (Magento thật) ở checkout và sổ địa chỉ.
10. Hành động trong đơn hàng: huỷ khi Chờ xác nhận, đổi trả online, tra cứu đơn khách vãng lai, in hoá đơn.
11. Newsletter: nằm footer hay section trang chủ; 1 ô hay 2 ô (email + SĐT).
12. Lối "Tất cả <danh mục>" trong drawer; Pre-loved và site ngoài mở tab mới.
13. Trang đăng xuất riêng hay toast; cookie demo có nhớ lựa chọn không; skeleton toàn trang có trong spec không; email giao dịch có trong phạm vi không; tablet 768-1199 theo khuôn nào.
14. Khách dọn dữ liệu site trước khi vào spec: hotline 19002666 và 19002688, giờ làm việc, tên 4 trang chính sách lệch, chuỗi Anh lọt bản VI, sitemap 404, `/contact/` placeholder.

## 7. Cách đọc & nguồn

- Ma trận dựng từ 6 lượt quét site thật ngày 05/09/2026 (curl, WebFetch, chỉ đọc, không đăng nhập, không gửi form). Mọi trạng thái sau đăng nhập hoặc sau đặt hàng của site ghi ◐ "suy ra" theo chuẩn Magento 2. Lượt phản biện 1 kiểm thêm 27 URL ngày 06/09 (giờ máy chủ).
- Cột Mobile và Desktop kiểm kê bằng grep và đọc dòng trong `index.html` và `desktop.html`. Ô ✓ chỉ ghi khi có dòng mã; chỗ chỉ có README hoặc memory ghi ◐. Ba fork skin (neutral, editorial, atelier) đóng băng 21/08 không tính.
- Cột Figma đọc từ tư liệu Figma file Test agent và các báo cáo FIGMA-*.md; ô ◐ "chưa kiểm" là chưa mở node để xác nhận.
- Khách đã duyệt 4 trang Figma (PLP, Thương hiệu, Tìm kiếm, Bộ lọc); 22 trang còn lại chưa.
- Giới hạn: không kiểm được trang trung gian cổng, email, các route 302 về login, nội dung body 404 của site (server trả 404 không body), robots và sitemap đều 404 nên không có danh sách URL chính thức. Số case là số hàng trong bảng, không phải số khung Figma cần vẽ (một case có thể cần 2 khổ).
- File này chỉ đọc mã và site, không sửa file nào khác trong `D:\doc`.
