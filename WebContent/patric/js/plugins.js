window.log = function () {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		console.log(Array.prototype.slice.call(arguments))
	}
};
$.fn.imageWidth = function (a) {
	var c = function (d, e) {
		d = $(d);
		if (d.css(e)) {
			return parseInt(d.css(e).replace("px", ""), 10)
		} else {
			return 0
		}
		return false
	};
	var b = function (g, i, p) {
		var m = g.width();
		var h = c(g, "padding-left");
		var f = c(g, "padding-right");
		var l = c(g, "border-left-width");
		var n = c(g, "border-right-width");
		var k = h + f + l + n;
		var j = m + k;
		var o = i.width();
		if ((a * o) <= j) {
			var e = o * a;
			var d = e - k;
			g.width(d);
			p.width(parseInt(e, 10))
		} else {
			p.width(j)
		}
	};
	return this.each(function () {
		var d = (d) ? d : 2 / 3;
		var e = $("img", $(this));
		var f = $(this).parent();
		var g = $(this);
		e.each(function (h) {
			b(e, f, g);
			$(this).load(function () {
				b(e, f, g)
			})
		})
	})
};
$.fn.sameHeight = function () {
	return this.each(function () {
		tallest_height = 0;
		$(this).children().each(function (a) {
			tallest_height = ($(this).height() > tallest_height) ? $(this).height() : tallest_height
		});
		if ($.browser != undefined && $.browser.msie == true && $.browser.version <= 6) {
			$(this).children().css("height", tallest_height)
		} else {
			$(this).children().css("min-height", tallest_height)
		}
	})
};
var markup = function () {
	$(".section-title").wrapInner('<span class="wrap">');
	$(".long-list li:nth-child(odd)").addClass("alt");
	$("table.stripe tr:nth-child(odd)").addClass("alt");
	$("ul li:last-child").addClass("last");
	$("ul li:first-child").addClass("first");
	$("tbody tr td:last-child").addClass("last");
	$("tbody tr td:first-child").addClass("first");
	$(".column:last-child").addClass("last");
	function a() {
		tallest_height = 0;
		$(".tabs .tab-headers li a span").each(function () {
			tallest_height = ($(this).outerHeight(true) > tallest_height) ? $(this).outerHeight(true) : tallest_height
		});
		$(".tabs .tab-headers li a span").each(function () {
			$(this).css("height", tallest_height)
		})
	}
	a()
};
var subMenu = function () {
	$(".main-nav li").mouseenter(function (a) {
		a.preventDefault();
		$(this).children(".submenu").show();
		$(this).addClass("hover")
	});
	$(".main-nav li").mouseleave(function (a) {
		a.preventDefault();
		$(this).children(".submenu").hide();
		$(this).removeClass("hover")
	})
};
var browseData = function () {
	$(".browse-data li").bind("mouseover", function () {
		$(".browse-data li").removeClass("active");
		$(this).addClass("active")
	});
	$(".browse-data li").bind("mouseout", function () {
		$(".browse-data li").removeClass("active")
	})
};
$.fn.imgOverlay = function () {
	return this.each(function () {
		if ($(this).hasClass("img-height")) {
			myHeight = $(this).children("img").height();
			myPos = (myHeight / 2) / 2;
			$(this).children(":not(img)").css("marginTop", myPos)
		} else {
			myHeight = $(this).children(":not(img)").outerHeight(true)
		}
		myHeight += "px";
		$(this).css("height", myHeight)
	})
};
function initwfCarousel() {
	$(".workflow ul.carousel-container").jcarousel({
		itemFallbackDimension : 905,
		scroll : 1,
		visible : 1,
		buttonNextHTML : null,
		buttonPrevHTML : null,
		initCallback : workflowInitCallback,
		setupCallback : wfInit
	})
}
var wfInit = function () {
	if ($.support.htmlSerialize == true) {
		$(".workflow img").each(function () {
			this.src = this.src + "?random=" + (new Date()).getTime()
		}).load(function () {
			wfSetHeights()
		})
	} else {
		$(".workflow img").load(function () {
			wfSetHeights();
			alert("heyyyyy")
		})
	}
};
var wfSetHeights = function () {
	$(".step").each(function (a) {
		tallest_height = 0;
		tallest_slide = 0;
		$(this).find(".carousel .slide").each(function () {
			tallest_slide = ($(this).height() > tallest_slide) ? $(this).height() : tallest_slide
		});
		$(this).find(".base, aside.support, .overview, .see-container").each(function () {
			tallest_height = ($(this).height() > tallest_height) ? $(this).height() : tallest_height
		});
		if (tallest_height > tallest_slide) {
			$(this).find(".carousel, .base, aside.support, .overview, .see-container").css("height", tallest_height);
			$(this).css("height", tallest_height)
		} else {
			$(this).find(".carousel, .base, aside.support, .overview, .see-container").css("height", tallest_slide);
			$(this).css("height", tallest_slide)
		}
	})
};
var wfControl = function () {
	$(".see").click(function (a) {
		a.preventDefault();
		$(this).parents(".step").children(".carousel").addClass("active", 500)
	});
	$(".carousel .button.close-slate").click(function (a) {
		a.preventDefault();
		$(this).parents(".carousel").removeClass("active", 500)
	});
	$(".overview .button.close-slate").click(function (a) {
		a.preventDefault();
		$(this).parents(".wrapper-support").removeClass("active", 500);
		$(this).parents(".step").find("ul.overview-links li").removeClass("active")
	});
	$("ul.overview-links li").click(function (a) {
		a.preventDefault();
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		support = $(this).parents(".step").find(".wrapper-support");
		myOverview = $(this).data("overview");
		overviews = $(this).parents(".step").find(".overview-text");
		if (support.hasClass("active")) {
			activeOverview = $(this).parents(".step").find(".overview-text.active").attr("data-overview");
			if (activeOverview != myOverview) {
				overviews.each(function () {
					if ($(this).attr("data-overview") == myOverview) {
						overviews.removeClass("active");
						overviews.fadeOut("slow");
						$(this).addClass("active");
						$(this).fadeIn("slow")
					}
				})
			}
		} else {
			overviews.hide();
			support.addClass("active", 500);
			overviews.each(function () {
				if ($(this).data("overview") == myOverview) {
					$(this).fadeIn("slow");
					$(this).addClass("active")
				}
			})
		}
	})
};
var workflowInitCallback = function (a) {
	$(".carousel").each(function () {
		$("li.slide:first-child").find(".prev").addClass("disabled");
		$("li.slide:last-child").find(".next").addClass("disabled")
	});
	$("nav.carousel-nav li a").bind("click", function () {
		event.preventDefault()
	});
	$("nav.carousel-nav li.prev").not(".disabled").bind("click", function () {
		myCarousel = $(this).parents("ul.carousel-container").data("jcarousel");
		myCarousel.prev();
		return false
	});
	$("nav.carousel-nav li.next").not(".disabled").bind("click", function () {
		myCarousel = $(this).parents("ul.carousel-container").data("jcarousel");
		myCarousel.next();
		return false
	})
};
function initNicefade() {
	$(function () {
		if ($(".nicefade_container").length) {
			$(".nicefade_container").each(function () {
				if (this.children.length == 3) {
					$("ul.arrow, nav.feature-nav").addClass("thirds")
				}
			});
			nicefade = $("#nicefade_wrapper .nicefade_container").nicefade({
					animationDelay : 4000,
					afterSlideChange : nicefadeAfter
				});
			nicefadeSeek();
			nicefadeAfter()
		}
	});
	$(".home .feature .feature-nav ul.nicefade_index-list li:last-child").addClass("last")
}
function nicefadeAfter() {
	var a = nicefade.current_slide().index() + 1;
	$("nav.feature-nav li").removeClass("active");
	$("ul.arrow li").removeClass("active");
	$("nav.feature-nav li").each(function () {
		if ($(this).data("slide") == a) {
			$(this).addClass("active")
		}
	});
	$("ul.arrow li").each(function () {
		if ($(this).data("slide") == a) {
			$(this).addClass("active")
		}
	})
}
function nicefadeSeek() {
	$("nav.feature-nav li").bind("click", function () {
		nicefade.seek($(this).data("slide"));
		return false
	})
}
/*!
 * nicefade
 * https://github.com/ridgehkr/nicefade
 */
