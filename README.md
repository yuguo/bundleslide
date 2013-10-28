Sugar Slide
===========

Sugar Slide can slide with flexible width. [Demo](http://yuguo.us/demo/sugar-slide/).

## Start

Sugar Slide is very easy to start, suppose we have this html:

```html
<div id="slide">
    <a>
        <!-- anything you like -->
    </a>
    <a>
        <!-- anything you like -->
    </a>
    <a>
        <!-- anything you like -->
    </a>
</div>
```

Then you can simply add the flowing code:

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="jquery.sugarslide.js"></script>
<script type="text/javascript">
    $('#slide').sugarSlide();
</script>
```

Done.

## Options

```javascript
$('#slide').sugarSlide({
    time:700,
    prevClass:'prev',
    nextClass:'next',
    disabledClass:'disabled',
    autoSlideTime: 5000
});
```

`time` is the slide time, default value is 1000(ms).

`prevClass` is the previous link's class name, default value is `'sugarslide-previous'`.

`nextClass` is the next link's class name, default value is `'sugarslide-next'`.

`disabled` is the previous link's class when it's the first slide.

`autoSlideTime` is the gap time of every auto slide, default value is 5000(ms).
