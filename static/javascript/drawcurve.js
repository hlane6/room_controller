function drawCurve(ctx, ptsa, tension, isClosed, numOfSegments, showPoints) {

    showPoints = showPoints ? showPoints : false;

    ctx.beginPath();

    drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));

    if (showPoints) {
        cts.stroke();
        cts.beginPath();
        for (var i = 0; i < ptsa.length - 1; i += 2)
            ctx.rect(ptsa[i] - 2, ptsa[i + 1] - 2, 4, 4);
    }

    ctx.stroke();
}

function getCurvePoints(pts, tension, isClosed, numOfSegments) {
    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],
        x, y,
        t1x, t2x, t1y, t2y,
        c1, c2, c3, c4,
        st, t, i;

    _pts = pts.slice(0);

    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.push(pts[0]);
        _pts.push(pts[1]);
    } else {
        _pts.unshift(pts[1]);
        _pts.unshift(pts[0]);
        _pts.push(pts[pts.length - 2]);
        _pts.push(pts[pts.length - 1]);
    }

    for (i = 2; i < (_pts.length - 4); i += 2) {
        for (t = 0; t <= numOfSegments; t++) {
            t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
            t2x = (_pts[i + 4] - _pts[i]) * tension;

            t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
            t2y = (_pts[i + 5] - _pts[i + 1]) * tension;

            st = t / numOfSegments;

            c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
            c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
            c4 = Math.pow(st, 3) - Math.pow(st, 2);

            x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;

            res.push(x);
            res.push(y);
        }
    }

    return res;
}

function drawLines(ctx, pts) {
    ctx.strokeStyle = "white";
    ctx.moveTo(pts[0], pts[1]);
    for (i = 2; i < pts.length - 1; i += 2)
        ctx.lineTo(pts[i], pts[i + 1]);
}
