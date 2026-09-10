const typer = [
    "Byggnadssök",
    "Fordonssök",
    "Områdessök",
    "Bagagessök",
    "Lydnad",
    "Konsol",
    "Miljöträning"
];

const soktyper = [
    "Byggnadssök",
    "Fordonssök",
    "Områdessök",
    "Bagagessök"
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


// ==============================
// DATA
// ==============================

function normaliseraTraning(traning) {

    if (!traning || typeof traning !== "object") {
        return null;
    }

    const moment =
        typeof traning.moment === "string"
            ? traning.moment
            : "";

    let normaliseratFokus =
        typeof traning.fokus === "string"
            ? traning.fokus
            : "";

    // Rättar äldre stavning
    normaliseratFokus =
        normaliseratFokus.replace(
            "Helhetssmoment/metod",
            "Helhetsmoment/metod"
        );

    let normaliseratPreparat =
        typeof traning.preparat === "string"
            ? traning.preparat
            : "";

    // Gamla poster utan preparat får ett neutralt värde
    if (!normaliseratPreparat) {
        normaliseratPreparat = ingetPreparat;
    }

    // Icke-söktyper ska alltid ha Inget preparat
    if (!soktyper.includes(moment)) {
        normaliseratPreparat = ingetPreparat;
    }

    return {
        id:
            traning.id ||
            crypto.randomUUID(),

        datum:
            typeof traning.datum === "string"
                ? traning.datum
                : "",

        moment:
            moment,

        fokus:
            normaliseratFokus,

        miljo:
            typeof traning.miljo === "string"
                ? traning.miljo
                : "",

        preparat:
            normaliseratPreparat,

        tillampat:
            typeof traning.tillampat === "string"
                ? traning.tillampat
                : "",

        resultat:
            typeof traning.resultat === "string"
                ? traning.resultat
                : "",

        kommentar:
            typeof traning.kommentar === "string"
                ? traning.kommentar
                : "",

        svarighetsgrad:
            typeof traning.svarighetsgrad === "string"
                ? traning.svarighetsgrad
                : ""
    };
}


function hamtaTraningar() {

    let traningar = [];

    try {

        traningar =
            JSON.parse(
                localStorage.getItem("traningar")
            ) || [];

    } catch (error) {

        console.error(
            "Kunde inte läsa sparad träningsdata:",
            error
        );

        return [];
    }


    if (!Array.isArray(traningar)) {
        return [];
    }


    const normaliserade =
        traningar
            .map(normaliseraTraning)
            .filter(function(traning) {
                return traning !== null;
            });


    const gammalData =
        JSON.stringify(traningar);

    const nyData =
        JSON.stringify(normaliserade);


    if (gammalData !== nyData) {

        localStorage.setItem(
            "traningar",
            nyData
        );

    }


    return normaliserade;
}


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
            document
                .getElementById("kommentar")
                .value
                .trim(),

        svarighetsgrad:
            document.getElementById("svårighetsgrad").value
    };
}


// ==============================
// FORMULÄR
// ==============================

function fyllTypLista() {

    const lista =
        document.getElementById("moment");

    lista.innerHTML = "";


    typer.forEach(function(typ) {

        const option =
            document.createElement("option");

        option.value = typ;
        option.textContent = typ;

        lista.appendChild(option);

    });
}


function uppdateraFokus() {

    const valtMoment =
        document.getElementById("moment").value;

    const fokusLista =
        document.getElementById("fokus");

    fokusLista.innerHTML = "";


    (
        fokus[valtMoment] || []
    ).forEach(function(fokusAlternativ) {

        const option =
            document.createElement("option");

        option.value =
            fokusAlternativ;

        option.textContent =
            fokusAlternativ;

        fokusLista.appendChild(option);

    });
}


function uppdateraMiljo() {

    const valtMoment =
        document.getElementById("moment").value;

    const miljoLista =
        document.getElementById("miljo");

    miljoLista.innerHTML = "";


    (
        miljoer[valtMoment] || []
    ).forEach(function(miljoAlternativ) {

        const option =
            document.createElement("option");

        option.value =
            miljoAlternativ;

        option.textContent =
            miljoAlternativ;

        miljoLista.appendChild(option);

    });
}


