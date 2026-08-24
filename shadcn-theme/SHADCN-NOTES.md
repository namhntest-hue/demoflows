# Sổ tay bàn giao — theme skin-mt cho Magento + Tailwind + shadcn/ui

> Chốt 20/08/2026. Trọng tài duy nhất về style/typo: `D:\doc\STYLE-RULES.md`.
> Bộ này gồm 3 file: `theme.css` (biến + base + 2 class nhãn) · `tailwind.preset.js`
> (nướng luật thành build) · file này (cách cắm + chỗ phải chỉnh khi dùng shadcn).
> Demo tham chiếu: `D:\doc\index.html` (375) và `desktop.html` (1440), bộ da `skin-mt`
> — demo là **spec để đối chiếu**, không copy lớp remap của nó vào production.

---

## 1. Chạy trên Magento — chọn 1 trong 2 con đường

**shadcn/ui gốc là React (Radix UI).** Trên Magento nó chỉ chạy nguyên bản ở nhánh
headless. Nhánh theme PHP thì "dùng shadcn" = dùng **token + markup + class** của nó,
phần hành vi thay bằng Alpine. Bộ theme này trung lập — cắm được cả hai:

| | A. Theme Hyvä *(mặc định nên chọn)* | B. Headless React |
|---|---|---|
| Là gì | Theme Magento thay Luma: **Tailwind + Alpine.js**, template `.phtml`, server-render | Next.js (hoặc Adobe PWA Studio) gọi Magento qua GraphQL |
| shadcn/ui | Không chạy React → lấy **markup + class** của shadcn chuyển sang phtml/Alpine, hoặc dùng **Basecoat UI** (bản shadcn cho HTML thuần, không cần React) làm nguồn markup | Chạy **nguyên bản** — copy component từ registry như tài liệu shadcn |
| Cắm theme | `presets: [require('…/tailwind.preset')]` vào `tailwind.config.js` của theme con; `theme.css` nạp trong `_theme.css` | Như mọi app shadcn: preset vào config, `theme.css` thay phần `:root` của `globals.css` |
| Lưu ý | Hyvä trả phí license theo site; đây là chuẩn công nghiệp hiện nay cho "Magento + Tailwind" | Đắt công dựng hơn (auth, cart, checkout tự nối); "dùng component shadcn/ui" đúng nghĩa đen chỉ có ở nhánh này |

Không đầu tư style vào Luma mặc định (Knockout/LESS) — ngược hệ Tailwind.
Tailwind v4 (shadcn bản mới): bê nguyên bảng giá trị trong preset sang khối `@theme`
trong CSS — giá trị không đổi, chỉ đổi chỗ khai.

## 2. Preset đã tự lo gì (không phải nhớ)

* **Đổi cỡ quên dòng — hết đường sai:** mọi key `fontSize` là cặp cỡ+dòng (luật §1.3).
* **Weight ngoài luật — chết lúc build:** chỉ còn `font-normal`/`font-medium`;
  `semibold/bold/light` không sinh class, chữ rơi về 400.
* **Tracking, bóng, bo góc:** `tracking-*` và `shadow-*` chết (trừ `shadow-none`);
  mọi `rounded-*` = 0, chỉ `rounded-full` sống cho hình tròn thật.
* **Palette đóng:** `bg-red-500`, `text-gray-400`… không tồn tại. Muốn sắc mới:
  thêm token vào `theme.css` + khai vào preset — không rải hex (luật §4.3-3).
* **Lớp nổi tự đúng khuôn:** Dialog/Sheet/Popover/Dropdown/Toast của shadcn có sẵn
  viền — bóng chết là chúng tự thành "viền 1px, không bóng" (chốt 17/08, hướng cettire).

## 3. Thang chữ — key Tailwind đã đổi nghĩa theo vai

