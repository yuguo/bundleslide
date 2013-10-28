/**
 * User: yuguo
 * Date: 13-10-24
 * Time: 3:03 pm
 * https://github.com/yuguo/sugarslide/
 */

(function( $ ) {

    $.fn.sugarSlide = function( options ) {

        var settings, intFrameWidth, element, widthArray, widthTemp, currentPage, slideToNextPage, slideToPreviousPage, slideToFirstPage, startAutoSlide, isAutoSlide;

        settings = {
            time: 1000,
            autoSlideTime: 5000,
            prevClass: 'sugarslide-previous',
            nextClass: 'sugarslide-next',
            disabledClass: 'disabled'
        };

        $.extend(settings, options);

        intFrameWidth = window.innerWidth;

        element = this;

        element
            .css('position', 'relative')
            .wrapInner('<div class="sugarslide-controller" style="width:1000%"/>')
            .mouseover(function(){isAutoSlide = false})
            .mouseout(function(){isAutoSlide = true});

        $('.sugarslide-controller', element).css({
            'position':'absolute',
            'left':'0'
        });

        // calculate the width array
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
                var j = widthArray.length - 1;
                widthArray[j] = widthArray[j] + widthTemp - intFrameWidth
            }
        });

        console.log(widthArray);

        // next and previous
        currentPage = 0;

        element.after('<a class="'+settings.prevClass+ ' ' + settings.disabledClass +'"><span>Previous</span></a> <a class="'+settings.nextClass+'"><span>Next</span></a>');
        $('.'+settings.nextClass).click(function(e) {
            e.preventDefault();
            if(currentPage < widthArray.length - 1){
                slideToNextPage();
            }else{
                slideToFirstPage();
            }
        });

        $('.'+settings.prevClass).click(function(e) {
            e.preventDefault();
            if(currentPage > 0){
                slideToPreviousPage();
            }else{
                //do nothing
            }
        });

        slideToNextPage = function(){
            $('.sugarslide-controller', element).animate({
                left: "-="+ widthArray[currentPage]
            }, settings.time, function() {

            });
            currentPage += 1;
            $('.'+settings.prevClass).removeClass(settings.disabledClass);
        };

        slideToPreviousPage = function(){
            $('.sugarslide-controller', element).animate({
                left: "+="+ widthArray[currentPage - 1]
            }, settings.time, function() {
            });
            currentPage -= 1;
            if(currentPage == 0){
                $(this).addClass(settings.disabledClass);
            }
        };

        slideToFirstPage = function(){
            $('.sugarslide-controller', element).animate({
                left: 0
            }, settings.time, function() {
            });
            currentPage = 0;
            $('.'+settings.prevClass).addClass(settings.disabledClass);
        };

        isAutoSlide = true;
        startAutoSlide = function(){
            window.setTimeout(startAutoSlide, settings.autoSlideTime);
            if(isAutoSlide){
                if(currentPage < widthArray.length){
                    slideToNextPage();
                }else{
                    slideToFirstPage();
                }
            }

        };

        startAutoSlide();

        return this;

    };

}( jQuery ));
