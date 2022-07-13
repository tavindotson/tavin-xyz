import {
  updatePageContent,
  updateHash,
  toggleSidebar,
  join_meeting,
  start_meeting,
  metaCSP,
  betaAlert,
  getLocation,
} from "./modules/site.js";
import { addElementBody } from "./modules/util.js";
import { login, logout } from "./modules/firebase.js";
import { toggleTheme } from "./modules/theme.js";

window.updatePageContent = updatePageContent;
window.updateHash = updateHash;
window.toggleSidebar = toggleSidebar;
window.join_meeting = join_meeting;
window.start_meeting = start_meeting;
window.login = login;
window.logout = logout;
window.betaAlert = betaAlert;
window.toggleTheme = toggleTheme;
window.getLocation = getLocation;

updatePageContent();
metaCSP();

addElementBody("./scripts/events.js", "script");
addElementBody("./scripts/firebase.js", "module");
