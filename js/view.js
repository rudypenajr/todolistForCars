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

      self.$formInput.addEventListener( 'keypress', function ( e ) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          // code for enter
          handler( self.$formInput.value );
        }
      } );
    } else if (event === 'itemRemove') {
      self.$ul.addEventListener( 'click', function ( event ) {
        var li = event.target.parentElement;

        handler( {
          id: self._itemId( li )
        } );
      } );
    }
  };

  View.prototype.renderAll = function ( allListItems ) {
    for (var i = 0; i < allListItems.length; i++) {
      var li = allListItems[i];
      var html = this.generateListItem( li );

      this.$ul.appendChild( html );
    }
  };

  View.prototype._itemId = function ( element ) {
    if ( element && element.dataset && !element.dataset.id ) {
      alert( 'This list item has no id.' );
    }

    return element.dataset.id;
  };

  View.prototype.generateListItem = function ( newItemData ) {
    var data = newItemData[0];
    if ( !data ) {
      data = newItemData;
    }

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

  View.prototype.removeListItem = function ( id ) {
    var parent = this.$ul;
    var allListItems = document.querySelectorAll( '[data-id]' );

    for (var i = 0; i < allListItems.length; i++) {
      var li = allListItems[i];

      if ( li.getAttribute( 'data-id' ) === id ) {
        parent.removeChild( allListItems[i] );
      }
    }
  };

  window.app = window.app || {};
  window.app.View = View;

}(window));
