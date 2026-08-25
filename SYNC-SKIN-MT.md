# Những gì `skin-mt` đã nâng cấp mà 3 bộ da kia chưa có

> ## TRẠNG THÁI 25/08/2026 — A–F ĐÃ XONG CHO **MAIKA**, bằng cách ĐỔI GỐC chứ không port
>
> Lệnh user: *"hãy quên skin mp đi, giờ tôi đang muốn dùng giao diện của skin-mt nhưng điều
> chỉnh lại sử dụng mix font inter và libre"*. Nên thay vì port 37+40 selector, Maika đổi ô
> class trong `SKINS` từ `skin-mp skin-mk` sang **`skin-mt skin-mk`** → thừa hưởng nguyên giao
> diện `skin-mt`, kể cả mọi nâng cấp về sau. **A · B · C · D · E · F đều có ngay**, đo lại xác
> nhận: mobile 3.465 / desktop 3.757 phần tử, 100% chỗ lệch so với `skin-mt` đều dính
> `font-family` (kèm width/height do Inter hẹp hơn Montserrat) — **0 chỗ lệch về style**.
>
> · ~~**A3 đã vá** ở chính `skin-mt`: `.quick-add` nay vuông thật (chi tiết trong bảng A dưới).~~
> **A3 GỠ HẲN 25/08** — user chốt *"Icon quick add to cart ở bản mobile sẽ hình tròn như cũ"*, nên `.quick-add` trở về tròn `9999px` ở cả 5 bộ da; không còn gì để sync.
> · **A2** lấy trọn theo bạn chọn: ẩn nút, dùng dải size hover.
> · Ngoại lệ duy nhất giữ lại: cụm accordion PDP của Maika 14/20 · nhãn 500 · **chữ thường**.
> · **G và H CHƯA làm** — đang chờ bạn quyết sau khi xem phần chỉ rõ ở cuối file này.
> · **Bộ da mặc định và `skin-mp` KHÔNG đổi** trong lượt này (trừ A3 vốn là bug của skin-mt).

> Quét 25/08/2026. Cách quét: tách toàn bộ CSS trong `<style>` của `index.html` + `desktop.html`,
> gom mọi rule theo bộ da (`skin-mt` · `skin-mp` · `skin-mk`/Maika · mặc định), chuẩn hoá về
> **"selector lõi"** (bỏ tiền tố bộ da) rồi lấy các lõi **chỉ `skin-mt` có**. Cộng thêm 2 chỗ
> `skin-mt` được gác ở **tầng markup** (không phải CSS) nên không lộ ra trong bảng CSS.
>
> | | selector lõi có bộ da | chỉ `skin-mt` có |
> |---|---|---|
> | `index.html` | 107 | **37** |
> | `desktop.html` | 128 | **40** |
>
> Cột "3 bộ kia" = số đo thật bằng `getComputedStyle` trên trang chạy, không suy từ code.
> Bảng này **chỉ liệt kê**, chưa sửa gì. Tick vào cột cuối rồi tôi làm.

---

## A — Thẻ sản phẩm & quick add (đúng chỗ bạn nhớ)

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **A1** | **Mobile: quick add chỉ còn TÊN + MÀU + SIZE.** Bỏ hẳn dải ảnh gallery và khối giá **ở tầng markup** (`quickAddBody`, chốt 19/08 — bỏ ở markup chứ không ẩn bằng CSS vì dải ảnh tải tới 9 ảnh) | dựng đủ gallery 9 ảnh + giá + badge `-%` + giá gạch | [index.html:10392](index.html:10392) · [index.html:10412](index.html:10412). Đây là **cấu trúc**, không phải style |
| **A2** | **Desktop: BỎ nút quick add, thay bằng dải size hiện khi rê chuột.** `.quick-add{display:none!important}` + 8 rule dựng `.pc-sizes` (lưới 3 cột · `.is-few` xếp hàng ngang · hiện khi `.group:hover` hoặc `:focus-within`) và `.pc-size` (cao 36 · pad 0 8 · hover nền ghost · `.is-oos` gạch ngang) | nút tròn 36×36 vẫn hiện · `.pc-sizes` `display:none`, **tính năng không tồn tại** | Đo được: skin-mt `pc-sizes` = `grid`, 3 bộ kia = `none`. Đây là upgrade **tương tác**, nặng nhất trong danh sách |
| ~~**A3**~~ *(hết hiệu lực 25/08)* | ~~Mobile: quick add **vuông** (chốt Phần 6 việc 4, 20/08)~~ → **tròn**, ngoại lệ §3.2 thứ 2 | tròn 9999px — **nay khớp** | ⚠ **RULE ĐANG KHÔNG ĂN Ở CHÍNH skin-mt**: markup đặt `border-radius: var(--rounded-infinite, 9999px)` **inline** nên thắng rule bộ da. Đo ra skin-mt vẫn tròn → phải sửa bug này trước, chưa có gì để sync |
| **A4** | `.pc-brand` = 14/20 · 400 · chữ thường (chốt 24/08, đảo C1) | skin-mp + Maika **12/18** · 400 · thường · mặc định 14/20 · **500** | Lệch cả cỡ lẫn độ đậm |
| **A5** | `.pc-badges { gap: 8px }` (desktop) | nhịp badge của base | Nhỏ |

## B — Badge giảm giá

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **B1** | Badge `-%` **bỏ mặt hồng**, chỉ còn chữ đỏ (`.bg-destructive-subtle` → trong suốt, padding 0). Chốt **Phần 6 việc 5, 20/08** | skin-mp/Maika nền `#fdecea` · mặc định `#fef2f2`, padding 2 4 | Có 2 rule: toàn app + riêng màn giỏ. Là **chốt đã duyệt**, không phải gu riêng |

