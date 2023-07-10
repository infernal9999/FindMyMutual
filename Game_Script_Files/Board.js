function Board(CSize, cells, mode, difficulty) {
  this.cells = cells;
  this.mode = mode;
  this.difficulty = difficulty;
  this.cellSize = CSize / this.cells;

  this.board = [];
  for (var i = 0; i < this.cells; i++) {
    this.board[i] = [];
  }

  this.currentPlayer = "X";
  this.computerPlayer = "O";
  this.humanPlayer = "X";
  this.gameOver = false;
  this.computerTurn = false;

  this.initialize = function () {
    for (var i = 0; i < this.cells; i++) {
      for (var j = 0; j < this.cells; j++) {
        this.board[i][j] = "";
      }
    }

    if (this.mode === "human-computer" && this.currentPlayer === this.computerPlayer) {
      this.computerTurn = true;
      this.makeComputerMove();
    }
  };

  this.show = function () {
    for (var i = 0; i < this.cells; i++) {
      for (var j = 0; j < this.cells; j++) {
        var x = j * this.cellSize;
        var y = i * this.cellSize;

        stroke(255);
        noFill();
        rect(x, y, this.cellSize, this.cellSize);

        var value = this.board[i][j];
        if (value !== "") {
          textAlign(CENTER, CENTER);
          textSize(48);
          fill(255);
          text(value, x + this.cellSize / 2, y + this.cellSize / 2);
        }
      }
    }

    if (this.gameOver) {
      textAlign(CENTER, CENTER);
      textSize(48);
      fill(0, 100, 255);
      text("Game Over", width / 2, height - 40);
    }
  };

  this.makeMove = function (x, y) {
    if (this.board[y][x] === "" && !this.gameOver) {
      this.board[y][x] = this.currentPlayer;
      if (this.checkWin(this.currentPlayer)) {
        this.gameOver = true;
      } else if (this.checkTie()) {
        this.gameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

        if (this.mode === "human-computer" && this.currentPlayer === this.computerPlayer) {
          this.computerTurn = true;
          this.makeComputerMove();
        }
      }
    }
  };

  this.makeComputerMove = function () {
    var bestMove = this.findBestMove();
    var x = bestMove.col;
    var y = bestMove.row;
    this.board[y][x] = this.computerPlayer;

    if (this.checkWin(this.computerPlayer)) {
      this.gameOver = true;
    } else if (this.checkTie()) {
      this.gameOver = true;
    } else {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.computerTurn = false;
    }
  };

  this.findBestMove = function () {
    var bestScore = -Infinity;
    var bestMove;

    for (var i = 0; i < this.cells; i++) {
      for (var j = 0; j < this.cells; j++) {
        if (this.board[i][j] === "") {
          this.board[i][j] = this.computerPlayer;
          var score = this.minimax(this.board, 0, false);
          this.board[i][j] = "";

          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, col: j };
          }
        }
      }
    }

    return bestMove;
  };

  this.minimax = function (board, depth, isMaximizing) {
    if (this.checkWin(this.computerPlayer)) {
      return 1;
    } else if (this.checkWin(this.humanPlayer)) {
      return -1;
    } else if (this.checkTie()) {
      return 0;
    }

    if (isMaximizing) {
      var bestScore = -Infinity;

      for (var i = 0; i < this.cells; i++) {
        for (var j = 0; j < this.cells; j++) {
          if (board[i][j] === "") {
            board[i][j] = this.computerPlayer;
            var score = this.minimax(board, depth + 1, false);
            board[i][j] = "";
            bestScore = max(score, bestScore);
          }
        }
      }

      return bestScore;
    } else {
      var bestScore = Infinity;

      for (var i = 0; i < this.cells; i++) {
        for (var j = 0; j < this.cells; j++) {
          if (board[i][j] === "") {
            board[i][j] = this.humanPlayer;
            var score = this.minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = min(score, bestScore);
          }
        }
      }

      return bestScore;
    }
  };

  this.checkWin = function (player) {
    // Check rows
    for (var i = 0; i < this.cells; i++) {
      var rowWin = true;
      for (var j = 0; j < this.cells; j++) {
        if (this.board[i][j] !== player) {
          rowWin = false;
          break;
        }
      }
      if (rowWin) {
        return true;
      }
    }

    // Check columns
    for (var i = 0; i < this.cells; i++) {
      var colWin = true;
      for (var j = 0; j < this.cells; j++) {
        if (this.board[j][i] !== player) {
          colWin = false;
          break;
        }
      }
      if (colWin) {
        return true;
      }
    }

    // Check diagonals
    var diagonal1Win = true;
    var diagonal2Win = true;
    for (var i = 0; i < this.cells; i++) {
      if (this.board[i][i] !== player) {
        diagonal1Win = false;
      }
      if (this.board[i][this.cells - 1 - i] !== player) {
        diagonal2Win = false;
      }
    }

    if (diagonal1Win || diagonal2Win) {
      return true;
    }

    return false;
  };

  this.checkTie = function () {
    for (var i = 0; i < this.cells; i++) {
      for (var j = 0; j < this.cells; j++) {
        if (this.board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  this.isGameOver = function () {
    return this.gameOver;
  };

  this.isComputerTurn = function () {
    return this.computerTurn;
  };

  this.reset = function () {
    this.board = [];
    this.currentPlayer = "X";
    this.gameOver = false;
    this.computerTurn = false;
    this.initialize();
  };
}
