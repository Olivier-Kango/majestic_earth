// DESKTOP VERSION

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector("#sticky-nav");
  let top = navbar.offsetTop;
  const section = document.querySelector('#history');

  function stickynavbar() {
    if (window.scrollY >= top) {
      navbar.classList.add('sticky');
      section.style.marginTop = navbar.offsetHeight + 'px';
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
setInterval(function() {
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 3) {
    counter = 1;
  }
}, 4000);

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
document.addEventListener('DOMContentLoaded', function() {
  let hamburgerIcon = document.getElementById('hamburger-icon');
  let navList = document.querySelector('.x');
  let bars = document.querySelectorAll('#hamburger-icon .bar');

  hamburgerIcon.addEventListener('click', function() {
    navList.classList.toggle('show');

    // X cross
    for(let i = 0; i < bars.length; i++) {
      bars[i].classList.toggle('change');
    }    
  });
});
