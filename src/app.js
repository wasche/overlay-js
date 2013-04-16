
var app = (function (){

  var overlay
    , form = $('form')[ 0 ]
    , sandbox = $('.sandbox')[ 0 ]
    , spawner = $('.spawner')[ 0 ]
    , app = {}
    ;

  app.createOverlay = function() {
    var options = {
          content : form.content.value
        , showCloseButton : form.close.checked
        , autoShow : form.autoShow.checked
        , closeContent : '&times;'
        , container : sandbox
        }
      , showBtn = false
      , code = [
          'new Overlay({'
        , '  content : \'' + options.content + '\''
        , ', showCloseButton : ' + options.showCloseButton
        , ', autoShow : ' + options.autoShow
        , ', closeContent : \'&amp;times;\''
        ]
      , disabled
      , i
      ;

    $('form input[value*="Relative"]').each( function( idx, elmt ) {
      showBtn = showBtn || $(elmt).prop( 'checked' );
    });
    disabled = !showBtn && !$('#position-absolute').prop( 'checked' );

    $('#left').prop( 'disabled', disabled );
    $('#top').prop('disabled', disabled );
    $('.spawner').css( 'display', showBtn ? 'block' : 'none' );

    for (i = form.backdrop.length - 1; i >= 0; i--) {
      if ( form.backdrop[ i ].checked ) {
        options.backdrop = parseInt( form.backdrop[ i ].value );
        code.push( ', backdrop : ' + options.backdrop );
        break;
      }
    }

    for (i = form.style.length - 1; i >= 0; i--) {
      if ( form.style[ i ].checked ) {
        options.style = form.style[ i ].value;
        code.push( ', style : \'' + options.style + '\'' );
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
          code.push( ', position : Overlay.Position' + form.position[ i ].value + '( ' + l + ', ' + t + ' )' );
        }
        else {
          code.push( ', position : Overlay.Position' + form.position[ i ].value );
        }
        break;
      }
    }

    code.push( ');' );
    $('#code').html( code.join( '\n' ) );

    window.prettyPrint && prettyPrint();

    if ( overlay ) { overlay.destroy(); }
    overlay = new Overlay( options, spawner );

    return overlay;
  }

  return app;

}());

$(function() {

  $('form input, form textarea').change( app.createOverlay );

  app.createOverlay();

});
