# Leaflet - Earthquake Visualization 



Data Analytics Bootcamp - Rice University


### 1. Background 

**Project Background:** The project objective is to visualize earthquake map in United States. 

**Why we chose image prediction:** We are interested to learn more about how image processing works. 

**Data Source:** World earthquake data from <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"> USGS GeoJSON Feed</a>. 
Map from<a href="https://www.mapbox.com/"> Mapbox.</a>

This is the example of information from a single coordinate. 

<!-- ![](images/json.png) -->

<p align="center">
    <img src="images/json.png" height="600px" weight="400px"> 

</p>



****

### 2. Results 

This is the result of the visualization. Different color indicate different magnitude of earthquake, as indicated in the **legend**.   

![](images/earthquake_map.png)

* Marker 
Each earthquake coordinates is plotted to the map to indicate the earthquake occurance. The bigger the circle, the bigger the magnitude. The color of the circle correlates with the earthquake magnitude. 

* Legend 
The legend shows that the darker the color, the bigger the earthquake magnitude. In this example, it is divided into 6 bins / range. 

* Pop up
Detail information on the earthquake can be obtained by click individual circle.  




### 3. File Directory


File | Location | Remarks 
------|------|------|-----
index.html | main folder | Front End Page
logic.js | `static/js` | JS script 
style.css | `static/cs` | style-related script

