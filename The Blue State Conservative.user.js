// ==UserScript==
// @name         The Blue State Conservative
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=thebluestateconservative.com
// @author       kellewic
// @version      20210822
// @description  Get rid of low value stuff on Nextdoor
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*thebluestateconservative.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */

jQuery.noConflict();


jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div#multipane-container',
        'div.ads_container',
        'div.inf-onclickvideo-container',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        setTimeout(changePage, 100);
    })();
});