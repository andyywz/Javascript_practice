// Timing is everything
function timer(){
  var date = new Date();

  function displayTime(){
    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    var dateString = h + ":" + m + ":" + s
    console.log(dateString);
  }

  function incrementTime(){
    setInterval(function(){
      date.setSeconds(date.getSeconds() + 1);
      displayTime();
    }, 1000);
  }

  displayTime();
  incrementTime();
}

timer();

// Crazy sort
function crazyBubbleSort(arr){
  var readline = require('readline');
  var reader = readline.createInterface({
     input: process.stdin,
     output: process.stdout
  });
  var swaps = true;

  function compare(el1, el2, callback){
    var question = el1 + " is >, =, or < than " + el2 + " ? : ";
    reader.question(question, function(answer){
      switch(answer){
        case ">":
          callback(1);
          break;
        case "<":
          callback(-1);
          break;
        case "=":
          callback(0)
          break;
        default:
          console.log("Invalid Input");
          compare(el1, el2, callback);
      }
    });
  }

  function performSortPass(){
    var i = 0;
    swaps = false;
    if(i + 1 < arr.length){
      loop();
    }

    function loop(){
      compare(arr[i], arr[i + 1], function(answer){
        if(answer === 1){
          var temp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = temp;
          swaps = true;
        }

        i++;
        if(i + 1 < arr.length){
          loop();
        }else if(swaps){
          performSortPass();
        }
      });
    }
  }

  performSortPass();
}

//crazyBubbleSort([5,4,3,2,1]);

// Bind
Function.prototype.myBind = function (obj) {
  var that = this;
  return function(){ that.apply(obj, arguments); };
};

function printName(greeting){
  console.log(greeting + this.name);
};

var apple = { name:"apple" };
var applefunc = printName.myBind(apple);

// applefunc("hello ");
