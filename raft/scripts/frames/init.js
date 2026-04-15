"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define(["./playground", "./title", "./intro", "./overview", "./election", "./replication", "./conclusion"],
    function (playground, title, intro, overview, election, replication, conclusion) {
        return function (player) {
            // player.frame("playground", "Playground", playground);
            player.frame("home", t('frame.home'), title);
            player.frame("intro", t('frame.intro'), intro);
            player.frame("overview", t('frame.overview'), overview);
            player.frame("election", t('frame.election'), election);
            player.frame("replication", t('frame.replication'), replication);
            player.frame("conclusion", t('frame.conclusion'), conclusion);
        };
    });
