/*global app, $on */
(function () {
	'use strict';

	function Todo(name) {
		this.model = new app.Model( name );
		this.view = new app.View( );
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Todo('todos-truecar');

})();
