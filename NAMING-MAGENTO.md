# Quy chuẩn đặt tên & ánh xạ component — DAFC

> Chốt 25/08/2026. Đích: bộ demo/thiết kế bàn giao được cho đội dev Magento của DAFC
> **không phải dịch tên**. Luật style/typo vẫn do `STYLE-RULES.md` phân xử; file này chỉ
> lo **tên gọi và ánh xạ**. Rule stack hiện hành: `STYLE-RULES.md` Phần 8 (bỏ Tailwind + shadcn).

---

## Phần 0 — Vì sao làm việc này khi khách chưa chốt font/style

Tên là tầng **không phụ thuộc** font/style. Chốt tên trước thì khi khách chốt style chỉ
phải điền **giá trị** vào các slot đã đặt tên sẵn — markup đứng yên. Dự án đã tự chứng minh:
4 bộ da (`skin-mp` · `skin-mt` · `skin-mk` · mặc định) dùng chung một bộ markup.

| Chốt được ngay | Phải chờ khách |
|---|---|
| Tên component + ánh xạ sang block Magento | Font family |
| **Vai** chữ T1–T7 | **Số px** của thang |
| **Tên** token (`--ink-body`, `--surface-sticky`) | **Giá trị** token |
| Từ vựng trạng thái (`_active`, `_open`) | Bảng màu |
| Lưới 12 cột (theme đã cố định Bootstrap 3) | Viền · bo góc · bóng |
| Hợp đồng bàn phím/a11y theo WAI-ARIA APG | — |

---

## Phần 1 — `shop.dafc.com.vn` thật sự chạy gì *(đo 25/08/2026, 3 trang)*

| Tầng | Thực tế |
|---|---|
| Nền tảng | Magento 2, theme riêng `frontend/Dafc/dafc` |
| Gốc theme | Họ module **MGS** (`MGS_Mpanel` · `MGS_Mmegamenu` · `MGS_Lookbook`) — nhánh Luma: LESS + jQuery + RequireJS + `Magento_Ui` |
| Lưới | **Bootstrap 3** — `.col-md-*` `.col-xs-12` `.hidden-lg` (`col-xs-*` và `hidden-*` chỉ tồn tại ở BS3) |
| Dựng trang CMS | **Magezon Page Builder** (20–25 tham chiếu mỗi trang) |
| Bộ lọc | **Amasty Shopby** (`filter-options`) |
| Carousel | **3 thư viện cùng tải một trang**: Swiper · Owl · Slick |
| Lightbox · icon | magnific-popup · Font Awesome |
| KHÔNG có | Hyvä · Tailwind · Alpine · React |

**Phương ngữ class, đo trên 1.486 lượt:**

| Kiểu | Tỉ lệ | Ví dụ |
|---|---|---|
| kebab-case phẳng | **42%** | `product-item-name` · `mega-menu-sub-title` |
| một từ | 39% | `.menu` · `.logo` · `.action` |
| Bootstrap grid/helper | 10% | `.col-md-3` · `.hidden-lg` |
| snake_case (lộn xộn) | 4% | `.right_content` |
| utility bịa tay | 2% | `.margin-top40` |
| **BEM `__`** | **0,6%** | — |
| **BEM `--`** | **0%** | — |

> Kết luận quan trọng: **site DAFC không chạy BEM.** Đưa `block__element--modifier` sang
> cho họ là đưa một phương ngữ thứ ba vào một codebase vốn đã lẫn 3 kiểu.

---

## Phần 2 — Phương ngữ chốt: kebab-case phẳng, kiểu Magento

**Q1. Block và element nối bằng `-`, không dùng `__`, không dùng `--`.**
`dafc-product-card` · `dafc-product-card-name`. Khớp Magento core (`product-item-name`,
`product-item-photo`) và khớp 42% class đang chạy trên site.

**Q2. Trùng vai với block Magento → dùng THẲNG tên của họ, đừng đặt tên mới.**
Đây là quy tắc đắt giá nhất: dev grep một phát ra chỗ sửa, không phải dịch. Danh sách ở Phần 4.

**Q3. Biến thể = class thứ hai, không phải hậu tố.**
Theo đúng `.action.primary` · `.field.required` của Magento: `class="dafc-tile compact"`,
không phải `dafc-tile--compact`.

**Q4. Trạng thái = tiền tố `_`.**
`_active` · `_hidden` · `_open`. Đây là thứ widget Magento (`mage/collapsible`,
`Magento_Ui/js/modal/modal`) **tự gắn lúc chạy** — nên nó không xuất hiện trong HTML tĩnh
lúc đo, nhưng dev nhìn `_open` là biết ngay ai điều khiển nó.

**Q5. Namespace `dafc-` cho phần thiết kế MỚI** mà Magento không có sẵn block tương ứng.

