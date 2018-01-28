var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


// Sass and globbing
gulp.task('sass', function() {
  return gulp.src('src/scss/styles.scss') // Gets styles.scss
      .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('src/css'))
});

// Minify js and css
gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'))
});

// Optimise images
gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('build/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('build/fonts'))
})

// remove unused files
gulp.task('clean:build', function() {
  return del.sync('build');
})

// clear cache
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})

/*
* Build tasks
*/

// Gulp watch 
gulp.task('watch', ['sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  // Other watchers
});

// Gulp default
gulp.task('default', function (callback) {
  runSequence(['sass', 'watch'],
    callback
  )
})

// Gulp build
gulp.task('build', function (callback) {
  runSequence('clean:build', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})
