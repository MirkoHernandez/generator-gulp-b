'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

    initializing() {
	// Tasks can be optionally accepted  via command line (so that
	// this generator can be used by other generators).
	this.argument('tasks', {required: false, type: Array});

	 this.log(chalk`\nThis  generator creates a {blue gulpfile.js}  folder and  an empty (no gulp tasks) {blue index.js} file. Tasks are grouped in different files, for each of the selected options a file is created and then loaded in index.js.\n`);
    }

    prompting() {

	const prompts = [
	    {
		type: 'checkbox',
		name: 'tasks',
		message: 'Which tasks should be included ? \n',
		choices: [
		    'sass',
		    'browsersync',
		    'fractal',
		    'rollup',
		    'elm'
		],
		default: ['sass', 'browsersync','fractal', 'rollup','elm']
	    }
	];
	if (!this.options['tasks']) {
	    return this.prompt(prompts).then(props => {
		// To access props later use this.props.someAnswer;
		this.props = props;
	    });
	}
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

	if (this.options['tasks']) {
	    this.props = {};
	    this.props.tasks = this.options['tasks'];
	}
	
	this.props.tasks.forEach( f => {
	    this.log('Installing: ', f);
	    this.composeWith('gulp-b:' + f);
	});
	

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

};
