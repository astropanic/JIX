var Player = function(x, y){
  this.color = "#000000";
  this.tail = new Tail();
  this.x = x*Graphics.size;
  this.y = y*Graphics.size;
  this.gridLast = Board.CELLS.path;
  this.gridCurrent = Board.CELLS.path;
  this.movementVector = { x: 0, y: 0 };
  this.movementVectorPending = this.movementVector;
  this.directionLast = this.movementVector;
};

Player.prototype.setGrid = function (key){
  this.gridCurrent = key;
  if(this.gridLast != this.gridCurrent) {
    this.color = "#FF0000";
    this.gridLast = this.gridCurrent;
  }
};

Player.prototype.canMove = function(vector){
  var cell = Graphics.sample(
      this.x + (Graphics.size * vector.x) + Graphics.size/2,
      this.y + (Graphics.size * vector.y) + Graphics.size/2
  );
  console.log(cell);
  return cell !== "#000";
};

Player.prototype.isMoving = function(){
  return(this.movementVector.x !== 0 || this.movementVector.y !== 0);
};

Player.prototype.readKeyboard = function(){
  if (Key.isDown(Key.SHIFT)) {
    this.speed = 1;
  } else {
    this.speed = 0.5;
  }

  if (Key.isDown(Key.UP)    && this.canMove({x:  0, y: -1})) this.movementVectorPending = {x:  0, y: -1};
  if (Key.isDown(Key.DOWN)  && this.canMove({x:  0, y:  1})) this.movementVectorPending = {x:  0, y: 1};
  if (Key.isDown(Key.LEFT)  && this.canMove({x: -1, y:  0})) this.movementVectorPending = {x: -1, y: 0};
  if (Key.isDown(Key.RIGHT) && this.canMove({x:  1, y:  0})) this.movementVectorPending = {x:  1, y: 0};
};

Player.prototype.updateDirection = function() {
  if (this.isOnGrid()){
    if(this.isMoving()) {
      if(this.checkNextTile() == "#000"){
        this.movementVectorPending = {x:0, y:0};
      }
    }
    this.movementVector = this.movementVectorPending;
    this.direction = this.movementVector;
    if ((this.direction.x != this.directionLast.x) || (this.direction.y != this.directionLast.y)){
      this.directionLast = this.direction;
    }
  }
};

Player.prototype.checkNextTile = function() {
  cell = Graphics.sample(
      this.x + (Graphics.size * this.movementVectorPending.x) + Graphics.size/2, 
      this.y + (Graphics.size * this.movementVectorPending.y) + Graphics.size/2
  );
  this.setGrid(cell);
  return cell;
};

Player.prototype.doAction = function() {
  this.x += this.movementVector.x * this.speed;
  this.y += this.movementVector.y * this.speed;
};

Player.prototype.update = function(deltaTime){
  this.readKeyboard();
  this.updateDirection();
  this.doAction();

};

Player.prototype.isOnGrid = function(){
  var tmp = (((this.x % Graphics.size) === 0) && (this.y % Graphics.size) === 0);
  return tmp;
};

Player.prototype.draw = function(){
  Graphics.ctx.beginPath();
  Graphics.ctx.fillStyle = this.color;
  Graphics.ctx.fillRect(this.x, this.y, Graphics.size, Graphics.size);
};
