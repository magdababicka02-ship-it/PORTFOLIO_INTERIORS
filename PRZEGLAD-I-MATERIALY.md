# Art of Meaning — wdrożenie i materiały
Stan: 25 października 2026 r.

## Wdrożone strony
- `index.html` — Portfolio / strona główna: film, trzy obszary twórczości, sekcja Magdaleny, stopka.
- `murale.html` — hero wideo, trzy szerokie realizacje z oryginalnymi ikonami, gwiazdkami, filmami i parametrami, proces w siatce 2 × 2, kontakt.
- `wnetrza.html` — hero, cztery zakresy współpracy, miejsce na dokumenty, portfolio i filtry, sześć koncepcji, suwak, kontakt.
- `midnight-garden.html` — osobna podstrona projektu z hero, opisem i metryką z dokumentu właścicielki, wizualizacjami wnętrza i ogrodu, powiększaniem obrazów oraz studium sufitu bez malowidła i z malowidłem.
- `obrazy-na-zamowienie.html` — cztery pierwsze obrazy zgodnie z makietą, pełna kolekcja dwunastu prac po rozwinięciu, filtry, stale widoczne ceny ośmiu obrazów, sekcja zamówień. Alias: `malarstwo.html`.
- `kontakt.html` — układ z makiety z granatowym headerem, formularz POST na contact@artofmeaning.art przez FormSubmit, kontakt bezpośredni i social media.
- Zachowane ścieżki trzech realizacji murali i dziesięciu wcześniejszych obrazów. Dodane ścieżki dwóch nowych obrazów. Ujednolicony interfejs PL/EN/ES także na tych stronach.
- Zmiana języka zachowuje podstronę, parametry i fragment URL. Menu zawsze: Portfolio · Murale · Wnętrza · Malarstwo · Kontakt · PL | EN | ES, z tłumaczeniem nazw w danym języku. Sekcja Magdaleny pozostaje na stronie głównej; brak odrębnego „O mnie”.

## Zweryfikowana identyfikacja i źródła
- Logo i logotyp: oryginalny `assets/brand/brand-wordmark-original.png` (4500 × 4750 px) z archiwum „LOGO MÓJ BRAND.rar”. Znak z okręgiem i obie linie liter są wyświetlane z tego samego oryginału przez obszary SVG, bez przerysowywania i rozciągania. Widok usuwa tylko puste marginesy arkusza. Logotyp jest biały, a twarz i okrąg zachowują oryginalną grafikę oraz kolory.
- W stopce strony Wnętrza zastosowano drugi, złoty wariant z `brand-champagne-original.png`. Pozostałe stopki używają podstawowego logo. Favicon ze wszystkich stron pochodzi z dostarczonego `brand-blue-original.png`. Cztery PNG z archiwum zachowano bez zmian w `assets/brand/`.
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
- Sześć dotychczasowych wnętrz prezentowanych jest jako koncepcje / wizualizacje. Dodany Puerto Banús Residence pokazuje fotografie ukończonego projektu we współpracy z zespołem NOVA KASYANOV, z wyszczególnieniem indywidualnego zakresu Magdaleny Babickiej.

## Puerto Banús Residence — dodany projekt

