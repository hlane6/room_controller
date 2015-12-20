var timeout;
var times = [];

var colors = ["blue", "purple", "red", "green", "yellow",
    "orange", "white", "dark-red", "light-green", "light-blue",
    "darkest-red", "lightest-green", "darkblue", "pink", "teal", "turquoise"];

var get_random_color = function() {
    var color = $("body").attr("class") || null; 
    
    if (!color) {
        color = colors[Math.floor(Math.random() * colors.length)];
    } else {
        while (color == $("body").attr("class"))
            color = colors[Math.floor(Math.random() * colors.length)];
    }

    return color;
    
}

var change_background = function(duration) {

    var color = get_random_color();

    $("body").removeClass();
    $("body").addClass(color);

    timeout = setTimeout(change_background, duration * 1000, duration);
}

var find_bpm = function() {
    var diffs = [];
    var ind;

    for (ind = 1; ind < times.length; ind++) {
        diffs.push(times[ind] - times[ind - 1]);
    }

    var avg_diff  = diffs.reduce(function (a, b) {
        return a + b; }) / times.length;

    var duration = 60.0 / (60.0 / (avg_diff / 1000)) * 2;

    times = [];

    change_background(duration);
}

