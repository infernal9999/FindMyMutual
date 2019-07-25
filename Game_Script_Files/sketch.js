var Csize = 303;
var board;
var index;
var Player_1;
var Player_2;
var Winner;

var cnv;
var h1;
var p;
var s;
var button;

function centerCanvas() {
   var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 4;
   cnv.position(x, y);

   

   button.position((x + (Csize / 2) - 25) , (y + Csize + 60));
   button.mousePressed(reset);

   var x1 = (windowWidth - 100  - (3 * textWidth(s)));

   h1.position(x1, (windowHeight - 100));
}

function windowResized() {
   centerCanvas();
}

function initialize() {
	board = new Board(Csize);

	if (random(1) < 0.5) {
		index = 0;
		Player_1 = 0;
		Player_2 = 1;
	}
	else{
		index = 1;
		Player_1 = 1;
		Player_2 = 0;
	}
}

function setup() {
   document.body.style.backgroundColor = color(9, 2, 82);
   
   cnv = createCanvas(Csize, (Csize + 50));
   cnv.style('display', 'block');
   
   button = createButton("Reset").style('border-radius', '8px').style('background-color', 'lime');
   p = createElement('h3', 'This is a Simple 3x3 Tic-Tac-Toe game made with JavaScript. (Press "r/R" or "Reset" button to reset the game) [UPDATE: UPGRADING SOON...]').style('color', 'White').style('background-color', 'purple');
   s = "~ by Diptanu Roy";
   h1 = createElement('h1', s).style('color', 'Yellow');
   
   centerCanvas();
   
   initialize();
}

function draw() {
	background(0);

	board.show();
	Winner = board.check_Win();
	
	Show_Winner();
	Show_Player_Turn();
}

function Show_Player_Turn() {
	textAlign(CENTER, TOP);
	textSize(24);
	fill(255, 0, 255);
	text("Turn: ", ((width / 2) - textWidth("Player 1")), (height - 35));
	
	if (index === Player_1) {
	   fill(255, 0, 0);
	   text("Player 1", (width / 2), (height - 35));
	}
	else{
	   fill(0, 255, 0);
	   text("Player 2", (width / 2), (height - 35));
	}
}

function Show_Winner() {
   textAlign(CENTER, TOP);
	textSize(24);
	fill(0, 100, 255);
	
	
	if (Winner == 1) {
	   if (index === 0) {
	      index = 1;
	   }
	   else{
	      index = 0;
	   }
	   
	   text("WON", ((width / 2) + textWidth("Player 1") + 10), (height - 35));
	   noLoop();
	}
	
	if (Winner == 2) {
	   text("TIE", ((width / 2) + textWidth("Player 1") + 10), (height - 35));
	   noLoop();
	}
}

function mousePressed() {
	index = board.turn(index);
}

function reset() {
   //location.reload();
   initialize();
   loop();
}

function keyPressed() {
   if ((key === 'r') || (key === 'R')) {
      reset();
   }
}
