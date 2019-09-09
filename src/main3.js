$(document).ready(function(){
  const BOARDWIDTH = 900;
  const BOARDHEIGHT = 600;

  var canvas = document.getElementById("maincanvas");
  var ctx = canvas.getContext("2d");
  canvas.width = BOARDWIDTH;
  canvas.height = BOARDHEIGHT;

  function word(){
    this.x = 0;
    this.y = Math.random() * 600;
    this.text = "test text " + this.y;
    this.draw = function(){
      ctx.fillText(this.text, this.x, this.y);

    }
  }

  var words = [];

  for(let i = 0; i < 10; i++){
    words[i] = new word();
    words[i].draw();
  }
});
