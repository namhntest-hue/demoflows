# Kéo data Dolce&Gabbana + Zimmermann · trang thương hiệu · Gợi ý mua kèm bằng ảnh model

**Ngày:** 02/09/2026 · **File đụng tới:** `index.html`, `desktop.html`, `assets/`
**Nguồn data:** `shop.dafc.com.vn` (scrape 02/09/2026) — trang thương hiệu + trang chi tiết từng SKU.

---

## 1. Yêu cầu

1. Kéo dữ liệu D&G + Zimmermann về demo, y như cách đã làm với Versace (ảnh, giá, màu…).
2. Ở **Gợi ý mua kèm** (Complete the look) demo bằng **ảnh người mẫu** thay vì ảnh sản phẩm tĩnh.
3. (Chốt qua câu hỏi) Áp **cả 2 bản** mobile + desktop; tạo **trang thương hiệu riêng** cho từng
   hãng như `brand/versace`; **listing danh mục chung** hiện lẫn các hãng như một website thật.

---

## 2. Data đã kéo về

**24 SKU** — 12 Dolce&Gabbana + 12 Zimmermann, đặt ở **index 24–47** của `PRODUCTS`
(cuối mảng, KHÔNG chen vào giữa: router PDP và quick add định danh sản phẩm bằng index).

| Hãng | Nhóm hàng phủ được |
|---|---|
| Dolce&Gabbana (12) | Đầm · chân váy · 2 áo khoác · thắt lưng · 2 giày · khăn lụa · 2 túi · ví · nón |
| Zimmermann (12) | 6 đầm · chân váy ×2 · áo kiểu · quần culotte · playsuit · jeans · áo khoác |

Mỗi SKU mang: `img` · `brand` · `name` · `price` · `sizes` (bộ size thật) · `colors` (1 ô, tên màu
lấy ở dòng "Màu sắc" của trang thật hoặc tên colourway trong mô tả) · `multi` (hàng in hoạ tiết
đa sắc) · `heel` (SP nào trang thật ghi chiều cao gót) · `model` (xem §4).

**147 ảnh** tải từ `cdn.dafc.com.vn` (1200×1484) đặt tên `d1-0.jpg … z12-7.jpg` trong `assets/`,
khai đủ trong `PRODUCT_GALLERY[24..47]` — PDP và quick add dùng chung.

**24 entry `PRODUCT_INFO`** (mô tả · bảng thông số · gạch đầu dòng đặc điểm · hướng dẫn bảo quản),
kéo nguyên văn từ panel "Mô tả" / "Hướng dẫn bảo quản" của từng trang sản phẩm.

**2 wordmark** `brand-logo-dg.png` · `brand-logo-zm.png` — lấy từ chính CDN của DAFC
(`amasty/shopby/option_images/`), tách nền trong suốt, cao 54px.

> **Số TỰ TẠO — chỉ đúng 1 loại:** `off` / `was` (giảm giá) của 6 SKU, đúng nếp đã ghi ở đầu mảng
> `PRODUCTS` cho hàng Versace. Mọi thứ còn lại là data thật.

### Bẫy đã vá khi kéo data

**Unicode NFD vs NFC.** HTML của site trả tiếng Việt ở dạng **NFD** (`ơ` + dấu sắc rời), trong khi
toàn bộ `index.html` / `desktop.html` là **NFC**. Nếu bê thẳng thì chữ *nhìn giống hệt* nhưng so
chuỗi luôn sai — từ điển i18n tra trượt, tìm kiếm không khớp, `'Mới' in labels` trả false. Đã
chuẩn hoá NFC toàn bộ trước khi sinh code, và mọi patch đều assert `s == NFC(s)` trước khi ghi.

---

## 3. Trang thương hiệu — từ in cứng sang chạy bằng data

Trước lượt này màn `brand` **in cứng Versace**: breadcrumb, ảnh hero, logo, đoạn giới thiệu, dải
danh mục đều là hằng nằm thẳng trong markup. 25 hãng trong menu bấm cái nào cũng ra trang Versace,
và lưới đổ nguyên danh sách nên trang "Versace" liệt kê cả nước hoa Montblanc.

Nay tách thành `BRAND_PAGES` (khoá = tên hãng viết y hệt `PRODUCTS[].brand`):

