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

---

## 8. Lượt 27/08/2026 — dựng lại screen `nam` theo brief khách + eu.lookfantastic.com

Lệnh user: *"trang homepage khách hàng tôi brief như này https://eu.lookfantastic.com/
— hãy thử áp dụng vào trang homepage nam"*, kèm 2 ảnh: một trang brief chữ
(**Fashion – Men / Women**) và một mock trang chủ nam của site khác.

### 8.1 Brief khách có ĐÚNG 6 khối — trang nay đi đúng thứ tự đó

| # | Brief khách | Mục trên trang | Trạng thái trước 27/08 |
|---|---|---|---|
| 1 | Hero banner (**slider**) | 1. Hero slider 3 slide | hero TĨNH, không có slider |
| 2 | Highlight top sub-cate (main cate **by gender**) | 3. Mua theo danh mục — 6 ô | có, nhưng danh mục **hàng nữ** |
| 3 | New arrivals | 4. Sản phẩm mới — tab + dải trượt | có, nhưng **lưới 4 cột** + hàng nữ |
| 4 | Brand block (2 khối: **brand day** + **brand list card**) | 5. Thương hiệu trong ngày · 6. Thẻ thương hiệu | chỉ có **lưới TÊN CHỮ**, 1 khối |
| 5 | USP DAFC Online / QA block | 7. Vì sao mua tại DAFC Online + Câu hỏi thường gặp | USP có; **QA chưa tồn tại** |
| 6 | Sign up (**loop in footer**) | dải đầu `.hp-foot` | là **section riêng NGOÀI footer** |

Mock ảnh thứ hai của khách khớp cùng khuôn: dải sale trên cùng → hero ảnh lớn có
`SHOP NOW` → hàng ô danh mục có nhãn (Shoes · Watches · Accessories · Fragrances)
→ khối một nhà mốt (`SHOP THE BRAND`). Dải sale đã có sẵn = promo bar đen của
bộ thiết kế gốc.

### 8.2 Đo lookfantastic (thật, tại 1440, 27/08) — lấy gì và CỐ Ý không lấy gì

| Trục | eu.lookfantastic.com | Quyết định |
|---|---|---|
| Nhịp giữa mục | **48px** (`mb-6 md:mb-12`) | **KHÔNG lấy.** Giữ 96/128px. Mật độ của họ là siêu thị mỹ phẩm; DAFC là luxury |
| Tiêu đề mục | 24/28 · **300** · HOA · serif · **canh giữa** | **KHÔNG lấy.** §1.1 không có 300; §1.5 không cấp vai hoa cho tiêu đề mục. Giữ 18/24 · 400 canh trái + kẻ mảnh + "xem tất cả" |
| Tên thẻ brand | 18/24 · **500** · HOA · ls 2px | **KHÔNG lấy.** Tên brand là họ nội dung chữ thường (§1.5 mục 6) |
| Hero | carousel **full-bleed** 1425×1069, khối chữ 442 rộng, mũi tên **44×44** hai mép, chấm **8×8** DƯỚI ảnh | **Lấy cơ chế, đổi khuôn.** Kho ảnh dự án là 1200×1484 (dọc) nên slide vẫn CHIA ĐÔI; giữ đúng 44×44 và chấm 8×8 |
| Hàng hoá | **dải trượt ngang, 5 thẻ một khung nhìn** | **Lấy.** Đây là thay đổi lớn nhất — bỏ lưới 4 cột |
| Tab lọc | trộn tab danh mục với tab bán hàng (`KOREAN BEAUTY · SALE · BESTSELLERS`) | **Lấy.** Thêm tab "Bán chạy" → mục "Đang được quan tâm" (lưới 4 cột thứ hai) **không còn cần tồn tại** |
| Thương hiệu | 2 mục liền: một brand lớn + hàng thẻ brand 300 rộng | **Lấy.** Đúng "brand block 2 khối" của brief |
| Dải USP | `callout` 49px **trên cùng trang** | Giữ dưới hero: vai "dải trên cùng" đã thuộc promo bar gốc |

