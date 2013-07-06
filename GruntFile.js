'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['smart-kv-module/js/*.js'],
      html: ['smart-kv-module/partials/*.html']
    },
    concat: {
      options: {
      },
      dist: {
        src: ['<%= src.js %>'],
        dest: './<%= pkg.name %>.js'
      }
    },
    'regex-replace': {
      dist: {
        src: ['<%= pkg.name %>.js'],
        actions: [
          {
            search: '\\{\\{',
            replace: '<%= grunt.option("startSymbol") %>',
            flags: 'g'
          },
          {
            search: '\\}\\}',
            replace: '<%= grunt.option("endSymbol") %>',
            flags: 'g'
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= src.js %>',
        'test/spec/{,*/}*.js'
      ]
    },
    html2js: {
      options: {
        base: 'smart-kv-module',
        module: 'smartKv.templates',
        fileHeaderString: '/* global angular: false */\n\'use strict\';',
        quoteChar: '\''
      },
      smartKv: {
        src: [ '<%= src.html %>' ],
        dest: 'smart-kv-module/js/Template.js'
      }
    },
    clean: {
      test: ['test_out']
    },
    copy: {
      refApp: {
        src: ['<%= pkg.name %>.js'],
        dest: 'example-app/js/'
      }
    },
    uglify: {
      main: {
        src: ['<%= pkg.name %>.js'],
        dest: '<%= pkg.name %>.min.js'
      }
    },
    watch: {
      livereload: {
        files: [
          '<%= pkg.directories.example %>/{,*/}*.html',
          '<%= pkg.directories.example %>/css/{,*/}*.css',
          '<%= pkg.directories.example %>/js/{,*/}*.js',
          '<%= pkg.directories.example %>/img/{,*/}*.{png,jpg,jpeg,webp,gif}'
        ],
        tasks: ['livereload']
      },
      rebuild: {
        files: [
          '<%= pkg.main %>/js/{,*}*.js',
          '<%= pkg.main %>/partials/{,*}*.html'
        ],
        tasks: ['build', 'copy:refApp', 'livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '127.0.0.1'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'example-app')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('refApp', ['html2js:smartKv', 'concat', 'copy:refApp']);
  grunt.registerTask('build', function() {
    grunt.task.run('html2js:smartKv');
    grunt.task.run('jshint');
    grunt.task.run('concat');
    if (grunt.option('startSymbol') && grunt.option('endSymbol')){ grunt.task.run('regex-replace'); }
    grunt.task.run('uglify');
  });
  grunt.registerTask('server', function() {
    grunt.task.run([
      'build',
      'copy:refApp',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });
};
