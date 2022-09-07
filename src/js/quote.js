import getRandomNum from './random';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = '../assets/json/data.json';
  const res = await fetch(quotes);
  const data = await res.json();

  let dataRandom = getRandomNum(1, 102);
  quote.textContent = data[`${dataRandom}`].text;
  author.textContent = data[`${dataRandom}`].author;
}

changeQuote.addEventListener('click', getQuotes);
export default getQuotes;