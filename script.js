document.getElementById("startBtn").addEventListener("click", function() {
    let playerName = prompt("ادخل اسمك للبدء:");
    if (playerName) {
        localStorage.setItem("playerName", playerName);
        window.location.href = "game.html";
    }
});