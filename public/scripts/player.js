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
    graphics.line(last.x, last.y, el.x, el.y, "#FFFFFF");
    last = el;
  });
};
var Player = function(x, y, graphics, tail){
  this.x = x;
  this.y = y;
  this.size = 9;
  this.tail = tail;
  this.color = "#FF0000";
  this.graphics = graphics;
  this.isMoving = true;
  this.speed = 300;
  this.onX = true;
  this.onY = true;
  this.cursorKey = "";
  this.directionLast = "";
};

Player.prototype.tailUpdate = function(){
  this.tail.points.push({x: Math.floor(this.x/3), y: Math.floor(this.y/3)});
};

Player.prototype.update = function(deltaTime){
  if (Key.isDown(Key.UP)) this.cursorKey = "up";
  if (Key.isDown(Key.DOWN)) this.cursorKey = "down";
  if (Key.isDown(Key.LEFT)) this.cursorKey = "left";
  if (Key.isDown(Key.RIGHT)) this.cursorKey = "right";
  this.xGrid = Math.floor(this.x/3);
  this.yGrid = Math.floor(this.y/3);

  this.tail.points[this.tail.points.length -1] = {x: this.x/3, y: this.y/3};
  if (this.isOnGrid()) {
    this.direction = this.cursorKey;
    if (this.direction != this.directionLast){
      this.tailUpdate();
      this.directionLast = this.direction;
    }

    if (this.isBlocked(this.direction)) {
      this.isMoving = false;
    }
  }

  switch(this.direction){
    case "up":
      this.y = this.y - 1;
      var a = this.tail.points.last();
      var b = this.tail.points.penultimate();
      this.graphics.line(a.x ,a.y, b.x, b.y, "#FFFF00");
      break;
    case "down":
      this.y = this.y + 1;
      break;
    case "left":
      this.x = this.x - 1;
      break;
    case "right":
      this.x = this.x + 1;
      break;
  }
};

Player.prototype.isBlocked = function(direction){
  var x = 0;
  var y = 0;
  switch(direction){
    case "up":
      this.y = this.y - 1;
      break;
    case "down":
      this.y = this.y + 1;
      break;
    case "left":
      this.x = this.x - 1;
      break;
    case "right":
      this.x = this.x + 1;
      break;
  }
};

Player.prototype.getCellInfo = function(){
  
};

Player.prototype.isOnGrid = function(){
  return ((Math.floor(this.x) % 3) === 0) && ((Math.floor(this.y) % 3) === 0);
};

Player.prototype.draw = function(){
  //this.log(this.xGrid + ", "+ this.yGrid + "|" + Math.floor(this.x)% 3 + "|" + Math.floor(this.y)%3);
  if(this.isOnGrid()){
    this.isMoving = false;
  }
  this.graphics.ctx.beginPath();
  this.graphics.ctx.fillStyle = "#FF0000";
  this.graphics.ctx.arc(this.x+1, this.y+1, this.size, 0, 2 * Math.PI, false);
  this.graphics.ctx.stroke();
};

Player.prototype.log = function(text){
  this.graphics.ctx.fillStyle="#FFF";
  this.graphics.ctx.font = "bold 14px Arial";
  this.graphics.ctx.fillStyle = "FFDDDD";
  this.graphics.ctx.fillText(text, 10, 18);
};

Player.prototype.moveUp = function(deltaTime){
  this.y = this.y - 1*deltaTime*this.speed;
  this.tail.points.push({x: this.x, y: this.y});
};

Player.prototype.moveDown = function(deltaTime){
  this.y = this.y + 1*deltaTime*this.speed;
  this.tail.points.push({x: this.x, y: this.y});
};

Player.prototype.moveLeft = function(deltaTime){
  this.x = this.x - 1*deltaTime*this.speed;
  this.tail.points.push({x: this.x, y: this.y});
};

Player.prototype.moveRight = function(deltaTime){
  this.x = this.x + 1*deltaTime*this.speed;
  this.tail.points.push({x: this.x, y: this.y});
};
