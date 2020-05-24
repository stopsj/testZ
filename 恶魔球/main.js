//生成画布
const ctn = document.querySelector('canvas');
const ctx = ctn.getContext('2d');
var p1 = document.querySelector('p');
var titleH1 = document.querySelector('h1');
//设置画布大小
const width = ctn.width = window.innerWidth;
const height = ctn.height = window.innerHeight;
//随机数生成器
function randNub(min, max) {
    var nub = Math.floor(Math.random() * (max - min) + min);
    return nub;
}
//随机颜色生成
function randColor() {
    var color = 'rgb(' + randNub(0, 255) + ',' + randNub(0, 255) + ',' + randNub(0, 255) + ')';
    return color;
}

//形状构造器，只有坐标,vel代表速度
function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
    if (this.exists === true) {
        ctx.beginPath(); //声明开始画球
        ctx.fillStyle = this.color; //填充样式
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //画一段弧线
        ctx.fill(); //填充
    }
}

//移动，更新位置坐标
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
        this.velX = -this.velX;
    } else if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
        this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
    // console.log(132);

    for (var i = 0; i < balls.length; i++) {
        if (this.exists === false || balls[i].exists === false)
            break;
        if (this !== balls[i]) {
            var xDis = this.x - balls[i].x;
            var yDis = this.y - balls[i].y;
        }
        var disdence = Math.sqrt(xDis * xDis + yDis * yDis);
        //console.log(123);
        if (disdence < this.size + balls[i].size) {
            this.color = randColor();
        }
    }
}

//小球生成
var balls = [];

while (balls.length < 25) {
    var size = randNub(10, 20);
    var ball = new Ball(
        randNub(0 + size, width - size),
        randNub(0 + size, height - size),
        randNub(-7, 7),
        randNub(-7, 7),
        true,
        randColor(),
        size
    )

    balls.push(ball);
}
var ballCunt = 25;

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //矩形填充颜色
    ctx.fillRect(0, 0, width, height); //创建一个矩形

    // e1.update();
    e1.draw();
    e1.setControls();
    e1.checkBounds();
    e1.collisionDetect();
    var cunt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].exists === false) {
            cunt++;
        }
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    ballCunt = 25 - cunt;
    p1.textContent = '还剩下' + ballCunt + '个球';
    console.log(cunt + ' ' + ballCunt);
    requestAnimationFrame(loop);
}

function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'blue';
    this.size = 10;

}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
    ctx.beginPath(); //声明开始画球
    ctx.strokeStyle = this.color; //填充样式
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //画一段弧线
    console.log(this.x);
    ctx.lineWidth = 3;
    ctx.stroke(); //填充
}
EvilCircle.prototype.checkBounds = function() {
    if ((this.x - this.size) <= 0) {
        this.x = 0 + this.size;
    } else if ((this.x + this.size) >= width) {
        this.x = width - this.size;
    }
    if ((this.y - this.size) <= 0) {
        this.y = 0 + this.size;
    } else if ((this.y + this.size) >= height) {
        this.y = height - this.size;
    }
}
EvilCircle.prototype.collisionDetect = function() { //小球被恶魔球碰撞消失
    for (var i = 0; i < balls.length; i++) {
        var xDis = this.x - balls[i].x;
        var yDis = this.y - balls[i].y;
        var disdence = Math.sqrt(xDis * xDis + yDis * yDis);
        //console.log(123);
        if (disdence < this.size + balls[i].size) {
            balls[i].exists = false;
        }
    }
}
EvilCircle.prototype.setControls = function() {
    window.onkeydown = e => {
        switch (e.key) {
            case 'a':
                this.x -= this.velX;
                break;
            case 'd':
                this.x += this.velX;
                break;
            case 'w':
                this.y -= this.velY;
                break;
            case 's':
                this.y += this.velY;
                break;
        }
    }
}
var e1 = new EvilCircle(width / 2, height / 2, true);
e1.draw();
loop();