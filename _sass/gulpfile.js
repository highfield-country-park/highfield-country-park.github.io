var gulp = require('gulp');
var sass = require('gulp-sass');

// Compile sass files
gulp.task('sass', function () {
  gulp.src('./_sass/styles.scss')
    .pipe(sass({errLogToConsole: true, sourceComments: 'map', sourceMap: 'sass'}))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('styles.css'))
      .pipe(gulp.dest('./assets/'));
   /* if(isDev) {
     gulp.src('src/assets/css/styles.css')
       .pipe(clean())
       .pipe(gulp.dest('./src/assets/css'));
   } */
});
