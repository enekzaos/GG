const typer = [
    "Byggnadssök",
    "Fordonssök",
    "Områdessök",
    "Bagagessök",
    "Lydnad",
    "Konsol",
    "Miljöträning"
];


const fokus = {

    "Byggnadssök": [
        "Scanning",
        "Detaljsök",
        "Helhetsmoment/metod"
    ],

    "Fordonssök": [
        "Scanning",
        "Markering",
        "Detaljsök",
        "Helhetsmoment/metod",
        "Insida fordon"
    ],

    "Områdessök": [
        "Scanning",
        "Markering",
        "Detaljsök",
        "Helhetsmoment/metod"
    ],

    "Bagagessök": [
        "Scanning",
        "Detaljsök",
        "Helhetsmoment/metod",
        "Markering",
        "Enskilda bagage",
        "Flera bagage",
        "Objekt"
    ],

    "Lydnad": [
        "Inkallning",
        "Platsliggning",
        "Fotgående",
        "Allmänt lydnad",
        "Markering"
    ],

    "Konsol": [
        "System",
        "Prepinlärning"
    ],

    "Miljöträning": [
        "Lek i miljö",
        "Sök i miljö"
    ]

};


const miljoer = {

    "Byggnadssök": [
        "Butik",
        "Hus",
        "Bondgård",
        "Varma/bullriga miljöer",
        "Förråd/lagermiljöer"
    ],

    "Fordonssök": [
        "Lastbil",
        "Personbil",
        "Buss",
        "Tåg"
    ],

    "Områdessök": [
        "Skog",
        "Park",
        "Stadsmiljö",
        "Trädgård",
        "Bondgård",
        "Parkering"
    ],

    "Bagagessök": [
        "Inomhus",
        "Utomhus"
    ],

    "Lydnad": [
        "Sökmiljö",
        "Träningsplan"
    ],

    "Konsol": [
        "Inomhus",
        "Utomhus"
    ],

    "Miljöträning": [
        "Stadsmiljö",
        "Skog",
        "Park",
        "Bondgård",
        "Trädgård",
        "Förråd/lagermiljöer",
        "Butik",
        "Varma/bullriga miljöer",
        "Parkering"
    ]

};


const preparat = [
    "Preparat 1",
    "Preparat 2",
    "Preparat 3"
];


const ingetPreparat = "Inget preparat";


// ========================================
// HÄMTAR TRÄNINGAR
// ========================================

function hamtaTraningar() {

    const traningar = JSON.parse(
        localStorage.getItem("traningar")
    ) || [];


    traningar.forEach(function(traning) {

        if (!traning.id) {
            traning.id = crypto.randomUUID();
        }

    });


    localStorage.setItem(
        "traningar",
        JSON.stringify(traningar)
    );


    return traningar;

}


// ========================================
// NORMALISERAR TRÄNING
// ========================================

function normaliseraTraning(traning) {

    if (!traning.id) {
        traning.id = crypto.randomUUID();
    }


    if (
        traning.fokus ===
        "Helhetssmoment/metod"
    ) {

        traning.fokus =
            "Helhetsmoment/metod";

    }


    if (!traning.preparat) {

        traning.preparat =
            ingetPreparat;

    }


    if (
        traning.moment === "Lydnad" ||
        traning.moment === "Konsol" ||
        traning.moment === "Miljöträning"
    ) {

        traning.preparat =
            ingetPreparat;

    }


    return traning;

}


// ========================================
// HÄMTAR FORMULÄRETS DATA
// ========================================

function hamtaFormular() {

    return {

        datum:
            document.getElementById("date").value,

        moment:
            document.getElementById("moment").value,

        fokus:
            document.getElementById("fokus").value,

        miljo:
            document.getElementById("miljo").value,

        preparat:
            document.getElementById("preparat").value,

        tillampat:
            document.getElementById("tillampat").value,

        resultat:
            document.getElementById("resultat").value,

        kommentar:
            document.getElementById("kommentar").value,

        svarighetsgrad:
            document.getElementById("svårighetsgrad").value

    };

}


// ========================================
// FYLLER TYP-LISTAN
// ========================================

document.getElementById("moment").innerHTML = "";


typer.forEach(function(typ) {

    const option =
        document.createElement("option");

    option.value = typ;
    option.textContent = typ;


    document
        .getElementById("moment")
        .appendChild(option);

});


// ========================================
// UPPDATERAR FOKUS
// ========================================

function uppdateraFokus() {

    const valtMoment =
        document.getElementById("moment").value;

    const fokusLista =
        document.getElementById("fokus");


    fokusLista.innerHTML = "";


    if (!fokus[valtMoment]) {
        return;
    }


    fokus[valtMoment].forEach(
        function(fokusAlternativ) {

            const option =
                document.createElement("option");

            option.value =
                fokusAlternativ;

            option.textContent =
                fokusAlternativ;


            fokusLista.appendChild(option);

        }
    );

}


// ========================================
// UPPDATERAR MILJÖ
// ========================================

function uppdateraMiljo() {

    const valtMoment =
        document.getElementById("moment").value;

    const miljoLista =
        document.getElementById("miljo");


    miljoLista.innerHTML = "";


    if (!miljoer[valtMoment]) {
        return;
    }


    miljoer[valtMoment].forEach(
        function(miljoAlternativ) {

            const option =
                document.createElement("option");

            option.value =
                miljoAlternativ;

            option.textContent =
                miljoAlternativ;


            miljoLista.appendChild(option);

        }
    );

}


// ========================================
// UPPDATERAR PREPARAT
// ========================================

function uppdateraPreparat() {

    const valtMoment =
        document.getElementById("moment").value;

    const preparatLista =
        document.getElementById("preparat");


    preparatLista.innerHTML = "";


    if (
        valtMoment === "Lydnad" ||
        valtMoment === "Konsol" ||
        valtMoment === "Miljöträning"
    ) {

        const option =
            document.createElement("option");

        option.value =
            ingetPreparat;

        option.textContent =
            ingetPreparat;


        preparatLista.appendChild(option);

        preparatLista.value =
            ingetPreparat;

        preparatLista.disabled =
            true;

        return;

    }


    preparatLista.disabled =
        false;


    preparat.forEach(
        function(preparatAlternativ) {

            const option =
                document.createElement("option");

            option.value =
                preparatAlternativ;

            option.textContent =
                preparatAlternativ;


            preparatLista.appendChild(option);

        }
    );

}


