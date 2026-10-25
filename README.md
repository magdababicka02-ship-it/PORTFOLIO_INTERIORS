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
- `private-spa-bathroom.html`: projekt w Gliwicach, w „Commercial” zgodnie z poleceniem właścicielki. `project.kind: study` wybiera układ studium projektowego: wizualizacja, opis, zdjęcia istniejącego stanu, plansza z PDF, pięć oryginalnych rysunków z powiększaniem, materiały i zakres pracy. Status: realizacja w toku; bez oznaczania renderu jako ukończonego wnętrza. Galeria pokazuje teraz trzy gotowe podstrony od razu i zachowuje wszystkie osiem wpisów po rozwinięciu.
- `i18n-es.js`: hiszpańskie teksty interfejsu, indeksowane angielskim tekstem wywołań `t()`. Po zmianie angielskiego tekstu należy zaktualizować odpowiadający mu klucz. Nazwy własne i oryginalne tytuły prac pozostają zachowane.
- `styles.css`: oryginalny Cinzel, lokalny Montserrat, granat #07172C i jasne tło #F3F0E9, układy responsywne.
- `assets/`: autentyczne materiały z przekazanych archiwów. Lokalnie hostowane fonty nie wymagają dostępu do Google Fonts.
- `assets/brand/`: cztery oryginalne PNG z archiwum logo. Wspólne nagłówki i stopki wyświetlają znak oraz oryginalne litery przez kadry SVG; pliki PNG pozostają nietknięte. Biały logotyp uzyskano filtrem CSS. Złoty wariant jest użyty w stopce Wnętrz. Ikona przeglądarki także pochodzi z dostarczonych plików.
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
```

Opcjonalny `AOM_BASE_URL` pozwala wskazać inny adres serwera.

`previews/checks.json` zawiera wyniki kontroli przeglądarkowej: pięć stron × trzy języki × dwa rozmiary, obrazki, linki lokalne, galerie i filtry, odtwarzanie filmów, menu, suwak, okna dialogowe i formularz. Scenariusze formularza obejmują zaakceptowanie POST, odmowę HTTP i błąd połączenia, z przechwyceniem usługi. Dodatkowy test treści porównuje pełne polskie opisy i autentyczne opinie z utrwalonym eksportem, sprawdza SOLD, nowe wymiary, biały logotyp, brak dawnych formularzy oraz panel aktywacji bez jego wysyłania. Test językowy sprawdza wszystkie 25 podstron po hiszpańsku na telefonie i komputerze, zachowanie adresu przy zmianie języka, nowy portret i tekst sekcji artystki, okładkę kota oraz komunikaty formularza ES. `previews` zawiera zrzuty desktop/telefon. Brama sieciowa nie pozwala tutaj potwierdzić dostępności strony źródłowej i usługi wysyłkowej.

Wyniki testu Midnight Garden są w `previews/midnight-garden-checks.json`. Test sprawdza przejście z kafla do podstrony, trzy języki, 15 kombinacji szerokości i języka, powiększanie obrazów, suwak, metrykę i odnośniki kontaktowe.

Oryginalne PNG i PDF Midnight Garden są zachowane w `archive/midnight-garden-originals/`, wykluczonym z publikacji. Strona używa pełnowymiarowych, bezstratnych WebP; po konwersji sprawdzono zgodność każdego piksela z PNG. Ujęcie 2 pokazuje wariant bez malowidła, a 1 z malowidłem. Suwak prezentuje studium koncepcyjne.

Oba suwaki — na stronie Wnętrza i podstronie Midnight Garden — pokazują całe pomieszczenie w oryginalnych proporcjach 2400:1792, zgodnie z drugim zrzutem referencyjnym właścicielki. Nie kadrują porównania do samego sufitu.

Wariant „przed” zaktualizowano z nowej paczki „MIDNIGHT_GARDEN_2_new.rar” (plik `2.png`). Publikowany plik `before-refined.webp` zachowuje wszystkie piksele i pełne wymiary oryginału; nowa ścieżka zapobiega wyświetlaniu starego obrazu z pamięci podręcznej. Nowy oryginał zachowano jako `archive/midnight-garden-originals/before-refined.png`, a poprzedni plik pozostawiono w archiwum. Wariant „po” i pozostałe materiały nie zmieniły się.

Zdjęcia Puerto Banús są w `assets/images/puerto-banus/`, z oryginalną rozdzielczością i bajtami JPEG (pliki JFIF otrzymały rozszerzenie `.jpg`). PDF źródłowy zachowano w `archive/puerto-banus-originals/source-guide.pdf`. Opis PL/EN pochodzi z przekazanego dokumentu, ES jest tłumaczeniem. Nie dopisano roku, nazwiska fotografa ani autorstwa widocznych dzieł sztuki. Dokument służy jako materiał źródłowy; sugerowany adres domenowy i instrukcje publikacyjne nie zastępują poleceń właścicielki. Wyniki testów nowej podstrony: `previews/puerto-banus-checks.json`, podglądy: `previews/puerto-banus-{desktop,mobile}.png`.

Do uzupełnienia pozostają materiały z raportu oraz aktywacja skrzynki i weryfikacja odbioru formularza. Polityka prywatności wymaga przeglądu właścicielki. Kopia poprzedniego szablonu w `archive` służy wyłącznie do porównania i jest wykluczona z publikacji przez `_config.yml`.

Private Spa Bathroom: dziewięć plików z `assets.rar` opublikowano w `assets/images/private-spa-bathroom/`, bez zmiany bajtów, rozdzielczości i proporcji. Plansza PDF jest w `assets/documents/private-spa-bathroom-board.pdf`. Materiałami źródłowymi są `project-content.json`, `CODEX_README.md`, oryginalne obrazy i jednostronicowa plansza; dokumenty opisowe zachowano w `archive/private-spa-bathroom-originals/`. Załącznik `Private_Spa_Bathroom_Codex_Presentation_v2.pdf` przekroczył limit transferu 32 MiB i nie został odczytany. Nie zastąpiono go wymyślonymi danymi. Treści PL/EN/ES opracowano na podstawie dostępnych faktów i wizualizacji; nie dodano daty zakończenia, metrażu, marek ani brakujących zdjęć gotowej realizacji. Uproszczony schemat jest wyłącznie na oryginalnej planszy, opisany jako objaśnienie; nie tworzono nowej geometrii ani wymiarów. Oryginalne fragmenty dokumentacji zachowują polskie oznaczenia.
