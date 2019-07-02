function Board(CSize) {
   this.cells = 3;
   
   this.w = ((CSize - 2) /  this.cells);
   this.board = [[], [], []];
   
   this.inputs = [[], [], []];
   
   for (var i = 0; i < this.cells; i++) {
      for (var j = 0; j < this.cells; j++) {
         this.board[i][j] = new Box((j * this.w), (i * this.w), this.w);
      }
   }
   
   this.show = function() {
      for (var i = 0; i < this.cells; i++) {
         for (var j = 0; j < this.cells; j++) {
         	stroke(0);
            
            if (this.Onit(this.board[i][j])) {
               fill(150, 150, 255, 255);
            }
            else {
               fill(255);
            }
            
            rect(this.board[i][j].x, this.board[i][j].y, (this.board[i][j].s + 1), (this.board[i][j].s + 1));
            
            if (this.inputs[i][j] == "O") {
               noFill();
               ellipse((this.board[i][j].x + (this.board[i][j].s / 2)), (this.board[i][j].y + (this.board[i][j].s / 2)), 60);
            }
            
            if (this.inputs[i][j] == "X") {
               var offset = 25;
               line((this.board[i][j].x + offset), (this.board[i][j].y + offset), (this.board[i][j].x + this.board[i][j].s - offset), (this.board[i][j].y + this.board[i][j].s - offset));
               line((this.board[i][j].x + this.board[i][j].s - offset), (this.board[i][j].y + offset), (this.board[i][j].x + offset), (this.board[i][j].y + this.board[i][j].s - offset));
               
            }
         }
      }
   }
   
   this.Onit = function(Cell) {
      var x1 = Cell.x;
      var y1 = Cell.y;
      var x2 = (Cell.x + Cell.s);
      var y2 = (Cell.y + Cell.s);
      
      if (((mouseX >= x1) && (mouseX <= x2)) && ((mouseY >= y1) && (mouseY <= y2))) {
         return(true);
         
      }
   }
   
   this.turn = function(index) {
      for (var i = 0; i < board.board.length; i++) {
         for (var j = 0; j < board.board.length; j++) {
            if (this.Onit(this.board[i][j])) {
               if ((this.inputs[i][j] != "X") && ((this.inputs[i][j] != "O"))) {
                  if (index == 1) {
                     this.inputs[i][j] = "O";
                  }
                  else {
                     this.inputs[i][j] = "X";
                  }
                  
                  index++;
                  
                  if (index > 1) {
                     index = 0;
                  }
                  
                  return(index);
               }
            }
         }
      }
      return(index);
   }
   
   this.check_Win = function(index) {
      var win = false;
      var winer;
      var x = -1;
      var y = -1;
      
      if (win === false){
         // Verticals & Horizentals
         for (var i = 0; i < this.inputs.length; i++) {
            if ((this.inputs[i][0] !== undefined) && (this.inputs[i][0] === this.inputs[i][1]) && (this.inputs[i][1] === this.inputs[i][2])) {
               x = i;
               win = true;
               winer = this.inputs[i][0];
            }
            
            if ((this.inputs[0][i] !==  undefined) && (this.inputs[0][i] === this.inputs[1][i]) && (this.inputs[1][i] === this.inputs[2][i])) {
               y = i;
               win = true;
               winer = this.inputs[0][i];
            }
            if (win)
               break;
         }
      }
      
      if (win === false) {
         // Left Diagonal
         if ((this.inputs[0][0] !== undefined) && (this.inputs[0][0] == this.inputs[1][1]) && (this.inputs[1][1] == this.inputs[2][2])) {
            x = 3;
            win = true;
            winer = this.inputs[0][0];
         }
         // Right Diagonal
         else if ((this.inputs[0][2] !== undefined) && (this.inputs[0][2] == this.inputs[1][1]) && (this.inputs[1][1] == this.inputs[2][0])) {
            x = 4;
            win = true;
            winer = this.inputs[0][2];
         }
      }
      
      if (win) {
         var x1;
         var y1;
         var x2;
         var y2;
         
         stroke(255, 0, 0);

         // Drawing line
         if (y === 0) {
            x1 = ((this.board[0][0].x + this.board[0][0].s) / 2);
            y1 = 20;
            x2 = x1;
            y2 = (CSize  - 24);
            
            line(x1, y1, x2, y2);
         }
         else if (y == 1) {
            x1 = (this.board[0][1].x + (this.board[0][1].s / 2));
            y1 = 20;
            x2 = x1;
            y2 = (CSize  - 24);
            
            line(x1, y1, x2, y2);
         }
         else if (y == 2) {
            x1 = (this.board[0][2].x + (this.board[0][2].s / 2));
            y1 = 20;
            x2 = x1;
            y2 = (CSize  - 24);
            
            line(x1, y1, x2, y2);
         }
         
         if (x === 0) {
            x1 = (this.board[0][0].x + 20);
            y1 = ((this.board[0][0].y + this.board[0][0].s) / 2);
            x2 = (CSize  - 24);
            y2 = y1;
            
            line(x1, y1, x2, y2);
         }
         else if (x == 1) {
            x1 = (this.board[1][0].x + 20);
            y1 = (this.board[1][0].y + (this.board[1][0].s / 2));
            x2 = (CSize  - 24);
            y2 = y1;
            
            line(x1, y1, x2, y2);
         }
         else if (x == 2) {
            x1 = (this.board[2][0].x + 20);
            y1 = (this.board[2][0].y + (this.board[2][0].s / 2));
            x2 = (CSize  - 24);
            y2 = y1;
            
            line(x1, y1, x2, y2);
         }
         else if (x == 3) {
            x1 = (this.board[0][0].x + 28);
            y1 = (this.board[0][0].y + 28);
            x2 = (CSize  - 32);
            y2 = x2;
            
            line(x1, y1, x2, y2);
         }
         else if (x == 4) {
            x1 = (CSize  - 32);
            y1 = (this.board[0][2].y + 28);
            x2 = y1;
            y2 = x1;
            
            line(x1, y1, x2, y2);
         }
         noStroke();

         return(1);
      }
      
      // Tie check
      if (win === false) {
         var count = 0;
         for (i = 0; i < this.inputs.length; i++) {
            for (j = 0; j < this.inputs.length; j++) {
               if (this.inputs[i][j] !== undefined) {
                  count++;
               }
               else
                  break;
            }
         }
         if (count == (this.inputs.length * this.inputs.length)) {
            return(2);
         }
      }
   }
}

function Box(xn, yn, sn){
   this.x = xn;
   this.y = yn;
   this.s = sn;
}