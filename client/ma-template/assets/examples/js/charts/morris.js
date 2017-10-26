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


  // Example Morris Line
  // -------------------
  (function() {
    Morris.Line({
      element: 'exampleMorrisLine',
      data: [{
        "y": "2015 Q3",
        "a": 40,
        "b": 100
      }, {
        "y": "2015 Q2",
        "a": 75,
        "b": 165
      }, {
        "y": "2015 Q1",
        "a": 150,
        "b": 240
      }, {
        "y": "2014 Q4",
        "a": 100,
        "b": 270
      }, {
        "y": "2013 Q4",
        "a": 260,
        "b": 300
      }, {
        "y": "2012 Q4",
        "a": 20,
        "b": 225
      }, {
        "y": "2011 Q4",
        "a": 295,
        "b": 110
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      resize: true,
      pointSize: 3,
      smooth: true,
      gridTextColor: '#474e54',
      gridLineColor: '#eef0f2',
      goalLineColors: '#e3e6ea',
      gridTextFamily: $.configs.get('site', 'fontFamily'),
      gridTextWeight: '300',
      numLines: 7,
      gridtextSize: 14,
      lineWidth: 1,
      lineColors: [$.colors("green", 600), $.colors("primary", 600)]
    });
  })();


  // Example Morris Area
  // -------------------
  (function() {
    Morris.Area({
      element: 'exampleMorrisArea',
      data: [{
        y: '6',
        a: 270,
        b: 160
      }, {
        y: '7',
        a: 210,
        b: 110
      }, {
        y: '8',
        a: 240,
        b: 130
      }, {
        y: '9',
        a: 280,
        b: 250
      }, {
        y: '10',
        a: 210,
        b: 140
      }, {
        y: '11',
        a: 150,
        b: 90
      }, {
        y: '12',
        a: 290,
        b: 180
      }, {
        y: '13',
        a: 280,
        b: 240
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      behaveLikeLine: true,
      ymax: 300,
      resize: true,
      pointSize: 3,
      smooth: true,
      gridTextColor: '#474e54',
      gridLineColor: '#eef0f2',
      goalLineColors: '#e3e6ea',
      gridTextFamily: $.configs.get('site', 'fontFamily'),
      gridTextWeight: '300',
      numLines: 7,
      gridtextSize: 14,
      lineWidth: 1,
      fillOpacity: 0.1,
      lineColors: [$.colors("primary", 600), $.colors("green", 600)]
    });
  })();


  // Example Morris Bar
  // ------------------
  (function() {
    Morris.Bar({
      element: 'exampleMorrisBar',
      data: [{
          y: '2013-6',
          a: 350,
          b: 410
        }, {
          y: '2013-7',
          a: 110,
          b: 300
        }, {
          y: '2013-8',
          a: 460,
          b: 130
        }, {
          y: '2013-9',
          a: 250,
          b: 310
        }
        // { y: '2013-10', a: 50, b: 40 },
        // { y: '2013-11', a: 75, b: 65 },
        // { y: '2013-12', a: 100, b: 90 }
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      barGap: 6,
      barSizeRatio: 0.35,
      smooth: true,
      gridTextColor: '#474e54',
      gridLineColor: '#eef0f2',
      goalLineColors: '#e3e6ea',
      gridTextFamily: $.configs.get('site', 'fontFamily'),
      gridTextWeight: '300',
      numLines: 6,
      gridtextSize: 14,
      resize: true,
      barColors: [$.colors("red", 500), $.colors("blue-grey", 300)]
    });
  })();


  // Example Morris Donut
  // --------------------
  (function() {
    Morris.Donut({
      element: 'exampleMorrisDonut',
      data: [{
        label: "Download Sales",
        value: 35
      }, {
        label: "In-Store Sales",
        value: 48
      }, {
        label: "Mail-Order Sales",
        value: 22
      }, ],
      // barSizeRatio: 0.35,
      resize: true,
      colors: [$.colors("red", 500), $.colors("primary", 500), $.colors("blue-grey", 300)]
    });
  })();

})(document, window, jQuery);
