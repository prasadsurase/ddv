if(window.addEventListener){
  window.addEventListener('load', function(){
    //globals
    var canvas, context, original_canvas, original_context;
    var shape, default_shape;

    //Path constructor function with event handlers
    function Path(){
      this.started = false;

      this.mousedown = function(evnt){
        context.beginPath();
        context.moveTo(evnt._x, evnt._y);
        this.started = true;
      };

      this.mousemove = function(evnt){
        if(this.started){
          context.lineTo(evnt._x, evnt._y);
          context.stroke();
        }
      };

      this.mouseup = function(evnt){
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
      this.started = false;
      var x1, y1;

      this.mousedown = function (evnt) {
        this.started = true;
        x1 = evnt.layerX;
        y1 = evnt.layerY;
      };

      this.mousemove = function (evnt) {
        if (this.started) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(evnt.layerX, evnt.layerY);
          context.stroke();
          context.closePath();
        }
      };

      this.mouseup = function (evnt) {
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

      canvas.addEventListener('mousedown', evnt_canvas, false); 
      canvas.addEventListener('mousemove', evnt_canvas, false); 
      canvas.addEventListener('mouseup', evnt_canvas, false);
  
      var anchors = $('#option_draw li a');
      for(var i = 0; i < anchors.length; i++){
        anchors[i].addEventListener('click', function(event){
          $('#option_draw li a').removeClass('active');
          $(event.target).addClass('active');
          shape = getShape($(event.target));
        }, false);
      }
    }

    function evnt_canvas(evnt){
      evnt._x = evnt.layerX;
      evnt._y = evnt.layerY;

      //check if event handler is defined or not
      var func = shape[evnt.type];
      if(func){
        func(evnt);
      }
    }

    function getShape(selected_shape){
      switch(selected_shape.text()){
        case 'line': 
          return new Line();
        break;
        case 'path': 
          return new Path();
        break;
        case 'rect': 
          return new Rectangle();
        break;
      }
    }


    init();
  }, false);
}
