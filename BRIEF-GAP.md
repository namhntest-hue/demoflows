# BRIEF-GAP — Đối chiếu brief UI/UX của khách với demo · 14/08/2026

Nguồn: `UI UX Briefing - Designer.pdf` (22 trang, khách gửi 14/08/2026)
Đối chiếu với: `index.html` (mobile) + `desktop.html` — trạng thái ngày 14/08/2026

**97 điểm yêu cầu — 33 đạt · 23 lệch · 40 thiếu · 1 cần chốt**

| Nhóm | Tổng | Thiếu | Lệch | Đã đạt | Cần chốt |
|---|---:|---:|---:|---:|---:|
| 1. Overview (tr. 1) | 10 | 1 | 4 | 5 | 0 |
| 2. Guideline ảnh sản phẩm (tr. 2) | 3 | 0 | 1 | 1 | 1 |
| 3. Listing (tr. 3–8) | 22 | 8 | 5 | 9 | 0 |
| 4. Filter (tr. 9–10) | 10 | 4 | 3 | 3 | 0 |
| 5. PDP (tr. 11–13) | 17 | 6 | 3 | 8 | 0 |
| 6. Pre-order (tr. 14–15) | 9 | 6 | 1 | 2 | 0 |
| 7. Cart & Checkout (tr. 16–22) | 26 | 15 | 6 | 5 | 0 |
| **Tổng** | **97** | **40** | **23** | **33** | **1** |

Ký hiệu: **[Thiếu]** chưa có gì trong demo · **[Lệch]** có nhưng phải sửa, không phải thêm · **[Đạt]** giữ nguyên · **[Chốt]** chờ khách trả lời.

---

## 1. Overview (tr. 1)

Nhóm này phần lớn đã đạt vì dự án vốn đi theo hướng đó. Hai chỗ hở: hệ màu thay thế và trạng thái focus.

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Đạt]** | Hạn chế chữ in hoa, nhất là trên mobile | Dự án đã có quy ước cấm UPPERCASE, chỉ chừa wordmark thương hiệu. **Nhưng chính brief lại viết CTA "ĐẶT HÀNG" in hoa ở tr. 19–21** — xem câu hỏi 03. |
| **[Đạt]** | Phân cấp typography (Heading / Subheading / Body / CTA) | Thang chữ chạy từ token Figma, đã bỏ các cỡ lẻ. |
| **[Lệch]** | Tăng tương phản, hạn chế xám nhạt khó đọc | Chữ phụ dùng `#737373` trên nền trắng = tỉ lệ 4.74:1 — vừa đủ chuẩn AA cho chữ thường, nhưng đang dùng ở cỡ **12px** tại giá gốc gạch ngang, dòng phân loại, caption. Cần rà lại từng chỗ 12px. |
| **[Thiếu]** | Đề xuất phương án màu ngoài Grey-Gold hiện tại | Demo mới có **một** bộ token duy nhất. Đây là hạng mục thiết kế độc lập, không phải sửa code — cần dựng 2–3 hướng màu để khách chọn. |
| **[Đạt]** | Bố cục thoáng, dùng khoảng trắng hợp lý | Layout hiện đã theo hướng này. |
| **[Đạt]** | Định hướng Luxury · Clean · Elegant · Modern · Product-focused | Khớp hướng đang làm; đánh giá lại sau khi có phương án màu mới. |
| **[Lệch]** | Mọi thành phần tương tác có đủ Hover, Active, Selected, Focused, Pressed | Có `.press`, `:active`, `:hover` và trạng thái selected. Nhưng `outline:none` xuất hiện ~20 lần trong khi chỉ có **3–4 rule `:focus-visible`** — thao tác bằng bàn phím gần như không thấy focus ở đâu. |
| **[Lệch]** | Thống nhất hành vi tương tác trên toàn website | `AUDIT.md` còn ~65 mục chưa xử lý, nhiều mục là lệch hành vi giữa 2 lối vào cùng một chức năng (thêm giỏ từ PDP dropdown không bắt chọn size, từ PLP thì bắt). |
| **[Lệch]** | Visual cue cho trạng thái hiện tại (underline, active, highlight, indicator) | Có ở menu và tab; còn thiếu ở bước checkout và bộ lọc đang áp dụng trên mobile. |
| **[Đạt]** | Mobile first | `index.html` là bản mobile gốc, `desktop.html` là bản fork — đúng thứ tự brief muốn. |

