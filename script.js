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
let colorOffset = 0; // Offset for the color cycle

// Function to create a color at a given index
function getColor(index) {
    const hue = (index + colorOffset) % 360; // Change hue based on index and offset
    return `hsl(${hue}, 100%, 50%)`; // HSL color for vibrant colors
}

// Function to draw the globe
function drawGlobe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the globe
    const radius = Math.min(canvas.width, canvas.height) / 3;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Create a gradient for the globe
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    for (let i = 0; i < 6; i++) {
        gradient.addColorStop(i / 5, getColor(i)); // Create a colorful gradient
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Update the rotation angle and color offset
    angle += 1; // Control the speed of rotation
    colorOffset += 1; // Change color offset for cycling colors
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


