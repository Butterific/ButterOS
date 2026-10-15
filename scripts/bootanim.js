var bootanimscreen = document.getElementById("bootanimscreen");
var bootlogo = document.querySelector(".bootlogo");

function closebootanim() {
    if (!bootanimscreen) return;
    bootanimscreen.classList.add("fadeout");
    sessionStorage.setItem("bootanimplayed", "true");
    setTimeout(function() {
        bootanimscreen.remove();
    }, 1000);
}
if (sessionStorage.getItem("bootanimplayed") === "true") {
    closebootanim();
} else {
    fetch("debug.json")
        .then(function(response) {
            if (!response.ok) throw new Error("config not found");
            return response.json();
        })
        .then(function(data) {
            if (data.bootAnimationDisabled === true || data["boot animation disabled"] === true) {
                closebootanim();
            } else {
                startBootAnimation();
            }
        })
        .catch(function(error) {
            startBootAnimation();
        });
}

function startBootAnimation() {
    bootlogo.addEventListener("ended", closebootanim, { once: true });
    bootlogo.addEventListener("error", closebootanim, { once: true });
    bootlogo.play().catch(closebootanim);
}