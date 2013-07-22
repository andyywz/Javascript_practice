var _ = require('./underscore.js');
var readline = require('readline');
var reader = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

// Towers of hanoi
function TowersOfHanoiGame(){
  this.gameOver = false;
  this.piles = [[3, 2, 1],[],[]];

  this.playGame = function(){
    var that = this;
    that.printPiles();

    reader.question("(from to) Please: ", function(answer){
      answer = answer.split(" ");

      var from = that.piles[parseInt(answer[0])];
      var to = that.piles[parseInt(answer[1])];

      if (that.moveIsValid(from, to)){
        to.push(from.pop());
        if(that.piles[1].join("") === "321" || that.piles[2].join("") === "321"){
          that.gameOver = true;
        }
      } else{
        console.log("Invalid input");
      }

      if (that.gameOver){
        that.printPiles();
        console.log("You win!");
      } else {
        that.playGame();
      }
    });
  }

  this.moveIsValid = function(from, to){
    if(from && to && from.length > 0){
      if (_.last(from) < _.last(to) || _.isEmpty(to)) {
        return true;
      }
    }
    return false;
  }

  this.printPiles = function(){
    console.log("Pile 0: " + this.piles[0].join(" "));
    console.log("Pile 1: " + this.piles[1].join(" "));
    console.log("Pile 2: " + this.piles[2].join(" "));
  }
}
var toh = new TowersOfHanoiGame();
toh.playGame();