---

## 2. Guideline ảnh sản phẩm (tr. 2)

Ba dòng ngắn nhưng có một mâu thuẫn số học cần khách xác nhận trước khi động vào asset.

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Lệch]** | Nền ảnh xám nhạt `#f1f1f1` | Mọi khung ảnh trong demo đang dùng `#f5f5f5`. Thang xám dự án hiện là `#fff → #fafafa → #f5f5f5 → #e5e5e5`, nên `#f1f1f1` là **một bậc token mới** chen vào giữa. Xem câu hỏi 02. |
| **[Đạt]** | Kích thước ảnh 1200×1484 | Toàn bộ ảnh bản mobile là ảnh thật từ CDN DAFC, đúng cỡ này. |
| **[Chốt]** | Tỉ lệ crop 3:4 | **1200×1484 không phải 3:4** (3:4 sẽ là 1200×1600). Khung trong demo để 0.75 nên `object-cover` đang cắt mất ~7% hai bên ở **mọi** khung ảnh. Xem câu hỏi 01. |

---

## 3. Listing (tr. 3–8)

Nhóm nặng nhất về mặt component: thẻ sản phẩm hiện chỉ có một ảnh tĩnh, trong khi brief muốn nó mang thêm size, slider ảnh và tên bộ sưu tập.

### 3.1 Listing & Variants (tr. 4–5)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Thiếu]** | Size option ngay trên thẻ sản phẩm — tối đa 15 ô, chia 3 hàng | Thẻ sản phẩm hiện không có size ở bất kỳ đâu. |
| **[Đạt]** | Color option trên thẻ (ref Hugo Boss), có đếm `+N` khi tràn | Đã có swatch + `moreColors`. |
| **[Lệch]** | Chip màu ở listing dùng **ảnh cắt từ sản phẩm** (tr. 10) | Thẻ PLP đang dùng chấm tròn màu hex. Ảnh cắt mới chỉ dùng ở quick add và PDP. |
| **[Thiếu]** | Slider ảnh sản phẩm trên mobile — tối đa 9 ảnh | Thẻ chỉ có 1 ảnh, không vuốt được. |
| **[Thiếu]** | Hover / slider ảnh trên desktop | Không có rule đổi ảnh khi hover trong `desktop.html`. |
| **[Thiếu]** | Giới hạn độ dài tên: avg VIE-35 / ENG-32, min VIE-14 / ENG-12, max 50 | Đang cắt bằng CSS `truncate` 1 dòng theo bề rộng, không theo số ký tự — nên không đảm bảo "hiện đủ short product type". |
| **[Đạt]** | Tag "New season" | Có, nhưng đang gắn cứng vào đúng 1 thẻ để demo. |
| **[Đạt]** | Tag "% markdown" | Badge `-30%` chạy theo dữ liệu sản phẩm. |
| **[Thiếu]** | Tag "Buy more save more" | Chương trình có trong danh sách khuyến mãi nhưng chưa hiện thành tag trên thẻ. |
| **[Thiếu]** | "New collection name" hiện dưới giá | Không có chỗ nào trên thẻ mang tên bộ sưu tập. |
| **[Lệch]** | Chip bộ lọc đang áp dụng — 1 dòng, vuốt xem hết trên mobile | Desktop đã có chip "đang áp dụng"; **mobile chưa có**. |
| **[Đạt]** | Breadcrumb | Có ở PLP brand, category và search. |

