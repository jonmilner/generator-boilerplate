Boilerplate Generator
=========


Installation
----

```sh
$ git clone https://github.com/jonmilner/generator-boilerplate.git
$ cd generator-boilerplate
$ npm link
```


Usage
----

```sh
$ yo boilerplate
```


Options
----

**Add project name**
```sh
[?] Project Name:
```

**Add project version (defaults to 0.0.1)**
```sh
[?] Project Version: (0.0.1)
```
**Custom Icon Fonts via grunt-webfont (requires FontForge)**
```sh
[?] Use grunt-webfont for custom font icons? (Requires FontForge) (Y/n)
```


Grunt Tasks
----

* [sapegin/**grunt-webfont**](https://github.com/sapegin/grunt-webfont) - SVG to webfont converter for Grunt
* [gruntjs/**grunt-contrib-compass**](https://github.com/gruntjs/grunt-contrib-compass) - Compile Compass to CSS
* [nDmitry/**grunt-autoprefixer**](https://github.com/nDmitry/grunt-autoprefixer) - Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.
* [gruntjs/**grunt-contrib-cssmin**](https://github.com/gruntjs/grunt-contrib-cssmin) - Compress CSS files
* [stephenplusplus/**grunt-bower-install**](https://github.com/stephenplusplus/grunt-bower-install) - Inject your Bower components right into your HTML from Grunt
* [yeoman/**grunt-usemin**](https://github.com/yeoman/grunt-usemin) - Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)
* [gruntjs/**grunt-contrib-copy**](https://github.com/gruntjs/grunt-contrib-copy) - Copy files and folders
* [gruntjs/**grunt-contrib-clean**](https://github.com/gruntjs/grunt-contrib-clean) - Clear files and folders
* [gruntjs/**grunt-contrib-imagemin**](https://github.com/gruntjs/grunt-contrib-imagemin) - Minify PNG and JPEG images
* [ChrisWren/**grunt-nodemon**](https://github.com/ChrisWren/grunt-nodemon) - Grunt task to run nodemon
* [sindresorhus/**grunt-concurrent**](https://github.com/sindresorhus/grunt-concurrent) - Run grunt tasks concurrently
* [gruntjs/**grunt-contrib-watch**](https://github.com/gruntjs/grunt-contrib-watch) - Run tasks whenever watched files change
