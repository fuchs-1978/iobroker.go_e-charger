var json = '{"version":"B"} ';
var ip ="192.168.123.116";
var link_temp;
var link_parameter ="http://"+ ip + "/mqtt?payload=";
var request = require('request');
//Notice - module request is available via variable request. There is no need to write var request = require('request');.
var goe_status = JSON.parse(json);

var response;
var error;
var error_tmp = false;
var body;
var loggen = false;
var n;


var version;         
var rbc;             
var rbt;            
var car;            
var amp;            
var err;            
var ast;            
var alw;             
var stp;             
var cbl;             
var pha;             
var tmp;             
var dws;             
var dwo;             
var adi;             
var uby;             
var eto;             
var wst;             
var nrg;             
var fwv;             
var sse;            
var wss;             
var wke;            
var wen;             
var tof;             
var tds;             
var lbr;            
var aho;           
var afi;            
var ama;             
var al1;             
var al2;             
var al3;             
var al4;            
var al5;            
var cid;             
var cch;            
var cfi;             
var lse;             
var ust;            
var wak;             
var r1x;             
var dto;             
var nmo;             
var eca;             
var ecr;            
var ecd;             
var ec4;             
var ec5;            
var ec6;             
var ec7;            
var ec8;             
var ec9;            
var ec1;             
var rca;             
var rcr;             
var rcd;             
var rc4;             
var rc5;            
var rc6;             
var rc7;            
var rc8;            
var rc9;            
var rc1;             
var rna;             
var rnm;             
var rne;             
var rn4;            
var rn5;            
var rn6;             
var rn7;           
var rn8;            
var rn9;           
var rn1;            
var ul1;             
var ul2;             
var ul3;             
var unn;            
var il1;            
var il2;            
var il3;             
var pl1;             
var pl2;             
var pl3;            
var pnn;             
var psu;            
var cl1;           
var cl2;
var c13;
var cnn;  

createAllStates();
json_pollen();

schedule('*/30 * * * * *',function () { json_pollen("/status");})  // je Minute
on({id: "javascript.0.go_echarger.write_alw", change: 'any'},function () {setzen_alw()});
on({id: "javascript.0.go_echarger.write_amp", change: 'any'},function () {setzen_amp()});


function json_pollen(link) {
    json = '{"version":"B"} ';
    if (loggen) { log("Pollen");}
    request("http://"+ ip + link, function(error, response, json) {
        //if(error) log('Fehler request: ' + error, 'error');
        //log("Error "+ error);
        //log("Response "+ response);
        //log("Body "+ json);
        // Fehler ist Aufgetreten
        if (error !==null) {
            log('Fehler aufgetreten: ' + error,"error");
            setState("javascript.0.go_echarger.online",false);
            return;
        }
        // Fehler ist Aufgetreten
        n=json.includes("Not found");
        if (n) {
            log('Fehler aufgetreten: ' + json,"error");
            error_tmp = true;
        }
        // Fehler ist Aufgetreten
        n=json.includes("not found");
        if (n) {
            log('Fehler aufgetreten: ' + json,"error");
            error_tmp = true;
        }
        // Fehler ist Aufgetreten
        n=json.includes("Error 404");
        if (n) {
            log('Fehler aufgetreten: ' + json,"error");
            error_tmp = true;
        }
        // Fehler ist Aufgetreten
        n=json.includes("003401");
        if (error_tmp == false){
            if (n) {
                if (loggen) { log('Seriennummer im String gefunden');}
                goe_status = JSON.parse(json);
                json_zerlegen();
                setState("javascript.0.go_echarger.online",true);
            } else {
                setState("javascript.0.go_echarger.online",false);
            }
        }
        error_tmp = false;
    });
    
}

//Body Not found

