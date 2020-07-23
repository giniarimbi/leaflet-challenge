// // blank out map so it can be replace if needed.
var container = L.DomUtil.get('map'); if (container != null) { container._leaflet_id = null; }

// //URL earthquakes > 2.5
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// //  declare overlay layer
// var cityLayer = L.layerGroup(earthquake);


function markerSize(magnitude){
    return (magnitude) * 2;
}

var earthquake = []

d3.json(queryUrl, function(response) {
//   console.log("response = ", response);

  function getColor(i) {
    return i > 5 ? '#F30' :
    i > 4  ? '#F60' :
    i > 3  ? '#F90' :
    i > 2  ? '#FC0' :
    i > 1   ? '#FF0' :
              '#9F3';
  }

  earthquake = L.geoJSON(response,{

    //bind Pop up
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        // console.log(feature)
    },


    // create circle
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: (feature.properties.mag)*4,
            fillColor: getColor(feature.properties.mag),
            fillOpacity: 0.9,
            color: "white"
        })
    }

    
    // createMap(earthquake);
  });
});



function createMap(earthquake) {

    // define baseMap layer: light layer
var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
     accessToken: API_KEY
})
    
    // define baseMap layer: dark layer
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})


    // declare baseMap objects to be toggled on off
var baseMaps = {
    "Light": light,
    "Dark": dark
};

    // declare overlayMaps object to be toggled on off
var overlayMaps = {
    "Earthquake" : earthquake
};

// create map
var myMap = L.map("map", {
    center: [40, -100],
    zoom: 5,
    layers: [light]
});

    // add overlay Maps to my map
L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
}).addTo(myMap);

}

//   Create legend 





// // Selectable backgrounds of our map - tile layers:
// // grayscale background.
// var graymap_background = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1IjoibWFudWVsYW1hY2hhZG8iLCJhIjoiY2ppczQ0NzBtMWNydTNrdDl6Z2JhdzZidSJ9.BFD3qzgAC2kMoEZirGaDjA");

// // satellite background.
// var satellitemap_background = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1IjoibWFudWVsYW1hY2hhZG8iLCJhIjoiY2ppczQ0NzBtMWNydTNrdDl6Z2JhdzZidSJ9.BFD3qzgAC2kMoEZirGaDjA");

// // outdoors background.
// var outdoors_background = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1IjoibWFudWVsYW1hY2hhZG8iLCJhIjoiY2ppczQ0NzBtMWNydTNrdDl6Z2JhdzZidSJ9.BFD3qzgAC2kMoEZirGaDjA");

// // map object to an array of layers we created.
// var map = L.map("mapid", {
//   center: [37.09, -95.71],
//   zoom: 5,
//   layers: [graymap_background, satellitemap_background, outdoors_background]
// });

// // adding one 'graymap' tile layer to the map.
// graymap_background.addTo(map);

// // layers for two different sets of data, earthquakes and tectonicplates.
// var tectonicplates = new L.LayerGroup();
// var earthquakes = new L.LayerGroup();

// // base layers
// var baseMaps = {
//   Satellite: satellitemap_background,
//   Grayscale: graymap_background,
//   Outdoors: outdoors_background
// };

// // overlays 
// var overlayMaps = {
//   "Tectonic Plates": tectonicplates,
//   "Earthquakes": earthquakes
// };

// // control which layers are visible.
// L
//   .control
//   .layers(baseMaps, overlayMaps)
//   .addTo(map);

// // retrieve earthquake geoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {

//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }

//   // Define the color of the marker based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     switch (true) {
//       case magnitude > 5:
//         return "#ea2c2c";
//       case magnitude > 4:
//         return "#ea822c";
//       case magnitude > 3:
//         return "#ee9c00";
//       case magnitude > 2:
//         return "#eecc00";
//       case magnitude > 1:
//         return "#d4ee00";
//       default:
//         return "#98ee00";
//     }
//   }

//   // define the radius of the earthquake marker based on its magnitude.

//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }

//     return magnitude * 3;
//   }

//   // add GeoJSON layer to the map
//   L.geoJson(data, {
//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng);
//     },
//     style: styleInfo,
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//     }

//   }).addTo(earthquakes);

//   earthquakes.addTo(map);


//   var legend = L.control({
//     position: "bottomright"
//   });


//   legend.onAdd = function() {
//     var div = L
//       .DomUtil
//       .create("div", "info legend");

//     var grades = [0, 1, 2, 3, 4, 5];
//     var colors = [
//       "#98ee00",
//       "#d4ee00",
//       "#eecc00",
//       "#ee9c00",
//       "#ea822c",
//       "#ea2c2c"
//     ];


//     for (var i = 0; i < grades.length; i++) {
//       div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
//         grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }
//     return div;
//   };


//   legend.addTo(map);

//   // retrive Tectonic Plate geoJSON data.
//   d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
//     function(platedata) {
 
//       L.geoJson(platedata, {
//         color: "orange",
//         weight: 2
//       })
//       .addTo(tectonicplates);

//       // add the tectonicplates layer to the map.
//       tectonicplates.addTo(map);
//     });
// });

