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

	Model.prototype.verifyLocalStorage = function ( name ) {
		if ( !name ) {
			alert( 'Please pass in a name for your localStorage.' );
		}
		
		if (!localStorage[name]) {
			var data = {
				todos: []
			};

			localStorage[name] = JSON.stringify(data);
		}
	};

	Model.prototype.read = function ( ) {
		var data = JSON.parse( localStorage['todos-truecar'] );
		data = data.todos;

		return data;
	};

	Model.prototype.readJSON = function ( ) {
		var json = [];
		var data = JSON.parse( localStorage['todos-truecar'] );
		data = data.todos;

		for (var i = 0; i < data.length; i++) {
			var title = data[i].title;

			json.push( title );
		}

		return JSON.stringify( json );
	};

	Model.prototype.create = function ( title, callback ) {
		title = title || '';
		callback = callback || function () {};

		var newItem = {
			title: title.trim()
		};

		this.save( newItem, callback );
	};

	Model.prototype.save = function ( newItemData, callback, id ) {
		var data, todos;
		if ( localStorage['todos-truecar'] ) {
			data = JSON.parse( localStorage['todos-truecar'] );
			todos = data.todos;
		} else {
			this.verifyLocalStorage( 'todos-truecar' );
			data = {};
			data.todos = [];
			todos = data.todos;
		}

		callback = callback || function () {};

		// Generate an ID
		newItemData.id = new Date().getTime();

		todos.push( newItemData );
		localStorage['todos-truecar'] = JSON.stringify(data);
		callback.call(this, [newItemData]);
	};

	Model.prototype.remove = function ( id, callback ) {
		var data = JSON.parse( localStorage['todos-truecar'] );
		var todos = data.todos;

		for (var i = 0; i < todos.length; i++) {
			if ( todos[i].id == parseInt( id ) ) {
				todos.splice(i, 1);
				break;
			}
		}

		localStorage['todos-truecar'] = JSON.stringify( data );
		callback.call( this, id );
	};

	Model.prototype.removeAll = function ( ) {
		localStorage.clear();
	};

	window.app = window.app || {};
	window.app.Model = Model;

})(window);
