var ground 
var Player
var Gamestate = "Play"
var Slab1 
var Slabz = []
var pixl
var score = 0
var Obstaclez 
var Obst
var Slabsz
var count = 0;



function preload(){

pixl = loadImage("PixelMan2.0-removebg-preview.png")
Obst = loadImage("Meteor.png")
}
function setup() {
  createCanvas(500,800);
  Player = createSprite(400, 750, 50, 50);
  ground = createSprite(250,795,800,10)
  Player.debug = false;
  Player.addImage("pixel",pixl)
   //Player.debug = true
   Slabsz = new Group();
  Player.setCollider("rectangle", 0, 0, 50, 100)
    for(var i = 700; i > -10000; i = i-100){
      var x = random(100,400)
      Slabz.push(new Slab(x,i,100,10))
    }
Obstaclez = new Group();


}

function draw() {
  background(0,0,0);

if(Gamestate === "Play"){
  count = count + 1;
  score = Math.round(count/2);
  stroke("red")
  for(var e = 0; e < 500; e = e + 30 ){
    line(e,-3500,e+10,-3500)
  }
  textSize(30)
  text("LEVEL 2", 225, -3500)
 if(keyDown(LEFT_ARROW)){
   //Player.velocityX = -3
   Player.x = Player.x - 10
 }
 if(keyDown(RIGHT_ARROW)){
  //Player.velocityX = 3
  Player.x = Player.x + 10
}


  if(keyDown(UP_ARROW) && Player.velocityY === 0){
    Player.velocityY = -10;

  }
  
  Player.velocityY = Player.velocityY+0.5;
  camera.position.x = width/2
  camera.position.y = Player.y - 250
if(Player.y < -5000){
  Gamestate = "Over"
}

  createObstacles();
  if(Obstaclez.isTouching(Player)){
    Gamestate = "End"
  }
}
else if(Gamestate === "End"){
Player.y = 750
Player.x = 300
Obstaclez.destroyEach();
score = 0;
count = 0;
Gamestate = "Play"
}
else if(Gamestate === "Over"){
  Obstaclez.destroyEach();
  Slabsz.destroyEach();
  Player.destroy();
  text("Game Over, Congratulations!", camera.x, camera.y)
  
}

Player.scale = 0.5
fill("blue")
text("Score" + score, 300, camera.position.y - 300)



//line(0,400,500,400)




 
  Player.collide(ground);
  for(var e = 0; e < Slabz.length; e++){
    Player.collide(Slabz[e].slab)
  }
  
  drawSprites();
}

function createSlabs(){
 
}

function createObstacles(){
  if(frameCount%30 === 0){
    var Obstacle = createSprite(random(0,500), Player.y - 500, 10, 10)
    Obstacle.addImage(Obst)
    Obstacle.scale = 0.3
     Obstacle.velocityY = 5
     Obstaclez.add(Obstacle);
     Obstacle.setCollider("rectangle", 0, 0, 100, 200)
     Obstacle.debug = false;
  }
}