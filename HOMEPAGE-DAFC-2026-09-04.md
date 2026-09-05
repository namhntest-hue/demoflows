# Trang chủ DAFC — dựng bằng chính UI của PLP + PDP · 04/09/2026

Lệnh user: *"giả sử trang home bạn không bị ràng buộc bởi bất kì skill hay rule nào thì
dựa vào 2 trang mà chúng ta đã được chốt như là PDP và PLP, bạn hãy tạo một trang
homepage phù hợp trên những UI mà ta đã tạo."*

**Đã dựng trong CẢ 2 FILE** (`desktop.html` + `index.html`) thành một **screen `home`**
đứng đầu `FLOW`. Vào trang là thấy trang chủ; logo header và đoạn `Trang chủ` của
breadcrumb nay bấm về đây.

---

## 0. Ba quyết định mở đầu — và vì sao

| Quyết định | Vì sao |
|---|---|
| **Screen trong 2 file demo**, không phải file thứ 6 | Ma trận 5 file đã có 3 fork skin đóng băng từ 21/08 và thiếu 10 hạng mục. Thêm một fork nữa là thêm một chỗ trôi. Là screen thì trang chủ dùng THẲNG `navBar()` · `footer()` · `camKetSection()` · `productCard()` · `.dk-rail*` · `.dk-look-band` · cụm accordion PDP — và mọi nâng cấp sau này của những linh kiện đó tự chảy vào trang chủ. |
| **`home.html` GIỮ NGUYÊN, không xoá** | Nó dựng bằng CSS ngữ nghĩa trên shadcn-theme và mang bộ da riêng (`skin-min`, khuôn MR PORTER) — tức nói KHÁC giọng với PLP/PDP, chính thứ lệnh này yêu cầu sửa. Giữ làm tư liệu của hướng đã thử. |
| **Không dùng skill nào** | Đúng lệnh. Trọng tài duy nhất của lượt này là số đo THẬT của PLP/PDP, đo trên trang chạy. |

**Hướng thiết kế: "hàng hoá trước, kể chuyện sau."** Ngay sau hero là **lưới 4 cột y hệt
`#plpGrid`** — cùng bề rộng thẻ, cùng khe 4/16, cùng tỉ lệ ảnh 189/252, cùng lớp quick-add
khi rê chuột. Người mở trang nhận ra "cùng một cửa hàng với PLP" trước khi đọc chữ nào.
Phần kể chuyện (băng nhà mốt, banner ưu đãi, cam kết, FAQ) xếp SAU hàng hoá.

---

## 1. Cấu trúc trang — 10 khối, bám 6 khối brief khách

| # | Khối | Khối brief khách | Linh kiện |
|---|---|---|---|
| 1 | Thanh điều hướng | ngoài brief | `navBar()` **nguyên vẹn** |
| 2 | Hero 2 tấm, thuần ảnh | **1** — Hero banner (slider) | `.dk-rail` + `.dk-rail-track` + `.dk-rail-arrow` |
| 3 | Hàng mới về — lưới 4 cột, 8 thẻ | **3** — New arrivals | `productCard()` + số đo `#plpGrid` |
| 4 | Mua theo danh mục — 6 ô | **2** — Highlight top sub-cate | khuôn ô của `brandCatStrip` |
| 5 | Ưu đãi — banner KV + dải 11 thẻ | *ngoài brief* (xem §6) | banner + `.dk-rail` |
| 6 | Nhà mốt trong ngày | **4a** — Brand day | `.dk-look-band` **nguyên vẹn** |
| 7 | Thương hiệu tại DAFC — 5 thẻ | **4b** — Brand list card | `.hm-brand-card` (mới) |
| 8 | Cam kết DAFC | **5** — USP block | `camKetSection()` **nguyên vẹn** |
| 9 | Câu hỏi thường gặp | **5** — QA block | accordion PDP (`data-pdp-acc`) |
| 10 | Đăng ký nhận tin | **6** — Sign up | khối riêng trên footer (xem §6) |
| 11 | Footer | — | `footer()` **nguyên vẹn, 0 sửa** |

Phủ **6/6 khối brief**. Khối 5 (Ưu đãi) là khối duy nhất NGOÀI brief — lý do: `DK_NAV_CATS`
có mục "Khuyến mãi" nên trang chủ phải có cửa vào đó, `kv-sale.jpg` là tấm ngang duy nhất
trong kho chưa dùng ở đâu, và 11/48 SP đã có `off` + chip `-%` sẵn.

---

## 2. Số đo — ĐO TRÊN TRANG CHẠY, không phải tính tay

### Desktop, cửa sổ 1440 (vùng nội dung 1425 vì thanh cuộn dọc chiếm 15px)

