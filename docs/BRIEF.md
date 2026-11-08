# Design brief (as given by the owner)

Part 2 overrides Part 1 wherever they conflict.

---
# PART 1
# SK EMERALD INTERIOR — EXISTING PROJECT PREMIUM REDESIGN PROMPT

## OBJECTIVE

Upgrade the actual supplied SK Emerald Interior React website into a more visually stunning, premium, attractive, and professionally art-directed furniture and interior-design website.

I have provided two ZIP files:

1. `SK emerald Interior design(1).zip` — contains the original reference HTML, existing business images, logo, saved website references, PDF, and previous master prompt.
2. `sk-emerald-interior.zip` — contains the existing React/Vite website, page components, data files, stylesheets, image assets, routing, and `HANDOFF.md`.

**Work on the existing React/Vite project. Do not create a separate website, discard the current implementation, or rebuild everything from scratch.**

The existing implementation is already a foundation. I want you to improve its visual quality significantly, especially the homepage collection showcase, image quality, premium detailing, and overall visual appeal.

This is an implementation task, not a request for suggestions or a design report. Inspect the files, make the changes, and test the result.

---

## 1. INSPECT THE EXISTING CODE BEFORE CHANGING IT

Start by inspecting both ZIPs and the actual working directory.

Read these files and their relevant dependencies:

- Original reference HTML: `sk emerald files/sk-emerald-interior.html`
- Previous master prompt: `sk emerald files/SK_Emerald_Interior_Master_Prompt.txt`
- Existing React homepage: `src/pages/Home.jsx`
- Existing collection data: `src/data/collections.js`
- Existing image inventory: `src/data/images.js`
- Business information: `src/data/business.js`
- Shared UI components: `src/components/ui.jsx`
- Layout and navigation: `src/components/Layout.jsx`
- Routing: `src/router.jsx`
- Global styling: `src/styles.css`
- Remaining page components under `src/pages/`
- Existing `HANDOFF.md`, README, and project configuration.

The React project already includes multiple pages and collection routes. Preserve this work and enhance it.

Compare the original HTML with the current React implementation. Identify valuable visual treatments, content, image compositions, and design details that could improve the React website.

Read `HANDOFF.md` carefully, but verify its statements against the current code.

Before editing, identify the exact image references currently used by the homepage and gallery, how collection tiles are populated, and where the visible “Design reference” labels originate.

Do not stop after the audit. Proceed directly to implementation.

## 2. VISUAL REDESIGN: MORE PREMIUM, MORE BEAUTIFUL

The current design direction is good, but I want it to feel considerably more premium, polished, attractive, and memorable.

The desired aesthetic is:

**Modern luxury furniture showroom + editorial interior photography + understated metallic detailing + warm architectural minimalism.**

It should feel like a carefully designed, high-end furniture brand rather than a standard website template.

Use the existing design system as your foundation, then refine the details.

### Colour direction

Use these colours as the starting palette:

- Warm ivory: `#F7F4EC`
- Soft chalk: `#FCFAF6`
- Limestone: `#EEEAE1`
- Champagne gold: `#C9AD78`
- Soft brushed silver: `#C6CBCC`
- Light platinum: `#E5E7E5`
- Muted eucalyptus: `#788B7A`
- Soft sage: `#A4B2A0`
- Deep forest green: `#263F34`
- Rich charcoal: `#252A27`

Ivory should remain the dominant surface.

Introduce champagne gold to add warmth and a subtle feeling of luxury. Use it for selected fine lines, small details, carefully chosen icons, and a few important accents.

Use chrome and silver as understated material details, such as thin metallic rules, delicate gradients on small elements, subtle hardware-inspired details, and refined borders.

Green should add sophistication and contrast, not dominate the website. Reserve deep green for selected sections, important calls to action, and carefully composed backgrounds.

Do not turn the website into a gold-and-green template. Avoid bright emerald, excessive gold gradients, glossy metallic buttons everywhere, and distracting colour combinations.

**The overall result should feel more luxurious than the current version while remaining tasteful and restrained.**