| | Versace | Dolce&Gabbana | Zimmermann |
|---|---|---|---|
| Logo | `brand-logo.png` | `brand-logo-dg.png` | `brand-logo-zm.png` |
| Hero | `p1-1.jpg` / `brand-hero.png` | `d1-1.jpg` | `z2-1.jpg` |
| Mô tả | (như cũ) | 3 đoạn ở thân trang thật | đoạn meta description |
| Dải danh mục | 6 ô | 5 ô, ảnh của chính hãng | 5 ô cắt theo **nhóm đồ** |
| SP trên trang | 19 | 14 | 12 |

- `plpProducts()` thêm nhánh lọc theo hãng → trang thương hiệu chỉ hiện hàng của hãng đó.
- 25 hàng thương hiệu trong menu (cả mobile lẫn mega menu desktop) nay mang `data-plp-brand`,
  bấm là vào đúng trang. `brandKey()` quy `ZIMMERMANN` → `Zimmermann`.
- **22 hãng chưa có data** (TUMI, Burberry…) không còn dẫn nhầm sang Versace: trang vẫn dựng, tên
  hãng chạy chữ thay logo, không hero / không dải danh mục, lưới rơi về trạng thái 0 kết quả.
  Montblanc và Moschino có nước hoa trong `PRODUCTS` nên vẫn ra đúng 2 SKU.
- **Listing danh mục chung** không phải sửa gì: 24 SKU mới vào `PRODUCTS` là tự hiện lẫn —
  40 SP thời trang của 3 hãng trên một lưới.
- Cả 2 đoạn mô tả mới đã có khoá i18n, bản tiếng Anh dịch đủ (kể cả 5 nhãn dải danh mục
  Zimmermann).

**Zimmermann chỉ có 5 ô danh mục cắt theo nhóm đồ** (Đầm & áo liền quần · Chân váy · Áo sơ mi &
áo kiểu · Quần dài & quần shorts · Áo khoác ngoài) vì hãng này trên DAFC **chỉ bán quần áo** —
bịa thêm ô "Túi xách" cho đủ bộ là nói sai về hãng.

---

## 4. Gợi ý mua kèm → ảnh người mẫu

`PRODUCTS[].model` = **ảnh on-model có thật trong chính bộ ảnh của sản phẩm đó** trên site
(thường là tấm `-1`, vài SP là `-2`). Đã soi từng bộ ảnh để chọn, không đoán theo chỉ số.

- **27/48 SP có ảnh model**: 8 Versace + 7 D&G + 12 Zimmermann.
- SP không có (giày lẻ, nón, ví, khăn — site không chụp on-model) thì **bị loại khỏi dải**, chứ
  không để lọt vào rồi rơi về ảnh tĩnh: một dải nửa model nửa packshot đọc ra là lỗi.
- `lookProducts(selfIdx, n)` loại luôn **chính SP đang xem** (dải cũ luôn lấy `PRODUCTS.slice(0,n)`
  nên thẻ đầu thường là món đang mở), và **xoay theo `selfIdx`** để 6 PDP không ra cùng một bộ thẻ.
- `productCard` nhận option `model` → đổi nguồn ảnh, rơi về `p.img` nếu SP không có.

