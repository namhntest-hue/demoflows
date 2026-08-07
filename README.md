# Demo — E-commerce Flow (Mobile + Desktop) · DAFC / Versace · HTML + Tailwind

Demo e-commerce flow cho **DAFC** (nhà phân phối đa thương hiệu luxury tại Việt Nam), dựng bằng HTML + Tailwind CSS thuần, không dùng framework. Nội dung sản phẩm là **dữ liệu thật** scrape từ `shop.dafc.com.vn` (re-scrape 07/08/2026): 16 SP thời trang Versace + 8 nước hoa (Versace/D&G/Montblanc/Moschino), kèm **ảnh thật tải từ `cdn.dafc.com.vn`** (1200×1484, đặt tên `pN-*.jpg` / `x*.jpg` / `b*.jpg` trong `assets/` — chỉ bản mobile dùng; desktop vẫn dùng bộ `p*.png` cũ). Giá giảm/badge -% là dữ liệu tự tạo để demo.

Hai phiên bản độc lập, dùng chung assets/tokens/tailwind.css:
- `index.html` — bản **mobile** (viewport 360–412px)
- `desktop.html` — bản **desktop** 1440px (xem mục "Bản desktop" bên dưới)

## Chạy

Mở `index.html` (mobile) hoặc `desktop.html` (desktop) bằng trình duyệt là xong — không cần build, không cần internet (Tailwind đã biên dịch sẵn vào `tailwind.css`).

> Nếu mở bằng `file://` mà ảnh không hiện, chạy server tĩnh:
> ```bash
> python3 -m http.server 8000    # rồi mở http://localhost:8000
> ```

## Cấu trúc