### Typography

Keep the existing Cormorant Garamond and Manrope pairing if it continues to work well.

Improve:
- Heading proportions.
- Line breaks.
- Font weights.
- Navigation typography.
- Section introductions.
- Image captions.
- Collection labels.
- Button spacing.
- Text hierarchy and readability.

Use large editorial headings, comfortable paragraph widths, carefully considered spacing, and consistent typography across every page.

### Visual details

Improve the quality of:
- Header and logo presentation.
- Hero section composition.
- Section transitions.
- Button treatments.
- Image borders and frames.
- Hover effects.
- Collection cards.
- Small labels and captions.
- Footer layout.
- Spacing and alignment.
- Desktop and mobile visual hierarchy.

Use thin metallic details, subtle material textures, beautiful negative space, architectural framing, and asymmetric layouts selectively.

Do not add decorative elements without a purpose.

Avoid excessive pill-shaped cards, heavy shadows, generic glassmorphism, neon effects, large gold gradients, and unnecessary animations.

## 3. PRIORITY ONE: REDESIGN THE HOMEPAGE COLLECTIONS SECTION

This is one of the most important requirements.

Inspect the existing `TILES` definition and the `showcase` / `mosaic` section in `src/pages/Home.jsx`.

The current homepage already uses an asymmetric collection layout. Preserve that approach, but elevate its composition and ensure every tile looks intentional, attractive, and complete.

The section must not contain blank spaces where images should be, awkwardly sized images, generic repeated cards, or empty-looking tiles.

### Required homepage collection categories

Prioritise these six categories:

1. Sofas
2. Modular kitchens
3. Wardrobes
4. TV units
5. Beds
6. Recliners

Use the existing collection data and routes. Each tile must link to the correct collection page.

### Desired visual treatment

Create a carefully art-directed editorial mosaic with varied proportions.

For example:
- A large, cinematic sofa image as a prominent anchor tile.
- A tall modular-kitchen image.
- A tall wardrobe image.
- A compact TV-unit image with a strong composition.
- A portrait-oriented bedroom or bed image.
- A wide recliner image.

This is a compositional direction, not a rigid layout. Use your judgment to create a beautiful grid that works at all viewport sizes.

Each tile must include:
- A high-quality, relevant image.
- A clear category name.
- A short, tasteful supporting description where appropriate.
- A refined visual treatment that fits the brand.
- A subtle, smooth hover interaction on desktop.
- A clearly identifiable link or interaction.
- Proper image positioning and cropping.

Use subtle ivory or silver framing, elegant typography, and restrained green or champagne-gold accents.

The category title must remain readable against the image. Use carefully positioned text, a subtle gradient overlay where needed, or a separate caption area. Do not cover important furniture details with text.

Do not force every card into the same square shape. The visual variety is essential to making the section feel like a premium editorial showroom.

Add a strong section introduction, an appropriate short description, and a tasteful “Explore all collections” link.

Keep the layout compact enough to avoid unnecessary scrolling while giving the photography enough room to make an impact.

### Responsive behaviour

On desktop, preserve the asymmetric editorial composition.

On mobile, transform the layout intelligently:
- No horizontal overflow.
- No tiny cards.
- No text collisions.
- No awkwardly cropped furniture.
- No excessively tall empty spaces.
- No unreadable captions.

Use a deliberate mobile grid, stacked layout, or horizontally browsable collection treatment only if it genuinely improves usability.

The section must look professionally designed on a narrow phone, not merely like the desktop grid compressed to fit.

## 4. CREATE BEAUTIFUL AI-GENERATED IMAGE ASSETS

I explicitly authorise the use of AI-generated images as temporary visual assets for this website.

**If an appropriate image-generation tool is available, generate and actually integrate original, photorealistic interior and furniture imagery into the project. Do not merely recommend image prompts or describe the images you would like to use.**

The goal is to make the website visually impressive immediately, even before the business replaces the temporary images with its own photography.

Prioritise imagery for the homepage hero and all six collection tiles. Also identify any other important page where the current photography is weak, missing, duplicated, irrelevant, or poorly composed.

