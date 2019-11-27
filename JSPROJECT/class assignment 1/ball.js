// task8
// Render a scatter plot based on an array of coordinates. Create the container for the plot and create each point using javascript.
// var points = [
//     {x: 10, y: 20},
//     {x: 40, y, 40},
//     {x: 60, y, 20},
//     ...
// ];

var points = [
    {x: 10, y: 20},
    {x: 40, y:40},
    {x: 60, y: 20},
    {x: 50, y: 40},
    {x: 60, y: 60}
];

points.forEach(function(value){
    console.log(value);
    console.log(value.x);
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
     ctx.fillStyle ="#2ecae6"
    ctx.beginPath();
    ctx.arc(value.y,value.x,5,0,2*Math.PI);
     ctx.fill();
})



// task9
// Render a circle that moves vertically and bounces back into another directio