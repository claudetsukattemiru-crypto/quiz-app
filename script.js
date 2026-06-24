const QUESTIONS = [
  {
    question: "1週間は何日ですか?",
    choices: ["5日", "6日", "7日", "8日"],
    answer: 2,
  },
  {
    question: "信号機で「進んでもよい」を示す色は何色ですか?",
    choices: ["赤色", "黄色", "青色(緑色)", "白色"],
    answer: 2,
  },
  {
    question: "日本の通貨の単位は何ですか?",
    choices: ["ウォン", "円", "ドル", "ユーロ"],
    answer: 1,
  },
  {
    question: "1年で気温が最も高くなることが多い月はどれですか?(日本)",
    choices: ["5月", "8月", "10月", "12月"],
    answer: 1,
  },
  {
    question: "「お疲れ様です」を使う場面として最も適切なものはどれですか?",
    choices: ["初めて会う人への挨拶", "仕事を終えた同僚への声かけ", "食事の前の挨拶", "電話を切るときの挨拶"],
    answer: 1,
  },
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

const questionCountEl = document.getElementById("question-count");
const progressTextEl = document.getElementById("progress-text");
const progressFillEl = document.getElementById("progress-fill");
const questionTextEl = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const scoreTextEl = document.getElementById("score-text");

let currentIndex = 0;
let score = 0;
let answered = false;

questionCountEl.textContent = QUESTIONS.length;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  nextBtn.classList.add("hidden");
  feedbackEl.classList.add("hidden");
  feedbackEl.classList.remove("correct", "incorrect");

  const total = QUESTIONS.length;
  const q = QUESTIONS[currentIndex];

  progressTextEl.textContent = `第${currentIndex + 1}問 / 全${total}問`;
  progressFillEl.style.width = `${(currentIndex / total) * 100}%`;
  questionTextEl.textContent = q.question;

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectChoice(index, btn));
    choicesEl.appendChild(btn);
  });
}

function selectChoice(selectedIndex, selectedBtn) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === q.answer) {
    score++;
    selectedBtn.classList.add("correct");
    feedbackEl.textContent = "正解です!";
    feedbackEl.classList.add("correct");
  } else {
    selectedBtn.classList.add("incorrect");
    buttons[q.answer].classList.add("correct");
    feedbackEl.textContent = `不正解です。正解は「${q.choices[q.answer]}」です。`;
    feedbackEl.classList.add("incorrect");
  }
  feedbackEl.classList.remove("hidden");

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressFillEl.style.width = "100%";
  scoreTextEl.textContent = `${QUESTIONS.length}問中 ${score}問正解!`;
  showScreen(resultScreen);
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
retryBtn.addEventListener("click", startQuiz);
