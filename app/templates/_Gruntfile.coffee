module.exports = (grunt) ->
  require("load-grunt-tasks") grunt
  grunt.initConfig

    # Custom Icon Fonts
    webfont:
      icons:
        src: "public/assets/fonts/svg/*.svg" # Path to .svg icons
        dest: "public/assets/fonts/icon-font/" # Destination for font files
        destCss: "public/assets/css/generated/" # Destination for .scss file
        options:
          stylesheet: "scss"
          syntax: "bootstrap"
          hashes: false
          font: "icon-font" # Name of .scss file
          relativeFontPath: "../fonts/icon-font/"
          templateOptions:
            classPrefix: "icon-"
          htmlDemo: false

    # Compass
    compass:
      dist:
        options:
          sassDir: "public/assets/css"
          cssDir: "public/assets/css"
          outputStyle: "nested"
          noLineComments: true

    # Autoprefixer
    autoprefixer:
      options:
        browsers: "last 2 versions"
      single_file:
        src: "public/assets/css/styles.css"
        dest: "public/assets/css/styles.css"

    # Minify CSS
    cssmin:
      minify:
        expand: true
        cwd: "public/assets/css/"
        src: "styles.css"
        dest: "public/assets/css/"
        ext: ".css"

    # Add Bower Components to HTML
    bowerInstall:
      target:
        src: ["public/**/*.html"]

    # Concat JS
    concat:
      dist:
        src: [
          "public/assets/js/scripts/*.js"
        ]
        dest: "public/assets/js/scripts.min.js"

    # Uglify JS
    uglify:
      build:
        src: "public/assets/js/scripts.min.js"
        dest: "public/assets/js/scripts.min.js"

    # Image Optimization
    imagemin:
      dynamic:
        files: [
          expand: true
          cwd: "public/assets/images/"
          src: ["**/*.{png,jpg,gif}"]
          dest: "public/assets/images/"
        ]

    # Server
    nodemon:
      dev:
        options:
          file: "server/app.js"
          watchedExtensions: ["js"]
          watchedFolders: ["server"]
          delayTime: 0

    # Concurrent Tasks
    concurrent:
      default:
        tasks: [
          "nodemon:dev"
          "watch"
        ]
        options:
          logConcurrentOutput: true

    # Watch
    watch:
      fonts:
        files: ["public/assets/fonts/svg/*.svg"]
        tasks: [
          "webfont"
          "compile-css"
        ]
      css:
        files: ["public/assets/css/**/*.scss"]
        tasks: [
          "compile-css"
        ]
      js:
        files: ["public/assets/js/scripts/*.js"]
        tasks: [
          "compile-js"
        ]
      images:
        files: ["public/assets/images/*"]
        tasks: ["imagemin"]
      options:
        livereload: true

  # Compile CSS
  grunt.registerTask "compile-css", [
    "compass"
    "autoprefixer"
    "cssmin"
  ]

  # Compile JS
  grunt.registerTask "compile-js", [
    "bowerInstall"
    "concat"
    "uglify"
  ]

  # Compile
  grunt.registerTask "compile", [
    "webfont"
    "compile-css"
    "compile-js"
    "imagemin"
  ]

  # Compile, Run Server, & Watch
  grunt.registerTask "default", [
    "compile"
    "concurrent"
  ]

  # Run Server
  grunt.registerTask "server", ["nodemon:dev"]

  return