### Image art direction

Create high-end interior photography with the visual quality of a professionally art-directed furniture campaign.

The images should feature:
- Beautiful contemporary Indian homes.
- Premium furniture with convincing proportions.
- Sophisticated ivory and neutral interiors.
- Warm natural daylight.
- Natural wood and stone.
- Muted green accents where appropriate.
- Tasteful brushed-metal and champagne-gold details.
- Realistic fabric textures.
- Beautiful architectural composition.
- Convincing material reflections.
- Natural shadows and lighting.
- Realistic furniture construction and details.

Keep the imagery coordinated with the website's visual identity.

The photographs should not all look identical. Vary the rooms, camera angles, furniture arrangements, compositions, and lighting while maintaining a coherent premium brand aesthetic.

### Category-specific image direction

**Sofas:** A beautifully composed contemporary living room with a sophisticated sofa, realistic upholstery, natural light, warm ivory walls, and carefully selected wood or metallic accents.

**Modular kitchens:** A high-end modern kitchen with convincing cabinetry, elegant countertops, realistic finishes, integrated storage, and beautiful architectural lighting.

**Wardrobes:** A premium bedroom with tall fitted wardrobes, elegant panels, convincing joinery, understated handles, and warm architectural lighting.

**TV units:** A refined living-room composition featuring a beautifully integrated entertainment unit, tasteful material combinations, and realistic joinery.

**Beds:** A luxurious but believable bedroom with an elegant bed, layered neutral bedding, a carefully composed headboard, and natural textures.

**Recliners:** A premium, comfortable recliner or recliner sofa in a sophisticated living room, photographed with realistic proportions and detailed upholstery.

**Hero image:** A striking, cinematic interior photograph with beautiful composition, premium furniture, sophisticated natural materials, and enough negative space for the headline and calls to action.

### Asset implementation rules

Generate assets at appropriate resolutions and aspect ratios for their actual placements.

Save generated assets inside the project's public image directory, using descriptive filenames such as:
- `hero-interior.webp`
- `collection-sofas.webp`
- `collection-kitchens.webp`
- `collection-wardrobes.webp`
- `collection-tv-units.webp`
- `collection-beds.webp`
- `collection-recliners.webp`

Use appropriate filenames and formats based on the actual files produced. Convert images to WebP or another suitable efficient format where practical.

Update `src/data/images.js` and the appropriate collection data to reference the correct assets.

Do not leave generated files unused in a random folder. Integrate them into the actual rendered pages.

If image generation is unavailable, use the best suitable existing images or create a clean, intentional placeholder system and document the remaining image-generation work. Never claim to have generated or integrated assets that do not exist.

### Truthful image presentation

These AI-generated images are temporary visual assets, not evidence of actual completed SK Emerald Interior projects.

They should be presented as product imagery, illustrative interiors, or collection inspiration as appropriate. Do not falsely attribute a generated room to the company's completed work, showroom, factory, or customer.

Make the assets easy to replace later without requiring a redesign of the website.

Maintain a simple image mapping so real photographs can be substituted by changing image references rather than rewriting page layouts.

## 5. REMOVE ALL VISIBLE “DESIGN REFERENCE” TAGS

This requirement is explicit.

The current project identifies some photographs as reference imagery in its image inventory and gallery presentation. The public website must not display labels such as:
- “Design reference”
- “Reference image”
- “AI reference”
- “Placeholder image”
- Similar internal asset-classification tags.

Inspect `src/data/images.js`, the shared `Photo` component, `src/pages/Gallery.jsx`, and any other location where these labels may be rendered.

Remove the visible classification badges and internal labels from the customer-facing experience.

The finished website should feel like a polished, complete furniture showroom, not a design-development board.

However, removing the visible tags must not mean falsely claiming that inspiration imagery is actual company work.

Where appropriate, use neutral editorial captions such as the actual furniture category or product type. For the portfolio, show only verified company projects as completed work; otherwise use a separate, appropriately titled inspiration collection.

