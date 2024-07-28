import {
  WIDTH,
  IMAGE_COUNT,
  START_POSITION,
  SLIDESHOW_TIME,
  PATH,
  FORMAT,
  ACTIVE_COLOR,
  INACTIVE_COLOR,
  IS_AUTOPLAY_INTERFACE,
  IS_POSITION_INTERFACE,
} from "./settings.js";

import {
  prevButton,
  nextButton,
  posDisplay,
  playButton,
  stopButton,
  slider,
  buttonsAction,
} from "./constants.js";

import { slide } from "./slide.js";

let currentIndex = START_POSITION;
let intervalId = null;

const updateSlidePosition = () => {
  slider.style.transform = `translateX(${-WIDTH * (currentIndex - 1)}px)`;
  posDisplay.textContent = `${currentIndex} / ${IMAGE_COUNT}`;
};

const startSlideshow = () =>
  (intervalId = setInterval(() => {
    nextButton.click();
  }, SLIDESHOW_TIME));

const stopSlideshow = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const initializeSlider = () => {
  slider.innerHTML = "";
  for (let i = 1; i <= IMAGE_COUNT; i++)
    slider.innerHTML += slide({ i, PATH, FORMAT });
  updateSlidePosition();
};

document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
  stopButton.disabled = true;
  stopButton.style.color = INACTIVE_COLOR;
  nextButton.onclick = () => {
    currentIndex = (currentIndex % IMAGE_COUNT) + 1;
    updateSlidePosition();
  };

  prevButton.onclick = () => {
    currentIndex = currentIndex > 1 ? currentIndex - 1 : IMAGE_COUNT;
    updateSlidePosition();
  };

  if (!IS_POSITION_INTERFACE) posDisplay.style.display = "none";

  if (!IS_AUTOPLAY_INTERFACE) {
    buttonsAction.style.display = "none";
  } else {
    playButton.onclick = () => {
      if (!intervalId) {
        startSlideshow();
        playButton.disabled = true;
        playButton.style.color = INACTIVE_COLOR;
        stopButton.disabled = false;
        stopButton.style.color = ACTIVE_COLOR;
      }
    };
    stopButton.onclick = () => {
      if (intervalId) {
        stopSlideshow();
        stopButton.disabled = true;
        stopButton.style.color = INACTIVE_COLOR;
        playButton.disabled = false;
        playButton.style.color = ACTIVE_COLOR;
      }
    };
  }
});
