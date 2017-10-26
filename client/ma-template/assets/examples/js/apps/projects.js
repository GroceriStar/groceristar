/*!
 * remark v1.0.7 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  window.AppProjects = App.extend({
    handleSelective: function() {
      var members = [{
          id: 'uid_1',
          name: 'Herman Beck',
          img: '../../../assets/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Mary Adams',
          img: '../../../assets/portraits/2.jpg'
        }, {
          id: 'uid_3',
          name: 'Caleb Richards',
          img: '../../../assets/portraits/3.jpg'
        }, {
          id: 'uid_4',
          name: 'June Lane',
          img: '../../../assets/portraits/4.jpg'
        }],
        selected = [{
          id: 'uid_1',
          name: 'Herman Beck',
          img: '../../../assets/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Caleb Richards',
          img: '../../../assets/portraits/2.jpg'
        }];

      $('[data-plugin="jquery-selective"]').selective({
        namespace: 'addMember',
        local: members,
        selected: selected,
        buildFromHtml: false,
        tpl: {
          optionValue: function(data) {
            return data.id;
          },
          frame: function() {
            return '<div class="' + this.namespace + '">' +
              this.options.tpl.items.call(this) +
              '<div class="' + this.namespace + '-trigger">' +
              this.options.tpl.triggerButton.call(this) +
              '<div class="' + this.namespace + '-trigger-dropdown">' +
              this.options.tpl.list.call(this) +
              '</div>' +
              '</div>' +
              '</div>'
          },
          triggerButton: function() {
            return '<div class="' + this.namespace + '-trigger-button"><i class="wb-plus"></i></div>';
          },
          listItem: function(data) {
            return '<li class="' + this.namespace + '-list-item"><img class="avatar" src="' + data.img + '">' + data.name + '</li>';
          },
          item: function(data) {
            return '<li class="' + this.namespace + '-item"><img class="avatar" src="' + data.img + '">' +
              this.options.tpl.itemRemove.call(this) +
              '</li>';
          },
          itemRemove: function() {
            return '<span class="' + this.namespace + '-remove"><i class="wb-minus-circle"></i></span>';
          },
          option: function(data) {
            return '<option value="' + this.options.tpl.optionValue.call(this, data) + '">' + data.name + '</option>';
          }
        }
      });
    },
    run: function(next) {
      this.handleSelective();
      next();
    }
  });

  $(document).ready(function() {
    AppProjects.run();
  });
})(document, window, jQuery);
