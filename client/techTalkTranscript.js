Template.techTalkTranscript.paragraphs = function () {
  var transcript = Transcripts.findOne({ slug: "meteor-meets-your-text-editor" });
  if (! transcript)
    return;
  var subs = transcript.data;
  var paragraphs = [];
  var paragraph = { spans: [] };

  _.each(subs, function (sub, i) {
    if (_.contains(transcript.paragraphStarts, i)) {
      paragraphs.push(paragraph);
      paragraph = { spans: [] };
    }

    paragraph.spans.push(sub);
  });

  paragraphs.push(paragraph);
  return paragraphs;
};

Session.setDefault('hovered-outline-position', { top: -100, left: -100 });
Template.techTalkTranscript.events({
  'mouseenter span': function (e) {
    var offset = $(e.currentTarget).offset();
    offset.ts = this.startTime;
    Session.set('hovered-outline-position', offset);
  },
  'mouseleave p': function (e) {
    Session.set('hovered-outline-position', { top: -100, left: -100 });
  },
  'click span': function (e) {
    Player && Player.setPosition(this.startTime);
    e.preventDefault();
    return false;
  }
});

Template.techTalkTranscript.timeMarkAttr = function () {
  return {
    style: "top:" +
      Session.get('hovered-outline-position').top + "px"
  };
};

Template.techTalkTranscript.timeMarkTS = function () {
  var ts = Session.get('hovered-outline-position').ts;
  if (! ts) return "";
  var h = Math.floor(ts / 60 / 60);
  ts -= h * 60 * 60;
  var m = Math.floor(ts / 60);
  ts -= m * 60;
  var s = ts | 0;

  var pad = function (x) { return x < 10 ? "0" + x : x; };
  return pad(h) + ":" + pad(m) + ":" + pad(s);
};