### 3.2 Quick view & quick a2c (tr. 6)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Đạt]** | Quick a2c mobile: color option, size available, slider ảnh | Bottom sheet `#quickAddSheet` đủ cả 3. |
| **[Thiếu]** | Quick a2c: hiện ưu đãi đang có của sản phẩm (optional) | Sheet chưa mang khối khuyến mãi nào. |
| **[Thiếu]** | Quick view trên desktop (để đồng nhất với mobile) | Không tồn tại quick view ở cả 2 bản — desktop đang dùng lại đúng sheet quick add của mobile. |

### 3.3 Filter & sorting & grid (tr. 7)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Lệch]** | Filter desktop nằm **bên trái**, click thì đẩy sản phẩm sang phải | Desktop đang dùng drawer trượt ngang có backdrop đè lên trang, không phải cột trái đẩy lưới. Đổi cái này là đổi layout PLP desktop, không phải dời vị trí. |
| **[Đạt]** | Grid option — đổi số cột ở cả desktop & mobile | Nút đổi 1/2 cột đã chạy. |
| **[Đạt]** | Sorting nằm cạnh phần grid | Dropdown 5 lựa chọn, đổi là render lại lưới thật. |

### 3.4 Listing by brand page (tr. 8)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Lệch]** | Banner dạng slider nhiều ảnh | Hiện là **1 ảnh tĩnh** 390×217. |
| **[Đạt]** | Logo thương hiệu | Có. |
| **[Đạt]** | Mô tả có thu gọn / mở rộng | Có nút "Xem thêm". |
| **[Lệch]** | Highlight 4–5 blocks | Đang là **6 thẻ danh mục** (Quần áo, Giày dép, Túi xách…). Ref Farfetch trong brief là highlight theo **dòng sản phẩm** (Pivot, Gianni, Tote bags, Fashion jewellery, Beachwear) — khác cả nội dung lẫn số lượng. |

---

## 4. Filter (tr. 9–10)

Bộ lọc đã lọc thật ở cả 2 bản, nhưng cấu trúc còn cách brief khá xa — đặc biệt phần size.

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Lệch]** | Thứ tự `CATEGORY › BRAND › SIZE › COLOR › PRICE › PROMO` | Hiện là Danh mục › Thương hiệu › **Màu sắc › Kích thước** › Khoảng giá › Khác. **Size và Color đang đảo chỗ**; nhóm Promo mới chỉ có ở PLP Làm đẹp. |
| **[Thiếu]** | Ô tìm kiếm trong bộ lọc thương hiệu | Danh sách 25 brand đổ phẳng, không có search. |
| **[Thiếu]** | Thương hiệu sắp xếp A–Z (có chỉ mục chữ cái) | Chưa nhóm theo chữ cái. |
| **[Lệch]** | Lọc theo giá / Sale & Non-sale | Có khoảng giá (nhưng thanh trượt là **span tĩnh, kéo không được**). Sale/Non-sale đang nằm rải ở nhóm "Khác" và "Ưu đãi", chưa gom về nhóm giá như brief. |
| **[Đạt]** | Lọc theo màu bằng color swatch, hệ màu group sẵn | 7 màu đã gom nhóm, chọn nhiều được. |
| **[Thiếu]** | Size chia group: Clothing (Alpha XS–XXXL) · Footwear (EU / UK / US / JP) · Others (Belts, Hats, Rings, Bracelets) | Danh sách size hiện chỉ là số `39`–`55`, không có group, không đổi được hệ size. Mục này **phụ thuộc data Magento** (attribute group size), không làm được bằng thiết kế đơn thuần. |
| **[Lệch]** | Chưa chọn category → show toàn bộ filter; đã chọn → chỉ show filter liên quan | Mới chỉ đổi facet giữa **Thời trang** và **Làm đẹp**, chưa đổi theo từng category lá. |
| **[Thiếu]** | Filter riêng theo ngành: Shoes → heel height, Bags → luggage | Không có facet nào như vậy. |
| **[Đạt]** | Category › Sub cate › Product type (3 tầng) | Cây danh mục 3 tầng có rail, tick cha–con đồng bộ. |
| **[Đạt]** | Color swatch ở filter là hệ màu do product team group | Đúng cách làm hiện tại. |

---

