document.addEventListener("DOMContentLoaded", () => {

const map = L.map('map').setView([coordinates[1], coordinates[0]], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const customIcon = L.icon({
 iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
 iconSize: [30, 30]
});

const marker = L.marker([coordinates[1], coordinates[0]], {
 icon: customIcon
}).addTo(map);

marker.bindPopup(`
<h6>${title}</h6>
<p>Exact location will be provided after booking</p>
`).openPopup();

map.flyTo([coordinates[1], coordinates[0]], 13);

});