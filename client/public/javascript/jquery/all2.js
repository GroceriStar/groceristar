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
		// getIngredients: function(){
		// 	return $('body').data().ingredients;
		// },
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
			$('input[type=radio][name=segment-filter]').change(function() {
		        
		        $(this).next()[0].click();
		        

		    });


		},
		bindEvents: function () {

			// works well & tested			
            $('#departmentList')
                .on('change', this.redirectToOtherDepartment.bind(this));

            $('#toggle-all')
				.on('change', this.toggleAll.bind(this));    


			// :todo i dont think that keyup its an awesome approach. it can work, but why?
			$('#new-todo')
				.on('keyup', this.create.bind(this));


			// $('#footer').on('click', '#clear-completed', 
			// 	this.destroyCompleted.bind(this));

			// #todo-list
			// $('#todoapp')
			// 	.on('change',   '.toggle',  this.toggle.bind(this))
			// 	.on('dblclick', 'label',    this.editingMode.bind(this))
			// 	.on('keyup',    '.edit',    this.editKeyup.bind(this))
			// 	.on('focusout', '.edit',    this.update.bind(this))
			// 	.on('click',    '.toolbar-button.destroy', this.destroy.bind(this));


            

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




			}

		},

		// todoTemplate: function(elements, index){

		// 	var html = '';
		// 	_.each(elements, function(element){

		// 		var single = '';
		// 		var dataAttrs = 'data-id="' + element.id + 
		// 		                 '" data-department-id="' + element.departmentId +
		// 		 	             '" data-order="' + element.order + '" ' + 
		// 		 	             'data-custom="' + element.custom + '"';
				
		// 		single += 
		// 		  '<li class="list__item list__item--tappable ';

		// 		  if( element.completed ){
		// 		  	single += 'completed' // :todo reod later this thng with ES6 stuff because i hate current setup
		// 		  }
		// 	  		single += '" ' + dataAttrs;
		// 	    single += '>' +
		// 	    '<div class="list__item__left">' +
		// 	      '<label class="checkbox">' +
		// 	        '<input type="checkbox" id="checkbox' + element.order + '"'+ 
		// 	        'class="checkbox__input" name="c"';
  //   				  if( element.completed ){
		// 		  	single += ' checked="checked"' // :todo reod later this thng with ES6 stuff because i hate current setup
		// 		  }    
			        	
		// 	single += '>' +
		// 	        '<div class="checkbox__checkmark"></div>' +
		// 	      '</label>' +
		// 	    '</div>' +

			      	
		// 	    '<label for="checkbox' + element.order + '"'+
		// 	        '"class="list__item__center"' +
			    	
		// 	    '>' +
		// 	      '<span';

			    
		// 	    if( element.completed ){
		// 		  	single += ' style="text-decoration: line-through;" ';
		// 		  	// :todo reod later this thng with ES6 stuff because i hate current setup
		// 		}  

  //      		 single +=  '>' +
		// 	      	element.name +
			      
		// 	      '</span>' +
			      
		// 	      '<input type="text" class="text-input edit" '+ 
  //     					  'value="' + element.name + '" style="display: none;">' +
		// 	    '</label>' +
		// 	    '<div class="list__item__right">' +
		// 	      '<div class="list__item__label">' +
			      
		// 	      	'<button class="toolbar-button destroy">' +
		// 			  '<i class="fa fa-times" style="font-size:17px"></i>' +
		// 			'</button>' +
		// 	  	'</div>' +
		// 	    '</div>' +
		// 	  '</li>';

		// 	  // console.log(single);


		// 		// if( element.completed ){
		// 		// 	single += '<li class="completed" data-id="' + element.id + '" data-department-id="' + element.departmentId +
		// 		// 	 '", data-order="' + element.order + '"' + 'data-custom="' + element.custom + '">';
		// 		// } else {
		// 		// 	single += '<li data-id="' + element.id + 
		// 		// 	'" data-department-id="' + element.departmentId + 
		// 		// 	'", data-order="' + element.order + '"' + 'data-custom="' + element.custom + '">';
		// 		// }

		// 		//   single += '<div class="view">' ;
		// 		// 	if( element.completed ){
		// 		// 		single += '<input class="toggle" type="checkbox" checked>';
		// 		// 	} else {
		// 		// 		single += '<input class="toggle" type="checkbox" >';
		// 		// 	}

						
		// 		// 	single += '<label>' + element.name + '</label>'+
		// 		// 				'<button class="destroy"></button>'+
		// 		// 		'</div>'+
		// 		// 		'<input class="edit" value="' + element.name + '">'
		// 		// 	// single += '<label>' + element.name + '<span class="drag-handle">☰</span></label>'+
		// 		// 	// 			'<button class="destroy"></button>'+
		// 		// 	// 	'</div>'+
		// 		// 	// 	'<input class="edit" value="' + element.name + '">'	

		// 		// single += '</li>';

		// 		html += single;

				
		// 	});
		// 	return html;
		// },

		// :todo move it to server-render
		renderFooter: function () {

			var todoCount       = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;


			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord : util.pluralize(activeTodoCount, 'item'),
				completedTodos : todoCount - activeTodoCount,
				filter         : this.filter
			});


			// $('#footer').toggle(todoCount > 0)
			// 	.html(template);







			// $('#footer-link').after(template);

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

			// if(typeof this.todos !== 'string'){
			// 	return this.todos.filter(function (todo) {
			// 		return !todo.completed;
			// 	});	
			// }	


			return this.todos;		
		},
		getCompletedTodos: function () {
			// return this.todos.filter(function (todo) {
			// 	return todo.completed;
			// });


			return this.todos;
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

			var array1  = this.todos;
			this.todos  = this.getActiveTodos();
			var array2  = this.getActiveTodos();
			this.filter = 'all';

			var difference = _.difference(array1, array2);
			var array_of_ids = _.pluck(difference, 'id');
			await this._unattach_async(array_of_ids);
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
		getMaxOrderNumber: function(){
			var ITEM = _.last(this.todos);
			return ITEM.order;
		},
		getItemObject: function(id, name){
			return {
				id  : id,
				name: name,

				completed: false,

				groceryId   : this.getGroceryId(),
				departmentId: this.getDepartmentId(),
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

				groceryId: this.getGroceryId(),
				departmentId: this.getDepartmentId(),
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
			var i = this.getIndexFromEl(event.target);
			var $ingredient = this.getElementFromEvent(event.target);

			// console.log( $(event.target).prop('checked') );

			var flag =  $(event.target).prop('checked');

			this.todos[i].completed = !this.todos[i].completed;
			this._toggle( [ $ingredient.data().id ], flag );
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
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim(); // :todo remove to name

			var index       = this.getIndexFromEl(el);
			var $ingredient = this.getElementFromEvent(e.target);

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
			if( $ingredient.data().custom ){

				this._rename_async($ingredient.data().id, val);
				this.todos[index].name = val;
				this.render();
				return ;

			} else {

				
				// 1_ we delete an ultimate ingredient from GL
				await this._unattach_async( [ $ingredient.data().id ] );	
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
			var $ingredient = this.getElementFromEvent(e.target);
			console.log('cliiiiiiiiiiiiiiiiiii')
			await this._unattach_async( [ $ingredient.data('id') ] );
			this.todos.splice(this.getIndexFromEl(e.target), 1);
			this.render(false);
		},

	
		footerTemplate: function(data){
 
			var html = 

			'<ul class="list" id="footer">'+
			  '<li class="list__item" style="padding-top: 15px;">'+
			    '<div class="list__item__center"> '+
			      data.activeTodoCount + ' ' + data.activeTodoWord + ' left'+
			    '</div>'+
			    '<div class="list__item__right">'+
			      '<div class="list__item__label">'; 

			if (data.completedTodos) {
				html += '<button id="clear-completed">Clear purchased </button>';
			}
			    
			      	
			html +=   '</div>'+
			    '</div>'+
			  '</li>'+
			'</ul>'+

			'<br />';



			html += 
			'<div id="filters" class="button-bar" ' +
				'style="width:280px;margin:0 auto;">' +
			  '<div class="button-bar__item">'+
			    '<input type="radio" name="segment-filter" ';

			if (data.filter === 'all') {
				html += 'checked';
			}
			
			html += '>' +    
			    '<a href="#/all" style="display:none;">All</a>'+
			    '<button class="button-bar__button" data-href="#/all">All</button>'	    +
			    
			  '</div>'+
			  '<div class="button-bar__item">'+
			  	'<input type="radio" name="segment-filter" ';

			if (data.filter === 'active') {
				html += 'checked';
			}
			
			html += '>' + 
				'<a href="#/active" style="display:none;">Active</a>'+
				'<button class="button-bar__button" data-href="#/active">Active</button>'+
			  
			  '</div>'+
			  '<div class="button-bar__item">'+
			  	'<input type="radio" name="segment-filter" ';

			if (data.filter === 'completed') {
				html += 'checked';
			}
			
			html += '>' +  	
				
				'<a href="#/completed" style="display:none;">Purchased</a>'+
				'<button class="button-bar__button">Purchased</button>' +

			  '</div>'+
			'</div>';

			return html;
		},
		// template related stuff

		_create_async: async function(name){
			var options = {
				name        : name,
				groceryId   : this.getGroceryId(),
				departmentId: this.getDepartmentId(),
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
				groceryId: this.getGroceryId()
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
				groceryId  : this.getGroceryId(),
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
