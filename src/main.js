import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var canvas;
var ctx;
var words = [];
const BOARDWIDTH = 900;
const BOARDHEIGHT = 600;
//default:5 === move 5 pixels per animation loop
const MOVESPEED = 5;

function word(){
  this.x = -100;
  this.y = Math.floor(Math.random() * 560 + 20);
  this.moveSpeed = Math.random() * MOVESPEED + 1;
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
var clearScreen = function(){
  ctx.clearRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
}

var animate = function(){
  clearScreen();
  for(let i = 0; i < words.length; i++){
    words[i].move();
  }
}
var createWord = function(){
  let temp = new word();
  words.push(temp);
}

var gameLoop = function(){
  setInterval(function () {createWord()}, 1000);
  setInterval(function () {animate()}, 17);
}
var findWord = function(s){
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
