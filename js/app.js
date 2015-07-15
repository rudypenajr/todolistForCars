(function () {
	'use strict';

	var ul = document.getElementsByClassName( 'todo-items' )[0];
	var input = document.querySelector('input');
	var textarea = document.getElementsByTagName( 'textarea' )[0];

	var clearInput = function ( input ) {
		input.value = "";
	};
	var generateListItem = function ( data ) {
		var li = document.createElement( 'li' );
		li.setAttribute( 'data-id', data.id );

		var spanPosition = document.createElement( 'span' );
		var spanTitle = document.createElement( 'span' );
		var spanDelete = document.createElement( 'a' );

		spanPosition.className = 'list-item-position';
		spanTitle.className = 'list-item-title';
		spanDelete.className = 'right list-item-title-delete';

		spanPosition.innerText = data.id + '.';
		spanTitle.innerText = data.title;
		spanDelete.innerText = 'delete';

		li.appendChild( spanPosition );
		li.appendChild( spanTitle );
		li.appendChild( spanDelete );

		return li;
	};

	var findIndex = function ( ) {
		var lists = document.getElementsByClassName( 'todo-items' )[0];
		var items = lists.childElementCount;

		return items + 1;
	};

	var onSubmit = function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var data;
		if ( localStorage && localStorage.todoData ) {
			data = JSON.parse( localStorage.todoData );
		} else {
			data = {};
		}

		var input = e.target.parentElement.getElementsByClassName( 'js-item-input' )[0];
		var value = input.value;
		var id = findIndex();
		var key = id + '-list-item';
		var tempData = {
		  title: value,
		  id: id
		};

		if ( !value ) {
		  alert( 'Plesae enter a value before submitting.' );
		  return;
		}

		data[key] = tempData;
		localStorage.setItem( "todoData", JSON.stringify( data ) );

		// append new item
		var ul = document.getElementsByClassName( 'todo-items' )[0];
		var li = generateListItem( tempData );

		ul.appendChild( li );

		// add to JSON textarea
		var textareaJSON = JSON.parse( textarea.innerHTML );

		textareaJSON.push( tempData.title );
		textarea.innerHTML = JSON.stringify( textareaJSON );

		// clear input
		clearInput( input );
	};

	// event listeners - submit
	var primaryBtn = document.getElementsByClassName('btn-primary')[0];
	primaryBtn.addEventListener('click', onSubmit);


	// event listeners - delete
	var removeArr = function ( arr ) {
		var what, a = arguments, L = a.length, ax;

		while (L > 1 && arr.length) {
			what = a[--L];
			while ((ax= arr.indexOf(what)) !== -1) {
				arr.splice(ax, 1);
			}
		}
		return arr;
	};

	var removeListItem = function ( id ) {
		var parent = ul || document.getElementsByClassName( 'todo-items' )[0];
		var allListItems = document.querySelectorAll( '[data-id]' );

		for (var i = 0; i < allListItems.length; i++) {
			var li = allListItems[i];

			if ( li.getAttribute( 'data-id' ) === id ) {
				parent.removeChild( allListItems[i] );

				// remove to JSON textarea
				var textareaJSON = JSON.parse( textarea.innerHTML );
				var liText = li.getElementsByClassName( 'list-item-title' )[0].innerHTML;

				// modified json
				removeArr( textareaJSON, liText );
				textarea.innerHTML = JSON.stringify( textareaJSON );
			}
		}
	};

	var onDelete = function ( e ) {
		var target = e.target;
		var currentTarget = e.currentTarget;

		if ( target !==  currentTarget ) {
			var isDeleteBtn = target.hasAttribute( 'class', 'list-item-title-delete' );

			if ( isDeleteBtn ) {
				var data = localStorage.todoData;
				var serializedData = JSON.parse( data );
				var targetId = target.parentElement.getAttribute( 'data-id' );
				var targetKey = targetId + '-list-item';

				for ( var key in serializedData ) {
					if ( serializedData.hasOwnProperty( key ) ) {
						if ( serializedData[key] instanceof Object ) {
							delete serializedData[targetKey];
						}
					}
				}

				localStorage.todoData = JSON.stringify( serializedData );
				removeListItem( targetId );
			}
		}
	};

	// rather than loop through list items and attach event handler
	// listen to click events on unordered list
	ul.addEventListener( 'click', onDelete );


	// populated localStorage data
	if ( localStorage && localStorage.todoData ) {
		var data = localStorage.todoData;
		var serializedData = JSON.parse( data );
		var fetchedValues = [];

		for ( var key in serializedData ) {
			if ( serializedData.hasOwnProperty( key ) ) {
				// build list items
				var obj = serializedData[ key ];
				var li = generateListItem( obj );

				ul.appendChild( li );

				// build array/json string
				fetchedValues.push( obj.title );
			}
		} // end of for loop

		textarea.innerHTML = JSON.stringify( fetchedValues );
	}

})();
