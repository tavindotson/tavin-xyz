// (c) 2023 Tavin Dotson (tjd@tavin.xyz)
import { editUserData } from "./firebase.js";

let theme = document.getElementById("stylesheet");
let themecolor = document.getElementById("theme-color");

const spanLight =
  "<span class='material-icons' style='transform: translate(0,3px)'> light_mode </span>";
const spanDark =
  "<span class='material-icons' style='transform: translate(0,3px)'> dark_mode </span>";

export async function toggleTheme() {
  let themebtn = document.getElementById("theme-btn");
  if (theme.getAttribute("href") === "./styles/main.css") {
    theme.setAttribute("href", "./styles/dark.css");
    editUserData("theme", "dark");
    themecolor.setAttribute("content", "#000000");
    if (themebtn) {
      themebtn.innerHTML = spanLight;
    }
  } else {
    theme.setAttribute("href", "./styles/main.css");
    editUserData("theme", "light");
    themecolor.setAttribute("content", "#00008b");
    if (themebtn) {
      themebtn.innerHTML = spanDark;
    }
  }
}

export async function setThemeDark() {
  let themebtn = document.getElementById("theme-btn");
  theme.setAttribute("href", "./styles/dark.css");
  themecolor.setAttribute("content", "#000000");
  editUserData("theme", "dark");
  if (themebtn) {
    themebtn.innerHTML = spanLight;
  }
}

export async function setThemeLight() {
  let themebtn = document.getElementById("theme-btn");
  theme.setAttribute("href", "./styles/main.css");
  themecolor.setAttribute("content", "#00008b");
  editUserData("theme", "light");
  if (themebtn) {
    themebtn.innerHTML = spanDark;
  }
}

export async function addThemebtn() {
  // construct a button
  let themebtn = document.createElement("button");
  themebtn.setAttribute("id", "theme-btn");
  themebtn.setAttribute("class", "button sidebarbtn");
  themebtn.setAttribute("onclick", "toggleTheme()");
  themebtn.innerHTML = "Toggle Theme ";
  // add a span to the button
  let span = document.createElement("span");
  span.setAttribute("class", "material-icons buttonicons");
  span.innerHTML = "desktop_windows";
  themebtn.appendChild(span);

  // append the button to the button_wrap
  let button_wrap = document.getElementById("button_wrap");
  button_wrap.prepend(themebtn);
}

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