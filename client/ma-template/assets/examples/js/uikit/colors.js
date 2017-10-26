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

    function conventRGBToHex(rgb) {
      var regexp = /^rgb\(([0-9]{0,3})\,\s([0-9]{0,3})\,\s([0-9]{0,3})\)/g;
      var re = rgb.replace(regexp, "$1 $2 $3").split(" ");
      var hexColor = "#";
      var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
      for (var i = 0; i < 3; i++) {
        var r = null;
        var c = re[i];
        var hexAr = [];
        while (c > 16) {
          r = c % 16;
          c = (c / 16) >> 0;
          hexAr.push(hex[r]);
        }
        hexAr.push(hex[c]);
        hexColor += hexAr.reverse().join('');
      }
      return hexColor;
    }
    $('.color-palette .list-group > li').each(function() {
      var color = $(this).css("background-color");
      var hex = conventRGBToHex(color);
      var text = $(this).children('span').text() + ' / ' + hex;
      $(this).children('span').html(text);
    });
  });

})(document, window, jQuery);
