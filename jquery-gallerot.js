(function($) {
    var params;
    var baseContainer;
    var slidesContainer;
    var slides;
    var leftSlideIndex;

    $.fn.gallerot = function(parameters) {
        // Initialization
        params = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            slidingSpeed: 500,
            enableAutoSliding: false,
            autoSlidingDelay: 4000
        }, parameters);
        baseContainer = $(this);
        slidesContainer = $(baseContainer).find('ul');
        slides = $(slidesContainer).find('li');
        leftSlideIndex = 0;

        // Positioning and sizing
        var baseContainerWidth = params.width != null ? params.width : $(baseContainer).parent().innerWidth();
        var baseContainerHeight = params.height != null ? params.height : $(baseContainer).parent().innerHeight();
        $(baseContainer).css({
            position: 'relative',
            width: (baseContainerWidth + 'px'),
            height: (baseContainerHeight + 'px'),
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
            width: (slidesOverallWidth + 'px'),
            listStyle: 'none',
            margin: 0,
            padding: 0,
            border: 'none',
            left: 0,
            top: 0
        });

        // Action listeners
        $(params.leftControl).bind('click', slideLeft);
        $(params.rightControl).bind('click', slideRight);

        if (params.enableAutoSliding) {
            // TODO: Enable auto sliding using Timer.
        }
        return this;
    };

    var slideLeft = function() {
        if (leftSlideIndex > 0) {
            leftSlideIndex -= 1;
            var slidersContainerLeft = 0;
            $(slides).each(function(i, slide) {
                if (i < leftSlideIndex) {
                    slidersContainerLeft += $(slide).width();
                }
            });
            moveSlidersContainer(slidersContainerLeft);
        }
    };

    var slideRight = function() {
        if (leftSlideIndex < (slides.length - 1)) {
            leftSlideIndex += 1;
            var slidersContainerLeft = 0;
            $(slides).each(function(i, listItem) {
                if (i < leftSlideIndex) {
                    slidersContainerLeft += $(listItem).width();
                }
            });
            moveSlidersContainer(slidersContainerLeft);
        } else if (leftSlideIndex == (slides.length - 1)) {
            /*var l = $(slidesContainer).position().left;
            var l2 = l - 100;
            $(slidesContainer).animate({
                left: (l2 + 'px')
            }, params.slidingSpeed);
            $(slidesContainer).animate({
                left: ('0px')
            }, (params.slidingSpeed / slides.length));
            leftSlideIndex = 0;*/
        }
    };

    var moveSlidersContainer = function(left) {
        $(slidesContainer).animate({
            left: ('-' + left + 'px')
        }, params.slidingSpeed);
    };
})(jQuery);