// crea un mapa apartir de leaflet donde se asigna a la varible mapa el mapeo en el id map del html
var map = L.map("map").setView([-34.607950045630545, -58.44477653503419], 12)
// es necesario tambien este codigo para que se pueda visualizar el mapa
// mapa de ign (instituto geografico nacional)
L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
      minZoom: 3,
      maxZoom: 18
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

//buscador por coordenadas lat y long
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

// almacena las plazas 
var plazas = L.layerGroup([parquePatricios, plazaIrlanda])

// crea el overlay
var layerControl = L.control.layers().addTo(map)

// agrega las plazas al overlay
layerControl.addOverlay(plazas, "Plazas")


// leaflet buscador
L.Control.geocoder().addTo(map)