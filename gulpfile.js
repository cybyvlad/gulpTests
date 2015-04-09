var gulp = require('gulp');
var less = require("gulp-less");
var watch = require("gulp-watch");
var size = require("gulp-size");
var concat = require("gulp-concat");
var uncss = require("gulp-uncss");
var minifyCss = require("gulp-minify-css");

gulp.task('minifyLess', function() {
  gulp.src('./less/*.less')
    .pipe(less())
    .on('error', function(err){ console.log(err.message); })
    .pipe(concat('all.css'))
    .pipe(size())
    .pipe(uncss({html:['test.html']}))
    .pipe(size())
    .pipe(minifyCss())
    .pipe(size())
    .pipe(gulp.dest('./css'));
});

gulp.task('default', function() {
      gulp.watch('./less/*.less', ['minifyLess']);
});
