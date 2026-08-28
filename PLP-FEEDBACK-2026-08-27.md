# PLP — 6 việc khách chốt 27–28/08/2026

> Lệnh user (kèm ảnh chụp PLP desktop):
> 1. *Badge Preorder sẽ nằm trước tên sản phẩm (như hình đính kèm)*
> 2. *Thêm ô tìm kiếm tên Thương hiệu vào khi bấm filter thương hiệu*
> 3. *quick add to cart sẽ không có title ở phiên bản desktop*

Phạm vi từng việc **khác nhau** — ghi rõ để không ai đồng bộ nhầm:

| Việc | index.html | desktop.html | 3 bản thử skin | Vì sao |
|---|---|---|---|---|
| 1 Badge trước tên | ✔ (cùng hàng) | ✔ (cùng hàng) | ✖ | 3 fork không có rule `.badge-label`, thả badge vào là badge không nền |
| 2 Ô tìm thương hiệu | ✔ | ✔ | ✔ | chỉ dùng utility sẵn có, không thêm CSS |
| 3 Quick-add bỏ title | — | ✔ | — | lệnh nói rõ "phiên bản desktop"; `.pc-quick-act` vốn **chỉ có** ở desktop.html |

---

## 1. Badge "Đặt trước" ra trước tên sản phẩm

**Trước:** `Pre-order` là nhãn **đè lên ảnh**, nằm chung chồng với `New Season` ·
`La Vacanza` ở góc trên trái.
**Sau:** tách làm hai — nhãn **chiến dịch** ở lại trên ảnh, còn `Pre-order` xuống
đứng **trước tên sản phẩm**. Lý do tách: hai thứ nói hai chuyện. Nhãn chiến dịch
thuộc về **ẢNH** (bộ sưu tập nào), còn Pre-order nói **TÌNH TRẠNG BÁN** của chính
SKU — cùng họ thông tin với tên và giá, nên chỗ của nó là ở khối chữ.

**Đổi nền, bắt buộc:** bản đè ảnh dùng `.badge-label` = **nền trắng** (đọc được
vì ảnh phía sau là mặt xám). Đặt xuống thẻ nền trắng thì badge trắng **vô hình**.
Nên thêm `.badge-inline` = **mặt xám `#f2f2f2`** — mặt thứ 2 có sẵn của §2.2,
không mở mặt mới. Chữ giữ nguyên `12/16 · #0a0a0a`; nhãn là **"Đặt trước"** và
**không** còn `data-i18n-skip` — xem mục ngay dưới.

**Sửa MỘT chỗ, không sửa 6 nơi gọi:** chặn ngay đầu `productCard()` bằng
`if (badge === 'Pre-order') badge = '';` — mọi nơi gọi vẫn truyền
`badge: p.preorder ? 'Pre-order' : ''` như cũ.

### Nhãn tiếng Việt là **"Đặt trước"** (chỉnh lần 2)

