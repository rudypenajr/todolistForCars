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
	}

	Controller.prototype.addItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}

		self.model.create(title, function () {
			self.view.render('clearNewTodo');
			self._filter(true);
		});
	};

	window.app = window.app || {};
	window.app.Controller = Controller;

})(window);
