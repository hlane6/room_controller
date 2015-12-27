A Simple Web App
----------------

This is a simple web app which controls a raspberry pi which acts as a
remote control for the LED light strip in my room. One of its functions
is an attempt to change the color of light based upon the beat of music
playing in the background.

#####TODO
+ Train a neural network to recognize beats (much later on)

###Basic Setup

This web app runs on a raspberry pi which in turn in connected to an IR
receiver. Different buttons will send different signals to the lights.
The signals were found by testing the actual remote that came with the
lights. All functions found on that remote are present, while several
extra features are also including mainly dealing with the beats / bpm of
music.

###The Lights Are A Changing

The main purpose of this was to change lights based on the beat of music,
much like how lights in a club will operate. It achieves this by listening
to nearby sounds and isolating the sub-bass frequencies. If there is a
significant positive change in the total energy of those frequencies, the
lights will change. This method works well for genres of music that have
pronounced sub-bass lines. EDM, Hip-Hop, and Rap will generally fit that
description pretty well and thus the method works fairly well for those
genres of music.