## 5. Product Detail Page (tr. 11–13)

Khung PDP đã gần đủ. Thiếu tập trung ở phần đầu buy box (collection name, SKU, label, payment block) và ở CTA thứ hai.

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Đạt]** | Product media gallery | Gallery + lightbox, ảnh thật theo từng SKU. |
| **[Đạt]** | Header: Brand · Product name · Sale price / Original price / % MD | Đủ 3 trạng thái giá. |
| **[Thiếu]** | Header: SKU | SKU thật **đã có sẵn trong dữ liệu** (`PRODUCT_INFO.sku`) nhưng chưa có chỗ hiển thị ở PDP nào. |
| **[Thiếu]** | Header: Label | Chưa có khối label ở đầu buy box. |
| **[Thiếu]** | Collection name (dòng đầu buy box) | Buy box mở đầu bằng Brand, không có tên bộ sưu tập. |
| **[Thiếu]** | Block Payment offer (tr. 16) | Từng có logic `payOffer` nhưng **đã bị gỡ khỏi cả 6 PDP**. Nay chỉ còn dòng "Thanh toán linh hoạt" ở khối cam kết chung, không phải payment block cấp sản phẩm. |
| **[Đạt]** | Block CTKM — bullet point, có mũi tên rút gọn | Mỗi chương trình 1 card, mở rộng tại chỗ. |
| **[Đạt]** | Variant options (màu / size) | Có cả kiểu chip và kiểu dropdown. |
| **[Đạt]** | Size Guide | Nhãn "Bảng kích thước" thống nhất ở cả 6 PDP, mở sheet nội dung thật. |
| **[Đạt]** | Lưới size full-width | Grid 5 cột, rộng hết khung. |
| **[Lệch]** | **2 CTA** — (Add to cart hoặc Pre-order) **&** Checkout, full-width, tương phản cao | Chỉ có **1 CTA**. Thiếu hẳn nút thứ hai (Checkout / Mua ngay) mà brief nhấn là "phần tử nổi bật nhất màn hình". |
| **[Thiếu]** | Tag "Buy more save more" / "New season" ở vị trí \*Highly Rated | PDP không có tag nào ở vị trí trên tên sản phẩm. |
| **[Đạt]** | Info tabs: Description · Product care · Exchange Policy · About brand | Đủ 4 tab, dạng accordion, nội dung thật từ DAFC. |
| **[Lệch]** | Gợi ý mix & match | Có rail "Gợi ý mua kèm" nhưng là danh sách sản phẩm rời, chưa phải module phối đồ theo ref. |
| **[Đạt]** | Sản phẩm tương tự | Rail riêng ở cả 6 PDP. |
| **[Thiếu]** | Sản phẩm đã xem gần đây | Chỉ có key dịch `'Đã xem gần đây'` trong từ điển, **không có rail nào được dựng**. |
| **[Lệch]** | Product status (available size / out of stock / selected) tương phản cao | Luồng hết hàng 2 tầng chỉ chạy đúng ở PDP dạng chip. PDP dạng dropdown **mất tầng "Tạm hết hàng"** — cùng size 43, chip báo hết hẳn còn dropdown lại mời đăng ký nhận thông báo. |

---

## 6. Pre-order (tr. 14–15)

