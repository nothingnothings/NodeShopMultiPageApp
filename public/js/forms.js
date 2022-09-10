const inputs = document.querySelectorAll('input');

for (const input of inputs) {
  input.addEventListener('focus', () => {
    input.classList.remove('blurred');
  });
  input.addEventListener('blur', () => {
    input.classList.add('blurred');
  });
}

function validate(textField) {
  let button = document.getElementById('btn');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let confirmPassword = document.getElementById('confirmPassword');

  button.disabled = true;

  if (!confirmPassword) {
    if (
      textField.value !== '' &&
      email.value !== '' &&
      (password.value !== '') & validateEmail(email.value)
    ) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  } else {
    if (
      textField.value !== '' &&
      email.value !== '' &&
      (password.value !== '') & validateEmail(email.value) &&
      password.value === confirmPassword.value
    ) {
      confirmPassword.setCustomValidity('');
      button.disabled = false;
    } else {
      confirmPassword.setCustomValidity('Invalid Field');
      button.disabled = true;
    }
  }
}

function validateEmail(email) {
  var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (reg.test(email)) {
    return true;
  } else {
    return false;
  }
}
