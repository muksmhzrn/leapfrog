var isinitial = true;
var laneArray = [30, 125, 225];
var speed = 10;

var ROAD_WIDTH = 500;
var ROAD_DISPLAY_HEIGHT = 650;
var TOTAL_ROAD_HEIGHT = 10800;
var CAR_HEIGHT = 80;
var CAR_WIDTH = 40;
var VELOCITY = 0.01;
var MY_CAR_POS_FROM_BOTTOM = 0;
// var bulletLimit = 0;




function Car(containerID) {
  this.x = 0;
  this.y = 0;
  this.element = null;
  this.bulletCount = 0;
  this.bulletHolder = '';
  this.bulletPosition = 0;

  this.init = function () {
    // this.element = document.createElement('img');
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'car');
    this.carWidth = this.carWidth;
    this.carHeight = this.carHeight;
    container = document.getElementById(containerID);
    container && container.appendChild(this.element);
    // this.element.style.backgroundImage = 'url("./images/tank.png")'
  }
  this.bullet = function () {
    this.bulletCount++;
    this.bulletHolder = document.createElement('div');
    var bulletImage = document.createElement('img');

    this.bulletHolder.style.position = 'absolute';
    this.bulletHolder.style.zIndex = '20';
    this.bulletHolder.style.width = BULLET_WIDTH + 'px';
    this.bulletHolder.style.height = BULLET_HEIGHT + 'px';
    this.bulletHolder.style.top = this.y - 30 + 'px'; //adjust the position of the bullet 
    this.bulletHolder.style.left = this.x + 25 + 'px';
    bulletImage.style.width = '100%';
    bulletImage.style.height = '100%';
    bulletImage.setAttribute('src', 'images/bullet.png');

    this.element.appendChild(this.bulletHolder);
    this.bulletHolder.appendChild(bulletImage);
  };


  this.setCarPosition = function (randX, randY) {
    this.x = laneArray[randX];
    this.y = -50;
  }

  this.draw = function () {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  var that = this;
  this.removeCar = function () {
    this.element.remove();
  }
}

