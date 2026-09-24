// Create the Leaflet map and set Brisbane as the initial location
const map = L.map("map").setView(
    [-27.48, 153.02],
    15
);


// Move the zoom control to the bottom-right
map.zoomControl.setPosition("bottomright");


// Add openstreetmap as the basemap
L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// Create a layer and icon for drinking fountains
const fountainLayer = L.featureGroup().addTo(map);
const fountainIcon = L.divIcon({
    className: "fountain-marker",
    html: "⛲",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});


// Create a layer and icon for parks
const parkLayer = L.featureGroup().addTo(map);
const parkIcon = L.divIcon({
    className: "park-marker",
    html: "🌳",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});


// Create a layer and icon for off-leash dog areas
const offLeashLayer = L.featureGroup().addTo(map);
const offLeashIcon = L.divIcon({
    className: "off-leash-marker",
    html: "🐾",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});


// Create a layer for walking trail lines
const trailLayer = L.featureGroup().addTo(map);



// Get filter interface elements from html file
const filterButton = document.getElementById("filterButton");
const filterPanel = document.getElementById("filterPanel");
const offLeashToggle = document.getElementById("offLeashToggle");
const parkToggle = document.getElementById("parkToggle");
const trailToggle = document.getElementById("trailToggle");
const fountainToggle = document.getElementById("fountainToggle");
const applyFilters = document.getElementById("applyFilters");
const resetFilters = document.getElementById("resetFilters");


// Get location details elements from html file
const locationDetails = document.getElementById("locationDetails");
const locationTitle = document.getElementById("locationTitle");
const locationSuburb = document.getElementById("locationSuburb");
const locationInfo = document.getElementById("locationInfo");
const closeLocationDetails = document.getElementById("closeLocationDetails");


// Get route planner elements from html file
//const routesButton = document.getElementById("routesButton");
//const routePlanner = document.getElementById("routePlanner");
//const closeRoutePlanner = document.getElementById("closeRoutePlanner");
//const timeButtons = document.querySelectorAll(".time-button");

// Get map route elements from html
const viewRouteButton = document.getElementById("viewRouteButton");
const mapRouteDetails = document.getElementById("mapRouteDetails");
const closeMapRouteDetails = document.getElementById("closeMapRouteDetails");
const mapRouteTitle = document.getElementById("mapRouteTitle");
const mapRouteDistance = document.getElementById("mapRouteDistance");
const mapRouteWalkingTime = document.getElementById("mapRouteWalkingTime");
const startWalkButton = document.getElementById("startWalkButton");

// Store the selected location coordinates
let selectedLocationCoordinates = null;

