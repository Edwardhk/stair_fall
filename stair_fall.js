var GAME_SPEED = 2;

var BALL_COLOR = [125, 253, 254];
var BALL_SIZE = 20;
var BALL_START_Y = 10;
var BALL_DROP_SPEED = 3;
var BALL_MOVE_SPEED = 3;
var BALL_MUL = (MUL) => {
    return BALL_START_Y + BALL_SIZE / 2 + BALL_DROP_SPEED * MUL;
}

var STAIR_THICK = 5;
var STAIR_COLOR = 255;
var STAIR_MAX_LEN = 200;
var STAIR_MIN_LEN = 70;
var STAIR_START_Y = BALL_MUL(50);
var STAIR_OFFSET = BALL_DROP_SPEED * 30;
var STAIR_NUM = 10;

var CANVAS_W = 600;
var CANVAS_H = BALL_MUL(200);

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

    will_drop(stair_rect) {
        // DROPPED TO BOTTOM
        if (this.y + BALL_SIZE / 2 == height)
            noLoop();

        // CHECK COLLISION
        else {
            var ball_bot = this.y + BALL_SIZE / 2;
            for (var i = 0; i < stair_rect.length; i++) {
                var stair_y = stair_rect[i][0];
                var start_x = stair_rect[i][1];
                var end_x = stair_rect[i][1] + stair_rect[i][2];

                if (ball_bot > stair_y && ball_bot < stair_y + STAIR_THICK) {
                    if (this.x >= start_x && this.x <= end_x)
                        this.drop_speed = -GAME_SPEED;

                    else
                        this.drop_speed = BALL_DROP_SPEED;
                }
            }
            this.y += this.drop_speed;
        }
    }
}

class Stair {
    constructor() {
        this.start_x = [];
        this.stair_len_arr = [];
        this.y = STAIR_START_Y;
        this.stair_rect = [];
        for (var i = 0; i < STAIR_NUM; i++) {
            this.start_x.push(random(0, width - STAIR_MAX_LEN));
            this.stair_len_arr.push(random(STAIR_MIN_LEN, STAIR_MAX_LEN));
        }
    }

    display() {
        var stair_rect = [];
        stroke(STAIR_COLOR);

        for (var i = 0; i < STAIR_NUM; i++) {
            var stair_y = this.y + STAIR_OFFSET * i;
            var stair_len = this.stair_len_arr[i];
            rect(this.start_x[i], stair_y, stair_len, STAIR_THICK);
            if (stair_y > 0) {
                this.stair_rect.push([stair_y, this.start_x[i], stair_len]);
            }
        }
        this.y -= GAME_SPEED;

        return stair_rect;
    }
}

function setup() {
    createCanvas(CANVAS_W, CANVAS_H);
    ball = new Ball();
    stair = new Stair();
    stair.display();
}


function draw() {
    background(0);
    noFill();
    strokeWeight(5);
    stair.display();

    ball.will_drop(stair.stair_rect);
    if (keyIsPressed)
        ball.move();
    ball.display();
}
