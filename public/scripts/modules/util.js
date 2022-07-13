// Author: Tavin Dotson (tjd@tavin.xyz)
// These functions handle behind the scenes tasks.

// Gets a cookie given a name.
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  let x = parts.pop().split(";").shift();
  return x;
}

// Sets a cookie given a name, value, and days to expire.
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";secure;SameSite=Strict;path=/";
}

export function clearCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

// UUIDv4 generator.
export function uuidv4() {
  return self.crypto.randomUUID();
}

// Download a file given data.
export function downloadFile(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

// Download a file given URL.
export function downloadURL(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch(console.error);
}

// Add an element to the body element.
export function addElementBody(src, type, script_type) {
  if (!type) {
    type = "script";
  }
  let el = document.createElement(type);
  el.src = src;
  if (script_type) {
    el.type = script_type;
  }
  document.body.prepend(el);
}

// Generate a random key.
export function generateKey() {
  let newKey = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 32; i++) {
    newKey += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return newKey;
}
