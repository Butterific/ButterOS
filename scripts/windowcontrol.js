// simplfied the closing app to make it easier ici
document.querySelectorAll(".closebutton").forEach(function (button) {
  button.addEventListener("click", function() {
    button.closest(".window").style.display = "none";
  });
});
