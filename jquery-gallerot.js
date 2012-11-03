(function($) {
    var params;
    var baseContainer;
    var slidesContainer;
    var slides;
    var leftSlideIndex;
    var autoSlidingTimers;

    $.fn.gallerot = function(parameters) {
        // Initialization
        params = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            slidingSpeed: 500,
            enableAutoSliding: false,
            autoSlidingDelay: 5000,
            stopAutoSlidingOnHover: true,
            autoSlidingDirection: 'right' // left or right
        }, parameters);
        baseContainer = $(this);
        slidesContainer = $(baseContainer).find('ul');
        slides = $(slidesContainer).find('li');
        leftSlideIndex = 0;
        autoSlidingTimers = [];

        // Positioning and sizing
        var baseContainerWidth = params.width != null ? params.width : $(baseContainer).parent().width();
        var baseContainerHeight = params.height != null ? params.height : $(baseContainer).parent().height();
        $(baseContainer).css({
            position: 'relative',
            width: baseContainerWidth,
            height: baseContainerHeight,
            margin: 0,
            padding: 0,
            border: 'none',
            overflow: 'hidden'
        });
        var slidesOverallWidth = 0;
        $(slides).each(function() {
            slidesOverallWidth += $(this).width();
            $(this).css({
                float: 'left',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                border: 'none'
            });
        });
        $(slidesContainer).css({
            position: 'relative',
            width: slidesOverallWidth,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            border: 'none'
        });

        // Action listeners
        $(params.leftControl).bind('click', slideLeft);
        $(params.rightControl).bind('click', slideRight);

        // Auto sliding
        if (params.enableAutoSliding) {
            startAutoSliding();
            if (params.stopAutoSlidingOnHover) {
                $(baseContainer).hover(stopAutoSliding, startAutoSliding);
            }
            $(params.leftControl).hover(stopAutoSliding, startAutoSliding);
            $(params.rightControl).hover(stopAutoSliding, startAutoSliding);
        }

        return this;
    };

    var slideLeft = function() {
        if (leftSlideIndex > 0) {
            leftSlideIndex -= 1;
            moveSlidesContainerTo(leftSlideIndex);
        } else if (leftSlideIndex == 0) {
            var slidesContainerLeft = $(slidesContainer).position().left;
            var slidesContainerShiftLeft = slidesContainerLeft + ($(slides).first().width() / 2);
            moveSlidesContainerOn(slidesContainerShiftLeft);
            leftSlideIndex = slides.length - 1;
            moveSlidesContainerTo(leftSlideIndex, (params.slidingSpeed / 2));
        }
    };

    var slideRight = function() {
        if (leftSlideIndex < (slides.length - 1)) {
            leftSlideIndex += 1;
            moveSlidesContainerTo(leftSlideIndex);
        } else if (leftSlideIndex == (slides.length - 1)) {
            var slidesContainerLeft = $(slidesContainer).position().left;
            var slidesContainerShiftLeft = slidesContainerLeft - ($(slides).last().width() / 2);
            moveSlidesContainerOn(slidesContainerShiftLeft);
            leftSlideIndex = 0;
            moveSlidesContainerTo(leftSlideIndex, params.slidingSpeed / 2);
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

    var moveSlidesContainerOn = function(leftPos, speed) {
        if (speed === undefined) {
            speed = params.slidingSpeed;
        }
        $(slidesContainer).animate({left: leftPos}, speed);
    };

    var moveSlidesContainerTo = function(slideIndex, speed) {
        if (speed === undefined) {
            speed = params.slidingSpeed;
        }
        var slidersContainerLeft = 0;
        $(slides).each(function(i, slide) {
            if (i < slideIndex) {
                slidersContainerLeft += $(slide).width();
            }
        });
        $(slidesContainer).animate({left: -slidersContainerLeft}, speed);
    };
})(jQuery);