window.ondragover = function(e) {
    e.preventDefault();
    return false;
}

window.ondrop = function(e) {
    e.preventDefault();
    return false;
}

var el = document.querySelector('#drop');

el.ondragover = function() {
    this.className = "hover";
    this.innerHTML = "Rilascia il link";
    return false;
}

el.ondragleave = function() {
    this.className = "";
    this.innerHTML = "Rilascia il magnet link qui";
    return false;
}

el.ondrop = function(e) {
    e.preventDefault();
    for(var i = 0; i < e.dataTransfer.items.length; i++){
        var magnetlink = e.dataTransfer.getData("url");
    }
    

    var dirname = require('./util').dirname;
    console.log(dirname);
    console.log(dirname.substring(0, dirname.length-17));
    var dirContents = dirname.substring(0, dirname.length-17);
    var dirnameNospace = '"' + dirname + '"';
    var dirContensNospace = '"' + dirContents + '"';
    
    var exec = require('child_process').exec, child;
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
