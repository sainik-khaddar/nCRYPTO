(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
    [64011], {
        64011: (t, e, n) => {
            "use strict";
            n.d(e, {
                Draggable: () => a,
                PointerBackend: () => l
            });
            var i = n(416282),
                r = n(491496),
                o = n(968724),
                s = n(195355);
            class a {
                constructor(t) {
                    var e, n;
                    this._helper = null, this._handleDragStart = t => {
                        var e;
                        if (null !== this._helper) return;
                        const n = this._source;
                        n.classList.add("ui-draggable-dragging");
                        const [i, o] = [(0, r.outerWidth)(n), (0, r.outerHeight)(n)];
                        this._helper = {
                            startTop: parseFloat(n.style.top) || 0,
                            startLeft: parseFloat(n.style.left) || 0,
                            nextTop: null,
                            nextLeft: null,
                            raf: null,
                            size: [i, o],
                            containment: this._containment instanceof HTMLElement ? [parseInt(getComputedStyle(this._containment).borderLeftWidth) + parseInt(getComputedStyle(this._containment).paddingLeft), parseInt(getComputedStyle(this._containment).borderTopWidth) + parseInt(getComputedStyle(this._containment).paddingTop), this._containment.offsetWidth - parseInt(getComputedStyle(this._containment).borderRightWidth) - parseInt(getComputedStyle(this._containment).paddingRight) - parseInt(getComputedStyle(n).marginLeft) - parseInt(getComputedStyle(n).marginRight) - i, this._containment.offsetHeight - parseInt(getComputedStyle(this._containment).borderBottomWidth) - parseInt(getComputedStyle(this._containment).paddingBottom) - parseInt(getComputedStyle(n).marginTop) - parseInt(getComputedStyle(n).marginBottom) - o] : "window" === this._containment ? [window.scrollX, window.scrollY, window.scrollX + document.documentElement.offsetWidth - i, window.scrollY + document.documentElement.offsetHeight - o] : null
                        }, null === (e = this._start) || void 0 === e || e.call(this)
                    }, this._handleDragMove = t => {
                        var e;
                        if (null === this._helper) return;
                        const {
                            current: n,
                            initial: i
                        } = t.detail, r = this._source, o = this._helper.nextTop, s = this._helper.nextLeft, a = "y" === this._axis || !1 === this._axis || 0 !== n.movementY;
                        if (a) {
                            const t = this._helper.startTop;
                            isFinite(t) && (this._helper.nextTop = n.clientY - i.clientY + t)
                        }
                        const l = "x" === this._axis || !1 === this._axis || 0 !== n.movementY;
                        if (l) {
                            const t = this._helper.startLeft;
                            isFinite(t) && (this._helper.nextLeft = n.clientX - i.clientX + t)
                        }
                        if (null !== this._helper.containment) {
                            const [t, e, n, i] = this._helper.containment;
                            a && this._helper.nextTop && (this._helper.nextTop = Math.min(this._helper.nextTop, i), this._helper.nextTop = Math.max(this._helper.nextTop, e)), l && this._helper.nextLeft && (this._helper.nextLeft = Math.min(this._helper.nextLeft, n), this._helper.nextLeft = Math.max(this._helper.nextLeft, t))
                        }
                        null !== this._helper.raf || o === this._helper.nextTop && s === this._helper.nextLeft || (this._helper.raf = requestAnimationFrame(() => {
                            null !== this._helper && (null !== this._helper.nextTop && (r.style.top = this._helper.nextTop + "px", this._helper.nextTop = null), null !== this._helper.nextLeft && (r.style.left = this._helper.nextLeft + "px", this._helper.nextLeft = null), this._helper.raf = null)
                        })), null === (e = this._drag) || void 0 === e || e.call(this)
                    }, this._handleDragStop = t => {
                        var e;
                        if (null === this._helper) return;
                        this._source.classList.remove("ui-draggable-dragging"), this._helper = null, null === (e = this._stop) || void 0 === e || e.call(this)
                    };
                    const i = this._source = t.source;
                    i.classList.add("ui-draggable");
                    const o = this._handle = null !== (e = t.handle ? i.querySelector(t.handle) : null) && void 0 !== e ? e : i;
                    o.classList.add("ui-draggable-handle"), this._start = t.start, this._stop = t.stop, this._drag = t.drag, this._backend = new l({
                        handle: o,
                        onDragStart: this._handleDragStart,
                        onDragMove: this._handleDragMove,
                        onDragStop: this._handleDragStop
                    }), this._axis = null !== (n = t.axis) && void 0 !== n && n, this._containment = t.containment
                }
                destroy() {
                    const t = this._source;
                    t.classList.remove("ui-draggable"), t.classList.remove("ui-draggable-dragging");
                    this._handle.classList.remove("ui-draggable-handle"), this._backend.destroy(), null !== this._helper && (this._helper.raf && cancelAnimationFrame(this._helper.raf), this._helper = null)
                }
            }
            class l {
                constructor(t) {
                    this._initial = null, this._handlePointerDown = t => {
                        if (null !== this._initial) return;
                        if (!(t.target instanceof Element && this._handle.contains(t.target))) return;
                        if (this._initial = t, !this._dispatchEvent(this._createEvent("pointer-drag-start", t))) return void(this._initial = null);
                        t.preventDefault();
                        const e = this._getEventTarget();
                        e.addEventListener("pointermove", this._handlePointerMove), e.addEventListener("pointerup", this._handlePointerUp), e.addEventListener("pointercancel", this._handlePointerUp), e.addEventListener("lostpointercapture", this._handlePointerUp), e.setPointerCapture(t.pointerId)
                    }, this._handlePointerMove = t => {
                        null !== this._initial && this._initial.pointerId === t.pointerId && (t.preventDefault(), this._dispatchEvent(this._createEvent("pointer-drag-move", t)))
                    }, this._handlePointerUp = t => {
                        if (null === this._initial || this._initial.pointerId !== t.pointerId) return;
                        t.preventDefault();
                        const e = this._getEventTarget();
                        e.removeEventListener("pointermove", this._handlePointerMove), e.removeEventListener("pointerup", this._handlePointerUp), e.removeEventListener("pointercancel", this._handlePointerUp), e.removeEventListener("lostpointercapture", this._handlePointerUp), e.releasePointerCapture(this._initial.pointerId), this._dispatchEvent(this._createEvent("pointer-drag-stop", t)), this._initial = null
                    };
                    const e = this._handle = t.handle;
                    this._onDragStart = t.onDragStart, this._onDragMove = t.onDragMove, this._onDragStop = t.onDragStop, e.style.touchAction = "none";
                    this._getEventTarget().addEventListener("pointerdown", this._handlePointerDown)
                }
                destroy() {
                    this._handle.style.touchAction = "";
                    const t = this._getEventTarget();
                    t.removeEventListener("pointerdown", this._handlePointerDown), t.removeEventListener("pointermove", this._handlePointerMove), t.removeEventListener("pointerup", this._handlePointerUp), t.removeEventListener("pointercancel", this._handlePointerUp), t.removeEventListener("lostpointercapture", this._handlePointerUp), null !== this._initial && (t.releasePointerCapture(this._initial.pointerId), this._initial = null)
                }
                _getEventTarget() {
                    return o.CheckMobile.iOS() || (0, o.isMac)() && s.touch ? window.document.documentElement : this._handle
                }
                _dispatchEvent(t) {
                    switch (t.type) {
                        case "pointer-drag-start":
                            this._onDragStart(t);
                            break;
                        case "pointer-drag-move":
                            this._onDragMove(t);
                            break;
                        case "pointer-drag-stop":
                            this._onDragStop(t)
                    }
                    return !t.defaultPrevented
                }
                _createEvent(t, e) {
                    return (0, i.assert)(null !== this._initial),
                        new CustomEvent(t, {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                backend: this,
                                initial: this._initial,
                                current: e
                            }
                        })
                }
            }
        },
        491496: (t, e, n) => {
            "use strict";
            n.d(e, {
                unwrap: () => r,
                html: () => o,
                contentHeight: () => s,
                outerHeight: () => a,
                outerWidth: () => l,
                offset: () => h,
                position: () => p
            });
            var i = n(416282);

            function r(t) {
                return t[0]
            }

            function o(t, e) {
                return void 0 === e || (null === e && (t.innerHTML = ""), "string" != typeof e && "number" != typeof e || (t.innerHTML = String(e))), t
            }

            function s(t) {
                const {
                    paddingTop: e,
                    paddingBottom: n
                } = window.getComputedStyle(t);
                return [e, n].reduce((t, e) => t - Number((e || "").replace("px", "")), t.clientHeight)
            }

            function a(t, e = !1) {
                const n = getComputedStyle(t),
                    i = [n.height];
                return "border-box" !== n.boxSizing && i.push(n.paddingTop, n.paddingBottom, n.borderTopWidth, n.borderBottomWidth), e && i.push(n.marginTop, n.marginBottom), i.reduce((t, e) => t + (parseFloat(e) || 0), 0)
            }

            function l(t, e = !1) {
                const n = getComputedStyle(t),
                    i = [n.width];
                return "border-box" !== n.boxSizing && i.push(n.paddingLeft, n.paddingRight, n.borderLeftWidth, n.borderRightWidth), e && i.push(n.marginLeft, n.marginRight), i.reduce((t, e) => t + (parseFloat(e) || 0), 0)
            }

            function h(t) {
                if (!t.getClientRects().length) return {
                    top: 0,
                    left: 0
                };
                const e = t.getBoundingClientRect(),
                    n = (0, i.ensureNotNull)(t.ownerDocument.defaultView);
                return {
                    top: e.top + n.pageYOffset,
                    left: e.left + n.pageXOffset
                }
            }

            function p(t) {
                const e = getComputedStyle(t);
                let n, i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === e.position) n = t.getBoundingClientRect();
                else {
                    n = h(t);
                    const e = t.ownerDocument;
                    let r = t.offsetParent || e.documentElement;
                    for (; r && (r === e.body || r === e.documentElement) && "static" === getComputedStyle(r).position;) r = r.parentElement;
                    r && r !== t && 1 === r.nodeType && (i = h(r), i.top += parseFloat(getComputedStyle(r).borderTopWidth), i.left += parseFloat(getComputedStyle(r).borderLeftWidth))
                }
                return {
                    top: n.top - i.top - parseFloat(e.marginTop),
                    left: n.left - i.left - parseFloat(e.marginLeft)
                }
            }
        }
    }
]);