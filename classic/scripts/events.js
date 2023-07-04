// (c) 2023 Tavin Dotson (tjd@tavin.xyz)
// Controls when the home button is shown
async function homeButton() {
  function checkForHomeHash() {
    let homebutton = document.getElementById("gohomebtn");
    if (homebutton) {
      if (location.hash !== "#home") {
        homebutton.style.opacity = "1";
      }
      if (location.hash === "#home" || location.hash === "") {
        homebutton.style.opacity = "0";
      }
    }
  }
  checkForHomeHash();
  window.addEventListener("hashchange", function () {
    checkForHomeHash();
  });
}
homeButton();

// Toggles sidebar when menu button is clicked
async function MenuButtonState() {
  if (window.innerWidth > 480) {
    return false;
  }
  let menuicon = document.getElementById("menuicon");
  menuicon.onclick = function () {
    toggleSidebar();
  };
}
MenuButtonState();

// Sets the footer text
async function footerTextUpdate() {
  document.getElementById("footertxt").innerText =
    "© " + new Date().getFullYear() + " Tavin Dotson";
}
footerTextUpdate();

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
