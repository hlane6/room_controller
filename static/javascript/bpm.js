var timeout;
var end, start = null;
var beat_count = 0;

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

var update_bpm = function() {
    end = new Date().getTime();
    beat_count++;
}

var set_bpm = function() {
    duration = (end / 1000 - start / 1000) / beat_count;
    $("#info").text(Math.floor(60.0 / duration) + " bpm");
    change_background(duration);
    reset_bpm();
}

var reset_bpm = function() {
    beat_count = 0;
    start = null;
}
