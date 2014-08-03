Template.techTalkOutline.rendered = function () {
  // make the outline "sticky"
  $('.tech-talk-outline .inner').waypoint("sticky", {
    offset: $('.tech-talk-outline').height() + 100 // hardcoded the values of offset as there are title and paddings and margins
  });
};

