# Figma — dựng màn tìm kiếm mobile + đổi tên khung trang thương hiệu (05/09/2026)

> Lệnh user: *"dựng màn tìm kiếm mobile và đổi tên khung trang thương hiệu"* — hai việc rút ra từ lượt
> soát bảng nghiệm thu của khách (Google Sheets *check list element*, 4 trang ☑ Đạt: PLP · Trang
> thương hiệu · Tìm kiếm · Bộ lọc).

---

## 1. Đổi tên khung trang thương hiệu — 11 chỗ

Vấn đề: trang thương hiệu **có đủ trong Figma** nhưng nằm dưới cái tên "PLP", nên khách mở file tìm
"trang thương hiệu" thì không thấy gì. Xác nhận bằng nội dung bên trong chứ không đoán theo tên:
`brand-hero`, `brand-description`, breadcrumb "Trang chủ › Versace", nút "Xem thêm" mô tả hãng.

**Đổi thẳng — 5 chỗ:**

| Cũ | Mới |
|---|---|
| section `PLP — mobile 375 + desktop 1440` | **`Trang thương hiệu — mobile 375 + desktop 1440`** |
| `PLP / mobile 375` | `Thương hiệu / mobile 375` |
| `PLP / desktop 1440` | `Thương hiệu / desktop 1440` |
| `[doc] PLP · mobile 375` | `[doc] Thương hiệu · mobile 375` |
| `[doc] PLP · desktop 1440` | `[doc] Thương hiệu · desktop 1440` |

Tiêu đề bên trong 2 khung `[doc]` cũng sửa theo (`PLP · Danh sách sản phẩm` → `Trang thương hiệu ·
mobile 375` / `· desktop 1440`).

**Thêm đuôi chứ KHÔNG đổi hẳn — 6 chỗ.** Sáu khung trạng thái vô tình được chụp trên nền trang thương
hiệu. Đổi tên chúng thành "Thương hiệu" thì bộ tài liệu trạng thái của listing mất hai mục "đang lọc"
và "0 kết quả"; để nguyên thì tên nói sai. Nên giữ trạng thái làm khoá chính và thêm đuôi:

`PLP / mobile · 0 kết quả` · `PLP / mobile · lưới 1 cột` · `PLP / desktop · đang lọc` ·
`PLP / desktop · 0 kết quả` · và 2 bản `· 03-09` của hai khung sau — nay đều mang thêm
**`(trên trang thương hiệu)`**.

> **Còn mở**: hai trạng thái "đang lọc" và "0 kết quả" hiện **chỉ có bản trên trang thương hiệu**,
> chưa có bản trên PLP danh mục. Muốn đủ thì phải dựng thêm 2 khung.

## 2. Dựng màn tìm kiếm mobile — 3 khung

Section **MỚI** `Tìm kiếm — mobile 375` (page `screens`), 3 khung + 1 khung `[doc]`:

| Khung | Khổ | Nội dung |
|---|---|---|
| `Tìm kiếm / mobile · mặc định` | 375×818 | lịch sử tìm ("Vừa tìm kiếm", 5 chip) + dải "Sản phẩm nổi bật" |
| `Tìm kiếm / mobile · đang gõ (gợi ý)` | 375×812 | gõ "túi" → pane `#searchSug` thay chỗ, 6 dòng gợi ý |
| `Tìm kiếm / mobile · không có kết quả` | 375×812 | gõ "zzzqqq" → `#searchSug` rút còn "Không tìm thấy kết quả", `#searchNores` đổ dải sản phẩm nổi bật |

Nguồn: `screenSearch` ở `index.html:4771`, đo trên khổ 375, bộ da vào-trang `skin-mt skin-li`.

**Bản desktop KHÔNG nằm cùng section** — nó là khung `Menu / desktop · lớp tìm kiếm` (1440×804) trong
section `Menu — mega desktop + drawer mobile`, vì bên desktop tìm kiếm là một **lớp phủ mở từ header**
chứ không phải màn riêng. Hai bên khác khuôn có chủ ý; khung `[doc]` đã ghi rõ để người đọc không đi
tìm nhầm chỗ.

**Dải "Sản phẩm nổi bật" là rail ngang** (`drag-x`, `overflow-x-auto`): nội dung thật rộng 742 trong
khung nhìn 375, nên khung Figma chỉ giữ **2 thẻ nhìn thấy** — đúng bằng mắt thấy trên máy. Hai thẻ còn
lại ở x = 372 và 550, nằm ngoài mép phải, luật cắt của bộ chuyển đã bỏ.

## 3. Ba lỗi bộ chuyển vá trong đợt này

Đây là phần đáng giữ lại nhất của lượt làm, vì cả ba đều **hỏng âm thầm — không báo lỗi**.

### (1) `.search-pane` chạy `animation … both` → bóc ra 19 node thay vì 79

Pane ẩn thì rAF bị bóp nên nó đứng ở keyframe đầu (`opacity 0`), luật cắt xoá sạch nhánh. Đây là
**lần thứ BA dính đúng một bệnh**: `.rise/.reveal` → `.ms-view` (04/09) → `.search-pane` (05/09).

Nên lần này **chặn từ gốc** thay vì thêm tên class thứ tư: `*{animation:none!important}`. Với
`animation-fill-mode: both` thì tắt đi = đứng ở trạng thái CSS gốc — đúng cái ta muốn đo; spinner với
pulse đứng yên cũng đúng.

