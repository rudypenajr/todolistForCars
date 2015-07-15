(function (window) {
	'use strict';

	// manage view and model
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind( 'newTodo', function ( title ) {
			self.addItem( title );
		} );

		self.view.bind( 'itemRemove', function ( item ) {
			self.removeItem( item.id );
		});
	}

	Controller.prototype.addItem = function ( title ) {
		var self = this;

		if (title.trim() === '') {
			return;
		}

		self.model.create(title, function ( newItemData ) {
			// clear out old input
			self.view.$formInput.value = '';

			// build list item
			var li = self.view.generateListItem( newItemData );
			self.view.$ul.appendChild( li );
		});
	};

	Controller.prototype.removeItem = function ( id ) {
		var self = this;

		self.model.remove( id, function ( id ) {
			self.view.removeListItem( id );
		});
	};

	window.app = window.app || {};
	window.app.Controller = Controller;

})(window);
