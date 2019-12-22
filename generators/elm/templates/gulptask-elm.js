const config = require('./config');
var gulp = require('gulp');
var elm  = require('gulp-elm');

function elmCompile() {
  return gulp.src(config.paths.elm.src)
	.pipe(elm.bundle('elm.js', { optimize: true,filetype:'js' }))
	.pipe(gulp.dest(config.paths.dest));
}

/**
 * Compile elm files.
 * 
 * @task {elm}
 */
gulp.task('elm' , elmCompile);




