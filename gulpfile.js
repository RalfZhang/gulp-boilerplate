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
var pathFiles= {
    html: path+'*.html',
    less: path+'src/*.less',
    scss: path+'src/*.scss',
    js: path+'src/*.js',
    start: path+'index.html'
}
var pathDistFiles = {
    html: path+'dist',
    less: path+'dist',
    scss: path+'dist',
    js: path+'dist',
}

// 静态服务器
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: pathFiles.start
    });
    gulp.watch(pathFiles.less, ['less']);
    gulp.watch(pathFiles.scss, ['scss']);
    gulp.watch(pathFiles.js, ['js']);
    gulp.watch(pathFiles.html, ['html']);
})


gulp.task('html', function () {
    return gulp.src(pathFiles.html)
        .pipe(reload({ stream: true }))
})

gulp.task('less', function () {
    return gulp.src(pathFiles.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [ new LessAutoprefix({ 
                browsers: autoprefixConfig 
            })]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathDistFiles.less))
        .pipe(reload({ stream: true }))
})

gulp.task('scss', function () {
    return gulp.src(pathFiles.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: autoprefixConfig
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathDistFiles.scss))
        .pipe(reload({ stream: true }))
})


gulp.task('js', function () {
    console.log('js-----doing---------')
    return gulp.src(pathFiles.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pathDistFiles.js))
        .pipe(reload({ stream: true }))
})

gulp.task('default', ['browser-sync'])
