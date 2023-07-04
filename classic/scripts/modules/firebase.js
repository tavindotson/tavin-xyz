// (c) 2023 Tavin Dotson (tjd@tavin.xyz)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-performance.js";
import { toggleSidebar, betaAlert, getLocation } from "./site.js";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-check.js";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAseI6_He3TLFbfe22pHcvGHzG5KKjf9gM",
  authDomain: "tavin-xyz.firebaseapp.com",
  databaseURL: "https://tavin-xyz-default-rtdb.firebaseio.com",
  projectId: "tavin-xyz",
  storageBucket: "tavin-xyz.appspot.com",
  messagingSenderId: "648238165873",
  appId: "1:648238165873:web:853906753a16a39418d0d0",
  measurementId: "G-LMRVGL5CYB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lcw2XYfAAAAAHtzeAClOtogZ520cR6o_Ty3nikc"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const analytics = getAnalytics(app);
export const perf = getPerformance(app);

// ! Authentication
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Sign in with Google pop up
export const provider = new GoogleAuthProvider();
export function login() {
  let x = betaAlert();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("login successful");
      getLocation();
      toggleSidebar();
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Save some info to the userdata document in Firestore
      const docRef = doc(db, "userdata", user.uid);
      setDoc(docRef, { email: user.email }, { merge: true });
    })
    .catch((error) => {
      // Handle Errors here.
      console.log("login error");
      toggleSidebar();
      document.getElementById("loginbtn").innerText = "Error";
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export function logout() {
  sessionStorage.clear();
  localStorage.clear();
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      toggleSidebar();
      console.log("logout successful");
      location.href = "/";
    })
    .catch((error) => {
      toggleSidebar();
      console.log("logout failed");
    });
}

// ! Firestore
// Import the necessary functions
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getFirestore,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore(app);

// Edit user data (add if not present)
export async function editUserData(dataname, data) {
  // If data is not provided, prompt for it
  if (!data || !dataname) {
    dataname = prompt("Enter a name for your data:");
    data = prompt("Enter your data:");
  }

  // Leave function if user provides no data
  if (!dataname || !data) {
    console.log("User did not enter a name or forgot to enter the data");
    return;
  }

  // Check if user is logged in
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Edit the data
      const docRef = doc(db, "userdata", user.uid);
      setDoc(docRef, { [dataname]: data }, { merge: true });
    } else {
      // User logged out
    }
  });
}
window.editUserData = editUserData;

// Delete the user data, similar to editUserData
export async function deleteUserData(dataname) {
  if (!dataname) {
    dataname = prompt("Enter the name of the data you want to delete:");
  }
  if (!dataname) {
    console.log("User did not enter a name");
    return;
  }
  let doubleCheck = confirm(
    "Are you sure you want to delete '" + dataname + "'" + "?"
  );
  if (!doubleCheck || doubleCheck == "false") {
    return;
  }
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const docRef = doc(db, "userdata", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [dataname]: deleteField(),
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } else {
    // User is signed out
  }
}
window.deleteUserData = deleteUserData;

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