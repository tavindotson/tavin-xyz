import { addElementBody, setCookie, getCookie } from "./modules/util.js";
import { checkUser } from "./modules/firebase.js";
import { setTheme, themeColor } from "./modules/theme.js";

window.setTheme = setTheme;
window.themeColor = themeColor;

addElementBody("./scripts/site-events.js", "script");
addElementBody("./scripts/modules/firebase.js", "script", "module");

checkUser();

function askForFullScreen() {
  // If there is no cookie with the name QuestionFullscreen then ask the user if they would like to go fullscreen.
  if (!getCookie("QuestionFullscreen")) {
    if (
      confirm(
        "This website is better experienced in fullscreen mode. Click OK to go fullscreen."
      )
    ) {
      setCookie("QuestionFullscreen", true);
      document.documentElement.requestFullscreen();
    } else {
      setCookie("QuestionFullscreen", "declined");
    }
  }
}

if (
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  askForFullScreen();
} else {
  setCookie("QuestionFullscreen", "autodecline-mobile");
}
