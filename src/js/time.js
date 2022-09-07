const time = document.querySelector('.time');
const date = document.querySelector('.date');

const showTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}

const showDate = () => {
  const optionsDate = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDate = new Date().toLocaleDateString('en-US', optionsDate)
  date.textContent = currentDate;
}

export default showTime;
