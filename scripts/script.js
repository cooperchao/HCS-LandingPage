// pad_menu
side_menu = {
	speed: 200,
	input_obj: {},
	init_setting: function(input_menu_side, input_mask, input_open, input_close) {
		this.input_obj.menu_side = input_menu_side;
		this.input_obj.mask = input_mask;
		this.input_obj.open = input_open;
		this.input_obj.close = input_close;
		this.init();
	},
	init: function() {
		this.input_obj.open.click(function() {
			side_menu.open()
		});
		this.input_obj.close.click(function() {
			side_menu.close()
		});
		this.input_obj.mask.click(function() {
			side_menu.close()
		});
	},
	open: function() {
		this.input_obj.menu_side.stop().animate({"right": 0 }, this.speed);
		this.input_obj.mask.fadeIn();
	},
	close: function() {
		this.input_obj.menu_side.stop().animate({"right": this.input_obj.menu_side.outerWidth() * -1 }, this.speed);
		this.input_obj.mask.fadeOut();
	}
};

// goto_section
function goto_section() {

	var $win          = $(window),
		$htmlbody     = $("html, body"),
		$headWarp     = $(".head_warp"),
		$headLogo     = $(".logo_wrap").find(".logo"),
		$menu         = $(".menu"),
		$menuli       = $menu.find("li"),
		$sideMenuWrap = $(".side_menu_wrap"),
		$sideMenu     = $sideMenuWrap.find(".side_menu"),
		$sideHome     = $sideMenu.find(".home"),
		$sideItem     = $sideMenu.find(".side_menu_item"),
		$mask         = $(".cont_mask"),
		_headH        = $headWarp.height(),
		_sectionArray = [],
		_spd          = 300;

	$.each($menuli, function(i){
		var $li           = $menuli.eq(i),
			$tmp          = $("#section" + (i + 1)),
			_tmpOffsetTop = $tmp.offset().top, 
			_tmpHeight    = $tmp.outerHeight(true);

		_sectionArray[i] = {
			menu: $li,
			top: _tmpOffsetTop,
			bottom: _tmpOffsetTop + _tmpHeight
		};
	});

	// goto_top
	$headLogo.click(function() {
		$htmlbody.stop().animate({scrollTop: 0}, _spd);
	});

	$sideHome.click(function() {
		$htmlbody.stop().animate({scrollTop: 0}, _spd);
	});

	// desktop
	$menuli.click(function() {
		var _tidx      = $(this).index() + 1,
			$section   = $("#section" + _tidx),
			_offsetTop = $section.offset().top - (_headH - 5);

		$htmlbody.stop().animate({"scrollTop": _offsetTop}, _spd);
	});

	// pad
	$sideItem.click(function() {
		var _tidx      = $(this).index(),
			$section   = $("#section" + _tidx),
			_offsetTop = $section.offset().top - (_headH - 5);

		$htmlbody.stop().animate({"scrollTop": _offsetTop}, _spd);
		if($win.width() < 941) {
			side_menu.close($sideMenuWrap, $mask);
		}
	});

	// scroll
	$win.scroll(function() {
		var _scrollTop = $win.scrollTop(),
			$active    = $(".active"),
			_active    = "active";
		if(_scrollTop >= _sectionArray[0].top - _headH) {
			for(var i=0; i < _sectionArray.length; i++) {
				var _content = _sectionArray[i];
				if(_scrollTop >= _content.top - _headH  && _scrollTop < _content.bottom - _headH) {
					$active.removeClass(_active);
					_content.menu.addClass(_active);
					$sideItem.eq(i).addClass(_active);
					return false;
				}
			}
		} else {
			$active.removeClass(_active);
		}
	});
};

// head_bgcolor
function head_bgcolor(){
	var $headWarp = $(".head_warp");
	if($(window).scrollTop() >= 320){
	var $headWarp  = $(".head_warp");
		$headWarp.addClass("head_fix");
	} else {
		$headWarp.removeClass("head_fix");;
	}
};


// nav_position
function nav_position(){
	var $sideMenuWrap   = $(".side_menu_wrap"),
		$sideMenuWrap_w = $sideMenuWrap.outerWidth(true) * -1,
		$mask           = $(".cont_mask");
	if($(window).width() > 941 && $(".btn_menu").is(":hidden")) {
		$sideMenuWrap.css("right", 20);
		$mask.hide();
	} else {
		$sideMenuWrap.css("right", $sideMenuWrap_w);
	}
};

// animateNumbers
$.fn.animateNumbers = function(stop, commas, duration, ease) {
	return this.each(function() {
		var $this = $(this);
		var start = parseInt($this.text().replace(/,/g, ""));
		commas = (commas === undefined) ? true : commas;
		$({value: start}).stop().animate({value: stop}, {
			duration: duration == undefined ? 1000 : duration,
			easing: ease == undefined ? "swing" : ease,
			step: function() {
				$this.text(Math.floor(this.value));
				if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
			},
			complete: function() {
			   if (parseInt($this.text()) !== stop) {
					$this.text(stop);
					if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
			   }
			}
		});
	});
};

$(function(){
	
	// head_bgcolor();
	side_menu.init_setting($(".side_menu_wrap"), $(".cont_mask"), $(".btn_menu"), $(".side_menu_close")); 
	goto_section();

	// swiper_banner
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: 4000,  // 2500
		autoplayDisableOnInteraction: false,
		loop: true,
		lang: {
			"zh-TW": ["","","",""],
			"en": ["","","",""],
			"zh-cn": ["","","",""],
		},
		paginationBulletRender: function (index, className) {
			var $lang = (this.lang[$("html").prop("lang")] == undefined) ? "zh-TW" : $("html").prop("lang");
			return '<span class="' + className + '">' + "<div>"+ this.lang[$lang][index] +"</div>" + '</span>';
		}
	});

});

$(window).scroll(function() {
	head_bgcolor();

	// animateNumbers
	if($(window).scrollTop() > 4850){
		var $speed = 800;
		$( "#num1" ).animateNumbers("30", false, $speed);
		$( "#num2" ).animateNumbers("10", false, $speed);
		$( "#num3" ).animateNumbers("5" , false, $speed);
		$( "#num4" ).animateNumbers("1" , false, $speed);
		$( "#num6" ).animateNumbers("15", false, $speed);
		$( "#num7" ).animateNumbers("2" , false, $speed);
	}
});

$(window).resize(function() {
	 nav_position();
});