## C — Giỏ hàng: hướng editorial (cụm lớn nhất — mobile 13 rule, desktop 8)

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **C1** | Vách 1px thay hộp: hàng "Chọn tất cả", khối cam kết, mỗi món trong danh sách | không vách (`0px`), vẫn là hộp | Đo: skin-mt `1px #ececec` · 3 bộ kia `0px` |
| **C2** | "Tổng cộng" + trigger accordion CTA = **nhãn hoa 500** | skin-mp/Maika 400 thường · mặc định 500 thường | Thuộc §1.5 vai 5 |
| **C3** | `#promoPeek` · `#applyPbh` · `#rewardOpts` **bỏ hộp**: nền trắng, viền 0, bo 0, padding lại | mặc định còn bo **8px** · skin-mp/Maika nền trong suốt nhưng nhịp khác | |
| **C4** | `.gift-group`: nhãn nhịp 16, link gạch chân, nền do markup lo | nhịp/mực khác | |
| **C5** | Tên sản phẩm trong giỏ về 400 chữ thường | theo markup | |

## D — Hệ viền "phần tử tương tác = đen 1px" (đo mytheresa 18/08)

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **D1** | `[data-size-trigger]` viền **đen** (ô chọn size ở PDP) | viền xám của base | |
| **D2** | `.opt.on` viền đen (ô chọn ưu đãi/điểm) | viền xám | |
| **D3** | `.cw` bỏ bóng + `.cw.ring-1` **outline đen offset 2** (swatch màu) | còn bóng, ring theo token | |
| **D4** | `.chip.off` bỏ nền, chữ muted, **gạch ngang** cho "hết hàng" | nền `rgba(0,0,0,.04)` + chữ `#a3a3a3` | Maika **đã có trong panel bộ lọc** (lượt hôm nay), ngoài panel thì chưa; skin-mp + mặc định chưa có chỗ nào |

## E — Ô tìm kiếm

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **E1** | `.search-field` **bỏ hộp xám, chỉ còn gạch dưới đen** (cả 2 khổ: màn Search + sheet chọn tỉnh/phường) và desktop thêm `#dkNavSearchField` | hộp nền xám bo 2px | Code ghi rõ **vì sao chưa sync**: chưa đo được ô tìm kiếm của MR PORTER (site chặn), tự chế một kiểu là rơi vào lỗi "bê nguyên/tự suy". Nay có thể chốt bằng tay |

## F — Accordion & PDP

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **F1** | `.acc.border-b` **đảo vách**: viền TRÊN 1px, bỏ viền dưới | viền dưới 1px | Đo được ở cả 2 khổ |
| **F2** | `[data-screen^="pdp"] .acc.border-b:first-child` bỏ vách trên của mục đầu | — | Đi kèm F1 |
| **F3** | `[data-screen="pdp3"]` accordion 14/20 | Maika **đã xử theo cách riêng** (cả 6 bản PDP về 14/20 · nhãn 500 · chữ thường) · skin-mp và mặc định chưa | Coi như đã giải quyết cho Maika |
| **F4** | `.pick-label` nhịp dòng 16 (ô chọn tỉnh/phường) | nhịp base | Nhỏ |

## G — Khuôn "headline + support" (Phần 6 việc 8, chốt 20/08)

| ID | `skin-mt` làm gì | 3 bộ kia đang | Ghi chú |
|---|---|---|---|
| **G1** | Nhãn mở mục trong khối cam kết / ưu đãi → **hoa 12/16** (`.bg-secondary.mt-4 .acc-trigger > span`, `p.font-medium`) | chữ thường theo markup | Là chốt đã duyệt |

## H — Phẳng hoá: **KHUYẾN NGHỊ KHÔNG SYNC** (đây là danh tính riêng của `skin-mt`)

| ID | `skin-mt` làm gì | Vì sao không nên sync |
|---|---|---|
| H1 | `#topFab` bo 0 + bỏ bóng (desktop thêm `:hover`) | skin-mp **cố ý** bo 2px; bo tròn/bóng là chữ ký của bộ da khác |
| H2 | `.h-1.rounded-full` (tay nắm sheet) bo 0 | như trên |
| H3 | `.h-7.px-3.rounded-full` bo 0 | như trên |
| H4 | `:where(.rounded-[3px])` bo 0 | như trên |
| H5 | `* { --tw-ring-color: primary }` vòng focus đen | mỗi bộ da có mực riêng |
| H6 | desktop `h1 { font-weight: 500 }` | thuộc thang chữ riêng |

---

## Gợi ý thứ tự nếu bạn muốn tôi khuyến nghị

1. ~~**A3 trước tiên** — nó là **bug**, không phải việc sync: rule của chính `skin-mt` đang bị inline style đè.~~ **XONG theo hướng ngược lại 25/08:** user chốt giữ tròn, nên rule vuông hoá gỡ hẳn — 5 bộ da nay cùng `9999px`, hết lệch.
2. **A2** — upgrade đáng giá nhất về trải nghiệm (dải size hover thay nút quick add), và là thứ 3 bộ da kia **không có tính năng**, chứ không phải khác màu.
3. **A1** — cùng cụm quick add, gọn: chỉ là mở/đóng 2 nhánh markup theo bộ da.
4. **B1 + G1** — 2 chốt đã duyệt ở Phần 6, sync là trả đúng quyết định cho mọi bộ da.
5. **C (giỏ hàng)** — cụm lớn, nên làm thành một lượt riêng và chốt trước là "editorial hoá giỏ cho bộ da nào".
6. **D + F1/F2** — hệ viền; nên đi cùng nhau, vì sync lẻ sẽ ra nửa hệ.
7. **E1** — chờ bạn chốt bằng tay (không có số đo để dựa).
8. **H** — bỏ.
