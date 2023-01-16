// ==UserScript==
// @name         NexusMods Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=nexusmods.com
// @author       kellewic
// @version      20230116
// @description  Get rid of low value stuff on Daily Wire
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*nexusmods.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'section.section.bg-background-secondary',
        'div[data-adunit-name]',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 3000);
    })();
});
