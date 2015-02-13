//Conduct Module
(function() {
    var SECTION_HREF_REGEX = /\#\/(\w+)/;

    function makeConductBackground() {
        var $conduct = $('section#conduct'),
            conductWidth = $conduct.width(),
            conductHeight = $conduct.height(),
            trianglifier = new Trianglify({
                x_gradient: ['#3b7d95', '#346e83', '#2d5471']
            }),
            pattern = trianglifier.generate(
                conductWidth,
                conductHeight
            );
        // Set the background of the div
        $conduct.css('backgroundImage', pattern.dataUrl);
    }
        
  makeConductBackground();
})();
