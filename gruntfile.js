var path = require('path');

module.exports = function(grunt) {
  var domlyBenchFiles = [
    'build/templates.js',
    'bench/lib/setup.js',
    'bench/lib/domlyOnly.js',
    'bench/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: 'build/**',
      results: 'build/results/**'
    },
    jshint: {
      options: {
        evil: true,
        expr: true,
        unused: true,
        multistr: true,
        globals: {
          console: true,
          document: true
        }
      },
      main: 'index.js',
      tests: 'test/**/*.js',
      gruntfile: 'gruntfile.js'
    },
    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: true,
        globals: ['$'],
        ui: 'bdd',
        reporter: 'spec'
      },
      main: {
        src: ['test/*.js']
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      chrome: {
        browsers: ['Chrome']
      },
      firefox: {
        browsers: ['Firefox']
      },
      ios: {
        browsers: ['iOS']
      },
      safari: {
        browsers: ['Safari']
      },
      'domly-chrome': {
        browsers: ['Chrome'],
        options: {
          files: domlyBenchFiles
        }
      },
      'domly-firefox': {
        browsers: ['Firefox'],
        options: {
          files: domlyBenchFiles
        }
      },
      'domly-safari': {
        browsers: ['Safari'],
        options: {
          files: domlyBenchFiles
        }
      },
      'domly-ios': {
        browsers: ['iOS'],
        options: {
          files: domlyBenchFiles
        }
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'dist/results/coverage/'
        }
      }
    },
    compile: {
      options: {
        namespace: 'templates',
        stripWhitespace: true
      },
      templates: {
        src: 'bench/fixtures/*.html',
        dest: 'build/templates.js',
      }
    },
    dot: {
      options: {
        namespace: 'dot_templates'
      },
      templates: {
        src: 'bench/fixtures/dot/*.html',
        dest: 'build/dot_templates.js',
      }
    },
    handlebars: {
      options: {
        namespace: 'hbs_templates',
        processName: function(name) {
          return path.basename(name, '.hbs');
        }
      },
      templates: {
        src: 'bench/fixtures/hbs/*.hbs',
        dest: 'build/hbs_templates.js'
      }
    },
    jst: {
      options: {
        namespace: 'lodash_templates',
        processName: function(name) {
          return path.basename(name, '.html');
        }
      },
      templates: {
        src: 'bench/fixtures/lodash/*.html',
        dest: 'build/lodash_templates.js'
      }
    },
    watch: {
      grammar: {
        files: ['lib/*.jison'],
        tasks: ['simplemocha']
      },
      jshint: {
        files: ['gruntfile.js'],
        tasks: ['jshint']
      },
      main: {
        files: [ 'index.js' ],
        tasks: [ 'jshint:main', 'simplemocha', 'karma:watch:run' ]
      },
      fixtures: {
        files: [ 'test/fixtures/**/*.html' ],
        tasks: [ 'simplemocha' ]
      },
      tests: {
        files: [ 'test/**/*.js' ],
        tasks: [ 'jshint:tests', 'simplemocha' ]
      },
      bench: {
        files: [ 'bench/**/*.js' ],
        tasks: [ 'jshint:bench', 'karma:watch:run' ]
      }
    }
  });

  grunt.loadTasks('tasks/');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.registerTask('build', [ 'jshint', 'compile', 'handlebars', 'dot', 'jst' ]);
  grunt.registerTask('default', [ 'clean', 'build' ]);

  grunt.registerTask('bench', [ 'bench:prepare', 'karma:chrome', 'karma:firefox', 'karma:safari' ]);
  grunt.registerTask('bench:prepare', [ 'build', 'clean:results' ]);
  grunt.registerTask('bench:chrome', [ 'bench:prepare', 'karma:chrome' ]);
  grunt.registerTask('bench:firefox', [ 'bench:prepare', 'karma:firefox' ]);
  grunt.registerTask('bench:safari', [ 'bench:prepare', 'karma:safari' ]);
  grunt.registerTask('bench:ios', [ 'bench:prepare', 'karma:ios' ]);
  grunt.registerTask('bench:domly', [ 'bench:prepare', 'karma:domly-chrome', 'karma:domly-firefox', 'karma:domly-safari' ]);
  grunt.registerTask('bench:domly-chrome', [ 'bench:prepare', 'karma:domly-chrome' ]);
  grunt.registerTask('bench:domly-firefox', [ 'bench:prepare', 'karma:domly-firefox' ]);
  grunt.registerTask('bench:domly-safari', [ 'bench:prepare', 'karma:domly-safari' ]);
  grunt.registerTask('test', [ 'jshint', 'simplemocha' ]);
  grunt.registerTask('dev', [ 'karma:watch:start', 'watch' ]);
};
