async function fetchScores() {
    try {
        const response = await fetch("/score");
        const scores = await response.json();

        const tableBody = document.getElementById("scoreTable");
        tableBody.innerHTML = "";

        scores.forEach((score, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="color: white;">${index + 1}</td>
                <td style="color: white;">${score.playerName}</td>
                <td style="color: white;">${score.score}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching scores:", error);
    }
}

fetchScores();