'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const esprimaHelpers = require('../esprima-helpers.js');

module.exports = class extends Generator {

    writing() {
	// Write template
	this.fs.copy(
	    this.templatePath('gulptask-rollup.js'),
	    this.destinationPath('./gulpfile.js/gulptask-rollup.js')
	);

	 	// Update gulpfile
	let contents = this.fs.read('./gulpfile.js/index.js');
	const newCode = "require('./gulptask-rollup');\n";
	contents = esprimaHelpers.addCodeToBeginningOfProgram(contents,newCode);

	this.fs.write('./gulpfile.js/index.js',contents);
	
	// Update package.json
	let  jsonContent = this.fs.readJSON('package.json')
	if (jsonContent) {
	    if (!jsonContent['devDependencies']) {
		jsonContent['devDependencies'] = {};
	    }
	    
	    if (jsonContent['devDependencies']) {
		let fs = this.fs;
		['rollup',
		 '@babel/core',
         	 '@babel/preset-env',
                 'rollup-plugin-babel',
		 'rollup-plugin-node-resolve',
		 'rollup-plugin-commonjs',
		 'rollup-plugin-postcss'].map(function(plugin) {
		     if(!jsonContent['devDependencies'][plugin]) {
			 jsonContent['devDependencies'][plugin] = '*';
			 fs.writeJSON('package.json', jsonContent);
		     }
		 })
	    }
	}
	
    }

    install() {
	this.installDependencies({
	    yarn: true,
	    npm: false,
	    bower: false,
	});
    }
};


