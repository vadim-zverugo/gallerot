(function($) {
    $.fn.gallerot = function(params) {

    }
})(jQuery);


function initFeaturedPractitionersControl(container, practitionerBoxMinSideMargin, animationSpeed) {
    var sliderContentWidth = jQuery(container).width() - jQuery(".left_slider_control").width() - jQuery(".right_slider_control").width();
    jQuery(container).find(".slider_content").width(sliderContentWidth);
    var practitionerBoxes = jQuery(container).find(".practitioner");
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
        jQuery(practitionerBoxes).each(function(index, practitionerBox) {
            jQuery(practitionerBox).css({
                marginLeft: (practitionerBoxSideMargin + 'px'),
                marginRight: (practitionerBoxSideMargin + 'px'),
                left: ((index * practitionerBoxWidthWithSideMargin) + 'px')
            });
        });
        controlSliderLimits(container);

        jQuery(container).find(".left_slider_control").click(function() {
            jQuery(this).hide();
            var leftSliderControl = this;
            jQuery(container).find(".practitioner").each(function(index, practitionerBox) {
                var currentPosition = jQuery(practitionerBox).position().left;
                jQuery(practitionerBox).stop().animate({
                    left: ((currentPosition + practitionerBoxWidthWithSideMargin) + 'px')
                }, animationSpeed, function() {
                    jQuery(leftSliderControl).show();
                    controlSliderLimits(container);
                });
            });
        });

        jQuery(container).find(".right_slider_control").click(function() {
            jQuery(this).hide();
            var rightSliderControl = this;
            jQuery(container).find(".practitioner").each(function(index, practitionerBox) {
                var currentPosition = jQuery(practitionerBox).position().left;
                jQuery(practitionerBox).stop().animate({
                    left: ((currentPosition - practitionerBoxWidthWithSideMargin) + 'px')
                }, animationSpeed, function() {
                    jQuery(rightSliderControl).show();
                    controlSliderLimits(container);
                });
            });
        });
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