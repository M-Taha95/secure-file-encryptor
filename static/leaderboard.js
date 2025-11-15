document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("lb-body");
  let board = JSON.parse(
    localStorage.getItem("cipherCasinoLeaderboard") || "[]"
  );

  if (board.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = "No scores yet. Play a game to get on the leaderboard!";
    row.appendChild(cell);
    body.appendChild(row);
    return;
  }

  board.forEach((entry, index) => {
    const tr = document.createElement("tr");

    const rankTd = document.createElement("td");
    rankTd.textContent = index + 1;

    const avatarTd = document.createElement("td");
    avatarTd.textContent = entry.avatar || "🧒";

    const scoreTd = document.createElement("td");
    scoreTd.textContent = entry.score;

    const modeTd = document.createElement("td");
    if (entry.practice) {
      modeTd.textContent = "Practice";
    } else if (entry.difficulty) {
      modeTd.textContent =
        entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1);
    } else {
      modeTd.textContent = "Unknown";
    }

    const dateTd = document.createElement("td");
    const d = new Date(entry.date);
    dateTd.textContent = d.toLocaleString();

    tr.appendChild(rankTd);
    tr.appendChild(avatarTd);
    tr.appendChild(scoreTd);
    tr.appendChild(modeTd);
    tr.appendChild(dateTd);

    body.appendChild(tr);
  });
});
