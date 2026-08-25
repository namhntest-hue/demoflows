# Trang chủ ngành Làm đẹp — screen `beauty` trong `home.html`

> Dựng 24/08/2026. Vào bằng cách bấm **Làm đẹp** ở hàng dept của header, hoặc mở
> `http://localhost:8124/home.html#beauty`.
> **Bố cục lấy theo mrporter.com** (lệnh user); **linh kiện, màu và chữ là của
> mình** — 0 vi phạm `STYLE-RULES.md`.

---

## 0. Bản 2 — bố cục MR PORTER (lệnh user, thay bản Index-First)

Bản đầu tôi dựng theo khuôn **Index-First** (trang là một mục lục). User đưa ảnh
chụp mrporter.com và yêu cầu **dùng bố cục của họ, giữ linh kiện + style của
mình**. Đã thay.

### Đọc ra 5 khối lặp của MR PORTER

Trang họ không phải 12 mục rời — nó là 5 khối dùng đi dùng lại:

| | Khối | Nhận dạng |
|---|---|---|
| **U1** | Dải full-bleed | Ảnh tràn mép, chữ ghim **góc dưới trái** |
| **U2** | Chữ trái + dải hàng phải | Cột chữ hẹp (1 phần) · dải sản phẩm (3 phần) |
| **U3** | Đôi ảnh + chú thích | 2 ảnh bằng nhau, chú thích **nằm DƯỚI ảnh**, không đè lên |
| **U4** | Tạp chí | 2 ảnh lệch cỡ (7/5), rồi tiêu đề + đoạn văn bên dưới |
| **U5** | Hàng chủ đề | 6 ô nhỏ ngang một hàng |

Xếp: `U1 → U2 → U3 → U1(nền xám) → U3 → U2 → U4 → U5 → bản tin 2 cột → footer`.
Thứ làm nên nhịp của họ là **xen kẽ full-bleed và trong rail**, cộng với **chú
thích luôn nằm dưới ảnh**. Bản này giữ đúng cả hai.

### Ba chỗ họ làm mà luật mình không cho — đổi cách nói, không đổi nhịp

| | MR PORTER | Ở đây |
|---|---|---|
| Hero | **dải ĐEN full-bleed** | §2.2 khoá mặt tối vào đúng 3 vai (nút chính · backdrop · promo bar); dải hero là vai thứ 4. → hero vẫn full-bleed nhưng nền là **ẢNH**, chữ nằm trong **tấm trắng góc dưới trái** (đòn nhấn 3 của §2.3). Giữ được thế "chữ ghim góc dưới trái" |
| Chú thích dưới ảnh | **CHỮ HOA** | §1.5 khoá chữ hoa vào 5 vai, không có vai "chú thích ảnh". → họ nội dung T3 14/20 chữ thường; phân cấp do mực + kẻ mảnh lo |
| Số "540" | **64–80px** | §1.2 chốt cao nhất 24/32 và bạn yêu cầu giữ typo. → khoảnh khắc "số lớn" chỉ tới **24/32**. **Đây là chỗ bản này yếu hơn bản gốc thấy rõ nhất** — muốn mạnh bằng thì phải sửa §1.2 trước |

Dải nhà mốt (khuôn "TOM FORD" nền kem của họ) thì hợp lệ nguyên vẹn: `#f2f2f2`
là 1 trong 2 **mặt** của §2.2, dùng làm nền một VÙNG trong dòng chảy đúng như
block tổng tiền của màn giỏ.

### Linh kiện là của mình

Card sản phẩm ở 2 dải hàng dùng lại **đúng `.hp-card`** của screen `nam` — cùng
tỉ lệ ảnh 189/252, cùng bậc chữ, cùng cú đổi ảnh khi rê chuột. Không dựng card
thứ ba. Nút, link "xem thêm", kẻ 3 tầng, nhãn hoa: đều là linh kiện sẵn có.

### Số đo sau khi đổi bố cục

| Khối | Đo được ở 1440 |
|---|---|
| U1 hero | **1425×460 tại x=0** (tràn mép), tấm chữ 336×198 ở góc dưới trái |
| U2 | cột `334 / 1003` = 1fr/3fr, 4 card |
| U3 | 2 cột 676 bằng nhau, ảnh 676×507 (4/3) |
| U1b dải xám | 1425×594, nền `#f2f2f2`, 2 cột 664 |
| U2 nhà mốt | **3 card** — Versace có đúng 3 mã, không đệm cho đủ 4 |
| U4 tạp chí | 789/564 = 7fr/5fr |
| U5 | 6 ô × 216 |

