module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Compile Icon Fonts
    'webfont': {
      icons: {
        src: 'public/assets/fonts/svg/*.svg', // Path to .svg icons
        dest: 'public/assets/fonts/icon-font/', // Destination for font files
        destCss: 'public/assets/css/generated/', // Destination for .scss file
        options: {
          stylesheet: 'scss',
          syntax: 'bootstrap',
          hashes: false,
          font: 'icon-font', // Name of .scss file
          relativeFontPath: '../fonts/icon-font/',
          templateOptions: {
            classPrefix: 'icon-'
          },
          htmlDemo: false
        }
      }
    },

  });

};