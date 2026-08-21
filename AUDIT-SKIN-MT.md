# Dò quy chuẩn `skin-mt` theo STYLE-RULES.md — 20/08/2026

> **Phạm vi:** `index.html` (mobile 375×812), bộ da mặc định `skin-mt`, 10 màn
> (plp · search · pdp · cart · checkout · done · account · order · login · privacy)
> + menu drawer. Desktop chưa dò — làm khi có yêu cầu.
> **Phương pháp:** `getComputedStyle` mọi phần tử đang hiện, đối chiếu từng trục với
> STYLE-RULES.md (bản đã chốt 8 việc). Loại trừ: popover Cài đặt (§5), phần tử ẩn,
> swatch màu sản phẩm (data hàng hóa, không phải style hệ), nhãn screen-reader.
> Số đếm mỗi màn có lẫn các sheet dùng chung nằm off-screen (filter, quick-add…) —
> dùng để định vị vi phạm, không dùng làm thống kê tuyệt đối.

**Kết luận nhanh:** mực chữ trên 10 màn **sạch tuyệt đối** (không một màu chữ ngoài
3 bậc — trừ 2 điểm nêu ở B6, B2), phần lớn độ lệch còn lại là **backlog 8 việc đã
chốt nhưng chưa thi hành** (nhóm A). Cái mới của lần dò này là **12 lệch chưa từng
được ghi nhận** (nhóm B) và **3 điểm cần bạn chốt** (nhóm C).

> **Cập nhật 20/08/2026 (chiều) — user chốt và đã thi hành trên `index.html`:**
> * **B2 ✅ đã sửa** — khuôn trạng thái mới `statusTag()`: chấm 6px màu hệ thống +
>   chữ 12/16 mực chính; áp cả list tài khoản lẫn màn chi tiết đơn. Đã đo lại: đạt.
> * **B5 ✅ đã sửa** — `.ms-tab`/`.search-tab` về 14/20. Đã đo lại: đạt.
> * **B7 ✅ đã sửa** — dấu chọn swatch chuyển `outline` đen, `--tw-ring-color` token
>   hóa toàn bộ da → hết ring xanh mặc định. Đã đo lại: đạt.
> * **B3 · B4 — giữ nguyên** (chốt user): badge giỏ + nhãn thẻ sau này thay bằng
>   icon thương hiệu, không sửa chữ/pill hiện tại. C2 treo theo.
> * **B11 ✅ hợp lệ hóa thành chữ ký bộ da** — ghi vào STYLE-RULES §2.2 (mặt thanh
>   dính, 3 vai đóng) + token `--surface-sticky` trong `shadcn-theme/`.
> * **C1 ✅ chốt** — brand chuyển hẳn sang **họ nhãn**: card T6 `12/16·500·hoa`,
>   PDP/quick-add T3 `14/20·500·hoa` (vai hoa thứ 6, §1.5). Đã thi hành + đo lại: đạt.
> * Còn mở: **B1 · B6 · B8 · B9 · B10 · B12** (chờ lệnh) và **C3** (confetti).

