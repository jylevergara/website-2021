const cities = [
  'Edmonton',
  'Vancouver',
  'Toronto',
  'Montreal',
  'Quebec City',
  'Ottawa',
  'Calgary',
  'Ottawa',
  'Halifax',
  'Winnipeg',
];

window.onload = function () {

  //load Canadian cities
  const datalistEl = document.getElementById('cities');

  cities.forEach((city) => {
    const optionEl = document.createElement('option');
    optionEl.setAttribute('value', city);

    datalistEl.appendChild(optionEl);

  });

  const contactFormEl = document.querySelector('#contact-form');
  contactFormEl.addEventListener('submit', e => {

    if (!validateInputs()) {
      e.preventDefault();
      return false;
    }
  });

};

// returns true if there are no errors
function validateInputs() {
  const errorMessageEl = document.querySelector('.error-messages');

  //if error messages exists, remove it first
  while (errorMessageEl.firstChild) {
    errorMessageEl.removeChild(errorMessageEl.firstChild);
  }


  let errorMessages = [];
  const POSTAL_CODE_REGEX = /^(?:[A-Z]\d[A-Z][ -]?\d[A-Z]\d)$/i;
  const PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const phoneInputEl = document.getElementById('phoneInput');
  const phoneVal = phoneInputEl.value;

  const postalCodeInputtEl = document.getElementById('postalCodeInput');
  const postalCodeVal = postalCodeInputtEl.value;

  if (!PHONE_REGEX.test(phoneVal)) {
    errorMessages.push('Enter a valid phone number');
  }
  if (!POSTAL_CODE_REGEX.test(postalCodeVal)) {
    errorMessages.push('Enter a valid Postal Code');
  }

  errorMessages.forEach((error) => {
    const errorMessage = renderErrorMessage(error);

    errorMessageEl.appendChild(errorMessage);
  });

  return errorMessages.length === 0;

};

function handleRadioInputClicked(option) {
  const hourlyRateInputDiv = document.querySelector('#hourlyRate');
  let hourlyRateInputLabel = document.createElement('label');
  let hourlyRateInputEl = document.createElement('input');

  //if hourly rate exists, remove it first
  while (hourlyRateInputDiv.firstChild) {
    hourlyRateInputDiv.removeChild(hourlyRateInputDiv.firstChild);
  }


  if (option === 'option-hiring') {

    const cls = ['col', 'form-group'];
    hourlyRateInputDiv.classList.add(...cls);


    hourlyRateInputLabel.for = 'hourlyRateInput';
    hourlyRateInputLabel.innerHTML = 'Hourly Rate';


    hourlyRateInputEl.className = 'form-control';
    hourlyRateInputEl.id = 'hourlyRateInput';
    hourlyRateInputEl.name = 'hourlyRate';
    hourlyRateInputEl.type = 'number';
    hourlyRateInputEl.required = true;

    hourlyRateInputDiv.appendChild(hourlyRateInputLabel);
    hourlyRateInputDiv.appendChild(hourlyRateInputEl);
  }


}

function renderErrorMessage(message) {
  const errorMessageContainer = document.createElement('div');
  const cls = ['error-container', 'mb-3'];
  errorMessageContainer.classList.add(...cls);

  const messageEl = document.createElement('span');
  messageEl.classList.add('error-message');


  messageEl.innerHTML = message;


  errorMessageContainer.appendChild(messageEl);
  return errorMessageContainer;

}
