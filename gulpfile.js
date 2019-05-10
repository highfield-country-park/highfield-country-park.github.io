var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var rename = require("gulp-rename");
var minify = require('gulp-minify');

// Compile sass files
gulp.task('sass', function () {
  gulp.src('./src/_sass/hfcp.scss')
    .pipe(sass({errLogToConsole: true, sourceComments: 'map', sourceMap: 'sass'}))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('hfcp.css'))
      .pipe(gulp.dest('./assets/'));
   /* if(isDev) {
     gulp.src('src/assets/css/styles.css')
       .pipe(clean())
       .pipe(gulp.dest('./src/assets/css'));
   } */
});
