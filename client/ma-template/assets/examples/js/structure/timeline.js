/*!
 * remark v1.0.7 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  var Site = window.Site;

  $(document).ready(function($) {
    Site.run();

    $('.timeline-item').appear();

    $('.timeline-item').not(':appeared').each(function() {
      var $item = $(this);
      $item.addClass('timeline-invisible');
      $item.find('.timeline-dot').addClass('invisible');
      $item.find('.timeline-info').addClass('invisible');
      $item.find('.timeline-content').addClass('invisible');
    });

    $(document).on('appear', '.timeline-item.timeline-invisible', function(e) {
      var $item = $(this);
      $item.removeClass('timeline-invisible');

      $item.find('.timeline-dot').removeClass('invisible').addClass('animation-scale-up');

      if ($item.hasClass('timeline-reverse') || $item.css('float') === 'none') {
        $item.find('.timeline-info').removeClass('invisible').addClass('animation-slide-right');
        $item.find('.timeline-content').removeClass('invisible').addClass('animation-slide-right');
      } else {
        $item.find('.timeline-info').removeClass('invisible').addClass('animation-slide-left');
        $item.find('.timeline-content').removeClass('invisible').addClass('animation-slide-left');
      }
    });
  });
})(document, window, jQuery);
