# Homepage — `home.html`

> Dựng 24/08/2026, **gộp 2 trang chủ vào 1 file** cùng ngày.
> File này nay chứa **3 screen**, hàng dept của menu bar gốc là bộ điều hướng:
> `Nam` → screen `nam` (tài liệu này) · `Nữ` → screen `nu` (xem `HOMEPAGE-NU.md`)
> · `Làm đẹp` → screen `beauty` (xem `HOMEPAGE-BEAUTY.md` — khuôn Index-First).
> Trọng tài: `STYLE-RULES.md`. Nguồn token: `shadcn-theme/theme.css` (bộ bàn giao).
> Mở tại `http://localhost:8124/home.html` (hoặc `#nu`, `#beauty`).

---

## 0. Lượt gộp 24/08/2026 — 4 xung đột phải xử, không phải nối 2 file rồi xong

Lệnh user: *"gộp chung 2 homepage vào 1 file để tôi có thể swap qua lại bằng menu
nam và nữ trên header"*. `home-nu.html` đã **xoá** (nội dung nay là screen `nu`);
bản lưu phòng lùi nằm ở scratchpad của phiên.

**Router là hàng dept của menu bar GỐC** — không thêm nút điều khiển nào. Bản gốc
cho 3 dept trỏ về PLP; ở đây mỗi dept là một trang chủ ngành, đúng data sẵn có:
`MENU_DATA[dept].home` = *"Trang chủ nam / nữ / làm đẹp"*. Trạng thái mang theo
qua hash (`#nu`, `#beauty`) nên F5 không mất chỗ đang xem.

| # | Xung đột | Xử thế nào |
|---|---|---|
| 1 | `.rv` khai ở **cả 2 file**, cùng tên khác giá trị → rule sau thắng cả 2 screen | Gộp thành **một** rule điều khiển bằng biến (`--rv-y · --rv-dur · --rv-stagger · --rv-img-dur`), nhịp riêng khai ở khối ROUTER. Rule nhận **cả** `--d` (screen Nam khai delay tuyệt đối) lẫn `--i` (screen Nữ khai chỉ số) → markup 2 bên **không phải sửa** |
| 2 | `--ease`/`--dur` khác nhau (Nam `.7s cubic-bezier(.32,.72,0,1)` · Nữ `.6s cubic-bezier(.16,1,.3,1)`) | Đưa vào biến theo screen |
| 3 | **6 id đụng nhau**: `props` · `propsMin` · `nsForm` · `nsMail` · `nsNote` · `maisons` | Screen Nữ thêm hậu tố `Nu`. `#topFab` giữ **đúng 1 bản** dùng chung |
| 4 | 2 khối JS đều khai `const A` · `card()` · `io` · `fab` ở tầng ngoài | Mỗi screen bọc **IIFE** riêng; observer + nút về đầu trang + router nâng lên dùng chung |

`skin-min` (bộ da của screen Nữ) **chỉ** được gắn/gỡ ở một chỗ duy nhất —
`setScreen()` — nên nó không thể rò sang screen khác. Menu bar nằm **ngoài** mọi
screen nên `skin-min` không chạm tới nó được: đo cả 3 screen, `.navbar` đều cao
**161** và `.dk-dept` đều `12/16 · 500 · HOA`.

**Bổ sung 24/08 (khi dựng screen `beauty`):** subheader nay **đổi theo ngành** —
đúng `dkNavCats()` của bản gốc. Ngành thời trang 8 mục; ngành Làm đẹp **11 mục**
sinh từ `MENU_DATA['Làm đẹp'].cats`, và vì 11 mục nên thanh tràn → **mũi tên
trượt lần đầu hiện ra**. Lượt gộp ban đầu dựng subheader một lần rồi thôi nên mất
hành vi này. Chi tiết + bẫy rò listener: `HOMEPAGE-BEAUTY.md` mục 3.

