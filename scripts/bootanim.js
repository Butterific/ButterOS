var bootanimscreen = document.getElementById("bootanimscreen");
var bootlogo = document.querySelector(".bootlogo");

function closebootanim() {
    bootanimscreen.classList.add("fadeout");
    sessionStorage.setItem("bootanimplayed", "true");
    setTimeout(function() {
        bootanimscreen.remove();
    }, 1000);
}

if (sessionStorage.getItem("bootanimplayed") === "true") {
    closebootanim();
} else {
    bootlogo.addEventListener("ended", closebootanim, { once: true });
    bootlogo.addEventListener("error", closebootanim, { once: true });
    bootlogo.play().catch(closebootanim);
}
