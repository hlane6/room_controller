#!/usr/bin/python
from wsgiref.handlers import CGIHandler
from flaskRemote import app

CGIHandler().run(app)
