// ==UserScript==
// @name         Mint Cleaner
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=mint.intuit.com
// @author       kellewic
// @version      20210305
// @description  Get rid of low value stuff
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*mint.intuit.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery */
jQuery.noConflict();

jQuery(document).ready(function($) {
    'use strict';

    var elements = [
        'div.HostedCarouselWidget__CarouselCard-sc-1aea2j8-0',
        'tr[class*="TransactionsOfferstyle__TransactionsInlineOfferTableRow"]',
        'div[class*="TransactionsOfferstyle__TransactionsBannerOfferWrapper"]',
    ];

    (function changePage(){
        $.each(elements, function(idx, val){
            $(val).remove();
        });

        // There's some dynamic stuff that will keep re-appearing so just run every few seconds
        setTimeout(changePage, 2000);
    })();
});