| Phần tử | Trang chủ | PLP / PDP | Lệch |
|---|---|---|---|
| Thẻ lưới sản phẩm | **341,3** | PLP `#plpGrid` **341,3** | **0** |
| Thẻ trong dải trượt | **341,3** | PDP `.dk-rail-item` **341,3** | **0** |
| Băng nhà mốt | **1377 × 352** | PDP `.dk-look-band` **352** | **0** |
| Cột chữ băng | **282** (3 cột lưới) | PDP `--look-aside` **282** | **0** |
| Thẻ trong băng | **325 × 539,3** | PDP **325 × 541,3** | 0 ngang · 2px dọc¹ |
| Hero | 1377 × 688,5 (2:1) | — | khối mới |
| Ô danh mục | 209,5 × 241,5 | — | khối mới |
| Thẻ thương hiệu | 256,2 × 128 | — | khối mới |
| Logo D&G trong thẻ | 218 × 22 (lòng ô 224,2) | trần khách 22px | **thi hành được** |
| Cao cả trang | 5.794 ở 1440 · 5.468 ở 1280 | PDP 3.211 | 1,80× PDP |

¹ Lệch 2px là do NỘI DUNG (tên sản phẩm dài 2 dòng ở một thẻ của PDP), không do hệ.

### Mobile, cửa sổ 375

| Phần tử | Trang chủ | PLP mobile |
|---|---|---|
| Thẻ lưới sản phẩm | **185 × 352** | **185** — 0 lệch |
| Hero | 375 × 281 (4:3) | — |
| Ô danh mục | 109 × 141 (3 cột) | — |
| Thẻ thương hiệu | 259 × 128 (dải trượt) | — |
| Cao cả trang | 5.935 | PLP 5.505 |

### Dải desktop hẹp — đo ở 1000

`.hm-cats` 3 cột · `.hm-brands` 3 cột · `.hm-faq-cols` 1 cột · `.hm-signup` 1 cột ·
lưới hàng mới 3 cột · `.dk-look-band` về dòng chảy (cao tự động, `margin-top` 32) ·
**không tràn ngang**.

### Nhịp dọc

Desktop **64** giữa 2 khối (`py-8` ngoài 32 + `pt-8` trong 32) — đúng nhịp PLP/PDP.
Mobile **64** (`mt-10` 40 + `pb-6` 24) — đúng nhịp dải gợi ý của PDP mobile.
Cam kết giữ `py-12` (48) như ở PDP. **Không kẻ ngăn giữa các khối**: khoảng trắng là thứ
ngăn cách, và khối nào có mảng nền thì mảng nền đã ngăn.

---

## 3. Thang chữ — 0 bậc mới

| Vai | Class | Vẽ ra |
|---|---|---|
| Tiêu đề mục (6 chỗ) | `text-[18px] font-medium leading-7 text-foreground` | **Libre Bodoni 24/32 · 400** |
| Nhãn "Nhà mốt trong ngày" | `.t-single text-mid-alt` | Inter 12/16 |
| Link "Xem tất cả" (5 chỗ) | `.t-multiline` + `underline underline-offset-2` | Inter 12/18 |
| Nhãn ô danh mục | `.t-single font-medium` | Inter 12/16 |
| Ô chữ thẻ thương hiệu | `.t-lead` | Inter 14/20 · **chữ thường** |
| Nhãn FAQ | `.t-multiline` trong `[data-pdp-acc]` | Inter 14/20 · **500** |
| Ruột FAQ | `.t-single` trong `[data-pdp-acc]` | Inter 12/18 |
| Nút / ô nhập | `.t-lead` + `.btn-p`/`.btn-o` | Inter 14/20 |

**Vì sao tiêu đề mục PHẢI là chuỗi `text-[18px]`, không phải `.t-display-title`:** hook
Libre Bodoni của bộ da bám `:is(h1,h2,p):is(.text-[18px], .text-[32px])`. Đổi sang
`.t-display-title` là ra **Inter** — xem §7 mục lỗ mặt chữ.

**0 vi phạm luật:** không UPPERCASE (trừ nav header vốn dùng `text-transform`), không đổ
bóng, không bo góc, viền 1px, không dùng độ đậm tạo phân cấp, không bậc chữ tự chế, không
`:active { transform: scale() }`. Bậc 40/50 của `.dk-look-title` **cố ý không dùng** —
ngoại lệ đó cấp cho đúng một dòng chữ ở PDP.

---

## 4. Bản đồ ảnh — mỗi ô một tệp THẬT, kèm phép cắt

