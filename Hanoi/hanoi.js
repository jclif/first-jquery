(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  buildTowers = function (size) {
    towers = [[], [], []];
    for(i = size; i > 0; i-- ) {
      towers[0].push(i);
    }
    return towers;
  }

  var Game = Hanoi.Game = function(size) {
    this.size = size
    this.towers = buildTowers(size);
    this.UI = new Hanoi.HanoiUI(this);
  };

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == this.size) || (this.towers[1].length == this.size);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    this.UI.render();
    this.UI.setClicks();
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;

    if (game.move(start,end)) {
      console.log(game.towers);
    } else {
      console.log("Invalid move!")
    }

    if (game.isWon()) {
      console.log("You win!");
      READER.close();
    } else {
      game.run();
    }
  }
})(this);