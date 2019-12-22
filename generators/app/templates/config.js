const config = {};

config.watchOptions  = {
    usePolling: true, // required when using Virtual Machines.
};

const stylesDir='design';

config.paths = {
    dest: './dist',
    rollup: {
	src: './src/main.js'
    },
    elm: {
	src: './src/**/*.elm'
    },
    server: {
	src: './src'
    },
    styles: {
	src: `${stylesDir}/scss/**/*.scss`,
	dest: './dist/css/'
    },
    fractal: {
	assets: `${__dirname}/../${stylesDir}/public`,
	components: `${__dirname}/../${stylesDir}/components`,
	docs: `${__dirname}/../${stylesDir}/docs`
    },
};


config.fractal = {
    title:'Fractal App'
};

module.exports = config;


