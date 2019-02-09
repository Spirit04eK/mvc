//установка нового: заходим в директорию и npm install
//Сборка проекта: gulp production
//Запуск gulp'а: gulp watch
'use strict';
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

//Browser sync
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'production'
        },
        notify: false
    });
});

//Assembly of pictures
gulp.task('compress', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('production/img/'))
});



//compile and assembly stylus
gulp.task('compile_stylus', function() {
    gulp.src('src/css/main.styl')

        .pipe( stylus() )
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { //Добавление префиксов
            cascade: true
        }))
        .pipe(cssnano())
        .pipe( gulp.dest('production/css/') );
});

//compile and assembly twig
gulp.task('compile_twig', function () {
    var twig = require('gulp-twig');
    return gulp.src('src/html/index.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest('production/'));
});

//Assembly js lib file
gulp.task('compile_lib_js', function () {
    gulp.src('src/js/lib/*')
        .pipe( gulp.dest('production/js/') );
});

//Assembly my js file
gulp.task('compile_js', function () {
    gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe( gulp.dest('production/js/') )
});

//function watch
var watch = ['browser-sync', 'compile_stylus', 'compile_twig','compile_lib_js', 'compile_js', 'compress'];
//Main function watch change file
gulp.task('watch', watch, function() {
    gulp.watch('src/css/**/*.styl', ['compile_stylus'], browserSync.reload);
    gulp.watch('src/html/**/*.twig', ['compile_twig'], browserSync.reload);
    gulp.watch('src/js/**/*.js', ['compile_js'], browserSync.reload);
    gulp.watch('src/js/lib/*', ['compile_lib_js'], browserSync.reload);
    gulp.watch('src/img/*', ['compress'], browserSync.reload);
});

//Assembly project
var complete = ['compile_stylus', 'compile_twig', 'compile_js','compile_lib_js', 'compress' ];
gulp.task('production', complete, function () {

});



