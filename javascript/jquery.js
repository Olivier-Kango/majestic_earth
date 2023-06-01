/* eslint-disable no-use-before-define */
/* global $ */

// const { event } = require('jquery');

$(document).ready(() => {
  const array = [
    { bgpopup1: "url('./assets/images/1.jpg')" },
    { bgpopup2: "url('./assets/images/2.jpg')" },
    { bgpopup3: "url('./assets/images/3.jpg')" },
    { bgpopup4: "url('./assets/images/4.jpg')" },
    { bgpopup5: "url('./assets/images/5.jpg')" },
    { bgpopup6: "url('./assets/images/6.jpg')" },
    { bgpopup7: "url('./assets/images/7.jpg')" },
    { bgpopup8: "url('./assets/images/8.jpg')" },
    { bgpopup9: "url('./assets/images/9.jpg')" },
    { bgpopup10: "url('./assets/images/10.jpg')" },
    { bgpopup11: "url('./assets/images/11.jpg')" },
    { bgpopup12: "url('./assets/images/12.jpg')" },
  ];

  const modal = $('<div></div>').addClass('modal');
  $('body').append(modal);

  const closeButton = $('<button></button>').attr('data-close-button', '').addClass('close-button').html('&times;');
  modal.append(closeButton);

  const snapshoot = $('<div></div>').addClass('snapshoot');
  modal.append(snapshoot);
  snapshoot.css('background-image', '');

  const overlayTwo = $('<div></div>').attr('id', 'overlay');
  $('body').append(overlayTwo);

  const openModalButtons = $('[data-modal-target]');
  const closeModalButtons = $('[data-close-button]');
  const overlay = $('#overlay');

  let currentImageIndex = 0;

  function openModal(index) {
    modal.addClass('active');
    overlay.addClass('active');
    currentImageIndex = index;
    const bgpopup = Object.values(array[currentImageIndex])[0];
    snapshoot.css('background-image', bgpopup);
    snapshoot.show();
  }

  function closeModal() {
    modal.removeClass('active');
    overlay.removeClass('active');
  }

  openModalButtons.on('click', function () {
    const index = $(this).data('modalTarget').split('-')[1];
    openModal(index - 1);
  });

  overlay.on('click', () => {
    const modals = $('.modal.active');
    modals.each(() => {
      closeModal($(this));
    });
  });

  closeModalButtons.on('click', () => {
    const modal = $(this).closest('.modal');
    closeModal(modal);
  });

  // Manual Slides
  const buttonsWrapper = $('<div></div>').addClass('buttons-wrapper');
  modal.append(buttonsWrapper);

  const prevButton = $('<button></button>').addClass('prev-button').html('&lt;');
  buttonsWrapper.append(prevButton);

  const nextButton = $('<button></button>').addClass('next-button').html('&gt;');
  buttonsWrapper.append(nextButton);

  prevButton.on('click', () => {
    if (currentImageIndex > 0) {
      currentImageIndex -= 1;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
    } else {
      currentImageIndex = array.length - 1;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
    }
  });

  nextButton.on('click', () => {
    if (currentImageIndex < array.length - 1) {
      currentImageIndex += 1;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
    } else {
      currentImageIndex = 0;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
    }
  });

  // Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  snapshoot.on('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  });

  snapshoot.on('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  const handleSwipe = () => {
    const minSwipeDistance = 50;

    if (touchEndX - touchStartX > minSwipeDistance) {
      prevButton.trigger('click');
    } else if (touchStartX - touchEndX > minSwipeDistance) {
      nextButton.trigger('click');
    }
  };
});
