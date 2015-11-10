'use strict';

const gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    connectLiveReload = require('connect-livereload'),
    express = require('express'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    gutil = require('gutil'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish');

gulp.task('default', ['build']);

gulp.task('build', ['scripts', 'scripts:hint', 'scripts:polyfill', 'html']);

//gulp.task('scripts', () => {
//    return gulp.src('app/js/**/*.js')
//        .pipe(babel({
//            presets: ['es2015']
//        }))
//        .pipe(gulp.dest('dist/js'))
//        .pipe(livereload());
//});

gulp.task('scripts', () => {
    let b = browserify({
        entries: ['app/js/index.js'],
        cache: {},
        packageCache: {},
        debug: true
    });
    b.transform(babelify, {presets: ['es2015']});
    b.on('error', gutil.log);
    b.on('time', gutil.log);

    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('scripts:hint', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('scripts:polyfill', () => {
    return gulp.src(require.resolve('babel-polyfill/dist/polyfill.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('clean', () => {
    del(['dist'], cb);
});

gulp.task('watch', ['build', 'serve'], () => {
    livereload.listen();

    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/js/**/*.js', ['scripts', 'scripts:hint']);
});

gulp.task('serve', () => {
    express()
        .use(connectLiveReload())
        .use(express.static('dist'))
        .listen(4000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:4000');
        });
});