Áp ở **cả 4 khuôn dải**: rail 5 thẻ của 6 PDP mobile · `dkRailSection` (4 PDP desktop) ·
`dkLookSection` bản A (băng xám PDP#1) · bản B so le · `dkLookSectionC` magazine (PDP#2).
Dải **"Sản phẩm tương tự" giữ nguyên ảnh tĩnh** — hai dải nay nói hai chuyện khác nhau.

---

## 5. Phát sinh: PDP mở đúng sản phẩm được bấm

**Không nằm trong yêu cầu ban đầu, nhưng thiếu nó thì listing không "như một website thực tế".**

Trước lượt này chỉ SP#1–6 có màn PDP riêng; **mọi SP còn lại rơi về màn `pdp` vốn in cứng
`PRODUCTS[0]`** — bấm đầm Zimmermann lại mở đầm Versace. Hồi chỉ có 6 SP x1–x6 thì đây là lỗ nhỏ
đã ghi nhận; với 24 SKU mới thì nó chiếm **nửa danh mục**.

Đã sửa: thêm state `pdpIdx` + `goPdp(i)` dùng ở mọi lối vào PDP; màn `pdp` (cả 2 bản) đọc sản phẩm
qua đó. Kèm 5 chỗ phải rẽ nhánh theo data thay vì in cứng:

| Chỗ | Trước | Sau |
|---|---|---|
| CTA mobile | luôn "Đặt trước" + ngày giao | theo `P.preorder` |
| Ô chọn màu | `P.colors[0].name` → ném lỗi cả màn với SP không khai màu | có guard / `noColors` |
| Tab cuối | in cứng "Về thương hiệu Versace" | theo hãng của SP, lấy mô tả từ `BRAND_PAGES` |
| 2 tab Mô tả / Bảo quản | luôn dựng | bỏ hẳn khi SP chưa có `PRODUCT_INFO` |
| Nhãn "New Season / La Vacanza" | đè lên ảnh mọi SP | chỉ SP#1 (La Vacanza là BST Versace) |
| Thêm vào giỏ | `SCREEN_PRODUCT[current]` → luôn bỏ SP#1 vào giỏ | `screenProductIdx()` |
| Bộ size PDP mobile | luôn bộ IT 39–44 mặc định | bộ size thật của SP nếu có |

**Nhãn size:** `sizeLabel()` coi mọi chuỗi toàn số là hệ IT — đúng với bộ mặc định 39–44 nhưng sai
với Zimmermann (đánh 0–4 theo hệ riêng). `data-size` vẫn giữ **số thô** (hợp đồng đã ghi ở khối
`SIZES`: `OOS_MODE` / `SIZE_LOW_STOCK` / `DISABLED` tra bằng số thô), nhãn hiển thị đi đường mới
`data-size-label` + helper `chipSizeText()`. Bản desktop không phải sửa — chip bên đó vốn đã mang nhãn.

**2 lỗi rơi vãi cùng họ đã vá luôn** (do trước đây "có field `sizes`" đồng nghĩa "hàng làm đẹp",
nay hàng thời trang cũng mang size thật):
`p.sizes ? 'Dung tích' : 'Kích thước'` → đầm Zimmermann bị gọi là "Dung tích";
và link "Bảng kích thước →" bị ẩn nhầm ở hàng thời trang desktop.

---

## 6. Đã verify (trên trang chạy, 2 khổ)

| Hạng mục | Kết quả |
|---|---|
| 48 PDP × 2 bản | brand + bộ ảnh đúng SP, **0 lỗi** |
| Trang thương hiệu | Versace 19 · D&G 14 · Zimmermann 12 · TUMI 0 (empty state) |
| Listing danh mục chung | 40 SP, lẫn đủ 3 hãng |
| Bộ lọc | facet Thương hiệu lọc đúng; "Nhiều màu" bắt đúng 4 SP D&G in hoạ tiết |
| Bộ lọc dung tích (beauty) | vẫn đúng 7/8 nước hoa 100ml — size thời trang không lọt vào |
| Tìm kiếm "zimmermann" | 12 kết quả |
| Gợi ý mua kèm | dải đi ảnh `-1`/`-2` (model), "Sản phẩm tương tự" giữ ảnh `-0` |
| Thêm vào giỏ | đúng SP + đúng size ("Cát , 0" · "Carretto , 38" · SP#1 vẫn "Broken Jewels , IT 39") |
| i18n EN | mô tả 2 hãng + 5 nhãn danh mục Zimmermann dịch đủ |
| Console | sạch, cả 2 bản |
| `node --check` | 2 khối script × 2 file đều pass |

---

## 6b. Dải "Gợi ý mua kèm": bản A cho CẢ 6 PDP + căn lại spacing (đợt 2, cùng ngày)

Lệnh user: *"áp dụng cái layout gợi ý mua kèm vert 1 với title lớn và 3 hình vào các trang pdp
còn lại luôn, đồng thời căn chỉnh spacing chuẩn chỉnh phù hợp"*.

Trước đó mỗi PDP một kiểu — 6 màn cùng một vai mà nói ba giọng:

| | Trước | Sau |
|---|---|---|
| pdp | bản A (băng xám, tiêu đề 40, 3 ảnh) | bản A |
| pdp2 | bản C (magazine editorial) | **bản A** |
| pdp3–pdp6 | dải cũ: tiêu đề 18 trên + 5 thẻ | **bản A** |
| Kẻ trên "Sản phẩm tương tự" | chỉ pdp / pdp2 | **cả 6** |

`LOOK_VARIANT` nay áp cho **cả 6 PDP** chứ không riêng PDP#1, mặc định là A ở mọi màn.
Bản B và C **giữ lại làm công cụ so sánh** (`?look=b` · `?look=c`, đã kiểm chạy đúng ở mọi PDP),
tra qua bảng `LOOK_SECTIONS` thay vì chuỗi ternary ở chỗ gọi — thêm/bớt phương án sửa một chỗ.

### Căn lại spacing

Đo trước khi sửa: sau khi áp bản A, **nhịp dọc đã giống nhau ở cả 6 PDP** (không có màn nào lệch).
Việc còn lại là chữa 2 chỗ số đo *tự nó* chưa chuẩn:

**1. Cột chữ 282,6 → 282 — đây là chỗ sửa có giá trị nhất.**
Khung 1392 (1440 − 2×24), lưới 12 cột × 94 + 11 máng × 24. Cột chữ đúng bằng **3 cột = 94×3 = 282**.
Số cũ 282,6 là **sai số đo từ Figma**, và nó đẩy 3 thẻ về **329,8 px — lẻ pixel** (chính con số
"329,8" ghi trong comment bản A là dấu vết của nó). Về 282 thì mọi thứ khớp lưới, không còn pixel lẻ:

```
282 + 24 + 330×3 + 24×2 = 1344 = bề ngang trong băng   ✔ đo lại đúng 330,00
```

**2. Hằng cứng `margin-top: 273px` → phép cộng có tên.**
273 không nói ra nó gồm những gì, nên thẻ đổi chiều cao là ảnh đâm vào khối trên mà không ai biết
sửa số nào. Nay tách thành 2 biến:

- `--look-rise: 221px` — phần ảnh **trồi lên** khỏi mép băng = chiều cao thẻ (541) − (352 − 32)
- `--look-clear: 56px` — khoảng **hở** giữa đỉnh ảnh và khối phía trên

Đo ra khoảng hở cũ là **52** (273 − 221) — số duy nhất trong cả dải rơi ngoài nấc 8 (mọi số còn
lại là 32 / 24 / 16). Kéo lên **56** cho đồng nhịp → `margin-top` = 277. **Lệch 4px, không đổi bố cục.**
`--look-pad-y` / `--look-pad-x` / `--look-h` cũng đặt tên và lưới đọc theo biến thay vì lặp số.

### Nhịp dọc sau khi sửa (đo trên trang chạy, khung 1440)

```
khối tab/thông tin
   ↕ 56        ← --look-clear (cũ 52)
[ ảnh trồi lên 221 ]
[ băng xám 352 · đệm 32 · thẻ canh đáy ]
   ↕ 32
──── kẻ ────    (nay bật ở CẢ 6 PDP, trước chỉ 2)
   ↕ 32
"Sản phẩm tương tự"
```

### Verify

| | |
|---|---|
| 48 SP × 6 PDP | đủ 3 thẻ · **toàn ảnh model** · không thẻ nào là chính SP đang xem · tiêu đề có mặt — **0 lỗi** |
| Nhịp dọc | 56 / 352 / 32 / kẻ / 32 — **giống hệt nhau ở cả 6** |
| Lưới | cột chữ 282,00 · 3 thẻ **330,00** · tổng 1344 ✔ |
| Desktop hẹp < 1024 | băng xếp dọc, `margin-top` 32, thẻ 280 — giống nhau ở cả 6 |
| `?look=b` / `?look=c` | vẫn đổi khuôn đúng ở mọi PDP |
| Console · `node --check` | sạch |

## 6c. Chỉnh tiêu đề + bỏ kẻ ngăn (đợt 3, cùng ngày)

Lệnh user: *"bỏ cái line ngăn cách giữa sản phẩm tương tự và gợi ý mua kèm. ở title gợi ý mua kèm
bản desktop, ở chữ gợi ý sẽ font nhỏ hơn chữ mua kèm, chữ mua kèm sẽ ghi hoa ở chữ cái đầu"*.

**1. Bỏ kẻ ngăn.** `dkRailSection` thôi dựng `border-t`; tham số `rule` bỏ luôn vì không còn ai
truyền (để lại là tham số chết, đúng loại đã ghi ở §7). Lý do khớp với lần gỡ kẻ mép TRÊN của
chính băng xám hôm 31/08: mảng nền xám đã tự ngăn hai dải, thêm vạch nữa là **ngăn hai lần ở cùng
một mép**. **Đệm giữ nguyên 64** (32 py-8 ngoài + 32 pt-8 trong) — bỏ kẻ mà bỏ luôn pt-8 thì tiêu
đề dính lên đáy băng, đổ nhịp vừa căn ở §6b.

**2 + 3. Tiêu đề: dòng đầu nhỏ hơn + hoa chữ cái đầu dòng 2.**

```
Gợi ý          ← 24/32  (kicker)
Mua kèm        ← 40/50  (giữ nguyên bậc cũ)
```

- **Làm bằng `::first-line`, KHÔNG chẻ thành 2 `<span>`.** Chẻ ra là mỗi mảnh thành một text node
  riêng, mà máy dịch tra từ điển theo **từng text node** — và khoá `'Gợi ý'` **đã tồn tại** trong
  I18N (màn Search: `'Gợi ý' → 'Suggestions'`), nên dòng đầu sẽ bị dịch thành "Suggestions". Giữ
  một text node thì cả câu vẫn đi bằng **một khoá** như ghi chú ngắt dòng cũ đã dặn.
- **24/32 là bậc CÓ TRONG thang** trưng bày (T1 của FONT-LIBRE-INTER) — không mở thêm ngoại lệ nào
  ngoài bậc 40 vốn đã ghi danh.
- Text đổi `'Gợi ý\nmua kèm'` → `'Gợi ý\nMua kèm'` ở cả 3 khuôn A/B/C + khoá i18n.
  **Bản EN hoa theo** (`'Complete\nThe look'`) — user chốt lại sau khi tôi hỏi. Đây là chủ đích
  thiết kế chứ không phải lỗi chính tả: hai dòng đọc như **hai bậc chữ riêng** (kicker 24 +
  tiêu đề 40), không phải một câu bị ngắt đôi, nên mỗi dòng hoa chữ đầu của nó.
  Giá trị EN vẫn khác khoá một-dòng `'Gợi ý mua kèm' → 'Complete the look'` nên `I18N_REV`
  đảo ngược không đụng nhau (đã kiểm: EN → VI trả đúng `Gợi ý / Mua kèm`).
- **Bù quang học `.dk-look-aside` pt 16 → 2.** Dòng đầu xuống 24px nên phần leading trống phía trên
  dày thêm ~14, chữ bị đẩy tụt. Đo trên trang chạy: bản cũ (một bậc 40/50, pt 16) mực chữ nằm
  **48px** dưới mép băng; pt 2 với dòng đầu 24 ra **đúng 48** → giữ nguyên vị trí thị giác đã chốt,
  chỉ đổi cỡ chữ.

### Verify

| | |
|---|---|
| 48 SP × 6 PDP | tiêu đề đúng "Gợi ý\nMua kèm" · 3 thẻ toàn ảnh model · **không còn kẻ** · 0 lỗi |
| Bậc chữ | dòng 1 cao 30 (24px) · dòng 2 cao 50 (40px) — giống nhau ở cả 6 |
| Vị trí tiêu đề | mực chữ 48–49px dưới mép băng ở cả 6, **khớp bản trước khi đổi** |
| Đệm băng → "Sản phẩm tương tự" | **64**, không đổi |
| EN mode | `Complete / The look` (hoa cả 2 dòng), giữ tương phản cỡ 30/50; đảo về VI đúng nguyên văn |
| Desktop hẹp 1000 | kicker 30 / tiêu đề 50 / mực 48 / không kẻ |
| Console · `node --check` | sạch |

## 7. Còn mở

- **Hero Zimmermann không có mặt người mẫu.** Đây là giới hạn của NGUỒN chứ không phải chọn sai:
  toàn bộ ảnh e-comm Zimmermann trên DAFC đều **cắt ngang cằm ngay từ file gốc** (đã soi cả 12 bộ).
  Không tấm nào cho ra dải ngang 390×217 / 575×320 mà còn thấy mặt. Hero hiện lấy tấm có phom đồ
  mạnh nhất. Muốn có mặt người thì phải xin ảnh campaign từ khách.
- **3 bản fork skin** (`desktop-neutral` · `desktop-editorial` · `desktop-atelier`) **chưa port** —
  user chốt phạm vi là 2 bản chính.
- **22 hãng còn lại trong menu** vẫn là trang rỗng (không logo / hero / mô tả / sản phẩm). Cần
  quyết: kéo tiếp vài hãng nữa, hay ẩn bớt danh sách hãng trong menu demo.
- **Size hết hàng**: 24 SKU mới không món nào có size hết hàng (site không cho biết tồn kho), nên
  trạng thái "Tạm hết hàng" / "Nhận thông báo" chỉ demo được ở SP#1–6 như cũ.
- **`dkFilterBar(count)`**: tham số `count` là **tham số chết**, không render ra đâu cả. Không phải
  lỗi mới, nhưng dễ khiến người đọc sau tưởng trang thương hiệu đang hiện sai số đếm.
