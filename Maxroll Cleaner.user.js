// ==UserScript==
// @name         Maxroll Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=maxroll.gg
// @author       kellewic
// @version      20230714
// @description  Get rid of low value page content

// @match        *://maxroll.gg/*

// @grant        none
// @nocompat     Chrome
// @noframes
// @run-at       document-start
// @require      https://code.jquery.com/jquery-3.6.0.min.js

// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    let elements = [
        'div#le-post-video-ad',
        'div#le-right-sidebar-post',
        'div#landing-right-sidebar-post',
        'div#landing-home-video-ad',
        'div#le-game-landing-video-ad',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        setTimeout(changePage, 2000);
    })();
});
