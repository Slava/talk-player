Template.techTalkOutline.rendered = function () {
  Deps.autorun(function () {
    Transcripts.findOne();
    Deps.afterFlush(function () {
      // make the outline "sticky"
      $('.tech-talk-outline .inner').waypoint("sticky", {
        offset: $('.tech-talk-outline').height() + 80 // hardcoded the values of offset as there are title and paddings and margins
      });

      $('.tech-talk-outline a').on('click', function (e) {
        // XXX hack as we can't get the data context directly
        var position = parseFloat(this.href.match(/.*#(.*)/)[1]);
        if (Player.isReady())
          Player.setPosition(position);
        e.preventDefault();
        return false;
      });
    });
  });
};

Template.techTalkOutline.outlineParts = function () {
  var transcript = Transcripts.findOne({ slug: "meteor-meets-your-text-editor" });
  if (! transcript)
    return;
  return transcript.outline;
};

Template.techTalkOutline.startTime = function () {
  var transcript = Transcripts.findOne({ slug: "meteor-meets-your-text-editor" });
  return transcript.data[this.paragraphStart].startTime;
};

