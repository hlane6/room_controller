var parent, ink, d, x, y, timeout;
var times = [];

var find_bpm = function() {
    var diffs = [];
    var ind;

    for (ind = 1; ind < times.length; ind++) {
        diffs.push(times[ind] - times[ind - 1]);
    }

    var avg_diff  = diffs.reduce(function (a, b) {
        return a + b; }) / times.length;

    console.log(60.0 / (avg_diff / 1000) * .97);

    var duration = 60.0 / (60.0 / (avg_diff / 1000)) * 2;

    $("body").addClass("body-animation");
    $("body").css({ "animation-duration": duration + "s" });

    times = [];
}

$(".button").click(function(e) {
    parent = $(this).parent();

    $(".ink").remove();
    $(this).append("<span class='ink'></span>");

    ink = $(this).find(".ink");

    ink.removeClass("animate");

    if (!ink.height() && !ink.width()) {
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({ height: d, width: d });
    }

    x = e.pageX - $(this).offset().left - ink.width() / 2;
    y = e.pageY - $(this).offset().top - ink.height() / 2;

    ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");

    var id = $(this).attr("id");

    if (id != "bpm") {
        $("body").removeClass();
        $("body").addClass(id);
    }

    var xhttp = $.ajax("commands.php/?command=" + id)
        .done(function() {
            $("#info").text(xhttp.responseText);
        });
})

$("#user_command").keydown(function(e) {
    if (e.which == 13) {
        var command = $("#user_command").val();
        $("#user_command").val("");

        var bpm = /bpm (\d+)/.exec(command);
        var stop = /bpm stop/.exec(command);

        if (bpm) {
            var duration = 60.0 / parseInt(bpm[1]) * 2;
            $("#info").text("setting bpm");

            $("body").addClass("body-animation");
            $("body").css({ "animation-duration": duration + "s" });
        } else if (stop) {
            $("#info").text("stop");
            $("body").removeClass("body-animation");
        }else {
            var xhttp = $.ajax("commands.php/?command=" + command)
                .done(function() {
                    $("#info").text(xhttp.responseText);
                });
        }
    }
})

$("#bpm").click(function (e) {
    times.push(new Date().getTime());

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(find_bpm, 1000);
})
