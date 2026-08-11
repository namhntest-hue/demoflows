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
- Các dòng giảm giá `#d62845` (JUNE900, voucher, dùng điểm) có trong bản vẽ nhưng demo chưa có tính năng mã giảm giá.

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
  - **Hiệu ứng hover kiểu Farfetch (10/08/2026)**: **KHÔNG gạch chân** (đối chứng cả Farfetch lẫn component Button trong Figma — không state nào có underline). Hover theo đúng 2 biến thể Button: hàng giới tính + nút tiện ích là **Ghost** → "nhún" nền đen 5% (`.ghost-hover`, Button/Ghost/Hover: fill #000 5% + label #0a0a0a, r2); danh mục subheader là **Ghost Muted** → chỉ đậm chữ #404040→#0a0a0a, không nền. Panel + **scrim tối `rgba(0,0,0,.45)`** phủ phần trang bên dưới mở sau **120ms** (hover-intent — lướt ngang thanh menu không nháy panel). Scrim là `div.dk-scrim` fixed `z:-1` NẰM TRONG `.navbar` (stacking context z-50) nên đè lên nội dung trang nhưng dưới 3 tầng header + panel; bật bằng `.navbar:has(.dk-nav-item:hover > .dk-mega)` — mục không có panel (Pre-loved, Khuyến mãi) không làm tối trang. Độ tối .45 cùng tông mọi backdrop khác của app.
- **Layer tìm kiếm** (`#dkSearchLayer`, 11/08/2026 — thay dropdown 420px neo dưới ô nhập): bấm nút Tìm kiếm ở subheader → tấm trắng đổ từ mép trên xuống + nền tối `rgba(0,0,0,.45)` phía dưới, cùng ý đồ với bản mobile (ở đó tìm kiếm là **màn riêng** `screenSearch` phủ kín).
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
  - **Filter bar 80px** (`2903:45194`): `Bộ lọc (n)` outline 48/24 · chip ghost 48/24 (chip trùng danh mục đang xem = State Active, chữ `#0a0a0a`) · density 4/3 cột — icon 20px, nút không chọn `opacity-50` · nhãn nút sắp xếp = **giá trị đang chọn** (mặc định `relevance` vẫn hiện "Sắp xếp").
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
  - Quà tặng: style card mobile (viền rounded-xs p-3, title 14 + phụ đề 12, "Thay đổi" gạch chân, option thumb 52×60 + cột giá gạch ngang/0đ/01) — chỉ khác là 2 option nằm ngang vì cột trái đủ rộng.
  - Summary: "Mã giảm giá" 14 Medium, bỏ 2 divider quanh khối tổng, "Tổng cộng" 16 Medium, dòng điểm thưởng 14/20; **"Bạn có phiếu mua hàng?" chuyển xuống DƯỚI nút Đặt hàng** (Figma 3428:55499: là phương thức mua hàng, không phải ưu đãi).
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

- **13 chỉnh theo Figma `3547:55856`** (xem "Đối chiếu checkout với Figma") mới áp cho mobile. Desktop còn: vòng radio 2px đổi đen khi chọn, `.opt.on` tô nền `#fafafa`, checkbox viền `#e5e5e5`, ô nhập padding 12, nhóm field gap 8, link "Thay đổi" 16px Light, tiêu đề màn 18/28, thiếu kẻ ngăn `#f5f5f5` + bước chờ cao 72.
- **Lệch NGƯỢC — bộ lọc PLP**: desktop lọc thật (`plpFilters` + chip đang áp dụng), **mobile vẫn chỉ toast**.

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
  (3 trang + mục lục dính) + nội dung 860px, không có dropdown `#policyMore` vì ở
  1440 cả 3 tab nằm thoải mái trong sidebar. Link cookie bar cũng mở trang thật.
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

## Vấn đề tồn đọng / cần quyết định tiếp

- ~~Ảnh sản phẩm thật từ CDN DAFC bị chặn~~ → **ĐÃ XONG cho mobile (07/08/2026)**: CDN `cdn.dafc.com.vn` truy cập được, đã tải ~80 ảnh thật về `assets/` (`pN-*.jpg`, `x*.jpg`, `b*.jpg`, `g2.jpg`) và thay toàn bộ placeholder trong `index.html`. Desktop.html cũng đã dùng bộ ảnh thật này từ 10/08/2026.
- **`--unofficial-accent`**: mode D = cam `#ff6600`, mode GM = đen `#0a0a0a` — chưa dùng ở đâu, chưa quyết định giữ/đổi.
- **Luồng hết hàng 2 tầng** (size tạm hết / nhận thông báo khi có hàng): PDP dùng chip (pdp, pdp4) xử lý ngay trên chip; PDP dùng dropdown (pdp2/pdp3/pdp5/pdp6) xử lý trong picker "Chọn size" — hàng hết gạch ngang + nhãn "Nhận thông báo", CTA đổi thành "Nhận thông báo khi có hàng". Áp dụng cho **cả 2 bản**.
- **PDP v1 (pdp) — layout Pre-order**: ngày giao hàng "15/08/2026" đang hardcode. ~~"Chỉ còn 01 sản phẩm" vẫn hiện dù đã là pre-order~~ → **ĐÃ CHỐT (07/08, chỉ đạo của user)**: dòng `#lowStock` mặc định ẨN, chỉ hiện khi bấm đúng size sắp hết hàng (tra `SIZE_LOW_STOCK`, hiện chỉ có size 42) — áp cho cả `pdp` lẫn `pdp4`; bấm size thường/hết hàng thì ẩn lại. Cùng nguồn dữ liệu với dòng "Còn 1 sản phẩm" trong size picker nên 2 nơi không lệch nhau được. Desktop chưa áp hành vi này (xem "Chờ port sang desktop").
- **Account**: 9 màn theo Figma gốc (Info/Info-Error/Address/Address-Empty/Orders/Orders-Empty/Loyalty/Points/Points-Empty) đã gộp thành 1 trang 6-tab — chưa có trạng thái Empty/Error riêng.
- **Màn "Hoàn tất đăng ký" (`reginfo`)**: chưa có frame Figma riêng — đang tự dựng theo style 2 màn đăng ký mới. Lưu ý frame thiết kế màn "Tạo tài khoản" (chỉ SĐT) trong Figma mang tên `Account-Mobile-03b-ForgotPassword-Alt` (3107:50758, có vẻ đặt nhầm tên khi copy); frame `Account-Mobile-02-Register` (2379:21218) vẫn là bản form dài cũ.

## Nguồn thiết kế

Figma file "Test MCP - nam v2", fileKey `sOCu52RuG8ktjHYt4UiME5`, đọc qua figma-console MCP.
