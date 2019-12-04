function World() {
  this.mainWrapper = document.getElementById('mainWrapper');
  this.score = 0;
  this.counter = 0;
  this.obstacle = '';
  this.obstacles = [];
  this.bird = new Bird(this.mainWrapper);
  this.background = new Background(this.mainWrapper);

  this.createWorld = function () {
    this.mainWrapper.style.height = '380px';
    this.mainWrapper.style.width = '50%';
    this.mainWrapper.style.margin = '0 auto';
    this.mainWrapper.style.position = 'relative';


    var startHeading = document.createElement('h1');
    var startButton = document.createElement('button');

    this.mainWrapper.appendChild(startHeading);
    this.mainWrapper.appendChild(startButton);

    startHeading.style.textAlign = 'center';
    startButton.style.display = 'block';
    startButton.style.margin = '0px auto';

    startHeading.appendChild(document.createTextNode('Press Space to move Flappy Up'));
    startButton.appendChild(document.createTextNode('Play'));

    startButton.onclick = (event) => {
      this.mainWrapper.removeChild(startHeading);
      this.mainWrapper.removeChild(startButton);
      this.moveWorld();
    }
  };

  this.moveWorld = function () {
    this.background.createBackground();
    this.bird.createBird();



    //movement 
    moveWorld = setInterval(() => {
      var result;


      this.background.updateBackground();
      result = this.bird.updateBird();

      if (result === true) {
        this.resetWorld();
      }

      //keypress
      document.onkeydown = (event) => {
        var birdDirection = 0;


        if (event.keyCode === 32) {
          //up
          if (this.bird.alive === 1) {
            birdDirection = 1;
            this.bird.moveBird(birdDirection);
          }
        }
      }
      this.counter++;
      if (this.counter % 50 === 0) {
        this.obstacle = new Obstacle(this.mainWrapper);
        this.obstacles.push(this.obstacle);
        this.obstacle.createObstacle();
      }


      for (var x = 0; x < this.obstacles.length; x++) {
        this.obstacles[x].updateObstacle();
      }

      if (this.obstacles.length !== 0) {
        if (this.obstacles[0].x + this.obstacles[0].width <= 0) {
          this.obstacles[0].removeObstacle();
          this.obstacles.splice(this.obstacles[0], 1);
        }
        this.collision();
      }
    }, 40)
  };

  this.resetWorld = function (hScore) {
    clearInterval(moveWorld);

    var endHeading = document.createElement('h1');
    var scoreHeading = document.createElement('h2');
    var highScoreHeading = document.createElement('h2');
    var restartButton = document.createElement('button');
    var hScore = 0;

    endHeading.style.lineHeight = '0';
    endHeading.style.textAlign = 'center';
    endHeading.style.position = "absolute";
    endHeading.style.zIndex = '10';
    endHeading.style.left = '400px';

    restartButton.style.display = 'block';
    restartButton.style.position = "absolute";
    restartButton.style.zIndex = '10';
    restartButton.style.margin = '0px auto';
    restartButton.style.left = '450px';
    restartButton.style.top = '50px';

    highScoreHeading.style.display = 'block';
    highScoreHeading.style.position = "absolute";
    highScoreHeading.style.zIndex = '10';
    highScoreHeading.style.margin = '0px auto';
    highScoreHeading.style.left = '5px';
    highScoreHeading.style.top = '50px';

    scoreHeading.style.position = "absolute";
    scoreHeading.style.display = 'block';
    scoreHeading.style.zIndex = '10';
    scoreHeading.style.margin = '0px auto';
    scoreHeading.style.left = '5px';
    scoreHeading.style.top = '10px';

    console.log('hScore111', this.hScore);
    endHeading.appendChild(document.createTextNode('Game Over'));
    scoreHeading.appendChild(document.createTextNode('Score: ' + this.score));
    highScoreHeading.appendChild(document.createTextNode('High Score: ' + this.hScore));
    restartButton.appendChild(document.createTextNode('Restart Game'));

    this.mainWrapper.appendChild(endHeading);
    this.mainWrapper.appendChild(scoreHeading);
    this.mainWrapper.appendChild(highScoreHeading);
    this.mainWrapper.appendChild(restartButton);


    restartButton.onclick = (event) => {
      while (this.mainWrapper.hasChildNodes()) {
        this.mainWrapper.removeChild(this.mainWrapper.lastChild);
      }
      this.bird.alive = 1;
      gameArray.pop(this);
      start(); //calling function outside the object
    }
  };
  this.collision = function () {
    this.obstacles.forEach((obstacle) => {

      if (this.bird.x <= obstacle.x + obstacle.width &&
        this.bird.x + this.bird.width >= obstacle.x) {
        countScore++;
        //everytime bird passes obstacle, the condition accepted 26 times
        if (countScore % 26 === 0) {
          this.score++;

        }


        if (this.bird.y <= obstacle.y + obstacle.heightTop ||
          this.bird.y + this.bird.height - 30 >= WORLD_HEIGHT - (obstacle.y + obstacle.heightBottom)) {
          // this.bird.style.transform = rotate(180deg);
          clearInterval(moveWorld);
          this.resetWorld();
          this.bird.alive = 0;
          window.localStorage.setItem('highScore', this.score);
          var hScore = window.localStorage.getItem('highScore', this.score);
          console.log('hScore', hScore);
        }
      }

    })
  };

}