**Khổ < 768:** hàng dept bị ẩn (đúng bản gốc `index.html`) mà router lại nằm ở
hàng đó → điện thoại không có đường đổi ngành. Panel menu trượt gốc chưa port,
nên nút hamburger mở một **bảng ngành hàng tối giản** dùng đúng linh kiện
`.dk-dept` (3 hàng 48px, kẻ mảnh). Port panel gốc sang thì bỏ bảng này.

**Số đo sau gộp, 3 screen:**

| | screen `nam` | screen `nu` | screen `beauty` |
|---|---|---|---|
| Tổ hợp typo | **7** | 8 (3 bậc serif) | **7** |
| Mặt chữ | **1** | 2 | **1** |
| Tracking | **1** | 4 (3 giá trị âm của serif) | **1** |
| Bậc mực | **3** + đỏ + trắng | như bên | như bên |
| Sắc viền | **3** tầng | **3** tầng | **3** tầng |
| Nền trang | `#ffffff` | `#f7f6f3` | `#ffffff` |
| Bo góc sai · bóng | **0 · 0** | **0 · 0** | **0 · 0** |
| Tràn ngang | không | không | không |

**2 lỗi do chính lượt gộp sinh ra, đã sửa:**
1. **Lưới "Sản phẩm mới" rỗng** (`#prods` có 0 card). Lời gọi `renderProds()` đầu
   tiên vốn nằm trong khối REVEAL của `home.html` cũ; khối đó nâng lên thành
   observer dùng chung nên lời gọi bị bỏ theo. Đã chuyển về cuối phần dựng.
2. **Card chèn sau không có lưới an toàn.** Hẹn giờ 2.5s trước đây đặt **một lần
   cho mỗi lần đổi screen**, nên card do bấm tab lọc sinh ra sau đó không được
   phủ — đo được 8 card đứng vô hình. Đã dồn lưới an toàn vào **chính**
   `RV.observe()`, tức mỗi lượt gọi có hẹn giờ riêng.

Kiểm được: đổi screen 2 chiều · hash boot `#nu` · bảng ngành hàng khổ nhỏ · mega
panel vẫn mở sau 120ms · 2 bảng công tắc không chồng nhau · screen chưa mở **giữ
nguyên** hiệu ứng vào màn (39 phần tử `.rv`, 0 đã mở) và chỉ chạy khi được mở.

---

## 1. Ba quyết định khác 2 demo cũ — và vì sao

**1.1 Không link `tailwind.css`.**
Bản build hiện tại chỉ chứa utility mà `index.html` + `desktop.html` đang dùng.
Đã dò trước khi viết: **thiếu** `py-20`, `col-span-2`, `duration-700`, mọi
`tracking-[…]` tuỳ ý. Dùng nó cho trang mới là dựng trên nền có lỗ, mà muốn đủ
thì phải thêm `home.html` vào `content` rồi **rebuild file dùng chung** — tức
đặt 2 demo đang chạy vào vòng rủi ro để lấy vài class. Trang này viết CSS ngữ
nghĩa `.hp-*` thẳng trên token: không rebuild gì, không chạm file nào của 2 demo.

**1.2 Nguồn token là `shadcn-theme/theme.css`, không phải lớp remap `skin-mt`.**
Bộ bàn giao là đích thật (Magento + Tailwind + shadcn/ui). Dựng homepage thẳng
trên nó nên trang này kiêm luôn một phép thử: **bộ token bàn giao có đủ để dựng
một homepage luxury không cần thêm biến nào?** Kết quả: đủ. Không thêm một biến
màu/viền/mặt nào; chỉ thêm 3 biến **nhịp** (`--rail`, `--gut`, `--sec*`) và 1
biến easing — nhịp là trục `STYLE-RULES` chưa quy định.

**1.3 Một file responsive 375 → 1440, không tách 2 bản.**
Đây là chỗ ngược quy ước `index.html` / `desktop.html`. Lý do: bảng §0 của
`STYLE-RULES` cho thấy chính việc tách 2 file đã sinh **5/12 cỡ chữ lệch nhau**.
Homepage là trang khách gặp đầu tiên; nhân đôi chỗ lệch ở đúng chỗ đắt nhất là
lỗ hổng chứ không phải tính năng. Mốc vẫn 768px như CẦU NỐI của 2 file kia, nên
muốn tách lại sau vẫn được.

