/*global _ */
function deleteWord ( source, word ) {
  var x = source.search( '\\b' + word + '\\b' );
  if ( x >= 0 ) {
    return source.slice ( 0, x ) + source.slice ( x + word.length );
  }
  return source;
}

// declare API
var api = {};
api.extend = _.extend; // (destination, source, ... )
api.bind = _.bind; // (function, object, [*arguments])
api.bindAll = _.bindAll; // (object, [*methodnames])
api.addEvent = function ( elmt, type, fn ) { elmt.addEventListener ( type, fn, false ); return elmt; };
api.removeEvent = function ( elmt, type, fn ) { elmt.removeEventListener ( type, fn ); return elmt; };
api.createElement = function ( tag, attributes ) {
  var elmt = document.createElement ( tag );
  for ( var attr in attributes ) {
    elmt.setAttribute ( attr, attributes [ attr ] );
  }
  return elmt;
};
api.getSize = function ( elmt ) { return { x : elmt.offsetWidth, y : elmt.offsetHeight }; };
api.getPosition = function ( elmt ) { return { x : elmt.offsetLeft, y : elmt.offsetTop }; };
api.addClass = function ( elmt, className ) { elmt.className += ' ' + className; };
api.removeClass = function ( elmt, className ) { elmt.className = deleteWord ( elmt.className, className ); };
api.select = function ( selector, elmt ) { return (elmt || document).getElements ( selector ); };
api.find = function ( selector, elmt ) { return (elmt || document).getElement ( selector ); };
api.checkBrowser   = function () {
  return Array.from ( arguments ).some ( function ( b ) {
    return !!Browser [ b ];
  });
};

api.isNode = function( obj ) {
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
};

api.isElement = function( obj ) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
  );
};

api.inDocument = function( elmt ) {
  return !!elmt.parentNode && 11 !== elmt.parentNode.nodeType;
};