// ========================================
// TYP ÄNDRAS
// ========================================

document
    .getElementById("moment")
    .addEventListener(
        "change",
        function() {

            uppdateraFokus();
            uppdateraMiljo();
            uppdateraPreparat();

        }
    );


// ========================================
// STARTA LISTOR
// ========================================

uppdateraFokus();
uppdateraMiljo();
uppdateraPreparat();


// ========================================
// BYTER VY
// ========================================

function visaVy(vy) {

    document
        .getElementById("start")
        .style.display = "none";

    document
        .getElementById("ny-traning")
        .style.display = "none";

    document
        .getElementById("loggbok")
        .style.display = "none";

    document
        .getElementById("uppfoljning")
        .style.display = "none";

    document
        .getElementById("installningar")
        .style.display = "none";

    document
        .getElementById("traning-detalj")
        .style.display = "none";


    document
        .getElementById(vy)
        .style.display = "block";


    if (vy === "loggbok") {

        visaLoggbok();

    }


    if (vy === "uppfoljning") {

        uppdateraUppfoljningsFilter();
        visaUppfoljning();

    }

}


visaVy("start");


// ========================================
// SPARA / REDIGERA TRÄNING
// ========================================

document
    .getElementById("spara")
    .addEventListener(
        "click",
        function() {

            let traning =
                hamtaFormular();

            traning =
                normaliseraTraning(traning);


            let traningar =
                hamtaTraningar();


            const redigerarId =
                localStorage.getItem(
                    "redigerarId"
                );


            // REDIGERAR

            if (redigerarId !== null) {

                const index =
                    traningar.findIndex(
                        function(item) {

                            return (
                                item.id ===
                                redigerarId
                            );

                        }
                    );


                if (index !== -1) {

                    traning.id =
                        redigerarId;

                    traningar[index] =
                        traning;


                    localStorage.setItem(
                        "traningar",
                        JSON.stringify(traningar)
                    );

                }


                localStorage.removeItem(
                    "redigerarId"
                );


                visaVy("loggbok");

                return;

            }


            // SKAPAR NY

            traning.id =
                crypto.randomUUID();


            traningar.push(
                traning
            );


            localStorage.setItem(
                "traningar",
                JSON.stringify(traningar)
            );


            visaVy("loggbok");

        }
    );


// ========================================
// VISA LOGGBOK
// ========================================

function visaLoggbok() {

    const lista =
        document.getElementById(
            "loggbok-lista"
        );


    lista.innerHTML = "";


    const traningar =
        hamtaTraningar();


    traningar.sort(
        function(a, b) {

            return (
                new Date(b.datum) -
                new Date(a.datum)
            );

        }
    );


    if (traningar.length === 0) {

        lista.innerHTML =
            "<p>Inga träningspass ännu.</p>";

        return;

    }


    traningar.forEach(
        function(traning) {

            const kort =
                document.createElement(
                    "article"
                );


            kort.className =
                "traning";


            kort.addEventListener(
                "click",
                function() {

                    visaDetaljer(
                        traning.id
                    );

                }
            );


            kort.innerHTML = `

                <h3>
                    ${traning.moment}
                </h3>

                <p>
                    ${traning.datum}
                </p>

            `;


            lista.appendChild(
                kort
            );

        }
    );

}


// ========================================
// VISA TRÄNINGSDETALJER
// ========================================

function visaDetaljer(id) {

    const traningar =
        hamtaTraningar();


    const traning =
        traningar.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!traning) {
        return;
    }


    localStorage.setItem(
        "redigerarId",
        traning.id
    );


    const innehall =
        document.getElementById(
            "detalj-innehall"
        );


    innehall.innerHTML = `

        <h3>
            ${traning.datum}
        </h3>

        <p>
            <strong>Typ:</strong>
            ${traning.moment}
        </p>

        <p>
            <strong>Fokus:</strong>
            ${traning.fokus}
        </p>

        <p>
            <strong>Miljö:</strong>
            ${traning.miljo}
        </p>

        <p>
            <strong>Preparat:</strong>
            ${traning.preparat || "Inget preparat"}
        </p>

        <p>
            <strong>Tillämpat:</strong>
            ${traning.tillampat}
        </p>

        <p>
            <strong>Resultat:</strong>
            ${traning.resultat}
        </p>

        <p>
            <strong>Svårighetsgrad:</strong>
            ${traning.svarighetsgrad}
        </p>

        <p>
            <strong>Kommentar:</strong>
            <br>
            ${traning.kommentar}
        </p>

    `;


    visaVy(
        "traning-detalj"
    );

}


// ========================================
// REDIGERA TRÄNING
// ========================================

document
    .getElementById("redigera")
    .addEventListener(
        "click",
        function() {

            const id =
                localStorage.getItem(
                    "redigerarId"
                );


            const traningar =
                hamtaTraningar();


            const traning =
                traningar.find(
                    function(item) {

                        return item.id === id;

                    }
                );


            if (!traning) {
                return;
            }


            document
                .getElementById("date")
                .value =
                traning.datum;


            document
                .getElementById("moment")
                .value =
                traning.moment;


            uppdateraFokus();
            uppdateraMiljo();
            uppdateraPreparat();


            document
                .getElementById("fokus")
                .value =
                traning.fokus;


            document
                .getElementById("miljo")
                .value =
                traning.miljo;


            document
                .getElementById("preparat")
                .value =
                traning.preparat ||
                ingetPreparat;


            document
                .getElementById("tillampat")
                .value =
                traning.tillampat;


            document
                .getElementById("resultat")
                .value =
                traning.resultat;


            document
                .getElementById("svårighetsgrad")
                .value =
                traning.svarighetsgrad;


            document
                .getElementById("kommentar")
                .value =
                traning.kommentar;


            visaVy(
                "ny-traning"
            );

        }
    );


