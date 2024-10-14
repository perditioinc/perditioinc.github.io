// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a sphere to represent the globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/earth.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Position the camera slightly back
camera.position.z = 10;

// Animate the globe to rotate continuously
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.01; // Adjust rotation speed if needed
  renderer.render(scene, camera);
}
animate();

// Handle window resizing to keep the globe responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Form submission handler to show an alert
document.getElementById('notification-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('You will be notified soon!');
});
