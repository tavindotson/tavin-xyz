// (c) 2023 Tavin Dotson (tjd@tavin.xyz)

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
