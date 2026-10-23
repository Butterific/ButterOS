// the scirpt that syncs the time for the topbar
function updateTime() {
     var currentTime = new Date().toLocaleString();
     var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var timeText = document.querySelector("#timeElement");
        timeText.innerHTML = currentTime + " (" + timezone + ")";
}
setInterval(updateTime, 1000);