### 8.3 Mục bị gỡ khỏi screen `nam` — và vì sao

| Mục cũ | Vì sao gỡ |
|---|---|
| **Tiêu điểm** (2 khối editorial) | Không có trong brief; ảnh là **đầm lụa + túi nữ** — sai giới ở đúng trang nam. Vai "câu chuyện" nay do 2 mục thương hiệu gánh |
| **Đang được quan tâm** (lưới 4 cột thứ hai) | Gộp thành **tab "Bán chạy"** ở mục 4 — cùng nội dung, ít hơn một mục cuộn, đúng lối lookfantastic |
| **Nhà mốt** (lưới tên chữ) | Nâng cấp thành **thẻ thương hiệu có ảnh** (brief: "brand list card") |
| **Dịch vụ boutique** (2 cột ảnh + 3 hàng) | Gộp vào mục 7 USP/QA — brief xếp hai thứ này thành MỘT khối |
| **Newsletter** (section riêng, nền xám) | Chuyển vào **đầu footer** (brief: "loop in footer") |

CSS của 4 khối gỡ đã **xoá theo** (`.hp-hero*` · `.hp-edit*` · `.hp-maison*` ·
`.hp-serv*` + rule khổ nhỏ của chúng), không để rule mồ côi. Công tắc *"bậc chữ
hiển thị 48/56"* ở bảng đề xuất đã trỏ lại vào `.hp-slide__h` — không thì nó
thành nút chết sau khi hero đổi khuôn.

### 8.4 Chỗ nghẽn thật: kho ảnh gần như toàn hàng NỮ

Screen `nam` trước 27/08 **không phải trang nam** — hero bán "Đầm lụa midi", nút
CTA ghi "Mua hàng nữ". Quét cả `assets/` (109 tệp) thì hàng mang được vai NAM chỉ
có **8**: `brand-hero.png` (look nam toàn thân, ảnh chiến dịch DUY NHẤT) ·
`x5.jpg` (áo phông) · `p5-*` (giày lười) · `p6-*` (giày thể thao) · `p8-*` (túi da
đeo chéo) · `p10-*` (thắt lưng) · `b3.jpg` (Dylan Blue) · `b6.jpg` (Montblanc
Explorer). Toàn bộ dữ liệu mới dựng trên đúng 8 ảnh đó.

Hệ quả còn đọng, **cần tư liệu mới chứ không sửa được bằng code**:
* `brand-hero.png` phải gánh **2 vai** (slide 1 của hero + ảnh nhà mốt trong ngày).
* Thẻ thương hiệu: chỉ Versace và Montblanc có ảnh thật. **Dolce&Gabbana ·
  Burberry · Ferragamo để ô ảnh là MẶT XÁM mang wordmark** — trạng thái chờ tư
  liệu. Cố ý không mượn ảnh sản phẩm Versace gán cho nhà mốt khác: đó là sai
  **dữ liệu**, không phải sai đẹp.
* Không có ảnh **đồng hồ** nên danh mục thứ 6 là "Quà tặng", không phải "Watches"
  như mock của khách.

### 8.5 Số đo sau khi dựng (đo `getComputedStyle` trên screen `nam`, 3 khổ)

