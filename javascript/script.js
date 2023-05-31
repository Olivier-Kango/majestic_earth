// DESKTOP VERSION

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('#sticky-nav');
  const top = navbar.offsetTop;
  const section = document.querySelector('#history');

  function stickynavbar() {
    if (window.scrollY >= top) {
      navbar.classList.add('sticky');
      section.style.marginTop = `${navbar.offsetHeight}px`;
    } else {
      navbar.classList.remove('sticky');
      section.style.marginTop = 0;
    }
  }

  window.addEventListener('scroll', stickynavbar);

  navbar.style.transition = 'top 0.3s ease';

  stickynavbar();
});

// Automatic navigation
let counter = 1;
setInterval(() => {
  document.getElementById(`radio${counter}`).checked = true;
  counter += 1;
  if (counter > 3) {
    counter = 1;
  }
}, 5000);

//  Get the scroll top button element
const scrollTopButton = document.getElementById('scroll-top');

// Add an event listener to the window scroll event
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopButton.style.display = 'block';
    scrollTopButton.classList.remove('hide');
  } else {
    scrollTopButton.classList.add('hide');
    scrollTopButton.addEventListener('transitionend', () => {
      if (scrollTopButton.classList.contains('hide')) {
        scrollTopButton.style.display = 'none';
      }
    }, { once: true });
  }
});

scrollTopButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// MOBILE VERSION

// Humberger
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const navList = document.querySelector('.x');
  const bars = document.querySelectorAll('#hamburger-icon .bar');

  hamburgerIcon.addEventListener('click', () => {
    navList.classList.toggle('show');

    // X cross
    for (let i = 0; i < bars.length; i += 1) {
      bars[i].classList.toggle('change');
    }
  });
});
