'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
 

    writing() {
	// Update gulpfile
	var contents = this.fs.read('gulpfile.js');

	// Update require
	var replaceString = "// Plugins"
	var newContent = "\n var browserSync = require('browser-sync').create()\n";
	contents = contents.replace(replaceString,replaceString + newContent);

	// Update path
	replaceString= "var paths = {\n"
	newContent = "browsersync: {\n dest: './dist'\n},\n";
	contents = contents.replace(replaceString,replaceString + newContent);

	// Update tasks
	replaceString= "// Tasks\n"
	newContent = "function browsersync () {" +
	    "\n  browserSync.init({\n" +
	    "    server: {\n"  +
	    "      baseDir: path.browserSync.dest\n" +
	    "    },\n" + 
	    "open:false \n" +
	"})\n};";
	
	contents = contents.replace(replaceString,replaceString + newContent);
	
	this.fs.write('gulpfile.js',contents);

	// Update package.json
	var jsonContent = this.fs.readJSON('package.json')
	if (jsonContent) {
	    if (!jsonContent['devDependencies']) {
		jsonContent['devDependencies'] = {};
	    }
	
	    if (jsonContent['devDependencies']) {
		if(!jsonContent['devDependencies']['browser-sync']) {
		    jsonContent['devDependencies']['browser-sync'] = '*';
		    console.log(jsonContent);
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
