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
    this.copy('_bower.json', 'bower.json');
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.gitignore', '.gitignore');

    // Front-End
    this.mkdir('app');

    this.mkdir('app/vendor');
    this.copy('app/index.jade', 'app/index.jade');

      // Assets
      this.mkdir('app/assets');

        // CSS
        this.mkdir('app/assets/css');
        this.copy('app/assets/css/styles.scss', 'app/assets/css/styles.scss');

        // Fonts
        this.mkdir('app/assets/fonts');
        this.mkdir('app/assets/fonts/svg');
        this.copy('app/assets/fonts/svg/arrow.svg', 'app/assets/fonts/svg/arrow.svg');
        this.copy('app/assets/fonts/_icon-font.scss', 'app/assets/fonts/_icon-font.scss');

        // JS
        this.mkdir('app/assets/js');
        this.copy('app/assets/js/scripts.js', 'app/assets/js/scripts.js');

        // Images
        this.mkdir('app/assets/img');

  }
});

module.exports = DefaultGenerator;