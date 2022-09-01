import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget;
  let inputDelay = Number(delay.value);
  const inputStep = Number(step.value);

  for (let index = 1; index <= amount.value; index += 1) {
    const promise = createPromise(index, inputDelay);
    inputDelay += inputStep;
    promise
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
  });
}
