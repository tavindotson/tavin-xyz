// Tavin Dotson (tjd@tavin.xyz)

// site-events is all the functionality of the elements found
// in index.html.

// Login button is clicked.
document.getElementById("login").addEventListener("click", function () {
  location.hash = "login";
  toggleSidebar();
});
document.getElementById("logout").addEventListener("click", logout);

// Home button is clicked.
document.getElementById("home").addEventListener("click", function () {
  window.location.hash = "home";
  toggleSidebar();
});

// User Photo is clicked.
const userPhoto = document.getElementById("userPhoto");
const userPhotoShow = document.getElementById("userPhotoShow");
userPhoto.addEventListener("click", function () {
  userPhoto.style.opacity = "0";
  userPhotoShow.style.display = "block";
});

// Fullscreen button is clicked.
document
  .getElementById("fullscreenButton")
  .addEventListener("click", function () {
    // make the whole page fullscreen
    toggleFullscreen();
    toggleSidebar();
  });

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
window.toggleFullscreen = toggleFullscreen;

// User Data button is clicked.
document.getElementById("data").addEventListener("click", function () {
  window.location.hash = "data";
  toggleSidebar();
});

// User clicks the install PWA button
// document.getElementById("downloadBtn").addEventListener("click", function () {
//   // if the screen width is smaller than 460px
//   if (window.innerWidth < 460) {
//     document.getElementById("sidebar").style.display = "none";
//   }
// });

// Theme button is clicked.
document.getElementById("theme").addEventListener("click", function () {
  window.location.hash = "theme";
  toggleSidebar();
});

// Apps button is clicked.
document.getElementById("app_link").addEventListener("click", function () {
  externalLink("https://auth.tavin.xyz");
  toggleSidebar();
});

// Applink button is clicked.
document.getElementById("applink").addEventListener("click", function () {
  window.location.href = "https://apps.tavin.xyz";
  toggleSidebar();
});

// wikiLink button is clicked.
document.getElementById("wikiLink").addEventListener("click", function () {
  window.location.href = "https://wiki.tavin.xyz";
  toggleSidebar();
});

// Chat button is clicked.
document.getElementById("chatLink").addEventListener("click", function () {
  window.location.hash = "chat";
  toggleSidebar();
});

// Report Bug button is clicked.
document.getElementById("reportLink").addEventListener("click", function () {
  window.location.hash = "report";
  toggleSidebar();
});

// Status button is clicked.
// document.getElementById("statusLink").addEventListener("click", function () {
//   externalLink("https://uptime.tavin.xyz/status/general");
//   toggleSidebar();
// });

// About button is clicked.
document.getElementById("about").addEventListener("click", function () {
  window.location.hash = "about";
  toggleSidebar();
});

// Menu button is clicked. (Mobile Only)
async function toggleSidebar() {
  if (window.innerWidth < 460) {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.display == "none" || sidebar.style.display == "") {
      document.getElementById("sidebar").style.display = "flex";
    } else {
      document.getElementById("sidebar").style.display = "none";
    }
  }
}
window.toggleSidebar();
document.getElementById("menuButton").addEventListener("click", toggleSidebar);
toggleSidebar();

// On hash change, update the page content.
window.addEventListener("hashchange", updatePageContent);
window.addEventListener("hashchange", function () {
  // if the new hash is "data"

  if (location.hash === "#data") {
    userDataPage();
  }
  if (location.hash === "#home" || !location.hash) {
    showOur3D();
    document.getElementById("our3DContent").style.display = "block";
  } else {
    document.getElementById("our3DContent").style.display = "none";
  }
  if (location.hash === "#status") {
    // Redirect to the status page.
    window.location.href = "https://uptime.tavin.xyz/status/general";
  }
});

// Show menu button on mobile, hide on desktop.
// Triggers on resize and page load.
function hideShowMenuButton() {
  const menubtn = document.getElementById("menuButton");
  if (window.innerWidth < 460) {
    menubtn.style.display = "block";
  } else {
    menubtn.style.display = "none";
  }
}
window.addEventListener("resize", () => {
  hideShowMenuButton();
});
window.addEventListener("load", () => {
  hideShowMenuButton();
});

// On the homepage, show the 3D content
// in our3d.js
function showOur3D() {
  if (location.hash === "#home" || !location.hash) {
    if (!document.getElementById("3DCanvas")) {
      let target = document.getElementById("our3DContent");
      if (target) {
        target.innerHTML = "";
        // append a new element to mainContent
        let newElement = document.createElement("div");
        newElement.id = "our3DWrap";
        target.appendChild(newElement);
        // append a script tag to mainContent
        let newScript = document.createElement("script");
        newScript.src = "./scripts/modules/our3D.js";
        newScript.setAttribute("type", "module");
        target.appendChild(newScript);
      }
    }
  }
}

// Loads content using the w3.js w3-include-html function.
function updatePageContent() {
  let hash = location.hash;
  let page = hash.substring(1);
  if (hash) {
    if (page !== "home") {
      document
        .getElementById("mainContent")
        .setAttribute("w3-include-html", "./html/" + page + ".html");
    } else {
      document
        .getElementById("mainContent")
        .setAttribute("w3-include-html", "./html/" + "home" + ".html");
      showOur3D();
    }
  }
  if (!hash) {
    document
      .getElementById("mainContent")
      .setAttribute("w3-include-html", "./html/" + "home" + ".html");
    showOur3D();
  }
  w3.includeHTML();
}
window.updatePageContent = updatePageContent;
updatePageContent();

async function join_meeting() {
  let meeting_id = prompt("Enter the meeting ID:");

  if (meeting_id) {
    location.hash = "join_meeting";
    setTimeout(function () {
      let meeting_iframe = document.getElementById("meeting_iframe");
      meeting_iframe.src = `https://meet.tavin.xyz/` + meeting_id;
    }, 500);
  } else {
    alert("Please enter a valid meeting ID.");
  }
}
window.join_meeting = join_meeting;

async function externalLink(link) {
  window.open(link, "_self");
  // if (confirm("This link will take you away from Tavin.xyz. Are you sure?")) {
  //   window.open(link, "_blank");
  // } else {
  //   return false;
  // }
}
window.externalLink = externalLink;

async function liveChat() {
  let liveChat = document.getElementById("liveChatWrap");
  location.hash = "chat";
  setInterval(function () {
    window.addEventListener(
      "hashchange",
      (event) => {
        if (event.oldURL.includes("chat")) {
          if (liveChat) {
            liveChat.style.display = "flex";
          }
        }
      },
      false
    );
  }, 100);
}
window.liveChat = liveChat;

async function loginPage() {
  location.hash = "login";
}
window.loginPage = loginPage;
