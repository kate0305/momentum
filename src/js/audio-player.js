import playList from './playList.js';

export default () => {
  const playBtn = document.querySelector('.play');
  const prevBtn = document.querySelector('.play-prev');
  const nextBtn = document.querySelector('.play-next');
  const playListWrapper = document.querySelector('.play-list__wrapper');
  const trackName = document.querySelector('.track-name');
  const progress = document.querySelector('.duration');
  const volume = document.querySelector('.volume-range');
  const volumeBtn = document.querySelector('.volume');
  const trackCurrentTime = document.querySelector('.track-current-time');
  const trackDuration = document.querySelector('.track-duration');

  playList.forEach(i => {
    const playListItem = document.createElement('li');
    const playListBtn = document.createElement('button');
    playListItem.classList.add('play-list__wrapper_item');
    playListBtn.classList.add('play-list__wrapper_button');
    playListItem.textContent = i.title;
    playListWrapper.append(playListItem);
    playListBtn.addEventListener('click', playAudio);
    playListItem.prepend(playListBtn);
  });

  const playListItems = document.querySelectorAll('.play-list__wrapper_item');
  const playListButtons = document.querySelectorAll('.play-list__wrapper_button');

  const audio = new Audio();
  let isPlay = false;
  let playNum = 0;
  let currentTime = 0;
  let mousedown = false;
  let audioDuration;


  const playAudio = () => {
    if (!isPlay) {
      audio.src = playList[playNum].src;
      audioDuration = +(playList[playNum].duration);
      !currentTime ? currentTime : audio.currentTime = currentTime;
      audio.play();
      updateProgressValue();
      isPlay = true;
      playListItems[playNum].classList.add('active-button');
      playBtn.classList.add('pause');
      playListButtons[playNum].classList.add('pause');
    } else {
      audio.pause();
      currentTime = audio.currentTime;
      isPlay = false;
      playBtn.classList.remove('pause');
      playListButtons[playNum].classList.remove('pause');
    }
  }

  const playNext = () => {
    playListItems[playNum].classList.remove('active-button');
    playListButtons[playNum].classList.remove('pause');
    playNum++;
    playNum === 4 ? playNum = 0 : playNum;
    isPlay = false;
    currentTime = 0;
    playAudio();
  }

  const playPrev = () => {
    playListItems[playNum].classList.remove('active-button');
    playListButtons[playNum].classList.remove('pause');
    playNum--;
    playNum === -1 ? playNum = 3 : playNum;
    isPlay = false;
    currentTime = 0;
    playAudio();
  }

  const updateProgressValue = () => {
    progress.max = audioDuration;
    progress.value = audio.currentTime;
    trackName.textContent = playList[playNum].title;
    trackCurrentTime.textContent = formatTime(Math.floor(audio.currentTime));
    trackDuration.textContent = formatTime(Math.floor(playList[playNum].duration));
    progress.style.background = `linear-gradient(to right, #989595 0%, #989595 ${(progress.value - progress.min) / (progress.max - progress.min)*100}%, #dee2e6 ${(progress.value - progress.min) / (progress.max - progress.min)*100}%, #dee2e6 100%)`;
    setTimeout(updateProgressValue, 1000);
  }

  const rewindTrack = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audioDuration;
    audio.currentTime = scrubTime;
  }

  const muteVolume = () => {
    if(audio.muted){
      audio.muted = false;
      volumeBtn.classList.remove('mute');;
    } else {
      audio.muted = true;
      volumeBtn.classList.add('mute');
    }
  }

  const setVolume = () => {
    audio.volume = volume.value / 100;
    volume.style.background = `linear-gradient(to right, #989595 0%, #989595 ${(volume.value - volume.min) / (volume.max - volume.min)*100}%, #dee2e6 ${(volume.value - volume.min) / (volume.max - volume.min)*100}%, #dee2e6 100%)`;
  }

  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    sec < 10 ? sec = `0${sec}` : sec;
    return `${min}:${sec}`;
};

  playBtn.addEventListener('click', playAudio);
  prevBtn.addEventListener('click', playPrev);
  nextBtn.addEventListener('click', playNext);
  audio.addEventListener('ended', playNext);
  progress.addEventListener('input', updateProgressValue);
  progress.addEventListener("click", rewindTrack);
	progress.addEventListener('mousemove', (e) => mousedown && rewindTrack(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
  volumeBtn.addEventListener('click', muteVolume);
  volume.addEventListener('mousemove', setVolume);
}
