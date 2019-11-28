// var container = this.document.getElementsByClassName('slider-container');

// function Slider(containerName) {
//   this.container = container;
//   this.wrapper = this.container.getElementsByClassName('slider-image-wrapper')[0];
//   this.images = this.wrapper.getElementsByTagName('img').length;
//   this.currentImageIndex = 0;
//   this.currentImagePosition = 0;

//   var that = this;

//   this.init = function (width, height) {
//     this.imageHeight = height;
//     this.imageWidth = width;
//     this.applyStyle();
//     // this.drawIndicators();
//     // this.drawSlide();


//   }

//   this.applyStyle = function () {
//     this.container.style.width = this.imageWidth + 'px';
//     this.container.style.height = this.imageHeight + 'px';
//     this.container.style.position = 'relative';
//     this.container.style.overflow = 'hidden';
//     this.container.style.margin = 'auto';
//     this.wrapper.style.width = this.images * this.imageWidth + 'px';
//     this.wrapper.style.height = this.imageHeight + 'px';
//     this.wrapper.style.position = 'absolute';
//     this.wrapper.style.left = '0px';
//   }
// }
// var imageWrapper = this.document.getElementsByClassName('slider-image-wrapper');
// var images = this.document.getElementsByTagName('img').length;

// var slider = new Slider(container);


var container = this.document.getElementsByClassName('slider-container')[0];
var slider = new Slider(container);
// slider.init();
slider.applyStyle();
function Slider(containerName) {
  this.container = containerName;
  this.applyStyle()

  this.appstyle = function () {
    console.log(this.container);
  };

}