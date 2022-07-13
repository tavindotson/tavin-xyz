import { addElementBody } from "./modules/util.js";
import { checkUser } from "./modules/firebase.js";
import { setTheme, themeColor } from "./modules/theme.js";

window.setTheme = setTheme;
window.themeColor = themeColor;

addElementBody("./scripts/site-events.js", "script");
addElementBody("./scripts/modules/firebase.js", "script", "module");

checkUser();
