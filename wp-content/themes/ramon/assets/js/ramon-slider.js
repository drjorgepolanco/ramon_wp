var ramonSlider = function(slides, prev, next, transition) {
    var imgSlider = {
        slides: $(slides),
        prev: $(prev),
        next: $(next),
        transition: transition || 3000,
        currentIndex: 0,
        slideCount: $(slides).length,
        interval: undefined,
        makeFirstSlideActive: function() {
            this.slides.first().addClass('active');
        },
        moveItems: function() {
            var currentSlide = this.slides.eq(this.currentIndex);
            this.slides.removeClass('active');
            currentSlide.addClass('active');
        },
        moveOne: function() {
            var thisObject = this;
            if (this.currentIndex > this.slideCount - 1) {
                thisObject.currentIndex = 0;
            }
            this.moveItems();
        },
        autoSlide: function() {
            var thisObject = this;
            this.interval = window.setInterval(function() {
                thisObject.currentIndex++;
                thisObject.moveOne();
            }, thisObject.transition);
        },
        moveToNext: function() {
            var thisObject = this;
            this.next.on('click', function() {
                window.clearInterval(thisObject.interval);
                thisObject.currentIndex++;
                thisObject.moveOne();              
            });
        },
        movetoPrev: function() {
            var thisObject = this;
            this.prev.on('click', function() {
                window.clearInterval(thisObject.interval);
                thisObject.currentIndex--;
                if (thisObject.currentIndex < 0) {
                    thisObject.currentIndex = thisObject.slideCount - 1;
                }
                thisObject.moveItems();                
            });
        }   
    }
    var init = function() {
        imgSlider.makeFirstSlideActive();
        imgSlider.moveItems();
        imgSlider.moveOne();
        imgSlider.autoSlide();
        imgSlider.moveToNext();
        imgSlider.movetoPrev();
        console.log(imgSlider.autoSlide);
    }
    return init();
};

// ramonSlider('.ramon-img-slide', '#ramon-slider-prev', '#ramon-slider-next');