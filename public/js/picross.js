function GridAct(e,val) {
    var newval;
    if (val == 0) {
        newval = 1;
        e.style.backgroundColor = "black";
        e.style.borderColor = "white";
        e.style.borderBottom = "1px solid white";
        e.innerHTML = "";
    }
    if (val == 1) {
        newval = 2;
        e.style.backgroundColor = "white";
        e.style.borderColor = "black";
        e.style.borderBottom = "inherit";
        e.innerHTML = "X";
    }
    if (val == 2) {
        newval = 0;
        e.style.backgroundColor = "white";
        e.style.borderColor = "black";
        e.style.borderBottom = "inherit";
        e.innerHTML = "";
    }
    return newval;
}

function ClueAct(e,val) {
    var newval;
    if (val == 0) {
        newval = 1;
        e.style.backgroundColor = "black";
        e.style.color = "white";
    }
    if (val == 1) {
        newval = 0;
        e.style.backgroundColor = "white";
        e.style.color = "black";
    }
    e.style.borderColor = "black"; // glitch workaround
    return newval;
}

//     var rows = Array.prototype.filter.call(bordered, function(b) {
//         return b.nodeName === 'TR';
//     });

function GridToggle(e) {
    var bordered = document.getElementsByClassName('border');
    var newcolor = 'inherit';

    if (e.checked) {
        newcolor = 'black';
    }

    for (i = 0; i < bordered.length; i++) {
        if ( bordered[i].style.backgroundColor == 'black' ) {
            bordered[i].style.borderColor = newcolor;
        }
    }
}

function BaseToggle(e,newcolor) {
    if ( e.style.backgroundColor != 'black' ) {
        e.style.backgroundColor = newcolor;
    }
}

function HintToggle(e) {
    var hilited = document.getElementsByClassName('hilite');
    var newcolor = 'inherit';

    if (e.checked) {
        newcolor = 'lavender';
    }

    for (i = 0; i < hilited.length; i++) {
        BaseToggle(hilited[i],newcolor);
    }
}

function LineToggle(r,c,numr,numc,newcolor) {
    for (i = 1; i <= numr; i++) {
        var id = 'r' + i + 'c' + c;
        BaseToggle(document.getElementById(id),newcolor);
    }
    for (j = 1; j <= numc; j++) {
        var id = 'r' + r + 'c' + j;
        BaseToggle(document.getElementById(id),newcolor);
    }
}
