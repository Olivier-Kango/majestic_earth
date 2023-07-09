/* eslint-disable no-use-before-define */
/* global $ */

$(document).ready(() => {
  const array = [
    {
      bgpopup1: "url('./assets/images/1.jpg')",
      text1: 'Je dirai la splendeur glorieuse de ta majesté; je chanterai tes merveilles. On parlera de ta puissance redoutable, et je raconterai ta grandeur.',
    },
    {
      bgpopup2: "url('./assets/images/2.jpg')",
      text2: 'Que tes oeuvres sont en grand nombre, ô Éternel! tu les as toutes faites avec sagesse: la terre est remplie de tes biens.',
    },
    {
      bgpopup3: "url('./assets/images/3.jpg')",
      text3: "Dans sa main sont les profondeurs de la terre, et les sommets des montagnes sont à lui. La mer est à lui, c'est lui qui l'a faite; et ses mains ont formé la terre sèche.",
    },
    {
      bgpopup4: "url('./assets/images/4.jpg')",
      text4: "Du lever du soleil jusqu'à son couchant, que le nom de l'Éternel soit célébré!",
    },
    {
      bgpopup5: "url('./assets/images/5.jpg')",
      text5: "Bénis l'Éternel, mon âme! Éternel, mon Dieu, tu es infiniment grand! Tu es revêtu d'éclat et de majesté.",
    },
    {
      bgpopup6: "url('./assets/images/6.jpg')",
      text6: "Tremble, terre, devant la face du Seigneur, devant la face du Dieu de Jacob ! Il change le rocher en étang, il fait du roc une source d'eau.",
    },
    {
      bgpopup7: "url('./assets/images/7.jpg')",
      text7: "Ceux qui habitent aux extrémités du monde sont saisis de crainte devant tes prodiges. Tu remplis d'allégresse l'orient et l'occident.",
    },
    {
      bgpopup8: "url('./assets/images/8.jpg')",
      text8: "Que toute la terre craigne l'Éternel! Que tous les habitants du monde tremblent devant lui! Car il parle, et la chose existe; il ordonne, et elle se produit.",
    },
    {
      bgpopup9: "url('./assets/images/9.jpg')",
      text9: 'Je dirai la splendeur glorieuse de ta majesté, je chanterai tes merveilles. On parlera de ta puissance redoutable, et je raconterai ta grandeur.',
    },
    {
      bgpopup10: "url('./assets/images/10.jpg')",
      text10: "Ils sont saisis d'effroi, tous ceux qui habitent aux extrémités de la terre, devant tes prodiges. Tu fais lever le soleil et tu le couches, tu rappelles la nuit et le jour.",
    },
    {
      bgpopup11: "url('./assets/images/11.jpg')",
      text11: "Car l'Éternel est un grand Dieu, et un grand roi au-dessus de tous les dieux.",
    },
    {
      bgpopup12: "url('./assets/images/12.jpg')",
      text12: "Tu visites la terre, et tu lui donnes l'abondance, tu la combles de richesses; le ruisseau de Dieu est plein d'eau; tu prépares le blé, quand tu la fertilises ainsi.",
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

  // Mounts Selection
  $('.mountain-link').click(function() {
    const paragraphIndex = $(this).data('paragraph');
    $('#schedule p').removeClass('para-bold');
    $(`#schedule p:nth-child(${paragraphIndex + 1})`).addClass('para-bold');
    $(this).addClass('clicked');
    $('.mountain-link').not(this).removeClass('clicked');
  });

  $('[data-paragraph="0"]').click(() => {
    $('#team .end').css('background-image', 'url("../assets/images/team.jpg")');
    $('.mountain-link').not(this).removeClass('clicked');
    $('#schedule p').not(this).removeClass('para-bold');
    $('.mountain-link:nth-child(1)').addClass('clicked');
    $('#schedule p:nth-child(1)').addClass('para-bold');
  });

  $('[data-paragraph="1"]').click(() => {
    $('#team .end').css('background-image', 'url("../assets/images/everest.gif")');
    $('.mountain-link').not(this).removeClass('clicked');
    $('#schedule p').not(this).removeClass('para-bold');
    $('.mountain-link:nth-child(2)').addClass('clicked');
    $('#schedule p:nth-child(2)').addClass('para-bold');
  });

  $('[data-paragraph="2"]').click(() => {
    $('#team .end').css('background-image', 'url("../assets/images/K2.gif")');
    $('.mountain-link').not(this).removeClass('clicked');
    $('#schedule p').not(this).removeClass('para-bold');
    $('.mountain-link:nth-child(3)').addClass('clicked');
    $('#schedule p:nth-child(3)').addClass('para-bold');
  });

  $('[data-paragraph="3"]').click(() => {
    $('#team .end').css('background-image', 'url("../assets/images/Kangchenjunga.gif")');
    $('.mountain-link').not(this).removeClass('clicked');
    $('#schedule p').not(this).removeClass('para-bold');
    $('.mountain-link:nth-child(4)').addClass('clicked');
    $('#schedule p:nth-child(4)').addClass('para-bold');
  });

  $('[data-paragraph="4"]').click(() => {
    $('#team .end').css('background-image', 'url("../assets/images/los.gif")');
    $('.mountain-link').not(this).removeClass('clicked');
    $('#schedule p').not(this).removeClass('para-bold');
    $('.mountain-link:nth-child(5)').addClass('clicked');
    $('#schedule p:nth-child(5)').addClass('para-bold');
  });
});
