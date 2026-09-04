# Menu vào Figma (04/09/2026)

File Figma: `Test agent` — `XFfjTNMuPfaTeZvdbVIO2F`
Section: **`Menu — mega desktop + drawer mobile`** (page `screens`, `x -100 / y 46100`) — **12 khung**
(11 màn + 1 `[doc]`), **115 instance**.
Page MỚI: **`menu`** — giữ 3 component riêng của menu.

Nguồn: `desktop.html` (1440) + `index.html` (375), bộ da vào-trang `skin-mt skin-li`
(theo luật "Figma chỉ dựng skin-li").

---

## 1 · Mười một khung

| Khung | Khổ | Nội dung |
|---|---|---|
| `desktop · thanh nav (Nam·Nữ)` | 1440×65 | 8 mục theo thứ tự chốt 04/09 |
| `desktop · thanh nav (Làm đẹp)` | 1440×65 | 11 mục — ngành này không có Pre-loved |
| `desktop · mega Thương hiệu` | 1440×411 | 3 cột hãng + teaser — **khuôn cao nhất** |
| `desktop · mega Sản phẩm mới` | 1440×374 | Bộ sưu tập mới + Nam + Nữ + teaser |
| `desktop · mega Quần áo` | 1440×379 | Nam (8) + Nữ (8) + teaser — khuôn danh mục |
| `desktop · mega Làm đẹp` | 1440×374 | 1 cột + teaser |
| `desktop · lớp tìm kiếm` | 1440×804 | gợi ý + từ khoá gần đây + thẻ sản phẩm |
| `mobile · drawer cấp 1 (Nam)` | 375×812 | 3 tab + 9 hàng + khối tài khoản + ngôn ngữ |
| `mobile · drawer cấp 1 (Làm đẹp)` | 375×812 | 12 hàng |
| `mobile · drawer cấp 2 (Quần áo)` | 375×812 | màn con — GIỮ logo + tabs, chỉ vùng dưới swap (xem §7) |
| `mobile · drawer cấp 2 (Thương hiệu)` | 375×812 | 15 hàng — cùng khuôn cấp 2 mới |

Khổ khớp trang chạy **đúng từng px** — đo lại sau khi ráp component: **11/11 khớp**.

**`Khuyến mãi` và `Pre-loved` KHÔNG có mega panel** — bấm là đi thẳng PLP, nên không có khung riêng.
Mega panel có **3 khuôn khác nhau** (hãng / bộ sưu tập / danh mục); cột đều **300 rộng, khe 64**,
teaser 300×285 ở cột 4.

---

## 2 · Ba component MỚI — 115 instance

Đây là phần "dùng component cho các thuộc tính của nó": những mảnh **lặp lại** của menu được đóng
thành component, mỗi cái có thuộc tính `label` để đổi chữ mà không phải vào sâu.

| Component | Trục | Instance | Số đo |
|---|---|---|---|
| **`menu-row`** | `arrow=on \| off` | **44** | 375×49 · đệm 16/16/17/16 · kẻ đáy `#ececec` · chữ 12/16 |
| **`mega-link`** | `kind=item \| heading` × `state=default \| _hover` | **67** | co nội dung · 12/18 · bậc `_hover` gạch chân đúng CSS demo |
| **`mega-teaser`** | — | **4** | 300×285 · ảnh 259×259 + nhãn · kẻ trái `#dfdfdf` |

Mỗi lượt ráp đều **đo `w×h` với node raw trước khi xoá**, lệch > 1,5px là tự bỏ — **0 lượt bị bỏ**.
Chiều cao 11 khung sau khi ráp: **không xê dịch 1px nào**.

**Vì sao cột mega không thành component**: số đường dẫn mỗi cột khác nhau (3–9) mà component thì cố
định số con — nên đóng ở tầng **`mega-link`** (một dòng) là đúng tầng, cột giữ là khung auto layout.

---

## 3 · Component sẵn có — đã ĐO nhưng KHÔNG ráp được

| Component | Số đo lệch | Việc cần làm nếu muốn ráp |
|---|---|---|
| `tab-item` | cùng cao **40**, cùng kẻ đáy `#0a0a0a` **2px**, cùng chữ **14/20 Medium** — chỉ khác **đệm ngang: component 12, tab drawer 8,4** (rộng 125 so 51) | gần nhất trong nhóm; chốt một bên là ráp được ngay |
| `action size=small` | cùng cao **36** nhưng chữ component **12/16** còn nút drawer **14/20**; nút phụ drawer nền `#ffffff` + kẻ `#dfdfdf`, còn DS có `secondary` `#f2f2f2` (không kẻ) và `outline` kẻ `#0a0a0a` | thêm bậc, hoặc kéo demo về 12/16 |
| `modal-slide` | chỉ có `side=bottom` và `side=right`; drawer menu trượt từ **TRÁI** | thêm `side=left` |

Mục thứ 2 **cùng họ với lỗi nút sticky 44 ở PDP**: bộ `action` chỉ có 48/40/36 và **mỗi bậc khoá cứng
một cỡ chữ**, trong khi demo dùng các tổ hợp khác. Đây là chỗ đáng chốt một lần cho cả bộ.

