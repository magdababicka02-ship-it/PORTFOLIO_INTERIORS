# Art of Meaning — wdrożenie i materiały
Stan: 27 października 2026 r.

## Wdrożone strony
- `index.html` — Portfolio / strona główna: film, trzy obszary twórczości, sekcja Magdaleny, stopka.
- `murale.html` — hero wideo, trzy szerokie realizacje z oryginalnymi ikonami, gwiazdkami, filmami i parametrami, proces w siatce 2 × 2, kontakt.
- `wnetrza.html` — hero, cztery zakresy współpracy, miejsce na dokumenty, kuratorowane portfolio i filtry, siedem podstron projektów i pięć zachowanych studiów bez podstron, suwak, kontakt.
- `midnight-garden.html` — osobna podstrona projektu z hero, opisem i metryką z dokumentu właścicielki, wizualizacjami wnętrza i ogrodu, powiększaniem obrazów oraz studium sufitu bez malowidła i z malowidłem.
- `obrazy-na-zamowienie.html` — cztery pierwsze obrazy zgodnie z makietą, pełna kolekcja dwunastu prac po rozwinięciu, filtry, stale widoczne ceny ośmiu obrazów, sekcja zamówień. Alias: `malarstwo.html`.
- `kontakt.html` — układ z makiety z granatowym headerem, formularz POST na contact@artofmeaning.art przez FormSubmit, kontakt bezpośredni i social media.
- Zachowane ścieżki trzech realizacji murali i dziesięciu wcześniejszych obrazów. Dodane ścieżki dwóch nowych obrazów. Ujednolicony interfejs PL/EN/ES także na tych stronach.
- Zmiana języka zachowuje podstronę, parametry i fragment URL. Menu zawsze: Portfolio · Murale · Wnętrza · Malarstwo · Kontakt · PL | EN | ES, z tłumaczeniem nazw w danym języku. Sekcja Magdaleny pozostaje na stronie głównej; brak odrębnego „O mnie”.

## Zweryfikowana identyfikacja i źródła
- Logo i logotyp: oryginalny `assets/brand/brand-wordmark-original.png` (4500 × 4750 px) z archiwum „LOGO MÓJ BRAND.rar”. Znak z okręgiem i obie linie liter są wyświetlane z tego samego oryginału przez obszary SVG, bez przerysowywania i rozciągania. Widok usuwa tylko puste marginesy arkusza. Logotyp jest biały, a twarz i okrąg zachowują oryginalną grafikę oraz kolory.
- Znak granatowy w logo podstawowym ma cienki biały obrys 1 px, także na telefonie. Stopki Wnętrz i podstron projektowych używają oryginalnego przezroczystego `brand-original.png`, z zachowaniem dotychczasowego kadru i skali. Usunięto prostokątne tło CSS złotego wariantu. Pozostałe stopki używają podstawowego logo. Favicon ze wszystkich stron pochodzi z dostarczonego `brand-blue-original.png`. Cztery PNG z archiwum zachowano bez zmiany bajtów w `assets/brand/`.
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

## The Space Between — nowy projekt flagowy

- Dodano `the-space-between.html` w Residential z własnym monumentalnym układem editorial i oryginalnymi tekstami PL/EN/ES. Wszystkie pięć zatwierdzonych WebP zachowuje bajty źródłowe i pełne proporcje. Brak filtrów, retuszu, generowanych grafik i zmian malowidła. Tytuł znajduje się poza obrazem.
- Sekwencja: 01 hero → manifest → 03 malowidło i cytat → 02 perspektywa → 04 pionowy detal materiałów → 05 szerokie zamknięcie → opis, kredyt, zakres i kontakt. Obrazy można powiększyć klawiaturą, a zamknięcie oddaje fokus.
- Status koncepcji widoczny na karcie, przy otwarciu i w objaśnieniu końcowym. Nie dodano lokalizacji, metrażu, dat, marek ani zdjęć ukończonej realizacji.
- Pierwszy projekt wyróżniony zgodnie z briefem. Wszystkie wcześniejsze rangi przesunięto o jedną pozycję, zachowując ich wzajemną kolejność i dotychczasowe kategorie. Pełne portfolio: 12 wpisów, w tym 7 osobnych podstron i 5 wcześniejszych studiów w oknach dialogowych.
- Archiwum zawiera dokładny brief i JSON oraz manifest sum kontrolnych dostarczonych WebP. Paczka Light nie zawiera PNG oryginałów; brak tych plików nie blokuje publikacji zatwierdzonych WebP.
- Podglądy: `previews/the-space-between-desktop.png`, `previews/the-space-between-mobile.png`. Wyniki testów: `previews/the-space-between-checks.json`, `previews/the-space-between-preservation-checks.json`.
- Weryfikacja: 18 kombinacji szerokości 320/375/390/768/1440/1920 × PL/EN/ES, 15 powiększeń z klawiaturą i oddaniem fokusu, 30 lokalnych linków z nowej podstrony. Wszystkie pięć plików ma sumę SHA-256 identyczną ze źródłem. 36 porównań wcześniejszych sześciu projektów daje identyczny HTML głównej treści, headera i stopki oraz styl nagłówka. Stare dane katalogu pozostają identyczne po pominięciu zamierzonego przesunięcia rang.
- Test ogólny: 30 widoków stron głównych, 23 trasy szczegółowe, 52 lokalne linki i scenariusze interakcji przeszły. Test językowy: 58 sprawdzeń ES dla 29 aktywnych stron; brak błędów JavaScript i brakujących tłumaczeń. Wysyłka formularza była przechwycona w teście, bez rzeczywistych e-maili. Nie mierzono metryk Core Web Vitals na produkcji.

