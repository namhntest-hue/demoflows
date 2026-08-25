# Dò `home.html` theo chuẩn shadcn/ui — 24/08/2026

> Chuẩn dò: `shadcn-theme/SHADCN-NOTES.md` — **§3** (thang chữ = key của preset),
> **§5** (bảng chỉnh bắt buộc theo từng component), **§6** (3 lệnh grep review).
> Đo trên trang chạy ở 1440 và 375, cả 3 screen `nam` · `nu` · `beauty`.

---

## 1. §6 — 3 lệnh grep của sổ tay: **PASS**

| Lệnh | Kết quả |
|---|---|
| `text-\[ \| tracking-\[ \| shadow-\[ \| rounded-\[ \| leading-\[` | **2 — đều nằm trong COMMENT**, không phải class sống (một chỗ dẫn lại markup gốc `text-[14px]`, một chỗ nhắc `rounded-[3px]` của 2 demo). Class thật: 0 |
| `font-(semibold\|bold\|light)` | **0** |
| hex rải tay | CSS: **1** (`--canvas: #f7f6f3`) — đó là dòng KHAI TOKEN, đúng cách §4.3-3 bảo. Markup/JS: 25, **tất cả là data màu sản phẩm** (`{name:'Nero',hex:'#0a0a0a'}`) và SVG cờ VN |

---

## 2. §3 — thang chữ: **FAIL → đã sửa**

**Lỗi:** trang khai thang riêng `.t1 … .t7`. Đúng số, **sai tên**. Preset
`tailwind.preset.js` đã nướng thang luật vào key Tailwind; dùng tên riêng nghĩa là
port sang build Hyvä/React phải dịch từng class, và component shadcn copy vào đây
thì `text-sm` không ăn thang nào cả.

**Sửa:** đổi tên toàn bộ sang key của preset — **7 selector CSS + 164 chỗ trong
markup/JS** (360 phần tử lúc chạy). Số đo **không đổi một pixel**:

| Trước | Sau | Đo lại |
|---|---|---|
| `.t1` | `text-xl` | 24/32 |
| `.t2` | `text-lg` | 18/24 |
| `.t3` | `text-md` | 14/20 |
| `.t4` | `text-sm` | 12/16 |
| `.t5` | `text-base` | 12/18 |
| `.t7` | `text-micro` | 10/14 |

### Phát sinh: preset THIẾU một key — cần một commit vào bộ bàn giao

Sổ tay §3 viết *"Không có 14px nội dung — cỡ 14 chỉ sống trong `.label-1`"*.
Nhưng **STYLE-RULES §1.5 mục 6 chốt SAU đó (24/08/2026)** đã rút tên thương hiệu
khỏi vai chữ hoa và đưa về **họ nội dung T3 14/20 · 400 · chữ thường**.

→ Luật nay **có** 14px nội dung, mà preset **chưa có key** cho nó. Trang đang dùng
vai này ở 3 chỗ: tên nhà mốt trên card · tiêu đề danh mục · tiêu đề hàng dịch vụ.
Tôi đặt tạm là `text-md`.

**Việc cần làm (KHÔNG làm ở đây vì đụng file bàn giao):**
thêm `text-md: ['14px', { lineHeight: '20px' }]` vào `tailwind.preset.js` + cập nhật
bảng §3 của sổ tay, trong **cùng một commit** với STYLE-RULES.

---

## 3. §5 — bảng chỉnh bắt buộc theo component

| Component | Sổ tay chốt | Trước | Sau |
|---|---|---|---|
| **Button** | nền đen chữ trắng · CTA cao 48 · **bỏ font-medium** · outline dùng `border-strong` | nền/viền/48/400 ✓ nhưng **thiếu `text-sm` trên chính nút**, **thiếu size `sm`**, **thiếu trạng thái disabled** | ✓ nút tự mang 12/16 · thêm `--sm` = 40 · thêm `:disabled` + `[aria-disabled]` → `pointer-events:none; opacity:.5` |
| **Input** | **cao 40 (`h-10`)** · viền `input` (V2) · focus `border-strong` | viền ✓ focus ✓ nhưng **cao 48** | ✓ **48 → 40** ở cả 3 ô nhập bản tin; nút gửi cạnh nó đổi sang size `sm` để khớp |
| **Tabs** | active = **gạch 2px** `border-strong`, không nền không bóng | gạch 2px ✓ nhưng markup là `role="group"` + `aria-pressed` — **đọc ra là cụm nút bật/tắt, không phải bộ tab** | ✓ khuôn Radix đủ: `role=tablist/tab` · `aria-selected` · `aria-controls` · `data-state=active\|inactive` · **roving tabindex** (0 / −1) · panel `role=tabpanel` + `aria-labelledby` đổi theo lựa chọn · **phím ←→ Home End** |
| **Checkbox** | vuông · **viền V2** · checked nền đen tick trắng | vuông ✓ nhưng **viền V1 `#0a0a0a`**, và là `<button aria-pressed>` | ✓ viền → V2 `#dfdfdf` · `role=checkbox` + `aria-checked` + `data-state=checked\|unchecked` |
| **RadioGroup** *(ô chọn màu)* | — | dùng `aria-current`, không có role | ✓ `role=radiogroup` / `role=radio` + `aria-checked` + `data-state`; CSS dấu chọn bám `data-state` |
| **NavigationMenu** *(mega panel)* | lớp nổi tự đúng khuôn (viền 1px, không bóng) | khối ✓ nhưng trạng thái chỉ có ở class `.open`/`.on` | ✓ thêm `data-state=open\|closed` trên **cả panel lẫn trigger** + `aria-expanded`. **Class giữ nguyên** nên port ngược về `desktop.html` vẫn là copy |
| **Sheet** *(bảng ngành hàng khổ nhỏ)* | — | chỉ có `hidden` | ✓ `data-state` + `aria-expanded`, đồng bộ cả khi router đóng nó |
| **Badge** | `-20%` = chữ đỏ không nền · badge ảnh theo demo · bỏ font-semibold | ✓ | không đổi |
| **Card / Dialog / Separator / Select** | viền + không bóng + vuông | ✓ | không đổi |

