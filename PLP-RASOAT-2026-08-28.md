# Rà soát edge case PLP — 28/08/2026

> Lệnh user: *"trang product listing đã chốt ~90% — kiểm tra các edge case và các case khác
> của PLP đã đồng bộ layout / hiển thị có logic chưa, rà soát và bổ sung chỉnh sửa."*

Cách làm: audit code 5 file (6 mũi song song: trạng thái PLP · card · panel lọc · i18n ·
đồng bộ fork · layout desktop, tổng 74 finding thô) + **đo trên trang chạy** `http://localhost:8123/`
ở 375 và 1440 để xác nhận từng lỗi trước khi sửa. Sau sửa đã đo lại toàn bộ + `node --check`
sạch mọi khối script.

**Phạm vi sửa: cả 5 file** — `index.html` · `desktop.html` sửa tay từng chỗ; 3 bản thử skin
(`desktop-neutral` · `desktop-editorial` · `desktop-atelier`) port cùng bộ sửa + trả nốt
việc còn mở #2 của PLP-FEEDBACK-2026-08-27.md (badge "Đặt trước" trước tên).

---

## 1 · Lỗi NẶNG tìm thấy và đã sửa

### 1.1 Bấm "Xem thêm" gọi lại `wire(root)` → gắn CHỒNG listener toàn màn ⚠ nặng nhất đợt này

Handler `#showMore` kết thúc bằng `wire(root)` — hàm wire toàn màn. Đo được trên trang chạy:

| Sau N lần bấm Xem thêm | Hành vi đo được (trước khi sửa) |
|---|---|
| 1 | bình thường (+4 thẻ) |
| 2 | **+8 thẻ** thay vì 4 (listener nhân đôi) · **menu Sắp xếp không mở được nữa** (toggle chạy 3 lần/click, mở xong tự đóng) |
| n | thẻ nhân theo cấp số, mọi click trên card chạy n lần |

**Sửa (cả 5 file):** thay `wire(root)` bằng `wireProductCards(grid)` + `localizeNew(grid)`
(chỉ wire phần vừa thêm); `wireProductCards` thêm cờ `data-wired` để idempotent — gọi trên
lưới đang sống không gắn trùng thẻ cũ. Đo lại: 16 → 20 → 24 đúng nhịp, sort menu vẫn mở.

### 1.2 Desktop: swatch trên card **chết hẳn** sau khi lọc/sắp, và vốn không đổi ảnh

Khối wire swatch nằm trong `wire()` (chạy 1 lần lúc render màn) trong khi lưới được dựng lại
bằng `renderPlpGrid` (áp bộ lọc, đổi sắp xếp) chỉ gọi `wireProductCards` — card mới mất sạch
handler chọn màu. Đo: áp lọc xong bấm swatch → không nhúc nhích. Ngoài ra swatch desktop vốn
**chỉ dời viền chọn**: không ghim màu vào `data-color`, không đổi ảnh, và quick-add dialog luôn
mở màu đầu (hàm `openQA(idx, ci)` nhận tham số màu nhưng không ai truyền).

**Sửa (desktop.html):** dọn khối swatch vào `wireProductCards`, port đủ hành vi bản mobile
(ghim `data-color`, đổi ảnh theo `PRODUCT_GALLERY`, SP chưa có bộ ảnh thì giữ ảnh), truyền
`el.dataset.color` vào `__openQuickAdd`. Đo lại: chọn swatch Rosa → quick-add mở đúng "Rosa";
swatch sống cả sau khi lọc.

### 1.3 Đảo tab đơn vị giày (IT/EU · US · UK) làm rơi tick ĐÃ ÁP

`shoeUnitInner()` render chip mới không đồng bộ lại từ `plpFilters` → tick đã áp "trông như
mất", và lượt Áp dụng kế (đọc DOM) **âm thầm xoá nhãn khỏi bộ lọc**. Sửa (index + desktop):
sau khi render lại `#shoeUnitWrap`, chip nào nằm trong `plpFilters` được thắp lại; tick CHƯA
áp của đơn vị cũ vẫn reset như chủ ý cũ. Đo: tick 39 → áp → đảo US → về IT/EU → tick còn.

