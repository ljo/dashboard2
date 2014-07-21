'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    var httpServerPort = 9001;

    grunt.initConfig({
        xar: grunt.file.readJSON('package.json'),
        
        replace: {
            pkg: {
                src: ['expath-pkg.tmpl'],
                dest: 'expath-pkg.xml',
                replacements: [
                    {
                        from: '@APPVERSION@',
                        to: '<%= xar.version %>'
                    },
                    {
                        from: '@APPNAME@',
                        to: '<%= xar.name %>'
                    },
                    {
                        from: '@APPDESCRIPTION@',
                        to: '<%= xar.description %>'
                    }
                ]
            },
            repo: {
                src: ['repo.xml.tmpl'],
                dest: 'repo.xml',
                replacements: [
                    {
                        from: '@APPVERSION@',
                        to: '<%= xar.version %>'
                    },
                    {
                        from: '@APPNAME@',
                        to: '<%= xar.name %>'
                    },
                    {
                        from: '@APPDESCRIPTION@',
                        to: '<%= xar.description %>'
                    }
                ]
            }
        },
        
        clean: {
            build: ['build'],
            componentsZip: ['components.zip']
        },
        
        zip: {
            components: {
                src: [
                    'components/**'
                ],
                dest: 'components.zip'
            },
            xar: {
                src: [
                    'components.zip',
                    '*.xml',
                    '*.xql',
                    '*.html',
                    'modules/**'
                ],
                dest: 'build/<%=xar.name%>-<%=xar.version%>.zip'
            }
        },
        
        //WATCH tasks
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            elementsScripts: {
                files: ['elements/**'],
                tasks: ['rsync:developmentElements', 'webdav_sync']
            },
            target: {
                options: {
                    livereload: true
                },
                files: ['**/*.html']
            }
        },

        connect: {
            //Run "app" in grunt server
            livereload: {
                options: {
                    port: httpServerPort,
                    base:  '.',
                    keepalive:false,
                    open: true,
                    livereload: true
                }
            }
        },

        rsync: {
            options: {
                args: ["-vpc"],
                recursive: true
            },
            developmentElements: {
                options: {
                    src: 'elements/**',
                    dest: 'components/'
                }
            }
        },
        webdav_sync: {
            default: {
                options: {
                   local_path: '**',
                   remote_path: 'http://admin@localhost:8080/exist/webdav/db/apps/dashboard2'
                }
            }
        }
    });

    grunt.registerTask('dist-development', [
        'clean:build',
        'clean:componentsZip',
        'rsync',
        'replace',
        'zip:components',
        'zip:xar',
         'clean:componentsZip'
    ]);
    
    grunt.registerTask('server',  [
        'connect:livereload',
        'watch'
    ]);
};

