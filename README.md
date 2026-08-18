# Demo — E-commerce Flow (Mobile + Desktop) · DAFC / Versace · HTML + Tailwind

Demo e-commerce flow cho **DAFC** (nhà phân phối đa thương hiệu luxury tại Việt Nam), dựng bằng HTML + Tailwind CSS thuần, không dùng framework. Nội dung sản phẩm là **dữ liệu thật** scrape từ `shop.dafc.com.vn` (re-scrape 07/08/2026): 16 SP thời trang Versace + 8 nước hoa (Versace/D&G/Montblanc/Moschino), kèm **ảnh thật tải từ `cdn.dafc.com.vn`** (1200×1484, đặt tên `pN-*.jpg` / `x*.jpg` / `b*.jpg` trong `assets/` — chỉ bản mobile dùng; desktop vẫn dùng bộ `p*.png` cũ). Giá giảm/badge -% là dữ liệu tự tạo để demo.

Hai phiên bản dùng chung assets/tokens/tailwind.css, **nối với nhau ở mốc 768px** (xem "Cầu nối responsive"):
- `index.html` — bản **mobile**, dùng khi bề ngang **< 768px** (thiết kế theo 360–412px)
- `desktop.html` — bản **desktop**, dùng khi bề ngang **≥ 768px**, nội dung bó trong max-w 1440 (xem mục "Bản desktop")

## Chạy

Mở `index.html` **hoặc** `desktop.html` bằng trình duyệt là xong — không cần build, không cần internet (Tailwind đã biên dịch sẵn vào `tailwind.css`). Mở file nào cũng được: cầu nối sẽ tự đưa sang bản đúng với bề ngang cửa sổ.

> Nếu mở bằng `file://` mà ảnh không hiện, chạy server tĩnh:
> ```bash
> python3 -m http.server 8000    # rồi mở http://localhost:8000
> ```

## Cấu trúc

```
demo-flow/
├── index.html          — bản MOBILE (router, state, tất cả screens)
├── desktop.html         — bản DESKTOP ≥768px, khung thiết kế 1440 (fork từ index.html, giữ nguyên state/router/i18n)
├── in.css              — input Tailwind (3 directive @tailwind)
├── tailwind.css         — CSS đã compile (build từ in.css, quét CẢ 2 file html, PHẢI commit)
├── tokens.css            — biến CSS design token (build ra từ tokens07.json, PHẢI commit)
├── tokens07.json         — export gốc từ Figma variables (nguồn sự thật)
├── gen_tokens.py          — script sinh tokens.css từ tokens07.json
├── tailwind.config.js     — cấu hình Tailwind, map class → CSS variable
├── assets/                — ảnh sản phẩm/logo/swatch (đường dẫn dùng qua biến A = 'assets/' trong 2 file html)
├── .gitignore
└── README.md
```

## Flow màn hình

`PLP → PDP (6 biến thể: pdp, pdp2..pdp6) → Cart → Login (6 view: login/register/otp/reginfo/setpass/forgot) → Account (6 tab) → Order detail → Checkout → Done`

Ngoài luồng mua hàng còn 3 trang tĩnh vào từ footer: `privacy` · `terms` · `returns` (xem mục "Trang tĩnh / chính sách").

