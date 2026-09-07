# Trang tài khoản — soát theo hệ và dựng lại · 05/09/2026

Lệnh user: *"Check my account pages have follows this style yet, if not. Feel free to
redesign their UI."*

**Trả lời ngắn: CHƯA.** Đo trên trang chạy ra **12 điểm lệch**, và điểm nặng nhất không
phải một con số sai mà là một quyết định hình học: **màn Tài khoản + Chi tiết đơn là hai
màn CUỐI CÙNG còn dựng bằng HỘP**, trong khi chốt 21/08 của trang giỏ đã đưa cả dự án sang
*nền trắng + kẻ mảnh + khoảng trắng*.

Đã dựng lại **cả 2 file** (`desktop.html` + `index.html`), 5 tab + màn chi tiết đơn.

---

## 1. 12 điểm lệch đo được (trước khi sửa)

| # | Điểm lệch | Số đo |
|---|---|---|
| 1 | Avatar chữ "U" dùng `text-[18px]` → **18/24**, bậc NGOÀI thang 6 bậc. Nặng hơn: `text-[18px]` chính là **hook tiêu đề mục** — nó thoát Libre Bodoni chỉ vì là `<span>` chứ không phải h1/h2/p | 1 phần tử |
| 2 | **Viền V3 #ececec dùng làm viền HỘP** (`border-border-1`) | **11 lần** ở account, 8 lần ở order. Đối chiếu: PLP 9×#dfdfdf / **0**×#ececec · PDP 27× / **0**× |
| 3 | `rounded-md` · `rounded-lg` · `rounded-xs` — token radius bằng 0 nên vẽ ra vuông, nhưng khai báo sai và sẽ vỡ nếu chạy bộ da gốc | 15 chỗ (desktop) |
| 4 | `tracking-[0.2em]` — bị rule chặn của bộ da kéo về 0,5px = **khai báo chết** | 1 |
| 5 | `text-[12px]` thô, lọt lưới đợt chuẩn hoá thang chữ 04/09 | 3 |
| 6 | Nút **không có** `.btn-o`/`.btn-p`/`.btn-s` → mất sạch state hover/active của hệ nút | 4 nút |
| 7 | `px-5` (20px) — ngoài thang 4/8/16/24 | desktop 5 · mobile 13 |
| 8 | `.t-display-title font-light` → **24/32 Inter**, trong khi mọi màn khác tiêu đề ra **24/32 Libre Bodoni** | 3 chỗ |
| 9 | Màn chi tiết đơn **không có bậc trưng bày nào** — chủ thể của trang (mã đơn) nằm ở bậc chữ nhỏ nhất | — |
| 10 | `opacity-70` / `opacity-80` trên chữ → đẻ bậc mực thứ 4/5 ngoài thang 3 bậc | 3 |
| 11 | Pill "Mặc định" `bg-primary rounded-full` — bo tròn trên phần tử CÓ CHỮ (không phải hình tròn thật) | 1 |
| 12 | Thanh tiến độ hạng thành viên `h-2 rounded-full`, trong khi thanh tiến độ PLP là `h-0.5` VUÔNG — hai thanh tiến độ khác nhau trong một app | 1 |

Kèm 4 chỗ **2 bản lệch nhau** ở cùng một hàm: hàng thông tin desktop có kẻ / mobile không ·
hàng đáy thẻ đơn desktop có kẻ / mobile không · màn order desktop kẻ 8 lần / mobile 0 lần ·
3 nút cuối desktop cao 48/48/48 / mobile 48/44/44.

---

## 2. Hướng sửa: đổi vai, không vá số đo

**Cột 280 thôi làm cái hộp và trở lại đúng bản chất của nó — một CỘT ĐIỀU HƯỚNG.** Ngôn ngữ
điều hướng của dự án đã có sẵn ở hàng ngành hàng `.dk-dept`: 3 bậc mực + vạch 2px, không
mảng nền, không viền bao. Mọi thẻ/hộp/pill thành HÀNG ngăn nhau bằng một kẻ 1px. Mọi tiêu đề
lấy lại bậc trưng bày qua đúng hook duy nhất của hệ.

