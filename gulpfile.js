var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var browserSync = require('browser-sync').create();


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
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('coffee', function () {
    gulp.src('app/coffee/*.coffee')
        .pipe(coffee({bare:true}))
            // .on('error', gutil.log))
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'coffee', 'browserSync'], function() {
   gulp.watch('app/coffee/*.coffee', ['coffee']);
   gulp.watch('app/scss/*.scss', ['sass']);
   gulp.watch('app/**/*.html', browserSync.reload);
   gulp.watch('app/js/**/*.js', browserSync.reload);
});