# Kominki Stylowe – strona www

Statyczna strona firmy **Kominki Stylowe Marek Wiśniewski** (Starachowice). Czysty HTML/CSS/JS – bez kompilacji, działa na każdym hostingu i na GitHub Pages.

## Struktura

| Plik | Opis |
|---|---|
| `index.html` | Strona główna: hero, o nas, salon, oferta, realizacje, jak pracujemy, partnerzy, FAQ, kontakt |
| `polityka-prywatnosci.html` | Polityka prywatności (RODO) |
| `404.html` | Strona błędu 404 |
| `kontakt.html` | Przekierowanie na `index.html#kontakt` (zachowuje stare linki) |
| `style.css`, `script.js` | Wygląd i interakcje |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | SEO i ikona aplikacji |

## Jak dodać zdjęcia realizacji

1. Wgraj zdjęcia (najlepiej `.jpg`, ok. 1600 px szerokości, < 400 KB) do `images/realizacje/`.
2. W `index.html`, w sekcji `#realizacje`, zamień w wybranym `<figure>`:
   ```html
   <div class="ph ph-1" aria-hidden="true"></div>
   ```
   na:
   ```html
   <img src="images/realizacje/nazwa.jpg" alt="Krótki opis kominka" loading="lazy">
   ```
3. Atrybut `data-category` (`stylowe`, `rustykalne`, `nowoczesne`, `klasyczne`) decyduje o filtrze.
   Kliknięte zdjęcie otwiera się w podglądzie.

## Formularz kontaktowy

Formularz otwiera program pocztowy z gotową wiadomością do `biuro@kominkistylowe.pl`.
Aby wiadomości wysyłały się bezpośrednio ze strony, można podpiąć np. [Formspree](https://formspree.io)
lub skrypt PHP na hostingu (zmienić `action` formularza i usunąć obsługę `submit` w `script.js`).

## Co zawiera strona

- responsywny układ (telefon / tablet / komputer), menu mobilne,
- SEO: opisy meta, Open Graph, dane strukturalne `LocalBusiness` (adres, godziny, NIP), sitemap, robots,
- dostępność: link „Przejdź do treści”, etykiety ARIA, obsługa klawiatury, `prefers-reduced-motion`,
- RODO: mapa Google ładowana dopiero po kliknięciu, polityka prywatności, zgoda w formularzu,
- status „Otwarte / Zamknięte” wg godzin otwarcia, przycisk „Porozmawiajmy!”, szybkie dzwonienie na telefonie.

Wykonanie: Piotr Wiśniewski
