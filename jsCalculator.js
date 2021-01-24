!function (d) {
    d.fn.hoverIntent = function (t, e, a) {
        var o, n, i, r, s = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        s = "object" == typeof t ? d.extend(s, t) : d.isFunction(e) ? d.extend(s, {
            over: t,
            out: e,
            selector: a
        }) : d.extend(s, {
            over: t,
            out: t,
            selector: e
        });
        var l = function (t) {
                o = t.pageX, n = t.pageY
            },
            c = function (t, e) {
                if (e.hoverIntent_t = clearTimeout(e.hoverIntent_t), Math.sqrt((i - o) * (i - o) + (r - n) * (r - n)) < s.sensitivity) return d(e).off("mousemove.hoverIntent", l), e.hoverIntent_s = !0, s.over.apply(e, [t]);
                i = o, r = n, e.hoverIntent_t = setTimeout(function () {
                    c(t, e)
                }, s.interval)
            },
            u = function (t) {
                var a = d.extend({}, t),
                    o = this;
                o.hoverIntent_t && (o.hoverIntent_t = clearTimeout(o.hoverIntent_t)), "mouseenter" === t.type ? (i = a.pageX, r = a.pageY, d(o).on("mousemove.hoverIntent", l), o.hoverIntent_s || (o.hoverIntent_t = setTimeout(function () {
                    c(a, o)
                }, s.interval))) : (d(o).off("mousemove.hoverIntent", l), o.hoverIntent_s && (o.hoverIntent_t = setTimeout(function () {
                    var t, e;
                    t = a, (e = o).hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = !1, s.out.apply(e, [t])
                }, s.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": u,
            "mouseleave.hoverIntent": u
        }, s.selector)
    }
}(jQuery),
    function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function (l) {
        var o = -1,
            n = -1,
            c = function (t) {
                return parseFloat(t) || 0
            },
            u = function (t) {
                var e = l(t),
                    o = null,
                    n = [];
                return e.each(function () {
                    var t = l(this),
                        e = t.offset().top - c(t.css("margin-top")),
                        a = 0 < n.length ? n[n.length - 1] : null;
                    null === a ? n.push(t) : Math.floor(Math.abs(o - e)) <= 1 ? n[n.length - 1] = a.add(t) : n.push(t), o = e
                }), n
            },
            d = function (t) {
                var e = {
                    byRow: !0,
                    property: "height",
                    target: null,
                    remove: !1
                };
                return "object" == typeof t ? l.extend(e, t) : ("boolean" == typeof t ? e.byRow = t : "remove" === t && (e.remove = !0), e)
            },
            m = l.fn.matchHeight = function (t) {
                var e = d(t);
                if (e.remove) {
                    var a = this;
                    return this.css(e.property, ""), l.each(m._groups, function (t, e) {
                        e.elements = e.elements.not(a)
                    }), this
                }
                return this.length <= 1 && !e.target || (m._groups.push({
                    elements: this,
                    options: e
                }), m._apply(this, e)), this
            };
        m.version = "master", m._groups = [], m._throttle = 80, m._maintainScroll = !1, m._beforeUpdate = null, m._afterUpdate = null, m._rows = u, m._parse = c, m._parseOptions = d, m._apply = function (t, e) {
            var i = d(e),
                a = l(t),
                o = [a],
                n = l(window).scrollTop(),
                r = l("html").outerHeight(!0),
                s = a.parents().filter(":hidden");
            return s.each(function () {
                var t = l(this);
                t.data("style-cache", t.attr("style"))
            }), s.css("display", "block"), i.byRow && !i.target && (a.each(function () {
                var t = l(this),
                    e = t.css("display");
                "inline-block" !== e && "flex" !== e && "inline-flex" !== e && (e = "block"), t.data("style-cache", t.attr("style")), t.css({
                    display: e,
                    "padding-top": "0",
                    "padding-bottom": "0",
                    "margin-top": "0",
                    "margin-bottom": "0",
                    "border-top-width": "0",
                    "border-bottom-width": "0",
                    height: "100px",
                    overflow: "hidden"
                })
            }), o = u(a), a.each(function () {
                var t = l(this);
                t.attr("style", t.data("style-cache") || "")
            })), l.each(o, function (t, e) {
                var a = l(e),
                    n = 0;
                if (i.target) n = i.target.outerHeight(!1);
                else {
                    if (i.byRow && a.length <= 1) return void a.css(i.property, "");
                    a.each(function () {
                        var t = l(this),
                            e = t.attr("style"),
                            a = t.css("display");
                        "inline-block" !== a && "flex" !== a && "inline-flex" !== a && (a = "block");
                        var o = {
                            display: a
                        };
                        o[i.property] = "", t.css(o), t.outerHeight(!1) > n && (n = t.outerHeight(!1)), e ? t.attr("style", e) : t.css("display", "")
                    })
                }
                a.each(function () {
                    var t = l(this),
                        e = 0;
                    i.target && t.is(i.target) || ("border-box" !== t.css("box-sizing") && (e += c(t.css("border-top-width")) + c(t.css("border-bottom-width")), e += c(t.css("padding-top")) + c(t.css("padding-bottom"))), t.css(i.property, n - e + "px"))
                })
            }), s.each(function () {
                var t = l(this);
                t.attr("style", t.data("style-cache") || null)
            }), m._maintainScroll && l(window).scrollTop(n / r * l("html").outerHeight(!0)), this
        }, m._applyDataApi = function () {
            var a = {};
            l("[data-match-height], [data-mh]").each(function () {
                var t = l(this),
                    e = t.attr("data-mh") || t.attr("data-match-height");
                a[e] = e in a ? a[e].add(t) : t
            }), l.each(a, function () {
                this.matchHeight(!0)
            })
        };
        var i = function (t) {
            m._beforeUpdate && m._beforeUpdate(t, m._groups), l.each(m._groups, function () {
                m._apply(this.elements, this.options)
            }), m._afterUpdate && m._afterUpdate(t, m._groups)
        };
        m._update = function (t, e) {
            if (e && "resize" === e.type) {
                var a = l(window).width();
                if (a === o) return;
                o = a
            }
            t ? -1 === n && (n = setTimeout(function () {
                i(e), n = -1
            }, m._throttle)) : i(e)
        }, l(m._applyDataApi), l(window).bind("load", function (t) {
            m._update(!1, t)
        }), l(window).bind("resize orientationchange", function (t) {
            m._update(!0, t)
        })
    }),
    function (V, j, o) {
        var l = {
            animation: "fade",
            arrow: !0,
            arrowColor: "",
            autoClose: !0,
            content: null,
            contentAsHTML: !1,
            contentCloning: !0,
            debug: !0,
            delay: 200,
            minWidth: 0,
            maxWidth: null,
            functionInit: function (t, e) {
            },
            functionBefore: function (t, e) {
                e()
            },
            functionReady: function (t, e) {
            },
            functionAfter: function (t) {
            },
            hideOnClick: !1,
            icon: "(?)",
            iconCloning: !0,
            iconDesktop: !1,
            iconTouch: !1,
            iconTheme: "tooltipster-icon",
            interactive: !1,
            interactiveTolerance: 350,
            multiple: !1,
            offsetX: 0,
            offsetY: 0,
            onlyOne: !1,
            position: "top",
            positionTracker: !1,
            positionTrackerCallback: function (t) {
                "hover" == this.option("trigger") && this.option("autoClose") && this.hide()
            },
            restoration: "current",
            speed: 350,
            timer: 0,
            theme: "tooltipster-default",
            touchDevices: !0,
            trigger: "hover",
            updateAnimation: !0
        };

        function c(t, e) {
            this.bodyOverflowX, this.callbacks = {
                hide: [],
                show: []
            }, this.checkInterval = null, this.Content, this.$el = V(t), this.$elProxy, this.elProxyPosition, this.enabled = !0, this.options = V.extend({}, l, e), this.mouseIsOverProxy = !1, this.namespace = "tooltipster-" + Math.round(1e5 * Math.random()), this.Status = "hidden", this.timerHide = null, this.timerShow = null, this.$tooltip, this.options.iconTheme = this.options.iconTheme.replace(".", ""), this.options.theme = this.options.theme.replace(".", ""), this._init()
        }

        function n(a, o) {
            var n = !0;
            return V.each(a, function (t, e) {
                if (void 0 === o[t] || a[t] !== o[t]) return n = !1
            }), n
        }

        c.prototype = {
            _init: function () {
                var t = this;
                if (o.querySelector) {
                    var e = null;
                    void 0 === t.$el.data("tooltipster-initialTitle") && (void 0 === (e = t.$el.attr("title")) && (e = null), t.$el.data("tooltipster-initialTitle", e)), null !== t.options.content ? t._content_set(t.options.content) : t._content_set(e);
                    var a = t.options.functionInit.call(t.$el, t.$el, t.Content);
                    void 0 !== a && t._content_set(a), t.$el.removeAttr("title").addClass("tooltipstered"), !u && t.options.iconDesktop || u && t.options.iconTouch ? ("string" == typeof t.options.icon ? (t.$elProxy = V('<span class="' + t.options.iconTheme + '"></span>'), t.$elProxy.text(t.options.icon)) : t.options.iconCloning ? t.$elProxy = t.options.icon.clone(!0) : t.$elProxy = t.options.icon, t.$elProxy.insertAfter(t.$el)) : t.$elProxy = t.$el, "hover" == t.options.trigger ? (t.$elProxy.on("mouseenter." + t.namespace, function () {
                        i() && !t.options.touchDevices || (t.mouseIsOverProxy = !0, t._show())
                    }).on("mouseleave." + t.namespace, function () {
                        i() && !t.options.touchDevices || (t.mouseIsOverProxy = !1)
                    }), u && t.options.touchDevices && t.$elProxy.on("touchstart." + t.namespace, function () {
                        t._showNow()
                    })) : "click" == t.options.trigger && t.$elProxy.on("click." + t.namespace, function () {
                        i() && !t.options.touchDevices || t._show()
                    })
                }
            },
            _show: function () {
                var t = this;
                "shown" != t.Status && "appearing" != t.Status && (t.options.delay ? t.timerShow = setTimeout(function () {
                    ("click" == t.options.trigger || "hover" == t.options.trigger && t.mouseIsOverProxy) && t._showNow()
                }, t.options.delay) : t._showNow())
            },
            _showNow: function (l) {
                var c = this;
                c.options.functionBefore.call(c.$el, c.$el, function () {
                    if (c.enabled && null !== c.Content) {
                        l && c.callbacks.show.push(l), c.callbacks.hide = [], clearTimeout(c.timerShow), c.timerShow = null, clearTimeout(c.timerHide), c.timerHide = null, c.options.onlyOne && V(".tooltipstered").not(c.$el).each(function (t, e) {
                            var i = V(e),
                                a = i.data("tooltipster-ns");
                            V.each(a, function (t, e) {
                                var a = i.data(e),
                                    o = a.status(),
                                    n = a.option("autoClose");
                                "hidden" !== o && "disappearing" !== o && n && a.hide()
                            })
                        });
                        var t = function () {
                            c.Status = "shown", V.each(c.callbacks.show, function (t, e) {
                                e.call(c.$el)
                            }), c.callbacks.show = []
                        };
                        if ("hidden" !== c.Status) {
                            var e = 0;
                            "disappearing" === c.Status ? (c.Status = "appearing", d() ? (c.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + c.options.animation + "-show"), 0 < c.options.speed && c.$tooltip.delay(c.options.speed), c.$tooltip.queue(t)) : c.$tooltip.stop().fadeIn(t)) : "shown" === c.Status && t()
                        } else {
                            c.Status = "appearing";
                            e = c.options.speed;
                            c.bodyOverflowX = V("body").css("overflow-x"), V("body").css("overflow-x", "hidden");
                            var a = "tooltipster-" + c.options.animation,
                                o = "-webkit-transition-duration: " + c.options.speed + "ms; -webkit-animation-duration: " + c.options.speed + "ms; -moz-transition-duration: " + c.options.speed + "ms; -moz-animation-duration: " + c.options.speed + "ms; -o-transition-duration: " + c.options.speed + "ms; -o-animation-duration: " + c.options.speed + "ms; -ms-transition-duration: " + c.options.speed + "ms; -ms-animation-duration: " + c.options.speed + "ms; transition-duration: " + c.options.speed + "ms; animation-duration: " + c.options.speed + "ms;",
                                n = c.options.minWidth ? "min-width:" + Math.round(c.options.minWidth) + "px;" : "",
                                i = c.options.maxWidth ? "max-width:" + Math.round(c.options.maxWidth) + "px;" : "",
                                r = c.options.interactive ? "pointer-events: auto;" : "";
                            if (c.$tooltip = V('<div class="tooltipster-base ' + c.options.theme + '" style="' + n + " " + i + " " + r + " " + o + '"><div class="tooltipster-content"></div></div>'), d() && c.$tooltip.addClass(a), c._content_insert(), c.$tooltip.appendTo("body"), c.reposition(), c.options.functionReady.call(c.$el, c.$el, c.$tooltip), d() ? (c.$tooltip.addClass(a + "-show"), 0 < c.options.speed && c.$tooltip.delay(c.options.speed), c.$tooltip.queue(t)) : c.$tooltip.css("display", "none").fadeIn(c.options.speed, t), c._interval_set(), V(j).on("scroll." + c.namespace + " resize." + c.namespace, function () {
                                c.reposition()
                            }), c.options.autoClose)
                                if (V("body").off("." + c.namespace), "hover" == c.options.trigger) {
                                    if (u && setTimeout(function () {
                                        V("body").on("touchstart." + c.namespace, function () {
                                            c.hide()
                                        })
                                    }, 0), c.options.interactive) {
                                        u && c.$tooltip.on("touchstart." + c.namespace, function (t) {
                                            t.stopPropagation()
                                        });
                                        var s = null;
                                        c.$elProxy.add(c.$tooltip).on("mouseleave." + c.namespace + "-autoClose", function () {
                                            clearTimeout(s), s = setTimeout(function () {
                                                c.hide()
                                            }, c.options.interactiveTolerance)
                                        }).on("mouseenter." + c.namespace + "-autoClose", function () {
                                            clearTimeout(s)
                                        })
                                    } else c.$elProxy.on("mouseleave." + c.namespace + "-autoClose", function () {
                                        c.hide()
                                    });
                                    c.options.hideOnClick && c.$elProxy.on("click." + c.namespace + "-autoClose", function () {
                                        c.hide()
                                    })
                                } else "click" == c.options.trigger && (setTimeout(function () {
                                    V("body").on("click." + c.namespace + " touchstart." + c.namespace, function () {
                                        c.hide()
                                    })
                                }, 0), c.options.interactive && c.$tooltip.on("click." + c.namespace + " touchstart." + c.namespace, function (t) {
                                    t.stopPropagation()
                                }))
                        }
                        0 < c.options.timer && (c.timerHide = setTimeout(function () {
                            c.timerHide = null, c.hide()
                        }, c.options.timer + e))
                    }
                })
            },
            _interval_set: function () {
                var a = this;
                a.checkInterval = setInterval(function () {
                    if (0 === V("body").find(a.$el).length || 0 === V("body").find(a.$elProxy).length || "hidden" == a.Status || 0 === V("body").find(a.$tooltip).length) "shown" != a.Status && "appearing" != a.Status || a.hide(), a._interval_cancel();
                    else if (a.options.positionTracker) {
                        var t = a._repositionInfo(a.$elProxy),
                            e = !1;
                        n(t.dimension, a.elProxyPosition.dimension) && ("fixed" === a.$elProxy.css("position") ? n(t.position, a.elProxyPosition.position) && (e = !0) : n(t.offset, a.elProxyPosition.offset) && (e = !0)), e || (a.reposition(), a.options.positionTrackerCallback.call(a, a.$el))
                    }
                }, 200)
            },
            _interval_cancel: function () {
                clearInterval(this.checkInterval), this.checkInterval = null
            },
            _content_set: function (t) {
                "object" == typeof t && null !== t && this.options.contentCloning && (t = t.clone(!0)), this.Content = t
            },
            _content_insert: function () {
                var t = this.$tooltip.find(".tooltipster-content");
                "string" != typeof this.Content || this.options.contentAsHTML ? t.empty().append(this.Content) : t.text(this.Content)
            },
            _update: function (t) {
                var e = this;
                e._content_set(t), null !== e.Content ? "hidden" !== e.Status && (e._content_insert(), e.reposition(), e.options.updateAnimation && (d() ? (e.$tooltip.css({
                    width: "",
                    "-webkit-transition": "all " + e.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    "-moz-transition": "all " + e.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    "-o-transition": "all " + e.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    "-ms-transition": "all " + e.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                    transition: "all " + e.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                }).addClass("tooltipster-content-changing"), setTimeout(function () {
                    "hidden" != e.Status && (e.$tooltip.removeClass("tooltipster-content-changing"), setTimeout(function () {
                        "hidden" !== e.Status && e.$tooltip.css({
                            "-webkit-transition": e.options.speed + "ms",
                            "-moz-transition": e.options.speed + "ms",
                            "-o-transition": e.options.speed + "ms",
                            "-ms-transition": e.options.speed + "ms",
                            transition: e.options.speed + "ms"
                        })
                    }, e.options.speed))
                }, e.options.speed)) : e.$tooltip.fadeTo(e.options.speed, .5, function () {
                    "hidden" != e.Status && e.$tooltip.fadeTo(e.options.speed, 1)
                }))) : e.hide()
            },
            _repositionInfo: function (t) {
                return {
                    dimension: {
                        height: t.outerHeight(!1),
                        width: t.outerWidth(!1)
                    },
                    offset: t.offset(),
                    position: {
                        left: parseInt(t.css("left")),
                        top: parseInt(t.css("top"))
                    }
                }
            },
            hide: function (t) {
                var a = this;
                t && a.callbacks.hide.push(t), a.callbacks.show = [], clearTimeout(a.timerShow), a.timerShow = null, clearTimeout(a.timerHide), a.timerHide = null;
                var e = function () {
                    V.each(a.callbacks.hide, function (t, e) {
                        e.call(a.$el)
                    }), a.callbacks.hide = []
                };
                if ("shown" == a.Status || "appearing" == a.Status) {
                    a.Status = "disappearing";
                    var o = function () {
                        a.Status = "hidden", "object" == typeof a.Content && null !== a.Content && a.Content.detach(), a.$tooltip.remove(), a.$tooltip = null, V(j).off("." + a.namespace), V("body").off("." + a.namespace).css("overflow-x", a.bodyOverflowX), V("body").off("." + a.namespace), a.$elProxy.off("." + a.namespace + "-autoClose"), a.options.functionAfter.call(a.$el, a.$el), e()
                    };
                    d() ? (a.$tooltip.clearQueue().removeClass("tooltipster-" + a.options.animation + "-show").addClass("tooltipster-dying"), 0 < a.options.speed && a.$tooltip.delay(a.options.speed), a.$tooltip.queue(o)) : a.$tooltip.stop().fadeOut(a.options.speed, o)
                } else "hidden" == a.Status && e();
                return a
            },
            show: function (t) {
                return this._showNow(t), this
            },
            update: function (t) {
                return this.content(t)
            },
            content: function (t) {
                return void 0 === t ? this.Content : (this._update(t), this)
            },
            reposition: function () {
                var t = this;
                if (0 !== V("body").find(t.$tooltip).length) {
                    t.$tooltip.css("width", ""), t.elProxyPosition = t._repositionInfo(t.$elProxy);
                    var e = null,
                        a = V(j).width(),
                        o = t.elProxyPosition,
                        n = t.$tooltip.outerWidth(!1),
                        i = (t.$tooltip.innerWidth(), t.$tooltip.outerHeight(!1));
                    if (t.$elProxy.is("area")) {
                        var r = t.$elProxy.attr("shape"),
                            s = t.$elProxy.parent().attr("name"),
                            l = V('img[usemap="#' + s + '"]'),
                            c = l.offset().left,
                            u = l.offset().top,
                            d = void 0 !== t.$elProxy.attr("coords") ? t.$elProxy.attr("coords").split(",") : void 0;
                        if ("circle" == r) {
                            var m = parseInt(d[0]),
                                p = parseInt(d[1]),
                                _ = parseInt(d[2]);
                            o.dimension.height = 2 * _, o.dimension.width = 2 * _, o.offset.top = u + p - _, o.offset.left = c + m - _
                        } else if ("rect" == r) {
                            m = parseInt(d[0]), p = parseInt(d[1]);
                            var h = parseInt(d[2]),
                                f = parseInt(d[3]);
                            o.dimension.height = f - p, o.dimension.width = h - m, o.offset.top = u + p, o.offset.left = c + m
                        } else if ("poly" == r) {
                            for (var v = 0, C = 0, w = 0, g = 0, y = "even", $ = 0; $ < d.length; $++) {
                                var b = parseInt(d[$]);
                                "even" == y ? (w < b && (w = b, 0 === $ && (v = w)), b < v && (v = b), y = "odd") : (g < b && (g = b, 1 == $ && (C = g)), b < C && (C = b), y = "even")
                            }
                            o.dimension.height = g - C, o.dimension.width = w - v, o.offset.top = u + C, o.offset.left = c + v
                        } else o.dimension.height = l.outerHeight(!1), o.dimension.width = l.outerWidth(!1), o.offset.top = u, o.offset.left = c
                    }
                    var x = 0,
                        M = 0,
                        k = 0,
                        D = parseInt(t.options.offsetY),
                        S = parseInt(t.options.offsetX),
                        T = t.options.position;

                    function I() {
                        var t = V(j).scrollLeft();
                        x - t < 0 && (e = x - t, x = t), a < x + n - t && (e = x - (a + t - n), x = a + t - n)
                    }

                    function P(t, e) {
                        o.offset.top - V(j).scrollTop() - i - D - 12 < 0 && -1 < e.indexOf("top") && (T = t), o.offset.top + o.dimension.height + i + 12 + D > V(j).scrollTop() + V(j).height() && -1 < e.indexOf("bottom") && (T = t, k = o.offset.top - i - D - 12)
                    }

                    if ("top" == T) {
                        var L = o.offset.left + n - (o.offset.left + o.dimension.width);
                        x = o.offset.left + S - L / 2, k = o.offset.top - i - D - 12, I(), P("bottom", "top")
                    }
                    if ("top-left" == T && (x = o.offset.left + S, k = o.offset.top - i - D - 12, I(), P("bottom-left", "top-left")), "top-right" == T && (x = o.offset.left + o.dimension.width + S - n, k = o.offset.top - i - D - 12, I(), P("bottom-right", "top-right")), "bottom" == T) {
                        L = o.offset.left + n - (o.offset.left + o.dimension.width);
                        x = o.offset.left - L / 2 + S, k = o.offset.top + o.dimension.height + D + 12, I(), P("top", "bottom")
                    }
                    if ("bottom-left" == T && (x = o.offset.left + S, k = o.offset.top + o.dimension.height + D + 12, I(), P("top-left", "bottom-left")), "bottom-right" == T && (x = o.offset.left + o.dimension.width + S - n, k = o.offset.top + o.dimension.height + D + 12, I(), P("top-right", "bottom-right")), "left" == T) {
                        x = o.offset.left - S - n - 12, M = o.offset.left + S + o.dimension.width + 12;
                        var E = o.offset.top + i - (o.offset.top + o.dimension.height);
                        if (k = o.offset.top - E / 2 - D, x < 0 && a < M + n) {
                            var Y = 2 * parseFloat(t.$tooltip.css("border-width")),
                                A = n + x - Y;
                            t.$tooltip.css("width", A + "px"), i = t.$tooltip.outerHeight(!1), x = o.offset.left - S - A - 12 - Y, E = o.offset.top + i - (o.offset.top + o.dimension.height), k = o.offset.top - E / 2 - D
                        } else x < 0 && (x = o.offset.left + S + o.dimension.width + 12, e = "left")
                    }
                    if ("right" == T) {
                        x = o.offset.left + S + o.dimension.width + 12, M = o.offset.left - S - n - 12;
                        E = o.offset.top + i - (o.offset.top + o.dimension.height);
                        if (k = o.offset.top - E / 2 - D, a < x + n && M < 0) {
                            Y = 2 * parseFloat(t.$tooltip.css("border-width")), A = a - x - Y;
                            t.$tooltip.css("width", A + "px"), i = t.$tooltip.outerHeight(!1), E = o.offset.top + i - (o.offset.top + o.dimension.height), k = o.offset.top - E / 2 - D
                        } else a < x + n && (x = o.offset.left - S - n - 12, e = "right")
                    }
                    if (t.options.arrow) {
                        var O = "tooltipster-arrow-" + T;
                        if (t.options.arrowColor.length < 1) var N = t.$tooltip.css("background-color");
                        else N = t.options.arrowColor;
                        if (e ? "left" == e ? (O = "tooltipster-arrow-right", e = "") : "right" == e ? (O = "tooltipster-arrow-left", e = "") : e = "left:" + Math.round(e) + "px;" : e = "", "top" == T || "top-left" == T || "top-right" == T) var F = parseFloat(t.$tooltip.css("border-bottom-width")),
                            W = t.$tooltip.css("border-bottom-color");
                        else if ("bottom" == T || "bottom-left" == T || "bottom-right" == T) F = parseFloat(t.$tooltip.css("border-top-width")), W = t.$tooltip.css("border-top-color");
                        else if ("left" == T) F = parseFloat(t.$tooltip.css("border-right-width")), W = t.$tooltip.css("border-right-color");
                        else if ("right" == T) F = parseFloat(t.$tooltip.css("border-left-width")), W = t.$tooltip.css("border-left-color");
                        else F = parseFloat(t.$tooltip.css("border-bottom-width")), W = t.$tooltip.css("border-bottom-color");
                        1 < F && F++;
                        var R = "";
                        if (0 !== F) {
                            var z = "",
                                H = "border-color: " + W + ";";
                            -1 !== O.indexOf("bottom") ? z = "margin-top: -" + Math.round(F) + "px;" : -1 !== O.indexOf("top") ? z = "margin-bottom: -" + Math.round(F) + "px;" : -1 !== O.indexOf("left") ? z = "margin-right: -" + Math.round(F) + "px;" : -1 !== O.indexOf("right") && (z = "margin-left: -" + Math.round(F) + "px;"), R = '<span class="tooltipster-arrow-border" style="' + z + " " + H + ';"></span>'
                        }
                        t.$tooltip.find(".tooltipster-arrow").remove();
                        var U = '<div class="' + O + ' tooltipster-arrow" style="' + e + '">' + R + '<span style="border-color:' + N + ';"></span></div>';
                        t.$tooltip.append(U)
                    }
                    t.$tooltip.css({
                        top: Math.round(k) + "px",
                        left: Math.round(x) + "px"
                    })
                }
                return t
            },
            enable: function () {
                return this.enabled = !0, this
            },
            disable: function () {
                return this.hide(), this.enabled = !1, this
            },
            destroy: function () {
                var a = this;
                a.hide(), a.$el[0] !== a.$elProxy[0] && a.$elProxy.remove(), a.$el.removeData(a.namespace).off("." + a.namespace);
                var t = a.$el.data("tooltipster-ns");
                if (1 === t.length) {
                    var e = null;
                    "previous" === a.options.restoration ? e = a.$el.data("tooltipster-initialTitle") : "current" === a.options.restoration && (e = "string" == typeof a.Content ? a.Content : V("<div></div>").append(a.Content).html()), e && a.$el.attr("title", e), a.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
                } else t = V.grep(t, function (t, e) {
                    return t !== a.namespace
                }), a.$el.data("tooltipster-ns", t);
                return a
            },
            elementIcon: function () {
                return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : void 0
            },
            elementTooltip: function () {
                return this.$tooltip ? this.$tooltip[0] : void 0
            },
            option: function (t, e) {
                return void 0 === e ? this.options[t] : (this.options[t] = e, this)
            },
            status: function () {
                return this.Status
            }
        }, V.fn.tooltipster = function () {
            var o = arguments;
            if (0 === this.length) {
                if ("string" == typeof o[0]) {
                    var t = !0;
                    switch (o[0]) {
                        case "setDefaults":
                            V.extend(l, o[1]);
                            break;
                        default:
                            t = !1
                    }
                    return !!t || this
                }
                return this
            }
            if ("string" == typeof o[0]) {
                var n = "#*$~&";
                return this.each(function () {
                    var t = V(this).data("tooltipster-ns"),
                        e = t ? V(this).data(t[0]) : null;
                    console.log('e', e)
                    console.log('this', this)
                    if (!e) throw new Error("You called Tooltipster's \"" + o[0] + '" method on an uninitialized element');
                    if ("function" != typeof e[o[0]]) throw new Error('Unknown method .tooltipster("' + o[0] + '")');
                    var a = e[o[0]](o[1], o[2]);
                    if (a !== e) return n = a, !1
                }), "#*$~&" !== n ? n : this
            }
            var i = [],
                e = o[0] && void 0 !== o[0].multiple,
                r = e && o[0].multiple || !e && l.multiple,
                a = o[0] && void 0 !== o[0].debug,
                s = a && o[0].debug || !a && l.debug;
            return this.each(function () {
                var t = !1,
                    e = V(this).data("tooltipster-ns"),
                    a = null;
                e ? r ? t = !0 : s && console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.') : t = !0, t && (a = new c(this, o[0]), e || (e = []), e.push(a.namespace), V(this).data("tooltipster-ns", e), V(this).data(a.namespace, a)), i.push(a)
            }), r ? i : this
        };
        var u = !!("ontouchstart" in j),
            t = !1;

        function i() {
            return !t && u
        }

        function d() {
            var t = (o.body || o.documentElement).style,
                e = "transition";
            if ("string" == typeof t[e]) return !0;
            v = ["Moz", "Webkit", "Khtml", "O", "ms"], e = e.charAt(0).toUpperCase() + e.substr(1);
            for (var a = 0; a < v.length; a++)
                if ("string" == typeof t[v[a] + e]) return !0;
            return !1
        }

        V("body").one("mousemove", function () {
            t = !0
        })
    }(jQuery, window, document),
    function (e) {
        if (e.support.touch = "ontouchend" in document, e.support.touch) {
            var a, t = e.ui.mouse.prototype,
                o = t._mouseInit;
            t._touchStart = function (t) {
                !a && this._mouseCapture(t.originalEvent.changedTouches[0]) && (a = !0, this._touchMoved = !1, n(t, "mouseover"), n(t, "mousemove"), n(t, "mousedown"))
            }, t._touchMove = function (t) {
                a && (this._touchMoved = !0, n(t, "mousemove"))
            }, t._touchEnd = function (t) {
                a && (n(t, "mouseup"), n(t, "mouseout"), this._touchMoved || n(t, "click"), a = !1)
            }, t._mouseInit = function () {
                var t = this;
                t.element.bind("touchstart", e.proxy(t, "_touchStart")).bind("touchmove", e.proxy(t, "_touchMove")).bind("touchend", e.proxy(t, "_touchEnd")), o.call(t)
            }
        }

        function n(t, e) {
            if (!(1 < t.originalEvent.touches.length)) {
                t.preventDefault();
                var a = t.originalEvent.changedTouches[0],
                    o = document.createEvent("MouseEvents");
                o.initMouseEvent(e, !0, !0, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(o)
            }
        }
    }(jQuery),
    function (o) {
        function t(e, a) {
            return function (t) {
                return i(e.call(this, t), a)
            }
        }

        function e(e, a) {
            return function (t) {
                return this.lang().ordinal(e.call(this, t), a)
            }
        }

        function n() {
        }

        function s(t) {
            c(this, t)
        }

        function l(t) {
            var e = t.years || t.year || t.y || 0,
                a = t.months || t.month || t.M || 0,
                o = t.weeks || t.week || t.w || 0,
                n = t.days || t.day || t.d || 0,
                i = t.hours || t.hour || t.h || 0,
                r = t.minutes || t.minute || t.m || 0,
                s = t.seconds || t.second || t.s || 0,
                l = t.milliseconds || t.millisecond || t.ms || 0;
            this._input = t, this._milliseconds = l + 1e3 * s + 6e4 * r + 36e5 * i, this._days = n + 7 * o, this._months = a + 12 * e, this._data = {}, this._bubble()
        }

        function c(t, e) {
            for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
            return t
        }

        function u(t) {
            return t < 0 ? Math.ceil(t) : Math.floor(t)
        }

        function i(t, e) {
            for (var a = t + ""; a.length < e;) a = "0" + a;
            return a
        }

        function a(t, e, a, o) {
            var n, i, r = e._milliseconds,
                s = e._days,
                l = e._months;
            r && t._d.setTime(+t._d + r * a), (s || l) && (n = t.minute(), i = t.hour()), s && t.date(t.date() + s * a), l && t.month(t.month() + l * a), r && !o && k.updateOffset(t), (s || l) && (t.minute(n), t.hour(i))
        }

        function r(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function d(t, e) {
            var a, o = Math.min(t.length, e.length),
                n = Math.abs(t.length - e.length),
                i = 0;
            for (a = 0; a < o; a++) ~~t[a] != ~~e[a] && i++;
            return i + n
        }

        function m(t) {
            return t ? X[t] || t.toLowerCase().replace(/(.)s$/, "$1") : t
        }

        function p(t) {
            if (!t) return k.fn._lang;
            if (!T[t] && I) try {
                require("./lang/" + t)
            } catch (t) {
                return k.fn._lang
            }
            return T[t]
        }

        function _(e, t) {
            function a(t) {
                return e.lang().longDateFormat(t) || t
            }

            for (var o = 5; o-- && Y.test(t);) t = t.replace(Y, a);
            return B[t] || (B[t] = function (a) {
                var o, n, t, i = a.match(E);
                for (o = 0, n = i.length; o < n; o++) i[o] = J[i[o]] ? J[i[o]] : (t = i[o]).match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
                return function (t) {
                    var e = "";
                    for (o = 0; o < n; o++) e += i[o] instanceof Function ? i[o].call(t, a) : i[o];
                    return e
                }
            }(t)), B[t](e)
        }

        function h(t, e) {
            switch (t) {
                case "DDDD":
                    return N;
                case "YYYY":
                    return F;
                case "YYYYY":
                    return W;
                case "S":
                case "SS":
                case "SSS":
                case "DDD":
                    return O;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                    return R;
                case "a":
                case "A":
                    return p(e._l)._meridiemParse;
                case "X":
                    return U;
                case "Z":
                case "ZZ":
                    return z;
                case "T":
                    return H;
                case "MM":
                case "DD":
                case "YY":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                    return A;
                default:
                    return new RegExp(t.replace("\\", ""))
            }
        }

        function f(t) {
            var e = ((z.exec(t) || [])[0] + "").match(Z) || ["-", 0, 0],
                a = 60 * e[1] + ~~e[2];
            return "+" === e[0] ? -a : a
        }

        function v(t, e, a) {
            var o, n = a._a;
            switch (t) {
                case "M":
                case "MM":
                    n[1] = null == e ? 0 : ~~e - 1;
                    break;
                case "MMM":
                case "MMMM":
                    null != (o = p(a._l).monthsParse(e)) ? n[1] = o : a._isValid = !1;
                    break;
                case "D":
                case "DD":
                case "DDD":
                case "DDDD":
                    null != e && (n[2] = ~~e);
                    break;
                case "YY":
                    n[0] = ~~e + (68 < ~~e ? 1900 : 2e3);
                    break;
                case "YYYY":
                case "YYYYY":
                    n[0] = ~~e;
                    break;
                case "a":
                case "A":
                    a._isPm = p(a._l).isPM(e);
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    n[3] = ~~e;
                    break;
                case "m":
                case "mm":
                    n[4] = ~~e;
                    break;
                case "s":
                case "ss":
                    n[5] = ~~e;
                    break;
                case "S":
                case "SS":
                case "SSS":
                    n[6] = ~~(1e3 * ("0." + e));
                    break;
                case "X":
                    a._d = new Date(1e3 * parseFloat(e));
                    break;
                case "Z":
                case "ZZ":
                    a._useUTC = !0, a._tzm = f(e)
            }
            null == e && (a._isValid = !1)
        }

        function C(t) {
            var e, a, o = [];
            if (!t._d) {
                for (e = 0; e < 7; e++) t._a[e] = o[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                o[3] += ~~((t._tzm || 0) / 60), o[4] += ~~((t._tzm || 0) % 60), a = new Date(0), t._useUTC ? (a.setUTCFullYear(o[0], o[1], o[2]), a.setUTCHours(o[3], o[4], o[5], o[6])) : (a.setFullYear(o[0], o[1], o[2]), a.setHours(o[3], o[4], o[5], o[6])), t._d = a
            }
        }

        function w(t) {
            var e, a, o = t._f.match(E),
                n = t._i;
            for (t._a = [], e = 0; e < o.length; e++) (a = (h(o[e], t).exec(n) || [])[0]) && (n = n.slice(n.indexOf(a) + a.length)), J[o[e]] && v(o[e], a, t);
            n && (t._il = n), t._isPm && t._a[3] < 12 && (t._a[3] += 12), !1 === t._isPm && 12 === t._a[3] && (t._a[3] = 0), C(t)
        }

        function g(t) {
            var e = t._i,
                a = P.exec(e);
            e === o ? t._d = new Date : a ? t._d = new Date(+a[1]) : "string" == typeof e ? function (t) {
                var e, a = t._i,
                    o = V.exec(a);
                if (o) {
                    for (t._f = "YYYY-MM-DD" + (o[2] || " "), e = 0; e < 4; e++)
                        if (j[e][1].exec(a)) {
                            t._f += j[e][0];
                            break
                        }
                    z.exec(a) && (t._f += " Z"), w(t)
                } else t._d = new Date(a)
            }(t) : r(e) ? (t._a = e.slice(0), C(t)) : t._d = e instanceof Date ? new Date(+e) : new Date(e)
        }

        function y(t, e, a) {
            var o, n = a - e,
                i = a - t.day();
            return n < i && (i -= 7), i < n - 7 && (i += 7), o = k(t).add("d", i), {
                week: Math.ceil(o.dayOfYear() / 7),
                year: o.year()
            }
        }

        function $(t) {
            var e = t._i,
                a = t._f;
            return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = p().preparse(e)), k.isMoment(e) ? (t = c({}, e))._d = new Date(+e._d) : a ? r(a) ? function (t) {
                var e, a, o, n, i, r = 99;
                for (n = 0; n < t._f.length; n++) (e = c({}, t))._f = t._f[n], w(e), a = new s(e), i = d(e._a, a.toArray()), a._il && (i += a._il.length), i < r && (r = i, o = a);
                c(t, o)
            }(t) : w(t) : g(t), new s(t))
        }

        function b(t, a) {
            k.fn[t] = k.fn[t + "s"] = function (t) {
                var e = this._isUTC ? "UTC" : "";
                return null != t ? (this._d["set" + e + a](t), k.updateOffset(this), this) : this._d["get" + e + a]()
            }
        }

        function x(t) {
            k.duration.fn[t] = function () {
                return this._data[t]
            }
        }

        function M(t, e) {
            k.duration.fn["as" + t] = function () {
                return +this / e
            }
        }

        for (var k, D, S = Math.round, T = {}, I = "undefined" != typeof module && module.exports, P = /^\/?Date\((\-?\d+)/i, L = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, E = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, A = /\d\d?/, O = /\d{1,3}/, N = /\d{3}/, F = /\d{1,4}/, W = /[+\-]?\d{1,6}/, R = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, z = /Z|[\+\-]\d\d:?\d\d/i, H = /T/i, U = /[\+\-]?\d+(\.\d{1,3})?/, V = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, j = [
            ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ], Z = /([\+\-]|\d\d)/gi, G = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), q = {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        }, X = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            w: "week",
            M: "month",
            y: "year"
        }, B = {}, K = "DDD w W M D d".split(" "), Q = "M D H h m s w W".split(" "), J = {
            M: function () {
                return this.month() + 1
            },
            MMM: function (t) {
                return this.lang().monthsShort(this, t)
            },
            MMMM: function (t) {
                return this.lang().months(this, t)
            },
            D: function () {
                return this.date()
            },
            DDD: function () {
                return this.dayOfYear()
            },
            d: function () {
                return this.day()
            },
            dd: function (t) {
                return this.lang().weekdaysMin(this, t)
            },
            ddd: function (t) {
                return this.lang().weekdaysShort(this, t)
            },
            dddd: function (t) {
                return this.lang().weekdays(this, t)
            },
            w: function () {
                return this.week()
            },
            W: function () {
                return this.isoWeek()
            },
            YY: function () {
                return i(this.year() % 100, 2)
            },
            YYYY: function () {
                return i(this.year(), 4)
            },
            YYYYY: function () {
                return i(this.year(), 5)
            },
            gg: function () {
                return i(this.weekYear() % 100, 2)
            },
            gggg: function () {
                return this.weekYear()
            },
            ggggg: function () {
                return i(this.weekYear(), 5)
            },
            GG: function () {
                return i(this.isoWeekYear() % 100, 2)
            },
            GGGG: function () {
                return this.isoWeekYear()
            },
            GGGGG: function () {
                return i(this.isoWeekYear(), 5)
            },
            e: function () {
                return this.weekday()
            },
            E: function () {
                return this.isoWeekday()
            },
            a: function () {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },
            A: function () {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },
            H: function () {
                return this.hours()
            },
            h: function () {
                return this.hours() % 12 || 12
            },
            m: function () {
                return this.minutes()
            },
            s: function () {
                return this.seconds()
            },
            S: function () {
                return ~~(this.milliseconds() / 100)
            },
            SS: function () {
                return i(~~(this.milliseconds() / 10), 2)
            },
            SSS: function () {
                return i(this.milliseconds(), 3)
            },
            Z: function () {
                var t = -this.zone(),
                    e = "+";
                return t < 0 && (t = -t, e = "-"), e + i(~~(t / 60), 2) + ":" + i(~~t % 60, 2)
            },
            ZZ: function () {
                var t = -this.zone(),
                    e = "+";
                return t < 0 && (t = -t, e = "-"), e + i(~~(10 * t / 6), 4)
            },
            z: function () {
                return this.zoneAbbr()
            },
            zz: function () {
                return this.zoneName()
            },
            X: function () {
                return this.unix()
            }
        }; K.length;) D = K.pop(), J[D + "o"] = e(J[D], D);
        for (; Q.length;) D = Q.pop(), J[D + D] = t(J[D], 2);
        for (J.DDDD = t(J.DDD, 3), n.prototype = {
            set: function (t) {
                var e, a;
                for (a in t) "function" == typeof (e = t[a]) ? this[a] = e : this["_" + a] = e
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function (t) {
                return this._months[t.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function (t) {
                return this._monthsShort[t.month()]
            },
            monthsParse: function (t) {
                var e, a, o;
                for (this._monthsParse || (this._monthsParse = []), e = 0; e < 12; e++)
                    if (this._monthsParse[e] || (a = k([2e3, e]), o = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[e] = new RegExp(o.replace(".", ""), "i")), this._monthsParse[e].test(t)) return e
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function (t) {
                return this._weekdays[t.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function (t) {
                return this._weekdaysShort[t.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function (t) {
                return this._weekdaysMin[t.day()]
            },
            weekdaysParse: function (t) {
                var e, a, o;
                for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; e < 7; e++)
                    if (this._weekdaysParse[e] || (a = k([2e3, 1]).day(e), o = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[e] = new RegExp(o.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D YYYY",
                LLL: "MMMM D YYYY LT",
                LLLL: "dddd, MMMM D YYYY LT"
            },
            longDateFormat: function (t) {
                var e = this._longDateFormat[t];
                return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (t) {
                    return t.slice(1)
                }), this._longDateFormat[t] = e), e
            },
            isPM: function (t) {
                return "p" === (t + "").toLowerCase()[0]
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function (t, e, a) {
                return 11 < t ? a ? "pm" : "PM" : a ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function (t, e) {
                var a = this._calendar[t];
                return "function" == typeof a ? a.apply(e) : a
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function (t, e, a, o) {
                var n = this._relativeTime[a];
                return "function" == typeof n ? n(t, e, a, o) : n.replace(/%d/i, t)
            },
            pastFuture: function (t, e) {
                var a = this._relativeTime[0 < t ? "future" : "past"];
                return "function" == typeof a ? a(e) : a.replace(/%s/i, e)
            },
            ordinal: function (t) {
                return this._ordinal.replace("%d", t)
            },
            _ordinal: "%d",
            preparse: function (t) {
                return t
            },
            postformat: function (t) {
                return t
            },
            week: function (t) {
                return y(t, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            }
        }, (k = function (t, e, a) {
            return $({
                _i: t,
                _f: e,
                _l: a,
                _isUTC: !1
            })
        }).utc = function (t, e, a) {
            return $({
                _useUTC: !0,
                _isUTC: !0,
                _l: a,
                _i: t,
                _f: e
            })
        }, k.unix = function (t) {
            return k(1e3 * t)
        }, k.duration = function (t, e) {
            var a, o, n = k.isDuration(t),
                i = "number" == typeof t,
                r = n ? t._input : i ? {} : t,
                s = L.exec(t);
            return i ? e ? r[e] = t : r.milliseconds = t : s && (a = "-" === s[1] ? -1 : 1, r = {
                y: 0,
                d: ~~s[2] * a,
                h: ~~s[3] * a,
                m: ~~s[4] * a,
                s: ~~s[5] * a,
                ms: ~~s[6] * a
            }), o = new l(r), n && t.hasOwnProperty("_lang") && (o._lang = t._lang), o
        }, k.version = "2.1.0", k.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", k.updateOffset = function () {
        }, k.lang = function (t, e) {
            return t ? (e ? (a = t, (o = e).abbr = a, T[a] || (T[a] = new n), T[a].set(o), T[a]) : T[t] || p(t), void (k.duration.fn._lang = k.fn._lang = p(t))) : k.fn._lang._abbr;
            var a, o
        }, k.langData = function (t) {
            return t && t._lang && t._lang._abbr && (t = t._lang._abbr), p(t)
        }, k.isMoment = function (t) {
            return t instanceof s
        }, k.isDuration = function (t) {
            return t instanceof l
        }, k.fn = s.prototype = {
            clone: function () {
                return k(this)
            },
            valueOf: function () {
                return +this._d + 6e4 * (this._offset || 0)
            },
            unix: function () {
                return Math.floor(+this / 1e3)
            },
            toString: function () {
                return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function () {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function () {
                return _(k(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function () {
                var t = this;
                return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
            },
            isValid: function () {
                return null == this._isValid && (this._isValid = this._a ? !d(this._a, (this._isUTC ? k.utc(this._a) : k(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
            },
            utc: function () {
                return this.zone(0)
            },
            local: function () {
                return this.zone(0), this._isUTC = !1, this
            },
            format: function (t) {
                var e = _(this, t || k.defaultFormat);
                return this.lang().postformat(e)
            },
            add: function (t, e) {
                return a(this, "string" == typeof t ? k.duration(+e, t) : k.duration(t, e), 1), this
            },
            subtract: function (t, e) {
                return a(this, "string" == typeof t ? k.duration(+e, t) : k.duration(t, e), -1), this
            },
            diff: function (t, e, a) {
                var o, n, i = this._isUTC ? k(t).zone(this._offset || 0) : k(t).local(),
                    r = 6e4 * (this.zone() - i.zone());
                return "year" === (e = m(e)) || "month" === e ? (o = 432e5 * (this.daysInMonth() + i.daysInMonth()), n = 12 * (this.year() - i.year()) + (this.month() - i.month()), n += (this - k(this).startOf("month") - (i - k(i).startOf("month"))) / o, n -= 6e4 * (this.zone() - k(this).startOf("month").zone() - (i.zone() - k(i).startOf("month").zone())) / o, "year" === e && (n /= 12)) : (o = this - i, n = "second" === e ? o / 1e3 : "minute" === e ? o / 6e4 : "hour" === e ? o / 36e5 : "day" === e ? (o - r) / 864e5 : "week" === e ? (o - r) / 6048e5 : o), a ? n : u(n)
            },
            from: function (t, e) {
                return k.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
            },
            fromNow: function (t) {
                return this.from(k(), t)
            },
            calendar: function () {
                var t = this.diff(k().startOf("day"), "days", !0),
                    e = t < -6 ? "sameElse" : t < -1 ? "lastWeek" : t < 0 ? "lastDay" : t < 1 ? "sameDay" : t < 2 ? "nextDay" : t < 7 ? "nextWeek" : "sameElse";
                return this.format(this.lang().calendar(e, this))
            },
            isLeapYear: function () {
                var t = this.year();
                return 0 == t % 4 && 0 != t % 100 || 0 == t % 400
            },
            isDST: function () {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function (t) {
                var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != t ? "string" == typeof t && "number" != typeof (t = this.lang().weekdaysParse(t)) ? this : this.add({
                    d: t - e
                }) : e
            },
            month: function (t) {
                var e, a = this._isUTC ? "UTC" : "";
                return null != t ? ("string" == typeof t && "number" != typeof (t = this.lang().monthsParse(t)) || (e = this.date(), this.date(1), this._d["set" + a + "Month"](t), this.date(Math.min(e, this.daysInMonth())), k.updateOffset(this)), this) : this._d["get" + a + "Month"]()
            },
            startOf: function (t) {
                switch (t = m(t)) {
                    case "year":
                        this.month(0);
                    case "month":
                        this.date(1);
                    case "week":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return "week" === t && this.weekday(0), this
            },
            endOf: function (t) {
                return this.startOf(t).add(t, 1).subtract("ms", 1)
            },
            isAfter: function (t, e) {
                return e = void 0 !== e ? e : "millisecond", +this.clone().startOf(e) > +k(t).startOf(e)
            },
            isBefore: function (t, e) {
                return e = void 0 !== e ? e : "millisecond", +this.clone().startOf(e) < +k(t).startOf(e)
            },
            isSame: function (t, e) {
                return e = void 0 !== e ? e : "millisecond", +this.clone().startOf(e) == +k(t).startOf(e)
            },
            min: function (t) {
                return (t = k.apply(null, arguments)) < this ? this : t
            },
            max: function (t) {
                return this < (t = k.apply(null, arguments)) ? this : t
            },
            zone: function (t) {
                var e = this._offset || 0;
                return null == t ? this._isUTC ? e : this._d.getTimezoneOffset() : ("string" == typeof t && (t = f(t)), Math.abs(t) < 16 && (t *= 60), this._offset = t, this._isUTC = !0, e !== t && a(this, k.duration(e - t, "m"), 1, !0), this)
            },
            zoneAbbr: function () {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function () {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            daysInMonth: function () {
                return k.utc([this.year(), this.month() + 1, 0]).date()
            },
            dayOfYear: function (t) {
                var e = S((k(this).startOf("day") - k(this).startOf("year")) / 864e5) + 1;
                return null == t ? e : this.add("d", t - e)
            },
            weekYear: function (t) {
                var e = y(this, this.lang()._week.dow, this.lang()._week.doy).year;
                return null == t ? e : this.add("y", t - e)
            },
            isoWeekYear: function (t) {
                var e = y(this, 1, 4).year;
                return null == t ? e : this.add("y", t - e)
            },
            week: function (t) {
                var e = this.lang().week(this);
                return null == t ? e : this.add("d", 7 * (t - e))
            },
            isoWeek: function (t) {
                var e = y(this, 1, 4).week;
                return null == t ? e : this.add("d", 7 * (t - e))
            },
            weekday: function (t) {
                var e = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
                return null == t ? e : this.add("d", t - e)
            },
            isoWeekday: function (t) {
                return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
            },
            lang: function (t) {
                return t === o ? this._lang : (this._lang = p(t), this)
            }
        }, D = 0; D < G.length; D++) b(G[D].toLowerCase().replace(/s$/, ""), G[D]);
        for (D in b("year", "FullYear"), k.fn.days = k.fn.day, k.fn.months = k.fn.month, k.fn.weeks = k.fn.week, k.fn.isoWeeks = k.fn.isoWeek, k.fn.toJSON = k.fn.toISOString, k.duration.fn = l.prototype = {
            _bubble: function () {
                var t, e, a, o, n = this._milliseconds,
                    i = this._days,
                    r = this._months,
                    s = this._data;
                s.milliseconds = n % 1e3, t = u(n / 1e3), s.seconds = t % 60, e = u(t / 60), s.minutes = e % 60, a = u(e / 60), s.hours = a % 24, i += u(a / 24), s.days = i % 30, r += u(i / 30), s.months = r % 12, o = u(r / 12), s.years = o
            },
            weeks: function () {
                return u(this.days() / 7)
            },
            valueOf: function () {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * ~~(this._months / 12)
            },
            humanize: function (t) {
                var e, a, o, n, i, r, s, l, c, u = +this,
                    d = (e = u, a = !t, o = this.lang(), n = S(Math.abs(e) / 1e3), i = S(n / 60), r = S(i / 60), s = S(r / 24), l = S(s / 365), (c = n < 45 && ["s", n] || 1 === i && ["m"] || i < 45 && ["mm", i] || 1 === r && ["h"] || r < 22 && ["hh", r] || 1 === s && ["d"] || s <= 25 && ["dd", s] || s <= 45 && ["M"] || s < 345 && ["MM", S(s / 30)] || 1 === l && ["y"] || ["yy", l])[2] = a, c[3] = 0 < e, c[4] = o, function (t, e, a, o, n) {
                        return n.relativeTime(e || 1, !!a, t, o)
                    }.apply({}, c));
                return t && (d = this.lang().pastFuture(u, d)), this.lang().postformat(d)
            },
            add: function (t, e) {
                var a = k.duration(t, e);
                return this._milliseconds += a._milliseconds, this._days += a._days, this._months += a._months, this._bubble(), this
            },
            subtract: function (t, e) {
                var a = k.duration(t, e);
                return this._milliseconds -= a._milliseconds, this._days -= a._days, this._months -= a._months, this._bubble(), this
            },
            get: function (t) {
                return this[(t = m(t)).toLowerCase() + "s"]()
            },
            as: function (t) {
                return this["as" + (t = m(t)).charAt(0).toUpperCase() + t.slice(1) + "s"]()
            },
            lang: k.fn.lang
        }, q) q.hasOwnProperty(D) && (M(D, q[D]), x(D.toLowerCase()));
        M("Weeks", 6048e5), k.duration.fn.asMonths = function () {
            return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
        }, k.lang("en", {
            ordinal: function (t) {
                var e = t % 10;
                return t + (1 == ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
            }
        }), I && (module.exports = k), "undefined" == typeof ender && (this.moment = k), "function" == typeof define && define.amd && define("moment", [], function () {
            return k
        })
    }.call(this),
    function () {
        function t(t) {
            function e(t, e, a) {
                var o, n;
                return "m" === a ? e ? "минута" : "минуту" : t + " " + (o = +t, n = {
                    mm: "минута_минуты_минут",
                    hh: "час_часа_часов",
                    dd: "день_дня_дней",
                    MM: "месяц_месяца_месяцев",
                    yy: "год_года_лет"
                } [a].split("_"), 1 == o % 10 && 11 != o % 100 ? n[0] : 2 <= o % 10 && o % 10 <= 4 && (o % 100 < 10 || 20 <= o % 100) ? n[1] : n[2])
            }

            t.lang("ru", {
                months: function (t, e) {
                    return {
                        nominative: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
                        accusative: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
                    } [/D[oD]? *MMMM?/.test(e) ? "accusative" : "nominative"][t.month()]
                },
                monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
                weekdays: function (t, e) {
                    return {
                        nominative: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
                        accusative: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
                    } [/\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e)? ?\] ?dddd/.test(e) ? "accusative" : "nominative"][t.day()]
                },
                weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
                weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
                longDateFormat: {
                    LT: "HH:mm",
                    L: "DD.MM.YYYY",
                    LL: "D MMMM YYYY г.",
                    LLL: "D MMMM YYYY г., LT",
                    LLLL: "dddd, D MMMM YYYY г., LT"
                },
                calendar: {
                    sameDay: "[Сегодня в] LT",
                    nextDay: "[Завтра в] LT",
                    lastDay: "[Вчера в] LT",
                    nextWeek: function () {
                        return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT"
                    },
                    lastWeek: function () {
                        switch (this.day()) {
                            case 0:
                                return "[В прошлое] dddd [в] LT";
                            case 1:
                            case 2:
                            case 4:
                                return "[В прошлый] dddd [в] LT";
                            case 3:
                            case 5:
                            case 6:
                                return "[В прошлую] dddd [в] LT"
                        }
                    },
                    sameElse: "L"
                },
                relativeTime: {
                    future: "через %s",
                    past: "%s назад",
                    s: "несколько секунд",
                    m: e,
                    mm: e,
                    h: "час",
                    hh: e,
                    d: "день",
                    dd: e,
                    M: "месяц",
                    MM: e,
                    y: "год",
                    yy: e
                },
                ordinal: function (t, e) {
                    switch (e) {
                        case "M":
                        case "d":
                        case "DDD":
                            return t + "-й";
                        case "D":
                            return t + "-го";
                        case "w":
                        case "W":
                            return t + "-я";
                        default:
                            return t
                    }
                },
                week: {
                    dow: 1,
                    doy: 7
                }
            })
        }

        "function" == typeof define && define.amd && define(["moment"], t), "undefined" != typeof window && window.moment && t(window.moment)
    }(),
    function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function (_) {
        var o = /\+/g;

        function h(t) {
            return v.raw ? t : encodeURIComponent(t)
        }

        function f(t, e) {
            var a = v.raw ? t : function (t) {
                0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                try {
                    return t = decodeURIComponent(t.replace(o, " ")), v.json ? JSON.parse(t) : t
                } catch (t) {
                }
            }(t);
            return _.isFunction(e) ? e(a) : a
        }

        var v = _.cookie = function (t, e, a) {
            if (1 < arguments.length && !_.isFunction(e)) {
                if ("number" == typeof (a = _.extend({}, v.defaults, a)).expires) {
                    var o = a.expires,
                        n = a.expires = new Date;
                    n.setMilliseconds(n.getMilliseconds() + 864e5 * o)
                }
                return document.cookie = [h(t), "=", (i = e, h(v.json ? JSON.stringify(i) : String(i))), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
            }
            for (var i, r, s = t ? void 0 : {}, l = document.cookie ? document.cookie.split("; ") : [], c = 0, u = l.length; c < u; c++) {
                var d = l[c].split("="),
                    m = (r = d.shift(), v.raw ? r : decodeURIComponent(r)),
                    p = d.join("=");
                if (t === m) {
                    s = f(p, e);
                    break
                }
                t || void 0 === (p = f(p)) || (s[m] = p)
            }
            return s
        };
        v.defaults = {}, _.removeCookie = function (t, e) {
            return _.cookie(t, "", _.extend({}, e, {
                expires: -1
            })), !_.cookie(t)
        }
    });
/////////настройки/////////////////////
var pageIsLoaded = !1,
    creditSettingsList = [{
        minDays: 5,
        maxDays: 30,
        initialDaysValue: 14,
        minCost: 1500,
        maxCost: 1e4,
        initialCostValue: 9e3,
        bonusCostValue: 300,
        period: "",
        percentPerDay: .01,
        fee: 0,
        feePercentPerDay: 5e-4,
        feePercentLimit: .2,
        current: !0,
        orderNumber: 0,
        name: "Старт",
        appliedPercentPerDayDiscount: "0.0",
        available: "true"
    }];
if ("/lp/main3/" != window.location.pathname && "/lp/main2/" != window.location.pathname || (creditSettingsList[0].percentPerDay = .02), "/main2/" == window.location.pathname) {
    creditSettingsList.length = 1;
    var mmCalculatorNew = function () {
        console.log(8888);
        var P, L, E, Y, A, O, N, F = {};

        function W() {
            var t, e, a, o, n, i, r, s = null;
            if (F.calcSum > F.currentProduct.maxCost || F.calcSum < F.currentProduct.minCost)
                for (var l = 0; l < F.products.length; l++)
                    if (t = F.products[l], F.calcSum >= t.minCost && F.calcSum <= t.maxCost) {
                        F.currentProduct = t;
                        break
                    }
            if (mmCalculatorNew.currentProduct = F.currentProduct, e = F.calcSum, $(".mainCalculatorInfo__col_1 .mainCalculator__info__value").html(m(e)), o = F.currentProduct.percentPerDay, a = "" == F.currentProduct.period ? F.calcDays : 7 * F.calcDays, window.percentDiscount && ("PERCENTAGE_DISCOUNT" === window.percentType && (s = o - window.percentDiscount), "PERCENT_OF_CREDIT_PERCENT_DISCOUNT" === window.percentType && (s = o * (1 - window.percentDiscount))), "TWO_WEEKS" == F.currentProduct.period) {
                $(".mainCalculatorInfo__col_4 .mainCalculator__info__value").html(m((r = s || o, Math.abs(Math.round(p(14 * r, a / 14, e, 0, !1)))))), $(".mainCalculatorInfo__col_3 .mainCalculator__info__value").html(m((i = s || o, Math.abs(Math.round(p(14 * i, a / 14, e, 0, !1))) * (a / 14))))
            } else $(".mainCalculatorInfo__col_3 .mainCalculator__info__value").html(m((n = s || o, Math.round(e * (1 + a * n)))));
            $(".mainCalculatorInfo__data__newClient .mainCalculator__info__value").html(m(e));
            var c, u = moment();
            c = "" == F.currentProduct.period ? u.add("d", F.calcDays) : u.add("w", F.calcDays);
            var d = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря")[c.month()];
            $(".mainCalculatorInfo__col_2 .mainCalculator__info__value").html(c.format("D") + " "), $(".mainCalculatorInfo__col_2 .mainCalculator__info__label").html(d + c.format(", YYYY")), 15 < parseInt($("#days").val()) ? ($(".mainCalculator").removeClass("mainCalculator_start0"), $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").hasClass("promoAccept") && ($(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").removeClass("promoAccept"), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").css("display", "none")), $(".mainCalculator__submit").attr("value", "Получить деньги")) : ($(".mainCalculator__submit").attr("value", "Получить бесплатно"), $(".mainCalculator").hasClass("mainCalculator_start0") || $(".mainCalculator").addClass("mainCalculator_start0"), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").css("display", "block").find(".mainCalculator__info__value").text(m(e)), $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").hasClass("promoAccept") || $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").addClass("promoAccept"))
        }

        function m(t) {
            return 999 < t ? t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1 ") : t
        }

        function p(t, e, a, o, n) {
            var i = 0;
            if (0 == t) i = -1 * (o + a) / e;
            else {
                var r = t + 1;
                i = (o + a * Math.pow(r, e)) * t / ((n ? r : 1) * (1 - Math.pow(r, e)))
            }
            return i
        }

        return {
            init: function () {
                var t;
                F.products = creditSettingsList, F.currentProduct = null, F.minSum = null, F.maxSum = null, F.calcSum = 0;
                for (var e = F.calcDays = 0; e < F.products.length; e++) t = F.products[e], (null == F.minSum || F.minSum > t.minCost) && (F.minSum = t.minCost), (null == F.maxSum || F.maxSum < t.maxCost) && (F.maxSum = t.maxCost), 1 == t.current && (F.currentProduct = t);
                mmCalculatorNew.currentProduct = F.currentProduct, this.mainCalculatorSum.init(), this.mainCalculatorDate.init()
            },
            mainCalculatorSum: function () {
                var t = $(".mainCalculator__box_1"),
                    l = t.closest(".mainCalculator"),
                    c = $(".mainCalculator__slider", t),
                    u = $(".mainCalculator__input", t),
                    e = parseInt($(".mainCalculator__val", t).val()),
                    a = parseInt($(".mainCalculator__min", t).val()),
                    o = parseInt($(".mainCalculator__mid", t).val()),
                    n = parseInt($(".mainCalculator__max", t).val()),
                    d = (parseInt($(".mainCalculator__step", t).val()), $(".mainCalculator__sign", t).val()),
                    m = $(".mainCalculator__server", t),
                    i = ($(".mainCalculatorLabel__min", t).html(a.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")), $(".mainCalculatorLabel__max", t).html(n.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")), $(".mainCalculator__after", t).val()),
                    p = "",
                    r = Math.floor(c.width()) % 2 == 0 ? Math.floor(c.width()) : Math.floor(c.width()) - 1,
                    _ = Math.floor(r / 2),
                    h = o,
                    s = n - h,
                    f = (h / _).toFixed(3),
                    v = (s / _).toFixed(3),
                    C = Math.round(a / f),
                    w = 0,
                    g = $(window).width(),
                    y = null;

                function b() {
                    w = e <= h ? e / f : (e - h) / v + _, w = Math.round(w)
                }

                function x() {
                    c.hasClass("ui-slider") && (c.slider("destroy"), $(".mainCalculatorDynamic", t).remove())
                }

                function M() {
                    c.slider({
                        value: w,
                        min: C,
                        max: r,
                        step: 1,
                        orientation: "horizontal",
                        range: "min",
                        slide: function (t, e) {
                            k(t, e)
                        },
                        change: function (t, e) {
                            if (k(t, e), $("body").trigger("slider-amount-changed"), pageIsLoaded) {
                                setCookie("mm_calc_amount", $("#money").val());
                                var a = parseInt($("#days").val());
                                "TWO_WEEKS" == mmCalculatorNew.currentProduct.period && 70 == (a *= 7) && (a += 10), setCookie("mm_calc_days", a)
                            }
                        }
                    }), P = c, E = _, A = f, s, v, h, $('<div class="mainCalculatorDynamic"><input type="text" name="money" value="' + e + '" class="mainCalculatorDynamic__input" id="money"><div class="mainCalculatorDynamic__after">' + i + "</div></div>").insertAfter($(".mainCalculator__title", t)), (p = $(".mainCalculatorDynamic__input", t)).on("input", function () {
                        D($(this))
                    }), p.on("blur", function () {
                        D($(this), !0)
                    }), p.keypress(function (t) {
                        13 == t.which && $(this).blur()
                    }), c.slider("option", "value", w)
                }

                function k(t, e) {
                    var a, o, n, i, r = e.value.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ") + " " + d,
                        s = 0;
                    s = e.value <= _ ? (e.value * f).toFixed(0) : (e.value - _) * v + h, a = 500 * Math.round(s / 500), "/lp/main2/" == window.location.pathname ? 1e4 < a ? l.removeClass("mainCalculator_new_client_rabat8") : l.addClass("mainCalculator_new_client_rabat8") : "/lp/main3/" == window.location.pathname ? 1e4 < a ? l.removeClass("mainCalculator_new_client_rabat25") : l.addClass("mainCalculator_new_client_rabat25") : 1e4 < a ? l.removeClass("mainCalculator_new_client") : l.addClass("mainCalculator_new_client"), 3e4 < a ? l.removeClass("mainCalculator_limit") : (l.addClass("mainCalculator_limit"), N = a), e.value, u.html(r), m.val(a), p.val(a).trigger("change"), o = c, n = e.value, i = _, o.hasClass("mainCalculator__sum") && !$(".mainCalculator__help").hasClass("closed") && (i < n ? $(".mainCalculator__help .mainCalculator__tooltip.tooltipstered").tooltipster("show") : $(".mainCalculator__help .mainCalculator__tooltip.tooltipstered").tooltipster("hide")), L && Y && a < 10001 && L.slider("value") > 31 / O && L.slider("value", 31 / O), F.calcSum = a, W()
                }

                function D(e, t) {
                    var a;
                    y && clearTimeout(y), a = 4e3, t && (a = 0), y = setTimeout(function () {
                        var t = parseInt(e.val()) || 0;
                        t < h ? t /= f : t = (t - h) / v + _, c.slider("value", t), e.trigger("change")
                    }, a)
                }

                return !pageIsLoaded && $.cookie("mm_calc_amount") && (e = parseInt($.cookie("mm_calc_amount"))), {
                    init: function () {
                        pageIsLoaded || b(), x(), M(), $(window).resize(function () {
                            $(window).width() !== g && (g = $(window).width(), b(), x(), M())
                        })
                    }
                }
            }(),
            mainCalculatorDate: function () {
                var r = $(".mainCalculator__box_2"),
                    o = $(".mainCalculator__slider", r),
                    s = $(".mainCalculator__input", r),
                    t = parseInt($(".mainCalculator__val", r).val()),
                    e = parseInt($(".mainCalculator__min", r).val()),
                    a = parseInt($(".mainCalculator__mid", r).val()),
                    n = parseInt($(".mainCalculator__next", r).val()),
                    i = parseInt($(".mainCalculator__max", r).val()),
                    l = (parseInt($(".mainCalculator__step", r).val()), $(".mainCalculator__sign", r).val()),
                    c = $(".mainCalculator__server", r),
                    u = ($(".mainCalculatorLabel__min", r).html(e.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")), $(".mainCalculatorLabel__max", r).html(i), $(".mainCalculator__after", r).val()),
                    d = "",
                    m = "",
                    p = o.width(),
                    _ = 0,
                    h = p / 1,
                    f = a,
                    v = n,
                    C = f / h,
                    w = v / h,
                    g = i / h,
                    y = Math.ceil(e / C),
                    b = 0,
                    x = $(window).width();
                !pageIsLoaded && $.cookie("mm_calc_days") && (t = parseInt($.cookie("mm_calc_days")));
                var M = null;

                function k() {
                    b = t <= f ? t / C : f < t && t <= v ? t / w : (t - f - v) / g + h + _, b = Math.ceil(b)
                }

                function D() {
                    o.hasClass("ui-slider") && (o.slider("destroy"), $(".mainCalculatorDynamic", r).remove())
                }

                function S() {
                    o.slider({
                        value: b,
                        min: y,
                        max: p,
                        step: 1,
                        orientation: "horizontal",
                        range: "min",
                        slide: function (t, e) {
                            T(t, e)
                        },
                        change: function (t, e) {
                            if (T(t, e), $("body").trigger("slider-day-changed"), pageIsLoaded) {
                                var a = parseInt($("#days").val());
                                "TWO_WEEKS" == mmCalculatorNew.currentProduct.period && 70 == (a *= 7) && (a += 10), setCookie("mm_calc_days", a)
                            }
                        }
                    }), L = o, Y = h, O = C, f, $('<div class="mainCalculatorDynamic"><input type="text" name="days" value="' + t + '" class="mainCalculatorDynamic__input" id="days"><div class="mainCalculatorDynamic__after">' + u + "</div></div>").insertAfter($(".mainCalculator__title", r)), d = $(".mainCalculatorDynamic__input", r), m = $(".mainCalculatorDynamic__after", r), d.on("input", function () {
                        I($(this))
                    }), d.on("blur", function () {
                        I($(this), !0)
                    }), d.keypress(function (t) {
                        13 == t.which && $(this).blur()
                    }), o.slider("option", "value", b)
                }

                function T(t, e) {
                    var a, o = e.value.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ") + " " + l,
                        n = 0,
                        i = "";
                    e.value <= Math.round(f / C) ? (n = (e.value * C).toFixed(0), i = "дней", r.removeClass("mainCalculator__box_swap")) : e.value > h && e.value < h + _ ? (n = (e.value * w).toFixed(0), i = "дней", r.removeClass("mainCalculator__box_swap")) : ((n = (n = (e.value - f / C - _) * g + f + v).toFixed(0)) % 2 != 0 && (n -= 1), i = "дней", r.addClass("mainCalculator__box_swap")), a = 1 * Math.round(n / 1), e.value, s.html(o), c.val(a), d.val(a), m.html(i), P && E && (e.value > f / C ? P.slider("value") <= Math.round(3e4 / A) && P.slider("value", Math.round(30500 / A) - 1) : e.value <= f / C && ($(".mainCalculatorInfo__tooltip.tooltipstered").tooltipster("hide"), P.slider("value") > Math.round(3e4 / A) && P.slider("value", Math.round((N || 3e4) / A)))), F.calcDays = a, W()
                }

                function I(a, t) {
                    var e;
                    M && clearTimeout(M), e = 4e3, t && (e = 0), M = setTimeout(function () {
                        var t = parseInt(a.val()) || 0,
                            e = o.slider("value");
                        e < h ? t /= C : h < e && e < h + _ ? t /= w : t = (7 * t - f - v) / g + h + _, o.slider("value", t), a.trigger("change")
                    }, e)
                }

                return {
                    init: function () {
                        pageIsLoaded || k(), D(), S(), $(window).resize(function () {
                            $(window).width() !== x && (x = $(window).width(), k(), D(), S())
                        })
                    }
                }
            }()
        }
    }()
} else mmCalculatorNew = function () {
    var L, E, Y, A, O, N, F, W, R = {};

    function m(t) {
        return 999 < t ? t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1 ") : t
    }

    function p(t, e, a, o, n) {
        var i = 0;
        if (0 === t) i = -1 * (o + a) / e;
        else {
            var r = t + 1;
            i = (o + a * Math.pow(r, e)) * t / ((n ? r : 1) * (1 - Math.pow(r, e)))
        }
        return i
    }

    return window.calcRecalc = function () {
        var t, e, a, o, n = null;
        if (R.calcSum > R.currentProduct.maxCost || R.calcSum < R.currentProduct.minCost)
            for (var i = 0; i < R.products.length; i++)
                if (t = R.products[i], R.calcSum >= t.minCost && R.calcSum <= t.maxCost) {
                    R.currentProduct = t;
                    break
                }

        function r(t) {
            return Math.round(e * (1 + a * t))
        }

        function s(t) {
            return Math.abs(Math.round(p(14 * t, a / 14, e, 0, !1))) * (a / 14)
        }

        if (mmCalculatorNew.currentProduct = R.currentProduct, e = R.calcSum, $(".mainCalculatorInfo__col_1 .mainCalculator__info__value").html(m(e)), o = R.currentProduct.percentPerDay, a = "" == R.currentProduct.period ? R.calcDays : 7 * R.calcDays, window.percentDiscount && ("PERCENTAGE_DISCOUNT" === window.percentType && (n = o - window.percentDiscount), "PERCENT_OF_CREDIT_PERCENT_DISCOUNT" === window.percentType && (n = o * (1 - window.percentDiscount))), "TWO_WEEKS" == R.currentProduct.period) {
            function l(t) {
                return Math.abs(Math.round(p(14 * t, a / 14, e, 0, !1)))
            }

            $(".mainCalculatorInfo__col_4 .mainCalculator__info__value").html(m(l(o))), n ? ($(".mainCalculatorInfo__col_4 .mainCalculator__info__data_new").show(), $(".mainCalculatorInfo__col_4 .mainCalculator__info__data_default").addClass("promoAccept"), $(".mainCalculatorInfo__col_4 .mainCalculator__info__data_new .mainCalculator__info__value").html(m(l(n)))) : ($(".mainCalculatorInfo__col_4 .mainCalculator__info__data_new").hide(), $(".mainCalculatorInfo__col_4 .mainCalculator__info__data_default").removeClass("promoAccept")), $(".mainCalculatorInfo__col_3 .mainCalculator__info__value").html(m(s(o))), n ? ($(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").show(), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_default").addClass("promoAccept"), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new .mainCalculator__info__value").html(m(s(n)))) : ($(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").hide(), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_default").removeClass("promoAccept"))
        } else $(".mainCalculatorInfo__col_3 .mainCalculator__info__value").html(m(r(o))), n ? ($(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").show(), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_default").addClass("promoAccept"), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new .mainCalculator__info__value").html(m(r(n)))) : ($(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").hide(), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_default").removeClass("promoAccept"));
        $(".mainCalculatorInfo__data__newClient .mainCalculator__info__value").html(m(e));
        var c, u = moment();
        c = "" == R.currentProduct.period ? u.add("d", R.calcDays) : u.add("w", R.calcDays);
        var d = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря")[c.month()];
        $(".mainCalculatorInfo__col_2 .mainCalculator__info__value").html(c.format("D") + " "), $(".mainCalculatorInfo__col_2 .mainCalculator__info__label").html(d + c.format(", YYYY")), 1e4 < parseInt($("#money").val()) ? (getCookie("checkpromocode") && ($(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").hasClass("promoAccept") && $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").addClass("promoAccept"), App.setCookie("promocode", getCookie("checkpromocode"), {
            expires: 30,
            path: "/" //промо
        })), $(".mainCalculator__promoWrapper").hasClass("hide") && $(".mainCalculator__promoWrapper").removeClass("hide"), $(".mainCalculator").removeClass("mainCalculator_start0"), $(".mainCalculator__submit").attr("value", "Получить деньги")) : 1 < parseInt($("#days").val()) && !$(".mainCalculator__box_2").hasClass("mainCalculator__box_swap") || 10 <= parseInt($("#days").val()) && $(".mainCalculator__box_2").hasClass("mainCalculator__box_swap") ? (getCookie("checkpromocode") && ($(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").hasClass("promoAccept") && $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").addClass("promoAccept"), App.setCookie("promocode", getCookie("checkpromocode"), {
            expires: 30,
            path: "/"
        })), $(".mainCalculator__promoWrapper").hasClass("hide") && $(".mainCalculator__promoWrapper").removeClass("hide"), $(".mainCalculator").removeClass("mainCalculator_start0"), $(".mainCalculator__submit").attr("value", "Получить деньги")) : ($(".mainCalculator__submit").attr("value", "Получить бесплатно"), $(".mainCalculator").hasClass("mainCalculator_start0") || $(".mainCalculator").addClass("mainCalculator_start0"), $(".mainCalculatorInfo__col_3 .mainCalculator__info__data_new").css("display", "block").find(".mainCalculator__info__value").text(m(e)), $(".mainCalculator__promoWrapper").hasClass("hide") || $(".mainCalculator__promoWrapper").addClass("hide"), $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").hasClass("promoAccept") || $(".mainCalculatorInfo__col_3").find(".mainCalculator__info__data_default").addClass("promoAccept"), getCookie("promocode") && (App.setCookie("checkpromocode", getCookie("promocode"), {
            expires: 30,
            path: "/"
        }), $.removeCookie("promocode", {
            path: "/"
        })))
    }, {
        init: function () {
            var t;
            R.products = creditSettingsList, R.currentProduct = null, R.minSum = null, R.maxSum = null, R.calcSum = 0;
            for (var e = R.calcDays = 0; e < R.products.length; e++) {
                t = R.products[e],
                (null == R.minSum || R.minSum > t.minCost) && (R.minSum = t.minCost),
                (null == R.maxSum || R.maxSum < t.maxCost) && (R.maxSum = t.maxCost),
                1 == t.current && (R.currentProduct = t);

            }
            console.log(this)
            mmCalculatorNew.currentProduct = R.currentProduct, this.mainCalculatorSum.init(), this.mainCalculatorDate.init()
        },
        mainCalculatorSum: function () {
            var t = $(".mainCalculator__box_1"),
                l = t.closest(".mainCalculator"),
                c = $(".mainCalculator__slider", t),
                u = $(".mainCalculator__input", t),
                e = parseInt($(".mainCalculator__val", t).val()),
                a = parseInt($(".mainCalculator__min", t).val()),
                o = parseInt($(".mainCalculator__mid", t).val()),
                n = parseInt($(".mainCalculator__max", t).val()),
                d = (parseInt($(".mainCalculator__step", t).val()), $(".mainCalculator__sign", t).val()),
                m = $(".mainCalculator__server", t),
                i = ($(".mainCalculatorLabel__min", t).html(a.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")), $(".mainCalculatorLabel__max", t).html(n.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")), $(".mainCalculator__after", t).val()),
                p = "",
                r = Math.floor(c.width()) % 2 == 0 ? Math.floor(c.width()) : Math.floor(c.width()) - 1,
                _ = Math.floor(r / 2),
                h = o,
                s = n - h,
                f = (h / _).toFixed(3),
                v = (s / _).toFixed(3),
                C = Math.round(a / f),
                w = 0,
                g = $(window).width();
            !pageIsLoaded && $.cookie("mm_calc_amount") && (e = parseInt($.cookie("mm_calc_amount")));
            var y = null;

            function b() {
                w = e <= h ? e / f : (e - h) / v + _, w = Math.round(w)
            }

            function x() {

                c.hasClass("ui-slider") && (c.slider("destroy"), $(".mainCalculatorDynamic", t).remove())
            }

            function M() {
                c.slider({
                    value: w,
                    min: C,
                    max: r,
                    step: 1,
                    orientation: "horizontal",
                    range: "min",
                    slide: function (t, e) {
                        k(t, e)
                    },
                    change: function (t, e) {
                        console.log(k)
                        console.log(pageIsLoaded)
                        if (k(t, e), $("body").trigger("slider-amount-changed"), pageIsLoaded) {

                            setCookie("mm_calc_amount", $("#money").val());
                            var a = parseInt($("#days").val());
                            "TWO_WEEKS" == mmCalculatorNew.currentProduct.period && 70 == (a *= 7) && (a += 10), setCookie("mm_calc_days", a)
                        }
                    }
                }), L = c, Y = _, O = f, s, v, h, $('<div class="mainCalculatorDynamic"><input type="text" name="money" value="' + e + '" class="mainCalculatorDynamic__input" id="money"><div class="mainCalculatorDynamic__after">' + i + "</div></div>").insertAfter($(".mainCalculator__title", t)), (p = $(".mainCalculatorDynamic__input", t)).on("input", function () {
                    D($(this))
                }), p.on("blur", function () {
                    D($(this), !0)
                }), p.keypress(function (t) {
                    13 == t.which && $(this).blur()
                }), c.slider("option", "value", w)
            }

            function k(t, e) {
                var a, o, n, i, r = e.value.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ") + " " + d,
                    s = 0;
                s = e.value <= _ ? (e.value * f).toFixed(0) : (e.value - _) * v + h, a = 500 * Math.round(s / 500), "/lp/main2/" == window.location.pathname ? 1e4 < a && "rabato8" == $("#promo-code").val() ? (l.removeClass("mainCalculator_new_client_rabat8"), l.removeClass("mainCalculator_new_client"), $(".mainCalculator__promoLabel").removeClass("mainCalculator__promoLabel-active"), $(".mainCalculator__promoCheckbox").prop("checked", !1), $(".mainCalculator__info__data_default").removeClass("promoAccept").addClass("promoAcceptLP").css("color", "#333"), $(".mainCalculator__info__data_new > span").css("display", "none"), $("#promo-code").val("").focus().blur(), $.removeCookie("promocode", {
                    path: "/"
                })) : 1e4 < a && "rabato8" != $("#promo-code").val() ? (l.removeClass("mainCalculator_new_client"), "rabato8" === $.cookie("promocode") && $.removeCookie("promocode", {
                    path: "/"
                })) : a < 10500 && "" == $("#promo-code").val() ? (l.addClass("mainCalculator_new_client_rabat8"), l.addClass("mainCalculator_new_client"), $(".mainCalculator__promoLabel").addClass("mainCalculator__promoLabel-active"), $(".mainCalculator__promoCheckbox").prop("checked", !0), $(".mainCalculator__info__data_default").addClass("promoAccept").removeClass("promoAcceptLP").removeAttr("style"), $(".mainCalculator__info__data_new > span").css("display", "inline"), $("#promo-code").val("rabato8").focus().blur()) : a < 10500 && "rabato8" != $("#promo-code").val() && (l.removeClass("mainCalculator_new_client_rabat8"), l.addClass("mainCalculator_new_client")) : "/lp/main3/" == window.location.pathname ? 1e4 < a && "rabato25" == $("#promo-code").val() ? (l.removeClass("mainCalculator_new_client_rabat25"), l.removeClass("mainCalculator_new_client"), $(".mainCalculator__promoLabel").removeClass("mainCalculator__promoLabel-active"), $(".mainCalculator__promoCheckbox").prop("checked", !1), $(".mainCalculator__info__data_default").removeClass("promoAccept").addClass("promoAcceptLP").css("color", "#333"), $(".mainCalculator__info__data_new > span").css("display", "none"), $("#promo-code").val("").focus().blur(), $.removeCookie("promocode", {
                    path: "/"
                })) : 1e4 < a && "rabato25" != $("#promo-code").val() ? (l.removeClass("mainCalculator_new_client"), "rabato25" === $.cookie("promocode") && $.removeCookie("promocode", {
                    path: "/"
                })) : a < 10500 && "" == $("#promo-code").val() ? (l.addClass("mainCalculator_new_client_rabat25"), l.addClass("mainCalculator_new_client"), $(".mainCalculator__promoLabel").addClass("mainCalculator__promoLabel-active"), $(".mainCalculator__promoCheckbox").prop("checked", !0), $(".mainCalculator__info__data_default").addClass("promoAccept").removeClass("promoAcceptLP").removeAttr("style"), $(".mainCalculator__info__data_new > span").css("display", "inline"), $("#promo-code").val("rabato25").focus().blur()) : a < 10500 && "rabato25" != $("#promo-code").val() && (l.removeClass("mainCalculator_new_client_rabat25"), l.addClass("mainCalculator_new_client")) : 1e4 < a ? (l.removeClass("mainCalculator_new_client"), 0 < $("#promo-code").length && "OVERZAIM" === $("#promo-code").val().toUpperCase() && ($(".mainCalculator__promoLabel").removeClass("mainCalculator__promoLabel-active"), $(".mainCalculator__promoCheckbox").prop("checked", !1), $(".mainCalculator__info__data_default").removeClass("promoAccept").addClass("promoAcceptLP").css("color", "#333"), $(".mainCalculator__info__data_new > span").css("display", "none"), $("#promo-code").val("").focus().blur(), $.removeCookie("promocode", {
                    path: "/" //промо
                }))) : (l.addClass("mainCalculator_new_client"),
                0 < $("#promo-code").length &&
                "" === $("#promo-code").val() &&
                "OVERZAIM" === $.cookie("checkpromocode") &&
                1 < parseInt($("#days").val())
                && ($(".mainCalculator__promoLabel").addClass("mainCalculator__promoLabel-active"),
                    $(".mainCalculator__promoCheckbox").prop("checked", !0),
                    $(".mainCalculator__info__data_default").addClass("promoAccept")
                        .removeClass("promoAcceptLP").removeAttr("style"),
                    $(".mainCalculator__info__data_new > span").css("display", "inline"),
                    $("#promo-code").val("OVERZAIM").focus().blur())),
                    3e4 < a ? l.removeClass("mainCalculator_limit")
                        : (l.addClass("mainCalculator_limit"), W = a),
                    e.value,
                    u.html(r),
                    m.val(a),
                    p.val(a).trigger("change"), o = c, n = e.value, i = _,
                o.hasClass("mainCalculator__sum") &&
                !$(".mainCalculator__help").hasClass("closed") &&
                (i < n ? $(".mainCalculator__help .mainCalculator__tooltip.tooltipstered").tooltipster("show")
                    : $(".mainCalculator__help .mainCalculator__tooltip.tooltipstered").tooltipster("hide")),
                E && A && (3e4 < a ? E.slider("value") <= Math.round(F / N)
                    && E.slider("value", Math.round(F / N) + 3)
                    : E.slider("value") > Math.round(F / N)
                    && E.slider("value", Math.round(F / N) - 1),
                a < 10001 && E.slider("value") > 25 / N
                && E.slider("value", 25 / N)),
                    R.calcSum = a, calcRecalc()
            }

            function D(e, t) {
                var a;
                y && clearTimeout(y), a = 4e3, t && (a = 0), y = setTimeout(function () {
                    var t = parseInt(e.val()) || 0;
                    t < h ? t /= f : t = (t - h) / v + _, c.slider("value", t), e.trigger("change")
                }, a)
            }

            return {
                init: function () {
                    pageIsLoaded || b(), M(), x(), $(window).resize(function () {
                        $(window).width() !== g && (g = $(window).width(), b(), x(), M())
                    })
                }
            }
        }(),
        mainCalculatorDate: function () {
            var r = $(".mainCalculator__box_2"),
                o = $(".mainCalculator__slider", r),
                s = $(".mainCalculator__input", r),
                t = parseInt($(".mainCalculator__val", r).val()),
                e = parseInt($(".mainCalculator__min", r).val()),
                a = parseInt($(".mainCalculator__mid", r).val()),
                n = parseInt($(".mainCalculator__next", r).val()),
                i = parseInt($(".mainCalculator__max", r).val()),
                l = (parseInt($(".mainCalculator__step", r).val()), $(".mainCalculator__sign", r).val()),
                c = $(".mainCalculator__server", r),
                u = ($(".mainCalculatorLabel__min", r).html(e.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ")), $(".mainCalculatorLabel__max", r).html(i / 7), $(".mainCalculator__after", r).val()),
                d = "",
                m = "",
                p = o.width(),
                _ = 0,
                h = (p - _) / 2,
                f = a,
                v = n - a,
                C = i - n,
                w = (f / h).toFixed(3),
                g = (v / h).toFixed(3),
                y = (C / h).toFixed(3),
                b = Math.ceil(e / w),
                x = 0,
                M = $(window).width();
            !pageIsLoaded && $.cookie("mm_calc_days") && (t = parseInt($.cookie("mm_calc_days")));
            var k = null;

            function D() {
                x = t <= f ? t / w : f < t && t <= v ? t / g : (t - f - v) / y + h + _, x = Math.ceil(x)
            }

            function S() {
                o.hasClass("ui-slider") && (o.slider("destroy"), $(".mainCalculatorDynamic", r).remove())
            }

            function T() {
                o.slider({
                    value: x,
                    min: b,
                    max: p,
                    step: 1,
                    orientation: "horizontal",
                    range: "min",
                    slide: function (t, e) {
                        I(t, e)
                    },
                    change: function (t, e) {
                        if (I(t, e), $("body").trigger("slider-day-changed"), pageIsLoaded) {
                            var a = parseInt($("#days").val());
                            "TWO_WEEKS" == mmCalculatorNew.currentProduct.period && 70 == (a *= 7) && (a += 10), setCookie("mm_calc_days", a)
                        }
                    }
                }), E = o, A = h, N = w, F = f, $('<div class="mainCalculatorDynamic"><input type="text" name="days" value="' + t + '" class="mainCalculatorDynamic__input" id="days"><div class="mainCalculatorDynamic__after">' + u + "</div></div>").insertAfter($(".mainCalculator__title", r)), d = $(".mainCalculatorDynamic__input", r), m = $(".mainCalculatorDynamic__after", r), d.on("input", function () {
                    P($(this))
                }), d.on("blur", function () {
                    P($(this), !0)
                }), d.keypress(function (t) {
                    13 == t.which && $(this).blur()
                }), o.slider("option", "value", x)
            }

            function I(t, e) {
                var a, o = e.value.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ") + " " + l,
                    n = 0,
                    i = "";
                e.value <= Math.round(f / w) ? (i = "дней", 21 == (n = (e.value * w).toFixed(0)) || 31 == n ? i = "день" : 21 < n && n < 25 && (i = "дня"), r.removeClass("mainCalculator__box_swap")) : e.value > h && e.value < h + _ ? (i = "дней", 21 == (n = (e.value * g).toFixed(0)) || 31 == n ? i = "день" : 21 < n && n < 25 && (i = "дня"), r.removeClass("mainCalculator__box_swap")) : ((n = (n = ((e.value - f / w - _) * y + f + v) / 7).toFixed(0)) % 2 != 0 && (n -= 1), i = "недель", r.addClass("mainCalculator__box_swap")), a = 1 * Math.round(n / 1), e.value, s.html(o), c.val(a), d.val(a), m.html(i), L && Y && (e.value > f / w ? L.slider("value") <= Math.round(3e4 / O) && L.slider("value", Math.round(30500 / O) - 1) : e.value <= f / w && ($(".mainCalculatorInfo__tooltip.tooltipstered").tooltipster("hide"), L.slider("value") > Math.round(3e4 / O) && L.slider("value", Math.round((W || 3e4) / O)))), 30 < a && L.slider("value") * O < 10001 && L.slider("value", 10500 / O), R.calcDays = a, calcRecalc()
            }

            function P(a, t) {
                var e;
                k && clearTimeout(k), e = 4e3, t && (e = 0), k = setTimeout(function () {
                    var t = parseInt(a.val()) || 0,
                        e = o.slider("value");
                    e < h ? t /= w : h < e && e < h + _ ? t /= g : t = (7 * t - f - v) / y + h + _, o.slider("value", t), a.trigger("change")
                }, e)
            }

            return {
                init: function () {
                    pageIsLoaded || D(), S(), T(), $(window).resize(function () {
                        $(window).width() !== M && (M = $(window).width(), D(), S(), T())
                    })
                }
            }
        }()
    }
}();

function setCookie(t, e, a) {
    var o = new Date;
    o.setTime(o.getTime() + 60 * a * 60 * 1e3);
    var n = escape(e) + (null === a ? "" : ";expires=" + o.toUTCString() + ";path=/");
    document.cookie = t + "=" + n
}

function getCookie(t) {
    var e = document.cookie.match("(^|;) ?" + t + "=([^;]*)(;|$)");
    return e ? unescape(e[2]) : null
}

$(document).ready(function () {
    console.log(1111111111111111)
    var o = $(".mainCalculator"),
        t = $(".mainCalculator__tooltip"),

        e = {
            container: $(".mainCalculator__question"),
            buttonOpen: $(".mainCalculator__question__title a"),
            buttonClose: $(".mainCalculator__question__box"),
            box: $(".mainCalculator__question__box"),
            open: function () {
                this.box.addClass("open")
            },
            close: function () {
                this.box.removeClass("open")
            },
            setupListner: function () {
                var e = this;
                this.buttonOpen.on("click", function (t) {
                    t.preventDefault(), e.box.hasClass("open") ? e.close() : e.open()
                }), this.buttonClose.on("click", function (t) {
                    t.preventDefault(), e.close()
                })
            },
            init: function () {
                this.setupListner()
            }
        };
    $(this).tooltipster({
        trigger: "click",
        position: "top",
        maxWidth: 264,
        zIndex: 10,
        arrowColor: "#FFF",
        delay: 0,
        onlyOne: !0,
        autoClose: !1,
        functionReady: function (t, e) {
            e.on("click", function () {
                t.tooltipster("hide"), t.hasClass("help__tooltip") && $(".mainCalculator__help").addClass("closed")
            })
        }
    })
    if (!window.creditSettingsList) throw new Error("Отсутствует конфигурационный файл!");
    o.length &&
    (mmCalculatorNew.init(), o.find(".mainCalculator__submit").on("click", function () {
        var t, e, a;
        t = o.find(".mainCalculator__box_1").find(".mainCalculator__server").val(), e = o.find(".mainCalculator__box_2").find(".mainCalculator__server").val(), a = o.find(".mainCalculatorInfo__col_2 .mainCalculator__info__value").html() + o.find(".mainCalculatorInfo__col_2 .mainCalculator__info__label").html(), "TWO_WEEKS" == mmCalculatorNew.currentProduct.period && (e *= 7), App.setCookie("mm_calc_amount", t, {
            path: "/"
        }), App.setCookie("mm_calc_days", e, {
            path: "/"
        }), App.setCookie("mm_return_day", a, {
            path: "/"
        }), window.location.href = "/secure/registration"
    })), console.log('t', t),
        t.each(function (t, e) {

            $(this).click(function (t) {
                t.preventDefault()
            })
        }), e.container.length && e.init(), pageIsLoaded = !0
}), $(".productItemsbuttonCoockie > a").on("click", function () {
    var t = $(".mainCalculator__box_1 .mainCalculatorDynamic__input").val() || 9e3,
        e = parseInt(t),
        a = $(".mainCalculator__box_2 .mainCalculatorDynamic__input").val() || 15,
        o = parseInt(a),
        n = moment().add("d", a),
        i = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря")[n.month()],
        r = n.format("D") + " " + (i + n.format(", YYYY"));
    App.setCookie("mm_calc_days", o, {
        path: "/"
    }), App.setCookie("mm_calc_amount", e, {
        path: "/"
    }), App.setCookie("mm_return_day", r, {
        path: "/"
    }), window.location.href = "/secure/registration"
}), $(document).ready(function () {
    $(".mainCalculator__promoLabel").click(function () {
        $("#promo-checkbox").prop("checked") ? $(".mainCalculator__promoLabel").removeClass("mainCalculator__promoLabel-active") : $(".mainCalculator__promoLabel").addClass("mainCalculator__promoLabel-active")
    })
});
var EXPERIMENT_COOKIE_NAME = "ga-ab-testing",
    DEFAULT_LIVE_TIME = 8760,
    MAX_VALUE_COOKIE_LENGTH = 150,
    DEFAULT_DIMENSION_FOR_EXPERIMENT = "dimension1",
    exp = {
        gaw: function () {
            "function" == typeof window.ga && window.ga.apply(window, arguments)
        },
        trackExperimentWithCustomDimension: function (t) {
            var a = getCookie(EXPERIMENT_COOKIE_NAME) || "";
            a.indexOf(t) < 0 && (a = t + (a ? " " + a : ""), function t() {
                var e;
                a.length > MAX_VALUE_COOKIE_LENGTH && (e = a.lastIndexOf(" "), a = a.substring(0, e), t(a))
            }(), setCookie(EXPERIMENT_COOKIE_NAME, a, DEFAULT_LIVE_TIME)), exp.gaw(function (t) {
                t.set(DEFAULT_DIMENSION_FOR_EXPERIMENT, a)
            })
        },
        startExperiment: function (t) {
            var e = exp.randomDistribution(t);
            "function" == typeof e.action && e.action(), exp.trackExperimentWithCustomDimension(e.name)
        },
        randomDistribution: function (t) {
            var e, a, o, n = (a = 99, o = (e = 0) - .5 + Math.random() * (a - e + 1), o = Math.round(o)),
                i = 0;
            if (!function (t) {
                for (var e = 0, a = 0; a < t.length; a++) e += t[a].percent;
                return 100 === e
            }(t)) throw "distribution percent not valid";
            for (var r = 0; r < t.length; r++)
                if (exp.isInvolvedInExperiment(t[r].name)) return t[r];
            for (var s = 0; s < t.length; s++)
                if (n < (i += t[s].percent)) return t[s]
        },
        isInvolvedInExperiment: function (t) {
            return 0 <= (getCookie(EXPERIMENT_COOKIE_NAME) || "").indexOf(t)
        }
    };