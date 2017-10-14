/*global jQuery, Router */
jQuery(function ($) {
	'use strict';

	var ENTER_KEY  = 13;
	var ESCAPE_KEY = 27;

	var util = {


		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		}

		
	};



	var App = {
		isUltimate: function(){
			var flag = $('body').data().isUltimate;
			return flag;			
		},


		getDepartmentId: function(){
			var departmentId = $('#new-todo').data().departmentId;
			return departmentId;			
		},
		getGroceryId: function(){

			var groceryId = $('body').data().groceryId;
			return groceryId;
		},
		init: function () {

			var groceryId    = this.getGroceryId();
			var departmentId = this.getDepartmentId();	

			var myVariable;



			$.ajax({
				type: "GET",
				url: '/getingredients/' + groceryId + '/' + departmentId,
				dataType: 'json',
				'async': false
			}).done(function(data){
				
                myVariable = JSON.stringify(data);
                myVariable = JSON.parse(myVariable);
               
			
			});

			
			this.todos = myVariable || [];		
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

			if( todos ){

				$('#todo-list').html( this.todoTemplate(todos) );

			
				$('#main').toggle(todos.length > 0);

				$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);

				this.renderFooter();

				$('#new-todo').focus();

			}

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

			$('#footer').toggle(todoCount > 0)
				.html(template);
		},
		toggleAll: function (e) {
			var isChecked = $(e.target).prop('checked');

			// console.log( isChecked );

			// console.log(this.todos);

			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			console.log(this.todos);

			var ingredientIds = _.pluck(this.todos, 'id');
			console.log(ingredientIds);
			// move all ids to purchased.
			var toPurchase = {
				ingredients: ingredientIds,
				groceryId: this.getGroceryId()
			};
			console.log(toPurchase);


            // don't save if it for demo purposes only 



			if( isChecked ){

				//add ingredients to purchased
				toPurchase.type = 'add';

				$.ajax({
					type: "POST",
					url: '/togglepurchased/',
					dataType: 'json',
					data: toPurchase,
					
					'async': false
				}).done(function(data){
					
					//console.log('success add all ingredients');
					// console.log(data);

				});

			} else {

				//remove ingredients from purchased
				toPurchase.type = 'remove';
				$.ajax({
					type: "POST",
					url: '/togglepurchased/',
					dataType: 'json',
					data: toPurchase,
					
					'async': false
				}).done(function(data){
					
					//console.log('success remove all ingredients from purchased');
					// console.log(data);

				});
			}


			

			// move this to another place, please :todo
			// var result = false;
			


			this.render();
		},
		getActiveTodos: function () {

			if(typeof this.todos !== 'string'){
				return this.todos.filter(function (todo) {
					return !todo.completed;
				});	
			}

			
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

			var array1  = this.todos;
			this.todos  = this.getActiveTodos();
			var array2  = this.getActiveTodos();
			this.filter = 'all';

			var difference = _.difference(array1, array2);

			var toRemove = {
				ingredients: _.pluck(difference, 'id'),
				groceryId: this.getGroceryId()
			};

			// console.log(difference);
			// console.log(toRemove);


			// don't save if it for demo purposes only


			$.ajax({
				type: "POST",
				url: '/unattach/',
				dataType: 'json',
				data: toRemove,
				
				'async': false
			}).done(function(data){
				
				// console.log('success destroyCompleted');

			});

			this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		getIndexFromEl: function (element) {
			var $ingredient = this.getElementFromEvent(element);
			var id    = $ingredient.data('id');

			var todos = this.todos;
			var i     = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		getElementFromEvent: function(element){
			var $ingredient = $(element).closest('li');
			return $ingredient;
		},
		create: function (e) {

			var $input       = $(e.target);
			var val          = $input.val().trim();
			var departmentId = $input.data().departmentId;

			var toSave = {
				name: val,
				groceryId: this.getGroceryId(),
				departmentId: departmentId,
			};

			if (e.which !== ENTER_KEY || !val) { return; }

			
			var ITEM = _.last(this.todos);
			// console.log(ITEM.order);

			var order_for_new_element = ITEM.order + 1;
			// console.log(order_for_new_element);



			// don't save if it for demo purposes only




			var new_id = false;
			$.ajax({
				type: "POST",
				url: '/create/ing/',
				dataType: 'json',
				data: toSave,
				
				'async': false
			}).done(function(data){
				
				// console.log('success');
				new_id = data.id;
			});

			var new_object = {
				id: new_id,
				name: val,

				completed: false,

				groceryId: this.getGroceryId(),
				departmentId: departmentId,
				order: order_for_new_element
			}

			// console.log(new_object);
			this.todos.push(new_object);


			$input.val('');

			this.render();
		},
		toggle: function (event) {
			var i = this.getIndexFromEl(event.target);
			var $ingredient = this.getElementFromEvent(event.target);

			// console.log( $(event.target).prop('checked') );

			var flag =  $(event.target).prop('checked');



			// console.log(e);

			// console.log(this.todos);
			this.todos[i].completed = !this.todos[i].completed;


			// checked 
			if (flag){

				//add to purchased
				var toPurchase = {
					ingredients: [ $ingredient.data().id ],
					groceryId: this.getGroceryId(),
					type: 'add' 
				};
				// console.log(toPurchase)


				// don't save if it for demo purposes only




				// move this to another place, please :todo
				// var result = false;
				$.ajax({
					type: "POST",
					url: '/togglepurchased/',
					dataType: 'json',
					data: toPurchase,
					
					'async': false
				}).done(function(data){
					
					//console.log('success AddToPurchased');
					// console.log(data);

					// result = data.id;
				});
				// console.log(result);


			} else {

				// remove from purchased
				var toPurchase = {
					ingredients: [ $ingredient.data().id ],
					groceryId: this.getGroceryId(),
					type: 'remove'
				};
			// console.log(toPurchase)


			// don't save if it for demo purposes only



			// move this to another place, please :todo
			// var result = false;
				$.ajax({
					type: "POST",
					url: '/togglepurchased/',
					dataType: 'json',
					data: toPurchase,
					
					'async': false
				}).done(function(data){
					
					//console.log('success removed Purchased');
					// console.log(data);

					// result = data.id;
				});
				// console.log(result);


			}





			this.render();
		},
		editingMode: function (e) {

			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			var val = $input.val();

			// console.log($input);
			//console.log($input.val());

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

			var index       = this.getIndexFromEl(el);
			var $ingredient = this.getElementFromEvent(e.target);


			if (!val) {
				this.destroy(e);
				return;
			}

			// console.log(index)
			// console.log()

			// console.log($ingredient.data().id)

			// console.log(val);

			var toRename = {
				id  : $ingredient.data().id,
				name: val
			};
			// console.log(toRename);




			// don't save if it for demo purposes only

			$.ajax({
				type: "POST",
				url: '/changename/',
				dataType: 'json',
				data: toRename,
				
				'async': false
			}).done(function(data){
				
				//console.log('success update name');

			});


			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos[index].name = val;
			}

			this.render();
		},
		destroy: function (e) {
			var $ingredient = this.getElementFromEvent(e.target);
			var id = $ingredient.data('id');
			var toRemove = {
				ingredients: [ id ],
				groceryId: this.getGroceryId()
			};

			// don't save if it for demo purposes only

			$.ajax({
				type: "POST",
				url: '/unattach/',
				dataType: 'json',
				data: toRemove,
				
				'async': false
			}).done(function(data){
				
				//console.log('success destroy one ingredient');

			});

			this.todos.splice(this.getIndexFromEl(e.target), 1);
			this.render();
		},

		// templates related stuff
		todoTemplate: function(elements, index){

			var html = '';
			_.each(elements, function(element){

				var single = '';

				if( element.completed ){
					single += '<li class="completed" data-id="' + element.id + '" data-department-id="' + element.departmentId + '", data-order="' + element.order + '">';
				} else {
					single += '<li data-id="' + element.id + '" data-department-id="' + element.departmentId + '", data-order="' + element.order + '" >';
				}

				  single += '<div class="view">' ;
					if( element.completed ){
						single += '<input class="toggle" type="checkbox" checked>';
					} else {
						single += '<input class="toggle" type="checkbox" >';
					}

						
					single += '<label>' + element.name + '</label>'+
								'<button class="destroy"></button>'+
						'</div>'+
						'<input class="edit" value="' + element.name + '">'
					// single += '<label>' + element.name + '<span class="drag-handle">☰</span></label>'+
					// 			'<button class="destroy"></button>'+
					// 	'</div>'+
					// 	'<input class="edit" value="' + element.name + '">'	

				single += '</li>';

				html += single;

				
			});
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
				html += '<a class="selected" href="#/completed">Purchased</a>';
			} else {
				html += '<a href="#/completed">Purchased</a>';
			}	

			html += '</ul>';				

			if (data.completedTodos){
				html += '<button id="clear-completed">Clear purchased</button>';
			}


			// console.log(html);
			return html;
		}
		// template related stuff

		//methods, related to ajax calls
		ajax_call : function(type){
	
			switch (type) {
			  case value1:
			    
			    break;
			  case value2:
			    
			    break;
			 
			  case valueN:
			    
			    break;
			  default:
			    
			    break;
			}

		},
		ajax_GetIngredients :  function(groceryId, departmentId){

			let myVariable
			
			$.ajax({
				type: "GET",
				url: '/getingredients/' + groceryId + '/' + departmentId,
				dataType: 'json',
				'async': false
			}).done(function(data){
				
                myVariable = JSON.stringify(data);
                myVariable = JSON.parse(myVariable);
               
			
			});

			console.log(myVariable);
			// return myVariable
		},

		ajax_TogglePurchased2 : function(toPurchase){

			$.ajax({
				type: "POST",
				url: '/togglepurchased/',
				dataType: 'json',
				data: toPurchase,
				
				'async': false
			}).done(function(data){
				
				//console.log('success add all ingredients');
				// console.log(data);

			});
		},

		ajax_Unattach2 : function(toRemove){
			$.ajax({
				type: "POST",
				url: '/unattach/',
				dataType: 'json',
				data: toRemove,
				
				'async': false
			}).done(function(data){
				
				// console.log('success destroyCompleted');

			});
		},

		ajax_CreateIngredient: function(toSave){
			var new_id = false;
			$.ajax({
				type: "POST",
				url: '/create/ing/',
				dataType: 'json',
				data: toSave,
				
				'async': false
			}).done(function(data){
				
				// console.log('success');
				new_id = data.id;
			});
			// console.log(new_id);
		},

	};

	App.init();
});