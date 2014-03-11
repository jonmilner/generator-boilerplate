module.exports = (grunt) ->
  require("load-grunt-tasks") grunt
  grunt.initConfig

    <% if (optionWebfont) { %>
    # Custom Icon Fonts
    webfont:
      icons:
        src: "app/assets/fonts/svg/*.svg" # Path to .svg icons
        dest: "public/assets/fonts/icon-font/" # Destination for font files
        destCss: "app/assets/css/generated/" # Destination for .scss file
        options:
          stylesheet: "scss"
          syntax: "bootstrap"
          hashes: false
          font: "icon-font" # Name of .scss file
          relativeFontPath: "../fonts/icon-font/"
          templateOptions:
            classPrefix: "icon-"
          htmlDemo: false
    <% } %>

    # Compass
    compass:
      dist:
        options:
          sassDir: "app/assets/css"
          cssDir: "app/assets/css"
          outputStyle: "nested"
          noLineComments: true

    # Autoprefixer
    autoprefixer:
      options:
        browsers: "last 2 versions"
      single_file:
        src: "app/assets/css/styles.css"
        dest: "app/assets/css/styles.css"

    # Minify CSS
    cssmin:
      minify:
        expand: true
        cwd: "app/assets/css/"
        src: "styles.css"
        dest: "public/assets/css/"
        ext: ".css"

    # Add Bower Components to HTML
    bowerInstall:
      target:
        src: ["app/**/*.html"]

    # Concat + Minify Scripts
    useminPrepare:
      html: "app/index.html"
      options:
        dest: "public"
        flow:
          steps:
            js: [
              "concat"
              "uglifyjs"
            ]
          post: {}

    # Copy HTML File
    copy:
      dist:
        files: [
          expand: true
          cwd: "app"
          dest: "public"
          src: ["*.html"]
        ]

    # Replace Usemin Block
    usemin:
      html: ["public/{,*/}*.html"]
      options:
        assetsDirs: ["public"]

    # Clean
    clean: [
      ".tmp"
    ]

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
      <% if (optionWebfont) { %>
      fonts:
        files: ["app/assets/fonts/svg/*.svg"]
        tasks: [
          "webfont"
          "compass"
          "autoprefixer"
          "cssmin"
        ]
      <% } %>
      css:
        files: ["app/assets/css/**/*.scss"]
        tasks: [
          "compass"
          "autoprefixer"
          "cssmin"
        ]
      js:
        files: ["app/assets/js/scripts/*.js"]
        tasks: [
          "useminPrepare"
          "copy"
          "concat"
          "uglify"
          "usemin"
          "clean"
        ]
      images:
        files: ["public/assets/images/*"]
        tasks: ["imagemin"]
      options:
        livereload: true

  # Compile
  grunt.registerTask "compile", [
    <% if (optionWebfont) { %>"webfont"<% } %>
    "compass"
    "autoprefixer"
    "cssmin"
    "bowerInstall"
    "useminPrepare"
    "copy"
    "concat"
    "uglify"
    "usemin"
    "clean"
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