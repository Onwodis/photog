'use strict';

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlideds(slideIndex);

// Next/previous controls
function plusSlidee(n) {
  showSlideds((slideIndex += n));
}

// Thumbnail image controls
function currentSlidee(n) {
  showSlideds((slideIndex = n));
}

function showSlideds(n) {
  var i;
  var slides = document.getElementsByClassName("demiMySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

// Open the Modal
function newopenModal() {
  document.getElementById("newMyModal").style.display = "block";
}

// Close the Modal
function newcloseModal() {
  document.getElementById("newMyModal").style.display = "none";
}

var slideIndex = 1;
showSlided(slideIndex);

// Next/previous controls
function plusSlided(n) {
  showSlided((slideIndex += n));
}

// Thumbnail image controls
function currentSlides(n) {
  showSlided((slideIndex = n));
}

function showSlided(n) {
  var i;
  var slides = document.getElementsByClassName("myNewSlide");
  var dots = document.getElementsByClassName("myNewDemo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

// Open the Modal
function semiopenModal() {
  document.getElementById("semiMyModal").style.display = "block";
}

// Close the Modal
function semicloseModal() {
  document.getElementById("semiMyModal").style.display = "none";
}

var slideIndex = 1;
showSlider(slideIndex);

// Next/previous controls
function plusSlider(n) {
  showSlider((slideIndex += n));
}

// Thumbnail image controls
function currentSlider(n) {
  showSlider((slideIndex = n));
}

function showSlider(n) {
  var i;
  var slides = document.getElementsByClassName("semiMySlide");
  var dots = document.getElementsByClassName("semiMyDemo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}


// Open the Modal
function openModal1() {
  document.getElementById("2-Modal").style.display = "block";
}

// Close the Modal
function closeModal1() {
  document.getElementById("2-Modal").style.display = "none";
}

var slideIndex = 1;
showSlide1(slideIndex);

// Next/previous controls
function plusSlide1(n) {
  showSlide1((slideIndex += n));
}

// Thumbnail image controls
function currentSlide1(n) {
  showSlide1((slideIndex = n));
}

function showSlide1(n) {
  var i;
  var slides = document.getElementsByClassName("1-Slide");
  var dots = document.getElementsByClassName("semiMyDemo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}


// Open the Modal
function openModal2() {
  document.getElementById("3-Modal").style.display = "block";
}

// Close the Modal
function closeModal2() {
  document.getElementById("3-Modal").style.display = "none";
}

var slideIndex = 1;
showSlide2(slideIndex);

// Next/previous controls
function plusSlide2(n) {
  showSlide2((slideIndex += n));
}

// Thumbnail image controls
function currentSlide2(n) {
  showSlide2((slideIndex = n));
}

function showSlide2(n) {
  var i;
  var slides = document.getElementsByClassName("2-Slide");
  var dots = document.getElementsByClassName("semiMyDemo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}


// Open the Modal
function openModal3() {
  document.getElementById("4-Modal").style.display = "block";
}

// Close the Modal
function closeModal3() {
  document.getElementById("4-Modal").style.display = "none";
}

var slideIndex = 1;
showSlide3(slideIndex);

// Next/previous controls
function plusSlide3(n) {
  showSlide3((slideIndex += n));
}

// Thumbnail image controls
function currentSlide3(n) {
  showSlide3((slideIndex = n));
}

function showSlide3(n) {
  var i;
  var slides = document.getElementsByClassName("3-Slide");
  var dots = document.getElementsByClassName("semiMyDemo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}



/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function hideNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// const headerBg = () => {
//   const header = document.querySelector(".js-header");

//   window.addEventListener("scroll", function () {
//     if (this.scrollY > 0) {
//       header.classList.add("bg-reveal");
//     } else {
//       header.classList.remove("bg-reveal");
//     }
//   })
// }
// headerBg();

// const reveal = () => {
//   const button = document.querySelector("#movetop");

//   window.addEventListener("scroll", function () {
//     if (this.scrollY > 200) {
//       document.querySelector("#movetop").style.display = "block"
//     } else {
//       document.querySelector("#movetop").style.display = "none"
//     }
//   })
// }
// reveal();


/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}