### 1.4 "Khoảng giá" tràn ngang (lỗi (c) đã ghi trong FIGMA-FILTER.md — còn nguyên)

2 ô nhập không có `w-full`/`min-w-0` → flex giữ bề rộng nội tại ~178px/ô, ở sheet 375 ô "Đến"
**thò 22px khỏi mép phải** (đo: right 397 / viewport 375). Sửa (cả 5 file): `w-full min-w-0`
vào input + `min-w-0` label + `shrink-0` gạch giữa; index đồng bộ luôn token với desktop
(`bg-input`, gạch `bg-border` thay hex `#e0e0e0`). Đo lại: 155px/ô, mép phải 359 < 375.

---

## 2 · Lỗi i18n (EN mode) — đã sửa cả loạt

| # | Lỗi | Sửa |
|---|---|---|
| 1 | **"Show more" hardcode EN** ở index (2 template + reset trong handler) — trang tiếng Việt hiện nút tiếng Anh (lỗi (a) đã ghi, desktop từng sửa mà index sót) | về `Xem thêm` + `localizeNew(sm)` như desktop |
| 2 | **5 nhãn menu Sắp xếp không có khoá** — EN mode menu đứng nguyên tiếng Việt | thêm 5 khoá (`Most relevant` · `Newest` · `Best sellers` · `Price: Low/High…`) |
| 3 | **"Đang tải"** (nhãn lúc đổ skeleton) không khoá + không localize | khoá `Loading` + `localizeNew` ngay khi set spinner |
| 4 | **Thẻ append sau Xem thêm không được dịch** — badge "Đặt trước" kẹt tiếng Việt ở EN | `localizeNew(grid)` sau append |
| 5 | **brandToggle** gán động `Thu gọn/Xem thêm` không localize — EN bấm 1 lần là quay về tiếng Việt | `localizeNew(bToggle)` sau mỗi lần gán |
| 6 | **3 toast bộ lọc** (`Áp dụng N bộ lọc` · `Đã bỏ hết bộ lọc` · `Đã đặt lại bộ lọc`) thiếu khoá — `toast()` có sẵn máy dịch `tr()`, chỉ thiếu từ điển | 2 khoá + 1 luật regex `Applied $1 filters` |
| 7 | **'Trending item' hardcode EN** làm tiêu đề khối trending (VI mode hiện tiếng Anh) | nguồn về `Sản phẩm thịnh hành`, khoá `Trending items` |
| 8 | **Khoá `'Khác'` khai TRÙNG 2 lần** trong I18N (`Other` bị bản `Others` khai sau đè mất) | xoá bản trùng, ghi chú tại chỗ |
| 9 | **aria-label "Thêm nhanh vào giỏ"** không khoá (screen reader EN đọc tiếng Việt) | khoá `Quick add to bag` (applyLang vốn dịch aria-label) |
| 10 | **3 dòng promo bar + đoạn giới thiệu Versace** trên PLP brand không có khoá | thêm 4 khoá nguyên câu (EN tự dịch, cần khách duyệt lại câu chữ marketing) |

Đã đo vòng VI→EN→VI trên trang chạy: sort menu, Loading, badge thẻ append, brandToggle, count —
đều ra đúng cả 2 chiều.

## 3 · Hiển thị phi logic ở trạng thái biên — đã sửa

### 3.1 Bộ lọc ra 0 kết quả: nút "Xem thêm" + thanh tiến độ vẫn trơ dưới khối rỗng

Empty state ("Không có sản phẩm nào khớp bộ lọc" + nút Xóa tất cả) đã đúng, nhưng vì nút
Xem thêm và `#plpProgress` nằm **ngoài** `#plpGrid` nên chúng đứng nguyên: desktop hiện cả dòng
*"Bạn đã xem 0 trong 152 sản phẩm"* + thanh 0% + nút Xem thêm chết (bấm nháy 4 skeleton 900ms
rồi thôi). Sửa (cả 5 file): 0 kết quả → ẩn cả cụm nút + thanh tiến độ (toggle ở cả template
lẫn `renderPlpGrid` + guard đầu handler); xoá lọc là hiện lại.

### 3.2 Desktop: hai con số "tổng" chọi nhau khi đang lọc