## Ceremonial Arrival — Marbella Hall Study

- Dodano `ceremonial-arrival.html` jako „Residential / Studia projektowe”. Pozostała niżej niż cztery projekty wiodące i Spisak Studio, z rangą 6. Grupa „Studia projektowe” obsługuje teraz również opublikowane podstrony koncepcyjne; nie zmieniono rang ani kategorii wcześniejszych wpisów.
- Źródła: trzy oryginalne wizualizacje, ich dostarczone wersje WebP, diagram poglądowy, oryginalny mały rzut i brief. Oba osobne PDF są identyczne z PDF w ZIP — zachowano jeden zestaw w archiwum poza Pages.
- Dedykowana kompozycja: duże ujęcie ornamentalne, krótka narracja, równorzędne warianty 01/02/03 w przesuniętym tryptyku, diagram relacji przestrzennych, zakres pracy i kontakt. Nie zastosowano suwaka „przed/po” ani narracji o pojedynczej finalnej wersji.
- Zakres i kredyt: rozwój koncepcji, warianty aranżacji, palety materiałowe i kolorystyczne, moodboardy, wizualizacje architektoniczne; praca koncepcyjna dla zespołu NOVA KASYANOV. Nie dopisano wykonawstwa, ukończenia wnętrza, samodzielnego autorstwa architektury lub oficjalnej współpracy z Versace. Brand witryny pozostał Art of Meaning.
- Pięć dostarczonych zasobów publikacyjnych skopiowano bez zmiany bajtów. Diagram 2100 × 1220 px jest opisany jako schemat bez skali, nie dokumentacja wykonawcza. Oryginalny rzut 352 × 217 px jest opcjonalny i zachowuje natywną szerokość również w powiększeniu. Nie zmieniano geometrii ani motywów w wizualizacjach.
- `previews/ceremonial-arrival-checks.json`: 18 kontroli szerokości i języka, 18 otwarć powiększenia z przywróceniem fokusu, trzy równorzędne propozycje, widoczny etap i NOVA KASYANOV, prawidłowy filtr „Residential”, zachowana kolejność projektów wiodących, brak błędów JavaScript. Pełna kolekcja nadal zawiera wszystkie wcześniejsze wpisy: 11 pozycji łącznie.
- `previews/ceremonial-preservation-checks.json`: 30 porównań głównej treści pięciu wcześniejszych podstron w PL/EN/ES na telefonie i komputerze — identyczny HTML. Po usunięciu nowego wpisu katalog jest identyczny z poprzednim commitem. Podglądy: `previews/ceremonial-arrival-{desktop,mobile}.png`.

## Spisak Studio

