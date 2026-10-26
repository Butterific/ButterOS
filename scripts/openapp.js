var sepic = document.getElementById("sepic");
var welcome = document.querySelector(".welcome");
var calcapp = document.getElementById("calcapp");
var music = document.getElementById("music");
var info = document.getElementById("info");
var cmd = document.getElementById("cmd");
var notes = document.getElementById("notes");
var games = document.getElementById("games");
var settings = document.getElementById("settings");
var counter = 1

const wallpaperCacheName = "butteros-wallpaper-v1";
const wallpaperCacheKey = new URL("./wallpaper-cache", window.location.href).href;
let wallpaperObjectUrl = null;

function applyWallpaperImage(imageUrl) {
    document.body.style.backgroundImage = `url("${imageUrl}")`;
}

async function setWallpaper(file) {
    if (!file || !file.type.startsWith("image/")) {
        return;
    }

    const cache = await caches.open(wallpaperCacheName);
    await cache.put(wallpaperCacheKey, new Response(file, {
        headers: { "Content-Type": file.type }
    }));

    if (wallpaperObjectUrl) {
        URL.revokeObjectURL(wallpaperObjectUrl);
    }
    wallpaperObjectUrl = URL.createObjectURL(file);
    applyWallpaperImage(wallpaperObjectUrl);
}

async function loadWallpaper() {
    try {
        const cache = await caches.open(wallpaperCacheName);
        const cachedWallpaper = await cache.match(wallpaperCacheKey);
        if (!cachedWallpaper) {
            return;
        }

        const wallpaperBlob = await cachedWallpaper.blob();
        wallpaperObjectUrl = URL.createObjectURL(wallpaperBlob);
        applyWallpaperImage(wallpaperObjectUrl);
    } catch (error) {
        console.warn("Unable to load cached wallpaper.", error);
    }
}

loadWallpaper();

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

updateWelcomeAvailability();
updateQuickButtonsAvailability();
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

