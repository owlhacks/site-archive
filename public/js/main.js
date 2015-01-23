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

    function hookUpLearnMoreScrolling() {
        $('.learn-more').click(function() {
            slideTo($('section#about').offset().top);
        });
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
        }, 750);
        setTimeout(function() {
            $('#splash .learn-more').removeClass('concealed');
        }, 1250);
    }

    function setupGoogleMap() {
        function initialize() {
            var center = {
                lat: 39.981454,
                lng: -75.153335
            };

            var mapOptions = {
                center: center,
                zoom: 16,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                disableDefaultUI: true,
                draggable: false
            };
            var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
            // Make sure the map stays centered
            google.maps.event.addDomListener(window, 'resize', function() {
                map.setCenter(center);
            });
            // To add the marker to the map, use the 'map' property
            var marker = new google.maps.Marker({
                position: {
                    lat: 39.981454,
                    lng: -75.153335
                },
                map: map,
                title: 'Hello World!'
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
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
        // Get the map up
        setupGoogleMap();
        // Make the learn more button scroll
        hookUpLearnMoreScrolling();
    });
})();
