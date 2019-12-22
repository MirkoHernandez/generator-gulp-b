const config = require('./config');
const gulp = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve'); 
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

function rollupBundle () {
    return rollup.rollup({
	input: config.paths.rollup.src,
	plugins: [
	    resolve({
		browser:true,
		customResolveOptions: {
		    moduleDirectory: 'node_modules'
		}
	    }),
	    commonjs(),
	    babel({
		exclude: 'node_modules/**',
		babelrc: false,
		presets: [['@babel/preset-env', { modules: false }]]
	    })
	],
    }).then(bundle => {
	return bundle.write({
	    name: 'bundle',
	    dir: config.paths.rollup.dest,
	    format: 'umd',
	    globals: {
		'lodash': 'lodash'
	    },
	    sourcemap: true
	});
    });
}

/**
 * Bundles js modules using rollup.
 * 
 * @task {rollup:bundle}
 */
gulp.task('rollup:bundle' ,rollupBundle);
