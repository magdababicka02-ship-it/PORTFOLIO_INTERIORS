# SPISAK STUDIO — CODEX IMPLEMENTATION BRIEF

**Repository:** https://github.com/magdababicka02-ship-it/PORTFOLIO_INTERIORS
**Current public interiors page:** https://magdababicka02-ship-it.github.io/PORTFOLIO_INTERIORS/wnetrza.html?lang=pl
**Existing mural reference:** https://magdababicka02-ship-it.github.io/PORTFOLIO_INTERIORS/ornamentalne-niebo.html?lang=pl
**Status:** briefing package only; this does NOT mean the website has been updated.

## STRATEGIC PRIORITY

Art of Meaning is an **art-led creative studio combining painting and interior design**. Do not reposition it as a conventional full-service architecture firm or use "luxury" in every project's title. The flagship aesthetic direction is authored art integrated into spaces.

Show aspirational signature work prominently while retaining selected real residential and creative-commercial case studies that prove experience and authorship.

## 1. CREATE SPISAK STUDIO AS A REAL CASE STUDY

Proposed path (create; not live yet): `spisak-studio.html`.

Title PL/EN/ES: `SPISAK STUDIO`
Tagline PL: `Przestrzeń dla wielu historii.`
Tagline EN: `Spaces for Stories.`
Tagline ES: `Un espacio para historias.`
Location: Katowice, Poland.
Category: Commercial & Creative Spaces; `type: "commercial"` for compatibility with existing filters.
Role: `Interior Concept & Creative Direction`.
Scope: `Space Zoning · Furniture Selection · Colour Palette · Lighting Concept · Interior Styling`.
**NEVER** state architectural redesign, construction management, construction documentation or turnkey delivery for this project. The designer confirmed her scope was concept, furnishings, colors, zones, lighting atmosphere. No architectural or execution phase was within her scope.

### Section order on the webpage

1. HERO — strongest portrait of original windows `01_architectural_windows.jpg`, with small title and tagline; NOT giant full-bleed because source is only ~720px wide.
2. THE IDEA — short concept paragraph + overview `02_studio_overview.jpg` showing one space and multiple shoots.
3. THREE MOODS — three authentic photographs: soft daylight `03_soft_daylight_set.jpg`, evening `04_evening_set.jpg`, dark editorial `05_dark_editorial_set.jpg`.
4. YOUR ROLE — concise statement of concept, zoning, furniture/color selection, lighting; no invented technical achievements.
5. CONTACT — existing contact pathway.
6. Optional small editorial detail `06_botanical_daylight_detail.jpg` only if it adds visual value; avoid `07_warm_details_optional.jpg` as a hero because the hanging cord is visible.

### PL copy

**SPISAK STUDIO — Przestrzeń dla wielu historii.**

Spisak Studio to przestrzeń fotograficzna, której charakter zmienia się wraz ze światłem, aranżacją i rytmem sesji. W jednym wnętrzu powstały trzy odmienne nastroje: jasny, naturalny set, kameralna scena wieczorna oraz kontrastowa strefa editorialowa.

Moja praca obejmowała stworzenie głównej koncepcji aranżacji, podział przestrzeni na strefy, dobór mebli, kolorystyki oraz koncepcję oświetlenia. Vintage’owe formy, miękkie tekstylia i bogata roślinność pozwalają budować różnorodne opowieści wizualne przy zachowaniu jednej spójnej tożsamości studia.

Projekt pokazuje, jak za pomocą prostych środków aranżacyjnych można uczynić przestrzeń narzędziem kreatywnej pracy.

### EN copy

**SPISAK STUDIO — Spaces for Stories.**

Spisak Studio is a flexible creative space where photography and atmosphere shape one another. Natural light, vintage-inspired furnishings, layered textiles and botanical elements establish distinct shooting environments within a coherent visual identity.

My contribution focused on the overall interior styling concept, spatial zoning, furniture and colour selection, and a lighting concept supporting different photographic moods.

The studio demonstrates how thoughtful spatial styling can turn one interior into a versatile setting for visual storytelling.

### ES copy

**SPISAK STUDIO — Un espacio para historias.**

Spisak Studio es un espacio creativo y flexible para fotografía. La luz natural, el mobiliario de inspiración vintage, los textiles y la vegetación crean diferentes escenarios dentro de una identidad visual coherente.

Mi trabajo abarcó el concepto general de interiorismo, la zonificación, la selección de mobiliario y colores y el concepto de iluminación, con el fin de crear distintos ambientes para las sesiones fotográficas.

### SEO

PL title: `Spisak Studio Katowice | Projekt aranżacji studia fotograficznego — Art of Meaning`
EN title: `Spisak Studio Katowice | Creative Interior Concept — Art of Meaning`
ES title: `Spisak Studio Katowice | Concepto de interiorismo creativo — Art of Meaning`
PL description: `Autorska koncepcja aranżacji studia fotograficznego w Katowicach: strefy zdjęciowe, meble, kolor, roślinność i światło. Projekt Art of Meaning.`
EN description: `A creative photography studio interior in Katowice, shaped through flexible shooting zones, furniture, colour and atmospheric lighting.`
ES description: `Un estudio fotográfico creativo en Katowice: zonas flexibles, mobiliario, color e iluminación ambiental.`

