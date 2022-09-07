import {getTimeOfDay} from './greeting';
import getRandomNum from './random';

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let randomNum = getRandomNum(1, 20);

const setBackground = () => {
  let timeOfDay = getTimeOfDay();
  let bgNum = String(randomNum).padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/kate0305/stage1-tasks/assets/images/${timeOfDay}/compressed/${bgNum}.webp`
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
}

const getSlideNext = () => {
  randomNum++;
  randomNum === 21 ? randomNum = 1 : randomNum;
  setBackground();
}

function getSlidePrev() {
  randomNum--;
  randomNum === 0 ? randomNum = 20 : randomNum;
  setBackground();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

export default setBackground;
