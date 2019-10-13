'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
      this.log(
	  yosay(`Welcome to the rad ${chalk.red('generator-gulp-b')} generator!`)
      );

      const prompts = [
	  {
              type: 'checkbox',
              name: 'taskFiles',
              message: 'Which tasks should be included?',
	      choices: [
		  'sass',
		  'browsersync',
		  'fractal'
	      ],
              default: []
	  }
      ];

      return this.prompt(prompts).then(props => {
	  // To access props later use this.props.someAnswer;
	  this.props = props;
      });
  }

    writing() {
	this.fs.copy(
	    this.templatePath('index.js'),
	    this.destinationPath('gulpfile.js/index.js')
	);
	this.fs.copy(
	    this.templatePath('gulptask-help.js'),
	    this.destinationPath('gulpfile.js/gulptask-help.js')
	);
	this.fs.copy(
	    this.templatePath('config.js'),
	    this.destinationPath('gulpfile.js/config.js')
	);

	this.props.taskFiles.forEach( f => {
	    console.log('Installing: ', f);
	    this.composeWith('gulp-b:' + f);
	});
	
      // this.props.
      // this.composeWith('gulp-b:' )


      

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
	// this.installDependencies({
	    // yarn: true,
	    // npm: false,
	    // bower: false,
	// });
  }
};
