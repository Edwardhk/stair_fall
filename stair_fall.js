var CANVAS_W = 800;
var CANVAS_H = 700;

var BALL_COLOR = [125, 253, 254];
var BALL_SIZE = 20;
var BALL_START_Y = 50;
var BALL_DROP_SPEED = 5;

var CHEATED = 0;

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = BALL_START_Y;
        this.size = BALL_SIZE;
        this.speed = 5;
    }

    display() {
        fill(BALL_COLOR);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
        this.drop();
    }

    move() {
    }

    drop() {
        this.y += BALL_DROP_SPEED;
    }
}

function setup() {
    createCanvas(CANVAS_W, CANVAS_H);
    ball = new Ball();
}

function draw() {
    background(0);
    noFill();
    strokeWeight(5);
    ball.display();
}