Nhóm hở nhiều nhất so với độ ngắn của brief: mới có vỏ CTA và notify, chưa có phần cọc và chưa nối xuống giỏ.

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Đạt]** | PDP — CTA "Pre-order" | Nút "Đặt trước" đã có ở PDP v1. |
| **[Lệch]** | PDP — "Shipping est by DD/MM/YY", nội dung **chỉnh được ở BE** | Đang gắn cứng "Dự kiến giao hàng vào ngày **15/08/2026**". Demo cho khách sau ngày đó sẽ hiện ngày quá khứ. |
| **[Thiếu]** | PDP — note dưới giá ở giỏ/checkout: "For Deposit" | Không có chữ "cọc" hay "deposit" ở bất kỳ đâu trong 2 file. |
| **[Thiếu]** | PDP — claim note cho quy định đổi trả & yêu cầu đặt cọc | Chưa có. Nội dung chính sách cọc cũng chưa có trong brief — xem câu hỏi 10. |
| **[Thiếu]** | PLP — CTA "Add to cart" đổi thành "Pre-order" | Quick add ở PLP luôn là "Thêm vào giỏ hàng", không đổi theo trạng thái pre-order. |
| **[Thiếu]** | PLP — dòng info "Expected to be In stock – [DD/MM – DD/MM]" | Không có. |
| **[Đạt]** | "Notify me" + popup đăng ký | `#notifySheet` có 2 field và trạng thái lỗi. |
| **[Thiếu]** | Mail confirm sau khi khách submit form notify | Chỉ có toast xác nhận, chưa mô phỏng email. |
| **[Thiếu]** | Cart — info shipment status cho hàng pre-order | Bấm "Đặt trước" xong sheet vẫn báo "Đã thêm vào giỏ hàng"; xuống giỏ và checkout **không còn dấu vết nào** phân biệt hàng đặt trước với hàng thường. |

---

## 7. Cart & Checkout (tr. 16–22)

Nhóm nhiều việc nhất. Mini cart chưa tồn tại, thanh tiến trình chưa có, và các khối coupon / điểm thưởng đang nằm sai màn so với brief.

### 7.1 Confirmation popup (tr. 17)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Đạt]** | Popup xác nhận đã thêm vào giỏ (tên SP + "Đã được thêm thành công") | `#cartConfirm` có đủ tên, ảnh, biến thể, giá. |
| **[Lệch]** | Dùng bản **dạng chữ** — brief ghi rõ "prefer hơn vì đã có mini cart nên không cần kéo hình ảnh" | Demo đang làm đúng bản **không** được ưu tiên: bottom sheet có ảnh sản phẩm. |
| **[Thiếu]** | Tự ẩn sau 5 giây | Không có timeout nào — sheet chỉ đóng khi bấm. |
| **[Thiếu]** | "Xem giỏ hàng" mở **Mini Cart** | Hiện điều hướng thẳng sang màn Giỏ hàng đầy đủ. |

### 7.2 Mini cart (tr. 18)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Thiếu]** | **Mini Cart trượt ra từ bên phải** | Chưa tồn tại. Hàm `miniCart()` có trong `index.html:1120` nhưng **không ai gọi**; `desktop.html` đã xoá hẳn từ 12/08/2026 vì là code chết. |
| **[Thiếu]** | Trong mini cart: xoá sản phẩm, đổi số lượng, đổi size, đổi màu | Đổi size/màu ngay trong mini cart là phần nặng nhất — cần picker biến thể chạy ngoài PDP. |
| **[Thiếu]** | Trong mini cart: tổng giá gốc − giảm giá − tổng cuối | Logic tính tiền đã có sẵn ở màn giỏ, chỉ thiếu nơi hiển thị. |
| **[Thiếu]** | Trong mini cart: Add Promotion + tiêu điểm thành viên | Hai khối này hiện chỉ có ở màn Giỏ hàng. |

> **Cập nhật 28/08/2026 — `desktop.html` đã có mini cart (một phần).** Lệnh user: tấm sau khi
> thêm giỏ đổi vai thành **tóm tắt giỏ hàng**, và **rê chuột vào icon giỏ cũng mở đúng tấm đó**.
> Nay đạt: liệt kê đủ dòng trong giỏ (món vừa thêm đứng đầu, số lượng cộng dồn khi trùng biến
> thể) · **Tạm tính** · **một** nút "Đi đến giỏ hàng" · ✕ đóng · tự rút sau 5s khi vừa thêm ·
> mở bằng hover. Kèm theo, "thêm vào giỏ" từ nay **ghi thật vào `CART`** nên giỏ · thanh toán ·
> mốc quà tặng tự khớp — trước đó chỉ tăng chấm đếm.
> Còn thiếu so với brief tr. 18: trượt ra từ **bên phải** (đang là dropdown neo vào icon —
> hướng đã chốt 19/08) · xoá / đổi số lượng / đổi size / đổi màu **trong** mini cart · dòng
> giảm giá và tổng cuối (đang chỉ có Tạm tính) · Add Promotion + tiêu điểm thành viên.
> Phạm vi: **chỉ `desktop.html`**. 3 bản thử skin (`desktop-neutral` · `desktop-editorial` ·
> `desktop-atelier`) vẫn dùng popup "Đã thêm vào giỏ hàng" **giữa màn** — chúng cũng chưa từng
> nhận bản dropdown 19/08, nên port là 2 đợt chồng nhau, chờ lệnh.

