'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('build',['sass'],function(){
  console.log("Build is finished");
});

gulp.task('sass', function () {
  return gulp.src('**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./style'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
