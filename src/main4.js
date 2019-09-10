var context;
var text = "";
var textDirection ="";
const BOARDWIDTH = 900;
const BOARDHEIGHT = 600;

$(function()
{
    context = document.getElementById("maincanvas").getContext("2d");
    setInterval(setInterval("animate()", 10), 1000);

    textDirection ="right";
    textXpos = 5;
    text = "test text";
});

function animate() {
    // Clear screen
    context.clearRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
    context.globalAlpha = 1;
    context.fillStyle = '#000';
    context.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);

    var metrics = context.measureText(text);
    var textWidth = metrics.width;

    if (textDirection == "right") {
        textXpos += 2;

        if (textXpos > BOARDWIDTH - textWidth) {
            return;
            console.log(text);
        }
    }

    context.font = '20px Times';
    context.fillStyle = '#fff';
    context.textBaseline = 'top';
    context.fillText  ( text, textXpos, 180);
  }
