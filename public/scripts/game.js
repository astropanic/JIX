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

var Game = function(board, player){
  this.board = board;
  this.player = player;
  this.meter = new FPSMeter({decimals: 0});
  this.step = 0.005;
  window.addEventListener('keyup', function(event) {
    Key.onKeyup(event);
	event.preventDefault();
  }, false);
  window.addEventListener('keydown', function(event) {
    Key.onKeydown(event);

	// Block only arrow keys.
    switch(event.keyCode) {
	case Key.LEFT:
	case Key.UP:
	case Key.RIGHT:
	case Key.DOWN:
	  event.preventDefault();
    }

  }, false);
};

Game.prototype.timestamp = function(){
  return Date.now();
 // return window.performance.now();
};

Game.prototype.render = function(){
  this.meter.tick();
  this.board.clear();
  this.board.draw();
  this.player.tail.draw();
  this.player.draw();
};

Game.prototype.update = function(deltaTime){
  this.player.update(deltaTime);
};

Game.prototype.setDelta = function(){
  this.now = this.timestamp();
  this.delta = Math.min(1, (this.now - this.then) / 1000);
  this.then = this.now;
};

Game.prototype.frame = function(){

  this.setDelta();
  var that = this;

  while(this.delta > this.step) {
    this.delta = this.delta - this.step;
    this.update(this.step);
  }
  this.render();
  this.animationFrame = requestAnimationFrame(
      function(){
        that.frame();
      });
};

Game.prototype.run = function(){
  this.then = this.timestamp();
  this.frame();
};

var board = new Board(80, 40);
var player = new Player(39, 39);
var game = new Game(board, player);
game.run();

