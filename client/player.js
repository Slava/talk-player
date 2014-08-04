Player = (function () {
  var dep = new Deps.Dependency;
  return {
    isReady: function () {
      dep.depend();
      return false;
    },
    markReady: function () {
      dep.changed();
    }
  };
})();

Template.videoPlayer.rendered = function () {
  // make the player "stick" on top when scrolled pass by
  $('.video-player').waypoint("sticky");
  var player = _V_('talk-player');
  player.ready(function () {
    var oldPlayer = Player;
    Player = getPlayer(player);
    oldPlayer.markReady();
  });

  // sync slides player with the video
  var currentSlidePlayerPos = 0;
  Deps.autorun(function () {
    var transcript = Transcripts.findOne();
    if (! Player.isReady() || ! transcript)
      return;
    var pos = Player.position();
    var slidesTimings = transcript.slidesTimings;
    var slide = _.sortedIndex(slidesTimings, pos);
    if (pos !== slidesTimings[slide])
      slide--;
    var Reveal = $('#slides-player')[0].contentWindow.Reveal;
    while (slide > currentSlidePlayerPos) {
      currentSlidePlayerPos++;
      Reveal.next();
    }
    while (slide < currentSlidePlayerPos) {
      currentSlidePlayerPos--
      Reveal.prev();
    }
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
    isReady: function () { return true; },
    position: function () {
      dep.depend();
      return player.currentTime();
    },
    setPosition: function (ts) {
      if (player.pause())
        player.play();
      player.currentTime(ts);
      dep.changed();
    }
  };
};

