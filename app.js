const rellax = new Rellax('.rellax', {
    breakpoints: [576, 768, 1201]
});

let lastScrollY = 0;
let currentPage = 0;
const pages = ['.container', '.space', '.dragon'];
let allowScrolling = true;
window.addEventListener('keydown', (e) => {
	if (!allowScrolling) {
		return;
	}
	if (e.key === 'ArrowUp') {
		currentPage--;
	} else if (e.key === 'ArrowDown') {
		currentPage++;
	} else {
		return;
	}

	if (currentPage < 0) {
		currentPage = 0;
	} 
	if (currentPage > pages.length - 1) {
		currentPage = pages.length - 1;
	}

	allowScrolling = false;
	const page = document.querySelector(pages[currentPage]);
	smoothScrollingTo(page);
	setTimeout(() => {allowScrolling = true;}, 1000);
});

window.addEventListener('wheel', (e) => {
	if (!allowScrolling) {
		return;
	}
	if (e.deltaY < 0) {
		currentPage--;
	} else if (e.deltaY > 0) {
		currentPage++;
	} else {
		return;
	}

	if (currentPage < 0) {
		currentPage = 0;
	} 
	if (currentPage > pages.length - 1) {
		currentPage = pages.length - 1;
	}

	allowScrolling = false;
	const page = document.querySelector(pages[currentPage]);
	smoothScrollingTo(page);
	setTimeout(() => {allowScrolling = true;}, 1000);
});


// Cлайды
let currentSlide = 0;
function nextSlide() {
    let nextSlideNum = currentSlide + 1;
    let circle = document.querySelector('.line-circle-container');
    let line = document.querySelector('.line');
    
    if (currentSlide + 1 > 2) {
        nextSlideNum = 0;
    }
    switchSlide(nextSlideNum);


    if( currentSlide === 0){
        currentCircleTop = 0;
        currentLineTop = -30;
    } else if ( currentSlide === 1) {
        currentCircleTop = currentCircleTop + 45;
        currentLineTop = currentLineTop + 45;
    }
    else {
        currentCircleTop = currentCircleTop + 45;
        currentLineTop = currentLineTop + 45;
    }
    circle.style.top = currentCircleTop + "%";
    line.style.top = currentLineTop + "%";
}

function previousSlide() {
    let circle = document.querySelector('.line-circle-container');
    let line = document.querySelector('.line');
    let nextSlideNum = currentSlide - 1;
    if (currentSlide - 1 < 0) {
        nextSlideNum = 2;
    }
    switchSlide(nextSlideNum);

    if( currentSlide === 0){
        currentCircleTop = 0;
        currentLineTop = -30;
    } else if ( currentSlide === 1) {
        currentCircleTop = currentCircleTop - 45;
        currentLineTop = currentLineTop - 45;
    }
    else {
        currentCircleTop = currentCircleTop - 45;
        currentLineTop = currentLineTop - 45;
    }
    circle.style.top = currentCircleTop + "%";
    line.style.top = currentLineTop + "%";
}

// сменить слайд
function switchSlide(slideNumber) {
    currentSlide = slideNumber;

    // получить все слайды
    let slides = document.getElementsByClassName('slide');

    // у всех слайдов убрать класс 'displayed' 
    // используя цикл!
    for (let i=0 ; i < slides.length; i++){
        slides[i].classList.remove('displayed');
    }

    slides[currentSlide].classList.add('displayed');
}


let line = document.querySelector('.line-container');
let currentCircleTop = 0;
let currentLineTop = -30;
function lineOnClick(event) {
    let circle = document.querySelector('.line-circle-container');
    let circleRect = circle.getBoundingClientRect();
    let circleY = circleRect.top;
    let clickY = event.clientY;

    if (clickY > circleY){
        nextSlide();
    } else {
        previousSlide();
    }
    
}
line.onclick = lineOnClick;


setInterval(nextSlide, 5000);

    
function smoothScrollingTo(target){ 
	$('html,body').animate({scrollTop: $(target).offset().top}, 1000);
}
