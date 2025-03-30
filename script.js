body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #e6f7ff, #ffffff);
  color: #222;
  text-align: center;
  padding: 20px;
}

#scoreboard, #timer, #levelBar {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

#controls button {
  margin: 0.5em;
  padding: 0.7em 1.2em;
  font-size: 1em;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

#controls button:hover {
  background: #0056b3;
}

blockquote {
  background: #f5f5f5;
  padding: 1em;
  margin: 1em auto;
  max-width: 700px;
  border-left: 5px solid #ccc;
  font-style: italic;
}

img {
  max-width: 300px;
  margin-top: 1em;
}

#shop {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  z-index: 999;
}

#shopItems .shop-item {
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
}

#levelBar .progress {
  height: 16px;
  background: #eee;
  margin-top: 5px;
  border-radius: 8px;
  overflow: hidden;
}
#levelBar .bar {
  height: 100%;
  background: linear-gradient(to right, #00c6ff, #0072ff);
}

#achievement {
  position: fixed;
  top: 10px;
  right: 10px;
  background: gold;
  color: black;
  padding: 10px;
  border-radius: 10px;
  display: none;
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; top: 0px; }
  10% { opacity: 1; top: 10px; }
  90% { opacity: 1; top: 10px; }
  100% { opacity: 0; top: 0px; }
}

#petCorner {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
