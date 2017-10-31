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
			return $('body').data().flag;
		},
		getDepartmentId: function(){		
			return $('body').data().departmentId;			
		},
		getGroceryId: function(){
			return $('body').data().groceryId;
		},

		init: function() {

			var selector = '#todoapp li.list__item.list__item--tappable';

			this.todos   = $(selector).map(function() {
				
			    return $(this).data().element;
			}).get();

			this.groceryId    = this.getGroceryId();
			this.departmentId = this.getDepartmentId(); 
			// console.log(this.todos )

			this.bindEvents();

			new Router({
				'/:filter': function (filter) {
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');

			
			// :todo make it work inside bind events method
			$('input[type=radio][name=segment-filter]')
				.change(function() {
		        
		        	$(this).parent().find('.hide')[0].click()


			        

		    	});


		},
		bindEvents: function () {

			// works well & tested			
            $('#departmentList')
                .on('change', this.redirectToOtherDepartment.bind(this));


            // NOT WORKING!!!!!!!!    
    //         $('#toggle-all')
				// .on('change', this.toggleAll.bind(this));    


			// :todo i dont think that keyup its an awesome approach. it can work, but why?
			$('#new-todo')
				.on('keyup', this.create.bind(this));


			$('#footer').on('click', '#clear-completed', 
				this.destroyCompleted.bind(this));

			// #todo-list
			$('#todoapp')
				.on('change',   '.checkbox__input',  this.toggle.bind(this))
			// 	.on('dblclick', 'label',    this.editingMode.bind(this))
			// 	.on('keyup',    '.edit',    this.editKeyup.bind(this))
			// 	.on('focusout', '.edit',    this.update.bind(this))
				.on('click',    '.toolbar-button.destroy', this.destroy.bind(this));


            

		},
		// filterClick: function(event){
		// 	console.log($(event.target));
		// },
		render: function (flag=true) {

			var todos = this.getFilteredTodos();

				

			if( todos ){




				// if( flag ){



					// :todo BAD BAD BAD BAD BAD BAD BAD BAD method. HATE IT!
					// $('#todo-er').after(this.todoTemplate(todos))




					// $('#todo-list').html(  );
					// console.log(todos);	
				// }
				






			// explore this stuff
				$('#main').toggle(todos.length > 0);


				// explore this stuff
				// $('#toggle-all').prop('checked', 
				// 	this.getActiveTodos().length === 0
				// );

				// this.renderFooter();




				if( flag ) $('#new-todo').focus();


				// this.updateFooterCount();

			}

		},


		// :todo move it to server-render
		renderFooter: function () {

			// var todoCount       = this.todos.length;
			// var activeTodoCount = this.getActiveTodos().length;


			// var template = this.footerTemplate({
			// 	activeTodoCount: activeTodoCount,
			// 	activeTodoWord : util.pluralize(activeTodoCount, 'item'),
			// 	completedTodos : todoCount - activeTodoCount,
			// 	filter         : this.filter
			// });

			// investigate this toggle
			// $('#footer').toggle(todoCount > 0)
			// 	.html(template);


		},

		updateFooterCount: function(){

			console.log(this.todos);

			console.log( _.where(this.todos, { completed:false }) )	;
			console.log( _.where(this.todos, { completed:true }) )	;


			// var todoCount       = this.todos.length;
			// var activeTodoCount = this.getActiveTodos().length;
			// var completedTodos  = this.getCompletedTodos();
			$('span.count').html(activeTodoCount);

			// console.log(todo)
			// add pluralize stuff

			// console.log(todoCount)
			// console.log(activeTodoCount)
			// console.log(completedTodos)



			// if( completedTodos ){
				// console.log($('#clear-completed'));
				$('#clear-completed').show();
				// $('#clear-completed').removeClass('hide');
			// }

		},

		toggleAll: function (e) {
			var isChecked = $(e.target).prop('checked');

			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			var ingredientIds = _.pluck(this.todos, 'id');
			this._toggle(ingredientIds, isChecked)



			this.render();
		},


		getActiveTodos: function () {
			// console.log
			_.where	

			if(typeof this.todos !== 'string'){
				return this.todos.filter(function (todo) {

					console.log(todo)

					return !todo.completed;
				});	
			}	


			// return this.todos;		
		},
		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {

				console.log(todo)

				return todo.completed;
			});


			// return this.todos;
		},
		getFilteredTodos: function () {

			// console.log(this.filter)

			// if (this.filter === 'active') {
			// 	return this.getActiveTodos();
			// }

			// if (this.filter === 'completed') {
			// 	return this.getCompletedTodos();
			// }

			return this.todos;
		},


		destroyCompleted: async function () {

			// var array1  = this.todos;
			// this.todos  = this.getActiveTodos();
			// var array2  = this.getActiveTodos();
			

			// var difference = _.difference(array1, array2);
			// console.log(array1);
			// console.log(array2);
			// console.log(difference);



			// var array_of_ids = _.pluck(difference, 'id');
			// await this._unattach_async(array_of_ids);

			// this.filter = 'all';
			// this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		getIndexFromEl: function (e) {
			// can be li
			var $element = this.getElementFromEvent(e);
			var id       = $element.data().element.id;

			// console.log($element.data())

			// console.log(this.getDataField(e, 'id'))

			// :todo to understand why below line not working
			// var id    = this.getDataField(e, 'id');
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
		getMaxOrderNumber: function(){
			var ITEM = _.last(this.todos);
			return ITEM.order;
		},
		getItemObject: function(id, name){
			return {
				id  : id,
				name: name,

				completed: false,

				groceryId   : this.groceryId,
				departmentId: this.departmentId,
				order       : this.getMaxOrderNumber() + 1,

				custom: true
			};
		},
		create: function (e) {

			var $input       = $(e.target);
			var val          = $input.val().trim();
			// var departmentId = this.getDepartmentId();
			// console.log($input.val());
			var toSave = {
				name        : val,
				// groceryId   : this.getGroceryId(),
				// departmentId: this.getDepartmentId(),
				groceryId   : this.groceryId,
				departmentId: this.departmentId,
			};

			// 			console.log(toSave);
			// return ;
			if (e.which !== ENTER_KEY || !val) { return; }

			// :todo switch to fucntion
			var ITEM   = _.last(this.todos);

			var new_id = this.ajax_call('create-ingredient', toSave); 
							// || 'fake-id-for-ultimate-gl';

			// if( !new_id ) 
			// console.log(new_id);

			var new_object = {
				id: new_id,
				name: val,

				completed: false,

				groceryId: this.groceryId,
				departmentId: this.departmentId,
				order: ITEM.order + 1,

				custom: true
			}

			// console.log(new_object);
			this.todos.push(new_object);
			// console.log(this.todos);

			$input.val('');

			this.render();
		},
		toggle: function (event) {
			var index       = this.getIndexFromEl(event.target);
			var $ingredient = this.getElementFromEvent(event.target);
			var id          = $ingredient.data().element.id;
			// console.log($ingredient)
			// console.log(id);
			// console.log(index);

			// var id = this.getDataField(e, 'id');
		

			var flag =  $(event.target).prop('checked');

			// console.log(this.todos[index]);
			// console.log(flag)
			// console.log(this.todos);
			this.updateFooterCount();

			this.todos[index].completed = flag;
			// console.log(this.todos[index]);

			console.log(this.todos);


			// this._toggle( [ id ], flag );

			this.render();

		},
		editingMode: function (e) {

			// console.log($(e.target).closest('li'));
			// var $li = $(e.target).closest('li');
			// console.log($li.hasClas('completed'));
			// // if (data.custom)
			// :todo maybe, just maybe, we need to remove this hack. so we can edit name of purchased element too.
			// but for this moment it'll require a lot of changes on backend, so i gave up



			var $input = $(e.target).closest('li')
									.addClass('editing').find('.edit');

			var val    = $input.val();

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
		// This is a Rename function
		update: async function (e) {
			var el  = e.target;
			var $el = $(el);
			var val = $el.val().trim(); // :todo remove to name

			var index       = this.getIndexFromEl(el);
			// var $ingredient = this.getElementFromEvent(e.target);

			var id        = this.getDataField(e, 'id');
			var is_custom = this.getDataField(e, 'custom');

			console.log(id, is_custom)

			if ( !val ) {
				this.destroy(e);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
				this.render();
				return;
			} 


			if( val == this.todos[index].name ){
				this.render();
				return;
			}

			// this is a brand new ingredient - we'll update the name
			if( is_custom ){

				this._rename_async( id, val );
				this.todos[index].name = val;
				this.render();
				return ;

			} else {

				
				// 1_ we delete an ultimate ingredient from GL
				await this._unattach_async( [ id ] );	
				this.todos.splice(index, 1);


				// 2_ we create a new element and attach it to a GL
				var response;
				try {     
					response = await this._create_async(val);

				} catch (e) {
					Raven.captureException(e);
				}

				var obj = this.getItemObject(response.id, val);
				this.todos.push(obj);
				this.render();

			}	

		

			//jsue in case, if something go wrong
			// if ($el.data('abort')) {
			// 	$el.data('abort', false);
			// } else {

				// console.log(this.todos[index]);
				// this.todos[index].name = val;
			// }
			// this.render();
		},
		destroy: async function (e) {
			// var $ingredient = this.getElementFromEvent(e.target);

			var id = this.getDataField(e, 'id');
			await this._unattach_async( [ id ] );
			this.todos.splice(this.getIndexFromEl(e.target), 1);

			// not using false anymore
			// this.render(false);
		},
		getDataField: function(e, field){
			var $item = this.getElementFromEvent(e.target);
			// console.log(e);
			// maybe later we'll exclude few items, so pick will be helpful
			if( $item.data().element ){
				var value = _.pick($item.data().element, field);
				return value[field];	
			}
			return false;
			
		},
		_create_async: async function(name){
			var options = {
				name        : name,
				groceryId   : this.groceryId,
				departmentId: this.departmentId,
			};
			return new Promise(function(cb){
				$.ajax({
					type: "POST",
					url: '/create/ing/',
					dataType: 'json',
					data: options,				
					
				})
				.done(function(response){
					cb(response);
				});
			});


		},
		_rename_async: async function(id, name){
			var options = {			
				id  : id,
				name: name
			};
			return new Promise(function(cb){
				$.ajax({
					type: "POST",
					url: '/changename/',
					dataType: 'json',
					data: options			
				})
				.done(cb);
			});

		},
		_unattach_async: async function( ids ){
			var options = {			
				secondArray:  ids,
				groceryId: this.groceryId
			};
			return new Promise(function(cb){
				$.ajax({
					type: "POST",
					url: '/unattach/',
					dataType: 'json',
					data: options			
				})
				.done(cb);
			});
		},
		_toggle: async function(ids, flag){
			var options = {
				ingredients: ids,
				groceryId  : this.groceryId,
				type       : (flag) ? 'add' :'remove'
			};

			return new Promise(function(cb){
				$.ajax({
					type: "POST",
					url: '/togglepurchased/',
					dataType: 'json',
					data: options			
				})
				.done(cb);
			});
			
		},

		//methods, related to ajax calls
		// :todo finish this stuff and get rid of this function
		ajax_call: function(type, options) {

			if(this.isUltimate()) return false;

			if( type == 'create-ingredient' ){
				return this.ajax_CreateIngredient(options);
			}

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
			return new_id;
			// console.log(new_id);
		},


		redirectToOtherDepartment: function(){
			var path = "/shopping/" + this.groceryId + '/' + this.value;
  			window.location.replace(path);
		}


	};

	App.init();
});

