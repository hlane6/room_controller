window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var audioInput = null,
    realAudioInput = null,
    audioRecorder = null,
    analyserContext = null,
    rafID = null;

var bass;
var recent = false;

var points = [];
var dy;

function drawHLine(ctx, height, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 150 - height);
    ctx.lineTo(270, 150 - height);
    ctx.closePath();
    ctx.stroke();
}

function dance(time) {
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

    analyserNode.getByteFrequencyData(freqByteData);

    bass = 0;

    for (var i = 0; i < 6; i += 1) {
        bass += freqByteData[i];
    }

    points.push(bass);
    
    if (points.length > 5)
        points.splice(0, 1);

    dy  = (points[points.length - 1] - points[0]) / points.length;

    if (!recent && (dy > 4)) {
        console.log(dy);
        $("body").removeClass();
        $("body").addClass(get_random_color());
        recent = true;
        timeout = setTimeout(function() { recent = false; timeout = null; }, 400);
    }

    var feedbackContext = document.getElementById("feedback").getContext("2d");
    feedbackContext.clearRect(0, 0, 270, 150);

    drawHLine(feedbackContext, bass / 1000 * 150, "white");

    rafID = window.requestAnimationFrame(dance);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();

    analyserNode.minDecibels = -100;
    analyserNode.maxDecibels = 100;

    inputPoint.connect(analyserNode);

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect(zeroGain);
    zeroGain.connect(audioContext.destination);

    dance();
}

function initAudio() {
    console.log("init");
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
            {
                "audio": {
                    "mandator": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFIlter": "false"
                    },
                    "optional": []
                },
            }, gotStream, function(e) {
                walert("Error getting audio");
                wconsole.log(e);
            });
}

$("#lights").click(function () {
   initAudio(); 
})

