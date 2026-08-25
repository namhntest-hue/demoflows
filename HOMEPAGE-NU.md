# Trang chủ ngành hàng Nữ — screen `nu` trong `home.html`

> Dựng 24/08/2026 ở file riêng `home-nu.html`, **gộp vào `home.html` cùng ngày**
> theo lệnh user. File riêng đã xoá; nội dung nay là **screen `nu`**, vào bằng
> cách bấm **Nữ** ở hàng dept của header, hoặc mở thẳng
> `http://localhost:8124/home.html#nu`. Chi tiết lượt gộp: `HOMEPAGE.md` mục 0.
> Hướng thẩm mỹ: skill `minimalist-ui`. Trọng tài vẫn là `STYLE-RULES.md`.
> Tên màn lấy theo chính data dự án: `MENU_DATA['Nữ'].home` = *"Trang chủ nữ"*.

> **Sau khi gộp, 2 điều đổi so với bản dưới:** (1) `skin-min` không còn bật sẵn
> trên `<html>` mà do `setScreen()` gắn/gỡ theo screen — nên nó không thể rò sang
> screen `nam`; (2) 6 id của screen này thêm hậu tố `Nu` (`propsNu`, `nsFormNu`,
> `maisonsNu`…) để không đụng id của screen `nam`.

---

## 1. Ba tầng, đọc từ ngoài vào

**Tầng 1 — MENU BAR: port 1:1 bộ thiết kế gốc, `skin-min` không chạm tới.**
Khối CSS + markup + JS của menu bar lấy **nguyên văn** từ `home.html` (đã đối
chiếu 12 điểm với `desktop.html`). Chỉ đổi 2 thứ, và cả 2 là **data** chứ không
phải style:
* dept đang chọn `Nam` → **`Nữ`** (bản gốc mặc định Nam vì nó là màn PLP chung)
* nút menu khổ nhỏ neo vào mục `#danh-muc` của trang này

Đo lại sau khi ghép: navbar cao 161 · `#dkNavRow` 64 · `#dkSubRow` 64 ·
`.dk-dept` 12/16 · 500 · HOA · `.dk-nav-link` ô 134×36 · 8 danh mục · 6 mega
panel · hover-intent vẫn mở sau 120ms. Khổ <768: navbar 48. **Khớp bản gốc.**

**Tầng 2 — thân trang mặc định = đúng luật.** Mặt trắng, Montserrat, thang 5 cỡ,
viền 3 tầng, bo 0, không bóng.

**Tầng 3 — `skin-min`, bật sẵn trên thẻ `<html>`.** Đây là lớp thử của hướng
minimalist. Theo memory *dafc-thu-nghiem-khong-dat-vao-skin-mac-dinh*: thử
nghiệm không được nằm trong bộ da mặc định. Tắt class là trang về tầng 2 **ngay**.
`skin-min` **chỉ đổi biến**, không sinh selector đè utility — đúng luật viết bộ
da §4.3-5, nên nó không thể rò sang chỗ khác.

---

## 2. `skin-min` lệch luật đúng 3 chỗ — mỗi chỗ một công tắc riêng

Bảng công tắc ở góc dưới phải có **4 nút**: 1 nút tắt cả hướng, 3 nút gỡ từng
trục một. Có 3 nút lẻ để so **từng trục**, không phải chỉ bật/tắt cả cục.

| | Lệch gì | Luật nói | Vì sao vẫn làm |
|---|---|---|---|
| **a** | Nền trang **bone ấm `#f7f6f3`** | §2.2 chỉ có `#fff` + `#f2f2f2` | Đây là thứ làm hướng này thành "document-style". Thẻ và card vẫn trắng nên đòn nhấn 3 của §2.3 (mặt trắng trên nền sâu hơn) **mạnh hơn** so với khi cả trang trắng. |
| **b** | Mặt chữ tiêu đề **Newsreader serif** + 3 bậc **48/52 · 32/38 · 24/30**, tracking **−0.02em** | §1.6 một mặt chữ, cấm serif · §1.2 cao nhất 24/32 · §1.4 tracking đúng 0.5px | Serif là chữ ký thứ hai của hướng. §1.6 vốn đã mở cửa cho `--font-head` (mục "cặp font" trong popover Cài đặt) — ở đây dùng đúng cơ chế đó. Serif ở 24px không đọc ra là serif, nên bậc cỡ phải đi kèm. |
| **c** | **Lớp hạt giấy 2.5%** phủ cố định | Luật không có texture | §2.3 cấm gradient/mảng màu làm **ĐÒN NHẤN**; đây là bề mặt toàn trang, không nhấn gì. Đặt trên `body::after` `position: fixed; pointer-events: none` nên không bám khối đang cuộn (guardrail hiệu năng). |

**Newsreader đã kiểm có subset `vietnamese`** bằng cách tải CSS thật từ
fonts.googleapis.com (memory: *dafc-font-vietnamese-subset*). Cùng lượt kiểm:
**Instrument Serif — skill gợi ý — KHÔNG có tiếng Việt, đã loại.**

