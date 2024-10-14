// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create the globe geometry and material
const geometry = new THREE.SphereGeometry(2, 64, 64);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('https://raw.githubusercontent.com/Zeptir/Textures/main/earth.jpg'), // Earth texture
    transparent: true,
});

// Create the globe mesh
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Set up the light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    globe.rotation.y += 0.01; // Rotate the globe
    renderer.render(scene, camera);
    requestAnimationFrame(animate); // Call animate for the next frame
}

// Resize the canvas on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start the animation
animate();
