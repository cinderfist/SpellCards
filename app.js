const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTizAGyLQWLge0LKAxoXBVAmF2qy3nWJRRZyGY5Z7Vi5vWJ8WFAwNppX0bPl8ESXp84QFbfwZaMtxK0/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
    .then(response => response.text())
    .then(data => {

        const rows = data.split("\n");
        let output = "";

        // Skip the header row
        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(",");
            if (!columns[0]) continue;

            const spellName = columns[0].trim();
            const image = columns[3].trim();
console.log({
    spellName,
    image
});
            output += `
                <button
                    class="spell-button"
                    data-name="${spellName}"
                    data-image="${image}">
                    ${spellName}
                </button><br>
            `;}

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