function fyllPreparatLista() {

    const lista =
        document.getElementById("preparat");

    lista.innerHTML = "";


    const ingetOption =
        document.createElement("option");

    ingetOption.value =
        ingetPreparat;

    ingetOption.textContent =
        ingetPreparat;

    lista.appendChild(
        ingetOption
    );


    preparat.forEach(function(preparatAlternativ) {

        const option =
            document.createElement("option");

        option.value =
            preparatAlternativ;

        option.textContent =
            preparatAlternativ;

        lista.appendChild(
            option
        );

    });
}


function uppdateraPreparat() {

    const valtMoment =
        document.getElementById("moment").value;

    const preparatLista =
        document.getElementById("preparat");


    const preparatArRelevant =
        soktyper.includes(valtMoment);


    if (!preparatArRelevant) {

        preparatLista.value =
            ingetPreparat;

        preparatLista.disabled =
            true;

        return;
    }


    preparatLista.disabled =
        false;


    if (
        !preparat.includes(
            preparatLista.value
        )
    ) {

        preparatLista.value =
            ingetPreparat;

    }
}


function valideraFormular(traning) {

    const fel = [];


    if (!traning.datum) {
        fel.push("Datum");
    }


    if (!traning.moment) {
        fel.push("Typ");
    }


    if (!traning.fokus) {
        fel.push("Fokus");
    }


    if (!traning.miljo) {
        fel.push("Miljö");
    }


    if (
        soktyper.includes(
            traning.moment
        )
    ) {

        if (
            !preparat.includes(
                traning.preparat
            )
        ) {

            fel.push(
                "Ett riktigt preparat"
            );

        }

    } else {

        if (
            traning.preparat !==
            ingetPreparat
        ) {

            fel.push(
                "Preparat ska vara 'Inget preparat'"
            );

        }

    }


    if (!traning.tillampat) {
        fel.push("Tillämpat?");
    }


    if (!traning.resultat) {
        fel.push("Resultat");
    }


    if (!traning.svarighetsgrad) {
        fel.push("Svårighetsgrad");
    }


    if (fel.length > 0) {

        alert(
            "Kontrollera följande:\n\n" +
            fel.join("\n")
        );

        return false;
    }


    return true;
}


// ==============================
// NAVIGATION
// ==============================

function visaVy(vy) {

    const vyer = [
        "start",
        "ny-traning",
        "loggbok",
        "uppfoljning",
        "installningar",
        "traning-detalj"
    ];


    vyer.forEach(function(vyId) {

        document
            .getElementById(vyId)
            .style.display =
            "none";

    });


    document
        .getElementById(vy)
        .style.display =
        "block";


    if (vy === "loggbok") {

        uppdateraLoggboksFilter();
        visaLoggbok();

    }


    if (vy === "uppfoljning") {

        uppdateraUppfoljningsFilter();
        visaUppfoljning();

    }
}


// ==============================
// SPARA
// ==============================

document
    .getElementById("spara")
    .addEventListener(
        "click",
        function() {

            const traning =
                hamtaFormular();


            if (
                !valideraFormular(
                    traning
                )
            ) {

                return;

            }


            let traningar =
                hamtaTraningar();


            const redigerarId =
                localStorage.getItem(
                    "redigerarId"
                );


            if (
                redigerarId !== null
            ) {

                const index =
                    traningar.findIndex(
                        function(item) {

                            return (
                                item.id ===
                                redigerarId
                            );

                        }
                    );


                if (
                    index === -1
                ) {

                    alert(
                        "Träningen kunde inte hittas."
                    );

                    localStorage.removeItem(
                        "redigerarId"
                    );

                    return;
                }


                traning.id =
                    redigerarId;


                traningar[index] =
                    traning;


                localStorage.setItem(
                    "traningar",
                    JSON.stringify(
                        traningar
                    )
                );


                localStorage.removeItem(
                    "redigerarId"
                );


                visaVy(
                    "loggbok"
                );

                return;
            }


            traning.id =
                crypto.randomUUID();


            traningar.push(
                traning
            );


            localStorage.setItem(
                "traningar",
                JSON.stringify(
                    traningar
                )
            );


            visaVy(
                "loggbok"
            );

        }
    );


