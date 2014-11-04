// Main Module
(function() {
    var SECTION_HREF_REGEX = /\#\/(\w+)/;
    var $body = $('html, body'),
        images = [
            '/img/bg.jpg',
            '/img/owl.png',
            '/img/about-build.png',
            '/img/about-collaborate.png',
            '/img/about-learn.png',
            '/img/paleylibrary.jpg',
            '/img/conwell.jpg',
            '/img/icon-tudev.png',
        ];

    function slideTo(scrollTop) {
        $body.animate({
            scrollTop: scrollTop,
        }, 1000, 'easeInOutExpo');
    }

    function doHashNavigation() {
        var match, section, hash = window.location.hash;
        if (match = hash.match(SECTION_HREF_REGEX)) {
            section = $('section#' + match[1]).get(0);
            if (section) {
                slideTo($(section).offset().top);
            }
        }
    }

    function waitForImages() {
        var i,
            img,
            loadedImages = 0,
            $progress = $('progress-bar bar'),
            loadingTimedOut = false,
            callback = function() {
                if (loadingTimedOut) return;

                ++loadedImages;
                $progress.css('width', (200 * loadedImages / images.length) + 'px');
                if (loadedImages >= images.length) {
                    setTimeout(function() {
                        $body.removeClass('loading');
                    }, 500);
                }
            };

        for (i = 0; i < images.length; i++) {
            img = new Image();
            img.onload = callback;
            img.src = images[i];
        }

        // Institute a 8 second max wait time
        setTimeout(function() {
            loadingTimedOut = true;
            $progress.css('width', '200px');
            setTimeout(function() {
                $body.removeClass('loading');
            }, 500);
        }, 8000);
    }

    $(function() {
        if ('onhashchange' in window) {
            $(window).bind('hashchange', doHashNavigation);
        }
        waitForImages();

        if (!Modernizr.flexbox) {
            $('section#about .cutoff').addClass('shimmed');
        }
    });
})();