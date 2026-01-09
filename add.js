const wordBtn = document.getElementById('btn-word');
const phraseBtn = document.getElementById('btn-phrase');
const formWord = document.getElementById('form-word');
const formPhrase = document.getElementById('form-phrase');
const list = document.getElementById('list');

wordBtn.onclick = () => {
  formPhrase.classList.add('hidden');
  formWord.classList.toggle('hidden');
  renderWords();
};

phraseBtn.onclick = () => {
  formWord.classList.add('hidden');
  formPhrase.classList.toggle('hidden');
  renderPhrases();
};


let words = JSON.parse(localStorage.getItem('words')) || [];
let phrases = JSON.parse(localStorage.getItem('phrases')) || [];


const saveWord = () => localStorage.setItem('words', JSON.stringify(words));
const savePhrase = () => localStorage.setItem('phrases', JSON.stringify(phrases));

const renderWords = () => {
  list.innerHTML = '';
  words.forEach((w, i) => {
    list.innerHTML += `
<tr>
  <td>${w.eng}</td>
  <td>${w.ukr}</td>
  <td>
    <button onclick="editWord(${i})">✏️</button>
    <button onclick="delWord(${i})">🗑</button>
  </td>
</tr>`;
  });
};

const renderPhrases = () => {
  list.innerHTML = '';
  phrases.forEach((p, i) => {
    list.innerHTML += `
  <tr>
    <td>${p.eng}</td>
    <td>${p.mean}</td>
    <td>${p.ukr}</td>
    <td>
    <button onclick="editPhrase(${i})">✏️</button>
    <button onclick="delPhrase(${i})">🗑</button>
    </td>
  </tr>`;
  });
};


formPhrase.onsubmit = e => {
  e.preventDefault();
  phrases.push({
    eng: formPhrase.eng.value,
    mean: formPhrase.mean.value,
    ukr: formPhrase.ukr.value
  });
  formPhrase.reset();
  savePhrase();
  renderPhrases();
};

formWord.onsubmit = e => {
  e.preventDefault();
  words.push({
    eng: formWord.eng.value,
    ukr: formWord.ukr.value
  });
  formWord.reset();
  saveWord();
  renderWords();
};




window.delWord = i => {
  words.splice(i, 1);
  saveWord();
  renderWords();
};


window.editWord = i => {
  const eng = prompt('English', words[i].eng);
  const ukr = prompt('Ukrainian', words[i].ukr);
  if (eng && ukr) words[i] = { eng, ukr };
  saveWord();
  renderWords();
};

window.delPhrase = i => {
  phrases.splice(i, 1);
  savePhrase();
  renderPhrases();
};


window.editPhrase = i => {
  const eng = prompt('English', phrases[i].eng);
  const ukr = prompt('Ukrainian', phrases[i].ukr);
  const mean = prompt('Mean', phrases[i].mean);
  if (eng && mean && ukr) phrases[i] = { eng, mean, ukr };
  savePhrase();
  renderPhrases();
};



