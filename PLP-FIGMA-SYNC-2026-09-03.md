# PLP — đồng bộ NGƯỢC Figma → code, 03/09/2026

> Lệnh user: *"[link node 115-5835] hãy update chuẩn chỉnh các trang PLP mà đã chốt ở trên code nhé"*
>
> Nguồn chốt: Figma `Test agent` → page `screens` → section **`PLP — trạng thái & biến thể`**
> (`115:5835`, 17 khung + 3 khối [doc]).
> Đích: `index.html` (mobile 375) · `desktop.html` (1440) · 3 bản fork skin.

---

## 1 · Figma đã đổi gì kể từ đợt dựng 29/08

Section này do mình dựng ngày 29/08 (xem `FIGMA-PDP-PLP.md` Phần 12) và lúc đó **thẻ sản
phẩm còn raw, 6 nhóm nút còn raw vì lệch thang DS** — 5 việc treo chờ chốt. Đo lại hôm nay
thì section đã được ráp tiếp: xuất hiện **component mới** và các nút raw **đã thay bằng
`action`**. Đó chính là phần "đã chốt ở trên" mà lệnh nói tới.

| Thứ mới trong Figma | Ý nghĩa với code |
|---|---|
| `action` có thêm property **`showRightIcon` / `rightIcon`** (`139:0`, `139:101`) | slot icon ĐUÔI — việc chờ chốt số 4 đã xong; nút Sắp xếp nay hợp lệ là `ghost/small` |
| Component **`Breadcrumb`** (`135:6239`) ráp vào **cả PLP lẫn PDP, cả 2 khổ** | breadcrumb thành một khuôn dùng chung, có bộ số riêng |
| `filter-bar/platform=mobile` nay **375×97, HAI hàng** (trước là 52, một hàng) | hàng "N sản phẩm" + đổi mật độ **nhập vào thanh lọc** |
| Mọi instance `btn/filter`, `Xem thêm`, `Xóa tất cả bộ lọc` mang **viền `#0a0a0a`** | chốt việc treo số 1: outline lấy `border-strong`, KHÔNG phải `#dfdfdf` của demo |
| `btn/filter` đè nhãn về **14/20** (master `outline/small` là 12/16) | chốt việc treo số 2: giữ 14/20 ở bậc h36, không hạ về 12/16 |
| Nút *Xem thêm* mobile nay là **`action outline/large` 120×48** | chốt việc treo số 3: bỏ bậc h44 ngoài thang |
| `filter-cat-chip`, `product-item-info(-desktop)`, `fi-ts-*`/`fi-tr-*` icon set được ráp vào 17 khung | phần lớn là **tài liệu hoá**, xem mục 4 |

---

## 2 · Sáu thay đổi ĐÃ ÁP (đo trên trang chạy, trước → sau)

Mọi số "sau" là computed style đo lại sau khi sửa, bộ da vào-trang `skin-mt skin-li`.

### 2.1 Breadcrumb — `Breadcrumb 135:6239` · **cả 5 file**