| Class | Ra | Vai (mã STYLE-RULES §1.2) |
|---|---|---|
| `text-xl` `text-2xl` | 24/32 | T1 — tiêu đề trang |
| `text-lg` | 18/24 | T2 — tiêu đề mục · sheet · modal |
| `.label-1` *(class, không phải text-\*)* | 14/20 · 500 · hoa | T3 — nhãn cấp 1: nav ngành hàng, tiêu đề panel |
| `text-sm` `text-xs` | 12/16 | T4 — thân bài 1 dòng: hàng, nút, giá, nhãn form |
| `text-base` | 12/18 | T5 — thân bài nhiều dòng |
| `.label` | 12/16 · 500 · hoa | T6 — nhãn cấp 2: nhãn nhóm menu/footer/filter |
| `text-micro` | 10/14 | T7 — chỉ 2 vai: số badge giỏ, nhãn thẻ VISA/TIKINOW |

Chủ ý: `text-sm` (cỡ ruột của mọi component shadcn) ra 12/16 — copy component vào là
ăn ngay thang luật. **Không có 14px nội dung** — cỡ 14 chỉ sống trong `.label-1`.
Doc cho dev mới: "sm = thân bài, không phải 14 như Tailwind mặc định".

## 4. Map token demo → theme này (cho ai đọc code demo)

| Demo (`tokens.css` / config cũ) | Theme này | Ghi chú |
|---|---|---|
| `--general-background` / `-foreground` | `--background` / `--foreground` | đổi tên thẳng |
| `--general-secondary` `#f5f5f5` | `--secondary` **`#f2f2f2`** | luật §2.2 — một mặt xám duy nhất |
| `--general-secondary-foreground` | `--secondary-foreground` `#333` | kiêm vai mực nội dung |
| `--general-muted-foreground` | `--muted-foreground` `#666` | mực phụ — sàn chữ đọc được |
| `--unofficial-border-0…5` (6 tầng) | **3 tầng**: `border-strong` / `border` / `border-subtle` | §3.1; `#cfcfcf` nhập vào `--border` |
| `--general-destructive` | `--destructive` `#d62845` | giữ |
| `--unofficial-destructive-subtle` `#fef2f2` | **bỏ** | không nhấn bằng mảng màu (§2.2) |
| `--focus-ring` `#22aa99` | `--ring` `#0a0a0a` | teal là công cụ demo, không thuộc bộ da |
| `--radius-2…12` | `--radius: 0px` | §3.2; tròn thật → `rounded-full` |
| `.glass-95` (trắng 95% + blur) | `--surface-sticky` | chữ ký bộ da — chỉ navbar/filterbar/thanh dính (§2.2) |
| spacing tokens | scale 4px mặc định Tailwind | không đổi |

Hai khuôn đã chốt thêm 20/08 (đem theo khi dựng component):
* **Trạng thái đơn hàng**: chấm tròn 6px màu `success/warning/info` + chữ 12/16 ·
  400 · mực chính — không pill, không nền tô (AUDIT B2).
* **Tên thương hiệu** trên card/PDP: họ nhãn — card `.label` (12/16·500·hoa),
  tiêu đề PDP `.label-1` (14/20·500·hoa); tên sản phẩm dưới nó giữ 12/400 thường
  (AUDIT C1 — vai hoa thứ 6 của §1.5).

## 5. Chỉnh bắt buộc theo từng component shadcn

Nguyên tắc chung khi copy một component: **mỗi `font-medium`/`font-semibold` trong
markup gốc phải trả lời "nhãn hay nội dung?"** — nhãn thì thay bằng `.label`/`.label-1`,
nội dung thì hạ về `font-normal`. Đó là 90% việc phải làm; phần còn lại preset đã lo.