| Ô | Tệp | Khổ nguồn | Ô đích | Giữ được |
|---|---|---|---|---|
| Hero desktop 1 | `kv-women-6.jpg` | 1600×873 | 1377×688 | **92%** chiều cao |
| Hero desktop 2 | `kv-women-5.jpg` | 1600×900 | 1377×688 | **89%** chiều cao |
| Hero mobile 1 | `kv-men-1.jpg` | 1600×1439 | 375×281 | **83%** chiều cao |
| Hero mobile 2 | `kv-women-1.jpg` | 1600×1439 | 375×281 | **83%** chiều cao |
| Ô Quần áo | `kv-women-4.jpg` | 875×875 | vuông | **100%** — khổ native |
| Ô Túi xách | `kv-men-4.jpg` | 1000×1000 | vuông | **100%** — native |
| Ô Giày dép | `kv-men-7.jpg` | 875×875 | vuông | **100%** — native |
| Ô Phụ kiện | `p10-0.jpg` | 1200×1484 | vuông | 80,9% |
| Ô Làm đẹp | `b1.jpg` | 1200×1484 | vuông, nền `#f7f7f7` | 80,9% |
| Ô Quà tặng | `hero-holiday.jpg` | 640×640 | vuông | **100%** — native |
| Banner ưu đãi | `kv-sale.jpg` | 1600×600 | 1377×516 (2,667) | **100%** — 0 pixel cắt |
| Nhà mốt | `brand-logo.png` + `p1-1` · `p3-1` · `p4-1` | — | ảnh model 189/252 | 92,7% ngang |
| Thẻ thương hiệu | `brand-logo{,-dg,-zm}.png` | — | trần 22px | vừa |

**Hero mobile ĐỔI ẢNH, không chỉ đổi tỉ lệ.** Hai tấm của desktop (tỉ lệ 1,78 và 1,83) vào
ô 4/3 chỉ giữ 73% bề ngang — cắt mất người ở hai mép của một ảnh nhóm. Còn `kv-men-1` /
`kv-women-1` chính là **2 tấm KV mobile của DAFC** (nguồn `Home-mobile-men.png` /
`Home-mobile-women_1.png`) — đúng vai, đúng khổ. `object-position` lấy số đã chốt trong
`REELS` của `main.html`, không đoán lại.

**Cố ý KHÔNG dùng:** `brand-hero.png` (ô 575×320 của PLP chỉ giữ 45% chiều cao — vết cắt
nặng nhất kho) · `kv-men-8` (có em bé + nền trắng, đã loại từ trước) · `kv-men-9` (tỉ lệ
3,00, đang treo câu hỏi khai tử) · `kv-gift.jpg` (400², quá nhỏ) · `p4-0.jpg` làm ô "Trang
sức" (nó là giày cao gót — chỗ vá đã ghi nhận, trang chủ không nhân bản).

**2 tấm được tiêu thụ lần đầu:** `kv-sale.jpg` và `hero-holiday.jpg` (trước lượt này grep 0
hit ở mọi file).

**Ghi chú `HOMEPAGE.md` đã lỗi thời:** dòng *"`assets/hero-holiday.jpg` chưa có nên slider
chạy 2 slide"* — tệp CÓ THẬT, 53.851 byte, 640×640. Đừng gỡ ô "Quà tặng" vì tin ghi chú cũ.

---

## 5. Dùng lại gì · viết mới gì

### Dùng lại NGUYÊN VẸN (0 dòng CSS)
`navBar()` · `footer()` · `camKetSection()` · `productCard()` (kéo theo miễn phí: lớp
quick-add khi rê, `.pc-brand` 14/20, badge `Đặt trước` trước tên, chip `-%` nền `#fef2f2`,
luật đặt-trước-không-sale) · `.dk-rail*` + `wireRail()` · `.dk-look-band` + trọn bộ 6 biến
`--look-*` + nhánh <1024 của nó · cụm accordion PDP + móc `data-pdp-acc` · khuôn ô của
`brandCatStrip` · `.btn-p` / `.btn-o` / `.press` / `.reveal` / `.drag-x` / `img.lazy` ·
bộ icon `I.*` + `IcoPlus` / `IcoMinus` · dữ liệu `PRODUCTS` · `BRAND_PAGES` · `CAM_KET` ·
`MENU_BRANDS` · `PROMO_MESSAGES`.

### CSS MỚI — đúng **6 class + 1 khối @media** mỗi file

