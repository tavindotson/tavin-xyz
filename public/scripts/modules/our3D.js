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

    cube.rotation.x += 1/750;
    cube.rotation.y += 1/1350;

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
