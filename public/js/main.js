// Main Module
(function() {
    var SECTION_HREF_REGEX = /\#\/(\w+)/;
    var $body = $('html, body');

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

    function doIntroAnimation() {
        setTimeout(function() {
            $('#splash .stars').removeClass('concealed');
        }, 0);
        setTimeout(function() {
            $('#splash .clouds').removeClass('concealed');
        }, 250);
        setTimeout(function() {
            $('#splash .info').removeClass('concealed');
        }, 500);
        setTimeout(function() {
            $('#splash .learn-more').removeClass('concealed');
        }, 1000);
    }

    $(function() {
        if ('onhashchange' in window) {
            $(window).bind('hashchange', doHashNavigation);
        }

        if (!Modernizr.flexbox) {
            $('section#about .cutoff').addClass('shimmed');
        }

        // Start the intro animation
        doIntroAnimation();
    });
})();
