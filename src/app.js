
var app = (function (){

  var overlay
    , sandbox = $('.sandbox')[ 0 ]
    , spawner = $('.spawner')[ 0 ]
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
        if ( ['Absolute', 'RelativeAbove', 'RelativeBelow', 'RelativeLeft', 'RelativeRight'].indexOf( form.position[ i ].value ) >= 0 ) {
          var l = parseInt( form.left.value ) || 0
            , t = parseInt( form.top.value ) || 0
            ;
          options.position = options.position( l, t );
        }
        break;
      }
    }

    for (i = form.style.length - 1; i >= 0; i--) {
      if ( form.style[ i ].checked ) {
        options.style = form.style[ i ].value;
        break;
      }
    }

console.log( options );
    if ( overlay ) { overlay.destroy(); }
    overlay = new Overlay( options, spawner );

    return overlay;
  }

  return app;

}());

$(function() {

  $('form input[name="position"]').change( function() {
    var showBtn = false;
    $('form input[value*="Relative"]').each( function( idx, elmt ) {
      showBtn = showBtn || $(elmt).prop( 'checked' );
    });
    var disabled = !showBtn && !$('#position-absolute').prop( 'checked' );

    $('#left').prop( 'disabled', disabled );
    $('#top').prop('disabled', disabled );
    $('.spawner').css( 'display', showBtn ? 'block' : 'none' );
  });

});
