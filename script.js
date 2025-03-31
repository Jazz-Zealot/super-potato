import sentences from "./data.js";

let currentIndex = -1;
let score = parseInt(localStorage.getItem("score")) || 0;
let total = parseInt(localStorage.getItem("total")) || 0;
let countdown = null;
let timeLeft = 30;
const purchased = JSON.parse(localStorage.getItem("purchased")) || [];

const app = document.getElementById("app");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const resetBtn = document.getElementById("resetBtn");
const shopBtn = document.getElementById("shopBtn");
const closeShopBtn = document.getElementById("closeShopBtn");
const shop = document.getElementById("shop");
const shopItemsDiv = document.getElementById("shopItems");
const petCorner = document.getElementById("petCorner");

const shopItems = [
  { id: "autoplay", name: "🎧 自动播放", price: 5, effect: () => {} },
  { id: "pet-dog", name: "🐶 小狗角标", price: 3, effect: () => showPet("dog") },
  { id: "pet-cat", name: "🐱 小猫角标", price: 3, effect: () => showPet("cat") },
  { id: "bg-blue", name: "🎨 蓝色背景", price: 2, effect: () => document.body.style.background = "#e0f7fa" }
];

function showPet(name) {
  petCorner.innerHTML = `<img src="images/${name}.png" class="pet-icon">`;
}

function updateScoreboard() {
  scoreboard.textContent = `Score: ${score} / ${total}`;
  localStorage.setItem("score", score);
  localStorage.setItem("total", total);
  localStorage.setItem("purchased", JSON.stringify(purchased));
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
  audio.id = "audioPlayer";
  block.appendChild(audio);

  const image = document.createElement("img");
  image.src = s.image;
  image.alt = "scene image";
  image.style.display = "block";
  image.style.margin = "1rem auto";
  image.style.maxWidth = "300px";
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

  if (purchased.includes("autoplay")) audio.play();
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
  localStorage.clear();
  updateScoreboard();
}

function renderShop() {
  shopItemsDiv.innerHTML = "";
  shopItems.forEach(item => {
    const owned = purchased.includes(item.id);
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${item.name} (${item.price}分)</span>
      <button ${owned ? "disabled" : ""}>${owned ? "已购买" : "购买"}</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      if (score >= item.price && !owned) {
        score -= item.price;
        purchased.push(item.id);
        item.effect();
        updateScoreboard();
        renderShop();
      }
    });
    shopItemsDiv.appendChild(div);
    if (owned) item.effect();
  });
}

shopBtn.addEventListener("click", () => {
  shop.classList.toggle("hidden");
});
closeShopBtn.addEventListener("click", () => {
  shop.classList.add("hidden");
});
nextBtn.addEventListener("click", nextSentence);
showAnswerBtn.addEventListener("click", () => showAnswer(false));
resetBtn.addEventListener("click", resetScore);

updateScoreboard();
renderShop();
nextSentence();
