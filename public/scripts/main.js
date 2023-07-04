// (c) 2023 Tavin Dotson (tjd@tavin.xyz)

import { addElementBody, setCookie, getCookie } from "./modules/util.js";
import { checkUser } from "./modules/firebase.js";
import { setTheme, themeColor } from "./modules/theme.js";

window.setTheme = setTheme;
window.themeColor = themeColor;

addElementBody("./scripts/site-events.js", "script");
addElementBody("./scripts/modules/firebase.js", "script", "module");

checkUser();

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