//Ergebnisse zuweisen
function json_zerlegen(){
if (loggen) {log ("JSON zerlegen");}
rbc             =   parseInt(goe_status.rbc);
rbt             =   parseInt(goe_status.rbt);
car             =   parseInt(goe_status.car);
amp             =   parseInt(goe_status.amp);
err             =   parseInt(goe_status.err);
ast             =   parseInt(goe_status.ast);
alw             =   parseInt(goe_status.alw);
stp             =   parseInt(goe_status.stp);
cbl             =   parseInt(goe_status.cbl);
pha             =   parseInt(goe_status.pha);
tmp             =   parseInt(goe_status.tmp);
dws             =   parseInt(goe_status.dws)*0.277/1000000; 
dwo             =   parseInt(goe_status.dwo);
adi             =   parseInt(goe_status.adi);
uby             =   parseInt(goe_status.ast);
eto             =   parseInt(goe_status.alw);
wst             =   parseInt(goe_status.stp);
nrg             =   goe_status.nrg;
fwv             =   goe_status.fwv;
sse             =   goe_status.sse;
wss             =   goe_status.wss;
wke             =   goe_status.wke;
wen             =   parseInt(goe_status.wen);
tof             =   parseInt(goe_status.tof);
tds             =   parseInt(goe_status.tds);
lbr             =   parseInt(goe_status.lbr);
aho             =   parseInt(goe_status.aho);
afi             =   parseInt(goe_status.afi);
ama             =   parseInt(goe_status.ama);
al1             =   parseInt(goe_status.al1);
al2             =   parseInt(goe_status.al2);
al3             =   parseInt(goe_status.al3);
al4             =   parseInt(goe_status.al4);
al5             =   parseInt(goe_status.al5);
cid             =   parseInt(goe_status.cid);
cch             =   parseInt(goe_status.cch);
cfi             =   parseInt(goe_status.cfi);
lse             =   parseInt(goe_status.lse);
ust             =   parseInt(goe_status.ust);
wak             =   goe_status.wak;
r1x             =   parseInt(goe_status.r1x);
dto             =   parseInt(goe_status.dto);
nmo             =   parseInt(goe_status.nmo);
eca             =   parseInt(goe_status.eca)*0.1;
ecr             =   parseInt(goe_status.ecr)*0.1;
ecd             =   parseInt(goe_status.ecd)*0.1;
ec4             =   parseInt(goe_status.ec4)*0.1;
ec5             =   parseInt(goe_status.ec5)*0.1;
ec6             =   parseInt(goe_status.ec6)*0.1;
ec7             =   parseInt(goe_status.ec7)*0.1;
ec8             =   parseInt(goe_status.ec8)*0.1;
ec9             =   parseInt(goe_status.ec9)*0.1;
ec1             =   parseInt(goe_status.ec1)*0.1;
rca             =   goe_status.rca;
rcr             =   goe_status.rcr;
rcd             =   goe_status.rcd;
rc4             =   goe_status.rc4;
rc5             =   goe_status.rc5;
rc6             =   goe_status.rc6;
rc7             =   goe_status.rc7;
rc8             =   goe_status.rc8;
rc9             =   goe_status.rc9;
rc1             =   goe_status.rc1;
rna             =   goe_status.rna;
rnm             =   goe_status.rnm;
rne             =   goe_status.rne;
rn4             =   goe_status.rn4;
rn5             =   goe_status.rn5;
rn6             =   goe_status.rn6;
rn7             =   goe_status.rn7;
rn8             =   goe_status.rn8;
rn9             =   goe_status.rn9;
rn1             =   goe_status.rn1;
ul1             =   parseInt(goe_status.nrg[0]);
ul2             =   parseInt(goe_status.nrg[1]);
ul3             =   parseInt(goe_status.nrg[2]);
unn             =   parseInt(goe_status.nrg[3]);
il1             =   parseInt(goe_status.nrg[4])*0.1;
il2             =   parseInt(goe_status.nrg[5])*0.1;
il3             =   parseInt(goe_status.nrg[6])*0.1;
pl1             =   parseInt(goe_status.nrg[7])*0.1;
pl2             =   parseInt(goe_status.nrg[8])*0.1;
pl3             =   parseInt(goe_status.nrg[9])*0.1;
pnn             =   parseInt(goe_status.nrg[10])*0.1;
psu             =   parseInt(goe_status.nrg[11])*0.01;
cl1             =   parseInt(goe_status.nrg[12]);
cl2             =   parseInt(goe_status.nrg[13]);
cl3             =   parseInt(goe_status.nrg[14]);
cnn             =   parseInt(goe_status.nrg[15]);

// Werte in Variablen schreiben

setStategep("javascript.0.go_echarger.car",car);
setStategep("javascript.0.go_echarger.amp",amp);
setStategep("javascript.0.go_echarger.err",err);
if (alw===1) {
    setState("javascript.0.go_echarger.alw",true);
} else {
    setState("javascript.0.go_echarger.alw",false);
}
setStategep("javascript.0.go_echarger.pha",pha);
setStategep("javascript.0.go_echarger.tmp",tmp);
setStategep("javascript.0.go_echarger.dws",dws);
setStategep("javascript.0.go_echarger.eto",eto);
setStategep("javascript.0.go_echarger.nrg0",ul1);
setStategep("javascript.0.go_echarger.nrg1",ul2);
setStategep("javascript.0.go_echarger.nrg2",ul3);
setStategep("javascript.0.go_echarger.nrg3",unn);
setStategep("javascript.0.go_echarger.nrg4",il1);
setStategep("javascript.0.go_echarger.nrg5",il2);
setStategep("javascript.0.go_echarger.nrg6",il3);
setStategep("javascript.0.go_echarger.nrg7",pl1);
setStategep("javascript.0.go_echarger.nrg8",pl2);
setStategep("javascript.0.go_echarger.nrg9",pl3);
setStategep("javascript.0.go_echarger.nrg10",pnn);
setStategep("javascript.0.go_echarger.nrg11",psu);
setStategep("javascript.0.go_echarger.nrg12",cl1);
setStategep("javascript.0.go_echarger.nrg13",cl2);
setStategep("javascript.0.go_echarger.nrg14",cl3);
setStategep("javascript.0.go_echarger.nrg15",cnn);
setStategep("javascript.0.go_echarger.fwv",fwv);
}


