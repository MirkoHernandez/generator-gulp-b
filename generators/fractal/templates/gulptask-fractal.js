const config = require('./config');
const gulp = require('gulp');
const fractal = require('@frctl/fractal').create();

fractal.set('project.title', config.fractal.title);
fractal.web.set('builder.dest', 'build');                 // destination for the static export
fractal.web.set('static.path', config.paths.fractal.assets);     // location of assets
fractal.docs.set('path', config.paths.fractal.docs);             // location of the documentation directory.
fractal.components.set('path', config.paths.fractal.components); // location of the component directory.

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

function serve() {
    const server = fractal.web.server({
        sync: true,
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
}

function reload(done) {
    const bs = require("browser-sync").get(config.fractal.title); // Workaround to enable hot reloading.
    bs.reload();
    done();
}

function build() {
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
}

const watch = () => gulp.watch(config.paths.fractal.components, config.watchOptions, gulp.series(reload));
const server = gulp.series(serve, watch);

/**
 * Start a fractal server 
 * 
 * @task {fractal}
 */
gulp.task('fractal' , server);


/**
 * Build the fractal project.
 * 
 * @task {fractal:build}
 */
gulp.task('fractal:build' , build);