**`data-state` trên trang: 0 → 26.**

---

## 4. Ba chỗ CỐ Ý không theo shadcn — và vì sao

1. **Menu bar** (`.navbar` · `.dk-*`) giữ nguyên tên class của bộ thiết kế gốc,
   **không đổi sang tên component shadcn**. Lệnh user 24/08: *"menu bar phải giữ
   nguyên từ bộ thiết kế gốc"*, và giữ tên class là điều kiện để port ngược về
   `desktop.html` bằng copy. `data-state` chỉ **thêm vào**, không thay class nào.
2. **Card sản phẩm không phải `Card` của shadcn** — không viền, không
   `CardHeader/Content/Footer`. Đây là bản dựng lại của `productCard` trong 2 demo
   (ảnh 189/252 + brand + tên + giá), và demo cũng không đóng viền. shadcn `Card`
   là hộp có viền — dùng nó ở đây là đổi thiết kế, không phải sửa cho đúng chuẩn.
3. **Focus ring dùng `outline` chứ không phải `ring` (box-shadow).**
   shadcn quen `focus-visible:ring-1 ring-ring`; ở đây là
   `outline: 1px solid var(--ring); outline-offset: 2px`. Cùng độ dày, cùng token,
   và `outline` không bị `overflow: hidden` cắt như box-shadow — hợp hơn với trang
   đầy khối `overflow:hidden` (ảnh phóng, dải trượt).

---

## 5. Một cái bẫy tên cần biết trước khi dựng form

`theme.css` khai `.label` = **12/16 · 500 · CHỮ HOA** (vai T6 — nhãn nhóm).
Nhưng trong shadcn, `Label` là **nhãn ô nhập của form**, và §5 chốt nhãn form phải
`font-normal`, **không bao giờ hoa**.

→ Khi dựng form thật, copy `<Label>` của shadcn vào là nó **ăn nhầm** `.label` của
theme và hoá chữ hoa 500 — đúng thứ §1.5 cấm. Trang này chưa dính (3 ô nhập đều
dùng `aria-label`, không có nhãn hiện). **Đề xuất:** đổi tên trong `theme.css`
thành `.label-group` / `.label-group-1`, hoặc ghi cảnh báo vào §5 của sổ tay.
Chưa sửa vì `theme.css` là file bàn giao.

---

## 6. Đo lại sau khi sửa — không có hồi quy

| | screen `nam` | screen `nu` | screen `beauty` |
|---|---|---|---|
| Tổ hợp typo ngoài luật | **0** | **0** | **0** |
| Bo góc sai · đổ bóng | **0 · 0** | **0 · 0** | **0 · 0** |
| Tràn ngang (1440 · 375) | không | không | không |
| Nội dung | 6 danh mục · 8+4 card · 10 nhà mốt | 5 ô bento · 8 card · 4 cột cây | 4+3 card · 6 chủ đề |
| Ô nhập bản tin | **40** | **40** | **40** |

Hành vi kiểm được: bấm tab → lọc đúng (2 card cho "Túi xách") và `aria-labelledby`
của panel đổi theo · phím → nhảy tab và đổi luôn lựa chọn · công tắc checkbox vẫn
gắn/gỡ class trên `<html>` · mega panel mở/đóng đúng `data-state` · lớp tìm kiếm
mở/đóng đúng `data-state` · bảng ngành hàng khổ nhỏ đóng thì `hidden` và
`data-state` **cùng hạ** (chỗ này lệch nhau lúc đầu, đã vá).

---

## 7. Còn lại — 2 việc thuộc file bàn giao, chờ bạn chốt

1. **Thêm key `text-md` (14/20) vào `tailwind.preset.js`** + sửa bảng §3 sổ tay.
   Không thêm thì vai T3 nội dung (tên thương hiệu — chốt 24/08) không diễn đạt
   được trong build Tailwind.
2. **Đổi tên `.label` / `.label-1` trong `theme.css`** để không đụng `<Label>` của
   shadcn (mục 5). Hoặc chấp nhận và ghi cảnh báo vào §5.

Cả hai đều là sửa `shadcn-theme/`, mà sổ tay §7 dặn: *"STYLE-RULES.md đổi thì sửa
`theme.css` + `tailwind.preset.js` cùng một commit"*. Nên để bạn gộp một lượt.