Heading đếm số ĐÃ LỌC ("6 sản phẩm") còn progress luôn chia cho catalog giả lập
`PLP_TOTAL = 152` ("Bạn đã xem 6 **trong 152**"). Sửa: mẫu số theo trạng thái —
**không lọc giữ 152** (minh hoạ catalog lớn, đúng chủ ý demo đã ghi trong README),
**đang lọc = số kết quả khớp**; tử số kẹp `Math.min` (Xem thêm append thẻ trùng nên chuỗi chữ
từng có thể vượt 152). Đo: không lọc "16 trong 152" · lọc Đen "6 trong 6".

### 3.3 Ô tìm thương hiệu × cơ chế ẩn-vì-0-kết-quả (`.f-gone`) — 2 cơ chế ẩn giẫm nhau

Tick Đen (23/24 brand bị `.f-gone`) rồi gõ "bur": hàng Burberry khớp query nên bị **đếm là
"còn hàng"** → danh sách trống trơn mà dòng *"Không tìm thấy thương hiệu"* im lặng. Sửa
(cả 5 file): chỉ đếm hàng thực sự nhìn thấy (`!hidden && !f-gone`); `pruneEmptyFacets` xong
bắn lại event input khi ô đang có chữ (2 lối ra đều sync). Đo: kịch bản trên nay hiện đúng dòng rỗng.

### 3.4 "Đặt lại" không dọn ô tìm thương hiệu

Reset xong panel vẫn bị lọc bởi query cũ (kèm dòng rỗng nếu query vô nghĩa). Sửa (cả 5 file):
reset xoá value + bắn input. Đo: query sạch, 24 hàng trở lại, dòng rỗng ẩn.

### 3.5 Thẻ append sau "Xem thêm" mất nhãn chiến dịch

SP#4 xuất hiện lần 2 (bản append) không còn pill `New Season · La Vacanza` — cùng một SP hai
kiểu thẻ trên một lưới. Sửa (cả 5 file): append dùng **cùng options** với `renderPlpGrid`
(badge + pillBadges). Đo: 2 bản thẻ SP#4 giống nhau.

### 3.6 "Chỉ hàng có sẵn" là facet trang trí → nay lọc thật

`matchProducts` không đọc nhãn này (tick không đổi gì) — lệch mandate "bộ lọc lọc thật" từ
12/08. Demo có hàng pre-order (= chưa có sẵn) nên facet này có việc thật: tick vào loại SP mang
`p.preorder`. Đo: Áp dụng (15), lưới 15 thẻ, 0 badge "Đặt trước".

### 3.7 Giá + ký hiệu ₫ có thể rớt dòng (lỗi (b) đã ghi — còn nguyên cơ chế)

Chuỗi giá dùng space thường trước ₫, phần tử giá không nowrap → hàng hẹp là ₫ xuống dòng riêng
(tái hiện rõ ở hàng giỏ có chip -%). Sửa: `whitespace-nowrap` cho 2 dòng giá của productCard
(cả 5 file) + 2 dòng giá hàng giỏ (index). Không đổi data sang NBSP để khỏi đụng `vndNum` và
luật regex.

### 3.8 Mobile quên lựa chọn lưới 1/2 cột khi điều hướng

Desktop nhớ `plpCols`, mobile hardcode `grid-cols-2` trong template → đổi PLP là lựa chọn 1 cột
bay mất. Sửa (index): thêm `plpGridCols` sống như `plpSort`; template + trạng thái nút đọc theo.
Đo: chuyển 1 cột → sang PLP nam → vẫn 1 cột, nút đúng trạng thái.

### 3.9 Breadcrumb index chỉ còn "Trang chủ" đứng một mình

PLP vào từ thẻ danh mục (crumbs rỗng) và PLP search không có fallback như desktop. Sửa: port
nguyên khối fallback (`Trang chủ · <tiêu đề>` / `Trang chủ · Kết quả tìm kiếm`). Đo: đúng cả 2 lối.

### 3.10 Lưới size ít ô trên hover desktop căn TRÁI — tàn dư của title đã gỡ

`justify-content: start` được chọn 26/08 để ăn mốc với TITLE đầu tấm; 27/08 user đảo chốt gỡ
title nhưng `start` sót lại → cụm 1–3 ô lệch hẳn trái trong tấm không còn gì để so mốc (PLP-FEEDBACK
ghi "3 ô xếp một hàng căn giữa" mà computed lại là start). Trả về `center` (đúng bản 19/08). 

