/**
 * Created with JetBrains WebStorm.
 * User: yuguo
 * Date: 13-10-24
 * Time: 下午3:03
 * To change this template use File | Settings | File Templates.
 */

(function( $ ) {

    $.fn.bundleSlide = function( options ) {

        var settings, intFrameWidth, bundleNumber, element;

        settings = {
           bundleWidth: 192,
           time: 700
        };

        $.extend(settings, options);

        intFrameWidth = window.innerWidth;
        bundleNumber = Math.floor(intFrameWidth / settings.bundleWidth);

        element = this;

        element
            .css('position', 'relative')
            .wrapInner('<div class="bundleslide-controller" style="width:1000%"/>')
            .append('<a class="bundleslide-previous">Previous</a><a class="bundleslide-next">Next</a>');

        $('.bundleslide-controller', element).css({
            'position':'absolute',
            'left':'0'
        });

        $('.bundleslide-controller', element).children().each(function(i, that){
            var bundle = $(that).data('bundleWidth');
            console.log(bundle);
        });

        // next and previous
        $(".bundleslide-next", element).click(function(e) {
            e.preventDefault();
            $('.bundleslide-controller', element).animate({
                left: "-="+ bundleNumber * settings.bundleWidth
            }, settings.time, function() {
                // Animation complete.
            });
        });
        $(".bundleslide-previous", element).click(function(e) {
            e.preventDefault();
            $('.bundleslide-controller', element).animate({
                left: "+="+ bundleNumber * settings.bundleWidth
            }, settings.time, function() {
                // Animation complete.
            });
        });

        return this;

    };

}( jQuery ));
