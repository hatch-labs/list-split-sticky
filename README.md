# List Split Sticky
### A Hatch Labs Squarespace Component

A split-layout scroll component for Squarespace List sections. Items are always visible and stacked with generous spacing. As each item title crosses the midpoint of the screen, the paired image panel updates with a smooth crossfade — keeping context in view without any hover or click required.

**[hatchlabs.com.au](https://hatchlabs.com.au)**

---

## How it works

- Image panel is sticky — it stays in view as the user scrolls
- Each item's image activates when the item title crosses 50% of the viewport height
- On mobile, the sticky image is hidden and each item renders its own image above the text
- List item titles and image overlay text inherit the site's h2 font automatically

---

## Requirements

- Squarespace 7.1
- List section set to **Simple List** display type

---

## Installation

Do this once per site.

**Settings > Advanced > Code Injection > Header:**
```html
<!-- List Split Sticky by Hatch Labs -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/hatch-labs/list-split-sticky@v1/core.min.css">
```

**Settings > Advanced > Code Injection > Footer:**
```html
<!-- List Split Sticky by Hatch Labs -->
<script src="https://cdn.jsdelivr.net/gh/hatch-labs/list-split-sticky@v1/core.min.js"></script>
```

---

## Setup

1. Add a **List** section to your page
2. In the List section settings, set the display type to **Simple List**
3. Turn off the **section header** and **section button** — these are not used
4. Add your items — each item needs a **title**, **description**, and **image**
5. Open the section settings and set the **Section ID** to:
```
list-split-sticky
```

The component activates automatically on page load.

---

## Customisation

All visual overrides go in **Design > Custom CSS**.

```css
:root {
  --lss-accent:      #2d4a3e;
  --lss-direction:   row-reverse;   /* move image to right */
  --lss-item-gap:    60vh;          /* spacing between items */
  --lss-sticky-top:  100px;         /* offset from top of viewport */
  --lss-prehead:     "SERVICE ";
}
```

---

## Variable reference

### Layout

| Variable | Default | Description |
|---|---|---|
| `--lss-direction` | `row` | Image position. `row` = left, `row-reverse` = right |
| `--lss-image-width` | `33%` | Width of the image panel |
| `--lss-gap` | `17%` | Gap between image and list |
| `--lss-image-aspect` | `4 / 5` | Image aspect ratio |
| `--lss-image-radius` | `8px` | Image border radius |
| `--lss-item-gap` | `50vh` | Vertical gap between list items |
| `--lss-sticky-top` | `80px` | Distance from top of viewport when sticky — set to match your header height |

### Colour

| Variable | Default | Description |
|---|---|---|
| `--lss-accent` | `#486D5D` | Active title colour |
| `--lss-title-color` | `#1a1a1a` | List item title colour |
| `--lss-desc-color` | `#666` | List item description colour |
| `--lss-num-color` | `#aaa` | List item number colour |
| `--lss-image-bg` | `#0b231a` | Image background (visible during transition) |
| `--lss-image-overlay` | dark gradient | Gradient overlay on the image panel |

### Image overlay

| Variable | Default | Description |
|---|---|---|
| `--lss-show-bg-num` | `1` | Large faded number top-right. `1` = show, `0` = hide |
| `--lss-show-prehead` | `1` | Label above title. `1` = show, `0` = hide |
| `--lss-show-image-title` | `1` | Item title on image. `1` = show, `0` = hide |
| `--lss-prehead` | `"ITEM "` | Label word shown before the number |

### Typography

Each of the four overlay and number elements defaults to the site's h2 font family (read automatically from the live page). Size, weight, and colour are independently controllable.

| Variable | Default | Description |
|---|---|---|
| `--lss-num-size` | `12px` | List item number font size |
| `--lss-num-weight` | `400` | List item number font weight |
| `--lss-num-color` | `rgba(255,255,255,0.5)` | List item number colour |
| `--lss-prehead-size` | `10px` | Image prehead font size |
| `--lss-prehead-weight` | `400` | Image prehead font weight |
| `--lss-prehead-color` | `rgba(255,255,255,0.65)` | Image prehead colour |
| `--lss-image-title-size` | `clamp(18px, 2vw, 26px)` | Image overlay title font size |
| `--lss-image-title-weight` | `400` | Image overlay title font weight |
| `--lss-image-title-color` | `#fff` | Image overlay title colour |
| `--lss-bg-num-size` | `clamp(72px, 10vw, 130px)` | Large background number font size |
| `--lss-bg-num-weight` | `200` | Large background number font weight |
| `--lss-bg-num-color` | `rgba(255,255,255,0.15)` | Large background number colour |

> **List item titles and descriptions** inherit their font, size, weight, and colour directly from Squarespace — no overrides applied. Style them via the site's Style Editor as normal.

### Transition

| Variable | Default | Description |
|---|---|---|
| `--lss-img-transition` | `0.55s ease` | Image crossfade speed |

---

## Notes

**Sticky not working?** Check that no ancestor element has `overflow: hidden` set. The component adds `overflow: visible` to the section and its content wrappers, but a theme-level style higher up the tree could override this.

**`--lss-sticky-top`** should match the height of any fixed header on the site. If there is no fixed header, `0px` works.

---

## Licence

This component is licensed under [CC BY-NC-ND 4.0](LICENSE). You may use and share it freely for non-commercial purposes with attribution. You may not modify it or use it commercially without written permission from Hatch Labs.

For licensing enquiries: laura@hatchlabs.com.au
