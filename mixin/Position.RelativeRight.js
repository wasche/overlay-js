
Overlay.PositionRelativeRight = function( offsetX, offsetY ) {
  return function( overlay ) {
    var s = api.getSize( overlay.options.container )
      , o = api.getSize( overlay.container )
      , e = api.getSize( overlay.sourceElement )
      , p = api.getPosition( overlay.sourceElement )
      ;

    return [
      p.x + e.x + offsetX
    , p.y + (e.y / 2) - (o.y / 2) + offsetY
    ];
  }
};