```
demo-flow/
├── index.html          — bản MOBILE (router, state, tất cả screens)
├── desktop.html         — bản DESKTOP 1440px (fork từ index.html, giữ nguyên state/router/i18n)
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
- i18n VI/EN thật: từ điển 2 chiều + regex cho chuỗi có số, áp dụng qua `applyLang()`, gọi lại mỗi khi render màn mới.
- Settings FAB (góc phải dưới): đổi ngôn ngữ + đổi font (Montserrat/Inter/Plus Jakarta Sans).

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
| Trả góp / trả trước | **Không có ở cấp sản phẩm.** Không PDP nào hiện dòng "Trả trước từ …/tháng". |
| Nhãn bảng size | **"Bảng kích thước"** — không dùng "Size guide", "Bảng size →" hay "Hướng dẫn chọn size". |

Chọn size dạng chip hiện có ở `pdp` (5 cột) và `pdp4` (**còn 4 cột**); `pdp2`/`pdp3`/`pdp5`/`pdp6` dùng dropdown nên không có grid.

> Đã sửa để đạt quy ước: `pdp4` trước đây info tab bấm ra **bottom sheet** (`.sheet-trigger` + `window.__pdp4Tabs`) → đổi sang accordion, bỏ luôn handler và cầu nối `window.__pdp4Tabs` vì không còn ai đọc. Bỏ **5** dòng "Trả trước từ" ở `pdp2`…`pdp6` kèm logic `payOffer` trong `wire()` (vốn để ẩn/hiện dòng đó khi hết hàng). Thống nhất **8** nhãn size guide, `data-toast`, và tiêu đề sheet trong size picker. `pdp5`/`pdp6` dùng vách accordion `border-border` đậm hơn 4 bản kia → về `border-border-1`.
>
> Dọn kèm 5 entry i18n đã chết: `Trả trước từ` · `/tháng` · `Xem chính sách trả góp` · `Bảng size →` · `Hướng dẫn chọn size`.
>
> **Vẫn giữ** trả góp ở 3 chỗ KHÔNG thuộc cấp sản phẩm: mục "Thanh toán linh hoạt" trong `camKetSection`, link "Chính sách trả góp" ở footer (data thật của site), và phương thức "Thanh toán trả góp 0% qua thẻ tín dụng" ở checkout.

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

Layout: `[tab pill cuộn ngang + nút mũi tên] → [tiêu đề 24 SemiBold + mốc cập nhật 12] → [mục lục viền trên/dưới, 12] → [các section gap 32: heading 16/24 Medium + body 14/20 Light]`.

> Chữ nội dung **cố ý hạ 1 bậc so với Figma** cho trang dài dễ đọc: heading section 18 → **16**, body 16 → **14** (leading đi kèm 25→24 và 24→20, đều là cặp size/leading có sẵn trong project). Tiêu đề trang vẫn 24; mốc cập nhật và mục lục vẫn 12 vì đã ở đáy thang chữ. Mục lục bấm được → `scrollIntoView` tới section (`scroll-mt-[64px]` trừ sẵn navbar 48px). Dòng bullet dùng `pl-4 -indent-4` để thụt treo. Không có `cam-ket-section` (Figma 3 frame này chỉ có Nav + Main + Footer).

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

> **Bug đã sửa ở tầng 3**: trước đây cấp sâu nhất dùng **1 cột `w-9` (36px)** với đường ở giữa → rail của cấp trên biến mất (cây bị đứt, đường lạc ra giữa dòng) và thụt sai **40px** thay vì 48px. Nay 2 cấp con dùng chung helper `fsubRow(label, depth)` + `frail(depth)` nên không lệch nhau được nữa. `desktop.html` **vẫn còn lỗi này** (1 chỗ `w-9`).

Icon `091-warning` trong `Checkbox Group` của Figma đang `visible: false` → không render. Checkbox dùng `rounded-xs` (Figma r=2).

## Mobile web thật

Không có khung điện thoại, không giới hạn chiều cao — trang cuộn bằng **body**.

- `<meta viewport ... viewport-fit=cover>` + `env(safe-area-inset-bottom)` cho máy có tai thỏ / thanh gesture
- Header `sticky top-0`, thanh Bộ lọc `sticky top-[48px]`
- Sticky CTA dùng `position: fixed` theo viewport
- Đã kiểm tra không tràn ngang ở 360 / 375 / 393 / 412 px

## Bản desktop (`desktop.html`)

Fork từ `index.html`, **giữ nguyên toàn bộ** data / router SPA / i18n VI-EN / settings FAB / luồng auth-OTP; chỉ viết lại layout theo các frame desktop 1440px trong Figma:

- **Header 3 tầng** (Figma `2171:13006`): promo bar (tái dùng slider `PROMO_MESSAGES`) + main nav (dept trái · logo giữa · đổi ngôn ngữ/cửa hàng/tài khoản/giỏ phải) + subheader (category nav + ô tìm kiếm 270px). Sticky `top-[-32px]` — promo bar cuộn trôi, 112px còn lại dính.
- **Mega menu** hover thuần CSS (`.dk-nav-item:hover`), cột Nam/Nữ sinh từ `MENU_DATA`, cột brands từ `MENU_BRANDS`; click điều hướng PLP chế độ danh mục qua `data-plp-title/-crumbs`.
- **Search**: dropdown dưới ô tìm kiếm header (gợi ý + lịch sử + từ khóa phổ biến) → Enter/click ra trang kết quả (PLP search mode). Màn `search` cũ vẫn giữ (cột giữa 720px).
- **PLP** (`PLP-Desktop-02-ByBrand` 2474:107065): breadcrumb, brand hero 2 cột (logo 149px + mô tả + strip danh mục 150px + ảnh hero 575×320), filter bar 80px (Bộ lọc outline 48 + chip ghost + density 4/3 cột + Sắp xếp), grid 4 cột `gap-x-1` row 16px, "Xem thêm".
- **PDP** (`PDP-Desktop-01-Default` 2190:14530): 1 layout dùng chung cho cả 6 route `pdp..pdp6` (data từng SP gom vào `PDP_DATA`) — gallery 2 cột (cell 469:579, zoom lightbox) + info panel 451px sticky (giá/swatch 44px/chọn size/CTA/box ưu đãi/accordion ±) + 3 carousel 5 card.
  - Chọn size giữ đúng 2 biến thể như bản mobile, bật/tắt bằng cờ `dropdown` trong `PDP_DATA`: **chip grid** cho `pdp`/`pdp4`, **dropdown** (Select & Combobox `3111:33591`) cho `pdp2`/`pdp3`/`pdp5`/`pdp6` → mở picker "Chọn size".
- **Cart** (`multi-gift-4-desktop` 2775:61994): 2 cột — trái list item (thumb 120×133, stepper, xoá) + quà tặng (khi đăng nhập) + CTKM peek; phải "Tóm tắt đơn hàng" sticky (DAFC Rewards, mã giảm giá, phiếu mua hàng, tổng, Đặt hàng).
- **Checkout**: 2 cột theo note Figma `2084:165` — form 3 section tự đóng/mở bên trái, summary sticky + CTA bên phải; header rút gọn (logo + "Thanh toán an toàn & bảo mật").
- **Auth**: card 440px giữa trang trên nền xám (đủ 6 view login/register/otp/reginfo/setpass/forgot). **Account**: sidebar 280px + nội dung 720px. **Order**: card 860px với timeline. **Done**: xác nhận giữa trang + cross-sell 5 card.
- **Bottom sheet mobile → dialog desktop**: quick-add / xác nhận thêm giỏ / chọn size / nhận thông báo / info sheet thành modal giữa màn hình (class `.dk-modal`, tái dùng nguyên JS mở/đóng); riêng Bộ lọc thành drawer trượt phải 420px.
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

(Code dùng thêm 11 / 13 / 15 cho vài chỗ chữ phụ dày đặc — có sẵn từ trước, chưa rà.)

**Không dùng 20px và 22px** — không có trong thang. Tiêu đề cấp section (h2 trong trang: "Giỏ hàng", "Thanh toán", "Bộ lọc", tên brand ở PDP, tiêu đề bottom sheet) dùng **18px**; tiêu đề trang full-screen (auth) dùng **24px Light**. Riêng heading section trong 3 trang chính sách dùng **16px** — xem mục "Trang tĩnh / chính sách".

**18px LUÔN đi với `font-medium`** — cả 23 chỗ dùng `text-[18px]` trong `index.html` đều Medium (500), không có 18px Light / Regular. Đây là **quyết định của design, cố ý khác Figma** (Figma để 18 Regular ở tiêu đề giỏ hàng và heading newsletter footer) — đừng "sửa lại theo Figma". Thêm chỗ 18px mới thì nhớ kèm `font-medium`.

> Ngoại lệ còn lại: "Đặt hàng thành công" ở màn `done` vẫn 22px — Figma `2084:166` chưa có nội dung màn này nên chưa có số để bám.

### Quy ước border

**Giữa các block KHÔNG kẻ border** — khoảng trắng (padding/gap) là thứ ngăn cách, đúng theo Figma (`2851:28697` cart, `2084:170` account, `2084:164` checkout, `2084:166` done đều không có stroke ngang giữa các section).

**Navbar KHÔNG có viền dưới** — áp cho *mọi* màn mobile. Nav chính (`navBar()`) tách khỏi nội dung bằng nền `glass-95` + `backdrop-blur`; 3 nav phụ (Tài khoản / Chi tiết đơn hàng / `authNav`) và nav màn Search cũng để trần. Đây là **quyết định của design, cố ý khác Figma** (`Nav` 2136:13304 có stroke-bottom 1) — đừng "sửa lại theo Figma".

> Kéo theo: đã bỏ `.navbar::after`, rule `.navbar.merged::after` và khối JS toggle class `.merged` (trước dùng để giấu viền nav khi filter bar dính sát đáy nav — nay vô nghĩa). Class `navbar` giữ lại làm mốc ngữ nghĩa. Riêng `.filterbar::after` (viền dưới thanh Bộ lọc ở PLP) **vẫn giữ** — đó là thanh filter, không phải navbar.

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

Hai bản **tách rời có chủ ý** — không tự động đồng bộ. Mặc định mọi thay đổi chỉ áp vào `index.html`; `desktop.html` chỉ cập nhật khi được yêu cầu rõ ràng ("làm bản desktop"). Nghĩa là hai file sẽ lệch nhau dần, và đó là bình thường.

Vì 62 hàm + toàn bộ hằng dữ liệu (`PRODUCTS`, `CART`, `I18N`…) vẫn trùng nhau giữa hai file, mỗi thay đổi ở mobile cần ghi lại bên dưới để lần port sang desktop không bỏ sót.

### Chờ port sang desktop

- **"Chỉ còn 01 sản phẩm" theo size** (chỉ mới làm ở mobile, 07/08/2026): `#lowStock` ở `pdp`/`pdp4` mặc định ẩn, chỉ hiện khi chọn size nằm trong `SIZE_LOW_STOCK` (setCta nhận thêm tham số `size`). Desktop nếu có dòng tương tự trong `PDP_DATA` layout thì cần áp cùng rule.
- **Đồng bộ copy toàn app** (chỉ mới làm ở mobile, 07/08/2026 — đợt "sync đoạn thoại"). Desktop vẫn còn nguyên các lệch đã sửa bên mobile: đổi trả chỗ 7 chỗ 14 ngày (mobile đã chốt **7 ngày** theo trang chính sách + site thật); mã voucher chỉ nhận JUNE trong khi copy quảng cáo JUL (mobile: map nhận **cả JUL500/1000/1500 lẫn JUNE**, copy chỉ đường về ô "Mã giảm giá" ở giỏ hàng); TUMI còn trong promo; ngày khuyến mãi quá hạn (mobile: WARDROBE [01/08-31/08], BUY MORE [28/07-24/08]); ORDERS ngày 2025 + steps lệch badge + mã vận đơn GHN (mobile: 2026, steps 3, **TKN**284917 khớp TIKINOW); typo checkout "Thay doi/Giao hang nhanh/Chuyển khoảng"; nhãn tóm tắt vận chuyển "Chuyển phát nhanh" (mobile: khớp đúng option "Giao hàng thông thường"/"Giao hàng nhanh", ORDERS cũng đổi "tiêu chuẩn"→"thông thường"); tổng tiền 21,250,000đ không khớp 4 item (mobile: **113,500,000đ** = tổng thật, `CART_SUBTOTAL` đổi theo, checkout/done cùng số); "98 điểm" (mobile: **1.135 điểm**, `REWARD_POINTS` 1000→**1240** khớp ví điểm, lịch sử điểm ngày khớp ORDERS); menu "Áo quần/Túi sách/Giày sneaker/Váy" (mobile: "Quần áo/Túi xách/Giày thể thao/Chân váy" thống nhất với filter); casing "Chính sách Bảo mật"→"bảo mật"; dọn ~12 key i18n chết/trùng value gây hỏng vòng VI→EN→VI ('Mức giảm'→'Discount amount', 'Bảo quản sản phẩm'→'Care instructions', 'Ưu đãi'→'Offer', 'Phí vận chuyển'→'Shipping fee', 'Phương thức vận chuyển'→'Shipping method', 'Xuất xứ'→'Origin', 'Chọn size'→'Choose size', 'Đăng ký nhận thông báo'→'Get notified'...).
- **Data + ảnh thật từ shop.dafc.com.vn** (chỉ mới làm ở mobile, 07/08/2026). Desktop vẫn dùng: bộ ảnh placeholder `p*.png` cũ (nhiều file trùng nhau), 8 SP beauty tự bịa, tên thắt lưng cũ "Thắt lưng da mặt khóa Medusa", GIFTS Balenciaga cũ, và chưa có 6 SP bổ sung `x*.jpg`. Khi port: copy khối `PRODUCTS` / `PRODUCT_GALLERY` / `CART` / `GIFTS` / items trong `ORDERS` + ~20 entry tên SP mới trong `I18N` từ index.html; lưu ý desktop gộp PDP vào `PDP_DATA` nên phần gallery/swatch cần map lại theo quy ước "slide = full gallery, swatch = slice theo colors".
- **Input 14px + chặn zoom iOS** (chỉ mới làm ở mobile). Gồm 3 phần:
  1. Thẻ `<meta name="viewport">` thêm `maximum-scale=1`.
  2. Rule CSS `input, textarea, select { font-size: 14px; }` trong `<style>` (đặt sau `tailwind.css`). **Phải giữ selector thuần element** — thêm `:not(...)` sẽ nâng specificity lên 0,2,1 và đè luôn các utility `text-[…]` cố ý (ô OTP 18px bị co còn 14px).
  3. Đổi `text-[16px]` → `text-[14px]` ở 12 thẻ `<input>` (bỏ qua ô OTP và checkbox). Desktop hiện còn 64 chỗ `text-[16px]` nhưng phần lớn là nút/nhãn — chỉ đổi bên trong thẻ `<input>`.
  - Cân nhắc khi port: desktop không có vấn đề zoom của iOS, nên `maximum-scale=1` là không cần thiết; có thể chỉ áp phần cỡ chữ 14px nếu muốn thống nhất thị giác.
