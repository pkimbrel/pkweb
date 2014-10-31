/*jslint node: true,nomen: true */
/*globals console,require,__dirname*/

"use strict";

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist', 'tmp'], // Copy Static Content

        'string-replace': {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.shtml',
                    dest: 'dist/'
                }],
                options: {
                    replacements: [{
                        pattern: /includes\/test-/g,
                        replacement: 'includes/prod-'
                    }]
                }
            }
        },
        cssmin: {
            minify: {
                src: "src/css/*.css",
                dest: "tmp/css/<%= pkg.name %>.min.css"
            }
        },
        concat: {
            dist: {
                files: {
                    'dist/css/pkweb.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                        'bower_components/components-font-awesome/css/font-awesome.min.css',
                        'tmp/css/pkweb.min.css'
                    ],
                    'dist/js/pkweb.min.js': [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/bootstrap/dist/js/bootstrap.min.js'
                    ]
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'bower_components/components-font-awesome/fonts/',
                src: '**',
                dest: 'dist/fonts/',
                flatten: true,
                filter: 'isFile'
            },
            map: {
                expand: true,
                cwd: 'bower_components/jquery/dist',
                src: 'jquery.min.map',
                dest: 'dist/js/',
                flatten: true,
                filter: 'isFile'
            },
            favicon: {
                expand: true,
                cwd: 'src',
                src: 'favicon.*',
                dest: 'dist',
                flatten: true,
                filter: 'isFile'
            },
            robots: {
                expand: true,
                cwd: 'src',
                src: 'robots.txt',
                dest: 'dist',
                flatten: true,
                filter: 'isFile'
            },
            audio: {
                expand: true,
                cwd: 'src/audio',
                src: '**/*',
                dest: 'dist/audio',
                flatten: false,
                filter: 'isFile'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-scp');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'string-replace', 'cssmin', 'concat', 'copy']);

};
