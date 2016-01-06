from __future__ import print_function
import numpy
import audio

points = []

def dance(length, data):
    bass = 0
    k = numpy.arange(length)            # start with [1,2,3...]
    T = length / float(audio.RATE)      # get inverse of sample rate
    frq = k / T                         # frq = [1/T, 2/T, 3/T, ...]
    frq = frq[range(length / 4)]        # only get first n / 4 freqs

    fourier = numpy.fft.fft(data) / length    # apply fft and normalize
    fourier = abs(fourier[range(length / 4)])
     
    for i in range(3):
        bass += fourier.real[i]

    points.append(bass)

    if len(points) > 43:
        del points[0]

    dy = (points[-1] - points[0]) / len(points)
    average_bass = numpy.average(points)

    if (bass > average_bass * 4):
        print("Average: {0}\nBass: {1}\nBass/Average: {2}\n".format(average_bass,
                bass, bass / average_bass))
        return True

    return False
