// ==UserScript==
// @name         Neopets Reminders
// @namespace    jvirdo
// @description  Adds daily pulldown with links and countdowns (h/t Jahn Johansen for the original version)
// @include      http://*.neopets.com/*
// @include      http://neopets.com/*
// @match        http://*.neopets.com/*
// @match        http://neopets.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version      2.0.9
// ==/UserScript==

var bootScript = function(){
    // Contains everything after the domain, e.g. /index.phtml
    var page = location.pathname + location.search;
    
    // TODO: Add support for specific time events, e.g. Snowager.
    // TODO: Add 'ignore' button to remove undone dailies from the count.
    var dailies = {
        "Top priority": { type: "divider" },
        "Collect Interest": {
            href: "/bank.phtml", type: "daily"
        },
        "Lab Ray": {
            href: "/lab.phtml", type: "daily"
        },
        "Bargain Stocks": {
            href: "/stockmarket.phtml?type=list&bargain=true", type: "daily"
        },
        "Food Club": {
            href: "/pirates/foodclub.phtml?type=bet", type: "daily"
        },
        "Battledome": {
            href: "/dome/", type: "daily"
        },
        "Training": {
            href: "/pirates/academy.phtml", type: "daily"
        },
        "Wishing Well": {
            href: "/wishing.phtml", type: "daily"
        },
        "Advent Calendar": {
            href: "/winter/adventcalendar.phtml", type: "daily"
        },

        "Primary dailies": { type: "divider" },
        "Tombola": {
            href: "/island/tombola.phtml", type: "daily"
        },
        "Fruit Machine": {
            href: "/desert/fruit/index.phtml", type: "daily"
        },
        "Forgotten Shore": {
            href: "/pirates/forgottenshore.phtml", type: "daily"
        },
        "Anchor Management": {
            href: "/pirates/anchormanagement.phtml", type: "daily"
        },
        "Deserted Tomb": {
            href: "/worlds/geraptiku/tomb.phtml", type: "daily"
        },
        "TDMBGPOP": {
            href: "/faerieland/tdmbgpop.phtml", type: "daily"
        },
        "Coltzan's Shrine": {
            href: "/desert/shrine.phtml", type: "interval",
            delay: 60 * 60 * 12
        },
        "Faerie Caverns": {
            href: "/faerieland/caverns/index.phtml", type: "daily"
        },
        "Qasalan Expellibox": {
            href: "/mall/shop.phtml?page=giveaway", type: "interval",
            delay: 60 * 60 * 8
        },
        "Snowager": {
            href: "/winter/snowager.phtml", type: "daily"
        },

        "Secondary dailies": { type: "divider" },
        "Giant Omelette": {
            href: "/prehistoric/omelette.phtml", type: "daily"
        },
        "Giant Jelly": {
            href: "/jelly/jelly.phtml", type: "daily"
        },
        "Wheel of Knowledge": {
            href: "/medieval/knowledge.phtml", type: "daily"
        },
        "Wheel of Excitement": {
            href: "/faerieland/wheel.phtml", type: "interval",
            delay: 60 * 60 * 2
        },
        "Wheel of Mediocrity": {
            href: "/prehistoric/mediocrity.phtml", type: "interval",
            delay: 60 * 40
        },
        "Scratchcard Kiosk": {
            href: "/desert/sc/kiosk.phtml", type: "interval",
            delay: 60 * 60 * 4
        },
        "Healing Springs": {
            href: "/faerieland/springs.phtml", type: "interval",
            delay : 60 * 30
        },
        "Peptet Lab Ray": {
            href: "/petpetlab.phtml", type: "daily"
        },

        "Shitty dailies": { type: "divider" },
        "Kiko Pop": {
            href: "/worlds/kiko/kpop/", type: "daily"
        },
        "Grave Danger": {
            // TODO: Scrape remaining time and update appropriately.
            href: "/halloween/gravedanger/", type: "daily"
        },
        "Apple Bobbing": {
            href: "/halloween/applebobbing.phtml", type: "daily"
        },
        "Weltrude's Toy Chest": {
            href: "/petpetpark/daily.phtml", type: "daily"
        },
        "Meteor Crash Site 725-XZ": {
            href: "/moon/meteor.phtml", type: "daily"
        },
        "Ye Olde Fishing Vortex": {
            href: "/water/fishing.phtml", type: "daily"
        },
        "Mysterious Symol Hole": {
            href: "/medieval/symolhole.phtml", type: "daily"
        },
        "Rich Slorg": {
            href: "/shop_of_offers.phtml?slorg_payout=yes", type: "daily"
        },
        "Mystery Island Mystic": {
            href: "/island/mystichut.phtml", type: "daily"
        },
        "Haiku": {
            href: "/island/haiku/haiku.phtml", type: "daily"
        },
        "Money Tree": {
            href: "/donations.phtml", type: "daily"
        },

        "Effort required dailies": { type: "divider" },
        "Employment Agency (Basic)": {
            href: "/faerieland/employ/employment.phtml?type=jobs&voucher=basic",
            type: "daily"
        },
        "Negg Cave": {
            href: "/shenkuu/neggcave/", type: "daily"
        },
        "Daily Puzzle": {
            href: "/community/", type: "daily"
        },
        "Grumpy King": {
            href: "/medieval/grumpyking.phtml", type: "daily"
        },
        "Wise Old King": {
            href: "/medieval/wiseking.phtml", type: "daily"
        },
        "Faerie Crossword": {
            href: "/games/crossword/index.phtml", type: "daily"
        },
        "Lunar Temple": {
            href: "/shenkuu/lunar/", type: "daily"
        },

        "Specific time dailies": { type: "divider" },
        // TODO: Detect NST and enable when available.
        // Snowager hibernating during December.
//        "Snowager": {
//            href: "/winter/snowager.phtml", type: "custom",
//            custom: "6-7am, 2-3pm, 10-11pm"
//        },
        "Deadly Dice": {
            href: "/worlds/deadlydice.phtml", type: "custom",
            custom: "12-1am"
        },
        "Turmaculus": {
            href: "/medieval/turmaculus.phtml", type: "custom",
            custom: "Varies"
        },
        "Tarla": {
            href: "/freebies/tarlastoolbar.phtml", type: "custom",
            custom: "Varies"
        },
        "Monthly Freebies": {
            href: "/freebies/", type: "custom",
            custom: ""
        }
    };
    
    // Good luck finding us, bitches! Temporary variables are temporary. B)
    $ = undefined;
    var jQ = jQuery;
    var $ = jQ;
    jQuery = undefined;
    
    /*!
     * jQuery Cookie Plugin v1.3
     * https://github.com/carhartl/jquery-cookie
    */
    (function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g;var o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a);if(u===null){a.expires=-1}if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}u=o.json?JSON.stringify(u):String(u);return t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s;var h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==null){e.cookie(t,null,n);return true}return false}})(jQ,document);
    
    // If GreaseMonkey's functions are not present, use some fallbacks
    if (typeof(GM_getValue) === "undefined") {
        // First fallback : Opera's scriptStorage object.
        if (typeof(window.opera.scriptStorage) !== "undefined") {
            GM_getValue = function(key, value){
                var result = window.opera.scriptStorage[key];
                return result == undefined ? value : result;
            };
            GM_setValue = function(key, value){
                window.opera.scriptStorage[key] = value;
            };
        // Second fallback : Cookies - made to look like a tracking cookie.
        // Viacom will never know. >:)
        } else {
            var data = $.cookie("track");
            data = data == undefined ? {} : JSON.parse(data);
            GM_getValue = function(key, value){
                var result = data[key];
                return typeof(result) === "undefined" ? value : result;
            };
            GM_setValue = function(key, value){
                data[key] = value;
                $.cookie("track", JSON.stringify(data), { domain : ".neopets.com", expires : 7 });
            };
        }
    }

    function pad_zeros(num, len) {
        var str = num + "";
        while (str.length < len) str = "0" + str;
        return str;
    }
    
    // Handles NST (equivalent to PST).
    var NST = (function() {
        var tnst = {};
        // Gets current time in NST.
        tnst.now = function() {
            var unix = Math.floor(new Date().getTime() / 1000);
            var nst = unix + (60 * 60 * 16); // XXX: Doesn't handle DST?
            return nst;
        };
        // Formats the given timestamp into text for the pulldown menu.
        tnst.format = function(timestamp) {
            if (timestamp <= 0) return "Open!";
            var hours = pad_zeros(Math.floor(timestamp / 60 / 60), 2),
                min = pad_zeros(Math.floor(timestamp / 60 % 60), 2),
                sec = pad_zeros(timestamp % 60, 2);
            return hours + ":" + min + ":" + sec;
        }
        tnst.day = function(){
            return Math.floor(tnst.now() / (60 * 60 * 24));
        }
        return tnst;
    })();
    

    // Make sure data persists between page loads.
    var username, getLastTime, setLastTime;

    getLastTime = function(id) {
        var value = GM_getValue(username + "#" + id,
                                "{ \"time\" : -1 , \"day\" : -1 }");
        return JSON.parse(value);
    };

    setLastTime = function(id) {
        var value = JSON.stringify({
            time : NST.now(),
            day : NST.day()
        });
        GM_setValue(username + "#" + id, value);
    };
    
    var undoneDailies = 0;
    function initializeDailies(user){
        for (var name in dailies) {
            var daily = dailies[name];
            var lastTime = getLastTime(name);

            // Figure out how long to wait from our last visit.
            var wait;
            if (daily.type == "daily") {
                wait = ((lastTime.day + 1) * 24 * 60 * 60) - NST.now();
            } else if (daily.type == "interval") {
                wait = daily.delay - (NST.now() - lastTime.time);
            } else if (daily.type == "divider" || daily.type == "custom") {
                continue;
            }
            dailies[name].timeLeft = wait;
            
            // Figure out if we've already waited that long.
            if (wait <= 0 || lastTime.time == -1) {
                dailies[name].canDo = true;
                undoneDailies++;
            } else {
                dailies[name].canDo = false;
            }

            // Check if we're currently doing this daily.
            if (page == daily.href && dailies[name].canDo) {
                setLastTime(name);
                undoneDailies--;
                dailies[name].canDo = false;
            }
            dailies[name].href = "http://www.neopets.com" + dailies[name].href;
        }
    }
    
    var GUI = (function(){
        var gui = {};
        gui.header = $("#header table td.user.medText");
        gui.isLoggedIn = function(){
            return gui.header.html().indexOf("userlookup.phtml?user=") != -1;
        };
        gui.headerMod = function(){
            var parts = gui.header.html().split("|"),
                logout = parts[parts.length - 1];
            if(gui.isLoggedIn()){
                username = gui.header.find("a[href^=\"userlookup\"]").text();
                parts.push(" <b>Dailies: <a href=\"#\" class=\"showdailies\">"
                           + undoneDailies + "</a></b> ");
                parts[parts.length - 2] = parts[parts.length - 1];
                parts[parts.length - 1] = logout;
                gui.header.html(parts.join("|"));
                var dailyWindow = $("<div />"),
                    link = $(".showdailies");
                
                dailyWindow.css({
                    "background-color": "white",
                    "border": "2px solid black",
                    "border-radius": "8px",
                    "box-shadow": "0 4px 4px #000",
                    "padding": "8px",
                    "position": "absolute",
                    "width": "250px",
                    "left": link.offset().left - 120,
                    "top": link.offset().top + link.height(),
                    "z-index": "9999"
                });
                dailyWindow.hide().appendTo($("body"));
                if (undoneDailies > 0) {
                    link.css("text-shadow", "0px 0px 5px rgba(0, 255, 0, 1)");
                }
                link.html(undoneDailies.length);
                

                // TODO: Clean this up... Remnant of the original code.
                var firstLine = true;
                for (var name in dailies) {
                    var daily = dailies[name];
                    var dailyEntry = $("<div />");
                    if (daily.type == "divider") {
                        if (firstLine) {
                            dailyEntry
                                .append($("<span />").css("float", "center").html(name))
                                .append("<br />");
                            firstLine = false;
                        } else {
                            dailyEntry
                                .append("<br />")
                                .append($("<span />").css("float", "center").html(name))
                                .append("<br />");
                        }
                    } else if (daily.type == "custom") {
                        dailyEntry
                            .append($("<span />").css("float", "left")
                                    .append($("<a />").html(name).attr("href", daily.href)))
                            .append($("<span />").css("float", "right").html(daily.custom))
                            .append("<br />");
                    } else {
                        dailyEntry
                            .append($("<span />").css("float", "left")
                                    .append($("<a />").html(name).attr("href", daily.href)))
                            .append($("<span />").css("float", "right").html(NST.format(daily.timeLeft)))
                            .append("<br />");
                    }
                    dailyWindow.append(dailyEntry);
                }
                
                link.click(function(){
                    dailyWindow.slideToggle();
                });
            }
        };
        return gui;
    })();
    
    // Load!
    $(document).ready(function() {
        initializeDailies();
        GUI.headerMod();
    });
};

if (typeof(window.jQuery) === "undefined") {
    var head = document.getElementsByTagName("head")[0],
        script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js";
    head.appendChild(script);
    window.addEventListener("load", function(e){ bootScript(); });
} else {
    bootScript();
}