| Trục | Trước (bản 24/08) | **Sau (27/08)** | Luật |
|---|---|---|---|
| Tổ hợp typo | 8 | **7** | — |
| Cỡ chữ | 5 | **5** (10·12·14·18·24) | §1.2 ✓ |
| Tracking | 1 | **1** (0.5px) | ✓ |
| Độ đậm | 400 + 500 | **400 + 500**, 500 chỉ ở 14 phần tử **đều HOA** | §1.1 ✓ |
| Bậc mực | 3 + đỏ + trắng | **3** (`#0a0a0a·#333·#666`) + `#d62845` + trắng | §2.1 ✓ |
| Sắc viền | 3 | **3** (`#0a0a0a·#dfdfdf·#ececec`) | §3.1 ✓ |
| Bo góc ≠ 0 | 0 vi phạm | **0 vi phạm** — chỉ ô màu (`.hp-sw__*`, ngoại lệ TRÒN đã chốt) và chấm slider 8×8 | §3.2 ✓ |
| Đổ bóng | 0 | **0** | §3.3 ✓ |
| Mặt phẳng | 2 + glass | **2** (`#fff` · `#f2f2f2`) + mặt tối ở nút/promo | §2.2 ✓ |
| Tràn ngang | không | **không** ở 375 · 1024 · 1440 | ✓ |

Số khung: hero 1425×751 (slide 710 + hàng chấm 40) · chữ slide bắt đầu ở **x=24**,
đúng lề rail · ảnh slide tràn tới mép phải · thẻ trong dải **263px** = 5 thẻ một
khung nhìn ở 1440, **228px** = 4 thẻ ở 1024, **62vw** ở 375.

### 8.6 Đã kiểm chạy được

Slider (bấm mũi tên → `translateX(-100%)`, chấm đổi, `inert` chuyển đúng slide) ·
tự chạy 6s **dừng** khi screen `nam` bị ẩn (đo: sau 7s ở screen Nữ, chấm vẫn ở 0) ·
7 tab lọc ra đúng số (Tất cả 8 · Bán chạy 5 · Quần áo 2 · Giày dép 2 · Túi xách 1 ·
Phụ kiện 1 · Nước hoa 2) · mũi tên dải trượt cuộn 80% khung nhìn và tự ẩn ở hai
đầu · accordion QA mở/đóng · form bản tin ở vị trí mới trong footer báo lỗi và báo
thành công đúng · router 3 screen còn nguyên (`#nu` bật `skin-min`, về `nam` thì gỡ).

**Hai bẫy đo của pane xem trước phiên này** (pane không composite frame):
1. `getComputedStyle` đọc **giá trị đang nội suy**, mà transition không bao giờ
   chạy → `.rv` đọc ra `opacity: 0` dù `.in` đã gắn đủ 44/44, và `transform` của
   track đọc ra ma trận đơn vị dù `style.transform` đã là `translateX(-100%)`.
   Cách phân biệt: chèn một `<style>` tắt hết transition rồi đo lại.
2. Trình duyệt chỉ bắn sự kiện `scroll` trong nhịp khung hình → hai nút của dải
   trượt đứng nguyên trạng thái cũ. **Đã vá thật**: sau khi cuộn, gọi lại
   `railSync` bằng `setTimeout(…, 450)` chứ không chỉ dựa vào sự kiện `scroll`.

**Chưa chụp được ảnh màn** — cùng lý do trên.

### 8.7 Cần bạn chốt

1. **Nhịp dọc.** Đang giữ 96/128px của trang. lookfantastic là 48px. Có kéo mật độ
   xuống 64/96 cho gần khách hơn không? (Ảnh hưởng cả 3 screen nếu đổi biến `--sec`.)
2. **Tiêu đề mục canh giữa** như lookfantastic, hay giữ canh trái + kẻ mảnh + nút
   "xem tất cả"? Canh giữa thì mất chỗ đứng của nút "xem tất cả".
3. **Hero full-bleed thật.** Muốn giống mock của khách 100% thì cần ảnh chiến dịch
   **NGANG ≥ 2400×1200**. Có thì slide đổi sang một lớp ảnh + chữ đè, bỏ chia đôi.
4. **3 thẻ thương hiệu đang là mặt xám** (Dolce&Gabbana · Burberry · Ferragamo) —
   xin tư liệu, hay đổi sang khuôn khác (ví dụ chỉ logo trên nền trắng)?
