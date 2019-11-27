
// var ctx = canvas.getContent('2d');
// ctx.fillStyle ="#2ecae6";
// ctx.beginPath();

// ctx.fill();

function ballMovement() {

    var container = document.getElementById("myCanvas");
    var ball = document.getElementById("animation");
    var pos = 0;
    var ballup = true;
    var containerStyle = container.style;
    var ballStyle = ball.style;
    var ballTop = Number(ballStyle.top.slice(0, -2));
    var ballHeight = Number(ballStyle.height.slice(0, -2));
    containerHeight = Number(containerStyle.height.slice(0, -2));
    var id = setInterval(frame, 50);
    function frame() {
        if (ballTop <= 0) {
            ballup = false;
        }
        if (ballTop + ballHeight >= containerHeight) {
            ballup = true;
        }
        if (ballup) {
            ballTop -= 5;
            ballStyle.top = String(ballTop + 'px');
            ballStyle.backgroundColor = 'red';
        }
        else {
            ballTop += 5;
            ballStyle.top = String(ballTop + 'px');
            ballStyle.backgroundColor = 'blue';

        }



    }
}

ballMovement();
// function myMove() {
//     var elem = document.getElementById("animate");   
//     var pos = 0;
//     var id = setInterval(frame, 5);
//     function frame() {
//       if (pos == 350) {
//         clearInterval(id);
//       } else {
//         pos++; 
//         elem.style.top = pos + "px"; 
//         elem.style.left = pos + "px"; 
//       }
//     }
//   }