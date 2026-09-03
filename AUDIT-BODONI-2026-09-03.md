# Rà soát footprint Libre Bodoni — 03/09/2026

**Bối cảnh.** Khách đã chốt `skin-li` (cặp Libre Bodoni + Inter) làm phương án gần cuối
cùng, dùng cho toàn bộ trang. Báo cáo này đo xem cặp font đó **thực tế vẽ ra bao nhiêu**
trên bản đang chạy, chỉ ra chỗ đáng lên bậc trưng bày mà đang không, và đề xuất phương án.

**Chưa sửa gì.** Đây là báo cáo để chốt hướng.

---

## 1. Kết luận ngắn

Cặp font sống thật, nhưng hai nửa rất lệch nhau — và **nguyên nhân không phải lỗi
typography**.

- **Inter phủ gần như toàn bộ chữ.** Màn PLP mobile: 500 trên 511 phần tử có chữ là Inter.
  Mười phần tử còn lại là nhãn tên phông trong popover Cài đặt (công cụ dev), không phải
  nội dung trang.
- **Libre Bodoni chỉ đóng vai bậc trưng bày 24/32**, và **mọi `h1`/`h2` trong ứng dụng đều
  đã nằm đúng trên bậc đó**. Không có tiêu đề nào bị bỏ sót lại ở Inter.
- **Vấn đề nằm ở chỗ khác: nhiều màn không có phần tử tiêu đề nào cả.** Bodoni vắng mặt vì
  không có gì để nó vẽ, chứ không phải vì bị khai sai.

Nặng nhất: **màn vào trang của cả hai bản không có một tiêu đề nào** — tức ấn tượng đầu
tiên của khách chứa 0% mặt chữ mà chính họ vừa duyệt.

---

## 2. Hiện trạng đo được

Đo ngày 03/09/2026 trên server tĩnh, `index.html` ở khổ 390 và `desktop.html` ở khổ 1440.
Đã loại phần tử mang chữ *"Libre Bodoni"* trong popover Cài đặt — đó là nhãn công cụ dev.

### `index.html` — mobile

| Màn | Phần tử Bodoni | Chi tiết |
|---|---|---|
| PLP (vào trang) | **0** | không có `h1`/`h2` nào |
| PLP (qua điều hướng) | **0** | không có `h1`/`h2` nào |
| Tìm kiếm | **0** | có 2 `h2` nhưng ở **12/16 Inter** |
| PDP | 3 | brand "Versace" 24/32 · "Gợi ý mua kèm" · "Sản phẩm tương tự" |
| Giỏ hàng | 1 | "Giỏ hàng (5)" 24/32 |
| Đăng nhập | 1 | "Đăng nhập" 24/32 |

### `desktop.html`

| Màn | Phần tử Bodoni | Chi tiết |
|---|---|---|
| PLP (vào trang) | **0** | không có `h1`/`h2` nào |
| PLP (qua điều hướng) | 1 | `h1` "Nam" 24/32 — **chỉ xuất hiện khi vào bằng menu** |
| PDP | 3 | "Versace" 24/32 · "Gợi ý\nMua kèm" **40/50** · "Sản phẩm tương tự" 24/32 |
| Giỏ hàng | 2 | "Giỏ hàng (5)" · "Tóm tắt đơn hàng" |
| Đăng nhập | 1 | "Đăng nhập" |

### Ba bản fork skin

| File | Bộ da lúc vào trang | Số lần nhắc `Libre Bodoni` | `--font-head` |
|---|---|---|---|
| `desktop-neutral.html` | *(không mang bộ da nào)* | **0** | 0 |
| `desktop-editorial.html` | `skin-mp` bản cũ | **0** | 0 |
| `desktop-atelier.html` | *(không mang bộ da nào)* | **0** | 0 |

Cả ba chạy Montserrat. Chúng **không trình được giao diện khách đã chốt** — đây là lỗ mức
*chặn* trong `MATRIX-5FILE-2026-09-03.html`. Việc port là hạng mục riêng, không thuộc báo
cáo này.

---

## 3. Chỗ đáng lên bậc trưng bày mà đang không

| # | Chỗ | Hiện tại | Vấn đề |
|---|---|---|---|
| 1 | Tên thương hiệu ở màn vào trang, **cả 2 bản** | "Versace" 12/18 Inter, nằm trong breadcrumb | Trang thương hiệu **không có tiêu đề**. Chủ đề của trang đang ở bậc chữ NHỎ NHẤT |
| 2 | PLP mobile | không có tiêu đề ở mọi lối vào | Bản desktop có `h1` "Nam", mobile không có gì tương ứng |
| 3 | PLP desktop lúc vào trang | `h1` chỉ dựng khi vào qua menu | Cùng một màn mà lối vào khác nhau cho ra bố cục khác nhau |
| 4 | "Vừa tìm kiếm" · "Sản phẩm nổi bật" (Tìm kiếm mobile) | `h2` ở 12/16 Inter | Là `h2` về mặt ngữ nghĩa nhưng nằm ở bậc nhỏ nhất |

