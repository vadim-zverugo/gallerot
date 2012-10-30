(function($) {

    var listLength;
    var listCurrentItemIndex = 0;
    var container;

    $.fn.gallerot = function(params) {
        params = $.extend({
            width: null,
            height: null,
            leftControl : null,
            rightControl : null,
            animationSpeed: 500
        }, params);

        container = $(this);
        var containerParent = $(container).parent();
        var containerWidth = params.width != null ? params.width : containerParent.innerWidth();
        var containerHeight = params.height != null ? params.height : containerParent.innerHeight();
        $(container).css({
            position: 'relative',
            width: (containerWidth + 'px'),
            height: (containerHeight + 'px'),
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        });
        var list = $(container).find('ul li');
        listLength = list.length;
        var listWidth = 0;
        $(list).each(function() {
            listWidth += $(this).width();
        });
        $(container).find('ul').css({
            position: 'relative',
            width: (listWidth + 'px'),
            listStyle: 'none',
            margin: 0,
            padding: 0,
            left: 0
        });
        $(container).find('ul li').css({
            float: 'left',
            listStyle: 'none',
            margin: 0,
            padding: 0
        });

        $(params.leftControl).bind('click', function() {
            if (listCurrentItemIndex > 0) {
                listCurrentItemIndex -= 1;
                var listPositionLeft = 0;
                $(container).find('ul li').each(function(i, listItem) {
                    if (i < listCurrentItemIndex) {
                        listPositionLeft += $(listItem).width();
                    }
                });
                $(container).find('ul').animate({
                    left: ('-' + listPositionLeft + 'px')
                }, 400);
            }
        });

        $(params.rightControl).bind('click', function() {
            if (listCurrentItemIndex < (listLength - 1)) {
                listCurrentItemIndex += 1;
                var listPositionLeft = 0;
                $(container).find('ul li').each(function(i, listItem) {
                    if (i < listCurrentItemIndex) {
                        listPositionLeft += $(listItem).width();
                    }
                });
                $(container).find('ul').animate({
                    left: ('-' + listPositionLeft + 'px')
                }, 400);
            } else if (listCurrentItemIndex == (listLength - 1)) {
                var l = $(container).find('ul').position().left;
                var l2 = l - 100;
                $(container).find('ul').animate({
                    left: (l2 + 'px')
                }, 400);
                $(container).find('ul').animate({
                    left: ('0px')
                }, 200);
                listCurrentItemIndex = 0;
            }
        });
    }
})(jQuery);

/*
function initFeaturedPractitionersControl(container, practitionerBoxMinSideMargin, animationSpeed) {
    var jContainer = jQuery(container);
    var sliderContentWidth = jContainer.width() - jQuery(".left_slider_control").width() - jQuery(".right_slider_control").width();
    jContainer.find(".slider_content").width(sliderContentWidth);
    var practitionerBoxes = jContainer.find(".practitioner");
    if (practitionerBoxes.length > 0) {
        var practitionerBoxWidth = jQuery(practitionerBoxes[0]).width();
        var numberOfBoxesToShow = Math.floor(sliderContentWidth / (practitionerBoxWidth + (2 * practitionerBoxMinSideMargin)));
        var practitionerBoxSideMargin;
        if (numberOfBoxesToShow >= practitionerBoxes.length) {
            hideLeftSliderControl(container);
            hideRightSliderControl(container);
            practitionerBoxSideMargin = Math.floor((sliderContentWidth - (practitionerBoxes.length * practitionerBoxWidth)) / practitionerBoxes.length / 2);
        } else {
            practitionerBoxSideMargin = Math.floor((sliderContentWidth - (numberOfBoxesToShow * practitionerBoxWidth)) / numberOfBoxesToShow / 2);
        }

        var practitionerBoxWidthWithSideMargin = practitionerBoxWidth + (2 * practitionerBoxSideMargin);
        jQuery(practitionerBoxes).each(function (index, practitionerBox) {
            jQuery(practitionerBox).css({
                marginLeft:(practitionerBoxSideMargin + 'px'),
                marginRight:(practitionerBoxSideMargin + 'px'),
                left:((index * practitionerBoxWidthWithSideMargin) + 'px')
            });
        });
        controlSliderLimits(container);

        jContainer.find(".left_slider_control").click(function () {
            jQuery(this).hide();
            var leftSliderControl = this;
            jContainer.find(".practitioner").each(function (index, practitionerBox) {
                var currentPosition = jQuery(practitionerBox).position().left;
                jQuery(practitionerBox).stop().animate({
                    left:((currentPosition + practitionerBoxWidthWithSideMargin) + 'px')
                }, animationSpeed, function () {
                    jQuery(leftSliderControl).show();
                    controlSliderLimits(container);
                });
            });
        });

        jContainer.find(".right_slider_control").click(function () {
            jQuery(this).hide();
            var rightSliderControl = this;
            jContainer.find(".practitioner").each(function (index, practitionerBox) {
                var currentPosition = jQuery(practitionerBox).position().left;
                jQuery(practitionerBox).stop().animate({
                    left:((currentPosition - practitionerBoxWidthWithSideMargin) + 'px')
                }, animationSpeed, function () {
                    jQuery(rightSliderControl).show();
                    controlSliderLimits(container);
                });
            });
        });

        if (jQuery.fn.swipe) {
            jContainer.swipe({
                swipe:function (event, direction, distance, duration, fingerCount) {
                    if (direction === 'left' && jContainer.find(".right_slider_control").is(":visible")) {
                        jContainer.find(".right_slider_control").click();
                    } else if (direction === 'right' && jContainer.find(".left_slider_control").is(":visible")) {
                        jContainer.find(".left_slider_control").click();
                    }
                }
            })
        }
    }
}

function controlSliderLimits(container) {
    var practitionerBoxes = jQuery(container).find(".practitioner");
    var firstPractitionerBox = practitionerBoxes[0];
    var lastPractitionerBox = practitionerBoxes[practitionerBoxes.length - 1];
    if (jQuery(firstPractitionerBox).position().left >= 0) {
        hideLeftSliderControl(container);
    } else {
        showLeftSliderControl(container);
    }
    if (jQuery(lastPractitionerBox).position().left < jQuery(container).find(".slider_content").width()) {
        hideRightSliderControl(container);
    } else {
        showRightSliderControl(container);
    }
}

function showLeftSliderControl(container) {
    jQuery(container).find(".left_slider_control").show();
}

function hideLeftSliderControl(container) {
    jQuery(container).find(".left_slider_control").hide();
}

function showRightSliderControl(container) {
    jQuery(container).find(".right_slider_control").show();
}

function hideRightSliderControl(container) {
    jQuery(container).find(".right_slider_control").hide();
}
*/