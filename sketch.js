var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 20, 20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  drawSprites();

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -12;
    }
    ghost.velocityY = ghost.velocityY + 0.8;

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      gameState = "end";
      ghost.destroy();
    }
  }

  if(gameState === "end"){
    background(1);
    fill("lime");
    textSize(20);
    text("GAME OVER !!!",225,300);
  }

  spawnDoors();
}

function spawnDoors() {
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50,20,20);
    var climber = createSprite(200,10,20,20);
    var invisibleBlock = createSprite(200,15,20,20);
    invisibleBlock.width = climber.width ;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;

    door.liftime = 600;
    climber.liftime = 600;
    invisibleBlock.liftime = 600;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}