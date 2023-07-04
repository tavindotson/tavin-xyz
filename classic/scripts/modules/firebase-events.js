// (c) 2023 Tavin Dotson (tjd@tavin.xyz)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  doc,
  onSnapshot,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { firebaseConfig } from "./firebase.js";
import { setTitle, setLoginbtn, setLogoutbtn } from "./site.js";
import { setThemeDark, setThemeLight, addThemebtn } from "./theme.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Checks the user's login status
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  let userDataBtn = document.getElementById("userDataBtn");
  // If the user is logged in subscribe to the userdata document in Firestore
  if (user) {
    const subUserData = onSnapshot(doc(db, "userdata", user.uid), (doc) => {
      // Transform the data into JSON
      let x = JSON.stringify(doc.data());
      let y = JSON.parse(x);

      // Theme stays in sync with firestore
      async function themeSync() {
        let theme = y["theme"];
        if (theme === "light") {
          setThemeLight();
        }
        if (theme === "dark") {
          setThemeDark();
        }
      }
      themeSync();

      // If the user is on the user_data page, show the user data
      // TODO: This requires a page reload, which is not ideal.
      async function showUserData() {
        let targetE = document.getElementById("userDataBlock");
        let targetWrapper = document.getElementById("userDataBlock");
        if (targetE) {
          // Remove the data first
          function removeAllChildNodes() {
            while (targetE.firstChild) {
              targetE.removeChild(targetE.firstChild);
            }
          }
          removeAllChildNodes();
          // Add new data
          for (let key in y) {
            let p = document.createElement("p");
            p.innerText = key + ": " + y[key];
            p.classList.add("user_data_item");
            targetE.prepend(p);
            targetWrapper.classList.add("user_data_block_active");
          }
        }
      }
      showUserData();
    });

    // Functions that do not sync with Firestore:

    // Update the page title and buttons
    let firstname = user.displayName.split(" ")[0];
    setTitle("Hello " + firstname + "!");
    setLogoutbtn();
    addThemebtn();
    if (userDataBtn) {
      userDataBtn.style.display = "block";
    }
  } else {
    // If the user is not logged in
    // These functions do not sync with Firestore
    // Update the page title and buttons
    let googleimg = document.getElementById("googleloginbtn");
    setTitle("Welcome!");
    if (!googleimg) {
      setLoginbtn();
    }
    if (userDataBtn) {
      userDataBtn.style.display = "none";
    }
    let targetE = document.getElementById("userDataBlock");
    let targetWrapper = document.getElementById("userDataBlock");
    let p = document.createElement("p");
    if (targetE) {
      p.innerText = "User is not logged in.";
      p.classList.add("user_data_item");
      targetE.prepend(p);
      targetWrapper.classList.add("user_data_block_active");
    }
  }
});

// This file is part of the source code of Tavin.xyz.

// This is free software: you can redistribute it and / or modify it under
// the terms of the GNU General Public License as published by the Free
// Software Foundation, either version 3 of the License, or(at your option)
// any later version.

// This code is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for
// more details.

// You should have received a copy of the GNU General Public License along
// with Foobar.If not, see < https://www.gnu.org/licenses/>.