// ==============================
// LOGGBOK
// ==============================

function hamtaLoggboksFilter() {

    return {

        sok:
            document
                .getElementById("loggbok-sok")
                .value
                .trim()
                .toLowerCase(),

        typ:
            document
                .getElementById("loggbok-typ")
                .value,

        fokus:
            document
                .getElementById("loggbok-fokus")
                .value,

        miljo:
            document
                .getElementById("loggbok-miljo")
                .value,

        preparat:
            document
                .getElementById("loggbok-preparat")
                .value

    };
}


function filtreraLoggbok(
    traning,
    filter
) {

    const soktext = [

        traning.datum,

        traning.moment,

        traning.fokus,

        traning.miljo,

        traning.preparat,

        traning.tillampat,

        traning.resultat,

        traning.svarighetsgrad,

        traning.kommentar

    ]
        .join(" ")
        .toLowerCase();


    if (
        filter.sok &&
        !soktext.includes(
            filter.sok
        )
    ) {

        return false;

    }


    if (
        filter.typ &&
        traning.moment !==
            filter.typ
    ) {

        return false;

    }


    if (
        filter.fokus &&
        traning.fokus !==
            filter.fokus
    ) {

        return false;

    }


    if (
        filter.miljo &&
        traning.miljo !==
            filter.miljo
    ) {

        return false;

    }


    if (
        filter.preparat &&
        traning.preparat !==
            filter.preparat
    ) {

        return false;

    }


    return true;
}


function uppdateraLoggboksFilter() {

    const typLista =
        document.getElementById(
            "loggbok-typ"
        );

    const fokusLista =
        document.getElementById(
            "loggbok-fokus"
        );

    const miljoLista =
        document.getElementById(
            "loggbok-miljo"
        );


    if (
        !typLista ||
        !fokusLista ||
        !miljoLista
    ) {

        return;

    }


    const valtTyp =
        typLista.value;


    const tidigareFokus =
        fokusLista.value;


    const tidigareMiljo =
        miljoLista.value;


    fokusLista.innerHTML =
        '<option value="">Alla fokus</option>';


    miljoLista.innerHTML =
        '<option value="">Alla miljöer</option>';


    fokusLista.disabled =
        !valtTyp;


    miljoLista.disabled =
        !valtTyp;


    if (!valtTyp) {

        return;

    }


    (
        fokus[valtTyp] || []
    ).forEach(function(fokusAlternativ) {

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

    });


    (
        miljoer[valtTyp] || []
    ).forEach(function(miljoAlternativ) {

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

    });


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


function rensaLoggboksFilter() {

    document.getElementById(
        "loggbok-sok"
    ).value = "";


    document.getElementById(
        "loggbok-typ"
    ).value = "";


    document.getElementById(
        "loggbok-preparat"
    ).value = "";


    uppdateraLoggboksFilter();

    visaLoggbok();
}


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


    const filter =
        hamtaLoggboksFilter();


    const filtrerade =
        traningar.filter(
            function(traning) {

                return filtreraLoggbok(
                    traning,
                    filter
                );

            }
        );


    const resultatText =
        document.getElementById(
            "loggbok-resultat"
        );


    resultatText.textContent =
        filtrerade.length +
        " av " +
        traningar.length +
        " träningspass";


    if (
        filtrerade.length ===
        0
    ) {

        lista.innerHTML =
            "<p>Inga träningspass matchar filtreringen.</p>";

        return;

    }


    filtrerade.forEach(
        function(traning) {

            const kort =
                document.createElement(
                    "article"
                );


            kort.innerHTML = `
                <h3>${traning.datum}</h3>

                <p>
                    <strong>
                        ${traning.moment}
                    </strong>
                </p>

                <p>
                    ${traning.fokus} ·
                    ${traning.miljo}
                </p>

                <p>
                    Preparat:
                    ${traning.preparat || "Inget preparat"}
                </p>

                <p>
                    Resultat:
                    ${traning.resultat}
                    ·
                    Svårighetsgrad:
                    ${traning.svarighetsgrad}
                </p>

                <p>
                    ${traning.kommentar}
                </p>
            `;


            kort.addEventListener(
                "click",
                function() {

                    visaDetaljer(
                        traning.id
                    );

                }
            );


            lista.appendChild(
                kort
            );

        }
    );
}


