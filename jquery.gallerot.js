(function($) {
    var params;                  // Initial parameters.
    var baseContainer;           // Container that contains list (<div>).
    var slidesContainer;         // Container that contains all items of list (<ul>).
    var slides;                  // All items of the list (<li>).
    var slidesWidthCache;        // Contains width of each slide.
    var leftSlidingControl;      // Control for sliding to left.
    var rightSlidingControl;     // Control for sliding to right.
    var leftSlideIndex;          // Current index of the left visible slide.
    var currentAutoSlidingTimer; // Current timer for auto-sliding.

    var vendors = ['moz', 'ms', 'o', 'webkit'];

    $.fn.gallerot = function(parameters) {
        params = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            slidingSpeed: 1000,
            enableAutoSliding: false,
            autoSlidingDelay: 5000,
            stopAutoSlidingOnHover: true,
            autoSlidingDirection: 'right' // left or right
        }, parameters);
        baseContainer = $(this);
        slidesContainer = baseContainer.children('ul');
        slides = slidesContainer.children('li');
        leftSlidingControl = $(params.leftControl);
        rightSlidingControl = $(params.rightControl);
        leftSlideIndex = 0;
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
        var slidingSpeed = (params.slidingSpeed / 1000) + 's';
        slidesContainer.css(crossCssRule('transition', ('left ' + slidingSpeed)));

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
        if (leftSlideIndex > 0) {
            moveSlidesContainerTo(leftSlideIndex - 1);
        } else if (leftSlideIndex == 0) {
            moveSlidesContainerTo(slides.length - 1);
        }
    };

    var slideRight = function() {
        if (leftSlideIndex < (slides.length - 1)) {
            moveSlidesContainerTo(leftSlideIndex + 1);
        } else if (leftSlideIndex == (slides.length - 1)) {
            moveSlidesContainerTo(0);
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
        clearTimeout(currentAutoSlidingTimer);
    };

    var startLeftAutoSliding = function() {
        stopAutoSliding();
        currentAutoSlidingTimer = setTimeout(function() {
            slideLeft();
            startLeftAutoSliding();
        }, params.autoSlidingDelay);
    };

    var startRightAutoSliding = function() {
        stopAutoSliding();
        currentAutoSlidingTimer = setTimeout(function() {
            slideRight();
            startRightAutoSliding();
        }, params.autoSlidingDelay);
    };

    var moveSlidesContainerTo = function(slideIndex) {
        var slidersContainerLeft = 0;
        for (var i = 0; i < slides.length; i++) {
            if (i < slideIndex) {
                slidersContainerLeft += slidesWidthCache[i];
            }
        }
        leftSlideIndex = slideIndex;
        slidesContainer.css({left: -slidersContainerLeft});
    };

    var crossCssRule = function(property, value) {
        var cssRules = {};
        cssRules[property] = value;
        for (var vendor in vendors) {
            cssRules[vendor + property] = value;
        }
        return cssRules;
    };
})(jQuery);