// A function to jump a linked location in the same page
//  (i.e., a place anchored with #brabra)
//   without showing an anchor-link in URL.
$(document).ready(function()
{
// Do the followings if anchor starting # is clicked
$('a[href^=#]').click(function()
{
	// Get an anchor
	var href= $(this).attr("href");

	// If clicked was menu bar, pass scroll to open menu window
	if(href == '#navPanel') {
		console.log('Navigation panel was clicked.');
	}
	// Else, do scroll
	else {
		// Scroll speed
		var speed = 600;// milli-sec

		// Get a location you're going
		var target = $(href == "#" || href == "" ? 'html' : href);

		// Get the distance to the location you're going
		var position = target.offset().top;

		// Smooth scroll
		$($.support.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');

		// Ban showing the anchor-link in URL
		return false;
	}
});
});