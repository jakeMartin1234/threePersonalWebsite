import './style.css'

import * as THREE from 'three';
import {MathUtils} from "three";

// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight , 0.1, 1000);

const loader = new THREE.ObjectLoader();

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector( '#bg'),
});

const cameraOriginZ = 15;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(cameraOriginZ);
camera.position.setY(5);


// torus object
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
geometry.scale(2, 2, 2);
const material = new THREE.MeshStandardMaterial( { color: 0x06F60} );
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Star Objects

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    const star = new THREE.Mesh( geometry, material );

    star.position.set(THREE.MathUtils.randFloatSpread( 300 ), THREE.MathUtils.randFloatSpread( 300 ),
        THREE.MathUtils.randFloatSpread( 300 ));
    scene.add(star);
}

for (let i = 0; i < 400; i += 1) {
    addStar();
}

// Cornell Box Model

loader.load(
    // resource URL
    "computerGraphicsBox.json",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
        // Add the loaded object to the scene
        obj.rotation.y += 270 * 3.14/180;
        obj.position.z += 35
        scene.add( obj );
    },

);

// Front Page

loader.load(
    // resource URL
    "welcomePage.json",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
        // Add the loaded object to the scene
        obj.scale.x = 2.0;
        obj.scale.y = 2.0;
        obj.scale.z = 2.0;
        scene.add( obj );
    },

);

// cs184 Photo Gallery

loader.load(
    // resource URL
    "cs184PhotoBox.json",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
        // Add the loaded object to the scene
        obj.position.z += 70
        scene.add( obj );
    },

);


// cs184 Ray Dispersion

loader.load(
    // resource URL
    "dispersionBox.json",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
        // Add the loaded object to the scene
        obj.position.z += 105
        scene.add( obj );
    },

);

// Lighting

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 20, 20);
// pointLight.intensity = 0.0;

// const ambientLight = new THREE.AmbientLight(0xffffff);

// scene.add(pointLight);

// Helpers

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(pointLightHelper, gridHelper);

// Controls

// const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = -0.01 * t + cameraOriginZ;
    camera.position.x = 20 * Math.sin(-0.0008 * t);
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;

    // controls.update();

    renderer.render(scene, camera);

}
animate();

