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
<<<<<<< HEAD
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
=======
  var headerElement = element.querySelector(".windowheader");

    if (headerElement) {
        headerElement.onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }
  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
>>>>>>> parent of 6eef6d3 (improve the overall quality and feel of window dragging)
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
<<<<<<< HEAD

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
=======
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
>>>>>>> parent of 6eef6d3 (improve the overall quality and feel of window dragging)
  }
}