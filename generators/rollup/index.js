'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

    writing() {
	
	// Update gulpfile
	var contents = this.fs.read('gulpfile.js');

	// Update require
	var replaceString = "// Plugins\n";
	var newContent = "var source = require('vinyl-source-stream');\n" +
	    "var buffer = require('vinyl-buffer');\n" +
	    "var resolve = require('rollup-plugin-node-resolve');\n" +
	    "var commonjs = require('rollup-plugin-commonjs');\n" +
	    "var rollup = require('rollup-stream');\n" + 
	    "var postcss = require('rollup-plugin-postcss');\n";
	contents = contents.replace(replaceString,replaceString + newContent);

	// Update tasks
	replaceString= "// Tasks\n"
	newContent = "function rollup() {\n" +
	    "    return rollup('rollup.config.js')\n" +
	    "        .on('bundle',function(bundle) {\n"  +
	    "            cache = bundle;\n" +
	    "         })\n" +
	    "         .pipe(source('bundle.js'))\n" +
	    "         .pipe(gulp.dest('./dist'))\n" +
	    "});\n" +
	    "exports.rollup = rollup;\n\n";
	
	contents = contents.replace(replaceString,replaceString + newContent);
	
	this.fs.write('gulpfile.js',contents);

	
	// Update package.json
	var jsonContent = this.fs.readJSON('package.json')
	if (jsonContent) {
	    if (!jsonContent['devDependencies']) {
		jsonContent['devDependencies'] = {};
	    }
	    
	    if (jsonContent['devDependencies']) {
		['vinyl-source-stream','vinyl-buffer', 'rollup-plugin-node-resolve','rollup-plugin-commonjs',
		 'rollup-stream','rollup-plugin-postcss'].map(function(plugin) {
		if(!jsonContent['devDependencies'][plugin]) {
		    jsonContent['devDependencies'][plugin] = '*';
		    this.fs.writeJSON('package.json', jsonContent);
		}
		 })
	    }
	}
	
	// Copy rollup.config.js
	this.fs.copy(
	    this.templatePath('rollup.config.js'),
	    this.destinationPath('rollup.config.js')
	);
    }

    install() {
	this.installDependencies({
	    yarn: true,
	    npm: false,
	    bower: false,
	});
    }
};


