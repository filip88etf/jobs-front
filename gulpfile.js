'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

const sassfiles = ['**/*.scss', '!./node_modules/**'];

gulp.task('build',['sass'],function(){
});

gulp.task('sass', function () {
  return gulp.src(sassfiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(''));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