---

## 2. Cấu trúc trang — lấy gì từ 3 site

Lấy **nhịp trang**, không lấy linh kiện (memory: *tham chiếu ≠ bê nguyên*).

| # | Mục | Lấy từ | Linh kiện là của mình |
|---|---|---|---|
| 1 | Promo bar đen, 3 thông điệp xoay | — | **PORT 1:1 BỘ THIẾT KẾ GỐC** (mục 2b) |
| 2 | Header 2 tầng + mega panel 4 cột | — | **PORT 1:1 BỘ THIẾT KẾ GỐC** (mục 2b) |
| 3 | Hero chia đôi editorial | mytheresa | ảnh giữ tỉ lệ thật, chữ ở nửa còn lại trên mặt trắng |
| 4 | Dải cam kết 4 ô | mrporter · cettire | ngăn bằng kẻ 1px (`gap: 1px` + nền V3) |
| 5 | Danh mục 6 ô vuông 1:1 | cettire | quy ước `CATEGORIES` sẵn của dự án |
| 6 | Sản phẩm mới + tab lọc | mytheresa | `productCard` của dự án, đã sửa 2 chỗ lệch luật |
| 7 | Tiêu điểm 2 khối lệch tầng | mrporter | bất đối xứng bằng **độ cao**, không xoay/đè |
| 8 | Đang được quan tâm | cả 3 site | cùng card |
| 9 | Nhà mốt, lưới kẻ mảnh | mrporter | tên brand = **họ nội dung chữ thường** (§1.5 mục 6) |
| 10 | Dịch vụ boutique | mrporter | 3 hàng ngăn kẻ V3 |
| 11 | Newsletter | mytheresa | mặt xám `#f2f2f2`, **không** dải đen |
| 12 | Footer 4 cột + thanh pháp lý | cả 3 site | IA và nội dung lấy đúng `FOOTER_COLS` của demo |

### 2b. Menu bar — port 1:1 từ bộ thiết kế gốc (lệnh user 24/08/2026)

Bản đầu tôi **tự dựng lại** menu bar: một hàng 8 mục (Nữ · Nam · Túi xách · Giày
dép · Trang sức · Làm đẹp · Thương hiệu · Khuyến mãi) cộng một hàng dịch vụ tự
thêm. Sai — dự án đã có menu bar riêng. Đã thay bằng đúng bản gốc:

| | Bản tôi tự dựng (đã gỡ) | Bản gốc (đang dùng) |
|---|---|---|
| Tầng | 1 hàng nav + 1 hàng dịch vụ tự thêm | promo 32 + `#dkNavRow` 64 + `.dk-sub` 64 |
| Ngành hàng | 8 mục một hàng | **3 dept** (Nam · Nữ · Làm đẹp) bên TRÁI |
| Danh mục | không có tầng riêng | **8 mục** ở subheader: Sản phẩm mới · Quần áo · Giày dép · Túi xách · Phụ kiện · Pre-loved · Thương hiệu · Khuyến mãi |
| Logo | trái | **giữa**, 93×20 |
| Tiện ích | 5 nút tự chọn | tìm kiếm · **cờ + VIE** · tài khoản · giỏ (44×44, icon 16) |
| Mega panel | 1 panel tự viết | **6 panel** sinh từ `MENU_DATA`; Thương hiệu chia 25 nhà mốt thành 3 cột **9/8/8** |
| Mở panel | CSS `:hover` | **hover-intent 120ms** + swap chiều cao khi đổi mục |
| Nền trang khi mở panel | không có | **scrim `rgba(0,0,0,.45)`** kiểu Farfetch |
| Tìm kiếm | nút trơn | **ô nhập quét từ phải sang trái đè lên hàng nav**, dept + logo + subheader mờ về 0, icon đổi thành ✕ |
| Cuộn xuống | tôi cho header trượt lên ẩn đi | **không ẩn** — sticky `top:-32px`, promo cuộn qua rồi nav đứng lại |

