jQuery(function () {
  // unveil2
  var unveil2 = function () {
    jQuery("img[data-src], .unveil2").unveil(200);
    setTimeout(function () {
      jQuery(window).trigger("lookup");
    }, 500);
  };
  unveil2();

  // form loading button
  jQuery('form.loadingSubmitBtn').submit(function () {
    jQuery(this).find('button[type="submit"]').addClass('loading');
  });
  // remove loading link loading
  jQuery('a.loadingLinkBtn').on('confirmation-false prompt-false', function () {
    var link = this;
    jQuery(link).find('button').removeClass('loading');
    setInterval(function () {
      jQuery(link).find('button').removeClass('loading');
    }, 200);
  });
  // link loading button
  jQuery('a.loadingLinkBtn').click(function () {
    jQuery(this).find('button').addClass('loading');
  });

  // hr progress
  setTimeout(function () {
    jQuery('hr[data-progress]').each(function (k, v) {
      var progress = Number(jQuery(v).attr('data-progress'));
      jQuery(v).css('--progress', progress + '%');
    });
  }, 500);

  // adjust menu size
  var adjustMenuSize = function () {
    var bodyWidth = jQuery('body').width();

    if (bodyWidth >= 1000) {
      jQuery('menu').removeClass('minimified');
      jQuery('menu').removeClass('mobile');
      jQuery('.master-body').removeClass('menuMinimified');
    } else if (bodyWidth < 1000 && bodyWidth > 600) {
      jQuery('menu').removeClass('mobile');
      jQuery('menu').addClass('minimified');
      jQuery('.master-body').addClass('menuMinimified');
    } else if (bodyWidth <= 600) {
      jQuery('menu').removeClass('minimified');
      jQuery('menu').addClass('mobile');
      jQuery('.master-body').removeClass('menuMinimified');
    } else if (jQuery('menu').hasClass('minimified-always')) {
      jQuery('menu').addClass('minimified');
      jQuery('.master-body').addClass('menuMinimified');
    }
  };
  adjustMenuSize();


  // slim scroll
  var slimScroll = function () {
    // slimscroll
    jQuery('.slimScroll').each(function (k, v) {
      jQuery(v).slimScroll({
        height: 'auto',
        color: '#555555',
        allowPageScroll: true,
      }).bind('slimscroll, scroll', function (e, pos) {
        jQuery(window).trigger("lookup");
      });
    });
  };
  jQuery('.slimScroll').bind('updateScroll', function () {
    slimScroll();
  });
  slimScroll();


  // atualizar dimensoes do viewport
  jQuery(window).resize(function () {
    adjustMenuSize();
    slimScroll();
  });


  // abrir menu
  jQuery('.buttonMenu, .menu-lateral-shadow').click(function () {
    if (!jQuery('menu').hasClass('active')) {
      jQuery('.menu-lateral-shadow').addClass('active');
      jQuery('menu').addClass('active');
      jQuery('.buttonMenu').addClass('active');
    } else {
      jQuery('.menu-lateral-shadow').removeClass('active');
      jQuery('menu').removeClass('active');
      jQuery('.buttonMenu').removeClass('active');
    }
  });

  // abrir menu lateral
  var abrirMenuLateral = function () {
    jQuery('.master-panel').toggleClass('open');
  };
  jQuery('.master-panel-openbtn').click(function () {
    abrirMenuLateral();
  });

  // jconfirm config vars
  jQuery.extend(jconfirm.pluginDefaults, {
    title: '',
    boxWidth: '500px',
    useBootstrap: false,
    theme: 'dark',
    draggable: false,
    container: 'body',
    containerFluid: false,
    animation: 'scale',
  });


  // DATA ALERT
  var jQueryAlert = jQuery.alert;
  jQuery('[data-alert]').click(function (e) {
    e.preventDefault();
    var elem = jQuery(this);
    var title = jQuery(elem).attr('data-alert-title');
    var text = $(elem).attr('data-alert');
    text = text.replace(/\\n/g, '<br>').replace(/\n/g, "<br />");
    jQueryAlert({
      title: (title) ? title : '',
      content: text,
      action: function () {
        jQuery(elem).trigger('alert-true');
      }
    });
    return false;
  });

  // CONFIRM ALERT
  var jQueryConfirm = jQuery.confirm;
  jQuery('[data-confirm]').click(function (e) {
    e.preventDefault();
    var elem = jQuery(this);
    var title = jQuery(elem).attr('data-confirm-title');
    var okbutton = jQuery(elem).attr('data-prompt-button');
    var text = $(elem).attr('data-confirm');
    text = text.replace(/\\n/g, '<br>').replace(/\n/g, "<br />");
    jQueryConfirm({
      title: (title) ? title : '',
      content: text,
      buttons: {
        confirm: {
          text: 'Sim',
          keys: ['enter'],
          btnClass: 'btn-red',
          action: function () {
            jQuery(elem).trigger('confirmation-true');
            // redirecionar para link (a)
            if (elem.is('a') && elem.attr('href')) {
              window.location = elem.attr('href');
            } else if (elem.is('form')) {// enviar formulÃ¡rio
              elem.submit();
            } else if (elem.is('button') && elem.attr('type') == "submit") {// enviar formulÃ¡rio caso confirme o botÃ£o
              elem.closest('form').submit();
            }
          }
        },
        cancel: {
          text: 'NÃ£o',
          keys: ['esc', 'enter'],
          action: function () {
            jQuery(elem).trigger('confirmation-false');
          }
        }
      }
    });
    return false;
  });


  // PROMPT ALERT
  var jQueryConfirm = jQuery.confirm;
  jQuery('[data-prompt]').click(function (e) {
    e.preventDefault();
    var elem = jQuery(this);
    var title = jQuery(elem).attr('data-prompt-title');
    // var placeholder = jQuery(elem).attr('data-prompt-placeholder');
    var text = $(elem).attr('data-prompt');
    text = text.replace(/\\n/g, '<br>').replace(/\n/g, "<br />");
    text += '<form action="" class="jconfirm-form">' +
      '<div class="form-group">' +
      // '<input type="text" class="prompt" required placeholder="'+((placeholder)? placeholder : '')+'" />' +
      '</div>' +
      '</form>';
    jQueryConfirm({
      title: (title) ? title : '',
      content: text,
      buttons: {
        confirm: {
          text: 'Sim',
          keys: ['enter'],
          btnClass: 'btn-red',
          action: function () {
            // jQuery(elem).trigger('prompt-true');
            // var prompt = this.$content.find('.prompt').val();
            console.log(jQuery(elem).closest('a').attr('href'));
            var url = jQuery(elem).closest('a').attr('href');
            var url = jQuery(elem).closest('a').attr('href');
            var form = $('<form style="display:none;" action="' + url + '" method="get">' +
              // '<input type="hidden" name="prompt" value="' + prompt + '" />' +
              '</form>');
            $('body').append(form);
            form.submit();
            // if(prompt){
            // 	var url = jQuery(elem).closest('a').attr('href');
            // 	var form = $('<form style="display:none;" action="' + url + '" method="get">' +
            // 	  '<input type="hidden" name="prompt" value="' + prompt + '" />' +
            // 	  '</form>');
            // 	$('body').append(form);
            // 	form.submit();
            // }else{
            // 	this.$content.find('.prompt').focus();
            // 	return false;
            // }
          }
        },
        cancel: {
          text: 'NÃ£o',
          keys: ['esc'],
          action: function () {
            // console.log("url: "+jQuery(elem).closest('a').attr('href'));
            jQuery(elem).trigger('prompt-false');
          }
        },
      },
      onContentReady: function () {
        var jc = this;
        this.$content.find('form').submit(function (ee) {
          ee.preventDefault();
          jc.$$confirm.trigger('click');
          return false;
        });
      }
    });
    return false;
  });

  // colorbox
  jQuery('a.colorbox').each(function (k, v) {
    var cRealHref = jQuery(v).attr('href') || false;
    var cHref = jQuery(v).attr('data-href') || jQuery(v).attr('href');
    var cWidth = jQuery(v).attr('data-width') || 500;
    var cHeight = jQuery(v).attr('data-height') || 390;
    var cMinWidth = jQuery(v).attr('data-min-width') || 500;
    var cMinHeight = jQuery(v).attr('data-min-height') || 390;
    var cTimer = false;
    if (jQuery(window).width() < 600 && cRealHref) {
      jQuery(v).click(function () {
        window.location.href = cRealHref;
        cColorbox.close();
        return false;
      });
    } else {// abrir colorbox
      jQuery(v).colorbox({
        href: cHref,
        width: cWidth,
        height: cHeight,
        minWidth: cMinWidth,
        minHheight: cMinHeight,
        scrolling: true,
        opacity: 0.8,
        fixed: true,
        iframe: true,
        fastIframe: true,
        initialWidth: (Number(cWidth) - 200),
        initialHeight: (Number(cHeight) - 200),
        maxWidth: '95%',
        maxHeight: '95%',
        onComplete: function () {
          jQuery('#cboxClose').html('<i class="fal fa-times"></i>');
          var cColorbox = this;
          var cIframe = jQuery('#cboxLoadedContent').find('.cboxIframe').get(0);
          var cIframeContent = jQuery(cIframe).contents();
          var updateColorboxSize = function () {
            var windowMaxWidth = Number(jQuery(window).width() - 50);
            var windowMaxHeight = Number(jQuery(window).height() - 50);
            var cIframeWidth = (cIframeContent.find('.colorboxSize').outerWidth(true) + 48) || cWidth;
            var cIframeHeight = cIframeContent.find('.colorboxSize').outerHeight(true) || cHeight;
            cIframeWidth = (cIframeWidth < cMinWidth) ? cMinWidth : cIframeWidth;
            cIframeHeight = (cIframeHeight < cMinHeight) ? cMinHeight : cIframeHeight;
            cIframeWidth = (cIframeWidth > windowMaxWidth) ? windowMaxWidth : cIframeWidth;
            cIframeHeight = (cIframeHeight > windowMaxHeight) ? windowMaxHeight : cIframeHeight;
            jQuery.colorbox.resize({
              // width: cIframeWidth,
              height: Number(cIframeHeight) + 45,
            });
          };
          jQuery(cIframe).on("load", function () {
            cIframeContent = jQuery(cIframe).contents();
            cIframeContent.find('body').on('DOMSubtreeModified DOMNodeInserted', function () {
              updateColorboxSize();
            });
            updateColorboxSize();
          });
        },
        onOpen: function () {
          var cColorbox = this;
          if (jQuery(window).width() < 600 && cRealHref) {
            window.location.href = cRealHref;
            cColorbox.close();
            return false;
          }
        }
      });
    }
  });

  // cabeÃ§alho
  jQuery('header button').on("tap click", function (e) {
    jQuery(this).focus();
  });

  // swipers
  var pageHeaderSwipers = [];
  jQuery('.page-header-abas-swiper').each(function (k, v) {
    pageHeaderSwipers[k] = new Swiper(v, {
      direction: 'horizontal',
      loop: false,
      height: 60,
      spaceBetween: 8,
      slidesPerView: 'auto',
      centeredSlides: false,
      resizeReInit: true,
      watchOverflow: true,
      on: {
        init: function () {
          var activeButton = jQuery(v).find('button.active');
          if (activeButton) {
            activeSlide = jQuery(activeButton.closest('.swiper-slide'));
            this.slideTo(activeSlide.index());
          }
        },
      }
    });
    setTimeout(function () {
      jQuery(window).trigger('resize').resize();
      pageHeaderSwipers[k].update();
    }, 200);
  });

  // iframe link externo
  // abrir Iframe do template
  $('.menu #url-iframe a').click(function () {
    console.log('crick');
    if (!$(this).attr('value')) {
      return;
    }
    $('.show-iframe iframe').css('background', 'none');
    $('.show-iframe').css('display', 'inherit');
    $('.show-iframe').addClass('unveil2');
    var srcIframe = $(this).attr('value');
    $('.show-iframe iframe').on('load', function () {
      $('.show-iframe').removeClass('unveil2');
      $('.show-iframe iframe').css('background', '#ffffff');
    });

    $('.show-iframe iframe').attr('src', srcIframe);
  });

  // fechar Iframe do template
  $('#close-iframe').click(function () {
    $('.show-iframe').css('display', 'none');
    $('.show-iframe iframe').attr('src', '');
  });

  // LITE PICKER
  jQuery('input.lite-picker').each(function (k, v) {
    jQuery(v).attr('autocomplete', 'off');
    var now = new Date((new Date().getTime() + (new Date().getTimezoneOffset() * -60000)));
    var today = now; today.setUTCHours(0, 0, 0, 0);
    var ago7Days = new Date(now.getTime() - (5 * 24 * 60 * 60 * 1000));
    var ago15Days = new Date(now.getTime() - (13 * 24 * 60 * 60 * 1000));
    var ago30Days = new Date(now.getTime() - (28 * 24 * 60 * 60 * 1000));
    var agoCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    var agoCurrentYear = new Date(now.getFullYear(), 1, 1);
    var midnight = now; midnight.setUTCHours(23, 59, 59, 0);
    new Litepicker({
      element: v,
      singleMode: false,
      plugins: ['keyboardnav', 'mobilefriendly', 'ranges'],
      buttonText: {
        apply: 'Selecionar',
        cancel: 'Cancelar',
      },
      format: "DD/MM/YYYY",
      lang: 'pt-BR',
      maxDate: today,
      maxDays: 365,
      ranges: {
        customRanges: {
          'Hoje': [now, midnight],
          'Ãšltimos 7 Dias': [ago7Days, now],
          'Ãšltimos 15 Dias': [ago15Days, now],
          'Ãšltimos 30 Dias': [ago30Days, now],
          'Este MÃªs': [agoCurrentMonth, now],
          'Este Ano': [agoCurrentYear, now],
        }
      }
    });
  });


  // mÃ¡scaras
  jQuery('input[data-mask], textarea[data-mask]').not(':disabled').each(function (k, v) {
    $(v).mask($(v).attr('data-mask'));
  });
  jQuery(".maskPhone").mask("(00) 0000-00000").focusout(function (event) {
    var target, phone, element;
    target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    phone = target.value.replace(/\D/g, '');
    element = $(target);
    element.unmask();
    if (phone.length > 10) {
      element.mask("(00) 00000-0000");
    } else {
      element.mask("(00) 0000-00009");
    }
  });
  $('.maskMoney').mask('000.000.000.000.000,00', { reverse: true });
  $('.maskNumber').mask('000000000000000');

});