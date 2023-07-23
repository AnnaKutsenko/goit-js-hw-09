import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('input#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    timer: document.querySelector(".timer"),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
}
let userData = '';
refs.start.addEventListener('click', startTimer)

refs.start.disabled = true;
const currentDate = new Date;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (currentDate > selectedDates[0]) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.start.disabled = true;
        } else {
            refs.start.disabled = false;
        }
  },
};

const fp = flatpickr(refs.input, options);

function startTimer(fp) { 
    const currentDate = new Date;
    const selectedDate = new Date(refs.input.value);

    if (currentDate > selectedDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.start.disabled = true;
    } else {
        const id = setInterval(() => {
            const newCurrentDate = new Date;
            const timerTime = convertMs(selectedDate.getTime() - newCurrentDate.getTime());
            if ((selectedDate.getTime() - newCurrentDate.getTime()) <= 0) {
                clearInterval(id);
                refs.start.disabled = true;
            }
            else {
                if (timerTime.days.toString().length === 1) {
                    refs.daysEl.innerHTML = timerTime.days.toString().padStart(2, '0');
                }
                else {
                    refs.daysEl.innerHTML = timerTime.days.toString();
                }
                refs.hoursEl.innerHTML = timerTime.hours.toString().padStart(2, '0');
                refs.minutesEl.innerHTML = timerTime.minutes.toString().padStart(2, '0');
                refs.secondsEl.innerHTML = timerTime.seconds.toString().padStart(2, '0');
            }
        }, 1000);
    }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}