### 3.11 Menu Sắp xếp không có hover/focus state

`.sort-opt` trần trụi — rê chuột không phản hồi gì, lạc lõng ở desktop nơi hover là ngôn ngữ
chính. Thêm rule dùng đúng nền `--unofficial-ghost-hover` sẵn có (không mở mặt mới), cả 2 file.

### 3.12 Comment mồ côi sau đợt 27/08 (desktop + index)

3 cụm comment tả thứ không còn: TITLE tấm hover (đã gỡ), badge "Pre-order là wordmark phải skip"
(đã thành chuỗi dịch được), nền badge `#f2f2f2` (đã lên `#dfdfdf` theo chốt 5.1). Đã sửa lời cho
khớp code, tránh người sau "khôi phục giúp".

## 4 · Port sang 3 bản thử skin — XONG, kể cả việc còn mở #2

**Trả nốt "Còn mở #2" của PLP-FEEDBACK-2026-08-27.md**: badge "Đặt trước" đứng trước tên nay có
ở CẢ 3 fork. Không bê `.badge-inline` xám của bản chuẩn sang — badge dùng **mặt pre-order sẵn có
của từng skin** (đúng luật "tái tạo bằng token skin đích"): neutral + editorial = `tag-note`
(amber `#fbf3db`, ~5:1), atelier = `bg-secondary` (mặt badge vốn có của fork đó).

Kèm theo, 2 lệch fork **chưa từng ghi nhận** cũng được trả về chuẩn:

1. **Neutral + Editorial còn ở nền TRƯỚC 17/08**: cả 6 call site truyền `badge: i === 0 ? 'New' : ''`
   (thẻ số 0 thì "New" — quy ước đã bị bác 17/08) → thẻ PLP mất hẳn chỉ báo pre-order. Nay cả 3
   fork đều `badge: p.preorder ? 'Pre-order' : ''` như bản chuẩn.
2. **Cả 3 fork còn `data-i18n-skip` + chữ EN "Pre-order"** ở 3 chỗ badge PDP / giỏ / checkout —
   VI mode hiện tiếng Anh. Nay là "Đặt trước" dịch được 2 chiều (khoá có sẵn), comment wordmark
   cũ đã viết lại.

Toàn bộ mục 1–3 của báo cáo này cũng áp cho 3 fork (show-more không còn wire chồng; ẩn nút +
progress khi 0 kết quả; progress theo trạng thái lọc; ô tìm thương hiệu × f-gone; Đặt lại dọn ô
tìm; Khoảng giá hết tràn; nowrap giá; "Chỉ hàng có sẵn" lọc thật; hover menu Sắp xếp; bộ khoá
I18N mới; 'Trending item' → 'Sản phẩm thịnh hành'). Riêng các thứ fork KHÔNG có thì không bịa
thêm: swatch fork giữ hành vi dời-viền (không port đổi ảnh), không đụng 3 lệch bộ lọc CÓ CHỦ Ý
(cây danh mục cũ · nhóm size phẳng · mục mở sẵn — vẫn chờ gật mục 9 FILTER-FEEDBACK).

Đã kiểm chạy cả 3 fork @1440: badge inline đúng skin từng bản, overlay Pre-order = 0, Xem thêm
16→24 đúng nhịp 2 lượt, menu Sắp xếp sống, EN mode ra "Pre-order"/"Most relevant", console sạch;
`node --check` sạch cả 3.

## 5 · Những thứ đã kiểm và XÁC NHẬN ĐÚNG (không sửa)

- Empty state bộ lọc (khối "Không có sản phẩm nào khớp bộ lọc" + nút Xóa tất cả) hoạt động ở cả
  2 đường vẽ lưới, cả 2 bản; số trên nút "Áp dụng (N)" dùng cùng `matchProducts` với lưới, cập
  nhật async đúng.
- Cơ chế ẩn thuộc-tính-0-kết-quả: đếm bỏ-qua-nhóm-mình, ô đang tick không ẩn, chưa tick bày đủ,
  bỏ tick trả lại đủ — đo khớp bảng trong PLP-FEEDBACK; `.f-gone` **đã có ở cả 3 fork** (doc chưa
  ghi phạm vi — nay xác nhận).
