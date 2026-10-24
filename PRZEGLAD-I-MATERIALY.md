# Art of Meaning — wdrożenie i materiały
Stan: 25 października 2026 r.

## Wdrożone strony
- `index.html` — Portfolio / strona główna: film, trzy obszary twórczości, sekcja Magdaleny, stopka.
- `murale.html` — hero wideo, trzy szerokie realizacje z oryginalnymi ikonami, gwiazdkami, filmami i parametrami, proces w siatce 2 × 2, kontakt.
- `wnetrza.html` — hero, cztery zakresy współpracy, miejsce na dokumenty, portfolio i filtry, sześć koncepcji, suwak, kontakt.
- `obrazy-na-zamowienie.html` — cztery pierwsze obrazy zgodnie z makietą, pełna kolekcja dwunastu prac po rozwinięciu, filtry, stale widoczne ceny ośmiu obrazów, sekcja zamówień. Alias: `malarstwo.html`.
- `kontakt.html` — układ z makiety z granatowym headerem, formularz POST na contact@artofmeaning.art przez FormSubmit, kontakt bezpośredni i social media.
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
- Dodano „Who is hunting?” oraz „It’s Just Business, Darling”. Interpretacja PDF jest zachowana w materiałach, ale jej odnośnik usunięto z interfejsu na prośbę właścicielki.
- Cztery prace oznaczone wcześniej SOLD trafiają do archiwum: Miasto sukcesu, João, Terracotta Muse, Michałek.
- Osiem prac spoza archiwum ma potwierdzony przez właścicielkę status „Dostępne”. Filtr pokazuje wszystkie osiem; na stronach prac także widnieje informacja o dostępności.
- Uzupełniono osiem cen przekazanych przez właścicielkę (EUR): It’s Just Business, Darling — 2600; Pocałunek Meduzy — 2400; Who is hunting? — 2400; UNFROZEN — 2200; Electric Embrace — 2100; Silent Horizon — 2000; Red Temptation — 900; Arc de Triomf — 450. Ceny są widoczne stale na kaflach i stronach prac. Nie dopisano cen historycznych czterech sprzedanych obrazów.
- Sześć wnętrz prezentowanych jest jako koncepcje / wizualizacje, nie jako ukończone realizacje.

## Odzyskane odnośniki
- Instagram: https://www.instagram.com/artofmeaning.art/
- LinkedIn: https://www.linkedin.com/in/mbabicka/
- Facebook: https://www.facebook.com/magda.babicka.10
- YouTube: https://www.youtube.com/watch?v=Xp5XuBZqBsw
- YouTube: https://www.youtube.com/watch?v=1GF-KVrc0Fg
- YouTube: https://www.youtube.com/watch?v=xieT466Avz8 — poprawiono błędny drugi znak zapytania w oryginalnym URL na kanoniczny adres z zachowaniem ID filmu.
- Telefon: +48 533 128 055.
- E-mail oraz wszystkie nowe mailto: contact@artofmeaning.art.
- Zewnętrzne adresy odzyskano z przekazanego HTML, a adres playlist od właścicielki. Brama sieciowa zwraca HTTP 403 dla strony źródłowej, YouTube i usługi wysyłkowej, więc nie potwierdzono tutaj ich dostępności. Lokalne wersje filmów nie zależą od YouTube.

## Formularz — rzeczywiste działanie
- Waliduje wymagane pola i składnię e-maila, z komunikatami PL/EN.
- Wysyła HTTPS POST przez FormSubmit na contact@artofmeaning.art, bez programu pocztowego i bez dotychczasowej usługi formularzowej.
- Nie zapisuje danych w localStorage ani adresie strony. Posiada pułapkę antyspamową, blokadę wielokrotnego wysłania i limit czasu żądania.
- Komunikat akceptacji pokazuje tylko po odpowiedzi HTTP OK oraz potwierdzeniu `success: true`. Przy odmowie, błędzie sieciowym lub przekroczeniu czasu zachowuje wpisaną treść i pokazuje bezpośredni kontakt.
- Wymaga jednorazowego potwierdzenia odbiorcy w FormSubmit. Panel właścicielki: `kontakt.html?activate=1&lang=pl`; żądanie aktywacji wysyła się dopiero po świadomym kliknięciu przycisku. Następnie należy potwierdzić link w skrzynce i sprawdzić odbiór własnego zgłoszenia. Nie wykonano rzeczywistej wysyłki w testach.
- Dotychczasowa polityka prywatności zachowana w assets/documents/privacy-policy-pl.html ze zaktualizowanym e-mailem. Strona polityki ma wspólny interfejs i informację o rzeczywistym obecnym działaniu formularza. Dokument prawny wymaga przeglądu przed publikacją.

