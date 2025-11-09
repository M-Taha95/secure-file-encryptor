document.addEventListener("DOMContentLoaded", () => {
  const algoTitle = document.getElementById("algo-title");
  const algoDesc = document.getElementById("algo-desc");
  const algorithmSelect = document.getElementById("algorithm");
  const messageInput = document.getElementById("message");
  const keyInput = document.getElementById("key");
  const resultBox = document.getElementById("result");
  const lock = document.getElementById("lock");
  const unlock = document.getElementById("unlock");
  const spark = document.getElementById("spark");

  const explanations = {
    caesar: "Each letter moves a few steps down the alphabet. If A → D, that’s a shift of 3!",
    xor: "Each letter mixes with a secret number key — like digital magic!",
    reverse: "The message flips backward — the easiest cipher to try!",
    base64: "The message becomes a strange mix of letters, numbers, and = signs.",
    rot13: "Each letter swaps with the one 13 places away — double encrypting gives the original!"
  };

  function updateDescription() {
    const algo = algorithmSelect.value;
    algoTitle.textContent = `🔐 ${algorithmSelect.options[algorithmSelect.selectedIndex].text}`;
    algoDesc.textContent = explanations[algo];
  }

  algorithmSelect.addEventListener("change", updateDescription);

  function animateLock(success = true) {
    spark.style.opacity = "1";
    if (success) {
      lock.style.opacity = "0";
      unlock.style.opacity = "1";
    }
    setTimeout(() => {
      spark.style.opacity = "0";
      lock.style.opacity = "1";
      unlock.style.opacity = "0";
    }, 1000);
  }

  function caesar(text, shift) {
    return text.toUpperCase().split("").map(ch => {
      if (/[A-Z]/.test(ch)) {
        const base = 65;
        return String.fromCharCode((ch.charCodeAt(0) - base + shift + 26) % 26 + base);
      }
      return ch;
    }).join("");
  }

  function xorCipher(text, key) {
    return text.split("").map(ch => String.fromCharCode(ch.charCodeAt(0) ^ key)).join("");
  }

  function encrypt(text, algo, key) {
    switch (algo) {
      case "caesar": return caesar(text, key);
      case "xor": return xorCipher(text, key);
      case "reverse": return text.split("").reverse().join("");
      case "base64": return btoa(text);
      case "rot13":
        return text.replace(/[A-Za-z]/g, c =>
          String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));
      default: return text;
    }
  }

  function decrypt(text, algo, key) {
    switch (algo) {
      case "caesar": return caesar(text, -key);
      case "xor": return xorCipher(text, key);
      case "reverse": return text.split("").reverse().join("");
      case "base64": try { return atob(text); } catch { return "Invalid Base64"; }
      case "rot13":
        return text.replace(/[A-Za-z]/g, c =>
          String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));
      default: return text;
    }
  }

  function handleAction(isEncrypt) {
    const algo = algorithmSelect.value;
    const text = messageInput.value.trim();
    const key = parseInt(keyInput.value) || 3;

    if (!text) {
      resultBox.textContent = "Please enter a message first!";
      return;
    }

    const result = isEncrypt ? encrypt(text, algo, key) : decrypt(text, algo, key);
    resultBox.textContent = result;
    animateLock(true);
  }

  document.getElementById("encrypt").addEventListener("click", () => handleAction(true));
  document.getElementById("decrypt").addEventListener("click", () => handleAction(false));
});