# Đơn hàng đặt trước trong trang tài khoản (06/09/2026, CẢ 2 BẢN)

> Lệnh user: *"vì luồng mới có thêm tính năng đặt trước nên trong phần order dashboard và
> order details cũng cần hiển thị các case đơn hàng và sản phẩm đặt trước. hãy tạo luôn các
> case đó vào trong code của phần account nhé"*

Luồng mua đã có hàng đặt trước từ 14/08 nhưng ba đơn seed đều là hàng có sẵn, nên tab Đơn hàng
và màn Chi tiết đơn chưa bao giờ hiện được case này. Bảng sitemap ngày 05/09 ghi đúng ô đó là
"chỉ đúng khi tự đặt đơn". Nay đã có case thật trong data và cách hiển thị riêng cho chúng.

Sửa ở `index.html` và `desktop.html`. Ba bản fork skin vẫn đóng băng từ 21/08, không đụng.

## 1. Hai đơn mới trong data

| Mã đơn | Ngày | Trạng thái | Hàng | Ý nghĩa |
|---|---|---|---|---|
| `DAFC103015` | 05/09/2026 | Chờ hàng về | 1 món, toàn bộ đặt trước | đơn đặt trước thuần |
| `DAFC102990` | 28/08/2026 | Đang giao | 2 món, 1 sẵn 1 đặt trước | đơn hỗn hợp, giao 2 đợt |

Ngày nhận dự kiến đọc từ `PRODUCTS[0].preorder` chứ không chép tay, nên đổi ngày ở data là mọi
màn đổi theo. Theo luật 03/09 (đặt trước không có sale) nên hai đơn này không có dòng giảm giá.

## 2. Hiển thị mới

Bốn hàm nhỏ suy trạng thái từ chính các dòng hàng, không thêm cờ ở cấp đơn: `orderPreItems`,
`orderHasPre`, `orderAllPre`, `orderEta`. Nhờ vậy đơn do khách tự đặt trong demo cũng chạy đúng
mà không phải sửa `placeOrder` (hàm đó vốn đã chép `preorder` cho từng dòng).

**Danh sách đơn (tab Đơn hàng)**

- Badge "Đặt trước" đứng trước tên hàng, đúng khuôn mọi thẻ khác trong app.
- Thêm một dòng ngày: đơn thuần đặt trước ghi "Nhận hàng dự kiến 30/09/2026", đơn hỗn hợp ghi
  "Giao 2 đợt · đợt sau nhận dự kiến 30/09/2026". Dòng này tách riêng, không nối vào chuỗi
  "N sản phẩm · tổng" vì chuỗi đó là một text node mà luật i18n bám đúng.

**Chi tiết đơn**

- Timeline có thêm chặng **Chờ hàng về** giữa Đã xác nhận và Đang giao, chỉ với đơn có hàng đặt
  trước. Đó là quãng dài nhất của luồng này, gần một tháng, mà bộ 4 chặng cũ không có chỗ nào chỉ.
- Băng ghi chú dưới timeline nói ngày hàng về. Băng này và băng "mã vận đơn" của đơn thường loại
  trừ nhau: đơn hỗn hợp mang cả hai điều kiện, in cả hai là hai băng nói hai ngày khác nhau.
- Đơn hỗn hợp tách danh sách hàng làm **Đợt 1 · Hàng có sẵn** và **Đợt 2 · Hàng đặt trước**. Đơn
  thuần đặt trước không tách vì mọi dòng đều đã mang badge và ngày.
- Mỗi dòng hàng đặt trước có badge trước tên và dòng "Nhận hàng dự kiến" (khuôn này có sẵn từ
  03/09, nay mới có dữ liệu để hiện).
- Nút hành động: đơn đặt trước chưa tới chặng giao thì đổi thành **Nhắc tôi khi hàng về** và
  **Huỷ đơn đặt trước**, vì lúc đó chưa có mã vận đơn nên nút "Theo dõi đơn hàng" không mở được gì.
  Nút chính mượn đúng khuôn "Nhận thông báo khi có hàng" mà app đã có ở PDP.

Thêm 10 khoá i18n cho bản tiếng Anh. Chuỗi băng ghi chú cắt ngay trước thẻ chứa ngày, đúng cách
chuỗi "Mã vận đơn" đang làm, nên không phải đẻ luật regex cho ngày.

## 3. Đã kiểm

Đo trên trang chạy, cả hai khổ:

- Danh sách 5 đơn, hai đơn mới đứng đầu với badge và dòng ngày đúng.
- Đơn thuần đặt trước: 5 chặng, chặng hiện tại là Chờ hàng về, băng ghi chú đúng ngày, 2 nút riêng.
- Đơn hỗn hợp: 5 chặng, dừng ở Đang giao, 2 nhóm đợt giao, băng ghi chú nói 2 đợt.
- Đơn thường: vẫn 4 chặng, vẫn băng mã vận đơn, 0 thay đổi.
- Đặt một đơn thật từ giỏ demo (5 món, 1 món đặt trước): đơn mới hiện đủ badge, dòng 2 đợt,
  timeline 5 chặng và 2 nhóm hàng.
