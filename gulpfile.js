var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint');

gulp.task('webserver', function(){
  connect.server({
    livereload: true,
    root: ['./public']
  });
});

gulp.task('livereload', function() {
  gulp.src(['./public/**/*']).pipe(watch()).pipe(connect.reload());
});

gulp.task('jshint', function() {
  gulp.src(["./public/scripts/**/*.js"]).pipe(jshint()).pipe(jshint.reporter("default"));
});

gulp.task('watch', function() {
  gulp.watch(['./public/scripts/**/*.js'], ['jshint']);
});

gulp.task('default', ['webserver', 'livereload', 'watch']);
