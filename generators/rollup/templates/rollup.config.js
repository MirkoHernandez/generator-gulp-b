import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/main-rollup.js',
    // rollup: require('rollup'),// rollup-stream compatibility
    format: 'iife',              // rollup-stream compatibility
    name:'foo',                  // rollup-stream compatibility
    output: {
	name: 'foo',
	file: 'dist/bundle.js',
	format: 'iife'
    },
    plugins: [
	postcss({extensiont:['.scss']}),
	resolve({
	    customResolveOptions: {
		moduleDirectory: 'node_modules'
	    }
	}),
	commonjs({
	    include: 'node_modules/**', 
	    exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  
	    extensions: [ '.js', '.coffee' ], 
	    ignoreGlobal: false,
	    sourceMap: false,
	    namedExports: { './module.js': ['foo', 'bar' ] },
	    ignore: ['conditional-runtime-dependency']
	}),
	json({
	    // All JSON files will be parsed by default,
	    // but you can also specifically include/exclude files
	    include: 'node_modules/**',
	    preferConst: true, 
	    indent: '  ',
	    compact: true, 
	    namedExports: true 
	})
    ],
    // indicate which modules should be treated as external
    external: ['lodash']
};

