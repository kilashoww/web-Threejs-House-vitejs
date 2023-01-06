import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
import './style.css';

function init() {


    //create scene
    const scene = new THREE.Scene;

    //camera
    const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    //lights

    // const ambiant = new THREE.AmbientLight(0x404040, 3);
    //scene.add(ambiant);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-3, 10, -10);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    //create renderer
    const canvas = document.querySelector('.webgl');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);

    //load model
    let loader = new THREE.GLTFLoader();
    loader.load('./house/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        renderer.render(scene, camera);
        animate();
    });

    //animate
    function animate() {
        requestAnimationFrame(animate);
        house.rotation.z += 0.005;
        renderer.render(scene, camera);
    };



};

init();
