var canvas = document.getElementById('mainWrapper');
var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 700;
canvas.height = 500;
var ctx = canvas.getContext('2d');
var phase = 0;
var speed = 0.05;
var maxCircleRadius = 5;
var frameCount = 0;
var numRows = 15;
var numCols = 15;
var numStrands = 2;




// canvas.fillStyle = "blue";

function draw() {
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(' canvas.height>>>>', canvas.height);

  var x = 0;
  var y;
  var colOffset = 0;
  frameCount++; //increased by 1
  console.log('frameCount>>>>>', frameCount);
  phase = frameCount * speed; //increased by 0.05 then 0.1 
  console.log('phase>>>>', phase);

  for (var count = 0; count < numStrands; count++) {
    if (count === 0) {
      var strandPhase = phase;
    } else {
      var strandPhase = phase + count * Math.PI;
      console.log('strandPhase>>>>', strandPhase);
    }
    x = 0;
    for (var col = 0; col < numCols; col++) {
      x = x + 30;
      colOffset = (col * 2 * Math.PI) / 10;
      console.log('colOffset>>>>', colOffset);


      for (var row = 0; row < numRows; row += 1) {
        var y = canvas.height / 5 + row * 10 + Math.sin(strandPhase + colOffset) * 50;
        //sizeOffset changes the radius of the circle
        var sizeOffset = (Math.cos(strandPhase - (row * 0.1) + colOffset) + 1) * 0.5;
        var circleRadius = sizeOffset * maxCircleRadius;

        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'RED';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

setInterval(draw, 20);