Do not remove legitimate category names, navigation labels, or useful image descriptions.

## 6. REVIEW EVERY IMPORTANT IMAGE

Do not change the homepage alone and leave weak imagery elsewhere.

Review:
- Homepage hero.
- Six homepage collection tiles.
- Collection listing page.
- Individual collection detail pages.
- Gallery.
- Interiors page.
- About page.
- Materials page.
- Any other image-led sections.

Identify duplicated photographs, incorrect mappings, mismatched categories, poor crops, missing images, and inconsistent quality.

Use the strongest genuine business photographs where appropriate. Add AI-generated assets where they materially improve the visual quality.

Avoid using the same AI-generated photograph repeatedly across unrelated sections merely to fill space.

Maintain a consistent photographic identity across the site.

Use responsive image sizing, suitable `object-fit` behaviour, correct focal points, descriptive alt text, and lazy loading for below-the-fold images. Prioritise the actual hero image appropriately.

Do not distort images or use aggressive cropping that removes the furniture's important features.

## 7. IMPROVE THE REST OF THE WEBSITE WITHOUT DESTROYING WHAT WORKS

Preserve the existing multi-page structure and improve the presentation consistently.

Inspect and refine:
- Header and mobile navigation.
- Homepage hero.
- Collections listing.
- Individual collection pages.
- Interiors page.
- Gallery and lightbox.
- About page.
- Materials page.
- Contact page.
- FAQ page.
- Privacy page.
- Footer.
- Not-found page.

Keep the existing React components, data structures, business details, and functional interactions wherever they are already working well.

Do not turn every page into the same template with a different heading.

Use appropriate layouts for each page: editorial photography for the hero, distinctive collection compositions, clear product information, sophisticated material details, and useful contact pathways.

The website should feel coherent as one brand while giving each page its own visual character.

Do not add unnecessary sections just to make pages longer.

Do not invent customer testimonials, completed projects, product specifications, awards, ratings, or business achievements.

## 8. ANIMATION AND MICRO-INTERACTIONS

Make the website feel polished through subtle, high-quality interactions.

Appropriate improvements include:
- Smooth image hover effects.
- Restrained image reveals.
- Subtle button transitions.
- Refined navigation states.
- Small, controlled image-scale transitions.
- Gentle section entrances.
- Elegant gallery interactions.

Do not animate everything.

Avoid long loaders, scroll hijacking, excessive parallax, distracting effects, and animations that delay access to content.

Use CSS transitions for straightforward interactions. Use GSAP only if it materially improves the result and can be integrated cleanly.

Respect reduced-motion preferences and ensure all essential interactions work without animation.

## 9. MOBILE-FIRST QUALITY

The website must look exceptional on mobile.

Test at widths around:
- 320–360 px.
- 375–430 px.
- Tablet sizes.
- Laptop and desktop sizes.

Check:
- Header and mobile menu.
- Hero headline and image.
- Collection mosaic.
- Collection captions.
- Image focal points.
- Buttons and enquiry actions.
- Gallery.
- Footer.
- Long text and addresses.
- Touch targets.
- Horizontal overflow.
- Sticky navigation.

Mobile must be a deliberately designed experience, not an afterthought.

Desktop should retain its own premium editorial composition and spacious visual hierarchy.

## 10. CODE AND PROJECT RULES

Work in the supplied React/Vite project.

- Preserve the existing routes and useful components.
- Maintain the existing package setup unless a genuine requirement justifies a change.
- Keep image and collection mappings centralised.
- Avoid duplicating styles or creating unnecessarily complicated components.
- Keep the site performant and accessible.
- Ensure all existing routes still work.
- Preserve the original reference HTML and saved source files.
- Do not create a separate, disconnected implementation.
- Do not replace working content with empty placeholders.
- Do not introduce unnecessary dependencies.

Update `HANDOFF.md` with the changes made, new image assets, relevant asset mappings, any remaining image replacements, and the actual verification results.

Do not push to GitHub, deploy, publish, or modify remote repositories. Work locally only.

## 11. TEST THE ACTUAL RESULT

