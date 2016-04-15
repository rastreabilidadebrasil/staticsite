//Page Preloader
 $(window).load(function() {
	$("#intro-loader").delay(1).fadeOut();
 	$(".mask").delay(1).fadeOut("slow");
 });

$(document).ready(function() {



	// Contact Form Request
	//$(".validate").validate();
	// $(document).on('submit', '#contactform', function() {
	// 	$.ajax({
	// 		url: 'contact/send_mail.php',
	// 		type: 'post',
	// 		dataType: 'json',
	// 		data: $(this).serialize(),
	// 		success: function(data) {
	// 			if (data == true) {
	// 				$('.form-respond').html("<div class='content-message'>  <h2>Email enviado com sucesso</h2> <p>Em breve você receberá uma resposta.</p> </div>");
	// 			} else {
	// 				$('.form-respond').html("<div class='content-message'>  <h2>Erro no envio</h2> <p>Tente novamente mais tarde.</p> </div>");
	// 			}
	// 		},
	// 		error: function(xhr, err) {
	// 			$('.form-respond').html("<div class='content-message'> <i class='fa fa-times fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p> </div>");
	// 		}
	// 	});
	// 	return false;
	// });

	//Elements Appear from top
	$('.item_top').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity: 1,
				top: "0px"
			}, 1000);
		});
	});

	//Elements Appear from bottom
	$('.item_bottom').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity: 1,
				bottom: "0px"
			}, 1000);
		});
	});

	//Elements Appear from left
	$('.item_left').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity: 1,
				left: "0px"
			}, 1000);
		});
	});

	//Elements Appear from right
	$('.item_right').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity: 1,
				right: "0px"
			}, 1000);
		});
	});

	//Elements Appear in fadeIn effect
	$('.item_fade_in').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity: 1,
				right: "0px"
			}, 1000);
		});
	});

	$("#navigation").sticky({
		topSpacing: 0
	});

	$(".container").fitVids();

	$('a.external').click(function() {
		var url = $(this).attr('href');
		$('.mask').fadeIn(250, function() {
			document.location.href = url;
		});
		$("#intro-loader").fadeIn("slow");
		return false;
	});

	$('.flexslider').flexslider({
		animation: "slide"
	});

	$('.intro-flexslider').flexslider({
		animation: "fade",
		touch: false,
		directionNav: false,
		controlNav: false,
		slideshowSpeed: 5000,
		animationSpeed: 600,
	});


	// Radial progress bar
	$('.cart').appear(function() {
		var easy_pie_chart = {};
		$('.circular-item').removeClass("hidden");
		$('.circular-pie').each(function() {
			var text_span = $(this).children('span');
			$(this).easyPieChart($.extend(true, {}, easy_pie_chart, {
				size: 250,
				animate: 2000,
				lineWidth: 6,
				lineCap: 'square',
				barColor: $(this).data('color'),
				lineWidth: 20,
				trackColor: '#2B2925',
				scaleColor: false,
				onStep: function(value) {
					text_span.text(parseInt(value, 10) + '%');
				}
			}));
		});
	});

	// Portfolio Isotope
	var container = $('#portfolio-wrap');
	// container.isotope({
	// 	animationEngine: 'best-available',
	// 	animationOptions: {
	// 		duration: 200,
	// 		queue: false
	// 	},
	// });
	$('#filters a').click(function() {
		$('#filters a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		container.isotope({
			filter: selector
		});
		setProjects();
		return false;
	});


	function splitColumns() {
		var winWidth = $(window).width() + 15,
			columnNumb = 1;
		if (winWidth > 1200) {
			columnNumb = 4;
		} else if (winWidth > 992) {
			columnNumb = 2;
		} else if (winWidth > 767) {
			columnNumb = 2;
		} else if (winWidth < 767) {
			columnNumb = 1;
		}
		return columnNumb;
	}

	function setColumns() {
		var winWidth = $(window).width(),
			columnNumb = splitColumns(),
			postWidth = Math.floor(winWidth / columnNumb);
		container.find('.portfolio-item').each(function() {
			$(this).css({
				width: postWidth + 'px'
			});
		});
	}

	function setProjects() {
		setColumns();
		// container.isotope('reLayout');
	}


	// container.imagesLoaded(function() {
	// 	setColumns();
	// });
	$(window).bind('resize', function() {
		setProjects();
	});
	$('#portfolio-wrap .portfolio-item .portfolio').each(function() {
		$(this).hoverdir();
	});

	//Navigation Scrolling
	$(function() {
		$('#brand, .nav li a, .start-button').bind('click', function(event) {
			var $anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 60
			}, 1500, 'easeInOutExpo');

			event.preventDefault();
		});
	});

	//Navigation Dropdown
	$('.nav a.int-collapse-menu').click(function() {
		$(".navbar-collapse").collapse("hide")
	});

	$('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
		e.stopPropagation();
	});

	var onMobile = false;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		onMobile = true;
	}

	//Back To Top
	$(window).scroll(function() {
		if ($(window).scrollTop() > 400) {
			$("#back-top").fadeIn(200);
		} else {
			$("#back-top").fadeOut(200);
		}
	});
	$('#back-top').click(function() {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 1500, 'easeInOutExpo');
	});

	if ((onMobile === false) && ($('.parallax-slider').length)) {
		skrollr.init({
			edgeStrategy: 'set',
			smoothScrolling: false,
			forceHeight: false
		});

	}

});

