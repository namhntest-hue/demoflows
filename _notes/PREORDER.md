# Pre-order — đã làm gì & đề xuất cho checkout (14/08/2026)

> **Cập nhật cùng ngày: user đã chốt phương án A — ĐÃ LÀM XONG** (xem mục "Phương án A" bên dưới, các dấu vết cụ thể ghi ở cuối file). B và C vẫn để ngỏ như lộ trình nâng cấp.
>
> **Đã port toàn bộ sang desktop.html cùng ngày** (kèm ngày in đậm ở PDP cả 2 bản). Desktop khác mobile 2 chỗ có chủ ý: badge gắn vào ô ảnh đầu của lưới gallery; cờ `preorder:true` cũ của `PDP_DATA` bỏ đi, CTA suy thẳng từ `PRODUCTS[0].preorder`. Panel "Tóm tắt đơn hàng" sau đó được user chốt: **đồng bộ khuôn dòng theo tóm tắt mobile** (thumb 100×133, badge, giá đáy-phải, dòng ngày không prefix), hạ title xuống heading 18, và **panel chỉ để xem thông tin** — nút "Đặt hàng" (vốn nhảy thẳng màn hoàn tất từ bước 0, lỗi UX) dời về cuối bước Thanh toán như mobile.

## Phần đã làm (mobile `index.html`)

| Nơi | Thay đổi |
|---|---|
| Data | `PRODUCTS[0].preorder = '30/09/2026'` — nguồn ngày duy nhất; đầm lụa vào đầu `CART_BASE` (giỏ 4→5 món, tạm tính mặc định 186.057.000 ₫) |
| PDP v1 | Badge "Pre-order" cùng style "New Season" ở gallery; dòng "Dự kiến giao hàng vào ngày 30/09/2026" dời **ra khỏi nút, nằm trên nút** (cả CTA in-flow lẫn sticky); nút còn 1 dòng "Đặt trước" |
| Giỏ hàng | Thẻ pre-order vẫn đúng khuôn item-cart, thêm badge "Pre-order" trên ảnh + dòng "Pre-order · Nhận hàng dự kiến 30/09/2026" dưới phân loại |
| Sheet xác nhận | Thêm dòng ngày nhận (cả đường PDP lẫn quick add PLP) — trước đây "Đặt trước" và "Thêm vào giỏ" ra kết quả y hệt (finding AUDIT) |
| Mốc quà theo đơn | 100/150tr → 150/200tr để giữ kịch bản demo: mốc 1 đạt sẵn, mốc 2 chờ +1 số lượng |
| i18n | Chuỗi mang ngày dịch bằng luật regex 2 chiều; badge gắn `data-i18n-skip` để không bị dịch ngược thành "Đặt trước" |

Checkout **chưa đụng tới** — chờ chốt 1 trong các phương án dưới.

## Hiện trạng checkout

Đầm pre-order đã chảy vào màn thanh toán như hàng thường: tóm tắt đơn liệt kê đủ 5 món, một dòng ETA chung "Thời gian nhận hàng dự kiến từ ngày 14/07 đến ngày 18/07" áp cho cả đơn — tức là đang **hứa sai** với món chỉ về hàng ngày 30/09.

## 3 phương án

### Phương án A — dòng trạng thái theo từng món (nhẹ nhất, khuyến nghị)

Trong tóm tắt đơn (màn thanh toán + màn hoàn tất + đơn đã đặt), món nào có `preorder` thì thêm đúng 1 dòng "Pre-order · Nhận hàng dự kiến 30/09/2026" dưới dòng phân loại — tái dùng y nguyên khuôn dòng đã làm ở giỏ. Dòng ETA chung của đơn giữ nguyên nhưng thêm chú thích "(riêng hàng pre-order nhận theo ngày ghi trên từng sản phẩm)".

- Ưu: ~1 buổi làm; không đổi cấu trúc màn nào; ăn khớp brief mục "Cart — info shipment status".
- Nhược: đơn trộn hàng thường + pre-order vẫn là **một** kiện hàng trên UI, chưa kể chuyện giao 2 đợt.

### Phương án B — tách nhóm giao hàng (kể chuyện shipment đúng nhất)