5. **Mục Tiêu điểm (editorial) có dựng lại cho nam không?** Đã gỡ vì ảnh sai giới
   và không có trong brief; nếu khách muốn giữ vai "câu chuyện" thì cần 2 ảnh nam.
6. **Screen `nu` và `beauty` chưa đụng tới.** Brief ghi "Fashion – Men / Women" —
   có áp cùng khuôn này sang screen Nữ không?

### 8.8 Lượt chốt 27/08 (chiều) — 5 câu ở mục 8.7 đã có trả lời

| # | Câu | Trả lời của user | Đã làm |
|---|---|---|---|
| 1 | Nhịp dọc | *"kéo về 64/94"* | **64 / 96 / 40** — xem ghi chú số dưới |
| 2 | Tiêu đề mục | *"giữ bên trái"* | Không đụng: giữ canh trái + kẻ mảnh + nút "xem tất cả" |
| 3 | Hero | *"để tạm ảnh đi, cần show ngang trước"* | Slide đổi sang **khổ NGANG một lớp**, chữ đè lên nửa trái |
| 4 | 3 thẻ thương hiệu mặt xám | *"thay logo vào là được"* | Cả 5 ô thành **logo trên nền trắng + kẻ V3** |
| 5 | Có áp sang screen Nữ không | *"tạm thời chỉ cần screen Nam"* | `nu` · `beauty` **không đụng một dòng nào** |

**Ghi chú về "64/94".** Thang nhịp của trang đi bước 8px (40 · 56 · 64 · 96 · 128);
94 không nằm trên thang nào và lệch 96 đúng 2px — dưới ngưỡng đọc ra được. Tôi
lấy **96**, tức đúng cặp `64/96` tôi đề xuất ở 8.7 mục 1. Muốn 94 thật thì sửa
một dòng biến.

**Nhịp mới KHOÁ TRONG screen `nam`, không đặt ở `:root`.** `--sec*` vốn khai ở
`:root` nên đổi thẳng là đổi cả 3 screen, mà user chỉ chốt cho Nam (câu 5). Nay
khai đè ngay trong khối biến của screen — `.screen[data-screen="nam"]` có độ đặc
hiệu (0,2,0) nên thắng `:root` (0,1,0) ở **mọi** khổ, kể cả bên trong media
query, không phụ thuộc thứ tự viết. Bảng đối chiếu:

| | trước | **sau (chỉ screen `nam`)** | `nu` · `beauty` |
|---|---|---|---|
| `--sec` | 96 | **64** | 96 (không đổi) |
| `--sec-lg` | 128 | **96** | 128 (không đổi) |
| `--sec-sm` | 56 | **40** | 56 (không đổi) |
| khổ < 768 | 56 · 72 · 40 | **40 · 56 · 32** | 56 · 72 · 40 (không đổi) |

Đo lại trên trang: 7 mục ra `pad-top` 0 · 0 · **64** · **64** · **96** · **40** ·
**96**; chiều cao trang 1440 rút từ **5363 → 5028** (−335px, −6%).

**Hero khổ ngang — 4 điều phải nhớ khi thay ảnh thật.**
`.hp-slide` nay là **một lớp ảnh** cao `clamp(420px, 46vw, 660px)` (1440 → 660,
tỉ lệ 2,16:1) với lớp chữ `position:absolute` đè lên. Đo được: chữ bắt đầu ở
**x=24**, đúng lề rail; khối chữ rộng **420px = 29%** bề rộng ảnh ở 1440 và
**48%** ở 900.
1. **Không có lớp phủ tối** — §2.2 không có mặt phủ nào. Chữ đọc được là nhờ ảnh
   dự án đều nền xám sáng `#f1f1f1`. **Luật cho ảnh hero về sau: phần ba bên
   trái phải trống và sáng**, kẻo mực `#0a0a0a` chìm.