- Dodano `spisak-studio.html`, w kategorii „Commercial”. Źródła: ZIP z siedmioma fotografiami, README, manifest i czternastostronicowy PDF. Osobny PDF i wersja w ZIP są identyczne — jeden oryginał zachowano w archiwum poza Pages.
- Dane: Katowice, Polska; koncepcja aranżacji i kierunek kreatywny; strefy zdjęciowe, dobór mebli i kolorów, koncepcja światła oraz styling. Nie przypisano autorce architektonicznej przebudowy, dokumentacji lub wykonawstwa.
- Układ magazynowy jest dedykowany temu projektowi: duży tytuł i przesunięte zdjęcie ogólne, pionowy kadr okien, różne skale trzech scen, dwa przesunięte detale i zamknięcie z rzeczywistym zakresem pracy. Istniejące cztery projekty zachowują swoje kompozycje.
- Siedem oryginalnych JPEG skopiowano bez zmiany bajtów. Fotografie 600–720 px nie są rozciągane ponad natywną szerokość, nawet w oknie powiększenia. Zdjęcie ogólne jest niemal kwadratowe; pokazano je w całości, bez tworzenia sztucznej panoramy. Oryginalny przewód w detalu pozostał widoczny. Nie użyto generatywnego retuszu ani nowych obrazów.
- Jawne `featuredRank` i `curatedRank` ustalają kolejność: Midnight Garden, Puerto Banús, Atmosphere-Driven Apartment, Private Spa Bathroom; niżej Spisak Studio. Pięć studiów projektowych pozostaje w kolekcji, wyraźnie oznaczonych i dostępnych przez rozwinięcie lub filtry. Hero Wnętrz nadal pokazuje Midnight Garden. Nie skopiowano nieaktualnej notatki briefu sugerującej, że Atmosphere-Driven Apartment nie jest jeszcze opublikowane.
- `previews/spisak-studio-checks.json`: PL/EN/ES, 18 kombinacji języka i szerokości 320–1920 px, 21 powiększeń z przywróceniem fokusu, poprawne źródła i proporcje zdjęć, brak powiększania ponad natywną szerokość, rzeczywiście różne skale scen, kontakt oraz filtry. Odwrócenie całej tablicy katalogu w teście nie zmieniło jawnej kolejności projektów wiodących.
- `previews/spisak-preservation-checks.json`: 24 porównania głównej treści czterech wcześniejszych podstron przed i po zmianie — identyczny HTML. Po pominięciu dodanych rang i nowego wpisu wcześniejszy katalog jest identyczny. Podglądy: `previews/spisak-studio-{desktop,mobile}.png`.

## Atmosphere-Driven Apartment

- Dodano do „Residential”, pod adresem `atmosphere-driven-apartment.html`. Źródła: ZIP z dziewięcioma obrazami, README i jedenastostronicowy PDF. Osobny PDF i PDF w ZIP są identyczne — kopię zachowano w archiwum poza publikacją.
- Fakty z materiałów: Gliwice, Polska; około 60 m²; prywatne mieszkanie; główna projektantka / kierunek artystyczny; koncepcja, opracowanie techniczne i Execution Support. Nie dopisano ukończenia projektu ani odpowiedzialności generalnego wykonawcy. Opisy PL/EN/ES bazują na przekazanym tekście.
- Zatwierdzona kuchnia jest jasna, z drewnem i ciemnym kamieniem. Tylko ten wariant występuje jako hero i ujęcie kuchni w mniejszej galerii z łazienką. Trzy detale pochodzą z tej samej koncepcji. Nie dodano fikcyjnych zdjęć innych pomieszczeń.
- Dziewięć oryginalnych JPEG zachowano bez zmiany bajtów i proporcji. Jedna plansza HTML łączy prawdziwy rzut i fragment zabudowy. Dodatkowy detal instalacyjny jest zwinięty; każdy oryginał można powiększyć. Nie zmieniono geometrii i wymiarów. Zdjęcia stanu deweloperskiego pokazano jako niewielki oryginalny kolaż.
- `previews/atmosphere-apartment-checks.json`: 15 kombinacji szerokości i języka, 30 powiększeń z przywracaniem fokusu, zatwierdzone hero ładowane priorytetowo, poprawna kategoria, jedna plansza, zwinięty detal instalacyjny, brak poziomego przewijania i błędów JavaScript. Sprawdzono również nowe logo na tej podstronie.
- Dotychczasowy katalog jest identyczny po pominięciu nowego wpisu. Private Spa Bathroom nadal należy do „Residential”. Pełne portfolio zawiera dziewięć projektów, a cztery z gotowymi podstronami widać od razu.
- Kontrola zachowania pozostałych projektów: 18 porównań głównej treści Midnight Garden, Puerto Banús i Private Spa Bathroom w PL/EN/ES na telefonie i komputerze dało identyczny HTML. Dodatkowo przeszło 30 kontroli stron głównych, 20 ścieżek dodatkowych, 49 lokalnych linków i 52 kontrole wszystkich 26 podstron po hiszpańsku. Raport zachowania: `previews/apartment-preservation-checks.json`. Żadnych prawdziwych e-maili nie wysłano.

## Private Spa Bathroom