Giữ **nguyên tên class** (`.navbar` · `.dk-dept` · `.dk-nav-link` · `.dk-mega` ·
`#dkNavRow` · `#dkSubRow` · `.dk-scrim` · `.glass-95` …) để port ngược về 2 demo
là copy thẳng, không phải dịch tên.

**Số lấy bằng ĐO trên trang chạy**, không chép từ markup — vì markup mang hệ chữ
TRƯỚC remap (promo bar viết `text-[14px] font-medium leading-5` nhưng skin-mt vẽ
ra `12/18 · 400`). Đối chiếu sau khi port, `desktop.html` ↔ `home.html`:

| | desktop.html | home.html |
|---|---|---|
| `.navbar` | sticky · top −32 · cao **161** | khớp |
| promo | 32 · `#0a0a0a` · 12/18 · 400 · trắng | khớp |
| `#dkNavRow` | 64 · kẻ 1px `#ececec` · pad 8 · max-w 1440 | khớp |
| mặt kính | `rgba(255,255,255,.95)` + blur 7.5 | khớp |
| `.dk-dept` | 12/16 · 500 · HOA · h36 · px16 · bo 0 · `#0a0a0a` / `#666` | khớp |
| `.dk-nav-link` | 12/16 · 500 · HOA · `#333` · ô **134×36** | khớp |
| mega panel | 1425×370 · top 166 · nền trắng đặc · kẻ 1px `#dfdfdf` · không bóng | khớp |
| lưới mega | 4 × **296.2px** · gap 64 · gap trong cột 14 | khớp |
| nhãn nhóm mega | 12/18 · 500 · HOA · `#0a0a0a` · pb 16 | khớp |
| teaser | cột 4 · kẻ trái 1px `#dfdfdf` · pad trái 40 · ảnh 1:1 | khớp |
| badge giỏ | 15×15 · 10px · 400 · đen/trắng · tròn | khớp |
| ô tìm kiếm | 965×40 · left 230 · gạch chân 1px `#0a0a0a` · bo 0 | khớp |

Khổ < 768 lấy header gốc của `index.html`: promo 32 + `.navbar` **48** ·
`[menu · tìm kiếm]` — logo — `[tài khoản · giỏ]`, nút 24×24 icon 20, cụm 2 bên
rộng 133, lề 16, **không** hàng dept, **không** subheader. Đo lại: khớp cả 7 số.

**Một DOM cho 2 khổ** là chỗ DUY NHẤT khác bản gốc về markup: bản gốc mỗi file
chỉ vẽ phần của nó, ghép vào một file thì cụm riêng của mỗi khổ phải có công tắc
(`.dk-only-dk` / `.dk-only-mb`).

**Một chỗ lệch số CÓ CHỦ Ý:** `.dk-dept:hover` bản gốc là `#404040`
(`--unofficial-foreground-alt`) — bậc mực **thứ 4**, ngoài 3 bậc §2.1. Đưa về
`#333`, cũng là mực `.dk-nav-link` đang dùng. Lệch 13/255 nên không đọc ra; giữ
`#404040` thì cả trang mất tính "đúng 3 bậc mực". **Cần bạn xác nhận.**

**Gỡ 24/08 — thẻ hàng trên ảnh hero (`.hp-shoptag`).** Lệnh user: *"hình ảnh
banner không cần đính kèm tên và giá sản phẩm"*. Thẻ này mang brand + tên sản
phẩm + giá, tức biến hero thành mặt bán một SKU. Hero là mặt CHIẾN DỊCH; tên và
giá là vai của card/PDP. Đã gỡ cả markup lẫn CSS (không để rule mồ côi) — ảnh
hero screen `nam` nay **0 lớp chữ đè lên**.

**Hero vì sao chia đôi mà không full-bleed:** cả kho ảnh dự án là **1200×1484
(dọc)**. Cắt ảnh dọc thành dải ngang thì chỉ còn một lát giữa, mất hết dáng sản
phẩm. Ảnh giữ tỉ lệ thật ở nửa phải, chữ ở nửa trái trên mặt trắng — nên không
cần lớp phủ tối để đọc được chữ, mà §2.2 vốn cũng không có mặt phủ nào.