// ========================================
// RADERA TRÄNING
// ========================================

document
    .getElementById("radera")
    .addEventListener(
        "click",
        function() {

            const bekräfta =
                confirm(
                    "Är du säker på att du vill radera träningen?"
                );


            if (!bekräfta) {
                return;
            }


            const id =
                localStorage.getItem(
                    "redigerarId"
                );


            let traningar =
                hamtaTraningar();


            traningar =
                traningar.filter(
                    function(traning) {

                        return (
                            traning.id !== id
                        );

                    }
                );


            localStorage.setItem(
                "traningar",
                JSON.stringify(traningar)
            );


            localStorage.removeItem(
                "redigerarId"
            );


            visaVy("loggbok");

        }
    );


// ========================================
// EXPORTERA
// ========================================

document
    .getElementById("exportera")
    .addEventListener(
        "click",
        function() {

            const traningar =
                localStorage.getItem(
                    "traningar"
                );


            const fil =
                new Blob(
                    [traningar],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(
                    fil
                );


            const länk =
                document.createElement(
                    "a"
                );


            länk.href =
                url;


            länk.download =
                "hundtraning-backup.json";


            länk.click();


            URL.revokeObjectURL(
                url
            );

        }
    );


// ========================================
// IMPORTERA
// ========================================

document
    .getElementById("importera")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("import-fil")
                .click();

        }
    );


document
    .getElementById("import-fil")
    .addEventListener(
        "change",
        function(event) {

            const fil =
                event.target.files[0];


            if (!fil) {
                return;
            }


            const lasare =
                new FileReader();


            lasare.onload =
                function() {

                    try {

                        const traningar =
                            JSON.parse(
                                lasare.result
                            );


                        if (
                            !Array.isArray(
                                traningar
                            )
                        ) {

                            throw new Error(
                                "Filen innehåller inte en lista med träningar."
                            );

                        }


                        const giltigData =
                            traningar.every(
                                function(traning) {

                                    return (

                                        typeof traning ===
                                            "object" &&

                                        traning !== null &&

                                        "datum" in
                                            traning &&

                                        "moment" in
                                            traning &&

                                        "fokus" in
                                            traning &&

                                        "miljo" in
                                            traning &&

                                        "tillampat" in
                                            traning &&

                                        "resultat" in
                                            traning &&

                                        "kommentar" in
                                            traning &&

                                        "svarighetsgrad" in
                                            traning

                                    );

                                }
                            );


                        if (!giltigData) {

                            throw new Error(
                                "Filen innehåller ogiltiga träningsdata."
                            );

                        }


                        traningar.forEach(
                            function(traning) {

                                normaliseraTraning(
                                    traning
                                );

                            }
                        );


                        localStorage.setItem(
                            "traningar",
                            JSON.stringify(
                                traningar
                            )
                        );


                        alert(
                            "Data importerad!"
                        );


                        event.target.value =
                            "";

                    }
                    catch (error) {

                        alert(
                            "Importen misslyckades.\n\n" +
                            error.message
                        );


                        event.target.value =
                            "";

                    }

                };


            lasare.onerror =
                function() {

                    alert(
                        "Det gick inte att läsa filen."
                    );


                    event.target.value =
                        "";

                };


            lasare.readAsText(
                fil
            );

        }
    );


// ========================================
// FORMATERA DATUM
// ========================================

function formateraDatum(datum) {

    return datum ||
        "Aldrig tränat";

}


// ========================================
// FILTRERA UPPFÖLJNING
// ========================================

function filtreraUppfoljningsData(
    data,
    valtTyp,
    valtFokus,
    valdMiljo
) {

    return data.filter(
        function(kombination) {

            if (
                valtTyp &&
                kombination.typ !== valtTyp
            ) {

                return false;

            }


            if (
                valtFokus &&
                kombination.fokus !== valtFokus
            ) {

                return false;

            }


            if (
                valdMiljo &&
                kombination.miljo !== valdMiljo
            ) {

                return false;

            }


            return true;

        }
    );

}


// ========================================
// UPPDATERA UPPFÖLJNINGSFILTER
// ========================================

function uppdateraUppfoljningsFilter() {

    const typLista =
        document.getElementById(
            "uppfoljning-typ"
        );


    const fokusLista =
        document.getElementById(
            "uppfoljning-fokus"
        );


    const miljoLista =
        document.getElementById(
            "uppfoljning-miljo"
        );


    const valtTyp =
        typLista.value;


    const tidigareFokus =
        fokusLista.value;


    const tidigareMiljo =
        miljoLista.value;


    fokusLista.innerHTML = "";

    miljoLista.innerHTML = "";


    const fokusAlla =
        document.createElement(
            "option"
        );


    fokusAlla.value = "";

    fokusAlla.textContent =
        "Alla fokus";


    fokusLista.appendChild(
        fokusAlla
    );


    const miljoAlla =
        document.createElement(
            "option"
        );


    miljoAlla.value = "";

    miljoAlla.textContent =
        "Alla miljöer";


    miljoLista.appendChild(
        miljoAlla
    );


    if (!valtTyp) {

        fokusLista.disabled =
            true;

        miljoLista.disabled =
            true;

        return;

    }


    fokusLista.disabled =
        false;

    miljoLista.disabled =
        false;


    (fokus[valtTyp] || []).forEach(
        function(fokusAlternativ) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                fokusAlternativ;


            option.textContent =
                fokusAlternativ;


            fokusLista.appendChild(
                option
            );

        }
    );


    (miljoer[valtTyp] || []).forEach(
        function(miljoAlternativ) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                miljoAlternativ;


            option.textContent =
                miljoAlternativ;


            miljoLista.appendChild(
                option
            );

        }
    );


    if (
        [...fokusLista.options].some(
            function(option) {

                return (
                    option.value ===
                    tidigareFokus
                );

            }
        )
    ) {

        fokusLista.value =
            tidigareFokus;

    }


    if (
        [...miljoLista.options].some(
            function(option) {

                return (
                    option.value ===
                    tidigareMiljo
                );

            }
        )
    ) {

        miljoLista.value =
            tidigareMiljo;

    }

}