## 2. PORTFOLIO COUTURE / FEATURED RANK

### IMPORTANT OBSERVATION ABOUT CURRENT CODE

In `site.js`, `interiorPreviewCards(items)` currently filters published projects and uses `published.slice(0,4)`. That makes "featured" equal to "first 4 rows" in `AOM.interiors`, not an intentional selection. The default list and filters are rendered by `renderInteriors()`.

Implement explicit `featuredRank` or `curatedRank` instead of relying on insertion order, and differentiate project status/feature tier using optional data fields. Keep `type: residential | commercial` as the functioning filter key unless refactoring all code + tests. Suggest `editorialGroup: signature | residential | creative | study` and `isStudy`, without hiding existing real projects.

**Proposed featured projects (first 4):**
1. `Midnight Garden` — signature / art-led concept. **Already in catalog**; hero reference.
2. `Puerto Banús Residence` — selected collaboration / completed space, accurate credit to NOVA KASYANOV. **Already in catalog**.
3. `Atmosphere-Driven Apartment` — full apartment concept / documentation / execution support; **not currently present in main branch as a published `AOM.interiors` entry**. Add from separate supplied assets/previous Codex brief; do NOT fabricate photos or mark completed. Until live, fall back to the next published work.
4. `Private Spa Bathroom` — residential design / implementation in progress. **Already in catalog**.

**Second-tier selected work:**
5. `Spisak Studio` — photographed creative-commercial interior / styling concept only; add with this package.

**Design studies gallery (clearly distinguished from projects):**
- Reception with a painted ceiling (`reception`)
- Illusionistic fresco (`fresco`)
- From darkness to a blue patio (`patio`)
- Living room study (`living`)
- Dressing room study (`dressing`)

Do not silently remove studies or transform them into completed client projects.

### What the brand should communicate

Current interior hero starts `Wnętrza, które opowiadają historie.` This is a good basis; reinforce the art-led value proposition with a short sentence, e.g.:
PL: `Łączę malarstwo i projektowanie wnętrz, tworząc przestrzenie o własnej tożsamości.`
EN: `I bring painting and interior design together to create spaces with a distinct identity.`
ES: `Uno pintura e interiorismo para crear espacios con una identidad propia.`

Keep Midnight Garden visually dominant. Add a discreet cross-link to the real hand-painted ceiling project `Ornamentalne Niebo` / `Ornamental Sky` in the murals portfolio. Do **not** claim entire interior design authorship for that real mural when only painted ceiling work is documented.

### Implementation pointers
- `catalog.js`: introduce optional curation fields + Spisak project data + PL/EN/ES fields.
- `site.js`: `interiorCard`, `interiorPreviewCards`, `renderInteriors`, `interiors`, `photographicProject` (shared); sort reliably and avoid regressions. Do not alter other project detail layouts unintentionally.
- `styles.css`: reusable scoped styles for creative case study, editorial 3-up sets and responsive curatorial headings.
- `wnetrza.html`: JS shell; don't hardcode content here. Keep `?lang=` handling and existing anchors, dialogs and contact routes.
- `README.md`: reflect new content only if site architecture or navigation changes.

Exact file links:
- https://github.com/magdababicka02-ship-it/PORTFOLIO_INTERIORS/blob/main/catalog.js
- https://github.com/magdababicka02-ship-it/PORTFOLIO_INTERIORS/blob/main/site.js
- https://github.com/magdababicka02-ship-it/PORTFOLIO_INTERIORS/blob/main/styles.css
- https://github.com/magdababicka02-ship-it/PORTFOLIO_INTERIORS/blob/main/wnetrza.html

## 3. PHOTOGRAPHIC INTEGRITY

Source photos are 600–720px wide, not professional high-resolution exports. Use restrained image widths, native sharpness and moderate JPG optimization. Do not invent realistic details via aggressive generative enhancement. If higher-res originals can be obtained, substitute them without changing path semantics. The original images are kept in `photos/` unchanged.

Use authentic image content. Minor tonal correction and moderate crop are okay, but do not alter the architecture or add/remove furniture.

## 4. ACCEPTANCE CHECKLIST

- [ ] Spisak Studio has its own correctly linked case-study page.
- [ ] Only claimed scope is styling concept, zones, furniture, color and lighting concept.
- [ ] The page displays genuine photography, without low-resolution full-screen stretching.
- [ ] Featured ordering is explicit and preserves filter/all behavior.
- [ ] Midnight Garden remains signature hero; Puerto Banús credited correctly.
- [ ] Design studies are distinct from commissioned or completed project work.
- [ ] PL / EN / ES all display correct content and labels.
- [ ] Desktop and mobile screenshots checked; no layout regression on existing projects.
- [ ] Alt text, headings, SEO titles, image loading, lightboxes and anchors verified.
- [ ] The website is not marked as updated until code is committed and deployed.

See the accompanying PDF for the intended editorial layout and image sequencing.
