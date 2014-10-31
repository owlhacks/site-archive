// Main Module
(function() {
    $(function() {
        if ('onhashchange' in window) {
            $(window).bind('hashchange', function(e) {
                console.log('hashchange', e);
            });
        }
    });
})();