---

## 3. Số đo sau khi dựng — so với 2 demo

Đo bằng `getComputedStyle` trên toàn trang, ở **3 khổ 375 · 1024 · 1440**, chỉ
tính phần tử đang hiện có text trực tiếp (đúng bộ scan của `STYLE-RULES` §0).

| Trục | `index.html` | `desktop.html` | **`home.html`** |
|---|---|---|---|
| Tổ hợp typo | 23 | 26 | **8** — 6 tổ hợp nội dung (đều 400) + 2 tổ hợp nhãn (12/16 và 12/18, đều 500 + HOA). Đo cả lúc MỞ hết 6 mega panel. |
| Cỡ chữ | 7 (có 9) | 8 (có 9, 11) | **5** — 10 · 12 · 14 · 18 · 24 |
| Giá trị tracking | 5 | 7 | **1** — 0.5px |
| Độ đậm | 400 + 500 (41% chữ ở 500) | 400 + 500 (37%) | **400 + 500**, 500 chỉ ở 33 phần tử nhãn, **tất cả đều HOA** — không có 500 chữ thường |
| Bậc mực | 4 + rò | 4 + rò | **3** + `#d62845` (badge giảm giá) + trắng trên mặt tối |
| Sắc viền | 5 | 6 | **3** — V1 `#0a0a0a` · V2 `#dfdfdf` · V3 `#ececec` |
| Bo góc ≠ 0 | 0 vi phạm | 0 vi phạm | **0 vi phạm** — chỉ hình tròn thật (ô màu, chấm, badge số) |
| Đổ bóng | 0 | 0 | **0** |
| Mặt phẳng | 2 + glass | 2 + glass | **2** (`#fff` · `#f2f2f2`) + `glass-95` chỉ ở navbar + mặt tối ở promo bar/nút |
| Tràn ngang | — | — | **không** — `scrollWidth ≤ innerWidth` ở cả 3 khổ |

Cột `home.html`: **0 vi phạm** trên cả 6 trục dò của §1.2 · §1.3 · §2.1 · §3.1 ·
§3.2 · §3.3, ở cả 3 khổ, kể cả khi mở hết mega panel.

Một ghi chú về tổ hợp `12/18 · 500 · HOA` (nhãn nhóm mega panel, đến từ bản gốc):
nó **không** nằm trong bảng T1–T7 của §1.2 — T6 là 12/16. Nhưng nó hợp §1.3: nhãn
nhóm mega có thể xuống dòng ("Túi xách & Giày dép") nên đi nhịp 1.50 chứ không
phải 1.33. Tức đây là **họ nhãn ở nhịp nhiều dòng**, không phải bậc chữ mới. Muốn
§1.2 phủ hết thì thêm một dòng vào bảng, không phải sửa bộ da.

---

## 4. Bốn lỗi tìm được trong lúc đo, đã sửa

1. **Mega panel rộng 55px.** Panel là `absolute left:0 right:0` mà mục nav lại
   `position: relative` → mục nav thành khối chứa, panel co bằng bề rộng chữ
   "Nữ". Sửa: mục nav về `position: static`, khối chứa là `.hp-head`. Nay panel
   trải đủ 1425px, 4 cột đều 296px.
2. **Hero cao 994px, vượt màn laptop 900px.** Ảnh dọc tự kéo chiều cao hàng
   lưới. Sửa: ảnh `position: absolute`, chiều cao hàng do
   `clamp(520px, 100dvh - 148px, 760px)` quyết định. Nay 752px, đáy hero ở 894
   — vừa một màn kể cả thẻ hàng.
3. **Lưới sản phẩm lệch cột ở 1024** (210/211/**287**/209): `1fr` =
   `minmax(auto, 1fr)` nên tên *"Khăn lụa in họa tiết Broken Jewels 90x90cm"*
   đẩy rộng cột của nó. Sửa: mọi track về `minmax(0, 1fr)` + `min-width: 0`
   trên thẻ. Nay 4 cột đúng 228.2px, tên dài cắt bằng ellipsis.
