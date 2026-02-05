let puolueet = [];
console.log("Tietojärjestelmäprojektin frontti käynnissä");
console.log("Puolueet backendistä:", puolueet.map(p => p.party));


const partyList = document.getElementById("party-list");
const ideologySelect = document.getElementById("ideology-select");

const GOV_PARTIES = new Set(["kok", "ps", "rkp", "kd"]);

const PARTY_DESCRIPTIONS = {
  sdp: "Sosiaalidemokraattinen puolue, joka painottaa hyvinvointivaltiota ja sosiaalista oikeudenmukaisuutta.",
  kok: "Kokoomus on oikeistolainen puolue, joka korostaa markkinataloutta ja yksilön vastuuta.",
  kesk: "Keskusta painottaa alueellista tasa-arvoa, maaseudun elinvoimaa ja hajautettua yhteiskuntaa.",
  ps: "Perussuomalaiset on kansallismielinen puolue, joka korostaa maahanmuuttokriittisyyttä.",
  vihr: "Vihreät keskittyvät ympäristöarvoihin, ilmastonmuutoksen torjuntaan ja ihmisoikeuksiin.",
  vas: "Vasemmistoliitto korostaa tasa-arvoa ja julkisia palveluja.",
  rkp: "RKP edustaa ruotsinkielistä vähemmistöä ja liberaalia arvopolitiikkaa.",
  kd: "Kristillisdemokraatit korostavat perhearvoja ja eettisiä kysymyksiä.",
  liik: "Liike Nyt painottaa yksilönvapautta ja talousliberalismia."
};

/*
*/

function normalizeParty(p) {
  return (p || "").trim().toLowerCase();
}

/* 🔹 TÄMÄ on se funktio, josta puhuttiin */
function renderParties(data) {
  partyList.innerHTML = "";

  data.forEach(p => {
    const code = normalizeParty(p.party);
    const description =
      PARTY_DESCRIPTIONS[code] || "Tietoja puolueesta ei saatavilla.";

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${p.party.toUpperCase()}</h2>
      <p><em>${description}</em></p>
      <p>Kansanedustajia: ${p.count}</p>
    `;

    partyList.appendChild(card);
  });
}

function applyFilter() {
  const mode = ideologySelect?.value || "kaikki";

  const filtered = puolueet.filter(p => {
    const code = normalizeParty(p.party);
    if (mode === "kaikki") return true;
    if (mode === "hallitus") return GOV_PARTIES.has(code);
    if (mode === "oppositio") return !GOV_PARTIES.has(code);
    return true;
  });

  renderParties(filtered);
}

fetch("http://127.0.0.1:3000/puolueet")
  .then(r => r.json())
  .then(data => {
    puolueet = data;
    applyFilter();
  })
  .catch(err => console.error("Puolueet fetch error:", err));

ideologySelect?.addEventListener("change", applyFilter);
