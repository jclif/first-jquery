(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var HanoiUI = Hanoi.HanoiUI = function (towers, size) {
    this.towers = towers;
    this.size = size;
    this.disk_height_percent = 100 / this.size
    for (var i = 0; i < size; i ++ ) {
      for(var t = 0; t <= 2; t++ ) {
        var new_placeholder = $('<div class="placeholder"></div>');
        new_placeholder.css('height', this.disk_height_percent + '%');
        new_placeholder.attr('id', t.toString() + i.toString())
        $('#' + t).prepend(new_placeholder)
      }
    }
  };

  HanoiUI.prototype.render = function() {
    var that = this;

    $('.disk').removeClass('disk');

    this.towers.forEach(function(tower, ti, tArr) {
      tower.forEach(function (disk, di, dArr) {
        $('#' + ti + di).addClass('disk');

        var percent_width = (100 / that.size) * disk;
        $('#' + ti + di).css('width', percent_width + '%');
      });
    });


    $('.disk').css('height', this.disk_height_percent + '%');
  }

})(this);