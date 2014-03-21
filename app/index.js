'use strict';
var yeoman = require('yeoman-generator');

var DefaultGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function () {
            this.spawnCommand('gulp', ['default']);
          }.bind(this) // bind the callback to the parent scope
        });
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
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectVersion = props.projectVersion;
      this.optionWebfont = props.optionWebfont;

      done();
    }.bind(this));
  },

  app: function () {

    this.copy('_package.json', 'package.json');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_gruntfile.js', 'gruntfile.js');
    this.copy('_bower.json', 'bower.json');
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.gitignore', '.gitignore');

    // Front-End
    this.mkdir('public');
    this.mkdir('public/components');

      // Templates
      this.mkdir('public/templates');
      this.copy('public/templates/index.jade', 'public/templates/index.jade');

      // Assets
      this.mkdir('public/assets');

        // CSS
        this.mkdir('public/assets/css');
        this.copy('public/assets/css/styles.scss', 'public/assets/css/styles.scss');

        // Fonts
        this.mkdir('public/assets/fonts');
        this.mkdir('public/assets/fonts/svg');
        this.copy('public/assets/fonts/svg/arrow.svg', 'public/assets/fonts/svg/arrow.svg');

        // JS
        this.mkdir('public/assets/js');
        this.mkdir('public/assets/js/scripts');

        // Images
        this.mkdir('public/assets/img');

    // Server
    this.mkdir('server');
    this.copy('server/app.js', 'server/app.js');

  }
});

module.exports = DefaultGenerator;