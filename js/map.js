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


// Get search interface elements from HTML
const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Get location details elements from html file
const locationDetails = document.getElementById("locationDetails");
const locationTitle = document.getElementById("locationTitle");
const locationSuburb = document.getElementById("locationSuburb");
const locationInfo = document.getElementById("locationInfo");
const closeLocationDetails = document.getElementById("closeLocationDetails");


// Get map route elements from html
const getDirectionsButton = document.getElementById("getDirectionsButton");
const useMyLocationButton = document.getElementById("useMyLocationButton");

// Store the selected location coordinates
let selectedLocationCoordinates = null;


// Store the marker for the selected search result
let searchMarker = null;


// Demo user starting location for the WIP
//const userLocation = [-27.485, 153.02];

// Default location before geolocation is enabled
let userLocation = [-27.485, 153.02];
let hasGeolocation = false;

// Create the current location icon
const userIcon = L.divIcon({
    className: "user-location-marker",
    html: "You",
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

// Create the demo location icon
const demoIcon = L.divIcon({
    className: "user-location-marker",
    html: "Demo",
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

// Show the demo current location on the map
const userMarker = L.marker(
    userLocation,
    {icon: demoIcon}
).addTo(map);

// Get the user's current location
useMyLocationButton.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    useMyLocationButton.textContent = "Locating...";

    navigator.geolocation.getCurrentPosition(

        // Location successfully retrieved
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            userLocation = [lat, lon];
            hasGeolocation = true;
            userMarker.setLatLng(userLocation);
            userMarker.setIcon(userIcon);
            map.setView(userLocation, 15);
            useMyLocationButton.textContent = "Location Updated";
        },

        // Failed to get location
        (error) => {
            console.error("Geolocation error:", error);
            useMyLocationButton.textContent = "Use My Location";
            alert("Unable to get your location. The demo location will be used.");
        }
    );
});

// Open or close the filter panel
filterButton.addEventListener("click", () => {
    filterPanel.classList.toggle("hidden");
    if (!filterPanel.classList.contains("hidden")) {
        searchPanel.classList.add("hidden");
    }
});


// Open or close the search panel
searchButton.addEventListener("click", () => {
    searchPanel.classList.toggle("hidden");
    if (!searchPanel.classList.contains("hidden")) {
        filterPanel.classList.add("hidden");
        searchInput.focus();
    }
});


// Search for parks and off-leash areas
async function searchLocations() {
    const keyword = searchInput.value.trim();
    if (!keyword) {
        searchResults.textContent = "Please enter a location.";
        return;
    }
    searchResults.textContent = "Searching...";

    try {

        // Search both datasets
        const [parks, offLeashAreas] = await Promise.all([
            searchDataset("park-locations", keyword),
            searchDataset("park-dog-off-leash-areas", keyword)
        ]);

        // Combine search results from both datasets
        const results = [
            ...parks.map(park => ({
                name: park.park_name || "Unnamed park",
                suburb: park.suburb || "",
                type: "Park",
                lat: park.geopoint?.lat,
                lon: park.geopoint?.lon,
                info: park.park_size || ""
            })),

            ...offLeashAreas.map(area => ({
                name: area.item_description || area.park_name || "Off-leash area",
                suburb: `${area.park_name || ""} - ${area.suburb || ""}`,
                type: "Off-leash area",
                lat: area.geo_point_2d?.lat,
                lon: area.geo_point_2d?.lon,
                info: `Fencing: ${area.fencing || "Not specified"}
        Small dog enclosure: ${area.small_dog_enclosure || "Not specified"}
        Agility equipment: ${area.dog_agility_equipment || "Not specified"}
        Lighting: ${area.lighting || "Not specified"}`
            }))
        ].filter(result =>
            Number.isFinite(result.lat) &&
            Number.isFinite(result.lon)
        );

        searchResults.textContent = "";

        // Show a message if no locations were found
        if (results.length === 0) {
            searchResults.textContent = "No locations found.";
            return;
        }

        // Display each search result
        results.forEach(result => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "search-result";
            const name = document.createElement("strong");
            name.textContent = result.name;
            const details = document.createElement("span");
            details.textContent = `${result.suburb} · ${result.type}`;
            item.appendChild(name);
            item.appendChild(details);
            // Move the map when a search result is selected
            item.addEventListener("click", () => {
                const coordinates = [result.lat, result.lon];

                // Save the selected location
                selectedLocationCoordinates = coordinates;

                // Remove the previous search marker
                if (searchMarker) {
                    map.removeLayer(searchMarker);
                }

                // Create a marker for the selected location
                searchMarker = L.marker(
                    coordinates,
                    {
                        icon: result.type === "Park"
                            ? parkIcon
                            : offLeashIcon
                    }
                ).addTo(map);

                // Move the map to the selected location
                map.setView(coordinates, 16);

                // Update location details
                locationTitle.textContent = result.name;
                locationSuburb.textContent = result.suburb;
                locationInfo.textContent = result.info;

                // Close search and display location details
                searchPanel.classList.add("hidden");
                locationDetails.classList.remove("hidden");
            });
            searchResults.appendChild(item);
        });

    } catch (error) {
        console.error("Search error:", error);
        searchResults.textContent = "Unable to search locations.";
    }
}


// Search when the user presses Enter
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchLocations();
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

// Open Google Maps walking directions
getDirectionsButton.addEventListener("click", () => {

    // Make sure a destination has been selected
    if (!selectedLocationCoordinates) {
        return;
    }

    // Get the selected destination coordinates
    const lat = selectedLocationCoordinates[0];
    const lon = selectedLocationCoordinates[1];

    // Create the Google Maps directions URL
    const googleMapsUrl =
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;

    // Open Google Maps in a new tab
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");

});


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