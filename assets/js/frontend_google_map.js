window.initMap = function () {
    let map;
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();

    // Custom map style to hide POI and other unwanted elements
    const mapStyle = [
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                { "visibility": "off" }
            ]
        }
    ];

    // Define a single InfoWindow instance globally
    let activeInfoWindow = null;

    // let mapId = '9ce4a53aa3dfd0ff';

    // Initialize the Google map
    map = new google.maps.Map(document.getElementById('map'), {
        // center: { lat: 48.8566, lng: 2.3522 }, // Default map center (example: Paris)
        center: { lat: 41.0082, lng: 28.9784 }, // Istanbul
        zoom: 13,
        mapId: "DEMO_MAP_ID",
        styles: mapStyle
    });

    // Initialize the DirectionsRenderer and link it to the map
    directionsRenderer.setMap(map);

    // Loop through all the listing items and add markers to the map
    $(".product-box2").each(function (index, selector) {
        setMapMarker(selector, false);
    });

    // Set marker on click of any listing
    // $(document).on("click", ".listing-map-box", function () {
    //     setMapMarker(this, true);
    // });
    $(document).on("mouseenter", ".product-box2", function () {
        setMapMarker(this, true);
    });

    // Function to set markers on the map
    function setMapMarker(selector, isNew = false) {
        let lat = $(selector).data("lat");
        let lng = $(selector).data("long");
        let title = $(selector).data("title");
        let category = $(selector).data("category");
        let image = $(selector).data("image");
        let route = $(selector).data("route");

        // Set the map's center to the new marker position
        map.setCenter({ lat: lat, lng: lng });
        map.setZoom(13);

        // SVG as a string



        // Convert the HTML string to a DOM element
        const parser = new DOMParser();
        const markerIconElement = parser.parseFromString(`
            <div class="marker-icon-box">
                <svg viewBox="0 0 32 39" width="28" height="34" class="" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 14.9133C1 7.25666 7.74536 1 16 1C24.2546 1 31 7.25666 31 14.9133C31 23.0868 22.1997 31.2172 17.4745 35.6324L16 37L14.5255 35.5893L14.4518 35.5209C9.72064 31.1327 1 23.0443 1 14.9133Z" fill="#004f32"></path>
                    <path d="M14.4518 35.5209L15.1318 34.7877L15.1318 34.7877L14.4518 35.5209ZM14.5255 35.5893L15.2169 34.8667L15.2113 34.8614L15.2056 34.8561L14.5255 35.5893ZM16 37L15.3087 37.7226L15.9894 38.3738L16.68 37.7332L16 37ZM17.4745 35.6324L18.1545 36.3655L18.1572 36.363L17.4745 35.6324ZM16 0C7.26523 0 0 6.63488 0 14.9133H2C2 7.87843 8.22549 2 16 2V0ZM0 14.9133C0 19.3161 2.34772 23.5918 5.1604 27.2321C7.98976 30.8939 11.4122 34.0656 13.7718 36.2541L15.1318 34.7877C12.7602 32.588 9.45677 29.5214 6.74302 26.0092C4.0126 22.4755 2 18.6415 2 14.9133H0ZM13.7717 36.254L13.8455 36.3225L15.2056 34.8561L15.1318 34.7877L13.7717 36.254ZM13.8342 36.3118L15.3087 37.7226L16.6913 36.2774L15.2169 34.8667L13.8342 36.3118ZM16.68 37.7332L18.1545 36.3655L16.7944 34.8992L15.32 36.2668L16.68 37.7332ZM18.1572 36.363C20.5111 34.1635 23.9522 30.9742 26.8 27.2942C29.6313 23.6357 32 19.3384 32 14.9133H30C30 18.6616 27.9686 22.5163 25.2183 26.0702C22.4847 29.6025 19.163 32.686 16.7917 34.9017L18.1572 36.363ZM32 14.9133C32 6.63488 24.7348 0 16 0V2C23.7745 2 30 7.87843 30 14.9133H32Z" fill="#004f32"></path>
                </svg>
                <svg viewBox="0 0 24 24" width="14px" height="14px" class="icon-middle">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.548 1.75a.75.75 0 0 1 .75.75v1.26h9v2h7.904l-2.84 6.25 2.84 6.26h-9.404v-2h-7.5v5.98h-1.5V2.5a.75.75 0 0 1 .75-.75m.75 13.02h7.5V5.26h-7.5zm9 2h5.576l-2.16-4.76 2.159-4.75h-5.575z"></path>
                </svg>
                <div class="add-icon">
                    <svg viewBox="0 0 24 24" width="14px" height="14px">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.03 7.265 9.5 17.795l-5.53-5.53 1.06-1.06 4.47 4.47 9.47-9.47z"></path>
                    </svg>
                </div>
            </div>`, 'text/html').body.firstChild;

        // Create a marker
        let marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: lat, lng: lng },
            map: map,
            title: title,
            content: markerIconElement  // Use the DOM element as content
        });

        // Create content for the InfoWindow
        let content = `
        <div class="map-product-box">
                            <div class="img-box">
                                <img src="${image}" alt="${title}" style="width: 100%; height: 100px; margin-bottom: 5px"/>
                            </div>
                            <div class="text-box">
                            <div class="d-flex justify-content-between gap-2">
                                <div>
                                    <a class="title" href="${route}" target="_blank" >${title}</a>
                                    <div class="reviews d-flex align-items-center gap-2">
                                        <div>
                                            <i class="active fa-solid fa-star"></i>
                                            <i class="active fa-solid fa-star"></i>
                                            <i class="active fa-solid fa-star"></i>
                                            <i class="active fa-solid fa-star"></i>
                                            <i class="active fa-solid fa-star"></i>
                                        </div>
                                        <span>(5)</span>
                                    </div>
                                </div>

                                <button type="button" class="add-remove-btn">
                                    <i class="fa-regular fa-check"></i>
                                </button>
                                </div>
                                <p><i class="fa-regular fa-fork-knife"></i> ${category}</p>
                            </div>
                    </div>`;

        // Add click listener to the marker
        marker.addListener('click', function () {
            // Close the currently open InfoWindow, if any
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }

            // Create a new InfoWindow or reuse the existing instance
            if (!activeInfoWindow) {
                activeInfoWindow = new google.maps.InfoWindow();
            }

            // Set content and open the InfoWindow
            activeInfoWindow.setContent(content);
            activeInfoWindow.open(map, marker);
        });

        // Open the InfoWindow by default for a new marker
        if (isNew) {
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }
            if (!activeInfoWindow) {
                activeInfoWindow = new google.maps.InfoWindow();
            }
            activeInfoWindow.setContent(content);
            activeInfoWindow.open(map, marker);
        }
    }

    // Function to get directions from user's current location to the marker location
    function getDirections(destinationLat, destinationLng) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            let destination = {
                lat: destinationLat,
                lng: destinationLng
            };

            let request = {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING // or WALKING, BICYCLING, etc.
            };

            // Request directions
            directionsService.route(request, function (result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    // Display the route on the map
                    directionsRenderer.setDirections(result);
                } else {
                    alert("Could not get directions: " + status);
                }
            });
        });
    }

    // Attach click event handler using jQuery
    $(document).on('click', '.get-directions', function () {
        let lat = $(this).data('lat');
        let lng = $(this).data('lng');
        getDirections(lat, lng);
    });
};
