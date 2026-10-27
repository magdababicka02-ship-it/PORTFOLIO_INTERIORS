# Art of Meaning

Statyczna witryna z pięcioma głównymi stronami i zachowanymi ścieżkami istniejących prac. HTML, CSS i Vanilla JavaScript; bez procesu budowania i bez zależności produkcyjnych.

## Uruchomienie

```sh
cd /workspace/PORTFOLIO_INTERIORS
python3 -m http.server 4173 --bind 0.0.0.0
```

Otwórz plik index.html przez serwer HTTP. Na własnym komputerze użyj adresu lokalnego serwera. Podglądy dla tego zadania są zapisane w folderze `previews`.

## Edycja

- `catalog.js`: prace i opisy PL/EN/ES (kolejno trzy elementy każdej tablicy językowej), pliki, wymiary, statusy, ceny w EUR, konfiguracja formularza oraz linki do social mediów. `null` oznacza brak potwierdzonych danych.
- `site.js`: wspólna nawigacja i stopka, treści, galerie, filmy, suwak i formularz.
- `midnight-garden.html`: podstrona projektu wnętrza. Opis PL/EN/ES, metryka, wizualizacje i porównanie są w obiekcie `project` wpisu Midnight Garden w `catalog.js`. Zachowano dotychczasowy identyfikator katalogowy `nocturne`; publiczna nazwa i adres to Midnight Garden oraz `midnight-garden.html`.
- `puerto-banus-residence.html`: fotograficzna podstrona Puerto Banús Residence. Zawiera 11 oryginalnych zdjęć, opis i zakres współpracy z zespołem NOVA KASYANOV w PL/EN/ES. Wpis jest w „Commercial” na prośbę właścicielki; jego typ merytoryczny pozostaje rezydencjalny. `project.kind: photography` wybiera układ zdjęciowy, a `sections[].visuals` definiuje galerie z powiększaniem. Pozostałe sześć wpisów portfolio zachowano.
- `private-spa-bathroom.html`: projekt w Gliwicach, przeniesiony do „Residential” zgodnie z najnowszym poleceniem właścicielki. Dedykowany renderer `privateSpaProject()` korzysta z `project.editorial`: koncepcja, materiały i światło, dyskretne zdjęcia istniejącego stanu, jedna plansza, zakres pracy i kontakt. Pięć rysunków dostępnych jest po rozwinięciu dokumentacji. Status: realizacja w toku. `project.completedPhotography: []` przygotowuje miejsce w danych na przyszłe zdjęcia, bez pustej galerii na stronie.
- `atmosphere-driven-apartment.html`: projekt mieszkania ok. 60 m² w Gliwicach, w „Residential”. Dedykowany `apartmentProject()` prowadzi od zatwierdzonej jasnej kuchni przez materiały, kuchnię i łazienkę, jedną planszę z oryginalnych rysunków, niewielkie zdjęcie stanu deweloperskiego i zakres do kontaktu. Status: koncepcja, opracowanie techniczne i Execution Support.
- `spisak-studio.html`: fotograficzna prezentacja studia w Katowicach, w „Commercial”. Dedykowany `spisakStudio()` ma układ magazynowy: przesunięte otwarcie, pionowy kadr okien, trzy sceny w różnych skalach, dwa detale i wkład autorki. Siedem oryginalnych zdjęć 600–720 px nie jest rozciąganych powyżej natywnej szerokości, również w oknie powiększenia. Zakres: koncepcja aranżacji, strefy, dobór mebli i kolorów, koncepcja oświetlenia, styling.
- `ceremonial-arrival.html`: trzy koncepcje holu w Marbelli, w „Residential / Studia projektowe”. Dedykowany `ceremonialArrival()` pokazuje duże ujęcie otwierające, równorzędny przesunięty tryptyk, poglądowy schemat relacji przestrzennych oraz zakres i współpracę. Rzut źródłowy jest opcjonalny, zwinięty i ograniczony do oryginalnych 352 px. Status i kredyt NOVA KASYANOV są widoczne.
- `the-space-between.html`: autorska koncepcja salonu z monumentalnym malowidłem sufitowym, w „Residential”, pierwszy projekt wiodący. Renderer `theSpaceBetween()` prowadzi przez pięć całych kadrów w kolejności 01 → 03 → 02 → 04 → 05: otwarcie, manifest, ekspozycja malowidła i cytat, perspektywa, pionowy detal materiałów, szerokie zamknięcie i kontakt. Teksty, SEO i alty pochodzą dokładnie z gotowego JSON PL/EN/ES; status nie sugeruje wykonania wnętrza lub malowidła.
- Kuratorska kolejność portfolio jest jawna: `featuredRank` i `curatedRank` w `catalog.js`. Pierwszy wyróżniony projekt to The Space Between, następnie Midnight Garden, Puerto Banús Residence, Atmosphere-Driven Apartment i Private Spa Bathroom. Spisak znajduje się niżej, w części kreatywnej. Ceremonial Arrival jest osobnym studium z podstroną, poniżej projektów wiodących; `editorialGroup: study` wyklucza je z części kreatywnej. Pięć wcześniejszych studiów pozostaje dostępnych przez „Zobacz całe portfolio” lub filtry. Pełna kolekcja ma dwanaście wpisów. Kolejność nie zależy od pozycji w tablicy.
- `i18n-es.js`: hiszpańskie teksty interfejsu, indeksowane angielskim tekstem wywołań `t()`. Po zmianie angielskiego tekstu należy zaktualizować odpowiadający mu klucz. Nazwy własne i oryginalne tytuły prac pozostają zachowane.
- `styles.css`: oryginalny Cinzel, lokalny Montserrat, granat #07172C i jasne tło #F3F0E9, układy responsywne.
- `assets/`: autentyczne materiały z przekazanych archiwów. Lokalnie hostowane fonty nie wymagają dostępu do Google Fonts.
- `assets/brand/`: cztery oryginalne PNG z archiwum logo. Wspólne nagłówki i stopki wyświetlają znak oraz oryginalne litery przez kadry SVG; pliki PNG pozostają nietknięte. Biały logotyp uzyskano filtrem CSS. Złoty wariant jest użyty w stopce Wnętrz. Ikona przeglądarki także pochodzi z dostarczonych plików.

