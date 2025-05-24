# Use Python 3.7-slim-buster as the base image
FROM python:3.9-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create and set the working directory in the container
WORKDIR /opt/hoboc

# Install system dependencies
RUN apt-get update \
    && cat requirements.apt | xargs -I {} apt-get install {} -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip  \
    && pip install -r requirements.txt

# Copy the entire Django project into the container
COPY ./src/ /opt/hoboc/src/
COPY gunicorn.py /opt/hoboc/src/
COPY gunicorn.py /opt/hoboc/
WORKDIR /opt/hoboc/src

# Run the collectstatic command during the image build
RUN python manage.py collectstatic --noinput

# Expose the Django development server port (change as needed)
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
