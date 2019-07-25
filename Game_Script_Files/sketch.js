var Csize;
var cells;
var LIMIT;
var board;
var Players;
var p1;
var p2;

var cnv;
var h1;
var h3;
var s;
var button;
var button_add;
var button_sub;

function centerCanvas() {
   var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 3;
   cnv.position(x, y);

   

   button.position((x + (Csize / 2) - 25) , (y + Csize + 60));
   button.mousePressed(reset);

   button_add.position((x + (Csize / 2) - 120) , (y + Csize + 60));
   button_add.mousePressed(cells_Add);

   button_sub.position((x + (Csize / 2) + 55) , (y + Csize + 60));
   button_sub.mousePressed(cells_Sub);

   var x1 = (windowWidth - 100  - (3 * textWidth(s)));

   h1.position(x1, (windowHeight - 100));

   p1.position(x, (y - 60));
   p2.position((x + Csize - 120), (y - 60));
}

function windowResized() {
   centerCanvas();
}

function initialize() {
	board = new Board(Csize, cells);

	Players = board.selectPiece();

	p1.html("Player 1: " + Players[0]);
	p2.html("Player 2: " + Players[1]);
}

function setup() {
   Csize = 403;
   cells = 3;
   LIMIT = 15;

   document.body.style.backgroundColor = color(9, 2, 82);
   
   cnv = createCanvas(Csize, (Csize + 50));
   cnv.style('display', 'block');
   
   button = createButton("Reset").style('border-radius', '8px').style('background-color', 'lime');

   button_add = createButton("Add Cell").style('border-radius', '50px').style('background-color', 'coral');
   button_sub = createButton("Sub Cell").style('border-radius', '50px').style('background-color', 'coral');

   h3 = createElement('h3', 'This is a Simple Tic-Tac-Toe game made with JavaScript (p5). (Press "r/R" or "Reset" button to reset the game) v1.0').style('color', 'White').style('background-color', 'purple');
   s = "~ by Diptanu Roy";
   h1 = createElement('h1', s).style('color', 'Yellow');

   p1 = createElement('h2', '').style('color', 'Red');
   p2 = createElement('h2', '').style('color', 'Lime');

   initialize();
   
   centerCanvas();
}

function draw() {
	//background(0);

	board.show();

   //console.log(cells);
}

function mousePressed() {
	board.turn();
}

function reset() {
   //location.reload();
   initialize();
   loop();
}

function cells_Add() {
   if (cells < LIMIT) {
      cells++;
      reset();
   }
}

function cells_Sub() {
   if (cells > 3) {
      cells--;
      reset();
   }
}

function keyPressed() {
   if ((key === 'r') || (key === 'R')) {
      reset();
   }
}
