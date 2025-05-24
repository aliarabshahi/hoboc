
FROM nginx:stable

# 1. generate self-signed certificate & key
RUN openssl req \
    -x509 \
    -nodes \
    -days 3650 \
    -subj "/C=CA/ST=QC/O=Hoboc, Inc./CN=hoboc.hoboc.ir" \
    -addext "subjectAltName=DNS:hoboc.hoboc.ir" \
    -newkey rsa:2048 \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -keyout /etc/ssl/private/nginx-selfsigned.key;

# 2. set proper conf file
RUN rm /etc/nginx/conf.d/default.conf
ADD ./nginx.conf /etc/nginx/conf.d/