Bước "Giao hàng" và tóm tắt đơn chia 2 khối: "Giao ngay (4 sản phẩm) · dự kiến 14–18/07" và "Pre-order (1 sản phẩm) · nhận từ 30/09". Mỗi khối một dòng ETA riêng; màn hoàn tất + email cũng in 2 đợt giao.

- Ưu: đúng logic vận hành thật (2 shipment), khách không hiểu nhầm ngày nhận.
- Nhược: đụng cấu trúc checkout + màn hoàn tất + dữ liệu đơn (`placeOrder`); ~2–3 ngày; nên làm sau khi chốt câu 4 trong BRIEF-GAP (gộp giỏ + thanh toán làm 1 màn hay không) kẻo dựng xong lại đập.

### Phương án C — đặt cọc (đúng brief tr. 14 nhưng đang kẹt dữ liệu)

Brief yêu cầu note "For Deposit" dưới giá và claim note về quy định đổi trả + đặt cọc. Tức là checkout phải tính **tiền cọc** (x% của món pre-order) tách khỏi tổng, và tổng cộng chia 2 dòng "Thanh toán hôm nay / Thanh toán khi nhận hàng".

- Ưu: đúng yêu cầu brief nhất, demo được câu chuyện tiền.
- Nhược: **chưa có số** — brief không nói % cọc, điều kiện hoàn cọc (đã nêu ở BRIEF-GAP câu hỏi 10). Làm trước khi khách chốt là bịa chính sách tài chính.

## Khuyến nghị

Làm **A ngay** (demo hết hứa sai ngày, chi phí thấp nhất), giữ B chờ chốt câu 4 BRIEF-GAP, và C chỉ làm sau khi khách trả lời câu hỏi 10 về chính sách cọc. A không cản đường B/C — dòng theo món của A vẫn nằm nguyên trong khối shipment của B, và giá trị cọc của C chỉ là thêm dòng tiền.

## Hở còn lại của brief mục 6 (chưa nằm trong yêu cầu lần này)

- PLP: CTA quick add của hàng pre-order vẫn là "Thêm vào giỏ hàng", chưa đổi thành "Đặt trước"; card chưa có dòng "Expected to be in stock".
- Mail confirm sau khi submit form notify (mới có toast).
- Note "For Deposit" ở PDP (kẹt cùng câu hỏi 10 với phương án C).

## Phương án A — chi tiết đã triển khai (14/08/2026, chỉ mobile)

| Nơi | Thay đổi |
|---|---|
| Tóm tắt đơn ở checkout ("Giỏ hàng của bạn") | Món pre-order có dòng ngày nhận dưới dòng phân loại · SL — cùng khuôn dòng ở giỏ. Bổ sung cùng ngày theo yêu cầu user: thumb phóng to 52×60 → 100×133 như thẻ giỏ (tên 2 dòng, badge "Pre-order" trên ảnh, dòng quà cùng cỡ); giá ghim đáy-phải (`self-end`); dòng ngày bỏ chữ lặp "Pre-order ·" (badge lo nhận diện), còn "Nhận hàng dự kiến **30/09/2026**" với ngày in đậm — áp cho cả thẻ ở màn Giỏ. Dòng ngày ở PDP căn trái thẳng mép nút |
| Bước "Phương thức vận chuyển" | Ghi chú "Riêng hàng pre-order: nhận hàng dự kiến 30/09/2026, giao riêng khi hàng về." hiện ở CẢ hai trạng thái: dưới 2 lựa chọn giao hàng (lúc chọn) và trong tóm tắt đã xác nhận — vì ETA chung 14–18/07 không đúng cho món đặt trước |
| Màn Hoàn tất | Thêm dòng "Hàng pre-order · Nhận dự kiến 30/09/2026" vào bảng tóm tắt (cả 2 chế độ giao hàng / nhận tại cửa hàng); ngày chốt lúc đặt hàng qua `ckOrderPre` vì sau đó giỏ bị dọn rỗng |
| Đơn đã đặt (chi tiết đơn) | `placeOrder` chốt `preorder` vào snapshot items; màn chi tiết in dòng "Pre-order · Nhận hàng dự kiến …" dưới phân loại của món đó |
| i18n | 1 key tĩnh (`Hàng pre-order` ↔ `Pre-order items`) + 2 cặp luật regex mới cho chuỗi mang ngày; đã test đủ 2 chiều |
