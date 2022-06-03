let Swipes = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 5000,
    stopOnLastSlide: true,
    disableOnInteraction: false,
  },
  slidesPerGroup: 1,
  spaceBetween: 30,
  slidesPerView: 1,
  simulateTouch: true,
  touchRatio: 1,
  touchAngle: 45,
  grabCursor: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 20,
    stretch: 50,
    slideShadows: true,
  },
});

function animateTranslate(param) {
  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.style.transform = "translateX(0)";
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(param);
  for (let elm of elements) {
    observer.observe(elm);
  }
}

function animateOpacity(param) {
  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.style.opacity = 1;
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(param);
  for (let elm of elements) {
    observer.observe(elm);
  }
}

animateTranslate(".description__image");
animateTranslate(".content__content");
animateTranslate(".events__column_right");
animateTranslate(".events__column_left");
animateTranslate(".footer__organisator_1");
animateTranslate(".footer__organisator_2");
animateOpacity(".organisation__title");
animateOpacity(".description__text");
animateOpacity(".header__text");
animateOpacity(".shedule__title");

let radius = 320;
let autoRotate = true;
let rotateSpeed = -60;
let imgWidth = 140;
let imgHeight = 205;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("img");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
  for (let i = 0; i < aImg.length; i++) {
    aImg[i].style.transform =
      "rotateY(" +
      i * (360 / aImg.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aImg[i].style.transition = "transform 1s";
    aImg[i].style.transitionDelay = delayTime || (aImg.length - i) / 4 + "s";
  }
}
function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;
if (autoRotate) {
  let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}
carousel.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  let sX = e.clientX,
    sY = e.clientY;
  this.onpointermove = function (e) {
    e = e || window.event;
    let nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };
  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
  return false;
};
