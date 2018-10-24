var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyJS 	= require("gulp-uglify");
var merge = require('merge-stream');

var globs = {
  dist: './dist',  
  js: './js/**/*.js',
  css: './css/**/*.css',
  images: './img/**',
  fonts: './fonts/**'
};

gulp.task('clean', function() {
  return gulp.src([globs.dist], {read: false})
    .pipe(clean());
});

gulp.task('assets', ['clean'], function() {
  var images = gulp.src(globs.images).pipe(gulp.dest(globs.dist + '/img'));
  var fonts = gulp.src(globs.fonts).pipe(gulp.dest(globs.dist + '/fonts'));
  var html = gulp.src('./index.html').pipe(gulp.dest(globs.dist));
  return merge(images, fonts, html);
});

gulp.task('styles', ['clean'], function() {
  return gulp.src(globs.css)
    .pipe(minifyCSS())
    .pipe(gulp.dest(globs.dist + '/css'));
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(globs.js)
    .pipe(gulp.dest(globs.dist + '/js'));
});

gulp.task('copy', function () {
     gulp
      .src('./views/**/*')
      .pipe(gulp.dest(globs.dist + '/views'));
});

gulp.task('build', [ 'scripts', 'styles', 'assets', 'copy']);

gulp.task('default', ['build']);