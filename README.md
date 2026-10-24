# Art of Meaning

Statyczna witryna z pięcioma głównymi stronami i zachowanymi ścieżkami istniejących prac. HTML, CSS i Vanilla JavaScript; bez procesu budowania i bez zależności produkcyjnych.

## Uruchomienie

```sh
cd /workspace/PORTFOLIO_INTERIORS
python3 -m http.server 4173 --bind 0.0.0.0
```

Otwórz plik index.html przez serwer HTTP. Na własnym komputerze użyj adresu lokalnego serwera. Podglądy dla tego zadania są zapisane w folderze `previews`.

## Edycja

- `catalog.js`: prace, opisy PL/EN, pliki, wymiary, statusy, ceny oraz linki do oryginalnych formularzy i social mediów. `null` oznacza brak potwierdzonych danych.
- `site.js`: wspólna nawigacja i stopka, treści PL/EN, galerie, filmy, suwak i formularz.
- `styles.css`: oryginalny Cinzel, lokalny Montserrat, granat #07172C i jasne tło #F3F0E9, układy responsywne.
- `assets/`: autentyczne materiały z przekazanych archiwów. Lokalnie hostowane fonty nie wymagają dostępu do Google Fonts.
- `PRZEGLAD-I-MATERIALY.md`: źródła i szczegółowa lista braków.

Język jest wybierany parametrem `?lang=pl` / `?lang=en`; przełącznik zachowuje ścieżkę, inne parametry i fragment. Główna galeria malarstwa zachowuje stary adres `obrazy-na-zamowienie.html`, a `malarstwo.html` jest aliasem.

## Formularz

Formularz kontaktowy przygotowuje wiadomość `mailto:contact@artofmeaning.art`, którą użytkownik sam wysyła z programu pocztowego. Nie symuluje dostarczenia ani nie wysyła danych do nieuzgodnionego backendu. Dostępne są też oryginalne linki Tally. Bezpośrednia wysyłka z tego układu wymaga endpointu; odbiorca powiadomień Tally nie wynika z eksportu.

## Weryfikacja

Testy można powtórzyć przy uruchomionym serwerze. Wymagają Playwright i Chromium (nie są zależnościami produkcyjnymi):

```sh
CHROMIUM_PATH=/usr/bin/chromium node scripts/check.cjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/check-extra.cjs
```

Opcjonalny `AOM_BASE_URL` pozwala wskazać inny adres serwera.

`previews/checks.json` zawiera wyniki kontroli przeglądarkowej: pięć stron × dwa języki × dwa rozmiary, obrazki, linki lokalne, galerie i filtry, odtwarzanie filmów, menu, suwak, okna dialogowe i formularz. `previews` zawiera zrzuty desktop/telefon. Linki zewnętrzne zachowano z oryginalnych źródeł, ale brama sieciowa nie pozwala potwierdzić ich bieżącej dostępności.

Przed publikacją uzupełnij braki z raportu, uzgodnij sposób wysyłki formularza i sprawdź politykę prywatności. Kopia poprzedniego szablonu w `archive` służy wyłącznie do porównania i nie powinna być publikowana.
