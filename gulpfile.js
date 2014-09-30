// Load plugins
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
	spawn = require('child_process').spawn;

// Error Handler
var handleErrors = function () {
    // Send error to notification center with gulp-notify
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, arguments);

    // Keep gulp from hanging on this task
    this.emit('end');
};

// Set Source Files
var srcFiles = {
    img: 'src/images/**/*.{png,jpg,jpeg,gif,.svg}',
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
gulp.task('sass', ['clean'], function () {
    return gulp.src(srcFiles.scss)
        .pipe($.sass({
        // define realtive image path for "image-url"
        imagePath: '../images'
    }))
    // send SASS errors to console
    .on('error', handleErrors)
    // add browser prefixes
    .pipe($.autoprefixer())
    // Write human readable file
    .pipe(gulp.dest(destPaths.css))
    // combine media queries
    .pipe($.combineMediaQueries())
    // minify css
    .pipe($.minifyCss({
        keepSpecialComments: 1
    }))
    // add "-min"
    .pipe($.rename({
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
gulp.task('fonts', ['clean'], function () {
    return gulp.src(srcFiles.fonts)
    // don't do anything to fonts, just save 'em
    .pipe(gulp.dest(destPaths.fonts));
});

// Images
gulp.task('images', ['clean'], function () {
    return gulp.src(srcFiles.img)
    // use cache to only target new/changed files
    // then optimize the images
    .pipe($.cache($.imagemin({
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

// Vendor Scripts
gulp.task('vendorScripts', ['clean'], function () {
    // don't do anything to vendor scripts, just save 'em
    // we will enqueue with WordPress
    return gulp.src(srcFiles.jsVendor)
        .pipe(gulp.dest(destPaths.jsVendor));
});

// Main Script
gulp.task('mainScript', ['clean'], function () {
    return gulp.src(srcFiles.jsMain)
    // minfiy
    .pipe($.uglify())
    // rename to "-min"
    .pipe($.rename({
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
gulp.task('clean', function (cb) {
    // deletes everything in assets directory
    del(['./assets', './build'], cb);
});

// BrowserSync
gulp.task('browserSync', ['assets'], function () {
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

// Build Task
gulp.task('assets', ['fonts','images','vendorScripts','mainScript','sass']);

// Watch
gulp.task('watch', ['assets'], function () {

    // Watch main JS file and run mainScript task
    gulp.watch(srcFiles.jsMain, ['mainScript']);

    // Watch .scss files and run sass task
    gulp.watch(srcFiles.scss, ['sass']);

    // Watch image files and run image task
    gulp.watch(srcFiles.img, ['images']);

});

gulp.task('copyAssets', ['assets'], function () {
	// copy items from assets to build
	return gulp.src('assets/**/*')
		.pipe(gulp.dest('build'));
});

gulp.task('generateHTML', ['copyAssets'], function () {
	
	var phantomjs = spawn('phantomjs', ['static-slides.js'], {stdio: 'inherit'});
	
	var currentTask = this;

    phantomjs.on('exit', function() {
		// Keep gulp from hanging on this task
		currentTask.emit('end');
	});
});

// Build task
gulp.task('build', ['generateHTML']);

// Default task
gulp.task('default', ['watch', 'browserSync']);