### 7.3 Cart overview & checkout (tr. 19–22)

| | Yêu cầu | Hiện trạng |
|---|---|---|
| **[Thiếu]** | Progress bar `Shopping bag › Information › Shipping › Payment` | Không có ở cả 2 bản. |
| **[Thiếu]** | Bấm breadcrumb → tự scroll và xổ ra phần thông tin tương ứng (tr. 22) | Phụ thuộc mục trên. |
| **[Đạt]** | Mobile: các mục thu gọn / mở rộng dạng accordion | Checkout mobile đã là accordion 3 bước với trạng thái đang mở / đã xong / chờ. |
| **[Đạt]** | Desktop: two-column layout (trái thông tin — phải tóm tắt đơn) | Đã có. |
| **[Đạt]** | Desktop: sticky Order Summary | Đã có. |
| **[Thiếu]** | Mobile: sticky Total + nút "ĐẶT HÀNG" luôn hiện ở đáy | Nút đặt hàng nằm trong luồng, cuộn là trôi đi. |
| **[Lệch]** | Coupon box trong checkout | Ô mã giảm giá và phiếu mua hàng chỉ có ở **màn Giỏ hàng**; màn Thanh toán không có. Brief xếp coupon nằm trong danh sách của checkout. |
| **[Lệch]** | Điểm thưởng khả dụng + điểm dự kiến nhận sau khi hoàn tất | Cùng vấn đề: đang ở màn Giỏ hàng, không ở checkout. |
| **[Thiếu]** | Promotion information (CTKM) trong checkout | Checkout không có khối khuyến mãi nào. |
| **[Lệch]** | Contact information + **auto-fill** thông tin khách | Có form; chưa có auto-fill từ tài khoản hoặc đơn gần nhất. |
| **[Lệch]** | Shipping method + **search bar tìm địa chỉ** cho khách mới | Có picker Tỉnh / Phường 2 cấp, chưa có ô tìm kiếm trong picker. |
| **[Thiếu]** | Payment: hỗ trợ Apple Pay / Google Pay / ví điện tử | Mới có Thẻ tín dụng, QR, ATM, Trả góp 0%. Ví MoMo chỉ xuất hiện trong dữ liệu một đơn hàng cũ, không phải lựa chọn thanh toán. |
| **[Thiếu]** | Inline validation — báo lỗi ngay khi khách nhập | Hầu hết form chưa validate: đăng nhập bỏ trống vẫn vào được, OTP nhập mã nào cũng qua, địa chỉ không kiểm tra. |
| **[Đạt]** | Shipping ETA theo từng phương thức | Có dòng thời gian nhận hàng dự kiến. |
| **[Thiếu]** | Cross-sell "You may also like" (2–4 SP) trước CTA thanh toán | Checkout không có rail gợi ý nào. |
| **[Thiếu]** | Save Cart — giữ giỏ khi khách thoát giữa chừng | Dự án **cố ý không dùng** `localStorage`, nên đây là quyết định kiến trúc cần đảo lại chứ không phải thêm tính năng. |
| **[Thiếu]** | Desktop: nút lưu thông tin giao nhận cho các đơn sau | Chỉ có key dịch "Lưu địa chỉ", chưa có control. |
| **[Lệch]** | Desktop: secure checkout & support information | Nội dung chính sách và hotline có ở footer / trang tĩnh, nhưng chưa có khối tin cậy đặt ngay trong checkout. |

