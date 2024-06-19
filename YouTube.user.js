// ==UserScript==
// @name         YouTube
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @author       kellewic
// @version      20220311
// @description  Get rid of low value stuff
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @match        *://www.youtube.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div#companion',
        'div.ytp-ad-overlay-slot',
        'div#contents ytd-promoted-sparkles-web-renderer',
        'div#big-yoodle',
        'div#masthead-ad',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();

            if ($('button.ytp-ad-skip-button').length){
                $('button.ytp-ad-skip-button').click();
            }
            else if ($('button.ytp-skip-ad-button').length){
                $('button.ytp-skip-ad-button').click();
            }
            else if ($('button.ytp-ad-skip-button-modern').length){
                $('button.ytp-ad-skip-button-modern').click();
            }
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 2000);
    })();
});