- Źródło: „PUERTO BANUS, MARBELLA.rar”, 11 fotografii i PDF projektu. Zdjęcia zachowano bajt w bajt, w pełnej rozdzielczości 1920 px szerokości. Pliki JFIF opublikowano z rozszerzeniem `.jpg`, bez ponownej kompresji.
- Kafel w kategorii „Commercial” (zgodnie z prośbą właścicielki) otwiera `puerto-banus-residence.html`. W opisie merytorycznym zachowano typ rezydencjalny. Projekt widoczny jest również w pierwszej parze kafli, bez rozwijania kolekcji.
- Strona zawiera widok tarasu, opis i metrykę, sypialnię, salon i jadalnię, materiały oraz końcowe ujęcie morza. Wszystkie 11 zdjęć wykorzystano; 10 galerii zdjęciowych można powiększać. Nie dodano pozornego suwaka przed/po ani oznaczenia AI.
- Wskazano zespół NOVA KASYANOV i udział Magdaleny Babickiej: rzuty, układy meblowe oraz dobór mebli i tkanin do sypialni głównej. Opis PL/EN opracowano na podstawie PDF, dodano ES. Nie przypisano jej autorstwa widocznego obrazu ani całego wnętrza.
- Pozostałe sześć projektów i całą wcześniejszą zawartość katalogu zachowano; porównano dane z poprzednim commitem. PDF źródłowy zachowano w archiwum wykluczonym z Pages. Publikacja nadal dotyczy wyłącznie repozytorium GitHub Pages, bez zmiany domeny.
- Weryfikacja: trzy języki, 15 kombinacji szerokości i języka (320–1440 px), 11 poprawnie wczytanych zdjęć o oryginalnych proporcjach, 30 otwarć galerii z zamknięciem i przywróceniem fokusu. Przeszły także testy wcześniejszego Midnight Garden, 30 kontroli głównych stron oraz 48 kontroli 24 podstron po hiszpańsku. Brak błędów JavaScript; nie wysyłano rzeczywistych e-maili.

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
2. Ujęcie bez malowidła — uzupełniono z pliku 2.png Midnight Garden. Suwak na stronie Wnętrza i podstronie projektu pokazuje oba warianty tego samego projektu jako wizualizacje koncepcyjne, bez sugerowania wykonanej metamorfozy.
3. Dokumenty „Zakres współpracy” i „Kwestionariusz projektowy” w PDF — brak plików, więc nie utworzono pozornych linków pobierania.
4. Ceny, waluta i dostępność są uzupełnione: osiem prac dostępnych oraz João, Terracotta Muse, Michałek i Miasto sukcesu / City of Success w archiwum SOLD. Nie są już brakującymi danymi.
5. Technika dwóch nowych obrazów. Wymiary obu uzupełniono: 100 × 70 cm. Opis „It’s Just Business, Darling” opracowano na podstawie przekazanej interpretacji PDF; opis „Who is hunting?” w wersji PL/EN na podstawie nowego tekstu autorskiego właścicielki, z zachowaniem jego znaczenia.
6. Potwierdzone nazwy i opisy projektowe dla trzech plików variation: reception, living, dressing. Obecne podpisy jedynie opisują widoczne koncepcje.
7. Aktywacja adresu odbiorcy w FormSubmit i potwierdzenie rzeczywistego dostarczenia wiadomości; przegląd źródłowej polityki prywatności i jej pełne tłumaczenie prawne EN/ES. Bieżąca strona polityki ma interfejs i opis działania serwisów we wszystkich trzech językach, a oryginalny dokument jest jawnie oznaczony jako polski.
8. Oryginalne logo — uzupełniono z archiwum „LOGO MÓJ BRAND.rar”. Nowy znak, oryginalne litery, wariant złoty i favicon są podłączone; nie są już brakującymi plikami.

