window.ondragover = function(e) {
    e.preventDefault();
    return false;
}

window.ondrop = function(e) {
    e.preventDefault();
    return false;
}

// seleziono il div da modificare
var el = document.querySelector('#drop');

// trascinando un file sopra la finestra richiamo lo stile hover del css e modifico la scritta
el.ondragover = function() {
    this.className = "hover";
    this.innerHTML = "Rilascia il link";
    return false;
}

// trascinando un file al di fuori della finestra richiamo lo stile di default del css e modifico la scritta con quella originaria
el.ondragleave = function() {
    this.className = "";
    this.innerHTML = "Rilascia il magnet link qui";
    return false;
}

el.ondrop = function(e) {
    e.preventDefault();
    for(var i = 0; i < e.dataTransfer.items.length; i++){
        var magnetlink = e.dataTransfer.getData("url");
        // stampo il magnetlink sulla console
        //console.log(magnetlink);
    }
    
    // richiamo l'utility __dirname
    var dirname = require('./util').dirname;
    // percorso assoluto per nw.app
    console.log(dirname);
    // percorso assoluto per Contents
    console.log(dirname.substring(0, dirname.length-17));
    var dirContents = dirname.substring(0, dirname.length-17);

    
    // evito il problema degli spazi nel nome della directory
    var dirnameNospace = '"' + dirname + '"';
    var dirContensNospace = '"' + dirContents + '"';
    // console.log(dir);
    
    var exec = require('child_process').exec, child;
    //var cmd = 'peerflix "' + magnetlink + '" --vlc';
    var cmd = dirContensNospace + '/MacOS/nwjs ' + dirnameNospace + '/node_modules/peerflix/app.js "' + magnetlink + '" --vlc';
    console.log(cmd);
    
    child = exec(cmd, function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    
    el.ondragleave();
    
}