Znak granatowy ma obwódkę białą 1 px, bez zmiany skali lub pliku źródłowego. Złota stopka Wnętrz i projektów korzysta z oryginalnego przezroczystego `brand-original.png` i nie ma już tła CSS. Zachowano dotychczasowy kadr SVG i proporcje. `brand-champagne-original.png` pozostaje w materiałach, lecz nie jest używany do tego wariantu stopki. Weryfikacja: `previews/brand-refinement-checks.json`; podglądy nagłówków i stopek: `previews/brand-*.png`.
- Projekty murali zaczynają się od lokalnego wideo; pełne filmy otwierają się w odtwarzaczu YouTube po kliknięciu. Każdy ma wersję lokalną do wyboru. ID filmów i adres playlist są w `catalog.js`; zamknięcie odtwarzacza usuwa iframe. W testach YouTube jest zastąpiony odpowiedzią testową, więc nie potwierdzają one odtwarzania przez zewnętrzny serwis.
- `PRZEGLAD-I-MATERIALY.md`: źródła i szczegółowa lista braków.

Język jest wybierany parametrem `?lang=pl` / `?lang=en` / `?lang=es`; przełącznik PL | EN | ES zachowuje ścieżkę, inne parametry i fragment. Główna galeria malarstwa zachowuje stary adres `obrazy-na-zamowienie.html`, a `malarstwo.html` jest aliasem.

