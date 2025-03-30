
import sentences from "./data.js";

const app = document.getElementById("app");
app.innerHTML = "";

sentences.forEach((s, index) => {
  const block = document.createElement("div");
  block.style.marginBottom = "2rem";

  const title = document.createElement("h3");
  title.textContent = `Sentence ${index + 1}`;
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
  full.textContent = s.sentence;
  block.appendChild(full);

  app.appendChild(block);
});
