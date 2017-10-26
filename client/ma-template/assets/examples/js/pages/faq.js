/*!
 * remark v1.0.7 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {

  $(document).ready(function() {
    Site.run();

    if ($('.list-group[data-plugin="nav-tabs"]').length) {
      $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $(e.target).addClass('active').siblings().removeClass('active');
      });
    }
  });

})(document, window, jQuery);
