var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
    // Builds the CSS
    gulp.src(['public/less/styles.less'])
        .pipe(less())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('js', function() {
    // Builds the JS
    gulp.src(['public/js/*.js'])
        .pipe(concat('main.js'))
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
            TUACM_DEV: 'true',
            LOGPATH: path.join(__dirname, 'logs'),
            MONGO_URL: 'mongodb://tuacm:tuacm@kahana.mongohq.com:10045/tuacm',
            SESSION_SECRET: 'thisIsSoSecretBro',
            PORT: '3000'
        }
    });
});

gulp.task('watch', ['server'], function() {
    livereload.listen();
    gulp.watch('public/js/*.js', ['js']).on('change', livereload.changed);
    gulp.watch('public/less/*.less', ['less']).on('change', livereload.changed);
    gulp.watch('public/pages/*.html', ['html-dev']).on('change', livereload.changed);
    gulp.watch('public/partials/*.html', ['html-dev']).on('change', livereload.changed);
});

gulp.task('package', ['html', 'js', 'less']);
gulp.task('default', ['watch']);