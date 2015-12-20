var parent, ink, d, x, y;

$(".button").click(function(e) {
    clearTimeout(timeout);
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
            var duration = 60.0 / parseInt(bpm[1]);
            $("#info").text("setting bpm");
            change_background(duration);
        } else if (stop) {
            $("#info").text("stop");
            $("body").removeClass();
            clearTimeout(timeout);
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

    $("body").removeClass();
    $("body").addClass(get_random_color());

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(find_bpm, 1000);
})
