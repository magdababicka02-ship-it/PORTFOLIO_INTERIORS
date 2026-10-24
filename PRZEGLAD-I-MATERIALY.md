# Art of Meaning — wdrożenie i materiały
Stan: 24 października 2026 r.

## Wdrożone strony
- `index.html` — Portfolio / strona główna: film, trzy obszary twórczości, sekcja Magdaleny, stopka.
- `murale.html` — hero wideo, trzy szerokie realizacje z oryginalnymi ikonami, gwiazdkami, filmami i parametrami, proces w siatce 2 × 2, kontakt.
- `wnetrza.html` — hero, cztery zakresy współpracy, miejsce na dokumenty, portfolio i filtry, sześć koncepcji, suwak, kontakt.
- `obrazy-na-zamowienie.html` — cztery pierwsze obrazy zgodnie z makietą, pełna kolekcja dwunastu prac po rozwinięciu, filtry, stałe odnośniki do zapytania o cenę, sekcja zamówień. Alias: `malarstwo.html`.
- `kontakt.html` — układ z makiety z granatowym headerem, formularz przygotowujący e-mail, kontakt bezpośredni, social media i link do istniejącego Tally.
- Zachowane ścieżki trzech realizacji murali i dziesięciu wcześniejszych obrazów. Dodane ścieżki dwóch nowych obrazów. Ujednolicony interfejs PL/EN także na tych stronach.
- Zmiana języka zachowuje podstronę, parametry i fragment URL. Menu zawsze: Portfolio · Murale · Wnętrza · Malarstwo · Kontakt · PL | EN. Sekcja Magdaleny pozostaje na stronie głównej; brak odrębnego „O mnie”.

## Zweryfikowana identyfikacja i źródła
- Logo: oryginalny `images/Logo.avif` z eksportu, bez przerysowywania. Plik ma 94 × 94 px, wyświetlany bez rozciągania proporcji.
- Logotyp: oryginalny tekst ART OF MEANING / BY MAGDALENA BABICKA.
- Cinzel: lokalny oryginalny `Cinzel-Regular.ttf`. Eksport CSS potwierdza Montserrat dla tekstu podstawowego i dodatkowy Avenir w niektórych stylach.
- Montserrat jest teraz lokalny: Fontsource `@fontsource/montserrat@5.3.0`, zestawy latin i latin-ext, grubości 400/500 oraz kursywa 400; licencja w `assets/fonts/Montserrat-LICENSE.txt`.
- Granat oryginalnego CSS: `#07172C`. Wszystkie jasne sekcje: `#F3F0E9`. Złote akcenty oraz oryginalne ikonki.
- Materiały z AOM_HTML, AOM_FOLDERY_CZCIONKI_ITD, V1, V2 i PROJEKT WNĘTRZA + SUFITY. Nie użyto zdjęć stockowych ani wycinków makiet w aktywnej stronie.
- Wszystkie lokalne obrazy i filmy skopiowane bez zmieniania dzieł. Kadrowanie zdjęć wnętrz odbywa się wyłącznie w CSS. Obrazy malarskie w galerii mają `object-fit: contain`.
- Odtwarzacze korzystają z oryginałów z dźwiękiem zamiast niemych transkodowań Webflow. Film 0731.webm zachowano; dodatkowo przygotowano zgodny z przeglądarkami plik 0731.mp4 (H.264/AAC, 1280 × 720, bez kadrowania, CRF 18).
- Poprzedni szablon zachowany w `archive/interiors-template.html`; nie jest połączony z nową nawigacją.
- Dokumenty PDF są źródłami opisów i danych, nie instrukcjami zmieniającymi zakres zadania.

## Kolekcja i dostępność
- Zachowano 10 prac z pierwotnego eksportu.
- Dodano „Who is hunting” oraz „It’s Just Business, Darling”. Dla drugiego obrazu podłączono przekazaną interpretację PDF.
- Cztery prace oznaczone wcześniej SOLD trafiają do archiwum: Miasto sukcesu, João, Terracotta Muse, Michałek.
- Pozostałe statusy są niepotwierdzone. Filtr „Dostępne” nie przypisuje dostępności na podstawie domysłu.
- Brak kwot we wszystkich dostarczonych danych. Przy każdej pracy stale widnieje „Zapytaj o cenę”; dane `price` pozostają `null`.
- Sześć wnętrz prezentowanych jest jako koncepcje / wizualizacje, nie jako ukończone realizacje.