4. **`transition: font-size`** trên tiêu đề hero — chuyển động đổi layout, đúng
   thứ guardrail hiệu năng cấm. Đã gỡ; cả trang nay chỉ chạy `transform` +
   `opacity`.

5. **Cắt handler cũ để lại `});` mồ côi** khi thay header — cả `<script>` không
   parse được. Bắt bằng `node --check` trên đoạn script bóc ra từ file.
   *Bẫy khi đọc console:* bộ đệm console của preview pane **không xoá khi điều
   hướng**, nên lỗi cũ còn nằm đó sau khi đã sửa. Cách phân biệt: chèn một
   `console.clear` rồi xem lỗi nằm TRƯỚC hay SAU nó.

Kèm 2 chỗ nới **vùng bấm** mà không xê dịch pixel nào (`::before` phủ ngoài):
nhãn tab 39×24 → 44px, ô màu 20×20 → 42px.

---

## 5. Hai chỗ skill `high-end-visual-design` đòi mà luật đang cấm

Skill đòi bo góc `2rem`, bóng khuếch tán, glass khắp nơi, eyebrow
`tracking-[0.2em]`, font Clash/PP Editorial. `STYLE-RULES` cấm cả 5. Theo đúng
điều khoản "luật thắng số đo, thắng ghi chú trong code", tôi **giữ luật** và chỉ
lấy từ skill phần không đụng luật: nhịp trắng lớn (96/128px), một đường cong
`cubic-bezier(.32,.72,0,1)` cho mọi chuyển động, reveal theo scroll bằng
`IntersectionObserver`, kiến trúc lồng (diễn đạt lại bằng **kẻ mảnh** thay vì bo
góc + bóng: ô mũi tên trong nút outline là một ô vuông ngăn bằng kẻ V1).

Còn **2 chỗ đáng bàn thật**, đã dựng thành công tắc ở bảng "Đề xuất sửa luật"
góc phải, **tắt sẵn** (mở trang ra là bản đúng luật 100%):

### Việc 1 — Bậc chữ hiển thị cho hero

§1.2 chốt 5 cỡ, cao nhất **24/32**. Homepage là trang duy nhất cần một khoảnh
khắc CỠ, và thang Figma vốn **đã có 32 và 48** (memory: `dafc-thang-chu-text-style`)
— tức không phải bịa cỡ mới, chỉ là §1.2 lúc chốt chưa tính tới vai này.

* **A — thêm bậc `T0` 48/56, khoá vào đúng 1 vai (tiêu đề hero trang chủ).**
  Bật công tắc để xem. Cỡ 48 là bậc có sẵn trong Figma nên không đẻ giá trị lạ.
* **B — giữ 24/32.** Khoảnh khắc lớn để cho **ẢNH** gánh: hero cao 752px, ảnh
  835px — đúng cách mytheresa và cettire làm, chữ họ cũng nhỏ.

→ **Khuyến nghị: B, đúng như trang đang chạy.** Lý do đo được: hero hiện đã
chiếm đủ một màn và ảnh 835px đã là vật thể lớn nhất trang; thêm chữ 48px là hai
thứ tranh nhau làm tâm. Nếu chốt A thì phải sửa §1.2 **trước**, và ghi rõ vai
duy nhất được dùng — kẻo 48 lan sang tiêu đề mục.

### Việc 2 — Nhãn eyebrow trên tiêu đề mục

§1.5 khoá chữ hoa vào **5 vai**, và "tiêu đề mục trong thân trang" không có
trong đó. Hiện tiêu đề mục là họ nội dung `18/24 · 400 · chữ thường`.

* **A — thêm vai thứ 6: nhãn eyebrow trên tiêu đề mục** (`12/16 · 500 · HOA`).
  Bật công tắc để xem: nó cho mỗi mục một tầng phân cấp nữa, rất mrporter.
* **B — không thêm.** Phân cấp mục hiện do **kẻ mảnh + khoảng trắng 96px** lo.

