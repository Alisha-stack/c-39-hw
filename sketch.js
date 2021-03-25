
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var database;
var canvas;
var bgImg;

function preload(){
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

 }

function setup() {
  
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  var survivalTime=0;
  
  
   monkey=createSprite(displayWidth/2 - 550, 0,20,20);
   monkey.addAnimation("moving", monkey_running);
    monkey.scale=0.2
   camera.position.x = displayWidth/2;
   camera.position.y = displayHeight/2;

  ground = createSprite(displayWidth, displayHeight-200,900,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
}


function draw() {
  background("white");
     
 
     
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("black");
  textSize(25);
  fill("black");
  text("Score: "+ score, displayWidth/2,displayHeight/2-300);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
                obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        alert("GAME OVER");
    
    
    }
    if(FoodGroup.isTouching(monkey)){
      score=score+1;
      FoodGroup.setLifetimeEach(1);

    }
  
  stroke("black");
  textSize(25);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime,displayWidth/2-500,displayHeight/2-300);
}



function spawnFood() {
  
  if (frameCount % 60 === 0) {
    banana = createSprite(displayWidth,displayHeight,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
  
     banana.addImage(bananaImage);
     banana.scale=0.08;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(displayWidth/2,displayHeight/2+120,10,40);
    obstacle.velocityX = -6;
    
   
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.20;
    
     
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);
  }
}