Khổ <768: mọi lưới về 1 cột, hàng chủ đề 2 cột, dải sản phẩm thành dải trượt có
điểm dừng, hero về tỉ lệ 4/5. Không tràn ngang.

**Nội dung vẫn đếm từ data:** số 33 loại / 8 nhóm lấy từ cây `BEAUTY_CATS`; câu
mở của mục Tạp chí tự sinh *"6 dòng trong 3 nhóm (Tắm & dưỡng thể, Chăm sóc tay,
Hương thơm không gian) có bản thay…"* bằng cách lọc chính cây đó.

### Một lỗi CSS đáng ghi lại — dính HAI lần trong cùng một khối chú thích

Cụm biến nhịp `.screen[data-screen="beauty"]` **biến mất khỏi stylesheet** (dò
`document.styleSheets`: 41 rule `.bt-*` có mặt, riêng rule đó không) nên screen
chạy bằng giá trị mặc định 1.04 / 1.4s. Hai nguyên nhân nối tiếp nhau:

1. **Khối stamp Hallmark bị lồng vào giữa khối chú thích.** CSS không cho comment
   lồng nhau — dấu đóng bên trong đóng luôn khối ngoài, phần chữ còn lại thành
   rác cú pháp và nuốt rule ngay sau.
2. Sửa xong (1), tôi viết một dòng cảnh báo *về* lỗi đó và **gõ dấu đóng comment
   nguyên văn vào giữa câu** → tự đóng comment tại đúng chỗ đang mô tả, lỗi lặp
   lại y hệt.

Đã vá cả hai và thêm bộ dò cân bằng comment vào quy trình kiểm. **Bài học:** đừng
tin mắt khi đọc CSS có khối chú thích dài — dò `document.styleSheets` xem rule có
thật sự vào sheet không.

---

## 1. Pre-flight: `hallmark` nhường hệ thiết kế của dự án

`hallmark` có luật riêng: *"`design.md` — nếu có, đây là hệ thiết kế bị khoá của
dự án; đọc nó trước, nó thắng mọi thứ khác. Các lựa chọn sau (genre, theme, type,
motion) đều nhường nó. Luật đa dạng hoá bị ĐẢO trên dự án có `design.md`: các
trang phải DÙNG CHUNG hệ, không phải khác nhau."*

Dự án này có đúng thứ đó, chỉ khác tên file: **`STYLE-RULES.md` + `shadcn-theme/theme.css`**.
Nên theo chính luật của skill:

| Trục | `hallmark` mặc định làm gì | Ở đây |
|---|---|---|
| Palette | dựng OKLCH mới | **nhường** — 2 mặt · 3 mực · 3 tầng viền của §2.1–§3.1 |
| Font pairing | chọn cặp display + body | **nhường** — Montserrat, đúng 2 nấc 400/500 |
| Thang chữ | thang riêng của theme | **nhường** — 10 · 12 · 14 · 18 · 24 |
| `tokens.css` | luôn ghi ra | **KHÔNG ghi** — `tokens.css` của dự án là file SINH TỰ ĐỘNG ("Không sửa tay — chạy lại gen_tokens.py"). Ghi đè lên là phá pipeline token |
| Bo góc / bóng | 4–12px, bóng ultra-diffuse | **nhường** — bo 0, không bóng |
| **Macrostructure** | rotate theo `.hallmark/log.json` | **ÁP DỤNG** — đây là trục duy nhất được đổi, và đúng là trục user muốn đổi |

Đã tạo `.hallmark/log.json` với 3 entry (3 screen) để lượt sau tự rotate.

---

## 2. Vì sao đổi khỏi Index-First

Bản Index-First (trang là mục lục 8 nhóm, sản phẩm dạng hàng, không reveal) vẫn
là một hướng tốt cho ngành làm đẹp — khách vào với một món trong đầu thì mục lục
là đường ngắn nhất. Nhưng bạn chọn bố cục MR PORTER, nên bản đó đã thay.

**Cái mất khi bỏ Index-First:** mục lục 8 nhóm × 33 loại ngay trên trang. Cái đó
nay **nằm ở subheader** — ngành Làm đẹp có 11 mục và 9 mega panel, tức vẫn vào
được mọi nhánh, chỉ là phải mở menu thay vì đọc thẳng trên trang.

