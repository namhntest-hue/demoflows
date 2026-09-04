# PDP — trạng thái & biến thể vào Figma (03–04/09/2026)

File Figma: `Test agent` — `XFfjTNMuPfaTeZvdbVIO2F`, page **screens**
Section: **`PDP — trạng thái & biến thể`** (`190:12491`, `x -100 / y 32400`, khổ 9340×13420) — **33 khung**
(32 khung màn/khối + 1 khung `[doc]`), **55 instance component**.

Nguồn: **`index.html` (mobile 375) + `desktop.html` (desktop 1440)**, bộ da vào-trang `skin-mt skin-li`.

> **Đính chính so với bản đầu**: lượt đầu tôi hiểu "tất cả phiên bản" = 5 tệp bộ da nên đã dựng
> `desktop-neutral` / `desktop-editorial` / `desktop-atelier`. User đính chính: *"ý tôi là các phiên
> bản, case có thể xảy ra, chứ không phải các skin"* + *"trong figma sẽ dùng mỗi skin-li là được coi
> là gần như final"*. **3 khung fork đã xoá**, section đổi tên và dựng lại theo case.

---

## 1 · Sáu case dữ liệu (mỗi case × 2 khổ = 12 khung)

| SP | Sản phẩm | Case đặc trưng | Bộ size | Mobile | Desktop |
|---|---|---|---|---|---|
| SP1 | Đầm lụa mini Broken Jewels | **Đặt trước — KHÔNG sale** | IT 39–44 | 375×3558 | 1440×3677 |
| SP2 | Khăn lụa 90×90cm | Size chữ, không sale | S · M · L | 375×3488 | 1440×2941 |
| SP3 | Túi đeo vai da Emblème | **Sale −15%** (có giá gạch) | Onesize | 375×3438 | 1440×3895 |
| SP4 | Giày cao gót Gianni 90 | 9 bậc size, không sale | IT 36–44 | 375×3476 | 1440×3895 |
| SP5 | Giày loafer Manu | **Sale −30%** + 9 bậc size | IT 36–44 | 375×3478 | 1440×3895 |
| SP6 | Sneaker Greca Court | **KHÔNG có hàng ô màu** (`noColors`) | IT 36–44 | 375×3392 | 1440×3895 |

Sáu sản phẩm này phủ hết các nhánh render của PDP: đặt trước · có sale (giá gạch + chip −%) ·
không sale · size chữ · Onesize · 9 bậc size · có/không hàng ô màu · size hết hàng · size sắp hết.

Khổ khung khớp trang chạy **đúng từng px** — đo lại sau khi ráp component và sau lượt auto layout:
12/12 khớp. SP1 là bản duy nhất có cột nội dung rộng 569 (`.dk-info-wide`) và dải "Gợi ý mua kèm"
khuôn chữ-một-bên; SP2 thấp hơn hẳn (2941) vì không có dải đó.

---

## 2 · Trạng thái chọn size (5 trạng thái × 2 khổ = 10 khung)

| Trạng thái | Khối chọn | Nút mua | Cao mobile | Cao desktop |
|---|---|---|---|---|
| Chưa chọn size | chip trống, không dòng đỏ | "Đặt trước" | 204 | 821 |
| Đã chọn size | chip viền đậm | "Đặt trước" | 204 | 821 |
| Size sắp hết | + "Chỉ còn 01 sản phẩm" | "Đặt trước" | 228 | 845 |
| Size hết hàng | chip gạch, **không** dòng đỏ | "Tạm hết hàng" — **khoá** | 204 | 821 |
| Size chờ hàng | chip gạch + "*Tạm hết hàng" | "Nhận thông báo khi có hàng" | 236 | 853 |

Mobile tách thành **2 khung** cho mỗi trạng thái (khối chọn + nút mua) vì trong DOM chúng là 2 khối
anh em, không có khung bọc chung. Desktop chỉ 1 khung vì cả cụm nằm trong `.dk-sticky-info`.

