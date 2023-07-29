/* eslint-disable no-use-before-define */
/* global $ */

$(document).ready(() => {
  const array = [
    {
      bgpopup1: "url('./assets/images/1.jpg')",
      text1: 'I will exalt you, my God the King; I will praise your name for ever and ever. Every day I will praise you and extol your name for ever and ever. <br />(Psalm 145:1-2)',
    },
    {
      bgpopup2: "url('./assets/images/2.jpg')",
      text2: 'How many are your works, LORD! In wisdom you made them all; the earth is full of your creatures. <br />(Psalm 104:24 NIV)',
    },
    {
      bgpopup3: "url('./assets/images/3.jpg')",
      text3: 'In his hand are the depths of the earth, and the mountain peaks belong to him. The sea is his, for he made it, and his hands formed the dry land. <br />(Psalm 95:4-5 NIV)',
    },
    {
      bgpopup4: "url('./assets/images/4.jpg')",
      text4: 'From the rising of the sun to the place where it sets, the name of the LORD is to be praised. <br />(Psalm 113:3 NIV)',
    },
    {
      bgpopup5: "url('./assets/images/5.jpg')",
      text5: 'Praise the LORD, my soul! O LORD my God, you are very great; you are clothed with splendor and majesty. <br />(Psalm 104:1 NIV)',
    },
    {
      bgpopup6: "url('./assets/images/6.jpg')",
      text6: "Tremble before him, all the earth! The world is firmly established; it cannot be moved. Let the heavens rejoice, let the earth be glad; let them say among the nations, 'The LORD reigns!' <br />(1 Chronicles 16:30-31 NIV)",
    },
    {
      bgpopup7: "url('./assets/images/7.jpg')",
      text7: 'From the ends of the earth I call to you, I call as my heart grows faint; lead me to the rock that is higher than I. <br />(Psalm 61:2 NIV)',
    },
    {
      bgpopup8: "url('./assets/images/8.jpg')",
      text8: 'Let the whole earth fear the LORD; let all the people of the world revere him. For he spoke, and it came to be; he commanded, and it stood firm. (Psalm 33:8-9 NIV)',
    },
    {
      bgpopup9: "url('./assets/images/9.jpg')",
      text9: 'I will exalt you, my God the King; I will praise your name for ever and ever. Every day I will praise you and extol your name for ever and ever. (Psalm 145:1-2 NIV)',
    },
    {
      bgpopup10: "url('./assets/images/10.jpg')",
      text10: 'The ends of the earth will remember and turn to the LORD, and all the families of the nations will bow down before him, for dominion belongs to the LORD and he rules over the nations. (Psalm 22:27-28 NIV)',
    },
    {
      bgpopup11: "url('./assets/images/11.jpg')",
      text11: 'Give thanks to the LORD, for he is good; his love endures forever. (1 Chronicles 16:34 NIV)',
    },
    {
      bgpopup12: "url('./assets/images/12.jpg')",
      text12: 'You care for the land and water it; you enrich it abundantly. The streams of God are filled with water to provide the people with grain, for so you have ordained it. (Psalm 65:9 NIV)',
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
    textContainer.html(text);
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

  // MANUAL SLIDES
  const buttonsWrapper = $('<div></div>').addClass('buttons-wrapper');
  modal.append(buttonsWrapper);

  const prevButton = $('<button></button>').addClass('prev-button').html('&lt;');
  buttonsWrapper.append(prevButton);

  const nextButton = $('<button></button>').addClass('next-button').html('&gt;');
  buttonsWrapper.append(nextButton);

  const goToNextImage = () => {
    if (currentImageIndex < array.length - 1) {
      currentImageIndex += 1;
    } else {
      currentImageIndex = 0;
    }
    const bgpopup = Object.values(array[currentImageIndex])[0];
    snapshoot.css('background-image', bgpopup);
    updateText(currentImageIndex);
  };

  prevButton.on('click', () => {
    if (currentImageIndex > 0) {
      currentImageIndex -= 1;
    } else {
      currentImageIndex = array.length - 1;
    }
    const bgpopup = Object.values(array[currentImageIndex])[0];
    snapshoot.css('background-image', bgpopup);
    updateText(currentImageIndex);
  });

  nextButton.on('click', () => {
    goToNextImage();
  });

  // AUTOMATIC SLIDES
  const intervalTime = 9000;
  let autoScrollInterval;

  function startAutoScroll() {
    goToNextImage();
    autoScrollInterval = setInterval(() => {
      goToNextImage();
    }, intervalTime);
  }

  // function stopAutoScroll() {
  //   clearInterval(autoScrollInterval);
  // }

  startAutoScroll();

  // SWIPE
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

  // MOUNTS SELECTION
  const mountainsData = [
    { image: '../assets/images/team.jpg', paragraphIndex: 0 },
    { image: '../assets/images/everest.jpg', paragraphIndex: 1 },
    { image: '../assets/images/K2.jpg', paragraphIndex: 2 },
    { image: '../assets/images/Kangchenjunga.jpg', paragraphIndex: 3 },
    { image: '../assets/images/los.gif', paragraphIndex: 4 },
  ];

  function updateMountainLink(index) {
    const mountainLink = $(`[data-paragraph="${index}"]`);
    $('#team .end').css('background-image', `url("${mountainsData[index].image}")`);
    $('.mountain-link').removeClass('clicked');
    mountainLink.addClass('clicked');
    $('#schedule p').removeClass('para-bold');
    $(`#schedule p:nth-child(${mountainsData[index].paragraphIndex + 1})`).addClass('para-bold');
  }

  $('.mountain-link').click(function() {
    const paragraphIndex = $(this).data('paragraph');
    updateMountainLink(paragraphIndex);
  });

  mountainsData.forEach((mountain, index) => {
    $(`[data-paragraph="${index}"]`).click(() => {
      updateMountainLink(index);
    });
  });

  // Sélection par défaut du premier lien montagne
  updateMountainLink(0);

  // HOME PAGE VIDEO
  const videoPath = './assets/videos/earth.mp4';
  const startSeconds = 8;

  const videoElement = $('#hero-video');
  videoElement.attr('src', videoPath);

  // Wait for the video metadata to load
  videoElement.on('loadedmetadata', () => {
    // Set the current time to the desired start position
    videoElement.get(0).currentTime = startSeconds;

    // Play the video
    videoElement.get(0).play();
  });
});
