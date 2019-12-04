

var laneArray = [80, 150, 300];
var myCar;
var WIDTH = 30;
var HEIGHT = 70;
var BULLET_WIDTH = 10;
var BULLET_HEIGHT = 20;
var counter = 0;
var moveBackground;
var container = document.getElementById('container');
var background
var getRandomValue = function () {
  return Math.floor(Math.random() * 2);
};

function World(elementId) {
  this.car = '';
  this.obstacle = '';
  this.obstacles = [];
  this.element = elementId;


  var that = this;

  this.worldCreate = function () {

    this.element.style.height = '200px';
    this.element.style.width = '400px';
    this.element.style.margin = '0 auto';

    var isPlayerAlive = true;
    var startHeading = document.createElement('h1');
    var startButton = document.createElement('button');

    startHeading.style.textAlign = 'center';
    startButton.style.display = 'block';
    startButton.style.width = '30%';
    startButton.style.height = '20%';
    startButton.style.margin = '0px auto';

    startHeading.appendChild(document.createTextNode('Press Space to Shoot'));
    startButton.appendChild(document.createTextNode('PLAY'));

    this.element.appendChild(startHeading);
    this.element.appendChild(startButton);

    startButton.onclick = function () {
      that.element.removeChild(startButton);
      that.element.removeChild(startHeading);
      that.backgroundCreate();
      that.carCreate();
    }
  };

  this.backgroundCreate = function () {
    this.background = new Background(elementId);
    this.background.create();



    moveBackground = setInterval(function () {
      that.element.style.width = '600px';
      that.element.style.height = '650px';
      that.background.update();


      counter++;
      for (var x = 0; x < that.obstacles.length; x++) {
        (function (obstructionId) {
          obstructionId.update();
        })(that.obstacles[x]);
      }

      //car collision check
      that.carCollision();

      if (that.obstacles.length !== 0 && that.obstacles[0].y >= 650) {
        that.obstacles[0].removeObstruction();
        that.obstacles.splice(0, 1);
      }

      document.onkeydown = function (event) {

        var keyNumber = event.keyCode;
        if (keyNumber == 37) {
          var moveLeft = 1;
          that.car.update(moveLeft);
        }
        if (keyNumber == 32) {
          if (that.car.bulletCount < 1) {
            that.car.bullet();
          }

        }

        if (keyNumber == 39) {
          var moveRight = -1;
          that.car.update(moveRight);
        }
      };

      //obstacle created every 600ms (20 * 30ms)
      if (counter % 20 == 0) {
        that.obstacleCreate();
      }


      if (that.car.bulletCount === 1) {
        that.car.bulletUpdate();
        that.bulletCollision();
      }


    }, 30);
  };

  this.carCreate = function () {
    this.car = new Car(this.background.frame);
    this.car.create();
  };

  this.obstacleCreate = function () {
    var test = getRandomValue();
    if (test === 1) {
      this.obstacle = new Obstacle(this.background.frame);
      this.obstacles.push(this.obstacle);
      this.obstacle.create();
    }
  };


  this.carCollision = function () {

    for (var x = 0; x < this.obstacles.length; x++) {
      if (this.car.x <= this.obstacles[x].x + this.obstacles[x].width &&
        this.car.x + this.car.width >= this.obstacles[x].x &&
        this.car.y <= this.obstacles[x].y + this.obstacles[x].height &&
        this.car.height + this.car.y >= this.obstacles[x].y) {
        clearInterval(myCar);
        clearInterval(moveBackground);

        var boomHolder = document.createElement('div');
        var boomImage = document.createElement('img');

        boomHolder.style.width = '100px';
        boomHolder.style.height = '100px';
        boomHolder.style.position = 'absolute';
        boomHolder.style.top = '0px';
        boomHolder.style.left = '0px';
        boomHolder.style.zIndex = '50';
        boomHolder.style.x = this.car.x;
        boomHolder.style.y = this.car.y;
        this.obstacles[x].obstacleDiv.appendChild(boomHolder);
        boomImage.setAttribute('src', 'images/boom.png');
        boomImage.style.width = '100%';
        boomImage.style.height = '100%';
        boomHolder.appendChild(boomImage);

        var gameOver = document.createElement('h1');
        var restartButton = document.createElement('button');

        gameOver.style.color = 'red';
        gameOver.style.position = 'absolute';
        gameOver.style.left = '35%';
        gameOver.style.top = '30%';
        restartButton.style.position = 'absolute';
        restartButton.style.top = '25%';
        restartButton.style.left = '38%';
        restartButton.style.width = '15%';
        restartButton.style.height = '5%';

        gameOver.appendChild(document.createTextNode('Game Over'));
        restartButton.appendChild(document.createTextNode('Restart'));
        this.element.appendChild(gameOver);
        this.element.appendChild(restartButton);

        restartButton.onclick = function () {
          that.element.removeChild(gameOver);
          that.element.removeChild(restartButton);
          clearInterval(moveBackground);
          clearInterval(myCar);

          while (that.element.hasChildNodes()) {
            that.element.removeChild(that.element.lastChild);
          }

          that.obstacles.length = 0;
          that.backgroundCreate();
          that.carCreate();
        }
      }
    }
  };

  this.bulletCollision = function () {
    for (var x = 0; x < this.obstacles.length; x++) {
      var bulletLeft = parseInt(this.car.bulletHolder.style.left);
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
}


function Background(parentElement) {
  var frame = document.getElementById('background')
  this.frame = '';
  this.backgroundY = 0;
  this.element = parentElement;

  var that = this;

  this.create = function () {
    this.frame = document.createElement('div');
    this.frame.style.height = '700px';
    this.frame.style.width = '400px';
    this.frame.style.marginleft = '50px';
    this.frame.style.position = 'absolute';
    this.frame.style.backgroundRepeat = 'repeat-y';
    this.frame.setAttribute('id', 'background-frame');
    this.frame.style.background = 'url(images/track.png)';

    this.element.appendChild(this.frame);
  };

  this.update = function () {
    this.backgroundY += 10;
    this.frame.style.backgroundPositionY = this.backgroundY + 'px';

  };
}

function Car(parentElement) {
  this.x = 150;
  this.y = 600;
  var that = this;
  this.bulletCount = 0;
  this.carHolder = '';
  this.height = HEIGHT;
  this.carPosition = 150;
  this.width = WIDTH + 15;
  this.bulletHolder = '';
  this.bulletPosition = 0;
  this.element = parentElement;

  this.create = function () {
    this.carHolder = document.createElement('div');
    this.carHolder.style.height = this.height + 'px';
    this.carHolder.style.width = this.width + 'px';
    this.carHolder.style.position = 'absolute';
    this.carHolder.style.zIndex = '10';
    this.carHolder.style.top = this.y + 'px';
    this.carHolder.style.left = this.x + 'px';

    this.carHolder.setAttribute('id', 'car-holder');
    this.element.appendChild(this.carHolder);

    var carImage = document.createElement('img');

    carImage.setAttribute('src', 'images/tank.png');
    carImage.style.backgroundRepeat = 'no-repeat';
    carImage.style.height = '100%';
    carImage.style.width = '100%';
    this.carHolder.appendChild(carImage);
  };

  this.update = function (direction) {
    var changeCarPosition = function () {
      that.carPosition = that.carPosition + (-80) * direction;
      that.carHolder.style.left = that.carPosition + 'px';
    };

    if (this.carPosition <= 150 && direction === 1) {
      this.carHolder.style.left = this.carPosition + 'px';
    } else if (this.carPosition + WIDTH >= 300 && direction === -1) {
      this.carHolder.style.left = this.carPosition + 'px';
    } else {
      changeCarPosition();
    }
    this.x = this.carPosition;
  };

  this.bullet = function () {
    this.bulletCount++;
    this.bulletHolder = document.createElement('div');
    var bulletImage = document.createElement('img');

    this.bulletHolder.style.position = 'absolute';
    this.bulletHolder.style.zIndex = '100';
    this.bulletHolder.style.width = BULLET_WIDTH + 'px';
    this.bulletHolder.style.height = BULLET_HEIGHT + 'px';
    this.bulletHolder.style.top = this.y + 'px'; //adjust the position of the bullet 
    this.bulletHolder.style.left = this.x + 'px';
    bulletImage.style.width = '100%';
    bulletImage.style.height = '100%';
    bulletImage.setAttribute('src', 'images/bullet.png');

    this.element.appendChild(this.bulletHolder);
    this.bulletHolder.appendChild(bulletImage);
  };

  this.bulletUpdate = function () {
    this.bulletPosition = parseInt(this.bulletHolder.style.top);
    this.bulletPosition -= 20;
    this.bulletHolder.style.top = this.bulletPosition + 'px';

    if (this.bulletPosition <= 0) {
      this.element.removeChild(this.bulletHolder);
      this.bulletCount--;

    }
  };
}

function Obstacle(parentElement) {
  this.y = 0;
  this.x = 0;
  this.width = WIDTH;
  this.height = HEIGHT;
  this.element = parentElement;
  this.obstacleDiv = document.createElement('div');

  this.create = function () {
    var laneTest = getRandomValue() + getRandomValue();
    var obstacleImageHolder = document.createElement('img');
    this.obstacleDiv.style.zIndex = '10';
    this.obstacleDiv.style.width = this.width + 'px';
    this.obstacleDiv.style.height = this.height + 'px';
    this.obstacleDiv.style.top = this.y + 'px';
    this.obstacleDiv.style.position = 'absolute';
    obstacleImageHolder.style.width = '100%';
    obstacleImageHolder.style.height = '100%';
    obstacleImageHolder.setAttribute('src', 'images/enemy.png');

    this.element.appendChild(this.obstacleDiv);
    this.obstacleDiv.appendChild(obstacleImageHolder);

    if (laneTest === 0) {
      this.x = 300;
      this.obstacleDiv.style.left = '310px';
    } else if (laneTest === 1) {
      this.x = 230;
      this.obstacleDiv.style.left = '230px';
    } else {
      this.x = 150;
      this.obstacleDiv.style.left = '150px';
    }
  };

  this.update = function () {
    this.y += 10;
    this.obstacleDiv.style.top = this.y + 'px';
  };

  this.removeObstruction = function () {

    this.element.removeChild(this.obstacleDiv);
    console.log('removeObstruction', this.element);
    var score = console.count();



    // console.log('score', dd);
  };

}


var newWorld = new World(container);
newWorld.worldCreate();