Hai trạng thái khoá dùng đúng variant `action state=_disabled`.

---

## 3 · Lớp nổi (5 khung)

| Lớp nổi | Mobile | Desktop | Ghi chú |
|---|---|---|---|
| Bảng kích thước | 375×812 | 1440×900 | dùng chung `#infoSheet` chế độ `full` |
| Nhận thông báo khi có hàng | 375×812 | 1440×900 | mở từ nút mua khi size đang chờ hàng (`window.__openNotify`) |
| Xem ảnh phóng to | — | 1440×900 | chỉ desktop (`#zoomBox`) |

---

## 4 · Component dùng lại — 263 instance

*(đợt 1 ráp 55; đợt **04/09** sau khi thống nhất tên nối thêm **208** — xem `NAMING-MAGENTO.md` §9.4)*

| Component | Số instance | Ghi chú |
|---|---|---|
| `swatch-option` | **134** | mọi chip size; thêm bậc MỚI `state=_selected-oos` |
| `collapsible` | **53** | thêm trục MỚI `size` — `sm` 12/16 cao 45 (Cart) · `md` 14/20 cao 57 (PDP) |
| `badge` | **28** | thêm kiểu MỚI `kind=inline` cao 16 nền `#dfdfdf` (nhãn "Đặt trước" trước tên) + 9 `kind=on-image` |
| `action` | **24** | nút mua ở 12 màn + 10 khung trạng thái; 2 khung khoá dùng `state=_disabled` |
| `page-header-desktop` | 6 | 6 màn desktop |
| `service-promises-desktop` | 6 | 6 màn desktop |
| `service-promises-mobile` | 6 | 6 màn mobile |
| `page-footer-mobile` | 6 | 6 màn mobile |

Ba thay đổi component đều là **phép cộng** (thêm variant / thêm trục) nên instance cũ không đổi.
Mỗi lượt ráp đều **đo `w×h` với node raw trước khi xoá**, lệch > 1,5px là tự bỏ instance và giữ raw.
**32/32 khung giữ nguyên khổ** sau cả hai đợt — không xê dịch 1px nào. Auto layout 1.760/2.074 = 84,9%
(tổng khung raw giảm vì phần đã ráp nay nằm trong instance).

### Giữ raw vì đo KHÔNG trùng (kèm số)

| Component | Số đo lệch |
|---|---|
| `page-header-mobile` | cùng 375×48 nhưng icon **24 so 20**, logo là chữ "LOGO" thay ảnh thật, **thiếu chấm giỏ hàng**; ô icon thứ 2 bên trái còn là **bản sao burger** (đáng ra là tìm kiếm) |
| `page-footer-desktop` | **447 so 414** (lệch 33) — nội dung 37/37 chuỗi trùng, chỉ khác nhịp |
| `Breadcrumb` | 306 co nội dung so hàng **1440**, cao **36 so 40**, chữ **tiếng Anh** |
| `product-item-info` size=rail | **353 so 335** — component còn `price-box` 40 + hàng ô màu 20 mà code đã bỏ |
| `product-item-info-desktop` rail / look | **272×471** và **266×462** so **345×568** và **330×548** |
| `collapsible` | **320×45 so 359×56**, nhãn chữ HOA so chữ thường |
| `swatch-option` | chip **80×36** so ô màu **TRÒN 44×44** (ngoại lệ §3.2 STYLE-RULES) |
| `badge` cho nhãn "Đặt trước" trước tên | cần bậc **cao 16 nền `#dfdfdf`**; bộ badge chỉ có `neutral` cao 24 `#f2f2f2` |
| `action size=icon` | **40×40 vuông** so `quick-add` **36×36 tròn** |

---

## 5 · Auto layout (luật thường trực)

**1.964 / 2.298 khung = 85,5%.** Phần còn lại **chỉ gồm 5 nhóm đúng-phải-giữ**:

