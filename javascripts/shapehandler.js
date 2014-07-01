if(window.addEventListener){
  window.addEventListener('load', function(){
    //globals
    var context, canvas, line;
    
    function init(){
      canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');
      line = new Shape();

      canvas.addEventListener('mousedown', evnt_canvas, false); 
      canvas.addEventListener('mousemove', evnt_canvas, false); 
      canvas.addEventListener('mouseup', evnt_canvas, false);
    }

    //Shape constructor function with event handlers
    function Shape(){
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
    }//Shape

    function evnt_canvas(evnt){
      evnt._x = evnt.layerX;
      evnt._y = evnt.layerY;

      //check if event handler is defined or not
      console.log(line);
      var func = line[evnt.type];
      if(func){
        func(evnt);
      }
    }

    init();
  }, false);
}