- Router SPA thủ công trong `index.html`: `FLOW`, `RENDER`, `go(name)`, `history`.
- Đăng ký kiểu OTP-first (Figma `3107:50758` + `3354:47931`): nhập SĐT → **Gửi mã OTP** → xác thực 6 ô (nút "Nhận lại mã (60s)" đếm ngược; link "thay đổi số điện thoại" quay lại bước trước, giữ nguyên số đã nhập) → màn `reginfo` mới điền Họ tên / Email / Mật khẩu → tạo tài khoản + đăng nhập luôn. Quên mật khẩu dùng chung màn OTP, phân nhánh bằng state `authFlow` (`register` → reginfo, `forgot` → setpass).
- 6 biến thể PDP, mỗi bản gắn 1 sản phẩm khác nhau (SP#1–SP#6), khác nhau về layout size (chip vs dropdown), vị trí Payment Offer, hiệu ứng gallery/lightbox, font (Inter cho pdp6)...
- Picker "Chọn size" (dùng cho các PDP dropdown) theo Figma `3281:40140` — hàng 52px, nền mờ 60%, hàng hết hàng gạch ngang + "Nhận thông báo", link "Hướng dẫn chọn size", CTA 48px. **Markup giống nhau ở cả 2 bản** (mobile = bottom sheet, desktop = dialog giữa màn hình).
- Menu mobile (`MENU_DATA`): mỗi tab Nam/Nữ/Làm đẹp mở đầu bằng **"Sản phẩm mới"** (bổ sung 10/08/2026 theo yêu cầu — vị trí "New In" của Farfetch, Figma Menu `3358:54912` chưa có dòng này). Bấm vào mở **submenu theo menu THẬT của shop.dafc.com.vn nhưng BỎ tầng giới tính** (tab đã là giới tính rồi): nhóm "Bộ sưu tập mới" (`MENU_NEW_COLLECTIONS` — MCM AW26 / Stefano Ricci / D&G Maiolica 2026, data thật 10/08/2026) + nhóm "Danh mục" theo giới tính đang chọn (Nữ thêm Trang sức, đúng site thật) + Quà tặng. Submenu hỗ trợ item dạng `{header}` — tiêu đề nhóm 12px muted, không bấm được. Site thật không có mục làm đẹp trong Sản phẩm mới → tab Làm đẹp giữ `sub=null`, bấm là sang thẳng PLP.
- **Desktop đã chuẩn hoá theo (10/08/2026)**: `MENU_DATA` + `MENU_NEW_COLLECTIONS` copy y hệt mobile; subheader thêm mục **"Sản phẩm mới" đứng đầu** (`DK_NAV_CATS` → `{newIn:true}`, Header component Figma `2171:13006` chưa có mục này). Mega panel dựng 3 cột: **Bộ sưu tập mới · Nam · Nữ** — desktop **GIỮ tầng giới tính** (khác mobile) vì subheader không gắn giới tính và mọi mục khác cũng dựng 2 cột Nam/Nữ; đúng luôn với menu thật của DAFC. Helper `splitByHeader()` cắt mảng `items` (khai 1 cột kiểu mobile, có `{header}` xen giữa) thành nhóm để đổ ra cột.
- i18n VI/EN thật: từ điển 2 chiều + regex cho chuỗi có số, áp dụng qua `applyLang()`, gọi lại mỗi khi render màn mới.
- Settings FAB (góc phải dưới): đổi ngôn ngữ + đổi font (Montserrat/Inter/Plus Jakarta Sans).
- **Nút về đầu trang `#topFab`** (góc phải dưới, ngay trên Settings FAB) — mọi màn, cả 2 bản. Xem mục "Nút về đầu trang".

## Quà tặng trong giỏ (13/08/2026, CẢ 2 BẢN)

Hai cơ chế theo yêu cầu user, **cùng chạy trong màn Giỏ hàng**:

| Cơ chế | Điều kiện | Thẻ quà nằm ở đâu |
|---|---|---|
| **Theo sản phẩm** | item có field `gift` **và đang được tick** | NGAY DƯỚI đúng dòng sản phẩm đó (`[data-gift-of="<index>"]`) |
| **Theo đơn hàng** | tạm tính (item đang tick × số lượng) chạm mốc trong `ORDER_GIFT_TIERS` | khối `#orderGift` ngay dưới danh sách giỏ (`[data-gift-tier="<mốc>"]`) |

### Thẻ quà = thẻ sản phẩm trừ 3 thứ

Theo chỉ đạo user: thẻ quà dùng **đúng khuôn thẻ sản phẩm** trong giỏ (ảnh 100×133, brand 14 Medium, tên 14, phân loại 12, giá ghim đáy) — chỉ khác:

| Bỏ đi | Vì sao |
|---|---|
| ô tick | quà không phải thứ người dùng chọn mua, nó theo điều kiện. Vẫn chừa đúng cột 16px + gap 8 để **ảnh quà thẳng hàng với ảnh sản phẩm** phía trên |
| nút xoá | quà không tự bỏ được — muốn bỏ thì bỏ điều kiện (bỏ tick sản phẩm / giảm số lượng) |
| stepper | số lượng luôn 01, in tĩnh và **nằm sát mép phải** — thẳng cột với mép ngoài stepper của thẻ sản phẩm và với nút "Đổi quà" ở hàng nhãn |

> Số "01" từng có `margin-right:28px` để gióng theo **con số** của stepper. Đã bỏ (chỉ đạo user 13/08/2026): quà không tăng giảm số lượng được, chừa sẵn chỗ cho một nút "+" không tồn tại chỉ làm thẻ quà trông như bị thiếu mất nút.

Giá in `0 ₫` kèm giá gốc gạch ngang; badge "Quà tặng" đè góc trên trái ảnh — đúng chỗ thẻ sản phẩm để badge `-%`. Nhãn tên chương trình chừa đúng cột 16px + gap 8 như thẻ quà nên **thẳng hàng với ảnh**, không thò ra sát mép.

### Nền quà: `#fafafa`, không phải `#f5f5f5` (13/08/2026)

Thang xám của project chỉ có 4 bậc: `#ffffff` → **`#fafafa`** (`bg-accent-0`) → `#f5f5f5` (`bg-secondary` / `border-1`) → `#e5e5e5` (`border`).

Ban đầu thẻ quà dùng `bg-secondary` `#f5f5f5` — **cùng đúng tông với panel tổng tiền** (`discountPanel`, full-bleed `py-6`). Hệ quả: một dải xám cao 185px nằm giữa danh sách sản phẩm trắng mang **cùng sức nặng thị giác với cả khối tóm tắt đơn**, trong khi nó chỉ là phần đính kèm của 1 dòng hàng. Đã hạ 1 bậc xuống `bg-accent-0` `#fafafa` — vẫn tách được khỏi nền trắng nhưng không còn tranh vai với panel tổng.

3 phương án đã cân, ghi lại để không phải cân lại:

| | Cách làm | Vì sao không chọn / chọn |
|---|---|---|
| A | `#fafafa` full-bleed | **ĐANG DÙNG.** Giữ được tính "dính vào dòng hàng phía trên" (full-bleed, không margin), nhẹ đi 1 bậc, không thêm viền nào nên không phạm "Quy ước border" |
| B | Nền trắng + card viền bao (kiểu card CTKM) | Viền 4 cạnh là hợp quy ước, nhưng card có margin ngang → thẻ quà **tách rời** khỏi dòng sản phẩm, mất đúng thứ cần nói: "quà này của món ở trên" |
| C | Bỏ nền, dùng rail dọc 1px bên trái | Nhẹ nhất, đúng ngôn ngữ rail của cây danh mục bộ lọc, nhưng quà **theo đơn** không thuộc dòng nào nên rail vô nghĩa ở nửa số trường hợp |

### Quà theo đơn: mỗi mốc là một ô, không có title lớn

Chỉ đạo user (13/08/2026): **bỏ title lớn "Quà tặng theo đơn hàng" và số đếm "N quà"** — tên promo chi tiết ("Ưu đãi đơn từ 100 triệu") đã nói đủ việc, thêm một tầng tiêu đề nữa chỉ làm loãng. **Thoả thêm 1 mốc thì thêm 1 ô y hệt**, xếp dưới, cách nhau 8px.

| Trạng thái mốc | Ô hiển thị gì |
|---|---|
| Đã đạt | nhãn tên promo + thẻ quà đầy đủ (`[data-gift-tier]`) |
| Chưa đạt (mốc kế tiếp) | **cùng khuôn ô đó**, cùng nhãn tên promo, chỉ thay thẻ quà bằng dòng "Mua thêm X ₫ để nhận …" + thanh tiến độ (`[data-gift-next]`) |

Nhờ dùng chung một khuôn ô, lúc chạm mốc người dùng thấy đúng cái ô đang theo dõi "sáng" lên thành quà thật, chứ không phải một khối lạ mọc ra.

> Đây là vòng thứ 3 của khối này, ghi lại để không lặp: (1) mỗi quà một khối xám riêng + nhãn section trên nền trắng → rời rạc; (2) gom tất cả vào **một dải chung** kèm title lớn + số đếm; (3) **bản hiện tại** — bỏ hẳn title lớn, mỗi mốc là một ô độc lập mang tên promo. Cả 3 lần đều chỉ đổi `orderGiftInner()`, thẻ quà (`giftCard`) không đụng tới.

Hai loại quà giờ dùng **đúng cùng một khuôn ô**: quà kèm sản phẩm dính ngay dưới dòng hàng của nó, quà theo đơn xếp trong khối `#orderGift` — đều là `giftGroupHTML()` với `tone='tint'` (tự mang nền). `tone='bare'` (không tự tô nền) giữ lại cho trường hợp cần lồng vào một dải có nền khác.

### Mỗi quà nằm trong một nhóm mang tên chương trình

Quà không đứng lẻ: `GIFT_PROGRAMS` gom quà theo chương trình, nhãn tên chương trình nằm ngay trên thẻ quà (`Quà tặng kèm túi Lou mini` · `Ưu đãi đơn từ 100 triệu` · `Ưu đãi đơn từ 150 triệu`). Nhóm là chỗ để **đổi quà**: chương trình nào có nhiều hơn 1 lựa chọn thì hiện nút **"Đổi quà"**.

**`#giftSheet` — mobile trượt lên từ đáy, desktop popup giữa màn** (yêu cầu user 13/08/2026). Trước đó danh sách xổ *inline* ngay trong nhóm: nó đẩy cả danh sách giỏ xuống và lẫn với chính thẻ quà đang hiển thị. Giờ tách hẳn ra sheet riêng, dùng đúng khuôn `#sizeSheet`/`#pickSheet` sẵn có nên desktop chỉ cần thêm class **`.dk-modal`** vào panel là thành popup 480px giữa màn (bo 8, nền mờ, `max-width: calc(100vw - 64px)` nên dải hẹp 768 vẫn chừa mép). **Chạm 1 dòng là chọn xong + đóng**, không có nút xác nhận — giống `#pickSheet`, vì đây là chọn 1 giá trị chứ không phải hành động mua. Chọn lại đúng món đang dùng thì **không toast**. Ruột sheet dùng lại `giftOptionsHTML()` nên hàng lựa chọn chỉ có 1 nguồn markup.

```js
GIFT_PROGRAMS = {
  bagBundle: { name:'Quà tặng kèm túi Lou mini', gifts:['mini','edt'] },   // 2 lựa chọn -> đổi được
  tier100:   { name:'Ưu đãi đơn từ 100 triệu',   gifts:['scarf','edt'] },
  tier150:   { name:'Ưu đãi đơn từ 150 triệu',   gifts:['sneaker'] },      // 1 món -> không có nút đổi
}
giftPick = {}   // {chương trình: quà đang chọn}, rỗng = gifts[0]
```

`CART_BASE[i].gift` và `ORDER_GIFT_TIERS[].program` đều trỏ tới **key chương trình**, không phải key món quà — đổi quà là đổi trong chương trình, không phải đổi chương trình.

> Nút "Đổi quà" và danh sách chọn được **uỷ quyền ở gốc màn** (`root.dataset.giftWired` chống gắn chồng): nhóm quà bị chèn/dựng lại lúc chạy nên bind trực tiếp thì nhóm dựng sau không có handler.

> **2 bẫy đã sập khi làm nhóm quà, đừng lặp lại:**
> - Thumb trong danh sách đổi quà từng dùng `w-[40px] h-[46px]` — **2 class này không có trong `tailwind.css` build sẵn** nên ảnh bung ra kích thước gốc 1200×1484, đẩy nút radio ra ngoài màn hình và làm tính năng đổi quà không dùng được ở CẢ 2 BẢN. Đã đổi sang `w-[52px] h-[60px]` (kích thước đã có sẵn, mini cart dùng chung). **Class tuỳ ý mới phải kiểm tra trong `tailwind.css` trước khi dùng.**
> - Nhóm quà dựng lại theo so sánh `outerHTML` là **luôn luôn khác**: `wireLazy()` đóng thêm `.loaded` + `data-lazy-wired` vào `<img>` ngay sau khi chèn, nên chuỗi vừa sinh không bao giờ khớp DOM hiện tại → nhóm bị đập đi dựng lại mỗi lần bấm bất kỳ đâu trong giỏ (mất animation đang chạy, mất focus). Giờ so bằng **chữ ký `data-sig`** = `chương trình|quà đang chọn`.

```js
GIFT_CATALOG     = { mini | edt | scarf | sneaker }   // 4 món quà, kèm giá gốc để gạch ngang
ORDER_GIFT_TIERS = [ {min:100tr, program:'tier100'}, {min:150tr, program:'tier150'} ]
CART_BASE[0].gift = 'bagBundle'                       // Túi da Lou mini kèm chương trình bagBundle
```

### Giỏ demo: 3/5 món có khuyến mãi (13/08/2026, +đầm pre-order 14/08/2026)

`item-cart` có 2 trạng thái giá mà trước đây giỏ demo không dùng tới trạng thái nào: giá đen trơn, và **giá đỏ + badge `-%` + giá gốc gạch ngang**. Giờ 3 trong 5 món mang `off`/`was` để thấy đủ cả hai (món thứ 5 là đầm pre-order thêm 14/08/2026 — xem section "Pre-order").

Số **không bịa** — lấy đúng `off`/`was` của chính SKU đó trong `PRODUCTS`:

| Món | Promo | Nguồn |
|---|---|---|
| Giày loafer da Manu | `-30%` · gốc 50.354.000 ₫ | đã có sẵn trong `PRODUCTS` — **trước đây PLP/PDP hiện -30% nhưng vào giỏ lại thành nguyên giá** |
| Thắt lưng da mặt khóa tròn 3.5 cm | `-15%` · gốc 20.676.000 ₫ | thêm mới vào **cả `PRODUCTS` lẫn `CART_BASE`** để 2 nơi không lệch |

> **Giá bán (`now`/`price`) giữ nguyên** — chỉ thêm phần trang trí `off`/`was`. Màn Thanh toán vẫn chỉ in giá phải trả (tóm tắt gọn, không mang badge). Từ 14/08/2026 giỏ mặc định là **186.057.000 ₫** (5 món, gồm đầm pre-order 72.557.000 ₫) — các mốc quà theo đơn đã dời 100/150tr → **150/200tr** để giữ nguyên kịch bản demo.

3 hàm lọc giỏ, **đừng dùng lẫn**:

| Hàm | Nghĩa | Dùng ở |
|---|---|---|
| `CART` | mảng gốc, giữ cả món đã xoá | chỉ để tra theo chỉ số `data-row` |
| `cartItems()` | chưa xoá (kể cả đang bỏ tick) | dựng màn giỏ, đếm số món trong giỏ |
| `cartSelected()` | chưa xoá **và** đang tick = **đơn hàng thật** | checkout, `miniCart`, `placeOrder` |

**Điều kiện thay đổi là quà đổi NGAY**, không cần reload/điều hướng: tăng số lượng đủ mốc → quà mốc đó hiện tại chỗ; bỏ tick / giảm số lượng / xoá món → rớt mốc thì quà rút đi. Mốc đặt quanh giá trị giỏ mặc định (186.057.000 ₫ từ 14/08/2026) nên demo được cả 2 chiều: **mốc 150tr đã đạt sẵn** (bỏ tick đầm pre-order hoặc túi Lou là rớt), **mốc 200tr chỉ cần +1 số lượng** bất kỳ là chạm (món rẻ nhất 15,6tr cũng đủ).

### Kéo theo: giỏ hàng giờ có STATE THẬT

Đây là điều kiện bắt buộc để có cơ chế 2 — trước đây không thể làm:

- `CART[i].qty` **trước đây chỉ nằm trong DOM** (stepper sửa chữ, không ai đọc lại) và `CART_SUBTOTAL` là **hằng số in cứng 113.500.000**. Giờ: `qty` + `sel` (tick) + `removed` (đã xoá) là state, `cartSubtotal()` cộng động, `cartItems()` = các món chưa xoá.
- Mọi thao tác đổi giỏ gọi **`refreshCartAll(root)`** — thứ tự bắt buộc: tính tiền trước (`refreshCartSummary`), dựng quà sau (`refreshCartGifts`), vì quà theo đơn đọc `cartSubtotal()`.
- `refreshCartGifts` chỉ chèn/gỡ đúng dòng quà cần đổi và **chỉ chạy animation cho quà VỪA xuất hiện** (so danh sách `data-gift-tier` trước/sau) — quà đang có mà nháy lại mỗi lần bấm +/− thì rối mắt.
- Dòng quà mới dùng class **`.gift-in`**, KHÔNG dùng `.reveal`: `.reveal` đứng ở `opacity: 0` cho tới khi IntersectionObserver gắn `.in`, mà observer chỉ quét lúc `wire()` → chèn sau đó là dòng quà **nằm im vô hình**. `.gift-in` cũng cố ý **không có `animation-fill-mode: both`** để trạng thái nghỉ luôn là nhìn thấy được.
- Chèn DOM lúc chạy → gọi `applyLang(el, 'en')` cho phần vừa chèn khi đang ở EN, không thì dòng quà mới hiện tiếng Việt giữa giao diện tiếng Anh.

**Sửa theo các lỗi lộ ra khi làm việc này** (không nằm trong yêu cầu nhưng cùng đường đi — 22 phát hiện qua review đối kháng đã gom về đây):

| Lỗi | Người dùng thấy gì | Cách sửa |
|---|---|---|
| `cartItems()` chỉ lọc `removed`, không lọc `sel` | Bỏ tick 1 món: giỏ tính đúng 3 món nhưng **màn Thanh toán vẫn liệt kê 4 món** với tổng của 3, đơn đã đặt cũng lưu 4 món | Thêm **`cartSelected()`** (chưa xoá **và** đang tick) dùng ở checkout/`miniCart`/`placeOrder`; `cartItems()` chỉ để dựng màn giỏ |
| "Chọn tất cả" không tự đảo trạng thái ô tick của chính nó, lại còn in cứng `chk on` | Bấm bao nhiêu lần cũng chỉ tick lại tất cả; bỏ tick 1 dòng rồi quay lại màn thì ô tổng vẫn tick | Ô tổng **suy từ state** (`every(sel)`) lúc dựng lẫn trong `refreshCartAll`; handler tính đích từ state chứ không đọc class của chính nó |
| Xoá món chỉ gỡ DOM, `CART` không đổi | Tổng tiền / checkout / đơn đã đặt vẫn tính đủ 4 món | Đánh dấu `removed` (không `splice` vì các dòng sau còn tham chiếu chỉ số qua `data-row`) |
| `#cartCount` in cứng `(4)` | Xoá 1 món rồi rời màn quay lại: tiêu đề "Giỏ hàng (4)" nằm trên 3 dòng, badge 3, nhãn "Chọn tất cả ( 3 sản phẩm )" — 3 con số đá nhau | Đếm sống lúc dựng + cập nhật trong `refreshCartAll` |
| `refreshCartSummary` dựng lại `#discountLines` mà **không dịch lại** | Đang xem bản EN, bấm +/− một cái là khối tiền lật về tiếng Việt giữa giao diện Anh | `localizeNew(dl)` ngay sau `innerHTML` |
| `1.135 điểm thưởng` in cứng ở 4 màn | Tăng số lượng lên 158 triệu vẫn hứa "1.135 điểm"; bỏ tick hết thì "0đ" nhưng vẫn hứa 1.135 điểm | `rewardPointsEarned()` = tạm tính / 100.000 (đúng tỉ lệ ngầm của demo), chốt `ckOrderPoints` lúc đặt hàng cho màn Hoàn tất |
| Ưu đãi không chặn trần theo tạm tính | Bỏ tick hết: "Tạm tính 0đ · Giảm giá(JUNE2000) −2.000.000đ · Tổng cộng 0đ" — 3 dòng không cộng lại thành nhau | `cartDiscountTotal()` chặn trần; tạm tính 0 thì **không in dòng giảm giá nào** (mã vẫn giữ, tick lại là hiện lại) |
| Không chặn đặt hàng khi chưa chọn món nào | Bỏ tick hết vẫn bấm "Đặt hàng" được → đơn 4 món giá 0 ₫, màn Hoàn tất in "Tổng cộng 0đ" | `[data-checkout]` chặn + toast khi `cartSelected()` rỗng |
| `refreshCartCount` gọi `wire(root)` cho **cả màn** khi giỏ về rỗng | Xoá hết món: nút "Xem tất cả 3 chương trình" bấm 1 lần mở-rồi-đóng ngay (2 listener), popup đăng nhập khoá scroll 2 lần nên đóng xong cả trang không cuộn được | Chỉ `wire(list)` đúng khối vừa dựng |
| Badge "Quà tặng" 10px không đủ chỗ trong thumb 52px | Nhãn bị bẻ 2 dòng thành khối đen che 40% ảnh quà | `whitespace-nowrap` + bỏ `overflow-hidden` ở thẻ bọc để nhãn tràn vài px sang `gap-2` |
| `.rise` quá 6 khối thì `animation-delay` về 0 (`#orderGift` giờ luôn có mặt nên panel tổng bị đẩy xuống vị trí 7) | Vào màn giỏ ngắn: khối tổng tiền màu xám bay lên **trước** cả tiêu đề, đảo ngược thứ tự trên-xuống | Thêm `.rise:nth-child(n+7) { animation-delay: .26s }` chặn đuôi |

### Tổng tiền đã nối thông suốt

Màn Thanh toán và đơn đã đặt giờ dùng **cùng một nguồn tiền với giỏ**: thêm dòng `Giảm giá` khi có ưu đãi và "Tổng cộng" lấy `cartTotalNow()`. Trước đó giỏ trừ ưu đãi Rewards còn thanh toán lấy `cartSubtotal()` → bấm "Đặt hàng" là tổng **tăng lên** đúng bằng phần vừa được giảm, và đơn lưu lại cũng mất luôn dòng giảm giá.

`113,500,000đ` từng được in cứng ở 6 chỗ. Giờ tất cả đọc `cartSubtotal()`: `miniCart()` (số món + tổng), checkout (header "Thanh toán (n)", 2 dòng Tạm tính, Tổng cộng, dòng tổng thu gọn), `placeOrder()` (`sub`/`total` của đơn mới) và màn Hoàn tất. Riêng màn **Hoàn tất phải dùng `ckOrderTotal`** — tổng chốt lúc bấm Đặt hàng, vì ngay sau đó giỏ bị dọn rỗng nên `cartSubtotal()` về 0.

Các chuỗi mang số động (`Thanh toán (4)`, `Giỏ hàng của bạn (4)`, `Chọn tất cả ( 4 sản phẩm )`, `N quà`, `Mua thêm ... để nhận`) chuyển từ key cứng sang **luật regex `I18N_RE`/`I18N_REV_RE`**. Câu gợi ý mốc kế tiếp tách làm **2 text node** (vế có số tiền + tên quà) để tên quà dịch được bằng key riêng.

> **Khác bản cũ**: khối quà trước đây (`giftPicker`, "multi gift 5") chỉ hiện khi **đã đăng nhập** và luôn nói "Bạn đã đủ điều kiện nhận 2 quà" dù giỏ có gì — 2 radio chọn quà thì **chưa từng được nối handler**, bấm không ăn. Nay điều kiện là **giá trị đơn**, không phải trạng thái đăng nhập, nên khách vãng lai cũng thấy; không còn chọn 1-trong-2 vì mỗi mốc tặng đúng 1 món.

### Quà hiện suốt luồng đặt hàng (13/08/2026, cả 2 bản)

Không dừng ở giỏ nữa — quà đi hết luồng:

| Màn | Hiện gì | Nguồn |
|---|---|---|
| Giỏ hàng | thẻ quà đầy đủ (khuôn thẻ sản phẩm) + nhóm chương trình + đổi quà | state sống |
| **Thanh toán** | dòng quà trong "Tóm tắt đơn hàng", **quà kèm sản phẩm nằm ngay dưới sản phẩm đó**, quà theo mốc xếp cuối | `activeGifts()` |
| **Hoàn tất** | khối "Quà tặng kèm đơn (N quà)" dưới bảng thông tin đơn | `ckOrderGifts` |

Dòng quà ở tóm tắt dùng **`giftSummaryRow()`** — cùng khuôn dòng sản phẩm của tóm tắt (thumb 52×60, chữ 13/12/12) nên đọc liền mạch; khác 3 chỗ: badge "Quà tặng" trên ảnh, dòng thứ 3 là **tên chương trình** thay cho "phân loại · SL", giá `0 ₫`.

> **Màn Hoàn tất bắt buộc dùng bản chốt.** `placeOrder()` dọn giỏ rỗng ngay sau khi tạo đơn, nên `activeGifts()` lúc đó trả về rỗng. Chốt **cả món quà đang chọn** (`ckOrderGifts = [{pk, g}]`) chứ không chỉ key chương trình — người dùng đổi quà xong mới đặt hàng thì màn Hoàn tất phải in đúng món họ đã chọn. Cùng lý do với `ckOrderTotal` / `ckOrderPoints`.

> Quà **không cộng vào tiền** (0 ₫) nên không đụng "Tạm tính"/"Tổng cộng", và **không tính vào số món** ở "Thanh toán (n)" — n vẫn là `cartSelected().length`. Quà hiện cho cả khách vãng lai.

### Bản desktop (13/08/2026)

Đã port **nguyên cụm** sang `desktop.html` theo yêu cầu user — cùng data, cùng hàm dựng, cùng handler, cùng luật i18n, cùng CSS `.gift-in` + đuôi stagger `.rise`. Khác duy nhất là bố cục sẵn có của desktop (giỏ 2 cột, tóm tắt sticky bên phải): thẻ quà rộng bằng đúng dòng sản phẩm ở cả 1440 lẫn dải hẹp 1024/768.

**Kèm theo: sửa "Chọn tất cả" bản desktop** (user báo "hình như không hoạt động") — đúng lỗi mà bản mobile vừa sửa: handler đọc class của **chính ô tick tổng** thay vì đọc state, mà ô đó lại in cứng `chk on` nên bấm bao nhiêu lần cũng chỉ đi tick lại tất cả, không bao giờ bỏ tick được. Giờ trạng thái đích suy từ state (`items.every(sel)`), ô tổng cũng dựng từ state.

> **Chưa làm** (ngoài phạm vi yêu cầu): màn **Chi tiết đơn hàng** (Tài khoản → Đơn hàng) chưa liệt kê quà — `ORDERS[]` không mang field quà, chỉ có `ckOrderGifts` của đơn vừa đặt; thêm sản phẩm từ PDP vẫn **không tạo dòng giỏ mới** (chỉ tăng badge + mở sheet xác nhận) nên "chọn thêm sản phẩm" chỉ tick/tăng trong giỏ; danh sách đổi quà là inline trong nhóm, **chưa có sheet/modal riêng**.

## Pre-order (14/08/2026, CẢ 2 BẢN)

Hàng pre-order duy nhất là **SP#1 đầm lụa mini Broken Jewels** — ngày nhận dự kiến khai MỘT LẦN ở `PRODUCTS[0].preorder` (dd/mm/yyyy). Mọi nơi khác đọc từ đó, đổi ngày chỉ sửa 1 chỗ (ngày cũ 15/08/2026 in cứng trong markup đã suýt quá hạn — AUDIT ghi nhận):

Ở mọi chỗ hiển thị, NGÀY in đậm hơn phần chữ 1 nấc (`<span class="font-medium">`, yêu cầu user 14/08/2026) — hệ quả i18n: câu vỡ thành 2 text node nên phần chữ dịch bằng KEY TĨNH (`'Dự kiến giao hàng vào ngày'`, `'Dự kiến giao'`, `'Nhận hàng dự kiến'`, desktop thêm `'Pre-order · Nhận hàng dự kiến'`), luật regex cả-câu chỉ còn cho chuỗi nguyên 1 node (`#ccPre`, chi tiết đơn, ghi chú vận chuyển, "Nhận dự kiến …" ở màn Hoàn tất).

- **Thẻ sản phẩm ở PLP (17/08/2026, yêu cầu user — CẢ 2 BẢN)**: thẻ SP#1 trước đây gắn cứng badge **"New"** (`badge: i === 0 ? 'New' : ''`), bấm vào PDP lại thấy "Pre-order" — 2 nơi nói 2 chuyện. Nay badge **đọc từ data**: `badge: p.preorder ? 'Pre-order' : ''`, nên đổi cờ pre-order trong `PRODUCTS` là PLP đi theo, không phải nhớ sửa "thẻ số 0". Badge mang **`data-i18n-skip`** (chỉ khi chuỗi là wordmark `Pre-order`) — thiếu nó thì lượt dịch ngược EN→VN biến badge thành "Đặt trước". Áp cho cả 5 call site (`index.html` 2 · `desktop.html` 3: PLP danh mục, PLP thương hiệu, PLP tìm kiếm). **Chưa đụng** hàng gợi ý dưới PDP (`badge: i===3 ? 'New arrival' : ''`) — ở đó SP#1 vốn không mang badge nào nên không mâu thuẫn, muốn gắn Pre-order luôn thì nói.
- **PDP v1**: badge "Pre-order" xếp trên "New Season" ở gallery (cùng style pill); dòng "Dự kiến giao hàng vào ngày …" **nằm trên nút**, không còn nằm trong nút (yêu cầu user 14/08/2026) — nút về khuôn 1 dòng h-12 như 5 PDP kia, sticky CTA cũng vậy (dòng rút gọn "Dự kiến giao …"). Dòng ngày **căn trái** thẳng mép nút, không căn giữa (chỉnh theo yêu cầu user cùng ngày).
- **Giỏ hàng**: đầm đứng đầu `CART_BASE` (kịch bản "vừa đặt trước xong vào giỏ"), thẻ vẫn đúng khuôn item-cart, chỉ thêm badge "Pre-order" đè góc trên trái ảnh + 1 dòng "Pre-order · Nhận hàng dự kiến …" dưới phân loại.
- **Sheet xác nhận thêm giỏ** (`#ccPre`): nhắc lại đúng dòng ngày nhận — cả đường bấm từ PDP lẫn quick add PLP; hàng thường thì ẩn (fix finding AUDIT "Đặt trước và Thêm vào giỏ ra cùng một kết quả").
- **i18n**: chuỗi mang ngày dịch bằng **luật regex** (`Dự kiến giao hàng vào ngày …` ↔ `Estimated delivery …`, `Pre-order · Nhận hàng dự kiến …` ↔ `Pre-order · Estimated arrival …`) — không giữ key ngày cứng trong từ điển. Badge "Pre-order" mang **`data-i18n-skip`** (cơ chế mới trong `applyLang`): wordmark giữ nguyên ở mọi ngôn ngữ, không có nó thì lượt dịch ngược EN→VN biến badge thành "Đặt trước" (trùng chuỗi với nút).
- **Checkout + hoàn tất + đơn đã đặt (phương án A, chốt 14/08/2026)**: món pre-order mang dòng "Pre-order · Nhận hàng dự kiến …" trong tóm tắt đơn và chi tiết đơn (snapshot `preorder` chốt trong `placeOrder`); bước Phương thức vận chuyển có ghi chú "Riêng hàng pre-order: … giao riêng khi hàng về." ở cả lúc chọn lẫn tóm tắt đã xác nhận (ETA chung không đúng cho món đặt trước); màn Hoàn tất thêm dòng "Hàng pre-order · Nhận dự kiến …" (ngày chốt qua `ckOrderPre`). Phương án B (tách 2 shipment) và C (đặt cọc) vẫn để ngỏ — xem `PREORDER.md`.
- **Bản desktop (port 14/08/2026)** — cùng danh mục trên, các điểm cố ý khác mobile: (1) badge "Pre-order" gắn vào Ô ẢNH ĐẦU của lưới gallery (desktop không có chồng pill New Season); (2) cờ `preorder:true` cũ trong `PDP_DATA.pdp` đã bỏ — CTA suy từ `PRODUCTS[0].preorder` để 1 nguồn; (3) tiện thể sửa popup đăng nhập nhanh còn in cứng "1.135" điểm → `rewardPointsEarned()`. Panel "Tóm tắt đơn hàng" lúc đầu giữ thumb 52×60 gọn, nhưng **user chốt cùng ngày: đồng bộ khuôn dòng theo tóm tắt mobile** (thumb 100×133 + badge + tên 2 dòng + giá đáy-phải + dòng ngày không prefix, quà qua `giftSummaryRow(..., true)`) và **hạ title panel 24 light → 18 medium**. Tiếp đó user chốt thêm: **panel CHỈ để xem thông tin giỏ + tạm tính** — nút "Đặt hàng" cũ trong panel là lỗi UX (bấm được từ bước 0, nhảy thẳng màn hoàn tất, bỏ qua toàn bộ validation các bước) nên đã gỡ, kèm 2 dòng ETA/ghi chú pre-order dưới nút (lặp với bước Phương thức vận chuyển); nút "Đặt hàng" thật giờ nằm **cuối bước Thanh toán như mobile** (khuôn nút inline h-12 px-10 của các bước desktop), chỉ hiện khi đã đi qua đủ các bước.

## Chọn ưu đãi kiểu sàn TMĐT (17/08/2026, CẢ 2 BẢN)

Yêu cầu user: bỏ ô "Mã giảm giá" gõ tay ở giỏ, thay bằng mô hình của các sàn — **mục "Áp dụng ưu đãi" thu gọn 1 dòng**, bấm vào mở danh sách ưu đãi, **chọn nhiều mã cùng lúc** (freeship + mã giảm + …).

**Vì sao đổi**: 90% người mua không thuộc mã. Ô input trống chiếm chỗ mà không nói được đang có ưu đãi gì; bộ mã JUL500/1000/1500 chỉ nằm ở card "Chương trình khuyến mãi" phía trên, cuộn qua là quên. Thêm nữa bản cũ **chỉ cho 1 mã/đơn** nên không thể vừa dùng ưu đãi vận chuyển vừa dùng mã giảm tiền.

- **Thu gọn**: dòng `#voucherTrigger` = icon vé + nhãn + chữ phụ bên phải + chevron. Mobile: 1 dòng trần trong card viền sẵn. Desktop: dòng **có viền** cao 48 trong cột tóm tắt 427px (ở đó không có card con nào khác nên cần viền để đọc ra "bấm được").
- **Nhãn trái tĩnh, số bên phải** (chốt 17/08/2026): trái luôn là **"Ưu đãi & khuyến mãi"** (tên mục không đổi theo trạng thái, là text tĩnh trong markup nên `renderVoucherUI` không đụng tới); phải là con số — chưa chọn **"( N )"** với N = số mã **đang đủ điều kiện** (`voucherAvailCount`; mã ẩn và mã chưa đạt mức không tính — đếm cả thứ bấm vào không dùng được thì con số nói dối), đã chọn **"( Đã áp dụng N )"**. Con số chính là lý do để bấm vào: nói "có gì đó cho bạn ở đây" mà không phải mở panel. Số khả dụng đổi theo giỏ nên `refreshCartSummary` **luôn** gọi `renderVoucherUI`, không chỉ khi có mã rớt. **Không in số tiền giảm** ở dòng này.
- **Bẫy i18n gặp phải**: nhãn mới dịch là `Promotions & offers`, KHÔNG phải `Offers & promotions` — chuỗi đó đã là bản dịch của `'Ưu đãi khuyến mãi'` (tiêu đề mục ở PDP, không dấu &). `I18N_REV` dựng theo VALUE nên 2 key trùng bản dịch thì key sau đè key trước: lượt dịch ngược EN→VN trả nhãn ở giỏ về "Ưu đãi khuyến mãi" (mất dấu &). Thêm key mới vào từ điển thì phải soi `I18N_REV[I18N[key]] === key`.
- **KHÔNG hiện chip mã ra ngoài giỏ** (chốt 17/08/2026): khối tóm tắt ngay dưới đã liệt kê từng mã thành dòng `Giảm giá(<CODE>)` riêng, thêm hàng chip nữa là nói 2 lần. Muốn gỡ mã thì mở panel bỏ chọn.
- **Mở ra**: mobile trượt lên từ đáy (`max-height:88vh`, đúng khuôn `#giftSheet`/`#sizeSheet`); desktop **trượt vào từ mép phải** — class `.dk-drawer` (440px, cao hết màn, đổ bóng trái). Cả 2 dùng CHUNG một đoạn JS: `.dk-drawer` map lại chính cờ `translate-y-full` mà JS toggle, giống cách `.dk-modal` đang làm. Đóng bằng ✕ / backdrop / **Esc**.
- **Chọn nhiều**: `VOUCHER_GROUPS` 3 nhóm — Ưu đãi vận chuyển · Mã giảm giá · Ưu đãi mua nhiều. **Mỗi nhóm tối đa 1 mã**, cộng chồng chỉ hợp lệ giữa các nhóm: các mã trong cùng nhóm ở đây là các MỨC của cùng 1 chương trình (JUL500/1000/1500 = WARDROBE REFRESH, BMSM5/BMSM10 = BUY MORE SAVE MORE) nên chồng nhau vô nghĩa. Bấm mã cùng nhóm = đổi mã; bấm lại mã đang chọn = bỏ chọn (không cần nút "bỏ chọn" riêng).
- **Chọn tạm rồi mới ghi**: lựa chọn nằm ở biến `temp` trong sheet, chỉ nút "Áp dụng ưu đãi" mới ghi vào `cartVouchers` — đóng bằng ✕/backdrop là huỷ. Ghi thẳng thì mỗi lần chạm thử một mã là khối tiền phía sau nhảy một lần và không có đường lùi.
- **Mã chưa đủ điều kiện KHÔNG bị giấu**: vẫn hiện, làm mờ + khoá bấm + nói rõ còn thiếu gì ("Mua thêm 63,943,000đ để dùng mã", "Cần mua từ 3 sản phẩm"). Đó là thứ đẩy giá trị giỏ lên; giấu đi thì người mua không biết mình sắp có gì.
- **Tự rớt khi giỏ teo lại**: `pruneVouchers()` chạy trong `refreshCartSummary` — bỏ tick/bớt số lượng làm đơn tụt dưới mức tối thiểu thì mã tự gỡ kèm toast "Đã gỡ N ưu đãi do đơn không còn đủ điều kiện". Không có bước này thì tóm tắt in ra khoản giảm mà đơn không được hưởng.
- **Ô nhập mã vẫn còn** nhưng lùi vào trong sheet (mã riêng / mã gửi qua email không nằm trong danh sách). Bộ `JUNE500/900/2000` cũ để `hidden: true`: không hiện trong danh sách, gõ tay vẫn áp được, và khi đã chọn thì hiện ra để còn bỏ chọn.
- **Tiền**: `type: 'amount'` giảm số cố định · `'percent'` giảm % có trần `cap` · `'ship'` **không trừ vào tiền hàng** (demo vốn miễn phí giao) mà hiện thành dòng "Phí vận chuyển — Miễn phí" trong tóm tắt. Tên/điều kiện sinh từ số (`voucherTitle`), không in cứng chuỗi tiền — sửa mức giảm là mọi chỗ hiển thị đi theo, và định dạng số khớp khối tóm tắt.
- **i18n**: nhãn tĩnh vào từ điển; mọi chuỗi mang số (`( Đã áp dụng N )` ↔ `( N applied )`, `Giảm 1,500,000đ`, `Đơn từ …`, `Mua thêm … để dùng mã`, `Đã chọn N ưu đãi`, `· HSD dd/mm/yyyy`) đi bằng **luật regex** 2 chiều. Riêng `( 6 )` không cần luật: không khớp từ điển lẫn regex nên `tr()` trả null và text giữ nguyên. Mã voucher + tên chương trình mang `data-i18n-skip` (wordmark). Sheet nằm ngoài `.screen` nên `open()` gọi `localizeNew(panel)`.

## Cookie consent — nội dung theo bản khách duyệt (17/08/2026, CẢ 2 BẢN)

Khách gửi nguyên văn 2 block, cả `index.html` lẫn `desktop.html` chép đúng chữ. 2 bản skin `desktop-neutral.html` / `desktop-editorial.html` **chưa đổi** (fork từ trước).

- **Block 1 (banner)**: 2 đoạn + **3 gạch đầu dòng** giải thích đúng 3 nút bên dưới (`COOKIE_BULLETS`, cùng thứ tự nút) + đoạn nhắc đổi lựa chọn. Nút đổi tên: `Đồng ý tất cả` → **Chấp nhận tất cả**, `Tùy chọn cookies` → **Tùy chọn Cookie**.
- **Link trong đoạn cuối**: chữ "Tùy chọn Cookie" mở view nhóm (dùng lại `[data-cg-prefs]`); chữ **"tại đây"** (`[data-cg-privacy]`) mở **trang chính sách thật** — demo mới có route `privacy` (*Chính sách bảo mật*) nên tạm trỏ vào đó, có trang *Chính sách bảo vệ dữ liệu cá nhân* thì đổi 1 dòng. Xem chính sách **không tính là đồng ý**: đóng banner, không bật nhóm nào — như chạm nền.
- **Block 2 (pop up)**: 4 nhóm đổi tên `Cookies …` → **`Cookie …`**; nhóm cần thiết mang luôn phần trong ngoặc vào nhãn: `Cookie cần thiết (luôn bật, không thể tắt)`. **CHỈ 4 NHÃN, KHÔNG CHÚ THÍCH** (chốt 17/08/2026, yêu cầu user) — dòng mô tả từng nhóm đã bỏ khỏi markup; cột `desc` trong `COOKIE_CATS` và 4 key i18n tương ứng **giữ nguyên** để bật lại chỉ tốn 1 dòng. Hàng đổi `items-start` → `items-center` cho khớp nhãn 1 dòng (nhãn nhóm cần thiết vẫn xuống 2 dòng ở 375px, hàng cao 73px). Chiều cao rút gọn: panel tuỳ chọn mobile **400px**, modal desktop **345px**. Bản khách vẽ **checkbox ☑/☐**, demo giữ **công tắc** `.cg-sw` (khoá + mờ 40% cho nhóm cần thiết) — cùng nghĩa, khác hình.
- **Thang nút — chốt 17/08/2026 theo yêu cầu user, ÁP CẢ 2 BẢN**: state 1 (banner/thẻ) có **Từ chối tất cả (trái) và Chấp nhận tất cả (phải) NGANG CẤP** — cùng nút đặc, cùng cỡ, nằm cùng một hàng, không bên nào nổi hơn bên nào (đúng tinh thần "từ chối phải dễ bấm như đồng ý"); **chấp nhận nằm bên phải** (chốt 17/08/2026, yêu cầu user) — vị trí thuận tay cho hành động đi tiếp, giống nhau ở cả 2 bản; "Tùy chọn Cookie" tụt xuống một bậc — **nút viền full-width** dưới hàng đó, GIỐNG NHAU Ở CẢ 2 BẢN (desktop lúc đầu để chữ gạch chân, đã đổi cho khớp: đây là lối duy nhất sang màn chọn từng nhóm nên không được mờ hơn 2 nút quyết định một bậc rưỡi). State 2 **chỉ còn ĐÚNG 1 NÚT "Lưu lựa chọn"** — vào tới đây là đang bật/tắt từng nhóm, để lại chấp nhận/từ chối tất cả thì 2 nút đó xoá sạch thao tác vừa làm. **Lệch bản thảo khách**: block 2 của khách có liệt kê `<Chấp nhận tất cả> <Từ chối tất cả>` — cần khách xác nhận lại. Xếp 2 nút ngang hàng cũng bớt ~52px chiều cao thẻ desktop (566 → 514).
- **Banner dài hơn nên đổi cấu trúc**: `.cg-intro` thành flex-col `min-h-0`, phần chữ `flex-1 overflow-y-auto`, cụm nút `shrink-0` — panel chạm trần `max-height:88vh` thì chữ tự cuộn, **3 nút luôn nằm trong màn**. Đo: 812px cao → panel 584 (không cần cuộn); 560px cao → panel 493 = 88vh, chữ cuộn trong 337px.
- **Cỡ chữ theo thang text style (17/08/2026, yêu cầu user)**: cục cookie trước đó dùng 13px (thân + nút) và 11px (mô tả nhóm) — cả 2 đều ngoài thang Figma. Đã quy về thang, và **phần nội dung chốt ở cỡ mini 12/16 Light** (user chốt cuối ngày, sau khi thử 14/20): 2 đoạn + 3 gạch đầu dòng + đoạn cuối đều **12/16**. Còn lại: tên nhóm ở pop up **14/20 Medium** · tiêu đề modal desktop **16/24 Medium** · nút mobile **14 Medium**, nút desktop **12 Medium tracking-wider** (quy ước nút của bản desktop). Hệ quả chiều cao: panel mobile 604 → **466**, thẻ desktop 574 → **438** — cả 2 còn cách trần rất xa (88vh = 715 · 600) nên không cần cuộn ở màn tiêu chuẩn.
- **i18n**: đoạn cuối bị 2 inline button cắt thành nhiều text node → mỗi mảnh là 1 key riêng, **dấu chấm nối câu bọc `<span data-i18n-skip>.</span>`** để mảnh sau không dính dấu chấm vào đầu key. Toast đổi theo: `Đã chấp nhận tất cả Cookie` · `Đã từ chối Cookie không cần thiết` · `Cookie cần thiết luôn bật, không thể tắt` · `Quý khách có thể thay đổi lựa chọn Cookie bất kỳ lúc nào ở Tùy chọn Cookie`; luật regex 2 chiều đổi thành `Đã lưu lựa chọn Cookie · N/M nhóm`. Key `Chính sách Cookie` đã gỡ (không còn chỗ dùng).

**Bản desktop (port 17/08/2026)** — cùng chữ, cùng thang nút, 2 điểm cố ý khác mobile:
- **Link "tại đây" KHÔNG đóng thẻ**: `go('privacy')` rồi để nguyên thẻ góc dưới-trái. Thẻ desktop không nền tối, không khoá cuộn nên đọc chính sách xong chọn tiếp ngay tại chỗ; mobile buộc phải đóng vì cổng chặn cả trang (và kèm toast nhắc). Không có toast ở desktop — không mất gì thì không cần giải thích.
- **Chặn trần chiều cao thẻ**: chữ mới dài gấp đôi nên `#cookieBar` thành flex-col `max-height: min(600px, calc(100vh - 64px))`, phần chữ `flex-1 overflow-y-auto`, cụm nút `shrink-0`. Đo ở 1440×800: thẻ 420×**514** (sau khi xếp 2 nút ngang hàng), chữ chưa cần cuộn; ở 1440×520: thẻ chạm trần 456, chữ cuộn trong 262px, nút vẫn đủ chỗ. Không có bước này thẻ leo ~740px.
- **Nút "Lưu lựa chọn" trong modal neo phải** (`justify-end`, `h-11 px-6`) đúng chuẩn footer modal desktop, mobile thì full-width h-12 — cùng cấp, khác khuôn theo bản. Nói chung 2 bản **trùng nhau về thứ tự nút và cấp nút**, chỉ khác thang cỡ vốn có của từng bản: desktop `h-11` / 12px / `tracking-wider`, mobile `h-12` / 13px.

### Panel "Tùy chọn Cookie" đè đúng ô của thẻ — chốt 18/08/2026 (chỉ desktop)

Yêu cầu khách: panel tuỳ chọn **không căn giữa màn** nữa mà **đè ngay vị trí thẻ cookie** — bấm "Tùy chọn Cookie" thì panel hiện ngay nơi mắt đang đọc, không nhảy ra giữa màn.

Bản mobile **không phải sửa**: `#cookieGate` vốn là *một* panel dính đáy với 2 view (`.cg-intro` / `.cg-prefs`) đổi qua `.hidden`, nên view tuỳ chọn đã luôn hiện đúng chỗ banner.

- `.cp-panel` **bỏ class `.dk-modal`** (khuôn modal giữa màn: `left/top: 50% !important` + `translate(-50%,-50%)`, bo 8, khổ 520) và bỏ luôn `style="width:520px"` · `absolute` · `bg-background` · `flex flex-col` trong markup.
- Toạ độ · khổ · nền · trần chiều cao chuyển sang **khối CSS dùng chung với `#cookieBar`** (`left:32 bottom:32`, `width:min(420px, 100vw-64px)`, `max-height:min(600px, 100vh-64px)`). Panel đè lên thẻ nên **lệch 1px là lộ** — đừng khai lại mấy thuộc tính này cho riêng mặt nào. Viền lấy từ khối "KHUÔN CHUNG CHO MỌI LỚP NỔI" (đã thêm `#cookiePrefs .cp-panel` vào danh sách selector); bo góc **vuông** như thẻ.
- **Hiệu ứng vào**: thẻ trượt từ đáy, còn panel thì **mờ-dần + phóng nhẹ `scale(.98)→1`** với `transform-origin: left bottom` — nó thay chỗ thẻ nên không được "bò" khỏi ô. Class `translate-y-full` **giữ nguyên tên** vì đó là cờ đóng/mở mà `openMD`/`closeMD` toggle, chỉ đổi cách vẽ ra — đúng lối `.dk-modal` và `.dk-drawer` đang dùng.
- **Padding ngang `px-5` → `px-6`** (header · thân · footer) cho bằng thẻ: khổ panel rút 520 → 420 và nằm chồng lên thẻ nên chữ 2 mặt phải thẳng cùng một lề.
- Đo ở 1440×900: thẻ `[32, 430, 420×438]` · panel `[32, 511, 420×357]` — trùng khít lề trái, khổ ngang và **đáy** (868). Ở 800×700 vẫn trùng khít và nằm trong màn.
- **Thẻ KHÔNG bị đóng** khi mở panel (đúng nghĩa "đè lên"): thẻ cao hơn panel 81px nên **hở 81px mép trên**, phần hở nằm dưới backdrop nên bị tối 45%. Muốn sạch hẳn thì gọi `closeBar()` trong `openMD` — 1 dòng, nhưng lúc đó là *thay chỗ* chứ không còn là *đè lên*, cần khách chốt.
- Backdrop tối + `lockBodyScroll` **giữ nguyên** như modal cũ; chỉ đổi chỗ đứng, không đổi tính chất chặn.

## Bộ da (skin) đổi được tại chỗ — 18/08/2026

`desktop.html` và `desktop-editorial.html` đều có mục **"Bộ da"** trong popover Cài đặt (FAB góc phải), đặt **trên** mục "Giao diện" vì nó là lựa chọn thô nhất — đổi cả bảng màu, mặt chữ và khuôn nav; 2 mục dưới chỉ tinh chỉnh bên trong.

| File | Lựa chọn | class trên `<html>` | Mặc định |
|---|---|---|---|
| `index.html` **(mobile)** | `Mặc định · Grey-Gold` / `Editorial · MR PORTER` / `Mytheresa · chữ hoa` | *(không)* / `skin-mp` / `skin-mt` | **Mặc định** |
| `desktop.html` | `Mặc định · Grey-Gold` / `Editorial · MR PORTER` / `Mytheresa · chữ hoa` | *(không)* / `skin-mp` / `skin-mt` | **Mặc định** |
| `desktop-editorial.html` | `Editorial · MR PORTER` / `Mytheresa · chữ hoa` / `Neutral · greige` | `skin-mp` / `skin-mt` / *(không)* | **Editorial** |

**Cơ chế** — giống nhau ở cả 2 file:
- Khối CSS của bộ da gắn tiền tố `html.skin-mp` cho **mọi** selector. Không có class thì khối **nằm im 100%** — đây là lý do thêm được vào `desktop.html` mà không phải fork.
- `html.skin-mp` thay cho `:root`: cùng trỏ `<html>` nhưng specificity **(0,1,1) > (0,1,0)** nên thắng bảng token gốc / khối greige.
- `SKINS` + `applySkin()` dựng đúng khuôn `THEMES` / `applyTheme()` có sẵn.
- **`applySkin` reset luôn phông**: xoá `.font-override` + biến inline `--font-app` mà nút chọn phông đặt lên `<html>`, rồi set `currentFont` về phông mặc định của bộ da và cập nhật dấu tích. Không làm bước này thì lựa chọn phông cũ còn ghim lại → serif trên bảng màu Grey-Gold (hoặc ngược lại).
- `desktop-editorial.html` gắn `class="skin-mp"` **thẳng trong markup** `<html>` (không gán bằng JS) để không nháy một nhịp greige lúc trang vừa dựng. `desktop.html` mặc định không class nên không cần.
- ⚠ **Bộ da KHÔNG mang qua mốc 768px**: `RESP.watch` chỉ gói `[screen, lang, font, theme]`. Từ 18/08/2026 cả 3 file đã có bộ da **cùng id** (`default`/`editorial`/`mytheresa`) nên mang được về mặt kỹ thuật, nhưng phải thêm tham số thứ 5 vào `RESP.hash()` + phần đọc hash ở **cả 3 file** — chưa làm, cần chốt. Hiện kéo cửa sổ qua mốc là bộ da về mặc định của file đích.

### Bản mobile `index.html` — thêm 2 bộ da (18/08/2026, yêu cầu user)

"Tạo luôn style editorial cho bản mobile, **chỉ cần thêm style không cần thay đổi layout gì**, bấm vào setting và thay đổi tương tự desktop."

- **Cùng cơ chế, cùng nhãn, cùng id** với 2 bản desktop — `SKINS` / `applySkin()` / mục "Bộ da" trên "Giao diện" trong popover Cài đặt. Chép nguyên vì mobile đã có sẵn đủ hạ tầng: `FONTS`, `currentFont`, `THEMES`, `applyTheme`, `#settingsPanel`, `--font-app`, `.font-override`.
- **KHÔNG rule nào đụng bố cục** — chỉ token màu · token bo góc · mặt chữ · chữ hoa nhãn menu · nền thanh promo. Không sửa `display`/`flex`/`grid`/spacing/thứ tự.
- **Mobile ít việc hơn desktop** vì: không có 2 hàng nav / mega panel; bottom sheet vốn **đã vuông góc và đã không đổ bóng** (chốt 17/08) nên chỉ còn `#settingsPanel .sp-card` khai bo `8px` bằng số thật là phải đè; `body` không có vệt gradient nào để tắt.
- **Thanh promo**: bản gốc `bg-primary` (đen) chữ trắng → 2 bộ da đảo thành xám nhạt chữ đen (`#d9d9d9` / `#f2f2f2`). Ở mobile nền là **utility class** (0,1,0) nên `html.skin-* div:has(> #promoSlider)` (0,2,1) đè được — **không cần `!important`** như desktop (ở đó nền là inline style).
- **Chữ hoa nhãn menu (chỉ bộ da Mytheresa)**: mobile không có hàng nav, "nhãn menu" là drawer `#menuSheet` — hàng tab ngành hàng `.ms-tab` + các hàng danh mục trong `.ms-view`. Bám `button > span:first-child` vì hàng nào cũng đặt nhãn ở span đầu, chevron/icon ở span sau → **không phải thêm class hook nào vào markup**, đúng yêu cầu "không thay đổi layout". Bộ số 12/16 · tracking .5px · weight 500 giống 2 bản desktop.
**Sửa lại 18/08/2026 (user báo "mobile chưa giống mytheresa thực tế") — ĐO TỪ CHÍNH BẢN MOBILE CỦA HỌ.**

Bản trước lệch vì bảng quy đổi **suy từ số đo bản desktop** của họ rồi áp cho mobile. Nay đo lại đúng `mytheresa.com/euro/en/men/clothing` ở khổ **375×812**:

| Đếm | size / line-height | weight | case | family | Vai trò |
|---:|---|---|---|---|---|
| **585** | **12 / 16.8** | 400 | none | AvenirNext | **thân bài** — "My Wishlist", "Sign In", "Filters" |
| 60 | 12 / 16.8 | 400 | uppercase | | **giá** "€ 3,000" |
| 60 | 12 / 16.8 | 400 | lowercase | | "original price" |
| 16 | **14 / 18.2** | 400 | none | | link phụ |
| 14 | **14 / 18.2** | 400 | **uppercase** | | **hàng dept** Women/Men/Kids |
| 6 | **18 / 23.4** | 400 | none | **OptimaLTPro** | **tiêu đề mục** |
| 4 | **24 / 28.8** | 400 | none | **OptimaLTPro** | **tiêu đề trang** "Clothing" |
| 1 | 12 / 15.6 | 400 | none | | thanh promo |

**Hệ chữ mobile của họ chỉ có 4 cỡ: 12 · 14 · 18 · 24**, tất cả weight 400, tất cả `ls .5px` — cả 4 đều nằm trong thang dự án nên không phải tự chế cỡ nào. **Khác bản desktop của họ ở 3 điểm**: hàng dept 14 (desktop 12) · tiêu đề mục 18 (desktop 20) · tiêu đề trang 24 (desktop 28).

**3 chỗ bản trước làm SAI, đã sửa:**

| Ta | Trước (sai) | Nay | Vì sao |
|---|---|---|---|
| 16 | → 14 | **→ 12** | ta dùng 16 cho nút CTA + giá PDP + tiêu đề nhỏ; cả 3 vai trò đó ở họ đều **12** |
| 18 | → 16 | **giữ 18** | họ **không có 16 nào**; 18 chính là ô tiêu đề mục, trùng vai trò |
| 22 · 24 | → 18 | **→ 24** | 24 là ô tiêu đề trang của họ |

Còn lại: `11 · 13 · 14 · 15 → 12` (12 là sàn của họ) · `32 → 24` · `9 · 10` giữ (chỉ số trong pill badge, nâng lên 12 là vỡ pill).

**Weight: toàn bộ 400, KHÔNG trừ chỗ nào** — kể cả nhãn menu. Bản trước để nhãn menu 500 theo chốt *"nâng weight menu lên medium"*, nhưng chốt đó nói cho bản **desktop**; lần này user yêu cầu "mang **toàn bộ** từ mytheresa sang" nên theo số đo. ⚠ **Hệ quả: nav mobile 400 vs nav desktop 500 — đang lệch nhau có ý thức, chờ user chốt.**

**Nhãn menu tách 2 ô** theo đúng phân cấp của họ: `.ms-tab` (hàng dept) **14/18 · 400 · uppercase** = số đo thật; hàng danh mục trong `.ms-view` **12/16 · 400 · uppercase** — ô thân bài, **không đo được** (bị chặn trước khi mở được menu mobile của họ) nhưng thấp hơn tab 1 nấc nên vẫn ra phân cấp tab > hàng.

**Đo lại sau khi sửa** — hình dáng đã trùng bản mobile của họ (12px áp đảo + 18px cho tiêu đề mục + chỉ 1 weight):

| Màn | Cỡ chữ | Weight |
|---|---|---|
| plp | 12px ×288 · 18px ×7 · 9px ×6 · 10px ×3 | **400 duy nhất** ×304 |
| pdp | 12px ×322 · 18px ×10 · 9px ×6 · 10px ×1 | **400 duy nhất** ×339 |
| cart | 12px ×295 · 18px ×9 · 9px ×6 · 10px ×3 | **400 duy nhất** ×313 |
| account | 12px ×195 · 18px ×7 | **400 duy nhất** ×202 |

Drawer: tab `14/18 · 400 · uppercase · ls .5` (3 tab, đồng bộ) · hàng danh mục `12/16 · 400 · uppercase · ls .5` (9 hàng, đồng bộ); chuỗi DOM vẫn `"Trang chủ nam"` nên i18n nguyên vẹn. **Quét tương phản ngưỡng 4.5:1, 12 màn: 0 vi phạm.** Chữ bị cắt không tệ thêm (10 phần tử `truncate` ở cả 2 bộ da, tổng px tràn **638 → 459** vì chữ nhỏ hơn). Không tràn ngang (375/375). Console sạch trên tab mới.

> **Đã dừng gọi mytheresa.com**: sau vài lần tải liên tiếp, bot-mitigation của họ chặn (`Something went wrong · Reference CPR`). Vì vậy **không đo được PDP và giỏ hàng bản mobile** của họ — 2 màn đó map theo vai trò từ hệ 4 cỡ đã đo, không phải số đo trực tiếp. Muốn đo chính xác 2 màn đó thì phải đợi hoặc dùng ảnh chụp.

**2 thứ CHƯA mang sang** (phần lệch còn lại lớn nhất): **line-height** — họ 12/16.8 (tỉ lệ 1.4), ta 12/20 (1.67) nên chữ ta thoáng hơn; không đổi vì leading của dự án gắn với chiều cao hàng cố định (`h-4`/`h-6`/`h-11`/`h-12`), ép 16.8px vào hàng `h-4` (16px) là tràn. Và **mặt chữ serif OptimaLTPro** cho 2 ô 18/24 — user chỉ yêu cầu size + weight.

**Bổ sung trước đó cùng ngày — thang chữ toàn trang cho bộ da Mytheresa ở mobile.** Trước đó bộ da này ở `index.html` chỉ có bảng màu + chữ hoa nhãn menu, **thiếu 3 rule phạm vi toàn trang** mà 2 bản desktop đã có, nên cùng tên bộ da mà mobile nhìn khác desktop khá rõ. Nay đã bằng nhau:

| | Mặc định / Editorial | Mytheresa (sau bổ sung) |
|---|---|---|
| Cỡ áp đảo trên PLP | **14px ×192** | **12px ×257** |
| letter-spacing (`body`) | `normal` | **`0.5px`** |
| Weight | 400 ×176 · 500 ×99 · 300 ×20 · 700 ×8 · 600 ×1 | **400 ×304 — chỉ còn một weight** |

- Quy đổi y hệt 2 bản desktop: `13/14/15 → 12` · `16 → 14` · `18 → 16` · `22/24 → 18` · `32 → 24`; 12 và nhỏ hơn giữ nguyên. Kiểm kê mobile trước khi remap: 9(2) 10(7) 11(14) 12(155) **13(51)** 14(233) 15(3) 16(54) 18(28) 22(1) 24(8) 32(1) — **không có 20 và 48** nên bảng trên phủ hết.
- **Nhãn menu vẫn giữ 500** dù có rule blanket 400: rule ở mục 4 có `#menuSheet` (1 id) nên thắng khối blanket (chỉ toàn class), không cần `!important`. Đo lại: tab + **cả 9 hàng** ra `12px / 500 / uppercase / 0.5px`, chuỗi DOM vẫn `"Trang chủ nam"` nên i18n nguyên vẹn.
- **KHÔNG đổi** line-height (gắn với chiều cao hàng cố định) và **KHÔNG đổi chiều cao header 48px** của mobile — user chỉ yêu cầu "style", mà số đo mobile của mytheresa thì chưa có (chỉ đo được bản desktop của họ).
- **Chữ bị cắt KHÔNG tệ thêm**: 10 phần tử `truncate` (tên sản phẩm trên card) bị cắt ở **cả 2 bộ da** — đó là thiết kế vốn vậy. Nhưng tổng px tràn **giảm 638 → 459** vì chữ nhỏ hơn, tức thu nhỏ làm ĐỠ cắt chứ không gây thêm. Không tràn ngang (375/375).
- **Quét tương phản ngưỡng 4.5:1** (chữ nay 12px nên không được hưởng ngưỡng 3:1), 12 màn: **0 vi phạm**. Console sạch trên tab mới.
- ⚠ **Đánh đổi đã nêu với user trước khi làm**: thân bài 12px + giãn chữ 0.5px trên màn 375px với tiếng Việt **có dấu** thì khá nhỏ — nhỏ hơn hẳn 14px mặc định; desktop 1440px thì thoải mái. User chốt vẫn làm. Đây là bộ da phải tự bật nên không ảnh hưởng mặc định; muốn nới thì đổi dòng `13/14/15 → 12` thành `→ 14`.

- **Đã đo**: vòng `mặc định → Editorial → Mytheresa → mặc định` trả đúng về chỗ cũ ở mực/viền/mặt xám/xám chữ/radius/phông/nền promo, dấu tích cả 2 mục khớp; `.sp-card` 8px ↔ 0px. Drawer dưới bộ da Mytheresa: tab + **cả 9 hàng** ra `12px / 500 / uppercase / 0.5px`, 2 bộ da kia giữ 14/16px sentence case. **Chuỗi trong DOM vẫn "Trang chủ nam"** (chữ hoa do CSS) nên i18n nguyên vẹn — đổi sang EN ra `Men's home`. Cookie gate ăn theo token: viền `#dfdfdf`, vuông, không bóng. **Quét tương phản 11 màn × 2 bộ da** (ngưỡng 3:1): **0 vi phạm**. Console sạch trên tab mới, không tràn ngang (375/375).

**Port sang `desktop.html` — chỉ chép những gì file này còn thiếu.** 4 mục của bản editorial KHÔNG chép lại vì đã có sẵn: tắt bóng (file này "không đổ bóng" từ 17/08) · header trắng (2 thanh kính vốn đã trắng — bản kia phải tô lại vì từng thử header đen NET-A-PORTER) · dải đen giữa 2 hàng header (user đã bỏ) · hairline đáy `.dk-sub` (file này đã có 1 hairline ở đáy cả khối qua `.navbar::after`) — **nhờ đó KHÔNG phải bù offset sticky nào**, đo lại thanh bộ lọc PLP vẫn khít 0px (112 = 112).

Hai khác biệt phải xử lý khi port:
1. **Selector mega panel**: `desktop.html` là **lưới** `.dk-mega-grid` (4 cột), `desktop-editorial.html` là flex-wrap `.dk-mega-cols`.
2. **Thang mực hover 2 chiều của thanh nav (chốt 17/08) được GIỮ NGUYÊN** ở `desktop.html` — không đè màu nav như bản editorial. Màu nghỉ của `.dk-nav-link` vốn đã bind `--general-secondary-foreground`, mà token đó trong bảng MR PORTER = `#1a1a1a`, nên **tự ra gần đen** không cần rule nào. Bản editorial phải đè vì thang mực bên đó là 3 bậc, màu nghỉ `#767676` xám hẳn so với ảnh.

**Đã đo** (`desktop.html`, tắt transition trước khi đo): vòng tròn `mặc định → MR PORTER → mặc định` trả đúng về chỗ cũ ở cả `--general-border` (`#e5e5e5` ↔ `#e0e0e0`), `--radius-2` (`2px` ↔ `0px`), `--general-destructive` (`#d62845` ↔ `#d81e05`), mặt chữ (Montserrat ↔ Lora), nền thanh thông báo (`#262626` ↔ `#d9d9d9`), cỡ hàng submenu (16 ↔ 14); dấu tích của cả 2 mục (bộ da + phông) khớp. Bật bộ da: nav link `#1a1a1a`/14px, gạch chân đen 2px, mega panel trắng pad 40/48, nhãn nhóm `#1a1a1a` uppercase Lora + vạch 32×1px, kẻ dọc trước ảnh teaser. **Quét tương phản 10 màn** (ngưỡng 3:1): **0 vi phạm**. Console sạch trên tab mới, không tràn ngang (1425/1440).

> **Bẫy khi đo** (đã dính 2 lần): pane Browser ẩn thì trang không vẽ frame nên **transition CSS đứng yên giữa đường** — `getComputedStyle` trả giá trị CŨ. Đổi bộ da rồi đo màu nav ra `#262626` (giá trị cũ) trong khi biến đã là `#1a1a1a`. Phải chèn `*, *::before, *::after { transition: none !important }` trước khi đo; riêng `*` KHÔNG khớp pseudo-element nên thiếu `*::after` là đo gạch chân ra `opacity: 0` dù rule đúng.

### Bộ da thứ 3: `Mytheresa · chữ hoa` (18/08/2026, yêu cầu user)

Yêu cầu: "theme uppercase các title menu và màu sắc tương tự mytheresa.com". **Đo được thật** — `mytheresa.com/euro/en/men` mở được trong Browser pane và nạp đủ (12 stylesheet, `main.css` 4357 rule, 65 ảnh, 4 font face), nên số dưới đây là số đo chứ không phải suy đoán:

| Điểm | Số đo trên mytheresa.com | Đưa vào bộ da |
|---|---|---|
| Nav **cả 2 tầng** (`WOMEN/MEN/KIDS` và `NEW ARRIVALS/DESIGNERS/…`) | 12px · 400 · `uppercase` · `letter-spacing: 0.5px` · `#000` · lh 16.8px · AvenirNextLTPro | y hệt, **lh làm tròn 16px** (cặp 12/16 của thang chữ; lệch 0.8px không nhìn ra) và **weight nâng 400 → 500**, xem dưới |
| Chữ trang | `#000` **thật** (đếm 829 phần tử) | `--general-foreground/primary/secondary-foreground` = `#000` — khác rõ nhất với MR PORTER (`#1a1a1a`) |
| Viền | `#dfdfdf` áp đảo (162 chỗ), `#999999` rải rác | `--general-border: #dfdfdf`, `--unofficial-border-4: #999999` |
| Mặt xám | `#f2f2f2` | `--general-secondary/muted` |
| Xám chữ | `#666666` | `--general-muted-foreground` (5.74:1 trên trắng — đạt AA cả chữ nhỏ) |
| Bo góc | **KHÔNG CÓ CHỖ NÀO** (quét 2500 phần tử, rỗng) | 5 token radius = 0 |
| "SALE" trên nav | **ĐEN**, không tô đỏ | đè cả 3 state của `.dk-nav-link.text-destructive` về `#000` |

- **CHỮ HOA làm bằng `text-transform`**, không gõ hoa vào chuỗi — chuỗi gốc là key i18n ("Nam"/"Nữ"/"Quần áo"…), gõ hoa vào là mất bản dịch. Đây là **ngoại lệ của quy ước "không dùng UPPERCASE"**, và là ngoại lệ **an toàn** vì nằm trong một bộ da phải tự bật: mặc định của cả 2 file không đổi.
**Đợt 2 cùng ngày — thang chữ toàn trang + header 64/64 + gạch chân hàng dept (2 bản desktop)**

Đo lại trên `mytheresa.com/euro/en/men/clothing`, gom **mọi tổ hợp** `(size | weight | transform | tracking | family)` đang thực sự vẽ chữ:

| Đếm | Tổ hợp | Ví dụ |
|---:|---|---|
| **592** | 12px · 400 · none · 0.5px · AvenirNextLTPro | **thân bài** |
| 73 | 12px · 400 · **uppercase** · 0.5px | nav |
| 60 | 12px · 400 · lowercase · 0.5px | "original price" |
| 8 | **16px** · 400 · none · 0.5px | "Jackets" — tiêu đề mục |
| 6 | **20px** · 400 · none · 0.5px · **OptimaLTPro** | "Mytheresa News" — tiêu đề khối |
| 5 | **28px** · 400 · none · 0.5px · **OptimaLTPro** | "Clothing" — tiêu đề trang |
| 4 | 14px · 400 · none · 0.5px | "Show more" |

**3 kết luận:** (a) **toàn trang weight 400** — không một phần tử 500/600/700 nào; họ dựng phân cấp bằng **cỡ chữ + mặt chữ (sans/serif)**, tuyệt đối không bằng độ đậm. (b) **letter-spacing 0.5px ở mọi chỗ**. (c) thân bài **12px** — nhỏ hơn 14px mặc định của dự án đúng 1 nấc.

**Quy đổi về thang chữ dự án** (12/14/16/18/24/32/48 — không tự chế cỡ mới):

| Dự án | → | Ghi chú |
|---|---|---|
| 14 (thân bài) · 13 · 15 | **12** | 13/15 là nợ cũ, dồn về 12 cho hết lệch |
| 16 | **14** | |
| 18 | **16** | khớp tiêu đề mục 16 của họ |
| 22 · 24 | **18** | họ 20 → 18 (20 không có trong thang) |
| 32 | **24** | họ 28 → 24 |
| 48 (`.ed-display`) | **32** | khai bằng số thật trong CSS nên phải đè riêng |
| 12 / 11 / 10 / 9 | giữ | 12 là sàn của họ; nhỏ hơn là badge/chỉ số |

- **Weight**: đè cả 5 utility (`.font-light/normal/medium/semibold/bold`) + thẻ `b`/`strong` về **400**. **Ngoại lệ duy nhất: nav giữ 500** theo chốt riêng bên dưới — rule nav (0,2,2) tự thắng khối này (0,2,1), không cần `!important`. Đo trên PLP: **400 ×425 + 500 ×11**, và 11 phần tử 500 đó **đúng là 3 nút dept + 8 mục subheader**, không sót chỗ nào.
- **Cỡ chữ** đo trên PLP: **12px ×389** áp đảo (đúng hình dáng của họ — 592 @ 12px), rồi 14px ×22 · 16px ×6 · 24px ×1. Còn 11/10/9px (×18) là **badge/chỉ số nợ cũ ngoài thang**, bộ da không cố sửa.
- **KHÔNG đổi line-height**: leading của dự án gắn với chiều cao hàng cố định (`h-6`/`h-9`/`h-11`…), đổi là vỡ nhịp. Hệ quả: 12px của ta thoáng hơn 12/16.8 của họ một chút.
- **KHÔNG thêm mặt chữ serif OptimaLTPro** cho tiêu đề — user yêu cầu "font weight và font size", không yêu cầu đổi mặt chữ. Đây là nét MR PORTER/Mytheresa còn thiếu rõ nhất nếu muốn đi tiếp.
> **LỖI ĐÃ SỬA (user báo 18/08/2026) — "theme mytheresa mega menu không hiển thị được".**
> Nguyên nhân: rule hạ chiều cao subheader viết là `html.skin-mt .dk-sub > div { height: 64px }`. Nhưng **9 panel `.dk-mega` CŨNG là con trực tiếp của `.dk-sub`** — chúng render ngoài thanh cuộn để `overflow-x` không cắt panel. Nên selector ép luôn cả panel về 64px, mà `.dk-mega` có `overflow: hidden` → nội dung ~362px bị cắt còn một dải 64px.
> Sửa: bám `#dkSubRow` (id chỉ trúng hàng subheader). `desktop.html` đã có id này sẵn; **đã thêm `id="dkSubRow"` vào markup hàng subheader của `desktop-editorial.html`** cho khớp bản chính.
> **TUYỆT ĐỐI KHÔNG dùng `.dk-sub > div`** cho bất kỳ rule nào nhắm hàng subheader — đã ghi cảnh báo tại chỗ trong cả 2 file.
> Đo lại sau khi sửa: **0 panel bị cắt** ở cả 3 bộ da × 2 file (chiều cao panel 253–441px tuỳ bộ da và tuỳ mục, `innerH` không vượt `panelH`); số đường dẫn mỗi panel không đổi (14/16/11/10/25). Test bằng **đúng đường hover thật** (dispatch `pointerenter`/`mouseenter`, chờ hover-intent 120ms) chứ không tự gắn class `.open`: panel mở ở `top 160` = đáy subheader, cao 385px, `visibility: visible`, `opacity: 1`, 16 đường dẫn nằm trọn trong panel.

- **Header 64 / subheader 64** (yêu cầu user) — **chỉ trong `skin-mt`**, 2 bộ da kia giữ 60/72. Header tổng 32+64+64 = **160**, đáy header khi cuộn **128** = bớt 4px so với base, nên 4 offset sticky trừ theo: `#plpFilterAnchor` 128 · `.dk-policy-aside` 144 · `[data-policy-sec]` 144 · `.dk-sticky-info/side` 152. File editorial: hàng nav **không có id** (bản chính có `#dkNavRow`) nên bám cấu trúc `.navbar > .glass-95:not(.dk-sub) > div`.
- **Gạch chân hàng dept khi đang chọn** — ⚠ **cố ý lệch mytheresa**: đo thật cả 4 mục `WOMEN/MEN/KIDS/LIFE` trên trang men của họ đều **y hệt nhau** (400, `#000`, không underline, không border, `::after` = `content: none`) → **họ không đánh dấu hàng dept**. User vẫn muốn có, và điều này khớp quyết định 13/08 của dự án là state đang chọn phải đọc ra được. Đặt `::after` ở `bottom: 0` của **nút `h-9`** chứ không phải đáy hàng 64px — ở đáy hàng thì vạch rơi cách chữ 14px, đọc ra là đường kẻ của thanh chứ không phải gạch chân của mục. Đo: vạch 2px `#000`, rộng **31.5px** = đúng bề rộng chữ "Nam", mục không active `opacity: 0`.
- **Đã đo cả 2 file × mọi bộ da**: `default`/`editorial` giữ 60/72 + đáy header 132 + tracking `normal`; `mytheresa` ra 64/64 + đáy 128 + tracking `0.5px`. Thanh bộ lọc PLP ghim **khít 0px ở cả 3 bộ da**, cột info PDP clearance 23–24px, anchor mục lục nhảy tới 144 > 128. Thanh danh mục `Nam`/`Nữ` vừa khít 1409/1409, `Làm đẹp` tràn 1457 nên mũi tên trượt tự hiện. Không tràn ngang (1425/1440). Console sạch trên tab mới ở cả 2 file.
- **Quét tương phản ở ngưỡng NGHIÊM HƠN 4.5:1** (vì chữ nay 12px, không còn được hưởng ngưỡng 3:1 của chữ lớn), 10 màn × bộ da Mytheresa: **0 vi phạm**.

### Hệ viền / gạch chân theo số đo Mytheresa (18/08/2026, cả 3 file)

User: *"dùng toàn bộ style của họ về layout dạng có border/underline ở các mục (ví dụ menu, pdp), dùng màu border/underline tương đương mytheresa"*. Lần này họ **không chặn**, đo được cả PLP lẫn 1 PDP (`saman-amel-…-p01048872`) — quét mọi phần tử có viền thấy được, ghi cả cạnh · độ dày · màu · phần tử:

| Đếm | Viền | Ở đâu |
|---:|---|---|
| **155** | **border-bottom 1px `#dfdfdf`** | `headerdesktop__section` (**cả 2 hàng nav**), hàng danh sách, ô nhập form |
| 6 | **border 1px `#000` (4 cạnh)** | ô chọn size (`dropdown__select__content` — nền **trắng** + viền đen) **và nút nền đen** (`.button` — viền cùng màu nền nên vô hình, ĐỪNG đọc thành nút viền) |
| 6 | **border-top 1px `#000`** | `accordion__item` ("product details") |
| 4 | border 1px `#dfdfdf` (4 cạnh) | ô nhập form, danh sách option dropdown |
| 1 | border 1px `#999999` (4 cạnh) | `.button--disabled` ("Subscribe") — nền `#999` chữ trắng = **trạng thái DISABLED**, không phải nút phụ |
| 8 | `underline auto rgb(0,0,0)` | link inline — gạch chân **đen**, dày/offset `auto` |

**Luật của họ, rõ ràng 2 tầng:**
- **`#000` 1px** = phần tử **tương tác / chính**: nút CTA · ô chọn size · vách accordion · gạch dưới ô tìm kiếm
- **`#dfdfdf` 1px** = phần tử **kết cấu / phụ**: vách 2 hàng nav · ô nhập form · danh sách option

> ### ⚠ LỖI TỰ GÂY, USER BẮT — "button CTA vẫn fill màu đen chứ"
> Đợt đầu mình kết luận **nút "Add to bag" của họ là nút viền** (nền trong suốt) và đã đổi `.btn-p` ở cả 3 file theo đó. **Sai.**
> **Nguyên nhân**: probe dùng `find()` quét `button,a,div` nên bắt phải thẻ **BỌC** `.productbuttons` (nền trong suốt, viền 0) thay vì nút thật `.button`. Dữ liệu của mình còn **tự mâu thuẫn** ngay lúc đó — bảng thống kê ghi `button « Add to bag` có viền `#000` cả 4 cạnh, nhưng probe trực tiếp trả `border: 0px` — mà mình không truy.
> **Đo lại đúng phần tử `.button`**: `background: rgb(0,0,0)` · `color: rgb(255,255,255)` · `border 0.8px rgb(0,0,0)` · `radius 0` · cao **44px** · nhãn `.button__text` **14px/400**.
> Viền `#000` 4 cạnh của nó **cùng màu nền nên vô hình** — chính vì vậy nó bị đếm vào nhóm "6 chỗ border 1px #000", rất dễ đọc thành nút viền.
> **Đã trả lại nguyên trạng** ở cả 3 file: bộ da **không khai gì** cho `.btn-p`; nền đen + góc vuông (token radius đã = 0) là đã khớp họ. Rule hover đảo nền — thứ mình tự suy ra — cũng đã xoá.
> Chốt lại: `#000` = **nền** nút chính và **viền** ô chọn size; hai vai trò khác nhau, không gộp.

**Đã áp (cả 3 file):** vách 2 hàng nav · `--unofficial-border-1` · accordion PDP `border-top` (triệt `border-b` của markup) · ô chọn size **nền trắng + viền `#000`** · ô nhập tìm kiếm chỉ còn gạch dưới `#000` (2 bản desktop) · vách hàng danh mục trong drawer (mobile). **Nút chính giữ nguyên nền đen chữ trắng.**

#### Hạ tông + brand name + khoảng cách badge (18/08/2026, yêu cầu user)

4 việc, tất cả trong bộ da `skin-mt`. **3 trong 4 là lệch CÓ Ý THỨC so với số đo** — đã ghi rõ tại chỗ trong cả 3 file để sau không ai tưởng là đo sai:

| # | Việc | Trước | Sau | Số đo của họ |
|---|---|---|---|---|
| 1 | Vách/underline hàng danh mục trong menu nhẹ hơn | `#dfdfdf` | **`#ececec`** | `#dfdfdf` → **lệch có ý thức** |
| 2 | Nội dung PDP nhẹ hơn — vách accordion | `#000` | **`#dfdfdf`** | `#000` → **lệch có ý thức** (vạch đen chạy ngang cả cột PDP đọc ra rất nặng) |
| 2b | Nội dung PDP nhẹ hơn — chữ chạy | `#000` | **`#333333`** (12.6:1 trên trắng) | `#000` → **lệch có ý thức**. Tách 2 tầng mực: `--general-foreground`/`--general-primary` **giữ `#000`** cho tiêu đề/nav/nút, chỉ 2 token chữ chạy hạ tông |
| 3 | Brand name +1 bậc weight | 400 (bị blanket ép) | **500** | — |
| 4 | Khoảng cách badge trên card PLP (desktop) | `gap-1` = 4px | **8px** (1 nấc trên lưới 4px) | — |

**2 hook mới thêm vào markup** (không đổi bố cục, chỉ để CSS bám được): `.pc-brand` trên **8 chỗ** hiển thị tên thương hiệu (6 màn PDP mobile + card sản phẩm + sheet quick-add, và `h1` PDP ở 2 bản desktop) · `.pc-badges` trên cụm badge của card (2 bản desktop).

> **Bug specificity — dính 2 lần trong cùng đợt này.** Rule `.pc-brand { font-weight: 500 }` cùng specificity **(0,2,1)** với khối blanket `.font-medium/.font-bold… { font-weight: 400 }` của mục 5, nên **ai viết SAU thắng**.
> · Lần 1: `desktop.html` để rule ở mục 9 (sau) → đúng 500, nhưng dùng selector `h1` cho PDP — `html.skin-mt h1` chỉ **(0,1,2)**, THUA blanket (0,2,1) → brand PDP ra 400. Sửa bằng cách gắn `.pc-brand` vào chính `h1`.
> · Lần 2: `index.html` đặt rule ở mục 4b (**trước** mục 5) → blanket đè, brand ra 400 ở cả card lẫn PDP. Sửa bằng cách dời rule xuống cuối mục 5.
> Đã kiểm thứ tự 2 rule trong cả 3 file bằng grep số dòng: blanket luôn đứng trước.

**Đo lại cả 3 file × 2 bộ da** (tắt transition trước khi đo):

| | `desktop.html` | `desktop-editorial.html` | `index.html` |
|---|---|---|---|
| vách hàng nav / hàng danh mục | `#ececec` | `#ececec` | `#ececec` (drawer) |
| vách accordion PDP | `0.8px #dfdfdf` | `1px #dfdfdf` | `1px #dfdfdf` |
| brand name (card / PDP) | **500 / 500** | **500 / 500** | **500 / 500** |
| tên sản phẩm (chữ chạy) | 400 · `#333333` | — | 400 · `#333333` |
| gap badge | **8px** | **8px** | — (chỉ yêu cầu desktop) |

**Quét tương phản ngưỡng 4.5:1**: `index.html` 8 màn · `desktop.html` 6 màn → **0 vi phạm** (chữ chạy `#333` vẫn 12.6:1). Không tràn ngang (375/375 · 1425/1440). Console sạch trên tab mới ở cả 3 file.

**Bug tự phát hiện và đã sửa ngay:** rule đầu viết `html.skin-mt .acc { border-top: 1px solid #000 }`. Nhưng class `.acc` **còn dùng cho thẻ khuyến mãi** (`acc bg-accent-0 rounded-sm`) và 2 biến thể khác vốn **không có vách nào** → mấy thẻ đó mọc thêm vạch đen trên đầu. Sửa: bám **`.acc.border-b`** — `.border-b` chính là dấu hiệu "accordion này CÓ vách" nên lọc bằng nó là đúng nghĩa, không phải mẹo. Đo lại: thẻ khuyến mãi `border-top 0px` ở **cả 2 bộ da**, accordion info tab `border-top 0.8px #000 · bottom 0px`.

**Đo lại toàn bộ (tắt transition trước khi đo):**

| | `desktop.html` | `desktop-editorial.html` | `index.html` |
|---|---|---|---|
| vách hàng nav | `1px #dfdfdf` (cả 2 hàng) | `1px #dfdfdf` (cả 2 hàng) | — (mobile không có hàng nav) |
| vách hàng drawer | — | — | `1px #dfdfdf` × 9 hàng |
| accordion info tab | `top 0.8px #000 · bot 0` | `top 1px #000 · bot 0` | `top 1px #000 · bot 0` |
| thẻ khuyến mãi | `top 0px` (không đụng) | `top 0px` | `top 0px` |
| nút chính | **nền `#000`** · chữ `#fff` · r0 | y hệt | y hệt |
| ô chọn size | nền `#fff` · viền `1px #000` · r0 | — | — |

**Quét tương phản ngưỡng 4.5:1**: `desktop.html` 4 màn · `index.html` 8 màn → **0 vi phạm**. Không tràn ngang (375/375 · 1425/1440). Console sạch trên tab mới ở cả 3 file.

**Chưa mang sang** (không đo được): panel flyout của họ — bị chặn khi thử mở menu; nên **mega panel** vẫn giữ vách hiện có chứ không có số đo riêng.

> **Bẫy khi đo — dính lần thứ 4:** lần quét đầu báo 4 lỗi "English" `#767676` trên `#f2f2f2` = 4.06:1. Nhưng `#767676` là muted của bộ da **MR PORTER**, không phải Mytheresa (`#666666`) — đó là **giá trị cũ đứng lại giữa transition** vì pane Browser không vẽ frame. Chèn `*, *::before, *::after { transition: none !important }` rồi đo lại: ra đúng `#666666` và **0 vi phạm**. Cứ đổi bộ da rồi đo màu là PHẢI tắt transition trước.

- **Weight nav nâng 1 bậc: 400 → 500 medium** (chốt 18/08/2026, yêu cầu user) — **chỗ duy nhất của nav không theo số đo**. Lý do hợp lý: chữ hoa 12px ở Montserrat mảnh hơn AvenirNextLTPro của họ nên 500 bù lại đúng độ dày mắt thấy. Áp cho **cả 4 selector** (`.dk-dept`, `.dk-nav-link`, và 2 biến thể `[aria-current]`) nên nav **một độ đậm ở mọi state** — việc đánh dấu mục đang chọn vẫn để gạch chân lo, đúng tinh thần mytheresa. Đo lại: cả 2 hàng nav ra `500` ở cả state nghỉ lẫn `[aria-current]`, thanh danh mục `Nam`/`Nữ` **vẫn vừa khít 1409/1409** (nâng weight không làm tràn thêm).
- **Chỉ nav chữ hoa.** Đường dẫn trong mega panel giữ **14px** — user yêu cầu chữ hoa cho *title menu*, không đụng cỡ nội dung panel.
- **Phông: Montserrat** (mặc định dự án) — cùng họ sans **hình học** với AvenirNextLTPro của họ nên gần nhất, **không phải nạp thêm face nào**.
- **2 chỗ KHÔNG lấy từ mytheresa, đã ghi rõ trong comment:**
  1. **Không đo được panel flyout** của họ (event hover tổng hợp không kích được handler React) → phần mega panel suy từ hệ chung (viền `#dfdfdf`, nhãn hoa đen) chứ không phải số đo.
  2. **Trang họ không có màu đỏ nào** → `--general-destructive` **giữ đỏ gốc dự án** `#d62845`, vì badge -% và viền lỗi form vẫn phải đọc ra là cảnh báo. Nếu khách muốn đơn sắc tuyệt đối thì phải chốt riêng cách hiển thị badge giảm giá + lỗi form.
- **Khác nhau giữa 2 file**: chỉ selector mega panel (`desktop.html` = lưới `.dk-mega-grid`, `desktop-editorial.html` = flex-wrap `.dk-mega-cols`). File editorial còn phải thêm: đè thang mực 3 bậc về đen, khai lại `--font-app` về Montserrat (không thì đổi từ MR PORTER sang còn dính serif Lora), tắt bóng của khối greige, tắt vệt gradient nền. **Sửa 1 file nhớ sửa cả 2.**
- **Sửa kèm một lệch giữa 2 file**: bộ da MR PORTER ở `desktop.html` chỉ đè `font-weight` cho `[aria-current]` nên nav ra **500** (markup có `font-medium`), trong khi cùng bộ da ở file editorial là **400** và nav MR PORTER thật là regular. Đã đè cả 4 selector → **400** ở cả 2 file.
- **Đã đo**: vòng `mặc định → Mytheresa → MR PORTER → mặc định` (desktop.html) và `editorial → Mytheresa → Neutral → editorial` (editorial) đều trả **đúng về chỗ cũ** ở token mực/viền/mặt xám/radius/phông/nền thanh thông báo/cỡ+case nav, dấu tích của cả 2 mục (bộ da + phông) khớp. Thanh danh mục: `Nam`/`Nữ` **vừa khít** 1409/1409, `Làm đẹp` tràn 1450/1409 nên 2 mũi tên trượt tự hiện (chữ hoa 12px + tracking rộng hơn 14px thường một chút). Thanh bộ lọc PLP ghim khít **0px** ở cả 2 file. **Quét tương phản 10 màn × bộ da Mytheresa**: **0 vi phạm**. Console sạch trên tab mới ở cả 2 file, không tràn ngang (1425/1440).

## Subheader cao 72 + gom offset sticky một chỗ (18/08/2026, 2 bản desktop)

Yêu cầu user: "nguyên block subheader tăng height lên 72, áp dụng toàn bộ theme". Sửa ở **markup base** (`h-[52px]` → `h-[72px]`) chứ không nhét vào khối bộ da nào — đo lại: cả 3 bộ da ở mỗi file ra **đúng 72**. Bản mobile **không đụng**: `index.html` không có subheader.

Nút danh mục vẫn `h-9` (36px) nên chỉ thoáng thêm, nhưng **header cao thêm 20px thì mọi offset sticky canh theo đáy header phải dịch theo**. Nhân dịp này gom cả 4 số vào **một khối `<style>` có tên** (`OFFSET STICKY CANH THEO ĐÁY HEADER`) thay vì rải rác giữa markup và CSS:

| Phần tử | Trước | Sau | Trước ở đâu |
|---|---|---|---|
| `#plpFilterAnchor` (thanh bộ lọc PLP) | 112 | **132** | utility `top-[112px]` trong markup |
| `.dk-policy-aside` (mục lục trang chính sách) | 128 | **148** | utility `top-[128px]` trong markup |
| `[data-policy-sec]` (mốc nhảy anchor) | 128 | **148** | utility `scroll-mt-[128px]` trong markup |
| `.dk-sticky-info` / `.dk-sticky-side` | 136 | **156** | đã ở `<style>` |

- **Vì sao khai tay trong `<style>` chứ không sửa utility trong markup**: `top-[132px]` · `top-[148px]` · `scroll-mt-[148px]` **không có trong `tailwind.css` đã build** (cùng lý do `col-start-4` phải khai tay). Gom 1 chỗ cũng đúng hơn về bản chất — 4 số này **buộc phải dịch cùng nhau** mỗi lần chiều cao header đổi, để rải rác trong markup là chắc chắn có cái bị bỏ sót. `#plpFilterAnchor` là id (1,0,0) nên thắng mọi utility class còn sót lại.
- Bộ da MR PORTER ở file editorial vẫn cộng **+1px** cho hairline đáy `.dk-sub` của nó: `133` thay vì `132`.
- **`#dkSearchLayer` không phải sửa**: `layer.style.top` đo `getBoundingClientRect().bottom` của hàng nav **tại lúc mở**, nên tự thích ứng.
- **`.dk-mega` không phải sửa**: `absolute top-full` bám `.dk-sub`. Đo lại: đỉnh panel = đáy subheader (164 = 164 ở `desktop.html`; ở file editorial lệch 1px vì hairline của bộ da MR PORTER nằm giữa).
- **Gạch chân mục đang chọn không phải sửa**: `::after` ở `bottom: 0` của `.dk-nav-item` vốn `h-full` → tự tụt xuống đáy hàng 72px. Đo lại: item 72px, vạch `bottom 0 / 2px`.
- **Đã đo cả 2 file × mọi bộ da**: header tổng **164** (promo 32 + nav 60 + subheader 72), đáy header khi cuộn **132**; thanh bộ lọc PLP ghim **khít 0px**, cột info PDP + tóm tắt giỏ clearance **23–24px**, mục lục chính sách **26px**, anchor `[data-policy-sec]` nhảy tới **148 > 132** nên không bị header che. Console sạch trên tab mới, không tràn ngang (1425/1440).

## Back từ PDP về PLP giữ nguyên vị trí cuộn (17/08/2026, CẢ 2 BẢN)

Yêu cầu user. Trước đó `go()` luôn `window.scrollTo(0, 0)` nên back từ PDP là văng lên đầu danh sách, phải cuộn lại từ đầu để tìm sản phẩm vừa xem.

- **`SCROLL_MEM[man] = curScrollY()`** chốt ngay đầu `go()`, **trước khi xoá DOM**. `curScrollY()` đọc `__scrollLockY` khi đang khoá cuộn (sheet mở thì `window.scrollY` = 0, đọc thẳng là nhớ nhầm số 0).
- **Chỉ khôi phục khi đi LÙI** (`opts.back` — nút back trình duyệt / vuốt back → popstate). Đi tới vẫn về đầu trang.
- **`goPlp()` xoá `SCROLL_MEM.plp`**: đổi danh mục/ngành hàng là nội dung khác hẳn, giữ toạ độ cũ thì lượt back sau trả về một chỗ vô nghĩa.
- **`restoreScrollY()` phải BÁM LẠI vài khung hình, không đặt một phát là xong.** Đo lúc chạy: ngay sau khi thay DOM trang mới chỉ cao ~2072px (sau đó nở ra 5046px) nên `scrollTo(0, 1400)` bị kẹp còn **1260**. Hàm này đặt lại mỗi khung tới khi toạ độ dính (tối đa 20 khung) **+ 2 mốc `setTimeout` 80/250ms dự phòng** cho trường hợp `requestAnimationFrame` bị đóng băng (tab nền, cửa sổ ẩn — đúng môi trường lúc kiểm). Dừng ngay khi người dùng `wheel`/`touchstart`/`keydown` — không giành scroll với họ.
- `history.scrollRestoration = 'manual'` (nếu trình duyệt có): router tự dựng lại DOM nên toạ độ trình duyệt nhớ theo entry là của cây DOM đã biến mất.
- Đo sau khi sửa: mobile cuộn 1400 → PDP → back = **1400**; cuộn 2200 → back = **2200**; desktop 1800 → back = **1800**; đi tới PLP từ màn khác vẫn = **0**.
- **Giới hạn đã biết**: nếu đã bấm "Show more" (chèn thêm 4 thẻ thẳng vào DOM, không lưu state) rồi mới vào PDP thì lượt back dựng lại danh sách NGẮN hơn, toạ độ cũ bị kẹp về đáy. Muốn đúng tuyệt đối thì phải đưa số thẻ đang hiện vào state của PLP.

### Breadcrumb + tên thương hiệu desktop (17/08/2026, yêu cầu user, CHỈ DESKTOP)

- **Breadcrumb cao 36 → 40** (`h-9` → `h-10`) và **màu lên một tông**: `text-muted-foreground` #737373 → `text-secondary-foreground` #262626. Sửa trong `dkCrumbs()` nên **áp một lượt cho cả 6 chỗ đang gọi** — PLP danh mục, PLP thương hiệu, PDP, tài khoản, chi tiết đơn, trang chính sách.
- **Tên thương hiệu về MEDIUM ở mọi chỗ**: chỉ còn `h1` brand ở PDP là `font-light` (24 Light theo quy ước "tiêu đề trang dùng Light"), 7 chỗ khác đều Medium — để lệch mình nó thành ra khác nhất giữa các màn. Đã quét lại toàn file: **0 chỗ render brand mà không phải medium**.

## Cục tài khoản trong menu mobile (17/08/2026, CHỈ MOBILE)

Yêu cầu user. Trước đó đáy menu chỉ có **1 hàng chữ "Đăng ký / đăng nhập"** — gộp 2 việc khác nhau vào một lối bấm, và bấm vào luôn ra view đăng nhập nên muốn đăng ký phải bấm thêm một nhịp trong màn.

- Chưa đăng nhập: **tiêu đề mute "Tài khoản"** (12/16, `text-muted-foreground` — cùng khuôn header section ở màn Search) + **2 nút cỡ Regular `h-9`** (đúng component Button của Figma): **Đăng ký viền** (trái) · **Đăng nhập đặc** (phải). Đặt đăng nhập bên phải theo quy ước đã chốt cho cặp nút quyết định — hành động đi tiếp ở tay phải.
- `data-auth-view="register|login"` quyết định mở màn đăng nhập ở view nào; handler `[data-nav]` của panel đọc thuộc tính đó rồi mới `closeM()` + `go()`.
- **Đã đăng nhập thì giữ nguyên 1 hàng "Tài khoản"** dẫn vào màn tài khoản — 2 nút kia lúc đó vô nghĩa.
- **Kèm sửa 1 lỗi phát sinh**: đang đứng SẴN ở màn đăng nhập mà bấm nút trong menu thì `go('login')` thấy `name === current` là return luôn → màn không dựng lại, view cũ vẫn nằm đó dù `authView` đã đổi (bấm "Đăng nhập" mà vẫn thấy "Tạo tài khoản"). Nay handler gọi `rerenderLogin()` cho trường hợp này. Kiểm 3 bước liên tiếp Đăng ký → Đăng nhập → Đăng ký: tiêu đề màn đổi đúng từng lần.
- i18n có sẵn (`Đăng ký`→Sign up · `Đăng nhập`→Sign in · `Tài khoản`→Account); key cũ `Đăng ký / đăng nhập` đã gỡ khỏi `index.html` nhưng **giữ trong `desktop.html`** vì menu mobile-style của bản desktop chưa đổi.

## Khuôn chung cho MỌI lớp nổi (17/08/2026, CẢ 2 BẢN)

Yêu cầu user: *"toàn bộ các popup, bottom up phải chung 1 style có border"*. Trước đó mỗi mặt một kiểu — 9 bottom sheet mobile **không có cả viền lẫn bóng** (nền trắng nằm trên nền trắng, chỉ đọc ra mép nhờ backdrop tối), desktop thì có **5 giá trị bóng khác nhau** (`.22` `.18` `.16` `.16` `.14`) cộng `shadow-lg`/`shadow-xl` của Tailwind ở các menu, và chỉ 2 mặt có viền.

Giờ mỗi file có **một khối CSS `KHUÔN CHUNG CHO MỌI LỚP NỔI`** ở đầu `<style>`, liệt kê hết selector:

| | Giá trị |
|---|---|
| Viền | `1px solid var(--general-border)` |
| Bóng | **`none`** — bỏ hẳn (17/08/2026, tham chiếu `cettire.com/vn`) |
| Bo góc | **không gom** — nổi giữa màn thì 8px, dính mép màn thì 0 |

- **Không đổ bóng**: đi hẳn hướng phẳng như cettire — viền lo việc tách mặt phẳng khỏi nền, backdrop tối `rgba(0,0,0,.45)` lo phần còn lại. (Bản trung gian trong ngày từng gom 5 giá trị bóng về 1 giá trị không lệch hướng `0 2px 24px`; sau đó bỏ luôn.)
- **Phủ (mobile)**: `.is-panel` `.cg-panel` `.ns-panel` `.qa-panel` `.cc-panel` `.sz-panel` `.gf-panel` `.vc-panel` `.pk-panel` `#settingsPanel .sp-card` `#sortMenu` `#policyMenu`.
- **Phủ (desktop)**: `.dk-modal` `.dk-drawer` `.lp-card` `#infoSheet .is-panel` `#filterSheet .fs-panel` `#dkSearchLayer .ds-sheet` `#cookieBar` `#cookiePrefs .cp-panel` `#settingsPanel .sp-card` `#sortMenu` `[data-size-list]`.
- **Ngoại lệ có chủ ý: `.dk-mega` VÀ `#dkSearchLayer .ds-sheet`** — panel mega menu và tấm gợi ý tìm kiếm **không viền, không bóng** để LIỀN MẠCH với header (trắng nối trắng, đúng cách cettire dựng); mép dưới đọc ra nhờ scrim tối. Đây là mặt duy nhất trong 2 file không mang viền chung. **Từ 17/08/2026 panel dùng luôn `glass-95 backdrop-blur-[7.5px]`** — cùng nền + cùng độ blur với `.dk-sub` ngay trên nó (đo `getComputedStyle`: cả hai ra `color(srgb 1 1 1 / .95)` + `blur(7.5px)`), nên panel đọc ra là phần nối dài của thanh kính chứ không phải tấm trắng đặc đè lên. Lưu ý kỹ thuật: `.dk-mega` nằm TRONG `.dk-sub` vốn đã có `backdrop-filter` → backdrop-filter lồng nhau; nếu trình duyệt cô lập backdrop root thì panel vẫn ra nền trắng 95% (không xấu hơn bản cũ) — nên nhìn mắt thường kiểm lại trên máy thật.
- **Cố ý KHÔNG phủ**: lớp **chiếm trọn màn** (`.fs-panel` bộ lọc mobile · `.ms-panel` menu · `.lp-card` mobile · `#infoSheet.full` bảng size) — viền quanh mặt phẳng phủ kín màn chỉ tổ hở hairline ở mép, nên `#infoSheet.full .is-panel` khai `border: 0; box-shadow: none`. Và **toast** (pill nền tối `glass-ink-95`, giữ `shadow-lg`) vì nó là thông báo thoáng qua, không phải bề mặt chứa nội dung.
- Đã **gỡ** `border border-border shadow-lg` khỏi markup 3 menu mobile + 2 menu desktop, gỡ `shadow-xl`+`border-b` của `.dk-mega`, gỡ inline `style="box-shadow:…"` của `.lp-card` desktop (inline style thắng mọi rule nên nó là chỗ duy nhất lọt lưới lúc kiểm) — **đừng thêm border/box-shadow vào từng panel nữa**, sửa ở khối chung.
- Tiện thể: `.lp-card` desktop đổi `rounded-xs` (2px) → `rounded-md` (8px) cho bằng các modal giữa màn khác.

Kiểm bằng cách đọc `getComputedStyle` từng selector: cả 2 file giờ chỉ ra **đúng 1 cặp** `1px` + `0 2px 24px rgba(0,0,0,.14)`.

## Quick add to cart (`#quickAddSheet`)

Theo Figma `Drawer` **3373:41590** (đủ màu + size, 390×647) và **3373:41766** (chỉ size, 390×577). Hai frame đã được thu gọn; code khớp số đo mới:

| Chi tiết | Cũ | Mới (Figma 3373:41590) |
|---|---|---|
| Bo góc panel | 24px | **0** — không bo góc |
| Thanh handle 50×3 + hàng chứa nó | có | **bỏ** (Figma không có handle) |
| Nút ✕ | 32×32 trong hàng riêng | **32×32 r2, icon 16, `absolute top-2 right-2`** — không chiếm chiều cao layout (Figma: "Button Group Icon Button" x=350 y=8) |
| Pad gallery | `px-4` (16), không pad dọc | **`p-0.5`** — pad 2 mọi phía |
| Ảnh gallery | 160×213 | **W=163 ⇒ H=213** (`w-[163px]` + `aspect-ratio:163/213`) |
| Ô chọn màu | ô màu hex 36px (`.cw` + ring) | **ảnh 44×44** (`.sw` + `on`/`border-transparent`) — giống PDP, khớp component "Image Selection" |
| Grid size | 4 cột `h-9` | **5 cột `h-9`** (Figma `Chips` GRID `gridColumnCount: 5`, 358×80 = 2 hàng 36 + gap 8) |
| Pad trên header | 16 | **8** |
| Link "Bảng kích thước" ở hàng size | có | **bỏ** — node "Bảng size" trong Figma đang tắt |
| "Xem chi tiết" | nút full-width dưới nút chính | **dời lên cạnh TÊN sản phẩm** — `[tên] gap 10 [Xem chi tiết]`, 14 Regular gạch chân (Figma `Frame 427319813` HORIZONTAL gap 10, `Link Button` 85×24) |
| Khối CTA | pad 16 gap 10, 2 nút | **chỉ còn nút chính** — cao 80 = 16 + 48 + 16 |
| Pad dưới khối brand/tên | 16 | **8** (Figma `Frame 427319848` pad `0,0,8,0`) |

Cấu trúc khớp Figma (frame đã đổi tên thành **"Quick add"**):

```
Quick add (390×635, radius 0)
├── group1  ← BLOCK CUỘN DUY NHẤT khi màn thấp  = #qaBody (flex-1 min-h-0 overflow-y-auto)
│   ├── Frame 427319867   gallery  pad 2 gap 2, ảnh W163 → H213
│   └── element
│       ├── Frame 50      header: brand 18 · [tên | Xem chi tiết] · giá
│       └── Frame 15      pad 8/16 gap 16: ô màu 44 · grid size 5 cột h36
├── Frame 427319820       CTA cao 80 — GHIM đáy = #qaCta (shrink-0)
└── Button Group Icon Button  ✕ 32×32 absolute top/right 8
```

> Tên sản phẩm **không** dùng `flex-1`: để nó hug đúng như Figma, chỉ `min-w-0 truncate` nên tên ngắn thì link nằm sát ngay sau, tên dài thì tên cắt bớt và link vẫn còn nguyên chỗ.

### Nội dung quick add phải khớp PDP

Hằng **`PRODUCT_GALLERY`** (10 mảng — SP#1–#10) là **nguồn duy nhất** cho ảnh gallery — cả 6 `screenPDP*` và `quickAddBody()` đều đọc từ đó. Từ 07/08/2026 toàn bộ là **ảnh thật** kéo từ trang chi tiết của từng sản phẩm trên shop.dafc.com.vn:

| SP | Ảnh (assets/) | Ghi chú |
|---|---|---|
| #1 đầm lụa | `p1-0..4.jpg` | 1 màu thật (Broken Jewels xanh lá); ảnh 1–4 là model mặc |
| #2 khăn lụa | `p2-0..1.jpg` | 1 màu thật |
| #3 túi Emblème | `p3-0.jpg` + `p3-v1.jpg` + `p3-1..6.jpg` | 2 màu THẬT: Verde Menta (SKU 1226346) + Rosa (SKU 1226345) |
| #4 Gianni 90 | `p4-0.jpg` + `p4-v1.jpg` + `p4-1..6.jpg` | 2 màu THẬT: Nero + Oro (SKU 1226328) |
| #5 loafer Manu | `p5-0..6.jpg` | 1 màu thật |
| #6 Greca Court | `p6-0.jpg` + `p6-v2.jpg` + `p6-v1.jpg` + `p6-1..6.jpg` | màu 2/3 mượn 2 SKU anh em (1215580 trắng / 1215579 đen-gold, giá gốc khác) |
| #7–#10 | `p7-0..4` · `p8-0..7` · `p9-0..7` · `p10-0..2` (.jpg) | không có PDP riêng nhưng quick add đọc đủ bộ ảnh |

> **Quy ước:** slide gallery của PDP render **toàn bộ** mảng (`const gallery = PRODUCT_GALLERY[n]`), còn ô chọn màu chỉ lấy `slice(0, colors.length)` — các ảnh MÀU luôn đứng đầu mảng, ảnh góc chụp xếp sau. `colors` trong `PRODUCTS` đã rút về đúng số phiên bản màu THẬT đang bán (nhiều SP chỉ còn 1 swatch — đó là thực tế, đừng "bịa" thêm màu).
>
> Size/màu vốn đã dùng chung `SIZES` / `DISABLED` / `p.colors` nên không lệch. Hàng beauty không khai gallery — quick add rơi về ảnh chính `b*.jpg`.

Giữ nguyên: gap ảnh 2 · swatch r2 · gap grid 8 · chữ chip 14 · nút chính 48 · gap CTA 10 · pad `Frame 15` 8/16.

> Ảnh 163px ⇒ ở màn 390 thấy **2 ảnh đầy + hé ảnh thứ 3**, gallery cuộn ngang.
>
> **Điểm cần quyết**: `SIZES` có **6** giá trị, chia 5 cột ⇒ dòng 2 còn **lẻ 1 ô** (ở cả quick add và `pdp`). Muốn đúng "1 dòng 5 ô" thì rút xuống 5 size (size còn lại xem ở bảng kích thước).

### Tỉ lệ khung ảnh

Tỉ lệ chuẩn của ảnh sản phẩm: **ngang 160 ⇒ cao 213** (`160/213` ≈ 0.751 ≈ 3:4). Các khung hiện dùng:

| Khung | Tỉ lệ |
|---|---|
| Quick add gallery | `160/213` (rộng 120px ⇒ cao 159.75) |
| Thumb `#cartConfirm` | `160/213` (rộng 80px) |
| `productCard` — grid PLP + mọi rail | `189/252` = 0.7500 |
| Gallery 6 PDP | `height:520px` @ w390 = 0.7500 |
| Ô ảnh trong size picker | `3/4` = 0.7500 |
| Thumb hàng giỏ hàng | `100×133` = 0.7519 |

> **Lưu ý asset**: ảnh CDN DAFC chuẩn **1200×1484 (0.8086)**, không phải 0.751 — nên `object-cover` đang cắt ~7% hai bên ở MỌI khung. Muốn không cắt thì phải xuất lại ảnh theo đúng 160:213 (hoặc đổi hết khung sang `1200/1484`, nhưng khi đó card PLP cao thêm ~11% và gallery PDP 520 → 482px). Từ 07/08/2026 toàn bộ ảnh bản mobile là `.jpg` thật cùng 1 tỉ lệ này (không còn ảnh lẫn tỉ lệ như bộ `pdp-sw*.png` cũ).

### Quy ước bottom sheet

Áp cho **mọi** bottom sheet: **`max-height: 90vh`** · nội dung cuộn trong vùng riêng (`flex-1 min-h-0 overflow-y-auto`) · **khối nút GHIM đáy** (`shrink-0`, nằm ngoài vùng cuộn) nên không cuộn theo nội dung.

| Sheet | max-height | Vùng cuộn | Nút ghim |
|---|---|---|---|
| `#quickAddSheet` | 90vh | `#qaBody` | `#qaCta` — tách ra khỏi `quickAddBody()` thành `quickAddCta()` |
| `#sizeSheet` | 90vh | `#szList` | khối `#szAdd` |
| `#cartConfirm` | 90vh | khối thông tin sản phẩm | khối `#ccGoCart`/`#ccContinue` |
| `#notifySheet` | 90vh | khối 2 field | khối `#nsSubmit` |
| `#infoSheet` | 90vh | khối `#isBody` | (không có nút) |

> `#filterSheet` **không** theo quy ước này — nó là drawer **full-screen** (`inset: 0`) vì cây danh mục rất dài; đã có header/footer riêng và vùng giữa tự cuộn.

> **Cố ý khác Figma 2 chỗ**: brand giữ **18 Medium** (Figma để 20 Medium, mà thang chữ project đã bỏ cỡ 20 — xem mục "Thang chữ"); nút ✕ đặt bên **phải** cho khớp `#infoSheet`/`#notifySheet` (Figma `3373:41766` để bên trái).
>
> Layer `NEW SEASON` / `SKU sản phẩm` / `Đã bao gồm thuế · Miễn phí vận chuyển` / `*Tạm hết hàng` trong Figma đều đang **tắt hiển thị** → không dựng.

## Quy ước đồng bộ giữa 6 bản PDP

6 bản `pdp`…`pdp6` cố ý khác nhau về layout size, vị trí khối, hiệu ứng gallery — nhưng **3 điểm sau phải giống hệt nhau ở cả 6 bản**:

| Điểm | Quy ước |
|---|---|
| Info tab (Mô tả / Bảo quản / Đổi trả / Thương hiệu) | **Extend tại chỗ** (`.acc` + `.acc-trigger` + `.acc-body`). Không dùng bottom sheet. Vách dưới `border-b border-border-1`. |
| Trả góp / trả trước | Dòng "Trả trước từ …/tháng · Xem chi tiết" nằm **ngay dưới nút Thêm vào giỏ hàng, căn giữa** — giống nhau ở mọi PDP có bán trả góp. Sản phẩm **pre-order không hiện** (đặt trước không áp dụng trả góp). |
| Nhãn bảng size | **"Bảng kích thước"** — không dùng "Size guide", "Bảng size →" hay "Hướng dẫn chọn size". |

Chọn size dạng chip hiện có ở `pdp` (5 cột) và `pdp4` (**còn 4 cột**); `pdp2`/`pdp3`/`pdp5`/`pdp6` dùng dropdown nên không có grid.

> Đã sửa để đạt quy ước: `pdp4` trước đây info tab bấm ra **bottom sheet** (`.sheet-trigger` + `window.__pdp4Tabs`) → đổi sang accordion, bỏ luôn handler và cầu nối `window.__pdp4Tabs` vì không còn ai đọc. Thống nhất **8** nhãn size guide, `data-toast`, và tiêu đề sheet trong size picker. `pdp5`/`pdp6` dùng vách accordion `border-border` đậm hơn 4 bản kia → về `border-border-1`.
>
> **Vẫn giữ** trả góp ở 3 chỗ KHÔNG thuộc cấp sản phẩm: mục "Thanh toán linh hoạt" trong `camKetSection`, link "Chính sách trả góp" ở footer (data thật của site), và phương thức "Thanh toán trả góp 0% qua thẻ tín dụng" ở checkout.

### Trả góp cấp sản phẩm — chốt 18/08/2026

Trước đó dòng trả góp bị **bỏ hẳn** khỏi cả 6 PDP mobile (để 6 bản khỏi lệch nhau), còn bản desktop thì giữ nhưng đặt **sát dưới giá** trong header. Khách chốt một vị trí duy nhất: **ngay dưới CTA, căn giữa** — nên nay áp cho **cả 2 bản, mọi loại PDP**.

| | Mobile `index.html` | Desktop `desktop.html` |
|---|---|---|
| Dựng khối | `payOfferRow(idx, cls)` + map `INSTALLMENT` (key = index `PRODUCTS`) | `payOfferRow(amount)`, số tiền đọc từ `PDP_DATA[kind].installment` |
| Chèn ở | 5 khối `#pdpCta` của `pdp2`…`pdp6` | nhánh không-pre-order của biến `cta` trong `dkScreenPDP` |
| Khoảng cách 8px | `gap-2` của `#pdpCta` | `pt-2` trên chính khối (theo lệ `pb-2` của dòng ETA pre-order cùng file) |

Chặn pre-order **2 lớp cùng chiều**: mobile kiểm `PRODUCTS[idx].preorder`, desktop để `PDP_DATA.pdp.installment` rỗng **và** nhánh pre-order không gọi hàm.

Khối **buộc phải là con trực tiếp** của `#pdpCta`: `setCta()` ở cả 2 bản tìm nó bằng `[...cta.children].find(c => c.textContent.includes('Trả trước'))` để **ẩn khi size đang chọn hết hàng** — không mua được thì đừng chào trả góp. Logic này bản desktop đã có (nhưng chết vì khối nằm ngoài `#pdpCta`), bản mobile nay thêm vào cho khớp.

Số tiền là **data demo lấy từ Figma**, không suy từ giá: `1.301.000 ₫` cho SP#2, `742.000 ₫` cho SP#3–SP#6. Hai file giữ **đúng cùng bộ số**; đổi thì sửa cả `INSTALLMENT` (mobile) lẫn `PDP_DATA` (desktop). Kèm 3 entry i18n `Trả trước từ` · `/tháng` · `Xem chính sách trả góp` (mobile trước đó đã dọn, nay thêm lại).

> **Đồng bộ**: `desktop-editorial.html` đã port 18/08/2026 (xem section bản editorial). `desktop-neutral.html` **vẫn để khối này ở header cũ**.

## Mô tả sản phẩm — data thật từ DAFC

Hằng `PRODUCT_INFO` (6 entry, tương ứng SP#1–SP#6 của `pdp`…`pdp6`) chứa `desc` / `care` / `specs` / `features` / `sku` **copy nguyên văn** từ trang chi tiết trên `shop.dafc.com.vn` (kéo 05/08/2026), kèm `src` là slug trang gốc để đối chiếu lại.

Khớp sản phẩm bằng **tên + giá trùng khít** với `PRODUCTS`:

| # | Sản phẩm | Giá | Slug nguồn |
|---|---|---|---|
| 1 | Đầm lụa mini Broken Jewels | 72.557.000 ₫ | `printed-silk-twill-mini-dress-10254991a186725ge70` |
| 2 | Khăn lụa in họa tiết Broken Jewels 90×90 cm | 15.611.000 ₫ | `printed-silk-twill-scarf-90-x-90-cm-10016001a188205ge70` |
| 3 | Túi đeo vai da Emblème | 50.957.000 ₫ | `embleme-nappa-bowling-bag-10243181a174491gt4j` |
| 4 | Giày cao gót da nappa Gianni 90 | 45.066.000 ₫ | `gianni-nappa-pumps-90-10253491a001982b13j` |
| 5 | Giày loafer da Manu | 35.248.000 ₫ | `manu-leather-loafers-10233201a144571b55j` |
| 6 | Giày thể thao da lộn Greca Court | 27.393.000 ₫ | `greca-court-nappa-and-suede-sneakers-10242051a177762nc70` |

> Bản cũ dùng text tự viết và **sai nội dung**: `pdp` + `pdp4` đều tả "túi satchel canvas A.P.C." trong khi SP#1 là đầm lụa Versace và SP#4 là giày cao gót Versace (tab "Về thương hiệu APC" cũng sai theo). Đã sửa cả tab thương hiệu về Versace.

**Chưa hiển thị**: `features` (danh sách gạch đầu dòng) và `sku` có thật trong data nhưng markup 6 PDP chưa có chỗ; `specs` chỉ `pdp2` đang render thành bảng, 5 PDP còn lại có data mà chưa dựng bảng.

## Trang tĩnh / chính sách

3 trang từ Figma Section 8 (`3479:58974`), dùng chung `screenPOLICY(key)` + `POLICY_DATA` (1 layout, 3 bộ nội dung):

| Route | Frame Figma | Tiêu đề |
|---|---|---|
| `privacy` | `3380:56109` privacy-policy-mobile | CHÍNH SÁCH BẢO MẬT (6 mục) |
| `terms` | `3380:56273` terms-of-service-mobile | ĐIỀU KHOẢN DỊCH VỤ (7 mục) |
| `returns` | `3380:56449` return-policy-mobile | CHÍNH SÁCH ĐỔI TRẢ (6 mục) |

Layout: `[tab pill cuộn ngang + nút mũi tên] → [tiêu đề 24 SemiBold + mốc cập nhật 12] → [mục lục viền trên/dưới, 14 Medium] → [các section gap 32: heading 16/24 Medium + body 14/20 Light]`.

> Chữ nội dung **cố ý hạ 1 bậc so với Figma** cho trang dài dễ đọc: heading section 18 → **16**, body 16 → **14** (leading đi kèm 25→24 và 24→20, đều là cặp size/leading có sẵn trong project). Tiêu đề trang vẫn 24; mốc cập nhật vẫn 12. Mục lục bấm được → `scrollIntoView` tới section (`scroll-mt-[64px]` trừ sẵn navbar 48px). Dòng bullet dùng `pl-4 -indent-4` để thụt treo. Không có `cam-ket-section` (Figma 3 frame này chỉ có Nav + Main + Footer).

> **Mục lục 14 Medium (yêu cầu user 12/08/2026, cả 2 bản)** — đi NGƯỢC hướng "hạ 1 bậc" nói trên: Figma cho 12 Regular muted, nhưng đây là khối điều hướng duy nhất của một trang rất dài nên 12px muted chìm quá so với vai trò. Hàng theo đó cao 32px (`py-1.5` thay `py-1`), vẫn giữ màu `text-muted-foreground` và viền `border-y` của Figma.

**Nút mũi tên `#policyMore`** nằm bên phải hàng tab, bấm sổ dropdown `#policyMenu` liệt kê đủ danh sách trang. Cần nó vì 3 pill cộng lại 447px > 358px vùng nội dung nên tab cuối luôn bị cắt. Figma có gợi ý icon `fi-tr-angle-down` (`3479:46946`) đặt cạnh nhóm 3 frame nhưng **không thiết kế dropdown** — phần dropdown dựng theo mẫu `#sortBtn`/`#sortMenu` ở PLP cho đồng bộ (`w-220px`, item `h-11` 14px, trang đang xem có dấu tick). Icon bare 24px của Figma đổi thành pill tròn `w-7 h-7 bg-secondary` để ăn cùng ngôn ngữ với các tab pill. Mũi tên quay 180° khi mở (`#policyMore.open svg`).

> **Hàng tab phải có `relative z-30`** — nếu bỏ, dropdown bị các block bên dưới đè lên. `.rise` dùng `animation-fill-mode: both` nên `transform: translateY(0)` còn dính lại sau khi chạy xong → **mỗi block `.rise` / `.reveal.in` là một stacking context riêng, `z-index: auto`**. Cùng z-index thì thứ tự DOM thắng, nên khối tiêu đề / mục lục / section (nằm sau trong DOM) vẽ đè lên dropdown, và `z-50` trên `#policyMenu` vô dụng vì chỉ có tác dụng *bên trong* stacking context của hàng tab. Đây cũng là lý do `#sortMenu` ở PLP sống được: cha nó `#plpFilterAnchor` có `z-40`. Lưu ý chung: **mọi popup/dropdown đặt trong block `.rise` hay `.reveal` đều cần z-index trên chính block đó**, không phải trên popup.

**Vào từ footer** — bảng `FOOTER_ROUTES` map nhãn link → route, chỉ 3 link có trang thì render `<button data-nav>` gạch chân, 14 link còn lại là chữ tĩnh:

| Nhãn trong footer | Route |
|---|---|
| Chính sách bảo mật | `privacy` |
| Điều khoản và điều kiện | `terms` (trang tên "ĐIỀU KHOẢN DỊCH VỤ" — cặp gần nhất, không có ứng viên khác) |
| Chính sách đổi trả | `returns` |

### 2 điểm còn hở

- **Tab strip trong Figma có 5 tab** (thêm "Chính sách Vận chuyển", "Chính sách Thanh toán") nhưng file **chỉ thiết kế 3 frame**. Code render đúng 3 tab có nội dung thật — thà lệch design 2 tab còn hơn để 2 tab bấm không ra gì. 2 nhãn này cũng nằm trong `FOOTER_LINKS` nên đang là chữ tĩnh. Cần thiết kế thêm 2 frame rồi bổ sung vào `POLICY_DATA` + `POLICY_TABS` + `FOOTER_ROUTES`.
- **i18n chỉ dịch phần khung** (tab, tiêu đề, mốc cập nhật, heading section — heading dùng chung cho mục lục). Body văn bản pháp lý **cố ý để nguyên tiếng Việt**: cần bản EN chính thức từ DAFC, không dịch máy điều khoản.

> Border ngoại lệ: khối mục lục có `border-y border-border` — đúng theo Figma (`Table of Contents` stroke top/bottom 1px `#e5e5e5`, left/right 0). Đây là viền bao của 1 component list, không phải vách ngăn giữa các block, nên không trái quy ước ở mục "Quy ước border".

## Bộ lọc — cây Danh mục 3 tầng

Bottom sheet `#filterSheet` theo Figma `WAP/Filter Bottom Sheet` (`3060:49070`). Section "Danh mục" là cây 3 tầng, thụt cấp bằng **rail**: mỗi cấp con thêm đúng **1 cột `leaf` rộng 20px**, giữa cột là đường dọc **1px `#d9d9d9` cao hết dòng** — dòng liền nhau nên các đoạn rail nối thành một đường liên tục. Gap giữa các cột và với nội dung là **4px**.

| Tầng | Hàm/class | Cao | Số cột rail | Nội dung thụt |
|---|---|---|---|---|
| Cat (Quần áo, Túi xách…) | `.fcat` | 44 (`h-11 pt-2`) | 0 | 0 |
| Sub (Áo sơ mi & áo kiểu…) | `fsubRow(label, 1)` | 36 (`h-9`) | 1 | **24px** |
| Sub con (Áo kiểu…) | `fsubRow(label, 2)` | 36 (`h-9`) | 2 | **48px** |

Khớp Figma: hàng "Áo kiểu" (`3228:33369`) có 2 frame `leaf`, divider ở x=10 và x=34, `Checkbox Group` bắt đầu x=48.

> **Bug đã sửa ở tầng 3**: trước đây cấp sâu nhất dùng **1 cột `w-9` (36px)** với đường ở giữa → rail của cấp trên biến mất (cây bị đứt, đường lạc ra giữa dòng) và thụt sai **40px** thay vì 48px. Nay 2 cấp con dùng chung helper `fsubRow(label, depth)` + `frail(depth)` nên không lệch nhau được nữa. `desktop.html` đã sửa theo (10/08/2026).

Icon `091-warning` trong `Checkbox Group` của Figma đang `visible: false` → không render. Checkbox dùng `rounded-xs` (Figma r=2).

## Cầu nối responsive (mốc 768px)

Hai file vẫn là 2 build riêng, nhưng với người dùng thì chúng là **một trang responsive**: mở file nào cũng tự nhảy sang bản khớp bề ngang cửa sổ, kéo giãn cửa sổ qua mốc cũng nhảy theo.

- **Mốc: 768px.** `< 768` → `index.html`; `≥ 768` → `desktop.html`. Đo bằng `matchMedia('(min-width:768px)')` ở **cả 2 file** nên hai điều kiện bù trừ tuyệt đối — không có kẽ hở lẫn vòng lặp qua lại. Lưu ý phép đo này tính **cả thanh cuộn dọc**: ở cửa sổ đúng 768 thì vùng nội dung thật chỉ còn ~753px (vì vậy `body` của desktop **không** được đặt `min-width`).
- **Đặt ở đâu**: khối `window.RESP` trong `<head>` (ngay sau `<title>`, trước cả link font/CSS để chuyển sớm nhất có thể) + đoạn khởi động cuối `<script>` chính (tìm `RESP.swapped`). Hai file dùng **cùng một khối code**, chỉ khác `IS_DESKTOP` / `OTHER`.
- **Mang trạng thái theo qua hash**: `#screen=<route>&lang=en&font=<id>` — màn đang xem, ngôn ngữ, phông chữ. Giá trị mặc định (`plp` / `vi` / `montserrat`) được bỏ cho URL gọn; route lạ thì rơi về `plp`. Bên nhận lặp lại đúng các bước của nút trong bảng Cài đặt (bỏ toast) và **đặt `LANG` trước `go()`** nên nhãn đổi ngôn ngữ trên header desktop cũng ra đúng chiều. Hash là kênh **một lần**: nhận xong là dọn khỏi URL (trừ `file://` — replaceState đổi URL bị chặn).
- **`location.replace`, không phải `assign`**: lần chuyển không thêm entry vào history nên nút back không bị kẹt giữa 2 file. Trang được ẩn (`visibility:hidden`) trong lúc chuyển để không nháy bản sai, kèm hẹn 2s mở lại phòng khi điều hướng hỏng (thiếu file).
- **Đang bị chuyển thì không dựng gì**: cờ `RESP.swapped` khiến đoạn boot bỏ qua `go()` — đỡ vẽ nguyên một màn sắp bị bỏ.
- **Theo dõi resize nghe 2 nguồn**: `matchMedia('change')` là đường chính, cộng `resize` (gộp nhịp 150ms) làm lưới an toàn vì vài môi trường đổi kích thước bằng emulation/devtools không bắn `change`.
- **Route đọc từ hash phải lọc bằng `hasOwnProperty`**, không dùng `RENDER[st.screen]` trực tiếp: key kế thừa từ `Object.prototype` (`#screen=__proto__`, `=constructor`) cũng truthy, lọt vào `go()` là ném lỗi giữa boot → trang trắng và **mất luôn `RESP.watch()`** (kéo cửa sổ không đổi bản nữa).
- **Boot gọi `go(first, { fromPopstate: true })`**: `replaceState` ngay trên đã ghi entry rồi, để `go()` push thêm một entry trùng state thì cú **back đầu tiên không làm gì** (`go()` thoát sớm vì `name === current`). Lỗi này có sẵn từ trước cầu nối, sửa luôn ở đây.

**Chưa xử lý (chấp nhận được với demo):**
- **Back xuyên qua lần đổi bản**: các entry `pushState` sinh ra *trước* khi đổi vẫn trỏ về file cũ và không mang hash, nên back sâu qua mốc đó sẽ nạp lại file kia rồi rơi về `plp` thay vì đúng màn. Muốn chuẩn thì mọi `pushState` phải ghi kèm URL `RESP.hash(...)` — đổi lại URL lúc nào cũng có hash.
- **Chỉ mang 3 thứ**: màn hình + ngôn ngữ + phông. Từ khóa đang tìm, view con của luồng auth (otp/setpass…), số lượng giỏ, bộ lọc PLP… đều reset khi đổi bản.
- Ở dải **600–767px** người dùng thấy bản mobile bị kéo giãn (mobile dựng cho 360–412) — đúng ý đồ của mốc 768, không phải lỗi layout.

### Dải desktop hẹp (768 → 1279)

Bản desktop dựng theo khung Figma 1440 với nhiều cột px cứng, nên có thêm một khối media query (trong `<style>`, mục "DẢI DESKTOP HẸP"):

| Dải | Thay đổi |
|---|---|
| ≥ 1280 | **giữ nguyên** thiết kế 1440, không rule nào chạm vào |
| ≤ 1279 | cột cứng co theo `clamp(sàn, vw, trần)` — trần đúng bằng số px thiết kế: PDP info 451 · tóm tắt giỏ/thanh toán 427 · aside chính sách 280 · ảnh campaign 575 |
| ≤ 1023 | lưới PLP về 3 cột (`!important` vì nút đổi 3/4 cột set class trực tiếp), carousel 5 → 3 card, 4 cam kết → 2 cột |
| ≤ 899 | gallery PDP về 1 cột (2 cột ở dải này chỉ còn ~180px/ảnh) |

Bộ chọn cố tình kèm luôn class `w-[…]` gốc (`.dk-sticky-info.w-\[451px\]`) để đọc là thấy ngay trần của từng cột. Đã đo lại: không màn nào tràn ngang ở 768 / 1024 / 1280, và ở 1280/1440/1600 mọi số đo trùng khớp bản gốc.

## Đối chiếu checkout với Figma (11/08/2026)

Nguồn: `Test MCP - nam v2` › `📐 Wireframes - Redesign` › `05 — Cart + Mini-cart / Mobile` › **Section 4 (`3547:55856`)** — 6 frame 390px là 6 trạng thái của màn Thanh toán. Đã trích spec bằng Figma plugin bridge rồi sửa `index.html` cho khớp:

| Chỗ | Figma | Code trước | Đã sửa |
|---|---|---|---|
| Tiêu đề màn | padding 16, chữ 18/**25** Medium | padding 12/16, 18/**28** | `py-4` + `.ck-h1{line-height:25px}` |
| Hàng "Tóm tắt đơn hàng" | cao **36**, nhãn **Regular** | cao 40, nhãn Medium | `h-9`, bỏ `font-medium` |
| Khối tóm tắt | padding 16/8 + kẻ dưới `#e5e5e5` | padding 0/8/8, không kẻ | `.ck-sum px-2 py-4` |
| Hộp thông báo | padding 8/16, hộp trong bo **8** | padding 0/8/8, bo 2 | `.ck-notice px-4 py-2` + `rounded-md` |
| Khối mỗi bước | padding 8/0 + kẻ trên `#f5f5f5` | không padding, không kẻ | `.ck-sec` |
| Tiêu đề bước **chưa tới** | cao **72** (padding 24) | luôn 56 | `.ck-sec.is-pending .ck-head` + toggle trong `paintCheckout` |
| Link "Thay đổi" | **14/20** Regular | 16px Light | `text-[14px] leading-5` |
| Nhóm field | gap **10** | gap 8 | `gap-2.5` |
| Ô nhập | padding ngang **8** | 12 | `px-2` |
| Thẻ rich-radio khi chọn | viền **#262626**, nền **trắng** | viền #0a0a0a + nền #fafafa | `.opt.on` |
| Vòng radio | viền **1px #d4d4d4** kể cả khi chọn | 2px, đổi sang đen khi chọn | `border border-border-3`, bỏ `.radio.on{border-color}` |
| Checkbox | viền **#d4d4d4**, bo 2 | viền #e5e5e5 | `border-border-3 rounded-xs` |
| Khoảng cách thẻ vận chuyển | **16** (mỗi thẻ trong khung padding 8) | 12 | `#shipOpts py-2 gap-4` |

Khớp sẵn, không phải sửa: nút CTA (48 · r2 · `#0a0a0a` · chữ 16 Regular `#fafafa`), tiêu đề bước 16/24 Medium, nhãn field 14/20 Medium, ô nhập cao 40 bo 2 viền `#e5e5e5`, placeholder `#737373`, hàng tiền cao 36, dòng "Tổng cộng" cao 56 chữ 16/24 Medium, ghi chú VAT `#262626`. Token `tokens.css` trùng khít hex của Figma (`#e5e5e5` = `--general-border`, `#f5f5f5` = `--general-secondary`, `#262626` = `--general-secondary-foreground`, `#d4d4d4` = `--unofficial-border-3`, `#d62845` = `--general-destructive`).

**Cố ý KHÔNG theo Figma:**
- Cặp nút **Cá nhân/Công ty**: bản vẽ để mục đang chọn nền đen 5% + viền 1.5px (kiểu "lún"), nhưng ngày 11/08/2026 user yêu cầu đổi sang kiểu **nổi lên** — giữ theo yêu cầu mới, xem "Quy ước segmented toggle".
- Nhãn hàng tóm tắt: bản vẽ ghi "Tóm tắt đơn hàng", code đang là "Giỏ hàng của bạn" (khác **nội dung**, không phải style) — chưa đổi.
- ~~Các dòng giảm giá `#d62845` (JUNE900, voucher, dùng điểm) có trong bản vẽ nhưng demo chưa có tính năng mã giảm giá.~~ → demo đã có: mỗi mã 1 dòng `Giảm giá(<CODE>)`, nhiều mã cùng lúc — xem "Chọn ưu đãi kiểu sàn TMĐT".
- **Thumb trong tóm tắt "Giỏ hàng của bạn": 100×133 thay vì 52×60 (yêu cầu user 14/08/2026)** — bản 52×60 làm tên sản phẩm cụt 1 dòng, khó đọc. Nay dùng đúng cỡ ảnh thẻ giỏ hàng, tên được `line-clamp-2`, hàng pre-order mang badge như ở giỏ; dòng quà đi cùng cỡ qua tham số `big` của `giftSummaryRow` (màn Hoàn tất vẫn gọi bản 52×60 gọn như cũ). Thang chữ 13/12 của tóm tắt giữ nguyên. Cùng ngày chỉnh tiếp theo yêu cầu user: **giá ghim đáy-PHẢI** (cột chữ stretch theo ảnh + `justify-between`, giá thêm `self-end`; giá quà 0 ₫ cùng khuôn), và dòng pre-order **bỏ chữ lặp "Pre-order ·"** (badge trên ảnh lo nhận diện) — chỉ còn "Nhận hàng dự kiến <ngày in đậm>"; áp cho cả thẻ ở màn Giỏ (cùng lý do badge). Ngày tách vào `<span class="font-medium">` nên phần chữ dịch bằng key tĩnh `'Nhận hàng dự kiến'`; sheet xác nhận + chi tiết đơn (ảnh không có badge) giữ nguyên dạng "Pre-order · …" dịch bằng luật regex.

## Logo đối tác thanh toán (11/08/2026)

4 file `assets/pay-1..4.png` nằm sẵn trong repo từ trước nhưng **chưa được map** vào checkout — mục thanh toán chỉ có radio + chữ. Nay map theo Figma `3028:47246` (khối Thanh toán của checkout mobile), áp cho **cả 2 bản**:

| Phương thức | File | Bề rộng |
|---|---|---|
| Thẻ tín dụng/Ghi nợ | `pay-1.png` (Visa + Mastercard) | **76**×24 |
| Chuyển khoản / QR code | `pay-3.png` | 38×24 |
| ATM | `pay-4.png` (napas) | 38×24 |
| Trả góp 0% | `pay-2.png` (Payoo) | 38×24 |

- `richRadio()` nhận thêm tham số **tuỳ chọn** `icon = [file, width, alt]`; không truyền thì render y như cũ (thẻ vận chuyển không có logo). Ảnh `h-6 object-contain`, bề rộng đặt bằng `style` vì `w-[76px]`/`w-[38px]` không có trong `tailwind.css` build sẵn.
- Figma cho 4 thẻ **cao bằng nhau 64** (thẻ "trả góp 0%" xuống 2 dòng kéo cả nhóm lên). Đặt sàn bằng `#payOpts .opt { min-height: 64px }` — scope trong `#payOpts` để thẻ vận chuyển vẫn ôm sát nội dung.
- `alt` ghi tên đối tác (Visa, Mastercard / QR code / Napas / Payoo) vì logo mang thông tin nhãn chữ không nói.
- **Canh dọc theo số dòng**: `richRadio` tự chọn `items-center` khi thẻ chỉ có nhãn (phương thức thanh toán) và `items-start` + `mt-0.5` cho nút radio khi có dòng phụ (phương thức vận chuyển — radio phải thẳng hàng với dòng tiêu đề). Trước đây mọi thẻ đều `items-start` nên chữ 1 dòng dính mép trên của thẻ cao 64, lệch hẳn so với logo vốn đã căn giữa.
- **Thứ tự trong Figma là** cc → trả góp → QR → ATM, code đang là cc → QR → ATM → trả góp. Chưa đổi vì đây là thay đổi nội dung chứ không phải icon/kích thước.

## Quy ước segmented toggle (mobile, 11/08/2026)

Mọi cặp nút chọn-1-trong-N (Cá nhân/Công ty, Giao hàng/Nhận tại cửa hàng) dùng chung `segToggle(attr, items, active, h)`:

- **Mục đang chọn NỔI LÊN**: nền trắng + `shadow-sm` + chữ đậm, đặt trên rãnh `bg-secondary` `p-0.5`. Mục không chọn: nền trong suốt + chữ `text-muted-foreground`.
- Kiểu cũ (viền hộp, tô xám đúng mục đang chọn trên nền trắng) đã bỏ — nó đọc **ngược**: mục được chọn nhìn như bị lún xuống. Cặp đổi ngôn ngữ ở bảng Cài đặt vốn đã dùng kiểu nổi này, giờ cả app thống nhất.
- `segBtnClass(on, h)` là nguồn class **duy nhất**, dùng cho cả lúc dựng markup lẫn lúc JS đổi trạng thái (handler `[data-vat-type]`), nên hai chỗ không thể lệch nhau.
- Không áp cho: dòng danh sách trong bottom sheet (chọn size / chọn tỉnh) — nền xám ở đó là highlight **dòng đang chọn của một danh sách**, không phải tab.

## Checkout: 3 nâng cấp từ vòng đề xuất (11/08/2026, cả 2 bản)

Dựng demo ở `demo-checkout-upgrades.html` → user duyệt 3/8 → áp vào app:

**1. `ckMaxStep` — sửa một bước không đẩy lùi các bước sau.** Trước đây trạng thái section tính tuyến tính theo `ckStep`, nên bấm "Thay đổi" ở bước 1 là bước 2-3 tụt hết về `pending` (tóm tắt thu lại, phải Xác nhận lại từng bước). Nay tách 2 biến: `ckStep` = đang mở, `ckMaxStep` = xa nhất đã xong, công thức thành `i === ckStep ? 'open' : i <= ckMaxStep ? 'done' : 'pending'`. Section đang mở mà trước đó đã xong thì nút đổi nhãn **"Lưu thay đổi"** (đặt trong `paintCheckout` vì phụ thuộc trạng thái) và bấm xong **nhảy thẳng về `ckMaxStep`**. Cặp nút Giao hàng/Nhận tại cửa hàng cũng ẩn theo `ckMaxStep` — quay lại sửa bước 1 không làm nó hiện lại rồi bấm nhầm mất sạch. Mọi chỗ gán `ckStep` (đăng nhập, `data-auth`, đổi tab, reset) đều đồng bộ `ckMaxStep`.

**2. Sổ địa chỉ đã lưu.** Tách `ADDRESSES` thành **một nguồn dùng chung** cho tab Địa chỉ của trang Tài khoản và bước giao hàng — trước đây 2 chỗ viết tay 2 bản riêng nên khách đã đăng nhập vẫn phải gõ lại 6 ô. `ckAuth` → mở ra là 2 thẻ địa chỉ + **"+ Thêm địa chỉ mới"** (đổi từ "Giao đến địa chỉ khác" theo góp ý) xổ form; khách vãng lai vẫn thấy form ngay. Chọn địa chỉ khác chỉ đổi thẻ, chuyển sang/rời khỏi "thêm mới" mới dựng lại màn. Tóm tắt `ckShipDoneHTML()` đọc từ địa chỉ đã chọn hoặc từ chữ vừa gõ (`ckShipName/ckShipPhone/ckShipLine` qua `data-ckf`) — **xoá hẳn chuỗi chết "User name - 0 1234 5678"**.

**3. Đặt xong thì khoá đơn, dọn giỏ, không đăng xuất ngầm.** `placeOrder()` sinh mã theo đúng hệ **DAFC1029xx** của màn Đơn hàng (trước in cứng `#MG-2026-0807`, không khớp đơn nào), `unshift` vào `ORDERS` nên tab Đơn hàng thấy ngay, rồi **dọn giỏ** (`CART.length = 0`, badge về 0). Quay lại route checkout khi `ckPlaced` thì render thẻ "Đơn … đã được đặt" thay vì form — hết cửa đặt đơn thứ hai. `CART_BASE` giữ bản gốc để `data-reset` dựng lại giỏ, và **`ckAuth = false` đã bị bỏ khỏi `data-reset`** — nút "Tiếp tục mua sắm" không còn âm thầm đăng xuất. Trạng thái giỏ rỗng tách thành `cartEmptyHTML()` vì giờ có 2 đường tới (xoá hết item · đặt hàng xong).

## Checkout: nhận tại cửa hàng (mobile, 11/08/2026)

Ngay trên khối 3 section của màn `checkout` có cặp nút chọn hình thức nhận hàng (**Giao hàng** | **Nhận tại cửa hàng**, cùng kiểu phân đoạn với Cá nhân/Công ty của khối VAT). State ở `ckMode` (`'ship'` mặc định · `'pickup'`), kèm `ckCity` / `ckStore`.

- **Số section đổi theo chế độ**: giao tận nơi 3 section như cũ; nhận tại cửa hàng còn **2** — bỏ bước "Phương thức vận chuyển" (không có gì để chọn). Chỉ số vẫn chạy 0,1,… nên `ckSection` / `ck-next` / `ck-change` / `paintCheckout` dùng lại nguyên vẹn, không cần cơ chế riêng.
- **Hiện dần theo tiến độ** (`ckPickupOpen()`, 11/08/2026): mở ra chỉ có **dropdown Thành phố** → chọn xong mới hiện **DANH SÁCH cửa hàng** của thành phố đó (`#storeOpts`, thẻ chọn — không phải dropdown) → chọn cửa hàng xong mới hiện **các ô nhập của người nhận**: Họ và tên · SĐT · Email · Tỉnh thành sinh sống (`ckHome`, tách khỏi `ckProvince` của địa chỉ giao hàng) + nút Xác nhận. Không đập vào mặt một form dài ngay từ đầu; dòng **"Bước n/3"** trên cùng nói trước còn mấy chặng, và khi chưa chọn thành phố có 1 dòng hướng dẫn thay cho khoảng trống.
- **Thẻ cửa hàng dùng `storeOpt()` riêng, KHÔNG dùng `richRadio`**: richRadio gộp phần phụ thành một dòng nên địa chỉ + giờ dính nhau ở cùng cỡ chữ với tên cửa hàng, và cả chuỗi gộp thành **một text node** nên i18n không dịch nổi. `storeOpt` tách 3 dòng: tên 14 Medium · địa chỉ 13 `#262626` · giờ 13 `#737373` (tách `<span>Mở cửa</span>` riêng để dịch được). Vỏ ngoài giữ `.opt`/`.radio` + `data-opt` nên handler và CSS trạng thái cũ chạy y nguyên.
- **A11y**: `field()`/`pickField()` giờ sinh `id` + `label[for]` (bấm nhãn là focus/mở được sheet), input có `type` + `autocomplete` (name/tel/email) và `placeholder:text-muted-foreground` (trước đó rơi về màu preflight `#9ca3af`, tương phản 2.5:1 — trượt WCAG); nhóm cửa hàng là `role="radiogroup"` + `aria-labelledby`, mỗi thẻ `role="radio"` + `aria-checked` cập nhật khi bấm; nút mở picker có `aria-haspopup="dialog"`.
- **Validate khi bấm Xác nhận** (`validatePickup`): họ tên bắt buộc · SĐT `^0\d{8,10}$` (bỏ khoảng trắng trước khi kiểm) · email để trống được, có thì phải đúng dạng. Lỗi hiện **ngay dưới ô** kèm `aria-invalid` + `aria-describedby`, viền đỏ bằng class `.fld-err` (tailwind build sẵn không có `border-destructive`, và cần `!important` vì `.border-border` cùng specificity), focus nhảy tới ô sai đầu tiên. Gõ lại là lỗi tự mất.
- **Tóm tắt sau khi Xác nhận nhắc lại người nhận**: `ckStoreDoneHTML()` dựng "Họ tên - SĐT" rồi mới tới cửa hàng/địa chỉ/giờ. Dùng chung 1 hàm cho `p0done` và `paintStore` — trước đây 2 chỗ dựng markup riêng nên đổi cửa hàng sau khi xác nhận là mất dòng người nhận.
- **Focus theo bước**: chọn xong cửa hàng lần đầu → con trỏ vào ô Họ và tên + cuộn khối người nhận vào tầm mắt; đổi thành phố → trả focus về chính nút Thành phố.
- **Tới bước Thanh toán thì ẩn luôn cặp nút Giao hàng / Nhận tại cửa hàng** (`#ckModeTabs`, toggle trong `paintCheckout`): hình thức nhận hàng đã chốt, để đó chỉ tổ bấm nhầm — mà đổi tab là `ckStep` về 0, mất sạch bước vừa làm. Bấm "Thay đổi" ở section trên thì cặp nút hiện lại. Mốc ẩn khác nhau theo luồng: **section 1** ở nhận tại cửa hàng (chỉ 2 section) và **section 2** ở giao hàng.
- Đổi thành phố thì **xoá cửa hàng đang chọn** (cửa hàng cũ không thuộc thành phố mới) nên 2 phần sau tự thu lại.
- **Dựng lại màn chỉ khi CẤU TRÚC đổi** (`rerenderCheckout`): chọn thành phố, chọn cửa hàng **lần đầu**, đổi tab hình thức nhận hàng. Đổi sang cửa hàng khác khi các ô đã hiện thì chỉ chuyển thẻ đang chọn — **giữ nguyên chữ đã gõ** ở SĐT/email.
- `field`/`pickField` phải để **ngoài** `screenCHECKOUT` vì `ckPickupOpen()` dựng lại phần thân nhiều lần, không chỉ lúc render màn.
- Ô thành phố + ô tỉnh sinh sống dùng lại bottom sheet `__openPicker` của địa chỉ giao hàng — không phát sinh kiểu UI mới.
- Nút Xác nhận mang `data-require="store"`; chưa chọn cửa hàng thì chặn kèm `toast('Chọn cửa hàng nhận hàng')`.
- Địa chỉ + giờ mở cửa hiện ở 2 chỗ (`#ckStoreInfo` dưới ô chọn, `#ckStoreDone` ở phần tóm tắt khi đã xác nhận) và được `paintStore()` cập nhật **tại chỗ** — không dựng lại cả màn để không mất chữ đang gõ ở ô tên/điện thoại.
- Dữ liệu ở `DAFC_STORES` (demo): `[thành phố, [[tên, địa chỉ, giờ mở cửa], …]]` — HCM 3 · Hà Nội 3 · Đà Nẵng 1. Helper `storesOf(city)` / `storeInfo(name)`.
- Đổi tab thì **dựng lại màn tại chỗ** (`root.innerHTML = RENDER.checkout()` + `wire` + `localizeNew`, có chạy `scrollCleanups` như `go()`) vì số section khác nhau; `ckStep` về 0.
- Đăng nhập giữa chừng đặt `ckStep = 1`; ở chế độ pickup bước 1 là Thanh toán nên `screenCHECKOUT()` **kéo lại `ckStep = 0` khi chưa chọn cửa hàng**.
- Tóm tắt tiền: dòng "Giao hàng — Free" đổi thành "Nhận hàng — Tại cửa hàng"; màn `done` đổi 2 dòng cuối thành "Nhận tại — *tên cửa hàng*" và "Sẵn sàng nhận — Từ 12/08". Nút "Tiếp tục mua sắm" (`data-reset`) trả `ckMode/ckCity/ckStore` về mặc định.

## Mobile web thật

Không có khung điện thoại, không giới hạn chiều cao — trang cuộn bằng **body**.

- `<meta viewport ... viewport-fit=cover>` + `env(safe-area-inset-bottom)` cho máy có tai thỏ / thanh gesture
- Header `sticky top-0`, thanh Bộ lọc `sticky top-[48px]`
- Sticky CTA dùng `position: fixed` theo viewport
- Đã kiểm tra không tràn ngang ở 360 / 375 / 393 / 412 px

## Bản desktop (`desktop.html`)

Fork từ `index.html`, **giữ nguyên toàn bộ** data / router SPA / i18n VI-EN / settings FAB / luồng auth-OTP; chỉ viết lại layout theo các frame desktop 1440px trong Figma:

- **Header 3 tầng** (Figma `2171:13006`, 1440×144): promo bar 32 (tái dùng slider `PROMO_MESSAGES`) + main nav 60 (dept trái · logo giữa · đổi ngôn ngữ/cửa hàng/tài khoản/giỏ phải) + subheader 52 (category nav + nút Tìm kiếm). Sticky `top-[-32px]` — promo bar cuộn trôi, 112px còn lại dính.
  - **Ô nhập 270px của Figma (`2171:12954`) đã đổi thành NÚT "Tìm kiếm" + icon (11/08/2026)** — bấm mở layer tìm kiếm đè lên trang, xem mục "Layer tìm kiếm". Nút theo dáng Button/Ghost h-36 như các nút tiện ích khác; ô nhập thật nằm trong layer.
  - Dept đang chọn (`Nam` = State Active trong Figma) tô `#0a0a0a`, các dept khác `#404040`; state giữ ở biến `dkDept`.
  - **Hàng dept = 3 ngành hàng ngang cấp** `Nam · Nữ · Làm đẹp` (`DK_DEPTS`, 10/08/2026). "Làm đẹp" là ngành hàng riêng chứ không phải danh mục con của Nam/Nữ nên nó nằm ở tầng này và đã bỏ khỏi subheader. Cả 3 dept là link phẳng (không mega panel).
  - **Subheader ĐỔI THEO DEPT** (`dkNavCats()`) — tương đương bấm tab Nam/Nữ/Làm đẹp ở menu mobile. Nam/Nữ dùng `DK_NAV_CATS` cố định; Làm đẹp sinh thẳng từ `MENU_DATA['Làm đẹp'].cats` nên 2 bản luôn khớp (sửa cây beauty 1 chỗ là cả mobile lẫn desktop đổi theo). Mỗi nhóm beauty có mega panel **1 cột** (nhánh `item.sub` — ngành này không tách giới tính).
  - **Nút giữ ĐÚNG size Figma** — `Button/Ghost Muted/Regular`: h-36 + padding 8/16 (`h-9 px-4`). Không được bóp padding để nhét thêm mục; đo lại thực tế khớp component: Quần áo 92/93 · Túi xách 91/91 · Phụ kiện 96/96 · Khuyến mãi 118/118.
  - **`wireSubheader()` — thanh cuộn + mũi tên kiểu Farfetch.** `.dk-nav-strip` cuộn ngang (`no-scrollbar`), mỗi lần trượt 60% bề rộng. Mũi tên là **overlay `absolute` ở 2 mép** (không nằm trong luồng) kèm gradient fade, nên ẩn/hiện không đổi bề rộng strip → danh mục không nhảy khi cuộn, và `sync()` chỉ cần đo `over` một lần.
    - **Mỗi bên chỉ hiện khi hướng đó CÒN nội dung**: đầu danh sách không có nút trái, cuộn sang phải mới hiện; tới cuối thì nút phải biến mất. Không bày nút bấm vào chẳng làm gì (bỏ hẳn state `disabled` mờ 25% của bản trước).
    - Trước đây `body` có `min-width:1280px` nên strip luôn ≥ 1091px → ngành thời trang (849px) không bao giờ hiện mũi tên. **Từ khi có cầu nối responsive, min-width đã bỏ**, nên ở dải hẹp (768–1279) ngành thời trang cũng có lúc hiện mũi tên — đúng ý đồ, `sync()` vốn đã đo theo bề rộng thật.
    - **`.dk-nav-arrow` KHÔNG được khai `display` trong `<style>`.** Khối style inline nằm SAU `tailwind.css` mà cùng specificity (0,1,0), nên `display:flex` ở đó **đè luôn `.hidden{display:none}`** — JS gắn class `hidden` mà nút vẫn hiện nguyên (bug 10/08/2026: ngành Nam/Nữ đủ chỗ nhưng vẫn thấy 2 mũi tên). Kích thước/display để utility trong markup, `sync()` bật tắt bằng cặp `hidden` ⇄ `flex`; CSS chỉ giữ `:hover` và `[disabled]`. Quy ước chung: **rule trong `<style>` đừng khai lại thuộc tính mà Tailwind utility đang điều khiển động.**
    - Đo lại khi `document.fonts.ready`: Montserrat tải từ Google Fonts, nếu font về sau lần đo đầu thì bề rộng chữ đổi mà trạng thái mũi tên vẫn cũ.
  - **Mega panel render NGOÀI thanh cuộn** (sibling của hàng nav, trong `.dk-sub`): `overflow-x` sẽ cắt mất panel nếu panel là con của strip. Vì mất quan hệ cha-con nên **hover-intent chuyển từ CSS sang JS** — nút và panel nối nhau bằng `data-mega`, mở/đóng đều trễ 120ms (đóng trễ để kịp rê chuột từ nút xuống panel). Scrim đổi sang `.navbar:has(.dk-sub.mega-open)`; mục đang mở panel thêm class `.on` để đậm chữ.
  - `dkDept` phải ghi **trong handler `[data-nav]`**, trước khi `go()` chạy — `navBar()` dựng lại ngay trong `go()` và subheader đọc `dkDept` để chọn bộ danh mục.
  - **Nút dept phải truyền `crumbs=[dept]`** (`dkCatAttrs(d, [d])`). `isBeautyPlp()` nhận diện ngành hàng qua `crumbs[0]`; để rỗng như trước thì bấm "Làm đẹp" ra nhầm 16 SP thời trang và bộ lọc hiện facet Màu sắc/Kích thước thay vì Dung tích/Ưu đãi.
  - Icon tài khoản / giỏ hàng 16px (Icon Button 44×44), khớp `Size=16` của Icon-Cpn.
  - **Không có viền dưới** ở cả hàng nav lẫn subheader — xem "Quy ước border"; `.navbar::after` và khối JS toggle `.merged` đã bỏ, chỉ `.filterbar::after` còn lại.
  - Figma để nhãn `Store location` + placeholder `What are you looking for?` bằng tiếng Anh giữa bản tiếng Việt — code **giữ chuỗi tiếng Việt** vì màn hình chạy qua i18n VI↔EN.
- **Mega menu** hover thuần CSS (`.dk-nav-item:hover`), cột Nam/Nữ sinh từ `MENU_DATA`, cột brands từ `MENU_BRANDS`; click điều hướng PLP chế độ danh mục qua `data-plp-title/-crumbs`.
  - **Nhịp thoáng + liền mạch kiểu cettire (17/08/2026, yêu cầu user)** — số đo lấy trực tiếp từ `cettire.com/vn` (mở panel "Women" đo bằng `getComputedStyle`): panel của họ `box-shadow: none`, **không viền**, chữ 14/19.6, mỗi dòng cách 31px, tiêu đề nhóm cách mục đầu 43px. Áp sang demo: panel **bỏ viền + bỏ bóng** (nối thẳng vào header), khoảng cột **56 → 64**, padding **`py-8` → `pt-8 pb-10`**, giãn dòng trong cột **`gap-2` → `gap-3`** (nhịp 28 → **32px**), tiêu đề nhóm **`pb-1` → `pb-4`** (tiêu đề → mục đầu = **44px**). Panel "Thương hiệu" cao 366 → 424px.
  - 2 cột thương hiệu không có tiêu đề chừa **đúng khối tiêu đề rỗng** (`<p aria-hidden>&nbsp;</p>` cùng class) thay cho `pt-6` áng chừng — cả 3 cột giờ có dòng chữ đầu cùng ở y=232, và sửa nhịp 1 chỗ thì cả 2 nhánh đi theo.
  - **Lưới 4 cột đều nhau**: `.dk-mega-grid` = `repeat(4, minmax(0,1fr))` gap 64 — **3 cột nội dung + ảnh ghim cứng ở cột 4** (`.dk-mega-teaser { grid-column: 4 }`). Trước đó cột nội dung là flex-wrap tự co (`min-w-[168px]`) còn ảnh cố định 264px, nên mở "Túi xách" (2 nhóm) và "Thương hiệu" (4 cột) ra 2 lưới lệch hẳn nhau. Mục ít nhóm hơn thì **bỏ trống cột 3**, không kéo giãn. Đo ở 1440: 4 cột × 302px; ở 1024: 4 × 198px, không tràn, không vỡ chữ. `col-start-4` không có trong `tailwind.css` đã build nên khai tay trong `<style>`.
  - **Thương hiệu chia đều 3 cột** (9/8/8): cột 1 mang luôn tiêu đề + "Tất cả thương hiệu", 2 cột sau `pt-6` cho thẳng hàng. Bản cũ là 1 cột tiêu đề + 3 cột chữ = 4 cột, cộng ảnh thành 5 → không vừa lưới.
  - ~~**Dòng "Tất cả + &lt;danh mục&gt;" hết đậm, hết gạch chân** (17/08/2026) — dùng đúng kiểu chữ của các mục còn lại.~~ → **Dòng này ĐÃ BỎ HẲN 18/08/2026**, xem ngay dưới. Underline duy nhất còn lại trong panel là **chú thích dưới ảnh teaser** ("Bộ sưu tập mới") — giữ vì đó là CTA của ảnh, muốn bỏ thì nói.
  - **BỎ HẲN dòng "Tất cả …" khỏi mega panel (chốt 18/08/2026, yêu cầu user)**: mọi cột giờ vào thẳng danh mục con, không còn dòng dẫn cấp trên. Xoá đúng 1 dòng render trong `dkMegaCol()`.
    - **Data `all` GIỮ NGUYÊN** (`MENU_DATA[].cats[][1].all`, `MENU_BRAND_SUB.all`) và `dkMegaCol` vẫn nhận `allLabel`/`allAttrs` — bật lại tốn 1 dòng. Quan trọng hơn: `all` **vẫn đang được panel menu trượt dùng** (`.ms-view` → `headRow(menuSub.all, …)`), xoá khỏi data là vỡ chỗ đó. Cùng lối với cột `desc` của `COOKIE_CATS`: giữ data, không render.
    - **Panel menu trượt `.ms-view` KHÔNG đụng** — user chỉ định "trong dk-mega". Menu đó vẫn có dòng "Tất cả …" ở đầu mỗi submenu.
    - **Không mất đường đi nào**: nút danh mục ở subheader đã trỏ tới PLP cấp đó, ảnh teaser cột 4 cũng trỏ về `item.label`. Chỗ *hơi* hụt: cột "Nam"/"Nữ" trong panel không còn lối riêng vào "tất cả hàng mới của giới tính đó" (tiêu đề cột là `<p>`, không bấm được) — vào bằng subheader thì ra PLP cấp danh mục, không tách giới tính. Muốn giữ lối đó thì cho tiêu đề cột bấm được.
    - Đo lại đủ **21 panel** (Nam 6 · Nữ 6 · Làm đẹp 9): **0 đường dẫn nào bắt đầu bằng "Tất cả"**. Số mục Nam 98 → **87**. Chiều cao panel co lại: 360/432/360/324/360/468 → **300/364/300/280/300/396**; cơ chế chạy chiều cao khi đổi mục đọc số đo trực tiếp nên không phải sửa gì.
    - **Cột thẳng hàng vẫn nguyên**: dòng chữ đầu của mọi cột trong cả 6 panel Nam đều ở `top = 236` — khối tiêu đề rỗng (`<p aria-hidden>&nbsp;</p>`) vẫn làm đúng việc cho 2 cột thương hiệu không tiêu đề. Panel thương hiệu nay 9/8/8 mục, 3 cột thẳng hàng.
  - **Cỡ chữ nav lên 16, tiêu đề cột mega lên 14 (17/08/2026, yêu cầu user)**: hàng ngành hàng `.dk-dept` **16/24** · danh mục subheader `.dk-nav-link` **16/24** · 98 mục trong mega panel **16/24** · tiêu đề cột mute trong mega **14/20** (trước 12). Vẫn nằm trong thang text style. Đo sau khi tăng: hàng nav vẫn cao 60, subheader 52, không nút nào vỡ chữ ở 1440 lẫn 1024; ngành "Làm đẹp" 11 mục thì thanh danh mục tràn (1567 > 1409) và **2 mũi tên trượt tự hiện** như thiết kế, trang không tràn ngang.
    - ⚠️ **Phần "98 mục trong mega panel 16/24" ĐÃ BỊ ĐÈ ngày 18/08/2026** — xem gạch đầu dòng ngay dưới. Hai hàng nav (`.dk-dept`, `.dk-nav-link`) vẫn **16/24** như mục này ghi.
  - **Chưa tăng** (chờ ý anh/chị): nút ngôn ngữ `VIE/ENG` vẫn 14 — đó là nút tiện ích, không phải mục menu. (Chú thích ảnh teaser cũng 14, nay đúng bằng cả panel.)
  - **CẢ MEGA PANEL MỘT CỠ 14 (chốt 18/08/2026, yêu cầu user)** — đè phần "mục mega lên 16" của quyết định 17/08. Toàn bộ chữ **hiện ra khi hover** vào subheader giờ cùng cỡ 14; phân cấp chuyển sang lo bằng **weight + màu**, không bằng cỡ chữ:

    | | Trước (17/08) | Nay (18/08) |
    |---|---|---|
    | Tiêu đề nhóm | 14/20 regular, muted `#737373` | **14/20 medium, `text-secondary-foreground` #262626** |
    | Đường dẫn danh mục (98 mục) | 16/24 regular, `#404040` | **14/20 regular, `#404040`** (giữ màu) |
    | Nhãn dưới ảnh teaser | 14/20 medium | không đổi — nay đúng bằng cả panel |

    Cả 3 đều dùng class sẵn có trong `tailwind.css` đã build → **không phải rebuild**. Tiêu đề giữ `tracking-[0.08em]` (chữ hoa cần thoáng). Sửa đúng 2 dòng trong `dkMegaCol()`. **Không đụng 2 hàng nav** — `.dk-dept` và `.dk-nav-link` vẫn 16/24 medium, vì đó là thanh luôn hiện chứ không phải nội dung xổ ra khi hover.

    Đo `getComputedStyle` trên 3 panel đầu: tiêu đề `14px / 500 / uppercase / rgb(38,38,38) / tracking 1.12px`; **toàn bộ 16+18+13 đường dẫn đều `14px / 400`**; mọi phần tử còn ở 16px đều là **div/span bọc không có text node** (thừa hưởng cỡ body, không vẽ chữ nào).
  - **Tiêu đề nhóm trong mega: UPPERCASE** (17/08/2026, yêu cầu user) — `tracking-[0.08em]`, viết hoa bằng **class `uppercase`, KHÔNG gõ hoa vào chuỗi**: chuỗi gốc là key i18n ("Nam"/"Nữ"/"Thương hiệu"…), gõ hoa là mất bản dịch (đã kiểm lại 18/08: DOM giữ `Nam`, sang EN ra `Men`, về VN lại `Nam`). Đây là **ngoại lệ có chủ ý** của quy ước "không dùng UPPERCASE" — chỉ áp cho nhãn nhóm trong mega panel. Weight regular của bản 17/08 đã đổi sang **medium** ngày 18/08 (xem trên).
  - **Thang màu subheader đổi cơ chế** (17/08/2026, yêu cầu user): nghỉ = `--general-secondary-foreground` **#262626** (trước #737373, phải hover mới đọc rõ); **hover vào thanh thì mục đang trỏ ĐẬM LÊN #0a0a0a, mọi mục còn lại tụt về #737373** — hover ăn 2 chiều một lúc, cách nhau 3 bậc mực nên nhìn ra ngay đang trỏ vào đâu. Loại trừ **mục đang xem** (`aria-current` giữ #0a0a0a) và **"Khuyến mãi"** (giữ đỏ ở mọi state). Hàng ngành hàng phía trên KHÔNG đổi, vẫn thang mực 3 bậc cũ.
    - **`:not(:hover)` trong rule làm mờ là bắt buộc.** Bản đầu viết `.dk-nav-strip:hover .dk-nav-link:not(.text-destructive):not([aria-current])` (specificity **5**) còn rule cho mục đang trỏ là `.dk-nav-strip .dk-nav-link:not(...):hover` (specificity **4**) → rule mờ thắng luôn cả mục đang trỏ, hover vào là **cả thanh mờ đều, không mục nào đen lên** (đúng lỗi user báo). Loại thẳng mục đang trỏ ra khỏi rule mờ thì hết phải đấu specificity.
    - **Cách kiểm khi không dựng được `:hover` thật** (Browser pane ẩn): `color` có `transition` nên `getComputedStyle` trả giá trị CŨ nếu transition chưa tick — phải chèn `*{transition:none!important}` trước khi đo, rồi nhân bản 2 rule với `:hover` đổi thành class (giữ nguyên specificity) và gắn class để mô phỏng. Kết quả đo: nghỉ 8 mục #262626 (1 mục đỏ), hover "Túi xách" → #0a0a0a còn 6 mục kia #737373, hover "Quần áo" → đảo lại đúng như vậy.
  - Trước đó chữ trong panel đã về thang text style: mục 14px, tiêu đề cột 12px (bản gốc là 13px — ngoài thang).
  - **Nhãn nhóm +1 nấc weight · ảnh teaser VUÔNG và to hơn (18/08/2026, yêu cầu user)** — chỉ 2 bản desktop, mobile không có mega panel.
    - **Weight nhãn nhóm đẩy lên 1 bậc ở CẢ bản gốc LẪN 2 bộ da**, để đổi bộ da nào cũng thấy thay đổi — mỗi bộ da có điểm xuất phát riêng nên **không gộp về một giá trị chung**:

      | | Trước | Sau |
      |---|---|---|
      | bản gốc (markup) | `font-medium` 500 | **`font-semibold` 600** |
      | `skin-mp` (MR PORTER) | 500 | **600** |
      | `skin-mt` (Mytheresa) | 400 | **500** |

      *(`skin-mt` thấp hơn 1 bậc vì bộ da đó ép toàn trang về 400 — nấc của nó tính từ 400.)*
    - **Ảnh teaser "Bộ sưu tập mới"**: `aspect-ratio` **264/160 → 1/1**. Riêng `desktop-editorial.html` còn nới cột teaser **264 → 342px** vì ở đó teaser là cột cứng `w-[…]`, không phải 1 ô của lưới 4 cột như bản chính.

      | | Ảnh trước | Ảnh sau |
      |---|---|---|
      | `desktop.html` (lưới 4 cột) | 296×180 | **296×296** — bộ da có kẻ dọc thì 255×255 (trừ `padding-left: 40px`) |
      | `desktop-editorial.html` (cột cứng) | 264×160 | **342×342** — bộ da có kẻ dọc thì 301×301 |

    - Panel cao lên theo ảnh: `desktop.html` panel đầu 300 → **396**; `desktop-editorial.html` 339 → **418**. Đã kiểm **6 panel × 3 bộ da**: **0 panel tràn**, cột nội dung không bị bóp (979px ở 1440). Thử luôn dải hẹp **1024**: cột còn 563px, 0 panel tràn, trang không tràn ngang (1009/1024). Console sạch trên tab mới ở cả 2 file.
  - **Hover gạch chân — CHỈ TRONG DROPDOWN (17/08/2026, yêu cầu user; giữ nguyên sau đợt 18/08)**: 98 đường dẫn trong mega panel (`.dk-mega-grid > div button:hover`) gạch chân khi hover, chữ lúc nghỉ vẫn sạch — kiểu `cettire.com/vn`. Rule bám vào `button` nên **tiêu đề nhóm (thẻ `<p>`) không bị gạch chân** — đã kiểm bằng `matches()`: đường dẫn khớp selector, tiêu đề không. `text-underline-offset: 2px` cho khớp `underline-offset-2` dùng sẵn trong file. **THANH NAV GIỮ NGUYÊN**: hàng ngành hàng `.dk-dept` và danh mục subheader `.dk-nav-link` chỉ đổi màu theo thang mực 3 bậc, không gạch chân (user chốt lại cùng ngày sau khi thử áp cho cả 3 tầng — quyết định 10/08/2026 bên dưới vẫn nguyên giá trị cho thanh nav). Ảnh teaser không đụng. Bản mobile không có rule này (menu là panel trượt, không có hover).
  - **Đổi giữa các mục cho liền mạch kiểu Farfetch (17/08/2026, user chê "chưa mượt")** — 3 nguyên nhân đo được, sửa cả 3:
    1. **Chờ hover-intent 120ms MỖI LẦN đổi mục.** Nay 120ms chỉ còn cho **lần mở đầu** (để lướt ngang thanh menu không nháy panel); panel đang mở thì đổi mục là **đổi ngay** (`openLater` kiểm `isOpen()` trước).
    2. **Panel mới fade từ 0 + trượt 6px trong khi panel cũ fade ra** → nhìn ra một nhịp "tắt rồi bật". Nay lúc đổi mục gắn class `.mega-swap` khoá transition opacity/transform, **nội dung đổi tức thì**, mặt phẳng đứng yên.
    3. **Chiều cao nhảy tới 144px** — đo 6 panel: 360 · 432 · 360 · **324** · 360 · **468**. Nay chiều cao chạy mượt `.26s` từ cao cũ sang cao mới: đặt `height = cao cũ`, ép layout bằng `void offsetHeight`, rồi đặt `height = cao mới` (không dùng rAF — tab nền/cửa sổ ẩn là rAF đứng). Xong thì xoá `height` inline + class để lần mở/đóng sau vẫn có fade như cũ. Cần `overflow: hidden` trên `.dk-mega` để lúc cao đang chạy nội dung bị cắt gọn.
    - Đo lại chuỗi thao tác: hover lần đầu → sau 120ms mới mở (không swap class) · đang mở rê sang mục khác → **mở ngay**, có `height` inline + `.mega-swap` · sau 300ms → xoá sạch inline/class · rê sang mục không có panel (Pre-loved) → đóng sau 120ms, không sót `mega-swap` hay `height` nào.
  - **Hiệu ứng hover kiểu Farfetch (10/08/2026)**: **KHÔNG gạch chân** ở thanh nav (đối chứng cả Farfetch lẫn component Button trong Figma — không state nào có underline). Hover theo đúng 2 biến thể Button: hàng giới tính + nút tiện ích là **Ghost** → "nhún" nền đen 5% (`.ghost-hover`, r2); danh mục subheader là **Ghost Muted** → chỉ đậm chữ, không nền. **MÀU chữ của cả 2 hàng giờ do thang mực 3 bậc của nav cấp** (#737373 → hover #404040 → đang chọn #0a0a0a), xem mục "Nav desktop: state đang chọn". Panel + **scrim tối `rgba(0,0,0,.45)`** phủ phần trang bên dưới mở sau **120ms** (hover-intent — lướt ngang thanh menu không nháy panel). Scrim là `div.dk-scrim` fixed `z:-1` NẰM TRONG `.navbar` (stacking context z-50) nên đè lên nội dung trang nhưng dưới 3 tầng header + panel; bật bằng `.navbar:has(.dk-nav-item:hover > .dk-mega)` — mục không có panel (Pre-loved, Khuyến mãi) không làm tối trang. Độ tối .45 cùng tông mọi backdrop khác của app.
### Cụm tiện ích header + tìm kiếm mở trên nav (17/08/2026, yêu cầu user, CHỈ DESKTOP)

- **Nút ngôn ngữ = CỜ + mã 3 chữ**, hiện **ngôn ngữ SẼ CHUYỂN SANG** (chốt lại cùng ngày sau khi thử hướng ngược): đang tiếng Việt → **cờ Anh + `ENG`**, đang English → cờ Việt + `VIE` (`dkLangChip()`, handler `[data-dklang]` vẽ lại cả cờ chứ không chỉ đổi chữ). Cờ vẽ tay bằng SVG 20×14 — **không dùng emoji 🇻🇳** vì Windows không có glyph cờ, ra 2 chữ cái. Nhãn mang `data-i18n-skip` (mã ngôn ngữ, không dịch).
- **Bỏ nút "Danh sách cửa hàng"** khỏi header (link trong footer vẫn còn).
- **Nút tìm kiếm dời từ subheader lên hàng nav trên** → thứ tự cụm phải: **`search · ngôn ngữ · tài khoản · giỏ`** (đảo chỗ search ↔ ngôn ngữ, chốt lại cùng ngày). Subheader giờ chỉ còn thanh danh mục.
- **Bấm search: ô nhập đè lên hàng nav, CANH GIỮA** (tham chiếu `stradivarius.com/us/?s_layer=search`) — `#dkNavSearchField` absolute trong `#dkNavRow` với **lề 2 bên bằng nhau** qua biến `--dk-search-inset: 230px`; ngành hàng + logo mờ về 0 nên hàng nav sạch, ô nổi chính giữa, chỉ cụm 4 nút bên phải còn nguyên chỗ. Icon search **đổi thành ✕**, chính nó đóng lại.
  - Con số **230** = bề rộng cụm phải tính từ icon search (search 44 + ngôn ngữ ~94 + tài khoản 44 + giỏ 44 = 226) **+ 4 hở**, nên mép phải của ô đứng sát ngay icon search. Vì search giờ là nút ĐẦU của cụm, hiệu ứng quét từ phải sang trái vẫn đọc ra là "ô trượt ra từ icon search". Đo: 1440 → ô 965px, 1024 → 549px, lề 2 bên đều đúng 230/230, cách icon 4px, không đè icon.
  - **Kiểu ô: nền xám đặc `--general-secondary` (#f5f5f5) + bo 2, KHÔNG gạch chân** (chốt lại cùng ngày). Focus thì viền chuyển `--general-primary` — cùng ngôn ngữ với mọi input khác trong file (`focus:border-primary`), viền lúc nghỉ để `transparent` nên ô trông phẳng.
  - **Animation quét bằng `clip-path: inset(0 0 0 100%)` → `inset(0)`** (.38s). KHÔNG animate `width` (chữ bị nén lại trong lúc chạy) và không dùng `scaleX` (méo chữ).
  - **Mở tìm kiếm thì SUBHEADER TẮT và tấm gợi ý KÉO LÊN 52px** (17/08/2026, yêu cầu user): `layer.style.top` đo theo đáy **`#dkNavRow`** (98px) thay vì đáy cả `.navbar` (150px), nên tấm phủ luôn dải subheader. Subheader tắt bằng **`opacity: 0` trên `#dkSubRow`, KHÔNG `display: none`** — ẩn cả khối `.dk-sub` thì navbar tụt 52px, cả trang giật lên rồi giật lại lúc đóng (đo: navbar bottom giữ nguyên 150 trước và sau khi mở).
  - Cờ trạng thái `search-open` đặt trên **`.navbar`** (không phải `#dkNavRow`) vì subheader là khối em của hàng nav, không nằm trong `#dkNavRow`.
  - **2 LỖI ĐÃ SỬA (user báo 17/08/2026)**:
    1. **Nền tấm không giống thanh nav** dù khai đúng `glass-95` + blur. Nguyên nhân: `.ds-backdrop` (đen 45%) là `inset: 0` nên nằm **ngay sau tấm kính** → tấm blur đúng một lớp đen phẳng, ra màu xám xịt; còn thanh nav blur nội dung trang thật nên trắng trong. Sửa: đẩy nền tối xuống **bắt đầu từ đáy tấm**.
       - Bản đầu đo bằng JS (`bd.style.top = sheet.offsetHeight` lúc mở) — **user báo lỗi tiếp**: gõ chữ vào cột trái đổi nội dung, tấm tụt 552 → 479px mà mốc nền tối vẫn 552 → **hở 73px nền trang không bị làm tối**. Nay bỏ hẳn JS đo: `#dkSearchLayer` thành **`display: flex; flex-direction: column`**, thứ tự DOM là **tấm trước, nền tối sau** (`flex: 1`) → nền tối tự bám đáy tấm, tấm cao thấp thế nào cũng khớp. Đo lại 5 trạng thái gõ chữ ở 1440 và 1024: đỉnh nền tối luôn = đáy tấm, đáy nền tối luôn = đáy màn.
       - Kèm **chốt chiều cao tấm**: `.ds-cols { min-height: 552px }` = chiều cao đo thật của trạng thái cao nhất (6 dòng lịch sử + 5 từ khoá) và **đã gồm `pt-8 pb-10`** vì `box-sizing: border-box` — đặt 480 như lần thử đầu thì padding ăn hết, tấm vẫn tụt. Trạng thái nào nội dung cao hơn (vd gõ "t" ra nhiều gợi ý → 632px) thì tấm cứ giãn, nền tối bám theo nên không hở.
    2. **4 ảnh sản phẩm gợi ý trong suốt** — chỉ thấy khung xám. `productCard` gắn `img.lazy { opacity: 0 }`, chỗ thêm `.loaded` nằm trong `wire()` mà `wire()` chỉ chạy khi dựng MÀN; tấm gợi ý dựng ngoài `#viewport` nên không được chạm tới. Sửa: `renderStatic()` gọi **`wireLazy(prods)`** — đúng hàm file đã có sẵn cho tình huống này (dòng quà tặng từng dính y hệt).
  - **Nền tấm gợi ý = `glass-95` + `backdrop-blur-[7.5px]`, ĐÚNG BỘ của thanh nav và mega panel** (17/08/2026, yêu cầu user). Bỏ `background: var(--general-background)` đặc trong CSS (đè lên lớp kính) và **gỡ tấm này khỏi khối viền chung** — cùng lý do với `.dk-mega`: nó bám ngay dưới hàng nav nên phải đọc ra là phần nối dài của thanh, không phải thẻ nổi. Đo `getComputedStyle`: tấm gợi ý · mega panel · thanh subheader ra **y hệt nhau** (`color(srgb 1 1 1 / .95)` + `blur(7.5px)`, viền 0, bóng none).
  - 2 bản trước trong ngày: "ô 520px dừng trước logo" → "ô tràn hết sang mép trái" → nay canh giữa. Cả 2 bản trước đã bỏ.
- **Tấm gợi ý bên dưới giữ nguyên bố cục cũ** (2 cột: lịch sử/gợi ý + từ khoá phổ biến · sản phẩm nổi bật) — chỉ **gỡ hàng ô nhập + nút đóng** trong tấm đó (đã dời lên nav) và thêm `pt-8` bù khoảng thở. Tấm mở với `top` = đáy thanh nav (đo tại lúc mở, vì chiều cao nav đổi theo trạng thái cuộn) thay cho `top: 0` cũ — trước đây nó phủ luôn header, giờ header phải hở để thấy ô nhập.
- **Ô nhập nằm trong `navBar()` mà `navBar()` dựng lại mỗi lần `go()`** → IIFE tìm kiếm KHÔNG giữ tham chiếu, bắt lại theo id (`$in()`, `$btn()`, `$row()`), và listener của ô nhập nối lại trong `wire()` qua `window.__wireDkSearch(root)`. Không làm vậy là sau 1 lần điều hướng ô nhập chết.
- **LỖI ĐÃ SỬA (user báo 17/08/2026) — mở tìm kiếm rồi điều hướng là trang đứng cứng.** Bấm icon giỏ/tài khoản/danh mục khi ô tìm kiếm đang mở: header dựng lại (ô nhập biến mất) nhưng tấm gợi ý vẫn `open` và `__scrollLockCount` còn 1 → `body` còn `position: fixed`, không cuộn được, mà cũng không còn nút nào để đóng. Nay `go()` gọi `window.__closeDkSearch()` **ngay đầu hàm, trước cả lệnh `return` khi `name === current`** (bấm đúng màn đang đứng cũng phải đóng), và `setOpen()` của mega menu cũng đóng tìm kiếm để không có 2 lớp phủ cùng lúc. Kiểm lại đủ 4 đường đóng: nút ✕ · `Esc` · click backdrop · điều hướng — cả 4 đều về `lock: 0`, `body` nhả `position: fixed`.
- **Kèm sửa `lockBodyScroll()` (CẢ 2 BẢN)**: `position: fixed` làm mất thanh cuộn → vùng nội dung rộng thêm ~15px → **mọi thứ neo phải nhảy 15px**. Trước đây không ai thấy vì sheet phủ kín màn; từ khi ô tìm kiếm mở ngay trên header thì 3 icon cạnh nó nhảy rõ. Nay `lockBodyScroll` bù `padding-right` đúng bề rộng thanh cuộn (`innerWidth - documentElement.clientWidth`); trên điện thoại thật scrollbar là overlay nên phép trừ ra 0, không đổi gì.

- **Layer tìm kiếm** (`#dkSearchLayer`, 11/08/2026 — thay dropdown 420px neo dưới ô nhập): ~~bấm nút Tìm kiếm ở subheader~~ → tấm trắng đổ xuống + nền tối `rgba(0,0,0,.45)` phía dưới, cùng ý đồ với bản mobile (ở đó tìm kiếm là **màn riêng** `screenSearch` phủ kín). Nút mở giờ nằm ở hàng nav trên — xem mục ngay trên.
  - **Bố cục 2 cột** (tham chiếu overlay tìm kiếm của versace.com), nội dung lấy đúng bộ của bản mobile:

    | Khối | Nội dung |
    |---|---|
    | Hàng trên | ô nhập `.ds-field` **max 600 canh giữa**, nút ✕ neo mép phải (`absolute`) nên không ăn vào bề rộng field |
    | Cột trái `.ds-side` 280px | `#dkSearchTerms` — "Vừa tìm kiếm" (lịch sử), đang gõ thì đổi thành "Gợi ý" · `#dkSearchHot` — "Từ khóa phổ biến" (5 chip dòng, có icon kính lúp) |
    | Cột phải `.ds-main` | "Sản phẩm nổi bật" — 4 `productCard` (ảnh + thương hiệu + tên + giá) trong `grid-cols-4`, ngăn với cột trái bằng đường dọc |

  - Khung ngoài `.ds-inner` bó **1240px**; `max-w-[1240px]`/`max-w-[600px]` không có trong `tailwind.css` đã build nên các số đo này đặt tay trong `<style>`.
  - **Gõ phím chỉ re-render cột trái** (`renderTerms`), cột phải dựng 1 lần lúc mở (`renderStatic`) — cùng lý do bản mobile tách 2 pane: re-mount product card làm ảnh nhấp nháy.
  - Thẻ sản phẩm trong layer nối tay lại `[data-product]` / `.quick-add` (layer nằm ngoài `#viewport` nên `wire()` không chạm tới): **đóng layer trước** rồi mới `go()` / `__openQuickAdd`, để khoá cuộn được nhả đúng thứ tự.
  - Layer dựng **1 lần ở body** nên router không xoá mất; nút trên header render lại mỗi `go()` thì `wire()` nối lại qua `window.__openDkSearch`.
  - Đóng bằng: nền tối · nút ✕ · phím Esc. Chọn gợi ý / Enter thì **đóng layer trước rồi mới `goPlp()`**.
  - Mở lại thì ô nhập điền sẵn `searchQuery` đang có; `z-index: 200` (trên header 50 và mega panel, dưới sheet/toast 220+). Ở ≤1023px hai cột **xếp chồng**, đường ngăn dọc đổi thành ngang.
- Màn `search` cũ (kiểu mobile, cột giữa 720px) vẫn giữ trong `RENDER` nhưng không còn lối vào từ header.
- **PLP** — bám cả nhóm `PLP · Product Listing` (`2084:159`), 6 frame = 6 trạng thái của cùng một màn:

  | Frame | Trạng thái | Dựng ở đâu |
  |---|---|---|
  | `01-Default` (2470:105732) | tìm kiếm 0 kết quả | nhánh `else` của `screenPLPList()` — không có filter bar |
  | `02-ByBrand` (2474:107065) | brand hero + grid 4 cột | `screenPLP()` |
  | `03-ByBrand-Alt` (2539:174249) | biến thể hero (wordmark chữ, mô tả không thu gọn) | **chưa dựng** — không có cơ chế chuyển biến thể, 02 là bản chính |
  | `04-ByCategory-Grid3` (2439:22580) | danh mục, grid 3 cột, có chip bộ lọc | `screenPLPList()` + `plpCols='3'` |
  | `05-SearchResults` (2237:18029) | kết quả tìm kiếm có sản phẩm | `screenPLPList()` chế độ `search` |
  | `06-SearchResults-Empty` (2918:46100) | **khung xương loading** (tên frame gây hiểu nhầm) | `plpSkeletonCards()` qua `renderPlpGrid(root,{skeleton:true})` |

  - **Breadcrumb** (`2903:45117`): hàng 36px, ngăn cách bằng **chấm tròn 16px** (không phải dấu `/`), chữ 14/20 `#737373`, luôn 2 đoạn — thiếu `crumbs` thì lấy tiêu đề, chế độ tìm kiếm dùng nhãn ngắn "Kết quả tìm kiếm".
  - **Heading** (`2903:45118`): tiêu đề Light 24/32 + số sản phẩm 14/20 canh đáy, `gap-2`, `py-6`.
  - **Brand hero** (`2474:107068`): ảnh hero 575×320 · cột chữ 801 (logo 149×28 + mô tả + strip danh mục 150px + nút cuộn 44px). **Đảo so với Figma (11/08/2026)**: ảnh đứng TRƯỚC (bên trái), khối tên brand + mô tả + strip sang phải — chỉ đổi thứ tự DOM, bề rộng 2 cột giữ nguyên nên là bản soi gương của thiết kế gốc.
  - **Filter bar 68px** (`2903:45194`): `Bộ lọc (n)` outline **36/16** · chip ghost **36/16**, chữ **14/20 Medium** (chip trùng danh mục đang xem = State Active, chữ `#0a0a0a`) · density 4/3 cột — icon 20px, nút không chọn `opacity-50` · nhãn nút sắp xếp = **giá trị đang chọn** (mặc định `relevance` vẫn hiện "Sắp xếp").
    - **Size Regular, KHÔNG phải Large (đổi 12/08/2026 theo yêu cầu user, kèm link node `2903:44753`)**: trước đó dùng 48/24 + chữ 16 nên thanh filter nặng hơn cả nav. Giờ cả thanh cùng một bậc `h-9 px-4` — trùng `Button/Ghost Muted/Regular` của subheader nav (h-36, padding 8/16) và trùng luôn nút Sắp xếp / density vốn đã là h-9 từ đầu (bar này trước đây tự lệch bậc giữa nửa trái và nửa phải). Bar cao 80 → **68** (`py-4` + 36). Chip cũng gọn lại nên ở 1440 hết cần cuộn ngang (666px content vs 849px trước).
    - **Hàng chip "đang áp dụng" (`#plpActiveFilters`) VẪN Large 48/24** — đó là frame Figma riêng (`2910:111376`), không nằm trong yêu cầu này. Nếu muốn đồng bộ xuống Regular thì nói rõ.
    - ⚠️ Comment trong `filterBar()` **không được chứa dấu backtick** — cả khối là template literal, backtick sẽ cắt chuỗi và làm chết toàn bộ script (đã mắc đúng lỗi này khi ghi tên component `Button/Ghost Muted/Regular` vào comment).
    - **Icon mật độ lưới vẽ lại theo Figma `2903:44753` (12/08/2026, cả 2 bản)** — đọc trực tiếp qua figma-console (Desktop Bridge), không đoán từ ảnh. Component set `plp` có 3 variant: `Platform=mb/Filter-bar` (390×96), `Platform=web/Filter-bar` và `Platform=web/Filtering` (đều 1440×**68** — xác nhận chiều cao 68 ở trên là đúng).
      - **Desktop** (`I.gridCols4` / `I.gridCols3`, icon **20×20 nét 1px**, thay `I.grid2`/`I.grid1` vốn là icon của bản mobile): 4 cột = **2×2 ô 9.5 bo 2, cách nhau 1**; 3 cột = **3 cột dọc w6.11 bo 1.67, cách .83, cao hết 20**. Figma dùng stroke INSIDE nên SVG phải thụt `0.5` (rect 8.5 tại .5/11 · rect 5.11 tại .5/7.44/14.39) để nét 1px không bị cắt ở mép viewBox — đo lại mép ngoài khớp đúng 0..9.5/10.5..20 và 0..6.11/6.94..13.06/13.89..20.
      - **Mobile** (`I.gridCols2` / `I.gridCols1`, icon **16×16**): 2 cột = `fi-tr-grid-two-alt` **dạng FILL**, path lấy nguyên từ Figma (2 tấm dọc); 1 cột = **1 ô 16×16 bo 5 nét 1px** (SVG: rect 15 tại .5, rx 4.5).
      - Nhóm nút: Figma cho **2 nút 36×36 LIỀN NHAU (gap 0)** — desktop trước đây có `gap-2` nên nhóm rộng 96 thay vì 88; đã bỏ. Nhóm desktop 88 = pad 8 + 72 + pad 8 + gạch chia 1px bên phải (CSS ra 89 vì `border-r` cộng thêm 1px, lệch không thấy được). Nhóm mobile 72 = 2×36, gap 0, pad 0.
      - Trạng thái không chọn = **`opacity-50`** ở cả 2 bản (mobile trước đây đổi màu chữ `text-foreground` ⇄ `text-border-4`, không đúng bản vẽ).
      - ⚠️ Khi verify: nút có `transition-opacity` nên `getComputedStyle(...).opacity` bị đóng băng lúc pane không composite — kiểm bằng `classList.contains('opacity-50')`, đừng kết luận "state không đổi".
  - **Hàng chip bộ lọc đang áp dụng** (`2910:111376`): chip Secondary 48/24 nền `#f5f5f5` + ✕, cuối hàng "Xóa tất cả" (Figma ghi sai chính tả "Xoát"). State thật ở `plpFilters`, sinh từ nút Áp dụng của drawer Bộ lọc; bỏ chip / xóa tất cả đều re-render lưới.
  - **Grid**: `gap-x-1` row 16px, 4 cột (card 345×590, có swatch) hoặc 3 cột (card 461×695). Figma dùng 2 variant Card-item khác nhau (3 cột là bản `Default` không có swatch) — code **giữ swatch ở cả hai** vì `v2` là bản mới hơn.
  - **Tiến độ + Xem thêm** (`2237:18725` + Frame 46): "Bạn đã xem X trong Y sản phẩm" 14/20 `#737373` + track 240×2, rồi nút Xem thêm outline canh giữa. `PLP_TOTAL = 152` là tổng catalog demo.
  - Bỏ `camKetSection()` khỏi PLP — không frame nào trong nhóm có khối cam kết.
- **PDP** (`PDP-Desktop-01-Default` 2190:14530): 1 layout dùng chung cho cả 6 route `pdp..pdp6` (data từng SP gom vào `PDP_DATA`) — gallery 2 cột (cell 469:579, zoom lightbox) + info panel 451px sticky (giá/swatch 44px/chọn size/CTA/box ưu đãi/accordion ±) + 3 carousel 5 card.
  - Chọn size giữ đúng 2 biến thể như bản mobile, bật/tắt bằng cờ `dropdown` trong `PDP_DATA`: **chip grid** cho `pdp`/`pdp4`, **dropdown** (Select & Combobox `3111:33591`) cho `pdp2`/`pdp3`/`pdp5`/`pdp6`.
  - **Dropdown xổ INLINE ngay dưới ô chọn (10/08/2026)** — không mở popup giữa màn như mobile. Danh sách `[data-size-list]` dựng trong `wire()` từ `SIZE_SHEET_OPTIONS`, cùng bề rộng ô, `mt-1`, cao tối đa 260px; hàng hết hàng gạch ngang + "Nhận thông báo", hàng sắp hết ghi "Còn X sản phẩm"; caret xoay 180° khi mở; bấm ra ngoài / `Esc` thì đóng.
    - Chọn xong **đóng dropdown và để CTA chính của PDP đổi trạng thái qua `setCta`** — giống hệt nhánh chip, thay vì có CTA riêng trong popup. Muốn vậy thì khối `setCta` trong `wire()` phải chạy cho cả 2 kiểu: điều kiện đổi từ `if (sizeBtns.length)` sang `if (sizeBtns.length || sizeDD)`, và `chipRow` (mốc chèn dòng "*Tạm hết hàng") fallback sang chính ô dropdown.
    - `SIZE_SHEET_OPTIONS` để `oos` dạng **boolean**, còn `setCta` cần `'oos' | 'notify'` → map qua `OOS_MODE[label] || 'oos'` cho khớp nhánh chip.
    - **Khối "variants" bọc dropdown BẮT BUỘC có `relative z-30`.** Không có thì dropdown bị `#pdpCta` vẽ đè lên dù đã `z-40` — `.rise` dùng `animation-fill-mode:both` nên `transform:translateY(0)` còn dính lại, mỗi block `.rise` thành một stacking context `z-index:auto`; cùng z-index thì **thứ tự DOM thắng**, mà `#pdpCta` là block `.rise` nằm sau. `z-40` của dropdown chỉ có tác dụng *bên trong* stacking context của chính khối variants. Cùng bệnh với `#sortMenu` ở PLP (sống nhờ `#plpFilterAnchor` có `z-40`) và hàng tab trang chính sách (`z-30`).
    - Comment đặt trong khối markup này **không được chứa dấu backtick** — cả khối nằm trong template literal, backtick sẽ đứt string (đã dính lỗi này một lần).
    - `#sizeSheet` + `__openSizeSheet` **giữ nguyên nhưng không còn được gọi** ở desktop (bản mobile vẫn dùng) — muốn quay lại kiểu popup chỉ cần gọi lại hàm đó.
- **Cart**: khung 2 cột lấy từ `multi-gift-4-desktop` (2775:61994) — trái list item + quà tặng (khi đăng nhập) + CTKM peek; phải "Tóm tắt đơn hàng" sticky. **Ruột đã đồng bộ lại theo bản mobile (10/08/2026)** vì `item-cart` (2851:28601) chỉ có variant 358px, tức bản mobile là thiết kế mới nhất:
  - Row theo `item-cart` 2851:28705: checkbox 16 canh giữa · thumb **100×133** (bỏ badge -% đè ảnh) · brand 14 Medium + nút xoá 14 cùng hàng · name 14 · variant 12 · giá 14 Medium + badge -% nền subtle **cạnh giá** · stepper ghost không viền [− 12][02 12 Medium][+ 12] cao 24 ghim đáy phải · **không** `border-b` giữa các hàng, không bọc card viền quanh list/selectAll (quy ước border).
  - CTKM: card viền `border-border rounded-md py-2 px-3`, title 16 Medium (bỏ nền accent-0 của frame desktop cũ 2775:62093).
  - ~~Quà tặng: style card mobile (viền rounded-xs p-3, title 14 + phụ đề 12, "Thay đổi" gạch chân, option thumb 52×60)~~ — **khối tĩnh này đã bị thay ở CẢ 2 BẢN (13/08/2026)** bằng quà theo sản phẩm + quà theo mốc đơn hàng, thẻ quà dựng theo khuôn thẻ sản phẩm. Xem "Quà tặng trong giỏ".
  - Summary: "Mã giảm giá" 14 Medium, bỏ 2 divider quanh khối tổng, "Tổng cộng" 16 Medium, dòng điểm thưởng 14/20; **"Bạn có phiếu mua hàng?" chuyển xuống DƯỚI nút Đặt hàng** (Figma 3428:55499: là phương thức mua hàng, không phải ưu đãi).
- **Checkout**: 2 cột theo note Figma `2084:165` — form 3 section tự đóng/mở bên trái, summary sticky + CTA bên phải; header rút gọn (logo + "Thanh toán an toàn & bảo mật").
- **Auth**: card 440px giữa trang trên nền xám (đủ 6 view login/register/otp/reginfo/setpass/forgot). **Account**: sidebar 280px + nội dung 720px. **Order**: card 860px với timeline. **Done**: xác nhận giữa trang + cross-sell 5 card.
- **Bottom sheet mobile → dialog desktop**: quick-add / xác nhận thêm giỏ / chọn size / nhận thông báo / info sheet thành modal giữa màn hình (class `.dk-modal`, tái dùng nguyên JS mở/đóng); riêng Bộ lọc thành drawer 420px **trượt vào từ mép TRÁI** (đổi 12/08/2026 theo yêu cầu — nút "Bộ lọc" nằm bên trái thanh filterbar nên panel mọc ra cùng phía; shadow đổ sang phải `12px 0 40px`).
- Từ điển i18n bổ sung riêng cho chuỗi desktop qua `Object.assign(I18N, …)` (đặt trước khi build `I18N_REV`).

## Design system (tokens07.json)

Toàn bộ màu / spacing / bo góc lấy trực tiếp từ `tokens07.json` (export gốc từ Figma variables) — không hardcode hex.

`tokens.css` được sinh tự động từ JSON (đừng sửa tay):

```bash
python3 gen_tokens.py     # tokens07.json -> tokens.css
```

Xuất ra 426 biến CSS (raw colors + semantic tokens + spacing + radii). Mode **D** = mặc định · mode **GM** = thêm class `.theme-gm` vào `<html>`.

`gen_tokens.py` dùng bảng ID→tên tường minh (31 entry đã verify với Figma API) thay vì đoán theo thứ tự, và fail-fast nếu gặp alias lạ chưa map — cần bổ sung bảng `ID2NAME` nếu Figma thêm theme token mới.

### Thang chữ

Cỡ chữ **không** nằm trong `tokens07.json` — viết thẳng bằng utility `text-[Npx]` trong markup. Thang chuẩn theo Figma `02 — 🔤 Typography` (2003:12350):

`12 · 14 · 16 · 18 · 24 · 32 · 48`

**Chỉ được dùng cỡ trong thang này** (yêu cầu user 17/08/2026) — 11 / 13 / 15 là cỡ tự chế, không có text style tương ứng trong Figma.

Tình trạng rà (17/08/2026): **cục cookie đã sạch** (chỉ còn 12 / 14 / 16 ở cả 2 bản). Phần còn lại của code vẫn nợ, đếm bằng `grep -o "text-\[13px\]" file | wc -l`:

| Cỡ ngoài thang | `index.html` | `desktop.html` |
|---|---|---|
| 13px | 51 | 50 |
| 11px | 12 | 8 |
| 15px | 3 | 1 |
| 22px | 1 (`index.html:4216`, h2 "Đặt hàng thành công" — thang cấm rõ 20/22, nên đổi **24**) | 0 |

Quy tắc quy đổi khi rà tiếp: **13 → 14** · **11 → 12** · **15 → 14 hoặc 16** tuỳ vai (chữ phụ xuống 14, chữ ngang cấp body lên 16) · **22 → 24**.

**Không dùng 20px và 22px** — không có trong thang. Tiêu đề cấp section (h2 trong trang: "Giỏ hàng", "Thanh toán", "Bộ lọc", tên brand ở PDP, tiêu đề bottom sheet) dùng **18px**; tiêu đề trang full-screen (auth) dùng **24px Light**. Riêng heading section trong 3 trang chính sách dùng **16px** — xem mục "Trang tĩnh / chính sách".

### Switcher theme trong popover Cài đặt (12/08/2026)

Áp mode **`D+ improved`** (vừa tạo trong Figma, collection `theme`, mode thứ 3) vào code, đổi được ngay trong popover Cài đặt — **cùng khuôn với switcher phông chữ**. Cả 2 file.

Popover giờ có 3 mục: **Ngôn ngữ · Giao diện · Phông chữ**. Mục Giao diện có 2 lựa chọn:

| id | Nhãn | Class trên `<html>` |
|---|---|---|
| `d` | Mặc định | *(không có — `:root`)* |
| `dplus` | D+ improved | `.theme-dplus` |

`THEMES` + `applyTheme(id)` đặt ngay cạnh `FONTS`/`currentFont`. `applyTheme` gỡ mọi class theme trước khi gắn class đích nên không bị cộng dồn.

**Không viết vào `tokens.css`** — file đó có header *"Không sửa tay, chạy lại `gen_tokens.py`"*. Khối `.theme-dplus` nằm trong `<style>` của từng file (nằm sau `tokens.css`, cùng specificity 0,1,0 nên vẫn thắng `:root`). Khi nào export lại `tokens07.json` **và** sửa `gen_tokens.py` cho duyệt mode động thì khối này chuyển về `tokens.css`.

#### 2 biến gián tiếp — để theme có hiệu lực mà KHÔNG phá bản mặc định
Nếu trỏ thẳng vào token thì hoặc theme không có tác dụng, hoặc bản mặc định bị đổi. Nên:

| Biến | Mặc định | `.theme-dplus` |
|---|---|---|
| `--btn-focus-ring` | `--unofficial-border-3` `#d4d4d4` (đúng component Button) | `--focus-ring` `#737373` (**4.74:1**) |
| `--surface-dark` | `--general-secondary-foreground` `#262626` (đúng màu promo bar đang có) | `--unofficial-accent` `#292524` (warm black) |

Lý do cần `--btn-focus-ring`: CSS focus của button dùng `--unofficial-border-3` cho khớp component, nên nếu chỉ nâng `--focus-ring` trong theme thì **ring không đổi gì** — đúng lỗi này đã xảy ra lúc làm và phải sửa lại.

**Accent giờ có việc thật**: `--surface-dark` được gắn cho **promo bar** và **thẻ hội viên** — hai mặt tối lớn không tương tác. Trước đó promo bar lấy `--general-secondary-foreground`, tức **token CHỮ dùng làm NỀN** (lỗi đảo vai trò đã báo ở đợt audit màu).

#### Theme `gm` — đã THỬ rồi BỎ (12/08/2026)

Từng dựng `.theme-gm` theo số đo trực tiếp trên **gentlemonster.com** (nền trang `#f3f4f6` xám lạnh · thẻ/modal `#ffffff` · chữ `#111111` · chữ phụ `#343434` · chữ mờ `#858585` · viền `#d1d1d1`/`#bbbbbb` · nút chính `#111111`/`#ffffff`). User xem xong **chốt bỏ**, chỉ giữ `D+ improved`. Đã gỡ khỏi danh sách `THEMES` và gỡ khối CSS tinh chỉnh khỏi `<style>` của cả 2 file.

Hai thứ giữ lại từ đợt đó vì vẫn đúng:

1. **`body {}` đọc `--unofficial-body-background`** thay vì `--general-background`. Tách nền TRANG khỏi nền BỀ MẶT (thẻ/dropdown/modal/drawer). Ở theme mặc định biến này là `#ffffff` nên **không đổi gì**; nhưng nó làm token `--unofficial-body-background` thôi bị bỏ không (trước đó dùng **0 lần**), và bất kỳ theme sau này muốn "trắng trên xám" chỉ cần đặt 1 biến. Muốn quay lại y như cũ thì đổi 1 dòng.
2. **Ghi nhận 3 giá trị hỏng trong khối `.theme-gm` mà `gen_tokens.py` sinh ra** — vẫn còn trong `tokens.css`, sẽ tái xuất nếu mode đó được bật lại:
   - `--unofficial-backdrop: #010101` — **mất alpha**, lớp phủ modal đục kín, che hết trang (đúng phải `#00000099`)
   - `--unofficial-ghost: #f5f5f5` — nút ghost bị **tô nền**, đúng ra trong suốt (`#ffffff00`)
   - `--unofficial-destructive-subtle: #7f1d1d` — **đỏ tối**, giá trị dark mode lọt vào bản sáng (`#fef2f2`)

   Đây là lỗi ở **nguồn** (mode đó trong Figma), không phải ở code — nếu bật lại mode này thì phải sửa trong Figma trước.

`tokens.css` vẫn còn khối `.theme-gm` sinh tự động, nhưng **không lựa chọn nào gắn class đó nữa** nên nó nằm im; sẽ tự biến mất ở lần chạy lại `gen_tokens.py` sau khi export lại `tokens07.json`.

#### Giữ theme khi kéo cửa sổ đổi bản
`RESP.hash()` / `swap()` / `watch()` nhận thêm tham số thứ 4 `theme`; `state()` trả `[current, LANG, currentFont, currentTheme]`; khối khôi phục gọi `applyTheme(st.theme)`. Mặc định `d` thì bỏ khỏi hash cho URL gọn (cùng quy ước với `lang=vi` / `font=montserrat`).

#### Đo được sau khi làm
| | Mặc định | D+ improved |
|---|---|---|
| promo bar + thẻ hội viên | `rgb(38,38,38)` | **`rgb(41,37,36)`** |
| chữ phụ (`muted-foreground`) | `rgb(115,115,115)` | **`rgb(82,82,82)`** |
| ring focus | `#d4d4d4` | **`#737373`** |
| `accent` | `#09090b` | **`#292524`** |

Đổi qua lại 3 theme → class trên `<html>` gỡ/gắn đúng, **về Mặc định thì class rỗng hoàn toàn** và mọi giá trị trở lại y như trước. Hash `#theme=dplus` khôi phục đúng cả giá trị lẫn dấu tick trong popover.

### State của Button — theo component Figma (12/08/2026)

Nguồn: component set **Button** `10:11763` (trang tài liệu `10:11468`), đọc qua figma-console. **240 variant** = 2 `Roundness` × 6 `Variant` × 4 `Size` × 5 `State`.

| Variant | Default | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|
| Primary | `#0a0a0a` / chữ `#fafafa` | `#262626` | `#171717` | + ring | opacity .5 |
| Secondary | `#f5f5f5` / chữ `#262626` | `#fafafa` | `#e5e5e5` | + ring | opacity .5 |
| Outline | nền **`#ffffff` đục**, viền `#e5e5e5` | **bỏ nền**, viền `#737373` | viền `#0a0a0a` **2px** | viền `#a3a3a3` + ring | nền `#f5f5f5`, opacity .5 |
| Ghost | trong suốt, chữ **`#525252`** | nền đen **5%** + chữ `#0a0a0a` | chữ `#0a0a0a` | + ring | opacity .5 |
| Ghost Muted | trong suốt, chữ `#525252` | **chỉ đổi chữ** → `#0a0a0a` | chữ `#0a0a0a` | + ring | opacity .5 |
| Destructive | `#d62845` / chữ `#ffffff` | **KHÔNG đổi** | `#b91c3a` | + ring `#fca5a5` | opacity .5 |

**Focus ring** = `DROP_SHADOW` radius 0, offset 0, **spread 3** → viết bằng `box-shadow: 0 0 0 3px`. Màu `#d4d4d4` (`--unofficial-border-3`), riêng Destructive `#fca5a5` (**không có token**, dùng `--focus-ring-error` #f8a9af xấp xỉ).

**Size** (radius 2 ở cả 4): Regular h36 pad 8/16 chữ **14/20 Medium** · Large h48 pad 8/24 chữ **16/20 Regular** · Small h32 pad 5.5/12 chữ 14/20 Medium · **Mini h24 pad 3/8 chữ 12/16 Medium** (chưa dùng trong code). `Roundness=Round` cũng cho radius 2 — nghi Figma chưa set, cần xác nhận.

#### ⚠️ 4 chỗ file token (D.tokens.json) và component NÓI KHÁC NHAU — đã lấy COMPONENT làm chuẩn
1. **Chữ nút Ghost**: token `ghost foreground` = `#404040`, component = **`#525252`** (`mid-alt`).
2. **Hover nút Outline**: token `outline hover` = nền `#00000008`, component = **đổi viền sang `#737373`, không có nền**.
3. **Focus**: token `focus ring` = `#22aa99` (xanh ngọc), component = **`#d4d4d4`** xám trung tính.
4. **Nền Outline mặc định**: token `outline` = `#ffffff1a`, component = **`#ffffff` đục**.

Nên cân nhắc sửa lại file token cho khớp component, kẻo lần sau lại lệch.

#### Đã implement (cả 2 file)
Khai 6 class trong khối `<style>`: `.btn-p` `.btn-s` `.btn-o` `.btn-d` `.btn-gm` + `.ghost-hover` (đã có). Gắn tự động theo pattern: **desktop 22 primary · 9→5 secondary · 24 outline**, **mobile 35 primary · 6 secondary · 22 outline**; 0 nút `bg-destructive` (toàn badge).
- **Mobile CỐ Ý không có `:hover`** — cảm ứng, hover dính lại sau khi nhấc tay. Chỉ Active + Focus + Disabled.
- `.press` đổi sang **transition longhand** — dạng gộp `transition:` reset `transition-property` và (vì khối style nằm sau tailwind.css, cùng specificity) **ăn mất `transition-colors`** của Tailwind → hover đổi màu bị giật.
- Bỏ `opacity: .9` khỏi nút primary/secondary khi nhấn: nó làm nút **sáng lên**, ngược hướng mọi token active (secondary `#f5f5f5`→`#f6f6f6` sáng thêm, trong khi token đòi `#e5e5e5` tối đi). `.press:active{opacity:.9}` chỉ còn cho hàng list.
- **Disabled `.4` → `.5`** theo component; bỏ 7 chỗ `style="opacity:.4"` inline (inline sẽ thắng rule).
- Sửa 11 chỗ hover sai token: 3 nút outline dùng `hover:bg-accent-0` (bậc surface, không phải token state) và 6 nút/hàng ghost dùng `hover:bg-secondary` (`#f5f5f5` đục, đè nền kính mờ) → về `.btn-o` / `.ghost-hover`.
- Dropdown chọn size: `hover:bg-secondary` **trùng y hệt** màu dòng đang chọn → đổi hover sang `ghost-hover`.

#### Đợt 2 — adapt nốt cho ĐÚNG component (12/08/2026, cả 2 file)

- **Chữ nút Ghost / Ghost Muted → `#525252`** (`text-mid-alt`), trước là `#404040` (`text-foreground-alt`). Trạng thái active/đang chọn vẫn `#0a0a0a`. Ảnh hưởng: dept nav, chip danh mục filter, "Xóa tất cả", nút đổi ngôn ngữ / cửa hàng, hàng gợi ý tìm kiếm. `.dk-nav-link` thêm class `.btn-gm` để có state Active.
- **Nền Outline mặc định = `#ffffff` đục** (component ghi `#ffffff`, KHÔNG phải `--unofficial-outline` #ffffff1a như file token). Đã thêm `bg-background` cho **18 nút desktop + 15 nút mobile**. Hệ quả có ý nghĩa: nút outline đặt trên panel xám giờ là ô trắng thật, và `:hover` bỏ nền nên lộ lại màu panel — đúng như bản vẽ.
- **Outline bổ sung 3 state**: `:active` viền `#0a0a0a` **2px** · `:focus-visible` viền `#a3a3a3` · `[disabled]` nền `#f5f5f5`.
- **`#lpGuest` bị phân loại sai** — nó là Outline nhưng đang mang cả `.ghost-hover` (hover 5% đen) và `bg-transparent`. Đã bỏ cả hai, về `bg-background` + `.btn-o`.
- **Chặn bấm 2 lần khi loading** — thêm `btnBusy()` / `btnDone()`; 6 handler (3 mỗi file) giờ `disabled = true` suốt lúc có spinner, nên state **Disabled (opacity .5)** của component mới có ý nghĩa thực. Test: bấm 3 lần liên tiếp vào "Đăng nhập" → chỉ chạy 1 lần.

Đo lại sau khi sửa: Outline default `#ffffff` + viền `#e5e5e5` ✓ · Ghost/Ghost Muted `rgb(82,82,82)` = `#525252` ✓ · dept đang chọn `#0a0a0a` ✓ · nút loading `disabled` + opacity `.5` ✓ · console sạch cả 2 bản.

### KHÔNG dùng UPPERCASE (chỉ đạo user 12/08/2026)

**Mọi text trong website chỉ viết hoa chữ cái đầu** — không viết hoa toàn bộ, kể cả nhãn nút. Áp cho **cả 2 file**. Cấm cả 2 đường: class `uppercase` (CSS) và chuỗi viết hoa nguyên văn trong JS/i18n.

Đợt dọn đã bỏ **19 chỗ** (14 `desktop.html` + 5 `index.html`):
- **Popup cookies** — 6 nút (`Đồng ý tất cả` · `Từ chối tất cả` · `Tùy chọn cookies` ở thẻ cookie, và 3 nút trong modal tuỳ chọn). Đây là chỗ user chỉ ra.
- Eyebrow/label: tiêu đề cột mega menu, `DAFC Membership` (thẻ hạng), `Thông tin người nhận` (checkout nhận tại cửa hàng), `Xác nhận` (màn Hoàn tất), `Ngôn ngữ`/`Phông chữ` (panel settings demo).
- Chuỗi nguyên văn: badge `NEW` → **New** (6 call site), nút `CẬP NHẬT MẬT KHẨU` → **Cập nhật mật khẩu**, tiêu đề `KHUYẾN MÃI` ở PDP → **Khuyến mãi**.
- **I18N cũng phải theo**: `'CẬP NHẬT MẬT KHẨU':'UPDATE PASSWORD'` → `'Cập nhật mật khẩu':'Update password'`; xoá 2 entry chết `'KHUYẾN MÃI':'PROMOTIONS'` và `'XÁC NHẬN':'CONFIRM'`.

**Ngoại lệ hợp lệ — đừng "sửa"**: wordmark thương hiệu và mã kỹ thuật vốn viết hoa — `DAFC`, `VISA`/`MASTER`/`JCB`/`AMEX`/`MOMO`, `TIKINOW`, mã vận đơn `TKN284917`, mã voucher `JUL500`.

Cách kiểm sau khi sửa UI: chạy trong browser `[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).textTransform==='uppercase'&&e.textContent.trim())` — phải **rỗng**. `grep -c uppercase` trên file chỉ còn được hit ở chuỗi nội dung nói *về* chữ hoa (luật mật khẩu).

**18px LUÔN đi với `font-medium`** — cả 23 chỗ dùng `text-[18px]` trong `index.html` đều Medium (500), không có 18px Light / Regular. Đây là **quyết định của design, cố ý khác Figma** (Figma để 18 Regular ở tiêu đề giỏ hàng và heading newsletter footer) — đừng "sửa lại theo Figma". Thêm chỗ 18px mới thì nhớ kèm `font-medium`.

> Ngoại lệ còn lại: "Đặt hàng thành công" ở màn `done` vẫn 22px — Figma `2084:166` chưa có nội dung màn này nên chưa có số để bám. Bản **desktop** thì heading này đã về đúng thang `24px Light leading-8` như 16 heading 24px khác (12/08/2026) — đừng port ngược 22px/Medium sang.

### Nav desktop: state "đang chọn" (13/08/2026, feedback khách)

Khách phản hồi nút nav **default và active chưa khác biệt đủ**. Đã điều tra và **không hạ tone default** — dựng state riêng cho nav. Hai lý do, lý do thứ hai mới là lý do thật:

1. **Token không hạ được**: `--unofficial-mid-alt` `#525252` có 20 chỗ dùng, chỉ 4 là nút nav. Hạ xuống `#737373` (bậc duy nhất còn lại) làm đoạn copy newsletter 16/300 trên `#f5f5f5` **trượt WCAG AA** (7.17:1 → 4.35:1), làm nhạt nhãn 2 nút outline thật ("Huỷ đơn hàng", "Theo dõi đơn hàng"), **đảo thang xám** trong `.theme-dplus` (ở theme đó `muted-foreground` đã là `#525252`), và token dùng chung với `index.html` (8/8 chỗ ở mobile đều không phải nav).
2. **Hạ default cũng KHÔNG sửa được lỗi**: hover đã chiếm `#0a0a0a` (`.ghost-hover:hover`, `.btn-gm:hover`, `hover:text-foreground`, `.dk-nav-item.on .dk-nav-link` — cả 4 đều ra `#0a0a0a`), nên hạ default nới **cả** default↔active lẫn default↔hover đúng bằng nhau. Ở hàng dept còn **bị đảo**: hover được thêm nền đen 5% nên nút *chỉ đang hover* trông "được chọn" hơn nút đang chọn thật.

**Vòng 1 (đã loại)**: giữ default, cho mục đang chọn nền pill đen 10% + weight 600. User loại vì xấu.

**Vòng 2 — bản đang dùng: hạ tone default, đọc spec thật từ Figma.** Đã lấy trực tiếp qua MCP (`figma_execute`) từ component `Button` (`10:11763`) và `Header` (`2171:13006`):

| Component · state | Label | Weight | Nền |
|---|---|---|---|
| Ghost / Ghost Muted · Default | `#525252` (`unofficial/ghost foreground`) | Medium | trong suốt |
| Ghost / Ghost Muted · Hover | `#0a0a0a` | Medium | Ghost: đen 5% · Ghost Muted: trong suốt |
| Ghost / Ghost Muted · **Active** | `#0a0a0a` | Medium | **trong suốt — KHÔNG có pill** |
| Header: dept đang chọn "Nam" | `#0a0a0a` | Regular | trong suốt |

→ Component chốt: **state đang chọn chỉ đổi màu chữ**, không nền, không đổi độ đậm. Vậy muốn khoảng cách đủ nhìn thì phải **hạ tone default**, đúng như user chỉ đạo.

Thang mực riêng của nav, 3 bậc:

| | Màu | Token | Ghi chú |
|---|---|---|---|
| Nghỉ | `#737373` | `--general-muted-foreground` (= neutral/500) | 4.74:1 trên trắng — **còn đạt WCAG AA** |
| Hover | `#404040` | `--unofficial-foreground-alt` | bậc trung gian |
| Đang chọn | `#0a0a0a` | `--general-primary` | đậm nhất |

Khoảng cách default↔active giãn từ **2.53:1 lên 4.18:1**. **Phải chèn bậc hover riêng**: hover của component cũng là `#0a0a0a`, giữ nguyên thì mục *chỉ đang hover* trông y hệt mục đang chọn (ở hàng dept còn đậm hơn vì được thêm nền 5%).

Nhóm tiện ích cùng thanh (English / Danh sách cửa hàng) **hạ theo luôn** — trong component chúng dùng chung mức với dept ở trạng thái nghỉ, hạ mỗi dept thì hàng tiện ích bỗng đậm hơn menu, trông như lỗi căn mức.

**Riêng hàng giới tính + Làm đẹp có thêm kênh độ dày** (chỉ đạo user 13/08/2026): nghỉ **400**, đang chọn **600** (nhảy 2 bậc cho rõ; Montserrat đã nạp đủ 300/400/500/600/700 nên không bị giả đậm). Con số 400 lấy đúng component `Header` — dept row là **Regular**, khác hàng danh mục subheader là **Medium**. Trước đó markup đặt `font-medium` cho cả 3 nút nên "nâng active lên 500" sẽ không tạo ra khác biệt nào; giờ độ dày **và** màu cùng khoá theo `aria-current` trong CSS, không để 2 cơ chế đánh nhau trên cùng thuộc tính. Danh mục subheader giữ Medium ở mọi state.

Tất cả rule scope trong `.navbar` — **không hạ token** `--unofficial-mid-alt`: token đó còn gánh copy footer 16/300 trên `#f5f5f5` (hạ 1 bậc là trượt AA), nhãn 2 nút outline "Huỷ đơn hàng"/"Theo dõi đơn hàng", và 8 chỗ non-nav ở `index.html`. Rule **cố ý không khai `box-shadow`** vì `.press:focus-visible` đang dùng `box-shadow` làm vòng focus duy nhất của nav.

**State chỉ nằm ở 1 nơi: `aria-current`** — bỏ ternary màu trong class. Dept dùng `aria-current="true"` (lựa chọn dính, còn sáng ở cart/checkout/account), danh mục dùng `aria-current="page"` (đúng nghĩa trang hiện tại) và **suy từ `plpMode`**, không thêm biến state: xét `crumbs[1]` **trước** `title` — panel "Sản phẩm mới" liệt kê lại chính 'Quần áo'/'Giày dép' làm item, xét `title` trước sẽ **sáng 2 mục**.

> Kéo theo (sửa luôn vì state càng nổi thì lệch càng lộ): bấm 1 mục trong **cột "Nữ"** của mega panel giờ đổi luôn dept đang sáng sang "Nữ" — trước đây `data-dkdept` chỉ có ở 3 nút dept nên hàng dept vẫn sáng "Nam". Chỗ đồng bộ phải đặt **trước** `goPlp()`/`go()` vì `navBar()` dựng lại trong `go()` và đọc `dkDept`.

> **Chưa phủ** (chấp nhận): PLP "Thương hiệu" — nút brand trong panel chỉ có `data-nav="plp"` trơn nên `goPlp` ra `type:'brand'`, không mang title/crumbs → subheader không sáng mục nào. Chip danh mục ở filterbar cố ý không đổi (nằm trong `.filterbar`, không phải `.navbar`).

### Quy ước border

**Giữa các block KHÔNG kẻ border** — khoảng trắng (padding/gap) là thứ ngăn cách, đúng theo Figma (`2851:28697` cart, `2084:170` account, `2084:164` checkout, `2084:166` done đều không có stroke ngang giữa các section).

**Navbar KHÔNG có viền dưới** — áp cho *mọi* màn, **cả mobile lẫn desktop**. Nav chính (`navBar()`) tách khỏi nội dung bằng nền `glass-95` + `backdrop-blur`; 3 nav phụ (Tài khoản / Chi tiết đơn hàng / `authNav`) và nav màn Search cũng để trần. Ở mobile đây là **quyết định của design, cố ý khác Figma** (`Nav` 2136:13304 có stroke-bottom 1) — đừng "sửa lại theo Figma". Ở desktop thì trùng luôn với Figma: Header `2171:13006` không có stroke ở cả 3 tầng.

> Kéo theo: đã bỏ `.navbar::after`, rule `.navbar.merged::after` và khối JS toggle class `.merged` (trước dùng để giấu viền nav khi filter bar dính sát đáy nav — nay vô nghĩa) ở **cả `index.html` và `desktop.html`**. Class `navbar` giữ lại làm mốc ngữ nghĩa. Riêng `.filterbar::after` (viền dưới thanh Bộ lọc ở PLP) **vẫn giữ** — đó là thanh filter, không phải navbar.

Border ngang chỉ giữ ở 4 chỗ **có trong design** (12 chỗ `border-t/b/y` còn lại trong `index.html` đều thuộc nhóm này):

| Chỗ | Nguồn Figma |
|---|---|
| Hàng accordion (`.acc border-b`, cả divider trong `.acc-body` của mini-cart) | component `Accordion` có `Line` 1px |
| Rail tab ngang (`#accTabs`) | component `Tabs` stroke-bottom 1 |
| Header bottom sheet (`#isTitle`) | `WAP/Filter Bottom Sheet` → `Dialog Header` stroke-bottom 1 |
| Hàng "Lịch sử điểm" | `Account · Mobile` → `History Row` stroke-bottom 1 |

Cộng thêm 1 divider trang trí `border-white/20` trên thẻ hạng thành viên (nền tối) — không phải ngăn block.

Ranh giới `cam-ket-section` / `Footer`: Figma có stroke-top 1 nhưng code tách bằng **đổi nền** (`bg-secondary`) chứ không kẻ viền — giữ nguyên cách này.

Border **bao quanh** (`border` 4 cạnh: card CTKM, card mã giảm giá, input, button outline, checkbox, chip, swatch) không thuộc quy ước này — giữ nguyên.

Rebuild CSS sau khi sửa class trong `index.html` / `desktop.html` (content quét cả 2 file):
```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i in.css -o tailwind.css --minify
```
> Pin bản `3.4.17` (bản đã dùng để build) — Tailwind v4 đổi CLI/config, chạy bản mới nhất sẽ lỗi.

## Nhịp làm việc: mobile trước, desktop sau

Hai bản **tách rời có chủ ý** — không tự động đồng bộ (đợt 10/08/2026 đã kéo desktop bắt kịp mobile một lần, xem bên dưới). Mặc định mọi thay đổi chỉ áp vào `index.html`; `desktop.html` chỉ cập nhật khi được yêu cầu rõ ràng ("làm bản desktop"). Nghĩa là hai file sẽ lệch nhau dần, và đó là bình thường.

Vì 62 hàm + toàn bộ hằng dữ liệu (`PRODUCTS`, `CART`, `I18N`…) vẫn trùng nhau giữa hai file, mỗi thay đổi ở mobile cần ghi lại bên dưới để lần port sang desktop không bỏ sót.

### Chờ port sang desktop

- **13 chỉnh theo Figma `3547:55856`** (xem "Đối chiếu checkout với Figma") mới áp cho mobile. Desktop còn: checkbox viền `#e5e5e5`, ô nhập padding 12, nhóm field gap 8, link "Thay đổi" 16px Light, tiêu đề màn 18/28, thiếu kẻ ngăn `#f5f5f5` + bước chờ cao 72. (Vòng radio + `.opt.on` đã port 12/08 — xem mục dưới.)
- ~~**Lệch NGƯỢC — bộ lọc PLP**: desktop lọc thật, mobile chỉ toast.~~ → **đã đồng bộ 12/08/2026**, xem "Bộ lọc lọc thật + 4 hành vi mới" bên dưới. Còn lệch duy nhất: **hàng chip "đang áp dụng" chỉ có ở desktop** (mobile bỏ/tắt bộ lọc trong sheet).
- ~~**Quà tặng trong giỏ + state giỏ thật (13/08/2026)** — chỉ mobile.~~ → **đã port sang desktop cùng ngày** (yêu cầu user), xem "Quà tặng trong giỏ · Bản desktop". Kèm sửa "Chọn tất cả" bản desktop.
- ~~**Pre-order (14/08/2026)** — chỉ mobile.~~ → **đã port sang desktop cùng ngày** (yêu cầu user), xem section "Pre-order" cho danh mục đầy đủ và các điểm desktop cố ý làm khác (badge gắn vào tile gallery, panel tóm tắt giữ thumb 52×60 nên dòng ngày giữ prefix "Pre-order ·").
- ~~**Cookie consent — nội dung bản khách duyệt (17/08/2026)** — chỉ mobile.~~ → **đã port sang desktop cùng ngày** (yêu cầu user), xem section "Cookie consent". Còn lại: 2 bản skin `desktop-neutral.html` / `desktop-editorial.html` vẫn giữ chữ cũ (fork trước khi đổi).

### Checkout desktop: nhịp spacing kiểu Farfetch (14/08/2026, chỉ desktop)

User yêu cầu học spacing checkout Farfetch — thoáng, nhiều khoảng thở. Nguyên tắc áp: sự thoáng đến từ **nhịp dọc + gutter + hàng cao**, KHÔNG đổi type scale hay cấu trúc; padding NGANG trong section giữ 16px để thẳng hàng với `field()` dùng chung (bơm ngang là lệch mép ô nhập).

| Nấc | Trước | Sau |
|---|---|---|
| Lề trang / title | `pt-8 pb-20`, title `pb-6` | `pt-12 pb-24`, title `pb-10` |
| Gutter 2 cột | `gap-10` (40px) | `gap-16` (64px) |
| Hàng tiêu đề bước (`ckSection`) | 56px | 72px |
| Khối notice / tabs hình thức nhận | `mb-4` | `mb-6` |
| Nút Xác nhận / Đặt hàng trong section | `py-4` | `pt-6 pb-8` (nút chốt: `pt-2 pb-8`) |
| Tóm tắt đã xong (`s0done`/`s1done`/`p0done`) | `pb-4` | `pb-6` |
| Gap lựa chọn ship / pay / sổ địa chỉ | `gap-3` | `gap-4` |
| Khối VAT | `pt-4 pb-4` | `pt-6 pb-6` |
| Panel tóm tắt: padding / gap hàng / dòng Tổng cộng | `px-4 py-4` / `gap-3` / `h-12 mt-2` | `px-6 py-6` / `gap-5` / `h-14 mt-3` |

Mobile checkout CHƯA áp nhịp này — muốn đồng bộ thì bơm các nấc dọc tương ứng (mobile không có gutter).

**Mobile: khối "Giỏ hàng của bạn" sticky trên đỉnh (14/08/2026, yêu cầu user).** `.ck-sum` thêm `sticky top-0 z-50 bg-background`: cùng top/z với navbar nhưng đứng SAU trong DOM nên khi cuộn nó đè lên, **thay chỗ logo** — khách cuộn tới đâu cũng thấy giỏ + tổng tiền, chạm là xổ danh sách tại chỗ. Cần bg đặc, không thì chữ form hắt xuyên. Kèm lưới an toàn trong wire(): nếu mở danh sách mà scroll-anchoring của trình duyệt đẩy khối âm đỉnh (trigger văng khỏi màn, không thu lại được) thì cuộn mượt về đầu trang — mốc cuộn KHÔNG lấy từ offsetTop/rect của chính khối vì phần tử sticky đang ghim trả về vị trí đã dịch. Lưu ý khi test tự động: cookie banner khoá scroll (`lockBodyScroll`) từ lúc load — phải bấm đóng banner trước thì trang mới cuộn được.

Cùng ngày (yêu cầu user, sau đó **đồng bộ CẢ 2 BẢN**): cặp nút **Giao hàng / Nhận tại cửa hàng dời VÀO ĐẦU thân section 0**, section đổi tên "Thông tin giao hàng" → **"Vận chuyển"** (áp cho cả 2 chế độ — luồng nhận tại cửa hàng trước đó đặt tên section theo chế độ). Lý do: đổi chế độ là việc của đúng bước đó, không phải của cả màn; toggle đứng lẻ trên hộp section trông rời rạc. `#ckModeTabs` giữ nguyên id nên quy tắc paintCheckout ẩn toggle khi đã tới bước Thanh toán (kể cả lúc bấm "Thay đổi" sửa lại bước 0) vẫn chạy — test cả 2 chiều đổi chế độ + ẩn ở bước cuối trên cả desktop lẫn mobile. Key i18n 'Vận chuyển':'Shipping' có sẵn ở cả 2 file. (Các chỉnh desktop khác trong ngày — nhịp spacing Farfetch, nút Xem thêm của panel — vẫn CHỈ desktop: mobile không có panel bên, tóm tắt mobile vốn là accordion không dư tầng tiêu đề, và spacing mobile đang neo theo Figma mốc 56/72.)

Cùng ngày (yêu cầu user, 3 vòng): danh sách sản phẩm trong panel **thu gọn được**. Vòng 1 dùng hàng trigger "Giỏ hàng của bạn" kiểu accordion mobile — user chê **dư 1 tầng tiêu đề** (trùng vai với "Tóm tắt đơn hàng" cùng đứng đầu danh sách). Vòng 2 thay bằng nút "Xem thêm" cạnh title (wiring `#ckSumToggle`). **Bản chốt (vòng 3): đảo bố cục — KHỐI TIỀN lên TRÊN** (panel trả lời ngay "đơn bao nhiêu tiền"), danh sách sản phẩm thành nhóm riêng bên dưới nên hàng trigger **"Giỏ hàng của bạn (N)" + chevron quay lại chính danh** (2 nhóm 2 nội dung, hết trùng vai — dùng lại wiring `.acc-trigger` chung, bỏ handler `#ckSumToggle`). Mặc định thu gọn (~310px), mở ~1.370px. Thứ tự trong panel: title → Tạm tính/Giảm giá/Giao hàng → Tổng cộng (border-t) → trigger Giỏ hàng của bạn → danh sách.

### Bộ lọc lọc thật + 4 hành vi mới — CẢ 2 BẢN (12/08/2026)

Theo yêu cầu user (áp cho `index.html` và `desktop.html`):

1. **Chip size tối đa 5 ô/dòng** — container thành `grid-template-columns:repeat(5,1fr)` (helper `sizeGrid`), chip từ `min-w-[52px] px-2` → `w-full px-1`. Giống lưới size PDP. Áp cho cả Kích thước (thời trang) và Dung tích (beauty) vì dùng chung helper `chips()`.
2. **Màu sắc chọn NHIỀU** — bỏ chọn-1; mở ra **không ô nào được chọn** (trước đây ô đầu bị tô sẵn nên phải có cờ `dataset.colorPicked` để phân biệt "tô sẵn" với "user đã chọn" — cờ đó đã xoá). Helper `setColorChip(btn, on)` dùng chung cho handler và nút Đặt lại.
3. **"Đặt lại" chỉ hiện khi đã áp dụng trước đó** — mặc định `class="hidden"`, `syncFilterFooter()` toggle theo `plpFilters.length`. Lưu ý: theo **đã áp**, không theo tick hiện tại.
4. **"Áp dụng" kèm số kết quả** — `<span id="filterApplyCount">`, cập nhật mỗi lần tick.

**Kéo theo: lưới PLP giờ LỌC THẬT.** Số trên nút buộc phải khớp lưới nên không thể bịa:
- Nguồn duy nhất vẫn là `plpFilters` (mảng **NHÃN**); facet **suy ra từ nhãn** → xoá chip ngoài PLP là lưới tự cập nhật, không cần state thứ hai.
- `matchProducts(list, labels)` lọc: thương hiệu · màu · Đang giảm giá (`p.off`) · Hàng mới về (`p.tag`). Màu sản phẩm mang tên tiếng Ý (Nero/Bianco/Cuoio) nên quy về ô màu bộ lọc **gần nhất theo khoảng cách RGB** (`colorBucketOf`, có cache).
- **KHÔNG lọc được**: Size (PRODUCTS không mang size — chỉ PDP_DATA có), Danh mục, Ưu đãi beauty. Các nhãn này vẫn vào chip nhưng không thu hẹp lưới. Thêm `sizes`/`cat` vào PRODUCTS thì bổ sung vào `matchProducts()`.
- **Bỏ pre-tick 2 thương hiệu** (`fchk(i < 2)` → `fchk(false)`): từ khi lọc thật, 2 ô tick sẵn cho đẹp ảnh làm số kết quả mở ra đã là 0.
- **Empty state mới** khi lọc ra 0 kết quả + nút "Xóa tất cả bộ lọc" (empty state của tìm kiếm `2918:46100` bám từ khóa, không dùng lại được) + 3 khoá i18n.

**3 bẫy đã sập và cách chống — đừng làm lại:**
- **Nhãn phải lấy từ ATTRIBUTE, không lấy `textContent`.** `applyLang` dịch text node nên ở EN "Đang giảm giá" → "On sale", `matchProducts` so với `FILTER_FLAGS` tiếng Việt sẽ trượt và **bộ lọc câm lặng**. Đã thêm giá trị vào `data-sub` / `data-brand` / `data-other` / `data-flabel` và `pickedLabels()`/`syncFilterToDom()` đọc attribute trước, chỉ fallback textContent. (`data-color` vốn đã mang tên VI nên màu không bị.)
- **Đổi ngành hàng phải PRUNE nhãn.** `renderFilterBody()` dựng lại thân khi đổi ngành, ticks mất nhưng `plpFilters` còn → áp màu Đen ở thời trang rồi sang beauty (beauty **không có** mục Màu sắc): lưới 0 sản phẩm mà nút vẫn báo tổng, user không thấy đâu mà tắt. `pruneFiltersToBody(sh)` bỏ nhãn không còn ô tương ứng rồi render lại lưới.
- **Xoá filter từ NGOÀI sheet phải sync ngược vào DOM.** Nút "Xóa tất cả bộ lọc" ở empty state (và chip ở desktop) xoá `plpFilters` nhưng ticks trong sheet vẫn còn → mở lại thấy tick không còn hiệu lực, số lệch hẳn với lưới. Dùng `syncFilterToDom()` (có ở **cả 2 bản**).
- ⚠️ Comment trong các hàm dựng markup (`filterSheet`, `filterBar`…) **không được chứa backtick** — cả khối là template literal.

#### 9 lỗi phát hiện qua review đối kháng — đã sửa cùng ngày

Review 4 góc (state-lifecycle · parity · counting · i18n+DOM) trên chính bản vừa làm, 28 cáo buộc thật gom về 9 gốc:

1. **Empty state phải nằm ở CẢ đường render màn**, không chỉ `renderPlpGrid()`. Template màn đổ lưới trực tiếp nên hễ điều hướng sang PLP khác (hoặc vào lại chính nó) trong khi bộ lọc ra 0 kết quả là lưới **trắng trơn, không đường thoát**. Đã tách `plpFilterEmptyHTML()` + `plpGridInner(list, card)` dùng ở cả template và `renderPlpGrid`; nút xoá đổi từ `id` sang **`data-clear-filters` + listener uỷ quyền ở document** nên không cần bind lại sau mỗi lần vẽ.
2. **Prune phải chạy lúc ĐIỀU HƯỚNG, không chờ mở drawer.** Bản đầu `pruneFiltersToBody(sh)` đọc DOM của sheet nên chỉ chạy khi `openFilter()` → nhãn mồ côi vẫn lọc lưới suốt từ lúc vào trang. Đã đổi thành `facetLabelsFor(beauty)` + `pruneFilters()` **thuần dữ liệu**, gọi ngay trong `goPlp()`.
3. **`openFilter()` phải `syncFilterToDom()`**, không chỉ `syncFilterFooter()`. Tick rồi đóng bằng ✕/backdrop (không Áp dụng) để lại tick "mồ côi": mở lại thấy tick, số kết quả tính theo tick nên lệch lưới, mà "Đặt lại" lại ẩn vì `plpFilters` vẫn rỗng. Giờ mở ra luôn phản ánh trạng thái **đã áp**.
4. **Số "N sản phẩm" ở header** in `plpProducts()` (chưa lọc) và không có hook cập nhật → header nói 16 trong khi nút hứa 6 và lưới đúng 6. Thêm `[data-plp-count]` + `updatePlpCount()`, dùng số **đã lọc**.
5. **"Xem thêm"/"Show more" nhồi `PRODUCTS.slice(0,4)` thô** — bỏ qua bộ lọc và cả ngành hàng, kể cả chèn 4 thẻ ngay dưới câu "không khớp bộ lọc". Đổi sang `sortedProducts().slice(0,4)`.
6. **Ánh xạ màu: bỏ khoảng cách RGB, dùng HSL.** RGB không phân biệt sắc nên "gần nhất" gán #a5d48c (xanh lá) vào **Xám**, #f5d6e0 (hồng) vào **Beige**, còn Đỏ/Navy **không bao giờ** khớp gì. Giờ tách nhóm trung tính (S < .15, so theo độ sáng) vs có sắc (so theo hue, ngưỡng 40°, quá xa → `null`), cộng **phạt độ sáng ×60** để tách Nâu khỏi Beige (2 ô gần cùng hue 18°/33°, chỉ khác độ sáng). Kết quả đo: xanh lá/mint → không khớp ô nào; hồng → Đỏ; cuoio + nero oro → Nâu.
7. **Dung tích LỌC THẬT** — comment cũ của tôi ("PRODUCTS không mang size") **sai**: 8 sản phẩm beauty có field `sizes` trùng khít `FILTER_VOLUMES`. Đã thêm vào `matchProducts()`. (Size thời trang thì vẫn không lọc được — đúng là chỉ `PDP_DATA` có.)
8. **Nhãn dung tích không gắn tiền tố "Size "** — chip dung tích dùng chung class `.fsize` nên `plpFilters` từng chứa `"Size 100 ml"`. Sửa ở cả 3 nơi: `pickedLabels`, `syncFilterToDom`, `pruneFilters`-present-set.
9. **Hai lệch parity**: mobile hardcode `fSection('Thương hiệu (2)')` — di sản thời pre-tick, luôn hiện "(2)" dù 0 ô tick (I18N còn dịch thành "Brand (2)") → bỏ số; desktop `refreshActiveFilters()` ghi `Bộ lọc (n)` mà không `localizeNew` nên UI tiếng Anh vẫn hiện tiếng Việt → thêm localize. Cũng bỏ alias thừa `FILTER_COLOR_HEX` chỉ desktop có.

**Còn lại chưa làm** (không thuộc 4 yêu cầu, ghi để không quên): mobile **không có badge (n)** trên nút Bộ lọc và không có hàng chip đang-áp-dụng, nên sau khi áp bộ lọc rồi rời trang thì không có chỉ dấu nào; mobile cũng **chưa có số đếm động theo section** (`[data-fscount]` + `syncSectionCounts` chỉ desktop có); checkbox danh mục cha vẫn tick toàn bộ con nên 1 cú bấm sinh ~16 nhãn (Danh mục vốn không lọc nên lưới không đổi, chỉ số chip trông vô lý); skeleton desktop lấy `grid.children.length` nên vẽ lại từ trạng thái empty chỉ hiện 1 khung xương.

### Nút về đầu trang + mục lục trang chính sách — CẢ 2 BẢN (12/08/2026)

Theo yêu cầu user, 3 việc (áp cho `index.html` và `desktop.html`):

**1. Mục lục trang chính sách 12 → 14 Medium** (cả 3 trang, vì dùng chung `screenPOLICY`) — xem giải thích ở mục "Trang tĩnh / chính sách".

**2. Desktop: mục lục rời sidebar, lên trên nội dung.** Sidebar giờ chỉ còn 3 link chuyển trang; mục lục nằm trong **cột nội dung 860px**, giữa khối tiêu đề và section đầu, có nhãn "Mục lục" (12, tracking `.12em`) + viền `border-y` như bản mobile. **2 cột** để 6-7 mục không đẩy đoạn đầu xuống quá sâu: `grid grid-cols-2` + `style="column-gap:32px"` — **`gap-x-8` không có trong `tailwind.css` build sẵn**, dùng inline style thay vì rebuild (cùng cách `sizeGrid` đang làm với `grid-template-columns`). Hàng tự cao 32px nhờ `py-1.5` nên không cần row-gap. Ở dải desktop hẹp 768px, 2 nhãn dài nhất của trang Đổi trả xuống 2 dòng (52px) — chấp nhận, tổng chiều cao gần như không đổi so với 1 cột.

> `wire()` tìm `[data-policy-toc]` bằng `root.querySelectorAll` (root = cả màn) nên đổi chỗ khối mục lục **không cần sửa handler**; `scroll-mt-[128px]` trên section vẫn trừ đúng navbar desktop.

**3. Nút về đầu trang `#topFab`** — mọi màn, dựng **1 lần lúc boot ở cuối `<body>`, NGOÀI `#viewport`**: `go()` thay sạch nội dung viewport mỗi lần chuyển màn, đặt trong đó thì mỗi màn phải tự nối lại listener. Nhờ vậy cả app chỉ có **1 listener `scroll`** và không cần dọn trong `scrollCleanups`.

| Điểm | Giá trị |
|---|---|
| Vị trí | `right: 12px` · `bottom: 144px` — ngay trên `#settingsFab` (96 + 40 + 8), cách 8px |
| z-index | `70` — dưới `#settingsPanel` (71) và `#settingsFab` (72), trên thanh CTA dính đáy (z-50) |
| Ngưỡng hiện | cuộn quá **nửa chiều cao màn hình** (tính lại mỗi lần cuộn nên không cần nghe `resize`) |
| Ẩn/hiện | class `.show` → `opacity` + `translateY(8px)` + `pointer-events`, transition .22s |
| Nhãn | `aria-label="Về đầu trang"` (icon-only), có key i18n → "Back to top" |

- **Popover Cài đặt sổ ra đúng chỗ nút này** (`.sp-card` cũng `bottom: 144px`) nên `openP`/`closeP` bật/tắt class **`sp-open` trên `<html>`**, CSS `html.sp-open #topFab` ẩn nút đi — che bằng z-index thì vẫn thấy nút nhô ra cạnh thẻ.
- **Bottom sheet mở → nút tự ẩn**, không cần thêm code: `lockBodyScroll()` gắn `position: fixed` cho `<body>` → `scrollY` về 0 → dưới ngưỡng. Lúc đó "đầu trang" cũng không phải việc người dùng đang làm.
- Thanh CTA dính đáy cao nhất là `#cartStickyCta` 88px (top 724 ở màn 812) → **không chạm** đáy nút ở 668.
- Cookie bar desktop vốn đã đặt **bên trái** với lý do ghi thẳng trong comment: "để không chèn nút chat/lên đầu trang thường nằm góc phải" — đúng chỗ đang đặt nút này.

### Chuẩn hóa màu theo design token — chỉ desktop (12/08/2026)

Nguồn sự thật mới: bản export DTCG mode D của user (`Downloads/D.tokens.json`).
`tokens.css` vá tay 2 chỗ (accent `#ff6600`→`#09090b` theo Figma — không đổi UI vì
không ai dùng `bg/text-accent` DEFAULT; thêm `--general-body-text` +
`--unofficial-foreground-alt-2`, đều `#404040`, code chưa dùng). **`tailwind.css`
đã rebuild** — trước đó build 10/08 thiếu `bg-transparent`, `bg-success`,
`bg-warning-subtle`, `accent-primary`.

- **Bug hiển thị thật đã sửa**: `I.tick` hardcode `fill="#fff"` → `currentColor`,
  kèm `color` vào `.chk.on` — trước đó tick **vô hình** ở bullet "Đặc quyền hạng
  Vàng" (account/loyalty) và vòng tròn màn `ckPlaced` (đều nền trắng). Vòng tròn
  ckPlaced thêm `text-primary`. Bản mobile đã sửa cùng cách 12/08/2026
  (index.html: tick + `.chk.on` + vòng tròn ckPlaced; `.chk.on` mobile vẫn giữ
  nền `#0a0a0a` cứng vì chuẩn hóa token nền/viền mới làm ở desktop).
- Semantic: badge "Quà tặng" chữ `text-destructive-subtle`→`text-primary-foreground`;
  pill trạng thái đơn warning `bg-destructive-subtle`→`bg-warning-subtle`; lịch sử
  điểm `text-emerald-600`→`text-success` (×3); thanh độ mạnh mật khẩu
  `bg-emerald-500`→`bg-success`; checkbox điều khoản `accent-black`→`accent-primary`.
- Input: newsletter bỏ viền `border-border-5`→`border-border`; 4 input
  `bg-background`→`bg-input` (cùng trắng, đúng token ô nhập).
- Bộ lọc PLP: ring swatch `border-[#010101]`/`border-[#e0e0e0]` → `border-primary`/
  `border-border` (sửa CẢ 2 `classList.replace` trong JS — literal bake cứng);
  hairline swatch trắng → `border-border-3` (khớp card PLP); gạch nối khoảng giá
  `bg-[#e0e0e0]`→`bg-border`. `#e0e0e0` đã sạch khỏi file.
- SVG/CSS: spinner data-loading + nút ✕ zoom hết `#fff` cứng (currentColor /
  `--general-primary-foreground`); chevron helper default + call site → `var()`;
  `.chk.on`/`.chip.on`/`.sw.on`/`.ghost-hover`/`.dk-nav-arrow`/`.cg-sw i` hết hex
  literal; nút quick-add sửa 2 biến không tồn tại (`--2`→`--spacing-2`,
  `--rounded-infinite`→`--radius-infinite`) + bỏ hex fallback.
- `text-primary-foreground/80` (class chết — cú pháp `/alpha` không hoạt động với
  token dạng `var()`) → `text-primary-foreground opacity-80`.
- Viền card: chỉ sửa 2 chỗ có bằng chứng nội bộ rõ — `#ckSections` về `border-border`
  (khớp cột tóm tắt đứng cạnh) + header `#infoSheet` về `border-border` (khớp mọi
  overlay header). KHÔNG bulk-đổi `border-border-1` còn lại: Figma để description
  của `border 1` và `border 2` trùng nhau nguyên văn, không có căn cứ phân xử.
- Xoá code chết mang style lệch hệ: `orderSummaryRow`/`miniCart`/`stickyCta`
  (không call site) + handler `.brand-chip` mồ côi.
- **Cố ý KHÔNG sửa (chờ chốt)**: backdrop `.45` (token ghi `0.6` trong description —
  đổi là tối hơn thấy rõ 10 overlay); viền input `#e5e5e5` (token ghi `border 3
  #d4d4d4` là "input borders default" nhưng component spec 3547:55856 + toàn bộ code
  đang dùng `#e5e5e5` — hai nguồn Figma tự mâu thuẫn); `.chip.off`
  (`#a3a3a3`/`rgba .04` — không có token chữ disabled); `#d9d9d9` rail cây danh mục
  (giá trị Figma spec, có comment); shadow các loại (tokens.css không có token shadow).

### Đã đồng bộ sang desktop (12/08/2026)

Hai lệch "nhìn thấy ngay" tìm ra khi soát lại độ dày line/text toàn bản desktop:

- **Radio theo Figma `3547:55856`** — bỏ `.radio.on { border-color }` nên vòng radio giữ **1px `#d4d4d4` ở cả 2 trạng thái**, chỉ chấm 8px hiện ra; `.opt.on` còn **đổi viền `#262626`, không tô nền** (`#fafafa` đã bỏ). Markup 3 chỗ còn dùng `border-2` + tráo `border-primary` đổi hết sang `border border-border-3` tĩnh: `richRadio()` (vận chuyển + thanh toán), quà tặng ở giỏ, `dafcRewards()`. Trước đó màn checkout có **2 loại radio cạnh nhau** — vòng 2px đổi đen ở vận chuyển/thanh toán, vòng 1px ở thẻ cửa hàng + sổ địa chỉ.
  - Kéo theo: xoá override riêng `#storeOpts .opt.on` (giờ trùng luật chung) và các `classList.replace('border-primary','border-border')` trong handler radio/rewards — màu viền thẻ do **`.opt.on` cấp một chỗ duy nhất**, JS chỉ bật/tắt `.on`.
- **Heading màn Hoàn tất** — `text-[24px] font-medium leading-snug` → **`font-light leading-8`**, khớp 16 heading 24px còn lại; eyebrow "Xác nhận" 10px → **12/16** (thang eyebrow của trang), body `leading-relaxed` → **13/20**. Kèm 2 khoá i18n còn thiếu cho 2 câu body (tách bằng `<br>` nên `applyLang` phải có khoá riêng từng câu, không dùng được khoá câu dài của màn `ckPlaced`).

### Đã đồng bộ sang desktop (11/08/2026)

- **Nhận tại cửa hàng ở checkout** — port nguyên luồng: `DAFC_STORES` / `storesOf` / `storeInfo`, state `ckMode/ckCity/ckStore`, tab hình thức nhận hàng, 2 section (bỏ bước vận chuyển), chặn Xác nhận khi chưa chọn cửa hàng, `paintStore` cập nhật tại chỗ, dòng "Nhận hàng — Tại cửa hàng" ở tóm tắt, màn done đổi 2 dòng cuối, `data-reset` trả về mặc định. Khác bản mobile đúng một điểm theo khuôn desktop: 2 ô chọn (thành phố · cửa hàng) và 2 ô tên/họ xếp **2 cột** thay vì dọc.
- **Segmented toggle kiểu "nổi lên"** — `segToggle`/`segBtnClass` copy từ mobile, áp cho cặp Cá nhân/Công ty (VAT) và tab hình thức nhận hàng.
- **20 chuỗi i18n còn thiếu** — "Phường xã", "Bảng kích thước →", chip "Giày" và 19 tiêu đề mục của 3 trang chính sách; bản dịch lấy nguyên từ `index.html` để 2 bản không lệch chữ.

### Đã port sang desktop (10/08/2026)

Toàn bộ backlog "chờ port" bên dưới đã chạy xong trong một đợt. Ghi lại từng mục
để lần sau đối chiếu, kèm chỗ desktop cố ý làm khác mobile.

- **Data + ảnh thật từ shop.dafc.com.vn** — `PRODUCTS` (24 SP: 10 thời trang + 8
  beauty `dept:'beauty'` + 6 SP bổ sung `x*.jpg`), `PRODUCT_GALLERY`,
  `PRODUCT_INFO`, `CATEGORIES`, `CART`, `GIFTS`, `ORDERS`, `CART_SUBTOTAL`
  113.500.000đ, `REWARD_POINTS` 1240 + ~39 entry i18n tên SP / nhãn thông số /
  mô tả / bảo quản. `PDP_DATA` bỏ hẳn `swatches`/`gallery` viết tay: `dkScreenPDP`
  đọc thẳng `PRODUCT_GALLERY[idx]` (slide = full gallery cắt 6 ô cho lưới 2 cột,
  swatch = slice theo `colors`), 4 tab sinh từ `pdpTabs(idx)` nên pdp/pdp4 hết
  cảnh tả nhầm thành túi canvas A.P.C.
- **`plpProducts()` lọc theo ngành hàng** — thêm `isBeautyPlp()`; PLP Làm đẹp chỉ
  ra 8 nước hoa, PLP thời trang không lẫn nước hoa, tìm kiếm quét cả hai.
- **Đồng bộ copy toàn app** — 7 ngày đổi trả, voucher nhận cả JUL500/1000/1500,
  bỏ TUMI khỏi promo (PDP + giỏ hàng), WARDROBE [01/08-31/08] + BUY MORE
  [28/07-24/08] (còn 3 chương trình), ORDERS 2026 + TKN284917, typo checkout
  "Thay đổi / Giao hàng nhanh / Chuyển khoản / QR code", nhãn vận chuyển khớp
  option, 1.135 điểm, MENU_DATA "Quần áo/Túi xách/Giày thể thao/Chân váy" + cây
  Làm đẹp 8 nhóm, casing "Chính sách bảo mật", 11 bản dịch lệch chỉnh về bản
  mobile, 23 key i18n chết đã xoá.
- **Footer thật** — TIKINOW, "Đã thông báo Bộ Công Thương", icon Zalo thay
  YouTube, `FOOTER_COLS` khớp `FOOTER_LINKS` của mobile, 3 link chính sách trỏ
  route thật qua `FOOTER_ROUTES`.
- **3 trang chính sách** — `POLICY_TABS` / `POLICY_UPDATED` / `POLICY_DATA` dùng
  chung với mobile; `screenPOLICY()` dựng **layout desktop riêng**: sidebar 280px
  (chỉ 3 trang, dính) + nội dung 860px, không có dropdown `#policyMore` vì ở
  1440 cả 3 tab nằm thoải mái trong sidebar. Link cookie bar cũng mở trang thật.
  **Mục lục đã rời sidebar (12/08/2026)** — xem mục dưới.
- **Khối KHUYẾN MÃI ở PDP** — `PROMOS` / `PDP_PROMOS` + `promoCardGrouped` (pdp2)
  và `promoCardsSplit` (pdp), bỏ wrapper `px-4` vì panel info 427px đã có padding.
  `#isBody` đổi `<p>` → `<div>`, `__openInfoSheet(title, body, asHTML, full)`.
- **Bảng size** — `SIZE_CHART` / `SIZE_CHART_NOTE` / `sizeChartHTML` /
  `openSizeChart`; nút "Bảng kích thước →" ở PDP và quick add, cùng link "Hướng
  dẫn chọn size" trong sheet chọn size đều mở bảng thật. Dialog `.full` rộng
  880px thay vì full-screen như mobile.
- **"Chỉ còn 01 sản phẩm" theo size** — `#lowStock` mặc định ẩn, `setCta(state,
  size)` chỉ hiện khi size nằm trong `SIZE_LOW_STOCK`.
- **Bộ lọc** — `fchk()` thêm `rounded-xs`, `frail()`/`fsubRow()` sửa rail tầng 3
  (2 cột `w-5` thay 1 cột `w-9`), tách `filterBody(beauty)` + `renderFilterBody()`
  + `wireFilterBody()` nên PLP Làm đẹp đổi sang facet Dung tích / Ưu đãi và bỏ
  Màu sắc. Giữ nguyên phần desktop đã có: số đếm trong tiêu đề section, nút Áp
  dụng sinh `plpFilters` cho hàng chip, drawer phải 420px không grabber.
- **Picker địa giới + nút mắt mật khẩu** — `VN_LOCATIONS`, `ckProvince`/`ckWard`,
  `wireAddressPickers` / `setPickLabel`, `#pickSheet` chuyển thành `.dk-modal`
  480px; `eyeBtn()` + `wirePasswordToggles` cho `afield` và popup đăng nhập nhanh.
- **Quick add thu gọn** — bỏ grabber, ✕ 24px, gallery `p-0.5`, "Xem chi tiết" dời
  lên cạnh tên SP, CTA ghim đáy qua `#qaCta` + `quickAddCta()`, swatch dạng ảnh
  44px, size 5 ô/dòng, không có link bảng size (node đó Figma đang tắt).
- **Thang chữ / border / input** — 6 chỗ `text-[20px]` → `text-[18px] font-medium`
  (hết cỡ 20px), mọi `<input>` về 14px + rule `input, textarea, select
  { font-size: 14px }` thuần element; **không** thêm `maximum-scale=1` vì desktop
  không có chuyện iOS zoom. Navbar và nav phụ bỏ viền dưới, khối cam kết bỏ
  `border-t`.

**Còn lại chưa làm:**

- `PLP-Desktop-03-ByBrand-Alt` (2539:174249) — biến thể hero dùng wordmark chữ
  thay logo ảnh và mô tả không thu gọn; chưa dựng vì app không có cơ chế chuyển
  biến thể hero.
- Rà nốt ~26 chỗ `border-t/b/y` còn lại trong `desktop.html`. Phần lớn là khung
  card riêng của layout desktop (card tài khoản / đơn hàng / checkout) chứ không
  phải "border ngăn giữa các block" như đợt mobile, nên cần đối chiếu từng chỗ
  với frame desktop tương ứng trước khi bỏ.
- `SIZE_SHEET_BY_PRODUCT` của mobile (map index SP → kiểu sheet size) chưa port;
  desktop vẫn dùng `SIZE_SHEET_OPTIONS` khoá theo route `pdpN`.

## Bản desktop-neutral.html — phương án màu greige ấm (14/08/2026)

- **Mục đích**: trả lời mục Overview #32 của BRIEF-GAP ("đề xuất phương án màu
  ngoài Grey-Gold hiện tại"). File là **clone nguyên vẹn** của `desktop.html`
  tại 14/08 — layout / spacing / thang chữ / radius / nội dung giữ 100%, chỉ
  khác lớp skin. Font vẫn Montserrat (quyết định của user: giữ font design
  system, không serif).
- **Cơ chế**: khối `NEUTRAL SKIN` append **cuối** `<style>` (nằm sau tokens.css
  + tailwind.css + style gốc nên rule cùng specificity thắng cascade — cùng
  pattern với `.theme-dplus`). Không đụng `tokens.css`/`tailwind.css` (dùng
  chung 8 trang), không utility Tailwind mới. Ngoài khối đó chỉ có: 5 badge đổi
  class (`tag-note` pre-order ×3, `tag-gift` quà tặng ×2), 1 inline shadow
  `#loginCard`, `<title>`.
- **Bảng màu**: canvas `#fbfaf7` (body-background tách khỏi nền thẻ — đúng cơ
  chế Gentle-Monster có sẵn) · bề mặt `#fefdfb` · thẻ/input trắng · secondary
  `#f4f2ed` · border `#e9e6df` · mực `#171410` / `#2b2721` / `#46423a` · muted
  `#6f6a60` · destructive `#a03733` (subtle `#fdebec` → badge -% thành pastel
  đỏ tự động) · pastel: pre-order `#fbf3db`/`#7a5300`, quà `#edf3ec`/`#2f5a34`.
  Shadow toàn bộ hạ về `rgba(23,20,16,.04–.12)`. Motion: reveal/rise chuyển
  curve `cubic-bezier(.16,1,.3,1)`; card sản phẩm hover nâng nhẹ + ảnh zoom
  1.03 (CSS thuần trên `.bg-card[data-product]`, không sửa template).
- **2 fix kèm theo** (lỗi brief nêu ở Overview #31/#35, chỉ trong bản neutral —
  bản gốc giữ nguyên chờ khách duyệt): `--general-muted-foreground` `#737373`
  → `#6f6a60` (chữ 12px lên ~5.3:1) và `--btn-focus-ring` `#d4d4d4` → `#8a8478`
  (~3.4:1, đạt WCAG 2.4.13).
- **Đo được khi verify**: ảnh sản phẩm CDN có nền `#f1f1f1` **nướng sẵn trong
  file** (4 góc ảnh đều 241,241,241) → trả lời câu hỏi mở #02 của BRIEF-GAP:
  `#f1f1f1` là nền của ảnh, không phải khung web. Chênh với `#f4f2ed` nhỏ
  (ΔRGB ≤ 7) nên không lộ quầng trên nền ấm.
- Theme picker (d / dplus) vẫn chạy — `.theme-dplus` được vá tông ấm ngay trong
  khối skin. RESP giữ nguyên như bản gốc: dưới 768px vẫn đá về `index.html`,
  nên xem bản neutral cần cửa sổ ≥ 768px.

## Bản desktop-editorial.html — thử nghiệm đổi bố cục (14/08/2026)

- **Clone từ `desktop-neutral.html`** (giữ nguyên skin greige) — trả lời câu hỏi
  "nếu được đổi layout thì trông thế nào". `desktop.html` và
  `desktop-neutral.html` không bị đụng.
- Khối `EDITORIAL LAYOUT` append cuối `<style>` + 6 chỗ template đổi
  class/cấu trúc (không chuỗi hiển thị nào bị sửa nên i18n nguyên vẹn):
  - **Hero brand 2 cột 50/50**: ảnh campaign dùng đúng **khổ dọc 1200×1484**
    (bản gốc ép vào khung ngang 575×320 nên mất phần lớn ảnh); mô tả lên 16px
    light; strip danh mục tách xuống **hàng full-width, 6 ô chia đều**, nút
    cuộn ẩn bằng CSS vì hết thứ để cuộn (wiring `[data-strip-next]` giữ nguyên).
  - **Grid sản phẩm**: gutter 20/56 (gốc 4/16), **tile đầu feature 2×2**
    (CSS `#plpGrid > [data-product]:first-child`, sống sót qua toggle 3/4 cột
    và "Xem thêm"), brand/tên trong tile feature lên 16px.
  - Tiêu đề trang list 24 → **32 light**.
  - **Gallery PDP so le**: cột phải dịch xuống 64px, gutter 16, container chừa
    `padding-bottom: 72px` nên không đè carousel bên dưới.
  - **4 cam kết DAFC → thẻ bento** viền `--general-border`, icon xếp trên,
    py 64 (viền bao 4 cạnh quanh card — không thuộc lệnh cấm "border ngăn
    giữa block").
  - **Footer newsletter → statement band 48px light** (48 thuộc thang chữ
    Figma), footer cách nội dung 56px.
- Đã verify bằng computed style + geometry: không tràn ngang (1425/1440),
  hero không overlap, feature = 2.06× card thường, gallery contained,
  brandToggle / strip / toggle 3-4 cột / show more / i18n EN↔VI / theme D-D+
  đều chạy, uppercase = 0. Lỗi 404 duy nhất khi chạy qua http.server là
  `/favicon.ico` — tình trạng sẵn có của cả repo (không trang nào khai favicon).

### Đợt 18/08/2026 — port 4 chỉnh sửa của `desktop.html` + thử skin NET-A-PORTER

**Phần A — port 4 chỉnh sửa (giữ đúng quyết định của bản chính):**

| # | Chỉnh sửa | Ghi chú khi port |
|---|---|---|
| 1 | Trả góp xuống dưới CTA, căn giữa | Y hệt `desktop.html`: thêm `payOfferRow()`, gọi ở nhánh không-pre-order của `cta`, xoá khối khỏi header. `setCta()` bản này **đã có sẵn** lookup `payOffer` nên hết chết. |
| 2 | Panel cookie đè ô thẻ | Cùng cách: bỏ `.dk-modal`, 2 mặt dùng chung khối toạ độ. **Khác bản chính**: fork này còn dùng chữ cookie NGẮN (trước 17/08) nên `max-height` chỉ đặt cho panel, thẻ chưa cần chặn trần. |
| 3 | Mega panel một cỡ 14 | Fork đang ở 12 (tiêu đề) / 13 (đường dẫn) — cả hai **ngoài thang chữ**. Đưa về 14 medium uppercase (tiêu đề) + 14 regular (đường dẫn), nhãn teaser 13 → 14. Thêm rule hover-gạch-chân, bám hook mới `.dk-mega-cols`. |
| 4 | Bỏ dòng "Tất cả …" | Y hệt. Data `.all` giữ nguyên (panel menu trượt còn dùng). |

- **Kéo theo (bắt buộc, không phải mở rộng phạm vi)**: footer panel cookie có **3 nút xếp ngang** — panel co 520 → 420 để đè đúng ô thẻ thì một hàng 3 nút không còn vừa (đo ~399px nội dung / 372px chỗ trống). Đổi sang **xếp dọc full-width**, đúng idiom cụm nút của chính thẻ nằm sau lưng, nút **Lưu lựa chọn lên đầu**. (Bản chính đã rút footer còn 1 nút từ 17/08 — fork này chưa port phần nội dung đó nên vẫn 3 nút.)
- **KHÔNG port**: đợt đổi nội dung cookie 17/08 (chữ bản khách, thang nút, bỏ mô tả nhóm), lưới `.dk-mega-grid` 4 cột, nền kính của mega panel. Fork này cố ý lệch ở đó; port cả sang là viết lại nửa file, không nằm trong yêu cầu.
- Đo lại: 6 PDP — `pdp` pre-order không có khối trả góp, 5 PDP còn lại đều **căn giữa khít nút, pad-top 8px, header sạch**. Cookie: thẻ `[32,458,420×410]` · panel `[32,279,420×589]` — trùng lề trái, khổ ngang, **đáy 868**; panel ở bản này **cao hơn** thẻ nên **che kín, không hở mép trên** như `desktop.html` (thẻ ở đó cao hơn panel 81px). Mega: **0 dòng "Tất cả"**, mọi đường dẫn 14px/400.

**Phần B — skin NET-A-PORTER** → ⚠ **đã bị VIẾT LẠI thành skin MR PORTER cùng ngày**, xem mục kế tiếp. Phần dưới đây ghi lại bản NAP để so sánh 2 hướng.

Đọc từ ảnh khách gửi (net-a-porter.com/en-us, trang Designers, mega panel mở). Append-only chồng lên khối greige — **xoá trọn khối là về lại neutral**, không dòng nào phía trên bị sửa.

| Mặt | Greige (trước) | NAP (nay) |
|---|---|---|
| Nền trang | `#fbfaf7` + 2 vệt radial ấm | `#ffffff`, phẳng tuyệt đối (`background-image: none`) |
| Thanh thông báo trên cùng | tối `#24201a`, chữ trắng | **sáng `#ebebeb`, chữ `#1a1a1a`** — đảo hẳn |
| Header (nav + subheader) | kính trắng 95% | **đen đặc `#000`**, chữ + icon trắng |
| Logo | PNG mực đen | `filter: brightness(0) invert(1)` → trắng |
| Nav | 14px, 3 bậc mực, đang chọn **đậm 600** | **một weight 400**, đang chọn đánh dấu bằng **gạch chân 2px sát đáy header**. Thang 2 tầng: dept **16/24** · submenu **14/20** (xem dưới) |
| Sale | `#a03733` | `#d81e05` (kéo cả badge -% và giá sale theo token) |
| Mega panel | greige + `shadow-xl` | **trắng, không bóng**, kẻ dưới 1px, nhịp dọc 34px/dòng, pad 40/48 |
| Nhãn nhóm | Secondary `#262626` | **xám `#767676`** (⚠ cố ý lệch chốt 18/08, xem dưới) |
| Bóng | 10 mặt có bóng ấm | **tắt hết**, viền lo việc tách mặt phẳng |

- **Cơ chế đổi màu icon**: mọi svg trong file tô bằng `var(--general-primary)` / `var(--general-muted-foreground)` → chỉ cần **hạ biến trong `.navbar`**, không sửa svg nào.
- **`.dk-mega` là con của `.navbar`** nên phải **trả lại bộ biến sáng** cho panel, không thì chữ trắng trên nền trắng.
- ⚠ **Nhãn nhóm mega để XÁM, cố ý lệch chốt 18/08 "color Secondary"**: ở bảng màu NAP, Secondary là `#1a1a1a` (gần đen), mà NAP để nhãn nhóm xám cho nó lùi hẳn ra sau danh sách. Đây là file thử nghiệm nên ưu tiên giống NAP; về đúng chốt thì **xoá 1 dòng**, markup đã bind sẵn `text-secondary-foreground`.
- **KHÔNG đổi font**: NAP dùng grotesque riêng + serif cho caption editorial. Thêm 1 webfont serif nữa là quyết định khác (file đã tải 3 font), nên bản này tái hiện *cách hiển thị* (nhãn hoa nhỏ, nhịp thoáng, kẻ mảnh) chứ không đổi mặt chữ.

**2 lỗi tự phát hiện khi kiểm và đã sửa** (cả hai đều là biến màu `.navbar` ăn lan):
1. **Đường dẫn mega trắng trên nền trắng** — mục 4 tô trực tiếp `.navbar .text-foreground-alt` thành trắng; hạ biến ở `.dk-mega` không cứu được vì đó là rule màu trực tiếp. Sửa bằng 2 rule `.dk-mega .text-foreground-alt/.text-muted-foreground` viết SAU (cùng specificity, sau thắng) — **đừng đảo thứ tự 2 mục đó**.
2. **Header checkout/hoàn tất trắng mà chữ đã trắng** (dòng "Thanh toán an toàn & bảo mật" mất hút) — biến thể `logoOnly` đặt `.glass-95` **trên chính `.navbar`**, nên selector descendant không khớp. Thêm `.navbar.glass-95`.

- **Quét tương phản tự động 11 màn** (`plp · pdp · pdp2 · cart · checkout · done · order · account · login · privacy · search`, tính contrast ratio từng phần tử có text node so với nền thực tế gần nhất): **0 điểm dưới 2.5:1**. Console sạch trên tab mới.

**Thang chữ 2 tầng nav — hạ submenu về 14 (18/08/2026, yêu cầu user, tham chiếu `mrporter.com`)**

Bản NAP lúc đầu để **cả 2 tầng cùng 16** nên 2 hàng đọc ra ngang cấp. Nay lệch đúng 1 nấc thang chữ:

| Tầng | Selector | Cỡ |
|---|---|---|
| Hàng dept — Nam · Nữ · Làm đẹp | `.navbar .dk-dept` | **16/24** |
| Hàng submenu — danh mục | `.navbar .dk-nav-link` | **14/20** (hạ từ 16) |

- Khai **tường minh cả 2 dòng** trong khối skin dù 14/20 trùng giá trị trong markup — khối này là nơi ghi quyết định thang chữ của header, đọc 1 chỗ ra cả 2 tầng.
- Đo lại: **cả 3 dept** đều ra `14px / 20px / weight 400`; nút vẫn cao 36, hàng subheader vẫn 52, không nhãn nào vỡ 2 dòng. Gạch chân đang-chọn tự co theo chữ hẹp hơn (nút 135px → vạch 103px = 135 − 2×16 inset).
- **Tràn thanh cuộn**: `Nam`/`Nữ` (8 mục) **không tràn ở cả 16 lẫn 14** (1262/1262) — hạ cỡ không phải để chữa tràn. `Làm đẹp` (11 mục) vẫn tràn, chỉ đỡ hơn: **1554 → 1403** so với khung 1262, nên **2 mũi tên trượt vẫn hiện** như thiết kế (đo: next hiện, prev ẩn).
- **Không tra được `mrporter.com`**: site chặn cả browser pane (`Access Denied`, Akamai) lẫn WebFetch (timeout 60s). Nên chỉ áp **đúng con số user yêu cầu**, KHÔNG suy diễn thêm đặc điểm nào của MR PORTER (chữ hoa, tracking, nền sáng/tối…) — cần đối chiếu thì phải có ảnh chụp như lần NAP.
- Hệ quả cần biết: hàng submenu (14) giờ **cùng cỡ với đường dẫn trong mega panel** (14). Không lẫn nhau vì 2 mặt phẳng khác nhau.

### Skin MR PORTER — viết lại từ bản NAP (18/08/2026, 5 ảnh khách gửi)

Khách gửi 5 ảnh `mrporter.com`: trang chủ · header + mega panel mở · drawer bộ lọc · PDP · giỏ hàng. Khối `NET-A-PORTER SKIN` được **VIẾT LẠI thành `MR PORTER SKIN`**, không append thêm — 2 skin xếp chồng thì thành cả trăm dòng CSS chết. (Lần trước thử `WebFetch` + browser pane vào `mrporter.com` đều bị chặn; nay có ảnh nên dựng được.)

**Giữ lại từ NAP** (2 site cùng nền tảng, cùng ngôn ngữ phẳng): bảng token trắng/đen/trung tính, tắt bóng, panel mega trắng, nav một weight + gạch chân đánh dấu mục đang chọn, "Sale" đỏ `#d81e05`, thanh thông báo sáng.

**Viết lại cho MR PORTER:**

| Mặt | NAP | MR PORTER |
|---|---|---|
| Header | **đen đặc**, chữ + icon trắng, logo `invert` | **TRẮNG chữ đen** + **DẢI ĐEN ĐẶC 8px** ngăn hàng tiện ích với hàng danh mục, kết bằng hairline `#e0e0e0`. Logo không filter |
| Mặt chữ | sans (Montserrat) | **SERIF — nét nhận dạng số 1** |
| Bo góc | token gốc (2/4/8) | **vuông tuyệt đối** (hạ 5 token radius) |
| Nav màu | trắng đều | **`#1a1a1a` đều**, hover/đang chọn `#000` — đè thang mực 3 bậc của khối gốc (nghỉ `#767676` nhìn xám hẳn so với ảnh) |
| Gạch chân | trắng | **đen** |
| Nhãn nhóm mega | xám `#767676`, không vạch | **`#1a1a1a` + VẠCH NGẮN 32×1px bên dưới** (chi tiết MR PORTER có, NAP không) — nay **đúng chốt "color Secondary"**, không còn cố ý lệch |
| Hàng danh mục | căn trái | **căn giữa** (`justify-content: safe center`) |
| Thanh thông báo | `#ebebeb` | `#d9d9d9` (đậm hơn) |

- **Serif = Lora (Google Fonts)** — serif transitional, tương phản vừa, x-height cao nên đọc được ở 12–14px; gần nhất với mặt chữ trong ảnh trong số face tải miễn phí được. **Không phải font thật của MR PORTER** (face riêng, không phát hành).
  - Cắm vào **đúng cơ chế đổi phông có sẵn**, không ép cứng: thêm vào `<link>` + mảng `FONTS` (đặt đầu) + `currentFont = 'lora'`. `body.font-sans` (0,1,1) thắng utility `.font-sans` (0,1,0) nhưng **thua** `html.font-override body` (0,2,1) → popover Cài đặt vẫn đổi được sang 3 face sans để so sánh tại chỗ.
  - **Không khai weight 300** cho Lora: dải hợp lệ 400–700, khai 300 thì Google trả 400 thay thế, dễ tưởng `font-light` có tác dụng.
  - Bản mobile không có Lora → kéo cửa sổ hẹp thì hash mang `font=lora`, `FONTS.find()` bên đó không thấy nên bỏ qua, về Montserrat. Không lỗi, chỉ không mang được mặt chữ theo.
- **`> .glass-95:not(.dk-sub)`** để dải đen chỉ mọc dưới hàng tiện ích: cả nó và `.dk-sub` đều là con **trực tiếp** của `.navbar` và đều mang class `glass-95`. `.navbar.glass-95` (không phải descendant) là header rút gọn checkout/hoàn tất — ảnh giỏ hàng MR PORTER cũng có dải đen nên áp luôn.
- **`safe center`** chứ không `center`: ngành Làm đẹp 11 mục làm thanh tràn, `center` khi tràn sẽ đẩy phần đầu ra ngoài vùng cuộn và không cuộn tới được. Trình duyệt không hiểu `safe` thì bỏ cả khai báo → về căn trái, fallback vẫn dùng được. Lưu ý: giữa của **thanh cuộn**, không phải giữa màn — hàng này còn nút Tìm kiếm bên phải (MR PORTER để search ở hàng tiện ích) nên cụm danh mục lệch trái một chút so với ảnh.

**1 regression tự phát hiện và đã sửa** — **dải đen 8px làm lệch mọi offset sticky canh theo đáy header.** Đo được: `#plpFilterAnchor` ghim ở 118 trong khi đáy header xuống 127 → **tuột 9px xuống dưới header**; `desktop.html` canh khít 0px (118 = 118) nên đây là hệ quả trực tiếp của dải đen, không phải lỗi có sẵn. Dịch cả 3 offset:

| Phần tử | Trước | Sau |
|---|---|---|
| `#plpFilterAnchor` (thanh bộ lọc PLP) | 112 | **121** = 112 + 8 (dải đen) + 1 (hairline `.dk-sub`) |
| `.dk-policy-aside` | 128 | **136** |
| `.dk-sticky-info` / `.dk-sticky-side` | 136 | **144** |

Đo lại sau khi sửa: thanh bộ lọc **0px** (127 = 127, khít như `desktop.html`), 3 mặt sticky còn lại clearance 23–25px (bằng `desktop.html`), không tràn ngang (1425/1440).

- **Quét tương phản 12 màn** (`plp · pdp · pdp2 · pdp6 · cart · checkout · done · order · account · login · privacy · search`, ngưỡng 3:1): **0 điểm vi phạm**. Console sạch trên tab mới. *Lưu ý khi chạy*: quét 12 màn trong MỘT lệnh `javascript_tool` bị timeout 30s (mỗi màn `querySelectorAll('body *')` + `getComputedStyle` rất nặng) — phải khai helper vào `window` rồi chia 3–4 màn mỗi lệnh.

**Đợt sửa tiếp cùng ngày (yêu cầu user) — nav theo `desktop.html` + bỏ dải đen + công tắc bộ da**

*1. Cụm tiện ích header lấy theo layout `desktop.html`* — thứ tự **tìm kiếm → ngôn ngữ → tài khoản → giỏ**:
- Nút **tìm kiếm dời từ subheader lên hàng nav trên**, thành nút icon 44×44 đứng đầu cụm. Subheader giờ chỉ còn thanh danh mục (gỡ `#dkSearchWrap`, id này không chỗ nào trong JS đọc nên gỡ an toàn).
- **Bỏ nút "Danh sách cửa hàng"**.
- Nút ngôn ngữ rút thành **cờ + mã 3 chữ** — port `IcoFlagVN` / `IcoFlagEN` / `dkLangChip()` từ `desktop.html`. Wiring `[data-dklang]` đổi từ "đổi textContent của `.dklang-label`" sang **dựng lại cả chip** (`b.innerHTML = dkLangChip()`), vì giờ có cả cờ.
- **KHÔNG port** `#dkNavSearchField` (ô nhập tìm kiếm đè lên cả hàng nav, kiểu stradivarius) — nó cần thêm một khối CSS + wiring riêng, mà bản này đã có cơ chế layer tìm kiếm phủ trang (`#dkSearchLayer`) và nút mới gọi đúng `__openDkSearch`. Đã đo: mở/đóng layer từ nút mới đều chạy.

*2. Bỏ dải đen giữa header và subheader* — chỉ còn 1 hairline xám dưới hàng danh mục. Header từ 153 → **145px**. Kéo theo **gỡ luôn 3 offset sticky đã cộng bù 8px** (trả về số gốc của khối base); còn **đúng 1px** phải bù cho cái hairline, và bù **trong khối bộ da** (`html.skin-mp #plpFilterAnchor { top: 113px }`) chứ không sửa số base — tắt bộ da là hết hairline nên 112 gốc lại đúng. Đo cả 2 bộ da: thanh bộ lọc PLP ghim **khít 0px** (editorial 119=119, neutral 118=118).

*3. Subheader căn trái* — gỡ `justify-content: safe center`. Giữ comment tại chỗ để lần sau không ai đặt lại.

*4. Công tắc BỘ DA trong popover Cài đặt* — đổi qua lại Neutral ↔ Editorial tại chỗ, không phải mở 2 file:
- Toàn bộ khối `MR PORTER SKIN` được **gắn tiền tố `html.skin-mp`** cho MỌI selector. Dùng `html.skin-mp` thay `:root` — cùng trỏ `<html>` nhưng specificity (0,1,1) > `:root` (0,1,0) nên vẫn thắng khối greige. Gỡ class là rơi về `NEUTRAL SKIN`, **không phải xoá CSS**.
- `<html class="skin-mp">` đặt thẳng trong markup, không gán bằng JS — tránh nháy một nhịp greige lúc trang vừa dựng.
- `SKINS` + `applySkin()` dựng đúng khuôn `THEMES`/`applyTheme()` sẵn có. Mục **"Bộ da" đặt TRÊN "Giao diện"** trong popover: nó là lựa chọn thô nhất (đổi cả bảng màu + mặt chữ + khuôn header), 2 mục dưới chỉ tinh chỉnh bên trong.
- **`applySkin` reset luôn phông**: xoá `.font-override` + biến inline `--font-app` mà nút chọn phông đặt lên `<html>`, rồi set `currentFont` về phông mặc định của bộ da (editorial → Lora, neutral → Montserrat) và cập nhật dấu tích. Không làm bước này thì lựa chọn phông cũ còn ghim lại → serif trên bảng màu greige.
- Đo vòng tròn `editorial → neutral → editorial`: `--unofficial-body-background` `#ffffff` ↔ `#fbfaf7`, `--general-border` `#e0e0e0` ↔ `#e9e6df`, `--radius-2` `0px` ↔ `2px`, `--general-destructive` `#d81e05` ↔ `#a03733`, mặt chữ `Lora` ↔ `Montserrat`, vệt gradient nền tắt/bật, nền hàng nav đặc/kính — **tất cả về đúng vị trí cả 2 chiều**, dấu tích của cả 2 mục (bộ da + phông) khớp.
- **Quét tương phản 8 màn × 2 bộ da** (`plp · pdp · cart · checkout · account · login · order · privacy`, ngưỡng 3:1): **0 điểm vi phạm**. Console sạch trên tab mới.
- Bộ da **không mang qua bản mobile**: `RESP.watch` chỉ gói `[screen, lang, font, theme]`. Thêm skin vào hash cũng vô nghĩa vì `index.html` không có khối skin nào.

### Đo được hệ chữ MR PORTER qua proxy NET-A-PORTER (18/08/2026)

User gửi `mrporter.com/en-vn/` yêu cầu xem site gốc. **Site chặn cả 2 đường**: browser pane trả Akamai `Access Denied` (Reference #18.ce07f2ab…), WebFetch trả `ECONNRESET`. Lần trước cũng vậy — không đọc được trực tiếp.

**Tìm được proxy hợp lệ**: `net-a-porter.com/en-vn/` **mở được đủ** (25 stylesheet), và bundle font của nó chứa **ngay `Mrporter`, `Chronicle Display`, `SackersGothicStd`** → 2 site **dùng chung design system + chung bộ font**. Nên NAP là proxy hợp lệ cho phần **HỆ THỐNG** (cỡ · weight · tracking · cặp sans/serif); còn lựa chọn **riêng của thương hiệu** (chữ hoa hay không, mặt nào dùng ở đâu) vẫn lấy theo 5 ảnh MR PORTER khách gửi.

Đo NAP ở **cả 342px và 1440px — gần như trùng nhau**, đúng kiểu design system dùng chung:

| Đếm | size / lh | weight | case | ls | family | Vai trò |
|---:|---|---|---|---|---|---|
| **217** | **14 / 18** | 400 | none | **0.14px** | **AkkuratPro** (sans) | **thân bài** |
| 26 | **12 / 16** | 400 | **uppercase** | **1.8px** | AkkuratPro | **nhãn eyebrow** — "Shop By", "WHAT TO SHOP NOW" |
| 26 | 12 / 16 | 400 | none | 0.12px | AkkuratPro | micro body / legal |
| 18 | 14 / 18 | **700** | uppercase | 0.14px | AkkuratPro | **nav** |
| 12 | **16 / 20** | 400 | none | 0.8px | **ChronicleText** (serif) | tiêu đề editorial |
| 7 | 18 / 22 | 400 | none | normal | ChronicleText | tên thương hiệu |
| 6 | 14 / 18 | **900** | none | normal | AkkuratPro | tên thương hiệu chữ hoa |
| 6 | 12 / 18 | 500 | uppercase | **15%** | AkkuratPro | nhãn địa điểm |

**2 con số đã áp ngay** (vì dự án có sẵn ô tương ứng, không phải tự chế):

| | Số đo | Dự án trước | Nay |
|---|---|---|---|
| thân bài | 0.14px @14px = **0.01em** | không có tracking | `html.skin-mp body { letter-spacing: 0.01em }` |
| nhãn eyebrow | 1.8px @12px = **0.15em** | **2 giá trị** cho cùng vai trò: `0.12em` (nhãn popover/footer) và `0.08em` (nhãn nhóm mega) | gom cả 2 về **0.15em** |

**Thân bài 14px của họ TRÙNG mặc định dự án** → khác Mytheresa, bộ da này **không cần remap cỡ chữ nào**.

Đo lại sau khi áp (`desktop.html`, tắt transition trước khi đo): `default` body `normal` · eyebrow 1.32px · nhãn mega 1.12px → `editorial` body **0.16px** · eyebrow **1.65px** · nhãn mega **2.1px** (đúng 0.15em ở 11px và 14px) → `mytheresa` không bị ảnh hưởng (eyebrow vẫn 1.32px). Tracking rộng hơn **không gây tràn thêm**: PDP có 3 phần tử `truncate` ở cả 2 bộ da, tổng px tràn thậm chí **147 → 96**; thanh danh mục vẫn vừa khít 1409/1409; trang không tràn ngang. Console sạch trên cả 3 file.

**3 phát hiện MÂU THUẪN với bộ da hiện tại — cần user chốt**, vì NAP-proxy và ảnh MR PORTER nói khác nhau:

1. **Phạm vi mặt chữ serif.** NAP dùng `ChronicleText` cho **chỉ ~25 trong ~380 phần tử** (tiêu đề editorial + tên thương hiệu); **thân bài là `AkkuratPro` SANS**. Bộ da của ta đang phủ Lora lên **toàn bộ body**. Nhưng ảnh MR PORTER khách gửi cho thấy serif dùng **rộng** (nav, "Shopping Bag", tên sản phẩm trong giỏ) — MR PORTER chính là bản serif-forward trong 2 site. **Giữ nguyên như đang có**, chờ chốt.
2. **Weight của nav.** NAP nav là **700**; bộ da ta để **400**. Ảnh MR PORTER nhìn ra nav weight thường. Giữ 400, chờ chốt.
3. **Tên mặt chữ serif thật là `Chronicle Display` / `ChronicleText`** (Hoefler) — Lora chỉ là bản thay thế miễn phí. Trước đây mình chỉ đoán "Miller/Chronicle" khi xem ảnh; nay xác nhận được đúng tên từ bundle font.

**Đặc điểm MR PORTER CHƯA lấy — cần khách chốt:**
1. **Nhãn nhỏ CHỮ HOA + letter-spacing** (`CUSTOMER CARE`, `NEED HELP?`, `BACK IN STOCK`, `ONLY TWO LEFT`, caption ảnh teaser). Đầy trong ảnh nhưng **đụng quy ước "không dùng UPPERCASE"** của chính project — ngoại lệ duy nhất đang cho phép là nhãn nhóm mega. Không tự mở rộng.
2. **Drawer bộ lọc trượt từ MÉP TRÁI** (ảnh 3) — bản này trượt từ phải theo chốt 17/08 cho sheet chọn ưu đãi.
3. **PDP**: nút "Add to Wish List" viền dưới CTA, dòng "Premier same-day delivery", khối "VIEW MORE" + đường dẫn danh mục cuối trang.
4. **Giỏ hàng**: hộp info xanh nhạt "Local taxes may apply", ô nhập mã giảm giá + Apply nằm trong panel tóm tắt, dòng "Sending item from Italy 🇮🇹".
5. **Footer**: band newsletter xám rồi 3 cột link, và band cross-sell NET-A-PORTER cuối trang.
- **Lưu ý khi đo**: pane Browser ẩn thì trang không vẽ frame → **transition CSS đứng yên giữa đường**, `getComputedStyle` trả giá trị cũ. Phải chèn `*, *::before, *::after { transition: none !important }` trước khi đo. Riêng `*` **không khớp pseudo-element** — thiếu `*::after` là đo gạch chân nav ra `opacity: 0` dù rule đúng (đã dính đúng bẫy này).

## Vấn đề tồn đọng / cần quyết định tiếp

- ~~Ảnh sản phẩm thật từ CDN DAFC bị chặn~~ → **ĐÃ XONG cho mobile (07/08/2026)**: CDN `cdn.dafc.com.vn` truy cập được, đã tải ~80 ảnh thật về `assets/` (`pN-*.jpg`, `x*.jpg`, `b*.jpg`, `g2.jpg`) và thay toàn bộ placeholder trong `index.html`. Desktop.html cũng đã dùng bộ ảnh thật này từ 10/08/2026.
- **`--unofficial-accent`**: mode D = cam `#ff6600`, mode GM = đen `#0a0a0a` — chưa dùng ở đâu, chưa quyết định giữ/đổi.
- **Luồng hết hàng 2 tầng** (size tạm hết / nhận thông báo khi có hàng): PDP dùng chip (pdp, pdp4) xử lý ngay trên chip; PDP dùng dropdown (pdp2/pdp3/pdp5/pdp6) xử lý trong picker "Chọn size" — hàng hết gạch ngang + nhãn "Nhận thông báo", CTA đổi thành "Nhận thông báo khi có hàng". Áp dụng cho **cả 2 bản**.
- **PDP v1 (pdp) — layout Pre-order**: ~~ngày giao hàng "15/08/2026" đang hardcode~~ → **ĐÃ XONG (14/08/2026)**: ngày dời về data `PRODUCTS[0].preorder` (hiện 30/09/2026), xem section "Pre-order". Câu hỏi còn treo với khách: chính sách đặt cọc (BRIEF-GAP câu 10) và cách thể hiện ở checkout (`PREORDER.md`). ~~"Chỉ còn 01 sản phẩm" vẫn hiện dù đã là pre-order~~ → **ĐÃ CHỐT (07/08, chỉ đạo của user)**: dòng `#lowStock` mặc định ẨN, chỉ hiện khi bấm đúng size sắp hết hàng (tra `SIZE_LOW_STOCK`, hiện chỉ có size 42) — áp cho cả `pdp` lẫn `pdp4`; bấm size thường/hết hàng thì ẩn lại. Cùng nguồn dữ liệu với dòng "Còn 1 sản phẩm" trong size picker nên 2 nơi không lệch nhau được. Desktop chưa áp hành vi này (xem "Chờ port sang desktop").
- **Account**: 9 màn theo Figma gốc (Info/Info-Error/Address/Address-Empty/Orders/Orders-Empty/Loyalty/Points/Points-Empty) đã gộp thành 1 trang 6-tab — chưa có trạng thái Empty/Error riêng.
- **Màn "Hoàn tất đăng ký" (`reginfo`)**: chưa có frame Figma riêng — đang tự dựng theo style 2 màn đăng ký mới. Lưu ý frame thiết kế màn "Tạo tài khoản" (chỉ SĐT) trong Figma mang tên `Account-Mobile-03b-ForgotPassword-Alt` (3107:50758, có vẻ đặt nhầm tên khi copy); frame `Account-Mobile-02-Register` (2379:21218) vẫn là bản form dài cũ.

## Nguồn thiết kế

Figma file "Test MCP - nam v2", fileKey `sOCu52RuG8ktjHYt4UiME5`, đọc qua figma-console MCP.
