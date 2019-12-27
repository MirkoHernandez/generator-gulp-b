const config = require('./config');
const gulp = require('gulp');
const browserSync = require('browser-sync').create()

function reload(done) {
  browserSync.reload();
  done();
}

function serve(done) {
  browserSync.init({
    server: {
	baseDir:  config.paths.server.dest
    },
      	open:false
  });
  done();
}


const watch = () => gulp.watch(config.paths.server.dest, config.watchOptions, gulp.series(reload));
const server = gulp.series(serve, watch);

/**
 * Start a browsersync server.
 * 
 * @group {Continuous Development}
 * @task {browsersync}
 */
gulp.task('browsersync',server);

