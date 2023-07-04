// (c) 2023 Tavin Dotson (tjd@tavin.xyz)
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

// This file is part of the source code of Tavin.xyz.

// This is free software: you can redistribute it and / or modify it under
// the terms of the GNU General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option)
// any later version.

// This code is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details.

// You should have received a copy of the GNU General Public License along
// with this source. If not, see < https://www.gnu.org/licenses/>.
