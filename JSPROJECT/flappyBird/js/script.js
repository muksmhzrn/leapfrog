var TOP_LIMIT = 0;
var LOWER_LIMIT = 350;
var WORLD_HEIGHT = 350;
var GRAVITY = 9.81;
var FLAPPY_UP_VELOCITY = 50;
var FLAPPY_PASS_HEIGHT = 100;
var WINDOW_WIDTH = window.innerWidth;
var KEY_CODES = {
  SPACE: 32
};
var countScore = 0;
var moveWorld;
var gameArray = [];

function getRandom(upper, lower) {
  return Math.floor(Math.random() * (upper)) + lower;
}

//initial

function start() {
  var newWorld = new World();

  newWorld.createWorld();
  gameArray.push(newWorld);
}

start();