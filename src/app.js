function createOverlay( form ) {
  var options = {
    content : form.content.value
  , showCloseButton : form.close.checked
  , autoShow : form.autoShow.checked
  };

  for (var i = form.backdrop.length - 1; i >= 0; i--) {
    if ( form.backdrop[ i ].checked ) {
      options.backdrop = parseInt( form.backdrop[ i ].value );
      break;
    }
  };

  for (i = form.position.length - 1; i >= 0; i--) {
    if ( form.position[ i ].checked ) {
      options.position = Overlay[ 'Position' + form.position[ i ].value ];
    }
  };

  console.log( options );

  return new Overlay( options );
}