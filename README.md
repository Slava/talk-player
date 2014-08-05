# Weekend project: Heavybit talk player

For some time I have been on a look out for a good example of a web app. Not a
collection of animations and useless pop-ups but something that makes the user
experience actually better.

One of such examples that came across my eye was the talk player on the
[Heavybit Library page][heavybit]. The player is interesting as it improves my
experience by providing the outline, the talk transcript and the playback
synchronization between the video, slides and text.

You can compare it to the player [InfoQ provides][infoq], for example, this
player focuses on slides and sound more. Compared to watching talks on YouTube I
can skim the transcript, find a part I am the most interested in and come back
to the talk clicking on the highlighted quotes afterwards.

I decided to replicate the player myself over the weekend and see what happens.
Of course I decided to do it in [Meteor][meteor] as it suites the purpose of
on-page reactivity perfectly ;).

The first evening was spent adjusting CSS styles as I am really bad in the
front-end development. Luckily I already had the page I am replicating and it
was fairly easy to look at the layout and break it down to smaller templates.

Some non-obvious work was required to use the jQuery plugin
["waypoints.sticky"][waypoints.sticky] as it didn't play really well with Blaze,
the rendering engine. It was solved in 10 minutes through by "reapplying" the
plugin every time the template might have been rendered.

By manipulating the [Video.js][videojs] I created a reactive data source that
would update every time the playback position has been changed. That allowed me
to sync the other parts of the story - slides player ([Reveal.js][revealjs]) and
the transcript assembled from the subtitles I already had.

Two days later, I have a fully-functioning player which is very similar to the
one Heavybit has, built entirely in Meteor. It was a good exercise for me as I
don't get a chance to build apps with Meteor that often. It's been a good
weekend as I did a lot of other things as well outside on a lake.

You can check it out [live](http://talk-player.meteor.com/) or on
[GitHub](https://github.com/Slava/talk-player).

I want to thank Tim Nguyen who has built the original Heavybit Library, great
work!

[heavybit]: http://www.heavybit.com/library/video/2013-10-15-marten-mickos
[infoq]: http://www.infoq.com/presentations/meteor-web
[waypoints.sticky]: http://imakewebthings.com/jquery-waypoints/shortcuts/sticky-elements/
[videojs]: http://videojs.com/
[revealjs]: http://lab.hakim.se/reveal-js/
[meteor]: https://www.meteor.com