(function (e) {
	var k,
	h,
	c,
	g,
	j,
	a,
	f,
	i,
	d,
	b;
	e.fn.nicefade = function (l) {
		this.next = function () {
			f = true;
			c = g;
			d.fadeTo(c, d.loopCycler, false)
		};
		this.previous = function () {
			f = true;
			c = j;
			d.fadeTo(c, d.loopCycler, false)
		};
		this.seek = function (m) {
			f = true;
			m = parseInt(m);
			c = k.children(":nth-child(" + m + ")");
			d.fadeTo(c, d.loopCycler, false)
		};
		this.stop = function () {
			f = true
		};
		this.is_active = function () {
			return !f
		};
		this.current_slide = function () {
			return h
		};
		this.slideshow_length = function () {
			return k.children().length
		};
		this.target_slide = function () {
			return c
		};
		return this.each(function () {
			k = e(this);
			b = e.extend({
					animationSpeed : 500,
					animationDelay : 5000,
					indexList : k.siblings(".nicefade_index-list"),
					initialIndex : 1,
					currentClass : "current",
					afterSlideChange : null,
					beforeSlideChange : null
				}, l);
			d = {
				init : function () {
					h = e("> *:nth-child(" + b.initialIndex + ")", k);
					c = e();
					d.updateSlideStatus();
					a = b.indexList;
					f = false;
					k.children().not(h).hide();
					a.children(":nth-child(" + b.initialIndex + ")").addClass(b.currentClass);
					a.find("a").click(function (o) {
						o.preventDefault();
						f = true;
						var n = e(o.target).parent().index(),
						m = k.children(":nth-child(" + (n + 1) + ")");
						c = m;
						d.fadeTo(m, e.noop(), true)
					});
					setTimeout(function () {
						d.loopCycler()
					}, b.animationDelay)
				},
				fadeTo : function (m, o, n) {
					if (e.isFunction(b.beforeSlideChange)) {
						b.beforeSlideChange()
					}
					h.stop().fadeTo(b.animationSpeed, 0, function () {
						e(this).removeClass(b.currentClass).hide()
					});
					h = m.stop().fadeTo(b.animationSpeed, 1, function () {
							if (o) {
								o()
							}
							d.updateSlideStatus();
							if (!n) {
								d.updateIndex()
							}
							e.when(e(this).addClass(b.currentClass)).done(function () {
								if (e.isFunction(b.afterSlideChange)) {
									b.afterSlideChange()
								}
							})
						});
					if (n) {
						d.updateIndex()
					}
				},
				loopCycler : function () {
					if (!f) {
						d.fadeTo(g, function () {
							setTimeout(function () {
								d.loopCycler()
							}, b.animationDelay)
						}, false)
					}
				},
				updateSlideStatus : function () {
					j = h.prev();
					g = h.next();
					if (!g.length) {
						g = k.children(":first")
					}
					if (!j.length) {
						j = k.children(":last")
					}
					c = e()
				},
				updateIndex : function () {
					var m = h.index() + 1;
					a.children(":nth-child(" + m + ")").addClass(b.currentClass).siblings().removeClass(b.currentClass)
				}
			};
			d.init()
		})
	}
})(jQuery);
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */
(function (c) {
	var d = {
		vertical : false,
		rtl : false,
		start : 1,
		offset : 1,
		size : null,
		scroll : 3,
		visible : null,
		animation : "normal",
		easing : "swing",
		auto : 0,
		wrap : null,
		initCallback : null,
		setupCallback : null,
		reloadCallback : null,
		itemLoadCallback : null,
		itemFirstInCallback : null,
		itemFirstOutCallback : null,
		itemLastInCallback : null,
		itemLastOutCallback : null,
		itemVisibleInCallback : null,
		itemVisibleOutCallback : null,
		animationStepCallback : null,
		buttonNextHTML : "<div></div>",
		buttonPrevHTML : "<div></div>",
		buttonNextEvent : "click",
		buttonPrevEvent : "click",
		buttonNextCallback : null,
		buttonPrevCallback : null,
		itemFallbackDimension : null
	},
	b = false;
	c(window).bind("load.jcarousel", function () {
		b = true
	});
	c.jcarousel = function (l, g) {
		this.options = c.extend({}, d, g || {});
		this.locked = false;
		this.autoStopped = false;
		this.container = null;
		this.clip = null;
		this.list = null;
		this.buttonNext = null;
		this.buttonPrev = null;
		this.buttonNextState = null;
		this.buttonPrevState = null;
		if (!g || g.rtl === undefined) {
			this.options.rtl = (c(l).attr("dir") || c("html").attr("dir") || "").toLowerCase() == "rtl"
		}
		this.wh = !this.options.vertical ? "width" : "height";
		this.lt = !this.options.vertical ? (this.options.rtl ? "right" : "left") : "top";
		var q = "",
		n = l.className.split(" ");
		for (var k = 0; k < n.length; k++) {
			if (n[k].indexOf("jcarousel-skin") != -1) {
				c(l).removeClass(n[k]);
				q = n[k];
				break
			}
		}
		if (l.nodeName.toUpperCase() == "UL" || l.nodeName.toUpperCase() == "OL") {
			this.list = c(l);
			this.clip = this.list.parents(".jcarousel-clip");
			this.container = this.list.parents(".jcarousel-container")
		} else {
			this.container = c(l);
			this.list = this.container.find("ul,ol").eq(0);
			this.clip = this.container.find(".jcarousel-clip")
		}
		if (this.clip.size() === 0) {
			this.clip = this.list.wrap("<div></div>").parent()
		}
		if (this.container.size() === 0) {
			this.container = this.clip.wrap("<div></div>").parent()
		}
		if (q !== "" && this.container.parent()[0].className.indexOf("jcarousel-skin") == -1) {
			this.container.wrap('<div class=" ' + q + '"></div>')
		}
		this.buttonPrev = c(".jcarousel-prev", this.container);
		if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) {
			this.buttonPrev = c(this.options.buttonPrevHTML).appendTo(this.container)
		}
		this.buttonPrev.addClass(this.className("jcarousel-prev"));
		this.buttonNext = c(".jcarousel-next", this.container);
		if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) {
			this.buttonNext = c(this.options.buttonNextHTML).appendTo(this.container)
		}
		this.buttonNext.addClass(this.className("jcarousel-next"));
		this.clip.addClass(this.className("jcarousel-clip")).css({
			position : "relative"
		});
		this.list.addClass(this.className("jcarousel-list")).css({
			overflow : "hidden",
			position : "relative",
			top : 0,
			margin : 0,
			padding : 0
		}).css((this.options.rtl ? "right" : "left"), 0);
		this.container.addClass(this.className("jcarousel-container")).css({
			position : "relative"
		});
		if (!this.options.vertical && this.options.rtl) {
			this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl")
		}
		var m = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
		var p = this.list.children("li");
		var r = this;
		if (p.size() > 0) {
			var f = 0,
			h = this.options.offset;
			p.each(function () {
				r.format(this, h++);
				f += r.dimension(this, m)
			});
			this.list.css(this.wh, (f + 100) + "px");
			if (!g || g.size === undefined) {
				this.options.size = p.size()
			}
		}
		this.container.css("display", "block");
		this.buttonNext.css("display", "block");
		this.buttonPrev.css("display", "block");
		this.funcNext = function () {
			r.next();
			return false
		};
		this.funcPrev = function () {
			r.prev();
			return false
		};
		this.funcResize = function () {
			if (r.resizeTimer) {
				clearTimeout(r.resizeTimer)
			}
			r.resizeTimer = setTimeout(function () {
					r.reload()
				}, 100)
		};
		if (this.options.initCallback !== null) {
			this.options.initCallback(this, "init")
		}
		if (!b && c.browser.safari) {
			this.buttons(false, false);
			c(window).bind("load.jcarousel", function () {
				r.setup()
			})
		} else {
			this.setup()
		}
	};
	var a = c.jcarousel;
	a.fn = a.prototype = {
		jcarousel : "0.2.8"
	};
	a.fn.extend = a.extend = c.extend;
	a.fn.extend({
		setup : function () {
			this.first = null;
			this.last = null;
			this.prevFirst = null;
			this.prevLast = null;
			this.animating = false;
			this.timer = null;
			this.resizeTimer = null;
			this.tail = null;
			this.inTail = false;
			if (this.locked) {
				return
			}
			this.list.css(this.lt, this.pos(this.options.offset) + "px");
			var e = this.pos(this.options.start, true);
			this.prevFirst = this.prevLast = null;
			this.animate(e, false);
			c(window).unbind("resize.jcarousel", this.funcResize).bind("resize.jcarousel", this.funcResize);
			if (this.options.setupCallback !== null) {
				this.options.setupCallback(this)
			}
		},
		reset : function () {
			this.list.empty();
			this.list.css(this.lt, "0px");
			this.list.css(this.wh, "10px");
			if (this.options.initCallback !== null) {
				this.options.initCallback(this, "reset")
			}
			this.setup()
		},
		reload : function () {
			if (this.tail !== null && this.inTail) {
				this.list.css(this.lt, a.intval(this.list.css(this.lt)) + this.tail)
			}
			this.tail = null;
			this.inTail = false;
			if (this.options.reloadCallback !== null) {
				this.options.reloadCallback(this)
			}
			if (this.options.visible !== null) {
				var g = this;
				var h = Math.ceil(this.clipping() / this.options.visible),
				f = 0,
				e = 0;
				this.list.children("li").each(function (j) {
					f += g.dimension(this, h);
					if (j + 1 < g.first) {
						e = f
					}
				});
				this.list.css(this.wh, f + "px");
				this.list.css(this.lt, -e + "px")
			}
			this.scroll(this.first, false)
		},
		lock : function () {
			this.locked = true;
			this.buttons()
		},
		unlock : function () {
			this.locked = false;
			this.buttons()
		},
		size : function (e) {
			if (e !== undefined) {
				this.options.size = e;
				if (!this.locked) {
					this.buttons()
				}
			}
			return this.options.size
		},
		has : function (g, h) {
			if (h === undefined || !h) {
				h = g
			}
			if (this.options.size !== null && h > this.options.size) {
				h = this.options.size
			}
			for (var f = g; f <= h; f++) {
				var k = this.get(f);
				if (!k.length || k.hasClass("jcarousel-item-placeholder")) {
					return false
				}
			}
			return true
		},
		get : function (e) {
			return c(">.jcarousel-item-" + e, this.list)
		},
		add : function (l, q) {
			var m = this.get(l),
			h = 0,
			g = c(q);
			if (m.length === 0) {
				var p,
				k = a.intval(l);
				m = this.create(l);
				while (true) {
					p = this.get(--k);
					if (k <= 0 || p.length) {
						if (k <= 0) {
							this.list.prepend(m)
						} else {
							p.after(m)
						}
						break
					}
				}
			} else {
				h = this.dimension(m)
			}
			if (g.get(0).nodeName.toUpperCase() == "LI") {
				m.replaceWith(g);
				m = g
			} else {
				m.empty().append(q)
			}
			this.format(m.removeClass(this.className("jcarousel-item-placeholder")), l);
			var o = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
			var f = this.dimension(m, o) - h;
			if (l > 0 && l < this.first) {
				this.list.css(this.lt, a.intval(this.list.css(this.lt)) - f + "px")
			}
			this.list.css(this.wh, a.intval(this.list.css(this.wh)) + f + "px");
			return m
		},
		remove : function (f) {
			var g = this.get(f);
			if (!g.length || (f >= this.first && f <= this.last)) {
				return
			}
			var h = this.dimension(g);
			if (f < this.first) {
				this.list.css(this.lt, a.intval(this.list.css(this.lt)) + h + "px")
			}
			g.remove();
			this.list.css(this.wh, a.intval(this.list.css(this.wh)) - h + "px")
		},
		next : function () {
			if (this.tail !== null && !this.inTail) {
				this.scrollTail(false)
			} else {
				this.scroll(((this.options.wrap == "both" || this.options.wrap == "last") && this.options.size !== null && this.last == this.options.size) ? 1 : this.first + this.options.scroll)
			}
		},
		prev : function () {
			if (this.tail !== null && this.inTail) {
				this.scrollTail(true)
			} else {
				this.scroll(((this.options.wrap == "both" || this.options.wrap == "first") && this.options.size !== null && this.first == 1) ? this.options.size : this.first - this.options.scroll)
			}
		},
		scrollTail : function (e) {
			if (this.locked || this.animating || !this.tail) {
				return
			}
			this.pauseAuto();
			var f = a.intval(this.list.css(this.lt));
			f = !e ? f - this.tail : f + this.tail;
			this.inTail = !e;
			this.prevFirst = this.first;
			this.prevLast = this.last;
			this.animate(f)
		},
		scroll : function (f, e) {
			if (this.locked || this.animating) {
				return
			}
			this.pauseAuto();
			this.animate(this.pos(f), e)
		},
		pos : function (C, k) {
			var n = a.intval(this.list.css(this.lt));
			if (this.locked || this.animating) {
				return n
			}
			if (this.options.wrap != "circular") {
				C = C < 1 ? 1 : (this.options.size && C > this.options.size ? this.options.size : C)
			}
			var z = this.first > C;
			var E = this.options.wrap != "circular" && this.first <= 1 ? 1 : this.first;
			var H = z ? this.get(E) : this.get(this.last);
			var B = z ? E : E - 1;
			var F = null,
			A = 0,
			w = false,
			G = 0,
			D;
			while (z ? --B >= C : ++B < C) {
				F = this.get(B);
				w = !F.length;
				if (F.length === 0) {
					F = this.create(B).addClass(this.className("jcarousel-item-placeholder"));
					H[z ? "before" : "after"](F);
					if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (B <= 0 || B > this.options.size)) {
						D = this.get(this.index(B));
						if (D.length) {
							F = this.add(B, D.clone(true))
						}
					}
				}
				H = F;
				G = this.dimension(F);
				if (w) {
					A += G
				}
				if (this.first !== null && (this.options.wrap == "circular" || (B >= 1 && (this.options.size === null || B <= this.options.size)))) {
					n = z ? n + G : n - G
				}
			}
			var s = this.clipping(),
			u = [],
			h = 0,
			t = 0;
			H = this.get(C - 1);
			B = C;
			while (++h) {
				F = this.get(B);
				w = !F.length;
				if (F.length === 0) {
					F = this.create(B).addClass(this.className("jcarousel-item-placeholder"));
					if (H.length === 0) {
						this.list.prepend(F)
					} else {
						H[z ? "before" : "after"](F)
					}
					if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (B <= 0 || B > this.options.size)) {
						D = this.get(this.index(B));
						if (D.length) {
							F = this.add(B, D.clone(true))
						}
					}
				}
				H = F;
				G = this.dimension(F);
				if (G === 0) {
					throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...")
				}
				if (this.options.wrap != "circular" && this.options.size !== null && B > this.options.size) {
					u.push(F)
				} else {
					if (w) {
						A += G
					}
				}
				t += G;
				if (t >= s) {
					break
				}
				B++
			}
			for (var r = 0; r < u.length; r++) {
				u[r].remove()
			}
			if (A > 0) {
				this.list.css(this.wh, this.dimension(this.list) + A + "px");
				if (z) {
					n -= A;
					this.list.css(this.lt, a.intval(this.list.css(this.lt)) - A + "px")
				}
			}
			var q = C + h - 1;
			if (this.options.wrap != "circular" && this.options.size && q > this.options.size) {
				q = this.options.size
			}
			if (B > q) {
				h = 0;
				B = q;
				t = 0;
				while (++h) {
					F = this.get(B--);
					if (!F.length) {
						break
					}
					t += this.dimension(F);
					if (t >= s) {
						break
					}
				}
			}
			var o = q - h + 1;
			if (this.options.wrap != "circular" && o < 1) {
				o = 1
			}
			if (this.inTail && z) {
				n += this.tail;
				this.inTail = false
			}
			this.tail = null;
			if (this.options.wrap != "circular" && q == this.options.size && (q - h + 1) >= 1) {
				var y = a.intval(this.get(q).css(!this.options.vertical ? "marginRight" : "marginBottom"));
				if ((t - y) > s) {
					this.tail = t - s - y
				}
			}
			if (k && C === this.options.size && this.tail) {
				n -= this.tail;
				this.inTail = true
			}
			while (C-- > o) {
				n += this.dimension(this.get(C))
			}
			this.prevFirst = this.first;
			this.prevLast = this.last;
			this.first = o;
			this.last = q;
			return n
		},
		animate : function (i, e) {
			if (this.locked || this.animating) {
				return
			}
			this.animating = true;
			var f = this;
			var g = function () {
				f.animating = false;
				if (i === 0) {
					f.list.css(f.lt, 0)
				}
				if (!f.autoStopped && (f.options.wrap == "circular" || f.options.wrap == "both" || f.options.wrap == "last" || f.options.size === null || f.last < f.options.size || (f.last == f.options.size && f.tail !== null && !f.inTail))) {
					f.startAuto()
				}
				f.buttons();
				f.notify("onAfterAnimation");
				if (f.options.wrap == "circular" && f.options.size !== null) {
					for (var k = f.prevFirst; k <= f.prevLast; k++) {
						if (k !== null && !(k >= f.first && k <= f.last) && (k < 1 || k > f.options.size)) {
							f.remove(k)
						}
					}
				}
			};
			this.notify("onBeforeAnimation");
			if (!this.options.animation || e === false) {
				this.list.css(this.lt, i + "px");
				g()
			} else {
				var j = !this.options.vertical ? (this.options.rtl ? {
						right : i
					}
						 : {
						left : i
					}) : {
					top : i
				};
				var h = {
					duration : this.options.animation,
					easing : this.options.easing,
					complete : g
				};
				if (c.isFunction(this.options.animationStepCallback)) {
					h.step = this.options.animationStepCallback
				}
				this.list.animate(j, h)
			}
		},
		startAuto : function (f) {
			if (f !== undefined) {
				this.options.auto = f
			}
			if (this.options.auto === 0) {
				return this.stopAuto()
			}
			if (this.timer !== null) {
				return
			}
			this.autoStopped = false;
			var e = this;
			this.timer = window.setTimeout(function () {
					e.next()
				}, this.options.auto * 1000)
		},
		stopAuto : function () {
			this.pauseAuto();
			this.autoStopped = true
		},
		pauseAuto : function () {
			if (this.timer === null) {
				return
			}
			window.clearTimeout(this.timer);
			this.timer = null
		},
		buttons : function (g, f) {
			if (g == null) {
				g = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != "first") || this.options.size === null || this.last < this.options.size);
				if (!this.locked && (!this.options.wrap || this.options.wrap == "first") && this.options.size !== null && this.last >= this.options.size) {
					g = this.tail !== null && !this.inTail
				}
			}
			if (f == null) {
				f = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != "last") || this.first > 1);
				if (!this.locked && (!this.options.wrap || this.options.wrap == "last") && this.options.size !== null && this.first == 1) {
					f = this.tail !== null && this.inTail
				}
			}
			var e = this;
			if (this.buttonNext.size() > 0) {
				this.buttonNext.unbind(this.options.buttonNextEvent + ".jcarousel", this.funcNext);
				if (g) {
					this.buttonNext.bind(this.options.buttonNextEvent + ".jcarousel", this.funcNext)
				}
				this.buttonNext[g ? "removeClass" : "addClass"](this.className("jcarousel-next-disabled")).attr("disabled", g ? false : true);
				if (this.options.buttonNextCallback !== null && this.buttonNext.data("jcarouselstate") != g) {
					this.buttonNext.each(function () {
						e.options.buttonNextCallback(e, this, g)
					}).data("jcarouselstate", g)
				}
			} else {
				if (this.options.buttonNextCallback !== null && this.buttonNextState != g) {
					this.options.buttonNextCallback(e, null, g)
				}
			}
			if (this.buttonPrev.size() > 0) {
				this.buttonPrev.unbind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev);
				if (f) {
					this.buttonPrev.bind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev)
				}
				this.buttonPrev[f ? "removeClass" : "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", f ? false : true);
				if (this.options.buttonPrevCallback !== null && this.buttonPrev.data("jcarouselstate") != f) {
					this.buttonPrev.each(function () {
						e.options.buttonPrevCallback(e, this, f)
					}).data("jcarouselstate", f)
				}
			} else {
				if (this.options.buttonPrevCallback !== null && this.buttonPrevState != f) {
					this.options.buttonPrevCallback(e, null, f)
				}
			}
			this.buttonNextState = g;
			this.buttonPrevState = f
		},
		notify : function (e) {
			var f = this.prevFirst === null ? "init" : (this.prevFirst < this.first ? "next" : "prev");
			this.callback("itemLoadCallback", e, f);
			if (this.prevFirst !== this.first) {
				this.callback("itemFirstInCallback", e, f, this.first);
				this.callback("itemFirstOutCallback", e, f, this.prevFirst)
			}
			if (this.prevLast !== this.last) {
				this.callback("itemLastInCallback", e, f, this.last);
				this.callback("itemLastOutCallback", e, f, this.prevLast)
			}
			this.callback("itemVisibleInCallback", e, f, this.first, this.last, this.prevFirst, this.prevLast);
			this.callback("itemVisibleOutCallback", e, f, this.prevFirst, this.prevLast, this.first, this.last)
		},
		callback : function (j, m, e, k, h, g, f) {
			if (this.options[j] == null || (typeof this.options[j] != "object" && m != "onAfterAnimation")) {
				return
			}
			var n = typeof this.options[j] == "object" ? this.options[j][m] : this.options[j];
			if (!c.isFunction(n)) {
				return
			}
			var o = this;
			if (k === undefined) {
				n(o, e, m)
			} else {
				if (h === undefined) {
					this.get(k).each(function () {
						n(o, this, k, e, m)
					})
				} else {
					var p = function (q) {
						o.get(q).each(function () {
							n(o, this, q, e, m)
						})
					};
					for (var l = k; l <= h; l++) {
						if (l !== null && !(l >= g && l <= f)) {
							p(l)
						}
					}
				}
			}
		},
		create : function (e) {
			return this.format("<li></li>", e)
		},
		format : function (k, h) {
			k = c(k);
			var g = k.get(0).className.split(" ");
			for (var f = 0; f < g.length; f++) {
				if (g[f].indexOf("jcarousel-") != -1) {
					k.removeClass(g[f])
				}
			}
			k.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + h)).css({
				"float" : (this.options.rtl ? "right" : "left"),
				"list-style" : "none"
			}).attr("jcarouselindex", h);
			return k
		},
		className : function (e) {
			return e + " " + e + (!this.options.vertical ? "-horizontal" : "-vertical")
		},
		dimension : function (h, i) {
			var g = c(h);
			if (i == null) {
				return !this.options.vertical ? ((g.innerWidth() + a.intval(g.css("margin-left")) + a.intval(g.css("margin-right")) + a.intval(g.css("border-left-width")) + a.intval(g.css("border-right-width"))) || a.intval(this.options.itemFallbackDimension)) : ((g.innerHeight() + a.intval(g.css("margin-top")) + a.intval(g.css("margin-bottom")) + a.intval(g.css("border-top-width")) + a.intval(g.css("border-bottom-width"))) || a.intval(this.options.itemFallbackDimension))
			} else {
				var f = !this.options.vertical ? i - a.intval(g.css("marginLeft")) - a.intval(g.css("marginRight")) : i - a.intval(g.css("marginTop")) - a.intval(g.css("marginBottom"));
				c(g).css(this.wh, f + "px");
				return this.dimension(g)
			}
		},
		clipping : function () {
			return !this.options.vertical ? this.clip[0].offsetWidth - a.intval(this.clip.css("borderLeftWidth")) - a.intval(this.clip.css("borderRightWidth")) : this.clip[0].offsetHeight - a.intval(this.clip.css("borderTopWidth")) - a.intval(this.clip.css("borderBottomWidth"))
		},
		index : function (e, f) {
			if (f == null) {
				f = this.options.size
			}
			return Math.round((((e - 1) / f) - Math.floor((e - 1) / f)) * f) + 1
		}
	});
	a.extend({
		defaults : function (e) {
			return c.extend(d, e || {})
		},
		intval : function (e) {
			e = parseInt(e, 10);
			return isNaN(e) ? 0 : e
		},
		windowLoaded : function () {
			b = true
		}
	});
	c.fn.jcarousel = function (g) {
		if (typeof g == "string") {
			var e = c(this).data("jcarousel"),
			f = Array.prototype.slice.call(arguments, 1);
			return e[g].apply(e, f)
		} else {
			return this.each(function () {
				var h = c(this).data("jcarousel");
				if (h) {
					if (g) {
						c.extend(h.options, g)
					}
					h.reload()
				} else {
					c(this).data("jcarousel", new a(this, g))
				}
			})
		}
	}
})(jQuery);
