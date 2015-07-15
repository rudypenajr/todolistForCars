(function (window) {
	'use strict';

	// set localStorage name
	function Model( name ) {
		if ( !name ) {
			alert( 'Please pass in a name for your localStorage.' );
		}

		if (!localStorage[name]) {
			var data = {
				todos: []
			};

			localStorage[name] = JSON.stringify(data);
		}
	}

	Model.prototype.create = function ( title, callback ) {
		title = title || '';
		callback = callback || function () {};

		var newItem = {
			title: title.trim()
		};

		this.save( newItem, callback );
	};

	Model.prototype.save = function ( newItemData, callback, id ) {
		var data = JSON.parse( localStorage['todos-truecar'] );
		var todos = data.todos;

		callback = callback || function () {};

		// Generate an ID
		newItemData.id = new Date().getTime();

		todos.push( newItemData );
		localStorage['todos-truecar'] = JSON.stringify(data);
		callback.call(this, [newItemData]);
	};

	window.app = window.app || {};
	window.app.Model = Model;

})(window);
