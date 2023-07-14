// ==UserScript==
// @name         Classic Wowhead
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wowhead.com
// @author       kellewic
// @version      20230714
// @description  Get rid of low value stuff on Wowhead

// @match        *://www.wowhead.com/*

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
        'div#main div.blocks',
        'div.sidebar-wrapper',
        'div#video-pos-fixed',
        'div#aplify-ad',
        'div.zaf-unit-wrapper',
        'div#ad-skin',
        'div#vid-pos-body',
        'div#video-pos-body',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        setTimeout(changePage, 2000);
    })();
});
