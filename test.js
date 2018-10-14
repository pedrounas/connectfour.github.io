var turn = 0;
var maxDepth = 4;
var row = 6;
var col = 7;
var aiMove = -1;
var b = [];

function changeDepth() {
  var val= document.getElementById("difficulty").selectedIndex;
  if (val == 0) { maxDepth = 2;}
  else if (val == 1) { maxDepth = 4;}
  else if (val == 2) { maxDepth = 6;}
  else { maxDepth = 8;}
  console.log(maxDepth);
}

function makeBoard() {
  for (var i = 0; i < 6; i++) {
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("board").appendChild(rows)
    emptyBoard();
    for (var j = 0; j < 7; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        /*if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("red");
            turn = 1;
            checkIfWin(row, col);
          }
        } else */
        if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            b[empty][this.id.slice(6)] = 'O';
            console.log(b);
            turn = 1;
            if (checkIfWin(row, col) == false) {
              minimax();
            }
          }
        }
      };
      rows.appendChild(cols);
    }
  }
  console.log(maxDepth);
}

function restartGame() {
  var size = document.getElementById("sized").selectedIndex;
  var filho = document.getElementById("board");
  var pai = document.getElementById("container");

  if (size == 0) {
    row = 4;
    col = 5;
    while (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  if (size == 1) {
    row = 6;
    col = 7;
    while (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  if (size == 2) {
    row = 9;
    col = 10;
    if (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  var board = document.createElement("div");
  emptyBoard();
  console.log(b);
  for (var i = 0; i < row; i++) {
    board.id = "board";
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("container").appendChild(board);
    document.getElementById("board").appendChild(rows);
    for (var j = 0; j < col; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        /*if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("red");
            turn = 1;
            checkIfWin(row, col);
          }
        } else*/
        if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            b[empty][this.id.slice(6)] = 'O';
            turn = 1;
            if (checkIfWin(row, col) == false) {
              minimax();
            }
          }
        }
      };
      rows.appendChild(cols);
    }
  }
  console.log(maxDepth);
}

function emptyBoard() {
  b = [];
  for (var i = 0; i < row; i++) {
    b[i] = [];
    for (var j = 0; j < col; j++) {
      b[i][j] = '-';
    }
  }
}

function cloneBoard(board) {
  var clone = [];
    for (var i = 0; i < row; i++) {
      clone[i] = [];
      for (var j = 0; j < col; j++) {
        clone[i][j] = '-';
      }
    }
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      clone[i][j] = board[i][j];
    }
  }
  return clone;
}

function findUtil(game, colN, rows) {
  for (var i = rows - 1; i >= 0; i--) {
    if (game[i][colN] == '-') {
      //console.log(colN + " " + i);
      return i;
    }
  }
  return -1;
}

function addPiece(colN, rows) {
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      document.getElementById(id).classList.remove("empty");
      document.getElementById(id).classList.add("red");
      return i;
    }
  }
  return -1;
}

function removePiece(colN, rowN) {
  var id = "col_" + rowN + "_" + colN;
  document.getElementById(id).classList.add("empty");
  document.getElementById(id).classList.remove("red");
}

function minimax() {
  var v;
  v = max(b, 0);
  console.log("MELHOR COLUNA " + aiMove);
  if (aiMove == -1) {
    for (var i = 0; i < col; i++) {
      var free = findUtil(b, i, row);
      if (free != -1) {
        aiMove = i;
        break;
      }
    }
  }
  var empty = findUtil(b, aiMove, row);
  var colName = "col_" + empty + "_" + aiMove;
  document.getElementById(colName).classList.add("red");
  document.getElementById(colName).classList.remove("empty");
  b[empty][aiMove] = 'X';
  turn = 0;
  checkIfWin(row, col);
  aiMove = -1;
}

function max(game, depth) {
  if (depth == maxDepth ) {
    return utilityVal(game);
  }
  var v = -99999;
  var max = -99999;

  for (var i = 0; i < col; i++) {

    if (findUtil(game,i, row) == -1) {
      break;
    }
    //console.log(game);
    var s = cloneBoard(game);
    var empty = findUtil(s,i, row);
    s[empty][i] = 'X';
    v = Math.max(v, min(s, depth + 1));
    if (v > max) {
      max = v;
      aiMove = i;
    }

  }
  return v;
}

function min(game, depth) {
  if (depth == maxDepth) {
    return utilityVal(game);
  }
  var v = 99999;
  for (var i = 0; i < col; i++) {
    //console.log("YEET " + depth);
    if (findUtil(game,i, row) == -1) {
      break;
    }
    var s = cloneBoard(game);
    var empty = findUtil(s,i, row);
    s[empty][i] = 'O';
    v = Math.min(v, max(s, depth + 1));
  }
  return v;
}

