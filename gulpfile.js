var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('css-watch', function (done) {
    browserSync.reload();
    done();
});
gulp.task('serve', ['js'], function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("js/*.js", ['js-watch']);
    gulp.watch('stylesheets/*.css',['css-watch']);
});
