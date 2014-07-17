var Board = function(width, height){
  this.width   = width;
  this.height  = height;

  Graphics.canvas.width  = this.width * Graphics.size;
  Graphics.canvas.height = this.height * Graphics.size;

  this.paths   = [
    {x1: 0, y1: 0, x2: this.width-1, y2: 20},
    {x1: 0, y1: 0, x2: 0, y2: this.height-1},
    {x1: this.width-1, y1: 0, x2: this.width-1, y2: this.height-1},
    {x1: 0, y1: this.height-1, x2: this.width-1, y2: this.height-1}
  ];
};

Board.CELLS = {
  path:  "#FFFFFF",
  empty: "#AA0033",
  tail:  "#00FF00"
};

Board.prototype.addPath = function(x1, y1, x2, y2){
  this.paths.push({
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  });
};

Board.prototype.draw = function(){
  Graphics.ctx.fillStyle = Board.CELLS.empty;
  Graphics.ctx.fillRect(0, 0, this.width * Graphics.size, this.height * Graphics.size);
  this.paths.forEach(function(path) {
    Graphics.line(path.x1, path.y1, path.x2, path.y2, Board.CELLS.path);
  });
};
Board.prototype.clear = function(){
  Graphics.ctx.clearRect(0,0, 960, 600);
};
