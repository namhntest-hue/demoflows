/* ════════════════════════════════════════════════════════════════════════
   PRESET "SKIN-MT" — nướng STYLE-RULES.md (D:\doc) thành build Tailwind.
   Chuẩn Tailwind 3.x (Hyvä 1.x dùng TW3; nhánh headless TW4 xem sổ tay).

   Cách cắm (tailwind.config.js của theme Hyvä hoặc app headless):

     module.exports = {
       presets: [require('./shadcn-theme/tailwind.preset')],
       content: ['./**\/*.phtml', './**\/*.tsx', ...],
     }

   Nguyên tắc: các scale dưới đây GHI ĐÈ scale gốc (không extend) — utility
   ngoài luật (font-bold, tracking-wide, shadow-md, text-3xl, bg-red-500…)
   KHÔNG TỒN TẠI sau build. Luật tự thi hành, không cần nhớ.
════════════════════════════════════════════════════════════════════════ */

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      /* không serif, không mặt chữ thứ hai (§1.6) */
    },

    /* ── Thang chữ T1–T7 (§1.2): cặp cỡ+dòng KHÓA VÀO NHAU (§1.3).
       Key mặc định của Tailwind được ĐỔI NGHĨA THEO VAI để markup shadcn
       copy vào ăn ngay thang luật, không phải sửa từng class.
       Không có 14px nội dung — cỡ 14 chỉ sống trong .label-1 (theme.css). */
    fontSize: {
      xs:    ['12px', { lineHeight: '16px' }], // = sm; giữ key cho markup shadcn khỏi vỡ
      sm:    ['12px', { lineHeight: '16px' }], // T4 thân bài 1 dòng — cỡ ruột shadcn (button/input/label)
      base:  ['12px', { lineHeight: '18px' }], // T5 thân bài nhiều dòng (×1.5 — dấu tiếng Việt 2 tầng)
      lg:    ['18px', { lineHeight: '24px' }], // T2 tiêu đề mục · sheet · modal
      xl:    ['24px', { lineHeight: '32px' }], // T1 tiêu đề trang
      '2xl': ['24px', { lineHeight: '32px' }], // chặn trần — markup shadcn cũ dùng 2xl cho CardTitle
      micro: ['10px', { lineHeight: '14px' }], // T7 — CHỈ 2 vai: số badge giỏ, nhãn thẻ VISA/TIKINOW
      /* không 3xl trở lên; không 9/11/13/14/15/16/20/22/32/48 */
    },

    /* ── Hai độ đậm, hết (§1.1). semibold/bold/light = class chết → về 400. */
    fontWeight: {
      normal: '400',
      medium: '500', // CHỈ đi cặp uppercase — dùng qua .label/.label-1, không ghép tay
    },

    /* ── Tracking: một giá trị 0.5px, khai ở body (theme.css §1.4).
       Scale rỗng → mọi tracking-* là class chết. */
    letterSpacing: {},

    /* ── Không bóng (§3.3) — lớp nổi dùng viền 1px. shadow-* chết trừ shadow-none. */
    boxShadow: { none: 'none' },

    /* ── Bo góc 0 (§3.2). Mọi key trỏ --radius (= 0px) để markup shadcn
       (rounded-md/lg/xl…) tự vuông; tròn thật (w == h) dùng rounded-full. */
    borderRadius: {
      none: '0px',
      sm: 'var(--radius)',
      DEFAULT: 'var(--radius)',
      md: 'var(--radius)',
      lg: 'var(--radius)',
      xl: 'var(--radius)',
      '2xl': 'var(--radius)',
      '3xl': 'var(--radius)',
      full: '9999px',
    },

    /* ── Màu: GHI ĐÈ toàn bộ palette (§2, §4.3-3) — bg-red-500/gray-100… chết.
       Muốn sắc mới: thêm token vào theme.css rồi khai ở đây, không rải hex. */
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#ffffff',
      black: '#0a0a0a', // mặt tối của hệ là #0a0a0a — không có #000 riêng

      background: 'var(--background)',
      foreground: 'var(--foreground)',
      card:    { DEFAULT: 'var(--card)',    foreground: 'var(--card-foreground)' },
      popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
      primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)', hover: 'var(--primary-hover)' },
      secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)', hover: 'var(--secondary-hover)' },
      muted:   { DEFAULT: 'var(--muted)',   foreground: 'var(--muted-foreground)' },
      accent:  { DEFAULT: 'var(--accent)',  foreground: 'var(--accent-foreground)' },
      destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' },

      border: {
        DEFAULT: 'var(--border)',        /* V2 kết cấu — mặc định */
        strong:  'var(--border-strong)', /* V1 tương tác chính */
        subtle:  'var(--border-subtle)', /* V3 vách hàng */
      },
      input: 'var(--input)',
      ring:  'var(--ring)',

      success: 'var(--success)',
      warning: 'var(--warning)',
      info:    'var(--info)',
    },

    /* ── Độ dày viền: 1px duy nhất; 2px CHỈ cho dấu đang chọn (§3.1). */
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px', // gạch chân mục nav đang mở / tab active — không dùng để bao
    },
  },
};
