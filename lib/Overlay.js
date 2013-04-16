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
   * @option containerClass   [String=overlay]                  class of container div
   * @option innerClass       [String=inner]                    class of inner content div
   * @option closeBtnClass    [String=close]                    class of close button div
   * @option style            [String=]                         additional classes for the container, see overlay.css for examples
   * @option position         [Function=Overlay.PositionCenter] how to position the overlay
   * @option closeContent     [String=]                         content of close button
   * @option container        [Element=document.body]           element the overlay container is added to
   */
  var defaultOptions = {
    backdrop        : BACKDROP.NEVER
  , showCloseButton : true
  , containerClass  : 'overlay'
  , innerClass      : 'inner'
  , closeBtnClass   : 'close'
  , style           : ''
  , position        : function( overlay ) { return Overlay.PositionCenter( overlay ); } // wrapped to avoid forward reference
  , closeContent    : ''
  , container       : document.body
  };

  /**
   *
   * @constructor
   */
  var Overlay = function( options, elmt ) {
    this.options = api.extend( {}, defaultOptions, options );
    api.bindAll( this, 'setContent', 'show', 'hide' );
    
    this.sourceElement = elmt;
    this.container = api.createElement( 'div', {
      'class' : this.options.containerClass + ' ' + this.options.style
    });
    this.inner = api.createElement( 'div', {
      'class' : this.options.innerClass
    });
    this.container.appendChild( this.inner );

    if ( this.options.showCloseButton ) {
      this.closeBtn = api.createElement( 'div', {
        'class' : this.options.closeBtnClass
      });
      this.closeBtn.innerHTML = this.options.closeContent;
      this.container.appendChild( this.closeBtn );
      api.addEvent( this.closeBtn, 'click', this.hide );
    }

    if ( this.sourceElement ) {
      api.addEvent( this.sourceElement, 'click', this.show );
    }

    if ( this.options.backdrop !== BACKDROP.NEVER ) {
      this.backdrop = new WindowShade();
    }
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
        return this.setContent( content() );

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

    return this;
  };

  /**
   *
   */
  Overlay.prototype.show = function() {
    if ( this.backdrop ) { this.backdrop.show( this.options.container ); }
    this.options.container.appendChild( this.container );
    var pos = this.options.position( this );

    this.container.style.left = pos[ 0 ] + 'px';
    this.container.style.top = pos[ 1 ] + 'px';

    return this;
  };

  /**
   *
   */
  Overlay.prototype.hide = function() {
    if ( this.backdrop ) { this.backdrop.hide( this.options.container ); }
    if ( api.inDocument( this.container ) ) {
      this.options.container.removeChild( this.container );
    }
  };

  /**
   *
   */
  Overlay.prototype.destroy = function() {
    this.hide();
    this.container = null;
    this.inner = null;
    if ( this.closeBtn ) { this.closeBtn = null; }
    this.options.container = null;
    if ( this.sourceElement ) {
      api.removeEvent( this.sourceElement, 'click', this.show );
      this.sourceElement = null;
    }
  };

  Overlay.BACKDROP = BACKDROP;

  return Overlay;

}(api));