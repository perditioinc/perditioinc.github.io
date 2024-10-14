// Import the necessary modules from Three.js
import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial, Mesh, TextureLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

// Create the scene
const scene = new Scene();

// Set up the camera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10; // Move the camera back to view the globe

// Set up the renderer
const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Attach the renderer to the DOM
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create the globe with sphere geometry
const geometry = new SphereGeometry(5, 64, 64);
const texture = new TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/earth.jpg');
const material = new MeshBasicMaterial({ map: texture });
const globe = new Mesh(geometry, material);

// Add the globe to the scene
scene.add(globe);

// Animation loop to rotate the globe
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.005; // Rotate the globe continuously
  renderer.render(scene, camera);
}
animate();

// Make the globe responsive to window size changes
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
