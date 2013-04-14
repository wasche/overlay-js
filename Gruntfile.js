/* global grunt */

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg : grunt.file.readJSON ( 'package.json' )
  , setup : {
      // make dir out
      // copy bootstrap files
    }
  , cleanup : {
      // remove out dir
    }
  , dist : {
      // build css
      // zip lib files + css
    }
  , jade : {
      compile : {
        options : {

        }
      , pretty : true
      }
    , files : {
        'out/index.html' : 'src/index.jade'
      }
    }
  , stylus : {
      compile : {
        options : {
          paths : [ 'src/styl' ]
        , use : [ 'nib' ]
        }
      }
    , files : {
        'out/style.css' : 'src/style.styl'
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
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-jade' );
  grunt.loadNpmTasks( 'grunt-contrib-stylus' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  grunt.registerTask ( 'default', ['jade', 'stylus'] );

};