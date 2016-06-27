'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plugins = require('gulp-load-plugins')();

gulp.task('lint', function() {
    return gulp.src([
            './src/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('uglify', function() {
    return gulp.src([
            './src/*.js',
        ])
        .pipe(plugins.plumber({
            errorHandler: handleError
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('openseadragon-justified-collection.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('no-uglify', function() {
    return gulp.src([
            './src/*.js',
        ])
        .pipe(plugins.plumber({
            errorHandler: handleError
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('openseadragon-justified-collection.js'))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', ['lint','uglify','no-uglify'], function () {
    gulp.watch('./src/*.js', ['lint','uglify','no-uglify']);
});

gulp.task('serve', plugins.serve({
    root: ['dist', 'images'],
    port: 4040,
}));

gulp.task('default', ['watch', 'serve']);

/**
 * Displays error message in the console
 * @param error
 */
function handleError(error) {
    plugins.util.beep();
    plugins.util.log(plugins.util.colors.red(error));
}
