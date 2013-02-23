var canvas = document.getElementById('canvas'),
   shape = document.getElementById('shapeStyleSelect').value,
   style = document.getElementById('fillStyleSelect').value,
   context = canvas.getContext('2d'),
   dragging = false,
   drawingSurfaceImageData,
   canvasX, 
   canvasY;

   
  context.strokeRect(0,0,1000,800);  //testing, testing, 1, 2, 3, 4

function saveDrawingSurface() {
   drawingSurfaceImageData = context.getImageData(0, 0,
                                                  canvas.width,
                                                  canvas.height);
}

function restoreDrawingSurface() {
   context.putImageData(drawingSurfaceImageData, 0, 0);
}

function square(number){
   return number*number;
}

//GOT THIS CODE FROM STACK OVERFLOW
//http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    if (event.offsetX !== undefined && event.offsetY !== undefined) { 
      return {x:event.offsetX, y:event.offsetY}; 
    }
    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

canvas.onmousedown = function(e){
   //get location of current mouseclick
   coords = canvas.relMouseCoords(event);
   canvasX = coords.x;
   canvasY = coords.y;

   //dragging is true
   dragging = true;

   //store canvas state
   saveDrawingSurface();
}  


canvas.onmousemove = function(e){

   //if dragging is true
   if (dragging){
      //put canvas state
      restoreDrawingSurface();

      //GOT THIS CODE FROM STACK OVERFLOW
      //http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
      var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
       //draw line from stored mouseclick to mouse location
       if (shape == 'line'){
       context.beginPath();
       context.moveTo(canvasX, canvasY);
       context.lineTo(mouseX, mouseY);
       context.stroke(); 
       }
       
       //draw a circle
       if (shape == 'circle'){
       context.beginPath();
       context.arc(canvasX, canvasY, (Math.sqrt(square(mouseX-canvasX) + square(mouseY-canvasY)))/2 , 0, Math.PI*2, false);
       context.closePath();
       context.stroke();
       if (style == 'fill'){context.fill();}
       }

       //draw a square
       
       
       if (shape == 'rectangle'){
       context.beginPath();
       context.strokeRect(canvasX, canvasY, mouseX-canvasX, mouseY-canvasY);
       if (style == 'fill'){context.fillRect(canvasX, canvasY, mouseX-canvasX, mouseY-canvasY);}
       }

       //draw a triangle
       
       if (shape == 'triangle'){
       context.beginPath();
       context.moveTo(canvasX, canvasY);
       context.lineTo(mouseX, canvasY);
       context.lineTo(mouseX, mouseY);
       context.lineTo(canvasX, canvasY);
      if (style == 'fill'){context.fill();}

       context.stroke(); 
       }  
   }
}

canvas.onmouseup = function(e){
   dragging = false;
   //the end
}

shapeStyleSelect.onchange = function (e) {
   shape = shapeStyleSelect.value;
};

fillStyleSelect.onchange = function (e) {
   style = fillStyleSelect.value;
};






