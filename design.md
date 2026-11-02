# Warer — design direction

Brand renamed to Warer at the user's request. Keep the existing local-storage key so saved hydration logs are preserved.

Responsive hydration dashboard inspired by the supplied editorial portfolio: white canvas, near-black oversized typography, abundant whitespace, thin neutral borders, and acid-lime marker highlights. Original hydration content only.

Typography: Helvetica Neue / Arial, compact display tracking, relaxed body line-height. Palette: ink #20251f, muted #858982, lime #c5f76b, pale lime #f2f8e9, warm white #fafbf8. Rounded panels at 20px, pill buttons, 1120px content width. Header, editorial intro, asymmetric intake dashboard, mineral strip, activity history and understated footer.

Web page: pages/dashboard.tsx composed through pages/index.tsx. CSS in styles.css. Local browser storage separated by date and London/Barcelona/New York. No external API, auth or database needed for this personal-device version.

Features: daily hydration SVG index ring; add/remove intake; editable daily goal; configurable mineral concentrations per liter; illustrative sample logs explicitly labeled and clearable. Mineral values are estimates, not live measurements or medical recommendations. Responsive stacking, accessible dialogs and form controls, reduced-motion support.

## Approved nutrition extension
Add two Spanish-language sections without replacing the existing tracker: six juice/smoothie recipes with photos, recipe dialogs and nutrient-based benefits; seven filterable nutrient guides with oversized headings and six circular food images inspired by supplied references. Reuse cropped food photographs, not unsupported claims in reference posters. Source food/function guidance from NIH ODS and juice portion advice from NHS. Link sources in the UI. Juices never alter water logs. Components and content live in nutrition/; static assets only in public/images/nutrition/. Keep white/ink/lime and add muted fruit accents. Add anchor navigation for hydration, juices, nutrition.