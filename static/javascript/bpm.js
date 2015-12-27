var timeout;
var end, start = null;
var beat_count = 0;

var colors = ["blue", "purple", "red", "green", "yellow",
    "orange", "white", "dark-red", "light-green", "light-blue",
    "darkest-red", "lightest-green", "darkblue", "pink", "teal", "turquoise"];

var colors = {
    "blue": ["teal", "turquoise", "darkblue", "purple"],
    "purple": ["light-blue", "darkblue", "orange", "teal"],
    "red": ["orange", "yellow", "pink", "purple" ],
    "green": ["light-green", "lightest-green", "teal", "turquoise"],
    "yellow": ["orange", "dark-red", "lightest-green", "light-blue"],
    "orange": ["dark-red", "darkest-red", "white", "teal"],
    "white": ["red", "green", "blue", "yellow"],
    "dark-red": ["red", "pink", "darkblue", "green"],
    "light-green": ["light-blue", "pink", "yellow", "turquoise"],
    "light-blue": ["darkblue", "lightest-green", "red", "teal"],
    "darkest-red": ["darkblue", "purple", "green", "blue"],
    "lightest-green": ["orange", "red", "light-green", "blue"],
    "darkblue": ["white", "red", "orange", "green"],
    "pink": ["white", "yellow", "turquoise", "light-blue"],
    "teal": ["darkest-red", "darkblue", "white", "dark-red"],
    "turquoise": ["white", "light-blue", "lightest-green", "yellow"]
};
    

function get_random_color() {
    var color = $("body").attr("class") || "white";
    console.log($("body").attr("class"));

    color = colors[color][Math.floor(Math.random() * colors[color].length)];

    return color;
}

function change_background(duration) {
    $("body").removeClass();
    $("body").addClass(get_random_color());
    timeout = setTimeout(change_background, duration * 1000, duration);
}

function update_bpm() {
    end = new Date().getTime();
    beat_count++;
}

function set_bpm() {
    duration = (end / 1000 - start / 1000) / beat_count;
    $("#info").text(Math.floor(60.0 / duration) + " bpm");
    change_background(duration);
    reset_bpm();
}

function reset_bpm() {
    beat_count = 0;
    start = null;
}
