const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');

for (let input of inputs) {
  input.addEventListener('focus', () => {
    input.classList.remove('blurred');
  });
  input.addEventListener('blur', () => {
    input.classList.add('blurred');
  });
}

for (let textarea of textareas) {
  textarea.addEventListener('focus', () => {
    textarea.classList.remove('blurred');
  });
  textarea.addEventListener('blur', () => {
    textarea.classList.add('blurred');
  });
}

function validate(textField) {
  let button = document.getElementById('btn');
  let img = document.getElementById('image');
  let title = document.getElementById('title');
  let price = document.getElementById('price');
  let description = document.getElementById('description');

  button.disabled = true;

  if (
    textField.value !== '' &&
    title.value !== '' &&
    price.value !== '' &&
    description.value !== '' &&
    img.value !== ''
  ) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

const loadFile = (event) => {
  let img = document.getElementById('image');
  let output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
  validate(img)
};
