var canvas;
var ctx;
var words = [];
const BOARDWIDTH = 900;
const BOARDHEIGHT = 600;

function word(){
  this.x = -100;
  this.y = Math.floor(Math.random() * 560 + 20);
  this.moveSpeed = Math.random() * 3 + 1;
  this.text = "" + this.y;
  this.textWidth = ctx.measureText(this.text).width;
  this.draw = function(){
    ctx.font = '20px Times';
    ctx.fillStyle = '#FFF';
    ctx.fillText(this.text, this.x, this.y);
  }
  this.move = function(){
    this.x += this.moveSpeed;
    this.draw();
    if(this.x > BOARDWIDTH - this.textWidth){
      this.delete();
      console.log(words);
    }

  }
  this.delete = function(){
    for(let i = 0; i < words.length; i++){
      if(words[i] === this){
        words.splice(i,1);
      }
    }
  }
}
function clearScreen(){
  ctx.clearRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
}

function animate(){
  clearScreen();
  for(let i = 0; i < words.length; i++){
    words[i].move();
  }
}
function createWord(){
  temp = new word();
  words.push(temp);
}

function gameLoop(){
  setInterval("createWord()", 1000);
  setInterval("animate()", 12);
}
function findWord(s){
  for(let i = 0; i < words.length; i++){
    if(s === words[i].text){
      words[i].delete();
      return true;
    }
  }
}

$(document).ready(function(){
  let score = 0;
  canvas = document.getElementById("maincanvas");
  ctx = canvas.getContext("2d");
  canvas.width = BOARDWIDTH;
  canvas.height = BOARDHEIGHT;

  $("#startgame").click(function(){
    gameLoop();
  });

  $(".mainform").submit(function(event){
    event.preventDefault();
    let userInput = $("#userInput").val();
    let output = $(".output");
    if(findWord(userInput)){
      score++;
      output.text("Score: " + score);
      output.hide();
      output.fadeIn();
    }
    $("#userInput").val("")
  });
});
