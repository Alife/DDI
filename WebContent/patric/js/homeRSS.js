homeRSS();
function homeRSS() {
	var a = "/enews/php/homepage.js?callback=?";
	$.getJSON(a, function (d) {
		$(".home .wp-headline").each(function () {
			$(this).text(d[$(this).attr("id")]);
			if ($(this).hasClass("section-title")) {
				$(this).wrapInner('<span class="wrap">')
			}
		});
		function c(j, h, i, f) {
			var g = '<li class="clear"><figure class="figure-right"><a href="' + f + '"><img src="' + i + '" alt="' + j + '" /></a></figure><h4 class="bold"><a href="' + f + '">' + j + "</a></h4><p>" + h + "</p></li>";
			return g
		}
		$.each(d.tools, function (f, g) {
			if ((f % 2) == 0) {
				$(".home article.tools .column:first-child ul").append(c(this.post_title, this.post_content, this.tool_image_thumbnail, this.tool_url))
			} else {
				$(".home article.tools .column:last-child ul").append(c(this.post_title, this.post_content, this.tool_image_thumbnail, this.tool_url))
			}
		});
		function b(l, k, j, i, f, h) {
			var g = '<li class="slide"><div class="wrapper"><img class="right" src="' + l + '" /><h2 class="xxxl sans-alternate upper highlight-e">' + k + '</h2><h3 class="xl highlight-f upper far">' + j + "</h3><p>" + i + '</p><p><a class="button upper sans-alternate largest highlight avoid-arrow" href="' + f + '">' + h + "</a></p></div></li>";
			return g
		}
		function e(f, j, h) {
			var g = '<li data-slide="' + f + '"><h3 class="close highlight-b upper sans-alternate">' + j + '</h3><h4 class="upper sans-alternate">' + h + "</h4></li>";
			return g
		}
		$.each(d.slides, function (f, g) {
			$(".home .feature ul.nicefade_container").append(b(this.slide_image, this.post_title, this.slide_subtitle, this.post_content, this.button_url, this.button_text));
			$(".home .feature ul.arrow").append('<li data-slide="' + (f + 1) + '"></li>');
			$(".home .feature .feature-nav ul.nicefade_index-list").append(e((f + 1), this.slide_nav_line_1, this.slide_nav_line_2))
		});
		initNicefade()
	})
};