---

## Cần chốt lại với khách — 10 mục

Mười điểm này nên hỏi **trước khi** bắt tay, vì mỗi cái đều làm đổi phạm vi công việc chứ không chỉ đổi chi tiết.

**01. Tỉ lệ ảnh: 1200×1484 hay 3:4?** *(tr. 2)*
Brief ghi cả hai nhưng chúng mâu thuẫn: 1200×1484 = 0.809, còn 3:4 = 0.750 (tức 1200×1600). Chọn hướng nào cũng có giá của nó — giữ 1200×1484 thì phải đổi **mọi khung ảnh** trong demo sang tỉ lệ đó (thẻ PLP cao thêm ~11%, gallery PDP 520px → 482px); giữ 3:4 thì studio phải xuất lại toàn bộ ảnh. Nếu không chốt, tình trạng hiện tại vẫn là ảnh 0.809 nhét vào khung 0.750, tức **cắt mất ~7% hai bên ở mọi ảnh sản phẩm**.

**02. Nền `#f1f1f1` là màu của file ảnh hay của khung web?** *(tr. 2)*
Nếu là màu nền do studio chụp/xuất ra trong file ảnh thì web không cần làm gì. Nếu là màu khung trên web thì phải thêm **một bậc token mới** vào thang xám (hiện là `#fff → #fafafa → #f5f5f5 → #e5e5e5`, `#f1f1f1` chen vào giữa hai bậc cuối) — kéo theo phải rà lại mọi chỗ đang dùng `#f5f5f5` để biết chỗ nào đổi, chỗ nào giữ.

**03. Chữ in hoa: CTA có được miễn trừ không?** *(tr. 1 vs 19–21)*
Trang 1 yêu cầu hạn chế uppercase, nhưng trang 19, 20 và 21 đều viết CTA là **"ĐẶT HÀNG"** in hoa. Cần một câu trả lời dứt khoát vì nó áp cho toàn bộ nút chính của site.

**04. Giỏ hàng và Thanh toán là 1 màn hay 2?** *(tr. 19–21)*
Brief nói "thu gọn overview trên 1 màn, càng ít bước càng tốt" và xếp Shopping bag, Coupon, Điểm thưởng, Contact, Shipping, Payment vào **cùng một danh sách**. Demo hiện tách làm 2 màn riêng. Nếu gộp thì đây không phải bổ sung mà là **dựng lại cả hai màn** — nên xác nhận sớm.

**05. Bản brief cart nào là bản chốt: HUY hay KHÔI?** *(tr. 19 vs 20–21)*
Hai bản mô tả cùng một màn nhưng khác nhau: bản Khôi thêm Apple Pay/Google Pay, Save Cart, Cross-sell, Sticky Total; bản Huy tách riêng mục "Ưu đãi đang có". Làm theo cả hai là làm thừa; làm theo một bản mà chọn nhầm là làm lại.

**06. Mini cart thay thế màn Giỏ hàng đến đâu?** *(tr. 17–18)*
Brief chọn confirmation dạng chữ **vì** "đã có mini cart", nghĩa là mini cart mới là nơi khách review giỏ. Cần chốt luồng: thêm giỏ → toast chữ 5s → "Xem giỏ hàng" → **mini cart** (chứ không phải màn Giỏ hàng đầy đủ). Và khi đó màn Giỏ hàng đầy đủ còn dùng để làm gì.

**07. Size trên thẻ listing kích hoạt bằng gì trên mobile?** *(tr. 4)*
Ref trang 4 cho thấy lưới size hiện đè lên ảnh khi **hover**. Mobile không có hover — cần biết khách muốn size hiện thường trực, hiện khi chạm, hay chỉ có trong quick a2c.

**08. Magento đang có sẵn attribute group size nào?** *(tr. 10)*
Yêu cầu chia size theo Clothing (Alpha) / Footwear (EU, UK, US, JP) / Others phụ thuộc hoàn toàn vào data. Vẽ ra bộ lọc mà BE không đổ được dữ liệu thì thiết kế thành vô dụng — nên hỏi IT trước khi vẽ.

