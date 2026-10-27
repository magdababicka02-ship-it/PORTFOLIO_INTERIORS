# CODEX — PROJEKT THE SPACE BETWEEN / ART-LED RESIDENTIAL CONCEPT

## DO WYKONANIA
Dodaj nowy, samodzielny case study do istniejącego repozytorium `magdababicka02-ship-it/PORTFOLIO_INTERIORS`.
To jest zadanie implementacyjne dla istniejącej strony, NIE zadanie ponownego generowania grafik.
Nie wykonuj zmian w GitHub poza gałęzią repozytorium użytkowniczki wybraną przez Codex; zacznij od sprawdzenia bieżącej struktury i stanu roboczego.

## DOKŁADNY KONTEKST OBECNEJ STRONY (sprawdzony w repo)
- Strona jest HTML + CSS + vanilla JS, bez bundlera.
- `catalog.js`: katalog projektów, treści PL/EN/ES, rankingi kuratorskie `featuredRank` / `curatedRank`.
- `site.js`: renderery i i18n; `i18n-es.js`: warstwa ES.
- `styles.css`: `--navy:#07172c`, `--cream:#f3f0e9`, `--gold:#e0b255`, Cinzel (nagłówki), Montserrat (treść).
- Statyczne podstrony mają `<body data-page="project:...">`, szczegóły dokumentowane w `README.md`.
- `scripts/version-assets.cjs` aktualizuje cache-busting, obowiązkowy po zmianie katalogu/skryptu/stylu.
- Punkty odniesienia: `midnight-garden.html`, `ceremonial-arrival.html`, `private-spa-bathroom.html`, `spisak-studio.html`.
- Jeśli struktura projektu zmieniła się od powstania paczki, dostosuj implementację do aktualnego kodu zamiast na siłę wprowadzać stare selektory.

## TOŻSAMOŚĆ I UCZCIWOŚĆ
- Tytuł publiczny: `The Space Between`; polska wersja `Przestrzeń pomiędzy`.
- Podtytuł: `A Monumental Fresco in Dialogue with Architecture`.
- Kategoria: `Residential · Concept study` / `Wnętrza prywatne · Studium koncepcyjne`.
- Kredyt: `Art of Meaning · Magdalena Babicka`.
- Status: K O N C E P C J A / Concept study. Nie podawaj lokalizacji ani metrażu; nie zostały potwierdzone.
- Nie opisywać fresku jako namalowanego w rzeczywistości, nie używać realizacyjnych zdjęć typu 'completed photograph'.
- Bez przypisywania osobom trzecim autorstwa lub marek mebli. Bez dopisywania dokumentacji wykonawczej, nadzoru, daty realizacji.

## OBOWIĄZKOWA SEKWENCJA ART DIRECTION

01  OPENING / IMAGE 01
Pełnoszerokie ujęcie salonu `01_hero_master.webp`. Wysoka jakość wierności, wyeksponowany sufit.
Zastosuj kompozycję z dużym oddechem. Może być hero edge-to-edge w obrębie obecnego layoutu z dyskretną etykietą `RESIDENTIAL / CONCEPT STUDY` oraz tytułem umieszczonym poza najważniejszą częścią fresku. Nie zakrywaj malowanych postaci typografią.

02  TITLE + MANIFESTO
Asymetryczny dwukolumnowy blok. Po lewej elegancki serif, po prawej `heroLead` i `intro` z JSON.
Oszczędna typografia, dużo przestrzeni, cienki złoty separator. Użyj tylko istniejących brand tokens.

03  FRESCO / IMAGE 03
Duży poziomy detal `03_fresco_detail.webp`, pokazujący gest dłoni i fakturę malowidła.
Obok lub poniżej duży cytat `statement`, a następnie `artSectionTitle` i `artSection`.
Bez kolaży stockowych i bez ikon ozdobnych. Ten kadr ma działać jak ekspozycja dzieła sztuki.

04  ARCHITECTURAL PERSPECTIVE / IMAGE 02
Bardzo duży poziomy kadr `02_editorial_perspective.webp`, od strony okien, jako oddzielny oddech wizualny.
Nie wstawiaj pięciu obrazów w równą galerię o identycznych wymiarach.

05  MATERIAL STUDY / IMAGE 04
Asymetryczna sekcja: pionowy portret `04_material_detail.webp` obok krótkiego tekstu `materialsTitle` i `materials`.
Nie powiększaj portretu na viewport pełnej szerokości; zdjęcie ma zachować naturalne proporcje.

