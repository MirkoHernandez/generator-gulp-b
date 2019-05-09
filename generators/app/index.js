'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the rad ${chalk.red('generator-gulp-b')} generator!`)
    );

    const prompts = [
      // {
        // type: 'confirm',
        // name: 'someAnswer',
        // message: 'Would you like to enable this option?',
        // default: true
      // }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

      var jsonContent = this.fs.readJSON('package.json')
      if (jsonContent) {
	  if (!jsonContent['devDependencies']) {
	      jsonContent['devDependencies'] = {};
	  }
	    
	  if (jsonContent['devDependencies']) {
	      if(!jsonContent['devDependencies']['gulp']) {
		  jsonContent['devDependencies']['gulp'] = '*';
		  this.fs.writeJSON('package.json', jsonContent);
	      }
	  }
      } else {
	  this.fs.copy(
	      this.templatePath('package.json'),
	      this.destinationPath('package.json')
	  );
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
