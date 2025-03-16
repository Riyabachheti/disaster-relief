document.addEventListener("DOMContentLoaded", function () {
    console.log("Leaflet Map Loaded!");

    // Initialize the map
    var map = L.map('map').setView([20.5937, 78.9629], 5);  // Centered in India

    // Add the OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Disaster Layers
    var earthquakeLayer = L.layerGroup().addTo(map);
    var floodLayer = L.layerGroup().addTo(map);
    var stormLayer = L.layerGroup().addTo(map);

    // Earthquake Marker
    L.circle([28.7041, 77.1025], {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5,
        radius: 20000
    }).addTo(earthquakeLayer).bindPopup("<b>Earthquake:</b> Magnitude 6.0 <br> Zone: High Risk");

    // Flood Marker
    L.circle([19.0760, 72.8777], {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 30000
    }).addTo(floodLayer).bindPopup("<b>Flood:</b> Severity Level 3 <br> Zone: Medium Risk");

    // Storm Marker
    L.circle([13.0827, 80.2707], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 25000
    }).addTo(stormLayer).bindPopup("<b>Storm:</b> Category 2 <br> Zone: Low Risk");

    // Legend
    var legend = L.control({ position: "topright" });

    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<b>Legend</b><br>";
        div.innerHTML += "<i style='background: red'></i> Earthquake<br>";
        div.innerHTML += "<i style='background: blue'></i> Flood<br>";
        div.innerHTML += "<i style='background: green'></i> Storm<br>";
        return div;
    };
    legend.addTo(map);

    // Layer Control
    L.control.layers({
        "Earthquakes": earthquakeLayer,
        "Floods": floodLayer,
        "Storms": stormLayer
    }).addTo(map);
});
