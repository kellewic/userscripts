// ==UserScript==
// @name         Epoch Tools Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lastepochtools.com
// @author       kellewic
// @version      20230617
// @description  Get rid of low value page content

// @match        *://www.lastepochtools.com/*

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

    var elements = [
        'div#ad',
        'div#planner-left-big',
        'div#planner-top-logo',
        'div#planner-right-big',
        'div#lebv',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        setTimeout(changePage, 2000);
    })();
});
