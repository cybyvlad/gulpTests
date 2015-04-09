var gulp = require('gulp');
var less = require("gulp-less");
var watch = require("gulp-watch");
var size = require("gulp-size");
var concat = require("gulp-concat");
var uncss = require("gulp-uncss");
var minifyCss = require("gulp-minify-css");
var jshint = require("gulp-jshint");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');



gulp.task('minifyLess', function() {
  gulp.src('./less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({browsers:['last 2 version','> 5%']}))
    .pipe(concat('all.css'))
    .pipe(size())
    .pipe(uncss({html:['test.html']}))
    .pipe(size())
    .pipe(minifyCss())
    .pipe(size())
    .pipe(gulp.dest('./css'));
});

gulp.task('checkJavascript',function(){
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

gulp.task('minifyJavascript',function(){
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./processedjs'));
})
gulp.task('images',function(){
  gulp.src('./images/*')
    .pipe(imagemin({
        optimizationLevel : 7,
        progressive:true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./img'));
});


gulp.task('default', function() {

      gulp.watch(['./less/*.less','./js/*.js'], ['minifyLess','checkJavascript','minifyJavascript','images']);
});
