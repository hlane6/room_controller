from dance import dance
import audio
import numpy
import threading

recent = False
timeout = 0

def update(i):
    length, data = audio.inp.read()
    signal = numpy.fromstring(data, dtype='int16')

    fourier = numpy.fft.fft(signal) / length    # apply fft and normalize
    fourier = fourier[range(length / 4)]

    line.set_ydata(abs(fourier.real))
    return line,

if __name__ == '__main__':
    while True:
        length, data = audio.inp.read()
        a = numpy.fromstring(data, dtype='int16')
    
        if not recent:
            if dance(length, a):
                timeout = 0
                recent = True
        else:
            if timeout < audio.RATE * .4:
                timeout += audio.CHUNK
            else:
                recent = False

    #import matplotlib.pyplot as plt
    #import matplotlib.animation as animation

    #length, data = audio.inp.read()
    #signal = numpy.fromstring(data, dtype='int16')

    #fig, ax = plt.subplots()
    #plt.axis([0, 12000, 0, 1000])
    #line, = ax.plot(frq, abs(fourier))

    #ani = animation.FuncAnimation(fig, update, interval = 20)

    #plt.show()
