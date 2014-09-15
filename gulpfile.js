// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require('gulp-imagemin'),
    notify = require("gulp-notify"),
    rename = require("gulp-rename"),
    cmq = require('gulp-combine-media-queries'),
    uglify = require('gulp-uglify'),
    runSequence = require('gulp-run-sequence'),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Error Handler
var handleErrors = function () {
    // Send error to notification center with gulp-notify
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, arguments);

    // Keep gulp from hanging on this task
    this.emit('end');
};

// Set Source Files
var srcFiles = {
    img: 'src/images/**/*.{png,jpg,jpeg,gif}',
    svg: 'src/images/**/*.svg',
    scss: 'src/scss/**/*.scss',
    jsMain: 'src/js/gulp-slides.js',
    jsVendor: 'src/js/vendor/**/*.js',
    fonts: 'src/fonts/**/*',
    php: ['**/*.php']
}

// Set Dest Paths
var destPaths = {
    img: 'assets/images',
    svg: 'assets/images',
    css: 'assets/css',
    jsVendor: 'assets/js/vendor',
    js: 'assets/js',
    fonts: 'assets/fonts'
}


// Sass
gulp.task('sass', function () {
    return gulp.src(srcFiles.scss)
        .pipe(sass({
        // define realtive image path for "image-url"
        imagePath: '../images'
    }))
    // send SASS errors to console
    .on('error', handleErrors)
    // add browser prefixes
    .pipe(autoprefixer())
    // Write human readable file
    .pipe(gulp.dest(destPaths.css))
    // combine media queries
    .pipe(cmq())
    // minify css
    .pipe(minifyCss({
        keepSpecialComments: 1
    }))
    // add "-min"
    .pipe(rename({
        suffix: "-min"
    }))
    // save minified file
    .pipe(gulp.dest(destPaths.css))
    // send changes to Browser-sync
    .pipe(reload({
        stream: true
    }));
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src(srcFiles.fonts)
    // don't do anything to fonts, just save 'em
    .pipe(gulp.dest(destPaths.fonts));
});

// Images
gulp.task('images', function () {
    return gulp.src(srcFiles.img)
    // use cache to only target new/changed files
    // then optimize the images
    .pipe(cache(imagemin({
        progressive: true,
        interlaced: true
    })))
    // save optimized image files
    .pipe(gulp.dest(destPaths.img))
    // send changes to Browser-sync
    .pipe(reload({
        stream: true
    }));
});

// SVG
gulp.task('svg', function () {
    return gulp.src(srcFiles.svg)
    // svgs are just passing through
    .pipe(gulp.dest(destPaths.svg))
    // send changes to Browser-sync
    .pipe(reload({
        stream: true
    }));
});

// Vendor Scripts
gulp.task('vendorScripts', function () {
    // don't do anything to vendor scripts, just save 'em
    // we will enqueue with WordPress
    return gulp.src(srcFiles.jsVendor)
        .pipe(gulp.dest(destPaths.jsVendor));
});

// Main Script
gulp.task('mainScript', function () {
    return gulp.src(srcFiles.jsMain)
    // minfiy
    .pipe(uglify())
    // rename to "-min"
    .pipe(rename({
        suffix: "-min"
    }))
    // save
    .pipe(gulp.dest(destPaths.js))
    // send changes to Browser-sync
    .pipe(reload({
        stream: true
    }));
});

// Clean
gulp.task('assetClean', function () {
    // deletes everything in assets directory
    return gulp.src('assets').pipe(clean());
});

// BrowserSync
gulp.task('browserSync', function () {
    // Files to watch w/ Browser-sync
    // Typically files you aren't modifying with gulp but still want to reload
    var watchFiles = [
		// Like PHP files
		srcFiles.php
	];

    // initialize browsersync
    browserSync.init(watchFiles, {
		// config options, such as port, go here
		// see http://www.browsersync.io/docs/gulp/
	});
});

// Watch
gulp.task('watch', function () {

    // Watch main JS file and run mainScript task
    gulp.watch(srcFiles.jsMain, ['mainScript']);

    // Watch .scss files and run sass task
    gulp.watch(srcFiles.scss, ['sass']);

    // Watch image files and run image task
    gulp.watch(srcFiles.img, ['images']);

});

// Default task
gulp.task('default', function (cb) {
    runSequence(
        'assetClean',
        'fonts',
        'images',
        'svg',
        'vendorScripts',
		'mainScript',
        'sass',
        'browserSync',
        'watch',
		cb
	);
});

// Build Task
gulp.task('build', function (cb) {
    runSequence(
		'assetClean',
		'fonts',
		'images',
		'svg',
		'vendorScripts',
		'mainScript',
		'sass',
		cb
	);
});