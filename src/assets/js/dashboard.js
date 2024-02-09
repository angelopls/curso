jQuery(function () {
  jQuery('.owl-carousel').on('changed.owl.carousel', function (event) {
    jQuery(window).trigger("lookup");
  });


  // youtube
  var youtubeIframeResize = function () {
    jQuery('#dashboard-slider2 .dashboard-videoiframe').each(function (k, v) {
      var newHeight = Number((jQuery(v).width() * 360) / 640);
      jQuery(v).height(newHeight);
      jQuery(v).closest('.owl-carousel').trigger('refresh.owl.carousel');
    });
  };
  jQuery(window).resize(function () {
    youtubeIframeResize();
  });
  youtubeIframeResize();
  setInterval(function () {
    youtubeIframeResize();
  }, 10000);


  // SWIPERS DASHBOARD
  // sliders de capa
  var swiperCapa = new Swiper('.swiper-container-capa', {
    slidesPerView: 'auto',
    spaceBetween: 0,
  });
  jQuery('.swiper-cursos-capa-arrow-prev').click(function () {
    swiperCapa.slidePrev();
  });
  jQuery('.swiper-cursos-capa-arrow-next').click(function () {
    swiperCapa.slideNext();
  });

  // cursos em andamento
  var swiperAndamento = new Swiper('.swiper-container-andamento', {
    slidesPerView: 'auto',
    spaceBetween: 0,
  });
  jQuery('.swiper-cursos-andamento-arrow-prev').click(function () {
    swiperAndamento.slidePrev();
  });
  jQuery('.swiper-cursos-andamento-arrow-next').click(function () {
    swiperAndamento.slideNext();
  });

  // carrosel dos grupos de cursos
  jQuery('.box-slider-cursos').each(function (k, v) {
    var swiperCursosObj = jQuery(v).find('.swiper-container');
    var swiperCursos = new Swiper(swiperCursosObj, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: false,
      pagination: {
        el: swiperCursosObj.find('.swiper-pagination'),
        dynamicBullets: true,
        clickable: true,
      },
      on: {
        init: function () {
          swiperCursosObj.find("img[data-src], .unveil2").unveil(200);
        },
      }
    });
    jQuery(v).find('.swiper-cursos-arrow-prev').click(function () {
      swiperCursos.slidePrev();
    });
    jQuery(v).find('.swiper-cursos-arrow-next').click(function () {
      swiperCursos.slideNext();
    });
  });


  // swiper extensÃµes
  swiperExtensoesObj = jQuery('.swiper-container-extensoes');
  var swiperExtensoes = new Swiper(swiperExtensoesObj, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: swiperExtensoesObj.find('.swiper-pagination'),
      dynamicBullets: true,
      clickable: true,
    },
  });
  jQuery('.swiper-extensoes-arrow-prev').click(function () {
    swiperExtensoes.slidePrev();
  });
  jQuery('.swiper-extensoes-arrow-next').click(function () {
    swiperExtensoes.slideNext();
  });

  // botÃ£o de compra do curso
  $('.cbox.blocked').hover(
    function () {
      $(this).find('.sell-btn').removeClass('disable');
      $(this).find('.sell-btn').addClass('enable');
    },
    function () {
      $(this).find('.sell-btn').removeClass('enable');
      $(this).find('.sell-btn').addClass('disable');
    }
  );

  // vÃ­deo de boas-vindas
  setTimeout(function () {
    jQuery('.welcomeshadow, .welcomepopup').addClass('active');
  }, 3000);

  // youtube
  var welcomeIframeResize = function () {
    jQuery('.welcomepopup iframe').each(function (k, v) {
      var newHeight = Number((jQuery(v).width() * 360) / 640);
      jQuery(v).height(newHeight);
    });
  };
  jQuery(window).resize(function () {
    welcomeIframeResize();
  });
  welcomeIframeResize();
  setInterval(function () {
    welcomeIframeResize();
  }, 500);

  // botÃ£o de iniciar
  jQuery('.welcomebutton').click(function () {
    jQuery.post(window.location.href, {
      'completeTutorial': 1,
      'js': 1
    }, function (data) {
      try {
        jQuery('.welcomepopup iframe').get(0).setVolume(0);
      } catch (e) { console.error(e); }
      jQuery('.welcomeshadow, .welcomepopup').removeClass('active');
      setTimeout(function () {
        jQuery('.welcomepopup iframe').remove();
      }, 1000);
    });
  });
});