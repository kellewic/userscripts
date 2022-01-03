// ==UserScript==
// @name         eBay Adjuster
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?domain=ebay.com
// @author       kellewic
// @version      20200430
// @description  Make eBay more tolerable
//
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
//
// @nocompat     Chrome
// @noframes
// @run-at       document-start
//
// @include      *://*ebay.com*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdn.jsdelivr.net/combine/npm/crypto-js@4.0.0/core.min.js,npm/crypto-js@4.0.0/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/underscore@1.13.1/underscore-umd.min.js
// ==/UserScript==
/* globals jQuery, CryptoJS, _ */

////////////////////////////////////////
const set_worldwide_search = true;
const keep_data_days = 120;
const storage_name = "visitedLinks";

const debug = false;
////////////////////////////////////////

jQuery.noConflict();

// Convert keep_data_days to seconds
var keep_data_secs = keep_data_days * 86400;
var currentUrl = window.location.href;
var storage;

_.each(GM_listValues(), function(e) {
    //GM_deleteValue(e);
});

if (/\/sch\//.test(currentUrl) && ! /_ipg=200/.test(currentUrl)) {
    currentUrl = currentUrl + "&_ipg=200";
    window.location.replace(currentUrl);
}

// Set Worldwide as a default search setting
if (set_worldwide_search === true) {
    if (/\/sch\//.test(currentUrl) && ! /LH_PrefLoc=2/.test(currentUrl)) {
        currentUrl = currentUrl + "&LH_PrefLoc=2";
        window.location.replace(currentUrl);
    }
}

// Get storage as an object
function getStorageObject() {
    storage = GM_getValue(storage_name) || {};

    if (! _.isObject(storage)) {
        storage = JSON.parse(storage);
    }

    return storage;
}

// Save storage object to local storage
function saveStorageObject(storage) {
    GM_setValue(storage_name, JSON.stringify(storage));
}

// Get now() as 10 digits
function getNow() {
    return Math.round(Date.now()/1000);
}

// Check storage values against how long to keep them; discard old entries
(function(){
    storage = _.pick(getStorageObject(), function(val, key, obj) {
        return (getNow() - val) < keep_data_secs
    });

    saveStorageObject(storage);

    if (debug === true) {
        console.log(storage);
    }
})();

// Create MD5 of item title string
function getMD5Title(item_title) {
    return "" + CryptoJS.MD5(item_title);
}

function getItemKey(item_id, item_title) {
    return item_id + ":" + getMD5Title(item_title);
}

// Save item_id => item_title_md5 in local storage
function saveVisitedLink(item_id, item_title) {
    storage = getStorageObject();
    var item_key = getItemKey(item_id, item_title);

    storage[item_key] = getNow();
    saveStorageObject(storage);

    if (debug === true) {
        console.log(storage);
    }
}

// Get item ID
function getItemId(obj) {
    return obj.attr('href').replace(/^http.*?\/itm\/(\d+).*$/, '$1');
}

// Get item title
function getItemTitle(obj) {
    return obj.html().replace(/<\w+.*?<\/\w+>\s*/g, '').replace(/\s+$/, '');
}


jQuery(document).ready(function($) {
    'use strict';

    // Remove huge carasoul at top of page
    $('div#rtm_list1').remove();
    // Remove ad below carasoul
    $('div.hl-leaderboard-ad').remove();

    // Remove ad on item detail pages
    $('div[title="ADVERTISEMENT"]').remove();


    // Hook up a click event to the search result set links so we can catch
    // when we click on them and add IDs to the pool.
    $('ul.srp-results').on('click.ebay_result_link', 'a.s-item__link', function(e){
        var obj = $(this);
        var title_obj = obj.children('h3.s-item__title');

        saveVisitedLink(getItemId(obj), getItemTitle(title_obj));

        if (debug === true) {
            console.log(getItemId(obj) + " => " + getItemTitle(title_obj) + " ~~");
            e.preventDefault();
        }
    });

    $('ul#ListViewInner').on('click.ebay_list_view_inner', 'a.vip', function(e){
        var obj = $(this);

        saveVisitedLink(getItemId(obj), getItemTitle(obj));

        if (debug === true) {
            console.log(getItemId(obj) + " => " + getItemTitle(obj) + " ~~");
            e.preventDefault();
        }
    });


    // Check all the result links against the pool to see if we've visited them
    $('ul.srp-results a.s-item__link, ul#ListViewInner a.vip').each(function(){
        var obj = $(this);
        var title_obj = obj;

        if (obj.hasClass('s-item__link')) {
            title_obj = obj.children('h3.s-item__title');
        }

        var item_key = getItemKey(getItemId(obj), getItemTitle(title_obj));

        if (_.get(storage, item_key, false)) {
            obj.css({
                "padding": "5px 5px 0 5px",
                "border": "2px solid #2D6A4F",
                "background-color": "#D8F3DC",
                "display": "inline-block"
            });

            if (obj.attr('id') == "ListViewInner") {
                obj.css("padding", "5px");
            }

            obj.children('h3.s-item__title').css("margin-bottom","0");
        }
    });
});