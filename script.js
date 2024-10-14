// script.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create a globe
const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x0077be, wireframe: false });
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Create bouncing stars
const stars = [];
const starCount = 50;

for (let i = 0; i < starCount; i++) {
    const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);

    // Random positions
    star.position.x = Math.random() * 10 - 5;
    star.position.y = Math.random() * 10 - 5;
    star.position.z = Math.random() * 10 - 5;

    stars.push(star);
    scene.add(star);
}

// Camera position
camera.position.z = 3;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the globe
    globe.rotation.y += 0.01;

    // Bounce stars
    stars.forEach(star => {
        star.position.x += (Math.random() - 0.5) * 0.01;
        star.position.y += (Math.random() - 0.5) * 0.01;
        star.position.z += (Math.random() - 0.5) * 0.01;

        // Bounce stars back into view
        if (Math.abs(star.position.x) > 5) star.position.x = -star.position.x;
        if (Math.abs(star.position.y) > 5) star.position.y = -star.position.y;
        if (Math.abs(star.position.z) > 5) star.position.z = -star.position.z;
    });

    renderer.render(scene, camera);
}

animate();

// Responsive design for window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
