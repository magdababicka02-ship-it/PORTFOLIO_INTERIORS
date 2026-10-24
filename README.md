# Art of Meaning

Statyczna witryna z pięcioma głównymi stronami i zachowanymi ścieżkami istniejących prac. HTML, CSS i Vanilla JavaScript; bez procesu budowania i bez zależności produkcyjnych.

## Uruchomienie

```sh
cd /workspace/PORTFOLIO_INTERIORS
python3 -m http.server 4173 --bind 0.0.0.0
```

Otwórz plik index.html przez serwer HTTP. Na własnym komputerze użyj adresu lokalnego serwera. Podglądy dla tego zadania są zapisane w folderze `previews`.

## Edycja

- `catalog.js`: prace, opisy PL/EN, pliki, wymiary, statusy, ceny w EUR, konfiguracja formularza oraz linki do social mediów. `null` oznacza brak potwierdzonych danych.
- `site.js`: wspólna nawigacja i stopka, treści PL/EN, galerie, filmy, suwak i formularz.
- `styles.css`: oryginalny Cinzel, lokalny Montserrat, granat #07172C i jasne tło #F3F0E9, układy responsywne.
- `assets/`: autentyczne materiały z przekazanych archiwów. Lokalnie hostowane fonty nie wymagają dostępu do Google Fonts.
- Projekty murali zaczynają się od lokalnego wideo; pełne filmy otwierają się w odtwarzaczu YouTube po kliknięciu. Każdy ma wersję lokalną do wyboru. ID filmów i adres playlist są w `catalog.js`; zamknięcie odtwarzacza usuwa iframe. W testach YouTube jest zastąpiony odpowiedzią testową, więc nie potwierdzają one odtwarzania przez zewnętrzny serwis.
- `PRZEGLAD-I-MATERIALY.md`: źródła i szczegółowa lista braków.

Język jest wybierany parametrem `?lang=pl` / `?lang=en`; przełącznik zachowuje ścieżkę, inne parametry i fragment. Główna galeria malarstwa zachowuje stary adres `obrazy-na-zamowienie.html`, a `malarstwo.html` jest aliasem.

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
```

Opcjonalny `AOM_BASE_URL` pozwala wskazać inny adres serwera.

`previews/checks.json` zawiera wyniki kontroli przeglądarkowej: pięć stron × dwa języki × dwa rozmiary, obrazki, linki lokalne, galerie i filtry, odtwarzanie filmów, menu, suwak, okna dialogowe i formularz. Scenariusze formularza obejmują zaakceptowanie POST, odmowę HTTP i błąd połączenia, z przechwyceniem usługi. Dodatkowy test treści porównuje pełne polskie opisy i autentyczne opinie z utrwalonym eksportem, sprawdza SOLD, nowe wymiary, biały logotyp, brak dawnych formularzy oraz panel aktywacji bez jego wysyłania. `previews` zawiera zrzuty desktop/telefon. Brama sieciowa nie pozwala tutaj potwierdzić dostępności strony źródłowej i usługi wysyłkowej.

Do uzupełnienia pozostają materiały z raportu oraz aktywacja skrzynki i weryfikacja odbioru formularza. Polityka prywatności wymaga przeglądu właścicielki. Kopia poprzedniego szablonu w `archive` służy wyłącznie do porównania i jest wykluczona z publikacji przez `_config.yml`.
