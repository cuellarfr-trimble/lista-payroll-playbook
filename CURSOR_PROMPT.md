# Cursor System Prompt — AI Prototyping Guide

## What you're building

A single-page React web app that renders `content.md` as a beautifully designed, interactive guide. This is an internal tool for a fintech design team, built in the visual style of Savvy Wealth's design system.

The app should feel like a high-quality editorial web experience — not a docs site, not a corporate intranet. Think: Linear's docs meets a refined fintech product.

---

## Tech stack

- React (Create React App or Vite)
- Plain CSS modules or styled-components (no Tailwind)
- `react-markdown` with `remark-gfm` for rendering the markdown
- `react-syntax-highlighter` for code blocks
- No component libraries (no MUI, Chakra, shadcn, etc.)

Install dependencies:
```
npm install react-markdown remark-gfm react-syntax-highlighter
```

---

## Design system

### Colors

```
--color-bg: #FFFFFF
--color-surface: #F7F7F5
--color-border: #E8E6E1
--color-text-primary: #1A1A1A
--color-text-secondary: #6B6B6B
--color-text-tertiary: #9B9B9B
--color-accent: #1B4332        /* Deep forest green — Savvy primary */
--color-accent-light: #D1FAE5  /* Mint tint for highlights */
--color-accent-muted: #2D6A4F  /* Slightly lighter green for hover states */
--color-code-bg: #F3F4F6
--color-positive: #16A34A
--color-negative: #DC2626
```

### Typography

Use Google Fonts. Import:
- **DM Serif Display** — for section headings (h1, h2)
- **DM Sans** — for body text, UI labels, navigation
- **JetBrains Mono** — for all code blocks and terminal commands

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

Type scale:
```
--font-display: 'DM Serif Display', Georgia, serif
--font-body: 'DM Sans', system-ui, sans-serif
--font-mono: 'JetBrains Mono', 'Courier New', monospace

--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 2rem
--text-4xl: 2.75rem
```

### Spacing

Use an 8px base grid. Common values: 4, 8, 12, 16, 24, 32, 48, 64, 96px.

---

## Layout

### Overall structure

```
[Left sidebar — fixed, 240px wide]    [Main content area — scrollable]
  Navigation / section list              Rendered markdown content
```

On mobile (< 768px): sidebar collapses, add a hamburger menu or just stack content.

### Left sidebar

- Fixed position, full height, white background, right border `1px solid var(--color-border)`
- Top: Savvy wordmark or "Design Team" label in small caps
- Below: vertical list of section links (auto-generated from h2 headings in the markdown)
- Active section highlighted with left border accent `3px solid var(--color-accent)` and text color change
- Section numbers shown in tertiary text color to the left of each link
- Scroll-spy behavior: highlight the section currently in view

### Main content

- Max width: 720px
- Left margin: 240px (to account for sidebar) + 80px padding
- Top padding: 80px
- Bottom padding: 120px

---

## Component specs

### Section headings (h2)

- Font: DM Serif Display, 2rem
- Color: `--color-text-primary`
- Top margin: 80px (except first section)
- Bottom margin: 24px
- Section number shown as small superscript in accent color before the title

### Body text (p)

- Font: DM Sans, 1rem, weight 400
- Line height: 1.75
- Color: `--color-text-primary`
- Max width: inherit from container (720px)

### Code blocks (``` fenced ```)

- Background: `--color-code-bg` (#F3F4F6)
- Font: JetBrains Mono, 0.875rem
- Padding: 20px 24px
- Border radius: 8px
- Border: `1px solid var(--color-border)`
- Language label shown top-right in tertiary color
- Copy button on hover (top-right corner): copies content to clipboard
- Syntax highlighting: use `react-syntax-highlighter` with the `oneLight` theme

### Inline code (`backtick`)

- Font: JetBrains Mono, 0.875rem
- Background: `--color-code-bg`
- Color: `--color-accent`
- Padding: 2px 6px
- Border radius: 4px

### Tables

- Full width within content column
- Header row: background `--color-surface`, font weight 500, small caps
- Alternating row backgrounds: white / `--color-surface`
- Border: `1px solid var(--color-border)` on all cells
- Border radius: 8px on the table container
- Cell padding: 12px 16px

### Blockquotes / callouts

Any blockquote in the markdown should render as a callout box:
- Background: `--color-accent-light`
- Left border: `4px solid var(--color-accent)`
- Padding: 16px 20px
- Border radius: 0 8px 8px 0
- Font size: 0.9375rem

### Horizontal rules (---)

Render as a thin `1px` line in `--color-border`. Margin: 48px 0.

### Links

- Color: `--color-accent`
- No underline by default
- Underline on hover
- External links open in new tab

---

## Interactions & animations

### Page load

Stagger the appearance of content sections with a subtle fade-up animation:
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```
Apply with increasing `animation-delay` to each section.

### Scroll spy

Track which section is in the viewport using `IntersectionObserver`. Update the active state of the sidebar nav link accordingly.

### Smooth scroll

Clicking a sidebar nav item smoothly scrolls to that section (`scroll-behavior: smooth`).

### Progress indicator

A thin `2px` progress bar at the very top of the page (full width, accent color) that fills as the user scrolls down the page.

### Copy button on code blocks

Show on hover. On click: copy code to clipboard, change button label to "Copied ✓" for 2 seconds, then revert.

---

## Header

A minimal fixed header at the top:
- Height: 56px
- Background: white with `border-bottom: 1px solid var(--color-border)`
- Left: "AI Prototyping Guide" in DM Sans, weight 500, small
- Right: "Savvy Design Team" label in tertiary color + small Savvy green dot indicator

---

## Content sourcing

Read `content.md` from the `public/` folder at runtime using a `fetch()` call. This means designers can edit `content.md` directly and refresh the browser to see changes — no code changes needed.

```js
useEffect(() => {
  fetch('/content.md')
    .then(res => res.text())
    .then(text => setMarkdown(text));
}, []);
```

Place `content.md` in the `/public` folder of the React project.

---

## File structure

```
my-prototype/
├── public/
│   └── content.md          ← Edit this to update content
├── src/
│   ├── App.js
│   ├── App.css
│   ├── components/
│   │   ├── Sidebar.js
│   │   ├── Header.js
│   │   ├── MarkdownRenderer.js
│   │   └── CodeBlock.js
│   └── index.js
└── package.json
```

---

## Tone / notes for the AI

- This is an internal design team tool — it should feel crafted, not generic
- Prioritize legibility and whitespace over decoration
- The green accent (`#1B4332`) should be used sparingly — it's a signal, not wallpaper
- If something looks like a default browser style, fix it
- Every code block should look like it belongs in a premium developer tool
- The sidebar should feel stable and trustworthy — this is a reference document people will return to

---

## How to use this file

Open this project in Cursor. Open the Composer (`Cmd + I`) and paste:

> "Build the React app described in CURSOR_PROMPT.md. Use content.md from the public folder as the content source. Follow all design specs exactly."

From there, iterate by describing changes in plain English in the Composer.
