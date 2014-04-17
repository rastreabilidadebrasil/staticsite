$(window).load(function() {
	jQuery('#themes_panel').animate({
		opacity : 1
	}, 400);
});

$.cookie = function(name, value, options) {
	if ( typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && ( typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if ( typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

jQuery(function() {

	/* Show or hide themes panel
	 ----------------------------------------------------------*/
	themes_panel_width = jQuery('#themes_menu').outerWidth();
	jQuery('#themes_panel').css('left', 0);
	jQuery('#themes_panel').animate({
		left : -themes_panel_width
	}, 400);
	jQuery('#toggle_button').click(function() {
		var themes_panel = jQuery(this).parent();
		themes_panel.animate({
			left : parseInt(themes_panel.css('left'), 10) == 0 ? -themes_panel_width : 0
		}, 400);
		return false;
	});

	/* If cookie exists, apply classes from cookie
	 ----------------------------------------------------------*/
	if ($.cookie('skin') != null) {
		$.cookie('skin', $.cookie('skin'), {
			expires : 0,
			path : '/'
		});
		jQuery('#primary_color_scheme').attr('href', 'css/color/' + $.cookie('skin') + '.css');
	}

	/* Change Theme Colors on click and set cookie
	 ----------------------------------------------------------*/
	jQuery('#themes_panel ul.theme.cookie_colors li a').click(function() {
		var c_skin = jQuery(this).attr('title');
		$.cookie('skin', c_skin, {
			expires : 0,
			path : '/'
		});
		jQuery('#primary_color_scheme').attr('href', 'css/color/' + c_skin + '.css');
		return false;
	});

}); 