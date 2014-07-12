var Board = function(width, height, graphics){
  this.graphics = graphics;
  this.width   = width;
  this.height  = height;
  this.paths   = [
    {x1: 0, y1: 0, x2: 319, y2: 20},
    {x1: 0, y1: 0, x2: 0, y2: 199},
    {x1: 319, y1: 0, x2: 319, y2: 199},
    {x1: 0, y1: 199, x2: 319, y2: 199}
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
  graphics.ctx.fillStyle = Board.CELLS.empty;
  graphics.ctx.fillRect(0, 0, 960,600);
  this.paths.forEach(function(path) {
    graphics.line(path.x1, path.y1, path.x2, path.y2, Board.CELLS.path);
  });
};
Board.prototype.clear = function(){
  this.graphics.ctx.clearRect(0,0, 960, 600);
};

var Game = function(graphics, board, player){
  this.graphics = graphics;
  this.board = board;
  this.player = player;
  this.meter = new FPSMeter({decimals: 0});
  this.step = 0.01;
  window.addEventListener('keyup', function(event) {
    Key.onKeyup(event);
  }, false);
  window.addEventListener('keydown', function(event) {
    Key.onKeydown(event);
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

var graphics = new Graphics();
var board = new Board(200, 160, graphics);
var tail = new Tail(160*3, 199*3, graphics);
var player = new Player(160*3, 199*3,graphics, tail);
var game = new Game(graphics, board, player);
var hud = new Hud();
game.run();

