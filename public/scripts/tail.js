var Tail = function(x, y){
  this.points = [{x: x, y:y}];
};

Tail.prototype.draw = function(){
  var points = JSON.parse( JSON.stringify( this.points ) );
  var last = points.shift();
  points.forEach(function(el, index){
    Graphics.line(last.x/3, last.y/3, el.x/3, el.y/3, Board.CELLS.tail);
    last = el;
  });
};
