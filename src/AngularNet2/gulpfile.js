/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins
To learn more visit: https://github.com/gulpjs/gulp/blob/master/docs/README.md
*/
'use strict';

var gulp = require('gulp'),
  os = require('os'),
  ts = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  _ = require('lodash'),
  del = require('del'),
  browserSync = require('browser-sync').create(),
  gulpSequence = require('gulp-sequence'),
  open = require('open'),
  project = require('./project.json'),
  packages = require('./package.json'),
  app = './app',
  tests = './tests',
  releaseDir = project.webroot + '/app';


gulp.task('default', gulpSequence('clean', ['copy-deps','copy-templates','copy-libs','copy-content','scripts']));

gulp.task('serve', gulpSequence('default', ['watch', 'dnx-run']));

gulp.task('watch', ['browsersync'], function () {
    gulp.watch(app + '/**/*', ['scripts', 'copy-templates', 'reload-site']);
    gulp.watch('./content/**/*', ['copy-content']);
    gulp.watch('./Views/**/*', ['reload-site']);
});

var browserSyncConfig = {
    injectChanges: true,
    proxy: "http://localhost:64937"
};

gulp.task('browsersync', ['default'], function () {
    browserSync.init(browserSyncConfig);
});

gulp.task('reload-site', function () {
    browserSync.reload();
});

gulp.task('copy-deps', function () {
    var dependencies = [
        './node_modules/systemjs/dist/system.js',
        './node_modules/angular2/bundles/angular2.dev.js'
    ];

    return gulp.src(dependencies, { base: 'node_modules' })
        .pipe(gulp.dest(releaseDir + '/lib/'));
});

gulp.task('copy-libs', function () {
  return gulp.src("./lib/**/*")
    .pipe(gulp.dest(releaseDir + '/lib/'));
});

gulp.task('copy-content', function () {
  return gulp.src("./content/**/*")
    .pipe(gulp.dest(releaseDir + '/content/'));
});

gulp.task('copy-templates', function () {
  return gulp.src(app + '/**/*.html')
    .pipe(gulp.dest(releaseDir));
});

gulp.task("scripts", function () {
    var tsProj = ts.createProject(app + '/tsconfig.json', {
        typescript: require('typescript')
    });

    var tsResult = gulp.src(app + '/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProj));

    return tsResult.js
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(releaseDir));
});

gulp.task("compile-tests", function() {
    var tsProj = ts.createProject(tests + '/tsconfig.json', {
        typescript: require('typescript')
    });

    var tsResult = gulp.src(tests + '/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProj));

    return tsResult.js
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(tests));
});

gulp.task("clean", function () {
  del.sync([releaseDir]);
});