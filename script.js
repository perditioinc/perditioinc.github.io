// Create the globe container
const globeContainer = document.getElementById('globe-container');

// Create a canvas element
const canvas = document.createElement('canvas');
globeContainer.appendChild(canvas);

// Get the canvas context
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0; // For rotating the globe

// Colors for the glow effect
const colors = [
    'rgba(255, 0, 0, 0.5)',
    'rgba(0, 255, 0, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(255, 0, 255, 0.5)',
    'rgba(0, 255, 255, 0.5)'
];

// Function to draw the globe
function drawGlobe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the globe
    const radius = Math.min(canvas.width, canvas.height) / 3;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Create a gradient for the globe
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
    });

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Update the rotation angle
    angle += 1; // Control the speed of rotation
    ctx.save(); // Save the current context
    ctx.translate(x, y); // Move to center
    ctx.rotate(angle * Math.PI / 180); // Rotate
    ctx.translate(-x, -y); // Move back
    ctx.restore(); // Restore context
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGlobe();
});

// Animation loop
function animate() {
    drawGlobe();
    requestAnimationFrame(animate); // Call animate for the next frame
}

// Initial draw
animate();
