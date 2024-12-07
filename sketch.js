var trex, trex_running, ground, ground_img, invisgrnd, cloudimg, ob1, ob2, ob3, ob4, ob5, ob6, cloud, obstacle, score, obgrp;
var cloudgrp, bg, trex_collide, gameover_icon, restart_icon, gameover, restart, jump_sound, die_sound, cp_sound;
var game_state = "start";

function preload(){
trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png");
ground_img=loadImage("ground2.png");
cloudimg=loadImage("cloud.png");
bg=loadImage("snow02 (1).gif");
ob1=loadImage("obstacle1.png");
ob2=loadImage("obstacle2.png");
ob3=loadImage("obstacle3.png");
ob4=loadImage("obstacle4.png");
ob5=loadImage("obstacle5.png");
ob6=loadImage("obstacle6.png");
trex_collide=loadAnimation("trex_collided.png");
gameover_icon=loadImage("gameOver.png");
restart_icon=loadImage("restart.png");
jump_sound=loadSound("jump.mp3");
die_sound=loadSound("die.mp3");
cp_sound=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(900,400);
  ground=createSprite(350, 390, 700, 30);
  // creating trex
 trex=createSprite(120, 140, 15, 20);
 trex.addAnimation("running_dino", trex_running);
 trex.addAnimation("collided_dino", trex_collide);
 invisgrnd=createSprite(350, 390, 700, 10);
 invisgrnd.visible=false;
  //adding scale and position to trex
  trex.scale=0.7;
  
  ground.addImage("ground", ground_img);
  score=0;
  obgrp=new Group();
  cloudgrp=new Group();
  trex.setCollider("circle", 0, 0, 30);
  //trex.debug=true;
  gameover=createSprite(425, 150);
  gameover.addImage(gameover_icon);
  gameover.scale=0.8;
  restart=createSprite(425, 210);
  restart.addImage(restart_icon);
  restart.scale=0.8;
}


function draw(){
  //set background color 
  background(180);
  drawSprites();
  //logging the y position of the trex
  textSize(30)
text("HI " + score, 750, 45);



//game start

if(game_state=="start"){
  //jump when space key is pressed
  
if (keyDown("space") && trex.y>=340){
  trex.velocityY= -14;
  jump_sound.play();
}
trex.velocityY+=1;
score=score+Math.round(frameCount/30);
Cloudmaker();
obmaker();
ground.velocityX=-11;
if(ground.x<0){
  ground.x=ground.width/2;
}
if(obgrp.isTouching(trex)){
game_state="stop";
die_sound.play();
}
gameover.visible=false;
restart.visible=false;

if(score%1000==0 && score!=0){
  cp_sound.play();
}
}




//game stop
else if(game_state=="stop"){
  ground.velocityX=0;
  obgrp.setVelocityXEach(0);
  cloudgrp.setVelocityXEach(0);
  trex.changeAnimation("collided_dino", trex_collide);
  obgrp.setLifetimeEach(-1);
  cloudgrp.setLifetimeEach(-1);
  gameover.visible=true;
  restart.visible=true;
  trex.velocityY=0;
  if(mousePressedOver(restart)){
  reset();

}
}



  //stop trex from falling down
trex.collide(invisgrnd);

}

function Cloudmaker(){
  if(frameCount%80 === 0){
cloud=createSprite(890, 50, 40, 10);
cloud.y=Math.round(random(10, 60));
cloud.velocityX=-6;
cloud.addImage(cloudimg);
cloud.lifetime=250;
cloud.depth=trex.depth;
trex.depth = trex.depth +1;
cloudgrp.add(cloud);
}
}


function obmaker(){
  if(frameCount%35===0){
  obstacle=createSprite(890, 365, 10, 40);
  obstacle.velocityX=-11;
  var ran = Math.round(random(1,6));
  switch(ran){
    case 1: obstacle.addImage(ob1);
    break;
    case 2: obstacle.addImage(ob2);
    break;
    case 3: obstacle.addImage(ob3);
    break;
    case 4: obstacle.addImage(ob4);
    break;
    case 5: obstacle.addImage(ob5);
    break;
    case 6: obstacle.addImage(ob6);
    break;
    default:break;
  }
  obstacle.scale=0.75;
  obstacle.lifetime=150;
  obgrp.add(obstacle);
  }
}

function reset(){
  game_state="start";
  score=0
  gameover.visible=false;
  restart.visible=false;
  cloudgrp.destroyEach();
  obgrp.destroyEach();
  trex.changeAnimation("running_dino", trex_running);
  trex.setCollider("circle", 0, 0, 28);

}