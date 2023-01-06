
//Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
import './style.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// scene
const scene = new THREE.Scene;
/*
//thorusknotgeometry
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);*/

//load model
const loader = new GLTFLoader();
const material = new THREE.MeshBasicMaterial(0xffffff);
loader.load('./house/scene.gltf', function (gltf) {
  const house = gltf.scene.children[0];
  scene.add(gltf.scene);
});


//Sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-3, 10, -10);
scene.add(dirLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

//camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


//resize
window.addEventListener('resize', () => {

  //Update Sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update Camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const animation = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}

animation();

//timeline magicc
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(loader.scale, { z: 0, x: 0, y: 0 }, { z: .15, x: .15, y: .15 });

//Mouse Animation Colorrr
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / size.width) * 255),
      Math.round((e.pageY / size.height) * 255), 150,
    ];
    //Let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor });
  }
})