// ========================================
// FILTER EVENTS
// ========================================

document
    .getElementById("uppfoljning-typ")
    .addEventListener(
        "change",
        function() {

            uppdateraUppfoljningsFilter();
            visaUppfoljning();

        }
    );


document
    .getElementById("uppfoljning-fokus")
    .addEventListener(
        "change",
        function() {

            visaUppfoljning();

        }
    );


document
    .getElementById("uppfoljning-miljo")
    .addEventListener(
        "change",
        function() {

            visaUppfoljning();

        }
    );


document
    .getElementById("uppfoljning-rensa")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "uppfoljning-typ"
                )
                .value = "";


            uppdateraUppfoljningsFilter();
            visaUppfoljning();

        }
    );


// ========================================
// VISA UPPFÖLJNING
// ========================================

function visaUppfoljning() {

    const traningar =
        hamtaTraningar();


    const status =
        hamtaOvergripandeStatus();


    // -------------------------------
    // ÖVERGRIPANDE LÄGE
    // -------------------------------

    document
        .getElementById("antal-traning")
        .textContent =
        traningar.length;


    document
        .getElementById("status-bla")
        .textContent =
        status.bla.procent.toFixed(0) +
        " %";


    document
        .getElementById("status-gron")
        .textContent =
        status.gron.procent.toFixed(0) +
        " %";


    document
        .getElementById("status-gul")
        .textContent =
        status.gul.procent.toFixed(0) +
        " %";


    document
        .getElementById("status-rod")
        .textContent =
        status.rod.procent.toFixed(0) +
        " %";


    document
        .getElementById("status-otranad")
        .textContent =
        status.otränad.procent.toFixed(0) +
        " %";


    document
        .getElementById("status-tackning")
        .textContent =
        status.tackning.antal +
        " / " +
        status.totalt;


    // -------------------------------
    // AKTIVA FILTER
    // -------------------------------

    const valtTyp =
        document
            .getElementById(
                "uppfoljning-typ"
            )
            .value;


    const valtFokus =
        document
            .getElementById(
                "uppfoljning-fokus"
            )
            .value;


    const valdMiljo =
        document
            .getElementById(
                "uppfoljning-miljo"
            )
            .value;


    const allData =
        skapaUppfoljningsData();


    const filtreradData =
        filtreraUppfoljningsData(
            allData,
            valtTyp,
            valtFokus,
            valdMiljo
        );


    const filtreradeTraningar =
        traningar.filter(
            function(traning) {

                if (
                    valtTyp &&
                    traning.moment !== valtTyp
                ) {

                    return false;

                }


                if (
                    valtFokus &&
                    traning.fokus !== valtFokus
                ) {

                    return false;

                }


                if (
                    valdMiljo &&
                    traning.miljo !== valdMiljo
                ) {

                    return false;

                }


                return true;

            }
        );


    // -------------------------------
    // FILTRERAT LÄGE
    // -------------------------------

    const antalFiltrerade =
        filtreradData.length;


    const antalTranade =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.antalTraning >
                    0
                );

            }
        ).length;


    const antalOtranade =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.antalTraning ===
                    0
                );

            }
        ).length;


    document
        .getElementById(
            "filtrerat-antal-kombinationer"
        )
        .textContent =
        antalFiltrerade;


    document
        .getElementById(
            "filtrerat-tackning"
        )
        .textContent =
        antalTranade +
        " / " +
        antalFiltrerade;


    document
        .getElementById(
            "filtrerat-traningar"
        )
        .textContent =
        filtreradeTraningar.length;


    document
        .getElementById(
            "filtrerat-otranade"
        )
        .textContent =
        antalOtranade;


    // -------------------------------
    // NIVÅER
    // -------------------------------

    for (
        let niva = 1;
        niva <= 5;
        niva++
    ) {

        const antal =
            filtreradData.filter(
                function(kombination) {

                    return (
                        kombination.niva ===
                        niva
                    );

                }
            ).length;


        document
            .getElementById(
                "filtrerat-niva" +
                niva
            )
            .textContent =
            antal;

    }


    // -------------------------------
    // VAD BEHÖVER TRÄNAS?
    // -------------------------------

    const behov =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.farg ===
                        "röd" ||
                    kombination.farg ===
                        "gul"
                );

            }
        );


    behov.sort(
        function(a, b) {

            if (
                a.farg === "röd" &&
                b.farg === "gul"
            ) {

                return -1;

            }


            if (
                a.farg === "gul" &&
                b.farg === "röd"
            ) {

                return 1;

            }


            if (
                a.niva !==
                b.niva
            ) {

                return (
                    a.niva -
                    b.niva
                );

            }


            if (
                a.antalTraning !==
                b.antalTraning
            ) {

                return (
                    a.antalTraning -
                    b.antalTraning
                );

            }


            if (
                a.senaste === null
            ) {

                return -1;

            }


            if (
                b.senaste === null
            ) {

                return 1;

            }


            return (
                new Date(a.senaste) -
                new Date(b.senaste)
            );

        }
    );


    const behovLista =
        document.getElementById(
            "behover-tranas"
        );


    const behovAntal =
        document.getElementById(
            "behov-antal"
        );


    behovLista.innerHTML =
        "";


    behovAntal.textContent =
        behov.length;


    if (behov.length === 0) {

        behovLista.innerHTML = `
            <p class="empty-state">
                Inga röda eller gula kombinationer just nu.
            </p>
        `;

    }
    else {

        // Visa endast de tre viktigaste direkt.

        behov
            .slice(0, 3)
            .forEach(
                function(kombination) {

                    const rad =
                        document.createElement(
                            "div"
                        );


                    rad.className =
                        "behov-rad " +
                        kombination.farg;


                    rad.innerHTML = `

                        <div>

                            <strong>
                                ${kombination.typ}
                            </strong>

                            <span>
                                ${kombination.fokus}
                                ·
                                ${kombination.miljo}
                            </span>

                        </div>


                        <strong class="niva">
                            Nivå
                            ${kombination.niva}
                        </strong>

                    `;


                    behovLista.appendChild(
                        rad
                    );

                }
            );


        // Resten bakom "Visa alla".

        if (behov.length > 3) {

            const detaljer =
                document.createElement(
                    "details"
                );


            detaljer.className =
                "behov-fler";


            const summary =
                document.createElement(
                    "summary"
                );


            summary.textContent =
                "Visa alla " +
                behov.length +
                " prioriteringar";


            detaljer.appendChild(
                summary
            );


            behov
                .slice(3)
                .forEach(
                    function(kombination) {

                        const rad =
                            document.createElement(
                                "div"
                            );


                        rad.className =
                            "behov-rad " +
                            kombination.farg;


                        rad.innerHTML = `

                            <div>

                                <strong>
                                    ${kombination.typ}
                                </strong>

                                <span>
                                    ${kombination.fokus}
                                    ·
                                    ${kombination.miljo}
                                </span>

                            </div>


                            <strong class="niva">
                                Nivå
                                ${kombination.niva}
                            </strong>

                        `;


                        detaljer.appendChild(
                            rad
                        );

                    }
                );


            behovLista.appendChild(
                detaljer
            );

        }

    }


    // -------------------------------
    // PREPARAT
    // -------------------------------

    const preparatData =
        hamtaPreparatStatistik();


    preparatData.sort(
        function(a, b) {

            return (
                b.totalt -
                a.totalt
            );

        }
    );


    const preparatLista =
        document.getElementById(
            "preparat-statistik"
        );


    preparatLista.innerHTML =
        "";


    preparatData.forEach(
        function(data) {

            const block =
                document.createElement(
                    "div"
                );


            const senasteText =
                formateraDatum(
                    data.senaste
                );


            block.innerHTML = `

                <div class="stat-row">

                    <strong>
                        ${data.preparat}
                    </strong>

                    <span>
                        ${data.totalt}
                        träningar
                    </span>

                </div>


                <p class="subtext">
                    Senast tränat:
                    ${senasteText}
                </p>


                <p>
                    Byggnad
                    ${data.perSoktyp["Byggnadssök"].antal}

                    ·

                    Fordon
                    ${data.perSoktyp["Fordonssök"].antal}

                    ·

                    Område
                    ${data.perSoktyp["Områdessök"].antal}

                    ·

                    Bagage
                    ${data.perSoktyp["Bagagessök"].antal}
                </p>

            `;


            preparatLista.appendChild(
                block
            );

        }
    );


    // -------------------------------
    // TOTAL SÖKTRÄNING
    // -------------------------------

    const soktyper = [

        "Byggnadssök",
        "Fordonssök",
        "Områdessök",
        "Bagagessök"

    ];


    const totalSoktyperLista =
        document.getElementById(
            "total-soktyper"
        );


    totalSoktyperLista.innerHTML =
        "";


    soktyper.forEach(
        function(soktyp) {

            const antal =
                filtreradeTraningar.filter(
                    function(traning) {

                        return (
                            traning.moment ===
                            soktyp
                        );

                    }
                ).length;


            const rad =
                document.createElement(
                    "div"
                );


            rad.className =
                "stat-row";


            rad.innerHTML = `

                <span>
                    ${soktyp}
                </span>

                <strong>
                    ${antal}
                </strong>

            `;


            totalSoktyperLista.appendChild(
                rad
            );

        }
    );


    // -------------------------------
    // SENAST TRÄNAT
    // -------------------------------

    const senastTranat =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.senaste !==
                    null
                );

            }
        );


    senastTranat.sort(
        function(a, b) {

            return (
                new Date(b.senaste) -
                new Date(a.senaste)
            );

        }
    );


    const senastTranatLista =
        document.getElementById(
            "senast-tranat"
        );


    senastTranatLista.innerHTML =
        "";


    senastTranat
        .slice(0, 5)
        .forEach(
            function(kombination) {

                const rad =
                    document.createElement(
                        "div"
                    );


                rad.className =
                    "stat-row";


                rad.innerHTML = `

                    <span>
                        ${kombination.typ}
                        ·
                        ${kombination.fokus}
                        ·
                        ${kombination.miljo}
                    </span>


                    <strong>
                        ${formateraDatum(
                            kombination.senaste
                        )}
                    </strong>

                `;


                senastTranatLista.appendChild(
                    rad
                );

            }
        );


    if (
        senastTranat.length === 0
    ) {

        senastTranatLista.innerHTML =
            `
                <p class="empty-state">
                    Ingen träning hittades.
                </p>
            `;

    }


    // -------------------------------
    // LÄNGST SEDAN TRÄNAT
    // -------------------------------

    const langstSedanTranat =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.senaste !==
                    null
                );

            }
        );


    langstSedanTranat.sort(
        function(a, b) {

            return (
                new Date(a.senaste) -
                new Date(b.senaste)
            );

        }
    );


    const langstSedanTranatLista =
        document.getElementById(
            "langst-sedan-tranat"
        );


    langstSedanTranatLista.innerHTML =
        "";


    langstSedanTranat
        .slice(0, 5)
        .forEach(
            function(kombination) {

                const rad =
                    document.createElement(
                        "div"
                    );


                rad.className =
                    "stat-row";


                rad.innerHTML = `

                    <span>
                        ${kombination.typ}
                        ·
                        ${kombination.fokus}
                        ·
                        ${kombination.miljo}
                    </span>


                    <strong>
                        ${formateraDatum(
                            kombination.senaste
                        )}
                    </strong>

                `;


                langstSedanTranatLista.appendChild(
                    rad
                );

            }
        );


    if (
        langstSedanTranat.length === 0
    ) {

        langstSedanTranatLista.innerHTML =
            `
                <p class="empty-state">
                    Ingen träning hittades.
                </p>
            `;

    }


    // -------------------------------
    // OTRÄNADE
    // -------------------------------

    const otranade =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.antalTraning ===
                    0
                );

            }
        );


    document
        .getElementById(
            "antal-otranade"
        )
        .textContent =
        otranade.length;


    const otranadeLista =
        document.getElementById(
            "otranade"
        );


    otranadeLista.innerHTML =
        "";


    typer.forEach(
        function(typ) {

            const otranadeForTyp =
                otranade.filter(
                    function(kombination) {

                        return (
                            kombination.typ ===
                            typ
                        );

                    }
                );


            if (
                otranadeForTyp.length === 0
            ) {

                return;

            }


            const block =
                document.createElement(
                    "details"
                );


            block.className =
                "otranad-grupp";


            const summary =
                document.createElement(
                    "summary"
                );


            summary.innerHTML = `

                <span>
                    ${typ}
                </span>

                <strong>
                    ${otranadeForTyp.length}
                </strong>

            `;


            block.appendChild(
                summary
            );


            const innehall =
                document.createElement(
                    "div"
                );


            innehall.className =
                "otranad-lista";


            otranadeForTyp.forEach(
                function(kombination) {

                    const rad =
                        document.createElement(
                            "p"
                        );


                    rad.textContent =
                        kombination.fokus +
                        " · " +
                        kombination.miljo;


                    innehall.appendChild(
                        rad
                    );

                }
            );


            block.appendChild(
                innehall
            );


            otranadeLista.appendChild(
                block
            );

        }
    );


    // -------------------------------
    // UTVECKLING ÖVER TID
    // -------------------------------

    const utveckling =
        hamtaUtvecklingOverTid(
            traningar,
            valtTyp,
            valtFokus,
            valdMiljo
        );


    const utvecklingLista =
        document.getElementById(
            "utveckling-over-tid"
        );


    utvecklingLista.innerHTML =
        "";


    utveckling.forEach(
        function(manad) {

            const rad =
                document.createElement(
                    "div"
                );


            rad.className =
                "stat-row";


            const snitt =
                manad.genomsnitt === null
                    ? "–"
                    : manad.genomsnitt.toFixed(
                        1
                    );


            rad.innerHTML = `

                <span>
                    ${manad.namn}
                </span>

                <strong>
                    ${manad.antal}
                    pass ·
                    ${snitt}
                    poäng
                </strong>

            `;


            utvecklingLista.appendChild(
                rad
            );

        }
    );

}


