import sentences from "./data.js";

let currentIndex = -1;
let score = 0;
let total = 0;

const app = document.getElementById("app");
const scoreboard = document.getElementById("scoreboard");
const nextBtn = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");

function updateScoreboard() {
  scoreboard.textContent = `Score: ${score} / ${total}`;
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
}

function showAnswer() {
  const full = document.getElementById("fullSentence");
  if (full && currentIndex >= 0) {
    full.textContent = sentences[currentIndex].sentence;
    score++;
    updateScoreboard();
  }
}

nextBtn.addEventListener("click", nextSentence);
showAnswerBtn.addEventListener("click", showAnswer);

// 初始加载一句
nextSentence();
