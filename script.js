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

// Function to create a small sphere (star)
function createStar() {
    const geometry = new THREE.SphereGeometry(0.1, 32, 32); // Smaller sphere
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    // Set random position
    star.position.x = (Math.random() - 0.5) * 10;
    star.position.y = (Math.random() - 0.5) * 10;
    star.position.z = (Math.random() - 0.5) * 10;

    // Set random velocity
    star.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
    };

    return star;
}

// Create multiple stars
const stars = [];
for (let i = 0; i < 100; i++) { // Number of stars
    const star = createStar();
    stars.push(star);
    scene.add(star);
}

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    // Rotate the globe
    globe.rotation.y += 0.01; // Rotate the globe

    // Update stars' positions
    stars.forEach(star => {
        // Update position
        star.position.x += star.velocity.x;
        star.position.y += star.velocity.y;
        star.position.z += star.velocity.z;

        // Bounce off the edges
        if (star.position.x <= -5 || star.position.x >= 5) {
            star.velocity.x *= -1; // Reverse x velocity
        }
        if (star.position.y <= -5 || star.position.y >= 5) {
            star.velocity.y *= -1; // Reverse y velocity
        }
        if (star.position.z <= -5 || star.position.z >= 5) {
            star.velocity.z *= -1; // Reverse z velocity
        }
    });

    // Render the scene
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