## Konkretne braki do uzupełnienia
1. Portret rodzinny — uzupełniono: oryginalny PNG z archiwum „Rodzinny portret na drewnianej sztaludze.rar” umieszczono w sekcji zamówień. Plik zachowano bez zmian i kadrowania, z podpisem PL/EN „Portret rodzinny — przykład zamówienia”. Michałek pozostaje odrębną istniejącą pracą.
2. Pasujące ujęcie „przed” / bez malowidła dla Nokturnu. Żaden dostarczony plik nie pokazuje tego samego wnętrza przed zmianą. Lewa strona suwaka jawnie informuje o brakującym materiale; prawa pokazuje koncepcję z malowidłem. Nie zestawiono dwóch różnych wnętrz jako metamorfozy.
3. Dokumenty „Zakres współpracy” i „Kwestionariusz projektowy” w PDF — brak plików, więc nie utworzono pozornych linków pobierania.
4. Ceny, waluta i dostępność są uzupełnione: osiem prac dostępnych oraz João, Terracotta Muse, Michałek i Miasto sukcesu / City of Success w archiwum SOLD. Nie są już brakującymi danymi.
5. Technika dwóch nowych obrazów. Wymiary obu uzupełniono: 100 × 70 cm. Opis „It’s Just Business, Darling” opracowano na podstawie przekazanej interpretacji PDF; opis „Who is hunting?” w wersji PL/EN na podstawie nowego tekstu autorskiego właścicielki, z zachowaniem jego znaczenia.
6. Potwierdzone nazwy i opisy projektowe dla trzech plików variation: reception, living, dressing. Obecne podpisy jedynie opisują widoczne koncepcje.
7. Aktywacja adresu odbiorcy w FormSubmit i potwierdzenie rzeczywistego dostarczenia wiadomości; przegląd polityki prywatności i jej pełne tłumaczenie prawne EN.
8. Nowy oryginalny plik logo PNG/SVG z przesłanego wzoru. Wzór widać w wiadomości, ale nie jest dostępny w katalogu załączników jako plik do bezstratnego wykorzystania. Zachowano dostępny znak 94 × 94 px, skalę i proporcje; header ma biały logotyp, a obie linie lokalny Cinzel.

## Podgląd i weryfikacja
- Uruchamianie: zobacz README.md.
- Zrzuty pięciu stron w wersji desktopowej i telefonicznej: `previews/`.
- Wyniki testów przeglądarkowych: `previews/checks.json`. Przeszło 20 kontroli pięciu stron w dwóch językach i dwóch rozmiarach (390 / 1440 px), 15 dodatkowych kontroli szerokości 320 / 768 / 1024 px, filtry, rozwijanie kolekcji, hover bez przesuwania układu, klawiatura, menu, suwak, okna z przywróceniem fokusu, filmy i walidacja formularza bez wysyłania. Sprawdzono 16 ścieżek dodatkowych i 40 lokalnych odnośników. Brak błędów JavaScript w przeglądarce. Wszystkie pięć oryginalnych filmów ma ścieżkę dźwiękową; zweryfikowano kodeki i parametry przy użyciu ffprobe.
- Test treści porównuje 10 pełnych oryginalnych opisów, 3 opinie o obrazach i 3 o muralach z przekazanym eksportem; sprawdza wymiary dwóch nowych obrazów, osiem cen w galerii i szczegółach PL/EN oraz dokładny zestaw czterech prac SOLD. Panel aktywacji sprawdzono bez wysyłania.
- Wynik publikacji można sprawdzić w GitHub Actions dla commita danej wersji. Testy nie wysyłają rzeczywistych wiadomości; odbiór wymaga aktywacji skrzynki i sprawdzenia przez właścicielkę.

## Ostatnie dopracowanie

- Przywrócono wstęp, 10 kompletnych opisów obrazów oraz 3 autentyczne opinie z przekazanego eksportu HTML. Wstęp następnie zmieniono na prośbę właścicielki, usuwając zapowiedź bezpłatnej wyceny. Bezpośredni odczyt aktualnej strony źródłowej był zablokowany HTTP 403.
- Dodatkowo przywrócono 3 oryginalne opinie o muralach. Opisy murali rozbudowano na podstawie OPISY_DO_MURALI_2025.pdf.
- Opinie dostępne są na odpowiednich stronach prac, a opinie o obrazach także na głównej stronie galerii. Zachowano autorów, tekst źródłowy i tłumaczenia EN; nie utworzono fikcyjnych rekomendacji.
- Dwa nowe obrazy mają potwierdzone wymiary 100 × 70 cm. Osiem podanych cen w EUR jest widocznych w galerii i szczegółach. Cztery wskazane prace są w archiwum i mają widoczne oznaczenie SOLD.
- Wszystkie dawne linki do zewnętrznych formularzy usunięto. Obecna integracja wysyłki wymaga aktywacji skrzynki zgodnie z README.
- Kontakt w PL/EN informuje o współpracy zdalnej w Polsce i Hiszpanii.
- Trzy strony projektów murali rozpoczynają się dużym ujęciem wideo z lokalnego oryginału. Autoodtwarzanie jest wyciszone i respektuje ograniczenie ruchu. Dostępne są pauza i sterowanie dźwiękiem.
- Przyciski filmów otwierają pełny odtwarzacz YouTube w trybie rozszerzonej prywatności, z wcześniej potwierdzonymi ID realizacji. Odtwarzacz ładuje się po kliknięciu, zamknięcie usuwa iframe i przywraca fokus; można wybrać film lokalny lub bezpośredni link YouTube.
- Dodano odnośnik do publicznych playlist właścicielki: https://www.youtube.com/@artofmeaning_YT/playlists. Odczyt playlist i rzeczywiste odtwarzanie YouTube są zablokowane w środowisku przez HTTP 403; nie przypisano niezweryfikowanych nowych filmów. Testy sprawdzają adresy osadzeń z atrapą odpowiedzi oraz odtwarzanie rzeczywistych lokalnych kopii.
- Wszystkie 22 aktywne pliki HTML pobierają wspólne skrypty i style z identyfikatorami obliczonymi z ich zawartości. Test aktualizacji odtworzył brak portretu przy starych skryptach w pamięci przeglądarki, a następnie potwierdził pobranie nowych plików i poprawne wyświetlenie portretu. Wynik: `previews/checks.json` → `cachedReleaseUpgrade`. Właścicielka potwierdziła już widoczność zdjęcia na GitHub Pages.
