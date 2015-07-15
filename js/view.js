/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
    'use strict';

    // set defaults for DOM
    function View( ) {
      this.$formInput = document.getElementsByClassName( 'js-item-input' )[0];
      this.$primaryBtn = document.getElementsByClassName( 'btn-primary' )[0];
      this.$jsonBox = document.getElementsByTagName( 'textarea' )[0];
      this.$ul = document.getElementsByClassName( 'todo-items' )[0];
    }

    View.prototype.bind = function (event, handler) {
      var self = this;

      if (event === 'newTodo') {
        self.$primaryBtn.addEventListener( 'click', function ( ) {
          handler( self.$formInput.value );
        } );
      }
  };

    window.app = window.app || {};
    window.app.View = View;

}(window));