// Demo user starting location for the WIP
const userLocation = [-27.485, 153.02];
// Create the current location icon
const userIcon = L.divIcon({
    className: "user-location-marker",
    html: "You",
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

// Show the demo current location on the map
const userMarker = L.marker(
    userLocation,
    {icon: userIcon}
).addTo(map);

let mapRouteLine = null;

// Open or close the filter panel when the Filter button is clicked
filterButton.addEventListener("click", () => {

    filterPanel.classList.toggle("hidden");

    if (filterPanel.classList.contains("hidden")) {
        filterButton.textContent = "Filter";
    } else {
        filterButton.textContent = "X";
    }

});


// Show or hide dataset layers based on the selected filters
applyFilters.addEventListener("click", () => {

    if (parkToggle.checked) {
        if (!map.hasLayer(parkLayer)) {
            parkLayer.addTo(map);
        }
    } else {
        if (map.hasLayer(parkLayer)) {
            map.removeLayer(parkLayer);
        }
    }

    if (fountainToggle.checked) {
        if (!map.hasLayer(fountainLayer)) {
            fountainLayer.addTo(map);
        }
    } else {
        if (map.hasLayer(fountainLayer)) {
            map.removeLayer(fountainLayer);
        }
    }

    if (offLeashToggle.checked) {
        if (!map.hasLayer(offLeashLayer)) {
            offLeashLayer.addTo(map);
        }
    } else {
        if (map.hasLayer(offLeashLayer)) {
            map.removeLayer(offLeashLayer);
        }
    }

    if (trailToggle.checked) {
        if (!map.hasLayer(trailLayer)) {
            trailLayer.addTo(map);
        }
    } else {
        if (map.hasLayer(trailLayer)) {
            map.removeLayer(trailLayer);
        }
    }

    filterPanel.classList.add("hidden");
    filterButton.textContent = "Filter";
});


// Reset all filter options to selected
resetFilters.addEventListener("click", () => {
    offLeashToggle.checked = true;
    parkToggle.checked = true;
    fountainToggle.checked = true;
    trailToggle.checked = true;
});


// Close the location details card
closeLocationDetails.addEventListener("click", () => {
    locationDetails.classList.add("hidden");
});


// Open route details for the selected map location
viewRouteButton.addEventListener("click", () => {

    // Make sure a location has been selected
    if (!selectedLocationCoordinates) {
        return;
    }

    // Use the selected location name as the route destination
    mapRouteTitle.textContent = locationTitle.textContent;

    // Calculate approximate distance
    const distanceMetres = map.distance(
        userLocation,
        selectedLocationCoordinates
    );

    const distanceKm = distanceMetres / 1000;

    // Estimate walking time at around 5 km/h
    const walkingMinutes =
        Math.round((distanceKm / 5) * 60);

    // Display distance and walking time
    mapRouteDistance.textContent =
        `${distanceKm.toFixed(1)} km`;

    mapRouteWalkingTime.textContent =
        `${walkingMinutes} min`;

    // Remove the previous route line
    if (mapRouteLine) {
        map.removeLayer(mapRouteLine);
    }

    // Draw the route from the demo user location
    mapRouteLine = L.polyline(
        [userLocation,selectedLocationCoordinates],
        {weight: 5}
    ).addTo(map);

    // Move the map so the whole route is visible
    map.fitBounds(
        mapRouteLine.getBounds(),
        {padding: [30, 30]}
    );

    // Switch from location details to route details
    locationDetails.classList.add("hidden");
    mapRouteDetails.classList.remove("hidden");
});

// Close map route details
closeMapRouteDetails.addEventListener("click", () => {
    mapRouteDetails.classList.add("hidden");
});
// Start the selected walk
startWalkButton.addEventListener("click", () => {
    mapRouteDetails.classList.add("hidden");
    if (mapRouteLine) {
        map.fitBounds(
            mapRouteLine.getBounds(),
            {padding: [30, 30]}
        );
    }
    console.log("Walk started");
});


// Open the route planner
//routesButton.addEventListener("click", () => {
//    routePlanner.classList.remove("hidden");
//});

// Close the route planner
//closeRoutePlanner.addEventListener("click", () => {
//   routePlanner.classList.add("hidden");
//});

// Select an activity time
/*timeButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove the selected style from all time buttons
        timeButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");
        
        const selectedTime = button.dataset.time;

        console.log("Selected activity time:", selectedTime);
    });
});
*/

// Load drinking fountain data from Brisbane City Council Open Data
async function loadFountains() {
    try {
        const fountains = await getDataset(
            "park-drinking-fountain-tap-locations"
        );
        fountains.forEach(fountain => {
            const location = fountain.geo_point_2d;
            if (!location) {
                return;
            }
            const lat = location.lat;
            const lon = location.lon;
            const marker = L.marker(
                [lat, lon],
                {icon: fountainIcon}
            );

            marker.bindPopup(`
                <strong>${fountain.park_name}</strong>
                <br>
                ${fountain.item_description}
            `);

        marker.addTo(fountainLayer);
        });

    } catch (error) {
        console.error(
            "Could not load drinking fountains:",
            error
        );
    }
}

// Load park data
async function loadParks() {
    try {
        const parks = await getDataset(
            "park-locations"
        );

        parks.forEach(park => {

            const location = park.geopoint;

            if (!location) {
                return;
            }

            const lat = location.lat;
            const lon = location.lon;

            const marker = L.marker(
                [lat, lon],
                {icon: parkIcon}
            );

            marker.on("click", () => {

            // Store the selected park coordinates
            selectedLocationCoordinates = [lat, lon];
            locationTitle.textContent = park.park_name;
            locationSuburb.textContent = park.suburb || "";
            locationInfo.textContent = park.park_size || "";
            locationDetails.classList.remove("hidden");
        });
    
        marker.addTo(parkLayer);  
        });

    } catch (error) {
        console.error(
            "Could not load park data:",
            error
        );
    }
}


// Load dog off-leash area data
async function loadOffLeashAreas() {
    try {
        const offLeashAreas = await getDataset(
            "park-dog-off-leash-areas"
        );

        offLeashAreas.forEach(area => {

            const location = area.geo_point_2d;

            if (!location) {
                return;
            }

            const lat = location.lat;
            const lon = location.lon;

            const marker = L.marker(
                [lat, lon],
                {icon: offLeashIcon}
            );

            marker.on("click", () => {
                selectedLocationCoordinates = [lat, lon];
                locationTitle.textContent = area.item_description;
                locationSuburb.textContent = `${area.park_name} - ${area.suburb}`;

                locationInfo.textContent =
                    `Fencing: ${area.fencing}
                Small dog enclosure: ${area.small_dog_enclosure}
                Agility equipment: ${area.dog_agility_equipment}
                Lighting: ${area.lighting}`;

                locationDetails.classList.remove("hidden");
            });
            marker.addTo(offLeashLayer);
        });

    } catch (error) {
        console.error(
            "Could not load off-leash data:",
            error
        );
    }
}


// Load walking trail data
async function loadTrails() {
    try {
        const trails = await getDataset(
            "tracks-and-trails"
        );

        trails.forEach(trail => {

            if (!trail.geo_shape) {
                return;
            }
            
            // Display the trail shape by using GeoJSON
            const trailLine = L.geoJSON(
                trail.geo_shape,
                {
                    style: {
                        weight: 4,
                        dashArray: "6, 6"
                    }
                }
            );
            
            trailLine.bindPopup(`
                <strong>${trail.park_name}</strong>
                <br>
                ${trail.item_description}
                <br>
                Type: ${trail.item_type}
            `);

            trailLine.addTo(trailLayer);
        });

    } catch (error) {
        console.error(
            "Could not load trail data:",
            error
        );
    }
}

loadFountains();
loadTrails();
loadParks();
loadOffLeashAreas();