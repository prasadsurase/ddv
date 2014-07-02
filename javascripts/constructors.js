function Step(){
  this.no = no;
  this.type = type; //
  this.event = event; //event type
  this.expression = expression;
}

function Rectangle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rectangle.prototype.draw = function(context){
  context.strokeRect(x, y, w, h);
}

function CanvasState(){
  this.shapes = [];
}

var canvasState = new CanvasState();