> **NGOẠI LỆ 26/08/2026 — FILE FIGMA KHÔNG DÙNG TIỀN TỐ `dafc`** *(lệnh user: "trong bộ của file
> figma bạn không cần đặt tên có chữ dafc vào đâu. tôi hướng đến sử dụng lâu dài nên cứ đặt tên
> chung nhất có thể là được")*.
>
> Hai tầng phục vụ hai người dùng khác nhau, nên tách:
>
> | | Tên dùng | Vì sao |
> |---|---|---|
> | **Code bàn giao** (`home.html`, theme Magento) | **giữ `dafc-`** theo Q5 | dev grep một phát ra phần custom, không lẫn với block core |
> | **Thư viện Figma** (`Test agent`) | **bỏ hẳn `dafc`**, đặt tên phổ thông nhất | file này hướng dùng LÂU DÀI, tái dùng qua nhiều dự án — tên gắn tên khách là hết tái dùng |
>
> Đã đổi 26/08: `dafc-badge`→`badge` · `dafc-tab-item`→`tab-item` · `dafc-tab-list`→`tab-list` ·
> `dafc-select-*`→`select-*` · `dafc-switch`→`switch` · `dafc-cart-row`→`cart-row` ·
> `dafc-cart-gift`→`cart-gift` · `dafc-qty`→**`quantity-stepper`** · `dafc-empty`→**`empty-state`** ·
> `dafc-skeleton`→`skeleton`. Sáu tên trang đổi theo. Ánh xạ sang block Magento vẫn nằm trong
> **mô tả** của từng component, nên không mất giá trị bàn giao.

---

## Phần 3 — Thang chữ đặt theo VAI *(ĐÃ ÁP vào `home.html` 25/08/2026)*

Tên cũ (`text-sm/base/md/lg/xl/micro`) là key của `tailwind.preset.js` — đặt theo **cỡ tương
đối**. Cách đó **đã gãy một lần trong chính dự án này**: preset không có bậc 14px, tới khi
luật §1.5 thêm vai "thân bài 14px" thì phải bịa thêm key `text-md`. Font chưa chốt thì thang
còn đổi, nên tên phải mang **vai**, không mang cỡ.

| Tên mới | Ra | Vai (§1.2) | Dùng thật ở `home.html` |
|---|---|---|---|
| `.t-title` | 24/32 | T1 tiêu đề trang · hero | h1/h2/h3, hero (13) |
| `.t-section` | 18/24 | T2 tiêu đề mục · sheet · modal | h2 tiêu đề mục (8) |
| `.t-body` | 14/20 | T3 thân bài cấp 1 | tên nhà mốt, tiêu đề danh mục (28) |
| `.t-ui` | 12/16 | T4 chữ trong linh kiện | nút, tab, "xem thêm" (58) |
| `.t-copy` | 12/18 | T5 đoạn nhiều dòng | `<p>`, danh sách footer (49) |
| `.t-micro` | 10/14 | T7 vi mô | giá gạch, dòng pháp lý (26) |
| `.t-label` | 12/16 · 500 · HOA | T6 nhãn cấp 2 | theme.css cấp (41) |
| `.t-label-1` | 14/20 · 500 · HOA | T3 nhãn cấp 1 | theme.css cấp |

**T4 và T5 cùng cỡ 12px**, khác ở nhịp dòng — và đó là lý do tách 2 vai: `.t-ui` (12/16)
cho chữ một dòng trong linh kiện, `.t-copy` (12/18) cho chữ đọc thành đoạn. Cách quyết:
*"chữ này có xuống dòng không?"*

`.label` → `.t-label` đổi cùng lượt (tên cũ đụng nghĩa với nhãn form 400 chữ thường ở §5).
Hai class nhãn gộp cỡ + 500 + HOA vào một chỗ vì §1.1 bắt 500 luôn đi cặp chữ hoa.

**Đã đo lại sau khi đổi** (`http://localhost:8125/home.html`): 7/7 vai ra đúng số, `.t-label`
giữ đủ `500 + uppercase`, không còn tên cũ trong DOM, console sạch. **Không đổi một pixel nào.**

---

## Phần 4 — Ánh xạ component → block Magento

Cột cuối: **✅ = đã xác nhận có thật** trong HTML của site (đo 25/08), *(core)* = block chuẩn
Magento nhưng chưa gặp trên 3 trang đã tải.

| Vai | Tên dùng khi bàn giao | Nguồn | ✅ |
|---|---|---|---|
| Thẻ sản phẩm | `product-item-info` · `product-item-photo` · `product-item-name` · `product-item-details` | Magento core | ✅ |
| Giá + giá gạch | `price-box` · `old-price` · `special-price` | Magento core | ✅ (`special-price` core) |
| Nút chính / phụ | `action primary` · `action secondary` | Magento core | ✅ |
| Khung trang | `page-wrapper` · `page-main` · `column main` | Magento core | ✅ |
| Thanh công cụ PLP (sắp xếp, phân trang) | `toolbar` · `toolbar-sorter` · `pages` | Magento core | ✅ |
| Đường dẫn | `breadcrumbs` | Magento core | ✅ |
| Trường nhập | `fieldset` · `field` · `control` · `label` | Magento core | ✅ |
| Thông báo | `messages` · `message success/error` | Magento core | ✅ |
| Giỏ thu gọn | `minicart-wrapper` · `block-minicart` · `minicart-items` | Magento core | ✅ |
| Bộ lọc | `filter-options` · `filter-options-title` · `filter-options-content` | **Amasty Shopby** | ✅ |
| Mega menu | `mega-menu-item` · `mega-menu-content` · `sub-menu` · `level0/1/2` | **MGS_Mmegamenu** | ✅ |
| Section trang chủ / chiến dịch | `mgz-element` · `mgz-element-inner` | **Magezon Page Builder** | ✅ |
| Ô tìm kiếm + gợi ý | `block-search` · `search-autocomplete` | Magento core + MageWorx | *(core)* |
| Ô chọn màu/size | `swatch-attribute` · `swatch-option` | Magento_Swatches | *(core)* |
| Lớp nổi (modal/sheet) | `modal-popup` · `modal-slide` · `modal-content` | `Magento_Ui/js/modal` | *(core)* |

Mọi thứ **không có** trong bảng này là thiết kế mới → `dafc-*`.

---

## Phần 5 — Kho component đã cài: thiết kế THEO cái này

Không nhập thư viện mới. shadcn · Radix · Base UI · Ark UI · Shoelace đều **không cắm được
vào theme này mà không viết lại theme**.

| Vai | Đang có sẵn | Việc của thiết kế |
|---|---|---|
| Carousel | **Swiper** (đang trội) | Vẽ trong khả năng Swiper. **Đề xuất khách bỏ Owl + Slick** |
| Modal · dropdown · accordion · tabs | Widget lõi Magento | Dùng lại; đừng vẽ tương tác widget không làm được |
| Lưới | Bootstrap 3, 12 cột | Ra spec theo 12 cột để rơi thẳng vào code |
| Icon | Font Awesome | **Điểm yếu cho hàng luxury** — bộ uicons thin-rounded của demo là bản thay đúng hướng |
| Section CMS | Magezon Page Builder | **Ràng buộc thiết kế**: layout dựng được bằng block Magezon ≈ 0 công dev; ngoài khả năng đó = custom từng cái |
| Bộ lọc | Amasty Shopby | Cấu trúc do module quy định, chỉ restyle được |
| Chuẩn hành vi / a11y | *(yếu)* | Giữ **WAI-ARIA APG** làm thước đo — widget Magento kém khoản này |

**Hai điều nên đưa vào báo cáo cho khách:** (1) 3 thư viện carousel cùng tải một trang +
Bootstrap 3 đã hết vòng đời + Font Awesome + page builder = front-end nặng và trùng lặp;
(2) Magezon là **ràng buộc thiết kế**, phải biết giới hạn của nó trước khi vẽ section mới.

---

## Phần 6 — Ngoại lệ ghi danh

**`dk-*` (19 tên / 32 lượt trong `home.html`) KHÔNG đổi tên.** Đây là bản port 1:1 menu bar
từ `desktop.html` — giữ nguyên tên để port ngược là copy thẳng. Gồm cả 2 tên còn mang `--`
(`dk-nav-fade--prev` · `dk-nav-fade--next`). Đổi ở đây là gãy tính chất đó.

**`index.html` · `desktop.html` không đụng tới** (Phần 8.2 STYLE-RULES) — hai file chạy trên
`tailwind.css` build sẵn, user chốt 25/08 là giữ nguyên.

---

## Phần 7 — Đợt quét còn lại: CHƯA LÀM, chờ duyệt bảng tên

Áp Q1–Q4 cho phần còn lại của `home.html`:

| Việc | Quy mô |
|---|---|
| `__` → `-` | **100 tên / 192 lượt** |
| `--` → class thứ hai | **14 tên / 33 lượt** |
| `is-*` → `_*` | 2 tên / 6 lượt (`is-alt` · `is-main`) |
| Giãn tên viết tắt | **57 tên** |

Phần viết tắt là lý do đợt này **không nên chạy sed mù**. Giải mã từ chính CSS:

| Hậu tố | Số tên | Là gì (đọc từ rule + thẻ HTML) | Đề xuất |
|---|---|---|---|
| `__x` | 13 | khối chữ, `max-width: 46ch` | `-text` |
| `__m` | 12 | khối ảnh, `aspect-ratio` + `overflow:hidden` | `-media` |
| `__c` | 5 | thẻ bấm được (`<button>`) | `-card` |
| `__i` | 5 | `<input>` | `-input` |
| `__b` | 5 | thân dưới của card | `-body` |
| `__f` | 3 | `<form>` | `-form` |
| `__t` | 3 | cụm chữ xếp dọc | `-text` ⚠ **đụng `__x`** |
| `__l` | 3 | nhãn trong nút (`<span>`) | `-label` |
| `__in` | 3 | lớp lồng trong (grid) | `-inner` |

`__x` và `__t` cùng nghĩa "cụm chữ" mà mang hai tên — chính là kiểu mơ hồ mà viết tắt gây ra,
và phải phân xử bằng tay chứ máy không đoán được.

**Cần duyệt trước khi chạy:** bảng 114 tên cũ → tên mới. Duyệt xong là một lượt thay + đo lại,
không đổi pixel nào — y như đợt thang chữ ở Phần 3.
