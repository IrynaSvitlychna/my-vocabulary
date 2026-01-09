const cardsWrap = document.getElementById('cards-wrap');
const wordCardsBtn = document.getElementById('word-cards');
const phraseCardsBtn = document.getElementById('phrase-cards');

const words = JSON.parse(localStorage.getItem('words')) || [];
let phrases = JSON.parse(localStorage.getItem('phrases')) || [];

const renderCards = type => {
  cardsWrap.hidden = false;

  if (type === 'words') {
    shuffle(words);

    cardsWrap.innerHTML = words.map(w => `
      <div class="card" onclick="this.classList.toggle('flip')">
        <div class="front">${w.eng}</div>
        <div class="back">${w.ukr}</div>
      </div>
    `).join('');
  }

  if (type === 'phrases') {
    shuffle(phrases);

    cardsWrap.innerHTML = phrases.map((p, i) => `
      <div class="card" onclick="toggleFlip(this)">
      
          <div class="front" >
          <div class="text">${p.eng}</div>
          
          <button class="show-mean-btn">Meaning</button>
          <div class="mean-text">${p.mean || ''}</div>
          </div>
          <div class="back">
          ${p.ukr}
          </div>
      
      </div>
    `).join('');



    const buttons = cardsWrap.querySelectorAll('.show-mean-btn');
    buttons.forEach(btn => {
      btn.onclick = e => {
        e.stopPropagation();

        const card = btn.closest('.card');
        card.classList.add('show-mean');
      };
    });
  }
};

wordCardsBtn.onclick = () => renderCards('words');
phraseCardsBtn.onclick = () => renderCards('phrases');


function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function toggleFlip(card) {
  card.classList.toggle('flip');

  // якщо повертаємось на front — скидаємо meaning
  if (!card.classList.contains('flip')) {
    card.classList.remove('show-mean');
  }
}




