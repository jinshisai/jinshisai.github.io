/*
function include_pages(file, id='header'){
    // get current path
    var current = window.location.href
    var dir = current.match(/(^.*\/)/)[0];
    //console.log(dir + file)

    // get an element
    var elem = document.getElementById(id);
    $.ajax({
        url: dir + file,
        cache: false,
        success: function(html){
            elem.insertAdjacentHTML('afterbegin',html);
        }
    });
}
*/

function include_header(file){
    // get current path
    var current = window.location.href
    var dir = current.match(/(^.*\/)/)[0];
    //console.log(dir + file)

    // get an element
    var elem = document.body;
    $.ajax({
        url: dir + file,
        cache: false,
        success: function(html){
            elem.insertAdjacentHTML('afterbegin',html);
        }
    });
}

function include_footer(file){
    // get current path
    var current = window.location.href
    var dir = current.match(/(^.*\/)/)[0];
    //console.log(dir + file)

    // get an element
    var elem = document.body;
    $.ajax({
        url: dir + file,
        cache: false,
        success: function(html){
            elem.insertAdjacentHTML('beforeend',html);
        }
    });
}