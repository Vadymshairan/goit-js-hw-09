import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    min: document.querySelector('[data-minutes]'),
    sec: document.querySelector('[data-seconds]'),
  },
};
// console.log(refs.timer.days.textContent);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    refs.startBtn.disabled = true;
    const deltaTime = new Date(refs.dateTimePicker.value) - Date.now();

    if (deltaTime >= 0) {
      refs.dateTimePicker.disabled = true;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.timer.days.textContent = addLeadingZero(days);
      refs.timer.hours.textContent = addLeadingZero(hours);
      refs.timer.min.textContent = addLeadingZero(minutes);
      refs.timer.sec.textContent = addLeadingZero(seconds);
    } else {
      Notify.success('end of countdown', {
        position: 'center-center',
      });
      refs.dateTimePicker.disabled = false;
      clearInterval(intervalId);
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure('Please choose a date in the future', {
        position: 'center-center',
      });
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.dateTimePicker, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
