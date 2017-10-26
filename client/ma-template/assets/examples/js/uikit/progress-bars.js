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
  });

  // Example Progress Animation
  // --------------------------
  (function() {
    $('#exampleButtonStart').on('click', function() {
      $('[data-plugin="progress"]').asProgress('start');
    });
    $('#exampleButtonFinish').on('click', function() {
      $('[data-plugin="progress"]').asProgress('finish');
    });
    $('#exampleButtonGoto').on('click', function() {
      $('[data-plugin="progress"]').asProgress('go', 50);
    });
    $('#exampleButtonGotoPercentage').on('click', function() {
      $('[data-plugin="progress"]').asProgress('go', '50%');
    });
    $('#exampleButtonStop').on('click', function() {
      $('[data-plugin="progress"]').asProgress('stop');
    });
    $('#exampleButtonReset').on('click', function() {
      $('[data-plugin="progress"]').asProgress('reset');
    });
    $('#exampleButtonRandom').on('click', function(e) {
      e.preventDefault();

      $('[data-plugin="progress"]').each(function() {
        var number = Math.round(Math.random(1) * 100) + '%';
        $(this).asProgress('go', number);
      });
    });
  })();

})(document, window, jQuery);