- Heel: chỉ ngữ cảnh Nữ (kể cả Trang chủ nữ), nam/beauty/brand không dựng; nhãn heel được prune
  khi điều hướng sang ngành khác. Filter promo hợp lệ mọi ngành nên **giữ qua điều hướng** — hành
  vi nhất quán, có đường thoát.
- Sort giữ qua điều hướng (như desktop), menu đánh dấu đúng; badge "Đặt trước" nền `#dfdfdf`
  12/16, đứng trước tên cùng hàng ở cả 2 khổ; khăn lụa S·M·L cả 2 nguồn, cả 5 file; quick-add
  hover desktop chỉ còn lưới size; PLP Làm đẹp 8/8 SP, panel beauty đúng bộ mục (Dung tích, không
  Màu sắc/heel).
- Giá + chip -% trên card **không** rớt dòng ở dữ liệu hiện tại (đo 16 thẻ @375) — nowrap thêm
  vào là chốt chặn cho data sau này.
- 2 định dạng tiền (`45.066.000 ₫` vs `50,000,000đ`) là quy ước CÓ CHỦ Ý của dự án (comment tại
  chỗ) — không phải lỗi.

## 6 · Việc CHỜ CHỐT — không tự quyết (đề xuất kèm)

| # | Việc | Đề xuất |
|---|---|---|
| 1 | **Khối cam kết (camKetSection)**: PLP category mobile có, PLP desktop không (mọi chế độ) | 2 bản khách nhận link nên thống nhất; nghiêng về **thêm vào desktop** trước footer như mobile — nhưng cần soi lại Figma PLP-Desktop trước |
| 2 | **Nút "Đặt lại" chỉ hiện khi bộ lọc ĐÃ áp** — tick 5 ô chưa bấm Áp dụng thì không có đường xoá nhanh | phương án A (khuyên): hiện khi `plpFilters.length \|\| pickedLabels().length`; phương án B: giữ nguyên, coi Đặt lại là "xoá bộ lọc đã áp" |
| 3 | **Mobile thiếu chỉ báo bộ lọc đang áp**: desktop có "Bộ lọc (N)" + hàng chip gỡ từng nhãn, mobile không có gì ngoài tick trong sheet | tối thiểu thêm "(N)" vào nút Bộ lọc mobile; hàng chip là quyết định layout, chờ chốt |
| 4 | **PLP theo danh mục không lọc theo danh mục** (bấm thẻ "Túi xách" ra đủ 16 SP mọi loại) + cây danh mục/size thời trang không co theo lựa chọn | đã ghi từ trước: PRODUCTS thiếu trường phân loại — việc DATA, cần bảng phân loại 24 SP từ khách |
| 5 | **Khoảng giá vẫn là khối tĩnh** (slider không kéo được, ô nhập không lọc) | chờ khách chốt sheet Price 4 mức (việc mở #10 FILTER-FEEDBACK) — làm slider thật xong lại đập đi thì phí |
| 6 | Sort **"Mới nhất" = đảo mảng**, "Bán chạy" = tag Best seller | data chưa có ngày/số bán — muốn thật thì thêm trường DATA |
| 7 | `.btn-o:active` viền 2px theo hợp đồng nút Figma vs §3.1 "không bao bằng 2px" | hoặc bỏ 2px (đổi màu viền là đủ) hoặc ghi danh ngoại lệ vào §3.1 — 1 dòng |
| 8 | Nút "Xem thêm" index (`14px semibold border-primary`) lệch khuôn desktop (`16px 400 border-border btn-o`) | khác khổ có thể là chủ ý Figma mobile; nếu không, hạ semibold→medium/400 theo bậc nút 13.13 |
| 9 | Bản dịch EN mới thêm (promo bar, đoạn Versace, sort labels…) do mình tự dịch | khách/copywriter duyệt câu chữ |

## 7 · Đồng bộ quick add PLP mobile về MỘT khuôn (lệnh user, 28/08 chiều)

> *"Ở PLP bản mobile, vì không dùng dạng dropdown ở PDP nữa nên sẽ thống nhất theo layout quick add
> của SP số 1 … bổ sung thêm background 80% opacity cho icon close."*

**Chỉ sửa `index.html`** (lệnh nói rõ bản mobile; desktop có khuôn quick add riêng 2 cột + dải hover).

### 7.1 Trước / sau

PLP mobile đang rẽ **hai đường** khi bấm nút `+` trên thẻ:

| | Trước | Sau |
|---|---|---|
| SP#1 · SP#4 · hàng làm đẹp | quick add đủ: dải ảnh + màu + **chip size** + CTA | *(giữ nguyên — đây là khuôn chuẩn)* |
| Khăn lụa · Túi · 2 đôi giày (có bảng size riêng) | `#sizeSheet` — **danh sách dòng**, họ hàng của dropdown vừa bị bỏ khỏi mọi PDP | **cùng quick add như SP#1** |

Việc gỡ nhánh rẽ là 1 chỗ trong `wireProductCards`. Nhưng dồn khuôn xong thì **bộ size phải đúng
của từng SP** — `quickAddBody` trước đây in cứng `p.sizes || SIZES`, tức mọi hàng thời trang đều ra
39–44: đúng với SP#1/SP#4, **sai** với khăn lụa (S/M/L) và túi (Onesize) — hai SP trước đây đi
đường sheet nên chưa lộ. Thêm `qaSizesOf(p, idx)` đọc cùng nguồn với PDP:

| Sản phẩm | Bộ size trong quick add (đo trên trang chạy) |
|---|---|
| SP#1 Đầm lụa (pre-order) | IT 39 → IT 44 · 43 hết hàng · 44 mời nhận thông báo · chọn sẵn IT 39 · CTA **Đặt trước** |
| SP#2 Khăn lụa | **S · M · L** |
| SP#3 Túi Lou mini | **Onesize** |
| SP#4 · SP#5 · SP#6 | IT 39 → IT 44 (43/44 hết hàng) |
| Hàng làm đẹp | tiêu đề **Dung tích**, chip `90 ml`, không món nào hết hàng |

### 7.2 Nút ✕ nay mới THẬT SỰ có nền

Nút đóng đang mang class Tailwind `bg-background/90`, mà `tailwind.css` của dự án là **bản build
sẵn không có utility opacity-slash** → đo computed ra `rgba(0,0,0,0)`: **nút hoàn toàn trong suốt**,
icon đen nằm trơ trên ảnh. Nay thêm `.glass-80` vào **họ `glass-*` sẵn có** (`glass-95`/`glass-85`,
cùng cách khai `color-mix` + nền đặc dự phòng) chứ không khai nền riêng cho một nút. Đo lại:
`color(srgb 1 1 1 / 0.8)` — trắng 80%, ô 32×32, cách mép trên/phải 8px, nằm đúng trên dải ảnh.

### 7.3 Hai thứ giữ lại để dồn khuôn không làm rơi tính năng

1. **Nhánh "Nhận thông báo khi có hàng"**: `#sizeSheet` vốn cho chọn size hết hàng rồi đổi nhãn nút.
   Quick add thì khoá cứng ô đó bằng `disabled` — bày một ô bấm không được, và nếu cứ thế dồn khuôn
   thì 2 đôi giày mất luôn nhánh đăng ký nhận hàng. Nay quick add theo đúng **hợp đồng của PDP**:
   ô hết hàng vẫn bấm được, CTA đổi theo — `oos` → *"Tạm hết hàng"* (khoá nút, mờ 40%),
   `notify` → *"Nhận thông báo khi có hàng"* (bấm là mở khung đăng ký). Dòng **ngày dự kiến giao ẩn**
   khi đang chọn size hết hàng (hứa ngày giao cho size không bán là tự chọi nhau — PDP cũng ẩn trả
   góp ở trạng thái này). Đo cả VI và EN: `Đặt trước → Tạm hết hàng → Nhận thông báo khi có hàng`
   và `Pre-order → Out of stock → Notify me when available`, chọn lại size còn hàng thì mọi thứ trở lại.
2. **Ảnh theo màu đang chọn cho sheet xác nhận**: đường sheet cũ lấy ảnh từ thẻ (`ctx.img`), quick add
   thì lấy ảnh mặc định của SP → chọn màu Bianco mà xác nhận lại ra ảnh màu khác. Nay đọc ảnh của ô
   màu đang chọn. Đo: chọn *Bianco* + *IT 41* trên SP#6 → sheet xác nhận ra đúng `p6-v2.jpg`,
   biến thể *"Bianco , IT 41"*, giỏ 5 → 6.

### 7.4 Vá kèm: `aria-hidden` dán lên dialog đang mở

Phát hiện khi đo: `closeQA()` hẹn 300ms mới gắn `aria-hidden="true"`; **mở lại trong 300ms** (bấm ✕
rồi chạm ngay ô `+` của thẻ bên cạnh — nhịp rất thường) thì cái hẹn cũ nổ muộn và dán
`aria-hidden="true"` lên panel **đang mở**: mắt thấy sheet, trình đọc màn hình coi như không có gì.
Lỗi có sẵn, không do đợt này. Đã huỷ hẹn cũ khi mở. Đo: mở lại sau 100ms → `aria-hidden="false"`;
đóng bình thường vẫn về `"true"`.

### 7.5 `#sizeSheet` nay là khối ngủ

`__openSizeSheet` hết nơi gọi. **Chưa xoá** (~130 dòng) vì repo demo **chưa có commit nào** nên xoá
là không lấy lại được, và khuôn danh sách này có thể còn dùng cho màn khác. Dữ liệu
`SIZE_SHEET_OPTIONS` thì **vẫn sống**: PDP2/PDP3 và `qaSizesOf()` đều đọc từ đó. Đã ghi rõ vòng đời
trong comment tại chỗ — nói một tiếng nếu muốn dọn hẳn.

> Chưa chụp được ảnh minh hoạ: Browser pane của phiên này không hiển thị nên trang không compositing
> (transition đóng băng, screenshot timeout). Toàn bộ số liệu trên là đo bằng DOM/computed style ở
> khổ 375, console sạch.

---

## 8 · Trạng thái đồng bộ 5 file sau đợt này

| Hạng mục PLP | index | desktop | 3 fork |
|---|---|---|---|
| Badge "Đặt trước" trước tên | ✔ (#dfdfdf) | ✔ (#dfdfdf) | ✔ **MỚI** (mặt pre-order của từng skin) |
| Show more: label VI + không wire chồng + ẩn khi 0 KQ + append đủ badge/pill + localize | ✔ | ✔ | ✔ |
| Progress "X trong Y" theo trạng thái lọc | — (không có progress, chủ ý) | ✔ | ✔ |
| Ô tìm thương hiệu (đếm cả f-gone + reset dọn ô) | ✔ | ✔ | ✔ |
| Khoảng giá w-full/min-w-0 | ✔ | ✔ | ✔ |
| "Chỉ hàng có sẵn" lọc thật | ✔ | ✔ | ✔ |
| Bộ khoá I18N mới (sort/Đang tải/toast/aria/Trending/promo/brand-desc) | ✔ | ✔ | ✔ (trừ promo/brand-desc: fork dùng chung chuỗi nên khoá thêm là đủ nếu trùng nguyên văn) |
| Tab đơn vị giày giữ tick đã áp | ✔ | ✔ | — (fork chưa có tab đơn vị — lệch có chủ ý) |
| Swatch đổi ảnh + truyền màu vào quick-add | ✔ (vốn có) | ✔ **MỚI** | — (giữ hành vi dời viền của nền cũ) |
| Nhớ số cột lưới qua điều hướng | ✔ **MỚI** (plpGridCols) | ✔ (plpCols, vốn có) | ✔ (plpCols theo desktop) |
| Khối bộ lọc nguyên khối (cây 3 tầng · nhóm size · mục đóng sẵn) | ✔ | ✔ | ✖ chờ gật (mục 9 FILTER-FEEDBACK — KHÔNG đụng đợt này) |

**Kiểm sau sửa:** `node --check` sạch mọi khối script cả 5 file · console sạch ·
vòng VI→EN→VI các chuỗi mới đúng cả 2 chiều · toàn bộ kịch bản edge đã đo lại trên trang chạy
(mục 1–3). Deploy Vercel: chỉ cần push như thường lệ, không đổi đường dẫn.
