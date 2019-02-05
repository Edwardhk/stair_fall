var CANVAS_W = 600;
var CANVAS_H = 700;

var BALL_COLOR = [125, 253, 254];
var BALL_SIZE = 20;
var BALL_START_Y = 10;
var BALL_DROP_SPEED = 3;
var BALL_MOVE_SPEED = 5;
var BALL_MUL = (MUL)=>{
    return BALL_START_Y + BALL_SIZE / 2 + BALL_DROP_SPEED * MUL;
}

var STAIR_WEIGHT = 5;
var STAIR_COLOR = 255;
var STAIR_MAX_LEN = 100;
var STAIR_MIN_LEN = 10;
var STAIR_START_Y = BALL_MUL(50);
var STAIR_OFFSET = BALL_DROP_SPEED * 30;
var STAIR_NUM = 5;

var GAME_SPEED = 3;

var CHEATED = 0;

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = BALL_START_Y;
        this.size = BALL_SIZE;
        this.drop_speed = BALL_DROP_SPEED;
    }

    display() {
        noStroke();
        fill(BALL_COLOR);
        ellipse(this.x, this.y, this.size, this.size);
    }

    move() {
        if (keyIsDown(LEFT_ARROW))
            this.x -= BALL_MOVE_SPEED;
        else if (keyIsDown(RIGHT_ARROW))
            this.x += BALL_MOVE_SPEED;
    }

    will_drop(stair_coord) {
        if (this.y + BALL_SIZE / 2 == height)
            noLoop();
        else {
            this.drop_speed = BALL_DROP_SPEED;
            for (var i = 0; i < stair_coord.length; i++) {
                if (this.y + BALL_SIZE / 2 == stair_coord[i][0]) {
                    if (this.x > stair_coord[i][1] && this.x < stair_coord[i][2])
                        this.drop_speed = 0;
                }
            }
            this.y += this.drop_speed;
        }
    }
}

class Stair {
    constructor() {
        this.x_arr = [];
        this.y = STAIR_START_Y;
        this.stair_coord = [];
        for (var i = 0; i < STAIR_NUM; i++)
            this.x_arr.push(random(0, width - STAIR_MAX_LEN));
    }

    display() {
        var stair_coord = [];
        strokeWeight(STAIR_WEIGHT);
        stroke(STAIR_COLOR);

        for (var i = 0; i < STAIR_NUM; i++) {
            var stair_len = STAIR_MAX_LEN;
            var stair_y = this.y + STAIR_OFFSET * i;
            line(this.x_arr[i], stair_y, this.x_arr[i] + stair_len, stair_y);
            this.stair_coord.push([stair_y, this.x_arr[i], this.x_arr[i] + stair_len]);
        }

        return stair_coord;
    }
}

function setup() {
    createCanvas(CANVAS_W, CANVAS_H);
    ball = new Ball();
    stair = new Stair();
    stair.display();
    for (var i = 0; i < stair.stair_coord.length; i++)
        console.log(stair.stair_coord[i][0]);
}


function draw() {
    background(0);
    noFill();
    strokeWeight(5);
    stair.display();
    console.log(ball.y + BALL_SIZE / 2);
    ball.will_drop(stair.stair_coord);
    if (keyIsPressed)
        ball.move();
    ball.display();
}