function createAllStates(){

    createState("go_echarger.car", null, {
        name: 'Status PWM Signalisierung',
        desc: 'Status PWM Signalisierung',
        type: 'number',
        role: 'value',
    });
    
    createState("go_echarger.amp", null, {
        name: 'Ampere Wert für die PWM Signalisierung in ganzen Ampere',
        desc: 'Ampere Wert für die PWM Signalisierung in ganzen Ampere',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.err", null, {
        name: 'Error',
        desc: 'Error',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.alw", null, {
        name: 'Laden erlaubt',
        desc: 'Ladeb erlaubt',
        type: 'boolean',
        role: 'value',
    });

    createState("go_echarger.pha", null, {
        name: 'Phasen',
        desc: 'Phasen',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.tmp", null, {
        name: 'Temperatur',
        desc: 'Temperatur',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.dws", null, {
        name: 'geladene Energiemenge',
        desc: 'geladene Energiemende',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.eto", null, {
        name: 'gesamte Energiemenge',
        desc: 'gesamte Energiemenge',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg0", null, {
        name: 'Spannung L1',
        desc: 'Spannung L1',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg1", null, {
        name: 'Spannung L2',
        desc: 'Spannung L2',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg2", null, {
        name: 'Spannung L3',
        desc: 'Spannung L3',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg3", null, {
        name: 'Spannung N',
        desc: 'Spannung N',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg4", null, {
        name: 'Strom L1',
        desc: 'Strom L1',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg5", null, {
        name: 'Strom L2',
        desc: 'Strom L2',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg6", null, {
        name: 'Strom L3',
        desc: 'Strom L3',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg7", null, {
        name: 'Leistung L1',
        desc: 'Leistung L1',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg8", null, {
        name: 'Leistung L2',
        desc: 'Leistung L2',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg9", null, {
        name: 'Leistung L3',
        desc: 'Leistung L3',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg10", null, {
        name: 'Leistung N',
        desc: 'Leistung N',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg11", null, {
        name: 'Leistung gesamt',
        desc: 'Leistung gesamt',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg12", null, {
        name: 'cos L1',
        desc: 'cos L1',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg13", null, {
        name: 'cos L2',
        desc: 'cos L2',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg14", null, {
        name: 'cos L3',
        desc: 'cos L3',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.nrg15", null, {
        name: 'cos N',
        desc: 'cos N',
        type: 'number',
        role: 'value',
    });

    createState("go_echarger.fwv", null, {
        name: 'Firmware',
        desc: 'Firmware',
        type: 'string',
        role: 'value',
    });
    
    createState("go_echarger.write_alw", null, {
        name: 'Laden erlaubt',
        desc: 'Ladeb erlaubt',
        type: 'boolean',
        role: 'value',
    });
    
    createState("go_echarger.l1vs", null, {
        name: 'L1 liegt am Lader an',
        desc: 'L1 liegt am Lader an',
        type: 'boolean',
        role: 'value',
    });
    
    createState("go_echarger.l2vs", null, {
        name: 'L2 liegt am Lader an',
        desc: 'L2 liegt am Lader an',
        type: 'boolean',
        role: 'value',
    });
    
    createState("go_echarger.l3vs", null, {
        name: 'L3 liegt am Lader an',
        desc: 'L3 liegt am Lader an',
        type: 'boolean',
        role: 'value',
    });
    
    createState("go_echarger.l1ns", null, {
        name: 'L1 zu Auto geschaltet',
        desc: 'L1 zu Auto geschaltet',
        type: 'boolean',
        role: 'value',
    });
    
    createState("go_echarger.l2ns", null, {
        name: 'L2 zu Auto geschaltet',
        desc: 'L2 zu Auto geschaltet',
        type: 'boolean',
        role: 'value',
    });

    createState("go_echarger.l3ns", null, {
        name: 'L3 zu Auto geschaltet',
        desc: 'L3 zu Auto geschaltet',
        type: 'boolean',
        role: 'value',
    });
    
    createState("go_echarger.write_amp", null, {
        name: 'Ampere Wert für die PWM Signalisierung in ganzen Ampere',
        desc: 'Ampere Wert für die PWM Signalisierung in ganzen Ampere',
        type: 'number',
        role: 'value',
    });
    
    createState("go_echarger.write_soc", null, {
        name: 'SOC im Fahrzeug',
        desc: 'SOC im Fahrzeug',
        type: 'number',
        role: 'value',
    });
    
    createState("go_echarger.online", null, {
        name: 'Ladebox ist online',
        desc: 'Ladebox ist online',
        type: 'boolean',
        role: 'value',
    });
}


function setzen_alw(){
    if (loggen) { log ("------alw------");}
    //log(getState("javascript.0.go_echarger.write_alw").val);
    if (getState("javascript.0.go_echarger.write_alw").val==true) {
        link_temp = "alw=1"
    } else {
        link_temp = "alw=0"
    }
    json_pollen("/mqtt?payload="+link_temp)
}

function setzen_amp(){
    if (loggen) { log ("------amp------");}
    amp_temp = Math.round(getState("javascript.0.go_echarger.write_amp").val)
    if (amp_temp<6) {
        amp_temp = 6;
        log("Ladestrom kleiner 6A. Wurde auf 6A korrigiert");
    } 
    if (amp_temp>32) {
        amp_temp = 32;
        log("Ladestrom größer 32A. Wurde auf 32A korrigiert");
    }   
     link_temp = "amp="+amp_temp
     json_pollen("/mqtt?payload="+link_temp);
}

