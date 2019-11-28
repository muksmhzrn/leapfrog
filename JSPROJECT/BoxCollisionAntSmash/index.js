(function () {
  function Box(parentElement) {
    this.x = 10;
    this.y = 10;
    this.dx = 5;
    this.dy = 5;
    this.width = 50;
    this.height = 50;
    this.element = null;


    this.parentElement = parentElement;
    var that = this;
    console.log('box', Box);

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
      this.x = x
      this.y = y;
      console.log(x);
    }

    this.boxClicked = function () {
      console.log(this.parentNode)
      this.parentNode.removeChild(this);
      console.log('boxClicked', this.width);
    }

    this.draw = function () {

      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
    }

    this.move = function () {
      this.x += this.dx;
      this.y += this.dy;
      // console.log('x0', this.x);
      this.draw();
      // console.log('draw0', this.draw);
    }


    this.checkCollision = function (boxes) {
      if (this.x < 0 || this.x + this.width > 500) {
        this.dx = -this.dx;
      }
      if (this.y < 0 || this.y + this.height > 500) {
        this.dy = -this.dy;
      }
      var boxLength = boxes.length;

      // console.log('boxlength', boxLength);




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

  //distance
  // function checkDistance() {

  // }

  function getRandomArbitrary(min, max) {
    // console.log('return', Math.random() * ((max - min) + min));
    return Math.random() * ((max - min) + min);
    // return 1;
  }

  function Game(parentElement, boxCount) {
    var boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 10;
    // console.log(this.boxCount);
    // console.log('game', Game);


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
      // console.log('boxesssss', boxes[0]);
      // console.log('boxesssss', boxes[1]);
      // console.log('boxesssss', boxes[2]);


      setInterval(this.moveBoxes.bind(this), 100)
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
})();