## Odzyskane odnośniki
- Instagram: https://www.instagram.com/artofmeaning.art/
- LinkedIn: https://www.linkedin.com/in/mbabicka/
- Facebook: https://www.facebook.com/magda.babicka.10
- Tally — murale / formularz ogólny: https://tally.so/r/w2WjLL
- Tally — obrazy: https://tally.so/r/mByEbN
- YouTube: https://www.youtube.com/watch?v=Xp5XuBZqBsw
- YouTube: https://www.youtube.com/watch?v=1GF-KVrc0Fg
- YouTube: https://www.youtube.com/watch?v=xieT466Avz8 — poprawiono błędny drugi znak zapytania w oryginalnym URL na kanoniczny adres z zachowaniem ID filmu.
- Telefon: +48 533 128 055.
- E-mail oraz wszystkie nowe mailto: contact@artofmeaning.art.
- Zewnętrzne adresy odzyskano z przekazanego HTML. Brama sieciowa zwraca HTTP 403 dla strony źródłowej i Tally, więc nie potwierdzono dostępności zewnętrznych serwisów ani adresata powiadomień Tally. Filmy odtwarzają się lokalnie, bez zależności od YouTube.

## Formularz — rzeczywiste działanie
- Waliduje wymagane pola i składnię e-maila, z komunikatami PL/EN.
- Przygotowuje link do wiadomości w programie pocztowym na contact@artofmeaning.art.
- Nie wysyła wiadomości do serwera, nie pokazuje pozornego sukcesu i nie przechowuje danych w localStorage ani w adresie strony.
- Obok jest oryginalny link do formularza Tally.
- Do bezpośredniej wysyłki z formularza w tym układzie potrzebny jest uzgodniony endpoint i konfiguracja dostarczenia. Należy osobno potwierdzić odbiorcę w ustawieniach Tally; eksport HTML go nie ujawnia.
- Dotychczasowa polityka prywatności zachowana w assets/documents/privacy-policy-pl.html ze zaktualizowanym e-mailem. Strona polityki ma wspólny interfejs i informację o rzeczywistym obecnym działaniu formularza. Dokument prawny wymaga przeglądu przed publikacją.

## Konkretne braki do uzupełnienia
1. Oryginał fotografii rodzinnego portretu z makiety. Michałek jest odrębną istniejącą pracą i nie został przedstawiony jako ten portret rodzinny.
2. Pasujące ujęcie „przed” / bez malowidła dla Nokturnu. Żaden dostarczony plik nie pokazuje tego samego wnętrza przed zmianą. Lewa strona suwaka jawnie informuje o brakującym materiale; prawa pokazuje koncepcję z malowidłem. Nie zestawiono dwóch różnych wnętrz jako metamorfozy.
3. Dokumenty „Zakres współpracy” i „Kwestionariusz projektowy” w PDF — brak plików, więc nie utworzono pozornych linków pobierania.
4. Ceny i waluty wszystkich 12 obrazów; aktualna dostępność ośmiu prac spoza archiwum.
5. Wymiary i technika dwóch nowych obrazów; opis „Who is hunting”. Dla „It’s Just Business, Darling” jest interpretacja, brak wymiarów i ceny.
6. Potwierdzone nazwy i opisy projektowe dla trzech plików variation: reception, living, dressing. Obecne podpisy jedynie opisują widoczne koncepcje.
7. Endpoint formularza do bezpośredniej wysyłki, potwierdzenie odbiorcy Tally, przegląd polityki prywatności i jej pełne tłumaczenie prawne EN.
8. Opcjonalnie: oryginalne logo wektorowe / większe niż 94 px. Obecnie używane jest autentyczne dostępne logo.

## Podgląd i weryfikacja
- Uruchamianie: zobacz README.md.
- Zrzuty pięciu stron w wersji desktopowej i telefonicznej: `previews/`.
- Wyniki testów przeglądarkowych: `previews/checks.json`. Przeszło 20 kontroli pięciu stron w dwóch językach i dwóch rozmiarach (390 / 1440 px), 15 dodatkowych kontroli szerokości 320 / 768 / 1024 px, filtry, rozwijanie kolekcji, hover bez przesuwania układu, klawiatura, menu, suwak, okna z przywróceniem fokusu, filmy i walidacja formularza bez wysyłania. Sprawdzono 16 ścieżek dodatkowych i 48 lokalnych odnośników. Brak błędów JavaScript w przeglądarce. Wszystkie pięć oryginalnych filmów ma ścieżkę dźwiękową; zweryfikowano kodeki i parametry przy użyciu ffprobe.
- Publikacja i wysyłanie wiadomości nie zostały wykonane.