After implementing the redesign:

1. Run the available production build.
2. Inspect the homepage and every major route.
3. Confirm that the six homepage collection tiles display the correct images.
4. Verify that no collection tile is empty or broken.
5. Search the source and rendered pages for unwanted “Design reference” labels.
6. Check that no important images are duplicated unnecessarily.
7. Verify all collection links and navigation.
8. Check mobile and desktop layouts.
9. Inspect console errors and broken asset references where tools permit.
10. Confirm that generated assets actually exist and are referenced by the application.
11. Fix any defects discovered.
12. Update `HANDOFF.md` with accurate results.

Do not claim the build passed unless it actually ran successfully.

## FINAL PRIORITIES

If you need to prioritise your work, follow this order:

1. Improve the overall premium visual identity.
2. Make the homepage collections section outstanding, fully populated, and responsive.
3. Generate and integrate beautiful AI imagery wherever the existing images are insufficient.
4. Remove all visible “Design reference” and internal asset-classification tags.
5. Refine the hero, image compositions, typography, and details across the rest of the website.
6. Validate functionality, responsiveness, and the production build.

The finished website should look significantly more attractive, polished, and premium than the current version while preserving the useful work already completed.

**Start inspecting the supplied files and implement the redesign now. Do not respond with another plan instead of doing the work.**

---
# PART 2 (overrides Part 1)
# CREATIVE OVERRIDE — AWWWARDS-LEVEL, WORLD-CLASS DIGITAL SHOWROOM

## THE AMBITION

I do NOT want an ordinary premium furniture website.

I want SK Emerald Interior to look and feel like a world-class digital experience designed by an elite creative studio for an ambitious luxury interior brand.

Target the level of creative ambition, visual polish, interaction quality, and art direction associated with exceptional Awwwards-recognised websites, premium digital agencies, and award-calibre editorial experiences.

Do not interpret this as permission to add random animations, gradients, 3D effects, or fashionable design tricks.

The objective is a genuinely extraordinary website in which every detail feels deliberate.

Think:
- Award-level art direction.
- Cinematic interior photography.
- Architectural editorial layouts.
- Unexpected but elegant compositions.
- Exceptional typography and visual hierarchy.
- Beautifully choreographed transitions.
- Original, memorable interaction design.
- Sophisticated material-inspired interface details.
- Exceptional mobile experiences.
- A coherent visual identity that is immediately recognisable.

The website should make someone land on the homepage and immediately think:

**“This looks like a seriously expensive, exceptionally well-designed brand.”**

The result should feel creative enough to stand out in an Awwwards-style portfolio, yet commercially useful enough to turn real visitors into furniture enquiries.

Do not claim the website has won an award. The goal is to achieve that level of ambition and execution.

## 1. ART DIRECTION: THINK BEYOND STANDARD WEBSITE SECTIONS

Challenge the default structure of a conventional furniture website.

Do not automatically create:
- A centred headline above a standard rectangular hero image.
- Six identical collection cards.
- Repeated white sections with alternating headings and images.
- Generic rounded cards with identical shadows.
- A basic footer that looks like every other template.

Instead, develop a distinctive visual narrative for SK Emerald Interior.

Consider:
- Oversized editorial typography integrated with architectural photography.
- Full-bleed hero imagery with carefully controlled negative space.
- Unexpected asymmetrical image compositions.
- Large photographic canvases intersected by narrow material-detail images.
- Sophisticated overlapping image layers.
- Vertical typography or architectural indexing where it genuinely improves the design.
- Elegant metallic hairlines and precise geometric framing.
- Small editorial annotations inspired by architectural drawings.
- Carefully contrasted ivory and forest-green surfaces.
- Unusual but readable image-caption placements.
- A striking transition from the hero into the collections showcase.
- Carefully controlled moments of visual surprise throughout the scroll.

Use these as creative possibilities, not a checklist. Choose only the treatments that create a coherent, distinctive result.

Every major section should have its own compositional identity while remaining recognisably part of the same brand.

## 2. CREATE A SIGNATURE HOMEPAGE THAT PEOPLE REMEMBER

