

let container;
let camera;
let renderer;
let scene;


function init() {
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();

    //create camera
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 0, 50);

    //lights
    /*
    const ambiant = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambiant);*/

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(-3, 10, -10);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    //create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    //load model
    let loader = new THREE.GLTFLoader();
    loader.load('./house/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        renderer.render(scene, camera);
        //animate();
    });

    //animate
    /*function animate() {
        requestAnimationFrame(animate);
        house.rotation.z += 0.005;
        renderer.render(scene, camera);
    };*/



};

init();
