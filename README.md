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

Usage: 

```bash
npx gulp browsersync
```

## License

MIT © [Mirko Hernandez]()
