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

    var $panel = $('#examplePanel');
    var api = $panel.data('panel-api');

    // Fullscreen
    $('#exampleTogglFullscreene').on('click', function() {
      api.toggleFullscreen();
    });

    $('#exampleEnterFullscreen').on('click', function() {
      api.enterFullscreen();
    });

    $('#exampleLeaveFullscreen').on('click', function() {
      api.leaveFullscreen();
    });

    // Content
    $('#exampleToggleContent').on('click', function() {
      api.toggleContent();
    });

    $('#exampleShowContent').on('click', function() {
      api.showContent();
    });

    $('#exampleHideContent').on('click', function() {
      api.hideContent();
    });

    // Open / Close
    $('#exampleToggle').on('click', function() {
      api.toggle();
    });

    $('#exampleOpen').on('click', function() {
      api.open();
    });

    $('#exampleClose').on('click', function() {
      api.close();
    });


    // Refresh
    var even = false;
    $('#exampleReplace').on('click', function() {
      api.load(function(done) {
        var $panel = $(this);
        var content;

        if (even) {
          content = 'Lorem ipsum Adipisicing qui pariatur elit veniam reprehenderit dolore mollit amet deserunt et veniam cupidatat deserunt cupidatat dolore pariatur ullamco dolor adipisicing officia sed mollit consequat veniam culpa fugiat commodo exercitation quis veniam cupidatat eu aliquip elit dolore commodo deserunt fugiat esse in ut Excepteur non sint consequat Ut id fugiat magna ex adipisicing consequat cillum enim ad sint officia enim adipisicing aute aute ea pariatur quis dolor esse sed do veniam cupidatat magna proident in consectetur sit eiusmod sint incididunt qui sed qui deserunt consequat nulla ea esse enim minim amet eu anim labore Excepteur est ut sit commodo sit aute veniam in in quis amet ea dolore proident incididunt pariatur laboris mollit veniam est amet reprehenderit sint do id amet cillum reprehenderit irure minim culpa Duis in officia mollit veniam Excepteur officia incididunt Ut non incididunt amet ut mollit adipisicing laboris dolor Excepteur adipisicing ut sint Duis laborum culpa est Excepteur eiusmod deserunt labore nisi ad laboris minim fugiat ullamco anim enim esse eu tempor non adipisicing dolor dolor labore fugiat officia et occaecat consectetur dolor cupidatat consectetur est quis enim esse in occaecat cillum proident laborum ad reprehenderit Excepteur pariatur velit magna et reprehenderit incididunt dolore Duis occaecat ad Duis eiusmod in ullamco adipisicing est incididunt labore amet adipisicing ad Excepteur officia consectetur voluptate nulla occaecat qui sed cillum aliqua sit tempor ea officia est reprehenderit irure cupidatat.';
          even = false;
        } else {
          content = 'Lorem ipsum Laborum aute qui Ut commodo enim sunt culpa tempor cupidatat non ut proident Duis sunt pariatur id adipisicing sint sunt dolore ullamco Excepteur aute veniam nostrud reprehenderit Excepteur cupidatat aute sunt pariatur labore aute nostrud veniam Ut Ut reprehenderit incididunt ex ut do est consectetur est sint dolore id non ad esse eu enim qui deserunt dolor laboris velit cupidatat Duis tempor sed et culpa in do ea minim velit adipisicing ullamco sit qui consectetur nisi qui nisi labore sunt incididunt anim consequat consectetur commodo aliqua officia et proident deserunt culpa nulla culpa exercitation Duis elit cillum in id laboris minim est aute in esse voluptate dolor eu velit Excepteur sint dolore incididunt exercitation enim eiusmod officia quis aliqua reprehenderit irure quis non amet ullamco laboris dolor in in consectetur cupidatat est ea do nisi ut nulla in Duis irure irure minim sed officia mollit irure reprehenderit proident ullamco sed pariatur dolore dolor sunt dolor aute magna in tempor nisi ullamco eiusmod ut non fugiat dolor in.';
          even = true;
        }

        $panel.find('.panel-body').html(content);
        done();
      });
    });

    $('#exampleLoad').on('click', function() {
      api.load();
    });

    $('#exampleDone').on('click', function() {
      api.done();
    });
  });

  window.customRefreshCallback = function(done) {
    var $panel = $(this);
    setTimeout(function() {
      done();
      $panel.find('.panel-body').html('Lorem ipsum Ad reprehenderit pariatur qui labore nulla elit non velit non consectetur dolore veniam qui ullamco incididunt laboris quis incididunt nisi culpa incididunt sit est occaecat pariatur nulla aliqua amet est voluptate.');
    }, 1000);
  };

})(document, window, jQuery);
