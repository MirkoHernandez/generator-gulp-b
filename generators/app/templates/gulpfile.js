'use strict';

// Plugins

// Gulp plugins
var gulp = require('gulp');
var usage = require('gulp-help-doc');

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

/**
 * Tasks  can be  documented by  writing a  comment like  this and  by
 * marking the task with @task  {task-name}. Optionally @order {1} can
 * be used to specify in which order the tasks should be  listed.
 */
function help () {
    return usage(gulp);
}

exports.help = help;
gulp.task('default', help);

