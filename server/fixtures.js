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

      return new Date(numbers[0] * 60 * 60 + numbers[1] * 60 + numbers[2] + numbers[3] / 1000.0);
    };

    data = _.map(data, function (d) {
      return _.extend(d, {
        startTime: toDate(d.startTime),
        endTime: toDate(d.endTime)
      });
    });

    Transcripts.insert({
      slug: slug,
      data: data
    });
  }
});