| Class | Vì sao không dùng được cái có sẵn |
|---|---|
| `.hm-hero-track` | `.dk-rail-track` không có `scroll-snap` (dải sản phẩm nghỉ lửng là bình thường, hero thì không) và có khe 4px làm tấm 2 lệch mỗi lượt cuộn. `snap-x`/`snap-mandatory` KHÔNG có trong `tailwind.css` đã build. |
| `.hm-hero-slide` | `.dk-rail-item` khoá cứng ở 1/4 dải; hero là 1/1. |
| `.hm-pip` + `::before` | Chấm 8×8 có ô bấm 8×8 là dưới chuẩn. `inset: -12px` nới vùng bấm ra 32×32 mà không xê dịch pixel nào — không utility nào tạo được pseudo-element. |
| `.hm-cats` | **`grid-cols-6` KHÔNG CÓ trong bản build** (chỉ có 1..5) → gõ vào là class chết rơi im lặng. |
| `.hm-brands` | Base + nhánh @media của khối nằm chung một chỗ. Mobile là dải TRƯỢT (xem dưới). |
| `.hm-brand-card` (+ `img`) | Hệ chưa có "ô viền mảnh + hover đổi sang mặt xám": `.btn-o` hover thì BỎ nền, `.ghost-hover` phủ đen 5%. Và `h-[128px]` cùng MỌI `max-h-[…]` tuỳ ý đều không có trong bản build. |

**Hai chỗ bản mobile khác bản desktop về CẤU TRÚC, không phải về style:**

1. **Thẻ thương hiệu là DẢI TRƯỢT** (desktop là lưới 5 ô). Trần logo 22px là số tuyệt đối
   theo chốt khách 27/08, mà `brand-logo-dg.png` ở cao 22 ra rộng **218** — ô phải có lòng
   ≥ 218, tức ô ≥ 250. Ở 375 thì lưới 2 cột chỉ ra ô 171, logo buộc tụt xuống ~15px và cả
   hàng mất trục quang học. Nên mobile **giữ đúng ô 259×128 của desktop và cho trượt
   ngang**, thay vì bóp ô để nhồi vào một hàng.
2. **Khối nhà mốt xếp DỌC** (desktop dùng băng xám `.dk-look-band`). Khuôn băng đó không có
   ở `index.html`, và nó chỉ đọc được ở khổ rộng (cột chữ 282 cạnh 3 thẻ 330). Mobile: khối
   chữ trên nền `#f7f7f7` rồi dải trượt 3 thẻ — đúng khuôn mọi dải của bản mobile.

### JS MỚI — 2 hàm mỗi file

* `wireHeroDots(root)` — hàng chấm hero. **Mũi tên KHÔNG phải viết:** hero mang đủ
  `.dk-rail` + `.dk-rail-track` + 2 attribute `data-rail-*` nên `wireRail()` lo trọn gói
  (ẩn/hiện theo hướng còn nội dung, bấm là cuộn đúng `track.clientWidth`, đo lại khi resize).
  `place()` bên trong nó tự thoát vì track không có `[data-product]`, nên `--rail-arrow-y`
  không được đặt và CSS rơi về `top: 50%` — đúng giữa ảnh.
* `wireHomeNav(root)` — **chỉ bản mobile**, xem §7 mục "điều hướng lệch 2 bản".

Danh sách sản phẩm **đọc từ data, 0 index in cứng**: `hmNew()` = `p.tag === 'New arrival'`
(ra đúng 8 SP) · `hmSale()` = `p.off` (ra đúng 11 SP). Hai cờ này CHÍNH LÀ 2 cờ của bộ lọc
PLP (`FILTER_FLAGS`: 'Hàng mới về' · 'Đang giảm giá') nên trang chủ và bộ lọc không thể lệch.

---

## 6. Sửa vào phần cũ — đúng 8 chỗ mỗi file, tất cả đều cộng thêm

| # | Chỗ | Sửa gì |
|---|---|---|
| 1 | `FLOW` | thêm `'home'` ở **vị trí đầu** |
| 2 | `LABELS` | thêm `home:'Trang chủ'` |
| 3 | `RENDER` | thêm `home: screenHOME` |
| 4 | Logo header | `data-nav="plp"` → `data-nav="home"` |
| 5 | **Breadcrumb** | đoạn `Trang chủ` từ `<span>` **thành `<button data-nav="home">`** |
| 6 | `wire()` | gọi thêm `wireHeroDots(root)` (+ `wireHomeNav(root)` ở mobile) |
| 7 | `RESP.hash()` | màn mặc định của hash `'plp'` → `'home'` |
| 8 | Boot + `popstate` | màn rơi về `'plp'` → `'home'` |

**Chỗ số 5 vá luôn PLP và PDP.** Trước lượt này đoạn `Trang chủ` là một `<span>` chết ở cả
hai màn vì trang chủ chưa tồn tại — đó là **lý do tồn tại** của trang này. Đo lại sau khi
sửa: nút ra **12/16 · 400 · Inter · ls 0,5 · #666**, hàng breadcrumb vẫn **cao đúng 40** —
**0 pixel lệch**, chỉ thêm chỗ bấm.

