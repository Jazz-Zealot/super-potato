
const app = document.getElementById('app');
let index = 0;

function render() {
  const s = sentences[index];
  app.innerHTML = `
    <h2>Sentence #${s.id}</h2>
    <button onclick="new Audio('${s.audio}').play()">▶️ Play Audio</button>
    <ul>${s.parts.map(p => `<li>${p}</li>`).join('')}</ul>
    <button onclick="document.getElementById('full').style.display='block'">Reveal Full Sentence</button>
    <p id="full" style="display:none; margin-top:1em;"><strong>${s.sentence}</strong></p>
    <p><em>Scene:</em> ${s.scene}</p>
    <img src="${s.image}" alt="scene" />
    <div style="margin-top:2em">
      <button onclick="prev()" ${index === 0 ? 'disabled' : ''}>Previous</button>
      <button onclick="next()" ${index === sentences.length - 1 ? 'disabled' : ''}>Next</button>
    </div>
  `;
}
function prev() { index--; render(); }
function next() { index++; render(); }

render();
