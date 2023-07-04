// (c) 2023 Tavin Dotson (tjd@tavin.xyz)

import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";

var mainContent = document.getElementById("our3DContent");
var our3D = document.getElementById("3DCanvas");

async function createOur3D() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    mainContent.offsetWidth / mainContent.offsetHeight,
    1,
    1000
  );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(mainContent.offsetWidth, mainContent.offsetHeight);
  document.body.addEventListener("resize", function () {
    renderer.setSize(mainContent.offsetWidth, mainContent.offsetHeight);
  });
  renderer.domElement.style.position = "absolute";
  renderer.domElement.id = "3DCanvas";
  mainContent.appendChild(renderer.domElement);

  var geometry = new THREE.IcosahedronGeometry(1, 0);
  var material = new THREE.MeshStandardMaterial({
    color: themeColor(),
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const pointLight = new THREE.PointLight(0x36d644, 1, 500);
  pointLight.position.set(0, 5, 4);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xa30016, 1, 25);
  pointLight2.position.set(0, -5, 5);
  scene.add(pointLight2);

  camera.position.z = 5;

  var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 1 / 360;
    cube.rotation.y += 1 / 360;

    renderer.render(scene, camera);
  };

  animate();
}

if (!our3D) {
  if (mainContent) {
    createOur3D();
  }
} else {
  our3D.innerHTML = "";
  createOur3D();
}

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
