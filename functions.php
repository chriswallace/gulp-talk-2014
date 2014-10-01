<?php
if( IS_STATIC ){
   add_action( 'after_setup_theme', 'gulp_talk_remove_feeds' );
}

/*
* Remove unused links
*/
if( !function_exists('gulp_talk_remove_feeds') ):

 function gulp_talk_remove_feeds() {
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	remove_action( 'wp_head', 'feed_links', 2 );
	remove_action('wp_head', 'rel_canonical');
	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
 }
 
endif;

add_action('wp_enqueue_scripts', 'gulp_talk_register_scripts_styles');

/*
* Register gulp slide scripts/styles
*/
if( !function_exists('gulp_talk_register_scripts_styles') ):

   function gulp_talk_register_scripts_styles() {
    
    $js_deps = array('jquery');

       wp_register_script(
	      'head-js',
	      get_stylesheet_directory_uri() . '/assets/js/vendor/head/head.min.js',
	      $js_deps,
	      false,
	      true
       );
       
       $js_deps[] = 'head-js';
       
       wp_register_script(
	      'reveal-js',
	      get_stylesheet_directory_uri() . '/assets/js/vendor/reveal/reveal.min.js',
	      $js_deps,
	      false,
	      true
       );
       
       $js_deps[] = 'reveal-js';

       wp_register_script(
	      'gulp-slides-js',
	      get_stylesheet_directory_uri() . '/assets/js/gulp-slides-min.js',
	      $js_deps,
	      false,
	      true
       );

	   $WordPressVars = array(
		  'themeDir' => '/',
		  'assetsDir' => get_stylesheet_directory_uri() . '/assets/',
		  'isStatic' => IS_STATIC,
	   );

	   wp_localize_script('gulp-slides-js', 'WordPressVars', $WordPressVars);

       wp_register_style(
	      'gulp-slides-css',
	      get_stylesheet_directory_uri() . '/assets/css/gulp-slides-min.css'
       );

   }//end gulp_talk_register_scripts_styles function
   
endif;

add_action('wp_head', 'gulp_talk_clean_wp_head', 1);

/*
 * Clean wp_head
 */
if( !function_exists('gulp_talk_clean_wp_head') ):

    function gulp_talk_clean_wp_head() {

	//bail if not on gulp-slides template or in admin
	if ( !is_page_template('template-gulp-slides.php') OR is_admin() ){
	    return;
	}

	add_action('wp_print_scripts', 'gulp_talk_remove_all_scripts', 100);
	add_action('wp_print_styles', 'gulp_talk_remove_all_styles', 100);

	/*
	 * Remove existing scripts
	 */
	if( !function_exists('gulp_talk_remove_all_scripts') ):

	    function gulp_talk_remove_all_scripts() {

		   global $wp_scripts;
		   $wp_scripts->queue = array('gulp-slides-js');

	    }//end gulp_talk_remove_all_scripts function
	    
	endif;

	/*
	 * Remove existing styles
	 */
	if( !function_exists('gulp_talk_remove_all_styles') ):

	    function gulp_talk_remove_all_styles() {

		   global $wp_styles;
		   $wp_styles->queue = array('gulp-slides-css');

	    }//end gulp_talk_remove_all_styles function
	    
	endif;

    }//end gulp_talk_clean_wp_head function

    //ditch the admin bar
    add_filter('show_admin_bar', '__return_false');

endif;