function CarWorldAnimation(container, background) {
  var obsCars = [];
  var obstacleGap = 0;
  var player = new Car(container);
  var gamePlayInterval = null;
  var isplayerAlive = true;
  var gameOver = document.getElementById('gameOver');
  var score = document.getElementById('score');
  var highScore = document.getElementById('highscore');

  // var resetButton = document.getElementById('resetbutton');
  // resetButton.onclick = function () {

  // }

  highScore.style.display = 'block'
  score.style.display = 'block';
  var scoreCount = 1;

  this.init = function () {
    gameOver.style.display = 'none';
    generatePlayer();
    gamePlayInterval = setInterval(moveObstacles, 60);
  }

  function generatePlayer() {

    player.x = laneArray[1];
    player.y = ROAD_DISPLAY_HEIGHT - CAR_HEIGHT - 15;
    player.init();
    player.element.setAttribute('class', 'player');

    // player.element.setAttribute('src', './images/tank.png');
    var hscore = window.localStorage.getItem('highScore');
    var highScore = document.getElementById('highscore');
    highScore.innerHTML = "Your Highscore: " + hscore;
    console.log('hscore', hscore);
    applyStyles(player.element, {
      position: 'absolute',
      height: CAR_HEIGHT + 'px',
      width: CAR_WIDTH + 'px',
      top: player.y + 'px',
      left: player.x + 'px',
    });
    player.draw();
    document.addEventListener('keydown', handleMyCar);
  }

  var stopGame = function () {
    window.localStorage.setItem('highScore', scoreCount);
    clearInterval(gamePlayInterval);
    isplayerAlive = false;
  }

  var colissionDetection = function () {
    obsCars.forEach(obs => {
      if ((player.x < obs.x + CAR_WIDTH) && (player.x + CAR_WIDTH > obs.x) &&
        (player.y < obs.y + CAR_HEIGHT) && (CAR_HEIGHT + player.y > obs.y)) {
        stopGame();
        gameOver.style.display = 'block';
        gameOver.innerHTML = "Game Over";
      }
    });
  }

  function bullet() {
    var bulletWrapper = document.createElement('div');
    bulletWrapper.style.width = '5px';
    bulletWrapper.style.height = '20px';
    bulletWrapper.style.background = 'red';
    bulletWrapper.style.boderRadius = '10px';
    bulletWrapper.style.zIndex = '100';
    bulletWrapper.style.position = 'absolute';
    bulletWrapper.style.left = '45%';
    bulletWrapper.style.top = '0';
    bulletWrapper.style.margin = '0 auto';
    player.element.appendChild(bulletWrapper);
    var obstacle = document.getElementsByClassName('obstacle');
    var marginTop = 0;
    var obstacle = setInterval(function () {
      marginTop -= 5;
      bulletWrapper.style.marginTop = marginTop + 'px';
    }, 60);

    function bulletCollision() {
      for (var x = 0; x < this.obstacles.length; x++) {
        var bulletLeft = parseInt(this.car.bulletWrapper.style.left);
        var bulletRight = bulletLeft + BULLET_WIDTH; //for checking the bullet boundary

        if (this.car.bulletPosition <= this.obstacles[x].y + this.obstacles[x].height &&
          bulletRight <= this.obstacles[x].x + this.obstacles[x].width &&
          bulletLeft + BULLET_WIDTH >= this.obstacles[x].x &&
          BULLET_HEIGHT + this.car.bulletPosition >= this.obstacles[x].y) {

          this.background.frame.removeChild(this.obstacles[x].obstacleDiv);
          this.background.frame.removeChild(this.car.bulletHolder);
          this.car.bulletCount = 0;
          this.obstacles[x] = null;
        }
      }

      for (var x = 0; x < this.obstacles.length; x++) {
        if (this.obstacles[x] === null) {
          this.obstacles.splice(this.obstacles.indexOf(this.obstacles[x]), 1);
          break;
        }
      }
    };


    // for (var i = 0; i < obstacle.length; i++) {
    //   var style = obstacle[i].getAttribute('style');
    //   console.log('style', style);
    //   var obstacleLane = this.laneArray.indexof(
    //     style
    //       .split(';')[1]
    //       .trim()
    //       .split(' ')[1]
    //   );
    //   console.log(obstacleLane);
    //   // console.log(style);
    // }

  }

  //carmovement left right
  function handleMyCar(event) {
    //   document.addEventListener("keyup",function(event){
    //     if(event.code === "ArrowRight")

    //   })


    if (event.keyCode == 39 && isplayerAlive) {
      if (player.x < 125) {
        player.x = 125;

      } else if (player.x < 225) {
        player.x = 225;
      }
    }

    if (event.keyCode == 37 && isplayerAlive) {
      if (player.x > 125) {
        player.x = 125;
      } else if (player.x > 30) {
        player.x = 30;
      }
    }

    if (event.keyCode == 38 && isplayerAlive) {
      bullet();
    }

    player.draw();

    // if (!isplayerAlive && event.keyCode != 0) {
    //   isplayerAlive = true;
    //   player.removeCar();
    //   absCars.forEach(function (obstacle) { obstacle.removeCar(); })
    //   delete (player);
    //   delete (startGame);
    //   scoreCount = 0;
    //   score.innerHTML = '';
    //   speed = 5;
    //   startGame = new CarWorldAnimation(container, background).init();
    // }

  }

  var createObstacles = function () {
    var obstacle = new Car(container);
    var randX = getRandomNumber(0, 2);
    console.log('randX', randX);
    var randY = 0;
    obstacle.setCarPosition(randX, randY);
    obstacle.init();
    obstacle.element.setAttribute('class', 'obstacle');

    // console.log('player', player.x);

    // obstacle.element.setAttribute('src', './images/enemy.png');
    applyStyles(obstacle.element, {
      position: 'absolute',
      height: CAR_HEIGHT + 'px',
      width: CAR_WIDTH + 'px',
      top: player.y + 'px',
      left: player.x + 'px',

    });
    obstacle.draw();
    obsCars.push(obstacle);
  }

  var moveObstacles = function () {
    obstacleGap++;
    if (obstacleGap == 30) {
      createObstacles();
      obstacleGap = 0;
    }

    moveBackground();
    for (var i = 0; i < obsCars.length; i++) {
      var car = obsCars[i];
      car.y += speed;
      if (car.y >= ROAD_DISPLAY_HEIGHT - CAR_HEIGHT) {
        scoreCount += i;
        score.innerHTML = "Your Score: " + scoreCount;
        car.removeCar();
        obsCars.splice(i, i);
      }
      colissionDetection();
      car.draw();
    }
  }

  var background_road = document.getElementById(background);
  applyStyles(background_road, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: TOTAL_ROAD_HEIGHT + 'px',
    backgroundImage: "url('./images/laneBackground.png')",
    backgroundRepeat: 'repeat-y',
    marginTop: (ROAD_DISPLAY_HEIGHT - TOTAL_ROAD_HEIGHT) + 'px',
  });

  function moveBackground(background) {
    var margin = parseInt(getComputedStyle(background_road).getPropertyValue('margin-top'));
    margin += speed;
    speed += VELOCITY;

    if (margin > 0) {
      margin = ROAD_DISPLAY_HEIGHT - TOTAL_ROAD_HEIGHT;
    }
    background_road.style.marginTop = margin + 'px';
  }
}


function applyStyles(element, styles) {
  var styleKeys = Object.keys(styles);

  if (styleKeys && styleKeys.length) {
    styleKeys.forEach(styleKey => {
      element.style[styleKey] = styles[styleKey];
    });
  }

}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


window.addEventListener('keypress', function (event) {
  if (event.keyCode != 0 && isinitial) {
    isinitial = false;
    var startGame = new CarWorldAnimation('container', 'road-background').init();
  }
}) 