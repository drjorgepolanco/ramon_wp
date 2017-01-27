/* HELPER FUNCTIONS */
var ramonFunctions = (function() {
	return {
        returnToTop: function(trigger, scrollTop, speed, callback) {
            $(trigger).on('click', function(event) {
                event.preventDefault();
                $('body, html').animate({
                    scrollTop: scrollTop
                }, speed, callback);
            });
        },
        hideHeader: function(header) {
        	$(header).removeClass("is-visible").addClass("is-hidden");
        },
        showHeader: function(header) {
        	$(header).removeClass("is-hidden").addClass("is-visible");
        },
        headerHideOnScroll: function(header) {
        	var initialLocation = 0
        	var currentLocation, documentHeight, windowHeight;

        	$(window).on('scroll', function() {
        		currentLocation = $(this).scrollTop();
        		documentHeight  = $(document).height();
        		windowHeight    = $(window).height();
        		if (currentLocation > 1 && currentLocation < documentHeight - windowHeight) {
        			if (currentLocation > initialLocation) {
        				window.setTimeout(this.hideHeader(header), 500);
        			}
        			else {
        				window.setTimeout(this.showHeader(header), 500);
        			}
        			initialLocation = currrentLocation;
        		}
        	});
        },
        imageSlider: function(imgSlide, previous, next, transition) {
        	var currentIndex = 0;
        	var items        = $(imgSlide);
        	var itemsCount   = items.length;
        	var autoSlide;
        	var transition   = transition || 3000;

        	items.first().addClass('active');

        	function moveItems() {
        		var item = $(imgSlide).eq(currentIndex);
        		items.removeClass('active');
        		item.addClass('active');
        	}

        	function moveOne() {
        		if (currentIndex > itemCount - 1) {
        			currentIndex = 0;
        		}
        		moveItems(); 
        	}

        	autoSlide = setInterval(function() {
        		currentIndex++;
        		moveOne();
        	}, transition);

        	$(next).on('click', function() {
        		clearInterval(autoSlide);
        		currentIndex++;
        		moveOne();
        	});

        	$(previous).on('click', function() {
        		clearInterval(autoSlide);
        		currentIndex--;
        		if (currentIndex < 0) {
        			currentIndex = itemCount - 1;
        		}
        		moveItems();
        	});
        },
        smoothScrolling: function($trigger, $duration) {
			$trigger.on('click', function(event) {
			    event.preventDefault();
			    var hash = this.hash;
			    $('html, body').animate({ 
			    	scrollTop: $(hash).offset().top 
			    }, $duration, function() {
			        window.location.hash = hash;
			    });
			});
        }
	}
})();



/* GENERAL FUNCTIONS */
/* ================= */

