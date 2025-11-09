document.addEventListener("DOMContentLoaded", () => {
  let stars = 0;
  let level = 0;
  let missions = [];

  const missionTitle = document.getElementById("mission-title");
  const missionDesc = document.getElementById("mission-desc");
  const cipherBox = document.getElementById("cipher-box");
  const answerInput = document.getElementById("answer");
  const submitBtn = document.getElementById("submit-btn");
  const feedback = document.getElementById("feedback");
  const starsDisplay = document.getElementById("stars");
  const levelDisplay = document.getElementById("level");
  const maxDisplay = document.getElementById("max-levels");
  const kid = document.getElementById("kid");
  const spark = document.getElementById("spark");

  const words = [
    "HELLO", "WORLD", "CODE", "HACK", "CYBER", "LEARN", "SAFE", "LOCK",
    "DATA", "SECURE", "ENCRYPT", "DECRYPT", "PASSWORD", "NETWORK", "CLOUD",
    "ACCESS", "GUARD", "PYTHON", "FLASK", "KEY"
  ];

  const algorithms = ["caesar", "xor", "reverse", "base64", "substitution"];

  // --- Generate Random Mission List ---
  function generateMissions() {
    const missions = [];
    for (let i = 0; i < 20; i++) {
      const word = words[Math.floor(Math.random() * words.length)];
      const algo = algorithms[Math.floor(Math.random() * algorithms.length)];
      const key = Math.floor(Math.random() * 5) + 1;
      const cipher = encryptWord(word, algo, key);
      const mode = Math.random() > 0.5 ? "encrypt" : "decrypt";
      missions.push({ algo, word, cipher, key, mode });
    }
    return missions;
  }

  // --- Algorithms ---
  function caesarEncrypt(text, shift) {
    return text.split("").map(ch => {
      if (/[A-Z]/.test(ch)) {
        const base = 65;
        return String.fromCharCode((ch.charCodeAt(0) - base + shift + 26) % 26 + base);
      }
      return ch;
    }).join("");
  }

  function xorEncrypt(text, key) {
    return text.split("").map(ch => String.fromCharCode(ch.charCodeAt(0) ^ key)).join("");
  }

  function encryptWord(word, algo, key) {
    switch (algo) {
      case "caesar": return caesarEncrypt(word, key);
      case "xor": return xorEncrypt(word, key);
      case "reverse": return word.split("").reverse().join("");
      case "base64": return btoa(word);
      case "substitution": // ROT13
        return word.replace(/[A-Z]/g, c => String.fromCharCode(((c.charCodeAt(0) - 65 + 13) % 26) + 65));
      default: return word;
    }
  }

  function decryptWord(cipher, algo, key) {
    switch (algo) {
      case "caesar": return caesarEncrypt(cipher, -key);
      case "xor": return xorEncrypt(cipher, key);
      case "reverse": return cipher.split("").reverse().join("");
      case "base64": try { return atob(cipher); } catch { return ""; }
      case "substitution":
        return cipher.replace(/[A-Z]/g, c => String.fromCharCode(((c.charCodeAt(0) - 65 + 13) % 26) + 65));
      default: return cipher;
    }
  }

  // --- Animations ---
  function playAnimation() {
    kid.style.left = "80%";
    spark.style.opacity = "1";
    setTimeout(() => {
      kid.style.left = "0";
      spark.style.opacity = "0";
    }, 1000);
  }

  // --- Load Level ---
  function loadLevel() {
    if (level >= missions.length) {
      // restart with new set
      missions = generateMissions();
      level = 0;
    }
    const m = missions[level];
    const showCipher = m.mode === "decrypt";
    cipherBox.textContent = showCipher ? m.cipher : m.word;

    missionTitle.textContent = `Mission ${level + 1}: ${m.algo.toUpperCase()} (${m.mode.toUpperCase()})`;
    missionDesc.textContent =
      m.mode === "decrypt"
        ? `Decrypt this message using ${m.algo} (key ${m.key}).`
        : `Encrypt this word using ${m.algo} (key ${m.key}).`;

    feedback.textContent = "";
    answerInput.value = "";
    levelDisplay.textContent = level + 1;
    maxDisplay.textContent = missions.length;
  }

  // --- Submit Answer ---
  submitBtn.addEventListener("click", () => {
    const m = missions[level];
    const userAnswer = answerInput.value.trim().toUpperCase();
    if (!userAnswer) return;

    const expected =
      m.mode === "decrypt"
        ? decryptWord(m.cipher, m.algo, m.key).toUpperCase()
        : encryptWord(m.word, m.algo, m.key).toUpperCase();

    if (userAnswer === expected) {
      stars++;
      starsDisplay.textContent = stars;
      feedback.textContent = "✅ Great job! Next challenge loading...";
      feedback.style.color = "#009c24";
      playAnimation();
      level++;
      setTimeout(loadLevel, 1200);
    } else {
      feedback.textContent = "❌ Wrong answer, try again!";
      feedback.style.color = "#d11";
    }
  });

  // Initialize
  missions = generateMissions();
  loadLevel();
});