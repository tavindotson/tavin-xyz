var loc = document.location;
var host = loc.host;
var path = loc.pathname;
// newHash is just the last item in the path
var newHash = path.split("/").pop();
loc.hash = newHash;
var newURL = "https://" + host + "/#" + newHash;
window.open(newURL, "_self");
