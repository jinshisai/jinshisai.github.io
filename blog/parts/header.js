function header(){
    // get an element
    var body = document.body;
    var path = getOwnUrl();
    $.ajax({
        url: path + 'mainhead.html',
        cache: false,
        success: function(html){
            body.insertAdjacentHTML('afterbegin',html);
        }
    });

    window.onload = function() { // after loading documents
        var header = document.getElementById('header');
        var nav = '<a href="#navPanel" class="navPanelToggle"><i class="fas fa-bars"></i></a>';
        $($(header).children('div')).append(nav);
    };
}

function getOwnUrl(){
    // define variables
    var url;
    var scripts = document.getElementsByTagName("script"); // get all scripts
    var i = scripts.length;
    while (i--) {
        var match = scripts[i].src.match(/(^|.*\/)header\.js$/);
        if (match) {
            url = match[1];
            break;
        }
    }
    return url;
}