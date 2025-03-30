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
  },
  {
    "id": 3,
    "sentence": "For example, when an American uses the word ‘friend’, the cultural implications of the word may be quite different from those it has in the visitor’s language and culture.",
    "parts": [
      "For example,",
      "when an American uses the word ‘friend’,",
      "the cultural implications of the word may be quite different",
      "from those it has in the visitor’s language and culture."
    ],
    "audio": "audio/D3.mp3",
    "image": "images/sentence3.png"
  },
  {
    "id": 4,
    "sentence": "Learning to recognize the structure of a sentence can make it easier to understand its meaning, especially when reading complex academic texts.",
    "parts": [
      "Learning to recognize the structure of a sentence",
      "can make it easier to understand its meaning,",
      "especially when reading complex academic texts."
    ],
    "audio": "audio/D4.mp3",
    "image": "images/sentence4.png"
  },
  {
    "id": 5,
    "sentence": "Although the new regulations were intended to reduce air pollution, many factories continued to emit harmful gases due to lack of enforcement.",
    "parts": [
      "Although the new regulations were intended to reduce air pollution,",
      "many factories continued to emit harmful gases",
      "due to lack of enforcement."
    ],
    "audio": "audio/D5.mp3",
    "image": "images/sentence5.png"
  }
];

export default sentences;

const sentences = [...];

let currentIndex = -1;
let score = parseInt(localStorage.getItem("score")) || 0;
let total = parseInt(localStorage.getItem("total")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let exp = parseInt(localStorage.getItem("exp")) || 0;
let countdown = null;
let timeLeft = 30;
let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastSignIn = localStorage.getItem("lastSignIn") || "";

const today = new Date().toLocaleDateString();
if (today !== lastSignIn) {
  if (new Date(lastSignIn).getTime() === new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0,0,0,0)) {
    streak += 1;
  } else {
    streak = 1;
  }
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastSignIn", today);
  score++;
  alert(`🎉 签到成功！连续签到 ${streak} 天，奖励 +1 分！`);
}

const app = document.getElementById("app");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");
const levelDisplay = document.getElementById("levelBar");
const nextBtn = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const resetBtn = document.getElementById("resetBtn");
const shopBtn = document.getElementById("shopBtn");
const shop = document.getElementById("shop");
const closeShopBtn = document.getElementById("closeShopBtn");
const shopItemsDiv = document.getElementById("shopItems");
const petCorner = document.getElementById("petCorner");

const shopItems = [
  { id: "bg-blue", name: "天蓝背景", price: 3, type: "bg", effect: () => document.body.style.background = "#e0f7fa" },
  { id: "bg-pink", name: "粉红背景", price: 3, type: "bg", effect: () => document.body.style.background = "#ffe0f0" },
  { id: "bg-night", name: "夜晚背景", price: 3, type: "bg", effect: () => document.body.style.background = "#001f3f" },
  { id: "pet-dog", name: "小狗头像", price: 2, type: "pet", effect: () => showPet("dog") },
  { id: "pet-cat", name: "小猫头像", price: 2, type: "pet", effect: () => showPet("cat") },
  { id: "pet-rabbit", name: "小兔头像", price: 2, type: "pet", effect: () => showPet("rabbit") },
  { id: "auto-play", name: "自动播放音频", price: 5, type: "func", effect: () => {} },
];

function showPet(name) {
  petCorner.innerHTML = `<img src="images/${name}.png" alt="${name}" />`;
}

function updateScoreboard() {
  scoreboard.textContent = `Score: ${score} / ${total}`;
  localStorage.setItem("score", score);
  localStorage.setItem("total", total);
  localStorage.setItem("exp", exp);
  localStorage.setItem("level", level);
  updateLevelBar();
}

function updateLevelBar() {
  const nextLevelExp = level * 5;
  const percent = Math.min(100, Math.floor((exp / nextLevelExp) * 100));
  levelDisplay.innerHTML = \`等级 Lv.\${level}｜经验：\${exp} / \${nextLevelExp}
    <div class="progress"><div class="bar" style="width:\${percent}%"></div></div>\`;
}

function gainExp(amount) {
  exp += amount;
  let nextExp = level * 5;
  while (exp >= nextExp) {
    exp -= nextExp;
    level++;
    alert("🎉 升级啦！当前等级 Lv." + level);
    nextExp = level * 5;
  }
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

function updateTimer() {
  timerDisplay.textContent = `⏳ Time left: ${timeLeft}`;
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

  if (purchased.includes("auto-play")) {
    audio.play();
  }
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
    if (!auto) {
      score++;
      gainExp(1);
    }
    clearInterval(countdown);
    updateScoreboard();
  }
}

function resetScore() {
  score = 0;
  total = 0;
  exp = 0;
  level = 1;
  localStorage.clear();
  updateScoreboard();
}

function toggleShop() {
  shop.classList.toggle("hidden");
}

function renderShop() {
  shopItemsDiv.innerHTML = "";
  shopItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";
    div.innerHTML = `
      <span>${item.name} (${item.price}分)</span>
      <button ${purchased.includes(item.id) ? "disabled" : ""}>${purchased.includes(item.id) ? "已购买" : "购买"}</button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => {
      if (score >= item.price && !purchased.includes(item.id)) {
        score -= item.price;
        purchased.push(item.id);
        localStorage.setItem("purchased", JSON.stringify(purchased));
        updateScoreboard();
        renderShop();
        item.effect();
      }
    });
    shopItemsDiv.appendChild(div);
  });

  shopItems.forEach(item => {
    if (purchased.includes(item.id)) item.effect();
  });
}

nextBtn.addEventListener("click", nextSentence);
showAnswerBtn.addEventListener("click", () => showAnswer(false));
resetBtn.addEventListener("click", resetScore);
shopBtn.addEventListener("click", () => {
  toggleShop();
  renderShop();
});
closeShopBtn.addEventListener("click", toggleShop);

updateScoreboard();
renderShop();
nextSentence();
