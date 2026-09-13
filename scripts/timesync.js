// the scirpt that syncs the time for the topbar
function updateTime() {
     var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
        timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);