import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// let blah = setInterval(function(){
//   console.log("test");
// }, 5000);
//
// setTimeout(function(){
//   clearTimeout(blah);
//   console.log("test2");
// }, 3000);
//
//file reading is asynch so callbacks have to be used to store input, finish this later
// var dictionary;
// function attachFileListeners(dictionary){
//   $("#inputFile").on("change", function(e){
//     let file = e.target.files[0];
//     if (!file) {
//       return;
//     }
//     let reader = new FileReader();
//     reader.onload = function(e) {
//       let contents = e.target.result;
//       dictionary += contents;
//     };
//     reader.readAsText(file);
//   });
// }
//back end
///////////////////////current attempt
/*
var canvas = $("#maincanvas");
var ctx;
var textXpos;
var text;
$(function(){
  ctx = canvas[0].getContext("2d");
  setInterval("draw()", 1000);
  text = "test";
  textXpos = 0;
});

function draw(){
  // let text = "test text";
  // ctx.font = "30px Times";
  // ctx.fillStyle = "white";
  // ctx.textAlign = "left";
  // ctx.fillText(text, 0, canvas[0].height/2);
  ctx.clearRect(0,0,900,600);
  ctx.fillRect(0,0,900,600);

  var metrics = ctx.measureText(text);
  var textWidth = metrics.width;

  textXpos += 10;
  ctx.font = '20px Times';
  ctx.fillStyle = 'white';
  ctx.fillText(text, textXpos, 200);

}
*/
///////////////////////current attempt
var context;
var text = "";
var textDirection ="";

$(function()
{
    context = document.getElementById("maincanvas").getContext("2d");
    setInterval("animate()", 30);

    textDirection ="right";
    textXpos = 5;
    text = "test text";
});

function animate() {
    // Clear screen
    context.clearRect(0, 0, 500, 500);
    context.globalAlpha = 1;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, 500, 500);

    var metrics = context.measureText(text);
    var textWidth = metrics.width;

    if (textDirection == "right") {
        textXpos += 10;

        if (textXpos > 500 - textWidth) {
            textDirection = "left";
        }
    }
    else {
        textXpos -= 10;

        if (textXpos < 10) {
            textDirection = "right";
        }
    }

    context.font = '20px _sans';
    context.fillStyle = '#FF0000';
    context.textBaseline = 'top';
    context.fillText  ( text, textXpos, 180);
  }
//front end
// $(document).ready(function(){
//   // let canvas = $("#maincanvas");
//   // let ctx = canvas[0].getContext("2d");
//   var input = $("#userInput");
//   var dictionary = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");
//
//
//   // ctx.font = "30px"
//   // ctx.fillStyle = "white";
//   // ctx.fillText("test text", canvas.width/2, canvas.height/2);
//
//   $(".mainform").submit(function(event){
//     event.preventDefault();
//     console.log(dictionary);
//     input.val("");
//   });
//
// });