| | trước | sau | Figma |
|---|---|---|---|
| khối mobile | **52** (hộp `py-2` + hàng 36) | **36** | 375×36 |
| khối desktop | 40 | 40 | 1440×40 |
| chữ | 12/**18** (markup ghi 14/20, `skin-mt` gộp về 12/18) | **12/16** | 12/16 |
| các đoạn TRƯỚC | mobile #666666 · desktop **#333333** | **#666666** cả 2 khổ | #737373 (token `muted-foreground`) |
| đoạn **CUỐI** | cùng màu mờ | **#0a0a0a** | #0a0a0a |

⚠ Điểm này **đảo một chốt cũ**: 17/08/2026 user cho nâng breadcrumb desktop từ
`muted-foreground` lên `secondary-foreground` để dễ đọc hơn. Nay Figma trả về mực mờ —
đổi được vì đã có **đoạn cuối màu đậm** gánh phần "đang đứng ở đâu". Nếu không thích thì
đây là một chữ đổi ngược lại.

`dkCrumbs()` dùng chung PLP + PDP, và Figma cũng vậy: 3 khung PDP desktop
(`PDP / desktop 1440`, `· 28-08`, `· 28-08 · look B`) đều mang đúng bộ số này —
*Trang chủ #737373 · Versace #737373 · tên SP #0a0a0a*. Đã kiểm PDP sau khi sửa: khớp.

### 2.2 Thanh lọc mobile — `filter-bar/platform=mobile` 375×97 · **`index.html`**

Trước: **hai khối rời** — hàng đếm cao 48 (không dính, cuộn là trôi mất nút đổi mật độ
lưới) rồi mới tới thanh lọc dính cao 52.
Sau: **một tấm dính duy nhất**, đệm `8/8/8/16`, khe 8, hai hàng 36 →
`8 + 36 + 8 + 36 + 8 + kẻ 1 = 97`.

```
hàng trên : "N sản phẩm" (12/16)          ·  [lưới 2 cột] [lưới 1 cột]
hàng dưới : [Bộ lọc]                      ·  Sắp xếp ⌄
```

Đo sau khi sửa: thanh 375×96 + hairline `.filterbar::after` 1px = **97** · hai hàng
351×36 · đệm `8px 8px 8px 16px` · khe 8. Khớp Figma từng px.

### 2.3 Nút "Bộ lọc" — `action outline/small` · **cả 5 file**

| | trước | sau | Figma |
|---|---|---|---|
| đệm ngang | 16 | **12** | 12 |
| viền | `border` **#dfdfdf** | `border-primary` **#0a0a0a** | #0a0a0a |
| nhãn | 14/20 (markup `font-medium`, skin ép 400) | 14/20 · 400 (bỏ hẳn `font-medium`) | 14/20 Regular |
| bề rộng đo được | 102,3×36 | **94,3×36** | 94×36 |

Bỏ `font-medium` không đổi hình: `skin-li` vốn đã ép 400 (luật §"500 luôn đi cặp với
UPPERCASE"). Gỡ ở markup để bộ da mặc định không còn nói ngược DS.

### 2.4 Nút "Sắp xếp" — `action ghost/small` · **cả 5 file**

| | trước | sau | Figma |
|---|---|---|---|
| đệm ngang | 16 | **12** | 12 |
| khe chữ↔chevron (mobile) | 6 | **8** | 8 |
| nhãn | 12/**18** | **12/16** | 12/16 |
| mực | `foreground-alt` **#333333** | `foreground` **#0a0a0a** | #0a0a0a |
| bề rộng đo được | 101,6×36 | **95,6×36** | 97×36 |

12/16 là vai *"chữ chắc chắn một dòng"* của bảng chuẩn `FONT-LIBRE-INTER.md` 13.1 —
Figma và bảng font nói cùng một số, không phải hai nguồn chọi nhau.

### 2.5 Nút "Xem thêm" — `action outline/large` 120×48

| | trước | sau | Figma |
|---|---|---|---|
| **mobile** | 127,3×**44** · đệm 32 · nhãn **12/18 semibold** | **112,8×48** · đệm **20** · **14/20 · 400** + class `btn-o` | 120×48 · đệm 20 · 14/20 |
| **desktop + 3 fork** | 120,8×48 · đệm **24** · viền **#dfdfdf** | 120,8×48 · đệm **20** · viền **#0a0a0a** | như trên |

Bậc h44 của bản mobile **không có trong thang DS** (36/40/48) — đây đúng là việc chờ chốt
số 8 của `PLP-RASOAT-2026-08-28.md`. Nút cũng thiếu class `btn-o` nên nhãn rơi khỏi luật
13.13 xuống 12/18; thêm `btn-o` là về đúng 14/20.
Khung bọc `py-6` giữ nguyên → khối `24 + 48 + 24 = 96`, khớp `Frame 5` 375×96 của Figma.

### 2.6 Nút "Xóa tất cả bộ lọc" (màn 0-kết-quả) · **cả 5 file**

`h36 · đệm 16 · viền #dfdfdf · 14/20 medium` → **`h48 · đệm 20 · viền #0a0a0a · 14/20 · 400`**.
Đo được **161,4×48** — khớp đúng instance `action` **161×48** trong khung
`PLP / mobile · 0 kết quả`. Khối rỗng bọc ngoài (`py-14 px-4 gap-3` = đệm 56/16, khe 12)
vốn đã khớp Figma, không đụng.

---

## 3 · Phạm vi file

| File | Áp | Ghi chú |
|---|---|---|
| `index.html` | 2.1 · 2.2 · 2.3 · 2.4 · 2.5 · 2.6 | 2 bản PLP (danh mục/tìm kiếm + thương hiệu) đều sửa |
| `desktop.html` | 2.1 · 2.3 · 2.4 · 2.5 · 2.6 | 2.2 là việc riêng của mobile |
| `desktop-neutral` · `-editorial` · `-atelier` | 2.1 · 2.3 · 2.4 · 2.5 · 2.6 | 3 fork vốn đóng băng từ 21/08; 5 chỗ này là một dòng mỗi chỗ nên port luôn cho khỏi lệch thêm |

Riêng breadcrumb của `desktop-neutral` và `-editorial` còn đang ở bản **trước 17/08**
(`h-9` + `muted-foreground`) — nay kéo cả hai lên cùng một khuôn `h-10 · 12/16`.

**Kiểm sau khi sửa:** cả 5 file mở được, `#plpGrid` dựng, **console sạch (0 lỗi)**;
breadcrumb PDP desktop cũng đã kiểm (dùng chung `dkCrumbs`) — 3 đoạn ra đúng
mờ · mờ · đậm.

---

## 4 · NĂM chỗ Figma lệch code mà **CỐ Ý KHÔNG ÁP** — cần user chốt

Đây là phần phải nói rõ: không phải mọi số trong section đều là quyết định thiết kế. Bốn
trong năm chỗ dưới đây sinh ra từ **một nguyên nhân duy nhất** — đợt ráp đã thay thẻ raw
bằng instance `product-item-info` **dựng ngày 26/08 và chưa cập nhật từ đó**.

**Bằng chứng component đã cũ:** variant `kind=pre-order` của nó vẫn vẽ badge **ĐÈ LÊN ẢNH** —
đúng cách làm trước 27/08. Mà 27/08 user đã chốt *"badge nằm chung 1 hàng với tên"*, và
code đã theo từ hôm đó. Thẻ trong Figma còn giữ được đúng hình chỉ vì mấy nhãn
`badge-label` được để **rời, đè lên trên** instance (thấy rõ ở khung desktop: 3 node
`badge-label` mồ côi nằm cuối `#plpGrid`). Nên mọi số đo *đến từ thẻ* đều thừa hưởng cái cũ đó.

| # | Chỗ lệch | Code | Figma | Vì sao chưa áp / đề xuất |
|---|---|---|---|---|
| 1 | **Chiều cao thẻ SP** | 374 | 366 | `name-block` và `price-box` trong component còn đệm dưới **4**, code là **8**. Là component cũ, không phải chốt mới. **Đề xuất: giữ code, cập nhật component.** |
| 2 | **Khe dọc lưới mobile** | `row-gap 24` | **8** | Đây là chỗ DUY NHẤT không giải thích được bằng thẻ cũ — 4/4 khung lưới mobile đều để 8, trong khi desktop để 16 và **khớp code**. Nhưng khe 8 trong Figma đang đi cùng thẻ 366; ghép khe 8 với thẻ THẬT 374 thì lưới chặt hơn hẳn cái đang thấy trong Figma. **Cần user gật trước khi đổi** — đây là thay đổi nhìn thấy rõ nhất trong cả đợt. |
| 3 | **Nút đổi mật độ lưới (desktop)** | 36×36 | 40×40 (`action ghost/icon`) | Figma tự mâu thuẫn: desktop dùng bậc `size=icon` 40 nhưng **mobile vẫn để 36**, và khung bọc `view-toggle` vẫn cao 36 nên hai nút 40 tràn ra ngoài. Đổi một bên thành 40 là làm 2 khổ lệch nhau. **Đề xuất: giữ 36, hoặc chốt 40 cho CẢ HAI.** |
| 4 | **Chip danh mục desktop** | h36 | h34 | 34 = 8+18+8, tức chiều cao *hug* của component chứ không phải một bậc. Lệch 2px. **Đề xuất: bỏ qua.** |
| 5 | **Tiêu đề khối 0-kết-quả (mobile)** | 12/18 | 12/16 | Câu này **xuống dòng được** nên theo 13.1 phải là 12/18; Figma đo bản một dòng. **Đề xuất: giữ code** (bảng font thắng). |

> **CẬP NHẬT cuối 03/09 — #3 và #4 đã có đáp.** User chốt: *"5 khung cũ có filterbar đang là
> component đúng"*. Vậy `filter-bar` là bên chuẩn ⇒ **nút đổi mật độ lưới desktop phải lên
> 40×40** và **chip danh mục xuống h34**, tức đây là **việc sửa ở CODE**, không còn là lệch chờ
> chốt. Chưa sửa trong đợt này (lệnh chỉ nói về Figma) — xem mục 6.3.

Ngoài ra 2 chỗ **Figma tự nhận là lệch, không phải việc của code**: tấm hover thẻ desktop
không có `backdrop-blur` (Figma chỉ dựng được độ đục) và ảnh hero thương hiệu bị cắt giữa
thay vì theo mốc `object-position: 50% 18%`.

---

## 5 · Việc treo vẫn còn (không sinh ra từ đợt này)

- Khung **`PLP / desktop · đang lọc`** trong Figma nay **không còn ở trạng thái đang lọc**:
  có hero thương hiệu, 16 thẻ, tiến độ *"16 trong 152"*, và **không còn dải chip bộ lọc
  đang áp**. Nên đợt này **không có spec mới cho `af-chip`** — hàng chip trong code giữ nguyên.
- `filter-size-chip` vẫn mang tiền tố `filter-` dù nay phục vụ cả chọn size sản phẩm
  (đổi tên thành `size-chip` hay tách 2 component — theo `NAMING-MAGENTO.md`).
- 3 việc chờ chốt cũ của `PLP-RASOAT-2026-08-28.md` mục 6 chưa được Figma trả lời:
  khối cam kết ở PLP desktop (#1) · nút "Đặt lại" khi chưa Áp dụng (#2) · chỉ báo bộ lọc
  đang áp ở mobile (#3 — thanh lọc mobile mới **vẫn không có** "(N)" hay hàng chip).

---

## 6 · Dựng lại 5 màn desktop vào Figma (cùng ngày, lệnh thứ hai)

> Lệnh user: *"vẽ lại các màn bản desktop đúng theo code nhé, có thể chỉnh sửa frame có sẵn
> của tôi hoặc tạo mới"*

### 6.1 Chọn "tạo mới", không đè lên khung cũ

Dựng **một hàng MỚI** ngay dưới hàng desktop cũ trong cùng section, hậu tố `· 03-09`
(x giữ đúng 5 mốc của hàng cũ · y 19700):

| Khung mới | Khổ | Trạng thái dựng |
|---|---|---|
| `PLP / desktop · danh mục · 03-09` | 1440×**6977** | `goPlp` type=category, "Túi xách" — **40 SP** |
| `PLP / desktop · đang lọc · 03-09` | 1440×**1891** | lọc Đen + Đang giảm giá → "Bộ lọc (2)" + hàng chip + *đã xem 3 trong 3* |
| `PLP / desktop · 0 kết quả · 03-09` | 1440×**1355** | lọc Trắng + Đang giảm giá — ẩn CẢ tiến độ LẪN Xem thêm |
| `PLP / desktop · làm đẹp · 03-09` | 1440×**2107** | ngành Làm đẹp, 8 SP |
| `PLP / desktop · tìm kiếm · 03-09` | 1440×**2155** | tìm "túi" → 7 SP |

Vì sao không đè: 5 khung cũ đang mang **~60 instance** do user tự ráp. Dựng lại tại chỗ là
xoá sạch phần đó. Hàng mới để đối chiếu; xoá 5 khung cũ được sau khi duyệt.

**Dữ liệu đã đổi kể từ 29/08** nên 2 khung không còn cùng số: danh mục 16 SP → **40**
(khung 3343 → 6977) và tìm kiếm 4 → **7 kết quả**. Đây là hệ quả của đợt data D&G +
Zimmermann 02/09, không phải lệch dựng.

### 6.2 Kết quả đo

Nguồn: `desktop.html` @1440 (ép ẩn scrollbar để `clientWidth` ra đúng 1440), bộ da vào-trang
`skin-mt skin-li`, sau khi code đã áp mục 2 ở trên.

| Hạng mục | Số đo trong 5 khung mới |
|---|---|
| Breadcrumb | hàng 40 · **12/16** · đoạn trước `#666666` · đoạn cuối **`#0a0a0a`** |
| Nút Bộ lọc | 94,3×36 (119 khi là "Bộ lọc (2)") · đệm 12 + kẻ 1 · viền **`#0a0a0a`** |
| Nút Sắp xếp | 95,6×36 · đệm 12 · nhãn **12/16** `#0a0a0a` |
| Xem thêm | 112,8×**48** · đệm 20 + kẻ 1 · viền `#0a0a0a` |
| Xóa tất cả bộ lọc | 161,4×**48** · đệm 20 · viền `#0a0a0a` |
| Lưới | 1392 · khe 4/16 · thẻ 345×590 (thẻ làm đẹp 566 — không có hàng ô màu) |
| Thanh tiến độ | 84 · đệm trên 40 |

**Chất lượng bản dựng:** gắn text style **563/563** mực chữ · **0** chuỗi raw · **0** icon rỗng
· **0** ảnh nạp lỗi · mực chữ và kẻ **bind biến 100%**. Nền còn raw đúng 3 nhóm ngoại lệ đã
ghi danh: chip `-%` `#fef2f2` · ô màu sản phẩm (mã màu thật của hàng) · `#f1f1f1` nướng sẵn
trong ảnh CDN.

### 6.3 Ráp component — 3 component × 5 màn

> Lệnh bổ sung của user: *"5 khung cũ có filterbar đang là component đúng, hãy dùng nó áp dụng
> vào khung bạn đã tạo"* — tức component `filter-bar` là bên CHUẨN, không phải demo.

**15 instance gốc / 100 kể cả lồng**, lệch chiều cao khung **0px ở cả 5 màn**:

| Component | Mỗi màn | Ghi chú |
|---|---|---|
| `page-header-desktop` | 1 | 1440×160,8 |
| **`filter-bar` platform=desktop** | **1** | 1440×68 — nhãn truyền qua **property của instance `action` lồng bên trong**, không phải override text rời: "Bộ lọc (2)" ở 2 màn *đang lọc* / *0 kết quả*, "Bộ lọc" ở 3 màn còn lại, "Sắp xếp" ở cả 5 |
| `page-footer-desktop` | 1 | ẩn `newsletter` + `divider` → 1440×414 |

**HỆ QUẢ PHẢI GHI — 2 việc mở ở mục 4 nay đã có đáp, và đáp là DEMO phải đổi.** Component
`filter-bar` chốt nút đổi mật độ lưới là `action size=icon` **40×40** và chip danh mục cao
**34**; demo đang **36×36** và **36**. Vì user chốt component là bên chuẩn, hai chỗ này thôi là
"lệch chờ chốt" — chúng là **việc phải sửa ở code** (mục 4 #3 và #4).

Thẻ sản phẩm · dải chip bộ lọc đang áp · thanh tiến độ vẫn **giữ raw**: `product-item-info`
còn ở bản 26/08 (đệm dưới `name-block`/`price-box` là 4 còn demo là 8; variant
`kind=pre-order` vẫn vẽ badge đè ảnh) và `af-chip` chưa có component tương ứng.

### 6.3b Auto layout toàn khung

> Lệnh: *"hãy sử dụng auto layout cho toàn bộ khung bạn vừa tạo"*

Trục xương sống `frame → #viewport → div[scroller]` nay là **cột auto layout ở cả 3 tầng, trên
cả 5 màn** (builder chỉ dựng được auto layout cho khối con có `display:flex/grid`; ba tầng này
là `div` khối nên trước đó là chồng toạ độ tuyệt đối).

Cách làm: khe giữa các khối **không đều** nên khe đầu/cuối đẩy vào **padding**, khe giữa chèn
**khung rỗng `space/N`** (đã khoá, không fill) — 74 spacer; đã **gỡ 5 spacer dưới 0,3px** vì đó
là khe làm tròn chứ không phải khe thật. Trục phụ thử **MIN / CENTER / MAX** rồi lấy cái lệch ít
nhất; lệch quá ngưỡng là **trả lại nguyên trạng** (ngưỡng 0,6px cho lượt chính, nới 1,2px cho
lượt vét những khung còn lại — hàng chip bộ lọc lệch đúng 1px vì `items-center` của CSS và
CENTER của Figma làm tròn khác nhau).

**Tổng: 574/705 khung có auto layout**, chiều cao khung lệch **0px**.

**131 khung còn tuyệt đối, và CẢ 131 đều là hộp `clamp`** — đúng là phải vậy, không phải bỏ
sót: đó là hộp cắt chữ của `line-clamp` / `truncate`, mực chữ bên trong **cố ý cao hơn hộp**,
bật auto layout là hoặc hộp phình ra hoặc chữ bị co. Mọi khung KHÁC trong 5 màn đã có auto
layout — xem mục 8.

### 6.4 Hai khung KHÔNG dựng lại

`PLP / thẻ hover · 6 size` và `· ít size (căn giữa)` — không đụng tới, vì đợt sửa code hôm nay
không chạm dải hover (chỉ breadcrumb + 4 nhóm nút). Popover Sắp xếp cũng vậy: hàng `sort-opt`
giữ nguyên `h-11` + nhãn 14.

### 6.5 Ghi chú vận hành

Bộ chuyển DOM→Figma nằm ở scratchpad phiên `5af4017c…` (extractor + builder). Lượt này
**cổng 9225 đã bị một bản `figma-console-mcp` khác chiếm**, nên đã chép bộ chuyển sang
scratchpad phiên này và đổi sang **cổng 9226**; thêm entry `figma-bridge-9226` vào
`.claude/launch.json` để lần sau bật lại bằng một lệnh. Builder nạp vào sandbox plugin bằng
`new Function(src)` (fetch từ `/js/builder.js`) — không phải dán 15KB nguồn qua tool.

**Bẫy đo mới:** `figma_capture_screenshot` **timeout 30s** khi export cả khung 1440 có nhiều
fill ảnh (khung 6977 có 29 ảnh). Ảnh chụp kiểm phải nhắm vào node con không ảnh
(`#plpFilterAnchor`, hàng breadcrumb, khối 0-kết-quả) — phần đã đổi hôm nay đều không có ảnh
nên vẫn kiểm được bằng mắt.

---

## 7 · Thêm vào giỏ hàng — dựng 5 màn trạng thái thành công vào Figma

> Lệnh user: *"thêm các màn đã thêm vào giỏ hàng thành công vào page screen trên figma luôn nhé"*

Section MỚI trên page `screens`: **`Thêm vào giỏ — trạng thái thành công`**
(x 17676 · y 0 · 3950×3916, không chồng lấn gì). Đi **đúng đường người thật**: mở PDP → chọn
size → bấm *Thêm vào giỏ hàng* / *Đặt trước*, rồi mới bóc.

### 7.1 Hai khuôn khác hẳn nhau, không phải một khuôn phóng to

| | Mobile | Desktop |
|---|---|---|
| Dạng | **bottom sheet** "Đã thêm vào giỏ hàng" | **mini cart** neo dưới icon giỏ (380 rộng, mép phải canh mép phải nút, thả xuống 8) |
| Nội dung | **món VỪA THÊM** — 1 hàng sản phẩm | **CẢ GIỎ** — "Giỏ hàng (N)" + danh sách + "Tạm tính" |
| Nút | chính 48 *Xem giỏ hàng* + ghost 36 *Tiếp tục mua sắm* | **một** nút *Đi đến giỏ hàng* |

Desktop đổi vai thành "tóm tắt giỏ" từ 28/08/2026 nên **không có** *Tiếp tục mua sắm* — đây là
chủ ý, không phải thiếu.

### 7.2 Năm khung

| Khung | Khổ | Nội dung |
|---|---|---|
| `mobile · sheet mặc định` | 375×812 | SP#2 Khăn lụa, size M — không dòng đặt trước, không chip giảm |
| `mobile · hàng đặt trước` | 375×812 | SP#1 Đầm lụa, IT 39 — thêm dòng *"Pre-order · Nhận hàng dự kiến 30/09/2026"* + cụm giá đủ 3 phần (giá sau giảm · chip −20% · giá gốc gạch ngang) |
| `desktop · mini cart 1 món` | 380×261 | giỏ vừa có món đầu — danh sách không cuộn, tấm co đúng nội dung |
| `desktop · mini cart nhiều món` | 380×621 | giỏ 6 món — **khung dựng 5 hàng, không phải 6**: vùng danh sách ~457 mà mỗi hàng 100 nên hàng thứ 6 nằm dưới vùng cuộn; Figma dựng đúng những gì người dùng THẤY |
| `desktop · màn PDP + mini cart` | 1440×2844 | cả màn PDP#2 với tấm mini cart đang mở, neo ở 1044,94 — khung duy nhất cho thấy tấm ở đúng chỗ so với header |

Chất lượng: text style **194/199** mực chữ · **0** chuỗi raw · **0** icon rỗng · **0** ảnh lỗi.
5 mực raw còn lại là 4 nhãn accordion 14/20 Medium (ngoại lệ 13.11) và 1 node *Gợi ý / Mua kèm*
40/50 Libre Bodoni — **bậc riêng đã ghi danh ở README**, không phải lệch mới.

### 7.3 Ráp component + auto layout

- Khung *màn PDP* có **header** = `page-header-desktop` (1440×160,8) và **chân trang** =
  `page-footer-desktop` ẩn newsletter + divider (1440×414) — **lệch chiều cao khung 0px**.
- **Auto layout cả 5 khung.** Hai khung mobile dựng **đúng nghĩa bottom sheet**: cột auto layout
  canh **MAX** (ghim đáy), lớp phủ đen là con **TUYỆT ĐỐI** nằm sau — đổi chiều cao tấm thì nó
  vẫn dính đáy. Tấm `#cartConfirm` ở khung desktop cũng là con tuyệt đối (nó là `position:fixed`
  trong DOM) nên cuộn nội dung không đẩy nó đi.
- **Hàng mini cart GIỮ RAW**: `cart-row` của DS là ruột **327** cho khổ mobile, còn hàng mini cart
  desktop rộng **380** và bố cục khác (không có stepper số lượng, giá canh phải xuống dưới) —
  cần component riêng, chưa có.

### 7.4 Trạng thái không dựng riêng

**Rê chuột vào icon giỏ (peek)** mở đúng tấm này, khác duy nhất ở chỗ **không hẹn giờ tự rút 5s**
— không có gì để dựng thêm. Việc tấm tự rút sau 5s là hành vi theo thời gian, không phải một
trạng thái tĩnh.

### 7.5 HAI lệch đo được trong demo — ghi ra để chốt, CHƯA sửa

1. **Hai định dạng tiền trong cùng một tấm.** Hàng sản phẩm ghi `15.611.000 ₫` (dấu **chấm**, có
   khoảng trắng, ký hiệu **₫**) còn dòng *Tạm tính* ghi `201,668,000đ` (dấu **phẩy**, không
   khoảng trắng, chữ **đ**). Thấy rõ nhất ở khung **1 món**: **cùng một số tiền**, viết hai kiểu,
   cách nhau 2 dòng.
2. **Dòng pre-order ở sheet mobile mở đầu bằng "Pre-order" tiếng Anh** trong câu tiếng Việt, mà
   nhãn tiếng Việt đã chốt 27/08/2026 là **"Đặt trước"** — badge trên thẻ sản phẩm đã đi bằng khoá
   dịch đó, riêng dòng này còn sót.

Cả hai đều là 1 dòng sửa; nói một tiếng là làm.


---

## 8 · Luật thường trực: mọi bản dựng Figma phải auto layout

> Lệnh user: *"lưu ý các file bạn vẽ trong figma sẽ luôn sử dụng auto layout"*

Đây là lần **thứ hai** phải nhắc (29/08 đã yêu cầu *"thêm auto layout vào các frame bạn tạo"*),
nên từ nay là **mặc định, không đợi nhắc**. Lý do: bản dựng chỉ có toạ độ tuyệt đối là **tài liệu
chết** — designer còn phải kéo/sửa/đổi nội dung ngay trên khung đó.

**`builder.js` một mình KHÔNG đủ**: nó chỉ bật auto layout cho khối có `display:flex/grid` trong
DOM, còn trục xương sống `frame → #viewport → div[scroller]` là `div` khối nên rơi ra ngoài. Nên
**sau mọi lượt `__figxBuild` phải chạy tiếp lượt vét** — bản mới nhất lưu ở
`autoAL2.js` trong scratchpad phiên `5fb60b76…`, nạp vào sandbox bằng `new Function(src)()` như builder.

### 8.1 Vét lại 2 section vừa dựng — kết quả sau cùng

| Section | Auto layout | Còn tuyệt đối | Là gì |
|---|---|---|---|
| 5 màn PLP desktop `· 03-09` | **574** | 131 | **100% là hộp `clamp`** |
| `Thêm vào giỏ — trạng thái thành công` | **237** | 53 | 50 `clamp` · 2 đoạn chữ 2 dòng · 1 `dk-look-band` |

Chiều cao khung lệch **0px** ở mọi màn. Ba thứ mở thêm được trong lượt vét này, nhờ 3 cải tiến:

1. **Kẹp đệm ÂM về 0.** Con tràn khỏi cha 1–2px là chuyện của line-box, không phải bố cục —
   trước đó guard `padding < 0` loại thẳng cả khung. Mở được `#brandDesc`, `p` (tiêu đề mini
   cart), khối chữ hàng giỏ, và `#ccList` (danh sách cuộn: hàng thứ 6 tràn 62px vẫn xếp đúng vì
   các khe đều bằng 0).
2. **Xếp lại thứ tự con theo trục.** Extractor bóc run chữ lệch thứ tự — hàng *"Trả trước từ ·
   1.301.000 ₫ · /tháng"* có layer order là `[Trả trước, /tháng, giá]`. Auto layout đi theo layer
   order nên không xếp lại là **chữ đảo chỗ**; nay xếp lại trước khi bật.
3. **Nới ngưỡng lệch lên 2,5px cho hàng lá.** Hàng tiêu đề sheet có ✕ lệch 2px so với CENTER của
   Figma (CSS `items-center` và Figma làm tròn khác nhau) — 2px trên một icon 12px là vô hình,
   đổi lại được một hàng auto layout thật. Khung tự đổi kích thước > 0,5px thì vẫn **trả lại
   nguyên trạng** như cũ.

### 8.2 Ba loại khung ĐÚNG LÀ phải giữ tuyệt đối

- **Hộp `clamp`** của `line-clamp` / `truncate`: mực chữ bên trong **cố ý** cao hơn hộp (hộp cắt,
  chữ tràn). Bật auto layout là hoặc hộp phình ra hoặc chữ bị co — sai cả hai đường.
- **Đoạn chữ inline xuống 2 dòng**: các run chồng nhau ở **cả hai trục**, cần `layoutWrap` với
  run được nhóm theo dòng — chưa làm.
- **Khối có con tràn cả trên lẫn dưới cha** (`dk-look-band`: lưới ảnh trồi lên 228px và thò xuống
  quá đáy) — đúng là phải tuyệt đối.

---

## 9 · Bottom sheet "Đã thêm vào giỏ hàng" — user sửa trong Figma, port về code

> Lệnh user: *"ở đây tôi vừa tăng spacing cho bottomsheet đã thêm vào giỏ hàng cho rộng rãi,
> và vị trí đặt giá. bạn hãy update vào file thực tế nhé"*

### 9.1 Cách tách ĐÚNG phần user sửa

Khung Figma do bộ chuyển dựng ra nên **không phải mọi số lệch đều là ý user** — lượt auto layout
đẩy đệm/khe đi lung tung mà tổng chiều cao vẫn giữ. Nên không so Figma với code, mà so **Figma
hiện tại với chính file JSON đã bóc từ code lúc dựng** (`m_cc_default_0309.json` ·
`m_cc_preorder_0309.json`). Chênh giữa hai bản đó = đúng phần user chạm tay.

Ví dụ hai chỗ **KHÔNG** phải user sửa, nếu so thô sẽ tưởng là sửa:

- Hàng tiêu đề: JSON `pad[0,16,0,16]` + `ai=center` → Figma `pad[16,18,12,16]`. Cùng cao 52 — đó
  là cách lượt auto layout diễn dịch `items-center`.
- Khối 2 nút đáy: JSON `gap 10 · pad[8,16,16,16]` → Figma `gap 20 · pad[8,16,24,16]`. Cùng cao
  118: nút *Tiếp tục mua sắm* cao 36 bị bộ bóc thu về đúng chữ 18, phần dôi 18px chia vào khe và
  đệm. **Sửa theo Figma ở đây là làm sai code.**

### 9.2 Hai thay đổi THẬT — đã port

| | Trước (code) | Sau | Đo lại |
|---|---|---|---|
| **Đệm dọc vùng nội dung** | `py-2` = **8** | `py-4` = **16** | body 122,5 → **138,5** (Figma 138) |
| **Vị trí cụm giá** | nằm ngay dưới dòng phân loại, **canh trái** | **ghim ĐÁY ô thông tin + canh PHẢI** | cách đáy cột **0px**, cách mép phải **0px** |

Cách làm cụm giá: `justify-end` + **`mt-auto`**. Ô chữ vốn đã bị kéo cao bằng ảnh (106,5) nhờ
`align-items: stretch` của hàng flex, nên `mt-auto` đủ để đẩy cụm giá xuống đúng mép đáy ảnh —
không phải đặt chiều cao cứng. Cả 3 utility (`py-4` · `justify-end` · `mt-auto`) **đã có trong
`tailwind.css` bản build sẵn** (kiểm trước khi dùng — utility chưa từng dùng là class chết).

**Áp 4 file**: `index.html` + 3 fork skin (3 fork cũng có đúng tấm sheet này). `desktop.html`
**không** đụng — bản desktop dùng mini cart dropdown, không có sheet này.

**Kiểm trên trang chạy**, cả 2 trạng thái (SP#2 thường · SP#1 đặt trước): đệm 16 · ô chữ 106,5 =
ảnh 106,5 · cụm giá `justify-content: flex-end` · `margin-top: auto` ra 30,5px (thường) / 10,5px
(đặt trước) · cách đáy 0 · cách mép phải 0.

### 9.3 HAI thứ biến mất trong Figma mà user KHÔNG nói — chưa xoá ở code

Khung Figma bản *hàng đặt trước* nay **không còn**:

1. **Dòng "Nhận hàng dự kiến 30/09/2026"** (`#ccPre`) — dòng này là **bản vá của AUDIT
   14/08/2026**: *"bấm Đặt trước xong sheet nói y hệt hàng thường, mất dấu vết pre-order"*. Xoá
   nó là đảo lại đúng cái đã vá (badge "Đặt trước" cạnh tên vẫn còn, nhưng **mất NGÀY nhận**).
2. **Giá gốc gạch ngang `90.696.000 ₫`** (`#ccWas`) — mất thì tấm chỉ còn giá sau giảm + chip
   −20%, không còn mốc để so.

Cả hai đều **không nằm trong hai việc user nói** ("spacing" và "vị trí đặt giá"), và rất giống
va quệt khi kéo cụm giá xuống. Nên **giữ nguyên trong code** và hỏi lại. Muốn xoá thật thì mỗi
cái là một dòng.

---

## 10 · Quick add desktop (dải hover trên thẻ): size trải đều + nút outline

> Lệnh user: *"ở quick add desktop, các size sẽ trải đều và chia grid và dùng button dạng
> outline nhé tương tự hình đính kèm"* (kèm ảnh tham chiếu: thẻ 2 size → 2 ô chia đôi bề ngang,
> có viền)

Chỉ **`desktop.html`** — 3 fork skin **không có** dải hover này (`.pc-quick` = 0 kết quả).

### 10.1 Ba thay đổi

| | Trước | Sau |
|---|---|---|
| Số cột | **4 cột CỨNG** ở mọi thẻ | **`repeat(var(--pc-cols), 1fr)`** với `--pc-cols = min(số size, 4)` |
| Dưới 4 size | class `.is-few`: bỏ lưới, xếp một hàng ô **tự co** rồi **căn giữa** | **gỡ hẳn `.is-few`** — lưới trải đều lo cả trường hợp này |
| Ô size | `border: 0` (chốt 19/08 *"thử bỏ outline ra khỏi các buttons size"*) | **`border: 1px solid var(--general-border)`** — nền vẫn trong suốt để thấy ảnh qua tấm blur |

CSS không đếm được số con nên số cột truyền từ markup qua biến `--pc-cols`.
Trần **4** giữ đúng chốt 19/08 (*"1 line sẽ có 4 ô size"*).

**Vì sao gỡ được `.is-few`:** nó sinh ra 19/08 chỉ để chữa một triệu chứng của lưới 4 cột cứng —
dưới 4 size thì ô bị bóp về 76px, nhãn dài như *"90 × 90 cm"* bị cắt. Nay số cột bằng số size nên
1 size ra 1 ô full, 2 size ra 2 ô chia đôi: vừa hết chỗ cho nhãn dài, vừa **trải đều** đúng yêu
cầu. Để `.is-few` lại là hai luật chọi nhau (nó khai `grid-template-columns: none`, huỷ luôn
`--pc-cols`). Class trong markup cũng gỡ theo, không để hook mồ côi.

### 10.2 Đo lại trên trang chạy (tấm rộng 317,3)

| Số size | Số cột | Bề rộng ô | Ghi chú |
|---|---|---|---|
| 1 (`Onesize`) | 1 | **317,3** | full bề ngang tấm |
| 3 (`S · M · L`) | 3 | **103,1** | trải kín một hàng |
| 6 (`IT 39–44`) | 4 | 76,3 | 4 + 2 |
| 9 (`IT 36–44`) | 4 | 76,3 | 4 + 4 + 1 |

Viền: `1px solid rgb(223,223,223)` ở **mọi** ô · gap giữ **4** (số đã chốt 19/08) ·
**0 nhãn bị cắt** (`scrollWidth` = `clientWidth` ở tất cả các ô đo được) ·
`node --check` 2/2 khối script OK · console sạch.

### 10.3 Một chỗ còn ngỏ

Với thẻ **nhiều hơn 4 size**, hàng CUỐI không trải kín (6 size → hàng 2 chỉ có 2 ô ở cột 1–2,
căn trái). Đó là hệ quả của trần 4 cột, và cũng đúng cái đã chốt 19/08. Nếu muốn **mọi hàng đều
kín** thì luật số cột phải khác — ví dụ 6 size → 3 cột × 2 hàng — nhưng lúc đó bề rộng ô đổi theo
từng sản phẩm và bỏ luật "4 ô một dòng". Chưa làm; ảnh tham chiếu chỉ có 2 size nên không suy ra
được ý cho trường hợp này.

~~Gap 4 giữ nguyên nên các ô là những nút outline rời nhau.~~ → **đã chốt ngay sau đó, xem 10.4.**

### 10.4 Chốt tiếp: dải LIỀN, tràn hết bề ngang thẻ

> Lệnh user: *"cho nó tràn hết ô và không có khoảng cách giữa các button luôn nhé"*

| | Trước | Sau |
|---|---|---|
| Đệm của tấm `.pc-quick` | **12px** quanh tấm | **0** — dải chạy sát 3 mép thẻ |
| Khe giữa các ô | `gap: 4px` | **`gap: 0`** |
| Viền ô | `border: 1px` 4 phía | **`border-top` + `border-left`** 1px |

Ba chỗ đi liền nhau, không tách được:

- **Đệm 0** làm tấm nay CHỈ to bằng dải size, nên phần ảnh phía trên **không còn bị nền mờ che** —
  đúng ảnh tham chiếu (trước đó tấm là một khối nền mờ có lề 12px).
- **Khe 0** thì viền 4 phía sẽ làm đường kẻ giữa 2 ô **dày 2px**. Nên ô chỉ vẽ `border-top` +
  `border-left`; mép phải/dưới không cần viền vì đã là mép thẻ. Mọi đường trong dải là **hairline
  1px**.
- `border-left` của **ô ĐẦU mỗi hàng** sẽ thành một đường kẻ dọc lạc ở mép trái. Xử bằng
  `margin-left: -1px` trên lưới: đường đó rơi ra ngoài và bị ô ảnh (`overflow-hidden`) cắt. Chọn
  cách này thay vì `nth-child` vì **số cột là biến `--pc-cols`, `nth-child` không đọc được biến CSS**.

**Đo lại**: tấm rộng **341,3 = đúng bề ngang ảnh thẻ** · đệm 0 · khe 0 (mép phải ô 1 trùng mép trái
ô 2) · ô cuối hàng 1 kết thúc **đúng mép phải ảnh** · viền `top 1px · left 1px · right 0 · bottom 0`
· ô đầu lệch **−1px** (bị cắt như tính) · chiều cao tấm = **số hàng × 36** (36 / 72 / 108) ·
**0 nhãn bị cắt** · `node --check` 2/2 OK.

### 10.5 Vá: ô cuối HÀNG LẺ bị hở viền phải

> User bắt lỗi: *"hãy kiểm tra lại có vài button đang không có viền, ví dụ như sản phẩm t4"*

**Lỗi:** ô chỉ vẽ `border-top` + `border-left` — đúng cho ô ở **cột cuối** (mép phải của nó là mép
thẻ nên không cần kẻ). Nhưng khi **hàng cuối LẺ Ô** thì ô cuối hàng dừng **giữa dải**, mép phải
không còn là mép thẻ nữa → nút hở hẳn một bên. Thấy rõ nhất ở **thẻ 9 size** (`t4` — giày cao gót,
`IT 36–44` ra 4 + 4 + 1): hàng 3 chỉ có một ô, chỉ có 2 đường kẻ nên không đọc ra là một nút.
Thẻ 6 size cũng vậy ở ô `IT 44`.

**Vá:**

```css
.pc-sizes  { margin-left: -1px; margin-right: -1px; }   /* thêm margin-right */
.pc-size:last-child { border-right: 1px solid var(--general-border); }
```

Dùng `:last-child` chứ **không** thêm `border-right` cho mọi ô: khe đã về 0 nên viền phải của ô này
cộng viền trái của ô kế bên sẽ ra đường kẻ **dày 2px**. Còn `margin-right: -1px` lo trường hợp
**hàng cuối ĐẦY**: lúc đó `:last-child` nằm ở cột cuối, viền phải của nó rơi vào 1px lệch ngoài và
bị `overflow-hidden` cắt → không sinh đường kẻ lạc ở mép phải dải.

**Đo lại từng ô** (thay vì chỉ đo ô đầu như lượt trước — đó là lý do lỗi lọt):

| Thẻ | Số size | Hàng cuối | Mép phải ô cuối so với mép ảnh | Viền phải |
|---|---|---|---|---|
| Đầm lụa | 6 | LẺ (4+2) | **−170,6px** (giữa dải) | **hiện** ✔ |
| Khăn lụa | 3 | ĐẦY | **+0,98px** (ngoài mép) | bị cắt ✔ |
| Túi Lou | 1 | ĐẦY | **+1,0px** (ngoài mép) | bị cắt ✔ |
| Giày `t4` | 9 | LẺ (4+4+1) | **−256,4px** (giữa dải) | **hiện** ✔ |

`node --check` 2/2 OK.

### 10.6 Dựng lại viền cho ĐỦ 4 MẶT (user bắt lỗi lần 2)

> *"hiện tại vẫn bị lỗi, hãy set border cho các button đó lại đầy đủ và kĩ hơn"*

**Lượt vá 10.5 chỉ chữa được mặt PHẢI.** Vẫn còn hở **mặt DƯỚI**: ô chỉ vẽ `border-top` +
`border-left` nên mọi ô nằm ở **đáy dải** đều không có đường kẻ dưới — ô `IT 44` của thẻ 9 size, và
cả `IT 40…IT 43` (hàng 2, cột 2-4 của thẻ đó) vì dưới chúng là vùng trống. Đó là chỗ user chỉ.

**Cách làm lại — kiểu bảng thu đường kẻ, chia việc rõ ràng:**

```css
.pc-sizes { gap: 0; margin-left: -1px; margin-right: -1px;
            border-top: 1px solid var(--general-border);     /* mép TRÊN dải */
            border-left: 1px solid var(--general-border); }  /* mép TRÁI dải */