---

## 4 · Auto layout

**138 / 158 khung có con = 87,3%.** Hai mươi khung còn lại **toàn bộ là `clamp`** (mực chữ cố ý cao
hơn hộp do `line-clamp`) — không còn nhóm nào khác. Ngoài ra 72 ô đệm `space/N` **rỗng**: chính chúng
LÀ khe của auto layout.

Vá thêm 2 khối "nhãn lệch trong + hàng nút full-bleed" trong drawer (khối *Tài khoản*) bằng khung bọc
`section-title` — lệch 0px.

---

## 5 · Bẫy tìm ra khi bóc — animation đè lên inline style

Drawer mobile bóc lần đầu ra **21 node thay vì 56**, mất sạch phần danh sách.

Nguyên nhân: `.ms-view { animation: msIn .22s both }`. Pane trình duyệt ẩn thì rAF bị bóp nên
animation **đứng ở keyframe đầu** (`opacity 0` + `translateX 24`), và luật clip của bộ trích xoá cả
nhánh.

Điểm cốt lõi: **animation nằm TRÊN inline style trong cascade** — đặt `el.style.opacity = '1'` không
ăn thua, phải `animation: none`. Đã vá `.ms-view` vào khối freeze của `extractor.js`, cạnh
`.rise,.reveal`.

**Dấu hiệu nhận ra**: số node ít bất thường mà `warnN` vẫn bằng 0 → luôn đếm node trước khi dựng.

---

## 6 · Ghi chú

- Không chụp được ảnh kiểm: đường export của plugin Figma treo (timeout 30s) dù mọi lệnh khác chạy
  bình thường. Bằng chứng là số đo — 11/11 khung khớp, 115 instance, 0 link đứt, nội dung trong
  instance đã đọc lại đúng.
- Khung `[doc]` cũng auto layout 100%; đã sửa 20 hàng bảng bị tràn ngang (lỗi cộng thiếu phần khe khi
  chia cột — đã ghi ở `NAMING-MAGENTO.md` §9.5).

---

## 7 · Cấp 2 của drawer mobile — ĐỔI 04/09/2026

> User sửa thẳng trên khung Figma `204:9421` rồi chốt: *"khi vào level 2 giữ lại label có logo kèm
> nút close trên cùng, giữ bộ tabs gender + làm đẹp, bên dưới sẽ swap theo hạng mục"*.

| | Trước | Sau |
|---|---|---|
| Thanh trên | THAY bằng `[back] · tiêu đề canh giữa · [close]` | **giữ nguyên** logo + `[close]` |
| Hàng tab ngành hàng | **biến mất** | **giữ nguyên** (Nam · Nữ · Làm đẹp) |
| Tên hạng mục | nằm trong thanh trên, canh giữa | thanh riêng dưới tabs: `[back]` + tên, **canh trái** |
| Vùng dưới | cả panel đổi | chỉ vùng dưới tabs swap |

**Số đo khớp khung Figma từng px**: thanh logo 48 · tabs 41 · thanh hạng mục 48 (đệm 16, khe 5, nút
back 14×14 ở x=16, chữ ở x=35, 12/16 · 500 · HOA) · hàng 49.

**Ba điều phải để ý khi sửa chỗ này:**

1. **Đổi tab khi đang ở cấp 2 phải trả về cấp 1** của ngành mới (`menuSub = null` trong handler
   `[data-mtab]`). Không trả thì màn con của ngành CŨ đứng nguyên dưới tab ngành MỚI.
2. **Phép phân biệt cấp 1 / cấp 2 trong CSS vẫn phải là `:has(.glass-95 > p)`** — từ nay cấp 2 CŨNG
   có `.ms-tab` nên không dùng `:has(.ms-tab)` được nữa. Đã kiểm: hàng cấp 2 vẫn ra `text-transform:
   none` (không hoa), đúng như trước.
3. `w-3.5` · `h-3.5` · `gap-[5px]` **không có trong `tailwind.css` dựng sẵn** → phải viết `style=`,
   gõ vào class là class chết.

**Thanh hạng mục ghim `shrink-0`, không cuộn theo danh sách** — đây là chỗ tôi tự quyết: khung Figma
vẽ nó nằm trong vùng cuộn, nhưng hạng mục dài (Thương hiệu 15 hàng) mà cuộn mất nút back là cụt
đường lùi. Ở trạng thái đứng yên hai cách nhìn y hệt nhau.

**Chỉ sửa `index.html`.** `#menuSheet` trong `desktop.html` là **code chết** — `data-menu-open` chỉ
xuất hiện đúng 1 lần và là ở handler, không phần tử nào mang thuộc tính đó (chính comment trong file
cũng đã ghi vậy).

---

## 8 · Canh Ô cho mượt khi đổi level — đợt 2, cùng ngày

