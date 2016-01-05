from __future__ import print_function
import numpy

points = []

def dance(data):
    freq_data = numpy.fft.fft(data)
    bass = 0

    for freq, index in enumerate(freq_data.real):
        if index < 3:
            bass += freq

    points.append(bass)

    if len(points) > 5:
        del points[0]

    dy = (points[-1] - points[0]) / len(points)

    if (dy > 4):
        print(dy, points)
        return True

    return False