- Bản tiếng Anh: 10 chuỗi mới dịch đúng, kể cả nội dung toast.
- Đi hết luồng ở cả hai file: không lỗi console. `node --check` khối script: sạch.

## 4. Case gộp: quà + đặt trước + giao nhanh trong một đơn

Câu hỏi của user sau lượt trên. Trả lời thẳng: trước lượt này thì **mất hai trong ba thứ**.

- **Quà tặng biến mất khỏi đơn.** Quà chỉ sống ở giỏ, màn thanh toán và màn Hoàn tất. Object đơn
  hàng không có trường nào cho quà, nên mở lại đơn cũ là không còn dấu vết món quà đã nhận.
- **Giao nhanh không được ghi lại.** Nút chọn giao nhanh ở checkout chỉ đổi CHỮ trong dòng tóm tắt,
  không có state nào giữ; `placeOrder` ghi cứng "Giao hàng thông thường". Chọn giao nhanh xong mở
  lịch sử đơn thì đơn nói là giao thường.
- **Đặt trước thì đúng**, nhưng đơn chỉ có một phương thức giao duy nhất nên không nói được
  "đợt này giao nhanh, đợt kia chờ hàng về".

Đã sửa cả ba.

**Đợt giao thành một khái niệm.** Ba nhóm theo thứ tự nhanh trước chậm sau: giao nhanh, hàng có sẵn,
hàng đặt trước. Nhóm rỗng thì biến mất, đơn một nhóm thì không đánh số đợt. Dòng hàng vào nhóm nào
suy từ chính nó: có `preorder` thì vào đợt đặt trước, có `ship: 'fast'` thì vào đợt giao nhanh.

**Quà đi theo đơn.** Đơn lưu `gifts: [{chương trình, key quà}]`, không chép cả món, nên đổi bảng quà
là đơn cũ đổi theo và vẫn giữ được tên chương trình. Dòng quà trong chi tiết đơn dùng lại khuôn dòng
hàng, khác ba chỗ: badge "Quà tặng" trước tên, dòng phụ là tên chương trình, giá 0 ₫. Quà xếp vào đợt
đầu vì đó là kiện rời kho trước.

**Đơn seed mới `DAFC103042`** gộp đủ: 1 món giao nhanh, 2 món có sẵn, 1 món đặt trước, 3 quà từ hai
nguồn khác nhau (quà kèm sản phẩm và quà theo mốc đơn 150 triệu, tạm tính 168.482.000 nên mốc này đạt
thật). Màn chi tiết chia 3 khối, băng ghi chú nói "Đơn giao 3 đợt", danh sách đơn thêm dòng
"Đơn có quà tặng kèm".

**Sửa kèm ở checkout:** thêm cờ `ckShipFast`, `placeOrder` nay ghi đúng phương thức đã chọn, đánh cờ
`ship: 'fast'` cho hàng có sẵn (hàng đặt trước không nhận cờ này vì nó chờ về kho rồi mới đi), và
chép quà đã chốt vào đơn. Đặt thử một đơn giao nhanh có quà: đơn ghi đúng "Giao hàng nhanh", 3 quà,
4 dòng hàng mang cờ nhanh và 1 dòng đặt trước.

Thêm 10 khoá i18n cho các tên đợt và ba luật regex (tiêu đề "Sản phẩm (N)" trước nay chỉ có khoá tĩnh
cho 1 và 2 nên đơn 3 đến 4 món là lòi tiếng Việt trong bản Anh, và dòng "SL: N" chưa từng được dịch).

## 5. Chưa làm, chờ chốt

1. **Đặt cọc** cho hàng đặt trước (câu hỏi 10 của brief còn treo): chưa có dòng cọc nào trong đơn.
2. **Huỷ riêng phần đặt trước** của đơn hỗn hợp: hiện chỉ có nút huỷ cả đơn.
3. **Giao một phần thật** (đợt 1 đã giao, đợt 2 đang chờ): các đợt vẫn dùng chung một timeline và
   một trạng thái đơn. Muốn mỗi đợt có trạng thái riêng thì phải thêm dữ liệu cho từng đợt.
4. **Phí giao nhanh 25.000đ** chưa vào tổng tiền của đơn đặt thật; đơn seed thì có tính. Sửa chỗ này
   là đụng vào công thức tổng của giỏ nên để riêng.
5. Ba case này **chưa có khung trong Figma**; section `Tài khoản & xác thực` mới dựng hôm nay
   đang là đơn thường. Cần dựng thêm 6 khung (3 case × 2 khổ) nếu khách duyệt hướng này.
