from dance import dance
import audio
import numpy

recent = False
timeout = 0

if __name__ == '__main__':
    while True:
        l, data = audio.inp.read()
        a = numpy.fromstring(data, dtype='int16')
        
        if not recent:
            if dance(a):
                timeout = 0
                recent = True
        else:
            if timeout < audio.RATE * .3:
                timeout += audio.CHUNK
            else:
                recent = False
