(function($) {
    var params;              // Initial parameters.
    var baseContainer;       // Container that contains list (<div>).
    var slidesContainer;     // Container that contains all items of list (<ul>).
    var slides;              // All items of the list (<li>).
    var slidesWidthCache;    // Contains width of each slide.
    var leftSlidingControl;  // Control for sliding to left.
    var rightSlidingControl; // Control for sliding to right.
    var leftSlideIndex;      // Current index of the left visible slide.
    var autoSlidingTimers;   // Timers with auto-sliding actions.

    $.fn.gallerot = function(parameters) {
        params = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            slidingSpeed: 500,
            enableAutoSliding: false,
            autoSlidingDelay: 5000,
            stopAutoSlidingOnHover: true,
            autoSlidingDirection: 'right', // left or right
            slideEasing: easingSlidingFunc,
            rewindEasing: easingRewindingFunc
        }, parameters);
        baseContainer = $(this);
        slidesContainer = baseContainer.children('ul');
        slides = slidesContainer.children('li');
        leftSlidingControl = $(params.leftControl);
        rightSlidingControl = $(params.rightControl);
        leftSlideIndex = 0;
        autoSlidingTimers = [];
        slidesWidthCache = {};

        // Positioning and sizing.
        baseContainer.addClass('gallerot-container');
        baseContainer.width(params.width != null ? params.width : baseContainer.parent().width());
        baseContainer.height(params.height != null ? params.height : baseContainer.parent().height());
        var slidesOverallWidth = 0;
        for (var i = 0; i < slides.length; i++) {
            var slideWidth = $(slides[i]).width();
            slidesWidthCache[i] = slideWidth;
            slidesOverallWidth += slideWidth;
        }
        slidesContainer.width(slidesOverallWidth);
        /* CSS3 plans
        slidesContainer.css({'transition': 'left 1s'});
        slidesContainer.css({'-moz-transition': 'left 1s'});
        slidesContainer.css({'-ms-transition': 'left 1s'});
        slidesContainer.css({'-webkit-transition': 'left 1s'});
        slidesContainer.css({'-o-transition': 'left 1s'});
        */

        // Action listeners
        leftSlidingControl.bind('click', slideLeft);
        rightSlidingControl.bind('click', slideRight);

        // Auto sliding
        if (params.enableAutoSliding) {
            startAutoSliding();
            if (params.stopAutoSlidingOnHover) {
                baseContainer.hover(stopAutoSliding, startAutoSliding);
            }
            leftSlidingControl.hover(stopAutoSliding, startAutoSliding);
            rightSlidingControl.hover(stopAutoSliding, startAutoSliding);
        }

        return this;
    };

    var slideLeft = function() {
        if (params.enableAutoSliding) stopAutoSliding();
        if (leftSlideIndex > 0) {
            moveSlidesContainerTo(leftSlideIndex - 1, params.slidingSpeed, params.slideEasing);
        } else if (leftSlideIndex == 0) {
            moveSlidesContainerTo(slides.length - 1, (params.slidingSpeed * 3), params.rewindEasing);
        }
    };

    var slideRight = function() {
        if (params.enableAutoSliding) stopAutoSliding();
        if (leftSlideIndex < (slides.length - 1)) {
            moveSlidesContainerTo(leftSlideIndex + 1, params.slidingSpeed, params.slideEasing);
        } else if (leftSlideIndex == (slides.length - 1)) {
            moveSlidesContainerTo(0, (params.slidingSpeed * 3), params.rewindEasing);
        }
    };

    var startAutoSliding = function() {
        if (params.autoSlidingDirection == 'left') {
            startLeftAutoSliding();
        } else if (params.autoSlidingDirection == 'right') {
            startRightAutoSliding();
        }
    };

    var stopAutoSliding = function() {
        for (var i = 0; i < autoSlidingTimers.length; i++) {
            clearTimeout(autoSlidingTimers[i]);
        }
    };

    var startLeftAutoSliding = function() {
        stopAutoSliding();
        var autoSlidingTimer = setTimeout(function() {
            slideLeft();
            startLeftAutoSliding();
        }, params.autoSlidingDelay);
        autoSlidingTimers.push(autoSlidingTimer);
    };

    var startRightAutoSliding = function() {
        stopAutoSliding();
        var autoSlidingTimer = setTimeout(function() {
            slideRight();
            startRightAutoSliding();
        }, params.autoSlidingDelay);
        autoSlidingTimers.push(autoSlidingTimer);
    };

    var moveSlidesContainerTo = function(slideIndex, speed, easing) {
        var slidersContainerLeft = 0;
        for (var i = 0; i < slides.length; i++) {
            if (i < slideIndex) {
                slidersContainerLeft += slidesWidthCache[i];
            }
        }
        leftSlideIndex = slideIndex;
        // CSS3 plans
        //slidesContainer.css({left: -slidersContainerLeft});
        slidesContainer.animate({left: -slidersContainerLeft}, speed, easing);
    };

    var easingSlidingFunc = 'glrtSliding';
    $.easing.glrtSliding = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    var easingRewindingFunc = 'glrtRewinding';
    $.easing.glrtRewinding = function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };
})(jQuery);