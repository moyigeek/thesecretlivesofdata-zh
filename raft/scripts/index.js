"use strict";
/*jslint browser: true, nomen: true*/
/*global $, define, d3, playback*/

define(["./model/model", "./layout/layout", "./frames/init", "../../scripts/domReady/domReady-2.0.1!"], function (Model, Layout, frames, doc) {
    var i, menu, frame,
        player = playback.player();

    // Load chosen language from localStorage (default 'en')
    var lang = (window.localStorage && localStorage.getItem('tsld_lang')) || 'en';

    // Defer initialization until translations are loaded
    require(['./i18n/' + lang], function (translations) {
        // simple global translation function with placeholder support
        window.t = function (key, params) {
            var str = translations[key] || key;
            if (params && typeof params === 'object') {
                Object.keys(params).forEach(function (k) {
                    var re = new RegExp('\\{' + k + '\\}', 'g');
                    str = String(str).replace(re, params[k]);
                });
            }
            return str;
        };

        player.layout(new Layout("#chart"));
        player.model(new Model());
        player.resizeable(true);
        frames(player);

        function navigateTo(id) {
            var frame = player.frame(id.replace(/^#/, ""));
            if (frame !== null) {
                player.current(frame);
            }
        }
        navigateTo(doc.location.hash);

        // Handle "continue" button click.
        $(doc).on("click", ".btn.resume", function () {
            player.current().model().controls.resume.click();
        });

        // Handle "replay" button click.
        $(doc).on("click", ".btn.rollback", function () {
            player.current().model().controls.rollback.click();
        });

        // Handle "hashchange" event.
        $(window).on("hashchange", function () {
            navigateTo(doc.location.hash);
        });

        // Refresh the messages on every frame.
        player.addEventListener("tick", function () {
            player.current().model().tick(player.current().playhead());
            player.layout().messages.invalidate();
            player.layout().nodes.invalidateElectionTimers();
        });

        // Left and right arrow click handlers.
        $(doc).keydown(function (e) {
            var button;
            if (e.keyCode === 37) { // LEFT
                button = $(".btn.rollback");
            } else if (e.keyCode === 39) { // RIGHT
                button = $(".btn.resume");
            }

            if (button && parseInt(button.css("opacity"), 10) > 0) {
                button.click();
            }
        });

        // Update frame index display on change.
        player.addEventListener("framechange", function () {
            $("#currentIndex").text(player.currentIndex() + 1);
        });

        // Write out the frames to the menu. (target the dedicated #frames-menu so we don't touch language menu)
        menu = $("#frames-menu");
        menu.empty();
        for (i = 0; i < player.frames().length; i += 1) {
            frame = player.frame(i);
            menu.append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#' + frame.id() + '">' + (frame.title ? frame.title() : frame.id()) + '</a></li>');
        }

        // set site title and language menu labels
        $('#site-title').text(t('site.title'));
        // preserve the caret element when updating language label
        $('#language-toggle').html(t('menu.language') + ' <b class="caret"></b>');
        $('#lang-menu a[data-lang="en"]').text(t('lang.en'));
        $('#lang-menu a[data-lang="zh"]').text(t('lang.zh'));

        // language selection handler
        $(doc).on('click', '#lang-menu a[data-lang]', function (e) {
            e.preventDefault();
            var chosen = $(this).data('lang');
            if (window.localStorage) { localStorage.setItem('tsld_lang', chosen); }
            location.reload();
        });

    });
});
