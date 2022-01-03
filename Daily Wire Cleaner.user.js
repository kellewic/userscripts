// ==UserScript==
// @name         Daily Wire Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=dailywire.com
// @author       kellewic
// @version      20200527
// @description  Get rid of low value stuff on Daily Wire
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*dailywire.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div[class^="aniplayer_"]',
        'div#aniBox',
        'div.dw-mm-player-container',
        'div.ad-wrapper',
        'div.in-body-articles',
        'section.css-7ew4kj',
        'div.css-1c5lpxa',
        'div[data-spot-im-direction] div[product-header-placeholder]',
        'div[data-spot-im-direction] div[recirculation-ad-wrapper]',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        $('div.fluid-width-video-wrapper').parent().remove();

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 2000);
    })();
});
