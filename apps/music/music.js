const inpt = document.getElementById("playlistinput");
const inpt2 = document.getElementById("trackinput");
const btn = document.getElementById("loadplaylistbutton");
const btn2 = document.getElementById("loadtrackbutton");
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