2. **Ảnh vẫn là 1200×1484 dọc** nên đang bị kéo lên 1425 rộng và cắt còn ~37%
   chiều cao. Đây là ảnh **tạm** đúng như user nói. Ảnh thật nên ≥ 2400×1200.
3. `object-position` chỉnh theo trục **Y**, trục X vô tác dụng: `cover` co ảnh
   theo BỀ RỘNG nên chỉ chiều dọc bị cắt. Đã chỉnh: look nam `center 20%` (giữ
   đầu + thân trên) · giày `center 56%` · nước hoa `center 58%`.
4. Lớp chữ đặt `pointer-events: none`, chỉ khối chữ thật nhận lại — nếu không,
   tấm trong suốt phủ kín ảnh sẽ nuốt cả cú vuốt ngang lẫn hover của 2 mũi tên.

Khổ < 768: lớp chữ **thôi tuyệt đối** (`position: static`) và rơi xuống dưới ảnh
theo đúng thứ tự nguồn — ảnh nay đứng TRƯỚC chữ trong DOM nên không phải mượn
`order`. Ảnh về tỉ lệ 4:5 (dáng thật của kho ảnh). Đo ở 375: ảnh 469 cao ở y=80,
chữ bắt đầu y=549 — không đè. Khổ 768–1023 vẫn đè nhưng khối chữ hẹp lại còn 52%.

**Thẻ thương hiệu = logo trên nền trắng.** Ô đổi từ mặt xám sang **nền trắng +
kẻ V3**, hover mới đổi sang mặt xám — mặt xám đọc ra là "ô ảnh đang chờ", ô
trắng có kẻ đọc ra là một **thẻ logo**. Kho chỉ có **một** tệp logo thật:
`assets/brand-logo.png` (wordmark Versace, 159×27). Bốn nhà mốt còn lại đặt tên
bằng **chữ**, viết đúng cách hãng viết. Logo cao **tối đa 22px** — không phải %
của ô — để cả hàng đứng chung một trục quang học dù ô là ảnh hay là chữ (22px ≈
chiều cao chữ hoa của `.t-title` 24px cộng chút bù cho ký tự thò xuống). Có tệp
logo thật thì thả vào trường `logo` của `BRAND_CARDS`, **không phải sửa khuôn**;
chỉnh quang học từng logo là một lượt riêng.

**Đo lại sau lượt này — vẫn 0 vi phạm:** 7 tổ hợp typo · 5 cỡ (10·12·14·18·24) ·
1 tracking · 3 bậc mực + `#d62845` + trắng · 3 sắc viền · **0 bóng** · bo góc sai
**0** (chỉ `.hp-sw__*` — ngoại lệ TRÒN đã chốt) · không tràn ngang ở 375 · 900 ·
1440. `.rv` hiện đủ (0/44 còn ẩn).

**Một bẫy nữa của pane không composite:** `loading="lazy"` chạy bằng
IntersectionObserver nên **ảnh lazy không bao giờ nạp** trong pane này — đo ra
`naturalWidth = 0`, và với `width/height: auto` thì logo hiện 0×0, rất giống lỗi
ảnh hỏng. Cách phân biệt: `new Image()` nạp thẳng tệp đó (ra 159×27 = tệp lành),
hoặc ép `img.loading = 'eager'` rồi đo lại.

### 8.9 Gỡ nút CTA khỏi hero (lệnh user 27/08: *"ở hero banner sẽ không để CTA gì trên đó nhé"*)

Đây là **lần thứ hai** luật banner được siết, cùng một hướng:

| Ngày | Lệnh | Gỡ khỏi hero |
|---|---|---|
| 24/08 | *"hình ảnh banner không cần đính kèm tên và giá sản phẩm"* | thẻ hàng `.hp-shoptag` (brand + tên SP + giá) |
| **27/08** | *"ở hero banner sẽ không để CTA gì trên đó"* | **2 nút** "Mua hàng nam" + "Xem cả bộ sưu tập" |