Po zmianie `catalog.js`, `site.js`, `i18n-es.js` lub `styles.css` uruchom `node scripts/version-assets.cjs` i zapisz zmienione pliki HTML razem z zasobami. Skrypt dodaje do adresów skróty zawartości, aby przeglądarka pobrała nową wersję zamiast korzystać z wcześniej zapisanych skryptów i stylów. Nie wymaga zależności ani procesu budowania strony.

## Formularz

Formularz wysyła zapytanie przez HTTPS POST do FormSubmit dla `contact@artofmeaning.art`, bez otwierania programu pocztowego. Konfiguracja jest w `AOM.contact` w `catalog.js`. Nie ma klucza prywatnego w kodzie. Akceptacja wymaga poprawnej odpowiedzi HTTP oraz `success: true`; błąd, odmowa lub przekroczenie czasu zachowują treść formularza i udostępniają bezpośredni kontakt e-mail. Komunikat dotyczy przyjęcia przez usługę wysyłkową, nie gwarantuje odczytania ani dostarczenia do skrzynki.

### Jednorazowa aktywacja odbiorcy

1. Otwórz `kontakt.html?activate=1&lang=pl` na opublikowanej stronie.
2. W panelu aktywacji kliknij „Wyślij prośbę o aktywację”. To zwykły POST do usługi; nie wysyła się automatycznie po wejściu na stronę.
3. Otwórz skrzynkę `contact@artofmeaning.art` i potwierdź link aktywacyjny od FormSubmit. Sprawdź również folder spam.
4. Wyślij własne zgłoszenie przez normalny formularz i potwierdź odbiór w skrzynce. Dopiero wtedy można potwierdzić działanie całej drogi dostarczenia i zmienić dokumentacyjne pole `activationConfirmed` na `true`.

Testy automatyczne przechwytują żądania do usługi i nie wysyłają wiadomości ani próśb aktywacyjnych. Aktywacja i faktyczny odbiór poczty pozostają do wykonania przez właścicielkę skrzynki.

## Weryfikacja

Testy można powtórzyć przy uruchomionym serwerze. Wymagają Playwright i Chromium (nie są zależnościami produkcyjnymi):

```sh
CHROMIUM_PATH=/usr/bin/chromium node scripts/check.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-extra.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-content.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-languages.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-midnight-garden.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-puerto-banus.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-private-spa.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-atmosphere-apartment.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-spisak-studio.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-ceremonial-arrival.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-the-space-between.cjs
```

Opcjonalny `AOM_BASE_URL` pozwala wskazać inny adres serwera.

`previews/checks.json` zawiera wyniki kontroli przeglądarkowej: pięć stron × trzy języki × dwa rozmiary, obrazki, linki lokalne, galerie i filtry, odtwarzanie filmów, menu, suwak, okna dialogowe i formularz. Scenariusze formularza obejmują zaakceptowanie POST, odmowę HTTP i błąd połączenia, z przechwyceniem usługi. Dodatkowy test treści porównuje pełne polskie opisy i autentyczne opinie z utrwalonym eksportem, sprawdza SOLD, nowe wymiary, biały logotyp, brak dawnych formularzy oraz panel aktywacji bez jego wysyłania. Test językowy sprawdza wszystkie 29 podstron po hiszpańsku na telefonie i komputerze, zachowanie adresu przy zmianie języka, nowy portret i tekst sekcji artystki, okładkę kota oraz komunikaty formularza ES. `previews` zawiera zrzuty desktop/telefon. Brama sieciowa nie pozwala tutaj potwierdzić dostępności strony źródłowej i usługi wysyłkowej.

Wyniki testu Midnight Garden są w `previews/midnight-garden-checks.json`. Test sprawdza przejście z kafla do podstrony, trzy języki, 15 kombinacji szerokości i języka, powiększanie obrazów, suwak, metrykę i odnośniki kontaktowe.

