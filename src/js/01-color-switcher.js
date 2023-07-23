const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timeID = '';

start.addEventListener('click', playStart);
stop.addEventListener('click', playStop);

function playStart() {
    start.disabled = true;
    stop.disabled = false;
    timeID = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000)
}

function playStop() {
    start.disabled = false;
    stop.disabled = true;
    clearInterval(timeID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
