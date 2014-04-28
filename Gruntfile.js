// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {

  grunt.task.loadNpmTasks("grunt-contrib");

  grunt.initConfig({

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["js/dist"],



    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one in
    // index.html.
    concat: {
      css: {
        src: [
          "css/normalize.css",
          "css/bootstrap.min.css",
          "css/datepicker.css",
          "css/font-awesome.min.css",
          "css/flexslider.css",
          "css/style.css",
          "css/style-responsive.css",
          "css/isotope.css"
          
        ],

        dest: "css/dist/final.css",

        separator: ";"
      },
      dist: {
        src: [
          "js/modernizr.js",
          "js/jquery.sticky.js",
          "js/jquery.fitvids.js",
          "js/jquery.easing-1.3.pack.js",
          "js/bootstrap.min.js",
          "js/bootstrap-modal.js", "js/bootstrap-datepicker.js",
          "js/jquery.parallax-1.1.3.js",
          "js/jquery-countTo.js", "js/jquery.appear.js", "js/jquery.easy-pie-chart.js", "js/jquery.cycle.all.js", "js/jquery.maximage.js",
          "js/skrollr.js",
          "js/jquery.flexslider-min.js",
          "js/jquery.hoverdir.js",
          "js/jquery.validate.min.js",
          "js/portfolio_custom.js",
          "js/bgpos.js",
          "js/script.js"
        ],

        dest: "js/dist/final.js",

        separator: ";"
      }
    },



    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {

      combine: {
        files: {
          "css/final.min.css": [
            "css/dist/final.css"
          ]
        }


      }
    },



    // Takes the built require.js file and minifies it for filesize benefits.
    uglify: {
      "js/dist/final.min.js": [
        "js/dist/final.js"
      ]
    },


    server: {
      // Ensure the favicon is mapped correctly.
      files: {
        "favicon.ico": "favicon.ico"
      },

      debug: {
        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:debug` to `debug` folders.
        folders: {
          "app": "dist/debug",
          "assets/js/libs": "dist/debug",
          "assets/css": "dist/debug"
        }
      },

      release: {
        // This makes it easier for deploying, by defaulting to any IP.
        host: "0.0.0.0",

        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:release` to `release` folders.
        folders: {
          "app": "dist/release",
          "assets/js/libs": "dist/release",
          "assets/css": "dist/release"
        }
      }
    }



  });



  grunt.registerTask("release", ["concat:dist", "uglify", "concat:css", "cssmin"]);



  //filename conversion for templates
  var defaultProcessName = function(name) {
    return name;
  };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split("/")).split(".");
    var name = _(pieces).without(_.last(pieces)).join("."); // strips file extension
    return name.substr(1, name.length); // strips leading _ character
  };

  var escapeQuote = function(name) {
    return name.replace("'", "\\'");
  };

  var _ = grunt.util._;


};