'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const esprimaHelpers = require('../esprima-helpers.js');

module.exports = class extends Generator {
    writing() {
	// Write template
	this.fs.copy(
	    this.templatePath('gulptask-fractal.js'),
	    this.destinationPath('./gulpfile.js/gulptask-fractal.js')
	);
	
      	// Update gulpfile
	var contents = this.fs.read('./gulpfile.js/index.js');
	var newCode = "require('./gulptask-fractal');\n";
	contents = esprimaHelpers.addCodeToBeginningOfProgram(contents,newCode);

	this.log(contents);
	this.fs.write('./gulpfile.js/index.js',contents);
	
	// Update package.json
	var jsonContent = this.fs.readJSON('package.json')
	if (jsonContent) {
	    if (!jsonContent['devDependencies']) {
		jsonContent['devDependencies'] = {};
	    }
	    
	    if (jsonContent['devDependencies']) {
		if(!jsonContent['devDependencies']['@frctl/fractal']) {
		    jsonContent['devDependencies']['@frctl/fractal'] = '*';
		    this.fs.writeJSON('package.json', jsonContent);
		}
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
