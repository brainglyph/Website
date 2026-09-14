# Brainglyph / Heli.os website research

Research date: 2026-09-14

## Goal

Prepare the Brainglyph site for the Heli.os announcement while keeping the studio's recognizable acid-yellow, near-black, mono-type identity. The new site should feel like a deliberate game reveal: atmospheric first, informative second, and easy to act on throughout.

## Current-site audit

The live site has a memorable palette and custom glyph language, but the page currently reads as a studio profile with Heli.os inserted into it rather than as a Heli.os announcement.

- The hero communicates the studio promise before the game, while the game title and visual arrive below the fold.
- The page is very long and gives equal visual weight to social links, community benefits, team members, advisors, supporters, and contact actions.
- Repeated centered headings, circular portraits, and large vertical gaps weaken the hierarchy.
- The typewriter and cycling-glyph motifs are on-brand, but they can be consolidated into one signature reveal rather than repeated animation.
- Important launch actions are not yet visible in the first viewport. The announcement version should reserve primary CTA space for the final destination (for example, Steam/wishlist) and keep Discord or the press kit secondary.
- The current Open Graph metadata points to an external GIF and includes localhost Twitter metadata. Announcement metadata should use an owned, static social image and the production URL.
- Several image alt texts are generic (for example, `Ast Black Image`) and should describe the person or be empty when decorative.
- The current NextUI package family is deprecated in favor of HeroUI. A visual rewrite need not begin with a framework migration, but new bespoke sections should avoid deepening dependency on legacy components.

## Useful reference libraries

### Magic UI

Source: <https://magicui.design/docs/components>

Best fits for Brainglyph:

- `Hero Video Dialog`: a strong pattern for placing trailer playback directly beside the game promise.
- `Bento Grid`: useful for three or four gameplay pillars, not as a generic feature wall.
- `Border Beam` or `Shine Border`: a restrained signal-line treatment for one primary CTA or media frame.
- `Text Reveal`, `Hyper Text`, or `Glyph Matrix`: natural extensions of the existing glyph/terminal identity.
- `Noise Texture`, `Flickering Grid`, or `Grid Pattern`: low-opacity atmosphere behind otherwise static sections.
- `Scroll Progress`: a subtle progress indicator that fits a vertically paced reveal.

### Skiper UI

Source: <https://skiper-ui.com/components>

Best fits for Brainglyph:

- `Text reveal box` / `Horizontal Text reveal`: chapter-heading transitions between game sections.
- `Scroll with fade effect`: gentle media transitions without turning the page into a motion demo.
- `Image reveal`: controlled screenshot or concept-art reveals.
- `Card stack scroll`: a candidate for mechanics or world fragments if there is enough content.
- `Text roll navigation`: a compact microinteraction for the navbar and footer links.
- `Video player 001`: inspiration for a branded trailer surface rather than a default embedded player.

Avoid the library's large preloader, liquid simulation, and cursor-trail patterns for this launch. They are high-cost, distract from the game, and are harder to make accessible on touch and reduced-motion devices.

### Aceternity UI

Source: <https://ui.aceternity.com/components>

Best fits for Brainglyph:

- `Encrypted Text`: an excellent match for the studio's glyph motif and the knowledge-discovery premise.
- `Dither Shader` or `Pixelated Canvas`: potentially useful on one key image if it matches final Heli.os art direction.
- `Sticky Scroll Reveal`: a strong desktop treatment for explaining the gameplay loop in three short beats.
- `Focus Cards` or `Direction Aware Hover`: useful for a small screenshot gallery.
- `Tracing Beam`: a possible narrative device for the reveal sequence, provided it remains subtle.
- `Resizable Navbar`: useful as inspiration for a compact navigation state after the hero.

Avoid stacking multiple background effects. Pick one atmospheric system and let the key art carry the page.

### Motion Primitives

Source: <https://motion-primitives.com/docs>

This is the best source for restrained production-ready motion. `In View`, `Animated Group`, `Text Scramble`, `Border Trail`, `Progressive Blur`, and `Tilt` cover most of the desired behavior with a smaller stylistic footprint. Prefer these patterns when a component should support the design rather than call attention to itself.

### React Bits

Source: <https://reactbits.dev/>

`Pixel Trail`, `Magnet Lines`, `Shape Grid`, `Grainient`, and `Metallic Paint` offer useful experiments for a single Heli.os visual motif. The source-owned distribution model is attractive, but shader/canvas components should be tested carefully for mobile GPU cost, hydration behavior, and reduced-motion support.

## Recommended announcement structure

1. **Reveal hero** — Heli.os title, one-sentence premise, status/release label, primary CTA, secondary trailer CTA, and full-bleed key art or video.
2. **The hook** — a short, oversized statement explaining the knowledge-based action roguelite idea, using a glyph or encrypted-text reveal once.
3. **Gameplay loop** — three concise beats in a sticky-scroll or editorial split layout: observe, understand, exploit.
4. **World and media** — screenshots or short clips in a focused gallery with one intentional hover/reveal behavior.
5. **Signals from development** — a compact strip linking the strongest devlog, Discord, press kit, and any public milestone.
6. **Studio credit** — a short Brainglyph statement and compact team presentation; advisors/supporters can move to an About or Press route.
7. **Final CTA** — repeat the single launch goal with Discord and email as secondary links.

## Component shortlist for the first build

Use a maximum of four signature behaviors:

1. Glyph/scramble title reveal for the Heli.os wordmark or section eyebrow.
2. Subtle grain or grid atmosphere behind the hero.
3. Sticky three-step gameplay explanation with restrained in-view transitions.
4. Media cards with progressive blur or directional reveal.

Everything else should rely on typography, composition, and Heli.os imagery. Respect `prefers-reduced-motion`, keep hover effects nonessential, preserve keyboard focus states, and lazy-load media below the fold.

## Implementation notes

- The repo is Next.js 14, React 18, Tailwind CSS 3, NextUI 2, and Framer Motion 11.
- Prefer adapting component ideas into local source over importing several component libraries.
- Establish reusable tokens for acid yellow, ink black, game gold, muted copy, borders, spacing, and motion duration before rebuilding sections.
- Split the current monolithic home page into data-driven sections/components before adding richer motion.
- Use the existing `keyart.webp`, `fakeScreen.webp`, Heli.os logo, studio marks, and press assets as the initial content inventory.
- Before launch, validate desktop and mobile layout, keyboard navigation, reduced motion, Lighthouse performance, metadata, external links, and image descriptions.

## Open content decisions

The visual implementation can begin with placeholders, but final conversion hierarchy depends on three inputs: the announcement date/status, the primary destination (such as a Steam page), and whether a trailer or gameplay clip is ready.
