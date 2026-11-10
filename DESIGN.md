# Design System: TechAdvisor AI (Impeccable Standard)

## 1. Visual Vocabulary & Principles
- **Restraint over Decoration**: Eliminate generic AI slop (neon glows, purple-to-blue gradients, floating rounded-square icon tiles).
- **Data Density & Scannability**: In hardware tools, users need information hierarchy: clear prices, real benchmark numbers, direct compatibility tags.
- **High-Craft Contrast**: Dark mode uses neutral obsidian/slate (`#0b0f19` / `#111827`) rather than muddy purple or washed-out grays. Every text element passes WCAG AA/AAA.

## 2. Color Palette & Tokens
- **Background Root**: `hsl(222, 47%, 6%)` (`#080c14` / `#0b0f19`) — deep, calm obsidian.
- **Surface Elevation 1 (Card/Container)**: `hsl(222, 40%, 10%)` (`#0f172a`) — clean flat surface.
- **Surface Elevation 2 (Hover/Active)**: `hsl(222, 35%, 15%)` (`#1e293b`).
- **Borders**: `hsl(222, 25%, 18%)` (`#1e293b` / `rgba(255,255,255,0.08)`).
- **Primary Accent**: `hsl(217, 91%, 60%)` (`#2563eb`) — sharp cobalt blue.
- **Success / Compatible**: `hsl(158, 64%, 45%)` (`#10b981`) — crisp emerald green.
- **Warning**: `hsl(38, 92%, 50%)` (`#f59e0b`) — precise amber.
- **Destructive**: `hsl(0, 84%, 60%)` (`#ef4444`) — sharp crimson.
- **Text High**: `hsl(210, 40%, 98%)` (`#f8fafc`).
- **Text Medium**: `hsl(215, 20%, 75%)` (`#cbd5e1`).
- **Text Low**: `hsl(215, 16%, 55%)` (`#64748b`).

## 3. Typography Scale & Hierarchy (`typeset`)
- **Display Headings**: Sharp, tight letter-spacing (`tracking-tight font-black font-sans`).
- **Technical Specs & Numbers**: Strict tabular monospace (`font-mono tracking-tight font-semibold`). Used for:
  - Sockets (`AM5`, `LGA1700`)
  - Memory timings (`DDR5-6000 CL30`)
  - Wattages (`~375W`, `850W`)
  - Prices (`₹37,999`, `A$649`, `$449`)
  - Frame rates (`145 FPS`, `1% Low: 112 FPS`)
- **Body & Editorial**: `text-sm leading-relaxed text-slate-300`.

## 4. Layout & Component Rules (`distill` & `quieter`)
- **No Icon Tiles above Headings**: Do not put a 48px rounded-square box with a colored icon centered above a heading. Icons belong inline with label text or inside functional controls.
- **Flattened Hierarchy**: Avoid nesting cards inside cards. Use subtle surface shifts, thin 1px dividers (`border-slate-800`), and clean table rows.
- **Single Conviction Badges**: Avoid card overload with 4 colored badges. Maximum 1 primary badge per product card.
- **Interactive Feedback**: 150ms transitions, subtle scale (`active:scale-[0.98]`), high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-blue-500`).

