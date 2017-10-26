(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.tooltips'] = factory();
  }
}(this, function () {

  /**
   * Chartist.js plugin to display a data label on top of the points in a line chart.
   *
   */
  /* global Chartist */
  (function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
      currency: undefined
      // showTooltips: true,
      // tooltipEvents: ['mousemove', 'touchstart', 'touchmove'],
      // labelClass: 'ct-label',
      // labelOffset: {
      //   x: 0,
      //   y: -10
      // },
      // textAnchor: 'middle'
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.tooltip = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function tooltip(chart) {
        var tooltipSelector = '.ct-point';
        if (chart instanceof Chartist.Bar) {
          tooltipSelector = '.ct-bar';
        } else if (chart instanceof Chartist.Pie) {
          tooltipSelector = '.ct-slice';
        }

        var $chart = $(chart.container);
        var $toolTip = $chart
        .append('<div class="chartist-tooltip"></div>')
        .find('.chartist-tooltip')
        .hide();

        $chart.on('mouseenter', tooltipSelector, function() {
          var $point = $(this);
          var tooltipText = '';

          if (options.tooltipFnc) {
            tooltipText = options.tooltipFnc($point.attr('ct:meta') || '', $point.attr('ct:value'));
          } else {
            if ($point.attr('ct:meta')) {
              tooltipText += $point.attr('ct:meta') + '<br>';
            } else {
              // For Pie Charts also take the labels into account
              // Could add support for more charts here as well!
              if (chart instanceof Chartist.Pie) {
                var label = $point.next('.ct-label');
                if (label.length > 0) {
                  tooltipText += label.text() + '<br>';
                }
              }
            }

            var value = $point.attr('ct:value');
            if (!$.isEmptyObject(options.currency)) {
              value = options.currency + value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
            }
            tooltipText += value;
          }

          $toolTip.html(tooltipText).show();
        });

        $chart.on('mouseleave', tooltipSelector, function() {
          $toolTip.hide();
        });

        $chart.on('mousemove', function(event) {
          // For some reasons, on FF, we can't rely on event.offsetX and event.offsetY,
          // that's why we prioritize event.originalEvent.layerX and event.originalEvent.layerY
          // see https://github.com/gionkunz/chartist-js/issues/381
          $toolTip.css({
            left: (event.originalEvent.layerX || event.offsetX) - $toolTip.width() / 2 - 10,
            top: (event.originalEvent.layerY || event.offsetY) - $toolTip.height() - 40
          });
        });
      }
    };

  }(window, document, Chartist));

  return Chartist.plugins.tooltips;

}));
