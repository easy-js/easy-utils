/*!
 * test/utils.js
 * 
 * Copyright (c) 2014
 */

/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

// core
var fs   = require('fs');
var path = require('path');

// 3rd party
var assert = require('chai').assert;

// lib
var _ = require('../lib/utils');
var fixtureData = require('./fixtures/data');


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var filePath = path.resolve('./test/fixtures/file.html');
var dataPath = path.resolve('./test/fixtures/data.json');
var tmplPath = path.resolve('./test/fixtures/tmpl.hbs');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('utils.js', function () {

  it('Should mixin assist library.', function () {
    assert.ok(_.jsonClone);
  });

  it('Should mixin underscore-companion library.', function () {
    assert.ok(_.decorate);
  });


  /* ---------------------------------------------------------------------------
   * hasExt()
   * -------------------------------------------------------------------------*/

  describe('hasExt', function () {

    it('Should return true if path contains extension.', function () {
      assert.isTrue(_.hasExt('fake/path/with/name.this.that', 'this'));
      assert.isTrue(_.hasExt('fake/path/with/name.this.that', 'that'));
    });

    it('Should return false if path does not contain extension.', function () {
      assert.isFalse(_.hasExt('fake/path/with/name.this.that', 'name'));
      assert.isFalse(_.hasExt('fake/path/with/name.this.that', 'missing'));
    });

  });


  /* ---------------------------------------------------------------------------
   * readFile()
   * -------------------------------------------------------------------------*/

  describe('readFile()', function () {

    it('Should return file contents.', function (done) {
      _.readFile(filePath, function (err, data) {
        assert.equal(data, '<h1>Title</h1>');
        done();
      });
    });

  });


  /* ---------------------------------------------------------------------------
   * readJsonFile()
   * -------------------------------------------------------------------------*/

  describe('readJsonFile()', function () {

    it('Should return file contents.', function (done) {
      _.readJsonFile(dataPath, function (err, data) {
        assert.deepEqual(data, fixtureData);
        done();
      });
    });

    it('Should return an error if JSON.parse fails.', function (done) {
      _.readJsonFile(filePath, function (err, data) {
        assert.ok(err);
        done();
      });
    });

  });


  /* ---------------------------------------------------------------------------
   * renderFile()
   * -------------------------------------------------------------------------*/

  describe('renderFile()', function () {

    it('Should execute callback with rendered file.', function (done) {
      _.renderFile(tmplPath, fixtureData, function (err, contents) {
        assert.equal(contents, '<h1>Title</h1>');
        done();
      });
    });

  });


  /* ---------------------------------------------------------------------------
   * renderTmpl()
   * -------------------------------------------------------------------------*/

  describe('renderTmpl()', function () {

    it('Should return rendered template.', function () {
      var tmpl = fs.readFileSync(tmplPath, 'utf8');
      var contents = _.renderTmpl(tmpl, fixtureData);

      assert.equal(contents, '<h1>Title</h1>');
    });

  });

});