'use strict';

var util = require('util');
var path = require('path');
var shell = require('shelljs');
var yeoman = require('yeoman-generator');


var BasicProjectGenerator = module.exports = function BasicProjectGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = require('../package.json');

  this.name = this.user.git.name;
  this.email = this.user.git.email;

  this.website = shell.exec('git config --get user.website', { silent: true }).output.trim();

  this.githubUsername = void 0;
  this.user.github.username(function(err, username){
    this.githubUsername = username;
  }.bind(this));
};

util.inherits(BasicProjectGenerator, yeoman.generators.Base);

BasicProjectGenerator.prototype.prompting = function prompting(){
  var done = this.async();

  var prompts = [{
    name: 'projectName',
    message: 'What is the name of your project?',
    default: path.basename(process.cwd())
  }, {
    name: 'description',
    message: 'Please provide a short description for the project'
  }];

  this.prompt(prompts, function(props) {
    this.projectName = props.projectName;

    this.description = props.description;

    done();
  }.bind(this));
};

BasicProjectGenerator.prototype.writing = function writing(){
  if(!this.website){
    this.website = this.githubUsername ? 'https://github.com/' + this.githubUsername : 'https://github.com/';
    this.log('\n\nCouldn\'t find your website in git config under \'user.website\'');
    this.log('Defaulting to Github url: ' + this.website);
  }

  this.template('readme.md', 'readme.md');

  this.template('license', 'license');

  this.template('editorconfig', '.editorconfig');
  this.template('gitignore', '.gitignore');
};
