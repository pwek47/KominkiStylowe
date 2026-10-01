# Domena, hosting i przeniesienie z Wix

Najważniejsze informacje techniczne o stronie kominkistylowe.pl: gdzie działa, jak się ją publikuje
i jak przenieść domenę ze starej strony Wix na tę stronę. Bez haseł i danych osobowych – repozytorium jest publiczne.

## Stan obecny (październik 2026)

| Co | Gdzie |
|---|---|
| Nowa strona (ten kod) | GitHub Pages, gałąź `main` – https://pwek47.github.io/KominkiStylowe/ |
| Stara strona | Wix – https://www.kominkistylowe.pl |
| Rejestrator domeny | Alphanet sp. z o.o. (panel Forpsi) – domena **nie** jest kupiona w Wix |
| Serwery DNS domeny | Wix: `ns6.wixdns.net`, `ns7.wixdns.net` |
| Poczta biuro@kominkistylowe.pl | Forpsi (`mxavas.forpsi.com`) – niezależna od Wix i od GitHub |
| Formularz kontaktowy | FormSubmit → biuro@kominkistylowe.pl (aktywacja opisana w `README.md`) |
| Mapa / opinie Google | https://maps.google.com/?cid=698191495336388782 |
| Facebook | https://www.facebook.com/StyloweKominki/ |

## Publikowanie zmian

- Każdy `git push` na gałąź `main` publikuje stronę automatycznie (GitHub Pages, ok. 1 minuta).
- GitHub Pages pozwala przeglądarkom trzymać pliki przez 10 minut. Po zmianie `style.css` lub `script.js`
  podnieś numer wersji w linkach we **wszystkich** plikach `.html` (`style.css?v=3` → `?v=4`, tak samo `script.js`),
  inaczej część odwiedzających zobaczy nowy HTML ze starym CSS.
- Zdjęcia do galerii: maks. 1600 px szerokości, poniżej ~300 KB, bez danych EXIF (mogą zawierać lokalizację GPS),
  opisowa nazwa pliku i polski tekst `alt`. Szczegóły w `README.md`.

## Rekordy DNS – stan w Wix przed przeniesieniem

Spisane z panelu DNS Wix. Wszystko oprócz dwóch rekordów strony (A dla domeny i CNAME `www`) dotyczy poczty Forpsi
i **musi zostać zachowane**, inaczej przestanie działać poczta.

| Typ | Nazwa | Wartość | Uwagi |
|---|---|---|---|
| A | `kominkistylowe.pl` | `185.230.63.171`, `185.230.63.186`, `185.230.63.107` | Wix – **zamienić** (niżej) |
| CNAME | `www` | `cdn3.wixdns.net` | Wix – **zamienić** (niżej) |
| A | `e.kominkistylowe.pl` | `185.129.138.39` | serwer poczty Forpsi – zostawić |
| CNAME | `imap` | `imap.forpsi.com` | zostawić |
| CNAME | `smtp` | `smtpa.forpsi.com` | zostawić |
| CNAME | `webmail` | `webmail.forpsi.com` | zostawić |
| CNAME | `blog`, `calendar`, `correio`, `docs`, `email`, `mail`, `mobilemail`, `owa`, `pda`, `pop`, `smtpout` | `e.kominkistylowe.pl` | domyślne aliasy Forpsi – zostawić |
| MX | `kominkistylowe.pl` | `mxavas.forpsi.com` (priorytet 10), `spf.forpsi.com` (priorytet 20) | zostawić |
| TXT | `kominkistylowe.pl` | `v=spf1 a mx include:_spf.forpsi.com ~all` | zmienić – patrz niżej |
| TXT | `f2020._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxn0cTHaBdlKWATNegLnH608lpsnHz8WSkKALFqoRXFPj1NBYrCJ1rPoihlJtCwrXhJF34kypRFcuNBJEodXg3i/mIhWRV/aAmyIMpF5mxcXTF42RV7r90HKEUFQzdF6Ub4wbCjGMl7hGJli2IYYFKHA/xG2aJdFn8I/mpdKOXWL1FlEyniS/Swc1VX8+SBdt+sHXDoOeZ3qLkwgHMwA4bRIwN5pQJISB01OJVlpKEQ2Ogs3QjcQKPmNrgtp7MwBFgirZoVaEwUdUZtmMrwdlrrNzMMBPG5mRRxgGfLsPzVm5odvsOHSKBIRWtF3MR8/yCYuht2q5bfQ09icr8/U5jwIDAQAB` | klucz DKIM poczty – zostawić bez zmian |

