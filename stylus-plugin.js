// Generated by CoffeeScript 1.6.2
(function() {
  var fs, stylus,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  fs = require('fs');

  stylus = require('stylus');

  module.exports = function(wintersmith, callback) {
    var StylusPlugin;

    StylusPlugin = (function(_super) {
      __extends(StylusPlugin, _super);

      function StylusPlugin(_filename, _text) {
        this._filename = _filename;
        this._text = _text;
      }

      StylusPlugin.prototype.getFilename = function() {
        return this._filename.relative.replace(/styl$/, 'css');
      };

      StylusPlugin.prototype.getView = function() {
        return function() {
          var args, callback, _i;

          args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
          return stylus(this._text).render(function(err, css) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, new Buffer(css));
            }
          });
        };
      };

      StylusPlugin.fromFile = function(filename, callback) {
        return fs.readFile(filename.full, function(err, buffer) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, new StylusPlugin(filename, buffer.toString()));
          }
        });
      };

      return StylusPlugin;

    })(wintersmith.ContentPlugin);
    wintersmith.registerContentPlugin('stylus', '**/*.styl', StylusPlugin);
    return callback();
  };

}).call(this);