**09. Highlight blocks ở brand page lấy nội dung gì?** *(tr. 8)*
Ref Farfetch dùng **dòng sản phẩm** (Pivot, Gianni, Tote bags…), còn demo đang dùng **danh mục** (Quần áo, Giày dép…). Câu trả lời quyết định phải chuẩn bị bộ ảnh nào và ai cung cấp.

**10. Chính sách đặt cọc pre-order là gì?** *(tr. 14)*
Brief yêu cầu note "For Deposit" và "claim note cho quy định đổi trả và yêu cầu đặt cọc", nhưng **không nói % cọc, điều kiện hoàn cọc, hay hiển thị ở những đâu**. Không có mấy con số này thì không viết được nội dung cho PDP, giỏ, checkout và email.

---

## Lưu ý triển khai — 8 mục

Không phải yêu cầu của brief, mà là những gì sẽ cắn vào tiến độ nếu làm theo thứ tự sai.

**1. Làm lại thẻ sản phẩm trước, mọi thứ khác sau.**
Brief muốn thẻ mang thêm slider ảnh (mobile ≤9), hover desktop, lưới size, tên bộ sưu tập và tag buy-more-save-more — cộng lại là **viết lại gần như từ đầu**. Mà `productCard()` đang dùng chung cho lưới PLP và mọi rail gợi ý ở PDP. Sửa muộn thì phải sửa lại tất cả các màn đã dựng theo nó.

**2. Mini cart là hạng mục nặng nhất còn thiếu.**
Nó không chỉ là một drawer. Yêu cầu "đổi size, đổi màu ngay trong mini cart" nghĩa là phải có logic đổi biến thể chạy **ngoài PDP**, cộng tính tiền 3 dòng, cộng khối promotion và điểm thưởng. Nên ước lượng riêng, đừng gộp vào phần "cart".

**3. Ngày pre-order sắp hết hạn.**
PDP đang in cứng "Dự kiến giao hàng vào ngày **15/08/2026**", trong khi hôm nay là 14/08. Demo cho khách xem từ 16/08 trở đi sẽ hiện một ngày đã qua — đổi sang ngày tương đối hoặc đẩy xa ra trước buổi trình bày gần nhất.

**4. Trạng thái focus sửa một lần ở tầng CSS gốc.**
`outline:none` đang rải ~20 chỗ trong khi chỉ có 3–4 rule `:focus-visible`. Yêu cầu "Focused" của brief hiện gần như không đạt. Đặt một rule `:focus-visible` chung ở gốc rẻ hơn nhiều so với đi sửa từng component sau này.

**5. Đổi filter desktop sang cột trái là đổi layout, không phải dời vị trí.**
Hiện là drawer overlay có backdrop. Thành cột trái đẩy sản phẩm sang phải thì lưới sản phẩm phải co lại và số cột phải tính lại theo bề rộng còn lại — kéo theo cả responsive của PLP desktop.

**6. Save Cart đi ngược quyết định kiến trúc hiện tại.**
Dự án cố ý không dùng `localStorage`. Muốn có Save Cart thì phải đảo quyết định đó, và khi đã đảo thì nên tính luôn cho ngôn ngữ, font, bộ lọc đang áp — nếu không sẽ lưu nửa vời.

**7. Gộp 65 mục còn mở trong `AUDIT.md` vào cùng đợt.**
Nhiều mục trong đó (validation, i18n, back/scroll, hành vi lệch giữa 2 lối vào) trùng đúng với yêu cầu "thống nhất hành vi tương tác" ở trang 1 của brief. Làm rời ra là chạm vào cùng đoạn code hai lần.

**8. `AUDIT.md` đã lạc hậu ở mục bộ lọc.**
Bản quét 11/08 ghi "mobile chưa lọc thật", nhưng code hiện tại đã có `plpFilters` ở **cả hai bản**. Nên cập nhật lại AUDIT trước khi dùng nó làm căn cứ báo cáo cho khách.
