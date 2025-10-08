FROM --platform=linux/amd64 nginx
ENV TZ=UTC
COPY ./conf.d/dev.conf /etc/nginx/conf.d/default.conf