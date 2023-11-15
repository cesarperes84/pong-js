let ctx, p1Y = 30, p2Y = 410, p1Points, p2Points, p1X = 10, p2X = 120;
let ballY_orientation, ballX_orientation, ballX, ballY;
let p1Key, p2Key;
const h=480, w=320, pWidth=100, pHeight=20;

let speedBallX = 10;
let speedBallY = 10;

let clickStartGame = false;


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
        p2X -= 10;
    } 
    
    if (p2Key == 39 && p2X <= w - pWidth) { // RIGHT
        p2X += 10;
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

    const extLeftP1 = ballX <= p1X + pWidth;
    const extRightP1 = ballX >= p1X;
    if (extLeftP1 && extRightP1 && ballY >= p1Y && ballY <= p1Y + 20
    ) {
        ballY_orientation = 1;
        ballX_orientation = Math.random() < .5 ? -1 : 1;
    }


    const extLeftP2 = ballX <= p2X + pWidth;
    const extRightP2 = ballX >= p2X;
    if( extLeftP2 && extRightP2 && 
        ballY >= p2Y && ballY <= p2Y) {
        ballY_orientation = -1;
        ballX_orientation = Math.random() < .5 ? -1 : 1;
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
        console.log('ponto');
        initBall();
    }
};

const movmentBall = () => {
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
    ballX = 160;
    ballY = 240;
};

const draw = () => {
    // fundo
    drawRect(0,0,w,h, "#57B92A");
    
    // player 1
    drawRect(p1X, p1Y, pWidth, pHeight);

    // player 2
    //drawRect(p2X, p2Y, pWidth, pHeight);
    drawRect(p2X, p2Y, pWidth, pHeight);

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

const checkWhereTouch = (ev) => {
    if (clickStartGame) {
        const clickP2X = ev.clientX;
        const widthWindow = window.innerWidth;
         if (clickP2X <= widthWindow/2 && clickP2X) {
             p2Key = 37;
         } else {
             p2Key = 39;
         }
     }
}

document.body.addEventListener('click', (ev) => checkWhereTouch(ev), false);

document.addEventListener("keydown", (ev) => {
    if(ev.keyCode == 37 || ev.keyCode ==39)
        p2Key = ev.keyCode
});

document.addEventListener("click", (ev) => {
    startGame();
});

setup();