- `private-spa-bathroom.html` przeniesiono do „Residential” zgodnie z najnowszym poleceniem właścicielki. Dane z `project-content.json`: Gliwice, Polska; główna projektantka; realizacja w toku.
- Źródła: `CODEX_README.md`, `project-content.json`, plansza PDF oraz `assets.rar`. Pełna prezentacja `Private_Spa_Bathroom_Codex_Presentation_v2.pdf` przekroczyła limit pobierania 32 MiB i nie została odczytana. Dostarczone później assets zawierają wszystkie dziewięć plików wymienionych w JSON, więc nie trzeba było wycinać rozmytych fragmentów planszy.
- Opublikowano bez zmiany bajtów: wizualizację 1649 × 2048, dwa zdjęcia stanu istniejącego 1200 × 1600, planszę i pięć oryginalnych wycinków dokumentacji. Zdjęcia „przed”, render i rysunki są podpisane zgodnie z charakterem materiału. Nie publikowano fikcyjnych zdjęć „po”, marek, metrażu ani terminów ukończenia.
- Uproszczony rzut pokazano jako element dostarczonej planszy, z informacją, że nie jest rysunkiem wykonawczym. Oryginalne rzuty i przekroje są dostępne oddzielnie, z powiększaniem i odnośnikiem do pełnego pliku. Polskie opisy techniczne zachowano. Plansza PDF jest dostępna przez rzeczywisty odnośnik; żaden nowy schemat ani wymiar nie został wymyślony.
- Opis i zakres pracy przygotowano w PL/EN/ES na podstawie faktów z JSON i materiałów wizualnych. Status realizacji i rola projektantki są widoczne. Nie dodano danych klienta; wykorzystane fragmenty dokumentacji nie zawierają tabliczek z danymi osobowymi.
- Doprecyzowanie według „CODEX TASK — PRIVATE SPA BATHROOM / PREMIUM PORTFOLIO REDESIGN”: dedykowany układ jednej podstrony; hero 58% szerokości na komputerze; koncepcja → materiały i światło → nieduże zdjęcia przed remontem → jedna plansza → zakres → kontakt. Detal materiałowy jest kadrem CSS oryginalnej wizualizacji, nie nowym obrazem. Rysunki są schowane w natywnym, dostępnym z klawiatury elemencie details. Wszystkie oryginalne pliki pozostają zachowane.
- Wyniki w `previews/private-spa-checks.json`: 15 kombinacji szerokości i języka, 30 otwarć i zamknięć powiększenia z przywróceniem fokusu, sprawdzone domyślne ukrycie pięciu rysunków, działający PDF, przejście klawiaturą z „Residential” i brak projektu w „Commercial”, brak błędów JavaScript. Podglądy w `previews/private-spa-{desktop,mobile}.png`.
- `previews/spa-editorial-other-projects.json`: 12 porównań HTML aplikacji przed i po zmianie dla Midnight Garden i Puerto Banús (PL/EN/ES, telefon i komputer) — identyczny wynik. Style nowego układu są ograniczone klasą `.spa-project`; funkcja `photographicProject()` pozostała bez zmian.
- Wszystkie wcześniejsze projekty zachowano. Po dodaniu Atmosphere-Driven Apartment cztery projekty z gotowymi podstronami są widoczne od razu, a pełna kolekcja zawiera dziewięć pozycji. Dane wcześniejszego katalogu porównano z poprzednim commitem — pozostały identyczne.

## Midnight Garden

- Dotychczasową roboczą nazwę „Nokturn w śródziemnomorskim salonie” zastąpiono nazwą z przekazanego dossier: Midnight Garden. Kafel w portfolio oraz hero Wnętrz prowadzą do `midnight-garden.html`; projekt jest widoczny jako pierwszy. Pozostałe koncepcje zachowano.
- Z archiwów pobrano pięć unikalnych PNG: 1, 2, 3, 5 i 6. Paczka 3_poprawka zawiera identyczną kopię 3.png. Pliku 4.png ani ujęcia w świetle dziennym wymienionego w scenariuszu dossier nie było w udostępnionych plikach. Publiczna strona prezentuje dostępne ujęcia bez pustych miejsc.
- Opisy PL i EN, nazwa, rok 2026, kierunek artystyczny, materiały i status projektu pochodzą z Midnight_Garden_Art_of_Meaning_Portfolio_Guide.pdf. Dodano pełny opis ES. Projekt jest oznaczony jako koncepcja z wizualizacjami wspomaganymi AI. Zalecenia edytorskie w PDF potraktowano jako kontekst, a nie polecenie zmiany domeny lub retuszowania dzieł.
- Oryginalne PNG i PDF zachowano bez zmian w `archive/midnight-garden-originals/`, poza publikowaną stroną. Bezstratne WebP w `assets/images/midnight-garden/` mają identyczne rozdzielczości i piksele; porównanie pięciu plików zakończyło się powodzeniem.
- Suwak ma rzeczywiste ujęcia bez malowidła (2) i z malowidłem (1), jako studium tej samej koncepcji. Zniknęło puste pole. Podstrona zawiera także wejście (5), detal baru (3) i ogród o zmierzchu (6), z powiększaniem i pełnym rozmiarem.
- `previews/midnight-garden-checks.json`: 15 kontroli projektu w trzech językach na szerokościach 320/390/768/1024/1440; nawigacja z kafla myszą/klawiaturą, semantyka metryki i statusu, poprawne obrazy, zachowanie proporcji, powiększanie i fokus, suwak oraz dwa kanały zapytania. Brak błędów JavaScript. Zrzuty: `previews/midnight-garden-desktop.png`, `previews/midnight-garden-mobile.png` oraz porównanie.
