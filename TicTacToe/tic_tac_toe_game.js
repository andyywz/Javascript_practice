var _ = require('../underscore.js');
var readline = require('readline');
var reader = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

function Board() {
  this.board = [[null,null,null],[null,null,null],[null,null,null]];

  this.update = function(row, col, symbol){
    this.board[row][col] = symbol;
  }

  this.isValidMove = function(row, col){
    if((row < 3 && row >= 0) && (col < 3 && col >= 0)){
      if(!this.board[row][col]){
        return true;
      }
    }
    return false;
  }

  this.render = function () {
    this.board.forEach(function (row, i) {
      var line = "";
      row.forEach(function (col, j) {
        var divider = j === 2 ? "" : " | "
        if (col) {
          line += col + divider;
        } else {
          line += " " + divider;
        }
      });
      console.log(line);
      if(i < 2) console.log("-- --- --");
    });
  };

  this.winner = function(){
    var that = this;
    var winningCombos = ["OOO", "XXX"];
    var winner = null;

    // check horizontal
    that.board.forEach(function(row){
      if(winningCombos.indexOf(row.join("")) != -1){ winner = row[0]; }
    });

    // check vertical
    that.board.forEach(function(row, i){
      var newRow = [];
      row.forEach(function(col, j){
        newRow.push(that.board[j][i]);
      });
      if(winningCombos.indexOf(newRow.join("")) != -1){ winner = newRow[0]; }
    });

    // check diagonal
    var diagonals = [[ [0,0],[1,1],[2,2] ], [ [0,2],[1,1],[2,0] ]];
    diagonals.forEach(function(diagonal){
      var newRow = [];
      diagonal.forEach(function(point){
        newRow.push(that.board[point[0]][point[1]]);
      });
      if(winningCombos.indexOf(newRow.join("")) != -1){ winner = newRow[0]; }
    });

    return winner;
  }

  this.isTie = function () {
    return _.compact(_.flatten(this.board)).length === 9;
  }
}

function Player(symbol, game) {
  this.game = game;
  this.symbol = symbol;

  this.parseMove = function (move) {
    var move = move.split(" ");
    move[0] = parseInt(move[0]);
    move[1] = parseInt(move[1]);
    return move;
  }

  this.move = function () {
    var that = this;
    reader.question("Move please (row col):", function(move){
      move = that.parseMove(move);

      if (!that.game.board.isValidMove(move[0],move[1])) {
        console.log("Invalid move");
        that.move();
        return;
      };

      that.game.board.update(move[0],move[1],that.symbol);
      var winner = that.game.winner();

      if (winner){
        that.game.board.render();
        console.log(winner + " wins!")
        console.log("Game Over");
      } else if(that.game.board.isTie()){
        that.game.board.render();
        console.log("It's a tie!")
        console.log("Game Over");
      } else{
        that.game.playTurn();
      };
    });
  }
}

function TicTacToeGame() {
  this.players = [new Player("X", this), new Player("O", this)];
  this.board = new Board();

  this.playTurn = function () {
    console.log("");
    console.log(this.players[0].symbol + "'s turn.");
    this.board.render();
    this.players[0].move();
    this.nextPlayer();
  }

  this.winner = function () {
    return this.board.winner();
  }

  this.nextPlayer = function(){
    this.players.push(this.players.shift());
  }
}

thing = new TicTacToeGame();
thing.playTurn();
