function initMap(addressHome, compe1) {
    var uluru = {lat: 0, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });
    var geocoder = new google.maps.Geocoder();
    var address = "111 S River Road, West Lafayette, IN";
    geocodeAddress(geocoder, map, address);
    var geocoder2 = new google.maps.Geocoder();
    var address2 = "1851 Nobili Ave";
    geocodeAddress(geocoder, map, address2);
    var geocoder3 = new google.maps.Geocoder();
    var address3 = "111 S River Road, West Lafayette, IN";
    geocodeAddress(geocoder, map, address);
    var geocoder4 = new google.maps.Geocoder();
    var address4 = "1851 Nobili Ave";
    geocodeAddress(geocoder, map, address2);
    var geocoder5 = new google.maps.Geocoder();
    var address5 = "111 S River Road, West Lafayette, IN";
    geocodeAddress(geocoder, map, address);
    var geocoder6 = new google.maps.Geocoder();
    var address6 = "1851 Nobili Ave";
    geocodeAddress(geocoder, map, address2);
}
function geocodeAddress(geocoder, resultsMap, address) {

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
}