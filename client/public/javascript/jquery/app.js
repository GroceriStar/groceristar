/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

	// Handlebars.registerHelper('eq', function (a, b, options) {
	// 	return a === b ? options.fn(this) : options.inverse(this);
	// });






	var ENTER_KEY  = 13;
	var ESCAPE_KEY = 27;

	var util = {



		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},


		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},


		store: function (namespace, data) {
			if (arguments.length > 1) {
				// console.log('added');
				// return localStorage.setItem(namespace, JSON.stringify(data));

			} else {

				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];

			}
		},


		read: function(data){

			// var groceryId = $().data().groceryId;

			$.ajax({
				type: "GET",
				url: '/tatypidor/',
				dataType: 'json'
			}).done(function(data){
				console.log('success');
                console.log(JSON.stringify(data));
			})

		},
		save: function(data){
			// $.ajax({
			// 	type: "GET",
			// 	url: '/tatypidor',
			// 	dataType: 'json'
			// }).done(function(data){
			// 	console.log('success');
   //              console.log(JSON.stringify(data));
			// })
			console.log(data);

			// var data = {};
			// data.title = "title";
			// data.message = "message";
					
			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				dataType: 'json',
		        // contentType: 'application/json',
                url: 'ktobylobosran',						
                success: function(data) {
                    console.log('success');
                    console.log(JSON.stringify(data));
                }
            });

		}
	};



	// Handlebars.compile($('#footer-template').html());


	var App = {
		init: function () {

			// todoTemplate1('123');
			// console.log( util.read() );

			this.todos = util.store('todos-jquery');

			// this.todos = util.read();
			// console.log(this.todos);

			// this.todoTemplate = Handlebars.compile($('#todo-template').html());
			// console.log(this.todoTemplate);

			// this.footerTemplate = Handlebars.compile($('#footer-template').html());
			// console.log(this.footerTemplate);

			this.bindEvents();



			new Router({
				'/:filter': function (filter) {
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');



		},
		bindEvents: function () {
			$('#new-todo').on('keyup', this.create.bind(this));
			$('#toggle-all').on('change', this.toggleAll.bind(this));
			$('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
			$('#todo-list')
				.on('change',   '.toggle',  this.toggle.bind(this))
				.on('dblclick', 'label',    this.editingMode.bind(this))
				.on('keyup',    '.edit',    this.editKeyup.bind(this))
				.on('focusout', '.edit',    this.update.bind(this))
				.on('click',    '.destroy', this.destroy.bind(this));
		},
		render: function () {
			var todos = this.getFilteredTodos();

			// console.log(todos);

			$('#todo-list').html(
				this.todoTemplate(todos)
				// this.todoTemplate(todos)
			);

			$('#main').toggle(todos.length > 0);
			$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);

			this.renderFooter();

			$('#new-todo').focus();

			// do we need to pass all items? or we just can handle item, that was changed.
			// this.save(this.todos);
			util.store('todos-jquery', this.todos);




		},
		renderFooter: function () {

			var todoCount       = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;

			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			$('#footer').toggle(todoCount > 0).html(template);
		},
		toggleAll: function (e) {
			var isChecked = $(e.target).prop('checked');

			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			this.render();
		},
		getActiveTodos: function () {
			return this.todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
		},
		getFilteredTodos: function () {
			if (this.filter === 'active') {
				return this.getActiveTodos();
			}

			if (this.filter === 'completed') {
				return this.getCompletedTodos();
			}

			return this.todos;
		},
		destroyCompleted: function () {
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		getIndexFromEl: function (el) {
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		create: function (e) {
			var $input = $(e.target);
			var val = $input.val().trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			this.todos.push({



				id: util.uuid(),

				title: val,

				completed: false,

				departmentId: false,
				groceryId: false,
				order: false
			});

			$input.val('');

			this.render();
		},
		toggle: function (e) {
			var i = this.getIndexFromEl(e.target);
			console.log(this.todos);
			this.todos[i].completed = !this.todos[i].completed;
			console.log(this.todos);
			this.render();
		},
		editingMode: function (e) {
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			var val = $input.val();
			$input.val('').focus().val(val);
		},
		editKeyup: function (e) {
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
		},
		update: function (e) {
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim();

			if (!val) {
				this.destroy(e);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos[this.getIndexFromEl(el)].title = val;
			}

			this.render();
		},
		destroy: function (e) {
			this.todos.splice(this.getIndexFromEl(e.target), 1);
			this.render();
		},

		// templates related stuff
		todoTemplate: function(elements, index){

			var html = '';

			_.each(elements
			// 	[
			// {
			// 	completed:false, id:123, title: 'pidaras1'
			// },{
			// 	completed:false, id:22, title: 'pidaras2'
			// },{
			// 	completed:false, id:100, title: 'pidaras3'
			// }
			// ]
			, function(element){

				var single = '';

				if( element.completed ){
					single += '<li class="completed" data-id="' + element.id + '" data-department-id="' + element.departmentId + '", data-order="' + index + '">';
				} else {
					single += '<li data-id="' + element.id + '" data-department-id="' + element.departmentId + '", data-order="' + index + '" >';
				}

				  single += '<div class="view">' ;
					if( element.completed ){
						single += '<input class="toggle" type="checkbox" checked>';
					} else {
						single += '<input class="toggle" type="checkbox" >';
					}

						
					single += '<label>' + element.title + '</label>'+
								'<button class="destroy"></button>'+
						'</div>'+
						'<input class="edit" value="' + element.title + '">'

				single += '</li>';

				html += single;

				
			});

			// console.log(html);
			return html;
		},
	

		footerTemplate : function(data){
			// <script id="footer-template"
			var html = '<span id="todo-count">' +
					'<strong>' + data.activeTodoCount + ' </strong>' +
					data.activeTodoWord + ' left' +
			 	'</span>';

			html += '<ul id="filters">' +
					'<li>';

			if( data.filter === 'all'){
				html += '<a class="selected" href="#/all">All</a>';
			} else {
				html += '<a href="#/all">All</a>';
			}

			if( data.filter === 'active'){
				html += '<a class="selected" href="#/active">Active</a>';
			} else {
				html += '<a href="#/active">Active</a>';
			}

			if( data.filter === 'completed'){
				html += '<a class="selected" href="#/completed">Completed</a>';
			} else {
				html += '<a href="#/completed">Completed</a>';
			}	

			html += '</ul>';				

			if (data.completedTodos){
				html += '<button id="clear-completed">Clear completed</button>';
			}


			// console.log(html);
			return html;
		}

		// template related stuff

	};

	App.init();
});
