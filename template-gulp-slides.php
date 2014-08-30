<?php
/* Template Name: gulp-slides */
?>
<!DOCTYPE HTML>
    <!--[if IE 8 ]>    <html class="ie ie8" lang="en-US"> <![endif]-->
    <!--[if IE 9 ]>    <html class="ie ie9" lang="en-US"> <![endif]-->
    <!--[if gt IE 9]><!--><html class="no-js" lang="en-US"><!--<![endif]-->
    <head>
	<?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
	<div class="reveal">
	    <!-- Any section element inside of this container is displayed as a slide -->
	    <div class="slides">
		<section>
		    <h1>
			Optimizing Development <br />
			Workflow Using <a href="http://gulpjs.com/">gulp.js</a>
		    </h1>
		    
		    <h2>WordCamp DFW 2014</h2>
		    
		    <p>
			<small>Slides created with <a href="http://lab.hakim.se/reveal-js">reveal.js</a></small>
		    </p>
		    
		    <div class="logo">
			<img src="<?php bloginfo('stylesheet_directory'); ?>/assets/images/gulp-logo.png" alt="gulp.js Logo">
		    </div>
		</section>
		<section>
		    <h1>Andrew Taylor</h1>
		    
		    <ul>
			<h3>A Few Things I Love</h3>
			<li>WordPress</li>
			<li>Homebrewing  &amp; Craft Beer</li>
			<li>The Pacific Northwest</li>
			<li>Being Part Of The <a href="http://liftux.com/">LiftUX</a> Team</li>
		    </ul>
		    
		    <h2>
			<a href="http://www.ataylor.me">ataylor.me</a> | <a href="http://twitter.com/ataylorme">@ataylorme</a>
		    </h2>
		    
		</section>
		<section>
		    <h1>Disclaimer</h1>
		    
		    <h3>In addition to being written for an OSX environment this talk also assumes familiarity with:</h3>
		    
		    <ul>
			<li>custom WordPress development</li>
			<li>JavaScript</li>
			<li>the command line</li>
		    </ul>

		    <small>The steps are very similar (if not the same) on Windows but I haven't tested them.</small>
		</section>
		<section>
		    <h1>gulp Runs On Node.js</h1>
		    
		    <h3>
			You can install Node and npm (Node package manager)<br />
			from <a href="http://nodejs.org/">http://nodejs.org/</a>
		    </h3>
		    
		    Or with <a href="http://brew.sh/">homebrew</a> on OSX <code class="shell">$brew install node</code>
		</section>
		<section>
		    <h1>What is gulp?</h1>
		    
		    <h3>
			gulp is a streaming JavaScript task runner built on Node.js
		    </h3>
		    
		    <h2>Is it "gulp" or "Gulp"?</h2>
		    
		    <h3>gulp is always lowercase.</h3>
		</section>
		<section>
		    <h1>Wait, what is a<br /> JavaScript task runner?</h1>
		    
		    <h2>(and why should I care)?</h2>
		    
		    <h3>In a word: automation</h3>
		    
		    <p>All of the mundane, repetative development tasks can be handled by a task runner</p>
		    
		</section>
		<section>
		    <h1>Why gulp and not Grunt?</h1>
		    
		    <h2>or (insert other task runner)?</h2>
		    
		    <ul>
			<li>Streams - it leverages the power of Node streams for speed</li>
			<li>Code over configuration</li>
			<li>Easy to understand - it's just a JavaScript file</li>
			<li>It's the first one I tried, and I liked it</li>
		    </ul>
		</section>
		<section>
		    <h1>What is the streaming part?</h1>
		    
		    <h3>gulp takes in file streams, pipes them to a modifier, repeats if necessary, and then outputs the new file(s)</h3>
		    
		    <blockquote>
			Streams are readable, writable, or both.
		    </blockquote>
		    
		    <a href="http://nodejs.org/api/stream.html#stream_stream">
			See the gulp API docs for more info
		    </a>
		</section>
		<section>
		    <h1>Can you give me an example?</h1>
		    
		    <h3>gulp watches a SASS file (or glob of files) and on save:</h3>
		    
		    <ul>
			<li>Compiles SASS and logs errors</li>
			<li>Adds CSS3 browser prefixes</li>
			<li>
			    <a href="<?php bloginfo('stylesheet_directory'); ?>/assets/css/gulp-slides.css" target="_blank">
				Writes human readable file
			    </a>
			</li>
			<li>Combines media queries</li>
			<li>Minifies the css</li>
			<li>Adds "-min" to the file name</li>
			<li>
			    <a href="<?php bloginfo('stylesheet_directory'); ?>/assets/css/gulp-slides-min.css" target="_blank">
				Saves the minified file
			    </a>
			</li>
			<li>Injects the changes with Browser Sync</li>
		    </ul>
		</section>
		<section>
		    <h1>gulp Methods</h1>
		    
		    <h3>Everything else is done with a plugin.</h3>
		</section>
		<section>
		    <h1>gulp.task</h1>
		    
		    <h3><code>gulp.task(name, [dependencies], function(cb))</code></h3>
		    
		    <h3>Registers a function as a task, with optional dependencies</h3>
		    
		    <pre><code>
			gulp.task('sass', function() {
			    //Do some stuff
			});
		    </code></pre>
		</section>
		<section>
		    <h1>gulp.watch</h1>
		    
		    <h3><code>gulp.watch(glob, function(cb))</code></h3>
		    
		    <h3>Runs a function (task) when a file that matches the glob changes</h3>
		    
		    <pre><code>gulp.watch(imgSrc, ['images/**/*.{png,jpg,jpeg,gif}']);</code></pre>
		</section>
		<section>
		    <h1>gulp.src</h1>
		    
		    <h3><code>gulp.src(glob);</code></h3>
		    
		    <h3>Returns a readable stream starts emitting files that match</h3>
		    
		    <p>The matched files are then piped to actions or other streams</p>
		    
		    <pre><code>
			gulp.src('js/**/*.js')
			    .pipe(/* some task*/);
		    </code></pre>
		</section>
		<section>
		    <h1>gulp.dest</h1>
		    
		    <h3><code>gulp.dest(directory);</code></h3>
		    
		    <h3>Returns a writable stream that outputs<br />piped files to the file system</h3>
		    
		    <p><small>Relative path from <code>gulpfile.js</code></small></p>
		    
		    <pre><code>
			gulp.src('js/**/*.js')
			    .pipe(/* some task*/)
			    .pipe(gulp.dest('build/js'));
		    </code></pre>
		</section>
		<section>
		    <h1>gulp Plugins</h1>
		    
		    <p>gulp is good at reading/writing files but to modify them we need plugins</p>
		    
		    <h3>gulp plugins always include the <code>gulpplugin</code> keyword.</h3>
		    
		    <p><a href="http://gratimax.github.io/search-gulp-plugins/">Search gulp plugins</a> or <a href="https://npmjs.org/browse/keyword/gulpplugin">view all gulp plugins</a>.</p>
		</section>
		<section>
		    <h1>Create a <code>package.json</code> file</h1>
		    
		    <h3>
			I suggest reading the <a href="https://www.npmjs.org/doc/package.json.html">package.json official description</a>
		    </h3>

		    <p>The two items <strong>required</strong> by Node are name and version</p>
		    
		    <blockquote>Together they form a unique identifier</blockquote>
		    
		    <pre><code>
			{
			    "name": "gulp-talk-2014",
			    "version": "1.0.0"
			}
		    </code></pre>
		</section>
		<section>
		    <h1>Adding Plugins To <code>package.json</code></h1>
		    
		    <h3>gulp Plugins Are Defined Under <code>devDependencies</code></h3>
		    
		    <pre><code>
			{
			    "name": "gulp-talk-2014",
			    "version": "1.0.0",
			    "devDependencies": {
				"gulp-autoprefixer": "~0.0.6",
				"gulp-imagemin": "~0.1.5",
				"gulp-minify-css": "~0.3.4",
				"gulp-notify": "~1.2.4",
				"gulp": "~3.8.7",
				"gulp-rename": "~1.2.0",
				"gulp-combine-media-queries": "~0.0.1",
				"gulp-run-sequence": "~0.3.2",
				"gulp-clean": "~0.2.4",
				"gulp-watch": "~0.6.4",
				"gulp-sass": "~0.7.1",
				"gulp-uglify": "~0.3.0",
				"tiny-lr": "~0.0.7",
				"gulp-cache": "~0.2.0",
				"browser-sync": "~1.3.6"
			    }
			}
		    </code></pre>
		</section>
		<section>
		    <h1>Other Items</h1>
		    
		    <h3>Author, Repository, And More Can Be (Optionally) Added</h3>
		    
		    <a href="https://github.com/ataylorme/gulp-talk-2014/blob/master/package.json">The package.json used for this talk</a> is a good example
		</section>
		<section>
		    <h1>
			Installing Plugins
		    </h1>
		    
		    <h2>Use <code class="shell">$npm install</code></h2>
		    
		    <h3>
			This downloads plugin files to the <code>node_modules</code> directory.
		    </h3>

		    <p>
			<small>Probably a good idea to ignore this directory in version control</small>
		    </p>
		    
		    <p>If a plugin is missing from <code>package.json</code></p>
		    
		    <p>you can install the plugin using </p>
		    
		    <p><code class="shell">$npm installl --save-dev [plugin-name]</code></p>
		</section>
		<section>
		    <h1>Creating A <code>gulpfile.js</code></h1>
		</section>
	    </div>
	</div>
	<?php wp_footer(); ?>
    </body>
</html>