> **Kiểm màn CART lần 2 (20/08 tối)** — sau khi user bổ sung khối CSS mới
> *"3 chỗ +1 nấc weight + brand đồng bộ"* (phiên làm việc khác ghi vào `index.html`):
> * **Brand hàng giỏ ✅ chuẩn** — `.cart-row p:has(+ .del)` = 500 + hoa + dòng 16 → đúng T6,
>   khớp chốt C1; đã ghi bổ sung "hàng trong giỏ" vào vai 6 §1.5.
> * **3 chỗ nâng 500 đang NỬA CẶP** (500 nhưng chữ thường — §1.1 cấm trạng thái lai):
>   trigger "Bạn có phiếu mua hàng?" + "Ưu đãi & khuyến mãi" vốn là vai hoa 5 (chốt việc 8A:
>   T6 = 500 **+ hoa** + nhịp 16) → chỉ cần thêm `text-transform: uppercase` + `line-height: 16px`
>   là trọn chốt. "Tổng cộng" (nhãn + số) là **quyết định mới C4** — xem dưới.
> * **C4 (chờ chốt):** "Tổng cộng" 500 thường. (a — khuyến nghị) coi là NHÃN HÀNG TỔNG:
>   thêm hoa + nhịp 16, ghi vào §1.5 (số tiền không có chữ cái nên uppercase vô hại);
>   (b) giữ 500 thường = thêm ngoại lệ ghi danh thứ hai (phình danh sách đóng — chống chỉ định).
> * Phần còn lại của cart đều thuộc backlog đã chốt chưa thi hành: `12/20` ×58 (việc 1) ·
>   `16→12/24` ×3 gồm Tổng cộng (việc 3) · `18/27·28` ×3 (việc 3) · hoa-400 ×8 quà tặng/footer
>   (việc 7) · nền hồng −% ×3 + gradient sticky `#f7f7f7` (việc 5) · tracking rò nút Đặt hàng
>   sticky (§4.1) · VISA/TIKINOW 9px bo 3 + badge giỏ đỏ 9px (B3/B4/C2 — kệ chờ icon).
> * Mực ✅ sạch · viền trong màn ✅ sạch (3 tầng đúng) · bóng ✅ không · glass navbar ✅ chữ ký hợp lệ.

