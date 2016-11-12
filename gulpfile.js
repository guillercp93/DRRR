'use strict';

var gulp = require("gulp"),
    stylus = require("gulp-stylus");

gulp.task("compress", function() {
    return gulp.src('./public/css/*.styl')
            .pipe(stylus({
                compress: true
            }))
            .pipe(gulp.dest('./public/css'));
});

gulp.task("watch:compress", function() {
    gulp.watch('**/*.styl', ['compress']);
});

gulp.task('default', ['compress', 'watch:compress']);