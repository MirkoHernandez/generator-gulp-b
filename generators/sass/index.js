'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const esprimaHelpers = require('../esprima-helpers.js');

module.exports = class extends Generator {
    writing() {
      	// Update gulpfile
	var contents = this.fs.read('gulpfile.js');

	// Update require
	var newContent = "var sass= require('gulp-sass');\n";
	
	contents = esprimaHelpers.insertAfterComment(contents,'Plugins', newContent)

	// Update path
	newContent = `tmpProperties = {styles: { \
	    src: './design/scss/**/*.scss' \
	    dest: './dist/css/'} \
        }`;

	contents = esprimaHelpers.addProperty(contents,'paths', newContent);

	// Update tasks
	newContent =`function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest))
    }
exports.styles = styles;`;

	contents = esprimaHelpers.insertAfterComment(contents,'Tasks', newContent)
	
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