| Component | Chỉnh | Vì (luật) |
|---|---|---|
| **Button** | `default` = nền đen chữ trắng, cao 48 cho CTA chính (demo `h-12`) — bỏ `font-medium` → chữ 400. Nút phụ dùng `outline` với `border-strong`. `destructive` đổi thành **outline đỏ** (chữ + viền `destructive`, nền trắng), không nền đỏ đặc | §1.1 chữ nút là nội dung; §2.2 đỏ chỉ ở chữ/viền; §3.1 V1 |
| **Label** (form) | Bỏ `font-medium` → `font-normal`, 12/16, màu `foreground`. Nhãn form **không bao giờ hoa** | §1.5 |
| **Input** | Cao 40 (`h-10`), viền `input` (V2); focus: `border-strong`, ring 1px đen (đổi `ring-2` → `ring-1`) hoặc chỉ đổi viền; lỗi: viền + thông báo `destructive` 12/16 | §3.1 |
| **Card** | Viền + không bóng + vuông: preset tự lo. `CardTitle` mặc định `2xl semibold` → chọn lại theo vai: tiêu đề mục → `text-lg`, chữ 400 | §1.2 |
| **Dialog / Sheet / Popover / DropdownMenu / Toast** | Không phải chỉnh gì về khối (viền 1px, không bóng, vuông — tự đúng). Chỉ soát chữ bên trong theo bảng thang | §3.3 |
| **Accordion** | Trigger là *nhãn mở mục* (vai 5: "Bạn có phiếu mua hàng?", "Ưu đãi & khuyến mãi", nhóm footer) → thay chữ bằng `.label`, dòng phụ bên trong `text-sm text-muted-foreground`. Trigger là *mục nội dung* (accordion PDP) → `font-normal` chữ thường | §1.5, việc 8 |
| **Tabs** | Trạng thái active = **gạch chân 2px đen** (`border-b-2 border-strong`), không nền/không bóng; tab cấp nav dùng `.label-1` | §3.1 — 2px chỉ cho dấu đang chọn |
| **Checkbox / Radio** | Vuông (tự nhiên), viền V2, checked nền đen tick trắng — sát mặc định shadcn | §3.2 |
| **Badge** | `rounded-full` chỉ cho **chấm đếm tròn thật** (`text-micro`). Badge giảm giá `-20%` = **chữ đỏ, không nền tô**; badge trên ảnh (`Pre-order`, `New season`) = nền đen chữ trắng hoặc mặt xám theo demo; bỏ `font-semibold` | §2.2, việc 5 |
| **Select / Menu item** | Hàng 12/16 (`text-sm`), vách giữa nhóm `border-subtle` (V3) | §3.1 |
| **Separator** | Mặc định = `--border`; trong danh sách dày dùng `border-subtle` | §3.1 |

Ngoại lệ ghi danh duy nhất của cặp 500+hoa: **trigger bộ lọc** giữ `500` chữ thường
(user chốt 20/08/2026 — xem §1.1). Không chỗ thứ hai nào được viện dẫn nó.

## 6. Những gì build không chặn được — quy ước review

Tailwind 3 không tắt được arbitrary value, nên phần này giữ bằng review/CI:

```
# tất cả phải trả về 0 kết quả trên source production:
grep -rE 'text-\[|tracking-\[|shadow-\[|rounded-\[|leading-\[' src/
grep -rE 'font-(semibold|bold|light)' src/
grep -rE '#[0-9a-fA-F]{3,8}' src/ --include='*.phtml' --include='*.tsx'   # hex rải tay
```

* `font-medium` đứng một mình (không trong `.label`/`.label-1`) → soát tay từng chỗ.
* Chữ hoa: đúng 5 vai của §1.5, luôn bằng `text-transform`/class — không gõ hoa vào
  chuỗi dịch (chuỗi là key i18n).
* `border-2` chỉ xuất hiện ở dấu đang chọn (tab/nav active) — không bao hộp.
* Mọi text không phải wordmark (DAFC · VISA · TIKINOW) viết hoa chữ cái đầu.

## 7. Trạng thái quyết định (để khỏi hỏi lại)

* 20/08/2026 — user chốt: **skin-mt là skin chính của website thật**; đích
  **Magento + Tailwind + shadcn/ui**; stack cụ thể (Hyvä hay headless) chưa chọn.
* 8 việc Phần 6 STYLE-RULES.md: chốt cả 8 — 7 theo đề xuất; **việc 2 ngược đề xuất**
  (bộ lọc giữ 500 → ngoại lệ ghi danh).
* Bộ này nướng theo các chốt trên. STYLE-RULES.md đổi thì sửa `theme.css` +
  `tailwind.preset.js` cùng một commit — sổ tay này chỉ là dẫn giải, không phải luật.
