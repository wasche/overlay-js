/**
 *
 */
var WindowShade = (function(api) {

  var WindowShade = function( className ) {
    this.shade = api.createElement( 'div', {
      'class' : className || 'wshade'
    });
  };

  WindowShade.prototype.show = function( container ) {
    container || (container = document.body);
    var s = api.getSize( container );
    this.shade.style.width = s.x + 'px';
    this.shade.style.height = s.y + 'px';
    container.appendChild( this.shade );
    return this;
  };

  WindowShade.prototype.hide = function( container ) {
    if ( api.inDocument( this.shade ) ) { container.removeChild( this.shade ); }
    return this;
  };

  return WindowShade;

}(api));