**Kèm 1 việc nhỏ ngoài phạm vi, đã làm vì chính code mới của tôi phát ra 2 chuỗi đó:**
thêm cặp khoá i18n cho `Xem sản phẩm trước` / `Xem sản phẩm tiếp` — 2 `aria-label` của mũi
tên dải sản phẩm mà trước 04/09 chưa ai khai khoá, nên **bản EN của PDP đang đọc nhãn tiếng
Việt**. Thêm khoá vá cả 2 chỗ, không đổi một pixel nào.

**i18n:** 20 cặp khoá mới mỗi file, đặt trước `I18N_REV`, đã soát 0 giá trị EN trùng khoá
cũ. Cố ý **dùng lại 7 khoá sẵn có** (`Trang chủ` · `Hàng mới về` · `Đang giảm giá` ·
`Tất cả thương hiệu` · `Câu hỏi thường gặp` · `Nhập email` · `Đăng ký`), và 4 câu trả lời
FAQ **dùng nguyên văn 4 mô tả của `CAM_KET`** nên bản tiếng Anh có sẵn, không phải dịch.
Đo bản EN của trang chủ: 6 tiêu đề · 5 link · 6 nhãn danh mục · 6 câu FAQ · placeholder ·
dòng điều khoản · nhãn nhà mốt — **dịch đủ**.

---

## 7. Ba lỗi tìm được trong lúc dựng — đã sửa

**7.1 Ngành hàng rò từ ô "Làm đẹp" sang 4 ô thời trang.** Bấm ô Làm đẹp (ghi `dkDept` /
`menuTab` = 'Làm đẹp'), quay về trang chủ bấm ô "Quần áo" → PLP ra **8 lọ nước hoa** thay vì
hàng thời trang. Nguyên nhân: `isBeautyPlp()` nhận ngành qua `crumbs[0]`, mà 4 ô thời trang
lấy ngành ĐANG chọn. Sửa bằng `hmFashionDept()` — đang ở 'Làm đẹp' thì rơi về `DK_DEPTS[0]`;
ô Làm đẹp khai dept THẲNG trong `HM_CATS` nên không đi qua hàm này. Đo lại: ô Làm đẹp ra
**8 SP**, rồi ô Quần áo ra **24 SP** với `crumbs = 'Nam'`.

**7.2 Mobile: tab menu còn sáng sai ngành.** Sau 7.1, `menuTab` vẫn giữ 'Làm đẹp' trong khi
PLP đã bày hàng thời trang. Bản desktop được dispatch chung làm hộ (nó đọc `crumbs[0]` rồi
gán `dkDept`); bản mobile không có nhánh đó nên phải tự ghi `menuTab` trước khi điều hướng.

**7.3 Điều hướng lệch 2 bản — bản mobile phải có handler riêng.** Dispatch `[data-nav]` của
`index.html` xử `t === 'plp'` bằng đúng một câu `goPlp({ type: 'brand' })`, **KHÔNG đọc
`data-plp-title` / `data-plp-brand`** như bản desktop (2 attribute đó ở mobile chỉ được panel
menu tự đọc bằng handler riêng). Nếu trang chủ mobile gắn chúng vào dispatch chung thì 6 ô
danh mục và 5 thẻ thương hiệu **đều rơi về PLP Versace** — cửa giả. Nên bản mobile mang
attribute RIÊNG (`data-hm-cat` / `data-hm-brand`) và tự nối trong `wireHomeNav()`.
**Không sửa dispatch chung** — nó đang phục vụ hơn 60 chỗ khác; việc đồng bộ 2 dispatch là
việc của một đợt riêng.


**7.4 Hàng chấm hero: đừng chờ sự kiện `scroll` mà chính mình vừa gây ra.** Bấm chấm để
quay VỀ tấm 1 thì track cuộn đúng chỗ nhưng chấm vẫn sáng ở tấm cũ — handler chỉ tô lại
trong `scroll`, mà sự kiện đó có thể đến muộn / bị gộp nhịp. Sửa: cuộn xong **gọi thẳng
`sync()`** trong chính cú bấm (sự kiện đến sau chỉ chạy lại đúng phép tính đó, vô hại).
Áp cả 2 file.

**Một chẩn đoán tôi đã RÚT LẠI, ghi lại để lượt sau đừng đi vào:** trong lúc soát 7.4 tôi
đo thấy `track.scrollLeft = N` **không nhúc nhích** trên mọi khối có `scroll-behavior:
smooth` — kể cả dải "Sản phẩm tương tự" ở PDP — và suýt báo đó là lỗi của dải PDP. Đo tiếp
thì `document.visibilityState` của khung kiểm là **`hidden`**, mà Chromium KHÔNG chạy hoạt
ảnh cuộn mượt khi tài liệu bị ẩn. **Dải PDP không hỏng.** Hệ quả cho phần kiểm: mũi tên và
chấm của hero DESKTOP (đi qua `.dk-rail-track`, có `scroll-behavior: smooth`) là thứ **duy
nhất của lượt này tôi không kiểm được bằng máy** — bạn mở `desktop.html` bấm thử một cái là
xong. Bản mobile không dính (track của nó không có `scroll-behavior: smooth`) và đã kiểm
chạy đúng cả hai chiều.

