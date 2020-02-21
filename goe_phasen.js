
var myDez;
var myBin;


on({id: "javascript.0.go_echarger.pha", change: 'any'},function () {phasen()});

function phasen() {
    myDez=getState("javascript.0.go_echarger.pha").val;
    myBin = myDez.toString(2);
    if (myBin.length===7) {
        myBin = "0"+myBin;
    }
    if (myBin.length===6){
        myBin = "00"+myBin;
    }
    if (myBin.length===5){
        myBin = "000"+myBin;
    }
    if (myBin.length==4){
       myBin = "0000"+myBin;
    }
    if (myBin.length===3){
        myBin = "00000"+myBin;
    }
    if (myBin.length===2){
       myBin = "000000"+myBin;
    }
    if (myBin.length===1){
        myBin = "0000000"+myBin;
    }
    if (myBin.length===0){
       myBin = "00000000"+myBin;
    }
    if (myBin.charAt(2)==1) {
        setState("javascript.0.go_echarger.l3vs",true);
    } else {
        setState("javascript.0.go_echarger.l3vs",false);
    }
    if (myBin.charAt(3)==1) {
        setState("javascript.0.go_echarger.l2vs",true);
    } else {
        setState("javascript.0.go_echarger.l2vs",false);
    }
    if (myBin.charAt(4)==1) {
        setState("javascript.0.go_echarger.l1vs",true);
    } else {
        setState("javascript.0.go_echarger.l1vs",false);
    }
    if (myBin.charAt(5)==1) {
        setState("javascript.0.go_echarger.l3ns",true);
    } else {
        setState("javascript.0.go_echarger.l3ns",false);
    }
    if (myBin.charAt(6)==1) {
        setState("javascript.0.go_echarger.l2ns",true);
    } else {
        setState("javascript.0.go_echarger.l2ns",false);
    }
    if (myBin.charAt(7)==1) {
        setState("javascript.0.go_echarger.l1ns",true);
    } else {
        setState("javascript.0.go_echarger.l1ns",false);
    }
}
