import alsaaudio, wave, numpy
from aubio import source, tempo

CHANNELS = 2
RATE = 44100
FORMAT = alsaaudio.PCM_FORMAT_S16_LE
CHUNK = 1024
RECORD_SECONDS = 10 

def extract_bpm(filename):
    samplerate, win_s, hop_s = RATE, CHUNK, 512 

    s = source(filename, samplerate, hop_s)
    o = tempo("specdiff", win_s, hop_s, samplerate)

    beats = []
    total_frames = 0

    while True:
        samples, read = s()
        is_beat = o(samples)
        if is_beat:
           this_beat = o.get_last_s()
           beats.append(this_beat)

        total_frames += read
        if read < hop_s:
            break

    bpms = 60./numpy.diff(beats)
    b = numpy.median(bpms)
    return b

inp = alsaaudio.PCM(alsaaudio.PCM_CAPTURE)
inp.setchannels(CHANNELS)
inp.setrate(RATE)
inp.setformat(FORMAT)
inp.setperiodsize(CHUNK)

w = wave.open('test.wav', 'w')
w.setnchannels(CHANNELS)
w.setsampwidth(2)
w.setframerate(RATE)

i = 0
while i < RECORD_SECONDS * RATE:
    l, data = inp.read()
    a = numpy.fromstring(data, dtype='int16')
    w.writeframes(data)

    i += CHUNK

w.close()

print extract_bpm('test.wav')