### Đã kiểm chạy được

* `node --check` khối `<script>` của cả 2 file: **OK**.
* Render **cả 18 screen** ở cả 2 file: **0 lỗi, 0 log lỗi console**.
* Điều hướng: breadcrumb `Trang chủ` → home · logo → home · ô Làm đẹp → PLP **8 SP** ·
  thẻ Zimmermann → PLP **12 SP** · thẻ sản phẩm → đúng PDP của SP đó · hero → PLP danh mục.
* 43 ảnh của trang chủ desktop: **0 ảnh vỡ**.
* Cầu nối responsive: `RESP.hash('home')` ra **rỗng** (đúng, vì home là mặc định mới),
  `RESP.hash('plp')` ra `#screen=plp` — mang trạng thái qua mốc 768 vẫn đúng.
* Không tràn ngang ở **375 · 1000 · 1280 · 1440**.

---

## 8. Ba lỗ của phần CŨ — chỉ ra, KHÔNG tự vá

Trang chủ không tạo ra 3 lỗ này, nhưng nó là chỗ ĐẦU TIÊN phơi ra vì 6 cửa đứng cạnh nhau.

**8.1 `plpProducts()` nhánh `category` KHÔNG lọc theo tên danh mục** (chỉ tách
`p.dept === 'beauty'`). Nên 5/6 ô danh mục và mọi link "Xem tất cả" đổ về **cùng một danh
sách 40 SP** không-beauty. Chỉ ô "Làm đẹp" (qua `crumbs[0]`) và **5 thẻ thương hiệu** (nhánh
`brand`, lọc thật từ 02/09) là cửa nói đúng dữ liệu — đó cũng là lý do trang chủ có hàng thẻ
thương hiệu. **Cần chốt:** thêm nhánh lọc thật vào `plpProducts()`, hay ghi vào spec bàn
giao là việc của Magento?

**8.2 `.t-display-title` không nhận `--font-head`.** Sau lượt refactor thang chữ 04/09, danh
sách nhận `--font-head` không có `.t-*` nào — nên **h1 tiêu đề PLP và h1 brand ở PDP đang vẽ
ra Inter 24/32**, còn tiêu đề mục (`text-[18px]`) ra **Libre Bodoni 24/32**. Hai h1 trong
cùng app lệch mặt chữ. Trang chủ đi bằng hook `text-[18px]` để khớp tiêu đề mục. **Cần
chốt:** vá ở `.t-display-title` (đúng hệ, nhưng đổi 2 màn đã chốt với khách), hay để vậy?

**8.3 `PRODUCTS` không có field `gender`** (`grep 'gender:'` ra 0). Vì vậy tôi **cố ý gỡ hàng
tab 3 ngành** khỏi lưới hàng mới: nó buộc in cứng 24 index và thành **nguồn sự thật thứ ba**
sau PLP và bộ lọc. Hiện "theo gender" đi bằng `dkDept`/`menuTab` trong breadcrumb, không bằng
dữ liệu sản phẩm. Muốn "New arrivals theo gender" như brief khối 2 nói thì phải thêm `gender`
cho 48 SP trong MỘT lượt để cả 3 chỗ đọc chung.

Kèm 1 hạn chế nhỏ: `applyLang` **không duyệt `alt`** (chỉ text node + `placeholder` /
`aria-label` / `data-toast`), nên bản EN vẫn đọc `alt` tiếng Việt — y như `alt` tên sản phẩm
ở PLP/PDP. Cặp khoá i18n cho 3 chuỗi `alt` của hero vẫn khai sẵn, hôm nào mở thêm `alt` thì
chạy luôn.

---

## 9. Cần bạn chốt — 7 mục

1. **Khối 6 của brief vs lệnh 26/08.** Brief ghi *"Sign up (loop in footer)"*, nhưng
   `footer()` đã **bỏ hẳn** dải newsletter ngày 26/08 theo lệnh trực tiếp của bạn (gỡ kèm cả
   vạch `h-px`), và lượt này footer phải dùng nguyên vẹn. Tôi dựng khối 10 thành **section
   riêng ngay trên footer**. Ba đường: **(a)** giữ vậy — footer nguyên vẹn, brief đạt về nội
   dung · **(b)** trả newsletter VÀO footer — phải sửa `footer()` ở cả 2 file và đảo chốt
   26/08 · **(c)** bỏ khối 6. Tôi **không tự chốt**.

