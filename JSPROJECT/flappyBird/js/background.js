function Background(parentElement) {
  this.element = parentElement;
  this.createBackground = function () {
    this.element.style.width = '50%';
    this.element.style.height = '470px';
    this.element.style.backgroundImage = 'url(images/flappy-back.png)';
    this.element.style.backgroundRepeat = 'repeat-x';
    this.element.style.overflow = 'hidden';
  };

  this.updateBackground = function () {
    this.positionX = this.positionX - 10;
    this.element.style.backgroundPositionX = this.positionX + 'px';
  };
}