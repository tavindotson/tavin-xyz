// (c) 2023 Tavin Dotson (tjd@tavin.xyz)

// Import firebase functions
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-performance.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh6_8Q7uEg-sFTFbCOpoQ7XS6yYRIKaVY",
  authDomain: "tavin-xyz-2.firebaseapp.com",
  projectId: "tavin-xyz-2",
  storageBucket: "tavin-xyz-2.appspot.com",
  messagingSenderId: "487199339263",
  appId: "1:487199339263:web:547581b4a307a2d91252ca",
  measurementId: "G-4Y7Z0HBN6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);
const perf = getPerformance(app);

// AppCheck for database security
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcqC9AfAAAAABjfO9vKuKI8WwRfB2wPtob3aXZs"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

// Checks for active user and adjusts the UI as necessary
export function checkUser() {
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    let loginGuestBtn = document.getElementById("loginGuestBtn");
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      // just the first item in user.displayName
      if (user.displayName) {
        let firstname = user.displayName.split(" ")[0];
        document.getElementById("welcomeTitle").innerText =
          "Welcome " + firstname;
      }
      document.getElementById("loginItem").style.display = "none";
      document.getElementById("logoutItem").style.display = "block";
      if (user.photoURL) {
        let userPhoto = document.getElementById("userPhoto");
        if (userPhoto) {
          userPhoto.src = user.photoURL;
          userPhoto.style.opacity = 1;
        }
      }
      document.body.style.opacity = "1";
      document.getElementById("userMenu").style.display = "flex";
      updatePageContent();
      if (loginGuestBtn) {
        loginGuestBtn.style.display = "none";
      }
    } else {
      document.getElementById("userPhotoShow").style.display = "none";
      document.getElementById("loginItem").style.display = "block";
      document.getElementById("logoutItem").style.display = "none";
      document.getElementById("welcomeTitle").innerText = "Welcome";
      document.getElementById("userPhoto").style.opacity = 0;
      document.getElementById("userPhoto").src = "";
      document.body.style.opacity = "1";
      document.getElementById("userMenu").style.display = "none";
      if (loginGuestBtn) {
        loginGuestBtn.style.display = "block";
      }
      // User is signed out
      // ...
    }
  });
}

export function addUserData(label, value) {
  var docRef = "";
  const user = auth.currentUser;
  if (user) {
    if (!label) {
      label = prompt("Enter a new or current data label");
    }
    if (!value) {
      value = prompt(
        "Enter some data (this will overwrite data if it already exists)"
      );
      if (!value) {
        alert("No data entered");
        return;
      }
    }
    if (sessionStorage.getItem("anon") == "true") {
      docRef = doc(db, "anondata", user.uid);
    } else {
      docRef = doc(db, "userdata", user.uid);
    }
    setDoc(
      docRef,
      {
        webdata: { [label]: value },
      },
      { merge: true }
    );
  }
}
window.addUserData = addUserData;

function clearUserData() {
  let response = confirm(
    "Are you sure you want to clear all this data from the server? (This will not delete your user, some data will be retained)"
  );
  if (response === true) {
    sessionStorage.clear();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "userdata", user.uid);
      updateDoc(docRef, {
        webdata: deleteField(),
      });
    }
  }
}
window.clearUserData = clearUserData;

// Trigger login flow
export function login() {
  // timestamp as string
  let date = new Date();
  let timestamp = new Date().toLocaleString();
  let timezone = date.getTimezoneOffset() / 60;
  let timezoneString = "UTC-" + timezone;
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // ...
      // Save data to the userdata document in Firestore
      const docRef = doc(db, "userdata", user.uid);
      setDoc(
        docRef,
        {
          usertype: "normal",
          email: user.email,
          last_login: timestamp,
          last_login_timezone: timezoneString,
          photo: user.photoURL,
          email: user.email,
          phone: user.phoneNumber,
          name: user.displayName,
          webdata: {
            email: user.email,
            name: user.displayName,
          },
        },
        { merge: true }
      );
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      document.getElementById("mainContent").innerHTML = errorMessage;
    });
}
window.login = login;

export function loginGuest() {
  let response = confirm(
    "You will be signed in as a one-time guest user. Your data will not be retained, and will be deleted if you logout or leave the page."
  );
  if (response == true) {
    let date = new Date();
    let timestamp = new Date().toLocaleString();
    let timezone = date.getTimezoneOffset() / 60;
    let timezoneString = "UTC-" + timezone;
    signInAnonymously(auth)
      .then((result) => {
        // Signed in..
        sessionStorage.setItem("anon", true);
        const user = result.user;
        const docRef = doc(db, "anondata", user.uid);
        setDoc(
          docRef,
          {
            usertype: "anon",
            login_timestamp: timestamp,
            login_timezone: timezoneString,
            webdata: {
              user: "anon",
            },
          },
          { merge: true }
        );
        let userPhoto = document.getElementById("userPhoto");
        if (userPhoto) {
          userPhoto.src =
            "https://tavin-xyz-public.s3.us-west-2.amazonaws.com/media/tmp.jpg";
          userPhoto.style.opacity = 1;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        document.getElementById("mainContent").innerHTML = errorMessage;
      });
  }
}
window.loginGuest = loginGuest;

// Trigger logout flow
export function logout() {
  if (sessionStorage.getItem("anon") == "true") {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }
  signOut(auth)
    .then(() => {
      // Success
      sessionStorage.clear();
      localStorage.clear();
      window.location.hash = "home";
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("mainContent").innerText = error.message;
    });
}

window.logout = logout;

export function userDataPage() {
  var docRef = "";
  if (window.location.hash === "#data") {
    const user = auth.currentUser;
    if (sessionStorage.getItem("anon") == "true") {
      docRef = doc(db, "anondata", user.uid);
    } else {
      docRef = doc(db, "userdata", user.uid);
    }
    const unsub = onSnapshot(docRef, (doc) => {
      let dataContainer = document.getElementById("dataContainer");
      if (dataContainer) {
        dataContainer.innerHTML = "";
        let data = doc.data();
        // for each item in the webdata object
        for (let key in data.webdata) {
          // create a new div for each item
          let newDiv = document.createElement("div");
          newDiv.classList.add("dataItem");
          newDiv.innerText = key + ": " + data.webdata[key];
          // prepend the newDiv to the mainContent
          dataContainer.prepend(newDiv);
        }
      }
    });
    window.addEventListener("hashchange", () => {
      unsub();
    });
    window.addEventListener("storage", () => {
      unsub();
    });
  }
}
window.userDataPage = userDataPage;

// Some parts of this file are provided under the licenses
// listed on Google's Firebase website.

// This is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// The code is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// The source code should include a copy of the GPL.
// If not, see <https://www.gnu.org/licenses/>.
