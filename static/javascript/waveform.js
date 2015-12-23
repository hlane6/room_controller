window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var audioInput = null,
    realAudioInput = null,
    audioRecorder = null,
    analyserContext = null,
    rafID = null;

var canvasWidth, canvasHeight;

var recIndex = 0;

var energies = [];
var current_energy, average_energy;
var bass, mid, high;
var recent = false;

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext("2d");
    }

    var SPACING = 5;
    var BAR_WIDTH = 3;
    var RADIUS = 125;
    var numBars = Math.round(canvasWidth / SPACING);
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

    analyserNode.getByteFrequencyData(freqByteData);

    analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
    analyserContext.fillStyle = "#F6D565";
    analyserContext.lineCap = "round";

    var multiplier = analyserNode.frequencyBinCount / numBars;
    var right_side = [], left_side = [];

    bass = 0;

    for (var i = 0; i < numBars / 2; i += 1) {
        var magnitude = 0;
        var offset = Math.floor(i * multiplier);

        for (var j = 0; j < multiplier; j++)
            magnitude += freqByteData[offset + j];

        magnitude = magnitude / multiplier;

        var angle = (3 * Math.PI / 2) + (i / numBars) * (2 * Math.PI);
        var angle2 = (3 * Math.PI / 2) - (i / numBars) * (2 * Math.PI);

        right_side.push((RADIUS + magnitude / 3) * Math.cos(angle) + (canvasWidth / 2));
        right_side.push((RADIUS + magnitude / 3) * Math.sin(angle) + (canvasHeight / 2));

        left_side.push((RADIUS + magnitude / 3) * Math.cos(angle2) + (canvasWidth / 2));
        left_side.push((RADIUS + magnitude / 3) * Math.sin(angle2) + (canvasHeight / 2));

        if (i < 12) {
            bass += magnitude;
        }
    }

    drawCurve(analyserContext, right_side);
    drawCurve(analyserContext, left_side);

    energies.push(bass);

    if (energies.length > 50)
        energies.splice(0, 1);
    average_energy = energies.reduce((a, b) => a + b) / energies.length;

    if (!recent && (bass > 75) && (bass > average_energy * 1.15)) {
        $("body").removeClass();
        $("body").addClass(get_random_color());
        recent = true;
        timeout = setTimeout(function() { recent = false; timeout = null; }, 400);
    }

    var feedbackContext = document.getElementById("feedback").getContext("2d");
    feedbackContext.clearRect(0, 0, canvasWidth, canvasHeight);

    drawHLine(feedbackContext, bass / 1000 * canvasHeight, "white");
    drawHLine(feedbackContext, average_energy / 1000 * canvasHeight, "red");

    rafID = window.requestAnimationFrame(updateAnalysers);
}

function gotStream(stream) {
    console.log("got stream");
    inputPoint = audioContext.createGain();

    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();

    analyserNode.minDecibels = -80;
    analyserNode.maxDecibels = 100;

    inputPoint.connect(analyserNode);

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect(zeroGain);
    zeroGain.connect(audioContext.destination);
    updateAnalysers();
}


function initAudio() {

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

window.addEventListener("load", initAudio);
