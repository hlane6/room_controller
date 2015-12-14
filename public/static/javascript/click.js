var parent, ink, d, x, y;

console.log("hi");

$(".button").click(function(e) {
    parent = $(this).parent();
    if (parent.find(".ink").length == 0) {
        $(this).append("<span class='ink'></span>");
    } else {
        $(".ink").remove();
        $(this).append("<span class='ink'></span>");
    }

    ink = $(this).find(".ink");

    ink.removeClass("animate");

    if (!ink.height() && !ink.width()) {
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({height: d, width: d});
    }

    x = e.pageX - $(this).offset().left - ink.width() / 2;
    y = e.pageY - $(this).offset().top - ink.height() / 2;

    ink.css({top: y + 'px', left: x + 'px'}).addClass("animate");
})
