// crea un mapa apartir de leaflet donde se asigna a la varible mapa el mapeo en el id map del html
var map = L.map("map").setView([-34.607950045630545, -58.44477653503419], 12)
// es necesario tambien este codigo para que se pueda visualizar el mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/* // agregando un layer 'TOPO-OSM-WMS' que esta en el webservice de mundialis
var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    layers: 'TOPO-OSM-WMS'
}).addTo(map) */


var marcador = L.marker([0,0]).addTo(map)

//funcion onclick
function onMapClick(e){
    var latitudInput = document.getElementById('latitud')
    var longitudInput = document.getElementById('longitud')

    latitudInput.value = e.latlng.lat;
    longitudInput.value = e.latlng.lng;

    marcador.setLatLng([e.latlng.lat, e.latlng.lng])

    map.setView([e.latlng.lat, e.latlng.lng])
}

map.on('click', onMapClick);

//buscador
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    var latitud = document.getElementById('latitud').value
    var longitud = document.getElementById('longitud').value

    marcador.setLatLng([latitud, longitud])

    map.setView([latitud, longitud])
})


// overlays parques
var parquePatricios = L.marker([-34.6386641858029, -58.40669453144074]).bindPopup('Este es parque patricios')
var plazaIrlanda = L.marker([-34.61463753119003, -58.457779884338386]).bindPopup('Este es plaza irlanda')

var plazas = L.layerGroup([parquePatricios, plazaIrlanda])

var layerControl = L.control.layers().addTo(map)

layerControl.addOverlay(plazas, "Plazas")
