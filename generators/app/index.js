const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

// Stores JHipster variables
const jhipsterVar = { moduleName: 'siddhi' };

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = JhipsterGenerator.extend({
    initializing: {
        compose() {
            this.composeWith('jhipster:modules',
                { jhipsterVar, jhipsterFunc },
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/modules') } : null
            );
        },
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        displayLogo() {
            // it's here to show that you can use functions from generator-jhipster
            // this function is in: generator-jhipster/generators/generator-base.js
            this.printJHipsterLogo();

            // Have Yeoman greet the user.
            this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster JHipster Google Maps')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        },
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
            if (this.jhipsterAppConfig.clientFramework != 'angular1') {
              this.error('This generator only supports AngularJS 1.x (for now).');
            }
        }
    },

    prompting() {

    },

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        // read config from .yo-rc.json
        this.baseName = this.jhipsterAppConfig.baseName;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;

        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;

        this.log('Adding java classes ...');

        this.template('src/main/java/app/MyConfiguration',`${this.javaDir}/config/MyConfiguration.java`);

        this.log('Done writing files!\n');
    },

    install() {

        this.addMavenDependency('org.wso2.siddhi', 'siddhi-query-api', '4.1.7');
        this.addMavenDependency('org.wso2.siddhi', 'siddhi-query-compiler', '4.1.7');
        this.addMavenDependency('org.wso2.siddhi', 'siddhi-annotations', '4.1.7');
        this.addMavenDependency('org.wso2.siddhi', 'siddhi-core', '4.1.7');

    },

    end() {
        this.log('End of Google maps generator');
    }
});
