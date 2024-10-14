document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('globe');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Variables for globe
    const globeRadius = 100;
    let globeAngle = 0;

    // Create an array for bouncing spheres
    const spheres = [];
    const sphereCount = 30;

    for (let i = 0; i < sphereCount; i++) {
        spheres.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 5 + Math.random() * 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
        });
    }

    // Draw the globe and bouncing spheres
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the globe
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(globeAngle);
        ctx.fillStyle = 'rgba(0, 119, 190, 0.8)'; // Globe color
        ctx.beginPath();
        ctx.arc(0, 0, globeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw the bouncing spheres
        spheres.forEach(sphere => {
            ctx.fillStyle = sphere.color;
            ctx.beginPath();
            ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
            ctx.fill();

            // Move the sphere
            sphere.x += sphere.speedX;
            sphere.y += sphere.speedY;

            // Bounce off edges
            if (sphere.x + sphere.radius > canvas.width || sphere.x - sphere.radius < 0) {
                sphere.speedX *= -1;
            }
            if (sphere.y + sphere.radius > canvas.height || sphere.y - sphere.radius < 0) {
                sphere.speedY *= -1;
            }
        });

        globeAngle += 0.01; // Increase angle for spinning effect
        requestAnimationFrame(draw);
    }

    // Responsive design for window resizing
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start the drawing loop
    draw();
});
