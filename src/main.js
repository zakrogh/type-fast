import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var canvas;
var ctx;
var words = [];
var wordCreator;
var wordAnimator;
//dictionary:
//https://www.espressoenglish.net/1000-most-common-words-in-english/
var dictionary; //= "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".toLowerCase().split(" ");
var missed = 0;
var numLives = 5;
const BOARDWIDTH = 900;
const BOARDHEIGHT = 600;
//default:5 === move 5 pixels per animation loop
const MOVESPEED = 5;

function word(){
  this.x = -100;
  this.y = Math.floor(Math.random() * 560 + 20);
  this.moveSpeed = Math.random() * MOVESPEED + 1;
  //this.text = "" + this.y;
  this.text = dictionary[Math.floor(Math.random() * dictionary.length)];
  this.textWidth = ctx.measureText(this.text).width;
  this.draw = function(){
    ctx.font = '25px Verdana';
    ctx.fillStyle = '#FFF';
    ctx.fillText(this.text, this.x, this.y);
  }
  this.move = function(){
    this.x += this.moveSpeed;
    this.draw();
    if(this.x > BOARDWIDTH - this.textWidth){
      missed++;
      subtractLife(numLives);
      numLives--;
      isGameOver();
      //$(".outputMissed").text("Missed: " + missed);
      this.delete();
      console.log(words);
    }
    this.draw();

  }
  this.delete = function(){
    for(let i = 0; i < words.length; i++){
      if(words[i] === this){
        words.splice(i,1);
        return;
      }
    }
  }
}
const subtractLife = function(num){
  console.log(num);
  $("#life" + num).fadeOut();
}
const isGameOver = function(){
  if(numLives === 0){
    clearInterval(wordCreator);
    clearInterval(wordAnimator);
  }
}
const clearScreen = function(){
  ctx.clearRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
}

const animate = function(){
  clearScreen();
  for(let i = 0; i < words.length; i++){
    words[i].move();
  }
}
const createWord = function(){
  let temp = new word();
  words.push(temp);
}

const gameLoop = function(){
  //webpack freaks out if the functions aren't declared in the interval
  wordCreator = setInterval(function () {createWord()}, 1000);
  wordAnimator = setInterval(function () {animate()}, 20);
}
const findWord = function(s){
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
    dictionary = dictionary.toLowerCase().split("\n");

    for(let i = 0; i < dictionary.length; i++){
      dictionary[i] = dictionary[i].replace(/[^a-z]/g, "");
    }
    gameLoop();
  });
  $("#inputFile").on("change", function(event){
    let file = event.target.files[0];
    if(!file){
      return;
    }
    let reader = new FileReader();
    reader.onload = function(event){
      dictionary = event.target.result;
    };
    reader.readAsText(file);
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