Gộp lại thành một luật: **hero là mặt CHIẾN DỊCH — không mang tên SP, không mang
giá, không mang nút.** Nó nói CHUYỆN; chỗ bấm để mua là card sản phẩm và các mục
bên dưới.

Khối chữ trên slide nay còn **4 dòng**: nhãn chiến dịch (`.t-label`) → tiêu đề
(`.t-title`) → đoạn dẫn (`.t-copy`) → hàng meta (`.t-micro`, ngăn bằng chấm).
Đo lại ở 1440: khối chữ rút **420×344 → 334×216**, tức từ 29% xuống **23%** bề
rộng ảnh — banner thở ra đúng phần đó. Ở 375 khối chữ rút 400 → **274** cao.

**Gỡ sạch theo, không để mồ côi:** trường `cta` / `cta2` trong `HERO_SLIDES` (3
slide) · hằng `ARROW_NE` (chỉ 2 nút đó dùng) · rule `.hp-slide__cta` và rule khổ
nhỏ của nó. Grep còn **0** chỗ nhắc tới cả ba.

**Không đụng nút của mục khác:** "Xem thương hiệu" ở mục Thương hiệu trong ngày
và nút "Đăng ký" ở dải bản tin vẫn còn — lệnh chỉ nói về hero banner.

**Chỗ bấm của banner.** Sau khi gỡ nút, slide không còn phần tử bấm được nào.
Khi nối route thật thì **cả tấm banner là một đường dẫn** (đúng cách
lookfantastic làm: `<a>` bọc trọn `carousel-item`, nút `SHOP NOW` bên trong chỉ
là phần nhìn thấy được của cùng đường dẫn đó). Ở bản dựng thiết kế này chưa có
đích để trỏ nên chưa bọc — cần thì nói, một dòng là xong.

Hàng meta nay là dòng cuối khối chữ nên nới `padding-top` 4 → **8px** để nó tách
khỏi đoạn dẫn. Mũi tên và hàng chấm của slider **không nằm trong** `.hp-slide`
nên không bị ảnh hưởng: vẫn 2 mũi tên + 3 chấm.

**Đo lại — vẫn 0 vi phạm** ở 375 và 1440: 7 tổ hợp typo · 5 cỡ · 1 tracking ·
5 bậc mực (3 + đỏ + trắng) · 0 bo góc sai · 0 bóng · không tràn ngang.

### 8.10 Hero về BANNER THUẦN ẢNH (lệnh user 28/08: *"banner sẽ thuần image thôi"*)

Khách gửi **tấm banner ngang thật đầu tiên** (Holiday Exclusive — nhân đôi điểm
thưởng, voucher 1.200.000 ₫, 26.08 – 04.09). Tấm này đã mang sẵn **tiêu đề, dòng
dẫn tiếng Việt, nút SHOP NOW và mốc thời gian** ngay trong tranh. Nên hero bỏ hẳn
lớp chữ của code: chồng thêm chữ lên là hai giọng nói cùng lúc.

**Đường đi của hero, ghi đủ để không ai lật lại:**

| Ngày | Khuôn | Vì sao đổi |
|---|---|---|
| 24/08 | chia đôi editorial (ảnh phải, chữ trái) | kho ảnh toàn ảnh DỌC 1200×1484 |
| 27/08 | khổ ngang, chữ đè nửa trái | user: *"để tạm ảnh đi, cần show ngang trước"* |
| 27/08 | bỏ 2 nút CTA | user: *"hero banner không để CTA gì"* |
| **28/08** | **thuần ảnh, 0 chữ của code** | có tranh thật, tranh tự mang thông điệp |

**Ba thứ tự rụng theo, đều là đơn giản hoá:** hết cần `pointer-events:none` để lớp
chữ khỏi nuốt cú vuốt · hết cần luật *"phần ba bên trái của ảnh phải trống và
sáng"* (luật đó sinh ra vì §2.2 không có mặt phủ để đỡ chữ — nay không có chữ) ·
hết cần tính lề trái theo rail. **Cả tấm là MỘT đường dẫn** — đúng chỗ bấm mà lượt
gỡ CTA đã bỏ chrome nút đi.