**Dấu hiệu nhận ra**: số node ít bất thường mà `warnN` vẫn 0. Luôn đếm node trước khi dựng.

### (2) Builder tra text style THEO TÊN, mà DS đã đổi tên → bind 0

`styleFor()` bấm cứng 8 tên cũ (`t-title`, `t-copy`, `t-ui`, `t-body`, `t-micro`, `t-overlay-title`,
`t-label-1`, `t-label`). Đợt chuẩn hoá DS 04/09 đổi hết sang `t-display-title` · `t-body-multiline` ·
`t-body-single` · `t-body-lead` · `t-body-micro` · `t-label-overlay` · `t-label-lead` ·
`t-label-single` (+ `t-label-multiline` chưa từng có trong bảng). Mọi lượt tra ra `undefined` →
**bind 0 mà không một dòng cảnh báo**.

Vì sao không ai thấy: **Figma neo style theo ID, không theo tên**, nên mọi khung dựng TRƯỚC 04/09 vẫn
xanh 100% (đo lại: Menu 18/18 · PDP SP4 90/90 · PLP danh mục 218/218). Khung hôm nay là khung đầu
tiên dựng SAU đợt đổi tên, và nó là khung đầu tiên lộ ra lỗi.

Cách vá: **tra theo ĐẶC TẢ** — dựng bảng `family|size|weight|line-height → styleId` ngay từ
`getLocalTextStylesAsync()` lúc chạy. Đổi tên bao nhiêu lần nữa cũng không gãy. Kết quả: **18/18 ·
18/18 · 15/15 = 100%**, 0 chuỗi raw.

### (3) Nhãn cho trình đọc màn hình bị thổi thành chữ đè lên giao diện

Ô tìm kiếm có `<span>Tìm kiếm</span>` bị bóp còn **1×1 px** (nhãn a11y). Thẻ bọc 1×1 nhưng chữ bên
trong vẫn có kích thước thật, nên bộ chuyển phát ra một dòng chữ **73×20 nằm đè lên ô nhập**. DOM coi
đó là chữ ẩn; bản vẽ cũng phải coi vậy. Đã vá: bỏ qua mọi text nằm trong hộp **≤ 2px** (ngưỡng 2px để
không đụng gạch/đường kẻ — mà những cái đó không có text node trực tiếp nên vốn không vào nhánh này).

## 4. Đo

| Hạng mục | Kết quả |
|---|---|
| Khổ 3 khung | 375×818 · 375×812 · 375×812 |
| Text style gán | **18/18 · 18/18 · 15/15 = 100%**, 0 chuỗi raw |
| Ảnh | 4 · 1 · 4 ảnh, **0 lỗi nạp** |
| Auto layout | **85% · 100% · 90%** — phần còn tuyệt đối TOÀN BỘ là hộp `clamp` cắt chữ (nhóm ngoại lệ đã ghi danh) |
| Component ráp được | `badge kind=inline` (65×16 → 65×16, **lệch 0px**), 2 instance |
| Liên kết component hỏng | 0 |
| Section chồng lấn | 0 |
| Đối chiếu chữ với DOM | khớp; chênh lệch đều giải thích được (2 thẻ ngoài rail · placeholder · chuỗi đang gõ) |

**Ba khung `section` từng còn tuyệt đối** (tiêu đề thụt 16 còn danh sách tràn 0 — một bộ đệm không
phục vụ được cả hai) nay đã bật auto layout bằng cách bọc tiêu đề trong khung `pad/16`, cùng lối với
các khung `space/N` sẵn có trong file. Tiêu đề vẫn đứng ở x = 16, khổ khung không đổi.

**Component KHÔNG ráp** (đo rồi mới bỏ, không phải bỏ sót):
- `page-header-mobile` — cùng 375×48 nhưng component có **4 nút 40×40 với icon 24**, còn header màn
  tìm kiếm chỉ có **1 icon 14×14** (logo + nút đóng). Hai thiết kế khác hẳn, không phải lệch số đo.
- `product-item-info` (thẻ sản phẩm trong dải nổi bật) — component còn ở bản 26/08, lệch 8–120px, sửa
  thì 162 instance đang có sẽ xê dịch. Quyết định đang chờ user từ đợt trước.

## 5. Còn mở

1. **Trang thương hiệu chỉ có Versace** trong 5 hãng của `BRAND_PAGES`. Nếu dòng "Trang thương hiệu"
   khách hiểu là cả 5 hãng thì còn thiếu 4 khung.
2. **Khung PLP mobile còn ở dữ liệu cũ 16 sản phẩm**, desktop đã sang 40 (dữ liệu 02/09).
3. **Thẻ sản phẩm trong khung PLP mobile vẫn mang tên máy `div[product=N]`** — đợt đổi 1.707 tên hôm
   04/09 không với tới nhóm này.
4. Hai trạng thái "đang lọc" / "0 kết quả" chưa có bản trên **PLP danh mục** (xem mục 1).
5. **`figma_capture_screenshot` vẫn chập chờn**: chụp được cả section nhưng timeout 30s khi chụp từng
   khung. Mọi kiểm chứng trong báo cáo này là **số**, không phải ảnh.
