module.exports = function(grunt) {
  var config = {
    version: '1.0.0'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['js/*.js'],
          dest: 'dist/js/built.js',
        }
    },
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true
            }
        },
        beforeconcat: ['js/*.js'],
        afterconcat: ['dist/js/built.js']
    },
    uglify: {
      options: {
        banner: '/* palette version '+ config.version + ' */\n',
        sourceMap: true,
        perserveComments: false
      },
      my_target: {
        files: {
          'dist/js/palette.min.js': ['dist/js/built.js']
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["dist/css"]
        },
        files: {
          "dist/css/test.css": "less/test.less"
        }
      },
      production: {
        options: {
          paths: ["dist/css"],
          cleancss: true
          // modifyVars: {
          //   imgPath: '"http://mycdn.com/path/to/images"',
          //   bgColor: 'red'
          // }
        },
        files: {
          "dist/css/test.css": "less/test.less"
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/* palette version '+ config.version + ' */'
        },
        files: {
          'dist/css/palette.min.css': ['dist/css/*.css']
        }
      }
    },
    clean: {
      // Deletes all .js files, but skips min.js files
      js: ["dist/js/*.js", "!dist/js/*.min.js"],
      css: ["dist/css/*.css", "!dist/css/*.min.css"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'less', 'cssmin', 'clean']);

};