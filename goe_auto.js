
var automatik = false;
var akku_groesse =35.8; //Speichergröße des Akkus
var akku_nachladung; // Erforderliche Nachladung im Akku
var ladung_min =6; //minimaler Ladestrom 
var ladung_max = 16; //maximaler Ladestrom
var ladung_notwendig; //Notweniger Ladestrom in A
var ladung_errechnete_dauer; // Notwenige Ladestunden
var ok_min; //Akku kann mit minimalem Strom beladen werden
var ok_max; //Akku kann mit maximalem Strom beladen werden
var soc;
var lade_ende = 6; // Wann geladen sein soll
var lade_verfuegbar; // Verfügbare Ladezeit in Stunden
var lade_stunden;
var akt_stunde;
var akt_minute;
var loggen = true;
var i;
var fahrplan ={};

for (i = 0; i < 24; i++) {
            fahrplan[i]=0;
        }

//javascript.0.go_echarger.write_soc
on({id: "javascript.0.go_echarger.write_soc",valLt: 100} ,function (obj) {
    automatik = true;
    soc = getState("javascript.0.go_echarger.write_soc").val;
    if (loggen) { log("Automatik EIN, neuer SOC gesetzt: " + soc)}
    ladedauer_berechnen();
    fahrplan_generieren();
    fahrplan_schreiben();
    });

on({id: "javascript.0.go_echarger.write_soc",val: 100} ,function (obj) {
    automatik = false;
    setState("javascript.0.go_echarger.write_alw",true);
    setState("javascript.0.go_echarger.write_amp",6);
    if (loggen) { log("Auto fertig geladen, Automatik AUS")}
    for (i = 0; i < 24; i++) {
            fahrplan[i]=0;
        }
    });

on({id: "javascript.0.go_echarger.car",val: 1} ,function (obj) {
    automatik = false;
    setState("javascript.0.go_echarger.write_alw",true);
    setState("javascript.0.go_echarger.write_amp",6);
    if (loggen) { log("Auto abgesteckt, Automatik AUS")}
    });

schedule('*/15 * * * * *', function(){
    if (automatik) {
        fahrplan_schreiben()
        }
    });

// Diese Funktion errechnet die aktuelle Ladedauer
function ladedauer_berechnen() {
// verfügbare Ladestunden berechnen
const heute = new Date();
akt_stunde = heute.getHours();
akt_minute = heute.getMinutes();
lade_verfuegbar = (24-akt_stunde+lade_ende)-1;//(0.25*Math.floor((60-akt_minute)/15));
if (loggen) { log("Verfügbare Ladezeit in Stunden: "+lade_verfuegbar)}
// Nachladung berechnen
akku_nachladung=akku_groesse*(100-soc)/100;
if (loggen) { log("Erforderliche Nachladung im Akku: "+akku_nachladung)}
// Akku kann mit minimalem Strom beladen werden
ok_min = (ladung_min*230*lade_verfuegbar)>akku_nachladung*1000;
if (loggen) { log("Akku kann mit minimalem Strom beladen werden: "+ok_min)}
// Akku kann mit maximalem Strom beladen werden
ok_max = (ladung_max*230*lade_verfuegbar)>akku_nachladung*1000;
if (loggen) { log("Akku kann mit maximalem Strom beladen werden: "+ok_max)}
// Notwendiger Ladestrom
ladung_notwendig=akku_nachladung*1000/(lade_verfuegbar*230);
ladung_notwendig=Math.ceil(ladung_notwendig);
if (ladung_notwendig<6) {ladung_notwendig=6}
if (ladung_notwendig>32) {ladung_notwendig=32}
if (loggen) { log("Notweniger Ladestrom in A: "+ladung_notwendig)}
// Errechnete Dauer
ladung_errechnete_dauer = 1000*akku_nachladung/(ladung_notwendig*230);
ladung_errechnete_dauer = Math.ceil(ladung_errechnete_dauer);
if (loggen) { log("Notwenige Ladestunden: "+ladung_errechnete_dauer)}
}

