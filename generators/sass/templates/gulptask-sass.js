const config = require('./config');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

function styles() {
    return gulp.src(config.paths.styles.src)
    	.pipe(sassGlob())
        .pipe(sass())
        .pipe(gulp.dest(config.paths.styles.dest));
}

const watch = () => gulp.watch(config.paths.styles.src, config.watchOptions,styles);

/**
 * Compile SCSS files.
 * 
 * @task {styles}
 */
gulp.task('styles' , styles);

/**
 * Watch SCSS files for changes.
 * 
 * @task {styles:watch}
 */
gulp.task('styles:watch' ,watch);




