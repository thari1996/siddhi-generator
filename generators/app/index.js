'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'siddhi'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
        this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the JHipster siddhi generator! ' + chalk.blue('v' + packagejs.version + '\n'));
    }
  },

  writing() {

      this.javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;

// Copy a class
this.template('MyConfiguration.java', `${this.javaDir}/config/MyConfiguration.java`);



  },

  install() {

    this.npmInstall();
       this.addMavenDependency('org.wso2.siddhi', 'siddhi-query-api', '4.1.7');
      this.addMavenDependency('org.wso2.siddhi', 'siddhi-query-compiler', '4.1.7');
      this.addMavenDependency('org.wso2.siddhi', 'siddhi-annotations', '4.1.7');
      this.addMavenDependency('org.wso2.siddhi', 'siddhi-core', '4.1.7');

  },

  end: function () {
    this.log('End of JHipster siddhi generator');
    this.log(' Run siddhi using npm scripts :');
    this.log(' > npm run doc');
  }
});
