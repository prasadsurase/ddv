if(window.addEventListener){
  window.addEventListener('load', function(){
    //globals
    var canvas, context, original_canvas, original_context;
    var shape, default_shape;

    //Path constructor function with event handlers
    function Path(){
      this.started = false;

      this.mousedown = function(evnt){
        console.log('mouse down');
        context.beginPath();
        context.moveTo(evnt._x, evnt._y);
        this.started = true;
      };

      this.mousemove = function(evnt){
        console.log('mouse move');
        if(this.started){
          context.lineTo(evnt._x, evnt._y);
          context.stroke();
        }
      };

      this.mouseup = function(evnt){
        console.log('mouse up');
        if(this.started){
          this.started = false;
        }
      };
    }//Path

    function Rectangle(){
      this.started = false;
      var x1, y1, x2, y2;

      this.mousedown = function(evnt){
        this.started = true;
        x1 = evnt.layerX;
        y1 = evnt.layerY;
      };

      this.mousemove = function(evnt){
        if(this.started){
          var x = Math.min(evnt._x,  x1);
          var y = Math.min(evnt._y,  y1);
          var w = Math.abs(evnt._x - x1);
          var h = Math.abs(evnt._y - y1);

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.strokeRect(x, y, w, h);
        }
      };

      this.mouseup = function(evnt){
        if(this.started){
          this.started = false;
          update_original_canvas();
        }
      };
    }//Rectangle
    
    function Line(){
      this.mousedown = function (evnt) {
        console.log('line mouse down');
        this.started = true;
        x1 = evnt.layerX;
        x2 = evnt.layerY;
      };

      this.mousemove = function (evnt) {
        if (this.started) {
          console.log('line mouse move');
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.beginPath();
          context.moveTo(evnt._x, evnt._y);
          context.lineTo(evnt.layerX, evnt.layerY);
          context.stroke();
          context.closePath();
        }
      };

      this.mouseup = function (evnt) {
        console.log('line mouse up');
        if (this.started) {
          this.started = false;
          update_original_canvas();
        }
      };
    }

    function update_original_canvas(){
      original_context.drawImage(canvas, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function init(){
      original_canvas = document.getElementById('canvas');
      original_context = original_canvas.getContext('2d');

      // Add the temporary canvas.
      var container = original_canvas.parentNode;
      canvas = document.createElement('canvas');
      canvas.id = 'temp_canvas';
      canvas.width = original_canvas.width;
      canvas.height = original_canvas.height;
      container.appendChild(canvas);

      context = canvas.getContext('2d');

      //Select the shape to be drawn
      var selected_shape = $('#option_draw li a.active');
      //selected_shape.addEventListener('change', ev_tool_change, false);
      shape = getShape(selected_shape);
      console.log(shape);

      canvas.addEventListener('mousedown', evnt_canvas, false); 
      canvas.addEventListener('mousemove', evnt_canvas, false); 
      canvas.addEventListener('mouseup', evnt_canvas, false);
    }

    function evnt_canvas(evnt){
      console.log(evnt);
      evnt._x = evnt.layerX;
      evnt._y = evnt.layerY;

      //check if event handler is defined or not
      var func = shape[evnt.type];
      if(func){
        func(evnt);
      }
    }

    function getShape(selected_shape){
      var obj;
      switch(selected_shape.text()){
        case 'line': 
          console.log('------------------------------1');
          obj = new Line();
          break;
        case 'path': 
          console.log('================================2');
          obj = new Path();
          break;
        case 'rect': 
          console.log('//////////////////////////////3');
          obj = new Rectangle();
          break;
      }
      return obj;
    }

    init();
  }, false);
}
