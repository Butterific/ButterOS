const inpt = document.getElementById("playlistinput");
const inpt2 = document.getElementById("trackinput");
const inpt3 = document.getElementById("fileinput");
const btn = document.getElementById("loadplaylistbutton");
const btn2 = document.getElementById("loadtrackbutton");
const btn3 = document.getElementById("musicupload");
const iframe = document.querySelector("iframe");
btn.addEventListener("click", () => {
    const playlistname = inpt.value.trim();
    if (playlistname) {
        iframe.src = `https://streamables.butterlabs.app/embed/playlist/${playlistname}`;
    } else {
        alert("Enter a valid playlist name");
    }
});
btn2.addEventListener("click", () => {
    const trackname = inpt2.value.trim();
    if (trackname) {
        iframe.src = `https://streamables.butterlabs.app/embed/${trackname}`;
    } else {
        alert("Enter a valid track name");
    }
});
btn3.addEventListener("click", async () => {
    const file = inpt3.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const name2 = prompt("Enter a name for your track:");
        if (!name2) return;
        formData.append("name", name2);
        formData.append("protected", "false");
        await fetch("https://streamables.butterlabs.app/upload", {
            method: "POST",
            body: formData
        });
        iframe.src=`https://streamables.butterlabs.app/embed/${name2}`;
        saveSongToCache(name2);
    }
});
// save uploaded song ids to a cache so that they can be loaded later
const songCache = new Map();
// load song ids from cache on page load
window.addEventListener("load", () => {
    const cachedSongs = localStorage.getItem("songs");
    if (cachedSongs) {
        const songIds = JSON.parse(cachedSongs);
        songIds.forEach((id) => {
            songCache.set(id, true);
        });
    }
    // load the first song in the cache if it exists
    if (songCache.size > 0) {
        const firstSongId = songCache.keys().next().value;
        iframe.src = `https://streamables.butterlabs.app/embed/${firstSongId}`;
    }
    // display the list of cached songs
    const songList = document.getElementById("songlist");
    if (songList) {
        songCache.forEach((value, key) => {
            const songItem = document.createElement("div");
            songItem.textContent = key;
            songList.appendChild(songItem);
        });
    }
});
const saveSongToCache = (songId) => {
    songCache.set(songId, true);
    const songIds = Array.from(songCache.keys());
    localStorage.setItem("songs", JSON.stringify(songIds));
};