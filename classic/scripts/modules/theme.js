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