- **Type scale bỏ cỡ 20px + 18px thành Medium** (chỉ mới làm ở mobile). Toàn bộ 21 chỗ `text-[20px]` → `text-[18px]`; riêng h2 "Giỏ hàng" 22px → 18px theo Figma `2851:28697`. Sau đó **mọi chỗ 18px đều thêm `font-medium`** (15 chỗ đổi: 12 chỗ chưa có class weight, `font-light` ở h2 giỏ hàng, `font-normal` ở "Thanh toán (4)" + "Bộ lọc"; 9 chỗ đã Medium từ trước). `leading-*` và các `h-7` đi kèm giữ nguyên để không đổi chiều cao dòng/khối. Desktop hiện còn 8 chỗ `text-[20px]` chưa đổi và chưa áp quy ước Medium — xem mục "Thang chữ" bên dưới.
- **Bỏ border ngăn giữa các block** (chỉ mới làm ở mobile) — 15 chỗ, xem mục "Quy ước border" bên dưới.
- **Navbar bỏ viền dưới** (chỉ mới làm ở mobile) — 3 nav phụ bỏ `border-b`, bỏ `.navbar::after` + `.navbar.merged::after` + khối JS toggle `.merged`. Desktop hiện còn 28 chỗ `border-t/b/y` chưa rà.
- **Footer: dữ liệu thật từ shop.dafc.com.vn** (chỉ mới làm ở mobile). Hằng `FOOTER_LINKS` (3 nhóm / 17 link) thay cho placeholder "Hotline · Email · Giờ làm việc" lặp lại ở cả 3 accordion. Kèm sửa dữ liệu sai: đối tác vận chuyển GHN → **TIKINOW**, "Đã đăng ký" → **"Đã thông báo"** Bộ Công Thương, GPKD 0302519839 (số sai) → **GPĐKKD 0304130177 do Sở KH & ĐT Tp.HCM cấp lần đầu 22/11/2005**, heading "Kết nối với chúng tôi" → **"Theo dõi chúng tôi"**, "Phương thức thanh toán" → **"Chấp nhận thanh toán"**, social YouTube → **Zalo** (thêm icon `I.zalo`).
- **Quick add thu gọn** (chỉ mới làm ở mobile) — bo góc 8, bỏ handle, ✕ 24px, gallery `p-2`, bỏ link bảng kích thước, "Xem chi tiết" 24px gạch chân. Xem mục "Quick add to cart".
- **Đồng bộ 6 bản PDP** (chỉ mới làm ở mobile) — info tab về accordion (bỏ bottom sheet ở `pdp4`), bỏ hết dòng trả trước/trả góp cấp sản phẩm, nhãn "Bảng kích thước". Xem mục "Quy ước đồng bộ giữa 6 bản PDP". Desktop chưa rà 3 điểm này.
- **Mô tả sản phẩm: data thật từ DAFC** (chỉ mới làm ở mobile) — hằng `PRODUCT_INFO`, 6 PDP đọc `desc`/`care` từ đó, bỏ 10 entry i18n của text tự viết đã không còn render. Desktop vẫn đang dùng text tự viết (gồm cả 2 chỗ tả sai thành túi A.P.C.). Xem mục "Mô tả sản phẩm — data thật từ DAFC".
- **PDP + PDP2: khối KHUYẾN MÃI + bottom sheet chi tiết** (chỉ mới làm ở mobile). Style card theo Figma `Product Info` 2275:505057: `bg-accent-0 rounded-sm p-2 gap-2`, tiêu đề "KHUYẾN MÃI" 14 Medium in hoa, dòng chương trình 12 Medium. Catalogue `PROMOS` (4 chương trình, mỗi cái có `line` tóm tắt + `title` + `rows` 4 cặp nhãn/giá trị cho sheet) khai **một lần** ở module scope, `PDP_PROMOS` quyết định mỗi PDP hiện chương trình nào — `pdp` và `pdp2` dùng chung 2 chương trình nên tách nội dung ra là sớm muộn lệch. Hai layout:
  - `promoCardGrouped()` — **pdp2**: 1 card gộp, các dòng gạch chân, bấm cả dòng.
  - `promoCardsSplit()` — **pdp**: 4 chương trình, mỗi cái 1 card riêng **extend tại chỗ**. Tiêu đề "KHUYẾN MÃI" đặt **ngoài** các khung nền xám, dùng chung cho cả nhóm. Cuối dòng là **icon + / −** (không có link "Xem chi tiết", không mở bottom sheet). Dùng lại nguyên cơ chế `.acc`/`.acc-trigger`/`.acc-body` của app — CSS `.acc.open .acc-ico-plus/-minus` tự đảo icon nên không cần JS riêng, và vì các card là `.acc` anh em cùng cha nên handler sẵn có tự đóng card khác khi mở một card.
  - Nội dung khi extend: ưu tiên `body` (mảng dòng, dùng cho `voucher` — "Nhập mã" + 3 dòng mã JUL), không có `body` thì đổ `rows` thành cặp nhãn/giá trị.
  - Tiêu đề card dùng dạng IN HOA ở cả 2 layout vì `'Khuyến mãi'` (sentence case) đã là key i18n của mục menu Sale → `'Sale'`; khai lại là đổi luôn bản dịch của menu.
  - Bỏ chương trình TUMI vì sai thương hiệu trên trang Versace — **07/08 đã gỡ sạch TUMI khỏi TOÀN BỘ bản mobile** (pdp3/4/5/6 + cart, kèm dọn key i18n); chỉ giữ tên TUMI trong các câu "Không áp dụng cho..." (điều khoản loại trừ) và danh sách brand menu/filter (DAFC có phân phối TUMI thật).
  - Kèm sửa `#infoSheet`: `#isBody` từ `<p>` → `<div>` và `__openInfoSheet(title, body, asHTML)` thêm tham số thứ 3. Cần vì nội dung sheet có block bên trong — `<p>` chứa `<div>` là HTML không hợp lệ, trình duyệt tự đóng thẻ và làm vỡ layout. Gọi 2 tham số như cũ vẫn dùng `textContent`, không đổi hành vi. `openS` cũng gọi thêm `localizeNew` vì sheet render sau `applyLang` của màn.
