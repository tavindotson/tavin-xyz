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
