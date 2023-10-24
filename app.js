let ctx, p1Y = 30, p2Y = 410, p1Points, p2Points, p1X = 10, p2X = 220;
let ballY_orientation, ballX_orientation, ballX, ballY;
let p1Key, p2Key;
// const h=480, w=320, pWidth=20, p_h=100, p1X = 10, p2X = w - pWidth - 10;
const h=480, w=320, pWidth=100, p_h=20;

let speedBallX = 4;
let speedBallY = 4;

let clickStartGame = false;

const increaseSpeedBall = () => { speedBall *= 1.05 };

const setup = () => {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    p1Points = 0;
    p2Points = 0;
};

const movmentBars = () => {

    if(p1Key == 37 && p1X > 0){
        p1X -= 10;
    } else if (p1Key == 39 && p1X + pWidth < w) {
        p1X += 10;
    }

    if(p2Key == 37 && p2X > 0){ // LEFT
        p2X -= 10;
    } else if (p2Key == 39 && p2X <= w + pWidth) { // RIGHT
        p2X += 10;
    }
};

const startGame = () => {
    if (!clickStartGame) {
        setInterval(loop, 1000/60);
        setInterval(followBall, 1000/60);
        initBall();
    }
    clickStartGame = true;
};

const hitCheck = () => {

    //Verifica se a bola está colidindo com o barra do player 1
    /* if(ballX >= p1X && ballX <= p1X + 10 
        && ballY >= p1Y && ballY <= p1Y + p_h) {
        ballX_orientation = 1;
    } else if(ballX >= p2X && ballX <= p2X + 10
         && ballY >= p2Y && ballY <= p2Y + p_h) {
        ballX_orientation = -1;
        // increaseSpeedBall();
    }*/
    // p2X = 220
    // p2Y = 410
    if(ballX >= p1X && ballX <= p1X + pWidth 
        && ballY >= p1Y && ballY <= p1Y + 10) {
        ballY_orientation = 1;
        ballX_orientation = 1;

    } else if(ballX >= p2X && ballX <= p2X + pWidth
         && ballY === p2Y) {
        ballY_orientation = -1;
        ballX_orientation = -1;
        // increaseSpeedBall();
    }

    // verifica se a bola passou bateu no chão ou no teto
    if(ballX + 10 >= w || ballX <= 0) { 
        ballX_orientation *= -1;  
    }

    // PONTUAÇÃO
    if (ballY + 10 > h) {
        p1Points++;
        initBall();
    } else if (ballY < 0) {
        p2Points++;
        initBall();
    }
};

const movmentBall = () => {
    //move a bola no eixo X e Y
    ballX += speedBallX * ballX_orientation;
    ballY += speedBallY * ballY_orientation;
};

const loop = () => {
    hitCheck();
    movmentBall();
    movmentBars();
    draw();
    // console.log('ballY', ballY);
};

const initBall = () => {
    // console.log(`${p1Points} VS ${p2Points}`)
    ballY_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3;
    ballX_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3; 
    ballX = w / speedBallX - 10;
    ballY = h / speedBallY - 10;
};

const draw = () => {
    // fundo
    drawRect(0,0,w,h, "#57B92A");
    
    // player 1
    drawRect(p1X, p1Y, pWidth, p_h);

    // player 2
    //drawRect(p2X, p2Y, pWidth, p_h);
    drawRect(p2X/2, p2Y, pWidth, p_h);

    // barra lateral
    // drawRect(w/2 -5,0,5,h);
    drawRect(0, h/2, w, 10);

    // bola
    drawBall(ballX, ballY, 20, 20);
    // writeScore();
};

const drawBall = (x,y,w,h,color="yellow") => {
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
    ctx.fillStyle = "#000"
};

const drawRect = (x,y,w,h,color="#fff") => {
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
    ctx.fillStyle = "#000"
};

const writeScore = () => {
    ctx.font = "42px monospace";
    ctx.fillStyle = "#fff";
    // w/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(p1Points, w/4, 50);
    // 3*(w/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(p2Points, 3*(w/4), 50);
};

const followBall = () => {
    if( ballX <= 160 ) p1Key = 37;
    if( ballX > 160 ) p1Key = 39;
};

document.addEventListener("keydown",(ev) => {
    if(ev.keyCode == 37 || ev.keyCode ==39)
        p2Key = ev.keyCode
});

document.addEventListener("click",(ev) => {
    startGame();
});

setup();