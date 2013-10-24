/**
 * User: yuguo
 * Date: 13-10-24
 * Time: 3:03 pm
 * https://github.com/yuguo/sugarslide/
 */

(function( $ ) {

    $.fn.sugarSlide = function( options ) {

        var settings, intFrameWidth, element, widthArray, widthTemp, currentPage;

        settings = {
            time: 1000,
            prevClass: 'sugarslide-previous',
            nextClass: 'sugarslide-next'
        };

        $.extend(settings, options);

        intFrameWidth = window.innerWidth;

        element = this;

        element
            .css('position', 'relative')
            .wrapInner('<div class="sugarslide-controller" style="width:1000%"/>')
            .after('<a class="'+settings.prevClass+'">Previous</a> <a class="'+settings.nextClass+'">Next</a>');

        $('.sugarslide-controller', element).css({
            'position':'absolute',
            'left':'0'
        });

        widthTemp = 0;
        widthArray = [];
        $('.sugarslide-controller', element).children().each(function(i, that){
            var childElement = $(that);
            var thisWidth = childElement.outerWidth() + parseInt(childElement.css('marginRight')) + parseInt(childElement.css('marginLeft'));
            if(intFrameWidth >= thisWidth){
                if(intFrameWidth - widthTemp >  thisWidth){
                    widthTemp += thisWidth;
                }else{
                    widthArray.push(widthTemp);
                    widthTemp = thisWidth;
                }
            }else{
                if(widthTemp != 0){
                    widthArray.push(widthTemp);
                }
                widthArray.push(thisWidth);
                widthTemp = 0;
            }

            if(i == $('.sugarslide-controller', element).children().length - 1){
                widthArray.push(widthTemp);
            }
        });

        console.log(widthArray);

        // next and previous
        currentPage = 0;
        $('.'+settings.nextClass).click(function(e) {
            e.preventDefault();
            if(currentPage < widthArray.length - 1){
                $('.sugarslide-controller', element).animate({
                    left: "-="+ widthArray[currentPage]
                }, settings.time, function() {
                });
                currentPage += 1;
            }else{
                $('.sugarslide-controller', element).animate({
                    left: 0
                }, settings.time, function() {
                });
                currentPage = 0;
            }
        });
        $('.'+settings.prevClass).click(function(e) {
            e.preventDefault();
            if(currentPage > 0){
                $('.sugarslide-controller', element).animate({
                    left: "+="+ widthArray[currentPage - 1]
                }, settings.time, function() {
                });
                currentPage -= 1;
            }else{
                $('.sugarslide-controller', element).animate({
                    left: "+="+ widthArray[currentPage - 1]
                }, settings.time, function() {
                });
                currentPage -= 1;
            }
        });

        return this;

    };

}( jQuery ));
