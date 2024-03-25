# moodlePlus
Moodle tesztmegoldó

**!! Tapasztalatlan programozó fércmunkája, az esetleges hibákért felelősséget nem tudok vállalni !!**

<br>

# Telepítés

A szkript a legtöbb modern böngészőre telepíthető.<br>

1. Telepítsd a **Violentmonkey** kiegészítőt az alábbi oldalak egyikéről:
    * [Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
    * [Google Chrome](https://chromewebstore.google.com/detail/jinjaccalgkegednnccohejagnlnfdag?hl=hu&utm_source=ext_sidebar)
    * [Új Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
1. Most már telepítheted a Terc-PLUS szkriptet. Ehhez [kattints ide](https://github.com/MentalGravis/moodlePlus/releases/latest/download/moodlePlus.user.js).
1. A megjelenő oldalon kattints az **Install** gombra.
1. Kész is vagy, kezdheted a moodle teszted.


<br>

# Funkciók

1. Beolvassa a kérdést és válaoszokat, ezeket a Violentmonkey memóriájába menti
   * A GM_setValue/GM_getValue segítségével
   * Kulcs a moodle teszt tetején olvasható elérési út -> ha a teszteknek más a neve, egyedi lesz minden teszt neve
   * Az érték egy dict, amiben a kulcs a kérdés, az érték egy dict, melyben a kulcs a válasz, az érték pedig a válasz helyessége (jelenleg boolean)
   * {teszt felső sor:{kérdés:{válasz:bool,válasz2:bool,válasz3:bool,...},kérdés2:{válasz:bool,válasz2:bool,...},...}}
   * A dictet végül nem JSON.stingify-olom, mert így sem ad hibát, ellenben gyorsabb, kevesebb műveletet kell végezni, és még a mentett értékek is jobban olvashatóak
1. Ami az értékeknél true-ra van állítva, azt zölden kiemeli
1. Jelenleg csak a Violentmonkey felületén lehet a válaszok értékét változtatni!

<br>
<!---
# Képek

**Export All gomb**<br>
<picture>
<img alt="Export All gomb" src="img/terc_plus_export_all_button.png">
</picture>

<br>
--->

# Jelenleg ismert hibák

Ha új hibát észlelsz, vagy új funkció beépítésére szeretnél ajánlatot tenni, [itt megteheted](https://github.com/MentalGravis/moodlePlus/issues)

- [x] cirip
<!---
- [x] [~~Néha a menüsor gombaji furcsán jelennek meg, és a fejlécbe lógnak~~](https://github.com/MentalGravis/Terc-PLUS/issues/2)
- [x] [~~Néha több ajánlat megnyitása utána a címsor helye üresen megmarad, ami a fejléc szétcsúszásához vezet~~](https://github.com/MentalGravis/Terc-PLUS/issues/3)
- [x] [~~(Opcionális) Ajánlat teljes árának pénzneme fekete, míg a sorban a többi mértékegység kék~~](https://github.com/MentalGravis/Terc-PLUS/issues/4)
- [x] [~~Nem látszik a teljes összeg!~~](https://github.com/MentalGravis/Terc-PLUS/issues/17)
--->
<br>

# Lehetséges új funkciók

1. Először a legegyszerűbb, feleletválasztós kérdések megoldása a cél
   - Egyenlőre nem veszem figyelembe, hogy a végén megadja-e a jó megoldásokat, olyan teszthez használom, mely esetben ez nem áll fent
   - A kitöltést figyeli és menti el az állapotokat {kérdés:{válasz:chboxStateBool,válasz2:checkboxStateBool},kérdés2...}
   - Legközelebb, ha ugyanazon kérdés előkerül, akkor egy kis ablakban kiírja a legutóbb megadott választ és színezze meg az adott kérdés hátterét
1. A teszt leadásakor jelenjen meg egy gomb, amire kattintva kijön egy ablak, amiben megmutatja, hogy mely kérdésere milyen válaszlehetőségek vannak, és miket adtunk meg, és az eltér-e az előző kitöltéstől/kitöltésektől
   - Ha nem, nem történik új bejegyzés, de megjelölhető biztosként/kétségesként (opcionális)
     - amikor következőleg kitöltésre kerül, akkor a kétségesek háttere szürke, a biztosé zöld, nincs más hatása
   - Ha új kérdés, akkor az alaptáblába történik a bejegyzés
   - Ha full pont, akkor az alaptáblába bejegyzésre kerül az összes kérdés
   - Ha eltérés van, és nem full pont, akkor újra felvételre kerül a kérdés, és a kitöltés sorszáma feljegyzésre kerül
     - A következő kitöltésnél minden már próbált válaszlehetőséget mutat, a kitöltési sorszámmal együtt 
1. Import-Export funkció
   - Alaptáblát exportálja
   - Több fajta export
     - JSON-ba, hogy más böngészőbe is beolvasható legyen
     - Emberi olvasható
       - txt fomrázva?
       - html formázva?
