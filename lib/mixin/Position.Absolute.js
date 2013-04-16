
Overlay.PositionAbsolute = function( x, y ) {
  var p = [x, y];
  return function() { return p; };
};
