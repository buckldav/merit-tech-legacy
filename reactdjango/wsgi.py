"""
WSGI config for reactdjango project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/

SocketIO
https://github.com/miguelgrinberg/python-socketio/blob/main/examples/server/wsgi/django_example/django_example/wsgi.py
"""

import socketio
from django.core.wsgi import get_wsgi_application
import os

# set async_mode to 'threading', 'eventlet', 'gevent' or 'gevent_uwsgi' to
# force a mode else, the best mode is selected automatically from what's
# installed
async_mode = None

sio = socketio.Server(async_mode=async_mode)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reactdjango.settings")

django_app = get_wsgi_application()
application = socketio.WSGIApp(sio, django_app)
