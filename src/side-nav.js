const homeIcon = document.querySelector('.nav__icon-home');
const homeSrc = homeIcon.getAttribute('src')
const movieIcon = document.querySelector('.nav__icon-movie');
const movieSrc = movieIcon.getAttribute('src')
const seriesIcon = document.querySelector('.nav__icon-series');
const seriesSrc = seriesIcon.getAttribute('src')
const bookmarkIcon = document.querySelector('.nav__icon-bookmark')
const bookmarkSrc = bookmarkIcon.getAttribute('src')

let currentIcon = null;

function activateNavIcon(event){
event.preventDefault();

homeIcon.src = homeSrc;
movieIcon.src = movieSrc;
seriesIcon.src = seriesSrc;
bookmarkIcon.src = bookmarkSrc;

const clickedIcon = event.target;
const altSrc = clickedIcon.getAttribute('data-alt');

clickedIcon.src = altSrc;

}

homeIcon.addEventListener('click', activateNavIcon);
movieIcon.addEventListener('click', activateNavIcon);
seriesIcon.addEventListener('click', activateNavIcon);
bookmarkIcon.addEventListener('click', activateNavIcon);
