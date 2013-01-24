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
            easingSlide: 'glrtSliding',
            easingRewind: 'glrtRewinding'
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
        /* CSS3 animation. Plan on the future.
        var slidingSpeedCss3 = String(params.slidingSpeed / 1000) + "s";
        slidesContainer.css({'transition':slidingSpeedCss3});
        slidesContainer.css({'-moz-transition':slidingSpeedCss3});
        slidesContainer.css({'-ms-transition':slidingSpeedCss3});
        slidesContainer.css({'-webkit-transition':slidingSpeedCss3});
        slidesContainer.css({'-o-transition':slidingSpeedCss3});*/

        // Action listeners
        leftSlidingControl.bind('click', slideLeft);
        rightSlidingControl.bind('click', slideRight);

        // Auto sliding
        if (params.enableAutoSliding) {
            if (params.stopAutoSlidingOnHover) {
                baseContainer.hover(stopAutoSliding, startAutoSliding);
            }
            leftSlidingControl.hover(stopAutoSliding, startAutoSliding);
            rightSlidingControl.hover(stopAutoSliding, startAutoSliding);
            startAutoSliding();
        }

        return this;
    };

    var slideLeft = function() {
        if (params.enableAutoSliding) stopAutoSliding();
        if (leftSlideIndex > 0) {
            moveSlidesContainerTo(leftSlideIndex - 1, params.slidingSpeed, params.easingSlide);
        } else if (leftSlideIndex == 0) {
            moveSlidesContainerTo(slides.length - 1, (params.slidingSpeed * 3), params.easingRewind);
        }
    };

    var slideRight = function() {
        if (params.enableAutoSliding) stopAutoSliding();
        if (leftSlideIndex < (slides.length - 1)) {
            moveSlidesContainerTo(leftSlideIndex + 1, params.slidingSpeed, params.easingSlide);
        } else if (leftSlideIndex == (slides.length - 1)) {
            moveSlidesContainerTo(0, (params.slidingSpeed * 3), params.easingRewind);
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
        slidesContainer.animate({marginLeft: -slidersContainerLeft}, speed, easing);
    };

    $.easing.glrtSliding = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    $.easing.glrtRewinding = function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };
})(jQuery);