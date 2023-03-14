import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInputData, 500));
formEl.addEventListener('submit', onFormSubmit);

let dataFormEl = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = formEl.elements;
reloadPage();

function onInputData(e) {
  dataFormEl = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataFormEl));
}

function reloadPage() {
  if (dataFormEl) {
    email.value = dataFormEl.email || '';
    message.value = dataFormEl.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
  dataFormEl = {};
}
