'use strict';

document.addEventListener('DOMContentLoaded', function () {

    accordion.init();
    detectExperienceEditor.init();
    storeLocationsList.init();
    ecommerce.init();
    promosCarousel.init();
    packagingOffers.init();
    pageListCarousel.init();
    menuToggle.init();
    subMenus.init();
    contentImageGallery.init();
    storeMap.init();
    stickyStoreCta.init();
    storeImageGallery.init();
    googleMap.init();
    sizeSelector.init();
    validateForm.init();
    purchaseStorageDetails.init();
    tabSwitcher.init();
    modifyQuote.init();
    expandingRta.init();
    editDetails.init();
    reserveEditDetailsSwitcher.init();
    paymentDetailsForm.init();
    searchHeroBanner.init();
    processForms.init();
    expandingStoreList.init();
    
});
"use strict";

function inherits(childCtor, parentCtor) {
    function tempCtor() {}
    tempCtor.prototype = parentCtor.prototype;childCtor.superClass_ = parentCtor.prototype;childCtor.prototype = new tempCtor();childCtor.prototype.constructor = childCtor;
}
function MarkerLabel_(marker, crossURL, handCursorURL) {
    this.marker_ = marker;this.handCursorURL_ = marker.handCursorURL;this.labelDiv_ = document.createElement("div");this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";this.eventDiv_ = document.createElement("div");this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;this.eventDiv_.setAttribute("onselectstart", "return false;");this.eventDiv_.setAttribute("ondragstart", "return false;");this.crossDiv_ = MarkerLabel_.getSharedCross(crossURL);
}
inherits(MarkerLabel_, google.maps.OverlayView);MarkerLabel_.getSharedCross = function (crossURL) {
    var div;if (typeof MarkerLabel_.getSharedCross.crossDiv === "undefined") {
        div = document.createElement("img");div.style.cssText = "position: absolute; z-index: 1000002; display: none;";div.style.marginLeft = "-8px";div.style.marginTop = "-9px";div.src = crossURL;MarkerLabel_.getSharedCross.crossDiv = div;
    }
    return MarkerLabel_.getSharedCross.crossDiv;
};MarkerLabel_.prototype.onAdd = function () {
    var me = this;var cMouseIsDown = !1;var cDraggingLabel = !1;var cSavedZIndex;var cLatOffset, cLngOffset;var cIgnoreClick;var cRaiseEnabled;var cStartPosition;var cStartCenter;var cRaiseOffset = 20;var cDraggingCursor = "url(" + this.handCursorURL_ + ")";var cAbortEvent = function cAbortEvent(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.cancelBubble = !0;if (e.stopPropagation) {
            e.stopPropagation();
        }
    };var cStopBounce = function cStopBounce() {
        me.marker_.setAnimation(null);
    };this.getPanes().overlayImage.appendChild(this.labelDiv_);this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);if (typeof MarkerLabel_.getSharedCross.processed === "undefined") {
        this.getPanes().overlayImage.appendChild(this.crossDiv_);MarkerLabel_.getSharedCross.processed = !0;
    }
    this.listeners_ = [google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (e) {
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            this.style.cursor = "pointer";google.maps.event.trigger(me.marker_, "mouseover", e);
        }
    }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (e) {
        if ((me.marker_.getDraggable() || me.marker_.getClickable()) && !cDraggingLabel) {
            this.style.cursor = me.marker_.getCursor();google.maps.event.trigger(me.marker_, "mouseout", e);
        }
    }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (e) {
        cDraggingLabel = !1;if (me.marker_.getDraggable()) {
            cMouseIsDown = !0;this.style.cursor = cDraggingCursor;
        }
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            google.maps.event.trigger(me.marker_, "mousedown", e);cAbortEvent(e);
        }
    }), google.maps.event.addDomListener(document, "mouseup", function (mEvent) {
        var position;if (cMouseIsDown) {
            cMouseIsDown = !1;me.eventDiv_.style.cursor = "pointer";google.maps.event.trigger(me.marker_, "mouseup", mEvent);
        }
        if (cDraggingLabel) {
            if (cRaiseEnabled) {
                position = me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition());position.y += cRaiseOffset;me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));try {
                    me.marker_.setAnimation(google.maps.Animation.BOUNCE);setTimeout(cStopBounce, 1406);
                } catch (e) {}
            }
            me.crossDiv_.style.display = "none";me.marker_.setZIndex(cSavedZIndex);cIgnoreClick = !0;cDraggingLabel = !1;mEvent.latLng = me.marker_.getPosition();google.maps.event.trigger(me.marker_, "dragend", mEvent);
        }
    }), google.maps.event.addListener(me.marker_.getMap(), "mousemove", function (mEvent) {
        var position;if (cMouseIsDown) {
            if (cDraggingLabel) {
                mEvent.latLng = new google.maps.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset);position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng);if (cRaiseEnabled) {
                    me.crossDiv_.style.left = position.x + "px";me.crossDiv_.style.top = position.y + "px";me.crossDiv_.style.display = "";position.y -= cRaiseOffset;
                }
                me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));if (cRaiseEnabled) {
                    me.eventDiv_.style.top = position.y + cRaiseOffset + "px";
                }
                google.maps.event.trigger(me.marker_, "drag", mEvent);
            } else {
                cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat();cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng();cSavedZIndex = me.marker_.getZIndex();cStartPosition = me.marker_.getPosition();cStartCenter = me.marker_.getMap().getCenter();cRaiseEnabled = me.marker_.get("raiseOnDrag");cDraggingLabel = !0;me.marker_.setZIndex(1000000);mEvent.latLng = me.marker_.getPosition();google.maps.event.trigger(me.marker_, "dragstart", mEvent);
            }
        }
    }), google.maps.event.addDomListener(document, "keydown", function (e) {
        if (cDraggingLabel) {
            if (e.keyCode === 27) {
                cRaiseEnabled = !1;me.marker_.setPosition(cStartPosition);me.marker_.getMap().setCenter(cStartCenter);google.maps.event.trigger(document, "mouseup", e);
            }
        }
    }), google.maps.event.addDomListener(this.eventDiv_, "click", function (e) {
        debugger;
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            debugger;
            if (cIgnoreClick) {
                cIgnoreClick = !1;
            } else {
                google.maps.event.trigger(me.marker_, "dblclick", e);cAbortEvent(e);
            }
        }
    }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (e) {
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            google.maps.event.trigger(me.marker_, "dblclick", e);cAbortEvent(e);
        }
    }), google.maps.event.addListener(this.marker_, "dragstart", function (mEvent) {
        if (!cDraggingLabel) {
            cRaiseEnabled = this.get("raiseOnDrag");
        }
    }), google.maps.event.addListener(this.marker_, "drag", function (mEvent) {
        if (!cDraggingLabel) {
            if (cRaiseEnabled) {
                me.setPosition(cRaiseOffset);me.labelDiv_.style.zIndex = 1000000 + (this.get("labelInBackground") ? -1 : +1);
            }
        }
    }), google.maps.event.addListener(this.marker_, "dragend", function (mEvent) {
        if (!cDraggingLabel) {
            if (cRaiseEnabled) {
                me.setPosition(0);
            }
        }
    }), google.maps.event.addListener(this.marker_, "position_changed", function () {
        me.setPosition();
    }), google.maps.event.addListener(this.marker_, "zindex_changed", function () {
        me.setZIndex();
    }), google.maps.event.addListener(this.marker_, "visible_changed", function () {
        me.setVisible();
    }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
        me.setVisible();
    }), google.maps.event.addListener(this.marker_, "title_changed", function () {
        me.setTitle();
    }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
        me.setContent();
    }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
        me.setAnchor();
    }), google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
        me.setStyles();
    }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
        me.setStyles();
    })];
};MarkerLabel_.prototype.onRemove = function () {
    var i;this.labelDiv_.parentNode.removeChild(this.labelDiv_);this.eventDiv_.parentNode.removeChild(this.eventDiv_);for (i = 0; i < this.listeners_.length; i++) {
        google.maps.event.removeListener(this.listeners_[i]);
    }
};MarkerLabel_.prototype.draw = function () {
    this.setContent();this.setTitle();this.setStyles();
};MarkerLabel_.prototype.setContent = function () {
    var content = this.marker_.get("labelContent");if (typeof content.nodeType === "undefined") {
        this.labelDiv_.innerHTML = content;this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
    } else {
        this.labelDiv_.innerHTML = "";this.labelDiv_.appendChild(content);content = content.cloneNode(!0);this.eventDiv_.innerHTML = "";this.eventDiv_.appendChild(content);
    }
};MarkerLabel_.prototype.setTitle = function () {
    this.eventDiv_.title = this.marker_.getTitle() || "";
};MarkerLabel_.prototype.setStyles = function () {
    var i, labelStyle;this.labelDiv_.className = this.marker_.get("labelClass");this.eventDiv_.className = this.labelDiv_.className;this.labelDiv_.style.cssText = "";this.eventDiv_.style.cssText = "";labelStyle = this.marker_.get("labelStyle");for (i in labelStyle) {
        if (labelStyle.hasOwnProperty(i)) {
            this.labelDiv_.style[i] = labelStyle[i];this.eventDiv_.style[i] = labelStyle[i];
        }
    }
    this.setMandatoryStyles();
};MarkerLabel_.prototype.setMandatoryStyles = function () {
    this.labelDiv_.style.position = "absolute";this.labelDiv_.style.overflow = "hidden";if (typeof this.labelDiv_.style.opacity !== "undefined" && this.labelDiv_.style.opacity !== "") {
        this.labelDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.labelDiv_.style.opacity * 100 + ")\"";this.labelDiv_.style.filter = "alpha(opacity=" + this.labelDiv_.style.opacity * 100 + ")";
    }
    this.eventDiv_.style.position = this.labelDiv_.style.position;this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;this.eventDiv_.style.opacity = 0.01;this.eventDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=1)\"";this.eventDiv_.style.filter = "alpha(opacity=1)";this.setAnchor();this.setPosition();this.setVisible();
};MarkerLabel_.prototype.setAnchor = function () {
    var anchor = this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft = -anchor.x + "px";this.labelDiv_.style.marginTop = -anchor.y + "px";this.eventDiv_.style.marginLeft = -anchor.x + "px";this.eventDiv_.style.marginTop = -anchor.y + "px";
};MarkerLabel_.prototype.setPosition = function (yOffset) {
    var position = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());if (typeof yOffset === "undefined") {
        yOffset = 0;
    }
    this.labelDiv_.style.left = Math.round(position.x) + "px";this.labelDiv_.style.top = Math.round(position.y - yOffset) + "px";this.eventDiv_.style.left = this.labelDiv_.style.left;this.eventDiv_.style.top = this.labelDiv_.style.top;this.setZIndex();
};MarkerLabel_.prototype.setZIndex = function () {
    var zAdjust = this.marker_.get("labelInBackground") ? -1 : +1;if (typeof this.marker_.getZIndex() === "undefined") {
        this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust;this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
    } else {
        this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust;this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
    }
};MarkerLabel_.prototype.setVisible = function () {
    if (this.marker_.get("labelVisible")) {
        this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none";
    } else {
        this.labelDiv_.style.display = "none";
    }
    this.eventDiv_.style.display = this.labelDiv_.style.display;
};function MarkerWithLabel(opt_options) {
    opt_options = opt_options || {};opt_options.labelContent = opt_options.labelContent || "";opt_options.labelAnchor = opt_options.labelAnchor || new google.maps.Point(0, 0);opt_options.labelClass = opt_options.labelClass || "markerLabels";opt_options.labelStyle = opt_options.labelStyle || {};opt_options.labelInBackground = opt_options.labelInBackground || !1;if (typeof opt_options.labelVisible === "undefined") {
        opt_options.labelVisible = !0;
    }
    if (typeof opt_options.raiseOnDrag === "undefined") {
        opt_options.raiseOnDrag = !0;
    }
    if (typeof opt_options.clickable === "undefined") {
        opt_options.clickable = !0;
    }
    if (typeof opt_options.draggable === "undefined") {
        opt_options.draggable = !1;
    }
    if (typeof opt_options.optimized === "undefined") {
        opt_options.optimized = !1;
    }
    opt_options.crossImage = opt_options.crossImage || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";opt_options.handCursor = opt_options.handCursor || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";opt_options.optimized = !1;this.label = new MarkerLabel_(this, opt_options.crossImage, opt_options.handCursor);google.maps.Marker.apply(this, arguments);
}
inherits(MarkerWithLabel, google.maps.Marker);MarkerWithLabel.prototype.setMap = function (theMap) {
    google.maps.Marker.prototype.setMap.apply(this, arguments);this.label.setMap(theMap);
};
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable */
var tns = function () {
  var t = window,
      Oi = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || function (t) {
    return setTimeout(t, 16);
  },
      e = window,
      Di = e.cancelAnimationFrame || e.mozCancelAnimationFrame || function (t) {
    clearTimeout(t);
  };function Hi() {
    for (var t, e, n, i = arguments[0] || {}, a = 1, r = arguments.length; a < r; a++) {
      if (null !== (t = arguments[a])) for (e in t) {
        i !== (n = t[e]) && void 0 !== n && (i[e] = n);
      }
    }return i;
  }function ki(t) {
    return 0 <= ["true", "false"].indexOf(t) ? JSON.parse(t) : t;
  }function Ri(t, e, n, i) {
    if (i) try {
      t.setItem(e, n);
    } catch (t) {}return n;
  }function Ii() {
    var t = document,
        e = t.body;return e || ((e = t.createElement("body")).fake = !0), e;
  }var n = document.documentElement;function Pi(t) {
    var e = "";return t.fake && (e = n.style.overflow, t.style.background = "", t.style.overflow = n.style.overflow = "hidden", n.appendChild(t)), e;
  }function zi(t, e) {
    t.fake && (t.remove(), n.style.overflow = e, n.offsetHeight);
  }function Wi(t, e, n, i) {
    "insertRule" in t ? t.insertRule(e + "{" + n + "}", i) : t.addRule(e, n, i);
  }function Fi(t) {
    return ("insertRule" in t ? t.cssRules : t.rules).length;
  }function qi(t, e, n) {
    for (var i = 0, a = t.length; i < a; i++) {
      e.call(n, t[i], i);
    }
  }var i = "classList" in document.createElement("_"),
      ji = i ? function (t, e) {
    return t.classList.contains(e);
  } : function (t, e) {
    return 0 <= t.className.indexOf(e);
  },
      Vi = i ? function (t, e) {
    ji(t, e) || t.classList.add(e);
  } : function (t, e) {
    ji(t, e) || (t.className += " " + e);
  },
      Gi = i ? function (t, e) {
    ji(t, e) && t.classList.remove(e);
  } : function (t, e) {
    ji(t, e) && (t.className = t.className.replace(e, ""));
  };function Qi(t, e) {
    return t.hasAttribute(e);
  }function Xi(t, e) {
    return t.getAttribute(e);
  }function r(t) {
    return void 0 !== t.item;
  }function Yi(t, e) {
    if (t = r(t) || t instanceof Array ? t : [t], "[object Object]" === Object.prototype.toString.call(e)) for (var n = t.length; n--;) {
      for (var i in e) {
        t[n].setAttribute(i, e[i]);
      }
    }
  }function Ki(t, e) {
    t = r(t) || t instanceof Array ? t : [t];for (var n = (e = e instanceof Array ? e : [e]).length, i = t.length; i--;) {
      for (var a = n; a--;) {
        t[i].removeAttribute(e[a]);
      }
    }
  }function Ji(t) {
    for (var e = [], n = 0, i = t.length; n < i; n++) {
      e.push(t[n]);
    }return e;
  }function Ui(t, e) {
    "none" !== t.style.display && (t.style.display = "none");
  }function _i(t, e) {
    "none" === t.style.display && (t.style.display = "");
  }function Zi(t) {
    return "none" !== window.getComputedStyle(t).display;
  }function $i(e) {
    if ("string" == typeof e) {
      var n = [e],
          i = e.charAt(0).toUpperCase() + e.substr(1);["Webkit", "Moz", "ms", "O"].forEach(function (t) {
        "ms" === t && "transform" !== e || n.push(t + i);
      }), e = n;
    }for (var t = document.createElement("fakeelement"), a = (e.length, 0); a < e.length; a++) {
      var r = e[a];if (void 0 !== t.style[r]) return r;
    }return !1;
  }function ta(t, e) {
    var n = !1;return (/^Webkit/.test(t) ? n = "webkit" + e + "End" : /^O/.test(t) ? n = "o" + e + "End" : t && (n = e.toLowerCase() + "end"), n
    );
  }var a = !1;try {
    var o = Object.defineProperty({}, "passive", { get: function get() {
        a = !0;
      } });window.addEventListener("test", null, o);
  } catch (t) {}var u = !!a && { passive: !0 };function ea(t, e, n) {
    for (var i in e) {
      var a = 0 <= ["touchstart", "touchmove"].indexOf(i) && !n && u;t.addEventListener(i, e[i], a);
    }
  }function na(t, e) {
    for (var n in e) {
      var i = 0 <= ["touchstart", "touchmove"].indexOf(n) && u;t.removeEventListener(n, e[n], i);
    }
  }function ia() {
    return { topics: {}, on: function on(t, e) {
        this.topics[t] = this.topics[t] || [], this.topics[t].push(e);
      }, off: function off(t, e) {
        if (this.topics[t]) for (var n = 0; n < this.topics[t].length; n++) {
          if (this.topics[t][n] === e) {
            this.topics[t].splice(n, 1);break;
          }
        }
      }, emit: function emit(e, n) {
        n.type = e, this.topics[e] && this.topics[e].forEach(function (t) {
          t(n, e);
        });
      } };
  }Object.keys || (Object.keys = function (t) {
    var e = [];for (var n in t) {
      Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
    }return e;
  }), "remove" in Element.prototype || (Element.prototype.remove = function () {
    this.parentNode && this.parentNode.removeChild(this);
  });var aa = function aa(O) {
    O = Hi({ container: ".slider", mode: "carousel", axis: "horizontal", items: 1, gutter: 0, edgePadding: 0, fixedWidth: !1, autoWidth: !1, viewportMax: !1, slideBy: 1, center: !1, controls: !0, controlsPosition: "top", controlsText: ["prev", "next"], controlsContainer: !1, prevButton: !1, nextButton: !1, nav: !0, navPosition: "top", navContainer: !1, navAsThumbnails: !1, arrowKeys: !1, speed: 300, autoplay: !1, autoplayPosition: "top", autoplayTimeout: 5e3, autoplayDirection: "forward", autoplayText: ["start", "stop"], autoplayHoverPause: !1, autoplayButton: !1, autoplayButtonOutput: !0, autoplayResetOnVisibility: !0, animateIn: "tns-fadeIn", animateOut: "tns-fadeOut", animateNormal: "tns-normal", animateDelay: !1, loop: !0, rewind: !1, autoHeight: !1, responsive: !1, lazyload: !1, lazyloadSelector: ".tns-lazy-img", touch: !0, mouseDrag: !1, swipeAngle: 15, nested: !1, preventActionWhenRunning: !1, preventScrollOnTouch: !1, freezable: !0, onInit: !1, useLocalStorage: !0 }, O || {});var D = document,
        h = window,
        a = { ENTER: 13, SPACE: 32, LEFT: 37, RIGHT: 39 },
        e = {},
        n = O.useLocalStorage;if (n) {
      var t = navigator.userAgent,
          i = new Date();try {
        (e = h.localStorage) ? (e.setItem(i, i), n = e.getItem(i) == i, e.removeItem(i)) : n = !1, n || (e = {});
      } catch (t) {
        n = !1;
      }n && (e.tnsApp && e.tnsApp !== t && ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function (t) {
        e.removeItem(t);
      }), localStorage.tnsApp = t);
    }var r,
        o,
        u,
        l,
        s,
        c,
        f,
        y = e.tC ? ki(e.tC) : Ri(e, "tC", function () {
      var t = document,
          e = Ii(),
          n = Pi(e),
          i = t.createElement("div"),
          a = !1;e.appendChild(i);try {
        for (var r, o = "(10px * 10)", u = ["calc" + o, "-moz-calc" + o, "-webkit-calc" + o], l = 0; l < 3; l++) {
          if (r = u[l], i.style.width = r, 100 === i.offsetWidth) {
            a = r.replace(o, "");break;
          }
        }
      } catch (t) {}return e.fake ? zi(e, n) : i.remove(), a;
    }(), n),
        g = e.tPL ? ki(e.tPL) : Ri(e, "tPL", function () {
      var t,
          e = document,
          n = Ii(),
          i = Pi(n),
          a = e.createElement("div"),
          r = e.createElement("div"),
          o = "";a.className = "tns-t-subp2", r.className = "tns-t-ct";for (var u = 0; u < 70; u++) {
        o += "<div></div>";
      }return r.innerHTML = o, a.appendChild(r), n.appendChild(a), t = Math.abs(a.getBoundingClientRect().left - r.children[67].getBoundingClientRect().left) < 2, n.fake ? zi(n, i) : a.remove(), t;
    }(), n),
        H = e.tMQ ? ki(e.tMQ) : Ri(e, "tMQ", (o = document, u = Ii(), l = Pi(u), s = o.createElement("div"), c = o.createElement("style"), f = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}", c.type = "text/css", s.className = "tns-mq-test", u.appendChild(c), u.appendChild(s), c.styleSheet ? c.styleSheet.cssText = f : c.appendChild(o.createTextNode(f)), r = window.getComputedStyle ? window.getComputedStyle(s).position : s.currentStyle.position, u.fake ? zi(u, l) : s.remove(), "absolute" === r), n),
        d = e.tTf ? ki(e.tTf) : Ri(e, "tTf", $i("transform"), n),
        v = e.t3D ? ki(e.t3D) : Ri(e, "t3D", function (t) {
      if (!t) return !1;if (!window.getComputedStyle) return !1;var e,
          n = document,
          i = Ii(),
          a = Pi(i),
          r = n.createElement("p"),
          o = 9 < t.length ? "-" + t.slice(0, -9).toLowerCase() + "-" : "";return o += "transform", i.insertBefore(r, null), r.style[t] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(r).getPropertyValue(o), i.fake ? zi(i, a) : r.remove(), void 0 !== e && 0 < e.length && "none" !== e;
    }(d), n),
        x = e.tTDu ? ki(e.tTDu) : Ri(e, "tTDu", $i("transitionDuration"), n),
        p = e.tTDe ? ki(e.tTDe) : Ri(e, "tTDe", $i("transitionDelay"), n),
        b = e.tADu ? ki(e.tADu) : Ri(e, "tADu", $i("animationDuration"), n),
        m = e.tADe ? ki(e.tADe) : Ri(e, "tADe", $i("animationDelay"), n),
        C = e.tTE ? ki(e.tTE) : Ri(e, "tTE", ta(x, "Transition"), n),
        w = e.tAE ? ki(e.tAE) : Ri(e, "tAE", ta(b, "Animation"), n),
        M = h.console && "function" == typeof h.console.warn,
        T = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"],
        E = {};if (T.forEach(function (t) {
      if ("string" == typeof O[t]) {
        var e = O[t],
            n = D.querySelector(e);if (E[t] = e, !n || !n.nodeName) return void (M && console.warn("Can't find", O[t]));O[t] = n;
      }
    }), !(O.container.children.length < 1)) {
      var k = O.responsive,
          R = O.nested,
          I = "carousel" === O.mode;if (k) {
        0 in k && (O = Hi(O, k[0]), delete k[0]);var A = {};for (var N in k) {
          var L = k[N];L = "number" == typeof L ? { items: L } : L, A[N] = L;
        }k = A, A = null;
      }if (I || function t(e) {
        for (var n in e) {
          I || ("slideBy" === n && (e[n] = "page"), "edgePadding" === n && (e[n] = !1), "autoHeight" === n && (e[n] = !1)), "responsive" === n && t(e[n]);
        }
      }(O), !I) {
        O.axis = "horizontal", O.slideBy = "page", O.edgePadding = !1;var P = O.animateIn,
            z = O.animateOut,
            B = O.animateDelay,
            W = O.animateNormal;
      }var S,
          F,
          q = "horizontal" === O.axis,
          j = D.createElement("div"),
          V = D.createElement("div"),
          G = O.container,
          Q = G.parentNode,
          X = G.outerHTML,
          Y = G.children,
          K = Y.length,
          J = sn(),
          U = !1;k && Bn(), I && (G.className += " tns-vpfix");var _,
          Z,
          $,
          tt,
          et,
          nt,
          it,
          at,
          rt = O.autoWidth,
          ot = vn("fixedWidth"),
          ut = vn("edgePadding"),
          lt = vn("gutter"),
          st = fn(),
          ct = vn("center"),
          ft = rt ? 1 : Math.floor(vn("items")),
          dt = vn("slideBy"),
          vt = O.viewportMax || O.fixedWidthViewportWidth,
          pt = vn("arrowKeys"),
          mt = vn("speed"),
          ht = O.rewind,
          yt = !ht && O.loop,
          gt = vn("autoHeight"),
          xt = vn("controls"),
          bt = vn("controlsText"),
          Ct = vn("nav"),
          wt = vn("touch"),
          Mt = vn("mouseDrag"),
          Tt = vn("autoplay"),
          Et = vn("autoplayTimeout"),
          At = vn("autoplayText"),
          Nt = vn("autoplayHoverPause"),
          Lt = vn("autoplayResetOnVisibility"),
          Bt = (at = document.createElement("style"), it && at.setAttribute("media", it), document.querySelector("head").appendChild(at), at.sheet ? at.sheet : at.styleSheet),
          St = O.lazyload,
          Ot = (O.lazyloadSelector, []),
          Dt = yt ? (et = function () {
        {
          if (rt || ot && !vt) return K - 1;var t = ot ? "fixedWidth" : "items",
              e = [];if ((ot || O[t] < K) && e.push(O[t]), k) for (var n in k) {
            var i = k[n][t];i && (ot || i < K) && e.push(i);
          }return e.length || e.push(0), Math.ceil(ot ? vt / Math.min.apply(null, e) : Math.max.apply(null, e));
        }
      }(), nt = I ? Math.ceil((5 * et - K) / 2) : 4 * et - K, nt = Math.max(et, nt), dn("edgePadding") ? nt + 1 : nt) : 0,
          Ht = I ? K + 2 * Dt : K + Dt,
          kt = !(!ot && !rt || yt),
          Rt = ot ? ni() : null,
          It = !I || !yt,
          Pt = q ? "left" : "top",
          zt = "",
          Wt = "",
          Ft = ot ? function () {
        return ct && !yt ? K - 1 : Math.ceil(-Rt / (ot + lt));
      } : rt ? function () {
        for (var t = Ht; t--;) {
          if (_[t] > -Rt) return t;
        }
      } : function () {
        return ct && I && !yt ? K - 1 : yt || I ? Math.max(0, Ht - Math.ceil(ft)) : Ht - 1;
      },
          qt = on(vn("startIndex")),
          jt = qt,
          Vt = (rn(), 0),
          Gt = rt ? null : Ft(),
          Qt = O.preventActionWhenRunning,
          Xt = O.swipeAngle,
          Yt = !Xt || "?",
          Kt = !1,
          Jt = O.onInit,
          Ut = new ia(),
          _t = " tns-slider tns-" + O.mode,
          Zt = G.id || (tt = window.tnsId, window.tnsId = tt ? tt + 1 : 1, "tns" + window.tnsId),
          $t = vn("disable"),
          te = !1,
          ee = O.freezable,
          ne = !(!ee || rt) && Ln(),
          ie = !1,
          ae = { click: fi, keydown: function keydown(t) {
          t = xi(t);var e = [a.LEFT, a.RIGHT].indexOf(t.keyCode);0 <= e && (0 === e ? Ee.disabled || fi(t, -1) : Ae.disabled || fi(t, 1));
        } },
          re = { click: function click(t) {
          if (Kt) {
            if (Qt) return;si();
          }var e = bi(t = xi(t));for (; e !== Se && !Qi(e, "data-nav");) {
            e = e.parentNode;
          }if (Qi(e, "data-nav")) {
            var n = ke = Number(Xi(e, "data-nav")),
                i = ot || rt ? n * K / De : n * ft,
                a = ve ? n : Math.min(Math.ceil(i), K - 1);ci(a, t), Re === n && (qe && hi(), ke = -1);
          }
        }, keydown: function keydown(t) {
          t = xi(t);var e = D.activeElement;if (!Qi(e, "data-nav")) return;var n = [a.LEFT, a.RIGHT, a.ENTER, a.SPACE].indexOf(t.keyCode),
              i = Number(Xi(e, "data-nav"));0 <= n && (0 === n ? 0 < i && gi(Be[i - 1]) : 1 === n ? i < De - 1 && gi(Be[i + 1]) : ci(ke = i, t));
        } },
          oe = { mouseover: function mouseover() {
          qe && (vi(), je = !0);
        }, mouseout: function mouseout() {
          je && (di(), je = !1);
        } },
          ue = { visibilitychange: function visibilitychange() {
          D.hidden ? qe && (vi(), Ge = !0) : Ge && (di(), Ge = !1);
        } },
          le = { keydown: function keydown(t) {
          t = xi(t);var e = [a.LEFT, a.RIGHT].indexOf(t.keyCode);0 <= e && fi(t, 0 === e ? -1 : 1);
        } },
          se = { touchstart: Ti, touchmove: Ei, touchend: Ai, touchcancel: Ai },
          ce = { mousedown: Ti, mousemove: Ei, mouseup: Ai, mouseleave: Ai },
          fe = dn("controls"),
          de = dn("nav"),
          ve = !!rt || O.navAsThumbnails,
          pe = dn("autoplay"),
          me = dn("touch"),
          he = dn("mouseDrag"),
          ye = "tns-slide-active",
          ge = "tns-complete",
          xe = { load: function load(t) {
          zn(bi(t));
        }, error: function error(t) {
          e = bi(t), Vi(e, "failed"), Wn(e);var e;
        } },
          be = "force" === O.preventScrollOnTouch;if (fe) var Ce,
          we,
          Me = O.controlsContainer,
          Te = O.controlsContainer ? O.controlsContainer.outerHTML : "",
          Ee = O.prevButton,
          Ae = O.nextButton,
          Ne = O.prevButton ? O.prevButton.outerHTML : "",
          Le = O.nextButton ? O.nextButton.outerHTML : "";if (de) var Be,
          Se = O.navContainer,
          Oe = O.navContainer ? O.navContainer.outerHTML : "",
          De = rt ? K : Li(),
          He = 0,
          ke = -1,
          Re = ln(),
          Ie = Re,
          Pe = "tns-nav-active",
          ze = "Carousel Page ",
          We = " (Current Slide)";if (pe) var Fe,
          qe,
          je,
          Ve,
          Ge,
          Qe = "forward" === O.autoplayDirection ? 1 : -1,
          Xe = O.autoplayButton,
          Ye = O.autoplayButton ? O.autoplayButton.outerHTML : "",
          Ke = ["<span class='tns-visually-hidden'>", " animation</span>"];if (me || he) var Je,
          Ue,
          _e = {},
          Ze = {},
          $e = !1,
          tn = q ? function (t, e) {
        return t.x - e.x;
      } : function (t, e) {
        return t.y - e.y;
      };rt || an($t || ne), d && (Pt = d, zt = "translate", v ? (zt += q ? "3d(" : "3d(0px, ", Wt = q ? ", 0px, 0px)" : ", 0px)") : (zt += q ? "X(" : "Y(", Wt = ")")), I && (G.className = G.className.replace("tns-vpfix", "")), function () {
        dn("gutter");j.className = "tns-outer", V.className = "tns-inner", j.id = Zt + "-ow", V.id = Zt + "-iw", "" === G.id && (G.id = Zt);_t += g || rt ? " tns-subpixel" : " tns-no-subpixel", _t += y ? " tns-calc" : " tns-no-calc", rt && (_t += " tns-autowidth");_t += " tns-" + O.axis, G.className += _t, I ? ((S = D.createElement("div")).id = Zt + "-mw", S.className = "tns-ovh", j.appendChild(S), S.appendChild(V)) : j.appendChild(V);if (gt) {
          var t = S || V;t.className += " tns-ah";
        }if (Q.insertBefore(j, G), V.appendChild(G), qi(Y, function (t, e) {
          Vi(t, "tns-item"), t.id || (t.id = Zt + "-item" + e), !I && W && Vi(t, W), Yi(t, { "aria-hidden": "true", tabindex: "-1" });
        }), Dt) {
          for (var e = D.createDocumentFragment(), n = D.createDocumentFragment(), i = Dt; i--;) {
            var a = i % K,
                r = Y[a].cloneNode(!0);if (Ki(r, "id"), n.insertBefore(r, n.firstChild), I) {
              var o = Y[K - 1 - a].cloneNode(!0);Ki(o, "id"), e.appendChild(o);
            }
          }G.insertBefore(e, G.firstChild), G.appendChild(n), Y = G.children;
        }
      }(), function () {
        if (!I) for (var t = qt, e = qt + Math.min(K, ft); t < e; t++) {
          var n = Y[t];n.style.left = 100 * (t - qt) / ft + "%", Vi(n, P), Gi(n, W);
        }q && (g || rt ? (Wi(Bt, "#" + Zt + " > .tns-item", "font-size:" + h.getComputedStyle(Y[0]).fontSize + ";", Fi(Bt)), Wi(Bt, "#" + Zt, "font-size:0;", Fi(Bt))) : I && qi(Y, function (t, e) {
          var n;t.style.marginLeft = (n = e, y ? y + "(" + 100 * n + "% / " + Ht + ")" : 100 * n / Ht + "%");
        }));if (H) {
          if (x) {
            var i = S && O.autoHeight ? xn(O.speed) : "";Wi(Bt, "#" + Zt + "-mw", i, Fi(Bt));
          }i = pn(O.edgePadding, O.gutter, O.fixedWidth, O.speed, O.autoHeight), Wi(Bt, "#" + Zt + "-iw", i, Fi(Bt)), I && (i = q && !rt ? "width:" + mn(O.fixedWidth, O.gutter, O.items) + ";" : "", x && (i += xn(mt)), Wi(Bt, "#" + Zt, i, Fi(Bt))), i = q && !rt ? hn(O.fixedWidth, O.gutter, O.items) : "", O.gutter && (i += yn(O.gutter)), I || (x && (i += xn(mt)), b && (i += bn(mt))), i && Wi(Bt, "#" + Zt + " > .tns-item", i, Fi(Bt));
        } else {
          Gn(), V.style.cssText = pn(ut, lt, ot, gt), I && q && !rt && (G.style.width = mn(ot, lt, ft));var i = q && !rt ? hn(ot, lt, ft) : "";lt && (i += yn(lt)), i && Wi(Bt, "#" + Zt + " > .tns-item", i, Fi(Bt));
        }if (k && H) for (var a in k) {
          a = parseInt(a);var r = k[a],
              i = "",
              o = "",
              u = "",
              l = "",
              s = "",
              c = rt ? null : vn("items", a),
              f = vn("fixedWidth", a),
              d = vn("speed", a),
              v = vn("edgePadding", a),
              p = vn("autoHeight", a),
              m = vn("gutter", a);x && S && vn("autoHeight", a) && "speed" in r && (o = "#" + Zt + "-mw{" + xn(d) + "}"), ("edgePadding" in r || "gutter" in r) && (u = "#" + Zt + "-iw{" + pn(v, m, f, d, p) + "}"), I && q && !rt && ("fixedWidth" in r || "items" in r || ot && "gutter" in r) && (l = "width:" + mn(f, m, c) + ";"), x && "speed" in r && (l += xn(d)), l && (l = "#" + Zt + "{" + l + "}"), ("fixedWidth" in r || ot && "gutter" in r || !I && "items" in r) && (s += hn(f, m, c)), "gutter" in r && (s += yn(m)), !I && "speed" in r && (x && (s += xn(d)), b && (s += bn(d))), s && (s = "#" + Zt + " > .tns-item{" + s + "}"), (i = o + u + l + s) && Bt.insertRule("@media (min-width: " + a / 16 + "em) {" + i + "}", Bt.cssRules.length);
        }
      }(), Cn();var en = yt ? I ? function () {
        var t = Vt,
            e = Gt;t += dt, e -= dt, ut ? (t += 1, e -= 1) : ot && (st + lt) % (ot + lt) && (e -= 1), Dt && (e < qt ? qt -= K : qt < t && (qt += K));
      } : function () {
        if (Gt < qt) for (; Vt + K <= qt;) {
          qt -= K;
        } else if (qt < Vt) for (; qt <= Gt - K;) {
          qt += K;
        }
      } : function () {
        qt = Math.max(Vt, Math.min(Gt, qt));
      },
          nn = I ? function () {
        var e, n, i, a, t, r, o, u, l, s, c;ti(G, ""), x || !mt ? (ri(), mt && Zi(G) || si()) : (e = G, n = Pt, i = zt, a = Wt, t = ii(), r = mt, o = si, u = Math.min(r, 10), l = 0 <= t.indexOf("%") ? "%" : "px", t = t.replace(l, ""), s = Number(e.style[n].replace(i, "").replace(a, "").replace(l, "")), c = (t - s) / r * u, setTimeout(function t() {
          r -= u, s += c, e.style[n] = i + s + l + a, 0 < r ? setTimeout(t, u) : o();
        }, u)), q || Ni();
      } : function () {
        Ot = [];var t = {};t[C] = t[w] = si, na(Y[jt], t), ea(Y[qt], t), oi(jt, P, z, !0), oi(qt, W, P), C && w && mt && Zi(G) || si();
      };return { version: "2.9.1", getInfo: Si, events: Ut, goTo: ci, play: function play() {
          Tt && !qe && (mi(), Ve = !1);
        }, pause: function pause() {
          qe && (hi(), Ve = !0);
        }, isOn: U, updateSliderHeight: Xn, refresh: Cn, destroy: function destroy() {
          if (Bt.disabled = !0, Bt.ownerNode && Bt.ownerNode.remove(), na(h, { resize: An }), pt && na(D, le), Me && na(Me, ae), Se && na(Se, re), na(G, oe), na(G, ue), Xe && na(Xe, { click: yi }), Tt && clearInterval(Fe), I && C) {
            var t = {};t[C] = si, na(G, t);
          }wt && na(G, se), Mt && na(G, ce);var r = [X, Te, Ne, Le, Oe, Ye];for (var e in T.forEach(function (t, e) {
            var n = "container" === t ? j : O[t];if ("object" == (typeof n === "undefined" ? "undefined" : _typeof(n))) {
              var i = !!n.previousElementSibling && n.previousElementSibling,
                  a = n.parentNode;n.outerHTML = r[e], O[t] = i ? i.nextElementSibling : a.firstElementChild;
            }
          }), T = P = z = B = W = q = j = V = G = Q = X = Y = K = F = J = rt = ot = ut = lt = st = ft = dt = vt = pt = mt = ht = yt = gt = Bt = St = _ = Ot = Dt = Ht = kt = Rt = It = Pt = zt = Wt = Ft = qt = jt = Vt = Gt = Xt = Yt = Kt = Jt = Ut = _t = Zt = $t = te = ee = ne = ie = ae = re = oe = ue = le = se = ce = fe = de = ve = pe = me = he = ye = ge = xe = Z = xt = bt = Me = Te = Ee = Ae = Ce = we = Ct = Se = Oe = Be = De = He = ke = Re = Ie = Pe = ze = We = Tt = Et = Qe = At = Nt = Xe = Ye = Lt = Ke = Fe = qe = je = Ve = Ge = _e = Ze = Je = $e = Ue = tn = wt = Mt = null, this) {
            "rebuild" !== e && (this[e] = null);
          }U = !1;
        }, rebuild: function rebuild() {
          return aa(Hi(O, E));
        } };
    }function an(t) {
      t && (xt = Ct = wt = Mt = pt = Tt = Nt = Lt = !1);
    }function rn() {
      for (var t = I ? qt - Dt : qt; t < 0;) {
        t += K;
      }return t % K + 1;
    }function on(t) {
      return t = t ? Math.max(0, Math.min(yt ? K - 1 : K - ft, t)) : 0, I ? t + Dt : t;
    }function un(t) {
      for (null == t && (t = qt), I && (t -= Dt); t < 0;) {
        t += K;
      }return Math.floor(t % K);
    }function ln() {
      var t,
          e = un();return t = ve ? e : ot || rt ? Math.ceil((e + 1) * De / K - 1) : Math.floor(e / ft), !yt && I && qt === Gt && (t = De - 1), t;
    }function sn() {
      return h.innerWidth || D.documentElement.clientWidth || D.body.clientWidth;
    }function cn(t) {
      return "top" === t ? "afterbegin" : "beforeend";
    }function fn() {
      var t = ut ? 2 * ut - lt : 0;return function t(e) {
        var n,
            i,
            a = D.createElement("div");return e.appendChild(a), i = (n = a.getBoundingClientRect()).right - n.left, a.remove(), i || t(e.parentNode);
      }(Q) - t;
    }function dn(t) {
      if (O[t]) return !0;if (k) for (var e in k) {
        if (k[e][t]) return !0;
      }return !1;
    }function vn(t, e) {
      if (null == e && (e = J), "items" === t && ot) return Math.floor((st + lt) / (ot + lt)) || 1;var n = O[t];if (k) for (var i in k) {
        e >= parseInt(i) && t in k[i] && (n = k[i][t]);
      }return "slideBy" === t && "page" === n && (n = vn("items")), I || "slideBy" !== t && "items" !== t || (n = Math.floor(n)), n;
    }function pn(t, e, n, i, a) {
      var r = "";if (void 0 !== t) {
        var o = t;e && (o -= e), r = q ? "margin: 0 " + o + "px 0 " + t + "px;" : "margin: " + t + "px 0 " + o + "px 0;";
      } else if (e && !n) {
        var u = "-" + e + "px";r = "margin: 0 " + (q ? u + " 0 0" : "0 " + u + " 0") + ";";
      }return !I && a && x && i && (r += xn(i)), r;
    }function mn(t, e, n) {
      return t ? (t + e) * Ht + "px" : y ? y + "(" + 100 * Ht + "% / " + n + ")" : 100 * Ht / n + "%";
    }function hn(t, e, n) {
      var i;if (t) i = t + e + "px";else {
        I || (n = Math.floor(n));var a = I ? Ht : n;i = y ? y + "(100% / " + a + ")" : 100 / a + "%";
      }return i = "width:" + i, "inner" !== R ? i + ";" : i + " !important;";
    }function yn(t) {
      var e = "";!1 !== t && (e = (q ? "padding-" : "margin-") + (q ? "right" : "bottom") + ": " + t + "px;");return e;
    }function gn(t, e) {
      var n = t.substring(0, t.length - e).toLowerCase();return n && (n = "-" + n + "-"), n;
    }function xn(t) {
      return gn(x, 18) + "transition-duration:" + t / 1e3 + "s;";
    }function bn(t) {
      return gn(b, 17) + "animation-duration:" + t / 1e3 + "s;";
    }function Cn() {
      if (dn("autoHeight") || rt || !q) {
        var t = G.querySelectorAll("img");qi(t, function (t) {
          var e = t.src;e && e.indexOf("data:image") < 0 ? (ea(t, xe), t.src = "", t.src = e, Vi(t, "loading")) : St || zn(t);
        }), Oi(function () {
          jn(Ji(t), function () {
            Z = !0;
          });
        }), !rt && q && (t = Fn(qt, Math.min(qt + ft - 1, Ht - 1))), St ? wn() : Oi(function () {
          jn(Ji(t), wn);
        });
      } else I && ai(), Tn(), En();
    }function wn() {
      if (rt) {
        var e = yt ? qt : K - 1;!function t() {
          Y[e - 1].getBoundingClientRect().right.toFixed(2) === Y[e].getBoundingClientRect().left.toFixed(2) ? Mn() : setTimeout(function () {
            t();
          }, 16);
        }();
      } else Mn();
    }function Mn() {
      q && !rt || (Yn(), rt ? (Rt = ni(), ee && (ne = Ln()), Gt = Ft(), an($t || ne)) : Ni()), I && ai(), Tn(), En();
    }function Tn() {
      if (Kn(), j.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + Rn() + "</span>  of " + K + "</div>"), $ = j.querySelector(".tns-liveregion .current"), pe) {
        var t = Tt ? "stop" : "start";Xe ? Yi(Xe, { "data-action": t }) : O.autoplayButtonOutput && (j.insertAdjacentHTML(cn(O.autoplayPosition), '<button data-action="' + t + '">' + Ke[0] + t + Ke[1] + At[0] + "</button>"), Xe = j.querySelector("[data-action]")), Xe && ea(Xe, { click: yi }), Tt && (mi(), Nt && ea(G, oe), Lt && ea(G, ue));
      }if (de) {
        if (Se) Yi(Se, { "aria-label": "Carousel Pagination" }), qi(Be = Se.children, function (t, e) {
          Yi(t, { "data-nav": e, tabindex: "-1", "aria-label": ze + (e + 1), "aria-controls": Zt });
        });else {
          for (var e = "", n = ve ? "" : 'style="display:none"', i = 0; i < K; i++) {
            e += '<button data-nav="' + i + '" tabindex="-1" aria-controls="' + Zt + '" ' + n + ' aria-label="' + ze + (i + 1) + '"></button>';
          }e = '<div class="tns-nav" aria-label="Carousel Pagination">' + e + "</div>", j.insertAdjacentHTML(cn(O.navPosition), e), Se = j.querySelector(".tns-nav"), Be = Se.children;
        }if (Bi(), x) {
          var a = x.substring(0, x.length - 18).toLowerCase(),
              r = "transition: all " + mt / 1e3 + "s";a && (r = "-" + a + "-" + r), Wi(Bt, "[aria-controls^=" + Zt + "-item]", r, Fi(Bt));
        }Yi(Be[Re], { "aria-label": ze + (Re + 1) + We }), Ki(Be[Re], "tabindex"), Vi(Be[Re], Pe), ea(Se, re);
      }fe && (Me || Ee && Ae || (j.insertAdjacentHTML(cn(O.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + Zt + '">' + bt[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + Zt + '">' + bt[1] + "</button></div>"), Me = j.querySelector(".tns-controls")), Ee && Ae || (Ee = Me.children[0], Ae = Me.children[1]), O.controlsContainer && Yi(Me, { "aria-label": "Carousel Navigation", tabindex: "0" }), (O.controlsContainer || O.prevButton && O.nextButton) && Yi([Ee, Ae], { "aria-controls": Zt, tabindex: "-1" }), (O.controlsContainer || O.prevButton && O.nextButton) && (Yi(Ee, { "data-controls": "prev" }), Yi(Ae, { "data-controls": "next" })), Ce = Un(Ee), we = Un(Ae), $n(), Me ? ea(Me, ae) : (ea(Ee, ae), ea(Ae, ae))), Sn();
    }function En() {
      if (I && C) {
        var t = {};t[C] = si, ea(G, t);
      }wt && ea(G, se, O.preventScrollOnTouch), Mt && ea(G, ce), pt && ea(D, le), "inner" === R ? Ut.on("outerResized", function () {
        Nn(), Ut.emit("innerLoaded", Si());
      }) : (k || ot || rt || gt || !q) && ea(h, { resize: An }), gt && ("outer" === R ? Ut.on("innerLoaded", qn) : $t || qn()), Pn(), $t ? Hn() : ne && Dn(), Ut.on("indexChanged", Vn), "inner" === R && Ut.emit("innerLoaded", Si()), "function" == typeof Jt && Jt(Si()), U = !0;
    }function An(t) {
      Oi(function () {
        Nn(xi(t));
      });
    }function Nn(t) {
      if (U) {
        "outer" === R && Ut.emit("outerResized", Si(t)), J = sn();var e,
            n = F,
            i = !1;k && (Bn(), (e = n !== F) && Ut.emit("newBreakpointStart", Si(t)));var a,
            r,
            o,
            u,
            l = ft,
            s = $t,
            c = ne,
            f = pt,
            d = xt,
            v = Ct,
            p = wt,
            m = Mt,
            h = Tt,
            y = Nt,
            g = Lt,
            x = qt;if (e) {
          var b = ot,
              C = gt,
              w = bt,
              M = ct,
              T = At;if (!H) var E = lt,
              A = ut;
        }if (pt = vn("arrowKeys"), xt = vn("controls"), Ct = vn("nav"), wt = vn("touch"), ct = vn("center"), Mt = vn("mouseDrag"), Tt = vn("autoplay"), Nt = vn("autoplayHoverPause"), Lt = vn("autoplayResetOnVisibility"), e && ($t = vn("disable"), ot = vn("fixedWidth"), mt = vn("speed"), gt = vn("autoHeight"), bt = vn("controlsText"), At = vn("autoplayText"), Et = vn("autoplayTimeout"), H || (ut = vn("edgePadding"), lt = vn("gutter"))), an($t), st = fn(), q && !rt || $t || (Yn(), q || (Ni(), i = !0)), (ot || rt) && (Rt = ni(), Gt = Ft()), (e || ot) && (ft = vn("items"), dt = vn("slideBy"), (r = ft !== l) && (ot || rt || (Gt = Ft()), en())), e && $t !== s && ($t ? Hn() : function () {
          if (!te) return;if (Bt.disabled = !1, G.className += _t, ai(), yt) for (var t = Dt; t--;) {
            I && _i(Y[t]), _i(Y[Ht - t - 1]);
          }if (!I) for (var e = qt, n = qt + K; e < n; e++) {
            var i = Y[e],
                a = e < qt + ft ? P : W;i.style.left = 100 * (e - qt) / ft + "%", Vi(i, a);
          }On(), te = !1;
        }()), ee && (e || ot || rt) && (ne = Ln()) !== c && (ne ? (ri(ii(on(0))), Dn()) : (!function () {
          if (!ie) return;ut && H && (V.style.margin = "");if (Dt) for (var t = "tns-transparent", e = Dt; e--;) {
            I && Gi(Y[e], t), Gi(Y[Ht - e - 1], t);
          }On(), ie = !1;
        }(), i = !0)), an($t || ne), Tt || (Nt = Lt = !1), pt !== f && (pt ? ea(D, le) : na(D, le)), xt !== d && (xt ? Me ? _i(Me) : (Ee && _i(Ee), Ae && _i(Ae)) : Me ? Ui(Me) : (Ee && Ui(Ee), Ae && Ui(Ae))), Ct !== v && (Ct ? _i(Se) : Ui(Se)), wt !== p && (wt ? ea(G, se, O.preventScrollOnTouch) : na(G, se)), Mt !== m && (Mt ? ea(G, ce) : na(G, ce)), Tt !== h && (Tt ? (Xe && _i(Xe), qe || Ve || mi()) : (Xe && Ui(Xe), qe && hi())), Nt !== y && (Nt ? ea(G, oe) : na(G, oe)), Lt !== g && (Lt ? ea(D, ue) : na(D, ue)), e) {
          if (ot === b && ct === M || (i = !0), gt !== C && (gt || (V.style.height = "")), xt && bt !== w && (Ee.innerHTML = bt[0], Ae.innerHTML = bt[1]), Xe && At !== T) {
            var N = Tt ? 1 : 0,
                L = Xe.innerHTML,
                B = L.length - T[N].length;L.substring(B) === T[N] && (Xe.innerHTML = L.substring(0, B) + At[N]);
          }
        } else ct && (ot || rt) && (i = !0);if ((r || ot && !rt) && (De = Li(), Bi()), (a = qt !== x) ? (Ut.emit("indexChanged", Si()), i = !0) : r ? a || Vn() : (ot || rt) && (Pn(), Kn(), kn()), !r && I || function () {
          for (var t = qt + Math.min(K, ft), e = Ht; e--;) {
            var n = Y[e];qt <= e && e < t ? (Vi(n, "tns-moving"), n.style.left = 100 * (e - qt) / ft + "%", Vi(n, P), Gi(n, W)) : n.style.left && (n.style.left = "", Vi(n, W), Gi(n, P)), Gi(n, z);
          }setTimeout(function () {
            qi(Y, function (t) {
              Gi(t, "tns-moving");
            });
          }, 300);
        }(), !$t && !ne) {
          if (e && !H && (gt === autoheightTem && mt === speedTem || Gn(), ut === A && lt === E || (V.style.cssText = pn(ut, lt, ot, mt, gt)), q)) {
            I && (G.style.width = mn(ot, lt, ft));var S = hn(ot, lt, ft) + yn(lt);u = Fi(o = Bt) - 1, "deleteRule" in o ? o.deleteRule(u) : o.removeRule(u), Wi(Bt, "#" + Zt + " > .tns-item", S, Fi(Bt));
          }gt && qn(), i && (ai(), jt = qt);
        }e && Ut.emit("newBreakpointEnd", Si(t));
      }
    }function Ln() {
      if (!ot && !rt) return K <= (ct ? ft - (ft - 1) / 2 : ft);var t = ot ? (ot + lt) * K : _[K],
          e = ut ? st + 2 * ut : st + lt;return ct && (e -= ot ? (st - ot) / 2 : (st - (_[qt + 1] - _[qt] - lt)) / 2), t <= e;
    }function Bn() {
      for (var t in F = 0, k) {
        (t = parseInt(t)) <= J && (F = t);
      }
    }function Sn() {
      !Tt && Xe && Ui(Xe), !Ct && Se && Ui(Se), xt || (Me ? Ui(Me) : (Ee && Ui(Ee), Ae && Ui(Ae)));
    }function On() {
      Tt && Xe && _i(Xe), Ct && Se && _i(Se), xt && (Me ? _i(Me) : (Ee && _i(Ee), Ae && _i(Ae)));
    }function Dn() {
      if (!ie) {
        if (ut && (V.style.margin = "0px"), Dt) for (var t = "tns-transparent", e = Dt; e--;) {
          I && Vi(Y[e], t), Vi(Y[Ht - e - 1], t);
        }Sn(), ie = !0;
      }
    }function Hn() {
      if (!te) {
        if (Bt.disabled = !0, G.className = G.className.replace(_t.substring(1), ""), Ki(G, ["style"]), yt) for (var t = Dt; t--;) {
          I && Ui(Y[t]), Ui(Y[Ht - t - 1]);
        }if (q && I || Ki(V, ["style"]), !I) for (var e = qt, n = qt + K; e < n; e++) {
          var i = Y[e];Ki(i, ["style"]), Gi(i, P), Gi(i, W);
        }Sn(), te = !0;
      }
    }function kn() {
      var t = Rn();$.innerHTML !== t && ($.innerHTML = t);
    }function Rn() {
      var t = In(),
          e = t[0] + 1,
          n = t[1] + 1;return e === n ? e + "" : e + " to " + n;
    }function In(t) {
      null == t && (t = ii());var n,
          i,
          a,
          r = qt;if (ct || ut ? (rt || ot) && (i = -(parseFloat(t) + ut), a = i + st + 2 * ut) : rt && (i = _[qt], a = i + st), rt) _.forEach(function (t, e) {
        e < Ht && ((ct || ut) && t <= i + .5 && (r = e), .5 <= a - t && (n = e));
      });else {
        if (ot) {
          var e = ot + lt;ct || ut ? (r = Math.floor(i / e), n = Math.ceil(a / e - 1)) : n = r + Math.ceil(st / e) - 1;
        } else if (ct || ut) {
          var o = ft - 1;if (ct ? (r -= o / 2, n = qt + o / 2) : n = qt + o, ut) {
            var u = ut * ft / st;r -= u, n += u;
          }r = Math.floor(r), n = Math.ceil(n);
        } else n = r + ft - 1;r = Math.max(r, 0), n = Math.min(n, Ht - 1);
      }return [r, n];
    }function Pn() {
      St && !$t && Fn.apply(null, In()).forEach(function (t) {
        if (!ji(t, ge)) {
          var e = {};e[C] = function (t) {
            t.stopPropagation();
          }, ea(t, e), ea(t, xe), t.src = Xi(t, "data-src");var n = Xi(t, "data-srcset");n && (t.srcset = n), Vi(t, "loading");
        }
      });
    }function zn(t) {
      Vi(t, "loaded"), Wn(t);
    }function Wn(t) {
      Vi(t, "tns-complete"), Gi(t, "loading"), na(t, xe);
    }function Fn(t, e) {
      for (var n = []; t <= e;) {
        qi(Y[t].querySelectorAll("img"), function (t) {
          n.push(t);
        }), t++;
      }return n;
    }function qn() {
      var t = Fn.apply(null, In());Oi(function () {
        jn(t, Xn);
      });
    }function jn(n, t) {
      return Z ? t() : (n.forEach(function (t, e) {
        ji(t, ge) && n.splice(e, 1);
      }), n.length ? void Oi(function () {
        jn(n, t);
      }) : t());
    }function Vn() {
      Pn(), Kn(), kn(), $n(), function () {
        if (Ct && (Re = 0 <= ke ? ke : ln(), ke = -1, Re !== Ie)) {
          var t = Be[Ie],
              e = Be[Re];Yi(t, { tabindex: "-1", "aria-label": ze + (Ie + 1) }), Gi(t, Pe), Yi(e, { "aria-label": ze + (Re + 1) + We }), Ki(e, "tabindex"), Vi(e, Pe), Ie = Re;
        }
      }();
    }function Gn() {
      I && gt && (S.style[x] = mt / 1e3 + "s");
    }function Qn(t, e) {
      for (var n = [], i = t, a = Math.min(t + e, Ht); i < a; i++) {
        n.push(Y[i].offsetHeight);
      }return Math.max.apply(null, n);
    }function Xn() {
      var t = gt ? Qn(qt, ft) : Qn(Dt, K),
          e = S || V;e.style.height !== t && (e.style.height = t + "px");
    }function Yn() {
      _ = [0];var n = q ? "left" : "top",
          i = q ? "right" : "bottom",
          a = Y[0].getBoundingClientRect()[n];qi(Y, function (t, e) {
        e && _.push(t.getBoundingClientRect()[n] - a), e === Ht - 1 && _.push(t.getBoundingClientRect()[i] - a);
      });
    }function Kn() {
      var t = In(),
          n = t[0],
          i = t[1];qi(Y, function (t, e) {
        n <= e && e <= i ? Qi(t, "aria-hidden") && (Ki(t, ["aria-hidden", "tabindex"]), Vi(t, ye)) : Qi(t, "aria-hidden") || (Yi(t, { "aria-hidden": "true", tabindex: "-1" }), Gi(t, ye));
      });
    }function Jn(t) {
      return t.nodeName.toLowerCase();
    }function Un(t) {
      return "button" === Jn(t);
    }function _n(t) {
      return "true" === t.getAttribute("aria-disabled");
    }function Zn(t, e, n) {
      t ? e.disabled = n : e.setAttribute("aria-disabled", n.toString());
    }function $n() {
      if (xt && !ht && !yt) {
        var t = Ce ? Ee.disabled : _n(Ee),
            e = we ? Ae.disabled : _n(Ae),
            n = qt <= Vt,
            i = !ht && Gt <= qt;n && !t && Zn(Ce, Ee, !0), !n && t && Zn(Ce, Ee, !1), i && !e && Zn(we, Ae, !0), !i && e && Zn(we, Ae, !1);
      }
    }function ti(t, e) {
      x && (t.style[x] = e);
    }function ei(t) {
      return null == t && (t = qt), rt ? (st - (ut ? lt : 0) - (_[t + 1] - _[t] - lt)) / 2 : ot ? (st - ot) / 2 : (ft - 1) / 2;
    }function ni() {
      var t = st + (ut ? lt : 0) - (ot ? (ot + lt) * Ht : _[Ht]);return ct && !yt && (t = ot ? -(ot + lt) * (Ht - 1) - ei() : ei(Ht - 1) - _[Ht - 1]), 0 < t && (t = 0), t;
    }function ii(t) {
      var e;if (null == t && (t = qt), q && !rt) {
        if (ot) e = -(ot + lt) * t, ct && (e += ei());else {
          var n = d ? Ht : ft;ct && (t -= ei()), e = 100 * -t / n;
        }
      } else e = -_[t], ct && rt && (e += ei());return kt && (e = Math.max(e, Rt)), e += !q || rt || ot ? "px" : "%";
    }function ai(t) {
      ti(G, "0s"), ri(t);
    }function ri(t) {
      null == t && (t = ii()), G.style[Pt] = zt + t + Wt;
    }function oi(t, e, n, i) {
      var a = t + ft;yt || (a = Math.min(a, Ht));for (var r = t; r < a; r++) {
        var o = Y[r];i || (o.style.left = 100 * (r - qt) / ft + "%"), B && p && (o.style[p] = o.style[m] = B * (r - t) / 1e3 + "s"), Gi(o, e), Vi(o, n), i && Ot.push(o);
      }
    }function ui(t, e) {
      It && en(), (qt !== jt || e) && (Ut.emit("indexChanged", Si()), Ut.emit("transitionStart", Si()), gt && qn(), qe && t && 0 <= ["click", "keydown"].indexOf(t.type) && hi(), Kt = !0, nn());
    }function li(t) {
      return t.toLowerCase().replace(/-/g, "");
    }function si(t) {
      if (I || Kt) {
        if (Ut.emit("transitionEnd", Si(t)), !I && 0 < Ot.length) for (var e = 0; e < Ot.length; e++) {
          var n = Ot[e];n.style.left = "", m && p && (n.style[m] = "", n.style[p] = ""), Gi(n, z), Vi(n, W);
        }if (!t || !I && t.target.parentNode === G || t.target === G && li(t.propertyName) === li(Pt)) {
          if (!It) {
            var i = qt;en(), qt !== i && (Ut.emit("indexChanged", Si()), ai());
          }"inner" === R && Ut.emit("innerLoaded", Si()), Kt = !1, jt = qt;
        }
      }
    }function ci(t, e) {
      if (!ne) if ("prev" === t) fi(e, -1);else if ("next" === t) fi(e, 1);else {
        if (Kt) {
          if (Qt) return;si();
        }var n = un(),
            i = 0;if ("first" === t ? i = -n : "last" === t ? i = I ? K - ft - n : K - 1 - n : ("number" != typeof t && (t = parseInt(t)), isNaN(t) || (e || (t = Math.max(0, Math.min(K - 1, t))), i = t - n)), !I && i && Math.abs(i) < ft) {
          var a = 0 < i ? 1 : -1;i += Vt <= qt + i - K ? K * a : 2 * K * a * -1;
        }qt += i, I && yt && (qt < Vt && (qt += K), Gt < qt && (qt -= K)), un(qt) !== un(jt) && ui(e);
      }
    }function fi(t, e) {
      if (Kt) {
        if (Qt) return;si();
      }var n;if (!e) {
        for (var i = bi(t = xi(t)); i !== Me && [Ee, Ae].indexOf(i) < 0;) {
          i = i.parentNode;
        }var a = [Ee, Ae].indexOf(i);0 <= a && (n = !0, e = 0 === a ? -1 : 1);
      }if (ht) {
        if (qt === Vt && -1 === e) return void ci("last", t);if (qt === Gt && 1 === e) return void ci("first", t);
      }e && (qt += dt * e, rt && (qt = Math.floor(qt)), ui(n || t && "keydown" === t.type ? t : null));
    }function di() {
      Fe = setInterval(function () {
        fi(null, Qe);
      }, Et), qe = !0;
    }function vi() {
      clearInterval(Fe), qe = !1;
    }function pi(t, e) {
      Yi(Xe, { "data-action": t }), Xe.innerHTML = Ke[0] + t + Ke[1] + e;
    }function mi() {
      di(), Xe && pi("stop", At[1]);
    }function hi() {
      vi(), Xe && pi("start", At[0]);
    }function yi() {
      qe ? (hi(), Ve = !0) : (mi(), Ve = !1);
    }function gi(t) {
      t.focus();
    }function xi(t) {
      return Ci(t = t || h.event) ? t.changedTouches[0] : t;
    }function bi(t) {
      return t.target || h.event.srcElement;
    }function Ci(t) {
      return 0 <= t.type.indexOf("touch");
    }function wi(t) {
      t.preventDefault ? t.preventDefault() : t.returnValue = !1;
    }function Mi() {
      return a = Ze.y - _e.y, r = Ze.x - _e.x, t = Math.atan2(a, r) * (180 / Math.PI), e = Xt, n = !1, i = Math.abs(90 - Math.abs(t)), 90 - e <= i ? n = "horizontal" : i <= e && (n = "vertical"), n === O.axis;var t, e, n, i, a, r;
    }function Ti(t) {
      if (Kt) {
        if (Qt) return;si();
      }Tt && qe && vi(), $e = !0, Ue && (Di(Ue), Ue = null);var e = xi(t);Ut.emit(Ci(t) ? "touchStart" : "dragStart", Si(t)), !Ci(t) && 0 <= ["img", "a"].indexOf(Jn(bi(t))) && wi(t), Ze.x = _e.x = e.clientX, Ze.y = _e.y = e.clientY, I && (Je = parseFloat(G.style[Pt].replace(zt, "")), ti(G, "0s"));
    }function Ei(t) {
      if ($e) {
        var e = xi(t);Ze.x = e.clientX, Ze.y = e.clientY, I ? Ue || (Ue = Oi(function () {
          !function t(e) {
            if (!Yt) return void ($e = !1);Di(Ue);$e && (Ue = Oi(function () {
              t(e);
            }));"?" === Yt && (Yt = Mi());if (Yt) {
              !be && Ci(e) && (be = !0);try {
                e.type && Ut.emit(Ci(e) ? "touchMove" : "dragMove", Si(e));
              } catch (t) {}var n = Je,
                  i = tn(Ze, _e);if (!q || ot || rt) n += i, n += "px";else {
                var a = d ? i * ft * 100 / ((st + lt) * Ht) : 100 * i / (st + lt);n += a, n += "%";
              }G.style[Pt] = zt + n + Wt;
            }
          }(t);
        })) : ("?" === Yt && (Yt = Mi()), Yt && (be = !0)), be && t.preventDefault();
      }
    }function Ai(i) {
      if ($e) {
        Ue && (Di(Ue), Ue = null), I && ti(G, ""), $e = !1;var t = xi(i);Ze.x = t.clientX, Ze.y = t.clientY;var a = tn(Ze, _e);if (Math.abs(a)) {
          if (!Ci(i)) {
            var n = bi(i);ea(n, { click: function t(e) {
                wi(e), na(n, { click: t });
              } });
          }I ? Ue = Oi(function () {
            if (q && !rt) {
              var t = -a * ft / (st + lt);t = 0 < a ? Math.floor(t) : Math.ceil(t), qt += t;
            } else {
              var e = -(Je + a);if (e <= 0) qt = Vt;else if (e >= _[Ht - 1]) qt = Gt;else for (var n = 0; n < Ht && e >= _[n];) {
                e > _[qt = n] && a < 0 && (qt += 1), n++;
              }
            }ui(i, a), Ut.emit(Ci(i) ? "touchEnd" : "dragEnd", Si(i));
          }) : Yt && fi(i, 0 < a ? -1 : 1);
        }
      }"auto" === O.preventScrollOnTouch && (be = !1), Xt && (Yt = "?"), Tt && !qe && di();
    }function Ni() {
      (S || V).style.height = _[qt + ft] - _[qt] + "px";
    }function Li() {
      var t = ot ? (ot + lt) * K / st : K / ft;return Math.min(Math.ceil(t), K);
    }function Bi() {
      if (Ct && !ve && De !== He) {
        var t = He,
            e = De,
            n = _i;for (De < He && (t = De, e = He, n = Ui); t < e;) {
          n(Be[t]), t++;
        }He = De;
      }
    }function Si(t) {
      return { container: G, slideItems: Y, navContainer: Se, navItems: Be, controlsContainer: Me, hasControls: fe, prevButton: Ee, nextButton: Ae, items: ft, slideBy: dt, cloneCount: Dt, slideCount: K, slideCountNew: Ht, index: qt, indexCached: jt, displayIndex: rn(), navCurrentIndex: Re, navCurrentIndexCached: Ie, pages: De, pagesCached: He, sheet: Bt, isOn: U, event: t || {} };
    }M && console.warn("No slides found in", O.container);
  };return aa;
}();
//# sourceMappingURL=../sourcemaps/tiny-slider.js.map
"use strict";
'use strict';

var GDPR = GDPR || {};

GDPR.clientCustom = function () {
    'use strict';

    var _selectors = {
        module: 'button.navbar-toggle.collapsed',
        navBar: 'MainNavSidebar',
        manageBtn: 'gdpr-manage-cookies',
        allowBtn: 'gdpr-allow-all'
    };

    var _classes = {
        active: 'is-active'
    };

    var mobileNav = void 0;
    var customPush = void 0;
    var navBar = void 0;

    var _initButtonEvent = function _initButtonEvent() {
        var manageBtn = document.getElementsByClassName(_selectors.manageBtn)[0];
        var allowBtn = document.getElementById(_selectors.allowBtn);

        mobileNav.addEventListener('click', _setNavHeight);
        manageBtn.addEventListener('click', _closeNavBar);
        allowBtn.addEventListener('click', _setNavHeight);
    };

    var _setNavHeight = function _setNavHeight() {
        if (!customPush) {
            customPush = document.getElementsByClassName('header-push');
            navBar = document.getElementsByClassName(_selectors.navBar);
        }

        if (customPush.length && navBar.length) {
            navBar[0].style.top = customPush[0].style.height;
        }
    };

    var _closeNavBar = function _closeNavBar() {
        if (mobileNav.classList.contains(_classes.active)) {
            mobileNav.click();
        }
    };

    var init = function init() {
        mobileNav = document.querySelector(_selectors.module);
        if (!mobileNav) {
            return;
        }

        _initButtonEvent();
    };

    return {
        init: init
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.accordion = function () {
    'use strict';

    var selectors = {
        module: 'gdpr-accordion'
    };

    var state = {
        openAccordions: []
    };

    var classes = {
        open: 'gdpr-accordion--is-open'
    };

    var accordions = [];

    var _initAccordions = function _initAccordions() {
        var _loop = function _loop(i, len) {
            var id = 'gdprAccordion-' + i;

            accordions[i].id = id;
            accordions[i].firstElementChild.addEventListener('click', function () {
                _handleClick(accordions[i]);
            });
        };

        // Set IDs against each gdpr-accordion
        for (var i = 0, len = accordions.length; i < len; i++) {
            _loop(i, len);
        }
    };

    var _openFirstAccordion = function _openFirstAccordion() {
        if (state.openAccordions.length === 0) {
            _openAccordion(accordions[0]);
        }
    };

    var _handleClick = function _handleClick(accordion) {
        var index = state.openAccordions.indexOf(accordion.id);

        if (index === -1) {
            closeCurrentAccordion();

            _openAccordion(accordion);
        } else {
            _closeAccordion(accordion, index);
        }
    };

    var _openAccordion = function _openAccordion(accordion) {
        state.openAccordions.push(accordion.id);

        accordion.classList.add(classes.open);
    };

    var _closeAccordion = function _closeAccordion(accordion, index) {
        // If index is passed in, remove that id from state else reset
        if (typeof index !== 'undefined') {
            state.openAccordions.splice(index, 1);
        } else {
            state.openAccordions = [];
        }

        accordion.classList.remove(classes.open);
    };

    var init = function init() {
        accordions = document.getElementsByClassName(selectors.module);
        if (accordions.length === 0) {
            return;
        }

        _initAccordions();
        _openFirstAccordion();
    };

    var closeCurrentAccordion = function closeCurrentAccordion() {
        if (state.openAccordions.length > 0) {
            var previousAccordion = document.getElementById(state.openAccordions[0]);
            _closeAccordion(previousAccordion);
        }
    };

    var openAccordion = function openAccordion(id) {
        if (id) {
            var accordion = document.getElementById(id);
            _openAccordion(accordion);
        } else {
            _openFirstAccordion();
        }
    };

    return {
        init: init,
        closeCurrentAccordion: closeCurrentAccordion,
        openAccordion: openAccordion
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.api = function () {
    'use strict';

    var state = {
        endpoint: '',
        initialised: false
    };

    var _init = function _init() {
        var endpoint = '';
        if (!window.location.origin) {
            // Some browsers (mainly IE) does not have this property, so we need to build it manually...
            endpoint = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            endpoint = window.location.origin;
        }

        state.endpoint = endpoint + '/accessapi/cookiecompliance';
        state.initialised = true;
    };

    var update = function update(options, callback) {
        if (!state.initialised) {
            _init();
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', state.endpoint + '/set');
        xhr.setRequestHeader('Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.send(JSON.stringify(options));

        xhr.onload = function (xhrResponse) {
            var resp = xhrResponse.target;
            if (resp.status === 200) {
                return callback();
            } else {
                return callback(new Error('Server responded with: ' + resp.status + ' - ' + resp.statusText + '.'));
            }
        };
    };

    return {
        update: update
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.gdprBanner = function () {
    'use strict';

    var _selectors = {
        module: 'gdpr-banner',
        manageBtn: 'gdpr-manage-cookies',
        allowAllBtn: 'gdpr-allow-all',
        closeBtn: 'gdpr-close',
        applyBtn: 'gdpr-apply',
        continueBtn: 'gdpr-continue',
        accordions: 'gdpr-accordion',
        radioInputs: 'gdpr-radio',
        headIcon: 'gdpr-cookies__icon',
        push: 'gdpr-push',
        absolute: 'gdpr-absolute-wrapper',
        mobileMenu: '.js-mobile-menu',
        tabletMenu: '.js-tablet-menu'
    };

    var _classes = {
        open: 'gdpr-banner--show-content',
        modalOpen: 'gdpr-banner-open',
        hideBanner: 'gdpr-banner--hide-head',
        tick: 'icon-gdpr-tick',
        cross: 'icon-gdpr-cross',
        animate: 'gdpr-cookies__icon-animate',
        animateUp: 'gdpr-cookies__icon-animate-up',
        animateDown: 'gdpr-cookies__icon-animate-down'
    };

    var gdprBanner = void 0;
    var gdprPush = void 0;
    var accordions = void 0;

    var _setPushHeight = function _setPushHeight() {
        if (document.getElementsByClassName(_selectors.absolute).length) {
            _setCustomHeight(true);
        } else {
            gdprPush.style.height = gdprBanner.getBoundingClientRect().height + 'px';
            if (document.querySelector(_selectors.mobileMenu)) {
                document.querySelector(_selectors.mobileMenu).style.top = gdprBanner.getBoundingClientRect().height + 60 + 'px';
            }
            if (document.querySelector(_selectors.tabletMenu)) {
                document.querySelector(_selectors.tabletMenu).style.top = gdprBanner.getBoundingClientRect().height + 'px';
            }
        }
    };

    var _setCustomHeight = function _setCustomHeight(calcWholeBanner) {
        var customPush = document.getElementsByClassName('header-push');

        if (customPush.length) {
            var banner = document.getElementsByClassName(_selectors.absolute);
            var header = document.querySelector('header.header');
            var height = header ? header.getBoundingClientRect().height : 0;

            if (calcWholeBanner) {
                height += banner[0].getBoundingClientRect().height;
            } else {
                if (window.innerWidth <= 768) {
                    height = banner[0].lastElementChild.getBoundingClientRect().height;
                } else {
                    height += banner[0].lastElementChild.getBoundingClientRect().height;
                }
            }

            customPush[0].style.height = height + 'px';
        }
    };

    var _initButtonListeners = function _initButtonListeners() {
        var manageCookies = document.getElementsByClassName(_selectors.manageBtn);
        var allowAll = document.getElementById(_selectors.allowAllBtn);
        var closeCookies = document.getElementById(_selectors.closeBtn);
        var applyCookies = document.getElementById(_selectors.applyBtn);
        var continueBtn = document.getElementById(_selectors.continueBtn);

        for (var i = 0, len = manageCookies.length; i < len; i++) {
            manageCookies[i].addEventListener('click', openCookies);
        }

        closeCookies.addEventListener('click', function () {
            gdprBanner.classList.remove(_classes.open);
            document.body.classList.remove(_classes.modalOpen);
        });

        continueBtn.addEventListener('click', function () {
            _openNextAccordion(0);
        });

        allowAll.addEventListener('click', function () {
            _updatePreferences();
            _setCookiePreferences(true);
        });

        applyCookies.addEventListener('click', function () {
            _setCookiePreferences(false);
            document.body.classList.remove(_classes.modalOpen);
        });
    };

    var _initRadioListeners = function _initRadioListeners() {
        accordions = document.getElementsByClassName(_selectors.accordions);

        var _loop = function _loop(i, len) {
            var radios = accordions[i].getElementsByClassName(_selectors.radioInputs);
            var headIcon = accordions[i].getElementsByClassName(_selectors.headIcon)[0];

            for (var j = 0, length = radios.length; j < length; j++) {
                radios[j].addEventListener('change', function () {
                    var _this = this;

                    headIcon.classList.add(_classes.animate);
                    headIcon.classList.add(_classes.animateUp);

                    setTimeout(function () {
                        headIcon.classList.remove(_classes.animate);
                        headIcon.classList.remove(_classes.animateUp);
                        headIcon.classList.add(_classes.animateDown);
                    }, 250);

                    setTimeout(function () {
                        headIcon.classList.add(_classes.animate);

                        switch (_this.value) {
                            case 'true':
                                headIcon.classList.remove(_classes.cross);
                                headIcon.classList.add(_classes.tick);
                                break;
                            case 'false':
                                headIcon.classList.remove(_classes.tick);
                                headIcon.classList.add(_classes.cross);
                                break;
                        }
                    }, 275);

                    setTimeout(function () {
                        headIcon.classList.remove(_classes.animateDown);
                    }, 300);

                    _openNextAccordion(i);
                });
            }
        };

        for (var i = 0, len = accordions.length; i < len; i++) {
            _loop(i, len);
        }
    };

    var _openNextAccordion = function _openNextAccordion(currentIndex) {
        if (currentIndex + 1 < accordions.length) {
            GDPR.accordion.closeCurrentAccordion();
            GDPR.accordion.openAccordion(accordions[currentIndex + 1].id);
        }
    };

    var _setCookiePreferences = function _setCookiePreferences(isAcceptAll) {
        var options = _getPreferences(isAcceptAll);
        var gaValues = '';
        for (var i = 0, len = options.length; i < len; i++) {
            gaValues += i === 0 ? '' + options[i].gaValue : ' | ' + options[i].gaValue;
        }

        var callback = function callback(error) {
            if (error) {
                console.info('Error: ' + error.message);
            } else {
                gdprBanner.classList.remove(_classes.open);
                gdprBanner.classList.add(_classes.hideBanner);
                gdprPush.style.height = 0;
            }
        };

        GDPR.api.update(options, callback);
        _sendGAEvent(gaValues);

        // Custom for DD to reset the height of the push element on acceptance of cookies
        //_setCustomHeight(false);
    };

    var _getPreferences = function _getPreferences(isAcceptAll) {
        var options = [];

        for (var i = 0, len = accordions.length; i < len; i++) {
            var guid = accordions[i].getAttribute('data-gdpr-guid');
            var title = accordions[i].querySelector('.gdpr-accordion__head>h3').innerHTML.trim();
            var cookieValue = accordions[i].querySelector('input[type="radio"]:checked');
            var selection = isAcceptAll ? true : i === 0 ? true : cookieValue && cookieValue.value === 'true';

            if (guid) {
                options.push({
                    groupId: guid,
                    selection: selection,
                    gaValue: title + '=' + (selection ? 'Allow' : 'Disallow')
                });
            }
        }

        return options;
    };

    var _updatePreferences = function _updatePreferences() {
        for (var i = 0, len = accordions.length; i < len; i++) {
            var allowButton = accordions[i].querySelector('input[type="radio"][value="true"]');

            if (allowButton) {
                allowButton.checked = true;
            }
        }
    };

    var _sendGAEvent = function _sendGAEvent(gaValues) {
        if (typeof dataLayer === 'undefined') {
            console.info('Error: dataLayer object not found on the page. Cannot push Google event to analytics.');
        } else {
            dataLayer.push({
                event: 'GAEvent',
                eventCategory: 'Cookie managment',
                eventAction: 'Settings',
                eventLabel: gaValues
            });
        }
    };

    var init = function init() {
        gdprBanner = document.getElementsByClassName(_selectors.module);
        if (gdprBanner.length === 0) {
            return false;
        }

        gdprBanner = gdprBanner[0];
        gdprPush = document.getElementsByClassName(_selectors.push)[0];

        _setPushHeight();
        _initButtonListeners();
        _initRadioListeners();
    };

    var openCookies = function openCookies() {
        gdprBanner.classList.add(_classes.open);
        document.body.classList.add(_classes.modalOpen);
    };

    return {
        init: init,
        openCookies: openCookies
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.app = function () {
    'use strict';

    var init = function init() {
        if (document.getElementsByClassName('experience-editor').length === 0 && GDPR !== null || GDPR === undefined) {
            GDPR.gdprBanner.init();
            GDPR.accordion.init();
            GDPR.clientCustom.init();
        }
    };

    return {
        init: init
    };
}();

if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
    GDPR.app.init();
} else {
    document.addEventListener('DOMContentLoaded', GDPR.app.init, { once: true });
}
"use strict";
"use strict";
'use strict';

var accordion = function () {

    var selectors = {
        accordionClass: '.accordion',
        accordionItemHeaderClass: '.accordion__item-header',
        accordionItemOpen: 'accordion__item--open'
    };

    var initAccordion = function initAccordion() {

        var checkForAccordion = document.querySelector(selectors.accordionClass);

        if (checkForAccordion) {
            var expandAccordion = function expandAccordion(e) {
                for (var i = 0; i < items.length; i++) {
                    var parent = items[i].parentElement;
                    var article = items[i].nextElementSibling;

                    if (this === items[i] && !parent.classList.contains(selectors.accordionItemOpen)) {
                        parent.classList.add(selectors.accordionItemOpen);
                        article.style.maxHeight = article.scrollHeight + 'px';
                    } else {
                        parent.classList.remove(selectors.accordionItemOpen);
                        article.style.maxHeight = '0px';
                    }
                }
            };

            var items = document.querySelectorAll(selectors.accordionItemHeaderClass);

            for (var i = 0; i < items.length; i++) {
                items[i].addEventListener('click', expandAccordion);
            }
        }
    };

    var init = function init() {
        return initAccordion();
    };

    return {
        init: init
    };
}();
'use strict';

var dashboardUpdateDetails = function () {
    var selectors = {
        updateDetailsForm: '.update-personal-details__personal-form',
        updatePasswordForm: '.update-personal-details__password-form',
        formfields: '.update-personal-details__form-input',
        errorMessage: '.update-personal-details__error-label',
        submitBtn: '.update-personal-details__submit',
        passwordSubmit: '.update-personal-details__password-submit',
        removeAccountCheckbox: '.remove-account__input-check',
        removeAccountSubmit: '.remove-account__submit',
        updatePassword: '.js-update-password',
        confirmPassword: '.js-confirm-password',
        passwordMatchError: '.password-match-error'
    };
    var stateClasses = {
        validClass: 'update-personal-details__form-input--valid',
        invalidClass: 'update-personal-details__form-input--invalid',
        hideErrorMessageClass: 'update-personal-details__error-label--hide',
        hidePasswordMatchErrorClass: 'password-match-error--hide'
    };

    var validateFormFields = function validateFormFields(form) {
        var isInvalid = false;
        var updatePasswordField = document.querySelector(selectors.updatePassword);
        var confirmPasswordField = document.querySelector(selectors.confirmPassword);
        if (updatePasswordField && confirmPasswordField) {
            var _updateValue = _updateValue.value;
            var _confirmValue = _confirmValue.value;
        }

        form.querySelectorAll(selectors.formfields).forEach(function (field) {
            var isFieldRequired = field.hasAttribute("required");
            if (isFieldRequired === true) {
                if (field.validity.valid === false) {
                    field.classList.remove(stateClasses.validClass);
                    field.classList.add(stateClasses.invalidClass);
                    field.parentElement.querySelector(selectors.errorMessage).classList.remove(stateClasses.hideErrorMessageClass);
                    isInvalid = true;
                } else {
                    field.classList.remove(stateClasses.invalidClass);
                    field.classList.add(stateClasses.validClass);
                    field.parentElement.querySelector(selectors.errorMessage).classList.add(stateClasses.hideErrorMessageClass);
                }
            } else {}
        });
        if (!isInvalid && confirmValue !== updateValue) {
            event.preventDefault();
            form.querySelector(selectors.passwordMatchError).classList.remove(stateClasses.hidePasswordMatchErrorClass);
        } else if (isInvalid) {
            event.preventDefault();
        } else {
            form.querySelector(selectors.passwordMatchError).classList.add(stateClasses.hidePasswordMatchErrorClass);
            document.querySelector(selectors.updateDetailsForm).submit();
        }
    };

    var attachEvents = function attachEvents() {
        document.querySelector(selectors.submitBtn).addEventListener('click', function () {
            validateFormFields(document.querySelector(selectors.updateDetailsForm));
        });

        document.querySelector(selectors.passwordSubmit).addEventListener('click', function () {
            validateFormFields(document.querySelector(selectors.updatePasswordForm));
        });

        document.querySelector(selectors.removeAccountCheckbox).addEventListener('click', function () {
            var removeAccountCheckbox = document.querySelector(selectors.removeAccountCheckbox);
            if (removeAccountCheckbox.checked === true) {
                document.querySelector(selectors.removeAccountSubmit).disabled = false;
            } else {
                document.querySelector(selectors.removeAccountSubmit).disabled = true;
            }
        });
    };

    var init = function init() {
        var updateDetailsFormExists = document.querySelector(selectors.updateDetailsForm);
        if (updateDetailsFormExists) {
            attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var ecommerce = function () {

    var selectors = {
        ecommerceClass: '.ecommerce',
        packagingOfferClass: '.packaging-offers',
        loadMoreProducts: '.load-more-products',
        productsContainer: '.standard-product-list__inner',
        productItemClass: '.standard-product-list__item'
    };

    var isEcommercePage = document.querySelector(selectors.ecommerceClass);
    var getPageSize = document.querySelector('[data-page-size]');
    var basketBannerInfo = document.querySelector('.basket-banner__info');
    var basketBannerDesc = basketBannerInfo !== null ? basketBannerInfo.getAttribute('data-number-packaging-label') : '';
    var basketCountToken = '[Shop.NumberPackagingItems]';

    var apiEndPoints = {
        getCart: '/accessapi/cart',
        addItemToCart: '/accessapi/cart/add',
        removeItemFromCart: '/accessapi/cart/remove',
        updateItemInCart: '/accessapi/cart/update',
        loadMore: '/accessapi/product/getproducts'
    };

    var queryString = {
        lineId: '?lineId=',
        productId: '?productId=',
        quantity: '&quantity=',
        checkoutCart: '&cartName=CheckoutShop',
        doesCartExist: '?CartName=CheckoutShop',
        pageSize: '?pagesize=',
        classification: '&classification='
    };

    if (isEcommercePage) {
        (function () {

            var ecommerceCommonData = {
                basketTotal: 0,
                basketItemCount: 0,
                basketPriceTotal: 0,
                basketBannerDescription: '',
                showLoadMoreBtn: true,
                show: true,
                loadMoreResultsHtml: '',
                moreItems: [],
                componentKey: 0
            };

            var loadingSpinnerAnimation = '<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n            viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <path fill="#13B5EA" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">\n            <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg>';

            Vue.component('product-cart-btns', {
                props: ['productPrice', 'productId'],
                template: '\n                    <div class="standard-product-list__item-container">\n                        <div class="standard-product-list__item-actions" v-show="!isLoad">\n                            <a href="#" class="standard-product-list__add-cta" v-on:click="addToOrder" v-show="!showProductItemModifyBtns && !isLoad">Add to order</a>\n                            <a href="#" class="standard-product-list__remove-cta" v-on:click="removeFromOrder" v-show="showProductItemModifyBtns && !isLoad"></a>\n                            <a href="#" class="standard-product-list__add-cta--added" v-on:click="addToOrder" v-show="showProductItemModifyBtns && !isLoad">\n                                {{ quantity }} x {{ productPrice }}\n                            </a>\n                        </div>\n                        <div v-show="isLoad" class="standard-product-list__loading" v-html="loadingSpinnerAnimation"></div>\n                    </div>',
                data: function data() {
                    return {
                        quantity: 0,
                        basketPriceTotal: 0,
                        basketItemCount: 0,
                        showProductItemModifyBtns: false,
                        lineId: 0,
                        isLoad: false,
                        loadingSpinnerAnimation: loadingSpinnerAnimation,
                        componentKey: 0
                    };
                },
                methods: {
                    addToOrder: function addToOrder(event) {
                        var _this = this;

                        event.preventDefault();
                        this.showProductItemModifyBtns = true;

                        axios.post(apiEndPoints.addItemToCart + queryString.productId + this.productId + queryString.quantity + 1 + queryString.checkoutCart).then(function (response) {
                            _this.quantity++;
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            ecommerceCommonData.basketItemCount = response.data.TotalItems;
                            ecommerceCommonData.basketBannerDescription = _this.tokenReplace(basketBannerDesc, basketCountToken, ecommerceCommonData.basketItemCount);

                            for (var i in response.data.Lines) {
                                if (_this.productId === response.data.Lines[i].ProductId) {
                                    _this.lineId = response.data.Lines[i].LineId;
                                }
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    },
                    removeFromOrder: function removeFromOrder(event) {
                        var _this2 = this;

                        event.preventDefault();
                        this.quantity = this.quantity - 1;

                        if (this.quantity < 1) {
                            this.showProductItemModifyBtns = false;
                            this.removeItemFromCart();
                        } else {
                            axios.post(apiEndPoints.updateItemInCart + queryString.lineId + this.lineId + queryString.quantity + this.quantity + queryString.checkoutCart).then(function (response) {
                                ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                                ecommerceCommonData.basketItemCount = response.data.TotalItems;
                                ecommerceCommonData.basketBannerDescription = _this2.tokenReplace(basketBannerDesc, basketCountToken, ecommerceCommonData.basketItemCount);
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    },
                    removeItemFromCart: function removeItemFromCart(event) {
                        var _this3 = this;

                        axios.post(apiEndPoints.removeItemFromCart + queryString.lineId + this.lineId + queryString.checkoutCart).then(function (response) {
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            ecommerceCommonData.basketItemCount = response.data.TotalItems;
                            ecommerceCommonData.basketBannerDescription = _this3.tokenReplace(basketBannerDesc, basketCountToken, ecommerceCommonData.basketItemCount);
                        }).catch(function (err) {
                            console.log(err);
                        });
                    },
                    doesProductExistInCart: function doesProductExistInCart(event) {
                        var _this4 = this;

                        var app = this;
                        axios.get(apiEndPoints.getCart + queryString.doesCartExist).then(function (response) {
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            ecommerceCommonData.basketItemCount = response.data.TotalItems;
                            ecommerceCommonData.basketBannerDescription = _this4.tokenReplace(basketBannerDesc, basketCountToken, ecommerceCommonData.basketItemCount);

                            if (response.data.Lines.length > 0) {
                                for (var i in response.data.Lines) {
                                    if (_this4.productId === response.data.Lines[i].ProductId) {
                                        app.quantity = response.data.Lines[i].Quantity;
                                        app.lineId = response.data.Lines[i].LineId;
                                    }

                                    if (_this4.quantity < 1) {
                                        _this4.showProductItemModifyBtns = false;
                                    } else {
                                        _this4.showProductItemModifyBtns = true;
                                    }
                                }
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    },
                    tokenReplace: function tokenReplace(stringToModify, userToken, vueToken) {
                        var modifiedString = stringToModify.replace(userToken, vueToken);
                        return modifiedString;
                    }

                },
                beforeMount: function beforeMount() {},
                mounted: function mounted() {
                    this.doesProductExistInCart();
                    ecommerceCommonData.basketBannerDescription = this.tokenReplace(basketBannerDesc, basketCountToken, ecommerceCommonData.basketItemCount);

                    this.$nextTick(function (event) {
                        var app = this;
                        setTimeout(function () {
                            app.showLoadingSpinner = false;

                            app.isLoad = false;
                        }, 500);
                    });
                }
            });

            Vue.component('basket-btns', {
                props: ['itemQuantity', 'itemPrice', 'itemLineId', 'itemProductId'],
                template: '\n                   <div class="shopping-basket-list__item-ctas">\n                    <a href="#" v-on:click="removeFromOrder" class="shopping-basket-list__decrease-cta"></a>\n                    <a href="#" v-on:click="addToOrder" class="shopping-basket-list__increase-cta">{{ quantity }} x {{ productPrice }}</a>\n                    <a href="#" v-on:click="removeItemFromCart" class="shopping-basket-list__remove-cta">X</a>\n                </div>',
                data: function data() {
                    return {
                        quantity: this.itemQuantity,
                        basketTotal: '£0.00',
                        basketItemCount: 0,
                        lineId: this.itemLineId,
                        productId: this.itemProductId,
                        productPrice: this.itemPrice
                    };
                },
                methods: {
                    getCart: function getCart() {
                        var _this5 = this;

                        axios.get(apiEndPoints.getCart + queryString.doesCartExist).then(function (response) {
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            ecommerceCommonData.basketItemCount = response.data.TotalItems;
                            if (response.data.Lines.length > 0) {
                                for (var i in response.data.Lines) {
                                    if (_this5.productId === response.data.Lines[i].ProductId) {
                                        _this5.quantity = response.data.Lines[i].Quantity;
                                        _this5.lineId = response.data.Lines[i].LineId;
                                        ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                                    }
                                }
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    },
                    addToOrder: function addToOrder() {
                        var _this6 = this;

                        event.preventDefault();

                        axios.post(apiEndPoints.addItemToCart + queryString.productId + this.productId + queryString.quantity + 1 + queryString.checkoutCart).then(function (response) {
                            _this6.quantity++;
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            ecommerceCommonData.basketItemCount = response.data.TotalItems;

                            for (var i in response.data.Lines) {
                                if (_this6.productId === response.data.Lines[i].ProductId) {
                                    _this6.lineId = response.data.Lines[i].LineId;
                                    ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                                }
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    },
                    removeFromOrder: function removeFromOrder() {
                        event.preventDefault();
                        this.quantity = this.quantity - 1;

                        if (this.quantity < 1) {
                            this.removeItemFromCart();
                        } else {
                            axios.post(apiEndPoints.updateItemInCart + queryString.lineId + this.lineId + queryString.quantity + this.quantity + queryString.checkoutCart).then(function (response) {
                                ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                                ecommerceCommonData.basketItemCount = response.data.TotalItems;
                                ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    },
                    removeItemFromCart: function removeItemFromCart() {
                        var _this7 = this;

                        axios.post(apiEndPoints.removeItemFromCart + queryString.lineId + this.lineId + queryString.checkoutCart).then(function (response) {
                            _this7.$el.parentNode.remove(_this7.$el.parentNode);
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                            ecommerceCommonData.basketItemCount = response.data.TotalItems;
                            ecommerceCommonData.basketTotal = response.data.Total.Amount.AsFormattedString;
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }

                },
                mounted: function mounted() {
                    this.getCart();
                }
            });

            new Vue({
                el: '#ecommerce',
                data: {
                    ecommerceCommonData: ecommerceCommonData,
                    moreItems: [],
                    pageSize: 1,
                    loadMorePosition: 2,
                    classifications: []
                },
                methods: {
                    loadMore: function loadMore() {
                        var _this8 = this;

                        this.pageSize = getPageSize ? getPageSize.getAttribute('data-page-size') : 1;
                        var classificationString = document.getElementById('ecommerce').dataset.classification;
                        if (classificationString) {
                            this.classifications.push(classificationString);
                        }

                        var postData = {
                            pageSize: this.pageSize,
                            pageNumber: this.loadMorePosition,
                            classifications: this.classifications
                        };

                        var apiConfig = {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };

                        axios.post(apiEndPoints.loadMore + queryString.pageSize + this.pageSize, postData, apiConfig).then(function (response) {
                            var numberOfPages = response.data.NumberOfPages;
                            var currentPage = response.data.CurrentPageNumber;
                            _this8.loadMorePosition = _this8.loadMorePosition + 1;
                            _this8.moreItems = _this8.moreItems.concat(response.data.Results);
                            if (currentPage >= numberOfPages) {
                                ecommerceCommonData.showLoadMoreBtn = false;
                            } else {
                                ecommerceCommonData.showLoadMoreBtn = true;
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    },
                    checkProductAmount: function checkProductAmount() {
                        var isMultiplePages = document.getElementById('ecommerce').dataset.isMultiplePages;
                        var hasAdditionalPages = isMultiplePages === 'True';
                        if (hasAdditionalPages) {
                            ecommerceCommonData.showLoadMoreBtn = true;
                        } else {
                            ecommerceCommonData.showLoadMoreBtn = false;
                        }
                    }
                },
                mounted: function mounted() {
                    this.checkProductAmount();
                },

                computed: {
                    dynamicComponent: function dynamicComponent() {
                        return {
                            count: 1,
                            template: '' + this.ecommerceCommonData.moreItems
                        };
                    }
                }
            });

            new Vue({
                el: '#ecommerce-basket-banner',
                data: {
                    ecommerceCommonData: ecommerceCommonData
                },
                mounted: function mounted() {}
            });
        })();
    }

    var attachEvents = function attachEvents() {
        ecommerceVue;
    };

    var init = function init() {
        if (isEcommercePage) {
            return attachEvents;
        }
    };

    return {
        init: init
    };
}();
'use strict';

var relatedProducts = function () {

    var selectors = {
        relatedProductsContainerClass: '.reservation-related-products',
        reservationPackagingOffersClass: '.packaging-offers__container',
        productListItemClass: 'reservation-packaging-offers__list-item',
        productListItemSelectedClass: 'reservation-packaging-offers__list-item--selected',
        productCTAs: 'reservation-packaging-offers__item-ctas',
        relatedProductCTAs: 'reservation-related-products__item-ctas',
        productCTAsSelected: 'product-selected',
        relatedProductAtrribute: 'relatedProduct',
        selectedProductsInput: 'SelectedProducts'
    };

    var apiEndPoints = {
        getCart: '/accessapi/cart',
        addItemToCart: '/accessapi/cart/add',
        removeItemFromCart: '/accessapi/cart/remove',
        clearCart: '/accessapi/cart/clear'
    };

    var queryString = {
        productId: '?productId=',
        quantity: '&quantity=',
        checkoutCart: '&cartName=UpsellShop',
        doesCartExist: '?CartName=UpsellShop'
    };

    var cartProducts = [];

    if (document.querySelector(selectors.reservationPackagingOffersClass)) {
        new Vue({
            el: selectors.reservationPackagingOffersClass,
            data: {
                suggestedProductPanels: '',
                relatedProducts: '',
                showRelatedProduct: false,
                selectedPackage: '',
                selectedRelatedProducts: [],
                packageSelected: false,
                selectedProductIds: [],
                cartProducts: [],
                selectedOffers: '',
                cartChecked: false
            },
            methods: {
                showRelatedProducts: function showRelatedProducts(jsonData, parentProduct) {
                    var productItems = document.querySelectorAll('.' + selectors.productListItemClass);

                    this.relatedProducts = jsonData;
                    if (!JSON.stringify(jsonData).includes('[]') && jsonData !== null) {
                        this.showRelatedProduct = true;
                    } else {
                        this.showRelatedProduct = false;
                    }
                    for (var i = 0; i < productItems.length; i++) {
                        if (productItems[i].classList.contains(selectors.productListItemSelectedClass)) {
                            productItems[i].classList.remove(selectors.productListItemSelectedClass);
                            var currentpackages = productItems[i].getElementsByClassName(selectors.productCTAs);
                            for (var i = 0; i < currentpackages.length; i++) {
                                currentpackages[i].classList.remove(selectors.productCTAsSelected);
                            }
                        }
                    }

                    var currentRelatedProducts = document.querySelectorAll('.' + selectors.relatedProductCTAs);
                    for (var i = 0; i < currentRelatedProducts.length; i++) {
                        currentRelatedProducts[i].classList.remove(selectors.productCTAsSelected);
                    }

                    if (this.$refs['packaging-bundle-' + parentProduct].classList.contains(selectors.productListItemClass)) {
                        this.$refs['packaging-bundle-' + parentProduct].classList.add(selectors.productListItemSelectedClass);
                    }

                    this.$refs['packaging-bundle-' + parentProduct].getElementsByClassName(selectors.productCTAs)[0].classList.add(selectors.productCTAsSelected);
                },
                hideRelatedProducts: function hideRelatedProducts() {
                    this.showRelatedProduct = false;
                    event.target.parentElement.classList.remove(selectors.productCTAsSelected);
                    if (event.target.parentElement.parentElement.classList.contains(selectors.productListItemSelectedClass)) {
                        event.target.parentElement.parentElement.classList.remove(selectors.productListItemSelectedClass);
                    }
                    var currentRelatedProducts = document.getElementsByClassName(selectors.relatedProductCTAs);
                    for (var i = 0; i < currentRelatedProducts.length; i++) {
                        currentRelatedProducts[i].classList.remove(selectors.productCTAsSelected);
                    }
                },
                selectPackage: function selectPackage(packageId) {
                    this.selectedPackage = '';
                    this.selectedRelatedProducts = [];
                    this.selectedPackage = packageId;
                },
                deselectPackage: function deselectPackage() {
                    this.selectedPackage = '';
                    this.selectedRelatedProducts = [];
                    var relatedProducts = document.querySelectorAll(selectors.relatedProductCTAs);

                    for (var i = 0; i < relatedProducts.length; i++) {
                        if (relatedProducts[i].classList.contains(selectors.productCTAsSelected)) {
                            relatedProducts[i].classList.remove(selectors.productCTAsSelected);
                        }
                    }
                },
                selectRelatedProduct: function selectRelatedProduct(relatedProduct) {
                    this.selectedRelatedProducts.push(relatedProduct);
                },
                deselectRelatedProduct: function deselectRelatedProduct(relatedProduct) {
                    var itemIndex = this.selectedRelatedProducts.indexOf(relatedProduct);
                    if (itemIndex > -1) {
                        this.selectedRelatedProducts.splice(itemIndex, 1);
                    }
                },
                toggleSelection: function toggleSelection(parentProduct) {
                    if (this.$refs[parentProduct][0].classList.contains(selectors.productCTAsSelected)) {
                        this.$refs[parentProduct][0].classList.remove(selectors.productCTAsSelected);
                    } else {
                        this.$refs[parentProduct][0].classList.add(selectors.productCTAsSelected);
                    }
                },
                submitSelections: function submitSelections() {
                    var packageString = this.selectedPackage.toString() + ',' + this.selectedRelatedProducts.toString();
                    document.getElementById(selectors.selectedProductsInput).setAttribute('value', packageString);
                    document.querySelector('.access-form').submit();
                },
                toggleSubmitText: function toggleSubmitText() {
                    if (this.selectedPackage === '') {
                        this.packageSelected = false;
                    } else {
                        this.packageSelected = true;
                    }
                },
                prepopulateProducts: function prepopulateProducts(event) {
                    var _this = this;

                    var app = this;
                    axios.get(apiEndPoints.getCart + queryString.doesCartExist).then(function (response) {
                        if (response.data.Lines.length > 0) {
                            for (var i = 0; i < response.data.Lines.length; i++) {
                                _this.cartProducts.push(response.data.Lines[i].ProductId);

                                if (!_this.isProductIdAPackagingOffer(response.data.Lines[i].ProductId)) {
                                    continue;
                                }
                                var currentProductId = response.data.Lines[i].ProductId;
                                var remainingProducts = response.data.Lines;
                                var productIds = _this.getProductIdsFromCart(remainingProducts);

                                var relatedProductsJson = JSON.parse(_this.$refs['packaging-bundle-' + response.data.Lines[i].ProductId].dataset[selectors.relatedProductAtrribute]);
                                var relatedProductIds = _this.getProductIdsFromRelatedProductsJson(relatedProductsJson);

                                var itemIndex = productIds.indexOf(currentProductId);

                                if (itemIndex > -1) {
                                    productIds.splice(itemIndex, 1);
                                }

                                if (_this.isCartDevoidOfOtherProducts(productIds) || _this.areRelatedProductsInTheCart(productIds, relatedProductIds)) {
                                    _this.selectPackage(currentProductId);
                                    _this.showRelatedProducts(relatedProductsJson, currentProductId);
                                    _this.toggleSubmitText();
                                }
                            }
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                },
                prepopulateRelatedProducts: function prepopulateRelatedProducts(event) {
                    if (!this.cartChecked && this.relatedProducts !== null) {
                        for (var i = 0; i < this.relatedProducts.length; i++) {
                            if (this.cartProducts.indexOf(this.relatedProducts[i].Id) > -1 && this.$refs[this.relatedProducts[i].Id] !== undefined && this.$refs[this.relatedProducts[i].Id][0] !== undefined && this.$refs[this.relatedProducts[i].Id][0].classList.contains(selectors.relatedProductCTAs)) {
                                this.selectRelatedProduct(this.relatedProducts[i].Id);
                                this.toggleSelection(this.relatedProducts[i].Id);
                            }
                        }
                    }
                    this.cartChecked = true;
                },
                isProductIdAPackagingOffer: function isProductIdAPackagingOffer(productId) {
                    if (this.$refs['packaging-bundle-' + productId] !== undefined && this.$refs['packaging-bundle-' + productId].classList.contains(selectors.productListItemClass)) {
                        return true;
                    }

                    return false;
                },
                getProductIdsFromCart: function getProductIdsFromCart(response) {
                    var arr = [];
                    for (var i in response) {
                        if (response[i].hasOwnProperty("ProductId")) {
                            arr.push(response[i].ProductId);
                        }
                    }
                    return arr;
                },
                getProductIdsFromRelatedProductsJson: function getProductIdsFromRelatedProductsJson(response) {
                    var arr = [];
                    for (var i in response) {
                        if (response[i].hasOwnProperty("Id")) {
                            arr.push(response[i].Id);
                        }
                    }
                    return arr;
                },
                areRelatedProductsInTheCart: function areRelatedProductsInTheCart(responseLines, jsonData) {
                    if (0 === responseLines.length) {
                        return false;
                    }
                    return responseLines.every(function (value) {
                        return jsonData.indexOf(value) >= 0;
                    });
                },
                isCartDevoidOfOtherProducts: function isCartDevoidOfOtherProducts(relatedProducts) {
                    if (0 === relatedProducts.length) {
                        return true;
                    }

                    return false;
                }
            },
            mounted: function mounted() {
                this.prepopulateProducts();
            },
            updated: function updated() {
                this.prepopulateRelatedProducts();
            }
        });
    };

    var init = function init() {
        //return sizeSlider;
    };

    return {
        init: init
    };
}();
'use strict';

var expandingRta = function () {
    var rtaToggleOpenClass = 'expanding-rta__toggle--open';

    var selectors = {
        expandingRta: '.expanding-rta',
        rtaToggle: '.js-rta-toggle',
        expandingSection: '.js-expanding-section',
        expandingSectionCopy: '.js-expanding-section-copy'
    };

    var toggleRta = function toggleRta() {
        if (document.querySelector(selectors.expandingSection)) {
            if (document.querySelector(selectors.expandingSectionCopy)) {
                var sectionHeight = document.querySelector(selectors.expandingSection).offsetHeight;
                var contentHeight = document.querySelector(selectors.expandingSectionCopy).offsetHeight;

                if (sectionHeight === 0) {
                    document.querySelector(selectors.expandingSection).style.height = contentHeight + 20 + 'px';
                    document.querySelector(selectors.rtaToggle).classList.add(rtaToggleOpenClass);
                } else {
                    document.querySelector(selectors.expandingSection).style.height = '0px';
                    document.querySelector(selectors.rtaToggle).classList.remove(rtaToggleOpenClass);
                    setTimeout(function () {
                        document.querySelector(selectors.expandingRta).scrollIntoView();
                    }, 301);
                }
            }
        }
    };

    var attachEvents = function attachEvents() {
        if (document.querySelector(selectors.rtaToggle)) {

            document.querySelector(selectors.rtaToggle).addEventListener('click', function (e) {
                toggleRta();
                e.preventDefault();
            });
        }
    };

    var init = function init() {
        return attachEvents();
    };

    return {
        init: init
    };
}();
'use strict';

var menuToggle = function () {

    var tabletMinWidth = 768;
    var tabletMaxWidth = 1280;
    var viewportWidth = window.innerWidth;

    var selectors = {
        menuToggle: '.js-menu-toggle',
        menuMobileToggle: '.js-mobile-menu-toggle',
        mobileMenu: '.js-mobile-menu',
        tabletMenu: '.js-tablet-menu',
        navOverlay: '.js-global-nav-overlay',
        globalHeader: '.global-header',
        noScroll: '.body--no-scroll',
        menuOpenBodyOverlay: '.mobile-menu-open-overlay'
    };

    var stateClasses = {
        mobileMenuOpenClass: 'global-actions__menu--open',
        tabletMenuOpenClass: 'global-nav--open',
        menuToggleactiveClass: 'menu-toggle--active',
        navOverlayActiveClass: 'global-nav-overlay--active',
        globalHeaderNoScrollClass: 'global-header--sticky',
        noScrollClass: 'body--no-scroll',
        noScrollClassIosFix: 'html--no-scroll'
    };

    window.addEventListener('resize', function () {
        viewportWidth = window.innerWidth;
        detectMenu();
    });

    var detectMenu = function detectMenu() {
        if (document.querySelector(selectors.mobileMenu).classList.contains(stateClasses.mobileMenuOpenClass) || document.querySelector(selectors.tabletMenu).classList.contains(stateClasses.tabletMenuOpenClass)) {
            if (viewportWidth < tabletMinWidth) {
                document.querySelector(selectors.tabletMenu).classList.remove(stateClasses.tabletMenuOpenClass);
                document.querySelector(selectors.navOverlay).classList.remove(stateClasses.navOverlayActiveClass);
                document.querySelector(selectors.mobileMenu).classList.add(stateClasses.mobileMenuOpenClass);
                document.querySelector('body').classList.add(stateClasses.noScrollClass);
                document.querySelector('html').classList.add(stateClasses.noScrollClassIosFix);
            }

            if (viewportWidth >= tabletMinWidth && viewportWidth <= tabletMaxWidth) {
                document.querySelector(selectors.mobileMenu).classList.remove(stateClasses.mobileMenuOpenClass);
                document.querySelector(selectors.tabletMenu).classList.add(stateClasses.tabletMenuOpenClass);
                document.querySelector(selectors.navOverlay).classList.add(stateClasses.navOverlayActiveClass);
                document.querySelector('body').classList.add(stateClasses.noScrollClass);
                document.querySelector('html').classList.add(stateClasses.noScrollClassIosFix);
            }

            if (viewportWidth >= tabletMaxWidth) {
                document.querySelector(selectors.mobileMenu).classList.remove(stateClasses.mobileMenuOpenClass);
                document.querySelector(selectors.tabletMenu).classList.remove(stateClasses.tabletMenuOpenClass);
                document.querySelector(selectors.navOverlay).classList.remove(stateClasses.navOverlayActiveClass);
                document.querySelector(selectors.menuToggle).classList.remove(stateClasses.menuToggleactiveClass);
                document.querySelector('body').classList.remove(stateClasses.noScrollClass);
                document.querySelector('html').classList.remove(stateClasses.noScrollClassIosFix);
            }
        }
    };

    var toggleMobileMenu = function toggleMobileMenu() {
        var targetElement = document.querySelector(selectors.mobileMenu);
        if (targetElement) {
            document.querySelector(selectors.globalHeader).classList.toggle(stateClasses.globalHeaderNoScrollClass);
        }
        document.querySelector('body').classList.toggle(stateClasses.noScrollClass);
        document.querySelector('html').classList.toggle(stateClasses.noScrollClassIosFix);
        document.querySelector(selectors.mobileMenu).classList.toggle(stateClasses.mobileMenuOpenClass);
        if (document.querySelector(selectors.menuOpenBodyOverlay)) {
            if (document.querySelector(selectors.mobileMenu).classList.contains(stateClasses.mobileMenuOpenClass)) {
                document.querySelector(selectors.menuOpenBodyOverlay).style.display = "block";
            } else {
                document.querySelector(selectors.menuOpenBodyOverlay).style.display = "none";
            }
        }
    };

    var toggleTabletMenu = function toggleTabletMenu() {
        if (document.querySelector(selectors.navOverlay) && document.querySelector(selectors.tabletMenu)) {
            document.querySelector(selectors.navOverlay).classList.toggle(stateClasses.navOverlayActiveClass);
            document.querySelector(selectors.tabletMenu).classList.toggle(stateClasses.tabletMenuOpenClass);
        }
        document.querySelector('body').classList.toggle(stateClasses.noScrollClass);
        document.querySelector('html').classList.toggle(stateClasses.noScrollClassIosFix);
    };

    var detectScreenSize = function detectScreenSize() {
        if (viewportWidth >= tabletMinWidth && viewportWidth <= tabletMaxWidth) {
            toggleTabletMenu();
        } else if (viewportWidth < tabletMinWidth) {
            toggleMobileMenu();
        }
    };

    var attachEvents = function attachEvents() {
        if (document.querySelector(selectors.menuToggle)) {
            document.querySelector(selectors.menuToggle).addEventListener('click', function () {
                detectScreenSize();
                document.querySelector(selectors.menuToggle).classList.toggle(stateClasses.menuToggleactiveClass);
            });
        }
    };

    var init = function init() {
        return attachEvents();
    };

    return {
        init: init
    };
}();
"use strict";

var subMenus = function () {
    var tabletMinWidth = 768;
    var tabletMaxWidth = 1280;
    var viewportWidth = window.innerWidth;

    var selectors = {
        globalNav: ".global-nav",
        globalNavListItem: ".global-nav__list-item",
        globalNavLink: ".global-nav__item-link",
        globalNavSubMenu: ".global-nav__sub-menu"
    };

    var stateClasses = {
        globalNavSubMenuActiveClass: "global-nav__sub-menu--open",
        globalNavListItemExpandable: "global-nav__list-item--expandable",
        globalNavListItemOpen: "global-nav__list-item--expandable-open"
    };

    var attachEvents = function attachEvents() {
        if (document.querySelector(selectors.globalNav)) {
            if (viewportWidth >= tabletMaxWidth) {
                var linkItems = document.querySelectorAll(selectors.globalNavLink);
                var allSubMenus = document.querySelectorAll(selectors.globalNavSubMenu);

                var _loop = function _loop() {
                    var item = linkItems[i];
                    var nextSubMenu = item.parentNode.querySelector(selectors.globalNavSubMenu);
                    item.addEventListener('mouseover', function () {
                        var subMenus = document.querySelectorAll(selectors.globalNavSubMenu);
                        for (var i = 0; i < subMenus.length; i++) {
                            subMenus[i].classList.remove(stateClasses.globalNavSubMenuActiveClass);
                        }
                        if (nextSubMenu) {
                            nextSubMenu.classList.add(stateClasses.globalNavSubMenuActiveClass);
                        }
                    });
                };

                for (var i = 0; i < linkItems.length; i++) {
                    _loop();
                }
                document.querySelector('body').addEventListener('click', function () {
                    for (var i = 0; i < allSubMenus.length; i++) {
                        allSubMenus[i].classList.remove(stateClasses.globalNavSubMenuActiveClass);
                    }
                }, false);
                for (var i = 0; i < allSubMenus.length; i++) {
                    allSubMenus[i].addEventListener('click', function () {
                        event.stopPropagation();
                    }, false);
                }
            }
            if (viewportWidth < tabletMaxWidth) {
                var _linkItems = document.querySelectorAll(selectors.globalNavLink);

                var _loop2 = function _loop2() {
                    var item = _linkItems[i];
                    var nextSubMenu = item.parentNode.querySelector(selectors.globalNavSubMenu);
                    var linkParentMenuItem = item.parentNode;
                    if (nextSubMenu) {
                        item.parentNode.classList.add(stateClasses.globalNavListItemExpandable);
                    }
                    linkParentMenuItem.addEventListener("click", function () {
                        if (nextSubMenu) {
                            var _subMenus = document.querySelectorAll(selectors.globalNavSubMenu);
                            var navListItems = document.querySelectorAll(selectors.globalNavListItem);
                            if (linkParentMenuItem.classList.contains(stateClasses.globalNavListItemOpen) && nextSubMenu.classList.contains(stateClasses.globalNavSubMenuActiveClass)) {
                                linkParentMenuItem.classList.remove(stateClasses.globalNavListItemOpen);
                                nextSubMenu.classList.remove(stateClasses.globalNavSubMenuActiveClass);
                            } else {
                                for (var i = 0; i < _subMenus.length; i++) {
                                    var menu = _subMenus[i];
                                    menu.classList.remove(stateClasses.globalNavSubMenuActiveClass);
                                }

                                for (var i = 0; i < navListItems.length; i++) {
                                    var listItem = navListItems[i];
                                    listItem.classList.remove(stateClasses.globalNavListItemOpen);
                                }

                                linkParentMenuItem.classList.add(stateClasses.globalNavListItemOpen);
                                nextSubMenu.classList.add(stateClasses.globalNavSubMenuActiveClass);
                            }
                        }
                    });
                    item.addEventListener("click", function (e) {
                        e.stopPropagation();
                    });
                };

                for (var i = 0; i < _linkItems.length; i++) {
                    _loop2();
                }
                var subMenuLinks = document.querySelectorAll(".global-nav__sub-menu-item-link");

                var _loop3 = function _loop3() {
                    var subLinkItem = subMenuLinks[i];
                    subLinkItem.addEventListener("click", function (e) {
                        e.stopPropagation();
                        subLinkItem.click();
                    });
                };

                for (var i = 0; i < subMenuLinks.length; i++) {
                    _loop3();
                }
            }
        }
    };

    var init = function init() {
        return attachEvents();
    };

    return {
        init: init
    };
}();
'use strict';



var contentImageGallery = function () {

    var selectors = {
        contentImageGalleryClass: '.content-image-gallery',
        contentImageSlideControlsClass: '.content-image-gallery__controls',
        contentImageSlideControls: '.content-image-gallery__controls',
        contentImageCurrentSlideClass: '.content-image-gallery__current-slide',
        contentImageGallerySlideCount: '.content-image-gallery__slide-count',
        contentImageGalleryNextButton: '.content-image-gallery__slider-next-btn',
        contentImageGalleryPrevButton: '.content-image-gallery__slider-prev-btn'
    };

    var modifiers = {
        activeClass: '--active',
        hiddenClass: '--hidden'
    };

    var contentImageGallerySetup = function contentImageGallerySetup() {
        var imageGallery = document.querySelector(selectors.contentImageGalleryClass);

        if (imageGallery) {

            var slider = tns({
                container: selectors.contentImageGalleryClass,
                items: 1,
                controls: false,
                nav: false,
                loop: true,
                center: true,
                mode: "gallery",
                startIndex: 0,
                touch: true
            });

            var slideCount = slider.getInfo().slideCount;
            var currentSlide = slider.getInfo().displayIndex;

            if (slideCount < 2) {
                var galleryControls = document.querySelector(selectors.contentImageSlideControlsClass);
                galleryControls.classList.add(selectors.contentImageSlideControlsClass.substring(1) + modifiers.hiddenClass);
            }

            var paginationCurrentSlideElement = document.querySelector(selectors.contentImageCurrentSlideClass);
            var paginationTotalSlidesElement = document.querySelector(selectors.contentImageGallerySlideCount);

            paginationTotalSlidesElement.innerHTML = slideCount;
            paginationCurrentSlideElement.innerHTML = currentSlide;

            document.querySelector(selectors.contentImageGalleryNextButton).onclick = function () {
                slider.goTo('next');
                var currentSlide = slider.getInfo().displayIndex;
                paginationCurrentSlideElement.innerHTML = currentSlide;
            };

            document.querySelector(selectors.contentImageGalleryPrevButton).onclick = function () {
                slider.goTo('prev');
                var currentSlide = slider.getInfo().displayIndex;
                paginationCurrentSlideElement.innerHTML = currentSlide;
            };
        }
    };

    var init = function init() {
        return contentImageGallerySetup();
    };

    return {
        init: init
    };
}();
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var googleMap = function () {

    var selectors = {
        currentLocationId: 'current-location',
        googleMapId: 'google-map',
        googleSearchPanelId: 'google-search-panel',
        googleMapInfoId: 'google-map-info',
        allLocationsId: 'all-locations',
        searchInputId: 'search-input',
        searchIconBtn: 'search-icon-btn',
        searchErrorId: 'storage-quote-search-error',
        googleMapFullScreenInfoClass: 'storage-quote__full-screen-content',
        googleMapFullScreenInfoHiddenClass: 'storage-quote__full-screen-content--hidden',
        googleMapFindNearestStoreClass: 'storage-quote__closest-store-link',
        searchErrorHiddenClass: 'storage-quote__search-error--hidden',
        currentLocationHiddenClass: 'current-location__button--hidden',
        storageQuoteContentMapClass: 'storage-quote__content-map',
        storageQuoteContentMapHiddenClass: 'storage-quote__content-map--hidden',
        storageQuoteContentMapFullWidthClass: 'storage-quote__content-map--full-width',
        storageQuoteInfoHiddenClass: 'storage-quote__info--hidden',
        storageQuoteSearchAlignTopClass: 'storage-quote__content-search--align-top',
        storageQuoteInfoDetailsClass: 'storage-quote__info-details',
        storageQuoteContentSearchClass: 'storage-quote__content-search',
        googleMapBackgroundImageHide: 'storage-quote__content-bg--hidden',
        storageQuoteContentSearchHiddenClass: 'storage-quote__content-search--desktop-hidden',
        storeFinder: '.store-finder',
        selectStoreBtnClass: '.storage-quote__info-btn',
        storeLocationsListContainer: 'store-locations',
        storeLocationsListContainerHiddenClass: 'store-locations--hidden',
        storeLocationsListClass: '.store-locations__list',
        showStoreResultsClass: '.storage-quote__show-results',
        storeemptylist: '.store-empty-list'
    };

    var markers = [];
    var markerArray = [];
    var infoLabel;

    var mapInfoWindow = new google.maps.InfoWindow({
        content: infoLabel,
        pixelOffset: new google.maps.Size(0, 160)
    });

    var initAutocomplete = function initAutocomplete() {
        var gMap = document.querySelector(".js-map");

        if (gMap) {
            var _ref;

            var enableEnterKey = function enableEnterKey(input) {
                var _addEventListener = input.addEventListener;

                var addEventListenerWrapper = function addEventListenerWrapper(type, listener) {
                    if (type === "keydown") {
                        var _listener = listener;
                        listener = function listener(event) {
                            var suggestion_selected = document.getElementsByClassName('pac-item-selected').length > 0;

                            if (event.which === 13 && !suggestion_selected) {
                                var e = JSON.parse(JSON.stringify(event));
                                e.which = 40;
                                e.keyCode = 40;
                                _listener.apply(input, [e]);
                            }

                            _listener.apply(input, [event]);
                        };
                    }
                    _addEventListener.apply(input, [type, listener]);
                };

                input.addEventListener = addEventListenerWrapper;
            };

            var googleMapsCallBack = function googleMapsCallBack(results, status) {
                if (status === google.maps.places.AutocompleteService.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                    }
                }
            };

            var showMap = function showMap() {
                document.getElementById(selectors.googleMapId).classList.remove(selectors.storageQuoteContentMapHiddenClass);
                document.querySelector("." + selectors.storeLocationsListContainer).classList.remove(selectors.storeLocationsListContainerHiddenClass);

                removeBackgroundImage();
            };

            var openInfoWindow = function openInfoWindow(storeInfo) {
                var infoLabel = '<div style="font-weight:bold; font-size:14px; line-height: 1.29; font-weight:800; color:#2f3245">' + storeInfo.title + '</div>';
                mapInfoWindow.setContent(infoLabel);
                mapInfoWindow.open(map, storeInfo);
                infoWindow(storeInfo);
                document.getElementById(selectors.googleMapInfoId).classList.remove(selectors.storageQuoteInfoHiddenClass);
            };

            var showMarkers = function showMarkers(url, searchLatLng) {
                var isIe11 = !!window.MSInputMethodContext && !!document.documentMode;
                removeMarkers();
                getJSON(url, function (err, data) {

                    if (err !== null) {
                        console.info('Something went wrong: ' + err);
                    } else {
                        if (isIe11) {
                            var pins = JSON.parse(data);
                        } else {
                            var pins = data;
                        }

                        var marker;

                        console.log("pinssss"+ pins.length);
                        
                        
                        if(pins.length > 0){
                        	var empty = document.querySelector(selectors.storeemptylist);
                            
                            empty.setAttribute("style", "display: none;");
                        	 var locationListContainer = document.querySelector(selectors.storeLocationsListClass);
                             locationListContainer.setAttribute("style", "display: block;");

                             for (var i = 0; i < pins.length; i++) {
                            var obj = pins[i];

                            locationList(obj, markers, i);

                            var selectStoreUrl = window.location.href.split('?')[0] + "?StoreId=" + obj.Information.StoreId;

                            if (obj.Location.Latitude && obj.Location.Longitude) {

                                marker = new MarkerWithLabel({
                                    position: new google.maps.LatLng(obj.Location.Latitude, obj.Location.Longitude),
                                    labelContent: obj.Information.Title + ' store',
                                    labelAnchor: new google.maps.Point(18, -1),
                                    labelVisible: false,
                                    icon: '/dist/assets/icons/location2dtodostorage.com.svg',
                                    labelClass: "google-maps-label-stying",
                                    lat: obj.Location.Latitude,
                                    lng: obj.Location.Longitude,
                                    map: map,
                                    animation: google.maps.Animation.DROP,
                                    selectStoreUrl: selectStoreUrl,
                                    title: obj.Information.Title,
                                    link: obj.Information.Link,
                                    address: obj.Information.Address,
                                    postcode: obj.Information.PostCode,
                                    telephone: obj.Information.Telephone,
                                    email: obj.Information.Email
                                });

                                markerArray.push(marker);
                                bounds.extend(marker.getPosition());
                                map.fitBounds(bounds);
                                var pinListId = i + 1;
                                var pinListItem = document.querySelector('.js-list-pin-id-' + pinListId);

                                document.addEventListener('click', function () {
                                    if (event.target.parentElement.matches('.store-locations__list-link')) {
                                        event.preventDefault();
                                        var clickedEl = event.target.parentElement;
                                        var pinId = clickedEl.getAttribute("data-pin-id");
                                        google.maps.event.trigger(markerArray[pinId], 'click');
                                        infoWindow(markerArray[pinId]);
                                    }
                                }, false);

                                google.maps.event.addListener(marker, "click", function (e) {
                                    openInfoWindow(this);
                                });

                                marker.addListener('click', function () {
                                    if (document.querySelector("." + selectors.storageQuoteContentMapFullWidthClass)) {
                                        isStoreFinder ? window.location.href = this.link : window.location.href = this.selectStoreUrl;
                                    } else {
                                        for (var i = 0; i < markerArray.length; i++) {
                                            markerArray[i].setIcon('/dist/assets/icons/location2dtodostorage.com.svg');
                                        }

                                        this.setIcon('/dist/assets/icons/location2dtodostorage.com.svg');
                                        this.setAnimation(4);
                                        _ictt.push(['_track']);
                                    }
                                });
                            }
                        }
                        }else{
               
                       

                        	document.getElementById(selectors.searchErrorId).classList.remoc(selectors.searchErrorHiddenClass);
            
            	 var locationListContainer = document.querySelector(selectors.storeLocationsListClass);
                 locationListContainer.setAttribute("style", "display: none;");
                        }

                       
                    }
                });
            };

            var getLabels = function getLabels() {

                var searchPanel = document.getElementById(selectors.googleSearchPanelId);

                if (searchPanel) {
                    var jsonData = searchPanel.getAttribute('data-labels');
                    var parsedJsonData = JSON.parse(jsonData);
                    return parsedJsonData;
                }
            };

            var toggleCurrentLocationLink = function toggleCurrentLocationLink() {
                if (navigator.geolocation) {
                    document.getElementById(selectors.currentLocationId).classList.remove(selectors.currentLocationHiddenClass);
                } else {
                    document.getElementById(selectors.currentLocationId).classList.add(selectors.currentLocationHiddenClass);
                }
            };

            var removeMarkers = function removeMarkers() {
                for (var i = 0; i < markerArray.length; i++) {
                    markerArray[i].setMap(null);
                }

                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                bounds = new google.maps.LatLngBounds(null);
            };

            var getCurrentLocation = function getCurrentLocation() {
                if (navigator.geolocation) {
                    var success = function success(position) {
                        showMap();
                        var coordinates = position.coords;
                        setCurrentLocation(coordinates);
                    };

                    var error = function error(err) {
                        console.warn('ERROR(' + err.code + '): ' + err.message);
                    };

                    var geoSettings = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };

                    navigator.geolocation.getCurrentPosition(success, error, geoSettings);
                } else {
                    console.info("Geolocation is not supported.");
                }
            };

            var getCurrentVisibleMapLatLng = function getCurrentVisibleMapLatLng() {
                var getMapCenter = map.getCenter();
                var getMapCenterString = getMapCenter.toString();
                var coordinates = getMapCenterString.split(",");
                var lat = coordinates[0].slice(1);
                var lng = coordinates[1].slice(1, -1);

                return {
                    lat: lat,
                    lng: lng
                };
            };

            var listenForCurrentLocationClick = function listenForCurrentLocationClick() {
                document.getElementById(selectors.currentLocationId).addEventListener("click", getCurrentLocation);
            };

            var listenForAllLocationsClick = function listenForAllLocationsClick() {
                document.getElementById(selectors.allLocationsId).addEventListener("click", fullWidthMap);
            };

            var listenForClosestLocationsClick = function listenForClosestLocationsClick() {
                document.querySelector('.' + selectors.googleMapFindNearestStoreClass).addEventListener("click", nearestStoresMap);
            };

            var removeBackgroundImage = function removeBackgroundImage() {
                document.getElementById(selectors.googleSearchPanelId).style.backgroundImage = 'none';
            };

            var showBackgroundImage = function showBackgroundImage() {
                document.getElementById(selectors.googleSearchPanelId).style.backgroundImage = backgroundImageUrl;
            };

            var infoWindow = function infoWindow(location) {
                var labels = getLabels();
                var infoTemplate;

                document.querySelector("." + selectors.storeLocationsListContainer).classList.add(selectors.storeLocationsListContainer + '--closed');
                document.querySelector("." + selectors.storeLocationsListContainer).classList.remove(selectors.storeLocationsListContainer + '--open');
                if (isStoreFinder) {
                    infoTemplate = '<span class="storage-quote__info-offset-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\n                <path fill="#13B5EA" d="M11.6721124,22 C7.22403746,17.2711566 5,12.8285274 5,8.67211238 C5,4.98720646 7.98720646,2 11.6721124,2 C15.3570183,2 18.3442248,4.98720646 18.3442248,8.67211238 C18.3442248,12.8285274 16.1201873,17.2711566 11.6721124,22 Z M11.6721124,10.8961498 C12.9004144,10.8961498 13.8961498,9.90041435 13.8961498,8.67211238 C13.8961498,7.44381041 12.9004144,6.44807492 11.6721124,6.44807492 C10.4438104,6.44807492 9.44807492,7.44381041 9.44807492,8.67211238 C9.44807492,9.90041435 10.4438104,10.8961498 11.6721124,10.8961498 Z"/>\n                </svg>\n                </span><div class="storage-quote__info-title"><a href="' + location.link + '">' + location.title + '</a></div>\n                <div class="storage-quote__info-address">' + location.address + '</div>\n                <div class="storage-quote__info-postcode">' + location.postcode + '</div>\n                <div class="storage-quote__info-tel"><span class="storage-quote__info-icon">\n                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n             \n                </svg>\n                </span><span class="InfinityNumber clickable"> ' + location.telephone + '</span></div>\n                <div class="storage-quote__info-email"><span class="storage-quote__info-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="#004b8d" d="M2,20 L22,20 L22,4 L2,4 L2,20 Z M4.505,6 L19.496,6 L12,12.662 L4.505,6 Z M20,8.226 L20,18 L4,18 L4,8.226 L12,15.338 L20,8.226 Z"/>\n                </svg>\n                </span><a href=\'mailto:' + location.email + '\'>' + location.email + '</a></div>\n                <div class="storage-quote__info-btn"><a href=\'' + location.link + '\'>' + labels.ViewStoreInfo + ' <div class="storage-quote__info-btn-button"><span class="storage-quote__info-btn-icon">\n                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <polygon fill="#FFFF" points="13 7 11.586 8.414 14.172 11 6 11 6 13 14.172 13 11.586 15.586 13 17 17.999 11.999"/>\n                 </svg>\n                 </span></div></a></div>';
                } else {

                    infoTemplate = '<span class="storage-quote__info-offset-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\n                <path fill="#4CAF50" d="M11.6721124,22 C7.22403746,17.2711566 5,12.8285274 5,8.67211238 C5,4.98720646 7.98720646,2 11.6721124,2 C15.3570183,2 18.3442248,4.98720646 18.3442248,8.67211238 C18.3442248,12.8285274 16.1201873,17.2711566 11.6721124,22 Z M11.6721124,10.8961498 C12.9004144,10.8961498 13.8961498,9.90041435 13.8961498,8.67211238 C13.8961498,7.44381041 12.9004144,6.44807492 11.6721124,6.44807492 C10.4438104,6.44807492 9.44807492,7.44381041 9.44807492,8.67211238 C9.44807492,9.90041435 10.4438104,10.8961498 11.6721124,10.8961498 Z"/>\n                </svg>\n                </span><div class="storage-quote__info-title"><a href=\'' + location.link + '\'>' + location.title + '</a></div>\n                <div class="storage-quote__info-link"><a href=\'' + location.link + '\'>' + labels.ViewStoreInfo + '</a></div>\n                <div class="storage-quote__info-address">' + location.address + '</div>\n                <div class="storage-quote__info-postcode">' + location.postcode + '</div>\n                <div class="storage-quote__info-tel"><span class="storage-quote__info-icon">\n                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                  <polygon fill="#004b8d" points="18.436 2 12.887 7.545 14.684 9.341 9.35 14.671 7.55 12.875 2 18.419 3.798 20.216 3.778 20.236 5.543 22 22 5.56 22 5.559 20.267 3.828 20.235 3.796"/>\n                </svg>\n                </span> <span class="InfinityNumber clickable">' + location.telephone + '</span></div>\n                <div class="storage-quote__info-email"><span class="storage-quote__info-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <path fill="#004b8d" d="M2,20 L22,20 L22,4 L2,4 L2,20 Z M4.505,6 L19.496,6 L12,12.662 L4.505,6 Z M20,8.226 L20,18 L4,18 L4,8.226 L12,15.338 L20,8.226 Z"/>\n                </svg>\n                </span><a href=\'mailto:' + location.email + '\'>' + location.email + '</a></div>\n                <div class="storage-quote__info-btn"><a href=\'' + location.selectStoreUrl + '\'>' + labels.SelectText + ' <div class="storage-quote__info-btn-button"><span class="storage-quote__info-btn-icon">\n                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                <polygon fill="#FFFF" points="13 7 11.586 8.414 14.172 11 6 11 6 13 14.172 13 11.586 15.586 13 17 17.999 11.999"/>\n                 </svg>\n                 </span></div></a></div>';
                }

                document.getElementById(selectors.googleMapInfoId).classList.remove(selectors.storageQuoteInfoHiddenClass);

                document.querySelector("." + selectors.storageQuoteInfoDetailsClass).innerHTML = infoTemplate;

                document.querySelector(selectors.selectStoreBtnClass).addEventListener('click', function () {
                    window.dataLayer.push({ 'event': 'StoreSelect' });
                });

                document.querySelector(selectors.showStoreResultsClass).addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector("." + selectors.storeLocationsListContainer).classList.remove(selectors.storeLocationsListContainer + '--closed');
                    document.querySelector("." + selectors.storeLocationsListContainer).classList.add(selectors.storeLocationsListContainer + '--open');
                    document.querySelector(".storage-quote__info").classList.add("storage-quote__info--hidden");
                });
            };

            var getQueryString = function getQueryString() {
                var queryString = window.location.hash.substr(2);

                if (queryString) {
                    showMap();
                    var queryStringObj = parseQuery(queryString);
                    updateSearchTerm(searchBox, queryStringObj.term);
                    map.setZoom(0);
                }
            };

            var parseQuery = function parseQuery(queryString) {
                var query = {};

                var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
                return query;
            };

            var buildQueryString = function buildQueryString(lat, lng, term) {
                var queryTerm = term !== "" || undefined ? '&term=' + term : "";
                var queryString = '?lat=' + lat + '&lng=' + lng + queryTerm;
                return queryString;
            };

            var updateSearchTerm = function updateSearchTerm(searchBox, term) {
                searchBox.value = term;
            };

            var resetMapIcons = function resetMapIcons(markerArray) {
                for (var i = 0; i < markerArray.length; i++) {
                    markerArray[i].setIcon('/dist/assets/icons/location2dtodostorage.com.svg');
                }
            };

            var getHeroSearchQuery = function getHeroSearchQuery() {
                var searchQuery = JSON.parse(sessionStorage.heroSearchQuery);

                if (searchQuery) {
                    var searchQueryAddress = searchQuery.formatted_address;
                    var getSearchBox = document.getElementById('search-input');
                    getSearchBox.value = searchQueryAddress;

                    if (searchQuery.geometry) {
                        showMap();
                        removeMarkers();

                        markerArray.push(new google.maps.Marker({
                            map: map,
                            title: searchQuery.name,
                            position: searchQuery.geometry.location,
                            icon: {
                                url: '/dist/assets/icons/map-thumbnail-x1.png'
                            },
                            zIndex: 0
                        }));

                        bounds.extend(searchQuery.geometry.location);
                        var searchLatLng = new google.maps.LatLng({ lat: searchQuery.geometry.location.lat, lng: searchQuery.geometry.location.lng });

                        showMarkers('/findby?lat=' + searchQuery.geometry.location.lat + '&lon=' + searchQuery.geometry.location.lng);


                        console.log("hiiiiii"+show);
                    }
                }
            };

            //Makes sure location accuracy is high


            var fullWidthMap = function fullWidthMap(markerArray) {
                // Switch the layout to only show the map full screen.
                document.querySelector('.' + selectors.storageQuoteContentSearchClass).classList.add(selectors.storageQuoteContentSearchHiddenClass);
                document.querySelector('.' + selectors.storageQuoteContentMapClass).classList.add(selectors.storageQuoteContentMapFullWidthClass);
                document.querySelector('.' + selectors.storageQuoteContentMapClass).classList.remove(selectors.storageQuoteContentMapHiddenClass);
                document.getElementById(selectors.currentLocationId).classList.add(selectors.currentLocationHiddenClass);
                document.querySelector('.' + selectors.googleMapFullScreenInfoClass).classList.remove(selectors.googleMapFullScreenInfoHiddenClass);

                showMarkers('/accessapi/stores/getallstores');
                map.fitBounds(bounds);
            };

            var nearestStoresMap = function nearestStoresMap() {
                document.querySelector('.' + selectors.storageQuoteContentSearchClass).classList.remove(selectors.storageQuoteContentSearchHiddenClass);
                document.querySelector('.' + selectors.storageQuoteContentMapClass).classList.remove(selectors.storageQuoteContentMapFullWidthClass);
                document.querySelector('.' + selectors.storageQuoteContentMapClass).classList.add(selectors.storageQuoteContentMapHiddenClass);
                document.getElementById(selectors.currentLocationId).classList.remove(selectors.currentLocationHiddenClass);
                document.querySelector('.' + selectors.googleMapFullScreenInfoClass).classList.add(selectors.googleMapFullScreenInfoHiddenClass);
                showBackgroundImage();
            };

            var map = new google.maps.Map(gMap, (_ref = {
                center: { lat: 9.0820, lng: 8.6753 },
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }, _defineProperty(_ref, 'mapTypeId', "roadmap"), _defineProperty(_ref, 'closeBoxUrl', ""), _ref));

            var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(6.5244, 3.3792), new google.maps.LatLng(9.0765, 7.3986));

            var input = document.getElementById(selectors.searchInputId);
            var searchBox = new google.maps.places.Autocomplete(input, { bounds: defaultBounds });
            var searchIconBtn = document.getElementById(selectors.searchIconBtn);
            var storeDisplayCount = gMap.getAttribute('data-store-display-count');
            var storeServicesFilter = gMap.getAttribute('data-services-filter');
            var backgroundImageUrl = document.getElementById(selectors.googleSearchPanelId).style.background;
            var isStoreFinder = document.querySelector(selectors.storeFinder);
            var showResultsBtn = document.querySelector(selectors.showStoreResultsClass);

            searchBox.setComponentRestrictions({ country: ["NG"] });
            enableEnterKey(input);

            var bounds = new google.maps.LatLngBounds();
            var searchLatLng = {};
            var pins = {};

            var getJSON = function getJSON(url, callback) {

                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr.open('GET', url, true);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    var status = xhr.status;
                    if (status === 200) {
                        callback(null, xhr.response);
                    } else {
                        callback(status, xhr.response);
                    }
                };
                xhr.send();
            };

            var locationList = function locationList(location, markers, listItemNumber) {

                var locationListContainer = document.querySelector(selectors.storeLocationsListClass);
                var template = '\n  <a href="#" data-pin-id="' + (listItemNumber + 1) + '" class="store-locations__list-link">\n                        <li class="store-locations__list-item">\n                            <div class="store-locations__item-info">\n                                <h3 class="store-locations__item-header">' + location.Information.Title + '</h3>\n                                <p class="store-locations__item-details">' + location.Information.Address + ' ' + location.Information.Locality + ' ' + location.Information.PostCode + '</p>\n                            </div>\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                                <polygon fill="#2f3245" points="13 7 11.586 8.414 14.172 11 6 11 6 13 14.172 13 11.586 15.586 13 17 17.999 11.999"></polygon>\n                            </svg>\n                        </li>\n                    </a>';
                locationListContainer.innerHTML += template;
            };
            console.log(locationList);
            toggleCurrentLocationLink();
            getQueryString();

            google.maps.event.addListener(map, "idle", function () {
                var searchTerm = input.value;
                var currentLatLngObj = getCurrentVisibleMapLatLng();
                var queryTerm = searchTerm !== "" ? '&term=' + searchTerm : "";
            });

            searchBox.addListener('place_changed', function () {
                var locationListContainer = document.querySelector(selectors.storeLocationsListClass);
                locationListContainer.innerHTML = '';

                window.dataLayer.push({
                    'event': 'StoreSearch'
                });
                document.getElementById(selectors.searchErrorId).classList.add(selectors.searchErrorHiddenClass);
                document.querySelector("." + selectors.storeLocationsListContainer).classList.remove(selectors.storeLocationsListContainer + '--closed');
                document.querySelector("." + selectors.storeLocationsListContainer).classList.add(selectors.storeLocationsListContainer + '--open');
                document.getElementById(selectors.googleMapInfoId).classList.add(selectors.storageQuoteInfoHiddenClass);

                var place = searchBox.getPlace();
                var getMapCenter = map.getCenter();
                if (place.geometry) {
                    showMap();
                    removeMarkers();
                    markerArray = [];
                    sessionStorage.setItem('heroSearchQuery', JSON.stringify(place));

                    markerArray.push(new google.maps.Marker({
                        map: map,
                        title: place.name,
                        position: place.geometry.location,
                        icon: {
                            url: '/dist/assets/icons/map-thumbnail-x1.png',
                            labelOrigin: new google.maps.Point(55, 12)
                        },
                        zIndex: 0
                    }));

                    bounds.extend(place.geometry.location);
                    var searchLatLng = new google.maps.LatLng({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
                   
                    showMarkers('/findby?lat=' + place.geometry.location.lat() + '&lon=' + place.geometry.location.lng());
                    
                }
            });

            ;

            var options = {
                enableHighAccuracy: true
            };

            listenForCurrentLocationClick();
            listenForAllLocationsClick();
            listenForClosestLocationsClick();
            getHeroSearchQuery();
        };
    };

    var init = function init() {
        return initAutocomplete();
    };

    return {
        init: init
    };
}();
'use strict';

var pageListCarousel = function () {

    var selectors = {
        pageImageCarouselClass: '.page-list-carousel',
        pageImageSlideControls: '.page-list-carousel__controls',
        pageImageCarouselNextButton: '.store-banner__slider-next-btn',
        pageImageCarouselPrevButton: '.store-banner__slider-prev-btn',
        experienceEditor: '.experience-editor'
    };

    var stateClasses = {
        pageImageSlideControlsClass: 'page-list-carousel__controls'
    };

    var modifiers = {
        activeClass: '--active',
        hiddenClass: '--hidden'
    };

    var initpageImageCarousel = function initpageImageCarousel() {
        var imageCarousel = document.querySelector(selectors.pageImageCarouselClass);
        var isExperienceEditor = document.querySelector(selectors.experienceEditor);
        if (imageCarousel) {
            var slider = tns({
                container: selectors.pageImageCarouselClass,
                items: 1,
                arrowKeys: true,
                nav: false,
                controlsPosition: "bottom",
                controlsText: ["", ""],
                edgePadding: 20,
                gutter: 20,
                startIndex: 0,
                touch: true,
                loop: false,
                responsive: {
                    768: {
                        items: 3,
                        edgePadding: 0,
                        fixedWidth: 400
                    }
                }
            });
        }
    };

    var init = function init() {
        return initpageImageCarousel();
    };

    return {
        init: init
    };
}();
'use strict';

var processForms = function () {
    var processForm = document.querySelector('.process-form-container__form');
    var datePicker = document.getElementById('datepicker');

    var createDatePicker = function createDatePicker() {
        var currentDate = new Date();

        var picker = new Pikaday({
            field: datePicker,
            firstDay: 1,
            minDate: new Date()
        });
    };

    var init = function init() {
        if (processForm) {
            createDatePicker();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var promosCarousel = function () {

    var selectors = {
        promosCarouselContainerClass: '.promos-list',
        promosCarouselClass: '.promos-list-carousel',
        promosSlideControls: '.promos-list-carousel__controls'
    };

    var modifiers = {
        activeClass: '--active',
        hiddenClass: '--hidden'
    };

    var initPromosCarousel = function initPromosCarousel() {
        var imageCarousels = document.querySelectorAll(selectors.promosCarouselContainerClass);
        if (imageCarousels) {
            for (var i = 0; i < imageCarousels.length; i++) {
                var slider = tns({
                    container: imageCarousels[i].querySelector(selectors.promosCarouselClass),
                    items: 1,
                    arrowKeys: true,
                    nav: false,
                    controlsPosition: "bottom",
                    controlsText: ["", ""],
                    edgePadding: 20,
                    gutter: 20,
                    fixedWidth: 260,
                    startIndex: 0,
                    touch: true,
                    loop: false,
                    responsive: {
                        768: {
                            edgePadding: 50,
                            gutter: 40,
                            fixedWidth: 320
                        },
                        1024: {
                            edgePadding: 80,
                            fixedWidth: 400
                        }
                    }
                });
            }
        }
    };

    var init = function init() {
        return initPromosCarousel();
    };

    return {
        init: init
    };
}();
'use strict';

var reserveEditDetailsSwitcher = function () {

    var selectors = {
        savedDetailsID: '#saved-details',
        editDetailsID: '#edit-details',
        editDetailsLink: '.js-edit-details-link',
        saveDetailsLink: '.js-save-details'
    };

    var savedDetails = document.querySelectorAll(selectors.savedDetailsID);

    var attachEvents = function attachEvents() {
        document.querySelector(selectors.editDetailsLink).addEventListener('click', function (e) {
            document.querySelector(selectors.savedDetailsID).style.display = 'none';
            document.querySelector(selectors.editDetailsID).style.display = 'block';
            e.preventDefault();
        });
    };

    var init = function init() {
        if (savedDetails.length > 0) {
            return attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var editDetails = function () {
    var editDetailsForm = document.querySelector('.edit-details__form');
    var formfields = document.querySelectorAll('.edit-details__form-input');
    var submitBtn = document.querySelector('.edit-details__submit-cta');
    var validClass = 'edit-details__form-input--valid';
    var invalidClass = 'edit-details__form-input--invalid';
    var hideErrorMessageClass = 'edit-details__error-label--hide';

    var attachEvents = function attachEvents() {
        submitBtn.addEventListener('click', function (e) {
            var errorCount = 0;

            formfields.forEach(function (field) {
                var errorMessage = field.parentNode.querySelector('.edit-details__error-label');

                if (field.validity.valid === false) {
                    field.classList.remove(validClass);
                    field.classList.add(invalidClass);
                    errorMessage.classList.remove(hideErrorMessageClass);
                    errorCount++;
                } else {
                    field.classList.remove(invalidClass);
                    field.classList.add(validClass);
                    errorMessage.classList.add(hideErrorMessageClass);
                }
            });
            if (errorCount > 0) {
                e.preventDefault();
            } else {
                editDetailsForm.submit();
            }
        });

        formfields.forEach(function (field) {
            var errorMessage = field.parentNode.querySelector('.edit-details__error-label');

            field.addEventListener('focus', function () {
                field.classList.remove(validClass);
                field.classList.remove(invalidClass);
                errorMessage.classList.add(hideErrorMessageClass);
            });
        });
    };

    var init = function init() {
        if (editDetailsForm) {
            return attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var packagingOffers = function () {

    var packagingOffers = document.querySelector('.reservation-packaging-offers');

    var attachEvents = function attachEvents() {

        var outerContent = document.querySelector('.reservation-packaging-offers');
        var innerContent = document.querySelector('.reservation-packaging-offers__inner');

        outerContent.scrollLeft((innerContent.offsetWidth() - outerContent.offsetWidth()) / 2);
    };

    var init = function init() {
        if (packagingOffers) {
            return attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var paymentDetailsForm = function () {

    var errorModal = document.querySelector('.payment-error-modal');
    var errorModalCloseLink = document.querySelector('.payment-error-modal__close');
    var errorOverlay = document.querySelector('.payment-error-overlay');
    var submitBtn = document.querySelector('.payment-details__submit-cta');
    var submitBtnDisableClass = 'payment-details__submit-cta--disabled';
    var formFields = document.querySelectorAll('.payment-details input');
    var errorModalActiveClass = 'payment-error-modal--active';
    var errorOverlayActiveClass = 'payment-error-overlay--active';
    var inputValidClass = 'billing-details__input--valid';
    var inputInvalidClass = 'billing-details__input--invalid';

    var attachEvents = function attachEvents() {
        errorModalCloseLink.addEventListener('click', function (e) {
            errorModal.classList.remove(errorModalActiveClass);
            errorOverlay.classList.remove(errorOverlayActiveClass);
            e.preventDefault();
        });
        submitBtn.addEventListener('click', function (e) {
            var isValid = false;
            formFields.forEach(function (field) {
                if (field.validity.valid === false) {
                    field.classList.remove(inputValidClass);
                    field.classList.add(inputInvalidClass);
                    isValid = true;
                } else {
                    field.classList.remove(inputInvalidClass);
                    field.classList.add(inputValidClass);
                }
            });
            if (isValid) {
                e.preventDefault();
            } else {
                submitBtn.classList.add(submitBtnDisableClass);
                provideDetailsForm.submit();
            }
        });
    };

    var init = function init() {
        if (errorModal !== null) {
            attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var searchHeroBanner = function () {

    var selectors = {
        searchInputId: 'hero-search-input'
    };

    var initSearchAutocomplete = function initSearchAutocomplete() {
        var input = document.getElementById(selectors.searchInputId);

        if (input) {
            var enableEnterKey = function enableEnterKey(input) {
                var _addEventListener = input.addEventListener;

                var addEventListenerWrapper = function addEventListenerWrapper(type, listener) {
                    if (type === "keydown") {
                        var _listener = listener;
                        listener = function listener(event) {
                            var suggestion_selected = document.getElementsByClassName('pac-item-selected').length > 0;

                            if (event.which === 13 && !suggestion_selected) {
                                var e = JSON.parse(JSON.stringify(event));
                                e.which = 40;
                                e.keyCode = 40;
                                _listener.apply(input, [e]);
                            }
                            _listener.apply(input, [event]);
                        };
                    }
                    _addEventListener.apply(input, [type, listener]);
                };

                input.addEventListener = addEventListenerWrapper;
            };

            var googleMapsCallBack = function googleMapsCallBack(results, status) {
                if (status === google.maps.places.AutocompleteService.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                    }
                }
            };

            var searchBox = new google.maps.places.Autocomplete(input);
            var searchIconBtn = document.getElementById(selectors.searchIconBtn);
            var searchDestinationPageUrl = input.getAttribute('data-redirect');

            searchBox.setComponentRestrictions({ country: ["NG"] });
            enableEnterKey(input);

            // Doing stuff when search box is used.
            searchBox.addListener('place_changed', function () {
                window.dataLayer.push({
                    'event': 'StoreSearch'
                });
                var searchQuery = searchBox.getPlace();
                sessionStorage.setItem('heroSearchQuery', JSON.stringify(searchQuery));
                window.location.href = searchDestinationPageUrl;
            });

            ;

            ;
        }
    };

    var init = function init() {
        return initSearchAutocomplete();
    };

    return {
        init: init
    };
}();
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modifyQuote = function () {
    var doesStorageQuoteExist = document.getElementById('storage-quote-price');
    var weeklyQuoteTitleId = document.getElementById('weekly-quote-title');
    var monthlyQuoteTitleId = document.getElementById('monthly-quote-title');
    var displayNationalStorageMessage = doesStorageQuoteExist !== null ? doesStorageQuoteExist.getAttribute('data-national-storage') : "";

    // This is for the quote message
    var nonStandardQuoteTextId = document.getElementById('non-standard-quote-text');
    var nonStandardQuoteTextEncoded = nonStandardQuoteTextId ? nonStandardQuoteTextId.getAttribute('data-non-standard-size-upgrade-text') : "";
    var nonStandardQuoteText = decodeURIComponent(nonStandardQuoteTextEncoded).replace(/\+/g, ' ');

    // Limited avail Upgrade text
    var nonStandardUpgradeTextId = document.getElementById('limited-availability-upgrade-message');
    var nonStandardUpgradeTextEncoded = nonStandardUpgradeTextId ? nonStandardUpgradeTextId.getAttribute('data-non-standard-size-upgrade-price') : "";
    var standardUpgradeTextEncoded = nonStandardUpgradeTextId ? nonStandardUpgradeTextId.getAttribute('data-limited-availability-upgrade-price') : "";
    var nonStandardUpgradeText = decodeURIComponent(nonStandardUpgradeTextEncoded).replace(/\+/g, ' ');
    var standardUpgradeText = decodeURIComponent(nonStandardUpgradeTextEncoded).replace(/\+/g, ' ');

    var upgradeSize = void 0;

    var apiEndPoints = {
        obtainQuote: '/todoapi/storage/generatequote',
        obtainNationalStorageQuote: '/accessapi/storage/ObtainNationalStorageQuote',
        getLargerQuote: '/accessapi/storage/SuggestLargerSizeQuote?size=',
        getSmallerQuote: '/accessapi/storage/SuggestSmallerSizeQuote?size=',
        updateQuote: '/accessapi/storage/UpdateQuote?size='
    };

    var queryStrings = {
        currentUnitSizeQueryString: '?size='
    };

    if (doesStorageQuoteExist) {
        var _data;

        var doServerSideQuotesExist = doesStorageQuoteExist.getAttribute('data-has-quotes');

        var _storageQuote = new Vue({
            el: '#storage-quote-price',
            data: (_data = {
                currentUnitSize: '',
                currentWeeklyQuote: '',
                currentMonthlyQuote: ''
            }, _defineProperty(_data, 'currentUnitSize', ''), _defineProperty(_data, 'increaseSize', ''), _defineProperty(_data, 'decreaseSize', ''), _defineProperty(_data, 'allowLargerQuote', true), _defineProperty(_data, 'allowSmallerQuote', true), _defineProperty(_data, 'showNextSteps', true), _defineProperty(_data, 'mainDiscountDescription', ''), _defineProperty(_data, 'priceDifferencePerMonth', ''), _defineProperty(_data, 'mainDiscountPerWeekDescription', ''), _defineProperty(_data, 'mainDiscountPerMonthDescription', ''), _defineProperty(_data, 'mainFullPricePerWeek', ''), _defineProperty(_data, 'mainFullPricePerMonth', ''), _defineProperty(_data, 'showLimitedAvailability', false), _defineProperty(_data, 'showUpgradeOption', false), _defineProperty(_data, 'showNationalStorageMessage', false), _defineProperty(_data, 'showBoxStorageOffer', false), _defineProperty(_data, 'quoteRef', ''), _defineProperty(_data, 'reserveButton', ''), _defineProperty(_data, 'orderButton', ''), _defineProperty(_data, 'showExtrasPanel', false), _defineProperty(_data, 'onlineRef', ''), _defineProperty(_data, 'toggleWeeklyPrice', true), _defineProperty(_data, 'toggleMonthlyPrice', false), _defineProperty(_data, 'isLoad', true), _defineProperty(_data, 'quoteModified', false), _defineProperty(_data, 'showNonStandardSizeQuote', false), _defineProperty(_data, 'nonStandardSizeSupportingText', ''), _defineProperty(_data, 'nonStandardUpgradeText', ''), _defineProperty(_data, 'standardUpgradeText', ''), _defineProperty(_data, 'replaceTokens', ''), _defineProperty(_data, 'showLoadingSpinner', false), _data),
            methods: {
                retrieveQuote: function retrieveQuote(event, apiEndPoint) {
                    // this will deal with all of the other quotes when ready.
                    var app = this;

                    app.showLimitedAvailability = false;
                    app.showUpgradeOption = false;
                    app.allowLargerQuote = true;
                    app.allowSmallerQuote = true;
                    app.showNonStandardSizeQuote = false;

                    axios.get(apiEndPoints.obtainQuote).then(function (response) {
                        var LimitedAvailabilityRefId = document.getElementById('storage-quote-ref');
                        var LimitedAvailabilityQuoteTextIncToken = LimitedAvailabilityRefId.getAttribute('data-limited-availability-quote-text');
                        app.currentMonthlyQuote = response.data.MainDiscountedPricePerMonth;
                        app.currentWeeklyQuote = response.data.MainDiscountedPricePerWeek;
                        app.currentUnitSize = response.data.MainSize;
                        app.showLimitedAvailability = response.data.ShowLimitedAvailability;
                        app.showUpgradeOption = response.data.ShowUpgradeOption;
                        app.mainDiscountPerWeekDescription = response.data.MainDiscountPerWeekDescription.replace("<fullprice>", response.data.MainFullPricePerWeek);
                        app.mainDiscountPerMonthDescription = response.data.MainDiscountPerMonthDescription.replace("<fullprice>", response.data.MainFullPricePerMonth);
                        app.priceDifferencePerMonth = response.data.PriceDifferencePerMonth;
                        app.mainFullPricePerMonth = response.data.MainFullPricePerMonth;
                        app.mainFullPricePerWeek = response.data.MainFullPricePerWeek;
                        app.showNationalStorageMessage = response.data.ShowNationalStorageMessage;
                        app.allowLargerQuote = response.data.AllowLargerQuote;
                        app.allowSmallerQuote = response.data.AllowSmallerQuote;
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },
                initialQuote: function initialQuote(event) {
                    var app = this;
                    var limitedAvailabilityRefId = document.getElementById('storage-quote-ref');
                    var limitedAvailabilityQuoteTextIncToken = limitedAvailabilityRefId.getAttribute('data-limited-availability-quote-text');
                    app.showLimitedAvailability = false;
                    app.showUpgradeOption = false;
                    app.allowLargerQuote = true;
                    app.allowSmallerQuote = true;
                    app.showNextSteps = false;
                    app.showLoadingSpinner = true;
                    app.isLoad = true;

                    axios.get(apiEndPoints.obtainQuote).then(function (response) {
                        if (doServerSideQuotesExist === 'False') {
                            window.dataLayer.push({
                                'event': 'QuoteGenerated'
                            });
                        }
                        app.showLoadingSpinner = false;
                        app.isLoad = false;
                        app.showNextSteps = response.data.ShowNextSteps;
                        app.upgradeSize = response.data.UpgradeSize;
                        app.quoteRef = limitedAvailabilityQuoteTextIncToken.replace('<quoterefnumber>', response.data.QuoteRef);
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                        app.nonStandardSizeSupportingText = nonStandardQuoteText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.nonStandardUpgradeText = nonStandardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.standardUpgradeText = standardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.currentMonthlyQuote = response.data.MainDiscountedPricePerMonth;
                        app.currentWeeklyQuote = response.data.MainDiscountedPricePerWeek;
                        app.currentUnitSize = response.data.MainSize;
                        app.showLimitedAvailability = response.data.ShowLimitedAvailability;
                        app.showUpgradeOption = response.data.ShowUpgradeOption;
                        app.mainDiscountPerWeekDescription = response.data.MainDiscountPerWeekDescription.replace("<fullprice>", response.data.MainFullPricePerWeek);
                        app.mainDiscountPerMonthDescription = response.data.MainDiscountPerMonthDescription.replace("<fullprice>", response.data.MainFullPricePerMonth);
                        app.priceDifferencePerMonth = response.data.PriceDifferencePerMonth;
                        app.mainFullPricePerMonth = response.data.mainFullPricePerMonth;
                        app.showNationalStorageMessage = response.data.ShowNationalStorageMessage;
                        app.showBoxStorageOffer = response.data.ShowBoxStorageOffer;
                        app.mainFullPricePerMonth = response.data.MainFullPricePerMonth;
                        app.mainFullPricePerWeek = response.data.MainFullPricePerWeek;
                        app.allowLargerQuote = response.data.AllowLargerQuote;
                        app.allowSmallerQuote = response.data.AllowSmallerQuote;
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },
                decreaseUnitSize: function decreaseUnitSize(event) {
                    var app = this;
                    var limitedAvailabilityRefId = document.getElementById('storage-quote-ref');
                    var limitedAvailabilityQuoteTextIncToken = limitedAvailabilityRefId.getAttribute('data-limited-availability-quote-text');
                    app.showLimitedAvailability = false;
                    app.showUpgradeOption = false;
                    app.allowLargerQuote = true;
                    app.allowSmallerQuote = true;
                    app.quoteModified = true;
                    app.showNonStandardSizeQuote = false;
                    app.showNextSteps = false;
                    app.showLoadingSpinner = true;

                    axios.get(apiEndPoints.getSmallerQuote + app.currentUnitSize).then(function (response) {
                        app.showLoadingSpinner = false;
                        app.showNextSteps = response.data.ShowNextSteps;
                        app.upgradeSize = response.data.UpgradeSize;
                        app.allowLargerQuote = response.data.AllowLargerQuote;
                        app.allowSmallerQuote = response.data.AllowSmallerQuote;
                        app.currentMonthlyQuote = response.data.MainDiscountedPricePerMonth;
                        app.currentWeeklyQuote = response.data.MainDiscountedPricePerWeek;
                        app.currentUnitSize = response.data.MainSize;
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                        app.nonStandardSizeSupportingText = nonStandardQuoteText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.nonStandardUpgradeText = nonStandardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.standardUpgradeText = standardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.showLimitedAvailability = response.data.ShowLimitedAvailability;
                        app.showUpgradeOption = response.data.ShowUpgradeOption;
                        app.mainDiscountPerWeekDescription = response.data.MainDiscountPerWeekDescription.replace("<fullprice>", response.data.MainFullPricePerWeek);
                        app.mainDiscountPerMonthDescription = response.data.MainDiscountPerMonthDescription.replace("<fullprice>", response.data.MainFullPricePerMonth);
                        app.priceDifferencePerMonth = response.data.PriceDifferencePerMonth;
                        app.mainFullPricePerMonth = response.data.mainFullPricePerMonth;
                        app.showNationalStorageMessage = response.data.ShowNationalStorageMessage;
                        app.showBoxStorageOffer = response.data.ShowBoxStorageOffer;
                        app.mainFullPricePerMonth = response.data.MainFullPricePerMonth;
                        app.mainFullPricePerWeek = response.data.MainFullPricePerWeek;
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },
                increaseUnitSize: function increaseUnitSize(event) {

                    var app = this;
                    var limitedAvailabilityRefId = document.getElementById('storage-quote-ref');
                    var limitedAvailabilityQuoteTextIncToken = limitedAvailabilityRefId.getAttribute('data-limited-availability-quote-text');
                    app.currentQuote = 'loading...';
                    app.showLimitedAvailability = false;
                    app.showUpgradeOption = false;
                    app.allowLargerQuote = true;
                    app.allowSmallerQuote = true;
                    app.quoteModified = true;
                    app.showNonStandardSizeQuote = false;
                    app.showNextSteps = false;
                    app.showLoadingSpinner = true;

                    axios.get(apiEndPoints.getLargerQuote + app.currentUnitSize).then(function (response) {
                        app.showLoadingSpinner = false;
                        app.showNextSteps = response.data.ShowNextSteps;
                        app.upgradeSize = response.data.UpgradeSize;
                        app.allowLargerQuote = response.data.AllowLargerQuote;
                        app.allowSmallerQuote = response.data.AllowSmallerQuote;
                        app.currentMonthlyQuote = response.data.MainDiscountedPricePerMonth;
                        app.currentWeeklyQuote = response.data.MainDiscountedPricePerWeek;
                        app.currentUnitSize = response.data.MainSize;
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                        app.nonStandardSizeSupportingText = nonStandardQuoteText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.nonStandardUpgradeText = nonStandardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.standardUpgradeText = standardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.showLimitedAvailability = response.data.ShowLimitedAvailability;
                        app.showUpgradeOption = response.data.ShowUpgradeOption;
                        app.mainDiscountPerWeekDescription = response.data.MainDiscountPerWeekDescription.replace("<fullprice>", response.data.MainFullPricePerWeek);
                        app.mainDiscountPerMonthDescription = response.data.MainDiscountPerMonthDescription.replace("<fullprice>", response.data.MainFullPricePerMonth);
                        app.priceDifferencePerMonth = response.data.PriceDifferencePerMonth;
                        app.mainFullPricePerMonth = response.data.mainFullPricePerMonth;
                        app.showNationalStorageMessage = response.data.ShowNationalStorageMessage;
                        app.showBoxStorageOffer = response.data.ShowBoxStorageOffer;
                        app.mainFullPricePerMonth = response.data.MainFullPricePerMonth;
                        app.mainFullPricePerWeek = response.data.MainFullPricePerWeek;
                        app.quoteRef = LimitedAvailabilityQuoteTextIncToken.replace('<quoterefnumber>', response.data.QuoteRef);
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },
                nextAvailableUnitSize: function nextAvailableUnitSize(event) {
                    var app = this;
                    var limitedAvailabilityRefId = document.getElementById('storage-quote-ref');
                    var limitedAvailabilityQuoteTextIncToken = limitedAvailabilityRefId.getAttribute('data-limited-availability-quote-text');
                    app.currentQuote = 'loading...';
                    app.showLimitedAvailability = false;
                    app.showUpgradeOption = false;
                    app.allowLargerQuote = true;
                    app.allowSmallerQuote = true;
                    app.quoteModified = true;
                    app.showNonStandardSizeQuote = false;
                    app.showNextSteps = false;
                    app.showLoadingSpinner = true;

                    axios.get(apiEndPoints.updateQuote + app.currentUnitSize).then(function (response) {
                        app.showLoadingSpinner = false;
                        app.showNextSteps = response.data.ShowNextSteps;
                        app.upgradeSize = response.data.UpgradeSize;
                        app.allowLargerQuote = response.data.AllowLargerQuote;
                        app.allowSmallerQuote = response.data.AllowSmallerQuote;
                        app.currentMonthlyQuote = response.data.MainDiscountedPricePerMonth;
                        app.currentWeeklyQuote = response.data.MainDiscountedPricePerWeek;
                        app.currentUnitSize = response.data.MainSize;
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                        app.nonStandardSizeSupportingText = nonStandardQuoteText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.nonStandardUpgradeText = nonStandardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.standardUpgradeText = standardUpgradeText.replace("[Unit Size]", response.data.UpgradeSize).replace("[Weekly Price]", response.data.UpgradePricePerWeek);
                        app.showLimitedAvailability = response.data.ShowLimitedAvailability;
                        app.showUpgradeOption = response.data.ShowUpgradeOption;
                        app.mainDiscountPerWeekDescription = response.data.MainDiscountPerWeekDescription.replace("<fullprice>", response.data.MainFullPricePerWeek);
                        app.mainDiscountPerMonthDescription = response.data.MainDiscountPerMonthDescription.replace("<fullprice>", response.data.MainFullPricePerMonth);
                        app.priceDifferencePerMonth = response.data.PriceDifferencePerMonth;
                        app.mainFullPricePerMonth = response.data.mainFullPricePerMonth;
                        app.showNationalStorageMessage = response.data.ShowNationalStorageMessage;
                        app.showBoxStorageOffer = response.data.ShowBoxStorageOffer;
                        app.mainFullPricePerMonth = response.data.MainFullPricePerMonth;
                        app.mainFullPricePerWeek = response.data.MainFullPricePerWeek;
                        app.quoteRef = LimitedAvailabilityQuoteTextIncToken.replace('<quoterefnumber>', response.data.QuoteRef);
                        app.showNonStandardSizeQuote = response.data.ShowNonStandardSizeQuote;
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },
                updateQuote: function updateQuote(event) {
                    var linkTarget = event.target.href;
                    event.preventDefault();
                    axios.get(apiEndPoints.updateQuote + this.currentUnitSize).then(function (response) {
                        window.location.href = linkTarget;
                    }).catch(function (error) {
                        this.currentQuote = 'Error';
                        window.location.href = linkTarget;
                    });
                },
                upgradeQuote: function upgradeQuote(event) {
                    var app = this;
                    event.preventDefault();

                    axios.get(apiEndPoints.updateQuote + app.upgradeSize).then(function (response) {
                        location.reload();
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },

                obtainNationalStorageQuote: function obtainNationalStorageQuote(event, apiEndPoint) {
                    var app = this;

                    axios.get(apiEndPoints.obtainNationalStorageQuote).then(function (response) {
                        app.upgradeSize = response.data.UpgradeSize;
                        app.onlineRef = response.data.OnlineRef;
                        app.showNationalStorageMessage = true;
                        if (doServerSideQuotesExist === 'False') {
                            window.dataLayer.push({
                                'event': 'QuoteGenerated'
                            });
                        }
                    }).catch(function (error) {
                        app.currentQuote = 'Error';
                    });
                },
                showWeeklyPrice: function showWeeklyPrice(event) {
                    weeklyQuoteTitleId.classList.add('tab__link--active');
                    monthlyQuoteTitleId.classList.remove('tab__link--active');
                    var app = this;
                    app.toggleWeeklyPrice = true;
                    app.toggleMonthlyPrice = false;
                },
                showMonthlyPrice: function showMonthlyPrice(event) {
                    var app = this;
                    app.toggleMonthlyPrice = true;
                    app.toggleWeeklyPrice = false;
                },
                gtmTracking: function gtmTracking(eventName) {
                    window.dataLayer.push({ 'event': eventName });
                }
            },
            mounted: function mounted() {
                this.$nextTick(function (event) {});
            },
            beforeMount: function beforeMount() {
                if (displayNationalStorageMessage === 'True') {
                    this.obtainNationalStorageQuote();
                    this.isLoad = false;
                } else {
                    this.initialQuote();
                }
            }
        });
    }

    var attachEvents = function attachEvents() {
        storageQuote;
    };

    var init = function init() {
        if (doesStorageQuoteExist) {
            return attachEvents;
        }
    };

    return {
        init: init
    };
}();
'use strict';

var purchaseStorageDetails = function () {
    var purchaseDetailsForm = document.querySelector('.purchase-storage-details__form');
    var datePicker = document.getElementById('datepicker');
    var hiddenDateField = document.getElementById('hiddenDateField');
    var submitBtn = document.querySelector('.purchase-storage-details__submit-cta');
    var checkBox = document.querySelector('.purchase-storage-details__input-check');
    var datePickerErrorLabel = document.querySelector('.purchase-storage-details__date-error');
    var checkboxErrorLabel = document.querySelector('.purchase-storage-details__check-error');

    var createDatePicker = function createDatePicker() {
        var currentDate = new Date();
        var maximumDate = new Date();
        maximumDate.setDate(currentDate.getDate() + 28);
        var picker = new Pikaday({
            field: datePicker,
            firstDay: 1,
            minDate: new Date(),
            maxDate: maximumDate
        });
    };

    var attachEvents = function attachEvents() {
        submitBtn.addEventListener('click', function (e) {
            var dateSelected = datePicker.value;
            var formattedDate = moment(dateSelected).format('L');

            if (dateSelected === '') {
                e.preventDefault();
                datePicker.classList.add('purchase-storage-details__date-input--error');
                datePickerErrorLabel.classList.add('purchase-storage-details__date-error--active');
            } else if (checkBox.checked === false) {
                e.preventDefault();
                checkboxErrorLabel.classList.add('purchase-storage-details__check-error--active');
            } else {
                e.preventDefault();
                hiddenDateField.value = formattedDate;
                purchaseDetailsForm.submit();
            }
        });
    };

    var init = function init() {
        if (purchaseDetailsForm) {
            createDatePicker();
            attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var sizeSelector = function () {

    var checkForJsonData = document.getElementById('jsonData');

    if (checkForJsonData) {
        var jsonString = document.getElementById('jsonData').getAttribute('data-json');
        var defaultValue = document.getElementById('jsonData').getAttribute('data-default-slider-position');
        var jsonObj = JSON.parse(jsonString);
        var unitSpecs = jsonObj;

        var sizeSlider = new Vue({
            el: '#app',
            data: function data() {
                return {
                    value: defaultValue !== null ? defaultValue : 4, //Initial Value can be set here.
                    domain: window.location.origin,
                    unitSpecs: unitSpecs,
                    options: {
                        eventType: 'auto',
                        width: '100%',
                        height: 2,
                        dotSize: 24,
                        dotHeight: null,
                        dotWidth: null,
                        min: 0,
                        max: unitSpecs.length - 1,
                        interval: 1,
                        show: true,
                        speed: 0.5,
                        disabled: false,
                        piecewise: true,
                        piecewiseStyle: {
                            "width": "1px",
                            "height": "16px",
                            "background-color": "#babcbe",
                            "border-radius": "0",
                            "visibility": "visible"
                        },
                        piecewiseLabel: false,
                        tooltip: true,
                        tooltipDir: 'top',
                        reverse: false,
                        data: null,
                        clickable: true,
                        realTime: false,
                        lazy: false,
                        formatter: null,
                        bgStyle: {
                            "background-color": "#babcbe",
                            "border-radius": "0"
                        },
                        sliderStyle: {
                            "background-color": "#FFFFFF",
                            "border": "7px solid #13b5ea",
                            "box-shadow": "none"
                        },
                        processStyle: {
                            "backgroundColor": "#babcbe"
                        },
                        piecewiseActiveStyle: null,
                        tooltipStyle: null,
                        labelStyle: null,
                        labelActiveStyle: null
                    }
                };
            },
            methods: {
                gtmEventTracking: function gtmEventTracking() {
                    var selectedSizeEl = document.querySelector('.size-selector__size-value');
                    if (selectedSizeEl) {
                        var selectedSize = selectedSizeEl.innerText;

                        dataLayer.push({
                            'event': 'SizeSelected',
                            'storageSize': selectedSize
                        });
                    }
                }
            },
            // mounted () {
            // },
            components: {
                'vueSlider': window['vue-slider-component']
            }
        });
    }

    var init = function init() {
        return sizeSlider;
    };

    return {
        init: init
    };
}();
'use strict';

var storeLocationsList = function () {
    var selectors = {
        storeLocationsList: '.store-locations',
        storeListToggle: '.store-locations__toggle'
    };

    var stateClasses = {
        storeListClosedClass: 'store-locations--closed'
    };
    window.onresize = function () {
        if (document.querySelector(selectors.storeLocationsList)) {
            if (document.querySelector(selectors.storeLocationsList).classList.contains(stateClasses.storeListClosedClass)) {
                document.querySelector(selectors.storeLocationsList).classList.remove(stateClasses.storeListClosedClass);
            }
        }
    };

    var attachEvents = function attachEvents() {
        document.querySelector(selectors.storeListToggle).addEventListener('click', function (e) {
            document.querySelector(selectors.storeLocationsList).classList.toggle(stateClasses.storeListClosedClass);
            e.preventDefault();
        });
    };

    var init = function init() {
        if (document.querySelector(selectors.storeLocationsList)) {
            attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var validateForm = function () {
    var selectors = {
        currentForm: '.access-form',
        submitBtn: '.access-form__submit'
    };
    var validClass = 'validate-field--valid';
    var invalidClass = 'validate-field--invalid';
    var errorMessages = '.field-error';
    var hideErrorMessageClass = 'field-error--hide';
    var accessForms = document.querySelectorAll(selectors.currentForm);

    var enableRecapture = function enableRecapture(currentFormToValidate) {
        grecaptcha.ready(function () {
            var _document$querySelect = document.querySelector('[data-recpatcha-public-key]').dataset,
                recpatchaPublicKey = _document$querySelect.recpatchaPublicKey,
                recaptchaEnabled = _document$querySelect.recaptchaEnabled;

            // Check if recaptcha should be enabled.

            if (recaptchaEnabled.toLowerCase() === 'false') return;

            // Make sure the action is definded
            var _currentFormToValidat = currentFormToValidate.dataset,
                recaptchaAction = _currentFormToValidat.recaptchaAction,
                recaptchaName = _currentFormToValidat.recaptchaName;

            if (!recaptchaAction) return;

            grecaptcha.execute(recpatchaPublicKey, { action: recaptchaAction }).then(function (token) {
                // Set the input value on the page with the token
                var fhRecaptchaInput = document.getElementsByName(recaptchaName)[0];
                fhRecaptchaInput.value = token;
            });
        });
    };

    var attachEvents = function attachEvents() {
        var _loop = function _loop() {
            var currentFormToValidate = accessForms[i].closest(selectors.currentForm);
            enableRecapture(currentFormToValidate);

            accessForms[i].querySelector(selectors.submitBtn).addEventListener('click', function (e) {
                var accessFormInputs = currentFormToValidate.querySelectorAll('input');
                var isInvalid = false;

                for (var i = 0; i < accessFormInputs.length; i++) {
                    if (accessFormInputs[i].getAttribute('required') === 'true') {
                        if (accessFormInputs[i].validity.valid === false) {
                            accessFormInputs[i].classList.remove(validClass);
                            accessFormInputs[i].classList.add(invalidClass);
                            accessFormInputs[i].parentElement.querySelector(errorMessages).classList.remove(hideErrorMessageClass);
                            isInvalid = true;
                        } else {
                            accessFormInputs[i].classList.remove(invalidClass);
                            accessFormInputs[i].classList.add(validClass);
                            accessFormInputs[i].parentElement.querySelector(errorMessages).classList.add(hideErrorMessageClass);
                        }
                    }
                }
                if (isInvalid) {
                    e.preventDefault();
                } else {
                    currentFormToValidate.submit();
                }
            });
        };

        for (var i = 0; i < accessForms.length; i++) {
            _loop();
        }
    };

    var init = function init() {
        if (document.querySelector(selectors.currentForm)) {
            attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var expandingStoreList = function () {

    var selectors = {
        expandingStoreList: '.expanding-store-list',
        expandingStoreListToggle: '.expanding-store-list__toggle',
        expandingList: '.expanding-store-list__list'
    };

    var stateClasses = {
        expandingStoreListToggleOpenClass: 'expanding-store-list__toggle--open',
        expandingListOpenClass: 'expanding-store-list__list--open'
    };

    var toggleStoreList = function toggleStoreList(toggle) {
        var currentToggle = toggle;
        var currentList = toggle.nextElementSibling;

        if (document.querySelector(selectors.expandingStoreList)) {
            currentToggle.classList.toggle(stateClasses.expandingStoreListToggleOpenClass);
            currentList.classList.toggle(stateClasses.expandingListOpenClass);
        }
    };

    var attachEvents = function attachEvents() {
        if (document.querySelector(selectors.expandingStoreListToggle)) {
            var expandingListToggles = document.querySelectorAll(selectors.expandingStoreListToggle);

            var _loop = function _loop() {
                var currentToggle = expandingListToggles[i];
                currentToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    toggleStoreList(currentToggle);
                });
            };

            for (var i = 0; i < expandingListToggles.length; i++) {
                _loop();
            }
        }
    };

    var init = function init() {
        return attachEvents();
    };

    return {
        init: init
    };
}();
'use strict';

var stickyStoreCta = function () {

    var selectors = {
        storeHeroClass: '.store-banner',
        storeStickyBanner: '.sticky-store-cta__banner',
        globalFooterClass: '.global-footer',
        experienceEditor: '.experience-editor',
        stickyAnimatedSlideInClasses: 'sticky-store-cta__banner \n                              sticky-store-cta__banner--active \n                              animated \n                              slideInUp\n                              faster',
        stickyAnimatedSlideOutClasses: 'sticky-store-cta__banner \n                              sticky-store-cta__banner--active \n                              animated \n                              slideOutDown\n                              faster'
    };

    var initStickyStoreCta = function initStickyStoreCta() {
        var storeHeroBanner = document.querySelector(selectors.storeHeroClass);
        var storeStickyBanner = document.querySelector(selectors.storeStickyBanner);
        var isExperienceEditor = document.querySelector(selectors.experienceEditor);
        var cookieBannerHidden = document.querySelector('.gdpr-banner--hide-head');
        var globalFooter = document.querySelector(selectors.globalFooterClass);
        var headerHeight = cookieBannerHidden !== null ? 100 : 200;

        if (storeHeroBanner && isExperienceEditor === null) {
            window.onscroll = function changeNav() {
                var scrollPosY = window.pageYOffset | document.body.scrollTop;
                if (storeStickyBanner !== null && scrollPosY > headerHeight) {
                    storeStickyBanner.className = selectors.stickyAnimatedSlideInClasses;
                    var stickyBannerHeight = storeStickyBanner.clientHeight + 'px';
                    globalFooter.style.marginBottom = stickyBannerHeight;
                } else if (scrollPosY <= headerHeight + 10) {
                    if (storeStickyBanner.className === selectors.stickyAnimatedSlideInClasses) {
                        storeStickyBanner.className = selectors.stickyAnimatedSlideOutClasses;
                    }
                }
            };
        };

        if (isExperienceEditor && storeHeroBanner) {
            storeStickyBanner.className = 'sticky-store-cta__banner sticky-store-cta__banner--exp';
        };
    };

    var init = function init() {
        return initStickyStoreCta();
    };

    return {
        init: init
    };
}();
'use strict';

var storeImageGallery = function () {

    var selectors = {
        storeImageGalleryClass: '.store-image-slider',
        storeImageSlideControlsClass: 'store-image-slider__controls',
        storeImageSlideControls: '.store-image-slider__controls',
        storeImageCurrentSlideClass: '.store-banner__current-slide',
        storeImageGallerySlideCount: '.store-banner__slide-count',
        storeImageGalleryNextButton: '.store-banner__slider-next-btn',
        storeImageGalleryPrevButton: '.store-banner__slider-prev-btn',
        experienceEditor: '.experience-editor'
    };

    var modifiers = {
        activeClass: '--active',
        hiddenClass: '--hidden'
    };

    var initStoreImageGallery = function initStoreImageGallery() {
        var imageGallery = document.querySelector(selectors.storeImageGalleryClass);
        var isExperienceEditor = document.querySelector(selectors.experienceEditor);
        var sliderControls = document.querySelector(selectors.storeImageSlideControls);

        if (imageGallery && isExperienceEditor === null) {
            var slider = tns({
                container: selectors.storeImageGalleryClass,
                items: 1,
                controls: false,
                nav: false,
                startIndex: 0,
                touch: true
            });

            var slideCount = slider.getInfo().slideCount;
            var currentSlide = slider.getInfo().displayIndex;

            if (slideCount < 2) {
                var galleryControls = document.querySelector(selectors.storeImageSlideControls);
                galleryControls.classList.add(selectors.storeImageSlideControls.substring(1) + modifiers.hiddenClass);
            };

            var paginationCurrentSlideElement = document.querySelector(selectors.storeImageCurrentSlideClass);
            var paginationTotalSlidesElement = document.querySelector(selectors.storeImageGallerySlideCount);

            paginationTotalSlidesElement.innerHTML = slideCount;
            paginationCurrentSlideElement.innerHTML = currentSlide;

            document.querySelector(selectors.storeImageGalleryNextButton).onclick = function () {
                slider.goTo('next');
                var currentSlide = slider.getInfo().displayIndex;
                paginationCurrentSlideElement.innerHTML = currentSlide;
            };

            document.querySelector(selectors.storeImageGalleryPrevButton).onclick = function () {
                slider.goTo('prev');
                var currentSlide = slider.getInfo().displayIndex;
                paginationCurrentSlideElement.innerHTML = currentSlide;
            };
        };
        if (imageGallery && isExperienceEditor) {
            sliderControls.classList.add(selectors.storeImageSlideControlsClass + modifiers.hiddenClass);
        }
    };

    var init = function init() {
        return initStoreImageGallery();
    };

    return {
        init: init
    };
}();
'use strict';

var storeMap = function () {

    var selectors = {
        storeMapClass: '.store-map__gmap',
        storeLatAttr: 'data-lat',
        storeLngAttr: 'data-lng',
        zoomLevelAttr: 'data-zoom-level',
        storeFormattedAddressAttr: 'data-formatted-address'
    };

    var initStoreMap = function initStoreMap() {
        var storeMap = document.querySelector(selectors.storeMapClass);

        if (storeMap) {
            var storeLat = Number(storeMap.getAttribute(selectors.storeLatAttr));
            var storeLng = Number(storeMap.getAttribute(selectors.storeLngAttr));
            var zoomLevel = storeMap.getAttribute(selectors.zoomLevelAttr);
            var storeAddress = storeMap.getAttribute(selectors.storeFormattedAddressAttr);

            var map = new google.maps.Map(storeMap, {
                center: { lat: storeLat, lng: storeLng },
                zoom: Number(zoomLevel),
                mapTypeId: "roadmap"
            });

            var marker = new google.maps.Marker({
                map: map,
                position: { lat: Number(storeLat), lng: Number(storeLng) },
                url: "https://www.google.com/maps/dir/Current+Location/" + storeAddress
            });

            google.maps.event.addListener(marker, 'click', function () {
                window.open(marker.url);
            });
        };
    };

    var init = function init() {
        return initStoreMap();
    };

    return {
        init: init
    };
}();
'use strict';

var tabSwitcher = function () {

    var selectors = {
        tabLinkClass: '.tab__link',
        tabSwitcherId: '#tab-switcher',
        tabContainerId: '#tab-container',
        tabLinkInactive: 'tab__link tab__link--in-active',
        tabLinkActive: 'tab__link tab__link--active',
        tabPanelInactive: 'tab__panel tab__panel--in-active',
        tabPanelActive: 'tab__panel tab__panel--active',
        tabPanelForcedActive: '.tab-panel--forced-active',
        formErrorLabel: '.provide-details__error-label',
        registerFormErrorLabel: '.register-user__error-label'
    };

    var switcherContainer = document.querySelectorAll(selectors.tabContainerId);

    if (switcherContainer.length > 0) {
        var getTabSwitcher = function getTabSwitcher(newTab, newPanel) {
            return function () {
                currentTab.className = selectors.tabLinkInactive;
                currentPanel.className = selectors.tabPanelInactive;
                newTab.className = selectors.tabLinkActive;
                newPanel.className = selectors.tabPanelActive;
                currentTab = newTab;
                currentPanel = newPanel;
            };
        };

        var switcherTabs = document.querySelectorAll(selectors.tabLinkClass);
        var switcherPanels = document.querySelectorAll(".tab-panel");
        var forcedActiveState = document.querySelectorAll(selectors.tabPanelForcedActive);
        var switcherTabsLength = switcherTabs.length;
        var currentTab;
        var currentPanel;

        var getTabHeading = function getTabHeading(tabContainerId) {
            var tabbedContainer = document.querySelector(tabContainerId);
            var tabHeading = tabbedContainer.querySelectorAll("h1,h2,h3,h4")[0].innerHTML;
            return tabHeading;
        };

        var createTabToggleLinks = function createTabToggleLinks(tabLeftText, tabRightText) {
            var tabLeftLink = document.querySelector("#tab__link-1");
            var tabRightLink = document.querySelector("#tab__link-2");
            tabLeftLink.innerText = tabLeftText;
            tabRightLink.innerText = tabRightText;
        };

        var simulateClick = function simulateClick(e) {
            var evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            var canceled = !e.dispatchEvent(evt);
        };

        var attachEvents = function attachEvents() {
            var tabLeft = getTabHeading("#tab-panel-1");
            var tabRight = getTabHeading("#tab-panel-2");
            var tabSwitcher = document.querySelector(selectors.tabSwitcherId);

            createTabToggleLinks(tabLeft, tabRight);

            if (switcherTabsLength !== switcherPanels.length) throw new Error("Number of tabs (" + switcherTabsLength + ") and number of content panels (" + switcherPanels.length + ") are not equal");

            for (var i = 0; i < switcherTabsLength; i++) {
                var tab = switcherTabs[i];
                var panel = switcherPanels[i];

                tab.className = selectors.tabLinkInactive;
                tab.addEventListener("click", getTabSwitcher(tab, panel), false);
                panel.className = selectors.tabPanelInactive;
            }

            if (forcedActiveState.length > 0) {
                currentTab = switcherTabs[1];
                currentPanel = switcherPanels[1];
            } else {
                currentTab = switcherTabs[0];
                currentPanel = switcherPanels[0];
            }

            if (document.querySelector(selectors.formErrorLabel)) {
                var errorLabelElement = document.querySelector(selectors.formErrorLabel).parentElement.parentElement.parentElement;
                var errorTabPanelNumber = errorLabelElement.getAttribute('id').substr(-1);
                var errorTabLink = document.querySelector('#tab__link-' + errorTabPanelNumber);
                simulateClick(errorTabLink);
            } else if (document.querySelector(selectors.registerFormErrorLabel)) {
                var getTabLinks = document.querySelectorAll('[id^=\'tab__link-\']');
                var getTabPanels = document.querySelectorAll('[id^=\'tab-panel-\']');

                for (i = 0; i < getTabPanels.length; i++) {
                    if (getTabPanels[i].querySelector(selectors.registerFormErrorLabel)) {
                        var errorTabPanelNumber = getTabPanels[i].getAttribute('id').substr(-1);
                        var errorTabLink = document.querySelector('#tab__link-' + errorTabPanelNumber);
                        simulateClick(errorTabLink);
                    }
                }
            }

            currentTab.className = selectors.tabLinkActive;
            currentPanel.className = selectors.tabPanelActive;
        };
    }

    var init = function init() {
        if (switcherContainer.length > 0) {
            return attachEvents();
        }
    };

    return {
        init: init
    };
}();
'use strict';

var detectExperienceEditor = function () {

    var sitecore = window.Sitecore;

    var isExperienceEditorMode = function isExperienceEditorMode() {
        return !!(sitecore && sitecore.PageModes && sitecore.PageModes.PageEditor);
    };

    var init = function init() {
        if (isExperienceEditorMode()) {
            document.body.classList.add('experience-editor');
        }
    };

    return {
        init: init
    };
}();