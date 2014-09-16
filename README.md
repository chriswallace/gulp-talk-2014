#gulp Talk 2014
##Slides For gulp.js Talk At WordCamp DFW 2014
###A `twentyfourteen` child theme proof of concept
###Andrew Taylor

##Installation Intructions
1. Make sure the `twentyfourteen` theme is installed
1. [Download the .zip](https://github.com/ataylorme/gulp-talk-2014/archive/master.zip) for this theme
1. Extract the .zip into the WordPress `themes` directory
1. Activate the `gulp Talk 2014` theme
1. Create a page called `gulp Slides`
1. Assign the `gulp-slides` template to the newly created `gulp Slides` page.
1. Click on `View page`

##gulp Instructions for OSX
1. [Download and Install Node.js with npm](http://nodejs.org/download/)
1. `cd` into the `gulp-talk-2014` theme directory
1. `$npm install`
1. `$gulp`
1. Download and Install [the accompanying Browser-sync WordPress plugin](http://wordpress.org/plugins/browser-sync-filter/)
1. Open the `gulp Slides` page in a browser
1. You should see the message `Connected to BrowserSync`
1. Edit the `src/scss/gulp-slides.scss`, `src/js/gulp-slides.js`, or `template-gulp-slides.php` files.
1. See the changes happen in the browser
1. `$ipconfig getifaddr en0` to get your local newtwork IP address
1. Visit the site by IP address on a tablet or mobile device, connected to the same network, and open the `gulp Slides` page
1. Repeat step 8
1. See the changes on your mobile device