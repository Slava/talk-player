Meteor.startup(function () {
  if (! Transcripts.find().count()) {
    var slug = "meteor-meets-your-text-editor";
    var srt = Assets.getText(slug + ".srt");
    var parser = Meteor.require('subtitles-parser');
    var data = parser.fromSrt(srt);

    var toDate = function (s) {
      var splitted = s.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/).slice(1);
      var numbers = _.map(splitted, function (s) {
        return parseInt(s, 10);
      });

      return numbers[0] * 60 * 60 + numbers[1] * 60 + numbers[2] + numbers[3] / 1000.0;
    };

    data = _.map(data, function (d) {
      return _.extend(d, {
        startTime: toDate(d.startTime),
        endTime: toDate(d.endTime)
      });
    });

    // XXX manually computed
    var starts = [0, 4, 10, 16, 25, 41, 48];
    var outline = [
      {title: "Greetings", paragraphStart: 0 },
      {title: "Vim Love/Hate", paragraphStart: 4 },
      {title: "TernJS + Meteor", paragraphStart: 16 },
      {title: "Features", paragraphStart: 25 },
      {title: "Contribute", paragraphStart: 48 }
    ];

    Transcripts.insert({
      slug: slug,
      data: data,
      paragraphStarts: starts,
      outline: outline
    });
  }
});