- **Bộ lọc: sửa rail tầng 3 + checkbox bo góc** (chỉ mới làm ở mobile) — thêm `frail()` / `fsubRow()`, cấp sâu nhất từ 1 cột `w-9` → 2 cột `w-5`, `fchk()` thêm `rounded-xs`. `desktop.html` còn đúng 1 chỗ `w-9` cần sửa y hệt (dòng ~2561) và checkbox filter cũng chưa bo góc.
- **3 trang chính sách + link footer** (chỉ mới làm ở mobile) — `POLICY_TABS` / `POLICY_UPDATED` / `POLICY_DATA` / `screenPOLICY()` / `FOOTER_ROUTES`, 3 route mới trong `RENDER` + `FLOW` + `LABELS`, handler `[data-policy-toc]` + `#policyMore` trong `wire()`, rule CSS `#policyMore svg` trong `<style>`. Desktop chưa có route nào trong số này nên link footer bên đó vẫn chưa bấm được.
  - **Desktop cần sửa 3 chuỗi** trong `FOOTER_COLS` cho khớp site thật: `Chính sách bán hàng` → `Chính sách bảo hành`; `Quy trình bảo hành và xử lý khiếu nại` → `Quy trình tiếp nhận và xử lý khiếu nại`; `Thu Thập và Xử Lý` → `Thu Thập Và Xử Lý`. Desktop cũng còn GHN / "Đã đăng ký" / GPKD cũ nếu có.