Công tắc *"bậc chữ hero 48/56"* ở bảng đề xuất cũng **gỡ luôn** (cả rule lẫn hàng
trong bảng): nó là đề xuất sửa §1.2 dựng ngày 24/08, chỉ có nghĩa khi hero CÓ tiêu
đề để phóng to. Không để nút chết. Đề xuất còn lại (nhãn eyebrow) vẫn nguyên.

**Tỉ lệ khai một chỗ** — `--hero-ratio` trên `.hp-hero2`, để mọi slide cùng khổ;
slider mà mỗi slide một chiều cao thì lúc trượt trang nhảy lên nhảy xuống.
Desktop **8/3** (1440 → **534**), khổ nhỏ **4/3** (375 → **281**) vì banner 8/3 ở
màn 375 chỉ cao 140px, chữ trong tranh không đọc nổi. *Số 8/3 đang là ƯỚC theo ảnh
khách gửi — đo lại tệp thật rồi chỉnh.* Và cắt bản ngang cho mobile chỉ là **tạm**:
đúng bài là khách gửi **bản dọc riêng** cho mobile.

**`alt` nay gánh việc thật.** Chữ nằm trong pixel chứ không trong DOM, nên `alt`
phải mô tả đủ nội dung chữ in trong tranh — đó là lúc duy nhất người dùng trình
đọc màn hình nghe được thông điệp chiến dịch.

### Lưới an toàn: tấm nào thiếu tệp thì RỚT khỏi slider

Hero thuần ảnh nên một tệp thiếu là một **ô trống chiếm nguyên khổ banner** — tệ
hơn hẳn việc bớt một slide. Mà tranh chiến dịch thì khách gửi từng đợt, thiếu tấm
là chuyện sẽ còn lặp. Nên: nghe sự kiện `error` ở tầng track **với capture** (sự
kiện `error` của `<img>` KHÔNG nổi bọt), rớt tấm hỏng khỏi danh sách rồi dựng lại;
hết sạch tấm thì ẩn luôn cả mục hero. Còn 1 tấm thì tự ẩn mũi tên + hàng chấm.

**Đo được ngay lúc này:** khai 3 slide, tệp `assets/hero-holiday.jpg` **chưa có**
→ slider chạy **2 slide**, không hở lỗ nào. Lưu tệp vào là nó tự vào, không phải
sửa code.

**Hai slide đang chạy là TẠM** — ảnh sản phẩm DỌC bị cắt thành dải ngang, không
phải tranh chiến dịch. Có banner thật thì **xoá 2 dòng đó** trong `HERO_SLIDES`
(đã đánh dấu `tam: true`), đừng sửa.

Kiểm chạy: hero `1425×534` ở 1440 và `375×281` ở 375 · `innerText` của hero
**rỗng** (đúng: 0 chữ của code) · mỗi slide là một `<a>` · bấm mũi tên → track về
`translateX(-100%)`, chấm và `inert` đi theo · mũi tên ẩn ở khổ nhỏ · không tràn
ngang · bảng đề xuất còn đúng 1 công tắc.

### 8.11 Còn mở

* **Ảnh hero ngang thật** (≥ 2400×1200, chừa trống phần ba trái) — đang dùng ảnh
  dọc cắt tạm theo đúng lệnh "để tạm ảnh đi".
* **Logo 4 nhà mốt** (Montblanc · Dolce&Gabbana · Burberry · Ferragamo) — đang là
  chữ.
* **Ảnh hàng nam** — vẫn 8 SKU trên 8 ảnh (mục 8.4), `brand-hero.png` gánh 2 vai.
* **Screen `nu` · `beauty`** — user chốt tạm thời chưa áp khuôn này sang.
