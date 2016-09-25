var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var endTime = new Date(2016, 8, 26, 18, 30, 10);
var curShowTimeSeconds = 0

var balls = [];

var messages = [];

const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");
  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurrentShowTimeSeconds()
  setInterval(
    function() {
      render(context);
      update();
    },
    50
  );
}

function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret / 1000)

  return ret >= 0 ? ret : 0;
}

function update() {

  var nextShowTimeSeconds = getCurrentShowTimeSeconds();

  var nextHours = parseInt(nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
  var nextSeconds = nextShowTimeSeconds % 60

  var curHours = parseInt(curShowTimeSeconds / 3600);
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
  var curSeconds = curShowTimeSeconds % 60

  if (nextSeconds != curSeconds) {
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
    }

    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
    }

    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      // addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, 1);
      addSingleBall(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP);
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      // addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, 1);
      addSingleBall(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP);
    }

    curShowTimeSeconds = nextShowTimeSeconds;

    addSingleMessage(200,200);
    // addSingleMessage(400,200);
    // addSingleMessage(600,200);
    // addSingleMessage(800,200);
    // addSingleMessage(300,400);
  }

  updateBalls();

  updateMessages();
}




function updateMessages() {

  for (var i = 0; i < messages.length; i++) {

    messages[i].x += messages[i].vx;
    messages[i].y += messages[i].vy;
    messages[i].vy += messages[i].g;

    if (messages[i].y >= WINDOW_HEIGHT - RADIUS) {
      messages[i].y = WINDOW_HEIGHT - RADIUS;
      messages[i].vy = -messages[i].vy * 0.75;
    }
  }

}
function updateBalls() {

  for (var i = 0; i < balls.length; i++) {

    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }

  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[cnt++] = balls[i];
    }
  }

  while (balls.length > cnt) {
    balls.pop();
  }
  // console.log(balls.length);
}




function addBalls(x, y, num) {

  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        var img = new Image();
        img.src = "assets/self-owned/img/yuanbao.png";
        var aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          pic: img
        }

        balls.push(aBall)
      }
}

function addSingleMessage(x, y) {

  var message = {
    x: x ,
    y: y ,
    g: 1.5 + Math.random(),
    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
    vy: -5,
    text:"world"
  }

  messages.push(message);
}

function addSingleBall(x, y) {

  var img = new Image();
  img.src = "assets/self-owned/img/yuanbao.png";
  var aBall = {
    x: x + (RADIUS + 1),
    y: y + (RADIUS + 1),
    g: 1.5 + Math.random(),
    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
    vy: -5,
    pic: img
  }

  balls.push(aBall);
}



function render(cxt) {

  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
  var seconds = curShowTimeSeconds % 60

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

  for (var i = 0; i < balls.length; i++) {

    var ball = balls[i];
    var img = ball.pic;
    cxt.drawImage(img, ball.x, ball.y, 38, 28);
  }

  for (var i = 0; i < messages.length; i++) {
    var message = messages[i];
    cxt.font = 'bold 144px consolas';
    cxt.textAlign = 'left';
    cxt.textBaseline = 'top';
    cxt.fillStyle = "#E74C3C";
    cxt.fillText(message.text, message.x, message.y);
  }

}




function renderDigit(x, y, num, cxt) {

  cxt.fillStyle = "#E74C3C";

  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        cxt.closePath()

        cxt.fill()
      }
}

function renderText(x, y, cxt) {
  cxt.font = 'bold 144px consolas';
  cxt.textAlign = 'left';
  cxt.textBaseline = 'top';
  cxt.strokeStyle = '#DF5326';
  cxt.strokeText('Hello', x, y);
}
