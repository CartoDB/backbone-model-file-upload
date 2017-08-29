var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {

  grunt.initConfig({

    run_node: {
      start: {
        files: { src: [ 'test/mock-file-server.js'] }
      }
    },

    stop_node: {
      stop: {}
    },

    jasmine: {
      headless: {
        options: {
          browser: 'chrome',
          headless: true,
          timeout: 20000,
          keepRunner: true,
          outfile: '_SpecRunner.html',
          host: 'http://localhost:8088',
          summary: true,
          display: 'short',
          reportSlowerThan: 2000,
          specs: [
            '.grunt/tests.specs.js'
          ]
        }
      }
    },

    connect: {
      test: {
        options: {
          port: 8088,
          livereload: false,
          hostname: '0.0.0.0', // to be able to access the server not only from localhost
          base: {
            path: '.'
          }
        }
      },

      specs: {
        options: {
          port: 8088,
          livereload: false,
          open: 'http://localhost:8088/_SpecRunner.html',
          hostname: '0.0.0.0',
          base: {
            path: '.'
          }
        }
      }
    },

    webpack: {
      options: {
        stats: false
      },
      test: webpackConfig
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-run-node');

  grunt.registerTask('test', ['webpack:test', 'connect:test', 'run_node','jasmine','stop_node']);
  grunt.registerTask('test:browser', ['webpack:test', 'connect:specs', 'run_node','jasmine','stop_node']);
};
