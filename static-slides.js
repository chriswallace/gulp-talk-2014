var page = require('webpage').create(),
	spawn = require('child_process').spawn,
	assetsList = {},
	fs = require('fs'),
	url = 'http://localhost/gulp/slides/?static=true';

page.settings.localToRemoteUrlAccessEnabled = true;

page.onResourceRequested = function(requestData, networkRequest) {
	var fileURL = requestData.url.split('?')[0],
		fileExt = fileURL.split('.').pop().toLowerCase(),
		fileName = fileURL.substring(fileURL.lastIndexOf('/')+1),
		assetsDir = './static-slides/assets/',
		saveFile = false;
		
	switch (fileExt){
		case 'js':
			assetsDir += 'js/';
			saveFile = true;
			break;
		case 'css':
			assetsDir += 'css/';
			saveFile = true;
			break;
		case 'ico':
			assetsDir = './static-slides/',
			saveFile = true;
			break;
		case 'jpg':
		case 'png':
		case 'gif':
		case 'svg':
			assetsDir += 'images/';
			saveFile = true;
			break;
	}
	
	if ( fileName.indexOf('browser-sync-client') !== -1 ) {
		saveFile = false;
	}
	
	if ( saveFile ) {
		// save asset files
		console.log("Downloading: " + fileURL + " To: " + assetsDir);
		spawn('wget', ['-N', '-P', assetsDir, fileURL]);
		// stash the URLs
		assetsList[fileURL] = assetsDir.replace('./static-slides', '') + fileName;
	}
	
};

page.open(url,function(status){
	if (status !== 'success') {
        console.log('Unable to access network');
		phantom.exit();
    }
	// get favicon
	spawn('wget', ['-N', '-P', './static-slides/', 'http://localhost/gulp/wp-content/themes/gulp-talk/favicon.ico']);
	
	// stash page content
	var pageContent = page.content;
	// strip WordPress theme 
	pageContent = pageContent.replace('http://localhost/gulp/wp-content/themes/gulp-talk', '');
	for (var fileURL in assetsList) {
        if (assetsList.hasOwnProperty(fileURL)) {
           fileSrc = assetsList[fileURL];
		   fileName = fileURL.substring(fileURL.lastIndexOf('/')+1);
		   pageContent = pageContent.replace(fileURL,fileSrc);
        }
    }
	fs.write('./static-slides/index.html', pageContent, 'w');
    phantom.exit();
});