document
    .getElementById("loggbok-sok")
    .addEventListener(
        "input",
        visaLoggbok
    );


document
    .getElementById("loggbok-typ")
    .addEventListener(
        "change",
        function() {

            uppdateraLoggboksFilter();
            visaLoggbok();

        }
    );


document
    .getElementById("loggbok-fokus")
    .addEventListener(
        "change",
        visaLoggbok
    );


document
    .getElementById("loggbok-miljo")
    .addEventListener(
        "change",
        visaLoggbok
    );


document
    .getElementById("loggbok-preparat")
    .addEventListener(
        "change",
        visaLoggbok
    );


document
    .getElementById("loggbok-rensa")
    .addEventListener(
        "click",
        rensaLoggboksFilter
    );


// ==============================
// DETALJER
// ==============================

function visaDetaljer(id) {

    const traningar =
        hamtaTraningar();


    const traning =
        traningar.find(
            function(item) {

                return (
                    item.id === id
                );

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
        <h3>${traning.datum}</h3>

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
            <strong>Kommentar:</strong><br>
            ${traning.kommentar || "Ingen kommentar"}
        </p>
    `;


    visaVy(
        "traning-detalj"
    );
}


// ==============================
// REDIGERA
// ==============================

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

                        return (
                            item.id === id
                        );

                    }
                );


            if (!traning) {

                return;

            }


            document.getElementById(
                "date"
            ).value =
                traning.datum;


            document.getElementById(
                "moment"
            ).value =
                traning.moment;


            uppdateraFokus();
            uppdateraMiljo();
            uppdateraPreparat();


            document.getElementById(
                "fokus"
            ).value =
                traning.fokus;


            document.getElementById(
                "miljo"
            ).value =
                traning.miljo;


            if (
                soktyper.includes(
                    traning.moment
                )
            ) {

                document.getElementById(
                    "preparat"
                ).value =
                    preparat.includes(
                        traning.preparat
                    )
                        ? traning.preparat
                        : ingetPreparat;

            } else {

                document.getElementById(
                    "preparat"
                ).value =
                    ingetPreparat;

            }


            document.getElementById(
                "tillampat"
            ).value =
                traning.tillampat;


            document.getElementById(
                "resultat"
            ).value =
                traning.resultat;


            document.getElementById(
                "svårighetsgrad"
            ).value =
                traning.svarighetsgrad;


            document.getElementById(
                "kommentar"
            ).value =
                traning.kommentar;


            visaVy(
                "ny-traning"
            );

        }
    );


// ==============================
// RADERA
// ==============================

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
                            traning.id !==
                            id
                        );

                    }
                );


            localStorage.setItem(
                "traningar",
                JSON.stringify(
                    traningar
                )
            );


            localStorage.removeItem(
                "redigerarId"
            );


            visaVy(
                "loggbok"
            );

        }
    );


// ==============================
// EXPORT
// ==============================

document
    .getElementById("exportera")
    .addEventListener(
        "click",
        function() {

            const traningar =
                hamtaTraningar();


            const fil =
                new Blob(
                    [
                        JSON.stringify(
                            traningar,
                            null,
                            2
                        )
                    ],
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


            document.body.appendChild(
                länk
            );


            länk.click();


            länk.remove();


            URL.revokeObjectURL(
                url
            );

        }
    );


// ==============================
// IMPORT
// ==============================

document
    .getElementById("importera")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "import-fil"
                )
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

                        const importeradData =
                            JSON.parse(
                                lasare.result
                            );


                        if (
                            !Array.isArray(
                                importeradData
                            )
                        ) {

                            throw new Error(
                                "Filen innehåller inte en lista med träningar."
                            );

                        }


                        const normaliserade =
                            importeradData
                                .map(
                                    normaliseraTraning
                                )
                                .filter(
                                    function(traning) {

                                        return (
                                            traning !==
                                            null
                                        );

                                    }
                                );


                        if (
                            normaliserade.length ===
                                0 &&
                            importeradData.length >
                                0
                        ) {

                            throw new Error(
                                "Inga giltiga träningsposter hittades."
                            );

                        }


                        localStorage.setItem(
                            "traningar",
                            JSON.stringify(
                                normaliserade
                            )
                        );


                        alert(
                            "Data importerad!\n\n" +
                            normaliserade.length +
                            " träningsposter importerades."
                        );


                        event.target.value =
                            "";


                        visaVy(
                            "loggbok"
                        );


                    } catch (error) {

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


// ==============================
// NIVÅSYSTEM
// ==============================

function skapaKombinationer() {

    const kombinationer = [];


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


function raknaTraningspoang(traning) {

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


    return (
        (resultat * 0.6) +
        (svarighet * 0.4)
    );
}


function raknaNiva(
    typ,
    valtFokus,
    valdMiljo
) {

    const matchandeTraningar =
        hamtaTraningar()
            .filter(
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
        matchandeTraningar.length ===
        0
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

                    return (
                        raknaTraningspoang(
                            traning
                        )
                    );

                }
            )
            .filter(
                function(poang) {

                    return (
                        poang !== null
                    );

                }
            );


    if (
        poang.length ===
        0
    ) {

        return null;

    }


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


    return (
        summa /
        poang.length
    );
}


function hamtaNiva(
    typ,
    valtFokus,
    valdMiljo
) {

    const matchandeTraningar =
        hamtaTraningar()
            .filter(
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
        matchandeTraningar.length ===
        0
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


function hamtaNivaFarg(niva) {

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


    return null;
}


function skapaUppfoljningsData() {

    const traningar =
        hamtaTraningar();


    return skapaKombinationer()
        .map(
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
                    matchandeTraningar.length >
                    0
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
                        matchandeTraningar[0].datum;

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
                        hamtaNivaFarg(
                            niva
                        ),

                    senaste:
                        senaste,

                    antalTraning:
                        matchandeTraningar.length

                };

            }
        );
}


function raknaLageFranData(data) {

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


// ==============================
// PREPARATSTATISTIK
// ==============================

function hamtaPreparatStatistik() {

    const traningar =
        hamtaTraningar();


    return preparat.map(
        function(preparatNamn) {

            const traningarMedPreparat =
                traningar.filter(
                    function(traning) {

                        return (
                            traning.preparat ===
                                preparatNamn &&
                            soktyper.includes(
                                traning.moment
                            )
                        );

                    }
                );


            let senaste =
                null;


            if (
                traningarMedPreparat.length >
                0
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


            const perSoktyp = {};


            soktyper.forEach(
                function(soktyp) {

                    const traningarForSoktyp =
                        traningarMedPreparat
                            .filter(
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


// ==============================
// UTVECKLING
// ==============================

function hamtaUtvecklingOverTid(
    traningData,
    valtTyp,
    valtFokus,
    valdMiljo
) {

    const idag =
        new Date();


    const resultat = [];


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

                    if (
                        !traning.datum
                    ) {

                        return false;

                    }


                    const traningsDatum =
                        new Date(
                            traning.datum +
                            "T00:00:00"
                        );


                    if (
                        traningsDatum
                            .getFullYear() !==
                            ar ||
                        traningsDatum
                            .getMonth() !==
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

                        return (
                            raknaTraningspoang(
                                traning
                            )
                        );

                    }
                )
                .filter(
                    function(poang) {

                        return (
                            poang !== null
                        );

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


        resultat.push({

            namn:
                datum.toLocaleDateString(
                    "sv-SE",
                    {
                        month: "long",
                        year: "numeric"
                    }
                ),

            antal:
                manadensTraningar.length,

            genomsnitt:
                genomsnitt

        });

    }


    return resultat;
}


function hamtaVeckostatistik(
    traningData
) {

    const idag =
        new Date();


    const resultat = [];


    for (
        let i = 7;
        i >= 0;
        i--
    ) {

        const slut =
            new Date(idag);


        slut.setHours(
            23,
            59,
            59,
            999
        );


        slut.setDate(
            idag.getDate() -
            (i * 7)
        );


        const start =
            new Date(slut);


        start.setDate(
            slut.getDate() -
            6
        );


        start.setHours(
            0,
            0,
            0,
            0
        );


        const veckansTraningar =
            traningData.filter(
                function(traning) {

                    if (
                        !traning.datum
                    ) {

                        return false;

                    }


                    const datum =
                        new Date(
                            traning.datum +
                            "T00:00:00"
                        );


                    return (
                        datum >= start &&
                        datum <= slut
                    );

                }
            );


        resultat.push({

            namn:
                start.toLocaleDateString(
                    "sv-SE",
                    {
                        day: "numeric",
                        month: "short"
                    }
                ) +
                "–" +
                slut.toLocaleDateString(
                    "sv-SE",
                    {
                        day: "numeric",
                        month: "short"
                    }
                ),

            antal:
                veckansTraningar.length

        });

    }


    return resultat;
}


// ==============================
// UPPFÖLJNING
// ==============================

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
                kombination.typ !==
                    valtTyp
            ) {

                return false;

            }


            if (
                valtFokus &&
                kombination.fokus !==
                    valtFokus
            ) {

                return false;

            }


            if (
                valdMiljo &&
                kombination.miljo !==
                    valdMiljo
            ) {

                return false;

            }


            return true;

        }
    );
}


function raknaProcent(
    antal,
    totalt
) {

    if (
        totalt === 0
    ) {

        return 0;

    }


    return (
        antal /
        totalt
    ) * 100;
}


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


    if (
        !typLista ||
        !fokusLista ||
        !miljoLista
    ) {

        return;

    }


    const valtTyp =
        typLista.value;


    const tidigareFokus =
        fokusLista.value;


    const tidigareMiljo =
        miljoLista.value;


    fokusLista.innerHTML =
        '<option value="">Alla fokus</option>';


    miljoLista.innerHTML =
        '<option value="">Alla miljöer</option>';


    fokusLista.disabled =
        !valtTyp;


    miljoLista.disabled =
        !valtTyp;


    if (!valtTyp) {

        return;

    }


    (
        fokus[valtTyp] || []
    ).forEach(
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


    (
        miljoer[valtTyp] || []
    ).forEach(
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


function visaUppfoljning() {

    const traningar =
        hamtaTraningar();


    const allData =
        skapaUppfoljningsData();


    const valtTyp =
        document.getElementById(
            "uppfoljning-typ"
        ).value;


    const valtFokus =
        document.getElementById(
            "uppfoljning-fokus"
        ).value;


    const valdMiljo =
        document.getElementById(
            "uppfoljning-miljo"
        ).value;


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


    // ÖVERGRIPANDE

    const status =
        raknaLageFranData(
            allData
        );


    document.getElementById(
        "antal-traning"
    ).textContent =
        traningar.length;


    document.getElementById(
        "status-bla"
    ).textContent =
        raknaProcent(
            status.bla,
            status.totalt
        ).toFixed(0) +
        " %";


    document.getElementById(
        "status-gron"
    ).textContent =
        raknaProcent(
            status.gron,
            status.totalt
        ).toFixed(0) +
        " %";


    document.getElementById(
        "status-gul"
    ).textContent =
        raknaProcent(
            status.gul,
            status.totalt
        ).toFixed(0) +
        " %";


    document.getElementById(
        "status-rod"
    ).textContent =
        raknaProcent(
            status.rod,
            status.totalt
        ).toFixed(0) +
        " %";


    document.getElementById(
        "status-otranad"
    ).textContent =
        raknaProcent(
            status.otränad,
            status.totalt
        ).toFixed(0) +
        " %";


    document.getElementById(
        "status-tackning"
    ).textContent =
        (
            status.totalt -
            status.otränad
        ) +
        " / " +
        status.totalt;


    // FILTRERAT LÄGE

    const filtreratTranade =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.antalTraning >
                    0
                );

            }
        ).length;


    const filtreratOtranade =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.antalTraning ===
                    0
                );

            }
        ).length;


    document.getElementById(
        "filtrerat-antal-kombinationer"
    ).textContent =
        filtreradData.length;


    document.getElementById(
        "filtrerat-tackning"
    ).textContent =
        filtreratTranade +
        " / " +
        filtreradData.length;


    document.getElementById(
        "filtrerat-traningar"
    ).textContent =
        filtreradeTraningar.length;


    document.getElementById(
        "filtrerat-otranade"
    ).textContent =
        filtreratOtranade;


    [1, 2, 3, 4, 5]
        .forEach(
            function(niva) {

                document.getElementById(
                    "filtrerat-niva" +
                    niva
                ).textContent =
                    filtreradData.filter(
                        function(kombination) {

                            return (
                                kombination.niva ===
                                niva
                            );

                        }
                    ).length;

            }
        );


    // VAD BEHÖVER JAG TRÄNA PÅ

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


    behovLista.innerHTML =
        "";


    if (
        behov.length ===
        0
    ) {

        behovLista.innerHTML =
            "<p>Inga röda eller gula kombinationer just nu.</p>";

    } else {

        behov
            .slice(0, 10)
            .forEach(
                function(kombination) {

                    const rad =
                        document.createElement(
                            "p"
                        );


                    rad.textContent =
                        kombination.typ +
                        " · " +
                        kombination.fokus +
                        " · " +
                        kombination.miljo +
                        " → Nivå " +
                        kombination.niva +
                        " · Senast: " +
                        (
                            kombination.senaste ||
                            "Aldrig tränat"
                        );


                    behovLista.appendChild(
                        rad
                    );

                }
            );


        if (
            behov.length >
            10
        ) {

            const fler =
                document.createElement(
                    "p"
                );


            fler.textContent =
                "Visar 10 av " +
                behov.length +
                " prioriterade kombinationer.";


            behovLista.appendChild(
                fler
            );

        }

    }


    // PREPARAT

    const preparatData =
        hamtaPreparatStatistik()
            .sort(
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


            const totalProcent =
                traningar.length > 0
                    ? Math.round(
                        (
                            data.totalt /
                            traningar.length
                        ) * 100
                    )
                    : 0;


            const soktypHtml =
                soktyper
                    .map(
                        function(soktyp) {

                            const antal =
                                data
                                    .perSoktyp[
                                        soktyp
                                    ]
                                    .antal;


                            const senaste =
                                data
                                    .perSoktyp[
                                        soktyp
                                    ]
                                    .senaste;


                            return `
                                <p>
                                    ${soktyp}: ${antal}
                                    · Senast:
                                    ${senaste || "Aldrig tränat"}
                                </p>
                            `;

                        }
                    )
                    .join("");


            block.innerHTML = `
                <h4>${data.preparat}</h4>

                <p>
                    Totalt:
                    ${data.totalt}
                    (${totalProcent} % av alla sökträningar)
                </p>

                <p>
                    Senast tränat:
                    ${data.senaste || "Aldrig tränat"}
                </p>

                ${soktypHtml}
            `;


            preparatLista.appendChild(
                block
            );

        }
    );


    // TOTAL SÖKTRÄNING

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
                    "p"
                );


            rad.textContent =
                soktyp +
                ": " +
                antal;


            totalSoktyperLista.appendChild(
                rad
            );

        }
    );


    // SENAST TRÄNAT

    const senastTranat =
        filtreradData
            .filter(
                function(kombination) {

                    return (
                        kombination.senaste !==
                        null
                    );

                }
            )
            .sort(
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
                        "p"
                    );


                rad.textContent =
                    kombination.typ +
                    " · " +
                    kombination.fokus +
                    " · " +
                    kombination.miljo +
                    " → " +
                    kombination.senaste;


                senastTranatLista.appendChild(
                    rad
                );

            }
        );


    if (
        senastTranat.length ===
        0
    ) {

        senastTranatLista.innerHTML =
            "<p>Ingen träning hittades.</p>";

    }


    // LÄNGST SEDAN TRÄNAT

    const langstSedanTranat =
        filtreradData
            .filter(
                function(kombination) {

                    return (
                        kombination.senaste !==
                        null
                    );

                }
            )
            .sort(
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
                        "p"
                    );


                rad.textContent =
                    kombination.typ +
                    " · " +
                    kombination.fokus +
                    " · " +
                    kombination.miljo +
                    " → " +
                    kombination.senaste;


                langstSedanTranatLista.appendChild(
                    rad
                );

            }
        );


    if (
        langstSedanTranat.length ===
        0
    ) {

        langstSedanTranatLista.innerHTML =
            "<p>Ingen träning hittades.</p>";

    }


    // OTRÄNADE

    const otranade =
        filtreradData.filter(
            function(kombination) {

                return (
                    kombination.antalTraning ===
                    0
                );

            }
        );


    document.getElementById(
        "antal-otranade"
    ).textContent =
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
                otranadeForTyp.length ===
                0
            ) {

                return;

            }


            const rubrik =
                document.createElement(
                    "h4"
                );


            rubrik.textContent =
                typ;


            otranadeLista.appendChild(
                rubrik
            );


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


                    otranadeLista.appendChild(
                        rad
                    );

                }
            );

        }
    );


    // UTVECKLING ÖVER TID

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
                    "p"
                );


            const snitt =
                manad.genomsnitt ===
                    null
                    ? "Ingen poängdata"
                    : manad
                        .genomsnitt
                        .toFixed(1);


            rad.textContent =
                manad.namn +
                ": " +
                manad.antal +
                " träningar · Snittpoäng: " +
                snitt;


            utvecklingLista.appendChild(
                rad
            );

        }
    );


    // VECKOSTATISTIK

    const veckor =
        hamtaVeckostatistik(
            filtreradeTraningar
        );


    const veckostatistikLista =
        document.getElementById(
            "veckostatistik"
        );


    veckostatistikLista.innerHTML =
        "";


    veckor.forEach(
        function(vecka) {

            const rad =
                document.createElement(
                    "p"
                );


            rad.textContent =
                vecka.namn +
                ": " +
                vecka.antal +
                " träningar";


            veckostatistikLista.appendChild(
                rad
            );

        }
    );
}


// ==============================
// FILTERHÄNDELSER
// ==============================

document
    .getElementById(
        "uppfoljning-typ"
    )
    .addEventListener(
        "change",
        function() {

            uppdateraUppfoljningsFilter();
            visaUppfoljning();

        }
    );


document
    .getElementById(
        "uppfoljning-fokus"
    )
    .addEventListener(
        "change",
        visaUppfoljning
    );


document
    .getElementById(
        "uppfoljning-miljo"
    )
    .addEventListener(
        "change",
        visaUppfoljning
    );


document
    .getElementById(
        "uppfoljning-rensa"
    )
    .addEventListener(
        "click",
        function() {

            document.getElementById(
                "uppfoljning-typ"
            ).value = "";


            uppdateraUppfoljningsFilter();

            visaUppfoljning();

        }
    );


// ==============================
// START
// ==============================

fyllTypLista();

fyllPreparatLista();

uppdateraFokus();

uppdateraMiljo();

uppdateraPreparat();

uppdateraLoggboksFilter();

uppdateraUppfoljningsFilter();

visaVy("start");