
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.checkCookie = checkCookie;
exports.deleteCookie = deleteCookie;
function setCookie(cname, cvalue, exdays) {
    //cname is just "username", cvalue is their actual username, and
    //exdays is how many days before we want it to expire (365).
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}

function deleteCookie(cname) {
    document.cookie = name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
}