> **ĐỢT ÁP LUẬT MÀN GIỎ — THI HÀNH 20/08 tối (lệnh user "áp dụng đúng rule thử"):**
> khối CSS `6e` trong index.html, phạm vi `[data-screen="cart"]` + 1 fix global §4.1.
> Đã làm: cặp cỡ+dòng (leading-5→18, leading-6→16, 18→/24, 10→/14 — việc 1+3) ·
> canvas + gradient sticky về `#f2f2f2`, badge −% bỏ nền hồng (việc 5) · nhãn quà tặng +
> footer hoa lên 500, mực chính (việc 7) · trigger PBH + "Ưu đãi & khuyến mãi" +
> **"Tổng cộng" (C4a — đã ghi vai vào §1.5)** thành trọn cặp 500·hoa·16, hint PBH mực phụ
> 12/18, nút "Áp dụng" trắng viền V1 (việc 8A) · §4.1 chặn tracking global (miễn trừ
> #settingsPanel theo Phần 5).
> **Đo lại sau sửa: 129 phần tử chữ — 0 sai cặp (trừ 9/13.5 của badge giỏ + chip VISA
> thuộc nhóm B3/B4/C2 kệ chờ icon) · 0 weight lai · 0 hoa-400 · 0 tracking rò · mực/mặt/
> viền/bóng sạch.** Màn giỏ là màn đầu tiên đạt chuẩn STYLE-RULES đầy đủ; các màn khác
> nhân rộng bằng cách bỏ scope `[data-screen="cart"]` sau khi user duyệt thị giác.

> **DESKTOP.HTML — cùng đợt, thi hành ngay sau (lệnh user "áp dụng cho bản desktop luôn"):**
> khối `6e` tương ứng + phần riêng khổ này: override 4 remap còn lệch luật TRONG cart
> (`16→12/16` thay 14 · `18→18/24` thay 16 · `22/24/32→24/32` thay 18 · `11→12/16`).
> Ba việc đồng bộ GLOBAL cho cả bản desktop (không chỉ cart) vì là chốt toàn cục:
> **`.pc-brand` theo C1** (card 12/16·500·hoa; PDP h1 + quick-add 14/20·500·hoa — trước là
> 500 chữ thường, PLP/PDP desktop sẽ thấy brand hoa như mobile) · **footer nhãn 500**
> (việc 7) · **§4.1 chặn tracking** (+ miễn trừ #settingsPanel). Canvas giỏ → `#f2f2f2`.
> Khối "3 chỗ 500" của user hoàn thiện trọn cặp hoa+16 ("Tổng cộng" C4a; desktop không có
> accordion phiếu mua hàng — cụm CTA nằm card cột phải).
> **Đo lại: 0 vi phạm ngoài 9/13.5 badge giỏ + VISA (kệ).** Tiêu đề "Giỏ hàng" desktop ra
> 24/32 (markup 22 → T1 theo bảng quy đổi việc 3) — to hơn mobile 18/24 là do markup hai
> khổ chọn bậc khác nhau, thang vẫn chung.

---

## Bảng trạng thái từng màn

| Màn | Layout | Ngoài backlog còn gì |
|---|---|---|
| plp | đã chốt | B1 vạch `#d9d9d9` · B3 badge giỏ · B4 nhãn thẻ VISA · B7 ring swatch · C1 pc-brand |
| search | đã chốt | B5 `.search-tab` 14/18 |
| pdp | đã chốt | B6 chip size hết hàng `#a3a3a3` · thẻ khuyến mãi nền `#f7f7f7` (việc 5) · C1 pc-brand |
| account | đã chốt | **sạch nhất** — chỉ còn backlog |
| order | đã chốt | B2 badge «Đang giao» (điểm nặng nhất của màn) |
| login | đã chốt | B9 nút còn `tracking-wide` |
| privacy | đã chốt | B10 chip pill điều hướng chính sách |
| done | theo flow checkout | B8 eyebrow «Xác nhận» tracking 2.2px · tiêu đề 24/33 · C3 confetti |
| cart | **chưa chốt** | khuôn phẳng PBH (việc 8) · canvas `#f7f7f7` (việc 5) · quà tặng hoa 400 (việc 7) |
| checkout | **chưa chốt** | tiêu đề mục 12/24 (việc 3+8) · viền `#333` ở option đang chọn (§3.1) |
| menu drawer | đã chốt | B5 `.ms-tab` 14/18 · hàng danh mục hoa 400 (việc 7) · B10 segmented ENG/VIE |

---

## B — 12 lệch mới, chưa từng ghi nhận ở đâu

Mỗi mục: hiện trạng đo được → luật chiếu → đề xuất. Tất cả đều sửa được gọn.

**B1. Vạch chỉ dẫn `bg-[#d9d9d9]` — tông xám thứ tư, đi lậu bằng arbitrary hex**
5 chỗ markup / 59 phần tử hiện diện ở *mọi* màn (vạch dọc `w-px h-full` của cây
danh mục). `#d9d9d9` không thuộc tầng viền nào, và cách `#dfdfdf` đúng 6/255 —
chính loại "hai xám không phân biệt được" mà luật đã diệt ở mặt xám.
→ Đổi 5 chỗ về `bg-border` (V2). Lần dò trước lọt vì nó là *background*, không phải
*border* — bài học: kẻ dựng bằng nền cũng phải theo bảng viền.

**B2. Badge trạng thái đơn «Đang giao» (order) — 3 vi phạm trong 1 phần tử**
Đo: chữ `#8a6100` (mực lạ) · nền `#fef2f2` (mặt hồng đã khai tử ở việc 5) ·
pill `9999px` không tròn (§3.2). Đây là component trạng thái đơn hàng, luật chưa
có khuôn cho nó.
→ Đề xuất khuôn trạng thái theo đúng đòn bẩy của bộ da: **chấm tròn 6px màu hệ
thống (`--success`/`--warning`/`--info`) + chữ 12/16 · 400 · mực chính, không nền
không pill**. Chấm tròn là "hình tròn thật" nên hợp lệ §3.2.

**B3. Badge số giỏ — cỡ 9px dưới thang + nền đỏ**
`.cart-badge`: `text-[9px] font-bold` (bold đang bị blanket cứu về 400) + nền
`--destructive` chữ trắng. Thang chỉ có sàn T7 = 10/14, và đỏ theo §2.2 chỉ dành
cho giảm giá/lỗi.
→ Lên 10/14, bỏ `font-bold` trong markup. Nền đỏ hay đen → **C2** (bạn chốt).

**B4. Nhãn thẻ VISA · MASTER · JCB · TIKINOW — vi phạm cả 3 trục tại 1 component**
9px (VISA/MASTER/JCB) và 10/15 (TIKINOW) · tracking 0.225px/0.25px · `rounded-[3px]`.
→ Về chuẩn T7 `10/14 · tracking 0.5 · radius 0`. Wordmark viết hoa được giữ (đúng
ngoại lệ toàn dự án), nhưng số đo phải theo thang.

**B5. `.ms-tab` / `.search-tab` khai `14/18` ngay trong CSS skin-mt**
T3 quy định 14/**20**. Đây là vi phạm §1.3 nằm ngay trong khối luật tự viết —
2 dòng CSS (mục 4 của khối skin-mt), sửa `line-height: 18px → 20px` là xong.

**B6. Chip size hết hàng (PDP) — mực `#a3a3a3` nhạt hơn sàn**
§2.1: không có mực nào nhạt hơn `#666666` cho chữ đọc được; trạng thái nghỉ/disabled
chính là vai của `#666`.
→ `#a3a3a3 → #666666` — nếu cần phân biệt thêm thì chip hết hàng đã có sẵn gạch chéo.

**B7. Ring chọn/focus chưa token hóa — lộ xanh dương mặc định của Tailwind**
Swatch `.cw` dùng `ring-1 ring-primary` (box-shadow trắng 2px + đen) làm dấu đang
chọn, và 4 phần tử lộ `rgba(59,130,246,…)` — ring blue-500 *mặc định* của Tailwind.
→ Dấu chọn swatch chuyển sang `outline`/`border` (2px được phép — nó là dấu đang
chọn); mọi ring về `--ring` đen. Ghi chú thi hành: ring kỹ thuật là box-shadow nên
lần đo nào cũng sẽ báo "bóng" — chuyển outline thì hết nhiễu luôn.

**B8. Eyebrow «Xác nhận» màn done — tracking 2.2px giữa mặt tiền**
`text-[10px] tracking-[0.22em]` → 10/15 · 2.2px. Danh sách rò tracking cũ chỉ trỏ
popover dev; chỗ này là mặt tiền thật.
→ Nếu giữ vai eyebrow: nâng thành nhãn `12/16 · 500 · hoa · 0.5` (T6 — thêm vai thì
phải ghi §1.5 trước). Nếu không: về 10/14 · 0.5 thường.

**B9. Nút còn `tracking-wide/wider` trong markup**
«Tiếp tục mua sắm» + «Theo dõi đơn hàng» (done, 0.6px) · «Đăng nhập» (login, 0.3px) ·
«Đặt hàng» sticky (cart, 0.3px). Cùng họ rò tracking — fix chặn 1 dòng ở §4.1 giết
cả cụm, không cần sửa markup từng chỗ.

**B10. Pill không tròn còn sót thêm 2 cụm chưa liệt kê**
Chip điều hướng màn chính sách («Chính sách bảo mật»…) và segmented ENG/VIE trong
menu drawer (cái này nằm ở *mặt tiền* drawer, không phải popover dev).
→ Vuông theo §3.2, cùng đợt với grabber/progress/segmented đã ghi.

**B11. `glass-95` — mặt "thứ ba" chưa có trong luật**
Navbar/filterbar dùng trắng 95% + blur (`color(srgb 1 1 1 / .95)`). Không hẳn vi
phạm — nhưng luật §2.2 chỉ có 2 mặt, chưa định nghĩa mặt dính này.
→ Đề xuất **hợp lệ hóa**: ghi vào §2.2 một dòng "mặt thanh dính = trắng 95% + blur,
chỉ cho navbar/filterbar/sticky bar", token hóa thành `--surface-sticky`.

**B12. Bóng "trong suốt" còn khai trên checkbox/segmented (`shadow-sm`)**
Vô hình trên màn (màu ra rgba 0) nên không phải lỗi thị giác — nhưng là khai báo
chết, mỗi lần đo lại nổi lên như vi phạm. Dọn khi tiện, mức ưu tiên thấp nhất.

---

## C — 3 điểm cần bạn chốt (không tự sửa)

**C1. `.pc-brand` — 500 chữ thường, 10–16 chỗ/màn ở PLP/PDP.** Bạn đích thân yêu cầu
nâng nó 18/08. Nhưng sau chốt 20/08, ngoại lệ ghi danh *duy nhất* là trigger bộ lọc —
pc-brand giờ đứng ngoài luật. Hai đường: **(a)** về 400, tên thương hiệu phân cấp
bằng vị trí dòng 1 + mực chính (đúng luật, khuyến nghị); **(b)** ghi thành ngoại lệ
ghi danh thứ hai ở §1.1.

**C2. Badge số giỏ: nền đỏ hay đen?** §2.2 xếp badge vào mặt tối `#0a0a0a`
(khuyến nghị — đơn sắc, đúng giọng bộ da); giữ đỏ thì phải ghi thành ngoại lệ màu
chức năng ở §2.2.

**C3. Confetti màn done — 4 màu ngoài hệ** (`#d62845 · #8a6100 · #999 · #dfdfdf`).
Là khoảnh khắc ăn mừng, có lý để phá luật *một lần*; nhưng nếu muốn tuyệt đối đơn
sắc thì đổi thành confetti đen/xám. Khuyến nghị: giữ, ghi 1 dòng ngoại lệ vào §5.

---

## A — backlog 8 việc: số liệu xác nhận lại từ lần dò này

Không có phát hiện đảo chiều — các con số khớp Phần 0 của luật:

* **Việc 1** (thân bài 12/20 → 12/18): 99–174 phần tử/màn, vẫn là khối lệch lớn nhất.
* **Việc 3** (thang 2 bản, bỏ 16): mọi `text-[16px]` đang ra `12/24` (tiêu đề mục
  checkout `ck-title`, h2 màn chính sách, «Tổng cộng» giỏ, «UserOne» account…) —
  tiêu đề mục chìm bằng thân bài, đúng bệnh việc 8 mô tả.
* **Việc 5**: `#fef2f2` badge −% (3–6/màn) · `#f7f7f7` ở canvas giỏ + thẻ khuyến mãi
  PDP + hộp `ck-notice` checkout.
* **Việc 7**: hoa-400 tại footer (6), hàng danh mục drawer (9), nhóm quà tặng giỏ (8).
* **Việc 8**: khuôn PBH/cam kết/promoRule như đã đo hôm qua, không đổi.
* **§3.1**: `#cfcfcf` 340–368 lượt viền/màn (V2 tương lai) · viền `#333` ở option
  checkout đang chọn (8) · viền `#f2f2f2` (4).
* **Việc 4** + §3.2: quick-add tròn, grabber, progress, 3px VISA (gộp B4).
* **§3.3**: `#topFab` không lọt vào phép đo (opacity 0 khi chưa cuộn) — vẫn giữ
  trong danh sách sửa, đừng quên vì vắng mặt ở đây.

---

## Thứ tự sửa đề xuất (khi bạn ra lệnh)

1. **2 fix nền móng Phần 4** (remap theo cặp + chặn tracking): tự giải quyết việc
   1, việc 3, B9 và phần lớn B4/B8 — hơn nửa tổng độ lệch, không đụng markup.
2. **Việc 5 + 7 + 8** (mặt màu, nhãn hoa 500, khuôn headline) + §3.1 gom viền.
3. **Nhóm B còn lại** — đa số là sửa 1–5 dòng mỗi mục (B1, B2, B3, B5, B6, B7, B10).
4. **Nhóm C** — sau khi bạn chốt 3 câu ở trên.

*Đo lúc 20/08/2026 trên `http://localhost:8123/index.html` (đã bust cache), 375×812.
Nhắc lại bẫy đo: viền qua preview pane bị scale (1px đọc ra 0.8px) — độ dày viền
kết luận theo rule trong CSS, không theo `getComputedStyle`.*
