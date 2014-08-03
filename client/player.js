Player = null;
Template.videoPlayer.rendered = function () {
  // make the player "stick" on top when scrolled pass by
  $('.video-player').waypoint("sticky");
  var player = _V_('talk-player');
  player.ready(function () {
    Player = getPlayer(player);
  });
};

var getPlayer = function (player) {
  var dep = new Deps.Dependency;
  var position = 0;

  var updatePosition = function () {
    var cur = player.currentTime();
    if (cur !== position) {
      position = cur;
      dep.changed();
    }
    // update every second, long polling :(
    setTimeout(updatePosition, 1000);
  };
  setTimeout(updatePosition, 1);

  return {
    position: function () {
      dep.depend();
      return player.currentTime();
    },
    setPosition: function (ts) {
      player.currentTime(ts);
      dep.changed();
    }
  };
};

