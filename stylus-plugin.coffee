fs = require 'fs'
stylus = require 'stylus'

module.exports = (wintersmith, callback) ->

	class StylusPlugin extends wintersmith.ContentPlugin

		constructor: (@_filename, @_text) ->

		getFilename: () ->
			@_filename.relative.replace /styl$/, 'css'

		getView: ->
			return (args..., callback) ->
				stylus(@_text).render (err, css) ->
					if err 
						callback err
					else 
						callback null, new Buffer css

		StylusPlugin.fromFile = (filename, callback) ->
			fs.readFile filename.full, (err, buffer) ->
				if err
					callback err
				else
					callback null, new StylusPlugin filename, buffer.toString()

	wintersmith.registerContentPlugin 'stylus', '**/*.styl', StylusPlugin
	callback()