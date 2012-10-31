(function($) {

    var baseContainer;
    var leftSlideIndex = 0;

    $.fn.gallerot = function(params) {
        params = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            slidingSpeed: 500,
            enableAutoSliding: false,
            autoSlidingDelay: 4000
        }, params);

        baseContainer = $(this);
        var baseContainerParent = $(baseContainer).parent();
        var baseContainerWidth = params.width != null ? params.width : baseContainerParent.innerWidth();
        var baseContainerHeight = params.height != null ? params.height : baseContainerParent.innerHeight();
        $(baseContainer).css({
            position: 'relative',
            width: (baseContainerWidth + 'px'),
            height: (baseContainerHeight + 'px'),
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        });

        var slidesOverallWidth = 0;
        $(baseContainer).find('ul li').each(function() {
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

        $(params.leftControl).bind('click', function() {
            if (leftSlideIndex > 0) {
                leftSlideIndex -= 1;
                var listPositionLeft = 0;
                $(baseContainer).find('ul li').each(function(i, listItem) {
                    if (i < leftSlideIndex) {
                        listPositionLeft += $(listItem).width();
                    }
                });
                $(baseContainer).find('ul').animate({
                    left: ('-' + listPositionLeft + 'px')
                }, 400);
            }
        });

        $(params.rightControl).bind('click', function() {
            if (leftSlideIndex < ($(baseContainer).find('ul li').length - 1)) {
                leftSlideIndex += 1;
                var listPositionLeft = 0;
                $(baseContainer).find('ul li').each(function(i, listItem) {
                    if (i < leftSlideIndex) {
                        listPositionLeft += $(listItem).width();
                    }
                });
                $(baseContainer).find('ul').animate({
                    left: ('-' + listPositionLeft + 'px')
                }, 400);
            } else if (leftSlideIndex == ($(baseContainer).find('ul li').length - 1)) {
                var l = $(baseContainer).find('ul').position().left;
                var l2 = l - 100;
                $(baseContainer).find('ul').animate({
                    left: (l2 + 'px')
                }, 400);
                $(baseContainer).find('ul').animate({
                    left: ('0px')
                }, 200);
                leftSlideIndex = 0;
            }
        });
    }
})(jQuery);