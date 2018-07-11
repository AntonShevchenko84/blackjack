// Code goes here
window.onload = function() {
var game = newGame();
  /*extra*/
function getRandomInts(max) {
  do {
  var v1 = Math.floor(Math.random() * Math.floor(max));
  var v2 = Math.floor(Math.random() * Math.floor(max));
  } while (v1 == v2);
  return([v1,v2]);
}
function getRandomInt(max) {
  do {
  var retVal =Math.floor(Math.random() * Math.floor(max));
  } while (retVal == 0);
  return retVal;
}
function consoleLog(message) {
  document.getElementById('my-console').innerHTML =+ message;
}
  /* Logic */
  function createPlayers() {
     
     var names = ['Anton', 'Andrey', 'Boris', 'Bogdan', 'Evgeniy', 'Maksim', 'Leonid', 'Ruslan', 'Simeon','Peter'];
     var ids = getRandomInts(names.length);
 
   
      var players = [];
      for (i = 0; i < 2; i++) {
        player = {
          name: names[ids[i]],
/* redundant I know */
          moves: 0,
          history: []
        };
        players.push(player);
      
    }
  return players;
  }
  
  /* Implement data storage*/
  function createGame(players) {
    if (players.length == 2) {
      //console.log('game created' + Date.now());
      return {
        date: Date.now(), 
        number: 0,
        players: players,
        moves:[],
        currentPlayer: '',
        togglePlayers: function() {
       //  console.log('before' + this.currentPlayer.name);
          if ( this.currentPlayer.name == this.players[0].name) {
            this.currentPlayer = this.players[1];
          }
          else {
            this.currentPlayer = this.players[0];
          }
        //  console.log('after' + this.currentPlayer.name);
        },
        addMove: function(player, score) {
            this.moves.push({name: player.name, score: score});
              return true;
        },
        calculateScore: function(name) {
          var sum = 0;
        //  console.log('calculate  player.name='+name);
          for (i=0;i<this.moves.length;i++) {
             if ( this.moves[i].name ==name )  
                sum += this.moves[i].score
             }
        return sum;
        }
     }
    }
  }

/* I'm joking here 
function createThing(param) {
  return {
    param: param,
    changeParam: function (_param) {
      this.param = _param;
      console.log('func createThing change its param to ' +this.param);
    }
    
  }
}
*/
  function newGame() {
    console.log('New game started');
    players = new createPlayers();
   
    game = new createGame(players);
    clearHistory(game);
    /* main loop */
    game.currentPlayer=game.players[0];
   
  
     // game = new createGame();
    //console.log(players);*/
    return game;
  }
  
  /* UI funcitons */
  
  function addToHistory(player, move) {
   
      console.log('addToHistory(): player ' + player.name +' move: ' + move);
      var table = document.getElementById('tb.bets');
      var row = table.insertRow(-1);
      if (player == game.players[0]) {
          var cell1 = row.insertCell(0); cell1.innerHTML = move;
          var cell2 = row.insertCell(1); cell2.innerHTML = 'wait';
      }
      else if (player == game.players[1]) {
        var cell1 = row.insertCell(0); cell1.innerHTML = 'wait';
        var cell2 = row.insertCell(1); cell2.innerHTML = move;
      }
  }
  function clearHistory() {
    //hack
    //document.getElementById('p.info').innerHTML = 'Current player is ' + game.currentPlayer.name
    document.getElementById('p.info').innerHTML = 'Current player is ' + game.players[0].name
    /* table stuff */
    var table = document.getElementById('tb.bets');
    var length = table.rows.length;
    if (length >1) {
      for (i=length; i>1; i--) {
         table.deleteRow(i-1);
      }
    }
    table.rows[0].cells[0].innerHTML = game.players[0].name;
    table.rows[0].cells[1].innerHTML = game.players[1].name;
   
  }
  function drawWinnerHistory(game) {
    elResults = document.getElementById('results');
    elResults.innerHTML += createSeparator('-',10);
    elResults.innerHTML += 'Game'+ game.date+' winner is' + game.winner;
    elResults.innerHTML += 'All game was ' + (game.moves.length +1) +  '  moves';
    }
  function hitAction() {

    var bet = getRandomInt(6);
    var sum = game.calculateScore(game.currentPlayer.name) + bet;
    console.log('hitAction(): name:'+game.currentPlayer.name+' sum: '+ sum);
    if (sum < 21) {
      game.addMove(game.currentPlayer, bet);
      addToHistory(game.currentPlayer, bet);
      game.togglePlayers();
      document.getElementById('p.info').innerHTML = 'Current player is ' + game.currentPlayer.name;
    } 
     else if ( sum == 21) {
      console.log('Winner is ' + game.currentPlayer.name);
      addToHistory(game.currentPlayer, bet);
      drawWinnerHistory(game);
    }
    else if ( sum > 21 ) {
      console.log('This bet is no-way!');
    }
    
  }
  function stayAction() {
    console.log('Action STAY');
  }
  
  
  /* Buttons handlers*/
  var els = document.getElementsByTagName('button');
  Array.prototype.forEach.call(els, function(el) {
    switch (el.id) {
      case 'btn.newGame':
        el.addEventListener('click', newGame);
        break;
      case 'btn.hit':
        el.addEventListener('click', hitAction);
        break;
      case 'btn.stay':
        el.addEventListener('click', stayAction);
        break;
      default:
        console.log('WARN: SRC: click handler setup :extra buttons on page ');
    }
  })

  /* Setting toggling elementors */
  function createSeparator(char, num) {
    var str = '';
    for (i = 0; i < num; i++) {
      str += char;
    }
    return str
  }

  var els = document.getElementsByClassName("p.separator");
  Array.prototype.forEach.call(els, function(el) {
    el.innerHTML = createSeparator('=+', 25);
  })

  //set toggling separator colors
  setInterval(function() {
      Array.prototype.forEach.call(els, function(el) {
        var color = el.style.color;
        color = (color == 'red' ? 'green' : 'red');
        el.style.color = color;
      });
    }, 1000)
    //Set toggling strings
  setInterval(function() {
    var strIntro = document.getElementById("p.intro").innerHTML;
    strIntro = (strIntro == 'Welcome To' ? 'Black Jack' : 'Welcome To');
    document.getElementById("p.intro").innerHTML = strIntro;
  }, 5000);
  document.getElementById("p.intro").innerHTML = 'Welcome To';

}