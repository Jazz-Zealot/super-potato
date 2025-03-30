
const sentences = [
  {
    "id": 1,
    "sentence": "After six months of arguing and final 16 hours of hot parliamentary debates, Australia’s Northern Territory became the first legal authority in the world to allow doctors to take the lives of incurably ill patients who wish to die.",
    "parts": [
      "After six months of arguing,",
      "and final 16 hours of hot parliamentary debates,",
      "Australia’s Northern Territory became the first legal authority in the world,",
      "to allow doctors to take the lives of incurably ill patients who wish to die."
    ],
    "audio": "audio/D1.mp3",
    "image": "images/sentence1.png"
  },
  {
    "id": 2,
    "sentence": "The casual friendliness of many Americans should be interpreted neither as superficial nor as artificial, but as the result of a historically developed cultural tradition.",
    "parts": [
      "The casual friendliness of many Americans",
      "should be interpreted neither as superficial,",
      "nor as artificial,",
      "but as the result of a historically developed cultural tradition."
    ],
    "audio": "audio/D2.mp3",
    "image": "images/sentence2.png"
  }
];

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
      showAnswer(true);
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
  parts.id = "partsList";
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
  const s = sentences[currentIndex];
  const full = document.getElementById("fullSentence");
  const partsList = document.getElementById("partsList");

  if (full && currentIndex >= 0) {
    full.textContent = s.sentence;
    s.parts.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p;
      partsList.appendChild(li);
    });
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

// 商城控制逻辑
const shopBtn = document.getElementById("shopBtn");
const closeShopBtn = document.getElementById("closeShopBtn");
const shop = document.getElementById("shop");

shopBtn.addEventListener("click", () => {
  shop.classList.toggle("hidden");
});
closeShopBtn.addEventListener("click", () => {
  shop.classList.add("hidden");
});

updateScoreboard();
nextSentence();
