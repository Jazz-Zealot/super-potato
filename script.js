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
    sentence: "For example, when an American uses the word ‘friend’, the cultural implications of the word may be quite different from those it has in the visitor’s language and culture.",
    parts: [
      "For example,",
      "when an American uses the word ‘friend’,",
      "the cultural implications of the word may be quite different",
      "from those it has in the visitor’s language and culture."
    ],
    audio: "audio/D3.mp3",
    image: "images/sentence3.png"
  },
  {
    id: 4,
    sentence: "Learning to recognize the structure of a sentence can make it easier to understand its meaning, especially when reading complex academic texts.",
    parts: [
      "Learning to recognize the structure of a sentence",
      "can make it easier to understand its meaning,",
      "especially when reading complex academic texts."
    ],
    audio: "audio/D4.mp3",
    image: "images/sentence4.png"
  },
  {
    id: 5,
    sentence: "Although the new regulations were intended to reduce air pollution, many factories continued to emit harmful gases due to lack of enforcement.",
    parts: [
      "Although the new regulations were intended to reduce air pollution,",
      "many factories continued to emit harmful gases",
      "due to lack of enforcement."
    ],
    audio: "audio/D5.mp3",
    image: "images/sentence5.png"
  },
  {
    id: 6,
    sentence: "Because he had not prepared for the presentation, his speech was disorganized and failed to impress the audience.",
    parts: [
      "Because he had not prepared for the presentation,",
      "his speech was disorganized",
      "and failed to impress the audience."
    ],
    audio: "audio/D6.mp3",
    image: "images/sentence6.png"
  },
  {
    id: 7,
    sentence: "Scientists argue that climate change is accelerating due to increased carbon emissions, deforestation, and other human activities.",
    parts: [
      "Scientists argue that climate change is accelerating",
      "due to increased carbon emissions,",
      "deforestation,",
      "and other human activities."
    ],
    audio: "audio/D7.mp3",
    image: "images/sentence7.png"
  },
  {
    id: 8,
    sentence: "Despite receiving several warnings, the student continued to arrive late to class, which eventually affected his grade.",
    parts: [
      "Despite receiving several warnings,",
      "the student continued to arrive late to class,",
      "which eventually affected his grade."
    ],
    audio: "audio/D8.mp3",
    image: "images/sentence8.png"
  },
  {
    id: 9,
    sentence: "The museum’s new exhibition, which features interactive displays and virtual reality tours, has attracted a record number of visitors.",
    parts: [
      "The museum’s new exhibition,",
      "which features interactive displays and virtual reality tours,",
      "has attracted a record number of visitors."
    ],
    audio: "audio/D9.mp3",
    image: "images/sentence9.png"
  },
  {
    id: 10,
    sentence: "If we are to solve the energy crisis, we must invest more heavily in renewable resources and reduce our dependence on fossil fuels.",
    parts: [
      "If we are to solve the energy crisis,",
      "we must invest more heavily in renewable resources",
      "and reduce our dependence on fossil fuels."
    ],
    audio: "audio/D10.mp3",
    image: "images/sentence10.png"
  }
];

// 示例逻辑，只负责随机抽句（核心功能）
function nextSentence() {
  const newIndex = Math.floor(Math.random() * sentences.length);
  console.log("随机抽取第", newIndex + 1, "句");
}