Bản đầu tôi để nguyên chữ `Pre-order` + `data-i18n-skip`, theo ghi chú cũ trong code
(*"Pre-order là wordmark, phải skip kẻo lượt dịch ngược EN→VN biến nó thành Đặt
trước, trùng chuỗi với nút"*). User chốt lại: **tiếng Việt phải là "Đặt trước"** —
tức nó KHÔNG phải wordmark, mà là chuỗi dịch được. Ghi chú cũ vì thế hết hiệu lực:
chính "Đặt trước" mới là bản tiếng Việt đúng, còn "Pre-order" là bản EN của nó.

Sửa: bỏ `data-i18n-skip`, đổi chữ sang `Đặt trước`, đi bằng **khoá có sẵn**
`'Đặt trước' → 'Pre-order'` trong `I18N` (không thêm khoá mới). Đổi ở **cả 4 chỗ
badge** của mỗi file để 3 màn không nói 3 kiểu: thẻ PLP · ảnh PDP · 2 chỗ trong giỏ
hàng. Kiểm được: VI ra *"Đặt trước"* ở cả PLP · PDP · giỏ; chuyển EN ra
*"Pre-order"*; chuyển về VI ra lại *"Đặt trước"*.

### Cùng MỘT hàng với tên ở mọi khổ (chỉnh lần 2)

Bản đầu tôi cho khổ mobile **xếp dọc** vì đo được badge ăn mất chỗ của tên. User
chốt lại: *"badge nằm chung 1 hàng với tên chứ"* → trả về **cùng hàng ở mọi khổ**.

Đánh đổi đã báo và user vẫn chọn hàng ngang, ghi lại để sau này không ai "sửa
giúp": ở lưới 2 cột của `index.html`, thẻ rộng 185 — badge *"Đặt trước"* chiếm
**65**, tên còn **105** và **bị cắt bằng ellipsis**. Desktop thì dư chỗ: tên còn
**172**, **không cắt**.

**Nếu sau này muốn tên đủ chữ trên mobile** thì đòn bẩy đúng là cho tên **xuống 2
dòng** (`line-clamp-2` thay `truncate`) — badge vẫn ở cùng hàng với dòng đầu của
tên, đúng lệnh. KHÔNG phải hạ badge xuống dòng riêng (đã thử, đã bị bác).

---

## 2. Ô tìm kiếm thương hiệu trong bộ lọc

Danh sách **24 nhà mốt** và còn dài ra — cuộn tay tìm một cái tên là việc phải làm
mỗi lần mở mục. Thêm ô nhập ngay đầu mục *Thương hiệu*.

* **Lọc trên DOM** (ẩn/hiện hàng) chứ không dựng lại danh sách → **hàng đang tick
  giữ nguyên trạng thái**, không phải đồng bộ lại với `plpFilters`. Kiểm được:
  tick Versace → gõ "bur" → xoá ô → Versace **vẫn còn tick**.
* **So sánh sau khi bỏ dấu + thường hoá** (`NFD` + xoá dải `̀-ͯ`): gõ
  `MONT` ra Montblanc, `gabbana` ra Dolce&Gabbana (khớp giữa chuỗi, không chỉ đầu
  chuỗi).
* Không tìm thấy thì hiện dòng *"Không tìm thấy thương hiệu"*, xoá ô thì 24 hàng
  trở lại.
* Ô nhập dùng đúng khuôn ô nhập sẵn có của panel (h36 · viền 1px · `rounded-xs` ·
  `focus:border-primary`), không đẻ kiểu mới.
* **i18n**: thêm 2 khoá vào `I18N` — kiểm cả hai chiều, `placeholder` đổi thành
  *"Search brands"* và dòng rỗng thành *"No brands found"*; lọc **vẫn chạy đúng**
  khi đang ở EN (gõ "ver" ra 2 kết quả).

---

## 3. Quick-add bỏ title (desktop)

Đây là **đảo chốt 26/08** — hôm đó chính user yêu cầu *"ở bản desktop thêm title
trên quickadd này"*, nay bỏ. "Quick add" ở đây là **DẢI HOVER trên thẻ**
(`.pc-quick`), không phải dialog 2 cột.

Việc này đi **hai lệnh liên tiếp** trong cùng buổi:

| Lệnh | Gỡ gì |
|---|---|
| *"quick add to cart sẽ không có title ở phiên bản desktop"* | dòng `.pc-quick-act` (*"Thêm vào giỏ hàng"* / *"Đặt trước"*) |
| *"trong quick add desktop bỏ luôn ngày nhận hàng dự kiến"* | dòng `.pc-quick-eta` + cả khối `.pc-quick-head` |

Lượt đầu tôi **giữ** dòng ngày, lập luận rằng lệnh chỉ gọi tên "title" còn ngày
giao là *thông tin*. User chốt bỏ luôn → **đảo trọn chốt 26/08**: tấm hover trở
lại đúng bản 19/08, **chỉ còn lưới size**.

Xoá theo cả **3 rule CSS** (`.pc-quick-head` · `.pc-quick-eta` · `.pc-quick-date`)
và 3 khối comment giải thích chúng, không để mồ côi. Giữ lại một câu ghi rằng
**nhãn trong ô size vẫn căn GIỮA ô** — đó là chốt riêng của cụm size, không phải
hệ quả của việc từng có title căn trái ở trên.

**Ngày nhận dự kiến không mất khỏi demo:** vẫn còn ở **PDP** và ở **giỏ hàng**,
chỉ là lớp hover của thẻ thôi nói nó.

Đo lại: thẻ pre-order và thẻ thường đều chỉ còn `.pc-sizes` trong `.pc-quick`
(6 ô và 2 ô), `.pc-quick-head` = **0** trên toàn trang.

---

## 4. Khăn lụa: size demo là S / M / L

Lệnh user: *"cái size của khăn lụa in họa tiết hãy demo nó là S M L thay vì kích thước"*.

Khăn lụa (`pdp2`) trước đây chào **kích thước thật** — `90 × 90 cm` và `84 × 5 cm`.
Nay đổi thành **S · M · L**. Đây là đổi **DỮ LIỆU demo**, không đụng khuôn:
`sizeLabel()` chỉ gắn tiền tố `IT ` cho nhãn **số thuần**, nên S/M/L đi thẳng,
không phải rẽ nhánh gì thêm.

**Hai nguồn phải sửa cùng lúc, kẻo 2 màn nói 2 kiểu:**

| Nguồn | Nuôi màn nào | Có ở file nào |
|---|---|---|
| `SIZE_SHEET_OPTIONS.pdp2` | sheet/dropdown chọn size | **cả 5 file** |
| `PDP_DATA.pdp2.sizes` | khối size trên thân PDP | desktop + 3 bản thử skin (index không có khối này) |

Đo lại: dải hover trên thẻ PLP ra đúng **S · M · L** (3 ô, lưới về `is-few` nên xếp
một hàng căn giữa); cả hai nguồn ở runtime đều đọc ra `['S','M','L']`; quét text
màn PDP ở cả mobile lẫn desktop — **không còn** chuỗi `90 × 90 cm` / `84 × 5 cm`.

Ba comment cũ lấy `90 × 90 cm` làm ví dụ đã sửa theo, kể cả ghi chú CSS giải thích
vì sao lưới `is-few` phải cho ô tự co: luật vẫn đứng (nhãn dài nhất còn lại là
`Onesize` và `90 ml`), chỉ là ví dụ trong ghi chú thành lịch sử.

> **Còn một chỗ chưa khớp — cần bạn quyết:** TÊN sản phẩm vẫn là
> *"Khăn lụa in họa tiết Broken Jewels **90×90cm**"*. Tên mang kích thước mà bảng
> size lại là S/M/L thì đọc ra hơi nghịch. Tôi không tự đổi vì tên chảy vào cả giỏ
> hàng, đơn hàng và tìm kiếm. Muốn bỏ đuôi `90×90cm` khỏi tên thì nói một tiếng.

---

## 5. Hai việc chốt thêm

### 5.1 Nền badge "Đặt trước" lên một bậc

`#f2f2f2` → **`#dfdfdf`** (`--general-border`). Tương phản của badge so với thẻ
trắng: **1,12 → 1,33** — giờ mới đọc ra là một chip. Chữ trên badge vẫn 14,86:1.

**Vì sao nhảy qua `#ececec`:** thang xám của bộ da vào-trang là
`#ffffff · #f7f7f7 · #f2f2f2 · #ececec · #dfdfdf`. Nấc kế tiếp theo NGHĨA ĐEN là
`#ececec`, nhưng nó chỉ cách `#f2f2f2` đúng **6/255** — chính khoảng cách mà §2.2
đã gọi tên và khai tử khi bỏ `#f7f7f7` (*"hai xám cách nhau 5/255 là hai xám không
phân biệt được"*). `#dfdfdf` là nấc **đầu tiên mắt đọc ra** (19/255).
Đây là token VIỀN dùng làm MẶT — lệch §2.2 (chỉ có 2 mặt), **ghi danh tại chỗ**,
phạm vi đúng một badge.

### 5.2 Thuộc tính không còn sản phẩm phù hợp thì **ẨN**

Lệnh user: *"các thuộc tính nào khi không còn sản phẩm phù hợp sẽ ẩn luôn nếu
không thỏa điều kiện"* — **ẩn**, không phải disable. (Đã cân nhắc disable rồi user
bác: bày một ô bấm không được vẫn là bày một ngõ cụt.)

Quy tắc: **một lựa chọn biến mất khi tick nó vào bộ lọc HIỆN TẠI sẽ ra 0 sản
phẩm.** Tính lại sau mỗi lần tick, nên panel co dần theo lựa chọn.

**CHƯA TICK GÌ THÌ BÀY ĐỦ** (user chốt lại ngay sau lượt đầu): *"vì demo nên mặc
định cứ show đầy đủ các cate đang hiện hữu, chỉ khi nào dùng bộ lọc thì mới ẩn"*.
Lượt đầu tôi cho ẩn ngay từ lúc mở panel — sai về phía demo: mở ra mà thương hiệu
chỉ còn 1 dòng thì khách không thấy được bộ facet mình dựng, tưởng bộ lọc sơ sài.
Việc co danh sách chỉ có nghĩa khi nó **trả lời một lựa chọn**, nên nó chờ tới lúc
có lựa chọn. Bỏ tick hết cũng qua đúng nhánh đó → danh sách tự bày lại đủ.

**Hai điều phải đúng, sai một cái là bộ lọc tự bóp cổ mình:**

1. **Đếm cho một ô thì BỎ QUA chính nhóm của nó.** Không thì tick "Versace" xong
   mọi thương hiệu khác đếm ra 0 (một SP không mang 2 brand) → cả danh sách bay
   sạch, còn trơ đúng ô vừa tick.
2. **Ô đang tick không bao giờ ẩn** — ẩn rồi thì hết đường bỏ tick.

Dùng lớp riêng `.f-gone`, **không** dùng chung `.hidden` của ô tìm thương hiệu: hai
cơ chế cùng ẩn một hàng nhưng vì hai lẽ khác nhau, gộp một lớp thì cái này bật lại
cái kia.

**Đo trên PLP thời trang, cả 3 trạng thái:**

| Nhóm | Mở panel (chưa tick) | Sau khi tick màu **Đen** | Bỏ tick hết |
|---|---|---|---|
| Thương hiệu | **24/24** | **1/24** (Versace) | **24/24** |
| Màu sắc | **15/15** | **7/15** (Đen · Trắng · Nâu · Vàng đồng · Hồng · Xanh lá · Nhiều màu) | **15/15** |
| Ưu đãi + Khác | **8/8** | **6/8** (mất *50% - 70%*, *Trên 70%*) | **8/8** |
| Cây danh mục | 173 | **173 — không đụng** | 173 |
| Size | 43 | **43 — không đụng** | 43 |

Đo ở cả `index.html` @375 và `desktop.html` @1440, số khớp nhau.

Cây danh mục và size thời trang **không co** vì `matchProducts` không đọc 2 facet
đó (`PRODUCTS` không có trường phân loại, cũng không mang size thời trang) → chúng
luôn đếm ra nguyên danh sách, không bao giờ chạm ngưỡng 0. Muốn cây cũng co thì
phải **thêm trường phân loại cho 24 sản phẩm trước** — đó là việc DATA, không phải
việc của hàm này.

**Co dần theo lựa chọn, kiểm được:** tick *Đen* → nhóm màu giữ nguyên 7 ô (đúng
luật 1), số kết quả (6). Tick *30% - 50%* → màu co còn **đúng "Đen"**, nhóm Khác
mất *Hàng mới về*, ô đang tick vẫn hiện, số kết quả (1). Bỏ tick → mọi thứ trở lại.
Mục nào sạch lựa chọn thì **ẩn cả mục** (chưa xảy ra với data hiện tại).

Nhờ nhánh "chưa tick thì bày đủ" mà **ô tìm thương hiệu** thêm hôm qua vẫn có
việc: mở panel ra là đủ 24 nhà mốt để gõ tìm. Chỉ sau khi người dùng đã lọc thì
danh sách mới co lại theo hàng còn khớp.

---

## Đã kiểm chạy

**desktop 1440:** badge *"Đặt trước"* nền `rgb(242,242,242)` mực `rgb(10,10,10)`
12/16, **đứng trước tên, cùng hàng**, tên **không cắt** (còn 172) · ảnh **không
còn** lớp badge · hàng tên cao 18 (badge không làm phình hàng) · quick-add
**chỉ còn lưới size** (không title, không dòng ngày) · badge ở **PDP** và
**giỏ hàng** cũng ra *"Đặt trước"*.
**mobile 375:** badge **cùng hàng** trước tên, tên bị cắt (còn 105 — đánh đổi đã
chốt) · EN ↔ VI đổi qua lại đúng · ô tìm thương hiệu cao 36 rộng 343, gõ "ferra"
ra Ferragamo · không tràn ngang.
**cả 5 file:** `node --check` khối script chính — sạch.

## Còn mở

1. **Nền badge.** Ảnh khách gửi trông như chip **TỐI** (nền sẫm, chữ sáng). Ở đây
   đang là **mặt xám `#f2f2f2`** — mặt thứ 2 hợp lệ của §2.2. Muốn đúng chip tối
   thì đó là **vai mặt tối thứ 4** ngoài 3 vai §2.2 đang cấp (nút · backdrop ·
   promo bar), phải **ghi danh ngoại lệ** trong `STYLE-RULES.md` như đã làm với
   chip `-%` của `skin-li`. Chờ bạn chốt.
2. **3 bản thử skin** chưa có badge trước tên (thiếu `.badge-label`/`.badge-inline`).