The homepage is the flagship experience. Give it substantially more creative attention than an ordinary implementation.

### Hero: an unforgettable opening

Create a cinematic, immersive opening built around exceptional AI-generated interior photography.

The photograph should feel like a luxury interiors campaign shot by an outstanding architectural photographer.

The composition should have:
- Beautiful spatial depth.
- Convincing furniture proportions.
- Exceptional lighting and realistic materials.
- Sophisticated ivory, natural wood, muted green, and subtle metallic details.
- Carefully composed negative space.
- A clear focal point.
- An elegant relationship between image and typography.

Avoid a generic stock-photo hero with text placed on top.

Explore a distinctive layout in which typography, imagery, and small editorial details work together as one art-directed composition.

The first screen should feel extraordinary without making the brand name, message, navigation, or primary action difficult to find.

Consider a restrained entrance animation that reveals the visual composition with precision. Keep it brief and immediately dismissible or avoid a loader entirely.

The experience must not force visitors to wait before accessing the website.

### Collection showcase: the visual centrepiece

The collections section must be one of the most memorable parts of the entire website.

Do not settle for six standard cards.

Design an original, asymmetrical editorial composition using the six core categories:
- Sofas.
- Modular kitchens.
- Wardrobes.
- TV units.
- Beds.
- Recliners.

Give the categories different visual weights, proportions, image treatments, and carefully positioned typography.

Consider a large anchor image paired with smaller architectural image frames, varied aspect ratios, understated metallic dividers, and sophisticated hover transitions.

Use genuine visual contrast between the images. A kitchen must look distinctly different from a bedroom or sofa collection.

Generate dedicated, photorealistic AI images for these placements wherever the existing photographs are insufficient. The image quality must be consistent enough that no tile feels like an obvious downgrade.

Make the desktop composition feel like an art-directed furniture editorial. Redesign it intelligently for mobile rather than merely stacking the desktop cards.

Every collection must remain easy to understand, navigate, and explore.

### Scroll narrative

Treat the homepage as a carefully choreographed journey, not a stack of unrelated sections.

Create a natural rhythm between:
1. A powerful cinematic opening.
2. A distinctive collections reveal.
3. A materials and craftsmanship moment.
4. An immersive gallery or interior-solutions composition.
5. A credible brand story.
6. A clear enquiry or showroom invitation.

You may refine this order to suit the actual content.

Alternate visual density with quiet space. Use darker green sections selectively to create contrast. Use ivory to restore visual calm. Introduce metallic detailing only when it strengthens the composition.

Each transition should feel intentional.

## 3. MOTION DESIGN: CINEMATIC, PRECISE, PURPOSEFUL

Use GSAP where appropriate, along with native CSS transitions and other lightweight techniques.

Motion should feel choreographed by an experienced motion-design studio.

Explore:
- Image reveals using elegant masks or clipping.
- Text entrances with carefully controlled timing.
- Subtle image parallax on capable desktop devices.
- Sophisticated collection-image hover states.
- Small directional movements that reinforce navigation.
- Gentle transitions between page states.
- Restrained staggered reveals.
- Beautiful lightbox transitions.
- Deliberate changes in image scale or framing as users interact.

Do not implement every effect.

Choose a small number of signature interactions and execute them exceptionally well.

Avoid:
- Excessive parallax.
- Scroll hijacking.
- Long, theatrical loading screens.
- Animations that delay access to content.
- Constantly moving text.
- Unnecessary cursor effects.
- Heavy effects that damage mobile performance.
- Animation sequences that become repetitive or predictable.
- Interactions that work only with a mouse.

Animations must be responsive, reversible where appropriate, and respectful of `prefers-reduced-motion`.

The website should still feel premium when animations are disabled.

## 4. COLOUR AND MATERIALS: LUXURY WITHOUT EXCESS

Retain the established ivory, champagne gold, brushed chrome, muted green, and charcoal direction.

Elevate it through the quality of execution.