> User gửi 2 ảnh tham chiếu (menu mobile của một site khác) kèm yêu cầu: *"điều chỉnh lại về kích
> thước, vị trí của các items tương tự hình đính kèm để tạo cảm giác mượt mà khi chuyển qua từng
> level, chỉ THAM KHẢO cách họ làm chứ đừng đổi style của chúng ta"*.

**Cái làm cho bản tham chiếu mượt không phải hiệu ứng** — mà là: hàng tiêu đề cấp 2 rơi **đúng vào Ô
của hàng đầu tiên cấp 1**. Đổi level thì tabs đứng yên, ô 1 chỉ đổi chữ, các ô dưới trượt nội dung —
không có gì nhảy chỗ.

Trước đợt này thanh tiêu đề của mình nằm sát ngay dưới tabs (`y=89`, cao 48) trong khi hàng đầu của
cấp 1 nằm ở `y=105` cao 49 — **lệch 16px và lệch 1px chiều cao**, nên đổi level thấy giật một nhịp.

**Cách sửa — chỉ đổi nhịp đặt ô, không đụng một giá trị style nào:** thanh tiêu đề lấy đúng nhịp của
`row()` — bọc ngoài `pt-4` (nhận phần đệm trên mà `.ms-view` cấp 1 đang giữ) + thân `px-4 py-4` + kẻ
đáy như hàng → `16 + 48 + 1`. `.ms-view` cấp 2 đổi `py-4` → `pb-4`, không thì cộng thêm 16 nữa.

Đo lại — **mọi ô trùng khít**:

| Ô | Cấp 1 | Cấp 2 |
|---|---|---|
| hàng tab | y 48 · cao 41 | y 48 · cao 41 |
| **ô 1** | "Trang chủ nam" y **97** · cao **49** | "‹ Quần áo" y **97** · cao **49** |
| ô 2 | "Thương hiệu" y **146** | "Áo polo" y **146** |
| ô 3 | y **195** | y **195** |
| ô 4 | y **244** | y **244** |

*(Số y ở trên đã tính đệm 8px — xem §9. Lúc mới canh xong, đệm còn 16 nên mốc là 105 · 154 · 203 · 252.)*

Hai khung Figma cấp 2 (`Quần áo` · `Thương hiệu`) **đã dựng lại theo nhịp mới** — thanh tiêu đề nay ở
`y=105 cao 49` ở cả hai, lệch 0px. Khung `Quần áo` user vẽ ở đợt 1 đặt thanh này ở `y=89`; lệnh đợt 2
này thay số đó nên tôi cập nhật luôn — nếu muốn giữ mốc cũ thì nói, tôi trả lại.

### Một chỗ tôi thấy nhưng KHÔNG đổi

Trong ảnh tham chiếu, **hàng cấp 2 không có mũi tên `>`** (chúng là điểm cuối, bấm là ra danh sách
sản phẩm), còn hàng cấp 1 thì có. Hàng cấp 2 của mình **vẫn đang có mũi tên** — tức đang hứa một cấp
nữa mà không có. Đây là *affordance*, không phải kích thước/vị trí, nên tôi để nguyên chờ chốt.

---

## 9 · Hạ đệm `.ms-view` một nấc: 16 → 8 (04/09/2026)

> Lệnh user: *"`ms-view flex-1 overflow-y-auto overscroll-contain py-4` giảm xuống 1 nấc padding còn
> 8px thôi nhé"*.

`py-4` → `py-2`. **Nhưng phải đổi BA chỗ một lúc**, không thì gãy phần canh ô vừa làm ở §8 — đệm này
nằm ở 3 nơi từ khi tách cấp 2:

| Chỗ | Trước | Sau |
|---|---|---|
| `.ms-view` cấp 1 | `py-4` | `py-2` |
| `.ms-view` cấp 2 | `pb-4` | `pb-2` |
| khung bọc `subBar` (nhận phần đệm TRÊN của cấp 2) | `pt-4` | `pt-2` |

Sửa mỗi chỗ đầu thì hàng đầu cấp 1 lên `y=97` còn thanh tiêu đề cấp 2 đứng nguyên `y=105` → lệch 8px,
đúng thứ vừa mất công chỉnh. Đã ghi cảnh báo ngay trong comment của `subBar`.

Đo lại sau khi đổi — vẫn trùng khít:

| Ô | Cấp 1 | Cấp 2 |
|---|---|---|
| hàng tab | y 48 · cao 41 | y 48 · cao 41 |
| ô 1 | y **97** · cao 49 | y **97** · cao 49 |
| ô 2 | y **146** | y **146** |
| ô 3 | y **195** | y **195** |
| ô 4 | y **244** | y **244** |

`.ms-view` cấp 1 đo được `padding: 8px/8px`, cấp 2 `0px/8px`. Console sạch (kiểm bằng tab mới —
`read_console_messages` giữ lỗi của lượt load trước nên đọc trên tab cũ là đọc nhầm).

Hai khung Figma cấp 2 **chưa dựng lại theo mốc 8px** — số trong khung đang là mốc 16px (105 · 154 ·
203 · 252). Nói một tiếng là tôi dựng lại cho khớp.