**Nhịp chuyển động cũng đổi:** Index-First quy định `Reveal: none` nên bản cũ
không có hiệu ứng vào màn. Bản MR PORTER có, ở mức nhẹ nhất trong 3 screen —
`10px / .5s / không xếp lệch` (so với `nam` 16px/.8s và `nu` 12px/.6s + lệch 80ms).

## 3. Kèm theo: sửa một chỗ bản gốc mà lượt gộp trước làm mất

Bản gốc `desktop.html` có hàm `dkNavCats(dept)`: ngành thời trang dùng bộ **8**
danh mục cố định, còn **ngành Làm đẹp sinh thẳng từ `MENU_DATA['Làm đẹp'].cats`
nên ra 11 mục** — và chính vì 11 mục nên thanh **tràn, mũi tên trượt hiện ra**.

Lượt gộp trước tôi dựng subheader **một lần rồi thôi** → mất hành vi này, và mũi
tên trượt (đã port đầy đủ) **chưa bao giờ hiện**. Nay `renderSubheader(dept)`
chạy lại mỗi lần đổi screen. Đo được:

| | screen `nam` / `nu` | screen `beauty` |
|---|---|---|
| Số mục subheader | **8** | **11** |
| Mega panel | 6 | **9** (8 nhóm 1 cột + Thương hiệu 3 cột) |
| Thanh có tràn | 1409 = 1409 → không | **1457 > 1409 → CÓ** |
| Mũi tên trượt | ẩn | **hiện** |

Khi refactor có một bẫy đã vá: 2 listener bám vào `sub`/`document` (focusout +
Escape) mà render lại là cộng thêm một bản mỗi lần đổi dept. Đã gác bằng cờ
`sub.dataset.wired` + một con trỏ `setOpenRef` trỏ tới bản `setOpen` mới nhất.
Đổi dept **5 lượt** rồi đo lại: vẫn đúng 11 mục · 9 panel · `wired = 1`.

---

## 4. Cấu trúc screen `beauty` (bản 2)

| # | Khối | Nội dung |
|---|---|---|
| 1 | **U1 · Hero full-bleed** | Ảnh tràn mép + tấm trắng góc dưới trái mang thông điệp NGÀNH HÀNG: "Làm đẹp" · "Nước hoa & hương thơm" · *"8 dòng từ 4 nhà mốt"* (đếm từ data) · nút Xem tất cả |
| 2 | **U2 · Vừa về** | Trái: số **33** + "loại trong 8 nhóm" + nút. Phải: 4 card |
| 3 | **U3 · Đôi ảnh** | Hương thơm không gian · Tắm & dưỡng thể — chú thích dưới ảnh |
| 4 | **U1b · Dải nhà mốt** | Nền `#f2f2f2` full-bleed: Montblanc + ảnh phải |
| 5 | **U3 · Đôi ảnh** | Quà tặng · Du lịch |
| 6 | **U2 · Nhà mốt + hàng** | Versace + **3 card** (đúng số mã họ có) |
| 7 | **U4 · Tạp chí** | 2 ảnh 7/5, rồi tiêu đề refill + đoạn văn sinh từ data |
| 8 | **U5 · Thêm chủ đề** | 6 ô, nhãn lấy thẳng từ cây danh mục |
| 9 | Bản tin 2 cột · footer | Trái đăng ký, phải "Cần hỗ trợ?" + "Khu vực" — khuôn bản gốc |

**Sửa 24/08 — banner bỏ tên và giá sản phẩm.** Tấm chữ trên hero trước đây ghi
*"Dolce&Gabbana · Devotion · Eau de Parfum Intense · 100 ml · 5.250.000 ₫"*, tức
tên + giá một SKU. Lệnh user: banner không đính kèm tên và giá. Nay tấm chữ mang
thông điệp ngành hàng, hai con số đếm từ data. Cùng đợt: screen `nam` gỡ hẳn thẻ
hàng trên ảnh hero, screen `nu` gỡ dòng tên + giá (giữ chip "42 mẫu" — đó là quy
mô bộ sưu tập, không phải tên cũng không phải giá).

### Ba chỗ cố ý KHÔNG bịa (luật "honest copy" của hallmark)

1. **Nhà mốt Versace đúng 3 card, không đệm cho đủ 4 ô.** Trong data họ có đúng 3
   mã làm đẹp. Thêm ô cho cân lưới là nói sai về hàng đang bán.
