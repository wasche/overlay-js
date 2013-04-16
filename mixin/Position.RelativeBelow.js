
Overlay.PositionRelativeBelow = function( offsetX, offsetY ) {
  return function( overlay ) {
    var s = api.getSize( overlay.options.container )
      , o = api.getSize( overlay.container )
      , e = api.getSize( overlay.sourceElement )
      , p = api.getPosition( overlay.sourceElement )
      ;

    return [
      (p.x) + (e.x / 2) - (o.x / 2) + offsetX
    , (p.y) + (e.y) + offsetY
    ];
  }
};
