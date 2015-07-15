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

  View.prototype.generateListItem = function ( newItemData ) {
    var data = newItemData[0];
    var liLength = this.$ul.childElementCount + 1;
    var li = document.createElement( 'li' );
    li.setAttribute( 'data-id', data.id );

    var spanPosition = document.createElement( 'span' );
    var spanTitle = document.createElement( 'span' );
    var spanDelete = document.createElement( 'a' );

    spanPosition.className = 'list-item-position';
    spanTitle.className = 'list-item-title';
    spanDelete.className = 'right list-item-title-delete';

    spanPosition.innerText = liLength + '.';
    spanTitle.innerText = data.title;
    spanDelete.innerText = 'delete';

    li.appendChild( spanPosition );
    li.appendChild( spanTitle );
    li.appendChild( spanDelete );

		return li;
  };

  window.app = window.app || {};
  window.app.View = View;

}(window));
