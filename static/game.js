document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const slotWord = document.getElementById("slot-word");
  const slotScreen = document.getElementById("slot-screen");
  const encryptedResult = document.getElementById("encrypted-result");
  const spinBtn = document.getElementById("spin-btn");
  const guessSelect = document.getElementById("cipher-guess");
  const checkBtn = document.getElementById("check-btn");
  const feedback = document.getElementById("feedback");

  const scoreBox = document.getElementById("score");
  const streakBox = document.getElementById("streak");
  const livesBox = document.getElementById("lives");

  const difficultySelect = document.getElementById("difficulty");
  const practiceCheckbox = document.getElementById("practice-mode");

  const avatarButtons = document.querySelectorAll(".avatar-btn");
  const avatarDisplay = document.getElementById("avatar-display");

  const badgeFirst = document.getElementById("badge-first-win");
  const badge3 = document.getElementById("badge-3-streak");
  const badge5 = document.getElementById("badge-5-streak");
  const badge100 = document.getElementById("badge-100-score");
  const badgeAll = document.getElementById("badge-all-ciphers");

  const modal = document.getElementById("result-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.getElementById("modal-close");

  // Game state
  const words = ["ROBOT", "APPLE", "MAGIC", "HELLO", "DRAGON", "CIPHER", "CODE", "BRAIN", "HAPPY", "TIGER", "SECRET", "LOCK", "TREASURE"];
  const usedCiphers = new Set();

  let currentCipher = "";
  let currentWord = "";
  let currentEncrypted = "";

  let score = 0;
  let streak = 0;
  let lives = 5;

  let roundActive = false; // ensures one chance per spin
  let difficulty = "easy";
  let practiceMode = false;

  // ----------------------------
  // Avatar handling
  // ----------------------------
  function setAvatar(emoji) {
    avatarDisplay.textContent = emoji;
    localStorage.setItem("cipherCasinoAvatar", emoji);
  }

  avatarButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      avatarButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.dataset.avatar;
      if (type === "kid1") setAvatar("🧒");
      else if (type === "kid2") setAvatar("👧");
      else setAvatar("🤖");
    });
  });

  const savedAvatar = localStorage.getItem("cipherCasinoAvatar") || "🧒";
  setAvatar(savedAvatar);
  avatarButtons.forEach(btn => {
    if (
      (btn.dataset.avatar === "kid1" && savedAvatar === "🧒") ||
      (btn.dataset.avatar === "kid2" && savedAvatar === "👧") ||
      (btn.dataset.avatar === "robot" && savedAvatar === "🤖")
    ) {
      btn.classList.add("active");
    }
  });

  // ----------------------------
  // Difficulty & practice
  // ----------------------------
  difficultySelect.addEventListener("change", () => {
    difficulty = difficultySelect.value;
  });
  difficulty = difficultySelect.value;

  practiceCheckbox.addEventListener("change", () => {
    practiceMode = practiceCheckbox.checked;
  });
  practiceMode = practiceCheckbox.checked;

  function getCipherPool() {
    if (difficulty === "easy") {
      return ["caesar", "rot13"];
    }
    if (difficulty === "medium") {
      return ["caesar", "rot13", "xor", "atbash"];
    }
    // hard
    return ["caesar", "xor", "rot13", "atbash", "substitution"];
  }

  // Utility: random word
  function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Cipher functions
  function caesar(text, shift) {
    return text.replace(/[A-Z]/g, c =>
      String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)
    );
  }

  function xorCipher(text, key = 5) {
    return text.split("").map(ch => {
      const code = (ch.charCodeAt(0) ^ key) % 26;
      return String.fromCharCode(65 + code);
    }).join("");
  }

  function rot13(text) {
    return text.replace(/[A-Za-z]/g, c =>
      String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      )
    );
  }

  function atbash(text) {
    return text.replace(/[A-Z]/g, c =>
      String.fromCharCode(90 - (c.charCodeAt(0) - 65))
    );
  }

  function randomSubstitution(text) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shuffled = alphabet.split("").sort(() => Math.random() - 0.5).join("");
    return text.split("").map(ch => shuffled[alphabet.indexOf(ch)]).join("");
  }

  function encrypt(word, cipher) {
    switch (cipher) {
      case "caesar":       return caesar(word, 3);
      case "xor":          return xorCipher(word, 7);
      case "rot13":        return rot13(word);
      case "atbash":       return atbash(word);
      case "substitution": return randomSubstitution(word);
    }
  }

  // ----------------------------
  // Score UI
  // ----------------------------
  function updateScoreUI() {
    scoreBox.textContent = score;
    streakBox.textContent = streak;
    livesBox.textContent = lives;
  }

  // ----------------------------
  // Modal helpers
  // ----------------------------
  function showModal(title, msg) {
    modalTitle.textContent = title;
    modalMessage.textContent = msg;
    modal.classList.remove("hidden");
  }

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  function cipherName(c) {
    switch (c) {
      case "caesar": return "Caesar Cipher";
      case "xor": return "XOR Cipher";
      case "rot13": return "ROT13";
      case "atbash": return "Atbash";
      case "substitution": return "Random Substitution";
      default: return c;
    }
  }

  // ----------------------------
  // Badges
  // ----------------------------
  function unlockBadge(el) {
    el.classList.add("unlocked");
  }

  function updateBadges() {
    if (score >= 10) unlockBadge(badgeFirst);
    if (streak >= 3) unlockBadge(badge3);
    if (streak >= 5) unlockBadge(badge5);
    if (score >= 100) unlockBadge(badge100);

    const all = ["caesar", "xor", "rot13", "atbash", "substitution"];
    if (all.every(c => usedCiphers.has(c))) {
      unlockBadge(badgeAll);
    }
  }

  // ----------------------------
  // Leaderboard (localStorage)
  // ----------------------------
  function updateLeaderboard() {
    const avatar = avatarDisplay.textContent || "🧒";
    const entry = {
      score,
      avatar,
      date: new Date().toISOString(),
      difficulty,
      practice: practiceMode
    };

    let board = JSON.parse(localStorage.getItem("cipherCasinoLeaderboard") || "[]");
    board.push(entry);
    board.sort((a, b) => b.score - a.score);
    board = board.slice(0, 10);
    localStorage.setItem("cipherCasinoLeaderboard", JSON.stringify(board));
  }

  // ----------------------------
  // Spin button
  // ----------------------------
  spinBtn.addEventListener("click", () => {
    if (roundActive) return;

    feedback.textContent = "";
    encryptedResult.textContent = "???";

    slotScreen.classList.remove("spin-anim");
    void slotScreen.offsetWidth;
    slotScreen.classList.add("spin-anim");

    spinBtn.disabled = true;
    checkBtn.disabled = false;

    setTimeout(() => {
      currentWord = randomWord();
      slotWord.textContent = currentWord;

      const pool = getCipherPool();
      currentCipher = pool[Math.floor(Math.random() * pool.length)];
      usedCiphers.add(currentCipher);

      currentEncrypted = encrypt(currentWord, currentCipher);
      encryptedResult.textContent = currentEncrypted;

      roundActive = true;
    }, 600);
  });

  // ----------------------------
  // Check button — ONE chance
  // ----------------------------
  checkBtn.addEventListener("click", () => {
    if (!roundActive || !currentWord) return;

    roundActive = false;
    spinBtn.disabled = false;
    checkBtn.disabled = true;

    const guess = guessSelect.value;
    const correct = (guess === currentCipher);

    if (correct) {
      score += 10;
      streak++;
      feedback.style.color = "#00ff99";
      feedback.textContent = "Correct! ⭐";
      showModal("You Win! 🎉", `Correct! The cipher was ${cipherName(currentCipher)}.`);
    } else {
      feedback.style.color = "#ff6666";
      feedback.textContent = "Wrong!";

      if (!practiceMode) {
        streak = 0;
        lives--;
      }

      showModal(
        "Oops! ❌",
        `That was incorrect. The correct cipher was ${cipherName(currentCipher)}.`
      );
    }

    updateScoreUI();
    updateBadges();
    updateLeaderboard();

    if (!practiceMode && lives <= 0) {
      showModal(
        "Game Over 💔",
        `You lost all lives. Final score: ${score}. Starting a new game!`
      );
      score = 0;
      streak = 0;
      lives = 5;
      updateScoreUI();
    }
  });

  // init
  updateScoreUI();
  checkBtn.disabled = true;
});
