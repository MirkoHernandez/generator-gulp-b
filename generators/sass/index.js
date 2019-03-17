'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

    writing() {
      	// Update gulpfile
	var contents = this.fs.read('gulpfile.js');

	// Update require
	var replaceString = "// Plugins\n"
	var newContent = "var sass= require('gulp-sass');\n";
	contents = contents.replace(replaceString,replaceString + newContent);

	// Update path
	replaceString= "var paths = {\n"
	newContent = "styles: {\n" +
	    "src: './design/scss/**/*.scss',\n" +
	    "dest: './dist/css/'\n},\n";
	contents = contents.replace(replaceString,replaceString + newContent);

	// Update tasks
	replaceString= "// Tasks\n"
	newContent = "function styles() {\n" +
	    "    return gulp.src(paths.styles.src)\n" +
	    "        .pipe(sass())\n"  +
	    "        .pipe(gulp.dest(paths.styles.dest))\n" +
	    "}\n" +
	    "exports.styles = styles;\n\n";
	
	contents = contents.replace(replaceString,replaceString + newContent);
	
	this.fs.write('gulpfile.js',contents);

	
	// Update package.json
	var jsonContent = this.fs.readJSON('package.json')
	if (jsonContent) {
	    if (!jsonContent['devDependencies']) {
		jsonContent['devDependencies'] = {};
	    }
	    
	    if (jsonContent['devDependencies']) {
		if(!jsonContent['devDependencies']['gulp-sass']) {
		    jsonContent['devDependencies']['gulp-sass'] = '*';
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
