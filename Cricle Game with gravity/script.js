var canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;
var c = canvas.getContext('2d');
var maxMovementX = 15;

// Score Board
var score = 0;
var board = document.getElementById("scoreBoard");
board.textContent = score;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.fillStyle = color;
        c.fill();
        c.stroke();
    }
}

var dx = 0;
var dy = 0; // Vertical speed
var gravity = 0.09; // Gravity to simulate bouncing
var isJumping = false;

var circle = new Circle(250, canvas.height - 30, 30, 'red');
var coin = new Circle(400, canvas.height - 10, 10, 'gold');

function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity when jumping
    if (isJumping) {
        dy += gravity;
        circle.y += dy;

        // Check if the ball hits the bottom of the canvas and bounce
        if (circle.y + circle.radius >= canvas.height) {
            isJumping = false;
            dy = -dy * 0.02;
            circle.y = canvas.height - circle.radius;
        }
    }

    // Update horizontal position based on dx
    circle.x += dx;

    // Ensure the ball does not go out of the canvas bounds
    if (circle.x - circle.radius < 0) {
        circle.x = circle.radius;
    } else if (circle.x + circle.radius > canvas.width) {
        circle.x = canvas.width - circle.radius;
    }

    if (circle.x + circle.radius >= coin.x - coin.radius && circle.x - circle.radius <= coin.x + coin.radius &&
        circle.y + circle.radius >= coin.y - coin.radius && circle.y - circle.radius <= coin.y + coin.radius) {
        score++;
        board.textContent = score;
        coin.x = getRandomNumber(0, canvas.width - coin.radius);
        coin.y = getRandomNumber(200, canvas.height - coin.radius / 2);
    }

    circle.draw();
    coin.draw();
    requestAnimationFrame(update);
}

window.addEventListener('keydown', function (event) {
    if (event.key == 'ArrowRight') {
        dx = 5;
    } else if (event.key == 'ArrowLeft') {
        dx = -5;
    } else if (event.key == 'ArrowUp' && !isJumping) {
        // Jump by setting a negative vertical speed
        dy = -5.5; // Adjust this value for jump strength
        isJumping = true;
    }
});

window.addEventListener('keyup', function (event) {
    if ((event.key == 'ArrowRight' && dx > 0) || (event.key == 'ArrowLeft' && dx < 0)) {
        dx = 0;
    }
});

update();