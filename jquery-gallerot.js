(function($) {

    var localParams;
    var baseContainer;
    var slides;
    var leftSlideIndex = 0;

    $.fn.gallerot = function(params) {
        localParams = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            slidingSpeed: 500,
            enableAutoSliding: false,
            autoSlidingDelay: 4000
        }, params);

        /* Positioning and sizing
        --------------------------------------------------------------------------------------------------------------*/
        baseContainer = $(this);
        var baseContainerParent = $(baseContainer).parent();
        var baseContainerWidth = localParams.width != null ? localParams.width : baseContainerParent.innerWidth();
        var baseContainerHeight = localParams.height != null ? localParams.height : baseContainerParent.innerHeight();
        $(baseContainer).css({
            position: 'relative',
            width: (baseContainerWidth + 'px'),
            height: (baseContainerHeight + 'px'),
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        });

        slides = $(baseContainer).find('ul li');
        var slidesOverallWidth = 0;
        $(slides).each(function() {
            slidesOverallWidth += $(this).width();
            $(this).css({
                float: 'left',
                listStyle: 'none',
                margin: 0,
                padding: 0
            });
        });
        $(baseContainer).find('ul').css({
            position: 'relative',
            width: (slidesOverallWidth + 'px'),
            listStyle: 'none',
            margin: 0,
            padding: 0,
            left: 0
        });

        /* Action listeners
        --------------------------------------------------------------------------------------------------------------*/
        $(localParams.leftControl).bind('click', function() {
            if (leftSlideIndex > 0) {
                leftSlideIndex -= 1;
                var listPositionLeft = 0;
                $(slides).each(function(i, listItem) {
                    if (i < leftSlideIndex) {
                        listPositionLeft += $(listItem).width();
                    }
                });
                $(baseContainer).find('ul').animate({
                    left: ('-' + listPositionLeft + 'px')
                }, localParams.slidingSpeed);
            }
        });

        $(localParams.rightControl).bind('click', function() {
            if (leftSlideIndex < (slides.length - 1)) {
                leftSlideIndex += 1;
                var listPositionLeft = 0;
                $(baseContainer).find('ul li').each(function(i, listItem) {
                    if (i < leftSlideIndex) {
                        listPositionLeft += $(listItem).width();
                    }
                });
                $(baseContainer).find('ul').animate({
                    left: ('-' + listPositionLeft + 'px')
                }, localParams.slidingSpeed);
            } else if (leftSlideIndex == (slides.length - 1)) {
                var l = $(baseContainer).find('ul').position().left;
                var l2 = l - 100;
                $(baseContainer).find('ul').animate({
                    left: (l2 + 'px')
                }, localParams.slidingSpeed);
                $(baseContainer).find('ul').animate({
                    left: ('0px')
                }, (localParams.slidingSpeed / slides.length));
                leftSlideIndex = 0;
            }
        });
        return this;
    }

    var slideLeft = function() {

    }

    var slideRight = function() {

    }
})(jQuery);