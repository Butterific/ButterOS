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

function skipBootAnimImmediately() {
    if (!bootanimscreen) return;
    sessionStorage.setItem("bootanimplayed", "true");
    bootanimscreen.remove();
}

const shouldSkipBoot = localStorage.getItem('skipBootAnim') === 'true';

if (shouldSkipBoot) {
    skipBootAnimImmediately();
} else if (sessionStorage.getItem("bootanimplayed") === "true") {
    closebootanim();
}

function startBootAnimation() {
    bootlogo.addEventListener("ended", closebootanim, { once: true });
    bootlogo.addEventListener("error", closebootanim, { once: true });
    bootlogo.play().catch(closebootanim);
}