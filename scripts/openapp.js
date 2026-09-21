var sepic = document.getElementById("sepic");
var calcapp = document.getElementById("calcapp");
var music = document.getElementById("music");
var info = document.getElementById("info");
var counter = 1
// open simply epic
function opensimplyepic() {
    counter += 1;
    sepic.style.display = "flex";
    sepic.style.zIndex = counter;
}
//  open calc
function opencalcapp() {
    counter += 1;
    calcapp.style.display = "flex";
    calcapp.style.zIndex = counter;
}
// open music
function openmusic() {
    counter += 1;
    music.style.display = "flex";
    music.style.zIndex = counter;
}
// open info
function openinfo() {
    counter += 1;
    info.style.display = "flex";
    info.style.zIndex = counter;
}