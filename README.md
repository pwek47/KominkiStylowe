# Kominki Stylowe – strona www

Statyczna strona firmy **Kominki Stylowe** (Starachowice). Czysty HTML/CSS/JS – bez kompilacji, działa na każdym hostingu i na GitHub Pages.

## Struktura

| Plik | Opis |
|---|---|
| `index.html` | Strona główna: hero, o nas, salon, oferta, realizacje, jak pracujemy, partnerzy, opinie, poradnik, FAQ, kontakt |
| `kominki-nowoczesne.html`, `kominki-klasyczne.html`, `kominki-stylowe.html`, `kominki-rustykalne.html` | Strony ofertowe pod wyszukiwania w Google („kominki stylowe Starachowice” itd.) – tekst, zdjęcia z danej kategorii, pytania i odpowiedzi |
| `poradnik.html`, `poradnik-*.html` | Poradnik kominkowy – lista i 4 artykuły |
| `dziekujemy.html` | Strona po wysłaniu formularza (gdy przeglądarka ma wyłączony JavaScript) |
| `polityka-prywatnosci.html` | Polityka prywatności (RODO) |
| `404.html` | Strona błędu 404 |
| `kontakt.html` | Przekierowanie na `index.html#kontakt` (zachowuje stare linki) |
| `galeria.html`, `o-nas.html`, `book-online.html` itd. | Przekierowania ze starych adresów strony Wix na odpowiednie sekcje i strony |
| `style.css`, `script.js` | Wygląd i interakcje |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | SEO i ikona aplikacji |

## Jak dodać zdjęcia realizacji

1. Przygotuj zdjęcie: `.jpg`, maks. 1600 px szerokości, poniżej ~300 KB, bez danych EXIF (mogą zawierać lokalizację GPS).
   Nazwa pliku opisowa, z prefiksem kategorii, np. `nowoczesne-szyba-narozna.jpg`. Wgraj do `images/realizacje/`.
2. W `index.html`, w sekcji `#realizacje`, dodaj nowy `<figure>` w grupie swojej kategorii
   (kolejność: nowoczesne, klasyczne, stylowe, rustykalne):
   ```html
   <figure class="gallery-item reveal" data-category="nowoczesne">
     <img src="images/realizacje/nazwa.jpg" alt="Krótki opis kominka po polsku" loading="lazy" width="1600" height="1200">
     <figcaption>Kominek nowoczesny · krótki podpis</figcaption>
   </figure>
   ```
   `width` i `height` to rzeczywiste wymiary pliku. Pierwsze zdjęcie ma klasę `gallery-wide` (duży kafel) – najlepiej poziome.
3. Atrybut `data-category` (`stylowe`, `rustykalne`, `nowoczesne`, `klasyczne`) decyduje o filtrze.
   Kliknięte zdjęcie otwiera się w podglądzie.
4. Ten sam `<figure>` (bez klas `reveal` i `gallery-wide`) wklej też do galerii na stronie danej kategorii,
   np. `kominki-nowoczesne.html` – te strony pomagają w wyszukiwaniu w Google.

## Zmiany w CSS i JS

Po zmianie `style.css` lub `script.js` podnieś numer wersji w linkach we wszystkich plikach `.html`
(np. `style.css?v=3` → `?v=4`). GitHub Pages pozwala przeglądarkom trzymać pliki przez 10 minut – bez tego
część odwiedzających zobaczy nowy HTML ze starym wyglądem.

## Formularz kontaktowy – ważne przy uruchomieniu

Formularz wysyła wiadomości bezpośrednio na **biuro@kominkistylowe.pl** przez darmową usługę
[FormSubmit](https://formsubmit.co) – bez zakładania konta i bez serwera.

1. Po opublikowaniu strony wyślij przez formularz jedną wiadomość testową.
2. Na biuro@kominkistylowe.pl przyjdzie e-mail od FormSubmit z prośbą o aktywację – kliknij **Activate Form**.
3. Od tej chwili każde zapytanie przychodzi na skrzynkę (sprawdź też folder SPAM przy pierwszych wiadomościach).
   Pole „E-mail” klienta jest ustawione jako adres odpowiedzi – wystarczy kliknąć „Odpowiedz”.

Opcjonalnie: w e-mailu aktywacyjnym FormSubmit podaje losowy ciąg znaków – można nim zastąpić adres
e-mail w atrybucie `action` formularza w `index.html`, żeby adres nie był widoczny w kodzie strony.

## Opinie Google

Sekcja `#opinie` linkuje do wizytówki Google. Aby pokazać ocenę i wybrane opinie:
- w `index.html` przy `<p class="rating" hidden>` usuń `hidden` i wpisz aktualną ocenę i liczbę opinii,
- wklej prawdziwe opinie według wzoru z komentarza nad `<div class="reviews">`.

Publikuj tylko prawdziwe opinie klientów, bez zmieniania ich treści.

## Poradnik

Każdy artykuł to osobny plik `poradnik-*.html`. Nowy artykuł: skopiuj istniejący, zmień tytuł, opis
(`<meta name="description">`), treść i adres w `canonical`, a następnie dodaj kartę w `poradnik.html`,
w sekcji `#poradnik` w `index.html` i wpis w `sitemap.xml`.

## Co zawiera strona

- responsywny układ (telefon / tablet / komputer), menu mobilne,
- SEO: opisy meta, Open Graph, dane strukturalne `LocalBusiness` (adres, godziny, NIP), sitemap, robots,
- dostępność: link „Przejdź do treści”, etykiety ARIA, obsługa klawiatury, `prefers-reduced-motion`,
- RODO: mapa Google ładowana dopiero po kliknięciu, polityka prywatności, zgoda w formularzu,
- status „Otwarte / Zamknięte” wg godzin otwarcia, przycisk szybkiego dzwonienia na telefonie,
- wersja mobilna: menu pełnoekranowe, lżejsze zdjęcie tła (`images/hero-mobile.jpg`), obsługa wcięć ekranu iPhone.
