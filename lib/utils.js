/*!
 * utils.js
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
var _         = require('underscore');
var assist    = require('assist.js');
var companion = require('underscore-companion.js');
var ducktail  = require('ducktail.js');


/* -----------------------------------------------------------------------------
 * 3rd party mixins
 * ---------------------------------------------------------------------------*/

_.mixin(assist);
_.mixin(companion);


/* -----------------------------------------------------------------------------
 * lib mixins
 * ---------------------------------------------------------------------------*/

_.mixin({

  /**
   * @public
   * @memberof _
   *
   * @desc Determine if a file path contains a specified extension.
   *
   * @param {string} path - File path to run truth test for.
   */
  hasExt: function (filePath, ext) {
    var name = path.basename(filePath);
    var parts = name.split('.');
    parts.shift();

    return _.contains(parts, ext);
  },

  /**
   * @public
   * @memberof _
   *
   * @desc super small wrapper around readFile which adds utf8 encoding
   * rather than having to deal with a buffer.
   *
   * @param {string} path - path of file to read.
   * @param {function} callback - callback to executed after file has been
   *   read. Behaves identical to fs.readFile callback.
   */
  readFile: function (path, callback) {
    fs.readFile(path, { encoding: 'utf8' }, callback);
  },

  /**
   * @public
   * @memberof _
   *
   * @desc super small wrapper around _.readFile which reads file and
   * automatically parses JSON.
   *
   * @param {string} path - path of file to read.
   * @param {function} callback - callback to executed after file has been
   *   read. Behaves identical to fs.readFile callback.
   */
  readJsonFile: function (path, callback) {
    _.readFile(path, function (err, data) {
      if (err) {
        return callback(err);
      }

      try {
        data = JSON.parse(data);
      } catch(err) {
        return callback(err);
      }

      callback(null, data);
    });
  },

  /**
   * @public
   * @memberof _
   *
   * @desc super small wrapper around handlebars which compiles and renders
   * template.
   *
   * @param {string} path - Path of file to read.
   * @param {object} data - Data to pass to template.
   * @param {function} callback - callback to executed after file has been
   *   read. Behaves identical to fs.readFile callback.
   */
  renderFile: function (tmplPath, data, opts, callback) {
    ducktail.render(tmplPath, data, opts, callback);
  },

  /**
   * @public
   * @memberof _
   *
   * @desc Basic built in render function.
   *
   * @param {string} tmpl - Template to render.
   * @param {object} data - Data to pass to template.
   */
  renderTmpl: function (tmpl, data, opts) {
    return ducktail.renderTmpl(tmpl, data, opts);
  }

});


/* -----------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------*/

module.exports = _;