Oryginalne PNG i PDF Midnight Garden są zachowane w `archive/midnight-garden-originals/`, wykluczonym z publikacji. Strona używa pełnowymiarowych, bezstratnych WebP; po konwersji sprawdzono zgodność każdego piksela z PNG. Ujęcie 2 pokazuje wariant bez malowidła, a 1 z malowidłem. Suwak prezentuje studium koncepcyjne.

Oba suwaki — na stronie Wnętrza i podstronie Midnight Garden — pokazują całe pomieszczenie w oryginalnych proporcjach 2400:1792, zgodnie z drugim zrzutem referencyjnym właścicielki. Nie kadrują porównania do samego sufitu.

Wariant „przed” zaktualizowano z nowej paczki „MIDNIGHT_GARDEN_2_new.rar” (plik `2.png`). Publikowany plik `before-refined.webp` zachowuje wszystkie piksele i pełne wymiary oryginału; nowa ścieżka zapobiega wyświetlaniu starego obrazu z pamięci podręcznej. Nowy oryginał zachowano jako `archive/midnight-garden-originals/before-refined.png`, a poprzedni plik pozostawiono w archiwum. Wariant „po” i pozostałe materiały nie zmieniły się.

Zdjęcia Puerto Banús są w `assets/images/puerto-banus/`, z oryginalną rozdzielczością i bajtami JPEG (pliki JFIF otrzymały rozszerzenie `.jpg`). PDF źródłowy zachowano w `archive/puerto-banus-originals/source-guide.pdf`. Opis PL/EN pochodzi z przekazanego dokumentu, ES jest tłumaczeniem. Nie dopisano roku, nazwiska fotografa ani autorstwa widocznych dzieł sztuki. Dokument służy jako materiał źródłowy; sugerowany adres domenowy i instrukcje publikacyjne nie zastępują poleceń właścicielki. Wyniki testów nowej podstrony: `previews/puerto-banus-checks.json`, podglądy: `previews/puerto-banus-{desktop,mobile}.png`.

Do uzupełnienia pozostają materiały z raportu oraz aktywacja skrzynki i weryfikacja odbioru formularza. Polityka prywatności wymaga przeglądu właścicielki. Kopia poprzedniego szablonu w `archive` służy wyłącznie do porównania i jest wykluczona z publikacji przez `_config.yml`.

Private Spa Bathroom: dziewięć plików z `assets.rar` opublikowano w `assets/images/private-spa-bathroom/`, bez zmiany bajtów, rozdzielczości i proporcji. Plansza PDF jest w `assets/documents/private-spa-bathroom-board.pdf`. Materiałami źródłowymi są `project-content.json`, `CODEX_README.md`, oryginalne obrazy i jednostronicowa plansza; dokumenty opisowe zachowano w `archive/private-spa-bathroom-originals/`. Załącznik `Private_Spa_Bathroom_Codex_Presentation_v2.pdf` przekroczył limit transferu 32 MiB i nie został odczytany. Nie zastąpiono go wymyślonymi danymi. Treści PL/EN/ES opracowano na podstawie dostępnych faktów i wizualizacji; nie dodano daty zakończenia, metrażu, marek ani brakujących zdjęć gotowej realizacji. Uproszczony schemat jest wyłącznie na oryginalnej planszy, opisany jako objaśnienie; nie tworzono nowej geometrii ani wymiarów. Oryginalne fragmenty dokumentacji zachowują polskie oznaczenia.

