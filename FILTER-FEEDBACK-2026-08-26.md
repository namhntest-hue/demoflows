# Feedback bộ lọc của khách — 26/08/2026

Nguồn: ảnh "FEEDBACK BỘ FILTER" khách gửi 26/08/2026 (5 điểm, có ảnh chụp panel + 1 bảng
heel height + 1 ảnh sheet Excel category).

**Đã sửa: cả 5 file** — `index.html` (mobile) · `desktop.html` · 3 bản thử skin
(`desktop-neutral` · `desktop-editorial` · `desktop-atelier`).

`index` và `desktop` khai **giống hệt nhau**. 3 bản thử skin nằm trên **nền bộ lọc cũ hơn**
(fork từ desktop khoảng 18/08) nên còn 3 chỗ lệch có chủ ý — bảng ở mục "Việc còn mở" cuối file.

Đo trên `http://localhost:8127/`: mobile 375×812 (`skin-mt skin-li`), desktop 1440.
Console sạch ở cả 5 file sau toàn bộ lượt kiểm.

---

## 0 · Cập nhật theo file Excel khách gửi lại (26/08 chiều)

Khách gửi **`Filter - Beauty cate demo (1).xlsx`** — bản đã tách gender. 4 thứ đã áp vào
**cả 5 file** (`index` · `desktop` · 3 bản thử skin):

| Sheet | Có gì mới | Đã làm |
|---|---|---|
| `Product categories` | thêm cột **Note** = `Both` / `Chỉ NAM` / `Chỉ NỮ` cho từng product type (101 / 14 / 26 dòng) | thay bảng gender mình tự đoán bằng **dữ liệu khách** |
| `Cate tree_NAM` · `Cate tree_NỮ` | 2 cây riêng, có cả EN | dùng để **đối chiếu**: lọc cây đủ theo cột Note ra đúng **113 leaf (nam)** / **125 leaf (nữ)** — khớp 100% cả 2 sheet |
| `Color` | 15 màu kèm tên tiếng Việt chuẩn | đổi 3 nhãn: `Gold → **Vàng đồng**`, `Beige → **Kem**`, `Multi-colour → **Nhiều màu**` (mình từng đặt "Đa sắc") |
| `Brand` | nay **24** thương hiệu | thêm MessyWeekend · MISBHV · Moschino Jeans · Stand Oil |
| `Size` | tách theo **gender × category** | nhóm "Khác" nay khác nhau theo giới (bảng bên dưới) |

**Cây danh mục sau khi áp** (đo trên trang chạy, khớp đúng file Excel):

| | L1 | L2 | L3 |
|---|---|---|---|
| PLP nam | 7 | 39 | **113** |
| PLP nữ | 7 | 44 | **125** |
| PLP không có giới tính (thương hiệu / tìm kiếm) | 7 | 49 | **139** |

Không cần nhân bản cả cây: chỉ 2 bảng "chỉ một giới" + `catTreeFor()` tự cho nhánh rỗng rụng —
cây nam rụng 10 nhánh L2 (Chân váy · Đầm & áo liền quần · Giày cao gót · Giày sandals · Giày boots ·
Giày bệt · Túi xách tay · Túi đeo vai · Bông tai · Khăn), cây nữ rụng 5 nhánh (Giày tây & monk straps ·
Giày moccasins · Túi đựng tài liệu · Túi đeo hông · Chăm sóc sản phẩm).

**Bảng đoán trước đó của mình sai ở đâu** (nay đã thay hết):

- **Đoán sai 3 dòng**: `Áo dây & croptops` KHÔNG phải cụm riêng của nữ — nam vẫn có `Áo thun ba lỗ`
  trong cụm đó (đúng như câu mình đã hỏi lại); `Quần leggings` và `Áo choàng không tay` là hàng
  **cả hai giới**.
- **Bỏ sót 9 dòng chỉ-nữ**: Bông tai · Khăn · Quần lót · Giày sandals · Giày boots · Túi xách tay ·
  Túi đeo vai · Vòng cổ choker · Áo kiểu.
- **Bỏ sót 9 dòng chỉ-nam**: cả cụm giày tây/moccasins (Giày oxfords · derby · monk straps · drivers ·
  moccasins) · Túi đựng tài liệu · Túi đeo hông · Dụng cụ đón gót giày · Dụng cụ chăm sóc sản phẩm.

**Size theo gender** (sheet `Size`) — nhóm "Quần áo" cả 2 giới cùng `XXS…XXL`, chỉ nhóm "Khác" lệch:

| | Nhóm "Khác" |
|---|---|
| NAM | nhẫn `15 · 17 · 19 · 21` + thắt lưng `80 → 115` (12 chip) |
| NỮ | nhẫn `11 · 13 · 15 · 17` + thắt lưng/phụ kiện `38 → 100` (19 chip) |
| không có giới tính | hợp của cả hai (24 chip) |

Mức chữ `S/M/L` của nón & vòng tay **không** lặp xuống nhóm "Khác" — để 2 nơi là 2 chip cùng
`data-size`, tick 1 ô sáng cả 2.

> Sheet `Price` (4 mức: Dưới 10M · 10M-20M · 20M-40M · Trên 40M) **vẫn chưa dùng** — mục Khoảng giá
> của demo đang là thanh trượt + 2 ô nhập. Đổi sang 4 chip khoảng giá là một quyết định UI, chờ khách.

---

## 1 · Bảng màu: 7 ô → **15 ô** (đúng bảng khách chốt 26/08)

> *"Bộ lọc màu sắc hiện chưa đủ 15 màu — cần bổ sung đầy đủ để xem bao quát"*
> Khách gửi bảng: Black · White · Gold · Silver · Blue · Brown · Green · Red · Pink · Purple ·
> Yellow · Orange · Beige · Grey · Multi-colour — *"bạn có thể tự chấm màu tương đối là được"*.

**Tên bám đúng bảng khách, hex do mình chấm** (tên tiếng Việt chốt lại ở mục 0 theo sheet `Color`). Vì bảng chỉ có `Blue` nên **ô "Navy" đã bỏ**
(màu xanh đậm nay quy về Xanh dương), và có thêm **ô "Nhiều màu"**. Thứ tự xếp theo NHÓM để mắt
quét được, không theo thứ tự trong bảng:

| Nhóm | Ô |
|---|---|
| Trung tính | Đen · Trắng · Xám · **Bạc** |
| Nâu / kim | **Kem** (Beige) · Nâu · **Vàng đồng** (Gold) |
| Nóng | Đỏ · **Hồng** · **Cam** · **Vàng** |
| Lạnh | **Xanh lá** · **Xanh dương** · **Tím** |
| Đặc biệt | **Nhiều màu** (Multi-colour) |

**Ô "Nhiều màu" (Multi-colour)** không có hex nào đại diện nên:
- swatch là vòng **conic-gradient** 5 màu (không phải ô màu phẳng);
- nó **không tham gia** thuật toán quy màu theo HSL — lọc bằng cờ `multi` khai trên sản phẩm
  (hàng in hoạ tiết đa sắc). Demo: 2 món **Broken Jewels** (đầm + khăn lụa) mang cờ này.
  Lưu ý phân biệt với "SP có nhiều swatch": túi Emblème bán 2 phiên bản Verde Menta / Rosa nhưng
  mỗi phiên bản là một màu → **không** phải Nhiều màu.
- Tick "Nhiều màu" cùng ô màu khác vẫn là phép HỢP: `Đen hoặc Nhiều màu` → 8 SP (6 + 2).

**Layout đổi theo:** `flex-wrap` (ô cứng 64px) → **lưới 4 cột** (ô 79,8px, gap 8) — 15 ô rơi
đúng 4 hàng `4/4/4/3`, và ô 80px mới đủ cho nhãn dài nhất "Xanh dương" ở 12px (đo: 0 nhãn bị
cắt). Lưới 5 cột như panel Kích thước thì nhãn đó bị cắt.

**Kéo theo — quy đổi màu sản phẩm về ô lọc đã đúng hơn** (`colorBucketOf()` chấm theo HSL):

| Màu thật của SP | Trước | Nay |
|---|---|---|
| `#a5d48c` Broken Jewels | *không ô nào nhận* | Xanh lá |
| `#b9dfc6` Verde Menta | *không ô nào nhận* | Xanh lá |
| `#f5d6e0` Rosa | Kem (Beige) ❌ sai sắc | Hồng |
| `#c9a94b` Oro · `#8a7040` Nero Oro | Nâu / Vàng | Vàng đồng |
| `#a06a3f` Cuoio · `#0a0a0a` Nero · `#f1f1f1` Bianco | Nâu · Đen · Trắng | *giữ nguyên* |

