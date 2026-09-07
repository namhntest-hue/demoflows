# Luật style & typography — `skin-mt`

> Bộ da mặc định khi vào trang, ở **cả 2 bản** (`index.html` 375, `desktop.html` 1440).
> Chốt 20/08/2026. Đây là văn bản **quy phạm** — khi có tranh chấp, luật này thắng số đo,
> thắng ghi chú trong code, thắng cả các quyết định lẻ đã ghi trong `README.md`.
> `README.md` giữ vai lịch sử (vì sao thành thế này); file này giữ vai luật (từ nay thế nào).
>
> **CẬP NHẬT 25/08/2026 — đổi stack:** dự án **không dùng Tailwind CSS và shadcn/ui** nữa.
> Luật §1–§7 dưới đây **giữ nguyên hiệu lực** (là luật thiết kế, không phải luật framework),
> chỉ đổi cách thi hành: CSS ngữ nghĩa viết tay + token, không utility class. Xem **Phần 8**.

---

## Phần 0 — Hiện trạng: skin-mt đang trộn những gì

Số đo lấy bằng `getComputedStyle` trên 9 màn (`plp · search · pdp · cart · checkout · account · order · login · privacy`),
chỉ tính phần tử **đang hiện** và **có text trực tiếp**.

| Trục | `index.html` (375) | `desktop.html` (1440) | Ghi chú trong code đang nói gì |
|---|---|---|---|
| Tổ hợp typo (cỡ×dòng×đậm×hoa×tracking) | **23** | **26** | *"hệ chữ của họ chỉ có 4 cỡ, tất cả 400, tất cả ls .5"* |
| Cỡ chữ thật đang vẽ | 9 · 10 · 12 · 14 · 16 · 18 · 24 → **7 cỡ** | 9 · 10 · **11** · 12 · 14 · 16 · 18 · 24 → **8 cỡ** | thang dự án cấm 11 (`README` §Thang chữ) |
| Line-height ở **cùng cỡ 12px** | 20px(1320) · 16px(516) · 18px(319) · 24px(34) → **4 nhịp** | 20px(1486) · 16px(760) · 18px(249) → **3 nhịp** | *"line-height: chưa mang sang"* |
| Line-height ở cùng cỡ khác | 18px→28/27/25 · 14px→20/18 · 10px→12/15 | 14px→24/20/21 · 11px→16/16.5 · 16px→28/24 | — |
| Độ đậm | 400 (1343) · **500 (951 = 41%)** | 400 (1800) · **500 (1045 = 37%)** | *"toàn bộ 400, 3 ngoại lệ"* → thực tế **8+ chỗ** |
| Tracking | 0.5px(2228) + **4 giá trị rò** (1.44 · 0.225 · 0.3 · 0.25) | 0.5px(2723) + **6 giá trị rò** | *"tất cả ls .5px"* |
| Sắc viền | **5 tông xám** cfcfcf(3092) · dfdfdf(2049) · ececec(92) · 333(8) · f2f2f2(4) + đen 2 độ dày | **6 tông** | *"luật 2 tầng: #000 1px + #dfdfdf 1px"* |
| Bo góc | 9999px(346) · 3px(24) | 9999px(266) · **999px(72)** · 3px(48) · **8px(18)** | *"bộ da này vuông góc mọi chỗ"* |
| Đổ bóng | 3 công thức còn sống | 3 công thức | *"KHÔNG đổ bóng, đi hẳn hướng phẳng"* |
| Mặt xám | #f2f2f2 **và** #f7f7f7 (cách nhau 5/255) + #fef2f2 | như trên | *"mảng xám chỉ đậm hơn canvas 5/255 → lem nhem"* — chính code nêu ra rồi vẫn dùng cả hai |

### Cùng một markup, hai bản vẽ ra hai cỡ khác nhau

Bảng remap của 2 file **không khớp nhau ở 5 trong 12 cỡ**:

| Utility trong markup | `index.html` vẽ ra | `desktop.html` vẽ ra | |
|---|---|---|---|
| `text-[11px]` | 12 | **11** | lệch |
| `text-[13px]` `text-[14px]` `text-[15px]` | 12 | 12 | khớp |
| `text-[16px]` | 12 | **14** | lệch |
| `text-[18px]` | **18** | 16 | lệch |
| `text-[22px]` | **24** | 18 | lệch |
| `text-[24px]` | **24** | 18 | lệch |
| `text-[32px]` | 24 | 24 | khớp |

Hệ quả: cỡ 18px ở mobile là **tiêu đề mục**, còn 18px ở desktop là **tiêu đề trang** —
cùng một con số mang hai vai. Không ai đọc code mà đoán được điều đó.

### Nguyên nhân gốc — chỉ có một

`skin-mt` không phải một hệ chữ. Nó là **một lớp remap đè lên markup mang hệ chữ khác**,
và mỗi lần remap chỉ chạm **một trục**:

* đổi cỡ mà không đổi dòng → `text-[14px] leading-5` thành **12/20 = tỉ lệ 1.67** (markup có ý 14/20 = 1.43)
* đổi đậm bằng khối chặn `.font-*` → phần tử **không** mang class `font-*` thì kế thừa, thoát khối chặn
* đặt tracking ở `body` → utility `tracking-[…]` trên chính phần tử vẫn thắng (thừa kế luôn thua khai báo trực tiếp)

Mỗi trục lệch sinh ra một tổ hợp lai. 3 trục × vài chục điểm = 23–26 tổ hợp.
**Không phải lỗi thẩm mỹ, là lỗi kiến trúc.** Sửa từng chỗ sẽ sinh chỗ mới; phải sửa cách remap.

### Cái đã hỏng nặng nhất: cơ chế phân xử

