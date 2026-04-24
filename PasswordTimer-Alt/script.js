// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 20;
const ALERT_THRESHOLD = 10;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle id="base-timer-path-elapsed" class="base-timer__path-elapsed green" cx="50" cy="50" r="45"></circle>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft,
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setElapsedCircleColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}

function setElapsedCircleColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  const circle = document.getElementById("base-timer-path-elapsed");
  if (timeLeft <= alert.threshold) {
    circle.classList.remove(warning.color);
    circle.classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    circle.classList.remove(info.color);
    circle.classList.add(warning.color);
  }
}

const input = document.getElementById("pin");
const dots = document.querySelectorAll(".dot");

input.addEventListener("input", () => {
  const len = input.value.length;
  dots.forEach((dot, i) => {
    dot.classList.toggle("filled", i < len);
  });
});

document.querySelector(".pin-wrapper").addEventListener("click", () => {
  input.focus();
});
