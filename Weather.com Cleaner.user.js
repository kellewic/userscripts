// ==UserScript==
// @name         Weather.com Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=weather.com
// @author       kellewic
// @version      20230202
// @description  Get rid of low value stuff
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @match        *://weather.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div.region-contentTop.regionContentTop.DaybreakLargeScreen--regionContentTop--2uml9',
        'div.adWrapper',
        'section[class*="PromoDriver"]',
        'div[id*="PromoDriver"]',
        'div[id^=Taboola-]',
        'footer',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 3000);
    })();
});
