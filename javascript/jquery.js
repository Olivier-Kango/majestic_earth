/* eslint-disable no-use-before-define */
/* global $ */

$(document).ready(() => {
  const array = [
    {
      bgpopup1: "url('./assets/images/1.jpg')",
      text1: 'I will speak of the glorious honour of thy majesty, and of thy wondrous works. And men shall speak of the might of thy terrible acts: and I will declare thy greatness. Psalm 145:5-6',
    },
    {
      bgpopup2: "url('./assets/images/2.jpg')",
      text2: 'O LORD, how manifold are thy works! in wisdom hast thou made them all: the earth is full of thy riches. Psalm 104:24',
    },
    {
      bgpopup3: "url('./assets/images/3.jpg')",
      text3: 'In his hand are the deep places of the earth: the strength of the hills is his also. The sea is his, and he made it: and his hands formed the dry land. Psalm 95:4-5',
    },
    {
      bgpopup4: "url('./assets/images/4.jpg')",
      text4: "From the rising of the sun unto the going down of the same the LORD's name is to be praised. Psalm 113:3",
    },
    {
      bgpopup5: "url('./assets/images/5.jpg')",
      text5: 'Bless the LORD, O my soul. O LORD my God, thou art very great; thou art clothed with honour and majesty. Psalm 104:1',
    },
    {
      bgpopup6: "url('./assets/images/6.jpg')",
      text6: 'Tremble, thou earth, at the presence of the Lord, at the presence of the God of Jacob; Which turned the rock into a standing water, the flint into a fountain of waters. Psalm 114:7-8',
    },
    {
      bgpopup7: "url('./assets/images/7.jpg')",
      text7: 'They also that dwell in the uttermost parts are afraid at thy tokens: thou makest the outgoings of the morning and evening to rejoice. Psalm 65:8',
    },
    {
      bgpopup8: "url('./assets/images/8.jpg')",
      text8: 'Let all the earth fear the LORD: let all the inhabitants of the world stand in awe of him. For he spake, and it was done; he commanded, and it stood fast. Psalm 33:8-9',
    },
    {
      bgpopup9: "url('./assets/images/9.jpg')",
      text9: 'When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained; What is man, that thou art mindful of him? and the son of man, that thou visitest him? Psalm 8:3-4',
    },
    {
      bgpopup10: "url('./assets/images/10.jpg')",
      text10: 'They also that dwell in the uttermost parts are afraid at thy tokens: thou makest the outgoings of the morning and evening to rejoice. Psalm 65:8',
    },
    {
      bgpopup11: "url('./assets/images/11.jpg')",
      text11: 'For the LORD is a great God, and a great King above all gods. Psalm 95:3',
    },
    {
      bgpopup12: "url('./assets/images/12.jpg')",
      text12: 'Thou visitest the earth, and waterest it: thou greatly enrichest it with the river of God, which is full of water: thou preparest them corn, when thou hast so provided for it. Psalm 65:9',
    },
  ];

  const modal = $('<div></div>').addClass('modal');
  $('body').append(modal);

  const closeButton = $('<button></button>').attr('data-close-button', '').addClass('close-button').html('&times;');
  modal.append(closeButton);

  const snapshoot = $('<div></div>').addClass('snapshoot');
  modal.append(snapshoot);

  const textContainer = $('<p></p>').addClass('text-container');
  snapshoot.append(textContainer);

  const overlayTwo = $('<div></div>').attr('id', 'overlay');
  $('body').append(overlayTwo);

  const openModalButtons = $('[data-modal-target]');
  const closeModalButtons = $('[data-close-button]');
  const overlay = $('#overlay');

  let currentImageIndex = 0;

  function updateText(index) {
    const text = Object.values(array[index])[1];
    textContainer.text(text);
  }

  function openModal(index) {
    modal.addClass('active');
    overlay.addClass('active');
    currentImageIndex = index;
    const bgpopup = Object.values(array[currentImageIndex])[0];
    snapshoot.css('background-image', bgpopup);
    updateText(currentImageIndex);
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
      updateText(currentImageIndex);
    } else {
      currentImageIndex = array.length - 1;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
      updateText(currentImageIndex);
    }
  });

  nextButton.on('click', () => {
    if (currentImageIndex < array.length - 1) {
      currentImageIndex += 1;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
      updateText(currentImageIndex);
    } else {
      currentImageIndex = 0;
      const bgpopup = Object.values(array[currentImageIndex])[0];
      snapshoot.css('background-image', bgpopup);
      updateText(currentImageIndex);
    }
  });

  // Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  snapshoot.on('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    updateText(currentImageIndex);
  });

  snapshoot.on('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    updateText(currentImageIndex);
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
