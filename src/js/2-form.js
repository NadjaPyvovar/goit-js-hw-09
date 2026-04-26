const form = document.querySelector('.feedback-form');

// creating an empty object formData
const formData = {
  email: '',
  message: '',
};

// naming saved data in localStorage
const STORAGE_KEY = 'feedback-form-state';

// loading from localStorage on page load/open (checking if anythign previously was saved under the key "feedback-form-state", in a negative case reverts null)
const savedData = localStorage.getItem(STORAGE_KEY);

// if data found:
if (savedData) {
  const parsedData = JSON.parse(savedData); // parsing saved object (saved on localStorage as string) back to JS object

  formData.email = parsedData.email || ''; // filling formData object with saved values (if value is missing, then empty string is used)
  formData.message = parsedData.message || '';

  form.elements.email.value = formData.email; // putting saved text into the input fields
  form.elements.message.value = formData.message;
}

// handling input (incl delegation) => saving to localStorage on every keystroke (i.e. entering input)
form.addEventListener('input', handleInput);

function handleInput(event) {
  const { name, value } = event.target; // event.target here is the field where input is typed in
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // saving to the localStorage, whilst converting formData into string
}

// handling submit
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY); // after submitting, removing from the localStorage

  formData.email = ''; // clearing data
  formData.message = '';

  form.reset(); // reseting form
}
