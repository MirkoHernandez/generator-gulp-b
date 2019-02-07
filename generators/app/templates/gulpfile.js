'use strict';

// Plugins
var del = require('del');

// Gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');

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
gulp.task('default', function () {
});

