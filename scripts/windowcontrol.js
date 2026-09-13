var windows = document.querySelector("#window")
var welcomeclose = document.querySelector("#welcomeclose")
var welcomeopen = document.querySelector("#welcomeopen")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "inline"
}
windowclose.addEventListener("click", function() {
  closeWindow(windows);
});

windowopen.addEventListener("click", function() {
  openWindow(windows);
});