06  FINAL IMPRESSION / IMAGE 05
Szeroki kadr zamykający `05_second_hero.webp`, po nim `closingTitle` / `closing`.
CTA do aktualnego `kontakt.html`, linki powrotu do portfolio i powiązane projekty tylko jeśli już obsługuje to wzorzec strony.

## ZASADY KADROWANIA
- Zachowaj pięć zatwierdzonych obrazów. Nie przepuszczaj ich przez AI ani filtry (brak dodatkowych kontrastów, saturacji, wyostrzania).
- Hero, szerokie kadry i detal malowidła powinny używać `object-fit:contain` albo rzeczywistego `<img>` bez kadrowania, gdy crop ucina ręce, stopy lub ornamenty. Do lekkiego cropu tylko jawnie bezpieczne obszary.
- Pionowy detal zachowuje własne proporcje (1649 × 2048) na desktopie i mobile.
- Użyj WebP z `assets/web`, a oryginalne PNG zachowaj w archiwum źródłowym niepublikowanym przez GitHub Pages tylko jeśli obecna konfiguracja potrafi je wykluczyć. Jeśli nie: nie publikuj kopii oryginałów w webroot i trzymaj je poza repo / dedykowanym archiwum.
- `loading="eager"` oraz `fetchpriority="high"` dla hero, pozostałe obrazy lazy + jawne width/height + alt PL/EN/ES.

## KURATORSKA KOLEJNOŚĆ PROJEKTÓW
Ten projekt jest strategicznie flagowy dla połączenia sztuki i architektury; pokaż go wysoko na stronie `wnetrza.html`.
Propozycja: The Space Between jako 1. wizualny projekt wyróżniony, Midnight Garden jako 2., Puerto Banús Residence jako 3. Dostosuj pole `featuredRank`/`curatedRank` do bieżącej logiki i zachowaj pozostałe wpisy bez przypadkowego przetasowania.
Nazwij typ projektu w karcie `CONCEPT STUDY`, aby nie sugerować realizacji.

## IMPLEMENTACJA
1. Sprawdź aktualne dane i renderery; nie nadpisuj istniejących projektów.
2. Dodaj `the-space-between.html` z właściwym `data-page` i metadanymi SEO / OpenGraph.
3. Dodaj wpis do `catalog.js` z kluczem `the-space-between`; pełny copy PL/EN/ES z `content/project-content.pl-en-es.json`.
4. Dodaj komponent/renderowanie tylko tam, gdzie nie wystarcza istniejący szablon. Nie kopiuj przypadkowo wszystkich sekcji innych projektów. Wspólna nawigacja / stopka muszą pozostać identyczne.
5. Załaduj obrazy z `assets/web`, zachowując ścieżki i mapping z `asset-manifest.json`.
6. Kontrast, typografia, mobile i dostępność jak w istniejącej marce.
7. Dodaj kartę do katalogu, nie zastępuj już działających projektów.
8. Zaktualizuj ES w istniejącej architekturze i18n.
9. Uruchom `node scripts/version-assets.cjs`.
10. Przetestuj PL / EN / ES w widokach 375 / 768 / 1440 / 1920 px; brak błędów obrazów, brak overflow i prawidłowe linki.

## AKCEPTACJA
[ ] Projekt widoczny w katalogu i ma własną działającą podstronę.
[ ] Wszystkie pięć obrazów użyte we właściwej kolejności, bez zastępowania ich generowanymi wersjami.
[ ] Brak przyciętych rąk / głów na detalu fresku.
[ ] Układ inny niż inne case studies: hero + art exposition + różne skale zdjęć, nie zwykła siatka.
[ ] Treść/alt/SEO działają dla PL / EN / ES.
[ ] Wszędzie jasno wskazany status koncepcyjny; żadnych fikcyjnych danych realizacyjnych.
[ ] Nagłówek, logo, stopka, granat, złoto, Cinzel/Montserrat pozostają w dotychczasowym brandzie.
[ ] Responsive i Core Web Vitals: minimalizacja CLS (wymiary obrazów), bez błędów konsoli.
[ ] Pozostałe projekty i strony nie mają regresji.

## MAKSYMALNE OGRANICZENIE TWÓRCZE
Nie generuj nowych grafik, nie przekształcaj fresku, nie dodawaj mebli ani dekoracji. Nie kopiuj interfejsu widocznego na poprzedniej niezależnej planszy-mockupie: jest tylko poglądowy. Źródło design systemu jest w aktualnym repo.
