import sentences from "./data.js";

let currentIndex = -1;
let score = parseInt(localStorage.getItem("score")) || 0;
let total = parseInt(localStorage.getItem("total")) || 0;
let countdown = null;
let timeLeft = 30;

const app = document.getElementById("app");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const resetBtn = document.getElementById("resetBtn");

function updateScoreboard() {
  scoreboard.textContent = `Score: ${score} / ${total}`;
  localStorage.setItem("score", score);
  localStorage.setItem("total", total);
}

function updateTimer() {
  timerDisplay.textContent = `⏳ Time left: ${timeLeft}`;
}

function startTimer() {
  clearInterval(countdown);
  timeLeft = 30;
  updateTimer();
  countdown = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(countdown);
      showAnswer(true); // 自动触发显示答案，不加分
    }
  }, 1000);
}

function renderSentence(index) {
  const s = sentences[index];
  app.innerHTML = "";

  const block = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = `Sentence ${s.id}`;
  block.appendChild(title);

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = s.audio;
  block.appendChild(audio);

  const image = document.createElement("img");
  image.src = s.image;
  image.alt = "scene image";
  image.style.maxWidth = "300px";
  image.style.display = "block";
  image.style.marginTop = "1rem";
  block.appendChild(image);

  const parts = document.createElement("ul");
  s.parts.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    parts.appendChild(li);
  });
  block.appendChild(parts);

  const full = document.createElement("blockquote");
  full.textContent = "(Answer hidden)";
  full.id = "fullSentence";
  full.style.fontStyle = "italic";
  block.appendChild(full);

  app.appendChild(block);
}

function nextSentence() {
  const newIndex = Math.floor(Math.random() * sentences.length);
  currentIndex = newIndex;
  total++;
  renderSentence(currentIndex);
  updateScoreboard();
  startTimer();
}

function showAnswer(auto = false) {
  const full = document.getElementById("fullSentence");
  if (full && currentIndex >= 0) {
    full.textContent = sentences[currentIndex].sentence;
    if (!auto) score++;
    clearInterval(countdown);
    updateScoreboard();
  }
}

function resetScore() {
  score = 0;
  total = 0;
  localStorage.removeItem("score");
  localStorage.removeItem("total");
  updateScoreboard();
}

nextBtn.addEventListener("click", nextSentence);
showAnswerBtn.addEventListener("click", () => showAnswer(false));
resetBtn.addEventListener("click", resetScore);

// 初始化
updateScoreboard();
nextSentence();