2. **Hero desktop là 2 tấm hàng NỮ** trong khi `dkDept` mặc định là 'Nam'. Kho có **0 tấm KV
   ngang tỉ lệ ≥1,78 có người mẫu nam** (`kv-men-8` đã loại vì nội dung; `kv-men-9` là tĩnh
   vật và đang treo câu hỏi khai tử). Đã bù: **hero mobile đi đúng cặp nam/nữ** và 2 ô danh
   mục ngay dưới hero desktop là 2 tấm KV nam khổ native. **Khuyến nghị:** giữ vậy lượt này,
   rồi **xin khách 1 tấm KV ngang hàng nam** — có tấm đó thì hero đổi được theo `dkDept` mà
   không sửa một dòng bố cục nào.

3. **Copy cần khách cấp.** Tôi bám dữ liệu thật hết mức: 6 câu HỎI của FAQ bám 4 dòng
   `CAM_KET` + ngày đặt trước + nút Bảng kích thước; 4/6 câu TRẢ LỜI dùng nguyên văn
   `CAM_KET`. Còn **3 chuỗi là chữ của tôi**, đừng ship lên bản bàn giao khi chưa duyệt:
   2 câu trả lời FAQ cuối, đoạn dẫn khối Đăng ký, và câu giới thiệu Versace (rút gọn từ copy
   thật của `BRAND_PAGES['Versace'].desc`).

4. **Độ dài trang: 5.794px ở 1440 = 1,80× PDP.** Muốn ngắn hơn thì cắt được **nguyên khối**,
   không khối nào phụ thuộc: bỏ khối 5 Ưu đãi (−1.264) và/hoặc khối 7 Thẻ thương hiệu (−280)
   → còn ~4.250.

5. **Trần logo 22px ở ô 256 chỉ dư 6,2px.** `brand-logo-dg.png` ở cao 22 ra rộng 218, lòng ô
   224,2. Có `max-width: 100%` rào ở dải hẹp nên không tràn. Chấp nhận khít, hay hạ về **4 ô
   × 330** (lòng 282, dư 64) và bỏ Moschino khỏi hàng?

6. **3 tấm còn không có ô:** `kv-men-9.jpg` (1440×480 — ô 0-cắt duy nhất là 1392×464, và tấm
   này đang treo câu hỏi khai tử ở `MAIN-KV` mục 7.4) · `kv-gift.jpg` (400², quá nhỏ) ·
   `brand-hero.png` (cố ý tránh, chỉ giữ 45% chiều cao ở ô 575×320). Có cần dựng thêm một
   khối "atelier" 1392×464 cho `kv-men-9` làm nhịp nghỉ, hay chốt bỏ tấm đó?

7. **3 fork skin chưa port.** `desktop-neutral.html` · `desktop-editorial.html` ·
   `desktop-atelier.html` **không có** screen `home` (đóng băng từ 21/08). Logo của chúng vẫn
   về PLP. Port khi nào bạn cần so bộ da trên trang chủ.

---

---

## 10. Bẫy cho lượt sau

* **Tiêu đề mục PHẢI là chuỗi `text-[18px] font-medium leading-7 text-foreground`.** Đổi sang
  `.t-display-title` là mất Libre Bodoni (xem 8.2).
* **`grid-cols-6` không có trong `tailwind.css` đã build** (chỉ 1..5) — đó là lý do có
  `.hm-cats`. Kiểm tra utility tuỳ ý trước khi gõ, class chết rơi im lặng.
* **Không chép `id="plpGrid"`** cho lưới trang chủ: `plpShownCount` và `syncShowMore` query
  `#plpGrid` trên `document`. Lưới trang chủ dùng mốc `data-home-grid`.
* **Nút mũi tên phải mang CẢ class vị trí (`.dk-rail-prev`) VÀ attribute (`data-rail-prev`)**
   — `wireRail()` bám attribute, CSS bám class.
* **Cụm FAQ phải giữ móc `data-pdp-acc`** — bỏ móc là nhãn rơi từ 14/20·500 về 12/18 và 2
  accordion trong cùng app nói khác nhau. Tên móc mang chữ 'pdp' nhưng dùng ở trang chủ:
  xếp vào đợt quét tên của `NAMING-MAGENTO`.
* **Markup nằm trong template literal:** cấm dấu backtick và cấm 2 dấu gạch liền trong
  comment HTML. Chạy `node --check` khối script sau mỗi lượt sửa.
* **Khung kiểm tự động có `visibilityState = hidden`** → mọi cuộn mượt (`scroll-behavior:
  smooth`) đứng im. Đo thấy một nút cuộn "không chạy" thì kiểm `document.hidden` TRƯỚC khi
  kết luận là lỗi.