var generalFuncs = (function() {
	'use strict';

	var mu;

	var general = {
		settings: {
			/* General */
			body:           $('body'),
			rideToTop:      $('#mu-ride-to-top'),

			/* Header & Nav */
			navTrigger:     $('#mu-nav-trigger'),
			navTriggerIcon: $('.mu-nav-trigger-icon'),
			mainNav:        $('#mu-main-nav'),
			header:         $('[data-nav-status="toggle"]'),

			/* Hero Slider */
			heroSlide:      $('.mu-hero-slide'),
			heroPrev:       $('#mu-hero-prev'),
			heroNext:       $('#mu-hero-next'),
			
			/* Helpers */
			hideHeader:     myHelpers.hideHeader.bind(myHelpers),
			showHeader:     myHelpers.showHeader.bind(myHelpers),
			returnToTop:    myHelpers.returnToTop.bind(myHelpers),
			transitionEnd:  'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

			/* FAQ */
			accordionLink: $('.mu-accordion-link'),

			/* About & Product Detail */
			internalNavContainer: $('.mu-product-navigation'),
			internalNavWrapper:   $('.mu-product-navigation-wrapper'),
			hiddenGalleryElement: $('.mu-gallery-img.hide')
		},
		init: function() {
			mu = this.settings;
			this.navigationHandler();
			this.headerStatusHandler();
			// this.headerWavesTwoHandler();
			// this.headerWavesOneHandler();
			this.heroSliderHandler();
			this.rideToTopHandler();
			this.faqQuestionsHandler();
			this.lockInternalNav();
			this.eventsGalleryHandler();
			this.showMoreImagesInGallery();
		},
		navigationHandler: function() {
			mu.navTrigger.on('click', function(event) {
				event.preventDefault();
				var scroll = $(window).scrollTop();
				if (mu.mainNav.hasClass('open')) {
					mu.mainNav.removeClass('open').one(mu.transitionEnd, function() {
						mu.body.removeClass('hide-overflow');
					});
					mu.navTriggerIcon.removeClass('clicked');
				}
				else {
					mu.mainNav.addClass('open').one(mu.transitionEnd, function() {
						mu.body.addClass('hide-overflow');
					});
					mu.navTriggerIcon.addClass('clicked');
				}
			});
		},
		headerStatusHandler: function() {
			var initial = 0;
			$(window).on('scroll', function() {
				var current = $(this).scrollTop();
				if (current > 1 && current < $(document).height() - $(window).height()) {
					if (current > initial) {
						window.setTimeout(mu.hideHeader(mu.header), 500);
					}
					else {
						window.setTimeout(mu.showHeader(mu.header), 500);
					}
					initial = current;
				}
			});
		},
		headerWavesTwoHandler: function() {
			var count = $('#mu-waves-one').find('li').length;
		    for (var i = 1; i < count; i++) {
		        var delay = i / count;
		        $('#mu-waves-two li:nth-child(' + i + ')').attr('style', '-webkit-animation-delay: ' + delay + 's;');
		    }
		},
		headerWavesOneHandler: function() {
			var count = $('#mu-waves-one').find('li').length;
			console.log(count);
		    for (var i = count; i > 1; i -= 1) {
		        var delay = i / count;
		        $('#mu-waves-one li:nth-child(' + i + ')').attr('style', '-webkit-animation-delay: ' + delay + 's;');
		    }
		},
		heroSliderHandler: function() {
			var currentIndex = 0;
			var items        = mu.heroSlide;
			var itemCount    = items.length;
			items.first().addClass('active');

			function moveItems() {
				var item = mu.heroSlide.eq(currentIndex);
				items.removeClass('active');
				item.addClass('active');
			}

			var autoSlide = setInterval(function() {
				currentIndex += 1;
				if (currentIndex > itemCount - 1) {
					currentIndex = 0;
				}
				moveItems();
			}, 3000);

			mu.heroNext.on('click', function() {
				clearInterval(autoSlide);
				currentIndex += 1;
				if (currentIndex > itemCount - 1) {
					currentIndex = 0;
				}
				moveItems();
			});

			mu.heroPrev.on('click', function() {
				clearInterval(autoSlide);
				currentIndex -= 1;
				if (currentIndex < 0) {
					currentIndex = itemCount - 1;
				}
				moveItems();
			});
		},
		rideToTopHandler: function() {
			mu.returnToTop(mu.rideToTop, 0, 800);
		},
		faqQuestionsHandler: function() {
			/* FAQ Modal */
			mu.accordionLink.on('click', function(event) {

			    event.preventDefault();

			    var $mainWrap     = $(this).parent().parent();
			    var $questionWrap = $(this).parent();
			    var $answerWrap = $questionWrap.next();

			    if ($mainWrap.hasClass('opened')) {
			    	$mainWrap.removeClass('opened');
			        $(this).find('.link-icon').html('<i class="fa fa-angle-down"></i>');
			        $answerWrap.slideUp().removeClass('opened');
			        $questionWrap.removeClass('opened');
			    }
			    else {
			        $(this).find('.link-icon').html('<i class="fa fa-angle-up"></i>');
			        $mainWrap.addClass('opened');
			        $answerWrap.slideDown().addClass('opened');
			        $questionWrap.addClass('opened');
			    }

			    return false;
			});
		},
		lockInternalNav: function() {
			/* Locks Internal Navigation for About & Product Detail Page */
			if (mu.internalNavContainer.length) {
				var fixInternalNav = function() {
					mu.internalNavWrapper.addClass('fixed');
				}
				var unfixInternalNav = function() {
					mu.internalNavWrapper.removeClass('fixed');
				}
				$(window).on('scroll', function() {
					var scroll = $(window).scrollTop();
					(scroll >= $('.mu-product-navigation').offset().top) ? fixInternalNav() : unfixInternalNav();
				});
			} 
		},
		eventsGalleryHandler: function() {
			$('.mu-gallery-img-link').on('click', function(event) {
				event.preventDefault();
				var eventTarget = event.target;
				var targetSrc = $(eventTarget).data('source');
				if ($(eventTarget).is('a')) {
					$('.mu-first-img').find('a').css('background-image', 'url(' + targetSrc + ')');
				}
			});
		},
		showMoreImagesInGallery: function() {
			console.log('hol2a');
			$('#mu-gallery-reveal').on('click', function(event) {
				event.preventDefault();
				var eventTarget = event.target;
				if (mu.hiddenGalleryElement.hasClass('hide')) {
					mu.hiddenGalleryElement.removeClass('hide');
					$(eventTarget).text('Show Less');
					$(eventTarget).siblings('.mu-icon').html('<i class="fa fa-angle-up"></i>');
				}
				else {
					mu.hiddenGalleryElement.addClass('hide');
					$(eventTarget).text('Show More');
					$(eventTarget).siblings('.mu-icon').html('<i class="fa fa-angle-down"></i>');
				}
			});
		}
	}
	general.init();
});


