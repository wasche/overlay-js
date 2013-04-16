
var app = (function (){

  var overlay
    , sandbox = $('.sandbox').first()
    , app = {}
    ;

  app.createOverlay = function( form ) {
    var options = {
      content : form.content.value
    , showCloseButton : form.close.checked
    , autoShow : form.autoShow.checked
    , closeContent : '&times;'
    , container : sandbox
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
        break;
      }
    }
    if ( options.position == Overlay.PositionAbsolute ) {
      var l = parseInt( form.left.value )
        , t = parseInt( form.top.value )
        ;
      options.position = Overlay.PositionAbsolute( l, t );
    }

    for (i = form.style.length - 1; i >= 0; i--) {
      if ( form.style[ i ].checked ) {
        options.style = form.style[ i ].value;
        break;
      }
    }

console.log( options );
    if ( overlay ) { overlay.destroy(); }
    overlay = new Overlay( options );

    return overlay;
  }

  return app;

}());

$(function() {

  $('form input[name="position"]').change( function() {
    var disabled = !$('#position-absolute').prop( 'checked' );
    $('#left').prop( 'disabled', disabled );
    $('#top').prop('disabled', disabled );

    var showBtn = false;
    $('form input[value*="Relative"]').each( function( idx, elmt ) {
      showBtn = showBtn || $(elmt).prop( 'checked' );
    });

    $('.spawner').css( 'display', showBtn ? 'block' : 'none' );
  });

});