Bộ da này lấy *"số đo mytheresa"* làm trọng tài. Nhưng trong code đã có **12+ chỗ ghi rõ
"lệch số đo có chủ ý"** (weight menu 500, vách accordion #dfdfdf, giữ đỏ destructive,
tracking nhãn hoa 0.15em, cỡ dept 14 vs 12, chữ nội dung #333, hộp giỏ theo maison kitsune…).
Trọng tài không còn phân xử được gì → **mỗi yêu cầu mới thành một ngoại lệ mới**.
Đó là lý do danh sách "3 ngoại lệ weight" đã âm thầm thành 8, và 500 chiếm 41% chữ trên trang.

Luật dưới đây thay trọng tài: hỏi *"vai này là gì"*, không hỏi *"mytheresa đo ra bao nhiêu"*.

---

## Phần 1 — Luật typography

### 1.1 Hai họ chữ, không có họ thứ ba

Mọi chữ trong `skin-mt` thuộc **đúng một trong hai họ**. Không có trạng thái lai.

| | **Họ nội dung** | **Họ nhãn** |
|---|---|---|
| Là gì | thứ người ta ĐỌC | thứ GỌI TÊN một nhóm |
| Độ đậm | **400** | **500** |
| Chữ hoa | không | **có** (`text-transform`) |
| Tracking | 0.5px | 0.5px |
| Ví dụ | tên sản phẩm · giá · mô tả · nhãn form · thông báo lỗi · chữ trên nút | nav ngành hàng · nhãn nhóm menu · tiêu đề mục bộ lọc · nhãn nhóm footer |

**Luật then chốt:** `500` và `chữ hoa` là **một cặp không tách rời**.

* Muốn một chữ nổi hơn → hỏi *nó là nhãn hay nội dung?*
  * Là **nhãn** → cho nó cả hai: 500 + hoa.
  * Là **nội dung** → **lên một bậc cỡ chữ**, tuyệt đối không nâng độ đậm.
* Cấm: 500 mà chữ thường. Cấm: chữ hoa mà 400.
* Cấm hẳn 300 · 600 · 700 · `<b>` · `<strong>` đậm hơn 500.
* **Ngoại lệ ghi danh — duy nhất (user chốt 20/08/2026, giữ yêu cầu cũ):** tầng trigger
  bộ lọc (`#filterSheet .facc`) giữ `500` chữ thường. Danh sách ngoại lệ này ĐÓNG;
  chỗ thứ hai muốn 500 chữ thường thì quay về luật: lên bậc cỡ.

> Luật này tồn tại để dập một loại yêu cầu: *"tăng font weight lên 1 nấc"*.
> Từ nay câu trả lời không phải "nấc nào" mà là "nó là nhãn hay nội dung".

### 1.2 Thang chữ — 7 bậc, **giống hệt nhau ở cả 2 bản**

| Mã | Vai | Cỡ / dòng | Tỉ lệ | Họ |
|---|---|---|---|---|
| `T1` | Tiêu đề trang (auth, "Đặt hàng thành công") | **24 / 32** | 1.33 | nội dung |
| `T2` | Tiêu đề mục · tiêu đề sheet · tiêu đề modal | **18 / 24** | 1.33 | nội dung |
| `T3` | Nhãn cấp 1 — nav ngành hàng, tiêu đề panel | **14 / 20** | 1.43 | **nhãn** |
| `T4` | Thân bài một dòng — hàng danh sách, nút, giá, nhãn form | **12 / 16** | 1.33 | nội dung |
| `T5` | Thân bài nhiều dòng — mô tả, tên sản phẩm 2 dòng, đoạn văn | **12 / 18** | 1.50 | nội dung |
| `T6` | Nhãn cấp 2 — nhãn nhóm menu/footer/filter, tên chương trình | **12 / 16** | 1.33 | **nhãn** |
| `T7` | Vi mô — số trong badge giỏ, nhãn phương thức thanh toán | **10 / 14** | 1.40 | tuỳ vai |

**5 cỡ chữ: 10 · 12 · 14 · 18 · 24.** Hết. Không có 9 · 11 · 13 · 15 · 16 · 20 · 22 · 32 · 48.

Vì sao **bỏ 16**: mytheresa không có cỡ 16 nào ở cả hai khổ; 16 hiện tại ở desktop là do
remap `18 → 16` *tự sinh ra*, không phải từ số đo. Bỏ nó cho bước nhảy 14 → 18 đủ rộng để
đọc ra phân cấp.

Vì sao **giữ 10** dù thang Figma không có: badge số trong giỏ và nhãn `VISA`/`TIKINOW` là
pill có chiều cao cố định, nâng lên 12 là vỡ pill. Đây là **ngoại lệ duy nhất** ngoài thang
Figma, và bị khoá vào đúng 2 vai đó.

Vì sao **hai bản giống nhau**: divergence 5/12 cỡ ở bảng trên là nguồn lỗi thật, không phải
tính năng. Một bản demo dùng để chốt thiết kế thì "cùng markup, khác kết quả" là hỏng.
Khác biệt responsive nằm ở **bố cục và mật độ**, không nằm ở thang chữ.

> **CỤM ACCORDION PDP — NHỊP CHỐT CUỐI 25/08/2026: nhãn 14/20 · nội dung 12/16.**
> Lệnh user: *"nội dung bên trong accordions sẽ là font size 12, title accordions giữ ở 14"*,
> phạm vi user chốt là **"cả demo, mọi bộ da"**. Nhịp này **DẸP mọi biến thể dựng trong ngày**
> (xem lịch sử ở cuối mục): 6 bản PDP nay giống hệt nhau trong từng bộ da, và 5 bộ da chỉ còn
> khác nhau ở **chữ hoa / độ đậm**, không khác ở **bậc cỡ**:
>
> | bộ da | nhãn | nội dung |
> |---|---|---|
> | mặc định · `skin-mp` | 14/20 · 400 · thường | 12/16 · 400 |
> | `skin-mt` | 14/20 · **500 · HOA** | 12/16 · 400 |
> | Maika (`skin-mt skin-mk`) | 14/20 · **500** · thường | 12/16 · 400 |
> | `skin-li` (`skin-mt skin-li`) | 14/20 · **500** · thường | 12/**18** · 400 |
>
> Vì sao nhãn 14 mà nội dung 12: đúng cặp **T3 14/20 (họ nhãn) + T4 12/16 (họ nội dung)** của
> bảng trên, và đúng nhịp §1.1 "nhãn hơn nội dung một bậc cỡ". Mọi bộ da đều cần rule riêng
> vì khối remap của chúng kéo `text-[14px]` về 12/18 — để yên là nhãn nhỏ bằng nội dung.
> Vì sao **riêng `skin-li` lấy 12/18**: đó là Inter và là đoạn văn xuống dòng — ca mà **F5**
> của `FONT-LIBRE-INTER.md` đòi tỉ lệ 1,5; 12/18 cũng đúng bằng 6 hook rà F5 của bộ da đó,
> nên thân accordion nằm chung họ với mọi đoạn 12px khác của nó. 4 bộ da còn lại chạy
> Montserrat và có thân 12px ở 12/16, nên theo 12/16.
> **Bảng thông số pdp2** đi cùng nội dung (`:is(div, p, span)`); muốn trả nó về 12/16 trong
> `skin-li` — nó là hàng một dòng, đúng ra 1,33 — thì tách `span` ra một rule.
> **Chưa đụng:** accordion **checkout / giỏ / footer** — không mang móc `[data-pdp-acc]`.
>
> *Lịch sử trong ngày (đã bị nhịp trên thay thế, giữ để đọc ra vì sao):* PDP2 từng riêng
> 12/16·500·HOA · PDP3 từng riêng cả cụm 14/20 · Maika và `skin-li` từng để nội dung 14/20.
> Cả 3 biến thể nay đã tan; **6 bản PDP không còn khác nhau ở cụm accordion**, muốn so 6 bản
> thì phải cấp nét khác.

> **Bộ da `skin-li` lấy đúng quyết định này (25/08/2026, lệnh user: *"Trong pdp ở skin-li, các
> accordions sẽ không uppercase toàn bộ, chỉ tăng font lên 14, tăng nhẹ font weight là được"*):**
> cả **6 bản PDP**, cả 2 khổ — nhãn **14/20 · 500 · chữ thường**, nội dung và bảng thông số
> **14/20 · 400 · chữ thường**. Số giống Maika từng con một, cố ý, để 2 bộ da không đẻ bậc thứ
> ba. Trước đó `skin-li` đang có **3 mức** ở cụm này (nhãn 12/16·500·HOA · pdp3 14/20·500·HOA ·
> nội dung 12/18 với bảng thông số pdp2 12/16).
> `skin-mt` vẫn giữ 3 mức khác nhau để còn so. Khối *"CỤM ACCORDION PDP: MỘT CỠ 14"* trong khối
> `skin-li`, khai giống hệt ở 2 file. **Kèm theo:** thân accordion PDP phải RA KHỎI danh sách rà
> F5 12/16→12/18 của `skin-li` — hook đó (0,5,2) thắng rule mới (0,4,2), để lại là nhãn 14 mà
> thân 12.
>
> ⚠ **Phần NỘI DUNG của ghi chú này đã bị nhịp chốt cuối ngày thay thế** (xem khối "CỤM
> ACCORDION PDP — NHỊP CHỐT CUỐI" ở trên): nội dung + bảng thông số của `skin-li` nay là
> **12/18**, không còn 14/20. Nhãn thì giữ nguyên **14/20 · 500 · chữ thường** như ghi chú này.
> Việc "ra khỏi danh sách rà F5" vẫn đúng về cơ chế — cỡ/dòng do rule mục 7 quyết — chỉ là hai
> chỗ nay cùng số 12/18.

### 1.3 Line-height đi kèm cỡ chữ, không bao giờ tách rời

**Luật:** mọi rule đổi `font-size` trong `skin-mt` **bắt buộc** khai luôn `line-height`.
Rule chỉ khai một mình `font-size` là **vi phạm**, không cần bàn thẩm mỹ.

Chọn dòng theo việc chữ có xuống dòng hay không:

* Chữ **không xuống dòng** (nằm trong hàng cao cố định `h-4`/`h-9`/`h-10`/`h-11`) → tỉ lệ **1.33**
* Chữ **có thể xuống dòng** → tỉ lệ **1.50**

Vì sao 1.50 chứ không phải 1.4 như số đo của họ: **tiếng Việt có dấu trên và dấu dưới**
(`ề` `ộ` `ậ`). mytheresa là site tiếng Anh — 1.4 của họ không tính chi phí dấu. 1.5 là mức
tối thiểu để dấu hai tầng không chạm dòng kế ở khối chữ nhiều dòng. Đây là **lệch số đo có
căn cứ**, không phải sở thích.

### 1.4 Tracking — đúng một giá trị

`letter-spacing: 0.5px` cho **mọi** chữ, mọi cỡ, mọi họ.

Cấm mọi utility `tracking-*` trong markup thuộc phạm vi bộ da. Hiện markup còn
**9 giá trị ở mobile · 5 ở desktop** (`tracking-wide` · `tracking-wider` · `tracking-normal` ·
`[0.002em]` · `[0.004em]` · `[0.005em]` · `[0.08em]` · `[0.12em]` · `[0.2em]` · `[0.22em]`).
Bộ da phải tự vô hiệu hoá chúng — xem §4.1.

### 1.5 Chữ hoa — 4 vai, đóng danh sách

Quy ước toàn dự án là **không dùng UPPERCASE**. `skin-mt` là ngoại lệ **có giới hạn**, và
đây là danh sách đóng:

> **CẬP NHẬT 25/08/2026 — vai 1 và vai 2 KHÔNG còn là ngoại lệ của riêng `skin-mt`.**
> Chốt user: *"Thanh menu header 2 thiết bị sẽ theo skin-mt (có thể khác font tùy theo set
> up) áp dụng các skin còn lại"*. Thanh menu nay là **một khuôn chung cho MỌI bộ da** ở cả 2
> bản: `skin-mp` đã lấy chữ hoa 24/08, Maika lấy trọn bộ số từ đầu, và **bộ da mặc định**
> (`SKINS` ô `['default', …, '']`) áp 25/08 — khối *"THANH MENU: MỘT KHUÔN CHUNG THEO
> skin-mt"*, khai giống hệt ở `index.html` và `desktop.html`, bám
> `html:not([class*="skin-"])`.
> Hệ quả phải nói rõ: lý lẽ *"ngoại lệ AN TOÀN vì nằm trong một bộ da phải tự bật, mặc định
> của file không đổi"* — ghi ở đầu khối nav của cả 2 file — **hết hiệu lực cho vai 1 + vai 2**.
> Mở demo ra là thấy menu chữ hoa, không cần bật bộ da nào. Vai 3–7 vẫn chỉ sống trong
> `skin-mt`.
> **Font KHÔNG đi theo:** khối chung chỉ chạm CỠ · DÒNG · ĐẬM · HOA · TRACKING, không khai
> `font-family` — mỗi bộ da giữ mặt chữ của set up riêng (mặc định Montserrat, `skin-mp` /
> Maika Inter + Libre Bodoni).
>
> **SIẾT THÊM 25/08/2026 — menu header khổ DESKTOP luôn chữ hoa, không có ngoại lệ nào**
> (lệnh user: *"menu header bản desktop ở mọi phiên bản mọi skin, mọi font đều phải uppercase
> nhé"*). Hai chỗ phải xử, đo ra mới thấy:
> * **`desktop.html`, khi đang THỬ CẶP FONT:** khối `.font-pair` trả `text-transform: none` cho
>   `.dk-dept`/`.dk-nav-link`/nhãn mega và **không phân biệt bộ da** → đo được **4/5 bộ da mất
>   chữ hoa**; chỉ `skin-mp` giữ được vì nó là bộ DUY NHẤT có bản vá (24/08). Nay gỡ tiền tố
>   `skin-mp` khỏi bản vá đó → một rule phủ cả 5 bộ da. **Việc này ĐẢO ghi chú cũ**
>   *"skin-mt CỐ Ý không có rule này"*.
> * **3 bản fork desktop** (`desktop-neutral` · `desktop-editorial` · `desktop-atelier`): đóng
>   băng từ 21/08 nên **chưa hề có** khối khuôn menu chung của 25/08 — đo được menu chữ THƯỜNG
>   ở mọi bộ da trừ `skin-mt`. Đã thêm một khối cuối `<style>` mỗi file.
>   Khối đó khai **cả `font-weight: 500`**, không chỉ `text-transform`: các fork đang để
>   `.dk-dept` ở **600** (§1.1 cấm hẳn) hoặc **400** (hoa-mà-400, §1.1 cấm đích danh) — thêm hoa
>   mà không sửa nấc đậm là đổi một vi phạm thành vi phạm khác.
>   **CỐ Ý không chạm CỠ/DÒNG** ở các fork: mỗi bản có thang menu riêng (16/24 · 14/20 · 12/16)
>   và đó là bố cục của nó; kéo về 12/16 như khuôn chung là đổi nhịp thanh header, cần chốt riêng.
> **Chưa vào phạm vi, ghi rõ:** `.search-tab` (hàng tab ngành hàng ở màn Search, nằm NGOÀI
> `.navbar`) vẫn về chữ thường khi thử cặp font — nó không phải menu header. Và **khổ MOBILE
> không sửa** trong lượt này: ở đó `.font-pair` giết chữ hoa của `.ms-tab` + `.search-tab`, và
> bản vá vẫn chỉ có cho `skin-mp`.
> **Số áp là số ĐO ĐƯỢC của `skin-mt`, không phải số của luật** (user chốt lấy số đo đang
> chạy). Nên 2 chỗ lệch dưới đây nay có mặt ở cả 4 bộ da, và phải sửa CÙNG LÚC cả 4 + `home.html`:
> · hàng danh mục drawer để **HOA + 400** — nửa cặp mà §1.1 cấm, và Phần 6 việc 7 đã chốt
>   *"mọi chữ hoa lên 500"*;
> · nav ngành hàng ở khổ desktop để **12/16** trong khi §1.2 ghi T3 **14/20 giống hệt cả 2 bản**
>   (mobile đang đúng 14/20).
> **Còn 1 chỗ CHƯA theo khuôn chung, cố ý:** `.dk-nav-link` của `skin-mp` giữ **14/20** (thang
> nav 2 tầng — *"cỡ chữ thoáng hơn chính là chữ ký editorial của bộ da này"*, chốt 24/08), và
> `.search-tab` của `skin-mp`/Maika giữ **12/16 · 400 · chữ thường** (chốt 24/08 xếp hàng tab
> màn Search ra ngoài "bộ menu"). Chờ user quyết có kéo 2 chỗ này vào khuôn chung hay không.


1. Nav ngành hàng + nav danh mục — `.dk-dept` · `.dk-nav-link` · `.ms-tab` · `.search-tab`
2. Nhãn nhóm trong menu / mega panel — `.ms-view > p` · `.dk-mega-grid > div > p` · tiêu đề màn con
3. Tiêu đề panel + tiêu đề mục trong bộ lọc — `#filterSheet` 2 tầng nhãn
4. Nhãn nhóm ở footer *(21/08/2026: **tên chương trình quà tặng RÚT KHỎI vai này** — user đảo chốt 20/08: "tên chương trình không cần uppercase". Nó về họ nội dung · 400 · mực chính; khối quà nhấn bằng mặt nền, xem §2.3. **31/08/2026 user cho cỡ LÊN 1 BẬC: 12/16 → 14/20** — lệnh *"tăng font của title chương trình lên 1 bậc, và áp dụng cho cả quà tặng của đơn hàng bên dưới luôn"*; áp cho cả 3 chỗ cùng vai (quà kèm sản phẩm · quà theo mốc đơn · ô mốc kế tiếp) ở **CẢ 2 BẢN**. Weight vẫn 400 — §1.1 khoá 500 vào chữ hoa, user chỉ hỏi cỡ. Phải khai `font-size` trong rule bộ da vì blanket remap `13–16 → 12/18` sẽ kéo `text-[14px]` về lại 12)*
5. Nhãn nhóm & nhãn mở mục trong giỏ — trigger "Bạn có phiếu mua hàng?", **2 title của
   panel ưu đãi** ("Ưu đãi thành viên" + "Ưu đãi & khuyến mãi"), và **hàng "Tổng cộng"**
   (nhãn hàng tổng + con số — số không có chữ cái nên hoa vô hại)
   *(thêm 20/08/2026 khi chốt việc 8A; mở rộng "Tổng cộng" tối 20/08 — C4a: user muốn
   500, luật buộc trọn cặp → thành nhãn thay vì đẻ ngoại lệ thứ hai)*
   *(Cập nhật 24/08/2026 — đợt đồng bộ 2 khối ưu đãi về một concept "title + nội dung":
   nhãn "Ưu đãi & khuyến mãi" **chuyển vai** từ nhãn-trong-nút sang **title của khối**, và
   khối thành viên có title cùng bậc. Vai không nở thêm chỗ nào: hàng bấm còn lại là chữ
   HÀNH ĐỘNG "Chọn mã ưu đãi" → họ nội dung 12/18 · 400, **không hoa**. Title khối thành
   viên phải rút chữ còn "Ưu đãi thành viên": tên chương trình "DAFC Rewards" bị mục 4 cấm
   viết hoa, nên tên chương trình lùi vào nội dung/toast, nhãn dùng tên chức năng.)*
6. ~~Tên thương hiệu — `.pc-brand`~~ **ĐÃ RÚT KHỎI DANH SÁCH 24/08/2026** (user: *"tên brand
   không cần uppercase toàn bộ"*, đảo chốt C1 20/08). Brand nay là **họ nội dung: T3 14/20 ·
   400 · chữ thường · mực chính**, ở cả 3 vị trí (card + hàng gợi ý, PDP + quick-add, hàng
   trong giỏ). Bỏ hoa → bỏ luôn 500 theo §1.1; yêu cầu "brand nổi hơn tên sản phẩm" (còn hiệu
   lực từ 18/08) chuyển sang đúng đòn bẩy của họ nội dung: **lên 1 bậc cỡ** (brand 14 vs tên
   sp 12). Đo trước khi sửa: brand chỉ hơn tên sp 34/255 về mực nên mực một mình không gánh
   được phân cấp — cùng kết luận với việc 8.

7. **Nhãn accordion PDP — cả 6 bản** — `[data-pdp-acc] .acc-trigger > span`
   *(thêm 25/08/2026 cho riêng PDP2 theo lệnh "ở trang PDP ver số 2… uppercase hết trên font
   12", rồi **mở ra cả 6 bản cùng ngày**: "ở skin-mt uppercase rồi cũng tăng fontweight cho
   accordion luôn nhé")*. Nhãn chuyển từ họ nội dung sang **họ nhãn T3 14/20 · 500 · HOA** —
   bậc cỡ chốt lại cuối ngày, xem "NHỊP CHỐT CUỐI" ở §1.2. §1.1 buộc hoa đi cặp với 500.
   Đây **không phải khuôn mới**: accordion **footer** và **giỏ hàng** của `skin-mt` đã là
   500 · HOA từ trước (đo 25/08) — cụm PDP ở 400 · chữ thường mới là chỗ lệch, nay hết.
   Nội dung + bảng thông số bên trong accordion **vẫn chữ thường 400 · cỡ 12** — xem "Không
   bao giờ hoa" ngay dưới; muốn nội dung nổi thì lên bậc **cỡ**, không nâng độ đậm.
   Chữ hoa do **bộ da** quyết, không nằm trong markup: markup 6 bản dùng chung khuôn, nhờ vậy
   `skin-mp` / Maika / `skin-li` không dính chữ hoa. Đã thêm vào danh sách `.font-pair`.
   Khai **giống hệt ở cả 2 file**. Vai HOA này **chỉ sống trong `skin-mt`**: 4 bộ da kia dùng
   cùng bậc cỡ nhưng để chữ thường (§1.2).
   ⚠ **Hệ quả:** 6 bản PDP không còn khác nhau ở cụm accordion trong bất kỳ bộ da nào.

**Không bao giờ hoa:** tên sản phẩm · giá · chữ trên nút · nhãn form ·
thông báo lỗi · nội dung hàng trong danh sách (kể cả hàng cấp 2 của drawer) · đoạn văn.

**Luôn viết hoa bằng `text-transform`, không gõ hoa vào chuỗi** — chuỗi gốc là key i18n,
gõ hoa vào là mất bản dịch.

Muốn thêm vai mới vào danh sách này thì phải sửa file này trước, sửa CSS/Figma sau.

> **Miễn trừ khi đang THỬ CẶP FONT (24/08/2026, yêu cầu user):** class `.font-pair` (bật khi
> chọn một cặp heading+body trong popover Cài đặt) **tắt toàn bộ chữ hoa** của các vai trên.
> Lý do: uppercase che phần chữ thường (x-height, đuôi g/y, bụng a/e) — đúng chỗ để nhận ra
> một mặt chữ serif, nên ép hoa làm hỏng việc thử. Bỏ chọn cặp là các vai hoa trở lại nguyên
> trạng; đây là hành vi của CÔNG CỤ THỬ (§5), không phải sửa mặt tiền bộ da.

### 1.6 Mặt chữ

`Montserrat` 300–700, gọi qua `--font-app`. Không serif. Không mặt chữ thứ hai.
(Nút chọn phông trong popover Cài đặt là công cụ dev — xem §5. **Miễn trừ ghi rõ 24/08/2026:**
mục "Cặp font · heading + body" trong popover đó **được** cấp 2 mặt chữ cùng lúc — heading qua
`--font-head`, body qua `--font-app` — vì đó là công cụ THỬ để chốt hệ chữ, không phải trạng
thái mặc định của bộ da. Nếu sau này chốt dùng thật một cặp thì **phải sửa mục 1.6 này trước**,
rồi mới đưa vào bộ da.)

**CẬP NHẬT 25/08/2026 — khách ĐÃ CHỐT một cặp, điều kiện trên đã kích hoạt.**
Khách chọn **Inter (thân bài) + Libre Bodoni (trưng bày)**. Phạm vi áp: **chỉ bộ da Maika**
(`skin-mp skin-mk`) — `skin-mt` giữ nguyên Montserrat cho tới khi khách nói khác. Với Maika,
cặp 2 mặt chữ **không còn là công cụ thử** mà là trạng thái thật, nên miễn trừ ở trên hết vai
"tạm thời" và được thay bằng một văn bản quy phạm riêng: **`FONT-LIBRE-INTER.md`**.

Bốn điểm của luật đó đụng thẳng vào Phần 1 này, ghi ở đây để đọc §1 không hiểu nhầm:

* **§1.2 (thang đóng ở 24):** Maika **mở thêm 2 bậc trưng bày** — `T0` 32/40 và `T00` 48/60 —
  vì nét mảnh Libre Bodoni chỉ đạt 1 pixel thiết bị từ cỡ 32 (đo: nét mảnh = 0,031 × cỡ).
  Hai bậc này vốn có sẵn trong thang text style Figma, không phải bịa mới. **Chỉ Maika.**
* **§1.4 (tracking đúng một giá trị 0,5px):** Maika lệch **đúng 2 chỗ, ghi danh** — `T0`/`T00`
  dùng `0` (serif Didone tự có nhịp chân chữ), `T0h` chữ hoa dùng `+2px`. Thân bài Inter giữ
  nguyên 0,5px.
* **§1.6 (không mặt chữ thứ hai):** với Maika là **hai** — Inter mọi bậc ≤ 24, Libre Bodoni
  **chỉ** bậc ≥ 32. Ranh giới là bậc cỡ, không phải thẻ `h1/h2/h3`.
* **§1.3 (cỡ và dòng đi thành cặp):** Maika **cấm `font-size-adjust`**, vì nó làm cỡ dùng thật
  khác cỡ khai và mọi phép tính nhịp dòng sai theo.

Ngoài ra `FONT-LIBRE-INTER.md` nâng một luật mềm thành luật cứng: dấu `ằ` của Inter cao **93/100**
(Montserrat 83), nên bậc **12/16 chỉ dùng cho chữ chắc chắn một dòng** — chữ có thể xuống dòng
phải là 12/18. Ở skin-mt đây là chuyện nhịp; với Inter là chuyện chạm dấu.

---

## Phần 2 — Luật màu & mặt phẳng

### 2.1 Mực — 3 bậc, không hơn

| Vai | Màu | Dùng ở |
|---|---|---|
| Mực chính | `#0a0a0a` | tiêu đề · nhãn · giá · chữ trên nền trắng nói việc chính |
| Mực nội dung | `#333333` | chữ chạy, mô tả — 12.6:1 trên trắng |
| Mực phụ | `#666666` | chú thích, giá gạch, trạng thái nghỉ — 5.7:1 |

Không có bậc thứ tư. Không có mực xám nhạt hơn `#666666` cho chữ **đọc được**.

### 2.2 Mặt phẳng — 2 mặt, không hơn

| Vai | Màu |
|---|---|
| Mặt mặc định | `#ffffff` |
| Mặt xám | `#f2f2f2` |

**Bỏ `#f7f7f7`.** Hai xám cách nhau 5/255 là hai xám *không phân biệt được* — chính comment
trong code đã gọi nó là *"mảng lem nhem"* rồi vẫn dùng cả hai (canvas giỏ `#f7f7f7`,
mặt phụ `#f2f2f2`).
*(Cập nhật 21/08/2026 — user đảo chốt canvas giỏ: **màn giỏ về NỀN TRẮNG, không đóng hộp**,
theo hướng bộ da editorial — "không bị trong khuông khổ". Các khối cột trái phân nhóm bằng
kẻ mảnh; chỉ khối quà tặng mang tấm nền nhấn accent-0 (ngoại lệ §2.3); cột tóm tắt desktop
giữ hộp. Câu "canvas giỏ về #f2f2f2" phía trên hết hiệu lực; việc khai tử #f7f7f7 cho các
MẶT còn lại vẫn giữ.)*
*(Cập nhật 24/08/2026 — lệnh user: **block tổng tiền của giỏ lấy lại mặt xám `#f2f2f2`**,
full-bleed, theo bản Figma (ngoại lệ §2.3 mục 2). Nền TRANG giỏ vẫn trắng — đây là một VÙNG
xám trong dòng chảy, không phải canvas. Trên màn giỏ nay có 2 vùng nền: quà `#f7f7f7`
(accent-0) và block tổng `#f2f2f2` (mặt xám) — cách nhau 1 nấc, đúng quan hệ Figma đặt giữa
2 khối này; cặp này KHÔNG mở lại `#f7f7f7` cho các mặt khác.)*

**Bỏ mặt hồng `#fef2f2`** trên badge `-20%`. Giữ **chữ đỏ** (đã chốt: badge giảm giá và viền
lỗi form phải đọc ra là cảnh báo), nhưng bỏ nền tô — đây là mảng màu **duy nhất** trên toàn
bộ bộ da, và bộ da này nhấn bằng chữ hoa + kẻ mảnh chứ không bằng mảng màu.
*(Cập nhật 25/08/2026 — lệnh user: **riêng `skin-li` thêm lại nền đỏ cho discount chips**.
Lệch ghi danh, phạm vi đúng một bộ da: rule mục 9 khối skin-li trả chip về nguyên trạng
markup — nền token `--unofficial-destructive-subtle` #fef2f2 + đệm 2px 4px, cả 2 bản.
`skin-mt` trơn và các bộ da khác giữ nguyên chốt "bỏ nền tô" ở trên. Ghi chú "mảng màu
duy nhất" vì thế chỉ còn đúng cho skin-mt; ở skin-li mảng màu duy nhất là chính chip này.)*

**Mặt thanh dính — chữ ký của bộ da** *(hợp lệ hóa 20/08/2026, AUDIT B11, chốt user
"hợp lệ hóa như một style signature")*: `rgba(255,255,255,.95)` + blur (`.glass-95`),
**chỉ** cho 3 vai: navbar · filterbar · thanh hành động dính đáy màn/sheet. Đây không
phải mặt thứ ba cho nội dung — không dùng cho khối tĩnh, không thêm độ mờ thứ hai.
Token bàn giao: `--surface-sticky` (xem `shadcn-theme/`).

Mặt tối `#0a0a0a` chỉ dùng cho: nút chính · backdrop (đen 60%, token `--overlay`) ·
**thanh promo trên đầu trang** *(thêm 24/08/2026, lệnh user "promo bar nằm trên thanh header
sẽ màu đen": đây là vai thứ 3 và là vai duy nhất mà mặt tối làm NỀN CỦA MỘT DẢI NỘI DUNG.
Hợp lệ vì nó không thuộc dòng chảy trang — nó là dải thông báo nằm TRÊN header, chữ trắng
`--general-primary-foreground`. Bản gốc/Figma vốn đã như vậy; bộ da từng đảo nó thành xám
nhạt chữ đen, nay gỡ phần đảo đó ở CẢ 2 BẢN và cả `skin-mp`. Danh sách vai của mặt tối
đóng ở 3.)*
*(Đính chính 20/08 theo số đo thật: badge trên ảnh — `.badge-label` Pre-order/New season —
là **mặt trắng chữ đen**, không phải mặt tối; bộ Figma đã dựng theo số thật này.)*

### 2.3 Nhấn bằng gì

Thứ tự đòn bẩy, dùng từ trên xuống. Hết đòn bẩy thì dừng, **không** đẻ đòn bẩy mới:

1. **Chữ hoa** (nhãn nhóm)
2. **Kẻ mảnh** (ngăn nhóm)
3. **Mặt trắng trên canvas xám** (đóng hộp)
4. **Mặt đen chữ trắng** (nút chính, badge trên ảnh)

Không nhấn bằng: mảng màu nhạt · bo góc · đổ bóng · gradient · độ đậm chữ.

> **Ngoại lệ ghi danh (21/08/2026, user đảo chốt 20/08 "nhấn bằng chữ, không bằng mảng màu"):**
> khối quà tặng trong GIỎ (`.gift-group.bg-accent-0` — quà kèm sản phẩm + ô mốc kế tiếp) được
> nhấn bằng **dải nền `--unofficial-accent-0`, FULL-BLEED dài bằng cả thẻ** — đúng nguyên bản
> skin-mp (chốt cuối cùng ngày: *"dài bằng cả thẻ chứ không thụt vô, tham khảo skin-mp"*).
> Hợp lệ vì trang giỏ nay là **nền trắng không hộp** (§2.2): dải nhấn là một HÀNG trong dòng
> chảy, không còn cắt ngang hộp nào. Skin-mt không đè rule nào lên `.gift-group` — markup +
> token tự lo. (2 bản thử cùng ngày đã bác: `--general-secondary` full-bleed khi CÒN hộp, và
> tấm con inset 16px.) Đi cùng việc tên chương trình rút khỏi vai hoa (§1.5 mục 4). Danh sách
> ngoại lệ mảng-màu này ĐÓNG — chỗ thứ hai muốn nền nhấn thì quay về 4 đòn bẩy trên.
>
> **CẬP NHẬT 31/08/2026 — user đảo lại lần nữa, qua Figma rồi qua lệnh trực tiếp:** dải nhấn
> quà **THÔI full-bleed**, nay **thụt lề trái 40** để mép trái thẳng cột ẢNH của món (16 lề
> dòng + 16 ô tick + 8 khe), mép phải vẫn ăn hết cột — số đo lấy từ Figma `Cart / desktop 1440`
> (node 57:613, wrapper pad 16/0/16/40). Và **cả 3 khối quà dùng CHUNG một khuôn** (lệnh:
> *"cái cục order gift cũng phải dùng chung style, size của cái gift ở trên luôn, áp dụng cả 2
> phiên bản"*): quà kèm sản phẩm · quà theo mốc đơn · ô mốc kế tiếp — cùng nền accent-0, cùng
> thụt 40 (`.gift-group.gift-inset`), nhãn đệm 8/4, thẻ đệm 8 với ảnh **77×102**. Khác nhau duy
> nhất là nhịp DỌC: khối kèm sản phẩm tự mang 16 trên/dưới vì chèn giữa 2 dòng hàng; khối theo
> mốc đơn để container lo (flex gap 8). Áp **CẢ 2 BẢN**.

> **Ngoại lệ ghi danh thứ 2 (24/08/2026, lệnh user: *"ở skin-mt ở cart cái block sum giá nên
> nhấn màu xuống tương tự bản figma"*):** khối tổng tiền trong GIỎ (`discountPanel` — thẻ ưu đãi
> + các dòng giảm + hàng "Tổng cộng" + dòng điểm thưởng) được nhấn bằng **dải nền
> `--general-secondary` (`#f2f2f2` — chính MẶT XÁM của §2.2, không phải bậc mới), FULL-BLEED 375**.
> Căn cứ: đo bản Figma trên trang chạy (skin mặc định, cùng markup) — panel `bg-secondary`
> `#f5f5f5` full-bleed **không kẻ trên**, thẻ voucher trắng nổi bên trong, dải quà `#fafafa`;
> tức Figma đặt block sum **sâu hơn dải quà đúng 1 nấc**. Map sang thang xám skin-mt giữ đúng
> quan hệ đó: sum `#f2f2f2` · quà `#f7f7f7`. Hợp lệ cùng lý do như mục quà: trang giỏ là nền
> trắng không hộp nên dải màu là một VÙNG trong dòng chảy, không cắt ngang hộp nào; thẻ voucher
> trắng bên trong lúc này đọc ra đúng đòn bẩy 3 (mặt trắng trên xám). **2 kẻ gỡ theo:** kẻ trên
> `discountPanel` và kẻ trên `#cartCta` — hai mép của dải màu đã tự ngăn, giữ kẻ nữa là ngăn hai
> lần ở cùng một mép (và Figma border 0 ở đúng 2 mép này). Chỉ MOBILE; cột phải desktop vẫn là
> hộp `bg-card` + viền. Danh sách ngoại lệ mảng-màu nay có **đúng 2 mục** và ĐÓNG ở 2 — cả hai
> đều nằm trong màn GIỎ, chỗ thứ ba muốn nền nhấn thì quay về 4 đòn bẩy trên.

---

## Phần 3 — Luật viền, bo góc, đổ bóng

### 3.1 Viền — 3 tầng, 1 độ dày

| Tầng | Màu | Vai |
|---|---|---|
| V1 | `#0a0a0a` 1px | phần tử tương tác chính: nút outline · ô chọn size · gạch dưới ô tìm kiếm |
| V2 | `#dfdfdf` 1px | kết cấu: viền hộp · ô nhập form · vách accordion · viền lớp nổi · ô tick |
| V3 | `#ececec` 1px | vách ngăn hàng trong danh sách: menu · bộ lọc · footer · giỏ · hàng nav |

**Độ dày luôn là 1px.** `2px` được để riêng cho **dấu đang chọn** (gạch chân mục nav đang mở) —
đó là *mốc thị giác*, không phải viền bao. Không dùng 2px để bao bất cứ thứ gì.

Phải gỡ khỏi bộ da: **`#cfcfcf`** (3092 chỗ — `border-border-3` trên `.chk` và vòng ô màu;
đang là tầng dùng nhiều nhất mà **không có trong luật nào**) → nhập vào **V2**.
**`#333333` làm viền** (8 chỗ) → V2. **`#f2f2f2` làm viền** (4 chỗ) → V3.

### 3.2 Bo góc — 0

`border-radius: 0` cho mọi thứ. **Hai ngoại lệ:**

1. **Hình tròn thật** — phần tử có `width == height` và về bản chất là chấm/vòng: badge số
   trong giỏ, dot phân cách, radio, **ô màu trên thẻ sản phẩm** (đảo 25/08, xem đính chính
   dưới đây).
2. **`.quick-add` 36×36 ở mobile** — ngoại lệ ghi danh **thứ hai**, thêm 25/08/2026 theo lệnh
   user *"Icon quick add to cart ở bản mobile sẽ hình tròn như cũ nhé"*. Nó **đảo** chốt Phần 6
   việc 4 (20/08 chốt "vuông"), và là đúng **phương án C** mà chính câu hỏi đó đã nêu:
   *"giữ tròn, ghi vào luật thành ngoại lệ thứ hai của §3.2"*. `w == h` nên nó cũng thoả ngoại
   lệ 1 về mặt hình học; ghi riêng vì nó là **nút**, không phải chấm/vòng.
   Ngoại lệ này KHÔNG kéo theo `#topFab` — nút đó vẫn vuông + không bóng.
   Hệ quả ghi thẳng: bộ da vuông nay có đúng **một** vật thể tròn nổi.
*(~~Đính chính 20/08: **ô màu KHÔNG thuộc ngoại lệ này** — skin-mt đã vuông hóa swatch từ trước,
`[data-swatches] .cw { border-radius: 0 }`, đo thật 18×18 vuông.~~ **ĐẢO 25/08/2026**, lệnh user:
*"ô hình vuông chọn màu ở product listing sẽ trả về hình tròn toàn bộ nhé"*. Ô màu trên thẻ sản
phẩm **thuộc ngoại lệ**: `w == h` và bản chất là chấm màu, cùng nhóm với badge số giỏ và vòng
radio. Rule vuông hoá đã gỡ khỏi cả 2 file; markup vốn đã `rounded-full` nên không cần rule thay
thế. **Bộ Figma đang dựng theo bản vuông — lệch với demo cho tới khi dựng lại.**)*

Còn vi phạm:

* `rounded-[3px]` — nhãn `VISA`/`MASTER`/`TIKINOW` (24 chỗ mobile · 48 desktop)
* `border-radius: 8px` — `#infoSheet .is-panel` ở **cả 2 bản**, và `#settingsPanel .sp-card`
  ở **riêng desktop** (mobile đã đè, desktop quên)
* `999px` vs `9999px` — hai cách viết cùng một pill, 72 chỗ ở desktop
* pill **không phải hình tròn**: thanh tiến độ (386×6, 108×6) · grabber (39×4) · segmented control (185×35)
* ~~`.quick-add` 36×36 tròn — đúng luật `w == h` về mặt chữ nghĩa, nhưng một nút nổi tròn trên
  bộ da vuông đọc ra là vật thể lạ. Desktop đã ẩn nó (`display: none`), mobile còn. → §6, câu hỏi 4.~~
  **HẾT LÀ VI PHẠM 25/08/2026** — user chốt giữ tròn, nay là ngoại lệ ghi danh thứ 2 ở đầu §3.2.

### 3.3 Đổ bóng — không có

Đã chốt 17/08/2026 (tham chiếu cettire.com): mọi lớp nổi dùng **viền 1px, `box-shadow: none`**.
Khối `KHUÔN CHUNG CHO MỌI LỚP NỔI` làm đúng việc đó.

Còn 1 vi phạm thuộc mặt tiền: **`#topFab`** (nút về đầu trang) — `0 2px 12px rgba(0,0,0,.10)`
+ `border-radius: 9999px`. Nó không nằm trong danh sách khuôn chung. → vuông + bỏ bóng, giữ viền V2.

(`#settingsFab` · `.sp-card` · `.cg-sw` là công cụ dev — xem §5.)

---

## Phần 4 — Luật thi hành

Đây là phần biến luật thành CSS chạy được. Cả hai đề xuất dưới đã **đo kiểm trên trang thật**.

### 4.1 Chặn rò tracking — 1 dòng

```css
html.skin-mt [class*="tracking-"] { letter-spacing: 0.5px; }
```

Specificity `(0,2,1)` thắng mọi utility `tracking-[…]` `(0,1,0)`, không cần `!important`.

### 4.2 Remap theo **cặp** cỡ + dòng, không remap cỡ đơn lẻ

Khối `text-[Npx] { font-size }` hiện tại phải viết lại thành khối khai **cả hai trục**.
Cụ thể là cặp `.text-[Npx].leading-N` cho từng tổ hợp có trong markup.

**Kết quả đo, màn PLP desktop:**

| | Số tổ hợp typo | Số giá trị tracking |
|---|---|---|
| Trước | **21** | 5 |
| Sau (2 fix trên) | **10** | **1** |

Hai fix này một mình đã cắt hơn **một nửa** độ trộn, và không chạm markup, không chạm layout.

### 4.3 Luật viết rule mới cho bộ da

1. Rule đổi `font-size` **phải** kèm `line-height`. Không có ngoại lệ.
2. Rule đổi `font-weight` lên 500 **phải** kèm `text-transform: uppercase`. Ngược lại cũng vậy.
3. Không khai màu bằng hex trong rule bộ da — dùng token. Sắc nào chưa có token thì thêm token,
   không rải hex. Hiện có **16 hex rải rác** trong khối `skin-mt` của `index.html`.
4. Rule nào khai *"giống hệt ở cả 2 file"* thì phải **thật sự giống hệt**. Bảng §0 cho thấy
   quy ước này đã vỡ ở 5 cỡ chữ, 1 radius, 1 cỡ `.search-tab`.
5. Không thử nghiệm trong bộ da **VÀO-TRANG** — khách mở ra là thấy ngay. Thử ở một bộ da
   phải TỰ BẬT, chốt xong mới port sang.
   **CẬP NHẬT 25/08/2026** (lệnh user: *"từ giờ mặc định vào sẽ là chọn skin-li nhé"*): bộ da
   vào-trang nay là **`skin-mt skin-li`**, không còn là `skin-mt` trơn. Hệ quả kép, cả hai đều
   siết chặt hơn chứ không nới:
   * `skin-mt` vẫn **không được thử nghiệm** — chặt hơn trước, vì `skin-li` chỉ là lớp phủ hệ
     chữ trên chính nó, sửa `skin-mt` là sửa luôn thứ mở ra thấy ngay;
   * **`skin-li` cũng thôi là chỗ để thử** — nó đã lên làm mặc định.
   Còn lại để thử: `skin-mp` (Editorial) và Maika (`skin-mk`).

---

## Phần 5 — Ranh giới: cái gì KHÔNG thuộc bộ da

Công cụ dev **không** chịu luật này, và cũng **không** được tính là vi phạm:

* `#settingsFab` + `#settingsPanel` (popover Cài đặt: ngôn ngữ · giao diện · phông · bộ da)
* `.cg-sw` (công tắc), `.langopt` (segmented control) — chỉ sống trong popover đó
* nhãn eyebrow `tracking-[0.12em]` trong popover đó

Lý do: chúng là bảng điều khiển của bản demo, không phải mặt tiền cửa hàng. Nhưng chúng
**vẫn** phải theo luật lớp nổi (viền 1px, không bóng) vì người xem thấy chúng cùng lúc với trang.

---

## Phần 6 — 8 việc cần chốt trước khi sửa code — ĐÃ CHỐT XONG 20/08/2026

Xếp theo mức độ ảnh hưởng thị giác. Mỗi việc đều là chỗ luật mới **khác** hiện trạng —
không phải chỗ bug, mà là chỗ cần quyết định.

> **Trạng thái:** user đã chốt cả 8 việc ngày 20/08/2026 — 7 việc theo đề xuất,
> riêng **việc 2 chốt ngược đề xuất** (giữ 500 cho bộ lọc → thành ngoại lệ ghi danh §1.1).
> Code demo **chưa** sửa theo; các chốt này đã được nướng vào bộ bàn giao thư viện
> `shadcn-theme/` (đích: Magento + Tailwind + shadcn/ui — xem `shadcn-theme/SHADCN-NOTES.md`).

**1. Nhịp dòng của thân bài: 12/20 (1.67) → 12/18 (1.50)** — ảnh hưởng lớn nhất
1320 phần tử ở mobile, 1486 ở desktop. Trang sẽ **siết lại rõ rệt**, đặc biệt các hàng danh
sách 2 dòng. Đây là *"thứ chưa mang sang"* mà code đã tự ghi nhận.
→ **Đề xuất: làm.** 1.67 là tỉ lệ của cỡ 14 áp lên cỡ 12 — nó không phải một lựa chọn, nó là
tàn dư của remap một trục. Không siết thì phần lớn độ trộn còn nguyên.
**Chốt 20/08/2026: làm theo đề xuất.**

**2. Weight 500 trên nội dung chữ thường: gỡ về 400**
Chốt 20/08 *"tăng font weight của BỘ LỌC và các level danh mục lên 1 nấc"* làm `#filterSheet .facc`
thành 500, kéo theo ~756 phần tử chữ **thường** ở 500 — vi phạm §1.1 (500 phải đi cùng chữ hoa).
→ **Đề xuất: gỡ về 400.** Phân cấp trong panel bộ lọc đã do **chữ hoa 2 tầng nhãn** và
**indent 40/64/88 của 3 tầng cate** lo — đủ rồi, không cần thêm nấc đậm. Nếu vẫn muốn tầng
nhãn nổi hơn thì nâng **cỡ** (T6 12 → T3 14), đúng đòn bẩy của luật.
*Đây là chỗ luật mới ngược một yêu cầu đã chốt của bạn — cần bạn đồng ý mới sửa.*
**Chốt 20/08/2026: GIỮ 500 — ngược đề xuất.** Bộ lọc giữ nguyên như đang có, ghi thành
ngoại lệ ghi danh duy nhất ở §1.1. Không blanket 500 nào khác được ăn theo.

**3. Thang chữ 2 bản về một mối: bỏ 11 và 16, hợp nhất 5 cỡ lệch**
Desktop sẽ đổi nhiều hơn mobile (`text-[16px]` 14→12 · `text-[18px]` 16→18 · `text-[24px]` 18→24).
→ **Đề xuất: làm, và làm desktop trước** vì desktop lệch xa luật hơn. Mobile chỉ phải xử `text-[11px]`.
**Chốt 20/08/2026: làm theo đề xuất.**

**4. `.quick-add` tròn 36×36 ở mobile**
→ **Đề xuất: vuông.** Desktop đã ẩn nó khỏi `skin-mt`; để mobile giữ nút tròn là 2 bản nói 2 giọng.
Phương án B: ẩn luôn như desktop. Phương án C: giữ tròn, ghi vào luật thành ngoại lệ thứ hai của §3.2.
~~**Chốt 20/08/2026: làm theo đề xuất (vuông).**~~
**ĐẢO 25/08/2026 — chốt PHƯƠNG ÁN C** (lệnh user: *"Icon quick add to cart ở bản mobile sẽ hình
tròn như cũ nhé"*). Rule vuông hoá đã **gỡ khỏi `index.html`**; `desktop.html` không phải sửa vì
khổ đó vẫn ẩn nút. Đo lại: cả 5 bộ da ra `9999px`, 36×36, đồng nhất trên mọi thẻ sản phẩm.
Ghi vào §3.2 thành ngoại lệ thứ hai, đúng như phương án C đã nêu.
*(Ghi chú lịch sử đáng giữ: từ 20/08 tới 25/08 luật ghi "vuông" nhưng demo vẫn tròn — rule
`border-radius: 0` là code chết vì markup đặt `border-radius` **inline**. Tức bản đang chạy suốt
5 ngày qua chính là bản user vừa chốt.)*

**5. Xám `#f7f7f7` và mặt hồng `#fef2f2`**
→ **Đề xuất: bỏ cả hai.** `#f7f7f7` nhập vào `#f2f2f2`; badge `-%` giữ chữ đỏ, bỏ nền tô.
**Chốt 20/08/2026: làm theo đề xuất.**

**6. Danh tính của bộ da: nó còn là "port mytheresa" nữa không?**
Hộp giỏ hàng hiện dựng theo **maison kitsune**, không phải mytheresa. Cộng với 12+ chỗ
*"lệch số đo có chủ ý"*, nhãn *"port mytheresa"* đã không còn đúng — và chính nó là thứ khiến
mọi yêu cầu mới thành một ngoại lệ mới (vì trọng tài "họ đo ra bao nhiêu" không phán được).
→ **Đề xuất: đổi tên vai của bộ da** thành một bộ da nhà — *"đơn sắc · vuông góc · nhãn hoa"* —
lấy **file này** làm trọng tài thay số đo. Giữ nguyên toàn bộ code, chỉ đổi cách phân xử.
Không cần đổi class `skin-mt`, chỉ đổi nhãn trong popover và ghi chú đầu khối CSS.
Phương án B: kéo hộp giỏ về đúng cách mytheresa làm (ngăn bằng kẻ, không đóng hộp) —
nhưng đó là gỡ một thiết kế đã qua 5 vòng chốt, đắt hơn nhiều so với việc đổi tên.
**Chốt 20/08/2026: làm theo đề xuất (đổi vai thành bộ da nhà, file này là trọng tài).**
Cùng ngày user chốt định hướng lớn: skin-mt là skin CHÍNH của website thật —
đích Magento + Tailwind + shadcn/ui, xem `shadcn-theme/`.

**7. Nhãn hoa đang nói hai giọng weight — chốt một** *(phát hiện 20/08, sau khi chốt file)*
Cùng là chữ hoa của bộ da: `.ms-tab` · tiêu đề màn con · nhãn nhóm màn con = **500**,
còn hàng danh mục drawer (mục 4) + nhãn nhóm footer (mục 6d) = **400**. §1.1 nói 500+hoa
là cặp không tách rời — hoa mà 400 là trạng thái lai, chiều ngược của "500 chữ thường".
→ **Đề xuất: mọi chữ hoa lên 500** (giữ §1.1 nguyên vẹn; Montserrat viết hoa 12px ở 400
với tracking 0.5 đọc mảnh, 500 cho nhãn đứng được mà không cần nâng cỡ). Phương án B:
mọi chữ hoa về 400 — đúng số đo mytheresa tuyệt đối, nhưng ngược 2 chốt 18–19/08
(menu lên 500) và phải gỡ 3 chỗ đã làm.
**Chốt 20/08/2026: làm theo đề xuất (mọi chữ hoa lên 500).**

**8. Khuôn "headline + support" bị remap nghiền phẳng — user nêu 20/08 ở mục
"Bạn có phiếu mua hàng?" (giỏ)**
Markup có ý 2 bậc: headline `14/500` + support `12/400`. Remap `14→12` + blanket 400
nghiền cả hai về `12/400` — phân biệt còn lại là mực `#0a0a0a` vs `#333` (34/255,
không đọc ra bậc). Đo 20/08 trên trang chạy, `skin-mt`, khối PBH mở:
trigger `12/20 · 400 · #0a0a0a` — hint `12/16 · 400 · #333` — nút "Áp dụng"
`12/20 · 400 · #0a0a0a` nền `#f2f2f2`. Cùng khuôn này còn ở: khối cam kết ·
`promoRule` 3 tầng · trigger "Ưu đãi & khuyến mãi" · tiêu đề card Rewards · "Tổng cộng".
→ Xử theo **vai của headline**, đúng §1.1:
  * **A — headline là NHÃN gọi tên mục** ("Bạn có phiếu mua hàng?", "Ưu đãi & khuyến mãi"):
    → T6 `12/16` + chữ hoa (+500 theo phán quyết việc 7); support giữ họ nội dung,
    hạ mực về `#666666`; trigger sửa nhịp `12/20 → 12/16`. Nếu câu hỏi viết hoa đọc ra
    gắt thì đổi copy về danh từ "Phiếu mua hàng" (đổi key i18n, không gõ hoa vào chuỗi).
    Vai này nếu chốt thì ghi thành **vai thứ 5** của danh sách đóng §1.5.
  * **B — headline là NỘI DUNG** (tên chương trình trong `promoRule`, tiêu đề cam kết):
    → giữ chữ thường `12/16` mực `#0a0a0a`, support `12/18` mực **`#666666`** — support
    một dòng là *chú thích*, vai của mực phụ §2.1, không phải `#333` (mực đoạn văn).
  * Nút "Áp dụng" trong khối PBH: bỏ nền xám `#f2f2f2` (mặt xám không phải đòn nhấn —
    §2.3) → nền trắng + viền V1 `#0a0a0a` 1px, cùng tầng với ô chọn size.
→ **Đề xuất: làm cả A và B theo đúng vai từng chỗ** — PBH + "Ưu đãi & khuyến mãi" theo A;
cam kết + `promoRule` theo B; "Tổng cộng" chờ việc 3 (nó là chuyện bậc cỡ, không phải khuôn này).
**Chốt 20/08/2026: làm theo đề xuất (A + B theo vai; vai A đã ghi thành vai thứ 5 của §1.5).**

---

## Phần 7 — Thẻ tra nhanh

```
CHỮ     Montserrat · 0.5px tracking · KHÔNG utility tracking-*
        Nội dung → 400, chữ thường.  Nhãn → 500 + CHỮ HOA.  Không có trạng thái lai.
        (1 ngoại lệ ghi danh: trigger bộ lọc .facc = 500 thường — chốt 20/08, đóng)
        Cỡ: 10 · 12 · 14 · 18 · 24   (không 9/11/13/15/16/20/22/32/48)
        Dòng: 1 dòng → ×1.33   ·   nhiều dòng → ×1.50
        Đổi font-size thì PHẢI đổi line-height cùng lúc.

MỰC     #0a0a0a chính · #333333 nội dung · #666666 phụ
MẶT     #ffffff · #f2f2f2   (chỉ 2 mặt; #f7f7f7 và #fef2f2 đã bỏ)
VIỀN    #0a0a0a 1px tương tác · #dfdfdf 1px kết cấu · #ececec 1px vách hàng
        2px CHỈ dùng cho dấu đang chọn, không dùng để bao.
BO GÓC  0 — trừ hình tròn thật (w == h)
BÓNG    không có

NHẤN    chữ hoa → kẻ mảnh → mặt trắng trên xám → mặt đen chữ trắng.  Hết.
        Không nhấn bằng mảng màu nhạt, bo góc, bóng, gradient, độ đậm.

MUỐN NỔI HƠN?  Nhãn → 500 + hoa.  Nội dung → lên 1 bậc CỠ.  Không có lựa chọn thứ ba.
```

---

## Phần 7 — ĐÃ THI HÀNH 24/08/2026 (lệnh user: *"sửa tất cả các điểm còn lệch vào luôn"*)

Nguồn: bản dò `AUDIT-TYPO-SHADCN-2026-08-24.md` (11 màn mobile · 10 màn desktop). Sửa ở
**CẢ 2 FILE**, đo lại sau sửa bằng chính bộ scan đó.

| Trục | Trước | Sau |
|---|---|---|
| §1.3 cặp cỡ/dòng | 341 (mobile) · 489 (desktop) | **0 · 0** |
| §1.2 cỡ ngoài thang | 30 · 67 | **0 · 0** |
| §2.1 mực ngoài 3 bậc | 4 · 57 | **0 · 0** |
| §3.1 sắc viền ngoài 3 tầng | 66 · 62 | **0 · 0** |
| §3.2 bo góc ≠ 0 (không phải tròn thật) | 46 · 55 | **0 · 0** |
| §3.3 đổ bóng | 1 · 1 (`#topFab`) | **0 · 0** |
| §4.3-3 hex trong rule bộ da | 12 · 19 | **0 · 0** (còn khối định nghĩa token + `theme-dplus`) |
| §4.3-4 hai bản khai giống hệt | 6 điểm lệch | **0** |

### 7.1 Cách thi hành §4.2 — khối `:where()` một chỗ, cả app

Thay các rule "chỉ đổi cỡ" bằng **cặp cỡ+dòng**, bọc `:where()` cho specificity `(0,1,1)`:
thắng utility Tailwind `(0,1,0)` nhưng **nhường mọi rule tường minh của bộ da** `(0,2,1)+`,
nên các vai khai riêng (`.pc-brand`, `.ms-tab`/`.search-tab`, `.dk-dept`/`.dk-nav-link`,
tiêu đề panel bộ lọc, các khối scope theo màn) giữ nguyên số mà không cần `:not()`.

| Utility trong markup | Ra | Vai |
|---|---|---|
| `text-[9px]` `text-[10px]` | **10 / 14** | T7 |
| `text-[11px]` `[13px]` `[14px]` `[15px]` `[16px]` | **12 / 18** (mặc định) | T5 |
| `leading-4` `leading-6` | dòng **16** | T4 (chữ một dòng trong hàng cao cố định) |
| `leading-5` `leading-relaxed` | dòng **18** | T5 |
| `leading-3` | dòng **14** | T7 |
| `text-[18px]` · `leading-7` `leading-[28px]` `leading-[25px]` | **18 / 24** | T2 |
| `text-[22px]` `[24px]` `[32px]` `[48px]` · `leading-8` `leading-10` `leading-none` `leading-snug` | **24 / 32** | T1 |
| `.pick-label` (component `pickField`) | dòng **16** | T4 — chữ một dòng `truncate` trong ô cao 40 |

Đã dò toàn file trước khi viết: **mỗi utility dòng chỉ gặp đúng một họ cỡ**, nên khai theo
utility là đủ, không phải liệt kê từng cặp. 4 rule cặp của riêng màn giỏ (khối 6e) đã gỡ —
khối toàn app khai đúng các giá trị đó cho mọi màn.

**Hệ quả cần biết:** `leading-5` → 18 nên **giá trên card ra 12/18** (T5) chứ không phải
12/16 như bảng §1.2 xếp cho "giá". Chỗ nào muốn T4 thì markup phải dùng `leading-4`/`leading-6`.
Đây là đánh đổi của việc remap theo utility (đúng chốt việc 1+3 hồi 20/08), không phải bỏ luật.

### 7.2 Bốn quyết định mới, ghi danh

1. **`.opt.on` (thẻ đang chọn) = V1 `#0a0a0a` 1px** — trước là `#333` (mực nội dung đem đi
   làm viền). Nó là *dấu đang chọn*, không phải kết cấu hộp.
2. **Vòng `.radio` giữ 2px** — ngoại lệ ghi danh của §3.1 ("2px chỉ cho dấu đang chọn"):
   vòng radio là **hình tròn thật**, hạ 1px thì mảnh hơn ô tick vuông đứng cạnh. Danh sách
   ngoại lệ 2px nay có 2 mục: dấu nav đang chọn + vòng radio.
3. **"Hết hàng" = gạch ngang + mực phụ `#666`** (`.chip.off` mobile · `.pc-size.is-oos`
   desktop) — thay cách hạ mực xuống `#999`/`#a3a3a3` (dưới sàn đọc được của §2.1). Bỏ luôn
   mảng nền `rgba(0,0,0,.04)` của chip: mặt thứ ba không có trong §2.2.
4. ~~**`.quick-add` vuông** (mobile; desktop vẫn ẩn) — giữ chức năng thêm nhanh, thôi làm vật
   thể tròn duy nhất trên bộ da vuông.~~ **ĐÃ ĐẢO 25/08** — `.quick-add` **tròn lại**, ngoại lệ
   ghi danh thứ 2 của §3.2 (xem Phần 6 việc 4). `#topFab` **KHÔNG đảo theo**: vẫn **vuông + bỏ
   bóng** (§3.3 đã ghi tên nó; khổ desktop có thêm nhánh `:hover` đổ bóng, đã tắt cả hai).

### 7.3 Các việc Phần 6 nay đã thi hành trên CẢ 2 BẢN

* **việc 1+3** (cặp cỡ+dòng): từ chỗ chỉ áp trong màn giỏ → **toàn app, một khối duy nhất**.
* **việc 5** (badge `-%` bỏ nền hồng `#fef2f2`, giữ chữ đỏ): toàn app.
* **§3.1 gộp `#cfcfcf` vào V2**: remap ở token `--unofficial-border-3` nên phủ hết 84 chỗ
  (ô tick `.chk`, vòng radio) — không sửa từng selector.
* **AUDIT B2** (khuôn trạng thái đơn = chấm 6px + chữ 12/16 mực chính): **đã port sang
  desktop** (`STATUS_DOT` + `statusTag()` khai giống hệt index.html), thay pill
  `bg-warning-subtle` + mực `#8a6100` + bo `9999px`.
* **AUDIT B3/B4** (badge giỏ 9px, nhãn `VISA`/`MASTER`/`TIKINOW` `rounded-[3px]`): nay
  **10/14 + bo 0**. Việc thay 2 chỗ này bằng icon thương hiệu vẫn còn nguyên trong backlog —
  đây chỉ là chỉnh style về thang trong lúc chờ.
* **nhãn "Bạn có phiếu mua hàng?"** ở cột tóm tắt desktop: nay hoa 500 như mobile (vai 5 §1.5).

### 7.4 Còn lại đúng 3 nhóm, tất cả là HỢP LỆ

`glass-95` (chữ ký bộ da, §2.2) · gạch 2px của tab/nav đang chọn + vòng radio (§3.1 + 7.2-2) ·
chấm màu hệ thống của trạng thái đơn và chấm phân cách `#666` (hình tròn thật, §3.2).

---

*Nguồn số liệu: `getComputedStyle` trên 9 màn của cả 2 file, `skin-mt`, lúc 20/08/2026.
Cách đo lại: mở `http://localhost:8123/index.html` ở 375×812 (và `desktop.html` ở 1440),
duyệt `document.querySelectorAll('body *')`, gom tổ hợp `fontSize|lineHeight|fontWeight|textTransform|letterSpacing`
của phần tử đang hiện có text trực tiếp. Nhớ bust cache CSS trước khi đo.
Bẫy đo viền: xem trang qua preview pane bị thu nhỏ thì computed `border-width` bị scale
theo khung — rule khai `1px` đọc ra `0.8px`. Trước khi kết luận về độ dày viền phải soi
rule gốc trong stylesheet, đừng tin mỗi `getComputedStyle`.*

---

## Phần 8 — Stack: BỎ Tailwind CSS và shadcn/ui (chốt 25/08/2026)

> Lệnh user 25/08/2026: *"rule mới là sẽ không cần thiết sử dụng tailwind css và thư viện shadcn"*.
> Đây là luật **stack**, không phải luật thẩm mỹ — nó đổi *cách viết*, không đổi *cái được vẽ ra*.

### 8.1 Từ nay việc mới viết bằng gì

* **CSS ngữ nghĩa viết tay** — class đặt theo VAI (`.hp-hero`, `.pc-brand`), không theo thuộc tính.
* **Giá trị lấy từ biến token** (`tokens.css`, sinh từ `tokens07.json`), không gõ số trần.
* **Không thêm utility class Tailwind mới** vào markup; không dựng thêm file nào phụ thuộc
  `tailwind.css` / `tailwind.config.js`.
* **Không lấy component từ registry shadcn/ui**, không nhập convention biến của nó cho code mới.
  Chuẩn a11y (role/aria/data-state/roving tabindex) thì **vẫn giữ** — đó là chuẩn ARIA, không
  phải tài sản của shadcn.
* **Khuôn mẫu đã có sẵn để noi theo:** `home.html` — CSS ngữ nghĩa `.hp-*`, không link
  `tailwind.css`, sửa không cần rebuild. Đo được 0 vi phạm luật ở cả 3 khổ.

### 8.2 Cái gì KHÔNG bị lật

* **Toàn bộ §1–§7 giữ nguyên.** Thang chữ 12/14/16/18/24/32/48 · cặp cỡ+dòng bắt buộc đi đôi ·
  500 luôn đi cặp với chữ hoa · 2 tầng viền · 0 bóng · bo 0 — đó là luật thiết kế, thi hành
  bằng CSS tay cũng y hệt như thi hành bằng utility.
* **Pipeline token nguyên vẹn:** `tokens07.json` → `gen_tokens.py` → `tokens.css`. Không dính
  Tailwind, không đụng tới.
* **`index.html` / `desktop.html` KHÔNG refactor** *(user chốt 25/08/2026 — giữ nguyên,
  không migrate)* — 2 demo vẫn chạy trên `tailwind.css` đã build sẵn. Khi sửa 2 file này:
  **ưu tiên khai rule trong `<style>`** thay vì thêm class mới; nếu vẫn phải dùng class thì
  grep `tailwind.css` trước (luật cũ ở README — class không có trong build là **rơi im lặng**).

### 8.3 Bộ bàn giao `shadcn-theme/` — đóng băng, không xoá

`theme.css` · `tailwind.preset.js` · `SHADCN-NOTES.md` (dựng 20/08) giữ lại làm **tư liệu**:

* `theme.css` vẫn dùng được **như một bảng biến CSS thuần** — `home.html` đang link nó và
  không phụ thuộc gì vào Tailwind hay React. Giữ nguyên.
* `tailwind.preset.js` **hết vai** (không còn build Tailwind để nướng luật vào). Số đo trong
  đó vẫn là bản ghi hợp lệ của thang chữ §1.
* `SHADCN-NOTES.md` (2 con đường Magento Hyvä vs headless React) **hết hiệu lực làm định
  hướng** — hướng Magento vẫn còn, phần chọn Tailwind/shadcn thì không.

### 8.4 ĐÃ THI HÀNH 25/08/2026 — thang chữ đặt tên theo VAI

Tên cũ (`text-xl/lg/md/sm/base/micro`) là key của `tailwind.preset.js`, tức đặt theo **cỡ
tương đối**. Cách đó **đã gãy một lần ngay trong dự án này**: preset không có bậc 14px, tới
khi §1.5 mục 6 thêm vai "thân bài 14px" thì phải bịa thêm key `text-md`. Khách chưa chốt font
thì thang còn đổi, nên tên phải mang **vai** — đổi số chỉ sửa 6 dòng rule, markup đứng yên.

| Cũ | Mới | Ra | Vai |
|---|---|---|---|
| `.text-xl` | **`.t-title`** | 24/32 | T1 tiêu đề trang · hero |
| `.text-lg` | **`.t-section`** | 18/24 | T2 tiêu đề mục · sheet · modal |
| `.text-md` | **`.t-body`** | 14/20 | T3 thân bài cấp 1 |
| `.text-sm` | **`.t-ui`** | 12/16 | T4 chữ trong linh kiện (1 dòng) |
| `.text-base` | **`.t-copy`** | 12/18 | T5 đoạn nhiều dòng |
| `.text-micro` | **`.t-micro`** | 10/14 | T7 vi mô |
| `.label` | **`.t-label`** | 12/16 · 500 · HOA | T6 nhãn cấp 2 |
| `.label-1` | **`.t-label-1`** | 14/20 · 500 · HOA | T3 nhãn cấp 1 |

Phạm vi: `home.html` (182 lượt) + `shadcn-theme/theme.css` (2 selector — file này chỉ
`home.html` link, `index/desktop` không dính). Đo lại sau khi đổi: 7/7 vai ra đúng số,
`.t-label` giữ đủ `500 + uppercase`, DOM không còn tên cũ, console sạch, **0 pixel thay đổi**.

Kèm theo, 2 việc bàn giao treo ở `HOMEPAGE.md` **đóng luôn**: (a) thêm key `text-md` vào
`tailwind.preset.js` — hết hiệu lực (bỏ preset); (b) `.label` đụng nghĩa nhãn form 400 chữ
thường của §5 — đã xử bằng chính lượt đổi tên này.

*(Câu hỏi "2 demo cũ có migrate không" đã chốt 25/08/2026: **không** — xem §8.2.)*

### 8.5 Quy chuẩn đặt tên → `NAMING-MAGENTO.md`

Luật đặt tên đầy đủ tách sang **`NAMING-MAGENTO.md`** (chốt 25/08/2026), vì nó phục vụ việc
bàn giao cho đội dev Magento chứ không phải phân xử thẩm mỹ. Năm quy tắc, rút từ số đo trên
chính `shop.dafc.com.vn`:

1. **kebab-case phẳng** — không `__`, không `--`. Site thật chạy 42% kebab, `__` chỉ 0,6%, `--` 0%.
2. **Trùng vai với block Magento thì dùng thẳng tên của họ** (`product-item-name`, `price-box`,
   `action primary`, `toolbar`, `fieldset`/`control`) — dev grep ra ngay, khỏi dịch.
3. **Biến thể = class thứ hai** (kiểu `.action.primary`), không phải hậu tố `--`.
4. **Trạng thái = tiền tố `_`** (`_active`, `_open`) — đúng thứ widget Magento tự gắn lúc chạy.
5. **`dafc-`** cho phần thiết kế mới không có block Magento tương ứng.

Ngoại lệ ghi danh: **`dk-*` không đổi tên** (port 1:1 menu bar từ `desktop.html`, giữ nguyên
để port ngược là copy thẳng), kể cả 2 tên còn mang `--`.

Đợt quét áp quy tắc 1–4 cho phần còn lại của `home.html` (114 tên, trong đó 57 tên viết tắt
1–2 chữ cần giãn) **chưa chạy** — chờ duyệt bảng tên, xem `NAMING-MAGENTO.md` Phần 7.

---

## Phần 9 — Luật bộ chọn size (chốt 28/08/2026)

> Lệnh user: *"về size pick ở trang pdp các ver sẽ chốt rule là tối đa 9 size, 1 line hiển thị
> tối đa 5 size nhé, áp cho toàn bộ ver pdp, và cả quick add desktop, mobile nữa nhé"*

**Luật:** mọi bộ **chọn size của một sản phẩm** hiển thị **tối đa 9 size**, **mỗi dòng tối đa
5 ô** (9 size ⇒ 5 + 4). Danh sách dài hơn bị **cắt ở 9**, không cuộn, không "xem thêm".

Phạm vi áp: **6 bản PDP** (mobile) · **6 kind PDP** (desktop, `dkScreenPDP`) · **quick add**
mobile + desktop. Tổng 5 file: `index.html`, `desktop.html` và 3 bản fork skin.

**Một nguồn duy nhất** — mỗi file khai đúng một chỗ, cạnh `sizeLabel`/`sizeRaw`:

| Hằng | Giá trị | Việc |
| --- | --- | --- |
| `SIZE_MAX_SHOWN` | 9 | trần số ô, thi hành bằng `capSizes(list)` tại **mọi** nơi render |
| `SIZE_PER_ROW` | 5 | số cột, đọc thẳng vào `grid-template-columns:repeat(…,1fr)` |

Đổi luật = sửa 2 con số này, không đi từng màn. **Cấm** hardcode số cột trong markup size —
đó chính là thứ đã làm PDP4 lệch 4 cột và quick add desktop lệch 6 cột trước 28/08.

**KHÔNG áp cho:**

* **chip size của BỘ LỌC** — đó là facet lọc theo danh mục, phải liệt kê đủ dải size đang bán
  (XXS–XXL, 35–46, 56–115…), không phải bộ chọn size của một sản phẩm;
* **lớp size hover trên card PLP desktop** (`.pc-sizes`, riêng `skin-mt`) — vẫn **4 cột**, hẹp
  hơn trần 5 nên **không phạm luật**; trần 9 thì có áp (qua `pcSizesOf`). Ép cả tấm về đúng 5
  phải tính lại bề rộng ô trong tấm hover — chưa làm, chờ lệnh.

Số đo sau khi thi hành (đo trên trang chạy): ô size **62,2px** ở mọi PDP mobile · **79px** ở
desktop (**102,6px** riêng PDP#1 vì cột nội dung rộng 569 — xem `dk-info-wide`) · nhãn dài
nhất hiện có (`Onesize`, `IT 44`) **không** tràn ô ở cả 2 khổ · bộ 12 size giả lập ra đúng
9 ô, xếp **5 + 4**.

### 9.1 Các bộ size đang dùng (chốt 28/08/2026)

> Lệnh user: *"ở sản phẩm giày thì demo 9 size luôn, còn SML vẫn như bth"*

| Bộ | Giá trị | Dùng cho |
| --- | --- | --- |
| `SIZES_SHOE` | `IT 36 … IT 44` (**9** — đúng trần §9) | mọi **hàng giày**: 3 màn PDP giày (Gianni · Manu · Greca Court) + giày trong danh sách "Show more" |
| `SIZES` | `IT 39 … IT 44` (6) | hàng may (đầm lụa PDP#1) và là **bộ mặc định** của SP chưa khai size riêng |
| `SIZE_SHEET_OPTIONS.pdp2` | `S · M · L` | khăn lụa — **giữ nguyên**, lệnh nói rõ |
| `SIZE_SHEET_OPTIONS.pdp3` | `Onesize` | túi |
| `PRODUCTS[i].sizes` | dung tích (`50 ml`…) | hàng làm đẹp |

**Định tuyến bằng LOẠI HÀNG, không bằng chỉ số**: `isShoe(p)` đọc tên sản phẩm
(`Giày|Sandal|Sneaker|Bốt|Dép`), `sizesOf(p)` trả bộ tương ứng. Nhờ vậy giày **không có PDP
riêng** cũng ra đủ 9 bậc, và thêm hàng giày mới không phải khai thêm bảng chỉ số nào.

**Vì sao không nới thẳng `SIZES` lên 9:** bộ đó còn là bộ mặc định của hàng may + SP chưa khai
size — nới ra thì đầm lụa và cả nhóm túi/thắt lưng ăn theo, ngoài ý lệnh.

`SIZES_SHOE` giữ nguyên 3 mốc trạng thái của demo — **IT 42** sắp hết · **IT 43** tạm hết ·
**IT 44** nhận thông báo — nên mọi kịch bản cũ vẫn diễn được, và **IT 39** vẫn nằm trong bộ nên
ô chọn sẵn của markup không phải sửa. Đo lại sau khi áp: 3 màn giày + quick add giày (cả 2 khổ)
ra **9 ô xếp 5 + 4**, không tràn chữ; đầm 6 ô (5 + 1) · khăn 3 · túi 1 — **không đổi**.

---

## Phần 10 — Luật ô nhập: search gạch chân, nhập thường đóng khung (chốt 04/09/2026)

> Lệnh user: *"các ô inputfield dạng search sẽ dùng underline cho field đó thay vì đóng khung, còn
> các inputfield nhập thông thường vẫn giữ nguyên style đóng khung border"*.

Đây không phải luật mới mà là **thi hành cho hết** luật §3.1 đã có: bảng viền xếp
*"gạch dưới ô tìm kiếm"* vào **tầng V1 `#0a0a0a` 1px** (phần tử tương tác chính), còn
*"ô nhập form"* vào **tầng V2 `#dfdfdf` 1px** (kết cấu). Hai vai, hai tầng.

| Loại ô | Hình thức | Tầng |
|---|---|---|
| **Tìm kiếm** (`type="search"`) | nền trong suốt · **chỉ `border-bottom`** `#0a0a0a` 1px · `radius 0` · đệm ngang **0** | V1 |
| **Nhập thường** (email · SĐT · mật khẩu · mã ưu đãi · khoảng giá · OTP · form thanh toán) | nền trắng · **viền 4 cạnh** `#dfdfdf` 1px · `radius 0` · đệm ngang 8–12 | V2 |

Đệm ngang của ô search về **0** là có chủ ý: hộp nền đã bỏ thì 8px thụt vào đọc ra là *lệch lề*
chứ không phải padding — icon kính lúp phải thẳng lề nội dung.

**Thi hành 04/09/2026 (cả `index.html` + `desktop.html`):** 4 ô search của bộ demo, 3 ô đã đúng từ
18/08 (`#searchInput` · `#pkSearch` / `[data-pk-search]` · `#dkSearchInput`), còn **`#fBrandSearch`**
(ô "Tìm thương hiệu" trong bộ lọc) vẫn đóng khung 4 cạnh → gộp vào chung selector với
`.search-field`. Kèm một chỗ đồng bộ màu: ô tìm trong sheet chọn tỉnh/phường đang gạch `#dfdfdf`
(tầng V2) → kéo về `#0a0a0a` cho 4 ô search cùng một sắc.

**Bẫy:** `#fBrandSearch` mang sẵn `border border-border` 4 cạnh từ utility nên phải khai
`border: 0` **TRƯỚC** `border-bottom`, không thì 3 cạnh kia vẫn còn.

Đo lại sau khi áp — đúng hai nhóm, không lẫn:
`#fBrandSearch` `0/0/1/0 · #0a0a0a · nền trong suốt · pad 0 · cao 36 (không đổi)` ·
`#nsEmail`/`#nsPhone` `1/1/1/1 · #dfdfdf · nền trắng · pad 12` · ô khoảng giá `1/1/1/1 · #dfdfdf · pad 8`.
