import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  // console.log(e.currentTarget.delay.value);
  const { delay, step, amount } = e.currentTarget;
  // console.log(delay.value);
  let inputDelay = Number(delay.value);
  // console.log(inputDelay);
  const inputStep = Number(step.value);
  // console.log(inputStep);
  for (let index = 1; index < amount.value; index++) {
    createPromise(index, inputDelay);
    inputDelay += inputStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
        position: 'center-center',
      });
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
        position: 'center-center',
      });
    });
}

function name(params) {}
