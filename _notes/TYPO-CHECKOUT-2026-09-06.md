# Rà luật typo ở trang thanh toán, và lỗ mặt chữ nó phơi ra (06/09/2026)

> Lệnh user: *"có vẻ trang check out chưa áp dụng style của skin-li và style text mới đúng k,
> hãy kiểm tra rule typo và áp dụng vào nhé"*

Đo từng phần tử có chữ trên màn thanh toán ở cả hai khổ, đối chiếu bảng chuẩn `FONT-LIBRE-INTER.md`
Phần 13.1. Kết quả: cỡ chữ và thang chữ của trang **không sai chỗ nào** (chỉ có 10 · 12 · 14 · 24,
tracking 0,5px, không có bậc lạc như 11 · 13 · 15 · 18), nhưng có **hai chỗ lệch luật** và một chỗ
là lỗ của toàn app chứ không riêng trang này.

## 1. Tiêu đề bậc trưng bày vẽ bằng Inter thay vì Libre Bodoni

Trên desktop, tiêu đề `Thanh toán (5)` ra **Inter 24/32** trong khi `Tóm tắt đơn hàng` ngay bên phải
ra **Libre Bodoni 24/32**. Cùng cỡ, cùng dòng, cùng 400, khác đúng mặt chữ, tức đúng cái lỗi mà
Phần 13.2 mục 2 đã dọn một lần cho bậc 18.

Gốc rễ không nằm ở trang thanh toán. Rule gán Bodoni của bộ da bám **utility cũ**
(`text-[18px]` · `[22px]` · `[24px]` · `[32px]`), trong khi lượt adapt thang chữ ngày 04/09 đã đổi
các tiêu đề sang **class ngữ nghĩa `.t-display-title`**. Mọi tiêu đề đã đổi rơi ra ngoài rule đó.
Chính mã nguồn có ghi chú cảnh báo chuyện này ở hai chỗ nhưng chưa ai vá.

Đếm được trước khi sửa:

| Bản | Số tiêu đề ra Inter | Ở đâu |
|---|---:|---|
| desktop | 13 | thanh toán · giỏ hàng · tóm tắt đơn · brand PDP · đặt hàng thành công · trang chính sách · 6 view xác thực |
| mobile | 8 | tương tự, trừ các chỗ còn dùng utility cũ |

Vá bằng một rule trong khối `skin-li` của mỗi file: `.t-display-title` nhận `--font-head`,
`text-transform: none` và `font-weight: 400`. Khai `400` là bắt buộc vì markup các tiêu đề này mang
`font-light` / `font-medium` / `font-semibold`, mà bậc trưng bày của bộ da là 400.

Không gộp vào rule cũ: rule đó cố tình bám `:is(h1, h2, p)` để `span` số điểm thưởng rơi ra ngoài
(13.2 mục 1). Số điểm thưởng dùng `.text-[32px]` chứ không mang class này nên hook thẳng vào class
là an toàn; đã rà cả 28 chỗ dùng `.t-display-title` ở hai file, tất cả đều là tiêu đề thật.

## 2. Tiêu đề bước ở thanh toán không mặc tầng nhãn

`Vận chuyển` · `Phương thức vận chuyển` · `Thanh toán` đang là **12/16 · 400 · chữ thường**, tức
trông y hệt dòng địa chỉ ngay dưới nó. Theo 13.1 thì nhãn nhóm menu, chân trang và accordion là
**12/16 · 500 · chữ hoa**, và chính app đã làm vậy ở nơi khác:

| Chỗ | Trước lượt này |
|---|---|
| `ƯU ĐÃI & KHUYẾN MÃI` ở giỏ hàng | 12/16 · 500 · hoa |
| `DANH MỤC` · `THƯƠNG HIỆU` · `MÀU SẮC` ở panel bộ lọc | 12/16 · 500 · hoa |
| 4 cột chân trang | 12/16 · 500 · hoa |
| **3 bước ở thanh toán** | **12/16 · 400 · thường** |

Markup vốn đã ghi `font-medium`, nhưng `skin-mt` kéo mọi `font-medium` về 400 (đúng luật cặp
500 ⇔ hoa), nên phải khai lại cả hai vế. Bộ da `skin-mp` đã khai đúng như vậy cho chính class này
từ trước, nay `skin-li` theo.

## 3. Đã đo lại sau khi sửa

- Bậc trưng bày: **0 phần tử còn Inter** trên 15 màn của mỗi bản (trước: 13 desktop, 8 mobile);
  24 phần tử Bodoni ở desktop, 21 ở mobile.
- Ba tiêu đề bước ở thanh toán: 12/16 · 500 · hoa, cả hai bản.
- Thang chữ của trang thanh toán không đổi một pixel: vẫn 10 · 12 · 14 · 24, tracking 0,5px.
- Không lỗi console, `node --check` khối script sạch.

## 4. Một chỗ cần user quyết, không tự sửa

Số điểm thưởng `1.240` ở tab Điểm thưởng đang là **Libre Bodoni 24**. Phần 13.2 mục 1 chốt số này
phải là Inter vì "số là nội dung". Nó rơi vào Bodoni từ lượt dựng lại trang tài khoản ngày 05/09,
khi markup đổi từ `span.text-[32px]` sang `p.text-[18px]` và trúng nhánh utility cũ — không phải do
lượt sửa hôm nay. Nay nó đứng thành cặp với tiêu đề `Điểm thưởng` cũng Bodoni, nên tách riêng một
mình nó về Inter là quyết định thẩm mỹ, không phải sửa lỗi. Chờ bạn chốt.
