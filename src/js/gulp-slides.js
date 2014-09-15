var WordPressVars = WordPressVars;

/* INITIALIZE REVEAL.JS */
Reveal.initialize({
		controls: true,
		progress: true,
		history: true,
		center: true,
		overview: false,
		width: '95%',
		height: '95%',
		transition: Reveal.getQueryHash().transition || 'linear',
		dependencies: [
				{
						src: WordPressVars.assetsDir + 'js/vendor/highlight/highlight.js',
						async: true,
						callback: function() {
								hljs.initHighlightingOnLoad();
						}
				}
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