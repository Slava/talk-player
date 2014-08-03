Template.techTalkOutline.rendered = function () {
  // make the outline "sticky"
  $('.tech-talk-outline .inner').waypoint("sticky", {
    offset: $('.tech-talk-outline').height() + 80 // hardcoded the values of offset as there are title and paddings and margins
  });
};

Template.techTalkOutline.outlineParts = function () {
  var transcript = Transcripts.findOne({ slug: "meteor-meets-your-text-editor" });
  if (! transcript)
    return;
  return transcript.outline;
};