## Podgląd i weryfikacja
- Uruchamianie: zobacz README.md.
- Zrzuty pięciu stron w wersji desktopowej i telefonicznej: `previews/`.
- Wyniki testów przeglądarkowych: `previews/checks.json`. Przeszło 30 kontroli pięciu stron w trzech językach i dwóch rozmiarach (390 / 1440 px), 15 dodatkowych kontroli szerokości 320 / 768 / 1024 px, filtry, rozwijanie kolekcji, hover bez przesuwania układu, klawiatura, menu, suwak, okna z przywróceniem fokusu, filmy i walidacja formularza bez wysyłania. Sprawdzono 17 ścieżek dodatkowych i 46 lokalnych odnośników. Brak błędów JavaScript w przeglądarce. Wszystkie pięć oryginalnych filmów ma ścieżkę dźwiękową; zweryfikowano kodeki i parametry przy użyciu ffprobe.
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
- Wszystkie 23 aktywne pliki HTML pobierają wspólne skrypty i style z identyfikatorami obliczonymi z ich zawartości. Test aktualizacji odtworzył brak portretu przy starych skryptach w pamięci przeglądarki, a następnie potwierdził pobranie nowych plików i poprawne wyświetlenie portretu. Wynik: `previews/checks.json` → `cachedReleaseUpgrade`. Właścicielka potwierdziła już widoczność zdjęcia na GitHub Pages.
- Sekcja „Twój mural w 4 krokach”: „Jak pracuję”, polski wstęp i cztery opisy przepisane z pierwszej referencji właścicielki, tłumaczenie EN, zachowane jasne tło #F3F0E9 oraz siatka 2 × 2. Nowe warianty oryginalnych ikon mają granat #07172C i szarość #92999D, bez złota. Poprzednie SVG pozostawiono w materiałach, a nowe nazwy plików zapobiegają wczytaniu starej kolorystyki z pamięci podręcznej.
- Sekcja Magdaleny: oryginalne zdjęcie 3888 × 5184 px z archiwum „zdjecie_magdalena.rar”. Plik IMG_8611.RAW zawiera JPEG, dlatego zapisano identyczne bajty jako `magdalena-babicka-portrait.jpg`, bez konwersji, retuszu ani zmiany jakości. Opis łączy filozofię, wykształcenie artystyczne, umiejętności oraz doświadczenie projektowe w Polsce i Hiszpanii. Usunięto listę szkół, praktyki i ton biografii studenckiej. Cytat jest nową deklaracją marki opracowaną na prośbę właścicielki.
- Kafle obszarów twórczości na stronie głównej mają polskie tytuły i opisy z przekazanej referencji. Okładką malarstwa jest „It’s Just Business, Darling”; oryginalny plik obrazu pozostaje bez zmian.
- Angielskie wezwania do kontaktu mają profesjonalny, prosty ton („Discuss your project”, „Arrange a consultation”, „Contact me”). Wersja hiszpańska ma słownik 220 tekstów interfejsu oraz 90 pól językowych katalogu, w tym pełne opisy obrazów, murali, koncepcji i autentyczne opinie. Tłumaczenia opinii są oznaczone; autorzy i teksty źródłowe PL/EN pozostają zachowane.
- Formularz przekazuje kod języka wraz z zapytaniem, dzięki czemu odbiorczyni wie, w jakiej wersji strony zostało przygotowane zgłoszenie. Dane odbiorcy i sposób aktywacji pozostają zgodne z sekcją formularza powyżej.
- Sprawdzono wszystkie 23 aktywne podstrony w ES na desktopie i telefonie (46 kontroli), zachowanie kontekstu przy przełączaniu PL/EN/ES, pełną jakość portretu, zgodność opisów kafli z referencją oraz hiszpańską walidację i reakcje formularza na akceptację i odmowę wysyłki. Żadnej prawdziwej wiadomości nie wysłano.

## Midnight Garden

- Dotychczasową roboczą nazwę „Nokturn w śródziemnomorskim salonie” zastąpiono nazwą z przekazanego dossier: Midnight Garden. Kafel w portfolio oraz hero Wnętrz prowadzą do `midnight-garden.html`; projekt jest widoczny jako pierwszy. Pozostałe koncepcje zachowano.
- Z archiwów pobrano pięć unikalnych PNG: 1, 2, 3, 5 i 6. Paczka 3_poprawka zawiera identyczną kopię 3.png. Pliku 4.png ani ujęcia w świetle dziennym wymienionego w scenariuszu dossier nie było w udostępnionych plikach. Publiczna strona prezentuje dostępne ujęcia bez pustych miejsc.
- Opisy PL i EN, nazwa, rok 2026, kierunek artystyczny, materiały i status projektu pochodzą z Midnight_Garden_Art_of_Meaning_Portfolio_Guide.pdf. Dodano pełny opis ES. Projekt jest oznaczony jako koncepcja z wizualizacjami wspomaganymi AI. Zalecenia edytorskie w PDF potraktowano jako kontekst, a nie polecenie zmiany domeny lub retuszowania dzieł.
- Oryginalne PNG i PDF zachowano bez zmian w `archive/midnight-garden-originals/`, poza publikowaną stroną. Bezstratne WebP w `assets/images/midnight-garden/` mają identyczne rozdzielczości i piksele; porównanie pięciu plików zakończyło się powodzeniem.
- Suwak ma rzeczywiste ujęcia bez malowidła (2) i z malowidłem (1), jako studium tej samej koncepcji. Zniknęło puste pole. Podstrona zawiera także wejście (5), detal baru (3) i ogród o zmierzchu (6), z powiększaniem i pełnym rozmiarem.
- `previews/midnight-garden-checks.json`: 15 kontroli projektu w trzech językach na szerokościach 320/390/768/1024/1440; nawigacja z kafla myszą/klawiaturą, semantyka metryki i statusu, poprawne obrazy, zachowanie proporcji, powiększanie i fokus, suwak oraz dwa kanały zapytania. Brak błędów JavaScript. Zrzuty: `previews/midnight-garden-desktop.png`, `previews/midnight-garden-mobile.png` oraz porównanie.
