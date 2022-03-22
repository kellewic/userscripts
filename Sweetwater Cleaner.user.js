// ==UserScript==
// @name         Sweetwater Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=sweetwater.com
// @author       kellewic
// @version      20220322
// @description  Get rid of low value stuff
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*sweetwater.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div.candy--card',
        'div.site-contact--verbose',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 2000);
    })();
});
