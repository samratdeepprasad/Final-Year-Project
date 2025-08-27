let current = 0;
let correct = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const scoreSection = document.getElementById('score');
const scoreValue = document.getElementById('score-value');
const restartBtn = document.getElementById('restart');

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = '';
  q.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(idx));
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
  nextBtn.disabled = true;
  updateProgress();
}

function selectAnswer(selected) {
  const q = questions[current];
  const buttons = choicesEl.querySelectorAll('button');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add('correct');
    if (idx === selected && idx !== q.answer) btn.classList.add('incorrect');
  });
  if (selected === q.answer) {
    correct++;
  }
  nextBtn.disabled = false;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function updateProgress() {
  const progress = ((current) / questions.length) * 100;
  progressBar.style.width = progress + '%';
}

function showScore() {
  const percent = Math.round((correct / questions.length) * 100);
  scoreValue.textContent = percent;
  scoreSection.classList.remove('hidden');
  document.getElementById('lesson').classList.add('hidden');
}

function restart() {
  current = 0;
  correct = 0;
  scoreSection.classList.add('hidden');
  document.getElementById('lesson').classList.remove('hidden');
  loadQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restart);

loadQuestion();
