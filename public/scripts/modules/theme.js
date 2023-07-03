// Tavin Dotson (tjd@tavin.xyz)

import { addUserData } from "./firebase.js";

export function setTheme(theme) {
  if (theme && theme !== "undefined") {
    addUserData("theme", theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export function themeColor() {
  let refBody = document.querySelector("body");
  var themeColor = window.getComputedStyle(refBody).getPropertyValue("color");
  localStorage.setItem("themecolor", themeColor);
  return themeColor;
}
window.themeColor = themeColor;