### Những thứ skill đòi mà tôi không làm

| Skill đòi | Không làm, vì |
|---|---|
| bo góc card 8–12px, nút 4–6px | §3.2 bo 0. Vuông góc là chữ ký đã qua nhiều vòng chốt (tham chiếu cettire); 8px là ngôn ngữ SaaS chung, mặc vào là mất nét riêng. |
| bóng khuếch tán khi hover card | §3.3 không bóng. Chiều sâu ở đây do ảnh phóng nhẹ 1.03 khi vào màn lo. |
| thẻ pill nền pastel (`#FDEBEC`…) | §2.2 + §2.3. Nhãn dùng **chữ hoa + kẻ mảnh**. |
| `rounded-full` cho tag | §3.2 — bo tròn chỉ cho hình tròn thật. |
| cửa sổ giả macOS, `<kbd>` phím | Trang bán hàng không có vai nào cho 2 thứ này. |
| ảnh `picsum.photos` | Đã có kho ảnh thật 1200×1484 của DAFC. |

---

## 3. Số đo — 2 trạng thái, cùng một trang

Đo `getComputedStyle` toàn trang ở 375 · 1440, đếm phần tử đang hiện có text.

| Trục | `skin-min` **TẮT** | `skin-min` **BẬT** |
|---|---|---|
| Tổ hợp typo | **7** — đúng T1…T7 | **8** |
| Mặt chữ | **1** (Montserrat) | 2 (Montserrat + Newsreader) |
| Cỡ chữ | 10 · 12 · 14 · 18 · 24 | thân bài **y nguyên** + 3 bậc tiêu đề 24 · 32 · 48 |
| Tracking | **1** (0.5px) | 4 (0.5px + 3 giá trị âm của serif) |
| Bậc mực | **3** + `#d62845` + trắng | y nguyên |
| Sắc viền | **3** tầng | y nguyên |
| Mặt phẳng | `#fff` · `#f2f2f2` + glass + mặt tối | thêm `#f7f6f3` cho nền trang |
| Bo góc sai | **0** | **0** |
| Đổ bóng | **0** | **0** |
| Tràn ngang | **không** | **không** |

Nói cách khác: **bật hướng minimalist chỉ đụng đúng 3 trục** (mặt chữ tiêu đề +
bậc cỡ tiêu đề + 1 mặt nền + texture). Thân bài, mực, viền, bo góc, bóng **không
đổi một điểm nào**. Trạng thái TẮT sạch luật hoàn toàn.

---

## 4. Cấu trúc — trang NGÀNH HÀNG, không phải trang chủ chung

Khác `home.html` ở chỗ: đây là **cửa vào một ngành**, nên phải đi được xuống mọi
nhánh mà không cần mở menu.

| # | Mục | Vai chỉ có ở trang ngành hàng |
|---|---|---|
| 1 | Hero chia đôi | Khối chữ mang **5 đường dẫn danh mục cấp 1**, không phải 2 nút CTA. Trên ảnh chỉ còn chip **"42 mẫu"** — dòng "tên sản phẩm · giá" đã gỡ 24/08 theo lệnh user (banner không đính kèm tên và giá) |
| 2 | **Bento danh mục** | Lưới 12 cột bất đối xứng: ô Quần áo 6 cột × 2 hàng (688×688) + 4 ô 3 cột (343×343), vách là kẻ 1px |
| 3 | Sản phẩm mới cho nữ | 8 SKU nữ, lưới 4 cột · mobile thành dải trượt |
| 4 | Editorial 2/3 + 1/3 | Chữ **cạnh** ảnh, không đè lên ảnh |
| 5 | **Mua theo dịp** | Đi làm · Tiệc tối · Cuối tuần · Du lịch — 4 ô kẻ 1px |
| 6 | Đang được quan tâm | 4 SKU |
| 7 | **Cây danh mục nữ** | 4 cột × toàn bộ nhánh của `MENU_DATA['Nữ']` — chỗ vào mọi nhánh không cần menu |
| 8 | Thương hiệu nữ | 10 nhà mốt, tên brand là **họ nội dung chữ thường** (§1.5 mục 6) |
| 9 | Dịch vụ | 3 hàng, có **"Sửa và chỉnh phom"** — dịch vụ chỉ ngành nữ mới cần |
| 10 | Bản tin · footer rút gọn | |

Data sản phẩm lấy đúng tên/giá/ảnh của `PRODUCTS` trong 2 demo, chỉ giữ SKU
ngành nữ; `alt` (ảnh đổi khi rê chuột) là ảnh thứ 2 trong `PRODUCT_GALLERY` của
chính SKU đó.

---

## 5. Bốn lỗi tìm được trong lúc đo, đã sửa

