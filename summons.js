const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkhi-_ttHZfuzSh4y4nN1-TltRbi4tBDHUm8-Y1SIuP9AFVfklc-vXLLJ5bMmYp-uleKvWjplHHOyv/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
    .then(response => response.text())
    .then(data => {

        const rows = data.split("\n");
  let groups = {};
// Skip the header row
for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(",");
    if (!columns[0]) continue;
    const creatureName = columns[0].trim();
    const spell = columns[2].trim();
    const image = columns[3].trim();
    if (!groups[spell]) {
        groups[spell] = [];
    }
    groups[spell].push({
        name: creatureName,
        image: image
    });
    }
let output = "";
for (const spell in groups) {
    output += `
        <h2 class="summon-header">${spell}  </h2>     `;

    groups[spell].forEach(creature => {
        output += `
            <button
                class="spell-button"
                data-name="${creature.name}"
                data-image="${creature.image}">
                ${creature.name}
            </button>
        `;
    });
}
        document.getElementById("spell-list").innerHTML = output;
        // Add click handlers AFTER the buttons exist
        document.querySelectorAll(".spell-button").forEach(button => {
            button.addEventListener("click", function () {
                const spellName = this.dataset.name;
                const image = this.dataset.image;
                window.location.href =
                    `card.html?name=${encodeURIComponent(spellName)}&image=${encodeURIComponent(image)}`;
            });
        });

    });