Brak rekordów AAAA, CAA i SRV.

## Rekordy DNS – stan docelowy

| Typ | Nazwa | Wartość |
|---|---|---|
| A | `kominkistylowe.pl` | `185.199.108.153` |
| A | `kominkistylowe.pl` | `185.199.109.153` |
| A | `kominkistylowe.pl` | `185.199.110.153` |
| A | `kominkistylowe.pl` | `185.199.111.153` |
| CNAME | `www` | `pwek47.github.io` |
| TXT | `kominkistylowe.pl` | `v=spf1 mx include:_spf.forpsi.com ~all` |

Oraz wszystkie rekordy poczty z tabeli wyżej bez zmian. SPF traci `a`, bo po przeniesieniu adres domeny wskazuje
na serwery GitHub, które nie wysyłają naszej poczty.

## Przeniesienie krok po kroku

1. **Przygotuj strefę w Forpsi.** W panelu Forpsi (Alphanet) w zarządzaniu DNS domeny wpisz wszystkie rekordy
   ze „stanu docelowego” i rekordy poczty. Forpsi zwykle sam tworzy swoje domyślne aliasy – sprawdź, czy są
   wszystkie, szczególnie rekord DKIM.
2. **Zmień serwery DNS** domeny w panelu Forpsi z `ns6/ns7.wixdns.net` na domyślne serwery DNS Forpsi.
3. **Dodaj domenę w repozytorium** (dopiero gdy DNS wskazuje na GitHub – wcześniej github.io przekierowywałby na Wix):
   - plik `CNAME` w katalogu głównym z treścią `kominkistylowe.pl`,
   - zamień `https://pwek47.github.io/KominkiStylowe/` na `https://kominkistylowe.pl/` w `og:image` i `logo`
     we wszystkich plikach `.html`.
4. **Ustawienia GitHub:** repozytorium → Settings → Pages → Custom domain: `kominkistylowe.pl`, po chwili zaznacz
   **Enforce HTTPS**. Zalecane: w ustawieniach konta GitHub → Pages → *Add a domain* zweryfikuj domenę rekordem TXT
   (chroni przed przejęciem domeny przez inne repozytorium).
5. **Test (po kilku godzinach):** strona otwiera się pod `kominkistylowe.pl` i `www.kominkistylowe.pl` z kłódką HTTPS,
   stare adresy (np. `/galeria`) przekierowują, poczta biuro@ odbiera i wysyła, formularz dochodzi.
6. **Dopiero potem anuluj Wix:** konto Wix → Subskrypcje → anuluj plan Premium lub wyłącz automatyczne odnowienie.
   Domeny nie trzeba przenosić. Wix zwraca pieniądze zwykle tylko w ciągu 14 dni od zakupu – anuluj tuż przed
   odnowieniem. Stronę Wix najpierw tylko cofnij z publikacji, nie usuwaj od razu.
7. Po przeniesieniu: w Google Search Console dodaj domenę i wyślij `sitemap.xml`; sprawdź link do strony w wizytówce
   Google i na Facebooku (na Facebooku zmień `http://` na `https://`).

## Stare adresy z Wix

Strona Wix miała podstrony, do których mogą prowadzić linki z Google i Facebooka. Każdą obsługuje plik-przekierowanie
na odpowiednią sekcję `index.html`:

| Stary adres | Przekierowanie |
|---|---|
| `/galeria`, `/kominki-stylowe`, `/kopia-kominki-nowoczesne`, `/kopia-kominki-stylowe` | `#realizacje` |
| `/o-nas` | `#o-nas` |
| `/nasze-produkty` | `#oferta` |
| `/nasi-partnerzy` | `#partnerzy` |
| `/book-online`, `/service-page/wizyta-w-sklepie` | `#kontakt` |

Strona Wix miała też **rezerwację wizyt online** („Wizyta w sklepie”). Po wyłączeniu Wix tę rolę przejmuje
formularz kontaktowy i telefon. Jeśli rezerwacja online będzie znów potrzebna, można podpiąć np. kalendarz
rezerwacji Google pod przycisk „Umów wizytę”.