| Nhóm | Số | Vì sao giữ |
|---|---|---|
| ô đệm `space/N` rỗng | 170 | 0 con — chính chúng LÀ khe của auto layout |
| `clamp` | 156 | mực chữ **cố ý** cao hơn hộp do `line-clamp` |
| `dk-look-band` | 6 | con tràn cả trên lẫn dưới cha |
| hàng tiêu đề sheet nhận-thông-báo | 2 | nút ✕ lệch trên 8px so với khối chữ — Figma không có margin riêng từng con; đã thử bọc khung và **phải lùi** |

### Vá thêm trong lượt này — lệch 0px

- **13 đoạn chữ 2 dòng** → `HORIZONTAL` + `WRAP` (xếp lại con theo thứ tự đọc, khe ngang = khe 2 run
  đầu dòng, khe dòng = 0, cao để FIXED)
- **10 khối "tiêu đề lệch trong + dải full-bleed"** → bọc tiêu đề vào khung `section-title` đệm trái 16
  rồi cho khối cha lên VERTICAL
- **2 khối bảng size** có bảng tràn **16px sang trái** → bảng để `ABSOLUTE`, cha VERTICAL cao cố định
- **2 khung lớp nổi** (backdrop + panel đè nhau) → cha VERTICAL, backdrop `ABSOLUTE`, panel `FILL`

Khung `[doc]` cũng auto layout 100%.

---

## 6 · Hai lỗi pipeline đã vá (giữ lại, gặp lại chắc chắn)

### (1) `builder.js` bấm cứng họ chữ

`n.fam.includes('Bodoni') ? 'Libre Bodoni' : 'Inter'` — mọi phông khác sẽ ra Inter mà **không báo lỗi
gì**. Đã vá: dựng bảng `listAvailableFontsAsync()` rồi trả đúng họ, quy weight sang **tên style có
thật**. Hai điều phải nhớ: **Lora không có Light** nên 300 → Regular, và tên style **không đồng nhất**
— Inter là `Semi Bold`/`Extra Bold` (có dấu cách) còn Montserrat/Lora là `SemiBold`/`ExtraBold`.
Thêm `stats.fontUsed` / `fontSub` để thấy ngay khi phải thay phông.

### (2) Bảng thông báo `#promoSlider` ra RỖNG

`desktop.html:11436` đặt `translateX(-pIdx*100%)` lên **cả dải**, mà dải nằm trong hộp
`.h-8.overflow-hidden`. Khi `pIdx > 0` thì cả dải rơi ra ngoài vùng cắt → luật clip của bộ trích xoá
sạch → hộp 1440×32 ra 0 con, mà `warnN` vẫn 0. Đã vá `extractor.js`: trả dải về slide 0 trước khi đo.
**Cách phát hiện**: grep chuỗi chữ trong JSON đã bóc rồi so giữa các bản.

---

## 7 · Ba bẫy mới ghi sổ

1. **`go(name)` thoát sớm khi đã ở màn đó** (`if (name === current) return`) — gọi `go('pdp')` để
   "reset" không reset gì cả, nên khung "chưa chọn size" đầu tiên bóc ra lại là trạng thái của lượt
   trước. Phải `location.reload()` giữa các trạng thái cần trạng thái sạch.
2. **Chốt tự lùi phải hoàn tác cả THAY ĐỔI CẤU TRÚC**, không chỉ x/y. Lượt vá hàng tiêu đề sheet tạo
   khung bọc `offset-8` rồi lùi — nhưng hàm lùi chỉ trả x/y của con, mà con giờ nằm trong khung bọc
   nên nút ✕ nhảy từ phải sang trái. Đã phát hiện bằng **ảnh chụp**, không phải bằng số đo, rồi gỡ
   khung bọc và trả nút về `(337, 8)` / `(452, 8)`.
