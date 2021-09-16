// Header Area

// Access the mobile btn, overlay, and header__mobile-menu
const mobileBtn = document.querySelector(".mobile-btn");
const mobileMenu = document.querySelector(".header__mobile-menu");
const overlay = document.querySelector(".overlay");

// click button, toggle the active class for mobile menu and overlay
mobileBtn.addEventListener("click", function () {
  mobileBtn.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

// About Accordion
const accordionItemHeaders = document.querySelectorAll(
  ".accordion__item-header"
);

accordionItemHeaders.forEach((itemHeader) => {
  itemHeader.addEventListener("click", (event) => {
    // Guard clause to check if there is an already opened item
    const currentlyActiveItem = document.querySelector(
      ".accordion__item-header.active"
    );
    if (currentlyActiveItem && currentlyActiveItem !== itemHeader) {
      currentlyActiveItem.classList.toggle("active");
      currentlyActiveItem.nextElementSibling.style.maxHeight = 0;
    }

    // Toggle the item active state
    itemHeader.classList.toggle("active");
    const accordionItemBody = itemHeader.nextElementSibling;
    if (itemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

const track = document.querySelector(".track");

let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window
    .getComputedStyle(track)
    .getPropertyValue("transform");
  if (transformMatrix !== "none") {
    transform = parseInt(transformMatrix.split(",")[4].trim());
  }
};

const gestureMove = (e) => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    track.style.transform = `translateX(${transform + diff}px)`;
  }
};

const gestureEnd = (e) => {
  moving = false;
};

if (window.PointerEvent) {
  window.addEventListener("pointerdown", gestureStart);
  window.addEventListener("pointermove", gestureMove);
  window.addEventListener("pointerup", gestureEnd);
} else {
  window.addEventListener("touchdown", gestureStart);
  window.addEventListener("touchmove", gestureMove);
  window.addEventListener("touchup", gestureEnd);

  window.addEventListener("mousedown", gestureStart);
  window.addEventListener("mousemove", gestureMove);
  window.addEventListener("mouseup", gestureEnd);
}