* **Bust cache khi đo** — lượt đo đầu của tôi đọc bản `index.html` cũ trong cache và
  `screenHOME` ra `undefined`.
* **`.dk-look-band` không cần override `--look-rise`**: thẻ gọi đúng bộ option của PDP nên
  chiều cao thẻ không đổi. Nếu về sau đổi option hoặc tỉ lệ ảnh thì
  `rise = chiều cao thẻ đo thật − (352 − 32)`, khai vào một class riêng, **đừng chép lại 20
  dòng rule**.

## 11. Lượt 05/09/2026 — MỌI carousel về MỘT HÀNG

Lệnh user: *"ở trang homepage mà bạn đã tạo thì carousel cho 1 hàng thôi rồi user tự lướt
qua, cả 2 phiên bản chỉ nên cho 1 hàng cho mỗi carousel."*

Trước lượt này có 4 khối xuống nhiều hàng:

| Khối | Trước | Sau |
|---|---|---|
| Hàng mới về — desktop | lưới 4 cột × **2 hàng** | dải **1 hàng**, thẻ 341 (4 thẻ/lượt, 8 SP = 2 lượt) |
| Hàng mới về — mobile | lưới 2 cột × **4 hàng** | dải **1 hàng**, thẻ 170 |
| Mua theo danh mục — desktop | lưới 6 cột (xuống **2 hàng** dưới 1024) | dải **1 hàng**, ô 212 cố định |
| Mua theo danh mục — mobile | lưới 3 cột × **2 hàng** | dải **1 hàng**, ô 140 |
| Thương hiệu — desktop | lưới 5 cột (xuống **2 hàng** dưới 1024) | dải **1 hàng**, thẻ 259 cố định |

Bốn dải còn lại (hero · Đang giảm giá · Nhà mốt · Thương hiệu mobile) vốn đã một hàng.

**Bề rộng ô là HẰNG SỐ, không chia phần.** Dải một hàng mà đặt `1fr` thì món cuối co lại
theo số món còn thấy được — mỗi khổ màn một cỡ thẻ. Số chọn sao cho khổ 1440 **vừa khít
không phải cuộn** (6×212 + 5×16 = 1352 < 1377 · 5×259 + 4×16 = 1359 < 1377), xuống dải hẹp
thì nó cuộn thay vì xuống hàng — và `wireRail()` tự ẩn 2 mũi tên khi không có gì để cuộn,
nên không bày nút không có việc.

**Đo lại sau khi sửa** — mọi dải đều **rows = 1**:

| | desktop 1440 | mobile 375 |
|---|---|---|
| Hero | 2 món · 1 hàng | 2 món · 1 hàng |
| Hàng mới về | 8 món · 1 hàng · thẻ 341 | 8 món · 1 hàng · thẻ 170 |
| Danh mục | 6 món · 1 hàng · ô 212 | 6 món · 1 hàng · ô 140 |
| Đang giảm giá | 11 món · 1 hàng | 11 món · 1 hàng |
| Nhà mốt | 3 món · 1 hàng | 3 món · 1 hàng |
| Thương hiệu | 5 món · 1 hàng · thẻ 259 | 5 món · 1 hàng · thẻ 259 |

Ở 1000px: danh mục và thương hiệu **vẫn 1 hàng** và chuyển sang cuộn; không tràn ngang.

**Trang ngắn đi đáng kể:** desktop **5.794 → 5.204** (−590) · mobile **5.935 → 4.674**
(−1.261). Nay còn 1,62× PDP thay vì 1,80×.

**Đánh đổi đã nói trước khi làm:** lượng hàng hoá phơi ra cùng lúc giảm — desktop từ 8 thẻ
thấy ngay xuống còn 4, mobile từ 4 thẻ xuống 2 (thẻ thứ 3 ló ra). Đổi lại trang ngắn hơn
1/5 đến 1/4 và mọi khối nói cùng một cử chỉ: lướt ngang.

**CSS: KHÔNG thêm class nào, còn BỚT đi.** `.hm-cats` và `.hm-brands` đổi từ `grid` sang
`flex`; thêm `.hm-cat` (bề rộng ô); `.hm-newgrid` **gỡ hẳn** cùng nhánh `@media` hạ cột của
nó. Khối `@media (max-width: 1023px)` nay chỉ còn `.hm-faq-cols` và `.hm-signup` — hai khối
đó **không phải carousel** (là khối nội dung) nên vẫn hạ cột như cũ.
Desktop dùng lại nguyên `.dk-rail` + `wireRail()` cho cả 3 dải mới; mobile theo nếp sẵn có
của bản mobile: vuốt tay, không mũi tên.

