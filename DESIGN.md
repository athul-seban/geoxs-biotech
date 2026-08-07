---
name: Molecular Precision
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#6e7a6c'
  outline-variant: '#bdcab9'
  surface-tint: '#006e2a'
  primary: '#006b29'
  on-primary: '#ffffff'
  primary-container: '#008736'
  on-primary-container: '#f7fff2'
  inverse-primary: '#66de7b'
  secondary: '#006876'
  on-secondary: '#ffffff'
  secondary-container: '#88ebff'
  on-secondary-container: '#006b79'
  tertiary: '#226a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#308606'
  on-tertiary-container: '#f8ffee'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#83fc94'
  primary-fixed-dim: '#66de7b'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531e'
  secondary-fixed: '#a0efff'
  secondary-fixed-dim: '#6fd5e8'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e59'
  tertiary-fixed: '#9df975'
  tertiary-fixed-dim: '#82dc5c'
  on-tertiary-fixed: '#062100'
  on-tertiary-fixed-variant: '#195200'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  wordmark:
    fontFamily: PT Serif
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 1
    letterSpacing: 0.02em
  wordmark-sub:
    fontFamily: PT Serif
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 1
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is engineered for the intersection of cutting-edge biotechnology and human-centric healthcare. The visual language balances scientific rigor with clinical approachability. It utilizes a **Corporate / Modern** aesthetic with elements of **Minimalism** to ensure clarity in complex data environments. 

The brand personality is authoritative yet innovative, evoking feelings of reliability, precision, and futuristic discovery. The interface should feel "breathable" through generous whitespace, mimicking the cleanliness of a high-tech laboratory environment. Subtle geometric patterns, derived from the hexagonal and circular nodes of molecular structures, provide a proprietary texture to backgrounds and headers.

## Colors

The color palette is anchored by a vibrant "Biosphere Green" and a technical "Lab Teal" extracted from the corporate identity. These are supported by a hierarchy of neutral greys and high-clarity whites.

- **Primary (Green):** Used for primary actions, success states, and key molecular branding elements.
- **Secondary (Teal):** Used for informational accents, data visualization, and secondary navigation elements.
- **Neutral:** A range of cool-toned greys for text and structural borders to maintain a clinical, professional feel.
- **Functional Colors:** Standardized red for errors/critical alerts and amber for warnings, maintained with high saturation to ensure visibility against the clean white background.

## Typography

The typography system prioritizes legibility and technical precision. **Hanken Grotesk** is used for headlines to provide a sharp, modern, and high-tech feel. **Inter** serves as the workhorse for body copy, offering exceptional readability for scientific reports and dense documentation. 

For technical data, serial numbers, and code-like identifiers, **JetBrains Mono** is utilized to reinforce the "Biotech" and data-driven nature of the product. Text should generally be set in the "Neutral" slate color to reduce eye strain compared to pure black, while maintaining high contrast against white surfaces.

The wordmark (the "Geoxs Biotech" nameplate in the header and footer) is a deliberate exception, set in **PT Serif** — a classic serif matching the company's registered logotype — rather than the Hanken Grotesk display face used elsewhere. It appears in uppercase at the `wordmark` size with a smaller `wordmark-sub` line for "Private Limited." beneath it, echoing the two-line lockup of the source logo.

## Layout & Spacing

The layout follows a **Fluid Grid** system based on an 8px base unit. This ensures a mathematical harmony across all components.

- **Desktop:** 12-column grid with 24px gutters and wide 64px margins to emphasize the "whitespace-heavy" brand identity.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 16px margins.

Spacing should be generous between sections (`xl` or `lg`) to prevent information density from becoming overwhelming. Use `md` for internal component padding and `sm` for tight groupings of related data points.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. This maintains the clean, "sterile" lab aesthetic.

- **Level 0 (Background):** Solid `#F8FAFB`. Used for the main canvas.
- **Level 1 (Surface):** Solid white `#FFFFFF` with a subtle 1px border (`#E2E8F0`). Used for primary content cards and containers.
- **Level 2 (Hover/Active):** An extremely diffused, 10% opacity shadow using the Secondary color (Teal) to give a "lifted" feel to interactive elements.
- **Overlays:** Modals and dropdowns use a 20px backdrop blur to maintain context while focusing the user's attention.

## Shapes

The shape language is **Soft** but structured. Most UI components utilize a 4px corner radius to feel precise and engineered. Large containers (cards) may use `rounded-lg` (8px) to soften the overall interface. 

Buttons and input fields should remain at the standard 4px radius to avoid looking too "bubbly," maintaining a professional and serious medical tone. Hexagonal shapes may be used sparingly as containers for icons or profile photos to echo the molecular structure of the logo.

## Components

- **Buttons:** Primary buttons use a solid Primary Green fill with white text. Secondary buttons use a Teal outline with Teal text. All buttons feature a 4px corner radius.
- **Inputs:** Clean, outlined boxes with 1px light-grey borders. Focus states use a 2px Teal border. Labels use the `label-md` JetBrains Mono font for a technical feel.
- **Chips/Badges:** Small, pill-shaped markers with low-opacity background tints of green or teal. Used for status indicators (e.g., "Validated," "In Progress").
- **Cards:** White surfaces with a 1px border. No shadows in a resting state. Use a subtle teal glow on hover for interactive cards.
- **Data Tables:** Highly structured with minimal vertical lines. Use alternating row stripes in a very light grey (`#F1F5F9`) to improve readability of complex datasets.
- **Molecular Pattern:** A repeatable SVG pattern of nodes and lines should be used as a "watermark" in the corner of sections or as a background for hero banners, set at 5% opacity.