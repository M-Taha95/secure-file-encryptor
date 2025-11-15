document.addEventListener("DOMContentLoaded", () => {
  const robotBubble = document.getElementById("robot-bubble");

  // -----------------------------
  // Cipher explanation section
  // -----------------------------
  const cipherTabs = document.querySelectorAll(".cipher-tab");
  const cipherTitle = document.getElementById("cipher-title");
  const cipherDescription = document.getElementById("cipher-description");
  const cipherExample = document.getElementById("cipher-example");

  const cipherInfo = {
    caesar: {
      title: "Caesar Cipher",
      desc: "Caesar Cipher shifts each letter forward by a number (the key). If the key is 3, A→D, B→E, C→F. When you reach Z, you wrap around back to A.",
      example: "HELLO with key 3 ➝ KHOOR",
    },
    xor: {
      title: "XOR Cipher",
      desc: "XOR Cipher combines each letter with a small secret number (the key). Using the same number again can undo the change and get the original text back.",
      example: "CAT with key 5 ➝ (C⊕5, A⊕5, T⊕5) ➝ encrypted letters",
    },
    rot13: {
      title: "ROT13",
      desc: "ROT13 moves each letter 13 steps forward. Do it twice and you get the original word back. It’s like a Caesar Cipher with key 13.",
      example: "HELLO ➝ URYYB (ROT13)",
    },
    atbash: {
      title: "Atbash",
      desc: "Atbash flips the alphabet. A becomes Z, B becomes Y, C becomes X, and so on. It’s like holding the alphabet in a mirror.",
      example: "CAT ➝ XZG",
    },
    substitution: {
      title: "Random Substitution",
      desc: "Each letter is swapped for a different letter using a scrambled alphabet. The pattern is secret. Without the mapping, it’s very hard to guess the original text.",
      example: "HELLO ➝ QZKAA (example with a random mapping)",
    },
  };

  cipherTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      cipherTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const c = tab.dataset.cipher;
      const info = cipherInfo[c];

      cipherTitle.textContent = info.title;
      cipherDescription.textContent = info.desc;
      cipherExample.textContent = info.example;

      robotBubble.textContent = `Let’s look at ${info.title}! Watch how the letters change below.`;
    });
  });

  // -----------------------------
  // Visual Letter Lab
  // -----------------------------
  const textInput = document.getElementById("vis-text");
  const algoSelect = document.getElementById("vis-algo");
  const keyInput = document.getElementById("vis-key");
  const runBtn = document.getElementById("vis-run");

  const plainRow = document.getElementById("vis-plain");
  const resultRow = document.getElementById("vis-result");
  const status = document.getElementById("vis-status");
  const explain = document.getElementById("vis-explain");

  function renderPlain(text) {
    plainRow.innerHTML = "";
    text.split("").forEach((ch) => {
      const box = document.createElement("div");
      box.className = "letter-box";
      box.textContent = ch.toUpperCase();
      plainRow.appendChild(box);
    });
  }

  function updateExplain() {
    const algo = algoSelect.value;
    const key = keyInput.value || 3;

    if (algo === "caesar") {
      explain.textContent = `Caesar Cipher: each letter moves forward by ${key} positions. A with key ${key} becomes ${shiftChar(
        "A",
        parseInt(key)
      )}.`;
    } else if (algo === "xor") {
      explain.textContent = `XOR Cipher: each letter is combined with the number ${key}. Doing XOR with ${key} again gets the original letter back.`;
    } else if (algo === "rot13") {
      explain.textContent = `ROT13: every letter moves 13 positions. If you apply ROT13 twice, you return to the original text.`;
    } else if (algo === "atbash") {
      explain.textContent = `Atbash: letters are flipped. A⇄Z, B⇄Y, C⇄X... It’s like mirroring the alphabet.`;
    } else {
      explain.textContent = `Random Substitution: each letter is swapped with a random letter using a secret mapping.`;
    }
  }

  textInput.addEventListener("input", () => {
    renderPlain(textInput.value.toUpperCase());
    resultRow.innerHTML = "";
  });
  algoSelect.addEventListener("change", updateExplain);
  keyInput.addEventListener("input", updateExplain);

  runBtn.addEventListener("click", () => {
    const text = textInput.value.toUpperCase();
    const algo = algoSelect.value;
    const key = parseInt(keyInput.value) || 3;

    if (!text) return;

    resultRow.innerHTML = "";
    status.textContent = "Encrypting...";
    robotBubble.textContent =
      "Watch the letters travel through my encryption machine!";

    const letters = plainRow.querySelectorAll(".letter-box");

    letters.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("moving");

        const transformed = transformChar(box.textContent, algo, key);
        const resBox = document.createElement("div");
        resBox.className = "letter-box done";
        resBox.textContent = transformed;
        resultRow.appendChild(resBox);

        if (index === letters.length - 1) {
          status.textContent = "Done! 🎉";
        }
      }, index * 300);
    });
  });

  // Cipher helpers
  function shiftChar(ch, shift) {
    if (!/[A-Z]/.test(ch)) return ch;
    const base = "A".charCodeAt(0);
    return String.fromCharCode(
      ((ch.charCodeAt(0) - base + shift + 26) % 26) + base
    );
  }

  function caesar(text, shift) {
    return text.replace(/[A-Z]/g, (c) => shiftChar(c, shift));
  }

  function xorCipher(text, key) {
    return text
      .split("")
      .map((ch) => {
        const code = (ch.charCodeAt(0) ^ key) % 26;
        return String.fromCharCode(65 + code);
      })
      .join("");
  }

  function rot13(text) {
    return text
      .replace(/[A-Za-z]/g, (c) =>
        String.fromCharCode(
          c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)
        )
      )
      .toUpperCase();
  }

  function atbash(text) {
    return text.replace(/[A-Z]/g, (c) =>
      String.fromCharCode(90 - (c.charCodeAt(0) - 65))
    );
  }

  function randomSubstitution(text) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shuffled = alphabet
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return text
      .split("")
      .map((ch) => {
        const idx = alphabet.indexOf(ch);
        if (idx === -1) return ch;
        return shuffled[idx];
      })
      .join("");
  }

  function transformChar(ch, algo, key) {
    if (!/[A-Z]/.test(ch)) return ch;
    const text = ch;
    if (algo === "caesar") return caesar(text, key);
    if (algo === "xor") return xorCipher(text, key);
    if (algo === "rot13") return rot13(text);
    if (algo === "atbash") return atbash(text);
    return randomSubstitution(text);
  }

  // initial
  renderPlain(textInput.value.toUpperCase());
  updateExplain();

  // -----------------------------
  // Mini Quiz
  // -----------------------------
  const quizPlain = document.getElementById("quiz-plain");
  const quizCipher = document.getElementById("quiz-cipher");
  const quizNew = document.getElementById("quiz-new");
  const quizGuess = document.getElementById("quiz-guess");
  const quizCheck = document.getElementById("quiz-check");
  const quizFeedback = document.getElementById("quiz-feedback");

  const quizWords = [
    "HELLO",
    "CAT",
    "SECRET",
    "ROBOT",
    "APPLE",
    "CODE",
    "DRAGON",
  ];
  let currentQuizCipher = "caesar";

  function quizEncrypt(word, cipher) {
    if (cipher === "caesar") return caesar(word, 3);
    if (cipher === "xor") return xorCipher(word, 7);
    if (cipher === "rot13") return rot13(word);
    if (cipher === "atbash") return atbash(word);
    return randomSubstitution(word);
  }

  function newQuizQuestion() {
    const word = quizWords[Math.floor(Math.random() * quizWords.length)];
    quizPlain.textContent = word;

    const pool = ["caesar", "xor", "rot13", "atbash", "substitution"];
    currentQuizCipher = pool[Math.floor(Math.random() * pool.length)];

    const cipherText = quizEncrypt(word, currentQuizCipher);
    quizCipher.textContent = cipherText;
    quizFeedback.textContent = "";
    robotBubble.textContent = "Can you guess which cipher I used for this one?";
  }

  quizNew.addEventListener("click", newQuizQuestion);

  quizCheck.addEventListener("click", () => {
    const guess = quizGuess.value;
    if (guess === currentQuizCipher) {
      quizFeedback.style.color = "#8eff9a";
      quizFeedback.textContent = "Correct! ⭐ You’re becoming a crypto expert!";
      robotBubble.textContent =
        "Excellent work, agent! You guessed the cipher correctly. 🚀";
    } else {
      quizFeedback.style.color = "#ff7b7b";
      quizFeedback.textContent = "Not quite. Try another question!";
      robotBubble.textContent =
        "Nice try! Let’s spin up a new question so you can practice more. 😉";
    }
  });

  // Start with one quiz
  newQuizQuestion();
});
