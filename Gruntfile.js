module.exports = function (grunt) {
  "use strict";




  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Define variables
    globalConfig: {
      src:      './',
      dist:     '../dist/',
      cssDir:   'css/',
      sassDir:  'assets/scss/'
    },

    copy: {
      css : {
        src: '<%= globalConfig.src %><%= globalConfig.cssDir %>/**',
        dest: '<%= globalConfig.dist %>'
      }
    },

    shell: {
      jekyll: {
        command: 'jekyll build',
        stdout: true
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['**/*.html', '!<%= globalConfig.dist %>/**/*.html'],
        tasks: ['shell:jekyll']
      },
      css: {
        files: ['<%= globalConfig.src %><%= globalConfig.sassDir %>/**/*.scss'],
        tasks: ['sassCopy']
      }
    },

    sass: {
      prod: {
        options: {
          sourcemap: true,
          style: 'compressed',
          precision: '2',
          compass: true,
          cache: 'delete/'
        },
        files: {
          '<%= globalConfig.src %><%= globalConfig.cssDir %>main.min.css':'<%= globalConfig.src %><%= globalConfig.sassDir %>main.scss'
        }
      }// prod
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: '<%= globalConfig.dist %>',
          port: 9009,
        }
      }
    },

  });

  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  // Define a sass compile & copy task for livereload
  grunt.registerTask('sassCopy', ['sass:prod', 'copy:css']);

  grunt.registerTask('server', [
    'connect:server',
    'watch'
  ]);

  // Default task.
  grunt.registerTask('default', 'server');
};
