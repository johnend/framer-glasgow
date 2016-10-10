var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');



gulp.task('sass', function(){
    return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('browserSync', function () {
    
    browserSync.init({
        browser: ["google chrome", "safari"],
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('coffee', function () {
    gulp.src('app/coffee/*.coffee')
        .pipe(coffee({bare:true}))
            // .on('error', gutil.log))
        .pipe(gulp.dest('../app/js'));
});

gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean:dist', function () {
  return del.sync('dist');
});

gulp.task('watch', ['sass', 'coffee', 'browserSync'], function() {
   gulp.watch('app/coffee/*.coffee', ['coffee']);
   gulp.watch('app/scss/*.scss', ['sass']);
   gulp.watch('app/**/*.html', browserSync.reload);
   gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function(callback){
  runSequence('clean:dist', 
    ['sass', 'coffee', 'useref', 'fonts'], 
    callback
  );
});

gulp.task('default', function(callback){
  runSequence(['sass', 'coffee', 'browserSync', 'watch'],
    callback
    );
});