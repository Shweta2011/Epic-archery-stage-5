const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];

var numberOfArrows = 10;


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  board1 = new Board(windowWidth-300, 33, 50, 200);
  board2 = new Board(windowWidth-350, windowHeight-700, 50, 200);


  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  board1.display();
  board2.display();

  for (var i = 0; i < playerArrows.length; i++) {
  
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      var board1Collision = Matter.SAT.collides(
        board1.body, playerArrows[i].body
      );

      var board2Collision = Matter.SAT.collides(
        board2.body, playerArrows[i].body
      );
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("EPIC ARCHERY", width / 2, 100);
  text("Remaining Arrows : " + numberOfArrows, 200,100);
}

function keyPressed() {
  if (keyCode === 32) {
    if(numberOfArrows > 0) {

    
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
    numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
