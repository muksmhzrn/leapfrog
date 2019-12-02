
function Box(parentElement) {
  this.x = 0;
  this.y = 0;
  this.dx = 1;
  this.dy = 1;
  this.width = 50;
  this.height = 50;
  this.element = null;


  this.parentElement = parentElement;
  var that = this;


  this.init = function () {
    var box = document.createElement('div');
    box.style.height = this.height + 'px';
    box.style.width = this.width + 'px';
    // box.style.backgroundImage = "url('antwalk.gif')";
    box.classList.add('box');
    this.parentElement.appendChild(box);
    this.element = box;
    this.element.onclick = this.boxClicked;
    this.draw();

    return this;
  }

  this.setPostion = function (x, y) {
    this.x = x;
    this.y = y;

  }
  this.setDirection = function (dx, dy) {
    this.dx = (Math.random() - 0.5) * this.speed * 2;  ///for negative value (-0.5 to 0.5)
    this.dy = (Math.random() - 0.5) * this.speed * 2;
  }

  this.boxClicked = function () {

    this.parentNode.removeChild(this);

  }

  this.draw = function () {

    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;

    this.draw();

  }


  this.checkCollision = function (boxes) {
    if (this.x < 0 || this.x + this.width > 500) {
      this.dx = -this.dx;
      this.x = this.x <= 0 ? 0 : 500 - this.width;
    }
    if (this.y < 0 || this.y + this.height > 500) {
      this.dy = -this.dy;
      this.y = this.y <= 0 ? 0 : 500 - this.height;
    }
    var boxLength = boxes.length;


    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].x === this.x && boxes[i].y === this.y) continue;
      if (
        boxes[i].x < this.x + this.width &&
        boxes[i].x + boxes[i].width > this.x &&
        boxes[i].y < this.y + this.height &&
        boxes[i].y + boxes[i].height > this.y
      ) {
        this.dx = -this.dx;
        this.dy = -this.dy;
      }
    }
  };
}



function getRandomArbitrary(min, max) {
  return Math.random() * ((max - min) + min);

}

function Game(parentElement, boxCount) {
  var boxes = [];
  var MAX_WIDTH = 500;
  var MAX_HEIGHT = 500;
  this.parentElement = parentElement;
  this.boxCount = boxCount || 10;



  this.startGame = function () {
    for (var i = 0; i < this.boxCount; i++) {
      var box = new Box(parentElement).init();
      box.setPostion(
        getRandomArbitrary(0, MAX_WIDTH - 50),
        getRandomArbitrary(0, MAX_HEIGHT - 50)
      )

      box.draw();
      boxes.push(box);
    }



    setInterval(this.moveBoxes.bind(this), 10 / 60);
  }

  this.moveBoxes = function () {
    for (var i = 0; i < this.boxCount; i++) {
      boxes[i].move();
      boxes[i].checkCollision(boxes)
    }
  }
}

var parentElement = document.getElementById('app');

new Game(parentElement).startGame();
