/* global grunt */

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg : grunt.file.readJSON ( 'package.json' )
  , mkdir : {
      setup : {
        options : {
          mode : 0755
        , create : [ 'out' ]
        }
      }
    }
  , copy : {
      setup : {
        files : [
          { expand : true, cwd : 'src/', src : '*.js', dest : 'out/' }
        , { expand : true, cwd : 'src/', src : '*.css', dest : 'out/' }
        , { expand : true, cwd : 'src/', src : '*.png', dest : 'out/' }
        ]
      }
    , dist : {
        files : [
          { expand : true, cwd : 'lib/', src : '**/*.js', dest : 'out/' }
        ]
      }
    }
  , setup : {
      // make dir out
      // copy bootstrap files
    }
  , cleanup : {
      // remove out dir
    }
  , dist : {
      // copy lib files
      // zip js, css
    }
  , jade : {
      compile : {
        options : {
          pretty : true
        }
      , files : {
          'out/index.html' : 'src/jade/index.jade'
        }
      }
    }
  , stylus : {
      compile : {
        options : {
          paths : [ 'src/styl' ]
        , use : [ 'nib' ]
        }
      , files : {
          'out/style.css' : 'src/styl/style.styl'
        , 'out/overlay.css' : 'src/styl/overlay.styl'
        , 'out/windowShade.css' : 'src/styl/windowShade.styl'
        }
      }
    }
  , jshint: {
      // define the files to lint
      files: ['lib/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  , watch : {
      jade : {
        files : [ 'src/**/*.jade' ]
      , tasks : [ 'jade' ]
      , options : {
          interrupt : true
        }
      }
    , stylus : {
        files : [ 'src/**/*.styl' ]
      , tasks : [ 'stylus' ]
      , options : {
          interrupt : true
        }
      }
    , copy : {
        files : [ 'src/*.js', 'src/*.css', 'src/*.png', 'lib/*.js' ]
      , tasks : [ 'copy' ]
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-jade' );
  grunt.loadNpmTasks( 'grunt-contrib-stylus' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-mkdir' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );

  grunt.registerTask( 'default',  ['jade', 'stylus'] );
  grunt.registerTask( 'setup',    ['setup'] );
  grunt.registerTask( 'cleanup',  ['cleanup'] );
  grunt.registerTask( 'dist',     ['dist'] );
  grunt.registerTask( 'test',     ['jshint'] );

};
