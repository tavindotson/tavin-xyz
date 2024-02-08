// Tavin Dotson (tjd@tavin.xyz)

var loc = document.location;
var host = loc.host;
var path = loc.pathname;
var newHash = path.split("/").pop(); // newHash is just the last item in the path
loc.hash = newHash;
var newURL = "https://" + host + "/#" + newHash;
window.open(newURL, "_self");
