const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

const backdropClickHandler = () => {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
};

const menuToggleClickHandler = () => {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
};

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);


function showMessage(feature) {
  const warning = document.createElement('span');
  warning.innerHTML = '';
  const tag = document.createElement('p');
  const text = document.createTextNode(
    `${feature} feature available only in the full app.`
  );
  tag.appendChild(warning);
  tag.appendChild(text);
  const element = document.getElementById('dummy-message');
  element.appendChild(tag);

  setTimeout(() => {
    tag.parentElement.removeChild(tag);
  }, 2000);
}
