# Studio design spec

Source of truth for `/studio` (Workoholics recreation) and for `/mix1` chrome that should match it. Tokens are taken from `styles/vendor.css`. Do not change Studio pages or CSS to “fit” this file — this file describes Studio.

Mix1 keeps Craft home structure plus the exceptions at the end.

## Face

- Family: `Workoholics` (`/studio/fonts/workoholics.woff2`, italic companion)
- Weight: variable `"wght" 400` (`--heading-font-variation-settings`)
- HTML root size: `--html-font-size-v: 16` → `--html-font-size: 16px`
- Letter-spacing tokens (`--ls-*`) are referenced but unset → `normal`

## Type

Clamp formula: `clamp(min, 100 * var(--html-font-size-v) * max / 1440 * 1vw, max)`.

| Token | Size | Line-height | Role |
| --- | --- | --- | --- |
| `--fs-xxs` | `.75rem` | `1.333` | chips, pixel tags |
| `--fs-xs` | `.875rem` | `1.286` | kickers, indexes |
| `--fs-base` | `1rem` | `1.25` | body, article description |
| `--fs-sm` | `1.125rem` | `1.222` | unused on mix1 |
| `--fs-md` | `1.25–1.375rem` | `1.15` | card title, intro, nav-adjacent body |
| `--fs-lg` | `1.625–2.5rem` | `1.154` | mid display |
| `--fs-xl` | `2.375–3.5rem` | `1.092` | section heading |
| `--fs-xxl` | `2.875–5.375rem` | `1.05` | large display |
| `--fs-hg` | `3.375–6.375rem` | `1` | page title |
| `--fs-navigation` | `1.5rem` | `1.125` | header links |
| `--fs-home-service-index` | `1–1.125rem` | `1` | numbered indexes |

Classes: `.heading--md|lg|xl|xxl|hg` map 1:1 to those tokens.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#090909` | text, UI fill |
| `--color-primary-contrast` | `#fff` | text on dark |
| `--color-bg-light` | `#f9f8f5` | page paper |
| `--color-secondary-500` | `#fff4f8` | culture / pink fields |
| `--color-secondary` | `hsl(342, 100%, 66%)` | accent |
| `--color-text` | primary | body |

No pill buttons. Links underline on hover (`.link--hover-underline`).

## Space

- `--sv: .375` → `--s` … `--s10` (0.375rem steps)
- `--safe-area: clamp(.75rem, 100 * 16 * 1.5 / 1440 * 1vw, 1.5rem)` — page inset
- `--gap: clamp(.75rem, 100 * 16 * 1.25 / 1440 * 1vw, 1.25rem)`
- `--gutter: calc(var(--gap) / 2)` (Studio internal; mix1 uses `--safe-area` as the visible inset)
- `--wkhs-header-height: clamp(3.75rem, … 4.6875rem)`
- Columns: 8 default, 12 from `768px`
- `--block-vpadding: clamp(2.5rem, … 3.75rem)`

## Roles (map content here, don’t invent sizes)

| Content | Studio |
| --- | --- |
| Page title | `heading--hg` |
| Section heading | `heading--xl` |
| Card / case title | `heading--md` (`.article__heading`) |
| Card description | `--fs-base` (`.article__description`) |
| Intro / lead | `--fs-md` |
| Kicker / mono index | `--fs-xs` |
| Header | `--fs-navigation` |

Work articles: title then description, left aligned, primary color, no centered 32ch cap.

## Motion (Studio)

- Page titles: fractured (`TextFractured`)
- Intros: split-line shuffle (`SplitTextShuffle`)
- Mix1 home does **not** use these — Craft two-line hero stays

---

## Mix1 exceptions

Keep these. Do not “Studio-wash” them away.

1. **Pixel game** — `#hero-kv`, `#procflow`, `#bcp-flowviz`, `#footcity`. Grayscale until `html[data-mix1-color]`. Color Off/On in `#pxctl`. Cell/brush stay Craft.
2. **Pixel buttons** — `.mix1-pxbtn`, home `.btn` / `.cta .ctabtn` / `.tt-teaser`, compact Image/Block chip, `#pxctl` squares. Clip `--mix1-pxclip` / `--mix1-pxclip-sm`. Fill primary, hover `#3b5bd9`. No pill radius, no uppercase from site `.btn`.
3. **Pixel tags** — carousel `.slide.cs .tags`, left aligned, `--fs-xxs`, Craft clip.
4. **Color blocks** — on by default for `/mix1*` only (`mix1-media-blocks` session key).
5. **Craft home skeleton** — two-line uppercase hero, carousel, process, sheets. `--cell: 14px` grid stays. `--maxw: 1176px` reading width stays.

Mix1 copies Studio type, color, and `--safe-area` onto `html[data-mix1]` so home (no `data-wkhs`) matches work/about.
