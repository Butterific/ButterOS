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
  var posX = 0;
  var posY = 0;
  var rafId = null;
  var handle = element.querySelector(".windowheader") || element;

  handle.onpointerdown = startDragging;

  // Step 6: Define the `startDragging` function to capture the initial position and set up event listeners.
  function startDragging(e) {
    // Let clicks on buttons, close controls, links, or inputs pass through naturally
    if (e.target.closest("button, a, input, .close, .x-button, .win-btn")) {
      return;
    }

    e.preventDefault();

    // Lock cursor input to handle so fast movement never loses tracking or snaps
    if (handle.setPointerCapture) {
      handle.setPointerCapture(e.pointerId);
    }

    // Grab current window offset before drag begins
    posX = element.offsetLeft;
    posY = element.offsetTop;

    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;

    // Step 8: Set up event listeners on window for seamless tracking at high speeds
    window.addEventListener("pointermove", elementDrag);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  // Step 9: Define the `elementDrag` function to calculate the new position based on pointer movement.
  function elementDrag(e) {
    e.preventDefault();

    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    posX -= currentX;
    posY -= currentY;

    // Step 11: Render updates synchronized with monitor refresh rate
    if (!rafId) {
      rafId = requestAnimationFrame(function() {
        element.style.left = posX + "px";
        element.style.top = posY + "px";
        rafId = null;
      });
    }
  }

  // Step 12: Define the `stopDragging` function to stop tracking pointer movement.
  function stopDragging(e) {
    if (handle.releasePointerCapture && e.pointerId !== undefined) {
      try {
        handle.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Handle gracefully if already released
      }
    }

    window.removeEventListener("pointermove", elementDrag);
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}