# generator-gulp-b 
> A generator that creates a gulpfile. It also enables easy customization using subgenerators.

## Installation

First, do a local installation of the module.

```bash
npm link
```

Then go to the folder in which you want to generate a gulpfile and run the generator.

```bash
yo gulp-b .
```

This will update the package.json file to include gulp

## Subgenerators

### Browsersync

A subgenerator that installs browsersync and configures the gulpfile
with a task that by defaul watches the dist folder.

```bash
yo gulp-b:browsersync
```

Using the browsersync task:

```bash
npx gulp browsersync
```

### Sass

A subgenerator that installs a task to compile sass.

```bash
yo gulp-b:sass
```

Using the browsersync task:

```bash
npx gulp sass
```

### Rollup

A subgenerator that installs a task that runs rollup configured from a
config file.  By default the modules for bundling must be configured
in src/main-rollup.js.

Using the rollup task:

```bash
npx gulp rollup
```

Postcss is also configured in the rollup config file so it is possible
import and bundle css files (by default scss is used). 

Example:

```bash
import '../scss/main.scss';
```

## License

MIT © [Mirko Hernandez]()
