
Overlay.PositionCenter = function( overlay ) {
  var s = api.getSize( overlay.options.container )
    , o = api.getSize( overlay.container )
    ;

  return [
    (s.x / 2) - (o.x / 2)
  , (s.y / 2) - (o.y / 2)
  ];
};
