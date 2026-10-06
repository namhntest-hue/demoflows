# Demo — E-commerce Flow (Mobile + Desktop) · DAFC / Versace · HTML + Tailwind

Demo e-commerce flow cho **DAFC** (nhà phân phối đa thương hiệu luxury tại Việt Nam), dựng bằng HTML + Tailwind CSS thuần, không dùng framework. Nội dung sản phẩm là **dữ liệu thật** scrape từ `shop.dafc.com.vn` (re-scrape 07/08/2026): 16 SP thời trang Versace + 8 nước hoa (Versace/D&G/Montblanc/Moschino), kèm **ảnh thật tải từ `cdn.dafc.com.vn`** (1200×1484, đặt tên `pN-*.jpg` / `x*.jpg` / `b*.jpg` trong `assets/` — chỉ bản mobile dùng; desktop vẫn dùng bộ `p*.png` cũ). Giá giảm/badge -% là dữ liệu tự tạo để demo.

> **Rule stack 25/08/2026 — không dùng Tailwind CSS và shadcn/ui nữa.** Mô tả "HTML + Tailwind"
> ở trên là **hiện trạng của 2 demo cũ** (`index.html` / `desktop.html`), không phải hướng đi tiếp.
> Việc mới viết **CSS ngữ nghĩa + biến token** (khuôn mẫu: `home.html`). Luật thiết kế trong
> `STYLE-RULES.md` không đổi — xem **Phần 8** của file đó để biết cái gì bị bỏ, cái gì giữ.

Hai phiên bản dùng chung assets/tokens/tailwind.css, **nối với nhau ở mốc 768px** (xem "Cầu nối responsive"):
- `index.html` — bản **mobile**, dùng khi bề ngang **< 768px** (thiết kế theo 360–412px)
- `desktop.html` — bản **desktop**, dùng khi bề ngang **≥ 768px**, nội dung bó trong max-w 1440 (xem mục "Bản desktop")

## Bản đồ thư mục

| Ở gốc | |
|---|---|
| `index.html` · `desktop.html` | 2 bản demo chính |
| `desktop-neutral` · `desktop-editorial` · `desktop-atelier`.html | 3 bản fork bộ da (đóng băng từ 21/08/2026) |
| `main.html` | Trang cổng 3 ngành hàng |
| `home.html` | Trang chủ dựng bằng CSS ngữ nghĩa — **tư liệu hướng đã thử**, không phải bản đang chạy |
| `assets/` · `tokens.css` · `tokens07.json` · `gen_tokens.py` · `tailwind.css` · `in.css` · `tailwind.config.js` · `shadcn-theme/` | Ảnh, token, CSS build — **đang chạy, đừng xoá** |

| Thư mục ghi chú | |
|---|---|
| `_notes/` — **chỉ có trên máy, không đẩy lên GitHub** (`.gitignore`) | 37 file ghi chú làm việc: luật đang có hiệu lực (`STYLE-RULES.md` · `FONT-LIBRE-INTER.md` · `NAMING-MAGENTO.md`), danh sách việc còn mở, nhật ký thi hành từng trang. Mục lục đầy đủ ở `_notes/README.md` |
| [`_archive/`](_archive/README.md) | File đã hết việc — demo cũ, PNG cũ, báo cáo một-lần đã tiêu hoá xong. Gom 04/09/2026 |

> Gom `_notes/` ngày **07/09/2026** để gốc repo chỉ còn README + code, và cho vào `.gitignore`
> theo yêu cầu — **bản trên GitHub không có thư mục này**, file vẫn nằm nguyên ở máy. Chưa xoá
> gì. Tên file `.md` viết trong backtick ở README này và trong comment các file HTML vẫn giữ
> nguyên: chúng là ghi chú lịch sử, không phải link.

## TRANG CHỦ — screen `home` (04/09/2026, CẢ 2 BẢN)

Lệnh user: *"giả sử trang home bạn không bị ràng buộc bởi bất kì skill hay rule nào thì dựa
vào 2 trang mà chúng ta đã được chốt như là PDP và PLP, bạn hãy tạo một trang homepage phù
hợp trên những UI mà ta đã tạo."*

Trang chủ nay là **một screen trong chính 2 file demo**, đứng ĐẦU `FLOW` — vào trang là thấy
nó, logo header và đoạn `Trang chủ` của breadcrumb bấm về đây (trước đây đoạn đó là `<span>`
chết ở cả PLP lẫn PDP vì trang chủ chưa tồn tại).

**Không phải file thứ 6, và `home.html` giữ nguyên.** `home.html` dựng bằng CSS ngữ nghĩa
trên shadcn-theme + bộ da riêng (`skin-min`, khuôn MR PORTER) nên nói KHÁC giọng với PLP/PDP
— chính thứ lệnh này yêu cầu sửa; nó ở lại làm tư liệu của hướng đã thử. Là screen thì trang
chủ dùng THẲNG `navBar()` · `footer()` · `camKetSection()` · `productCard()` · `.dk-rail*` ·
`.dk-look-band` · cụm accordion PDP, và mọi nâng cấp sau này của những linh kiện đó tự chảy
vào trang chủ.

Hướng: **"hàng hoá trước, kể chuyện sau"** — ngay sau hero là lưới 4 cột y hệt `#plpGrid`
(đo trên trang: thẻ **341,3px** ở cả hai, 0 lệch), phần kể chuyện xếp sau. 10 khối, phủ đủ
**6/6 khối brief khách**. CSS mới đúng **6 class `.hm-*` + 1 khối @media** mỗi file; JS mới
2 hàm (hàng chấm hero + điều hướng riêng của bản mobile). Danh sách sản phẩm đọc từ data
(`p.tag` / `p.off` — cùng 2 cờ mà bộ lọc PLP đang dùng), **0 index in cứng**.

Chi tiết + 3 lỗ của phần cũ bị phơi ra + 7 mục cần chốt: **`HOMEPAGE-DAFC-2026-09-04.md`**.

## Data 3 thương hiệu + trang thương hiệu chạy bằng data (02/09/2026, CẢ 2 BẢN)

Kéo thêm **24 SKU thật** từ `shop.dafc.com.vn`: **12 Dolce&Gabbana + 12 Zimmermann** (index 24–47
của `PRODUCTS`, đặt CUỐI mảng vì router PDP/quick add định danh bằng index), kèm **147 ảnh**
`d*-*.jpg` / `z*-*.jpg`, đủ `PRODUCT_GALLERY` + `PRODUCT_INFO`, và 2 wordmark tách nền
`brand-logo-dg.png` / `brand-logo-zm.png`. Catalog demo nay là **48 SP / 5 thương hiệu**.

Kèm 5 thay đổi cấu trúc:

- **Trang thương hiệu thôi in cứng Versace** — tách ra `BRAND_PAGES` (logo · hero · mô tả · dải
  danh mục), `plpProducts()` lọc theo hãng, 25 hàng thương hiệu trong menu 2 bản đều dẫn về đúng
  trang của mình. Listing danh mục chung hiện lẫn 3 hãng (40 SP thời trang).
- **"Gợi ý mua kèm" đổi sang ẢNH NGƯỜI MẪU** (`PRODUCTS[].model` — ảnh on-model có thật trong bộ
  ảnh của chính SP đó, 27/48 SP có). SP không có ảnh model thì bị loại khỏi dải chứ không rơi về
  ảnh tĩnh. "Sản phẩm tương tự" giữ nguyên ảnh tĩnh.
- **PDP mở đúng SP được bấm** (`pdpIdx` + `goPdp`) — trước đây mọi SP ngoài SP#1–6 đều mở PDP của
  SP#1.
- **Dải "Gợi ý mua kèm" dùng CHUNG MỘT KHUÔN ở cả 6 PDP desktop** — bản A (tiêu đề 40 một bên +
  3 ảnh model trên băng xám), thay cho 3 kiểu khác nhau trước đây; kẻ trên "Sản phẩm tương tự"
  bật ở cả 6. Bản B/C giữ làm công cụ so sánh qua `?look=b` · `?look=c` (nay áp cho mọi PDP).
  Spacing căn lại: cột chữ **282,6 → 282** (đúng 3 cột lưới 12, thẻ ra chẵn **330** thay vì 329,8)
  và `margin-top` cứng 273 tách thành `--look-rise` (221) + `--look-clear` (52 → **56**, cho vào
  nấc 8) = 277.
- **Tiêu đề băng 2 bậc + bỏ kẻ ngăn với "Sản phẩm tương tự"** — `Gợi ý` 24/32 (kicker) trên
  `Mua kèm` 40/50; bản EN `Complete` / `The look` — hoa cả 2 dòng vì đây là HAI BẬC CHỮ riêng,
  không phải một câu bị ngắt đôi. Hai bậc làm bằng **`::first-line`**, KHÔNG chẻ thành 2 `<span>`: khoá `'Gợi ý'`
  đã tồn tại trong I18N (màn Search → "Suggestions") nên chẻ ra là dòng đầu bị dịch sai. Bỏ kẻ
  nhưng **giữ nguyên đệm 64**; `.dk-look-aside` pt 16 → 2 để bù quang học, mực chữ vẫn nằm đúng
  48px dưới mép băng như trước.

⚠ **Bẫy Unicode khi scrape thêm data:** HTML của site trả tiếng Việt dạng **NFD**, còn 2 file demo
là **NFC**. Chữ nhìn giống hệt nhưng so chuỗi luôn sai (i18n tra trượt, tìm kiếm không khớp) —
phải `unicodedata.normalize('NFC', ...)` trước khi sinh code.

Chi tiết + phần còn mở: **`BRAND-DG-ZIMMERMANN.md`**.

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
- Settings FAB (góc phải dưới): đổi ngôn ngữ + đổi font. **Font đơn:** Montserrat · Mona Sans · Inter · Mulish · Manrope · Lora (Lora = mặt chữ bộ da Editorial·MR PORTER; Inter kiêm mặt chữ riêng của PDP6 `.font-inter`). Đã bỏ khỏi panel qua các nhịp: Plus Jakarta Sans · Quicksand · **Jost** · **Josefin Sans** (24/08/2026). **Cặp mix heading+body:** xem mục "Cặp font" bên dưới.

## Quick add mobile: bật lại dải ảnh, bỏ dòng tên màu (27/08/2026, yêu cầu user, CHỈ MOBILE)

Khách gửi hình tham khảo (Charles & Keith mobile): sheet thêm nhanh mở ra là **dải ảnh trượt**
ở trên, dưới là tên + ô màu + chip size.

Chốt qua **3 nhịp trong ngày** — ghi lại đủ vì trạng thái cuối không đọc ra được từ nhịp đầu:
bỏ cả 2 tiêu đề → bỏ luôn dòng tên màu → **thêm lại riêng 2 tiêu đề**. Kết quả sau cùng:

- **CÓ tiêu đề "Màu sắc"** và **"Kích thước" / "Dung tích"** (12/16, `font-medium` trong markup
  nhưng skin kéo về w400 — đúng bằng bộ số của nhãn cùng tên ở PDP, đã đối chiếu computed).
- **KHÔNG có dòng tên màu** (`.qa-color-name` đã gỡ hẳn). Vì phần tử này vốn là **nguồn chuỗi màu
  ghi vào giỏ**, phải sửa kèm 2 chỗ:
  · phần nối sự kiện ô màu bỏ đoạn cập nhật text;
  · `#qaAdd` đổi sang đọc `data-name` của **ô màu đang chọn** (`[data-qa-colors] .sw.on`).
  Nhờ vậy giỏ + sheet xác nhận vẫn ra đủ `"Oro , IT 41"`, và SP không có màu thì chuỗi chỉ còn
  size chứ không lòi dấu phẩy thừa.
- **Dải ảnh dựng lại ở MỌI bộ da** — gỡ điều kiện `skin-mt` vốn có từ 19/08/2026 (nếp cũ: skin-mt
  chỉ còn tên + màu + size). Vẫn bỏ/dựng ở tầng MARKUP chứ không ẩn bằng CSS, vì dải này tải tới
  9 ảnh gallery.
- **GIÁ giữ nguyên nếp cũ**: skin-mt vẫn không dựng. Hình tham khảo có giá — chờ khách chốt.

Đo trên trang chạy (375×812) ở trạng thái cuối: panel cao **593px**, **không phải cuộn** (trần
90vh = 731px) — đúng dáng một-màn-thấy-hết của hình tham khảo. Nhịp dọc: tiêu đề → nội dung 8px
ở cả 2 khối, khối màu → khối size 16px. Đổi sang tiếng Anh thì 2 tiêu đề ra `Colour` / `Size`
(từ điển sẵn có, không phải bổ sung).

**Đã chốt — KHÔNG vá**

- SP#19–24 (`x1..x6`) không khai `PRODUCT_GALLERY` nên dải ảnh rơi về **đúng 1 ảnh 163px**, chừa
  khoảng trắng bên phải. User chốt 27/08: **để nguyên**. Site thật sản phẩm nào cũng nhiều hơn
  1 ảnh nên đây là lỗ **DỮ LIỆU DEMO**, không phải lỗi bố cục — đừng "vá" bằng cách cho ảnh giãn
  full-width, làm vậy là chữa đúng triệu chứng của riêng bản demo rồi lệch với site thật.
- **KHÔNG port sang desktop** (user chốt 27/08). Khổ desktop ở skin-mt vốn không dùng sheet này:
  nút giỏ tròn bị tắt (`html.skin-mt .quick-add { display: none !important }`) và thay bằng dải
  size hiện khi rê chuột (`.pc-quick` / `.pc-sizes`, chốt 19/08). ⚠ Sheet quick add của desktop
  VẪN CÒN và vẫn vào được ở 2 bộ da kia, nên từ hôm nay 2 file **lệch nhau ở sheet đó** — cố ý,
  đừng đồng bộ lại.

**Còn mở**

- Bấm ô màu trong sheet **không kéo dải ảnh** sang bản màu tương ứng (dải và ô màu chạy độc lập).
  Đây là nếp cũ, chưa đụng.
- **GIÁ ở skin-mt vẫn ẩn** trong khi hình tham khảo có giá — chưa chốt.

## Cặp font thử: heading 1 font + body 1 font (24/08/2026, CẢ 2 BẢN)

Panel Cài đặt có thêm mục **"Cặp font · heading + body"** — 4 cặp bấm là đổi trực tiếp trên trang:

| Cặp | Heading | Body | Hướng |
|---|---|---|---|
| ~~Montserrat + Inter~~ → **Fraunces + Montserrat** | Fraunces | Montserrat | serif mới, nền Montserrat *(thay 24/08/2026 — xem mục dưới)* |
| Playfair + Montserrat | Playfair Display | Montserrat | giữ Montserrat làm nền |
| Editorial · tạp chí thời trang | Playfair Display | Work Sans | serif tương phản cao |
| Thanh lịch · maison cổ điển | Cormorant Garamond | Be Vietnam Pro | garamond mảnh |
| Đương đại · serif mới | Fraunces | Manrope | serif hiện đại |
| Couture · didone thuần | Libre Bodoni | Inter | didone Vogue-esque |

**Cơ chế** (`FONT_PAIRS` + class `.font-pair`): chọn cặp thì body đi đường `--font-app` sẵn có, heading đi `--font-head` áp cho `h1-h3` + các cỡ display 18/24/32/48. Chọn font đơn hoặc đổi bộ da sẽ tự tắt chế độ cặp. Cặp không vào RESP hash (công cụ thử, chuyển bản là về mặc định).

**2 dữ liệu ĐO CỨNG dẫn tới 4 cặp này** (không lấy từ blog):
1. **Vietnamese subset** — tải CSS thật từ `fonts.googleapis.com` cho ~80 font, giữ font có subset `vietnamese` (unicode-range U+1EA0-1EF9). Loại ở bước này: **Jost** · DM Sans · DM Serif Display · Instrument Serif/Sans · Bodoni Moda · Libre Baskerville · Marcellus · Cinzel · Italiana · Tenor Sans · Gilda Display · Antic Didone · Forum · Bellefair · Cardo · Karla · Figtree · Outfit · Sora · Syne · Urbanist · Rubik — **nhiều cái trong đó là font "luxury" hay được khuyên trên blog nước ngoài nhưng không dùng được cho tiếng Việt**.
2. **Weights thật** — gọi API từng nấc 300→700. Loại Prata (chỉ có 400) vì dự án cần đủ 400 + 500.

**Mốc thẩm mỹ** — đo font thật của `mytheresa.com` (24/08/2026): `AvenirNextLTPro-Medium` cho cả tiêu đề 44px lẫn UI 13-15px, fallback `Futura, Century Gothic, Gill Sans` → họ đi **hệ geometric sans, KHÔNG serif**. 4 cặp trên là 4 hướng serif khác nhau để so với hiện trạng sans thuần. (net-a-porter + ssense chặn bot, không đo được.)

**Verify sau khi lắp**: 6 face mới tải thật (`document.fonts.check` = true), canvas-probe chuỗi dấu 2 tầng `ệỗữặẩ` cho thấy cả 6 render bằng chính font đó (không rơi fallback), 4 cặp đổi đúng 2 tầng ở cả mobile + desktop, console sạch.

**2 cặp CÓ MONTSERRAT (24/08/2026, user hỏi "có font nào mix được với Montserrat")** — chọn bằng số đo thật, chuẩn hoá 100px trên chuỗi `Nhận thông báo khi có hàng`:

| Font | x-height | cap-height | Bề rộng chuỗi VN | Cao dấu (ệ) |
|---|---|---|---|---|
| **Montserrat** | 53 | 70 | **1438 — rộng nhất /24 font đo** | **73** |
| Inter | 55 | 73 | 1320 (−8%) | 67 |
| Archivo | 53 | 69 | 1220 (−15%) | 67 |
| Playfair Display | 52 | 71 | 1247 | 81 |
| Cormorant Garamond | 39 | 63 | 1104 | 73 |

Kết luận từ số đo: Montserrat **rộng nhất** và **dấu cao nhất trong nhóm sans** → vai tự nhiên của nó là *heading*; body nên nhường cho font hẹp hơn, dấu thấp hơn. Cặp **Montserrat + Inter** (A) sửa đúng điểm đó (Inter hẹp 8%, dấu thấp hơn 6 đơn vị → hàng danh sách 12-14px ít wrap). Cặp **Playfair + Montserrat** (B) giữ Montserrat làm nền chữ chính, heading Playfair khớp metrics gần tuyệt đối (cap 71 vs 70, x-height 52 vs 53 → hai tầng cùng bậc, chỉ khác giọng); dấu Playfair cao nhất bảng (81) nên tiêu đề nhiều dòng cần line-height ≥1.33. **Đã loại vì số đo:** Cormorant Garamond + Montserrat (x-height 39 vs 53 lệch quá xa → tiêu đề trông nhỏ hơn thân bài dù cỡ lớn hơn). Cặp C (Montserrat + Archivo, hẹp 15% với x-height y hệt) chưa lắp — user chốt A + B.

**Kiểm chứng bằng workflow đa tác nhân (24/08/2026)** — 4 agent tra nguồn song song về ghép cặp với Montserrat (1 agent thứ 5 mất kết nối giữa dòng). Nó **khớp** kết luận từ số đo ở trên (Montserrat nên ở heading; hoặc giữ body + heading serif), và thêm 2 điểm số đo không thấy được:

1. **Newsreader có trục optical-size (`opsz` 6–72)** nên đứng vững đúng ở thang 18/24px của dự án — trong khi Playfair Display và Libre Bodoni là *display face*, được vẽ cho cỡ lớn. Đây là ứng viên heading hợp thang chữ hiện tại hơn cả 2 cặp đã lắp.
2. **Cảnh báo cho cặp Couture (Libre Bodoni)**: nét hairline của Didone chỉ thật sự sống từ **32px** trở lên; ở 24px — cỡ tiêu đề lớn nhất của dự án — nó dễ bết. Muốn dùng cặp này thì phải mở thêm bậc display 32/48, tức sửa thang chữ (§1.2).
3. Ứng viên body đáng thử tiếp: **Be Vietnam Pro** — dấu tiếng Việt do người Việt vẽ, khoảng từ x-height tới đỉnh dấu rộng hơn Montserrat (0.384em vs 0.265em) nên ế/ộ/ậ/ữ ở 12px không bết. Đổi lại: ở 12-14px gần như không nhận ra đang có 2 font.

Nguồn chính workflow dùng: [typewolf.com/montserrat](https://www.typewolf.com/montserrat) · [pimpmytype.com/montserrat-font-pairs](https://pimpmytype.com/montserrat-font-pairs/) · [sparkinteract — Montserrat body font problem](https://www.sparkinteract.com.au/branding/montserrat-body-font-problem/) · [rsms.me/inter](https://rsms.me/inter/) · [Google Fonts — pairing within a superfamily](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces_within_a_family_superfamily) · metadata font của Newsreader/Libre Bodoni/Be Vietnam Pro trên fonts.google.com.

### MOCKUP best practice cho cặp mix — CHƯA CHỐT, chưa vào STYLE-RULES (24/08/2026)

User: *"font size hiện tại có vẻ chưa phù hợp với font mix, hãy mockup luôn best practice… lưu ý chỉ là demo chưa chốt nên không ghi vào rule"*.

**Chẩn đoán**: thang chữ 10/12/14/18/24 của dự án được vẽ quanh Montserrat (x-height 0.53em). Áp y số px đó cho font khác thì ra **cảm giác cỡ khác nhau** — đo ở 100px: Cormorant Garamond 39 · Libre Bodoni 45 · Fraunces 47 · Work Sans 50 · Playfair 52 · Montserrat 53 · Inter 55. Cùng 24px, Cormorant trông nhỏ hơn Montserrat gần ¼.

**Best practice áp dụng: cân x-height bằng `font-size-adjust`, không chỉnh px từng chỗ.** `font-size-adjust: ex-height 0.53` bắt trình duyệt scale sao cho x-height/font-size = 0.53 — tức mọi font body ra đúng cảm giác cỡ mà thang chữ đang giả định, **không phải sửa một con số px nào trong markup**, và tự đúng ở cả 3 chỗ remap khác nhau của skin-mt (`text-[24px]` ra 18px ở login nhưng 24px ở giỏ). Đo chứng minh nó hoạt động: bề rộng chuỗi `Nhận thông báo` ở 12px — Cormorant 82.8 → **111px (+34%, đúng tỉ lệ 53/39)**, Inter 97.8 → 95.1 (−3%, vì x-height 55 vốn cao hơn chuẩn), Montserrat gần như không đổi.

Kèm 2 tinh chỉnh khai **theo từng cặp** (`tune` trong `FONT_PAIRS` → biến `--pair-*`):

| Cặp | line-height heading | tracking heading | Vì sao |
|---|---|---|---|
| ~~Montserrat + Inter~~ → **Fraunces + Montserrat** | 1.32 | 0 | body là chính Montserrat nên `adj .53` không đổi gì; heading serif x-height 47 → bỏ tracking dương, nới dòng *(thay 24/08/2026)* |
| Playfair + Montserrat · Editorial | 1.30 (31.2px) | 0 | dấu ệ của Playfair cao **81/100** — cao nhất 24 font đo |
| Thanh lịch (Cormorant) | 1.36 (32.6px) | 0 | = 53/39, bù đúng phần x-height hụt |
| Đương đại (Fraunces) | 1.32 | 0 | x-height 47 thấp hơn body 1 nhịp |
| Couture (Libre Bodoni) | 1.25 (30px) | −0.2px | didone cần đặc lại; hairline chỉ sống từ ~32px |

**Bẫy specificity đã vá**: 2 rule thi hành phải nằm **cuối `<style>`** — khối cart-scope của bộ da khai `line-height` ở cùng specificity (0,3,1) nhưng viết sau, nên đặt ở đầu file là bị đè (đo được: rule mockup index 61 vs khối cart index 361; line-height ra 32px thay vì 31.2px). Nhánh thứ hai có `[data-screen]` để ngang specificity đó.

**Giới hạn còn lại** (nếu chốt dùng thật thì phải xử, và lúc đó mới sửa STYLE-RULES): cặp Cormorant vẫn cần **nâng hẳn bậc cỡ heading** chứ không chỉ nới dòng; cặp Libre Bodoni cần **mở bậc display 32/48** vì thang dự án dừng ở 24. `font-size-adjust` cần Chrome 127+/Firefox — đã kiểm trên pane (Chrome 148, hỗ trợ cả 3 dạng cú pháp).

> **2 lỗi phát sinh từ đợt này, đã vá (user báo "không thấy button thiết lập bên dưới back to top nữa"):**
> 1. **Comment CSS lệch** — khi chuyển 2 rule mockup xuống cuối `<style>`, đoạn văn giải thích còn lại nằm SAU dấu `*/` đã đóng rồi lại có thêm `*/` → parser coi phần đó là rác và **hủy luôn rule ngay sau nó**, tức `#settingsFab { position: fixed … }`. Nút Cài đặt rơi về `position: static` và trôi xuống cuối dòng chảy trang (đo được: y = 3273). Đã gộp đoạn văn vào trong comment ở **cả 2 file**; thêm script kiểm cân `/* */` trong `<style>` — nay open=close, không còn dấu đóng lạc.
> 2. **Panel Cài đặt tràn màn hình** — thêm 6 cặp font làm card cao **1030px** trên viewport 812 → mép trên bị cắt −354px, mất 2 mục đầu (Ngôn ngữ, Bộ da) và **không cuộn được** (`overflow: visible`). Đã cho `.sp-card` `max-height: calc(100vh - 160px)` + `overflow-y: auto` + `overscroll-behavior: contain`. Đo lại: mobile cao 632/812, desktop 621/800, cuộn tới được cặp cuối, mục đầu trở lại.

**Bật cặp font = TẮT nhãn hoa của bộ da** (24/08/2026, user: *"ở các option font không nhất thiết phải theo rule uppercase toàn bộ theo skin mt"*): rule cuối `<style>` cho `html.font-pair` trả `text-transform: none` cho nav ngành hàng · nhãn nhóm menu/mega · tiêu đề mục bộ lọc · nhãn footer · nhãn mở mục trong giỏ · brand. Vì uppercase che đúng phần chữ thường (x-height, đuôi g/y, bụng a/e) — chỗ để nhận ra một serif — nên ép hoa làm hỏng việc thử font. Bỏ chọn cặp là hoa trở lại; đo 2 chiều ở cả 2 bản: `.dk-dept`/`.ms-tab` `uppercase → none → uppercase`.

## Đổi cặp font: Montserrat + Inter → FRAUNCES + MONTSERRAT (24/08/2026, CẢ 2 BẢN)

User: *"thay bộ font Montserrat + inter thành Fraunces + montserrat nhé, áp dụng 2 phiên bản"*.

- **Verify trước khi thay** (quy trình bắt buộc với mọi font mới): tải CSS thật `fonts.googleapis.com/css2?family=Fraunces:wght@400;500` → có subset **`vietnamese`** (2 khối `unicode-range` chứa `U+1EA0`). Kiểm tiếp trên trang: `document.fonts.check("500 24px Fraunces", "ệ ộ ậ ữ")` = **true** ở cả 2 bản, và face vietnamese đã `loaded`. Fraunces vốn đã nằm trong thẻ `<link>` (cặp `modern`) nên **không thêm request nào**.
- **`tune` của cặp**: `{ adj: 0.53, headLs: '0', headLh: 1.32 }` — body là *chính Montserrat* nên `adj .53` không đổi gì (thân bài y hệt bộ da); heading Fraunces là serif display, x-height 47 (thấp hơn body 53 một nhịp) nên bỏ tracking dương + nới dòng 1.32, cùng số đã dùng cho cặp `modern`.
- **Đo sau khi đổi** (chọn cặp qua UI popover Cài đặt): `--font-head` = Fraunces · `--font-app` = Montserrat · heading newsletter ra **Fraunces 18/24** (mobile) / **24/32** (desktop, đúng T1), tracking `normal` (do headLs 0); nav/brand/body vẫn Montserrat ls .5px.
- Id đổi `mont-inter` → `fraunces-mont`. Id cũ còn ghim ở đâu đó sẽ trượt `FONT_PAIRS.find` → rơi về mặc định, vô hại.
- **Hệ quả cần biết**: danh sách cặp nay **không còn cặp sans+sans nào** — toàn bộ heading là serif, đi từ gần hiện trạng nhất (giữ Montserrat làm body: Fraunces+Mont, Playfair+Mont) tới xa nhất (didone tạp chí). Ghi chú "4 cặp đi từ gần hiện trạng tới xa nhất" trong code đã sửa theo. Cặp `modern` (Fraunces + Manrope) vẫn còn, nên giờ có **2 cặp heading Fraunces** khác nhau ở body.

## Bộ da thứ 4: MAIKA (`skin-mk`) — 24/08/2026, CHỈ MOBILE

User: *"tạo thêm 1 skin-mk tên là maika, dùng menu của bộ skin-mt (uppercase menu) và dùng body trang với các heading lớn như bộ skin-mp"*.

**Cách dựng — GHÉP, không nhân bản.** Ô class của Maika mang **2 class**: `skin-mp skin-mk`.

- `skin-mp` → nguyên bộ **thân trang + heading lớn** của MR PORTER (token, thang chữ, cart editorial, checkout, promo bar…) dùng lại 100%, **không sửa một rule nào**.
- `skin-mk` → lớp phủ **chỉ 6 rule**, khai lại phần **menu** theo số của skin-mt.

Lợi: Maika tự thừa hưởng mọi thay đổi sau này của skin-mp, và "diff" của nó gọn đúng một khối — thay vì copy ~40 rule rồi phải sửa song song mãi.

Sửa kèm ở JS: `applySkin` phải add/remove **theo từng class** (`classList.add("a b")` ném `InvalidCharacterError`), nên 2 dòng đổi thành `...x[2].split(' ')`. Đã test vòng đời `mytheresa → maika → editorial → maika → default`: class trên `<html>` sạch đúng từng bước, không sót `skin-mk`.

**Vì sao khối menu phải khai lại cả cỡ/dòng, không chỉ `text-transform`**: skin-mp giờ cũng hoa menu rồi (mục trên), nên "menu của skin-mt" chỉ còn khác ở **thang** — menu skin-mt là hệ compact `14/20 · 12/16 · ls .5px`, skin-mp là `16/24 · 14/20 · ls .2px`. Lấy đúng bộ số của skin-mt để menu Maika tương phản với thân trang lớn của nó.

Đo sau khi dựng (375, drawer mở):

| | Maika | (đối chiếu) skin-mt | (đối chiếu) skin-mp |
|---|---|---|---|
| Tab ngành hàng | `14/20 · 500 · HOA · ls .5` | y hệt | 16/24 · 500 · HOA · ls .2 |
| Hàng danh mục cấp 1 | `12/16 · 400 · HOA` | y hệt | 14/20 · 500 · HOA |
| Tiêu đề màn con | `12/16 · 500 · HOA` | y hệt | 16/24 · 500 · HOA |
| Hàng cấp 2 | **thường** (sao y ngoại lệ skin-mt) | thường | thường |
| Brand card / tên sp | `14/20 · 500` / `14/20 · 400` | 14/20 · 400 / 12/18 | **giống Maika** |
| Heading newsletter | `18/28 · 500` | 18/24 · 400 | **giống Maika** |
| Nhãn footer | `14/20 · 500 · thường` | 12/16 · 500 · HOA | **giống Maika** |
| Promo bar | đen, chữ `#f0f0f0` | đen, chữ trắng | **giống Maika** |

- **Bộ chọn da** hiện đủ 4 dòng, tick đúng dòng Maika; bấm qua UI (`mytheresa → maika`) ra đúng `skin-mp skin-mk`. Ghi chú dòng Maika không có bản dịch EN — **giống 3 dòng còn lại** (popover Cài đặt là công cụ dev, §5 STYLE-RULES).
- **Font mix vẫn giữ chữ hoa cho menu Maika** ✓ — nó thừa hưởng rule `html.skin-mp.font-pair …` (có `!important`) của mục trên.
- Giữ theo skin-mp có chủ ý: nav ngành hàng của **màn Search** (`.search-tab`) — nó là nội dung trang, mà thân trang Maika là skin-mp.
### PDP: cụm accordion bỏ KẺ MỞ ĐẦU (24/08/2026, 6 bản × CẢ 2 BẢN)

User: *"ở pdp, cục mô tả sản phẩm sẽ không có border top nhé, hãy bỏ ra ở toàn bộ ver pdp cả mobile và desktop"*.

Gốc của cái kẻ đó: `skin-mt` đổi `border-b` của mỗi hàng accordion thành **KẺ TRÊN** (rule `.acc.border-b` trong khối bộ da), nên hàng đầu — "Mô tả sản phẩm" — tự mang một kẻ nằm **ngay dưới khối xám CTKM** → ngăn hai lần ở cùng một mép.

```css
html.skin-mt [data-screen^="pdp"] .acc.border-b:first-child { border-top-width: 0; }
```

- Một rule, `^="pdp"` phủ cả 6 bản, khai giống hệt ở 2 file.
- `:first-child` trúng **đúng** hàng đầu của cụm tab PDP — đã đo trước khi viết: accordion ở **footer không phải con đầu** của cha nó (có phần tử khác đứng trước) nên không bị ảnh hưởng.
- Đo sau sửa: **6/6 bản × 2 khổ** → hàng "Mô tả sản phẩm" `top 0px`, hàng 2 và các hàng sau vẫn `top 1px` (vẫn ngăn nhau), accordion footer vẫn `top 1px`. Đối chứng `skin-mp`: hàng đầu vốn `top 0 · bottom 1px` (bộ da đó dùng kẻ dưới) nên **không cần và không bị** đụng.

## Cục "Ưu đãi khuyến mãi" ở PDP: chốt KHỐI XÁM, áp cho cả 6 bản × CẢ 2 BẢN (24/08/2026)

User: *"chốt sẽ dùng cục của pdp số 3, túi đeo vai da Emblème, hãy adapt style cục ưu đãi đó cho toàn bộ ver của pdp"* → tôi hiểu sai thành hàng accordion (PDP3 bản MOBILE dùng accordion), user chỉnh: *"sai rồi, ý tôi là dùng block màu xám này nè, sửa lại bản mobile và áp dụng cho cả bản desktop"*.

**Khuôn chốt** = **khối xám** đang có ở PDP3 **bản DESKTOP**: thẻ `bg-accent-0` bo `rounded-sm` pad 16 gap 4 · tiêu đề "Ưu đãi khuyến mãi" 14/20 Medium mực chính · **mỗi chương trình MỘT DÒNG** 14/20 mực nội dung, phần đầu dòng Medium. Không bullet, không accordion, không bấm mở chi tiết. Vị trí: giữa cụm CTA và cụm accordion.

Trước khi sửa có **6 kiểu** rải trên 2 bản:

| | Mobile trước | Desktop trước | Sau (cả 2 bản) |
|---|---|---|---|
| PDP v1 | `promoCardsSplit` — mỗi chương trình 1 card, bấm mở chi tiết | `promoCardsSplit` | **khối xám** |
| PDP2 | `promoCardGrouped` — 1 card gộp, dòng gạch chân → bottom sheet | `promoCardGrouped` | ↑ |
| PDP3 | hàng accordion "Ưu đãi khuyến mãi" mở sẵn | **khối xám (khuôn chốt)** | ↑ |
| PDP4 | hộp `bg-accent-0` + bullet 14/20 | khối xám | ↑ |
| PDP5 | hộp `bg-secondary` p-3 + bullet | khối xám | ↑ |
| PDP6 | hộp `bg-secondary` p-2 + bullet 12/16 | khối xám | ↑ |

- **Một helper `promoBox(items, wrap)`** khai giống hệt ở 2 file, nhận đúng 2 dạng dữ liệu đang có sẵn (cặp `['Tên', ' phần còn lại']` · câu đơn của pdp6) nên **mỗi PDP giữ nguyên nội dung, chỉ đổi vỏ**. `promoPairs(keys)` quy đổi danh sách key catalogue `PROMOS` (pdp, pdp2) sang dạng cặp: `title` làm phần đậm, `line` làm mô tả (bỏ khi trùng). Tham số `wrap` để mobile chèn gutter `px-4 pb-2`, desktop gọi rỗng vì cột đã có padding.
- Mobile: cụm accordion trả về nguyên trạng — hàng đầu lại là "Mô tả sản phẩm", không hàng nào mở sẵn; 3 chỗ `<p>`→`<div>` của lần làm sai cũng revert.
- Desktop: bỏ hẳn thế 3 nhánh trong `dkScreenPDP` (pdp card tách · pdp2 card gộp · 4 bản còn lại khối xám) → 1 lời gọi `promoBox` cho cả 6 kind.
- 2 hàm `promoCardsSplit` / `promoCardGrouped` nay **không còn được gọi ở cả 2 file** — giữ kèm cảnh báo vì chúng ghi số đo Figma của 2 layout từng chốt.
- **Đo sau sửa, 6 bản × 2 khổ**: nền `#f7f7f7` (accent-0) · pad 16 · gap 4 · tiêu đề `12/18 · 400 · #0a0a0a` · dòng `12/18 · 400 · #333` · rộng 343 (mobile) / 427 (desktop) · **0 card layout cũ còn lại** (`[data-promo]` = 0). Số dòng đúng theo từng bản: pdp 4 · pdp2 3 · pdp3–6 2. Cỡ ra 12/18 chứ không 14/20 vì skin-mt remap 14→12 — giống mọi chữ khác trong bộ da.
- **Mất so với trước**: pdp/pdp2 không còn xem được chi tiết từng chương trình (điều kiện/thời gian/lưu ý trong `PROMOS.rows`). Đó là hệ quả của khuôn chốt (1 dòng/chương trình) — nói nếu muốn mở rộng.

## Bỏ cặp Playfair + Work Sans · Maika mặc định là cặp Libre Bodoni + Inter (cả 2 bản)

User: *"bỏ font worksan mix playfair luôn nhé, và mặc định ở skin maika sẽ là font mix libre và inter nhé"*.

- **Bỏ cặp `editorial`** (Playfair Display + Work Sans). `Work+Sans` gỡ luôn khỏi thẻ `<link>`; **Playfair Display GIỮ** vì cặp `playfair-mont` còn dùng. Còn **4 cặp**: Fraunces+Mont · Playfair+Mont · Đương đại (Fraunces+Manrope) · Couture (Libre Bodoni+Inter). Link còn **6 family**.
- **Bộ da có cặp font mặc định** — thêm **ô thứ 6** vào bản ghi `SKINS`: Maika = `'couture'`. 3 bộ da kia để trống → vẫn về font đơn ở ô thứ 5 như trước.
- Để `applySkin` dùng lại được đúng logic của nút chọn cặp, **tách `applyFontPair(id)` ra module-level** (trước đây nằm trong click handler): nó set `--font-app`/`--font-head` + 3 biến `tune`, thêm class `font-override font-pair`, cập nhật tick. Handler giờ chỉ gọi hàm rồi `closeP()` + toast. `applySkin` gọi hàm này **ở cuối** — phải sau khối reset, vì reset vừa đặt `currentFont`/tick theo font đơn.
- Đo (bấm chọn Maika qua UI, cả 2 bản): `--font-head` = **Libre Bodoni** · `--font-app` = **Inter** · tune `adj .53 · ls −0.2px · lh 1.25`; heading ra **Libre Bodoni**, body/brand/nav ra **Inter**; tick nằm ở cặp `couture`, không font đơn nào tick.
- Đổi sang bộ da khác vẫn reset đúng: bấm Mytheresa → `--font-head` bị xoá, `currentPair` rỗng, `currentFont = montserrat`, heading + body về Montserrat.

### ROLLBACK + dọn font (24/08/2026, cả 2 bản)

User: *"sửa lại không dùng font heading cho brand name ở listing nữa nhé (coi như rollback lại như ver trước đó); đồng thời bỏ bộ font Cormorant Garamond + Be Vietnam Pro, font Mulish và Lora"*.

- **Rollback**: rule cho `.pc-brand` + brand hàng giỏ ăn `--font-head` đã **gỡ hẳn** khỏi khối Maika ở cả 2 file. Đo lại (Maika + cặp Fraunces·Montserrat): brand listing `Montserrat` · brand hàng giỏ `Montserrat` · tên sp/body `Montserrat` — đúng như trước khi thêm. Brand ở **PDP vẫn ra Fraunces** vì nó là `h1.pc-brand` và khối "CẶP FONT THỬ" bắt `h1` — **hành vi có từ trước**, không phải rule của Maika.
- **Bỏ 2 font đơn** `Mulish` + `Lora` và **bỏ cặp** `Cormorant Garamond + Be Vietnam Pro` (id `elegant`). Lora vào file 18/08 để làm mặt chữ serif của bộ da MR PORTER, nhưng bộ da đó đã về Montserrat từ chốt 20/08 → không còn chỗ dùng nào (grep xác nhận: chỉ còn trong mảng + comment, không rule CSS nào).
- **Gỡ luôn 4 family khỏi thẻ `<link>` Google Fonts**: `Mulish` · `Lora` · `Cormorant+Garamond` · `Be+Vietnam+Pro`. Còn lại 7 family: Montserrat · Inter · Manrope · Playfair Display · Work Sans · Fraunces · Libre Bodoni.
- Sau dọn: **3 font đơn** (Montserrat · Inter · Manrope) và **5 cặp** (Fraunces+Mont · Playfair+Mont · Editorial · Đương đại · Couture). Popover Cài đặt render từ mảng nên tự đúng số dòng (đã đo cả 2 bản).
- Id cũ (`mulish`, `lora`) còn ghim ở hash chuyển bản sẽ trượt `FONTS.find` → rơi về mặc định, vô hại; cặp không vào hash nên chỉ cần bỏ khỏi mảng.

### ~~Brand name của Maika dùng MẶT CHỮ CỦA HEADING~~ (đã rollback — xem mục trên)

User: *"ở skin maika, brand name sẽ dùng font của heading luôn nhé, đồng bộ khi swap mix font thì font brand name cũng phải dùng font của heading"*.

Cách làm: dùng **đúng biến của cơ chế cặp font** thay vì khai tên font — `font-family: var(--font-head, var(--font-app))` cho `.pc-brand` + dòng brand trong hàng giỏ. Nhờ vậy:
- **chưa chọn cặp** → `--font-head` chưa có → rơi về `--font-app` (mặt chữ thân bài) → không đổi gì so với trước;
- **chọn/đổi cặp** → `--font-head` là inline style trên `<html>` nên brand **đổi theo ngay**, không cần rule riêng cho từng cặp.

Đo (bấm chọn cặp qua UI, cả 2 bản cho cùng kết quả):

| | brand card | brand PDP | brand hàng giỏ | tên sp | giá / body |
|---|---|---|---|---|---|
| Maika, chưa cặp | Montserrat | Montserrat | Montserrat | Montserrat | Montserrat |
| Maika + **Fraunces**+Mont | **Fraunces** | **Fraunces** | **Fraunces** | Montserrat | Montserrat |
| Maika + **Libre Bodoni**+Inter | **Libre Bodoni** | **Libre Bodoni** | **Libre Bodoni** | Inter | Inter |

Chỉ đổi **mặt chữ**; cỡ/dòng/tracking/weight của brand giữ theo bộ da (muốn brand lấy luôn tracking + line-height của heading thì thêm 2 khai).

*Phát hiện kèm (không sửa, vì user chỉ nói Maika)*: ở **skin-mt và skin-mp**, khi bật cặp font thì **brand ở PDP đổi mặt chữ nhưng brand trên card thì không** — vì khối "CẶP FONT THỬ" bắt `h1` (PDP brand là `h1.pc-brand`) mà không bắt `.pc-brand`. Tức 2 bộ da đó đang một trang một mặt chữ. Maika nay khớp cả 3 chỗ; muốn đồng bộ luôn cho 2 bộ kia thì thêm `.pc-brand` vào khối đó — 1 dòng.

### Vá tiếp: viền trong menu Maika = Y CHANG skin-mt (cả 2 bản)

User: *"skin-maika menu phải có border y chang skin-mt luôn chứ"*. (Trước đó tôi để viền menu ăn token của skin-mp và ghi là "cố ý" — user bác, nên sửa lại theo.)

**Đo 2 bộ da rồi mới viết rule**, hoá ra không chỉ lệch sắc:

| Khổ | Chỗ lệch | skin-mt | Maika trước |
|---|---|---|---|
| Mobile | hàng tab (kẻ dưới) · viền 2 nút Đăng ký/Đăng nhập | `#dfdfdf` | `#e0e0e0` |
| Mobile | vách mỗi hàng danh mục | `#ececec` | `#ebebeb` |
| Mobile | kẻ trên khối "Tài khoản" + hàng "Ngôn ngữ" | `#f2f2f2` | `#f0f0f0` |
| Desktop | `#dkNavRow` kẻ dưới · `.dk-sub` kẻ dưới | `#ececec` | **KHÔNG CÓ** (skin-mp không kẻ 2 chỗ này) |
| Desktop | `.dk-mega` kẻ dưới · `.dk-mega-teaser` kẻ dọc | `#dfdfdf` | `#e0e0e0` |

**Cách sửa — khoanh token vào phạm vi menu**, không liệt kê từng phần tử: `html.skin-mk #menuSheet { --unofficial-border-1 / --general-border / --unofficial-border-0 / --general-secondary }` ở mobile và `html.skin-mk .navbar { --unofficial-border-1 / --general-border }` ở desktop (biến CSS thừa kế nên mega panel nằm trong navbar cũng ăn theo). Nhờ vậy viền menu thêm sau này tự đúng, và **ngoài menu Maika vẫn giữ nguyên bảng màu skin-mp**. Desktop thêm đúng 4 khai viền (2 kẻ mà skin-mp thiếu + 2 sắc).

**Đo lại**: mobile **9/9 viền khớp tuyệt đối** với skin-mt (0 lệch); desktop **4 chỗ menu khớp hết**, còn đúng 3 dòng lệch và cả 3 là **cùng một phần tử `#dkNavSearchField`** — ô tìm kiếm trong nav: skin-mt vẽ nó thành **gạch chân đen** (bỏ hộp), skin-mp để **hộp viền đen 4 cạnh**. Tôi **cố ý không đụng**: đó là khuôn của Ô NHẬP, không phải viền của menu. Muốn lấy luôn kiểu gạch chân thì thêm 1 rule.
### Bản desktop (làm ngay sau đó, cùng ngày)

Cùng cách ghép (`skin-mp skin-mk` + `applySkin` split), lớp phủ **8 rule**. Ở khổ này "menu của skin-mt" = **thanh nav trên cùng + mega panel**; drawer `#menuSheet` **không có nhánh nào** vì chính skin-mt ở desktop cũng để chữ thường.

| Vai | skin-mp | skin-mt (đích) | Maika sau khi dựng |
|---|---|---|---|
| `.dk-dept` | 16/24 · 400 · HOA · ls .2 | 12/16 · 500 · HOA · ls .5 | **12/16 · 500 · HOA · ls .5** ✓ |
| `.dk-nav-link` | 14/20 · 400 · HOA · ls .2 | 12/16 · 500 · HOA · ls .5 | **y hệt skin-mt** ✓ |
| Nhãn nhóm mega | 14/20 · 600 · ls 2.1px **+ vạch 32×1px** | 12/18 · 500 · ls .5, không vạch | **12/18 · 500 · ls .5**, vạch `display:none` ✓ |
| Hàng trong mega | 14/20 · 400 · ls .2 | 12/18 · 400 · ls .5 | **12/18 · 400 · ls .5** ✓ |
| Heading newsletter (thân trang) | **32/40 · 300** | 24/32 · 400 | **32/40 · 300** (giữ skin-mp) ✓ |
| Brand card (thân trang) | 14/20 · 500 | 14/20 · 400 | **14/20 · 500** (giữ skin-mp) ✓ |

- **Gỡ vạch `::after` 32×1px** dưới nhãn nhóm mega (+ `padding-bottom` về 0): vạch đó là trang trí riêng của menu MR PORTER, menu skin-mt không có. Muốn giữ thì xoá 2 khai đó — 1 dòng.
- Kiểm: vòng đời `mytheresa → maika → editorial → maika → default → maika` cho class sạch từng bước; bộ chọn da đủ 4 dòng và tick đúng Maika; **font mix vẫn giữ chữ hoa** cho cả 3 vai menu (thừa hưởng rule `!important` của skin-mp); `node --check` OK; cân `/* */` 242/242.

## Thanh promo trên header trả về NỀN ĐEN (24/08/2026, CẢ 2 BẢN, cả skin-mt + skin-mp)

User: *"promo bar nằm trên thanh header sẽ màu đen nhé"*.

Đo trước khi sửa mới thấy: **bản gốc/markup vốn đã đen** — mobile `div.h-8.bg-primary`, desktop nền inline `var(--surface-dark)`, chữ `text-primary-foreground`. Chính **2 bộ da** đang đảo nó thành xám nhạt chữ đen (`#d9d9d9` ở skin-mp · `--general-secondary` ở skin-mt, desktop còn `!important` vì nền gốc là inline style). Nên việc phải làm là **gỡ 4 rule đè** (2 nền + 2 màu chữ), không phải khai màu đen mới.

- Giữ lại đúng `opacity: 1` của mobile (markup để slide mờ nhẹ; 2 bộ da vốn kéo về đục, không đổi cùng lượt này). Token `--surface-dark` không đụng — nó còn tô thẻ "mặt tối lớn" ở màn khác.
- Đo sau sửa: nền `rgb(10,10,10)` cao 32 ở **cả 2 bản × cả 2 bộ da**; chữ trắng (`#ffffff` skin-mt · `#f0f0f0` skin-mp, đúng token `primary-foreground` của từng da). Quét toàn bộ subtree của thanh: **0 phần tử còn chữ/icon mực tối** nên không có chỗ nào bị chìm vào nền đen. Bộ da mặc định giữ nguyên (đối chứng: `#0a0a0a` + `#fafafa` + opacity .9).
- **STYLE-RULES §2.2 đã ghi ngoại lệ trước khi sửa code**: mặt tối `#0a0a0a` nay có **vai thứ 3** — thanh promo — và là vai duy nhất mà mặt tối làm *nền của một dải nội dung*; hợp lệ vì dải này nằm TRÊN header, không thuộc dòng chảy trang. Danh sách vai của mặt tối đóng ở 3.

## Menu của skin-mp (MR PORTER) lấy chữ hoa giống skin-mt (24/08/2026, CHỈ MOBILE)

User: *"ở skin mr porter, hãy lấy bộ menu uppercase giống skin-mt nhé, còn các nội dung trang thì giữ nguyên"*.

Lấy đúng **bộ vai** mà skin-mt viết hoa trong menu (§1.5 vai 1 + vai 2), **không lấy thang chữ** của nó — cỡ/dòng/tracking của skin-mp giữ nguyên vì user chỉ đổi chữ hoa, và cỡ thoáng hơn chính là chữ ký editorial của bộ da này:

| Vai trong `#menuSheet` | skin-mt | skin-mp trước | skin-mp sau |
|---|---|---|---|
| Tab ngành hàng `.ms-tab` | 14/20 · 500 · HOA | 16/24 · **500/400** · thường | 16/24 · **500** · **HOA** |
| Hàng danh mục cấp 1 | 12/16 · 400 · HOA | 14/20 · 500 · thường | 14/20 · 500 · **HOA** |
| Tiêu đề màn con `.glass-95 > p` | 12/16 · 500 · HOA | 16/24 · 500 · thường | 16/24 · 500 · **HOA** |
| Nhãn nhóm `.ms-view > p` | 500 · HOA | (không xuất hiện ở danh mục đang test) | rule đã đặt sẵn |
| **Hàng cấp 2 (màn con)** | **thường** (rule 4b gỡ hoa) | thường | **thường** — sao y ngoại lệ |

- **Sao y cả phần ngoại lệ**: skin-mt có rule riêng gỡ hoa cho hàng cấp 2 (chốt 19/08 "trên desktop là viết hoa chữ cái đầu"), nên "giống skin-mt" nghĩa là ở đây cũng phải có rule gỡ — không có nó thì rule cha phủ luôn màn con.
- **Kéo cả 3 tab về w500**: markup chỉ cho 500 cho tab đang chọn, 2 tab kia 400 → hoa mà 400 là nửa cặp (§1.1), mà skin-mt thì cả 3 tab đều 500. Trạng thái đang chọn vẫn đọc được bằng gạch chân sẵn có.
- **Không chạm nội dung trang**: mọi selector nằm trong `#menuSheet`. Nav ngành hàng của **màn Search** (`button.search-tab`) tuy cùng vai 1 ở skin-mt nhưng nằm ngoài menu nên **không lấy**. Đo đối chứng sau sửa: brand card / nút Bộ lọc / tiêu đề mục PDP của skin-mp vẫn `14/20 · 500 · thường`, `14/21`, `18/28` — y như trước.
### Bản desktop (làm ngay sau đó, cùng ngày)

Ở khổ 1440, "bộ menu" của skin-mt **chỉ gồm 2 vai** — đã đo để chắc trước khi viết rule:

| Vai | skin-mt desktop | skin-mp trước | skin-mp sau |
|---|---|---|---|
| Nav ngành hàng `.dk-dept` | 12/16 · 500 · HOA | 16/24 · 400 · thường | 16/24 · 400 · **HOA** |
| Nav danh mục `.dk-nav-link` | 12/16 · 500 · HOA | 14/20 · 400 · thường | 14/20 · 400 · **HOA** |
| Nhãn nhóm mega panel | 12/18 · 500 · HOA | **vốn đã HOA** (14/20 · 600 · ls 2.1px + gạch `::after` — idiom uppercase của chính bộ da) | không đổi |
| Hàng trong mega | thường | thường | thường |
| **Drawer `#menuSheet`** | **thường** (đo: toàn bộ w400 chữ thường) | thường | **thường** — không hoa |

- **Drawer desktop không hoa** là điểm khác bản mobile: ở mobile drawer CHÍNH LÀ menu nên skin-mt hoa nó; ở desktop menu chính là thanh nav + mega panel, drawer là nav phụ và skin-mt cũng để chữ thường → "giống skin-mt" nghĩa là để nguyên.
- **Giữ w400 có chủ ý** (khác mobile, nơi tôi kéo tab về 500): rule sẵn có của skin-mp khai 400 cho cả 4 selector nav **theo số đo thật của MR PORTER** (*"nav MR PORTER là regular"*, đánh dấu state bằng gạch chân + mực chứ không bằng độ đậm). Đổi chữ hoa không có lý do gì đảo chốt đó. Đây là chỗ duy nhất trong bộ da lệch cặp "500 đi với hoa" của skin-mt — lệch có căn cứ. Trạng thái đang chọn vẫn đọc được: mực `#0a0a0a` vs `#656565` + gạch 2px `.dk-nav-item::after`.
- Đo đối chứng: nội dung trang skin-mp không đổi (tiêu đề mục PDP `18/28 · 500 · thường`, brand card `14/20 · 500 · thường`); skin-mt cũng không bị chạm.

### Vá tiếp: menu skin-mp giữ chữ hoa KỂ CẢ khi đang thử cặp font (CẢ 2 BẢN)

User: *"sao khi tôi chuyển font mix thì lại mất uppercase nhỉ, ở skin-mp cho uppercase cả menu kể cả khi switch font"*.

**Nguyên nhân — bẫy specificity của `:is()`**: khối `html.font-pair :is(…)` (tắt nhãn hoa khi thử font) không phân biệt bộ da, và `:is()` lấy specificity của **nhánh đậm nhất**. Danh sách có nhánh mang **id** (`#filterSheet …`, `:has(#discountLines)`) nên cả khối đứng ở **(1,4,2)** ở mobile / (1,2,2) ở desktop — cao hơn rule menu của skin-mp (kể cả khi bám `#menuSheet` cũng chỉ (1,3,1)), nên nó đè mất chữ hoa.

**Đã thử 2 đường rồi bỏ, ghi lại để không ai lặp:**
1. *Bọc `:where()` cho các nhánh id để "gọn specificity" khối font-pair* → khối tụt xuống (0,4,2) và **lập tức làm skin-mt mất hành vi "thử font = bỏ hoa"** (nhãn menu + bộ lọc của nó bám id nên thắng lại). Đã hoàn tác, và ghi cảnh báo ⚠ ngay trên khối: **độ mạnh của khối này là có chủ ý, đừng dọn**.
2. *Nhồi selector cho đủ điểm* → chỉ hoà (1,4,2) rồi thắng bằng **thứ tự khai**, vỡ ngay khi có người chèn rule mới.

**Cách chốt**: rule riêng có `!important`, phạm vi hẹp đúng một thuộc tính · một trạng thái (`skin-mp` + `font-pair`) · đúng các phần tử menu:
- mobile: `html.skin-mp.font-pair #menuSheet .ms-tab` (đo được: ở khổ này font-pair chỉ giết chữ hoa của `.ms-tab`; hàng danh mục cấp 1 và tiêu đề màn con không nằm trong danh sách nên vẫn hoa — thêm selector nữa vào đây sẽ vô tình lật cả rule "hàng cấp 2 giữ chữ thường").
- desktop: `.navbar .dk-dept` · `.navbar .dk-nav-link` · `.navbar .dk-mega-grid > div > p` (cả 3 đều bị giết; nhãn mega hoa bằng utility `uppercase` trong markup nên cũng thua khối đó).

**Đo lại 4 tổ hợp × 2 bản** — đúng hết: `skin-mp` HOA · `skin-mp + font mix` **HOA** · `skin-mt` HOA · `skin-mt + font mix` **thường** (giữ đúng chốt 24/08 cho bộ da mặc định). Brand / footer / nhãn giỏ / bộ lọc của skin-mp vẫn về chữ thường khi thử font — đúng mục đích chế độ thử.

*Lệch sẵn có (không phải do đợt này)*: khi bật font mix, **hàng danh mục cấp 1 trong drawer của skin-mt vẫn hoa** vì selector đó (`.ms-view button > span`) chưa có trong danh sách của khối font-pair. Muốn nó cũng về chữ thường thì thêm 1 nhánh — nhưng phải thêm kèm rule giữ ngoại lệ cho skin-mp.

## Dọn TOÀN BỘ điểm lệch theo STYLE-RULES + bộ shadcn (24/08/2026, CẢ 2 BẢN)

Sau bản dò `_notes/AUDIT-TYPO-SHADCN-2026-08-24.md`, user: *"hãy sửa tất cả các điểm còn lệch vào luôn"*. Chi tiết luật + 4 quyết định mới ghi ở `STYLE-RULES.md` **Phần 7**; đây là phần "làm thế nào".

| Trục | Trước (mobile · desktop) | Sau |
|---|---|---|
| Cặp cỡ/dòng | 341 · 489 | **0 · 0** |
| Cỡ ngoài thang | 30 · 67 | **0 · 0** |
| Mực ngoài 3 bậc | 4 · 57 | **0 · 0** |
| Sắc viền ngoài 3 tầng | 66 · 62 | **0 · 0** |
| Bo góc ≠ 0 | 46 · 55 | **0 · 0** |
| Đổ bóng | 1 · 1 | **0 · 0** |
| Hex trong rule bộ da | 12 · 19 | **0 · 0** |

- **Khối `:where()` thay 7 rule "chỉ đổi cỡ"** (§4.2). Chìa khoá là `:where()`: cả khối có specificity `(0,1,1)` → thắng utility Tailwind `(0,1,0)` nhưng **nhường mọi rule tường minh của bộ da** `(0,2,1)+`, nên `.pc-brand` 14/20, `.dk-dept`/`.ms-tab`/`.search-tab`, tiêu đề panel bộ lọc và các khối scope theo màn giữ nguyên số **mà không phải chèn `:not()` cho từng chỗ**. Trước khi viết đã dò toàn file các cặp `text-[Npx]` × `leading-*` thật sự tồn tại và xác nhận **mỗi utility dòng chỉ gặp đúng một họ cỡ** — nên khai theo utility là đủ.
- **2 bản nay CÙNG một bảng remap** — desktop bỏ `16→14`, `18→16`, `22/24→18` và thêm `11→12`. Hệ quả thị giác ở desktop: tiêu đề trang (Thông tin / Đăng nhập / Tóm tắt đơn hàng) `18/32 → 24/32`, tiêu đề mục PDP `16/28 → 18/24`, dòng "Đã thông báo Bộ Công Thương" `11 → 12`.
- **Gộp `#cfcfcf` vào V2 bằng token** (`--unofficial-border-3: var(--general-border)`) — một dòng phủ 84 chỗ (ô tick `.chk`, vòng radio), không sửa từng selector.
- **`statusTag()` port sang desktop**: pill `bg-warning-subtle` + mực `#8a6100` + bo `9999px` (3 vi phạm trong 1 phần tử) → chấm 6px token `success/warning/info` + chữ 12/16 mực chính, dùng chung cho cả list và màn chi tiết. `STATUS_DOT` + `statusTag` khai giống hệt index.html.
- **`bg-destructive-subtle` bỏ nền toàn app** (trước chỉ trong màn giỏ) · **`rounded-[3px]`/pill dài/`#topFab`/`.quick-add` về bo 0** · **`#topFab` bỏ bóng cả `:hover`** (nhánh hover chỉ có ở desktop) · **"hết hàng" = gạch ngang + `#666`** thay vì hạ mực `#999`/`#a3a3a3` · **nhãn PBH cột tóm tắt desktop** nay hoa 500 như mobile.
- **31 hex trong rule bộ da → token** (`--general-primary` · `--general-border` · `--unofficial-border-1` · `--general-secondary` · `--general-background`); còn lại đúng khối định nghĩa token và `theme-dplus`.
- **Cách đo lại**: bộ scan là 1 hàm cài qua console, kiểm 12 luật cùng lúc (thang cỡ · cặp cỡ/dòng · weight · cặp 500⇄hoa · tracking · mực · mặt · sắc viền · độ dày viền · bo góc · bóng · danh mục chữ hoa), miễn trừ công cụ dev §5 và ô màu sản phẩm. Chạy: cài hàm → vòng qua danh sách màn → gom theo rule. **Nhớ đóng băng `.rise/.reveal` trước khi đo** (animation đang chạy trả số sai — bẫy verify 3).
- Không cần rebuild tailwind (chỉ thêm rule CSS + tái dùng class đã có trong build). `node --check` script inline của cả 2 file: OK.

## Port cụm ưu đãi sang DESKTOP + padding block khuyến mãi (24/08/2026, CẢ 2 BẢN)

Lệnh user: *"áp dụng cho bản desktop luôn nhé, với block Chương trình khuyến mãi bổ sung padding bottom: 12px luôn"*.

**1) Desktop — cụm ưu đãi ở cột tóm tắt (427px)**. Khổ này khác mobile ở chỗ khối thành viên VỐN ĐÃ đúng concept (title + radio, không khung bao) nên chỉ còn 3 việc:

| | Trước | Sau |
|---|---|---|
| Title khối thành viên | "Ưu đãi chương trình DAFC Rewards" · 12px w400 thường | **"Ưu đãi thành viên" · 12/16 · 500 · HOA** |
| Khối "Ưu đãi & khuyến mãi" | không có title; nhãn nằm TRONG nút `h-12` + icon ticket + cột số + `chevR` | **title `label[for]` cùng bậc** + ô `h-10` viền #dfdfdf `pl-3 pr-9` + `chevR` cách mép phải 12 + `span.pick-label` |
| Nhịp title → nội dung | 12 (`gap-3`) | **8** — bằng nhịp của chính `pickField` desktop (`gap-2`) |

- Ô chọn lấy khuôn `pickField` **của khổ desktop** (`pl-3`, không phải `pl-2` như mobile) nhưng **khác 2 điểm có ý thức**: `aria-haspopup="dialog"` (panel ưu đãi là hộp thoại, không phải listbox) và **không mang `data-pick-dd` / `data-pick-caret`** — 2 attribute đó là hook của dropdown desktop, gắn vào là handler dropdown bám nhầm.
- Hook nhãn nhóm của skin-mt desktop: `.dk-sticky-side :is(p, label).font-medium` — trúng đúng 2 title ("Tổng cộng" là `span` do rule khác lo; dòng điểm thưởng và support phiếu mua hàng không có `font-medium`). `#voucherTrigger > span.flex-1` đã rút khỏi rule 500+hoa, và khỏi danh sách `.font-pair` (ở CẢ 2 file).
- `voucherHint()` → `voucherPlaceholder()` + `voucherPickValue()`; `renderVoucherUI()` gọi `setPickLabel()`; i18n dict + 4 luật động (2 chiều, có tách số ít) khai giống hệt index.html.
- **KHÔNG port**: dải nhấn màu `#f2f2f2` của block tổng. Ở desktop khối tổng nằm trong **hộp trắng `bg-card` + viền** của cột phải (chốt 21/08 "cột phải desktop giữ hộp"), nên dải full-bleed không có chỗ áp; muốn nhấn thì phải là **tấm con inset** theo hệ lề của card — chờ user chốt.
- Đo sau sửa (1440, đã đăng nhập): 2 title `12/16 · 500 · HOA · #0a0a0a`, cả 2 khối `gap 8`, ô `393×40 · #dfdfdf · r0 · chữ 12/18`, chevron 14 cách mép phải 12, `aria-haspopup="dialog"`, `label[for]` đúng. Bấm title mở panel ✓ áp mã → mực chính ✓ gỡ mã → placeholder mực phụ ✓. 3 bộ da đều ra ô 40px với viền/bo của chính nó.
- `discountPanel()` trong desktop.html là **hàm chết** (tàn dư lúc fork; cột phải tự dựng markup) — **đã XOÁ khỏi desktop.html** (48 dòng, kèm 2 khối comment mô tả panel mobile): grep xác nhận không có lời gọi nào kể cả trong template literal, và nó còn khai TRÙNG id `discountLines`/`cartTotal`/`voucherTrigger`/`cartPointsVal` với cột phải đang chạy. Giữ nguyên `discountLinesHTML()` · `cartDiscountTotal()` · `cartTotalNow()` · `dafcRewards()` — cột phải đang dùng cả 4. Comment trong `dafcRewards()` sửa theo (trỏ `screenCART()` thay vì hàm vừa xoá); các chỗ nhắc `discountPanel` còn lại trong README là của **bản mobile** (index.html), hàm đó vẫn còn. Verify 1440 (`ckAuth=true`, `go('plp')`→`go('cart')`): `typeof discountPanel === 'undefined'`, cột tóm tắt đủ 2 title + ô "Chọn mã ưu đãi ( 6 )" + Tạm tính/Tổng cộng + nút Đặt hàng + accordion phiếu mua hàng, mỗi id đúng 1 lần, áp 2 mã → 186,057,000 − 2,740,000 = 183,317,000 khớp DOM, console sạch, `node --check` OK.

**2) Block "Chương trình khuyến mãi" — `padding-bottom` của PHẦN BỌC, 0 → 12px** (CẢ 2 BẢN).

User chỉ đích danh phần tử trong DevTools: `div.py-6.px-4.rise` (phần bọc, đang `padding: 0 16px` vì rule skin-mt zero cả `py`), **không phải** thẻ viền bên trong. Nên giá trị vào đúng rule đang giữ padding đó — `html.skin-mt [data-screen="cart"] div:has(> div > #promoPeek)`: `padding-bottom: 0` → **12px**. Dưới phần bọc là **dải xám của khối tổng**, nên 0 làm thẻ viền dán thẳng vào mép dải màu; 12 cho nó khe trắng bằng đúng khe trên (`margin-top: 12`).

Đo lại (đóng băng `.rise` trước khi đo — animation đang chạy trả số sai, bẫy verify 3): mobile khe trên **12** · khe dưới **12**; desktop y hệt 12/12. Thẻ viền bên trong giữ nguyên `py-2` — **bản thử đầu đổi padding của THẺ (`pt-2 pb-3`) đã gỡ khỏi cả 2 file**, nó không phải chỗ user chỉ.

`node --check` trên script inline của cả 2 file: OK. Không cần rebuild tailwind (`pl-3`/`pr-9`/`h-10` đều có sẵn trong build; thay đổi padding là CSS của bộ da, không thêm class).

## Giỏ hàng: TRỞ LẠI ô nhập mã gõ tay (09/09/2026, CẢ 2 BẢN)

Yêu cầu user (chốt của khách): *"ở trang Cart, bây giờ khách không dùng cái loại mở rộng ra bộ voucher cho chọn nữa mà quay lại kiểu truyền thống là hiện cái ô nhập sẵn luôn như trước đó bạn đã làm"*. Đảo lại chốt 17/08 (mục "Chọn ưu đãi kiểu sàn TMĐT") và chốt 24/08 (mục ô `pickField` ngay dưới) — hai mục đó nay là **ghi chép lịch sử**, không còn là hiện trạng.

**Đổi mặt nhập liệu, KHÔNG đổi cách tính**: catalog `VOUCHERS`, luật 1 mã/nhóm, `voucherEligible` / `voucherBlockReason` / `voucherValue` / `pruneVouchers` và các dòng `Giảm giá(<CODE>)` trong khối tóm tắt giữ nguyên 100%.

- **Markup mới** (trong `discountPanel()` ở index.html, trong cột "Tóm tắt đơn hàng" ở desktop.html): `label[for="cartCode"]` giữ nguyên title "Ưu đãi & khuyến mãi" + hàng `flex gap-1` gồm `input#cartCode` (placeholder "Nhập mã ưu đãi") và `button#applyCode` "Áp dụng" (`.btn-s`, khoá khi ô trống qua `bindApplyGate`) + `div#cartCodeList` cho hàng chip.
- **Khuôn lấy từ khối "Bạn có phiếu mua hàng?"** ngay dưới nút Đặt hàng, không dựng hàng riêng: đo trên trang chạy ra **đúng bằng nhau** — mobile input 254×40 · nút 85×40; desktop input 325×40 · nút 85×40 (desktop dùng `bg-input`, mobile `bg-background`, theo đúng ô `#pbh` của từng file). Title vẫn ăn rule nhãn nhóm skin-mt (đo 12/16 · 500 · HOA) vì rule bắt `:is(p, label).font-medium`, không bắt id.
- **Lỗi báo TẠI Ô, không bằng toast** (`setFieldErr`, gỡ khi gõ lại): "Mã không hợp lệ" · "Mã đã được áp dụng" · lý do chưa đủ điều kiện lấy thẳng `voucherBlockReason` ("Mua thêm 63,943,000đ để dùng mã"). Ô nhập bọc thêm 1 `div.flex-col` vì `setFieldErr` chèn `<p>` vào `afterend` — không bọc thì dòng lỗi rơi vào giữa hàng flex, nằm cạnh nút.
- **HÀNG CHIP quay lại** (`renderVoucherUI` giờ vẽ nó, thay việc đổi nhãn ô chọn): chốt 17/08 cố ý KHÔNG hiện chip vì "khối tóm tắt đã liệt kê từng dòng" — nhưng khi bỏ panel thì lập luận đó hỏng: dòng trong tóm tắt **không bấm được**, và mã nhóm ship không sinh dòng tiền nào (chỉ đổi "Phí vận chuyển — Miễn phí"), nên không có chip là áp xong **không còn đường lùi** ngoài tải lại trang. Chip dùng đúng khuôn `.pbh-badge` (mã + ✕), mã mang `data-i18n-skip`.
- **1 mã/nhóm giữ nguyên, nhưng cách xử khác panel**: gõ mã cùng nhóm với mã đang áp thì mã mới **đẩy** mã cũ ra (toast "Đã thay JUL500 bằng JUL1500") — người mua vừa tự gõ mã khác thì ý họ đã rõ, báo lỗi ở đây là chặn vô cớ. Cộng chồng giữa các nhóm vẫn được (đo: JUL1500 + HOATOC2H + BMSM10 → 3 chip, tổng 186,057,000 − 1,500,000 − 3,000,000 = 181,557,000 khớp DOM).
- **Enter = Áp dụng** (bàn phím cứng lẫn keyboard mobile).
- **ĐÃ GỠ HẲN**: `#vcSheet` (mobile bottom sheet / desktop `.dk-drawer`) + IIFE wire của nó, `voucherSheetHTML` · `voucherCardHTML` · `voucherSumOf`, 3 helper của hàng thu gọn (`voucherAvailCount` · `voucherPlaceholder` · `voucherPickValue`), `window.__openVoucherSheet`, và `.vc-panel` trong khối CSS chung của lớp nổi (index.html). Grep xác nhận 0 tham chiếu sống ở cả 2 file. Bản panel tra lại ở git history (có từ commit đầu `d81ffd7`).
- **i18n**: thêm 2 khoá (`Mã đã được áp dụng` ↔ `Code already applied`, `Gỡ mã` ↔ `Remove code`, đặt TRƯỚC `I18N_REV`) + 2 luật động mỗi chiều (`Đã áp dụng <CODE>` ↔ `<CODE> applied`, `Đã thay A bằng B` ↔ `A replaced by B`). Nhóm chuỗi của panel cũ **giữ trong từ điển** dù UI đã gỡ — khách đã đảo hướng khối này 2 lần, key nằm đó không tốn gì. Đo bản EN: label `Promotions & offers` · placeholder `Enter offer code` · nút `Apply` · lỗi `Invalid code` / `Spend 63,943,000đ more to use this code` · toast `JUL500 replaced by JUL1500`.
- **Verify** (server 8123, `go('cart')`, skin mặc định `skin-mt skin-li`): mobile 375 + desktop 1440 — mã sai, mã trùng, mã chưa đủ điều kiện, thay mã cùng nhóm, cộng chồng 3 nhóm, gỡ chip, và `pruneVouchers` (bỏ tick 4/5 món → subtotal 15,611,000 → cả 2 mã tự rớt, `#cartCodeList` về `hidden`, toast "Đã gỡ 1 ưu đãi do đơn không còn đủ điều kiện"). Console sạch, không tràn ngang, `node --check` trên cả 4 khối script inline: OK.
- **Ngoài phạm vi**: `desktop-atelier.html` (fork skin đóng băng 21/08) vẫn còn bản trigger + sheet của riêng nó — user chốt phạm vi "mobile và desktop". `desktop-neutral.html` / `desktop-editorial.html` không có khối này.
- **Hạn chế đã biết của kiểu truyền thống**: card "Chương trình khuyến mãi" chỉ in mã của WARDROBE REFRESH (JUL1500/1000/500); `BMSM5` · `BMSM10` · `HOATOC2H` · `SHIPQT` không có mã hiện ở đâu trên trang nên người mua phải biết trước — nội dung card là dữ liệu khách nên **chưa tự thêm**.

## Ô "Chọn mã ưu đãi" dựng lại theo component `pickField` (24/08/2026, mọi bộ da, CHỈ MOBILE)

> **ĐÃ BỊ ĐẢO 09/09/2026** — khối này giờ là ô nhập mã `#cartCode`, không còn hàng bấm `#voucherTrigger`. Giữ mục để tra lại lý do từng chốt; hiện trạng xem mục "Giỏ hàng: TRỞ LẠI ô nhập mã gõ tay".

User: *"cái chọn mã ưu đãi hãy improve ux ui lại cho gọn và chuẩn chỉnh theo component"*. Dự án **đã có** linh kiện đúng vai "bấm mở bottom sheet để chọn": `pickField` (ô chọn tỉnh/phường ở checkout, cùng cách PDP thay `<select>` bằng sheet) — nên dùng lại nguyên khuôn thay vì tự dựng hàng riêng.

**Đo 2 bên trước khi sửa (skin-mt, 375):**

| | hàng cũ | `pickField` (component sẵn) |
|---|---|---|
| Cao | **62** = 3 tầng đệm lồng nhau (card `py-1` + `div py-2` + button `min-h-9`) | **40** (`h-10`), 1 tầng |
| Vỏ | `div.bg-background.border.rounded-md` > `div.py-2` > `button` | button CHÍNH là ô, không div bọc |
| Viền | `border-border-1` #ececec — trên nền #f2f2f2 chênh 6/255, **mất vạch** | `border-border` #dfdfdf, đúng sắc viền thẻ radio bên trên |
| Trái | icon `ticket` 20 + nhãn mực chính | 1 slot `.pick-label` |
| Phải | cột số `( 6 )` mực phụ + `chevR` 14 mực phụ | `chevR` 14 **mực chính**, cách mép phải 12 (xem ghi chú mũi tên dưới) |
| Trạng thái | đổi CHỮ ở cột số | đổi **MỰC**: placeholder mực phụ ↔ giá trị mực chính (`setPickLabel`) |
| a11y | không | `aria-haspopup="dialog"` + `label[for]` |

**Sau khi dựng lại**: `label[for="voucherTrigger"]` (chính là title của khối) + `button h-10` viền #dfdfdf `pl-2 pr-9` + mũi tên phải `absolute right-3` + `span.pick-label`. Bỏ: 2 div bọc, icon ticket, cột số riêng, `rounded-md`; mũi tên chuyển từ TRONG nút (mực phụ, đứng sau cột số) ra ngoài dạng `absolute` **mực chính**. **Cao 62 → 40**, panel 469 → **447**. Bấm cả title cũng mở được sheet (label[for] gắn vào button — button là labelable element).

> **Mũi tên: `chevR` chứ không phải `chevD`** (24/08/2026, lệnh user, CẢ 2 BẢN). `pickField` gốc là dropdown/picker nên mũi tên XUỐNG đúng cho nó; còn ô này **mở một lớp khác** (`#vcSheet` — mobile trượt lên từ đáy, desktop trượt vào từ mép phải) nên mũi tên SANG PHẢI mới nói đúng việc. `chevR` cùng `14×14` với `chevD` nên vị trí `right-3` không đổi; icon có sẵn class `.acc-chev` nhưng nó chỉ xoay 90° khi nằm trong `.acc.open` — ở đây không có nên mũi tên đứng yên (đo `transform: none` ở cả 2 bản). **`pickField` và các dropdown size vẫn giữ `chevD`** — chỉ ô voucher đổi (grep xác nhận: `I.chevD` còn 5 chỗ ở index.html, 2 ở desktop.html, không chỗ nào là ô voucher).

- **Nội dung 1 slot, giữ trọn thông tin của chốt 17/08** (tên mục + con số): chưa áp = `Chọn mã ưu đãi ( 6 )` mực phụ · đã áp = `Đã áp dụng 2 mã` mực chính. Hết mã đủ điều kiện thì **bỏ luôn phần số** (trước đây in `( 0 )`).
- `voucherHint()` → **`voucherPlaceholder()` + `voucherPickValue()`**; `renderVoucherUI()` gọi thẳng `setPickLabel()` của component (lo cả chữ lẫn mực) thay vì tự set `textContent`.
- **i18n**: 2 luật động cũ (`( Đã áp dụng N )`) thay bằng 4 luật mới cho cả 2 chiều, có tách số ít (`1 code applied` / `N codes applied`). Đo cả 2 chiều: `Đã áp dụng 1 mã ↔ 1 code applied`, `Chọn mã ưu đãi ( 6 ) ↔ Choose a promo code ( 6 )`.
- **Áp cho MỌI bộ da** (component là chuyện toàn dự án, không phải da): skin-mt `h40 · #dfdfdf · r0 · chữ 12/18` · mặc định `h40 · #e5e5e5 · r2 · chữ 14/21` — mỗi bộ da ra đúng ô chọn của chính nó, giống ô ở checkout.
- Kiểm: bấm title mở sheet ✓ · chọn mã + Áp dụng → ô đổi sang mực chính ✓ · gỡ mã → về placeholder mực phụ ✓ · chưa/đã đăng nhập đều đúng khuôn ✓ · console sạch, không cần rebuild tailwind.

> **BẪY ĐÃ SẬP MỘT LẦN TRONG ĐỢT NÀY**: comment HTML nằm TRONG template literal thì **không được chứa dấu backtick** — tôi viết \`pickField\` trong comment và nó ngắt luôn chuỗi, cả `<script>` 544KB không parse được (`SyntaxError: Unexpected identifier 'pickField'`, `go is not defined`). Đã ghi cảnh báo ngay tại comment đó.

## Hai khối ưu đãi trong giỏ về MỘT concept: title + nội dung (24/08/2026, skin-mt, CHỈ MOBILE)

User: *"đồng bộ lại block Ưu đãi chương trình thành viên và ưu đãi khuyến mãi chung 1 concept hiển thị"* → chốt tiếp khi được hỏi: *"cho phần ưu đãi khuyến mãi thêm cái title tương tự ưu đãi thành viên, không đóng khung nguyên block ưu đãi thành viên nữa"*, và **radio giữ nguyên tại chỗ** (bác phương án dọn vào sheet).

**Đo trước sửa (375, đã đăng nhập) — 3 thứ lệch, không chỉ là vỏ:**

| | Ưu đãi chương trình DAFC Rewards | Ưu đãi & khuyến mãi |
|---|---|---|
| Nhãn | 12/16 · **400 · chữ thường** | 12/16 · **500 · HOA** (nằm TRONG nút) |
| Mô hình | mở sẵn, radio 1-trong-2 | thu gọn 1 hàng → sheet |
| Vỏ | thẻ trắng 343×193, **bên trong 2 thẻ radio có viền** → hộp lồng hộp 3 tầng | thẻ trắng 343×62 |

**Concept chốt: TITLE trần trên dải xám + NỘI DUNG trong mặt trắng, không khung bao cả khối.**

- **Markup** (mọi bộ da — vì title là nội dung): khối voucher được bọc `flex flex-col gap-2` + thêm `<p>` title "Ưu đãi & khuyến mãi" **cùng class với title khối thành viên**; nhãn cũ trong nút nhường vai đó nên hàng bấm đổi sang chữ hành động **"Chọn mã ưu đãi"** (hint `( N )` / `( Đã áp dụng N )` không đổi công thức). Title khối thành viên rút còn **"Ưu đãi thành viên"** — nhãn nhóm skin-mt là chữ HOA, mà tên chương trình bị §1.5 mục 4 cấm hoa, nên "DAFC Rewards" lùi vào toast/nội dung.
- **skin-mt CSS** (khối 6c, 5 rule): gap giữa 2 khối 8 → **16** (nhóm phải thoáng hơn nhịp title→nội dung 8) · gỡ khung bao khối thành viên (`background/border/padding` + gap 8) · `.opt` lấy **mặt trắng** (bỏ khung bao rồi thì thẻ radio nằm trực tiếp trên xám, markup không khai nền → xám-trên-xám) · 2 title = `p.font-medium` trong panel → **HOA + 500** · viền thẻ hàng bấm `#ececec` → **`--general-border` #dfdfdf** cho khớp thẻ radio (trên nền #f2f2f2 thì #ececec chỉ chênh 6/255, mất hẳn vạch).
- **Vì sao khung bao gỡ ở CSS chứ không ở markup**: giữ khung trong markup thì bộ da **mặc định vẫn là "bản Figma sống"** để đo đối chiếu (đúng cách đã dùng ở mục dưới).
- **Rule "3 chỗ +1 nấc weight" rút `#voucherTrigger > span.flex-1`**: nhãn đó lên thành title, hàng bấm về họ nội dung 12/18 · 400 do blanket lo.
- **Đo sau sửa** — 2 khối giống nhau tuyệt đối: title `12/16 · 500 · HOA · #0a0a0a`, wrap trong suốt/không viền/gap 8, hộp nội dung **trắng + viền #dfdfdf**, rộng đúng 343 (trước bị thụt còn 318 vì khung bao). Panel 486 → **469** (đã đăng nhập) / **276** (chưa đăng nhập, khối thành viên không render — vẫn đúng khuôn). Console sạch, **không cần rebuild tailwind** (dùng lại class có sẵn).
- **Kiểm chức năng**: sheet "Chọn ưu đãi" vẫn mở/đóng từ hàng bấm · radio vẫn đổi (`points → member`, dòng tóm tắt nhảy sang "Giảm giá thành viên −7.442.280đ") · EN dịch đúng: "Member offers" / "Promotions & offers" / "Choose a promo code" (2 chuỗi mới thêm vào `I18N` trước `I18N_REV`).
- **Chưa chạm desktop** và chưa kéo "Bạn có phiếu mua hàng?" về cùng khuôn (user để ngỏ): nó vẫn là accordion mở tại chỗ dưới nút Đặt hàng theo Figma 3428:55499 — nhãn thì đã cùng bậc 12/16 · 500 · HOA.
- **STYLE-RULES**: §1.5 mục 5 ghi lại vai — "Ưu đãi & khuyến mãi" chuyển từ nhãn-trong-nút sang **title của khối**, thêm title "Ưu đãi thành viên"; hàng bấm KHÔNG hoa.

## Block tổng tiền trong giỏ: NHẤN MÀU XUỐNG theo bản Figma (24/08/2026, skin-mt, CHỈ MOBILE)

User: *"ở skin-mt ở cart cái block sum giá nên nhấn màu xuống tương tự bản figma"* — đảo nhịp 21/08 cho `discountPanel` **trong suốt + kẻ trên**.

**Đo bản Figma trước khi sửa** (bật skin mặc định trên trang chạy — cùng markup, nên nó chính là số Figma):

| | block sum (`discountPanel`) | thẻ voucher bên trong | dải quà | canvas |
|---|---|---|---|---|
| Bản Figma (skin mặc định) | `#f5f5f5` full-bleed 375, **không kẻ trên** | trắng, viền `#f5f5f5` | `#fafafa` | trắng |
| skin-mt TRƯỚC | trong suốt + kẻ `#ececec` | trắng, viền `#ececec` | `#f7f7f7` | trắng |
| skin-mt SAU | **`#f2f2f2` full-bleed 375, không kẻ** | trắng, viền `#ececec` | `#f7f7f7` | trắng |

Figma đặt block sum **sâu hơn dải quà đúng 1 nấc** → map sang thang xám skin-mt giữ nguyên quan hệ đó: sum `--general-secondary` `#f2f2f2` · quà `--unofficial-accent-0` `#f7f7f7`. Không đẻ bậc xám mới — `#f2f2f2` chính là **mặt xám §2.2**, vốn đang dùng cho footer cùng màn.

- **Cách sửa**: gỡ HẲN override `background: transparent` trong khối 6c, để markup `bg-secondary` tự ăn token (màu qua token, không hardcode). Không thêm rule nào.
- **2 kẻ gỡ theo**: kẻ trên `discountPanel` + kẻ trên `#cartCta`. Hai kẻ đó chỉ có lý khi cả 2 khối đều trần trên nền trắng; nay **hai mép của dải màu tự ngăn**, giữ kẻ nữa là ngăn hai lần ở cùng một mép (§2.3 "hết đòn bẩy thì dừng") — và bản Figma cũng border 0 ở đúng 2 mép này. Các kẻ còn lại của trang giỏ ("Chọn tất cả" · giữa các món · trên `#orderGift`) KHÔNG đổi.
- **Không đổi**: dải quà `#f7f7f7`, thẻ khuyến mãi trắng + viền, toàn bộ typography/weight/hoa của cart. Cột phải desktop vốn là hộp `bg-card` + viền (đã có mặt riêng) nên `desktop.html` không sửa.
- **Đo sau sửa** (mobile 375, bust cache): panel `rgb(242,242,242)` · x=0 w=375 · `border-top: 0` · pad 24/16 — thẻ voucher trắng 343 nổi trên xám (đọc ra đòn bẩy 3 §2.3); `#cartCta` trong suốt, border-top 0; dải quà vẫn `#f7f7f7`; footer `#f2f2f2`. Console sạch. **Không cần rebuild tailwind** (không thêm class mới).
- **STYLE-RULES sửa TRƯỚC code**: §2.3 thêm **ngoại lệ ghi danh thứ 2** (danh sách mảng-màu nay đóng ở đúng 2 mục, cả 2 đều trong màn giỏ) + §2.2 ghi lại 2 vùng nền của màn giỏ.

## Tên thương hiệu THÔI chữ hoa (24/08/2026, CẢ 2 BẢN, skin-mt)

User: *"tên brand không cần uppercase toàn bộ"* — đảo chốt C1 (20/08 "brand = họ nhãn 500 + HOA"). Brand nay là **họ nội dung: 14/20 · 400 · chữ thường · mực chính `#0a0a0a`** ở cả 3 vị trí (`.pc-brand` trên card + hàng gợi ý + PDP + quick-add, và `.cart-row p:has(+ .del)` trong giỏ).

Vì sao đổi cỡ chứ không chỉ gỡ hoa: bỏ hoa thì theo §1.1 phải bỏ luôn 500 (cặp không tách rời), mà yêu cầu "brand nổi hơn tên sản phẩm" (18/08) vẫn còn hiệu lực. Đo trước khi sửa: brand chỉ hơn tên sp **34/255** về mực (`#0a0a0a` vs `#333`) — chính STYLE-RULES việc 8 đã kết luận mức đó "không đọc ra bậc". Nên phân cấp chuyển sang đúng đòn bẩy của họ nội dung: **lên 1 bậc cỡ** (brand 14 · tên sp 12). Ở desktop brand trong giỏ đã được **tách khỏi** selector dùng chung với "Tổng cộng"/trigger ưu đãi — 2 cái đó là NHÃN nên giữ trọn cặp 500 + hoa. STYLE-RULES §1.5 đã rút brand khỏi danh sách vai chữ hoa.
- **Nút về đầu trang `#topFab`** (góc phải dưới, ngay trên Settings FAB) — mọi màn, cả 2 bản. Xem mục "Nút về đầu trang".

## Tiền tố hệ đo size (21/08/2026, CẢ 5 BẢN kể cả 3 skin desktop)

Chip/hàng chọn size ở **PDP + quick add** (và dải size hover trên card của skin-mt) hiển thị kèm hệ đo trước số size kiểu mytheresa: **`IT 39`** thay vì `39` (hàng demo toàn Versace hệ Ý; ví dụ brief: `UK/US 30`, `IT 34`).

- Nguồn duy nhất: `SIZE_UNIT = 'IT'` + `sizeLabel(s)` (khai ngay dưới `OOS_MODE`) — chỉ prefix nhãn **thuần số**; `Onesize` / `90 × 90 cm` / dung tích `90 ml` giữ nguyên. Đổi hệ đo = sửa 1 hằng.
- Nhãn có tiền tố chảy vào cả dòng biến thể tấm xác nhận (`Nero , IT 40`) và label trigger dropdown.
- **Mobile** giữ `data-size` = số thô (logic `OOS_MODE`/`SIZE_LOW_STOCK` tra thẳng); **desktop** `data-size` = chính label nên 2 chỗ tra cứu trong `setCta`/dropdown phải bóc qua `sizeRaw()` — thêm size mới nhớ đi qua `sizeLabel`/`sizeRaw`, đừng tra map bằng nhãn có tiền tố.

## Chấm đếm giỏ: đổi đỏ → ĐEN (21/08/2026, CẢ 2 BẢN)

Đã thử phương án số đếm nằm giữa thân túi kiểu mytheresa (chữ trần 10px, không nền) theo ref user gửi, rồi user chốt **trả lại chấm đếm như cũ, chỉ đổi màu nền đỏ → đen**: `bg-destructive` → `bg-primary`, chữ trắng giữ nguyên, vị trí/kích thước (15×15, góc trên phải) giữ nguyên. Desktop áp cùng ngày ở cả 2 chỗ có badge: header (`dkNavRow`) + navbar trong drawer menu (`navRoot`). Cỡ 9px + `font-bold` là hiện trạng cũ giữ theo yêu cầu — vẫn lệch thang (T7 badge giỏ = 10px, bold bị cấm §1.1), chờ đợt remap Phần 6 STYLE-RULES. 3 bản skin desktop chưa áp.

## Trang giỏ skin-mt: NỀN TRẮNG, KHÔNG ĐÓNG HỘP — theo hướng bộ da editorial (21/08/2026, CẢ 2 BẢN)

User đảo 2 chốt 20/08 ("nền xám nhấn block" + "đóng hộp maison kitsuné"): *"style ở cart kiểu của editorial đang đẹp, dùng nền trang cart màu trắng, cái nào quà tặng thì nhấn màu xuống, không bị trong khuông khổ — dùng style đó áp dụng lại cho skin-mt"*. Chuẩn đích ĐO từ skin-mp trên trang chạy rồi áp cho skin-mt bằng token của chính nó:

- **Gỡ**: rule canvas xám `body/#viewport` (nền về trắng mặc định) · bg trắng 3 phần HỘP 1 + viền bao đỉnh/đáy + lề bù tiêu đề (desktop) + khe `mt-12` (mobile) · nhánh "đáy hộp di chuyển" `#cartList:has(...)` · bg + viền đáy `#orderGift` · **HỘP 2 mobile**: `discountPanel` về **trong suốt** (markup gốc `bg-secondary` xám) *(24/08 ĐẢO: panel lấy lại `bg-secondary` #f2f2f2 theo bản Figma)*, `#cartCta` bỏ viền đáy + pb-24 · rule dải mờ `#cartStickyCta` fade về #f2f2f2 (gradient markup fade trắng lại đúng).
- **Giữ / thêm kẻ**: mỗi vùng ngăn nhau đúng MỘT kẻ `--unofficial-border-1` (#ececec): "Chọn tất cả"──kẻ──danh sách · kẻ giữa các món · kẻ trên `#orderGift` · ~~kẻ trên khối tổng + kẻ trên `#cartCta`~~ *(2 kẻ này ĐÃ GỠ 24/08 khi block tổng lấy lại mặt xám — xem mục "Block tổng tiền trong giỏ")*. Thẻ khuyến mãi giữ viền (thẻ bấm được, không phải hộp). **Cột phải desktop giữ nguyên hộp** `bg-card` + viền — như chính skin-mp.
- **Không đổi**: tấm quà accent-0 (mục dưới), toàn bộ khối typography/weight/hoa của cart.
- Đo sau sửa (cả 2 bản): body trắng, mọi khối cột trái `transparent`, kẻ đúng 4 vị trí, tấm quà #f7f7f7, console sạch. STYLE-RULES §2.2 đã ghi đè câu "canvas giỏ về #f2f2f2" (hết hiệu lực).

## Quà tặng trong giỏ: nền nhấn nhẹ + tên chương trình THÔI chữ hoa (21/08/2026, CẢ 2 BẢN, skin-mt)

User đảo 2 ý của chốt 20/08 "nhấn bằng chữ, không bằng mảng màu": *"quà tặng cần nhấn màu xuống một xíu để nổi bật, tên chương trình không cần uppercase"*.

- **Nền khối quà — chốt sau 3 nhịp**: (1) `--general-secondary` full-bleed khi cart CÒN hộp → bác (*"nhấn nhẹ thôi, như cắt ngang"*); (2) tấm con accent-0 inset 16px + ẩn spacer → bác nốt sau khi cart về nền trắng không hộp (*"cho phần nhấn màu dài bằng cả thẻ chứ không thụt vô — tham khảo skin-mp"*); (3) **CHỐT: đúng nguyên bản skin-mp** — skin-mt KHÔNG đè rule nào lên `.gift-group` nữa, markup `bg-accent-0` tự ăn token `--unofficial-accent-0` (#f7f7f7 ở bộ da này), **full-bleed dài bằng thẻ**, spacer `w-4` giữ nguyên nên nhãn/ảnh quà thẳng cột ảnh món (x=40). Hợp lý vì bối cảnh đã đổi: trang phẳng thì dải nhấn là một HÀNG trong dòng chảy, không cắt ngang hộp nào. Đo cả 2 bản: tấm rộng đúng bằng `.cart-row` (375/750px), ảnh thẳng hàng. Khối bare trong `#orderGift` giữ không nền.
- **Tên chương trình**: gỡ rule `text-transform: uppercase` + gỡ `font-weight: 500` (blanket `.font-*` trả markup `font-medium` về 400 — §1.1 cặp 500+hoa không tách rời, bỏ hoa là bỏ 500). Đo cả 2 bản: `12/16 · 400 · không hoa · mực chính`.
- **STYLE-RULES đã cập nhật cùng lượt** (luật sửa trước, code sửa sau): §1.5 vai 4 rút "tên chương trình quà tặng" khỏi danh sách hoa; §2.3 thêm ngoại lệ ghi danh mảng-màu cho `.gift-group` (danh sách đóng).

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

> **ĐÃ BỊ ĐẢO 09/09/2026** — khách quay về ô nhập mã gõ tay, sheet/panel "Chọn ưu đãi" đã gỡ khỏi cả 2 bản. Phần TÍNH (catalog, 1 mã/nhóm, điều kiện, tự rớt mã) vẫn đúng như mô tả dưới đây.

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

#### Drawer mobile — đồng bộ cấp 2 với nav desktop (19/08/2026, yêu cầu user, CHỈ `index.html`)

User: *"submenu level của mobile vẫn chưa được đồng bộ với menu desktop nhé (uppercase theo bản desktop)"*. Hai bản dùng **chung `MENU_DATA`** nên map được 1-1 từng cấp:

| Cấp | Mobile (`#menuSheet`) | Desktop | Trước | Sau |
|---|---|---|---|---|
| 1 · ngành hàng | `.ms-tab` | `.dk-dept` | HOA | — |
| 1 · danh mục (màn gốc) | hàng trong `.ms-view` | `.dk-nav-link` | HOA | — |
| — · **tiêu đề màn con** | `navSub()` `<p>` | `.dk-nav-link` đang mở panel | **thường, 400** | **HOA, 500** |
| 2 · **nhãn nhóm** | `<p>` trong `.ms-view` | `.dk-mega-grid > div > p` | **thường, 400, `#666`** | **HOA, 500, `#000`** |
| 2 · **hàng nội dung** | hàng trong `.ms-view` màn con | đường dẫn trong mega panel | **HOA** | **viết hoa chữ đầu** |

Lấy đúng bộ số của phần tử desktop tương ứng — đo lại **cả 2 bản, bộ da `skin-mt`**:

| | mobile sau khi sửa | desktop |
|---|---|---|
| tiêu đề màn con / nav link | `12px · 500 · uppercase · ls .5 · #000` | `12px · 500 · uppercase · ls .5` |
| nhãn nhóm | `12px · 500 · uppercase · ls .5 · #000` | `12px · 500 · uppercase · ls .5 · #000` |
| hàng nội dung cấp 2 | `12px · 400 · none · ls .5` | `12px · 400 · none · ls .5` |

**Không khai `font-size`**: thang chữ (mục 5) đã kéo sẵn tiêu đề màn con `16 → 12`, nhãn nhóm vốn đã 12. Chữ hoa bằng `text-transform`, **không gõ hoa vào chuỗi** (mất bản dịch i18n). Selector bám cấu trúc sẵn có, **không thêm hook nào vào markup**: `#menuSheet .glass-95 > p` (chỉ `navSub` có `<p>` trong thanh nav — `navRoot` chỉ có span/img/button) và `#menuSheet .ms-view > p` (mọi con trực tiếp khác của `.ms-view` đều là `<button>`).

> **Hàng nội dung cấp 2 — user làm rõ ở lượt sau:** *"từ menu bản mobile chọn vào quần áo > đẩy sang menu level 2, trên desktop là viết hoa chữ cái đầu nhưng trên mobile đang viết uppercase toàn bộ"*. Đúng: hàng ở màn con lấy **đúng `sub.items`** mà desktop đổ vào mega panel, nên phần tử tương ứng là **đường dẫn trong panel** (`12px · 400 · none`), không phải nav link. Rule chữ hoa ở mục 4 bám `.ms-view button > span` nên phủ cả 2 màn — tách bằng **`:has()`** thay vì thêm class vào markup: màn gốc có `.ms-tab` (deptTabs) → giữ hoa; màn con có `.glass-95 > p` (navSub) → gỡ hoa.
> **Chỉ đè `text-transform`**, không bỏ cả rule: bỏ thì `line-height` rơi về `leading-5` (20px) làm hàng cao thêm 4px, lệch màn gốc. Đo lại: hàng cấp 1 và cấp 2 đều **48.8px** ở `skin-mt`, **52px** ở 2 bộ da kia.

**Bỏ dòng "Tất cả …" khỏi màn con** (19/08/2026, yêu cầu user) — màn con vào thẳng danh mục cấp dưới, không còn dòng dẫn cấp trên nào. Đúng bằng cách 2 bản desktop đã làm với mega panel hôm 18/08: **data `MENU_DATA[].cats[][1].all` giữ nguyên**, chỉ thôi render; bật lại tốn 1 dòng markup. Helper `headRow` **vẫn dùng** cho dòng "Trang chủ …" ở màn gốc — đừng xoá. Là sửa **markup** nên áp cho cả 3 bộ da; đo lại `default`/`editorial`/`mytheresa` đều `còn dòng "Tất cả …" = false`, hàng đầu màn con là danh mục con thật.

> ⚠ **Khác desktop một điểm — có mất một đường đi.** Ở desktop bỏ dòng này không mất gì vì chính nút danh mục ở subheader đã trỏ tới PLP cấp đó. Ở **mobile** hàng danh mục chỉ mang `data-ms-sub` (mở màn con), **không điều hướng** — nên drawer nay không còn lối vào PLP "cả danh mục" (vd `{title:'Tất cả quần áo', crumbs:['Nam','Quần áo']}`). Muốn trả lại thì gắn `catAttrs` lên tiêu đề màn con. **Đã báo user.**

> **Bẫy đã dính khi viết comment này:** gõ **dấu backtick** trong comment nằm giữa template literal của `render()` → đứt chuỗi, cả file `SyntaxError` và không chạy. Cảnh báo vốn đã ghi ở 3 chỗ khác trong 2 file mà vẫn dính. Nhân đây: sau khi sửa phải **bust cache** (`?bust=n`) mới thấy bản mới — `location.reload()` vẫn trả bản cũ, làm mình đọc nhầm là chưa sửa được.

**Weight menu lv0 — ĐÃ CHỐT 19/08/2026:** *"độ dày của menu lv0 (men, women, beauty) cần đồng bộ về fontweight so với bản desktop"*. Lệch này có từ 18/08: số đo mobile thật của mytheresa là **400**, còn hàng dept 2 bản desktop đã chốt **500** (chữ hoa 12px Montserrat mảnh hơn AvenirNextLTPro của họ nên 500 bù lại đúng độ dày mắt thấy). Để 2 bản lệch nhau ở **cùng một hàng menu** là lỗi nặng hơn lệch số đo → `.ms-tab` lên **500**, lấy desktop làm chuẩn.

| | mobile `.ms-tab` | desktop `.dk-dept` |
|---|---|---|
| weight | **500** ✅ đồng bộ | **500** |
| cỡ chữ | `14px/18` | `12px/16` — **lệch có chủ ý**, mỗi khổ theo số đo của chính nó; user chỉ yêu cầu fontweight |
| case · tracking | uppercase · `.5px` | uppercase · `.5px` |

**Một độ đậm ở MỌI state**: markup có `font-medium` khi active và `font-normal` khi nghỉ, rule đè cả hai — đúng cách desktop làm với `[aria-current]`. Đo lại vòng 3 bộ da: `skin-mt` ra `14px/18 w500 uppercase` cho **cả 3 tab**, 2 bộ da kia giữ nguyên `16px` w500/w400 không hoa.

#### Hàng tab ở màn Search cũng phải theo (19/08/2026, CẢ 2 BẢN)

User: *"phần nội dung search bên dưới thanh search chưa được uppercase đồng bộ (nam nữ làm đẹp) giống menu"*. `.search-tab` là **hàng tab y hệt** — cùng 3 nhãn, cùng `h-10`, cùng vai "chọn ngành hàng" — nhưng **không có rule bộ da nào** ở cả 2 file, nên đứng cạnh menu chữ hoa là lệch hẳn.

| | `.search-tab` trước | sau |
|---|---|---|
| `index.html` | `12px · 400 · thường` | **`14px/18 · 500 · HOA · ls .5`** = hệt `.ms-tab` |
| `desktop.html` | `16px · 500/300 · thường` | **`12px/16 · 500 · HOA · ls .5`** = hệt `.dk-dept` |

Mỗi file lấy đúng bộ số của hàng menu lv0 **của chính nó** (mobile 14px, desktop 12px — mỗi khổ theo số đo riêng, giống hệt cách `.ms-tab` vs `.dk-dept` đang làm). Bản mobile gộp `.ms-tab` + `.search-tab` chung một rule vì 2 class này vốn đã đi cặp ở rule transition đầu file; bản desktop chỉ còn `.search-tab` (drawer `#menuSheet` ở đó là code chết). Chiều cao không đổi: vẫn `h-10` = 40px ở mọi bộ da.

> ### ⚠ 2 LỖI TỰ GÂY TRONG ĐÚNG 1 LẦN SỬA NÀY
> **1. Viết text vào comment SAU dấu `*/` đã đóng** → text lọt ra ngoài comment, CSS đứt, **toàn bộ rule sau đó bị vứt** (kể cả rule `.ms-tab` vốn đang chạy tốt). Triệu chứng: `document.styleSheets` chỉ còn mỗi rule `transition`, bộ da nhìn như không ăn. Đây là biến thể của bẫy "backtick trong comment" đã ghi ở mục menu — **mọi lần sửa comment trong khối `<style>`/template literal đều phải kiểm lại rule còn parse không**.
> **2. Bẫy specificity — lần thứ 3 của dự án** (2 lần trước với `.pc-brand`). Rule `html.skin-mt .search-tab` = **(0,2,1)**, **cùng hạng** với 2 khối blanket ở mục 5 (`.text-[16px]` và `.font-light/…`) mà 2 khối đó viết **SAU** → chúng thắng. Kết quả rất dễ đọc nhầm: `text-transform` **ăn** (blanket không khai nó) nhưng cỡ chữ và weight **bị đè** → ra `12px/400 HOA`, trông như "đã uppercase rồi mà vẫn sai".
> Sửa: viết **`button.search-tab`** → (0,2,2), thắng cả hai. `.ms-tab` không dính vì đã có `#menuSheet` → (1,2,1).
> **Luật rút ra: mọi rule bộ da nhắm cỡ chữ/weight mà chỉ có 1 class thì PHẢI nâng specificity** (thêm tag hoặc id), không thì khối blanket mục 5 nuốt.

> `desktop.html` **cũng có** một bản `#menuSheet` y hệt (dải desktop hẹp) và bộ da `skin-mt` ở file đó **không phủ chữ hoa cấp nào**. **Không sửa** vì drawer đó là **code chết**: handler `[data-menu-open]` có nhưng không markup nào mang thuộc tính đó, không lối nào mở được.

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

### Bộ lọc: hệ gạch đồng bộ (19/08/2026, CẢ 2 BẢN)

User: *"ở phần filter chưa được update theo style của mytheresa ở cả 2 phiên bản, hãy update theo style và lưu ý chúng ta dùng underline màu nhẹ nhàng đồng bộ"*.

> ### ⚠ LỖI TỰ GÂY, USER BẮT — "bê nguyên style của mytheresa vào"
> Bản đầu mình **thay linh kiện của dự án bằng linh kiện của họ**: nút "Bộ lọc" outline → chữ trần (ẩn cả icon sliders) · checkbox 16px bo góc có dấu ✓ → ô 8×8 vuông tô đen đặc · chip size chọn (viền primary) → tô đen chữ trắng · "Đặt lại" outline → nền `#f2f2f2` · bỏ rail dọc cây danh mục · bỏ grabber bottom-sheet · tiêu đề panel → 16px CHỮ HOA · hàng tiêu đề mục 72 → 52.
> User bắt lỗi: *"context là dựa trên style của mytheresa và dùng style có sẵn của tôi để điều chỉnh chứ không phải bê nguyên style của mytheresa vào"* — **mytheresa là THAM CHIẾU, linh kiện phải là của dự án.** Đã **trả lại nguyên trạng cả 8 thứ**: `btn-o` · `.chk` · `.chip` · rail Figma · grabber · thang chữ của mục 5 (bộ da vốn đã tự hạ 18→16 ở desktop, 16→12/14 cho nhãn mục — đó là hệ chữ CÓ SẴN, không phải rule mới).
> Bài học: đo trang tham chiếu xong thì bước tiếp theo là **soi xem hệ của mình còn thiếu chỗ nào**, chứ không phải chép số đo của họ đè lên component của mình.

**Còn lại đúng MỘT việc — cũng là việc user nêu đích danh:** bộ lọc là chỗ **duy nhất** trong `skin-mt` chưa theo hệ gạch đã chốt 18/08/2026, nên kéo nó về `#ececec` — **cùng một sắc, cùng một vai** với vách 2 hàng nav và vách hàng danh mục trong menu.

| Chỗ | Trước | Sau |
|---|---|---|
| Hairline dưới thanh lọc (`.filterbar::after`) | `--general-border` = `#dfdfdf` | **`#ececec`** |
| Gạch giữa các mục trong panel | **không có** — 6 mục chạy liền một dải | **`1px #ececec`** |
| Vách header drawer (`border-b`) — *chỉ desktop* | `#dfdfdf` | **`#ececec`** |
| Vách chân panel/drawer | mobile: không có · desktop: `#dfdfdf` | **`1px #ececec`** |

Mục **cuối** cố ý không kẻ: chân panel đã có gạch trên, kẻ nữa là 2 vạch sát nhau. CSS gọn còn **3 rule** (mobile) / **4 rule** (desktop), không đụng markup/layout.

**Đo lại — cả 2 file, vòng `mytheresa → mặc định → MR PORTER → mytheresa`:** mọi linh kiện trở về **đúng giá trị gốc** ở cả 3 bộ da (nút `h36` viền `1px` pad `16`, icon sliders `block`, checkbox `16px` + dấu ✓ `block`, rail `1px #d9d9d9`, chip/nút Đặt lại viền `1px`, tiêu đề mục `72px`, `#sortBtn` pad `16`). Chỉ 4 chỗ gạch đổi theo bộ da: `skin-mt` ra `#ececec`, mặc định `#e5e5e5`, MR PORTER `#e0e0e0`; gạch mục ra `1px|1px|1px|1px|1px|0px` ở `skin-mt` và `0px × 6` ở 2 bộ da kia. Đúng ở **cả 2 biến thể thân bộ lọc** (thời trang / làm đẹp, đều 6 mục).

> **Bẫy khi đo — pane Browser không vẽ frame thì `backgroundColor` trả giá trị SAI.** `getComputedStyle(el).backgroundColor` trên nút "Bộ lọc" trả `rgb(255,255,255)` **kể cả khi gán inline `background-color: rgb(1,2,3) !important`** — tức số đọc ra không phải giá trị thật. Các thuộc tính **layout** (height/padding/border-width/font-size) vẫn đúng. Cách vòng qua: viết hàm dò **người thắng trong cascade** (duyệt `document.styleSheets`, lọc rule `el.matches()`, tính specificity + `!important` + thứ tự) rồi đọc giá trị từ rule thắng. Đây là **bẫy thứ 5** của việc đo trong pane này — 4 cái trước ghi ở mục "Dựng 17 màn desktop vào Figma" và cảnh báo tắt transition ở trên.

## Quick add riêng cho `skin-mt` (19/08/2026, CẢ 2 BẢN)

Yêu cầu user, **chỉ bộ da Mytheresa** — 2 bộ da kia giữ nguyên nút giỏ tròn + dialog quick add.

### Desktop: rê chuột vào ảnh → hiện dải SIZE

Markup `.pc-sizes` dựng cho **mọi bộ da**, việc bật/tắt do CSS gác → JS không phải biết đang ở bộ da nào.

| | |
|---|---|
| vị trí | đè đáy ảnh, nền trắng `.94`, trượt lên 6px khi hiện |
| liệt kê | **đủ size, kể cả size đã hết** (user yêu cầu rõ) — size hết: chữ `#999` + gạch ngang |
| bấm size **còn hàng** | thêm thẳng vào giỏ với đúng size đó → tấm xác nhận thả xuống. Không mở dialog nữa: màu đã chọn sẵn trên card, size là mảnh cuối cùng còn thiếu |
| bấm size **đã hết** | mở khung **"nhận thông báo khi có hàng"** — dùng lại `__openNotify` của PDP, không dựng form mới |
| nút giỏ tròn | **ẩn** ở bộ da này |

- Size hết **không dùng `[disabled]`** — disabled thì mất luôn sự kiện click, mà ta cần click để mở khung nhận thông báo. Dùng class `.is-oos` + `data-oos`.
- Ẩn nút giỏ tròn vì nó và dải size **cùng một vai** "thêm nhanh", và chồng đúng chỗ nhau (góc phải-dưới). `display` của nút là inline style nên phải `!important`.
- Handler bấm size `e.stopPropagation()` — không thì click xuyên lên card và nhảy sang PDP. Nối ở **cả 2 chỗ** có card: `wireProductCards()` và lưới gợi ý trong layer tìm kiếm.
- Màu trong dòng biến thể đọc từ **ô swatch đang chọn trên card**, để khớp thứ user đang nhìn.

**Đo lại**: lúc nghỉ `opacity 0 · pointer-events none`; 6 size `39 40 41 42 43[HẾT] 44[HẾT]`; bấm `41` → giỏ `5→6`, **ở lại PLP**, tấm xác nhận ghi `Broken Jewels , 41`; bấm `43` → giỏ **không đổi**, khung nhận thông báo mở, không điều hướng. Bộ da khác: dải size `display:none`, nút giỏ `display:flex`.

#### Hình thức tấm: đo thật hugoboss.com (user gửi làm tham chiếu)

Đo `hugoboss.com/us/men-clothing` — tấm `.product-tile-plp__quickshop` của họ (phải **giả lập hover** mới có size, vùng `js-product-tile-quickshop-sizes` rỗng cho tới lúc đó):

| | HUGO BOSS | Ta |
|---|---|---|
| tấm | `absolute`, ghim **đáy tile**, rộng hết bề ngang | y hệt |
| nền | `rgba(249,249,249,.9)` · `backdrop-filter: none` | `rgba(249,249,249,.82)` + **`blur(7.5px)`** |
| lưới size | `grid` · `repeat(auto-fill, minmax(54px,1fr))` · `gap 4` | `grid` · `repeat(auto-fit, minmax(44px,1fr))` · `gap 4` |
| nhãn | 14/17.5 · 400 · **không viền** · căn TRÁI | **outline như chip PDP** · căn GIỮA |
| size hết | `#999` | `#999` + gạch ngang |

**Lệch có chủ ý, đều theo yêu cầu user:**
1. **Thêm background-blur** — họ chỉ có nền đục 90%, `backdrop-filter: none`. Dùng đúng `7.5px` của dự án (cùng số với `.navbar` / `.glass-95`), nên hạ độ đục xuống `.82` cho lớp mờ đọc ra được.
2. **Căn giữa** nhãn — họ căn trái.
3. **Lưới CỐ ĐỊNH 4 cột** — họ `auto-fill minmax(54px,1fr)` nên số cột đổi theo bề ngang tile. 4 cột cố định thì ô size rộng bằng nhau ở **mọi mật độ lưới**, bộ 6 size xuống đúng 2 hàng.

#### Vòng chỉnh tiếp theo (cùng ngày, yêu cầu user)

| Yêu cầu | Đã làm |
|---|---|
| "1 line sẽ có **4 ô size**" | `grid-template-columns: repeat(4, minmax(0,1fr))` |
| "**size theo bên trong pdp** luôn" | dải size đọc thẳng `PDP_DATA[*].sizes` |
| "chỉ có 1 size thì hiện **Onesize ở giữa**" | **dưới 4 size** → class `is-few` (xem dưới) |
| "**bỏ outline**, hover nổi lên dạng secondary" | `border: 0` · nền trong suốt · hover — xem dưới |
| "nền dùng **bộ màu tương tự header**" | chép nguyên công thức `.glass-95` của `.navbar`, viết bằng **token** |
| "hover thì **tương tự cục nam nữ làm đẹp**" | chép nguyên 2 khai báo của `.ghost-hover:hover` mà `.dk-dept` đang dùng |

#### Nền + hover lấy thẳng từ header (19/08/2026, yêu cầu user)

Trước đó nền tấm là `rgba(249,249,249,.82)` **chép cứng của hugoboss** — đứng yên ở mọi bộ da và không ăn nhập với header của chính mình. Nay:

```css
background: var(--general-background-blur);                                  /* fallback không color-mix */
background: color-mix(in srgb, var(--general-background) 75%, transparent);  /* 21/08: hạ độ đục -> 75% */
backdrop-filter: blur(7.5px);            /* đúng số của .navbar */

/* = đúng .ghost-hover:hover mà cụm Nam/Nữ/Làm đẹp (.dk-dept) dùng */
.pc-size:hover { background: var(--unofficial-ghost-hover); color: var(--general-primary); }
```

> **Lịch sử nền tấm này qua 3 nấc:** bản đầu chép công thức `.glass-95` → user chỉ ra hệ token **có sẵn token dành riêng cho mặt phẳng blur** `--general-background-blur` (`#ffffffe5` ≈ 90%; mode GM = `#f5f5f5`) nên đổi sang token → **21/08/2026 user yêu cầu "quick add desktop giảm opacity xuống 75%"**: token cố định ~90% không chỉnh nấc được nên quay lại công thức `color-mix` của họ `.glass-*` nhưng pha **trên token nền** (mode GM vẫn đổi theo), giữ dòng token làm fallback cho trình duyệt không có color-mix.

> **Chép 2 khai báo hover thay vì gắn class `.ghost-hover` vào markup.** Rule nghỉ của `.pc-size` là **(0,2,1)**, còn `.ghost-hover:hover` chỉ **(0,2,0)** — gắn class cũng vô dụng vì `background: transparent` lúc nghỉ sẽ đè mất hover.

**Đo ở `skin-mt`** (đo lại 21/08 sau khi hạ độ đục): tấm size ra `color(srgb 1 1 1 / 0.75)` + `blur(7.5px)`; header `color(srgb 1 1 1 / 0.95)` + cùng blur (nav dùng `.glass-95` 95%, tấm quick add 75% — **cùng một hệ, hai vai khác nhau**). 2 rule hover in ra **trùng từng khai báo**:
`.ghost-hover:hover {background: var(--unofficial-ghost-hover); color: var(--general-primary);}`
`html.skin-mt .pc-size:hover {background: var(--unofficial-ghost-hover); color: var(--general-primary);}`
Bố cục không đổi: **4 cột × 2 hàng · viền ô 0px**. Console sạch trên tab mới.

> **Size theo PDP là sửa một BUG DỮ LIỆU, không chỉ là thẩm mỹ.** Trước đó card dùng chung `SIZES` (39–44) cho **mọi** sản phẩm — sai với 2 món: `idx 1` là **khăn lụa** (`90 × 90 cm` / `84 × 5 cm`), `idx 2` là **túi Emblème** (`Onesize`). Nay `SIZES_BY_PRODUCT` map từ `PDP_DATA[*].idx` (chính là index trong `PRODUCTS`) nên **không đẻ thêm bảng size thứ hai** — sửa PDP là card đổi theo.

**Đo lại từng sản phẩm:**

| idx | Sản phẩm | Size trên card | Bố cục |
|---|---|---|---|
| 0 | Đầm lụa mini | `39 40 41 42 43[HẾT] 44[HẾT]` | 4 cột × 2 hàng, ô 76px |
| **1** | **Khăn lụa** | **`90 × 90 cm` · `84 × 5 cm`** | 1 hàng |
| **2** | **Túi Emblème** | **`Onesize`** | `is-single`, 1 ô **127px căn giữa** |
| 3–5 | Giày | `39…44` | 4 cột × 2 hàng |
| — | Nước hoa | `90 ml` | `is-single`, 127px căn giữa |

Ô size: `viền 0px · nền trong suốt · cao 36 · chữ 12px w400`. Bấm chạy đúng theo từng bộ: khăn lụa → biến thể `Broken Jewels , 90 × 90 cm`; túi → `Verde Menta , Onesize`; size hết → giỏ không đổi, khung nhận thông báo mở. Console sạch trên tab mới.

#### Ít size: căn giữa + đủ chỗ cho nhãn (19/08/2026, user báo)

*"trường hợp ít size như khăn lụa thì tràn nó ra căn center chứ, với đảm bảo phải hiện đủ nội dung bên trong"*. Lưới **4 cột cứng** bóp mọi ô về **76px** — mà nhãn khăn lụa cần rộng hơn:

| | |
|---|---|
| bề rộng chữ thật `90 × 90 cm` | **72px** |
| lòng ô CŨ (76 − pad 8) | **68px** → **thiếu 4px**, chữ xuống dòng rồi bị cắt trong ô cao 36 |
| lòng ô MỚI (96 − pad 16) | **80px** → đủ |

Đổi `is-single` (chỉ bắt 1 size) thành **`is-few`** cho **mọi trường hợp dưới 4 size**:

```css
grid-template-columns: none;              /* huỷ 4 cột, không thì ô vẫn xếp vào đó */
grid-auto-flow: column;
grid-auto-columns: minmax(96px, auto);    /* auto = nở vừa chữ · 96px = sàn cho ô lẻ */
justify-content: center;
```

Kèm `white-space: nowrap` + pad ngang `4px → 8px` trên `.pc-size`: không có `nowrap` thì nhãn 2 chữ tự xuống dòng trong ô cao 36 và mất dòng dưới.

**Đo lại**: khăn lụa 2 ô **96px, 1 hàng, lệch tâm 0px, không cắt chữ**; `Onesize` và `90 ml` cùng vậy; bộ 6 size vẫn **4 cột × 2 hàng, ô 76px, không cắt chữ**. Console sạch trên tab mới.

> Hàng thứ 2 của bộ 6 size (2 ô lẻ) vẫn **căn trái theo cột**, không căn giữa — giữ nhịp cột với hàng trên. Đây là hàng ĐẦY 4 ô nên không thuộc diện "ít size".

### Mobile: bỏ ảnh + giá khỏi quick add

Giữ **tên thương hiệu + tên sản phẩm · màu (nếu có) · size**. Bỏ ở **tầng markup** chứ không ẩn bằng CSS: dải gallery tải tới 9 ảnh, ẩn đi vẫn tốn mạng như thường.

**Size theo đúng biến thể PDP của từng sản phẩm** — phần này **đã có sẵn từ trước**, không phải làm mới:

| PDP dùng | Sản phẩm (idx) | Bấm quick add ở PLP |
|---|---|---|
| dropdown | `1 · 2 · 4 · 5` | mở **bottom sheet "Chọn size"** (`#sizeSheet`), đúng bộ chọn size của PDP |
| chip | còn lại | mở quick add sheet, lưới chip như cũ |

> **Bug kéo theo, đã vá:** `flyToCart` lấy `body.querySelector('img')` — bỏ gallery thì ảnh đầu tiên trong sheet trở thành **ô chọn màu 44px** (hoặc `null` nếu SP không có màu). Nay `openQA(idx, ci, srcImg)` nhận thẳng **ảnh của card** vừa bấm.

**Đo lại** (`skin-mt`, SP chip idx 0): gallery **đã bỏ** · giá **đã bỏ** · còn `Versace · Đầm lụa mini Broken Jewels · Màu sắc · Kích thước` + 6 chip · sheet cao `374px`. Thêm giỏ ra `Broken Jewels , 39`. SP dropdown (idx 1) mở đúng sheet "Chọn size" 2 dòng, quick add sheet **không** mở. 2 bộ da kia vẫn `gallery=có · giá=có`. Console sạch trên tab mới ở cả 2 file.

> ⚠ **Một câu chưa rõ trong yêu cầu:** phần đầu ghi *"giữ lại tên sản phẩm"* nhưng vế cuối lại ghi *"bỏ hình và tên"*. Mình hiểu vế cuối là gõ nhầm của **"bỏ hình và tiền"** (nhắc lại vế đầu) nên **GIỮ tên**. Nếu thật sự muốn bỏ tên thì sửa 1 dòng trong `quickAddBody`.

## Checkout desktop: dropdown địa giới tại ô + nút full width (21/08/2026, CHỈ desktop.html)

4 yêu cầu user, đều trong màn Thanh toán bản desktop (3 bản skin desktop CHƯA áp):

- **Ô chọn Tỉnh/thành · Phường xã · Thành phố · Tỉnh thành sinh sống**: bỏ khuôn nửa cột `grid grid-cols-2` → **full width** theo cột form (ô nằm trong `pickField`, đo 667px trên cột 699px).
- **Bấm ô xổ DROPDOWN ngay dưới ô** thay vì popup `#pickSheet` giữa màn. Popup + IIFE cũ **đã xoá**, thay bằng module `__openPickDD(btn, opts, current, cb)` cùng khuôn dropdown chọn size PDP5/6: listbox `[data-pick-list]` (ăn viền 1px/không bóng theo khối KHUÔN CHUNG CHO MỌI LỚP NỔI), max-height 260px, hàng `min-h-11`, chọn xong tự đóng, bấm ra ngoài/bấm lại ô là đóng, caret xoay + `aria-expanded`. Danh sách **> 8 mục** (10 tỉnh) có ô tìm kiếm đầu listbox — giữ nguyên tính năng gõ không dấu (`norm`) + tô đậm khớp (`highlightMatch`) của popup cũ; ≤ 8 mục (3 thành phố, ≤ 7 phường) không có ô tìm. `wireAddressPickers` giữ nguyên ràng buộc tỉnh→phường, thành phố→cửa hàng (đổi thành phố vẫn `rerenderCheckout` — dropdown sống trong DOM màn nên tự bị dọn).
- **Nút "Xác nhận" (3 bước) + "Đặt hàng"**: `h-12 px-10 inline-flex` (hug) → **`w-full`**, thêm `leading-5` đi cặp cỡ 16 (trước đó `text-[16px]` trần).
- **Nút "Thay đổi"** (`.ck-change`): `16/24 font-light` → **`12/16 + underline`**, weight 400 (bỏ `font-light` — 300 bị STYLE-RULES §1.1 cấm). Rule gạch chân riêng của skin-mp giờ trùng với markup, vô hại.

**Soát text style cùng lượt (thang markup 12/14/16/18/24/32/48, size đi cặp leading):** trong checkout đã sửa `text-[13px]`→`14` (8 chỗ: thẻ cửa hàng, dòng địa chỉ sổ, ghi chú pickup, đếm cửa hàng, ghi chú giữ đơn, `storeLines`) · `text-[11px]`→`12 leading-4` ("(Mặc định)") · brand + giá trong panel tóm tắt `13` thiếu leading → `14 leading-5`. **Còn tồn, chưa đụng** (thuộc đợt remap Phần 6 STYLE-RULES, "demo chưa sửa theo"): `.ck-title 16/24 font-medium` (cỡ 16 sẽ bị thang skin-mt bỏ; 500 chữ thường là trạng thái lai §1.1) · nhãn `tracking-[0.2em]` ở panel tóm tắt + thẻ Membership (chờ rule chặn §4.1) · `text-[12px]` thiếu leading trong hàng SP panel tóm tắt · màn Hoàn tất còn 4× `text-[13px]` + `font-semibold` + `tracking-wider` trên 2 nút.

## Audit text style luồng auth: đăng nhập · đăng ký · OTP · quên mật khẩu (21/08/2026)

Scan 6 view (`login/register/otp/reginfo/setpass/forgot`) + popup đăng nhập nhanh desktop theo STYLE-RULES + thang markup. **Đã sửa (vi phạm cơ học):**

- **2 chuỗi gõ HOA vào text** — vi phạm quy tắc "không dùng UPPERCASE, không gõ hoa vào chuỗi" (§1.5): nút `GỬI MÃ XÁC THỰC` (forgot) → `Gửi mã xác thực`, nút `TẠO TÀI KHOẢN` (reginfo) → `Tạo tài khoản`. Sửa ở **CẢ 5 FILE** (luật copy toàn dự án) kèm từ điển i18n: thay key hoa `'GỬI MÃ XÁC THỰC'` bằng `'Gửi mã xác thực':'Send verification code'`, xoá key thừa `'TẠO TÀI KHOẢN'` (key thường `'Tạo tài khoản':'Create account'` đã có sẵn). Verify EN ra "Send verification code" / "Create account".
- **Thiếu line-height đi cặp cỡ chữ** (index + desktop): input `afield` 14→`leading-5` · nút `abtn` 14→`leading-5` · ô OTP 18→`leading-7` (mobile ra 18/28, desktop remap còn 16/28) · nút "Nhận lại mã" 14→`leading-5`.

**Còn tồn — thuộc tầng remap skin-mt (Phần 6, đã chốt 20/08 nhưng demo chưa sửa), KHÔNG tự đổi:** tiêu đề view `24/32 font-light` (300 bị §1.1 cấm — nhưng là spec Figma gốc "Tiêu đề Light 24", tầng bộ da sẽ ép weight khi remap; hiện blanket 400 của skin-mt ĐÃ đè nó khi đo) · `tracking-wide` trong `abtn` (đo skin-mt ra ls0.5px — khối chặn hiện có ĐÃ vô hiệu nó, chỉ còn là rác markup) · input popup đăng nhập nhanh desktop dùng `font-light` (lệch với input `afield` 400) · ô OTP viền `border-border-3` #cfcfcf (nhập về V2 #dfdfdf khi remap viền §3.1). Đo sau sửa: thân màn auth desktop skin-mt đồng nhất `12/20 · w400 · ls0.5` (nhịp 12/20 sẽ siết về 12/18 ở Phần 6 việc 1), console sạch cả 2 bản.

## Bộ lọc: tiêu đề mục "Ưu đãi" màu ĐỎ (19/08/2026, CẢ 2 BẢN)

Yêu cầu user. Đây là mục **giảm giá** (sheet "Promo") nên tô đỏ như mọi tín hiệu khuyến mãi khác của dự án — mục "Khuyến mãi" trên nav và badge `-%` đều dùng `--general-destructive`. **Dùng đúng token đó, không chế màu mới.**

```css
[data-facc="Ưu đãi"] .facc-trigger > span:first-child { color: var(--general-destructive); }
```

- Khai ở **tầng base**, không phải trong khối bộ da — giống hệt cách nav "Khuyến mãi" làm, nên **đỏ ở cả 3 bộ da** và tự đổi theo token của từng bộ.
- **`data-facc` = hook mới thêm vào `fSection()`**, lấy thẳng `title`. Muốn tô mục nào sau này chỉ cần thêm 1 selector, không phải đẻ tham số mới.
- **Chỉ tô nhãn chữ.** Icon `+/−` giữ mực chung: nó là nút điều khiển dùng chung cho mọi mục, đổi màu riêng ở đây là phá tính nhất quán vừa gom được của bộ icon.

**Đo lại — 2 file × 3 bộ da × 2 biến thể thân bộ lọc:**

| Bộ da | `Ưu đãi` | `Danh mục` / `Khác` |
|---|---|---|
| mặc định · Mytheresa | **`rgb(214,40,69)`** = `#d62845` | `rgb(10,10,10)` |
| MR PORTER | **`rgb(216,30,5)`** = `#d81e05` (token riêng của bộ da) | `rgb(10,10,10)` |

Chỉ duy nhất mục "Ưu đãi" đổi màu, các mục khác giữ mực. Console sạch trên tab mới ở cả 2 file.

## Bộ lọc: mục "Ưu đãi" (sheet Promo) — bật cho MỌI ngành + lọc THẬT (19/08/2026, CẢ 2 BẢN)

User báo sheet **Promo** của `Filter - Beauty cate demo.xlsx` chưa được đưa vào bộ lọc, kèm 5 lựa chọn: `Full-priced · 10% - 30% · 30% - 50% · 50% - 70% · From 70%`.

**Kiểm lại thì `FILTER_PROMOS` đã có sẵn từ trước, đúng 5 lựa chọn và đúng nhãn** — bản VI `Nguyên giá · 10% - 30% · 30% - 50% · 50% - 70% · Trên 70%`, i18n đã map sẵn `Nguyên giá → Full-priced` và `Trên 70% → From 70%` (3 nhãn khoảng số giống nhau ở 2 ngôn ngữ nên không cần luật dịch). **Vấn đề nằm ở 2 chỗ khác:**

| # | Lỗi | Sửa |
|---|---|---|
| 1 | Mục "Ưu đãi" **chỉ dựng cho PLP làm đẹp** (`beauty ? … : ''`) | dựng cho **mọi PLP** — mức giảm giá thì ngành nào cũng có |
| 2 | Nó **không lọc gì cả** — tick vào lưới không đổi | thêm lọc thật vào `matchProducts` |

Lỗi 2 đáng kể: từ 12/08 bộ lọc của dự án là **lọc thật**, để một facet trang trí là lệch hẳn khỏi phần còn lại.

```js
const PROMO_RANGES = { 'Nguyên giá': null, '10% - 30%': [10,30], '30% - 50%': [30,50],
                       '50% - 70%': [50,70], 'Trên 70%': [70, Infinity] };
const discountPct = p => { const m = /(\d+)/.exec(p.off || ''); return m ? +m[1] : 0; };
```

**Biên khoảng `[lo, hi)`** — giảm đúng 30% rơi vào `30% - 50%`, không phải `10% - 30%`. Chọn vậy để 4 khoảng **không chồng nhau**, tick 2 ô liền kề không đếm trùng một sản phẩm. `Nguyên giá` = không có `p.off`. Tick nhiều ô là **HỢP (OR)** như mọi facet khác.

Kèm theo: thêm `FILTER_PROMOS` vào **phần dùng chung** của `facetLabelsFor()` (trước nằm trong nhánh `beauty`), không thì chuyển ngành là chip ưu đãi bị dọn mất.

**Đo lại — logic lọc trên data thật** (24 SP: 18 nguyên giá · `-10 -15 -15 -20 -25` · `-30`):

| Tick | Kết quả |
|---|---|
| `Nguyên giá` | **18** SP, toàn bộ không giảm |
| `10% - 30%` | **5** SP: `-20 -15 -25 -10 -15` |
| `30% - 50%` | **1** SP: `-30` ← biên đúng như thiết kế |
| `50% - 70%` · `Trên 70%` | **0** (data chưa có) |
| `Nguyên giá` + `10% - 30%` | **23** = 18 + 5, không trùng |

**Đo lại — luồng UI đầy đủ, cả 2 file:** mục "Ưu đãi" xuất hiện ở **cả 2 ngành** (thời trang 7 mục · làm đẹp 6 mục), đủ **5 lựa chọn**; số trên nút Áp dụng **khớp khít** số thẻ trong lưới (`(10) → 10` · `(5) → 5` · `(0) → 0` kèm empty state); chip hiện đúng nhãn; **Đặt lại** trả về đủ 16 SP và xoá chip. Console sạch trên tab mới ở cả 2 file.

## Vào checkout LUÔN mở bước "Vận chuyển" (19/08/2026, CẢ 2 BẢN)

User: *"khi từ checkout vào cart, dù đăng nhập rồi hay chưa đều phải trả về trang chọn vận chuyển hay chọn mua tại cửa hàng"*.

> ### Nguyên nhân: một dòng di sản
> Mọi lối đăng nhập/đăng ký đều đặt `ckStep = 1`. Đó là **di sản từ hồi section 0 là ĐỊA CHỈ** — người đã đăng nhập có sẵn địa chỉ nên nhảy qua là hợp lý.
> Nhưng section 0 **nay là "Vận chuyển", chứa cặp tab Giao hàng / Nhận tại cửa hàng** — không đăng nhập nào trả lời thay được. Hệ quả: bấm Đặt hàng ở giỏ là rơi thẳng vào "Phương thức vận chuyển", **mất luôn chỗ chọn nhận tại cửa hàng**.
> Thêm một tầng nữa: `ckStep` là **state cấp module**, nên quay lại giỏ rồi vào lại vẫn giữ giá trị của lượt trước.

**Sửa — 5 chỗ mỗi file:**

| Chỗ | Trước | Sau |
|---|---|---|
| `[data-login-submit]` · `[data-reg-done]` · popup đăng nhập nhanh (3 chỗ) | `ckStep = 1; ckMaxStep = Math.max(ckMaxStep,1)` | `ckStep = 0` |
| nút bật/tắt đăng nhập trong panel Cài đặt | `ckStep = ckAuth ? 1 : 0` | `ckStep = 0; ckMaxStep = 0` |
| **nút "Đặt hàng" ở giỏ** | *(không đụng ckStep)* | **`ckStep = 0`** trước khi `go('checkout')` |

**GIỮ `ckMaxStep`**: các bước đã hoàn tất vẫn hiện dạng tóm tắt + "Thay đổi" → quay lại giỏ rồi vào lại **không mất dữ liệu đã nhập**, chỉ là bước Vận chuyển mở lại.

**Đo lại — cả 2 file, đo bằng chiều cao thật của `.ck-open` chứ không đoán tên class:**

| Kịch bản | `ckStep` | Section đang mở | Có 2 tab Giao hàng/Nhận tại CH |
|---|---|---|---|
| đã đăng nhập → vào checkout | **0** | `sec0 Vận chuyển` | ✅ |
| xác nhận xong bước 0 | 1 | `sec1 Phương thức vận chuyển` | — |
| **quay lại giỏ rồi vào lại** | **0** (`ckMaxStep` vẫn 1) | **`sec0 Vận chuyển`** | ✅ |
| khách → đăng nhập từ popup ở giỏ | **0** | `sec0` | ✅ |
| khách → "mua không đăng nhập" | **0** | `sec0` | ✅ |

Kịch bản 4–5 cố tình đặt `ckStep = 2` trước khi bấm để chắc chắn state bẩn cũng bị reset. Console sạch trên tab mới ở cả 2 file.

## Icon extend của accordion: gom hết về DẤU CỘNG / TRỪ (19/08/2026, CẢ 2 BẢN)

User: *"về icon extend hãy đồng bộ lại từ các icon đang có dấu mũi tên lên xuống giờ sẽ là dấu cộng trừ thôi"*. Dự án đang dùng **3 kiểu icon cho cùng một việc mở/đóng**:

| Kiểu | Ở đâu |
|---|---|
| `+/−` | accordion PDP (khối khuyến mãi), mục bộ lọc |
| **mũi tên phải xoay 90°** (`.acc-chev`) | footer, tóm tắt giỏ, tab PDP (pdp/pdp2/pdp3/pdp4), phiếu mua hàng, tóm tắt checkout — **8 chỗ** |
| **mũi tên xuống** (`chevD`) | tab PDP của **pdp5 · pdp6** — **2 chỗ** |

Gom hết về `+/−`. Thêm hằng dùng chung để lần sau đổi icon chỉ sửa 1 dòng:

```js
const accIco = `<span class="acc-ico-plus">${IcoPlus}</span><span class="acc-ico-minus">${IcoMinus}</span>`;
```

**Không đụng JS**: CSS `.acc .acc-ico-plus/-minus` + `.acc.open` đảo icon sẵn, chỉ cần thay markup.

> **Kiểu thứ 3 suýt bị bỏ sót.** Vòng quét đầu chỉ tìm `chevR` (mũi tên xoay) nên `pdp5`/`pdp6` — vốn dùng `chevD` — vẫn còn nguyên. Chỉ lộ ra khi đo **đếm số accordion có `+/−` trên từng màn**: `pdp5` ra **7 accordion nhưng chỉ 3 cái có icon**. Bài học: đừng quét theo TÊN ICON, quét theo **"accordion nào chưa có cặp `+/−`"**.

> Icon `+/−` khoá `fill: var(--general-primary)` nên nay **một màu ở mọi chỗ**; trước đây mũi tên nhận tham số màu và có chỗ để `#737373`. Đó chính là phần "đồng bộ" — một việc thì một icon, một màu.

**Đo lại — quét 11 màn của bản mobile + 7 màn desktop:** tổng **55 accordion (mobile)** → **thiếu icon: 0 · còn mũi tên: 0**. Đóng→mở đảo đúng `block/none → none/block`, kiểm cả trên `pdp5` (chỗ vừa vá). Console sạch trên tab mới ở cả 2 file.

## Bộ lọc: TIÊU ĐỀ MỤC = HOA + weight 500 (19/08/2026, CẢ 2 BẢN)

Yêu cầu đi qua 4 nhịp, ghi lại để khỏi lặp:
1. *"ở filter, cate lớn nhất hãy cho uppercase lên, áp cho 2 bản luôn"*
2. → mình hiểu nhầm thành **tầng đầu của cây Danh mục** (`.fcat-check`) rồi viết hoa chỗ đó. User bắt lỗi: *"cái cần uppercase là DANH MỤC, THƯƠNG HIỆU, MÀU SẮC… không phải cate bên trong đó"* → chuyển sang `.facc-trigger`
3. → *"giờ cho nó về lại bình thường nhưng tăng font weight lên"* → bỏ hoa, để 500
4. → *"theo bạn nên tăng font weight hay uppercase sẽ phù hợp concept chung hơn"* → **CHỐT: dùng CẢ HAI**

```css
html.skin-mt #filterSheet .facc-trigger > span:first-child {
  font-weight: 500; text-transform: uppercase;
}
```

5. → **CHỐT CUỐI**: *"hạ font weight xuống 400 bằng các nội dung bên trong filter, vẫn giữ uppercase"* → **chữ hoa là đòn bẩy DUY NHẤT**

**Vì sao chữ hoa, không phải độ đậm:**

1. **Số đo mytheresa KHÔNG có phần tử 500/600/700 nào** — họ phân cấp bằng **cỡ chữ + chữ hoa**, không bằng độ đậm. Nâng weight là lệch số đo và làm loãng nét nhận dạng bộ da.
2. **Trên mobile tiêu đề mục và cate bên trong CÙNG 12px** — chữ hoa đã đủ tách mà không phải đẻ thêm cỡ chữ hay nấc đậm nào.

> ⚠ **Vẫn phải khai `font-weight: 400` tường minh, không được bỏ trắng.** Markup để `font-light` (**300**), mà khối blanket của bộ da chỉ kéo về 400 cho các class `.font-*` — bỏ rule này đi thì tiêu đề ra **300**, nhạt hơn cả nội dung bên trong.

**Đánh đổi đã biết:** chữ hoa 12px tiếng Việt bị chật phần dấu (`ƯU ĐÃI`, `KÍCH THƯỚC`). Dự án đã chấp nhận đánh đổi này cho nav và nhãn menu.

**Đo lại — 2 file × 3 bộ da:**

| | Tiêu đề mục | Cate bên trong | Thương hiệu bên trong |
|---|---|---|---|
| `skin-mt` mobile | `12px w400 UPPERCASE` | `12px w400 thường` | `12px w400 thường` |
| `skin-mt` desktop | `14px w400 UPPERCASE` | `12px w400 thường` | `12px w400 thường` |
| mặc định / MR PORTER | `16px w300 thường` | `14px w400` | `14px w400` |

**6/6 mục** đều `w400 + uppercase` ở cả 2 file. Tiêu đề mục nay **cùng độ đậm với nội dung bên trong**, chỉ khác ở chữ hoa — và ở desktop thêm 1 nấc cỡ chữ (14 vs 12). Console sạch trên tab mới ở cả 2 file.

> Còn 2 nhãn nhóm cùng vai vẫn ở **500**: `.dk-mega-grid > div > p` (mega panel) và `#menuSheet .ms-view > p` (drawer). Nay bộ lọc **cố ý khác** chúng — nếu muốn cả 3 về 400 cho thống nhất thì sửa thêm 2 rule đó.

## Bộ lọc: mọi mục ĐÓNG sẵn (19/08/2026, CẢ 2 BẢN)

User: *"filter mặc định closed hết"*. Trước đây **6/7 mục mở sẵn** (chỉ "Khác" đóng) nên panel dài lê thê, phải cuộn mới thấy hết tên các mục.

Đổi tham số mặc định của `fSection()`: `open = true` → **`open = false`**, và bỏ mấy chỗ truyền `true` tường minh (chúng chỉ tồn tại để với tới tham số vị trí phía sau: `h = 56` cho "Màu sắc", `count` cho "Danh mục"/"Thương hiệu" ở desktop).

**Không đụng cấp con**: nhánh con của Danh mục (`.fcat`) và cấp 3 (`.fsub`) **vốn đã đóng sẵn** từ trước.

**Đo lại — cả 2 file × cả 2 biến thể thân bộ lọc:**

| | Thời trang | Làm đẹp |
|---|---|---|
| các mục | `Danh mục · Thương hiệu · Màu sắc · Kích thước · Khoảng giá · Khác` | `Danh mục · Thương hiệu · Dung tích · Khoảng giá · Ưu đãi · Khác` |
| số mục mở | **0/6** | **0/6** |
| cấp con mở | 0 | 0 |
| thân phải cuộn? | **không** | **không** |

Bấm vào tiêu đề vẫn mở ra bình thường. Console sạch trên tab mới ở cả 2 file.

## Bộ da mặc định khi vào trang = Mytheresa (19/08/2026, CẢ 2 BẢN)

User: *"set mặc định khi vào sẽ xem skin mytheresa luôn, cả 2 phiên bản đều xem skin đó đầu tiên"*.

**2 chỗ sửa, ở cả 2 file** — đổi mặc định thì phải sửa đủ cả 2, không thì tích trong popover Cài đặt trỏ sai mục:

| Chỗ | Trước | Sau |
|---|---|---|
| thẻ `<html>` | `<html lang="vi">` | `<html lang="vi" class="skin-mt">` |
| khởi tạo state | `let currentSkin = 'default'` | `let currentSkin = 'mytheresa'` |

**Đặt class THẲNG vào thẻ `<html>`, KHÔNG gọi `applySkin()` lúc boot**: gọi bằng JS thì trang vẽ một nhịp bằng bảng màu gốc rồi mới nhảy sang bộ da — nhìn ra nháy. Phông của bộ da này là **Montserrat**, trùng `currentFont` mặc định nên không phải đụng gì thêm.

**Đo lại — cả 2 file, tab mới:**

| | `index.html` | `desktop.html` |
|---|---|---|
| class `<html>` | `skin-mt` | `skin-mt` |
| `currentSkin` / `currentFont` | `mytheresa` / `montserrat` | `mytheresa` / `montserrat` |
| token mực · viền · `radius-8` | `#000000` · `#dfdfdf` · `0px` | y hệt |
| phông body | Montserrat | Montserrat |
| dấu hiệu bộ da đang chạy | tab menu `14px w500 HOA` · hairline thanh lọc `#ececec` | nav dept `12px w500 HOA` |

Popover Cài đặt tích đúng **`mytheresa`** + phông **`montserrat`**. Đổi sang bộ da khác rồi quay lại vẫn chạy: `default` → không class · `editorial` → `skin-mp` · `mytheresa` → `skin-mt`. Console sạch trên tab mới ở cả 2 file.

> Bản gốc Grey-Gold và MR PORTER **vẫn còn nguyên**, chỉ là không còn được chọn sẵn — vào popover Cài đặt đổi lại một chạm.

## Subheader "Khuyến mãi" giữ màu ĐỎ ở mọi bộ da (19/08/2026, 2 bản desktop)

User: *"subheader KHUYẾN MÃI sẽ có màu đỏ"*. Đảo quyết định 18/08 — hồi đó bộ da `skin-mt` ép nó về `#000` theo số đo ("SALE trên trang mytheresa không tô đỏ").

Nhất quán với quyết định vốn đã có của chính bộ da này: `--general-destructive` **giữ đỏ gốc dự án** chứ không đơn sắc hoá, vì badge `-%` và viền lỗi form phải đọc ra là cảnh báo. Mục khuyến mãi cùng loại tín hiệu đó.

**2 rule phải gỡ, không phải 1** — chỗ thứ hai suýt bỏ sót:

| # | Rule | File |
|---|---|---|
| 1 | `html.skin-mt … .dk-nav-link.text-destructive{,:hover,[aria-current]} { color: #000 }` | `desktop.html` · `desktop-editorial.html` |
| 2 | rule bôi đen **mọi** `.dk-nav-link[aria-current]` → thêm `:not(.text-destructive)` | `desktop-editorial.html` (2 chỗ: `skin-mt` và `skin-mp`) |

> Chỗ (2) chỉ lộ ra khi **đo state đang chọn**: bỏ mỗi rule (1) thì mục vẫn đỏ lúc nghỉ nhưng **đen khi đứng ở màn khuyến mãi**. `desktop.html` không dính vì rule `[aria-current]` ở đó chỉ khai `font-weight`.
> Rule đè được là do specificity: `html.skin-* .navbar .dk-nav-link[aria-current]` = **(0,3,1)** thắng rule đỏ gốc `.navbar .dk-nav-link.text-destructive` = **(0,3,0)**.

**Đo lại — cả 2 file × mọi bộ da, cả state nghỉ lẫn đang chọn:**

| File | Bộ da | Nghỉ | Đang chọn |
|---|---|---|---|
| `desktop.html` | mặc định | `rgb(214,40,69)` | `rgb(214,40,69)` |
| | MR PORTER | `rgb(216,30,5)` | `rgb(216,30,5)` |
| | **Mytheresa** | **`rgb(214,40,69)`** ✅ (trước là đen) | **`rgb(214,40,69)`** |
| `desktop-editorial.html` | editorial | `rgb(216,30,5)` | `rgb(216,30,5)` ✅ (trước là đen) |
| | Mytheresa | `rgb(160,55,51)` | `rgb(160,55,51)` |
| | neutral | `rgb(160,55,51)` | `rgb(160,55,51)` |

Các mục nav khác giữ nguyên mực đen/xám của từng bộ da. Console sạch trên tab mới ở cả 2 file. **Bản mobile không liên quan** — không có subheader, và hàng "Khuyến mãi" trong drawer vốn đã `text-destructive`, không bộ da nào đè.

## PLP: số lượng sản phẩm sát lề phải (19/08/2026, CHỈ DESKTOP)

User vẽ sơ đồ: tiêu đề danh mục bên trái, **số lượng dính mép phải** cùng một hàng. Trước đây hai thứ dính nhau ở bên trái (`flex items-end gap-2`), nên thêm `justify-between` + `shrink-0` cho số lượng.

⚠ **Cố ý lệch Figma**: bản vẽ (Frame 2903:45118) để số lượng dính ngay sau tiêu đề, cách 8px. Đẩy sang phải thì nó **thẳng cột với lưới sản phẩm** ngay dưới, và mép phải trang có một mốc thị giác.

**"Sát lề phải" = mép phải CỘT NỘI DUNG**, tức `px-6` (24px) trong khung `max-w-[1440px]` — đúng máng lề mà đường dẫn / thanh lọc / lưới sản phẩm đang dùng. Cho bằng 0 là nó thò ra khỏi mọi khối khác trên trang.

**Đo ở 1440**: tiêu đề `x=24` · số lượng mép phải **`1401`** — **trùng khít mép phải lưới sản phẩm `1401`** · canh đáy với tiêu đề lệch **0px**. (Nút "Sắp xếp" của thanh lọc ở `1409` vì thanh đó dùng `pr-4` chứ không `pr-6` — lệch có sẵn từ trước, không thuộc đợt này.)

**Tiêu đề dài**: `shrink-0` trên số lượng bảo đảm **tiêu đề truncate, số lượng không bị bóp**. Đo ở khổ hẹp 820: tiêu đề `truncate = true`, số lượng vẫn đủ chữ "16 sản phẩm" và mép phải vẫn trùng lưới (`781`), trang **không tràn ngang**. Giống nhau ở **cả 3 bộ da**. Console sạch trên tab mới.

> **Bản mobile không đụng**: ở đó hàng này là `[N sản phẩm] ... [nút mật độ cột]`, không có tiêu đề danh mục — sơ đồ user vẽ là hàng của desktop.

> **Bẫy comment — LẦN THỨ 5.** Lần này comment HTML chứa **cả backtick lẫn một dãy gạch ngang** (`-----`): backtick cắt đứt template literal, và 2 dấu gạch liền cũng sai cú pháp comment HTML. Script quét nay kiểm **cả hai**: `<!-- … -->` chứa backtick **hoặc** chứa `--` bên trong — hiện **0 chỗ** ở cả 2 file.

## Lỗi ô nhập: inline thay cho toast (19/08/2026, CẢ 2 BẢN)

User: *"các thông báo trạng thái edge case của inputfield sẽ hiện dạng error ngay bên dưới inputfield thay vì toast msg"*. Đúng — toast nổi ở **đáy màn**, rời hẳn khỏi ô gây lỗi và **tự biến mất**, người dùng phải nhớ lỗi rồi tự dò về ô.

> ### ⚠ LỖI TỰ GÂY — VIẾT LẠI THỨ ĐÃ CÓ
> Mình viết một hàm `setFieldErr(id, msg)` mới cùng bộ markup dựng sẵn `errLine(id)`… trong khi **file đã có sẵn `setFieldErr(inp, msg)` / `clearFieldErr(inp)`** (khai gần `validatePickup`, dùng cho form nhận-tại-cửa-hàng). Hai hàm **trùng tên**, bản khai SAU đè bản trước → `TypeError: Cannot read properties of undefined (reading 'remove')` rất khó lần vì lỗi chỉ ra ở call site.
> Bản có sẵn còn **tốt hơn** bản mình viết: kèm `aria-invalid` + `aria-describedby`, và dùng class `.fld-err` (khai `border-color: var(--general-destructive) !important` trong `<style>` — đúng cách vòng qua chuyện `border-destructive` không thắng nổi `border-border` cùng specificity).
> **Đã gỡ sạch bản trùng**, dùng đúng API sẵn có. **Luật: trước khi viết helper, grep xem file đã có chưa** — lần này grep "toast" nhưng không grep "err".

**3 chỗ đã đổi (giống nhau ở cả 2 file):**

| Chỗ | Toast cũ | Nay |
|---|---|---|
| gửi mã OTP (đăng ký / quên MK) | `Vui lòng nhập số điện thoại` | dòng lỗi dưới `#regPhone` |
| xác nhận OTP | `Vui lòng nhập đủ 6 số` | dòng lỗi dưới hàng `#otpRow` + **6 ô tô đỏ** |
| dùng mã ưu đãi | `Mã không hợp lệ` · `voucherBlockReason(v)` · `Mã đã được chọn` | dòng lỗi dưới `#vcCode` |

- **6 ô OTP** không có ô nào là "ô chính" để gắn lỗi — `setFieldErr` chèn `<p>` vào `afterend`, mà `afterend` của một ô thì rơi **vào giữa hàng flex**. Nên thêm `otpErr(root, msg)`: truyền **cả hàng `#otpRow`** (thẻ `<p>` rơi ngay dưới hàng, `.fld-err` bám div không viền nên vô hình) rồi tô đỏ 6 ô riêng.
- **Ô mã ưu đãi** phải tách khỏi hàng `[ô | nút]` thành cột riêng, không thì `afterend` đặt lỗi **chen giữa ô và nút "Dùng mã"**.
- **Gõ lại là lỗi mất ngay** — nối `clearFieldErr` vào listener `input` sẵn có của `#vcCode`, thêm listener cho `#regPhone`/`#loginId`, và `once` cho 6 ô OTP. Cùng lối với ô checkout `[data-ckf]` đã làm.
- **Không** đụng `Mã đã được chọn` → bỏ luôn `resetCode()` ở nhánh đó: giữ mã trên màn để người dùng thấy mã nào bị trùng, thay vì xoá trắng ô rồi báo lỗi về một mã không còn nhìn thấy.

## Chi tiết đơn hàng DESKTOP: theo khung Figma `1071:54047` user sửa tay + nâng cấp giao diện (04/10/2026, CHỈ `desktop.html`)

Lệnh user: *"[link khung 1071:54047] update lại layout chi tiết đơn hàng theo thiết kế của tôi đồng thời nâng cấp giao diện ở bản desktop lên nhé. tôi tin bạn có thể làm ui đẹp mắt"*. Mobile (`index.html`) KHÔNG đổi (khung mobile `1068:…` user không sửa). **Figma CHƯA sync** — 10 khung desktop `1071:…` còn bản 02/10; riêng `1071:54047` là bản USER SỬA TAY (lượt sync sau: dựng lại cả 11 khung theo code mới, CANON extractor cần `ov-meta` · `ov-mi` · `ov-mv`, bỏ `ov-top` · `ov-points` · `is-line`).

- **Cách biết user sửa gì**: so khung của user với khung ANH EM cùng cấu trúc (`1071:54847` pre-order, `1071:55272` mixed 01) bằng chữ ký từng khối (auto layout · fill · viền · kiểu chữ, bỏ ruột instance). Sáu chỗ khác: (1) `cards` TẮT nền xám → **thân TRẮNG**; (2) mã đơn **18/24 → 16/24**; (3) **dải điểm kem góc phải thẻ Mã đơn BỎ** — điểm thành CỘT ĐẦU của **hàng thông tin 3 cột** (điểm · hoá đơn · thanh toán, canh đều hai mép, nhãn 14/20 #404040 trên giá trị 16/24 · 500, điểm đồng ở skin-li); (4) **thẻ giao hàng gộp → HAI KHỐI VIỀN**, NGƯỜI NHẬN bên TRÁI · GIAO HÀNG bên PHẢI (đảo chỗ), khe 16, nút "Theo dõi vận đơn" canh PHẢI ở đáy khối giao hàng; (5) **tấm TỔNG xám thu gọn** 468×181 dính mép phải (trước: dải xám hết bề ngang); (6) cỡ chữ các giá trị trong hàng thông tin 14/20 → 16/24.
- **Mình tự quyết (đã báo user)**: (a) khung vẽ hai khối viền hai màu (#d3d3d3 · #e6e6e6) và hai kiểu đệm → code CÙNG tầng V2 `--general-border` (STYLE-RULES §3.1: viền hộp) + cùng đệm 24; (b) khung để hai khối rộng 496 + khe 16 nên khối phải TRÀN 16px ra khỏi lề thẻ → code chia đều hai cột `1fr` (mép khối thẳng cột chữ của các thẻ khác, x 24 và 1016); khối cao 234 (khung 232: thêm 2px viền).
- **Nâng cấp giao diện** (lớp phủ TÁCH RIÊNG ở cuối khối `.ov-*`, KHÔNG đổi kích thước nào của khung; luật hệ thống giữ: không bóng, không bo góc, mực 3 bậc, 2 mặt phẳng): số đẳng chiều (`tabular-nums` như màn giỏ) · hàng bấm được có hover (gạch chân + mũi tên nhích 2px; hàng "Tiến trình đơn hàng" thêm mũi tên phải như hàng hoá đơn; mũi tên lùi nhích trái) · kẻ mảnh V3 giữa các dòng hàng của đơn nhiều món (pseudo `::after` — `::before` của dòng hàng đã là nền hover từ trước) · vào màn bốn khối nổi lần lượt bằng `.rise` có sẵn · mọi chuyển động tắt khi bật "giảm chuyển động". Hover dòng hàng (nền đồng nhạt, gạch chân tên, ảnh mờ nhẹ) ĐÃ CÓ — giữ. **⚠ GỠ HẾT 05/10/2026 tối** (thẻ Sản phẩm không còn hiệu ứng hover — xem bullet cuối mục "Chi tiết đơn hàng DESKTOP: theo khung Figma `1159:105033`").
- **Khổ hẹp**: dưới 1180 hàng thông tin tự xuống dòng, hai khối viền xếp dọc (người nhận lên trước); tấm tổng giữ dáng gọn ở mọi khổ.
- **Đã đo**: số đo vị trí so khung ở 1440 — tiêu đề kẻ đáy 49 · thẻ Mã đơn 277 (hàng đầu 48 · hàng thông tin 52 · kẻ · timeline 80) · cột hàng thông tin x 24 / 458 / 847 (khung 24 / 457 / 845) · tấm tổng 468×181 tại x 572; **25/25 kiểu chữ** (cỡ/dòng/đậm/màu) của các chữ mẫu khớp khung; 12 đơn mẫu × 1440 / 1280 / 1100: không cuộn ngang, không chữ bị cắt; EN ↔ VI khứ hồi khớp (61 chữ); hai ngăn kéo hoá đơn / tiến trình mở bằng cột hoá đơn · hàng tiến trình · nút theo dõi, Esc đóng; mũi tên lùi → tab Đơn hàng, mở lại đơn chạy; hover đo được (`:hover` → gạch chân + mũi tên nhích 2px); console sạch; quét cú pháp OK.
- **Chưa làm / hỏi user**: Figma sync; mobile theo bố cục mới? (đang giữ dải điểm kem + thẻ gộp); đi xa hơn trong "nâng cấp" (xem đề xuất cuối báo cáo `_notes/ORDER-DETAIL-V4-2026-10-01.md` §18).

## Chi tiết đơn hàng DESKTOP: theo khung Figma `1159:105033` — user sửa tiếp (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"cái chi tiết đơn hàng ở desktop dùng layout này của tôi nhé, áp cho các trạng thái khác luôn, trường hợp thanh toán lỗi thì hiện nút 1 bên như vậy thay vì hiện kế bên badge nhé"* + link `1159:105033` (khung "Order detail / desktop 1441" cấp trang = BẢN SAO của `1071:54047` user sửa tiếp). Mobile (`index.html`) KHÔNG đổi. **Figma ĐÃ sync lượt 23 (05/10 tối, theo bản CODE sau lần sửa 2 ở cuối mục)** — 10 khung trạng thái `1071:…` thay bằng khung dựng từ code (`1161:…`, bảng id ở `_notes/FIGMA-SYNC-ORDER-DETAIL-LUOT-23-2026-10-05.md`); `1159:105033` là khung CỦA USER (đừng xoá / dựng đè); khung mặc định `1071:54047` GIỮ NGUYÊN (bản cũ — chờ user quyết bỏ hay giữ). Báo cáo đầy đủ + bảng số đo: `_notes/ORDER-DETAIL-V4-2026-10-01.md` §19 + §20.

- **Cách biết user sửa gì**: so `1159:105033` với bản gốc `1071:54047` (đi song song theo cây, so từng thuộc tính: tên · loại · auto layout · khe · fill · viền · chữ · instance) — 122 dòng khác biệt, gom thành 7 việc ở dưới.
- **Đã áp** (khung → code): (1) hàng tiêu đề BỎ kẻ đáy (49 → 48); (2) khe giữa các thẻ 4 → **16**; thẻ Mã đơn + thẻ Sản phẩm có **VIỀN 1px** `--general-border`; (3) thẻ MÃ ĐƠN khe 20: hàng đầu [nhãn **"Mã đơn hàng"** 16/24 · 500 mờ + mã + nhãn trạng thái (cao **28**, trước 24) / **"Ngày đặt"** 14/20 mờ + ngày | nút canh PHẢI] · hàng thông tin · kẻ · timeline; (4) HÀNG THÔNG TIN mỗi mục NẰM NGANG [nhãn 14/20 #404040 · giá trị 14/20 · 500] ngăn bằng **vạch dọc 1×14**, canh đều hai mép, THỨ TỰ **điểm · thanh toán · hoá đơn** (hoá đơn xuống cuối; trước là giữa), mũi tên hoá đơn 14; (5) **ĐƠN CHỜ THANH TOÁN (thanh toán lỗi / chưa xong)**: nút "Thanh toán lại" nằm BÊN PHẢI hàng đầu thẻ Mã đơn; nhãn trạng thái chỉ còn là NHÃN (hết nút + hết "Thanh toán lại ›" dính cạnh nhãn; nút dưới ngày cũ bỏ) — `statusTag(o, false, true)`; (6) thẻ GIAO HÀNG không đệm nên hai khối kéo hết 1040; nút "Theo dõi vận đơn" lên HÀNG TIÊU ĐỀ khối giao hàng, kiểu VIỀN nhỏ cao 36 (trước: nút đen 48 ở đáy); khe hàng thông tin 10 → 4; (7) tấm TỔNG xám nằm TRONG thẻ Sản phẩm, canh phải, dưới KẺ 1px + đệm 16 của danh sách hàng (`.ov-lines`).
- **Mọi trạng thái dùng chung một khuôn**: 12 đơn mẫu (Chờ thanh toán · Đang xử lý dùng điểm · đặt trước · hỗn hợp -01/-02 · hỗn hợp + quà -01/-02 · Đang giao · Hoàn tất ×2 · huỷ ×2) — đơn huỷ không có mục điểm (hai mục, một vạch) và giữ dải ghi chú huỷ giữa hàng đầu và hàng thông tin; đơn không có mã vận đơn không có nút Theo dõi.
- **Mình tự quyết (đã báo user)**: (a) khung vẽ hai khối giao hàng 500 | 524 chỉ vì chữ địa chỉ không xuống dòng trong Figma ⇒ code giữ hai cột ĐỀU 1fr (512 | 512); (b) khe tiêu đề → nội dung ở hai khối giữ 16 (khung 14 là số lẻ ngoài thang spacing; cao khối 170 so 168); (c) hàng tiêu đề khối giao hàng canh ĐẦU như khung (MIN/MIN) ⇒ chữ nằm mép trên nút 36; (d) mũi tên hàng "Tiến trình đơn hàng" GIỮ (lớp nâng cấp 04/10, khung không vẽ), nhỏ 16 → 14.
- **⚠ ĐÃ GỠ 05/10 tối (hàng thông tin nay xếp DỌC — xem mục "hàng thông tin xếp DỌC" ngay dưới mục trần 800) — Hàng thông tin khi hẹp — `orderMetaFit()`**: ba mục chỉ nằm vừa MỘT hàng khi cột đủ rộng (đơn thường cần ~802px, đơn Chờ thanh toán dùng cổng Payoo + chưa hoá đơn là ca dài nhất, ~963px với khe tối thiểu 4 — khung vẽ khe 8 thì ~979, vượt cột 975 ở 1440 khi có thanh cuộn nên mình hạ khe tối thiểu về 4; còn dư chỗ thì space-between chia đều nên khe tối thiểu không thấy). Hẹp hơn nữa thì xuống dòng và vạch treo đầu / cuối dòng nên JS đo THẬT sau khi vẽ (+ `ResizeObserver` trễ một khung hình) rồi gắn `.is-wrap`: bỏ vạch, canh trái, khe 32 / 12. Gọi ở `go()` sau `localizeNew` (`if (name === 'order') orderMetaFit(el)`); gỡ quan sát ở `scrollCleanups`.
- **Đã đo** (1440, đơn DAFC102938 = mẫu của khung; vị trí tính từ đầu `.ov-cards`): thẻ Mã đơn (0,0) 1040×267 (khung 267) · khối đầu (25,25) 990×96 · hàng đầu 52 · hàng thông tin y 101 cao 20 (mục x 25 / 391 / 769, khung 25 / 389 / 767) · kẻ y 141 · timeline y 162 cao 80 · thẻ giao hàng y 283 cao 170 (khung 168) · thẻ Sản phẩm y 469 cao 512 (khung 467 / 512) · danh sách 225 · tấm tổng 468×181 tại x 547 (khung 547) · nút Thanh toán lại 172,4×48 sát phải · nút Theo dõi 150×36; tổng chiều cao thẻ 981 so 979. 12 đơn × 1440 / 1280 / 1100: không cuộn ngang, hàng thông tin không chồng; EN ↔ VI khứ hồi ("Order number" · "Date placed" · "Pay again" · "Track shipment"); ngăn kéo hoá đơn / tiến trình / theo dõi mở + Esc đóng; "Thanh toán lại" mở màn #pay; mũi tên lùi về tab Đơn hàng; console sạch; quét cú pháp OK; danh sách đơn + màn Theo dõi (badge 24) không đổi.
- **⚠ LẦN SỬA 2 (cùng ngày 05/10, chiều tối) — thay một phần các bullet trên** (user sửa tiếp khung `1159:105033`, nhắn hai lần: *"dựng lại theo bố trí nút nằm trên cùng nhé, bỏ cái > ở tiến trình đơn hàng luôn nhé"* rồi giữa lượt *"update lại nha, cho nút xuống dưới Thông tin giao hàng lại nhé"*). Hiểu: code + Figma theo khung HIỆN TẠI của user (nút Thanh toán nằm đầu thẻ Mã đơn như bố cục khung; lệnh sau cùng quyết chỗ nút Theo dõi). CHỈ `desktop.html`, mobile KHÔNG đổi.
  - **Nút "Theo dõi vận đơn" XUỐNG DƯỚI "Thông tin giao hàng"** (thay cho bullet (6) ở trên): nút VIỀN cỡ LỚN (`btn-o`, cao 48, `.ov-act { width: 100% }`) full bề ngang khối phải (462), nằm SAU cụm hàng Phương thức · Dự kiến giao · Tiến trình (khe 16); hàng tiêu đề khối giao hàng chỉ còn tiêu đề (bỏ `.ov-sec-hd`). Đơn không mã vận đơn: không nút. Thẻ giao hàng cao 170 → **222** (khung 220).
  - **Hàng thông tin BA CỘT ĐỀU** (thay cho bullet (4) "canh đều hai mép"): `.ov-mi { flex: 1 1 0; min-width: max-content }`, vạch dọc 1×14, khe 16 hai bên vạch, nội dung canh TRÁI (308 mỗi cột ở 1440). Cột không bao giờ hẹp hơn nội dung. **Đơn Chờ thanh toán (cổng Payoo + chưa hoá đơn) cần ~1011px mà cột chỉ có 990 ở 1440 ⇒ LUÔN rơi vào `.is-wrap`** (hai mục hàng 1, hoá đơn hàng 2, không vạch); hai đơn hỗn hợp -01 / -02 (Chuyển khoản / QR) cần ~989 — vừa khít 990 khi không có thanh cuộn (bản bóc Figma = một hàng) nhưng thanh cuộn cổ điển của Windows (còn 975) cũng làm chúng xuống dòng; 9 đơn còn lại một hàng 3 cột đều (đo 12 đơn ở DPR 1). Muốn các pha dài cũng một hàng thì phải rút chữ ("Thanh toán qua cổng Payoo", "Chuyển khoản / QR …") hoặc cho chữ xuống dòng TRONG cột — chưa làm, hỏi user.
  - **BỎ mũi tên ">" ở hàng "Tiến trình đơn hàng"** (thay cho (d)): hàng chỉ còn [nhãn · giờ mốc mới nhất], vẫn bấm được mở ngăn kéo, hover gạch chân giờ. Mũi tên hàng HOÁ ĐƠN (trong hàng thông tin) GIỮ — khung vẽ.
  - **Dưới 1180**: hai khối giao hàng xếp dọc (`@media (max-width: 1179px)`).
  - **Đã đo** (DPR 1, 1440, DAFC102938, gốc `.ov-cards`): thẻ Mã đơn 1040×267 (khung 267) · khối đầu 990×96 · thẻ giao hàng y 283 cao **222** (khung 220: khe tiêu đề → nội dung 16 so 14 của khung) · hai khối **512 | 512** (khung 500 | 524 — chữ địa chỉ không xuống dòng ở Figma) · nút Theo dõi **462×48** tại (553, 432) (khung 474×48) · thẻ Sản phẩm y 521 cao 512 (khung y 519) · tổng `.ov-cards` **1033** (khung 1031). `__posDiff` khung user ↔ bóc DOM: chỉ nhiễu 2 px của khe 16 / 14.
  - **Khung user `1159:105033` có một lỗi tự nhiên**: `acc-layout` đang FIXED cao 1061 (không HUG) nên khi thẻ giao hàng cao thêm 50, các thẻ TRÀN 64 px xuống phần đệm dưới (khung vẫn 1802; đáy thẻ cách chân trang 24). Khung dựng từ code cao 1868 vì tính đủ (đáy thẻ cách chân trang 88 = đệm 40 + 32 + khe 16). Nếu muốn đáy sát như khung → nói, vì code đang theo bố cục chuẩn.
  - **Figma lượt 23**: 10 khung `Order detail / desktop · …` dựng lại từ code (bóc DPR 1) rồi thay vào section Tài khoản theo toạ độ tuyệt đối; cao khung = bản bóc (chờ thanh toán −2 do spacing-snap); 0 chữ lệch ở 10/10; số instance bằng khung cũ; 68 con section + 113 node cấp trang không dời. **Bẫy**: bóc ở DPR 1,25 cho viền 0,8 px + đệm méo — `location.reload()` rồi bóc NGAY (xem `_notes/figx/README.md` lượt 23).
- **THẺ SẢN PHẨM KHÔNG CÓ HIỆU ỨNG HOVER (05/10/2026 tối, CHỈ `desktop.html`)** — lệnh user: *"cái thẻ sản phẩm k có hiệu ứng khi hover nhé"* (ngay sau lượt trên). **Hiểu**: thẻ "Sản phẩm (N)" của màn Chi tiết đơn desktop (bảng hàng `.ord-grid`: ảnh + tên + SL + tiền, cả dòng quà tặng) — màn user đang xem; KHÔNG phải thẻ sản phẩm ở PLP / PDP / trang chủ (ở đó hiệu ứng hover duy nhất là dải size quick add rê vào ảnh, tính năng đã chốt 19/08 — không đụng). **User XÁC NHẬN ngay sau đó: "thẻ sản phẩm trong order details á nha không phải ở plp pdp"** — đúng cách hiểu. **Đã gỡ** (khối `.ord-grid`, cuối mục bảng hàng): nền đồng nhạt `::before` tràn 8px trên/dưới + 16px hai bên (`--unofficial-ghost-hover`, skin-li `--cu-surface`) · tên gạch chân · ảnh mờ .85 (cả hai chiều: rê ảnh gạch tên, rê tên mờ ảnh) — 8 dòng CSS; còn `.ord-grid:not(.ord-grid-head) { position: relative; z-index: 0 }` vì kẻ mảnh giữa hai dòng hàng (`::after`) cần. **Giữ**: ảnh + tên vẫn bấm được sang PDP, con trỏ tay (không phải "hiệu ứng"). Bố cục KHÔNG đổi (hàng 975×96 trước = sau). **Đã đo** (DPR 1,25, 1440, rê chuột thật vào tên): `:hover` trúng tên + dòng, `text-decoration none`, ảnh `opacity 1`, `::before` none, nền dòng trong suốt; quét CSSOM: 0 rule `:hover` chạm `.ord-grid` / `[data-order-pdp]`; console sạch. Figma không có trạng thái hover nên KHÔNG đổi gì. Mobile (`index.html`) không có các rule này.
- **Còn treo**: mobile theo bố cục mới?; khung mặc định cũ `1071:54047` (1802) bỏ hay giữ; pha Chờ thanh toán một hàng hay hai hàng (ở trên); nhãn "Theo dõi vận đơn" hay "Theo dõi đơn hàng" (như cũ).

## Trang thương hiệu MOLTON BROWN (dạng "hub") — style + bố cục DAFC, nội dung + thứ tự khối của lookfantastic (04/10/2026)

Lệnh user: *"tạo một brand page cho brand molton brown sử dụng toàn bộ style và layout của DAFC, nhưng dùng nội dung và thứ tự nội dung của website tôi đính kèm"* (lookfantastic.com/c/brands/molton-brown) + *"nhớ tạo entry point của nó từ mục Thương hiệu trên subheader bằng thêm thương hiệu Molton Brown"*. **CẢ 2 FILE.** Báo cáo đầy đủ + bảng ánh xạ + bảng giá: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md`.
- **Thứ tự khối giữ đúng trang gốc** (đọc ở 1440 và 375, cả hai khổ cùng thứ tự): tiêu đề → 5 ô danh mục → banner → đoạn giới thiệu → 4 chip → **Bán chạy nhất** (3 tab Quà tặng / Tắm & dưỡng thể / Nước hoa = 10 + 4 + 10 SP) → 6 bộ sưu tập → 3 ô Khám phá thêm → 4 đánh giá → đoạn giới thiệu cuối. **⚠ HAI CHỖ ĐÃ ĐỔI THEO LỆNH USER cùng ngày** (xem bullet "Về thương hiệu lên đầu + Instagram" ở dưới): "Về thương hiệu" (đoạn cuối trang) LÊN ĐẦU, canh trái; khối 4 đánh giá BỎ, thay bằng khối Instagram. Mỗi khối dựng bằng linh kiện DAFC: dải danh mục vuông (khuôn `brandCatStrip`), đầu mục nhãn nhỏ + dòng Libre (`hmSecHead` / `hmSec`), hàng tab `.acc-tab` (vạch đồng), thẻ `productCard` (quick add giữ), nút `btn-o`. Mobile: dải trượt như mọi dải của bản mobile; desktop: chip 4 cột, dải có mũi tên `.dk-rail`, bộ sưu tập / khám phá lưới 3 cột, khối Instagram 6 ô một hàng.
- **Dữ liệu**: `BRAND_HUBS['Molton Brown']` (ngay dưới `BRAND_PAGES`) giữ toàn bộ nội dung hub; `BRAND_PAGES['Molton Brown']` (`dept:'beauty'`, hero, `desc`) cho PDP tab "Về thương hiệu". **27 SKU** thêm CUỐI `PRODUCTS` (index 48–74, `noHome:true`) + 27 dòng `PRODUCT_CATS` (nhãn lấy đúng cây Làm đẹp của `FILTER_CATS`) — 24 món ở dải Bán chạy nhất (cả 3 tab) + 3 món của khối đánh giá (khối đó nay đã bỏ nhưng 3 SKU GIỮ — vẫn có ở lưới PLP / tìm kiếm). **44 + 3 ảnh** vào `assets/` (`brand-molton-brown-{category,collection,discover,review}-NN.jpg`, `brand-molton-brown-hero-{mobile,desktop}.jpg`, `mb1-0.jpg … mb27-0.jpg`), tải từ static.thcdn.com qua lookfantastic.com **với sự đồng ý của user** (ảnh của Molton Brown/THG, chỉ dùng cho demo); ảnh sản phẩm về khung 3:4 của thẻ DAFC (ảnh vuông đệm nền trắng), 5 ô danh mục cắt hình vuông nội tiếp vòng tròn gốc (bỏ nhãn nướng sẵn).
- **Hub → lưới → PDP**: màn `brand` mở HUB khi hãng có mục trong `BRAND_HUBS`; ô nào cũng dẫn tới lưới PLP của hãng qua `brandHubGo(brand, go)` — `go` = `all` · `cate:<nhãn>` · `scent:<từ trong tên SP>` · `flag:<nhãn cờ>`; `goPlp` nhận `mode.filters` (áp NGAY, thay bộ lọc + khoảng giá cũ), `plpProducts()` nhận `mode.scent`. Lưới của hãng có hub: bỏ hero + dải danh mục, breadcrumb thêm đoạn hãng (bấm về hub) + nhãn đang xem; panel Bộ lọc ra cây Làm đẹp (`isBeautyPlp()` nay đúng cả với PLP hãng có `dept:'beauty'`). **Back của trình duyệt từ lưới về hub**: hub và lưới cùng là màn `plp` nên `brandHubGo` ghi ảnh chụp `plpMode` vào entry lịch sử của hub (`replaceState`), `popstate` đọc `state.plp` và ép dựng lại (`go(..., { force })`).
- **Entry point**: `MENU_BRANDS` thêm `'Molton Brown'` (đúng thứ tự chữ cái, giữa MISBHV và Montblanc) → hiện ở panel mega "Thương hiệu" của subheader desktop (26 hãng chia 9/9/8) lẫn danh sách "Thương hiệu" của drawer mobile (cả 3 ngành dùng chung `MENU_BRAND_SUB`). Khối "Tâm điểm thương hiệu" ở trang chủ Làm đẹp (đã trỏ sẵn tên hãng này) nay mở đúng hub thay vì PLP rỗng.
- **Đổi bản mobile ↔ desktop (kéo cửa sổ qua mốc 768) GIỮ trang Molton Brown** — sửa lượt sau cùng ngày (user: *"dựng bản desktop luôn nhé"* dù bản desktop đã có): cầu nối RESP chỉ mang TÊN màn (`#screen=plp`), nên đứng ở trang Molton Brown mà đổi bản là bản kia dựng `plp` mặc định = trang **Versace** (đo được, cả 2 chiều) — nhìn như chưa có bản desktop. Nay hash mang thêm `ctx` (JSON, `RESP.hash/swap/watch` nhận tham số thứ 6): PLP = `{ m: plpMode, f: plpFilters }` (hãng · hub hay lưới · bộ lọc · dòng hương), PDP = `{ i: pdpIdx }` (SP đang xem — trước cũng rơi về SP đầu). `navCarry()` đóng gói, `navRestore()` đọc lại TRƯỚC `go(first)`; hash là dữ liệu ngoài nên chỉ nhận khoá đã biết, hãng phải có thật (hãng lạ → bỏ cả lượt), nhãn lọc lạ bị `pruneFilters()` rụng, chuỗi tự do bỏ `< >`, SP ngoài khoảng bị bỏ. Đã thử: mở hash trực tiếp, đổi bản thật hai chiều (hub · lưới có bộ lọc · PDP) — đều giữ nguyên.
- **Trang chủ KHÔNG đổi**: `hmDeptOk` loại SKU `noHome` nên dải Hàng mới về / Khuyến mãi của Làm đẹp vẫn 8 / 0 thẻ như trước (đã đo). PLP Làm đẹp (category) và tìm kiếm thì CÓ các SKU mới (đúng nghĩa thêm một hãng vào kho).
- **CHỮ**: viết lại bằng tiếng Việt (đoạn ngắn hơn bản gốc), KHÔNG chép nguyên văn lookfantastic; tên SP / tên dòng hương giữ đúng tên gốc. EN (nút ENG) là bản tự viết riêng — 56 cặp mới trong `I18N` lúc đầu (nhãn khối, đoạn hub, 27 tên SP; đã soát không trùng khoá VI / giá trị EN), nay 49 sau khi gỡ 7 khoá khối đánh giá. Bốn câu đánh giá MẪU do mình viết ("Khách hàng DAFC") đã BỎ cùng khối đánh giá (7 khoá I18N của khối gỡ theo; nội dung cũ ở `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6d). Ô "Rose Dunes" không có SKU cùng tên trong 24 món nên dẫn tới nhóm Nước hoa.
- **GIÁ KHÔNG PHẢI GIÁ DAFC**: quy từ £ theo 1 £ = 34.000 ₫, làm tròn 10.000 (giá giảm: giá gốc làm tròn rồi trừ %, ví dụ Orange & Bergamot 1.630.000 → 1.467.000, -10%). Nhãn "NEW IN" → badge "Mới về" (`tag:'New arrival'`); "COMING SOON" của 3 món tab Bath & Body BỎ (thẻ DAFC không có trạng thái đó); điểm sao ở thẻ BỎ (thẻ DAFC không có chỗ).
- **Đã đo**: mobile 375 + desktop 1440, 0 lỗi console, 0 ảnh hỏng; tab 10/4/10 thẻ; ô "Black Pepper" 3 SP · "Nước hoa" 9 · "Chăm sóc tay" 6 · "Bộ quà tặng" 8 · "Hàng mới về" 10 · "Tất cả" 27; chip bộ lọc đã áp hiện ngay; PDP SP Molton Brown mở được (chip dung tích "Set"/"300 ml", tab "Về thương hiệu Molton Brown"); quick add mở; EN dịch đủ; menu Thương hiệu (bấm thật ở cả 2 khổ) mở hub; nhịp dọc sau dải sản phẩm 40 như trang chủ.
- **Ô "Các bộ sưu tập" + "Khám phá thêm": chữ + CTA NẰM TRONG ẢNH như ô occasion trang chủ Nam/Nữ** (lượt sau cùng ngày, lệnh user: *"chữ và cta trong hình giống homepage nam nữ… áp dụng cho cả mobile và desktop"*; CẢ 2 FILE). Thay khuôn cũ (ảnh trên, tiêu đề + mô tả + nút `btn-o` dưới ảnh). Markup `tile` trong `screenBrandHub` = đúng cấu trúc `hmOccasions`: cả ô là MỘT `<button data-bh-go>` → `.hm-cat-media` + `<span class="hm-occ-scrim">` + `.hm-occ-copy` gồm tiêu đề `p.hm-cat-label` (cùng chuỗi hook `text-[18px] font-medium leading-7`) · mô tả `.t-multiline` · CTA `.t-single` gạch chân (CTA là `<p>`, không phải button lồng trong button). **Dùng LẠI class `hm-occ-scrim` / `hm-occ-copy` của trang chủ** nên các con số (mảng phủ cao 200 · đặc 136 · alpha .55; lề 16; khe 8) không thêm bản sao. So với ô occasion trang chủ mobile trên cùng trang: chữ trắng · Libre Bodoni 18/24 · mô tả Inter 12/18 · CTA 12/16 gạch chân · mảng phủ · lề/khe — trùng từng giá trị; desktop tiêu đề 24/32 (như nhãn ô trang chủ desktop).
  - **Mobile**: dải trượt, ô **264×352 (3:4) = đúng ô occasion**, khe **4** (`.bh-tiles`). **Desktop**: lưới 3 cột khe **4** (trước 16 / 32), ô **1:1 ≈ 456×456 ở 1440** — cao xấp xỉ ô occasion 345×460 (3:4 ở lưới 3 cột sẽ cao 608).
  - **Tỉ lệ**: ảnh nguồn nằm ngang 507×417 nên tỉ lệ đứng nào cũng xén hai mép (3:4 giữ 62% bề ngang, 4:5 giữ 66%, vuông 82%). Đã xem đủ 9 ảnh ở khung thật: phần mất rơi vào mép, không ô nào cần `object-position` riêng. Mobile mình thử 4:5 (264×330) trước rồi chuyển 3:4 vì chỉ mất thêm 4% bề ngang mà cao đúng bằng ô trang chủ.
  - **Mô tả RÚT NGẮN** (9 câu — dữ liệu + khoá I18N + EN, cả 2 file): chữ trong ảnh chỉ vừa ~2 dòng ở lòng 232, khối chữ phải ≤ 116 (+16 lề = 132 < đoạn đặc 136 của mảng phủ). Câu cũ 71–121 chữ → câu mới 57–68, ý chính giữ, bỏ chữ đệm ("một dòng hương…", "trong từng chai"). **Ô "Dòng hương mới: Bluebell & Wild Strawberry" MẤT tên nhà pha chế Véronique Nyberg** (còn "Series Artists of Note, hợp tác cùng nhà thiết kế giày Ancuta Sarca"). Muốn giữ câu dài thì phải nới mảng phủ (che thêm ảnh) — nói lại.
  - **Đã đo**: mobile 375 — 9 ô 264×352, mô tả đúng 2 dòng ở VI lẫn EN (EN ô Fiery Pink Pepper 3 dòng, khối 110), khối chữ 92 / 116, đỉnh khối chữ cách đáy ô 108 / 132 (< 136); desktop 1440 — 9 ô 456×456, mô tả 1 dòng ở VI lẫn EN, khối chữ 82 / 114 (ô tiêu đề 2 dòng). **Tương phản chữ trắng** (PIL mô phỏng `object-fit: cover` + mảng phủ, ô 8×8 sáng nhất trong vùng chữ): mobile 6,19 → 13,6:1 · desktop 5,71 → 15,97:1 (ngưỡng chữ thường 4,5). Bấm thử CẢ 9 ô × 2 khổ → mở đúng lưới PLP của hãng (scent / cate / flag như cũ); VI → EN → VI khứ hồi khớp từng chữ; 0 khoá I18N trùng giá trị EN. ⚠ Desktop hẹp: ở 1280 hai ô (Mesmerising Oudh…, Bluebell…) có khối chữ cao 148 (tiêu đề 2 dòng chạm đoạn dốc của mảng phủ, vẫn ≥ 5,77:1); ở 1024 còn cao hơn (ô tiêu đề 3 dòng = 180; tiêu đề 24px là chữ lớn nên ngưỡng 3:1, ô thấp nhất 3,73:1) — cùng giới hạn của ô occasion trang chủ khi lưới hẹp.
  - Dải "Khách hàng nói gì" lúc đó KHÔNG đổi (user chỉ nhắc bộ sưu tập + khám phá thêm) — nhưng ĐÃ BỎ ở lượt kế, xem bullet ngay dưới.
- **"Về thương hiệu" LÊN ĐẦU + canh trái · "Khách hàng nói gì" BỎ, thay bằng khối INSTAGRAM** (lượt kế cùng ngày, lệnh user: *"cho cái về thương hiệu lên đầu và align left và bỏ cái khách nói gì thì gắn cục như insta á"*; CẢ 2 FILE).
  - **Về thương hiệu**: khối (nhãn nhỏ "Về thương hiệu" + tiêu đề Libre "Nhà hương thơm nước Anh Molton Brown" + 2 đoạn) chuyển từ CUỐI trang lên ngay DƯỚI TIÊU ĐỀ TRANG (trước dải danh mục), canh TRÁI (trước: canh giữa; ⚠ SAU ĐÓ user sửa khung Figma về canh GIỮA — xem bullet "ĐỒNG BỘ NGƯỢC" dưới). Đầu mục dùng chung `hmSecHead` — thêm tham số thứ 6 `left` (mặc định false nên mọi chỗ gọi cũ không đổi). Mobile: lề trái 16; desktop: cột chữ rộng tối đa 720, lề trái 24 (cùng mép với tiêu đề trang và dải danh mục). Không `reveal` (nằm trong màn hình đầu); nhịp 24 trên / 24 dưới ở cả 2 khổ.
  - **Đoạn giới thiệu ngắn dưới banner (khối 4) VẪN CÒN** (user không nhắc tới) — nội dung gần trùng đoạn "Về thương hiệu" vừa lên đầu; muốn gộp / bỏ thì nói.
  - **Instagram = khối `hmInsta()` của trang chủ**, nay nhận tham số ảnh (`hmInsta(imgs = HM_INSTA.imgs)`; trang chủ không đổi — đã soát: mobile 6 ô, desktop 12 ô + nút lật trang chạy). Hub gọi `hmInsta(H.insta)` ở vị trí khối đánh giá cũ: đầu mục "Nguồn cảm hứng / Theo dõi chúng tôi @dafcvietnam" (EN "Get inspired / Follow us"), 6 ô ảnh 4/5 SÁT NHAU — mobile lưới 3×2 (125×156), desktop một hàng 6 ô (229×287; chỉ 1 trang nên `wireInsta()` tự ẩn 2 nút lật). Ô CHƯA bấm được, như trang chủ (link ra instagram.com phải hỏi trước).
  - **ẢNH = ảnh Molton Brown ĐÃ CÓ trong dự án**: 6 trong bộ `home-beauty-*` user giao 30/09 cho trang chủ Làm đẹp (`category-01` · `occasion-01` · `category-02` · `spotlight.webp` · `category-04` · `occasion-02`, xếp theo tông) — KHÔNG tải thêm, không tấm nào lặp với ảnh khác trên hub. Là ảnh MƯỢN chứ không phải bài Instagram thật; handle vẫn là của DAFC (`@dafcvietnam`, chữ "Theo dõi chúng tôi"). Có bài thật thì thay `BRAND_HUBS['Molton Brown'].insta`. Còn 4 ảnh Molton Brown khác trong bộ ấy chưa dùng (`category-03` packshot · `occasion-03` · `hero-01-mobile` · `hero-02-mobile`); muốn desktop có 2 trang như trang chủ (12 ô) thì thiếu 2 ảnh nữa.
  - **GỠ**: khối đánh giá (`rev`, `H.reviews`, `bhStars` / `BH_STAR`, `[data-bh-pdp]` ở `wireBrandHub`), CSS `.bh-rev*` · `.bh-stars` · `.bh-grid4` (desktop) · `.bh-tiles-ovl` (mobile), 7 khoá I18N ("Khách hàng nói gì" · "Đánh giá" · "Khách hàng DAFC" + 4 câu mẫu). GIỮ: 4 ảnh `brand-molton-brown-review-01..04.jpg` (nằm trong assets, chưa dùng) và 3 SKU `mb25..27`.
  - **Sửa luôn lỗi cũ của mình**: `max-w-[760px]` ở bản desktop (đoạn giới thiệu khối 4 + đoạn cuối) là CLASS CHẾT — `tailwind.css` dựng sẵn chỉ có 720 / 860 … — nên đoạn giới thiệu giãn hết 1392; đổi về `max-w-[720px]` (đo: cột 720 canh giữa).
  - **Đã đo** (mobile 375 + desktop 1440): thứ tự khối đúng (tiêu đề → Về thương hiệu → danh mục → banner → giới thiệu → chip → Bán chạy nhất → Bộ sưu tập → Khám phá thêm → Instagram → chân trang); Về thương hiệu `align-items: flex-start` · `text-align: start` · mép trái 16 (mobile) / 24 (desktop); 0 phần tử đánh giá còn lại; 6 ảnh Instagram tải đủ, desktop 2 nút lật ẩn; EN "About the brand / Molton Brown, a British house of scent / … / Get inspired / Follow us @dafcvietnam", VI → EN → VI khứ hồi khớp; tab 10/4/10; chip và ô vẫn mở đúng lưới; console sạch; scan 2 file OK. Figma ĐÃ sync lượt 16 (xem bullet dưới).
- **Figma ĐÃ sync 04/10/2026 (lượt 16)**: 2 khung hub MỚI trong section Brand (`Brand / mobile 375 · Molton Brown hub` `1129:88714` · `… desktop 1440 …` `1128:88196`), menu Thương hiệu (mega Brands desktop + drawer cấp 2 mobile) vá tại chỗ, và 2 khung PLP Làm đẹp dựng lại (Nước hoa nay 35 sản phẩm). Chi tiết + bẫy: `_notes/FIGMA-SYNC-MOLTON-BROWN-HUB-LUOT-16-2026-10-04.md`.
- **ĐỒNG BỘ NGƯỢC từ khung Figma user sửa tay** (lượt kế cùng ngày 04/10; lệnh user: *"[link khung desktop 1128:88196] áp dụng lại theo layout tôi sửa nhé, ẩn đi mấy cái tôi ẩn luôn"*; CẢ 2 FILE — user sửa cả khung mobile `1129:88714`):
  - **Ẩn** (mảng `hide` trong `BRAND_HUBS['Molton Brown']` của MỖI file, ẨN chứ không XOÁ): desktop `['title','intro','chips','tabs']` = tiêu đề trang (h1) · đoạn giới thiệu · 4 chip · hàng 3 tab của dải Bán chạy nhất; mobile `['title','intro','chips','tabs']` (lúc đầu mobile giữ đoạn giới thiệu đúng khung mobile Figma; lệnh kế *"áp dụng cho cả mobile nhé"* ẩn thêm `intro` cho giống desktop — xem bullet "Mobile theo desktop" dưới). Tab ẩn ⇒ dải Bán chạy nhất chỉ còn tab đầu "Quà tặng" (10 thẻ).
  - **Layout**: khối "Về thương hiệu" về canh **GIỮA** (desktop: cột 720 giữa trang, nhãn nhỏ + tiêu đề + 2 đoạn đều canh giữa; mobile: canh giữa) — đảo lại lượt "align left"; **banner đứng TRÊN dải danh mục** (desktop theo khung Figma; mobile theo lệnh "áp dụng cho cả mobile"). Đệm theo khung (đo từ vị trí chữ): desktop About `pt-6` / banner `pt-8` / dải danh mục `pt-6`, đều không đệm dưới; mobile About `pt-6` khi h1 ẩn (khung Figma 26 vì còn đệm đáy 10 của h1 đã ẩn → code 24, lệch 2px).
  - **Mobile theo desktop (lệnh kế: *"áp dụng cho cả mobile nhé"*, chỉ `index.html`)**: hiểu là cho trang MOBILE giống bố cục desktop mà user vừa chỉnh ⇒ ẩn thêm đoạn giới thiệu (`hide` thêm `'intro'`) và dời banner lên TRÊN dải danh mục. Thứ tự mobile nay: đường dẫn → Về thương hiệu (canh giữa) → banner → dải danh mục 150px → Bán chạy nhất (không tab, 10 thẻ) → Bộ sưu tập → Khám phá thêm → Instagram → chân trang. Khoảng cách (đo): chữ About → banner 32 (đệm đáy 16 + `mt-4`) · banner → dải danh mục 24 (`pt-6`, cùng số desktop) · nhãn ô cuối dải → đầu mục Bán chạy nhất ≈ 52 (mốc chung của `hmSec`). **⚠ Code đang ĐI TRƯỚC khung Figma mobile `1129:88714`** (khung đó vẫn hiện đoạn giới thiệu + banner nằm dưới dải danh mục) — chưa sync, không sửa khung của user; lượt sync sau phải bóc lại DOM mobile chứ KHÔNG dựng khung theo khung cũ. Đã đo trên 375: không còn h1 / đoạn giới thiệu / chip / tab; bấm ô danh mục · banner · "Xem tất cả" · ô bộ sưu tập / khám phá mở đúng lưới; EN ↔ VI khứ hồi khớp, không sót chữ Việt; console sạch; ảnh Instagram trang chủ không đổi (6 ô `home-instagram-01…`).
  - **Còn mở (có từ lượt hub, chưa sửa vì ngoài yêu cầu)**: Back từ lưới về hub trả về vị trí cuộn của LƯỚI chứ không phải của hub (đo: hub đứng 1300 → bấm ô → cuộn lưới 900 → Back → hub nằm ở 900). Nguyên nhân: hub và lưới cùng màn `plp`, `goPlp` xoá `SCROLL_MEM.plp` rồi `go()` ghi đè bằng toạ độ của lưới trước khi khôi phục. Hướng sửa gọn: `brandHubGo` ghi thêm toạ độ hub vào state history, `popstate` khôi phục đúng toạ độ đó (cả 2 file).
  - **Cách biết user đã sửa gì**: dựng lại bản gốc vào section tạm rồi so cấu trúc từng khối (`_notes/figx/frame-diff.js`) — không chỉ đọc khung user. Khung mobile còn bị sửa ngay lúc đang đọc ⇒ so lại sau khi sửa code.
  - **Đã đo**: bóc lại DOM rồi so khung CỦA USER — desktop thân trang 116/116 chữ khớp, lệch ≤ 1,6 px; mobile 62/62, lệch ≤ 3,3 px; EN ↔ VI khứ hồi khớp; bấm ô danh mục / bộ sưu tập / banner / "Xem tất cả" mở đúng lưới; console sạch; scan 2 file OK. Báo cáo: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6e. Figma: KHÔNG sửa khung của user; thêm đoạn "lượt 17" vào 2 `[doc] Brand` ghi đây là bản user sửa tay (lượt sync sau đừng dựng lại đè).
- **Chưa làm / ghi nhớ**: Figma chưa có khung cho lưới PLP của hãng và PDP Molton Brown; các hãng khác vẫn dùng trang PLP cũ (muốn hub cho hãng khác chỉ cần thêm mục vào `BRAND_HUBS`); PDP Molton Brown là khuôn chung (chưa có mô tả sản phẩm / bảo quản riêng — `PRODUCT_INFO` trống).

## Checkout DESKTOP — header rút gọn có đường kẻ CHÂN (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"cái header ở check out cho cái line bên dưới nhé"*. Khung Figma step 1 `1107:64741` user đã vẽ sẵn viền `#d3d3d3` cho header (cao 64, viền tính vào trong); code chưa có. "Line" = đường kẻ ngang (cách user dùng từ trước, xem mục "Header: màn Hoàn tất dùng header MẶC ĐỊNH · giỏ desktop thêm đường kẻ chân header" 04/10).
- **Code** (`desktop.html`, cạnh rule đường kẻ chân header của trang Giỏ): `html.skin-mt [data-screen="checkout"] .navbar { border-bottom: 1px solid var(--general-border) }` + `html.skin-mt [data-screen="checkout"] .navbar > div { height: 63px }`. Header rút gọn (`navBar({ logoOnly: true })`: nút back · logo · "Thanh toán an toàn & bảo mật") KHÔNG có sẵn viền nào (đo: border-bottom 0) nên phải thêm; hàng trong hạ 64 → 63 để cộng viền 1 = **64** — đúng khung Figma của user, trang không dịch 1 px. Viền đặt trên `.navbar` ngoài (tràn hết khung nhìn) chứ không phải hàng trong (bị `max-w-[1440px]` cắt ngắn ở màn rộng). Màu `--general-border` #d3d3d3 = cùng đường kẻ chân header ở trang Giỏ.
- **Phạm vi**: chỉ màn Thanh toán, cả trạng thái "đã đặt hàng rồi mà quay lại" (cùng header); trang Giỏ / Home / PLP không đổi. Chỉ bộ da `skin-mt` (các bộ da đóng băng không đụng). **Mobile KHÔNG đổi** (header 48, chưa ai nói; khung Figma mobile cũng không có viền).
- **Đã đo** (pane đo viền 1 px = 0,8): header 63,8 = 63 + 0,8 (1 px thật → 64), `rgb(211, 211, 211)`; tiêu đề "Đặt hàng" · `#ckSections` lệch chỉ −0,2 (do 0,8); Giỏ / Home navbar border-bottom 0 (không đổi); console sạch; ảnh: đường kẻ mảnh chạy hết bề ngang dưới header.
- **Figma ĐÃ sync 05/10 (lượt 21, user: "sync vào figma nhé")**: khung step 1 `1107:64741` của user đã có viền (4 cạnh 1 px, `#d3d3d3` buộc biến `border`, tính vào trong — chỉ cạnh dưới đáng kể, header 64); 5 khung dựng lại (`1150:102287` · `1149:101322` · `1149:101517` · `1149:101705` · `1149:101956`) được thêm ĐÚNG viền đó (header 62 → 64, `box` 1438, mỗi khung cao thêm 2 px: 923 · 1078 · 1074 · 1398 · 1454). Khung user không đổi. Báo cáo: `_notes/FIGMA-SYNC-CHECKOUT-LUOT-21-2026-10-05.md`.

## Checkout DESKTOP — các bước: huy hiệu số 40, chữ tiêu đề + chữ nội dung cùng cách mép cột 52 (05/10/2026, CHỈ `desktop.html`)

Lệnh user (kèm link Figma `1107:64765` = `ck-sec ck-cur` của khung `Checkout / desktop · step 1 guest`, step 1 do user SỬA TAY): *"ở bản desktop cái check out chỉnh mấy step kia theo kích thước mà tôi sửa cho step 1: 1. tăng size của ô số step lên 52 · 1.1. tăng khoảng cách từ chữ các nội dung ra viền khung là 52 bằng với khoảng cách từ chữ title của step ra tới viền khung = 52"*.
- **Đọc khung step 1 của user (đo, không đoán)**: huy hiệu (instance `step-badge state=current`) **40×40** (thư viện 32; user kéo to tại chỗ) · khe huy hiệu ↔ tiêu đề 12 ⇒ **chữ tiêu đề cách mép 52** · hàng tiêu đề cao 40 (đệm 20 / 20 ⇒ cả hàng 80) · thân bước: `collapsible-content` đệm trái **32** + các khối `inset` đệm trái **20** ⇒ **chữ nội dung cách mép 52**. Bản cũ (đo trong code + khung chưa sửa): huy hiệu 32, tiêu đề 44, nội dung 44, hàng 72.
- **Cách hiểu "ô số step lên 52"** (nói lại nếu khác ý): 52 = bề ngang phần đứng trước chữ tiêu đề = huy hiệu 40 + khe 12 (đúng số trong khung step 1), KHÔNG phải đường kính huy hiệu — khung của user cho huy hiệu 40, không phải 52. Nếu cần huy hiệu tròn 52 thật thì tiêu đề lùi 64.
- **Code (4 chỗ, áp cho MỌI bước 1–4 và MỌI trạng thái đang mở / đã xong / chưa tới)**: (1) `.ck-step-no` 32 → **40** (chữ số giữ 14/20 Libre); (2) hàng tiêu đề trong `ckSection()` `h-[72px]` → **`py-5`** (đệm 20 / 20 quanh huy hiệu 40 = 80; ⚠ `h-[80px]` KHÔNG có trong `tailwind.css` bản build sẵn — class chết; `py-5` có); (3) `#ckSections > .ck-sec > .acc-body > .acc-inner` đệm trái 28 → **32**; (4) con trực tiếp của nó đệm trái 16 → **20** (đè `px-4`, chỉ phía trái; phải giữ 16). 32 + 20 = 52 là HAI SỐ ĐÚNG THANG spacing (`spacing/8` + `spacing/5`), đúng cách user chia trong Figma — bản cũ 28 + 16 có số 28 lệch thang.
- **Đã đo** (1440, cột trái 872): bước 1–4 đều huy hiệu 40×40 tại x 0, tiêu đề x = 52, hàng tiêu đề 80; thân bước (mở) chữ đầu tiên x = 52, thẻ tóm tắt bước đã xong (`border`) từ x = 52 đến 856, thẻ phương thức thanh toán + câu điều khoản (bước 4) x 52 → 856; nút "Thay đổi" vẫn cách mép phải 16; vòng focus ô nhập vẫn nằm trong hộp cắt; console sạch; `node --check` 2 khối script OK.
- **CHƯA áp — lề PHẢI**: khung step 1 của user để ô nhập chạy SÁT mép cột (ô 402 + 402 + khe 16 = 820, tới x = 872); code giữ lề phải 16 (nội dung dừng ở 856, ô nhập 394). Vì user chỉ nói lề trái, và đẩy sát mép đòi bỏ padding phải của khối con + chừa chỗ cho vòng focus (`.acc-inner` đang `overflow: hidden`). Muốn sát mép thì nói — sửa một chỗ trong rule CSS ngay dưới `#ckSections`.
- **SỰ CỐ DO MÌNH — lượt chỉnh spacing cùng ngày làm lệch 4 px**: `spacing-snap.js` kéo `collapsible-content` đệm trái **28 → 24** (và `44 → 40` ở thân các bước đã xong) ở 5 khung Thanh toán desktop (`1107:64741` · `1107:65162` · `1107:65345` · `1114:66207` · `1115:66787`) — "hoà thì số nhỏ" phá đường dóng 44 = 32 + 12 (chữ nội dung 40 so với tiêu đề 44). Đó là cái lệch user thấy ở step 1 rồi tự chữa bằng 52 / 52. Công cụ đã được vá: đệm NGANG ≥ 28 lệch thang (28 · 36 · 38 · 44 · 52 · 56 …) nay chỉ BÁO (nhóm `align`), không tự chỉnh; `__spRevert` không ghi đè ô user đã sửa tay. Tổng đệm ngang hoà số ≥ 28 đã đổi hôm nay: 46 (13 ở khung Thanh toán desktop); **còn 33 chỗ cùng kiểu ở khung khác** (Chi tiết đơn desktop bản cũ, Điểm tích luỹ, bảng size PDP, `Right 28 → 24` ở khung PDP …) — danh sách `_notes/figx/spacing-align-suspects-2026-10-05.json`, chưa rà từng cái xem có đường dóng nào bị vỡ không.
- **SỬA LỖI cùng ngày (user chụp ảnh, kẻ đường dóng đỏ)**: bước Vận chuyển khi ĐÃ ĐĂNG NHẬP — khối "Sổ địa chỉ" + thẻ địa chỉ + nút "+ Thêm địa chỉ mới" nằm ở **68** trong khi tiêu đề và nút Xác nhận ở 52 (thụt 16). Nguyên nhân: rule đầu `.acc-inner > * { padding-left: 20px }` đè 20 lên MỌI con trực tiếp, mà `#addrOpts` (khối bọc, KHÔNG mang lề) chứa một div `px-4` bên trong ⇒ 32 + 20 + 16 = 68; bản cũ 28 + 0 + 16 = 44 vẫn thẳng. Sửa: đè 20 lên `.px-4` NGOÀI CÙNG trong thân bước — `.acc-inner .px-4:not(.acc-inner .px-4 .px-4)` — bọc bao nhiêu tầng cũng ra 52. Soát bằng máy 10 trạng thái (khách · đã đăng nhập × bước 1–4, cộng "thêm địa chỉ mới" và "sửa địa chỉ"): MỌI khối của thân bước có mép trái đúng **52**, mép phải 856; ở luồng khách không có `.px-4` ngoài cùng nào nằm sâu hơn con trực tiếp nên hình học 5 khung Figma đã sync không đổi; chỉ khung signed in phải dựng lại. Bài học: soát đường dóng ở MỌI trạng thái của màn (đăng nhập / chưa, form mới / sửa), không chỉ trạng thái mặc định — lượt đầu mình đo đúng luồng khách rồi tưởng xong.
- **Figma ĐÃ sync 05/10 (lượt 20)**: khung step 1 `1107:64741` là CỦA USER (đã thêm vào `PROTECT` của `comp-audit.js` + `spacing-snap.js`) — giữ step 1, thay 3 hàng bước chưa tới + thẻ Tóm tắt + ruột giỏ + chiều cao cột (1151 → 1184); 5 khung dựng lại từ code: `1150:102287` (step 1 signed in — dựng lại lần 2 sau lỗi đường dóng) · `1149:101322` (bước 2) · `1149:101517` (bước 3) · `1149:101705` (bước 4) · `1149:101956` (bước 4 COD). Báo cáo + id: `_notes/FIGMA-SYNC-CHECKOUT-LUOT-20-2026-10-05.md`.
- **Số bước (chữ số trong huy hiệu) sửa tại component GỐC — Figma lượt 21 (05/10)**: user: *"cái số step sau mấy đợt sync vẫn chưa được sync chính xác"*. Gốc: master `step-badge` (`547:25303`, trang components) để chữ số **Inter 12, trắng / #404040**, còn code (`.ck-step-no t-lead`) là **Libre Bodoni 14/20, ls 0,5 px** — bước đang mở chữ #ccbca5 (`copper-line`) trên nền #0a0a0a, bước chưa tới / đã xong chữ #81604d (`copper-ink`) trên nền #f5f5f5. Mỗi lượt sync ráp lại instance theo master nên kiểu chữ cũ quay về, chỉ sửa tay mới đúng. Đã sửa tại chỗ master (text style `t-card-title`, fill buộc `copper-line` / `copper-ink`, KHÔNG dựng lại): 52 instance (mobile 28 · desktop 24) ăn theo — mobile đổi theo vì code mobile dùng đúng kiểu chữ này (huy hiệu 32). Đo từng instance: style đúng, nhãn canh giữa (40×40: x ≈ 16, y 10 · 32×32: x ≈ 12, y 6).

## Checkout DESKTOP — tóm tắt "Giỏ hàng (N)": số lượng SÁT TRÁI cùng hàng với giá, như mini cart (05/10/2026, CHỈ `desktop.html`)

Lệnh user (kèm link Figma `1107:64862` = `ck-bag` của khung `Checkout / desktop · step 1 guest`): *"trong cái giỏ hàng này dòng bộ layout với mấy cái giỏ ngoài chứ, vị trí của số lượng nằm giống cái cart mini á"* — hiểu: đồng bộ layout hàng sản phẩm với các giỏ bên ngoài (trang Giỏ + mini cart), số lượng đứng như mini cart.
- **Trước**: số lượng dính trong dòng phân loại ("Onesize , Black · SL 1"), giá đứng một mình ghim đáy phải. **Giờ**: hàng cuối cột chữ = **`x1` SÁT TRÁI** (12/16 mực mờ, `t-single`) + **giá SÁT PHẢI** (`pc-price`), `flex items-center justify-between gap-2 pt-1`, ghim đáy cột chữ (cột `justify-between` kéo theo ảnh 100×133). Cùng khuôn `ccRow` của mini cart (`x1` · giá, 27/09) và hàng trang Giỏ (bộ đếm · giá, brief PDF tr.25). Dòng phân loại chỉ còn phân loại (ẩn hẳn nếu rỗng). Hàng quà không có số lượng nên không đổi.
- **Đã đo** (1440): ảnh 100×133; `x1` x = 1064 (= mép phải ảnh 1052 + 12), đáy 628; giá mép phải 1385 (= mép phải hàng), đáy 629 = đáy ảnh — đúng quan hệ của mini cart (qty x = 1143 = 1131 + 12, giá mép phải 1398, đáy giá = đáy ảnh). Hàng vẫn cao 133, khe hàng 153; số lượng 3 / 12 → `x3` / `x12` giữ chỗ; console sạch; `node --check` 2 khối script OK.
- **KHÔNG đổi** (nói nếu muốn): (1) **mobile** `index.html` (tóm tắt Thanh toán, dòng ~14756) vẫn "phân loại · SL n" — user chỉ đưa khung desktop; (2) tên hãng ở tóm tắt 12/18 Inter, ở giỏ + mini cart 14/20 Libre Bodoni; tên 2 dòng (giỏ 1 dòng); giá 12/18 (trang giỏ 14/20); (3) giá giảm màu ĐỎ ở giỏ / mini cart, ở tóm tắt để đen.
- **Figma ĐÃ sync 05/10 (lượt 20)** — 6 khung Checkout desktop có `ck-bag`: 5 dựng lại từ code + khung user `1107:64741` vá tại chỗ (giữ id `ck-bag` `1107:64862`, thay ruột `#ckSumAcc`). Đo trong Figma: "x1" x = 112 (ảnh 100 + khe 12), giá sát phải đáy = đáy ảnh, 0 chữ "SL n".

## Checkout: dòng "Phí vận chuyển" — đổi nhãn · "--" khi chưa chọn · hiện phí NGAY khi khách bấm chọn phương thức (04/10/2026)

Lệnh user: *"ở trong check out có cái chi phí 'giao hàng' sửa lại là 'phí vận chuyển' · bên giá trị thì để -- · khi khách điền xong thông tin vận chuyển và chọn phương thức thì mình show luôn"*. CẢ 2 FILE (`index.html` + `desktop.html`; 3 bản fork đóng băng không đụng).
- **Nhãn**: "Giao hàng" → **"Phí vận chuyển"** (EN "Shipping fee", khoá có sẵn) ở cả 3 chỗ in: mobile khối tóm tắt cuối bước Thanh toán (`#ckShipVal2`), mobile sheet "Giỏ hàng" (`#ckShipVal`), desktop panel "Tóm tắt đơn hàng" (`#ckShipVal`). Nhánh "Nhận tại cửa hàng" ("Nhận hàng / Tại cửa hàng") giữ nguyên — vẫn không tới được (`CK_PICKUP = false`).
- **Giá trị chưa chọn**: **`--`** (hai gạch ngang ASCII đúng như user ghi), chữ mờ. Trước là "Sẽ được tính sau" — khoá i18n mồ côi nên gỡ ở 2 file. Chọn xong: "Miễn phí" / "25,000đ" chữ đậm (EN "Free").
- **"Show luôn" = hiện NGAY lúc bấm một dòng ở bước Phương thức vận chuyển**, không đợi nút "Xác nhận & tiếp tục" (trước đây phí chỉ hiện sau khi xác nhận, `ckMaxStep >= 2`). Bấm "Giao hàng hỏa tốc" → dòng phí `25,000đ` + Tổng cộng +25.000 cùng lúc; bấm lại "tiêu chuẩn" → "Miễn phí", tổng về cũ. Vẫn còn đường thứ hai: bấm "Xác nhận" mà không bấm dòng nào (giữ dòng chọn sẵn "tiêu chuẩn") cũng tính là đã chọn → "Miễn phí".
  - **Code**: cờ mới `ckShipPicked` (cạnh `ckShipFast`) + `ckShipChosen() = pickup? false : (ckMaxStep >= 2 || (ckMaxStep >= 1 && ckShipPicked))` — `ckMaxStep >= 1` chính là "điền xong thông tin vận chuyển". Chữ dòng phí gom về **một hàm** `ckShipText()` (trước: biểu thức ba tầng chép 3 lần/file); phần vẽ lại tách khỏi `paintCheckout` thành **`paintCkMoney(root)`** để handler bấm-chọn gọi riêng mà không đụng các section. Cờ về false ở mọi chỗ `ckMaxStep` về 0: đổi hình thức nhận hàng · đăng nhập/đăng xuất (`data-auth`) · "Tiếp tục mua sắm" (`data-reset`, nơi này còn trả `ckShipFast` về false để chạy lại demo không bị dính dòng "hỏa tốc" chọn sẵn).
  - **SỬA LỆCH CŨ cùng lượt**: `ckShipFee()` nay cũng đọc `ckShipChosen()` (đường "về 0đ" thứ tư). Trước đây tổng cộng thẳng `ckShipFast` nên khách bấm "hỏa tốc" mà chưa xác nhận thì Tổng đã +25.000 trong khi dòng phí còn ghi "chưa tính" — hai con số lệch nhau. Nay dòng phí và Tổng cùng đọc MỘT mốc.
- **Đã đo** (mobile 375 + desktop 1440, khách vãng lai + đã đăng nhập): bước 0 / bước 1 chưa bấm → nhãn "Phí vận chuyển", `--` màu `rgb(114,114,114)`, tổng không phí · bấm hỏa tốc → `25,000đ`, tổng +25.000 (186,057,000 → 186,082,000; đăng nhập 184,817,000 → 184,842,000) · bấm lại tiêu chuẩn → "Miễn phí" · xác nhận / "Thay đổi" / sửa lại bước 1 → phí giữ đúng · EN: "Shipping fee" · `--` · "Free" · chạy lại demo → `--` + dòng chọn sẵn về tiêu chuẩn · `placeOrder` với hỏa tốc: đơn `ship "25.000 ₫"`, `method "Giao hàng hỏa tốc"`, tổng 113.525.000 = 113.500.000 + 25.000 · click chuột thật trên desktop (không chỉ `.click()`) · hàng dòng phí cao 36 bằng các hàng anh em (desktop hàng cuối khối 48 = 36 + đệm đáy 12 của hàng cuối), mép phải giá trị = lề phải (mobile 359 = 375 − 16; desktop 1400) · console sạch · `node --check` OK, chú thích 0 vi phạm.
- **Hai chỗ mình hiểu — nói lại nếu khác ý**: (1) `--` là hai gạch ngang chữ (nếu muốn gạch dài `—` hoặc `–` thì đổi trong 1 hàm `ckShipText()` mỗi file); (2) "chọn phương thức" = BẤM một dòng (hoặc xác nhận bước) — chỉ đứng ở bước Phương thức vận chuyển với dòng "tiêu chuẩn" sáng sẵn mà chưa bấm gì thì vẫn `--`.
- **Figma ĐÃ sync 04/10/2026 (lượt 16)** — vá TẠI CHỖ 13 lớp chữ: nhãn "Giao hàng" → "Phí vận chuyển" ở 6 khung Checkout desktop + 3 khung mobile bước 4 + 2 khung "promo code field" (section Cart all cases), giá trị "Sẽ được tính sau" → "--" ở desktop bước 1 (khách · đã đăng nhập) / bước 2 và 2 khung promo; nhãn nút "Giao hàng" (chọn hình thức nhận hàng) GIỮ. Báo cáo: `_notes/FIGMA-SYNC-MOLTON-BROWN-HUB-LUOT-16-2026-10-04.md`.

## Figma: SYNC TOÀN BỘ các trang + ngày cập nhật trên từng section (04/10/2026, lượt 15)

Lệnh user: *"sau đó sync toàn bộ các trang vào figma và note ngày cập nhật trên section cho tôi nhé"*. Báo cáo + id: `_notes/FIGMA-SYNC-TOAN-BO-2026-10-04.md` · README figx mục lượt 15 · helper `_notes/figx/sync-helpers.js`.
- **Đo trước, vá sau**: bóc DOM ~150 trạng thái từ code hiện tại và so từng khung Figma (chữ · vị trí · khổ). **Lệch thật → dựng lại / thay 31 khung**: Hoàn tất m/d (header mặc định) · giỏ mobile 3 + 10 (tóm tắt theo khung 808:146543, −42 px) · giỏ desktop empty · Auth desktop 6 + mobile sign-up complete (bản cũ raw, thiếu link footer) · Danh sách đơn m/d (12 đơn) · Home Nữ m/d + Men desktop + Men Sale rail desktop · Brand desktop · PDP + mini cart. **Vá tại chỗ**: 29 khung PDP (hộp ưu đãi phẳng · "Trả góp từ …" · nhãn bộ sưu tập chỉ SP4 · khung mobile HUG), 15 khung giỏ desktop (viền chân header), component `side-panel promo-pdp` / `product-cta` / `sort-popover` (6 mục). **Còn lại KHỚP** (Menu · Search · Policy · PLP trang · Account · Chi tiết đơn · Checkout desktop · mini cart…).
- **Ngày trên section**: đuôi tên `· updated 04/10/2026` (có đổi: Home · Add to cart · Brand · Cart · Checkout · Account & auth · PDP · Cart all cases · PLP) hoặc `· checked 04/10/2026` (chỉ soát: Menu · Search · Policies · PDP installment popup); đoạn "Cập nhật 04/10/2026 — …" trong khung `[doc]` của từng section.
- **KHÔNG đụng** (của user hoặc chờ chốt): `807:145800` · `808:146310` · `804:136729` · `804:137279` · `934:59629` · `734:52984`; PDP 24 khung dựng 11/09; lớp nổi PLP / cookie / đổi quà / chọn tỉnh chưa soát. Bản cũ Home Men desktop (có chỉnh tay: khe 32, hero chồng dải khuyến mãi) CẤT ở section `Archive 04/10/2026 — Home desktop Men` (`1125:87756`).
- **⚠ Phát hiện ngoài Figma — chờ user chốt**: mọi mã ưu đãi demo (`VOUCHERS`, 10 mã) đã **hết hạn** (7 mã `exp 30/09/2026` + 3 mã cố ý hết hạn 30/06) — từ 01/10 không áp được mã nào ở giỏ lẫn thanh toán ("Mã đã hết hạn ngày …"). Muốn demo tiếp: gia hạn `exp` hoặc bỏ kiểm hạn (kéo theo chữ "WARDROBE REFRESH [01/09 – 30/09]" và ngày giao đặt trước "30/09/2026"). Khi bóc case có mã mình chỉ gán tạm `voucherExpired = () => false` TRONG TRANG, không sửa file.

## Header: màn Hoàn tất dùng header MẶC ĐỊNH (cả 2 file) · giỏ desktop thêm đường kẻ chân header · VÁ desktop.html mất khối THEMES (04/10/2026)

Lệnh user: *"header của trang thanh toán thành công là header mặc định luôn á, header của homepage. còn trong trang cart header ở desktop sẽ có thêm 1 line bên dưới nhé"*.
- **Màn Hoàn tất → `navBar()` mặc định (CẢ 2 FILE)**: bỏ `navBar({ logoOnly: true })`. Desktop: thanh khuyến mãi 32 + hàng logo 64 + hàng danh mục 64,8 = **160,8** (trước: 1 hàng logo 64) ⇒ trang 1020 → **1117**, thân 456 không đổi. Mobile: header 48 đủ burger · tìm · logo · tài khoản · giỏ, **dính đầu trang** (trước: logo giữa, không dính) ⇒ trang vẫn 1386 (cùng 48). Đã bấm thử: burger mở menu · icon giỏ về giỏ · logo về trang chủ · cuộn 500 header vẫn ở top 0 · mã đơn 1 dòng (đơn thường + đơn tách).
  - **Dải khuyến mãi đen 32px KHÔNG đưa vào ở mobile**: ở mobile nó do TỪNG màn tự dựng (chỉ trang chủ + PLP có), không nằm trong `navBar()`; mọi màn mobile khác (giỏ, PDP, tài khoản…) cũng không có nên Hoàn tất theo nhóm đó. Desktop thì thanh này NẰM TRONG `navBar()` nên tự có. Muốn mobile Hoàn tất có dải đen như trang chủ thì nói — chép đúng khối của `screenHOME`.
  - Header rút gọn (`logoOnly`) vẫn dùng ở Thanh toán / cổng thanh toán — không đổi.
- **Giỏ DESKTOP: đường kẻ chân header** (`desktop.html`, 1 rule CSS cạnh rule hairline `.dk-sub`): `html.skin-mt [data-screen="cart"] .navbar .dk-sub { border-bottom-color: var(--general-border) }` — viền đáy hàng danh mục đổi từ `#ececec` (hairline nhạt vẫn dùng ở mọi màn khác) sang **`#d3d3d3`** (token đường kẻ chuẩn của dự án), tràn mép, 1px.
  - **Cách đọc "thêm 1 line"**: line = đường kẻ ngang (user từng dùng đúng chữ này: "bỏ cái line bên dưới subtitle"); hiểu là chân header ở giỏ cần có MỘT đường kẻ nhìn thấy rõ. Header giỏ vốn là header mặc định giống trang chủ (đã đo: cùng cấu trúc, cùng 160,8) và đã có 2 hairline `#ececec` rất nhạt, trên nền trắng của giỏ gần như không thấy — nên đổi MÀU viền chân chứ không thêm phần tử.
  - **Vì sao đổi màu viền sẵn có, không thêm `::after` / phần tử mới**: (1) header giữ nguyên **160,8**, bốn hằng số sticky ở mục "GOM MỘT CHỖ" không phải dịch; (2) viền này đã có cơ chế riêng khi mega panel mở (`:has(.dk-mega.open)` đặt trong suốt để panel liền khối với header) — đường kẻ vẽ riêng sẽ cắt ngang panel. Độ ưu tiên (0,4,1) thắng rule nền (0,3,1), thua rule mega-open (0,5,1) ⇒ đo: giỏ `rgb(211,211,211)` · giỏ + mega mở `transparent` · trang chủ / PLP / Hoàn tất vẫn `rgb(236,236,236)`.
  - Phạm vi: CHỈ màn `cart` (cả trạng thái giỏ rỗng — cùng một screen) và CHỈ desktop. Mobile giỏ không đổi.
  - **Nếu ý user khác** (vd. một line RIÊNG nằm cách header vài px, hoặc line theo bề rộng nội dung 1440 − 2×24, hoặc hàng chữ / bước thanh toán) — chỉ cần nói, đổi trong 1 rule này.
- **SỰ CỐ ĐÃ VÁ — `desktop.html` mất 238 dòng (khối `FONTS` / `FONT_PAIRS` / `THEMES` / `applyTheme` + 2 dòng chèn `filterSheet()` / `menuSheet()`)**: 04/10 mở bản desktop thấy viewport RỖNG, console `THEMES is not defined` ở panel Cài đặt (ném giữa script nên đoạn khởi động ở cuối file không chạy). Nguyên nhân: script đơn giản hoá Hoàn tất tối 03/10 (`apply_done.py`, bước "gỡ hàm `confetti`") dùng regex không tham `/\* ── Confetti ── \*/\nfunction confetti\(\) \{.*?\n\}\n\n` — ở desktop hàm confetti kết thúc bằng `}` rồi NGAY `/* ── Boot ── */` (không dòng trống) nên `.*?` chạy tiếp tới chỗ `}` + dòng trống ĐẦU TIÊN, tức hết `applyTheme`, nuốt 238 dòng. Index.html kết thúc có dòng trống nên không dính. Đã trả nguyên văn từ bản sao lưu 02/10 17:20 + gỡ bản confetti dời chỗ (kết quả: confetti → Boot → … → `applyTheme` về đúng thứ tự gốc, 1 hàm confetti). Kiểm: `diff` với bản 02/10 không còn hunk xoá lớn (49 hunk, đều là sửa có chủ ý) · khai báo toàn cục 630 → 631 (chỉ `ETA` → `SHIP_ETA_STD` / `SHIP_NAME_STD` ở cả 2 file, đúng ý) · `node --check` OK · mở lại: màn `home`, `THEMES` = d / copper / dplus, console sạch.
  - **Hệ quả cần biết**: từ tối 03/10 các lần "đo desktop" của mình chạy trên trang CHƯA KHỞI ĐỘNG (gọi `go('done')` thẳng nên layout vẫn đúng, nhưng phần gắn toàn cục — panel Cài đặt, `wireBlurCheck`, `RESP.watch` — không chạy). Số đo bố cục màn Hoàn tất / Figma lượt 14 không bị ảnh hưởng (markup thuần); user mở `desktop.html` trong khoảng từ 23:15 03/10 tới lúc vá 04/10 sẽ thấy trang trắng.
  - **Bài học (đã ghi memory)**: xoá khối bằng regex thì (a) ĐỪNG dùng `.*?\n\}\n\n` làm mốc kết thúc hàm — dùng đúng chuỗi kết thúc đã biết hoặc cắt theo vị trí 2 mốc và `assert` số dòng bị cắt; (b) sau mỗi lượt sửa hàng loạt chạy `diff` với bản sao lưu và nhìn các hunk XOÁ lớn; (c) "đã đo trên trang" chỉ đáng tin khi `current` khác null và console sạch lúc tải.
- **Figma: ĐÃ sync cùng ngày (lượt 15, user: "sync toàn bộ các trang…")** — Order success m/d dựng lại với header mặc định (`1121:67717` · `1121:67452`); 15 khung giỏ desktop có viền chân header `#d3d3d3`. Chi tiết ở mục ngay trên.

## Tóm tắt đơn hàng MOBILE (giỏ): theo kích thước khung Figma `808:146543` của user + ô ưu đãi DAFC đệm 8 → 12 (03/10/2026, CHỈ `index.html`)

Lệnh user (kèm link Figma `node-id=808-146543`): *"tom tắt đơn hàng ở mobile update lại theo kích thước của tôi nhé, các ô chọn ưu đãi dafc tăng padding top bottom từ 8 lên 12 nhé"*.
- **Cách đọc**: `808:146543` = khối `dk-cart-block` của khung `Cart / mobile · signed in · membership discount` (section "Cart — all cases") — khung ĐÃ DO USER SỬA ⇒ áp vào CODE, không sửa Figma. Để lọc đúng chỗ user đã đổi, mình so khối này với cùng khối ở 12 khung giỏ mobile còn lại: chỉ 808 lệch ở **đệm trên cụm tiền 0** (các khung khác 16) · **khe vùng nút 8** (16) · **`#pbhAcc` đệm trên 0** (13) · **ô ưu đãi chữ 12/16, đệm 12** · tiêu đề DAFC Rewards Medium. Còn khung `807:146033` (điểm thưởng đã áp) chỉ đổi đệm ô ưu đãi 8 → 12. Những số "+2" (đầu panel 18/14, hàng Tổng cộng 55) có ở MỌI khung ⇒ là hệ quả đời dựng Figma, KHÔNG phải chỉnh của user nên không áp.
- **Code (cả 4 chỗ + 1 rule, chỉ mobile)**:
  1. cụm [bảng tiền + ô mã] `py-4` → **`pb-4`** (đệm trên 16 → 0; dòng tiền đầu đã có đệm 8): cụm 164 → **148**.
  2. ô chọn ưu đãi (`dafcRewards`): nút `py-2` → **`py-3` (8 → 12)**; tên lựa chọn `t-lead` 14/20 → **`t-single` 12/16** (theo 808; vẫn 500 qua hook `.dk-reward-name`); dấu radio **bỏ `mt-0.5`** (margin đó chỉ để canh với dòng 20 của chữ 14/20; chữ 16 cao bằng radio 16 nên tự thẳng tâm — đã đo tâm radio = tâm chữ). Cao ô 38 → **42** (12 + 16 + 12 + viền 2).
  3. `#cartCta` `gap-4` → **`gap-2`** (dòng điểm thưởng ↔ nút Đặt hàng 16 → 8): 82 → **74**.
  4. `#pbhAcc`: bỏ `pt-3` VÀ `.dk-sum-acc { padding-top: 12 → 0 }` (rule cũng cấp 12 — hai nguồn cho một số, phải gỡ cả hai): 69 → **57**. Rule này chỉ có ở mobile (desktop.html có rule riêng).
- **Đã đo** (375, đã đăng nhập, ưu đãi thành viên = trạng thái khung 808): cụm tiền 148 ✓ · hàng tiền 34 ✓ · rewards 160 trong pane (161 với viền 1px) ✓ · ô ưu đãi 41,6 (42) đệm 12/12/12/12, chữ 12/16 #404040 ✓ · cta 74 ✓ · `#pbhAcc` 56,8 (57) ✓ · cả khối 567,6 (569 với viền 1px) so khung 571 — chênh còn lại đúng +2 của hàng Tổng cộng do đời dựng. Thử chọn "Sử dụng điểm thưởng": ô nhập + nút Áp dụng + dòng "1.240 điểm khả dụng" vẫn gọn, radio thẳng tâm chữ. Console sạch; quét cú pháp OK.
- **KHÔNG áp / chờ user**: (a) tiêu đề "Ưu đãi chương trình DAFC Rewards" ở 808 là **Inter Medium** 14/20, code đang 400 — đây là ĐỘ ĐẬM (không phải kích thước) và chữ thường 500 phải có ngoại lệ có tên ở STYLE-RULES §1.1 ⇒ để nguyên; (b) khung 807 vẫn để chữ ô ưu đãi **14/20** (chỉ đệm 12) — mình theo 808; muốn 14/20 thì trả `t-single` → `t-lead` và thêm lại `mt-0.5` cho radio.
- **Desktop KHÔNG đổi** (user nói mobile). **Figma**: 808 là khung của user; 807 + 10 khung giỏ mobile khác còn kích thước cũ (đệm trên 16, khe cta 16, `#pbhAcc` 13, ô ưu đãi 38 / 46) — sync khi user bảo.

## Màn Hoàn tất DESKTOP: GỠ hiệu ứng pháo hoa (confetti) (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"bỏ cái hiệu ứng pháo hoa khi đặt xong đơn hàng nhé"* (không nói khổ — chọn desktop vì ĐÂY là nơi duy nhất nhìn thấy confetti). Ghi chú + mã gỡ nguyên văn để hoàn tác: `_notes/GO-PHAO-HOA-HOAN-TAT-2026-10-05.md`.
- **Đã gỡ** (4 mảnh): host `#confettiHost` trong `screenDONE()` · lệnh `if (name === 'done') confetti()` ở `go()` · hàm `confetti()` · CSS `.confetti` + `@keyframes fall`. **Giữ**: vòng tick (`#ring` hiện ra, `#tick` vẽ nét).
- **Mobile (`index.html`) KHÔNG đụng**: host nằm DƯỚI lớp `relative z-20 bg-background` phủ header + thân nên mobile chưa bao giờ nhìn thấy confetti (chú thích 03/10 trong mã) — không có gì để gỡ về mặt nhìn; mã ẩn còn nguyên (muốn gỡ cho sạch: xoá đúng 4 mảnh tương ứng). Ba bản fork bộ da đóng băng không đụng. Figma: vốn không có confetti (gỡ khi bóc DOM lượt sync Hoàn tất 03/10) nên không có gì phải sửa.
- **Đã đo**: đặt hàng thật (từ Giỏ: `placeOrder` đơn tách -01 / -02 → `go('done')`) và `go('done', { force: true })` — `MutationObserver` không thấy `.confetti` nào được chèn, đếm ở ~0,03 · 0,3 · 0,7 · 1,5 · 3,2 s đều 0, không `#confettiHost`, `typeof confetti` = `undefined`, không lỗi JS, console sạch, vòng tick còn animation `ringIn` / `draw`, màn in đúng mã đơn vừa đặt.

## Tài khoản DESKTOP: sidebar bên trái DÙNG CHUNG hiệu ứng với mục lục trang Chính sách (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"ở trang account cái sidebar bên sẽ dùng chung hiệu ứng giống bộ trang policy"*. **Hiểu**: các trạng thái tương tác của mục lục trái (nghỉ · rê · đang chọn) + hình dạng hàng giống mục lục Chính sách (`.dk-policy-aside`), vì hai chỗ cùng là mục lục dọc. Mobile KHÔNG đổi (mobile là dải tab NGANG, vốn đã chung khuôn Tài khoản ↔ Chính sách). **Figma: ĐÃ sync ở lượt 24 (tối 05/10)** — xem mục “Figma lượt 24” sau các mục Chi tiết đơn bên dưới.
- **Trước** (bản 05/09, khung Figma `tab` kind=section · desktop): hàng 280×44, đệm trái 16, mực 3 bậc #727272 → #333 → #0a0a0a, vạch đồng 2px BÊN TRÁI hàng đang chọn, không nền. **Mục lục Chính sách**: hàng đệm 16 đều (cao 52), mực nghỉ #404040 (`text-foreground-alt`), rê ⇒ #0a0a0a (`hover:text-foreground`), ĐANG CHỌN = nền KEM `#f5f2ed` (`--cu-surface` ở skin-li, `--general-secondary` ở bộ da khác).
- **Đã đổi** (3 chỗ): (1) CSS `.acc-side .acc-tab` (khối ~dòng 679; thay hai rule cũ `padding-left: 16px` + `::after { left: 0 }`): mực nghỉ `var(--unofficial-foreground-alt)`, rê / đang chọn `var(--general-foreground)`, `::after { content: none }` (hết vạch), chuyển tiếp = longhand của `.press` (`.acc-tab` khai `transition:` gộp nên phải khai lại, kẻo mất `background-color`); (2) nền kem KHAI CHUNG với `.pol-nav-on` bằng selector gộp (`.pol-nav-on, .acc-side .acc-tab[aria-current]` + bản skin-li) — một nguồn màu, đổi một chỗ là cả hai theo; (3) markup `accSideNav()`: `h-11` → `px-4 py-4` (hàng 44 → 52). Cờ vẫn là `aria-current` nên JS đổi tab tại chỗ KHÔNG đổi một dòng. Màn Chi tiết đơn dùng chung mục lục này (`accSideNav`) nên tự theo.
- **Giữ cố ý**: hàng ĐANG CHỌN vẫn là nút bấm được (bấm lại = về đầu trang + bỏ form đang mở) nên giữ con trỏ tay — khác mục lục Chính sách (span, `cursor: auto`). KHÔNG gắn `.rise` (hiệu ứng nổi lên khi vào màn) cho cột như mục lục Chính sách: cột này đứng yên khi đi qua lại Tài khoản ↔ Chi tiết đơn (luật "cột trái không nhảy" 28/09), gắn là nó nổi lên lại mỗi lần đổi màn. Vạch đồng + mực 3 bậc của `.acc-tab` còn sống ở các hàng tab NGANG (Đăng nhập / Tạo tài khoản, dải Bán chạy nhất hub thương hiệu) — không đụng.
- **Đã đo** (1440, DPR 1, skin-li; so với mục lục Chính sách ở cùng trang): mực nghỉ `rgb(64,64,64)` = · rê (rê chuột THẬT + screenshot) `rgb(10,10,10)` = · đang chọn nền `rgb(245,242,237)` + chữ `rgb(10,10,10)` = · Inter 14/20 · 400 · đệm 16 · bo 0 · chuyển tiếp `opacity, background-color, border-color, color, box-shadow .12s ease` = · cao 52 = (cột 280 vs 330 theo từng trang); `::after` none; bốn hàng 52 ⇒ cột cao 208 (trước 176). Bấm "Sổ địa chỉ": nền kem dời sang hàng đó, nội dung đổi. Màn Chi tiết đơn: "Đơn hàng" sáng đúng. 1024: cột 225, bốn hàng vẫn 52 (nhãn "Hạng thành viên & Ưu đãi" không xuống dòng), không cuộn ngang. Console sạch.
- **Figma — việc đã làm ở lượt 24 (tối 05/10; đoạn dưới là danh sách việc từng chờ)**: mọi khung Account / Order detail desktop (~20 khung, kể cả khung CỦA USER `734:52984` · `934:59629` · `1071:54047` · `1159:105033`) còn sidebar `tab` kind=section · desktop (279×44, vạch đồng). Cần ráp lại bằng component `policy-nav-item` (state=selected / default, `705:45600`, 330×52 → thu 296 FILL — cột trái nay trần 296, xem mục ngay dưới) — `acc-swap.js` + `asm.js` hiện chỉ biết `tab`; khung của user chỉ sửa khi họ bảo.
- **Còn hỏi**: nếu "hiệu ứng" user muốn gồm cả hiệu ứng vào màn (`.rise`) thì nói; hàng cao 52 (như Chính sách) hay giữ 44 chỉ đổi màu — mình theo 52.

## Tài khoản DESKTOP: cột nội dung TỐI ĐA 800 + dồn cả trang sang TRÁI (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"ở trang account limit chiều ngang cái block bên nội dung ở 800 và dồn toàn trang sang bên trái"*. **Hiểu**: (1) cột nội dung của màn Tài khoản (4 tab + lịch sử điểm + form) chỉ rộng tối đa 800; (2) mục lục + nội dung dính LỀ TRÁI, chỗ trống dồn sang phải — không căn giữa. Mobile KHÔNG đổi (mobile một cột). **⚠ ĐẢO chốt 21/09** ("BỊ TRẦN 720": khi đó chính user bắt lỗi 377px bỏ trống bên phải và bỏ trần) — nay user đặt trần MỚI 800 và chấp nhận khoảng trống bên phải; chú thích cũ trong `screenACCOUNT` đã ghi "ĐẢO 05/10".
- **Đã đổi** (CSS ngay dưới `.acc-main`): `[data-screen="account"] .acc-main { max-width: 800px }` · `[data-screen="account"] .acc-page, [data-screen="order"] .acc-page { margin-left: 0 }` (hộp `max-w-[1440px] mx-auto` thôi tự căn giữa ở khổ > 1440; ≤ 1440 không đổi gì vì hộp đã kín ngang). Ở 1440 (có thanh cuộn 15): mục lục x 48 w 280 · nội dung x 352 w **800** (trước 1025) cho cả 4 tab; thẻ Thông tin vẫn 720 (hẹp hơn trần). Ở 1920: hộp ở x 0 (trước x 232), mục lục x 48.
- **Phạm vi** (⚠ ĐÃ ĐỔI cùng ngày: user nhắn thêm *"cái chi tiết đơn hàng cũng limit chiều ngang 800 nhé"* ⇒ màn CHI TIẾT ĐƠN CŨNG trần 800, xem mục "Chi tiết đơn hàng DESKTOP: trần 800" ngay dưới; đoạn này là bản đầu, lúc mình chừa màn đó): trần 800 lúc đầu CHỈ ở màn TÀI KHOẢN. Màn CHI TIẾT ĐƠN (`data-screen="order"`) khi ấy KHÔNG bị trần — nó dựng theo khung user 1040 (hàng thông tin 3 cột đều, hai khối giao hàng 512 | 512); đo ở 1920: nội dung 1040. Chi tiết đơn chỉ đi theo PHẦN CĂN TRÁI, kẻo ở khổ rộng đi qua lại Tài khoản ↔ Chi tiết đơn là mục lục trái NHẢY ngang (luật "cột trái không nhảy" 28/09; đo: x 48 ở cả hai màn). Header / footer / các trang khác (PLP… vẫn căn giữa x 232 ở 1920) không đổi.
- **HỆ QUẢ PHẢI VÁ — thanh "Chi tiết hạng thành viên" (tab Hạng thành viên & Ưu đãi)**: thanh 4 hạng (accordion NGANG theo brief tr.51) vẽ cho thanh rộng ~1090 (panel mở 802 + 3 hạng đóng 96, Figma 756:108020, cột danh xưng 250 | kẻ | lưới quyền lợi, đệm 32). Ở 800 panel mở chỉ còn 506, lưới quyền lợi 135, cột phải cố định 177 TRÀN (đo `.tier-perks` 201/135; chữ chồng lên nhau, "Khi giới thiệu khách hàng mớ…" bị cắt — đã chụp). **Thu gọn theo số đo, giữ bố cục + chữ + màu**: hạng đóng 96 → **56** · đệm panel 32 → **24** · khe 28 / 22 → **20** · cột danh xưng 250 / 290 → **200** · cột quyền lợi phải 177 → **150** · khe giữa hàng quyền lợi 40 → **32** (thang). Ở 800: panel mở 626, ruột 578, lưới quyền lợi 337 (cột trái 163, phải 150). Cỡ chữ KHÔNG đổi. `.tier-acc` đổi `height: 420` → `height: auto; min-height: 420` ⇒ thanh GIÃN THEO ruột khi chữ xuống dòng (bản EN dài hơn VI: 422 ở Gold / Platinum / Diamond; VI giữ đúng 420 ở cả 4 hạng). Khổ ≤ 1215 (cột nội dung còn < 800: 723 ở 1100, 664 ở 1024) thu thêm: hạng đóng 44 · danh xưng 184 · cột phải 128.
- **Đã đo** (rê / bấm thật; không cuộn ngang ở mọi khổ): 1440 — 4 tab + lịch sử điểm + 4 form (sửa thông tin · đổi mật khẩu · thêm / sửa địa chỉ): không phần tử nào ra ngoài cột 800 (chỉ chữ chìm `.tier-wm` của thẻ hạng lòi 5px và bị cắt đúng chủ ý); 4 hạng mở lần lượt: 0 phần tử tràn ngang / dọc, VI + EN. 1100 (cột 723) và 1024 (cột 664): 0 tràn ở cả 4 tab và 4 hạng (thanh Gold / Platinum / Diamond giãn lên 436 ở 1100 vì chữ xuống dòng, VI lẫn EN; Member 420). Mục lục 52 × 4 vẫn đúng. Console sạch.
- **Hỏi user / chưa làm**: (a) thanh hạng thu gọn là do MÌNH chọn để vừa 800 — nếu muốn hướng khác (cho riêng thanh này rộng hơn 800 · hạng đóng 96 giữ nguyên rồi bỏ cột phải · xếp dọc) thì nói; khung Figma 756:108020 là thiết kế của user ở khổ rộng nên CHƯA sửa; (b) khoảng trống bên phải ở 1440 là 240 (không có gì đặt ở đó); (c) **Figma ĐÃ sync ở lượt 24 (tối 05/10)** — trước đó mọi khung Account desktop vẫn cột nội dung 1040 + sidebar kiểu vạch đồng (xem mục sidebar ngay trên) — sync một lượt cho cả hai thay đổi.

## Tài khoản DESKTOP: cột trái (mục lục) TRẦN 296 (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"cột bên trái của account thì cho kích thước limit 296 nhé"*. **Hiểu**: "limit" = TRẦN như trần 800 của cột nội dung ngay trước đó — cột co theo khổ nhưng không rộng quá 296 (trước: cố định 280, dưới 1280 mới co). Mobile KHÔNG đổi.
- **Đã đổi** (1 rule, dòng ~685; rule media ≤ 1279 cũ gộp vào): `.dk-sticky-side.acc-side { width: clamp(216px, 22vw, 296px) }`. Đo: ≥ 1346 ⇒ đúng **296** (1440: x 48 → 344; nội dung Tài khoản x **368** w 800) · 1280 ⇒ 281,6 · 1100 ⇒ 242 · 1024 ⇒ 225. Bốn hàng mục lục 296 × 52, khối kem đang chọn rộng bằng cả cột; không cuộn ngang ở mọi khổ.
- **Mục lục DÙNG CHUNG với màn Chi tiết đơn** (`accSideNav`; ⚠ các số đo Chi tiết đơn 1024 / 1009 / "9/12 đơn một hàng" ở đoạn này là của lúc màn đó CHƯA bị trần — ngay sau đó user đặt trần 800, số hiện hành ở mục "Chi tiết đơn hàng DESKTOP: trần 800") nên màn đó cũng 296 — không thì đi qua lại hai màn là cột trái nhảy 16px + khối kem đổi bề ngang (luật "cột trái không nhảy", 28/09). **Hệ quả đã đo ở Chi tiết đơn** (cột nội dung flex 1, không trần): 1440 không thanh cuộn 1040 → **1024** (có thanh cuộn 1025 → **1009**); hàng thông tin: 9/12 đơn vẫn một hàng; Chờ thanh toán (~1011) luôn xuống dòng như cũ; hai đơn Chuyển khoản / QR (~989) nay xuống dòng CẢ khi không có thanh cuộn (974 < 989) — có thanh cuộn (Windows, 975) thì vốn đã xuống dòng nên người dùng Windows không thấy khác. Khung user `1159:105033` + 10 khung Figma vừa sync (lượt 23) vẽ ở cột 1040 / 990 ⇒ lệch 16px, chờ lượt sync tới.
- **Đã đo thêm**: Account 4 tab ở 1440 — mục lục 296, nội dung 368 / 800, không phần tử nào ra ngoài (kết quả của lượt trần 800 vẫn đúng); 1280: 281,6 / nội dung 353,6; Chi tiết đơn 1280: nội dung 863. Console sạch.
- **Cách khác nếu "296" không phải ý**: ghim CỨNG 296 (không co theo khổ) — chỉ khác ở 1280–1345 (281,6–295,9 → 296); hoặc chỉ Tài khoản 296 còn Chi tiết đơn giữ 280 (cột nhảy 16px giữa hai màn, nội dung đơn giữ 1040) — nói thì đổi.
- **Figma ĐÃ sync ở lượt 24 (tối 05/10)**: gộp vào lượt sync chung (sidebar kiểu Chính sách · nội dung 800 · cột trái 296 — `policy-nav-item` thu về 296 chứ không 280).

## Chi tiết đơn hàng DESKTOP: trần 800 (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"cái chi tiết đơn hàng cũng limit chiều ngang 800 nhé"* — nối tiếp trần 800 của màn Tài khoản (lượt trước mình chừa màn này vì nó dựng theo khung user 1040; nay chính user bảo trần). Mobile KHÔNG đổi.
- **Đã đổi** (2 chỗ): (1) selector trần gộp `[data-screen="account"] .acc-main, [data-screen="order"] .acc-main { max-width: 800px }` (cùng chỗ với trần Tài khoản, chú thích đã sửa "ĐẢO TIẾP"); (2) bảng hàng `.ord-grid` lấy bộ cột GỌN làm mặc định: SL 160 → **96**, tiền 240 → **176**, khe 24 → **16** (đúng bộ của rule `@media (max-width: 1279px)` vốn có; bộ 160 / 240 / 24 là số khung user ở thẻ 1040, nay không khổ nào dùng) — cột tên 302 → **446**, tên dài như "Khăn lụa in họa tiết Broken Jewels 90x90cm" về MỘT dòng (đã chụp trước / sau), chip % + giá gạch (~150) vẫn vừa cột tiền 176.
- **Số đo ở 1440** (có thanh cuộn 15 ⇒ viền 1425; mục lục 296 · nội dung x **368** w **800** — giống Tài khoản, mục lục KHÔNG nhảy khi đi qua lại): thẻ 800 (lòng 750) · hai khối giao hàng **392 + 392** (khe 16) · bảng hàng 446 / 96 / 176 · tấm tổng 468 vẫn gọn bên phải. **Hàng thông tin ba mục không còn vừa một hàng ở 9/12 đơn** (cần 759–1011 so với lòng 750: 1011 · 902 · 902 · 989 · 989 · 834 ×3 · 759) ⇒ tự xuống dòng bằng `.ov-meta.is-wrap` (hai hàng, KHÔNG vạch dọc, canh trái); CÒN MỘT HÀNG: Hoàn tất DAFC102801 (nhãn ngắn "Điểm tích luỹ" cần 750) + hai đơn huỷ (hai mục). Bản EN: 8 xuống dòng / 4 một hàng. Chiều cao thẻ ~910–1400 (đơn quà tặng 5 dòng 1400).
- **Đã đo**: 12 đơn × VI + EN ở 800 — 0 phần tử ra ngoài thẻ, không cuộn ngang; 1100 (thẻ 723): hai khối giao hàng xếp dọc (rule ≤ 1179 vốn có) — 0 tràn; chụp pay (nút Thanh toán lại bên phải hàng đầu, hàng thông tin hai hàng) · đang giao · đơn 5 dòng quà tặng — đều gọn. Console sạch.
- **Hỏi user** (phần mình tự chọn vì ở 800 KHÔNG còn chỗ cho ba mục nằm ngang một hàng): (a) hàng thông tin xuống HAI HÀNG không vạch ở đa số đơn — thay vì (i) giữ ba cột đều có vạch nhưng xếp nhãn TRÊN giá trị (bản 04/10 của khung `1071:54047`), hoặc (ii) lưới hai cột đều; (b) nút "Theo dõi vận đơn" + hai khối giao hàng giữ như khung user (chỉ hẹp lại 392).
- **Figma ĐÃ sync ở lượt 24 (tối 05/10; đoạn dưới là độ lệch từng chờ)**: 10 khung Order detail lượt 23 + khung user `1159:105033` + `1071:54047` vẽ ở nội dung 1040 / mục lục 280 / hàng thông tin ba cột; code nay nội dung 800 / mục lục 296 / hàng thông tin hai hàng (đa số) / bảng hàng 96 · 176. Sync gộp cùng sidebar kiểu Chính sách + nội dung Tài khoản 800 + mục lục 296 (xem `_notes/figx/README.md`, mục cuối).

## Chi tiết đơn hàng DESKTOP: đệm trong mỗi ô 24 → 16 (05/10/2026, CHỈ `desktop.html`)

Lệnh user: *"giảm cái padding trong từng ô của order details xuống từ 24 xuống 16 nhé"*. **Hiểu**: mọi ô có đệm 24 của màn Chi tiết đơn — ba chỗ khai trong CSS: `.ov-card` (thẻ Mã đơn + thẻ Sản phẩm), `.ov-sec` (hai khối viền người nhận / giao hàng) và `.ov-sum-wrap` (tấm TỔNG xám nằm trong thẻ Sản phẩm — mình tính luôn vì nó cũng đệm 24 và nằm lồng trong ô). Chỉ ĐỆM; khe trong ô (16 / 20 / 24 của `.ov-top`, 16 của `.ov-sec`) giữ nguyên. Mobile KHÔNG đổi.
- **Đã đo** (1440, thẻ 800): đệm tính ra `16px` ở cả bốn loại ô; tấm tổng **468 → 452** (nội dung 420 giữ); mỗi ô thấp 16, lòng rộng thêm 16 (thẻ 750 → **766**, khối giao hàng 342 → 358); tổng `.ov-cards` giảm ~65 (đang giao 1065 → 1000; đơn quà tặng 5 dòng 1401 → 1336). **Hàng thông tin**: đơn Hoàn tất DAFC102455 (cần 759) nay vừa MỘT hàng ⇒ xuống dòng ở **8/12** đơn (trước 9/12; ở bản EN chỉ còn 3/12 — Chờ thanh toán + hai đơn Chuyển khoản / QR).
- **Đã kiểm**: 12 đơn × VI + EN — 0 phần tử ra ngoài thẻ, không cuộn ngang, console sạch; chụp đơn đang giao (chữ cách mép 16 ở cả bốn ô).
- **Figma ĐÃ sync ở lượt 24 (tối 05/10)** (từng lệch thêm một lớp so với mục trần 800 ngay trên): 10 khung lượt 23 + khung user `1159:105033` / `1071:54047` vẽ đệm 24 — sync gộp sau (xem `_notes/figx/README.md`, mục cuối). Chú ý khi dựng lại: bộ spacing-snap coi 16 là token chuẩn nên đệm 16 không bị chỉnh.

## Chi tiết đơn hàng DESKTOP: hàng thông tin xếp DỌC (mỗi loại một dòng) + "Tóm tắt đơn hàng" full bề ngang (05/10/2026, CHỈ `desktop.html`)

Lệnh user (dán nguyên khối "Điểm tích luỹ sau khi hoàn tất +901 / Phương thức thanh toán Thanh toán qua cổng Payoo / Thông tin xuất hóa đơn Không xuất hoá đơn"): *"cục này cho xuống hàng từng loại nhé"* + *"tóm tắt đơn hàng bên dưới cho full W luôn"*. **Hiểu**: (1) hàng thông tin của thẻ Mã đơn (điểm · thanh toán · hoá đơn) xếp DỌC, MỖI LOẠI MỘT DÒNG, ở mọi đơn; (2) "tóm tắt đơn hàng bên dưới" = tấm TỔNG xám (Tạm tính · Giảm giá · Phí vận chuyển · Tổng thanh toán) trong thẻ Sản phẩm — cho FULL bề ngang lòng thẻ. Mobile KHÔNG đổi.
- **Hàng thông tin** (`.ov-meta`): `flex-direction: column; align-items: flex-start; gap: 8px`; mỗi dòng vẫn NẰM NGANG [nhãn 14/20 · giá trị 14/20 · 500] như khung user, khe nhãn → giá trị 8, canh trái; giá trị bắt đầu ngay sau nhãn nên mép trái giá trị lệch theo độ dài nhãn (cố ý — muốn giá trị thẳng cột thì nói). Đơn huỷ chỉ hai dòng (không có điểm). **Đã GỠ** những thứ chỉ phục vụ bố cục ba cột: vạch dọc `.ov-vdiv` (CSS + chèn trong template), hàm `orderMetaFit()` + lời gọi trong `go()` + `ResizeObserver`, ba rule `.ov-meta.is-wrap` — danh sách dọc luôn vừa nên không còn gì để đo; ghi chú để lại ở chỗ hàm cũ. Cao khối: 3 dòng = 76 (3 × 20 + 2 × 8), 2 dòng = 48.
- **Tóm tắt đơn hàng** (`.ov-sum-wrap` / `.ov-sum`): `align-self: stretch`, `.ov-sum { width: 100% }` (trước: canh PHẢI `align-self: flex-end`, nội dung 420 + đệm = 452): tấm giãn hết LÒNG thẻ (766 ở 1440; vẫn trong đệm 16, không tràn ra mép thẻ), nhãn trái · số phải giãn hết dòng. Nền xám + đệm 16 giữ.
- **Đã đo**: 12 đơn × VI + EN ở 1440 — ba (hai ở đơn huỷ) dòng xếp dọc cùng x, 0 vạch dọc, 0 `.is-wrap`, tấm tổng 766 = lòng thẻ (1100: 689 = 689), 0 phần tử ra ngoài thẻ, không cuộn ngang, `typeof orderMetaFit` = undefined, console sạch; chụp đơn Chờ thanh toán (đúng khối user dán) + đơn đang giao (tấm tổng full ngang).
- **Hệ quả cho các số trước**: các đoạn "9/12 đơn xuống hai hàng", "8/12", "cần 759–1011 / lòng 750 / 766" của các mục trần 800 + đệm 16 trở thành LỊCH SỬ (hàng thông tin không còn dựa vào bề rộng). Đo: thẻ Mã đơn nay cao 307 (ba dòng, đơn đang giao / Chờ thanh toán) · 359 (đơn huỷ: hai dòng + dải ghi chú); tổng `.ov-cards` 1024 (đang giao, trước đó 1000) · 868 (Chờ thanh toán, trước 844).
- **Figma ĐÃ sync ở lượt 24 (tối 05/10)**: 10 khung Order detail dựng lại theo bố cục này (hàng thông tin dọc, tấm tổng full ngang); khung user `1159:105033` / `1071:54047` vẫn vẽ hàng thông tin ba cột / hai hàng + tấm tổng 468 canh phải (không đụng) — xem mục “Figma lượt 24” ngay dưới.

## Figma lượt 24 (tối 05/10/2026): ĐÃ sync Tài khoản + Chi tiết đơn DESKTOP theo code mới — 18 khung thay + 3 khung mới

Lệnh user: *"sync vào figma nhé"* (sau chuỗi lệnh CHỈ-code trong ngày: sidebar kiểu Chính sách · nội dung 800 · mục lục 296 · Chi tiết đơn 800 · đệm 16 · hàng thông tin dọc · tấm tổng full ngang · gỡ hover thẻ sản phẩm). Báo cáo đầy đủ + bảng id: `_notes/FIGMA-SYNC-TAI-KHOAN-CHI-TIET-DON-LUOT-24-2026-10-05.md`; kỹ thuật + bẫy: `_notes/figx/README.md` lượt 24. Mobile KHÔNG đổi.
- **Thay đúng chỗ cũ (18 khung, section Tài khoản `245:17682`)**: danh sách đơn · sửa hồ sơ · đổi mật khẩu · 4 hạng thành viên (Member / Gold / Platinum / Diamond) · lịch sử điểm · 10 trạng thái Chi tiết đơn. **Thêm 3 khung mới dựng từ code** cạnh khung của user: `Order detail / desktop · in transit` · `Account / desktop · profile (code)` · `Account / desktop · addresses (code)`.
- **Số đo trước khi thay**: mục lục = 4 instance `policy-nav-item` 296 (3 default + 1 selected) ở 21 / 21 khung, 0 instance `tab` kind=section; số instance mỗi khung Chi tiết đơn bằng khung cũ ở 10 / 10; danh sách đơn 12 `order-status-badge` cao 24; lịch sử điểm 5 `points-entry`; section vẫn 22920×11500, 50 / 50 con section không đổi vị trí, 114 / 114 node cấp trang không dời, 0 chồng lấn (khung mới ↔ khung khác).
- **Component**: `order-line` có thêm 4 biến thể `platform=desktop-grid` (766×96, khe 16, [box 462 | x 96 | giá 176] — đúng lưới code `1fr | 96 | 176`; BOOLEAN `unit` được buộc lại vì clone mất tham chiếu); `order-status-badge` giữ 28 cao ở master, ghi đè đệm 2 để ra 24 ở danh sách đơn (luật `post` trong `asm.js`).
- **Khung user — KHÔNG đụng**: `734:52984` (profile; user đã vẽ lại: lề 80 · thân 976 · thẻ 896 — khác code 296 / 800 / 720), `934:59629` (địa chỉ), `1071:54047`, `1159:105033`, hai ngăn kéo `1071:59250` / `1071:59272`. Code nay vẽ bố cục của hai khung đầu ở hai khung `(code)` mới để so mắt.
- **Khung "chờ thanh toán" (`1174:115737`)**: NGAY SAU khi dựng, user sửa tay trong Figma (thêm vạch ngang giữa hàng Mã đơn và hàng thông tin · vạch dọc giữa Người nhận | Giao hàng · bọc bảng sản phẩm bằng `Frame 93`) ⇒ đưa vào `PROTECT` (`comp-audit.js`, `spacing-snap.js`), mình không ráp / chỉnh thêm; **ĐÃ áp vào code** ở mục ngay dưới (user gửi link khung `cards` `1174:115805` và bảo "update lại … thành như vậy").

## Chi tiết đơn hàng DESKTOP: MỘT KHUNG VIỀN chia ba phần, theo khung Figma `cards` `1174:115805` do user sửa tay (05/10/2026 tối, CHỈ `desktop.html`)

Lệnh user: *"sau đó update lại cái trang chi tiết account lại thành như vậy nhé"* + link `…?node-id=1174-115805` (khung `cards` của "Order detail / desktop · awaiting payment" — chính khung user sửa tay ngay sau lượt sync 24). **Hiểu**: "trang chi tiết account" = trang Chi tiết đơn hàng (khung nằm trong section Tài khoản); đưa bố cục user vẽ vào code cho MỌI đơn (không chỉ đơn chờ thanh toán). Mobile KHÔNG đổi (khung 1440).
- **Cách đọc "user sửa gì"**: dump 89 node của `cards` (toạ độ tương đối, nét, đệm, khe, sizing) rồi so với bản bóc gốc của chính khung này (`od-d-pay-1005q`) + khung "đang xử lý" không bị sửa; ngoài `cards` khung KHÔNG đổi (acc-page / acc-layout / content / inset trùng khung anh em).
- **Số user vẽ** (đã khớp code, đo ở DPR 1,25 nên viền 0,8 — trừ 0,2 mỗi viền): `cards` 800 · nét 1px #d3d3d3 bốn phía · KHÔNG nền · khe 16; `card / order` nét CHỈ ĐÁY, đệm 16, khe 20 → **24**, `top` = [row · **kẻ #e6e6e6 mới** · meta] khe 24; `card / shipping` KHÔNG viền, hai khối 392 + 392 ngăn bởi `Line 2` (nét #d3d3d3, ở mép trái khối giao hàng, x 407, dài 156/162), khối hết viền (stroke ẩn); `card / items & total` nét CHỈ ĐỈNH, khe 16 → **0**, đầu bảng + dòng hàng gộp `Frame 93` (khe 16), kẻ đáy `lines` ẨN.
- **Code đã đổi** (CSS khối `.ov-cards` … `.ov-lines` + markup màn Chi tiết đơn; sao lưu `desktop.html.truoc-chi-tiet-don-1174-115805`): `.ov-cards` thêm `border: 1px solid var(--general-border)` + nền thẻ · `.ov-card.is-head` chỉ `border-bottom`, khe 20 → 24 · `.ov-card.ov-items` chỉ `border-top`, `.ov-items { gap: 0 }` + đầu bảng `margin-bottom: 16`, `.ov-lines` bỏ `border-bottom` · `.ov-sec` hết viền, `.ov-card.is-split` `column-gap: 12px` (lúc đầu 14 theo khung user — phần dư vẽ tay; về token 12 trong lượt Figma 25) + vạch dọc là `.ov-sec + .ov-sec::before` (tuyệt đối, 1×full cao, không chiếm chỗ ⇒ chữ khối giao hàng vẫn cách mép khối 16) · markup: thêm `<div class="ov-divider"></div>` giữa khối đầu và `.ov-meta`; `.rise` chuyển từ ba thẻ lên `.ov-cards` (ba phần trượt riêng trong một viền sẽ lệch kẻ; luật giảm chuyển động đổi theo).
- **Tự quyết**: (1) đơn huỷ có dải ghi chú: kẻ mới nằm SAU dải ghi chú, ngay trên hàng thông tin (khung chỉ vẽ đơn chờ thanh toán); (2) vạch dọc cao FULL khối (khung vẽ tay 156 trên 162, lệch 6px dưới đáy); (3) hàng giao hàng cao 160 chứ không 162 (khung 162 là số cố định thừa của lần dựng cũ; viền khối đã bỏ); (4) xếp dọc (≤ 1179): vạch thành KẺ NGANG đỉnh khối giao hàng.
- **Hỏi user (chưa trả lời)**: vạch dọc đang lệch tâm — cách chữ khối người nhận ~30, cách chữ khối giao hàng 16 (đúng khung vẽ); muốn đặt GIỮA hai cột cho cân (cột 399 + 399, vạch ở 399) thì đổi hai số.
- **Đã đo** (1440, DPR 1,25 vì pane ẩn): 12 đơn × VI + EN — khung 800, viền bốn phía; thẻ Mã đơn chỉ viền đáy, Sản phẩm chỉ viền đỉnh, khối giao hàng 0 viền; `top` có kẻ ngay trước `.ov-meta` (10 đơn: row · kẻ · meta; 2 đơn huỷ: row · ghi chú · kẻ · meta); 0 phần tử ra ngoài khung, không cuộn ngang; vạch dọc cao = khối (160 / 204); 1100: một cột, vạch ngang 1px cao 1; console sạch. Tổng `.ov-cards` đơn chờ thanh toán 882,2 (= 885 của khung − 2 hàng giao hàng − 0,8 viền); đối chiếu từng mốc với khung user: kẻ y 93 / 218 · timeline 243 · khối giao hàng 356 · vạch x 407 · Sản phẩm 534 → trùng (lệch 0,2 / 0,4 do viền 0,8 và 2 do hàng giao hàng).
- **Figma**: ĐÃ sync ở lượt 25 (tối 05/10) — 10 khung (9 trạng thái + `in transit`) dựng lại theo bố cục này; khung `1174:115737` giữ là bản USER (xem mục "Figma lượt 25" bên dưới). Khe giữa hai khối giao hàng đã đổi 14 → 12 (token) ở cả code lẫn Figma.

## Lịch sử điểm DESKTOP: danh sách chứng từ MỘT CỘT — ghim cứng trong CSS (05/10/2026 tối, CHỈ `desktop.html`)

Lệnh user: *"ở trang lịch sử điểm, danh sách đơn hàng liệt kê thành 1 cột thôi nhé"*. **Hiểu**: "danh sách đơn hàng" = các hộp chứng từ của trang "Lịch sử điểm thưởng" (mỗi hộp: ngày · "# PSI-… (mã đơn)" · Giá trị đơn / Điểm tích luỹ / Điểm đã đổi).
- **Đo trước khi sửa** (1440 và 1920, `desktop.html`): danh sách ĐÃ là một cột 800 (5 hộp xếp dọc, khe 16) — lưới cũ `repeat(auto-fill, minmax(min(420px, 100%), 1fr))` chỉ ra hai cột khi cột nội dung ≥ 856, mà từ khi cột nội dung bị trần 800 (05/10) nó không bao giờ đủ chỗ. Khung Figma `Account / desktop · points history` (`1174:121568`, dựng lượt 24) và bản mobile (`index.html`, `.ph-list` một cột khe 12) cũng đã một cột.
- **Đã đổi** (một rule, `.ph-list` ~dòng 1246): `grid-template-columns: minmax(0, 1fr)` — ghim một cột để KHÔNG tự về hai cột khi cột nội dung rộng ra (thử gỡ trần 800 ở 1920 ⇒ cột 1024, vẫn một cột; trước đó sẽ ra hai). Khe 16 giữ. Đo 1440 / 1920 / 1100: một cột, không cuộn ngang, console sạch. Thay đổi KHÔNG đổi hình ở khổ bình thường ⇒ Figma không cần sync.
- **Hỏi user (chưa trả lời)**: nếu vẫn thấy HAI cột ở đâu đó thì bản đang xem không phải code mới nhất (vd. bản đã deploy lên Vercel còn cột 1040 — chưa có thay đổi hôm nay) hoặc là trang khác — cần link / khổ cửa sổ / ảnh chụp.

## Trang thương hiệu MOLTON BROWN (HUB) DESKTOP: thứ tự khối theo brief · Highlights 50/25/25 · 2 cửa hàng thành 2 ô vuông (05/10/2026 tối, CHỈ `desktop.html`) — ⚠ Highlights + ô cửa hàng ĐÃ THAY đêm 05/10, xem mục "THEO KHUNG FIGMA USER SỬA TAY" ngay dưới Figma lượt 25

Lệnh user (kèm ảnh trang brief của khách đánh số 1–6): *"trang brand page mb sửa lại thứ tự theo brief nhé, 2 cái địa chỉ dưới cùng thì làm 2 ô vuông nằm chung 1 hàng chứ k cần align giữa, highlight thì làm layout 50% là hình và 25% text 25% sản phẩm như hình minh họa"* ("mb" = Molton Brown). Báo cáo đầy đủ: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6g. Sao lưu `desktop.html.truoc-mb-thu-tu-brief-2026-10-05`.
- **Thứ tự mới**: Banner → Dải danh mục → Bán chạy nhất → **Highlights** (khối "Khám phá thêm" cũ dời lên TRƯỚC bộ sưu tập) → Các bộ sưu tập → Instagram (không có trong brief, giữ) → **Về Molton Brown** (cuối trang; trước đó ở đầu trang).
- **Highlights**: mỗi mục một hàng lưới `2fr 1fr 1fr` không khe ⇒ 50% ảnh · 25% chữ (tiêu đề Libre + mô tả + "Mua ngay") · 25% sản phẩm (thẻ `productCard`, mỗi mục có `pid` riêng); không đầu mục (hình minh hoạ không có); ≤ 1023 ảnh lên trên 16/9.
- **Về Molton Brown**: câu mời nhận quà tặng mẫu thử + 2 cửa hàng NGUYÊN VĂN brief (Rex Hotel · Tràng Tiền Plaza); hai cửa hàng là HAI Ô VUÔNG một hàng 352 × 352 (viền 1px, chữ canh TRÁI, thành phố ở đỉnh ô, địa chỉ + điện thoại ở đáy ô); câu mời canh giữa.
- **Đã đo** (VI + EN, 1440 / 1280 / 1024 / 900): đúng thứ tự, tỉ lệ 50 / 25 / 25, hai ô vuông 352 × 352 chung một hàng, không cuộn ngang; bấm ảnh / "Mua ngay" → PLP lọc theo đích, bấm thẻ sản phẩm → PDP; console sạch.
- **Chưa làm / hỏi user**: mobile (`index.html`) chưa đổi (50/25/25 không vừa 375 — đề xuất xếp dọc); brief mục 5 (carousel kiểu stories + "Xem tất cả"), mục 2 (6 danh mục có "Home", thứ tự khác) và mục 1 (hero slide) chưa làm; ảnh Highlights nguồn 507 px hơi mềm ở 50% bề ngang; Figma: ĐÃ sync ở lượt 25 (khung MỚI `1178:123273` bên phải khung hub của bạn; mobile `1129:88714` vẫn lệch code).

## Figma lượt 25 (tối 05/10/2026): sync hub Molton Brown DESKTOP (khung MỚI) + 10 khung Chi tiết đơn theo "một khung viền"

Lệnh user: *"sync bản desktop vào figma đi t sửa tiếp"*. Báo cáo + bảng id: `_notes/FIGMA-SYNC-HUB-MB-CHI-TIET-DON-LUOT-25-2026-10-05.md`; kỹ thuật + bẫy: `_notes/figx/README.md` lượt 25.
- **Hub desktop theo brief**: 1 khung MỚI `Brand / desktop 1440 · Molton Brown hub · brief 05/10/2026` `1178:123273` (1440×5908) tại (5000, 80) trong section Brand, bên phải khung hub của bạn `1128:88196` (KHÔNG đè); section Brand nới 5000×5691 → 6520×6068; chữ 0/0, 132/132 chữ khớp vị trí.
- **Chi tiết đơn**: 10 khung thay đúng toạ độ cũ (9 trạng thái + `in transit`) theo bố cục một khung viền; khung "awaiting payment" `1174:115737` của bạn giữ nguyên (mình dựng thử bản code của nó để so rồi xoá — cùng bố cục, khác hàng giao hàng 160 / 162, khe 12 / 14).
- **Code đổi kèm**: khe cột hai khối giao hàng 14 → 12 (token; cùng luật spacing-snap) ở `desktop.html`.
- **Công cụ mới**: `_notes/figx/cdp-chrome.js` — Chrome ẩn DPR 1 để bóc trang khi pane Browser của app đang ẨN (ẩn ⇒ DPR 1,25 ⇒ viền 0,8 + đệm méo); `ov-fix.js` thêm `__ovShipFix`; `extractor.js` bỏ pseudo vạch dọc; `comp-audit.js` loại luật `product-item-info` cho khung hub.
- **Chưa làm**: hub mobile `1129:88714`; hairline giữa dòng hàng của đơn nhiều món (đã thiếu từ các lượt trước).

## Hub Molton Brown DESKTOP: THEO KHUNG FIGMA USER SỬA TAY (đêm 05/10/2026) — Highlights MỘT khối · 2 cửa hàng chữ nhật (CHỈ `desktop.html`)

Lệnh user (kèm link khung `1178:123273`): *"tối vừa sửa lại, hãy cập nhật lại theo file figma tôi nhé"* — khung đó là bản mình dựng ở lượt Figma 25, user sửa tay tiếp. Báo cáo đầy đủ: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6h. Sao lưu `desktop.html.truoc-hub-mb-theo-figma-user-2026-10-05`.
- **Cách đọc "bạn đã sửa gì"**: dựng lại bản gốc từ file bóc cũ vào section tạm rồi so từng thuộc tính từng khối (không đoán) — đầu trang, bộ sưu tập, Instagram, header, footer GIỐNG 100%; chỉ đổi Highlights và hai ô cửa hàng.
- **Highlights**: từ 3 hàng 50/25/25 thành MỘT khối 1392 × 559 — ảnh 50% bên trái (ảnh dòng hương mới Bluebell); bên phải cột đệm 16: khối chữ (tiêu đề hai dòng "Dòng hương mới" / "Bluebell & Wild Strawberry" · mô tả · "Mua ngay") ở trên, hàng 3 thẻ sản phẩm 216 × ~350 (Sunlit Clementine · Re-Charge Black Pepper · Stocking Filler, tên cắt "…") ở dưới; nền kem token `copper-surface`. Hai mục còn lại của `discover` (quà tặng · hương mỗi ngày) KHÔNG dựng nhưng giữ dữ liệu (`feature: 1` chọn mục, `prods` là 3 SP).
- **Về Molton Brown**: hai cửa hàng thành hai ô CHỮ NHẬT 443 × 166 một hàng trong cột 902 (không còn ô vuông 352); đầu mục + câu mời vẫn canh giữa (câu mời cột 720).
- **Đã đo** (1440 / 1280 / 900, VI + EN): cao trang 4724 = khung 4724,6; chữ khớp 0 / 0; thân trang lệch ≤ 4 px (thẻ SP trong khung cao hơn DOM 4 px); console sạch.
- **Mobile**: ĐÃ theo ở mục ngay dưới (06/10). **Chưa làm**: khung Figma hub mobile `1129:88714` vẫn lệch code.

## Hub Molton Brown MOBILE theo bản desktop (đêm 05/10/2026 → 06/10, CHỈ `index.html`)

Lệnh user: *"xong áp dụng cho bản mobile luôn nhé"* (ngay sau mục trên). Báo cáo đầy đủ: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6i. Sao lưu `index.html.truoc-hub-mb-theo-figma-user-2026-10-05`.
- **Thứ tự mobile = desktop**: banner → dải danh mục → Bán chạy nhất → **Highlights** → các bộ sưu tập → Instagram → **Về Molton Brown** (cuối trang). Khối "Về thương hiệu" (2 đoạn lịch sử) ở đầu trang gỡ.
- **Highlights xếp DỌC ở 375**: ảnh 5/4 full ngang → chữ (tiêu đề hai dòng · mô tả · "Mua ngay") → dải 3 thẻ SP trượt ngang (thẻ 150: vừa 2 thẻ + ló thẻ thứ ba) trên nền kem `copper-surface`, trong lề 16.
- **Về Molton Brown**: câu mời + HAI cửa hàng xếp DỌC (ô 343 × 166). Dữ liệu `discover` / `about` + i18n GIỐNG HỆT `desktop.html`.
- **Đã đo** (320 / 375 / 414, VI + EN): không cuộn ngang; bấm ảnh / "Mua ngay" → lưới Hàng mới về, bấm thẻ → PDP; console sạch.
- **Chưa làm**: khung Figma hub mobile `1129:88714` lệch code (không sync — chưa được yêu cầu).

## Figma lượt 27 (đêm 05/10/2026): sync hub Molton Brown MOBILE (khung MỚI) + soát toàn bộ chỉnh sửa trong ngày

Lệnh user: *"xong thì sync toàn bộ chỉnh sửa sáng h vào figma nhé"*. Báo cáo + bảng id: `_notes/FIGMA-SYNC-HUB-MB-MOBILE-LUOT-27-2026-10-05.md`; kỹ thuật + bẫy: `_notes/figx/README.md` lượt 27.
- **Soát toàn bộ**: `diff desktop.html` với bản sao lưu 18:11 (ngay sau lượt 24) → mọi chỉnh sửa desktop trong ngày ĐÃ vào Figma (lượt 20 – 25; hub desktop là khung của bạn, code theo bạn); chỉ còn hub mobile.
- **Khung MỚI** `Brand / mobile 375 · Molton Brown hub · brief 05/10/2026` `1181:130677` (375 × 4288 tại (6520, 80), bên phải khung desktop brief); section Brand nới 6520 → 6975 rộng. Khung hub mobile của bạn `1129:88714` GIỮ NGUYÊN (lệch code). Nền khối Highlights buộc biến `copper-surface`. Chữ 0 / 0, 74 / 74 chữ khớp (≤ 2,5 px), cao 4287,6 so DOM 4289; `[doc] Brand · mobile 375` thêm đoạn lượt 27.
- **Quét component**: `__compFix` `ok {}`; khung mới 8 instance; 6 thẻ SP `noBrand` + 4 `quick-add` thô là CẦN QUYẾT (cần biến thể `noBrand`).
- **Chưa làm**: xuất ảnh Figma kẹt (REST hết hạn token) nên chưa xem bằng mắt; hairline giữa dòng hàng của đơn nhiều món.

## Hub Molton Brown DESKTOP: LẦN SỬA TIẾP của user (06/10/2026 sáng) — danh mục tròn 6 ô · bộ sưu tập một hàng · Instagram ẨN (CHỈ `desktop.html`)

Lệnh user (kèm link khung `1178:123273`): *"update lại theo chính xác chỉnh sửa của tôi nhé"* — bạn sửa tiếp khung sau lượt 26. Báo cáo đầy đủ: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6j. Sao lưu `desktop.html.truoc-hub-mb-khung-user-06-10`.
- **Dải danh mục**: 6 ô TRÒN canh giữa (ảnh tròn 140 + nhãn 14/20 · 500 giữa, khe 24, ô 172 × 184); ô thứ 6 = bản sao "Bộ quà tặng" như khung.
- **Đầu mục** Bán chạy nhất + Các bộ sưu tập: nhãn nhỏ "Molton Brown" ẨN (`hide: eyebrow`); Các bộ sưu tập thêm "Xem tất cả" (→ lưới cả hãng).
- **Bộ sưu tập**: MỘT hàng 6 ô vuông 228,67 (khe 4), bỏ dòng mô tả — chỉ tiêu đề Libre 14/20 + "Mua ngay", mảng phủ 100. **Instagram ẨN** (`hide: insta`).
- **Về Molton Brown**: câu mời trải cột 902 một dòng; khe hai cửa hàng 16 → 32 (ô 435 × 166). Tiêu đề Highlights giữ dấu cách đầu dòng 2 như khung.
- **Đã đo**: cao trang 3399 = khung 3398,67; mọi khối trùng khung (xem 6j); EN + bấm đúng; trang chủ không đổi.
- **Chưa làm / nói rõ**: chữ trong ô bộ sưu tập khung đặt không đều (ô 1 / ô 6 cao hơn 11 / 32 px) — code đặt đều; mobile chưa theo.

## Hub Molton Brown MOBILE theo lần sửa tiếp (06/10/2026, CHỈ `index.html`)

Lệnh user: *"áp dụng cho bản mobile luôn nhé"* (sau mục "LẦN SỬA TIẾP" ngay trên). Báo cáo: `_notes/MOLTON-BROWN-BRAND-PAGE-2026-10-04.md` mục 6k. Sao lưu `index.html.truoc-hub-mb-khung-user-06-10`.
- **Dải danh mục**: 6 ô TRÒN trượt ngang (ảnh tròn 112 + nhãn 12/16 · 500 giữa, ô 128 × 152); ô thứ 6 = bản sao "Bộ quà tặng".
- **Đầu mục**: nhãn nhỏ "Molton Brown" ẨN (cả hai dải); Các bộ sưu tập thêm "Xem tất cả".
- **Bộ sưu tập**: dải trượt ô VUÔNG 170 (khe 4), bỏ dòng mô tả — tiêu đề Libre 14/20 + "Mua ngay", mảng phủ 100. **Instagram ẨN.** Khe giữa hai cửa hàng 16 → 32.
- **Đã đo** (320 / 360 / 414 / 375, VI + EN): trang cao 3577, không cuộn ngang, bấm đúng, trang chủ không đổi, console sạch.
- **Chưa làm**: khung Figma mobile `1181:130677` lệch code (không sync — chưa được yêu cầu).

## Màn SEARCH mobile: CHƯA GÕ GÌ = 3 BLOCK (06/10/2026, CHỈ `index.html`)

Lệnh user: *"giờ trang search, update lại bố cục các block như sau…"* (3 block) + *"tí nữa sync"* (Figma chưa đụng). Báo cáo đầy đủ + việc chờ sync: `_notes/SEARCH-MOBILE-3-BLOCK-2026-10-06.md`. Sao lưu `index.html.truoc-search-3-block-2026-10-06`.
- **Block 1 Vừa tìm kiếm**: giữ nguyên, BẬT / TẮT theo lịch sử (có lịch sử mới hiện; xoá hết thì tắt, block 2 + 3 dồn lên).
- **Block 2 (MỚI) "Từ khóa phổ biến"** (dựng với tên "Từ khóa & thương hiệu nổi bật", user đổi lại cùng ngày — mục "Search lượt 2" ngay dưới): 9 chip trộn xen kẽ từ khóa / hãng, xếp ngang tràn dòng (3 dòng × 3 ở 375); bấm chip = tìm chuỗi đó (vào kết quả + đầu lịch sử). Chip chọn theo dữ liệu thật nên đều có kết quả.
- **Block 3 "Sản phẩm nổi bật"**: bỏ nút quick add, thẻ 176 → 170 ⇒ thấy 2,1 thẻ ở 375; tiêu đề cố định (hết "thịnh hành"). Dùng chung cho pane không có kết quả.
- **Đã đo** (375, VI + EN): đủ 3 block, 4 trạng thái đúng, không cuộn ngang ở 320 – 414, console sạch.
- **Chưa làm**: sync Figma (`Search / mobile · default` + `no results`) — chờ lệnh, cần bật plugin Bridge. Desktop KHÔNG đổi (tìm bằng lớp riêng `#dkSearchLayer`; bản sao `screenSearch` trong `desktop.html` chỉ nằm ở `FLOW`).

## Search lượt 2: chip = "Từ khóa phổ biến" (mobile) · lớp tìm kiếm DESKTOP 5 thẻ một hàng, không quick add (06/10/2026)

Lệnh user: *"ở phần search sửa cái title của mấy chips lại là 'từ khóa phổ biến'. đồng thời ở bản desktop cho mục sản phẩm danh sách tầm 5 sản phẩm 1 row và k có quick add"*. Sao lưu `index.html.truoc-search-tieu-de-tu-khoa-pho-bien-2026-10-06` · `desktop.html.truoc-search-dk-5-the-2026-10-06`.
- **Mobile (`index.html`)**: tiêu đề khối chip "Từ khóa & thương hiệu nổi bật" → **"Từ khóa phổ biến"** (viết hoa chữ đầu theo luật dự án; hai dấu cách đầu user gõ thừa — bỏ). I18N: `'Từ khóa phổ biến':'Popular searches'` — CÙNG khoá + chữ EN đã có ở desktop; khoá cũ gỡ. Chỉ đổi chữ: 9 chip, bố cục, hành vi y nguyên.
- **(ĐÃ THAY ở lượt 3 ngay dưới: 4 thẻ, nội dung bằng ô nhập)** **Desktop (`desktop.html`) — lớp tìm kiếm `#dkSearchLayer`**, cột phải "Sản phẩm nổi bật": 4 thẻ có quick add (`grid-cols-4`) → **5 thẻ MỘT HÀNG, KHÔNG quick add**: `productCard(…, { noQuick: true })` (cùng cờ dải trang chủ — bỏ cả lớp size hover lẫn nút giỏ tròn), `PRODUCTS.slice(0, 5)`, lưới CSS riêng `#dkSearchProducts` 5 cột khe 8. Cột phải rộng 831 ở khung 1240 ⇒ thẻ ≈ 160 × 323. **Đáp ứng**: ≥ 1240 thẻ 159,8 · 1200 → 151,8 · 1024 – 1199 về **4 thẻ** (thẻ 5 ẨN, vẫn một hàng; để 5 thì thẻ chỉ còn 117 ở 1024) · ≤ 1023 hai cột xếp chồng, cột phải trải hết bề ngang ⇒ lại 5 thẻ (768 ⇒ 138 · 900 ⇒ 164 · 1023 ⇒ 189). Nhánh `[data-pc-size]` / `.quick-add` trong handler thành mã chết nhưng giữ (bật lại chỉ cần bỏ cờ). Bản clone màn Search mobile còn trong `desktop.html` (`screenSearch`, chỉ nằm ở `FLOW`) KHÔNG đổi.
- **Đã kiểm** (Chrome ẩn): desktop ở 1920 / 1440 / 1280 / 1240 / 1200 / 1199 / 1100 / 1024 / 1023 / 900 / 800 / 768 — số thẻ thấy được, cùng một hàng (tops trùng), không cuộn ngang; `.quick-add` / `.pc-quick` / `.pc-sizes` trong layer = 0; bấm thẻ 5 → đóng layer + mở PDP (`pdp5`); bấm từ khoá → PLP; không lỗi chạy. Mobile 375: tiêu đề VI "Từ khóa phổ biến", EN "Popular searches"; 9 chip; bấm chip → kết quả.
- **Figma ĐÃ sync (lượt 30, 06/10)**: chữ tiêu đề hai khung Search mobile `default` `1190:132016` + `default (no recent searches)` `1190:132248` đổi tại chỗ; khung overlay tìm kiếm desktop (section Menu) dựng lại theo lượt 3 ngay dưới — `_notes/FIGMA-SYNC-LUOT-30-2026-10-06.md`.

## Search lượt 3: lớp tìm kiếm DESKTOP — nội dung = bề rộng ô nhập, 4 thẻ (06/10/2026, CHỈ `desktop.html`)

Lệnh user: *"bóp phần nội dung bên trong search lại nhỏ bằng thanh search bar ở trên nhé, sản phẩm để lại 4 sản phẩm"* (sau lượt 2: 5 thẻ một hàng, không quick add). Sao lưu `desktop.html.truoc-search-dk-bang-thanh-search-2026-10-06`.
- **Nội dung = ô nhập**: `.ds-inner` trước bó 1240 canh giữa (nội dung 1192, rộng hơn ô nhập 980 ở khung 1440); nay cùng mép trái / phải với `#dkNavSearchField`. Ô nhập = min(980, cửa sổ − 460) canh giữa (hàng nav bó 1440, lề 230 mỗi bên) ⇒ từ khung 1440 trở lên nội dung rộng 980 (ở 1440: x 230 – 1210). JS `syncInner()` đo hộp ô nhập SAU `lockBodyScroll()` (và khi đổi cỡ cửa sổ đang mở) rồi đặt `--ds-left` / `--ds-width` cho `.ds-inner`. KHÔNG dùng CSS thuần (`min(100%, 1440px) − 2 × inset`): khoá cuộn làm thanh cuộn biến mất, body bù `padding-right` còn lớp này (fixed) rộng thêm đúng bề rộng thanh cuộn ⇒ lệch nửa thanh cuộn (~8px) so với ô nhập trên trình duyệt có thanh cuộn thật.
- **4 thẻ một hàng, không quick add**: `PRODUCTS.slice(0, 4)` + `noQuick`; lưới 4 cột khe 8 (bỏ quy tắc ẨN thẻ 5 của lượt 2). Ở 1440: cột trái 280 · khe 40 · viền 1 · đệm 40 · lưới 619 ⇒ thẻ ≈ 149 (lượt 2: 5 thẻ ≈ 160; trước lượt 2: 4 thẻ ≈ 200). **[Lượt 4 đổi: cột trái 220 · khe 24 · đệm 24 ⇒ thẻ 171,75.]**
- **Đáp ứng** **[ngưỡng 1366 → 1280 ở lượt 4]**: ≥ 1366 hai cột (thẻ 130 ở 1366, 149 từ 1440); **< 1366 XẾP CHỒNG** (hai cột sẽ ép thẻ < 130): hai khối trái "Vừa tìm kiếm" / "Từ khóa phổ biến" đứng CẠNH nhau, đường ngăn đổi sang ngang, lưới 4 thẻ trải hết bề rộng ô nhập (1280 ⇒ thẻ 199; 1024 ⇒ 135); khối trái rỗng (chưa có lịch sử) ẨN để khối kia trải hết hàng; **< 1024** ô nhập chỉ còn < 564 nên nội dung về lại trải hết bề ngang, đệm 24 (như trước). Tấm xếp chồng cao 653 – 688 (trần 86vh, cuộn trong tấm) so với 552 ở hai cột.
- **Đã kiểm** (Chrome ẩn): mép trái / phải nội dung KHỚP ô nhập ở 1920 · 1536 · 1440 · 1366 · 1365 · 1280 · 1100 · 1024 (sai số 0); ≤ 1023 cố ý không khớp; 4 thẻ một hàng ở mọi cỡ, không cuộn ngang, không quick add, không lỗi chạy. Chưa thử trên trình duyệt có thanh cuộn thật (Chrome ẩn của công cụ ẩn thanh cuộn) — chính vì vậy dùng JS đo thay vì CSS.
- **Figma ĐÃ sync (lượt 30, 06/10)**: khung `Menu / desktop · search overlay` `1192:133607` (thay `413:19669` tại chỗ; nội dung 980 = ô nhập, 4 thẻ `product-item-info` `size=rail` không quick add) + chữ tiêu đề chip hai khung Search mobile. Chỉ vẽ khổ 1440 (1366 / 1280 / dưới 1024 không vẽ).

## Search lượt 4: lớp tìm kiếm DESKTOP — cột trái 220 theo khung Figma của user (06/10/2026, CHỈ `desktop.html`)

Lệnh user: *"ở search desktop bên trái giảm cột nội dung xuống 220 như figma"* + link khung `1192:133607` (khung overlay của lượt Figma 30 — user SỬA TAY). Sao lưu `desktop.html.truoc-search-cot-trai-220-2026-10-06`.
- **Đọc khung Figma TRƯỚC khi sửa** (`figma_execute` dump x / y / w / h + auto layout): so với bản bóc lúc dựng (`menu-d-searchlayer-0610`) user đổi ĐÚNG ba số — `ds-side` 280 → **220**, khe `ds-cols` 40 → **24**, đệm trái `ds-main` 40 → **24**. Hàng chữ (cao 38), tiêu đề, thẻ, vị trí dọc giữ như dựng.
- **Code** (3 số CSS): `#dkSearchLayer .ds-cols` gap 24 · `.ds-side` width 220 · `.ds-main` padding-left 24. Cột phải vẫn `flex: 1` nên phần nhả ra (60 + 16 + 16 px) chảy hết vào lưới 4 thẻ, mép phải vẫn KHỚP ô nhập (luật lượt 3): ở 1440 cột phải rộng 736 (lưới 711) ⇒ **thẻ 171,75** (trước 148,8).
- **KHÁC Figma có chủ ý**: Figma để `ds-main` CỐ ĐỊNH 660 (số của bản dựng) nên nội dung dừng ở x 1134, hở 76px bên phải ô nhập, thẻ 152,75. Code KHÔNG bắt chước vì trái lệnh lượt 3 "nội dung bằng ô nhập". Muốn đúng Figma: thêm `max-width: 660px` cho `.ds-main`.
- **Ngưỡng xếp chồng 1366 → 1280** (cùng luật "thẻ ≥ 130"): cột trái 220 làm thẻ ở 1366 lên 153,25; ngưỡng mới `max-width: 1279px` (1280 ⇒ ô nhập 820 ⇒ thẻ 131,75).
- **Đã đo** (Chrome ẩn DPR 1, lớp mở): 1920 · 1536 · 1440 — cột trái 220 (x 230 → 450 ở 1440), cột phải bắt đầu x 474, thẻ đầu x 499 (đúng Figma), 4 thẻ 171,75 bước 179,75, mép phải = mép ô nhập (sai số 0), tấm cao 552; 1366 ⇒ thẻ 153,25 · 1280 ⇒ 131,75 (hai cột); 1279 ⇒ xếp chồng (thẻ 198,75, tấm 738) · 1100 ⇒ 154 / 678 · 1024 ⇒ 135 / 653; ≤ 1023 trải hết bề ngang đệm 24 (1023 ⇒ thẻ 237,75 · 900 ⇒ 207); không cuộn ngang ở mọi cỡ; hàng cột trái một dòng, cao 38. Ảnh chụp 1440 xem bằng mắt: cột trái / vạch dọc / lưới đúng chỗ.
- **Đang gõ**: cột trái hẹp hơn ⇒ vài gợi ý tên dài ("Giày sandal cao gót Medusa '95 …", "Túi đeo vai da Vivian East/West …") xuống 2 dòng (hàng 56) ⇒ tấm cao 588 thay vì 570 với 6 gợi ý (trước khi đổi đã nhảy 552 → 570 vì 6 dòng). Để nguyên.
- **Figma**: khung `1192:133607` nay là khung user sửa tay ⇒ vào PROTECT (`comp-audit.js` + `spacing-snap.js`, sao lưu `*.truoc-search-220-2026-10-06`). Chưa sync lại (user chưa bảo); khi sync: dựng khung MỚI cạnh (không đè), `ds-main` FILL.

## Search lượt 5: logic so khớp CHUẨN + nổi chữ khớp (06/10/2026, CHỈ `index.html`)

Lệnh user: *"research và bổ sung logic chuẩn chỉnh, cũng như highlight từ khóa trùng khớp của tính năng search nhé"*. Báo cáo + nguồn research + câu hỏi chờ chốt: `_notes/SEARCH-LOGIC-2026-10-06.md`. Sao lưu `index.html.truoc-search-logic-2026-10-06`. Không nói desktop ⇒ chỉ mobile.
- **Trước**: gợi ý / kết quả = chuỗi con CÓ DẤU của "hãng" / "tên" (gõ "dam" → 0, "versace túi" → 0, chip "Túi xách" → 1 vì chỉ dò tên); chữ khớp bọc `font-medium` = class chết dưới skin-mt ⇒ không nổi gì; Figma khung `typing` cũng vẽ toàn Regular #0a0a0a (chưa có kiểu nổi).
- **Chuẩn hoá + so khớp** (khối `/* ══ TÌM KIẾM — SO KHỚP CHUẨN ══ */` trên `searchHistoryHTML`): bỏ dấu (NFD) · đ→d · thường hoá · ký tự khác = cách · tách chữ↔số ("100ml"); **từng từ ở ĐẦU từ, AND, không kể thứ tự**, dò trên hãng + tên + danh mục 3 cấp (`p.cat`) + giới tính; xếp hạng (đầu tên 45 > hãng 40 > trong tên 30 > danh mục 20 > giới tính 5; tên bắt đầu cụm +100, cụm liền kề +60; Best seller / New arrival nhỉnh hơn khi hoà). **`plpProducts()` nhánh search dùng CÙNG `searchProducts(q)`** ⇒ "Phù hợp nhất" = thứ tự khớp, số trên gợi ý = số ở lưới.
- **Gợi ý gom nhóm**: Thương hiệu (≤ 3 → trang hãng / hub) · Danh mục (≤ 3, kèm "(N)" = số kết quả khi bấm) · Sản phẩm gợi ý (≤ 5, "tên · hãng" → thẳng PDP) · hàng "Xem tất cả kết quả (N)" = Enter. **Không kết quả**: "Không tìm thấy kết quả cho “q”" + "Có phải bạn muốn tìm “…”?" (Damerau-Levenshtein ≤ 1 / ≤ 2 từ dài, chỉ gợi khi cụm sửa có kết quả) + câu gợi cách tìm; pane dưới thêm khối Từ khóa phổ biến trước Sản phẩm nổi bật. **Lịch sử** `searchHistoryAdd`: lên đầu, gộp trùng không phân biệt hoa thường / dấu, ≤ 8.
- **Nổi chữ khớp**: `highlightMatch` tô CẢ TỪ khớp, mọi từ, mọi lần, bằng `<mark class="search-hit">`; **nhấn bằng BẬC MỰC** (STYLE-RULES §2.1): hàng gợi ý `text-muted-foreground` #727272, từ khớp `--general-foreground` #0a0a0a, vẫn 400, không nền — §2.3 cấm nhấn bằng độ đậm / mảng màu, §1.1 cấm 500 chữ thường. Muốn 500 (lệ Farfetch / NAP) phải ghi ngoại lệ §1.1 — **chờ user**. Hasaki.vn đo 06/10 cũng gợi ý Regular, phân biệt bằng màu.
- **i18n**: khoá `'Sản phẩm gợi ý':'Suggested products'` ('Sản phẩm' đã là khoá facet 'Product type'); 3 cặp regex 2 chiều (`Không tìm thấy kết quả cho “…”` · `Xem tất cả kết quả (N)` · `Có phải bạn muốn tìm “…”?`). **Bẫy dính trong lượt**: `mark` tách text node ⇒ bộ dịch EN dịch LẺ TỪNG MẢNH ("Đầm" → "Dresses" giữa tên VI) — chữ dữ liệu trong hàng bọc `data-i18n-skip`, nhãn danh mục dịch TRƯỚC khi tô (EN "Bags (7)").
- **Đã đo** (375, VI + EN): "dam" → 3 danh mục + 5 SP + "Xem tất cả kết quả (10)" = lưới 10 · "tui xach" → Túi xách (7) = lưới 7 · "gabbana" → trang hãng D&G 14 SP · "vesace" → gợi "Versace" · "zzzz" → 9 chip + 4 thẻ · lịch sử gộp đúng · console sạch · 4 phép kiểm file sạch. Chi tiết số đo: `_notes/SEARCH-LOGIC-2026-10-06.md` §4.
- **Chưa làm** *(cập nhật lượt 6 cùng ngày: desktop ĐÃ port; hàng chữ tên SP → block THẺ dưới cùng; xem mục "Search lượt 6")*: ~~DESKTOP chưa port (xem "Chờ port sang desktop")~~; Figma `typing` `413:16067` + `no results` `1190:132446` LỆCH tới khi sync; 4 câu chờ user (kiểu nổi 400 hai mực hay 500 · ảnh thu nhỏ ở hàng SP · giữ "(N)" · hàng Thương hiệu vào trang hãng hay kết quả).

## Search lượt 6: block THẺ theo từ khoá dưới cùng · không khớp → sản phẩm + danh mục LIÊN QUAN · PORT DESKTOP (06/10/2026, CẢ 2 FILE)

Lệnh user: *"khi nhập thì dưới cùng sẽ là block gợi ý sản phẩm theo từ khóa nhé · Nhập từ khóa không khớp cái nào thì gợi ý sản phẩm kèm gợi ý cate liên quan · áp dụng cho cả desktop luôn nhé"*. Sao lưu `index.html.truoc-search-luot6-2026-10-06` · `desktop.html.truoc-search-luot6-2026-10-06`. Báo cáo: `_notes/SEARCH-LOGIC-2026-10-06.md` §7.
- **Khối hàm tìm kiếm nay GIỐNG HỆT ở 2 file** (`/* ══ TÌM KIẾM — SO KHỚP CHUẨN ══ */` trên `searchHistoryHTML`, nguồn `search_block.js` của phiên) — sửa một bên thì chép sang bên kia. Desktop nhận trọn lượt 5 (bỏ dấu · từng từ · xếp hạng · gom nhóm · nổi chữ · sửa lỗi gõ · lịch sử) + `plpProducts()` nhánh search, CSS `.search-hit`, 3 khoá i18n + 3 cặp regex.
- **Pane đang gõ (mobile `screenSearch` + bản sao FLOW desktop)**: phần CHỮ `#searchSug` = nhóm Thương hiệu / Danh mục (hàng chữ tên sản phẩm BỎ — thẻ thay); phần THẺ `#searchSugProducts` (MỚI, dưới cùng, thay pane `#searchNores`) = block "Sản phẩm gợi ý" ≤ 8 thẻ theo từ khoá, cùng khuôn block Sản phẩm nổi bật (gap-2 · py-4 · thẻ 170 · không quick add) **[lượt 7 cùng ngày ĐỔI: danh sách DỌC ảnh + hãng + tên + giá kiểu mini cart, ≤ 5 hàng — mục "Search lượt 7"]**, tiêu đề 12/16 mực phụ + liên kết `hmLink` **"Xem tất cả (N)"** bên phải (= Enter; hàng chữ "Xem tất cả kết quả (N)" của lượt 5 bỏ). Block thẻ chỉ dựng lại khi DANH SÁCH THẺ đổi (so khoá `data-key` trong `renderSearchSug`) ⇒ gõ thêm chữ mà vẫn cùng bộ thẻ thì ảnh không nhấp nháy (đo: cùng node img sau khi gõ thêm dấu cách).
- **Không khớp gì** (`searchRelated`, 3 nấc): (1) cụm đã sửa lỗi gõ → (2) khớp MỘT PHẦN — giữ từ có trong kho, bỏ từ lạ, AND rồi OR (OR thì không có cụm để "Xem tất cả") → (3) mặc định = 4 Sản phẩm nổi bật + danh mục cấp 1 nhiều hàng nhất. Phần chữ: "Không tìm thấy kết quả cho “q”" + "Có phải bạn muốn tìm…?" + câu gợi cách tìm + **chip "Danh mục liên quan"** (nấc 3: "Danh mục phổ biến"; ≤ 6, cùng khuôn chip Từ khóa phổ biến, bấm = tìm nhãn đó). Danh mục liên quan = nhãn cấp 2 hay gặp nhất trong chính các sản phẩm gợi ý ⇒ chip nào bấm cũng có hàng. Khối Từ khóa phổ biến KHÔNG còn ở pane không-kết-quả (thay bằng danh mục liên quan theo lệnh); vẫn ở pane chưa gõ.
- **Lớp tìm kiếm DESKTOP `#dkSearchLayer`**: cột trái `renderTerms` = nhóm Thương hiệu / Danh mục (hàng `t-multiline` mực phụ + từ khớp mực chính; cách nhóm `pt-4`), không khớp → báo + "Có phải…" + hàng "Danh mục liên quan / phổ biến" (hàng chữ, không chip — cột 220 hẹp); cột phải `renderProducts` (MỚI) = tiêu đề `#dkSearchProdTitle` đổi theo trạng thái (chưa gõ "Sản phẩm nổi bật" 4 thẻ đầu như cũ · đang gõ "Sản phẩm gợi ý" 4 thẻ khớp nhất + `#dkSearchProdMore` liên kết "Xem tất cả (N)" · không khớp = liên quan), lưới 4 cột `#dkSearchProducts` + `noQuick` giữ nguyên; so khoá `prodKey` nên lý do cũ "cột phải không đổi theo phím gõ để ảnh không nhấp nháy" vẫn giữ. `renderStatic` chỉ còn Từ khóa phổ biến; ô nhập `input` → `renderTerms` + `renderProducts`; `goSearch` → `searchHistoryAdd`.
- **i18n**: khoá mới `'Danh mục liên quan':'Related categories'`, `'Danh mục phổ biến':'Popular categories'` (desktop thêm cả `'Sản phẩm gợi ý'`); luật regex `^Xem tất cả \((\d+)\)$` ↔ `See all ($1)` THAY luật "Xem tất cả kết quả (N)" (cả 2 file; chữ EN tự dịch, chờ duyệt).
- **Đã đo** — mobile 375: "dam" → Danh mục 3 + 8 thẻ + "Xem tất cả (10)" → lưới 10; "versace tui" → chữ rỗng + 4 thẻ + (4); "vesace" → "Có phải… “Versace”?" + 6 chip liên quan (Đầm & áo liền quần · Nước hoa · Túi đeo vai · Giày cao gót · Áo sơ mi & áo kiểu · Áo thun & áo polo) + 8 thẻ Versace + (19); "zzzz" → 5 chip Danh mục phổ biến (Làm đẹp · Quần áo · Giày dép · Túi xách · Phụ kiện) + Sản phẩm nổi bật 4 thẻ, không liên kết; "đầm molton" → OR: 6 chip + 8 thẻ, không liên kết; chip "Làm đẹp" → lưới 35; thẻ → PDP; EN đủ chữ ("Related categories" · "See all (10)" · "Popular categories"); console sạch. Desktop 1440: số đo trong báo cáo §7.
- **Chưa làm / chờ**: Figma `Search / mobile · typing` `413:16067` + `no results` `1190:132446` + `Menu / desktop · search overlay` `1192:133607` (khung user sửa tay — PROTECT) LỆCH cho tới khi sync (block thẻ, chip liên quan, tiêu đề cột phải + liên kết); câu chờ user còn lại: kiểu nổi chữ 400-hai-mực hay 500 · giữ "(N)" ở Danh mục · hàng Thương hiệu vào trang hãng hay kết quả (câu "ảnh thu nhỏ ở hàng SP" của lượt 5 ĐÃ chốt bằng block thẻ).

## Search lượt 7: "Sản phẩm gợi ý" MOBILE = danh sách DỌC ảnh + hãng + tên + giá kiểu MINI CART (06/10/2026, khối chung 2 file — lớp desktop giữ lưới)

Lệnh user: *"sản phẩm gợi ý là hình sản phẩm luôn nhé, xếp dọc giống cái mini cart cho bản mobile nhé"*. Sao lưu `index.html.truoc-search-luot7-2026-10-06` · `desktop.html.truoc-search-luot7-2026-10-06`. Báo cáo: `_notes/SEARCH-LOGIC-2026-10-06.md` §8.
- **Hàng = ĐÚNG khuôn hàng mini cart desktop** (`ccRow`, Figma 413:18646): ảnh **79×106** đặt inline (utility `w-[79px]` không có trong `tailwind.css` build sẵn — bẫy class chết 28/08), `align-self:flex-start`; khe 12; đệm dọc 12 ⇒ hàng cao **130**; cột chữ `min-height:106` để GIÁ GHIM ĐÁY; hãng mượn hook `.pc-brand` (Libre Bodoni 14/20 ở skin-li — đo đúng); tên `t-multiline` mực phụ + badge "Đặt trước" đứng trước như thẻ; giá `.pc-price` (đỏ khi giảm) + giá gạch + chip % như thẻ PLP. Kẻ ngăn giữa hàng V2 (`--general-border`) thụt 16 (li `mx-4`, rule `.search-prow + .search-prow` — cùng cách `#ccList`). Bấm hàng → PDP (`data-product` qua `wireProductCards`).
- **Số hàng**: theo từ khoá ≤ **5** (lượt 6 là dải ngang 8 thẻ 170); nấc "liên quan" cũng 5; nấc mặc định "Sản phẩm nổi bật" 4. Tiêu đề + liên kết "Xem tất cả (N)" giữ (hàng tiêu đề `py-2`). Khoá chống nhấp nháy (`data-key`) giữ nguyên.
- **Phạm vi**: `searchSugProductsHTML` nằm trong khối hàm chung nên bản sao màn Search trong FLOW của desktop cũng ra danh sách dọc; **lớp tìm kiếm desktop `#dkSearchLayer` KHÔNG đổi** (lưới 4 thẻ của `renderProducts`) — user chỉ nói mobile. Khối hàm vẫn GIỐNG HỆT 2 file (đã so).
- **Đã đo** (375, Chrome pane): ảnh 79×106 · hàng 130 × 343 tại x 16 · kẻ 1px #d3d3d3 · hãng "Libre Bodoni" 14/20 · giá #0a0a0a, giảm giá đỏ + gạch + chip · "dam" 5 hàng + "Xem tất cả (10)" · "tui xach" 5 + (7) · "vesace" 5 + (19) · "zzzz" 4 hàng "Sản phẩm nổi bật" không liên kết · gõ thêm dấu cách → cùng node img · bấm hàng → PDP đúng chỉ số · không tràn ngang (375/375) · console sạch 2 file; desktop 1440: lớp tìm kiếm vẫn lưới 4 thẻ + "Xem tất cả (10)", FLOW copy 5 hàng.
- **Figma**: `Search / mobile · typing` 413:16067 + `no results` 1190:132446 LỆCH thêm (hàng kiểu mini cart có thể dùng lại component dòng `item-cart` rút gọn của mini cart desktop khi sync). Chờ lệnh sync.

## Tấm hover Tài khoản: logo DAFC + "Rewards" canh ĐƯỜNG CHÂN CHỮ (06/10/2026, CHỈ `desktop.html`)

Lệnh user (kèm ảnh khối Rewards, vạch đỏ dưới DAFC): *"cái hover account logo và chữ đang chưa thẳng hàng với nhau, chỉnh lại nhé"*. Mobile không có tấm hover ⇒ chỉ desktop.
- **Lỗi đo được**: hàng lockup trong `.ap-rewards` (ảnh logo 74 × 24 + chữ viết tay Pinyon Script 26/32) canh ĐỈNH (`items-start`, như khung Figma 726:48116). Đáy mực ảnh DAFC ở 23,5 px còn đường chân chữ viết tay ở ~26,5 px trong dòng cao 32 ⇒ DAFC cao hơn "Rewards" 2 – 3 px CSS (ở độ phóng ~1,7 của ảnh user là 2,9 px ≈ 5 px thiết bị — khớp vạch đỏ).
- **Sửa**: `items-start` → `items-baseline` ở thẻ `<p>` của hàng (một chỗ, `desktop.html` khối `.ap-rewards`): đáy ảnh trùng đường chân chữ, ảnh tự hạ 2 – 2,5 px; hàng vẫn cao 32, tấm vẫn 378 × 128, các dòng dưới không xê dịch. Canh theo đường chân chữ (không đẩy ảnh bằng số px cứng) nên font dự phòng hay cỡ chữ khác vẫn thẳng.
- **Đã đo** (Chrome ẩn DPR 1, đếm mực từng hàng điểm ảnh): trước — đáy DAFC ở hàng 415, "Rewards" ở 417; sau — cùng 417, đỉnh 398 so với 397. Ở zoom 1 · 1,25 · 1,5 · 1,7 · 2 · 2,5 · 3: lệch đáy trước +2,0 … +3,3 px → sau 0 … +0,67 px (phần dư là 0,5 px trong suốt ở đáy ảnh logo). Quét chú thích 371 cặp cân, không CR.
- **Figma**: KHÔNG đụng. Khung 726:48116 và các khung hover đã sync vẫn để logo sát đỉnh hàng (y 0); code nay hạ logo ~2 px ⇒ lần "sync" sau sẽ dựng theo code (hoặc chỉnh tay: logo cách đỉnh hàng 2 px).

## Đăng ký bằng SĐT: ô OTP NGAY DƯỚI ô SĐT, chung một trang (06/10/2026, CẢ 2 FILE)

Lệnh user, hai lượt cùng ngày: *"ở trang đăng ký bằng sđt thì cho cái nhập otp vào chung 1 trang luôn nhé"* → lượt đầu mình mở khối 6 ô OTP SAU khi bấm Gửi mã (ô SĐT khoá) → user: *"không phải vậy, mà bạn đem cái chỗ nhập OTP xuống bên ngay dưới ô nhập sđt luôn"* kèm ảnh tham chiếu (ô SĐT có chữ GỬI MÃ OTP nằm trong ô, ô "Nhập mã OTP" ngay dưới). Bản lượt đầu BỎ. Làm cho mobile trước (mặc định); user nói tiếp *"áp dụng cho desktop luôn nhé"* ⇒ **port CÙNG MÃ sang `desktop.html`** (cùng ngày; mục "Desktop" ngay dưới). Sao lưu `index.html.truoc-dang-ky-otp-chung-trang-2026-10-06` + `desktop.html.truoc-dang-ky-otp-chung-trang-2026-10-06`.
- **Bố cục — hiện SẴN từ đầu, không còn bước mở khối sau khi gửi mã**: hai đoạn giới thiệu → ô **Số điện thoại** với nút **Gửi mã OTP nằm TRONG ô** (sát phải) → ô **Nhập mã OTP** ngay dưới (khe 24, cùng nhịp tab Đăng nhập) → nút **Xác nhận** → "Hoàn tất đăng ký".
- **Hành vi**: *Gửi mã OTP* — trống → "Vui lòng nhập số điện thoại"; sai định dạng → "Số điện thoại chưa đúng" và KHÔNG gửi (cùng luật `FIELD_RULE.phone` của kiểm-khi-rời-ô; MỚI so với bản cũ chỉ kiểm khác rỗng); hợp lệ → quay 0,7 s → toast "Đã gửi mã OTP" → nút đổi thành "Nhận lại mã (60s)" (vô hiệu, đếm ngược; hết thì bấm gửi lại: toast "Đã gửi lại mã OTP") → ô OTP lấy focus. *Ô OTP* — MỘT ô, chỉ nhận số, tối đa 6, `autocomplete="one-time-code"` (điện thoại gợi ý mã SMS). Sửa SĐT sau khi đã gửi ⇒ mã cũ hết khớp: nút về "Gửi mã OTP", xoá ô OTP. *Xác nhận* — SĐT trống → lỗi ở ô SĐT; chưa gửi mã → "Vui lòng gửi mã OTP trước" (chuỗi MỚI); thiếu số → "Vui lòng nhập đủ 6 số"; đủ 6 số → "Hoàn tất đăng ký" (demo chưa so mã đúng/sai, như cũ).
- **KHÔNG bê nguyên ảnh**: bỏ ô chọn quốc gia (cờ + mũi tên) và dấu * bắt buộc (dự án không dùng dấu sao, mục 02/10). GỬI MÃ OTP viết hoa 12/16 theo rule nút của khách: nút trong ô là `.btn-g` (ghost — không nền, không viền, chỉ nhãn) nên TỰ ăn rule, không khai riêng.
- **Code (index.html + desktop.html, khai GIỐNG HỆT)**: `viewRegister()` · `afield()` thêm tham số thứ 6 `act` (HTML một nút đặt TRONG ô, gắn `.has-act`; chỗ gọi cũ không đổi) · CSS `.field-float.has-act > input` (chừa 160 px bên phải cho nhãn dài nhất "Nhận lại mã (60s)") + `.field-float > .fld-act` (sát phải 4 px, cao 40 canh giữa ô 48) · khối wire "ĐĂNG KÝ bằng SĐT — MỘT TRANG" (nút trong ô + đếm ngược, kiểm, lọc số ô OTP, Xác nhận) · biến `regOtpSent` / `regOtpIv` + `resetRegOtp()` (dọn ở `[data-auth-go]` · `go('login')` · sau Xác nhận ⇒ rời trang rồi vào lại luôn về trạng thái đầu) · I18N thêm 'Nhập mã OTP' (Enter OTP code) + 'Vui lòng gửi mã OTP trước' (Please request an OTP code first). View `otp` 6 ô và các handler `[data-auth-otp]` / `[data-auth-verify]` / `[data-otp-change]` của **QUÊN MẬT KHẨU không đổi một ký tự** — so chuỗi HTML trước / sau cả 6 view auth, chỉ `register` khác.
- **Đã kiểm** (Chrome ẩn 375 × 812, DPR 1, VI + EN, bắt lỗi chạy: không có): đủ luồng (SĐT → Gửi mã → OTP → Xác nhận → Hoàn tất đăng ký; back về trạng thái đầu); SĐT trống / sai định dạng / chưa gửi mã / thiếu số đều báo đúng chỗ; gõ `12a3456789` → `123456`; sửa SĐT sau khi gửi → nút về Gửi mã + xoá OTP; đếm ngược 60 → 58; quên mật khẩu bằng SĐT vẫn qua view `otp` 6 ô. Bố cục ở 375: ô SĐT 343 × 48 (y 273) → khe 24 → ô OTP 343 × 48 (y 345) → khe 24 → Xác nhận 343 × 40; nút trong ô 100 × 40 (chờ) / 146 × 40 (đếm ngược), cách mép phải 4; số gõ (92 px) còn dư 129 px trước nút ở 320. Không cuộn ngang ở 320 / 360 / 375 / 390 / 414 (hết luôn lỗi tràn 16 px ở 320 của hàng 6 ô — trang Đăng ký không còn hàng đó).
- **Desktop (`desktop.html`, port cùng ngày)**: cùng một mã với mobile — script sinh từ bản mobile nên hai file khai giống hệt: `afield` tham số `act`, CSS `.has-act` / `.fld-act`, `viewRegister`, khối wire "ĐĂNG KÝ bằng SĐT — MỘT TRANG", `regOtpSent` / `regOtpIv` / `resetRegOtp()`, 2 chỗ dọn, 2 khoá I18N mới. Khác mobile chỉ ở vỏ: cột `w-[440px]` giữa trang, nội dung `px-4` ⇒ ô SĐT / ô OTP / Xác nhận rộng 408 (ô SĐT 408 × 48 · khe 24 · ô OTP 408 × 48 · khe 24 · Xác nhận 408 × 40; nút trong ô 100 × 40, cách mép phải 4). Desktop có HOVER ghost (`.btn-g:hover` = đen 5%): thêm `border-radius: 2px` cho khớp góc ô, và lúc đang đếm ngược (vô hiệu) bỏ hẳn mặt hover + con trỏ về mặc định (đo: hover `rgba(0,0,0,.05)` · vô hiệu `rgba(0,0,0,0)` + `cursor:default`); hai chỉnh CSS này mobile nhận luôn cho hai file khai giống nhau. **Đã kiểm** (Chrome ẩn 1440 × 900 DPR 1, VI + EN, bắt lỗi chạy: không có; hover bằng pane Browser): đủ luồng như mobile; vào từ tấm hover Tài khoản → "Tạo tài khoản" ra đúng trang mới; không cuộn ngang ở 1440 / 1280 / 1024 / 800; so chuỗi HTML trước / sau cả 6 view auth — chỉ `register` khác (view `otp` 6 ô của Quên mật khẩu giữ nguyên). Desktop không có nút back ở "Hoàn tất đăng ký" (có từ 19/08, xem chú thích `authNav` đã xoá) nên lúc thử quay lại phải vẽ lại bằng `rerenderLogin()`. 3 bản fork skin đóng băng (`desktop-atelier` / `-editorial` / `-neutral`) KHÔNG đụng.
- **Chưa làm / chờ user**: QUÊN MẬT KHẨU bằng SĐT vẫn là view `otp` 6 ô (cả hai file; user chỉ nói Đăng ký) — muốn đồng bộ thì dùng cùng khuôn ô + nút trong ô. **Figma** KHÔNG đụng: khung auth mobile + desktop Đăng ký cần vẽ lại (nút trong ô SĐT + ô Nhập mã OTP + Xác nhận); khung OTP 6 ô chỉ còn dùng cho Quên mật khẩu — tra tên khung lúc sync.

## Màn Hoàn tất (đặt hàng thành công): ĐƠN GIẢN như website DAFC — chỉ theo NỘI DUNG, giữ vòng tick + confetti (03/10/2026, CẢ 2 FILE)

> ⚠ **05/10/2026: confetti ĐÃ GỠ ở `desktop.html`** (xem mục ngay trên); `index.html` giữ mã ẩn như cũ.

Lệnh user (kèm ảnh chụp trang đặt hàng thành công của website DAFC): *"trang đặt hàng thành công thì giữ layout đơn giản như hiện tại của website dafc nhé"*, rồi giữa chừng *"bạn chỉ cần theo nội dung k cần theo sát hình brief nhé"*.
- **Nội dung mới** (cả 2 bản): vòng tick → **"Đặt hàng thành công"** → **"Đơn hàng #mã"** (MÃ GỐC, đúng MỘT dòng — xem mục "Sửa tiếp cùng ngày" bên dưới) → đoạn cảm ơn **đúng chữ của website**: *"Cảm ơn quý khách đã lựa chọn mua sắm tại DAFC. Quý khách vui lòng truy cập email để kiểm tra chi tiết hoá đơn đặt hàng."* (giữ "quý khách" của website dù phần còn lại của demo xưng "bạn" — đổi một chuỗi nếu muốn thống nhất) → câu *"Đơn có cả hàng có sẵn và hàng đặt trước nên được tách thành 2 đơn."* CHỈ khi đơn tách → nút **"Tiếp tục mua sắm"** → liên kết chữ gạch chân **"Theo dõi đơn hàng"**.
- **Theo "nội dung", KHÔNG theo "hình"**: không bê vòng tròn nâu + túi, chữ hoa, màu nâu của website. Vòng tick + confetti + kiểu chữ giữ của dự án (tiêu đề Libre 24/32 · mã đơn Inter 14/20 · đoạn cảm ơn 12/18 xám · nút chính giữ nguyên lớp cũ). Bản đầu trong cùng lượt từng dựng vòng tròn nâu `--cu-signature` + túi + mã đơn nâu `--cu-ink`, gỡ ngay khi user nói không cần theo hình — vòng tick, `#ring` / `#tick` CSS, confetti khôi phục NGUYÊN VĂN từ bản sao lưu.
- **Đã gỡ khỏi màn** (thông tin vẫn nằm ở Chi tiết đơn / checkout): chữ "Xác nhận" trên tiêu đề · bảng Mã đơn / Tổng cộng / Vận chuyển / Dự kiến giao (hoặc Nhận tại / Sẵn sàng nhận) / Hàng pre-order · khối "Quà tặng kèm đơn" · dòng điểm thưởng · ô email + "Tải hoá đơn (PDF)" · lời mời "Tạo tài khoản để theo dõi đơn này" của khách vãng lai · **desktop: dải "Sản phẩm tương tự"**. **Đảo ngược** lượt 02/10 "sửa luôn ngày dự kiến ở màn hoàn tất": dòng đó không còn trên màn này (ngày vẫn đúng ở checkout + chi tiết đơn).
- **Giữ thêm MỘT thứ website không có**: liên kết "Theo dõi đơn hàng" — brief trang 38 đòi lối vào theo dõi đơn từ màn Đặt hàng thành công (`[data-track-open]` mở thẳng kết quả của đơn đầu); đổi từ nút viền sang chữ gạch chân cho nhẹ. Muốn ĐÚNG một nút như website thì gỡ liên kết này (một dòng).
- **Dọn kèm (cả 2 file)**: hằng `SHIP_DONE_STD/FAST` + `PICKUP_READY` · handler `#dlInvoice` + toast · 17 khoá / luật i18n chỉ phục vụ phần đã gỡ (`'Bạn nhận được'`, `'từ đơn hàng này'`, `'Quà tặng kèm đơn'`, `'Tải hoá đơn (PDF)'`, toast hoá đơn, `'Xác nhận đơn hàng đã được gửi tới email của bạn.'`, `'Tạo tài khoản để theo dõi đơn này'`, luật "Đơn vừa đặt sẽ được gắn vào tài khoản…" 2 chiều, `'Nhận tại'`, `'Sẵn sàng nhận'`, `'Từ 14/07'`, `'Trước 18:00 ngày 14/07'`, `'Hàng pre-order'`, `'Cửa hàng DAFC'`, `'Đơn hàng đang được xử lý.'`, `'Cảm ơn bạn đã tin tưởng mua sắm.'`); thêm 1 khoá cho đoạn cảm ơn mới + luật `Đơn hàng #mã ↔ Order #mã` (EN: *"Order placed"* · *"Order #DAFC…"* · *"Thank you for choosing to shop at DAFC. Please check your email for your order invoice details."*). Desktop thêm 1 rule `.done-cta { max-width: 320px }` để nút chính không kéo hết cột 512. State `ckOrderPoints` · `ckOrderPre` · `ckOrderEmail` nay chỉ ghi, không ai đọc (giữ để khôi phục dễ).
- **Sửa tiếp cùng ngày (user: *"ở màn kết quả thanh toán ở mobile đang thiếu header footer và lặp lại mã đơn hàng 2 lần"* → *"kiểm tra bản desktop luôn nhé"*)**:
  - **Mobile Hoàn tất THÊM header + footer** (trước đó chưa bao giờ có — cả bản HEAD tháng 9 cũng không): `navBar({ logoOnly: true })` (logo giữa, 48px — cùng header của checkout và của bản desktop; **⚠ 04/10 đã ĐỔI sang `navBar()` mặc định cả 2 file — xem mục "Header: màn Hoàn tất dùng header MẶC ĐỊNH" ở trên**) + `footer()`, cả hai nằm TRONG lớp `z-20` nền trắng của thân cũ nên confetti vẫn ở phía sau như trước. Đã đo: confetti của mobile **chưa bao giờ nhìn thấy** (thân `z-20 bg-background` đè lên host `z-10`) — giữ nguyên hiện trạng, KHÔNG sửa; desktop (thân không nền) vẫn thấy.
  - **Mã đơn chỉ một dòng — MÃ GỐC** (`ckOrderId`, vd `DAFC102948`): giỏ mặc định có hàng đặt trước nên luôn tách 2 đơn, bản trước in `#…-01` và `#…-02` hai dòng → user thấy "lặp lại 2 lần". Nay một dòng mã gốc (cùng mã màn cổng thanh toán đang in), câu "…được tách thành 2 đơn." vẫn đứng dưới; hai mã `-01` / `-02` xem ở Chi tiết đơn / danh sách đơn. Áp cả 2 file. Nút "Theo dõi đơn hàng" vẫn mở đơn đầu (`-01`).
  - **Bản desktop kiểm lại**: màn Hoàn tất desktop vốn đã có header rút gọn + footer (chỉ lỗi mã đơn 2 dòng, đã sửa chung). Tìm ra thêm lỗi ở **màn cổng thanh toán (`screenPAY`: chuyển cổng · QR · thất bại · hết hạn)**: desktop KÉO bảng + nút "Tôi đã thanh toán" / "Quay lại đơn hàng" ra hết bề ngang **1376px** và **cả 2 bản đều không có footer** ⇒ thêm `${footer()}` vào khung `shell` (cả 2 file) và desktop đặt cột canh giữa `max-w-[560px]` (nút còn 496, như màn Hoàn tất). Mobile giữ nguyên bố cục (nút 311).
  - **Đã đo**: mobile 375 + desktop 1440 × {Hoàn tất đơn thường · Hoàn tất đơn tách · 4 trạng thái cổng thanh toán} × header / footer / số lần in mã đơn (đều 1) / tràn ngang (không) / EN; luồng thật Đặt hàng → cổng → "Tôi đã thanh toán" → Hoàn tất; console sạch; quét cú pháp 2 file OK.
- **Sao lưu nguyên văn** bản cũ (hàm `screenDONE` cả 2 file, hằng ngày dự kiến, handler, dòng i18n): `_notes/BACKUP-MAN-HOAN-TAT-TRUOC-DON-GIAN-2026-10-03.md`.
- **Đã đo / thử**: mobile 375 + desktop 1440 × {đơn thường 1 mã · đơn tách 2 mã} × {VI · EN → VI} · "Tiếp tục mua sắm" (về PLP, đơn được reset) · "Theo dõi đơn hàng" (mở đúng `DAFC…-01`) · console sạch · quét cú pháp 2 file OK. Số đo mobile: tiêu đề Libre 24/32 · mã 14/20 · đoạn cảm ơn 12/18 (3 dòng, rộng 311) · nút chính 311 × 44 · liên kết 115 × 42; desktop: cột 560, nút 320 × 44 canh giữa, đoạn cảm ơn 512 × 36 (2 dòng), không còn dải tương tự.
- **Figma: ĐÃ sync (lượt 14, 03/10, lệnh "sync Figma màn Hoàn tất luôn nhé")** — dựng lại `Order success / mobile 375` (nay `1119:67113`, 375 × 1229 → **1386**, có header rút gọn + footer) và `Order success / desktop 1440` (nay `1119:67274`, 1440 × 2317 → **1020**), vẽ trạng thái demo mặc định (mã `#DAFC102939`, đơn thường, KHÔNG có câu "tách 2 đơn"). Khung `[doc]` thêm nhật ký + dời lên y = 3210, section 4490 → 4147. Chi tiết + id: `_notes/FIGMA-SYNC-HOAN-TAT-LUOT-14-2026-10-03.md`. Chưa có khung vẽ màn cổng thanh toán (QR · thất bại · hết hạn).

## Thanh toán: COD là thẻ BÌNH THƯỜNG, không dùng được thì ẨN HẲN (02/10/2026, CẢ 2 FILE)

Lệnh user: *"cái COD cho active đi nhé, khi nào k sử dụng được thì nó ẩn luôn"*. **Đảo ngược chốt 11/09** (khi đó user chốt "BÀY RA nhưng KHOÁ với đơn lớn, kèm lý do").
- **Luật**: thẻ "Thanh toán khi nhận hàng" chỉ được **VẼ** khi `cartSubtotal() <= COD_MAX` (20.000.000đ); quá mốc thì **không có thẻ** — hết thẻ mờ `opacity .5` + dòng "Không áp dụng cho đơn trên 20,000,000đ". Biến `codOff` (chuỗi lý do) → `codOk` (đúng / sai), thẻ vào `pays` bằng `...(codOk ? [[…]] : [])`. Mốc là **≤**: đúng 20.000.000 vẫn hiện, 20.000.001 ẩn (đã thử). Điều kiện DUY NHẤT vẫn là trần tạm tính của các món đang tick; chưa có luật theo hàng đặt trước (đặt cọc user để SAU).
- **Tính lại mỗi lần vào Thanh toán**: danh sách vẽ lúc dựng màn, nên bỏ tick bớt món ở giỏ rồi vào lại thì COD hiện, tick đủ lại thì ẩn (đã thử đường đi thật: giỏ → Thanh toán → giỏ → Thanh toán).
- **Giỏ DEMO mặc định (5 món, tạm tính 186.057.000đ) KHÔNG có COD** — bước Thanh toán còn 4 thẻ (mobile cao 80 / 64 / 64 / 66, desktop 64 cả bốn). Muốn thấy COD hoạt động: ở giỏ chỉ tick **thắt lưng** (17.575.000đ) hoặc **khăn lụa** (15.611.000đ); thắt lưng + khăn (33.186.000đ) đã quá mốc. Muốn COD hiện ở giỏ mặc định thì nâng `COD_MAX` (một dòng mỗi file) — mình KHÔNG tự đổi vì mốc 20 triệu là chốt của user 11/09.
- **COD "active" thật**: thẻ bấm chọn được như 4 thẻ kia (cao 64, `opacity 1`, chọn thì mặt xám `rgb(245,245,245)` + viền đen + dấu check 12), chọn → Đặt hàng → **không qua cổng**, đơn ra ngay ở "Đang xử lý" rồi sang màn Hoàn tất. **Sửa kèm một lỗi liền kề**: `placeOrder` ghi cứng `payment: 'Thẻ tín dụng/Ghi nợ'` cho MỌI đơn nên đơn COD ra chi tiết đơn lại hiện thẻ tín dụng — thêm tham số `payName`, COD truyền "Thanh toán khi nhận hàng" ⇒ hàng "Phương thức thanh toán" ở Chi tiết đơn đọc "Thanh toán khi nhận hàng" (EN "Cash on delivery"), không có nút "Thanh toán lại". **Các phương thức khác (QR · ATM · trả góp) vẫn ghi "Thẻ tín dụng/Ghi nợ" như trước** — ngoài lệnh nên chưa đụng, đã nói user.
- **Dọn**: 2 luật i18n của dòng lý do ("Không áp dụng cho đơn trên N đ" ↔ "Not available on orders over N đ", `I18N_RE` + `I18N_REV_RE`, cả 2 file) gỡ vì không còn chỗ nào sinh ra chuỗi đó. Rule CSS `[data-screen="checkout"] .opt[disabled]` (mặt trắng) **giữ** vì `richRadio` vẫn hỗ trợ tham số `off` — chỉ sửa chú thích.
- **Đã thử**: mobile 375 + desktop 1440 × {giỏ mặc định → 4 thẻ · chỉ thắt lưng → 5 thẻ · đúng 20.000.000 → 5 · 20.000.001 → 4} · chọn COD → Đặt hàng → Hoàn tất → Chi tiết đơn (VI · EN) · hồi quy đường QR (vẫn sang cổng, đơn "Chờ thanh toán"); console sạch; quét cú pháp 2 file OK.
- **Figma: ĐÃ sync (lượt 13, cùng ngày, lệnh "sync toàn bộ update vào figma đi")** — dựng lại `Checkout / desktop · step 4 payment` (nay `1114:66207`, cao 1442 → 1364) và `Checkout / mobile · step 4 payment` (nay `1114:66448`, 1591 → 1506): 4 thẻ thanh toán, hết thẻ COD mờ + dòng lý do. Bảng id: `_notes/FIGMA-SYNC-CHECKOUT-LUOT-13-2026-10-02.md`. **Khung "COD đang hoạt động" — ĐÃ dựng 03/10/2026** (lệnh "dựng thêm khung COD đang hoạt động đi"): `Checkout / mobile · step 4 payment · COD` `1115:66954` (375×1542) và `Checkout / desktop · step 4 payment · COD` `1115:66787` (1440×1420), vẽ giỏ chỉ có thắt lưng 17.575.000đ ≤ 20 triệu nên thẻ COD hiện và đang chọn (nền xám, viền đen, dấu check); desktop nằm ở hàng trên của section vì hàng dưới đã kín.

## Trang Thanh toán: câu đồng ý LÊN TRÊN nút "Đặt hàng", nút full ngang khối · MOBILE thêm THANH DÍNH đáy (02/10/2026, CẢ 2 FILE)

Lệnh user: *"ở checkout cho nội dung 'bằng việc bấm đặt hàng …' lên trên nút đặt hàng, và cho nút đặt hàng full W của block đó luôn. ở bản mobile thì cho sticky nút đặt hàng đó tương tự ở cart vậy, và đồng thời cho sticky luôn cái dòng bằng việc đặt hàng … đó luôn"*. **Đảo ngược** chỗ đặt câu đồng ý của lệnh sáng nay (khi đó câu nằm DƯỚI nút).
- **Thứ tự (cả 2 file)**: câu đồng ý `.ck-terms` nay là con ĐẦU của khối nút, nút `[data-nav="done"]` ngay dưới. Khe 12 đổi từ `pt-3` (trên câu) sang `pb-3` (giữa câu và nút). Không đổi chữ / liên kết / i18n (hai cụm "Điều khoản sử dụng" · "Chính sách bảo mật" vẫn là liên kết; EN "By clicking CHECKOUT, …" đã đo lại ở desktop, VI → EN → VI sạch).
- **Nút full ngang khối**: desktop `w-[280px]` → `w-full`. Đo 1440: khối nút 829 (cột trái), đệm `px-4` ⇒ nút = bề rộng nội dung khối (**797** trong tab thử có thanh cuộn 15px; **812** ở khổ 1440 chuẩn / khung Figma), mép trái nút 68 = mép trái câu (68); câu 1 dòng (hộp 30 gồm khe 12), nút cao 56, bề rộng cũng bằng câu. Mobile nút vốn đã `w-full` (343 = 375 − 2×16).
- **Mobile — thanh dính `#ckStickyCta`** (khuôn của `#cartStickyCta` của giỏ: `sticky-el fixed inset-x-0 bottom-0 z-50 px-4 safe-b`, hiện / ẩn bằng opacity + translateY + `pointer-events:none`): chứa **câu đồng ý + nút Đặt hàng** y như khối gốc. Hiện khi **đang ở bước Thanh toán** (bước 4 giao hàng / bước 3 nhận tại cửa hàng) VÀ khối nút gốc `#ckCta` đã **ra khỏi khung nhìn**; các bước TRƯỚC Thanh toán (1–3 giao hàng, 1–2 nhận tại cửa hàng) luôn ẩn; cuộn tới cuối trang (khối gốc hiện ra) thì thanh trượt đi. Không nhét vào accordion vì `.acc-inner { overflow:hidden }` làm `position:sticky` mất tác dụng — nên là một thanh `fixed` riêng đặt cuối `screenCHECKOUT()`; trình nghe cuộn / resize dựng trong `wire()` (dọn bằng `scrollCleanups`), và `paintCheckout()` gọi `window.__ckStickyRefresh` mỗi lần đổi bước vì đổi bước không bắn sự kiện cuộn. Khi ẩn có `inert` (Tab không rơi vào nút / link vô hình).
- **Khác thanh dính của giỏ ở 2 điểm**: (1) **nền ĐẶC** `--general-background` + dải mờ dần 24px phía trên (`#ckStickyCta { background-image: linear-gradient(...) }`) — bản đầu dùng nền mờ kính như giỏ thì câu đồng ý 3 dòng bị nội dung phía sau lòi ra giữa các chữ; (2) **cao gấp đôi** — đo 375 × **162** tại y 650–812 = 24 (dải mờ) + 66 (câu 3 dòng 18 + khe 12) + 56 (nút) + 16 (`safe-b`).
- **2 nút nổi + popup Cài đặt né lên**: thanh cao 162 che mất 2 nút nổi nên gắn lớp `html.ck-sticky` + biến `--ck-sticky-h` (chiều cao thật, gồm safe-area): `#settingsFab` bottom 96 → **174**, `#topFab` 144 → **222**, `#settingsPanel .sp-card` bottom 144 → `sticky-h + 60` kèm `max-height` co lại theo. Thanh ẩn thì trả về 96 / 144 (hai nút nổi thêm `bottom` vào transition cho khỏi nhảy).
- **Bấm nút ở thanh dính**: cùng `[data-nav="done"]` nên `startPayment` khoá **cả hai** nút ("Đang xử lý…") rồi sang cổng `pay` (đã thử: đặt đơn → ra 2 mã `-01` / `-02`, thanh dính tự ẩn khi rời trang); khách vãng lai chưa điền → `ckGuard` đưa về bước 1, thanh ẩn theo; bấm liên kết "Điều khoản sử dụng" ngay trên thanh → mở trang điều khoản, Back về đúng bước 4.
- **Đã thử**: mobile 375 × {giao hàng · nhận tại cửa hàng (`ckCity` / `ckStore` đã chọn)} × {các bước trước Thanh toán: ẩn · bước Thanh toán: hiện khi nút gốc ngoài khung, ẩn khi cuộn tới cuối} × VI / EN; desktop 1440 (thứ tự, bề rộng, màu `rgb(10,10,10)`, cỡ 12/18 · #727272, EN); console sạch; quét cú pháp 2 file: khối script chính OK, vi phạm comment 0. **Desktop KHÔNG có thanh dính** (user chỉ xin cho mobile; cột phải tóm tắt tiền đã `sticky` sẵn).
- **Figma: ĐÃ sync (lượt 13, cùng ngày)** — dựng lại 2 khung bước 4 (desktop `1114:66207`, mobile `1114:66448`). Thanh dính `fixed` bị bộ bóc đặt ở đáy khung nên đè lên khối nút gốc: mình gỡ khỏi khung chính (khung = trạng thái cuối trang) và dựng khung MỚI `Checkout / mobile · step 4 payment · sticky CTA` (`1115:66629`, 375×812) vẽ trạng thái vừa vào bước 4 với thanh dính ở y 650–812. Chi tiết: `_notes/FIGMA-SYNC-CHECKOUT-LUOT-13-2026-10-02.md`.

## Radio đang chọn: dấu check 10 → 12px + component Figma `radio-check` (02/10/2026, CẢ 2 FILE + FIGMA)

Lệnh user: *"cái mũi tên check trong mấy cái radio đang khá bé, tạo cho nó component trong figma và điều chỉnh nó lại đi"*.
- **Code (cả 2 file, MỘT dòng CSS)**: `.radio .radio-dot > svg { width: 10px; height: 10px }` → **12px**. `I.tick` có viewBox cắt sát nét check (23,97 × 15,38) nên hộp 12×12 cho nét check **12 × 7,7** (trước 10 × 6,4: +20% bề rộng, +44% diện tích). Vòng radio 16 trừ viền còn 14; **12 là cỡ lớn nhất còn chừa mép** (13 thì mũi check phải chạm viền — đã thử 10 / 11 / 12 / 13 phóng 3,4× trong trang). Đo ở 3 bước checkout (Thanh toán · Vận chuyển · VAT), mobile 375: nét check 12 × 7,7, tâm lệch 0 / 0 so với vòng, nền `rgb(10,10,10)`, nét `rgb(255,255,255)`. Áp cho MỌI `.radio` (6 chỗ markup mỗi file) qua đúng một rule. **Ô tick vuông `.chk` (checkbox) KHÔNG đổi** — vẫn dùng cùng `I.tick` ở 10px vì user chỉ nhắc radio; nay radio check to hơn checkbox check (trước đó hai loại điều khiển giống hệt, chỉ khác tròn / vuông) — nâng cả checkbox lên 12 nếu muốn lại khớp.
- **Figma — component MỚI `radio-check`** (`1112:66160`, section `field.choice` cạnh `choice-radio`, vị trí 376,528): radio ĐANG CHỌN 16×16 — nền `primary`, viền `border-strong` 1px (bên trong, tính vào layout), bo tròn, dấu check trắng 12 × 7,7 buộc biến `primary-foreground`, canh giữa bằng auto layout (tâm lệch 0). Dấu check chép đường vẽ của `icon/ts/check` (bản `Style=Default` của user, 15,98 × 10,25) thay vì lồng instance: vector của icon ràng buộc MIN/MIN nên instance resize về 12 sẽ KHÔNG co nét check. **Đã thay 12 radio thô** (node `radio on`) bằng instance: 6 khung Checkout (desktop + mobile × bước 2·3·4), 4 khung giỏ thô (rewards / membership × desktop / mobile) và 2 biến thể `side-panel` kind=summary (nên 2 instance `side-panel` trong khung `NEW 18/09` tự theo). Toạ độ tuyệt đối từng radio KHÔNG đổi, khung cao không đổi; riêng 4 radio ở khung giỏ trước là hình **oval** (16×14 / 16×18 do HUG, viền 0,8 hoặc 2) nay tròn 16×16 đúng khuôn. Dòng mô tả component + một dòng mới trong khung `[doc] Checkbox & Radio`.
- **Luật asm (`_notes/figx/asm.js`, sao lưu `asm.js.truoc-radio-check-2026-10-02`)**: `{ re: /^radio on$/ → COMP['radio-check'], keepSize }` — các lượt sync sau tự ráp node `radio on` thành `radio-check` (ép 16×16 FIXED, không so khổ vì khung thô hay lệch cỡ). Đã thử trên khung thử (3 radio thô 16×16 / 16×14 / 16×14 + 1 radio chưa chọn): 3 → instance, radio chưa chọn giữ thô; khung thử đã xoá. Component vừa tạo trong phiên plugin thì đặt `globalThis.__asmCat = null` để asm nạp lại danh mục.
- **Không đụng / còn lệch (nói user)**: bộ **`choice-radio`** (components) vẫn là kiểu **chấm đen 8** cũ — khung `[doc]` của nó tự ghi "checked nền đen, dấu trắng" nhưng biến thể thì chưa đổi; 2 khung overlay `Overlay / mobile · change gift` `413:21747` + `Overlay / desktop · change gift` `413:22491` còn radio chấm 8 (dựng trước 19/09, KHÔNG phải dấu check nên không có gì để phóng); 1 radio trong khung `NEW 18/09 · Cart / mobile 375` nằm trong instance của component `side-panel/summary/mobile/default` (`641:76690`, không còn thuộc trang nào — ảnh chụp cũ 18/09) nên không theo master mới; khung `Account / desktop · addresses` của user. Radio CHƯA chọn (vòng viền trơn) không có dấu check nên không đổi.

## Trang Thanh toán MOBILE: khối tiền LÊN TRÊN, nút "Đặt hàng" xuống CUỐI bước Thanh toán (02/10/2026, CHỈ `index.html`)

Lệnh user: *"ở màn check out của mobile swap lại vị trí của nút đặt hàng và tổng tiền nhé, cho nút đặt hàng xuống dưới cùng lại"*. **Đảo ngược chốt 19/09** (khi đó user bảo nút LÊN TRÊN bảng tiền để khỏi phải cuộn qua bảng tiền mới bấm được).
- **Thứ tự mới** ở `s2open`: `#payOpts` (5 thẻ phương thức) → khối tiền (Tạm tính · Giảm giá nếu có · Giao hàng / Nhận hàng · **Tổng cộng (đã bao gồm VAT)**) → **nút "Đặt hàng"** → câu đồng ý điều khoản (vẫn NGAY DƯỚI nút như lệnh trước, nên câu đó là dòng cuối của trang). Chỉ đổi thứ tự khối + đệm, không đổi nội dung / id / handler (`ckShipVal2`, `ckTotalVal`, `[data-nav="done"]` giữ nguyên) nên `paintCheckout`, `ckGuard`, `startPayment` chạy như cũ — đã bấm thử: khách vãng lai chưa điền bị chặn; đã đăng nhập → đơn ra ở "Chờ thanh toán" và sang cổng.
- **Đệm**: khối tiền `pt-3` (cùng 8 đệm đáy `#payOpts` ⇒ thẻ cuối → dòng "Tạm tính" cách 20, chữ cách ~29); nút `pt-2` sau hàng Tổng cộng (hàng cao 56, chữ cách đáy hàng 18 ⇒ chữ "Tổng cộng" → nút 26); khối nút `pb-2` + đệm cuối trang `h-6`. Đã bỏ `pb-4` của khối tiền (nút nay nằm sau nó).
- **Đo (375)**: thẻ cuối kết thúc y 1245 → hàng tiền 1265…1393 (Tổng cộng 1337–1393, cao 56) → nút 1401–1457 (cao 56) → câu đồng ý 1457–1523 (3 dòng) → hết trang 1579. Luồng **nhận tại cửa hàng** dùng chung markup nên đảo theo (Tổng cộng 1183 < nút 1247 < câu đồng ý 1303); EN ra "Checkout" + câu đồng ý EN như cũ. **Desktop KHÔNG đổi** (nút nằm cột trái, tiền nằm cột phải — không có gì để đảo).
- **Figma: ĐÃ sync (lượt 13, cùng ngày)** — khung `Checkout / mobile · step 4 payment` dựng lại (`1114:66448`): khối tiền trên nút. Xem mục "Trang Thanh toán: câu đồng ý LÊN TRÊN nút…" phía trên về câu đồng ý + thanh dính.

## Ô Phường / xã có ô Tìm kiếm như ô Tỉnh / thành phố (02/10/2026, DESKTOP thiếu — mobile đã có sẵn)

Lệnh user: *"trong các mục có phường xã — thêm box Search ở Phường Xã tương tự thành phố"*.
- **Nguyên nhân**: dropdown desktop `openDD` (`__openPickDD`) chỉ vẽ ô Tìm kiếm khi danh sách **dài hơn 8 mục**. Tỉnh / thành có 10–11 mục nên có ô tìm; phường chỉ 4–7 mục nên KHÔNG có. Mobile dùng bottom sheet `#pickSheet` (`__openPicker`) vốn **luôn** hiện ô tìm (chỉ tắt khi `cfg.search === false`, dùng cho danh sách 5 lý do huỷ đơn) — đã đo: ô phường mobile có ô Tìm kiếm, gõ "sai gon" ra đúng "Phường Sài Gòn".
- **Sửa (`desktop.html`)**: `openDD(btn, opts, current, cb, cfg)` thêm tham số `cfg`; `cfg.search === true` ÉP hiện ô tìm, mặc định giữ luật "> 8". Hai chỗ chọn phường truyền `{ search: true }`: checkout (`wireAddressPickers`, ô `[data-pick="ward"]` — gồm cả form thêm địa chỉ của sổ địa chỉ checkout vì cùng ô) và sổ địa chỉ Tài khoản (`accOpenPick(btn, …, { search: true })`, ô `[data-apick="award"]`; `accOpenPick` thêm tham số `cfg` chuyển thẳng xuống). Mobile: chỉ truyền cùng tham số cho hai file khai giống nhau (không đổi hành vi). **Các danh sách ngắn khác KHÔNG đổi**: thành phố có cửa hàng (3 mục) vẫn không có ô tìm; giới tính vẫn không có.
- **Đã đo (desktop 1440)**: ô phường HCM 7 mục / Hải Phòng 4 mục đều có ô "Tìm kiếm" (cùng khuôn ô của tỉnh: nhãn 40 cao, kẻ dưới, biểu tượng kính lúp), tự trỏ con trỏ vào ô, gõ không dấu "ben thanh" → "Phường Bến Thành", gõ "zzz" → "Không tìm thấy kết quả", chọn xong đóng và điền nhãn; cùng kết quả ở form địa chỉ Tài khoản.

## Trang Thanh toán (3): câu đồng ý điều khoản dưới nút Đặt hàng · "(đã bao gồm VAT)" cạnh Tổng cộng · tên + dòng dự kiến của 2 phương thức giao hàng (02/10/2026, CẢ 2 BẢN)

User gửi 4 việc, 2 việc kèm link Figma (`1106:64482`, `726:49489` — id của khung vừa sync / khung cũ đã thay nên không mở lại được; mình hiểu theo chữ: nút Đặt hàng ở bước Thanh toán, và khối Tóm tắt đơn hàng).
- **1. Câu đồng ý dưới nút "Đặt hàng"** (bước Thanh toán, mobile + desktop): *"Bằng cách bấm vào nút ĐẶT HÀNG, bạn đã đồng ý với Điều khoản sử dụng và Chính sách bảo mật của chúng tôi."* — thẻ `<p class="ck-terms t-multiline text-muted-foreground pt-3">` NGAY DƯỚI nút (khe 12), 12/18 · #727272, canh trái thẳng mép nút. **Hai cụm "Điều khoản sử dụng" / "Chính sách bảo mật" là LIÊN KẾT** gạch chân mực chính (`data-nav="terms"` / `"privacy"` → mở trang Điều khoản / Chính sách bảo mật thật; bấm Back quay lại ĐÚNG bước 4, đã thử) — cùng khuôn dòng đồng ý ở màn Hoàn tất; user chỉ đưa chữ, phần liên kết là mình thêm theo khuôn có sẵn, gỡ gạch chân nếu thiết kế để chữ trơn. **"ĐẶT HÀNG" hoa đúng như user gõ** (nhắc lại nhãn nút, nút hiện hoa): chữ gõ trong mã vẫn là "Đặt hàng" (cũng là khoá i18n của nút), hoa nhờ class có tên `.ck-terms-cta { text-transform: uppercase }` — đúng cách §"luôn viết hoa bằng text-transform, không gõ hoa vào chuỗi". `.ck-terms { text-wrap: pretty }` để dòng cuối khỏi mồ côi một chữ. Đo: mobile 343 × 3 dòng (hộp 66 gồm khe 12), dòng cuối "chúng tôi."; desktop 1 dòng (hộp 30). **EN** tách thành 7 mảnh chữ khớp khoảng trắng bản Việt (applyLang dịch từng nút chữ, giữ khoảng trắng của nó): *"By clicking CHECKOUT, you agree to the Terms of Use and Privacy policy of DAFC."* — không có chữ "button" vì sau nhãn nút bản Việt là dấu phẩy liền, thêm chữ đó cần một dấu cách bản Việt không có; "CHECKOUT" vì khoá `'Đặt hàng':'Checkout'` có sẵn.
- **2. "(đã bao gồm VAT)"** ở hàng **Tổng cộng** của tóm tắt checkout (desktop: thẻ Tóm tắt đơn hàng cột phải; mobile: khối tiền dưới nút Đặt hàng): nhãn thành cụm `.ck-total-l` = [Tổng cộng 14/20 · 500] + [(đã bao gồm VAT) 12/16 · 400 · #727272], khe 4, thẳng baseline (ghi chú lệch +3 so với đỉnh nhãn) — đúng khuôn "(Bao gồm VAT)" cạnh "Tổng thanh toán" ở Chi tiết đơn. Hàng giữ nguyên chiều cao (mobile 56, desktop 448×56). Khổ hẹp quá thì cả ghi chú rớt xuống dưới nhãn (flex-wrap + nowrap), không gãy giữa chữ. Móc weight: hook skin-mt `.ck-total > span { 500 }` chỉ trúng con TRỰC TIẾP nên thêm `.ck-total-l > span:first-child { 500 }` (nhãn có `font-medium` là class chết, bị quét về 400). EN `'(đã bao gồm VAT)':'(incl. VAT)'` — **cố ý khác chữ** `'(Bao gồm VAT)':'(VAT included)'` của Chi tiết đơn: hai khoá cùng giá trị EN thì bảng dịch ngược `I18N_REV` (khoá cuối thắng) trả cả hai về MỘT chuỗi Việt (đã đo: đổi EN→VI làm ghi chú checkout thành "(Bao gồm VAT)").
- **3. Phương thức giao hàng — tên + dòng dự kiến**: `ETA` chung (*"Thời gian nhận hàng dự kiến từ ngày 14/07 đến ngày 18/07"*) thay bằng **hai cặp riêng**: **Giao hàng tiêu chuẩn** — *Dự kiến giao hàng từ 14/07 - 18/07* · **Giao hàng hỏa tốc** — *Dự kiến giao hàng trước 18:00 ngày 14/07* (hằng `SHIP_NAME_STD/FAST` + `SHIP_ETA_STD/FAST`, khai giống 2 file). **Mình đọc ĐỔI CẢ TÊN** (code cũ: "Giao hàng thông thường" / "Giao hàng nhanh") vì user viết cả dòng tên lẫn dòng phụ. Tên đi vào 4 chỗ nên đổi cả 4: thẻ chọn · tóm tắt bước đã xong (`#shipDoneLabel` + `#shipDoneEta` MỚI — dòng dự kiến nay ĐỔI THEO lựa chọn, handler ghi lại cùng tên và phí, có `localizeNew` nên EN không rớt về tiếng Việt) · bản ghi đơn (`placeOrder`) · 12 đơn mẫu trong `ORDERS` (10 + 2; viết chữ thẳng vì `ORDERS` khai TRƯỚC các hằng — TDZ). Đã chạy thử: đặt đơn hỏa tốc → Chi tiết đơn ghi "Giao hàng hỏa tốc". **Dấu xuống dòng trước "14/07" trong tin của user mình KHÔNG làm cứng** (chữ vừa MỘT dòng ở cả thẻ mobile 343 lẫn thẻ desktop 390, nên hai thẻ thấp đi: mobile 84 → **64**, desktop 86 → **68** — câu ETA cũ dài hơn phải xuống 2 dòng; số cũ lấy từ khung Figma đã sync) — nếu thiết kế ngắt cứng thì thêm một `<br>`. Ngày là DỮ LIỆU DEMO cố định, không tính theo hôm nay. i18n: "Giao hàng tiêu chuẩn" dùng khoá có sẵn của trang Chính sách vận chuyển (EN "Standard Delivery"), khoá mới "Giao hàng hỏa tốc" ("Express Delivery"), hai dòng dự kiến mới ("Estimated delivery from 14/07 - 18/07" / "…before 18:00 on 14/07"); gỡ 2 khoá tên cũ + khoá ETA cũ vì hết chỗ dùng.
- **Figma ĐÃ sync (lượt 11, cùng ngày)**: dựng lại 8 khung Checkout (desktop cả 5 + mobile bước 2·3·4; mobile bước 1 không đổi) và vá tên phương thức ở 22 khung Chi tiết đơn — bảng id ở `_notes/FIGMA-SYNC-CHECKOUT-LUOT-11-2026-10-02.md`. Khung dropdown phường không có trong Figma nên không có gì để sync.
- **Màn Hoàn tất — ngày dự kiến (lệnh user cùng ngày: "sửa luôn ngày dự kiến ở màn hoàn tất")**: dòng **"Dự kiến giao"** trước cứng "12 – 16/08" (lệch hẳn 14/07 – 18/07 của checkout) nay theo ĐÚNG phương thức của đơn vừa đặt: tiêu chuẩn → **"14/07 - 18/07"**, hỏa tốc → **"Trước 18:00 ngày 14/07"** (hằng `SHIP_DONE_STD` / `SHIP_DONE_FAST`, đặt ngay dưới `SHIP_ETA_*`, khai giống 2 file). Luồng **nhận tại cửa hàng**: "Sẵn sàng nhận" "Từ 12/08" → **"Từ 14/07"** (`PICKUP_READY`, mốc đầu của khoảng giao — mình tự chọn để cùng dòng thời gian, đổi một hằng nếu muốn ngày khác). **Phương thức đọc từ ĐƠN** (`ORDERS.find(ckOrderIds[0])` → `method`), không đọc cờ `ckShipFast` vì cờ đó không được reset khi "Tiếp tục mua sắm" (đã thử: đặt hoả tốc → reset cờ → màn Hoàn tất vẫn ra hỏa tốc). **Sửa kèm một lỗi liền kề**: dòng **"Vận chuyển"** cứng "Miễn phí" nên đơn hỏa tốc (25,000đ, Tổng cộng đã cộng phí) vẫn ghi miễn phí — nay đọc `o0.ship` (`vndCom(vndNum(…))`; đơn miễn phí giữ "Miễn phí"). Chưa đặt gì mà vào thẳng màn này (demo) thì rơi về cờ + "Miễn phí" như cũ. i18n: khoá `'Từ 12/08'` đổi thành `'Từ 14/07':'From 14/07'`, thêm `'Trước 18:00 ngày 14/07':'Before 18:00 on 14/07'`; khoảng "14/07 - 18/07" chỉ có số nên không cần khoá. Đã chạy thử cả 2 file × {vào thẳng · đơn tiêu chuẩn (tách -01/-02) · đơn hỏa tốc · nhận tại cửa hàng} × {VI · EN · EN→VI}; console sạch. **Figma ĐÃ vá** 2 chữ ở khung `Order success / mobile 375` `726:48765` (node `726:48791`) và `Order success / desktop 1440` `726:49533` (node `726:49567`): "12 – 16/08" → "14/07 - 18/07", mép phải chữ giữ nguyên (326 / 959), khung cao không đổi.

## PDP — popup Trả góp (`#instSheet`): hai tiêu đề mục thành BĂNG XÁM · khối "Phí không được hoàn lại" nền VÀNG NHẠT (02/10/2026, CẢ 2 BẢN)

Lệnh user: *"trong PDP cái trả góp: 1. Pop-up Installment bold lên chỗ Chọn kỳ hạn và Ngân hàng áp dụng vì là thông tin quan trọng (chữ đen, nền xám) như cái Tóm tắt đơn hàng · 2. Block Phí không được hoàn lại nền màu vàng nhạt"*. Popup mở từ nút "Xem chi tiết" dưới CTA PDP — desktop là ngăn kéo phải 480, mobile là bottom sheet; cùng một hàm `instSheetHTML` ở 2 file.
- **Hai tiêu đề mục** ("Chọn kỳ hạn", "Ngân hàng áp dụng"): trước là nhãn xám nhỏ (12/18 · #727272, không nền). Nay là BĂNG TIÊU ĐỀ **dùng đúng khuôn của "Tóm tắt đơn hàng"**: `<div class="dk-sum-head"><p class="t-block-title dk-summary-title text-foreground">…</p></div>` qua helper `head()` trong `instSheetHTML` — nền xám `--general-secondary` `#f5f5f5`, đệm 16, chữ Libre Bodoni 16/24 · 400 · mực #0a0a0a, tracking 0,5 (đo: giống từng số với băng "Tóm tắt đơn hàng" ở giỏ — 56 cao; ở popup rộng 446 desktop / 341 mobile, bằng bề rộng nội dung mục chứ không tràn mép). Dùng chung class nên băng giỏ đổi thì băng popup đi theo. **"Bold lên" mình hiểu là nổi bật bằng băng + mặt chữ serif như "Tóm tắt đơn hàng", KHÔNG nâng độ đậm** (luật §1.1 cấm 500 chữ thường ngoài danh sách đóng; băng tham chiếu cũng là Libre 400). Chữ tiêu đề đo 18,2:1 trên băng. i18n không đổi (khoá `'Chọn kỳ hạn'` / `'Ngân hàng áp dụng'`).
- **Khối "Phí không được hoàn lại"**: nền từ `--general-secondary` (xám) sang **`--general-warning-subtle` `#fffbeb`** (amber 50 — token đã có ở `tokens.css`, cùng nền nhãn "Chờ thanh toán" ở đơn hàng) qua class mới `.ins-fee` (CSS ngay cạnh các rule `#instSheet`). Chữ giữ `text-muted-foreground` #727272 → 4,64:1 trên nền vàng (đạt AA 4,5); link "Xem điều khoản trả góp đầy đủ" giữ mực chính gạch chân. **Nền chỉ cách nền ngăn kéo trắng 1,04:1** — đúng chữ "vàng nhạt" nhưng rất nhạt; muốn rõ hơn thì nâng lên `--general-warning-border` `#fef3c7` hoặc thêm viền cùng sắc (1 dòng).
- **Đã chạy thử**: desktop 1440 (ngăn kéo 480) và mobile 375 (bottom sheet): băng `rgb(245,245,245)` · Libre 16/24 · 56 cao; khối phí `rgb(255,251,235)`; không tràn ngang; EN ra "Select a plan" / "Participating banks"; console sạch. Figma: chưa có khung nào vẽ popup Trả góp (quét chữ "Chọn kỳ hạn" / "Ngân hàng áp dụng" ra 0) nên không có gì lệch.

## Trang Thanh toán (2): nhắc đăng nhập xếp NGANG · nhãn phương thức thanh toán 14/20 · CTKM demo dưới Thẻ tín dụng (02/10/2026)

User gửi Figma `726:48878` (khối nhắc đăng nhập của khung `Checkout / desktop · step 1 guest`) và bảo *"trong check out, cho nội dung khi bạn chưa đăng nhập sẽ xếp ngang như link, và ở thanh toán: tăng size text của các phương thức thanh toán; demo thêm CTKM dưới chỗ Thẻ tín dụng 'Giảm 5% tối đa 2.000.000 với VISA Techcombank*'"*.
- **Nhắc đăng nhập — CHỈ `desktop.html`** (đây là câu hỏi cũ treo từ 25/09: "thiết kế là một hàng ngang cao 46, code là 3 dòng dọc cao 98"). Từ 3 dòng thành MỘT HÀNG đúng khung: `[Bạn đang thanh toán không đăng nhập.]` `[Đăng nhập và hoàn tất đơn hàng để nhận ngay N điểm thưởng]` `……… [Đăng nhập]`. Khung bọc `flex items-start gap-2` (trước `flex-col`); câu đầu `shrink-0`, câu giữa `flex-1 min-w-0` (nên "Đăng nhập" bị đẩy về mép phải), link `shrink-0` — mọi chữ 12/18 Regular, link gạch chân, số điểm vẫn 500 (`.ck-pts`). **Câu đầu có DẤU CHẤM** như khung (nay đứng liền câu sau) ⇒ khoá i18n đổi thành `'Bạn đang thanh toán không đăng nhập.'` / `'You are checking out as a guest.'` (khoá cũ không dấu chấm gỡ ở desktop, mobile còn dùng). Hai `font-medium` cũ (class chết dưới skin-mt) gỡ cho các bộ da khác cũng ra Regular như khung. **Đo ở 1440: hộp 872×46, chữ ở x 16 / 265 / 790 (tính từ mép hộp), cách mép phải 16 — TRÙNG khung.** Ở 1100 câu giữa xuống 2 dòng (hộp 64), không tràn ngang. **Mobile KHÔNG đổi** (vẫn 3 dòng dọc 343×104): khổ 375 không xếp được một hàng.
- **Nhãn phương thức thanh toán — CẢ 2 FILE**: 12/18 → **14/20**, weight GIỮ 400. Lý do giữ 400: luật §1.1 "nội dung thì lên một bậc cỡ, không nâng độ đậm" và user chỉ nói "size" — nên NHẸ HƠN một chút so với tên phương thức vận chuyển ngay bước trên (14/20 · 500, ngoại lệ theo khung Figma của user); muốn đồng bộ độ đậm thì thêm `font-weight: 500` vào rule (và ghi danh ngoại lệ §1.1). Rule: `[data-screen="checkout"] #payOpts .opt > span > span.font-medium { font-size: 14px; line-height: 20px }` + cột chữ `#payOpts .opt > span.flex-1` flex-col khe **2**. Dòng phụ (CTKM; lý do khoá COD — ĐÃ BỎ cuối ngày 02/10, COD nay ẩn hẳn khi không dùng được) giữ 12/16.
- **CTKM demo — CẢ 2 FILE**: `pays` có phần tử thứ 6 = dòng khuyến mãi; chỉ thẻ `cc` có **"Giảm 5% tối đa 2.000.000 với VISA Techcombank*"** (gõ ĐÚNG như user — không thêm "đ"; dấu `*` là chữ của câu quảng cáo, không phải dấu ô bắt buộc). `richRadio` thêm tham số thứ 8 `promo` → `<span class="t-single block text-foreground">` (12/16 · #0a0a0a), tách khỏi `sub` (12/18, câu giao hàng); `single` tính cả `promo` nên radio canh mép trên, logo Visa/Mastercard vẫn căn giữa dọc. EN: "5% off, up to 2,000,000 with VISA Techcombank*".
- **Đo**: desktop 1440 — cả 5 thẻ cao ĐÚNG 64 (nhãn 20 + khe 2 + dòng phụ 16 + đệm 24 + viền 2; khe 4 thì cao 66 nên chọn 2 để giữ khung Figma "4 thẻ cao bằng nhau 64"), nhãn 14/20/400, CTKM 12/16, radio / logo thẳng tâm. Mobile 375 — nhãn 14/20; thẻ Thẻ tín dụng cao **80** (CTKM xuống 2 dòng vì logo 76 chiếm chỗ bên phải), thẻ "trả góp 0%" cao **66** (nhãn xuống 2 dòng 14/20), còn lại 64. Console sạch, EN / VI qua lại ổn.
- **Figma**: khung guest step 1 desktop `726:48861` đã đúng thiết kế (user vẽ); khung `Checkout / desktop · step 4 payment` `726:49399` và mobile `726:48626` còn nhãn 12 Regular, không có CTKM — LỆCH cho tới khi sync.

## Menu desktop: tab "Sản phẩm mới" ở subheader — tiêu đề cột ngành đổi thành "What’s new" (02/10/2026, CHỈ `desktop.html`)

User gửi ảnh panel (cột trái "BỘ SƯU TẬP MỚI" + 3 link, cột giữa "WHAT'S NEW" + 6 danh mục, 2 ảnh dọc) và bảo *"trong menu, ở tab sản phẩm mới ở subheader, đổi cái title theo gender thành WHAT'S NEW cho 3 gender"*.
- **Trước**: tiêu đề cột giữa là CHÍNH TÊN NGÀNH — "Nam" hoặc "Nữ" (`dkMegaCol(dept, …)` trong nhánh `item.newIn` của `dkMegaPanel`), hiện ra "NAM" / "NỮ" nhờ class `uppercase`.
- **Nay**: `dkMegaCol('What’s new', …)` — chuỗi **tiếng Anh giữ nguyên ở cả 2 ngôn ngữ** (không có khoá i18n; bật EN / VI qua lại vẫn "What’s new"), dấu nháy kiểu in ’ như ảnh. Chữ HOA vẫn do class `uppercase` của `dkMegaCol` (đúng luật "không gõ hoa vào chuỗi") → hiện "WHAT’S NEW", cùng kiểu với "BỘ SƯU TẬP MỚI" (12/18 · 500 · tracking .5 · #0a0a0a). **Đường dẫn các mục KHÔNG đổi**: `dept` vẫn đi vào crumbs (`Nam|Sản phẩm mới` / `Nữ|Sản phẩm mới`) nên "Quần áo", "Giày dép"… vẫn ra PLP đúng giới.
- **"3 gender"**: hàng ngành có 3 mục (Nữ · Nam · Làm đẹp) nhưng **Làm đẹp KHÔNG có panel "Sản phẩm mới"** (`['Sản phẩm mới', null]` = link phẳng sang PLP — đã đo: không có `[data-mega]` nào mang "Bộ sưu tập mới" ở ngành này) ⇒ thực tế đổi ở Nam và Nữ, ngành thứ 3 không có tiêu đề để đổi. Muốn Làm đẹp cũng có panel này thì là việc thiết kế mới.
- **Đã đo (1440)**: Nữ và Nam đều ra [`Bộ sưu tập mới`, `What’s new`]; hover "Sản phẩm mới" thấy đúng bố cục như ảnh. **Mobile KHÔNG đổi** (menu mobile không có subheader; tầng 2 của Sản phẩm mới là "Bộ sưu tập mới" / "Danh mục"). Figma: các khung menu desktop mở panel Sản phẩm mới còn "NAM" / "NỮ" ở cột giữa — LỆCH cho tới khi sync.

## Trang Thanh toán: tiêu đề "Đặt hàng" + giỏ hàng cột phải MỞ SẴN, trần = chiều cao cột trái (02/10/2026)

Lệnh user (trang checkout): *"đổi tên 'thanh toán' thành 'Đặt Hàng', bỏ số đếm sản phẩm ra luôn"* + *"cái giỏ hàng bên tay phải mặc định mở ra, chiều dài giới hạn bắt theo chiều dài của bên block bên trái"*.
- **Tiêu đề (CẢ 2 FILE)**: `Thanh toán (${cartSelected().length})` → **`Đặt hàng`**, hết `(N)` — desktop `desktop.html` (`p.t-display-title`), mobile `index.html` (`p.ck-h1.t-display-title`, 24/32 Libre Bodoni · 400 như cũ). **Mình viết "Đặt hàng" (chữ H thường) chứ không "Đặt Hàng"**: mọi tiêu đề trong app viết kiểu câu ("Giỏ hàng", "Tóm tắt đơn hàng", "Chương trình khuyến mãi") và khoá i18n có sẵn `'Đặt hàng':'Checkout'` — EN ra "Checkout". Muốn "Đặt Hàng" thì đổi đúng 2 chuỗi + 1 khoá i18n. **KHÔNG đổi**: tên BƯỚC cuối "Thanh toán" (chọn phương thức; EN "Payment"), nhãn "Giỏ hàng (N)" trong thẻ giỏ cột phải (user chỉ nhắc số đếm ở tiêu đề — bỏ nốt thì đổi 1 chuỗi), thanh "Giỏ hàng" đáy mobile (vốn không có số). Gỡ cặp luật i18n chết `Thanh toán (N)` ↔ `Payment (N)` ở cả 2 file.
- **Giỏ hàng cột phải (CHỈ `desktop.html`, mobile dùng thanh + sheet riêng)**: (1) `#ckSumAcc` thêm `open` → mở sẵn, bấm hàng trigger vẫn đóng / mở như mọi accordion (kiểm: đóng → thẻ còn 56, mở lại → trần cũ); (2) thay trần `max-height: 50vh` (25/09) bằng trần THEO CỘT TRÁI, không JS: hàng 2 cột thêm móc `.ck-cols` → `align-items: stretch`; cột phải `.dk-sticky-side` thêm `contain: size` (nội dung cột phải thôi góp vào chiều cao hàng — thiếu nó giỏ dài sẽ kéo cả hàng cao theo); thẻ giỏ móc `.ck-bag` + `#ckSumAcc` + `.acc-body` đều `min-height: 0` (flex-col) để thẻ co lại; `.acc-inner` `overflow-y: auto` cuộn bên trong; hàng trigger `flex-shrink: 0` (đã dính: không có nó trigger cao 56 bị co còn 20–46). Thẻ Tóm tắt không đổi (min-height auto).
- **Đo ở 1440 (giỏ 5 món)**: cột phải = cột trái ở MỌI bước — giao hàng guest 924 · đã đăng nhập 612 · bước 2 836 · VAT 814 · thanh toán 1188 · nhận tại cửa hàng 459 / 623 / 875; đáy thẻ giỏ trùng đáy cột trái (lệch 0); trigger 56; khe 16; danh sách cuộn trong thẻ (cao 1079 so với phần hiển thị 157…886). Giỏ 1 món: thẻ giỏ cao đúng nội dung (370), KHÔNG giãn cho bằng cột trái, không cuộn. Ở 1100: lệch 0, không cuộn ngang. EN "Checkout" / "Cart (5)". Console sạch; mobile 375 tiêu đề "Đặt hàng" 24/32.
- **Figma LỆCH (chưa sync, user chưa bảo)**: 10 khung `Checkout / mobile|desktop · step …` còn tiêu đề "Thanh toán (5)"; 5 khung desktop còn thẻ giỏ đóng và cột phải ôm nội dung.

## Hộp "Chương trình khuyến mãi": băng tiêu đề lên `pampas/150` (02/10/2026, CẢ 2 BẢN + FIGMA)

User vừa thêm bậc **150** (`#eae4da`) vào Primitives của Figma rồi bảo *"áp cho component ưu đãi khuyến mãi với màu nền là 50 và nhấn màu ngay title là 150"*.
- **Mình hiểu**: component = hộp khuyến mãi KEM có băng tiêu đề (ở giỏ: "Chương trình khuyến mãi (N)"). Thân giữ 50 (`copper-surface` `#f5f2ed` — vốn đã đúng), BĂNG tiêu đề đổi 100 → **150**. Căn cứ: khung giỏ "Cart / desktop · 0 ticked — button locked" (804:137279) user tự chấm đúng như vậy (hộp 50, băng bind `pampas/150`). Hộp ở PDP (`.promo-flat`, XÁM `#fafafa`, không tiêu đề từ 29/09) KHÔNG đổi.
- **Code (cả 2 file)**: token mới `--cu-surface-band: #eae4da` (= pampas/150) trong khối thang `--cu-*` (`html.skin-mt.skin-li, html.skin-mt.theme-cu`); rule `html.skin-mt.skin-li .promo-head { background: var(--cu-surface-band) }` (trước: `--cu-surface-press`). **`--cu-surface-press` (pampas/100) KHÔNG đổi** — còn nuôi `--unofficial-secondary-active` (nhấn xuống `.btn-s`) và `.dk-sum-head` của theme-cu. Bốn chú thích cũ nói "đậm hơn ĐÚNG MỘT BẬC" sửa theo.
- **Đo (giỏ, 375 và 1440)**: băng `rgb(234,228,218)` cao 56 (khớp Figma), thân `rgb(245,242,237)`, mực `#0a0a0a`. Tương phản: băng/nền trắng **1,26** (bậc 100 cũ 1,18) · băng/thân **1,13** (cũ 1,06 — băng gần như chìm vào thân, đó là lý do hợp lý của việc lên 150) · mực đen trên băng **15,66** (cũ 16,80). PDP desktop `.promo-flat` vẫn `#fafafa`, không băng. Console sạch.
- **Figma (Test agent)**: bind băng vào biến `pampas/150` (`VariableID:1091:60656`) ở `side-panel` `kind=promo` desktop (640:76628) + mobile (640:76679) → 3 instance tự theo; quét thêm **27 khung giỏ** còn bản thô (băng `#f0ece4` không bind) → bind 150; và băng trong `pdp-column` `side=info` (641:98699 — hộp kem cũ, chưa theo luật PDP xám) → 2 instance PDP theo. **KHÔNG đụng**: `kind=promo-pdp` (xám) và 5 hộp màu của user trong khung "Cart / desktop · partly ticked (2/5)" (804:136729: `#f0ece4`@pampas/100, `#f5f2ed`, `#f9f6f2`, `#fcfaf7`) + khung 804:137279 (user đã chấm 150). Bind THẲNG primitive, không tạo token ngữ nghĩa (user chỉ tạo bậc 150) — muốn có `copper-band` thì tạo alias ở collection Color.

## Giỏ hàng: bỏ dòng xám ở "Chọn quà tặng" + chỉnh khối điểm thưởng ở "Tóm tắt đơn hàng" (02/10/2026, CẢ 2 BẢN)

Lệnh user (trang cart, không nói khổ nào → làm CẢ 2 file, cùng một khối code): **1.** *"Chọn quà: bỏ những dòng chữ màu xám đi, vì không nhiều scheme quà cùng lúc như demo"* · **2.** Tóm tắt đơn hàng: bỏ dòng xám "Ưu đãi 4% trên sản phẩm nguyên giá"; ở "Sử dụng điểm thưởng" dời dòng "1240 điểm khả dụng" xuống DƯỚI khối nhập điểm và đổi chữ thành "1240 điểm khả dụng (1 điểm = 1000đ)"; dòng "Dùng 1240 điểm" đổi thành "Điểm thưởng".
- **Chọn quà tặng (`#giftSheet`)**: bỏ `#gfProg` (dòng xám dưới tiêu đề: "Chọn quà tặng cho đơn hàng" khi nhiều chương trình, tên chương trình khi một — kể cả dòng gán chữ trong `openGF`) và tiêu đề xám của từng nhóm trong `giftOptionsHTML()` (tham số `tieuDe` gỡ luôn; chữ ký còn `giftOptionsHTML(pk)`); `#gfList` thêm `pt-2` để ô đầu không dính hàng tiêu đề (đo: khe 8). **Mình hiểu "dòng xám" = dòng NÓI TÊN CHƯƠNG TRÌNH** (lý do user nêu là "không nhiều scheme cùng lúc"); dòng xám phân loại dưới TÊN quà ("5 ml", "Onesize") là thông tin sản phẩm nên GIỮ — user muốn bỏ nốt thì xoá 1 dòng `<span class="t-single block text-muted-foreground">${g.variant}</span>` trong `giftOptionsHTML`. Khi sheet vẫn mở cho nhiều chương trình (chỉ có ở demo) hai nhóm chỉ còn cách nhau 16, không tiêu đề.
- **Tóm tắt — `dafcRewards()`**: `opt()` nhận dòng phụ TUỲ CHỌN (rỗng thì không in span). "Giảm giá thành viên" không còn dòng phụ (khoá i18n `'Ưu đãi 4% trên sản phẩm nguyên giá'` gỡ). "Sử dụng điểm thưởng ( tối đa 10% )" cũng không còn dòng phụ dưới tên; dòng điểm nằm trong `pointsExtra` (`#pointsInputWrap`), `<p class="t-single pt-2 text-muted-foreground">` NGAY DƯỚI hàng [ô nhập + nút Áp dụng], thẳng lề trái với ô nhập, nên nó chỉ hiện khi đang chọn dùng điểm (chọn "Giảm giá thành viên" thì cả khối ẩn). Đo: thẻ "Giảm giá thành viên" cao 38 (một dòng), thẻ điểm 122, chữ 12/16 · #727272.
- **Chữ mới `pointsSubText()`**: "{N} điểm khả dụng (1 điểm = 1.000đ)" — bỏ vế "cho order này" và số tiền quy đổi (`#pointsMoneyVal` HẾT; mọi chỗ JS từng cập nhật nó đã gỡ). Mình ĐỊNH DẠNG số theo app (1.240 · 1.000đ, dấu chấm) chứ không gõ nguyên "1240 / 1000đ" như lời user. **N vẫn là TRẦN dùng được cho đơn này** (`maxUsablePoints()` = min(số dư 1.240, 10% tạm tính / 1.000)) — demo hiện 1.240 trùng ví dụ của user. `#pointsUsedVal` vẫn do `refreshCartSummary` cập nhật khi giỏ đổi. **Sửa kèm một lệch cũ ở MOBILE:** handler Áp dụng ghi số ĐÃ DÙNG vào `#pointsUsedVal` (áp 500 điểm thì dòng "khả dụng" đọc 500) — nay ghi TRẦN như desktop; dòng giữ "1.240 điểm khả dụng …" sau khi áp 500.
- **Nhãn dòng tóm tắt (`discountLinesHTML()`)**: "Dùng N điểm" → **"Điểm thưởng"** (đơn dùng "Giảm giá thành viên" vẫn nhãn đó). EN đi khoá có sẵn `'Điểm thưởng':'Rewards'` ⇒ "Rewards" (trước: "Use N points"). **Chi tiết đơn (`screenORDER`, hàng "Dùng N điểm") KHÔNG đổi** — user chỉ nói trang cart; muốn đồng bộ nhãn thì đổi nốt hàng đó.
- **i18n (cả 2 file):** gỡ `'Ưu đãi 4% trên sản phẩm nguyên giá'` và `'khả dụng cho order này'` (hết chỗ dùng); thêm `'khả dụng (1 điểm = 1.000đ)':'available (1 point = 1,000đ)'` (vế sau của dòng là text node riêng; vế đầu "N điểm" đi luật số điểm có sẵn ⇒ EN "1.240 points available (1 point = 1,000đ)").
- **HOVER cho thẻ lựa chọn ở giỏ (cùng ngày, lệnh user: *"bổ sung hover cho nó tương tự cái hover của chọn phương thức thanh toán"*, CHỈ DESKTOP):** đo trước — thẻ phương thức thanh toán là `<button class="opt btn-o">` nên hover của nó là luật `.btn-o:hover` ở khối nút: viền `#d3d3d3` → `--unofficial-border-5` (`#666666`), nền trong suốt, thẻ ĐANG CHỌN đứng im (`.opt.on` đặc hiệu hơn). Hai nhóm thẻ radio cùng họ `.opt` nhưng không mang `.btn-o` nên không có hover: (1) thẻ ưu đãi DAFC Rewards trong Tóm tắt đơn hàng (viền ở `div[data-reward-card]` bọc ngoài; nút bên trong có `.btn-o` nhưng viền 0 nên đổi màu viền nút không thấy gì — đo: rê vào "Giảm giá thành viên" thẻ vẫn `#d3d3d3`), (2) thẻ chọn quà trong ngăn kéo `#giftSheet` (không có `.btn-o`). **Đã thêm vào `desktop.html`** (cạnh khối `.dk-reward-name`): `[data-screen="cart"] #rewardOpts .opt:not(.on):hover, #giftSheet .opt:not(.on):hover { border-color: var(--unofficial-border-5); }`. **KHÔNG chép dòng "nền trong suốt"** của hover thanh toán: thẻ ưu đãi nằm trên dải xám của cột tóm tắt nên bỏ nền là lộ xám (thẻ đổi sắc chứ không đổi viền); trên nền trắng của trang thanh toán dòng đó vô hình. Chuyển động viền 0,2s có sẵn ở `.opt`. Đo sau khi thêm (rê thật bằng chuột): thẻ chưa chọn `#d3d3d3` → `rgb(102,102,102)` — đúng màu hover thanh toán; thẻ đang chọn giữ `rgb(10,10,10)`; nền thẻ vẫn trắng. **Mobile KHÔNG thêm** — `index.html` không có hover của `.btn-o` (thẻ thanh toán ở mobile cũng không có), hover là thuộc tính của khổ có chuột.
- **Đã chạy thử** ở 375 (index.html) và 1440 (desktop.html), VI + EN: áp 500 điểm → hàng "Điểm thưởng −500,000đ", dòng khả dụng giữ 1.240; chọn "Giảm giá thành viên" → hàng "Giảm giá thành viên −7,442,280đ" và khối điểm ẩn; sheet quà không còn dòng xám tên chương trình; console sạch. Figma: khung giỏ (tóm tắt + sheet chọn quà) LỆCH cho tới khi sync lại.

## Form địa chỉ ở Tài khoản (desktop): 2 CỘT theo hình brief "Add address" (02/10/2026, CHỈ DESKTOP)

User gửi hình brief của khách ("Nếu khách click Add address thì thông tin": First Name | Last Name · Mobile phone | Email · City (drop down) | Ward (drop down) · Address cả hàng) và bảo *"ở bản desktop, cái địa chỉ phải chia từng ô 2 bên như hình minh hoạ"*. **Đã đo trước:** form địa chỉ ở **CHECKOUT desktop** (`addrForm`, cả khách vãng lai lẫn "Thêm địa chỉ mới" / "Thay đổi") VỐN ĐÃ đúng hình — Tên | Họ, SĐT | Email, Tỉnh | Phường (mỗi ô 398), Địa chỉ cả hàng 812 — nên GIỮ NGUYÊN (hai tiêu đề khối "Thông tin liên hệ" / "Thông tin giao hàng" là của brief tr.29, không đụng). Chỗ LỆCH là form **Thêm / Sửa địa chỉ ở Tài khoản** (`accAddressForm`): chỉ Tên | Họ cạnh nhau, còn lại xếp dọc 1 cột và THIẾU ô Email. **Đã sửa `desktop.html`:** một lưới `.acc-grid2` 6 ô = Tên | Họ · Số điện thoại | **Email (MỚI)** · Tỉnh / thành phố | Phường / xã, rồi ô Số nhà, tên đường cả hàng. Đo ở 1440 trong cột 1040: mỗi ô 504 (x 352 và 872), hàng cách 64, ô địa chỉ 1025; lỗi từng ô nằm dưới đúng cột; dropdown Tỉnh / Phường xổ đúng 504 neo dưới ô.
**Ô Email (mình tự quyết, báo user):** hình brief có Email, form cũ thiếu ⇒ thêm `aemail` — BẮT BUỘC và cùng câu lỗi "Email chưa đúng" như ô Email ở bước giao hàng (`validateShipping`); `accField` tự gắn `data-rule="email"` cho khoá `aemail` nên rời ô là kiểm ngay (FIELD_RULE). `ADDRESSES` desktop thêm trường `email` (5 địa chỉ `userone@email.com`, địa chỉ Trần Thị B `tranthib@email.com`) để Sửa địa chỉ có sẵn không bị chặn vì email trống; bản ghi lưu `email`. Email của địa chỉ CHƯA được dùng ở chỗ khác (checkout vẫn để người mua tự gõ email nhận xác nhận; thẻ địa chỉ không in email). **Mobile KHÔNG đổi** — vẫn xếp dọc một cột và chưa có ô Email trong form Tài khoản (khổ 375 không chia 2 cột; user chỉ nói desktop). Figma: khung form địa chỉ Tài khoản desktop (nếu có) LỆCH cho tới khi sync lại.

## PLP desktop: dòng đếm "N sản phẩm" tách SỐ và CHỮ (02/10/2026, CHỈ DESKTOP)

User tự sửa component `page-head` (biến thể `platform=desktop`, node `445:31169`, trang components của Figma Test agent) — dòng đếm thành khung ngang khe 4: số "40" Inter 14/20 Medium #0a0a0a (`t-label-lead`) + chữ "sản phẩm" Inter 14/20 Regular #727272 (`t-body-lead`) — rồi bảo *"trong trang listing … tăng font của số lượng sp lên 14, đen và đậm ở số lượng, nhạt và mỏng hơn ở text số lượng"*. **Đã áp vào `desktop.html`**: markup `<p data-plp-count class="plp-count t-lead"><span data-plp-n class="plp-count-n">N</span> <span>sản phẩm</span></p>` (trước là MỘT chuỗi `.t-multiline` 12/18 · 400 · mực phụ); CSS `.plp-count` / `.plp-count-n` ở cạnh khối thang chữ; `updatePlpCount()` chỉ đổi số trong `[data-plp-n]` (không ghi đè `textContent` cả dòng — sẽ phá cấu trúc hai ô); STYLE-RULES §1.1 thêm **ngoại lệ ghi danh thứ tám** (500 chữ thường cho SỐ, danh sách nay 8 mục, vẫn đóng). **Đo ở desktop:** số 14/20 · 500 · rgb(10,10,10); chữ 14/20 · 400 · rgb(114,114,114); khe 4; bề rộng khối 91,7 (Figma 91); đáy khối = đáy tiêu đề (đúng canh đáy của Figma); số đổi đúng khi áp bộ lọc (40 → 11 → 1 → 40) và kiểu giữ nguyên; console sạch.
**i18n:** số tách khỏi chữ nên luật `^(\d+) sản phẩm$` → `$1 products` hết khớp dòng này; nhãn đi theo khoá riêng lẻ `'sản phẩm'` — ĐỔI EN từ `items` thành `products` (khoá này không còn chỗ nào dùng riêng lẻ) để EN vẫn là "40 products" như trước.
**Mobile KHÔNG đổi** — `index.html` giữ `.t-single` 12/16 · 400 · mực chính, một chuỗi (khung Figma mobile của PLP chưa đổi; biến thể mobile của `page-head` không có dòng đếm). Muốn mobile theo thì cần chốt thiết kế riêng (14/20 ở thanh công cụ mobile có đủ chỗ không?).
**Figma LỆCH (báo user, chưa động):** các khung `PLP / desktop · …` còn chữ ghi đè CŨ trên instance `page-head` sau khi user tách component: "3 sản phẩm" / "0 sản phẩm" / "9 sản phẩm" / "8 sản phẩm" nằm trong ô SỐ (Medium đen) và ô chữ "sản phẩm" lại hiện thêm ⇒ đọc thành "3 sản phẩm sản phẩm"; khung `category` (821:182847) có ô số fill TRẮNG `#ffffff` (vô hình); khung `search with no results` ẩn ô số. Cần sửa tay hoặc nhờ mình sửa.

## Ô nhập: KHÔNG dấu `*` bắt buộc (02/10/2026, CẢ 2 BẢN)

User: *"trong toàn bộ các ô nhập, sẽ bỏ dấu * bắt buộc ra nhé"*. Đã rà cả 2 file (chuỗi nhãn, placeholder, `aria-label`, CSS `content`, ghép chuỗi `'*'`): dấu sao chỉ còn ở **2 nhãn của popup đăng nhập nhanh trong giỏ hàng** (`#loginPop`: `Số điện thoại*`, `Mật khẩu*`) — **đã bỏ ở cả `index.html` lẫn `desktop.html`**. Hai khoá i18n `'Số điện thoại*'` / `'Mật khẩu*'` (EN `Phone number*` / `Password*`) hết chỗ dùng nên **gỡ luôn**; nhãn nay là `Số điện thoại` / `Mật khẩu` và đi theo khoá chung → EN của ô SĐT ở popup thành `Mobile phone number`, đồng nhất với mọi ô SĐT khác (trước là `Phone number*`). Đã quét DOM lúc chạy ở desktop (đăng nhập · đăng ký · quên mật khẩu · hoàn tất đăng ký · checkout kể cả VAT cá nhân / công ty · giỏ · theo dõi đơn · 4 tab Tài khoản): **0 dấu `*`** trong nhãn / placeholder / aria-label. Các `*` còn lại trong code là CHỮ KHÁC: che số điện thoại ở Theo dõi đơn (`trackMaskPhone`: `0909 *** 123`), chữ nghiêng `*tại đây*` trong đoạn phí ngân hàng, và comment CSS.

**Luật từ nay:** ô nhập MỚI không gắn dấu `*`. Ô nào KHÔNG bắt buộc thì ghi thẳng vào nhãn "(không bắt buộc)" như ô *Ghi chú đơn hàng*; ô bắt buộc chỉ báo khi thiếu bằng dòng lỗi dưới ô (xem mục "Lỗi ô nhập" và `FIELD_RULE`). Figma: nhãn popup đăng nhập (mobile + desktop) còn dấu sao — LỆCH cho tới khi sync lại.

**Giữ nguyên dạng toast** cho những thứ **không phải lỗi của một ô nhập**: `Chọn tỉnh / thành phố trước` · `Chọn cửa hàng nhận hàng` · `Hãy chọn ít nhất 1 sản phẩm` (đều là chọn-lựa, không có ô để gắn) và toàn bộ thông báo thành công.

**Đo lại cả 2 file, 3 chỗ × 2 bước:** lỗi hiện đúng chữ dưới đúng ô · `toast = (ẩn)` · ô mang `.fld-err` + `aria-invalid="true"` · OTP tô đỏ **6/6** ô · gõ lại thì lỗi **mất và hết đỏ** · gửi lại thành công thì lỗi cũ không sót. Console sạch trên tab mới ở cả 2 file.

> **Bẫy backtick trong comment giữa template literal — LẦN THỨ 4 trong ngày.** Lần này là `` `gap-6` `` trong comment HTML của `viewOtp()`. Nay đã có script quét: tìm mọi `<!-- … -->` chứa backtick — hiện **0 chỗ** ở cả 2 file. Chạy lại script đó sau mỗi lần thêm comment vào markup.

## Màn đăng nhập / đăng ký — nền trắng full trang (19/08/2026, CHỈ DESKTOP)

User: *"cho background trắng full trang thay vì cho nền màu xám cảm giác đóng hộp, nhưng vẫn limit width lại"*.

Sửa ở `screenLOGIN()` — khung chung của **cả 6 màn xác thực** (`login · register · otp · reginfo · setpass · forgot`), nên đổi một chỗ là đổi hết 6.

| Bỏ | Là gì |
|---|---|
| `bg-secondary` trên vùng trang | nền xám — thủ phạm chính của cảm giác "đóng hộp" |
| `bg-background` trên thẻ | nền trắng của thẻ, nay trùng nền trang nên vô nghĩa |
| `border border-border-1` | viền hộp |
| `rounded-md` | bo góc hộp |
| `shadow-sm` | **mặt CUỐI CÙNG trong file còn đổ bóng** — trái với chốt 17/08/2026 "đi hẳn hướng phẳng, không đổ bóng"; bỏ luôn là đúng hướng chung |
| `overflow-hidden` | chỉ tồn tại để cắt góc bo, nay không còn bo |

**GIỮ `w-[440px]`** — đúng "vẫn limit width". **KHÔNG đụng `px-4`** trong các view: giữ nguyên thì bề rộng nội dung y hệt trước, đổi này **chỉ gỡ phần vỏ** chứ không xê dịch một dòng nào.

**Đo lại cả 6 view × 3 bộ da:** nền đặc gần nhất phía sau cột là `rgb(255,255,255)` · cột `nền trong suốt · viền 0 · bo 0 · bóng none` · rộng đúng **440** · căn giữa vùng chứa **lệch 0px**. **0 phần tử còn `box-shadow`** trên màn này. Console sạch trên tab mới.

> Khối xám lớn còn lại phía dưới **là `footer()`** (băng "Cập nhật thông tin mới nhất từ DAFC"), có ở mọi màn — không phải phần hộp của form nên giữ nguyên. **Bản mobile không liên quan:** ở đó màn xác thực vốn đã full trang, không có thẻ.

### Bỏ thanh header + nút back (19/08/2026, yêu cầu user, CHỈ DESKTOP)

*"vì có title lớn rồi nên hãy bỏ cái dialog và button back ra"*. Đã **xoá hẳn `authNav(title)`** — hàng 48px kiểu header hộp thoại `[◀ back] + tiêu đề 16px căn giữa` đứng đầu cả 6 view. Hai vấn đề của nó, mà đợt bỏ nền xám ở trên làm lộ hẳn ra:

- **tiêu đề lặp** — mọi view đều đã có `h2` 24px ngay dưới, chữ y hệt;
- nó là **mẫu của màn hình điện thoại**. Hết hộp rồi thì một thanh header trôi giữa nền trắng đọc ra là mảnh vỡ chứ không phải cấu trúc.

Xoá kéo theo `[data-auth-back]` (chỉ tồn tại trong hàm đó) → handler của nó trong `wire()` thành code chết, **đã xoá luôn**.

> ⚠ **Mất đường quay lại ở 2 view — đã báo user, chưa vá:**
> | View | Trước back về | Lối ra bằng chữ hiện có |
> |---|---|---|
> | `login` | thoát về màn gọi | — (là màn gốc) |
> | `register` | login | ✓ "Đã có tài khoản? **Đăng nhập**" |
> | `forgot` | login | ✓ "← Quay lại đăng nhập" |
> | `otp` | màn nhập SĐT của luồng | ✓ "**Đăng nhập**" + "thay đổi số điện thoại" |
> | **`reginfo`** | `register` | ✗ **KHÔNG có** |
> | **`setpass`** | `otp` | ✗ **KHÔNG có** |
> Muốn trả lại thì thêm **1 nút chữ ở cuối form**, **đừng dựng lại thanh header** — đó chính là thứ vừa bỏ.

**Đo lại cả 6 view:** không còn `[data-auth-back]`, không còn hàng `.h-12`, mỗi view giữ đúng `h2` 24px riêng của nó (`Đăng nhập · Tạo tài khoản · Quên mật khẩu · Xác thực OTP · Hoàn tất đăng ký · Đặt mật khẩu mới`), form là phần tử đầu tiên. **Luồng chạy thật vẫn thông**: login → Đăng ký ngay → nhập SĐT → OTP (6 ô) → "Đăng nhập" về login → "Quên mật khẩu?" → forgot → "← Quay lại đăng nhập" → đăng nhập thật ra `plp` với `ckAuth = true`. Console sạch trên tab mới. **Bản mobile giữ nguyên `authNav`** — ở đó là màn full trang thật, cần header + back.

## "Đã thêm vào giỏ hàng" — DROPDOWN dưới icon giỏ (19/08/2026, CHỈ DESKTOP)

User: *"ở bản desktop 'đã thêm vào giỏ hàng' ngay tại icon giỏ hàng sẽ dropdown xuống thay vì đè popup lên"*.

**Trước:** `#cartConfirm` mượn `.dk-modal` → nổi **giữa màn**, nền tối 45%, khoá cuộn trang — chặn cả trang chỉ để báo một việc vừa xong.
**Sau:** tấm **380px thả xuống neo vào icon giỏ** ở header, canh mép phải với mép phải nút, cách nút 8px. Không tối nền, không khoá cuộn — giống mini-cart của sàn thật.

| Bỏ | Vì sao |
|---|---|
| thanh grabber `50×3` | di sản bottom-sheet mobile, tấm này không kéo được |
| nền tối `bg-black/45` | dropdown không được tối cả trang |
| `lockBodyScroll()` | sai vai, và ẩn scrollbar làm trang giật ngang ~15px |

**Cách neo:** đo `getBoundingClientRect()` của `[data-nav="cart"]` **lúc mở**, không nhét panel vào trong nút. Lý do: `navBar()` **dựng lại mỗi lần đổi màn** — panel nằm trong đó là mất theo, mà nút giỏ cũng không có id cố định. Bám thuộc tính điều hướng `[data-nav="cart"]` có ở mọi header đầy đủ.

- **Bám theo khi cuộn**: header `sticky top-0` nên nút giỏ đứng yên, nhưng thanh khuyến mãi trên cùng cuộn đi → nút tụt lên. Nghe `scroll`/`resize` (passive) và đặt lại toạ độ. Đo: cuộn 400px thì tấm `92 → 60`, **vẫn cách nút đúng 8px**.
- **Kẹp trong 16px hai bên** để màn hẹp không đẩy tấm ra ngoài.
- **Dự phòng**: màn checkout dùng header rút gọn (logo + cam kết bảo mật, **không có icon giỏ**) → rơi về góc phải-trên. Chưa luồng nào gọi cart-confirm từ đó, nhưng thiếu nhánh này là tấm văng ra toạ độ `0,0`. Đo: `x=884 y=72`, lề phải đúng 16.
- **`translate-y-full` giữ nguyên làm cờ đóng/mở** như mọi sheet khác trong dự án — CSS map nó sang `translateY(-8px) + opacity 0`, nên đoạn JS đóng/mở không phải viết lại.
- `place()` gọi **trước** khi bỏ cờ đóng, không thì tấm nháy một frame ở chỗ cũ.

> **Lỗi tự gây, bắt được lúc kiểm:** bỏ class `.dk-modal` khỏi panel thì nó cũng **rơi khỏi 2 rule bộ da** `html.skin-mp/.skin-mt .dk-modal { border-radius: 0 !important }` → tấm vẫn bo `8px` giữa 2 bộ da góc vuông. Sửa: thêm `.cc-drop` vào cả 2 selector đó, và vào danh sách "KHUÔN CHUNG CHO MỌI LỚP NỔI" để nhận viền 1px + không bóng.
> **Luật: gỡ một class khuôn khỏi phần tử thì phải grep xem class đó còn được rule nào khác dùng để cấp thuộc tính cho phần tử này không.**

### Bỏ dòng "Giỏ hàng hiện có {n} sản phẩm" (19/08/2026, yêu cầu user, CẢ 2 BẢN)

Gỡ `#ccCount` khỏi markup và bỏ dòng gán `textContent` trong `openCC`. Lý do hợp lý: số lượng giỏ **đã có ở chấm đếm trên icon giỏ** — mà bản desktop tấm này lại thả xuống **ngay dưới đúng cái icon đó**, nhắc lại bằng chữ là thừa.

Bỏ ở **cả 2 file**: cùng một component, để lệch nhau thì hỏng đúng thứ cả đợt này đang đi đồng bộ. **Giữ luật i18n** `/^Giỏ hàng hiện có (\d+) sản phẩm$/` trong `I18N_RE`/`I18N_REV` — rẻ, và còn dùng nếu bật lại.

Đo lại: `#ccCount` = **0 chỗ** ở cả 2 file, không còn tham chiếu treo. Nội dung tấm còn đúng 7 dòng — `Đã thêm vào giỏ hàng · <thương hiệu> · <tên> · <biến thể> · <giá> · Xem giỏ hàng · Tiếp tục mua sắm`. Desktop vẫn neo đúng nút giỏ (lệch mép phải 0, cách 8px), mobile vẫn mở đúng bottom sheet. Console sạch trên tab mới ở cả 2 file.

### Tự đóng sau 5s (19/08/2026, yêu cầu user)

*"thời gian hiển thị dropdown đó khoảng 5s"*. Hợp lý: đây là tấm **báo việc đã xong**, không phải hộp thoại phải trả lời.

| Tình huống | Xử lý |
|---|---|
| mở tấm | hẹn `5000ms` rồi tự đóng |
| **rê chuột vào tấm** | **dừng đếm** — trong tấm có 2 nút bấm được, 5s mà biến mất đúng lúc user đang với tay tới nút thì thành lỗi |
| rời chuột | hẹn lại **đủ 5s** từ đầu |
| thêm liên tiếp 2-3 món | `clearTimeout` trước khi hẹn lại — không dọn thì hẹn cũ **đóng sập tấm vừa mở lại** |
| bấm ✕ / ra ngoài / nút | đóng ngay, và **dọn hẹn giờ** để nó không đóng ké lần mở sau |

**Đo lại từng nhánh** (đo bằng `performance.now()` + chờ thật): mở → còn ở `4.3s`, đã đóng ở `5.3s` · giữ chuột `5.6s` vẫn mở, rời chuột thì còn ở `4.3s` và đóng ở `5.3s` · mở lại lúc còn `2s` thì chờ thêm `2.6s` vẫn mở (đã hẹn lại từ đầu) và đóng ở `5.2s` · đóng tay ở `1.5s` rồi mở lại, chờ `2.2s` **vẫn mở** (hẹn cũ đã bị dọn) · đường đi thật quick add → Thêm vào giỏ cũng tự đóng đúng 5s.

**Đo lại** (tắt transition trước): mép phải tấm trùng mép phải nút (**lệch 0**), cách nút **8px**, backdrop `rgba(0,0,0,0)`, viền `1px`, bóng `none`, không còn grabber, `body overflow` **không đổi** khi mở. Bo góc theo bộ da: `8px` bản gốc · `0` ở MR PORTER và Mytheresa. Tương tác: bấm ra ngoài đóng · "Xem giỏ hàng" sang màn giỏ và đóng tấm · đường đi thật từ **PDP** và từ **quick add** đều ra đúng vị trí. Console sạch trên tab mới. **Bản mobile không đụng** — vẫn bottom sheet, không tự đóng.

## Quick add desktop — bố cục 2 CỘT (19/08/2026, CHỈ DESKTOP)

User gửi ảnh quick view của **versace.com** kèm chốt: *"sẽ sử dụng layout như thế này nhé, tuy nhiên đây chỉ là layout tham khảo cách bố trí chứ k copy y chang vì khác style"*.

**Trước:** drawer 1 cột rộng 560 — dải 2.5 ảnh peek cuộn ngang ở trên, rồi header, màu, size, CTA ghim đáy.
**Sau:** dialog **960×620**, 2 cột:

| Cột trái (46%) | Cột phải |
|---|---|
| 1 ảnh lớn chiếm hết khung (scroll-snap, mỗi slide 100%) | ✕ trên cùng bên phải |
| hàng chấm chuyển ảnh, đè đáy ảnh, lề `24/16` | thương hiệu → tên → giá |
| | nhãn "Màu sắc" + ô màu 44px |
| | hàng `[Kích thước ......... Bảng kích thước →]` |
| | lưới size **6 ô/dòng** (trước 5) |
| | *(giãn)* → **CTA** → **"Xem chi tiết" căn giữa dưới CTA** |

**CHỈ mượn cách bố trí, KHÔNG bê style** — mọi thứ vẽ ra vẫn là component sẵn có: `.sw` cho ô màu, `.chip` cho ô size, `.btn-p` cho CTA, khuôn `.dk-modal` cho vỏ, thang chữ + token màu của dự án. Nên đổi bộ da vẫn ăn: bo góc panel `8px` ở bản gốc / `0` ở 2 bộ da kia, CTA `#0a0a0a` / `#000`.

**3 thay đổi cấu trúc trong code:**
1. Tách `quickAddMedia()` khỏi `quickAddBody()` — ảnh sang `#qaMedia` (cột trái), thông tin ở `#qaBody` (cột phải).
2. `#qaDetail` ("Xem chi tiết") **dời từ cạnh tên sản phẩm xuống dưới CTA**, nên handler phải đổi từ `body.querySelector` sang `ctaBox.querySelector`.
3. `flyToCart` đổi nguồn ảnh sang `media.querySelector('img')` — để nguyên `body.querySelector('img')` là **bay nhầm cái thumbnail chọn màu** (ảnh gallery không còn trong `#qaBody`).

**Đảo 1 quyết định cũ:** quick add trước KHÔNG có link bảng size ("node Bảng size trong Figma 3373:41590 đang tắt"). Tham chiếu đặt link ngay ở hàng nhãn size và dự án **đã có bảng size thật** → thêm lại, dùng **nguyên hook `[data-size-chart]`** của PDP nên không phải viết handler mới, chỉ cần gọi `wire(body)`. Sản phẩm làm đẹp (`p.sizes`) vẫn **không** có link — nhãn ra "Dung tích", bảng size quần áo vô nghĩa với nước hoa.

**KHÁC tham chiếu 2 chỗ, có ý thức:** (a) họ có icon ❤ lưu sản phẩm ở góc ảnh — dự án **không có tính năng wishlist**, thêm vào là bịa tính năng; (b) họ chỉ hiện tên sản phẩm, ta **giữ cả tên thương hiệu** vì đó là nội dung sẵn có của mọi card/PDP.

**Đo lại** (tắt transition trước): panel `960×620` giữa màn · cột ảnh `441×618` · chấm cách mép ảnh đúng `24/16` · thứ tự dọc cột phải `✕ → thương hiệu → giá → Màu sắc → [Kích thước | Bảng kích thước →] cùng hàng → lưới size → CTA → Xem chi tiết` · "Xem chi tiết" căn giữa cột (lệch ≤1px). Tương tác: link bảng size mở đúng dialog 5 bảng · cuộn sang ảnh 3 thì chấm ra `○○●○○` · chọn màu + size rồi Thêm vào giỏ → giỏ `5 → 6`. Chạy đúng ở **cả 3 bộ da**. Console sạch trên tab mới. **Bản mobile không đụng** — vẫn bottom-sheet 1 cột.

> **2 lỗi tự gây, bắt được lúc kiểm:**
> · **Backtick trong comment giữa template literal — LẦN THỨ 3 trong ngày.** Gõ `` `[data-size-chart]` `` vào comment HTML nằm trong template literal của `quickAddBody()` → đứt chuỗi, `ReferenceError: data is not defined`, quick add không mở được.
> · **Utility Tailwind chưa có trong bản build.** `bottom-4` và `left-6` **không chỗ nào trong 2 file HTML dùng** nên bản build tĩnh `tailwind.css` không có chúng — gõ vào markup là **rơi im lặng**, chấm dính đúng mép ảnh. Đã kiểm bằng cách grep từng class trong `tailwind.css`. Sửa bằng cách khai `#quickAddSheet #qaDots { left: 24px; bottom: 16px }` trong khối `<style>` thay vì rebuild cả stylesheet giữa chừng.
> **Luật rút ra: thêm class Tailwind MỚI vào markup thì phải grep `tailwind.css` xem có không** — không có thì hoặc rebuild, hoặc khai tay trong `<style>`.

## Ô tìm kiếm — đồng bộ theo bộ da (19/08/2026, CẢ 2 BẢN)

User: *"update đồng bộ lại search field luôn, hiện tại search chưa được đồng bộ ở các skin"*. Đúng — có **2 lỗi khác nhau**:

**1. Bản mobile: ô tìm kiếm KHÔNG đổi hình theo bộ da nào.** Cả 2 ô (màn Search + sheet chọn tỉnh/phường) là `<label class="bg-secondary rounded-xs p-2">`; đổi da chỉ thấy sắc xám nhích một nấc (`#f5f5f5` → `#f2f2f2`), hình dáng y nguyên.

**2. Bản desktop: rule `skin-mt` bám NHẦM phần tử.**

> Rule cũ là `html.skin-mt #dkSearchInput { border-bottom: 1px solid #000 }` — tức cái **input nằm bên trong** hộp. Mà input đó vốn đã `background: transparent; border: 0`; thứ vẽ ra hộp là thẻ bọc `#dkNavSearchField` (`background: var(--general-secondary)` + `border-radius`).
> Kết quả: vạch đen bị vẽ **bên trong hộp xám** → ra một hộp xám có kẻ ngang ở giữa, không phải ô underline. Đo được lúc kiểm: hộp `rgb(242,242,242)`, input `border-bottom 0.8px rgb(0,0,0)`.
> Sửa: bỏ nền + đưa gạch dưới lên **đúng thẻ bọc**, gỡ khai báo ở input.

**Đã áp — 5 ô tìm kiếm, hook chung `.search-field`:**

| File | Ô | Selector |
|---|---|---|
| `index.html` | màn Search · sheet tỉnh/phường | `.search-field` (hook mới, 2 chỗ) |
| `desktop.html` | ô trên nav | `#dkNavSearchField` (đã có id) |
| `desktop.html` | màn Search · sheet tỉnh/phường | `.search-field` (hook mới, 2 chỗ) |

Cùng một khai báo ở cả 2 file — **cùng tên hook** nên sửa 1 chỗ là hiểu cả 2:

```css
html.skin-mt .search-field { background: transparent; border-radius: 0;
  border-bottom: 1px solid #000; padding-left: 0; padding-right: 0; }
```

Bảng viền đo 18/08 xếp **"gạch dưới ô tìm kiếm" vào tầng `#000` 1px** của họ — cùng tầng nút CTA và ô chọn size. Bỏ padding **ngang** để icon kính lúp thẳng lề nội dung: hộp nền mất rồi thì 8/12px thụt vào đọc ra là lệch chứ không phải padding. Chiều cao giữ nhờ vẫn còn padding dọc (`p-2`/`p-3` + `min-h-10`/`min-h-12`); chỉ nhích **+0.8px** do thêm nét viền.

**2 bộ da kia GIỮ hộp nền xám** — chưa đo được ô tìm kiếm của MR PORTER (mrporter.com chặn), tự chế một kiểu cho nó là đúng vào lỗi "bê nguyên / tự suy" đã bị bắt cùng ngày. Chốt: **bản gốc + MR PORTER = hộp xám · Mytheresa = gạch dưới**.

**Đo lại** (tắt transition trước), vòng `mặc định → MR PORTER → Mytheresa → mặc định`, cả 2 file: `skin-mt` ra `nền trong suốt · bo 0 · gạch dưới 1px #000 · padL 0`; 2 bộ da kia giữ `#f5f5f5`/`#f4f4f4` · bo 2/0 · padL 8-12. Input bên trong ô nav nay `border 0` cả 4 cạnh. Console sạch trên tab mới.

> **2 bẫy đo lại dính trong đợt này** (cả 2 đều đã ghi ở mục trước mà vẫn sập):
> · **`getComputedStyle` trả object SỐNG.** Mình gỡ thẻ `<style>` tắt-transition *trước khi* đọc chuỗi ra → giá trị được resolve lại lúc transition đã bật, đọc ra `rgba(0,0,0,0)` thay vì `rgb(0,0,0)` và suýt kết luận rule không ăn. Phải **ép sang chuỗi ngay khi thẻ style còn đó**.
> · **Cache.** `location.reload()` và cả `navigate` sang cùng URL vẫn trả bản cũ; phải thêm `?nocache=n` mới thấy sửa đổi.

## Badge nhãn — nền TRẮNG dùng chung (19/08/2026, CẢ 2 BẢN)

User: *"đồng bộ các badge trong trang sẽ có nền là màu -white nhé"* → làm mobile trước; sau đó user báo tiếp *"trong các ver pdp chưa được đồng bộ màu badge pre-order, seasonal…"* → **đã áp nốt `desktop.html`**, cùng tên class và cùng giá trị.

Trước đây **cùng một loại nhãn mà 2 nền khác nhau**, giống hệt nhau ở cả 2 file:

| Badge nhãn | Ở đâu | Nền cũ |
|---|---|---|
| Pre-order · New arrival | thẻ sản phẩm (PLP, hàng gợi ý) | inline `rgba(255,255,255,.9)` — trắng **90%** |
| New Season · La Vacanza | thẻ sản phẩm | inline `rgba(255,255,255,.9)` |
| Pre-order · New Season · La Vacanza | PDP (đè ảnh gallery) — mobile 6 màn, desktop 1 | `bg-secondary` = **`#f5f5f5`** (`#f2f2f2` ở `skin-mt`) |
| Pre-order | dòng giỏ hàng · màn Hoàn tất (đè ảnh) | `bg-secondary` |

Nay gom về **một rule** trong khối `<style>` — sửa nền badge thì sửa đúng dòng này, đừng khai lại ở từng chỗ:

```css
.badge-label { background: var(--color-white); }
```

`--color-white` = primitive `#ffffff` của `tokens.css` (đúng "màu -white" user gọi tên). **Primitive nên không đổi theo bộ da** → badge trắng như nhau ở cả 3 skin. Thay **14 chỗ markup ở `index.html`** (12 static + 2 trong `productCard`) và **4 chỗ ở `desktop.html`** (PDP gallery · dòng giỏ · màn Hoàn tất · thẻ sản phẩm), gỡ sạch `bg-secondary` và inline `rgba(...)` khỏi nhóm này.

> ⚠ **Rule khai GIỐNG HỆT ở cả 2 file** (cùng tên class, cùng giá trị) — sửa một file thì sửa cả hai, kẻo lại lệch đúng thứ vừa đi đồng bộ. Nút quick-add trên thẻ sản phẩm của `desktop.html` vẫn giữ `rgba(255,255,255,.9)`: nó là NÚT, không phải badge.

**Đọc được vì badge nào cũng nằm ĐÈ TRÊN ẢNH** — gallery PDP `absolute top-3`, ảnh thẻ sản phẩm `absolute top-2`, ảnh dòng giỏ `absolute top-0`. Không có cái nào đặt trên nền trắng của trang nên trắng đặc không bị chìm.

**KHÔNG áp cho 4 badge MANG NGHĨA MÀU** (trắng hoá là mất nghĩa, riêng chấm đếm giỏ là mất luôn):

| Badge | Nền giữ nguyên | Lý do |
|---|---|---|
| `-20%` giảm giá | `#fef2f2` chữ đỏ | cảnh báo giá |
| chấm đếm giỏ | `#d62845` chữ trắng | trắng trên nền trắng = biến mất |
| "Quà tặng" | `#000` chữ trắng | nhấn quà tặng |
| pill trạng thái đơn | `#f2f2f2` / `#fef2f2` | mã hoá trạng thái |

**Đo lại** (tắt transition trước) PLP · PDP · giỏ hàng × `mặc định` và `skin-mt`, **cả 2 file**: mọi `.badge-label` ra **`rgb(255,255,255)`**; badge `-%` vẫn `rgb(254,242,242)`, chấm đếm giỏ vẫn `rgb(214,40,69)`, "Quà tặng" vẫn nền đen. Riêng mobile quét đủ **6 màn PDP** — cả 6 ra trắng. Console sạch trên tab mới ở cả 2 file.

> **CÒN LỆCH — là lệch NỘI DUNG, không phải màu, chưa sửa vì user chỉ nói về màu:** PDP mobile treo tới **3 badge** (`Pre-order` · `New Season` · `La Vacanza`, tuỳ màn 1–3 cái), còn **PDP desktop chỉ treo `Pre-order`** — markup gallery desktop (`dkPdp`, tile đầu) không render 2 badge mùa vụ. Muốn đồng bộ nốt thì thêm chúng vào tile đầu của gallery desktop.

## Giỏ: 3 chỗ +1 nấc weight + brand đồng bộ với thẻ SP (20/08/2026, CẢ 2 BẢN)

User: *"số tiền tổng cộng tăng font weight lên 500, ưu đãi & khuyến mãi tăng lên 500, Bạn có phiếu mua hàng tăng lên 500, brand name của thẻ sản phẩm trong cart chưa đồng bộ text style với bên ngoài"*.

Ba chỗ đầu đang `w400` (blanket bộ da kéo `font-medium` về 400) → khai `500` tường minh. Hàng "Tổng cộng" lấy **cả nhãn lẫn số**: chỉ đậm con số mà để nhãn nhạt thì hai đầu một hàng lệch nấc, đọc ra như lỗi.

### Brand lệch tới 3 thứ, không chỉ weight

| | `.pc-brand` ngoài listing | brand trong dòng giỏ |
|---|---|---|
| **mobile** | `12/16 · w500 · UPPERCASE` | `12/20 · w400 · thường` |
| **desktop** | `12/20 · w500 · thường` | `12/20 · w400 · thường` |

Nên **rule hai file cố ý KHÁC nhau**: mobile phải kéo thêm `uppercase` + `line-height: 16`, desktop **chỉ** cần weight. Copy y rule mobile sang desktop là brand trong giỏ hoá chữ hoa trong khi thẻ sản phẩm ngoài listing vẫn chữ thường — tức lại lệch đúng cái vừa sửa.

`p:has(+ .del)` = dòng brand: nó là `p` duy nhất đứng ngay trước nút xoá trong dòng giỏ, nên không phải thêm class hook vào markup.

"Bạn có phiếu mua hàng?" **chỉ có ở mobile** — cụm CTA desktop nằm trong card cột phải, không có accordion này, nên bản desktop không có nhánh tương ứng.

**Đo lại:** mobile `skin-mt` ra brand `12/16 w500 uppercase` **khớp đúng** `.pc-brand` ngoài listing; desktop ra `12/20 w500 thường` **khớp đúng** `.pc-brand` bên đó. Hàng "Tổng cộng" cả nhãn + số `w500` ở cả 2 file; "Ưu đãi & khuyến mãi" `w500`; "Bạn có phiếu mua hàng?" `w500` (mobile). `skin-mp` và bộ da Mặc định không lệch số nào. Console sạch trên tab mới.

> **Phát hiện phụ, chưa sửa vì ngoài phạm vi câu hỏi:** `.pc-brand` của `skin-mt` **giữa hai bản đang lệch nhau** — mobile `12/16 uppercase`, desktop `12/20 chữ thường`. Tức thẻ sản phẩm ở listing của hai khổ đang không cùng text style. Cần user chốt lấy bản nào làm chuẩn rồi đồng bộ.

## Bộ lọc: weight +1 nấc cho panel và các tầng danh mục (20/08/2026, CẢ 2 BẢN)

User: *"filter tăng font weight của BỘ LỌC và các level danh mục lên 1 nấc nhé"*.

Bộ da ép toàn trang về `400` nên **"1 nấc" ở đây là `500`** — cùng cách tính đã ghi ở mục thang chữ ("`skin-mt` thấp hơn 1 bậc vì bộ da ép về 400, nấc của nó tính từ 400").

**Tăng cả ba nhóm cùng lúc** nên tương quan giữa chúng **không đổi**, chỉ đậm hơn một nấc:

| Tầng | Trước | Nay | Phân cấp vẫn nhờ |
|---|---|---|---|
| Tiêu đề panel "BỘ LỌC" | `14px w400` | `14px w500` | cỡ chữ + chữ hoa |
| Tiêu đề mục "DANH MỤC"… | `12px w400` | `12px w500` | chữ hoa |
| 3 tầng cây danh mục | `12px w400` | `12px w500` | indent `40 / 64 / 88` |

**Điểm kỹ thuật đáng ghi — vì sao 3 selector chứ không 1:**

```css
html.skin-mt #filterSheet .facc { font-weight: 500; }
```

phủ được **mọi dòng lựa chọn** (cate, thương hiệu, màu sắc…) vì chúng **không mang class `font-*` nào** → chúng kế thừa, nên khối blanket `400` của bộ da không chặn được. Ngược lại **hai tầng nhãn phải khai `500` tường minh**: markup của chúng có `font-medium`, tức đúng loại class mà blanket kéo về `400`.

**Đo lại — cả 2 file:** `skin-mt` ra `title 14px w500` · `tiêu đề mục 12px w500` · **cả 4 mức indent của cây danh mục `w500`** (`pl=16 / 40 / 64 / 88`) · mục "Thương hiệu" cũng `w500` nên panel không có chỗ nào lệch nấc. Bộ da Mặc định giữ `title w500 · mục w300 · cate w400`, `skin-mp` giữ `title w500 · mục w300 · cate w400` — không lệch số nào. Console sạch trên tab mới.

## Quà tặng: nhấn bằng chữ, không bằng mảng màu (20/08/2026, CẢ 2 BẢN)

User: *"phần nhấn màu của quà tặng hơi dài, thử vài style phù hợp với skin mt cho phần quà tặng"*.

**Đo hiện trạng:** `.gift-group` tự tô `bg-accent-0` và chạy full-bleed → mảng xám **375×185** — cao gần bằng một dòng sản phẩm, rộng hết bề ngang. Trên bộ da này nó lạc: `skin-mt` **không nhấn bằng mảng màu ở bất kỳ đâu** — nav, menu, bộ lọc, footer đều phân cấp bằng **chữ hoa + kẻ mảnh**.

Nên đổi **đòn bẩy**, không phải thu nhỏ mảng:

| Bỏ | Thay bằng |
|---|---|
| mặt xám của cả 2 loại dải quà (theo sản phẩm + theo mốc đơn) | — |
| — | tên chương trình lên **nhãn chữ hoa 12px** — cùng bậc với 6 nhãn footer, nhãn menu, tiêu đề mục bộ lọc, nên tự đọc ra là nhãn nhóm |
| — | "Đổi quà" chuẩn hoá gạch chân `1px / offset 2px` (markup **vốn đã có** `underline`, mặc định trình duyệt để gạch dày hơn và sát chữ hơn) — cùng khuôn link hành động với "Thay đổi" ở checkout |

**Giữ nguyên** badge "Quà tặng" nền đen trên ảnh và giá `0 ₫` — đó mới là chỗ phân biệt quà với hàng mua, không cần mảng nền tiếp sức.

**2 phương án đã cân nhắc rồi bỏ** (ghi lại phòng khi muốn quay lại):

- **(B) Thu mảng xám thành chip nhỏ ôm mỗi tên chương trình.** Vẫn là nhấn bằng màu, mà bộ da này không có linh kiện chip nền nào khác — sẽ là ngoại lệ đứng một mình.
- **(C) Rail dọc `border-left` 2px đen cho cả dải.** Nhấn bằng đường, nhưng đẻ thêm một kiểu vạch thứ hai bên cạnh hệ gạch ngang đang dùng khắp nơi.

**Đo lại:** `skin-mt` ở cả 2 file ra **3/3 dải quà** `bg=rgba(0,0,0,0)`, nhãn `12px uppercase`, "Đổi quà" `1px/2px`; badge "Quà tặng" vẫn `rgb(10,10,10)` `10px`. `skin-mp` và bộ da Mặc định giữ nguyên mảng `#f7f7f7` / `#fafafa`, nhãn `tt=none`, gạch chân `auto/auto` — không lệch số nào. Console sạch trên tab mới.

## Trang giỏ: 3 lỗi hộp user chỉ ra (20/08/2026)

User: *"phần title lớn (giỏ hàng) đang chưa được thụt vào; block giỏ hàng và block tóm tắt đơn hàng đang chưa bằng nhau hiện cái cao cái thấp; cho quà tặng của đơn hàng nằm vô trong block giỏ hàng luôn"*. Cả ba đều đo ra số, không phải cảm giác.

**1. Tiêu đề "Giỏ hàng" sát mép hộp — CHỈ DESKTOP.** Đo: chữ ở `x=24` trong khi hàng "Chọn tất cả" và nội dung từng món đều ở `x=40`. Nguyên nhân: hàng tiêu đề desktop chỉ có `py-4`, **không có `px`**; bản mobile không dính vì hàng tương ứng bên đó vốn `px-4`. Thêm `padding: 0 16px` cho hàng đó.

**2. Hai cột lệch đỉnh đúng 12px — CHỈ DESKTOP.** Đo (sau khi tắt transition, vì `.rise` đang chạy làm rect sai): hộp trái `y=197`, card tóm tắt `y=185`. Thủ phạm là chính `margin-top: 12px` tôi thêm cho hộp đầu ở vòng "đóng hộp" — cột phải bắt đầu ngay đỉnh vùng nội dung nên không có khe tương ứng. Bỏ `margin-top`, đổi thành `padding` ngang (việc 1) → **lệch còn 0px**.

> Lưu ý cách đọc: hộp trái cao `1338`, card phải cao `394` — chênh này là **do nội dung** (5 món so với một cụm tóm tắt) và không ép bằng nhau được nếu không đẻ ra khoảng trắng lớn. Cái sửa được, và cũng là cái đập vào mắt, là **đỉnh phải thẳng hàng**.

**3. Quà theo mốc đơn nằm luôn trong hộp giỏ hàng.** Trước đó `#orderGift` là hộp thứ hai đứng riêng, cách 12px — mà quà theo mốc là **hệ quả của chính giỏ này**, tách ra thành khối riêng đọc như một mục không liên quan. Nay bỏ khe + mặt riêng, chỉ giữ một kẻ mảnh ngăn với danh sách món (cùng loại kẻ đang ngăn giữa các món) nên nó đọc ra là **dòng cuối của hộp**.

**Chỗ dễ sót của việc 3 — đáy hộp phải DI CHUYỂN:**

```css
html.skin-mt [data-screen="cart"] #cartList:has(+ #orderGift [data-gift-tier]) {
  border-bottom-width: 0; padding-bottom: 0;
}
```

Khối quà đang hiện thì **nó** là đáy hộp, danh sách nhả kẻ + khoảng thở cho nó. Nhưng khi mốc quà chưa đạt, khối quà bị `display:none` bởi rule tạm ẩn — thiếu nhánh `:has()` này thì hộp **mất hẳn viền dưới** đúng trong trường hợp đó.

**Đo lại — desktop:** đỉnh hộp trái `185` = card phải `185`, **lệch 0**; `title x=40` = `chọn tất cả x=40` = `nội dung món x=40`; `#cartList` nhả `bdB=0 pb=0`, `#orderGift` giữ `bdT/bdB=0.8px pb=16`, **khe giữa hai khối = 0**. **Mobile:** chuỗi liền mạch `y=60→112→147→1171→1381` (một hộp duy nhất), khe = 0, `title x=16` = `nội dung món x=16`. **Trường hợp mốc quà rớt:** bỏ tick toàn bộ → `#orderGift display:none` và `#cartList` lấy lại `bdB=0.8px pb=16px` — nhánh `:has()` chạy đúng. `skin-mp` và bộ da Mặc định không lệch số nào. Console sạch trên tab mới.

> Bẫy đo đạc gặp lại: đo ngay sau `go('cart')` thì khe ra **10px** vì `.rise` chưa chạy xong transform. Phải tắt `transition/animation/transform` trước khi đọc `getBoundingClientRect`.

## Quick add: đồng bộ hàng PRE-ORDER (26/08/2026, CẢ 2 BẢN)

User phát hiện: *"ở pdp sản phẩm số 1 là preorder nhưng có vẻ quick add chưa có sync với bên trong nhỉ"*. Đo lại cả chuỗi thì đúng — **sheet quick add là mắt DUY NHẤT bị đứt**:

| Bước | Trước 26/08 |
|---|---|
| Card ở PLP | ✅ badge "Pre-order" |
| **Sheet quick add** | ❌ không một chữ nào; nút in cứng "Thêm vào giỏ hàng" |
| Sheet xác nhận đã thêm | ✅ "Pre-order · Nhận hàng dự kiến 30/09/2026" |
| Giỏ · Checkout | ✅ badge + "Nhận hàng dự kiến" |
| PDP | ✅ badge + "Dự kiến giao hàng vào ngày …" + nút "Đặt trước" |

Data vốn đã chảy đúng (`quickAddCta(p)` nhận cả object `p`, và ngay dưới đó *có* truyền `preorder: p.preorder` sang sheet xác nhận) — chỉ nhãn nút là không đọc. Điều kiện dùng `p.preorder` (ngày nhận dự kiến, nguồn duy nhất ở `PRODUCTS`), **không thêm cờ riêng** kẻo sinh 2 nguồn sự thật.

**2 khổ có 2 lối quick add khác nhau, nên thông tin đặt ở 2 chỗ khác nhau:**

| | Lối quick add | Nhãn nút / hành động | Ngày nhận dự kiến |
|---|---|---|---|
| `index.html` | sheet quick add (nút CTA ghim đáy) | `Đặt trước` | dòng 12/16 secondary **ngay trên nút** — đúng khuôn `#pdpCta` của PDP |
| `desktop.html` — `skin-mt` | **dải hover trên card** (`.pc-quick`) | title `Đặt trước` 14/20 | dòng `Nhận hàng dự kiến <span>30/09/2026</span>` 12/16 ngay dưới title |
| `desktop.html` — bộ da khác | dialog quick add 2 cột | `Đặt trước` | (chưa có — dialog chỉ sửa nhãn nút) |

Lý do desktop đặt ở dải hover: ở `skin-mt` (gồm cả bộ da vào-trang) **nút giỏ tròn bị ẩn** và dải size hover LÀ lối thêm nhanh duy nhất từ card — bấm thẳng một ô size là vào giỏ, không qua dialog. Nên câu "đang đặt trước, nhận ngày nào" phải nằm ngay trên dải đó.

**Tách `.pc-sizes` thành 2 tầng**: `.pc-quick` = tấm (ghim đáy ảnh, nền mờ + blur, hover mới hiện) · `.pc-sizes` = lưới size bên trong. Trước đó một phần tử gánh cả hai vai, mà nhồi title vào lưới 4 cột thì phải `grid-column: 1/-1`, và biến thể `.is-few` lại đổi sang `grid-auto-flow: column` nên item full-width ở đó vô nghĩa. `data-pc-sizes` dời ra tấm ngoài — `pcSizeClick` đọc bằng `closest('[data-pc-sizes]')` nên không phải sửa JS.

> **Title dải hover phải VIẾT CSS TAY, đừng đổi sang utility.** Bộ da vào-trang (`skin-mt skin-li`) bóp mọi utility 14 **và 16** về 12 rồi kéo 500 về 400, nên khai `text-[14px]` là title ra **đúng bằng** chữ trong ô size — mất hẳn bậc. Class tự viết thì bộ da không với tới, y như `.pc-size` vẫn tự khai 12/16. Đo sau sửa: title **14/20 · 400 · `#0a0a0a`** · dòng ngày **12/16 · 400 · `#333`** (ngày `#0a0a0a`) · ô size **12/16** → có bậc thật. Ngày nhấn bằng MÀU chứ không bằng weight vì §1.1 cấm 500 đi với chữ thường.

I18N **không phải thêm key nào**: `'Đặt trước'`, `'Thêm vào giỏ hàng'`, `'Dự kiến giao hàng vào ngày'`, `'Nhận hàng dự kiến'` đều có sẵn. Ngày tách vào `<span>` riêng đúng lối thẻ giỏ đang làm, để node nhãn còn khớp key tĩnh. Đo EN: mobile `Pre-order` + `Estimated delivery 30/09/2026`; dải hover desktop `Pre-order` + `Estimated arrival 30/09/2026`.

### Mốc căn của dải hover: title TRÁI, nhãn trong ô GIỮA (chốt 26/08/2026)

Đường đi của quyết định, ghi đủ để không ai lật lại: bản đầu **giữa** (theo chốt 19/08 của cụm size) → user đổi sang **phải** → user chốt lại **trái**, kèm *"các size bên trong button thì align center như lúc đầu"*.

Nên tấm này **có 2 mốc căn khác nhau, CÓ CHỦ Ý**:

| Chỗ | Mốc căn | Khai ở |
|---|---|---|
| title + dòng ngày | **trái**, thẳng mép trong của tấm | `.pc-quick-head { text-align: left }` |
| nhãn **trong ô** size | **giữa ô** — nguyên bộ số 19/08 | `.pc-size { justify-content: center }` |
| cả HÀNG ô của `.is-few` | **trái**, cùng mốc với title | `.pc-sizes.is-few { justify-content: start }` |

2 chỗ đáng ghi vì lượt căn phải trước đó phải xử mà lượt căn trái thì **không**:

- **`padding-right: 8px` cho `.pc-quick-head`** — cần khi căn phải, vì nhãn size lùi vào 8px (pad ngang của `.pc-size`) nên title lệch 8px so với nhãn (đo được 353 vs 345). Căn trái thì nhãn size đã căn giữa ô → **không còn mép chữ bên trái nào để mà khớp**, title căn thẳng mép trong tấm là xong. Đã gỡ.
- **`grid-column-start` đẩy ô đầu hàng cuối** — cần khi căn phải, vì bộ 6 size để hàng 2 ở cột 1–2, mép phải hụt ~160px so với title. Căn trái thì mặc định của lưới đã đúng. Đã gỡ (đo lại: **0 inline style** trên các ô).

`.pc-sizes.is-few` **không** trả về `center` như bản 19/08: cụm 1–2 ô đứng giữa trong khi title đã căn trái là lệch mốc ngay trong một tấm. Muốn về giữa thì đổi `start` → `center`, một dòng.

Đo sau sửa (desktop 1440, `skin-mt skin-li`) — title, dòng ngày, mép trái ô đầu **và cả 2 hàng** của lưới 6 ô đều trùng một mốc:

| | Mép trong tấm | Title / ngày | Ô đầu từng hàng | Nhãn trong ô đầu |
|---|---:|---:|---:|---|
| SP#1 · 6 size | 36 | 36 · 36 | 36 · 36 | 58–90 trong ô 36–112 → giữa ✓ |
| SP#2 · 2 size (`is-few`) | 381 | 381 | 381 | 394–464 trong ô 381–477 → giữa ✓ |
| SP#3 · Onesize (`is-few`) | 727 | 727 | 727 | 750–799 trong ô 727–823 → giữa ✓ |
| SP#4 · 6 size | 1072 | 1072 | 1072 · 1072 | 1094–1126 trong ô 1072–1148 → giữa ✓ |

Thứ tự `IT 39 → IT 44` không đảo · bấm ô còn hàng (IT 42) vào giỏ 5→6 và sheet xác nhận ra "Pre-order · Nhận hàng dự kiến 30/09/2026" · console 0 lỗi.

> **Còn 1 mìn chưa tháo**: sheet chọn size (`#szAdd`, đường quick add của SP#2/3/5/6) cũng in cứng nhãn ở **3 chỗ** mỗi file (`index.html` + `desktop.html`). Hôm nay chưa lộ vì mấy sản phẩm đó không pre-order; gắn `preorder` cho một trong chúng là đứt y hệt.

## Footer: BỎ khối newsletter (26/08/2026, CẢ 2 BẢN)

Yêu cầu user: *"ở footer bỏ block newsletter"* → *"bỏ ở desktop luôn nhé"*. Gỡ tiêu đề "Cập nhật thông tin mới nhất từ DAFC" + dòng mô tả + cặp input email/nút Đăng ký, **kèm luôn vạch `h-px` đứng ngay sau nó** ở cả 2 file — khối đi rồi thì vạch đó thành sợi kẻ lửng ở mép trên footer, không còn ngăn cách gì.

| | Khối bị gỡ | Con đầu mới của footer | Đo sau sửa |
|---|---|---|---|
| `index.html` | block dọc + `h-px bg-border mx-2` | `div.flex.flex-col.gap-4.py-5.px-2` (logo + địa chỉ) | footer **848px**, 0 `input[type=email]` |
| `desktop.html` | band canh giữa (Figma 2257:110556, tiêu đề 32px) + `h-px bg-border` | `div.flex.gap-6.items-start` (lưới điều hướng) | footer **414px**, pad band `32/40`, `gap-8` còn nguyên |

Cả 2 file: `pt-8` của cha lo khoảng thở nên **không bù padding**. Footer sạch trên `plp · pdp · cart` (+ `privacy` ở mobile), console tab mới 0 lỗi.

**2 hệ quả về CSS/i18n, cả hai đều GIỮ NGUYÊN có chủ ý:**

- 2 key I18N của khối (`'Cập nhật thông tin mới nhất từ DAFC'`, `'Nhận ngay thông tin…'`) giữ lại ở cả 2 file: 3 bản fork desktop vẫn dùng, và bật lại khối thì không phải dịch lần nữa. `'Đăng ký'` / `'Đăng ký thành công'` vốn dùng chung với luồng tài khoản nên không liên quan.
- `.text-[32px]` giờ chỉ còn **đúng một vai ở cả hai file** — số điểm thưởng `span` ở màn Tài khoản — nên nhánh `.text-\[32px\]` của rule `skin-li` mục 2 (`:is(h1,h2,p):is(.text-[18px], .text-[32px])`) **không còn trúng gì ở đâu**. Giữ vì nó là cái chặn: thêm `p.text-[32px]` mới là tự vào bậc trưng bày. Tương tự, nhánh `:not(.text-\[18px\])` của rule nhãn nhóm footer cũng thành rỗng ở mobile.

> **3 bản fork desktop VẪN CÒN khối newsletter** (`desktop-neutral` · `desktop-editorial` · `desktop-atelier`, mỗi bản 1 khối). `home.html` không có khối này.

> **Bẫy đã dính đúng lượt này**: comment HTML thay cho khối bị bỏ nằm TRONG template literal của `footer()`, viết `` `h-px` `` có backtick là đứt chuỗi ngay → `SyntaxError: Unexpected identifier 'h'`, cả file JS chết. Đã bỏ backtick. Lưu ý kèm: console của browser pane **không xoá khi reload**, nên lỗi cũ còn nằm trong buffer sau khi đã sửa — muốn chắc thì mở tab mới rồi đọc console.

## Footer theo `skin-mt`: nhãn nhóm chữ hoa (20/08/2026, CẢ 2 BẢN)

User: *"update lại footer theo skin mt luôn nhé"*.

Footer là **chỗ cuối còn sót** của bộ da: nó có 6 **nhãn nhóm đứng trên danh sách** — đúng cái vai mà `skin-mt` đã viết hoa ở 3 chỗ khác (nhãn menu drawer · nhãn nhóm mega panel · tiêu đề mục bộ lọc) — nhưng vẫn đang chữ thường. Kéo về cùng bậc nhãn: **12/16 + chữ hoa**, weight để blanket của bộ da lo (400), tracking kế thừa `body` (0.5px). Chữ hoa là đòn bẩy **duy nhất**, không nâng weight — đúng lý do đã chốt ở bộ lọc.

6 nhãn: `Liên hệ với chúng tôi` · `Chăm sóc khách hàng` · `Chính sách` · `Theo dõi chúng tôi` · `Chấp nhận thanh toán` · `Đối tác vận chuyển`.

**Bắt nhãn nhóm bằng CẤU TRÚC, không bằng danh sách chuỗi** — chỗ khó của việc này:

| Mảnh selector | Loại được gì |
|---|---|
| `div:not(:has(img)) > p.font-medium` | cột nào chứa **logo** là khối thương hiệu, `p` trong đó ("DAFC - A subsidiary of IPPG") là dòng mô tả công ty. Ở **desktop đây là cách duy nhất** phân biệt được: cả 4 cột đều là `p` + `div.flex-col` theo sau, chỉ khác ở chỗ có logo hay không |
| `:not(.text-\[18px\])` | tiêu đề newsletter "Cập nhật thông tin mới nhất từ DAFC" — tiêu đề khối, không phải nhãn danh sách. *(26/08: mobile đã **bỏ khối newsletter** nên nhánh này không còn trúng gì ở `index.html`; giữ để 2 file khai giống hệt — desktop vẫn còn khối đó)* |
| `.acc-trigger > span:first-child` | mobile gói 3 nhóm link vào **accordion** nên nhãn nằm trong `span`; desktop trải 4 cột nên không có nhánh này. Giữ trong selector để 2 file khai giống hệt |

**Hook `.bg-secondary.mt-4`** = footer ở cả 2 khổ (mobile `bg-secondary pt-8 pb-8 px-2 mt-4`, desktop `bg-secondary mt-4`) và **không trúng panel ưu đãi ở giỏ** (`py-6 px-4 bg-secondary …`, không có `mt-4`) — chỗ đó cũng có `p.font-medium` ("Ưu đãi chương trình DAFC Rewards", "Tổng cộng") mà viết hoa lên là sai.

**Không đụng vách accordion footer.** Bộ da đang để `#dfdfdf` (chốt 18/08 "nội dung nhẹ nhàng hơn"). Hệ gạch `#ececec` chỉ nhạt hơn nền `#f2f2f2` đúng **6/255** nên đưa về đó là mất luôn vạch.

**Đo lại:** `skin-mt` ở cả 2 file ra **6/6 nhãn `12px uppercase`**, còn "Cập nhật thông tin…" (`18px`) và "DAFC - A subsidiary of IPPG" giữ `tt=none`. Quét rò rỉ: chữ hoa **ngoài** footer ở `plp · pdp · cart · checkout` = **0** ở mobile, và **0** ngoài footer+nav ở desktop. `skin-mp` và bộ da Mặc định ra `14px tt=none` cho cả 6 nhãn — không lệch số nào. Console sạch trên tab mới.

## Gỡ đen đặc #000000 khỏi bảng token của 2 bộ da (20/08/2026, CẢ 2 BẢN)

User: *"trong bộ color system của tôi hình như không có màu đen 000000, bạn đang sử dụng mã đen 0000 khá nhiều, hãy kiểm tra lại nhé"*. **Kiểm rồi — user đúng.**

**`tokens.css` không có token nào là đen đặc.** Mực đậm nhất của hệ:

| Token | Mode D | Mode GM |
|---|---|---|
| `--general-foreground` · `--general-primary` | `#0a0a0a` | `#0a0a0a` |
| `--general-body-text` | `#404040` | — |
| `--unofficial-contrast` | `#010101` | `#0a0a0a` |
| `--surface-dark` | `#262626` | — |

`#000000` chỉ xuất hiện **5 lần, tất cả đều KÈM ALPHA**: `--unofficial-backdrop: #00000099` · `--unofficial-ghost-hover: #0000000d` · `--unofficial-outline-hover: #00000008` · `--unofficial-outline-active: #0000000d` · `--unofficial-ghost-active: #0000001a`. Tức trong hệ này đen đặc là **lớp phủ**, không phải **mực**.

**Đen đặc nằm ở đâu:** chỉ trong **khối bộ da**, không có ở base. `index.html` 21 chỗ code · `desktop.html` 27 chỗ code. Nguồn: số đo mytheresa (18/08 — "mực ĐEN THẬT" từng được ghi là nét nhận dạng của `skin-mt`) và mrporter (20/08 — đo trang chủ ra `#000`).

**Đã kéo hết về `#0a0a0a`** — lệch 10/255 nên mắt không phân biệt được, mà bộ da không còn đẻ sắc nằm ngoài color system. Ba ranh giới khi thay:

- **Giữ nguyên mọi giá trị có alpha** (`rgba(0,0,0,.5)`, `.05`, `.04`…) — hệ token gốc cũng dùng đen alpha, nên chúng đúng hệ.
- **Giữ nguyên chữ `#000` trong comment ghi số đo** của site tham chiếu — đó là ghi chép đo đạc, sửa đi là làm sai lịch sử. Thay bằng 3 mẫu code chính xác (`: #000000;` · `: #000;` · `solid #000;`) nên 14 dòng comment ở mobile và 17 dòng ở desktop **không bị đụng**.
- **Bộ da "Mặc định" không đổi một số nào** — nó vốn đã đọc thẳng từ `tokens.css`.

**Đo lại:** `skin-mt` và `skin-mp` ở cả 2 file ra `foreground = primary = contrast = surface-dark = popover = #0a0a0a`, `backdrop` vẫn `rgba(0,0,0,.5)`. Bộ da Mặc định giữ `contrast #010101` · `surface-dark #262626` · `backdrop #00000099`. Quét **mọi phần tử có chữ** ở `plp · pdp · cart · checkout`: **0 chữ nào còn render `rgb(0,0,0)`** ở cả 2 file. Console sạch trên tab mới.

> `body` vẫn báo `color: rgb(0,0,0)` — đó là giá trị mặc định của trình duyệt cho thẻ `body`, không phải token; đã kiểm là **không phần tử chữ nào kế thừa nó** (mọi chữ đều đi qua class `text-*`). Muốn triệt để thì khai `body { color: var(--general-body-text) }` ở base — chưa làm vì đó là đổi mặc định toàn site, ngoài phạm vi câu hỏi.

**Quy ước từ nay:** cần đen thật cho một bộ da thì **thêm token vào color system trước**, đừng khai thẳng hex trong khối bộ da.

## Bộ lọc: chốt cứng thang chữ 14 / 12 cho 2 tầng tiêu đề (20/08/2026, CẢ 2 BẢN)

User: *"ở filter, dialog title filter sẽ font 14 UPPERCASE, cate danh mục …. sẽ UPPERCASE font size 12"*.

**Hoá ra hai bản đang ra hai bộ số khác nhau** dù markup giống hệt — vì mỗi bản có khối blanket thang chữ riêng của bộ da:

| | Trước — mobile | Trước — desktop | Nay (cả hai) |
|---|---|---|---|
| Tiêu đề panel | `18` | `16` | **`14/20` hoa** |
| Tiêu đề mục | `12` | `14` | **`12/16` hoa** |
| Cate / thương hiệu bên trong | `12` thường | `12` thường | không đổi |

**Điểm đáng ghi: mobile ra `12` cho tiêu đề mục là ĐÚNG MỘT CÁCH TÌNH CỜ** — markup để `text-[16px]`, và blanket của bộ da kéo `.text-[16px]` xuống 12. Cùng markup đó ở desktop lại ra 14 vì blanket bên kia khác. Nên nay **khai thẳng cỡ chữ tại chính rule của tầng đó** ở cả 2 file: hai bản chốt cùng một số, và sau này ai sửa blanket cũng không kéo tầng chữ này đi theo.

Ghi đè ghi chú cũ: mục "Bộ lọc: TIÊU ĐỀ MỤC = HOA" từng ghi *"ở desktop thì thêm 1 nấc cỡ chữ 14 vs 12"* — **không còn đúng**, hai bản nay bằng nhau.

Ba tầng chữ trong panel sau khi chốt: **tiêu đề panel `14` hoa** → **tiêu đề mục `12` hoa** → **cate `12` thường**. Hai tầng dưới cùng cỡ, chỉ chữ hoa tách chúng — đúng lý do đã chốt 19/08 (không đẻ thêm cỡ chữ, không nâng weight).

**Đo lại — cả 2 file:** `skin-mt` ra `title 14px/20 w400 uppercase` · `tiêu đề mục 12px/16 w400 uppercase` · `cate 12px/20 w400 none` («Quần áo») — **giống hệt nhau ở mobile và desktop**. `skin-mp` và bộ da Mặc định ra `18/28 w500 none` và `16/24 w300 none`, không lệch số nào. Console sạch trên tab mới ở cả 2 file.

## Cookie: đảo thang nút — 1 primary dưới cùng (20/08/2026, CẢ 2 BẢN)

User: *"cục cookies sẽ cho button primary là đồng ý nằm dưới cùng, 2 lựa chọn reject và tùy chọn sẽ nằm chung 1 hàng bên trên button đồng ý"*.

**Đảo lại chốt 17/08.** Bản cũ: "Từ chối tất cả" + "Chấp nhận tất cả" **ngang cấp** cùng hàng, cả hai nút đặc; "Tùy chọn Cookie" nút viền full-width ở dưới.

| | Trên | Dưới |
|---|---|---|
| Cũ (17/08) | `[Từ chối ĐẶC]` `[Chấp nhận ĐẶC]` | `[Tùy chọn — viền, full]` |
| Nay (20/08) | `[Từ chối — viền]` `[Tùy chọn — viền]` | `[Chấp nhận — ĐẶC, full]` |

**"Từ chối tất cả" phải xuống nút viền theo.** Nếu để nguyên nút đặc thì hàng trên có một nút đặc + một nút viền → đọc ra là **hai cấp khác nhau**, trong khi user gọi cả hai là "lựa chọn". Nay hàng trên là hai nút cùng khuôn, và cả cụm còn **đúng một** nút đặc — đúng nghĩa "primary".

> ⚠ **Ghi lại cho lần rà soát pháp lý:** "Từ chối" vẫn giữ **nguyên cỡ, nguyên chiều cao, nguyên cỡ chữ** như "Chấp nhận" (mobile `h-12`, desktop `h-11`, cùng `font-medium`) — chỉ khác mặt nền. Không thu nhỏ, không đẩy thành chữ mờ, không giấu sau một lớp nữa. Nếu sau này khách yêu cầu chuẩn GDPR chặt hơn thì chỗ cần xem lại là **độ nổi của nút Từ chối so với Chấp nhận**, không phải vị trí.

Sửa ở **markup base**, không phải bộ da — đây là thứ tự và cấp bậc nút, mọi bộ da đều dùng chung. Nhãn giữ nguyên nên **không đụng key i18n** nào.

**Đo lại:** mobile ra hàng trên `Từ chối tất cả` + `Tùy chọn Cookie` cùng `167×48` nền trắng viền 1px, dưới cùng `Chấp nhận tất cả` `341×48` nền `rgb(0,0,0)` chữ trắng. Desktop ra `181×44` / `181×44` rồi `370×44`. **Handler vẫn sống sau khi đổi chỗ markup:** bấm "Tùy chọn Cookie" ở cụm đáy mobile → `intro` ẩn, `prefs` hiện, bấm "Quay lại" → về đúng view đầu; desktop → `#cookiePrefs` bỏ `pointer-events-none` và `aria-hidden` về `false`. Console sạch trên tab mới ở cả 2 file.

## Tiêu đề panel "Bộ lọc" cũng chữ hoa (20/08/2026, CẢ 2 BẢN)

User: *"quay lại filter cho title 'Bộ lọc' khi bật bộ lọc sẽ uppercase lên luôn nhé"*.

**Đây là thứ đã từng bị GỠ hồi 19/08.** Bản đầu của mục "Bộ lọc — hệ gạch đồng bộ" bê nguyên cả cụm linh kiện mytheresa, trong đó có *"tiêu đề panel 16px chữ hoa"*, và user bắt trả lại nguyên trạng vì sai hướng. Nay user gọi lại **đích danh mỗi chữ hoa** → làm đúng bấy nhiêu: **không** kèm đổi cỡ chữ (giữ 18px của dự án, không hạ về 16 như bản bị gỡ), **không** đổi weight.

```css
html.skin-mt #filterSheet div:has(> #filterClose) > p { text-transform: uppercase; }
```

**Bám `div:has(> #filterClose) > p`, không bám cỡ chữ** — hàng tiêu đề là hàng **duy nhất** chứa nút đóng, nên selector không vỡ khi thang chữ đổi. Dùng chung được cho cả 2 file dù chúng khác nhau ở chỗ khác (mobile là bottom-sheet có grabber, desktop là drawer có kẻ dưới header).

Ba tầng chữ trong panel nay đọc ra rõ: **tiêu đề panel HOA** → **tiêu đề mục HOA, nhỏ hơn một nấc** → **cate/thương hiệu chữ thường**.

**Đo lại:** mobile `skin-mt` ra `"Bộ lọc" 18px/28 w400 uppercase ls 0.5px` với tiêu đề mục `12px uppercase`; desktop ra `16px w400 uppercase` với tiêu đề mục `14px uppercase` (desktop có thêm một nấc cỡ chữ, đúng như đã chốt). `skin-mp` và bộ da Mặc định ra `tt=none` ở cả hai — không đụng. Console sạch trên tab mới ở cả 2 file.

## Rà lại trang giỏ bằng checklist redesign (20/08/2026, CẢ 2 BẢN)

User: *"hãy kiểm tra và nâng cấp cart mà bạn vừa tạo cho nó chuẩn chỉnh hơn"*. Chạy audit đo thực tế trên màn giỏ, đối chiếu từng điểm với quy ước dự án. **Nửa danh sách hoá ra là đúng sẵn — không sửa:**

| Checklist nhắc | Đo được | Xử lý |
|---|---|---|
| Chữ dưới 12px | 9–10px, nhưng **toàn bộ** là wordmark (`VISA` `MASTER` `JCB` `AMEX` `MOMO` `TIKINOW`) + chấm đếm giỏ + badge "Quà tặng" | **giữ** — đúng ngoại lệ "wordmark thương hiệu và mã kỹ thuật" |
| Thiếu hover / active / focus | có `.press`, **3 rule `:focus-visible`**, transition 0.12–0.18s trên nút và ô tick | **giữ** |
| Trộn nhiều họ xám ở viền | `#ececec` ×20 là **kẻ chia khối**, `#dfdfdf` ×11 là **viền control** (ô nhập, nút Áp dụng, ô tick) — hai vai khác nhau nên hai sắc là có lý, và cùng một họ trung tính | **giữ**, không gộp |
| Thiếu empty state | `cartEmptyHTML()` đã có, đã kiểm ở vòng trước | **giữ** |

**Ba lỗi thật, đã sửa:**

1. **Số tiền chạy chữ số tỉ lệ.** `.price` và `#cartTotal` đo ra `font-variant-numeric: normal`. Màn giỏ xếp giá theo **cột** ở mép phải (giá từng món · tạm tính · các dòng giảm · tổng cộng), mà chữ số tỉ lệ của Montserrat có bề rộng khác nhau → cột số răng cưa, và số lượng ở stepper nhảy ngang khi đổi `1 ↔ 2`.
   ```css
   [data-screen="cart"] { font-variant-numeric: tabular-nums; }
   ```
   Đặt **ở base, không trong bộ da** — chuyện đọc số, đúng cho cả 3 bộ da. Kế thừa nên phủ luôn số phát sinh về sau; font không có bảng `tnum` thì trình duyệt bỏ qua, không hỏng gì.

2. **Nhịp dọc lệch — 3 chỗ.** Đo ra: hộp danh sách `pt=16 / pb=8`, hộp summary `pt=24 / pb=16` (cả hai **nặng đầu nhẹ chân**), và khe giữa các hộp chạy `12 · 24 · 12 · 40 · 16` vì phần bọc thẻ khuyến mãi mang `py-6`. Sửa: `#cartList` → `pb: 16`, `#cartCta` → `pb: 24`, phần bọc thẻ khuyến mãi bỏ padding dọc và dùng `margin-top: 12` như mọi hộp khác. Nay đỉnh–đáy cân và khe đều 12.

3. **7/9 ảnh trong giỏ để `alt` rỗng** — ảnh sản phẩm và ảnh quà. Đây là ảnh **mang thông tin**: ảnh sản phẩm còn là đường dẫn vào PDP (`data-product`) và là thứ phân biệt các dòng; để rỗng là trình đọc màn hình bỏ qua hẳn, người dùng nghe hết dòng quà mà không biết quà là món gì. Nay `alt` mang `brand + name` (ảnh quà thêm tiền tố "Quà tặng"). Sửa ở **markup base**, không phải bộ da.

> **Lỗi tự gây, bắt được ngay:** comment giải thích tôi thêm vào cạnh 4 thẻ `<img>` có chứa **dấu backtick** — mà cả khối markup đó nằm **bên trong một template literal**, nên backtick đóng chuỗi sớm và làm **cả script 512KB không parse** (`go`/`applySkin` thành `undefined`, trang trắng). Đã bỏ hết backtick trong các comment nằm trong template literal và ghi cảnh báo ngay tại chỗ. Bài học vận hành kèm theo: `read_console_messages` **giữ log cũ của tab qua điều hướng** — lỗi cũ vẫn hiện sau khi đã sửa, phải mở **tab mới** mới xác nhận được là sạch.

**Đo lại:** mobile `skin-mt` ra hộp danh sách `pb=16`, phần bọc thẻ khuyến mãi `pt=0 pb=0 mt=12`, hộp summary `pt=24 pb=24`; `.price` và `#cartTotal` ra `tabular-nums`; **alt rỗng = 0/9**. Desktop ra `#cartList pb=16`, phần bọc khuyến mãi `mt=12`, `alt` rỗng = 0/15. `skin-mp` và bộ da Mặc định giữ nhịp cũ (`cartList pb=0`, phần bọc `pt=24`), riêng `tabular-nums` áp cho cả ba — đúng chủ ý. Console sạch trên **tab mới** ở cả 2 file.

## Đóng hộp trang giỏ theo Maison Kitsuné (20/08/2026, CẢ 2 BẢN)

User: *"https://maisonkitsune.com/ww/checkout/cart tham khảo cách hiển thị của maison kitsune rồi adapt vào trang cart"* → *"đây là hình tôi chụp được từ maison kitsune, hãy học cách họ đóng hộp các block cart"*.

> **Không đo được, đọc từ ảnh.** Chrome chặn domain này ở tầng chính sách; Browser pane vào được nhưng dính Cloudflare *"Just a moment…"*. Nên đây là lần đầu trong dự án **không có computed style** của site tham chiếu — chỉ có ảnh chụp desktop mà user gửi.

**Ba điểm đóng hộp học được:**

1. **Tên hộp nằm BÊN TRONG hộp.** "CART (5 ARTICLES)" ở đỉnh hộp trắng, tách khỏi danh sách bằng một kẻ mảnh. Bản của ta trước đó để tiêu đề "Giỏ hàng (n)" đứng **ngoài**, trên canvas — đó là kiểu Dior, không phải kiểu này.
2. **Các món ngăn nhau bằng kẻ mảnh bên trong hộp** — đã làm ở vòng trước, khớp sẵn.
3. **Cột tóm tắt là một hộp gộp đủ**: tổng tiền + nút thanh toán + ô mã giảm giá + hộp con "Shipping and returns".

**Adapt thành 3 hộp:**

| Hộp | Gồm | Cách ghép |
|---|---|---|
| 1 | tiêu đề "Giỏ hàng (n)" · hàng "Chọn tất cả" · `#cartList` | ba phần tử **riêng** trong markup; cho cùng mặt trắng, bỏ khe giữa chúng, kẻ dưới ở hàng "Chọn tất cả" → ra một hộp. **Không sửa markup.** |
| 2 | `#orderGift` (quà theo mốc đơn) | hộp riêng, cùng khuôn |
| 3 | `discountPanel` (ưu đãi + các dòng giảm + **Tổng cộng**) · `#cartCta` (nút Đặt hàng + "Bạn có phiếu mua hàng?") | nối 2 khối liền kề thành một hộp — đúng bấy nhiêu nội dung như hộp "CHECKOUT SUMMARY" của họ |

Thêm `padding-bottom: 8px` cho `#cartList` — bên họ món cuối không sát viền hộp.

**Khổ desktop khớp họ nhiều hơn mobile:** cột phải (tóm tắt + nút + ô mã) vốn đã là `bg-card` + viền → đúng hộp "CHECKOUT SUMMARY", **không phải làm gì**. Nên desktop chỉ cần dựng Hộp 1 + Hộp 2. Selector khác mobile: `.flex-1 > div:has(> h2)` chứ không `> [data-scroller] > div:has(> h2)`, vì cột trái là `.flex-1` và màn giỏ desktop có **2 thẻ `h2`** (cái thứ hai ở cột phải).

**Không bê nguyên:** giữ full-bleed (họ có lề ngoài + padding trong; khổ 375 mà thụt 2 lớp thì nội dung rơi quá sâu), giữ thang chữ và khuôn nút của dự án, **không** đổi chữ sang in hoa như họ.

**Đo lại:** mobile `skin-mt` ra chuỗi liền mạch `y=76→128→153` cho [tiêu đề `bdT` 0.8px `mt=12`] → [chọn tất cả `bdB` 0.8px] → [`#cartList` `bdT=0` `bdB` 0.8px `pb=8`]; `#orderGift` hộp riêng `mt=12`; panel `mt=12` + `#cartCta` liền nhau, cả hai `rgb(255,255,255)`, kẻ đáy ở `#cartCta`. Desktop ra `y=213→278→314` cho cùng ba khối, cột phải vẫn `rgb(255,255,255)` viền `#dfdfdf`. `skin-mp` và bộ da Mặc định: tiêu đề `rgba(0,0,0,0)`, không kẻ, `cartList pb=0` — không lệch số nào. Console sạch cả hai.

## Tạm ẩn dải "Mua thêm… để nhận…" + quà về chung block với món (20/08/2026, CẢ 2 BẢN)

### 1. Tạm ẩn dải mốc quà CHƯA đạt

User: *"tạm thời ẩn block 'Ưu đãi đơn từ 200 triệu / Mua thêm 13.943.000 ₫ để nhận Giày thể thao Greca Court trắng'"*. Đó là phần **teaser** của `orderGiftInner()` — mốc quà kế tiếp chưa đạt, dựng với `data-gift-next`.

```css
[data-gift-next] { display: none; }
#orderGift:not(:has([data-gift-tier])) { display: none; }
```

**Ẩn bằng CSS chứ không xoá trong JS:** `refreshCartGifts` vẫn dựng lại như cũ, nên bật lại chỉ là xoá 2 dòng — không phải khôi phục logic. **Áp cho mọi bộ da** vì đây là chuyện nội dung demo, không phải style.

**Rule thứ hai là chỗ dễ sót:** khi khách bỏ tick sản phẩm thì tạm tính rớt xuống dưới mốc, khối quà theo đơn **chỉ còn teaser** — không ẩn thì ở `skin-mt` còn lại một **tấm trắng rỗng** giữa trang. Đã kiểm: bỏ tick toàn bộ → `#orderGift` ra `display: none`.

### 2. Quà theo sản phẩm về chung block với món

User: *"gift đang nằm rời rạc ra khỏi block thẻ sản phẩm hãy làm cho nó nằm vào chung block để k tạo cảm giác lạc"*.

Nguyên nhân "lạc": `.gift-group` tự tô `bg-accent-0` và chạy **full-bleed**, nên trên tấm trắng của `skin-mt` nó thành một **dải xám cắt ngang** — đọc ra là khối thứ ba, không phải phần đuôi của món.

**Hai việc phải làm cùng nhau** (chỉ làm một là lạc kiểu khác):

```css
html.skin-mt [data-screen="cart"] .gift-group[data-gift-of] { background: transparent; }
html.skin-mt [data-screen="cart"] #cartList .cart-row:not(:first-child) {
  border-top: 1px solid var(--unofficial-border-1);
}
```

- **Bỏ nền riêng** của dải quà → nó nối liền vào món ngay trên.
- **Kẻ mảnh trước mỗi món** (trừ món đầu) → ranh giới ô nay nằm giữa các **món**, nên "món + quà của nó" đọc ra là một ô. Nếu chỉ bỏ nền mà không có kẻ này thì quà lại dính luôn vào món kế tiếp.

`:not(:first-child)` chứ không `+`: dải quà chèn giữa các dòng, kẻ chỉ được rơi vào đầu mỗi món mới.

**Quà theo MỐC ĐƠN trong `#orderGift` giữ nền `bg-accent-0`** — nó không thuộc món nào nên vẫn cần tự tách trên tấm trắng của khối riêng nó.

**Đo lại — cả 2 file, vòng 3 bộ da:** teaser ra `display: none` ở **cả ba**; `#orderGift` vẫn `block` (còn mốc 150 triệu đã đạt) và ra `none` khi bỏ tick hết. `skin-mt`: quà theo SP `rgba(0,0,0,0)`, quà theo mốc `#f7f7f7`, kẻ ngăn món `row0=0` + `row1..4=0.8px`. `skin-mp` và bộ da Mặc định: quà theo SP giữ nền cũ (`#f7f7f7` / `#fafafa`) — không đụng. Console sạch cả hai.

## `skin-mt`: trang giỏ nền xám để nhấn các block (20/08/2026, CẢ 2 BẢN)

User: *"ở trang cart sẽ cho nền màu xám để nhấn các block"*. Câu này không nói bộ da nào — cả `skin-mt` và `skin-mp` khi đó đều đang nền trắng ở màn giỏ (`skin-mp` vừa bị gỡ nền xám ở vòng 6) nên **đã hỏi lại**, chốt: **`skin-mt`**.

**CHỈ màn giỏ.** Màn Thanh toán của `skin-mt` giữ nền trắng — user nói "trang cart", không nói checkout.

**Không phải dựng lại từ đầu:** lấy đúng bản đã chốt sau 5 vòng ở `skin-mp` (mục "Giỏ hàng + Thanh toán của bộ da EDITORIAL"), chỉ đổi tiền tố selector và để `var()` tự lấy token của `skin-mt`:

| Phần | Làm gì | Token `skin-mt` |
|---|---|---|
| canvas `body` + `#viewport` | nền xám | `--unofficial-accent-0` = `#f7f7f7` |
| `#cartList` · `#orderGift` | block trắng, full-bleed, kẻ trên/dưới, khe 12 | `--general-background` + `--unofficial-border-1` = `#ececec` |
| thẻ khuyến mãi | thêm mặt trắng, viền về cùng sắc gạch | |
| khối ưu đãi + tổng tiền | **bỏ** mặt `#f2f2f2`, hoà vào nền — nó chỉ đậm hơn canvas 5/255 nên để lại là mảng lem nhem; 2 thẻ bấm được bên trong vốn đã trắng + viền, chúng mới là block được nhấn | |
| chân trang | giữ nền `#f2f2f2`, thêm 1 kẻ để không dính khối cam kết | |
| dải mờ nút Đặt hàng nổi | fade về `#f7f7f7` thay vì trắng | |

**Nhóm hàng GỘP một tấm, không tách từng dòng** — đúng bài học vòng 3: giỏ 5 món mà tách ra là 5 mảnh vụn. Dải quà `.gift-group` giữ nguyên `bg-accent-0`: nó nằm **trên mặt trắng** nên vẫn tách khỏi dòng hàng; chỉ khi bỏ tấm đi thì nó mới trùng canvas và biến mất.

**Khổ desktop cần ít rule hơn** (4 thay vì 6): cột phải (tóm tắt đơn + tổng tiền) vốn là `bg-card` + viền → tự thành block trắng nổi trên canvas, không phải làm gì. Hai rule của riêng khổ hẹp — khối tổng tiền và dải mờ nút nổi — desktop không có.

**Đo lại:** `skin-mt` màn giỏ ra `body`/`#viewport` = `rgb(247,247,247)`; `#cartList` + `#orderGift` trắng viền `#ececec` `mt=12px`; thẻ khuyến mãi trắng; khối tổng tiền `rgba(0,0,0,0)`; footer `#f2f2f2` + kẻ; `.gift-group` `#f7f7f7` trên mặt trắng; gradient sticky đã sang xám; **desktop thêm** cột phải `rgb(255,255,255)`. `skin-mt` màn **Thanh toán** vẫn `body` trắng. `skin-mp` và bộ da Mặc định không lệch số nào ở cả 2 file. Quét "có gì chìm vào canvas" trên 3 biến thể (vãng lai · đã đăng nhập · giỏ rỗng): **sạch cả 3**. Console sạch.

## `skin-mt`: ô chọn màu ở listing thành VUÔNG (20/08/2026, CẢ 2 BẢN)

User: *"ở skin mt pick màu ở listing hãy cho hình vuông thay vì hình tròn nhé"*.

`.cw` là ô chọn màu trên **thẻ sản phẩm** — dùng ở PLP, hàng gợi ý, kết quả tìm. Không phải swatch ở PDP (chỗ đó là **ảnh**, không phải ô màu) và cũng không phải ô màu trong sheet bộ lọc.

Vuông góc đúng mạch bộ da: mọi radius token của `skin-mt` đã là `0`, chỗ duy nhất còn tròn là mấy ô này vì `rounded-full` khai bằng **utility** chứ không qua token.

```css
html.skin-mt [data-swatches] .cw,
html.skin-mt [data-swatches] .cw > span { border-radius: 0; }
```

**Phải đè cả BUTTON lẫn SPAN con.** Nền màu nằm ở span, không phải ở button: bỏ sót span là ra hình tròn lồng trong khung vuông. Ở desktop khoảng cách này còn rõ hơn — button là khung viền 20px, span màu 16px bên trong. `(0,3,1)` nên thắng utility `rounded-full` `(0,1,0)`, không cần `!important`.

**Đo lại — cả 2 file, vòng 4 bộ da:** `skin-mt` ra `.cw r=0px` **và** `span r=0px` (mobile 18×18, desktop 20×20 + span 16); `skin-mp` và bộ da Mặc định giữ `9999px`. Quét 4 màn `plp · pdp · cart · checkout`: **0** phần tử `rounded-full` nào bị vuông lây ngoài `.cw`, và 8 phần tử tròn ở PDP vẫn `9999px`. Console sạch cả hai.

> Làm **cả 2 bản** dù user không nói "làm desktop": đây là rule của bộ da, mà quy ước của dự án cho khối bộ da là *"khai giống hệt ở index.html và desktop.html"* — để lệch một file là chính bộ da tự mâu thuẫn.

## Bộ da Editorial đo lại từ CHÍNH mrporter.com (20/08/2026, CẢ 2 BẢN)

User: *"https://www.mrporter.com/en-vn/ — giờ thử áp skin mobile của website này vào skin mp"*.

**Bối cảnh:** bộ da `skin-mp` mang tên MR PORTER nhưng số của nó dựng 18/08 từ **net-a-porter.com làm proxy** — hồi đó mrporter chặn cả browser lẫn WebFetch. Nay **Browser pane vào được trang chủ của họ**, nên thay số proxy bằng số thật.

> **Chỉ vào được TRANG CHỦ.** Lần điều hướng thứ hai (`/mens/clothing`) ăn ngay "Access Denied" của bot-detection, và sau đó cả trang chủ cũng bị chặn theo. Nên **không có số của PLP/PDP** (tên sản phẩm, giá, brand) — phần đó vẫn là số cũ. Chrome thì chặn hẳn domain này ở tầng chính sách duyệt web, chỉ Browser pane vào được.

**Đo được ở khổ 375** (thống kê theo số lần xuất hiện):

| Vai | Số đo |
|---|---|
| **Thân bài** (220 lần, áp đảo) | `14/18` · w400 · ls **0.2px** · `#000` · **serif, họ khai thẳng `Georgia`** |
| Chữ phụ | `12/18` · w400 · `#656565` |
| Nhãn hoa | `10–12/16` · w400 · uppercase · ls 0.2px · font **SackersGothicStd** |
| Tiêu đề nhỏ | `16/24` · w500 · `#000` |
| **Nút chính** | nền `#000` · chữ **`#f0f0f0`** · viền 1px · **bo 2px** · `14` w500 · không hoa · cao 40 |
| Mặt nền | `#fff` · `#f0f0f0` · `#eee` · `#cbcbcb` · `#656565` |

**Đổi 8 token** (áp cả 2 file — token màu không phụ thuộc khổ):

| Token | Cũ (proxy) | Mới (số thật) |
|---|---|---|
| `--general-foreground` · `--general-body-text` | `#1a1a1a` | **`#000000`** |
| `--general-secondary-foreground` · `--unofficial-foreground-alt` | `#1a1a1a` | `#2b2b2b` |
| `--general-muted-foreground` · `--unofficial-mid-deprecated` | `#767676` | **`#656565`** |
| `--general-primary-foreground` | `#ffffff` | **`#f0f0f0`** |
| `--general-secondary` · `--general-muted` | `#f4f4f4` | `#f0f0f0` |
| `--focus-ring` · `--btn-focus-ring` | `#767676` | `#656565` |
| `--radius-2` | `0px` | **`2px`** — nút của họ bo 2, và `--radius-2` đúng là nấc `rounded-xs` mà nút chính dùng; 4 nấc còn lại giữ 0 |
| `--font-app` | `'Lora', …` | **`Georgia, 'Lora', …`** — họ khai thẳng Georgia; Lora tụt xuống làm lưới an toàn cho máy thiếu Georgia |
| `body { letter-spacing }` | `0.01em` | **`0.2px`** — họ dùng px CỐ ĐỊNH ở cả 14 lẫn 12, không phải em |

**Một chỗ CỐ Ý KHÔNG theo số đo — nhãn hoa giữ `0.15em`.** Nhãn hoa của họ đo ra `ls 0.2px`, nhưng nó chạy bằng **SackersGothicStd**, một Gothic bản thân đã rất rộng chân. Ta không có font đó; hạ tracking về 0.2px trên Georgia/Lora là nhãn dính chùm, mất hẳn chất eyebrow. Giữ `0.15em` để bù phần rộng mà font của họ có sẵn — đúng bài học "tham chiếu ≠ bê nguyên". Muốn sát hơn thì hạ dần `0.15 → 0.1em`, đừng lấy thẳng 0.2px.

**Không đổi khuôn nút.** Của họ `14px w500 cao 40`, của ta `16px w400 cao 48` — đó là khuôn nút của dự án, đổi là đụng layout chứ không còn là bộ da.

**Đo lại:** `skin-mp` ở cả 2 file ra `fg=#000000 · muted=#656565 · sec=#f0f0f0 · primaryFg=#f0f0f0 · r2=2px`, `body ls=0.2px font=Georgia color=rgb(0,0,0)`; nút Đặt hàng ra `bg #000 · chữ rgb(240,240,240) · bo 2px`. `skin-mt` (`#000`/`#666666`/`#f2f2f2`/`#ffffff`/`r2=0`/`ls 0.5px`/Montserrat) và bộ da Mặc định (`#0a0a0a`/`#737373`/`#f5f5f5`/`#fafafa`) **không lệch số nào**. Hai màn giỏ/thanh toán làm theo Dior vẫn chạy nguyên: canvas `#f7f7f7`, tấm trắng, footer nay `#f0f0f0` — **tách khỏi canvas rõ hơn trước** vì `--general-secondary` vừa xuống một nấc. Console sạch cả hai.

## Giỏ hàng + Thanh toán của bộ da EDITORIAL (19–20/08/2026, CẢ 2 BẢN)

> **⚠ ĐỌC VÒNG 6 TRƯỚC.** Năm vòng đầu dựng theo **Dior** (nền xám, khối trắng); vòng 6 user đổi hướng sang **MR PORTER** và phần nền xám **đã bị gỡ**. Các vòng 1–5 giữ lại làm hồ sơ số đo, không còn là mô tả code hiện tại.

### Vòng 1–5 — hướng Dior (đã gỡ)

Ba vòng yêu cầu, ghi đủ vì hai vòng đầu **đã sai và đã bị gỡ**:

1. *"từ màn cart, checkout của skin mt hãy thử áp dụng style có nền nhúng màu xám nhẹ và trắng các block tiêu biểu như dior.com/en_us/couture/basket"*
2. *"ở bản mobile của dior họ dùng màu background là một màu xám nhạt, CHỈ CÓ CÁC THẺ trong giỏ hàng là đang dùng màu nền trắng; khi đi đến checkout thì vẫn giữ màu nền xám và CÁC LỰA CHỌN sẽ trắng lên"*
3. *"cho nguyên nhóm thẻ sản phẩm ở cart group lại như cũ, còn lại thì giữ nguyên và tạo luôn bản desktop"* + *"lưu style này vào skin editorial nhé, hiện tại bản skin mt đang mặc định nên đừng chỉnh sửa"* + *"move style sang skin editorial và roll back trả lại skin mt như bản trước khi update cart"*

**⚠ STYLE NẰM Ở `skin-mp` (Editorial · MR PORTER), KHÔNG PHẢI `skin-mt`.** `skin-mt` là bộ da mặc định khi vào trang (chốt 19/08, xem mục riêng) nên thử nghiệm phải nằm ở bộ da người ta **phải tự bật** — không đụng thứ khách mở ra là thấy ngay. `skin-mt` đã **roll back sạch** ở cả 2 file: không còn rule nào của mục này trỏ vào nó, đo lại ra đúng số cũ.

**2 lần sai đã gỡ:**

- **Vòng 1 — đo nhầm khổ.** Mình đo bản **desktop** của Dior (ở đó cột phải đúng là một tấm trắng liền) rồi suy ra cho mobile → nâng gần như mọi khối lên tấm trắng. Nền xám khi đó chỉ còn là mấy khe hở 12px, tức **vẫn là trang nền trắng** thêm vài đường kẻ.
- **Vòng 2 — tách nhóm hàng thành thẻ rời.** Đúng cách Dior làm khi giỏ chỉ có 1 món, nhưng giỏ demo 5 món thì thành 5 mảnh vụn, mất cảm giác "một danh sách". Nay nhóm hàng **gộp lại một tấm** như bản gốc.

**Tham chiếu xem TẬN NƠI, đúng khổ mobile** (Chrome trên phiên user đã đăng nhập, giỏ có hàng + địa chỉ đã lưu, cửa sổ thu về `innerWidth = 414`), đọc computed style:

| Thứ | Dior mobile | Dùng gì ở ta |
|---|---|---|
| `body` — kể cả thanh header | `#f8f8f8`, header chỉ có kẻ dưới `#e5e5e5` | `var(--unofficial-accent-0)` = **`#f7f7f7`** |
| **Thẻ sản phẩm** | `#fff`, **không viền**, lề ngang 16 | `#cartList` là **một tấm** cho cả nhóm, full-bleed (xem QĐ 1) |
| Ô ảnh trong thẻ | `#f2f2f4` — mặt xám riêng, nằm TRONG mặt trắng | đã có sẵn (`bg-secondary`) |
| **Thẻ lựa chọn** (gói quà, phương thức giao, PayPal, Help & Services) | `#fff` + viền `0.8px #e5e5e5`, bo 4–8 | `.opt` / `richRadio` / ô nhập **vốn đã** `bg-background` + viền — không phải làm gì |
| "Total / Subtotal / Delivery / Taxes" | **không có tấm** — chữ nằm trần trên xám; chỉ ô "Express · Tue, Aug 25 · Free" (một lựa chọn) mới trắng | panel ưu đãi + tổng tiền bỏ mặt `#f4f4f4`, hoà vào canvas |
| Checkout | tiêu đề bước, câu dẫn, ghi chú đều nằm trần; bước chưa tới ("2. Shipping method") chỉ là chữ mờ | `.ck-sec` trong suốt ở mọi trạng thái |

**Luật rút ra: nền xám là MẶC ĐỊNH; chỉ thứ CHỌN ĐƯỢC hoặc là MÓN HÀNG mới trắng.** Chữ, tiêu đề, tổng tiền, ghi chú, nút — để trần trên nền. Đây là lý do bản viết lại **ngắn hơn** bản đầu: phần lớn thẻ lựa chọn của dự án vốn đã `bg-background` + viền, nền trang chuyển xám là chúng tự nổi lên, không cần rule nào.

Số lấy từ **bảng token có sẵn của bộ da, không đẻ sắc mới** — cùng bài học với `--general-background-blur`: hệ token đã có ô đúng vai thì dùng nó, đừng pha tay. Bo góc **0** vì bộ da này vuông góc mọi chỗ (họ bo 4).

**THAM CHIẾU ≠ BÊ NGUYÊN** (bài học của mục bộ lọc, cùng ngày): không mượn linh kiện nào của Dior, **không đụng markup/layout**; tắt `skin-mp` là về y như cũ.

Cái gì trắng, cái gì ở lại nền xám:

| Màn | Trắng | Ở lại nền xám |
|---|---|---|
| Giỏ hàng | `#cartList` và `#orderGift` — mỗi cái **một tấm liền** cho cả nhóm · thẻ khuyến mãi · 2 thẻ bấm được trong panel (Rewards · "Ưu đãi & khuyến mãi") — vốn đã trắng sẵn · **desktop**: cột phải `bg-card` cũng vốn đã trắng | tiêu đề "Giỏ hàng (n)" · hàng "Chọn tất cả" · panel ưu đãi + **tổng tiền** · cụm nút Đặt hàng + phiếu mua hàng · khối cam kết · footer giữ nền cũ, chỉ thêm 1 kẻ |
| Thanh toán | `.ck-sum` (mobile, sticky nên **bắt buộc** phải đục) · thẻ địa chỉ / phương thức giao / phương thức thanh toán / ô nhập — vốn đã trắng sẵn · nút seg đang chọn · **desktop**: cột phải `.dk-sticky-side` vốn đã trắng + viền | tiêu đề màn · hộp trạng thái tài khoản · **mọi** `.ck-sec` (mở, xong, chưa tới) · khung `#ckSections` ở desktop · spacer đáy |

**5 quyết định có chủ ý, ghi ra để sau khỏi tưởng là sót:**

1. **Tấm full-bleed thay vì lề 16 như họ.** Nội dung bên trong vốn đã `px-4`; thêm lề ngoài nữa thì chữ rơi về `x=32` trong khi tiêu đề màn ở `x=16`. Full-bleed thì nội dung nằm đúng `x=16` — thẳng cột với mọi thứ còn lại.
2. **Nhóm hàng gộp một tấm, KHÔNG tách từng dòng** (yêu cầu vòng 3). Kèm theo đó `.gift-group` **giữ nguyên** `bg-accent-0` như bản gốc — nó đang nằm trên mặt trắng nên vẫn tách được khỏi dòng hàng. (Ở bản vòng 2, khi mỗi dòng là một thẻ rời thì dải quà nằm thẳng trên canvas và biến mất, phải đảo lên trắng — nay không cần nữa.)
3. **Ba chỗ xám phải nâng một nấc vì nay chỉ còn cách canvas 3/255:** rãnh segmented "Giao hàng / Nhận tại cửa hàng" → `--unofficial-secondary-active` `#ebebeb` (nút đang chọn vẫn `bg-background`, không thì hết đọc ra là đang chọn); kẻ ngăn bước `.ck-sec` và kẻ dưới `.ck-notice` (`--general-secondary`) → `#ebebeb`; kẻ dưới `.ck-sum` kéo từ `--general-border` về `#ebebeb`.
4. **Hộp trạng thái tài khoản bỏ nền, không nâng lên trắng** — bên họ dòng tương đương ("Connected as … / Log out") nằm trần trên xám, và nó là THÔNG BÁO chứ không phải thứ chọn được. Ở mobile nó là `.bg-accent-0` trong `.ck-notice`; ở **desktop nó tô bằng inline style** `background:var(--unofficial-accent-0)` nên phải `!important` mới đè được. Cùng lý do: dải mờ dưới nút "Đặt hàng" nổi (`#cartStickyCta`, chỉ mobile) fade về `#f7f7f7` thay vì trắng, kẻo hiện thành vệt trắng chạy ngang.
5. **Chân trang không đổi màu, chỉ thêm một kẻ.** `bg-secondary` `#f4f4f4` chỉ đậm hơn canvas 3/255 nên dính liền khối cam kết thành một dải. Đổi nền footer là lệch với các màn khác (footer là component dùng chung), nên chỉ thêm `border-top` theo hệ gạch.

**Khổ desktop dễ hơn mobile** vì bố cục 2 cột của dự án đã trùng cách Dior dựng: cột phải (tóm tắt / tổng tiền) vốn là `bg-card` + viền, thẻ lựa chọn vốn `bg-background` + viền. Nên bản desktop chỉ còn **5 rule**: canvas · 2 tấm nhóm hàng · thẻ khuyến mãi · rãnh segmented · hộp thông báo. `#ckSections` cố ý để trong suốt — khung bước không phải thứ chọn được, thứ chọn được là các thẻ bên trong nó.

**Đo lại — cả 2 file, tab mới, bust cache.**

`index.html` bật `skin-mp`: giỏ ra `body`/`#viewport` = `rgb(247,247,247)`, `#cartList` và `#orderGift` trắng viền `#ebebeb` `mt=12px`, `.cart-row` **trong suốt** (đã gộp nhóm), `.gift-group` giữ `#f7f7f7` trên mặt trắng, thẻ khuyến mãi trắng, panel tổng tiền + `#cartCta` + cam kết trong suốt, footer `#f4f4f4` + kẻ `#ebebeb`. Checkout ra `.ck-sum` trắng, `.ck-notice` + cả 3 `.ck-sec` trong suốt, rãnh seg `#ebebeb` với nút active trắng.

`desktop.html` bật `skin-mp`: giỏ ra `body`/`#viewport` = `rgb(247,247,247)`, `#cartList` + `#orderGift` trắng `mt=12px`, thẻ khuyến mãi trắng, **cột phải vẫn `rgb(255,255,255)` không phải sửa**, footer thêm kẻ. Checkout ra `#ckSections` + `.ck-sec` trong suốt, cột phải trắng, rãnh seg `#ebebeb`, hộp thông báo `rgba(0,0,0,0)` (đè được inline style).

**Roll back `skin-mt` — đo xác nhận ở cả 2 file:** `body` và `#viewport` trắng · `#cartList`/`#orderGift` trong suốt, `border-top: 0px`, `margin-top: 0px` · `.gift-group` `#f7f7f7` · panel ưu đãi `#f2f2f2` · rãnh seg `#f2f2f2` · footer không kẻ · hộp thông báo desktop `#f7f7f7`. Bộ da "Mặc định" cũng không lệch số nào.

Quét riêng **"có gì chìm vào canvas không"** (phần tử có nền xám trong khoảng `#f3f3f3`–`#fbfbfb` mà **cha gần nhất có nền cũng đúng màu đó**) trên 5 biến thể mỗi file — giỏ vãng lai · giỏ đã đăng nhập · checkout vãng lai · checkout nhận tại cửa hàng · checkout đã đăng nhập: **sạch 5/5 ở cả 2 file**. Console sạch cả hai.

### Vòng 4 — chữ & nhịp của checkout theo Dior mobile (20/08/2026)

User: *"thử chỉnh sửa lại độ đậm nhạt của màu text cũng như spacing theo đúng của dior vào skin mp"* + 4 ảnh chụp 4 bước checkout mobile của họ.

**Cách lấy số đo — ghi lại vì sẽ cần dùng lại:** cửa sổ Chrome của phiên này **không thu nhỏ được** (`resize_window` báo thành công nhưng `innerWidth` kẹt 1920, cửa sổ đang maximized). Cách vòng được: **nhúng `/en_us/couture/checkout` vào một iframe 414px ngay trên trang dior.com đang mở** — cùng origin nên đọc được `contentDocument`, và vẫn giữ session đăng nhập. Gỡ iframe sau khi đo xong.

| Vai | Dior mobile | Áp vào `skin-mp` |
|---|---|---|
| Khối một bước | `padding: 32px 20px` | `.ck-sec { padding: 32px 0 24px }` (24 + `py-2` sẵn có của thân = 32) · lề ngang **giữ 16**, xem lệch số 1 |
| Tiêu đề bước | `16px/23` serif **w400** | `.ck-title { font-weight: 400 }` (markup đang `font-medium`) |
| — đang mở | `#33383c` | `--general-foreground` `#1a1a1a` |
| — đã xong **và** chưa tới | `#7b8487` — **cùng một xám**, không phải hai nấc | `--general-muted-foreground` `#767676` |
| Tiêu đề → nội dung | 20px | bỏ `height` cố định của `.ck-head` (56 / 72), thay bằng `padding-bottom: 12px` + `py-2` sẵn có |
| Tóm tắt bước đã xong | `12px/17` w400 `#7b8487` | `.ck-done .acc-inner p` → `12px/16` w400 xám, **bỏ luôn** `font-medium` ở dòng tên |
| "Edit" | đi theo màu của bước | `.ck-change` cùng rule màu với `.ck-title` |

**Điểm cốt lõi: họ phân cấp trạng thái bằng MÀU, ta đang bằng `opacity`.** `paintCheckout` ghi `style.opacity = 0.4` **inline** cho bước chưa tới — chồng lên màu xám là ra hai nấc nhạt khác nhau cho hai trạng thái mà bên họ dùng chung một xám. Nên trong `skin-mp` phải `opacity: 1 !important` để gỡ, rồi phân cấp bằng màu. Cơ chế JS **không đụng** — bỏ bộ da là opacity chạy lại như cũ.

**2 chỗ cố ý lệch số đo:**

1. **Lề ngang giữ 16 (`px-4`), không lấy 20 của họ.** Mọi thứ trong 2 màn này — kể cả tiêu đề màn — đang thẳng cột 16; đổi riêng phần bước là gãy cột.
2. **Line-height 17 quy về 16**, dùng cặp `12/16` của thang chữ dự án thay vì chế số mới (quy ước "thang chữ theo text style").

**Bản desktop chỉ lấy phần MÀU + weight, không lấy spacing** — `padding: 32px 20px` và bỏ chiều cao hàng tiêu đề là nhịp của khổ hẹp; khổ 1440 ở ta đang là hàng tiêu đề cao 72 trong một khung có viền, trộn vào là hai hệ đánh nhau.

**Đo lại:** `index.html` bật `skin-mp` — bước đang mở ra `title 16px/24 w400 rgb(26,26,26)` + "Thay đổi" cùng màu, `head h=36 pb=12`, `sec pad=32px 0 24px`; bước chưa tới ra `rgb(118,118,118)` `op=1` `head h=24 pb=0` `sec pad=32px 0`; bấm "Xác nhận" thì bước 0 chuyển xám và tóm tắt ra `12px/16 w400 rgb(118,118,118)`. Khoảng cách giữa 2 tiêu đề bước chưa tới = **89px** (bên họ 87px sau khi quy đổi tỉ lệ ảnh). `desktop.html` ra đúng bộ màu đó, `sec pad` giữ `0px`. `skin-mt` và bộ da "Mặc định" ở cả 2 file giữ nguyên: `sec pad=8px 0`, `head h=56/72`, tiêu đề đen. Console sạch cả hai.

### Vòng 5 — 3 chi tiết còn lệch (20/08/2026)

User: *"cục giỏ hàng của bạn cũng sẽ thụt vô 16px đồng bộ với các nội dung bên dưới, header có logo cũng cho về tone màu xám của nền nhé, các nút edit (thay đổi) sẽ có underline y chang dior"*.

| Việc | Số đo Dior mobile | Làm gì |
|---|---|---|
| Cục "Giỏ hàng của bạn" (`.ck-sum`) | card "Order Summary" có **lề ngoài 16**, chữ bên trong ở 32 | `margin: 12px 16px 0` + **viền 4 cạnh** thay cho mỗi kẻ dưới → mép tấm `x=16 w=343`, chữ `x=33` |
| Header có logo | `#f8f8f8` — **cùng màu canvas**, không phải trắng — tách bằng đúng một kẻ `1px #e5e5e5` | `.navbar` → `--unofficial-accent-0` + kẻ `--unofficial-border-1` |
| "Thay đổi" / "Edit" | gạch **1px** ngay đáy hộp, chữ chừa `padding-bottom: 2px`, vẽ bằng `linear-gradient` cùng màu chữ | `text-decoration: underline` + `thickness 1px` + `offset 2px` |

**Sticky mà có lề vẫn an toàn** — chỗ này đáng lo nên đã kiểm riêng: `.ck-sum` ghim ở `top: 0`, nếu các thẻ cuộn qua bên dưới rộng hơn nó thì sẽ lòi ra hai bên. Đo: thẻ `.opt` và ô nhập đều nằm trong `px-4` → `x=16 w=343`, **trùng đúng biên** với tấm sau khi thêm lề. Hai dải `0..16` và `359..375` luôn là canvas.

**Gạch chân dùng `text-decoration` chứ không chép `linear-gradient` của họ** — đúng linh kiện dự án đã dùng cho mọi link chữ, và gạch tự đổi màu theo chữ khi bước chuyển đen ↔ xám vì `text-decoration` ăn `currentColor`. Chép gradient thì phải khai lại màu hai lần.

**Bản desktop:** lấy gạch chân + header. Header **chỉ ở màn Thanh toán** — ở đó header rút còn mỗi logo nên tương đương thanh header mobile. **Màn Giỏ hàng không đụng**: header desktop ở đó là thanh nav đầy đủ (promo bar + 2 hàng nav + 9 panel mega), đổi nền cả cụm là việc khác hẳn, phải đo lại nav của họ trước. `.ck-sum` không có ở desktop (cột phải thay vai đó).

**Đo lại:** mobile `skin-mp` ra `.ck-sum x=16 w=343 mar=12px 16px 0 bd=0.8px #ebebeb`, chữ trong tấm `x=33`, `.opt x=16 w=343` (trùng biên), navbar **cả 2 màn** `rgb(247,247,247)` + kẻ `#ebebeb`, `.ck-change` `underline 1px offset 2px` màu theo bước. Desktop `skin-mp` ra navbar checkout xám + kẻ, `.ck-change` underline, navbar màn giỏ giữ nguyên `rgba(0,0,0,0)`. `skin-mt` và bộ da Mặc định ở cả 2 file: navbar `color(srgb 1 1 1 / 0.95)` không kẻ, `.ck-sum x=0 mar=0 bd=0`, `.ck-change` không gạch. Console sạch cả hai.

### Vòng 6 — ĐỔI HƯỚNG: bỏ nền xám, về MR PORTER (20/08/2026)

User: *"ở skin mp giờ sẽ k dùng font lora nữa nhé, dùng mặc định montserrat luôn, giờ chỉnh lại cái giỏ hàng và checkout theo style mrporter nhé"*. Hỏi rõ "chỉnh theo MR PORTER nghĩa là gì" thì chốt: **bỏ nền xám, về nền trắng**.

**Hai việc:**

1. **Bỏ serif.** `--font-app` của `skin-mp` về `'Montserrat', ui-sans-serif, …` ở cả 2 file, và cột phông trong `SKINS` đổi `'lora'` → `'montserrat'` để `applySkin` reset đúng (không thì đổi da xong phông cũ còn ghim lại). **Cố ý lệch số đo** — thân bài của MR PORTER là serif, họ khai thẳng `Georgia` — đây là quyết định của user, không phải đo sai. Bộ da nay phân biệt với 2 bộ kia bằng **bảng màu + tracking + khuôn nav**, không còn bằng mặt chữ.
2. **Gỡ toàn bộ lớp nền xám kiểu Dior**, dựng lại 2 màn theo ngôn ngữ MR PORTER.

> **⚠ KHÔNG đo được giỏ/checkout CỦA MR PORTER.** `/en-vn/shoppingbag` trả 404; `/en-vn/checkout` giỏ rỗng nên đá thẳng về trang chủ. Các số dưới đây **suy từ ngôn ngữ đo được ở trang chủ** của họ, không phải từ chính 2 màn đó. Nếu có ảnh chụp 2 màn ấy thì làm lại được cho đúng.

| Gỡ | Thêm |
|---|---|
| canvas `#f7f7f7` trên `body`/`#viewport` | nền trắng — không khai gì, đúng mặc định file |
| `#cartList`/`#orderGift` thành tấm trắng có viền + `margin-top` | **kẻ mảnh** `#ebebeb` ngăn các nhóm: danh sách hàng · quà theo mốc · khối ưu đãi+tổng · cụm Đặt hàng |
| — | **kẻ giữa từng món** trong giỏ: `#cartList .cart-row:not(:first-child)` — dùng `:not(:first-child)` chứ không `+` vì dải quà chèn giữa và phải dính món của nó |
| thẻ khuyến mãi tô trắng | (bỏ — trên nền trắng không cần) |
| kẻ trên chân trang | (bỏ — `#f0f0f0` trên trắng tự tách) |
| rãnh segmented nâng lên `#ebebeb` | (bỏ — `#f0f0f0` trên trắng đọc được) |
| hộp trạng thái tài khoản bỏ nền (2 file) | (bỏ — `#f7f7f7` trên trắng đọc được) |
| gradient nút Đặt hàng nổi fade về xám | (bỏ — gradient trắng gốc lại đúng) |
| header tô xám | header giữ `glass-95` trắng gốc, **chỉ giữ lại 1 kẻ dưới** — "về tone màu của nền" nay chính là trắng |
| `.ck-title { font-weight: 400 }` của Dior | **nhãn hoa nhỏ** cho tên nhóm |

**Nhãn hoa là nét nhận dạng chính của hướng mới.** Trang chủ họ gọi tên nhóm bằng `10–12px uppercase` (font SackersGothicStd). Ta kéo **ba** chỗ về cùng một bậc nhãn `12/16 · w500 · uppercase · ls .15em`: tiêu đề màn giỏ, tiêu đề màn thanh toán, tiêu đề mỗi bước checkout. Chữ hoa ở đây là **ngoại lệ an toàn** của quy ước "không dùng UPPERCASE" — nằm trong bộ da phải tự bật, đúng lý do đã chấp nhận cho nhãn menu của `skin-mt`.

Selector khác nhau giữa 2 file: mobile là `h2` + `.ck-h1`; desktop **không có** `.ck-h1` và màn giỏ có **2 thẻ `h2`** (cái thứ hai là tiêu đề cột phải) → dùng `h2:has(#cartCount)` + `p.text-\[24px\]`.

**Giữ lại từ vòng 4–5** (là chuyện của CHỮ, không phải của nền, và vẫn hợp editorial): nhịp `padding: 32px 0 24px` cho mỗi bước · bỏ chiều cao cố định hàng tiêu đề · phân cấp bước bằng **màu** thay `opacity` · tóm tắt bước đã xong `12/16` xám · "Thay đổi" gạch chân `1px offset 2px` · `.ck-sum` thụt vào 16 kèm viền (user yêu cầu đích danh, không rút lại).

**Một lỗi tự gây, bắt được lúc kiểm:** ở `desktop.html` mình chèn khối chú thích mới **ngay sau** `*/` của comment cũ mà quên mở `/*` → cả đoạn thành text trần trong CSS, parser nuốt luôn rule `.cart-row:not(:first-child)` đứng sau nó. Triệu chứng rất dễ đọc nhầm: `#cartList` có kẻ (rule sau đó) nhưng từng dòng thì không, trông như selector sai chứ không như lỗi cú pháp. Cách phát hiện: duyệt `document.styleSheets` đếm rule khớp `cart-row` — ra **0** trong khi `element.matches(selector)` ra **true**, tức selector đúng mà rule không tồn tại.

**Đo lại — cả 2 file, `skin-mp`:** `body`/`#viewport` trắng; `#cartList` · `#orderGift` · `#cartCta` (và trên mobile cả khối ưu đãi+tổng) đều `border-top 1px #ebebeb`; `row0` không kẻ, `row1..4` có kẻ; tiêu đề giỏ và tiêu đề thanh toán ra `12px w500 uppercase ls 1.8px`; 3 `.ck-title` ra `12px w500 uppercase`, bước đang mở `rgb(0,0,0)` còn 2 bước kia `rgb(101,101,101)`; navbar trắng 95% + kẻ dưới `#ebebeb`; hộp thông báo trở lại `#f7f7f7`; gradient sticky trở lại trắng. Đếm rule trong `document.styleSheets`: **16/16** rule `skin-mp [data-screen=…]` đều được parse. `skin-mt` và bộ da Mặc định: `#cartList` không kẻ, `h2` vẫn `18px none`, navbar không kẻ — không lệch số nào. Console sạch cả hai.

> **Chưa nhìn được bản của MÌNH bằng mắt:** Browser pane của phiên này không compositing nên không chụp được ảnh, và Chrome không cho mở `localhost`/`file://`. Số đo bên ta **chỉ là computed style**.

> **`desktop-editorial.html` NAY ĐÃ LỆCH HẲN** — hỏi 3 lần chưa có chốt nên vẫn không đụng. File đó lấy `skin-mp` làm bộ da **mặc định**, mà `skin-mp` ở 2 file kia vừa đổi: bảng màu (đo lại từ mrporter thật), mặt chữ (Lora → Montserrat), và toàn bộ 2 màn giỏ/thanh toán. Nên hiện `desktop-editorial.html` là bản `skin-mp` **cũ**, không còn khớp với chính bộ da cùng tên ở 2 file kia. Đồng bộ hay để nguyên làm ảnh chụp của hướng cũ — cần user quyết.

> **`desktop-editorial.html` CHƯA ÁP** — cố ý hỏi trước. Ở file đó `skin-mp` là bộ da **mặc định**, nên thêm khối này vào là đổi luôn giao diện mở-ra-thấy-ngay của file, đúng thứ user vừa yêu cầu tránh ở `index.html`/`desktop.html`.

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

Chọn size là **chip grid 5 cột ở cả 6 bản** (28/08/2026 bỏ hẳn dropdown). Câu cũ ở đây còn ghi `pdp4` 4 cột và 4 bản dùng dropdown — lỗi thời, sửa 04/09/2026.

> Đã sửa để đạt quy ước: `pdp4` trước đây info tab bấm ra **bottom sheet** (`.sheet-trigger` + `window.__pdp4Tabs`) → đổi sang accordion, bỏ luôn handler và cầu nối `window.__pdp4Tabs` vì không còn ai đọc. Thống nhất **8** nhãn size guide, `data-toast`, và tiêu đề sheet trong size picker. `pdp5`/`pdp6` dùng vách accordion `border-border` đậm hơn 4 bản kia → về `border-border-1`.
>
> **Vẫn giữ** trả góp ở 3 chỗ KHÔNG thuộc cấp sản phẩm: mục "Thanh toán linh hoạt" trong `camKetSection`, link "Chính sách trả góp" ở footer (data thật của site), và phương thức "Thanh toán trả góp 0% qua thẻ tín dụng" ở checkout.

### Cột thông tin 569 cho cả 6 bản — chốt 04/09/2026

Lệnh user: *"áp dụng layout pdp1 desktop cho các ver pdp còn lại với thay đổi về độ rộng của phần thông tin"*. Chỉ **bản desktop**.

Đến trước lệnh này, thứ duy nhất còn phân biệt bố cục PDP#1 với 5 bản kia đúng là **bề ngang cột info**: dải "Gợi ý mua kèm" khuôn A và kẻ ngăn "Sản phẩm tương tự" đã gom về một khuôn cho cả 6 từ 02/09. Nên "áp layout PDP#1" ở đây quy về đúng con số đó.

| | Trước | Sau |
|---|---|---|
| Class trên `.dk-sticky-info` | `dk-info-wide` (chỉ `pdp`) / `w-[451px]` (5 bản kia) | **`dk-info-wide` cho cả 6** |
| Cột info @1440 | 569 / 451 | **569** |
| Gallery @1440 | 808 / 926 | **808** |
| Ô ảnh @1440 | 402×496 / 461×569 | **402×496** |
| Chip size | 102,6 / 79 | **102,6** |
| Dải ≤1279 | `clamp(292, 44vw, 569)` / `clamp(292, 34vw, 451)` | **`clamp(292, 44vw, 569)`** |

Nhánh 3 ngôi `kind === 'pdp' ? 'dk-info-wide' : 'w-[451px]'` trong `dkScreenPDP` đã gỡ, và rule dải hẹp `.dk-sticky-info.w-\[451px\]` xoá theo — **grep `451px` trong `desktop.html` phải ra 0**.

Đo lại 6 kind × 4 mốc: @1440 và @1279 cả 6 ra cùng số (569 / 562,8 — **không nhảy bậc khi kéo qua mốc 1280**, đúng lý do chọn 44vw hồi 28/08); @1024 info 450,5 · gallery 2 cột ô 253; @768 gallery về 1 cột ô 367. **Không màn nào tràn ngang**, và quét mọi phần tử con trong cột info ở cả 6 kind: **0 chỗ vượt mép, 0 chỗ `scrollWidth` tràn**. Console sạch, `node --check` 2 khối script sạch.

Chưa áp: **3 bản fork skin** (`desktop-neutral` · `desktop-editorial` · `desktop-atelier`) vẫn `w-[451px]` in cứng — chúng đóng băng từ 21/08 và đang thiếu 10 hạng mục cùng một mốc, gỡ riêng một mục không làm chúng khớp lại. **33 khung PDP trong Figma** cũng dựng theo cột 451, muốn khớp thì phải dựng lại.

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

> **Lượt 2 — 26/08/2026, kéo ĐỦ ĐỘ DÀI THẬT (mobile)**: lượt 05/08 mới lấy đoạn mô tả + **một câu `care` đã rút gọn**, nên không đo được ô cần cuộn hay không. Nay mỗi entry mang trọn 3 panel như trang thật (`meta` dòng nhãn:giá trị · `careLead` câu dẫn · `care` thành **mảng bullet nguyên văn**), thêm 2 hằng dùng chung `CARE_SHOES` (bộ bullet giày, 3 đôi dùng chung) + `RETURN_POLICY` (khối đổi hàng, **giống hệt trên cả 6 trang thật**), và một hàm `pdpTabs(i)` dựng nội dung cho cả 6 màn. Số đo từng ô (cả 2 khổ), phương án scroll và các mục chờ chốt: **`_notes/PDP-DATA-THAT.md`**. Làm ở **CẢ 2 BẢN** cùng ngày; desktop vốn chỉ có MỘT renderer `dkScreenPDP` nên chỉ phải đổi `pdpTabs` — kèm bỏ 2 tuỳ chọn `specs` / `returnTab` và 2 hằng `PDP_RETURN_TAB` / `PDP_BRAND_TAB`. **3 bản fork desktop** (`desktop-neutral` / `desktop-editorial` / `desktop-atelier`) vẫn dùng data rút gọn của lượt 1.

> **Chỗ chật lộ ra khi đo desktop** (có từ trước, không do data): cột `.dk-sticky-info` ghim ở `top: 152px` nên chỉ có `900 − 152 = 748px`, mà cột **đóng hết 4 ô đã cao 762px**; mở ô dài nhất (bảo quản túi da) là 1.140px. Đuôi không mất — cha cột cao 1.731px nên sau ~591px cuộn là cột nhả ghim và trôi lên — nhưng cảm giác là cuộn một đoạn thấy trang không nhích rồi cả cột đột ngột trượt. 3 phương án ở PDP-DATA-THAT.md mục 3.2, **chưa chốt**.

**2 chỗ hở của lượt 1 đã đóng**: `features` (danh sách gạch đầu dòng) nay render trong panel Mô tả cho cả 6 màn — kèm luôn 4 dòng thật của SP#4 vốn để mảng rỗng; `specs` đổi tên thành `meta` và render ở **cả 6 màn** thay vì chỉ `pdp2`, gộp thêm thương hiệu + mã SP nên `sku` cũng đã lên mặt. Trang thật có **3 tab**, không có tab "Về thương hiệu" — tab thứ 4 của demo là text tự viết, chưa có nguồn copy thật (đã kiểm cả trang brand `shop.dafc.com.vn/versace`).

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

### Bộ lọc: file Excel bản tách gender (26/08/2026 chiều, CẢ 5 FILE)

Khách gửi lại **`Filter - Beauty cate demo (1).xlsx`**. Áp vào cả 5 file:

| Sheet | Mới | Đã làm |
|---|---|---|
| `Product categories` | thêm cột **Note** = `Both` / `Chỉ NAM` / `Chỉ NỮ` (101 / 14 / 26 dòng) | `CATS_MEN_ONLY` (14) + `CATS_WOMEN_ONLY` (26) nay là **dữ liệu khách**, không còn bảng đoán |
| `Cate tree_NAM` · `Cate tree_NỮ` | 2 cây riêng | dùng **đối chiếu**: lọc cây đủ theo cột Note ra đúng 113 leaf (nam) / 125 leaf (nữ) — khớp 100% |
| `Color` | 15 màu + tên tiếng Việt chuẩn | `Gold → Vàng đồng` · `Beige → Kem` · `Multi-colour → Nhiều màu` (bỏ tên "Đa sắc" mình tự đặt), kèm 2 cặp i18n mới |
| `Brand` | 24 thương hiệu | `FILTER_BRANDS` 20 → **24** (thêm MessyWeekend · MISBHV · Moschino Jeans · Stand Oil) |
| `Size` | tách **gender × category** | `FILTER_SIZE_OTHER` + `sizeGroupsFor(gender)`: nhóm "Khác" nam = nhẫn 15-21 + thắt lưng 80-115 (12 chip), nữ = nhẫn 11-17 + 38-100 (19 chip), PLP không giới tính = hợp cả hai (24 chip) |

**Đo trên trang chạy** — cây danh mục ra **đúng số của file Excel**: nam `7/39/113` · nữ `7/44/125` · cây đủ `7/49/139` (L1/L2/L3). PLP nam nay có `Áo thun ba lỗ`, `Quần leggings`, cụm giày tây/moccasins, `Túi đựng tài liệu`; PLP nữ có `Bông tai`, `Khăn`, `Túi xách tay`, không còn giày tây. Lọc thật: `Nhiều màu` → 2 SP · `Vàng đồng` → 2 · `Nâu` → 1. Console sạch ở cả 5 file.

> **3 dòng mình từng đoán sai** (nay theo file khách): `Áo dây & croptops` không phải cụm riêng của nữ · `Quần leggings` và `Áo choàng không tay` là hàng cả hai giới. Còn 18 dòng mình bỏ sót (9 chỉ-nữ, 9 chỉ-nam) — chi tiết trong `FILTER-FEEDBACK-2026-08-26.md` mục 0.
>
> **Vá cùng lượt**: `I18N_REV` đảo map nên `Chiều cao gót giày` (thông số PDP) và `Độ cao giày` (nhãn lọc) cùng ra `Heel height` — key khai sau thắng ở chiều EN→VI. Đã chuyển cặp bộ lọc xuống sau cặp PDP ở cả 5 file; vòng VI→EN→VI nay giữ đúng "Độ cao giày".
>
> Sheet `Price` (4 mức Dưới 10M → Trên 40M) **vẫn chưa dùng** — Khoảng giá đang là thanh trượt; đổi sang 4 chip là quyết định UI, chờ khách. 3 bản thử skin vẫn dùng dãy size phẳng (nền cũ) nên không có phần size theo gender.

### Bộ lọc: 5 điểm feedback của khách (26/08/2026, CẢ 5 FILE)

Chi tiết + các câu còn chờ khách chốt: **`FILTER-FEEDBACK-2026-08-26.md`**. Tóm tắt cái đã đổi trong `index.html`:

| # | Khách nói | Đã làm |
|---|---|---|
| 1 | Màu sắc chưa đủ 15 màu | `FILTER_COLORS` **7 → 15 ô đúng bảng khách chốt 26/08** (Black·White·Gold·Silver·Blue·Brown·Green·Red·Pink·Purple·Yellow·Orange·Beige·Grey·**Multi-colour**; tên VI chốt lại theo sheet `Color`: Vàng đồng · Kem · Nhiều màu) — tên bám bảng, hex mình tự chấm; **ô "Navy" bỏ** vì bảng chỉ có Blue. Layout `flex-wrap` → **lưới 4 cột** (ô 79,8px; 15 ô ra 4 hàng `4/4/4/3`, không nhãn nào bị cắt). Ô **Nhiều màu** = swatch conic-gradient, không tham gia quy màu HSL, lọc bằng cờ `multi` trên SP (demo: 2 món Broken Jewels) |
| 2 | Size thiếu nhóm Quần áo | Trả lại nhóm **`Quần áo` = XXS…XXL**; 4 mức chữ `XS·S·M·L` dọn khỏi nhóm "Khác" (để 2 nơi là 2 chip cùng `data-size`, tick 1 sáng cả 2). Panel size nay 3 nhóm **Quần áo · Giày dép · Khác, cả ba ĐÓNG sẵn** (thứ tự + trạng thái user chốt 26/08 chiều — trước đó Giày dép đứng đầu và mở sẵn) |
| 3 | Giày nữ thiếu "Độ cao giày" | **Mục lớn cùng cấp với Kích thước**, vị trí giữa Kích thước và Khoảng giá (user chốt 26/08 chiều) — đi qua `fSection()` nên tiêu đề `12/16 · 500 · hoa`, đóng sẵn, nhịp kẻ đều, khớp 100% mục Kích thước. `FILTER_HEELS` 3 mức **theo sát bảng khách** (giữ khe hở 5,5–6 và 8,5–9; mốc đúng 9 cm tính vào mức Cao). Điều kiện hiện (chốt cuối 26/08 chiều): **mọi PLP ngữ cảnh NỮ** — kể cả "Trang chủ nữ" — chứ không ràng theo nhánh Giày dép; nam / làm đẹp / PLP thương hiệu thì không dựng. `heelSection()` là điều kiện duy nhất; đã gỡ `plpHeelFacet` · `syncHeelSection` · `SHOE_BRANCH_LABELS` · `data-cat-name`. Kèm sửa menu: hàng "Trang chủ nam/nữ" nay đẩy `crumbs=[dept]` như "Trang chủ làm đẹp" (trước đó ra PLP chế độ `brand`, không mang giới tính nào) — đổi lại 2 PLP đó thành chế độ category (breadcrumb + tiêu đề, không còn hero). **Lọc thật** nhờ field `heel` (cm) thêm vào 2 SP giày đã có số liệu ở PDP (Gianni 9 · Manu 1,5) |
| 4 | Nam–Nữ phải có cây riêng | `catTreeFor(gender)` + 2 bảng `CATS_WOMEN_ONLY` / `CATS_MEN_ONLY`; giới tính đọc từ `crumbs[0]` như `isBeautyPlp()`. Đo: **nữ 168 nhánh · nam 147 · cây đủ 173**. Khoá `filterMode` nay gồm giới tính nên đi PLP nam ↔ nữ là dựng lại thân panel |
| 5 | Sub-cate có 1 product type trùng tên nó | Nhánh đó **thành dòng lá** (không "+", không cấp 3) — `Túi xách tay`, `Nhẫn`, `Balo`, `Dép`, `Khăn`, `Thắt lưng`, `Giày thể thao`, `Giày boots`… Nhánh **nhiều con** có 1 con trùng tên cha (`Túi tote > Túi tote · Túi shopper`) **giữ "+"** — khách chốt: *"ẩn mục con nếu trùng tên **và** chỉ có 1 loại"* |

Kéo theo 3 việc nữa cùng lượt:

- **`colorBucketOf()` cộng thêm phạt ĐỘ NO** (trước chỉ hue + độ sáng): ô `Cam` mới (#e0762d, hue 24,5°) trùng hue với màu da bò `#a06a3f` Cuoio (26,6°) — khác nhau ở chỗ cam thì rực (s .74), da bò thì đục (s .43). Không có số hạng này thì túi Cuoio bị xếp vào "Cam" thay vì "Nâu". Đo lại: 13/13 ô đơn sắc tự nhận đúng hex của mình, 8/8 hex trong `PRODUCTS` ra đúng ô.

- **Nhãn danh mục vào `facetLabelsFor()`**: tick "Đầm dài" ở PLP nữ nay còn khi sang PLP nữ khác, rụng khi sang PLP nam. Trước đây set không có nhãn cate nào nên **mọi** tick danh mục bị dọn sạch lúc điều hướng.
- **Vá lỗi có sẵn**: `pruneFilters()` gọi `FILTER_SIZES` — biến **không tồn tại** trong file → đã áp bộ lọc rồi điều hướng sang PLP thời trang là `ReferenceError`, đứt `goPlp()`. Nay là `FILTER_SIZE_LABELS`, sinh tự động từ data size + 3 đơn vị giày.

**Đã áp cho cả 5 file** (`index.html` · `desktop.html` · `desktop-neutral` · `desktop-editorial` · `desktop-atelier`). `index` và `desktop` khai **giống hệt nhau**; 3 bản thử skin thì **nền bộ lọc cũ hơn** (fork từ desktop khoảng 18/08) nên kết quả có 3 chỗ lệch — cố ý, không phải lỗi:

| Chỗ | `index` + `desktop` | 3 bản thử skin |
|---|---|---|
| Panel Kích thước | 3 nhóm đóng/mở: Giày dép (3 tab IT/EU · US · UK) · Quần áo · Khác | **1 lưới phẳng**: `XXS…XXL` + `39…55` — nền này chưa có cơ chế nhóm/tab của 20/08 |
| Cây Danh mục | cây 3 tầng từ Excel (8/57/172) → gender lọc **nữ 168 / nam 147** nhánh | cây **2 tầng bản cũ** → bảng gender khai y hệt nhưng ẩn được ít nhánh hơn (`Chân váy`, `Đầm & áo liền quần`, `Áo dây & croptops`, `Giày cao gót`, `Giày bệt`…) |
| Mục Ưu đãi / trạng thái mục | Ưu đãi ở **mọi** ngành, mọi mục **đóng** sẵn | Ưu đãi chỉ ở beauty, mọi mục **mở** sẵn (nền trước 19/08) |

Nhân lượt port, vá 2 lỗi của nền cũ trong 3 file thử skin (cả 2 đều cần cho feedback lần này chạy được):

- `fSection()` **chưa có `data-facc`** → không có mốc nào để ẩn/hiện mục "Độ cao giày"; đã thêm.
- chip size để `data-size` **rỗng** nên nhãn lọc sinh ra là `39` trong khi `facetLabelsFor` sinh `Size 39` → **mọi tick size bị `pruneFilters` dọn sạch** ngay lúc điều hướng; nay chip mang nhãn đầy đủ (`chips(arr, 'Size ')`).

> Muốn 3 bản thử skin giống hẳn `desktop.html` (cây 3 tầng + nhóm size + Ưu đãi mọi ngành + mục đóng sẵn) thì phải đồng bộ nguyên khối bộ lọc — một lượt riêng, không nằm trong feedback này.

**Đo lại sau port** (1440px): `desktop` → 15 ô màu `4/4/4/3` ô 91px · 3 nhóm size · mục Độ cao giày hiện ở `Nữ › Giày dép`, không dựng ở PLP nam/beauty, tự hiện khi tick cate *Giày dép* ở PLP `Nữ › Túi xách` · cây nữ 168 / nam 147 · `Cao (trên 9 cm)` → 1 SP, lưới 1 thẻ, header "1 sản phẩm", chip "đang áp dụng" đúng nhãn · EN ra `Heel height` / `Multi-colour`. 3 bản thử skin: 15 ô màu `4/4/4/3` (ô 87px), heel hiện/ẩn đúng, `Nhiều màu` → 2 SP, `#a06a3f` → Nâu, nhãn `Size M` sống qua điều hướng. Console sạch ở cả 4 file.

## PLP: một lượt hiển thị 24 sản phẩm — chốt 04/09/2026

Lệnh user: *"ở PLP sẽ set cho 1 lượt hiển thị sẽ là 24 sản phẩm nhé"*. Áp **CẢ 5 FILE**. Báo cáo đầy đủ: `PLP-PHANTRANG-2026-09-04.md`.

**Trước lượt này PLP không có phân trang** — lưới đổ nguyên danh sách, rồi nút "Xem thêm" nối thêm **4 thẻ TRÙNG** lấy từ đầu danh sách (`sortedProducts().slice(0, 4)`): một cử chỉ trang trí, không phải phân trang. Nên yêu cầu này không phải "đổi 4 thành 24" mà là dựng phân trang thật.

| | Trước | Sau |
|---|---|---|
| Lượt đầu | cả danh sách (40 thẻ ở PLP thời trang) | **24** |
| Bấm "Xem thêm" | +4 thẻ **trùng** | +24 thẻ **tiếp theo** |
| Nút khi hết hàng | không bao giờ hết | **tự ẩn** |
| Ô xám lúc tải | cứng 4 | đúng số thẻ sắp nối |
| Mẫu số tiến độ | `PLP_TOTAL = 152` (giả lập) | số sản phẩm **thật** |

Thi hành bằng **một hằng + một chỗ cắt + một hàm đồng bộ nút**, khai cạnh `plpGridInner` ở cả 5 file: `PLP_PER_PAGE = 24` · `plpGridInner` slice `(0, PLP_PER_PAGE)` · `plpShownCount(root)` · `syncShowMore(root)`.

Ba điều phải nhớ khi sửa chỗ này:

1. **Cắt trong `plpGridInner`, đừng rải `slice` ở từng đường.** Mọi đường vẽ lại lưới đều qua hàm này (template màn, `renderPlpGrid` khi lọc/sắp xếp); nút "Xem thêm" thì `insertAdjacentHTML` trực tiếp vào lưới nên không chạm hàm — nhờ vậy lượt đã nối không bị lượt render sau xoá mất.
2. **Mốc "đang hiện tới đâu" đếm `[data-product]` trong `#plpGrid`, KHÔNG dùng biến đếm riêng.** Biến riêng thì phải reset ở từng đường vẽ lại (lọc · sắp xếp · đổi PLP · đổi mật độ cột) — thiếu một chỗ là hoặc nút chết, hoặc lượt sau nối trùng thẻ.
3. **`syncShowMore` gộp luôn việc ẩn-khi-lọc-sạch** (0 kết quả tự vào nhánh ẩn vì `0 >= 0`) — 3 dòng `toggle('hidden', !list.length)` rải ở `wire()`/`renderPlpGrid`/template đã gom về một hàm.

**Vá kèm ở mobile**: handler cũ lấy lưới bằng `sm.closest('[data-scroller]').querySelector('.grid')` — `.grid` đầu tiên trong màn. Hồi chưa phân trang thì trúng/trượt cũng chỉ là 4 thẻ trang trí; nay mốc đọc từ `#plpGrid` nên nối sai chỗ là **bấm mãi không tiến**. Đã đổi sang `root.querySelector('#plpGrid') || …` như desktop.

**`PLP_TOTAL = 152` nghỉ hưu** (tôi tự quyết): giữ catalog giả lập cạnh phân trang thật là hai thứ chọi nhau — *"Bạn đã xem 40 trong 152"* trong khi cái nút vừa tự ẩn vì đã vẽ hết hàng. Muốn con số lớn trở lại thì **thêm sản phẩm vào `PRODUCTS`, đừng nâng mẫu số**. Đảo chốt = 1 dòng trong `plpProgressTotal` (3 bản desktop); `desktop-editorial.html` không có hàm này nên phải sửa **2 chỗ** (`dkProductGrid` + `updatePlpProgress`).

**Hệ quả cần biết trước khi trình khách**: catalog demo nhỏ hơn 152 rất nhiều nên 24/lượt làm nút hết việc ở phần lớn màn. `index`/`desktop` (48 SP): PLP thời trang 24 → +16, tìm kiếm rỗng 24 → +24, còn PLP Làm đẹp (8) và mọi trang thương hiệu (19/14/12/2/1) vào một lượt là hết. **3 bản fork chỉ có 24 SP** (đóng băng 21/08, thiếu data D&G + Zimmermann của 02/09) nên **nút không bao giờ hiện ở đó**.

Đo: `desktop.html` 3 kịch bản × 2 mốc + vòng 6 bước (vào PLP → bấm → đổi sắp xếp → bấm → áp lọc → xoá lọc) đều đúng số; `index.html` 24 → 40 với **0 thẻ trùng**; ô xám lượt cuối đếm được **16** ứng 16 thẻ sắp nối. Đổi mật độ cột chỉ toggle class, không vẽ lại lưới nên mốc vẫn đúng. `node --check` 2 khối × 5 file sạch, console 2 bản sạch, không tràn ngang.

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
| ≤ 1279 | cột cứng co theo `clamp(sàn, vw, trần)` — trần đúng bằng số px thiết kế: **PDP info 569** (44vw; cả 6 bản từ 04/09/2026 — trước là 451/34vw) · tóm tắt giỏ/thanh toán 427 · aside chính sách 280 · ảnh campaign 575 |
| ≤ 1023 | lưới PLP về 3 cột (`!important` vì nút đổi 3/4 cột set class trực tiếp), carousel 5 → 3 card, 4 cam kết → 2 cột |
| ≤ 899 | gallery PDP về 1 cột (2 cột ở dải này chỉ còn ~180px/ảnh) |

Bộ chọn cố tình kèm luôn class `w-[…]` gốc (ví dụ `.dk-sticky-side.w-\[427px\]`) để đọc là thấy ngay trần của từng cột — riêng cột info PDP nay dùng class ngữ nghĩa `.dk-info-wide` nên trần 569 đọc thẳng ở tên rule. Đã đo lại: không màn nào tràn ngang ở 768 / 1024 / 1280, và ở 1280/1440/1600 mọi số đo trùng khớp bản gốc.

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
  - **Tiến độ + Xem thêm** (`2237:18725` + Frame 46): "Bạn đã xem X trong Y sản phẩm" 14/20 `#737373` + track 240×2, rồi nút Xem thêm outline canh giữa. (`PLP_TOTAL = 152` — tổng catalog demo hồi đó — **đã nghỉ hưu 04/09/2026**, mẫu số nay là số sản phẩm thật; xem mục "PLP: một lượt hiển thị 24 sản phẩm".)
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
- ~~**Sắp xếp PLP (29/09/2026, feedback khách)** — chỉ mobile.~~ → **đã port sang desktop cùng ngày** (yêu cầu user; 3 bản fork skin `desktop-atelier` / `-editorial` / `-neutral` là ảnh chụp đóng băng nên KHÔNG đụng). Ba việc, áp CẢ 2 FILE: (1) thêm mục **"% Giảm giá: Cao đến thấp"** (`discount`) vào `SORT_OPTIONS` + nhánh trong `sortedProducts()` — đọc đúng trường `off` (con số chip đỏ in trên thẻ), hàng nguyên giá xuống cuối; (2) đổi nhãn **"Bán chạy nhất" → "Bán chạy"** theo chữ khách (khoá I18N ĐỔI chứ không thêm, EN vẫn `Best sellers` — hai khoá cùng ra một EN là `I18N_REV` đảo sai); (3) gắn tạm `tag:'Best seller'` cho 3 SP làm đẹp (b3 Dylan Blue, b4 The Only One, b6 Explorer Platinum — **mình chọn tạm, chờ danh sách thật của khách**) để mục Bán chạy ở PLP Làm đẹp đổi thứ tự thấy được — trước đây chỉ SP#1 mang cờ này nên bấm vào không đổi gì. Khoá i18n mới: `'% Giảm giá: Cao đến thấp':'Discount: High to low'` (mình tự dịch, chờ duyệt). Kèm theo: nhãn sort dài nhất nay rộng 179px nên nút Bộ lọc mobile thêm `shrink-0 whitespace-nowrap` (ở 320px nó bẻ "BỘ / LỌC"); riêng desktop không cần sửa markup: đã đo, nút Sắp xếp 225px, nhãn nằm một dòng ở 1440 lẫn 800 (dải chip bên trái tự co và cuộn được, không tràn ngang). Popover Sắp xếp từ 5 → 6 hàng (240×222 → 240×266) nên khung Figma popover (cả mobile lẫn desktop) **lệch** cho tới khi sync lại.
- ~~**Hộp "Ưu đãi" ở PDP (29/09/2026, lệnh user)** — chỉ mobile.~~ → **đã port sang desktop cùng ngày** (user: *"chuyển sang dùng dot đầu hàng rồi áp dụng cho bản desktop luôn nhé"*; 3 bản fork skin KHÔNG đụng). **LƯỢT 3 CÙNG NGÀY (HIỆN HÀNH, cả 2 file, user: *"bỏ luôn chữ ưu đãi ở block đó tại pdp nhé, minimum hiện 5 dòng, dài hơn 5 dòng km thì hiện nút xem thêm và thu gọn như hiện tại"*)**: (a) **BỎ HẲN tiêu đề** "Ưu đãi (N)" — hộp chỉ còn danh sách hàng + nút đáy; hằng `PROMO_TAB` và cặp luật dịch `Ưu đãi (N)` ↔ `Offers (N)` gỡ theo; (b) **hiện sẵn 5 hàng**, hàng thứ 6 trở đi ẩn (`.promo-more`) cho tới khi bấm; nút "Xem tất cả N chương trình" / "Thu gọn" **chỉ được in khi có HƠN 5 chương trình** (hằng `PROMO_ROWS_SHOWN`), nên hộp phẳng thôi cắt-theo-pixel (81px + vệt mờ) và `wirePromoPeek` bỏ qua `.promo-flat`; "dòng" hiểu là MỘT CHƯƠNG TRÌNH (một hàng có dot), không phải một dòng chữ đã xuống hàng. Vì N trên nút nay chỉ là 6, 7… nên thêm cặp luật `^Xem tất cả (\d+) chương trình$` ↔ `^See all (\d+) promotions$` (khoá tĩnh 2/3/4 hết khớp ca nào). Thân hộp tự gánh đệm trên 12 (không còn băng tiêu đề), đệm dưới 12 — hoặc 8 khi có nút ngay dưới. **DATA HIỆN CHỈ CÓ TỐI ĐA 4 chương trình / PDP nên CHƯA PDP nào hiện nút**; nhánh hơn 5 đã kiểm bằng dữ liệu giả 6–7 hàng. Phần dưới là lịch sử lượt 1–2: (1) tiêu đề `PROMO_TAB` "Ưu đãi khuyến mãi" → **"Ưu đãi"**, số đếm (N) GIỮ nhưng chữ + số nay nằm chung MỘT text node và đi bằng luật regex `^Ưu đãi \((\d+)\)$` → `Offers ($1)` (cùng chiều ngược ở `I18N_REV_RE`) — không dùng được khoá tĩnh vì "Ưu đãi" đã là khoá và dịch "Offer", tiêu đề sẽ ra "Offer (3)"; (2) **mỗi dòng ưu đãi đứng sau một DOT tròn 4px** (class `.promo-dot`, khai giống hệt ở 2 file; lượt đầu cùng ngày là dấu check `I.tick`, user đổi sang dot): dot + khe 8 = chữ thụt 12, đúng nếp thụt treo `.acc-bullet` của các accordion PDP, tâm dot cách đỉnh dòng 10px (chữ hộp là 12/18). `.promo-dot` là class ngữ nghĩa vì `tailwind.css` build sẵn không có `w-1` / `w-[4px]`. Desktop đã đo: đệm hộp 16, nhãn 12/18 giống mobile, không cần số riêng. Hộp ở **GIỎ** dùng chung CSS `.promo-box` nhưng KHÔNG đi qua `promoBox` nên không đổi. Khung Figma `promo-pdp` **lệch** cho tới khi sync lại.
- **Đệm dưới khối Hàng mới về / Khuyến mãi ở trang chủ (29/09/2026, lệnh user kèm Figma `847:44376`)** — chỉ mobile. `hmSec` và `hmRail` thêm tham số `flush` (bỏ class `pb-6` / `pb-1`), chỉ `hmFeatured` truyền `true`. Đo ở 375: khối 404,7 (đầu mục 80 + khe 16 + thẻ 308,7), đáy thẻ → khối kế tiếp 40 (trước 68); bản Khuyến mãi 432,7, cũng 40. Desktop CHƯA đổi: Figma khối desktop `847:44310` đệm 32/0/0/0, khe 24, cha khe 32 — chưa so với `hmSec` desktop (`py-8` + `pt-8`).
- **Họ / Tên TÁCH RIÊNG ở các mục ĐỊA CHỈ (02/10/2026, lệnh user: *"chúng tôi không có merge họ và tên vào chung nhé, nên ở check out hãy tách ra họ riêng tên riêng"*; rồi *"hóa đơn VAT vẫn giữ họ và tên chung nhé, chỉ có các mục của địa chỉ"*)** — làm ở mobile (`index.html`) trước, rồi **PORT SANG DESKTOP cùng ngày** (user: *"làm luôn bản desktop nhé"*, xem cuối mục). Không còn chuỗi `name` gộp ở bất kỳ ĐỊA CHỈ nào: bản ghi giữ `last` (Họ) + `first` (Tên); in ra màn qua MỘT hàm `personName(p)` = "Họ Tên" (định nghĩa ngay sau `PROFILE`). Ô nhập xếp **Tên → Họ** (đúng khuôn form Đăng ký / Thông tin cá nhân / brief tr.21, 29). **Đã làm ở mobile:** (1) bước Giao hàng — ô Họ vốn là ô CÂM (`field('Họ','Nhập họ')`: không state, không kiểm, không lưu) nay nối thật (`ckShipFirst` / `ckShipLast`, khoá `sfirst` / `slast`, kiểm "Nhập tên người nhận" / "Nhập họ người nhận"); (2) bước Nhận tại cửa hàng (luồng đang ẩn `CK_PICKUP = false`) — "Họ và tên" thành 2 ô `pfirst` / `plast` (`ckFirst` / `ckLast`); (3) sổ địa chỉ `ADDRESSES` (6 mục) + form Thêm / Sửa ở Tài khoản (`afirst` / `alast`) + thẻ địa chỉ ở checkout, sheet sổ địa chỉ, tóm tắt bước giao hàng; (4) người nhận của ĐƠN (`o.address` = `{ last, first, phone, line }`, 12 đơn mẫu + đơn mới đặt) ở Chi tiết đơn + Theo dõi đơn; (5) i18n: `'Nhập họ người nhận'` mới, `'Nhập tên người nhận'` đổi EN thành "first name", gỡ khoá chết `'Vui lòng nhập họ và tên'` + `'Nhập họ và tên người nhận'`. **NGOẠI LỆ user chốt: hoá đơn VAT cá nhân GIỮ MỘT ô "Họ và tên"** (`vatFieldSets.personal`, `o.vat.name`, hàng "Họ và tên" ở Chi tiết đơn không đổi). **ĐÃ PORT SANG DESKTOP cùng ngày** (user: *"làm luôn bản desktop nhé"*) — cùng 5 việc, khai GIỐNG HỆT index.html: `personName`, state `ckFirst` / `ckLast` / `ckShipFirst` / `ckShipLast` (thay `ckName` / `ckShipName`), khoá `pfirst` / `plast` / `sfirst` / `slast` / `afirst` / `alast` (+ `CKF`, `validatePickup` / `validateShipping` / `ckMissingFields`, `placeOrder`, `ckShipDoneHTML` / `ckStoreDoneHTML`, reset `data-reset`, ghi/nạp địa chỉ sửa), `ADDRESSES`, 12 `address` của `ORDERS`, thẻ địa chỉ + sheet sổ địa chỉ, `screenORDER` + theo dõi đơn, I18N. Khác mobile ở BỐ CỤC: form giao hàng xếp **Tên | Họ HAI CỘT** (đã sẵn lưới `grid-cols-2` + `bare: true`, chỉ nối ô Họ bằng `val` + `key`; lỗi từng ô nằm dưới đúng cột của nó); bước Nhận tại cửa hàng cũng Tên | Họ một hàng, nằm trên hàng SĐT | Email; form địa chỉ ở Tài khoản dùng lưới `.acc-grid2` của form Cập nhật thông tin (Tên 512 | Họ 512 trong cột 1040). Đã chạy thử ở 1440: khách vãng lai (lỗi từng ô, xoá lỗi khi gõ), đã đăng nhập sửa địa chỉ tại checkout ghi ngược vào sổ, sổ địa chỉ Tài khoản thêm / sửa, đơn mới, Chi tiết đơn + Theo dõi đơn, EN, nhận tại cửa hàng, VAT vẫn MỘT ô; console sạch. 3 bản fork skin (`desktop-atelier` / `-editorial` / `-neutral`) là ảnh chụp đóng băng nên KHÔNG đụng. Figma: khung checkout / sổ địa chỉ / chi tiết đơn (mobile + desktop) có "Họ và tên" gộp trong hộp địa chỉ nay LỆCH cho tới khi sync lại.
- ~~**Đăng ký bằng SĐT: ô OTP ngay dưới ô SĐT, chung một trang (06/10/2026, lệnh user kèm ảnh)** — chỉ mobile. Desktop còn view `otp` riêng cho luồng đăng ký. Port = chép từ `index.html`: `afield` tham số thứ 6 `act`, CSS `.has-act` / `.fld-act`, `viewRegister`, khối wire "ĐĂNG KÝ bằng SĐT — MỘT TRANG", biến `regOtpSent` / `regOtpIv` / `resetRegOtp()` + 2 chỗ dọn (`[data-auth-go]`, `go('login')`), 2 khoá I18N mới. Chi tiết: mục "Đăng ký bằng SĐT: ô OTP NGAY DƯỚI ô SĐT".~~ → **đã port sang desktop cùng ngày** (user: *"áp dụng cho desktop luôn nhé"*), xem mục "Đăng ký bằng SĐT: ô OTP NGAY DƯỚI ô SĐT" (phần "Desktop"). Quên mật khẩu bằng SĐT vẫn view `otp` 6 ô ở cả hai file.
- ~~**Search lượt 5 — logic so khớp chuẩn + nổi chữ khớp (06/10/2026, lệnh user)** — chỉ mobile.~~ → **đã port sang desktop cùng ngày** (lượt 6, user: *"áp dụng cho cả desktop luôn nhé"*; khối hàm nay giống hệt 2 file — xem mục "Search lượt 6"). Ghi chú cũ: Desktop (`#dkSearchLayer` + bản sao `screenSearch` trong `FLOW`) vẫn chạy `searchSuggestions` / `highlightMatch` CŨ: gõ không dấu ra 0, chữ khớp không nổi (font-medium chết). Port = chép khối `/* ══ TÌM KIẾM — SO KHỚP CHUẨN ══ */` (searchNormMap … searchHistoryAdd, highlightMatch mới), đổi `renderTerms` sang `searchProducts` / `searchBrands` / `searchCats` (gom nhóm hoặc giữ một cột), `plpProducts()` nhánh search → `searchProducts(q)`, `goSearch` → `searchHistoryAdd`, CSS `.search-hit`, i18n khoá `'Sản phẩm gợi ý'` + 6 luật regex. Xem mục "Search lượt 5" + `_notes/SEARCH-LOGIC-2026-10-06.md` §6.

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
