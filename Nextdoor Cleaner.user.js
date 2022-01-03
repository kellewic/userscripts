// ==UserScript==
// @name         Nextdoor Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=nextdoor.com
// @author       kellewic
// @version      20210822
// @description  Get rid of low value stuff on Nextdoor
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*nextdoor.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */

jQuery.noConflict();


jQuery(document).ready(function($) {
    'use strict';

    (function changePage(){
        $('div div.gam-ad-outer-container').each(function(){
            $(this).remove();
        });

        $('div div.real-estate-newsfeed-content-container').each(function(){
            $(this).remove();
        });

        setTimeout(changePage, 1000);
    })();
});

