import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the GLTF model
const bakeryLoader = new GLTFLoader();
bakeryLoader.load(
    '/package/baker_and_the_bridge/scene.gltf',
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);

const fontLoader = new FontLoader();
fontLoader.load('/fonts/font.json', function (font){
    const textGeometry = new TextGeometry('Baker and The Bridge', {
        font: font,
        size: 0.5,
        height: 0.2,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-2, 2, 0);
    scene.add(textMesh);
});

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Add an ambient light to brighten the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);



let alienCharacter;
const alienLoader = new GLTFLoader();
alienLoader.load(
    '/package/cute_alien_character/scene.gltf',
    function (gltf) {
        alienCharacter = gltf.scene;
        // alienCharacter.rotation.x = 140; // Rotate the character 180 degrees
        // alienCharacter.position.set(10, 10, 10);
        scene.add(alienCharacter);
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);

// Movement variables
const moveSpeed = 0.1;
const rotationSpeed = 0.05;
const keys = {}; // Object to store key states

// Event listeners for key presses and releases
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Function to update the camera's position smoothly
function updateCamera() {
    // Calculate forward and sideways movement
    if (keys['w']) {
        camera.position.x -= Math.sin(camera.rotation.y) * moveSpeed;
        camera.position.z -= Math.cos(camera.rotation.y) * moveSpeed;
    }
    if (keys['s']) {
        camera.position.x += Math.sin(camera.rotation.y) * moveSpeed;
        camera.position.z += Math.cos(camera.rotation.y) * moveSpeed;
    }
    if (keys['a']) {
        camera.position.x -= Math.cos(camera.rotation.y) * moveSpeed;
        camera.position.z += Math.sin(camera.rotation.y) * moveSpeed;
    }
    if (keys['d']) {
        camera.position.x += Math.cos(camera.rotation.y) * moveSpeed;
        camera.position.z -= Math.sin(camera.rotation.y) * moveSpeed;
    }

    // Up and down movement
    if (keys['q']) {
        camera.position.y += moveSpeed; // Move up
    }
    if (keys['e']) {
        camera.position.y -= moveSpeed; // Move down
    }

    // Rotate the camera with the arrow keys
    if (keys['ArrowLeft']) {
        camera.rotation.y += rotationSpeed;
    }
    if (keys['ArrowRight']) {
        camera.rotation.y -= rotationSpeed;
    }
    if (keys['ArrowUp']) {
        camera.rotation.x -= rotationSpeed;
    }
    if (keys['ArrowDown']) {
        camera.rotation.x += rotationSpeed;
    }
    // if (keys['z']) {
    //     alienCharacter.rotation.x += rotationSpeed;
    // }
    // if (keys['c']) {
    //     alienCharacter.rotation.x -= rotationSpeed;
    // }
    // alienCharacter.position.set(camera.position.x, camera.position.y, camera.position.z);
}

// Animation loop to continuously update and render the scene
function animate() {
    requestAnimationFrame(animate);
    updateCamera();
    if (alienCharacter) {
        // Calculate the offset position in front of the camera
        const offset = new THREE.Vector3(0, 0, -3); // Adjust the offset as needed
        offset.applyQuaternion(camera.quaternion); // Rotate the offset to match the camera's rotation
        alienCharacter.position.copy(camera.position).add(offset); // Apply the offset to the character's position

        // Optionally, you can also match the alien character's rotation to the camera's rotation
        alienCharacter.rotation.copy(camera.rotation);
        alienCharacter.rotation.y = camera.rotation.y + Math.PI;


    }
    renderer.render(scene, camera);
}

animate();