## Vấn đề tồn đọng / cần quyết định tiếp

- ~~Ảnh sản phẩm thật từ CDN DAFC bị chặn~~ → **ĐÃ XONG cho mobile (07/08/2026)**: CDN `cdn.dafc.com.vn` truy cập được, đã tải ~80 ảnh thật về `assets/` (`pN-*.jpg`, `x*.jpg`, `b*.jpg`, `g2.jpg`) và thay toàn bộ placeholder trong `index.html`. Desktop.html vẫn dùng placeholder cũ (xem "Chờ port sang desktop").
- **`--unofficial-accent`**: mode D = cam `#ff6600`, mode GM = đen `#0a0a0a` — chưa dùng ở đâu, chưa quyết định giữ/đổi.
- **Luồng hết hàng 2 tầng** (size tạm hết / nhận thông báo khi có hàng): PDP dùng chip (pdp, pdp4) xử lý ngay trên chip; PDP dùng dropdown (pdp2/pdp3/pdp5/pdp6) xử lý trong picker "Chọn size" — hàng hết gạch ngang + nhãn "Nhận thông báo", CTA đổi thành "Nhận thông báo khi có hàng". Áp dụng cho **cả 2 bản**.
- **PDP v1 (pdp) — layout Pre-order**: ngày giao hàng "15/08/2026" đang hardcode. ~~"Chỉ còn 01 sản phẩm" vẫn hiện dù đã là pre-order~~ → **ĐÃ CHỐT (07/08, chỉ đạo của user)**: dòng `#lowStock` mặc định ẨN, chỉ hiện khi bấm đúng size sắp hết hàng (tra `SIZE_LOW_STOCK`, hiện chỉ có size 42) — áp cho cả `pdp` lẫn `pdp4`; bấm size thường/hết hàng thì ẩn lại. Cùng nguồn dữ liệu với dòng "Còn 1 sản phẩm" trong size picker nên 2 nơi không lệch nhau được. Desktop chưa áp hành vi này (xem "Chờ port sang desktop").
- **Account**: 9 màn theo Figma gốc (Info/Info-Error/Address/Address-Empty/Orders/Orders-Empty/Loyalty/Points/Points-Empty) đã gộp thành 1 trang 6-tab — chưa có trạng thái Empty/Error riêng.
- **Màn "Hoàn tất đăng ký" (`reginfo`)**: chưa có frame Figma riêng — đang tự dựng theo style 2 màn đăng ký mới. Lưu ý frame thiết kế màn "Tạo tài khoản" (chỉ SĐT) trong Figma mang tên `Account-Mobile-03b-ForgotPassword-Alt` (3107:50758, có vẻ đặt nhầm tên khi copy); frame `Account-Mobile-02-Register` (2379:21218) vẫn là bản form dài cũ.

## Nguồn thiết kế

Figma file "Test MCP - nam v2", fileKey `sOCu52RuG8ktjHYt4UiME5`, đọc qua figma-console MCP.
