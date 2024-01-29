////////////////////////////// Fetch Data et creation cards /////////////////////////////////

const fetchData = async () => {
  await fetch("https://localhost:7097/api/Salles")
    .then((res) => res.json())
    .then((data) =>
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.salleId = item.id;
        const title = document.createElement('h2');
        title.textContent = item.nom;
        const address = document.createElement('p');
        address.classList.add('address');
        address.textContent = `${item.adresseSalle.numero} ${item.adresseSalle.voie}, ${item.adresseSalle.codePostal} ${item.adresseSalle.ville}`;

        const capacity = document.createElement('p');
        capacity.classList.add('capacity');
        capacity.textContent = `Capacité: ${item.capacite}`;

        const labelstyle = document.createElement('p');
        labelstyle.classList.add('labelstyle');
        labelstyle.textContent = 'Styles :';
        const styles = document.createElement('p');
        styles.classList.add('styles');
        styles.textContent = `${item.styles}`;

        card.appendChild(title);
        card.appendChild(address);
        card.appendChild(capacity);
        card.appendChild(labelstyle);
        card.appendChild(styles);
        document.body.appendChild(card);
      }))
    .catch((err) => console.log("Pas de GetAllSalle", err));
};

window.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
});

//////////////////////////////// Fetch Map //////////////////////////////////

// const fetchDataMap = async () => {
//   await fetch("https://localhost:7097/api/Salles")
//     .then((res) => res.json())
//     .then((data) => {
//       const map = L.map('map').setView([43.958720, 4.808130], 12); // Coordonnées du premier lieu

//       L.tileLayer('https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(map);

//       data.forEach(item => {
//         const lat = item.adresse.localisation.coordinates[0];
//         const lng = item.adresse.localisation.coordinates[1];

//         const marker = L.marker([lat, lng]).addTo(map);
//         marker.bindPopup(item.nom);
//       });
//     })
//     .catch((err) => console.log("Pas de GetAllSalle", err));
// };

// window.addEventListener("DOMContentLoaded", async () => {
//   await fetchDataMap();
// });

//////////////////////////////// Creation ListBox //////////////////////////////

const styleslist = [
  { name: 'rock' },
  { name: 'jazz' },
  { name: 'funk' },
  { name: 'rap' },
  { name: 'metal' },
  { name: 'electronic' },
  { name: 'indie' },
  { name: 'classical' },
  { name: 'opera' },
  { name: 'hip-hop' },
  { name: 'blues rock' }
]

const div = document.createElement('div');
div.className = 'style';

const label = document.createElement('label');
label.className = 'style-select';
label.textContent = "Style : ";
div.appendChild(label);

const select = document.createElement('select');
select.name = 'style-select';
select.id = 'style-select';
div.appendChild(select);

const option = document.createElement('option');
option.value = '';
option.textContent = "Choississez un style";
select.appendChild(option);

styleslist.forEach(element => {
  const optionValue = document.createElement('option');
  optionValue.value = element.name;
  optionValue.textContent = element.name;
  select.appendChild(optionValue);
})


document.body.appendChild(div);

///////////////////////////////// Filtre /////////////////////////////////////


select.addEventListener('change', function () {
  const selectedStyle = select.value;
  filtrerStyle(selectedStyle);
});

function filtrerStyle() {
  const selectedStyle = document.getElementById('style-select').value;
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const stylesElement = card.querySelector('.styles');

    if (stylesElement) {
      const lestyle = stylesElement.textContent.split(',');
      const shouldDisplay = selectedStyle === '' || lestyle.some(style => selectedStyle.includes(style));
      card.style.display = shouldDisplay ? 'block' : 'none';
    }
  })
}


/////////////////////////// Fonction Filtrer ///////////////////////////////

const filterCards = (searchTerm) => {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const address = card.querySelector('.address').textContent.toLowerCase();
    const capacity = card.querySelector('.capacity').textContent.toLowerCase();
    const styles = card.querySelector('.styles').textContent.toLowerCase();

    if (
      title.includes(searchTerm) ||
      address.includes(searchTerm) ||
      capacity.includes(searchTerm) ||
      styles.includes(searchTerm)
    ) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};


/////////////////////////////////// Fonctionnalité affichage /////////////////////

const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  card.addEventListener('click', function () {
    const selectedSalleId = card.dataset.salleId;
    lireSalle(selectedSalleId);
  });
});


function lireSalle(salleId) {
  fetch("https://localhost:7097/api/Salles/id?id=" + salleId)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
}


document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  filterCards(searchTerm);
});