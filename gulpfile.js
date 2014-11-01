var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    async = require('async'),
    exec = require('child_process').exec,
    git = require('gulp-git'),
    http = require('http');

var delay = function(fn, time) {
    return function() {
        setTimeout(fn, time);
    };
};

gulp.task('less', function() {
    // Builds the CSS
    gulp.src(['public/less/styles.less'])
        .pipe(less())
        .pipe(gulp.dest('public/dist'));

    gulp.src(['public/less/404.less'])
        .pipe(less())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('js', function() {
    // Builds the JS
    gulp.src(['public/js/*.js'])
        .pipe(concat('owlhacks.js'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('html-dev', function() {
    // Moves and Compresses HTML
    gulp.src(['public/pages/*.html'])
        .pipe(replace('</body>', '<script src="http://localhost:35729/livereload.js"></script></body>'))
        .pipe(gulp.dest('public/dist/pages'));
    gulp.src(['public/partials/*.html'])
        .pipe(gulp.dest('public/dist/partials'));
});

gulp.task('html', function() {
    // Moves and Compresses HTML
    gulp.src(['public/pages/*.html'])
        .pipe(gulp.dest('public/dist/pages'));
    gulp.src(['public/partials/*.html'])
        .pipe(gulp.dest('public/dist/partials'));
});

gulp.task('server-dev', function() {
    // Runs the server forever
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['public/*'],
        env: {
            PORT: '3000'
        }
    });
});

gulp.task('githook', function() {
    var app = express();

    app.use(bodyParser.text({
        'type': 'application/json'
    }));

    app.post('/githook', function(req, res) {
        xHubSig = req.headers['x-hub-signature'].substring(5);
        hmac = crypto.createHmac('sha1', 'thisissosecret');
        hmac.write(req.body);
        computedHubSig = hmac.digest('hex');
        if (computedHubSig === xHubSig) {
            console.log('\n\nNew changes available:\n');
            async.series([

                function(cb) {
                    console.log('Pulling down changes from github...');
                    git.pull('origin', 'master', {}, cb);
                },
                function(cb) {
                    console.log('Installing new node dependencies...');
                    exec('npm install', cb);
                },
                function(cb) {
                    console.log('Installing new bower dependencies...');
                    exec('bower install', cb);
                },
                function(cb) {
                    console.log('Packaging revised assets...');
                    gulp.start('package');
                    cb();
                },
                function(cb) {
                    console.log('Restarting the web server...');
                    exec('forever restartall', cb);
                }
            ], function(err) {
                if (err) {
                    res.status(500).send();
                    console.error(err);
                } else {
                    res.status(200).send();
                    console.log('\nNew changes integrated successfully.');
                }
            });
        } else {
            res.status(500).send();
            console.log('Digests don\'t match');
        }
    });

    http.createServer(app).listen(4000, '0.0.0.0')
});

gulp.task('watch', ['server-dev'], function() {
    livereload.listen();
    gulp.watch('public/js/*.js', ['js']).on('change', livereload.changed);
    gulp.watch('public/less/*.less', ['less']).on('change', delay(livereload.changed, 500));
    gulp.watch('public/pages/*.html', ['html-dev']).on('change', livereload.changed);
    gulp.watch('public/partials/*.html', ['html-dev']).on('change', livereload.changed);
});

gulp.task('package', ['html', 'js', 'less']);
gulp.task('deploy', ['package', 'githook']);
gulp.task('default', ['watch']);