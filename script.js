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

// Function to draw the globe
function drawGlobe() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the globe
  const radius = Math.min(canvas.width, canvas.height) / 3;
  const x = canvas.width / 2;
  const y = canvas.height / 2;

  // Create a gradient for the globe
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 255, 0.7)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawGlobe();
});

// Initial draw
drawGlobe();
