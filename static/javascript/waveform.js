window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var audioInput = null,
    realAudioInput = null,
    audioRecorder = null,
    analyserContext = null,
    rafID = null;

var canvasWidth, canvasHeight;

var recIndex = 0;

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext("2d");
    }

    var SPACING = 5;
    var BAR_WIDTH = 3;
    var numBars = Math.round(canvasWidth / SPACING);
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

    analyserNode.getByteFrequencyData(freqByteData);

    analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
    analyserContext.fillStyle = "#F6D565";
    analyserContext.lineCap = "round";

    analyserContext.beginPath();
    analyserContext.moveTo(0, canvasHeight / 2);
    analyserContext.lineTo(canvasWidth, canvasHeight / 2);
    analyserContext.strokeStyle = 'white';
    analyserContext.stroke();
    analyserContext.closePath();

    var multiplier = analyserNode.frequencyBinCount / numBars;
    var control_points = [];

    for (var i = 0; i < numBars; i++) {
        var magnitude = 0;
        var offset = Math.floor(i * multiplier);
        for (var j = 0; j < multiplier; j++)
            magnitude += freqByteData[offset + j];
        magnitude = magnitude / multiplier;

        var magnitude2 = freqByteData[i * multiplier];

        control_points.push(i * SPACING);
        control_points.push(canvasHeight - magnitude);
    }

    drawCurve(analyserContext, control_points, 1);


    rafID = window.requestAnimationFrame(updateAnalysers);
}

function gotStream(stream) {
    console.log("got stream");
    inputPoint = audioContext.createGain();

    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
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
