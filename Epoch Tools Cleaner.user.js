// ==UserScript==
// @name         Epoch Tools Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lastepochtools.com
// @author       kellewic
// @version      20230714
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

    let pages = ['planner', 'guide', 'minions', 'ailments', 'item-db', 'skills', 'checklist', 'ladders', 'main', 'news', 'monolith', 'endgame', 'build-guides'];
    let sections = ['left-big', 'right-big', 'top-logo', 'top-logo-big'];
    let elements = ['div#ad', 'div#lebv'];

    $.each(pages, function(page_idx, page_val){
       $.each(sections, function(section_idx, section_val){
           var temp = 'div#' + page_val + '-' + section_val;
           elements.push(temp);
       });
    });

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        setTimeout(changePage, 2000);
    })();
});
