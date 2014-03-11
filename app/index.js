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
        message: 'Name:'
      },
      {
        name: 'projectVersion',
        message: 'Version:'
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectVersion = props.projectVersion;

      done();
    }.bind(this));
  },

  app: function () {

    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.gitignore', '.gitignore');

    // Front-End
    this.mkdir('public');
    this.template('public/index.html', 'public/index.html');

      // Assets
      this.mkdir('public/assets');

        // CSS
        this.mkdir('public/assets/css');
        this.template('public/assets/css/styles.scss', 'public/assets/css/styles.scss');

        // Images
        this.mkdir('public/assets/img');

        // Fonts
        this.mkdir('public/assets/fonts');
        this.mkdir('public/assets/fonts/svg');
        this.template('public/assets/fonts/svg/arrow.svg', 'public/assets/fonts/svg/arrow.svg');

        // JS
        this.mkdir('public/assets/js');

    // Server
    this.mkdir('server');
    this.template('server/app.js', 'server/app.js');

  }
});

module.exports = DefaultGenerator;