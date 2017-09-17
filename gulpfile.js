'use strict';

var gulp = require("gulp"),
    prefix = require("gulp-autoprefixer"),
    stylus = require("gulp-stylus")

gulp.task("compress", function() {
    return gulp.src('./public/css/*.styl')
            .pipe(stylus({
                compress: true
            }))
            .pipe(gulp.dest('./public/css'));
});

gulp.task('prefix', function() {
    return gulp.src('./public/css/*.css')
            .pipe(prefix({ browsers: ['last 2 versions'] }))
            .pipe(gulp.dest('./public/css'));
});

gulp.task("watch", function() {
    gulp.watch('**/*.styl', ['compress']);
    gulp.watch('**/*.css', ['prefix']);
});

gulp.task('default', ['compress', 'watch'], function() {
    return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest("dist"));
});