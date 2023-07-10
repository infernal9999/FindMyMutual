var board;

function setup() {
  createCanvas(403, 453);

  var gameMode = document.querySelector('input[name="game-mode"]:checked').value;
  var difficulty = document.querySelector('input[name="difficulty"]:checked').value;

  board = new Board(403, 3, gameMode, difficulty);
  board.initialize();

  var resetButton = createButton("Reset")
    .style("border-radius", "8px")
    .style("background-color", "lime")
    .position(164, 420);
  resetButton.mousePressed(resetGame);
}

function draw() {
  background(9, 2, 82);
  board.show();
}

function mousePressed() {
  if (!board.isGameOver() && !board.isComputerTurn()) {
    var x = floor(mouseX / board.cellSize);
    var y = floor(mouseY / board.cellSize);
    board.makeMove(x, y);
  }
}

function resetGame() {
  board.reset();
}
