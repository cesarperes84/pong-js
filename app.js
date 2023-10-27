let ctx, p1Y = 30, p2Y = 410, p1Points, p2Points, p1X = 10, p2X = 220;
let ballY_orientation, ballX_orientation, ballX, ballY;
let p1Key, p2Key;
const h=480, w=320, pWidth=100, pHeight=20;

let speedBallX = 10;
let speedBallY = 10;

let clickStartGame = false;

const increaseSpeedBall = () => { speedBallY *= 1.05 };

const setup = () => {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    p1Points = 0;
    p2Points = 0;
};

const movmentBars = () => {

    if(p1Key == 37 && p1X > 0){
        p1X -= 20;
    }
     
    if (p1Key == 39 && p1X + pWidth <= w) {
        p1X += 20;
    }

    if(p2Key == 37 && p2X > 0){ // LEFT
        p2X -= 5;
    } 
    
    if (p2Key == 39 && p2X <= w + pWidth) { // RIGHT
        p2X += 5;
    }

};

const startGame = () => {
    if (!clickStartGame) {
        setInterval(loop, 2500/60);
        setInterval(followBall, 2500/60);
        initBall();
    }
    clickStartGame = true;
};

const hitCheck = () => {
    if (
        ballX >= p1X && ballX <= p1X 
        && ballY >= p1Y && ballY <= p1Y + 20
    ) {
        ballY_orientation = 1;
        ballX_orientation *= -1;
    }
    // p2X = 220
    // p2Y = 410

    
    if( ballX >= p2X && ballX <= p2X + pWidth &&  // ERRO 
        ballY >= p2Y && ballY <= p2Y + 20) {

        console.log('bateu', ballY, ballX) // 418 e 222
        ballY_orientation = -1;
        ballX_orientation *= -1;
        //increaseSpeedBall();
    }

    // verifica se a bola passou bateu no chão ou no teto
    if(ballX + 10 >= w || ballX <= 0) { 
        ballX_orientation *= -1;  
    }

    // PONTUAÇÃO
    if (ballY + 20 > h) {
        p1Points++;
        initBall();
    }  
    
    if (ballY < -20) {
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
};

const initBall = () => {
    ballY_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3;
    ballX_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3; 
    ballX = w / speedBallX + 80;
    ballY = h / speedBallY + 80;
};

const draw = () => {
    // fundo
    drawRect(0,0,w,h, "#57B92A");
    
    // player 1
    drawRect(p1X, p1Y, pWidth, pHeight);

    // player 2
    //drawRect(p2X, p2Y, pWidth, pHeight);
    drawRect(p2X/2, p2Y, pWidth, pHeight);

    // barra lateral
    // drawRect(w/2 -5,0,5,h);
    drawRect(0, h/2, w, 10);

    // bola
    drawBall(ballX, ballY, 20, 20);
    writeScore();
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
    ctx.font = "22px monospace";
    ctx.fillStyle = "#fff";
    // w/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(p1Points, 20, 220);
    // 3*(w/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(p2Points, 20, 280);
};

const followBall = () => {
    if( ballX > 0 && ballX <= 40 ) p1Key = 37;
    if( ballX > 40 && ballX <= 80 ) p1Key = 37;
    if( ballX > 80 && ballX <= 120 ) p1Key = 37;
    if( ballX > 120 && ballX <= 160 ) p1Key = 37;

    if( ballX > 160 && ballX <= 200) p1Key = 39;
    if( ballX > 200 && ballX <= 240) p1Key = 39;
    if( ballX > 240 && ballX <= 280) p1Key = 39;
    if( ballX > 280) p1Key = 39;

};

/* document.addEventListener("mousemove", (ev) => {
    if (p2X > 0 && p2X < w && clickStartGame) {
        p2X = ev.clientX;
       //  p2X += Math.ceil(ev.clientX * 0.1);
        console.log('x', p2X);
    }
}); */

document.addEventListener("keydown", (ev) => {
    if(ev.keyCode == 37 || ev.keyCode ==39)
        p2Key = ev.keyCode
});

document.addEventListener("click", (ev) => {
    startGame();
});

setup();