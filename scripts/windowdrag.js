document.querySelectorAll(".window").forEach(dragElement);

function dragElement(element) {
  let startX;
  let startY;
  let startLeft;
  let startTop;
  let isDragging = false;
  var headerElement = element.querySelector(".windowheader");

  (headerElement || element).addEventListener("pointerdown", startDragging);

  function startDragging(e) {
    if (e.button !== 0 || e.target.closest(".closebutton")) {
      return;
    }
    
    e.preventDefault();
    const bounds = element.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = bounds.left;
    startTop = bounds.top;
    isDragging = true;
    element.style.left = `${startLeft}px`;
    element.style.top = `${startTop}px`;
    element.style.transform = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.addEventListener("pointermove", moveWindow);
    e.currentTarget.addEventListener("pointerup", stopDragging, { once: true });
    e.currentTarget.addEventListener("pointercancel", stopDragging, { once: true });
  }

  function moveWindow(e) {
    if (!isDragging) {
      return;
    }

    const maxLeft = Math.max(0, window.innerWidth - element.offsetWidth);
    const maxTop = Math.max(0, window.innerHeight - element.offsetHeight);
    const left = Math.min(maxLeft, Math.max(0, startLeft + e.clientX - startX));
    const top = Math.min(maxTop, Math.max(0, startTop + e.clientY - startY));
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
  }

  function stopDragging(e) {
    isDragging = false;
    e.currentTarget.removeEventListener("pointermove", moveWindow);
  }
}