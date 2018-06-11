const gulp = require('gulp');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
var browserSync = require('browser-sync');

var tsProject = ts.createProject('frontend-ts/tsconfig.json');
var tsProject2 = ts.createProject('tsconfig.json');
var backendStream;

gulp.task('start', ['watch', 'nodemon']);

/*
 * Watch for changes in files.
 */
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('lib/**/*', ['compileServer']);
    gulp.watch('frontend-ts/src/**/*', ['frontendTS']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('views/**/*.hbs', ['reload']);
    gulp.watch('public/css/**/*.css', ['inject']);
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        open: true
    });
});

gulp.task('nodemon', function () {
    var started = false;

    backendStream = nodemon({
            script: 'bin/main.js',
            open: false,
            watch: false,
            env: {
                'NODE_ENV': 'development'
            }
        })
        .on('start', function () {
            if (!started) {
                started = true;
            }
        })
        .on('restart', function () {
            console.log('Express Restarting...')
            browserSync.reload();
        })
        .on('crash', function () {
            console.error('Application has crashed!\n Restarting in 5 seconds...')
            backendStream.emit('restart', 5) // restart the server in 10 seconds 
        });
});

gulp.task('compileServer', function () {
    return gulp.src('lib/**/*.ts')
        .pipe(tsProject2()).js
        .pipe(gulp.dest('bin/'))
        .on('end', function() {
            backendStream.restart();    
        });
});

gulp.task('frontendTS', function (cb) {
    return gulp.src('frontend-ts/src/**/*')
        .pipe(tsProject()).js
        .pipe(gulp.dest('frontend-ts'))
        .on('end', function () {
            gulp.start('browserify');
        });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
})

gulp.task('inject', function () {
    return gulp.src('public/css/**/*.css')
        .pipe(browserSync.stream());
})


/*
 * Bundles the scripts, using Browserify.
 */
gulp.task('browserify', function () {
    return gulp.src('frontend-ts/build/build.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public/js', {
            overwrite: true
        }))
        .on('end', function (done) {
            browserSync.reload();
            done();
        });
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());

});

/**
 * BUILD TASKS
 */

gulp.task('buildServer', function() {
    gulp.src('lib/**/*.ts')
    .pipe(tsProject2()).js
    .pipe(gulp.dest('bin/'))
});

gulp.task('buildFrontend', function (cb) {
    return gulp.src('frontend-ts/src/**/*')
        .pipe(tsProject()).js
        .pipe(gulp.dest('frontend-ts'))
        .on('end', function () {
            gulp.start('browserify');
        });
});

gulp.task('compileSASS', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
});

gulp.task('bundleBrowserify', function () {
    return gulp.src('frontend-ts/build/build.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public/js', {
            overwrite: true
        }))
});