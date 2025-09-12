# Django WSGI application path in pattern MODULE_NAME:VARIABLE_NAME
wsgi_app = "core.wsgi:application"

# The granularity of Error log outputs
loglevel = "info"

# The number of worker processes for handling requests
workers = 10

# Worker Timeout
timeout = 600

# The socket to bind
bind = "0.0.0.0:8000"

# Redirect stdout/stderr to log file
capture_output = True
