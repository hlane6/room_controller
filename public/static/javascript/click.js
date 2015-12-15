var parent, ink, d, x, y;
var lights_hidden = true;

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

    var xhttp = $.ajax("commands.php/?command=" + id)
        .done(function() {
            $("#info").text(xhttp.responseText);
        });
})

