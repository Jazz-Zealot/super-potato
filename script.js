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
  }
];

const shopBtn = document.getElementById("shopBtn");
const closeShopBtn = document.getElementById("closeShopBtn");
const shop = document.getElementById("shop");

shopBtn.addEventListener("click", () => {
  shop.classList.toggle("hidden");
});

closeShopBtn.addEventListener("click", () => {
  shop.classList.add("hidden");
});

