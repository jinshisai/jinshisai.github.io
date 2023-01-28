function importJS(relative_path) {
	if (! new Array().push) return false;
	var scripts = new Array(
	'jquery.min.js',
	'skel.min.js',
	'util.js',
	'main.js',
	'scroll.js'
	);

	var loc = location.pathname, dir = loc.substring(0, loc.lastIndexOf('/')) + '/';
	for (var i=0; i<scripts.length; i++) {
	document.write('<script type="text/javascript" src="' + dir + relative_path + scripts[i] +'"></script>');
	}
}