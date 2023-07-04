// (c) 2023 Tavin Dotson (tjd@tavin.xyz)
// Gets the main content element based on the URL hash.

import { editUserData } from "./firebase.js";
import { GeoPoint } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

export async function updatePageContent() {
  let hash = location.hash;
  let page = hash.substring(1);
  if (hash) {
    document
      .getElementById("content_wrap")
      .setAttribute("w3-include-html", "./html/" + page + ".html");
  }
  w3.includeHTML();
}

// Sets the hash
export function updateHash(hash, title) {
  if (title) {
    document.getElementById("pagetitle").innerHTML = title;
  }
  location.hash = hash;
  updatePageContent();
  toggleSidebar();
}

export async function toggleSidebar() {
  if (window.innerWidth < 460) {
    let sidebarDisplay = document.getElementById("sidebar").style.display;

    if (!sidebarDisplay) {
      document.getElementById("sidebar").style.display = "flex";
      document.getElementById("sidebar").style.opacity = 1;
    } else {
      setTimeout(function () {
        document.getElementById("sidebar").style.opacity = 0;
        document.getElementById("sidebar").style.display = "";
      }, 100);
    }
  }
}

export function start_meeting() {
  toggleSidebar();
  window.open("https://meet.tavin.xyz/", "_blank");
}

export function join_meeting() {
  toggleSidebar();
  // ask the user for the meeting ID
  let meeting_id = prompt("Enter the meeting ID:");
  let timestamp = Date.now();
  editUserData("meeting_id", meeting_id);
  editUserData("meeting_id_timestamp", timestamp);
  // if meeting id is longer than 20 characters, it's invalid
  if (meeting_id.length > 20) {
    alert("Invalid meeting ID");
    return false;
  }
  if (meeting_id) {
    updateHash("join_meeting", "Join Meeting");
    setTimeout(function () {
      let meeting_iframe = document.getElementById("meeting_iframe");
      meeting_iframe.src = `https://meet.tavin.xyz/` + meeting_id;
    }, 500);
  } else {
    alert("Please enter a valid meeting ID.");
  }
}

// Content Security Policy
export function metaCSP() {
  // Construct a meta header element with the id Content-Security-Policy.
  const meta = document.createElement("meta");
  meta.id = "Content-Security-Policy";
  meta.httpEquiv = "Content-Security-Policy";
  // Add to the beginning of the head.
  document.head.prepend(meta);
  // Set the meta header value.
  document.getElementById("Content-Security-Policy").content =
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' *;";
}

// Sets the page title
export async function setTitle(name) {
  let pagetitle = document.getElementById("pagetitle");
  if (pagetitle) {
    pagetitle.innerHTML = name;
  }
}

// Shows the logout button
export function setLogoutbtn() {
  let loginbtn = document.getElementById("loginbtn");
  let googleimg = document.getElementById("googleloginbtn");
  if (loginbtn) {
    loginbtn.display = "block";
    loginbtn.innerHTML = "Logout ";
    loginbtn.setAttribute("onclick", "logout()");
    // add a span elemnet to the loginbtn
    let span = document.createElement("span");
    span.className = "material-icons buttonicons";
    span.innerText = "logout";
    loginbtn.appendChild(span);
    if (googleimg) {
      googleimg.style.display = "none";
    }
    loginbtn.style.display = "block";
  }
}

// // Old code
// export function setLoginbtn() {
//   let loginbtn = document.getElementById("loginbtn");
//   let button_wrap = document.getElementById("button_wrap");
//   if (loginbtn) {
//     loginbtn.style.display = "none";
//     let img = document.createElement("img");
//     img.src =
//       "https://tavin-xyz-public.s3.us-west-2.amazonaws.com/media/google-login.png";
//     img.className = "googleloginbtn";
//     img.style.width = "calc(var(--button-width) + 10px)";
//     img.setAttribute("id", "googleloginbtn");
//     img.setAttribute("onclick", "login()");
//     button_wrap.prepend(img);
//   }
// }

export function betaAlert() {
  alert(
    "User accounts are still in beta. You may need to enable popups for this to work. Your location is requested and stored, but optional."
  );
  return;
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  let geoLocation = new GeoPoint(
    position.coords.latitude,
    position.coords.longitude
  );
  let timestamp = new Date();
  editUserData("locations", { [timestamp]: geoLocation });
}

// This file is part of the source code of Tavin.xyz.

// This is free software: you can redistribute it and / or modify it under
// the terms of the GNU General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option)
// any later version.

// This code is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details.

// You should have received a copy of the GNU General Public License along
// with this source. If not, see < https://www.gnu.org/licenses/>.