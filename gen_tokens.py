import json, re, sys

d = json.load(open('./tokens07.json'))

raw   = [x for x in d if x['collection'] == 'raw colors']
theme = [x for x in d if x['collection'] == 'theme']
space = [x for x in d if x['collection'] == 'spacing']
radii = [x for x in d if x['collection'] == 'border radii']

# ═══════════════════════════════════════════════════════════════════════
#  VariableID → tên raw color.
#
#  TRƯỚC ĐÂY map theo thứ tự (VariableID:1:{10+i} → raw[i]). Cách đó SAI:
#  nhóm Accent/* được thêm vào Figma sau nên nhận ID ở dải 229:xxxxx,
#  làm thứ tự trong file export lệch khỏi thứ tự ID gốc. Ví dụ 1:252 map
#  nhầm thành Accent/800 (#a1390b) trong khi thật ra là yellow/900 (#713f12).
#  Lỗi này không báo gì cả — chỉ ra sai màu.
#
#  Giờ dùng bảng TƯỜNG MINH. Toàn bộ 31 alias mà collection `theme` tham
#  chiếu đã được đối chiếu 1-1 với Figma API (figma.variables
#  .getVariableByIdAsync) — khớp 31/31.
#
#  Map ID → TÊN (không phải → mã màu): giá trị luôn lấy tươi từ export,
#  nên Figma đổi màu là tokens.css tự cập nhật theo.
#
#  Thêm alias mới: tra tên thật trong Figma rồi thêm vào đây. Đừng đoán.
# ═══════════════════════════════════════════════════════════════════════
ID2NAME = {
    "VariableID:1:10":     "neutral/50",     # #fafafa
    "VariableID:1:11":     "neutral/100",    # #f5f5f5
    "VariableID:1:12":     "neutral/200",    # #e5e5e5
    "VariableID:1:13":     "neutral/300",    # #d4d4d4
    "VariableID:1:14":     "neutral/400",    # #a3a3a3
    "VariableID:1:15":     "neutral/500",    # #737373
    "VariableID:1:16":     "neutral/600",    # #525252
    "VariableID:1:17":     "neutral/700",    # #404040
    "VariableID:1:18":     "neutral/800",    # #262626
    "VariableID:1:19":     "neutral/900",    # #171717
    "VariableID:1:20":     "neutral/950",    # #0a0a0a
    "VariableID:1:21":     "red/50",         # #fef2f2
    "VariableID:1:24":     "red/300",        # #f8a9af
    "VariableID:1:25":     "red/400",        # #f47883
    "VariableID:1:26":     "red/500",        # #ea495c
    "VariableID:1:27":     "red/600",        # #d62845
    "VariableID:1:28":     "red/700",        # #b91c3a
    "VariableID:1:30":     "red/900",        # #7f1d1d
    "VariableID:1:32":     "blue/50",        # #eff6ff
    "VariableID:1:33":     "blue/100",       # #dbeafe
    "VariableID:1:38":     "blue/600",       # #2563eb
    "VariableID:1:43":     "white",          # #ffffff
    "VariableID:1:44":     "black",          # #010101
    "VariableID:1:100":    "amber/50",       # #fffbeb
    "VariableID:1:101":    "amber/100",      # #fef3c7
    "VariableID:1:106":    "amber/600",      # #d97706
    "VariableID:1:221":    "green/50",       # #effaf5
    "VariableID:1:222":    "green/100",      # #d7f4e5
    "VariableID:1:226":    "green/500",      # #22aa99
    "VariableID:1:227":    "green/600",      # #1a7a5c
    "VariableID:229:35953": "Accent/600",    # #ff6600 — verified qua Figma API
}

RAW_BY_NAME = {x['name']: list(x['values'].values())[0] for x in raw}

def slug(n):
    n = n.lower().replace('/', '-').replace(' ', '-')
    n = re.sub(r'[^a-z0-9\-]', '', n)
    return re.sub(r'-+', '-', n).strip('-')

def die(msg):
    sys.exit(f"\n❌ BUILD DỪNG — {msg}\n"
             f"   Tra tên biến trong Figma rồi thêm vào ID2NAME. Không đoán theo thứ tự.\n")

def resolve(v, token_name, mode):
    if isinstance(v, dict) and 'alias' in v:
        alias = v['alias']
        name = ID2NAME.get(alias)
        if name is None:
            die(f"alias chưa có trong ID2NAME: {alias}\n"
                f"   (token '{token_name}', mode '{mode}')")
        val = RAW_BY_NAME.get(name)
        if val is None:
            die(f"'{name}' (từ {alias}) không có trong 'raw colors' của export\n"
                f"   (token '{token_name}', mode '{mode}')")
        return val
    return v

out = []
out.append("/* ═══════════════════════════════════════════════════════════════")
out.append("   Design tokens — sinh tự động từ tokens07.json")
out.append("   Không sửa tay. Chạy lại: python3 gen_tokens.py")
out.append("   ═══════════════════════════════════════════════════════════════ */\n")

# ── raw palette ──
out.append(":root {")
out.append("  /* ─── raw colors (primitive) ─── */")
for x in raw:
    out.append(f"  --color-{slug(x['name'])}: {list(x['values'].values())[0]};")

# ── spacing ──
out.append("\n  /* ─── spacing ─── */")
seen = set()
for x in space:
    n = slug(x['name']).replace('spacing-', '')
    if n in seen or not n: continue
    seen.add(n)
    out.append(f"  --spacing-{n}: {list(x['values'].values())[0]}px;")

# ── radii ──
out.append("\n  /* ─── border radii ─── */")
for x in radii:
    out.append(f"  --radius-{slug(x['name']).replace('rounded-','')}: {list(x['values'].values())[0]}px;")

# ── semantic: mode D (default) ──
out.append("\n  /* ─── semantic theme · mode D (mặc định) ─── */")
for x in theme:
    if 'D' not in x['values']: continue
    out.append(f"  --{slug(x['name'])}: {resolve(x['values']['D'], x['name'], 'D')};")
out.append("}\n")

# ── semantic: mode GM ──
out.append("/* ─── semantic theme · mode GM (bật bằng class .theme-gm) ─── */")
out.append(".theme-gm {")
for x in theme:
    if 'GM' not in x['values']: continue
    out.append(f"  --{slug(x['name'])}: {resolve(x['values']['GM'], x['name'], 'GM')};")
out.append("}")

open('./tokens.css', 'w').write('\n'.join(out) + '\n')

used = {v['alias'] for x in theme for v in x['values'].values()
        if isinstance(v, dict) and 'alias' in v}
print("tokens.css written")
print("  raw colors :", len(raw))
print("  semantic   :", len(theme))
print("  spacing    :", len(seen))
print("  radii      :", len(radii))
print(f"  alias      : {len(used)} dùng / {len(ID2NAME)} đã map"
      + (f"  ⚠ thừa {len(ID2NAME)-len(used)} entry" if len(ID2NAME) > len(used) else ""))
