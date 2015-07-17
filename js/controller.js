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

	Controller.prototype.addAll = function ( ) {
		var self = this;
		var allItems = self.model.read();
		var allItemsJSON = self.model.readJSON();

		self.view.renderAll( allItems );
		// populate textarea with json of titles
		self.view.$jsonBox.innerText = allItemsJSON;
	};

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

			// fix up textarea
			var updatedJSON = self.model.readJSON();
			self.view.$jsonBox.innerText = updatedJSON;
		});
	};

	Controller.prototype.removeItem = function ( id ) {
		var self = this;

		self.model.remove( id, function ( id ) {
			self.view.removeListItem( id );

			// fix up textarea
			var updatedJSON = self.model.readJSON();
			self.view.$jsonBox.innerText = updatedJSON;
		});
	};

	window.app = window.app || {};
	window.app.Controller = Controller;

})(window);
