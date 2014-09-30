var page = require('webpage').create();
var fs = require('fs');
page.open('http://localhost/gulp/slides/', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        var pageContent = page.evaluate(function () {
            return document.getElementsByTagName('html')[0].innerHTML;
        });
		fs.write('./build/index.html', page.content, 'w');
    }
    phantom.exit();
});