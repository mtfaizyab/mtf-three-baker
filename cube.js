import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

/**
 * Represents the main scene of the application.
 * @type {THREE.Scene}
 */
const scene = new THREE.Scene();

/**
 * Represents the camera used to view the scene.
 * @type {THREE.PerspectiveCamera}
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/**
 * Represents the renderer used to render the scene.
 * @type {THREE.WebGLRenderer}
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * Represents the geometry of the cube.
 * @type {THREE.BoxGeometry}
 */
const geometry = new THREE.BoxGeometry();

/**
 * Represents the material of the cube.
 * @type {THREE.MeshBasicMaterial}
 */
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

/**
 * Represents the cube object.
 * @type {THREE.Mesh}
 */
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

/**
 * Animates the cube by rotating it and rendering the scene.
 */
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
// if (WebGL.isSupported()) {
//     renderer.setAnimationLoop(animate);
// } else {
//     console.error('WebGL is not supported.');
// }