// Diese Funktion schreibt den Wert in die Ladebox
function fahrplan_schreiben() {
    const heute = new Date();
    akt_stunde = heute.getHours();
    akt_minute = heute.getMinutes();
    if ((fahrplan[akt_stunde]==0)){
        setState("javascript.0.go_echarger.write_alw",false);
        if (loggen) {log("Wallbox wurde gesperrt, da Fahrplan 0A")}
    } else {
        setState("javascript.0.go_echarger.write_alw",true);
        if (loggen) {log("Wallbox wurde freigegeben")}
    }
    
    if ((fahrplan[akt_stunde]>0) && (fahrplan[akt_stunde]+ueberschussladen())!=getState("javascript.0.go_echarger.amp").val) {
        if (loggen) {log("Ladestrom wird in Wallbox geschrieben");
                     log("Ladestrom aus Fahrplan: " + fahrplan[akt_stunde]);
                     log("Zusatzampere: " + ueberschussladen());
                     log("Geschriebener Wert: "+ (fahrplan[akt_stunde]+ueberschussladen()));
                     setState("javascript.0.go_echarger.write_amp",(fahrplan[akt_stunde]+ueberschussladen()));
        }
    } else {
        if (loggen) {log("Ladestrom in Wallbox bereits korrekt oder Automatik nicht aktiv");
                     log("Ladestrom aus Fahrplan: " + fahrplan[akt_stunde]);
                     log("Zusatzampere: " + ueberschussladen());
                     log("vorhandener Wert: "+ getState("javascript.0.go_echarger.amp").val);
        }
    } 
}

// Diese Funktion schreibt den Ladefahrplan
function fahrplan_generieren() {
ladung_errechnete_dauer++;
// Fahrplan löschen
for (i = 0; i < 24; i++) {
            fahrplan[i]=0;
        }
// Stunden zwischen jetzt und 18h
if (akt_stunde<=18) {
    for (i = akt_stunde; i < 18; i++) {
        if (ladung_errechnete_dauer>=0) {
            fahrplan[i]=ladung_notwendig;
            ladung_errechnete_dauer--;
        } else {
            fahrplan[i]=0;
        }
    }
}
// Stunden zischen 0 und 5h
for (i = 5; i >= 0;i--) {
        if (ladung_errechnete_dauer>=0) {
            fahrplan[i]=ladung_notwendig;
            ladung_errechnete_dauer--;
        } else {
            fahrplan[i]=0;
        }
    }
// Stunden zwischen 18 und 24h    
for (i = 24; i >= 18;i--) {
        if (ladung_errechnete_dauer>=0) {
            fahrplan[i]=ladung_notwendig;
            ladung_errechnete_dauer--;
        } else {
            fahrplan[i]=0;
        }
    }  
// Stunden zwischen 6 und 9 für die Vorklimatisierung auf 6A
for (i = 6; i <= 9;i++) {
        fahrplan[i]=6;
    }
//Log darstellen
if (loggen) { 
    for (i = 0; i < 24; i++) {
        log("Stunde "+i+":"+fahrplan[i]);
    }
}
}


// Diese Funktion gibt die Zusatzstufen für das Überschussladen wieder
function ueberschussladen() {
    var zusatzstufen;
    var leistung;
    leistung=getState("sma-em.0.1900232044.psurplus").val-getState("sma-em.0.1900232044.pregard").val+getState("javascript.0.go_echarger.nrg11").val*1000;
    if (leistung<0) {
        leistung=0;
    }
    zusatzstufen = leistung / 230;
    //if (loggen) {log("PV Laden Rückspeisung ohne EV [W]: "+leistung);}
    //if (loggen) {log("PV Laden zusatzstufen [A]: "+Math.ceil(zusatzstufen));}
    //if (loggen) {log("PV Laden zusatzstufen [W]: "+Math.ceil(zusatzstufen) *230);}
    return Math.ceil(zusatzstufen);
}
    
