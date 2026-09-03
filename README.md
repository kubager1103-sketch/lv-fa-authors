# LV-FA – Offline databáze autorů

Tato verze je čistě statická PWA. Nepotřebuje Node.js, Render, Google účet ani databázový server.

## Jak fungují data
- Autoři se ukládají do `localStorage` přímo v konkrétním prohlížeči/zařízení.
- iPhone a PC mají vlastní kopii dat.
- Přes ikonu databáze vpravo nahoře lze databázi exportovat do JSON a později importovat na jiném zařízení.
- Předvyplněni jsou autoři z původních poznámek.
- Kliknutí na kredit u zdroje ho okamžitě zkopíruje do schránky.

## Rychlé lokální otevření
`index.html` lze otevřít přímo pro kontrolu vzhledu a dat. Service worker/PWA instalace ale vyžaduje web přes HTTPS (nebo localhost).

## Nasazení
Nahraj celý obsah této složky na libovolný statický HTTPS hosting (např. GitHub Pages nebo Cloudflare Pages). Není potřeba build ani server.

Na iPhonu pak otevři web v Safari → Sdílet → Přidat na plochu. Po prvním načtení se aplikační shell uloží offline.


## Název a ikona aplikace

Aplikace se jmenuje **LV-FA | Authors**. Hlavní zdrojová ikona je `assets/LV-FA_ICON.png`.
Pokud ji někdy chceš změnit, nahraď tento soubor PNG souborem se stejným názvem. Pro iPhone/PWA jsou v `assets/` také odvozené soubory `apple-touch-icon.png`, `pwa-192.png` a `pwa-512.png`.