.pc-size  { border: 0;
            border-right: 1px solid var(--general-border);    /* + kẻ ngăn ô kế bên */
            border-bottom: 1px solid var(--general-border); } /* + kẻ ngăn hàng dưới */
```

- **LƯỚI** vẽ mép trên + mép trái · **Ô** vẽ mép phải + mép dưới. Mỗi ô đủ 4 mặt: 2 mặt của chính
  nó, 2 mặt còn lại do lưới hoặc ô liền kề vẽ.
- Không chỗ nào hai viền cộng lại → **mọi đường là hairline 1px**.
- Ô **cuối hàng lẻ tự có viền phải** → rule `:last-child` của lượt trước **gỡ bỏ**, không còn ca
  đặc biệt nào.
- `margin-left/-right: -1px` đẩy mép trái của lưới và mép phải của cột cuối ra ngoài để
  `overflow-hidden` của ô ảnh cắt → hai mép dải trùng mép thẻ, không sinh kẻ dọc lạc. Cách này
  **không phụ thuộc số cột** — mà số cột là biến `--pc-cols`, `nth-child` không đọc được biến CSS.

**Kiểm lần này khác hẳn 2 lượt trước: quét ĐỦ 4 MẶT của TỪNG Ô trên TOÀN BỘ thẻ của trang** (không
lấy mẫu). Mỗi mặt tính là "có kẻ" nếu do chính ô vẽ, HOẶC do ô liền kề (trái/trên) vẽ, HOẶC do viền
lưới vẽ. Kết quả: **0 ô thiếu mặt nào**. Lưới lệch trái −1,00 · lệch phải +1,00 ở mọi thẻ.
`node --check` 2/2 OK.
