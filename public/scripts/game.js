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

