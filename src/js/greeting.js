const greeting = document.querySelector('.greeting__type');
const name = document.querySelector('.greeting__name');


const getTimeOfDay = () => {
  const hours = new Date().getHours();

  if (hours < 6) {
    return 'night'
  }
  else if (hours < 12) {
    return 'morning'
  }
  else if (hours < 18) {
    return 'afternoon'
  } else {
    return 'evening'
  }
}

const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay},`
  setTimeout(showGreeting, 1000)
}

const setName = () => {
  localStorage.setItem('name', name.value);
}

const getName = () => {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  } else {
    name.placeholder = '[Enter name]';
  }
}

const focusGreetingName = () => {
  if (name.value) {
    name.value = '';
  } else {
    name.placeholder = '';
  }
}

const blurGreetingName = () => {
  if (!name.value) {
    name.placeholder = '[Enter name]';
  }
}

const enterGreetingName = (e) => {
  if (e.code === 'Enter') {
    name.blur();
  }
}

name.addEventListener('focus', focusGreetingName);
name.addEventListener('blur', blurGreetingName);
name.addEventListener('keypress', enterGreetingName);
window.addEventListener('beforeunload', setName);
window.addEventListener('load', getName);

export {getTimeOfDay, showGreeting};