// ========================================
// UTVECKLING ÖVER TID
// ========================================

function hamtaUtvecklingOverTid(
    traningData,
    valtTyp,
    valtFokus,
    valdMiljo
) {

    const idag =
        new Date();


    const resultat =
        [];


    for (
        let i = 5;
        i >= 0;
        i--
    ) {

        const datum =
            new Date(
                idag.getFullYear(),
                idag.getMonth() - i,
                1
            );


        const ar =
            datum.getFullYear();


        const manad =
            datum.getMonth();


        const manadensTraningar =
            traningData.filter(
                function(traning) {

                    if (!traning.datum) {
                        return false;
                    }


                    const traningsDatum =
                        new Date(
                            traning.datum +
                            "T00:00:00"
                        );


                    if (
                        traningsDatum.getFullYear() !==
                        ar
                    ) {

                        return false;

                    }


                    if (
                        traningsDatum.getMonth() !==
                        manad
                    ) {

                        return false;

                    }


                    if (
                        valtTyp &&
                        traning.moment !==
                        valtTyp
                    ) {

                        return false;

                    }


                    if (
                        valtFokus &&
                        traning.fokus !==
                        valtFokus
                    ) {

                        return false;

                    }


                    if (
                        valdMiljo &&
                        traning.miljo !==
                        valdMiljo
                    ) {

                        return false;

                    }


                    return true;

                }
            );


        const poang =
            manadensTraningar
                .map(
                    function(traning) {

                        return raknaTraningspoang(
                            traning
                        );

                    }
                )
                .filter(
                    function(poang) {

                        return poang !== null;

                    }
                );


        let genomsnitt =
            null;


        if (
            poang.length > 0
        ) {

            const summa =
                poang.reduce(
                    function(
                        total,
                        aktuellPoang
                    ) {

                        return (
                            total +
                            aktuellPoang
                        );

                    },
                    0
                );


            genomsnitt =
                summa /
                poang.length;

        }


        const manadsnamn =
            datum.toLocaleDateString(
                "sv-SE",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        resultat.push({

            namn:
                manadsnamn,

            antal:
                manadensTraningar.length,

            genomsnitt:
                genomsnitt

        });

    }


    return resultat;

}


// ========================================
// SKAPA KOMBINATIONER
// ========================================

function skapaKombinationer() {

    const kombinationer =
        [];


    typer.forEach(
        function(typ) {

            const fokusForTyp =
                fokus[typ] || [];


            const miljoerForTyp =
                miljoer[typ] || [];


            fokusForTyp.forEach(
                function(fokusAlternativ) {

                    miljoerForTyp.forEach(
                        function(miljoAlternativ) {

                            kombinationer.push({

                                typ:
                                    typ,

                                fokus:
                                    fokusAlternativ,

                                miljo:
                                    miljoAlternativ

                            });

                        }
                    );

                }
            );

        }
    );


    return kombinationer;

}


// ========================================
// TRÄNINGSPOÄNG
// ========================================

function raknaTraningspoang(
    traning
) {

    const resultatPoang = {

        "Misslyckad": 1,

        "Behöver repeteras": 2,

        "Tränad": 4,

        "Godkänd": 5

    };


    const svarighetsPoang = {

        "Lätt": 1,

        "Mellan": 3,

        "Svår": 5

    };


    const resultat =
        resultatPoang[
            traning.resultat
        ];


    const svarighet =
        svarighetsPoang[
            traning.svarighetsgrad
        ];


    if (
        resultat === undefined ||
        svarighet === undefined
    ) {

        return null;

    }


    const poang =
        (
            resultat * 0.6
        ) +
        (
            svarighet * 0.4
        );


    return poang;

}


// ========================================
// RÄKNA NIVÅ
// ========================================

function raknaNiva(
    typ,
    valtFokus,
    valdMiljo
) {

    const traningar =
        hamtaTraningar();


    const matchandeTraningar =
        traningar.filter(
            function(traning) {

                return (

                    traning.moment ===
                        typ &&

                    traning.fokus ===
                        valtFokus &&

                    traning.miljo ===
                        valdMiljo

                );

            }
        );


    if (
        matchandeTraningar.length === 0
    ) {

        return null;

    }


    matchandeTraningar.sort(
        function(a, b) {

            return (
                new Date(b.datum) -
                new Date(a.datum)
            );

        }
    );


    const senaste =
        matchandeTraningar.slice(
            0,
            5
        );


    const poang =
        senaste
            .map(
                function(traning) {

                    return raknaTraningspoang(
                        traning
                    );

                }
            )
            .filter(
                function(poang) {

                    return poang !== null;

                }
            );


    if (
        poang.length === 0
    ) {

        return null;

    }


    const summa =
        poang.reduce(
            function(
                total,
                poang
            ) {

                return (
                    total +
                    poang
                );

            },
            0
        );


    const genomsnitt =
        summa /
        poang.length;


    return genomsnitt;

}


// ========================================
// NIVÅ
// ========================================

function hamtaNiva(
    typ,
    valtFokus,
    valdMiljo
) {

    const traningar =
        hamtaTraningar();


    const matchandeTraningar =
        traningar.filter(
            function(traning) {

                return (

                    traning.moment ===
                        typ &&

                    traning.fokus ===
                        valtFokus &&

                    traning.miljo ===
                        valdMiljo

                );

            }
        );


    if (
        matchandeTraningar.length === 0
    ) {

        return null;

    }


    const poang =
        raknaNiva(
            typ,
            valtFokus,
            valdMiljo
        );


    if (
        poang === null
    ) {

        return null;

    }


    if (
        poang >= 4.5 &&
        matchandeTraningar.length >= 3
    ) {

        return 5;

    }


    if (
        poang >= 3.5
    ) {

        return 4;

    }


    if (
        poang >= 3.0
    ) {

        return 3;

    }


    if (
        poang >= 2.0
    ) {

        return 2;

    }


    return 1;

}


// ========================================
// NIVÅFÄRG
// ========================================

function hamtaNivaFarg(
    niva
) {

    if (
        niva === null
    ) {

        return null;

    }


    if (
        niva <= 2
    ) {

        return "röd";

    }


    if (
        niva === 3
    ) {

        return "gul";

    }


    if (
        niva === 4
    ) {

        return "grön";

    }


    if (
        niva === 5
    ) {

        return "blå";

    }

}


// ========================================
// SKAPA UPPFÖLJNINGSDATA
// ========================================

function skapaUppfoljningsData() {

    const kombinationer =
        skapaKombinationer();


    const traningar =
        hamtaTraningar();


    return kombinationer.map(
        function(kombination) {

            const matchandeTraningar =
                traningar.filter(
                    function(traning) {

                        return (

                            traning.moment ===
                                kombination.typ &&

                            traning.fokus ===
                                kombination.fokus &&

                            traning.miljo ===
                                kombination.miljo

                        );

                    }
                );


            const niva =
                hamtaNiva(
                    kombination.typ,
                    kombination.fokus,
                    kombination.miljo
                );


            let senaste =
                null;


            if (
                matchandeTraningar.length > 0
            ) {

                matchandeTraningar.sort(
                    function(a, b) {

                        return (
                            new Date(b.datum) -
                            new Date(a.datum)
                        );

                    }
                );


                senaste =
                    matchandeTraningar[0]
                        .datum;

            }


            return {

                typ:
                    kombination.typ,

                fokus:
                    kombination.fokus,

                miljo:
                    kombination.miljo,

                niva:
                    niva,

                farg:
                    hamtaNivaFarg(niva),

                senaste:
                    senaste,

                antalTraning:
                    matchandeTraningar.length

            };

        }
    );

}


// ========================================
// ÖVERGRIPANDE LÄGE
// ========================================

function raknaOvergripandeLage() {

    const data =
        skapaUppfoljningsData();


    let rod = 0;
    let gul = 0;
    let gron = 0;
    let bla = 0;
    let otränad = 0;


    data.forEach(
        function(kombination) {

            if (
                kombination.farg ===
                "röd"
            ) {

                rod++;

            }


            if (
                kombination.farg ===
                "gul"
            ) {

                gul++;

            }


            if (
                kombination.farg ===
                "grön"
            ) {

                gron++;

            }


            if (
                kombination.farg ===
                "blå"
            ) {

                bla++;

            }


            if (
                kombination.antalTraning ===
                0
            ) {

                otränad++;

            }

        }
    );


    return {

        rod:
            rod,

        gul:
            gul,

        gron:
            gron,

        bla:
            bla,

        otränad:
            otränad,

        totalt:
            data.length

    };

}


// ========================================
// VAD BEHÖVER TRÄNAS?
// ========================================

function hamtaVadBehoverTranas() {

    const data =
        skapaUppfoljningsData();


    const behov =
        data.filter(
            function(kombination) {

                return (

                    kombination.farg ===
                        "röd" ||

                    kombination.farg ===
                        "gul"

                );

            }
        );


    behov.sort(
        function(a, b) {

            if (
                a.farg === "röd" &&
                b.farg === "gul"
            ) {

                return -1;

            }


            if (
                a.farg === "gul" &&
                b.farg === "röd"
            ) {

                return 1;

            }


            if (
                a.niva !== b.niva
            ) {

                return (
                    a.niva -
                    b.niva
                );

            }


            if (
                a.antalTraning !==
                b.antalTraning
            ) {

                return (
                    a.antalTraning -
                    b.antalTraning
                );

            }


            if (
                a.senaste === null
            ) {

                return -1;

            }


            if (
                b.senaste === null
            ) {

                return 1;

            }


            return (
                new Date(a.senaste) -
                new Date(b.senaste)
            );

        }
    );


    return behov;

}


// ========================================
// OTRÄNADE
// ========================================

function hamtaOtränade() {

    const data =
        skapaUppfoljningsData();


    return data.filter(
        function(kombination) {

            return (
                kombination.antalTraning ===
                0
            );

        }
    );

}


// ========================================
// LÄNGST SEDAN TRÄNAT
// ========================================

function hamtaLangstSedanTranat() {

    const data =
        skapaUppfoljningsData();


    const tranade =
        data.filter(
            function(kombination) {

                return (
                    kombination.senaste !==
                    null
                );

            }
        );


    tranade.sort(
        function(a, b) {

            return (
                new Date(a.senaste) -
                new Date(b.senaste)
            );

        }
    );


    return tranade;

}


// ========================================
// SENAST TRÄNAT
// ========================================

function hamtaSenastTranat() {

    const data =
        skapaUppfoljningsData();


    const tranade =
        data.filter(
            function(kombination) {

                return (
                    kombination.senaste !==
                    null
                );

            }
        );


    tranade.sort(
        function(a, b) {

            return (
                new Date(b.senaste) -
                new Date(a.senaste)
            );

        }
    );


    return tranade;

}


// ========================================
// PREPARATSTATISTIK
// ========================================

function hamtaPreparatStatistik() {

    const traningar =
        hamtaTraningar();


    const soktyper = [

        "Byggnadssök",
        "Fordonssök",
        "Områdessök",
        "Bagagessök"

    ];


    return preparat.map(
        function(preparatNamn) {

            const traningarMedPreparat =
                traningar.filter(
                    function(traning) {

                        return (
                            traning.preparat ===
                            preparatNamn
                        );

                    }
                );


            let senaste =
                null;


            if (
                traningarMedPreparat.length > 0
            ) {

                traningarMedPreparat.sort(
                    function(a, b) {

                        return (
                            new Date(b.datum) -
                            new Date(a.datum)
                        );

                    }
                );


                senaste =
                    traningarMedPreparat[0]
                        .datum;

            }


            const perSoktyp =
                {};


            soktyper.forEach(
                function(soktyp) {

                    const traningarForSoktyp =
                        traningarMedPreparat.filter(
                            function(traning) {

                                return (
                                    traning.moment ===
                                    soktyp
                                );

                            }
                        );


                    let senasteForSoktyp =
                        null;


                    if (
                        traningarForSoktyp.length >
                        0
                    ) {

                        traningarForSoktyp.sort(
                            function(a, b) {

                                return (
                                    new Date(b.datum) -
                                    new Date(a.datum)
                                );

                            }
                        );


                        senasteForSoktyp =
                            traningarForSoktyp[0]
                                .datum;

                    }


                    perSoktyp[soktyp] = {

                        antal:
                            traningarForSoktyp.length,

                        senaste:
                            senasteForSoktyp

                    };

                }
            );


            return {

                preparat:
                    preparatNamn,

                totalt:
                    traningarMedPreparat.length,

                senaste:
                    senaste,

                perSoktyp:
                    perSoktyp

            };

        }
    );

}


// ========================================
// PROCENT
// ========================================

function raknaProcentOvergripande() {

    const lage =
        raknaOvergripandeLage();


    if (
        lage.totalt === 0
    ) {

        return {

            bla: 0,

            gron: 0,

            gul: 0,

            rod: 0,

            otränad: 0,

            tackning: 0

        };

    }


    return {

        bla:
            (
                lage.bla /
                lage.totalt
            ) * 100,

        gron:
            (
                lage.gron /
                lage.totalt
            ) * 100,

        gul:
            (
                lage.gul /
                lage.totalt
            ) * 100,

        rod:
            (
                lage.rod /
                lage.totalt
            ) * 100,

        otränad:
            (
                lage.otränad /
                lage.totalt
            ) * 100,

        tackning:
            (
                (
                    lage.totalt -
                    lage.otränad
                ) /
                lage.totalt
            ) * 100

    };

}


// ========================================
// HÄMTA ÖVERGRIPANDE STATUS
// ========================================

function hamtaOvergripandeStatus() {

    const data =
        skapaUppfoljningsData();


    const procent =
        raknaProcentOvergripande();


    return {

        totalt:
            data.length,


        bla: {

            antal:
                data.filter(
                    function(kombination) {

                        return (
                            kombination.farg ===
                            "blå"
                        );

                    }
                ).length,

            procent:
                procent.bla

        },


        gron: {

            antal:
                data.filter(
                    function(kombination) {

                        return (
                            kombination.farg ===
                            "grön"
                        );

                    }
                ).length,

            procent:
                procent.gron

        },


        gul: {

            antal:
                data.filter(
                    function(kombination) {

                        return (
                            kombination.farg ===
                            "gul"
                        );

                    }
                ).length,

            procent:
                procent.gul

        },


        rod: {

            antal:
                data.filter(
                    function(kombination) {

                        return (
                            kombination.farg ===
                            "röd"
                        );

                    }
                ).length,

            procent:
                procent.rod

        },


        otränad: {

            antal:
                data.filter(
                    function(kombination) {

                        return (
                            kombination.antalTraning ===
                            0
                        );

                    }
                ).length,

            procent:
                procent.otränad

        },


        tackning: {

            antal:
                data.filter(
                    function(kombination) {

                        return (
                            kombination.antalTraning >
                            0
                        );

                    }
                ).length,

            procent:
                procent.tackning

        }

    };

}


// ========================================
// ALLA KOMBINATIONER
// ========================================

function hamtaAllaKombinationerMedData() {

    const data =
        skapaUppfoljningsData();


    return data.map(
        function(kombination) {

            return {

                typ:
                    kombination.typ,

                fokus:
                    kombination.fokus,

                miljo:
                    kombination.miljo,

                niva:
                    kombination.niva,

                farg:
                    kombination.farg,

                senaste:
                    kombination.senaste,

                antalTraning:
                    kombination.antalTraning

            };

        }
    );

}