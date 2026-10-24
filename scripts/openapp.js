var sepic = document.getElementById("sepic");
var welcome = document.querySelector(".welcome");
var calcapp = document.getElementById("calcapp");
var music = document.getElementById("music");
var info = document.getElementById("info");
var cmd = document.getElementById("cmd");
var cmdLauncher = document.getElementById("cmdLauncher");
var notes = document.getElementById("notes");
var games = document.getElementById("games");
var settings = document.getElementById("settings");
var counter = 1

function isTerminalEnabled() {
    return localStorage.getItem("enableTerminal") === "true";
}

function updateTerminalAvailability() {
    if (cmdLauncher) {
        cmdLauncher.style.display = isTerminalEnabled() ? "flex" : "none";
    }
    if (!isTerminalEnabled() && cmd) {
        cmd.style.display = "none";
    }
}
function isWelcomeEnabled() {
    return localStorage.getItem("hideWelcomeWindow") === "true";
}
function updateWelcomeAvailability() {
    if (welcome) {
        welcome.style.display = isWelcomeEnabled() ? "none" : "flex";
    }
}
function updateQuickButtonsAvailability() {
    const quickButtons = document.querySelectorAll(".quick-button");
    const showQuickButtons = localStorage.getItem("showQuickButtons") !== "false";
    quickButtons.forEach(button => {
        button.style.display = showQuickButtons ? "" : "none";
    });
}
updateTerminalAvailability();
updateWelcomeAvailability();
updateQuickButtonsAvailability();
window.addEventListener("storage", updateTerminalAvailability);
window.addEventListener("storage", updateWelcomeAvailability);
window.addEventListener("storage", event => {
    if (event.key === "showQuickButtons") {
        updateQuickButtonsAvailability();
    }
});

function bringAllWindowsToCenter() {
    document.querySelectorAll(".window").forEach(windowElement => {
        const left = Math.max(0, (window.innerWidth - windowElement.offsetWidth) / 2);
        const top = Math.max(0, (window.innerHeight - windowElement.offsetHeight) / 2);

        windowElement.style.left = `${left}px`;
        windowElement.style.top = `${top}px`;
        windowElement.style.transform = "none";
    });
}

async function clearMusicCache() {
    await caches.delete("butteros-local-songs-v1");
    localStorage.removeItem("songs");

    const musicFrame = music?.querySelector("iframe");
    if (musicFrame?.contentWindow) {
        musicFrame.contentWindow.location.reload();
    }
}
// center all windows
function centerAllWindows() {
    window.parent.bringAllWindowsToCenter();
}

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
// open cmd
function opencmd() {
    if (!isTerminalEnabled()) {
        updateTerminalAvailability();
        return;
    }
    counter += 1;
    cmd.style.display = "flex";
    cmd.style.zIndex = counter;
}
// open notes
function opennotes() {
    counter += 1;
    notes.style.display = "flex";
    notes.style.zIndex = counter;
}
// open games
function opengames() {
    counter += 1;
    games.style.display = "flex";
    games.style.zIndex = counter;
}
// open settings
function opensettings() {
    counter += 1;
    settings.style.display = "flex";
    settings.style.zIndex = counter;
}

