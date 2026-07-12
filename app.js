const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTizAGyLQWLge0LKAxoXBVAmF2qy3nWJRRZyGY5Z7Vi5vWJ8WFAwNppX0bPl8ESXp84QFbfwZaMtxK0/pub?gid=0&single=true&output=csv";


fetch(sheetURL)
    .then(response => response.text())
    .then(data => {

        let rows = data.split("\n");

        let output = "";

        for (let i = 1; i < rows.length; i++) {

            let columns = rows[i].split(",");

            if (columns[0]) {

                let spellName = columns[0];
                let image = columns[3];

               output += 
                 "<button onclick=\"openCard('" + spellName + "', '" + image + "')\">" +
                  spellName +
                 "</button><br>";
            }
        }
        document.getElementById("spell-list").innerHTML = output;
    });



document.addEventListener("click", function(event) {

    if (event.target.classList.contains("spell-button")) {

        let spellName = event.target.getAttribute("data-name");
        let image = event.target.getAttribute("data-image");


        document.getElementById("spell-card").innerHTML =
            "<h2>" + spellName + "</h2>" +
            "<img src=\"" + image + "\">";

    }

});

function openCard(spellName, image) {

    window.location.href =
        "card.html?name=" +
        encodeURIComponent(spellName) +
        "&image=" +
        encodeURIComponent(image);  }
