function Bird(parentElement) {
  this.x = 300;
  this.y = 20;
  this.fVelocity = 0;
  this.iVelocity = 0;
  this.alive = 1;
  this.width = 50;
  this.height = 50;
  this.time = 0;
  this.dx = 0;
  this.element = parentElement;
  this.flappyHolder = document.createElement('div');
  this.flappyImage = document.createElement('img');


  this.createBird = function () {
    this.flappyHolder.style.width = '40px';
    this.flappyHolder.style.height = '40px';
    this.flappyHolder.style.position = 'absolute';
    this.flappyHolder.style.left = this.x + 'px';
    this.flappyHolder.style.top = this.y + 'px';
    this.flappyImage.style.width = '100%';
    this.flappyImage.style.height = '100%';
    this.flappyImage.setAttribute('src', 'images/flappy_bird.gif');

    this.element.appendChild(this.flappyHolder);
    this.flappyHolder.appendChild(this.flappyImage);

  };

  this.gravity = function () {
    let tempTime = this.time;
    this.iVelocity = this.fVelocity;
    this.fVelocity = this.iVelocity + GRAVITY * this.time;
    this.time = this.time + (40 / 1000);
    this.dx = this.fVelocity * (this.time - tempTime) + GRAVITY * (this.time + tempTime);

  };

  this.updateBird = function () {
    this.y = this.y + this.dx;
    this.gravity();
    this.flappyHolder.style.top = this.y + 'px';

    if (this.y <= TOP_LIMIT) {
      //this.y = 20;
      this.alive = 0;
      return true;
    } else if (this.y >= LOWER_LIMIT) {
      //this.y = 20;
      this.alive = 0;
      return true;
    } else {
      return false;
    }

  };

  this.moveBird = function (direction) {
    this.fVelocity = 0;
    this.time = 0;
    this.y = this.y + (-1) * direction * 50;
    this.flappyHolder.style.top = this.y + 'px';
  };

};

