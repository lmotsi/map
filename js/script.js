// initializing the map and set it to view the coordinates of Johhanesburg, and a zoom level (13)
var map = L.map('map').setView([-26.2041, 28.0473], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http:www.openstreetmap.org/copyright">OpenStreetMap</a>'
} ).addTo(map);


function onMapClick(e) {
    var popup = L.popup();
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;

    var request = new XMLHttpRequest();
    request.open('GET' , 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude);
    request.onload = function () {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            console.log(data)
            popup.setLatLng(e.latlng).setContent(data.display_name).openOn(map);
        }
    }
    request.send();
}

map.on('click', onMapClick);