Ivory provides the architectural canvas. Champagne gold adds warmth. Brushed silver and chrome suggest precision and hardware craftsmanship. Deep forest green creates occasional dramatic contrast.

Use metallic effects with restraint and material realism.

Do not make the website resemble a jewellery shop, a futuristic dashboard, or a gold-themed luxury template.

The furniture photography should remain the primary source of visual richness.

## 5. GENERATE ART-DIRECTED IMAGERY, NOT GENERIC AI ROOMS

Create a coordinated image campaign specifically for SK Emerald Interior.

Do not simply generate a collection of unrelated rooms and place them into the website.

Establish consistent lighting, material quality, photographic realism, and colour grading while varying the actual interiors and furniture.

The imagery should feel commissioned for a sophisticated furniture brand.

Prioritise:
- Hero photography.
- Collection anchor images.
- Kitchens and fitted storage.
- Sofas and seating.
- Bedroom and wardrobe compositions.
- Material and hardware details.
- Supporting imagery for the other important pages.

Each image should be composed for its exact placement, including its aspect ratio, subject position, focal point, and available space for text.

Use different crops or separate generated images when necessary rather than stretching a single image across every section.

Save the resulting files into the project and connect them to the actual React components.

These images are temporary illustrative assets, not evidence of completed company projects. Do not misrepresent them.

## 6. THE DETAILS THAT SEPARATE GOOD FROM EXCEPTIONAL

Inspect the website at a microscopic level.

Pay attention to:
- Exact spacing between elements.
- Typography alignment and line breaks.
- Image focal points.
- Button proportions.
- Navigation rhythm.
- Border thickness.
- The relationship between image and caption.
- Section heights.
- Scroll rhythm.
- Hover timing.
- Mobile touch targets.
- Responsive typography.
- Footer proportions.
- Consistency across individual pages.

Do not leave obvious template defaults or unfinished areas.

Do not introduce visual effects merely to demonstrate technical ability.

Every design decision should have a reason.

## 7. MOBILE IS AN EQUAL CREATIVE PRIORITY

The mobile website must feel art-directed specifically for phones.

Do not allow the desktop design to dictate awkward mobile layouts.

Recompose image sequences, typography, collection grids, section spacing, and navigation for smaller screens.

Use elegant, intentional cropping and carefully positioned content.

Maintain excellent readability, fast interactions, and usable controls.

The mobile experience should feel as polished and distinctive as the desktop experience, not like a simplified fallback.

## 8. THE AWARDS-LEVEL QUALITY GATE

Before declaring the implementation complete, conduct a serious creative review.

Ask yourself:

- Could this website be mistaken for a generic AI-generated template?
- Does the opening screen create a memorable visual impression?
- Is the collection section genuinely distinctive?
- Are the images beautiful, believable, and correctly composed?
- Does the visual identity remain coherent across every route?
- Are the animations elegant rather than excessive?
- Does the typography feel professionally art-directed?
- Is there a clear visual rhythm from section to section?
- Does the mobile version feel intentionally designed?
- Are there any unfinished, repetitive, empty, or visually weak areas?
- Does every effect improve the actual experience?
- Would a senior designer find the composition thoughtful rather than merely fashionable?

If the answer to any of these questions reveals a weakness, improve it before finishing.

Compare the actual implementation against the quality of exceptional contemporary digital-agency portfolios and award-recognised design work. Use external examples for inspiration, not imitation.

Do not sacrifice usability, truthful business information, accessibility, performance, or maintainability in pursuit of visual spectacle.

## FINAL CREATIVE DIRECTIVE

Do not deliver the safest conventional design.

Deliver the most compelling, distinctive, polished design that makes sense for this brand and its customers.

Be ambitious with composition, imagery, typography, and interaction design. Be disciplined with colour, animation, and decoration.

The objective is a visually extraordinary digital showroom: memorable on first impression, rewarding to explore, impeccable on mobile, commercially effective, and technically sound.

Build it. Render it. Inspect it. Improve it. Repeat until the weakest major section meets the same quality standard as the strongest.

**Exceptional is the baseline. Generic is a failure.**