Atmosphere-Driven Apartment: dziewięć oryginalnych JPEG z paczki ZIP zachowano bez zmiany bajtów w `assets/images/atmosphere-driven-apartment/`. Hero i kuchnia w galerii używają wyłącznie `01_approved_kitchen_white_wood_dark_stone.jpg`; kadry materiałów pochodzą z zatwierdzonej koncepcji. Rzut i fragment zabudowy tworzą jedną kompozycję HTML z osobnymi powiększeniami, bez przerysowania geometrii. Dodatkowy rysunek koordynacji jest zwinięty. Zdjęcie stanu deweloperskiego pozostaje oryginalnym kolażem. Nie dodano zdjęć salonu, sypialni ani ukończonej realizacji. `completedPhotography: []` nie generuje publicznego placeholdera. Opisy i fakty PL/EN/ES pochodzą z przekazanego briefu. PDF w ZIP i osobny PDF są identyczne (SHA-256), więc zachowano jedną kopię wraz z briefem w `archive/atmosphere-driven-apartment-originals/`, poza Pages. Przekazane dokumenty służą jako materiał projektowy; przykładowe menu z „ABOUT” w planszy nie zastępuje zatwierdzonej nawigacji witryny. Podglądy: `previews/atmosphere-apartment-{desktop,mobile}.png`; raport: `previews/atmosphere-apartment-checks.json`.

Spisak Studio: oryginalne JPEG są w `assets/images/spisak-studio/`, z identycznymi bajtami, proporcjami i rozdzielczością jak w paczce. PDF w ZIP i osobny PDF są identyczne; jeden oryginał, README i manifest zachowano w `archive/spisak-studio-originals/`, poza publikacją. Zdjęcie ogólne ma 600 × 588 px, dlatego otwarcie korzysta z całego kadru w ograniczonej skali zamiast tworzyć pozorną panoramę. Ujęcie z przewodem pozostaje małym detalem i nie zostało retuszowane. Nie przypisano projektantce przebudowy architektury, dokumentacji lub wykonawstwa. Nie skopiowano nieaktualnej uwagi briefu, że Atmosphere-Driven Apartment jeszcze nie istnieje — projekt był już opublikowany. Pozostałe cztery podstrony zachowują własne układy; 24 porównania ich głównej treści przed i po zmianie dały identyczny HTML. Podglądy: `previews/spisak-studio-{desktop,mobile}.png`. Raporty: `previews/spisak-studio-checks.json`, `previews/spisak-preservation-checks.json`.

Ceremonial Arrival: trzy oryginalne wizualizacje, dwa identyczne osobne PDF i PDF z paczki zachowano jako jeden zestaw źródeł w `archive/ceremonial-arrival-originals/`, poza publikacją. Witryna korzysta z dostarczonych WebP i PNG, skopiowanych bez zmiany bajtów do `assets/images/ceremonial-arrival/`; nie wykonywano retuszu, przerysowania ani ponownej konwersji. Schemat jest dostarczonym diagramem poglądowym, opisanym jako bez skali i niewykonawczy. Mały oryginał ma 352 × 217 px i nie jest powiększany. Treść PL/EN/ES opiera się na briefie: koncepcje dla NOVA KASYANOV, prywatna rezydencja, trzy alternatywne propozycje. Nie sugeruje wybudowania wnętrza, autorstwa całej architektury ani oficjalnej współpracy z Versace; nie dodano logotypu tej marki. Status koncepcyjny i właściwy kredyt są częścią prezentacji. Podglądy: `previews/ceremonial-arrival-{desktop,mobile}.png`. Raporty: `previews/ceremonial-arrival-checks.json`, `previews/ceremonial-preservation-checks.json`.

The Space Between: źródłem jest `The_Space_Between_Codex_Light.zip`. Pięć dostarczonych WebP skopiowano bez zmiany bajtów do `assets/images/the-space-between/`; sumy kontrolne są w `archive/the-space-between-originals/web-integrity.json`. Lekka paczka nie zawiera oryginalnych PNG, mimo referencji w manifeście; nie rekonstruowano ich i nie weryfikowano nieobecnych plików. Oryginalny JSON PL/EN/ES, README, CODEX_TASK, manifest i briefing PDF zachowano w archiwum wyłączonym z Pages. Nie zmieniono aranżacji, kolorów ani malowidła. Podglądy: `previews/the-space-between-{desktop,mobile}.png`; testy: `previews/the-space-between-checks.json`.
