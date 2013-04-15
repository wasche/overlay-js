/**
 *
 * @author Wil Asche <wasche@tripadvisor.com>
 * @since April 2013
 * @copyright TripAdvisor
 * @license CC-BY
 */

var Overlay = (function ( api ){

  var BACKDROP = {
    NEVER : 0
  , ALWAYS : 1
  , WHEN_PINNED : 2
  };

  /**
   * @option backdrop         [boolean=Overlay.BACKDROP.NEVER]  when to display the backdrop
   * @option showCloseButton  [boolean=true]                    whether or not to show the close button
   * @option autoShow         [boolean=true]                    show overlay automatically upon creation
   * @option containerClass   [String=overlay]                  class of container div
   * @option innerClass       [String=inner]                    class of inner content div
   * @option closeBtnClass    [String=close]                    class of close button div
   * @option position         [Function=Overlay.PositionCenter] how to position the overlay
   * @option content          Mixed                             html string, Element, or Function (returning string, Element or Promise)
   */
  var defaultOptions = {
    backdrop        : BACKDROP.NEVER
  , showCloseButton : true
  , autoShow        : true
  , containerClass  : 'overlay'
  , innerClass      : 'inner'
  , closeBtnClass   : 'close'
  , position        : function( overlay ) { return Overlay.PositionCenter( overlay ); }
  , content         : ''
  };

  /**
   *
   * @constructor
   */
  var Overlay = function( options, elmt ) {
    this.options = api.extend( {}, defaultOptions, options );
    this.sourceElement = elmt;
    this.container = api.createElement( 'div', {
      'class' : this.options.containerClass
    });
    this.inner = api.createElement( 'div', {
      'class' : this.options.innerClass
    });
    this.container.appendChild( this.inner );

    if ( this.options.showCloseButton ) {
      this.closeBtn = api.createElement( 'div', {
        'class' : this.options.closeBtnClass
      });
      this.container.appendChild( this.closeBtn );
    }

    api.bindAll( this, 'setContent' );

    this.setContent( this.options.content );

    if ( this.options.autoShow ) { this.show (); }
  };

  /**
   *
   * @param content   html string, Element, or Function (returning string, Element, or Promise)
   */
  Overlay.prototype.setContent = function( content ) {
    switch ( typeof( content ) ) {
      case 'string':
        this.inner.innerHTML = content;
        break;

      case 'function':
        this.setContent( content() );
        break;

      case 'object':
        if ( api.isElement( content ) ) {
          this.inner.appendChild( content );
        }
        else if ( content.success && typeof( content.success ) == 'function' ) {
          content.success( this.setContent );
        }
        break;

      default:
        console.log( typeof(content) );
    }
  };

  /**
   *
   */
  Overlay.prototype.show = function() {
    document.body.appendChild( this.container );
    var pos = this.options.position( this );

    this.container.style.top = pos[ 0 ] + 'px';
    this.container.style.left = pos[ 1 ] + 'px';
  };

  /**
   *
   */
  Overlay.prototype.hide = function() {

  };

  Overlay.BACKDROP = BACKDROP;

  return Overlay;

}(api));