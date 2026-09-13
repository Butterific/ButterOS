var welcomeScreen = document.querySelector("#window")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "inline"
}
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});
