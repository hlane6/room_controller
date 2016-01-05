import alsaaudio, numpy

CHANNELS = 1
RATE = 44100
FORMAT = alsaaudio.PCM_FORMAT_S16_LE
CHUNK = 1024

inp = alsaaudio.PCM(alsaaudio.PCM_CAPTURE)
inp.setchannels(CHANNELS)
inp.setrate(RATE)
inp.setformat(FORMAT)
inp.setperiodsize(CHUNK)
