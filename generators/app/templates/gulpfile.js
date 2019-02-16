'use strict';

// Plugins

// Gulp plugins
var gulp = require('gulp');
var taskListing = require('gulp-task-listing');

// Gulp config
var watchOptions = {
    usePolling: true, // required when using inside VMs.
}
// Plugin config


// Paths
var paths = {
    index: {  
	src: './src/index.html',
	dest: './dist'
    },
};

// Tasks
gulp.task('default', taskListing);

