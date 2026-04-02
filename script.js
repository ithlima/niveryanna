const startBtn = document.getElementById('startBtn');
const quizSection = document.getElementById('quizSection');
const celebrationSection = document.getElementById('celebrationSection');
const messagesSection = document.getElementById('messagesSection');
const finalSurprise = document.getElementById('finalSurprise');
const loveNote = document.getElementById('loveNote');
const feedbackBox = document.getElementById('feedbackBox');
const choiceButtons = document.querySelectorAll('.choice-btn');
const revealVideoBtn = document.getElementById('revealVideoBtn');
const scrollLoveBtn = document.getElementById('scrollLoveBtn');
const birthdayVideo = document.getElementById('birthdayVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const typedMessage = document.getElementById('typedMessage');
const messageCards = document.querySelectorAll('.reveal-card');
const floatingHearts = document.querySelector('.floating-hearts');
const sparkles = document.querySelector('.sparkles');

let surpriseUnlocked = false;
let typingStarted = false;

startBtn.addEventListener('click', () => {
  quizSection.classList.remove('hidden');
  quizSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isCorrect = button.dataset.correct === 'true';

    if (isCorrect) {
      if (surpriseUnlocked) return;
      surpriseUnlocked = true;
      button.classList.add('right');
      feedbackBox.textContent = 'AAAAA CÃO QUE ACERTA! Agora vai começar a parte mais bonita ✨';
      launchConfetti(26);
      unlockSurprise();
      return;
    }

    button.classList.remove('wrong');
    void button.offsetWidth;
    button.classList.add('wrong');
    feedbackBox.textContent = 'Essa passou longe 😌 tenta de novo, tu tá quase lá.';
  });
});

function unlockSurprise() {
  setTimeout(() => {
    celebrationSection.classList.remove('hidden');
    messagesSection.classList.remove('hidden');
    finalSurprise.classList.remove('hidden');
    loveNote.classList.remove('hidden');

    celebrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    revealCardsInSequence();
    startAmbientEffects();
  }, 650);
}

function revealCardsInSequence() {
  messageCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 220 * index);
  });
}

revealVideoBtn.addEventListener('click', () => {
  finalSurprise.scrollIntoView({ behavior: 'smooth', block: 'center' });

  birthdayVideo.style.display = 'block';

  const hasReadySource = birthdayVideo.querySelector('source')?.getAttribute('src');
  if (hasReadySource) {
    birthdayVideo.load();
  }

  birthdayVideo.addEventListener('loadeddata', handleVideoLoaded, { once: true });
  birthdayVideo.addEventListener('error', handleVideoMissing, { once: true });

  setTimeout(() => {
    if (birthdayVideo.readyState >= 2) {
      handleVideoLoaded();
    }
  }, 600);
});

scrollLoveBtn.addEventListener('click', () => {
  loveNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
  startTyping();
  launchConfetti(18);
});

const typingText = 'Você merece um aniversário tão lindo quanto o seu coração.';

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  let index = 0;

  const writer = setInterval(() => {
    typedMessage.textContent += typingText[index];
    index += 1;

    if (index >= typingText.length) {
      clearInterval(writer);
    }
  }, 45);
}

function handleVideoLoaded() {
  videoPlaceholder.style.display = 'none';
  birthdayVideo.style.display = 'block';
  birthdayVideo.play().catch(() => {});
}

function handleVideoMissing() {
  birthdayVideo.style.display = 'none';
  videoPlaceholder.style.display = 'grid';
  videoPlaceholder.innerHTML = `
    <div class="video-icon">❤</div>
    <p>O espaço do vídeo já está pronto. Agora é só colocar <strong>parabens.mp4</strong> na pasta do projeto.</p>
    <small>Quando o arquivo existir, essa área vai tocar o vídeo automaticamente.</small>
  `;
}

function launchConfetti(amount = 16) {
  const symbols = ['💙', '✨', '🎉', '🎂', '💕'];

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'floating-heart';
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.bottom = '-30px';
    piece.style.animationDuration = `${4 + Math.random() * 3}s`;
    piece.style.fontSize = `${14 + Math.random() * 20}px`;
    piece.style.opacity = '0';
    floatingHearts.appendChild(piece);

    setTimeout(() => piece.remove(), 7000);
  }
}

function startAmbientEffects() {
  setInterval(createFloatingHeart, 900);
  setInterval(createSparkle, 700);
  startTyping();
}

function createFloatingHeart() {
  const icons = ['💙', '🤍', '✨', '💖'];
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = icons[Math.floor(Math.random() * icons.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.bottom = '-30px';
  heart.style.animationDuration = `${5 + Math.random() * 4}s`;
  heart.style.fontSize = `${12 + Math.random() * 16}px`;
  floatingHearts.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}

function createSparkle() {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${15 + Math.random() * 85}%`;
  sparkle.style.animationDuration = `${1.8 + Math.random() * 1.7}s`;
  sparkles.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 3200);
}
