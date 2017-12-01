

function initMap(addressHome,competitors, cb) {
    console.log("s");
    var uluru = {lat: 0, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });

    var geocoder = new google.maps.Geocoder();
    var address = addressHome;
    geocodeAddress(geocoder, map, address);
    var geocoder2 = new google.maps.Geocoder();
    var address2 = competitors[0].streetAddress;
    geocodeAddress(geocoder2, map, address2);
    var geocoder3 = new google.maps.Geocoder();
    var address3 = competitors[1].streetAddress;
    geocodeAddress(geocoder3, map, address3);
    var geocoder4 = new google.maps.Geocoder();
    var address4 = competitors[2].streetAddress;
    geocodeAddress(geocoder4, map, address4);
    var geocoder5 = new google.maps.Geocoder();
    var address5 = competitors[3].streetAddress;
    geocodeAddress(geocoder5, map, address5);
    var geocoder6 = new google.maps.Geocoder();
    var address6 = competitors[4].streetAddress;
    geocodeAddress(geocoder6, map, address6);

    cb(competitors);
}

function geocodeAddress(geocoder, resultsMap, address, cb) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    cb();
}
