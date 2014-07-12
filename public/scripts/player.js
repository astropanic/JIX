Array.prototype.last = function(){
  return this[this.length - 1];
};

Array.prototype.penultimate = function(){
  return this[this.length - 2];
};


var Tail = function(x, y, graphics){
  this.graphics = graphics;
  this.points = [{x: x, y:y}];
};

Tail.prototype.draw = function(){
  var points = JSON.parse( JSON.stringify( this.points ) );
  var last = points.shift();
  points.forEach(function(el, index){
    graphics.line(last.x, last.y, el.x, el.y, Board.CELLS.tail);
    last = el;
  });
};
var Player = function(x, y, graphics, tail){
  this.x = x;
  this.y = y;
  this.size = 8;
  this.tail = tail;
  this.color = "#FFFF00";
  this.graphics = graphics;
  this.isMoving = true;
  this.onX = true;
  this.onY = true;
  this.movementVector = {x: 0, y: 0};
  this.directionLast = this.movementVector;
  this.speed = 10;
  this.tailUpdate();
};

Player.prototype.xGrid = function(){
  Math.floor(this.x/3);
};

Player.prototype.yGrid = function(){
  Math.floor(this.y/3);
};

Player.prototype.tailUpdate = function(){
  this.tail.points.push({x: Math.floor(this.x/3), y: Math.floor(this.y/3)});
};

Player.prototype.update = function(deltaTime){
  if(this.isOnGrid()){
    if (Key.isDown(Key.SHIFT)) {
      this.speed = 300;
    } else {
      this.speed = 100;
    }
    if (Key.isDown(Key.UP)) this.movementVector = {x: 0, y: -1};
    if (Key.isDown(Key.DOWN)) this.movementVector = {x: 0, y: 1};
    if (Key.isDown(Key.LEFT)) this.movementVector = {x: -1, y: 0};
    if (Key.isDown(Key.RIGHT)) this.movementVector = {x: 1, y: 0};
    if(!this.canMove(this.movementVector)){
      this.movementVector = {x: 0, y:0};
    }
  }
  this.direction = this.movementVector;
  if (this.direction.x != this.directionLast.x){
    this.tailUpdate();
    this.directionLast = this.direction;
  }

  this.x += this.movementVector.x * this.speed * deltaTime;
  this.y += this.movementVector.y * this.speed * deltaTime;
  this.tail.points[this.tail.points.length -1] = {x: this.x/3, y: this.y/3};
};

Player.prototype.canMove = function(vector){
  var x1 = this.x;
  var y1 = this.y;
  var x2 = vector.x;
  var y2 = vector.y;
  x = (this.graphics.sample(x1 + x2, y1 + y2));
  var cell = this.graphics.sample(this.x, this.y+1*3);
  this.graphics.ctx.fillStyle = "#000000";
  this.graphics.ctx.fillRect(this.x + vector.x, this.y + vector.y, 3,3);
  debug(x);
  return(x != Board.CELLS.path);
};

Player.prototype.isOnGrid = function(){
  return ((Math.floor(this.x) % 3) === 0) && ((Math.floor(this.y) % 3) === 0);
};

Player.prototype.draw = function(){
  this.graphics.ctx.beginPath();
  this.graphics.ctx.strokeStyle = this.color;
  this.graphics.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
  this.graphics.ctx.stroke();
};