2. **Không bịa dịch vụ, không bịa bài viết.** Mục "Thêm chủ đề" dùng nhãn lấy
   thẳng từ cây danh mục (Nến thơm Signature, Nước hoa du lịch, Kem dưỡng tay…)
   nên không có chủ đề nào không tồn tại trong hệ.
3. **Không gán nhóm hương cho SKU.** Bản 1 có mục "chọn theo nhóm hương" với định
   nghĩa nốt hương nhưng **không** gắn sản phẩm nào vào nhóm — dự án chưa có data
   phân loại hương. Bản 2 bỏ hẳn mục đó theo bố cục MR PORTER.

**Một chỗ hở của data cần bạn biết:** cây 8 nhóm phủ tắm/tay/tóc/hương thơm không
gian, nhưng **cả 8 SKU đang có đều là nước hoa**. Bố cục MR PORTER che chỗ này
kém hơn bản Index-First: các khối U3 "Hương thơm không gian" / "Tắm & dưỡng thể"
đang phải mượn **ảnh chai nước hoa** làm ảnh đại diện. Đây là chỗ dễ bị hỏi nhất
khi demo.

---

## 5. Số đo — 3 screen, cùng một file

| Trục | `nam` | `nu` | **`beauty`** |
|---|---|---|---|
| Tổ hợp typo | 7 | 8 (3 bậc serif) | **7** |
| Mặt chữ | 1 | 2 | **1** — Montserrat |
| Tracking | 1 | 4 | **1** — 0.5px |
| Bậc mực | 3 + đỏ + trắng | như bên | **như bên** |
| Sắc viền | 3 tầng | 3 tầng | **3 tầng** |
| Nền trang | `#ffffff` | `#f7f6f3` | **`#ffffff`** |
| Bo góc sai · bóng | 0 · 0 | 0 · 0 | **0 · 0** |
| Reveal | 16px/.8s | 12px/.6s stagger 80ms | **10px/.5s, không xếp lệch** |
| Tràn ngang | không | không | **không** |

Screen `beauty`: **0 vi phạm** trên cả 6 trục dò. Đúng yêu cầu *"giữ màu sắc và
typo theo rule"* — nó dùng **cùng bộ số với screen `nam`**, khác hoàn toàn ở bố cục.

### Kèm 3 sửa nhỏ ảnh hưởng cả file

1. **`.hp-more` được nới vùng bấm** lên 44px bằng `::before` phủ ngoài (trước đó
   chỉ `.hp-tab` và `.hp-sw__b` được nới; `.hp-more` cao 16px — dưới ngưỡng 24px
   của WCAG 2.5.8). Sửa 1 chỗ, cả screen `nam` và `beauty` đi theo.
2. **Hàng mục lục ở khổ nhỏ kẹp 2 dòng** (`-webkit-line-clamp`): nhóm 7 loại
   xuống 5–6 dòng ở khung 295px làm hàng cao 119px, 8 hàng thì mục lục không quét
   được. Nay 83–101px.
3. **`overflow-x` đổi từ `hidden` sang `clip`** (giữ `hidden` làm dự phòng):
   `hidden` biến `body` thành khối cuộn — đúng loại tổ hợp hay làm `position:
   sticky` chết, mà header của trang này là sticky. Đã đo lại sau khi đổi: cuộn
   tới 932px thì `.navbar` ở −32 và `#dkNavRow` ở 0 — sticky nguyên vẹn.

---

## 6. Cần bạn chốt

1. **Ba screen đang có 2 kiểu footer** (`nam` 5 cột · `nu` + `beauty` 4 cột gọn).
   Hợp nhất về một kiểu chứ? Một website thật không đổi footer theo ngành hàng.
2. **Lỗ hổng data ngành Làm đẹp** (mục 4): cây 33 loại nhưng chỉ có SKU nước hoa.
   Có bổ sung data cho vài nhóm nữa (nến, sữa tắm, chăm sóc tay) để trang bày
   được đúng những gì mục lục dẫn tới không?
3. **Khuôn Index-First có nên áp cho screen `nam` không?** Hiện `nam` vẫn là trang
   chủ CHUNG chứ không phải trang chủ ngành Nam (câu hỏi mở từ `HOMEPAGE-NU.md`).
   Nếu dựng trang chủ ngành Nam thật thì nên theo khuôn nào — hero ảnh như `nu`,
   hay mục lục như `beauty`?
4. **`.dk-dept:hover`** vẫn mở từ 2 báo cáo trước: `#404040` của bản gốc hay
   `#333` như file đang dùng.
