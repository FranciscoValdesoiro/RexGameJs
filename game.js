console.log("cargado")

document.addEventListener('keydown', function(event){
    if(event.keyCode == 32){
        jump();
    }
});

var width = 700;
var height = 300;

var canvas,ctx;
var imgRex, imgCloud, imgCaptus, imgFloor
var floor = 200;

var trex = {
    y: floor,
    verticalSpeed: 0,
    gravity: 2,
    jump: 28,
    verticalSpeedMax: 9,
    jumping: false
};

var level = {
    speed: 9,
    score: 0
};

var captus = {
    x: width + 100,
    y: floor - 20,
}

function paintRex(){
    ctx.drawImage(imgRex,0,0,357,383,100,trex.y,50,50);
}

function paintCaptus(){
    ctx.drawImage(imgCaptus,0,0,50,100,captus.x,captus.y,38,75);
}

function jump(){
    trex.jumping = true;
    trex.verticalSpeed = trex.jump;
}

function captusLogic(){
    if(captus.x < -100){
        captus.x = width + 100;
    }else{
        captus.x -= level.speed;
    }
}

function gravity(){
    if(trex.jumping){
        if(trex.y - trex.verticalSpeed - trex.gravity > floor){
            trex.jumping = false;
            trex.verticalSpeed = 0;
            trex.y = floor;    
        }else{
            trex.verticalSpeed -= trex.gravity;
            trex.y -= trex.verticalSpeed;
        }

    }
}

function loadSprite(){
    imgRex = new Image();
    imgCaptus = new Image();
    imgRex.src = 'sprites/rex.png'
    imgCaptus.src = 'sprites/captus.png'
}

function inicialize(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); 
    loadSprite();
}

function cleanCanvas(){
    canvas.width = width;
    canvas.height = height;
}

// Main Loop

var FPS = 50;

setInterval(function(){
    main();
}, 1000/FPS);

function main(){
    cleanCanvas();
    gravity();
    captusLogic();
    paintCaptus();
    paintRex();
}