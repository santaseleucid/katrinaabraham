let slideIndex1 = 1;
let slideIndex2 = 1;
let slideIndex3 = 1;

showSlides1(slideIndex1);
showSlides2(slideIndex2);
showSlides3(slideIndex3);
// Next/previous controls
function plusSlides(n, galleryNum) {
    console.log("plusSlides", n);
    if (galleryNum === 1) {
        showSlides1(slideIndex1 += n);
    } else if (galleryNum === 2) {
        showSlides2(slideIndex2 += n);
    } else if (galleryNum === 3) {
        showSlides3(slideIndex3 += n);
    }
    //showSlides(slideIndex += n, galleryNum);
}

// Thumbnail image controls
function currentSlide(n, galleryNum) {
    console.log("currentSlide", n);
    if (galleryNum === 1) {
        showSlides1(slideIndex1 = n);
    } else if (galleryNum === 2) {
        showSlides2(slideIndex2 = n);
    } else if (galleryNum === 3) {
        showSlides3(slideIndex3 = n);
    }
    //showSlides(slideIndex = n, galleryNum);
}


function showSlides1(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides1");
    console.log("showSlides1", n, slides.length);
    let dots = document.getElementsByClassName("dot1");
    if (n > slides.length) { slideIndex1 = 1 }
    if (n < 1) { slideIndex1 = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex1 - 1].style.display = "block";
    dots[slideIndex1 - 1].className += " active";
}

function showSlides2(n) {
    console.log("showSlides2", n);
    let i;
    let slides = document.getElementsByClassName("mySlides2");
    let dots = document.getElementsByClassName("dot2");
    if (n > slides.length) { slideIndex2 = 1 }
    if (n < 1) { slideIndex2 = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex2 - 1].style.display = "block";
    dots[slideIndex2 - 1].className += " active";
}

function showSlides3(n) {
    console.log("showSlides3", n);
    let i;
    let slides = document.getElementsByClassName("mySlides3");
    let dots = document.getElementsByClassName("dot3");
    if (n > slides.length) { slideIndex3 = 1 }
    if (n < 1) { slideIndex3 = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex3 - 1].style.display = "block";
    dots[slideIndex3 - 1].className += " active";
}