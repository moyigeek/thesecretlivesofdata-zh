"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define([], function () {
    return function (frame) {
        var player = frame.player(),
            layout = frame.layout();

        frame.after(1, function() {
            frame.model().clear();
            layout.invalidate();
        })

        .after(500, function () {
            frame.model().title = '<h1 style="visibility:visible">' + (typeof t === 'function' ? t('conclusion.the_end') : 'The End') + '</h1>'
                        + '<br/>' + frame.model().controls.html();
            layout.invalidate();
        })
        .after(500, function () {
            frame.model().controls.show();
        })

        .after(500, function () {
            frame.model().title = '<h2 style="visibility:visible">' + (typeof t === 'function' ? t('conclusion.more_info') : 'For more information:') + '</h2>'
                        + '<h3 style="visibility:visible"><a href="https://raft.github.io/raft.pdf">' + (typeof t === 'function' ? t('conclusion.raft_paper') : 'The Raft Paper') + '</a></h3>'
                        + '<h3 style="visibility:visible"><a href="https://raft.github.io/">' + (typeof t === 'function' ? t('conclusion.raft_website') : 'Raft Web Site') + '</a></h3>'
                        + '<br/>' + frame.model().controls.html();
            layout.invalidate();
        })
        
        player.play();
    };
});
