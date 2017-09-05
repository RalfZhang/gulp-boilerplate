var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps');

var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var LessAutoprefix = require('less-plugin-autoprefix');

var sass = require('gulp-sass');


var babel = require('gulp-babel');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var autoprefixConfig= ['last 2 version', 'ie 8', 'ie 9'];
var path = './'

// 静态服务器
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: path+'index.html'
    });
    gulp.watch('src/*.less', ['less']);
    gulp.watch('src/*.scss', ['scss']);
    gulp.watch('src/*.js', ['js']);
    gulp.watch('index.html', ['html']);
})


gulp.task('html', function () {
    return gulp.src(path+'index.html')
        .pipe(reload({ stream: true }))
})

gulp.task('less', function () {
    return gulp.src(path+'src/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [ new LessAutoprefix({ 
                browsers: autoprefixConfig 
            })]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
})

gulp.task('scss', function () {
    return gulp.src(path+'src/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: autoprefixConfig
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
})


gulp.task('js', function () {
    console.log('js-----doing---------')
    return gulp.src(path+'src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
})

gulp.task('default', ['browser-sync'])
