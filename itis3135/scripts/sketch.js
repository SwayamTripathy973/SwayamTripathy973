// Initialize variables for trail effect
let particles = [];
const maxParticles = 50;

function setup() {
    // Create canvas and place it in the container
    const container = document.getElementById('canvas-container');
    const canvas = createCanvas(600, 400);
    canvas.parent(container);
    
    // Set background color
    background(40);
}

function draw() {
    // Add slight fade effect
    background(40, 10);
    
    // Add new particle at mouse position
    if (mouseIsPressed) {
        particles.push({
            x: mouseX,
            y: mouseY,
            size: random(5, 20),
            color: color(random(255), random(255), random(255)),
            speedX: random(-2, 2),
            speedY: random(-2, 2)
        });
    }
    
    // Remove excess particles
    while (particles.length > maxParticles) {
        particles.shift();
    }
    
    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Draw particle
        noStroke();
        fill(p.color);
        circle(p.x, p.y, p.size);
        
        // Fade out
        p.size *= 0.95;
        
        // Remove tiny particles
        if (p.size < 0.5) {
            particles.splice(i, 1);
        }
    }
}

function windowResized() {
    // Make canvas responsive
    const container = document.getElementById('canvas-container');
    const width = min(container.offsetWidth, 600);
    resizeCanvas(width, 400);
    background(40);
}
