// Import necessary parts from Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a globe using SphereGeometry and an Earth texture
const geometry = new THREE.SphereGeometry(5, 64, 64);
const texture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/earth.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Position the camera
camera.position.z = 10;

// Animation loop to rotate the globe
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.005; // Adjust rotation speed
  renderer.render(scene, camera);
}
animate();

// Make the globe responsive to window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle form submission
document.getElementById('notification-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('You will be notified soon!');
});
