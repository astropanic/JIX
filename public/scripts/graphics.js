Graphics = {};

Graphics.size = 15;
Graphics.canvas = document.getElementById("jix");
Graphics.ctx = Graphics.canvas.getContext("2d");

Graphics.line = function(x1, y1, x2, y2, color){
  Graphics.ctx.beginPath();
  Graphics.ctx.strokeStyle = color;
  Graphics.ctx.lineWidth=Graphics.size;
  if(x1 != x2){
    var xmin = Math.min(x1, x2);
    var xmax = Math.max(x1, x2);
    Graphics.ctx.moveTo(xmin*Graphics.size, (y1)*Graphics.size+(Graphics.size/2.0));
    Graphics.ctx.lineTo(xmax*Graphics.size+Graphics.size, (y1)*Graphics.size+(Graphics.size/2.0));
    Graphics.ctx.stroke();
  } else {
    var ymin = Math.min(y1, y2);
    var ymax = Math.max(y1, y2);
    Graphics.ctx.moveTo(x1*Graphics.size+Graphics.size/2.0, (ymin)*Graphics.size);
    Graphics.ctx.lineTo(x1*Graphics.size+Graphics.size/2.0, (ymax)*Graphics.size+Graphics.size);
    Graphics.ctx.stroke();
  }
};

Graphics.sample = function(x1, y1) {
  var data = Graphics.ctx.getImageData(x1, y1, 1, 1).data;

  var red   = data[0].toString(16).toUpperCase();
  var green = data[1].toString(16).toUpperCase();
  var blue  = data[2].toString(16).toUpperCase();

  var color = "#" + red + green + blue;
  return color;
};
