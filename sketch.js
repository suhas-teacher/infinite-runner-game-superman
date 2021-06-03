var superhero, backdrop, fire, fire1, fire2, fire3, fire4, fire5, fireGroup, superpower, superpowerGroup, superheroImage, backdropImage, superpowerImage, replay, replayImage;
var score = 0;
var lives = 5;
var life1, life2, life3, life4, life5, lifeImage;
var gameState = "play";
var score = 0;
var explosion, achievement, theme;

function preload() {
  superheroImage = loadAnimation("images/superhero.png");
  superheroDead = loadAnimation("images/superheroDead.png");
  fire1 = loadImage("images/fireball1.png");
  fire2 = loadImage("images/fireball2.png");
  fire3 = loadImage("images/fireball3.png");
  fire4 = loadImage("images/fireball4.png");
  fire5 = loadImage("images/fireball5.png");
  backdropImage = loadImage("images/spaceImage.jpg");
  superpowerImage = loadImage("images/superpower.png");
  lifeImage = loadImage("images/life.png");
  replayImage = loadImage("images/replay.png");
  explosion = loadSound("sounds/explosion.mp3");
  achievement = loadSound("sounds/achievement.mp3");
  theme = loadSound("sounds/Superman Theme.mp3");
}

function setup() {
  createCanvas(800,800);

  theme.loop();

  camera.x = width/2;
  camera.y = height/2;

  backdrop = createSprite(camera.x, camera.y, width, height);
  backdrop.addImage("space", backdropImage);
  backdrop.scale = 0.9;

  superhero = createSprite(camera.x-50, camera.y+100);
  superhero.addAnimation("superheroFlying", superheroImage);
  superhero.addAnimation("superheroDead", superheroDead);
  superhero.scale = 1.3;

  superpowerGroup = new Group();
  fireGroup = new Group();

  replay = createSprite(width/2, 100);
  replay.addImage("replay", replayImage);
  replay.scale = 0.3;
  replay.visible = false;

  life1 = createSprite(20, 30);
  life1.addImage("life1", lifeImage);
  life1.visible = false;
  life2 = createSprite(50, 30);
  life2.addImage("life2", lifeImage);
  life2.visible = false;
  life3 = createSprite(80, 30);
  life3.addImage("life3", lifeImage);
  life3.visible = false;
  life4 = createSprite(110, 30);
  life4.addImage("life4", lifeImage);
  life4.visible = false;
  life5 = createSprite(140, 30);
  life5.addImage("life5", lifeImage);
  life5.visible = false;
}

function draw() {
  background(0);

  if(gameState === "play") {
    backdrop.setVelocity(0, 10);
    spawnSuperpower();
    spawnFire();
    score = score + Math.round(getFrameRate()/30);
  }

  if(backdrop.y > 700 && gameState === "play") {
    backdrop.y = height/2;
  }

  if(keyDown(RIGHT_ARROW) && gameState === "play") {
    superhero.velocityX = 5;
  }

  if(keyWentUp(RIGHT_ARROW) && gameState === "play") {
    superhero.setVelocity(0, 0);
  }

  if(keyDown(LEFT_ARROW) && gameState === "play") {
    superhero.velocityX = -5;
  }

  if(keyWentUp(LEFT_ARROW) && gameState === "play") {
    superhero.setVelocity(0, 0);
  }

  if(superhero.isTouching(superpowerGroup) && lives != 5 && gameState === "play") {
    superpowerGroup.destroyEach();
    achievement.play();
    lives += 1;
  }

  if(superhero.isTouching(fireGroup) && gameState === "play") {
    fireGroup.destroyEach();
    explosion.play();
    lives -= 1;
  }

  if(lives === 5) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = true;
  }

  if(lives === 4) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = true;
    life5.visible = false;
  }

  if(lives === 3) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    life4.visible = false;
    life5.visible = false;
  }
  
  if(lives === 2) {
    life1.visible = true;
    life2.visible = true;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
  }

  if(lives === 1) {
    life1.visible = true;
    life2.visible = false;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
  }

  if(lives === 0) {
    gameState = "end";
    life1.visible = false;
    life2.visible = false;
    life3.visible = false;
    life4.visible = false;
    life5.visible = false;
  }

  if(gameState === "end") {
    backdrop.setVelocity(0, 0);
    superpowerGroup.destroyEach();
    fireGroup.destroyEach();
    superhero.changeAnimation("superheroDead", superheroDead);
    superhero.scale = 0.5;
    replay.visible = true;
    superhero.setVelocity(0, 0);
  }

  if(mousePressedOver(replay) && gameState === "end") {
    reset();
  }
  drawSprites();

  fill("blue");
  textSize(20);
  text("Score: " + score, width-150, 30);
}

function spawnSuperpower() {
  if(frameCount % 120 === 0) {
    randXSuperpower = Math.round(random(20, height-20));
    superpower = createSprite(randXSuperpower, 0);
    superpower.addImage("superpower", superpowerImage);
    superpower.debug = false;
    superpower.setCollider("circle", 0, 0, 40);
    superpower.setVelocity(0, 12);
    superpower.lifetime = 200;
    superpowerGroup.add(superpower);
  }
}

function spawnFire() {
  if(frameCount % 75 === 0) {
    randXFire = Math.round(random(20, height-20));
    fire = createSprite(randXFire, 0);
    fire.setVelocity(0, 15);
    fire.scale = 2;
    randSwitch = Math.round(random(1, 5));
    switch(randSwitch) {
      case 1: fire.addImage("fire1", fire1);
      break;
      case 2: fire.addImage("fire2", fire2);
      break;
      case 3: fire.addImage("fire3", fire3);
      break;
      case 4: fire.addImage("fire4", fire4);
      break;
      case 5: fire.addImage("fire5", fire5);
      break;
      default: 
      break;
    }
    fire.debug = false;
    fire.setCollider("circle", 0, 0, 30);
    fire.lifetime = 200;
    fireGroup.add(fire);
  }
}

function reset() {
  gameState = "play";
  superhero.changeAnimation("superheroFlying", superheroImage);
  replay.visible = false;
  lives = 5;
  score = 0;
  superhero.scale = 1.3;
}