3. **`frame.resize(w, 1)` ghi đè `primaryAxisSizingMode = 'AUTO'` về FIXED** — ô bảng trong khung
   `[doc]` đứng ở cao 1px, chữ 2 dòng tràn ra đè hàng dưới. Phải set `layoutSizingVertical = 'HUG'`
   **sau** khi đổ nội dung.

---

## 7b · Còn giữ raw sau đợt ráp 04/09 — kèm số lệch

| Còn raw | Số | Lệch |
|---|---|---|
| `product-item-info` (thẻ SP) | 78 | component còn `price-box` 40 + hàng ô màu 20 mà code đã bỏ → **353 so 335**; bản desktop **272×471 so 345×568** |
| `page-header-mobile` | 6 | cùng 375×48 nhưng component dựng nút **40×40 icon 24 + logo chữ**, code dùng **icon 20 + logo ảnh + chấm giỏ** — hai kiểu nút khác nhau, không phải số lệch |
| `modal-overlay` | 4 | component phủ đen **60%**, demo **45%** |
| `control` | 4 | **320×40** pad 12/8 so **341×44** pad 13 |
| accordion SP6 mobile | 3 | cao **52 so 56** — lỗi demo, xem mục 8 |
| nút sticky mobile | 5 | cao **44**, mà `action` chỉ có 48/40/36 — lỗi demo, xem mục 8 |

## 8 · Năm điểm chờ user chốt

1. **Nút khoá**: component `action state=_disabled` để `opacity 0,5` còn code để **0,4** — khung Figma
   đang theo code. Chốt một bên.
2. **Dòng đỏ "*Tạm hết hàng"** hiện **không** hiện lúc chưa chọn size, nên người xem thấy chip gạch mà
   không có lời giải thích; nó chỉ hiện khi chọn size **chờ hàng**, và bị **ẩn** khi chọn size **hết
   hàng** (`index.html:11001` có chú thích là cố ý — "không còn hành động nào khả dụng"). Nếu muốn dòng
   này luôn hiện thì đổi 1 dòng code.
3. **Bảng kích thước dùng chung `#infoSheet`** với các sheet khác — nếu muốn tách component riêng trong
   design system thì cần chốt trước.
4. **LỖI DEMO tìm ra 04/09**: hàng accordion của **SP6 bản mobile cao 52** trong khi 5 sản phẩm còn lại
   cao **56** (đo trên `index.html`: `pdp` và `pdp4` ra 56, `pdp6` ra 52 — bằng đúng hàng accordion của
   footer). Vì lệch 4px nên 3 hàng đó chưa ráp được `collapsible`. Sửa 1 chỗ trong demo là ráp nốt.
5. **`product-item-info` / `product-item-info-desktop`** vẫn ở bản 26/08, lệch code 8–120px — đây là
   khối raw lớn nhất còn lại (78 thẻ). Cập nhật component (162 instance cũ sẽ đổi theo) hay giữ nguyên?

Ba điểm cũ về component (logo thật trong 2 header, `page-footer-desktop` lệch 33px, `Breadcrumb` tiếng
Anh) vẫn để ngỏ. `badge kind=inline` thì **đã làm** trong đợt này.

**Thêm một lệch nữa đáng ghi**: nút "Đặt trước" ở **thanh sticky mobile cao 44** còn nút trong trang
cao **48** — cùng một vai nút mà hai chiều cao, nên `action` (48/40/36) không có bậc để ráp.

---

## 9 · Hạ tầng

- Cầu nối `bridge.py` cổng **9226**
- JSON đã bóc (22 tệp): `m_pdp2…6` · `d_pdp2…6` · `m_buy_*` (5) · `m_cta_*` (5) · `d_buy_*` (5) ·
  `m_sizechart` · `m_notify` · `d_sizechart` · `d_notify` · `d_zoom` + 2 tệp SP1 của lượt trước
- Khung nháp `__probe` đã dọn; 3 khung fork đã xoá
