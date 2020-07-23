// blank out map so it can be replace if needed.
var container = L.DomUtil.get('map'); if (container != null) { container._leaflet_id = null; }


//URL earthquakes > 2.5
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

console.log("url = ", queryUrl);

var myMap = L.map("map", {
    center: [
        40, -100
    ],
    zoom: 5,
});



//add map from mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);
function markerSize(magnitude){
    return (magnitude) * 2;
}


d3.json(queryUrl, function(response) {

  console.log("response = ", response);

  function getColor(i) {
    return i > 5 ? '#F35' :
    i > 4  ? '#F60' :
    i > 3  ? '#F90' :
    i > 2  ? '#FC0' :
    i > 1   ? '#FF0' :
              '#9F3';
  }

  var earthquake = L.geoJSON(response,{
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        console.log(feature)
    },

    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: (feature.properties.mag)*4,
            fillColor: getColor(feature.properties.mag),
            fillOpacity: 0.9,
            color: "white"
        })
    }

  }).addTo(myMap);

//   / Create legend , available on stackover flow
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 1, 2, 3, 4, 5],
                labels = [];
    // loop through density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    };
    legend.addTo(myMap);

});