var productsFuncs = (function() {
	'use strict';

	var mu;

	var products = {

		settings: {
			engageLink:         $('.mu-engage-link'),
			linkCopyContainer:  $('.mu-link-copy-container'),
			nutritionTrigger:   $('#mu-nutrition-trigger'),
			productNavLink:     $('#mu-product-navigation a[href^="#"]'),
			scrollSmooth:        myHelpers.smoothScrolling.bind(myHelpers),
			currentProductSlug: $('article.mu-product-detail').data('product-slug'),
			currentMediaPage:   $('.mu-media-page').data('page-link')
		},
		init: function() {
			mu = this.settings;
			this.engageLinksHandler();
			this.nutritionFactsHandler();
			this.productNavScrollHandler();
			this.currentThumbInProductDetailStateHandler();
			this.currentMediaPageStateHandler();
		},
		engageLinksHandler: function() {
			mu.engageLink.on('mouseenter', function() {
				$(this).find(mu.linkCopyContainer).slideDown();
			}).on('mouseleave', function() {
				$(this).find(mu.linkCopyContainer).slideUp();
			});
		},
		nutritionFactsHandler: function() {
			mu.nutritionTrigger.on('click', function(event) {
				event.preventDefault();
				var thisOne = $(this);
				var triggerText = $(this).find('span');
				var nutritionTable = $(this).next();
				if (nutritionTable.hasClass('open')) {
					thisOne.removeClass('active');
					nutritionTable.slideUp().removeClass('open');
					triggerText.text('Show Details');
				}
				else {
					thisOne.addClass('active');
					nutritionTable.slideDown().addClass('open');
					triggerText.text('Hide Details');
				}
			});
		},
		productNavScrollHandler: function() {
			mu.scrollSmooth(mu.productNavLink, 500);
		},
		currentThumbInProductDetailStateHandler: function() {
			var current = $(mu.currentProductSlug);
			current.addClass('active');
			console.log(current);
		},
		currentMediaPageStateHandler: function() {
			var current = $(mu.currentMediaPage);
			current.addClass('active');
			console.log(current);
		}
	}
	products.init();
});


/* FUNCTION TRIGGERS */
/* ================= */

(function() {
	generalFuncs();
	productsFuncs();
})();