1. **Tiêu đề serif 48px giữ nguyên ở khổ 375** → một dòng chỉ ~7 chữ, hero vỡ
   thành 4 dòng. Thêm nhánh mobile cho `skin-min`: 32/36 · 24/30 · 18/24. Nay
   hero còn 2 dòng. Thân bài **không** đổi theo khổ — đó là chỗ 2 demo cũ đã vỡ.
2. **Ảnh ô lớn của bento kéo giãn lưới.** Thử `height:100%` cho ảnh ô lớn: phần
   trăm trên container cao không xác định thì rơi về chiều cao nội tại, ảnh dọc
   1200×1484 ra 851px ở bề rộng 688 → 2 hàng bị đẩy lên 425 và **hở 82px trắng
   dưới 4 ô nhỏ**. Sửa: ảnh ô lớn `position:absolute; inset:0` nên không đóng
   góp chiều cao; ô nhỏ khai `aspect-ratio` và chính nó định chiều cao 2 hàng.
   Khổ 1 cột thì ảnh ô lớn trở lại luồng. Nay 688×688 và 343×343, khít.
3. **Link cây danh mục / footer chỉ cao 18px** — dưới ngưỡng 24px của WCAG
   2.5.8. Nới bằng `padding: 8px 0` + siết `gap` về 2px → 34px cao, nhịp 36,
   **không chồng nhau** (chồng thì bấm ra link bên cạnh, tệ hơn ô nhỏ).
4. **Link "Xem tất cả" cao 16px** — nới vùng bấm lên 44px bằng `::before` phủ
   ngoài, **không xê dịch pixel nào** (`::after` đang là gạch chân).

---

## 6. Chưa làm

* **Panel menu trượt (mobile)** và **tấm gợi ý tìm kiếm** — 2 component MÀN của
  `index.html` / `desktop.html`, không thuộc menu bar. Nút của bản gốc đã port
  đủ; phần mở ra sau khi bấm thì chưa. Nút menu tạm cuộn tới mục danh mục.
* **i18n VN/EN** — chuỗi đều tiếng Việt sentence case, chữ hoa 100% do
  `text-transform` nên **không gõ hoa vào chuỗi nào**, sẵn sàng cho lượt dịch.
* **Chưa chụp được ảnh màn** và **chưa chạy được reveal-vào-màn**: preview pane
  phiên này không composite frame (`document.hidden === true`) nên
  `requestAnimationFrame` + `IntersectionObserver` không bắn. Lưới an toàn 2.5s
  của `.rv` đã tự kích hoạt và giữ nội dung hiện đủ — đúng tình huống nó được
  viết ra để chống. Menu bar chạy bằng `setTimeout` nên **đã kiểm được đầy đủ**.

---

## 7. Cần bạn chốt

1. **Ba chỗ lệch luật ở mục 2 — nhận cái nào?** Bật/tắt từng công tắc rồi so.
   Khuyến nghị của tôi:
   * **(a) nền bone — NHẬN.** Nó làm mặt trắng của card đọc ra là một tầng
     riêng, tức đòn nhấn 3 của §2.3 mạnh hơn. Đổi §2.2 từ 2 mặt thành 3 mặt
     (`#fff` card · `#f7f6f3` canvas · `#f2f2f2` vùng nhấn) là một cấu trúc chặt,
     không phải nới lỏng.
   * **(b) serif + 3 bậc cỡ — NHẬN CÓ ĐIỀU KIỆN.** Chỉ cấp cho **tiêu đề mục và
     hero**, khoá danh sách ngay khi ghi vào §1.6; thân bài giữ Montserrat tuyệt
     đối. Không khoá thì serif sẽ bò vào tên sản phẩm và giá trong 2 tuần.
   * **(c) hạt giấy — NHẬN.** Rẻ, không đụng trục nào của luật, và là thứ khiến
     nền bone không bị đọc thành "xám nhạt bị lỗi".
2. **Screen này có thay `desktop-atelier.html` / `desktop-editorial.html` làm
   hướng thử chính không?** Nếu chọn hướng minimalist thì 3 file kia nên dọn,
   kẻo lại 5 hướng cùng sống như hồi 21/08.
3. **Screen `nam` đang là trang chủ CHUNG, không phải trang chủ ngành Nam.**
   Nội dung nó là hero chiến dịch + 6 danh mục chung, chưa có cây danh mục ngành
   Nam hay mục "Mua theo dịp" như screen này. Đổi nó thành trang chủ ngành Nam
   thật (đổi data + cây danh mục), hay giữ làm trang chủ chung rồi thêm screen
   `nam` riêng?
4. **Screen `beauty`** hiện là trạng thái rỗng nói rõ "chưa dựng". Dựng cùng
   khuôn screen Nữ hay chờ chốt hướng trước?
5. **`.dk-dept:hover`** vẫn là câu hỏi mở từ `HOMEPAGE.md`: `#404040` của bản
   gốc hay `#333` như file mới đang dùng.
