const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTizAGyLQWLge0LKAxoXBVAmF2qy3nWJRRZyGY5Z7Vi5vWJ8WFAwNppX0bPl8ESXp84QFbfwZaMtxK0/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
    .then(response => response.text())
    .then(data => {

        const rows = data.split("\n");
// Group spells by level
let groups = {};
// Skip the header row
for (let i = 1; i < rows.length; i++) 
{   const columns = rows[i].split(",");
    if (!columns[0]) continue;
    const spellName = columns[0].trim();
    const level = columns[1].trim();
    const image = columns[3].trim();
    if (!groups[level]) {
        groups[level] = [];
    }
    groups[level].push({
        name: spellName,
        image: image
    });
}
// Sort levels numerically
const sortedLevels = Object.keys(groups).sort((a, b) => {
    return Number(a) - Number(b);
});
let output = "";
// Create a heading and buttons for each level
for (const level of sortedLevels) {
    output += `
        <h2 class="level-header">
            Level ${level}
        </h2>
    `;
    groups[level].forEach(spell => {
        output += `
            <button
                class="spell-button"
                data-name="${spell.name}"
                data-image="${spell.image}">
                ${spell.name}
            </button>
        `; });
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
