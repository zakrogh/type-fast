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
$(document).ready(function(){
  let ctx = $("#maincanvas");
  let input = $("#userInput")
  $(".mainform").submit(function(event){
    event.preventDefault();
    console.log(input.val());
    input.val("");
  });

});
