//function drawLine(){
  var point1 = {};
  var point2 = {};
  $('canvas').mousedown(function myMouseDown(evt) {
    alert('mousedown');
    var rect = canvas.getBoundingClientRect();
    var  x = evt.clientX - rect.left;
    var  y = evt.clientY - rect.top;
    point1 = {x: x, y: y};
  });

  $('canvas').mouseup(function myMouseUp(evt){ 
    var rect = canvas.getBoundingClientRect();
    var  x = evt.clientX - rect.left;
    var  y = evt.clientY - rect.top;
    point2 = {x: x, y: y};
  });

  $('canvas').drawLine({
    draggable: true,
    strokeStyle: '#000',
    strokeWidth: 1,
    x1: point1.x, y1: point1.y,
    x2: point2.x, y2: point2.y
  });
//}
