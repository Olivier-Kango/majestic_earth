/* global $ */

$(document).ready(() => {
  const array = [
    { bgpopup1: "url('./assets/images/1 - Copy.jpg')" },
    { bgpopup2: "url('./assets/images/2 - Copy.jpg')" },
    { bgpopup3: "url('./assets/images/3 - Copy.jpg')" },
    { bgpopup4: "url('./assets/images/4 - Copy.jpg')" },
    { bgpopup5: "url('./assets/images/5 - Copy.jpg')" },
    { bgpopup6: "url('./assets/images/6 - Copy.jpg')" },
    { bgpopup7: "url('./assets/images/7 - Copy.jpg')" },
    { bgpopup8: "url('./assets/images/8 - Copy.jpg')" },
    { bgpopup9: "url('./assets/images/9 - Copy.jpg')" },
    { bgpopup10: "url('./assets/images/10 - Copy.jpg')" },
    { bgpopup11: "url('./assets/images/11- Copy.jpg')" },
    { bgpopup12: "url('./assets/images/12 - Copy.jpg')" },
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

  function openModal() {
    if (modal == null) return;
    modal.addClass('active');
    overlay.addClass('active');
  }

  function closeModal() {
    if (modal == null) return;
    modal.removeClass('active');
    overlay.removeClass('active');
  }

  openModalButtons.on('click', function () {
    const index = $(this).data('modalTarget').split('-')[1];
    const bgpopup = Object.values(array[index - 1])[0];
    openModal();
    snapshoot.css('background-image', bgpopup);
    snapshoot.show();
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
});
