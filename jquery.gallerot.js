(function($) {
    var params;                  // Configuration parameters.
    var baseContainer;           // Container that contains list of slides (<div>).
    var slidesContainer;         // Container that contains all slides (<ul>).
    var slides;                  // All slides (<li>).
    var slidesLeftPos;           // Contains left position of each slide.
    var leftSlidingControl;      // Control for sliding left.
    var rightSlidingControl;     // Control for sliding right.
    var leftSlideIndex;          // Current index of the left visible slide.
    var curAutoSlidingTimer;     // Current timer for auto-sliding.

    var vendors = ['-moz-', '-ms-', '-o-', '-webkit-'];

    $.fn.gallerot = function(parameters) {
        params = $.extend({
            width: null, // Width of base container.
            height: null, // Height of base container.
            leftControl : null, // Control for sliding left.
            rightControl : null, // Control for sliding right.
            slidingSpeed: 1000, // Speed of sliding (milliseconds).
            enableAutoSliding: false, // If true the feature of auto sliding will be enabled.
            autoSlidingDelay: 6000, // Delay between sliding in the auto mode.
            stopAutoSlidingOnHover: true // Stop sliding if mouse over the slider.
        }, parameters);
        baseContainer = $(this);
        slidesContainer = baseContainer.children('ul');
        slides = slidesContainer.children('li');
        leftSlidingControl = $(params.leftControl);
        rightSlidingControl = $(params.rightControl);
        leftSlideIndex = 0;
        slidesLeftPos = {};

        // Positioning and sizing.
        baseContainer.addClass('gallerot-container');
        baseContainer.width(params.width != null ? params.width : baseContainer.parent().width());
        baseContainer.height(params.height != null ? params.height : baseContainer.parent().height());
        var slidesOverallWidth = 0;
        for (var i = 0; i < slides.length; i++) {
            var slideWidth = $(slides[i]).width();
            slidesLeftPos[i] = slidesOverallWidth;
            slidesOverallWidth += slideWidth;
        }
        slidesContainer.width(slidesOverallWidth);
        // CSS3 animation.
        var slidingSpeed = (params.slidingSpeed / 1000) + 's';
        slidesContainer.css(crossCssRule('transition', ('left ' + slidingSpeed + ' ease 0s')));

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

    var slideLeft = function () {
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
        stopAutoSliding();
        curAutoSlidingTimer = setTimeout(function() {
            slideRight();
            startAutoSliding();
        }, params.autoSlidingDelay);
    };

    var stopAutoSliding = function() {
        clearTimeout(curAutoSlidingTimer);
    };

    var moveSlidesContainerTo = function(slideIndex) {
        leftSlideIndex = slideIndex;
        slidesContainer.css({left: -slidesLeftPos[slideIndex]});
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