// Inicializace mapy – střed ČR
const map = L.map('map').setView([49.8, 15.5], 7);

// Podkladová mapa OpenStreetMap
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Načtení bodů z GeoJSONu
fetch('body.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Nepodařilo se načíst body.geojson (HTTP ' + response.status + ')');
    }
    return response.json();
  })
  .then(data => {
    const vrstvaMest = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindPopup(
          `<div class="popup">
             <h3>${p.nazev}</h3>
             <p>${p.popisek}</p>
             <small>ID: ${p.id}</small>
           </div>`
        );
        layer.bindTooltip(p.nazev);
      }
    }).addTo(map);

    // Přiblížení mapy na všechna města
    map.fitBounds(vrstvaMest.getBounds(), { padding: [50, 50] });
  })
  .catch(error => {
    console.error(error);
    alert('Chyba při načítání dat: ' + error.message);
  });
