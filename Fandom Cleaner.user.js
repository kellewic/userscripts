// ==UserScript==
// @name         Fandom Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=fandom.com
// @author       kellewic
// @version      20230116
// @description  Fandom Cleaner
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*fandom.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div.top-ads-container',
        'div.ad-container',
        'div.rail-boxad-wrapper',
        'div#rail-boxad-wrapper',
        'div#WikiaAdInContentPlaceHolder',
        'div.bottom-ads-container',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 3000);
    })();
});