→ **Khuyến nghị: B.** §1.5 đã phải rút 2 vai khỏi danh sách trong 4 ngày (tên
chương trình quà 21/08, tên brand 24/08). Danh sách vừa co lại thì chưa nên nở
ra. Nếu muốn mục nổi hơn thì đòn bẩy đúng của họ nội dung là **lên bậc cỡ**:
tiêu đề mục 18 → 24.

---

## 6. Chưa làm — và vì sao

* **Panel menu trượt ở khổ mobile** (`.ms-view` + `MENU_DATA` 3 tầng của
  `index.html`) và **tấm gợi ý tìm kiếm** (`#dkSearchLayer` của `desktop.html`).
  Hai cái này là component MÀN, không thuộc menu bar: nút menu và nút tìm kiếm
  của bản gốc đã port đủ, phần mở ra sau khi bấm thì chưa. Nút menu tạm cuộn tới
  mục danh mục (có đường đi thật, không phải nút chết); nút tìm kiếm mở đúng ô
  nhập gốc, chỉ thiếu tấm gợi ý bên dưới. Chép 2 component lớn ra chỗ thứ hai là
  việc nên tránh — chờ chốt: **trang này nhập vào 2 demo hay đứng riêng?**
* **i18n VN/EN.** Trang chưa nối `I18N`. Chuỗi đều là tiếng Việt sentence case,
  chữ hoa 100% do `text-transform` nên **không gõ hoa vào chuỗi nào** — sẵn sàng
  cho lượt dịch, chỉ thiếu bảng.
* **Chưa chạy được các hành vi cần khung hình.** Preview pane phiên này không
  composite frame (`document.hidden === true`) nên `requestAnimationFrame` và
  `IntersectionObserver` **không bắn**. Hệ quả: *reveal khi vào màn* và *nút về
  đầu trang hiện sau 600px* chưa chạy thật trên trình duyệt.
  Ngược lại, menu bar chạy bằng `setTimeout` nên **đã kiểm được đầy đủ**:
  hover-intent không mở ngay mà mở sau 120ms · đổi mục khi đang mở là swap tức
  thì · rời chuột 120ms thì đóng · scrim bật đúng lúc · ô tìm kiếm quét ra đúng
  965×40 tại left 230 và làm mờ dept/logo/subheader về 0 · mũi tên trượt đúng
  trạng thái ẩn (8 danh mục vừa khít 1409px ở khổ 1440).
  *(Việc header trượt-ẩn-khi-cuộn đã GỠ — bản gốc không có hành vi đó.)*
  *Điểm sáng của cùng sự cố:* lưới an toàn 2.5s viết cho `.rv` đã tự kích hoạt
  và giữ nội dung hiện đủ — đúng tình huống nó được viết ra để chống.
* **Chưa chụp được ảnh màn.** Cùng lý do trên.

---

## 7. Cần bạn chốt

1. **Việc 1 + Việc 2** ở mục 5 (bật 2 công tắc rồi so, khuyến nghị của tôi là
   giữ nguyên cả hai).
2. **Trang này đứng riêng hay nhập vào 2 demo?** Ảnh hưởng: panel menu mobile,
   i18n, và việc có tách lại thành 2 file hay không.
3. **Card sản phẩm ở đây đã sửa 2 chỗ lệch luật của `productCard`** trong 2
   demo (giá + tên brand bỏ `font-medium` chữ thường; badge `-%` bỏ nền hồng).
   Có port ngược 2 sửa này về `index.html` + `desktop.html` không? Nếu có thì
   `AUDIT-TYPO-SHADCN-2026-08-24.md` phải dò lại.
4. **`.dk-dept:hover` — giữ `#404040` của bản gốc hay `#333` như hiện tại?**
   Chỗ duy nhất tôi lệch khỏi bản gốc khi port menu bar.
5. **Ảnh chiến dịch.** Hiện dùng ảnh sản phẩm dọc 1200×1484 cho cả hero và mục
   tiêu điểm. Có ảnh **ngang** (2400×1200 trở lên) thì hero đổi được sang khuôn
   full-bleed như mrporter — nhưng đó là đổi bố cục, không phải đổi ảnh.
