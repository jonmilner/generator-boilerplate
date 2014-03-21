var gulp = require('gulp'),
    jade = require('gulp-jade'),
    compass = require('gulp-compass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

require('gulp-grunt')(gulp);

gulp.task('html', function() {
  gulp.src('public/templates/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('icons', ['grunt-webfont']);

gulp.task('css', ['icons'], function() {
  gulp.src('public/assets/css/*.scss')
    .pipe(compass({
      sass: 'public/assets/css',
      css: 'public/assets/css'
    }))
    .pipe(prefix("last 1 version"))
    .pipe(cssmin())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('js', function() {
  gulp.src([
    'public/assets/js/vendor/*.js',
    'public/assets/js/plugins/*.js',
    'public/assets/js/scripts.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('img', function() {
  gulp.src('public/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/img/'))
});

gulp.task('watch', ['compile'], function() {
  gulp.watch('public/*.jade', ['html']);
  gulp.watch('public/assets/css/**/*.scss', ['css']);
  gulp.watch('public/assets/js/**/*.js', ['js']);
  gulp.watch('public/assets/fonts/svg/*.svg', ['icons', 'css']);
});

gulp.task('default', ['compile', 'watch']);
gulp.task('compile', ['html', 'css', 'js']);