Ba mục đầu là **thiếu tiêu đề**. Mục 4 khác hẳn: tiêu đề có thật, chỉ là nhỏ — xem phần
đề xuất.

---

## 4. Phương án

### A — chỉ vá màn vào trang

Thêm `h1` 24/32 Bodoni cho trang thương hiệu ở cả `index.html` và `desktop.html`. Đúng mục
1.

- **Được:** nhỏ nhất, chạm đúng chỗ đau nhất, rủi ro bố cục thấp.
- **Mất:** PLP — màn khách xem nhiều nhất — vẫn không có mặt chữ trưng bày nào.

### B — vá màn vào trang và PLP *(khuyến nghị)*

Phương án A, cộng thêm mục 2 và 3: dựng `h1` cho PLP mobile, và cho PLP desktop hiện `h1`
ngay từ trạng thái vào trang chứ không chỉ khi qua menu.

- **Được:** cả bốn màn thương mại chính đều có tiêu đề; hai lối vào PLP cho ra cùng một bố
  cục; dùng lại đúng bậc 24/32 đã có, **không mở bậc mới**.
- **Mất:** đụng vào bố cục đầu màn PLP — cần đo lại khoảng cách với thanh lọc và dải chip
  danh mục trước khi chốt số.

### C — B, cộng nâng nhãn mục ở màn Tìm kiếm lên bậc trưng bày

- **Được:** Bodoni có mặt ở mọi màn.
- **Mất:** "Vừa tìm kiếm" và "Sản phẩm nổi bật" là **nhãn mục nhỏ**, không phải tiêu đề
  trang. Đẩy chúng lên 24/32 sẽ phá nhịp màn Tìm kiếm và làm hai nhãn đó tranh vai với ô
  tìm kiếm. Không nên.

**Khuyến nghị: phương án B.** Mục 4 nếu muốn xử thì nên xử theo hướng **ngữ nghĩa** — cân
nhắc hai phần tử đó có đúng phải là `h2` không — chứ không phải kéo cỡ chữ lên.

---

## 5. Một ngoại lệ đã ghi danh, không phải lỗi

Tiêu đề "Gợi ý / Mua kèm" ở PDP desktop chạy **40/50**, không có trong thang chữ dự án
(12/14/16/18/24/32/48) và cũng không có trong thang trưng bày của `FONT-LIBRE-INTER.md`
(24/32 · 32/40 · 48/60).

Đây là **ngoại lệ user chốt đích danh 28/08** (*"bỏ subtitle đi, tăng font lên 40px"*), đã
ghi chú đầy đủ ngay tại rule `.dk-look-title` trong `desktop.html`, kèm sẵn bậc thay thế
đúng thang là **48/60** nếu muốn quay về. Phạm vi ngoại lệ đúng một dòng chữ, không mở bậc
mới cho chỗ khác.

Ghi ở đây để lần rà sau không báo nhầm thành lỗi.

---

## 6. Chỗ chưa kiểm

- Chỉ đi qua các màn: PLP, PDP, Giỏ hàng, Đăng nhập, Tìm kiếm. **Chưa đi** thanh toán, theo
  dõi đơn, các trang chính sách.
- Chỉ đo `index.html` ở 390 và `desktop.html` ở 1440. Chưa đo các mốc khổ trung gian.
- Chưa đo `home.html` — nó dựng trên `shadcn-theme` và có hệ da riêng, cần lượt riêng.

## 7. Cách đo lại

Chạy server rồi mở file, dán vào console:

```js
[...document.querySelectorAll('*')]
  .filter(e => /Libre Bodoni/.test(getComputedStyle(e).fontFamily))
  .filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()))
  .filter(e => e.textContent.trim() !== 'Libre Bodoni' && e.offsetParent !== null)
  .map(e => {
    const s = getComputedStyle(e);
    return e.textContent.trim().slice(0, 30) + ' — ' + s.fontSize + '/' + s.lineHeight;
  });
```

Hai bộ lọc cuối là bắt buộc: bỏ chúng thì popover Cài đặt góp thêm một phần tử mang chữ
*"Libre Bodoni"*, và các màn đang ẩn cũng bị đếm vào.
