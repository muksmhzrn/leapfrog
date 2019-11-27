var container = document.getElementsByClassName('slider-container')[0];
var imageWrapper = document.getElementsByClassName('slider-image-wrapper')[0];
var images = document.getElementsByClassName('slider-image-wrapper')[0].getElementsByTagName('img');
var dotWrapper = document.getElementsByClassName('dots-wrapper')[0];
var prevSlide = document.getElementsByClassName('prev-slide')[0];
var nextSlide = document.getElementsByClassName('next-slide')[0];

var currentImageIndex = 0;
var imageLength = images.length;
var imageWidth = container.offsetWidth;

for (var i = 0; i < images.length; i++) {
  images[i].width = imageWidth;
}
var carouselWidth = imageLength * imageWidth;

imageWrapper.style.width = carouselWidth + 'px';



function indicator() {
  for (var i = 0; i < imageLength; i++) {
    var dots = document.getElementsByClassName('dots');
    var dot = document.createElement("span");
    dot.classList.add("dots");
    dotWrapper.appendChild(dot);
    dot.addEventListener("click", function () {
      currentImageIndex = i;
      slideImage(currentImageIndex);
      dots[currentImageIndex].classList.add('active');
      clearTimeout(interval);
    });
  }
}
indicator();

function slideShow() {
  var dots = document.getElementsByClassName('dots');
  var active = document.querySelector('.active');
  if (imageLength < currentImageIndex + 1) {
    currentImageIndex = 0;
  }
  slideImage(currentImageIndex);

  if (active != null) {
    active.classList.remove('active');
  }

  dots[currentImageIndex].classList.add('active');
  currentImageIndex++;
  var interval = setTimeout(slideShow, 2000);

}
slideShow();

function slideImage(c) {
  imageWrapper.style.left = '-' + c * imageWidth + 'px';

};

function isCurrentImageLast() {
  return currentImageIndex == imageLength - 1;
  console.log('currentImageIndex >>>>>>>>', currentImageIndex)
  console.log('imageLength >>', imageLength)
}

function isCurrentImageFirst() {
  return currentImageIndex == 0;
  console.log('currentImageIndex >>', currentImageIndex)
}

nextSlide.addEventListener('click', function () {
  if (isCurrentImageLast()) {
    imageWrapper.style.left = 0;
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
    slideImage(currentImageIndex);
  }
})

prevSlide.addEventListener('click', function () {
  if (isCurrentImageFirst()) {
    currentImageIndex = imageLength - 1;
    slideImage(currentImageIndex);
  } else {
    currentImageIndex--;
    slideImage(currentImageIndex);
  }
})


