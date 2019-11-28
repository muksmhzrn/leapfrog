function Slider(sliderContainer) {
  this.container = sliderContainer;
  this.wrapper = this.container.getElementsByClassName('slider-image-wrapper')[0];
  this.images = this.wrapper.getElementsByTagName('img').length;
  this.currentImageIndex = 0;
  this.currentImagePosition = 0;

  var that = this;

  this.init = function (width, height) {
    this.imageHeight = height;
    this.imageWidth = width;
    this.applyStyle();
    this.drawIndicators();
    this.drawSlide();
  };

  this.applyStyle = function () {
    this.container.style.width = this.imageWidth + 'px';
    this.container.style.height = this.imageHeight + 'px';
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.margin = 'auto';
    this.wrapper.style.width = this.images * this.imageWidth + 'px';
    this.wrapper.style.height = this.imageHeight + 'px';
    this.wrapper.style.position = 'absolute';
    this.wrapper.style.left = '0px';
  }

  this.newImagePosition = function (position) {
    this.wrapper.style.left = position + 'px';
  }

  this.drawSlide = function () {
    var prevSlide = document.createElement('div');
    prevSlide.style.display = 'inline-block';
    prevSlide.style.position = 'absolute';
    prevSlide.style.zIndex = '30';
    prevSlide.style.left = '0px';
    prevSlide.style.top = '50%';
    prevSlide.style.width = '40px';
    prevSlide.style.height = '40px';
    prevSlide.style.backgroundImage = 'url("images/left.png")';
    prevSlide.style.backgroundColor = 'black';

    var nextSlide = document.createElement('div');
    nextSlide.style.display = 'inline-block';
    nextSlide.style.position = 'absolute';
    nextSlide.style.zIndex = '30';
    nextSlide.style.right = '0px';
    nextSlide.style.top = '50%';
    nextSlide.style.width = '40px';
    nextSlide.style.height = '40px';
    nextSlide.style.backgroundImage = 'url("images/right.png")';
    nextSlide.style.backgroundColor = 'black';

    nextSlide.addEventListener('click', function () { that.nextImage() });
    prevSlide.addEventListener('click', function () { that.prevImage() });

    this.container.appendChild(prevSlide);
    this.container.appendChild(nextSlide);
  }
  this.nextImage = function () {
    this.slide(this.currentImageIndex + 1)
  }

  this.prevImage = function () {
    this.slide(this.currentImageIndex - 1)
  }

  this.autoSlider = setInterval(function () {
    that.nextImage()
  }, 2000)


  this.drawIndicators = function () {
    var indicators = document.createElement('div');
    indicators.style.position = 'absolute';
    indicators.style.height = '20px';
    indicators.style.width = '100%';
    indicators.style.bottom = '10px';
    indicators.style.textAlign = 'center';
    var ul = document.createElement('span')

    for (var i = 1; i <= this.images; i++) {
      var li = document.createElement('li');
      li.style.height = '15px';
      li.style.width = '15px';
      li.style.borderRadius = '50%';
      li.style.backgroundColor = 'grey';
      li.style.display = 'inline-block';
      li.style.margin = '2px';
      li.addEventListener(
        "click",
        (function (imageIndex) {
          return function () {
            that.slide(imageIndex);
          };
        })(i)
      );
      ul.appendChild(li);
    }

    indicators.appendChild(ul);
    this.container.appendChild(indicators);
  }

  this.slide = function (newImageIndex) {

    var initialPosition = (1 - this.currentImageIndex) * this.imageWidth;
    this.currentImageIndex = ((newImageIndex > this.images) ? 1 : ((newImageIndex <= 0) ? this.images : newImageIndex));

    var finalPosition = (1 - this.currentImageIndex) * this.imageWidth;
    console.log('finalPosition', finalPosition)
    console.log('initialPosition', initialPosition)

    var animation = Math.abs(initialPosition - finalPosition) / 100;

    var slideShow = setInterval(function () {
      if (animation == 0) clearInterval(slideShow);
      that.resetAutoSlider();
      if (finalPosition > initialPosition) {
        initialPosition += animation;
        if (finalPosition < initialPosition) {
          clearInterval(slideShow);
          that.newImagePosition(finalPosition);
          return;
        }
      } else {
        initialPosition -= animation;
        if (finalPosition > initialPosition) {
          clearInterval(slideShow);
          that.newImagePosition(finalPosition);
          return;
        }
      }
      that.newImagePosition(initialPosition);
    })

  }
  this.resetAutoSlider = function () {
    clearInterval(this.autoSlider);
    this.autoSlider = setInterval(function () {
      that.nextImage()
    }, 2000)
  }
}