var WordPressVars = WordPressVars;

// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	overview: false,
	
	width: '95%',
	height: '95%',

	//theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
	transition: Reveal.getQueryHash().transition || 'linear', // default/cube/page/concave/zoom/linear/fade/none

	// Parallax scrolling
	//parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
	//parallaxBackgroundSize: '2100px 900px',

	// Optional libraries used to extend on reveal.js
	dependencies: [
		{ src: WordPressVars.assetsDir + 'js/vendor/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
	]
});

jQuery(document).ready(function($) {

	/* ADD TARGET BLANK TO EXTERNAL LINKS */
	$('a').filter( function() {
		return $(this).attr('href').substr(0, 7) === "http://" || $(this).attr('href').substr(0, 8) === "https://";
	}).attr('target', '_blank');
	
	/* ADD NUMBERS TO SECTIONS */
	slideCount = 1;
	$('.slides section').each(function(){
		$(this).addClass('slide-' + slideCount);
		slideCount += 1;
	});
	
});