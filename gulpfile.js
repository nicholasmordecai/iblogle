const gulp = require('gulp');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
var browserSync = require('browser-sync');
var path = require('path');

var backendStream;
var tsServer = ts.createProject('src/server/tsconfig.json');
var tsWebsite = ts.createProject('src/website/ts/tsconfig.json');

/*
 * Watch for changes in files.
 */
gulp.task('start', ['browser-sync'], function () {
    gulp.watch('src/server/**/*', ['compileServer']);
    gulp.watch('src/website/ts/**/*', ['compileWebsite']);
    gulp.watch('src/website/public/css/**/*.css', ['copyCSS', 'inject']);
    gulp.watch('src/website/views/**/*.hbs', ['copyViews', 'reload']);
    gulp.watch('src/data/**/*', ['copyDataFiles']);
    gulp.watch('src/website/public/img/**/*', ['copyImages']);
    gulp.watch('src/website/public/js/**/*.js', ['copyJS']);
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        open: true
    });
});

gulp.task('nodemon', function () {
    var started = false;

    backendStream = nodemon({
            script: 'build/server/main.js',
            open: true,
            watch: false,
        })
        .on('start', function () {
            if (!started) {
                started = true;
            }
        })
        .on('restart', function () {
            console.log('Express Restarting...')
            //browserSync.reload();
        })
        .on('crash', function () {
            console.error('Application has crashed!\n Restarting in 5 seconds...')
            backendStream.emit('restart', 5) // restart the server in 10 seconds 
        });
});

gulp.task('reload', function () {
    browserSync.reload();
})

gulp.task('inject', function () {
    return gulp.src('public/css/**/*.css')
        .pipe(browserSync.stream());
});

gulp.task('compileServer', function () {
    return gulp.src('src/server/**/*.ts')
        .pipe(tsServer()).js
        .pipe(gulp.dest('build/server'))
        .on('end', function () {
            backendStream.restart();
        });
});

gulp.task('compileWebsite', function (cb) {
    return gulp.src('src/website/ts/**/*')
        .pipe(tsWebsite()).js
        .pipe(gulp.dest('build/website/public/js'))
        .on('end', function () {
            gulp.start('browserify');
        });
});

/*
 * Bundles the scripts, using Browserify.
 */
gulp.task('browserify', function () {
    return gulp.src('build/website/public/js/build.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('build/website/public/js/bundle.js', {
            overwrite: true
        }))
        .on('end', function () {
            browserSync.reload();
        });
});

gulp.task('sass', function () {
    gulp.src('src/website/public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());
});

gulp.task('compileSASS', function () {
    gulp.src('src/website/public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/website/public/css/'))
});

gulp.task('bundleBrowserify', function () {
    return gulp.src('build/website/public/js/build.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('build/website/public/js/', {
            overwrite: true
        }))
});

gulp.task('copyDataFiles', function () {
    return gulp.src(['src/data/**/*'])
        .pipe(gulp.dest('build/data'));
});

gulp.task('copyCSS', function () {
    return gulp.src(['src/website/public/css/**/*'])
        .pipe(gulp.dest('build/website/public/css'));
});

gulp.task('copyFonts', function () {
    return gulp.src(['src/website/public/fonts/**/*'])
        .pipe(gulp.dest('build/website/public/fonts'));
});

gulp.task('copyJS', function () {
    return gulp.src(['src/website/public/js/**/*'])
        .pipe(gulp.dest('build/website/public/js'));
});

gulp.task('copyViews', function () {
    return gulp.src(['src/website/views/**/*'])
        .pipe(gulp.dest('build/views'));
});

gulp.task('copyImages', function () {
    return gulp.src(['src/website/public/img/**/*'])
        .pipe(gulp.dest('build/website/public/img'));
});

gulp.task('copyRev', function () {
    return gulp.src(['src/website/public/revolution/**/*'])
        .pipe(gulp.dest('build/website/public/revolution'));
});

gulp.task('fullBuild', ['copyDataFiles', 'compileSASS', 'bundleBrowserify', 'copyCSS', 'copyFonts', 'copyJS', 'copyViews', 'copyImages', 'copyRev']);