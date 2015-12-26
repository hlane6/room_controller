window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var audioInput = null,
    realAudioInput = null,
    audioRecorder = null,
    analyserNode = null,
    rafID = null;

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();

    analyserNode.minDecibels = -120;
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


