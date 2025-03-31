const sentences = [
  {
    id: 1,
    sentence: "After six months of arguing and final 16 hours of hot parliamentary debates, Australia’s Northern Territory became the first legal authority in the world to allow doctors to take the lives of incurably ill patients who wish to die.",
    parts: [
      "After six months of arguing,",
      "and final 16 hours of hot parliamentary debates,",
      "Australia’s Northern Territory became the first legal authority in the world,",
      "to allow doctors to take the lives of incurably ill patients who wish to die."
    ],
    audio: "audio/D1.mp3",
    image: "images/sentence1.png"
  },
  {
    id: 2,
    sentence: "The casual friendliness of many Americans should be interpreted neither as superficial nor as artificial, but as the result of a historically developed cultural tradition.",
    parts: [
      "The casual friendliness of many Americans",
      "should be interpreted neither as superficial,",
      "nor as artificial,",
      "but as the result of a historically developed cultural tradition."
    ],
    audio: "audio/D2.mp3",
    image: "images/sentence2.png"
  },
  {
    id: 3,
    sentence: "For example, when an American uses the word 'friend', the cultural implications of the word may be quite different from those it has in the visitor’s language and culture.",
    parts: [
      "For example,",
      "when an American uses the word 'friend',",
      "the cultural implications of the word may be quite different",
      "from those it has in the visitor’s language and culture."
    ],
    audio: "audio/D3.mp3",
    image: "images/sentence3.png"
  },
  {
    id: 4,
    sentence: "The phrase “substance abuse” is often used instead of “drug abuse” to make clear that substances such as alcohol and tobacco can be just as harmfully misused as heroin and cocaine.",
    parts: [
      "The phrase “substance abuse” is often used instead of “drug abuse”",
      "to make clear that substances such as alcohol and tobacco",
      "can be just as harmfully misused as heroin and cocaine."
    ],
    audio: "audio/D4.mp3",
    image: "images/sentence4.png"
  },
  {
    id: 5,
    sentence: "We live in a society in which the medicinal and social use of substances (drugs) is pervasive: an aspirin to quiet a headache, some wine to be sociable, coffee to get going in the morning, a cigarette for the nerves.",
    parts: [
      "We live in a society",
      "in which the medicinal and social use of substances (drugs) is pervasive:",
      "an aspirin to quiet a headache,",
      "some wine to be sociable,",
      "coffee to get going in the morning,",
      "a cigarette for the nerves."
    ],
    audio: "audio/D5.mp3",
    image: "images/sentence5.png"
  },
  {
    id: 6,
    sentence: "Dependence is marked first by an increased tolerance, with more and more of the substance required to produce the desired effect, and then by the appearance of unpleasant withdrawal symptoms when the substance is discontinued.",
    parts: [
      "Dependence is marked first by an increased tolerance,",
      "with more and more of the substance required to produce the desired effect,",
      "and then by the appearance of unpleasant withdrawal symptoms",
      "when the substance is discontinued."
    ],
    audio: "audio/D6.mp3",
    image: "images/sentence6.png"
  },
  {
    id: 7,
    sentence: "Drugs (substances) that affect the central nervous system and alter perception, mood, and behavior are known as psychoactive substances.",
    parts: [
      "Drugs (substances) that affect the central nervous system",
      "and alter perception, mood, and behavior",
      "are known as psychoactive substances."
    ],
    audio: "audio/D7.mp3",
    image: "images/sentence7.png"
  },
  {
    id: 8,
    sentence: "The test of any democratic society lies not in how well it can control expression but in whether it gives freedom of thought and expression the widest possible latitude, however disputable or irritating the results may sometimes be.",
    parts: [
      "The test of any democratic society lies not in how well it can control expression",
      "but in whether it gives freedom of thought and expression the widest possible latitude,",
      "however disputable or irritating the results may sometimes be."
    ],
    audio: "audio/D8.mp3",
    image: "images/sentence8.png"
  },
  {
    id: 9,
    sentence: "Though some of us have known for many, many years that the freedoms under the First Amendment are not totally unlimited, I think it is perhaps the case that some people associated with the company have only recently come to realize this.",
    parts: [
      "Though some of us have known for many, many years",
      "that the freedoms under the First Amendment are not totally unlimited,",
      "I think it is perhaps the case",
      "that some people associated with the company have only recently come to realize this."
    ],
    audio: "audio/D9.mp3",
    image: "images/sentence9.png"
  },
  {
    id: 10,
    sentence: "Much of the language used to describe monetary policy, such as “steering the economy to a soft landing” or “a touch on the brakes”, makes it sound like a precise science.",
    parts: [
      "Much of the language used to describe monetary policy,",
      "such as “steering the economy to a soft landing” or “a touch on the brakes”,",
      "makes it sound like a precise science."
    ],
    audio: "audio/D10.mp3",
    image: "images/sentence10.png"
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

updateScoreboard();
nextSentence();
