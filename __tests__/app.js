'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-modern-protractor:app', () => {
  describe('with default params', () => {
    let promptsAnswers = {
      testProjectName: 'ui-functional-tests',
      baseUrl: 'http://www.protractortest.org/testapp/ng1/',
      usedIde: 'Visual Studio Code',
      hideCompiledJs: true,
      useTSlint: true
    };

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(promptsAnswers)
        .withOptions({
          noTestRun: 'noTestRun'
        })
        .on('error', function (error) {
          console.log('Oh Noes!', error);
        });
    });

    it('copies correct files', () => {
      assert.file([
        'config/protractor.conf.ts',
        'helpers/helper.ts',
        'page_objects/base.page.ts',
        'page_objects/home.page.ts',
        'page_objects/page_fragments/example.fragment.ts',
        'specs/homepage.spec.ts',
        '.vscode/launch.json',
        '.vscode/tasks.json',
        '.vscode/settings.json',
        '.gitignore',
        'package.json',
        'README.md',
        'tsconfig.json',
        'tslint.json'
      ]);
    });

    it('sets package.json project name', () => {
      assert.jsonFileContent('package.json', {
        name: promptsAnswers.testProjectName
      });
    });

    it('sets readme.md project name', () => {
      assert.fileContent('README.md',
        promptsAnswers.testProjectName
      );
    });

    it('sets correct baseUrl', () => {
      assert.fileContent('config/protractor.conf.ts',
        promptsAnswers.baseUrl
      );
    });
  });

  describe('no visual studio code', function () {
    beforeAll(() => {
      let promptsAnswers = {
        usedIde: 'WebStorm'
      };
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(promptsAnswers)
        .withOptions({
          noTestRun: 'noTestRun'
        })
        .on('error', function (error) {
          console.log('Oh Noes!', error);
        });
    });

    it('should not copy vscode folder if IDE is not vscode', function () {
      assert.noFile([
        '.vscode/launch.json',
        '.vscode/tasks.json',
        '.vscode/settings.json'
      ]);
    });
  });

  describe('no TSLinter', () => {
    let promptsAnswers = {
      useTSlint: false
    };

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(promptsAnswers)
        .withOptions({
          noTestRun: 'noTestRun'
        });
    });

    it('copies correct files', () => {
      assert.file([
        'config/protractor.conf.ts',
        'helpers/helper.ts',
        'page_objects/base.page.ts',
        'page_objects/home.page.ts',
        'page_objects/page_fragments/example.fragment.ts',
        'specs/homepage.spec.ts',
        '.vscode/launch.json',
        '.vscode/tasks.json',
        '.vscode/settings.json',
        '.gitignore',
        'package.json',
        'README.md',
        'tsconfig.json',
        'tslint.json'
      ]);
    });

    it('sets package.json project name', () => {
      assert.jsonFileContent('package.json', {
        name: promptsAnswers.testProjectName
      });
    });

    it('sets readme.md project name', () => {
      assert.fileContent('README.md',
        promptsAnswers.testProjectName
      );
    });

    it('sets correct baseUrl', () => {
      assert.fileContent('config/protractor.conf.ts',
        promptsAnswers.baseUrl
      );
    });
  });

});


