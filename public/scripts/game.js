var Board = function(width, height, graphics){
  this.width = width;
  this.height= height;
  this.graphics = graphics;
};

Board.prototype.draw = function(){
  graphics.ctx.fillStyle = "AA0033";
  graphics.ctx.fillRect(0, 0, 960,600);
  graphics.line(0,0, 319, 0, "#FFF");
  graphics.line(0,8, 319, 20);
  graphics.line(0, 0, 0, 199);
  graphics.line(319, 0, 319, 199);
  graphics.line(0, 199, 319, 199);
};
Board.prototype.clear = function(){
  this.graphics.ctx.clearRect(0,0, 320*3,200*3);
};

var Game = function(graphics, board, player, hud){
  this.graphics = graphics;
  this.board = board;
  this.player = player;
  this.hud = hud;
  this.meter = new FPSMeter({decimals: 0});
  this.step = 0.01;
  window.addEventListener('keyup', function(event) {
    Key.onKeyup(event);
	event.preventDefault();
  }, false);
  window.addEventListener('keydown', function(event) {
    Key.onKeydown(event);

	// Block only arrow keys.
    switch(event.keyCode) {
    case 37: // left
    case 38: // up
    case 39: // right
    case 40: // down
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
  this.hud.updateTimer();
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
var tail = new Tail(160, 199, graphics);
var player = new Player(160*3, 199*3,graphics, tail);
var hud = new Hud();
var game = new Game(graphics, board, player, hud);

game.run();

