'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        bump: {
            options: {
                pushTo: 'origin'
            }
        },

        //Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/output']
        },

        jasmine_node: {
            unit: ['test/spec/'],
            integration: ['test/integration/']
        },


        jshint: {
            all: [
                'test/spec/*.js',
                'test/integration/*.js',
                '*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        exec: {
            metalsmith: {
                cwd: './test',
                command: '../node_modules/metalsmith/bin/metalsmith'
            }
        }
    });

    grunt.registerTask('test', ['clean:tests', 'jasmine_node:unit', 'exec:metalsmith', 'jasmine_node:integration']);

    grunt.registerTask('default', ['jshint:all', 'test']);

};