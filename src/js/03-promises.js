import Notiflix from 'notiflix';

const selectors = {
  delayInput: document.querySelector("input[name='delay']"),
  stepInput: document.querySelector("input[name='step']"),
  amountInput: document.querySelector("input[name='amount']"),
  submitBtn: document.querySelector('button'), 
}

selectors.submitBtn.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  let delay = Number(selectors.delayInput.value);
  let step = Number(selectors.stepInput.value);
  let amount = Number(selectors.amountInput.value);

  if(amount > 0){
    for (let position = 1; position <= amount; position += 1) {
      if (position > 1) {
        delay += step;
      }

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }

  }

}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay })
        // Fulfill
      } else {
        rej({ position, delay })
        // Reject
      }
    }, delay)
  }) 

}