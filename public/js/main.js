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

    $(function() {
        if ('onhashchange' in window) {
            $(window).bind('hashchange', doHashNavigation);
        }
        setTimeout(doHashNavigation, 500);
    });
})();