function utilityVal(game) {
  var totalUtility = 0;
  var nReds = 0;
  var nYellows = 0;
  //console.log("INICIAL " + totalUtility);
  for (var i = row - 1; i >= 0; i--) {
    for (var j = 0; j < col - 3; j++) {
      if (game[i][j] != 'O' && game[i][j + 1] != 'O' && game[i][j + 2] != 'O' && game[i][j + 3] != 'O') {
        if (game[i][j] == 'X') {
          nReds++;
        }
        if (game[i][j + 1] == 'X') {
          nReds++;
        }
        if (game[i][j + 2] == 'X') {
          nReds++;
        }
        if (game[i][j + 3] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (game[i][j] != 'X' && game[i][j + 1] != 'X' && game[i][j + 2] != 'X' && game[i][j + 3] != 'X') {
        if (game[i][j] == 'O') {
          nYellows++;
        }
        if (game[i][j + 1] == 'O') {
          nYellows++;
        }
        if (game[i][j + 2] == 'O') {
          nYellows++;
        }
        if (game[i][j + 3] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }

  //vertical
  for (var i = 0; i < col; i++) {
    for (var j = row - 1; j >= row - 3; j--) {
      if (game[j][i] != 'O' && game[j - 1][i] != 'O' && game[j - 2][i] != 'O' && game[j - 3][i] != 'O') {
        if (game[j][i] == 'X') {
          nReds++;
        }
        if (game[j - 1][i] == 'X') {
          nReds++;
        }
        if (game[j - 2][i] == 'X') {
          nReds++;
        }
        if (game[j - 3][i] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (game[j][i] != 'X' && game[j - 1][i] != 'X' && game[j - 2][i] != 'X' && game[j - 3][i] != 'X') {
        if (game[j][i] == 'O') {
          nYellows++;
        }
        if (game[j - 1][i] == 'O') {
          nYellows++;
        }
        if (game[j - 2][i] == 'O') {
          nYellows++;
        }
        if (game[j - 3][i] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
      if (j - 4 < 0) {
        break;
      }
    }
  }

  //diagonal1
  for (var i = row - 1; i > 2; i--) {
    for (var j = 0; j < col - 3; j++) {
      if (game[i][j] != 'O' && game[i - 1][j + 1] != 'O' && game[i - 2][j + 2] != 'O' && game[i - 3][j + 3] != 'O') {
        if (game[i][j] == 'X') {
          nReds++;
        }
        if (game[i - 1][j + 1] == 'X') {
          nReds++;
        }
        if (game[i - 2][j + 2] == 'X') {
          nReds++;
        }
        if (game[i - 3][j + 3] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;

        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (game[i][j] != 'X' && game[i - 1][j + 1] != 'X' && game[i - 2][j + 2] != 'X' && game[i - 3][j + 3] != 'X') {
        if (game[i][j] == 'O') {
          nYellows++;
        }
        if (game[i - 1][j + 1] == 'O') {
          nYellows++;
        }
        if (game[i - 2][j + 2] == 'O') {
          nYellows++;
        }
        if (game[i - 3][j + 3] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }

  //diagonal2
  for (var i = 0; i < row - 3; i++) {
    for (var j = 0; j < col - 3; j++) {
      if (game[i][j] != 'O' && game[i + 1][j + 1] != 'O' && game[i + 2][j + 2] != 'O' && game[i + 3][j + 3] != 'O') {
        if (game[i][j] == 'X') {
          nReds++;
        }
        if (game[i + 1][j + 1] == 'X') {
          nReds++;
        }
        if (game[i + 2][j + 2] == 'X') {
          nReds++;
        }
        if (game[i + 3][j + 3] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;

        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (game[i][j] != 'X' && game[i + 1][j + 1] != 'X' && game[i + 2][j + 2] != 'X' && game[i + 3][j + 3] != 'X') {
        if (game[i][j] == 'O') {
          nYellows++;
        }
        if (game[i + 1][j + 1] == 'O') {
          nYellows++;
        }
        if (game[i + 2][j + 2] == 'O') {
          nYellows++;
        }
        if (game[i + 3][j + 3] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }
  return totalUtility;
}


function quitGame() {
  alert("O jogador desistiu do jogo!");
  location.reload();
}

function findEmpty(x, rows) {
  var colN = x.slice(6);
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      document.getElementById(id).classList.remove("empty");
      return i;
    }
  }
  return -1;
}

function checkIfWin(a, b) {
  var yellowC = false;
  var redC = false;
  for (var i = a - 1; i >= 0; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + i + "_" + (j + 1);
      var id3 = "col_" + i + "_" + (j + 2);
      var id4 = "col_" + i + "_" + (j + 3);
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O computador ganhou!");
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;
      }
    }
  }

  for (var i = 0; i < b; i++) {
    for (var j = a - 1; j >= a - 3; j--) {
      var id = "col_" + j + "_" + i;
      var id2 = "col_" + (j - 1) + "_" + i;
      var id3 = "col_" + (j - 2) + "_" + i;
      var id4 = "col_" + (j - 3) + "_" + i;
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O computador ganhou!");
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;
      }
    }
  }
  for (var i = a - 1; i > 2; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i - 1) + "_" + (j + 1);
      var id3 = "col_" + (i - 2) + "_" + (j + 2);
      var id4 = "col_" + (i - 3) + "_" + (j + 3);

      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O computador ganhou!");
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;

      }
    }
  }

  for (var i = 0; i < a - 3; i++) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i + 1) + "_" + (j + 1);
      var id3 = "col_" + (i + 2) + "_" + (j + 2);
      var id4 = "col_" + (i + 3) + "_" + (j + 3);

      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O computador ganhou!");
        return true;

      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
        return true;

      }
    }
  }
  return false;
}

/*function popupInst() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}*/