var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps');

var less = require('gulp-less');
var path = require('path');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

var sass = require('gulp-sass');


var babel = require('gulp-babel');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// 静态服务器
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/*.less', ['less']);
    gulp.watch('src/*.scss', ['scss']);
    gulp.watch('src/*.js', ['js']);
    gulp.watch('index.html', ['html']);
})


gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(reload({ stream: true }))
})

gulp.task('less', function () {
    return gulp.src('src/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
})

gulp.task('scss', function () {
    return gulp.src('src/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
})


gulp.task('js', function () {
    console.log('js-----doing---------')
    return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
})

gulp.task('default', ['browser-sync'])
