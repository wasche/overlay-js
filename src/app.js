
var app = (function (){

  var overlay
    , app = {};

  app.createOverlay = function( form ) {
    var options = {
      content : form.content.value
    , showCloseButton : form.close.checked
    , autoShow : form.autoShow.checked
    , closeContent : '&times;'
    };

    for (var i = form.backdrop.length - 1; i >= 0; i--) {
      if ( form.backdrop[ i ].checked ) {
        options.backdrop = parseInt( form.backdrop[ i ].value );
        break;
      }
    }

    for (i = form.position.length - 1; i >= 0; i--) {
      if ( form.position[ i ].checked ) {
        options.position = Overlay[ 'Position' + form.position[ i ].value ];
      }
    }

    for (i = form.style.length - 1; i >= 0; i--) {
      if ( form.style[ i ].checked ) {
        options.style = form.style[ i ].value;
      }
    }

console.log( options );
    if ( overlay ) { overlay.destroy(); }
    overlay = new Overlay( options );

    return overlay;
  }

  return app;

}());
