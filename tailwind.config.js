/** Sinh từ tokens07.json — mọi giá trị trỏ về CSS var trong tokens.css */
const v = (n) => `var(--${n})`;
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: { sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        background:  v('general-background'),
        foreground:  v('general-foreground'),
        'foreground-alt': v('unofficial-foreground-alt'),
        'mid-alt':   v('unofficial-mid-alt'),
        contrast:    v('unofficial-contrast'),
        backdrop:    v('unofficial-backdrop'),
        input:       v('general-input'),
        primary: {
          DEFAULT:     v('general-primary'),
          foreground:  v('general-primary-foreground'),
          hover:       v('general-primary-hover'),
          active:      v('general-primary-active'),
        },
        secondary: {
          DEFAULT:     v('general-secondary'),
          foreground:  v('general-secondary-foreground'),
          hover:       v('unofficial-secondary-hover'),
          active:      v('unofficial-secondary-active'),
        },
        muted:   { DEFAULT: v('general-muted'), foreground: v('general-muted-foreground') },
        card:    { DEFAULT: v('card-card'), foreground: v('card-card-foreground') },
        popover: { DEFAULT: v('popover-popover'), foreground: v('popover-popover-foreground') },
        border: {
          DEFAULT: v('general-border'),
          0: v('unofficial-border-0'), 1: v('unofficial-border-1'), 2: v('unofficial-border-2'),
          3: v('unofficial-border-3'), 4: v('unofficial-border-4'), 5: v('unofficial-border-5'),
        },
        accent: {
          DEFAULT: v('unofficial-accent'), foreground: v('unofficial-accent-foreground'),
          0: v('unofficial-accent-0'), 2: v('unofficial-accent-2'), 3: v('unofficial-accent-3'),
        },
        destructive: {
          DEFAULT: v('general-destructive'), subtle: v('unofficial-destructive-subtle'),
          foreground: v('unofficial-destructive-foreground'), border: v('unofficial-destructive-border'),
          active: v('unofficial-destructive-active'),
        },
        success: { DEFAULT: v('general-success'), subtle: v('general-success-subtle'), foreground: v('general-success-foreground'), border: v('general-success-border') },
        warning: { DEFAULT: v('general-warning'), subtle: v('general-warning-subtle'), foreground: v('general-warning-foreground'), border: v('general-warning-border') },
        info:    { DEFAULT: v('general-info'),    subtle: v('general-info-subtle'),    foreground: v('general-info-foreground'),    border: v('general-info-border') },
        ring:    { DEFAULT: v('focus-ring'), error: v('focus-ring-error') },
        'bg-blur': v('general-background-blur'),
      },
      borderRadius: {
        none: v('radius-0'), xs: v('radius-2'), sm: v('radius-4'), DEFAULT: v('radius-6'),
        md: v('radius-8'), lg: v('radius-10'), xl: v('radius-12'), full: v('radius-infinite'),
      },
      spacing: Object.fromEntries(
        [0,1,2,3,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96]
          .map(n => [String(n), v(`spacing-${n}`)])
          .concat([['0.5', v('spacing-0-5')], ['1.5', v('spacing-1-5')], ['2.5', v('spacing-2-5')], ['3.5', v('spacing-3-5')]])
      ),
    }
  },
  plugins: [],
}