Ba quyết định thống nhất, **mỗi vấn đề chỉ một cách giải**:

1. **KẺ** — dùng DUY NHẤT `border-border` #dfdfdf cho mọi vạch ngăn ở cả 2 màn.
   `border-border-1` #ececec về **0 lần**.
2. **DẤU ĐANG CHỌN** — vạch 2px chỉ có MỘT nghĩa: "mục điều hướng đang chọn". Nên chỉ tab
   được dùng. Địa chỉ mặc định là **cờ dữ liệu**, không phải state → đi bằng chữ `(Mặc định)`,
   sao y checkout (một sổ `ADDRESSES` dùng chung 2 màn thì phải một cách nói).
3. **THANH TIẾN ĐỘ** — về đúng hình học `#plpProgress`: `h-0.5 bg-border` + ruột
   `h-full bg-primary`, VUÔNG 2px.

Lề: **20px biến mất khỏi cả 18 chỗ**; mobile chạy MỘT lề 16 duy nhất. Nhờ đó chuỗi class của
từng hàng/băng **giống hệt nhau giữa 2 file** — khác biệt chỉ nằm ở lớp bọc.

---

## 3. CSS mới: đúng **1 rule-set**, và nó không phải tên mới

`.acc-tab` (và `.acc-tab-underline`) đã nằm trong markup CẢ 2 FILE + 2 dòng JS **từ lúc dựng
màn**, nhưng grep cả 2 file lẫn `tailwind.css` **không ra một rule CSS nào** đứng sau chúng —
hook chết. Hệ quả: trạng thái đang-chọn phải gánh bằng chuỗi utility + một `<span>` vạch riêng
(5 node thừa mỗi màn), và JS dựng lại `className` bằng chuỗi in cứng có `text-[14px]` nên
**nhãn tab nhảy cỡ ngay cú bấm đầu tiên**.

Lượt này cho hook đó một thân: 5 khai báo + `::after`, trục vạch khai riêng theo khổ (dọc cho
desktop, ngang cho mobile). Xoá `.acc-tab-underline` khỏi cả markup lẫn JS.

