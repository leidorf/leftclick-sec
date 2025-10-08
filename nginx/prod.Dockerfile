FROM --platform=linux/amd64 nginx
ENV TZ=UTC
COPY ./conf.d/nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/prod.conf /etc/nginx/conf.d/default.conf