document.addEventListener("DOMContentLoaded", () => {
    // Dummy score data for testing
    const scores = [
        { username: "User1", score: 100 },
        { username: "User2", score: 90 },
        { username: "User3", score: 80 },
    ];

    // Get the score list container
    const scoreList = document.getElementById("score-list");

    // Function to create and append a score entry
    function createScoreEntry(score, index) {
        const scoreEntry = document.createElement("div");
        scoreEntry.classList.add("score-entry");
        scoreEntry.innerHTML = `<strong>${index + 1}. ${score.username}:</strong> ${score.score}`;
        scoreList.appendChild(scoreEntry);
    }

    // Clear any existing content
    scoreList.innerHTML = "";

    // Iterate through scores and create score entries
    scores.forEach((score, index) => {
        createScoreEntry(score, index);
    });
});