Không xếp được bằng utility vì bản `tailwind.css` đã build chỉ có **đúng một** biến thể hover
cho màu chữ (`hover:text-foreground` = #0a0a0a) — dùng nó cho tab là hover trùng mực
đang-chọn, đúng lỗi "mục chỉ-đang-rê trông y hệt mục đang chọn" mà dự án đã ghi ở khối nav.
Bậc #333 buộc phải khai bằng CSS.

Ba class từng được cân nhắc đã **cắt** để giữ con số ở 1: hàng đơn hàng dùng utility
`hover:bg-accent-0` (có trong build) thay vì `.acc-row`; 3 băng nhấn dùng `bg-accent-0` /
`style="background:var(--surface-dark)"` thay vì `.acc-band`; hàng cuối đảo chiều kẻ sang
`border-t` + phép ba ngôi theo chỉ số thay vì `last:border-0` (build **không có** biến thể
`last:` nào).

---

## 4. Số đo SAU — đo trên trang chạy, 1440

| Trục | Trước | **Sau** |
|---|---|---|
| Bậc chữ ngoài thang | **1** (18/24 avatar) | **0** — cả 5 tab + màn order |
| Sắc viền | #ececec **11×** + #dfdfdf | **chỉ #dfdfdf**: account 12× · order 14× |
| Bo góc ≠ 0 | `rounded-md/lg/xs` 15 chỗ | **0** — chỉ còn `9999px` trên hình tròn THẬT (avatar · chấm trạng thái · 2 chấm timeline) |
| Đổ bóng | 0 | **0** |
| Libre Bodoni ở màn tài khoản | **0 phần tử** | **1–2 mỗi tab** (h1 + giá trị trưng bày) |
| Libre Bodoni ở màn chi tiết đơn | **0** | **1** (h1 "Đơn hàng #DAFC102938") |
| `px-5` | desktop 5 · mobile 13 | **0 / 0** |
| `opacity-*` trên chữ | 3 | **0** |
| Bậc chữ dùng trong tab Thông tin | 12/16 + 12/18 (phẳng) | 24/32 · **14/20** · 12/16 — `.t-lead` trước đó dùng **đúng 0 lần** trên cả màn |

Đo bản EN sau khi sửa: **0 chuỗi tiếng Việt sót**, và đổi ngược về VI cũng sạch (round-trip
không kẹt chuỗi nào).

---

## 5. Việc làm thêm ngoài phần "đẹp"

* **Vùng bấm hàng đơn hàng**: trước chỉ chữ "Chi tiết" bấm được (~44×18 trong một thẻ cao 96).
  Nay **cả hàng là nút** → ~720×94 (desktop) / 343×94 (mobile). Luồng không đổi: handler đọc
  `[data-order]` + `dataset.order` nên dời thuộc tính lên thẻ cha là chạy y nguyên, **0 dòng
  JS phải sửa**. ("Chi tiết" bắt buộc hạ xuống `<span>` — button lồng button là HTML không
  hợp lệ.)
* **Một lỗi chồng chữ có sẵn** đã tự hết khi bỏ pill: pill "Mặc định" đặt tuyệt đối mà thẻ tên
  không có `pr-*` nào, nên tên hoặc số dài hơn sẽ chui xuống dưới pill.
* **Vùng chạm "Đăng xuất" ở mobile**: trước không có chiều cao (~18px). Nay `h-11` = 44.
* **2 lệch dữ liệu**: lịch sử điểm ở `desktop.html` còn ghi năm **2025** trong khi `ORDERS`
  của chính file ghi 2026 (bản mobile đã đúng từ trước) · `index.html` dùng literal
  `text-emerald-600` của Tailwind thay vì token `text-success` (3 chỗ).
* **1 lệch nhãn**: nút theo dõi đơn ghi `GHN284917` trong khi băng vận đơn cùng màn và bản
  mobile đều ghi `TKN284917`.
* **2 luật i18n mới** cho 2 chuỗi có SỐ ("… · Hạng Vàng" và "≈ … giá trị quy đổi") — đi bằng
  regex chứ không phải khoá tĩnh, vì in số vào khoá thì đổi số một cái là chết dịch.
* **`aria-current`** thay cho cờ bằng class — thuộc tính có nghĩa cho trình đọc màn hình.
* `localizeNew(body)` thêm vào nhánh đổi tab của `index.html` (trước đây thiếu, nên ở EN đổi
  tab xong cả h1 lẫn ruột trở về tiếng Việt).

---

## 6. Đã kiểm chạy được

* `node --check` khối `<script>` cả 2 file: **OK**.
* Render **đủ 18 screen** ở cả 2 file: **0 lỗi, 0 log lỗi console**.
* Bấm qua lại đủ 5 tab: cờ `aria-current` đúng, nhãn **không nhảy cỡ**, ruột đổi theo,
  `document.querySelectorAll('.acc-tab-underline').length === 0`.
* Quét vét vùng account + order ở cả 2 file: `border-border-1` · `px-5` · `rounded-md/lg/xs` ·
  `opacity-*` · `tracking-[` · `text-[12px]` · `font-light` · `text-emerald` — **mọi hit còn
  lại đều nằm trong comment**, 0 hit trong code.
* Bản EN: h1 ra "Rewards" ở Libre Bodoni 24/32, 5 nhãn tab dịch đủ, 0 chuỗi Việt sót.

### Một bẫy đã dính trong lượt này

Tôi viết comment HTML có dấu **backtick** (\`w-[280px]\`, \`text-[18px]\`…) vào markup — mà
markup nằm trong template literal, nên **một dấu backtick là cắt đôi chuỗi**, `node --check`
gãy ngay. Đây đúng cái bẫy README đã ghi. Đã viết một script quét gỡ backtick khỏi mọi comment
HTML của 2 file (16 comment, 116 dấu) và để lại trong scratchpad để lượt sau dùng lại.

---

## 7. Cần bạn chốt — 6 mục

1. **Kẻ của trang giỏ có kéo theo không?** Tôi chốt cả 2 màn dùng duy nhất #dfdfdf. Nhưng
   trang giỏ — chính bản chốt 21/08 mà cả dự án lấy làm chuẩn — vẫn dùng #ececec cho kẻ ngăn
   hàng. Sau đợt này **giỏ là chỗ duy nhất còn kẻ #ececec trong thân trang**. Giữ nguyên (chấp
   nhận 1 chỗ lệch) hay mở một đợt nhỏ đưa giỏ về #dfdfdf?
2. **Chấm trạng thái 6px có nâng lên 8 không?** Màu #8a6100 là đúng vai (token warning trên
   hình tròn thật). Tồn đọng là ĐỌC ĐƯỢC: ở đường kính 6px, nâu vàng sẫm đứng cạnh chấm #666
   của đơn "Hoàn tất" gần như không phân biệt nổi. Đề xuất `w-1.5 h-1.5` → `w-2 h-2` cho cả 4
   tone, không đổi màu, không đổi token. **Chưa áp** vì nó sửa `statusTag()` dùng chung ở 4
   điểm gọi trên 2 file.
3. **Hai dòng 24/32 trong cùng một tab — chấp nhận chứ?** Tab Thành viên và Điểm thưởng có h1
   (24/32 Bodoni) rồi ngay dưới là "Hạng Vàng" / "1.240" cũng 24/32 Bodoni, chỉ khác mặt phẳng.
   Hệ chỉ có MỘT bậc trưng bày nên không có bậc nào để hạ con số xuống mà nó vẫn giữ vai "chủ
   thể của tab". Tôi cho là đọc được vì mặt phẳng ngăn; nếu bạn thấy nặng thì hạ 2 giá trị đó
   về `.t-lead` 14/20 — nhưng khi đó băng mất hẳn điểm dừng mắt.
4. **Lưới 12 cột chưa khớp.** Cột nav 280 và cột nội dung `max-w-[720px]` đều không rơi vào
   bội số nào (đúng lưới là 330 = 3 cột và 776 = 8 cột). Tôi giữ 280/720 để không phá rule
   co giãn ở dải hẹp. Kéo về lưới thì đây là chỗ sửa.
5. **Ba chỗ 2 bản CỐ Ý khác nhau — xác nhận giúp.** Ngoài chúng ra mọi chuỗi class đều giống
   hệt. (a) Cỡ nhãn tab: desktop 14/20, mobile 12/16 — ở 375 thì 5 nhãn 14/20 + 4 khe 24 đo ra
   ~443 > 375 nên tab 4–5 khuất ngay lúc mở màn. (b) Hàng hành động màn order: desktop 3 nút
   ngang, mobile xếp dọc. (c) Vùng địa chỉ + phương thức: desktop 2 cột, mobile xếp dọc. Cả 3
   đều do khổ máy bắt.
6. **`text-[18px]` nay còn mang 2 GIÁ TRỊ** ("Hạng Vàng", "1.240") chứ không chỉ tiêu đề. Nếu
   sau này có đợt quét "đổi hết tiêu đề mục", 2 chỗ này bị cuốn theo. Cách chặn rẻ nhất là
   thêm thuộc tính `data-acc-display` chỉ để grep (không kèm rule CSS nào). Để ngỏ.

---

## 8. Nợ cũ vẫn còn (không thuộc phạm vi lượt này)

`.t-display-title` **không nhận `--font-head`** nên **h1 tiêu đề PLP và h1 brand ở PDP vẫn
đang vẽ ra Inter 24/32**, trong khi tiêu đề mục (`text-[18px]`) ra Libre Bodoni. Lượt này màn
Tài khoản đi bằng hook `text-[18px]` nên **nó đã khớp**; hai màn kia thì chưa. Vá ở
`.t-display-title` là đúng hệ nhưng chạm 2 màn đã chốt với khách — vẫn chờ bạn quyết (ghi từ
báo cáo trang chủ 04/09).
