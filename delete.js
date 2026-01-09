const wordsWrap = document.getElementById('words-wrap');
const phrasesWrap = document.getElementById('phrases-wrap');

const words = JSON.parse(localStorage.getItem('words')) || [];
const phrases = JSON.parse(localStorage.getItem('phrases')) || [];

const saveWord = () => localStorage.setItem('words', JSON.stringify(words));
const savePhrase = () => localStorage.setItem('phrases', JSON.stringify(phrases));

const renderWords = () => {

  wordsWrap.innerHTML = words.map((w, i) =>
    `
<tr>
<td>${w.eng}</td>
<td>${w.ukr}</td>
<td><button onclick="delWord(${i})">🗑</button></td>
</tr>`)
    .join('');
};

const renderPhrases = () => {

  phrasesWrap.innerHTML = phrases.map((p, i) =>
    `
<tr>
<td>${p.eng}</td>
<td>${p.mean}</td>
<td>${p.ukr}</td>
<td><button onclick="delPhrase(${i})">🗑</button></td>
</tr>`)
    .join('');
};

window.delWord = i => {
  words.splice(i, 1);
  saveWord();
  renderWords();
};

window.delPhrase = i => {
  phrases.splice(i, 1);
  savePhrase();
  renderPhrases();
};

renderWords();
renderPhrases();
