'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const esprimaHelpers = require('../esprima-helpers.js');

module.exports = class extends Generator {
 
    writing() {
	// Write template
	this.fs.copy(
	    this.templatePath('gulptask-browsersync.js'),
	    this.destinationPath('./gulpfile.js/gulptask-browsersync.js')
	);
	
	// Update gulpfile
	let contents = this.fs.read('./gulpfile.js/index.js');
	const newCode = "require('./gulptask-browsersync');\n";
	contents = esprimaHelpers.addCodeToBeginningOfProgram(contents,newCode);

	this.fs.write('./gulpfile.js/index.js',contents);

	// Update package.json
	let jsonContent = this.fs.readJSON('package.json')
	if (jsonContent) {
	    if (!jsonContent['devDependencies']) {
		jsonContent['devDependencies'] = {};
	    }
	
	    if (jsonContent['devDependencies']) {
		if(!jsonContent['devDependencies']['browser-sync']) {
		    jsonContent['devDependencies']['browser-sync'] = '*';
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
