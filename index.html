import json, re
d = json.load(open('./tokens07.json'))
raw   = [x for x in d if x['collection'] == 'raw colors']
theme = [x for x in d if x['collection'] == 'theme']
space = [x for x in d if x['collection'] == 'spacing']
radii = [x for x in d if x['collection'] == 'border radii']

# Resolve VariableID -> raw color (sequential from 1:10, validated 4/4)
idmap = {f"VariableID:1:{10+i}": (x['name'], list(x['values'].values())[0]) for i, x in enumerate(raw)}
idmap["VariableID:229:35953"] = ("Accent/600", "#ff6600")   # inferred: brand accent

def slug(n):
    n = n.lower().replace('/', '-').replace(' ', '-')
    n = re.sub(r'[^a-z0-9\-]', '', n)
    return re.sub(r'-+', '-', n).strip('-')

def resolve(v):
    if isinstance(v, dict) and 'alias' in v:
        r = idmap.get(v['alias'])
        return r[1] if r else None
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
unres = []
for x in theme:
    v = resolve(x['values'].get('D'))
    if v is None:
        unres.append(x['name']); continue
    out.append(f"  --{slug(x['name'])}: {v};")
out.append("}\n")

# ── semantic: mode GM ──
out.append("/* ─── semantic theme · mode GM (bật bằng class .theme-gm) ─── */")
out.append(".theme-gm {")
for x in theme:
    v = resolve(x['values'].get('GM'))
    if v is None: continue
    out.append(f"  --{slug(x['name'])}: {v};")
out.append("}")

open('./tokens.css', 'w').write('\n'.join(out) + '\n')
print("tokens.css written")
print("  raw colors :", len(raw))
print("  semantic   :", len(theme), f"(unresolved: {unres or 'none'})")
print("  spacing    :", len(seen))
print("  radii      :", len(radii))
