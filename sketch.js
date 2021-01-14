var player , Virus , BackGround , BackGround2 , InvisibleGround , sanitizer , health,
bottles;
var enemy , sanitizers , players;
var gameState = "play";
var life = 3;
var score = 0;
var virusImage , sanitizerimg , playerAnimation , BackGroundImg , BackGroundImg2 , 
life1img , life2img , life3img;
var sanitizerBottles = 10;
var life = 3;

function preload() {

  virusImage = loadImage("images/coronavirus.png");

  playerAnimation = loadAnimation("images/sprite1.png", "images/sprite2.png",
  "images/sprite3.png", "images/sprite4.png", "images/sprite5.png", 
  "images/sprite6.png", "images/sprite7.png", "images/sprite8.png");

  BackGroundImg = loadImage("images/Background.jpg");
  BackGroundImg2 = loadImage("images/Background2.jpg");
  sanitizerimg = loadImage("images/sanitizer.png");

  life1img = loadImage("images/Full_life.png");
  life2img = loadImage("images/Half_life.png");
  life3img = loadImage("images/last_life.png");

}

function setup() {
  createCanvas(600, 600);

  enemy = new Group();
  sanitizers = new Group();
  players = new Group();

  BackGround = createSprite(300, 300, 600, 600);
  BackGround2 = createSprite(1120, 300, 600, 600);

  InvisibleGround = createSprite(300 , 550 , 600 , 5);

  player = createSprite(200, 490, 20, 20);
  player.addAnimation("animation", playerAnimation);
  player.scale = 0.5;

  health = createSprite(40 , 30 , 10 , 10);

  bottles = createSprite(100 , 30 , 10 , 10);
  bottles.addImage(sanitizerimg);
  bottles.scale = 0.2;

}

function draw() {

  imageMode(CENTER);

  players.add(player);
  player.collide(InvisibleGround);
  player.setCollider("rectangle", 0, 0, 160 , 270);

  InvisibleGround.visible = false;

  if (gameState === "play") {

    BackGround.addImage(BackGroundImg);
    BackGround.scale = 0.7;

    BackGround2.addImage(BackGroundImg2);
    BackGround2.scale = 0.7;

    BackGround.velocityX = -(2 + score/5);
    BackGround2.velocityX = -(2 + score/5);

    if(BackGround.x <= -600){

      BackGround.x = 1120;

    }

    if(BackGround2.x <= -600){

      BackGround2.x = 1120;

    }

    virus();
    Sanitizer();
    distroyCorona();
    movingPlayer();
    drawSprites();

    stroke("black");
    fill("white");
    textSize(15);
    text("score:" + score, 400, 30);

    text(" : "+sanitizerBottles , 110 , 30);

    if(life === 3){

      health.addImage(life1img);
      health.scale = 0.5;

    }

    else if(life === 2){

      health.addImage(life2img);
      health.scale = 0.5;

    }

    else if(life === 1){

      health.addImage(life3img);
      health.scale = 0.5;

    }

    for(var i = 0; i< enemy.length; i++){

      if(life !== 1){

        if(players.isTouching(enemy.get(i))){

          enemy.get(i).destroy();
          life = life-1;

        }
      }
    }

    for(var i = 0; i< enemy.length; i++){

      if(life === 1){

        if(players.isTouching(enemy.get(i))){

          background("red");
          text("Attacked by corona virus", 200 , 300);
          gameState="end";

        }
      }
    }

    if(score === 50 && life!==0){

      background("red");
      text("you defeated corona virus" , 200 , 300);
      gameState="end";

    }
  }
}

function virus() {

  var rand = Math.round(random(40 , 80));

  if (frameCount % rand === 0) {

    var ran = Math.round(random(0, 500));
    Virus = createSprite(700, ran, 10, 10);
    Virus.addImage(virusImage);
    Virus.scale = 0.5;
    Virus.velocityX = -(2 + score/5);
    Virus.lifetime = 700;
    Virus.setCollider("circle" , 15 , 0 , 95);
    
    enemy.add(Virus);

  }
}

function Sanitizer(){

  if(keyWentDown("S") && sanitizerBottles !== 0){
  
    sanitizer = createSprite(player.x , player.y , 10 , 15);
    sanitizer.addImage(sanitizerimg);
    sanitizer.scale = 0.3;
    sanitizer.velocityX = 4;
    sanitizer.lifetime = 105;
    sanitizer.setCollider("rectangle" , 0 , 0 , 100 , 175);

    sanitizers.add(sanitizer);

    sanitizerBottles = sanitizerBottles-1;

  }
}

function distroyCorona(){

  for(var k = 0; k < sanitizers.length; k++){

    for(var i = 0; i < enemy.length; i++){

      if(enemy.get(i).isTouching(sanitizers.get(k))){

        enemy.get(i).destroy();
        score = score+1;
        sanitizers.get(k).lifetime = 5;

      }
    }
  }
}

function movingPlayer(){

  if(touches.length>0 || keyDown("up")){

    if(player.y>90){

      player.y = player.y-4;

    }

  }

  player.y = player.y+2;

}