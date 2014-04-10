'use strict';

module.exports = function(grunt){
	grunt.initConfig({
		mkdir: {
			all: {
				options: {
					create: ['../client/public/']
				}
			}
		},

		sass: {
			dev: {
				files: {
					'../client/public/tinker.app.css': 'src/css/app.scss'
				}
			}
		},

		watch: {
			css: {
				files: [
					'src/css/*.scss'
				],
				tasks: ['sass:dev']
			},
			js: {
				files: [
					'src/js/*.js',
					'src/js/**/*.js',
					'src/js/**/**/*.js',
					'src/js/**/**/**/*.js'
				],
				tasks: ['wrapup:dev']
			}
		},

		wrapup: {
			dev: {
				requires: {
					'tinker': './src/js/tinker.js'
				},
				options: {
					'output': '../client/public/tinker.app.js',
					'globalize': 'window'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-wrapup');

	grunt.registerTask('default', [
		'mkdir',
		'sass:dev',
		'wrapup:dev',
		'watch'
	]);
};
