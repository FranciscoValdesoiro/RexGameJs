console.log("cargado")

document.addEventListener('keydown', function(event){
    if(event.keyCode == 32){
        if(!level.dead){
            jump();
        }else{
            level.speed = 9;
            level.dead = false;
            cloud.speed = 2 ;
            farCloud.speed = 1;
            captus.x = width + 100;
            cloud.x = width + 100;
            farCloud.x = width + 100;  
            level.score = 0;
        }
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
    score: 0,
    dead: false
};

var captus = {
    x: width + 100,
    y: floor - 20,
}

var cloud = {
    x: width + 100,
    y: 100,
    speed: 1
}

var farCloud = {
    x: width + 200,
    y: 50,
    speed: 1
}

var floorObj = {
    x: 0,
    y: floor + 30,
    speed: 1
}

function jump(){
    trex.jumping = true;
    trex.verticalSpeed = trex.jump;
}

function paintRex(){
    ctx.drawImage(imgRex,0,0,357,383,100,trex.y,50,50);
}

function paintCaptus(){
    ctx.drawImage(imgCaptus,0,0,50,100,captus.x,captus.y,38,75);
}

function captusLogic(){
    if(captus.x < -100){
        captus.x = width + 100;
        level.score += 100;
    }else{
        captus.x -= level.speed;
    }
}

function paintCloud(){
    ctx.drawImage(imgCloud,0,0,95,50,cloud.x,cloud.y,95,30);
    ctx.drawImage(imgCloud,0,0,95,30,farCloud.x,farCloud.y,95,30);
}

function paintFloor(){
    ctx.drawImage(imgFloor,floorObj.x,0,2400,30,0,floorObj.y,2400,30);
}

function floorLogic(){
    if(floorObj.x > 700){
        floorObj.x = 0;
    }else{
        floorObj.x += level.speed;
    }

    if(floorObj.x < -100){
        floorObj.x = width + 200;
    }else{
        floorObj.x -= floorObj.speed;
    }
}

function cloudLogic(){
    if(cloud.x < -100){
        cloud.x = width + 100;
    }else{
        cloud.x -= cloud.speed;
    }

    if(farCloud.x < -100){
        farCloud.x = width + 200;
    }else{
        farCloud.x -= farCloud.speed;
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

function colision(){
    if(captus.x >= 100 && captus.x <= 150){
        if(trex.y >= floor-25){
            level.dead = true;
            level.speed = 0;
            floorObj.speed = 0;
            cloud.speed = 0;
            farCloud.speed = 0;
        }
    }
}

function loadSprite(){
    imgRex = new Image();
    imgCaptus = new Image();
    imgCloud = new Image();
    imgFloor = new Image();
    imgRex.src = 'sprites/rex.png'
    imgCaptus.src = 'sprites/captus.png'
    imgCloud.src = 'sprites/cloud.png'
    imgFloor.src = 'sprites/floor.png'
}

function score(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${level.score}`,600,50);
    
    if(level.dead){
        ctx.font = '60px impact';
        ctx.fillText('GAME OVER',240,150)
    }
}

function update(){
    cleanCanvas();
    score();
    colision();
    gravity();
    floorLogic();
    paintFloor();
    cloudLogic();
    paintCloud();
    captusLogic();
    paintCaptus();
    paintRex();
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
    update();
}