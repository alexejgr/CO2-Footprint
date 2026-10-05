const schriftrichtung = document.getElementById("schriftrichtung");
const main = document.querySelector("main");

// Die Auswahl bestimmt die Position der lokalen Navigation.
schriftrichtung.addEventListener("change", function () {
    if (schriftrichtung.value === "rtl") {
        main.classList.add("navigation-rechts");
    } else if (schriftrichtung.value === "ltr") {
        main.classList.remove("navigation-rechts");
    }
});

const filterUnternehmen = document.getElementById("filter-unternehmen");
const filterLand = document.getElementById("filter-land");
const tabellenzeilen = document.querySelectorAll("#co2-daten tbody tr");

function filterTabelle() {
    const unternehmensfilter = filterUnternehmen.value.toLowerCase();
    const landfilter = filterLand.value.toLowerCase();

    for (const zeile of tabellenzeilen) {
        const unternehmen = zeile.cells[0].textContent.toLowerCase();
        const land = zeile.cells[1].textContent.toLowerCase();

        if (unternehmen.includes(unternehmensfilter) && land.includes(landfilter)) {
            zeile.style.display = "";
        } else {
            zeile.style.display = "none";
        }
    }
}

filterUnternehmen.addEventListener("input", filterTabelle);
filterLand.addEventListener("input", filterTabelle);

const sortUnternehmen = document.getElementById("sort-unternehmen");
const sortLand = document.getElementById("sort-land");
const tabellenkoerper = document.querySelector("#co2-daten tbody");
let unternehmenAufsteigend = true;
let landAufsteigend = true;

function sortiereTabelle(spalte, aufsteigend) {
    const zeilen = Array.from(tabellenkoerper.rows);

    zeilen.sort(function (zeileA, zeileB) {
        const textA = zeileA.cells[spalte].textContent;
        const textB = zeileB.cells[spalte].textContent;
        const vergleich = textA.localeCompare(textB, "de");
        return aufsteigend ? vergleich : -vergleich;
    });

    for (const zeile of zeilen) {
        tabellenkoerper.appendChild(zeile);
    }
}

sortUnternehmen.addEventListener("click", function () {
    sortiereTabelle(0, unternehmenAufsteigend);
    unternehmenAufsteigend = !unternehmenAufsteigend;
});

sortLand.addEventListener("click", function () {
    sortiereTabelle(1, landAufsteigend);
    landAufsteigend = !landAufsteigend;
});
