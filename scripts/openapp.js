var sepic = document.getElementById("sepic");
var calcapp = document.getElementById("calcapp");
var minecraftapp = document.getElementById("minecraftapp");
var counter = 1

function opensimplyepic() {
    counter += 1;
    sepic.style.display = "flex";
    sepic.style.zIndex = counter;
}
function opencalcapp() {
    counter += 1;
    calcapp.style.display = "flex";
    calcapp.style.zIndex = counter;
}
function openmcapp() {
    counter += 1;
    minecraftapp.style.display = "flex";
    minecraftapp.style.zIndex = counter;
}
