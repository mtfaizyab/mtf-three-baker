/**
 * Initializes the scene, camera, and renderer.
 */
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// 3 things important scene, camera, renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0,  20);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({ color: 0xffffff });

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);


renderer.render(scene, camera);
// function animate() {
//     renderer.render(scene, camera);

// }

// renderer.setAnimationLoop(animate);