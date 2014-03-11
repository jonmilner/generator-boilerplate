'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var DefaultGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);

    var prompts = [
      {
        name: 'projectName',
        message: 'Project Name:'
      },
      {
        name: 'projectVersion',
        message: 'Project Version:',
        default: '0.0.1'
      },
      {
        type: 'confirm',
        name: 'optionWebfont',
        message: 'Use grunt-webfont for custom font icons? (Requires FontForge)',
        default: true
      },
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectVersion = props.projectVersion;
      this.optionWebfont = props.optionWebfont;

      done();
    }.bind(this));
  },

  app: function () {

    this.template('_Gruntfile.coffee', 'Gruntfile.coffee');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.gitignore', '.gitignore');

    // Front-End
    this.mkdir('app');
    this.mkdir('app/components');
    this.template('app/index.html', 'app/index.html');

      // Assets
      this.mkdir('app/assets');

        // CSS
        this.mkdir('app/assets/css');
        this.template('app/assets/css/styles.scss', 'app/assets/css/styles.scss');

        // Fonts
        this.mkdir('app/assets/fonts');
        this.mkdir('app/assets/fonts/svg');
        this.template('app/assets/fonts/svg/arrow.svg', 'app/assets/fonts/svg/arrow.svg');

        // JS
        this.mkdir('app/assets/js');
        this.template('app/assets/js/custom.js', 'app/assets/js/custom.js');

    // Build
    this.mkdir('public');

      // Assets
      this.mkdir('public/assets');

        // Images
        this.mkdir('public/assets/img');

    // Server
    this.mkdir('server');
    this.template('server/app.js', 'server/app.js');

  }
});

module.exports = DefaultGenerator;