"use strict";

const gulp = require("gulp");
const gp = require("gulp-load-plugins")();
const bs = require('browser-sync').create();
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const fs = require('fs');

gulp.task("del", () => {
	return del("public")
});

gulp.task("sass", () => {
  return gulp.src("src/styles/main.scss")
    .pipe(gp.sourcemaps.init())
    .pipe(gp.sassGlob())
		.pipe(gp.sass())
		.on("error", gp.notify.onError((err) => {
			return {
				title: "Sass",
				message: err.message
			}
    }))
		.pipe(gp.autoprefixer({
			browsers: ["last 3 version", "> 1%", "ie 8", "ie 9"]
    }))
    .pipe(gp.csso())
    .pipe(gp.sourcemaps.write())
    .pipe(gp.rename({
      suffix: ".min",
    }))
		.pipe(gulp.dest("public/assets/style")) 
});

gulp.task("js", () => {
  return gulp.src("src/scripts/main.js")
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest("./public/assets/scripts/"))
});

gulp.task("img:copy", () => {
  return gulp.src("src/images/**/*.*")
    .pipe(gp.imagemin())
    .pipe(gulp.dest("public/assets/images"))
});

gulp.task("nodemon", (cb) => {
  var called = false;
  return gp.nodemon({
      // nodemon our expressjs server
    script: 'app.js',
      // watch core server file(s) that require server restart on change
    watch: ['*'],
    ext: 'js css html pug json',
    ignore: ['./gulp', './node_modules', 'src'] // './source'
  }).on('start', function onStart() {
    // ensure start only got called once
    if (!called) {
      cb();
    }
    called = true;
  })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        bs.reload({stream: false});
      }, 1500);
    });  

});

gulp.task("watch", () => {
  gulp.watch(`src/styles/**/*.*`, gulp.series("sass"));
  gulp.watch(`src/scripts/**/*.*`, gulp.series("js"));
});

gulp.task("serve", () => {
  bs.init({
    proxy: "http://localhost:3000",
    port: 4000
  })
});


gulp.task("default", gulp.series(
	"del",
	gulp.parallel(
		"sass",
		"js",
		"img:copy"
	),
	"nodemon",
	gulp.parallel(
		"watch",
		"serve"
	)
));