//FullScreen Slider
$(function() {
	$('#fullscreen-slider').maximage({
		cycleOptions: {
			fx: 'fade',
			speed: 1000,
			timeout: 0,
			prev: '#slider_left',
			next: '#slider_right',
			pause: 1,
			before: function(last, current) {
				jQuery('.slide-content').fadeOut().animate({
					top: '100px'
				}, {
					queue: false,
					easing: 'easeOutQuad',
					duration: 550
				});
				jQuery('.slide-content').fadeOut().animate({
					top: '-100px'
				});
			},
			after: function(last, current) {
				jQuery('.slide-content').fadeIn().animate({
					top: '0'
				}, {
					queue: false,
					easing: 'easeOutQuad',
					duration: 450
				});
			}
		},
		onFirstImageLoaded: function() {
			jQuery('#cycle-loader').delay(800).hide();
			jQuery('#fullscreen-slider').delay(800).fadeIn('slow');
			jQuery('.slide-content').fadeIn().animate({
				top: '0'
			});
			jQuery('.slide-content a').bind('click', function(event) {
				var $anchor = $(this);
				jQuery('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top - 44
				}, 1500, 'easeInOutExpo');
				event.preventDefault();
			});
		}
	});
});

//Parallax
$(window).bind('load', function() {
	parallaxInit();
});

function parallaxInit() {
	$('#one-parallax').parallax("30%", 0.1);
	$('#two-parallax').parallax("30%", 0.1);
	$('#three-parallax').parallax("30%", 0.1);
	$('#four-parallax').parallax("30%", 0.1);
	$('#five-parallax').parallax("30%", 0.1);
	$('#six-parallax').parallax("30%", 0.1);
	$('#seven-parallax').parallax("30%", 0.1);
	/*add as necessary*/
}

// Number Counter
(function() {
	var Core = {
		initialized: false,
		initialize: function() {
			if (this.initialized)
				return;
			this.initialized = true;
			this.build();
		},
		build: function() {
			this.animations();
		},
		animations: function() {
			// Count To
			$(".number-counters [data-to]").each(function() {
				var $this = $(this);
				$this.appear(function() {
					$this.countTo({});
				}, {
					accX: 0,
					accY: -150
				});
			});
		},
	};
	Core.initialize();
})();


//animação do fundo da nossa empresa
function animafundo() {

	$(".nossa-empresa-background").animate({
		backgroundPositionX: "1050px"
	}, {
		speed: "slow"
	});

}