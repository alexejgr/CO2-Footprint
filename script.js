let sprache = navigator.language.split("-")[0];

let rtlSprachen = ["ar", "he", "fa", "ur"];

if (rtlSprachen.includes(sprache)) {
    document.querySelector("main").classList.add("rtl");
}
function filterTabelle() {
    let unternehmen = document.querySelector("#filter-unternehmen").value.toLowerCase();
    let land = document.querySelector("#filter-land").value.toLowerCase();

    let zeilen = document.querySelectorAll("tbody tr");

    for (let zeile of zeilen) {
        let name = zeile.cells[0].textContent.toLowerCase();
        let landName = zeile.cells[1].textContent.toLowerCase();

        if (name.includes(unternehmen) && landName.includes(land)) {
            zeile.style.display = "";
        } else {
            zeile.style.display = "none";
        }
    }
}

document.querySelector("#filter-unternehmen").addEventListener("input", filterTabelle);
document.querySelector("#filter-land").addEventListener("input", filterTabelle);

const sortierbuttons = document.querySelectorAll(".sortierbutton");

for (const button of sortierbuttons) {
    button.addEventListener("click", function () {
        sortiereTabelle(button);
    });
}

function sortiereTabelle(button) {
    const kopf = button.parentElement;
    const spalte = kopf.cellIndex;
    const absteigend = kopf.getAttribute("aria-sort") === "ascending";
    const richtung = absteigend ? -1 : 1;
    let tabelle = document.querySelector("tbody");
    let zeilen = Array.from(tabelle.rows);

    zeilen.sort(function (a, b) {
        let wertA = a.cells[spalte].textContent;
        let wertB = b.cells[spalte].textContent;

        if (spalte === 2) {
            return richtung * (Number(wertA) - Number(wertB));
        } else {
            return richtung * wertA.localeCompare(wertB, "de");
        }
    });

    for (let zeile of zeilen) {
        tabelle.appendChild(zeile);
    }

    for (const sortierbutton of sortierbuttons) {
        sortierbutton.parentElement.removeAttribute("aria-sort");
        sortierbutton.querySelector("span").textContent = "↕";
    }

    kopf.setAttribute("aria-sort", absteigend ? "descending" : "ascending");
    button.querySelector("span").textContent = absteigend ? "↓" : "↑";
}
