(function () {
	'use strict';

	// Simple list
	// var list = document.getElementById("todo-todo-todo");
	// Sortable.create(list); // That's all.


	Sortable.create(byId('todo-todo-todo'),{
		handle: '.drag-handle',
		animation: 150
	}); // That's all.

});

