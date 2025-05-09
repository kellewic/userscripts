// ==UserScript==
// @name         Grim Tools Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=grimtools.com
// @author       kellewic
// @version      20250508
// @description  Get rid of low value stuff
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @match      *://www.grimtools.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        "div.col-left",
        "div.col-left-big",
        "div.col-right",
        "div.col-right-big",
        "div#nitro-float-close",
        "div.na-float-visible",
        "div.col-top-logo"
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

       // $('div.fluid-width-video-wrapper').parent().remove();

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 3000);
    })();
});