> **Đã phải chỉnh thuật toán chấm màu**: ô `Cam` mới (#e0762d, hue 24,5°) gần như trùng hue với
> màu da bò `#a06a3f` Cuoio (26,6°) — hai thứ chỉ khác nhau ở chỗ cam thì **rực** còn da bò thì
> **đục**. Nên `colorBucketOf()` nay cộng thêm **phạt theo độ no**, không chỉ hue + độ sáng; nếu
> thiếu, túi Cuoio bị xếp vào "Cam".

Kiểm chứng: 13/13 ô đơn sắc tự nhận đúng hex của chính nó; đếm SP theo từng ô ở PLP thời trang
ra `Đen 6 · Trắng 1 · Nâu 1 · Vàng đồng 2 · Hồng 1 · Xanh lá 3 · Nhiều màu 2`, các ô còn lại 0 (demo chỉ
có 10 SP thời trang).

**Layout:** 15 ô ra 4 hàng `4/4/4/3`, không nhãn nào bị cắt.

---

## 2 · Size: trả lại nhóm **Quần áo XXS → XXL**

> *"Size hiện thiếu bộ lọc cho Quần áo — cần bổ sung đầy đủ các mức size theo chuẩn từ XXS đến XXL"*

Panel Kích thước nay **3 nhóm đóng/mở**: `Giày dép` (mở sẵn, 3 tab đơn vị IT/EU · US · UK) →
`Quần áo` → `Khác`.

- `Quần áo` = `XXS · XS · S · M · L · XL · XXL` (7 chip).
- 4 mức chữ `XS · S · M · L` trước nằm trong nhóm "Khác" đã **dọn hết về Quần áo**: để cả 2 nơi
  là có 2 chip cùng `data-size` (`Size XS`), tick 1 ô thì ô kia cũng sáng lúc đồng bộ DOM —
  nhìn như lỗi.
- `Khác` giờ thuần size **số** (nhẫn · vòng · thắt lưng) đúng như sheet.

> Nhóm này từng bị bỏ ngày 20/08 theo yêu cầu trước đó của bên mình ("bỏ cate trang phục ra") —
> nay khách yêu cầu ngược lại nên trả về. Ghi ra đây để lần sau không ai gỡ lại lần nữa.

---

## 3 · Thêm mục **Độ cao giày** (chỉ giày nữ)

> *"Giày dép Nữ đang thiếu bộ lọc Độ cao giày (heel height)"*

3 mức lấy **nguyên bảng khách gửi**, nhãn EN theo đúng cột English của bảng:

| Nhãn VI | Nhãn EN | Khoảng |
|---|---|---|
| Thấp (0 - 5.5 cm) | Low (0 - 5.5 cm) | 0 → 5,5 |
| Trung bình (6 - 8.5 cm) | Medium (6 - 8.5 cm) | 6 → 8,5 |
| Cao (trên 9 cm) | High (from 9 cm) | từ 9 |

- **Là MỤC LỚN, cùng cấp với Kích thước** (user chốt 26/08 chiều: *"nó cùng level của Kích thước
  luôn, nhưng nằm vị trí dưới Kích thước và trên Khoảng giá"*), đặt đúng giữa hai mục đó:
  `Danh mục · Thương hiệu · Màu sắc · Kích thước · **Độ cao giày** · Khoảng giá · Ưu đãi · Khác`.
  Đi qua `fSection()` như mọi mục khác nên tiêu đề đo ra `12/16 · 500 · hoa`, hàng tiêu đề cao 72,
  đóng sẵn khi mở panel, nhịp kẻ đều — **khớp 100% mục Kích thước**, không có gì riêng lẻ.
  > Giữa lượt mình có dựng thử thành khối trần (không đóng/mở) vì hiểu sai chữ "ngoài mục lớn" —
  > đã bỏ hẳn, chỉ còn lại một dòng comment ghi vết trong code.
- **Điều kiện hiện — CHỐT CUỐI 26/08 chiều**: *"nó sẽ áp dụng luôn khi user chuyển qua Trang chủ
  nữ chứ không phải khi bấm vào Nữ > Giày mới hiện"* → điều kiện duy nhất là **ngữ cảnh giới tính
  NỮ**, không còn ràng theo nhánh Giày dép:

  | PLP | Mục Độ cao giày |
  |---|---|
  | Trang chủ nữ · Nữ › Giày dép · Nữ › Túi xách · Nữ › Quần áo … | **hiện** |
  | Trang chủ nam và mọi PLP nam | không dựng |
  | PLP làm đẹp | không dựng |
  | PLP thương hiệu / tìm kiếm (không mang giới tính) | không dựng |

  Kéo theo, đã **gỡ hẳn** cơ chế ẩn/hiện theo ô "Giày dép" tick trong panel cùng mọi thứ chỉ tồn
  tại để phục vụ nó (`syncHeelSection`, `plpHeelFacet`, `SHOE_BRANCH_LABELS`, `data-cat-name`) —
  mục này giờ dựng là hiện, không còn trạng thái ẩn nào. Nhãn đã áp bị dọn khi rời ngữ cảnh nữ.
- **Sửa kèm ở menu**: hàng *"Trang chủ nam / nữ"* trước đây **không** đẩy `crumbs` (chỉ "Trang chủ
  làm đẹp" có), nên bấm vào ra PLP chế độ `brand` — PLP đó không mang giới tính nào, tức bộ lọc
  hiện cây ĐỦ và không có mục Độ cao giày. Nay mọi ngành đều đẩy `crumbs=[dept]` ở cả drawer mobile
  lẫn drawer desktop (hàng dept trên thanh nav desktop vốn đã làm vậy).
  > ⚠ Đổi lại: PLP "Trang chủ nữ/nam" giờ là chế độ **category** (breadcrumb `Trang chủ · Nữ` +
  > tiêu đề "Trang chủ nữ") thay vì PLP thương hiệu có hero — đúng cách "Trang chủ làm đẹp" vẫn
  > chạy từ trước. Nếu muốn giữ hero cho 2 ngành này thì phải mang giới tính bằng đường khác.
- Khuôn hàng lựa chọn giữ đúng khuôn mục Ưu đãi — đo ra `12/18 · 500`, không phát sinh cỡ chữ mới.
- **Lọc thật, không phải facet trang trí**: `PRODUCTS` nay mang `heel` (cm) cho 2 đôi đã có số
  liệu trong bảng thông số PDP — Gianni 9 cm, Manu 1,5 cm. Đo: `Cao` → Gianni · `Thấp` → Manu ·
  `Trung bình` → 0 SP (demo không có đôi nào 6–8,5).

**Biên khoảng — khách chốt "theo sát bảng gửi"**, nên giữ nguyên **khe hở** `5,5–6` và `8,5–9`:
gót 5,7 cm hay 8,7 cm không thuộc mức nào. Chỉ một chỗ mình phải tự quyết vì bảng không nói:
**mốc đúng 9 cm tính vào mức "Cao"** (bảng ghi "Trên 9 cm" nhưng 9 phải thuộc một mức nào đó —
và đôi Gianni 90 trong demo đúng 9 cm). Nói một tiếng nếu muốn 9 cm rơi về "Trung bình".

---

## 4 · Tách cây danh mục theo **giới tính**

> *"Nam-Nữ hiện dùng chung bộ Listing – Filter → cần thiết kế riêng cho từng gender để tiện check
> logic. Ví dụ: Nam không nên có váy đầm, áo hai dây."*

Giới tính đọc từ **breadcrumb PLP** (`crumbs[0]` = Nam / Nữ / Làm đẹp) — đúng chỗ mà bộ lọc đang
đọc để biết ngành hàng. PLP thương hiệu / tìm kiếm / thẻ danh mục trang chủ không có dept →
**hiện cây đủ**, không đoán giới tính.

Số nhánh đo được sau khi lọc: **PLP nữ 168** · **PLP nam 147** · **cây đủ 173**.

⚠️ **Sheet Excel gốc không có cột gender**, nên bảng dưới là **bảng đề xuất** mình dựng từ cây menu
Nam/Nữ của `shop.dafc.com.vn` + phân loại thông thường của PLP thời trang. **Cần khách xác nhận
từng dòng** trước khi đưa vào spec bàn giao.

**Chỉ hiện ở PLP Nữ** (ẩn khỏi Nam):

| Ngành | Nhánh |
|---|---|
| Quần áo | Áo lót · Áo lót thun · Áo ngực thể thao · Quần leggings · Áo choàng không tay |
| Quần áo (cả cụm) | **Chân váy** (Váy ngắn · Váy midi) · **Đầm & áo liền quần** (Đầm ngắn · Đầm dài · Áo liền quần) · **Áo dây & croptops** (Áo hai dây · Áo croptop · Áo corset · Áo thun ba lỗ · Bodysuit) |
| Giày dép | Giày cao gót · Giày hở gót · Giày bệt · Giày đế xuồng |
| Phụ kiện | Kẹp tóc · Cài tóc |

**Chỉ hiện ở PLP Nam** (ẩn khỏi Nữ):
Quần lót nam boxer · Quần lót nam tam giác · Khuy măng sét · Kẹp cà vạt · Cà vạt

**Không ghi ở bảng nào = unisex**, hiện ở cả 2 giới: Túi xách · Trang sức · Đồng hồ · Mắt kính ·
Thắt lưng · Giày tây & monk straps · Giày moccasins · Giày thể thao · Giày boots · Đồ bơi ·
Bộ âu phục · Ví cầm tay · Kẹp tiền mặt · Phụ kiện văn phòng…

**3 dòng mình đoán, xin khách xác nhận:**
1. **Áo thun ba lỗ** (tank top) nằm trong cụm "Áo dây & croptops" nên bị ẩn khỏi Nam theo cả cụm.
   Nếu khách muốn nam vẫn có áo ba lỗ thì tách riêng dòng đó (1 dòng data).
2. **Ví cầm tay / clutch** và **Kẹp tiền mặt** đang để unisex — hàng nam luxury vẫn có clutch;
   khách muốn coi là hàng nữ thì thêm vào bảng.
3. **Giày tây & monk straps** (oxfords · derby · monk) để unisex — Farfetch/Mytheresa đều có mục
   này ở bên nữ.

**Kéo theo (đã xử):** tick danh mục nay **sống đúng phạm vi** — tick "Đầm dài" ở PLP nữ rồi sang
PLP nữ khác thì còn, sang PLP nam thì rụng (trước đây mọi tick danh mục đều bị dọn sạch khi điều
hướng, kể cả trong cùng một PLP).

---

## 5 · Bỏ dấu **+** khi sub-cate chỉ có 1 product type trùng tên nó

> *"Khi một subcate chỉ có duy nhất một product type trùng tên với chính nó, hệ thống không hiển
> thị '+' để thêm lựa chọn, dẫn đến trùng lặp giá trị trong bộ lọc."*

Sheet có ~15 dòng kiểu `Túi xách tay > Túi xách tay`, `Nhẫn > Nhẫn`, `Balo > Balo`, `Dép > Dép`,
`Khăn > Khăn`, `Thắt lưng > Thắt lưng`, `Giày thể thao > Giày thể thao`, `Giày boots > Giày boots`,
`Phiếu quà tặng > Phiếu quà tặng`… — mở "+" ra chỉ thấy lại đúng cái tên vừa bấm.

Nay các nhánh đó **thành dòng lá**: không dấu +, không cấp 3, nhãn lọc chỉ còn một.

**Giữ nguyên "+"** cho nhánh **nhiều con** dù có 1 con trùng tên cha — `Túi tote > Túi tote · Túi
shopper`, `Vòng cổ > Vòng cổ · Vòng cổ choker`, `Nón > Nón · Nón lưỡi trai`, `Ví cầm tay > Ví nhỏ ·
Ví cầm tay`, `Giày sandals > Giày sandals · Giày đế xuồng`, `Đồng hồ > 4 loại`… Bỏ con trùng tên đi
là mất lối chọn riêng "chỉ tote" / "chỉ vòng cổ trơn".

**Khách chốt 26/08:** *"Ẩn mục con nếu trùng tên và chỉ có 1 loại"* → đúng cách đang làm. Ẩn con
**chỉ khi** hội đủ 2 điều kiện: trùng tên cha **và** là loại duy nhất. Nhánh nhiều loại thì giữ
nguyên cả cha lẫn con trùng tên — cha = "tất cả tote", con = "đúng loại tote", 2 tập khác nhau khi
lọc.

---

## Ngoài 5 điểm: 1 lỗi có sẵn đã vá cùng lượt

`pruneFilters()` gọi tới biến `FILTER_SIZES` **không tồn tại trong file** → hễ đã áp bộ lọc rồi
điều hướng sang PLP thời trang là `ReferenceError`, đứt luôn `goPlp()` (điều hướng chết giữa
đường). Nay dùng `FILTER_SIZE_LABELS` sinh tự động từ chính data size + 3 đơn vị giày, nên thêm
size mới không phải nhớ cập nhật 2 chỗ.

---

## Việc còn mở

| # | Việc | Chờ ai | Trạng thái |
|---|---|---|---|
| 1 | Port 5 thay đổi sang `desktop.html` + 3 bản thử skin | mình | ✅ xong 26/08 — xem bảng lệch bên dưới |
| 2 | Bảng 15 màu | khách | ✅ chốt 26/08 (bảng EN 15 màu, mình tự chấm hex) — tên tiếng Việt nay lấy đúng sheet `Color`: Vàng đồng · Kem · Nhiều màu |
| 3 | Bảng gender | khách | ✅ **xong 26/08 chiều** — khách gửi file Excel có cột Note + 2 cây riêng, đã áp cả 5 file (xem mục 0) |
| 4 | Biên khoảng độ cao giày | khách | ✅ chốt "theo sát bảng gửi" (giữ khe hở; mốc 9 cm → mức Cao, mình tự quyết) |
| 5 | "Độ cao giày" hiện ở đâu | khách | ✅ chốt cuối: **mọi PLP ngữ cảnh nữ** (kể cả Trang chủ nữ), không ràng theo nhánh Giày dép. Hình thức: **mục lớn cùng cấp Kích thước**, vị trí giữa Kích thước và Khoảng giá |
| 6 | Trùng tên cha–con | khách | ✅ chốt "ẩn mục con nếu trùng tên và chỉ có 1 loại" |
| 7 | Bảng size giày 3 đơn vị vẫn là **dãy demo tự dựng** (sheet `Size` vẫn chỉ ghi "hệ IT", để trống giá trị) — cần bảng quy đổi chính thức | khách | mở |
| 10 | Sheet `Price` 4 mức (Dưới 10M → Trên 40M) chưa dùng — Khoảng giá hiện là thanh trượt | khách | mở |
| 8 | Cờ `multi` (ô Đa sắc) hiện chỉ gắn cho 2 món Broken Jewels trong demo — hàng thật cần attribute Multi-colour từ Magento | khách | mở |
| 9 | Đồng bộ nguyên khối bộ lọc cho 3 bản thử skin (cây 3 tầng + nhóm size/tab đơn vị + Ưu đãi mọi ngành + mục đóng sẵn) | mình — cần bên mình gật | mở |

### 3 chỗ 3 bản thử skin còn lệch `index` / `desktop` (có chủ ý)

| Chỗ | `index` + `desktop` | 3 bản thử skin |
|---|---|---|
| Panel Kích thước | 3 nhóm đóng/mở: Giày dép (3 tab IT/EU · US · UK) · Quần áo · Khác | **1 lưới phẳng** `XXS…XXL` + `39…55` — nền này chưa có cơ chế nhóm/tab của 20/08 |
| Cây Danh mục | cây 3 tầng từ Excel (8/57/172) → gender lọc **nữ 168 / nam 147** nhánh | cây **2 tầng bản cũ** → bảng gender khai y hệt nhưng ẩn được ít nhánh hơn |
| Ưu đãi / trạng thái mục | Ưu đãi ở **mọi** ngành, mọi mục **đóng** sẵn | Ưu đãi chỉ ở beauty, mọi mục **mở** sẵn (nền trước 19/08) |

Nhân lượt port, vá 2 lỗi của nền cũ trong 3 file đó (thiếu là feedback lần này không chạy được):
`fSection()` chưa có `data-facc` (không có mốc để ẩn/hiện mục Độ cao giày), và chip size để
`data-size` rỗng nên **mọi tick size bị `pruneFilters` dọn sạch** lúc điều hướng (nhãn sinh ra là
`39` còn `facetLabelsFor` sinh `Size 39`).

---

## Vá thêm 26/08 chiều: dịch ngược nhãn "Độ cao giày"

`I18N_REV` sinh bằng cách **đảo** `I18N`, nên hai key khác nhau mà cùng giá trị EN thì key khai SAU
thắng ở chiều EN→VI. Ở đây có đúng cặp đó: `Chiều cao gót giày` (thông số PDP) và `Độ cao giày`
(nhãn bộ lọc, bảng khách) đều ra `Heel height` — mà cặp bộ lọc lại đang khai TRƯỚC, nên đổi sang
English rồi quay về tiếng Việt thì nhãn khối lọc biến thành "Chiều cao gót giày".

Đã chuyển cặp bộ lọc xuống **sau** cặp PDP ở cả 5 file. Đo lại vòng VI→EN→VI: `Độ cao giày` →
`Heel height` → `Độ cao giày`. Đổi lại, bảng thông số PDP khi dịch ngược cũng đọc là "Độ cao giày" —
cùng nghĩa, và đúng kiểu đụng độ đã ghi nhận sẵn trong file ở cặp `Kích thước` / `Dimensions`.
