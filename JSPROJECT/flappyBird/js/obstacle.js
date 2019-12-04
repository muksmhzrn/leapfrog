function Obstacle(parentElement) {
  this.x = WINDOW_WIDTH / 2;
  this.y = 0;
  this.width = 80;
  this.mainElement = parentElement;

  var heightTop = getRandom(250, 20);
  var heightBottom = WORLD_HEIGHT - heightTop - FLAPPY_PASS_HEIGHT;

  this.heightTop = heightTop;
  this.heightBottom = heightBottom;

  this.pipeTop = document.createElement('div');
  this.pipeBottom = document.createElement('div');

  this.createObstacle = function () {
    this.pipeTop.style.top = '0px';
    this.pipeTop.style.width = this.width + 'px';
    this.pipeTop.style.position = 'absolute';
    this.pipeTop.style.left = this.x + 'px';
    this.pipeTop.style.height = this.heightTop + 'px';
    this.pipeTop.style.backgroundRepeat = 'repeat-y';
    this.pipeTop.style.backgroundPosition = 'center';
    this.pipeTop.style.backgroundImage = 'url(images/pipe.png)';

    var pipeBottomImage = document.createElement('img');

    this.pipeBottom.style.width = this.width + 'px';
    this.pipeBottom.style.bottom = '85px';
    this.pipeBottom.style.left = this.x + 'px';
    this.pipeBottom.style.position = 'absolute';
    this.pipeBottom.style.height = this.heightBottom + 'px';
    this.pipeBottom.style.backgroundRepeat = 'repeat-y';
    this.pipeBottom.style.backgroundPosition = 'center';
    this.pipeBottom.style.backgroundImage = 'url(images/pipe.png)';

    this.mainElement.appendChild(this.pipeTop);
    this.mainElement.appendChild(this.pipeBottom);
  }

  this.updateObstacle = function () {
    this.x -= 5;
    this.pipeBottom.style.left = this.x + 'px';
    this.pipeTop.style.left = this.x + 'px';

  }

  this.removeObstacle = function () {
    this.mainElement.removeChild(this.pipeTop);
    this.mainElement.removeChild(this.pipeBottom);

  }

}