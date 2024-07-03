// ==UserScript==
// @name         Word Hippo Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=wordhippo.com
// @author       kellewic
// @version      20240703
// @description  Get rid of low value stuff on Word Hippo
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @match      *://www.wordhippo.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        '#inneradcell',
        '#sgwDesktopBottomDiv'
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 3000);
    })();
});