// taken from https://jams.hackclub.com/batch/webOS/part-3
// Make the DIV element draggable:
document.querySelectorAll(".window").forEach(dragElement);

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;
  var headerElement = element.querySelector(".windowheader") || element;

  headerElement.onpointerdown = startDragging;

  // Step 6: Define the `startDragging` function to capture the initial position and set up event listeners.
  function startDragging(e) {
    // Ignore clicks on buttons, inputs, links, or close controls
    if (e.target.closest("button, a, input, .close, .x-button, .win-btn")) {
      return;
    }

    e.preventDefault();

    // Lock cursor input so fast mouse moves never drop tracking
    if (headerElement.setPointerCapture) {
      headerElement.setPointerCapture(e.pointerId);
    }

    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;

    // Step 8: Set up event listeners for instant pointer tracking.
    window.addEventListener("pointermove", elementDrag);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e.preventDefault();

    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    // Step 11: Update the element's position instantly to snap to cursor
    element.style.left = (element.offsetLeft - currentX) + "px";
    element.style.top = (element.offsetTop - currentY) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking pointer movement.
  function stopDragging(e) {
    if (headerElement.releasePointerCapture && e.pointerId !== undefined) {
      try {
        headerElement.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    window.removeEventListener("pointermove", elementDrag);
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);
  }
}